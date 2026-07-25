# Course 1 Learning Fragment

## Scope and evidence convention

This fragment is the Course 1 teaching layer for the REL301m exam guide. The
[question index](../../../docs/final-exam-revision-question-index.md) controls emphasis; the
twelve local Course 1 decks control conceptual claims. A slide citation is one-based. “Bank
claim” means the supplied answer is preserved for later adjudication, not accepted as truth.

Course 1 contains 81 mapped questions: 48 `usable`, 23 `review`, and 10 `verify`. The exact
duplicate family Q045/Q248/Q253 and high-similarity pair Q189/Q268 reduce the count to 78
question-demand families. Unsupported wording is flagged where the nearest deck does not teach
the exact idea.

<a id="lecture-1-1"></a>
## Lecture 1.1 — The k-Armed Bandit Problem

**Source:** [1.1. The K-Armed Bandit Problem.pptx](<../../../docs/slides/slides/1.1. The K-Armed Bandit Problem.pptx>)  
**Useful slides:** 4–6, 9–15  
**Demand:** 1 raw / 1 unique; `usable` 1; **depth D2** because the problem is a prerequisite for
1.2–1.3.  
**Mapped questions:** Q157

### Big idea

A k-armed bandit is repeated choice under uncertainty with `k` available actions. Each action
has an unknown reward distribution. The agent chooses one action per trial and aims to maximize
reward accumulated across trials. Unlike a full sequential MDP, the bandit action does not
create a decision-relevant next state; reward depends on the present action and observation
(slides 5–11).

The true action value is the expected reward of action \(a\):

\[
q_*(a)=\mathbb E[R_t\mid A_t=a]=\sum_r p(r\mid a)r.
\]

Here \(A_t\) is the selected action and \(R_t\) is the resulting reward. This is an expectation,
not the reward from one pull and not yet an estimate learned from samples (slides 14–15).

### Contrast and trap

- **Reward:** one scalar feedback signal at one trial (slide 4).
- **True action value:** the mean reward implied by the unknown reward distribution (slide 15).
- **Estimated action value:** the learner’s current approximation; Lecture 1.2 explains how it
  is obtained.

`k` counts available arms/actions, not time steps, states, or rewards (slides 8–10). The deck’s
medical-trial example makes the mapping concrete: treatment is the action; patient welfare is
the reward; expected welfare is the action value (slides 12–15).

### Teach-back check

1. Why is one unusually large reward not the action’s true value?  
   **Answer:** a single outcome is only one sample; the true value is the expected reward over
   the action’s reward distribution.
2. What does `k` mean?  
   **Answer:** the number of available actions or arms.

**Recall cue:** `k arms → unknown reward distributions → choose one → maximize accumulated
reward`.

<a id="lecture-1-2"></a>
## Lecture 1.2 — Estimating Action Values

**Source:** [1.2. Estimating Action Values.pptx](<../../../docs/slides/slides/1.2. Estimating Action Values.pptx>)  
**Useful slides:** 3–11  
**Demand:** 2 raw / 2 unique; `usable` 2; **depth D2** because estimation is the bridge from
unknown values to action selection.  
**Mapped questions:** Q217, Q238

### Big idea

The true action value is unknown, so the agent estimates it from observed rewards. The
sample-average estimate totals the rewards observed after choosing an action and divides by the
number of times that action was chosen (slides 3–4). In the clinical example, one success gives
an estimate of 1; a later failure changes the two-sample average to 0.5. More observations make
the estimate approach the action’s true value in the deck’s stationary example (slides 5–9).

The estimate is useful because it ranks actions. A greedy choice selects the action with the
largest current estimate; choosing another action sacrifices possible immediate reward to learn
more (slides 10–11).

### One small reasoning step

Suppose an action has been tried twice with rewards 1 and 0. Its sample average is
\((1+0)/2=0.5\). The second reward changes the estimate because every observed reward contributes
to the average (slides 4, 7–9).

