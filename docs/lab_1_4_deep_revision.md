# Lab 1.4 — Deep Revision & Solution Analysis

## Dynamic Programming on ParkingWorld MDP

---

## Part A: RL Terminology for This Problem

| RL Concept | What It Is in Lab 1.4 |
|---|---|
| **Agent** | Not explicitly coded. The "agent" is the DP algorithm itself (policy evaluation, policy improvement, value iteration). |
| **Environment** | `ParkingWorld` ([tools.py](file:///run/media/than-minh/Main%20Data/Project/REL/Lab%201.4/tools.py)). A parking lot with 10 spaces. |
| **State (s)** | Number of occupied parking spaces: `s ∈ {0, 1, 2, ..., 10}` (11 states total). |
| **Action (a)** | Price level to charge: `a ∈ {0, 1, 2, 3}` (4 actions). `0` = free parking, `3` = highest price. |
| **Reward R(s, s')** | Depends on current AND next occupancy: `R = state_reward(s) + state_reward(s')`. Higher occupancy → higher reward (more customers paying). But if lot is full (`s=10`), reward is penalized by `null_factor`. |
| **Transition p(s', r \| s, a)** | The probability of going to state `s'` (and getting reward `r`) given current state `s` and action `a`. Higher prices → fewer customers → occupancy tends to drop. |
| **Policy π(a\|s)** | A 2D array. `pi[s, a]` = probability of taking action `a` in state `s`. A deterministic policy has one `1.0` per row, rest `0.0`. |
| **Value function V(s)** | A 1D array. `V[s]` = "how good is it to have `s` occupied spaces, under policy π?" |
| **Discount factor γ** | Typically 0.9. Makes future rewards worth less: a reward 2 steps away is worth `γ²` of its face value. |

> **Key difference from Lab 1.3**: In bandits, there were NO states and NO transition dynamics. Here, the environment has states (occupancy levels) that change probabilistically based on your action (pricing).

---

## Part B: Theoretical Background

### B1. What is `env.transitions(s, a)`?

This is the **single most important function** in Lab 1.4. It returns a list indexed by next state `s'`:

```python
transitions = env.transitions(s, a)

# transitions is a numpy array with shape (11, 2):
# transitions[0]  = [reward_if_go_to_state_0,  probability_of_going_to_state_0]
# transitions[1]  = [reward_if_go_to_state_1,  probability_of_going_to_state_1]
# ...
# transitions[10] = [reward_if_go_to_state_10, probability_of_going_to_state_10]
```

**Concrete example**: Suppose we're in state `s=5` (5 cars parked) and take action `a=0` (free parking):

```
transitions[3]  = [8.0,  0.05]   → 5% chance of dropping to 3 cars, reward = 8.0
transitions[4]  = [9.0,  0.10]   → 10% chance of dropping to 4 cars, reward = 9.0
transitions[5]  = [10.0, 0.20]   → 20% chance of staying at 5 cars, reward = 10.0
transitions[6]  = [11.0, 0.25]   → 25% chance of going to 6 cars, reward = 11.0
transitions[7]  = [12.0, 0.20]   → 20% chance of going to 7 cars, reward = 12.0
...etc
```

All probabilities across all next states sum to 1.0.

### B2. The Three Equations You Need

All three functions in Lab 1.4 share the **same inner computation**. Only the outer logic differs.

#### The Shared Inner Loop (Computing Q(s, a))

This calculates: "If I'm in state `s` and take action `a`, what's the expected return?"

$$Q(s, a) = \sum_{s'} p(s', r \mid s, a) \cdot [r + \gamma \cdot V(s')]$$

**In plain English**: For each possible next state `s'`, multiply (probability of going there) × (immediate reward + discounted value of that next state). Sum them all up.

**Worked numerical example**:

Suppose `γ = 0.9`, `V = [0, 1, 3, 5, 7, 10, ...]`, and from state `s=2`, action `a=1`:

```
transitions[1] = [r=3.0, p=0.3]  → 0.3 × (3.0 + 0.9 × V[1]) = 0.3 × (3.0 + 0.9) = 1.17
transitions[2] = [r=4.0, p=0.4]  → 0.4 × (4.0 + 0.9 × V[2]) = 0.4 × (4.0 + 2.7) = 2.68
transitions[3] = [r=5.0, p=0.3]  → 0.3 × (5.0 + 0.9 × V[3]) = 0.3 × (5.0 + 4.5) = 2.85
                                                                                     ─────
                                                               Q(s=2, a=1) =          6.70
```

#### Equation 1: Bellman Expectation (Policy Evaluation)

$$V(s) = \sum_{a} \pi(a|s) \cdot Q(s, a)$$

**In English**: The value of state `s` = weighted average of all action-values, weighted by the policy's probability of choosing each action.

**Example**: If policy says `π(a=0|s=2) = 0.0, π(a=1|s=2) = 1.0, π(a=2|s=2) = 0.0, π(a=3|s=2) = 0.0`:
```
V(s=2) = 0.0 × Q(2,0) + 1.0 × Q(2,1) + 0.0 × Q(2,2) + 0.0 × Q(2,3)
       = Q(2,1)
       = 6.70
```

Under a **random policy** (equal probability for all actions):
```
V(s=2) = 0.25 × Q(2,0) + 0.25 × Q(2,1) + 0.25 × Q(2,2) + 0.25 × Q(2,3)
```

#### Equation 2: Policy Improvement (Greedification)

$$\pi'(s) = \text{argmax}_a \; Q(s, a)$$

**In English**: For state `s`, compute Q(s, a) for every action. Set the policy to 100% on whichever action has the highest Q. Set all other actions to 0%.

**Example**: If `Q(2,0)=5.1, Q(2,1)=6.7, Q(2,2)=4.3, Q(2,3)=3.8`:
```
Best action = argmax = action 1
π[2, 0] = 0.0
π[2, 1] = 1.0  ← 100% on the best
π[2, 2] = 0.0
π[2, 3] = 0.0
```

#### Equation 3: Bellman Optimality (Value Iteration)

$$V(s) = \max_a \; Q(s, a)$$

**In English**: Instead of weighting by policy probabilities, just take the maximum Q-value directly.

**Example**: If `Q(2,0)=5.1, Q(2,1)=6.7, Q(2,2)=4.3, Q(2,3)=3.8`:
```
V(s=2) = max(5.1, 6.7, 4.3, 3.8) = 6.7
```

### B3. How the Three Equations Relate

```
All three share this inner loop:
    for each action a:
        q_sa = Σ p × (r + γ·V(s'))

Then they differ ONLY in what they do with the q-values:

bellman_update:              V[s] = Σ π(a|s) × q_sa     (weighted average by policy)
q_greedify_policy:           π[s] = argmax(q_sa)         (pick the best action)
bellman_optimality_update:   V[s] = max(q_sa)            (take the maximum)
```

### B4. Policy Iteration vs Value Iteration

| | Policy Iteration | Value Iteration |
|---|---|---|
| **Step 1** | Evaluate policy fully (run bellman_update sweeps until V converges) | — |
| **Step 2** | Improve policy (run q_greedify for all states) | — |
| **Repeat** | Until policy stops changing | — |
| **Combined** | — | Run bellman_optimality_update sweeps until V converges (does both at once) |
| **Speed** | Each iteration is expensive (many inner sweeps) but needs few outer iterations | Each iteration is cheap (single sweep) but needs more outer iterations |
| **Result** | Same optimal V* and π* | Same optimal V* (extract π* after) |

---

## Part C: Problem Analysis

### The Assignment

Implement 3 functions in the Lab 1.4 notebook:

| Sub-Problem | Function | What It Computes | Inputs | Output |
|---|---|---|---|---|
| **Problem 1** | `bellman_update(env, V, pi, s, gamma)` | New V(s) under policy π | env, V, pi, state s, γ | Updates V[s] in-place |
| **Problem 2** | `q_greedify_policy(env, V, pi, s, gamma)` | Best action for state s | env, V, pi, state s, γ | Updates pi[s] in-place |
| **Problem 3** | `bellman_optimality_update(env, V, s, gamma)` | Optimal V(s) | env, V, state s, γ | Updates V[s] in-place |

> **Critical observation**: All three functions modify arrays **in-place**. They don't return values; they directly write to `V[s]` or `pi[s]`.

---

## Part D: Pseudocode (Mapped to Each Sub-Problem)

### D1. The Shared Inner Loop (Computing Q(s, a))

Every function needs this:

```
FUNCTION compute_q(env, V, s, a, gamma):
    q_sa = 0
    transitions = env.transitions(s, a)
    FOR each next_state sp IN 0 to len(transitions)-1:
        reward, probability = transitions[sp]
        q_sa = q_sa + probability × (reward + gamma × V[sp])
    RETURN q_sa
```

### D2. bellman_update Pseudocode (Policy Evaluation)

```
FUNCTION bellman_update(env, V, pi, s, gamma):
    total = 0
    FOR each action a in env.A:
        policy_prob = pi[s, a]                    # how likely is this action?
        q_sa = compute_q(env, V, s, a, gamma)     # what's this action worth?
        total = total + policy_prob × q_sa         # weight by policy probability
    V[s] = total                                   # store the weighted average
```

### D3. q_greedify_policy Pseudocode (Policy Improvement)

```
FUNCTION q_greedify_policy(env, V, pi, s, gamma):
    q_values = empty list
    FOR each action a in env.A:
        q_sa = compute_q(env, V, s, a, gamma)     # same inner loop
        APPEND q_sa to q_values
    
    best_action = index of maximum value in q_values
    SET pi[s] = all zeros                          # clear old policy
    SET pi[s, best_action] = 1.0                   # 100% on the best
```

### D4. bellman_optimality_update Pseudocode (Value Iteration)

```
FUNCTION bellman_optimality_update(env, V, s, gamma):
    q_values = empty list
    FOR each action a in env.A:
        q_sa = compute_q(env, V, s, a, gamma)     # same inner loop
        APPEND q_sa to q_values
    
    V[s] = maximum value in q_values               # just take the max
```

---

## Part E: Real Code (Block-by-Block with Detailed Explanation)

### E1. bellman_update — Policy Evaluation

```python
def bellman_update(env, V, pi, s, gamma):
```

**What this function answers**: "Given that the agent follows policy π, what is the expected long-term return from being in state `s`?"

```python
    # ─── BLOCK 1: Initialize accumulator ───
    total = 0.0
```

**Why**: We're going to sum up the contribution from every possible action, weighted by the policy. This variable collects that sum.

```python
    # ─── BLOCK 2: Loop over all possible actions ───
    for a in env.A:                        # env.A = [0, 1, 2, 3]
```

**Why**: The policy might assign nonzero probability to multiple actions. We must consider each one.

```python
        # ─── BLOCK 3: Get policy probability ───
        pi_a = pi[s, a]                    # π(a|s) — how likely is this action?
```

**Why**: Under a random policy, this is 0.25 for all actions. Under a deterministic policy, this is 1.0 for one action and 0.0 for the others.

```python
        # ─── BLOCK 4: Compute Q(s, a) — the inner loop ───
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp in range(len(transitions)):     # sp = next state s'
            r, p = transitions[sp]             # r = reward, p = probability
            q_sa += p * (r + gamma * V[sp])    # Σ p(r + γV(s'))
```

**Why each line**:
- `transitions = env.transitions(s, a)` — Ask the environment: "If I'm in state `s` and take action `a`, what could happen?" Returns a list of `[reward, probability]` for each possible next state.
- `for sp in range(len(transitions))` — Loop through every possible next state (0 through 10).
- `r, p = transitions[sp]` — Unpack: what reward do I get if I land in state `sp`, and what's the probability of landing there?
- `q_sa += p * (r + gamma * V[sp])` — This IS the Bellman equation inner sum: probability × (immediate reward + discounted future value).

```python
        # ─── BLOCK 5: Weight by policy and accumulate ───
        total += pi_a * q_sa
```

**Why**: We weight each action's Q-value by how likely the policy is to choose it. A random policy weights all actions equally (0.25 each). A deterministic policy puts all weight on one action.

```python
    # ─── BLOCK 6: Store result ───
    V[s] = total
```

**Why**: Overwrite the old V(s) with the newly computed value. This is an in-place update.

---

### E2. q_greedify_policy — Policy Improvement

```python
def q_greedify_policy(env, V, pi, s, gamma):
```

**What this function answers**: "Given the current value function V, what is the single best action to take in state `s`?"

```python
    # ─── BLOCK 1: Compute Q(s, a) for EVERY action ───
    q_values = []
    for a in env.A:
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp in range(len(transitions)):
            r, p = transitions[sp]
            q_sa += p * (r + gamma * V[sp])    # identical inner loop
        q_values.append(q_sa)
```

**Why**: We need to compare ALL actions to find the best one. So we compute Q(s, a) for every action and store them in a list.

```python
    # ─── BLOCK 2: Find the best action ───
    best_action = np.argmax(q_values)
```

**Why**: `np.argmax` returns the index of the largest value. This IS the greedy action.

```python
    # ─── BLOCK 3: Update the policy ───
    pi[s] = 0.0                            # zero out ALL action probabilities
    pi[s, best_action] = 1.0               # 100% on the best action
```

**Why**: We're making a **deterministic** greedy policy. First, clear the entire row (all actions become 0% probability). Then, set the best action to 100%.

> **Difference from bellman_update**: bellman_update reads π to weight Q-values. q_greedify_policy writes to π based on Q-values.

---

### E3. bellman_optimality_update — Value Iteration

```python
def bellman_optimality_update(env, V, s, gamma):
```

**What this function answers**: "What is the optimal value V*(s), assuming the agent always makes the best choice?"

**Notice**: This function does NOT take `pi` as input. Value iteration doesn't need a policy!

```python
    # ─── BLOCK 1: Compute Q(s, a) for EVERY action ───
    q_values = []
    for a in env.A:
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp in range(len(transitions)):
            r, p = transitions[sp]
            q_sa += p * (r + gamma * V[sp])    # identical inner loop (3rd time!)
        q_values.append(q_sa)
```

**Why**: Same inner loop as before. We compute Q for every action.

```python
    # ─── BLOCK 2: Take the maximum ───
    V[s] = max(q_values)
```

**Why**: Instead of:
- weighting by policy (bellman_update does `Σ π × Q`)
- updating the policy (q_greedify does `argmax`)

...we just take the **max** Q-value and put it directly into V. The policy is implicit in the `max` — we're assuming the agent always picks the best action.

---

## Part F: How the Three Functions Are Used in Practice

### F1. Policy Evaluation Loop (Uses `bellman_update`)

```python
def policy_evaluation(env, V, pi, gamma, theta=1e-10):
    while True:
        delta = 0
        for s in env.S:                             # sweep ALL states
            v_old = V[s]                             # remember old value
            bellman_update(env, V, pi, s, gamma)     # update V[s]
            delta = max(delta, abs(V[s] - v_old))    # track biggest change
        if delta < theta:                            # converged?
            break
```

**How it works**: Keep sweeping over all states, updating V(s) each time, until the biggest change in any state drops below a tiny threshold θ.

### F2. Policy Iteration Loop (Uses `bellman_update` + `q_greedify_policy`)

```python
def policy_iteration(env, V, pi, gamma, theta=1e-10):
    stable = False
    while not stable:
        # STEP 1: Evaluate current policy fully
        policy_evaluation(env, V, pi, gamma, theta)
        
        # STEP 2: Improve policy
        stable = True
        for s in env.S:
            old_action = np.argmax(pi[s])
            q_greedify_policy(env, V, pi, s, gamma)
            if np.argmax(pi[s]) != old_action:
                stable = False    # policy changed → not done yet
```

**How it works**: Alternate between (1) running policy evaluation until V converges, and (2) making the policy greedy. Repeat until the policy stops changing.

### F3. Value Iteration Loop (Uses `bellman_optimality_update`)

```python
def value_iteration(env, V, gamma, theta=1e-10):
    while True:
        delta = 0
        for s in env.S:
            v_old = V[s]
            bellman_optimality_update(env, V, s, gamma)   # max-based update
            delta = max(delta, abs(V[s] - v_old))
        if delta < theta:
            break
```

**How it works**: Same structure as policy evaluation, but uses the optimality update (max) instead of the expectation update (policy-weighted average). No separate improvement step needed.

---

## Part G: Summary Comparison Table

### The Three Functions Side by Side

| | `bellman_update` | `q_greedify_policy` | `bellman_optimality_update` |
|---|---|---|---|
| **Purpose** | Compute V(s) for a fixed policy | Make policy greedy w.r.t. V | Find optimal V*(s) |
| **Inner loop** | `q_sa += p × (r + γ·V[sp])` | SAME | SAME |
| **What it does with Q-values** | `V[s] = Σ π(a\|s) × q_sa` | `pi[s, argmax] = 1.0` | `V[s] = max(q_values)` |
| **Reads from** | V, pi | V | V |
| **Writes to** | V | pi | V |
| **Needs policy π?** | Yes (reads it) | Yes (writes to it) | **No** |

### The Key Insight

**The inner loop is identical in all three.** Once you understand `Σ p × (r + γ·V(s'))`, you understand all of Lab 1.4. The only thing that changes is what you do with the resulting Q-values:

```
bellman_update:              → average them by policy weights → put in V[s]
q_greedify_policy:           → find the max → update pi[s]
bellman_optimality_update:   → find the max → put in V[s]
```
