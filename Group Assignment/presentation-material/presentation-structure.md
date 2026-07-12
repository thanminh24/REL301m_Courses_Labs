# Vasuki RL Presentation Structure

Slide-ready deck spec for the four Vasuki reinforcement-learning directions. Keep slide wording simple, use figures as visual evidence, and avoid showing code on slides.

## Slide 1: Problem Framing

**Title:** Self-Play, Representation, Rewards, and Observability in Competitive DQN: A Vasuki Case Study

**Main point:** Competitive two-agent RL is noisy — a training run's outcome depends on the opponent it faces, not on the agent alone. This deck tests four separate design choices inside one shared environment to see which differences actually show up.

**On-slide bullets:**
- Vasuki — named after the serpent king of Hindu mythology, a fitting name for a two-snake environment
- Two snakes race for food on a grid; a head-on collision ends the episode
- Four research directions, each isolating one design choice: self-play structure, state representation, reward shaping, and observability
- Results are directional at this scale, not final claims

**Figure:** `presentation-material/figures/slide01_problem_framing_frame.png` — a real frame (frame
25/100) from `match_demo.avi`, showing both trained agents mid-match with live score/state/head
annotations. A real screenshot, not a schematic.

**Speaker notes:** Open by naming the environment and answering "what's Vasuki?" in one breath —
serpent king from Hindu mythology, two snakes, name fits. Then frame the core problem: outcomes in
competitive RL depend on the opponent, which is exactly why the next two slides establish one
shared environment and one shared baseline before any direction gets its own result.

**Do not say:** Do not claim these are production-scale or statistically final results.

## Slide 2: Environment and Shared Setup

**Title:** One Environment, One Shared Training Recipe

**Main point:** Every direction uses the identical environment, reward function, and training recipe — only one variable changes at a time, so differences come from that variable, not from a different setup.

**On-slide bullets:**
- Grid: 8x8; each snake picks turn left, turn right, or forward every step
- Rewards: food `+4`, move `-1`, illegal move `-2`; episodes run 100 steps
- Algorithm: DQN (Stable-Baselines3), `gamma = 0.95`, 100,000 timesteps, 2 seeds, 100 evaluation games
- Four state encodings compared across directions: `vec8`, `vec12`, `grid256`, `stack4`

**Figure:** build directly in the slide tool — a simple 3-box pipeline (Environment → Training →
Evaluation) with the bullet details above as box captions. The auto-generated matplotlib version
was tried and dropped as unusable for the deck; native slide shapes/tables will look better.

**Speaker notes:** Emphasize the shared recipe before going direction by direction — this is what
lets you say later that a result comes from the design choice being tested, not from a different
training budget or a different reward function underneath it.

**Do not say:** Do not imply different directions used different training budgets or hyperparameters.

## Slide 3: Baseline

**Title:** Baseline — Every Direction vs RandomOpponent

**Main point:** `RandomOpponent` is the one shared opponent every direction is measured against
first — a real match against it shows how lopsided that comparison actually is.

**On-slide bullets:**
- `RandomOpponent` picks a legal move uniformly at random and never learns
- In a real recorded match, a trained agent finished at score 19 while Random fell to -72 —
  Random racks up penalties from illegal moves and aimless wandering, not just losses
- Nearly every direction/variant reaches 100% win rate against this baseline (full table below);
  `grid256` (D2) is the one exception at 84%/86%

**Figure:** `presentation-material/figures/slide03_baseline_frame.png` — a real frame (frame 70/100)
from a trained agent vs RandomOpponent match, showing the mid-match score gap (19 vs -72) live on
screen. Full clip: `presentation-material/match_demo_vs_random.avi`.

**Table:** dropped from the slide — the frame carries the point. Exact per-direction win rates
(all ~100% except `grid256` at 84%/86%) live in this spec doc only, not on the slide itself.

**Speaker notes:** Lead with the match frame — a 19-vs-(-72) score gap communicates "this baseline
is weak" far faster than a wall of 100% rows. Treat the win rate as a sanity check, not a finding —
nearly everything saturates against Random, which is exactly why D3 and D4's later slides needed
behavior stats and Elo instead of win rate alone to say anything more. `grid256` is the one place
this baseline alone already shows a real gap — mention it verbally if it comes up, no table needed.

