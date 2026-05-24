# Reinforcement Learning Labs: Comprehensive Code & Theory Guide
### Integrated with Sutton & Barto (2018): *Reinforcement Learning: An Introduction*

This guide serves as a manual for Reinforcement Learning Labs 1.1 through 1.4, bridging theoretical foundations from the Sutton & Barto (2018) textbook, mathematical formulations, and step-by-step code implementations.

---

## Workspace Structure

The workspace contains the following directories and files:
*   `Lab 1.1/`
    *   `lab_1_1.py`: Python script simulating a multi-armed bandit.
    *   `Lab_1_1.ipynb`: Interactive Jupyter Notebook illustrating exploration/exploitation with rolling plots.
*   `Lab 1.2/`
    *   `lab_1_2.py`: Python script for state-value initialization in Gridworld.
    *   `Lab_1_2.ipynb`: Notebook illustrating immediate reward mapping on a $3 	imes 3$ grid.
*   `Lab 1.3/`
    *   `Assignment1.ipynb`: Core graded notebook implementing greedy, $\epsilon$-greedy, and constant step-size bandit agents.
*   `Lab 1.4/`
    *   `Assignment2.ipynb`: Core graded notebook implementing Dynamic Programming (Policy Evaluation, Improvement, and Value Iteration).

---

## Part 1: Multi-Armed Bandits & Exploration/Exploitation (Labs 1.1 & 1.3)

### 1. Mathematical Setting (Sutton & Barto Chapter 2)
In the $k$-armed bandit problem, an agent is faced repeatedly with a choice among $k$ different options or actions. After each choice, the agent receives a numerical reward from a stationary probability distribution.

The **action value** $q_*(a)$ is the expected reward given that action $a$ is selected:
$$q_*(a) \doteq \mathbb{E}[R_t \mid A_t = a]$$

The agent estimates the action values at time step $t$ using the estimate $Q_t(a) \approx q_*(a)$.

### 2. Mathematical Derivations of Value Updates

#### Derivation A: Sample-Average Update (Sutton & Barto Eq. 2.3)
If we estimate the value of an action by averaging the rewards received for that action, the estimate after $n-1$ selections is:
$$Q_n \doteq \frac{R_1 + R_2 + \dots + R_{n-1}}{n-1}$$

To compute this without storing all past rewards, we derive the incremental update formula:
$$Q_{n+1} = \frac{1}{n} \sum_{i=1}^{n} R_i$$
$$Q_{n+1} = \frac{1}{n} \left( R_n + \sum_{i=1}^{n-1} R_i \right)$$
Since $Q_n = \frac{1}{n-1} \sum_{i=1}^{n-1} R_i$, we have $\sum_{i=1}^{n-1} R_i = (n-1)Q_n$. Substituting this:
$$Q_{n+1} = \frac{1}{n} \left( R_n + (n-1)Q_n \right)$$
$$Q_{n+1} = \frac{1}{n} \left( R_n + n Q_n - Q_n \right)$$
$$Q_{n+1} = Q_n + \frac{1}{n} \left[ R_n - Q_n \right]$$

This update is of the general form:
$$\text{NewEstimate} \leftarrow \text{OldEstimate} + \text{StepSize} \times \left[ \text{Target} - \text{OldEstimate} \right]$$
where the term $[R_n - Q_n]$ represents the **estimation error**.

#### Derivation B: Constant Step-Size for Non-Stationarity (Sutton & Barto Eq. 2.6)
In non-stationary environments, true action values change over time. Using a sample-average step size ($1/n$) is problematic because as $n \to \infty$, the step size decays to $0$, making the agent unresponsive. Instead, we use a constant step size $\alpha \in (0, 1]$.

By expanding the update rule recursively:
$$Q_{n+1} = Q_n + \alpha [R_n - Q_n] = \alpha R_n + (1-\alpha)Q_n$$
$$Q_{n+1} = \alpha R_n + (1-\alpha)\left[ \alpha R_{n-1} + (1-\alpha)Q_{n-1} \right]$$
$$Q_{n+1} = \alpha R_n + \alpha(1-\alpha)R_{n-1} + (1-\alpha)^2 Q_{n-1}$$
Continuing down to $Q_1$, we obtain:
$$Q_{n+1} = (1-\alpha)^n Q_1 + \sum_{i=1}^n \alpha (1-\alpha)^{n-i} R_i$$

The weight assigned to reward $R_i$ decays exponentially as it recedes into the past. Since $\alpha + \sum_{i=1}^n \alpha(1-\alpha)^{n-i} = 1$, the weights form a valid weighted average.

---

### 3. Step-by-Step Code Walkthrough

#### Lab 1.1: Standard Epsilon-Greedy Agent (`lab_1_1.py`)
*   `select_action(self)`:
    *   `if np.random.rand() < self.epsilon`: Chooses an action uniformly at random: `np.random.randint(self.num_actions)`.
    *   `else`: Selects the action with the maximum estimate. To prevent bias when value ties occur, it locates all max indices:
        ```python
        max_val = np.max(self.action_values)
        ties = np.where(self.action_values == max_val)[0]
        action = np.random.choice(ties)
        ```
*   `update_value(self, action, reward)`:
    *   Increments count: `self.action_counts[action] += 1`.
    *   Sets step size: `alpha = 1.0 / self.action_counts[action]`.
    *   Updates estimate: `self.action_values[action] += alpha * (reward - self.action_values[action])`.

#### Lab 1.3: Notebook Implementation (`Assignment1.ipynb`)
We implemented identical agents but divided them into:
1.  **`GreedyAgent`**: Always chooses `argmax(self.q_values)` and updates using $1/N(A)$.
2.  **`EpsilonGreedyAgent`**: Explores with probability $\epsilon$, and updates using $1/N(A)$.
3.  **`EpsilonGreedyAgentConstantStepsize`**: Explores with probability $\epsilon$, but updates estimates using the constant step size `self.step_size` ($\alpha$):
    `self.q_values[self.last_action] += self.step_size * (reward - self.q_values[self.last_action])`

