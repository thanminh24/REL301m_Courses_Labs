# REL301m Complete Learning Guide

> **Canonical exam guide.** This manual is built for the supplied Q001–Q317 bank. The question
> bank determines emphasis. Evidence priority is local lecture slides, the local Sutton–Barto
> reference book, official public Coursera course descriptions, then the supplied test-bank key.
> It covers conceptual understanding only: definitions, explanations, contrasts, and one small
> reasoning step. It does not require code tracing, debugging, or full derivations.

<a id="start-here"></a>
## Start here

The exam bank is broad but shallow. Most items ask you to recognize a definition or distinguish
two nearby ideas. Memorizing letters is unsafe because the bank is shuffled, answer positions
are imbalanced, and some supplied questions are defective. Learn a compact mental model, explain
each concept without options, then use the questions as a diagnostic.

### Source and editorial rules

1. Q001–Q317 define what needs emphasis.
2. The 39 local lecture decks define what is lecture-verified; test occurrence defines canon.
3. Original stems, choices, and supplied answers remain visible in the appendix.
4. A supplied answer is the available test-bank key, not automatic conceptual truth. Editorial
   verdicts identify caveats, incorrect keys, and bank-key-only items.
5. The guide is self-contained for study; book pages and official public course links provide
   an evidence trail rather than required extra reading.

### Coverage snapshot

| Answer-evidence tier | Questions | Role in this guide |
|---|---:|---|
| Local slides | 225 | primary answer-bearing lecture evidence |
| Sutton–Barto book | 54 | page-level fallback, visibly marked as book-supported |
| Official public Coursera | 0 | curriculum confirmation; no unique additional answer evidence |
| Question bank only | 38 | supplied exam key retained with an evidence warning |
| **Total canonical** | **317** | complete required exam route |

The source audit labels 140 items usable, 89 review, 47 verify, and 41 discard. “Review” means
the item can still prompt learning but may oversimplify. “Verify” means its supplied answer or
options require an explicit correction.

---

<a id="how-to-learn"></a>
## How to learn from this guide

### The default loop

1. **Preview:** read a lecture’s big idea, depth, and confusion notes.
2. **Explain:** close the section and explain the idea aloud without answer choices.
3. **Retrieve:** answer the lecture’s mapped questions.
4. **Repair:** for each miss, identify the failed distinction and reread only that passage.
5. **Retry:** answer again with the options hidden, then check the choices.
6. **Space:** repeat missed prompts after one day and three days.

A topic is learned when you can define it, distinguish it from its closest neighbor, and answer
one “what changes if…” question. Recognizing a familiar sentence is not enough.

### Three routes

- **Full-course route:** Course 1 → Course 2 → Course 3, lecture order. Spend most time on D3,
  then D2; scan D1/D0.
- **Exam-refresh route:** read the mental model and confusion matrix, then complete all Q001–Q317.
  For `bank-key-only` items, recall the supplied test answer and the evidence warning together.
- **Weak-topic route:** missed Q ID → its primary lecture link → teach-back prompt → retry the
  question without options.

### Depth labels

| Level | What mastery means |
|---|---|
| D0 | recognize framing or course organization |
| D1 | state a definition or role |
| D2 | explain the idea and contrast it with a neighbor |
| D3 | do D2 plus one small interpretation or inference |
| D4 | derivation, code, debugging, or multi-step trace — outside this exam route |

---

<a id="whole-course-mental-model"></a>
## Whole-course mental model

Reinforcement learning studies an **agent** repeatedly choosing **actions** in an
**environment**. The environment returns a new **state** and a scalar **reward**. The agent’s
goal is not usually the next reward alone; it is a policy that maximizes expected long-run
return.

```text
Course 1: define the decision problem
  bandits -> MDP -> return -> policy/value -> Bellman equations -> DP/GPI

Course 2: learn values and control from sampled experience
  Monte Carlo -> off-policy correction -> TD -> Sarsa/Q-learning/Expected Sarsa
  -> models -> planning -> Dyna

Course 3: scale and learn policies directly
  parameterized values -> features -> approximate control -> average reward
  -> parameterized policy -> policy gradient -> actor–critic
```

Every algorithm in the bank can be located with four questions:

1. **Prediction or control?** Evaluate a fixed policy, or improve/find a policy?
2. **Model or samples?** Use known transition probabilities, real experience, or simulated
   experience from a model?
3. **Target type?** Full return, sampled bootstrap, expectation, or maximum?
4. **Representation?** Table, parameterized value, or direct parameterized policy?

---

<a id="notation-glossary"></a>
## Notation and formula interpretation

| Symbol | Meaning |
|---|---|
| \(S_t,A_t,R_{t+1}\) | state, action, and following reward at time \(t\) |
| \(\pi(a\mid s)\) | probability a policy assigns action \(a\) in state \(s\) |
| \(G_t\) | return: accumulated future reward from time \(t\) |
| \(\gamma\) | discount factor controlling weight on later reward |
| \(v_\pi(s)\) | expected return from state \(s\) under policy \(\pi\) |
| \(q_\pi(s,a)\) | expected return after action \(a\) in \(s\), then following \(\pi\) |
| \(v_*,q_*\) | optimal state and action values |
| \(\alpha\) | learning rate or step size |
| \(\varepsilon\) | probability of random exploration in epsilon-greedy |
| \(\delta_t\) | TD error: target minus current estimate |
| \(b\) | behavior policy generating experience |
| \(\rho\) | target/behavior probability ratio for importance sampling |
| \(\mathbf x(s)\) | feature vector representing state \(s\) |
| \(\mathbf w\) | adjustable value-function weights |
| \(\theta\) | adjustable policy parameters |
| \(\mu(s)\) | state weighting or long-run visitation frequency |
| \(\bar R_\pi\) | long-run average reward per time step |

### Formula meanings worth knowing

- **Return:** \(G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots\). It combines future
  rewards; it is not an immediate reward.
- **Incremental update:** `new estimate = old estimate + step size × error`. Bandit, MC, TD,
  and approximation updates share this shape.
- **Bellman expectation equation:** current value equals expected immediate reward plus
  discounted value of what follows under a policy.
- **Bellman optimality equation:** replaces the policy-weighted action choice with the best
  action.
- **TD error:** observed reward plus bootstrapped next estimate minus current estimate.
- **Linear approximation:** value is a weighted sum of active features.
- **Policy gradient:** change policy parameters in a direction expected to improve performance.

---

<a id="cross-course-comparisons"></a>
## Cross-course comparison sheets

### Reward, return, value, and policy

| Term | Question it answers |
|---|---|
| Reward | What scalar feedback arrived on this transition? |
| Return | How much reward accumulates from now onward? |
| Value | What return is expected from this state or state–action pair? |
| Policy | How are actions selected in each state? |

### Prediction versus control

| Prediction | Control |
|---|---|
| evaluate a given policy | improve or find a good/optimal policy |
| estimate \(v_\pi\) or \(q_\pi\) | learn behavior that maximizes expected return |
| policy stays conceptually fixed | evaluation and improvement interact |

### DP, Monte Carlo, and TD

| Property | Dynamic programming | Monte Carlo | Temporal difference |
|---|---|---|---|
| Needs environment model | yes | no | no |
| Needs complete episode | no | yes | no |
| Bootstraps | yes | no | yes |
| Update source | expected transitions | sampled full return | sampled reward + next estimate |

### Sarsa, Q-learning, and Expected Sarsa

