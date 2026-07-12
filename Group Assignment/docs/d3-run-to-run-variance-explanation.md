# Why Direction 3 Gives a (Slightly) Different Result Every Run

Observation: rerunning `direction3_reward_shaping.ipynb` top-to-bottom with the *same* config
(`SEEDS = [0, 1]`, `TIMESTEPS = 100_000`) produces different behavior statistics each time —
e.g. `food_per_ep` for the default regime lands anywhere around 25.8–26.5, and the *ranking*
of peaceful/default/aggressive can flip between runs. This is expected, and the course labs
(Lab 2 and Lab 3) contain the reasons. Four factors stack up:

## 1. The experience stream is stochastic (Lab 2.5 — Q-Learning and Expected Sarsa)

DQN, like the Q-learning agent in Lab 2.5, learns off-policy while *behaving* with an
ε-greedy policy. Every exploratory action is a random draw, and on top of that the Vasuki
environment itself is stochastic: food respawns at random positions and the RandomOpponent
samples a random action every step. So even from the same starting weights, two runs see
different sequences of transitions — different replay buffers — and therefore learn different
Q-functions. Lab 2.5 makes exactly this point implicitly: its comparison plots are
**averaged over many independent runs with standard-error shading**, because a single run of
a TD-control agent is a noisy sample, not "the" result.

In *tabular* Q-learning (Lab 2.5) this noise washes out asymptotically — tabular Q-learning
converges to Q\* regardless of the exploration details. That guarantee is lost in Direction 3,
which is the next point.

## 2. Function approximation amplifies the noise (Lab 3.4 / 3.5 — semi-gradient TD with NN)

Direction 3's DQN is exactly the setting of Lab 3.5: **semi-gradient TD updates on a neural
network trained with stochastic gradient descent**. Three consequences from that lab apply
directly:

- **SGD is itself random**: minibatches are sampled randomly from the replay buffer, so the
  weight trajectory differs run to run even for identical data.
- **Semi-gradient bootstrapping compounds early differences**: TD targets are built from the
  network's *own current estimates* (Lab 2.4's bootstrapping idea, now with shared weights).
  A small early difference in the network changes the targets, which changes the next
  updates — a feedback loop. Under a greedy policy it also changes which *actions* are taken,
  which changes the *data* itself. Small perturbations therefore grow instead of averaging out.
- **No convergence guarantee**: unlike the tabular methods of Lab 2, semi-gradient TD with a
  nonlinear approximator can settle in different places. Lab 3.5 shows its own learning curves
  only as an **average over 20 runs**, and Lab 2.6 (Dyna-Q) states outright that "for
  scientific rigor, we will run each experiment 30 times." Direction 3 averages over **2 seeds**
  — far below the lab standard — so seed-to-seed noise is clearly visible in the reported means.

## 3. Fixed seeds do not make GPU training reproducible

`train_dqn_on` seeds SB3 (which seeds NumPy/torch), so one might expect bit-identical reruns.
On CPU that is nearly true; on CUDA it is not: GPU kernels (cuDNN autotuning, atomic
floating-point reductions) are non-deterministic, so two runs with seed 0 diverge by tiny
float differences within the first gradient steps. Normally a ~1e-7 difference would be
irrelevant — but because of the argmax in action selection and the bootstrapped targets from
point 2, a single flipped greedy action changes the whole subsequent experience stream. The
notebook auto-selects `DEVICE = "cuda"` when available, so every rerun is effectively a fresh
independent sample even with fixed seeds. (The committed `results/direction3_regimes.json`
and the notebook's own embedded cell outputs already disagree with each other for this reason
— they came from two different executions of the same code.)

## 4. The effect being measured is small relative to the noise

The honest headline of Direction 3 (see `docs/presentation-structure.md`, slide "RandomOpponent
Was Too Easy to Separate Regimes") is that against a RandomOpponent all three collision regimes
saturate: 100% win rate, ~26 food/episode, ~0.6–0.9 collisions/episode. The between-regime gaps
(a few tenths of a food item) are the same order of magnitude as the between-seed noise from
points 1–3. When the signal-to-noise ratio is near 1, the *ranking* of regimes is essentially a
coin flip per run — which is exactly why different executions crown different regimes.

## Takeaway

The variation is not a bug in the environment or the reward code; it is the textbook behavior
of ε-greedy TD control with neural-network function approximation, sampled with too few seeds
to average the noise away. The labs' remedy is more independent runs (20–30 in Labs 2.6/3.5);
the full-scale config in the notebook (5 seeds, 500k steps, 200 behavior episodes) moves in
that direction. At course scale, any single reported run should be read as one draw from a
distribution — we therefore report a representative run and note that regime differences vs
RandomOpponent are within noise.
