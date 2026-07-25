# Editorial rewrite — Q107–Q212

Date: 2026-07-25

## Result

- Rewrote the 100 CQ-R1-affected records in this slice.
- Preserved all authoritative stems, options, exam keys, conceptual-answer
  structures, verdicts, and evidence status.
- Replaced comparison shells with question-specific teaching rules and 424
  option rationales that classify the actual answer choices.
- Kept bank-only choices visibly unverified while explaining the category each
  option names.
- Manually reworked Q108, Q109, Q110, Q122, Q169, Q188, and Q202.
- Q188 continues to separate the exam key A from the conceptually valid A+B
  interpretation.

## Checks

- Built the combined 317-question artifact with `npm run data:build`.
- The full validator reports no failures for Q107–Q212.
- Scanned this slice for the validator phrases and the CQ-R1 replacement
  phrases, including `matches the accepted`, `different method`, `by
  comparison`, `operational consequence`, `deciding relation`, `supported
  relation`, `leaves unexplained`, `does not yield`, `neighboring concept`,
  `a useful contrast`, `in contrast`, and `under this definition`: zero hits.
- Additional scan for the temporary-generation wording (`asserts`, `another
  mechanism`, `wrong classification`, `requested role`, `mislabels`,
  `misplaced`, `belongs to the part`) also returns zero hits.

## Unresolved questions

- None for this slice.

Status: DONE
Summary: Q107–Q212 now has question-specific explanations, memorable rules, and direct A–D teaching rationales without the failed editorial shells.
Concerns/Blockers: Full-bank acceptance still depends on the independent audit after the other two slices and validator changes are integrated.
