# Phase 06 — Integrate and Correct the 317-Question Bank

## Context links

- [Parent plan](plan.md)
- [Mapping phase](phase-02-extract-and-audit-lecture-decks.md)
- [Course 1 phase](phase-03-author-course-1-chapters.md)
- [Course 2 phase](phase-04-author-course-2-chapters.md)
- [Course 3 phase](phase-05-author-course-3-and-framing-chapters.md)
- [Question source](../../docs/final-exam-revision-question-index.md)

## Overview

- Date: 2026-07-24
- Description: insert confirmed records once, adjudicate supplied keys, and link both directions.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- All 317 entries have options and supplied answers; 56 already have audit notes.
- 41 entries are corrupt/out-of-scope and must not become teaching truth.
- Question density is uneven; appendix order should preserve original IDs while lecture chapters
  provide topic-based access.
- A supplied answer and a corrected verdict are separate fields.
- The bank is shuffled; sequential ID ranges cannot be treated as course batches.
- Mapping/depth decisions are inputs from Phase 02 and must not be reinvented here.

## Requirements

- Include every ID Q001–Q317 exactly once and in order.
- Preserve original stem, choices, and supplied answer without silent rewriting.
- Add verdict, corrected answer if needed, concise rationale, lecture mapping, and back-link.
- Review all 317 against lecture evidence, not only the 56 existing audit notes.
- Quarantine unusable questions while retaining them for completeness.
- Reuse confirmed primary lecture/slide and optional related-lecture mappings.
- Do not add external-source provenance or unsupported curriculum claims.

## Architecture

Question template:

```markdown
<a id="q001"></a>
### Q001 — primary lecture — verdict

Original stem

- **A.** ...
- **B.** ...
- **C.** ...
- **D.** ...

**Supplied answer:** ...
**Lecture-grounded verdict:** correct | caveat | incorrect | unusable
**Correct answer:** ...  <!-- only when correction is required -->
**Why:** ...
**Primary lecture:** [Lecture link]
**Related concept:** ...
**Quality note:** ...   <!-- when needed -->
```

## Related code files

- `docs/final-exam-revision-question-index.md` — audited source.
- `docs/rel301m-complete-learning-guide.md` — destination.
- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/*.md` — evidence.

## Implementation Steps

1. Load the reconciled records, duplicate clusters, mappings, and evidence from Phases 01–02.
2. Insert all entries once in original ID order without changing source fields.
3. Finalize each supplied answer against its mapped chapter and slide evidence.
4. Apply four verdicts consistently:
   - `correct`;
   - `acceptable-with-caveat`;
   - `incorrect`;
   - `unusable/out-of-scope`.
5. Write concise explanations that teach the concept and expose weak distractors.
6. Preserve/refine the 56 audit warnings and check remaining entries for ambiguity.
7. Add question links to each lecture chapter and back-links from questions.
8. For review/verify items, rule out plausible distractors or declare no unique answer.
9. Propagate consistent explanations/verdicts across duplicate clusters.
10. Add topic/lecture question index and quality-status counts.
11. Verify C4/OUT questions against the local source boundary; retain but do not invent lectures.
12. Run completeness checks for IDs, choices, supplied answers, verdicts, explanations, mappings,
    and anchors.

## Todo list

- [x] All 140 usable entries adjudicated and inserted.
- [x] All 89 review entries adjudicated and inserted.
- [x] All 47 verify entries evidence-checked and inserted.
- [x] All 41 discard plus 2 C4 entries quarantined and inserted.
- [x] All 274 C1–C3 mappings reconciled through the final evidence overlay.
- [x] Existing 56 audit notes reconciled.
- [x] All 317 question entries inserted once.
- [x] Forward and back links validated.

## Success Criteria

- Sequential set is exactly Q001–Q317 with no missing/duplicate IDs.
- Every entry has four choices, supplied answer, verdict, explanation, and mapping/status.
- Corrections cite or link to lecture-grounded explanations.
- Every canonical item links to a prior answer-enabling passage and slide evidence.
- Original and corrected content are visually distinct.
- Counts by course and verdict reconcile with the appendix/index.
- Unusable questions cannot be mistaken for valid course facts.

## Risk Assessment

- **High:** accidental mutation of original wording. Mitigation: structured extraction and
  original-field comparison.
- **High:** incorrect correction from generic RL knowledge. Mitigation: lecture evidence is the
  authority; uncertainty remains explicit.
- **Medium:** duplicate/near-duplicate questions cause inconsistent verdicts. Mitigation:
  duplicate-group comparison pass.
- **Medium:** 317-entry appendix becomes hard to navigate. Mitigation: stable anchors and indices.

## Security Considerations

- Do not restore attachment paths or private metadata into the final manual.
- Do not browse or upload questions; all review stays local.

## Next steps

Phase 07 turns the complete content into a practical study system and performs final QA.
