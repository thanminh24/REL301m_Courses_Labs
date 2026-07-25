"use client";

import { Check, Clock3, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AnswerLetter, Question } from "@/data/question-schema";
import qa from "@/data/generated/content-qa-manifest.json";
import { useStudy } from "@/domain/progress/study-provider";
import {
  safeStorageGet,
  safeStorageRemove,
  safeStorageSet,
} from "@/domain/storage/safe-storage";
import {
  gradeExamAnswer,
  gradeSingleChoiceConceptAnswer,
  gradeWrittenConceptAnswer,
  shuffle,
  shuffleSeeded,
} from "@/domain/study/session";
import { QuestionExplanation } from "./question-explanation";

type Config = {
  count: number;
  course: string;
  timed: boolean;
  minutes: number;
  format: "mcq" | "written";
  feedback: "end" | "instant";
  topic: string;
  verdict: "all" | Question["verdict"];
  evidence: "all" | Question["evidence"]["type"];
  scope: "all" | "favorites" | "missed";
};

const defaultConfig: Config = {
  count: 20,
  course: "all",
  timed: false,
  minutes: 30,
  format: "mcq",
  feedback: "end",
  topic: "all",
  verdict: "all",
  evidence: "all",
  scope: "all",
};
const TEST_SESSION_KEY = "rel301m-test-session-v1";
type TestPhase = "setup" | "active" | "results";
type TestSnapshot = {
  version: 1;
  dataHash: string;
  phase: TestPhase;
  config: Config;
  questionIds: string[];
  answers: Record<string, AnswerLetter[]>;
  writtenAnswers: Record<string, string>;
  manualRatings: Record<string, "understood" | "not-yet">;
  flagged: string[];
  revealed: string[];
  currentIndex: number;
  deadline: number | null;
  sessionId: string;
};

const normalizeWritten = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

function gradeWrittenBank(question: Question, response: string) {
  const normalized = normalizeWritten(response);
  return (
    normalized === normalizeWritten(question.examAnswer.letter) ||
    normalized === normalizeWritten(question.examAnswer.text)
  );
}