### Contrast and trap

- **Truth versus estimate:** \(q_*(a)\) is an unknown expectation; \(Q(a)\) is computed from
  data (slides 3–4).
- **Estimate versus decision rule:** sample averaging estimates; greedy selection acts on the
  estimate (slides 4, 10).
- **Q238 caution:** the deck presents total/count sample averaging but does not name a generic
  step-size parameter or constant-step-size rule. Its supplied “most recent reward influence”
  answer is therefore only indirectly supported by the changing average, not directly taught.

### Teach-back check

1. What two quantities are needed for a sample-average estimate?  
   **Answer:** total observed reward for the action and the number of times it was selected.
2. Why can the greedy action change?  
   **Answer:** new rewards change the estimates, which can change which estimate is largest.

**Recall cue:** `observe rewards → average per action → compare estimates → greedy uses the
largest`.

<a id="lecture-1-3"></a>
## Lecture 1.3 — Exploration versus Exploitation

**Source:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](<../../../docs/slides/slides/1.3 Exploration vs. Exploitation Tradeoff.pptx>)  
**Useful slides:** 3–15  
**Demand:** 18 raw / 18 unique; `usable` 11, `review` 5, `verify` 2; **depth D3** because this is
high-demand and contains several misleading bank variants.  
**Mapped questions:** Q006, Q018, Q020, Q053, Q064, Q070, Q078, Q095, Q096, Q124, Q132, Q149,
Q178, Q208, Q305, Q314, Q315, Q316

### Big idea

Exploration tries new or less familiar actions to improve knowledge and possibly discover a
better action. Exploitation chooses the action that currently appears best to obtain immediate
reward. Pure exploration learns broadly but gives up some immediate reward; pure exploitation
can stay with an early favorite and never discover a better action (slides 5–13).

Epsilon-greedy makes the trade-off explicit:

- with probability \(1-\varepsilon\), choose a greedy action;
- with probability \(\varepsilon\), choose an action randomly.

Thus \(\varepsilon\) is the probability of the exploration branch, not the learning rate,
discount factor, or number of arms (slides 14–15).

### One small reasoning step

If \(\varepsilon=1/6\), the agent enters the random exploration branch roughly one-sixth of the
time and the greedy branch roughly five-sixths of the time. This follows directly from the
deck’s dice illustration; it is not a claim that every non-greedy action receives probability
exactly \(1/6\) (slide 14).

### Contrasts and common traps

- **Exploration is information-seeking; exploitation is estimate-using.** Neither alone gives
  both accurate knowledge and immediate reward on the same decision (slide 13).
- **Greedy failure mode:** if the first sampled action looks good, never exploring leaves other
  estimates inaccurate and can hide the best action (slides 10–12).
- **Too much exploration:** broader sampling comes at the cost of repeatedly not taking the
  best-known action (slides 5, 9, 13).
- **Evidence gaps in the bank:** the deck teaches fixed epsilon-greedy only. It does not teach
  decaying epsilon (Q053, Q095), optimistic initial values (Q064), Boltzmann/softmax temperature
  (Q070), epsilon-soft policies (Q078), or softmax action selection (Q314, Q315). Treat their
  supplied answers as bank claims pending evidence elsewhere; do not infer them from slides
  1–20.

### Teach-back check

1. Why can pure exploitation miss the best arm?  
   **Answer:** untried actions retain poor or uninformed estimates, so the agent may never
   discover a better reward distribution.
2. In epsilon-greedy, what does epsilon control?  
   **Answer:** the probability of choosing the random exploration branch.
3. Does this deck justify a claim about softmax temperature?  
   **Answer:** no; softmax and temperature are absent from this deck.

**Recall cue:** `explore = learn; exploit = earn now; epsilon = probability of random branch`.

<a id="lecture-1-4"></a>
## Lecture 1.4 — Markov Decision Processes

