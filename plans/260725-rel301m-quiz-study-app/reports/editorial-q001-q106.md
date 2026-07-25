# Final editorial rewrite — Q001–Q106

Date: 2026-07-25  
Owned fragment: `study-app/content/fragments/q001-q106.json`

## Result

Rewrote the full 106-question slice, including all 97 records named by CQ-R1
and additional weak records found during review.

- preserved IDs, canonical A–D options, conceptual kinds, accepted letters,
  display answers, and aliases;
- removed every CQ-R1 comparison shell from the slice;
- removed the replacement “distinct claim” and “accepted here because” shells;
- removed repeated takeaway labels such as “Memory rule,” “Operational cue,”
  and “Connect the definition”;
- retained explicit uncertainty for every bank-key-only record;
- gave corrected questions a conceptual explanation that does not inherit the
  supplied bank letter;
- manually refined Q001, Q002, Q017, Q024, Q045, Q048, Q056, Q078, Q080,
  Q088, Q104, Q105, and Q106;
- explicitly revisited every incorrect record and the duplicate families in this
  slice.

## Before / after

### Q001

Before, the correct rationale merely said the option “expresses the tested
relationship,” while distractors were compared with the accepted string.

After, the explanation separates target and behavior policies, and B positively
states that the target is the learning objective even when another policy supplies
the data. A, C, and D identify the behavior policy, reward function, and
exploration strategy respectively.

### Q002

Before, the takeaway repeated the long freeform answer and comparison wording.

After, it teaches the actual Dyna mechanism: model-generated planning creates
additional updates from each real transition, and none of the supplied choices
states that sample-efficiency benefit.

### Q017

Before, the explanation was essentially the accepted option plus a slide caveat.

After, it explains why demonstrations and historical logs are the natural
off-policy use case: a behavior policy generated the trajectories while a
different target policy is evaluated or improved.

### Q080

Before, a generated label prefaced the supplied answer.

After, the takeaway distinguishes the cited polynomial worst-case result from
exponential growth and from unsupported stronger logarithmic/linear claims.

### Corrected and duplicate records

- Q014 now distinguishes overlapping coarse-coded receptive fields from
  clustering.
- Q032 now teaches online model-free bootstrapping, not a universal compute claim.
- Q045 identifies Bellman recursion and warns that Q045/Q248/Q253 repeat the same
  stem with conflicting bank keys.
- Q048 states why every listed technique appears in RL practice.
- Q056 supplies the missing concept “shaping.”
- Q078 gives the epsilon-soft probability-floor definition.
- Q104 frames underfitting as a feature-capacity limitation, not an inevitable
  property of linear approximation.
- Q105 distinguishes explicit tabular entries from shared approximation
  parameters and records its duplicate relation to Q242.

## Verification

Executed:

```text
node scripts/build-question-bank.mjs
node scripts/validate-question-bank.mjs
```

The validator reports no Q001–Q106 errors. Remaining full-bank diagnostics, when
present, belong to concurrently edited Q107–Q317 slices.

Ran a case-insensitive scan of the owned fragment for all CQ-R1 forms plus the
replacement shells and generated takeaway labels. Result: zero matches.

Confirmed:

- 106 records;
- ordered boundary Q001 through Q106;
- exactly four distinct A–D rationales per record;
- no shallow explanation or rationale failures in this slice;
- bank-only uncertainty still disclosed.

## Unresolved questions

None for Q001–Q106.

Status: DONE

