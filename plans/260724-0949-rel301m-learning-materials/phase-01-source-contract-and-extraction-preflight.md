# Phase 01 — Question-Bank Contract and Extraction Preflight

## Context links

- [Parent plan](plan.md)
- [Source inventory](research/source-inventory.md)
- [Manual architecture](research/learning-manual-architecture.md)
- [Canonical slides](../../docs/slides/slides/)
- [Question bank](../../docs/final-exam-revision-question-index.md)

## Overview

- Date: 2026-07-24
- Description: normalize the exam bank, prove the question-first pilot, and lock extraction.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- The 37 `.pptx` decks are structurally readable with installed `python-pptx`.
- Equations/examples frequently live in pictures; text extraction cannot be the only path.
- Two required decks are legacy `.ppt`; no compatible converter is currently installed.
- The bank is mostly L1–L2, shuffled across courses, defect-prone, and duplicate-heavy.
- Question records and depth rules must stabilize before lecture authoring.
- Source files must remain unchanged.

## Requirements

- Treat only 39 canonical decks and Q001–Q317 as content sources.
- Produce one final manual at `docs/rel301m-complete-learning-guide.md`.
- Preserve originals; all extraction writes go to plan research or temporary storage.
- Parse all 317 records without changing ID, stem, options, or supplied answer.
- Normalize editorial concepts/symbols, cluster duplicates, and quarantine C4/OUT separately.
- Adopt the D0–D3 required depth model from the execution decision.
- Complete a mixed 20-question pilot before full mapping or authoring.
- Record a manifest row for every deck before authoring begins.
- Establish stable lecture IDs and question anchors.
- Isolate legacy `.ppt` dependency to questions/claims that need those decks.

## Architecture

```text
Q001–Q317 -> normalize -> cluster -> quarantine -> provisional concepts
                                               |
canonical decks -> slide index/preflight ------+
                                               v
                                  20-question evidence pilot
                                               |
                                               v
                              approved question-first execution
```

Extraction paths:

- `.pptx`: structured parsing with `python-pptx` plus rendered-slide inspection.
- `.ppt`: headless conversion to `.pptx`/PDF, then the same extraction and review path.
- Visuals: rendered pages checked against extracted text; image-heavy slides explicitly noted.

## Related code files

- `docs/slides/slides/*.{ppt,pptx}` — immutable canonical lecture sources.
- `docs/final-exam-revision-question-index.md` — immutable question/audit source.
- `plans/260724-0949-rel301m-learning-materials/research/` — manifests and evidence.
- `docs/rel301m-complete-learning-guide.md` — planned final deliverable.

## Implementation Steps

1. Parse the 317 source entries into structured records; reconcile IDs, choices, and answers.
2. Normalize concepts and corrupted symbols only in editorial fields.
3. Create exact/near-duplicate clusters without deleting any original entry.
4. Mark scope as canonical, unsupported C4, OUT, or corrupt.
5. Freeze a manifest with deck filename, course, lecture ID, format, slide count, extraction
   status, visual-review status, and chapter status.
6. Define lecture anchors: `course-introduction`, `lecture-1-1-*` through
   `lecture-3-12-*`, and `course-review`.
7. Define the question mapping and D0–D3 lecture schemas.
8. Confirm `python-pptx`, 7-Zip, PDF utilities, and Markdown tooling.
9. Resolve legacy conversion when the pilot or mapping identifies a dependency:
   - preferred: approved local LibreOffice/`soffice` installation;
   - acceptable fallback: user-approved trusted conversion outside the repo;
   - never use lossy `strings` output as authoritative content.
10. Build a 20-question pilot spanning usable/review/verify/OUT, duplicates, formula, and
    visual-slide evidence.
11. Verify preservation, evidence-based adjudication, navigation, depth ceiling, and throughput.
12. Set temporary/output paths and create the final manual skeleton with stable anchors.

## Todo list

- [x] All 317 question records normalize and reconcile.
- [x] Duplicate clusters and 43 quarantine candidates recorded.
- [x] 39-row manifest created.
- [x] Text and visual extraction sample verified.
- [x] Question mapping and D0–D3 depth schemas locked.
- [x] Mixed 20-question pilot passes.
- [x] Legacy dependency isolated or converter tested where needed.
- [x] Manual skeleton created without authored content.

## Success Criteria

- Q001–Q317 and every original field reconcile exactly.
- Duplicate/quarantine handling does not inflate canonical demand.
- Every source deck has a manifest row and sample extraction captures visual equations.
- Pilot demonstrates a complete question -> concept -> slide -> verdict -> lesson path.
- Measured pilot throughput replaces the provisional effort estimate.
- Final manual structure supports 39 chapters and 317 stable question anchors.
- No lecture source is modified.

## Risk Assessment

- **High:** defective keys bias the blueprint. Mitigation: preserve keys but adjudicate from slides.
- **High:** shuffled/duplicate items produce false weighting. Mitigation: cluster by concept first.
- **Medium:** legacy conversion unavailable. Mitigation: isolate dependency and request approval
  only if canonical mappings require those decks.
- **High:** equations lost in image-only extraction. Mitigation: rendered-slide comparison.
- **Medium:** temporary artifacts pollute repository. Mitigation: scoped temp/research paths and
  final status check.

## Security Considerations

- Do not execute macros, embedded objects, or external links from Office files.
- Convert headlessly in a temporary directory.
- Do not upload lecture files to third-party services without explicit user approval.
- Preserve source hashes/paths in the manifest for traceability.

## Next steps

Proceed only after the 317-record contract and 20-question question-first pilot pass.
