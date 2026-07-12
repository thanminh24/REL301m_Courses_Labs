# Phase 3: D3 Deep-Dive Study Notes

Status: Completed 2026-07-05.

## Context
The friend needs to understand and be able to defend D3 (reward shaping) independently — not just
read slide bullets. Source material: `direction3_reward_shaping.ipynb` (literal regime formulas,
Ng-et-al shaping term, native win-rate/behavior-stat output — all already verified this session)
and the finished Slide 8/9 content from Phase 2.

## Requirements
Write a standalone explainer covering:
1. **What D3 tests** — collision reward as a design lever, framed in plain language (why would
   this matter at all).
2. **The three regimes, literally** — peaceful `(0,0)`, default's score-gap formula (winner
   `+5*|loser_score // score_gap|`, loser `-3*|...|`), aggressive's fixed `+15/-5` — with a
   worked numeric example for the default formula (pick concrete scores, show the arithmetic).
3. **Part B: potential-based shaping** — Ng, Harada & Russell (1999)'s `F(s,s') = gamma*phi(s') -
   phi(s)`, `phi(s) = -dist(head, nearest_food)/n`, explained as "a compass bonus," plus the
   policy-invariance claim being tested (changes learning speed, not the final policy).
4. **The actual results**, matching Phase 2's corrected Slide 9 content: all three regimes ~100%
   vs Random, collisions/ep in a narrow 0.6-0.8 band across regimes, shaped vs unshaped win rates
   both near 100%.
5. **Anticipated questions** with honest answers, e.g.: "why didn't this show a difference against
   Random," "is the tiny regime gap real or noise," "what would you need to actually tell the
   regimes apart" (answer: a real opponent, per Slide 12's deferred final table).

## Files to create
- `presentation-material/friend-study-notes-d3-deep-dive-d2-summary.md` (also contains the Task B
  D2 summary section, Phase 4)

## Implementation steps
1. Draft the D3 section per the 5 requirements above, in plain conversational language (same
   register as the finished slide bullets, not denser).
2. Cross-check every number against Phase 2's finished Slide 8/9 content and the notebook's own
   cell 6/7/10 output (`direction3_reward_shaping.ipynb`) — no new numbers, only better-explained ones.

## Tests / validation
- Every number in this doc traces to a number already in the finished `presentation-structure.md`
  or the notebook's own output — no invented figures.

## Risks / rollback
- None — new file, no existing content touched.
