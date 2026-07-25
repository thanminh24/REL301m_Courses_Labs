# Final release test/coverage audit v3

**Date:** 2026-07-25  
**Scope:** independent read-only re-audit of current `study-app/`, its accepted
plan, tests, generated artifacts, and release evidence  
**Verdict:** **PASS — every v2 blocker is closed and the artifact passes the
release test gate**

## Audit method

This audit started from the six exact failures in
`final-release-test-audit-v2.md`, then re-read the current implementation and
tests and ran fresh release checks. No application or test source was edited.

Fresh commands:

```text
npm run verify
npm run test:e2e -- --reporter=line
npm run test:production -- --reporter=line
npm run test:zoom -- --reporter=line
npm run verify:boundary
git diff --check -- study-app plans/260725-rel301m-quiz-study-app
diff -qr <clean-build-a>/out <clean-build-b>/out
```

All commands exited **0**. The combined `verify` pipeline regenerated and
validated the bank before its production build and browser suites.

## Final release results

| Gate | Result | Fresh evidence |
|---|---|---|
| Canonical data | PASS | exactly Q001–Q317; dataset hash `d881c16397145b98a1963e05da1a10e3db8dfd7000ee146e87d9493f58611efb` |
| Editorial approval | PASS | approval hash equals QA hash; 317 approved IDs; 317 reviewed QA rows |
| Lint | PASS | exit 0 |
| TypeScript | PASS | exit 0 |
| Unit/domain/data | PASS | 3 files, 11 tests |
| Production build | PASS | data rebuild/check plus 10 statically generated pages |
| Cross-browser E2E | PASS | 84 executions: 28 scenarios × Chromium, Pixel 7 mobile Chromium, Firefox |
| Production PWA | PASS | 2/2: cold offline routes and cache-hash update isolation |
| Actual 200% scale | PASS | 1/1 across all seven main routes |
| Accessibility | PASS | all route axe serious/critical checks plus active Match state |
| Worktree boundary | PASS | all 88 pre-existing baseline paths preserved |
| Whitespace/diff integrity | PASS | `git diff --check` exit 0 |
| Clean reproducibility | PASS | two clean `npm ci` builds; byte-identical `out/` trees |
| Compiler mutation defense | PASS | altered immutable source rejected before generation |

The local Playwright configuration uses zero retries. The 84 passing executions
are therefore not retry-masked.

## V2 closure matrix

| Former blocker / missing gate | Current evidence | Result |
|---|---|---|
| Storage-unavailable mode crash | `safeStorageGet/Set/Remove` guard Flashcards, Learn, Match, and Test. E2E makes all three Storage methods throw `SecurityError`, then flips a card, checks a Learn answer, selects Match, and starts Test. The global warning remains actionable and no route error appears. | **PASS** |
| Cold offline deep link | Production test visits only Dashboard, waits for SW readiness, goes offline, opens a new page directly at previously unvisited `/library/`, then verifies every main route offline. | **PASS** |
| A→B cache/data-hash isolation | Production test seeds an obsolete `rel301m-study-old-data-old-app` cache, installs the current hash-keyed worker, and proves exactly one current study cache remains, unrelated-origin cache survives, and local progress survives. Cache name contains dataset and app hashes. | **PASS** |
| Dedicated Q004 regression | Data unit asserts bank C, `manual-review`, exam-association disclosure, and TD bootstrapping. E2E opens Q004 directly and verifies bank C plus the correction language. | **PASS** |
| Corrupt mode snapshots | E2E injects stale/invalid Flashcards, Learn, and Match snapshots and proves safe new usable sessions; invalid Test snapshot returns to setup. | **PASS** |
| Match reset | E2E resumes a selected tile, accepts confirmed Reset session, then proves selection clears and round identity advances. | **PASS** |
| Timed Test reload/expiry | E2E starts timed Test, persists an expired deadline, reloads, and proves automatic results submission. | **PASS** |
| Unanswered Test semantics | E2E confirms submission of five unanswered questions yields `Unanswered · 5`, zero attempts, and zero difficult IDs. | **PASS** |
| Actual 200% browser scaling | CDP `Emulation.setPageScaleFactor` sets visual scale to exactly 2.0 for Dashboard, Library, Flashcards, Match, Learn, Test, Progress; each remains visible, focusable, and has zero horizontal overflow. | **PASS** |
| Two clean deterministic builds | Two isolated source copies omitted dependencies/build artifacts, independently ran `npm ci` and `npm run build`, and produced byte-identical `out/` trees. Independent `diff -qr` is empty. | **PASS** |
| Stable export manifest | Both relative-path manifests equal `db281fd5859bbbd638e6a6f88351e0d3d5e993f2861320b261bb446e37248734`. Independent aggregate hashes of both current temp export trees also match. | **PASS** |
| Authority corruption defense | Isolated mutation of `question-records.json` exits 1 with `question-records.json differs from its immutable source hash.` | **PASS** |

## Canonical content and grading

### Exact hash-bound artifact

- Generated bank SHA-256:
  `d881c16397145b98a1963e05da1a10e3db8dfd7000ee146e87d9493f58611efb`.
- QA manifest references the same dataset hash.
- Editorial approval references the same hash and exact ordered Q001–Q317.
- All 317 QA rows have `independentlyReviewed: true`.
- Final content audit v7 grants approval only to this exact hash.
- Preserved totals: 149 correct, 98 acceptable-with-caveat, 32 incorrect,
  38 bank-key-only; 225 lecture, 54 book, 38 question-bank evidence records.
