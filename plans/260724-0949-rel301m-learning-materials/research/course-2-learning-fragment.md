# Course 2 — Sample-Based Learning, Control, Models, and Planning

## Source boundary and coverage

This fragment teaches the 110 questions tagged `C2-M2`–`C2-M5` in the audited
[question index](../../../docs/final-exam-revision-question-index.md). The 13 Course 2 decks are
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

**Source:** [2.1 Introduction to Monte-Carlo Methods .pptx](<../../../docs/slides/slides/2.1 Introduction to Monte-Carlo Methods .pptx>),
especially slides 3–12 and 15–21.  
**Mapped questions:** Q073, Q146, Q158, Q160, Q166, Q172, Q180, Q188, Q259, Q276, Q278.  
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

**Source:** [2.2 Monte-Carlo for Control.pptx](<../../../docs/slides/slides/2.2 Monte-Carlo for Control.pptx>),
especially slides 3–13 and 17–20.  
**Mapped questions:** Q224, Q279.  
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

**Source:** [2.3 Exploration Methods for Monte-Carlo.pptx](<../../../docs/slides/slides/2.3 Exploration Methods for Monte-Carlo.pptx>),
especially slides 3–11.  
**Mapped question:** Q171.  
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

**Source:** [2.4 Off-policy learning for prediction.pptx](<../../../docs/slides/slides/2.4 Off-policy learning for prediction.pptx>),
especially slides 3, 5–17.  
**Mapped questions:** Q001, Q017, Q028, Q081, Q110, Q115, Q246, Q272, Q288, Q290.  
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

**Source:** [2.5 Introduction to Temporal Difference Learning.pptx](<../../../docs/slides/slides/2.5 Introduction to Temporal Difference Learning.pptx>),
especially slides 3–12.  
**Mapped questions:** Q054, Q105, Q140, Q184, Q187, Q230, Q233, Q242, Q256, Q277, Q289.  
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

**Source:** [2.6 Advantages of Temporal Difference.pptx](<../../../docs/slides/slides/2.6 Advantages of Temporal Difference.pptx>),
especially slides 3–6, 8, and 11–17.  
**Mapped questions:** Q022, Q027, Q032, Q051, Q118, Q133, Q182, Q231, Q247, Q254, Q275, Q282.  
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

**Source:** [2.7 Temporal Difference for Control.pptx](<../../../docs/slides/slides/2.7 Temporal Difference for Control.pptx>),
especially slides 3–10.  
**Mapped questions:** Q059, Q126, Q195, Q199, Q213, Q221, Q228, Q266, Q285.  
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

**Source:** [2.8 Off-policy Temporal Difference Control Q-learning .pptx](<../../../docs/slides/slides/2.8 Off-policy Temporal Difference Control Q-learning .pptx>),
especially slides 3–16.  
**Mapped questions:** Q023, Q044, Q049, Q050, Q071, Q169, Q181, Q183, Q196, Q197, Q198, Q205, Q210, Q219, Q236, Q274, Q286.  
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

**Source:** [2.9 Expected Sarsa.pptx](<../../../docs/slides/slides/2.9 Expected Sarsa.pptx>),
especially slides 3, 5–15.  
**Mapped questions:** Q058, Q074, Q077, Q086, Q108, Q116, Q150, Q200, Q215, Q237, Q244, Q252, Q280, Q283.  
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

**Source:** [2.10 Define model in Reinforcement Learning.pptx](<../../../docs/slides/slides/2.10 Define model in Reinforcement Learning.pptx>),
especially slides 3–16 and 18–21.  
**Mapped questions:** Q013, Q151, Q152, Q176, Q227, Q232, Q234, Q267, Q269, Q287.  
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

**Source:** [2.11 Define Planning in Reinforcement Learning.pptx](<../../../docs/slides/slides/2.11 Define Planning in Reinforcement Learning.pptx>),
especially slides 4–11.  
**Mapped questions:** Q072, Q119, Q122, Q165, Q185, Q243, Q281.  
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

**Source:** [2.12 Dyna as a formalism for planning.pptx](<../../../docs/slides/slides/2.12 Dyna as a formalism for planning.pptx>),
especially slides 3–7, 11–20, and the visual Tabular Dyna-Q algorithm on slide 15.  
**Mapped questions:** Q002, Q012, Q109, Q145, Q257.  
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

**Source:** [2.13 Dealing with inaccurate models .pptx](<../../../docs/slides/slides/2.13 Dealing with inaccurate models .pptx>),
especially slides 3–14 and 19.  
**Mapped question:** Q113.  
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
