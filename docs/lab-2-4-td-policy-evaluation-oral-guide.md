# Lab 2.4 Oral Guide: TD Policy Evaluation In Cliff Walking

## 0. The Whole Lab In One Minute

Lab 2.4 is about **policy evaluation**.

That means:

> The policy is already given. The agent is not trying to find the best action. The agent only learns how good each state is under that policy.

The environment is **Cliff Walking**:

- Start: bottom-left.
- Goal: bottom-right.
- Cliff: bottom row between start and goal.
- Each normal step gives reward `-1`.
- Falling into cliff gives reward `-100` and resets to start.
- Reaching goal ends the episode.

The agent learns a table called `values`.

```python
values[state]
```

This table stores `V(s)`, the estimated value of each state.

Main TD(0) formula:

```text
V(S_t) <- V(S_t) + alpha * [R_{t+1} + gamma * V(S_{t+1}) - V(S_t)]
```

Easy version:

```text
new value = old value + learning_rate * mistake
```

Where:

```text
mistake = TD target - old value
TD target = reward + gamma * value of next state
```

## 1. The Mental Model

Think of the agent as a student walking around the grid.

At first, it knows nothing, so every state value starts at `0`.

After each move, it says:

> I was in the previous state. I received this reward. I landed in this next state. So the previous state's value should move closer to `reward + value(next_state)`.

That is TD learning.

Important:

- The **environment** controls movement, rewards, cliff, and goal.
- The **agent** controls learning `V(s)` and choosing actions from the fixed policy.
- **RLGlue** connects them and runs the loop.

## 2. Core Concepts

### State

The environment thinks in grid coordinates:

```text
(row, col)
```

The agent uses one number:

```python
state = row * grid_width + col
```

For a 4x12 grid:

```text
(0, 0)  -> 0
(0, 1)  -> 1
(1, 0)  -> 12
(3, 0)  -> 36
(3, 11) -> 47
```

Why convert?

> So the agent can use simple table lookup: `values[state]`.

### Action

There are 4 actions:

```text
0 = up
1 = left
2 = down
3 = right
```

Because row index starts at the top:

```text
up    -> row - 1
down  -> row + 1
left  -> col - 1
right -> col + 1
```

### Reward

Reward tells the agent how good or bad the transition was.

```text
normal move -> -1
cliff       -> -100
goal        -> terminal
```

Why negative reward?

> Because the task rewards shorter paths. Fewer steps means less negative total reward.

### Policy

A policy tells the agent how to choose actions.

In code:

```python
policy[state] = [prob_up, prob_left, prob_down, prob_right]
```

Example:

```python
policy[state] = [0, 0, 0, 1]
```

Means:

```text
Always go right.
```

In this lab, the policy is **fixed**.

### Value Function

`V(s)` means:

> Expected future return from state `s`, if the agent follows the given policy.

Because rewards are negative:

- Closer to goal usually means value closer to `0`.
- Farther from goal means more negative.
- Risk of cliff can make values much worse.

### TD Target

For a normal, non-terminal step:

```text
target = reward + gamma * V(next_state)
```

For a terminal step:

```text
target = reward
```

Why different?

> At terminal, there is no future state, so no `V(next_state)`.

### TD Error

```text
TD error = target - old value
```

This is the agent's mistake.

If the target is lower than expected, value goes down.

If the target is higher than expected, value goes up.

### Bootstrapping

TD is bootstrapping because it updates one estimate using another estimate:

```text
V(current state) uses V(next state)
```

It does not wait for the full episode result like Monte Carlo.

## 3. Cell-By-Cell Guide

Notebook:

`Lab 2/Lab 2.4/Policy Evaluation with Temporal Difference Learning/Lab 2.4- Policy Evaluation in Cliff Walking Environment-Student.ipynb`

### Cell 3: Imports

Important pieces:

- `numpy`: arrays for policy and values.
- `RLGlue`: runs the agent-environment loop.
- `BaseAgent`, `BaseEnvironment`: define required methods.
- `Manager`: visualizes learned values.
- `jdc`: lets notebook cells add methods to a class using `%%add_to`.

