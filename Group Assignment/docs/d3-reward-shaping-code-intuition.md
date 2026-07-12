# D3 Reward Shaping — Code-Block Intuition

Source: `direction3_reward_shaping.ipynb`, verified against actual implementation (not just
docstrings) on 2026-07-05. Intuition given first, then the code, then a line-by-line mapping.

## Block 1 — Collision Reward Regimes

**Intuition first:** the only thing that changes between peaceful/default/aggressive is *how much
a collision is worth*, and specifically *whether that worth shrinks once the game is already
decided*. Peaceful = collisions are worthless. Aggressive = collisions are always worth the same
big amount, win or lose. Default = collisions are worth less and less the more one snake is
already winning.

**Code:**
```python
if self.collision_mode == "peaceful":
    return 0, 0
if self.collision_mode == "aggressive":
    if sA > sB: return 15, -5
    if sA < sB: return -5, 15
    return -1, -1
# default:
if sA > sB: return 5 * abs(sB // (sA - sB)), -3 * abs(sB // (sA - sB))
if sA < sB: return -3 * abs(sA // (sA - sB)), 5 * abs(sA // (sA - sB))
return -abs(sA // 2), -abs(sB // 2)
```

**Mapping:**
- `return 0, 0` -> the "collisions don't exist" idea, literally zero, no branching on score at all.
- `return 15, -5` / `-5, 15` -> the "always worth the same" idea — no score gap anywhere in these
  numbers, just a fixed payout depending only on who's ahead.
- `5 * abs(sB // (sA - sB))` -> the "shrinks as the gap widens" idea — `sA - sB` (the gap) sits in
  the *denominator*, so a bigger gap makes the whole term smaller. That's the mechanism for "big
  lead = collisions barely matter anymore."
- The tie branches (`-1,-1` vs `-abs(sA//2), -abs(sB//2)`) are edge cases for equal scores —
  aggressive treats a tie as a small fixed penalty either way; default scales the tie-penalty to
  each snake's own score.
- **Known discrepancy:** the notebook's own intro markdown describes aggressive as "+15/-15" — the
  actual code is `+15/-5`. Code is ground truth; the prose is stale.

## Block 2 — Potential-Based Shaping

**Intuition first:** give the agent a tiny hint every single step — "did you get closer to food
just now?" — instead of only ever getting feedback the instant it actually eats. The trick is doing
this in a way that's mathematically guaranteed to only speed up learning, not change what the agent
ends up doing (Ng, Harada & Russell, 1999 — potential-based shaping is policy-invariant).

**Code:**
```python
def _phi(self):
    dists = np.linalg.norm(self.raw_env.live_foodspawn_space - self.raw_env.agentA["state"], axis=1)
    return -float(dists.min()) / self.raw_env.n

def step(self, action):
    phi_before = self._phi() if self.shaping else 0.0
    ...
    reward = float(rewardA)
    if self.shaping:
        reward += self.gamma * self._phi() - phi_before
```

**Mapping:**
- `_phi()` -> "how close am I to the nearest food, right now" — negative distance, so *closer* food
  means a *higher* (less negative) number. This is the "hint" itself.
- `phi_before = self._phi()` (called *before* the step) -> snapshot of "how close was I a moment ago."
- `self.gamma * self._phi() - phi_before` (second call *after* the step) -> "how close am I now"
  minus "how close was I a moment ago," scaled by `gamma`. Moved toward food = positive bonus; moved
  away = negative. One line of arithmetic is the entire signal.
- `reward = float(rewardA)` then `reward +=` -> the bonus is *added on top of* the real environment
  reward, never replacing it — the real reward still has final say on what's actually good or bad.
- Shaping only ever runs during training; evaluation always uses the plain unshaped wrapper, so a
  learning-speed effect can't get mistaken for a policy change.

## Block 3 — Why the Results Come Out Flat vs Random

**Intuition first:** none of Block 1's incentives can do anything if the opponent never poses a
threat worth reacting to. A reward for winning a fight only matters if fights are winnable/losable
in a meaningful way — against a wanderer, every collision is basically a coin flip regardless of
strategy.

**Code:**
```python
class RandomOpponent:
    def act(self, env):
        return int(env.action_space.sample())
```

**Mapping:** this is the entire opponent — one line, sample a random legal action, no memory, no
reaction to what the agent does. There is nothing here for `aggressive`'s "go hunt collisions"
incentive to exploit, because the opponent was never going to behave predictably enough to be
hunted in the first place. Block 1's reward code is fully correct and fully different across
regimes — it just has no opponent-side behavior to bite into. (A separate, deferred investigation
against real trained opponents did unmask an effect, but an opponent-dependent one — see
`docs/presentation-structure.md` Slide 12 / the final-table notes for that context.)
