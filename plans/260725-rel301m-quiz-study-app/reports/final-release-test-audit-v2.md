# Final release test/coverage audit v2

**Date:** 2026-07-25  
**Scope:** independent, read-only audit of the current `study-app/` artifact,
tests, plan, and release reports  
**Verdict:** **FAIL — one reproduced product blocker and required proof gaps
remain**

## Executive finding

The current artifact is substantially stronger than the stale earlier FAIL
reports. The approved 317-question hash, content validator, unit suite,
production static export, 69 cross-browser E2E executions, seven-route offline
test, axe checks, responsive checks, and worktree boundary all pass.

Release is still not proven against the accepted plan. Browser storage being
unavailable makes every interactive study mode fall into the route error
boundary instead of continuing in memory. In addition, the offline test warms
all seven routes before going offline and therefore does not prove cold
precache/deep-link behavior, and several mandatory recovery/update/zoom and
clean-build gates are absent.

## Exact artifact and approval proof

| Invariant | Result |
|---|---|
| Generated question-bank SHA-256 | PASS — `d881c16397145b98a1963e05da1a10e3db8dfd7000ee146e87d9493f58611efb` |
| QA manifest `datasetHash` | PASS — exact same hash |
| Editorial approval `datasetHash` | PASS — exact same hash |
| Approval IDs | PASS — exact ordered Q001–Q317 |
| Approval audit | PASS — `final-content-quality-audit-v7.md` |
| Questions / QA rows | PASS — 317 / 317 |
| Passing QA rows | PASS — 317 |
| Verdict totals | PASS — 149 correct, 98 caveat, 32 incorrect, 38 bank-only |
| Evidence totals | PASS — 225 lecture, 54 book, 38 question-bank |
| Rebuild identity | PASS — build regenerated the same `d881c1639714…` dataset |

`npm run data:check` independently exited 0. The build compiler also checks
immutable source hashes and exact QID sets before emitting the bank.

## Fresh automated results

The consolidated `npm run verify` command was run after inspecting the current
sources and exited **0**:

| Gate | Result |
|---|---:|
| ESLint | PASS |
| TypeScript | PASS |
| Vitest | PASS — 3 files, 11 tests |
| Data rebuild + approval-bound validation | PASS — 317 |
| Next production build/static export | PASS — 10 static pages |
| Playwright | PASS — 69 executions (23 scenarios × Chromium, Pixel 7 mobile Chromium, Firefox) |
| Production service-worker test | PASS — 1 |
| Worktree boundary | PASS — all 88 baseline paths preserved |
| `git diff --check` | PASS |

The suite has no retries locally, so these results are not retry-masked.

## High-risk grading assessment

### PASS — corrected manual/free-form grader

- Q188 has independent exam and concept grading: exam A; conceptual A+B.
- Q002 `freeform` returns `null` from both choice-concept and written-concept
  grading.
- Q229 `manual-review` returns `null` from both grading functions even though
  its bank/alias data could otherwise look automatically gradeable.
- Unit assertions cover Q002 and Q229.
- E2E selects Q002 alone, submits a written Test, and requires explicit
  **Understood / Not yet** self-review.
- Q188 has an E2E assertion for four radios, zero checkboxes, and single-bank
  selection behavior.

### Missing dedicated anomaly proof

The plan explicitly requires dedicated content **and UI** regression coverage
for Q002, Q004, and Q188. Q002 and Q188 have current UI paths; Q004 has neither
a dedicated unit assertion nor a UI regression. The generic 317 validator
protects its row structurally, but that is weaker than the named acceptance
gate.

## Mode and persistence assessment

### Covered and passing

- Flashcards: filter/order/index/session resume, miss requeue, explicit reset,
  focus restoration, shortcut isolation, and two-distinct-session mastery.
- Learn: checked-response resume, explicit new round, typed exact recall,
  retry, and feedback focus.
- Test: instant feedback gate, Q188 single choice, all 317 IDs with one mounted
  prompt and bounded navigator, mobile focus, filters/empty result, written
  response/flag/reload/reset, Q002 self-review, and corrupt Test snapshot.
- Match: canonical eligibility filtering, selected-tile resume, and axe after
  selection.
- Progress: persistence, confirmed reset, and atomic rejection of a
  checksum/hash-invalid import.

### BLOCKER — storage-unavailable fallback is not usable

The plan requires storage failure to retain an in-memory usable app with an
actionable warning. A fresh production-browser reproduction replaced
`Storage.prototype.getItem`, `setItem`, and `removeItem` with `SecurityError`
throws before loading each mode.

