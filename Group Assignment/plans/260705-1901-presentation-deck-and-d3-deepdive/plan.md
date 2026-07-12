---
title: "Finish presentation-structure.md content, then build D3 deep-dive + D2 summary for a friend"
description: ""
status: completed
priority: P2
branch: "main"
tags: []
blockedBy: []
blocks: []
created: "2026-07-05T19:01:00.000Z"
createdBy: "manual"
source: skill
---

# Finish presentation-structure.md content, then build D3 deep-dive + D2 summary for a friend

## Overview

Two sequential deliverables, both writing/content work (no new experiments, no retraining):

1. **Task A** — finish `docs/presentation-structure.md` to a fully complete, slide-ready state:
   extract the 8 cited figures out of the notebooks' embedded output into real PNG files, add the
   artifact-use index table, add remaining "do not say" guardrails, and do a consistency pass.
2. **Task B** — once A is done, build two documents for a friend who needs to present D3 in depth
   and D2 as background: a study note (deep) and a talking-points cheat sheet (slide-ready).

All source data is already verified against notebook output this session (D2's corrected 84%/86%
numbers, D3's literal regime formulas, D4's Elo demoted to backup-only). No new claims — this is
extraction, indexing, and rephrasing of material that already exists in `docs/presentation-structure.md`
and the four direction notebooks.

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Extract Figures](./phase-01-extract-figures.md) | Completed |
| 2 | [Finish Presentation Spec](./phase-02-finish-presentation-spec.md) | Completed |
| 3 | [D3 Deep-Dive Study Notes](./phase-03-d3-deep-dive-study-notes.md) | Completed |
| 4 | [D2 Summary + Talking Points](./phase-04-d2-summary-and-talking-points.md) | Completed |

## Dependencies

Phase 2 depends on Phase 1 (needs real figure files to reference by final path).
Phase 3/4 depend on Phase 2 (friend material cites the finished spec's numbers/figures, must not
drift from it).

## Unresolved questions
- None currently.
