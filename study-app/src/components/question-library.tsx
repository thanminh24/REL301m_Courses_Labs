"use client";

import { ChevronDown, Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/data/question-schema";
import { filterQuestions } from "@/domain/questions/search";
import { useStudy } from "@/domain/progress/study-provider";
import {
  safeStorageGet,
  safeStorageRemove,
  safeStorageSet,
} from "@/domain/storage/safe-storage";
import { QuestionExplanation } from "./question-explanation";
import { VerdictBadge } from "./verdict-badge";

const LIBRARY_FILTER_KEY = "rel301m-library-filters-v1";

export function QuestionLibrary({ questions }: { questions: Question[] }) {
  const { state, toggleFavorite } = useStudy();
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("all");
  const [topic, setTopic] = useState("all");
  const [verdict, setVerdict] = useState<Question["verdict"] | "all">("all");
  const [evidence, setEvidence] = useState<
    Question["evidence"]["type"] | "all"
  >("all");
  const [mastery, setMastery] = useState<"all" | "mastered" | "difficult">(
    "all",
  );
  const [sort, setSort] = useState<"number" | "topic">("number");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersHydrated, setFiltersHydrated] = useState(false);
  const topics = useMemo(
    () => Array.from(new Set(questions.map((question) => question.topic))).sort(),
    [questions],
  );
  useEffect(() => {
    try {
      const saved = safeStorageGet(LIBRARY_FILTER_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, unknown>;
        // Restoring explicitly saved filter controls initializes this view.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (typeof parsed.query === "string") setQuery(parsed.query.slice(0, 500));
        if (typeof parsed.course === "string") setCourse(parsed.course);
        if (typeof parsed.topic === "string") setTopic(parsed.topic);
        if (typeof parsed.verdict === "string") {
          setVerdict(parsed.verdict as typeof verdict);
        }
        if (typeof parsed.evidence === "string") {
          setEvidence(parsed.evidence as typeof evidence);
        }
        if (typeof parsed.mastery === "string") {
          setMastery(parsed.mastery as typeof mastery);
        }
        if (typeof parsed.sort === "string") setSort(parsed.sort as typeof sort);
        if (typeof parsed.favoriteOnly === "boolean") {
          setFavoriteOnly(parsed.favoriteOnly);
        }
        if (typeof parsed.openId === "string") setOpenId(parsed.openId);
      }
      const url = new URL(window.location.href);
      const fromUrl = (key: string) => url.searchParams.get(key);
      if (fromUrl("q") !== null) setQuery(fromUrl("q")!.slice(0, 500));
      if (fromUrl("course")) setCourse(fromUrl("course")!);
      if (fromUrl("topic")) setTopic(fromUrl("topic")!);
      if (fromUrl("verdict")) setVerdict(fromUrl("verdict") as typeof verdict);
      if (fromUrl("evidence")) {
        setEvidence(fromUrl("evidence") as typeof evidence);
      }
      if (fromUrl("mastery")) setMastery(fromUrl("mastery") as typeof mastery);
      if (fromUrl("sort")) setSort(fromUrl("sort") as typeof sort);
      if (fromUrl("favorite") === "1") setFavoriteOnly(true);
      if (fromUrl("id")) setOpenId(fromUrl("id"));
    } catch {
      safeStorageRemove(LIBRARY_FILTER_KEY);
    }
    setFiltersHydrated(true);
  }, []);

  useEffect(() => {
    if (!filtersHydrated) return;
    try {
      safeStorageSet(
        LIBRARY_FILTER_KEY,
        JSON.stringify({
          query,
          course,
          topic,
          verdict,
          evidence,
          mastery,
          sort,
          favoriteOnly,
          openId,
        }),
      );
      const url = new URL(window.location.href);
      const values = {
        q: query,
        course,
        topic,
        verdict,
        evidence,
        mastery,
        sort,
        favorite: favoriteOnly ? "1" : "",
        id: openId ?? "",
      };
      for (const [key, value] of Object.entries(values)) {
        if (!value || value === "all" || (key === "sort" && value === "number")) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, value);
        }
      }
      window.history.replaceState(null, "", `${url.pathname}${url.search}`);
    } catch {
      // Filtering remains available in memory if browser storage is unavailable.
    }
  }, [
    course,
    evidence,
    favoriteOnly,
    filtersHydrated,
    mastery,
    openId,
    query,
    sort,
    topic,
    verdict,
  ]);
  const activeFilterCount = [
    course !== "all",
    topic !== "all",
    verdict !== "all",
    evidence !== "all",
    mastery !== "all",
    favoriteOnly,
    sort !== "number",
  ].filter(Boolean).length;
  const clearFilters = () => {
    setQuery("");
    setCourse("all");
    setTopic("all");
    setVerdict("all");
    setEvidence("all");
    setMastery("all");
    setSort("number");
    setFavoriteOnly(false);
    setOpenId(null);
  };
  const filtered = useMemo(() => {
    const result = filterQuestions(questions, {
        query,
        course,
        topic,
        verdict,
        evidence,
        mastery,
        favorites: favoriteOnly ? new Set(state.favorites) : undefined,
        mastered: new Set(state.mastered),
        difficult: new Set(state.difficult),
      });
    return sort === "topic"
      ? result.sort(
          (left, right) =>
            left.topic.localeCompare(right.topic) ||
            left.id.localeCompare(right.id),
        )
      : result;
  }, [
    questions,
    query,
    course,
    topic,
    verdict,
    evidence,
    mastery,
    favoriteOnly,
    state.favorites,
    state.mastered,
    state.difficult,
    sort,
  ]);

  if (!filtersHydrated) {
    return <div className="page loading-state">Restoring question filters…</div>;
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Full canonical collection</p>
        <h1>Question bank</h1>
        <p>
          Search every question, inspect all four choices, and expand the
          verified reasoning without losing the school&apos;s supplied key.
        </p>
      </header>
      <section
        className={`filter-bar ${filtersOpen ? "" : "filters-collapsed"}`}
        aria-label="Question filters"
      >
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Search questions</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search ID, question, option, explanation…"
          />
        </label>
        <button
          className="filter-panel-toggle"
          type="button"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((value) => !value)}
        >
          Filters ({activeFilterCount})
        </button>
        <label>
          <span className="sr-only">Topic</span>
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">All topics</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Course</span>
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="all">All courses</option>
            <option value="C1">Course 1</option>
            <option value="C2">Course 2</option>
            <option value="C3">Course 3</option>
            <option value="OUT">Outside course scope</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Evidence source</span>
          <select
            value={evidence}
            onChange={(event) =>
              setEvidence(
                event.target.value as Question["evidence"]["type"] | "all",
              )
            }
          >
            <option value="all">All evidence</option>
            <option value="lecture">Lecture slides</option>
            <option value="book">Sutton–Barto book</option>
            <option value="question-bank">Question bank only</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Mastery state</span>
          <select
            value={mastery}
            onChange={(event) =>
              setMastery(event.target.value as typeof mastery)
            }
          >
            <option value="all">All mastery states</option>
            <option value="mastered">Mastered</option>
            <option value="difficult">Needs review</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Sort questions</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as typeof sort)}
          >
            <option value="number">Sort by question number</option>
            <option value="topic">Sort by topic</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Verification status</span>
          <select
            value={verdict}
            onChange={(event) =>
              setVerdict(event.target.value as Question["verdict"] | "all")
            }
          >
            <option value="all">All verdicts</option>
            <option value="correct">Verified</option>
            <option value="acceptable-with-caveat">With caveat</option>
            <option value="incorrect">Bank key challenged</option>
            <option value="bank-key-only">Bank-only</option>
          </select>
        </label>
        <button
          type="button"
          className={favoriteOnly ? "filter-toggle active" : "filter-toggle"}
          aria-pressed={favoriteOnly}
          onClick={() => setFavoriteOnly((value) => !value)}
        >
          <Star aria-hidden="true" /> Favorites
        </button>
        <button className="filter-toggle clear-filters" onClick={clearFilters}>
          Clear filters
        </button>
      </section>
      <p className="result-count" role="status">
        Showing {filtered.length} of 317
      </p>
      <div className="question-list">
        {filtered.map((question) => {
          const open = openId === question.id;
          const favorite = state.favorites.includes(question.id);
          return (
            <article className="question-row" key={question.id}>
              <div className="question-row-main">
                <button
                  className="favorite-button"
                  type="button"
                  aria-label={
                    favorite
                      ? `Remove ${question.id} from favorites`
                      : `Add ${question.id} to favorites`
                  }
                  aria-pressed={favorite}
                  onClick={() => toggleFavorite(question.id)}
                >
                  <Star fill={favorite ? "currentColor" : "none"} />
                </button>
                <button
                  className="question-disclosure"
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : question.id)}
                >
                  <span className="question-id">{question.id}</span>
                  <span className="question-title">{question.stem}</span>
                  <VerdictBadge verdict={question.verdict} />
                  <ChevronDown
                    className={open ? "rotate" : ""}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {open && (
                <div className="question-row-details">
                  <ol className="compact-options">
                    {(["A", "B", "C", "D"] as const).map((letter) => (
                      <li key={letter}>
                        <strong>{letter}.</strong> {question.options[letter]}
                      </li>
                    ))}
                  </ol>
                  <QuestionExplanation question={question} />
                </div>
              )}
            </article>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No questions match</h2>
          <p>Clear a filter or try a broader keyword.</p>
        </div>
      )}
    </div>
  );
}
