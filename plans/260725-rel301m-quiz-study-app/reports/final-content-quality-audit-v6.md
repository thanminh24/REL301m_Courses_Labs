# Final content quality audit v6

Date: 2026-07-25  
Integrated artifact: `study-app/src/data/generated/question-bank.json`  
QA artifact: `study-app/src/data/generated/content-qa-manifest.json`  
Dataset hash:
`bd1d948673e4b8e66e2fc9511c92c88657b827d07a7721f73c9374495ff5a3d3`

## Verdict

**FAIL — one exact record remains below the all-317 acceptance standard: Q012.**

The v5 blockers and the meta-boilerplate set are fixed. Canonical/provenance
integrity, bank-only disclosure, high-risk answer separation, duplication,
quotation balance, and configured depth checks all pass. However, Q012 still has
two option rationales that do not explain why their options fail to distinguish
Dyna-Q from Q-learning. Because acceptance requires all four rationales for every
question to be learner-ready, the current hash should not be marked independently
reviewed.

## Full independent coverage

- Re-read all Q001–Q317 integrated records.
- Inspected all 317 explanations, all 317 takeaways, and all 1,268 A–D
  rationales.
- Recompared every stem, option, supplied key, verdict, conceptual answer,
  evidence type/caution, depth, and confidence with the immutable source maps.
- Rechecked all 38 bank-key-only records for visible uncertainty/provenance
  disclosure.
- Rechecked every incorrect/caveated item and Q002, Q004, Q188, Q224 directly.
- Rechecked all v5 blocker IDs and the newly changed Q012.
- Scanned for exact duplicate explanations/takeaways, repeated substantive
  rationale sentences, cross-option repeated rationale cores, unmatched smart
  quotes, and meta openers.
- Ran `npm run data:precheck` but did not treat it as semantic acceptance.

## Results

| Check | Result |
|---|---:|
| Canonical IDs | PASS — Q001–Q317, ordered and unique |
| Stem/option/supplied-key mismatches | 0 |
| Verdict/concept/evidence/caution/depth/confidence mismatches | 0 |
| Explanations inspected | 317 |
| Takeaways inspected | 317 |
| Rationales inspected | 1,268 |
| Exact duplicate explanations | 0 |
| Exact duplicate takeaways | 0 |
| Internally repeated substantive rationale sentences | 0 |
| Unmatched smart double quotes | 0 |
| Fields beginning `This item tests` | 0 |
| Bank-only disclosures | PASS — 38/38 |
| `data:precheck` | PASS |
| Independent-review flags still false | 317/317 |

The repeated wording retained in question-bank-only provenance warnings is
appropriate standardized disclosure, not teaching filler.

## V5 regression verification

### Q077 now passes

The four rationales distinctly explain:

- A: Sarsa samples the next action and does not maximize;
- B: Expected Sarsa uses a policy-weighted expectation, not a maximum;
- C: Sarsa uses the next state/action, not the previous state;
- D: the expectation is the probability-weighted sum over next actions.

### Smart-quote defects are fixed

- Q018: balanced, clean takeaway.
- Q044: clean target-versus-behavior takeaway.
- Q077: clean sampled-versus-expected takeaway.

### All prior meta openers are removed

`Q135, Q177, Q181, Q183, Q193, Q197, Q205` now begin directly with their
question-specific mechanisms. The broader 25-record boilerplate remediation also
leaves zero fields beginning with `This item tests`.

## Canonical high-risk verification

| ID | Result |
|---|---|
| Q002 | PASS — exam C preserved; conceptual answer correctly says none of A–D states Dyna's sample-efficiency benefit. |
| Q004 | PASS — exam C visibly remains a bank analogy while TD bootstrapping is taught separately. |
| Q188 | PASS — exam A preserved; conceptual grading accepts both A and B and distinguishes first/every-visit MC from TD/Q-learning. |
| Q224 | PASS — conceptual grading correctly accepts both MC and TD action-value estimation. |

Q229, Q248, Q253, Q271, and Q286 also retain their correct prior
adjudications.

## Remaining blocker: Q012

Q012 asks for the **primary difference between Dyna-Q and Q-learning**. Its
explanation and its A/C rationales are correct: Dyna-Q adds a learned model and
simulated planning updates, while plain Q-learning is model-free. Conceptual
grading also correctly accepts both A and C.

Two distractor rationales remain incomplete:

- **Q012B** currently says only that Q-learning is off-policy TD using a greedy
  next-action value. That statement is true but does not explain why
  “Q-learning updates Q-values online” fails as the primary difference:
  **Dyna-Q also performs online/direct Q updates**, then adds model-generated
  planning updates.
- **Q012D** currently says only that overestimation bias is systematic error
  rather than variance. That category label does not explain why the option is
  false: **adding a planning model does not inherently remove Q-learning's
  max-operator overestimation**, so Dyna-Q is not generally guaranteed to be
  less prone to it.

These rationales are long enough and unique enough for the automated gate, but
they do not answer the option-specific “why not?” question. A learner using Test
review could read them and still not know why B/D are not the distinguishing
property.

## Required action

1. Rewrite Q012B to state that online Q updates occur in both methods and are
   therefore not the distinguishing addition.
2. Rewrite Q012D to state that model planning does not inherently eliminate
   max-target overestimation and provides no general lower-bias guarantee.
3. Rebuild and independently recheck the new hash.
4. Do not set `independentlyReviewed: true` for this hash.

## Unresolved questions

- None about canonical scope, supplied keys, evidence provenance, or high-risk
  conceptual corrections.
- Only Q012B and Q012D remain unresolved.

Status: DONE  
Summary: Full v6 audit of 317 records and 1,268 rationales completed. Every v5
blocker, provenance check, high-risk adjudication, duplication check, quote
check, and meta-boilerplate check passes. Final acceptance still fails solely
because Q012B/Q012D do not explain why their distractors fail to distinguish
Dyna-Q from Q-learning.  
Concerns/Blockers: Keep hash `bd1d948673e4…` unreviewed until Q012B/Q012D are
corrected and independently rechecked.
