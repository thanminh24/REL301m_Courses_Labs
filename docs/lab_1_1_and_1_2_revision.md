# Lab 1.1 & 1.2 — Revision Notes + Quiz Answers

---

## Lab 1.1 — Exploration & Exploitation (ε-Greedy Bandit)

### Methodology (What the lab does, step by step)

The lab simulates a **10-armed bandit problem** — imagine 10 slot machines, each with a hidden average payout you don't know.

```
Step 1: CREATE the environment
   → 10 arms, each with a hidden true value q*(a) drawn from N(0, 1)
   → When you pull arm a, you get a noisy reward: R ~ N(q*(a), 1)

Step 2: CREATE the agent
   → Stores Q(a) = estimated value for each arm (starts at 0)
   → Stores N(a) = count of how many times each arm was pulled (starts at 0)
   → Has epsilon = 0.1 (exploration rate)

Step 3: RUN the interaction loop (1000 steps)
   For each step:
     a) Agent SELECTS an action (ε-greedy)
     b) Environment RETURNS a noisy reward
     c) Agent UPDATES its estimate Q(a)

Step 4: COMPARE Q(a) estimates vs true q*(a) values
   → Good agent: Q ≈ q* for the best arms
```

### The Three Core Mechanisms

#### 1. Environment — How rewards work
```python
# True values: drawn once, stay fixed
self.true_action_values = np.random.normal(0, 1, num_arms)  # q*(a)

# Each pull: truth + noise
def get_reward(self, action):
    return np.random.normal(self.true_action_values[action], 1.0)
```
> **Key**: You never get `q*(a)` exactly. You get `q*(a) + random noise`. One pull is unreliable. Average many pulls → converge to truth.

#### 2. Selection — ε-greedy with tie-breaking
```python
def select_action(self):
    if np.random.rand() < self.epsilon:       # 10% of the time
        action = np.random.randint(self.num_actions)  # EXPLORE: random arm
    else:                                      # 90% of the time
        max_val = np.max(self.action_values)
        ties = np.where(self.action_values == max_val)[0]
        action = np.random.choice(ties)        # EXPLOIT: best arm (ties broken randomly)
    return action
```

> **Why tie-break?** At step 0, all Q = 0. `np.argmax` would always pick arm 0 (first max). Random tie-breaking gives all arms a fair start.

#### 3. Update — Sample-average incremental formula
```python
def update_value(self, action, reward):
    self.action_counts[action] += 1                          # N(a) += 1
    alpha = 1.0 / self.action_counts[action]                 # step size = 1/N
    self.action_values[action] += alpha * (reward - self.action_values[action])
    #        Q(a)              += (1/N) × (R - Q(a))
```

### Quick Notes — Lab 1.1

| Concept | Key Point |
|---|---|
| **q*(a)** | True expected reward of arm `a`. Hidden from agent. |
| **Q(a)** | Agent's *estimate* of q*(a). Starts at 0. |
| **Reward** | Noisy sample: `R ~ N(q*(a), 1)`. One pull ≠ truth. |
| **ε-greedy** | With prob ε → random (explore). With prob 1-ε → argmax Q (exploit). |
| **Tie-breaking** | When multiple arms share max Q, pick one **randomly** (`np.where` + `np.random.choice`). |
| **Update formula** | `Q += (1/N)(R − Q)` — nudge estimate toward observed reward. |
| **Step size 1/N** | Shrinks over time → all past rewards weighted equally (sample average). |
| **Why explore?** | Pure greedy (ε=0) can get stuck on a suboptimal arm forever. |

---

## Lab 1.2 — Value Function Concept (GridWorld)

### Methodology (What the lab does, step by step)

This lab is **purely conceptual** — it introduces what a value function *is*, without any RL algorithm.

```
Step 1: CREATE a 3×3 grid environment
   → Each cell is a "state" identified by (row, col)
   → Each cell has an immediate reward R(s)
   → Only cell (2,1) has reward +1. All others are 0.

Step 2: CREATE a value function table
   → Same shape as grid (3×3 matrix)
   → All values initialized to 0

Step 3: POPULATE the value table
   → For each cell: V(s) = R(s) (just copy the immediate reward)

Step 4: DISPLAY the value function
   → Output: V = [[0, 0, 0], [0, 0, 0], [0, 1, 0]]
```

### The Two Classes

#### 1. GridWorld — The environment
```python
class GridWorld:
    def __init__(self):
        self.grid_size = (3, 3)
        self.num_actions = 4          # Up, Down, Left, Right
        self.rewards = np.array([
            [0, 0, 0],
            [0, 0, 0],
            [0, 1, 0]                 # only (2,1) gives +1
        ])

    def get_reward(self, state):
        return self.rewards[state[0], state[1]]
```

#### 2. ValueFunction — A lookup table
```python
class ValueFunction:
    def __init__(self, grid_size):
        self.values = np.zeros(grid_size)   # 3×3 matrix of zeros

    def update_value(self, state, new_value):
        self.values[state[0], state[1]] = new_value

    def get_value(self, state):
        return self.values[state[0], state[1]]
```

