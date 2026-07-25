# Final test expansion

Status: DONE_WITH_CONCERNS

## Scope added

- Flashcards: persisted filters and position, miss requeue, confirmed reset, new
  session identity, mastery only after two successful distinct sessions.
- Learn: response/feedback resume and confirmed fresh-round reset.
- Test: full 317-question run, filtered and empty sets, written responses,
  navigator answered/flag state, reload resume, confirmed reset, malformed
  snapshot recovery.
- Match: eligibility computed from canonical data and selected-tile resume.
- Progress: tampered import rejection with exact pre-import state preserved.
- Library: option and explanation search in browser plus
  option/explanation/takeaway/rationale unit coverage.
- Accessibility: all seven routes on desktop Chrome and Pixel 7 viewport.
- Production PWA: static-export server, service-worker readiness, then offline
  navigation reload of all seven routes.
- Verification script: lint, typecheck, unit, one build, dev E2E, production
  offline E2E, and worktree boundary.

## Evidence

- `npm run test:e2e`: **26 passed** across desktop and mobile.
- `npm run test:production`: **1 passed**, all seven routes offline.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run verify:boundary`: passed; 88 baseline paths preserved.
- Focused domain suite excluding content approval: **6 passed**.

The expanded suite found one genuine critical accessibility defect: the hidden
progress-import file input had no accessible label. Controller fixed it with
`aria-label="Import progress backup"`; the subsequent full axe run passed.

## Remaining external content gate

`npm run test` currently fails only the deliberate full-content QA assertion:

- `independentlyReviewed=false`: Q001–Q317, pending final independent audit.
- `optionRationalesComplete=false`: Q254, Q267, Q276, Q282, Q296.

These are content/editorial ownership, not test defects. Tests intentionally do
not weaken or bypass this gate.

## Unresolved questions

- None for the automated test implementation.
