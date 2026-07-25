# Final release code review v4

Date: 2026-07-25  
Scope: final `study-app/` source and static export after v3 remediation  
Review mode: independent, read-only; no application or test source changed

## Verdict

**PASS — no unresolved high- or medium-severity release finding remains in the
reviewed source.**

The v3 persistence blocker is fixed and independently reverified. Offline query
deep links, malformed snapshot recovery, deterministic export identity, dual
grading, blocked-storage operation, and reviewed accessibility paths remain green.
Deployment still requires the controller's exact-commit release gate; that is an
execution condition, not a source finding.

## V3 persistence finding — FIXED/PASS

### Failure notification and pending writes

- `src/domain/storage/safe-storage.ts:1-7` defines one application-wide storage
  failure event.
- Failed sets/removals retain the latest operation by key in a module-level pending
  map and immediately broadcast failure (`safe-storage.ts:18-39`).
- A successful later write removes its stale pending entry.
- `retryPendingStorageWrites()` replays every pending set/removal and clears the map
  only after the entire loop succeeds (`safe-storage.ts:42-53`). A partial replay
  failure leaves all entries available for another retry.

### Global warning and recovery

- `StudyProvider` subscribes to the failure event and exposes an immediate,
  actionable global warning (`study-provider.tsx:129-138`).
- `retrySave()` writes current global progress, replays pending mode operations, and
  clears the warning only when both stages succeed
  (`study-provider.tsx:254-267`).
- AppShell keeps the visible **Retry saving** control connected to that recovery
  path (`app-shell.tsx:152-160`).

### Regression proof

`tests/e2e/study-app.spec.ts:659-701` reproduces the exact prior failure:

1. start Test with working storage;
2. block only `setItem` after hydration;
3. select a response;
4. assert the global saving warning;
5. restore storage and activate Retry;
6. assert the pending Test response is written;
7. reload and assert the response remains selected.

Fresh result on the final static export: **3/3 passed** — Chromium, Pixel 7 mobile,
and Firefox.

## Other high-risk areas reverified

### Offline and deterministic export — PASS

- `public/sw.js:65-87` resolves same-origin navigation cache misses by pathname,
  allowing `/library/?q=Q004&id=Q004` to use the cached Library shell while
  retaining query state.
- Production offline tests cold-open that exact Q004 link, reload all seven main
  routes offline, isolate the current study cache, preserve unrelated caches, and
  preserve local progress.
- Fresh production result: **2/2 passed**.
- Current service-worker cache name and `.next/BUILD_ID` match exactly:
  `rel301m-study-d881c163-75c91903`.
- `next.config.ts` remains a fail-closed deterministic static-export configuration;
  Playwright functional, production-offline, and zoom configs all serve `out/`.

### Persisted-state validation — PASS

- Match requires unique matched IDs belonging to the generated round, a valid
  unmatched selected tile, and nonnegative counters.
- Test requires a nonempty reconciled question set outside setup and confines
  answers, written responses, flags, revealed IDs, and manual ratings to that test.
- Flashcards validates position, filter domains, topic, verdict, evidence, and seed.
- Global progress import remains size-, version-, dataset-hash-, checksum-, QID-,
  enum-, range-, and date-validated before mutation.
- Fresh same-hash malformed snapshot regression: **PASS**; no false Match completion,
  `NaN%` Test result, or invalid Flashcard deck restoration.

### Q004, Q188, and manual grading — PASS

- Q004 remains exam C, bank-key-only, and concept-manual; no verified conceptual
  answer is invented.
- Q188 remains exam A and conceptual A+B. Single-choice Test grades the bank answer
  while returning `null` for its unrepresentable multi-answer concept.
- Free-form and manual-review records return manual conceptual grading in both
  choice and written paths.
- Test excludes those `null` concepts from the automated concept denominator and
  provides one-shot, persisted self-review without changing the bank score.
- Unanswered Test items remain unrecorded rather than becoming false failures.

### Accessibility and keyboard behavior — PASS

- Closed mobile navigation is inert/hidden; open navigation receives focus; Escape
  closes and restores trigger focus.
- Flashcard semantic content remains outside its overlay flip button. Focused
  controls/editable fields are not hijacked by global shortcuts.
- Delayed Flashcard move focus now yields when another meaningful control owns focus.
- Learn/Test replacement content receives managed focus; Match exposes pressed,
  live-status, and progressbar semantics.
- Fresh focused Chromium result for mobile navigation, Flashcard shortcuts, and
  malformed snapshot recovery: **3/3 passed**.

## Fresh verification

| Gate | Result |
|---|---:|
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0 |
| `npm run test` | PASS, 3 files / 11 tests |
| `npm run data:check` | PASS, 317 canonical questions |
| Mid-session persistence retry E2E | PASS, 3/3 browsers |
| Focus/navigation/snapshot focused E2E | PASS, 3/3 |
| Production offline suite | PASS, 2/2 |
| Build ID ↔ service-worker cache identity | PASS |

## High/medium findings

None.

## Unresolved questions

None.

Status: DONE
Summary: PASS; no unresolved high/medium source or release-readiness finding.
Concerns/Blockers: None in reviewed source; exact-commit deployment and production smoke remain controller execution gates.