- The deterministic rebuild produced the same bank hash.

### High-risk answer separation

| Item | Exam-bank contract | Concept contract | Proof |
|---|---|---|---|
| Q002 | C | free-form/manual; no accepted supplied letter | unit null-grade assertions and E2E explicit written self-review |
| Q004 | C | manual review; scheduling is only a bank association, TD is bootstrapping | dedicated unit and E2E |
| Q188 | A | A+B for broad stem | unit dual-grade assertions and single-choice radio E2E |
| Q224 | C | B+C | data and grading regression |
| Q229 | C | manual review despite superficially gradeable alias | choice and written unit results are `null` |

The written grader no longer converts free-form/manual-review concepts into an
automatic correct result. Written Q002 requires explicit learner self-rating,
and the rating is persisted once rather than silently autograded.

## Study modes and persistence

| Requirement | Proof | Result |
|---|---|---|
| Flashcards resume | saved filter, order, index, session ID, flipped state | PASS |
| Flashcards scheduling | Again requeue, Hard/Good/Easy behavior, deterministic session reset | PASS |
| Flashcards mastery | only conceptual success in two distinct sessions | PASS |
| Flashcards accessibility | next-card focus/viewport restoration, shortcut isolation, ARIA flip state | PASS |
| Learn resume | queue, seed, checked response, feedback and reset persist | PASS |
| Adaptive typed Learn | prior-exposure unlock, exact normalized answer, retry, conceptual feedback | PASS |
| Match eligibility | only unambiguous supported exam/concept pairs | PASS |
| Match resume/reset | selected tile resumes; confirmed reset clears and advances round | PASS |
| Test configuration | filters, empty result, MCQ/written, timer, instant/end behavior | PASS |
| Test all 317 | 317 stored IDs; one mounted prompt; 22 bounded navigator controls | PASS |
| Test persistence | written answer, flag, navigator, timer, manual rating and reset | PASS |
| Test unanswered | confirmation path; no false difficult/attempt record | PASS |
| Corrupt snapshots | Flashcards/Learn/Match/Test recover to usable safe state | PASS |
| Storage denied | all four study modes remain functional in memory with warning | PASS |
| Progress import | invalid hash/checksum is atomic and preserves prior state | PASS |
| Progress reset | separate confirmed whole-progress action | PASS |

## Responsive, focus, and accessibility

- Every main route has zero horizontal overflow at 320 px in all three E2E
  projects.
- Actual 200% page scale has zero overflow and a focusable main control on all
  seven routes.
- Mobile navigation is inert/hidden while closed, focuses its first link when
  opened, closes on Escape, and restores trigger focus.
- Test Start, sequential movement, and 20-question navigator movement restore
  prompt focus and keep it visible.
- Flashcards restores focus/viewport after moving from a long answer.
- All route entry states return zero serious/critical axe findings across
  Chromium, mobile Chromium, and Firefox; selected Match receives an additional
  stateful scan.
- Independent UI audit v3 also passed active Test, 404, reduced motion, and
  320/360/768/1440 rendering.

## Static export and PWA

- Next statically emits Dashboard, Library, Flashcards, Match, Learn, Test,
  Progress, manifest, and not-found pages.
- Service-worker identity includes both the full-bank-derived dataset prefix
  and application-source prefix.
- Next's deterministic build ID is derived from that cache identity.
- Install precaches all seven routes and their same-origin Next assets.
- A never-visited Library deep link works after only the Dashboard has been
  loaded online and the context goes offline.
- All seven main routes then load offline.
- Update cleanup removes only obsolete `rel301m-study-*` caches, preserves an
  unrelated cache, and preserves local progress.
- The registration UI retains controlled activation through
  `SKIP_WAITING`/controller change rather than mixing an update silently.

## Reproducibility and boundary

- Clean build A and B each installed exact lockfile dependencies with `npm ci`.
- Both rebuilt/validated all 317 records and statically exported the app.
- Their `out/` trees have no byte difference.
- Both relative export manifests have hash
  `db281fd5859bbbd638e6a6f88351e0d3d5e993f2861320b261bb446e37248734`.
- Deliberately changed canonical authority is rejected by its immutable hash.
- Current boundary verification confirms every one of the 88 pre-existing
  dirty paths remains preserved outside the task scope, including after the
  in-scope consolidated learning guide was added.

## Completion decision

Every failure and missing gate named in v2 now has direct current evidence.
No release-test blocker remains. This report therefore approves the exact
current artifact for the subsequent saved-version deployment and production
smoke phase.

Deployment identity, terminal hosting status, and remote production smoke are
phase-08 evidence and are intentionally not invented here; this PASS means the
artifact is eligible to proceed to that external deployment gate.

## Unresolved questions

- None.

Status: DONE  
Docs impact: none — report only  
Summary: **PASS.** Exact approved 317/hash, grading, all study modes,
persistence/recovery, 84 cross-browser executions, accessibility, cold/update
offline behavior, actual 200% scale, deterministic clean builds, compiler
fail-closed behavior, static export, and worktree boundary all pass.  
Concerns/Blockers: None within the release test gate; production deployment and
remote smoke remain the separate phase-08 gate.
