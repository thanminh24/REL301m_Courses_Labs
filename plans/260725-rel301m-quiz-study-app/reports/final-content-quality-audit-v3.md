# Final content quality audit v3

Date: 2026-07-25  
Artifact: `study-app/src/data/generated/question-bank.json`  
Authority checked: `question-records.json`, `question-adjudications.json`,
`primary-evidence-map.json`, and `supplemental-evidence-map.json`

## Verdict

**FAIL.**

The third integrated bank preserves the 317 canonical records and fixes the
previously highlighted high-risk answers. It still does not satisfy the requested
editorial standard that every question have a deep, easy, question-specific
explanation and four genuinely distinct option rationales.

The main remaining problem is concentrated in the generated teaching for
Q213–Q317, although concrete rationale problems also remain earlier in the bank.
Many later records reuse one broad topic capsule across different questions,
repeat the takeaway twice inside the correct rationale, or never teach the
particular distinction in the stem.

## Coverage and method

- Parsed every Q001–Q317 row.
- Checked all 317 stems, 1,268 A–D options, 317 supplied answers, verdicts,
  concepts, evidence tiers, depths, and confidence fields against the source
  records.
- Scanned all 317 explanations, 317 takeaways, and all 1,268 rationales.
- Normalized text and measured exact duplicates, cross-question repeated
  sentence/9-word sequences, answer-first explanations, explanation/takeaway
  overlap, and repeated sentences within one rationale.
- Manually inspected every automatically detected exception, all exact-duplicate
  explanation groups, all validator failures, the prior-audit regression set,
  and the high-risk questions Q002, Q004, Q188, Q224, Q229, Q248, Q253, Q271,
  and Q286.
- Ran `npm run data:check` against the integrated artifact.

## Counts

| Check | Result |
|---|---:|
| Canonical IDs | 317/317, ordered and unique |
| A–D options inspected | 1,268 |
| Authority-field mismatches | 0 |
| Verdict totals | 149 correct; 98 caveat; 32 incorrect; 38 bank-key-only |
| Evidence totals | 225 lecture; 54 book; 38 question-bank |
| Exact duplicate explanation groups | 14 groups, 54 questions |
| Exact duplicate takeaway groups | 17 groups, 64 questions |
| Rationales containing a duplicated substantive sentence | 56 rationales in 56 questions |
| Questions whose takeaway is copied verbatim inside the explanation | 196 |
| Explanations beginning with the supplied answer text | 98 |
| Cross-question exact duplicate rationales | 124 instances across 73 questions |
| Current validator result | FAIL |
| QA rows marked `independentlyReviewed: false` | 317/317 |

Copying a takeaway into an explanation is not automatically wrong. The counts
above become decisive when the same capsule is also reused for questions asking
different things and is repeated twice inside a rationale.

## What passes

### Canon and authority preservation

There are zero mismatches for:

- stem;
- A–D option text;
- supplied exam letter and answer text;
- adjudicated verdict;
- normalized concept;
- evidence tier;
- depth; and
- confidence.

The generated counts also match the canonical source totals.

### High-risk answer separation

| ID | Result | Finding |
|---|---|---|
| Q002 | PASS | Correctly says none of A–D states Dyna's sample-efficiency benefit; exam C remains visibly separate. |
| Q004 | PASS | Keeps C only as an explicitly unverified exam-bank association. |
| Q188 | PASS | Exam A is preserved; conceptual grading correctly accepts A and B and distinguishes first-visit/every-visit MC from TD/Q-learning. |
| Q224 | PASS | Correctly accepts both B and C as model-free action-value estimation families. |
| Q229 | PASS | Correctly treats C as a valid but non-unique example. |
| Q248 | PASS | Carefully distinguishes a Bellman equation from the use of a Bellman backup. |
| Q253 | PASS | Correctly teaches recursive value consistency with successor values. |
| Q271 | PASS | Now explicitly teaches `p(s′|s,a)` and distinguishes policy, reward, transition, and value. |
| Q286 | CONTENT PASS | Correctly explains that alpha scales the TD error; it fails only the validator's arbitrary 30-word threshold. |

Q249, Q251, Q258, Q259, Q260, and Q286 are also concise and technically good
after the rewrite, despite some being rejected by the length-only validator.

## Blocking findings

### CQ3-1 — exact topic capsules replace question-specific teaching

Fourteen explanations are copied exactly across 54 questions:

- Q233, Q247, Q254, Q256, Q275, Q277, Q282, Q289 — identical generic TD
  capsule.