---

## Part 2: Markov Decision Processes & Dynamic Programming (Labs 1.2 & 1.4)

### 1. Mathematical Setting (Sutton & Barto Chapters 3 & 4)
In a Markov Decision Process (MDP), the agent interacts with an environment in discrete time steps. The transition dynamics of the environment are fully defined by the joint probability function $p(s', r \mid s, a)$:
$$p(s', r \mid s, a) \doteq \mathbb{P}(S_t=s', R_t=r \mid S_{t-1}=s, A_{t-1}=a)$$

#### Value Functions
Under a policy $\pi(a \mid s)$, the value of state $s$, denoted $v_\pi(s)$, is the expected return starting from $s$:
$$v_\pi(s) \doteq \mathbb{E}_\pi [G_t \mid S_t = s] = \mathbb{E}_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \;\middle|\; S_t = s \right]$$

### 2. The Bellman Equations and Dynamic Programming Updates

#### Update A: Policy Evaluation (Sutton & Barto Section 4.1)
Policy evaluation computes the state value function $v_\pi$ for an arbitrary policy $\pi$. By expanding $v_\pi(s)$ recursively, we obtain the **Bellman Expectation Equation**:
$$v_\pi(s) = \sum_{a} \pi(a \mid s) \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma v_\pi(s') \right]$$

In iterative policy evaluation, we treat this equation as an update rule:
$$V_{k+1}(s) \leftarrow \sum_{a} \pi(a \mid s) \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma V_k(s') \right]$$

This update is applied in a sweep across all states $\mathcal{S}$.

#### Update B: Policy Improvement (Sutton & Barto Section 4.2)
Let $\pi$ be a deterministic policy. We want to find a better policy $\pi'$. The **Policy Improvement Theorem** states that if:
$$q_\pi(s, \pi'(s)) \ge v_\pi(s) \quad \forall s \in \mathcal{S}$$
then the policy $\pi'$ must be as good as or better than $\pi$ globally:
$$v_{\pi'}(s) \ge v_\pi(s) \quad \forall s \in \mathcal{S}$$

To implement this, we update our policy to be **greedy** with respect to the value function $V$:
$$\pi'(s) \doteq \operatorname{argmax}_a q_\pi(s, a) = \operatorname{argmax}_a \sum_{s', r} p(s', r \mid s, a) [r + \gamma V(s')]$$

#### Update C: Value Iteration (Sutton & Barto Section 4.4)
Instead of executing full policy evaluation cycles until convergence, Value Iteration combines evaluation and improvement sweeps into a single update based on the **Bellman Optimality Equation**:
$$v_*(s) = \max_{a} \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma v_*(s') \right]$$

The update rule is:
$$V_{k+1}(s) \leftarrow \max_{a} \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma V_k(s') \right]$$

---

### 3. Step-by-Step Code Walkthrough

#### Lab 1.2: Value Map Initialization (`lab_1_2.py`)
Sets up a $3 \times 3$ grid world environment.
*   `GridWorld.get_reward(state)`: Queries `self.rewards` at the state coordinate.
*   `ValueFunction` class stores state values in a 2D matrix of shape `(3, 3)`.
*   We initialize `ValueFunction` by sweeping through all coordinates `(i, j)` and calling:
    `value_function.update_value(state, grid_world.get_reward(state))`

#### Lab 1.4: Dynamic Programming Updates (`Assignment2.ipynb`)

##### `bellman_update(env, V, pi, s, gamma)`
Updates the value function of state `s` using the Bellman expectation update:
```python
def bellman_update(env, V, pi, s, gamma):
    total = 0.0
    for a in env.A:
        pi_a = pi[s, a]
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp, (r, p) in enumerate(transitions):
            q_sa += p * (r + gamma * V[sp])
        total += pi_a * q_sa
    V[s] = total
```
*   `for a in env.A`: Iterates over the action space.
*   `transitions = env.transitions(s, a)`: Retrieves the list of next states, rewards, and transition probabilities.
*   `q_sa += p * (r + gamma * V[sp])`: Computes the expected reward plus discounted future value.
*   `total += pi_a * q_sa`: Computes the weighted expected value under policy probability distribution `pi[s, a]`.

##### `q_greedify_policy(env, V, pi, s, gamma)`
Greedifies policy `pi` at state `s` with respect to value function `V`:
```python
def q_greedify_policy(env, V, pi, s, gamma):
    q_values = []
    for a in env.A:
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp, (r, p) in enumerate(transitions):
            q_sa += p * (r + gamma * V[sp])
        q_values.append(q_sa)
    
    best_action = np.argmax(q_values)
    pi[s] = 0.0
    pi[s, best_action] = 1.0
```
*   Calculates the expected return for each action and appends it to `q_values`.
*   `best_action = np.argmax(q_values)`: Identifies the action yielding the maximum expected return.
*   `pi[s] = 0.0` and `pi[s, best_action] = 1.0`: Shifts all action probability to the greedy action.

##### `bellman_optimality_update(env, V, s, gamma)`
Performs a value iteration step for state `s`:
```python
def bellman_optimality_update(env, V, s, gamma):
    q_values = []
    for a in env.A:
        q_sa = 0.0
        transitions = env.transitions(s, a)
        for sp, (r, p) in enumerate(transitions):
            q_sa += p * (r + gamma * V[sp])
        q_values.append(q_sa)
    V[s] = max(q_values)
```
*   Identifies the expected return of each action.
*   Sets `V[s] = max(q_values)` directly, skipping the policy step.