**Do not say:** Do not rank methods only from this saturated win rate; do not imply RandomOpponent
is a strong test.

## Slide 4: D1 Method - Self-Play League

**Title:** D1 Method: Single Snapshot vs League Self-Play

**Main point:** Direction 1 asks whether training against a small opponent pool is better than training against one frozen self-play snapshot.

**On-slide bullets:**
- Question: does an opponent pool beat single-snapshot fictitious self-play?
- **Why this matters:** in self-play, the training opponent is always some version of the agent
  itself. If it only ever faces its own most recent self, it can fall into a loop — getting good at
  beating whatever it just was, forgetting how to handle older strategies, drifting in circles
  instead of steadily improving. This is the classic "chasing your own tail" problem in self-play
  (part of why systems like AlphaStar keep a pool of past opponents instead of just one). League
  self-play is the standard fix: train against a mix of past selves, so the agent can't forget them.
- **How single works:** train for 10,000 steps against the current opponent, then save the policy
  to disk and reload it as a frozen snapshot — save-and-reload specifically so the opponent is a
  truly fixed copy, not a live reference that keeps changing underneath it. That one snapshot fully
  replaces the previous opponent. Repeat for 10 refresh cycles (100,000 steps total).
- **How league works:** same 10,000-step refresh cycle, but each new snapshot is added to a FIFO
  list capped at 10 entries, and the opponent for the *next* chunk of training is sampled uniformly
  at random from whatever's currently in that pool — so training faces a mix of past selves, not
  just the newest one. **Verified detail worth knowing:** 100,000 steps / 10,000-step refresh = 10
  cycles exactly — matching the pool's cap of 10 — so the FIFO eviction never actually triggers at
  this scale. League ends up sampling from *every* snapshot made during training, not a sliding
  recent window; the same is true at the full-scale settings in the config comments (20 cycles,
  cap 25). Worth knowing before calling it a "recent-snapshot pool" out loud.
- Evaluation runs three separate checks on the final trained agents: win rate vs RandomOpponent, a
  direct league-vs-single head-to-head match, and a round-robin among snapshots saved *along* one
  training run's timeline, looking specifically for non-transitive cycling (A beats B, B beats C,
  C beats A) — the concrete symptom the "chasing your own tail" worry predicts.

**Figure:** `presentation-material/figures/direction1_selfplay_league_cell7_out0.png`

**Speaker notes:** The key method difference is opponent diversity. The single version can overfit to one opponent; the league version exposes the learner to a moving set of recent policies.

**Do not say:** Do not say league is proven better from this run alone; head-to-head and cycle checks are still course-scale.

## Slide 5: D1 Result - Self-Play Pattern

**Title:** D1 Result: No Cycling Found, League vs Single Still Unclear

**Main point:** Both variants solve RandomOpponent, and the round-robin check specifically looked for non-transitive cycling between snapshots and found none in this run.

**On-slide bullets:**
- Learning curves compare single and league training — both climb from steep early penalties to a
  stable positive reward, single and league tracking each other closely rather than one clearly
  outlearning the other
- Both variants reach 100% vs RandomOpponent — expected, since that's the easy baseline, not the
  interesting comparison here
- Round-robin heatmaps test the actual worry from Slide 4: does training against only the newest
  self cause the policy to cycle back on itself? This run found **zero cycles** for both single
  and league (cycles=0 on both heatmaps)
- A cycle would mean snapshot A beats B, B beats C, and C beats A — a rock-paper-scissors pattern
  showing the policy space has no consistent ordering. Finding none here means, at least at this
  scale, snapshots line up in a roughly consistent improving order instead
- **What this means:** the specific failure mode league was designed to prevent didn't show up
  even for single-snapshot training — so this run can't yet show league's benefit, because there
  was no cycling problem to fix in the first place at this budget

**Figure:** Main: `presentation-material/figures/direction1_selfplay_league_cell8_out0.png`; backup: `presentation-material/figures/direction1_selfplay_league_cell8_out1.png`