Observed result for **Flashcards, Learn, Match, and Test**:

```text
This study view needs another try
Your canonical questions and locally saved progress were not deleted.
Retry this view
```

None of the four modes remained usable in memory.

The source explains the result:

- Learn performs an unguarded `localStorage.getItem` during hydration.
- Flashcards, Match, and Test catch a failed read/parse but then call
  unguarded `localStorage.removeItem` inside that catch.
- Some reset paths also call `removeItem` without a storage guard.

This is a real behavioral failure, not only missing test coverage.

### Required persistence/recovery cases still absent

- corrupt/hash-stale Flashcards, Learn, and Match snapshots;
- full-storage-unavailable flow for all four modes and retry/banner behavior;
- Match confirmed reset;
- timed Test reload/expiry;
- unanswered confirmation and proof that unanswered is not recorded as an
  incorrect/difficult attempt;
- import size/shape/date/QID corruption beyond the single bad-hash/checksum
  fixture;
- migration/update behavior when the dataset hash changes.

## Responsive, focus, browser, and accessibility assessment

### PASS

- All seven routes have automated 320 px overflow assertions.
- Test and Flashcards mobile prompt/card focus restoration have dedicated
  regressions.
- Mobile navigation is inert when closed, traps initial focus, closes on
  Escape, and restores trigger focus.
- All-317 Test retains 317 stored IDs while mounting one fieldset and a bounded
  navigator.
- All seven route entry states have axe serious/critical assertions in all
  three configured projects.
- Match selected state has an additional axe scan.
- Independent UI audit v3 passed active Test, 404, reduced-motion rendering,
  and widths 320/360/768/1440 with zero horizontal overflow.

### Missing plan gate

No current automated or final independent artifact proves actual browser
**200% zoom** behavior. Testing a narrow CSS viewport is useful responsive
evidence but is not equivalent proof for browser zoom/text scaling and focus
visibility.

## PWA/static-export assessment

### PASS

- `next build` succeeds and generates static pages for Dashboard, Library,
  Flashcards, Match, Learn, Test, Progress, manifest, and not-found.
- The service-worker cache key includes both dataset and app hashes.
- Activation deletes only obsolete `rel301m-study-*` caches.
- The production Playwright test successfully loads all seven routes offline.

### Missing required offline/update proof

The production test visits **every route online before** switching offline.
Consequently, it cannot prove that one initial successful load precaches a
previously unvisited deep link. It also does not test:

- an offline direct deep link that was never navigated online;
- service-worker update from hash A to hash B;
- waiting-worker activation/refresh UX;
- old/new cache isolation with no mixed app/data generation;
- progress/session preservation through that update.

These are explicit phase-07 and PWA acceptance conditions.

## Build and release-process gaps

- The final `verify` command is green and contains all current scripted gates.
- The plan additionally requires two clean `npm ci` + build runs and
  byte/manifest comparison. No report proves that gate.
- No deliberate missing/extra/duplicate/corrupt authority-input test exercises
  compiler fail-closed behavior, even though current compiler inspection shows
  those guards.
- Deployment/production-URL smoke is not part of this report and remains a
  separate phase-08 gate.

## Exact release blockers / missing gates

1. **Fix and test storage-unavailable hydration/reset for Flashcards, Learn,
   Match, and Test so each remains usable in memory.**
2. **Change the production offline test to warm only the initial page, then
   prove previously unvisited offline deep links; add an A→B cache/data-hash
   update test.**
3. **Add Q004 dedicated content and UI regression coverage.**
4. **Add the named mode recovery cases:** corrupt snapshots for all modes,
   Match reset, timed Test reload/expiry, and unanswered semantics.
5. **Prove actual 200% zoom/text scaling.**
6. **Run and record two clean-install deterministic builds with artifact
   comparison.**

Until item 1 is fixed, the artifact has a reproduced runtime defect. Until all
items are evidenced, phase 07's “all required tests, no skipped gates” exit
condition is not met.

## Unresolved questions

- None. The missing gates follow directly from the accepted plan.

Status: DONE_WITH_CONCERNS  
Docs impact: none — report only  
Summary: **FAIL.** Approved 317/hash, grading fix, build, 69 cross-browser
executions, axe, offline-seven-route check, and boundary pass. Storage-blocked
browsers reproduce an unusable error view in all four study modes, and required
cold-offline/update/recovery/zoom/clean-build proof is missing.  
Concerns/Blockers: storage-unavailable runtime failure plus six exact release
gates listed above.