Say:

> This cell loads the tools. The important idea is that RLGlue separates agent and environment.

### Cell 5: Empty `CliffWalkEnvironment`

This creates the environment class skeleton.

Methods:

- `env_init`
- `env_start`
- `env_step`
- `env_cleanup`
- `state`

Say:

> This is only the structure. Later cells fill in how the environment actually behaves.

### Cell 7: `env_init`

This sets up the grid.

Important variables:

```python
self.grid_h = env_info.get("grid_height", 4)
self.grid_w = env_info.get("grid_width", 12)
self.start_loc = (self.grid_h - 1, 0)
self.goal_loc = (self.grid_h - 1, self.grid_w - 1)
self.cliff = [(self.grid_h - 1, i) for i in range(1, self.grid_w - 1)]
```

Meaning:

- Default grid is 4x12.
- Start is bottom-left.
- Goal is bottom-right.
- Cliff is all bottom-row cells between start and goal.

Say:

> `env_init` defines the map of the MDP: grid size, start, goal, and cliff.

### Cell 9: `state(loc)`

Code:

```python
row = loc[0]
col = loc[1]
return row * self.grid_w + col
```

This converts grid position to a single state number.

Say:

> The environment uses `(row, col)`, but the agent uses a one-dimensional table. This function connects those two views.

If teacher asks why:

> It makes the value function simple: `values[state]`.

### Cell 13: `env_start`

What it does:

1. Put agent at `start_loc`.
2. Convert start location into state number.
3. Set reward to `0`.
4. Set terminal to `False`.
5. Return the starting state.

Say:

> No action happened yet, so reward is zero. The episode begins by returning the start state to the agent.

### Cell 15: `isInBounds` And `env_step`

This is the main environment logic.

#### `isInBounds`

```python
return 0 <= x < height and 0 <= y < width
```

It checks if the new location is inside the grid.

If not, the agent stays where it was.

#### Movement

```python
if action == 0:
    x = x - 1
elif action == 1:
    y = y - 1
elif action == 2:
    x = x + 1
elif action == 3:
    y = y + 1
```

Meaning:

```text
up, left, down, right
```

#### Reward And Terminal

Default:

```python
reward = -1
terminal = False
```

If cliff:

```python
reward = -100
self.agent_loc = self.start_loc
```

If goal:

```python
terminal = True
```

Important:

```text
Cliff resets, but does not terminate.
Goal terminates.
```

Say:

> `env_step` is the transition function. Given an action, it returns reward, next state, and whether the episode ended.

Likely question:

> Why does cliff not terminate?

Answer:

> Because this environment defines cliff as a penalty plus reset. Only reaching the goal ends the episode.

### Cell 20: `env_cleanup`

Resets location to start.

Say:

> This clears environment state after an episode or experiment.

### Cell 22: Empty `TDAgent`

Creates the agent skeleton.

Methods:

- `agent_init`
- `agent_start`
- `agent_step`
- `agent_end`
- `agent_cleanup`
- `agent_message`

Say:

> The environment handles movement. The agent handles learning.

### Cell 24: `agent_init`

Important code:

```python
self.policy = agent_info.get("policy")
self.discount = agent_info.get("discount")
self.step_size = agent_info.get("step_size")
self.values = np.zeros((self.policy.shape[0],))
```

Meaning:

- `policy`: fixed action probabilities.
- `discount`: `gamma`.
- `step_size`: `alpha`.
- `values`: the value table `V(s)`.

Say:

> `agent_init` prepares the TD learner by storing the policy and creating a value table initialized to zero.

### Cell 26: `agent_start`

Important code:

```python
action = self.rand_generator.choice(range(self.policy.shape[1]), p=self.policy[state])
self.last_state = state
return action
```

Meaning:

- Choose action from the policy.
- Remember the state.

Why remember the state?

> TD updates the previous state after it sees reward and next state.

Say:

> At the start, the agent only has a state, not a reward yet. So it chooses an action and stores the state for the next update.

### Cell 28: `agent_step`

This is the most important learning cell.

Code:

