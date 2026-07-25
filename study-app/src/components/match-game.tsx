"use client";

import { Clock3, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/data/question-schema";
import qa from "@/data/generated/content-qa-manifest.json";
import { useStudy } from "@/domain/progress/study-provider";
import {
  safeStorageGet,
  safeStorageRemove,
  safeStorageSet,
} from "@/domain/storage/safe-storage";
import { shuffleSeeded } from "@/domain/study/session";

type Tile = {
  key: string;
  questionId: string;
  kind: "question" | "answer";
  text: string;
};
const MATCH_SESSION_KEY = "rel301m-match-session-v1";
type MatchSnapshot = {
  version: 1;
  dataHash: string;
  roundNumber: number;
  selectedKey: string | null;
  matched: string[];
  mistakes: number;
  seconds: number;
  timed: boolean;
};

function createRound(questions: Question[], seed: number): Tile[] {
  const selected = shuffleSeeded(questions, seed).slice(0, 6);
  return shuffleSeeded([
    ...selected.map((question) => ({
      key: `${question.id}-q`,
      questionId: question.id,
      kind: "question" as const,
      text: `${question.id} · ${question.stem}`,
    })),
    ...selected.map((question) => ({
      key: `${question.id}-a`,
      questionId: question.id,
      kind: "answer" as const,
      text: `${question.examAnswer.letter}. ${question.examAnswer.text}`,
    })),
  ], seed + 1);
}

export function MatchGame({ questions }: { questions: Question[] }) {
  const { recordAttempt } = useStudy();
  const eligible = useMemo(
    () =>
      questions.filter(
        (question) =>
          question.verdict !== "incorrect" &&
          question.verdict !== "bank-key-only" &&
          question.conceptualAnswer.acceptedLetters.length === 1 &&
          question.conceptualAnswer.acceptedLetters[0] ===
            question.examAnswer.letter,
      ),
    [questions],
  );
  const [roundNumber, setRoundNumber] = useState(1);
  const [round, setRound] = useState(() => createRound(eligible, 1));
  const [selected, setSelected] = useState<Tile | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timed, setTimed] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const complete = matched.length === 6;

  useEffect(() => {
    try {
      const saved = safeStorageGet(MATCH_SESSION_KEY);
      if (saved) {
        const snapshot = JSON.parse(saved) as MatchSnapshot;
        if (
          snapshot.version === 1 &&
          snapshot.dataHash === qa.datasetHash &&
          Number.isInteger(snapshot.roundNumber) &&
          snapshot.roundNumber > 0 &&
          Array.isArray(snapshot.matched) &&
          snapshot.matched.length <= 6 &&
          new Set(snapshot.matched).size === snapshot.matched.length &&
          Number.isInteger(snapshot.mistakes) &&
          snapshot.mistakes >= 0 &&
          Number.isInteger(snapshot.seconds) &&
          snapshot.seconds >= 0 &&
          (snapshot.selectedKey === null ||
            typeof snapshot.selectedKey === "string") &&
          typeof snapshot.timed === "boolean"
        ) {
          const restoredRound = createRound(eligible, snapshot.roundNumber);
          const roundIds = new Set(
            restoredRound.map((tile) => tile.questionId),
          );
          const matched = snapshot.matched.filter((id) => roundIds.has(id));
          const selected =
            restoredRound.find((tile) => tile.key === snapshot.selectedKey) ??
            null;
          if (
            matched.length !== snapshot.matched.length ||
            (snapshot.selectedKey !== null && !selected) ||
            (selected && matched.includes(selected.questionId))
          ) {
            throw new Error("Invalid persisted Match round.");
          }
          // Restoring a saved match intentionally initializes local UI state.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setRoundNumber(snapshot.roundNumber);
          setRound(restoredRound);
          setSelected(selected);
          setMatched(matched);
          setMistakes(snapshot.mistakes);
          setSeconds(snapshot.seconds);
          setTimed(snapshot.timed);
        }
      }
    } catch {
      safeStorageRemove(MATCH_SESSION_KEY);
    }
    setHydrated(true);
  }, [eligible]);

  useEffect(() => {
    if (!hydrated) return;
    const snapshot: MatchSnapshot = {
      version: 1,
      dataHash: qa.datasetHash,
      roundNumber,
      selectedKey: selected?.key ?? null,
      matched,
      mistakes,
      seconds,
      timed,
    };
    safeStorageSet(MATCH_SESSION_KEY, JSON.stringify(snapshot));
  }, [hydrated, matched, mistakes, roundNumber, seconds, selected, timed]);

  useEffect(() => {
    if (complete || !timed) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [complete, roundNumber, timed]);

  const restart = () => {
    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);
    setRound(createRound(eligible, nextRound));
    setSelected(null);
    setMatched([]);
    setMistakes(0);
    setSeconds(0);
  };

  const choose = (tile: Tile) => {
    if (matched.includes(tile.questionId)) return;
    if (!selected) {
      setSelected(tile);
      return;
    }
    if (selected.key === tile.key) {
      setSelected(null);
      return;
    }
    if (selected.kind === tile.kind) {
      setSelected(tile);
      return;
    }
    const correct = selected.questionId === tile.questionId;
    recordAttempt({
      questionId: selected.questionId,
      mode: "match",
      sessionId: `match-${roundNumber}`,
      correct,
      conceptCorrect: null,
      selected: [],
    });
    if (correct) {
      setMatched((current) => [...current, tile.questionId]);
    } else {
      setMistakes((value) => value + 1);
    }
    setSelected(null);
  };

  return (
    <div className="page">
      <header className="study-toolbar">
        <div>
          <p className="eyebrow">Match</p>
          <h1>Pair questions with their exam-bank answers</h1>
          <p>
            Only {eligible.length} unambiguous, reference-supported pairs are
            eligible; challenged and bank-only items stay in Learn and the
            question bank.
          </p>
        </div>
        <div className="match-stats">
          <span>
            <Clock3 /> {timed ? `${seconds}s` : "Untimed"}
          </span>
          <span>{mistakes} mistakes</span>
          <button
            className="button secondary"
            onClick={() => setTimed((value) => !value)}
          >
            {timed ? "Pause timer" : "Use timer"}
          </button>
          <button
            className="button secondary"
            onClick={() => {
              if (window.confirm("Reset this Match round?")) restart();
            }}
          >
            <RotateCcw /> Reset session
          </button>
        </div>
      </header>
      {complete ? (
        <section className="completion-card">
          <span className="completion-icon">
            <Trophy />
          </span>
          <p className="eyebrow">Round cleared</p>
          <h2>{seconds} seconds</h2>
          <p>
            You matched all six pairs with {mistakes} mistake
            {mistakes === 1 ? "" : "s"}.
          </p>
          <button className="button primary" onClick={restart}>
            <RotateCcw /> Play another round
          </button>
        </section>
      ) : (
        <>
          <p className="match-progress-label" aria-live="polite">
            {matched.length}/6 pairs · {mistakes} mistakes
            {selected
              ? ` · ${selected.kind === "question" ? "Question" : "Answer"} selected`
              : ""}
          </p>
          <div
            className="match-progress"
            role="progressbar"
            aria-label="Matched pairs"
            aria-valuemin={0}
            aria-valuemax={6}
            aria-valuenow={matched.length}
          >
            <i style={{ width: `${(matched.length / 6) * 100}%` }} />
          </div>
          <div className="match-grid">
            {round.map((tile) => {
              const done = matched.includes(tile.questionId);
              const active = selected?.key === tile.key;
              return (
                <button
                  key={tile.key}
                  className={`match-tile ${tile.kind} ${active ? "selected" : ""} ${
                    done ? "matched" : ""
                  }`}
                  disabled={done}
                  aria-pressed={active}
                  onClick={() => choose(tile)}
                >
                  <small>{tile.kind === "question" ? "Question" : "Answer"}</small>
                  <span>{tile.text}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
