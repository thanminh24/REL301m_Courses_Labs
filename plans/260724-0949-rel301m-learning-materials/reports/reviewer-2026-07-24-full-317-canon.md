# Full 317-Question Canon Review

Date: 2026-07-24  
Verdict: **PASS FOR RELEASE**

## Findings

- Critical: none.
- High: none.
- Medium: none open.

Resolved during review:

- Q042 was initially over-promoted from a book passage that did not disprove the supplied
  computer-graphics key. It is now honestly `bank-key-only`.
- Evidence-ledger counts, adjudication authority, Coursera unresolved count, guide front
  snapshot, and plan/phase source contracts were aligned with the final hierarchy.
- Ambiguous book decisions now say the evidence “does not uniquely resolve” the supplied key.

## Acceptance review

- Q001–Q317 are present once, in order; all 317 records are exam-canonical; 0 excluded.
- Final evidence tiers reconcile: 225 local-slide, 54 Sutton–Barto book, 0 official-public-
  Coursera direct, 38 supplied-bank-only.
- Final outcomes reconcile: 149 correct, 98 acceptable-with-caveat, 32 incorrect, 38
  bank-key-only.
- Original stems, four options, and supplied exam keys remain preserved. All 32 `incorrect`
  entries contain a separate conceptual correction.
- Book promotions contain printed-page locators, source explanations, and a visible
  book-supported label distinct from local-slide evidence.
- Requested book cases pass semantic inspection: Q002, Q007, Q056, Q066, Q136, Q154.
  Q042 correctly remains unresolved after the reference pass.
- Requested bank-only cases Q004, Q026, Q103, and Q307 remain canonical, retain the supplied
  key, and explicitly state that no answer-enabling passage was found.
- Sutton–Barto page checks confirmed answer-bearing passages for the inspected promotions:
  Dyna/sample efficiency (pp. 161–165), UCB/MCTS (pp. 35–36, 186–187), shaping (p. 470),
  policy-gradient versus DQN (pp. 321–322, 436–439), Thompson sampling (p. 43), and the
  eligibility-trace continuum (pp. 292, 317).
- Official public Coursera pages confirm the Alberta four-course sequence and topic alignment.
  No remaining item was promoted from titles or gated content; direct Coursera count stays 0.
- Legacy `OUT`/`discard` labels in the searchable source index are explicitly identified as
  historical quality/module labels, not non-canonical status.
- No guide quarantine, unusable, or exclusion semantics remain. Internal/local links and
  lecture/framing anchors validate.

## Verification

- `python scripts/validate-rel301m-learning-guide.py`:
  `PASS: 317 questions; 317 canonical; 0 excluded; 225 slide-backed; 54 book-backed;
  0 Coursera-public; 38 bank-only; 39 lecture/framing anchors.`
- Isolated two-build reproducibility:
  `a7dda59d0b7517c0e3de412949517bb846910d3493a0f91b4816fd17a0a38bdc` both runs.
- Workspace guide SHA256 matches the isolated rebuild.
- Adjudication SHA256:
  `5c6446143cc64e6b7aa66ae9f64c13f470ab7421ad3a9bb1c101f59c8f88f2e7`.
- Custom cross-artifact audit: 317 canonical records; 54 book; 38 bank-only; 32/32
  incorrect entries have corrections.
- `git diff --check` passed for in-scope files.

## Unresolved questions

Exact grading behavior for defective supplied keys remains unknown. The guide handles this by
preserving the exam key while separately teaching the strongest reference-grounded verdict.

Status: DONE  
Summary: Full 317-question canon and evidence hierarchy independently verified; release approved.  
Concerns/Blockers: None. Defective-key grading behavior remains an explicit non-blocking unknown.
