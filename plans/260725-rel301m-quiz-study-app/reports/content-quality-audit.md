# Content quality re-audit — 317-question generated bank

Date: 2026-07-25  
Artifact: `study-app/src/data/generated/question-bank.json`  
Authority: `question-records.json`, `question-adjudications.json`, `primary-evidence-map.json`, `supplemental-evidence-map.json`

## Final verdict

**FAIL — the remediated bank still does not meet the learner-facing editorial gate.**

The remediation fixed the old literal phrases and eliminated exact answer-only
takeaways, but it replaced them with new mechanical shells. The strengthened
validator reports green because its banned-pattern list does not recognize the new
forms. Some generated shells also produce misleading or irrelevant teaching text.

## Complete re-audit coverage

- Parsed and checked every Q001–Q317 row and every A–D rationale.
- Recompared all 317 source stems, options, supplied answers, verdicts, concepts,
  lecture/book locations, confidence, and depth values against the authoritative
  records.
- Rechecked all 32 incorrect, 98 caveat, and 38 bank-only records.
- Rechecked Q002, Q004, Q188, Q224, Q229 and every duplicate cluster.
- Read the three updated slice-review reports and reran
  `node scripts/validate-question-bank.mjs`.
- Scanned explanations, takeaways, and 1,268 rationales for both the validator's
  banned phrases and replacement shells not covered by the validator.

## Results

| Criterion | Result | Exact evidence |
|---|---|---|
| 317 canonical questions | PASS | IDs are exactly Q001–Q317, ordered and unique |
| Source/adjudication preservation | PASS | 0 mismatches across all compared authority fields |
| Verdict/evidence totals | PASS | 149 correct, 98 caveat, 32 incorrect, 38 bank-only; 225 lecture, 54 book, 38 bank |
| Exam/concept separation | PASS | Q002, Q188, Q224, Q229 and the other corrections remain structurally correct |
| Bank-only uncertainty | PASS | All 38 preserve the unverified-bank warning |
| Exact answer-only takeaways | PASS | 0 after normalized comparison with the supplied answer |
| Formal length/sentence checks | PASS | Validator finds 0 rows below its word/sentence thresholds |
| Genuinely useful explanations | **FAIL** | mechanical or semantically irrelevant filler remains |
| Memorable, question-specific takeaway | **FAIL** | multiple takeaways describe the broad topic instead of the question's tested distinction |
| Option-specific mechanisms/misconceptions | **FAIL** | replacement rationale shells occur across 280 questions |
| Strengthened validator adequacy | **FAIL** | validator passes while Q271 and Q286 contain demonstrably irrelevant teaching copy |

## CQ-R1 — replacement mechanical shells remain in 280 questions

**Exact affected set:** every Q001–Q317 question **except**:

`Q004, Q005, Q035, Q039, Q042, Q043, Q070, Q083, Q103, Q109, Q110, Q122, Q169, Q188, Q202, Q213, Q216, Q218, Q224, Q225, Q229, Q230, Q231, Q234, Q242, Q248, Q250, Q252, Q257, Q263, Q270, Q300, Q304, Q307, Q311, Q313, Q317`

The **280 affected records** contain at least one of these newly repeated forms:

- “That mechanism does not yield [answer].”
- “It therefore answers a neighboring concept rather than [answer].”
- “The deciding relation here is [answer].”
- “In contrast, the supported relation is [answer].”
- “[Option] leaves unexplained the [concept] relationship the question is testing.”
- “A useful contrast is …” copied into both explanation and takeaway.
- “[Option] matches the accepted relationship.”
- “This names a different method, quantity, or condition …”
- “Under this definition, [answer] is the operational consequence.”
- “By comparison, [option].”
- “In this case, [generic memory hook]. However, [the same memory hook].”

Slice counts are 97 in Q001–Q106, 100 in Q107–Q212, and 83 in
Q213–Q317. These are not merely shared terminology: they are repeated editorial
sentence frames that substitute answer comparison for the option's real mechanism.

Examples:

- **Q001 B** says the correct target-policy option “leaves unexplained” the
  target/behavior relationship instead of affirmatively explaining why it is
  correct.
- **Q017** repeats “leaves unexplained the … relationship” in the explanation,
  takeaway, and two rationales.
- **Q108 C** only says the answer “matches the accepted relationship.”
- **Q214 A–D** reduce four unrelated distractors to “It treats the goal as …;
  however, Bellman backup …”.

## CQ-R2 — question-specific teaching is wrong or materially displaced

The following exact records have a takeaway and/or opening explanation that teaches
a different broad concept instead of the distinction asked by the stem:

`Q220, Q235, Q239, Q240, Q242, Q249, Q251, Q258, Q259, Q260, Q262, Q266, Q269, Q271, Q273, Q279, Q286, Q293, Q294, Q303`

Concrete failures:

