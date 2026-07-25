# Final independent test report

**Date:** 2026-07-25  
**Result:** FAIL — release blockers remain  
**Scope:** read-only verification of `study-app/`; tester changed no app or test
file.

## Tested artifact

- Question bank SHA-256:
  `5de774bbaf9b6812342b0a807a65ffc261d7530f699a4eea7f080bd79e448084`
- Validator SHA-256:
  `73ebc09d8af7781022f9af8f3633a935c7bb525afc6df4d6a4ccba94f80abbbc`
- Service worker SHA-256:
  `4433de583076cdc4c928befe781bf1ea8b3ee1b54bcf54ac32f6794c1e7bbd4f`

Content files changed during verification. Green results obtained before the
validator rewrite are pre-final and must not be used as evidence for a later
dataset hash.

## Automated gates

| Gate | Result | Evidence |
|---|---|---|
| `npm run lint` | PASS | exit 0, no findings |
| `npm run typecheck` | PASS | exit 0 |
| `npm run test` | PASS | 3 files, 10 tests |
| initial `npm run build` | PASS, stale | 10 static pages generated; included the earlier validator |
| `npm run test:e2e` | PASS, pre-final | 16/16 tests: desktop Chromium + Pixel 7 Chromium |
| `npm run verify:boundary` | PASS | 88 baseline paths preserved |
| final `npm run data:check` | **FAIL** | 261 generic-template violations and 9 question-specific teaching misses |
| final production build | **NOT PASSABLE** | `build` invokes the failing `data:check` |

The final validator specifically rejects generic teaching for 261 records.
Question-specific checks fail for Q220, Q239, Q242, Q249, Q258, Q259, Q262,
Q269, and Q286. This directly blocks the “317 verified, deep and easy”
requirement.

## Browser and production-export checks

- All seven main routes render from `out/`: Dashboard, Library, Flashcards,
  Match, Learn, Test, Progress.
- No horizontal overflow at 320 px on any route.
- No horizontal overflow at 640 px, the responsive equivalent of 200% browser
  zoom from a 1280 px viewport.
- Flashcard keyboard controls passed: Space flips; ArrowRight advances.
- Daily-goal `localStorage` persistence passed after reload.
- Production service worker became ready. After online warm-up, every main
  route reloaded successfully while the browser context was offline.
- Axe test passed with no serious/critical findings on Dashboard, Library,
  Flashcards, Learn, and Test on both configured browser profiles. The suite
  explicitly disables color-contrast and does not axe-scan Match or Progress,
  so it is not full WCAG-AA proof.

## Canonical anomaly checks

The generated artifact preserves:

- Q002: bank C; conceptual free-form answer, no accepted letter.
- Q004: bank C; bank-key-only/manual-review explanation.
- Q188: bank A; conceptual accepted letters A+B with the visit-count
  distinction explained.
- Q224: bank C; conceptual accepted letters B+C.
- Q229: bank C; visibly non-unique/manual-review caveat.

The question bank showed exactly 317 records in the UI before the content
rewrite. Final content integrity is unproven until the current validator passes
and the bank is rebuilt.

## Release blockers

### 1. Current content gate fails

`npm run data:check` exits nonzero with 270 findings: 261 banned generic
editorial templates plus 9 semantic misses. This invalidates the earlier build,
unit, and E2E evidence for final release.

### 2. Active sessions do not resume after reload

Direct production-browser reproduction:

```text
Learn: selected choices before reload = 1; after reload = 0
Test: 5 questions and 1 response before reload; after reload = setup screen,
      0 test questions
```

`LearnSession`, `PracticeTest`, `MatchGame`, and `FlashcardDeck` keep active
session state only in component memory. The plan explicitly requires sessions
to resume after reload.

### 3. Separate reset-session action is absent

Progress provides a confirmed “Reset progress” action, but no separate,
confirmed “Reset session” action exists. This misses the explicit acceptance
criterion that reset-progress and reset-session are separate actions.

## Required retest after fixes

1. Rebuild content, then run `data:check`, lint, typecheck, unit, and build.
2. Run all 16 Playwright tests against that exact bank hash.
3. Add and run reload/resume coverage for Flashcards, Match, Learn, and Test,
   including a separate confirmed session reset.
4. Axe-scan Match and Progress and run a color-contrast audit.
5. Repeat production-export offline tests and production deployment smoke tests
   against the exact saved/deployed source.

## Unresolved questions

- None requiring user input. Current blockers are implementation/content gaps.

Status: DONE_WITH_CONCERNS  
Summary: Core UI, responsive export, persistence basics, offline routes, and
pre-final E2E pass; current release fails content QA and session-resume
acceptance.  
Concerns/Blockers: 270 content findings; active Learn/Test sessions reset on
reload; no separate reset-session action.
