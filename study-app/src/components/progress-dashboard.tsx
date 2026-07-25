"use client";

import { Download, RotateCcw, Upload } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Question } from "@/data/question-schema";
import { useStudy } from "@/domain/progress/study-provider";

export function ProgressDashboard({ questions }: { questions: Question[] }) {
  const {
    state,
    exportData,
    importData,
    reset,
    setDailyGoal,
    hydrated,
    storageError,
    retrySave,
  } = useStudy();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const studied = new Set(state.attempts.map((attempt) => attempt.questionId));
  const correct = state.attempts.filter((attempt) => attempt.correct).length;
  const accuracy = state.attempts.length
    ? Math.round((correct / state.attempts.length) * 100)
    : 0;
  const topicStats = useMemo(() => {
    const questionById = new Map(questions.map((question) => [question.id, question]));
    const topics = new Map<string, { attempts: number; correct: number }>();
    for (const attempt of state.attempts) {
      const topic = questionById.get(attempt.questionId)?.topic ?? "Other";
      const value = topics.get(topic) ?? { attempts: 0, correct: 0 };
      value.attempts += 1;
      if (attempt.correct) value.correct += 1;
      topics.set(topic, value);
    }
    return [...topics.entries()]
      .map(([topic, value]) => ({
        topic,
        attempts: value.attempts,
        accuracy: Math.round((value.correct / value.attempts) * 100),
      }))
      .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
      .slice(0, 6);
  }, [questions, state.attempts]);
  const courseStats = useMemo(() => {
    const questionById = new Map(questions.map((question) => [question.id, question]));
    return ["C1", "C2", "C3"].map((course) => {
      const ids = new Set(
        questions
          .filter((question) => question.module.startsWith(course))
          .map((question) => question.id),
      );
      const seen = new Set(
        state.attempts
          .filter((attempt) => ids.has(attempt.questionId))
          .map((attempt) => attempt.questionId),
      );
      const mastered = state.mastered.filter((id) => ids.has(id)).length;
      return {
        course,
        total: ids.size,
        seen: seen.size,
        mastered,
        label:
          questionById.get([...ids][0] ?? "")?.course ?? `Course ${course.slice(1)}`,
      };
    });
  }, [questions, state.attempts, state.mastered]);
  const recentSessions = useMemo(() => {
    const sessions = new Map<
      string,
      { mode: string; attempts: number; correct: number; at: string }
    >();
    for (const attempt of state.attempts) {
      const current = sessions.get(attempt.sessionId) ?? {
        mode: attempt.mode,
        attempts: 0,
        correct: 0,
        at: attempt.at,
      };
      current.attempts += 1;
      if (attempt.correct) current.correct += 1;
      if (attempt.at > current.at) current.at = attempt.at;
      sessions.set(attempt.sessionId, current);
    }
    return [...sessions.values()]
      .sort((left, right) => right.at.localeCompare(left.at))
      .slice(0, 8);
  }, [state.attempts]);

  const download = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "rel301m-study-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!hydrated) {
    return <div className="page loading-state">Loading your local progress…</div>;
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Your progress</p>
        <h1>Turn practice into a clear next step</h1>
        <p>
          Progress lives only in this browser. Export a backup before clearing
          browser storage or moving to another device.
        </p>
      </header>
      {storageError && (
        <div className="feedback-banner bad" role="alert">
          <strong>{storageError}</strong>
          <button className="button secondary" onClick={retrySave}>
            Retry save
          </button>
        </div>
      )}
      <div className="metric-grid">
        <section>
          <small>Questions seen</small>
          <strong>{studied.size}</strong>
          <span>of 317</span>
        </section>
        <section>
          <small>Bank accuracy</small>
          <strong>{accuracy}%</strong>
          <span>{state.attempts.length} attempts</span>
        </section>
        <section>
          <small>Mastered</small>
          <strong>{state.mastered.length}</strong>
          <span>{state.difficult.length} need review</span>
        </section>
        <section>
          <small>Favorites</small>
          <strong>{state.favorites.length}</strong>
          <span>saved cards</span>
        </section>
      </div>
      <section className="progress-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Weak spots</p>
            <h2>Topics to revisit</h2>
          </div>
        </div>
        {topicStats.length ? (
          <div className="topic-list">
            {topicStats.map((item) => (
              <div key={item.topic}>
                <span>
                  {item.topic}{" "}
                  <Link
                    href={{
                      pathname: "/library/",
                      query: { topic: item.topic },
                    }}
                  >
                    Review
                  </Link>
                </span>
                <div>
                  <i style={{ width: `${item.accuracy}%` }} />
                </div>
                <strong>{item.accuracy}%</strong>
                <small>{item.attempts} tries</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <h3>No attempts yet</h3>
            <p>Complete a Learn round or practice test to see topic trends.</p>
          </div>
        )}
      </section>
      <section className="progress-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Course coverage</p>
            <h2>Progress across the curriculum</h2>
          </div>
        </div>
        <div className="topic-list">
          {courseStats.map((item) => (
            <div key={item.course}>
              <span>
                {item.course}{" "}
                <Link
                  href={{
                    pathname: "/library/",
                    query: { course: item.course },
                  }}
                >
                  Open
                </Link>
              </span>
              <div>
                <i
                  style={{
                    width: `${item.total ? (item.seen / item.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <strong>
                {item.seen}/{item.total}
              </strong>
              <small>{item.mastered} mastered</small>
            </div>
          ))}
        </div>
      </section>
      <section className="progress-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recent activity</p>
            <h2>Study-session history</h2>
          </div>
        </div>
        {recentSessions.length ? (
          <div className="review-list">
            {recentSessions.map((session, index) => (
              <div className="response-summary" key={`${session.at}-${index}`}>
                <strong>{session.mode}</strong> · {session.correct}/
                {session.attempts} bank-correct ·{" "}
                {new Date(session.at).toLocaleString()}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state compact">
            <h3>No sessions recorded</h3>
            <p>Your Learn, Test, Flashcards, and Match activity will appear here.</p>
          </div>
        )}
      </section>
      <section className="progress-section settings-panel">
        <div>
          <p className="eyebrow">Study settings</p>
          <h2>Daily goal and data</h2>
        </div>
        <label>
          Daily question goal
          <input
            type="number"
            min="5"
            max="100"
            value={state.dailyGoal}
            onChange={(event) => setDailyGoal(Number(event.target.value))}
          />
        </label>
        <div className="button-row">
          <button className="button secondary" onClick={download}>
            <Download /> Export backup
          </button>
          <button
            className="button secondary"
            onClick={() => inputRef.current?.click()}
          >
            <Upload /> Import backup
          </button>
          <input
            ref={inputRef}
            className="sr-only"
            type="file"
            aria-label="Import progress backup"
            accept="application/json"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const serialized = await file.text();
              const approved = window.confirm(
                `Import ${file.name} and replace current favorites, mastery, and attempts?`,
              );
              const valid = approved && importData(serialized);
              setMessage(valid ? "Backup imported." : "That backup is not valid.");
              event.target.value = "";
            }}
          />
          <button
            className="button danger"
            onClick={() => {
              if (
                window.confirm(
                  "Reset favorites, mastery, and all attempts on this device?",
                )
              ) {
                reset();
                setMessage("Local progress reset.");
              }
            }}
          >
            <RotateCcw /> Reset progress
          </button>
        </div>
        {message && <p role="status">{message}</p>}
      </section>
    </div>
  );
}