```python
target = reward + self.discount * self.values[state]
error = target - self.values[self.last_state]
self.values[self.last_state] += self.step_size * error
```

In plain English:

```text
target = what the previous state's value should move toward
error = how wrong the old value was
update = move old value slightly toward target
```

Why update `last_state`?

> Because the reward and new state came from leaving `last_state`.

After update, the agent chooses the next action and stores the current state:

```python
action = random choice from policy[state]
self.last_state = state
return action
```

Say:

> `agent_step` updates the value of the previous state using the reward and the current state's estimated value, then chooses the next action from the fixed policy.

Teacher-level answer:

> This is TD(0). It is one-step because it uses only the immediate reward and one next-state estimate.

### Cell 30: `agent_end`

Terminal update:

```python
target = reward
error = target - self.values[self.last_state]
self.values[self.last_state] += self.step_size * error
```

No next-state value because the episode ended.

Say:

> `agent_end` updates the final non-terminal state. Since the next state is terminal, the target is only reward.

### Cell 32: `agent_cleanup`

```python
self.last_state = None
```

Say:

> This prevents old episode memory from leaking into a new episode.

### Cell 34: `agent_message`

```python
if message == "get_values":
    return self.values
```

Say:

> This lets the experiment ask the agent for its learned value table.

### Cell 38: `run_experiment`

This runs many episodes.

Important flow:

```python
rl_glue = RLGlue(env, agent)
rl_glue.rl_init(agent_info, env_info)
rl_glue.rl_episode(0)
```

Every few episodes, it visualizes:

```python
values = rl_glue.agent.agent_message("get_values")
manager.visualize(values, episode)
```

Say:

> `run_experiment` repeatedly lets the agent interact with the environment. Over many episodes, TD updates make the value table closer to the true value function.

### Cell 40: Optimal Deterministic Policy

This policy takes the shortest deterministic path:

```text
from start: go up
then: go right above the cliff
then: go down into goal
```

Important code:

```python
policy[36] = [1, 0, 0, 0]
for i in range(24, 35):
    policy[i] = [0, 0, 0, 1]
policy[35] = [0, 0, 1, 0]
```

Meaning:

- State `36` is start `(3, 0)`: go up.
- States `24` to `34`: go right.
- State `35`: go down into goal.

Say:

> It is optimal because the environment is deterministic and this is the shortest path that avoids the cliff.

Important nuance:

> If actions were random, this path would be risky because it walks near the cliff.

### Cell 41: Safe Policy

This policy avoids the cliff by going around the outside:

```text
up left edge
right across top row
down right edge
```

Code idea:

```python
for row in range(1, height):
    policy[env.state((row, 0))] = [1, 0, 0, 0]
for col in range(width - 1):
    policy[env.state((0, col))] = [0, 0, 0, 1]
for row in range(height - 1):
    policy[env.state((row, width - 1))] = [0, 0, 1, 0]
```

Say:

> The safe policy is longer, so in a deterministic world it gets more `-1` penalties. But if actions had randomness, it would reduce the chance of falling into the cliff.

### Cell 44: Near-Optimal Stochastic Policy

This policy mostly follows the optimal path, but sometimes chooses other actions.

Example:

```python
policy[36] = [0.9, 0.1/3, 0.1/3, 0.1/3]
```

Meaning:

```text
90 percent intended action
10 percent split among other actions
```

Say:

> This tests policy evaluation when behavior is stochastic. Same state can lead to different actions, so values reflect expected outcome, not one guaranteed path.

### Cell 45: Run Stochastic Experiment

Runs TD evaluation for the stochastic policy.

Say:

> This cell evaluates the stochastic policy over many episodes and returns the learned values.

## 4. RLGlue Flow

Memorize this sequence:

```text
env_start -> state
agent_start(state) -> action

repeat:
    env_step(action) -> reward, next_state, terminal

    if terminal:
        agent_end(reward)
    else:
        agent_step(reward, next_state) -> next_action
```

Simple answer:

> RLGlue is the middleman. It asks the environment what happened, then gives reward and next state to the agent so the agent can learn.

