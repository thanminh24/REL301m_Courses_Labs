---
title: "Phase 08 — Promote the Complete Tested Bank to Canon"
status: completed
---

# Phase 08 — Promote the Complete Tested Bank to Canon

## Context

All Q001–Q317 appeared in tests. Therefore exam occurrence, not lecture mapping, defines
canonical status. The earlier 274 canonical / 43 quarantined split incorrectly mixed two
different questions: whether an item is examinable and whether local lecture slides verify it.
The course is based on the University of Alberta/Coursera reinforcement-learning sequence and
the repository contains Sutton and Barto's reference book, so those sources can close genuine
concept gaps while remaining visibly distinct from lecture-slide evidence.

## Requirements

- Treat Q001–Q317 as canonical exam material.
- Keep every original stem, option, and supplied answer unchanged.
- Use evidence priority: local slides → local Sutton–Barto book → official public Coursera
  course material → supplied test bank.
- Keep direct lecture mappings, add page-level book or official-public-course evidence where it
  answers a question, and leave only the unresolved remainder as bank-only.
- Convert limited-evidence outcomes into `bank-key-only`, not unusable or excluded.
- Clearly separate the supplied test-bank answer from lecture-grounded conceptual corrections.
- Use only local slides, the local Sutton–Barto book, official publicly accessible Coursera
  pages, and the supplied question bank.

## Files

- `plans/260724-0949-rel301m-learning-materials/research/question-records.json`
- `plans/260724-0949-rel301m-learning-materials/research/primary-evidence-map.json`
- `plans/260724-0949-rel301m-learning-materials/research/question-adjudications.json`
- `plans/260724-0949-rel301m-learning-materials/research/supplemental-evidence-map.json`
- `plans/260724-0949-rel301m-learning-materials/research/coursera-public-source-inventory.md`
- `scripts/promote-rel301m-tested-bank-to-canon.py`
- `scripts/build-rel301m-primary-evidence-map.py`
- `scripts/build-rel301m-adjudications.py`
- `scripts/build-rel301m-learning-guide.py`
- `scripts/rel301m_guide_common.py`
- `scripts/rel301m_guide_questions.py`
- `scripts/validate-rel301m-learning-guide.py`
- `docs/rel301m-complete-learning-guide.md`
- `docs/final-exam-revision-question-index.md`
- `README.md`

## Implementation

- [x] Preserve the legacy lecture-scope audit as metadata, then set all 317 records canonical.
- [x] Extract and index the local Sutton–Barto PDF by page.
- [x] Inventory official public Coursera course pages without copying protected course content.
- [x] Generate 317 primary-source records: slide, book, official public course, or bank-only.
- [x] Adjudicate evidence gaps as canonical `bank-key-only` outcomes.
- [x] Replace quarantine/exclusion navigation with canonical source supplements.
- [x] Regenerate the manual and align README/index wording.
- [x] Validate exact 317 sequence, source preservation, mapping types, links, and deterministic output.
- [x] Complete independent testing and review.

## Validation

- Validator reports `317 questions; 317 canonical; 0 excluded`.
- Primary source map contains 317 entries and reports counts for slide-, book-,
  official-public-course-, and bank-only evidence.
- No guide heading or navigation text calls any question quarantined or excluded.
- All 317 supplied answers remain present.
- Two consecutive builds produce the same SHA256 hash.

## Risks and rollback

- Risk: “canonical” may be mistaken for “verified by a reference.” Mitigation: expose the exact
  evidence tier separately on every question.
- Risk: Coursera lesson content may require authentication or be copyrighted. Mitigation: use
  only official publicly accessible pages and concise factual summaries; do not bypass access
  controls or reproduce course content.
- Risk: a supplied test key may be conceptually defective. Mitigation: retain both the supplied
  answer and the lecture-grounded verdict/correction.
- Rollback: restore the three generated JSON artifacts and guide from the previous deterministic
  build; scripts remain the authoritative reproducible path.

## Unresolved questions

- Exact exam grading behavior for known defective supplied keys remains unknown.
