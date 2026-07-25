# Editorial rewrite — Q213–Q317

Date: 2026-07-25  
Owned artifact: `study-app/content/fragments/q213-q317.json`

## Result

Rewrote the learner-facing content in the Q213–Q317 slice while preserving IDs,
conceptual-answer structures, and canonical exam-bank semantics. Removed every
CQ-R1 replacement shell named by the second content-quality audit from this
fragment.

- 105 consecutive records present: Q213–Q317.
- 420 A–D rationales present.
- 83 CQ-R1-affected records remediated.
- 22 records already accepted by CQ-R1 retained unless a named high-risk teaching
  correction required a focused rewrite.
- All 20 CQ-R2 records in this slice received question-specific teaching:
  Q220, Q235, Q239, Q240, Q242, Q249, Q251, Q258, Q259, Q260, Q262, Q266,
  Q269, Q271, Q273, Q279, Q286, Q293, Q294, and Q303.

## High-risk decisions

- Q224 continues to accept both B and C conceptually while retaining exam key C.
- Q229 continues to identify C as valid but non-unique.
- Q271 now explicitly teaches `p(s′|s,a)` and distinguishes it from
  `π(a|s)`, reward, and value functions.
- Q286 now explicitly teaches that learning rate `α` scales the TD-error update;
  it distinguishes `α` from epsilon and gamma.
- Q248/Q253 retain their different canonical keys while Q253 now directly teaches
  the recursive value/successor relationship.
- Bank-only records retain their visible reference-unverified warning.

## Verification

Read-only slice audit checked:

- IDs exactly Q213–Q317 in order.
- Every explanation has 2–4 teaching sentences.
- Every question has distinct A–D rationales of at least eight words.
- No takeaway is merely the supplied answer after normalization.
- Zero matches for all CQ-R1 shells named in the audit, including the replacement
  “However / In this case” construction.
- Focused manual reread completed for Q213, Q214, Q216, Q220, Q224, Q229, Q235,
  Q239, Q240, Q242, Q249, Q250, Q251, Q258, Q259, Q260, Q262, Q266, Q269,
  Q271, Q273, Q279, Q286, Q293, Q294, Q300, and Q303.

Machine result:

```text
rows: 105
rationales: 420
errors: 0
```

## Unresolved questions

None in this owned slice.

Status: DONE  
Summary: Replaced CQ-R1 shells across Q213–Q317, corrected all 20 displaced-topic
records, and verified 105 rows / 420 rationales with zero slice-gate errors.  
Concerns/Blockers: None.