## 5. Policies In This Lab

### Optimal Deterministic Policy

Shortest path above the cliff.

Good because:

> It reaches the goal with fewest steps in deterministic environment.

Risk:

> If actions become random, being near cliff is dangerous.

### Safe Policy

Longer path around the border.

Bad because:

> More steps, so more `-1` rewards.

Good because:

> Far from cliff, so safer under randomness.

### Stochastic Near-Optimal Policy

Mostly optimal, sometimes random.

Important because:

> It shows values are expectations over possible actions, not just one path.

## 6. Best Oral Answers

### What is the goal of Lab 2.4?

> Estimate the value function `V(s)` for a fixed policy using TD(0).

### Is the agent learning the optimal policy?

> No. The policy is fixed. The agent only evaluates it.

### What is `V(s)`?

> The expected future return from state `s` under the given policy.

### What is the TD target?

Non-terminal:

```text
reward + gamma * V(next_state)
```

Terminal:

```text
reward
```

### What is TD error?

```text
target - V(current_state)
```

It is how wrong the old estimate was.

### Why update `last_state`, not current `state`?

> Because the reward and next state are the result of the action taken from `last_state`.

### Why is cliff not terminal?

> The environment defines cliff as a penalty and reset. Only the goal terminates the episode.

### Why are values negative?

> Because every step gives `-1`, and falling into cliff gives `-100`.

### What does `gamma = 1` mean?

> Future rewards are not discounted. This works here because the task is episodic.

### What does `alpha = 0.01` mean?

> The value table moves slowly toward the TD target. Small alpha makes learning more stable.

### Why initialize values to zero?

> The agent starts with no knowledge and learns values from experience.

### Why use a policy table?

> Each state has probabilities for the four actions, so the agent can sample actions from the fixed policy.

### Why use `agent_message("get_values")`?

> To retrieve the learned value table for visualization or evaluation.

## 7. Full Defense Script

Use this if teacher asks: "Explain the lab."

> Lab 2.4 is about policy evaluation using TD(0). The environment is Cliff Walking. The agent starts at the bottom-left, the goal is bottom-right, and the cliff is between them. Normal moves give reward `-1`, falling into cliff gives `-100` and resets to start, and reaching the goal ends the episode.
>
> The policy is already given, so the agent is not learning the best policy. It only estimates `V(s)`, the expected future return from each state under that policy.
>
> The environment uses `(row, col)` coordinates, but the agent uses a single state index from `row * width + col`. That lets the agent store values in a simple array, `values[state]`.
>
> On each non-terminal step, the agent updates the previous state with `reward + gamma * V(next_state)`. The difference between this target and the old value is the TD error. On terminal step, the target is only the reward because there is no next state.
>
> This is called bootstrapping because TD updates one estimate using another estimate. Over many episodes, the value table becomes closer to the true value function for the fixed policy.

## 8. Things Not To Say

Avoid these:

- "The agent learns the optimal policy."
- "This is Q-learning."
- "The cliff ends the episode."
- "TD waits until the episode finishes."
- "`V(s)` is value of a state-action pair."
- "Safe policy is always better."

Correct versions:

- The agent evaluates a fixed policy.
- This is TD(0), not Q-learning.
- Cliff resets; goal terminates.
- TD updates after each step.
- `V(s)` is state value. `Q(s,a)` is action value.
- Safe vs optimal depends on whether the environment is deterministic or stochastic.

## 9. Fast Revision Checklist

Before oral defense, make sure you can explain:

- What policy evaluation means.
- What `V(s)` means.
- Why the lab uses `row * width + col`.
- What `env_step` returns.
- Why cliff gives `-100` but does not terminate.
- TD target for normal step.
- TD target for terminal step.
- Why `agent_step` updates `last_state`.
- Difference between optimal, safe, and stochastic policy.
- What RLGlue does.

## 10. Verified Run

Notebook execution was verified with:

```text
jupyter nbconvert --to notebook --execute
```

Result:

- Executed code cells: 28
- Execution errors: 0
- Missing dependency found and installed: `jdc`

## Unresolved Questions

None.