export function PracticeTest({ questions }: { questions: Question[] }) {
  const { state, recordAttempt } = useStudy();
  const [phase, setPhase] = useState<TestPhase>("setup");
  const [config, setConfig] = useState(defaultConfig);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerLetter[]>>({});
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>(
    {},
  );
  const [manualRatings, setManualRatings] = useState<
    Record<string, "understood" | "not-yet">
  >({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultFilter, setResultFilter] = useState<
    "all" | "incorrect" | "nuance" | "unanswered"
  >("all");
  const [reviewPage, setReviewPage] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const activeQuestionRef = useRef<HTMLFieldSetElement>(null);
  const topics = useMemo(
    () => Array.from(new Set(questions.map((question) => question.topic))).sort(),
    [questions],
  );

  useEffect(() => {
    try {
      const saved = safeStorageGet(TEST_SESSION_KEY);
      if (saved) {
        const snapshot = JSON.parse(saved) as TestSnapshot;
        const byId = new Map(questions.map((question) => [question.id, question]));
        const validLetters = new Set(["A", "B", "C", "D"]);
        const questionIds = new Set(snapshot.questionIds ?? []);
        const phaseHasValidQuestions =
          snapshot.phase === "setup"
            ? questionIds.size === 0
            : questionIds.size > 0 &&
              questionIds.size <= snapshot.config?.count;
        const valid =
          snapshot.version === 1 &&
          snapshot.dataHash === qa.datasetHash &&
          ["setup", "active", "results"].includes(snapshot.phase) &&
          snapshot.config &&
          Number.isInteger(snapshot.config.count) &&
          snapshot.config.count >= 5 &&
          snapshot.config.count <= 317 &&
          ["mcq", "written"].includes(snapshot.config.format) &&
          ["end", "instant"].includes(snapshot.config.feedback) &&
          typeof snapshot.config.timed === "boolean" &&
          Number.isInteger(snapshot.config.minutes) &&
          snapshot.config.minutes >= 5 &&
          snapshot.config.minutes <= 180 &&
          Array.isArray(snapshot.questionIds) &&
          snapshot.questionIds.every((id) => byId.has(id)) &&
          new Set(snapshot.questionIds).size === snapshot.questionIds.length &&
          snapshot.questionIds.length <= 317 &&
          phaseHasValidQuestions &&
          snapshot.answers &&
          Object.entries(snapshot.answers).every(
            ([id, values]) =>
              questionIds.has(id) &&
              Array.isArray(values) &&
              values.length <= 1 &&
              values.every((value) => validLetters.has(value)),
          ) &&
          Array.isArray(snapshot.flagged) &&
          new Set(snapshot.flagged).size === snapshot.flagged.length &&
          snapshot.flagged.every((id) => questionIds.has(id)) &&
          Array.isArray(snapshot.revealed) &&
          new Set(snapshot.revealed).size === snapshot.revealed.length &&
          snapshot.revealed.every((id) => questionIds.has(id)) &&
          Number.isInteger(snapshot.currentIndex) &&
          snapshot.currentIndex >= 0 &&
          snapshot.currentIndex <= Math.max(0, snapshot.questionIds.length - 1) &&
          typeof snapshot.sessionId === "string" &&
          snapshot.sessionId.length <= 100 &&
          (snapshot.phase === "setup" || snapshot.sessionId.length > 0) &&
          snapshot.writtenAnswers &&
          Object.entries(snapshot.writtenAnswers).every(
            ([id, value]) =>
              questionIds.has(id) &&
              typeof value === "string" &&
              value.length <= 1000,
          ) &&
          snapshot.manualRatings &&
          Object.entries(snapshot.manualRatings).every(
            ([id, value]) =>
              questionIds.has(id) &&
              ["understood", "not-yet"].includes(value),
          ) &&
          (snapshot.deadline === null ||
            (Number.isFinite(snapshot.deadline) && snapshot.deadline > 0));
        if (valid) {
          // Restoring an autosaved test intentionally initializes UI state.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setPhase(snapshot.phase);
          setConfig({ ...defaultConfig, ...snapshot.config });
          setTestQuestions(
            snapshot.questionIds
              .map((id) => byId.get(id))
              .filter((item): item is Question => Boolean(item)),
          );
          setAnswers(snapshot.answers);
          setWrittenAnswers(snapshot.writtenAnswers ?? {});
          setManualRatings(snapshot.manualRatings ?? {});
          setFlagged(snapshot.flagged);
          setRevealed(snapshot.revealed);
          setCurrentIndex(snapshot.currentIndex);
          setDeadline(snapshot.deadline);
          setSessionId(snapshot.sessionId || `test-${Date.now()}`);
          setSecondsLeft(
            snapshot.deadline
              ? Math.max(0, Math.ceil((snapshot.deadline - Date.now()) / 1000))
              : 0,
          );
        }
      }
    } catch {
      safeStorageRemove(TEST_SESSION_KEY);
    }
    setHydrated(true);
  }, [questions]);

  useEffect(() => {
    if (!hydrated) return;
    const snapshot: TestSnapshot = {
      version: 1,
      dataHash: qa.datasetHash,
      phase,
      config,
      questionIds: testQuestions.map((question) => question.id),
      answers,
      writtenAnswers,
      manualRatings,
      flagged,
      revealed,
      currentIndex,
      deadline,
      sessionId,
    };
    safeStorageSet(TEST_SESSION_KEY, JSON.stringify(snapshot));
  }, [
    answers,
    config,
    deadline,
    flagged,
    hydrated,
    manualRatings,
    phase,
    sessionId,
    testQuestions,
    writtenAnswers,
    currentIndex,
    revealed,
  ]);

  useEffect(() => {
    if (phase !== "active") return;
    let settleFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      settleFrame = window.requestAnimationFrame(() => {
        const prompt = activeQuestionRef.current;
        if (!prompt) return;
        const stickyBottom =
          document.querySelector<HTMLElement>(".test-sticky-header")
            ?.getBoundingClientRect().bottom ?? 84;
        const desiredTop = Math.min(window.innerHeight / 2, stickyBottom + 16);
        const promptTop = prompt.getBoundingClientRect().top;
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo({
          top: Math.max(0, window.scrollY + promptTop - desiredTop),
          behavior: "auto",
        });
        root.style.scrollBehavior = previousScrollBehavior;
        prompt.focus({ preventScroll: true });
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settleFrame);
    };
  }, [currentIndex, phase]);

  const submit = () => {
    for (const question of testQuestions) {
      const unanswered =
        config.format === "written"
          ? !writtenAnswers[question.id]?.trim()
          : !(answers[question.id]?.length > 0);
      if (unanswered) continue;
      const selected =
        config.format === "written"
          ? gradeWrittenBank(question, writtenAnswers[question.id] ?? "")
            ? [question.examAnswer.letter]
            : []
          : (answers[question.id] ?? []);
      const conceptCorrect =
        config.format === "written"
          ? gradeWrittenConceptAnswer(
              question,
              writtenAnswers[question.id] ?? "",
            )
          : gradeSingleChoiceConceptAnswer(question, selected);
      recordAttempt({
        questionId: question.id,
        mode: "test",
        sessionId,
        correct: gradeExamAnswer(question, selected),
        conceptCorrect,
        selected,
      });
    }
    setDeadline(null);
    setPhase("results");
  };

  useEffect(() => {
    if (phase !== "active" || !config.timed) return;
    if (secondsLeft <= 0) {
      const timer = window.setTimeout(submit, 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setInterval(() => {
      setSecondsLeft(
        deadline
          ? Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
          : 0,
      );
    }, 1000);
    return () => window.clearInterval(timer);
    // submit is intentionally captured for the active test snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, config.timed, secondsLeft, deadline]);

  const start = () => {
    const eligible = questions.filter((question) => {
      const course =
        config.course === "all" || question.module.startsWith(config.course);
      const topic = config.topic === "all" || question.topic === config.topic;
      const verdict =
        config.verdict === "all" || question.verdict === config.verdict;
      const evidence =
        config.evidence === "all" ||
        question.evidence.type === config.evidence;
      const scope =
        config.scope === "all" ||
        (config.scope === "favorites" && state.favorites.includes(question.id)) ||
        (config.scope === "missed" && state.difficult.includes(question.id));
      return course && topic && verdict && evidence && scope;
    });
    if (!eligible.length) {
      setSetupError("No questions match these filters. Broaden the test setup.");
      return;
    }
    setSetupError("");
    setTestQuestions(
      shuffle(eligible).slice(0, Math.min(config.count, eligible.length)),
    );
    setAnswers({});
    setWrittenAnswers({});
    setManualRatings({});
    setFlagged([]);
    setRevealed([]);
    setCurrentIndex(0);
    const nextDeadline = config.timed
      ? Date.now() + config.minutes * 60 * 1000
      : null;
    setDeadline(nextDeadline);
    setSessionId(`test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    setSecondsLeft(config.timed ? config.minutes * 60 : 0);
    setPhase("active");
  };

  const resetSession = () => {
    safeStorageRemove(TEST_SESSION_KEY);
    setPhase("setup");
    setConfig(defaultConfig);
    setTestQuestions([]);
    setAnswers({});
    setWrittenAnswers({});
    setManualRatings({});
    setFlagged([]);
    setRevealed([]);
    setCurrentIndex(0);
    setResultFilter("all");
    setReviewPage(0);
    setDeadline(null);
    setSecondsLeft(0);
    setSessionId("");
  };

  const requestSubmit = () => {
    const unanswered = testQuestions.filter(
      (question) =>
        config.format === "written"
          ? !writtenAnswers[question.id]?.trim()
          : !(answers[question.id]?.length > 0),
    ).length;
    if (
      unanswered > 0 &&
      !window.confirm(
        `Submit with ${unanswered} unanswered question${
          unanswered === 1 ? "" : "s"
        }?`,
      )
    ) {
      return;
    }
    submit();
  };

  const metrics = useMemo(() => {
    if (!testQuestions.length) return { bank: 0, concept: 0, gradeable: 0 };
    let bank = 0;
    let concept = 0;
    let gradeable = 0;
    for (const question of testQuestions) {
      const selected = answers[question.id] ?? [];
      const written = writtenAnswers[question.id] ?? "";
      const bankCorrect =
        config.format === "written"
          ? gradeWrittenBank(question, written)
          : gradeExamAnswer(question, selected);
      if (bankCorrect) bank += 1;
      const conceptual =
        config.format === "written"
          ? gradeWrittenConceptAnswer(question, written)
          : gradeSingleChoiceConceptAnswer(question, selected);
      if (conceptual !== null) {
        gradeable += 1;
        if (conceptual) concept += 1;
      }
    }
    return { bank, concept, gradeable };
  }, [answers, config.format, testQuestions, writtenAnswers]);
  const reviewRecords = useMemo(
    () =>
      testQuestions.map((question, index) => {
        const selected = answers[question.id] ?? [];
        const written = writtenAnswers[question.id] ?? "";
        const correct =
          config.format === "written"
            ? gradeWrittenBank(question, written)
            : gradeExamAnswer(question, selected);
        const concept =
          config.format === "written"
            ? gradeWrittenConceptAnswer(question, written)
            : gradeSingleChoiceConceptAnswer(question, selected);
        const unanswered =
          config.format === "written" ? !written.trim() : selected.length === 0;
        const group = unanswered
          ? ("unanswered" as const)
          : correct && concept !== true
            ? ("nuance" as const)
            : correct
              ? ("correct" as const)
              : ("incorrect" as const);
        return { question, index, selected, written, correct, concept, group };
      }),
    [answers, config.format, testQuestions, writtenAnswers],
  );
  const filteredReviewRecords = reviewRecords.filter(
    (record) => resultFilter === "all" || record.group === resultFilter,
  );
  const reviewPageCount = Math.max(
    1,
    Math.ceil(filteredReviewRecords.length / 20),
  );
  const visibleReviewRecords = filteredReviewRecords.slice(
    reviewPage * 20,
    reviewPage * 20 + 20,
  );

  if (!hydrated) {
    return <div className="page loading-state">Restoring Test session…</div>;
  }

  if (phase === "setup") {
    return (
      <div className="page">
        <header className="page-header">
          <p className="eyebrow">Practice Test</p>
          <h1>Build an exam that fits your session</h1>
          <p>
            Results show the school bank score and the reference-correct concept
            score separately, so flawed items never hide what you truly know.
          </p>
        </header>
        <section className="test-setup">
          <label>
            Number of questions
            <input
              type="number"
              min="5"
              max="317"
              value={config.count}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  count: Math.max(5, Math.min(317, Number(event.target.value))),
                }))
              }
            />
          </label>
          <label>
            Course coverage
            <select
              value={config.course}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  course: event.target.value,
                }))
              }
            >
              <option value="all">All canonical questions</option>
              <option value="C1">Course 1</option>
              <option value="C2">Course 2</option>
              <option value="C3">Course 3</option>
              <option value="OUT">Outside course scope</option>
            </select>
          </label>
          <label>
            Response format
            <select
              value={config.format}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  format: event.target.value as Config["format"],
                }))
              }
            >
              <option value="mcq">Multiple choice</option>
              <option value="written">Written answer / self-review</option>
            </select>
            <small>
              True/false is unavailable because the source bank has no curated
              truth propositions; the app will not invent them.
            </small>
          </label>
          <label>
            Feedback timing
            <select
              value={config.feedback}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  feedback: event.target.value as Config["feedback"],
                }))
              }
            >
              <option value="end">After submitting the test</option>
              <option value="instant">After each response</option>
            </select>
          </label>
          <label>
            Topic
            <select
              value={config.topic}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  topic: event.target.value,
                }))
              }
            >
              <option value="all">All topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
          <label>
            Verification status
            <select
              value={config.verdict}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  verdict: event.target.value as Config["verdict"],
                }))
              }
            >
              <option value="all">All verdicts</option>
              <option value="correct">Verified</option>
              <option value="acceptable-with-caveat">With caveat</option>
              <option value="incorrect">Bank key challenged</option>
              <option value="bank-key-only">Bank-only</option>
            </select>
          </label>
          <label>
            Evidence
            <select
              value={config.evidence}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  evidence: event.target.value as Config["evidence"],
                }))
              }
            >
              <option value="all">All evidence</option>
              <option value="lecture">Lecture slides</option>
              <option value="book">Sutton–Barto book</option>
              <option value="question-bank">Question bank only</option>
            </select>
          </label>
          <label>
            Question set
            <select
              value={config.scope}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  scope: event.target.value as Config["scope"],
                }))
              }
            >
              <option value="all">All matching questions</option>
              <option value="favorites">Favorites only</option>
              <option value="missed">Previously missed</option>
            </select>
          </label>
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={config.timed}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  timed: event.target.checked,
                }))
              }
            />
            <span>
              <strong>Timed mode</strong>
              <small>Auto-submit when time expires</small>
            </span>
          </label>
          {config.timed && (
            <label>
              Time limit (minutes)
              <input
                type="number"
                min="5"
                max="180"
                value={config.minutes}
                onChange={(event) =>
                  setConfig((current) => ({
                    ...current,
                    minutes: Math.max(
                      5,
                      Math.min(180, Number(event.target.value)),
                    ),
                  }))
                }
              />
            </label>
          )}
          <button className="button primary" onClick={start}>
            Start test
          </button>
          <div className="button-row" aria-label="Quick test sizes">
            {[10, 20, 40].map((count) => (
              <button
                key={count}
                className="button secondary"
                onClick={() =>
                  setConfig((current) => ({ ...current, count }))
                }
              >
                {count} questions
              </button>
            ))}
          </div>
          <button
            className="button secondary"
            onClick={() =>
              setConfig((current) => ({ ...current, count: 317, course: "all" }))
            }
          >
            Use all 317 questions
          </button>
          {setupError && <p role="alert">{setupError}</p>}
        </section>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="page">
        <header className="page-header">
          <p className="eyebrow">Test complete</p>
          <h1>Your two-score result</h1>
        </header>
        <div className="score-grid">
          <section className="score-card bank">
            <small>School bank score</small>
            <strong>
              {metrics.bank}/{testQuestions.length}
            </strong>
            <span>
              {Math.round((metrics.bank / testQuestions.length) * 100)}%
            </span>
          </section>
          <section className="score-card concept">
            <small>Concept score</small>
            <strong>
              {metrics.concept}/{metrics.gradeable}
            </strong>
            <span>
              {metrics.gradeable
                ? Math.round((metrics.concept / metrics.gradeable) * 100)
                : 0}
              %
            </span>
          </section>
        </div>
        <p className="score-note">
          {testQuestions.length - metrics.gradeable} question(s) require
          conceptual self-review and are excluded from the second percentage.
        </p>
        <div className="result-filters" aria-label="Filter result review">
          {(
            [
              ["all", "All"],
              ["incorrect", "Incorrect"],
              ["nuance", "Correct with nuance"],
              ["unanswered", "Unanswered"],
            ] as const
          ).map(([value, label]) => {
            const count =
              value === "all"
                ? reviewRecords.length
                : reviewRecords.filter((record) => record.group === value).length;
            return (
              <button
                className={
                  resultFilter === value ? "button primary" : "button secondary"
                }
                aria-pressed={resultFilter === value}
                key={value}
                onClick={() => {
                  setResultFilter(value);
                  setReviewPage(0);
                }}
              >
                {label} · {count}
              </button>
            );
          })}
        </div>
        <div className="review-list">
          {visibleReviewRecords.map(
            ({ question, index, selected, written, correct, concept, group }) => {
            const resultLabel =
              group === "unanswered"
                ? "Unanswered"
                : group === "nuance"
                  ? "Correct with nuance"
                  : group === "correct"
                    ? "Correct"
                    : "Incorrect";
            return (
              <details className="review-item" key={question.id}>
                <summary>
                  <span className={correct ? "result-dot good" : "result-dot bad"}>
                    {correct ? <Check /> : index + 1}
                  </span>
                  <span>
                    <small>{question.id}</small>
                    {question.stem}
                  </span>
                  <strong>{resultLabel}</strong>
                </summary>
                <div className="response-summary">
                  <strong>Your response:</strong>{" "}
                  {config.format === "written"
                    ? written || "Unanswered"
                    : selected.join(", ") || "Unanswered"}
                </div>
                <QuestionExplanation question={question} />
                {concept === null && (
                  <div className="manual-review">
                    <p>Compare your response with the explanation, then self-rate:</p>
                    <button
                      className={
                        manualRatings[question.id] === "understood"
                          ? "button primary"
                          : "button secondary"
                      }
                      aria-pressed={
                        manualRatings[question.id] === "understood"
                      }
                      disabled={Boolean(manualRatings[question.id])}
                      onClick={() =>
                        {
                          if (manualRatings[question.id]) return;
                          setManualRatings((current) => ({
                            ...current,
                            [question.id]: "understood",
                          }));
                          recordAttempt({
                            questionId: question.id,
                            mode: "test",
                            sessionId,
                            correct,
                            conceptCorrect: true,
                            selected: [],
                          });
                        }
                      }
                    >
                      Understood
                    </button>
                    <button
                      className={
                        manualRatings[question.id] === "not-yet"
                          ? "button needs-work"
                          : "button secondary"
                      }
                      aria-pressed={manualRatings[question.id] === "not-yet"}
                      disabled={Boolean(manualRatings[question.id])}
                      onClick={() =>
                        {
                          if (manualRatings[question.id]) return;
                          setManualRatings((current) => ({
                            ...current,
                            [question.id]: "not-yet",
                          }));
                          recordAttempt({
                            questionId: question.id,
                            mode: "test",
                            sessionId,
                            correct,
                            conceptCorrect: false,
                            selected: [],
                          });
                        }
                      }
                    >
                      Not yet
                    </button>
                    {manualRatings[question.id] && (
                      <small>Self-rating saved for this test session.</small>
                    )}
                  </div>
                )}
              </details>
            );
          })}
        </div>
        {reviewPageCount > 1 && (
          <div className="button-row review-pagination">
            <button
              className="button secondary"
              disabled={reviewPage === 0}
              onClick={() => setReviewPage((page) => Math.max(0, page - 1))}
            >
              Previous review page
            </button>
            <span>
              Page {reviewPage + 1} of {reviewPageCount}
            </span>
            <button
              className="button secondary"
              disabled={reviewPage >= reviewPageCount - 1}
              onClick={() =>
                setReviewPage((page) =>
                  Math.min(reviewPageCount - 1, page + 1),
                )
              }
            >
              Next review page
            </button>
          </div>
        )}
        <button
          className="button primary"
          onClick={() => {
            resetSession();
          }}
        >
          <RotateCcw /> Build another test
        </button>
      </div>
    );
  }

  const answered =
    config.format === "written"
      ? Object.values(writtenAnswers).filter((value) => value.trim()).length
      : Object.values(answers).filter((value) => value.length).length;
  const currentQuestion = testQuestions[currentIndex];
  const navigatorStart = Math.floor(currentIndex / 20) * 20;
  const navigatorQuestions = testQuestions.slice(
    navigatorStart,
    navigatorStart + 20,
  );
  if (!currentQuestion) {
    return <div className="page loading-state">Recovering Test setup…</div>;
  }
  const currentSelected = answers[currentQuestion.id] ?? [];
  const currentHasResponse =
    config.format === "written"
      ? Boolean(writtenAnswers[currentQuestion.id]?.trim())
      : Boolean(currentSelected.length);
  return (
    <div className="page test-active">
      <header className="test-sticky-header">
        <div>
          <h1>Practice Test</h1>
          <strong>
            {answered}/{testQuestions.length} answered
          </strong>
        </div>
        {config.timed && (
          <span className="timer" aria-live="polite">
            <Clock3 />
            {Math.floor(secondsLeft / 60)}:
            {String(secondsLeft % 60).padStart(2, "0")}
          </span>
        )}
        <div className="toolbar-actions">
          <button
            className="button secondary"
            onClick={() => {
              if (window.confirm("Discard this test and all saved responses?")) {
                resetSession();
              }
            }}
          >
            <RotateCcw /> Reset session
          </button>
          <button className="button primary" onClick={requestSubmit}>
            Submit test
          </button>
        </div>
      </header>
      <nav className="test-navigator" aria-label="Test question navigator">
        <button
          type="button"
          disabled={navigatorStart === 0}
          aria-label="Previous 20 questions"
          onClick={() => setCurrentIndex(Math.max(0, navigatorStart - 20))}
        >
          ‹
        </button>
        {navigatorQuestions.map((question, localIndex) => {
          const index = navigatorStart + localIndex;
          const hasResponse =
            config.format === "written"
              ? Boolean(writtenAnswers[question.id]?.trim())
              : Boolean(answers[question.id]?.length);
          const isFlagged = flagged.includes(question.id);
          return (
            <button
              key={question.id}
              type="button"
              className={`${hasResponse ? "answered" : ""} ${
                isFlagged ? "flagged" : ""
              }`.trim()}
              aria-label={`Question ${index + 1}: ${
                hasResponse ? "answered" : "unanswered"
              }${isFlagged ? ", flagged" : ""}`}
              aria-current={index === currentIndex ? "step" : undefined}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button
          type="button"
          disabled={navigatorStart + 20 >= testQuestions.length}
          aria-label="Next 20 questions"
          onClick={() =>
            setCurrentIndex(
              Math.min(testQuestions.length - 1, navigatorStart + 20),
            )
          }
        >
          ›
        </button>
      </nav>
      <div className="test-question-list">
        <fieldset
          ref={activeQuestionRef}
          className="test-question"
          id={`test-${currentQuestion.id}`}
          tabIndex={-1}
        >
          <legend>
            <span>{currentIndex + 1}</span>
            {currentQuestion.stem}
          </legend>
          <small>
            {currentQuestion.id} ·{" "}
            {config.format === "written"
              ? "Write the answer in your own words"
              : "Select one exam-bank response; conceptual nuance is graded separately"}
          </small>
          <button
            type="button"
            className={
              flagged.includes(currentQuestion.id)
                ? "flag-button active"
                : "flag-button"
            }
            aria-pressed={flagged.includes(currentQuestion.id)}
            onClick={() =>
              setFlagged((current) =>
                current.includes(currentQuestion.id)
                  ? current.filter((id) => id !== currentQuestion.id)
                  : [...current, currentQuestion.id],
              )
            }
          >
            {flagged.includes(currentQuestion.id)
              ? "Flagged for review"
              : "Flag for review"}
          </button>
          {config.format === "written" ? (
            <label className="written-response">
              <span className="sr-only">
                Written response for {currentQuestion.id}
              </span>
              <textarea
                value={writtenAnswers[currentQuestion.id] ?? ""}
                onChange={(event) =>
                  setWrittenAnswers((current) => ({
                    ...current,
                    [currentQuestion.id]: event.target.value.slice(0, 1000),
                  }))
                }
                placeholder="Type an answer, formula, or short explanation…"
              />
            </label>
          ) : (
            shuffleSeeded(
              ["A", "B", "C", "D"] as const,
              Number(currentQuestion.id.slice(1)) * 31 + currentIndex,
            ).map((letter) => (
              <label key={letter}>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={currentSelected.includes(letter)}
                  onChange={() =>
                    setAnswers((current) => ({
                      ...current,
                      [currentQuestion.id]: [letter],
                    }))
                  }
                />
                <strong>{letter}</strong>
                <span>{currentQuestion.options[letter]}</span>
              </label>
            ))
          )}
          {config.feedback === "instant" &&
            currentHasResponse &&
            !revealed.includes(currentQuestion.id) && (
              <button
                type="button"
                className="button secondary check-question"
                onClick={() =>
                  setRevealed((current) => [
                    ...new Set([...current, currentQuestion.id]),
                  ])
                }
              >
                Check this question
              </button>
            )}
          {config.feedback === "instant" &&
            revealed.includes(currentQuestion.id) && (
              <div className="instant-feedback" aria-live="polite">
                <QuestionExplanation question={currentQuestion} />
              </div>
            )}
        </fieldset>
      </div>
      <div className="test-step-controls">
        <button
          className="button secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
        >
          Previous question
        </button>
        <span>
          Question {currentIndex + 1} of {testQuestions.length}
        </span>
        <button
          className="button primary"
          disabled={currentIndex === testQuestions.length - 1}
          onClick={() =>
            setCurrentIndex((index) =>
              Math.min(testQuestions.length - 1, index + 1),
            )
          }
        >
          Next question
        </button>
      </div>
      <button className="button primary submit-bottom" onClick={requestSubmit}>
        Submit test
      </button>
    </div>
  );
}
