# Lab 1.3 — Deep Revision & Solution Analysis

## Three Bandit Agents in the RLGlue Framework

---

## Part A: RL Terminology for This Problem

Before writing any code, identify every RL component in this lab:

| RL Concept | What It Is in Lab 1.3 |
|---|---|
| **Agent** | Your bandit algorithm (Greedy, ε-Greedy, or Constant-α). It decides which arm to pull. |
| **Environment** | The 10-armed bandit machine ([ten_arm_env.py](file:///run/media/than-minh/Main%20Data/Project/REL/Lab%201.3/ten_arm_env.py)). It holds 10 hidden true values and generates noisy rewards. |
| **State** | There is **NO state** in a bandit problem. The observation is always `0`. The situation never changes — you're always facing the same 10 arms. |
| **Action** | Choosing which arm to pull: `a ∈ {0, 1, 2, ..., 9}` |
| **Reward** | A noisy sample from the chosen arm: `R = q*(a) + noise`, where noise ~ N(0, 1) |
| **Policy** | The agent's rule for selecting arms. Greedy = always pick best known. ε-Greedy = mostly best known, sometimes random. |
| **Value estimate Q(a)** | The agent's running estimate of how good each arm is. Starts at `initial_value` (usually 0). |
| **True value q*(a)** | The hidden mean payout of each arm. Drawn once from N(0, 1) at the start. The agent never sees this directly. |
| **Step-size α** | Controls how much each new reward shifts the estimate. `1/N` = sample average. Constant α = exponential recency weighting. |

> **Key insight**: Because there are no states, this is NOT a full MDP. It's a simplified "stateless" problem where we only learn action values Q(a), not state values V(s).

---

## Part B: Theoretical Background (What You Need to Know)

### B1. Why do we need exploration?

Imagine arm 3 has the highest true value `q*(3) = 2.1`, but on its first pull it gave a low noisy reward of `0.5`. Meanwhile arm 7 got lucky with a reward of `1.8` even though `q*(7) = 0.3`.

A **greedy** agent would now think arm 7 is the best and keep pulling it forever. It would **never discover** that arm 3 is actually better.

**ε-greedy** fixes this by forcing random exploration ε% of the time. Over enough random pulls, the agent discovers the true best arm.

### B2. Why does step-size matter?

**Scenario**: The true values shift after step 500 (non-stationary environment).

With **α = 1/N** (sample average):
- After 500 pulls of arm 3, α = 1/501 ≈ 0.002
- A new reward barely nudges the estimate
- The agent is "stuck in the past" — cannot adapt

With **α = 0.1** (constant step-size):
- Every new reward always contributes 10% to the update
- Old information decays exponentially: weight of reward from k steps ago = `α(1-α)^k`
- The agent adapts to changes

### B3. The RLGlue Framework

RLGlue is a middleware that enforces a strict lifecycle between agent and environment. **The agent and environment never talk directly.** RLGlue sits in the middle.

```
┌──────────┐                ┌──────────┐
│          │  ← action ──── │          │
│   Env    │                │  Agent   │
│          │  ── reward ──→ │          │
└──────────┘                └──────────┘
       ↑                          ↑
       └──── RLGlue (mediator) ───┘
```

**Lifecycle (memorize this sequence)**:

```
1. rl_init()    → calls env_init() + agent_init()     [setup everything]
2. rl_start()   → calls env_start() → agent_start()   [get first action]
3. rl_step()    → calls env_step(action) → agent_step(reward, obs)  [LOOP]
4. (terminal?)  → calls agent_end(reward)              [episode over]
```

### B4. Timing of Updates (Critical!)

```
Time 0:  agent_start() → picks action A₀, returns it
Time 1:  env gives reward R₁ for action A₀
         agent_step(R₁) → updates Q(A₀), picks action A₁, returns it
Time 2:  env gives reward R₂ for action A₁
         agent_step(R₂) → updates Q(A₁), picks action A₂, returns it
...
```

> **The reward you receive in `agent_step` is for `last_action`**, not for the action you're about to pick. You must store `last_action` so you know which Q to update.

---

## Part C: Problem Analysis

### The Assignment

Build 3 agents inside `main_agent.py` using the RLGlue `BaseAgent` interface:

| Sub-Problem | Agent | Selection Rule | Update Rule |
|---|---|---|---|
| **Problem 1** | GreedyAgent | Always `argmax(Q)` | `Q += (1/N)(R − Q)` |
| **Problem 2** | EpsilonGreedyAgent | ε-greedy | `Q += (1/N)(R − Q)` |
| **Problem 3** | EpsilonGreedyConstantStepsize | ε-greedy | `Q += α(R − Q)` with fixed α |

### What each agent must implement

Every agent must implement these 5 methods (inherited from `BaseAgent`):

| Method | When Called | What It Does |
|---|---|---|
| `agent_init(agent_info)` | Once at experiment start | Read config, create Q and N arrays |
| `agent_start(observation)` | Once per episode start | Pick first action, store as `last_action`, return it |
| `agent_step(reward, observation)` | Every step in the loop | Update Q for `last_action`, pick new action, store and return it |
| `agent_end(reward)` | When episode terminates | Update Q for `last_action` one final time (no new action needed) |
| `agent_cleanup()` | After experiment ends | Nothing needed for us |

---

## Part D: Pseudocode (Mapped to Each Sub-Problem)

### D1. Helper: Argmax with Random Tie-Breaking

**Why we need this**: `np.argmax([0, 0, 0])` always returns `0`. But we want a random choice among all tied indices.

```
FUNCTION argmax_random(array):
    max_value = maximum value in array
    tied_indices = all indices where array[i] == max_value
    RETURN random choice from tied_indices
```

### D2. GreedyAgent Pseudocode

```
INIT:
    Read num_actions, initial_value from config
    Q = array of size num_actions, filled with initial_value
    N = array of size num_actions, filled with 0
    last_action = 0

START(observation):
    last_action = argmax_random(Q)    # always greedy, even on first step
    RETURN last_action

STEP(reward, observation):
    a = last_action
    N[a] = N[a] + 1                   # count how many times this arm was pulled
    Q[a] = Q[a] + (1/N[a]) * (reward - Q[a])   # sample-average update
    last_action = argmax_random(Q)    # always greedy
    RETURN last_action

END(reward):
    a = last_action
    N[a] = N[a] + 1
    Q[a] = Q[a] + (1/N[a]) * (reward - Q[a])   # final update, no new action
```

### D3. EpsilonGreedyAgent Pseudocode

Only the **selection** changes. The update is identical to Greedy.

```
INIT:
    Same as GreedyAgent, PLUS read epsilon from config

SELECT():                              # ← NEW helper
    IF random() < epsilon:
        RETURN random integer in [0, num_actions)    # EXPLORE
    ELSE:
        RETURN argmax_random(Q)                      # EXPLOIT

START(observation):
    last_action = SELECT()             # ← uses ε-greedy instead of always greedy
    RETURN last_action

STEP(reward, observation):
    a = last_action
    N[a] = N[a] + 1
    Q[a] = Q[a] + (1/N[a]) * (reward - Q[a])   # still sample-average
    last_action = SELECT()             # ← uses ε-greedy
    RETURN last_action

END(reward):
    Same as GreedyAgent
```

### D4. EpsilonGreedyConstantStepsize Pseudocode

Only the **update rule** changes from D3. Selection is identical to EpsilonGreedyAgent.

```
INIT:
    Same as EpsilonGreedyAgent, PLUS read step_size (α) from config
    NOTE: N array is NOT needed for the update (but you can keep it for tracking)

STEP(reward, observation):
    a = last_action
    Q[a] = Q[a] + step_size * (reward - Q[a])   # ← fixed α instead of 1/N
    last_action = SELECT()
    RETURN last_action

END(reward):
    a = last_action
    Q[a] = Q[a] + step_size * (reward - Q[a])   # ← same fixed α
```

---

## Part E: Real Code (Block-by-Block with Detailed Explanation)

### E1. Argmax with Tie-Breaking

```python
def argmax(q_values):
    top = float("-inf")
    ties = []

    for i in range(len(q_values)):
        if q_values[i] > top:
            top = q_values[i]
            ties = []

        if q_values[i] == top:
            ties.append(i)

    return np.random.choice(ties)
```

**Why each line exists:**
- `top = float("-inf")` — Start with negative infinity so any real value is larger. This ensures the first value we see becomes the new maximum.
- `ties = []` — Tracks all indices that share the maximum value.
- `if q_values[i] > top` — Found a new maximum. Reset the ties list because all previous ties are no longer the best.
- `if q_values[i] == top` — This value equals the current max, so it's a tie. Add it to the list.
- `np.random.choice(ties)` — Pick one of the tied indices uniformly at random.

> **Why not just `np.argmax`?** Because `np.argmax` always returns the FIRST index when there are ties. At step 0 when all Q = 0, it would always pick arm 0. Our version gives every arm a fair chance.

---

### E2. GreedyAgent (Full Code)

```python
class GreedyAgent(BaseAgent):
    def agent_init(self, agent_info={}):
        # ─── BLOCK 1: Read configuration ───
        self.num_actions = agent_info.get("num_actions", 2)
        self.initial_value = agent_info.get("initial_value", 0.0)
```

**Why**: `agent_info` is a dictionary passed by the experiment. We read how many arms exist and what to initialize Q values to. The `.get()` method provides a default if the key is missing.

```python
        # ─── BLOCK 2: Create data structures ───
        self.q_values = np.ones(self.num_actions) * self.initial_value
        self.arm_count = np.zeros(self.num_actions)
        self.last_action = 0
```

**Why**:
- `q_values`: Our estimates Q(a). Initialized to `initial_value` (usually 0, but could be set high for "optimistic initialization" which encourages early exploration).
- `arm_count`: How many times each arm has been pulled. Needed for the `1/N` step size.
- `last_action`: We MUST remember what action we last took, because when `agent_step(reward)` is called, the reward is for THIS action, not the one we're about to choose.

```python
    def agent_start(self, observation):
        # ─── BLOCK 3: Pick the very first action ───
        self.last_action = argmax(self.q_values)
        return self.last_action
```

**Why**: The experiment just started. The environment has given us an observation (which is just `0` in bandits — meaningless). We pick our first action greedily. Since all Q values are equal initially, `argmax` will randomly choose one (thanks to our tie-breaking).

```python
    def agent_step(self, reward, observation):
        # ─── BLOCK 4: UPDATE the Q-value for last_action ───
        a = self.last_action
        self.arm_count[a] += 1
        step_size = 1.0 / self.arm_count[a]
        self.q_values[a] = self.q_values[a] + step_size * (reward - self.q_values[a])
```

**Why this is the heart of the agent**:
- `a = self.last_action` — The reward we just received is for THIS action, not a new one.
- `arm_count[a] += 1` — We've pulled this arm one more time.
- `step_size = 1/N` — On the 1st pull, α=1.0 (fully replace estimate). On the 100th pull, α=0.01 (barely nudge).
- The update formula: `Q_new = Q_old + α × (R − Q_old)`. The term `(R − Q_old)` is the **prediction error** — how wrong we were. We move Q in the direction of the error by fraction α.

```python
        # ─── BLOCK 5: SELECT the next action ───
        self.last_action = argmax(self.q_values)
        return self.last_action
```

**Why**: After updating, pick the next action. Greedy agent always picks the best-known arm.

```python
    def agent_end(self, reward):
        # ─── BLOCK 6: Final update (no new action needed) ───
        a = self.last_action
        self.arm_count[a] += 1
        step_size = 1.0 / self.arm_count[a]
        self.q_values[a] = self.q_values[a] + step_size * (reward - self.q_values[a])
```

**Why**: The episode ended. We still need to update Q for the last action (we got a final reward for it), but we DON'T pick a new action because there's nothing left to do.

```python
    def agent_cleanup(self):
        pass

    def agent_message(self, message):
        pass
```

**Why**: Required by the `BaseAgent` interface but we don't need them in this lab.

---

### E3. EpsilonGreedyAgent (Full Code — Only Differences Highlighted)

```python
class EpsilonGreedyAgent(BaseAgent):
    def agent_init(self, agent_info={}):
        self.num_actions = agent_info.get("num_actions", 2)
        self.initial_value = agent_info.get("initial_value", 0.0)
        # ─── NEW: Read epsilon ───
        self.epsilon = agent_info.get("epsilon", 0.0)
        
        self.q_values = np.ones(self.num_actions) * self.initial_value
        self.arm_count = np.zeros(self.num_actions)
        self.last_action = 0
```

**What changed**: We now read `epsilon` from the config. Everything else is the same as GreedyAgent.

```python
    def _select_action(self):
        # ─── NEW: ε-greedy selection helper ───
        if np.random.random() < self.epsilon:
            # EXPLORE: pick a random arm
            return np.random.choice(self.num_actions)
        else:
            # EXPLOIT: pick the best-known arm
            return argmax(self.q_values)
```

**Why a separate helper**: Both `agent_start` and `agent_step` need to select actions the same way. Putting it in a helper avoids duplicating code.

**How it works**:
- `np.random.random()` generates a number in [0, 1).
- If that number is less than ε (e.g., 0.1), we explore (10% of the time).
- Otherwise, we exploit (90% of the time).

```python
    def agent_start(self, observation):
        self.last_action = self._select_action()   # ← uses ε-greedy now
        return self.last_action

    def agent_step(self, reward, observation):
        # UPDATE is identical to GreedyAgent
        a = self.last_action
        self.arm_count[a] += 1
        step_size = 1.0 / self.arm_count[a]
        self.q_values[a] = self.q_values[a] + step_size * (reward - self.q_values[a])
        
        # SELECT uses ε-greedy
        self.last_action = self._select_action()   # ← ε-greedy instead of pure argmax
        return self.last_action

    def agent_end(self, reward):
        # Identical to GreedyAgent
        a = self.last_action
        self.arm_count[a] += 1
        step_size = 1.0 / self.arm_count[a]
        self.q_values[a] = self.q_values[a] + step_size * (reward - self.q_values[a])

    def agent_cleanup(self):
        pass

    def agent_message(self, message):
        pass
```

---

### E4. EpsilonGreedyConstantStepsize (Full Code — Only Differences Highlighted)

```python
class EpsilonGreedyConstantStepsize(BaseAgent):
    def agent_init(self, agent_info={}):
        self.num_actions = agent_info.get("num_actions", 2)
        self.initial_value = agent_info.get("initial_value", 0.0)
        self.epsilon = agent_info.get("epsilon", 0.0)
        # ─── NEW: Read fixed step_size ───
        self.step_size = agent_info.get("step_size", 0.1)
        
        self.q_values = np.ones(self.num_actions) * self.initial_value
        # NOTE: arm_count is NOT needed for the update, but you can keep it
        self.last_action = 0
```

**What changed**: We read `step_size` (a constant α like 0.1). We do NOT need `arm_count` for the update formula anymore (since we don't compute `1/N`).

```python
    def _select_action(self):
        # Identical to EpsilonGreedyAgent
        if np.random.random() < self.epsilon:
            return np.random.choice(self.num_actions)
        else:
            return argmax(self.q_values)

    def agent_start(self, observation):
        self.last_action = self._select_action()
        return self.last_action

    def agent_step(self, reward, observation):
        a = self.last_action
        # ─── CHANGED: Use fixed step_size instead of 1/N ───
        self.q_values[a] = self.q_values[a] + self.step_size * (reward - self.q_values[a])
        
        self.last_action = self._select_action()
        return self.last_action

    def agent_end(self, reward):
        a = self.last_action
        # ─── CHANGED: Same fixed step_size ───
        self.q_values[a] = self.q_values[a] + self.step_size * (reward - self.q_values[a])

    def agent_cleanup(self):
        pass

    def agent_message(self, message):
        pass
```

**The only code difference from EpsilonGreedyAgent**:
```diff
- step_size = 1.0 / self.arm_count[a]                    # shrinks over time
+ self.q_values[a] += self.step_size * (reward - ...)     # stays constant
```

---

## Part F: Summary — What Changed Between the 3 Agents

```
Greedy → EpsilonGreedy:
   ONLY the selection method changed (argmax → ε-greedy)
   Update rule is IDENTICAL (1/N sample average)

EpsilonGreedy → EpsilonGreedyConstantStepsize:
   ONLY the update rule changed (1/N → fixed α)
   Selection method is IDENTICAL (ε-greedy)
```

| | Greedy | ε-Greedy | ε-Greedy + Const α |
|---|---|---|---|
| **Selection** | `argmax(Q)` always | random ε%, argmax (1-ε)% | same as ε-Greedy |
| **Update** | `Q += (1/N)(R−Q)` | `Q += (1/N)(R−Q)` | `Q += α(R−Q)` |
| **Needs arm_count?** | Yes (for 1/N) | Yes (for 1/N) | No |
| **Adapts to change?** | No | No | Yes |
| **Explores?** | No | Yes | Yes |

---

## Part G: Test Environment Explained

The file [test_env.py](file:///run/media/than-minh/Main%20Data/Project/REL/Lab%201.3/test_env.py) is a **deterministic** test environment with known arm values:

```python
self.arms = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
#            ^  ^  ^  ^  ^  ^  ^  ^  ^  ^
#           a0 a1 a2 a3 a4 a5 a6 a7 a8 a9
```

- **Arm 8 is the best** (value = 1), all others have value 0.
- **No noise** is added (`reward = self.arms[action]`, no `+ np.random.randn()`).
- This makes testing easy: after enough steps, a working ε-greedy agent should have `Q[8] ≈ 1.0` and all others ≈ 0.

The real environment ([ten_arm_env.py](file:///run/media/than-minh/Main%20Data/Project/REL/Lab%201.3/ten_arm_env.py)) uses:
```python
self.arms = np.random.randn(10)            # random true values from N(0,1)
reward = self.arms[action] + np.random.randn()  # add noise
```
