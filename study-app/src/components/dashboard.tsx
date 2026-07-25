"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  GraduationCap,
  Layers3,
  Puzzle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useStudy } from "@/domain/progress/study-provider";

const modes = [
  {
    href: "/flashcards/",
    title: "Flashcards",
    description: "Flip, star, requeue, and build mastery across separate sessions.",
    icon: Layers3,
    tone: "mint",
  },
  {
    href: "/learn/",
    title: "Adaptive Learn",
    description: "Practice weak concepts with immediate, source-aware feedback.",
    icon: Brain,
    tone: "peach",
  },
  {
    href: "/test/",
    title: "Practice Test",
    description: "Build a timed or untimed exam and grade both bank and concept.",
    icon: GraduationCap,
    tone: "gold",
  },
  {
    href: "/match/",
    title: "Match",
    description: "Race to pair questions with the supplied exam answers.",
    icon: Puzzle,
    tone: "lavender",
  },
];

export function Dashboard() {
  const { state } = useStudy();
  const studied = new Set(state.attempts.map((attempt) => attempt.questionId));
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  const todayCount = state.attempts.filter((attempt) => {
    const date = new Date(attempt.at);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayKey;
  }).length;
  const goalPercent = Math.min(100, (todayCount / state.dailyGoal) * 100);
  const recentSessions = useMemo(() => {
    const sessions = new Map<
      string,
      { mode: string; attempts: number; correct: number; at: string }
    >();
    for (const attempt of state.attempts) {
      const session = sessions.get(attempt.sessionId) ?? {
        mode: attempt.mode,
        attempts: 0,
        correct: 0,
        at: attempt.at,
      };
      session.attempts += 1;
      if (attempt.correct) session.correct += 1;
      if (attempt.at > session.at) session.at = attempt.at;
      sessions.set(attempt.sessionId, session);
    }
    return [...sessions.values()]
      .sort((left, right) => right.at.localeCompare(left.at))
      .slice(0, 3);
  }, [state.attempts]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">
            <Sparkles aria-hidden="true" /> Canonical exam set
          </p>
          <h1>Understand the ideas. Remember the 317.</h1>
          <p className="hero-copy">
            Every question keeps the tested answer intact while clearly marking
            corrections, ambiguity, and the deeper concept from lectures or
            Sutton–Barto.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/learn/">
              Continue learning <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button secondary" href="/library/">
              Browse all questions
            </Link>
          </div>
        </div>
        <div className="hero-progress" aria-label="Study progress">
          <span className="progress-orbit">
            <strong>{studied.size}</strong>
            <small>of 317 seen</small>
          </span>
          <div>
            <BookOpenCheck aria-hidden="true" />
            <p>
              <strong>{state.mastered.length}</strong> mastered
            </p>
            <p>
              <strong>{state.difficult.length}</strong> need review
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="today-heading" className="daily-panel">
        <div>
          <p className="eyebrow">Today&apos;s rhythm</p>
          <h2 id="today-heading">
            {todayCount >= state.dailyGoal
              ? "Daily goal complete"
              : `${state.dailyGoal - todayCount} questions to your goal`}
          </h2>
        </div>
        <div className="goal-meter">
          <div
            className="goal-meter-fill"
            style={{ width: `${goalPercent}%` }}
          />
        </div>
        <span>
          {todayCount} / {state.dailyGoal}
        </span>
      </section>

      <section aria-labelledby="mode-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your mode</p>
            <h2 id="mode-heading">A different way in for every study mood</h2>
          </div>
        </div>
        <div className="mode-grid">
          {modes.map(({ href, title, description, icon: Icon, tone }) => (
            <Link className={`mode-card ${tone}`} href={href} key={href}>
              <span className="mode-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="text-link">
                Open mode <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-detail-grid" aria-label="Study overview">
        <article>
          <p className="eyebrow">Evidence snapshot</p>
          <h2>Know what supports each answer</h2>
          <div className="metric-grid compact-metrics">
            <span>
              <strong>225</strong> lecture
            </span>
            <span>
              <strong>54</strong> book
            </span>
            <span>
              <strong>38</strong> bank-only
            </span>
          </div>
        </article>
        <article>
          <p className="eyebrow">Recent sessions</p>
          <h2>{recentSessions.length ? "Continue your rhythm" : "Ready when you are"}</h2>
          {recentSessions.length ? (
            <div className="session-list">
              {recentSessions.map((session, index) => (
                <p key={`${session.at}-${index}`}>
                  <strong>{session.mode}</strong>
                  <span>
                    {session.correct}/{session.attempts} bank-correct
                  </span>
                </p>
              ))}
            </div>
          ) : (
            <p>Complete a card rating, Learn prompt, Match pair, or Test item.</p>
          )}
        </article>
      </section>
    </div>
  );
}