**Speaker notes:** Say plainly that this run found zero cycles for both single and league — the check was run, and it came back clean, not skipped or inconclusive. That's still useful to report: it means at this scale, snapshots along a training run don't show rock-paper-scissors behavior, at least not one this test could catch.

**Do not say:** Do not imply cycling was found — this run's cycle count was zero on both heatmaps. Also do not report a league-vs-single headline unless you also mention variance and course-scale limits.

## Slide 6: D2 Method - Representation

**Title:** D2 Method: Hand-Crafted Vector vs Full Grid

**Main point:** Direction 2 asks whether a compact feature vector or a flattened full-grid observation is the better DQN input.

**On-slide bullets:**
- Question: which observation representation learns faster and transfers better?
- **Why this matters:** how you represent the state to a neural net changes what's easy for it to
  learn, even when the underlying task is identical. A hand-crafted vector like `vec8` already does
  the "noticing" work for the network — it hands over exactly the two numbers that matter (where's
  the food, where's the enemy) instead of making the network discover that from raw cells itself.
  The tradeoff is generality: `vec8` only works because a person decided in advance which features
  matter; `grid256` in principle lets the network find more complex spatial patterns on its own, at
  the cost of needing more capacity and data to get there. This direction tests that speed-vs-
  generality tradeoff directly, plus a second, easy-to-miss cost: hand-crafted features are usually
  built for one board size, so whether they can cheaply transfer to a bigger board is itself a
  meaningful question, not a given.
- **How `vec8` works:** 8 numbers — the food's relative position (dx, dy) and the enemy's relative
  position (dx, dy), each scaled by board size and clipped to [-1, 1], plus a 4-value one-hot for
  the agent's own facing direction
- **How `grid256` works:** the whole board flattened into 256 numbers — a 4-channel one-hot grid at
  n=8, so 4 x 8 x 8 = 256
- Both use the same MLP-based DQN, not a CNN — the grid is flattened specifically because an 8x8
  input is too small for the standard SB3 CNN feature extractor; the *only* thing that changes
  between the two runs is which encoder function turns the raw environment state into numbers
- Transfer test: take the `vec8` agent trained at n=8 and drop it onto a 12x12 board with zero
  retraining; `grid256` can't be given the same test because its input size is tied to board size
  (4*n*n numbers) — a structural, not incidental, difference between the two representations

**Figure:** `presentation-material/figures/direction2_representation_cell7_out0.png`

**Speaker notes:** This is a representation comparison, not an MLP-vs-CNN comparison. The grid is flattened because the 8x8 input is too small for the standard SB3 CNN feature extractor.

**Do not say:** Do not call grid256 a CNN result.

## Slide 7: D2 Result - Compact Features Win Here

**Title:** D2 Result: vec8 Learns Cleanly and Transfers

**Main point:** At this scale, vec8 is both easier to train and structurally able to transfer across board size.

**On-slide bullets:**
- `vec8` reached 100% win rate vs RandomOpponent for both seeds
- `grid256` reached 84% and 86% win rates at n=8 — the one place in this whole deck where a trained
  agent doesn't fully solve the easiest possible opponent
- `vec8` transferred zero-shot to n=12 with 100% win rate for both seeds
- `grid256` cannot do the same zero-shot test because its input size changes with n
- **What this means:** the speed-vs-generality tradeoff from Slide 6 resolved in favor of speed at
  this budget — pre-digesting the state into the right two distances got the agent to a working
  policy faster than making it discover those distances from a flattened board. Whether `grid256`
  would eventually close the gap with more steps or a CNN-style architecture is untested here, not
  ruled out
- Takeaway: compact features were the stronger course-scale representation, and their fixed input
  size is a structural transfer advantage `grid256` cannot replicate without retraining

**Figure:** `presentation-material/figures/direction2_representation_cell7_out0.png`

**Speaker notes:** The clean point is not only that vec8 scores higher here. It is also that vec8 has a fixed input shape, which makes the transfer test possible.

**Do not say:** Do not claim full-grid observations are generally worse; this run used a flattened grid with a small MLP and course-scale training.

## Slide 8: D3 Method - Reward Shaping

**Title:** D3 Method: Collision Rewards and Compass Bonus

**Main point:** Direction 3 tests whether reward design changes behavior, and whether potential-based shaping speeds learning without changing the final policy.

**On-slide bullets:**
- Question A: does the reward for a head-on collision change how the agent plays?
- **Why this matters:** reward design is one of the most direct levers on emergent behavior in RL.
  If colliding is free, there's no incentive either way; if losing a collision is very costly and
  winning one very rewarding, the agent should in principle learn to actively hunt the enemy when
  ahead (bully) or actively flee when behind — a pursuit/avoidance style layered on top of plain
  food-seeking. This tests whether collision-reward size alone is enough to produce that style.
- Peaceful: a collision gives no reward and no penalty to either snake, regardless of score — the
  "collisions are a non-event" control condition
- Default: the original project's rule — the collision winner is rewarded and the loser penalized,
  and the size of both scales with how far ahead the winner already was (a bigger score gap means a
  smaller payout; a close game means a bigger one) — collision stakes shrink once the game is
  already decided
- Aggressive: a fixed, much larger reward for winning a collision (and penalty for losing one), no
  matter the score gap — a winner ahead by only a little still gets the same full fixed bonus that
  default would only pay out when the game is close, and far more than default pays at a wide gap —
  collision stakes stay high even in a game that's already decided
- Question B: separately, does a small bonus for moving closer to food, given only during training,
  speed up learning without changing what the agent ultimately learns to do? **Why this specific
  form:** training can be slow because useful reward is sparse — most steps just cost -1 with no
  feedback on whether the agent is heading the right way. A dense per-step "closer to food = small
  bonus" signal should speed learning up, and the potential-based form (Ng, Harada & Russell, 1999)
  is used specifically because their proof guarantees this exact structure cannot change what the
  optimal policy is — it can only change how fast the agent gets there, not where it ends up

**Figure:** `presentation-material/figures/direction3_reward_shaping_cell8_out0.png`

**Speaker notes:** Keep the regime explanation plain. Peaceful removes collision stakes, default uses the original score-gap rule, and aggressive makes winning a collision much more valuable. The compass bonus is potential-based shaping: it nudges learning toward food without changing the evaluation metric.

**Do not say:** Do not show formulas or code on the slide; explain the reward regimes in words.

## Slide 9: D3 Result - Reward Changes Did Not Separate Clearly

**Title:** D3 Result: RandomOpponent Was Too Easy to Separate Regimes

**Main point:** All D3 agents learned to beat RandomOpponent, and the behavior stats were too close to declare one collision regime better.

**On-slide bullets:**
- Peaceful, default, and aggressive all reached 100% win rate vs RandomOpponent — expected, and not
  the interesting comparison; the behavior stats are
- Collisions stayed in a narrow 0.6-0.8 per-episode band across all three regimes
- Food collection stayed near 26 food per episode across all three regimes
- Illegal moves stayed low across regimes
- Shaped reached 100% and 100%; unshaped reached 100% and 98%
- **What this means:** Question A's hypothesis — bigger collision stakes produce a hunting/fleeing
  style — didn't show up here. Likely reason: `RandomOpponent` wanders without any threat behavior,
  so there's nothing worth hunting or fleeing from; the collision-reward incentive has no
  exploitable structure to act on against this particular opponent. Question B's near-identical
  final win rates are actually consistent with the theory being tested — potential-based shaping is
  supposed to leave the final policy unchanged, so this is what a successful policy-invariance check
  looks like, not a null result

**Figure:** Main: `presentation-material/figures/direction3_reward_shaping_cell8_out0.png`; backup: `presentation-material/figures/direction3_reward_shaping_cell11_out0.png`

**Speaker notes:** The honest result is saturation. The reward regimes did not separate enough against RandomOpponent. A stronger opponent or more behavior episodes is needed before claiming that one regime truly changes style.

**Do not say:** Do not claim any regime is better; collision, food, and illegal-move stats are within noise at this scale.

## Slide 10: D4 Method - Observability and Elo

**Title:** D4 Method: Missing Heading, Extra Heading, or History

**Main point:** Direction 4 asks whether the missing enemy head direction is a bottleneck, then builds a small Elo backup comparison.

**On-slide bullets:**
- Question A: does the agent lose anything by not knowing which way the enemy is facing?
- **Why this matters:** `vec8` makes this environment partially observable — the agent knows where
  the enemy is right now, but not which way it's about to move next. This is a textbook POMDP
  (partially observable Markov decision process) situation: if the enemy's heading is actually
  informative about its next move, hiding it should hurt an agent that needs to predict, avoid, or
  intercept the enemy, and giving it back should help
- `vec8`: no heading information at all — the enemy's relative position, nothing about which way
  it's facing
- `vec12`: the same numbers as `vec8`, plus a 4-value one-hot for the enemy's facing direction —
  the direct, manual fix for the missing information
- `stack4`: keeps `vec8` as-is, but gives the agent its last four observations stacked together
  instead (via SB3's `VecFrameStack`), so it can infer motion from recent history rather than being
  told directly — a more general fix, since it doesn't require knowing in advance that "heading" is
  the specific missing variable; it should recover whatever hidden state (heading, momentum, etc.)
  is inferable from recent frames. One honest caveat — the evaluation adapter's frame buffer isn't
  reset between separate matches, so the first few frames of a game can carry stale context from
  the previous one, judged acceptable at this scale
- Question B: **why Elo, not just win rate:** win rate against one weak, fixed opponent can't
  measure relative skill precisely once several agents all saturate near 100% against it. Elo,
  computed from round-robin play among the trained agents themselves (not against Random), gives a
  shared skill scale that can in principle separate agents even when they'd all crush Random
  equally. Mechanism: every saved agent from all four directions, plus Random, plays every other
  agent 50 times; each agent's rating moves up or down by K=32 times the gap between its actual
  score and what its pre-match rating predicted (a logistic function of the two agents' rating
  difference) — beating a much stronger agent moves the rating a lot, beating a much weaker one
  barely moves it. Ratings start at base 1000, with bootstrap confidence intervals over the results

**Figure:** `presentation-material/figures/direction4_pomdp_elo_cell10_out0.png`

**Speaker notes:** The observability variants test three ways to handle missing information: ignore it, reveal it, or infer it from recent history.

**Do not say:** Do not present the stack4 adapter as perfect; the notebook notes a buffer-reset caveat for course-scale evaluation.

## Slide 11: D4 Result - Observability Also Saturated

**Title:** D4 Result: All Variants Beat RandomOpponent

**Main point:** vec8, vec12, and stack4 all reached 100% vs RandomOpponent, so this run does not prove the missing heading is a bottleneck.

**On-slide bullets:**
- `vec8` reached 100% win rate for both seeds
- `vec12` reached 100% win rate for both seeds
- `stack4` reached 100% win rate for both seeds
- Elo ranks available agents (all four directions' saved agents + Random); D3's best was skipped
  when its artifact was missing from this run
- **What this means:** the POMDP hypothesis from Slide 10 — that hiding the enemy's heading hurts
  performance — couldn't be tested by win rate here, for the same reason as D3: `RandomOpponent`'s
  heading doesn't predict anything, since it moves randomly, so there's no signal for `vec12` or
  `stack4` to exploit that `vec8` can't already get from position alone. The Elo backup ranks all
  trained agents well above Random, but doesn't cleanly separate `vec8`/`vec12`/`stack4` from each
  other either — a predictable, non-random opponent would be needed to actually test the hypothesis
- Takeaway: the baseline was too weak to expose observability differences, by construction — this
  is the same "weak baseline" limitation that runs through D1, D3, and D4

**Figure:** Main: `presentation-material/figures/direction4_pomdp_elo_cell10_out0.png`; backup: `presentation-material/figures/direction4_pomdp_elo_cell14_out0.png`

**Speaker notes:** This is another saturation result. The important wording is that we did not find evidence of a bottleneck here, not that the bottleneck cannot exist.

**Do not say:** Do not use the Elo chart as the main claim; it uses a small round robin and one seed for some agents.

## Slide 12: Cross-Direction Takeaways

**Title:** What We Learned and What Comes Next

**Main point:** The strongest clear finding is representation transfer; the other directions need stronger evaluation to separate methods.

**On-slide bullets:**
- D1: no non-transitive cycling found in this run; league vs single still unresolved — the failure
  mode league was built to prevent didn't occur even for single, so there was nothing for league to
  visibly fix yet
- D2: `vec8` beat `grid256` here and transfers to n=12 — the one hypothesis that resolved cleanly,
  because the speed-vs-generality tradeoff it tests doesn't need a strong opponent to show up
- D3: reward regimes saturated against RandomOpponent — the pursuit/avoidance hypothesis needs an
  opponent worth pursuing or avoiding, and Random isn't one
- D4: observability variants also saturated against RandomOpponent — the same issue: a random
  opponent's heading carries no predictive signal, so there's nothing for `vec12`/`stack4` to
  exploit that Random-testing could reveal
- **The common thread:** three of four directions (D1, D3, D4) test hypotheses that specifically
  require an opponent with exploitable structure — a consistent self-play cycle, a threat worth
  reacting to, a heading worth predicting. `RandomOpponent` has none of that by design, so those
  three results are best read as "untested against a baseline that could show it," not "no effect"
- Next: stronger opponents, more seeds, more games, and full-scale behavior tables

**Figure:** `presentation-material/figures/summary_cell2_out0.png`

**Speaker notes:** End with a balanced message. We did not fail because several win rates saturated; saturation tells us the next experiment needs harder opponents and more reliable statistics.

**Do not say:** Do not over-rank all four directions from one summary chart.

## Artifact Use List

| Artifact | Slide | Use |
|---|---:|---|
| `presentation-material/figures/slide01_problem_framing_frame.png` | 1 | Main (real frame 25/100 from `match_demo.avi`) |
| *(build natively — pipeline diagram)* | 2 | To build in slide tool; auto-generated version dropped as unusable |
| `presentation-material/figures/slide03_baseline_frame.png` | 3 | Main (real frame 70/100 from a trained-agent-vs-Random match) |
| `presentation-material/match_demo_vs_random.avi` | 3 | Backup — full clip if a live demo is wanted |
| `presentation-material/figures/direction1_selfplay_league_cell7_out0.png` | 4 | Main |
| `presentation-material/figures/direction1_selfplay_league_cell8_out0.png` | 5 | Main |
| `presentation-material/figures/direction1_selfplay_league_cell8_out1.png` | 5 | Backup |
| `presentation-material/figures/direction2_representation_cell7_out0.png` | 6, 7 | Main |
| `presentation-material/figures/direction3_reward_shaping_cell8_out0.png` | 8, 9 | Main |
| `presentation-material/figures/direction3_reward_shaping_cell11_out0.png` | 9 | Backup |
| `presentation-material/figures/direction4_pomdp_elo_cell10_out0.png` | 10, 11 | Main |
| `presentation-material/figures/direction4_pomdp_elo_cell14_out0.png` | 11 | Backup |
| `presentation-material/figures/summary_cell2_out0.png` | 12 | Backup / closing |

## Consistency Checklist

- Slide count: 12
- Method slides: D1 slide 4, D2 slide 6, D3 slide 8, D4 slide 10
- Result slides: D1 slide 5, D2 slide 7, D3 slide 9, D4 slide 11
- No code blocks in slide content
- Figure status: Slides 1 and 3 use real extracted video frames (from `match_demo.avi` and the
  newly rendered `match_demo_vs_random.avi`); Slide 2 is intentionally left to be built natively in
  the slide tool (matplotlib version was tried and dropped as unusable); Slides 4-12 all have real
  figures extracted directly from notebook output cells (11 image files + 1 backup video in
  `presentation-material/`)
- No stale claims: Slide 5 and Slide 12 both correctly state cycles=0 (no non-transitivity found)

## Unresolved questions

- None currently.
