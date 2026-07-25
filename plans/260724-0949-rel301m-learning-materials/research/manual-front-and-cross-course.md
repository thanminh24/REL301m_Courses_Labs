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