- **Q220** asks why tabular TD is a special case of linear semi-gradient TD
  (one-hot/individual-entry features), but its takeaway is only the generic
  one-step TD update.
- **Q235** asks what Gaussian-policy exploration relies on (sampling/noise around
  a mean); the takeaway instead contrasts policy gradients with Q-values.
- **Q239** asks about policy-gradient variance reduction; its takeaway says only
  that policy gradients change action probabilities.
- **Q240** asks about local-optimum risk; its takeaway discusses policy versus
  value functions.
- **Q249** asks for the gradient of a linear value approximation (the feature
  vector); its takeaway discusses generalization in general.
- **Q251** asks what `μ(s)` represents (state-visitation weighting/distribution);
  its takeaway discusses shared features.
- **Q258** asks why optimistic initialization is used (encouraging exploration);
  its takeaway discusses feature generalization.
- **Q259** asks the role of policy π in generating MC episodes; its takeaway only
  contrasts complete-return MC with bootstrapping TD.
- **Q260** asks what “semi-gradient” means; its takeaway is only the generic TD
  update.
- **Q262** asks about greedification; its takeaway is merely policy versus value.
- **Q266** asks for the exploration strategy used with Sarsa (epsilon-greedy);
  its takeaway only says Sarsa is on-policy.
- **Q269** asks for the defining property of a distribution model; its takeaway
  mentions models generally without probability distributions.
- **Q271** is the clearest semantic failure: the question asks for
  `p(s'|s,a)`/transition model, but the explanation begins with the definition of
  an **agent**, and its takeaway is “Agent acts, environment responds, reward
  evaluates.”
- **Q273** asks the policy-gradient advantage of continuous-action handling; its
  takeaway describes Q-learning's max target.
- **Q279** asks why MC exploration matters (state-action coverage); its takeaway
  only says MC uses complete returns.
- **Q286** asks what learning rate α does, but the explanation begins with
  behavior-versus-target off-policy learning and the takeaway repeats that unrelated
  distinction.
- **Q293** asks about choosing the number and size of tiles; its takeaway only
  discusses shared-feature generalization.
- **Q294** asks which method is not normally used to learn a Gaussian policy
  (Q-learning); its takeaway never identifies that distinction.
- **Q303** asks which item is not an MDP solution-method family; its takeaway only
  lists MDP components.

These records prove that passing minimum word counts and containing the accepted
answer somewhere is not sufficient evidence of learner quality.

## CQ-R3 — validator has a false-negative gap

`node scripts/validate-question-bank.mjs` prints:

> Validated 317 canonical questions and all content QA gates.

That result is not an acceptance proof. The banned list contains the previous audit
phrases, but not the replacement shells above. The validator also checks sentence
length rather than semantic usefulness, so text such as Q271's agent definition
passes even though it answers a transition-model question.

Required validator changes:

1. Ban or structurally detect the CQ-R1 replacement shells.
2. Reject explanations/rationales that merely append the accepted answer after
   “operational consequence,” “deciding relation,” or “supported relation.”
3. Add question-specific semantic assertions for at least every incorrect,
   caveat, bank-only, duplicate, and high-risk record.
4. Add targeted regression fixtures for Q001, Q017, Q108, Q214, Q220, Q249,
   Q251, Q258, Q260, Q271, Q273, Q286, and Q294.
5. Do not let slice self-review reports count as independent acceptance evidence;
   rerun this independent full-bank audit after regeneration.

## High-risk and duplicate recheck

- **Q002:** conceptual correction remains correct, but several rationales now use
  “neighboring concept / deciding relation / mechanism does not yield” shells.
- **Q004:** correctly remains a visibly unverified bank convention.
- **Q188:** **PASS**. Both A and B are conceptually accepted and all four
  rationales explain first-visit, every-visit, TD, and Q-learning distinctly.
- **Q224:** **PASS**. B and C remain accepted with technically distinct
  rationales.
- **Q229:** **PASS**. C remains a valid-but-non-unique example.
- Duplicate-cluster metadata and authoritative cross-references remain intact.

## Acceptance conditions

1. Remove the CQ-R1 shells from all 280 listed records.
2. Correct the 20 CQ-R2 question-specific teaching mismatches.
3. Make each correct-option rationale explain the positive mechanism, not merely
   say it matches or repeat the answer.
4. Make every distractor rationale identify its actual category error or nearest
   misconception without comparing strings to the accepted answer.
5. Strengthen the validator and perform another independent 317-row audit.

## Unresolved questions

- None about the authoritative questions, supplied exam keys, or adjudications.
- Learner-facing remediation and validator coverage remain unresolved.

Status: DONE  
Summary: Re-audited all 317 rows. Authority preservation and structural gates pass, but editorial acceptance still fails: replacement shells affect 280 questions and at least 20 records contain question-displaced teaching.  
Concerns/Blockers: The current validator is a false-negative gate; it passes Q271/Q286 and the 280-record replacement-template set.
