# Phase 01 — Foundation and canonical data

## Goal

Create isolated `study-app/`, lock a Next.js + TypeScript toolchain compatible
with Sites/OpenNext, and compile one deterministic lossless runtime dataset.

## Inputs

- `README.md`
- `plans/quiz-app-ux-concept.md`
- `plans/260724-0949-rel301m-learning-materials/research/question-records.json`
- `.../question-adjudications.json`
- `.../primary-evidence-map.json`
- `scripts/validate-rel301m-learning-guide.py`
- `scripts/rel301m_guide_questions.py`

## Files

- `study-app/package.json`, lockfile, `next.config.ts`, `tsconfig.json`
- `study-app/eslint.config.mjs`, `study-app/playwright.config.ts`
- `study-app/vitest.config.ts`, `study-app/next-env.d.ts`
- `study-app/src/data/source/*.json` — copied immutable authority snapshots
- `study-app/scripts/build-question-bank.mjs`
- `study-app/scripts/validate-question-bank.mjs`
- `study-app/src/data/generated/question-bank.json`
- `study-app/src/data/generated/content-qa-manifest.json`
- `study-app/content/question-explanations.json`
- `study-app/content/conceptual-answer-overrides.json`
- `study-app/src/data/question-schema.ts`
- `study-app/src/domain/questions/{types,repository,search}.ts`
- `study-app/tests/data/question-bank.test.ts`
- `study-app/scripts/verify-worktree-boundary.mjs`
- `plans/260725-rel301m-quiz-study-app/reports/worktree-baseline-2026-07-25.json`

## Implementation

1. Scaffold app without touching notebook/course paths. Use App Router, strict
   TypeScript, React, CSS modules/global tokens, Vitest + Testing Library,
   Playwright, `axe-core` integration, and `zod` for runtime boundaries.
   Before scaffold, record `git status --porcelain` and content hashes for every
   pre-existing dirty file. Treat missing/deleted/untracked entries explicitly.
2. Copy authority JSON snapshots so the deployed app is self-contained.
3. Compiler joins source records, adjudications and final evidence by QID.
   Normalize only runtime metadata; preserve source strings byte-for-byte.
4. Emit schema version, source hashes, generated timestamp policy (fixed or
   omitted for deterministic output), counts and question array.
5. Model:
   `id, module, course, topic, stem, options[4], examAnswer, verdict,
   conceptualAnswer, explanation, keyTakeaway, optionRationales[A-D],
   evidence, confidence, duplicateCluster`.
6. Represent book pages, slide deck/range and bank-only cautions as typed
   evidence variants. Never ship local absolute filesystem paths.
7. Derive safe answer semantics:
   `examGradeable=true` for all; `conceptGrade` is `single|multiple|freeform|
   manual-review|unsupported`. Never guess a conceptual option letter from prose.
8. Add `npm run data:build` and `data:check`; generated output must be stable on
   two runs.
9. Author and review one explanation record for every QID. Each record requires
   a two-or-more-sentence plain-language explanation, one concise takeaway, and
   a rationale for each A–D option. Incorrect/ambiguous items must explain the
   defect; bank-only items must explain the supplied exam key without claiming
   reference verification.
10. Emit a 317-row QA manifest with source/evidence alignment,
    answer-separation, completeness/readability checks and independent review.
11. Boundary verifier compares final status/hashes with the baseline and fails
    if app work changed any pre-existing dirty path outside the designated
    README integration. Never run clean/reset/checkout.

## Validation

- IDs equal Q001…Q317 in order, unique, no gaps.
- Four A–D choices and supplied key text match source for every item.
- Verdict totals: 149 correct, 98 caveat, 32 incorrect, 38 bank-key-only.
- Evidence totals: 225 lecture, 54 book, 38 question-bank.
- Every non-bank item has usable locator; every bank-only item says unverified.
- Q002 conceptual answer is none of options; Q004 is bank-only; Q188 exam A and
  conceptual A+B/manual nuance.
- Every QID has a non-placeholder explanation, takeaway and four distinct
  option rationales; 317/317 QA rows are independently signed off.
- Tests deliberately corrupt each input and prove compiler exits nonzero.

## Risk / rollback

Risk: provisional mappings overwrite final evidence. Prevent with strict file
authority and count assertions. Roll back by deleting `study-app/`; source
learning artifacts remain untouched.

## Exit

Fresh install can build and validate the exact same 317-record artifact and
317-row content-QA manifest.

## Unresolved questions

None.
