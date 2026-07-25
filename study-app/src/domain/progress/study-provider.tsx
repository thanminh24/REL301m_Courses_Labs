"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import qa from "@/data/generated/content-qa-manifest.json";
import {
  retryPendingStorageWrites,
  STORAGE_FAILURE_EVENT,
} from "@/domain/storage/safe-storage";
import { initialStudyState, type Attempt, type StudyState } from "./types";

const STORAGE_KEY = "rel301m-study-state-v1";

type StudyContextValue = {
  state: StudyState;
  hydrated: boolean;
  storageError: string | null;
  toggleFavorite: (id: string) => void;
  recordAttempt: (attempt: Omit<Attempt, "at">) => void;
  setDailyGoal: (goal: number) => void;
  reset: () => void;
  exportData: () => string;
  importData: (serialized: string) => boolean;
  retrySave: () => void;
};

const StudyContext = createContext<StudyContextValue | null>(null);

const questionIdPattern = /^Q(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:0\d|1[0-7]))$/;
const attemptModes = new Set(["flashcards", "learn", "test", "match"]);
const validLetters = new Set(["A", "B", "C", "D"]);

function checksum(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function parseStudyState(value: string): StudyState | null {
  if (value.length > 2_000_000) return null;
  try {
    const parsed = JSON.parse(value) as Partial<StudyState> & {
      dataHash?: string;
    };
    const validIdList = (items: unknown) =>
      Array.isArray(items) &&
      items.length <= 317 &&
      items.every(
        (item) => typeof item === "string" && questionIdPattern.test(item),
      ) &&
      new Set(items).size === items.length;
    if (
      parsed.version !== 1 ||
      parsed.dataHash !== qa.datasetHash ||
      !validIdList(parsed.favorites) ||
      !validIdList(parsed.mastered) ||
      !validIdList(parsed.difficult) ||
      !Array.isArray(parsed.attempts) ||
      parsed.attempts.length > 2000 ||
      !parsed.attempts.every(
        (attempt) =>
          attempt &&
          typeof attempt === "object" &&
          questionIdPattern.test(String(attempt.questionId)) &&
          attemptModes.has(String(attempt.mode)) &&
          typeof attempt.sessionId === "string" &&
          attempt.sessionId.length > 0 &&
          attempt.sessionId.length <= 100 &&
          typeof attempt.correct === "boolean" &&
          (attempt.conceptCorrect === null ||
            typeof attempt.conceptCorrect === "boolean") &&
          Array.isArray(attempt.selected) &&
          attempt.selected.length <= 4 &&
          attempt.selected.every((item) => validLetters.has(String(item))) &&
          typeof attempt.at === "string" &&
          !Number.isNaN(Date.parse(attempt.at)),
      ) ||
      typeof parsed.dailyGoal !== "number" ||
      !Number.isInteger(parsed.dailyGoal) ||
      parsed.dailyGoal < 5 ||
      parsed.dailyGoal > 100 ||
      !(
        parsed.lastStudiedAt === null ||
        (typeof parsed.lastStudiedAt === "string" &&
          !Number.isNaN(Date.parse(parsed.lastStudiedAt)))
      )
    ) {
      return null;
    }
    const stateFields = { ...parsed };
    delete stateFields.dataHash;
    return {
      ...initialStudyState,
      ...stateFields,
      attempts: parsed.attempts.slice(-2000) as Attempt[],
    };
  } catch {
    return null;
  }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudyState>(initialStudyState);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // Reading browser persistence is an external-system synchronization.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setState(parseStudyState(saved) ?? initialStudyState);
    } catch {
      setStorageError("Browser storage is unavailable; progress is in memory only.");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const reportModeStorageFailure = () => {
      setStorageError(
        "A study session could not be saved. Retry when browser storage is available.",
      );
    };
    window.addEventListener(STORAGE_FAILURE_EVENT, reportModeStorageFailure);
    return () =>
      window.removeEventListener(STORAGE_FAILURE_EVENT, reportModeStorageFailure);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...state, dataHash: qa.datasetHash }),
        );
        // The save result is external-system state reflected in the UI.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStorageError(null);
      } catch {
        // The save result is external-system state reflected in the UI.
        setStorageError(
          "Progress could not be saved. Export a backup or free browser storage.",
        );
      }
    }
  }, [hydrated, state]);

  const toggleFavorite = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      favorites: current.favorites.includes(id)
        ? current.favorites.filter((item) => item !== id)
        : [...current.favorites, id],
    }));
  }, []);

  const recordAttempt = useCallback((attempt: Omit<Attempt, "at">) => {
    setState((current) => {
      const stamped = { ...attempt, at: new Date().toISOString() };
      const attempts = [
        ...current.attempts.slice(-1999),
        stamped,
      ];
      const successfulSessions = new Set(
        attempts
          .filter(
            (item) =>
              item.questionId === attempt.questionId &&
              item.conceptCorrect === true,
          )
          .map((item) => item.sessionId),
      );
      const mastered = successfulSessions.size >= 2;
      return {
        ...current,
        attempts,
        mastered: mastered
          ? Array.from(new Set([...current.mastered, attempt.questionId]))
          : current.mastered.filter((id) => id !== attempt.questionId),
        lastStudiedAt: stamped.at,
        difficult:
          attempt.conceptCorrect === false || !attempt.correct
            ? Array.from(new Set([...current.difficult, attempt.questionId]))
            : mastered
              ? current.difficult.filter((id) => id !== attempt.questionId)
              : current.difficult,
      };
    });
  }, []);

  const setDailyGoal = useCallback((dailyGoal: number) => {
    setState((current) => ({
      ...current,
      dailyGoal: Math.max(5, Math.min(100, Math.round(dailyGoal))),
    }));
  }, []);

  const reset = useCallback(() => setState(initialStudyState), []);
  const exportData = useCallback(() => {
    const serializedState = JSON.stringify({
      ...state,
      dataHash: qa.datasetHash,
    });
    return JSON.stringify(
      {
        exportVersion: 1,
        dataHash: qa.datasetHash,
        checksum: checksum(serializedState),
        state: { ...state, dataHash: qa.datasetHash },
      },
      null,
      2,
    );
  }, [state]);
  const importData = useCallback((serialized: string) => {
    if (serialized.length > 2_000_000) return false;
    let envelope;
    try {
      envelope = JSON.parse(serialized) as {
        exportVersion?: number;
        dataHash?: string;
        checksum?: string;
        state?: StudyState & { dataHash?: string };
      };
    } catch {
      return false;
    }
    if (
      envelope.exportVersion !== 1 ||
      envelope.dataHash !== qa.datasetHash ||
      typeof envelope.checksum !== "string" ||
      !envelope.state
    ) {
      return false;
    }
    const stateValue = JSON.stringify(envelope.state);
    if (checksum(stateValue) !== envelope.checksum) return false;
    const parsed = parseStudyState(stateValue);
    if (!parsed) return false;
    setState(parsed);
    return true;
  }, []);
  const retrySave = useCallback(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, dataHash: qa.datasetHash }),
      );
      if (!retryPendingStorageWrites()) {
        throw new Error("A study-session write is still pending.");
      }
      setStorageError(null);
    } catch {
      setStorageError("Progress still cannot be saved in this browser.");
    }
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      hydrated,
      storageError,
      toggleFavorite,
      recordAttempt,
      setDailyGoal,
      reset,
      exportData,
      importData,
      retrySave,
    }),
    [
      state,
      hydrated,
      storageError,
      toggleFavorite,
      recordAttempt,
      setDailyGoal,
      reset,
      exportData,
      importData,
      retrySave,
    ],
  );

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy must be used inside StudyProvider.");
  return context;
}
