---
title: "REL301m Complete Learning Materials"
description: "Build one question-first, slide-grounded manual for the complete 317-question exam bank."
status: completed
priority: P1
effort: 22h
branch: main
tags: [reinforcement-learning, education, lectures, question-bank, markdown]
created: 2026-07-24
---

# REL301m Complete Learning Materials Plan

## Overview

Create `docs/rel301m-complete-learning-guide.md` for an exam based on Q001–Q317. The bank sets
topic demand and learning depth; 39 canonical lecture decks supply correct explanations and
evidence. Teach one level above the MCQs: define, explain, distinguish, and perform one small
reasoning step where demanded. No coding, multi-step traces, or external curriculum expansion.

## Research

- [Source inventory](research/source-inventory.md)
- [Learning-manual architecture](research/learning-manual-architecture.md)
- [Question-first execution decision](research/question-first-execution-decision.md)
- [Depth opinion](research/question-first-depth-opinion.md)
- [Mapping opinion](research/question-to-slide-mapping-opinion.md)
- [Adversarial plan critique](research/question-first-plan-critique.md)

## Phases

| Phase | Status | Effort | Deliverable |
|---|---|---:|---|
| [01 — Bank contract and extraction preflight](phase-01-source-contract-and-extraction-preflight.md) | completed | 3h | 317 normalized records + pilot/tooling gate |
| [02 — Exam-demand mapping and targeted slide audit](phase-02-extract-and-audit-lecture-decks.md) | completed | 5h | question→slide matrix + D0–D3 depths |
| [03 — Author demand-weighted Course 1](phase-03-author-course-1-chapters.md) | completed | 2.5h | tiered Course 1 lessons |
| [04 — Author demand-weighted Course 2](phase-04-author-course-2-chapters.md) | completed | 3h | tiered Course 2 lessons |
| [05 — Author demand-weighted Course 3/framing](phase-05-author-course-3-and-framing-chapters.md) | completed | 2.5h | tiered Course 3 + intro/review |
| [06 — Insert and adjudicate Q001–Q317](phase-06-integrate-and-correct-question-bank.md) | completed | 3h | complete linked question appendix |
| [07 — Learning loop, cross-check, and release](phase-07-learning-system-cross-check-and-release.md) | completed | 3h | validated canonical manual |
| [08 — Promote the complete tested bank to canon](phase-08-promote-complete-tested-bank-to-canon.md) | completed | 2h | 317/317 canonical exam-learning route |

## Dependencies

- Phase 01 normalizes/clusters all questions and proves a 20-question pilot.
- Phase 02 maps 274 directly lecture-supported C1–C3 items to slides and assigns depth before authoring.
- Phases 03–05 start only after their course mappings/evidence stabilize.
- Phase 06 reuses confirmed mappings; it does not remap late.
- Phase 07 depends on every content phase.

## Acceptance criteria

- All 317 originals reconcile and remain canonical because every item appeared in tests;
  duplicates cluster without deletion.
- Evidence follows local slides → local Sutton–Barto book → official public Coursera material
  → supplied test bank. Every item records its actual evidence tier.
- Confidence limits and bank-only status remain visible when the available references cannot
  establish a unique answer, while the supplied test-bank answer stays available for exam
  preparation.
- All 39 decks and known 713 slides are indexed; visual review follows demand/risk thresholds.
- One final Markdown manual contains complete Q001–Q317 exactly once.
- Every lecture records demand/risk and a justified D0–D3 depth.
- Every supported question links to an answer-enabling slide, book page, or official public
  course source. Limited-evidence and bank-only items stay in the canonical route, preserve the
  supplied answer, and are never misrepresented as reference-established truth.
- Every question has preserved source content, verdict, explanation, and lecture mapping.
- Every correction/equation has answer-bearing evidence from the strongest allowed reference;
  supplied/corrected answers stay distinct.
- One learning loop and compact cheat sheets support conceptual mastery without coding.
- Bidirectional coverage, duplicate consistency, anchors, counts, and links pass.

## Risks

- Legacy `.ppt` conversion requires tooling not currently installed.
- Defective supplied keys may differ from the strongest reference-grounded answer.
- Targeted visual review could miss context; stratified sampling expands on any material miss.
- Large single-file output needs strict anchors, non-duplication, and validation.
- Question density is only a proxy for official exam weighting.

## Unresolved questions

- Exact grading behavior for defective keys remains unknown; the guide therefore separates the
  supplied test-bank key from the strongest reference-grounded conceptual verdict.

## Completion evidence

- Canonical manual: `docs/rel301m-complete-learning-guide.md`
- Final tester: `reports/tester-2026-07-24-full-317-canon.md` — PASS
- Final reviewer: `reports/reviewer-2026-07-24-full-317-canon.md` — PASS FOR RELEASE
- Canon: 317/317; 0 excluded.
- Evidence tiers: 225 local-slide, 54 Sutton–Barto book, 0 direct official-public-Coursera,
  38 bank-key-only.
- Final outcomes: 149 correct, 98 acceptable-with-caveat, 32 incorrect, 38 bank-key-only.
- Deterministic guide SHA-256:
  `a7dda59d0b7517c0e3de412949517bb846910d3493a0f91b4816fd17a0a38bdc`.
