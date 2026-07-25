# Content review — Q107–Q212

Date: 2026-07-25  
Status: complete

## Independent editorial re-audit remediation

The first independent 317-row audit failed the learner-facing editorial gate even
though this fragment was structurally and semantically valid. For Q107–Q212, the
before-state was:

| Finding | Before |
|---|---:|
| CQ-1 records with generic option rationales | 98 |
| CQ-2 answer-only takeaways identified by the audit | 0 |
| CQ-3 records with template-heavy explanations | 91 |

The fragment was reopened record by record. All 106 takeaways were also rewritten
proactively so each now contains a rule, contrast, or uncertainty hook rather than
merely repeating an answer.

The after-state scan is:

| Editorial check | After |
|---|---:|
| Known CQ-1/CQ-3 filler phrases | 0 |
| Explanations with fewer than two teaching statements | 0 |
| Exact answer-only takeaways | 0 |
| Missing A–D rationales | 0 |
| Duplicate rationales within a question | 0 |
| Non-contiguous or duplicate IDs | 0 |

Distractors now explain the option's actual category or misconception: for example,
learning rate is identified as update step size, discount factor as future-reward
weighting, environment models as transition/reward predictors, greedy selection as
exploitation, and immediate reward as distinct from return. Bank-key-only items
state what each option proposes without inventing evidence that an unselected option
is false.

The semantic fields were not changed. Q188 still retains exam key A in the source
record while accepting A and B conceptually, with distinct first-visit,
every-visit, TD, and Q-learning rationales.

### Second editorial spot-check

A later spot-check found a replacement shell around “wrong role / governed by”
and generic concept-plus-answer takeaways. Those constructions were removed
throughout Q107–Q212. Takeaways now preserve the answer together with its reason
or operational contrast. Q110 was rewritten by hand to distinguish distribution
overlap and importance-weight variance from sample size, iteration count, and
convergence order. Q188 was restored to a compact natural explanation and memory
hook: both variants average complete returns; first-visit counts once per episode,
every-visit counts every occurrence.

The strengthened validator rules were replicated directly against this fragment:
minimum 30 explanation words, two teaching sentences of at least six words,
minimum six-word takeaway, minimum ten-word A–D rationales, distinct rationales,
and every banned editorial pattern. Result: **0 failures across 106 records**.

## Scope and evidence

- Reviewed exactly 106 canonical records, ordered Q107 through Q212.
- Used `question-records.json`, `question-adjudications.json`,
  `primary-evidence-map.json`, `supplemental-evidence-map.json`, and the relevant
  lecture chapters in `docs/rel301m-complete-learning-guide.md`.
- Kept the supplied exam key outside conceptual acceptance. The enrichment does
  not silently turn a test-bank key into verified truth.

## Adjudication counts

| Verdict | Count |
|---|---:|
| Correct | 44 |
| Acceptable with caveat | 39 |
| Incorrect | 8 |
| Bank-key-only | 15 |
| **Total** | **106** |

## Conceptual answer shapes

| Shape | Count |
|---|---:|
| Single accepted option | 83 |
| Multiple accepted options | 2 |
| Free-form correction | 4 |
| Manual review / insufficient unique option evidence | 17 |
| **Total** | **106** |

The 17 manual-review records comprise 15 bank-key-only items plus Q119 and
Q152. Each bank-key-only explanation explicitly identifies the supplied exam
choice and states that the available references do not independently verify it.

## Important anomalies preserved

- **Q109:** none of A–D states Dyna's real purpose. Conceptual answer describes
  the integration of acting, direct learning, model learning, and planning.
- **Q119:** `Q` is action-value notation, not an acronym that “stands for” one
  of the offered words. No option is accepted as literal conceptual truth.
- **Q122:** random model sampling provides planning coverage over previously
  observed state–action pairs; it is not environment exploration.
- **Q151:** the important distribution-model advantage is enabling an expected
  update over possible transitions and rewards; no offered answer says this
  precisely.
- **Q152:** no universal sample-efficiency ordering exists between sample and
  distribution models.
- **Q177:** both A and C can be “NOT a bias source”; the item has two defensible
  answers.
- **Q188:** supplied exam key remains A, while conceptual acceptance is
  explicitly **A and B**. Both first-visit and every-visit MC average returns;
  they differ in which within-episode visits are counted.
- **Q202:** optimal state value means maximum **expected return** over policies,
  not the largest individual reward; no option states it exactly.

## Automated integrity checks

- JSON parses successfully.
- Exact count: 106.
- Exact ordered IDs: Q107–Q212, no gap or duplicate.
- Every explanation has at least two sentences.
- Every record has non-empty A, B, C, and D rationales.
- The four rationales within every record are distinct.
- Total learner-facing enrichment text: 143,272 characters.

## Unresolved questions

- The 15 bank-key-only records remain intentionally unverified until an
  answer-bearing primary reference is supplied. They are still canonical exam
  material and their bank keys remain available through the source dataset.
