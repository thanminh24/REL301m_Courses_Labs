# D3 Study Notes + Open Items (pre-assessment review)

## Core mechanics — collision reward regimes

- Manipulated variable: reward for a head-on collision only. Everything else fixed (state/action
  space, food reward, step penalty, opponent, training budget).
- `peaceful`: `0, 0` always — control, zero incentive.
- `default`: `5*abs(sB//(sA-sB))` / `-3*abs(...)` — score gap `sA-sB` in the *denominator*, so
  payout shrinks continuously as the gap widens. Not a switch-off, a decay.
- `aggressive`: `+15/-5` flat, no score-gap term anywhere — stakes stay constant regardless of
  lead size.
- Behavior proxies: `collisions_per_ep`, `mean_dist_to_enemy`, `food_per_ep`, `illegal_per_ep`,
  win rate. Win rate alone can't show style, only outcome.
- Why RandomOpponent shows no effect: hypothesis needs "hunting pays off more than ignoring,"
  which requires an opponent with reactable structure. Random samples i.i.d. actions, no memory
  — hunting and ignoring hit the same odds against it. Effect is not absent, the *test* is broken.

## Core mechanics — potential-based shaping

- Problem: reward is sparse (-1 most steps), slow credit assignment.
- `phi(s) = -min_dist_to_food / grid_size`. Bonus = `gamma*phi(s') - phi(s)` (difference, not
  sum — "did I get closer this step").
- Telescoping proof: summed over an episode, middle terms cancel, left with
  `gamma^T*phi(s_T) - phi(s_0)` — depends only on start/end, same correction added to every
  policy's return, so relative ranking of policies is unchanged (Ng, Harada & Russell 1999).
  This is why oscillating near food can't be farmed for bonus — nets to ~0 over a round trip.
- Eval must strip the bonus (unshaped reward only) — otherwise you're scoring "good at farming
  reward+bonus," not "the learned policy," and can't test the invariance claim cleanly.
- What's actually tested empirically (theorem doesn't guarantee this part): does the shaped
  agent's training curve rise faster, and do final win rates still converge to the same place.

## Numbers to have ready

- vs RandomOpponent (main notebook): saturates — 100% win rate, ~26 food/ep, 0.6-0.9
  collisions/ep, flat across all three regimes.
- vs D1 (trained opponent, `experiments/direction3_reward_shaping_d1opponent.ipynb`):
  collisions/ep climb peaceful (1.18/1.34) -> default (1.36/1.42) -> aggressive (1.40/1.52);
  illegal/ep roughly triples peaceful -> default. This is the result that actually supports the
  collision-regime hypothesis — RandomOpponent hides it.
- Shaping vs D1: win rates close either way (~0.42-0.47), but `curve_tail_mean` is notably lower
  for shaped in both seeds (5.6 vs 15.6 seed0; 16.8 vs 26.4 seed1) — unresolved anomaly, see below.

## Open items to sort out before assessment

1. **vs-D1 collision-regime result is not on any slide/doc** — only exists as a parenthetical in
   `docs/d3-reward-shaping-code-intuition.md`. Decide: mention verbally as backup evidence, or
   leave out. If asked "did you test this with a real opponent," this is the answer.
2. **Shaped `curve_tail_mean` anomaly vs D1** — shaped reaches lower tail reward than unshaped in
   both seeds, contradicts "shaping only speeds up, doesn't change outcome." Have an honest line
   ready ("flagged, within noise at n=2, not resolved") rather than getting caught unprepared.
3. **n=2 seeds** — labs use 20-30. Any single regime ranking is one noisy draw; say this
   proactively if presenting a specific number as if it were settled.
4. **Stale notebook prose**: intro markdown cell in `direction3_reward_shaping.ipynb` still says
   aggressive is "+15/-15"; code and a later cell say "+15/-5". Cosmetic, but fix if time allows
   before demo — someone could read the notebook live.
5. **Own the mechanism narration**: on self-check, the weak spots were consistently stopping at
   the mechanism instead of stating its consequence (e.g. "it's a diff" without "and summing it
   telescopes to X, which means Y"). If asked to explain shaping or DQN instability live, push one
   step further than the first sentence.
