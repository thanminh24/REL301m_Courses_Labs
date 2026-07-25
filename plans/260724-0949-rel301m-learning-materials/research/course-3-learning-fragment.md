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

**Demand:** high · **Depth:** D3 · **Mapped questions:** Q008, Q076, Q098, Q104, Q223, Q255,
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

**Demand:** high · **Depth:** D3 · **Mapped questions:** Q024, Q034, Q079, Q130, Q143, Q153,
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

**Demand:** medium · **Depth:** D3 · **Mapped questions:** Q131, Q260, Q297.  
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

**Demand:** medium · **Depth:** D2 · **Mapped questions:** Q220, Q249.  
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

**Demand:** high · **Depth:** D3 · **Mapped questions:** Q010, Q014, Q021, Q048, Q062, Q084,
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

**Demand:** low but prerequisite-linked · **Depth:** D2 · **Mapped questions:** Q229, Q264.  
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

**Demand:** medium · **Depth:** D2 · **Mapped questions:** Q137, Q258, Q295.  
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

**Demand:** high/risky · **Depth:** D3 · **Mapped questions:** Q003, Q019, Q047, Q063, Q298.  
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

**Demand:** high · **Depth:** D3 · **Mapped questions:** Q067, Q093, Q103, Q114, Q120, Q155,
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

**Demand:** high · **Depth:** D3 · **Mapped questions:** Q030, Q057, Q075, Q087, Q091, Q135,
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

**Demand:** very high/risky · **Depth:** D3 · **Mapped questions:** Q016, Q029, Q055, Q066,
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

**Demand:** very high · **Depth:** D3 · **Mapped questions:** Q067, Q103, Q114, Q168, Q201,
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
