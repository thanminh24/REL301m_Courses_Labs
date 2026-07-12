"""Direction 3 exploratory test: round-robin D3's own regime-trained agents
against EACH OTHER, instead of against RandomOpponent or another Direction's
champion. This stays entirely inside D3's own scope (same training setup,
same RandomOpponent baseline for training) -- the only change is what the
agents face at evaluation time. Purely exploratory, not wired into the real
D3 notebook, results/, or slides.
"""
import json
from pathlib import Path

import numpy as np
from stable_baselines3 import DQN

from d3_common import (CONFIG, DEVICE, GymWrapper, RandomOpponent,
                        PolicySnapshotOpponent, to_vector, train_dqn_on,
                        win_rate, play_match)

TIMESTEPS = 100_000
SEEDS = [0, 1]
LEARNING_STARTS = 1_000
EVAL_GAMES = 100
REGIMES = ["peaceful", "default", "aggressive"]

OUT_DIR = Path(__file__).parent
RESULTS_PATH = OUT_DIR / "direction3_regime_roundrobin_results.json"

print(f"[setup] device={DEVICE}")

# --- Step 1: train all 6 regime/seed agents exactly like the original D3 notebook ---
# (same GymWrapper(CONFIG, RandomOpponent(), collision_mode=regime), same hyperparameters)
regime_models = {}
for regime in REGIMES:
    for seed in SEEDS:
        env = GymWrapper(CONFIG, RandomOpponent(), collision_mode=regime)
        model, _ = train_dqn_on(env, TIMESTEPS, seed, LEARNING_STARTS)
        regime_models[(regime, seed)] = model
        wr = win_rate(CONFIG, PolicySnapshotOpponent(model, encoder_fn=to_vector),
                      RandomOpponent(), EVAL_GAMES)
        print(f"[train] {regime} seed={seed} vs RandomOpponent: {wr}")

# --- Step 2: round-robin every trained agent against every other trained agent ---
# One representative seed per regime (seed 0) to keep the round-robin square and readable;
# both seeds' vs-RandomOpponent numbers are still printed above for the full picture.
players = {regime: PolicySnapshotOpponent(regime_models[(regime, 0)], encoder_fn=to_vector)
           for regime in REGIMES}

matrix = {}
print("\n[round-robin] agent (row) vs opponent (col), win rate over", EVAL_GAMES, "games")
header = "".ljust(12) + "".join(r.ljust(12) for r in REGIMES)
print(header)
for row in REGIMES:
    row_str = row.ljust(12)
    for col in REGIMES:
        if row == col:
            row_str += "--".ljust(12)
            continue
        wr = win_rate(CONFIG, players[row], players[col], EVAL_GAMES)
        matrix[(row, col)] = wr
        row_str += f"{wr['win']:.2f}".ljust(12)
    print(row_str)

# --- Step 3: also check each regime's OTHER seed against everyone, as a stability check ---
seed1_vs_seed0 = {}
for regime in REGIMES:
    p0 = players[regime]
    p1 = PolicySnapshotOpponent(regime_models[(regime, 1)], encoder_fn=to_vector)
    wr = win_rate(CONFIG, p1, p0, EVAL_GAMES)
    seed1_vs_seed0[regime] = wr
    print(f"[seed stability] {regime} seed1 vs {regime} seed0: {wr}")

results = {
    "round_robin_seed0": {f"{r}_vs_{c}": v for (r, c), v in matrix.items()},
    "seed1_vs_seed0_same_regime": seed1_vs_seed0,
}
RESULTS_PATH.write_text(json.dumps(results, indent=2))
print(f"\nsaved -> {RESULTS_PATH}")
