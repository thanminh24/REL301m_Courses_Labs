# REL301m Final Examination Active-Recall Workbook

> **Optional supplement.** For the supplied 317-question exam, start with the
> [complete learning guide](rel301m-complete-learning-guide.md). This workbook deliberately
> goes beyond that conceptual question-bank depth with calculations and algorithm traces.
> Their inclusion is not evidence that code or algorithm tracing is exam-required.

## Purpose

This workbook turns the [317-question revision index](final-exam-revision-question-index.md)
into exam practice. The source bank is useful for terminology, but it rarely asks you to
calculate an update, trace an algorithm, or justify a design choice. Those are the skills
practised here. For final question verdicts—including the 49 in-scope items retained as
unsupported without invented answers—use the canonical guide.

Coverage follows the course sequence:

1. bandits, MDPs, values, Bellman equations, and dynamic programming;
2. Monte Carlo, temporal-difference learning, control, and Dyna;
3. function approximation, average reward, policy gradient, and actor–critic;
4. end-to-end experiment reasoning.

## How to study with it

Use three passes:

1. **Closed-book attempt:** write an answer before checking anything.
2. **Correction:** compare with the answer key and explain the mistake in one sentence.
3. **Delayed recall:** retry missed questions the next day without rereading the answer.

Mark each item:

- `G` — correct and explainable;
- `Y` — correct but uncertain;
- `R` — wrong or unable to explain.

Do not count a memorized formula as `G` unless you can say what every term means.

## Minimal formula sheet

### Bandits and returns

\[
Q_{n+1}(a)=Q_n(a)+\alpha\left[R_n-Q_n(a)\right]
\]

\[
G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots
\]

For a unique greedy action under \(\varepsilon\)-greedy with \(k\) actions:

\[
\Pr(A=\text{greedy})=1-\varepsilon+\frac{\varepsilon}{k},
\qquad
\Pr(A=a\ne\text{greedy})=\frac{\varepsilon}{k}
\]

### Values and Bellman equations

