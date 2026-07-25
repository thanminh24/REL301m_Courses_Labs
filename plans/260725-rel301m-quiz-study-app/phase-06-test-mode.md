# Phase 06 — Configurable Test

## Goal

Provide exam simulation and practice testing with transparent dual grading.

## Files

- `study-app/src/domain/test/{types,configuration,generator,grading,test-reducer}.ts`
- `study-app/src/features/test/{test-page,test-setup,test-runner}.tsx`
- `study-app/src/features/test/{question-navigator,test-results,review-groups}.tsx`
- `study-app/tests/unit/{test-generator,test-grading,test-reducer}.test.ts`
- `study-app/tests/components/test-mode.test.tsx`
- `study-app/e2e/test-mode.spec.ts`

## Implementation

1. Setup: 10/20/40/all filtered; MCQ/true-false/written; course/topic/verdict/
   evidence/favorite/missed filters; stable question and independent option
   shuffle; instant practice or end feedback.
2. Default grading is exam-bank key with visible note. Always calculate a
   separate concept report. Never merge these into one misleading score.
3. True/false prompts may only be generated from a deterministic proposition
   with explicit truth metadata; otherwise exclude that type and report why.
4. Written uses curated aliases or manual self-review. Manual review records
   `understood/not-yet` and never changes the exam score retroactively.
5. Autosave each response. Navigator shows current/answered/unanswered/flagged.
   Submission confirms unanswered count; interrupted test offers Resume/Discard.
6. Results: exam score, concept check/manual-review count, Incorrect, Correct
   with nuance, Unanswered. Each row shows user response, bank key, conceptual
   answer, explanation and evidence.

## Validation

- Generator obeys filters/size, never duplicates, and option shuffle preserves
  answer identity.
- Q002/Q004/Q188 dual grading regressions.
- True/false only uses eligible items; written manual review path works.
- Instant/end feedback modes, flags, unanswered warning, reload and discard E2E.
- Test “all” can contain all 317 and produces reconciled result counts.

## Risk / rollback

Risk: generated true/false/written prompts introduce content claims. Generate
only from explicit typed metadata; degrade to MCQ/manual review, never infer.

## Exit

Configured tests run to completion and produce auditable exam and concept results.

## Unresolved questions

None.