**Source:** [1.4 Introduction to Markov Decision Processes  .pptx](<../../../docs/slides/slides/1.4 Introduction to Markov Decision Processes  .pptx>)  
**Useful slides:** 3–13  
**Demand:** 4 raw / 4 unique; `usable` 3, `review` 1; **depth D3** because MDP vocabulary and
dynamics support all later value equations.  
**Mapped questions:** Q088, Q216, Q271, Q317

### Big idea

An MDP models sequential decisions: an agent interacts with an environment over discrete time,
observes a state, chooses an action, and moves to a possible next state while receiving reward
(slides 8–12). The rabbit example shows why this is richer than a bandit: the best action
depends on the current situation and on how the action changes future situations (slides 3–7).

Core terms are:

- **agent:** the learner or decision-maker;
- **environment:** what the agent interacts with;
- **state:** the current situation;
- **action:** the current choice;
- **policy:** the rule behind action selection (slides 9–11).

The dynamics \(p(s',r\mid s,a)\) give the joint probability of reaching next state \(s'\) and
receiving reward \(r\) after action \(a\) in state \(s\). Probabilities are non-negative and sum
to one over possible next-state/reward outcomes. The Markov idea is that the present state is
sufficient for predicting the future; remembering earlier states would not improve that
prediction (slides 12–13).

### One small reasoning step

Two visually similar rabbit situations can call for opposite actions because the state differs.
Once the state captures which side contains the carrot and where danger lies, the policy can
choose differently in each state (slides 3–6).

### Contrast and trap

- **Bandit:** action changes reward but not a decision-relevant next observation (1.1,
  slide 11).
- **MDP:** action can change both next state and reward, so long-term consequences matter
  (slides 5–8, 12).
- Q088/Q216 use “typical component” language. Slides 9–11 explicitly cover agent, environment,
  state, action, and policy; Lecture 1.5 adds reward. A “policy network” or “memory” is not a
  required basic component in these decks.

### Teach-back check

1. What does \(p(s',r\mid s,a)\) describe?  
   **Answer:** the probability of the next-state/reward outcome after taking action \(a\) in
   state \(s\).
2. What makes a state Markov in the deck’s wording?  
   **Answer:** the present state is sufficient; earlier states do not improve prediction of the
   future.

**Recall cue:** `state + action → distribution over next state and reward`.

<a id="lecture-1-5"></a>
## Lecture 1.5 — Goal of Reinforcement Learning

**Source:** [1.5 Goal of Reinforcement Learning .pptx](<../../../docs/slides/slides/1.5 Goal of Reinforcement Learning .pptx>)  
**Useful slides:** 4–5, 7–17  
**Demand:** 8 raw / 8 unique; `usable` 6, `review` 2; **depth D3** because reward, objective,
and episodic structure are frequent sources of category confusion.  
**Mapped questions:** Q025, Q036, Q069, Q100, Q138, Q142, Q204, Q312

### Big idea

Reinforcement learning is feedback-based: the agent acts, receives experience and reward, and
improves its behavior. The objective is not to maximize the next reward in isolation, but to
maximize total future reward (slides 4–5, 12). Reward is the scalar feedback received after an
action; policy is the strategy mapping states to actions (slides 7–9).

Rewards shape goal-directed behavior by indicating which experienced outcomes support or oppose
the objective. The deck describes positive reward for good action and punishment/negative
feedback for bad action, then connects learning to maximizing future reward (slides 4, 9, 12).
This supports the intuition behind Q100, Q204, and Q312, but slide wording does not define a
specific policy-parameter update.

An episodic task is divided into episodes. Each begins from an initial state, proceeds through
state-action transitions, and ends at a terminal state. The environment then resets for a new
episode. The deck’s examples include one chess game, maze completion, reaching a target, and a
finite puzzle (slides 13–17).

### One small reasoning step

A single maze run is episodic because it has a start, transitions, and a terminal completion.
Repeating the maze produces another episode; repetition does not turn each run into a continuing
task (slides 13–17).

### Contrasts and common traps

- **Reward:** immediate scalar feedback.
- **Goal:** maximize total future reward, not merely collect the largest immediate signal
  (slides 9, 12).
- **Episode:** a bounded interaction ending at a terminal state (slides 13–17).
- **Q069 evidence gap:** the deck explains reward feedback but does not introduce the technical
  method “reward shaping.” Its supplied exploration claim is not established by slides 1–19.

### Teach-back check

1. What is the course-level objective of an RL agent?  
   **Answer:** maximize total future or cumulative reward.
2. What structural feature makes a task episodic?  
   **Answer:** interaction is divided into episodes that end at terminal states and reset.

**Recall cue:** `reward is feedback; return is the longer-term objective; terminal state closes
an episode`.

<a id="lecture-1-6"></a>
## Lecture 1.6 — Continuing Tasks and Discounting

**Source:** [1.6 Continuing Tasks.pptx](<../../../docs/slides/slides/1.6 Continuing Tasks.pptx>)  
**Useful slides:** 3–15  
**Demand:** 6 raw / 6 unique; `usable` 5, `review` 1; **depth D3** because task type and discount
interpretation are directly tested.  
**Mapped questions:** Q052, Q065, Q082, Q127, Q144, Q308

### Big idea

A continuing task has no natural terminal state: interaction persists indefinitely. The deck
describes ongoing attention, no defined endpoint, and possible evolution over time; its smart
thermostat continually senses temperature, acts, and receives feedback (slides 3–10).

An undiscounted infinite sum may not be finite. The deck therefore defines discounted return:

\[
G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots
    =\sum_{k=0}^{\infty}\gamma^kR_{t+k+1},
\quad 0\le \gamma<1.
\]

Immediate reward has full weight; rewards farther away receive successive powers of
\(\gamma\). At \(\gamma=0\), the agent considers only the next reward. As \(\gamma\) approaches
1, future rewards receive weights closer to immediate rewards (slides 10–15).

### One small reasoning step

With \(\gamma=0\), every term after \(R_{t+1}\) is multiplied by zero, so the agent is
short-sighted. Increasing \(\gamma\) makes the same delayed reward contribute more to return
(slides 14–15).

### Contrasts and common traps

- **Episodic:** a terminal state bounds an episode (1.5, slides 13–17).
- **Continuing:** no terminal state; discounting makes an infinite reward sequence manageable
  (slides 10–13).
- **Gamma is not a reward:** it weights when rewards occur (slides 11–15).
- **Q144 ambiguity:** “studying a little each day” is not enough to determine task type. A
  fixed exam date could make it episodic; indefinite daily study could be continuing. The
  supplied “episodic” answer needs the missing endpoint assumption.

### Teach-back check

1. Why introduce discounting for a continuing task?  
   **Answer:** the undiscounted infinite reward sum may not be finite; discounting reduces the
   weight of distant rewards.
2. What behavior does a gamma near zero encourage?  
   **Answer:** short-sighted attention to immediate reward.

**Recall cue:** `continuing = no terminal state; gamma weights delay; gamma 0 is myopic`.

<a id="lecture-1-7"></a>
## Lecture 1.7 — Policies and Value Functions

**Source:** [1.7 Policies and Value Functions.pptx](<../../../docs/slides/slides/1.7 Policies and Value Functions.pptx>)  
**Useful slides:** 3–18  
**Demand:** 12 raw / 12 unique; `usable` 8, `review` 4; **depth D3** because policy, \(V\), and
\(Q\) anchor the rest of the course.  
**Mapped questions:** Q031, Q061, Q068, Q090, Q097, Q141, Q167, Q206, Q211, Q261, Q309, Q310

### Big idea

A policy determines behavior. A deterministic policy selects one action with certainty in each
state, written in the deck as \(\pi(s)=a\). A stochastic policy specifies a probability
distribution \(\pi(a\mid s)\); probabilities are non-negative and sum to one for each state
(slides 3–8).

Value functions measure expected long-term return under a policy:

\[
v_\pi(s)=\mathbb E_\pi[G_t\mid S_t=s],
\qquad
q_\pi(s,a)=\mathbb E_\pi[G_t\mid S_t=s,A_t=a].
\]

The state value \(v_\pi(s)\) asks how good it is to start in state \(s\) and follow \(\pi\).
The action value \(q_\pi(s,a)\) additionally fixes the first action \(a\), then follows \(\pi\).
They estimate expected return, not a single reward (slides 9–12).

The policy must be specified before a policy-dependent value can be interpreted. The same state
can have different values under different policies because future action choices differ
(slides 13–18).

### One small reasoning step

If two available actions from the same state lead to different expected returns, their
\(q_\pi(s,a)\) values can differ even though the state \(s\) is identical. The action argument
in \(Q(s,a)\) preserves that distinction (slides 10–12).

### Contrasts and common traps

- **Policy versus value:** policy selects actions; value predicts expected return (slides 3,
  9–12).
- **\(V\) versus \(Q\):** \(V\) conditions on a state; \(Q\) conditions on state and first
  action (slides 10–11).
- **Expected return versus expected reward:** Q031’s supplied wording omits the sequence of
  future rewards. Slides 9–11 support “expected return.”
- **Role of \(\pi(a\mid s)\):** it weights actions by their selection probabilities; Lecture
  1.8 makes this explicit in the Bellman expectation equation.

### Teach-back check

1. What extra condition appears in an action value but not a state value?  
   **Answer:** the first action \(A_t=a\).
2. Can a deterministic policy assign two actions positive probability in one state?  
   **Answer:** no; it selects one action with certainty.

**Recall cue:** `policy chooses; V values a state; Q values a state-action; all values are
expected returns`.

<a id="lecture-1-8"></a>
## Lecture 1.8 — Bellman Equations

**Source:** [1.8 Bellman Equations.pptx](<../../../docs/slides/slides/1.8 Bellman Equations.pptx>)  
**Useful slides:** 3–18, especially equation slides 4–7  
**Demand:** 6 raw / 4 unique; `usable` 2, `review` 2, `verify` 2; **depth D3** because the
equation’s meaning is central and three questions repeat the same claim.  
**Mapped questions:** Q045, Q128, Q186, Q248, Q253, Q313

### Big idea

A Bellman equation is a recursive consistency relationship. It decomposes a value into expected
immediate reward plus discounted value after the next transition. This replaces an unwieldy
enumeration of complete futures with relationships among current and successor values (slides
3, 8–18).

For a policy’s state value:

\[
v_\pi(s)=\sum_a\pi(a\mid s)\sum_{s',r}p(s',r\mid s,a)
[r+\gamma v_\pi(s')].
\]

The outer policy weights actions; the dynamics weight possible next-state/reward outcomes; the
bracket is one-step reward plus discounted successor value (slide 4).

The action-value form fixes the current action and then averages the next action under the
policy (slide 5). Optimality equations replace policy averaging at the decision point with a
maximum over actions (slides 6–7).

### One small reasoning step

Under a random policy that chooses four actions equally, an action leading from A to B with
reward +5 contributes one quarter of \([5+\gamma v_\pi(B)]\) to \(v_\pi(A)\). The other action
outcomes contribute their own weighted terms (slides 9–15).

### Contrasts and common traps

- **Expectation equation:** evaluates a specified policy by averaging its actions (slides 4–5).
- **Optimality equation:** describes the best achievable value by maximizing over actions
  (slides 6–7).
- **Equation versus update algorithm:** the equation states a value relationship. Algorithms
  may repeatedly update estimates toward that relationship, but “update rule” is not the
  definition (slides 3, 8, 18). This matters for Q248.
- **Q313 caution:** Bellman equations cover both policy values and optimal values, not only
  calculation of an optimal value function (slides 4–7).

### Teach-back check

1. What two pieces form a Bellman one-step target in words?  
   **Answer:** immediate reward and discounted successor value.
2. What changes from expectation to optimality?  
   **Answer:** action averaging under a policy is replaced by choosing the maximizing action.

**Recall cue:** `current value = expected one-step reward + discounted next value`.

<a id="lecture-1-9"></a>
## Lecture 1.9 — Optimal Policies and Value Functions

**Source:** [1.9 Optimality (Optimal Policies & Value Functions).pptx](<../../../docs/slides/slides/1.9 Optimality (Optimal Policies & Value Functions).pptx>)  
**Useful slides:** 6–19, 24–26  
**Demand:** 3 raw / 3 unique; `review` 2, `verify` 1; **depth D3** because “optimal value” is
frequently confused with one maximum reward.  
**Mapped questions:** Q046, Q139, Q202

### Big idea

An optimal policy is as good as or better than every other policy in expected cumulative
reward. Its value function therefore gives the greatest policy value achievable from each
state. The optimal state and action values are written \(v_*(s)\) and \(q_*(s,a)\) (slides
6–16).

The Bellman optimality equations express these values without first naming a policy. Once
\(v_*\) is known, an optimal action is an `argmax`: the action that achieves the maximum
one-step expected reward-plus-next-value expression. The maximum is a value; the argmax is the
action (slides 15–19).

### One small reasoning step

If action left gives a larger expected one-step reward plus discounted optimal successor value
than action right, left belongs to a greedy optimal policy in that state. The comparison is
between expected returns, not just the two immediate rewards (slides 17–20).

### Contrasts and common traps

- **Optimal value:** maximum expected cumulative return over policies (slides 7–16, 26).
- **Maximum reward:** one immediate outcome; this is too narrow for Q202.
- **\(v_*\) versus \(\pi_*\):** \(v_*\) records the best value; \(\pi_*\) selects an action
  attaining it (slides 19–20).
- **Q139 evidence gap:** slide 12 says direct solution is limited to small MDPs, but this Course
  1 deck does not introduce DQN or function approximation. The supplied DQN answer requires
  later-course evidence and must not be taught as a Course 1 slide claim.

### Teach-back check

1. Why is “largest immediate reward” not the definition of optimal value?  
   **Answer:** optimal value is the largest expected cumulative return, including future
   consequences.
2. What is the difference between `max` and `argmax`?  
   **Answer:** `max` is the best value; `argmax` is an action achieving that value.

**Recall cue:** `v* = best expected return; π* = action choice that attains it`.

<a id="lecture-1-10"></a>
## Lecture 1.10 — Policy Evaluation (Prediction)

**Source:** [1.10 Policy Evaluation (Prediction).pptx](<../../../docs/slides/slides/1.10 Policy Evaluation (Prediction).pptx>)  
**Useful slides:** 2–14, 21–29  
**Demand:** 6 raw / 6 unique; `usable` 3, `review` 2, `verify` 1; **depth D3** because evaluation,
control, convergence, and Bellman consistency are easy to conflate.  
**Mapped questions:** Q040, Q106, Q162, Q214, Q306, Q311

### Big idea

Policy evaluation asks: “How good is this given policy?” Its output is \(v_\pi\). Control asks
for a policy that obtains as much reward as possible. Dynamic programming performs these tasks
when the MDP dynamics \(p\) are known (slides 2–7).

Iterative policy evaluation begins with an arbitrary value estimate and repeatedly applies the
Bellman expectation backup:

\[
v_{k+1}(s)\leftarrow
\sum_a\pi(a\mid s)\sum_{s',r}p(s',r\mid s,a)
[r+\gamma v_k(s')].
\]

For the deck’s setting, repeated sweeps converge toward \(v_\pi\). A practical stopping test
tracks the maximum value change \(\Delta\) and stops when it is below a small threshold
\(\theta\) (slides 8–14, 21–28).

### One small reasoning step

If the largest state-value change in a sweep is smaller than \(\theta\), the algorithm stops
because another sweep is expected to change the approximation only slightly. This is an
accuracy criterion, not proof that the policy itself is optimal (slides 21–28).

### Contrasts and common traps

- **Evaluation/prediction:** compute the value of a fixed policy (slides 3–5).
- **Control:** improve or find a reward-maximizing policy (slides 3, 6).
- **Bellman equation:** the recursive consistency relation used by evaluation, not an
  “objective function” in the sense asserted by Q311 (slides 5, 8–11, 21).
- **Converged value versus optimal policy:** evaluation convergence means the current policy’s
  value has been estimated; improvement is still a separate task.

### Teach-back check

1. What is held fixed during policy evaluation?  
   **Answer:** the policy \(\pi\).
2. What does a small \(\Delta\) indicate?  
   **Answer:** the value estimate changed little in the latest sweep and meets the stopping
   tolerance.

**Recall cue:** `evaluation fixes π and solves for vπ; control changes π`.

<a id="lecture-1-11"></a>
## Lecture 1.11 — Policy Iteration (Control)

**Source:** [1.11 Policy Iteration (Control) .pptx](<../../../docs/slides/slides/1.11 Policy Iteration (Control) .pptx>)  
**Useful slides:** 2–16  
**Demand:** 10 raw / 9 unique; `usable` 6, `review` 2, `verify` 2; **depth D3** because the
evaluation/improvement loop is heavily tested.  
**Mapped questions:** Q015, Q041, Q129, Q147, Q189, Q250, Q262, Q265, Q268, Q304

### Big idea

Policy improvement chooses actions greedily with respect to the current policy’s value
information. If the new policy selects actions whose \(q_\pi\) values are at least as large in
every state, the new policy is at least as good; it is strictly better if at least one
comparison is strict (slides 3–5).

Policy iteration alternates:

1. **evaluation:** compute \(v_{\pi_i}\) for the current policy;
2. **improvement/greedification:** choose actions greedy with respect to that value information,
   producing \(\pi_{i+1}\).

After improvement, the old value function is accurate for the old policy but not yet for the
new one, so evaluation repeats. If improvement leaves the policy unchanged, the deck identifies
the policy as optimal (slides 9–16).

### One small reasoning step

Suppose evaluation says one action has a greater \(q_\pi(s,a)\) than the action currently used
in state \(s\). Greedification switches to that action. The switch improves the policy locally;
the next evaluation then measures the changed policy (slides 3–5, 9–13).

### Contrasts and common traps

- **Evaluation changes values for a fixed policy; improvement changes the policy using those
  values** (slides 9–13).
- **Greedy now versus accurate now:** immediately after improvement, the policy is greedy
  relative to the old value, but that old value is not yet the new policy’s value (slides
  12–14).
- **Control objective:** find a policy maximizing value/return. Exploration is a possible means,
  not the control objective (1.10, slide 3; 1.11, slides 2–3).
- **Q015/Q304 evidence gap:** the deck presents policy iteration for a given MDP. It does not
  explain adaptation to changed dynamics, conditions, or goals. Claims of automatic robustness
  or gradual adaptation are unsupported by slides 1–19.

### Teach-back check

1. Why must evaluation run again after policy improvement?  
   **Answer:** the old value function describes the old policy, not the newly improved policy.
2. What is greedification?  
   **Answer:** updating the policy to select actions that maximize the current value-based
   one-step expression.

**Recall cue:** `evaluate π → greedify → value becomes stale → evaluate again`.

<a id="lecture-1-12"></a>
## Lecture 1.12 — Generalized Policy Iteration

**Source:** [1.12 Generalized Policy Iteration.pptx](<../../../docs/slides/slides/1.12 Generalized Policy Iteration.pptx>)  
**Useful slides:** 3–13  
**Demand:** 5 raw / 5 unique; `usable` 1, `review` 2, `verify` 2; **depth D3** because value
iteration and DP assumptions are tested with overbroad wording.  
**Mapped questions:** Q011, Q080, Q222, Q245, Q303

### Big idea

Generalized policy iteration (GPI) is the interaction of evaluation and improvement processes.
They need not run as two fully separated, completed phases; they can progress in a coordinated
way toward an optimal policy and value function (slides 3–5).

Value iteration is the deck’s key example. It performs one sweep of value updates and then
greedifies again instead of completing policy evaluation before every improvement (slides
6–7). Synchronous DP sweeps all states in an iteration. Asynchronous DP updates states one at a
time in some order and may use the newest estimates immediately (slides 8–13).

### One small reasoning step

Policy iteration may perform many evaluation sweeps before greedifying. Value iteration
truncates that evaluation to one sweep, then improves again. Both still express the GPI
interaction between value estimation and policy improvement (slides 3–7).

### Contrasts and common traps

- **Policy iteration:** evaluation and improvement appear as distinct phases (1.11, slides
  9–16).
- **Value iteration:** one value sweep followed by renewed greedification (slides 6–7).
- **Synchronous versus asynchronous:** all states per sweep versus selected states one at a
  time (slides 8–13).
- **Model requirement:** the preceding policy-evaluation deck states that DP computes values
  and policies given MDP dynamics \(p\) (1.10, slide 7).
- **Q080 evidence gap:** slides 8–13 discuss qualitative computational suitability, not a
  universal polynomial time-complexity class.
- **Q303 evidence gap:** the deck names value iteration and synchronous/asynchronous DP; it does
  not discuss stochastic gradient descent. The supplied “not an MDP method” claim is outside
  this deck’s evidence.

### Teach-back check

1. What does value iteration omit compared with full policy iteration?  
   **Answer:** it does not run policy evaluation to completion before greedifying again.
2. What distinguishes asynchronous DP?  
   **Answer:** it updates selected values one at a time rather than sweeping every state in
   lockstep.

**Recall cue:** `GPI = evaluation and improvement interacting; value iteration = one sweep then
greedify`.

<a id="course-1-cheat-sheet"></a>
## Course 1 Compact Recall Sheet

| If asked about… | Recall this |
|---|---|
| Reward | Immediate scalar feedback from the environment |
| Return | Accumulated future reward, often discounted |
| Action value in a bandit | Expected reward of one action |
| Exploration / exploitation | Learn about alternatives / use the best current estimate |
| MDP dynamics | \(p(s',r\mid s,a)\): next-state/reward distribution |
| Episodic / continuing | Terminal episodes / no natural terminal state |
| Policy | Deterministic action or stochastic action distribution per state |
| \(v_\pi(s)\) / \(q_\pi(s,a)\) | Expected return from state / from state plus first action |
| Bellman expectation / optimality | Average under \(\pi\) / maximize over actions |
| Evaluation / control | Find \(v_\pi\) / find a reward-maximizing policy |
| Policy iteration | Evaluate, greedify, repeat |
| GPI / value iteration | Interacting evaluation-improvement / one value sweep then greedify |

## Course 1 Mastery Checkpoint

Explain these without looking at options:

1. Why are reward, return, and value three different quantities?
2. Why does a bandit omit a difficulty that an MDP must solve?
3. How do \(V\) and \(Q\) differ?
4. What changes mathematically from a Bellman expectation equation to an optimality equation?
5. Why is a value function stale immediately after policy improvement?
6. Why does value iteration still count as generalized policy iteration?

**Checkpoint answers, compressed:** reward is immediate, return accumulates rewards, and value
is expected return; MDP actions affect future states; \(Q\) also conditions on the first action;
policy averaging becomes maximization; the improved policy has different future actions; value
iteration still alternates partial evaluation with improvement.
