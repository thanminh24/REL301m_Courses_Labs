# Phase 04 — Flashcards and Match

## Goal

Deliver deterministic, accessible card study with rating-based requeue and a
timed/untimed matching game.

## Files

- `study-app/src/features/flashcards/{flashcards-page,flashcard-card}.tsx`
- `study-app/src/features/flashcards/{flashcard-controls,confidence-controls}.tsx`
- `study-app/src/domain/flashcards/{types,flashcard-reducer,queue}.ts`
- `study-app/tests/unit/flashcard-reducer.test.ts`
- `study-app/tests/components/flashcards.test.tsx`
- `study-app/e2e/flashcards.spec.ts`
- `study-app/src/features/match/{match-page,match-board,match-summary}.tsx`
- `study-app/src/domain/match/{types,match-generator,match-reducer}.ts`
- `study-app/tests/unit/match-reducer.test.ts`
- `study-app/tests/components/match.test.tsx`
- `study-app/e2e/match.spec.ts`

## Implementation

1. Setup supports course/topic/verdict/evidence/mastery/favorite/missed filters,
   stable seeded shuffle and exact session resume.
2. Front shows stem/options and non-answer-leaking classification. Back uses
   shared answer comparison, explanation and evidence.
3. State machine: setup → front → back → rated → next/complete.
4. `Again/Hard` requeue; `Good/Easy` update scheduling. Do not mark mastery on
   flip. Freeze question order at session start.
5. Keyboard: Space, arrows, 1–4, S, E, ?. Disable shortcuts while typing or
   dialogs open. Touch supports tap and thresholded swipe plus visible buttons.
6. Deep-link question view preserves active session when returning.
7. Match creates six prompt/answer pairs from concept-gradeable questions,
   shuffles each side independently, supports pointer and keyboard pairing, and
   reports time/mistakes. Ambiguous, bank-only and no-option items are excluded
   with a visible eligibility count rather than forced into false pairs.

## Validation

- Reducer rejects rating before flip and cannot skip state transitions.
- Stable shuffle produces same order for saved seed/filter.
- Back navigation, reload resume, favorites and retry-missed work.
- Pointer and keyboard E2E complete a session.
- Card exposes `aria-expanded`; reduced motion uses crossfade/no spatial flip.
- Match never duplicates a prompt/answer, reconciles six pairs, resumes safely,
  and supports untimed/reduced-motion modes.

## Risk / rollback

Risk: gestures cause accidental navigation. Keep conservative threshold and
visible controls; gesture code can be disabled independently.

## Exit

All 317 cards are reachable, a rated session completes/resumes correctly, and
eligible verified questions can be practiced in Match.

## Unresolved questions

None.
