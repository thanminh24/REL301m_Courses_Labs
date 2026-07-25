# Phase 07 — Learning System, Cross-check, and Release

## Context links

- [Parent plan](plan.md)
- [Manual architecture](research/learning-manual-architecture.md)
- [Course 1 phase](phase-03-author-course-1-chapters.md)
- [Course 2 phase](phase-04-author-course-2-chapters.md)
- [Course 3 phase](phase-05-author-course-3-and-framing-chapters.md)
- [Question phase](phase-06-integrate-and-correct-question-bank.md)

## Overview

- Date: 2026-07-24
- Description: add learning routes/cheat sheets, validate the entire manual, and release.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- A large bank-centered manual needs task-oriented navigation, not a target line count.
- Learning support should promote explanation and recall, not code work or answer memorization.
- Final validation must prove deck, slide, lecture, question, mapping, and link completeness.
- Large-file coherence requires cross-course terminology and notation review.

## Requirements

- Add whole-course mental model, glossary, cheat sheets, and common-confusion guide.
- Provide one primary loop plus full-course, exam-refresh, and weak-topic navigation views.
- Keep learning activity conceptual and question-based; no coding path.
- Validate all structural and content contracts.
- Link existing revision artifacts to the new canonical manual without deleting them.
- State unresolved source uncertainty honestly.

## Architecture

Learning flow:

```text
choose route
  -> preview mental model
  -> learn one lecture
  -> explain from memory
  -> answer mapped questions
  -> follow misses back to lecture
  -> spaced recheck
  -> course checkpoint
  -> cross-course review
```

Release artifacts:

- `docs/rel301m-complete-learning-guide.md` — canonical learning manual.
- `docs/final-exam-revision-question-index.md` — preserved audit source, links to manual.
- `docs/final-exam-active-recall-workbook.md` — optional legacy supplement, clearly secondary.

## Related code files

- `docs/rel301m-complete-learning-guide.md`
- `docs/final-exam-revision-question-index.md`
- `docs/final-exam-active-recall-workbook.md`
- `README.md`

## Implementation Steps

1. Write the primary loop: learn -> explain without options -> answer -> repair -> repeat later.
2. Add exam-demand dashboard and whole-course prerequisite map.
3. Consolidate symbol glossary and formula interpretation sheet.
4. Add the cross-course comparison sheets defined in research.
5. Add common-confusion and defective-question warning sections.
6. Add free-recall-before-options prompts and answer disclosure pattern.
7. Generate full table of contents and lecture/question navigation indices.
8. Run automated structural checks:
   - 39 deck manifest entries;
   - actual total slide coverage;
   - 39 framing/lecture chapters;
   - exactly 317 sequential IDs, 274 canonical mappings, and 43 quarantines;
   - four choices and supplied answer per question;
   - verdict/explanation/evidence per canonical question and explicit quarantine otherwise;
   - D0–D3 demand/risk rationale per chapter;
   - no duplicate/missing anchors;
   - all internal links resolve;
   - no TODO/TBD/placeholder text.
9. Run manual content checks by course/depth:
    - chapter satisfies its assigned D0–D3 contract;
    - visual equations/examples agree with source;
    - cheat sheet agrees with chapter;
    - question correction agrees with lecture evidence.
10. Review terminology and notation across the entire file.
11. Verify the final manual remains readable in ordinary Markdown renderers.
12. Cross-link README and existing revision artifacts to the canonical manual.
13. Record final coverage counts and unresolved-source notes at the end of the manual.
14. Inspect Git diff/status; confirm unrelated deletions and user changes remain untouched.

## Todo list

- [x] Primary learning loop and three navigation views complete.
- [x] Whole-course mental model and glossary complete.
- [x] Course and cross-course cheat sheets complete.
- [x] Common-confusion guide complete.
- [x] Navigation/anchors complete.
- [x] Automated structural validation passes.
- [x] Manual course-by-course review passes.
- [x] Existing docs cross-linked.
- [x] Unrelated user work remains untouched.
- [x] Final coverage report included.

## Success Criteria

- Learner can navigate from topic -> lecture -> questions -> explanation and back.
- Manual teaches all lecture concepts without requiring code or outside sources.
- All 39 decks and every slide are represented in coverage evidence.
- Q001–Q317 are complete/searchable; 274 canonical mappings and 43 quarantines reconcile.
- Every mapped question points to a prior answer-enabling passage and slide evidence.
- Cheat sheets summarize but do not contradict detailed chapters.
- No broken links, missing anchors, duplicate IDs, or placeholders remain.
- Final manual is clearly marked canonical and existing artifacts remain recoverable.

## Risk Assessment

- **High:** single document becomes unwieldy. Mitigation: strict TOC, stable anchors, compact
  repeated schema, questions stored once.
- **High:** summaries contradict detailed chapters. Mitigation: generate cheat sheets after
  chapters and run reverse consistency review.
- **Medium:** learning routes become generic filler. Mitigation: tie each route to concrete
  manual sections and mapped question sets.
- **Medium:** unrelated dirty-worktree deletions enter the change set. Mitigation: explicit
  path-scoped review and no broad cleanup/commit.

## Security Considerations

- Remove private attachment paths and machine-specific metadata from the final manual.
- Keep all source processing local.
- Do not include executable content, macros, or remote embeds.

## Next steps

Present the completed manual and coverage report. Optional future work may split the same
content into smaller files, but the required deliverable remains the single canonical Markdown
manual.
