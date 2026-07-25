# Final content quality audit v4

Date: 2026-07-25  
Integrated artifact: `study-app/src/data/generated/question-bank.json`  
QA artifact: `study-app/src/data/generated/content-qa-manifest.json`  
Dataset hash:
`4b8140d16a83f4276dabf523ff4fe5ff5a03689480fa875f0486e0c7fb477627`

## Verdict

**FAIL**

This remediation is a major improvement. The previous broad-topic duplication in
Q213–Q317 is gone, the named high-risk questions are handled correctly, and the
canonical/provenance data is intact. However, 30 questions still have concrete
learner-facing defects: incomplete or semantically wrong A–D rationales,
undisclosed bank-only provenance, or visible boilerplate. Because acceptance
requires every one of Q001–Q317 to be independently acceptable, the bank cannot
yet be marked reviewed.

## Method and full coverage

- Parsed and inspected all 317 integrated questions, all 317 explanations, all
  317 takeaways, and all 1,268 A–D rationales.
- Compared every canonical stem, option set, supplied key, verdict, concept,
  evidence tier, depth, and confidence against:
  - `question-records.json`;
  - `question-adjudications.json`;
  - `primary-evidence-map.json`; and
  - `supplemental-evidence-map.json`.
- Inspected all 38 bank-key-only questions for visible uncertainty/provenance
  disclosure.
- Rechecked every incorrect and caveated record and specifically Q002, Q004,
  Q188, and Q224.
- Scanned normalized text for exact explanation/takeaway duplication,
  within-rationale repeated sentences, cross-question reuse, generic editorial
  frames, and repeated long phrases.
- Ran `npm run data:precheck` and `npm run data:check`; the former passes while
  allowing unreviewed content, and the latter correctly fails because all 317
  independent-review flags remain false.

## Structural and authority results

| Check | Result |
|---|---:|
| Canonical IDs | PASS — Q001–Q317, ordered and unique |
| Canonical stem/option/key mismatches | PASS — 0 |
| Verdict/concept/evidence/depth/confidence mismatches | PASS — 0 |
| Verdict totals | PASS — 149 correct, 98 caveat, 32 incorrect, 38 bank-only |
| Evidence totals | PASS — 225 lecture, 54 book, 38 question-bank |
| Exact duplicate explanations across questions | PASS — 0 |
| Exact duplicate takeaways across questions | PASS — 0 |
| Rationales with an internally repeated substantive sentence | PASS — 0 |
| Rationales below the configured minimum | PASS — 0 |
| `data:precheck` | PASS |
| `data:check` | FAIL — all 317 remain `independentlyReviewed: false` |

The red final check is appropriate. A passing precheck is not proof that the
remaining rationales are semantically adequate.

## High-risk adjudication results

| ID | Result | Finding |
|---|---|---|
| Q002 | PASS | Preserves exam C while correctly teaching that none of A–D states Dyna's main sample-efficiency benefit. |
| Q004 | PASS | Preserves exam C as an exam-bank analogy while teaching TD's actual bootstrap mechanism. |
| Q188 | PASS | Preserves exam A and correctly accepts both A and B conceptually; all four rationales distinguish first-visit MC, every-visit MC, TD, and Q-learning. |
| Q224 | PASS | Correctly accepts both Monte Carlo and TD as model-free action-value estimation families. |

Q229, Q248, Q253, Q271, and Q286 also preserve the prior technically correct
adjudications.

## Blocking concerns

### CQ4-1 — incomplete or semantically wrong option rationales

The following **21 questions** are not yet suitable for Learn/Test review because
at least one A–D rationale fails to explain the actual option distinction.

- **Q016:** A and C merely define return/value, and D gives a generic exploration
  sentence. They do not explain that these are critic-side quantities or
  behavior modifiers rather than the actor itself.
- **Q021:** all four rationales merely label bias or variance. None explains how
  overlapping coarse features create the claimed bias–variance trade-off.
- **Q022:** D says deterministic environments “store separate entries for
  states or state–action pairs,” which is unrelated to the option and false as a
  rebuttal.
- **Q027:** the explanation and takeaway are identical. B does not plainly say
  that both MC and TD are model-free; C and D repeat a generic MC-return sentence
  instead of refuting their reversed online-learning claim and universal
  convergence-speed claim.
- **Q033:** A and B receive the same generic exploration sentence instead of
  explaining opposite changes to the UCB bonus. C and D also use one generic
  search-statistics sentence rather than explaining why fewer simulations or
  aggressive pruning reduce early coverage.
- **Q040:** B does not say that policy evaluation holds the policy fixed. C says
  sweeping states is characteristic of DP but never explains why “iterative”
  refers to repeated backups to convergence rather than merely visiting states.
- **Q044:** A and D are answered with the same generic Q-learning definition.
  They do not explain why past-versus-future experience and
  deterministic-versus-stochastic policy are not the on/off-policy distinction.
- **Q048:** C incorrectly refers to “the TD prediction quantity asked here,”
  although the stem asks which method is not used in RL. D calls DDPG a
  policy-gradient method without stating the needed conclusion that DDPG is used
  in RL.
- **Q049:** C and D drift to discount-factor language. D explicitly says the
  question asks for a “conventional discount symbol,” but this question asks for
  the learning-rate term.
