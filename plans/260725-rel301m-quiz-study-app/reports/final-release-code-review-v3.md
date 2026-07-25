# Final release code review v3

Date: 2026-07-25  
Scope: final `study-app/` source and static export after v2 remediation  
Review mode: independent, read-only; no application or test source changed

## Verdict

**FAIL — 0 high findings, 1 unresolved medium finding.**

The main graders, deterministic build ID, static-export browser wiring, blocked-at-load
storage fallback, offline deep links, malformed snapshot recovery, and reviewed
accessibility paths pass. Release still fails the persistence failure/retry contract.

## Concurrent remediations reverified

### Offline query deep links — FIXED/PASS

`public/sw.js:65-87` now resolves same-origin navigation cache misses by pathname,
so a query-bearing URL can use the cached route shell without losing the requested URL
state. `tests/production/offline.spec.ts:13-40` now cold-opens
`/library/?q=Q004&id=Q004` offline and asserts both Question bank and Q004.

Fresh production-offline run: **2/2 passed**, including the exact Q004 deep link and
cache-update isolation.

### Hash-current malformed snapshots — FIXED/PASS

- Match now requires unique matched IDs, exact generated-round membership, valid
  selected tiles, and nonnegative counters
  (`src/components/match-game.tsx:75-125`).
- Test now requires nonempty question IDs outside setup and constrains all answer,
  written, manual-rating, flag, and reveal keys to that test
  (`src/components/practice-test.tsx:110-205`).
- Flashcards now validates index, course, topic, verdict, evidence, and shuffle seed
  before hydration (`src/components/flashcard-deck.tsx:67-123`).
- `tests/e2e/study-app.spec.ts:514-586` exercises the prior false-completion,
  `NaN%`, and invalid-filter structures.

Fresh focused Chromium run: **3/3 passed**, including same-hash malformed snapshot
recovery plus mobile navigation and Flashcard focus/shortcut isolation.

## Medium finding

### M1 — A storage write failure after hydration is silent and loses session work

`src/domain/storage/safe-storage.ts:9-15` returns `false` on write failure, but
Flashcards, Learn, Match, Test, and Library callers ignore the result. The global
warning in `src/components/app-shell.tsx:152-160` only reflects failures observed by
`StudyProvider`; Test response autosaves and other mode-only writes do not update that
provider.

Fresh reproduction:

- load Test while storage works and start a five-question test;
- make `Storage.setItem` throw `QuotaExceededError`;
- select a response;
- no `Saving is unavailable` warning appears;
- restore storage and reload; the selected response is gone.

The blocked-from-start regression passes because `StudyProvider` also encounters the
blocked read. It does not cover quota/security failures that begin during an active
mode.

Impact: the UI claims autosave/resume behavior while silently discarding answers or
session position after a mid-session quota/privacy change.

Required fix: propagate failed mode writes into one shared actionable persistence
status and retry path. Add a browser test that enables write failure only after
hydration, asserts the warning, restores storage, retries, and proves reload recovery.

## Reviewed risk areas that pass

### Deterministic static export — PASS

- `next.config.ts:5-18` derives `generateBuildId` from the generated service-worker
  cache identity and fails closed if it cannot parse it.
- Current observed values matched exactly:
  `rel301m-study-d881c163-40a6cc7a` in both `.next/BUILD_ID` and `public/sw.js`.
- `output: "export"` and `trailingSlash: true` match the Python static servers used
  by the E2E, production-offline, and zoom configurations.
- `playwright.config.ts:20-25` serves `out/`, blocks service workers for functional
  E2E isolation, and covers Chromium, Pixel 7, and Firefox.
- Production offline tests separately allow service workers; zoom uses an actual
  CDP page scale of 2.

### Q004, Q188, and manual grading — PASS

- `src/domain/study/session.ts:60-110` returns manual grading for `freeform` and
  `manual-review`, exact-set grading for multiple answers, and `null` when a
  single-choice Test cannot represent a multi-answer concept.
- Q004 remains exam C, bank-key-only, and concept-manual. The direct Library
  regression showed the bank association and explicit non-theory caveat.
- Q188 remains exam A and conceptual A+B. A fresh browser flow produced bank `1/1`,
  concept `0/0`, and `Correct with nuance · 1`; Test did not falsely autograde the
  single choice as full conceptual correctness.
- Written free-form/manual records remain outside automatic conceptual grading;
  result self-rating is one-shot and does not alter the bank score.
- Unanswered Test records are skipped by `submit()` and therefore do not create
  failure attempts.

### Accessibility and keyboard behavior — PASS for reviewed paths

- AppShell's closed mobile navigation is inert/hidden, open navigation receives
  focus, Escape closes it, and focus returns to the menu trigger.
- Flashcard rich content is outside the overlay flip button; the flip control has
  an accessible name and `aria-expanded`. Global shortcuts exclude focused
  controls and editable content.
- Learn/Test move focus to replacement feedback/prompts; Match exposes live
  selection and progressbar state.
- Fresh raw-browser checks confirmed mobile Escape focus restoration and zero
  serious/critical axe findings after selecting a Match tile.

## Fresh verification

| Check | Result |
|---|---|
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0 |
| `npm run test` | PASS, 3 files / 11 tests |
| `npm run data:check` | PASS, 317 canonical questions |
| Raw Chromium Q004/Q188/mobile-nav/Match axe checks against `out/` | PASS |
| Focused Chromium E2E: navigation, Flashcard shortcut, malformed snapshots | PASS, 3/3 |
| Production offline: Q004 deep link and cache update | PASS, 2/2 |
| Mid-session Test storage-write failure probe | FAIL as M1 |

The full release suite remains the controller's final execution gate. This independent
review ran the narrow source, unit, focused browser, and production-offline checks
needed to verify the reviewed changes and remaining defect.

## Unresolved questions

None.

Status: DONE_WITH_CONCERNS
Summary: FAIL; no high findings, one reproducible medium release defect.
Concerns/Blockers: Silent mid-session persistence loss must be fixed and reverified before deployment.
