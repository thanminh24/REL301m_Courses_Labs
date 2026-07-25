"use client";

import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  Star,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import qa from "@/data/generated/content-qa-manifest.json";
import type { Question } from "@/data/question-schema";
import { useStudy } from "@/domain/progress/study-provider";
import {
  safeStorageGet,
  safeStorageRemove,
  safeStorageSet,
} from "@/domain/storage/safe-storage";
import { shuffleSeeded } from "@/domain/study/session";
import { QuestionExplanation } from "./question-explanation";

type DeckScope = "all" | "favorites" | "difficult";
type DeckSnapshot = {
  version: 1;
  dataHash: string;
  sessionId: string;
  order: string[];
  index: number;
  flipped: boolean;
  scope: DeckScope;
  course: string;
  topic: string;
  verdict: "all" | Question["verdict"];
  evidence: "all" | Question["evidence"]["type"];
  shuffleSeed: number;
};

const FLASHCARD_SESSION_KEY = "rel301m-flashcard-session-v1";

export function FlashcardDeck({ questions }: { questions: Question[] }) {
  const { state, hydrated: progressHydrated, toggleFavorite, recordAttempt } =
    useStudy();
  const [sessionId, setSessionId] = useState("");
  const [scope, setScope] = useState<DeckScope>("all");
  const [course, setCourse] = useState("all");
  const [topic, setTopic] = useState("all");
  const [verdict, setVerdict] = useState<"all" | Question["verdict"]>("all");
  const [evidence, setEvidence] = useState<
    "all" | Question["evidence"]["type"]
  >("all");
  const [order, setOrder] = useState(() => questions.map((q) => q.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [sessionHydrated, setSessionHydrated] = useState(false);
  const [moveVersion, setMoveVersion] = useState(0);
  const cardRef = useRef<HTMLButtonElement>(null);
  const swipedRef = useRef(false);
  const topics = useMemo(
    () => Array.from(new Set(questions.map((question) => question.topic))).sort(),
    [questions],
  );

  useEffect(() => {
    if (!progressHydrated) return;
    const byId = new Set(questions.map((question) => question.id));
    const validTopics = new Set(questions.map((question) => question.topic));
    let restored = false;
    try {
      const saved = safeStorageGet(FLASHCARD_SESSION_KEY);
      if (saved) {
        const snapshot = JSON.parse(saved) as DeckSnapshot;
        if (
          snapshot.version === 1 &&
          snapshot.dataHash === qa.datasetHash &&
          typeof snapshot.sessionId === "string" &&
          snapshot.sessionId.startsWith("flashcards-") &&
          Array.isArray(snapshot.order) &&
          snapshot.order.length > 0 &&
          snapshot.order.length <= 634 &&
          snapshot.order.every((id) => byId.has(id)) &&
          Number.isInteger(snapshot.index) &&
          snapshot.index >= 0 &&
          snapshot.index < snapshot.order.length &&
          typeof snapshot.flipped === "boolean" &&
          ["all", "favorites", "difficult"].includes(snapshot.scope) &&
          ["all", "C1", "C2", "C3", "OUT"].includes(snapshot.course) &&
          (snapshot.topic === "all" || validTopics.has(snapshot.topic)) &&
          ["all", "correct", "acceptable-with-caveat", "incorrect", "bank-key-only"].includes(
            snapshot.verdict,
          ) &&
          ["all", "lecture", "book", "question-bank"].includes(
            snapshot.evidence,
          ) &&
          Number.isInteger(snapshot.shuffleSeed) &&
          snapshot.shuffleSeed >= 0
        ) {
          // Restoring the learner's exact deck position initializes the session.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSessionId(snapshot.sessionId);
          setOrder(snapshot.order);
          setIndex(snapshot.index);
          setFlipped(snapshot.flipped);
          setScope(snapshot.scope);
          setCourse(snapshot.course || "all");
          setTopic(snapshot.topic || "all");
          setVerdict(snapshot.verdict || "all");
          setEvidence(snapshot.evidence || "all");
          setShuffleSeed(
            Number.isInteger(snapshot.shuffleSeed) ? snapshot.shuffleSeed : 1,
          );
          restored = true;
        }
      }
    } catch {
      safeStorageRemove(FLASHCARD_SESSION_KEY);
    }
    if (!restored) setSessionId(`flashcards-${Date.now()}`);
    setSessionHydrated(true);
  }, [progressHydrated, questions]);

  useEffect(() => {
    if (!sessionHydrated || !sessionId) return;
    const snapshot: DeckSnapshot = {
      version: 1,
      dataHash: qa.datasetHash,
      sessionId,
      order,
      index,
      flipped,
      scope,
      course,
      topic,
      verdict,
      evidence,
      shuffleSeed,
    };
    safeStorageSet(FLASHCARD_SESSION_KEY, JSON.stringify(snapshot));
  }, [
    course,
    evidence,
    flipped,
    index,
    order,
    scope,
    sessionHydrated,
    sessionId,
    shuffleSeed,
    topic,
    verdict,
  ]);

  const visible = useMemo(() => {
    const byId = new Map(questions.map((question) => [question.id, question]));
    return order
      .map((id) => byId.get(id))
      .filter((question): question is Question => Boolean(question))
      .filter((question) => {
        const inScope =
          scope === "all" ||
          (scope === "favorites" && state.favorites.includes(question.id)) ||
          (scope === "difficult" && state.difficult.includes(question.id));
        return (
          inScope &&
          (course === "all" || question.module.startsWith(course)) &&
          (topic === "all" || question.topic === topic) &&
          (verdict === "all" || question.verdict === verdict) &&
          (evidence === "all" || question.evidence.type === evidence)
        );
      });
  }, [
    questions,
    order,
    scope,
    course,
    topic,
    verdict,
    evidence,
    state.favorites,
    state.difficult,
  ]);
  const safeIndex = visible.length ? Math.min(index, visible.length - 1) : 0;
  const question = visible[safeIndex];

  const move = useCallback(
    (direction: number) => {
      if (!visible.length) return;
      setIndex((current) => (current + direction + visible.length) % visible.length);
      setFlipped(false);
      setMoveVersion((version) => version + 1);
    },
    [visible.length],
  );

  useEffect(() => {
    if (!moveVersion) return;
    let settleFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      settleFrame = window.requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;
        const activeElement = document.activeElement;
        if (
          activeElement &&
          activeElement !== document.body &&
          activeElement !== card
        ) {
          return;
        }
        const desiredTop = 90;
        const cardTop = card.getBoundingClientRect().top;
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        window.scrollTo({
          top: Math.max(0, window.scrollY + cardTop - desiredTop),
          behavior: "auto",
        });
        root.style.scrollBehavior = previousScrollBehavior;
        card.focus({ preventScroll: true });
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settleFrame);
    };
  }, [moveVersion]);

  const rate = useCallback(
    (rating: "again" | "hard" | "good" | "easy") => {
      if (!question || !sessionId) return;
      if (!flipped) return;
      const known = rating === "good" || rating === "easy";
      recordAttempt({
        questionId: question.id,
        mode: "flashcards",
        sessionId,
        correct: known,
        conceptCorrect: known,
        selected: [],
      });
      if (rating === "again") {
        setOrder((current) => {
          const next = [...current];
          next.splice(Math.min(index + 3, next.length), 0, question.id);
          return next;
        });
      } else if (rating === "hard") {
        setOrder((current) => [...current, question.id]);
      }
      move(1);
    },
    [flipped, index, move, question, recordAttempt, sessionId],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target =
        event.target instanceof HTMLElement ? event.target : undefined;
      const flipControl = target?.closest(".flashcard-flip-control");
      if (
        target?.closest(
          "button, a, input, textarea, select, summary, [role='button'], [contenteditable='true']",
        ) &&
        !flipControl
      ) {
        return;
      }
      if (event.key === " " || event.key === "Enter") {
        if (flipControl) return;
        event.preventDefault();
        setFlipped((value) => !value);
      }
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key.toLowerCase() === "s" && question) {
        toggleFavorite(question.id);
      }
      if (event.key === "1") rate("again");
      if (event.key === "2") rate("hard");
      if (event.key === "3") rate("good");
      if (event.key === "4") rate("easy");
      if (event.key.toLowerCase() === "e" && question) setFlipped(true);
      if (event.key === "?") setShowHelp((value) => !value);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, question, rate, toggleFavorite]);

  const resetSession = () => {
    if (!window.confirm("Reset this Flashcards session and start a new deck?")) {
      return;
    }
    safeStorageRemove(FLASHCARD_SESSION_KEY);
    setSessionId(`flashcards-${Date.now()}`);
    setOrder(questions.map((item) => item.id));
    setIndex(0);
    setFlipped(false);
    setScope("all");
    setCourse("all");
    setTopic("all");
    setVerdict("all");
    setEvidence("all");
    setShuffleSeed(1);
  };

  if (!progressHydrated || !sessionHydrated) {
    return <div className="page loading-state">Restoring Flashcards session…</div>;
  }

  if (!question) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Flashcards</h1>
        </header>
        <div className="empty-state">
          <h2>This deck is empty</h2>
          <p>Star questions or answer some incorrectly, then return here.</p>
          <button className="button primary" onClick={() => setScope("all")}>
            Show all 317
          </button>
        </div>
      </div>
    );
  }

  const favorite = state.favorites.includes(question.id);
  return (
    <div className="page study-page">
      <header className="study-toolbar">
        <div>
          <p className="eyebrow">Flashcards</p>
          <h1>Build recall one card at a time</h1>
        </div>
        <div className="toolbar-actions">
          <select
            aria-label="Choose deck"
            value={scope}
            onChange={(event) => {
              setScope(event.target.value as DeckScope);
              setIndex(0);
              setFlipped(false);
            }}
          >
            <option value="all">All 317</option>
            <option value="favorites">Favorites</option>
            <option value="difficult">Needs review</option>
          </select>
          <select
            aria-label="Filter course"
            value={course}
            onChange={(event) => {
              setCourse(event.target.value);
              setIndex(0);
            }}
          >
            <option value="all">All courses</option>
            <option value="C1">Course 1</option>
            <option value="C2">Course 2</option>
            <option value="C3">Course 3</option>
            <option value="OUT">Outside scope</option>
          </select>
          <select
            aria-label="Filter topic"
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
              setIndex(0);
            }}
          >
            <option value="all">All topics</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter verdict"
            value={verdict}
            onChange={(event) => {
              setVerdict(event.target.value as typeof verdict);
              setIndex(0);
            }}
          >
            <option value="all">All verdicts</option>
            <option value="correct">Correct</option>
            <option value="acceptable-with-caveat">Caveat</option>
            <option value="incorrect">Incorrect key</option>
            <option value="bank-key-only">Bank-key only</option>
          </select>
          <select
            aria-label="Filter evidence"
            value={evidence}
            onChange={(event) => {
              setEvidence(event.target.value as typeof evidence);
              setIndex(0);
            }}
          >
            <option value="all">All evidence</option>
            <option value="lecture">Lecture</option>
            <option value="book">Book</option>
            <option value="question-bank">Question bank only</option>
          </select>
          <button
            className="icon-button"
            type="button"
            aria-label="Shuffle cards"
            onClick={() => {
              const nextSeed = shuffleSeed + 1;
              setShuffleSeed(nextSeed);
              setOrder(shuffleSeeded(order, nextSeed));
              setIndex(0);
              setFlipped(false);
            }}
          >
            <Shuffle />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Reset Flashcards session"
            onClick={resetSession}
          >
            <Trash2 />
          </button>
        </div>
      </header>
      <div className="deck-progress">
        <span>
          {safeIndex + 1} / {visible.length}
        </span>
        <div>
          <i style={{ width: `${((safeIndex + 1) / visible.length) * 100}%` }} />
        </div>
      </div>
      <div
        className={`flashcard ${flipped ? "is-flipped" : ""}`}
      >
        <div className="flashcard-face flashcard-front">
          <div className="card-meta">
            <span>{question.id}</span>
            <span>{question.topic}</span>
          </div>
          <h2>{question.stem}</h2>
          <ol>
            {(["A", "B", "C", "D"] as const).map((letter) => (
              <li key={letter}>
                <strong>{letter}</strong>
                <span>{question.options[letter]}</span>
              </li>
            ))}
          </ol>
          <span className="flip-hint">
            <RotateCcw /> Tap or press Space to reveal
          </span>
        </div>
        <div className="flashcard-face flashcard-back">
          <QuestionExplanation question={question} />
          <span className="flip-hint">
            <RotateCcw /> Tap to return
          </span>
        </div>
        <button
          ref={cardRef}
          type="button"
          className="flashcard-flip-control"
          onClick={() => {
            if (swipedRef.current) {
              swipedRef.current = false;
              return;
            }
            setFlipped((value) => !value);
          }}
          onTouchStart={(event) => {
            swipedRef.current = false;
            setTouchStart(event.touches[0]?.clientX ?? null);
          }}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const end = event.changedTouches[0]?.clientX ?? touchStart;
            const distance = end - touchStart;
            setTouchStart(null);
            if (Math.abs(distance) >= 70) {
              swipedRef.current = true;
              move(distance > 0 ? -1 : 1);
            }
          }}
          aria-expanded={flipped}
          aria-label={
            flipped
              ? `Showing answer for ${question.id}; flip to question`
              : `Showing question ${question.id}: ${question.stem}; flip to answer`
          }
        />
      </div>
      <div className="deck-controls">
        <button className="button secondary" onClick={() => move(-1)}>
          <ChevronLeft /> Previous
        </button>
        <button
          className={favorite ? "button favorite active" : "button favorite"}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(question.id)}
        >
          <Star fill={favorite ? "currentColor" : "none"} /> Star
        </button>
        <div className="mastery-buttons">
          <button
            className="button needs-work"
            disabled={!flipped}
            onClick={() => rate("again")}
          >
            Again · soon
          </button>
          <button
            className="button secondary"
            disabled={!flipped}
            onClick={() => rate("hard")}
          >
            Hard · requeue
          </button>
          <button
            className="button primary"
            disabled={!flipped}
            onClick={() => rate("good")}
          >
            Good · next session
          </button>
          <button
            className="button primary"
            disabled={!flipped}
            onClick={() => rate("easy")}
          >
            Easy · later <ChevronRight />
          </button>
        </div>
      </div>
      <p className="keyboard-help">
        Keyboard: Space flip · ←/→ move · S star · E reveal · 1–4 rate · ? help
      </p>
      {showHelp && (
        <div className="feedback-banner" role="status">
          <strong>Card shortcuts</strong>
          <span>
            Space flips, arrows move, S stars, E reveals, and 1–4 choose
            Again/Hard/Good/Easy. Swipe horizontally on touch screens.
          </span>
        </div>
      )}
    </div>
  );
}