\[
v_\pi(s)=\sum_a\pi(a\mid s)\sum_{s',r}p(s',r\mid s,a)
\left[r+\gamma v_\pi(s')\right]
\]

\[
v_*(s)=\max_a\sum_{s',r}p(s',r\mid s,a)
\left[r+\gamma v_*(s')\right]
\]

### Prediction and control

\[
\delta_t=R_{t+1}+\gamma V(S_{t+1})-V(S_t)
\]

\[
V(S_t)\leftarrow V(S_t)+\alpha\delta_t
\]

Control targets:

\[
\begin{aligned}
\text{Sarsa: }&R+\gamma Q(S',A')\\
\text{Q-learning: }&R+\gamma\max_a Q(S',a)\\
\text{Expected Sarsa: }&R+\gamma\sum_a\pi(a\mid S')Q(S',a)
\end{aligned}
\]

Importance-sampling ratio:

\[
\rho_t=\frac{\pi(A_t\mid S_t)}{b(A_t\mid S_t)}
\]

### Function approximation and policy gradient

\[
\hat v(s,\mathbf w)=\mathbf w^\top\mathbf x(s)
\]

\[
\mathbf w\leftarrow\mathbf w+
\alpha\left[R+\gamma\hat v(S',\mathbf w)-\hat v(S,\mathbf w)\right]
\nabla_{\mathbf w}\hat v(S,\mathbf w)
\]

For a linear approximator,
\(\nabla_{\mathbf w}\hat v(S,\mathbf w)=\mathbf x(S)\).

\[
\theta\leftarrow\theta+
\alpha\,\nabla_\theta\log\pi_\theta(A\mid S)\,\hat A(S,A)
\]

The advantage estimate \(\hat A\) may be a return minus a baseline or a critic's TD error.

---

## Part A — Foundations and dynamic programming

### A1. Discounted return

After time \(t\), the next three rewards are \(2,3,4\), and the episode then terminates.
With \(\gamma=0.5\), compute \(G_t\).

### A2. Incremental action-value update

An action has estimate \(Q(a)=4\). It produces reward \(9\), and \(\alpha=0.1\).
Compute the new estimate.

### A3. Epsilon-greedy probabilities

There are four actions and one unique greedy action. With \(\varepsilon=0.2\), compute the
selection probability of:

1. the greedy action;
2. each non-greedy action.

Explain why the greedy action can still be selected during the exploration branch.

### A4. Exploration methods

Give one sentence each explaining what drives exploration in:

1. optimistic initialization;
2. upper-confidence-bound action selection;
3. softmax action selection.

### A5. MDP formulation

For a robot vacuum, give a plausible definition of:

1. state;
2. action;
3. reward;
4. transition dynamics;
5. discount factor.

Then explain why the reward should describe the goal rather than prescribe every movement.

### A6. Reward, return, and value

Distinguish:

1. \(R_{t+1}\);
2. \(G_t\);
3. \(v_\pi(s)\);
4. \(q_\pi(s,a)\).

### A7. One Bellman expectation backup

A fixed policy in state \(s\) always selects one action. That action leads:

- to \(s_1\) with probability \(0.75\), reward \(2\), and \(v_\pi(s_1)=4\);
- to \(s_2\) with probability \(0.25\), reward \(-2\), and \(v_\pi(s_2)=8\).

With \(\gamma=0.5\), compute the Bellman backup for \(v_\pi(s)\).

### A8. Expectation versus optimality

Explain why the Bellman expectation equation contains an expectation under \(\pi\), while
the Bellman optimality equation contains a maximum over actions.

### A9. Policy iteration versus value iteration

State the repeating steps in policy iteration. Then explain what value iteration truncates
or combines.

### A10. Generalized policy iteration

Why do policy evaluation and policy improvement not need to finish perfectly before useful
learning occurs?

---

## Part B — Sample-based learning and control

### B1. Monte Carlo versus TD

Compare Monte Carlo and TD(0) on:

1. when an update can occur;
2. whether the target bootstraps;
3. bias and variance;
4. suitability for continuing tasks.

### B2. TD(0) update

Suppose:

\[
V(S_t)=5,\quad R_{t+1}=2,\quad V(S_{t+1})=6,\quad
\gamma=0.9,\quad\alpha=0.1.
\]

Compute the TD error and updated \(V(S_t)\).

### B3. Terminal transition

Suppose \(V(S_t)=3\), the terminal reward is \(-1\), and \(\alpha=0.2\).
Compute the update. State the value used for the terminal successor.

### B4. Three control targets

For one transition:

\[
R=1,\quad\gamma=0.9,\quad Q(S',A')=3,\quad
\max_aQ(S',a)=5,\quad
\sum_a\pi(a\mid S')Q(S',a)=4.2.
\]

Compute the Sarsa, Q-learning, and Expected Sarsa targets.

### B5. Q-learning update

Use the Q-learning target from B4. If the current value is \(Q(S,A)=2\) and
\(\alpha=0.5\), compute the updated value.

### B6. On-policy versus off-policy

Explain the distinction using a behavior policy \(b\) and target policy \(\pi\).
Classify Sarsa, Q-learning, and Expected Sarsa.

### B7. Cliff-walking behavior

Why can Sarsa learn a safer path than Q-learning while both use
\(\varepsilon\)-greedy behavior during training?

### B8. Importance sampling

For the sampled action, \(\pi(A\mid S)=0.8\) and \(b(A\mid S)=0.2\).

1. Compute the one-step ratio.
2. Explain what the ratio does.
3. State the support condition.
4. Explain why importance sampling may have high variance.

### B9. Model types

Distinguish a distribution model from a sample model. Which one can directly provide an
expected backup, and which one naturally generates simulated experience?

### B10. Dyna trace

Put these operations in a sensible Dyna-Q loop and state which may repeat many times:

- act in the real environment;
- update \(Q\) from a real transition;
- store or update the model;
- sample a previously observed state–action pair;
- query the model;
- update \(Q\) from a simulated transition.

### B11. Dyna-Q+

With exploration bonus \(\kappa\sqrt{\tau(s,a)}\), compute the bonus when
\(\kappa=0.01\) and \(\tau=100\). Explain why the bonus helps after an environment changes.

### B12. Algorithm selection

Choose one primary method and justify it:

1. episodic prediction with complete episodes and no need for online updates;
2. online control where behavior must account for its own exploratory actions;
3. control where a learned model can cheaply generate extra transitions;
4. a changed maze where old, untried actions should be reconsidered.

---

## Part C — Function approximation and policy methods

### C1. Why approximation?

Why is a table unsuitable for a very large or continuous state space? State both the main
benefit and the main risk of function approximation.

### C2. Linear value estimate

Given

\[
\mathbf w=[1,2,-1]^\top,\qquad
\mathbf x(s)=[0,1,0.5]^\top,
\]

compute \(\hat v(s,\mathbf w)\).

### C3. Semi-gradient update

Starting with \(\mathbf w=[1,2,-1]^\top\), suppose
\(\delta=-2\), \(\alpha=0.1\), and
\(\mathbf x(S)=[1,0,0.5]^\top\). Compute the new weights.

### C4. Why “semi-gradient”?

Explain which part of the bootstrapped target is treated as constant during the update and
why this is not the full gradient of the squared TD error.

### C5. State aggregation

What information is shared by states in the same aggregate? Describe the bias–variance or
generalization–resolution trade-off.

### C6. Tile coding

Why are multiple offset tilings better than a single coarse grid? If exactly 8 binary
features are active, why is a per-feature step size near \(\alpha/8\) often a sensible
starting scale?

### C7. MSVE

Explain the role of the state-weighting distribution \(\mu(s)\) in:

\[
\operatorname{MSVE}(\mathbf w)=
\sum_s\mu(s)\left[v_\pi(s)-\hat v(s,\mathbf w)\right]^2.
\]

### C8. Average-reward TD error

For a continuing task, consider:

\[
\delta=R-\bar R+\hat v(S')-\hat v(S).
\]

If \(R=5\), \(\bar R=2\), \(\hat v(S')=4\), and \(\hat v(S)=6\), compute
\(\delta\). Explain why subtracting \(\bar R\) is useful.

### C9. Softmax policy

Two actions have preferences \(h_1=0\) and \(h_2=\ln 2\). Compute their softmax
probabilities.

### C10. Policy-gradient direction

In

\[
\nabla_\theta\log\pi_\theta(A\mid S)\,\hat A(S,A),
\]

explain what happens to the probability of the sampled action when \(\hat A\) is:

1. positive;
2. negative;
3. zero.

### C11. Baseline

Why can an action-independent baseline reduce variance without changing the expected policy
gradient? What would be risky about an action-dependent baseline inserted carelessly?

### C12. Actor–critic data flow

Describe one transition through actor–critic:

1. who selects the action;
2. who estimates value;
3. how the TD error is formed;
4. how the critic changes;
5. how the actor changes.

### C13. The deadly triad

Name the three ingredients of the deadly triad. Does any one ingredient alone guarantee
divergence?

### C14. Method choice under continuous actions

Why might a parameterized stochastic policy be preferable to computing
\(\arg\max_a Q(s,a)\) when the action space is continuous?

---

## Part D — Integration and oral-defense prompts

### D1. End-to-end RL study

You are given a new control problem. In order, state what you would define or decide for:

1. objective and episode boundary;
2. state and action representation;
3. reward;
4. algorithm;
5. evaluation metrics;
6. baselines;
7. seeds and uncertainty;
8. failure analysis.

### D2. Fair algorithm comparison

Why is comparing only the best run of algorithm A with the average run of algorithm B
invalid? Give a better protocol.

### D3. Learning curve versus final performance

Construct a case where one agent learns faster but both agents have the same final
performance. Which plot and summary statistics would reveal this?

### D4. Ablation

An agent uses replay, reward shaping, and a larger neural network. Design an ablation that
can identify which addition caused an observed improvement.

### D5. Distribution shift

Training performance is high, but performance collapses on a slightly modified environment.
Give four possible causes and one diagnostic for each.

### D6. Explain without jargon

Give a 30-second explanation of each:

1. bootstrapping;
2. off-policy learning;
3. planning in Dyna;
4. function approximation;
5. actor–critic.

---

## Answer key

### Part A

**A1.** \(G_t=2+0.5(3)+0.5^2(4)=4.5\).

**A2.** \(Q_{\text{new}}=4+0.1(9-4)=4.5\).

**A3.** Greedy probability:
\(1-0.2+0.2/4=0.85\). Each non-greedy action has probability \(0.2/4=0.05\).
Exploration samples from all actions, so it may resample the greedy one.

**A4.**

1. Optimism makes insufficiently tried actions look valuable until evidence corrects them.
2. UCB adds an uncertainty bonus that is large for actions with low visit counts.
3. Softmax converts preferences or values into graded action probabilities using temperature.

**A5.** One valid formulation uses position, dirt layout, and battery as state; movement and
cleaning as actions; cleaned dirt minus time/energy cost as reward; uncertain motion and dirt
changes as dynamics; and \(\gamma\) to express how much future cleanliness matters. Reward
defines success; hand-coding every preferred move can create loopholes and prevent the agent
from discovering better behavior.

**A6.** Reward is one immediate scalar signal. Return is a discounted sum of future rewards.
\(v_\pi(s)\) is expected return from a state under policy \(\pi\).
\(q_\pi(s,a)\) is expected return after taking action \(a\) in \(s\), then following \(\pi\).

**A7.**

\[
0.75[2+0.5(4)]+0.25[-2+0.5(8)]
=0.75(4)+0.25(2)=3.5.
\]

**A8.** Policy evaluation averages over actions chosen by the specified policy. Optimal
control instead selects the action with the highest expected backed-up return.

**A9.** Policy iteration alternates policy evaluation and greedy policy improvement. Value
iteration performs a truncated—often one-sweep—evaluation and immediately applies the
optimality backup.

**A10.** Evaluation pushes values toward the current policy while improvement makes the
policy greedy with respect to current values. Their interaction can converge even when each
process makes partial, interleaved progress.

### Part B

**B1.** MC waits for a completed return and does not bootstrap; its sampled targets are
unbiased under ordinary on-policy sampling but often high variance. TD updates after each
transition and bootstraps; its target is biased by current estimates but usually lower
variance. TD naturally supports continuing and online tasks.

**B2.**

\[
\delta=2+0.9(6)-5=2.4,\qquad
V_{\text{new}}(S_t)=5+0.1(2.4)=5.24.
\]

**B3.** The terminal successor value is \(0\).
\(\delta=-1-3=-4\), so \(V_{\text{new}}=3+0.2(-4)=2.2\).

**B4.**

- Sarsa: \(1+0.9(3)=3.7\).
- Q-learning: \(1+0.9(5)=5.5\).
- Expected Sarsa: \(1+0.9(4.2)=4.78\).

**B5.** \(Q_{\text{new}}=2+0.5(5.5-2)=3.75\).

**B6.** On-policy learning evaluates or improves the same policy that generates experience,
so \(b=\pi\). Off-policy learning uses data from \(b\) to learn about a different \(\pi\).
Sarsa is on-policy. Q-learning is off-policy because its target is greedy even when behavior
explores. Expected Sarsa is on- or off-policy depending on the policy used in its expectation.

**B7.** Sarsa backs up the next action actually sampled from its exploratory policy, so it
learns the cost of occasionally stepping near the cliff. Q-learning backs up the greedy next
action, learning a risky optimal path while behavior still sometimes deviates from it.

**B8.** The ratio is \(0.8/0.2=4\). It reweights behavior-policy data to estimate a
target-policy quantity. Support requires \(b(a\mid s)>0\) whenever
\(\pi(a\mid s)>0\). Products of variable or large ratios can make a few trajectories dominate,
causing high variance.

**B9.** A distribution model provides probabilities and expected outcomes, so it can support
expected backups. A sample model generates a possible next state and reward, naturally
providing simulated transitions.

**B10.** Act, observe a real transition, update \(Q\), update the model, then repeat planning:
sample a stored pair, query the model, and update \(Q\) from the simulated result. The
planning portion may repeat many times per real step.

**B11.** The bonus is \(0.01\sqrt{100}=0.1\). Its growth makes long-untried actions attractive
again, helping the agent discover that old transition outcomes have changed.

**B12.**

1. Monte Carlo prediction.
2. Sarsa.
3. Dyna-Q.
4. Dyna-Q+.

Other choices can be defensible only if their assumptions and trade-offs are stated.

### Part C

**C1.** A table cannot store or visit every state in a huge or continuous space.
Approximation generalizes learning across states, but approximation error and unstable
updates can spread mistakes.

**C2.** \(\hat v=1(0)+2(1)-1(0.5)=1.5\).

**C3.**

\[
\Delta\mathbf w=0.1(-2)[1,0,0.5]^\top=[-0.2,0,-0.1]^\top,
\]

so \(\mathbf w_{\text{new}}=[0.8,2,-1.1]^\top\).

**C4.** The successor estimate inside the bootstrapped target is treated as fixed. A full
gradient would differentiate through both the current estimate and the parameter-dependent
target; semi-gradient TD differentiates only the current prediction.

**C5.** States in one aggregate share the same parameters and value estimate. Larger
aggregates increase sharing and reduce variance/data needs but lose resolution and can add
bias.

**C6.** Offset tilings let nearby states share some but not all active features, producing
local, smoother generalization without one rigid boundary. Eight active weights each receive
an update, so scaling by roughly \(1/8\) keeps the total initial change near \(\alpha\).

**C7.** \(\mu(s)\) determines which states matter most to the objective, commonly reflecting
the on-policy state distribution. Errors in frequently weighted states contribute more than
errors in rarely weighted states.

**C8.** \(\delta=5-2+4-6=1\). Subtracting the long-run average turns reward into differential
reward: whether the transition is better or worse than the continuing-task baseline.

**C9.**

\[
\pi(a_1)=\frac{1}{1+2}=\frac13,\qquad
\pi(a_2)=\frac{2}{1+2}=\frac23.
\]

**C10.** A positive advantage increases the sampled action's log probability; a negative
advantage decreases it; zero produces no actor update from that sample.

**C11.** An action-independent baseline has zero expected score-function contribution, so it
can center the learning signal without biasing the expected gradient. An arbitrary
action-dependent baseline may change relative action updates and bias the gradient.

**C12.** The actor samples an action. The critic estimates state value. A transition forms
\(\delta=R+\gamma V(S')-V(S)\). The critic reduces its value error; the actor changes the
sampled action's log probability in the direction indicated by \(\delta\).

**C13.** Function approximation, bootstrapping, and off-policy learning. Their combination
creates a known instability risk; no single ingredient alone guarantees divergence.

**C14.** Maximizing a value function over infinitely many actions may require a difficult
inner optimization on every step. A parameterized policy can directly produce or sample a
continuous action and optimize expected performance.

### Part D

**D1.** A strong answer defines the objective before the reward, representation before the
model class, and evaluation before tuning. It reports multiple seeds and uncertainty, compares
against simple baselines under equal budgets, and inspects behavior and failure cases rather
than only final return.

**D2.** Best-versus-average selection gives A an unfair multiple-comparison advantage. Use the
same environment instances, compute budget, tuning protocol, and independent seeds; report
mean or median with uncertainty and paired comparisons when runs share seeds.

**D3.** Reward shaping may improve early sample efficiency while shaped and unshaped agents
converge to the same policy. Plot return against environment steps and report area under the
learning curve, steps to threshold, tail mean, and final evaluation return.

**D4.** Hold data, seeds, budget, and evaluation fixed. Compare the base agent; each single
addition; and, if interactions matter, selected combinations or the full factorial design.
Do not attribute the full system's gain to one component without its controlled contrast.

**D5.** Examples:

- memorization or overfitting — compare train and held-out environment seeds;
- brittle state features — perturb observations and inspect feature/value changes;
- reward exploitation — inspect trajectories and component-level rewards;
- insufficient environment diversity — evaluate controlled variations one factor at a time;
- policy relies on accidental dynamics — test targeted transition changes.

**D6.** A correct explanation should convey:

1. bootstrapping updates an estimate using another current estimate;
2. off-policy learning learns one policy from behavior generated by another;
3. Dyna learns from real experience and replays model-generated experience;
4. function approximation shares parameters so experience transfers across similar states;
5. actor–critic combines a policy learner with a value learner that supplies feedback.

## Common traps to eliminate

- Do not call reward, return, and value the same thing.
- Do not say TD must wait for episode termination.
- Do not say Q-learning behavior is necessarily greedy; its **target** is greedy.
- Do not call Expected Sarsa always on-policy.
- Do not say importance sampling automatically reduces variance.
- Do not say Dyna is only a model or only planning; it integrates acting, direct learning,
  model learning, and planning.
- Do not say function approximation is always more accurate than a table.
- Do not say a baseline changes which policy is optimal; its usual purpose is variance
  reduction.
- Do not claim one seed or the best run proves an algorithm is better.

## Next study session

Retry every `R` item, then orally answer D6 without equations. After that, use the
[highest-value subset in the source index](final-exam-revision-question-index.md#highest-value-practice-subset)
as a 10-minute terminology screen.

## Unresolved questions

- Exact final-exam weighting across Courses 1–3 is not available, so practice is balanced by
  conceptual dependency and by gaps in the supplied question bank rather than official marks.
- No supplied evidence establishes that coding or notebook tracing is examined. If separate
  exam instructions later add coding, create a notebook-tracing set for the local assignments
  and lab implementations.
