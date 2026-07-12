# Phase 1: Extract Figures

Status: Completed 2026-07-05.

## Context
`docs/presentation-structure.md` and the friend's script both cite 8 specific figures by cell
location, but they only exist as embedded base64 `image/png` output inside the `.ipynb` JSON —
verified present at these exact cells this session (`ToolSearch`/inline Python check), not yet
pulled out as standalone files.

## Requirements
Extract each cited output image to a real PNG file, named to match the convention already used in
`presentation-material/slide-agent-prompt.md` and the friend's script (`<notebook>_cellN_outM.png`).

| Notebook | Cell | Output filename |
|---|---|---|
| `direction1_selfplay_league.ipynb` | 7 | `direction1_selfplay_league_cell7_out0.png` |
| `direction1_selfplay_league.ipynb` | 8 | `direction1_selfplay_league_cell8_out0.png`, `_out1.png` (two figures in this cell) |
| `direction2_representation.ipynb` | 7 | `direction2_representation_cell7_out0.png` |
| `direction3_reward_shaping.ipynb` | 8 | `direction3_reward_shaping_cell8_out0.png` |
| `direction3_reward_shaping.ipynb` | 11 | `direction3_reward_shaping_cell11_out0.png` |
| `direction4_pomdp_elo.ipynb` | 10 | `direction4_pomdp_elo_cell10_out0.png` |
| `direction4_pomdp_elo.ipynb` | 14 | `direction4_pomdp_elo_cell14_out0.png` |
| `summary.ipynb` | 2 | `summary_cell2_out0.png` |

## Files to modify/create
- Create: `presentation-material/figures/*.png` (new directory, 9 files per table above)
- Read only: the 5 notebooks (repo root copies, already verified as source of truth)

## Implementation steps
1. Small Python script (inline, not committed) using `json`/`base64`: for each notebook, cell
   index, and output index, decode the `image/png` base64 payload and write it to
   `presentation-material/figures/<name>.png`.
2. Spot-check 2-3 extracted PNGs open correctly and visually match what the cell claims (e.g. D2's
   cell7 should show two learning curves, vec8 vs grid256).

## Tests / validation
- File count matches table (9 files).
- Each file's size is non-trivial (>1KB, not a corrupt/empty decode).
- No modification to any notebook — read-only extraction.

## Risks / rollback
- None — purely additive, new files in a new subfolder. Delete `presentation-material/figures/` to
  undo if needed.
