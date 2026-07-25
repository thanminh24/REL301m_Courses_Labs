"use client";

import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AnswerLetter, Question } from "@/data/question-schema";
import qa from "@/data/generated/content-qa-manifest.json";
import { useStudy } from "@/domain/progress/study-provider";
import { safeStorageGet, safeStorageSet } from "@/domain/storage/safe-storage";
import {
  createAdaptiveQueue,
  gradeConceptAnswer,
  gradeExamAnswer,
} from "@/domain/study/session";
import { QuestionExplanation } from "./question-explanation";

const LEARN_SESSION_KEY = "rel301m-learn-session-v1";

type LearnSnapshot = {
  version: 1;
  dataHash: string;
  queueIds: string[];
  index: number;
  selected: AnswerLetter[];
  checked: boolean;
  score: number;
  seed: number;
  responseMode: "choice" | "typed";
  typedResponse: string;
  typedFailures: number;
  needsRequeue: boolean;
};

const normalizeTyped = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

function parseLearnSnapshot(value: string, validIds: Set<string>) {
  try {
    const parsed = JSON.parse(value) as LearnSnapshot;
    const validLetters = new Set(["A", "B", "C", "D"]);
    if (
      parsed.version !== 1 ||
      parsed.dataHash !== qa.datasetHash ||
      !Array.isArray(parsed.queueIds) ||
      parsed.queueIds.length < 7 ||
      parsed.queueIds.length > 12 ||
      !parsed.queueIds.every((id) => validIds.has(id)) ||
      [...new Set(parsed.queueIds)].some(
        (id) => parsed.queueIds.filter((item) => item === id).length > 2,
      ) ||
      !Number.isInteger(parsed.index) ||
      parsed.index < 0 ||
      parsed.index > parsed.queueIds.length ||
      !Array.isArray(parsed.selected) ||
      !parsed.selected.every((letter) => validLetters.has(letter)) ||
      typeof parsed.checked !== "boolean" ||
      !Number.isInteger(parsed.score) ||
      parsed.score < 0 ||
      !Number.isInteger(parsed.seed) ||
      !["choice", "typed"].includes(parsed.responseMode ?? "choice") ||
      typeof (parsed.typedResponse ?? "") !== "string" ||
      (parsed.typedResponse ?? "").length > 1000 ||
      !Number.isInteger(parsed.typedFailures ?? 0) ||
      (parsed.typedFailures ?? 0) < 0 ||
      (parsed.typedFailures ?? 0) > 2 ||
      typeof (parsed.needsRequeue ?? false) !== "boolean"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function LearnSession({ questions }: { questions: Question[] }) {
  const { state, hydrated, recordAttempt } = useStudy();
  const [queue, setQueue] = useState<Question[]>([]);
  const [seed, setSeed] = useState(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<AnswerLetter[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [responseMode, setResponseMode] = useState<"choice" | "typed">(
    "choice",
  );
  const [typedResponse, setTypedResponse] = useState("");
  const [typedFailures, setTypedFailures] = useState(0);
  const [needsRequeue, setNeedsRequeue] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLElement>(null);
  const question = queue[index];

  useEffect(() => {
    if (checked) feedbackRef.current?.focus();
  }, [checked]);

  useEffect(() => {
    if (!hydrated || queue.length) return;
    const byId = new Map(questions.map((item) => [item.id, item]));
    const saved = safeStorageGet(LEARN_SESSION_KEY);
    const snapshot = saved
      ? parseLearnSnapshot(saved, new Set(byId.keys()))
      : null;
    if (snapshot) {
      // Browser session restoration intentionally initializes local UI state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQueue(
        snapshot.queueIds
          .map((id) => byId.get(id))
          .filter((item): item is Question => Boolean(item)),
      );
      setIndex(snapshot.index);
      setSelected(snapshot.selected);
      setChecked(snapshot.checked);
      setScore(snapshot.score);
      setSeed(snapshot.seed);
      setResponseMode(snapshot.responseMode ?? "choice");
      setTypedResponse(snapshot.typedResponse ?? "");
      setTypedFailures(snapshot.typedFailures ?? 0);
      setNeedsRequeue(snapshot.needsRequeue ?? false);
      return;
    }
    setQueue(
      createAdaptiveQueue(
        questions,
        state.difficult,
        state.mastered,
        10,
        seed,
      ),
    );
  }, [hydrated, questions, queue.length, seed, state.difficult, state.mastered]);

  useEffect(() => {
    if (!hydrated || !queue.length) return;
    const snapshot: LearnSnapshot = {
      version: 1,
      dataHash: qa.datasetHash,
      queueIds: queue.map((item) => item.id),
      index,
      selected,
      checked,
      score,
      seed,
      responseMode,
      typedResponse,
      typedFailures,
      needsRequeue,
    };
    safeStorageSet(LEARN_SESSION_KEY, JSON.stringify(snapshot));
  }, [
    checked,
    hydrated,
    index,
    needsRequeue,
    queue,
    responseMode,
    score,
    seed,
    selected,
    typedFailures,
    typedResponse,
  ]);

  const restart = () => {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setQueue(
      createAdaptiveQueue(
        questions,
        state.difficult,
        state.mastered,
        10,
        nextSeed,
      ),
    );
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setScore(0);
    setResponseMode("choice");
    setTypedResponse("");
    setTypedFailures(0);
    setNeedsRequeue(false);
  };

  if (!hydrated || !queue.length) {
    return <div className="page loading-state">Restoring Learn session…</div>;
  }

  if (index >= queue.length) {
    return (
      <div className="page">
        <section className="completion-card">
          <span className="completion-icon">
            <Check />
          </span>
          <p className="eyebrow">Round complete</p>
          <h1>
            {score} / {queue.length} bank answers correct
          </h1>
          <p>
            Incorrect items have been added to your review queue. A fresh round
            prioritizes those before introducing new material.
          </p>
          <button className="button primary" onClick={restart}>
            <RotateCcw /> Start another round
          </button>
        </section>
      </div>
    );
  }

  const allowsMultiple = question.conceptualAnswer.kind === "multiple";
  const seenBefore = state.attempts.some(
    (attempt) => attempt.questionId === question.id,
  );
  const canType =
    seenBefore &&
    question.verdict !== "bank-key-only" &&
    question.verdict !== "incorrect" &&
    question.conceptualAnswer.kind !== "multiple" &&
    question.conceptualAnswer.kind !== "manual-review" &&
    Boolean(
      question.conceptualAnswer.display ||
        question.conceptualAnswer.aliases.length,
    );
  const examCorrect = checked
    ? responseMode === "typed"
      ? [question.examAnswer.letter, question.examAnswer.text]
          .map(normalizeTyped)
          .includes(normalizeTyped(typedResponse))
      : gradeExamAnswer(question, selected)
    : false;
  const conceptCorrect = checked
    ? responseMode === "typed"
      ? [
          question.conceptualAnswer.display,
          ...question.conceptualAnswer.aliases,
          ...question.conceptualAnswer.acceptedLetters.map(
            (letter) => question.options[letter],
          ),
        ]
          .filter((value): value is string => Boolean(value))
          .map(normalizeTyped)
          .includes(normalizeTyped(typedResponse))
      : gradeConceptAnswer(question, selected)
    : null;

  const toggle = (letter: AnswerLetter) => {
    if (checked) return;
    setSelected((current) =>
      allowsMultiple
        ? current.includes(letter)
          ? current.filter((item) => item !== letter)
          : [...current, letter]
        : [letter],
    );
  };

  const check = () => {
    if (responseMode === "typed") {
      if (!typedResponse.trim()) return;
      const normalized = normalizeTyped(typedResponse);
      const bankCorrect =
        normalized === normalizeTyped(question.examAnswer.letter) ||
        normalized === normalizeTyped(question.examAnswer.text);
      const accepted = [
        question.conceptualAnswer.display,
        ...question.conceptualAnswer.aliases,
        ...question.conceptualAnswer.acceptedLetters.map(
          (letter) => question.options[letter],
        ),
      ]
        .filter((value): value is string => Boolean(value))
        .map(normalizeTyped);
      const conceptual = accepted.includes(normalized);
      recordAttempt({
        questionId: question.id,
        mode: "learn",
        sessionId: `learn-${seed}`,
        correct: bankCorrect,
        conceptCorrect: conceptual,
        selected: [],
      });
      if (!conceptual && typedFailures < 1) {
        setTypedFailures((value) => value + 1);
        setTypedResponse("");
        setNeedsRequeue(true);
        return;
      }
      setChecked(true);
      setNeedsRequeue(!conceptual);
      if (bankCorrect) setScore((value) => value + 1);
      return;
    }
    if (!selected.length) return;
    const correct = gradeExamAnswer(question, selected);
    const conceptual = gradeConceptAnswer(question, selected);
    setChecked(true);
    setNeedsRequeue(conceptual === false);
    if (correct) setScore((value) => value + 1);
    recordAttempt({
      questionId: question.id,
      mode: "learn",
      sessionId: `learn-${seed}`,
      correct,
      conceptCorrect: conceptual,
      selected,
    });
  };

  return (
    <div className="page study-page">
      <header className="study-toolbar">
        <div>
          <p className="eyebrow">Adaptive Learn</p>
          <h1>Practice your weakest concepts first</h1>
        </div>
        <div className="toolbar-actions">
          <span className="session-score">
            Score {score} · {index + 1}/{queue.length}
          </span>
          <button
            className="button secondary"
            onClick={() => {
              if (window.confirm("Reset this Learn round and create a new one?")) {
                restart();
              }
            }}
          >
            <RotateCcw /> Reset session
          </button>
        </div>
      </header>
      <div className="deck-progress">
        <span>Round progress</span>
        <div>
          <i style={{ width: `${((index + 1) / queue.length) * 100}%` }} />
        </div>
      </div>
      <article className="learn-card" ref={promptRef} tabIndex={-1}>
        <div className="card-meta">
          <span>{question.id}</span>
          <span>{question.topic}</span>
        </div>
        <h2>{question.stem}</h2>
        {canType && !checked && (
          <div className="toolbar-actions" role="group" aria-label="Answer mode">
            <button
              className={
                responseMode === "choice" ? "button primary" : "button secondary"
              }
              aria-pressed={responseMode === "choice"}
              onClick={() => setResponseMode("choice")}
            >
              Multiple choice
            </button>
            <button
              className={
                responseMode === "typed" ? "button primary" : "button secondary"
              }
              aria-pressed={responseMode === "typed"}
              onClick={() => {
                setResponseMode("typed");
                setSelected([]);
              }}
            >
              Type from memory
            </button>
          </div>
        )}
        {allowsMultiple && (
          <p className="selection-hint">Select every conceptually valid choice.</p>
        )}
        {responseMode === "choice" ? (
        <div className="answer-grid">
          {(["A", "B", "C", "D"] as const).map((letter) => {
            const active = selected.includes(letter);
            const bankAnswer = checked && letter === question.examAnswer.letter;
            const wrong = checked && active && !bankAnswer;
            return (
              <button
                className={`answer-option ${active ? "selected" : ""} ${
                  bankAnswer ? "correct" : ""
                } ${wrong ? "wrong" : ""}`}
                key={letter}
                onClick={() => toggle(letter)}
                aria-pressed={active}
              >
                <strong>{letter}</strong>
                <span>{question.options[letter]}</span>
                {bankAnswer && <Check aria-label="Bank answer" />}
                {wrong && <X aria-label="Not the bank answer" />}
              </button>
            );
          })}
        </div>
        ) : (
          <label className="written-response">
            <span>Type the concept, answer, or curated equivalent</span>
            <textarea
              value={typedResponse}
              disabled={checked}
              onChange={(event) =>
                setTypedResponse(event.target.value.slice(0, 1000))
              }
              placeholder="Recall the answer without seeing the options…"
            />
            {typedFailures === 1 && !checked && (
              <small role="alert">
                Not an exact curated match yet. Try once more; then the full
                explanation will be revealed.
              </small>
            )}
          </label>
        )}
        {!checked ? (
          <div className="button-row">
            <button
              className="button primary check-button"
              disabled={
                responseMode === "typed"
                  ? !typedResponse.trim()
                  : !selected.length
              }
              onClick={check}
            >
              Check answer
            </button>
            {responseMode === "typed" && (
              <button
                className="button secondary"
                onClick={() => {
                  recordAttempt({
                    questionId: question.id,
                    mode: "learn",
                    sessionId: `learn-${seed}`,
                    correct: false,
                    conceptCorrect: false,
                    selected: [],
                  });
                  setNeedsRequeue(true);
                  setTypedFailures(2);
                  setChecked(true);
                }}
              >
                I don&apos;t know
              </button>
            )}
          </div>
        ) : (
          <div
            className="learn-feedback"
            aria-live="polite"
            ref={feedbackRef}
            tabIndex={-1}
          >
            <div
              className={examCorrect ? "feedback-banner good" : "feedback-banner bad"}
            >
              <strong>
                {examCorrect
                  ? "Correct for the exam bank"
                  : `Bank answer: ${question.examAnswer.letter}`}
              </strong>
              <span>
                {conceptCorrect === null
                  ? "This item requires conceptual review beyond letter grading."
                  : conceptCorrect
                    ? "Your selection is also conceptually accurate."
                    : "Read the conceptual correction below."}
              </span>
            </div>
            <QuestionExplanation question={question} />
            <button
              className="button primary"
              onClick={() => {
                if (
                  needsRequeue &&
                  queue.length < 12 &&
                  !queue.slice(index + 1).some((item) => item.id === question.id)
                ) {
                  setQueue((current) => [...current, question]);
                }
                setIndex((value) => value + 1);
                setSelected([]);
                setChecked(false);
                setResponseMode("choice");
                setTypedResponse("");
                setTypedFailures(0);
                setNeedsRequeue(false);
                window.requestAnimationFrame(() => promptRef.current?.focus());
              }}
            >
              Next question <ArrowRight />
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