#### 3. The main loop — Just copies rewards into V
```python
for i in range(3):
    for j in range(3):
        state = (i, j)
        vf.update_value(state, grid_world.get_reward(state))
# Result: V is an exact copy of rewards
```

### Key Concepts Introduced

**State** = a position `(row, col)` in the grid. In Lab 1.1 (bandits), there were NO states — just actions. Lab 1.2 introduces the idea that "where you are" matters.

**Value Function V(s)** = a number for each state saying "how good is it to be here?" It's stored as a simple table/matrix.

**This is NOT a real value function yet**. Here, `V(s) = R(s)` (just immediate reward). A *real* value function accounts for **future rewards too** — cells *near* the +1 cell should have positive values because you can *reach* the reward from them. That requires **Bellman equations** (Lab 1.4).

### Quick Notes — Lab 1.2

| Concept | Key Point |
|---|---|
| **State** | A position `(row, col)`. Bandits had no states — this is new. |
| **Reward R(s)** | Immediate reward for being in state s. Only (2,1) = +1 here. |
| **Value function V(s)** | A number per state: "how good is it to be here?" Stored as a table. |
| **V(s) ≠ R(s) in general** | Here V just copies R. Real V accounts for future rewards (Bellman). |
| **No RL algorithm** | This lab only demonstrates the *concept* of a value table. |
| **Why it matters** | V is the foundation of everything in Labs 1.3 and 1.4. |

---

## Quiz Answers

### Q1. Why don't you get q*(3) exactly each time? What happens if you average 100 pulls?

**Answer**: Because the reward is **sampled with noise**: `R ~ N(q*(3), 1.0)`. Each pull adds random Gaussian noise (variance = 1) on top of the true mean. So one pull might give you `q*(3) + 0.7`, another `q*(3) - 1.2`, etc.

If you pulled arm 3 a hundred times and averaged the rewards, **you'd converge to q*(3)**. The noise has mean 0, so it cancels out over many samples. This is the Law of Large Numbers.

---

### Q2. What happens at step 0 when all Q = 0 and ε = 0.1?

**Answer**: Two possible outcomes:

| Outcome | Probability | What happens |
|---|---|---|
| **Explore** | 10% (ε = 0.1) | `np.random.rand() < 0.1` is true → pick a random arm uniformly from 0–9 |
| **Exploit** | 90% (1 − ε = 0.9) | All Q = 0, so ALL 10 arms are tied → `np.where` finds all 10 → `np.random.choice` picks one randomly |

**In both cases**, the arm is effectively chosen randomly! This is good — it means the agent explores uniformly at the very start, giving all arms a fair chance.

Without tie-breaking, the exploit branch would always pick arm 0 → biased.

---

### Q3. What is alpha on the 1st and 100th update? What does shrinking alpha mean?

**Answer**:
- **1st update** to arm 5: `alpha = 1/1 = 1.0` → fully replace the old estimate with the new reward
- **100th update** to arm 5: `alpha = 1/100 = 0.01` → only nudge 1% toward the new reward

**In plain English**: Early on, each new observation makes a big difference (you don't know much yet). Later, each new observation barely moves the estimate (you already have a good average from many samples). This is the **sample average** — every past reward is weighted equally.

---

### Q4. Is V(s) = copy of rewards a "real" value function?

**Answer**: **No.** It's just a demonstration of the *data structure* (a table mapping states to numbers).

A real value function would account for **future rewards**, not just immediate ones. In a real GridWorld, the cells adjacent to (2,1) should have positive values because the agent can *move there* and collect the +1 reward.

For example, with γ = 0.9, a real V might look something like:
```
V ≈ [[0.73, 0.81, 0.73],
     [0.81, 0.90, 0.81],
     [0.73, 1.00, 0.73]]
```
Cells closer to the reward have higher value because they're fewer steps away. Computing this requires **Bellman equations** (Lab 1.4).

---

### Q5. Fundamental difference between bandits (Lab 1.1) and MDPs (Lab 1.2)?

**Answer**: **States.**

- **Bandits**: No states. You just pick an action and get a reward. The situation never changes.
- **MDPs**: You're in a **state**. Your action takes you to a **new state** with a **reward**. The right action depends on *where you are*.

That one word — **states** — is what separates a simple bandit from a full MDP.

---

## Summary: How Lab 1.1 → Lab 1.2

```
Lab 1.1 (Bandits)              Lab 1.2 (GridWorld)
─────────────────              ───────────────────
No states                  →   States exist (grid positions)
Q(a) = value per action    →   V(s) = value per state
Learn by pulling arms      →   (No learning yet, just the concept)
ε-greedy exploration       →   (Not used yet)
```

Lab 1.1 teaches you **how to learn** (update estimates from experience).
Lab 1.2 teaches you **what to learn about** (states have values).
Lab 1.3 combines both with 3 agent strategies.
Lab 1.4 uses **Bellman equations** to compute *real* V(s) values.
