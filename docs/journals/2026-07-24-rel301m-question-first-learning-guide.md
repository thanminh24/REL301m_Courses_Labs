---
date: 2026-07-24
session: rel301m-question-first-learning-guide
status: completed
---

# Journal: 2026-07-24 — REL301m Question-First Learning Guide

## Context

The goal was one canonical exam manual for Q001–Q317. The question bank controls canon,
emphasis, and learning depth; the strongest allowed evidence controls conceptual truth. The
guide teaches definitions, contrasts, explanations, and one small reasoning step—not coding,
debugging, or full derivations.

## What Happened

- The initial seven-phase release preserved all questions but classified only 274 as canonical
  and quarantined 43. That was a useful safety-first release, but it conflated two separate
  questions: whether an item appeared in tests and whether local slides verified its answer.
- Phase 08 corrected the contract: test occurrence makes all 317 questions canonical, with 0
  excluded. Historical `OUT`, `discard`, and confidence labels remain audit metadata, not exam
  scope.
- The provisional question records still capture demand and source history. Reviewed primary
  and supplemental evidence overlays now assign each question its strongest honest tier:
  225 local-slide, 54 Sutton–Barto book, 0 direct Coursera-public, and 38 bank-key-only.
- Explicit per-question adjudication remains essential. Final outcomes are 149 correct, 98
  acceptable-with-caveat, 32 incorrect, and 38 bank-key-only; supplied keys stay visible and
  separate from conceptual corrections.
- Review caught Q042 being over-promoted from a book passage that did not disprove its supplied
  computer-graphics key. It was corrected to `bank-key-only`, reinforcing that nearby evidence
  is not answer-bearing evidence.
- Only official publicly visible Coursera descriptions and module titles were inspected. No
  gated lessons, videos, transcripts, quizzes, or assignments were accessed, and no question
  received direct Coursera answer support.
- Final validation passed with 317 ordered unique questions, 317 canonical, 0 excluded, 39
  lecture/framing anchors, and 713 slides across 37 PPTX decks. Two isolated builds produced
  guide SHA-256
  `a7dda59d0b7517c0e3de412949517bb846910d3493a0f91b4816fd17a0a38bdc`.

## Reflection

The initial evidence overlay, confidence-C safety rule, explicit adjudications, and duplicate
checks prevented weak mappings from becoming course truth. The later correction did not discard
that rigor; it separated exam canon from verification strength and extended the evidence
hierarchy beyond slides.

For learners, the final guide is both complete and honest. Every tested question stays in the
study route, while each answer shows whether it is slide-backed, book-backed, or only the
available test-bank key. Corrections teach the strongest supported concept without hiding what
the exam bank says.

## Decisions Made

| Decision | Rationale | Impact |
|---|---|---|
| Test occurrence defines canon | All Q001–Q317 appeared in tests | 317 canonical; 0 excluded |
| Evidence defines verification, not scope | Canonical does not mean reference-proven | 225 slide, 54 book, 0 Coursera-direct, 38 bank-only |
| Use slides → local book → public Coursera → bank key | Prefer answer-bearing evidence while preserving exam utility | Strongest available tier is visible per question |
| Preserve provisional records and overlay reviewed maps | Keep audit history without freezing weak routing | Final mappings and supplemental evidence remain reproducible |
| Adjudicate every question explicitly | Source-quality labels cannot decide correctness | 149 correct, 98 caveat, 32 corrected, 38 bank-only |
| Reject non-answer-bearing promotion | Nearby material cannot establish a unique answer | Q042 remains canonical but honestly bank-key-only |
| Generate and validate deterministically | Large guides need reproducible contracts | Stable sequence, evidence counts, links, anchors, and hash |

## Next Steps

- Use `docs/rel301m-complete-learning-guide.md` as the canonical route; treat the revision index
  as an audit aid and the workbook as optional practice.
- When stronger evidence appears, update the evidence maps and adjudications first, then rebuild
  and rerun the validator.
- Keep the two legacy `.ppt` decks framing-only until their slide contents and counts can be
  audited reliably. Keep printed book-page locators distinct from local PDF page offsets.

## Unresolved Questions

- No release blocker remains. Exact official grading behavior for defective supplied keys is
  still unknown.
