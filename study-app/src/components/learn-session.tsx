"use client";

import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { AnswerLetter, Question } from "@/data/question-schema";
import qa from "@/data/generated/content-qa-manifest.json";
import { useStudy } from "@/domain/progress/study-provider";
import { safeStorageGet, safeStorageSet } from "@/domain/storage/safe-storage";
import { createAdaptiveQueue, gradeExamAnswer } from "@/domain/study/session";

const LEARN_SESSION_KEY = "rel301m-learn-session-v2";

type LearnSnapshot = {
  version: 2;
  dataHash: string;
  queueIds: string[];
  index: number;
  selected: AnswerLetter[];
  checked: boolean;
  score: number;
  seed: number;
  needsRequeue: boolean;
};

function parseLearnSnapshot(value: string, validIds: Set<string>) {
  try {
    const parsed = JSON.parse(value) as LearnSnapshot;
    const validLetters = new Set(["A", "B", "C", "D"]);
    if (
      parsed.version !== 2 ||
      parsed.dataHash !== qa.datasetHash ||
      !Array.isArray(parsed.queueIds) ||
      parsed.queueIds.length < 7 ||
      parsed.queueIds.length > 12 ||
      !parsed.queueIds.every((id) => validIds.has(id)) ||
      !Number.isInteger(parsed.index) ||
      parsed.index < 0 ||
      parsed.index > parsed.queueIds.length ||
      !Array.isArray(parsed.selected) ||
      parsed.selected.length > 1 ||
      !parsed.selected.every((letter) => validLetters.has(letter)) ||
      typeof parsed.checked !== "boolean" ||
      !Number.isInteger(parsed.score) ||
      parsed.score < 0 ||
      !Number.isInteger(parsed.seed) ||
      typeof parsed.needsRequeue !== "boolean"
    ) return null;
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
  const [needsRequeue, setNeedsRequeue] = useState(false);
  const promptRef = useRef<HTMLElement>(null);
  const question = queue[index];

  useEffect(() => {
    if (!hydrated || queue.length) return;
    const byId = new Map(questions.map((item) => [item.id, item]));
    const saved = safeStorageGet(LEARN_SESSION_KEY);
    const snapshot = saved ? parseLearnSnapshot(saved, new Set(byId.keys())) : null;
    if (snapshot) {
      // Session restoration intentionally initializes local UI state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQueue(snapshot.queueIds.map((id) => byId.get(id)).filter((item): item is Question => Boolean(item)));
      setIndex(snapshot.index);
      setSelected(snapshot.selected);
      setChecked(snapshot.checked);
      setScore(snapshot.score);
      setSeed(snapshot.seed);
      setNeedsRequeue(snapshot.needsRequeue);
      return;
    }
    setQueue(createAdaptiveQueue(questions, state.difficult, state.mastered, 10, seed));
  }, [hydrated, questions, queue.length, seed, state.difficult, state.mastered]);

  useEffect(() => {
    if (!hydrated || !queue.length) return;
    safeStorageSet(LEARN_SESSION_KEY, JSON.stringify({
      version: 2,
      dataHash: qa.datasetHash,
      queueIds: queue.map((item) => item.id),
      index,
      selected,
      checked,
      score,
      seed,
      needsRequeue,
    } satisfies LearnSnapshot));
  }, [checked, hydrated, index, needsRequeue, queue, score, seed, selected]);

  const restart = () => {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setQueue(createAdaptiveQueue(questions, state.difficult, state.mastered, 10, nextSeed));
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setScore(0);
    setNeedsRequeue(false);
  };

  const advance = (requeue: boolean) => {
    if (requeue && queue.length < 12 && !queue.slice(index + 1).some((item) => item.id === question.id)) {
      setQueue((current) => [...current, question]);
    }
    setIndex((value) => value + 1);
    setSelected([]);
    setChecked(false);
    setNeedsRequeue(false);
    window.requestAnimationFrame(() => promptRef.current?.focus());
  };

  if (!hydrated || !queue.length) return <div className="page loading-state">Restoring Learn session…</div>;

  if (index >= queue.length) {
    return (
      <div className="page">
        <section className="completion-card">
          <span className="completion-icon"><Check /></span>
          <p className="eyebrow">Round complete</p>
          <h1>{score} / {queue.length} best answers correct</h1>
          <p>Incorrect items were added once more to this round. A fresh round prioritizes weak questions.</p>
          <button className="button primary" onClick={restart}><RotateCcw /> Start another round</button>
        </section>
      </div>
    );
  }

  const check = () => {
    if (!selected.length) return;
    const correct = gradeExamAnswer(question, selected);
    recordAttempt({
      questionId: question.id,
      mode: "learn",
      sessionId: `learn-${seed}`,
      correct,
      conceptCorrect: correct,
      selected,
    });
    if (correct) {
      setScore((value) => value + 1);
      advance(false);
      return;
    }
    setNeedsRequeue(true);
    setChecked(true);
  };

  return (
    <div className="page study-page">
      <header className="study-toolbar">
        <div><p className="eyebrow">Adaptive Learn</p><h1>Choose the best available answer</h1></div>
        <div className="toolbar-actions">
          <span className="session-score">Score {score} · {index + 1}/{queue.length}</span>
          <button className="button secondary" onClick={() => window.confirm("Reset this Learn round and create a new one?") && restart()}>
            <RotateCcw /> Reset session
          </button>
        </div>
      </header>
      <div className="deck-progress"><span>Round progress</span><div><i style={{ width: `${((index + 1) / queue.length) * 100}%` }} /></div></div>
      <article className="learn-card" ref={promptRef} tabIndex={-1}>
        <div className="card-meta"><span>{question.id}</span><span>{question.topic}</span></div>
        <h2>{question.stem}</h2>
        <div className="answer-grid">
          {(["A", "B", "C", "D"] as const).map((letter) => {
            const active = selected.includes(letter);
            const answer = checked && letter === question.examAnswer.letter;
            const wrong = checked && active && !answer;
            return (
              <button className={`answer-option ${active ? "selected" : ""} ${answer ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                key={letter} disabled={checked} onClick={() => setSelected([letter])} aria-pressed={active}>
                <strong>{letter}</strong><span>{question.options[letter]}</span>
                {answer && <Check aria-label="Best answer" />}{wrong && <X aria-label="Incorrect answer" />}
              </button>
            );
          })}
        </div>
        {!checked ? (
          <div className="button-row"><button className="button primary check-button" disabled={!selected.length} onClick={check}>Check answer</button></div>
        ) : (
          <div className="learn-feedback" aria-live="polite">
            <div className="feedback-banner bad">
              <strong>Best answer: {question.examAnswer.letter}. {question.examAnswer.text}</strong>
              <span>{question.explanation}</span>
            </div>
            <p className="takeaway"><strong>Remember: </strong>{question.keyTakeaway}</p>
            <button className="button primary" onClick={() => advance(needsRequeue)}>Next question <ArrowRight /></button>
          </div>
        )}
      </article>
    </div>
  );
}