- Q223, Q255, Q291, Q292, Q295, Q296, Q299 — identical generic function
  approximation capsule.
- Q236, Q246, Q272, Q274, Q288, Q290 — identical generic off-policy capsule.
- Q215, Q237, Q244, Q280, Q283 — identical Expected Sarsa capsule.
- Q222, Q265, Q268, Q306 — identical dynamic-programming capsule.
- Q227, Q232, Q281, Q287 — identical model-based capsule.
- Q305, Q314, Q315, Q316 — identical exploration/exploitation capsule.
- Q217, Q309, Q310 — identical action-value capsule.
- Q267, Q276, Q278 — identical Monte Carlo capsule.
- Q219/Q221, Q228/Q297, Q238/Q285, Q298/Q308, and Q301/Q302 form the other
  duplicate pairs.

Several are related duplicate-bank questions, where shared wording can be
reasonable. Many are not:

- **Q256** asks which item is *not a TD(0) step* (backpropagation), but its
  explanation only gives a generic TD update.
- **Q275** asks TD's advantage over DP and MC (no complete dynamics/episode);
  the capsule does not explain the DP model requirement.
- **Q277** asks about delayed rewards; the capsule never explains temporal
  credit or why the supplied wording is broad.
- **Q289** asks what the “difference” in TD means; the capsule never identifies
  the TD error as observed target minus current prediction.
- **Q255** asks for a problem caused by linear approximation (underfitting);
  the reused text teaches only its benefit, generalization.
- **Q291** asks what state aggregation does; the reused text never says states
  are grouped to share a value.
- **Q295** asks the approximator's role in epsilon-greedy control; the reused
  text never says it supplies approximate action values used to select actions.
- **Q296** asks what a parameterized function is; the reused text does not
  define weights/parameters.
- **Q236** asks for a commonly used RL algorithm (Q-learning); the off-policy
  capsule never actually identifies or explains Q-learning.
- **Q246** asks how to reduce Monte Carlo variance; the capsule mentions
  behavior/target policies but not how importance sampling applies or affects
  variance. The supplied premise itself needs a caveat.
- **Q272** asks what the accumulated importance-ratio product `W` does; the
  capsule never explains likelihood ratios, reweighting, or the accumulated
  product.
- **Q274** asks which algorithm is used off-policy; the capsule omits
  Q-learning's max-target mechanism.
- **Q222** asks for the option that is not a suitable-DP characteristic; the
  capsule does not adjudicate “greedy solution approach.”
- **Q265** asks specifically what policy evaluation computes; the capsule
  describes the whole iteration loop.
- **Q306** asks when iterative policy evaluation stops; the capsule never
  explains convergence/tolerance.
- **Q281** asks the objective of random tabular Q-planning; the capsule explains
  models generally without connecting simulated backups to improving Q/policy.
- **Q287** asks for a distribution-model challenge; the capsule explains a
  model's benefit rather than difficulty accurately learning dynamics.
- **Q314/Q315** ask specifically about softmax action selection; their reused
  capsule never explains exponentiated preferences or graded action
  probabilities.
- **Q217** asks why action values are estimated; defining `q(s,a)` alone omits
  their use in comparing actions and improving the policy.
- **Q219** asks for the Sarsa/Q-learning difference; its reused text explains
  only Sarsa's on-policy side.
- **Q267** asks sample-model versus distribution-model classification; its
  generic complete-return contrast with TD does not resolve that model
  distinction.

These are substantive semantic omissions, not style preferences.

### CQ3-2 — 56 correct-answer rationales contain a sentence twice

The following rationales repeat the same substantive sentence within a single
rationale:

`Q215B, Q219A, Q221C, Q222C, Q223C, Q226B, Q228B, Q232B, Q236B, Q237B,
Q238B, Q241A, Q243B, Q244B, Q245C, Q246B, Q247C, Q254B, Q255C, Q256C,
Q261C, Q264C, Q267A, Q268A, Q274A, Q275B, Q276D, Q277B, Q278C, Q280B,
Q282B, Q283B, Q284A, Q285A, Q287C, Q288C, Q289B, Q290B, Q291A, Q292B,
Q295B, Q296B, Q297B, Q298B, Q299C, Q301C, Q302C, Q305B, Q306D, Q308B,
Q309B, Q310C, Q312D, Q314C, Q315A, Q316A`.

Example, Q254B says its TD memory line twice. Q243B, Q244B, Q245C, and many
others have the same generation artifact. This is visibly unedited learner copy
and directly violates the “deep and easy” requirement.

