# Final content quality audit v5

Date: 2026-07-25  
Integrated artifact: `study-app/src/data/generated/question-bank.json`  
QA artifact: `study-app/src/data/generated/content-qa-manifest.json`  
Dataset hash:
`3beb7c1583a8eca22820c9e9da7b5a3bde9b40a0256c575833a32bc4fe410ad5`

## Verdict

**FAIL**

All 30 v4 blocking records were materially remediated, canonical/provenance
integrity remains exact, and the bank is close to acceptance. A new full-bank
read still found ten learner-facing records that prevent a strict PASS:

- Q077 retains four non-distinct, semantically inadequate rationales.
- Q018, Q044, and Q077 contain visible unmatched-quotation editing errors.
- Q135, Q177, Q181, Q183, Q193, Q197, and Q205 retain repeated generated
  “This item tests … supported answer is …” boilerplate.

The final requirement is every Q001–Q317 record being learner-ready, so these
cannot be ignored merely because `data:precheck` passes.

## Full audit method

- Re-read all 317 integrated questions.
- Inspected all 317 explanations, 317 takeaways, and 1,268 A–D rationales.
- Recompared every canonical stem, option, supplied key, verdict, concept,
  evidence tier, caution, depth, and confidence with the immutable source
  records.
- Rechecked all 38 bank-key-only records for a visible bank/unverified
  disclosure.
- Rechecked all incorrect and caveated records, with direct inspection of Q002,
  Q004, Q188, Q224, and every v4 blocker.
- Scanned for exact duplicate explanations and takeaways, repeated substantive
  sentences inside rationales, cross-option long-phrase collapse, boilerplate
  sentence frames, and unmatched smart quotation marks.
- Ran `npm run data:precheck`; did not treat it as editorial proof.

## Objective results

| Check | Result |
|---|---:|
| Q001–Q317 ordered and unique | PASS |
| Canonical stem/option/key mismatches | 0 |
| Verdict/concept/evidence/caution/depth/confidence mismatches | 0 |
| Explanations inspected | 317 |
| Takeaways inspected | 317 |
| Rationales inspected | 1,268 |
| Exact duplicate explanations across questions | 0 |
| Exact duplicate takeaways across questions | 0 |
| Internally repeated substantive rationale sentences | 0 |
| Configured shallow rationales | 0 |
| Bank-only records with visible disclosure | 38/38 |
| `data:precheck` | PASS |
| QA rows still marked independently reviewed | 0/317 |

Standardized provenance warnings in bank-only records are not counted as
teaching boilerplate: those sentences perform a necessary, truthful disclosure.

## V4 regression verification

### All 21 rationale-remediation IDs pass

`Q016, Q021, Q022, Q027, Q033, Q040, Q044, Q048, Q049, Q050, Q055, Q057,
Q058, Q059, Q062, Q067, Q084, Q094, Q098, Q101, Q105`

Each now distinguishes its A–D options using the correct question-specific
mechanism. Examples:

- Q027 now explicitly distinguishes complete-return MC from online TD and
  rejects the model/convergence distractors.
- Q044 now contrasts Q-learning's max target with Sarsa's sampled next action.
- Q059 now labels the max target as Q-learning and the expectation as Expected
  Sarsa.
- Q084 now explains each granularity/generalization direction separately.
- Q094/Q101 now distinguish exploitation value from the visit-count exploration
  bonus.

### Both bank-only disclosure IDs pass

- Q070 explicitly says its technically sound temperature interpretation is an
  unverified question-bank-only association.
- Q103 explicitly gives the same warning while also exposing the corrupted
  symbol.

### All seven v4 boilerplate IDs pass

`Q143, Q153, Q159, Q175, Q179, Q207, Q209`

Their shared opener was removed. Each explanation now begins directly with its
own mechanism.

## High-risk answer separation remains correct

| ID | Result |
|---|---|
| Q002 | PASS — exam C preserved; concept correctly says no listed option states Dyna's sample-efficiency benefit. |
| Q004 | PASS — exam C preserved only as a bank analogy; TD bootstrapping is taught separately. |
| Q188 | PASS — exam A preserved; conceptual grading accepts A and B and distinguishes both MC variants from TD/Q-learning. |
| Q224 | PASS — conceptual grading correctly accepts both MC and TD action-value estimation. |

Q229, Q248, Q253, Q271, and Q286 also retain their correct adjudications.

## Remaining blockers

### CQ5-1 — Q077 rationales still collapse four distinct options

Q077 asks for the difference between Sarsa and Expected Sarsa. Its explanation
is good, but every rationale ends with the same generic sentence:

> “is an on-policy TD control algorithm that uses the next action actually
> sampled.”

That sentence describes Sarsa and is incorrectly reused for Expected Sarsa.
Specifically:

- **Q077A:** should say Sarsa samples the next action; it does not use a maximum.
- **Q077B:** should say Expected Sarsa uses a policy-weighted expectation, not a
  maximum.
- **Q077C:** should say Sarsa samples the **next** state/action value, not the
  previous state's value.
- **Q077D:** should positively explain the policy-weighted next-action
  expectation.

This is a substantive Learn/Test defect, not only style.

### CQ5-2 — three takeaways contain unmatched closing quotation marks

- **Q018:** `Monte Carlo” framing is incidental`
- **Q044:** `Actions not necessarily taken by current policy” should mean`
- **Q077:** `Weighted sum” matches the displayed equation`

These are visible copy-editing errors in learner-facing flashcard content.

### CQ5-3 — seven explanations retain generated editorial boilerplate

The following records still begin with a shared meta sentence rather than the
concept:

- **Q135**
- **Q177**
- **Q181**
- **Q183**
- **Q193**
- **Q197**
- **Q205**

Q135/Q177/Q193 begin:

> “This item tests policy-gradient objective and theorem, and the supported
> answer is …”

Q181/Q183/Q197/Q205 begin:

> “This item tests off-policy Q-learning update, and the supported answer is …”

Their subsequent sentences and rationales are generally correct. The opener is
still repeated answer leakage/editorial scaffolding and violates the explicit
no-boilerplate requirement. Begin directly with the mechanism already present in
the second sentence.

## Required action

1. Rewrite Q077 A–D rationales distinctly.
2. Remove or balance the unmatched quotation marks in Q018, Q044, and Q077.
3. Remove the shared meta opener from Q135, Q177, Q181, Q183, Q193, Q197, and
   Q205.
4. Rebuild and independently audit the new hash.
5. Do not set `independentlyReviewed: true` for the current hash.

## Unresolved questions

- None concerning canonical scope, supplied exam keys, evidence tiers, or the
  conceptual corrections.
- The ten exact learner-facing IDs above remain unresolved.

Status: DONE  
Summary: Re-audited all 317 records and 1,268 rationales. Every v4 blocker was
materially corrected and all authority/high-risk/bank-disclosure checks pass, but
strict editorial acceptance still fails on Q077's collapsed rationales, three
unmatched-quote takeaways, and seven boilerplate explanations.  
Concerns/Blockers: Current hash must remain unreviewed until the ten exact IDs
are corrected and re-audited.
