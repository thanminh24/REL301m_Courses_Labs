# Friend Study Notes: D3 Deep Dive + D2 Background

Use this as study material before presenting. The slides stay short; this file gives the reasoning behind the D3 and D2 slides.

## D3 Deep Dive: Reward Shaping

### What D3 Tests

D3 asks whether changing the reward for head-on collisions changes how the snake behaves. In plain terms: if hitting the other snake is free, costly, or highly rewarding, does the agent learn a different style?

This matters because reward design is one of the easiest ways to accidentally teach the wrong behavior. A reward that looks reasonable can make an agent chase collisions, avoid interaction, or ignore the opponent if the evaluation setup is too easy.

### Part A: Three Collision Regimes

The notebook trains three versions of the same DQN setup against `RandomOpponent`.

**Peaceful:** collisions are free. The collision payoff is `(0, 0)` regardless of score, so the agent has no special reward reason to seek or avoid collision.

**Default:** this uses the original repository's score-gap rule. The collision winner gets `+5 * abs(loser_score // score_gap)`, and the loser gets `-3 * abs(loser_score // score_gap)`. If scores are tied, the notebook uses the original small mutual penalty.

Worked example: suppose the winner has 10 points and the loser has 6 points. The score gap is 4. The loser score divided by the score gap is `6 // 4 = 1`, so the winner gets `+5` and the loser gets `-3`. If the gap is small, the multiplier can be larger; if the gap is large, the multiplier can be smaller.

**Aggressive:** the winner gets `+15` and the loser gets `-5`. If tied, both get `-1`. This creates a much larger and simpler incentive to win collisions than the default rule usually gives at low scores.

### Part B: Potential-Based Shaping

The second D3 question is about learning speed, not changing the final objective. The notebook uses the Ng, Harada & Russell potential-based shaping idea:

`F(s, s') = gamma * phi(s') - phi(s)`

Here, `phi(s)` is based on the negative distance from the snake head to the nearest food, normalized by board size. In simple words, it is a compass bonus: moving closer to food gives a small training-time nudge.

The key claim being tested is policy invariance. Potential-based shaping should help the agent learn faster, but it should not change what final policy is optimal under the original task. That is why evaluation uses the plain unshaped environment. Shaping is only a training signal.

### Actual D3 Results

All three collision regimes reached 100% win rate vs `RandomOpponent` for both seeds. That means the baseline was easy enough that the win-rate metric could not separate peaceful, default, and aggressive training.

The behavior stats also stayed close. Collisions were in a narrow band: peaceful was 0.62 and 0.72 collisions per episode, default was 0.76 and 0.72, and aggressive was 0.76 and 0.72. Food stayed near 26 per episode across regimes. Illegal moves stayed low: peaceful 0.06 and 0.16, default 0.08 and 0.28, aggressive 0.06 and 0.08.

The shaping comparison was also saturated. Unshaped reached 100% and 98% win rate across the two seeds. Shaped reached 100% and 100%. This is consistent with "near equivalent final policy," but it is not strong enough to prove faster learning unless the curve itself separates clearly.

### How to Explain the Result Honestly

The best one-sentence explanation is:

> D3 changed the incentives, but against RandomOpponent all agents solved the task, so the behavior differences were too small to call one reward regime better.

That is a useful result because it tells us the next evaluation needs a real opponent, more behavior episodes, or a full-scale run. Reward shaping may matter, but this particular course-scale setup did not expose it cleanly.

### Anticipated Questions

**Why did every regime win against RandomOpponent?**

RandomOpponent is a weak baseline. Once a DQN learns basic food-seeking and avoids obvious bad moves, it can win reliably regardless of the collision reward details.

**Is the small gap between regimes real?**

Not enough evidence here. The collision range is only about 0.6-0.8 per episode, with two seeds and course-scale behavior episodes. Treat it as noise unless a larger run repeats the pattern.

**Does aggressive reward make the agent aggressive?**

Not proven here. The aggressive regime did not clearly increase collisions beyond the default regime in this run.

**Did potential-based shaping help?**

The final win rates were both near 100%, so final performance did not separate. To argue learning speed, point to the learning-curve figure and phrase it carefully as curve evidence, not a final-win-rate claim.

**What would actually distinguish the regimes?**

A stronger opponent, more seeds, more evaluation games, and more behavior episodes. The deck's final slide should point toward a deferred full-scale table rather than claiming a winner now.

## D2 Background Summary

D2 compares `vec8`, a fixed 8-dimensional hand-crafted feature vector, against `grid256`, a flattened 4-channel 8x8 grid. Both use the same MLP DQN setup, so this is a representation comparison, not a CNN comparison. In this run, `vec8` reached 100% win rate for both seeds, while `grid256` reached 84% and 86%. The transfer test is the key extra point: `vec8` can run zero-shot at n=12 because its input size stays fixed, while `grid256` cannot transfer directly because its input size changes with board size.

## Unresolved questions

- None currently.