### CQ3-3 — several A–D rationales are wrong, generic, or fail the actual distinction

Concrete examples from outside the exact-duplicate groups:

- **Q005 A and D:** both are explained as claims about an RL environment model,
  although the options concern adding bias and restricting training data.
- **Q006 A:** “always choosing the highest Q-value” is described as estimating
  expected return; it actually describes a greedy action-selection rule.
  **Q006 C**, the correct epsilon-greedy option, is reduced to a generic
  information-gathering sentence instead of explaining the epsilon/random and
  `1-epsilon`/greedy branches.
- **Q007 A/C/D:** the same generic exploration sentence does not explain why
  increasing the UCB exploration constant favors underexplored nodes and why
  reducing it or pruning those nodes does the opposite.
- **Q008 C:** the rationale says generalization “estimates expected return from a
  state”; it does not explain shared parameters/features or transfer between
  states.
- **Q010 B:** the rationale for “reduced overfitting” defines overfitting
  (“fits observed cases too narrowly”) rather than explaining whether tile
  coding's shared features regularize the estimate.
- **Q034:** the takeaway says “The qualification prevents the option from being
  applied outside the assumptions stated by the evidence,” which is editorial
  process language, not a memorable explanation of the state-weighted MSVE.
- **Q267 B/C/D:** all three rationales are identical even though the choices are
  “distribution models,” “both,” and “neither”; they do not separately explain
  why each proposition is accepted or rejected.
- **Q276 A/B/C:** all three non-RL learning categories receive the same
  supervised-learning sentence; unsupervised and semi-supervised learning are
  not distinguished.
- **Q254 A/C:** identical Monte Carlo rationales leave C's claim (“cannot handle
  incomplete episodes efficiently”) unexamined.
- **Q296 A/C:** identical constant-function rationales are acceptable as a
  shared defect, but together with the generic explanation they still fail to
  teach what “parameterized” means.

Across the whole artifact, 124 exact duplicate rationale instances affect 73
questions. Reuse is acceptable only for genuinely identical distractors; the
examples above show that the current reuse also collapses distinct
misconceptions.

### CQ3-4 — the current automated gate is red and partly mis-specified

`npm run data:check` fails with direct content errors:

- explanation below its configured depth threshold:
  `Q249, Q251, Q258, Q259, Q286`;
- non-distinct option rationales:
  `Q254, Q267, Q276, Q282, Q296`;
- shallow option rationale:
  `Q268, Q297, Q301`;
- semantic check failure:
  `Q242`;
- every Q001–Q317 QA row fails because
  `independentlyReviewed` is still false.

Some failures identify real defects; others expose validator defects:

- Q249, Q251, Q258, Q259, and Q286 are concise but technically strong. A
  hard 30-word minimum should not overrule semantic quality.
- The Q242 semantic-regression regex incorrectly looks for Expected Sarsa
  language, even though Q242 asks about **tabular TD**. Q242's current teaching
  is correct; the assertion is not.
- The validator does not detect the 56 within-rationale repeated sentences or
  the 54-question exact-explanation reuse described above.

The independent-review flags correctly remain false; they must not be set true
while this audit is failing.

## Required fixes before PASS

1. Rewrite the semantically displaced questions listed in CQ3-1 around the exact
   stem distinction, not merely the broad topic.
2. Remove the duplicated sentence from all 56 rationales in CQ3-2.
3. Give every A–D rationale a distinct mechanism/category-error explanation;
   fix at minimum the exact examples in CQ3-3.
4. Keep the corrected high-risk answer separation unchanged.
5. Replace the Q242 validator assertion with a tabular-TD assertion; make depth
   validation semantic rather than a rigid word count.
6. Add checks for repeated sentences within a field and for exact explanations
   reused across non-duplicate questions.
7. Rebuild, obtain a green `data:check`, then rerun an independent all-317
   editorial audit before marking any QA row reviewed.

## Unresolved questions

- None about canonical scope or the authoritative supplied answers.
- Learner-facing remediation and independent acceptance remain unresolved.

Status: DONE  
Summary: Full 317-row audit completed. Canon/evidence preservation and the named
high-risk corrections pass, but the integrated teaching fails: 54 questions
share exact explanations, 56 rationales repeat a sentence internally, multiple
questions teach only a neighboring broad topic, and the current validator is
red.  
Concerns/Blockers: Do not set `independentlyReviewed` true or deploy this content
as final until CQ3-1 through CQ3-4 are fixed and independently re-audited.