| Method | Next-value target | Policy relation |
|---|---|---|
| Sarsa | sampled \(Q(S',A')\) | on-policy |
| Q-learning | \(\max_a Q(S',a)\) | off-policy relative to exploratory behavior |
| Expected Sarsa | \(\sum_a\pi(a\mid S')Q(S',a)\) | on- or off-policy depending on target policy |

### On-policy versus off-policy

| On-policy | Off-policy |
|---|---|
| learns about the policy generating behavior | learns a target policy from another behavior policy |
| behavior and target coincide | behavior must cover actions the target may take |
| no behavior/target correction needed | may require importance sampling or an off-policy target |

### Models, planning, and Dyna

| Term | Meaning |
|---|---|
| Model | predicts next state/reward or their distribution |
| Direct RL | updates from real environment transitions |
| Planning | updates from simulated/model-generated transitions |
| Dyna | interleaves direct learning, model learning, planning, and acting |

### Representation and objective

| Approach | Learned object | Main signal |
|---|---|---|
| Tabular value | one value per state/action | return or bootstrap target |
| Approximate value | weights shared through features | prediction/TD error |
| Policy gradient | policy parameters | sampled performance gradient |
| Actor–critic | policy plus value critic | critic’s TD/advantage signal |

---

<a id="common-confusions"></a>
## Common confusions and defective-question warnings

- **Exploration is a means, not the control objective.** Control seeks a policy maximizing
  expected return.
- **Reward is not value.** Reward is immediate feedback; value is expected accumulated return.
- **Q is notation, not an acronym.** \(Q(s,a)\) is an action-value function.
- **Bellman equation is a relationship.** Algorithms use Bellman backups; the equation is not
  itself only one algorithm.
- **Off-policy does not mean imaginary actions.** Experience comes from actions actually taken
  by behavior policy \(b\); learning concerns target policy \(\pi\).
- **Importance sampling is not automatically variance reduction.** It corrects distributions
  and may have very high variance.
- **Expected Sarsa is not always on-policy.** Its status depends on whether the expectation
  policy matches behavior.
- **A sample model is not Monte Carlo value estimation.** A model generates possible
  transitions; MC estimation uses sampled episode returns.
- **Linear approximation does not inherently overfit or underfit.** Features, data, and capacity
  determine the failure.
- **Preferences are not action values.** Softmax can use arbitrary relative scores.
- **Actor–critic is not universally fastest or most stable.** A critic can reduce variance while
  adding approximation bias.
- **Sparse reward does not invalidate average reward.** It makes finite-sample learning harder.

When an appendix entry is marked **incorrect**, retain both facts: the supplied letter may be the
test-bank key, while the editorial correction is the concept to understand. When it is marked
**bank-key-only**, learn the supplied answer for exam recall but do not claim the slides prove it.

---

## Table of contents

- [Start here](#start-here)
- [How to learn](#how-to-learn)
- [Whole-course mental model](#whole-course-mental-model)
- [Notation and formula interpretation](#notation-glossary)
- [Cross-course comparisons](#cross-course-comparisons)
- [Common confusions](#common-confusions)
- [Local lecture source coverage](#source-coverage)
- [Course introduction](#course-introduction)
- Course 1
  - [Lecture 1.1](#lecture-1-1)
  - [Lecture 1.2](#lecture-1-2)
  - [Lecture 1.3](#lecture-1-3)
  - [Lecture 1.4](#lecture-1-4)
  - [Lecture 1.5](#lecture-1-5)
  - [Lecture 1.6](#lecture-1-6)
  - [Lecture 1.7](#lecture-1-7)
  - [Lecture 1.8](#lecture-1-8)
  - [Lecture 1.9](#lecture-1-9)
  - [Lecture 1.10](#lecture-1-10)
  - [Lecture 1.11](#lecture-1-11)
  - [Lecture 1.12](#lecture-1-12)
  - [Course 1 cheat sheet](#course-1-cheat-sheet)
- Course 2
  - [Lecture 2.1](#lecture-2-1)
  - [Lecture 2.2](#lecture-2-2)
  - [Lecture 2.3](#lecture-2-3)
  - [Lecture 2.4](#lecture-2-4)
  - [Lecture 2.5](#lecture-2-5)
  - [Lecture 2.6](#lecture-2-6)
  - [Lecture 2.7](#lecture-2-7)
  - [Lecture 2.8](#lecture-2-8)
  - [Lecture 2.9](#lecture-2-9)
  - [Lecture 2.10](#lecture-2-10)
  - [Lecture 2.11](#lecture-2-11)
  - [Lecture 2.12](#lecture-2-12)
  - [Lecture 2.13](#lecture-2-13)
  - [Course 2 cheat sheet](#course-2-cheat-sheet)
- Course 3
  - [Lecture 3.1](#lecture-3-1)
  - [Lecture 3.2](#lecture-3-2)
  - [Lecture 3.3](#lecture-3-3)
  - [Lecture 3.4](#lecture-3-4)
  - [Lecture 3.5](#lecture-3-5)
  - [Lecture 3.6](#lecture-3-6)
  - [Lecture 3.7](#lecture-3-7)
  - [Lecture 3.8](#lecture-3-8)
  - [Lecture 3.9](#lecture-3-9)
  - [Lecture 3.10](#lecture-3-10)
  - [Lecture 3.11](#lecture-3-11)
  - [Lecture 3.12](#lecture-3-12)
  - [Course 3 cheat sheet](#course-3-cheat-sheet)
- [Final course review](#course-review)
- [Question navigation](#question-navigation)
- [Canonical source supplements](#canonical-source-supplements)
- [Full Q001–Q317 bank](#full-question-bank)

---

<a id="source-coverage"></a>
## Local lecture source coverage

All 39 local decks are represented. The 37 `.pptx` decks contain 713 slides. The two legacy `.ppt` decks are retained as framing sources; their binary format does not expose a reliable slide count with the available local tools.

| Deck | Slides | Question contexts | Depth |
|---|---:|---:|---|
| `0. Course Introduction.ppt` | legacy | 0 | D0 |
| `1.1. The K-Armed Bandit Problem.pptx` | 18 | 3 | D3 |
| `1.2. Estimating Action Values.pptx` | 13 | 3 | D3 |
| `1.3 Exploration vs. Exploitation Tradeoff.pptx` | 20 | 15 | D3 |
| `1.4 Introduction to Markov Decision Processes  .pptx` | 15 | 4 | D3 |
| `1.5 Goal of Reinforcement Learning .pptx` | 19 | 9 | D3 |
| `1.6 Continuing Tasks.pptx` | 18 | 5 | D3 |
| `1.7 Policies and Value Functions.pptx` | 23 | 12 | D3 |
| `1.8 Bellman Equations.pptx` | 20 | 9 | D3 |
| `1.9 Optimality (Optimal Policies & Value Functions).pptx` | 28 | 2 | D3 |
| `1.10 Policy Evaluation (Prediction).pptx` | 30 | 6 | D3 |
| `1.11 Policy Iteration (Control) .pptx` | 19 | 9 | D3 |
| `1.12 Generalized Policy Iteration.pptx` | 15 | 4 | D3 |
| `2.1 Introduction to Monte-Carlo Methods .pptx` | 23 | 11 | D3 |
| `2.2 Monte-Carlo for Control.pptx` | 24 | 2 | D3 |
| `2.3 Exploration Methods for Monte-Carlo.pptx` | 13 | 1 | D2 |
| `2.4 Off-policy learning for prediction.pptx` | 19 | 10 | D3 |
| `2.5 Introduction to Temporal Difference Learning.pptx` | 17 | 11 | D3 |
| `2.6 Advantages of Temporal Difference.pptx` | 19 | 12 | D3 |
| `2.7 Temporal Difference for Control.pptx` | 18 | 9 | D3 |
| `2.8 Off-policy Temporal Difference Control Q-learning .pptx` | 18 | 17 | D3 |
| `2.9 Expected Sarsa.pptx` | 17 | 14 | D3 |
| `2.10 Define model in Reinforcement Learning.pptx` | 23 | 10 | D3 |
| `2.11 Define Planning in Reinforcement Learning.pptx` | 13 | 7 | D3 |
| `2.12 Dyna as a formalism for planning.pptx` | 24 | 5 | D3 |
| `2.13 Dealing with inaccurate models .pptx` | 20 | 1 | D2 |
| `3.1 Estimating Value Functions as Supervised Learning .pptx` | 30 | 7 | D3 |
| `3.2 The Objective for On-policy Prediction .pptx` | 23 | 14 | D3 |
| `3.3 The Objective for Temporal Difference.pptx` | 18 | 3 | D3 |
| `3.4 Linear Temporal Difference.pptx` | 15 | 2 | D2 |
| `3.5 Feature Construction for Linear Methods.pptx` | 23 | 11 | D3 |
| `3.6 Episodic Sarsa with Function Approximation.pptx` | 25 | 2 | D2 |
| `3.7 Exploration under Function Approximation.pptx` | 13 | 3 | D2 |
| `3.8 Understand Average Reward.pptx` | 22 | 5 | D3 |
| `3.9 Learning Parameterized Policies.pptx` | 13 | 10 | D3 |
| `3.10 Policy Gradient for Continuing Tasks.pptx` | 13 | 10 | D3 |
| `3.11 Actor-Critic for Continuing Tasks.pptx` | 17 | 12 | D3 |
| `3.12 Policy Parameterizations.pptx` | 15 | 4 | D3 |
| `6. Review course .ppt` | legacy | 0 | D0 |

**Reconciled `.pptx` slide total:** 713.

---

## Supplemental reference coverage

- **Sutton–Barto book:** 54 questions use page-level evidence from [the local 548-page PDF](1-Reinforcement Learning-An introduction.pdf).
- **Official public Coursera pages:** 0 questions use a public page as direct answer evidence. The pages still confirm the course sequence: [Course 1](https://www.coursera.org/learn/fundamentals-of-reinforcement-learning), [Course 2](https://www.coursera.org/learn/sample-based-learning-methods), and [Course 3](https://www.coursera.org/learn/prediction-control-function-approximation).
- **Question bank only:** 38 questions have no answer-enabling passage in the allowed references and remain visibly marked.

No gated Coursera videos, transcripts, quizzes, or assignments were accessed.

---

<a id="course-introduction"></a>
## Course introduction — how the lectures fit together

**Demand:** framing only · **Depth:** D0 · **Mapped questions:** none directly.  
**Evidence:** `0. Course Introduction.ppt`, course-objective and course-plan sections.

The introduction organizes REL301m into three conceptual blocks:

1. fundamentals: bandits, MDPs, objectives, values, Bellman equations, and dynamic programming;
2. sample-based methods: Monte Carlo, TD control, models, planning, and Dyna;
3. prediction/control with approximation: parameterized values, features, average reward,
   parameterized policies, policy gradient, and actor–critic.

The exam bank follows the same progression. Use this chapter only as a map; the numbered
lecture chapters provide the answer-enabling detail.

**Recall cue:** `define the problem -> learn from samples -> scale and learn policies directly`.

---

---

# Course 1 Learning Fragment

## Scope and evidence convention

This fragment is the Course 1 teaching layer for the REL301m exam guide. The
[question index](final-exam-revision-question-index.md) controls emphasis; the
twelve local Course 1 decks control conceptual claims. A slide citation is one-based. “Bank
claim” means the supplied answer is preserved for later adjudication, not accepted as truth.

Course 1 contains 81 mapped questions: 48 `usable`, 23 `review`, and 10 `verify`. The exact
duplicate family Q045/Q248/Q253 and high-similarity pair Q189/Q268 reduce the count to 78
question-demand families. Unsupported wording is flagged where the nearest deck does not teach
the exact idea.

<a id="lecture-1-1"></a>
## Lecture 1.1 — The k-Armed Bandit Problem

**Source:** [1.1. The K-Armed Bandit Problem.pptx](<slides/slides/1.1. The K-Armed Bandit Problem.pptx>)  
**Useful slides:** 4–6, 9–15  
**Demand:** 1 raw / 1 unique; `usable` 1; **depth D2** because the problem is a prerequisite for
1.2–1.3.  
**Demand and related practice:** Q157

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

**Source:** [1.2. Estimating Action Values.pptx](<slides/slides/1.2. Estimating Action Values.pptx>)  
**Useful slides:** 3–11  
**Demand:** 2 raw / 2 unique; `usable` 2; **depth D2** because estimation is the bridge from
unknown values to action selection.  
**Demand and related practice:** Q217, Q238

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

**Source:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](<slides/slides/1.3 Exploration vs. Exploitation Tradeoff.pptx>)  
**Useful slides:** 3–15  
**Demand:** 18 raw / 18 unique; `usable` 11, `review` 5, `verify` 2; **depth D3** because this is
high-demand and contains several misleading bank variants.  
**Demand and related practice:** Q006, Q018, Q020, Q053, Q064, Q070, Q078, Q095, Q096, Q124, Q132, Q149,
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

**Source:** [1.4 Introduction to Markov Decision Processes  .pptx](<slides/slides/1.4 Introduction to Markov Decision Processes  .pptx>)  
**Useful slides:** 3–13  
**Demand:** 4 raw / 4 unique; `usable` 3, `review` 1; **depth D3** because MDP vocabulary and
dynamics support all later value equations.  
**Demand and related practice:** Q088, Q216, Q271, Q317

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

**Source:** [1.5 Goal of Reinforcement Learning .pptx](<slides/slides/1.5 Goal of Reinforcement Learning .pptx>)  
**Useful slides:** 4–5, 7–17  
**Demand:** 8 raw / 8 unique; `usable` 6, `review` 2; **depth D3** because reward, objective,
and episodic structure are frequent sources of category confusion.  
**Demand and related practice:** Q025, Q036, Q069, Q100, Q138, Q142, Q204, Q312

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

**Source:** [1.6 Continuing Tasks.pptx](<slides/slides/1.6 Continuing Tasks.pptx>)  
**Useful slides:** 3–15  
**Demand:** 6 raw / 6 unique; `usable` 5, `review` 1; **depth D3** because task type and discount
interpretation are directly tested.  
**Demand and related practice:** Q052, Q065, Q082, Q127, Q144, Q308

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

**Source:** [1.7 Policies and Value Functions.pptx](<slides/slides/1.7 Policies and Value Functions.pptx>)  
**Useful slides:** 3–18  
**Demand:** 12 raw / 12 unique; `usable` 8, `review` 4; **depth D3** because policy, \(V\), and
\(Q\) anchor the rest of the course.  
**Demand and related practice:** Q031, Q061, Q068, Q090, Q097, Q141, Q167, Q206, Q211, Q261, Q309, Q310

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

**Source:** [1.8 Bellman Equations.pptx](<slides/slides/1.8 Bellman Equations.pptx>)  
**Useful slides:** 3–18, especially equation slides 4–7  
**Demand:** 6 raw / 4 unique; `usable` 2, `review` 2, `verify` 2; **depth D3** because the
equation’s meaning is central and three questions repeat the same claim.  
**Demand and related practice:** Q045, Q128, Q186, Q248, Q253, Q313

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

**Source:** [1.9 Optimality (Optimal Policies & Value Functions).pptx](<slides/slides/1.9 Optimality (Optimal Policies & Value Functions).pptx>)  
**Useful slides:** 6–19, 24–26  
**Demand:** 3 raw / 3 unique; `review` 2, `verify` 1; **depth D3** because “optimal value” is
frequently confused with one maximum reward.  
**Demand and related practice:** Q046, Q139, Q202

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

**Source:** [1.10 Policy Evaluation (Prediction).pptx](<slides/slides/1.10 Policy Evaluation (Prediction).pptx>)  
**Useful slides:** 2–14, 21–29  
**Demand:** 6 raw / 6 unique; `usable` 3, `review` 2, `verify` 1; **depth D3** because evaluation,
control, convergence, and Bellman consistency are easy to conflate.  
**Demand and related practice:** Q040, Q106, Q162, Q214, Q306, Q311

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

**Source:** [1.11 Policy Iteration (Control) .pptx](<slides/slides/1.11 Policy Iteration (Control) .pptx>)  
**Useful slides:** 2–16  
**Demand:** 10 raw / 9 unique; `usable` 6, `review` 2, `verify` 2; **depth D3** because the
evaluation/improvement loop is heavily tested.  
**Demand and related practice:** Q015, Q041, Q129, Q147, Q189, Q250, Q262, Q265, Q268, Q304

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

**Source:** [1.12 Generalized Policy Iteration.pptx](<slides/slides/1.12 Generalized Policy Iteration.pptx>)  
**Useful slides:** 3–13  
**Demand:** 5 raw / 5 unique; `usable` 1, `review` 2, `verify` 2; **depth D3** because value
iteration and DP assumptions are tested with overbroad wording.  
**Demand and related practice:** Q011, Q080, Q222, Q245, Q303

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

---

# Course 2 — Sample-Based Learning, Control, Models, and Planning

## Source boundary and coverage

This fragment teaches the 110 questions tagged `C2-M2`–`C2-M5` in the audited
[question index](final-exam-revision-question-index.md). The 13 Course 2 decks are
the conceptual authority; the bank controls emphasis and exposes traps. A supplied answer is
therefore a claim to check, not an automatic fact.

Depth means:

- **D1:** recognize and define;
- **D2:** explain and distinguish;
- **D3:** do D2 and interpret one small target, equation, or scenario.

The chapters deliberately stop before derivations, code, multi-step traces, and debugging.
“Exact-unique” below collapses only literally repeated stems; near-duplicates still appear in the
mapped IDs and are discussed as one learning family where appropriate.

| Lecture | Raw / exact-unique | Quality mix | Depth |
|---|---:|---|---|
| 2.1 Monte Carlo prediction | 11 / 11 | 7 usable, 3 review, 1 verify | D3 |
| 2.2 Monte Carlo control | 2 / 2 | 2 verify | D3 |
| 2.3 MC exploration methods | 1 / 1 | 1 verify | D2 |
| 2.4 Off-policy prediction | 10 / 10 | 4 usable, 3 review, 3 verify | D3 |
| 2.5 TD foundations | 11 / 10 | 5 usable, 4 review, 2 verify | D3 |
| 2.6 Advantages of TD | 12 / 10 | 6 usable, 4 review, 2 verify | D3 |
| 2.7 Sarsa control | 9 / 9 | 5 usable, 4 review | D3 |
| 2.8 Q-learning | 17 / 17 | 13 usable, 4 review | D3 |
| 2.9 Expected Sarsa | 14 / 13 | 8 usable, 4 review, 2 verify | D3 |
| 2.10 Models | 10 / 10 | 3 usable, 3 review, 4 verify | D3 |
| 2.11 Planning | 7 / 7 | 2 usable, 3 review, 2 verify | D3 |
| 2.12 Dyna | 5 / 4 | 1 usable, 4 verify | D3 |
| 2.13 Inaccurate models | 1 / 1 | 1 review | D2 |

---

<a id="lecture-2-1"></a>
## 2.1 — Introduction to Monte Carlo methods

**Source:** [2.1 Introduction to Monte-Carlo Methods .pptx](<slides/slides/2.1 Introduction to Monte-Carlo Methods .pptx>),
especially slides 3–12 and 15–21.  
**Demand and related practice:** Q073, Q146, Q158, Q160, Q166, Q172, Q180, Q188, Q259, Q276, Q278.  
**Depth:** D3 because the bank repeatedly tests sampling, episodes, returns, policy evaluation,
and the MC/TD boundary.

### Learn it

Monte Carlo (MC) methods learn from sampled trajectories or episodes. For prediction, follow a
fixed policy, observe returns from a state, and estimate that state's value by averaging those
observed returns. More samples make the sample average a better empirical estimate of expected
return; the deck motivates this with dice and repeated state returns. MC does not require a
transition model. (Slides 3–8.)

An episode is the state–action–reward sequence that ends at a terminal state. The deck's MC
algorithm first generates a complete episode under policy \(\pi\), then moves backward through it,
forming \(G \leftarrow \gamma G + R_{t+1}\), storing the return for \(S_t\), and averaging the
stored returns. The policy therefore determines how the experience used for evaluation is
generated. (Slides 7–12, especially the visual algorithm on slide 9.)

Do not confuse:

- **reward**: one immediate signal;
- **return \(G_t\)**: the discounted accumulation from time \(t\);
- **value \(V_\pi(s)\)**: the expected return after starting in \(s\) and following \(\pi\).

The deck's return example shows why a return contains later rewards, while its prediction
examples show why many realized returns are averaged into a value estimate. (Slides 5, 8–12,
15–17.)

**One small reasoning step.** If two visits to the same state produce returns \(+1\) and \(-1\),
the MC estimate after those two recorded samples is their average, \(0\). No environment model or
bootstrap estimate is used in that step; the evidence is the completed sampled returns. This is
the direct averaging mechanism shown on slides 5–6 and 16–17.

### Traps and question cautions

- “MC updates only at episode end” is the deck's intended contrast: the return is available after
  termination, unlike a one-step TD target. Do not turn that into a claim that every possible MC
  variant in all settings must be implemented identically. (Slides 7, 9; Q158, Q278.)
- Q188 names first-visit MC, but the displayed algorithm appends a return for every encountered
  \(S_t\). The deck does not explicitly teach the first-visit/every-visit distinction. Preserve
  the bank's audit warning: both methods average returns; which visits count is the missing
  distinction.
- “More samples” improves the empirical estimate in the deck's explanation, but Q160 correctly
  reminds us that many episodes may be needed. (Slides 4–6.)

### Teach-back checks

1. Why must the deck's MC predictor wait for a completed episode?
2. Explain reward, return, and value without using any option text.
3. What role does policy \(\pi\) play in MC prediction?

**Compact recall cue:** **MC = complete episode → realized returns → average.**

---

<a id="lecture-2-2"></a>
## 2.2 — Monte Carlo for control

**Source:** [2.2 Monte-Carlo for Control.pptx](<slides/slides/2.2 Monte-Carlo for Control.pptx>),
especially slides 3–13 and 17–20.  
**Demand and related practice:** Q224, Q279.  
**Depth:** D3 despite low raw demand because action values and maintained exploration connect MC
prediction to control, and both mapped questions are defective or ambiguous.

### Learn it

Prediction estimates the value of a fixed policy; control seeks a better policy. MC control
therefore learns action values \(Q(s,a)\): collect returns after a state–action pair under a
policy, average them, and compare the actions available in the same state. A greedy improvement
then selects the action with the highest current estimate. (Slides 3–5, 10–12.)

The central coverage problem is simple: a deterministic policy never selects some actions, so
the agent cannot observe their returns and cannot estimate their action values accurately. The
deck's response is **exploring starts**—every state–action pair must have a positive chance to
start an episode. MC evaluation and greedy improvement can then alternate as generalized policy
iteration (GPI). (Slides 6–11.)

**One small reasoning step.** If `stick` has sampled value \(1\) and `hit` has current value \(0\)
in the same blackjack state, greedy improvement selects `stick`. This is a policy-improvement
decision from the two action-value estimates, not a new return calculation. (Slides 17–20.)

### Traps and question cautions

- Exploration is needed for **state–action coverage**, not merely to “avoid local optima.”
  Q279's supplied phrase is imprecise; slides 6–9 give the answer-bearing reason.
- Q224 asks for the single method “primarily” used to estimate model-free action values, but
  both MC control here and TD control later do so from experience. The item has no unique
  lecture-grounded answer. (Slides 3–4; compare 2.7 slides 5–10.)

### Teach-back checks

1. Why are action values more useful than state values for greedy policy improvement?
2. What fails when an action has zero probability under the behavior used to collect episodes?
3. State the two interacting parts of GPI in MC control.

**Compact recall cue:** **MC control = estimate \(Q\) + preserve coverage + improve greedily.**

---

<a id="lecture-2-3"></a>
## 2.3 — Exploration methods for Monte Carlo

**Source:** [2.3 Exploration Methods for Monte-Carlo.pptx](<slides/slides/2.3 Exploration Methods for Monte-Carlo.pptx>),
especially slides 3–11.  
**Demand and related practice:** Q171.  
**Depth:** D2 because the deck teaches an important replacement for exploring starts, but the
only mapped question asks about a method the deck does not teach.

### Learn it

Exploring starts may be impossible or unsafe because the agent cannot be placed in every
state–action pair. The deck's self-driving example makes that practical boundary explicit.
(Slides 3–4.)

The alternative taught here is an \(\varepsilon\)-soft policy. Every action has probability at
least \(\varepsilon/|\mathcal A(s)|\), so no action is assigned zero probability.
\(\varepsilon\)-greedy is a special case: usually choose a greedy action, but sometimes select
randomly. Unlike a deterministic policy, it can generate different trajectories from the same
start and maintain coverage during ordinary interaction. (Slides 5–11.)

### Trap and unsupported bank claim

Q171 asks about **Boltzmann exploration** and its drawback. This deck never defines Boltzmann
exploration, temperature, or sensitivity to action-value scale. The supplied answer
“sensitivity to initial conditions” is therefore not supported by any Course 2 slide. Keep the
question flagged rather than inventing a correction from outside the source boundary.

### Teach-back checks

1. Why can exploring starts be impractical?
2. What minimum-probability guarantee defines an \(\varepsilon\)-soft policy?
3. How does stochastic exploration change the trajectories the agent can observe?

**Compact recall cue:** **No exploring starts? Keep every action possible.**

---

<a id="lecture-2-4"></a>
## 2.4 — Off-policy learning for prediction

**Source:** [2.4 Off-policy learning for prediction.pptx](<slides/slides/2.4 Off-policy learning for prediction.pptx>),
especially slides 3, 5–17.  
**Demand and related practice:** Q001, Q017, Q028, Q081, Q110, Q115, Q246, Q272, Q288, Q290.  
**Depth:** D3 because the behavior/target distinction and importance weighting are heavily tested
and several supplied claims overstate variance reduction.

### Learn it

Off-policy learning separates two roles:

- the **behavior policy \(b\)** selects actions and generates data;
- the **target policy \(\pi\)** is the policy whose value is being estimated or improved.

This lets an exploratory behavior policy visit more states while the learner evaluates a
different target policy. On-policy learning is the special case \(b=\pi\). Coverage is mandatory:
if \(\pi(a\mid s)>0\), then \(b(a\mid s)>0\), otherwise the needed target event can never appear
in the behavior data. (Slides 3, 5–10.)

Importance sampling corrects a distribution mismatch. If samples come from \(b\) but the desired
expectation is under \(\pi\), weight a sampled outcome by the ratio
\(\rho(x)=\pi(x)/b(x)\). The deck visually derives this ratio and shows a weighted sample average
for estimating the target expectation from behavior samples. In sequential off-policy MC, the
accumulated product \(W\) plays the analogous role across the relevant action sequence: it
reweights behavior-generated returns toward the target policy. (Slides 11–17, especially visual
equations on slides 12–13.)

**One small reasoning step.** If \(\pi(x)=b(x)\) for a sampled outcome, its importance ratio is
\(1\); that sample needs no distribution correction. This matches the deck's statement that
on-policy learning is the \(b=\pi\) special case. (Slides 10, 12–13.)

### Traps and question cautions

- The target policy is not the policy that collected the data; that is the behavior policy.
- Q028's “more complex proposal” claim is unsupported. The deck supports ratio weighting and
  coverage, not “complexity automatically lowers variance.”
- Q115 and Q246 call importance sampling a variance-reduction technique. The deck makes no such
  guarantee. Do not memorize that universal claim; the mapped evidence only establishes
  correction between sampling and target distributions.
- Slide 4 contains confusing example wording about a random target policy. Use the consistent
  definitions on slides 3 and 5–10.

### Teach-back checks

1. Give one sentence each for the behavior and target policies.
2. Why is the coverage condition necessary?
3. What does an importance ratio correct?
4. Why do Q028, Q115, and Q246 require a warning?

**Compact recall cue:** **Behave with \(b\), learn about \(\pi\), correct with \(\pi/b\).**

---

<a id="lecture-2-5"></a>
## 2.5 — Introduction to temporal-difference learning

**Source:** [2.5 Introduction to Temporal Difference Learning.pptx](<slides/slides/2.5 Introduction to Temporal Difference Learning.pptx>),
especially slides 3–12.  
**Demand and related practice:** Q054, Q105, Q140, Q184, Q187, Q230, Q233, Q242, Q256, Q277, Q289.  
**Depth:** D3 because the TD target and error are prerequisites for all later control methods and
the bank contains multiple wording and objective traps.

### Learn it

TD learning combines sampled experience, as in MC, with bootstrapping from a current estimate, as
in dynamic programming. It is model-free: after observing one transition, it can improve a value
estimate without knowing the environment's transition distribution. (Slide 3.)

For TD(0) prediction:

\[
\text{target}=R_{t+1}+\gamma V(S_{t+1}),\qquad
\delta_t=\text{target}-V(S_t)
\]

\[
V(S_t)\leftarrow V(S_t)+\alpha\delta_t.
\]

The target is immediate reward plus discounted estimated next-state value; the error is target
minus current estimate; \(\alpha\) controls how far the estimate moves. The formula is visually
shown on slides 7 and 9, with term meanings on slides 5–8. The tabular algorithm applies that
update to the entry for the observed state after each transition. (Slides 9–12.)

**One small reasoning step.** If the TD target is larger than the current \(V(S_t)\), then
\(\delta_t>0\), so a positive \(\alpha\) moves \(V(S_t)\) upward. Only the direction is required;
no multi-step trace is needed. (Slides 6–9.)

### Traps and question cautions

- “Difference” means the gap between the one-step target and the current prediction, not merely
  reward minus penalty. (Q289; slides 5–8.)
- Q230 says TD(0)'s main objective is to minimize TD error. The deck frames TD(0) as estimating
  values by moving toward one-step targets; it does not present general gradient descent on
  squared TD error. (Slides 2, 8–12.)
- Q256's options are not a clean algorithm listing. The slide-grounded sequence is: observe
  \(R,S'\), form the target/error, update \(V(S)\), then continue. (Slides 9–12.)
- Q054 inserts exploration–exploitation into TD(0) prediction. The displayed prediction
  algorithm evaluates a supplied policy and has no exploration parameter. Exploration belongs
  to control policy choice, not the definition of the TD(0) value update.

### Teach-back checks

1. Which part of TD comes from sampled experience, and which part is a bootstrap?
2. Define target, TD error, \(\alpha\), and \(\gamma\).
3. Why is “minimize TD error” an unsafe universal description of TD(0)?

**Compact recall cue:** **TD = reward + discounted next estimate − current estimate.**

---

<a id="lecture-2-6"></a>
## 2.6 — Advantages of temporal-difference learning

**Source:** [2.6 Advantages of Temporal Difference.pptx](<slides/slides/2.6 Advantages of Temporal Difference.pptx>),
especially slides 3–6, 8, and 11–17.  
**Demand and related practice:** Q022, Q027, Q032, Q051, Q118, Q133, Q182, Q231, Q247, Q254, Q275, Q282.  
**Depth:** D3 because the MC/TD/DP contrast is a repeated exam family and several stems use weak
proxies such as “less computation.”

### Learn it

TD can update after each transition, so it supports online, incremental learning and does not
need an episode to finish. It bootstraps from the next value estimate and can learn from
incomplete sequences. Like MC, it is model-free; unlike dynamic programming, it does not require
the environment's transition model. (Slides 3–6, 8, 12, 14, 16–17.)

| Method | Evidence used for a value update | Complete episode? | Model? | Bootstrap? |
|---|---|---|---|---|
| Monte Carlo | sampled full return | yes in these decks | no | no |
| TD(0) | sampled reward and next state | no | no | yes |
| Dynamic programming | model-based expectation | no sampled episode required | yes | yes |

The MC/TD rows are explicit in slides 11–17; the TD/DP distinction is supported by the model-free
description on slide 8 and the TD introduction's DP comparison in 2.5 slide 3.

**One small reasoning step.** For an ongoing task with no convenient terminal point, the deck's
MC predictor cannot yet observe a complete return, while TD can update from the next transition.
That is the answer-bearing reason for “online” and “incomplete episode” questions. (Slides 3, 6,
12, 16.)

### Traps and question cautions

- “TD is model-free” distinguishes it from DP, but not from MC: slide 17 says both TD and MC are
  model-free. This makes Q022's wording incomplete.
- “Lower computational complexity” in Q051, Q182, and Q231 is at best a context-dependent proxy.
  The deck's defining advantages are update timing, incomplete sequences, and bootstrapping.
- Q254 and Q282 are exact duplicates; learn one family, retain both IDs.
- Slides 7 and 15 overstate that TD updates themselves “naturally balance” exploration and
  exploitation. The control policy supplies exploration; the TD prediction update alone does
  not choose exploratory actions. Use the precise claims on slides 3–6 and 8.

### Teach-back checks

1. Why can TD learn before an episode terminates?
2. Which two methods are model-free in the MC/TD comparison?
3. State one precise advantage of TD without saying “always faster” or “always cheaper.”

**Compact recall cue:** **MC waits; TD bootstraps now; DP needs the model.**

---

<a id="lecture-2-7"></a>
## 2.7 — Temporal-difference control and Sarsa

**Source:** [2.7 Temporal Difference for Control.pptx](<slides/slides/2.7 Temporal Difference for Control.pptx>),
especially slides 3–10.  
**Demand and related practice:** Q059, Q126, Q195, Q199, Q213, Q221, Q228, Q266, Q285.  
**Depth:** D3 because learners must identify the sampled next-action target and distinguish
on-policy Sarsa from Q-learning.

### Learn it

Sarsa applies TD learning to action values inside GPI. Its name records the transition tuple:
State, Action, Reward, next State, next Action. It is on-policy because the next action \(A'\)
used in the target is chosen by the same current policy used to behave. (Slides 3–6.)

\[
Q(S,A)\leftarrow Q(S,A)+\alpha
\bigl[R+\gamma Q(S',A')-Q(S,A)\bigr].
\]

Here \(\alpha\) is the update step size, \(\gamma\) discounts future value, and \(A'\) is sampled
from the current policy, often \(\varepsilon\)-greedy. The policy therefore affects both behavior
and the target. (Slides 8–10, especially the visual equation on slide 9.)

**One small reasoning step.** If an exploratory policy actually selects a non-greedy \(A'\),
Sarsa bootstraps from \(Q(S',A')\), not from the maximum next-action value. That is exactly why
the update is on-policy. (Slides 5, 8–10.)

### Traps and question cautions

- Sarsa does not mean “always greedy” and is not off-policy. Its next action comes from the
  behavior/current policy. (Q126, Q195.)
- \(\alpha\) controls how much new error changes the old estimate; \(\varepsilon\) controls
  exploratory action selection; \(\gamma\) controls the weight of the next value. Do not swap
  these symbols. (Slides 8–10.)
- Q213's fluctuation claim is plausible from “larger update size,” but the deck does not state a
  universal convergence threshold. Preserve it as a caution, not a theorem.

### Teach-back checks

1. Expand the name Sarsa.
2. What exactly makes the target on-policy?
3. Distinguish \(\alpha\), \(\gamma\), and \(\varepsilon\).

**Compact recall cue:** **Sarsa samples the next action from the policy it follows.**

---

<a id="lecture-2-8"></a>
## 2.8 — Off-policy TD control: Q-learning

**Source:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](<slides/slides/2.8 Off-policy Temporal Difference Control Q-learning .pptx>),
especially slides 3–16.  
**Demand and related practice:** Q023, Q044, Q049, Q050, Q071, Q169, Q181, Q183, Q196, Q197, Q198, Q205, Q210, Q219, Q236, Q274, Q286.  
**Depth:** D3 because Q-learning is the densest Course 2 lecture mapping and its off-policy target
is repeatedly contrasted with Sarsa.

### Learn it

Q-learning estimates the optimal action-value function while data may be generated by an
exploratory behavior policy. Its target uses the greedy next-state value:

\[
Q(S,A)\leftarrow Q(S,A)+\alpha
\bigl[R+\gamma\max_{a'}Q(S',a')-Q(S,A)\bigr].
\]

The behavior action produces the observed \(R,S'\), but the target evaluates the best estimated
next action whether or not behavior actually selects it. That behavior/target separation makes
Q-learning off-policy. (Slides 3–5 and the visual algorithms/equations on slides 4, 6, 10, 16.)

Sarsa uses \(Q(S',A')\) for the next action sampled by its current policy; Q-learning uses
\(\max_{a'}Q(S',a')\). Both apply a step-size-scaled TD error, but their targets represent
different policies. (Slides 8–13.)

**One small reasoning step.** Suppose behavior explores by taking a non-greedy action in \(S'\).
The transition is still valid Q-learning data, but the update target uses the maximum stored
action value in \(S'\), not the value of that exploratory next action. (Slides 3, 9–11.)

### Traps and question cautions

- Off-policy does not mean “no policy.” It means the policy generating behavior differs from
  the greedy target represented by the update.
- The reward in the update comes from the action actually executed in \(S\); the **next-value**
  component uses a maximum. Q197 blurs these two roles.
- \(\alpha\) is learning rate, not exploration rate or discount factor. (Q049, Q183, Q286;
  slides 10, 16.)
- “Minimize TD error” in Q210 describes the direction of an update, but the deck's stated goal is
  learning \(Q^*\) and an improved/optimal policy. (Slides 3, 5, 7.)
- Epsilon-greedy can generate exploratory data while the target remains greedy, which preserves
  the off-policy distinction. (Slides 3, 11, 16.)

### Teach-back checks

1. Which action value appears in the Q-learning target?
2. Why can an \(\varepsilon\)-greedy behavior policy coexist with a greedy target?
3. Give the one-symbol difference between Sarsa's and Q-learning's bootstrap terms.

**Compact recall cue:** **Q-learning behaves exploratorily, targets the greedy max.**

---

<a id="lecture-2-9"></a>
## 2.9 — Expected Sarsa

**Source:** [2.9 Expected Sarsa.pptx](<slides/slides/2.9 Expected Sarsa.pptx>),
especially slides 3, 5–15.  
**Demand and related practice:** Q058, Q074, Q077, Q086, Q108, Q116, Q150, Q200, Q215, Q237, Q244, Q252, Q280, Q283.  
**Depth:** D3 because the expectation target, probability weights, and comparisons with Sarsa and
Q-learning are heavily tested.

### Learn it

Expected Sarsa replaces Sarsa's one sampled next action with the policy-weighted expectation over
all possible next actions:

\[
Q(S,A)\leftarrow Q(S,A)+\alpha\left[
R+\gamma\sum_{a'}\pi(a'\mid S')Q(S',a')-Q(S,A)\right].
\]

The probabilities \(\pi(a'\mid S')\) are weights, not rewards or counts. This averages away the
randomness of selecting one \(A'\) for the update, so the deck describes updates as smoother and
more stable than sampled Sarsa and often lower-variance than max-based Q-learning in the
presented comparison. (Slides 3, 5, 8–9, 12–15; visual equation on slide 5.)

The three control targets are:

- Sarsa: sampled \(Q(S',A')\);
- Q-learning: greedy \(\max_{a'}Q(S',a')\);
- Expected Sarsa: policy-weighted \(\sum_{a'}\pi(a'\mid S')Q(S',a')\).

This is the cleanest way to answer most of the mapped questions. (2.7 slides 9–10; 2.8 slides
9–10; 2.9 slides 8, 11–15.)

**One small reasoning step.** If a two-action policy gives probabilities \(0.75\) and \(0.25\),
Expected Sarsa weights the two next-action values by \(0.75\) and \(0.25\); it does not take an
unweighted average or automatically choose the maximum. (Slides 5, 12–13.)

### Traps and question cautions

- Q237 correctly points to a requirement: the expectation needs the policy's action
  probabilities. (Slides 5, 8, 12.)
- Q074 claims a special advantage in large action spaces. The deck only establishes that the
  target considers all possible actions; it does not establish that this is cheaper or preferred
  when there are many actions. The question premise is unsupported.
- Q252 defines off-policy incorrectly as learning from actions not taken. Off-policy still uses
  observed data; it means behavior and target policies differ. The deck's “current policy”
  treatment is on-policy, while its claim that Expected Sarsa generalizes Q-learning shows that
  the target policy choice can change the relationship. (Slides 5, 11–13; compare 2.4 slides
  3, 5–10.)
- Slide 4 mistakenly contrasts Expected Sarsa with “maximum as in Sarsa.” Use the correct Sarsa
  sampled-action description on slides 6–8 and the Q-learning maximum comparison on slides
  11–13.

### Teach-back checks

1. What is being averaged, and what supplies the weights?
2. Contrast the Sarsa, Q-learning, and Expected Sarsa bootstrap terms.
3. Why does Expected Sarsa require action probabilities?

**Compact recall cue:** **Expected Sarsa = probability-weighted next-action values.**

---

<a id="lecture-2-10"></a>
## 2.10 — Models in reinforcement learning

**Source:** [2.10 Define model in Reinforcement Learning.pptx](<slides/slides/2.10 Define model in Reinforcement Learning.pptx>),
especially slides 3–16 and 18–21.  
**Demand and related practice:** Q013, Q151, Q152, Q176, Q227, Q232, Q234, Q267, Q269, Q287.  
**Depth:** D3 because sample/distribution distinctions attract four verify items and feed all
planning and Dyna questions.

### Learn it

A model stores or represents environment dynamics. Given a state and action, it can produce or
describe a possible next state and reward, letting the agent consider consequences without
taking the action in the real environment. Using model-generated experience for value updates
supports planning and may reduce the number of real interactions needed for the same policy in
the deck's explanation. (Slides 3–7.)

Two model types:

- A **sample model** generates one sampled next state and reward for a queried state–action pair.
  It can be cheap to query because it only produces one outcome. (Slides 8–9, 12, 20–21.)
- A **distribution model** gives probabilities for all possible next-state/reward outcomes. It
  contains richer uncertainty information but can be large or difficult to specify. (Slides
  10–11, 13–14, 18–19.)

**One small reasoning step.** For a coin-like outcome, a sample model returns one realized
heads/tails result; a distribution model states the probability of each possible outcome. The
first answers “what sample occurred?” and the second “how likely is each outcome?” (Slides
8–13.)

### Traps and question cautions

- “Model-free” means no explicit environment model is used for planning; it does not mean the
  learner has no value function or policy. (Q013; slides 3–7.)
- Q151 and Q152 assert universal generalization or sample-efficiency rankings. Slides 12–13
  support a trade-off—single samples can be cheap, full distributions contain more information
  but may be large—not a universal winner.
- Slide 17 says sample models can be more memory-intensive and less efficient than distribution
  models, which conflicts with the concrete explanation on slides 12–13. Treat efficiency as
  problem-dependent and use the direct representation distinction as the stable claim.
- Q234's supplied “particle filters” is not named in this deck. The slide-grounded answer-bearing
  concept is a distribution over \(S',R\), not a particular filtering method.
- Q267 conflates MC value estimation with the separate notion of a sample model. A sample model
  is a queried environment model; MC prediction in 2.1 is model-free sampled learning.

### Teach-back checks

1. What must a model return or describe for a state–action query?
2. Contrast a sample model with a distribution model.
3. Why should you reject a universal sample-efficiency ranking between them?

**Compact recall cue:** **Sample model gives one outcome; distribution model gives all odds.**

---

<a id="lecture-2-11"></a>
## 2.11 — Planning in reinforcement learning

**Source:** [2.11 Define Planning in Reinforcement Learning.pptx](<slides/slides/2.11 Define Planning in Reinforcement Learning.pptx>),
especially slides 4–11.  
**Demand and related practice:** Q072, Q119, Q122, Q165, Q185, Q243, Q281.  
**Depth:** D3 because learners must separate real experience from model-generated updates and
interpret random-sample one-step Q-planning.

### Learn it

Planning uses a model to improve values and a policy. A model generates simulated experience;
the learner applies value updates as if those transitions had occurred; acting greedily with
respect to improved action values yields policy improvement. Planning updates can happen without
new real interaction or in parallel with it. (Slides 4–7.)

Random-sample one-step tabular Q-planning:

1. choose a state–action pair from the planning set;
2. query the sample model for \(R,S'\);
3. apply a Q-learning update to that simulated transition;
4. improve behavior with respect to the updated \(Q\).

The slide 6 visual shows the sampled model query, Q-learning backup, and greedy improvement.

**One small reasoning step.** A planning update changes \(Q\) even though no new environment step
occurred because its \(R,S'\) came from the model. A direct RL update has the same backup shape
but obtains \(R,S'\) from actual interaction. (Slides 4, 6–7.)

### Traps and question cautions

- Random planning samples previously available state–action pairs to spread planning updates; it
  is not itself real-world exploration. Q122's supplied wording confuses planning coverage with
  environment exploration.
- In “Q-planning,” \(Q\) denotes action values \(Q(s,a)\), not the English word “quality.”
  Q119 should ask what the function represents rather than what the letter stands for.
- Q243 is supported only when “Q-learning update” is understood as improving action values from
  model experience; planning still requires the model. (Slides 4–7.)
- Q165 names dynamic programming, but this deck does not name a single required algorithm for
  model-based action-value estimation. The model/planning concept is supported; the supplied
  algorithm choice requires Course 1 evidence and remains flagged here.
- Slide 3 says planning produces an “unimproved policy,” contradicting slides 4–5 and the lecture
  objective. Treat it as a slide typo.

### Teach-back checks

1. Where do \(R,S'\) come from in a planning update?
2. Why is random planning not the same as environmental exploration?
3. Contrast direct RL and planning in one sentence.

**Compact recall cue:** **Planning = model transition → familiar value update → better policy.**

---

<a id="lecture-2-12"></a>
## 2.12 — Dyna as a planning formalism

**Source:** [2.12 Dyna as a formalism for planning.pptx](<slides/slides/2.12 Dyna as a formalism for planning.pptx>),
especially slides 3–7, 11–20, and the visual Tabular Dyna-Q algorithm on slide 15.  
**Demand and related practice:** Q002, Q012, Q109, Q145, Q257.  
**Depth:** D3 because four of five mapped items have defective supplied claims and the
architecture is a central direct-learning/planning distinction.

### Learn it

Dyna integrates four flows:

1. interaction with the environment produces real experience;
2. real experience directly updates values/policy;
3. the same experience updates a model;
4. search control selects model queries whose simulated experience drives planning updates.

The architecture diagram on slide 3 and explanation on slide 4 show all four relationships.
Slides 5–7 summarize the integration of model learning, model-free/direct learning, and planning.

Tabular Dyna-Q uses the Q-learning backup twice: once on the real transition and repeatedly on
transitions sampled from the learned model. The number of planning updates determines how much
extra learning work is extracted from each real interaction. (Slides 11–15.)

**One small reasoning step.** Q-learning stops after the direct update from one real transition.
Dyna-Q also stores that transition in its model and can replay model-generated transitions as
planning updates. That additional loop is the answer-bearing difference. (Slides 15–20.)

### Traps and question cautions

- Dyna is not “primarily modeling complex dynamic systems.” Its purpose in these slides is to
  integrate acting, direct RL, model learning, search control, and planning. Q109 and Q257 offer
  no correct option. (Slides 3–7.)
- The clearest benefit supported by the deck is improved use of real experience through
  planning/sample efficiency in some cases. Q002's “scalability and adaptability” is not the
  stated central benefit. (Slides 9–10, 20.)
- Q145's “dynamic models” answer is not a model category taught by the Dyna deck. Dyna learns an
  environment model and uses it for planning; sample/distribution categories belong to 2.10.
- Slide 8 introduces replay-buffer wording not used by the core Tabular Dyna-Q algorithm on
  slide 15. The exam-facing architecture should follow slides 3–7 and 11–15.

### Teach-back checks

1. Name the four flows in the Dyna architecture.
2. What work does the model add after a real transition?
3. State the clean difference between Q-learning and Dyna-Q.

**Compact recall cue:** **Dyna = act + direct update + learn model + plan.**

---

<a id="lecture-2-13"></a>
## 2.13 — Dealing with inaccurate models

**Source:** [2.13 Dealing with inaccurate models .pptx](<slides/slides/2.13 Dealing with inaccurate models .pptx>),
especially slides 3–14 and 19.  
**Demand and related practice:** Q113.  
**Depth:** D2 because only one generic item maps directly, but inaccurate models are necessary to
understand the limits of planning and the Dyna-Q+ idea.

### Learn it

A learned model can be incomplete because state–action pairs have not been tried, or stale because
the environment changed. Planning from a wrong stored transition can push values or the policy in
the wrong direction. The model remains wrong until new real interaction revisits the changed
part and updates it. (Slides 3–10.)

This creates another exploration–exploitation tension: exploit the current model for planning, or
explore the environment to check whether old knowledge is still accurate. The deck encourages
revisiting state–action pairs not tried recently. (Slides 9–11.)

Dyna-Q+ adds a recency bonus to the reward used in planning:

\[
R^+ = R+\kappa\sqrt{\tau},
\]

where \(\tau\) is time since that state–action pair was last tried in the real environment and
\(\kappa\) controls bonus strength. Planning does not reset \(\tau\), because simulated use is
not a real visit. The bonus raises the planned value of long-unvisited pairs and encourages
rechecking them. (Slides 12–14.)

### Traps and question cautions

- Q113's “perfect alignment” is obviously not an inaccuracy, but its other generic choices
  (data quality, assumptions, overfitting) are not the lecture's taxonomy. The deck-supported
  causes are missing transitions and environmental change. Keep the item as a broad recognition
  check, not the chapter's definition.
- Slides 15–18 contain contradictory descriptions of bonuses in Dyna-Q and Dyna-Q+. Use the
  explicit formula and definition on slides 12–14: the added recency bonus produces Dyna-Q+.

### Teach-back checks

1. Give the two model-inaccuracy causes explicitly taught by the deck.
2. Why can more planning be harmful when the model is wrong?
3. What do \(\kappa\) and \(\tau\) mean in the Dyna-Q+ bonus?

**Compact recall cue:** **Old model? Revisit; Dyna-Q+ rewards long-unchecked pairs in planning.**

---

<a id="course-2-cheat-sheet"></a>
## Course 2 comparison sheet

### Learning targets

| Method | Bootstrap target or evidence | Policy relationship | Model |
|---|---|---|---|
| MC prediction | completed sampled return \(G_t\) | evaluate policy generating episode | none |
| TD(0) | \(R+\gamma V(S')\) | evaluate supplied/current policy | none |
| Sarsa | \(R+\gamma Q(S',A')\) | on-policy sampled \(A'\) | none |
| Q-learning | \(R+\gamma\max_{a'}Q(S',a')\) | off-policy greedy target | none |
| Expected Sarsa | \(R+\gamma\sum_{a'}\pi(a'|S')Q(S',a')\) | depends on target-policy choice | none |
| Q-planning | Q-learning target from model-produced \(R,S'\) | greedy improvement in the deck | required |

Evidence: 2.1 slides 5–9; 2.5 slides 5–12; 2.7 slides 5–10; 2.8 slides 3–10;
2.9 slides 5–13; 2.11 slides 4–7.

### Real experience, model, planning, and Dyna

- **Direct/model-free learning:** update from an actual transition; no planning model.
- **Model learning:** store or learn what next state/reward follows a state–action pair.
- **Planning:** query that model and update values from simulated transitions.
- **Dyna:** combine direct update, model learning, search control, and planning in one loop.

Evidence: 2.10 slides 3–7; 2.11 slides 4–7; 2.12 slides 3–7 and 11–15.

## Course 2 mastery checkpoint

Answer aloud before looking back:

1. Why does MC prediction wait, while TD(0) can update immediately?
2. Distinguish behavior and target policies, including the coverage rule.
3. State the sampled, maximum, and expected next-action targets.
4. What is the difference between a sample model and a distribution model?
5. Where does a planning transition come from?
6. Draw the Dyna loop in words.
7. Why can planning amplify a model error?
8. What does the Dyna-Q+ recency bonus encourage?

**Mastery rule:** a definition is enough for D1; an accurate contrast is required for D2; for D3,
justify one target or one model-generated update without tracing a full episode.

---

# Course 3 — Prediction and Control with Function Approximation

> Source boundary: the twelve Course 3 lecture decks in `docs/slides/slides/`.
> Question IDs identify exam demand; the slides remain the authority. “Mapped questions”
> includes primary and useful related practice, so an ID may appear in two connected chapters.

<a id="course-3-roadmap"></a>
## Course 3 roadmap

Course 1 stored one value per state or state–action pair. Course 2 learned those values from
experience. Course 3 replaces the table with adjustable functions:

```text
state or (state, action)
  -> features
  -> parameterized value or policy
  -> prediction error / policy-performance signal
  -> parameter update
```

This change permits generalization: an update at one state can affect other states with shared
features. That is the benefit and the central risk. The remainder of the course develops value
approximation, representations, approximate control, continuing-task objectives, and direct
policy learning.

### How deep to learn Course 3

- **D3 — explain and make one small inference:** parameterized/linear values, MSVE and state
  weighting, semi-gradient TD, feature construction, average reward, parameterized policies,
  policy gradient, actor–critic, softmax and Gaussian policies.
- **D2 — define and contrast:** approximate Sarsa targets, optimistic initialization versus
  epsilon-greedy, TD fixed-point intuition.
- **Not required by this bank:** code traces, full gradient derivations, matrix proofs, or neural
  network implementation.

---

<a id="lecture-3-1"></a>
## Lecture 3.1 — Estimating value functions as supervised learning

**Demand:** high · **Depth:** D3 · **Demand and related practice:** Q008, Q076, Q098, Q104, Q223, Q255,
Q296.  
**Evidence:** `3.1 Estimating Value Functions as Supervised Learning .pptx`, slides 3–12 and
18–22.

A **parameterized function** has adjustable numbers, collected in a weight vector
\(\mathbf w\). Instead of storing \(v(s)\) separately for every state, it computes
\(\hat v(s,\mathbf w)\). Changing \(\mathbf w\) changes many estimates at once.

For a linear value function,

\[
\hat v(s,\mathbf w)=\mathbf w^\top\mathbf x(s),
\]

where \(\mathbf x(s)\) is a fixed feature vector describing state \(s\). The dot product means
“multiply each feature by its weight, then add.” A table is unnecessary when the function can
produce an estimate on demand.

**Why use approximation?** Large or continuous state spaces may contain too many states to
store or visit individually. Shared features let experience at one state improve estimates at
similar states. This is **generalization**. The other side is **discrimination**: retaining
enough detail to give meaningfully different states different estimates.

**Central trade-off:** more sharing can improve data efficiency but can also underfit; more
specific features can represent detail but need more data and may generalize poorly. Linear
approximation is also limited by the chosen features and by what a linear combination can
express. Therefore “linear approximation always overfits/underfits” is false; the result depends
on representation, data, and target.

**Small inference:** if two states activate exactly the same features, their estimated values
must be equal under the same weights. The learner cannot discriminate between them.

**Common traps**

- Parameters are the adjustable weights; features are the state description used by the
  function.
- Generalization in these lectures means sharing predictions across states, not demographic
  discrimination.
- Approximation aims for useful estimates, not a guaranteed exact copy of the tabular function.

**Teach back:** Why can one update change several state estimates? What information is lost when
two states share the same feature vector?

**Recall cue:** `features describe; weights learn; sharing generalizes`.

---

<a id="lecture-3-2"></a>
## Lecture 3.2 — Objective for on-policy prediction

**Demand:** high · **Depth:** D3 · **Demand and related practice:** Q024, Q034, Q079, Q130, Q143, Q153,
Q159, Q175, Q179, Q207, Q209, Q251, Q291, Q300.  
**Evidence:** `3.2 The Objective for On-policy Prediction .pptx`, slides 3–8, 15–20.

Policy evaluation asks the approximator to predict \(v_\pi(s)\). The **mean-squared value error
(MSVE)** summarizes its weighted squared error:

\[
\overline{VE}(\mathbf w)=\sum_s \mu(s)
 [v_\pi(s)-\hat v(s,\mathbf w)]^2.
\]

\(\mu(s)\) is the fraction of time, or weighting, assigned to state \(s\) under the relevant
on-policy distribution. Errors in frequently weighted states matter more to the objective than
errors in rarely weighted states. \(\mu(s)\) is not a value estimate or learning rate.

The **gradient** says how a small parameter change changes the prediction or objective. Gradient
descent changes weights in the direction that reduces error. The **learning rate** \(\alpha\)
controls the update size: too small is slow; too large can overshoot or destabilize learning.
Stochastic or sample updates use encountered states instead of computing the full sum over all
states.

**State aggregation** assigns states to groups. There is one active feature per group; all states
in a group share one weight and therefore one estimate. It compresses large/continuous spaces
and spreads learning, but it cannot represent differences inside a group. Choosing too few
groups loses distinctions; too many reduces sharing and increases data/storage needs.

**Small inference:** if two equally weighted states are forced into one group but have true
values 2 and 8, the shared estimate must compromise; it cannot make both errors zero.

**Common traps**

- MSVE measures weighted prediction error; it does not directly maximize reward.
- State aggregation is a special linear representation, not a separate learning objective.
- “Large state space” motivates sampling and approximation; it does not change what MSVE means.

**Teach back:** What does \(\mu(s)\) do? Why can better compression worsen prediction?

**Recall cue:** `MSVE = weighted squared value error; aggregation = one weight per group`.

---

<a id="lecture-3-3"></a>
## Lecture 3.3 — Objective for temporal-difference learning

**Demand:** medium · **Depth:** D3 · **Demand and related practice:** Q131, Q260, Q297.  
**Evidence:** `3.3 The Objective for Temporal Difference.pptx`, slides 3–9 and 10–16.

Gradient Monte Carlo moves the current estimate toward the sampled full return \(G_t\). That
return is an unbiased sample target for the true value under the stated policy. TD instead uses
the one-step bootstrapped target:

\[
U_t=R_{t+1}+\gamma\hat v(S_{t+1},\mathbf w).
\]

The TD error is
\[
\delta_t=R_{t+1}+\gamma\hat v(S_{t+1},\mathbf w)-\hat v(S_t,\mathbf w).
\]

The update changes the weights in proportion to \(\delta_t\) and the gradient of the current
state estimate. It is called a **semi-gradient** because the target also depends on the weights,
but the algorithm treats that target as fixed while differentiating. It follows the gradient
through \(\hat v(S_t,\mathbf w)\), not through the next-state estimate in the target.

TD updates after each transition and bootstraps; Monte Carlo waits for an episode and uses the
observed return. TD often learns faster and with lower variance, but its bootstrapped target can
be biased. Gradient Monte Carlo approaches a local MSVE minimum under suitable conditions;
semi-gradient TD generally approaches its own TD fixed point, not necessarily that same minimum.

\(\gamma\) controls how strongly the next-state estimate contributes. It does not set the step
size—that is \(\alpha\).

**Small inference:** when \(\gamma=0\), the target is just the immediate reward, so error in the
next-state estimate cannot bias that target.

**Teach back:** Why is the method only a semi-gradient? What is gained and lost by bootstrapping?

**Recall cue:** `TD target contains the learner’s own next estimate`.

---

<a id="lecture-3-4"></a>
## Lecture 3.4 — Linear temporal difference

**Demand:** medium · **Depth:** D2 · **Demand and related practice:** Q220, Q249.  
**Evidence:** `3.4 Linear Temporal Difference.pptx`, slides 3–6 and 9–13.

For \(\hat v(s,\mathbf w)=\mathbf w^\top\mathbf x(s)\), the gradient with respect to
\(\mathbf w\) is simply \(\mathbf x(s)\). Linear semi-gradient TD therefore has the conceptual
form

\[
\mathbf w\leftarrow\mathbf w+\alpha\delta_t\mathbf x(S_t).
\]

Only weights with nonzero current features change. Larger feature magnitudes cause larger
component changes for the same TD error.

**Tabular TD is a special case.** Give each state a one-hot feature vector: exactly the feature
for the current state is 1 and all others are 0. The dot product selects that state’s weight, and
the update changes only that weight—exactly the tabular update. State aggregation is another
special case, with one active group feature.

The expected linear TD update can be written as a vector minus a matrix times the weights. A
**TD fixed point** is where the expected update is zero. Learn its meaning, not the matrix proof:
the average update no longer pushes the weights elsewhere. That fixed point can differ from the
MSVE-minimizing weights, especially as \(\gamma\) approaches 1.

**Teach back:** How does a one-hot feature recover a table? What does “fixed point” mean in plain
language?

**Recall cue:** `linear gradient = features; one-hot features = table`.

---

<a id="lecture-3-5"></a>
## Lecture 3.5 — Feature construction for linear methods

**Demand:** high · **Depth:** D3 · **Demand and related practice:** Q010, Q014, Q021, Q048, Q062, Q084,
Q123, Q170, Q292, Q293, Q299.  
**Evidence:** `3.5 Feature Construction for Linear Methods.pptx`, slides 3–6 and 7–21.

A representation decides which states share learning.

- **State aggregation:** non-overlapping groups; normally one group feature is active.
- **Coarse coding:** overlapping receptive fields; a state activates every region containing
  it. Nearby states tend to share some, not necessarily all, active features.
- **Tile coding:** several offset tilings cover a continuous space. A state activates one tile
  in each tiling, producing a sparse binary vector and local generalization.

Overlap provides graded similarity. Two nearby states may share many active features, so an
update transfers strongly; farther states share fewer or none. This gives more flexible
generalization than a single partition.

**Granularity trade-off:** broad/coarse regions share widely but blur distinctions; narrow/fine
regions discriminate better but share less and require more features/data. Tile-coding setup
therefore involves the number of tilings, tile widths/resolution, offsets, and memory/indexing.
Those choices determine what similarity the learner can express.

Backpropagation or a neural network may be used inside an RL system; it is not itself an RL
control algorithm. The bank’s Q048 is defective if it treats this distinction as “not used in
RL.”

**Small inference:** if two states share three of four active tiles, an update at one affects
three weights used by the other; their estimates move together, but not identically.

**Common traps**

- Coarse coding is based on overlapping receptive fields, not clustering as its defining idea.
- In a tiling, tiles need not overlap each other; multiple offset tilings create the useful
  overlap across representations.
- Tile coding improves scalable local generalization, not universally “memory efficiency”
  against every possible table.

**Teach back:** Contrast aggregation, coarse coding, and tile coding. How does overlap change
generalization?

**Recall cue:** `aggregation partitions; coarse coding overlaps; tile coding offsets tilings`.

---

<a id="lecture-3-6"></a>
## Lecture 3.6 — Episodic Sarsa with function approximation

**Demand:** low but prerequisite-linked · **Depth:** D2 · **Demand and related practice:** Q229, Q264.  
**Evidence:** `3.6 Episodic Sarsa with Function Approximation.pptx`, slides 3–18.

Approximate control needs \(\hat q(s,a,\mathbf w)\), so the features must represent both state
and action. With **stacked features**, make a separate state-feature block for each action and
activate only the block for the selected action. Four state features and three actions therefore
produce \(4\times3=12\) components.

The approximate algorithms retain their Course 2 target distinctions:

- Sarsa uses the sampled next action value
  \(R+\gamma\hat q(S',A',\mathbf w)\).
- Expected Sarsa uses the policy-weighted expectation over next actions.
- Q-learning replaces that expectation with the maximum next action value.

The weights then move according to target minus current approximate value, times the current
state–action feature gradient. The exam requires the roles and contrasts, not an implementation
trace.

**Teach back:** Why must action-value features encode the action? Which part changes when moving
from Sarsa to Expected Sarsa or Q-learning?

**Recall cue:** `same approximate value machinery; different next-value target`.

---

<a id="lecture-3-7"></a>
## Lecture 3.7 — Exploration under function approximation

**Demand:** medium · **Depth:** D2 · **Demand and related practice:** Q137, Q258, Q295.  
**Evidence:** `3.7 Exploration under Function Approximation.pptx`, slides 3–10.

Optimistic initialization makes estimated action values initially higher than reality, so actions
remain attractive until experience corrects them. In a table, entries change independently. With
approximation, one weight update may lower many action estimates, so optimism may not create the
same systematic state-by-state exploration. Local representations such as tile coding can limit
that spillover; strongly shared nonlinear representations may not.

Epsilon-greedy only needs action-value estimates, so it works with tabular, linear, or nonlinear
approximators. With probability \(1-\varepsilon\) it selects a greedy action and otherwise
explores randomly. It is broadly applicable but not directed: randomness, rather than an
uncertainty signal, discovers alternatives.

The approximator’s role is to produce the action-value estimates used to identify a greedy
action. It does not replace the exploration rule.

**Teach back:** Why can shared features weaken optimistic exploration? Why is epsilon-greedy
representation-agnostic?

**Recall cue:** `optimism depends on update locality; epsilon-greedy needs only Q estimates`.

---

<a id="lecture-3-8"></a>
## Lecture 3.8 — Average reward and differential values

**Demand:** high/risky · **Depth:** D3 · **Demand and related practice:** Q003, Q019, Q047, Q063, Q298.  
**Evidence:** `3.8 Understand Average Reward.pptx`, slides 3–20.

Discounted return makes later rewards count less. In a continuing task, setting
\(\gamma=1\) can make the return infinite, while choosing \(\gamma<1\) may prefer nearer reward
even when another policy earns more over a long run.

The **average reward** of a policy is its long-run reward rate:

\[
\bar R_\pi=\lim_{h\to\infty}\frac1h
\mathbb E_\pi\!\left[\sum_{t=1}^{h}R_t\right].
\]

Equivalently, it is the expected immediate reward weighted by the policy’s long-run state
visitation distribution. Maximizing it values sustained reward per time step without choosing an
ever-larger discount factor.

A **differential return** measures rewards relative to the average reward; differential value
functions are expected differential returns from a state or state–action pair. They answer,
roughly, “how much better or worse is starting here than the continuing baseline?” They still
use expectations and Bellman-style recursive relationships.

Sparse rewards make finite-sample estimates noisy; they do not make the average-reward objective
invalid. Differential TD/Sarsa-style methods can estimate average reward and differential
values, so “TD learning” alone is too broad to name a unique algorithm.

**Small inference:** two policies that earn 10 rewards over 20 steps and 12 rewards over 40 steps
have rates 0.5 and 0.3; the first has the higher average reward despite the smaller total.

**Teach back:** Why not simply set \(\gamma=1\) in a continuing discounted return? What does a
differential value compare against?

**Recall cue:** `average reward = long-run rate; differential value = relative to that rate`.

---

<a id="lecture-3-9"></a>
## Lecture 3.9 — Learning parameterized policies

**Demand:** high · **Depth:** D3 · **Demand and related practice:** Q067, Q093, Q103, Q114, Q120, Q155,
Q168, Q173, Q212, Q240.  
**Evidence:** `3.9 Learning Parameterized Policies.pptx`, slides 3–9.

A **parameterized policy** \(\pi_\theta(a\mid s)\) directly produces the probability of taking
action \(a\) in state \(s\). Its adjustable parameters are \(\theta\). A valid discrete policy
must assign nonnegative probabilities that sum to 1 in every state.

For discrete actions, softmax converts real-valued **action preferences** \(h(s,a,\theta)\) into
probabilities:

\[
\pi_\theta(a\mid s)=
\frac{\exp(h(s,a,\theta))}
{\sum_b\exp(h(s,b,\theta))}.
\]

Preferences are not action values: they determine relative action probability but need not
predict expected return. Direct policy representation also avoids requiring a greedy
value-to-action conversion and can naturally remain stochastic.

The local slides use the softmax expression above without introducing a temperature parameter.
Bank items Q103 and Q114 ask about temperature, but this source set does not establish their
answer. Retain them as unsupported questions rather than importing an outside explanation.

Advantages include compactness, state-to-state generalization, flexible stochastic policies,
and support for continuous action distributions. Challenges include choosing a representation,
maintaining useful exploration, noisy gradient estimates, and sensitivity to update settings.

**Small inference:** adding the same constant to every preference leaves softmax probabilities
unchanged because the common exponential factor cancels.

**Teach back:** Why are preferences not Q-values? What constraints must any parameterized policy
satisfy?

**Recall cue:** `theta adjusts the policy; softmax turns relative preferences into probabilities`.

---

<a id="lecture-3-10"></a>
## Lecture 3.10 — Policy gradient for continuing tasks

**Demand:** high · **Depth:** D3 · **Demand and related practice:** Q030, Q057, Q075, Q087, Q091, Q135,
Q164, Q177, Q193, Q273.  
**Evidence:** `3.10 Policy Gradient for Continuing Tasks.pptx`, slides 3–11.

Policy-gradient methods adjust \(\theta\) to directly improve an objective \(J(\theta)\). For the
continuing setting in these lectures, the objective is average reward. The **policy gradient**
\(\nabla_\theta J(\theta)\) is the direction and rate of change of expected performance with
respect to policy parameters. Moving a small step along it performs gradient ascent.

The difficult-looking part is that changing the policy also changes which states are visited.
The policy-gradient theorem rewrites the performance gradient into an expectation that can be
estimated from sampled interaction. In conceptual form:

\[
\nabla J(\theta)\propto
\mathbb E[\nabla_\theta\log\pi_\theta(A\mid S)\,q_\pi(S,A)].
\]

The log-policy gradient says how the chosen action’s probability responds to parameters; the
value term says whether that action deserves reinforcement. The theorem provides an actionable
ascent direction without requiring the learner to separately differentiate the state-visitation
distribution.

Direct optimization can represent stochastic and continuous-action policies naturally, but
sample gradients can be noisy. Stability depends on learning rate, representation, sampling,
exploration, and variance-control choices; there is no single universally decisive factor.

**Small inference:** if an action’s return signal is positive, the update tends to increase its
log probability; a negative signal tends to decrease it.

**Teach back:** What does a policy gradient differentiate? Why is the theorem useful?

**Recall cue:** `change policy parameters in the direction that improves expected performance`.

---

<a id="lecture-3-11"></a>
## Lecture 3.11 — Actor–critic for continuing tasks

**Demand:** very high/risky · **Depth:** D3 · **Demand and related practice:** Q016, Q029, Q055, Q066,
Q121, Q177, Q192, Q225, Q226, Q239, Q241, Q301, Q302.  
**Evidence:** `3.11 Actor-Critic for Continuing Tasks.pptx`, slides 3–11.

Sample-based policy gradients replace an exact expectation with interaction samples. More
samples usually reduce sampling noise, but cost more interaction/computation and do not remove
all bias. A **baseline** that does not depend on the selected action can reduce variance without
changing the expected policy gradient.

**Actor–critic** combines direct policy learning with value estimation:

- the **actor** represents and updates the policy;
- the **critic** estimates value/advantage and evaluates the actor’s choices;
- a TD error or advantage-like signal tells the actor whether the sampled action was better or
  worse than expected.

The critic’s baseline converts a raw return into relative performance. This commonly lowers
variance and permits online updates, but it does not guarantee actor–critic is always faster or
more stable than every alternative. The critic can introduce bias when its approximation is
poor.

For the continuing formulation, the critic can learn differential values and use a signal such
as reward minus average reward plus next value minus current value. The actor uses that signal
to adjust action probabilities.

**Small inference:** if obtained reward plus next value exceeds the critic’s expectation, the TD
error is positive, so the actor tends to make the selected action more likely.

**Teach back:** State the actor’s job, critic’s job, and the signal connecting them. Why can a
baseline help?

**Recall cue:** `actor chooses and improves; critic evaluates; TD error connects them`.

---

<a id="lecture-3-12"></a>
## Lecture 3.12 — Softmax and Gaussian policy parameterizations

**Demand:** very high · **Depth:** D3 · **Demand and related practice:** Q067, Q103, Q114, Q168, Q201,
Q203, Q235, Q294, Q301, Q302.  
**Evidence:** `3.12 Policy Parameterizations.pptx`, slides 3–13.

With a softmax actor, state–action features produce preferences and softmax converts them into
discrete-action probabilities. The critic uses semi-gradient TD; the actor uses the critic’s TD
error to update its policy parameters. With stacked features, only the selected action’s feature
block directly enters that sampled actor update.

For continuous actions, a **Gaussian policy** defines a probability density over actions. A
parameterized mean \(\mu(s)\) controls the central action and a positive standard deviation
\(\sigma(s)\) controls spread. Larger variance produces broader exploration; smaller variance
concentrates actions near the mean. Policy-gradient or actor–critic updates can learn the
parameters; a listed generic method is not automatically “the only method.”

Continuous policies avoid an arbitrary discretization, permit fine-grained actions, and
generalize across nearby actions. Their exploration depends on distribution spread, so a policy
can become prematurely narrow if variance collapses.

**Small inference:** increasing \(\sigma\) while holding \(\mu\) fixed makes samples more
dispersed without changing the distribution’s center.

**Teach back:** Which quantities control exploitation and exploration in a Gaussian policy? How
does actor–critic update a softmax actor?

**Recall cue:** `softmax for discrete preferences; Gaussian mean and spread for continuous action`.

---

<a id="course-3-cheat-sheet"></a>
## Course 3 cheat sheet

| Need | Core object | Meaning |
|---|---|---|
| Approximate a state value | \(\hat v=\mathbf w^\top\mathbf x(s)\) | weighted feature sum |
| Measure prediction error | MSVE | state-weighted squared value error |
| Learn online by bootstrapping | \(\delta=R+\gamma\hat v(S')-\hat v(S)\) | one-step TD error |
| Linear TD update direction | \(\delta\mathbf x(S)\) | error times active features |
| Share across states | aggregation/coarse/tile features | representation controls generalization |
| Approximate action values | \(\hat q(s,a,\mathbf w)\) | encode both state and action |
| Continuing objective | \(\bar R_\pi\) | long-run reward per time step |
| Direct stochastic policy | \(\pi_\theta(a\mid s)\) | action distribution controlled by \(\theta\) |
| Discrete actions | softmax preferences | normalized positive probabilities |
| Continuous actions | Gaussian policy | mean chooses center; variance controls spread |
| Improve policy directly | \(\nabla_\theta J\) | direction of increasing performance |
| Combine policy and value | actor–critic | actor updates policy; critic supplies value signal |

### Confusion breakers

- **Feature vs weight:** feature is input representation; weight is learned parameter.
- **MSVE vs TD error:** MSVE is a global weighted objective; TD error is a sampled learning
  signal.
- **Full gradient vs semi-gradient:** semi-gradient ignores the target’s parameter dependence.
- **Aggregation vs tile coding:** one partition versus several offset partitions.
- **Action preference vs action value:** probability score versus expected-return estimate.
- **Discounted return vs average reward:** decaying future sum versus long-run reward rate.
- **Policy gradient vs actor–critic:** direct policy optimization versus one implementation
  family that adds a learned critic.
- **Softmax vs Gaussian:** discrete normalized choices versus continuous density.

### Course 3 checkpoint

Answer aloud before reopening the chapter:

1. Why can function approximation learn from an unvisited but similar state?
2. What role does \(\mu(s)\) play in MSVE?
3. Why is TD with approximation called semi-gradient?
4. How is tabular TD a special case of linear TD?
5. How do aggregation, coarse coding, and tile coding differ?
6. Why do action-value features need an action component?
7. Why may optimistic initialization behave differently with shared features?
8. What problem does average reward solve for continuing tasks?
9. What is the difference between an action preference and an action value?
10. What does the policy-gradient theorem make estimable?
11. What are the actor, critic, and connecting signal?
12. What controls exploration in a Gaussian policy?

---

<a id="course-review"></a>

## Final course review — one connected story

**Demand:** framing and integration · **Depth:** D2 · **Mapped questions:** all canonical items
through their primary lecture.  
**Evidence:** `6. Review course .ppt`, learning-objective review sections.

An RL problem begins with an agent–environment interaction and a long-run objective. A policy
selects actions; values predict return. Bellman equations express values recursively. Dynamic
programming uses a known model to evaluate and improve policies.

When only experience is available, Monte Carlo learns from complete returns and TD bootstraps
after each transition. Sarsa, Q-learning, and Expected Sarsa use different next-action targets.
Off-policy learning separates behavior from the target policy. Models enable planning; Dyna
combines real learning, model learning, simulated updates, and acting.

When a table is too large, features and parameters share learning across states. Representation
controls the balance between generalization and discrimination. Approximate TD uses a
semi-gradient because its target contains a learned estimate. For continuing control, average
reward supplies a long-run rate objective. Parameterized policies can be optimized directly;
actor–critic adds a learned value signal to guide the actor.

### Final oral check

Explain the whole course without algorithm details:

1. What is the agent trying to maximize?
2. How do policy, value, and Bellman equation relate?
3. What information distinguishes DP, Monte Carlo, and TD?
4. What distinguishes the three TD control targets?
5. Where do model learning and planning enter Dyna?
6. What changes when a table becomes a parameterized function?
7. Why learn a policy directly, and what does the critic contribute?

---

<a id="question-navigation"></a>
## Question navigation by learning context

This is the authoritative context index. A question may use a book passage as its answer-bearing evidence while retaining the closest local lecture for revision.

**Editorial outcomes:** 98 acceptable-with-caveat; 38 bank-key-only; 149 correct; 32 incorrect. Every item is canonical exam material. `bank-key-only` means learn the supplied answer for test recall while keeping its limited lecture support visible.

- [1.1. The K-Armed Bandit Problem.pptx](#lecture-1-1): [Q020](#q020), [Q157](#q157), [Q305](#q305)

- [1.2. Estimating Action Values.pptx](#lecture-1-2): [Q064](#q064), [Q217](#q217), [Q238](#q238)

- [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3): [Q006](#q006), [Q018](#q018), [Q053](#q053), [Q070](#q070), [Q078](#q078), [Q095](#q095), [Q096](#q096), [Q124](#q124), [Q132](#q132), [Q149](#q149), [Q178](#q178), [Q208](#q208), [Q314](#q314), [Q315](#q315), [Q316](#q316)

- [1.4 Introduction to Markov Decision Processes  .pptx](#lecture-1-4): [Q088](#q088), [Q216](#q216), [Q271](#q271), [Q317](#q317)

- [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5): [Q025](#q025), [Q036](#q036), [Q069](#q069), [Q100](#q100), [Q138](#q138), [Q142](#q142), [Q144](#q144), [Q204](#q204), [Q312](#q312)

- [1.6 Continuing Tasks.pptx](#lecture-1-6): [Q052](#q052), [Q065](#q065), [Q082](#q082), [Q127](#q127), [Q308](#q308)

- [1.7 Policies and Value Functions.pptx](#lecture-1-7): [Q031](#q031), [Q061](#q061), [Q068](#q068), [Q090](#q090), [Q097](#q097), [Q141](#q141), [Q167](#q167), [Q206](#q206), [Q211](#q211), [Q261](#q261), [Q309](#q309), [Q310](#q310)

- [1.8 Bellman Equations.pptx](#lecture-1-8): [Q045](#q045), [Q046](#q046), [Q128](#q128), [Q162](#q162), [Q186](#q186), [Q214](#q214), [Q248](#q248), [Q253](#q253), [Q313](#q313)

- [1.9 Optimality (Optimal Policies & Value Functions).pptx](#lecture-1-9): [Q139](#q139), [Q202](#q202)

- [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10): [Q040](#q040), [Q041](#q041), [Q106](#q106), [Q222](#q222), [Q306](#q306), [Q311](#q311)

- [1.11 Policy Iteration (Control) .pptx](#lecture-1-11): [Q015](#q015), [Q129](#q129), [Q147](#q147), [Q189](#q189), [Q250](#q250), [Q262](#q262), [Q265](#q265), [Q268](#q268), [Q304](#q304)

- [1.12 Generalized Policy Iteration.pptx](#lecture-1-12): [Q011](#q011), [Q080](#q080), [Q245](#q245), [Q303](#q303)

- [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1): [Q073](#q073), [Q146](#q146), [Q158](#q158), [Q160](#q160), [Q166](#q166), [Q172](#q172), [Q180](#q180), [Q188](#q188), [Q259](#q259), [Q276](#q276), [Q278](#q278)

- [2.2 Monte-Carlo for Control.pptx](#lecture-2-2): [Q224](#q224), [Q279](#q279)

- [2.3 Exploration Methods for Monte-Carlo.pptx](#lecture-2-3): [Q171](#q171)

- [2.4 Off-policy learning for prediction.pptx](#lecture-2-4): [Q001](#q001), [Q017](#q017), [Q028](#q028), [Q081](#q081), [Q110](#q110), [Q115](#q115), [Q246](#q246), [Q272](#q272), [Q288](#q288), [Q290](#q290)

- [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5): [Q054](#q054), [Q105](#q105), [Q140](#q140), [Q184](#q184), [Q187](#q187), [Q230](#q230), [Q233](#q233), [Q242](#q242), [Q256](#q256), [Q277](#q277), [Q289](#q289)

- [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6): [Q022](#q022), [Q027](#q027), [Q032](#q032), [Q051](#q051), [Q118](#q118), [Q133](#q133), [Q182](#q182), [Q231](#q231), [Q247](#q247), [Q254](#q254), [Q275](#q275), [Q282](#q282)

- [2.7 Temporal Difference for Control.pptx](#lecture-2-7): [Q059](#q059), [Q126](#q126), [Q195](#q195), [Q199](#q199), [Q213](#q213), [Q221](#q221), [Q228](#q228), [Q266](#q266), [Q285](#q285)

- [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8): [Q023](#q023), [Q044](#q044), [Q049](#q049), [Q050](#q050), [Q071](#q071), [Q169](#q169), [Q181](#q181), [Q183](#q183), [Q196](#q196), [Q197](#q197), [Q198](#q198), [Q205](#q205), [Q210](#q210), [Q219](#q219), [Q236](#q236), [Q274](#q274), [Q286](#q286)

- [2.9 Expected Sarsa.pptx](#lecture-2-9): [Q058](#q058), [Q074](#q074), [Q077](#q077), [Q086](#q086), [Q108](#q108), [Q116](#q116), [Q150](#q150), [Q200](#q200), [Q215](#q215), [Q237](#q237), [Q244](#q244), [Q252](#q252), [Q280](#q280), [Q283](#q283)

- [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10): [Q013](#q013), [Q151](#q151), [Q152](#q152), [Q176](#q176), [Q227](#q227), [Q232](#q232), [Q234](#q234), [Q267](#q267), [Q269](#q269), [Q287](#q287)

- [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11): [Q072](#q072), [Q119](#q119), [Q122](#q122), [Q165](#q165), [Q185](#q185), [Q243](#q243), [Q281](#q281)

- [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12): [Q002](#q002), [Q012](#q012), [Q109](#q109), [Q145](#q145), [Q257](#q257)

- [2.13 Dealing with inaccurate models .pptx](#lecture-2-13): [Q113](#q113)

- [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1): [Q008](#q008), [Q076](#q076), [Q098](#q098), [Q104](#q104), [Q223](#q223), [Q255](#q255), [Q296](#q296)

- [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2): [Q024](#q024), [Q034](#q034), [Q079](#q079), [Q130](#q130), [Q143](#q143), [Q153](#q153), [Q159](#q159), [Q175](#q175), [Q179](#q179), [Q207](#q207), [Q209](#q209), [Q251](#q251), [Q291](#q291), [Q300](#q300)

- [3.3 The Objective for Temporal Difference.pptx](#lecture-3-3): [Q131](#q131), [Q260](#q260), [Q297](#q297)

- [3.4 Linear Temporal Difference.pptx](#lecture-3-4): [Q220](#q220), [Q249](#q249)

- [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5): [Q010](#q010), [Q014](#q014), [Q021](#q021), [Q048](#q048), [Q062](#q062), [Q084](#q084), [Q123](#q123), [Q170](#q170), [Q292](#q292), [Q293](#q293), [Q299](#q299)

- [3.6 Episodic Sarsa with Function Approximation.pptx](#lecture-3-6): [Q229](#q229), [Q264](#q264)

- [3.7 Exploration under Function Approximation.pptx](#lecture-3-7): [Q137](#q137), [Q258](#q258), [Q295](#q295)

- [3.8 Understand Average Reward.pptx](#lecture-3-8): [Q003](#q003), [Q019](#q019), [Q047](#q047), [Q063](#q063), [Q298](#q298)

- [3.9 Learning Parameterized Policies.pptx](#lecture-3-9): [Q067](#q067), [Q093](#q093), [Q103](#q103), [Q114](#q114), [Q120](#q120), [Q155](#q155), [Q168](#q168), [Q173](#q173), [Q212](#q212), [Q240](#q240)

- [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10): [Q030](#q030), [Q057](#q057), [Q075](#q075), [Q087](#q087), [Q091](#q091), [Q135](#q135), [Q164](#q164), [Q177](#q177), [Q193](#q193), [Q273](#q273)

- [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11): [Q016](#q016), [Q029](#q029), [Q055](#q055), [Q066](#q066), [Q121](#q121), [Q192](#q192), [Q225](#q225), [Q226](#q226), [Q239](#q239), [Q241](#q241), [Q301](#q301), [Q302](#q302)

- [3.12 Policy Parameterizations.pptx](#lecture-3-12): [Q201](#q201), [Q203](#q203), [Q235](#q235), [Q294](#q294)

<a id="canonical-source-supplements"></a>
### Canonical source supplements

**Sutton–Barto-supported questions:** [Q002](#q002), [Q007](#q007), [Q010](#q010), [Q019](#q019), [Q028](#q028), [Q033](#q033), [Q037](#q037), [Q038](#q038), [Q047](#q047), [Q048](#q048), [Q054](#q054), [Q056](#q056), [Q064](#q064), [Q066](#q066), [Q069](#q069), [Q074](#q074), [Q078](#q078), [Q080](#q080), [Q085](#q085), [Q091](#q091), [Q094](#q094), [Q099](#q099), [Q101](#q101), [Q102](#q102), [Q109](#q109), [Q112](#q112), [Q115](#q115), [Q134](#q134), [Q136](#q136), [Q139](#q139), [Q144](#q144), [Q145](#q145), [Q151](#q151), [Q152](#q152), [Q154](#q154), [Q165](#q165), [Q177](#q177), [Q188](#q188), [Q224](#q224), [Q229](#q229), [Q234](#q234), [Q238](#q238), [Q240](#q240), [Q246](#q246), [Q252](#q252), [Q256](#q256), [Q257](#q257), [Q267](#q267), [Q284](#q284), [Q294](#q294), [Q303](#q303), [Q311](#q311), [Q314](#q314), [Q315](#q315)

**Official-public-Coursera-supported questions:** none — public pages confirmed the curriculum but did not uniquely answer an additional question

**Bank-key-only questions:** These remain required because they appeared in tests. The supplied answer is retained for exam recall, but no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages: [Q004](#q004), [Q005](#q005), [Q009](#q009), [Q015](#q015), [Q026](#q026), [Q035](#q035), [Q039](#q039), [Q042](#q042), [Q043](#q043), [Q053](#q053), [Q060](#q060), [Q070](#q070), [Q083](#q083), [Q089](#q089), [Q092](#q092), [Q095](#q095), [Q103](#q103), [Q107](#q107), [Q111](#q111), [Q114](#q114), [Q117](#q117), [Q125](#q125), [Q148](#q148), [Q156](#q156), [Q161](#q161), [Q163](#q163), [Q171](#q171), [Q174](#q174), [Q190](#q190), [Q191](#q191), [Q194](#q194), [Q203](#q203), [Q218](#q218), [Q225](#q225), [Q263](#q263), [Q270](#q270), [Q304](#q304), [Q307](#q307)

---

<a id="full-question-bank"></a>
## Full question bank — Q001–Q317

Attempt each stem without looking at its options. Original content and the supplied key are preserved; the editorial fields tell you what is safe to learn.

---

<a id="q001"></a>
### Q001 — `C2-M2` · correct

What role does the target policy play in off-policy learning?

- **A.** It defines the behavior policy
- **B.** It defines the policy being learned and improved
- **C.** It defines the reward function
- **D.** It defines the exploration strategy

**Supplied answer:** B. It defines the policy being learned and improved
**Learning verdict:** correct
**Why:** Option B (It defines the policy being learned and improved) matches the local lecture evidence. Slide 4's random-target example wording is inconsistent; use the stable definitions on slides 3 and 5–10.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 3, 5–10
**Related concept:** Behavior versus target policy; learning from different/historical behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q002"></a>
### Q002 — `C2-M5` · incorrect

Which of the following is a key benefit of using Dyna Architecture?

- **A.** Reduced computational resources
- **B.** Increased data redundancy
- **C.** Improved model scalability and adaptability
- **D.** Simplified system design

**Supplied answer:** C. Improved model scalability and adaptability
**Learning verdict:** incorrect
**Correct answer:** None of the options states the key benefit: improved sample efficiency through integrated planning and learning.
**Why:** Sutton–Barto evidence contradicts the supplied key. Dyna integrates direct learning, a learned model, and planning updates from simulated experience; its demonstrated benefit is learning faster from real interaction. Reference answer: None of the options states the key benefit: improved sample efficiency through integrated planning and learning.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §8.2 Dyna: Integrated Planning, Acting, and Learning, printed pp. 161, 162, 163, 165
**Reference explanation:** Dyna integrates direct learning, a learned model, and planning updates from simulated experience; its demonstrated benefit is learning faster from real interaction.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12), slides 9–10, 20
**Related concept:** Dyna benefit

[Back to question navigation](#question-navigation)

---

<a id="q003"></a>
### Q003 — `C3-M4` · acceptable-with-caveat

How is the average reward calculated in reinforcement learning?

- **A.** By summing up all rewards and dividing by the number of time steps
- **B.** By dividing the total reward by the number of episodes
- **C.** By taking the median of all rewards obtained
- **D.** By calculating the mode of the reward distribution

**Supplied answer:** A. By summing up all rewards and dividing by the number of time steps
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (By summing up all rewards and dividing by the number of time steps). Q019/Q047 have no unique supplied option
**Primary lecture:** [3.8 Understand Average Reward.pptx](#lecture-3-8), slides 3–20
**Related concept:** average reward; differential values
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q004"></a>
### Q004 — `OUT` · bank-key-only

Which aspect of Temporal Difference makes it suitable for individuals with busy schedules?

- **A.** Fixed learning pace
- **B.** Limited access to resources
- **C.** Flexibility in scheduling
- **D.** Static course materials

**Supplied answer:** C. Flexibility in scheduling
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Flexibility in scheduling) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q005"></a>
### Q005 — `OUT` · bank-key-only

Which of the following is a technique for improving the accuracy of models with biased predictions?

- **A.** Introducing more bias into the model
- **B.** Regularization to penalize overly complex models
- **C.** Ignoring the bias and relying solely on historical data
- **D.** Using only one type of data source for model training

**Supplied answer:** B. Regularization to penalize overly complex models
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Regularization to penalize overly complex models) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Which of the following is a technique for improving the accuracy of models with biased predictions
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q006"></a>
### Q006 — `C1-M2` · correct

Which of the following best describes the exploration strategy known as epsilon-greedy?

- **A.** Always choosing the action with the highest Q-value
- **B.** Randomly choosing any action with equal probability
- **C.** Choosing the best-known action most of the time while occasionally exploring random actions
- **D.** Using a decaying learning rate to choose actions

**Supplied answer:** C. Choosing the best-known action most of the time while occasionally exploring random actions
**Learning verdict:** correct
**Why:** Option C (Choosing the best-known action most of the time while occasionally exploring random actions) matches the local lecture evidence. Epsilon is the exploration-branch probability.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15
**Related concept:** Epsilon-greedy behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q007"></a>
### Q007 — `OUT` · correct

How can Monte-Carlo Tree Search algorithms be modified to favor exploration in uncertain or less explored regions?

- **A.** By reducing the exploration constant
- **B.** By adjusting the reward function to penalize uncertainty
- **C.** By increasing the exploration constant
- **D.** By pruning less explored nodes

**Supplied answer:** C. By increasing the exploration constant
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. MCTS may use UCB as its tree policy, and the positive UCB constant controls the degree of exploration, so increasing it favors uncertainty more strongly. Reference answer: C — increase the exploration constant.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.7 Upper-Confidence-Bound Action Selection; Ch. 8, §8.11 Monte Carlo Tree Search, printed pp. 35, 36, 186, 187
**Reference explanation:** MCTS may use UCB as its tree policy, and the positive UCB constant controls the degree of exploration, so increasing it favors uncertainty more strongly.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q008"></a>
### Q008 — `C3-M2` · correct

What is the main purpose of using linear function approximation in reinforcement learning?

- **A.** To simplify the state space
- **B.** To reduce computational complexity
- **C.** To provide a way to generalize value functions
- **D.** To avoid using neural networks

**Supplied answer:** C. To provide a way to generalize value functions
**Learning verdict:** correct
**Why:** Option C (To provide a way to generalize value functions) matches the local lecture evidence. Q104/Q255 are not universally true without feature assumptions
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q009"></a>
### Q009 — `OUT` · bank-key-only

What role does the unpredictability of interstellar environments play in star exploration?

- **A.** It makes it easier to find habitable planets.
- **B.** It can lead to unexpected hazards and mission failures.
- **C.** It simplifies the navigation process.
- **D.** It ensures that all missions are successful.

**Supplied answer:** B. It can lead to unexpected hazards and mission failures.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (It can lead to unexpected hazards and mission failures.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** exploration
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q010"></a>
### Q010 — `C3-M3` · acceptable-with-caveat

What advantage does Tile Coding provide compared to a single large lookup table?

- **A.** Increased computational speed
- **B.** Reduced overfitting
- **C.** More memory efficiency
- **D.** Higher resolution of state representation

**Supplied answer:** C. More memory efficiency
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Tile coding provides sparse, computationally efficient features and generalization across nearby states; memory efficiency depends on the lookup-table comparison and implementation. Reference answer: The source-backed advantage is efficient sparse computation plus controlled generalization; C is defensible only with a specified memory comparison.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.5.4 Tile Coding, printed pp. 217, 218
**Reference explanation:** Tile coding provides sparse, computationally efficient features and generalization across nearby states; memory efficiency depends on the lookup-table comparison and implementation.
**Evidence tier:** book-supported (medium confidence), distinct from local-slide support
**Closest lecture context:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization

[Back to question navigation](#question-navigation)

---

<a id="q011"></a>
### Q011 — `C1-M4` · acceptable-with-caveat

Which algorithm is commonly used to solve MDPs by iteratively estimating the value function?

- **A.** Q-Learning
- **B.** SARSA
- **C.** Value Iteration
- **D.** Policy Iteration

**Supplied answer:** C. Value Iteration
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Value Iteration). Deck supports value iteration; broad “solve MDPs” wording omits assumptions.
**Primary lecture:** [1.12 Generalized Policy Iteration.pptx](#lecture-1-12), slides 6–10
**Related concept:** Value iteration
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q012"></a>
### Q012 — `C2-M5` · correct

What is the primary difference between Dyna-Q and Q-learning?

- **A.** Dyna-Q uses a model of the environment
- **B.** Q-learning updates Q-values online
- **C.** Q-learning is model-free, while Dyna-Q is model-based
- **D.** Dyna-Q is less prone to overestimation bias

**Supplied answer:** A. Dyna-Q uses a model of the environment
**Learning verdict:** correct
**Why:** Option A (Dyna-Q uses a model of the environment) matches the local lecture evidence. Dyna-Q adds learned-model planning to direct Q-learning. Options A and C are near-equivalent; supplied A is acceptable.
**Primary lecture:** [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12), slides 15–20
**Related concept:** Dyna-Q versus Q-learning
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q013"></a>
### Q013 — `C2-M5` · correct

Which of the following describes 'model-free' reinforcement learning methods?

- **A.** They rely on an explicit model of the environment
- **B.** They update policies based on simulated experiences
- **C.** They do not use a model of the environment
- **D.** They are used exclusively for planning

**Supplied answer:** C. They do not use a model of the environment
**Learning verdict:** correct
**Why:** Option C (They do not use a model of the environment) matches the local lecture evidence. Model-based use enables simulated consequences/planning; model-free omits that explicit model.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 3–7
**Related concept:** Model, model-free, and model-based approach
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q014"></a>
### Q014 — `C3-M3` · incorrect

Coarse coding can be seen as a form of which of the following in the context of state aggregation?

- **A.** Clustering
- **B.** Overfitting
- **C.** Exact encoding
- **D.** Model-free learning

**Supplied answer:** A. Clustering
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Coarse coding uses overlapping receptive fields; calling it clustering is misleading.
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q015"></a>
### Q015 — `C1-M5` · bank-key-only

How does the Policy Iteration Framework handle changing environments or goals?

- **A.** By completely discarding the current policy and starting from scratch
- **B.** By adjusting the policy gradually
- **C.** By ignoring changes and sticking to the initial policy
- **D.** None of the above

**Supplied answer:** B. By adjusting the policy gradually
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (By adjusting the policy gradually) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Policy iteration under changed dynamics/goals
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9–16

[Back to question navigation](#question-navigation)

---

<a id="q016"></a>
### Q016 — `C3-M5` · correct

In Actor-Critic, what does the "Actor" component represent?

- **A.** Estimates of the expected return
- **B.** The policy function
- **C.** The value function
- **D.** The exploration strategy

**Supplied answer:** B. The policy function
**Learning verdict:** correct
**Why:** Option B (The policy function) matches the local lecture evidence. Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q017"></a>
### Q017 — `C2-M2` · correct

Off-policy learning is particularly useful in which scenario?

- **A.** When the environment is static and unchanging
- **B.** When exploration is not necessary
- **C.** When learning from demonstrations or historical data
- **D.** When actions have immediate and deterministic outcomes

**Supplied answer:** C. When learning from demonstrations or historical data
**Learning verdict:** correct
**Why:** Option C (When learning from demonstrations or historical data) matches the local lecture evidence. Slide 4's random-target example wording is inconsistent; use the stable definitions on slides 3 and 5–10.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 3, 5–10
**Related concept:** Behavior versus target policy; learning from different/historical behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q018"></a>
### Q018 — `C1-M2` · correct

In the context of Monte-Carlo algorithms, what is meant by "exploration-exploitation trade-off"?

- **A.** Balancing the computational cost with the accuracy of results
- **B.** Balancing the depth of search with the breadth of search
- **C.** Balancing the search for new information with the use of known information
- **D.** Balancing the algorithm's speed with its stability

**Supplied answer:** C. Balancing the search for new information with the use of known information
**Learning verdict:** correct
**Why:** Option C (Balancing the search for new information with the use of known information) matches the local lecture evidence. “Monte Carlo” framing is incidental; cited concept is general.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 5–13
**Related concept:** Exploration–exploitation trade-off
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q019"></a>
### Q019 — `C3-M4` · incorrect

Which mathematical concept is essential for understanding differential value functions?

- **A.** Integration
- **B.** Differentiation
- **C.** Algebra
- **D.** Geometry

**Supplied answer:** C. Algebra
**Learning verdict:** incorrect
**Correct answer:** No unique option; expectations/probability and Bellman algebra are required.
**Why:** Sutton–Barto evidence contradicts the supplied key. Differential values are defined through expectations, average reward, and Bellman-style equations; no single listed branch of mathematics is uniquely essential. Reference answer: No unique option; expectations/probability and Bellman algebra are required.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 10, §§10.3 and 10.5 Average Reward and Differential Semi-gradient Sarsa, printed pp. 249, 250, 251, 255
**Reference explanation:** Differential values are defined through expectations, average reward, and Bellman-style equations; no single listed branch of mathematics is uniquely essential.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.8 Understand Average Reward.pptx](#lecture-3-8), slides 3–20
**Related concept:** average reward; differential values

[Back to question navigation](#question-navigation)

---

<a id="q020"></a>
### Q020 — `C1-M2` · correct

In the context of the k-armed bandit problem, what is meant by "exploitation"?

- **A.** Selecting arms at random to gather information.
- **B.** Selecting the arm with the highest estimated reward.
- **C.** Ignoring previously chosen arms.
- **D.** Maximizing the exploration rate.

**Supplied answer:** B. Selecting the arm with the highest estimated reward.
**Learning verdict:** correct
**Why:** Option B (Selecting the arm with the highest estimated reward.) matches the local lecture evidence. Exploitation uses the best current estimate, not guaranteed true best arm.
**Primary lecture:** [1.1. The K-Armed Bandit Problem.pptx](#lecture-1-1), slides 6
**Related concept:** Exploitation in a bandit
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q021"></a>
### Q021 — `C3-M3` · correct

How does coarse coding handle the trade-off between bias and variance?

- **A.** It increases bias by using fewer features
- **B.** It reduces bias by using a detailed state representation
- **C.** It balances bias and variance by using overlapping coarse features
- **D.** It primarily focuses on reducing variance

**Supplied answer:** C. It balances bias and variance by using overlapping coarse features
**Learning verdict:** correct
**Why:** Option C (It balances bias and variance by using overlapping coarse features) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q022"></a>
### Q022 — `C2-M3` · acceptable-with-caveat

Which characteristic distinguishes Temporal Difference(TD) methods from Dynamic Programming and Monte Carlo methods?

- **A.** TD methods are model-free.
- **B.** TD methods require the entire sequence of states, actions, and rewards.
- **C.** TD methods have high computational complexity.
- **D.** TD methods are suitable only for deterministic environments.

**Supplied answer:** A. TD methods are model-free.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (TD methods are model-free.). TD is model-free versus DP, but MC is also model-free; the proposed distinction in the first stem is incomplete.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 8, 17
**Related concept:** TD versus DP/MC model requirement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q023"></a>
### Q023 — `C2-M4` · correct

What does it mean for Q-learning to be off-policy?

- **A.** It learns the value of the policy it is currently following.
- **B.** It learns the value of the optimal policy while following a different policy.
- **C.** It learns the value of random actions.
- **D.** It does not follow any policy.

**Supplied answer:** B. It learns the value of the optimal policy while following a different policy.
**Learning verdict:** correct
**Why:** Option B (It learns the value of the optimal policy while following a different policy.) matches the local lecture evidence. “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 8–11
**Related concept:** Q-learning off-policy; contrast with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q024"></a>
### Q024 — `C3-M2` · correct

Which of the following is a disadvantage of using state aggregation?

- **A.** It simplifies the problem.
- **B.** It may lead to a loss of detail and precision.
- **C.** It increases the computational burden.
- **D.** It guarantees an exact value function.

**Supplied answer:** B. It may lead to a loss of detail and precision.
**Learning verdict:** correct
**Why:** Option B (It may lead to a loss of detail and precision.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q025"></a>
### Q025 — `C1-M3` · correct

Which of the following best describes a reward signal in reinforcement learning?

- **A.** Itis a fixed value assigned to each action regardless of the outcome.
- **B.** It is a numerical value given to the agent to indicate the success of an action.
- **C.** It is a symbolic representation of the agent's decision-making process.
- **D.** It is a sequence of states the agent goes through.

**Supplied answer:** B. It is a numerical value given to the agent to indicate the success of an action.
**Learning verdict:** correct
**Why:** Option B (It is a numerical value given to the agent to indicate the success of an action.) matches the local lecture evidence. Reward is scalar feedback, not accumulated return.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 8–9
**Related concept:** Reward signal
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q026"></a>
### Q026 — `OUT` · bank-key-only

What is discrimination in the context of learning and behavior?

- **A.** The process by which a response spreads from one specific stimulus to other stimuli that resemble the original.
- **B.** The ability to respond differently to similar but distinct stimuli.
- **C.** The reinforcement of a behavior in order to increase its frequency.
- **D.** The gradual weakening and disappearance of a conditioned response.

**Supplied answer:** B. The ability to respond differently to similar but distinct stimuli.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (The ability to respond differently to similar but distinct stimuli.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** discrimination and generalization
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q027"></a>
### Q027 — `C2-M3` · correct

What distinguishes Monte Carlo methods from Temporal-Difference (TD) methods?

- **A.** Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.
- **B.** Monte Carlo methods require a model of the environment, while TD methods do not.
- **C.** Monte Carlo methods can be used online, while TD methods cannot.
- **D.** Monte Carlo methods always converge faster than TD methods.

**Supplied answer:** A. Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.
**Learning verdict:** correct
**Why:** Option A (Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.) matches the local lecture evidence. The second stem is truncated but its intended contrast matches the slides.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 11–17
**Related concept:** MC full-return update versus TD one-step update
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q028"></a>
### Q028 — `C2-M2` · incorrect

What is the effect of using a more complex proposal distribution in importance sampling?

- **A.** It decreases the variance of the estimator.
- **B.** It increases the variance of the estimator.
- **C.** It reduces the bias of the estimator.
- **D.** It improves the efficiency of the estimator.

**Supplied answer:** A. It decreases the variance of the estimator.
**Learning verdict:** incorrect
**Correct answer:** No fixed effect follows from making a proposal distribution more complex; closeness and coverage relative to the target matter.
**Why:** Sutton–Barto evidence contradicts the supplied key. Importance-sampling variance depends on likelihood ratios and the relationship between target and behavior distributions; complexity alone does not determine variance. Reference answer: No fixed effect follows from making a proposal distribution more complex; closeness and coverage relative to the target matter.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §5.5 Off-policy Prediction via Importance Sampling, printed pp. 103, 104, 105, 106
**Reference explanation:** Importance-sampling variance depends on likelihood ratios and the relationship between target and behavior distributions; complexity alone does not determine variance.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–17
**Related concept:** Importance sampling and variance claims

[Back to question navigation](#question-navigation)

---

<a id="q029"></a>
### Q029 — `C3-M5` · correct

Which of the following statements is true about the Actor-Critic algorithm?

- **A.** It is a type of supervised learning algorithm
- **B.** It requires a separate neural network for each state-action pair
- **C.** It updates the policy based on the estimated advantage function
- **D.** Itis only applicable to discrete action spaces

**Supplied answer:** C. It updates the policy based on the estimated advantage function
**Learning verdict:** correct
**Why:** Option C (It updates the policy based on the estimated advantage function) matches the local lecture evidence. Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q030"></a>
### Q030 — `C3-M5` · incorrect

In the policy gradient theorem, what does the policy gradient represent?

- **A.** The slope of the value function
- **B.** The rate of change of the policy parameters
- **C.** The probability of taking each action
- **D.** The discounted future reward

**Supplied answer:** B. The rate of change of the policy parameters
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** The policy gradient is \(\nabla_\theta J(\theta)\): change in expected performance with respect to policy parameters.
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q031"></a>
### Q031 — `C1-M4` · acceptable-with-caveat

In the Bellman equation, what does V(s) represent?

- **A.** The expected reward starting from state s
- **B.** The value of taking action a in state s
- **C.** The transition probability from state s to state s'
- **D.** The discount factor

**Supplied answer:** A. The expected reward starting from state s
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (The expected reward starting from state s). Supplied “expected reward” is too narrow; slide says expected return.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 9–10
**Related concept:** State value meaning
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q032"></a>
### Q032 — `C2-M3` · incorrect

What is the main advantage of temporal-difference learning over other reinforcement learning methods?

- **A.** It requires less computational resources.
- **B.** It can handle non-stationary environments.
- **C.** It doesn't rely on rewards.
- **D.** It guarantees optimal policy convergence.

**Supplied answer:** A. It requires less computational resources.
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** TD's defining advantage is online bootstrapping without a model or complete episode, not simply lower compute.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3–6, 11–16
**Related concept:** Claimed TD advantage over MC
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q033"></a>
### Q033 — `OUT` · correct

What is a common method for ensuring adequate exploration in the initial stages of a Monte-Carlo Tree Search?

- **A.** Decreasing the exploration constant
- **B.** Increasing the exploration constant
- **C.** Reducing the number of simulations
- **D.** Pruning the tree aggressively

**Supplied answer:** B. Increasing the exploration constant
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. UCB is a valid MCTS tree policy, and its exploration constant controls how strongly uncertain actions are favored. Reference answer: B — increase the exploration constant.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.7; Ch. 8, §8.11, printed pp. 35, 36, 186, 187
**Reference explanation:** UCB is a valid MCTS tree policy, and its exploration constant controls how strongly uncertain actions are favored.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q034"></a>
### Q034 — `C3-M2` · acceptable-with-caveat

What does the MSVE objective aim to minimize in the context of policy evaluation?

- **A.** The variance of the rewards
- **B.** The difference between consecutive policy updates
- **C.** The sum of squared differences between the estimated and true values
- **D.** The number of policy iterations

**Supplied answer:** C. The sum of squared differences between the estimated and true values
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (The sum of squared differences between the estimated and true values). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q035"></a>
### Q035 — `OUT` · bank-key-only

Which of the following algorithms is more prone to overfitting in reinforcement learning?

- **A.** Value Iteration
- **B.** Policy Gradient
- **C.** Q-Learning
- **D.** Monte Carlo Methods

**Supplied answer:** B. Policy Gradient
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Policy Gradient) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** overfitting
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q036"></a>
### Q036 — `C1-M3` · correct

What is the primary goal of reinforcement learning?

- **A.** To classify data into different categories
- **B.** To minimize the error between predicted and actual values
- **C.** To maximize the cumulative reward over time
- **D.** To find patterns in unlabelled data

**Supplied answer:** C. To maximize the cumulative reward over time
**Learning verdict:** correct
**Why:** Option C (To maximize the cumulative reward over time) matches the local lecture evidence. Objective is total future/cumulative reward.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 12
**Related concept:** RL objective
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q037"></a>
### Q037 — `C4` · correct

In the context of Deep Q-Networks (DQN), what does the term "experience replay" refer to?

- **A.** Replaying a sequence of actions to improve exploration.
- **B.** Storing and reusing past experiences to stabilize learning.
- **C.** Replaying an episode when the agent performs poorly.
- **D.** None of the above.

**Supplied answer:** B. Storing and reusing past experiences to stabilize learning.
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. DQN stores transition tuples in replay memory and repeatedly samples past experiences for Q-learning updates, reducing correlation and instability. Reference answer: B — storing and reusing past experiences to stabilize learning.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 16, §16.5 Human-level Video Game Play, printed pp. 439, 440
**Reference explanation:** DQN stores transition tuples in replay memory and repeatedly samples past experiences for Q-learning updates, reducing correlation and instability.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** In the context of Deep Q-Networks (DQN), what does the term "experience replay" refer to

[Back to question navigation](#question-navigation)

---

<a id="q038"></a>
### Q038 — `C4` · correct

What is one strategy for detecting inaccuracies in predictive models?

- **A.** Trusting the model outputs blindly
- **B.** Validating the model against new data
- **C.** Ignoring feedback from stakeholders
- **D.** Relying solely on historical performance

**Supplied answer:** B. Validating the model against new data
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. The book recommends monitoring performance on validation data distinct from training data to detect generalization failure and overfitting. Reference answer: B — validate the model on new/held-out data.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.7 Nonlinear Function Approximation: Artificial Neural Networks, printed pp. 225, 226
**Reference explanation:** The book recommends monitoring performance on validation data distinct from training data to detect generalization failure and overfitting.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** What is one strategy for detecting inaccuracies in predictive models

[Back to question navigation](#question-navigation)

---

<a id="q039"></a>
### Q039 — `OUT` · bank-key-only

What does a Monte Carlo simulation typically produce?

- **A.** Asingle, exact result
- **B.** Arange of possible outcomes
- **C.** A linear equation
- **D.** A fixed constant

**Supplied answer:** B. Arange of possible outcomes
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Arange of possible outcomes) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** What does a Monte Carlo simulation typically produce
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q040"></a>
### Q040 — `C1-M5` · correct

What does the term "iterative" signify in Iterative Policy Evaluation?

- **A.** The process involves repeated computation until convergence
- **B.** It updates the policy in every iteration
- **C.** It requires iterating through all possible states
- **D.** It involves iterating through different reinforcement learning algorithms

**Supplied answer:** A. The process involves repeated computation until convergence
**Learning verdict:** correct
**Why:** Option A (The process involves repeated computation until convergence) matches the local lecture evidence. Repeated value refinement continues to a tolerance/convergence condition.
**Primary lecture:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 8–14, 21–28
**Related concept:** Meaning of iterative evaluation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q041"></a>
### Q041 — `C1-M5` · incorrect

What is the primary objective of policy control in reinforcement learning?

- **A.** Maximizing immediate rewards
- **B.** Minimizing state-action space
- **C.** Balancing exploration and exploitation
- **D.** Optimizing computational resources

**Supplied answer:** C. Balancing exploration and exploitation
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Control aims to find a policy maximizing expected return; exploration–exploitation is a means, not the objective.
**Primary lecture:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 3, 6
**Related concept:** Control objective
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q042"></a>
### Q042 — `OUT` · bank-key-only

In which field of study is the estimation of gradients using samples commonly applied?

- **A.** Quantum physics
- **B.** Computer graphics
- **C.** Sociology
- **D.** Linguistics

**Supplied answer:** B. Computer graphics
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Computer graphics) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** gradient estimation
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q043"></a>
### Q043 — `OUT` · bank-key-only

Which factor makes Temporal Difference particularly suitable for self-directed learners?

- **A.** Fixed learning pace
- **B.** Limited access to resources
- **C.** Adaptive learning pathways
- **D.** Static course materials

**Supplied answer:** C. Adaptive learning pathways
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Adaptive learning pathways) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q044"></a>
### Q044 — `C2-M4` · acceptable-with-caveat

What differentiates off-policy Q-learning from on-policy methods like SARSA?

- **A.** Q-learning uses past experiences while SARSA uses future predictions.
- **B.** Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.
- **C.** Q-learning requires a model of the environment, while SARSA does not.
- **D.** Q-learning is based on deterministic policies, while SARSA is based on stochastic policies.

**Supplied answer:** B. Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.). “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 8–11
**Related concept:** Q-learning off-policy; contrast with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q045"></a>
### Q045 — `C1-M4` · correct

What is the Bellman equation used for in the context of MDPs?

- **A.** To calculate the shortest path between states.
- **B.** To update the policy in reinforcement learning.
- **C.** To express the relationship between the value of a state and the values of its successor States.
- **D.** To compute the transition probabilities between states to get maximum rewards

**Supplied answer:** C. To express the relationship between the value of a state and the values of its successor States.
**Learning verdict:** correct
**Why:** Option C (To express the relationship between the value of a state and the values of its successor States.) matches the local lecture evidence. Exact-duplicate family with Q248/Q253.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3–8
**Related concept:** Bellman recursive relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q046"></a>
### Q046 — `C1-M4` · acceptable-with-caveat

What is the significance of the Bellman optimality equation in reinforcement learning?

- **A.** It defines the optimal exploration strategy
- **B.** It gives a recursive decomposition for the optimal policy
- **C.** It calculates the exact future rewards
- **D.** It simplifies the state transition probabilities

**Supplied answer:** B. It gives a recursive decomposition for the optimal policy
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It gives a recursive decomposition for the optimal policy). It decomposes optimal **values**; “optimal policy” wording skips the value/argmax distinction.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 6–7
**Related concept:** Bellman optimality significance
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q047"></a>
### Q047 — `C3-M4` · acceptable-with-caveat

Which algorithm is commonly used to estimate the average reward in reinforcement learning?

- **A.** Q-learning
- **B.** Monte Carlo methods
- **C.** Deep Q-Networks (DQN)
- **D.** Temporal Difference (TD) learning

**Supplied answer:** D. Temporal Difference (TD) learning
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Average reward is estimated incrementally inside differential TD/control algorithms such as differential semi-gradient Sarsa. Reference answer: A differential average-reward TD/control method; D is directionally right but too broad.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 10, §§10.3 and 10.5, printed pp. 249, 250, 255, 256
**Reference explanation:** Average reward is estimated incrementally inside differential TD/control algorithms such as differential semi-gradient Sarsa.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.8 Understand Average Reward.pptx](#lecture-3-8), slides 3–20
**Related concept:** average reward; differential values

[Back to question navigation](#question-navigation)

---

<a id="q048"></a>
### Q048 — `C3-M3` · incorrect

Which of the following algorithms is NOT typically used in reinforcement learning?

- **A.** Q-learning
- **B.** Sarsa
- **C.** Backpropagation
- **D.** Deep Deterministic Policy Gradient (DDPG)

**Supplied answer:** C. Backpropagation
**Learning verdict:** incorrect
**Correct answer:** None of the options: Q-learning, Sarsa, DDPG, and backpropagation are all used in RL, though backpropagation is an optimizer rather than an RL algorithm.
**Why:** Sutton–Barto evidence contradicts the supplied key. Backpropagation is widely used to train neural function approximators in RL, including DQN, so it is not a method 'not typically used' in RL. Reference answer: None of the options: Q-learning, Sarsa, DDPG, and backpropagation are all used in RL, though backpropagation is an optimizer rather than an RL algorithm.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.7; Ch. 16, §16.5, printed pp. 225, 226, 436, 439, 440
**Reference explanation:** Backpropagation is widely used to train neural function approximators in RL, including DQN, so it is not a method 'not typically used' in RL.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization

[Back to question navigation](#question-navigation)

---

<a id="q049"></a>
### Q049 — `C2-M4` · acceptable-with-caveat

In Q-learning, which term is used to update the Q-value for state s and action a?

- **A.** a (learning rate)
- **B.** B (exploration rate)
- **C.** 6 (error term)
- **D.** A (decay rate)

**Supplied answer:** A. a (learning rate)
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (a (learning rate)). The bank symbols are corrupted; the visual equation makes \(\alpha\)'s role explicit.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 10, 16
**Related concept:** Q-learning learning rate \(\alpha\)
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q050"></a>
### Q050 — `C2-M4` · correct

In Q-learning, how is the action value updated for a given state-action pair?

- **A.** Using the expected return
- **B.** Using the maximum action value of the next state
- **C.** Using the discounted reward of the next state
- **D.** Using the average of all action values

**Supplied answer:** B. Using the maximum action value of the next state
**Learning verdict:** correct
**Why:** Option B (Using the maximum action value of the next state) matches the local lecture evidence. One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\).
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3–7, 10, 16
**Related concept:** Q-learning target and iterative action-value improvement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q051"></a>
### Q051 — `C2-M3` · incorrect

In the context of Temporal Difference (TD), What is the primary advantage of TD(0) over Monte Carlo methods?

- **A.** Lower computational complexity
- **B.** Better convergence properties
- **C.** Ability to handle partial observability
- **D.** No dependence on policy selection

**Supplied answer:** A. Lower computational complexity
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** TD(0)'s defining advantage over MC is bootstrapping before episode termination; lower complexity is not universally primary.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3–6, 11–16
**Related concept:** Claimed TD advantage over MC
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q052"></a>
### Q052 — `C1-M3` · correct

Which of the following is an example of a continuing task?

- **A.** Writing a research paper in one sitting.
- **B.** Practicing a musical instrument daily.
- **C.** Completing a crossword puzzle.
- **D.** Painting a landscape over multiple sessions.

**Supplied answer:** B. Practicing a musical instrument daily.
**Learning verdict:** correct
**Why:** Option B (Practicing a musical instrument daily.) matches the local lecture evidence. Daily practice is continuing only if treated as ongoing without a defined endpoint.
**Primary lecture:** [1.6 Continuing Tasks.pptx](#lecture-1-6), slides 3–10
**Related concept:** Continuing-task example
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q053"></a>
### Q053 — `C1-M2` · bank-key-only

Which of the following techniques uses a decreasing probability of random actions over time to balance exploration and exploitation?

- **A.** Q-Learning
- **B.** Epsilon-Greedy
- **C.** Softmax
- **D.** Thompson Sampling

**Supplied answer:** B. Epsilon-Greedy
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Epsilon-Greedy) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Decaying epsilon
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15

[Back to question navigation](#question-navigation)

---

<a id="q054"></a>
### Q054 — `C2-M3` · incorrect

In the context of Temporal Difference (TD), Which factor influences the trade-off between exploration and exploitation in TD(0)?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Reward function
- **D.** Exploration rate

**Supplied answer:** D. Exploration rate
**Learning verdict:** incorrect
**Correct answer:** No exploration–exploitation parameter belongs to TD(0) prediction; in TD control, an exploration parameter such as epsilon controls it.
**Why:** Sutton–Barto evidence contradicts the supplied key. TD(0) prediction evaluates a fixed policy and has no exploration choice; exploration enters control algorithms such as Sarsa through the behavior policy. Reference answer: No exploration–exploitation parameter belongs to TD(0) prediction; in TD control, an exploration parameter such as epsilon controls it.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 6, §§6.1 and 6.4, printed pp. 119, 120, 129, 130
**Reference explanation:** TD(0) prediction evaluates a fixed policy and has no exploration choice; exploration enters control algorithms such as Sarsa through the behavior policy.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 11–12
**Related concept:** Exploration parameter in TD(0)

[Back to question navigation](#question-navigation)

---

<a id="q055"></a>
### Q055 — `C3-M5` · correct

Which of the following is true about the actor-critic method in reinforcement learning?

- **A.** The actor updates the value function while the critic updates the policy
- **B.** The critic updates the value function while the actor updates the policy
- **C.** Both the actor and critic update the policy
- **D.** Both the actor and critic update the value function

**Supplied answer:** B. The critic updates the value function while the actor updates the policy
**Learning verdict:** correct
**Why:** Option B (The critic updates the value function while the actor updates the policy) matches the local lecture evidence. Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q056"></a>
### Q056 — `OUT` · incorrect

Which term describes the process of gradually shaping behavior through the use of rewards?

- **A.** Punishment
- **B.** Extinction
- **C.** Reinforcement
- **D.** Conditioning

**Supplied answer:** C. Reinforcement
**Learning verdict:** incorrect
**Correct answer:** Shaping (none of the listed options).
**Why:** Sutton–Barto evidence contradicts the supplied key. The book names gradual reward-guided successive training as shaping, a term absent from the options. Reference answer: Shaping (none of the listed options).
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 17, §17.4 Designing Reward Signals, printed pp. 470
**Reference explanation:** The book names gradual reward-guided successive training as shaping, a term absent from the options.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** reward schedules and shaping

[Back to question navigation](#question-navigation)

---

<a id="q057"></a>
### Q057 — `C3-M5` · correct

What is the primary objective of policy gradient algorithms in reinforcement learning?

- **A.** Maximize the state-value function
- **B.** Minimize the action-value function
- **C.** Maximize the expected cumulative reward
- **D.** Minimize the exploration-exploitation trade-off

**Supplied answer:** C. Maximize the expected cumulative reward
**Learning verdict:** correct
**Why:** Option C (Maximize the expected cumulative reward) matches the local lecture evidence. Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q058"></a>
### Q058 — `C2-M4` · correct

What is one common exploration strategy used in conjunction with Expected Sarsa?

- **A.** Greedy policy
- **B.** Softmax selection
- **C.** e-greedy policy
- **D.** Random walk

**Supplied answer:** C. e-greedy policy
**Learning verdict:** correct
**Why:** Option C (e-greedy policy) matches the local lecture evidence. Deck uses epsilon-greedy in comparisons; it is common, not the only possible policy.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 7, 10, 14
**Related concept:** Epsilon-greedy policy with Expected Sarsa
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q059"></a>
### Q059 — `C2-M4` · correct

In Sarsa, the Q-value update rule uses which of the following to update the current state-action pair?

- **A.** Q(s', a') - Q(s, a)
- **B.** The reward received plus the discounted Q-value of the next state-action pair
- **C.** The reward received plus the maximum Q-value of the next state
- **D.** The reward received plus the average Q-value of the next state-action pair

**Supplied answer:** B. The reward received plus the discounted Q-value of the next state-action pair
**Learning verdict:** correct
**Why:** Option B (The reward received plus the discounted Q-value of the next state-action pair) matches the local lecture evidence. The target action \(A'\) is chosen by the same current policy used for behavior.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 5–10
**Related concept:** Sarsa sampled next action and on-policy relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q060"></a>
### Q060 — `OUT` · bank-key-only

Which of the following is NOT a benefit of learning with Temporal Difference?

- **A.** Personalized learning experiences
- **B.** Accessible anytime, anywhere
- **C.** Limited interaction with peers
- **D.** Self-paced learning

**Supplied answer:** C. Limited interaction with peers
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Limited interaction with peers) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q061"></a>
### Q061 — `C1-M4` · acceptable-with-caveat

What role does the discount factor y play in the state value function?

- **A.** It balances the trade-off between exploration and exploitation to get maximum rewards
- **B.** It determines the importance of future rewards in the value function
- **C.** It adjusts the learning rate of the state value function
- **D.** It controls the randomness in the policy

**Supplied answer:** B. It determines the importance of future rewards in the value function
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It determines the importance of future rewards in the value function). OCR `y` should be read as gamma; it weights delayed rewards.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 10
**Related concept:** Discount factor in state value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q062"></a>
### Q062 — `C3-M3` · correct

How does coarse coding help in handling large state spaces in reinforcement learning?

- **A.** By dividing the state space into non-overlapping regions
- **B.** By using a high-dimensional binary feature vector for each state
- **C.** By approximating value functions over a coarsely divided state space
- **D.** By applying a hierarchical approach to action selection

**Supplied answer:** C. By approximating value functions over a coarsely divided state space
**Learning verdict:** correct
**Why:** Option C (By approximating value functions over a coarsely divided state space) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q063"></a>
### Q063 — `C3-M4` · incorrect

When might the average reward fail as a performance metric in reinforcement learning?

- **A.** In deterministic environments
- **B.** When the reward distribution is uniform
- **C.** In environments with sparse rewards
- **D.** When the agent only receives positive rewards

**Supplied answer:** C. In environments with sparse rewards
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Sparse reward makes finite-sample estimates difficult, but does not make the average-reward objective invalid.
**Primary lecture:** [3.8 Understand Average Reward.pptx](#lecture-3-8), slides 3–20
**Related concept:** average reward; differential values
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q064"></a>
### Q064 — `C1-M2` · incorrect

What is a common technique to reduce the impact of overly optimistic initial values over time?

- **A.** Decaying exploration rate
- **B.** Increasing learning rate
- **C.** Dynamic programming
- **D.** Reducing the discount factor

**Supplied answer:** A. Decaying exploration rate
**Learning verdict:** incorrect
**Correct answer:** Repeated value updates wash out the optimistic estimates; none of the options states this mechanism.
**Why:** Sutton–Barto evidence contradicts the supplied key. Optimistic bias is reduced as action-value estimates are repeatedly updated; a decaying exploration rate does not directly remove the initial optimism. Reference answer: Repeated value updates wash out the optimistic estimates; none of the options states this mechanism.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.6 Optimistic Initial Values, printed pp. 34, 35
**Reference explanation:** Optimistic bias is reduced as action-value estimates are repeatedly updated; a decaying exploration rate does not directly remove the initial optimism.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.2. Estimating Action Values.pptx](#lecture-1-2), slides 3–9
**Related concept:** Optimistic initial values

[Back to question navigation](#question-navigation)

---

<a id="q065"></a>
### Q065 — `C1-M3` · correct

What is the purpose of the discount factor (gamma, y) in reinforcement learning?

- **A.** To control the learning rate of the agent
- **B.** To prioritize recent rewards over distant future rewards
- **C.** To balance exploration and exploitation
- **D.** To determine the convergence rate of the algorithm

**Supplied answer:** B. To prioritize recent rewards over distant future rewards
**Learning verdict:** correct
**Why:** Option B (To prioritize recent rewards over distant future rewards) matches the local lecture evidence. Gamma controls delayed-reward weight and finite discounted return.
**Primary lecture:** [1.6 Continuing Tasks.pptx](#lecture-1-6), slides 11–15
**Related concept:** Purpose of gamma
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q066"></a>
### Q066 — `C3-M5` · correct

Which of the following is NOT a variation of policy gradient methods?

- **A.** Deep Q-Network (DQN)
- **B.** Trust Region Policy Optimization (TRPO)
- **C.** Deterministic Policy Gradient (DPG)
- **D.** Natural Policy Gradient (NPG)

**Supplied answer:** A. Deep Q-Network (DQN)
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. Policy-gradient methods directly parameterize and optimize a policy, whereas DQN combines Q-learning with a deep action-value network. Reference answer: A — DQN is value-based, not a policy-gradient variation.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 13, §13.1; Ch. 16, §16.5, printed pp. 321, 322, 436, 437, 439
**Reference explanation:** Policy-gradient methods directly parameterize and optimize a policy, whereas DQN combines Q-learning with a deep action-value network.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles

[Back to question navigation](#question-navigation)

---

<a id="q067"></a>
### Q067 — `C3-M5` · correct

What is Softmax policy parameterization primarily used for in reinforcement learning?

- **A.** Feature selection
- **B.** Action selection
- **C.** State representation
- **D.** Reward calculation

**Supplied answer:** B. Action selection
**Learning verdict:** correct
**Why:** Option B (Action selection) matches the local lecture evidence. temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q068"></a>
### Q068 — `C1-M4` · correct

What does the term "policy" refer to in the context of reinforcement learning?

- **A.** Asequence of actions
- **B.** Amapping from states to actions
- **C.** Asequence of rewards
- **D.** Amapping from actions to states

**Supplied answer:** B. Amapping from states to actions
**Learning verdict:** correct
**Why:** Option B (Amapping from states to actions) matches the local lecture evidence. Deterministic mapping and stochastic distribution are both supported.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 3–7
**Related concept:** Policy definition
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q069"></a>
### Q069 — `C1-M3` · acceptable-with-caveat

Why might shaping rewards be necessary in reinforcement learning?

- **A.** To make the learning process more challenging
- **B.** To encourage exploration of less obvious actions
- **C.** To prevent the agent from achieving the goal
- **D.** To simplify the reward structure for the agent

**Supplied answer:** B. To encourage exploration of less obvious actions
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Shaping can address sparse reward by guiding the learner through easier stages, but it is not simply or universally 'encouraging less obvious actions'. Reference answer: Reward shaping supplies informative intermediate guidance when rewards are sparse; B is only a loose possible effect.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 17, §17.4 Designing Reward Signals, printed pp. 469, 470
**Reference explanation:** Shaping can address sparse reward by guiding the learner through easier stages, but it is not simply or universally 'encouraging less obvious actions'.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 8–12
**Related concept:** Reward shaping

[Back to question navigation](#question-navigation)

---

<a id="q070"></a>
### Q070 — `C1-M2` · bank-key-only

In reinforcement learning, what does the temperature parameter represent?

- **A.** The learning rate
- **B.** The exploration-exploitation trade-off
- **C.** The discount factor
- **D.** The number of episodes

**Supplied answer:** B. The exploration-exploitation trade-off
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (The exploration-exploitation trade-off) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Softmax temperature
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 1–20

[Back to question navigation](#question-navigation)

---

<a id="q071"></a>
### Q071 — `C2-M4` · correct

What does the Bellman equation for Q-learning update represent?

- **A.** The average reward per state
- **B.** The relationship between the Q-value of a state-action pair and the expected future rewards
- **C.** The difference between the expected and actual reward
- **D.** The probability of transitioning to a new state

**Supplied answer:** B. The relationship between the Q-value of a state-action pair and the expected future rewards
**Learning verdict:** correct
**Why:** Option B (The relationship between the Q-value of a state-action pair and the expected future rewards) matches the local lecture evidence. One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\).
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3–7, 10, 16
**Related concept:** Q-learning target and iterative action-value improvement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q072"></a>
### Q072 — `C2-M5` · correct

Which method involves using a model to simulate the environment for planning in reinforcement learning?

- **A.** Model-free methods
- **B.** Model-based methods
- **C.** Policy gradient methods
- **D.** Genetic algorithms

**Supplied answer:** B. Model-based methods
**Learning verdict:** correct
**Why:** Option B (Model-based methods) matches the local lecture evidence. Slide 3 says “unimproved policy,” a typo contradicted by slides 4–5 and the objectives.
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–10
**Related concept:** Planning uses a model to simulate/evaluate future outcomes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q073"></a>
### Q073 — `C2-M2` · correct

Which of the following best describes Monte Carlo methods in the context of reinforcement learning?

- **A.** Methods that require a model of the environment to update policies.
- **B.** Methods that use a deterministic approach to update state values.
- **C.** Methods that use random sampling to estimate value functions and update policies.
- **D.** Methods that always guarantee finding the optimal policy.

**Supplied answer:** C. Methods that use random sampling to estimate value functions and update policies.
**Learning verdict:** correct
**Why:** Option C (Methods that use random sampling to estimate value functions and update policies.) matches the local lecture evidence. The broad “reinforcement learning” classification is true but less useful than the sampled-return mechanism.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 3–8
**Related concept:** MC uses random sampled episodes to estimate values/policies
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q074"></a>
### Q074 — `C2-M4` · incorrect

Why might Expected Sarsa be preferred in environments with large action spaces?

- **A.** It requires fewer samples for each update
- **B.** It avoids the need for a policy altogether
- **C.** It can better handle the uncertainty of many possible actions
- **D.** It simplifies the computation of the Q-value updates

**Supplied answer:** C. It can better handle the uncertainty of many possible actions
**Learning verdict:** incorrect
**Correct answer:** The premise is false without extra structure; Expected Sarsa can be more expensive because it computes an expectation over actions.
**Why:** Sutton–Barto evidence contradicts the supplied key. Expected Sarsa explicitly sums action values over the policy and is computationally more complex than Sarsa, so large action spaces do not provide the claimed preference. Reference answer: The premise is false without extra structure; Expected Sarsa can be more expensive because it computes an expectation over actions.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 6, §6.6 Expected Sarsa, printed pp. 133
**Reference explanation:** Expected Sarsa explicitly sums action values over the policy and is computationally more complex than Sarsa, so large action spaces do not provide the claimed preference.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 12–13
**Related concept:** Expected Sarsa in large action spaces

[Back to question navigation](#question-navigation)

---

<a id="q075"></a>
### Q075 — `C3-M5` · acceptable-with-caveat

In policy improvement, what does the policy gradient represent?

- **A.** Direction of steepest ascent in the parameter space
- **B.** Direction of steepest descent in the parameter space
- **C.** Magnitude of immediate reward
- **D.** Probability of selecting an action

**Supplied answer:** A. Direction of steepest ascent in the parameter space
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Direction of steepest ascent in the parameter space). Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q076"></a>
### Q076 — `C3-M2` · correct

Why is generalization important in reinforcement learning?

- **A.** To avoid overfitting to specific states
- **B.** To increase the state space size
- **C.** To ensure each state is precisely defined
- **D.** To complicate the learning algorithm

**Supplied answer:** A. To avoid overfitting to specific states
**Learning verdict:** correct
**Why:** Option A (To avoid overfitting to specific states) matches the local lecture evidence. Q104/Q255 are not universally true without feature assumptions
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q077"></a>
### Q077 — `C2-M4` · correct

What is the primary difference between Sarsa and Expected Sarsa in reinforcement learning?

- **A.** Sarsa uses the maximum Q-value of the next state
- **B.** Expected Sarsa uses the maximum Q-value of the next state
- **C.** Sarsa uses a sample of the previous state's Q-value
- **D.** Expected Sarsa uses the expected value of the next state's Q-value

**Supplied answer:** D. Expected Sarsa uses the expected value of the next state's Q-value
**Learning verdict:** correct
**Why:** Option D (Expected Sarsa uses the expected value of the next state's Q-value) matches the local lecture evidence. “Weighted sum” matches the displayed equation.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12–13
**Related concept:** Expected Sarsa's probability-weighted next-action value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q078"></a>
### Q078 — `C1-M2` · incorrect

Which of the following is NOT a characteristic of Epsilon-soft policies?

- **A.** Flexibility
- **B.** Transparency
- **C.** Rigidity
- **D.** Accountability

**Supplied answer:** C. Rigidity
**Learning verdict:** incorrect
**Correct answer:** No unique option; use the probability-floor definition of epsilon-soft.
**Why:** Sutton–Barto evidence contradicts the supplied key. An epsilon-soft policy assigns every action at least epsilon divided by the action count; flexibility, transparency, rigidity, and accountability are not its defining characteristics. Reference answer: No unique option; use the probability-floor definition of epsilon-soft.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §5.4 Monte Carlo Control without Exploring Starts, printed pp. 100, 101
**Reference explanation:** An epsilon-soft policy assigns every action at least epsilon divided by the action count; flexibility, transparency, rigidity, and accountability are not its defining characteristics.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15
**Related concept:** Epsilon-soft policy

[Back to question navigation](#question-navigation)

---

<a id="q079"></a>
### Q079 — `C3-M2` · acceptable-with-caveat

What is a common issue when using the mean-squared value error for large state spaces?

- **A.** Overfitting
- **B.** Underfitting
- **C.** Computational complexity
- **D.** Lack of convergence

**Supplied answer:** C. Computational complexity
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Computational complexity). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q080"></a>
### Q080 — `C1-M5` · correct

Which of the following best describes the time complexity of dynamic programming algorithms?

- **A.** Exponential
- **B.** Polynomial
- **C.** Logarithmic
- **D.** Linear

**Supplied answer:** B. Polynomial
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. The book states that, ignoring technical details, worst-case DP time for a finite MDP is polynomial in the numbers of states and actions. Reference answer: B — polynomial.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 4, §4.7 Efficiency of Dynamic Programming, printed pp. 87
**Reference explanation:** The book states that, ignoring technical details, worst-case DP time for a finite MDP is polynomial in the numbers of states and actions.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.12 Generalized Policy Iteration.pptx](#lecture-1-12), slides 8–13
**Related concept:** DP time complexity

[Back to question navigation](#question-navigation)

---

<a id="q081"></a>
### Q081 — `C2-M2` · acceptable-with-caveat

In importance sampling, what does the proposal distribution refer to?

- **A.** The distribution from which samples are drawn
- **B.** The distribution of the target variable
- **C.** The distribution of the importance weights
- **D.** The distribution of the estimator

**Supplied answer:** A. The distribution from which samples are drawn
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (The distribution from which samples are drawn). The deck calls the sampling distribution \(b\); “proposal” is bank wording. It supports mismatch correction, not a universal quality formula.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–17
**Related concept:** Proposal/behavior distribution and target closeness
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q082"></a>
### Q082 — `C1-M3` · acceptable-with-caveat

How does the discount rate affect intertemporal choices in continuing tasks?

- **A.** It has no effect on intertemporal choices
- **B.** It influences the perception of the relative value of immediate versus delayed rewards
- **C.** It determines the time it takes to complete the task
- **D.** It dictates the level of risk associated with the task

**Supplied answer:** B. It influences the perception of the relative value of immediate versus delayed rewards
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It influences the perception of the relative value of immediate versus delayed rewards). Larger gamma gives delayed rewards relatively more weight.
**Primary lecture:** [1.6 Continuing Tasks.pptx](#lecture-1-6), slides 11–15
**Related concept:** Discounting and immediate/delayed choice
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q083"></a>
### Q083 — `OUT` · bank-key-only

What advantage does Temporal Difference offer in terms of accessibility?

- **A.** Restriction to specific devices
- **B.** Fixed location for learning
- **C.** Accessible anytime, anywhere
- **D.** Limited availability of course materials

**Supplied answer:** C. Accessible anytime, anywhere
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Accessible anytime, anywhere) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q084"></a>
### Q084 — `C3-M3` · correct

What is the impact of the granularity of coarse coding on learning?

- **A.** Finer granularity increases generalization but decreases learning speed
- **B.** Coarser granularity decreases generalization but increases learning speed
- **C.** Finer granularity decreases both generalization and learning speed
- **D.** Coarser granularity increases both generalization and learning speed

**Supplied answer:** D. Coarser granularity increases both generalization and learning speed
**Learning verdict:** correct
**Why:** Option D (Coarser granularity increases both generalization and learning speed) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q085"></a>
### Q085 — `OUT` · acceptable-with-caveat

Which exploration method in Monte Carlo control assigns exploration bonuses based on the number of times an action has been selected?

- **A.** UCB (Upper Confidence Bound)
- **B.** e-greedy
- **C.** Thompson Sampling
- **D.** Boltzmann Exploration

**Supplied answer:** A. UCB (Upper Confidence Bound)
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. The UCB bonus explicitly depends on how often an action has been selected and favors uncertain/under-sampled actions. Reference answer: A — UCB.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.7 Upper-Confidence-Bound Action Selection, printed pp. 35, 36
**Reference explanation:** The UCB bonus explicitly depends on how often an action has been selected and favors uncertain/under-sampled actions.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** exploration

[Back to question navigation](#question-navigation)

---

<a id="q086"></a>
### Q086 — `C2-M4` · acceptable-with-caveat

In Expected Sarsa, what does the parameter y represent?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Exploration rate
- **D.** Update rate

**Supplied answer:** B. Discount factor
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (Discount factor). Source symbol is \(\gamma\); corrupted “y” in the bank is discount factor.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5
**Related concept:** Discount factor in Expected Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q087"></a>
### Q087 — `C3-M5` · correct

In reinforcement learning, what does the policy gradient method aim to optimize?

- **A.** The value function
- **B.** The Q-function
- **C.** The policy directly
- **D.** The reward function

**Supplied answer:** C. The policy directly
**Learning verdict:** correct
**Why:** Option C (The policy directly) matches the local lecture evidence. Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q088"></a>
### Q088 — `C1-M3` · correct

Which of the following is NOT a typical component of a reinforcement learning model?

- **A.** State transition probabilities
- **B.** Reward function
- **C.** Policy network
- **D.** Action space

**Supplied answer:** C. Policy network
**Learning verdict:** correct
**Why:** Option C (Policy network) matches the local lecture evidence. Required components are listed; “policy network” is not a required basic component here.
**Primary lecture:** [1.4 Introduction to Markov Decision Processes  .pptx](#lecture-1-4), slides 9–11
**Related concept:** Basic RL components
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q089"></a>
### Q089 — `OUT` · bank-key-only

Why is it difficult to design technology for star exploration?

- **A.** Limited understanding of the necessary physics.
- **B.** The high levels of electromagnetic interference.
- **C.** Rapid technological advancements.
- **D.** The need for materials that can withstand extreme conditions.

**Supplied answer:** D. The need for materials that can withstand extreme conditions.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer D (The need for materials that can withstand extreme conditions.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** exploration
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q090"></a>
### Q090 — `C1-M4` · correct

In reinforcement learning, the state value function V(s) represents:

- **A.** The immediate reward received after taking an action in state s
- **B.** The total accumulated reward from state s
- **C.** The expected return starting from state s
- **D.** The likelihood of transitioning from state s to another state

**Supplied answer:** C. The expected return starting from state s
**Learning verdict:** correct
**Why:** Option C (The expected return starting from state s) matches the local lecture evidence. Expected return from a state under a policy.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 9–10
**Related concept:** State value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q091"></a>
### Q091 — `C3-M5` · acceptable-with-caveat

Which factor influences the stability of policy gradient algorithms during training?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Exploration rate
- **D.** Entropy regularization

**Supplied answer:** A. Learning rate
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. Policy-gradient updates include a step-size/learning-rate parameter, so it affects training behavior, but discounting, sampling variance, and regularization can also affect stability. Reference answer: A is a valid factor, not a uniquely exhaustive one.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 13, §§13.2–13.4, printed pp. 324, 326, 329
**Reference explanation:** Policy-gradient updates include a step-size/learning-rate parameter, so it affects training behavior, but discounting, sampling variance, and regularization can also affect stability.
**Evidence tier:** book-supported (medium confidence), distinct from local-slide support
**Closest lecture context:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem

[Back to question navigation](#question-navigation)

---

<a id="q092"></a>
### Q092 — `OUT` · bank-key-only

How does Temporal Difference enhance engagement compared to traditional learning methods?

- **A.** By providing passive learning experiences
- **B.** By limiting interaction with instructors
- **C.** By offering real-time feedback and interactivity
- **D.** By restricting access to course materials

**Supplied answer:** C. By offering real-time feedback and interactivity
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (By offering real-time feedback and interactivity) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q093"></a>
### Q093 — `C3-M5` · correct

Which of the following methods uses parameterized functions to directly approximate the policy in reinforcement learning?

- **A.** Q-learning
- **B.** SARSA
- **C.** Deep Q-Networks (DQN)
- **D.** Policy Gradient Methods

**Supplied answer:** D. Policy Gradient Methods
**Learning verdict:** correct
**Why:** Option D (Policy Gradient Methods) matches the local lecture evidence. temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q094"></a>
### Q094 — `OUT` · acceptable-with-caveat

In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula typically depend on?

- **A.** The depth of the tree
- **B.** The number of simulations
- **C.** The average reward
- **D.** The total number of times a node has been visited

**Supplied answer:** D. The total number of times a node has been visited
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. The UCB exploration bonus depends on both a parent/overall visit count and the candidate action's visit count; MCTS may use that rule as its tree policy. Reference answer: Both parent-node visits and child/action visits, commonly through sqrt(log N(parent)/N(parent,action)); D is incomplete.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.7; Ch. 8, §8.11, printed pp. 35, 36, 186, 187
**Reference explanation:** The UCB exploration bonus depends on both a parent/overall visit count and the candidate action's visit count; MCTS may use that rule as its tree policy.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q095"></a>
### Q095 — `C1-M2` · bank-key-only

What is the main purpose of using a decaying epsilon in the Epsilon-Greedy strategy?

- **A.** To increase the randomness of actions over time.
- **B.** To decrease the randomness of actions over time.
- **C.** To maintain a constant level of exploration.
- **D.** To switch to a different policy entirely.

**Supplied answer:** B. To decrease the randomness of actions over time.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (To decrease the randomness of actions over time.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Decaying epsilon purpose
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15

[Back to question navigation](#question-navigation)

---

<a id="q096"></a>
### Q096 — `C1-M2` · correct

Which method can be used to encourage exploration in reinforcement learning?

- **A.** Setting a high discount factor
- **B.** Using a fixed learning rate
- **C.** Implementing an €-greedy policy
- **D.** Decreasing the reward values

**Supplied answer:** C. Implementing an €-greedy policy
**Learning verdict:** correct
**Why:** Option C (Implementing an €-greedy policy) matches the local lecture evidence. OCR-corrupted epsilon does not change the concept.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15
**Related concept:** Epsilon-greedy as exploration
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q097"></a>
### Q097 — `C1-M4` · correct

What is a deterministic policy in reinforcement learning?

- **A.** A policy that selects actions based on a random process
- **B.** A policy that selects actions with a fixed probability distribution
- **C.** A policy that selects the same action for a given state every time
- **D.** Apolicy that changes based on the environment

**Supplied answer:** C. A policy that selects the same action for a given state every time
**Learning verdict:** correct
**Why:** Option C (A policy that selects the same action for a given state every time) matches the local lecture evidence. One certain action per state.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 4–5
**Related concept:** Deterministic policy
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q098"></a>
### Q098 — `C3-M2` · correct

In reinforcement learning, what is the purpose of using a parameterized function to approximate the value function?

- **A.** To reduce the exploration space
- **B.** To simplify the problem by reducing the number of actions
- **C.** To generalize the value function across different states
- **D.** To guarantee an exact solution

**Supplied answer:** C. To generalize the value function across different states
**Learning verdict:** correct
**Why:** Option C (To generalize the value function across different states) matches the local lecture evidence. Q104/Q255 are not universally true without feature assumptions
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q099"></a>
### Q099 — `OUT` · correct

Which of the following techniques is commonly used to balance exploration and exploitation in Monte-Carlo Tree Search (MCTS)?

- **A.** Minimax algorithm
- **B.** Upper Confidence Bound (UCB)
- **C.** Simulated annealing
- **D.** Genetic algorithms

**Supplied answer:** B. Upper Confidence Bound (UCB)
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. The book explicitly names UCB as a tree-policy rule that balances exploration and exploitation in MCTS. Reference answer: B — UCB.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §8.11 Monte Carlo Tree Search, printed pp. 186, 187
**Reference explanation:** The book explicitly names UCB as a tree-policy rule that balances exploration and exploitation in MCTS.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q100"></a>
### Q100 — `C1-M3` · correct

In the context of reinforcement learning, what does a negative reward signify?

- **A.** It indicates the agent has achieved the goal.
- **B.** It discourages the agent from repeating the action that led to it.
- **C.** It has no impact on the agent's future actions.
- **D.** It stops the learning process.

**Supplied answer:** B. It discourages the agent from repeating the action that led to it.
**Learning verdict:** correct
**Why:** Option B (It discourages the agent from repeating the action that led to it.) matches the local lecture evidence. Deck frames negative feedback/punishment broadly; it does not guarantee one action is never repeated.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 6, 9
**Related concept:** Negative reward
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q101"></a>
### Q101 — `OUT` · acceptable-with-caveat

In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula ty depend on?

- **A.** The depth of the tree
- **B.** The number of simulations
- **C.** The average reward
- **D.** The total number of times a node has been visited

**Supplied answer:** D. The total number of times a node has been visited
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. The MCTS UCB term uses both the total/parent visit count and the action-specific visit count, not merely one count. Reference answer: Both parent and action visit counts; D is incomplete.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.7; Ch. 8, §8.11, printed pp. 35, 36, 186, 187
**Reference explanation:** The MCTS UCB term uses both the total/parent visit count and the action-specific visit count, not merely one count.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q102"></a>
### Q102 — `OUT` · correct

Why is the balance between discrimination and generalization crucial in adaptive learning systems?

- **A.** It ensures consistent repetition of known tasks.
- **B.** It avoids the need for discrimination.
- **C.** It allows the system to apply learned knowledge to new situations while recognizing differences.
- **D.** It reduces the system's processing power.

**Supplied answer:** C. It allows the system to apply learned knowledge to new situations while recognizing differences.
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. Broad features enable transfer/generalization between similar states while sufficient feature resolution preserves fine discrimination. Reference answer: C — apply knowledge to similar situations while retaining distinctions.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.5.3 Coarse Coding, printed pp. 215, 216
**Reference explanation:** Broad features enable transfer/generalization between similar states while sufficient feature resolution preserves fine discrimination.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** discrimination and generalization

[Back to question navigation](#question-navigation)

---

<a id="q103"></a>
### Q103 — `C3-M5` · bank-key-only

In reinforcement learning, what does the temperature parameter 1 represent?

- **A.** The learning rate
- **B.** The exploration-exploitation trade-off
- **C.** The discount factor
- **D.** The number of episodes

**Supplied answer:** B. The exploration-exploitation trade-off
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (The exploration-exploitation trade-off) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** direct parameterized policy; softmax preferences
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9

[Back to question navigation](#question-navigation)

---

<a id="q104"></a>
### Q104 — `C3-M2` · acceptable-with-caveat

Which problem arises due to the use of linear function approximation in reinforcement learning?

- **A.** Overfitting
- **B.** Curse of dimensionality
- **C.** Underfitting
- **D.** Vanishing gradients

**Supplied answer:** C. Underfitting
**Learning verdict:** acceptable-with-caveat
**Why:** Linear approximation can underfit with inadequate features, but underfitting is not inherent.
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q105"></a>
### Q105 — `C2-M3` · correct

Which statement best describes Tabular Temporal Difference (TD) learning?

- **A.** It uses a table to store values for each state-action pair.
- **B.** It uses function approximation to estimate value functions.
- **C.** It updates values based on rewards and State transitions without using tables.
- **D.** It requires the exact model of the environment.

**Supplied answer:** A. It uses a table to store values for each state-action pair.
**Learning verdict:** correct
**Why:** Option A (It uses a table to store values for each state-action pair.) matches the local lecture evidence. Exact duplicate family. The slide shows state-value table entries, while options mention state-action pairs; tabular storage is the stable concept.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 11–12
**Related concept:** Tabular TD stores separate table entries
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q106"></a>
### Q106 — `C1-M5` · correct

What is Policy Evaluation in reinforcement learning?

- **A.** Determining the optimal policy
- **B.** Assessing the quality of a given policy
- **C.** Selecting the best action in a given state
- **D.** Updating the state-action values

**Supplied answer:** B. Assessing the quality of a given policy
**Learning verdict:** correct
**Why:** Option B (Assessing the quality of a given policy) matches the local lecture evidence. Determine the value function for a specified policy.
**Primary lecture:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 3–5
**Related concept:** Policy evaluation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q107"></a>
### Q107 — `OUT` · bank-key-only

How can generalization be reduced in a learning environment?

- **A.** By reinforcing behaviors inconsistently.
- **B.** By using a variety of stimuli during training.
- **C.** By providing specific cues for different responses.
- **D.** By not reinforcing any behavior.

**Supplied answer:** C. By providing specific cues for different responses.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (By providing specific cues for different responses.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** discrimination and generalization
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q108"></a>
### Q108 — `C2-M4` · correct

In Expected Sarsa, the expectation is taken over which element?

- **A.** Future states
- **B.** Rewards
- **C.** Possible next actions
- **D.** Current state values

**Supplied answer:** C. Possible next actions
**Learning verdict:** correct
**Why:** Option C (Possible next actions) matches the local lecture evidence. “Weighted sum” matches the displayed equation.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12–13
**Related concept:** Expected Sarsa's probability-weighted next-action value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q109"></a>
### Q109 — `C2-M5` · incorrect

What is the primary purpose of Dyna Architecture?

- **A.** To develop operating systems
- **B.** To design scalable web servers
- **C.** To model complex dynamic systems
- **D.** To manage database transactions

**Supplied answer:** C. To model complex dynamic systems
**Learning verdict:** incorrect
**Correct answer:** None of the options: Dyna integrates learning, a model, simulated planning updates, and acting.
**Why:** Sutton–Barto evidence contradicts the supplied key. Dyna unifies direct RL, model learning, planning, and acting; it is not primarily a general architecture for modeling complex dynamic systems. Reference answer: None of the options: Dyna integrates learning, a model, simulated planning updates, and acting.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.1–8.2, printed pp. 159, 160, 161, 162
**Reference explanation:** Dyna unifies direct RL, model learning, planning, and acting; it is not primarily a general architecture for modeling complex dynamic systems.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12), slides 3–7, 11–15
**Related concept:** Purpose of Dyna architecture

[Back to question navigation](#question-navigation)

---

<a id="q110"></a>
### Q110 — `C2-M2` · acceptable-with-caveat

Which factor determines the quality of the estimate in importance sampling?

- **A.** The size of the sample
- **B.** The closeness of the proposal distribution to the target distribution
- **C.** The number of iterations in the estimation process
- **D.** The order of convergence of the estimator

**Supplied answer:** B. The closeness of the proposal distribution to the target distribution
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The closeness of the proposal distribution to the target distribution). The deck calls the sampling distribution \(b\); “proposal” is bank wording. It supports mismatch correction, not a universal quality formula.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–17
**Related concept:** Proposal/behavior distribution and target closeness
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q111"></a>
### Q111 — `OUT` · bank-key-only

Which aspect of Temporal Difference makes it advantageous for learners?

- **A.** Real-time feedback
- **B.** Delayed response mechanism
- **C.** Limited access to course materials
- **D.** Static content delivery

**Supplied answer:** A. Real-time feedback
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Real-time feedback) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** temporal-difference learning claims
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q112"></a>
### Q112 — `OUT` · acceptable-with-caveat

What is the primary objective of reinforcement learning in build mode?

- **A.** To minimize the time spent on training
- **B.** To find the optimal strategy for an agent to maximize cumulative reward
- **C.** To reduce the size of the neural network
- **D.** To ensure the agent performs well in a single task

**Supplied answer:** B. To find the optimal strategy for an agent to maximize cumulative reward
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. The agent's objective is to maximize total reward over the long run, which matches the cumulative-reward part of option B. Reference answer: B — learn a policy/strategy that maximizes expected cumulative reward.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 1, §1.3 Elements of Reinforcement Learning, printed pp. 6
**Reference explanation:** The agent's objective is to maximize total reward over the long run, which matches the cumulative-reward part of option B.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** What is the primary objective of reinforcement learning in build mode

[Back to question navigation](#question-navigation)

---

<a id="q113"></a>
### Q113 — `C2-M5` · acceptable-with-caveat

Which of the following is NOT a common reason for inaccuracies in models?

- **A.** Data quality issues
- **B.** Incorrect model assumptions
- **C.** Overfitting
- **D.** Perfect alignment with real-world scenarios

**Supplied answer:** D. Perfect alignment with real-world scenarios
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is D (Perfect alignment with real-world scenarios). Deck teaches missing transitions and environment change. Bank's data-quality/assumption/overfitting taxonomy is generic, not slide-derived.
**Primary lecture:** [2.13 Dealing with inaccurate models .pptx](#lecture-2-13), slides 3–10
**Related concept:** Causes and meaning of model inaccuracy
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q114"></a>
### Q114 — `C3-M5` · bank-key-only

What happens to the softmax temperature parameter as it approaches infinity?

- **A.** The policy becomes more deterministic
- **B.** The policy becomes more stochastic
- **C.** The policy becomes completely random
- **D.** The policy becomes independent of the state

**Supplied answer:** C. The policy becomes completely random
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (The policy becomes completely random) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** direct parameterized policy; softmax preferences
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9

[Back to question navigation](#question-navigation)

---

<a id="q115"></a>
### Q115 — `C2-M2` · acceptable-with-caveat

Which technique is often used to reduce variance in Monte Carlo simulations?

- **A.** Gradient descent
- **B.** Variance reduction techniques like importance sampling
- **C.** Simple random sampling
- **D.** Fixed partitioning

**Supplied answer:** B. Variance reduction techniques like importance sampling
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Ordinary importance sampling can have unbounded or infinite variance, while weighted or carefully designed variants can reduce it. Reference answer: Importance sampling is variance-reducing only with an appropriate proposal/estimator; weighted IS is lower variance than ordinary IS in the book's setting.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §5.5 Off-policy Prediction via Importance Sampling, printed pp. 103, 104, 105, 106
**Reference explanation:** Ordinary importance sampling can have unbounded or infinite variance, while weighted or carefully designed variants can reduce it.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–17
**Related concept:** Importance sampling and variance claims

[Back to question navigation](#question-navigation)

---

<a id="q116"></a>
### Q116 — `C2-M4` · correct

In which type of environment is Expected Sarsa generally more stable than Q-learning?

- **A.** Deterministic environments
- **B.** Stochastic environments
- **C.** Fully observable environments
- **D.** Static environments

**Supplied answer:** B. Stochastic environments
**Learning verdict:** correct
**Why:** Option B (Stochastic environments) matches the local lecture evidence. Deck supports its presented stability/variance comparison; do not convert it into a universal guarantee for every environment.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 3, 8–9, 12–15
**Related concept:** Smoother/stabler expected updates
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q117"></a>
### Q117 — `OUT` · bank-key-only

What term describes the phenomenon where people discount future rewards more steeply when the re are closer in time?

- **A.** Hyperbolic discounting
- **B.** Exponential discounting
- **C.** Temporal myopia
- **D.** Time preference reversal

**Supplied answer:** A. Hyperbolic discounting
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Hyperbolic discounting) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** reward schedules and shaping
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q118"></a>
### Q118 — `C2-M3` · acceptable-with-caveat

Which advantage of Temporal Difference (TD) methods allows them to be applied in online settings wh environment changes over time?

- **A.** TD methods require a fixed environment for learning.
- **B.** TD methods rely on a pre-defined transition model.
- **C.** TD methods adapt quickly to changing environments.
- **D.** TD methods are only suitable for offline learning.

**Supplied answer:** C. TD methods adapt quickly to changing environments.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (TD methods adapt quickly to changing environments.). Changing-environment adaptation is a consequence of online updates, not a guarantee of tracking speed.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3, 6, 12, 16
**Related concept:** Online/incremental TD learning
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q119"></a>
### Q119 — `C2-M5` · incorrect

In Random Tabular Q-planning, what does the Q in Q-planning stand for?

- **A.** Quantity
- **B.** Quality
- **C.** Queue
- **D.** Q-value

**Supplied answer:** D. Q-value
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Q is action-value notation; ask what \(Q(s,a)\) represents rather than what the letter 'stands for.'
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–7
**Related concept:** Random-sample one-step tabular Q-planning
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q120"></a>
### Q120 — `C3-M5` · correct

Which component of a parameterized policy is typically adjusted during training?

- **A.** State space
- **B.** Action space
- **C.** Parameters
- **D.** Rewards

**Supplied answer:** C. Parameters
**Learning verdict:** correct
**Why:** Option C (Parameters) matches the local lecture evidence. temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q121"></a>
### Q121 — `C3-M5` · acceptable-with-caveat

In Actor-Critic, what is the purpose of the advantage function?

- **A.** To estimate the probability distribution of actions
- **B.** To measure the improvement of taking a particular action in a given state over the average action
- **C.** To calculate the discounted cumulative reward
- **D.** To optimize the policy directly

**Supplied answer:** B. To measure the improvement of taking a particular action in a given state over the average action
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To measure the improvement of taking a particular action in a given state over the average action). Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q122"></a>
### Q122 — `C2-M5` · incorrect

Why is it beneficial to update Q-values randomly in Random Tabular Q-planning?

- **A.** It ensures that all state-action pairs are updated equally.
- **B.** It helps in better exploration of the state-action space.
- **C.** It makes the algorithm simpler to implement.
- **D.** It guarantees convergence to the optimal policy.

**Supplied answer:** B. It helps in better exploration of the state-action space.
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Random planning updates sample previously observed state–action pairs; this is planning coverage, not environment exploration.
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–7
**Related concept:** Random-sample one-step tabular Q-planning
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q123"></a>
### Q123 — `C3-M3` · correct

Which of the following best describes the primary goal of coarse coding?

- **A.** To minimize the number of states in the state space
- **B.** To reduce computational complexity by using fewer resources
- **C.** To generalize the state representation by using overlapping features
- **D.** To ensure exact representation of the state space

**Supplied answer:** C. To generalize the state representation by using overlapping features
**Learning verdict:** correct
**Why:** Option C (To generalize the state representation by using overlapping features) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q124"></a>
### Q124 — `C1-M2` · acceptable-with-caveat

In Monte-Carlo algorithms, what is the potential downside of too much exploration?

- **A.** It can lead to overfitting
- **B.** It can cause the algorithm to ignore the best-known solutions
- **C.** It increases the risk of convergence to a suboptimal solution
- **D.** It may significantly increase computational time without improving results

**Supplied answer:** B. It can cause the algorithm to ignore the best-known solutions
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It can cause the algorithm to ignore the best-known solutions). Slides support sacrificing immediate reward; “ignore best-known solution” is informal wording.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 5, 9, 13
**Related concept:** Cost of too much exploration
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q125"></a>
### Q125 — `OUT` · bank-key-only

Which factor is crucial for effectively managing episodic tasks?

- **A.** Procrastination
- **B.** Flexibility
- **C.** Rigid schedules
- **D.** Micro-management

**Supplied answer:** B. Flexibility
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Flexibility) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** habit and episodic-task learning
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q126"></a>
### Q126 — `C2-M4` · correct

Which of the following statements is true about the SARSA algorithm?

- **A.** SARSA is an off-policy algorithm.
- **B.** SARSA always converges to the optimal policy.
- **C.** SARSA updates the Q-values using the action taken by the policy.
- **D.** SARSA requires a model of the environment.

**Supplied answer:** C. SARSA updates the Q-values using the action taken by the policy.
**Learning verdict:** correct
**Why:** Option C (SARSA updates the Q-values using the action taken by the policy.) matches the local lecture evidence. The target action \(A'\) is chosen by the same current policy used for behavior.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 5–10
**Related concept:** Sarsa sampled next action and on-policy relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q127"></a>
### Q127 — `C1-M3` · correct

What is a key characteristic of continuing tasks?

- **A.** They require infrequent attention.
- **B.** They involve discrete, one-time actions.
- **C.** They have indefinite or ongoing durations.
- **D.** They are always completed in a single session.

**Supplied answer:** C. They have indefinite or ongoing durations.
**Learning verdict:** correct
**Why:** Option C (They have indefinite or ongoing durations.) matches the local lecture evidence. No defined endpoint / ongoing interaction.
**Primary lecture:** [1.6 Continuing Tasks.pptx](#lecture-1-6), slides 3–5, 10
**Related concept:** Continuing-task characteristic
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q128"></a>
### Q128 — `C1-M4` · acceptable-with-caveat

Which of the following best describes the Bellman equation?

- **A.** Arecursive decomposition of optimization problems.
- **B.** A linear equation solving system.
- **C.** Amethod for linear regression analysis.
- **D.** A probabilistic forecasting model.

**Supplied answer:** A. Arecursive decomposition of optimization problems.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Arecursive decomposition of optimization problems.). The deck establishes value recursion; “optimization problems” is broader than its expectation equation.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3–8
**Related concept:** Bellman equation as recursive decomposition
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q129"></a>
### Q129 — `C1-M5` · correct

What does policy improvement involve?

- **A.** Updating the policy to be more greedy with respect to the value function
- **B.** Randomly changing the policy
- **C.** Keeping the policy fixed while evaluating its value
- **D.** Evaluating all possible policies before choosing the best one

**Supplied answer:** A. Updating the policy to be more greedy with respect to the value function
**Learning verdict:** correct
**Why:** Option A (Updating the policy to be more greedy with respect to the value function) matches the local lecture evidence. Greedify with respect to current value information.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 3–5, 9–13
**Related concept:** Policy improvement
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q130"></a>
### Q130 — `C3-M2` · correct

What is one approach to aggregating states in continuous state spaces?

- **A.** Using discrete state spaces only.
- **B.** Clustering states based on feature similarity.
- **C.** Ignoring state features altogether.
- **D.** Randomly grouping states.

**Supplied answer:** B. Clustering states based on feature similarity.
**Learning verdict:** correct
**Why:** Option B (Clustering states based on feature similarity.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q131"></a>
### Q131 — `C3-M2` · acceptable-with-caveat

In the context of Temporal Difference (TD) learning, what is the main advantage of linear semi-gradient over Tabular TD learning?

- **A.** It provides exact solutions.
- **B.** It can generalize to unseen states through feature representation.
- **C.** It does not require any parameter tuning.
- **D.** Itis simpler to implement.

**Supplied answer:** B. It can generalize to unseen states through feature representation.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It can generalize to unseen states through feature representation.). The item checks linear semi-gradient TD.
**Primary lecture:** [3.3 The Objective for Temporal Difference.pptx](#lecture-3-3), slides 3–16
**Related concept:** TD target; semi-gradient; TD–MC contrast
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q132"></a>
### Q132 — `C1-M2` · correct

In the epsilon-greedy policy, what role does the parameter epsilon (€) play in balancing exploration and exploitation?

- **A.** It determines the probability of selecting the best-known action
- **B.** It adjusts the learning rate of the algorithm
- **C.** It influences the discount factor for future rewards
- **D.** It determines the probability of exploring new actions

**Supplied answer:** D. It determines the probability of exploring new actions
**Learning verdict:** correct
**Why:** Option D (It determines the probability of exploring new actions) matches the local lecture evidence. Probability of entering random exploration branch.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15
**Related concept:** Role of epsilon
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q133"></a>
### Q133 — `C2-M3` · acceptable-with-caveat

What distinguishes Monte Carlo methods from Temporal Difference (TD) methods in reinforcement lea

- **A.** Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.
- **B.** Monte Carlo methods require knowledge of the model, while TD methods do not.
- **C.** Monte Carlo methods are more computationally expensive than TD methods.
- **D.** Monte Carlo methods cannot be used for online learning.

**Supplied answer:** A. Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.). The second stem is truncated but its intended contrast matches the slides.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 11–17
**Related concept:** MC full-return update versus TD one-step update
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q134"></a>
### Q134 — `OUT` · correct

Which strategy is NOT typically used to maintain exploration in Monte-Carlo Tree Search?

- **A.** Increasing the exploration constant in Upper Confidence Bound
- **B.** Using random playouts
- **C.** Reducing the number of rollouts
- **D.** Incorporating domain-specific heuristics

**Supplied answer:** C. Reducing the number of rollouts
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. MCTS maintains exploration through its rollout/tree policies such as UCB or randomized playouts; reducing rollouts reduces evidence rather than maintaining exploration. Reference answer: C — reducing the number of rollouts.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.10–8.11, printed pp. 183, 185, 186, 187
**Reference explanation:** MCTS maintains exploration through its rollout/tree policies such as UCB or randomized playouts; reducing rollouts reduces evidence rather than maintaining exploration.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** monte-carlo tree search

[Back to question navigation](#question-navigation)

---

<a id="q135"></a>
### Q135 — `C3-M5` · correct

In reinforcement learning, what does the policy gradient theorem provide a method for?

- **A.** Calculating the optimal policy directly
- **B.** Evaluating the value function of a policy
- **C.** Approximating the gradient of a policy's performance
- **D.** Finding the optimal action in each state

**Supplied answer:** C. Approximating the gradient of a policy's performance
**Learning verdict:** correct
**Why:** Option C (Approximating the gradient of a policy's performance) matches the local lecture evidence. Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q136"></a>
### Q136 — `OUT` · acceptable-with-caveat

In Monte Carlo control, which exploration method considers uncertainty by sampling from a posterior distribution of action values?

- **A.** UCB (Upper Confidence Bound)
- **B.** e-greedy
- **C.** Thompson Sampling
- **D.** Boltzmann Exploration

**Supplied answer:** C. Thompson Sampling
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. The book defines posterior/Thompson sampling as selecting actions according to their posterior probability of being best. Reference answer: C — Thompson sampling.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.10 Summary discussion of Bayesian bandits, printed pp. 43
**Reference explanation:** The book defines posterior/Thompson sampling as selecting actions according to their posterior probability of being best.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** exploration

[Back to question navigation](#question-navigation)

---

<a id="q137"></a>
### Q137 — `C3-M4` · acceptable-with-caveat

When using Epsilon-greedy with function approximation, what role does the function approximator play

- **A.** It generates the random exploration rate
- **B.** It approximates the Q-values for given states and actions
- **C.** It determines when to switch between exploration and exploitation
- **D.** It sets the value of epsilon

**Supplied answer:** B. It approximates the Q-values for given states and actions
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It approximates the Q-values for given states and actions). The item checks epsilon-greedy with function approximation.
**Primary lecture:** [3.7 Exploration under Function Approximation.pptx](#lecture-3-7), slides 3–10
**Related concept:** optimism and epsilon-greedy with approximation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q138"></a>
### Q138 — `C1-M3` · correct

What is the goal of an agent in an MDP?

- **A.** To explore the state space.
- **B.** To maximize the cumulative reward.
- **C.** To minimize the number of actions taken.
- **D.** To transition between states as often as possible.

**Supplied answer:** B. To maximize the cumulative reward.
**Learning verdict:** correct
**Why:** Option B (To maximize the cumulative reward.) matches the local lecture evidence. Maximize cumulative/total future reward.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 12
**Related concept:** Agent’s goal in an MDP
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q139"></a>
### Q139 — `C1-M4` · acceptable-with-caveat

Which technique is commonly used to approximate the optimal value function when the state space is t large to compute it exactly?

- **A.** Deep Q-Networks (DQN)
- **B.** Monte Carlo Methods
- **C.** Policy gradients
- **D.** Temporal Difference Learning

**Supplied answer:** A. Deep Q-Networks (DQN)
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. Function approximation is used when state spaces exceed available memory, and DQN uses a neural network to approximate optimal action values. Reference answer: A — DQN, if 'optimal value' means the optimal action-value function.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.1; Ch. 16, §16.5, printed pp. 197, 198, 436, 437, 439
**Reference explanation:** Function approximation is used when state spaces exceed available memory, and DQN uses a neural network to approximate optimal action values.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.9 Optimality (Optimal Policies & Value Functions).pptx](#lecture-1-9), slides 12
**Related concept:** DQN for large state spaces

[Back to question navigation](#question-navigation)

---

<a id="q140"></a>
### Q140 — `C2-M3` · acceptable-with-caveat

What does Temporal Difference (TD) learning combine?

- **A.** Monte Carlo methods and dynamic programming
- **B.** Supervised learning and unsupervised learning
- **C.** Gradient descent and stochastic gradient descent
- **D.** Neural networks and decision trees

**Supplied answer:** A. Monte Carlo methods and dynamic programming
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Monte Carlo methods and dynamic programming). The supplied core-idea answer matches the displayed target.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 3–9
**Related concept:** TD combines sampled experience with a bootstrap target
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q141"></a>
### Q141 — `C1-M4` · acceptable-with-caveat

What role does the policy n(a|s) play in the Bellman equation for the state value function?

- **A.** It determines the immediate reward
- **B.** It specifies the probability of taking action a in state s
- **C.** It is used to compute the transition probabilities
- **D.** It discounts the future rewards

**Supplied answer:** B. It specifies the probability of taking action a in state s
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It specifies the probability of taking action a in state s). \(\pi(a\mid s)\) weights actions by selection probability.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 6–7
**Related concept:** Policy probability in Bellman expectation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q142"></a>
### Q142 — `C1-M3` · correct

Which of the following is an example of an episodic task?

- **A.** Checking email daily
- **B.** Attending a weekly team meeting
- **C.** Planning a company retreat
- **D.** Monitoring website traffic hourly

**Supplied answer:** C. Planning a company retreat
**Learning verdict:** correct
**Why:** Option C (Planning a company retreat) matches the local lecture evidence. A retreat is episodic only when modeled with a start and terminal completion.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 13–17
**Related concept:** Episodic-task example
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q143"></a>
### Q143 — `C3-M2` · acceptable-with-caveat

In the context of parameterized functions, what is gradient descent used for?

- **A.** To determine the optimal actions
- **B.** To update the parameters to minimize the loss function
- **C.** To increase the randomness in actions
- **D.** To split the data into training and testing sets

**Supplied answer:** B. To update the parameters to minimize the loss function
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To update the parameters to minimize the loss function). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q144"></a>
### Q144 — `C1-M3` · acceptable-with-caveat

If you're preparing for an exam by studying a little bit each day, what type of task is this?

- **A.** Episodic task.
- **B.** Continuing task.
- **C.** Project-based task.
- **D.** Occasional task.

**Supplied answer:** A. Episodic task.
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Episodic versus continuing is determined by a terminal boundary, not by how frequently an activity occurs; exam preparation can be episodic if the exam is the terminal boundary. Reference answer: A only under the natural formulation where the preparation episode terminates at the exam; otherwise the task description is underspecified.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 3, §§3.3–3.4 Returns and Episodes, printed pp. 54, 55, 57
**Reference explanation:** Episodic versus continuing is determined by a terminal boundary, not by how frequently an activity occurs; exam preparation can be episodic if the exam is the terminal boundary.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 13–17
**Related concept:** Daily exam study task type

[Back to question navigation](#question-navigation)

---

<a id="q145"></a>
### Q145 — `C2-M5` · acceptable-with-caveat

Dyna Architecture primarily deals with which type of models?

- **A.** Static models
- **B.** Dynamic models
- **C.** Predictive models
- **D.** Relational models

**Supplied answer:** B. Dynamic models
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Dyna uses an environment model of transition/reward dynamics, but its defining concern is integrating that model with planning, learning, and acting. Reference answer: B can mean a model of environment dynamics, but 'dynamic models' is not the book's defining category.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.1–8.2, printed pp. 159, 160, 161
**Reference explanation:** Dyna uses an environment model of transition/reward dynamics, but its defining concern is integrating that model with planning, learning, and acting.
**Evidence tier:** book-supported (medium confidence), distinct from local-slide support
**Closest lecture context:** [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12), slides 3–7, 11–15
**Related concept:** Type of model in Dyna

[Back to question navigation](#question-navigation)

---

<a id="q146"></a>
### Q146 — `C2-M2` · acceptable-with-caveat

Which of the following best describes the law of large numbers as it applies to Monte Carlo simulations

- **A.** The larger the sample size, the less accurate the results
- **B.** The larger the sample size, the more accurate the results
- **C.** The sample size does not affect the results
- **D.** The sample size should always be small

**Supplied answer:** B. The larger the sample size, the more accurate the results
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The larger the sample size, the more accurate the results). More samples improve the empirical average in the deck; no fixed sample count or universal rate is claimed.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 4–6
**Related concept:** Sample averaging, accuracy, and data requirement
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q147"></a>
### Q147 — `C1-M5` · acceptable-with-caveat

In a policy improvement step, how is the state value function used?

- **A.** To initialize the action value function
- **B.** To generate new policies based on the current state values
- **C.** To calculate the expected reward for each possible action
- **D.** To terminate the learning process when a threshold is met

**Supplied answer:** B. To generate new policies based on the current state values
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To generate new policies based on the current state values). Values support greedy action comparison and a new policy.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 3–5, 9–13
**Related concept:** State value in improvement
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q148"></a>
### Q148 — `OUT` · bank-key-only

When a child learns to use a specific greeting for different individuals (e.g., 'Hi' for peers, 'Good morning teachers), this is an example of:

- **A.** Generalization
- **B.** Discrimination
- **C.** Extinction
- **D.** Classical conditioning

**Supplied answer:** B. Discrimination
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Discrimination) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** When a child learns to use a specific greeting for different individuals (e.g., 'Hi' for peers, 'Good morning teachers), this is an example of:
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q149"></a>
### Q149 — `C1-M2` · correct

What is the difference between "exploration" and "exploitation" in reinforcement learning?

- **A.** Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward
- **B.** Exploration is related to searching through a dataset, while exploitation is related to using the mode predictions
- **C.** Exploration is used in supervised learning, while exploitation is used in unsupervised learning
- **D.** Exploration refers to reducing the complexity of the model, while exploitation refers to increasing the complexity of the model

**Supplied answer:** A. Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward
**Learning verdict:** correct
**Why:** Option A (Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward) matches the local lecture evidence. Learn about alternatives versus use current knowledge.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 5, 9, 13
**Related concept:** Exploration versus exploitation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q150"></a>
### Q150 — `C2-M4` · acceptable-with-caveat

How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?

- **A.** By using a fixed learning rate.
- **B.** By averaging over all possible actions.
- **C.** By always Selecting the action with the highest Q-value.
- **D.** By ignoring the reward signal.

**Supplied answer:** B. By averaging over all possible actions.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (By averaging over all possible actions.). Deck supports its presented stability/variance comparison; do not convert it into a universal guarantee for every environment.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 3, 8–9, 12–15
**Related concept:** Smoother/stabler expected updates
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q151"></a>
### Q151 — `C2-M5` · incorrect

In the context of reinforcement learning, what is a key advantage of distribution models over sample-ba models?

- **A.** Simplicity and ease of implementation
- **B.** Reduced computational complexity
- **C.** Ability to generalize from a broader set of scenarios
- **D.** Faster convergence to the optimal policy

**Supplied answer:** C. Ability to generalize from a broader set of scenarios
**Learning verdict:** incorrect
**Correct answer:** Its distinguishing advantage is enabling expected updates from a full transition/reward distribution; none of the options states this precisely.
**Why:** Sutton–Barto evidence contradicts the supplied key. A distribution model supplies all next-state/reward possibilities and probabilities for expected updates; the book does not claim broader-scenario generalization as its key advantage. Reference answer: Its distinguishing advantage is enabling expected updates from a full transition/reward distribution; none of the options states this precisely.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.1 and 8.5, printed pp. 159, 160, 172, 173
**Reference explanation:** A distribution model supplies all next-state/reward possibilities and probabilities for expected updates; the book does not claim broader-scenario generalization as its key advantage.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 8–16
**Related concept:** Sample-versus-distribution information/efficiency

[Back to question navigation](#question-navigation)

---

<a id="q152"></a>
### Q152 — `C2-M5` · incorrect

What is the relationship between sample efficiency and sample-based models?

- **A.** Sample-based models are more sample-efficient than distribution models
- **B.** Sample-based models are generally less sample-efficient than distribution models
- **C.** Both types of models have the same sample efficiency
- **D.** Sample efficiency is not a concern in reinforcement learning

**Supplied answer:** B. Sample-based models are generally less sample-efficient than distribution models
**Learning verdict:** incorrect
**Correct answer:** No universal ordering; the trade-off depends on model acquisition, computation, branching, and accuracy.
**Why:** Sutton–Barto evidence contradicts the supplied key. Sample updates are cheaper but noisier, while expected updates use more computation; the book gives no universal sample-efficiency ordering between sample and distribution models. Reference answer: No universal ordering; the trade-off depends on model acquisition, computation, branching, and accuracy.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.1 and 8.5, printed pp. 159, 160, 172, 173
**Reference explanation:** Sample updates are cheaper but noisier, while expected updates use more computation; the book gives no universal sample-efficiency ordering between sample and distribution models.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 8–16
**Related concept:** Sample-versus-distribution information/efficiency

[Back to question navigation](#question-navigation)

---

<a id="q153"></a>
### Q153 — `C3-M2` · correct

Which method is commonly used in conjunction with state aggregation to estimate the value function?

- **A.** Random search.
- **B.** Dynamic programming.
- **C.** Monte Carlo methods.
- **D.** Direct enumeration.

**Supplied answer:** C. Monte Carlo methods.
**Learning verdict:** correct
**Why:** Option C (Monte Carlo methods.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q154"></a>
### Q154 — `OUT` · acceptable-with-caveat

What happens if the eligibility trace decay rate is set too low in Semi-Gradient TD learning?

- **A.** The algorithm becomes more sensitive to noise
- **B.** The updates become more biased
- **C.** The algorithm may fail to converge
- **D.** The learning rate becomes unstable

**Supplied answer:** B. The updates become more biased
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Lower lambda shortens traces and moves the method toward one-step TD/more bootstrapping; the book does not state that it universally causes one listed failure. Reference answer: Lower lambda makes the update more TD-like and can increase bootstrap bias, but 'updates become more biased' is not an unconditional theorem.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 12, §§12.2 and 12.13, printed pp. 292, 317
**Reference explanation:** Lower lambda shortens traces and moves the method toward one-step TD/more bootstrapping; the book does not state that it universally causes one listed failure.
**Evidence tier:** book-supported (medium confidence), distinct from local-slide support
**Related concept:** gradient estimation

[Back to question navigation](#question-navigation)

---

<a id="q155"></a>
### Q155 — `C3-M5` · acceptable-with-caveat

How does the exploration-exploitation dilemma relate to parameterized policies?

- **A.** It determines the size of the neural network
- **B.** It guides the policy towards actions that lead to higher rewards
- **C.** It defines the trade-off between trying new actions and exploiting known actions
- **D.** It regulates the learning rate during training

**Supplied answer:** C. It defines the trade-off between trying new actions and exploiting known actions
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (It defines the trade-off between trying new actions and exploiting known actions). temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q156"></a>
### Q156 — `OUT` · bank-key-only

What term describes the phenomenon where people discount future rewards more steeply when the re\ are closer in time?

- **A.** Hyperbolic discounting
- **B.** Exponential discounting
- **C.** Temporal myopia
- **D.** Time preference reversal

**Supplied answer:** A. Hyperbolic discounting
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Hyperbolic discounting) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** reward schedules and shaping
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q157"></a>
### Q157 — `C1-M2` · correct

What does the 'k' in k-armed bandit stand for?

- **A.** The total number of steps taken.
- **B.** The number of actions (or arms) available.
- **C.** The discount factor.
- **D.** The learning rate.

**Supplied answer:** B. The number of actions (or arms) available.
**Learning verdict:** correct
**Why:** Option B (The number of actions (or arms) available.) matches the local lecture evidence. Number of arms/actions.
**Primary lecture:** [1.1. The K-Armed Bandit Problem.pptx](#lecture-1-1), slides 8–10, 12
**Related concept:** Meaning of `k`
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q158"></a>
### Q158 — `C2-M2` · correct

What is the key characteristic of an episode in the context of Monte Carlo methods?

- **A.** Itis a sequence of states, actions, and rewards that terminates.
- **B.** itis a fixed number of time steps in the environment.
- **C.** Itis a set of independent trials to estimate probabilities.
- **D.** Itis a single action taken by the agent.

**Supplied answer:** A. Itis a sequence of states, actions, and rewards that terminates.
**Learning verdict:** correct
**Why:** Option A (Itis a sequence of states, actions, and rewards that terminates.) matches the local lecture evidence. Applies to the MC algorithms taught in this deck; avoid universal claims about every possible MC variant.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 7–9
**Related concept:** Episodic sequence and update after termination
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q159"></a>
### Q159 — `C3-M2` · acceptable-with-caveat

What is the typical objective when training a parameterized value function in reinforcement learning?

- **A.** Minimizing the time to convergence
- **B.** Maximizing the exploration rate
- **C.** Minimizing the loss between predicted and actual rewards
- **D.** Maximizing the number of parameters

**Supplied answer:** C. Minimizing the loss between predicted and actual rewards
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Minimizing the loss between predicted and actual rewards). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q160"></a>
### Q160 — `C2-M2` · correct

What is a potential drawback of Monte Carlo prediction methods?

- **A.** They require a model of the environment
- **B.** They can only be applied to deterministic environments
- **C.** They may require a large number of episodes to obtain accurate value estimates
- **D.** They are not suitable for on-policy learning

**Supplied answer:** C. They may require a large number of episodes to obtain accurate value estimates
**Learning verdict:** correct
**Why:** Option C (They may require a large number of episodes to obtain accurate value estimates) matches the local lecture evidence. More samples improve the empirical average in the deck; no fixed sample count or universal rate is claimed.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 4–6
**Related concept:** Sample averaging, accuracy, and data requirement
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q161"></a>
### Q161 — `OUT` · bank-key-only

What effect does decreasing the step size (h) have on the accuracy of the gradient estimation?

- **A.** Increases accuracy
- **B.** Decreases accuracy
- **C.** No effect on accuracy
- **D.** Increases computation time

**Supplied answer:** A. Increases accuracy
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Increases accuracy) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** gradient estimation
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q162"></a>
### Q162 — `C1-M5` · correct

In policy evaluation, what does the Bellman expectation equation represent?

- **A.** The expected cumulative reward when following a policy
- **B.** The expected value of a state under a given policy
- **C.** The expected value of a state-action pair under a given policy
- **D.** The expected future reward of taking an action in a state

**Supplied answer:** B. The expected value of a state under a given policy
**Learning verdict:** correct
**Why:** Option B (The expected value of a state under a given policy) matches the local lecture evidence. Recursive expected state value under a fixed policy.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 4
**Related concept:** Bellman expectation in evaluation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q163"></a>
### Q163 — `OUT` · bank-key-only

What is generalization in the context of learning and behavior?

- **A.** The ability to distinguish between different stimuli.
- **B.** The process by which a response spreads from one specific stimulus to other stimuli that resemble original.
- **C.** Areduction in the frequency of a learned behavior.
- **D.** The process of strengthening a specific behavior through reinforcement.

**Supplied answer:** B. The process by which a response spreads from one specific stimulus to other stimuli that resemble original.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (The process by which a response spreads from one specific stimulus to other stimuli that resemble original.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** discrimination and generalization
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q164"></a>
### Q164 — `C3-M5` · correct

What is the goal of a policy gradient method in reinforcement learning?

- **A.** To update the value function directly
- **B.** To learn the model of the environment
- **C.** To improve the policy by optimizing the expected return
- **D.** To compute the Q-value of each state-action pair to get maximum rewards

**Supplied answer:** C. To improve the policy by optimizing the expected return
**Learning verdict:** correct
**Why:** Option C (To improve the policy by optimizing the expected return) matches the local lecture evidence. Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q165"></a>
### Q165 — `C2-M5` · correct

Which algorithm estimates the action value using a model of the environment?

- **A.** Q-learning
- **B.** SARSA
- **C.** Monte Carlo Control
- **D.** Dynamic Programming

**Supplied answer:** D. Dynamic Programming
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. Dynamic programming computes value updates from the known transition/reward model, unlike model-free Q-learning, Sarsa, and Monte Carlo control. Reference answer: D — dynamic programming.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 4, §§4.1 and 4.4, printed pp. 74, 75, 82
**Reference explanation:** Dynamic programming computes value updates from the known transition/reward model, unlike model-free Q-learning, Sarsa, and Monte Carlo control.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–7
**Related concept:** Model-based action-value algorithm

[Back to question navigation](#question-navigation)

---

<a id="q166"></a>
### Q166 — `C2-M2` · correct

In Monte Carlo methods, what does the term "policy evaluation" refer to?

- **A.** The process of determining the optimal policy.
- **B.** The process of improving the policy based on value estimates.
- **C.** The process of estimating the value function for a given policy.
- **D.** The process of selecting the best action based on current values.

**Supplied answer:** C. The process of estimating the value function for a given policy.
**Learning verdict:** correct
**Why:** Option C (The process of estimating the value function for a given policy.) matches the local lecture evidence. Policy \(\pi\) both defines the value being estimated and generates the on-policy episode here.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 8–9
**Related concept:** Policy evaluation and policy-generated episodes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q167"></a>
### Q167 — `C1-M4` · correct

What is a policy in reinforcement learning?

- **A.** The set of all possible states in an environment
- **B.** The method by which an agent maps states to actions
- **C.** A function that assigns rewards to actions
- **D.** The discount factor for future rewards

**Supplied answer:** B. The method by which an agent maps states to actions
**Learning verdict:** correct
**Why:** Option B (The method by which an agent maps states to actions) matches the local lecture evidence. Mapping/distribution from states to actions.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 3–7
**Related concept:** Policy definition
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q168"></a>
### Q168 — `C3-M5` · correct

In Softmax policy parameterization, what does the softmax function do?

- **A.** Squashes values to a range between 0 and 1
- **B.** Normalizes values into probabilities
- **C.** Maps values to discrete actions
- **D.** Converts values into gradients

**Supplied answer:** B. Normalizes values into probabilities
**Learning verdict:** correct
**Why:** Option B (Normalizes values into probabilities) matches the local lecture evidence. temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q169"></a>
### Q169 — `C2-M4` · correct

Which exploration strategy is commonly used in Q-learning to maintain off-policy learning?

- **A.** Greedy strategy.
- **B.** Epsilon-greedy strategy.
- **C.** Softmax strategy.
- **D.** Random strategy.

**Supplied answer:** B. Epsilon-greedy strategy.
**Learning verdict:** correct
**Why:** Option B (Epsilon-greedy strategy.) matches the local lecture evidence. Exploration affects behavior; the learning target remains greedy.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 11, 16
**Related concept:** Epsilon-greedy exploratory behavior in Q-learning
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q170"></a>
### Q170 — `C3-M3` · acceptable-with-caveat

Which parameter is NOT typically a part of Tile Coding configuration?

- **A.** Number of tilings
- **B.** Tile width
- **C.** Learning rate
- **D.** Offset of each tiling

**Supplied answer:** C. Learning rate
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Learning rate). Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q171"></a>
### Q171 — `C2-M2` · bank-key-only

In Monte Carlo control, what is the major drawback of using Boltzmann Exploration?

- **A.** High computational complexity
- **B.** Tendency to exploit rather than explore
- **C.** Fixed exploration rate
- **D.** Sensitivity to initial conditions

**Supplied answer:** D. Sensitivity to initial conditions
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer D (Sensitivity to initial conditions) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Boltzmann exploration drawback
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [2.3 Exploration Methods for Monte-Carlo.pptx](#lecture-2-3), slides 3–11

[Back to question navigation](#question-navigation)

---

<a id="q172"></a>
### Q172 — `C2-M2` · acceptable-with-caveat

Which of the following is a key component of Monte Carlo simulations?

- **A.** Deterministic algorithms
- **B.** Random sampling
- **C.** Fixed input values
- **D.** Analytical solutions

**Supplied answer:** B. Random sampling
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (Random sampling). The broad “reinforcement learning” classification is true but less useful than the sampled-return mechanism.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 3–8
**Related concept:** MC uses random sampled episodes to estimate values/policies
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q173"></a>
### Q173 — `C3-M5` · correct

In the context of neural networks, what do the parameters of a policy represent?

- **A.** The input features
- **B.** The output actions
- **C.** The activation functions
- **D.** The weights and biases

**Supplied answer:** D. The weights and biases
**Learning verdict:** correct
**Why:** Option D (The weights and biases) matches the local lecture evidence. temperature is related softmax knowledge, not central slide notation
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q174"></a>
### Q174 — `OUT` · bank-key-only

What happens to the value of a reward if it is consistently provided regardless of behavior?

- **A.** Itincreases
- **B.** It decreases
- **C.** Itremains the same
- **D.** It becomes unpredictable

**Supplied answer:** B. It decreases
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (It decreases) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** reward schedules and shaping
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q175"></a>
### Q175 — `C3-M2` · acceptable-with-caveat

What is the main purpose of gradient descent in machine learning?

- **A.** To find the maximum of a function
- **B.** To find the minimum of a function
- **C.** To calculate the derivative of a function
- **D.** To optimize the model architecture

**Supplied answer:** B. To find the minimum of a function
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To find the minimum of a function). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q176"></a>
### Q176 — `C2-M5` · acceptable-with-caveat

What is a common method for building a model in reinforcement learning?

- **A.** Supervised learning with labeled data
- **B.** Unsupervised learning with unlabeled data
- **C.** Using historical data to approximate state transitions and rewards
- **D.** Clustering similar states and actions together

**Supplied answer:** C. Using historical data to approximate state transitions and rewards
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Using historical data to approximate state transitions and rewards). Historical transition data is coherent with the model definition, though the deck does not prescribe a single fitting method.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 3–4, 9, 11
**Related concept:** Learning a model from transition/reward experience
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q177"></a>
### Q177 — `C3-M5` · incorrect

Which of the following is NOT a source of bias in policy gradient methods?

- **A.** Variance reduction techniques
- **B.** Finite sample size
- **C.** Choice of baseline
- **D.** Exploration-exploitation trade-off

**Supplied answer:** A. Variance reduction techniques
**Learning verdict:** incorrect
**Correct answer:** No unique NOT option: A is not inherently a bias source, and an action-independent baseline in C is also unbiased.
**Why:** Sutton–Barto evidence contradicts the supplied key. An action-independent baseline does not change the expected policy gradient, and variance-reduction methods are not inherently bias sources; finite sampling primarily adds variance. Reference answer: No unique NOT option: A is not inherently a bias source, and an action-independent baseline in C is also unbiased.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 13, §§13.3–13.4, printed pp. 326, 329, 330
**Reference explanation:** An action-independent baseline does not change the expected policy gradient, and variance-reduction methods are not inherently bias sources; finite sampling primarily adds variance.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem

[Back to question navigation](#question-navigation)

---

<a id="q178"></a>
### Q178 — `C1-M2` · correct

What is the primary goal of using exploration in Monte-Carlo algorithms?

- **A.** To minimize computational cost
- **B.** To find the most optimal solution
- **C.** To avoid overfitting the model
- **D.** To ensure the algorithm samples a wide range of possibilities

**Supplied answer:** D. To ensure the algorithm samples a wide range of possibilities
**Learning verdict:** correct
**Why:** Option D (To ensure the algorithm samples a wide range of possibilities) matches the local lecture evidence. Wide sampling improves knowledge; “Monte Carlo” wording is not needed by the evidence.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 5–8, 13
**Related concept:** Purpose of exploration
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q179"></a>
### Q179 — `C3-M2` · correct

What is a potential challenge when determining the number of aggregated states?

- **A.** Ensuring they are all exactly the same.
- **B.** Balancing between the level of detail and computational efficiency.
- **C.** Making sure they are all unique.
- **D.** Finding a fixed number that works for all problems.

**Supplied answer:** B. Balancing between the level of detail and computational efficiency.
**Learning verdict:** correct
**Why:** Option B (Balancing between the level of detail and computational efficiency.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q180"></a>
### Q180 — `C2-M2` · acceptable-with-caveat

In Monte Carlo methods, what is the term for the total accumulated reward obtained from a state?

- **A.** Immediate reward
- **B.** Discounted reward
- **C.** Return
- **D.** Cumulative penalty

**Supplied answer:** C. Return
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Return). The bank's “total accumulated reward” wording omits discounting; deck formula supplies it.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 9–12
**Related concept:** Return is accumulated discounted reward from a time/state
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q181"></a>
### Q181 — `C2-M4` · correct

Which of the following best describes an off-policy algorithm?

- **A.** lt optimizes the policy based on past experiences only.
- **B.** It updates the policy based on the actions taken by the agent.
- **C.** It learns from actions that are not necessarily taken by the current policy.
- **D.** It only learns from the actions dictated by the current policy.

**Supplied answer:** C. It learns from actions that are not necessarily taken by the current policy.
**Learning verdict:** correct
**Why:** Option C (It learns from actions that are not necessarily taken by the current policy.) matches the local lecture evidence. “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 8–11
**Related concept:** Q-learning off-policy; contrast with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q182"></a>
### Q182 — `C2-M2` · correct

Which of the following is an advantage of Temporal Difference Learning over Monte Carlo methods for Evaluation?

- **A.** Temporal Difference Learning is computationally less expensive.
- **B.** Temporal Difference Learning provides unbiased estimates.
- **C.** Temporal Difference Learning does not require exploration.
- **D.** Temporal Difference Learning guarantees convergence.

**Supplied answer:** A. Temporal Difference Learning is computationally less expensive.
**Learning verdict:** correct
**Why:** Option A (Temporal Difference Learning is computationally less expensive.) matches the local lecture evidence. Online/incomplete-sequence bootstrapping is explicit; “always lower computation” or “faster convergence” is not a universal claim.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3–6, 11–16
**Related concept:** Claimed TD advantage over MC
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q183"></a>
### Q183 — `C2-M4` · acceptable-with-caveat

What is the role of the learning rate 1 in the Q-learning algorithm?

- **A.** It determines the discount factor for future rewards
- **B.** It controls the exploration rate in the action selection process
- **C.** It adjusts the step size for updating the action values
- **D.** It defines the probability of choosing a random action

**Supplied answer:** C. It adjusts the step size for updating the action values
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (It adjusts the step size for updating the action values). The bank symbols are corrupted; the visual equation makes \(\alpha\)'s role explicit.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 10, 16
**Related concept:** Q-learning learning rate \(\alpha\)
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q184"></a>
### Q184 — `C2-M3` · acceptable-with-caveat

What is temporal-difference learning primarily used for?

- **A.** Supervised learning
- **B.** Unsupervised learning
- **C.** Reinforcement learning
- **D.** None of the above

**Supplied answer:** C. Reinforcement learning
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Reinforcement learning). Both stems are overly broad; use the one-step value-estimation mechanism rather than “used for RL” as a definition.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 3–12
**Related concept:** TD as reinforcement learning from rewards/transitions
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q185"></a>
### Q185 — `C2-M5` · correct

In the context of reinforcement learning, what does the term "planning" typically refer to?

- **A.** Executing actions based on a fixed strategy
- **B.** Learning from immediate rewards only
- **C.** Using a model to evaluate future actions and outcomes
- **D.** Randomly exploring the environment

**Supplied answer:** C. Using a model to evaluate future actions and outcomes
**Learning verdict:** correct
**Why:** Option C (Using a model to evaluate future actions and outcomes) matches the local lecture evidence. Slide 3 says “unimproved policy,” a typo contradicted by slides 4–5 and the objectives.
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–10
**Related concept:** Planning uses a model to simulate/evaluate future outcomes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q186"></a>
### Q186 — `C1-M4` · acceptable-with-caveat

What is the Bellman equation used for in reinforcement learning?

- **A.** To calculate the optimal policy
- **B.** To calculate the expected reward
- **C.** To calculate the transition probabilities
- **D.** To calculate the value function

**Supplied answer:** D. To calculate the value function
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is D (To calculate the value function). Relates and can be used to compute value functions.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3, 8, 18
**Related concept:** Bellman equation use
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q187"></a>
### Q187 — `C2-M3` · correct

In Temporal Difference(0), how is the state-value function updated?

- **A.** By taking the derivative of the reward function.
- **B.** By using the Bellman equation.
- **C.** By averaging the rewards over time.
- **D.** By randomly selecting new state values.

**Supplied answer:** B. By using the Bellman equation.
**Learning verdict:** correct
**Why:** Option B (By using the Bellman equation.) matches the local lecture evidence. “Observed return” on slides 4/6 is loose wording; the displayed TD(0) target is one-step reward plus next estimate.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 4–9
**Related concept:** TD error and state-value update
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q188"></a>
### Q188 — `C2-M2` · incorrect

Which Monte Carlo method updates value estimates based on the average returns observed from state

- **A.** First-visit Monte Carlo
- **B.** Every-visit Monte Carlo
- **C.** Temporal Difference Learning
- **D.** Q-learning

**Supplied answer:** A. First-visit Monte Carlo
**Learning verdict:** incorrect
**Correct answer:** Both A and B.
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Both first-visit and every-visit Monte Carlo estimate values by averaging observed returns; they differ only in which visits within an episode are included. Reference answer: Both A and B.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §5.1 Monte Carlo Prediction, printed pp. 92, 93, 94
**Reference explanation:** Both first-visit and every-visit Monte Carlo estimate values by averaging observed returns; they differ only in which visits within an episode are included.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 9
**Related concept:** First-visit versus every-visit MC

[Back to question navigation](#question-navigation)

---

<a id="q189"></a>
### Q189 — `C1-M5` · correct

In Policy Iteration, which step involves evaluating the current policy's performance and updating the val function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** A. Policy Evaluation
**Learning verdict:** correct
**Why:** Option A (Policy Evaluation) matches the local lecture evidence. High-similarity pair with Q268.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9, 11–13
**Related concept:** Policy-evaluation phase
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q190"></a>
### Q190 — `OUT` · bank-key-only

Which of the following is an example of generalization?

- **A.** A dog Salivates only to the sound of a specific bell.
- **B.** Astudent raises their hand only in one particular classroom.
- **C.** Achild calls all four-legged animals "dog".
- **D.** A person can tell the difference between a real and a fake smile.

**Supplied answer:** C. Achild calls all four-legged animals "dog".
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Achild calls all four-legged animals "dog".) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** discrimination and generalization
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q191"></a>
### Q191 — `OUT` · bank-key-only

What makes sending human missions to explore stars particularly challenging?

- **A.** Stars are constantly moving at high speeds.
- **B.** The distances are too great for current spacecraft speeds.
- **C.** Lack of interest from astronauts.
- **D.** Stars have unpredictable weather patterns.

**Supplied answer:** B. The distances are too great for current spacecraft speeds.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (The distances are too great for current spacecraft speeds.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** star-exploration decision making
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q192"></a>
### Q192 — `C3-M5` · acceptable-with-caveat

What is the advantage of using a baseline in policy gradient methods?

- **A.** It reduces the variance of gradient estimates
- **B.** It increases the learning rate
- **C.** It guarantees convergence to the optimal policy
- **D.** It simplifies the action selection process

**Supplied answer:** A. It reduces the variance of gradient estimates
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (It reduces the variance of gradient estimates). Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q193"></a>
### Q193 — `C3-M5` · acceptable-with-caveat

In policy gradient algorithms, what is the role of the objective function?

- **A.** To minimize the variance of the policy
- **B.** To maximize the expected cumulative reward
- **C.** To regularize the policy parameters
- **D.** To penalize exploration

**Supplied answer:** B. To maximize the expected cumulative reward
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To maximize the expected cumulative reward). Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q194"></a>
### Q194 — `OUT` · bank-key-only

Which Monte Carlo method is particularly useful for high-dimensional integration?

- **A.** Markov Chain Monte Carlo (MCMC)
- **B.** Simple Random Sampling
- **C.** Stratified Sampling
- **D.** Bootstrap Sampling

**Supplied answer:** A. Markov Chain Monte Carlo (MCMC)
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Markov Chain Monte Carlo (MCMC)) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Monte Carlo integration
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q195"></a>
### Q195 — `C2-M4` · acceptable-with-caveat

In SARSA, the next action 1' is chosen based on which policy?

- **A.** The current Q-values without any exploration
- **B.** A fixed policy not related to Q-values
- **C.** The same policy used to generate the current action A
- **D.** Arandom selection independent of the policy

**Supplied answer:** C. The same policy used to generate the current action A
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (The same policy used to generate the current action A). The target action \(A'\) is chosen by the same current policy used for behavior.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 5–10
**Related concept:** Sarsa sampled next action and on-policy relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q196"></a>
### Q196 — `C2-M4` · correct

Which of the following is true about the exploration-exploitation trade-off in Q-learning?

- **A.** It deals with the agent's tendency to choose the most rewarding action always
- **B.** It addresses the need to explore new actions and exploit known rewarding actions
- **C.** It ensures the agent always explores new states
- **D.** It focuses on minimizing the Q-values of all actions

**Supplied answer:** B. It addresses the need to explore new actions and exploit known rewarding actions
**Learning verdict:** correct
**Why:** Option B (It addresses the need to explore new actions and exploit known rewarding actions) matches the local lecture evidence. Exploration affects behavior; the learning target remains greedy.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 11, 16
**Related concept:** Epsilon-greedy exploratory behavior in Q-learning
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q197"></a>
### Q197 — `C2-M4` · acceptable-with-caveat

In Q-learning, the update rule uses which action's reward to update the Q-values?

- **A.** The action dictated by the current policy.
- **B.** The action chosen by an exploration strategy.
- **C.** The action chosen by a different policy.
- **D.** The action with the highest estimated Q-value.

**Supplied answer:** B. The action chosen by an exploration strategy.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The action chosen by an exploration strategy.). One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\).
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3–7, 10, 16
**Related concept:** Q-learning target and iterative action-value improvement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q198"></a>
### Q198 — `C2-M4` · correct

What is the main objective of the Q-learning algorithm?

- **A.** To minimize the state-action pair values
- **B.** To maximize the total reward over time
- **C.** To minimize the exploration rate
- **D.** To maximize the number of actions taken

**Supplied answer:** B. To maximize the total reward over time
**Learning verdict:** correct
**Why:** Option B (To maximize the total reward over time) matches the local lecture evidence. “Maximize total reward” is broad; slides more precisely say learn \(Q^*\) and an optimal policy.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 5, 7
**Related concept:** Q-learning goal / generic RL algorithm recognition
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q199"></a>
### Q199 — `C2-M4` · correct

What does SARSA stand for in the context of reinforcement learning?

- **A.** State-Action-Reward-State-Action
- **B.** State-Action-Reward-Sequence-Action
- **C.** State-Action-Return-State-Action
- **D.** State-Action-Reward-State-Adaptation

**Supplied answer:** A. State-Action-Reward-State-Action
**Learning verdict:** correct
**Why:** Option A (State-Action-Reward-State-Action) matches the local lecture evidence. The target action \(A'\) is chosen by the same current policy used for behavior.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 5–10
**Related concept:** Sarsa sampled next action and on-policy relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q200"></a>
### Q200 — `C2-M4` · correct

What role does the policy's probability distribution play in Expected Sarsa?

- **A.** It determines which action to take next
- **B.** It weights the Q-values of possible actions to compute the expected value
- **C.** Itis used to calculate the maximum Q-value of the next state
- **D.** It helps in selecting the greedy action for the update rule

**Supplied answer:** B. It weights the Q-values of possible actions to compute the expected value
**Learning verdict:** correct
**Why:** Option B (It weights the Q-values of possible actions to compute the expected value) matches the local lecture evidence. “Weighted sum” matches the displayed equation.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12–13
**Related concept:** Expected Sarsa's probability-weighted next-action value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q201"></a>
### Q201 — `C3-M5` · correct

How are policy gradient algorithms typically applied to continuous action spaces?

- **A.** By discretizing the action space
- **B.** By using actor-critic architectures
- **C.** By applying Gaussian policy distributions
- **D.** By incorporating additional reward functions

**Supplied answer:** C. By applying Gaussian policy distributions
**Learning verdict:** correct
**Why:** Option C (By applying Gaussian policy distributions) matches the local lecture evidence. Q203 may conflate temperature with learned preference/variance
**Primary lecture:** [3.12 Policy Parameterizations.pptx](#lecture-3-12), slides 3–13
**Related concept:** softmax actor; Gaussian policy
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q202"></a>
### Q202 — `C1-M4` · incorrect

What does the optimal value function represent?

- **A.** The maximum reward achievable from a given state
- **B.** The minimum reward achievable from a given state
- **C.** The average reward achievable from a given state
- **D.** The discounted future reward achievable from a given state

**Supplied answer:** A. The maximum reward achievable from a given state
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** The optimal value is maximum expected return, \(v_*(s)=\max_\pi\mathbb E_\pi[G_t\mid S_t=s]\), not a single maximum reward.
**Primary lecture:** [1.9 Optimality (Optimal Policies & Value Functions).pptx](#lecture-1-9), slides 7–19, 26
**Related concept:** Optimal value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q203"></a>
### Q203 — `C3-M5` · bank-key-only

Which parameter determines the degree of exploration in Actor-Critic with Softmax Policies?

- **A.** Learning rate
- **B.** Temperature parameter
- **C.** Discount factor
- **D.** Advantage function

**Supplied answer:** B. Temperature parameter
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Temperature parameter) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** softmax actor; Gaussian policy
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [3.12 Policy Parameterizations.pptx](#lecture-3-12), slides 3–13

[Back to question navigation](#question-navigation)

---

<a id="q204"></a>
### Q204 — `C1-M3` · correct

What role does the reward signal play in adjusting the parameters of a policy?

- **A.** It determines the size of the neural network
- **B.** It guides the policy towards actions that lead to higher rewards
- **C.** It defines the state space of the environment
- **D.** It regulates the exploration rate

**Supplied answer:** B. It guides the policy towards actions that lead to higher rewards
**Learning verdict:** correct
**Why:** Option B (It guides the policy towards actions that lead to higher rewards) matches the local lecture evidence. Directional feedback is supported; explicit parameter adjustment is not shown.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 8–12
**Related concept:** Reward guiding a policy
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q205"></a>
### Q205 — `C2-M4` · correct

Why is it important to update Q-values iteratively in Q-learning?

- **A.** To ensure the immediate reward is maximized
- **B.** To approximate the optimal action-value function over time
- **C.** To maintain a fixed policy
- **D.** To prevent overfitting to the training data and testing step

**Supplied answer:** B. To approximate the optimal action-value function over time
**Learning verdict:** correct
**Why:** Option B (To approximate the optimal action-value function over time) matches the local lecture evidence. One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\).
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3–7, 10, 16
**Related concept:** Q-learning target and iterative action-value improvement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q206"></a>
### Q206 — `C1-M4` · correct

What is the primary purpose of the state value function in reinforcement learning?

- **A.** To determine the probability of taking a certain action
- **B.** To estimate the future rewards from a given state
- **C.** To record the history of visited states
- **D.** To minimize the error rate of predictions

**Supplied answer:** B. To estimate the future rewards from a given state
**Learning verdict:** correct
**Why:** Option B (To estimate the future rewards from a given state) matches the local lecture evidence. Estimate expected future return from a state under a policy.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 9–12
**Related concept:** Purpose of state value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q207"></a>
### Q207 — `C3-M2` · correct

In the context of gradient descent, what is a 'learning rate'?

- **A.** The amount of data processed per iteration
- **B.** The step size used to update the parameters
- **C.** The total number of iterations
- **D.** The rate at which the model's performance improves

**Supplied answer:** B. The step size used to update the parameters
**Learning verdict:** correct
**Why:** Option B (The step size used to update the parameters) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q208"></a>
### Q208 — `C1-M2` · correct

What does the epsilon (€) represent in the ¢-greedy algorithm?

- **A.** The probability of selecting a random arm.
- **B.** The reward received from the best arm.
- **C.** The rate of learning over time.
- **D.** The number of arms in the problem.

**Supplied answer:** A. The probability of selecting a random arm.
**Learning verdict:** correct
**Why:** Option A (The probability of selecting a random arm.) matches the local lecture evidence. Probability of random exploration branch.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 14–15
**Related concept:** Epsilon in epsilon-greedy
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q209"></a>
### Q209 — `C3-M2` · acceptable-with-caveat

Which variant of gradient descent is typically used in reinforcement learning to handle large and contin state spaces?

- **A.** Mini-batch gradient descent
- **B.** Stochastic gradient descent (SGD)
- **C.** Batch gradient descent
- **D.** None of the above

**Supplied answer:** B. Stochastic gradient descent (SGD)
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (Stochastic gradient descent (SGD)). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q210"></a>
### Q210 — `C2-M4` · correct

In the Q-learning algorithm, what is the main goal when updating the Q-values?

- **A.** To maximize the immediate reward
- **B.** To find the shortest path
- **C.** To minimize the temporal difference error
- **D.** To maximize the exploration rate

**Supplied answer:** C. To minimize the temporal difference error
**Learning verdict:** correct
**Why:** Option C (To minimize the temporal difference error) matches the local lecture evidence. One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\).
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3–7, 10, 16
**Related concept:** Q-learning target and iterative action-value improvement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q211"></a>
### Q211 — `C1-M4` · acceptable-with-caveat

Which function is typically used to represent the action value in reinforcement learning?

- **A.** Reward function (R)
- **B.** Value function (V)
- **C.** Policy function (n)
- **D.** Q-function (Q)

**Supplied answer:** D. Q-function (Q)
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is D (Q-function (Q)). \(Q(s,a)\) / \(q_\pi(s,a)\).
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 11
**Related concept:** Action-value notation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q212"></a>
### Q212 — `C3-M5` · acceptable-with-caveat

Which type of policy directly associates actions with states without using a value function?

- **A.** Value-based policy
- **B.** Model-based policy
- **C.** Policy-based policy
- **D.** Q-learning policy

**Supplied answer:** C. Policy-based policy
**Learning verdict:** acceptable-with-caveat
**Why:** A directly parameterized policy maps states to action probabilities/actions without greedy selection from a value function.
**Primary lecture:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q213"></a>
### Q213 — `C2-M4` · acceptable-with-caveat

In SARSA, what is typically done if the learning rate (alpha) is too high?

- **A.** The algorithm converges too slowly.
- **B.** The algorithm might not converge and the Q-values will fluctuate.
- **C.** The algorithm will ignore the discount factor (gamma).
- **D.** The rewards will not be properly discounted.

**Supplied answer:** B. The algorithm might not converge and the Q-values will fluctuate.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The algorithm might not converge and the Q-values will fluctuate.). Slides say \(\alpha\) controls update size; the non-convergence/fluctuation statement is not quantified.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 9–10
**Related concept:** Learning rate in Sarsa
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q214"></a>
### Q214 — `C1-M5` · acceptable-with-caveat

What is the Bellman equation used for in dynamic programming?

- **A.** To minimize a cost function over time.
- **B.** To find the shortest path in a graph.
- **C.** To determine the value of a decision problem.
- **D.** To maximize profit in a business model.

**Supplied answer:** C. To determine the value of a decision problem.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (To determine the value of a decision problem.). It supplies recursive value consistency; “determine a decision problem’s value” is vague.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3, 8, 18
**Related concept:** Bellman equation in DP
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q215"></a>
### Q215 — `C2-M4` · acceptable-with-caveat

Which algorithm typically results in smoother learning updates, reducing variance in the updates?

- **A.** Sarsa
- **B.** Expected Sarsa
- **C.** Q-learning
- **D.** Monte Carlo methods

**Supplied answer:** B. Expected Sarsa
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (Expected Sarsa). Deck supports its presented stability/variance comparison; do not convert it into a universal guarantee for every environment.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 3, 8–9, 12–15
**Related concept:** Smoother/stabler expected updates
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q216"></a>
### Q216 — `C1-M3` · correct

Which of the following is NOT a component of the reinforcement learning framework?

- **A.** Agent
- **B.** Environment
- **C.** Memory
- **D.** Reward Signal

**Supplied answer:** C. Memory
**Learning verdict:** correct
**Why:** Option C (Memory) matches the local lecture evidence. Memory is not listed as a required basic component.
**Primary lecture:** [1.4 Introduction to Markov Decision Processes  .pptx](#lecture-1-4), slides 9–11
**Related concept:** Basic RL framework components
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q217"></a>
### Q217 — `C1-M4` · correct

What is the objective of estimating action values in reinforcement learning?

- **A.** To determine the optimal policy
- **B.** To compute the state values
- **C.** To minimize the temporal difference error
- **D.** To calculate the reward function

**Supplied answer:** A. To determine the optimal policy
**Learning verdict:** correct
**Why:** Option A (To determine the optimal policy) matches the local lecture evidence. Estimates support choosing better actions; “determine optimal policy” is stronger than the bandit deck states.
**Primary lecture:** [1.2. Estimating Action Values.pptx](#lecture-1-2), slides 3–4, 10–11
**Related concept:** Purpose of action-value estimates
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q218"></a>
### Q218 — `OUT` · bank-key-only

Which task type is more conducive to forming habits?

- **A.** Episodic tasks.
- **B.** Continuing tasks.
- **C.** Both episodic and continuing tasks.
- **D.** Neither episodic nor continuing tasks.

**Supplied answer:** B. Continuing tasks.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer B (Continuing tasks.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** habit and episodic-task learning
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q219"></a>
### Q219 — `C2-M4` · correct

Which of the following is the key difference between SARSA and Q-learning?

- **A.** SARSA is on-policy, while Q-learning is off-policy.
- **B.** SARSA is off-policy, while Q-learning is on-policy.
- **C.** SARSA does not use a learning rate, while Q-learning does.
- **D.** SARSA is deterministic, while Q-learning is stochastic.

**Supplied answer:** A. SARSA is on-policy, while Q-learning is off-policy.
**Learning verdict:** correct
**Why:** Option A (SARSA is on-policy, while Q-learning is off-policy.) matches the local lecture evidence. “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 8–11
**Related concept:** Q-learning off-policy; contrast with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q220"></a>
### Q220 — `C3-M2` · correct

In the context of Temporal Difference (TD) learning, which feature of Tabular TD learning makes it a sp case of linear semi-gradient TD learning?

- **A.** The use of function approximation.
- **B.** The use of linear functions.
- **C.** The discretization of state space into individual entries.
- **D.** The non-linear combination of features.

**Supplied answer:** C. The discretization of state space into individual entries.
**Learning verdict:** correct
**Why:** Option C (The discretization of state space into individual entries.) matches the local lecture evidence. matrix derivation intentionally excluded
**Primary lecture:** [3.4 Linear Temporal Difference.pptx](#lecture-3-4), slides 3–13
**Related concept:** linear TD; tabular special case; fixed point
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q221"></a>
### Q221 — `C2-M4` · acceptable-with-caveat

What is the primary challenge addressed by the SARSA (State-Action-Reward-State-Action) algorithm compared to Q-learning?

- **A.** SARSA does not require a model of the environment
- **B.** SARSA directly optimizes the policy without estimating action values
- **C.** SARSA uses the action taken in the next state for updates, leading to on-policy learning
- **D.** SARSA avoids the need for a discount factor

**Supplied answer:** C. SARSA uses the action taken in the next state for updates, leading to on-policy learning
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (SARSA uses the action taken in the next state for updates, leading to on-policy learning). The target action \(A'\) is chosen by the same current policy used for behavior.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 5–10
**Related concept:** Sarsa sampled next action and on-policy relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q222"></a>
### Q222 — `C1-M5` · acceptable-with-caveat

Which of the following is NOT a characteristic of a problem suitable for dynamic programming?

- **A.** Optimal substructure
- **B.** Overlapping subproblems
- **C.** Greedy solution approach
- **D.** Recursion

**Supplied answer:** C. Greedy solution approach
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Greedy solution approach). Known dynamics and manageable updates are supported; “greedy approach” is not a suitability criterion taught here.
**Primary lecture:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 7
**Related concept:** Suitability for dynamic programming
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q223"></a>
### Q223 — `C3-M2` · correct

What is the main advantage of using function approximation in reinforcement learning?

- **A.** Faster convergence
- **B.** Reduced computational complexity
- **C.** Ability to generalize across states
- **D.** Increased exploration

**Supplied answer:** C. Ability to generalize across states
**Learning verdict:** correct
**Why:** Option C (Ability to generalize across states) matches the local lecture evidence. Q104/Q255 are not universally true without feature assumptions
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q224"></a>
### Q224 — `C2-M2` · incorrect

Which of the following methods is primarily used to estimate action values in model-free reinforcement learning?

- **A.** Policy gradient methods
- **B.** Monte Carlo methods
- **C.** Temporal Difference learning
- **D.** Dynamic programming

**Supplied answer:** C. Temporal Difference learning
**Learning verdict:** incorrect
**Correct answer:** Both B and C; the item has two valid model-free families.
**Why:** Sutton–Barto evidence contradicts the supplied key. Both Monte Carlo and temporal-difference methods estimate action values without an environment model. Reference answer: Both B and C; the item has two valid model-free families.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §§5.1–5.2; Ch. 6, §§6.1, 6.4–6.6, printed pp. 92, 96, 119, 129, 131, 133
**Reference explanation:** Both Monte Carlo and temporal-difference methods estimate action values without an environment model.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.2 Monte-Carlo for Control.pptx](#lecture-2-2), slides 3–4
**Related concept:** Model-free action-value estimation

[Back to question navigation](#question-navigation)

---

<a id="q225"></a>
### Q225 — `C3-M5` · bank-key-only

In numerical methods, what is one limitation of estimating the gradient using samples?

- **A.** It always provides an exact solution
- **B.** It cannot handle non-linear functions
- **C.** Itis sensitive to the choice of step size
- **D.** It requires knowledge of calculus

**Supplied answer:** C. Itis sensitive to the choice of step size
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Itis sensitive to the choice of step size) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** sampled gradient; baseline; actor–critic roles
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11

[Back to question navigation](#question-navigation)

---

<a id="q226"></a>
### Q226 — `C3-M5` · acceptable-with-caveat

What is the advantage of using the Actor-Critic algorithm over other reinforcement learning methods?

- **A.** lt requires less computational resources
- **B.** Itis more stable and faster to converge
- **C.** It guarantees convergence to the optimal policy
- **D.** Itis less sensitive to hyperparameter tuning

**Supplied answer:** B. Itis more stable and faster to converge
**Learning verdict:** acceptable-with-caveat
**Why:** Actor–critic may lower variance and learn online, but it is not universally faster or more stable.
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q227"></a>
### Q227 — `C2-M5` · correct

Which of the following is a primary purpose of using a model in reinforcement learning?

- **A.** To visualize data
- **B.** To predict the next action of an agent
- **C.** To simulate the environment's response to different actions
- **D.** To increase the speed of the learning process

**Supplied answer:** C. To simulate the environment's response to different actions
**Learning verdict:** correct
**Why:** Option C (To simulate the environment's response to different actions) matches the local lecture evidence. Model-based use enables simulated consequences/planning; model-free omits that explicit model.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 3–7
**Related concept:** Model, model-free, and model-based approach
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q228"></a>
### Q228 — `C2-M4` · acceptable-with-caveat

In the SARSA algorithm, what is the role of the discount factor 1?

- **A.** It determines the rate at which the algorithm explores new actions.
- **B.** It balances the trade-off between immediate and future rewards.
- **C.** It adjusts the learning rate dynamically.
- **D.** It scales the rewards to be in the range of [0,1].

**Supplied answer:** B. It balances the trade-off between immediate and future rewards.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It balances the trade-off between immediate and future rewards.). Source symbol is \(\gamma\); corrupted “1” in the bank should not be memorized.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 9–10
**Related concept:** Discount factor in Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q229"></a>
### Q229 — `C3-M2` · incorrect

Which of the following methods combines linear function approximation with policy improvement?

- **A.** Policy Gradient Methods
- **B.** Value Iteration
- **C.** Actor-Critic Methods
- **D.** Tabular Q-Learning

**Supplied answer:** C. Actor-Critic Methods
**Learning verdict:** incorrect
**Correct answer:** C is one valid family, but it is not unique; semi-gradient Sarsa is another.
**Why:** Sutton–Barto evidence contradicts the supplied key. Semi-gradient Sarsa and actor–critic can both combine linear function approximation with policy improvement/control. Reference answer: C is one valid family, but it is not unique; semi-gradient Sarsa is another.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 10, §§10.1–10.2; Ch. 13, §13.5, printed pp. 243, 244, 247, 331, 332
**Reference explanation:** Semi-gradient Sarsa and actor–critic can both combine linear function approximation with policy improvement/control.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.6 Episodic Sarsa with Function Approximation.pptx](#lecture-3-6), slides 3–18
**Related concept:** action-dependent features; approximate control targets

[Back to question navigation](#question-navigation)

---

<a id="q230"></a>
### Q230 — `C2-M3` · incorrect

In the context of Temporal Difference (TD), what is the main objective of the TD(0) algorithm?

- **A.** To maximize the immediate reward.
- **B.** To minimize the temporal difference error.
- **C.** To reduce the variance of the estimate.
- **D.** To explore the state-action space.

**Supplied answer:** B. To minimize the temporal difference error.
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** TD(0) estimates a policy value with one-step bootstrapped targets; it is not generally gradient descent on squared TD error.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 2, 8–12
**Related concept:** TD(0) objective
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q231"></a>
### Q231 — `C2-M3` · incorrect

What is the main advantage of temporal-difference learning over other reinforcement learning methods

- **A.** lt requires less computational resources.
- **B.** It can handle non-stationary environments.
- **C.** It doesn't rely on rewards.
- **D.** It guarantees optimal policy convergence.

**Supplied answer:** A. lt requires less computational resources.
**Learning verdict:** incorrect
**Correct answer:** The defining advantage is online bootstrapping without waiting for a complete episode.
**Why:** Like Q032, the supplied lower-compute claim is not the defining universal advantage supported by the TD slides.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3–6, 11–16
**Related concept:** Claimed TD advantage over MC
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q232"></a>
### Q232 — `C2-M5` · correct

In reinforcement learning, what is a model-based approach?

- **A.** An approach where the agent learns a policy without any knowledge of the environment
- **B.** An approach where the agent uses a model of the environment to plan actions
- **C.** An approach where the agent is supervised by a teacher
- **D.** An approach where the agent learns solely through trial and error

**Supplied answer:** B. An approach where the agent uses a model of the environment to plan actions
**Learning verdict:** correct
**Why:** Option B (An approach where the agent uses a model of the environment to plan actions) matches the local lecture evidence. Model-based use enables simulated consequences/planning; model-free omits that explicit model.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 3–7
**Related concept:** Model, model-free, and model-based approach
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q233"></a>
### Q233 — `C2-M3` · correct

What is the key objective of using a Temporal Difference (TD) learning algorithm? (choose the best answer/core idea of TD learning)

- **A.** To estimate the value of a state based on the complete return from a full episode.
- **B.** To update the value function by using the difference between successive state values.
- **C.** To learn the optimal value function without requiring a model of the environment's dynamics.
- **D.** To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.

**Supplied answer:** D. To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.
**Learning verdict:** correct
**Why:** Option D (To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.) matches the local lecture evidence. The supplied core-idea answer matches the displayed target.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 3–9
**Related concept:** TD combines sampled experience with a bootstrap target
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q234"></a>
### Q234 — `C2-M5` · incorrect

Which of the following methods is associated with distribution models for handling uncertainty in state transitions?

- **A.** Markov Decision Processes (MDPs)
- **B.** Policy Gradient Methods
- **C.** Particle Filters
- **D.** Q-Learning

**Supplied answer:** C. Particle Filters
**Learning verdict:** incorrect
**Correct answer:** The transition/reward distribution p(s',r|s,a), commonly the model component of an MDP; none of the method labels is precise.
**Why:** Sutton–Barto evidence contradicts the supplied key. A distribution model directly represents the joint next-state/reward probabilities; particle filtering is not the distribution-model method defined here. Reference answer: The transition/reward distribution p(s',r|s,a), commonly the model component of an MDP; none of the method labels is precise.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §8.1 Models and Planning, printed pp. 159, 160
**Reference explanation:** A distribution model directly represents the joint next-state/reward probabilities; particle filtering is not the distribution-model method defined here.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 10–16
**Related concept:** Distribution-model method named in the supplied options

[Back to question navigation](#question-navigation)

---

<a id="q235"></a>
### Q235 — `C3-M5` · acceptable-with-caveat

What does the exploration in Gaussian policies rely on?

- **A.** Random noise added to the mean action
- **B.** Random sampling from a uniform distribution
- **C.** Fixed exploration rate
- **D.** Adaptive exploration based on reward feedback

**Supplied answer:** A. Random noise added to the mean action
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Random noise added to the mean action). Q203 may conflate temperature with learned preference/variance
**Primary lecture:** [3.12 Policy Parameterizations.pptx](#lecture-3-12), slides 3–13
**Related concept:** softmax actor; Gaussian policy
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q236"></a>
### Q236 — `C2-M4` · correct

Which of the following algorithms is commonly used in reinforcement learning?

- **A.** k-Nearest Neighbors
- **B.** Q-Learning
- **C.** Principal Component Analysis
- **D.** Decision Trees

**Supplied answer:** B. Q-Learning
**Learning verdict:** correct
**Why:** Option B (Q-Learning) matches the local lecture evidence. “Maximize total reward” is broad; slides more precisely say learn \(Q^*\) and an optimal policy.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 5, 7
**Related concept:** Q-learning goal / generic RL algorithm recognition
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q237"></a>
### Q237 — `C2-M4` · acceptable-with-caveat

What is a potential disadvantage of using Expected Sarsa over Sarsa?

- **A.** It tends to have higher variance in updates
- **B.** It requires knowledge of the policy's action probabilities
- **C.** It converges more slowly than Sarsa
- **D.** It cannot be used in online learning settings

**Supplied answer:** B. It requires knowledge of the policy's action probabilities
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It requires knowledge of the policy's action probabilities). Required to compute the expectation; “disadvantage” depends on whether those probabilities are available.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12
**Related concept:** Need for policy action probabilities
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q238"></a>
### Q238 — `C1-M2` · correct

In the sample average method, what does the step size parameter determine?

- **A.** The total number of actions taken
- **B.** The influence of the most recent reward on the estimate
- **C.** The number of ads to display
- **D.** The initial value of Q

**Supplied answer:** B. The influence of the most recent reward on the estimate
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. The step size multiplies the newest reward's estimation error and therefore controls how much the latest observation changes the estimate. Reference answer: B — the influence of the most recent reward on the estimate.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.4 Incremental Implementation, printed pp. 30, 31
**Reference explanation:** The step size multiplies the newest reward's estimation error and therefore controls how much the latest observation changes the estimate.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.2. Estimating Action Values.pptx](#lecture-1-2), slides 3–9
**Related concept:** Sample-average step size

[Back to question navigation](#question-navigation)

---

<a id="q239"></a>
### Q239 — `C3-M5` · correct

Which technique is commonly used to reduce the variance of policy gradient estimates?

- **A.** Actor-Critic methods
- **B.** Temporal Difference learning
- **C.** Monte Carlo Tree Search
- **D.** Model-based reinforcement learning

**Supplied answer:** A. Actor-Critic methods
**Learning verdict:** correct
**Why:** Option A (Actor-Critic methods) matches the local lecture evidence. Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q240"></a>
### Q240 — `C3-M5` · acceptable-with-caveat

What is the main challenge associated with using parameterized policies in reinforcement learning?

- **A.** They are computationally expensive
- **B.** They often lead to overfitting
- **C.** They require a large amount of training data
- **D.** They can suffer from local optima

**Supplied answer:** D. They can suffer from local optima
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. Nonlinear parameterized approximators generally may reach only local optima, so local optima are a real challenge, though not a universally unique 'main' challenge. Reference answer: D is a valid challenge: optimization may settle at local optima.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §§9.2–9.3; Ch. 13, §13.1, printed pp. 199, 200, 321, 322
**Reference explanation:** Nonlinear parameterized approximators generally may reach only local optima, so local optima are a real challenge, though not a universally unique 'main' challenge.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.9 Learning Parameterized Policies.pptx](#lecture-3-9), slides 3–9
**Related concept:** direct parameterized policy; softmax preferences

[Back to question navigation](#question-navigation)

---

<a id="q241"></a>
### Q241 — `C3-M5` · acceptable-with-caveat

What is the advantage of using a higher number of sample points in estimating the gradient?

- **A.** Increased accuracy
- **B.** Decreased computation time
- **C.** Reduced memory usage
- **D.** Smaller margin of error

**Supplied answer:** A. Increased accuracy
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is A (Increased accuracy). Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q242"></a>
### Q242 — `C2-M3` · correct

Which statement best describes Tabular Temporal Difference (TD) learning?

- **A.** It uses a table to store values for each state-action pair.
- **B.** It uses function approximation to estimate value functions.
- **C.** It updates values based on rewards and state transitions without using tables.
- **D.** It requires the exact model of the environment.

**Supplied answer:** A. It uses a table to store values for each state-action pair.
**Learning verdict:** correct
**Why:** Option A (It uses a table to store values for each state-action pair.) matches the local lecture evidence. Exact duplicate family. The slide shows state-value table entries, while options mention state-action pairs; tabular storage is the stable concept.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 11–12
**Related concept:** Tabular TD stores separate table entries
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q243"></a>
### Q243 — `C2-M5` · acceptable-with-caveat

What does the Q-Learning update do in the context of planning?

- **A.** It generates new states.
- **B.** It improves the policy based on updated action values.
- **C.** It eliminates the need for a model.
- **D.** It only focuses on real-world experiences.

**Supplied answer:** B. It improves the policy based on updated action values.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It improves the policy based on updated action values.). Q means action value; random planning provides update coverage, not real-environment exploration; the planning update still requires a model.
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–7
**Related concept:** Random-sample one-step tabular Q-planning
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q244"></a>
### Q244 — `C2-M4` · correct

In expected Sarsa, the weights used in the expectation calculation are based on:

- **A.** The rewards received
- **B.** The probability of taking each action under the agent's policy
- **C.** The number of actions available
- **D.** The current state of the environment

**Supplied answer:** B. The probability of taking each action under the agent's policy
**Learning verdict:** correct
**Why:** Option B (The probability of taking each action under the agent's policy) matches the local lecture evidence. “Weighted sum” matches the displayed equation.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12–13
**Related concept:** Expected Sarsa's probability-weighted next-action value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q245"></a>
### Q245 — `C1-M3` · correct

Which algorithm is commonly used to solve an MDP?

- **A.** K-means clustering
- **B.** Breadth-first search
- **C.** Value iteration
- **D.** Gradient descent

**Supplied answer:** C. Value iteration
**Learning verdict:** correct
**Why:** Option C (Value iteration) matches the local lecture evidence. Supported as a classic DP algorithm; assumes the DP/model setting from 1.10/7.
**Primary lecture:** [1.12 Generalized Policy Iteration.pptx](#lecture-1-12), slides 6–10
**Related concept:** Value iteration for an MDP
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q246"></a>
### Q246 — `C2-M2` · acceptable-with-caveat

What is a common approach to reduce the variance in Monte Carlo estimates?

- **A.** Using a discount factor.
- **B.** Using importance sampling.
- **C.** Using eligibility traces.
- **D.** Using linear function approximation.

**Supplied answer:** B. Using importance sampling.
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Ordinary importance sampling may have extremely high variance; weighted, discount-aware, or per-decision variants are introduced to reduce it. Reference answer: B only with a well-chosen/variance-controlled importance-sampling estimator; generic importance sampling is not automatically variance-reducing.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §§5.5, 5.8, and 5.9, printed pp. 103, 104, 105, 106, 112, 114
**Reference explanation:** Ordinary importance sampling may have extremely high variance; weighted, discount-aware, or per-decision variants are introduced to reduce it.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–17
**Related concept:** Importance sampling and variance claims

[Back to question navigation](#question-navigation)

---

<a id="q247"></a>
### Q247 — `C2-M2` · correct

In contrast to Dynamic Programming and Monte Carlo methods, what aspect makes Temporal Difference (TD) methods more suitable for online learning?

- **A.** TD methods are slower to update values.
- **B.** TD methods require extensive computational resources.
- **C.** TD methods update values based on incomplete sequences.
- **D.** TD methods are less flexible in adapting to changing environments.

**Supplied answer:** C. TD methods update values based on incomplete sequences.
**Learning verdict:** correct
**Why:** Option C (TD methods update values based on incomplete sequences.) matches the local lecture evidence. Changing-environment adaptation is a consequence of online updates, not a guarantee of tracking speed.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3, 6, 12, 16
**Related concept:** Online/incremental TD learning
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q248"></a>
### Q248 — `C1-M4` · acceptable-with-caveat

What is the Bellman equation used for in the context of MDPs?

- **A.** To determine the optimal policy.
- **B.** To update the value function.
- **C.** To calculate the transition probabilities.
- **D.** To find the immediate reward.

**Supplied answer:** B. To update the value function.
**Learning verdict:** acceptable-with-caveat
**Why:** A Bellman equation expresses a recursive value relationship; an algorithm may use it to update estimates.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3, 8, 18
**Related concept:** Bellman equation versus update
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q249"></a>
### Q249 — `C3-M2` · acceptable-with-caveat

In the context of linear function approximation, what is the gradient of the value function approximation?

- **A.** The true value of the state
- **B.** The feature vector in that state
- **C.** The mean squared error
- **D.** The policy value

**Supplied answer:** B. The feature vector in that state
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The feature vector in that state). matrix derivation intentionally excluded
**Primary lecture:** [3.4 Linear Temporal Difference.pptx](#lecture-3-4), slides 3–13
**Related concept:** linear TD; tabular special case; fixed point
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q250"></a>
### Q250 — `C1-M5` · correct

Which phase of Policy Iteration involves updating the policy based on the current value function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** B. Policy Improvement
**Learning verdict:** correct
**Why:** Option B (Policy Improvement) matches the local lecture evidence. Phase updates policy using current value information.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9–13
**Related concept:** Policy-improvement phase
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q251"></a>
### Q251 — `C3-M2` · acceptable-with-caveat

In the context of function approximation, what does Mu of S represent?

- **A.** The total number of states
- **B.** The probability distribution of state visits
- **C.** The error in value function approximation
- **D.** The learning rate of the algorithm

**Supplied answer:** B. The probability distribution of state visits
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The probability distribution of state visits). interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q252"></a>
### Q252 — `C2-M4` · incorrect

What does the term "off-policy" refer to in the context of Expected Sarsa?

- **A.** Learning from actions that are not taken by the agent.
- **B.** Learning from actions that are taken by the agent.
- **C.** Learning without any prior knowledge of the environment.
- **D.** Learning that does not depend on the current policy.

**Supplied answer:** A. Learning from actions that are not taken by the agent.
**Learning verdict:** incorrect
**Correct answer:** Behavior and target policies differ; none of the options says this correctly.
**Why:** Sutton–Barto evidence contradicts the supplied key. Off-policy learning uses data generated by a behavior policy to learn about a different target policy; it still learns from actions actually taken. Reference answer: Behavior and target policies differ; none of the options says this correctly.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §§5.5 and 5.7; Ch. 6, §§6.5–6.6, printed pp. 103, 104, 110, 131, 133
**Reference explanation:** Off-policy learning uses data generated by a behavior policy to learn about a different target policy; it still learns from actions actually taken.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 11–13
**Related concept:** Meaning of off-policy Expected Sarsa

[Back to question navigation](#question-navigation)

---

<a id="q253"></a>
### Q253 — `C1-M4` · correct

What is the Bellman equation used for in the context of MDPs?

- **A.** To calculate the shortest path between states.
- **B.** To update the policy in reinforcement learning.
- **C.** To express the relationship between the value of a state and the values of its successor states.
- **D.** To compute the transition probabilities between states to get maximum rewards.

**Supplied answer:** C. To express the relationship between the value of a state and the values of its successor states.
**Learning verdict:** correct
**Why:** Option C (To express the relationship between the value of a state and the values of its successor states.) matches the local lecture evidence. Exact-duplicate family with Q045/Q248.
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 3–8
**Related concept:** Bellman recursive relationship
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q254"></a>
### Q254 — `C2-M3` · correct

What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?

- **A.** TD methods require complete episodes for updating values.
- **B.** TD methods update values based on incomplete episodes.
- **C.** TD methods cannot handle incomplete episodes efficiently.
- **D.** TD methods do not rely on experiences for learning.

**Supplied answer:** B. TD methods update values based on incomplete episodes.
**Learning verdict:** correct
**Why:** Option B (TD methods update values based on incomplete episodes.) matches the local lecture evidence. Exact duplicate family.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3, 6, 12, 16
**Related concept:** TD can update from incomplete episodes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q255"></a>
### Q255 — `C3-M2` · acceptable-with-caveat

Which problem arises due to the use of linear function approximation in reinforcement learning?

- **A.** Overfitting
- **B.** Curse of dimensionality
- **C.** Underfitting
- **D.** Vanishing gradients

**Supplied answer:** C. Underfitting
**Learning verdict:** acceptable-with-caveat
**Why:** Linear approximation may underfit, but this is not an inherent single 'problem' without assumptions about features.
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q256"></a>
### Q256 — `C2-M3` · correct

In the context of Temporal Difference (TD), Which of the following is NOT a step in the TD(0) algorithm?

- **A.** Prediction
- **B.** Evaluation
- **C.** Backpropagation
- **D.** Bootstrapping

**Supplied answer:** C. Backpropagation
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. TD(0) observes a transition, forms a bootstrapped TD target/error, and updates the current value estimate; backpropagation is not a tabular TD(0) step. Reference answer: C — backpropagation.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 6, §6.1 TD Prediction, printed pp. 119, 120
**Reference explanation:** TD(0) observes a transition, forms a bootstrapped TD target/error, and updates the current value estimate; backpropagation is not a tabular TD(0) step.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 9–12
**Related concept:** TD(0) algorithm steps

[Back to question navigation](#question-navigation)

---

<a id="q257"></a>
### Q257 — `C2-M5` · incorrect

What is the primary purpose of Dyna Architecture?

- **A.** To develop operating systems
- **B.** To design scalable web servers
- **C.** To model complex dynamic systems
- **D.** To manage database transactions

**Supplied answer:** C. To model complex dynamic systems
**Learning verdict:** incorrect
**Correct answer:** None of the options states Dyna's actual purpose.
**Why:** Sutton–Barto evidence contradicts the supplied key. Dyna's purpose is to integrate learning, model learning, planning, and acting, not merely to model generic dynamic systems. Reference answer: None of the options states Dyna's actual purpose.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 8, §§8.1–8.2, printed pp. 159, 160, 161, 162
**Reference explanation:** Dyna's purpose is to integrate learning, model learning, planning, and acting, not merely to model generic dynamic systems.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.12 Dyna as a formalism for planning.pptx](#lecture-2-12), slides 3–7, 11–15
**Related concept:** Purpose of Dyna architecture

[Back to question navigation](#question-navigation)

---

<a id="q258"></a>
### Q258 — `C3-M2` · acceptable-with-caveat

What is the main purpose of using optimistic initial values in function approximation?

- **A.** To ensure faster convergence
- **B.** To encourage exploration
- **C.** To minimize errors
- **D.** To guarantee optimal solutions

**Supplied answer:** B. To encourage exploration
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To encourage exploration). The item checks exploration with function approximation.
**Primary lecture:** [3.7 Exploration under Function Approximation.pptx](#lecture-3-7), slides 3–10
**Related concept:** optimism and epsilon-greedy with approximation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q259"></a>
### Q259 — `C2-M2` · correct

In the Monte Carlo prediction method, what is the purpose of using the policy π?

- **A.** To determine the sequence of states
- **B.** To generate episodes
- **C.** To update the value function
- **D.** To ensure convergence of the algorithm

**Supplied answer:** B. To generate episodes
**Learning verdict:** correct
**Why:** Option B (To generate episodes) matches the local lecture evidence. Policy \(\pi\) both defines the value being estimated and generates the on-policy episode here.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 8–9
**Related concept:** Policy evaluation and policy-generated episodes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q260"></a>
### Q260 — `C3-M2` · acceptable-with-caveat

What does the term "semi-gradient" refer to in the context of linear semi-gradient Temporal Difference learning?

- **A.** Using gradients to update the table values.
- **B.** Approximating gradients using a non-linear function.
- **C.** Using part of the gradient information to update parameters.
- **D.** Calculating exact gradients for function updates.

**Supplied answer:** C. Using part of the gradient information to update parameters.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Using part of the gradient information to update parameters.). The item checks linear semi-gradient TD.
**Primary lecture:** [3.3 The Objective for Temporal Difference.pptx](#lecture-3-3), slides 3–16
**Related concept:** TD target; semi-gradient; TD–MC contrast
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q261"></a>
### Q261 — `C1-M4` · correct

In reinforcement learning, what does a stochastic policy do?

- **A.** Selects actions randomly with equal probability
- **B.** Selects the same action for a given state every time
- **C.** Selects actions based on a probability distribution
- **D.** Does not select any action

**Supplied answer:** C. Selects actions based on a probability distribution
**Learning verdict:** correct
**Why:** Option C (Selects actions based on a probability distribution) matches the local lecture evidence. Selects actions from a state-dependent probability distribution.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 6–8
**Related concept:** Stochastic policy
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q262"></a>
### Q262 — `C1-M5` · correct

What does the term "greedification" refer to in the context of policy improvement?

- **A.** Making a policy more random
- **B.** Selecting actions that maximize the value function
- **C.** Evaluating the performance of a policy
- **D.** Following the original policy without changes

**Supplied answer:** B. Selecting actions that maximize the value function
**Learning verdict:** correct
**Why:** Option B (Selecting actions that maximize the value function) matches the local lecture evidence. Select action maximizing the current value-based expression.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 3, 9, 13
**Related concept:** Greedification
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q263"></a>
### Q263 — `OUT` · bank-key-only

In an experiment, a pigeon is trained to peck a key when it sees a red light but not when it sees a green light. This is an example of:

- **A.** Generalization
- **B.** Spontaneous recovery
- **C.** Discrimination
- **D.** Habituation

**Supplied answer:** C. Discrimination
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (Discrimination) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** In an experiment, a pigeon is trained to peck a key when it sees a red light but not when it sees a green light. This is an example of:
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q264"></a>
### Q264 — `C3-M2` · acceptable-with-caveat

How many components does the feature vector have when there are four features and three actions in a stacked representation?

- **A.** 4
- **B.** 7
- **C.** 12
- **D.** 16

**Supplied answer:** C. 12
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (12). Q229 has multiple plausible methods
**Primary lecture:** [3.6 Episodic Sarsa with Function Approximation.pptx](#lecture-3-6), slides 3–18
**Related concept:** action-dependent features; approximate control targets
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q265"></a>
### Q265 — `C1-M5` · correct

In policy iteration, what is the role of the policy evaluation step?

- **A.** To improve the policy based on current estimates of the value function
- **B.** To randomly update the policy
- **C.** To compute the value function of the current policy
- **D.** To explore different policies without updating them

**Supplied answer:** C. To compute the value function of the current policy
**Learning verdict:** correct
**Why:** Option C (To compute the value function of the current policy) matches the local lecture evidence. Compute value function for the current policy.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9, 11–13
**Related concept:** Evaluation’s role in policy iteration
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q266"></a>
### Q266 — `C2-M4` · correct

Which of the following exploration strategies is commonly used with SARSA?

- **A.** Softmax action selection
- **B.** Upper Confidence Bound (UCB)
- **C.** Epsilon-greedy
- **D.** Boltzmann exploration

**Supplied answer:** C. Epsilon-greedy
**Learning verdict:** correct
**Why:** Option C (Epsilon-greedy) matches the local lecture evidence. The deck presents epsilon-greedy as the example current policy.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 8–10
**Related concept:** Epsilon-greedy action selection with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q267"></a>
### Q267 — `C2-M5` · acceptable-with-caveat

Which type of reinforcement learning model typically uses Monte Carlo simulations to estimate values?

- **A.** Sample-based models
- **B.** Distribution models
- **C.** Both sample-based and distribution models
- **D.** Neither sample-based nor distribution models

**Supplied answer:** A. Sample-based models
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence does not uniquely resolve the supplied key. Monte Carlo value estimation is sample-based, but a sample model is a distinct model-based planning concept; the stem conflates the two meanings. Reference answer: A under the broad meaning 'sample-based estimation'; caveat that Monte Carlo learning need not use a sample model.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 5, §5.1; Ch. 8, §8.1, printed pp. 92, 159, 160
**Reference explanation:** Monte Carlo value estimation is sample-based, but a sample model is a distinct model-based planning concept; the stem conflates the two meanings.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 8–9, 12
**Related concept:** Sample model versus MC simulation

[Back to question navigation](#question-navigation)

---

<a id="q268"></a>
### Q268 — `C1-M5` · correct

In Policy Iteration, which step involves evaluating the current policy's performance and updating the value function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** A. Policy Evaluation
**Learning verdict:** correct
**Why:** Option A (Policy Evaluation) matches the local lecture evidence. High-similarity pair with Q189.
**Primary lecture:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9, 11–13
**Related concept:** Policy-evaluation phase
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q269"></a>
### Q269 — `C2-M5` · acceptable-with-caveat

Which of the following is a primary characteristic of a distribution model in reinforcement learning?

- **A.** It directly samples actions based on a policy.
- **B.** It approximates the transition dynamics of the environment.
- **C.** It only updates after the entire episode ends.
- **D.** It requires a deterministic policy.

**Supplied answer:** B. It approximates the transition dynamics of the environment.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It approximates the transition dynamics of the environment.). The primary characteristic is explicit probability over possible next-state/reward outcomes.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 10–16
**Related concept:** Distribution model represents probabilities over outcomes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q270"></a>
### Q270 — `OUT` · bank-key-only

Which term describes a methodical approach to handling episodic tasks?

- **A.** Ad hoc management
- **B.** Reactive management
- **C.** Proactive management
- **D.** Time-blocking

**Supplied answer:** D. Time-blocking
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer D (Time-blocking) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** habit and episodic-task learning
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q271"></a>
### Q271 — `C1-M3` · acceptable-with-caveat

Which term describes the probability distribution over next states given a current state and action in an MDP?

- **A.** Policy
- **B.** Reward function
- **C.** Transition model
- **D.** Value function

**Supplied answer:** C. Transition model
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Transition model). \(p(s',r\mid s,a)\) is the joint next-state/reward distribution.
**Primary lecture:** [1.4 Introduction to Markov Decision Processes  .pptx](#lecture-1-4), slides 12–13
**Related concept:** Transition dynamics/model
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q272"></a>
### Q272 — `C2-M2` · acceptable-with-caveat

What is the purpose of the accumulated product of important sampling ratios (W) in the off-policy Monte Carlo prediction algorithm?

- **A.** To store all past values of Rho
- **B.** To correct the returns generated by the behavior policy
- **C.** To calculate the average reward
- **D.** To simplify the algorithm

**Supplied answer:** B. To correct the returns generated by the behavior policy
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (To correct the returns generated by the behavior policy). Slides show a one-sample ratio, not the full sequential product \(W\); the mapping is conceptually coherent but the exact algorithm is not displayed.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 11–13
**Related concept:** Accumulated importance weights correct behavior-generated return
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q273"></a>
### Q273 — `C3-M5` · correct

What is the advantage of using policy gradient methods over value-based methods like Q-learning?

- **A.** Better convergence guarantees
- **B.** Simpler implementation
- **C.** More efficient memory usage
- **D.** Ability to handle continuous action spaces

**Supplied answer:** D. Ability to handle continuous action spaces
**Learning verdict:** correct
**Why:** Option D (Ability to handle continuous action spaces) matches the local lecture evidence. Q091/Q177 lack unique universal answers
**Primary lecture:** [3.10 Policy Gradient for Continuing Tasks.pptx](#lecture-3-10), slides 3–11
**Related concept:** continuing objective; policy-gradient theorem
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q274"></a>
### Q274 — `C2-M2` · correct

Which algorithm is commonly used for off-policy learning in reinforcement learning?

- **A.** Q-learning
- **B.** SARSA
- **C.** Deep Q-Network (DQN)
- **D.** Policy Gradient

**Supplied answer:** A. Q-learning
**Learning verdict:** correct
**Why:** Option A (Q-learning) matches the local lecture evidence. “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 3, 8–11
**Related concept:** Q-learning off-policy; contrast with Sarsa
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q275"></a>
### Q275 — `C2-M2` · correct

What is one advantage of Temporal Difference (TD) methods over Dynamic Programming (DP) and Monte Carlo methods?

- **A.** TD methods are guaranteed to converge to the optimal solution.
- **B.** TD methods do not require knowledge of the complete environment dynamics.
- **C.** TD methods are computationally less expensive.
- **D.** TD methods can handle only episodic tasks efficiently.

**Supplied answer:** B. TD methods do not require knowledge of the complete environment dynamics.
**Learning verdict:** correct
**Why:** Option B (TD methods do not require knowledge of the complete environment dynamics.) matches the local lecture evidence. TD is model-free versus DP, but MC is also model-free; the proposed distinction in the first stem is incomplete.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 8, 17
**Related concept:** TD versus DP/MC model requirement
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q276"></a>
### Q276 — `C2-M2` · correct

What type of learning method is Monte Carlo prediction classified as?

- **A.** Supervised learning
- **B.** Unsupervised learning
- **C.** Semi-supervised learning
- **D.** Reinforcement learning

**Supplied answer:** D. Reinforcement learning
**Learning verdict:** correct
**Why:** Option D (Reinforcement learning) matches the local lecture evidence. The broad “reinforcement learning” classification is true but less useful than the sampled-return mechanism.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 3–8
**Related concept:** MC uses random sampled episodes to estimate values/policies
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q277"></a>
### Q277 — `C2-M3` · correct

Which of the following is a characteristic of temporal-difference learning algorithms?

- **A.** They require labeled data for training.
- **B.** They learn from delayed rewards.
- **C.** They are only applicable in stationary environments.
- **D.** They rely solely on a pre-defined set of rules.

**Supplied answer:** B. They learn from delayed rewards.
**Learning verdict:** correct
**Why:** Option B (They learn from delayed rewards.) matches the local lecture evidence. Both stems are overly broad; use the one-step value-estimation mechanism rather than “used for RL” as a definition.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 3–12
**Related concept:** TD as reinforcement learning from rewards/transitions
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q278"></a>
### Q278 — `C2-M2` · correct

Which of the following statements about Monte Carlo methods is true?

- **A.** Monte Carlo methods require knowledge of the environment's model.
- **B.** Monte Carlo methods update action values incrementally during an episode.
- **C.** Monte Carlo methods update action values only at the end of an episode.
- **D.** Monte Carlo methods can only be applied to deterministic environments.

**Supplied answer:** C. Monte Carlo methods update action values only at the end of an episode.
**Learning verdict:** correct
**Why:** Option C (Monte Carlo methods update action values only at the end of an episode.) matches the local lecture evidence. Applies to the MC algorithms taught in this deck; avoid universal claims about every possible MC variant.
**Primary lecture:** [2.1 Introduction to Monte-Carlo Methods .pptx](#lecture-2-1), slides 7–9
**Related concept:** Episodic sequence and update after termination
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q279"></a>
### Q279 — `C2-M2` · acceptable-with-caveat

Why is maintaining exploration important in Monte Carlo methods?

- **A.** To ensure rapid convergence
- **B.** To prevent the algorithm from getting stuck in local optima
- **C.** To reduce memory usage
- **D.** To increase the speed of computation

**Supplied answer:** B. To prevent the algorithm from getting stuck in local optima
**Learning verdict:** acceptable-with-caveat
**Why:** Exploration provides sufficient state–action coverage; 'avoid local optima' is imprecise here.
**Primary lecture:** [2.2 Monte-Carlo for Control.pptx](#lecture-2-2), slides 6–9
**Related concept:** Maintaining MC exploration for state–action coverage
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q280"></a>
### Q280 — `C2-M4` · correct

Which of the following statements is true regarding the update rule of Expected Sarsa?

- **A.** It only updates based on the greedy action
- **B.** It updates based on a weighted sum of Q-values for all possible actions
- **C.** It requires the entire model of the environment
- **D.** It updates based on the worst possible action

**Supplied answer:** B. It updates based on a weighted sum of Q-values for all possible actions
**Learning verdict:** correct
**Why:** Option B (It updates based on a weighted sum of Q-values for all possible actions) matches the local lecture evidence. “Weighted sum” matches the displayed equation.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 5, 8, 12–13
**Related concept:** Expected Sarsa's probability-weighted next-action value
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q281"></a>
### Q281 — `C2-M5` · acceptable-with-caveat

What is the primary objective of Random Tabular Q-planning in reinforcement learning?

- **A.** To find the shortest path in a graph
- **B.** To estimate the value function for a policy
- **C.** To optimize the policy for better future rewards
- **D.** To model the environment dynamics

**Supplied answer:** C. To optimize the policy for better future rewards
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (To optimize the policy for better future rewards). Q means action value; random planning provides update coverage, not real-environment exploration; the planning update still requires a model.
**Primary lecture:** [2.11 Define Planning in Reinforcement Learning.pptx](#lecture-2-11), slides 4–7
**Related concept:** Random-sample one-step tabular Q-planning
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q282"></a>
### Q282 — `C2-M2` · correct

What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?

- **A.** TD methods require complete episodes for updating values.
- **B.** TD methods update values based on incomplete episodes.
- **C.** TD methods cannot handle incomplete episodes efficiently.
- **D.** TD methods do not rely on experiences for learning.

**Supplied answer:** B. TD methods update values based on incomplete episodes.
**Learning verdict:** correct
**Why:** Option B (TD methods update values based on incomplete episodes.) matches the local lecture evidence. Exact duplicate family.
**Primary lecture:** [2.6 Advantages of Temporal Difference.pptx](#lecture-2-6), slides 3, 6, 12, 16
**Related concept:** TD can update from incomplete episodes
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q283"></a>
### Q283 — `C2-M4` · acceptable-with-caveat

How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?

- **A.** By using a fixed learning rate.
- **B.** By averaging over all possible actions.
- **C.** By always selecting the action with the highest Q-value.
- **D.** By ignoring the reward signal.

**Supplied answer:** B. By averaging over all possible actions.
**Learning verdict:** acceptable-with-caveat
**Why:** Averaging next-action values smooths the sampled target in the lecture comparison, but it is not a universal variance guarantee against Q-learning.
**Primary lecture:** [2.9 Expected Sarsa.pptx](#lecture-2-9), slides 3, 8–9, 12–15
**Related concept:** Smoother/stabler expected updates
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q284"></a>
### Q284 — `OUT` · correct

How can overfitting be addressed in machine learning models?

- **A.** By reducing the complexity of the model
- **B.** By increasing the complexity of the model
- **C.** By ignoring the validation data
- **D.** By introducing more noise into the training data

**Supplied answer:** A. By reducing the complexity of the model
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. The book lists regularization, cross-validation, dropout, and reduced degrees of freedom as ways to control overfitting; reducing effective model complexity is valid. Reference answer: A — reduce effective model complexity.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 9, §9.7 Nonlinear Function Approximation, printed pp. 225, 226
**Reference explanation:** The book lists regularization, cross-validation, dropout, and reduced degrees of freedom as ways to control overfitting; reducing effective model complexity is valid.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Related concept:** overfitting

[Back to question navigation](#question-navigation)

---

<a id="q285"></a>
### Q285 — `C2-M4` · correct

In the SARSA algorithm, what role does the learning rate (\alpha) play?

- **A.** It determines how much new information overrides the old information.
- **B.** It sets the probability of taking a random action.
- **C.** It defines the discount factor for future rewards.
- **D.** It specifies the exploration-exploitation trade-off.

**Supplied answer:** A. It determines how much new information overrides the old information.
**Learning verdict:** correct
**Why:** Option A (It determines how much new information overrides the old information.) matches the local lecture evidence. Slides say \(\alpha\) controls update size; the non-convergence/fluctuation statement is not quantified.
**Primary lecture:** [2.7 Temporal Difference for Control.pptx](#lecture-2-7), slides 9–10
**Related concept:** Learning rate in Sarsa
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q286"></a>
### Q286 — `C2-M4` · correct

In Q-learning, what role does the learning rate (\alpha) play in the update rule?

- **A.** It determines how much the current Q-value is updated.
- **B.** It determines how often the policy is changed.
- **C.** It sets the exploration rate.
- **D.** It sets the discount factor for future rewards.

**Supplied answer:** A. It determines how much the current Q-value is updated.
**Learning verdict:** correct
**Why:** Option A (It determines how much the current Q-value is updated.) matches the local lecture evidence. The bank symbols are corrupted; the visual equation makes \(\alpha\)'s role explicit.
**Primary lecture:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](#lecture-2-8), slides 10, 16
**Related concept:** Q-learning learning rate \(\alpha\)
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q287"></a>
### Q287 — `C2-M5` · acceptable-with-caveat

What is one of the main challenges when using distribution models in reinforcement learning?

- **A.** High variance in action selection.
- **B.** The need for large amounts of interaction data.
- **C.** Difficulty in accurately modeling the environment's dynamics.
- **D.** Slow convergence to the optimal policy.

**Supplied answer:** C. Difficulty in accurately modeling the environment's dynamics.
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Difficulty in accurately modeling the environment's dynamics.). Distribution models may be large/difficult; inaccurate models can harm planning.
**Primary lecture:** [2.10 Define model in Reinforcement Learning.pptx](#lecture-2-10), slides 11–13
**Related concept:** Difficulty accurately representing environment dynamics
**Mapping confidence:** B

[Back to question navigation](#question-navigation)

---

<a id="q288"></a>
### Q288 — `C2-M2` · correct

Which of the following is an advantage of off-policy learning?

- **A.** It requires less computational resources
- **B.** It guarantees convergence to the optimal policy
- **C.** It allows learning from non-optimal behavior
- **D.** It eliminates the need for exploration entirely

**Supplied answer:** C. It allows learning from non-optimal behavior
**Learning verdict:** correct
**Why:** Option C (It allows learning from non-optimal behavior) matches the local lecture evidence. Slide 4's random-target example wording is inconsistent; use the stable definitions on slides 3 and 5–10.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 3, 5–10
**Related concept:** Behavior versus target policy; learning from different/historical behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q289"></a>
### Q289 — `C2-M3` · acceptable-with-caveat

What does the "difference" in temporal-difference learning refer to?

- **A.** The difference between rewards and penalties
- **B.** The difference between observed and predicted values
- **C.** The difference between input and output data
- **D.** The difference between model parameters

**Supplied answer:** B. The difference between observed and predicted values
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (The difference between observed and predicted values). “Observed return” on slides 4/6 is loose wording; the displayed TD(0) target is one-step reward plus next estimate.
**Primary lecture:** [2.5 Introduction to Temporal Difference Learning.pptx](#lecture-2-5), slides 4–9
**Related concept:** TD error and state-value update
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q290"></a>
### Q290 — `C2-M2` · correct

Which technique in reinforcement learning allows learning from historical data while following a different policy?

- **A.** On-policy learning
- **B.** Off-policy learning
- **C.** Model-based learning
- **D.** Temporal Difference learning

**Supplied answer:** B. Off-policy learning
**Learning verdict:** correct
**Why:** Option B (Off-policy learning) matches the local lecture evidence. Slide 4's random-target example wording is inconsistent; use the stable definitions on slides 3 and 5–10.
**Primary lecture:** [2.4 Off-policy learning for prediction.pptx](#lecture-2-4), slides 3, 5–10
**Related concept:** Behavior versus target policy; learning from different/historical behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q291"></a>
### Q291 — `C3-M2` · correct

What does state aggregation involve in reinforcement learning?

- **A.** Combining similar states into groups to reduce the dimensionality of the state space.
- **B.** Separating dissimilar states to increase the granularity of the state space.
- **C.** Ignoring certain states in the environment to simplify the learning process.
- **D.** Converting continuous state spaces into discrete state spaces.

**Supplied answer:** A. Combining similar states into groups to reduce the dimensionality of the state space.
**Learning verdict:** correct
**Why:** Option A (Combining similar states into groups to reduce the dimensionality of the state space.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q292"></a>
### Q292 — `C3-M3` · correct

Which of the following is a characteristic of states represented by coarse coding?

- **A.** Each state is represented by a unique, non-overlapping feature
- **B.** States are represented by overlapping features, allowing for generalization
- **C.** States are ignored and only actions are considered
- **D.** Each state is treated as a separate entity with no generalization

**Supplied answer:** B. States are represented by overlapping features, allowing for generalization
**Learning verdict:** correct
**Why:** Option B (States are represented by overlapping features, allowing for generalization) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q293"></a>
### Q293 — `C3-M3` · correct

What is a primary challenge when setting up Tile Coding?

- **A.** Ensuring non-overlapping tiles
- **B.** Selecting the number and size of tiles
- **C.** Finding the right discount factor
- **D.** Balancing exploration and exploitation

**Supplied answer:** B. Selecting the number and size of tiles
**Learning verdict:** correct
**Why:** Option B (Selecting the number and size of tiles) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q294"></a>
### Q294 — `C3-M5` · correct

Which of the following methods is NOT typically used to learn the parameters of a Gaussian policy?

- **A.** Maximum likelihood estimation
- **B.** Policy gradient methods
- **C.** Q-Learning
- **D.** Actor-Critic methods

**Supplied answer:** C. Q-Learning
**Learning verdict:** correct
**Why:** Sutton–Barto evidence supports the supplied key. Gaussian policy parameters are directly updated by policy-gradient methods and can be used in actor–critic; Q-learning is not the policy-parameter learning method presented. Reference answer: C — Q-learning.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 13, §13.7 Policy Parameterization for Continuous Actions, printed pp. 335, 336
**Reference explanation:** Gaussian policy parameters are directly updated by policy-gradient methods and can be used in actor–critic; Q-learning is not the policy-parameter learning method presented.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [3.12 Policy Parameterizations.pptx](#lecture-3-12), slides 3–13
**Related concept:** softmax actor; Gaussian policy

[Back to question navigation](#question-navigation)

---

<a id="q295"></a>
### Q295 — `C3-M2` · acceptable-with-caveat

When using Epsilon-greedy with function approximation, what role does the function approximator play?

- **A.** It generates the random exploration rate
- **B.** It approximates the Q-values for given states and actions
- **C.** It determines when to switch between exploration and exploitation
- **D.** It sets the value of epsilon

**Supplied answer:** B. It approximates the Q-values for given states and actions
**Learning verdict:** acceptable-with-caveat
**Why:** The approximator supplies the action-value estimates used by epsilon-greedy; it does not itself perform exploration.
**Primary lecture:** [3.7 Exploration under Function Approximation.pptx](#lecture-3-7), slides 3–10
**Related concept:** optimism and epsilon-greedy with approximation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q296"></a>
### Q296 — `C3-M2` · correct

What is a parameterized function in the context of reinforcement learning?

- **A.** A function that takes no inputs and outputs a constant value.
- **B.** A function that uses parameters (weights) to approximate another function.
- **C.** A function that always returns the same value regardless of inputs.
- **D.** A function that randomly changes its parameters during training.

**Supplied answer:** B. A function that uses parameters (weights) to approximate another function.
**Learning verdict:** correct
**Why:** Option B (A function that uses parameters (weights) to approximate another function.) matches the local lecture evidence. Q104/Q255 are not universally true without feature assumptions
**Primary lecture:** [3.1 Estimating Value Functions as Supervised Learning .pptx](#lecture-3-1), slides 3–12, 18–22
**Related concept:** parameterized/linear values; generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q297"></a>
### Q297 — `C3-M2` · acceptable-with-caveat

What role does the discount factor play in Semi-Gradient TD learning?

- **A.** It determines the rate of eligibility trace decay
- **B.** It controls the influence of future rewards on the updates
- **C.** It sets the exploration-exploitation trade-off
- **D.** It adjusts the learning rate dynamically during training

**Supplied answer:** B. It controls the influence of future rewards on the updates
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is B (It controls the influence of future rewards on the updates). The item checks linear semi-gradient TD.
**Primary lecture:** [3.3 The Objective for Temporal Difference.pptx](#lecture-3-3), slides 3–16
**Related concept:** TD target; semi-gradient; TD–MC contrast
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q298"></a>
### Q298 — `C3-M4` · correct

What is the significance of the average reward in reinforcement learning?

- **A.** It indicates the maximum achievable reward in an environment
- **B.** It helps in evaluating the performance of a learning agent over time
- **C.** It represents the instantaneous reward received at each time step
- **D.** It measures the variance in reward distribution

**Supplied answer:** B. It helps in evaluating the performance of a learning agent over time
**Learning verdict:** correct
**Why:** Option B (It helps in evaluating the performance of a learning agent over time) matches the local lecture evidence. Q019/Q047 have no unique supplied option
**Primary lecture:** [3.8 Understand Average Reward.pptx](#lecture-3-8), slides 3–20
**Related concept:** average reward; differential values
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q299"></a>
### Q299 — `C3-M3` · correct

In coarse coding, what is the effect of having overlapping regions?

- **A.** It increases the complexity of the representation
- **B.** It reduces the chance of generalization across similar states
- **C.** It allows for better generalization and smoother function approximation
- **D.** It eliminates the need for exploration in reinforcement learning

**Supplied answer:** C. It allows for better generalization and smoother function approximation
**Learning verdict:** correct
**Why:** Option C (It allows for better generalization and smoother function approximation) matches the local lecture evidence. Q048 is defective, Q014 uses misleading “clustering”
**Primary lecture:** [3.5 Feature Construction for Linear Methods.pptx](#lecture-3-5), slides 3–21
**Related concept:** coarse/tile coding and generalization
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q300"></a>
### Q300 — `C3-M2` · correct

In which type of environments is state aggregation particularly useful?

- **A.** Environments with a very small state space.
- **B.** Environments with deterministic transitions.
- **C.** Environments with a very large or continuous state space.
- **D.** Environments with no reward structure.

**Supplied answer:** C. Environments with a very large or continuous state space.
**Learning verdict:** correct
**Why:** Option C (Environments with a very large or continuous state space.) matches the local lecture evidence. interpret \(\mu\) as state weighting
**Primary lecture:** [3.2 The Objective for On-policy Prediction .pptx](#lecture-3-2), slides 3–8, 15–20
**Related concept:** MSVE; gradient descent; state weighting/aggregation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q301"></a>
### Q301 — `C3-M5` · acceptable-with-caveat

How are the actor and critic networks updated in Actor-Critic with Softmax Policies?

- **A.** Only the actor network is updated
- **B.** Only the critic network is updated
- **C.** Both the actor and critic networks are updated simultaneously
- **D.** The networks are updated independently

**Supplied answer:** C. Both the actor and critic networks are updated simultaneously
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is C (Both the actor and critic networks are updated simultaneously). Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q302"></a>
### Q302 — `C3-M5` · correct

What role does the critic play in Actor-Critic with Softmax Policies?

- **A.** It learns the policy function
- **B.** It calculates the probability distribution over actions
- **C.** It evaluates the quality of the policy chosen by the actor
- **D.** It determines the exploration rate

**Supplied answer:** C. It evaluates the quality of the policy chosen by the actor
**Learning verdict:** correct
**Why:** Option C (It evaluates the quality of the policy chosen by the actor) matches the local lecture evidence. Q226’s claimed universal advantage is unsafe
**Primary lecture:** [3.11 Actor-Critic for Continuing Tasks.pptx](#lecture-3-11), slides 3–11
**Related concept:** sampled gradient; baseline; actor–critic roles
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q303"></a>
### Q303 — `C1-M3` · acceptable-with-caveat

Which of the following is NOT a method for solving MDPs?

- **A.** Dynamic Programming
- **B.** Monte Carlo Methods
- **C.** Temporal Difference Learning
- **D.** Stochastic Gradient Descent

**Supplied answer:** D. Stochastic Gradient Descent
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. DP, Monte Carlo, and TD are solution/learning method families for MDPs, whereas stochastic gradient descent is an optimizer used inside some approximate methods. Reference answer: D at the intended algorithm-family level.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Chs. 4–6 and Ch. 9, §9.3, printed pp. 73, 74, 91, 92, 119, 200
**Reference explanation:** DP, Monte Carlo, and TD are solution/learning method families for MDPs, whereas stochastic gradient descent is an optimizer used inside some approximate methods.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.12 Generalized Policy Iteration.pptx](#lecture-1-12), slides 6–13
**Related concept:** SGD as an MDP-solving method

[Back to question navigation](#question-navigation)

---

<a id="q304"></a>
### Q304 — `C1-M5` · bank-key-only

How does the flexibility of the Policy Iteration Framework contribute to robustness?

- **A.** By limiting the diversity of policies explored
- **B.** By allowing for rapid convergence to a single optimal policy
- **C.** By enabling adaptation to varying conditions or goals
- **D.** None of the above

**Supplied answer:** C. By enabling adaptation to varying conditions or goals
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer C (By enabling adaptation to varying conditions or goals) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** Policy-iteration robustness
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)
**Closest lecture context:** [1.11 Policy Iteration (Control) .pptx](#lecture-1-11), slides 9–16

[Back to question navigation](#question-navigation)

---

<a id="q305"></a>
### Q305 — `C1-M2` · correct

In the context of the multi-armed bandit problem, what does the term "exploitation" refer to?

- **A.** Trying out different arms to gather information
- **B.** Using the known information to select the best arm
- **C.** Ignoring the past rewards and trying new strategies
- **D.** Allocating equal time to all arms

**Supplied answer:** B. Using the known information to select the best arm
**Learning verdict:** correct
**Why:** Option B (Using the known information to select the best arm) matches the local lecture evidence. Choose the best arm according to current knowledge.
**Primary lecture:** [1.1. The K-Armed Bandit Problem.pptx](#lecture-1-1), slides 6
**Related concept:** Exploitation in a bandit
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q306"></a>
### Q306 — `C1-M5` · acceptable-with-caveat

What happens if the value function of a policy converges during Iterative Policy Evaluation?

- **A.** The optimal policy is achieved
- **B.** The value function becomes infinite
- **C.** The policy becomes deterministic
- **D.** The policy evaluation process stops

**Supplied answer:** D. The policy evaluation process stops
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is D (The policy evaluation process stops). Stop when value changes fall below the tolerance; does not imply policy optimality.
**Primary lecture:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 11, 21–28
**Related concept:** Evaluation convergence/stopping
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q307"></a>
### Q307 — `OUT` · bank-key-only

How does hyperbolic discounting differ from exponential discounting?

- **A.** Hyperbolic discounting values future rewards more than exponential discounting.
- **B.** Exponential discounting values future rewards more than hyperbolic discounting.
- **C.** Both discount future rewards equally.
- **D.** Hyperbolic discounting is not related to time preference.

**Supplied answer:** A. Hyperbolic discounting values future rewards more than exponential discounting.
**Learning verdict:** bank-key-only
**Why:** This item is canonical because it appeared in tests. Learn the supplied test-bank answer A (Hyperbolic discounting values future rewards more than exponential discounting.) for exam recall, but do not treat it as reference-verified: no answer-enabling passage was found in the local slides, Sutton–Barto book, or official public Coursera pages.
**Canonical source:** supplied question bank — this item appeared in tests
**Reference support:** no answer-enabling passage in the local slides, Sutton–Barto book, or official public Coursera pages
**Related concept:** hyperbolic discounting
**Evidence confidence:** BANK (exam-canonical, not lecture-verified)

[Back to question navigation](#question-navigation)

---

<a id="q308"></a>
### Q308 — `C1-M3` · correct

Which task type typically requires sustained effort over time?

- **A.** Episodic tasks.
- **B.** Continuing tasks.
- **C.** Both episodic and continuing tasks.
- **D.** Neither episodic nor continuing tasks.

**Supplied answer:** B. Continuing tasks.
**Learning verdict:** correct
**Why:** Option B (Continuing tasks.) matches the local lecture evidence. Continuing task when effort persists with no defined endpoint.
**Primary lecture:** [1.6 Continuing Tasks.pptx](#lecture-1-6), slides 3–5
**Related concept:** Sustained task type
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q309"></a>
### Q309 — `C1-M4` · correct

What does the action value Q(s,a) represent in reinforcement learning?

- **A.** The probability of transitioning to state s from state a
- **B.** The expected return (total future reward) of taking action a in state s
- **C.** The immediate reward received after taking action a
- **D.** The average time it takes to transition from state s to state a

**Supplied answer:** B. The expected return (total future reward) of taking action a in state s
**Learning verdict:** correct
**Why:** Option B (The expected return (total future reward) of taking action a in state s) matches the local lecture evidence. Expected return after state \(s\), first action \(a\), then policy.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 11
**Related concept:** Meaning of \(Q(s,a)\)
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q310"></a>
### Q310 — `C1-M4` · correct

Which notation is commonly used to represent the action-value function?

- **A.** V(s)
- **B.** R(s, a)
- **C.** Q(s, a)
- **D.** P(a|s)

**Supplied answer:** C. Q(s, a)
**Learning verdict:** correct
**Why:** Option C (Q(s, a)) matches the local lecture evidence. \(Q(s,a)\) is explicit.
**Primary lecture:** [1.7 Policies and Value Functions.pptx](#lecture-1-7), slides 11
**Related concept:** Action-value notation
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q311"></a>
### Q311 — `C1-M5` · incorrect

In Policy Evaluation, what is the objective function typically used?

- **A.** Bellman Equation
- **B.** Logistic Regression
- **C.** Cost Function
- **D.** Gradient Descent

**Supplied answer:** A. Bellman Equation
**Learning verdict:** incorrect
**Correct answer:** No listed objective is precise; policy evaluation computes v_pi, commonly as the fixed point of the Bellman expectation equation.
**Why:** Sutton–Barto evidence contradicts the supplied key. Policy evaluation seeks the value function satisfying the Bellman equation and uses it as an update/consistency relation; the equation is not an objective function. Reference answer: No listed objective is precise; policy evaluation computes v_pi, commonly as the fixed point of the Bellman expectation equation.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 4, §4.1 Policy Evaluation, printed pp. 74, 75
**Reference explanation:** Policy evaluation seeks the value function satisfying the Bellman equation and uses it as an update/consistency relation; the equation is not an objective function.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.10 Policy Evaluation (Prediction).pptx](#lecture-1-10), slides 5, 8–11, 21
**Related concept:** “Objective function” in evaluation

[Back to question navigation](#question-navigation)

---

<a id="q312"></a>
### Q312 — `C1-M3` · acceptable-with-caveat

In what way do rewards contribute to the goal-oriented behavior of an agent?

- **A.** By encouraging trial and error
- **B.** By increasing randomness
- **C.** By decreasing motivation
- **D.** By providing feedback on progress

**Supplied answer:** D. By providing feedback on progress
**Learning verdict:** acceptable-with-caveat
**Why:** The intended option is D (By providing feedback on progress). Reward supplies feedback that guides behavior toward greater future reward.
**Primary lecture:** [1.5 Goal of Reinforcement Learning .pptx](#lecture-1-5), slides 4, 8–12
**Related concept:** Reward and goal-directed behavior
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q313"></a>
### Q313 — `C1-M4` · incorrect

In reinforcement learning, what is the Bellman equation used for?

- **A.** Calculating the optimal value function
- **B.** Estimating the value of actions
- **C.** Updating the policy
- **D.** Computing the expected reward

**Supplied answer:** A. Calculating the optimal value function
**Learning verdict:** incorrect
**Correct answer:** The supplied key is contradicted by the local lecture correction below.
**Why:** Bellman equations cover policy values and optimal values; they do not only 'calculate the optimal value function.'
**Primary lecture:** [1.8 Bellman Equations.pptx](#lecture-1-8), slides 4–7
**Related concept:** Scope of Bellman equations
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q314"></a>
### Q314 — `C1-M2` · acceptable-with-caveat

Which method involves selecting actions based on their probability distribution determined by their estimated value functions?

- **A.** Epsilon-Greedy
- **B.** Upper Confidence Bound (UCB)
- **C.** Softmax
- **D.** Monte Carlo Tree Search

**Supplied answer:** C. Softmax
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. Softmax selects actions from a probability distribution derived from learned action preferences, though the book distinguishes preferences from value estimates. Reference answer: C — softmax, with the caveat that its inputs may be preferences rather than estimated value functions.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.8 Gradient Bandit Algorithms, printed pp. 37
**Reference explanation:** Softmax selects actions from a probability distribution derived from learned action preferences, though the book distinguishes preferences from value estimates.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 1–20
**Related concept:** Softmax action selection

[Back to question navigation](#question-navigation)

---

<a id="q315"></a>
### Q315 — `C1-M2` · acceptable-with-caveat

Which exploration strategy selects actions according to a probability distribution that balances the known rewards with the potential for discovering new rewards?

- **A.** Softmax Action Selection
- **B.** Epsilon-Greedy
- **C.** Upper Confidence Bound (UCB)
- **D.** Temporal Difference Learning

**Supplied answer:** A. Softmax Action Selection
**Learning verdict:** acceptable-with-caveat
**Why:** Sutton–Barto evidence supports the supplied key. Softmax action selection assigns every action a probability based on its learned preference and thereby provides graded exploration rather than a single greedy choice. Reference answer: A — softmax action selection.
**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An Introduction*](1-Reinforcement Learning-An introduction.pdf), Ch. 2, §2.8 Gradient Bandit Algorithms, printed pp. 37
**Reference explanation:** Softmax action selection assigns every action a probability based on its learned preference and thereby provides graded exploration rather than a single greedy choice.
**Evidence tier:** book-supported (high confidence), distinct from local-slide support
**Closest lecture context:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 1–20
**Related concept:** Softmax exploration

[Back to question navigation](#question-navigation)

---

<a id="q316"></a>
### Q316 — `C1-M2` · correct

What is the "exploration-exploitation trade-off" in reinforcement learning?

- **A.** The decision between using known information versus gathering new information
- **B.** The choice between high reward and low risk
- **C.** The balance between reward and punishment
- **D.** The selection between multiple reward mechanisms

**Supplied answer:** A. The decision between using known information versus gathering new information
**Learning verdict:** correct
**Why:** Option A (The decision between using known information versus gathering new information) matches the local lecture evidence. Use current knowledge versus gather new information.
**Primary lecture:** [1.3 Exploration vs. Exploitation Tradeoff.pptx](#lecture-1-3), slides 5–15
**Related concept:** Exploration–exploitation trade-off
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

<a id="q317"></a>
### Q317 — `C1-M3` · correct

In reinforcement learning, what is an agent?

- **A.** A human supervisor
- **B.** A software program
- **C.** An entity that interacts with the environment
- **D.** A mathematical equation

**Supplied answer:** C. An entity that interacts with the environment
**Learning verdict:** correct
**Why:** Option C (An entity that interacts with the environment) matches the local lecture evidence. Learner/decision-maker interacting with environment.
**Primary lecture:** [1.4 Introduction to Markov Decision Processes  .pptx](#lecture-1-4), slides 9–11
**Related concept:** Agent definition
**Mapping confidence:** A

[Back to question navigation](#question-navigation)

---

---

## Coverage and unresolved-source notes

- 317/317 original records are canonical exam material and included once, in order.
- 225 questions use answer-bearing local slide evidence; 54 use page-level Sutton–Barto evidence; 0 use official public Coursera evidence; and 38 remain bank-key-only.
- Questions promoted by the reference pass retain their closest lecture context when one exists and are visibly marked as book- rather than slide-supported.
- 39/39 local decks represented; 713 slides counted across the 37 `.pptx` decks.
- Legacy `.ppt` slide counts remain unavailable; their course-plan/review text is used only for framing.
- Defective supplied keys may still resemble grading keys. This guide preserves them while teaching the strongest reference-grounded verdict available.