- **Q050:** C only defines discounting and D only defines averaging; neither
  explains that Q-learning uses immediate reward plus a discounted **maximum**
  next-action value, not a discounted next-state reward or an action average.
- **Q055:** A, B, and D all receive essentially the same state-value definition;
  C introduces Bellman-equation language. The rationales do not adjudicate the
  actor/critic role swaps stated by the options.
- **Q057:** A and B merely define state/action values; C merely defines return.
  The rationales do not explain why policy gradient optimizes expected
  performance through policy parameters rather than directly maximizing or
  minimizing one value-function output.
- **Q058:** D labels random walk as generic information gathering instead of
  explaining that it is not the named behavior-policy rule used with Expected
  Sarsa.
- **Q059:** C and D receive the same generic action-value sentence. They should
  identify Q-learning's max target and Expected Sarsa's policy-weighted
  expectation, respectively.
- **Q062:** A/B/C/D are generic representation/value/action descriptions. The
  correct C rationale never explains coarse coding's overlapping receptive
  fields and shared updates; A does not contrast non-overlapping aggregation
  with overlapping coarse coding.
- **Q067:** the takeaway visibly repeats “Action selection. Action selection.”
  The correct B rationale oddly says action selection is not how long-term values
  are defined instead of positively explaining the softmax mapping from
  preferences to action probabilities.
- **Q084:** all four rationales say the options concern runtime/storage cost.
  The options actually compare granularity, generalization, and learning speed.
  This is the clearest remaining generated-rationale failure.
- **Q094 and Q101:** the duplicate MCTS questions share weak rationales. C
  defines arithmetic average instead of explaining exploitation value versus
  the UCB exploration bonus. D is grammatically and conceptually confused
  (“is the supplied choice, but it changes search structure...”) and does not
  explain that both parent and child/action visit counts enter the bonus.
- **Q098:** the correct C rationale defines a state-value estimate but never
  explains cross-state generalization through shared parameters. A likewise uses
  a generic exploration sentence rather than addressing representation versus
  action-space reduction.
- **Q105:** B, C, and D are category templates rather than option-specific
  rebuttals. In particular, C calls a reward/transition statement “environment
  dynamics” without explaining that “without using tables” contradicts
  *tabular*, and D does not simply state that TD learns model-free from sampled
  transitions.

These are not objections to concise wording. They are cases where a learner can
read a rationale and still not learn why that particular option is right or
wrong.

### CQ4-2 — two bank-only questions omit the bank-only warning

- **Q070**
- **Q103**

Both records have `evidence.type: "question-bank"` and conceptual answers set to
manual review, but their explanation and takeaway present the temperature answer
as ordinary verified theory without saying that the canonical evidence tier is
the supplied bank only. The temperature teaching itself is technically sound;
the provenance presentation is not.

Other bank-only records visibly say “bank,” “exam association,” “unverified,”
or that no answer-bearing source was found. Q070/Q103 are the exceptions.

### CQ4-3 — repeated editorial boilerplate remains in seven explanations

- **Q143**
- **Q153**
- **Q159**
- **Q175**
- **Q179**
- **Q207**
- **Q209**

Each starts with the same generated frame:

> “This item tests MSVE, gradient descent, and state aggregation, and the
> supported answer is …”

The second sentence and rationales are generally correct, so this is smaller
than CQ4-1. It still violates the explicit no-boilerplate requirement and often
introduces neighboring concepts that the individual stem does not ask about.
Remove the shared opener and begin directly with the question-specific mechanism.

## What improved since v3

- All 14 exact duplicate-explanation groups were removed.
- All 56 within-rationale duplicated sentences were removed.
- The former semantic failures in Q217, Q219, Q222, Q236, Q246, Q255, Q256,
  Q267, Q272, Q274, Q275, Q277, Q281, Q287, Q289, Q291, Q295, Q296, Q306,
  Q314, and Q315 are now question-specific and acceptable.
- Q249, Q251, Q258, Q259, Q260, Q271, and Q286 are concise, technically correct,
  and easy to learn.

## Required action before independent PASS

1. Rewrite the A–D rationales for the 21 CQ4-1 IDs.
2. Add explicit question-bank-only provenance warnings to Q070 and Q103 without
   changing their technically useful temperature explanation.
3. Remove the repeated opener from the seven CQ4-3 IDs.
4. Rebuild the integrated bank and rerun `data:precheck`.
5. Re-audit the resulting hash independently. Only then set
   `independentlyReviewed: true`; never flip the QA booleans for this failing
   hash.

## Unresolved questions

- None concerning canonical scope, supplied exam keys, or immutable evidence
  mappings.
- The 23 unique blocking records above remain unresolved (the seven
  boilerplate IDs are separate from the 21 rationale IDs except where stated;
  total unique affected records: 30).

Status: DONE  
Summary: Independently inspected all 317 questions and 1,268 rationales. Canon,
provenance structure, high-risk adjudications, and the entire Q213–Q317
remediation are materially improved, but the final content still fails because
21 questions retain deficient option rationales, Q070/Q103 omit bank-only
disclosure, and seven explanations retain an explicit repeated boilerplate
frame.  
Concerns/Blockers: Do not mark this dataset hash independently reviewed.
