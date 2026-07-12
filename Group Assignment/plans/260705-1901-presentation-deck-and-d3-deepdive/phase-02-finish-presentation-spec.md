# Phase 2: Finish Presentation Spec

Status: Completed 2026-07-05.

## Context
`docs/presentation-structure.md` is content-complete and fact-corrected (D2's 84%/86%, D1's
head-to-head dropped from the main claim, D4's Elo demoted to backup) but is still missing the
artifact-index table the friend's script included, and only slides 1/5/11 currently carry
"do not say" guardrails — the rest of the slides that risk overclaiming don't have one yet.

## Requirements
1. Add an "Artifact use list" section (mirrors the friend's script's table) mapping each Phase-1
   figure file to its slide and main-vs-backup status.
2. Add a "do not say" guardrail line to Slide 9 (D3 Result): don't claim any regime is "better" —
   the collision/food/illegal stats are within noise of each other at this scale.
3. Consistency pass: re-read the whole file end to end, confirm every figure reference now points
   at a real Phase-1 file path, confirm slide numbering/titles are still internally consistent
   after the D1/D2/D4 edits made earlier this session.

## Files to modify
- `docs/presentation-structure.md` (edit)
- `presentation-material/presentation-structure.md` (re-sync copy after edits, same as done earlier this session)

## Implementation steps
1. Insert artifact-use table near the end (before "Unresolved questions").
2. Add the D3 guardrail line to Slide 9.
3. Update each slide's "Figure:" line to reference the actual Phase-1 file path where one now exists.
4. Full read-through; fix any drift.
5. `cp docs/presentation-structure.md presentation-material/presentation-structure.md`.

## Tests / validation
- Every "Figure:" line in slides 4-11 either points at a real file in `presentation-material/figures/`
  or is explicitly marked as a diagram to be drawn fresh (no dangling references).
- Artifact-use table row count matches Phase 1's 9 files.

## Risks / rollback
- Low risk, text-only edit to an existing doc. `git diff` before/after if a revert is needed
  (file is tracked once committed; currently untracked new doc, so no git safety net until first commit).
