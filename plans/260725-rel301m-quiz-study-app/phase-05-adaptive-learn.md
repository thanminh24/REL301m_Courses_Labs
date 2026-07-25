# Phase 05 — Adaptive Learn

## Goal

Implement short adaptive retrieval rounds that teach concepts without turning
defective bank answers into conceptual truth.

## Files

- `study-app/src/domain/learn/{types,selection,grading,learn-reducer}.ts`
- `study-app/src/features/learn/{learn-page,learn-prompt,learn-feedback}.tsx`
- `study-app/src/features/learn/{round-summary,typed-answer}.tsx`
- `study-app/tests/unit/{learn-selection,learn-grading,learn-reducer}.test.ts`
- `study-app/tests/components/learn.test.tsx`
- `study-app/e2e/learn.spec.ts`

## Implementation

1. Rounds contain 7–12 items. Priority is due/recent misses, unseen, hard, then
   spaced review, with deterministic tie-breaking.
2. Begin with MCQ; unlock typed recall for seen, concept-gradeable material.
   Bank-only, ambiguous, multi-answer-with-single-options and unsupported items
   must use MCQ/compare-and-acknowledge, never misleading typed grading.
3. Grade exam recall and concept understanding separately. Wrong feedback names
   the distinction; ambiguous feedback compares bank and conceptual answers.
4. Typed grader normalizes Unicode/case/whitespace/punctuation and uses only
   curated aliases compiled in data. No substring guessing. If no safe aliases,
   send to manual self-review.
5. Two failed typed attempts reveal answer and requeue. “I don’t know” requeues
   without fake streak penalty.
6. Persist exact round/position/answers; completion links to mistakes, test and
   dashboard.

## Validation

- Selection priority, no duplicate within round, deterministic replay tests.
- Typed exact/alias/near-miss tests; unsafe freeform becomes manual review.
- Q188 accepts A for bank recall, surfaces A+B concept nuance, never silently
  scores the nuance as a standard single-answer concept item.
- Q004 never receives a verified treatment or conceptual typed prompt.
- Reload mid-feedback and mid-round resumes without double-counting attempts.
- Screen-reader feedback focus/live region and mobile keyboard clearance E2E.

## Risk / rollback

Risk: approximate grading teaches wrong concepts. Default to explicit manual
review when deterministic rules cannot prove correctness.

## Exit

Adaptive rounds complete, resume, requeue errors and report dual learning status.

## Unresolved questions

None.
