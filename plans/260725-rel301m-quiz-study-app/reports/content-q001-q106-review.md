# Q001–Q106 content review

Date: 2026-07-25  
Scope: `study-app/content/fragments/q001-q106.json`

## Result

- 106 records present, ordered exactly Q001 through Q106.
- Every record has a substantive learner explanation, a takeaway, four option-specific rationales, and an explicit conceptual-answer object.
- JSON parse and structural validation pass.
- No placeholder text or inferred conceptual letters.
- Every freeform/manual-review item has an empty `acceptedLetters` array.
- Independent editorial FAIL findings were remediated across the complete assigned range, not only the cited examples.

## Independent-audit remediation

The first independent audit found all 106 assigned records affected by CQ-1,
51 by CQ-2, and 52 by CQ-3. The complete fragment was rewritten.

| Gate | Before | After |
|---|---:|---:|
| CQ-1 generic rationale records | 106 | 0 |
| CQ-2 answer-only takeaway records | 51 | 0 |
| CQ-3 filler-explanation records | 52 | 0 |
| Known banned phrase matches | present | 0 |

Editorial changes:

- Explanations now pair the definition/mechanism with a consequence, evidence
  qualification, or nearest-distractor contrast.
- Takeaways now use a named concept rule plus a contrast; bank-only takeaways
  use an exam-only uncertainty flag.
- Each rationale quotes its own option and explains the option's operative
  idea or misconception. Runtime, probability, policy, value, model,
  exploration, representation, tree-search, and educational-delivery claims
  are distinguished rather than rejected by a generic answer comparison.
- Q002's scalability, redundancy, computational-cost, and design-complexity
  distractors are now separately explained against Dyna's sample-efficiency
  mechanism.
- Q004 and the other bank-only records retain epistemic uncertainty: the
  keyed option is identified as bank recall, while alternatives are not
  falsely declared conceptually disproven.

## Source and verdict counts

| Classification | Count |
|---|---:|
| Lecture-primary | 65 |
| Sutton–Barto-primary | 24 |
| Question-bank-only | 17 |
| Correct | 52 |
| Acceptable with caveat | 22 |
| Incorrect | 15 |
| Bank-key-only | 17 |

Conceptual record kinds: 68 single-answer, 1 multiple-answer, 15 freeform,
and 22 manual-review.

## Important treatment decisions

- Q002: no listed choice states Dyna's reference-backed sample-efficiency
  benefit. The conceptual answer is freeform; supplied C is not accepted.
- Q012: A and C state the same model-based/model-free distinction, so both
  are explicitly accepted.
- Q014, Q030, Q032, Q041, Q051, and Q063: adjudication used a generic
  correction placeholder, so the learner display uses the substantive lecture
  correction from `why`; no option letter was inferred.
- Q019, Q028, Q048, Q054, Q056, Q064, Q074, and Q078: the approved evidence
  says no listed option is exactly correct or the premise is defective. These
  use freeform answers with no accepted letter.
- Q010, Q069, Q091, Q094, and Q101: the supplied option is conditional,
  incomplete, or not uniquely supported. These remain manual-review rather
  than being silently scored as conceptual truth.
- Q004, Q005, Q009, Q015, Q026, Q035, Q039, Q042, Q043, Q053, Q060, Q070,
  Q083, Q089, Q092, Q095, and Q103 explicitly distinguish exam-bank recall
  from independent verification.
- Q070/Q103 are a near-duplicate pair and are retained as separate canonical
  tested items. Q032, Q104, and Q105 also retain their canonical identities
  despite duplicate partners outside this fragment.

## Validation performed

- Parsed the generated file with Node's JSON parser.
- Verified exact count, IDs, ordering, required keys, A–D rationale coverage,
  allowed conceptual kinds, and distinct rationale strings.
- Verified every rationale contains its exact source option text.
- Rejected every CQ-3 filler phrase and all explicitly banned CQ-1 phrases.
- Compared normalized takeaways with all four answer texts; zero takeaway is
  merely an option letter/text.
- Verified each explanation contains at least two independently useful
  teaching statements.
- Re-ran the strengthened editorial validator after the second review:
  all 106 explanations contain at least 30 words and at least two teaching
  sentences of six or more words; 0 failures.
- Removed the follow-up banned templates (`For this stem ... is decided by`,
  `wrong mechanism or level`, literal-statement/causal-criterion wording, and
  `Memory rule for ...`). Final scan: 0 occurrences.
- Reworked context-sensitive terms instead of matching isolated keywords.
  In particular, Q080 now explains polynomial, exponential, logarithmic, and
  linear runtime correctly; “linear” is no longer confused with linear
  function approximation.
- Expanded Q011, Q016, Q057, Q075, Q079, Q086, Q087, Q096, and Q104 after
  the strengthened minimum-depth check identified them. All now teach a
  mechanism plus a contrast or operational consequence.
- Reconciled every record against `question-records.json`,
  `question-adjudications.json`, and `primary-evidence-map.json`.
- Used `supplemental-evidence-map.json` for the book-backed and unresolved-bank
  items.
- Spot-reviewed high-risk records Q002, Q004, Q010, Q012, Q014, Q030, Q094,
  and the boundary record Q106.

## Unresolved questions

- None within the assigned Q001–Q106 content boundary. Bank-key-only items
  remain intentionally marked unverified rather than falsely resolved.
