# REL301m Final Examination Revision Question Index

> Generated: 2026-07-23T23:04+07:00  
> Source: user-supplied 317-question bank (local attachment path intentionally omitted)  
> Coverage: **317 questions** (Q001–Q317)

## How to use this file

- Search `Q042`, a topic token such as `Dyna`, or a scope tag such as `C2-M5`.
- `usable`: clean recall check. `review`: useful but simplified/ambiguous. `verify`: material defect noted. `discard`: corrupted or outside the named curriculum.
- “Course match” means **topic alignment**, not proof that the wording was copied from Coursera. No public evidence establishes verbatim provenance.
- Use the [complete learning guide](rel301m-complete-learning-guide.md) as the canonical
  question-first study route. All 317 records appeared in tests and are therefore canonical
  exam material. The final evidence pass uses 225 answer-bearing slide mappings, 54 page-level
  Sutton–Barto mappings, 0 direct official-public-Coursera mappings, and leaves 38 visibly
  bank-key-only; limited evidence is a warning, never a reason to exclude a question.
- This index preserves the earlier source-quality audit (`usable`, `review`, `verify`,
  `discard`). Those labels are not final answerability verdicts; defer to the canonical guide.
  Likewise, legacy `OUT` labels mean “not mapped to the named slide modules,” not “non-canonical.”
- The [active-recall workbook](final-exam-active-recall-workbook.md) is an optional deeper
  supplement. Its calculations and algorithm traces go beyond the supplied bank and do not
  establish an exam requirement.

## Canon and evidence ledger

All Q001–Q317 are canonical because they appeared in tests. Canonical status records exam
occurrence; evidence tier records how strongly the available course references explain or
correct an item.

| Primary evidence tier | Questions | Meaning |
|---|---:|---|
| Local lecture slides | 225 | an answer-bearing slide passage is mapped |
| Sutton–Barto reference book | 54 | a page-level passage fills a slide gap; marked book-supported in the guide |
| Official public Coursera pages | 0 | public descriptions confirm course alignment but do not uniquely answer a remaining item |
| Supplied test-bank key only | 38 | retain the supplied answer for exam recall; do not present it as reference-verified |
| **Total canonical** | **317** | no tested question is excluded |

Only publicly visible official Coursera course descriptions and module or lesson titles were
inspected. No login, paywall, gated lesson, video, transcript, quiz, or assignment content was
accessed or crawled. Every guide entry exposes its actual support status; public topic adjacency
is not counted as direct evidence.

## Provenance verdict

The bank strongly mirrors the University of Alberta specialization's Courses 1–3. It does **not** look like a clean export of official quizzes: wording quality varies, distractors are often weak, many stems are duplicated, symbols are corrupted, and several questions confuse RL terms with education/time-management or unrelated domains.

| Candidate source | Evidence-based fit | What this bank covers | Verdict |
|---|---|---|---|
| [Fundamentals of Reinforcement Learning](https://www.coursera.org/learn/fundamentals-of-reinforcement-learning) | High | bandits, MDPs, values, Bellman equations, dynamic programming | strong topic match |
| [Sample-based Learning Methods](https://www.coursera.org/learn/sample-based-learning-methods) | Very high | Monte Carlo, TD, Sarsa, Q-learning, Expected Sarsa, Dyna | strongest match |
| [Prediction and Control with Function Approximation](https://www.coursera.org/learn/prediction-control-function-approximation) | Very high | state aggregation, coarse/tile coding, average reward, policy gradient, actor–critic | strongest match |
| [A Complete Reinforcement Learning System (Capstone)](https://www.coursera.org/learn/complete-reinforcement-learning-system) | Low as a unique source | prerequisite concepts recur, but environment implementation, algorithm selection, tuning, and empirical study are barely tested | inherited overlap only |
| [Create a Tic-Tac-Toe game in Python](https://www.coursera.org/projects/tic-tac-toe-game-python) | None | no Python/Pygame board, input, win-condition, or game-loop questions | not represented |

### Question-construction depth

- Mostly Bloom **L1 recall** and **L2 concept recognition**: identify definitions, roles, or one-step distinctions.
- A smaller L2–L3 slice asks about update targets, gradients, or feature-vector size.
- 284/317 stems (89.6%) begin with “What,” “Which,” or “In”; only Q264 requires even trivial arithmetic.
- Key imbalance: A 60, B 124, C 108, D 25; B/C comprise 73.2%, so answer-position guessing contaminates practice.
- No return calculation, multi-step Bellman backup, TD update, importance ratio, policy probability, pseudocode trace, debugging, experimental design, or capstone synthesis.
- Optional extension: after using this bank for terminology screening, practise equations and
  algorithm traces separately if you want deeper mastery. The bank itself does not require
  code or pseudocode tracing.

### Highest-value practice subset

- **Best single item:** Q233 (core TD idea: sampled transition plus bootstrapped target).
- **Foundations/MDPs:** Q020, Q036, Q068, Q090, Q106, Q129, Q138, Q141, Q167, Q271, Q309, Q317.
- **Bandits/exploration:** Q006, Q095, Q132, Q157, Q208, Q305, Q314, Q316.
- **MC/off-policy:** Q001, Q017, Q027, Q073, Q081, Q110, Q160, Q166, Q180–Q181, Q192, Q272, Q288, Q290.
- **TD/control:** Q023, Q044, Q050, Q059, Q077, Q108, Q126, Q140, Q150, Q195, Q199–Q200, Q213, Q219, Q221, Q233, Q237, Q244, Q247.
- **Approximation/policy gradient:** Q008, Q034, Q062, Q098, Q121, Q123, Q131, Q135, Q137, Q168, Q170, Q173, Q201, Q203, Q223, Q249, Q251, Q260, Q264, Q291–Q300.
- **Planning/actor–critic:** Q012, Q055, Q071–Q072, Q165, Q185, Q227, Q232, Q302.

### Likely construction pipeline (inference, not proven provenance)

1. Course/video keywords were collected: unusually specific phrases such as “Random Tabular Q-planning,” “sample and distribution models,” “MSVE,” and “Actor-Critic with Softmax Policies” closely track Courses 2–3.
2. Definition templates generated most stems (`What is…`, `Which…`, `In the context of…`) and one obviously correct distractor was inserted, usually at B or C.
3. Generic web/LLM material leaked through keyword collisions: Monte Carlo became MCTS or numerical simulation; Temporal Difference became flexible e-learning; exploration became interstellar travel.
4. Copy/OCR damage then corrupted symbols and spacing: gamma appears as `y`/`1`, epsilon as `€`/`¢`, pi as `n`, plus truncation around Q101, Q117–Q118, Q133, Q137, Q146, Q151, Q156, Q188–Q190, Q231.
5. Questions were shuffled and concatenated; numbering format changes at Q274. Exact and near-duplicate groups support compilation from repeated batches.

## Coverage dashboard

| Tag | Curriculum area | Questions |
|---|---|---:|
| `C1-M2` | Course 1 · Sequential decision-making / bandits | 20 |
| `C1-M3` | Course 1 · MDPs, rewards, episodic vs continuing | 20 |
| `C1-M4` | Course 1 · Policies, values, Bellman equations | 23 |
| `C1-M5` | Course 1 · Dynamic programming and GPI | 18 |
| `C2-M2` | Course 2 · Monte Carlo, off-policy, importance sampling | 29 |
| `C2-M3` | Course 2 · TD prediction | 19 |
| `C2-M4` | Course 2 · Sarsa, Q-learning, Expected Sarsa | 39 |
| `C2-M5` | Course 2 · Models, planning, Dyna | 23 |
| `C3-M2` | Course 3 · Prediction with function approximation | 30 |
| `C3-M3` | Course 3 · Coarse/tile coding and neural features | 11 |
| `C3-M4` | Course 3 · Control with approximation / average reward | 6 |
| `C3-M5` | Course 3 · Policy gradient and actor–critic | 36 |
| `C4` | Course 4 · Capstone integration / empirical validation | 2 |
| `OUT` | Outside, corrupted, or only adjacent to named curricula | 41 |

| Quality | Count |
|---|---:|
| `usable` | 140 |
| `review` | 89 |
| `verify` | 47 |
| `discard` | 41 |

These are legacy source-audit labels, not inclusion decisions. In particular, every `OUT` and
`discard` record remains part of the 317-question canonical exam route.

## 90-minute lecture refresh

### 0–12 min — bandits and exploration

- Action value: \(q_*(a)=\mathbb{E}[R_t\mid A_t=a]\). Incremental estimate: \(Q_{n+1}=Q_n+\alpha(R_n-Q_n)\).
- \(\varepsilon\)-greedy explores uniformly with probability \(\varepsilon\); UCB adds uncertainty; optimistic initialization encourages early exploration but needs stationary-style updating assumptions.
- Slides: [1.1. The K-Armed Bandit Problem.pptx](<slides/slides/1.1. The K-Armed Bandit Problem.pptx>); [1.3 Exploration vs. Exploitation Tradeoff.pptx](<slides/slides/1.3 Exploration vs. Exploitation Tradeoff.pptx>).

### 12–25 min — MDPs, returns, values, Bellman equations

- MDP tuple: \((\mathcal S,\mathcal A,p,r,\gamma)\). Return: \(G_t=\sum_{k=0}^{\infty}\gamma^kR_{t+k+1}\).
- \(v_\pi(s)=\sum_a\pi(a\mid s)\sum_{s',r}p(s',r\mid s,a)[r+\gamma v_\pi(s')]\).
- Separate reward (immediate scalar feedback), return (accumulated future reward), value (expected return), and policy (action distribution).
- Slides: [1.4 Introduction to Markov Decision Processes  .pptx](<slides/slides/1.4 Introduction to Markov Decision Processes  .pptx>); [1.7 Policies and Value Functions.pptx](<slides/slides/1.7 Policies and Value Functions.pptx>); [1.8 Bellman Equations.pptx](<slides/slides/1.8 Bellman Equations.pptx>).

### 25–35 min — dynamic programming and GPI

- Policy evaluation computes \(v_\pi\); policy improvement acts greedily w.r.t. current values; policy iteration alternates them. Value iteration folds truncated evaluation and improvement into optimality backups.
- Slides: [1.10 Policy Evaluation (Prediction).pptx](<slides/slides/1.10 Policy Evaluation (Prediction).pptx>); [1.11 Policy Iteration (Control) .pptx](<slides/slides/1.11 Policy Iteration (Control) .pptx>); [1.12 Generalized Policy Iteration.pptx](<slides/slides/1.12 Generalized Policy Iteration.pptx>).

### 35–47 min — Monte Carlo, on/off policy, importance sampling

- MC waits for sampled returns; first/every-visit variants average \(G_t\). Off-policy separates behavior \(b\) from target \(\pi\).
- Per-decision ratio: \(\rho_t=\pi(A_t\mid S_t)/b(A_t\mid S_t)\). Support is mandatory: \(b(a\mid s)>0\) wherever \(\pi(a\mid s)>0\).
- Slides: [2.1 Introduction to Monte-Carlo Methods .pptx](<slides/slides/2.1 Introduction to Monte-Carlo Methods .pptx>); [2.4 Off-policy learning for prediction.pptx](<slides/slides/2.4 Off-policy learning for prediction.pptx>).

### 47–60 min — TD prediction and control

- TD(0): \(V(S_t)\leftarrow V(S_t)+\alpha[R_{t+1}+\gamma V(S_{t+1})-V(S_t)]\).
- Sarsa target: \(R+\gamma Q(S',A')\). Q-learning target: \(R+\gamma\max_a Q(S',a)\). Expected Sarsa target: \(R+\gamma\sum_a\pi(a\mid S')Q(S',a)\).
- Sarsa is on-policy; Q-learning is off-policy; Expected Sarsa may be either depending on the expectation policy.
- Slides: [2.5 Introduction to Temporal Difference Learning.pptx](<slides/slides/2.5 Introduction to Temporal Difference Learning.pptx>); [2.7 Temporal Difference for Control.pptx](<slides/slides/2.7 Temporal Difference for Control.pptx>); [2.8 Off-policy Temporal Difference Control Q-learning .pptx](<slides/slides/2.8 Off-policy Temporal Difference Control Q-learning .pptx>); [2.9 Expected Sarsa.pptx](<slides/slides/2.9 Expected Sarsa.pptx>).

### 60–68 min — models, planning, and Dyna

- Direct RL updates from real transitions. Model learning stores/predicts transitions. Planning applies the same update rule to simulated transitions. Dyna interleaves all three. Dyna-Q+ adds an exploration bonus such as \(\kappa\sqrt{\tau(s,a)}\) for long-untried actions.
- Slides: [2.10 Define model in Reinforcement Learning.pptx](<slides/slides/2.10 Define model in Reinforcement Learning.pptx>); [2.12 Dyna as a formalism for planning.pptx](<slides/slides/2.12 Dyna as a formalism for planning.pptx>); [2.13 Dealing with inaccurate models .pptx](<slides/slides/2.13 Dealing with inaccurate models .pptx>).

### 68–80 min — function approximation

- Linear value estimate: \(\hat v(s,\mathbf w)=\mathbf w^\top\mathbf x(s)\); gradient is \(\mathbf x(s)\). Semi-gradient TD: \(\mathbf w\leftarrow\mathbf w+\alpha\delta_t\mathbf x(S_t)\).
- State aggregation trades detail for sharing. Coarse coding uses overlapping receptive fields; tile coding uses multiple offset tilings for sparse local generalization.
- Slides: [3.1 Estimating Value Functions as Supervised Learning .pptx](<slides/slides/3.1 Estimating Value Functions as Supervised Learning .pptx>); [3.4 Linear Temporal Difference.pptx](<slides/slides/3.4 Linear Temporal Difference.pptx>); [3.5 Feature Construction for Linear Methods.pptx](<slides/slides/3.5 Feature Construction for Linear Methods.pptx>).

### 80–90 min — average reward, policy gradient, actor–critic

- Continuing control can optimize average reward \(\bar R\) and differential returns instead of discounted episodic return.
- Policy-gradient theorem gives an ascent direction proportional to \(\mathbb E[\nabla_\theta\log\pi_\theta(A\mid S)\,q_\pi(S,A)]\). A baseline reduces variance without changing the expected gradient.
- Actor updates policy parameters; critic estimates value/advantage and supplies the learning signal.
- Slides: [3.8 Understand Average Reward.pptx](<slides/slides/3.8 Understand Average Reward.pptx>); [3.9 Learning Parameterized Policies.pptx](<slides/slides/3.9 Learning Parameterized Policies.pptx>); [3.10 Policy Gradient for Continuing Tasks.pptx](<slides/slides/3.10 Policy Gradient for Continuing Tasks.pptx>); [3.11 Actor-Critic for Continuing Tasks.pptx](<slides/slides/3.11 Actor-Critic for Continuing Tasks.pptx>); [3.12 Policy Parameterizations.pptx](<slides/slides/3.12 Policy Parameterizations.pptx>).

### Capstone and Tic-Tac-Toe gap check

- Capstone questions should test end-to-end MDP formulation, algorithm choice, representation/parameter choice, implementation, robustness, and empirical comparison. This bank mostly re-asks prerequisite definitions; Q037 (experience replay) and Q038 (validation) are the clearest capstone-adjacent items.
- Local capstone practice: [Course4ProgrammingAssignment2-v4.ipynb](<../Assignment 1/Week 5/Course4ProgrammingAssignment2-v4.ipynb>). Review action-value neural networks, replay, softmax Expected Sarsa, optimizer behavior, and experiment design.
- The named Tic-Tac-Toe project transfers Python/game-loop skills, not the RL equations above. If examined, separately review board representation, legal actions, alternating turns, win/draw terminals, reset logic, and evaluation.

## Material answer defects and watchlist

| Question | Why supplied item needs correction or caution |
|---|---|
| [Q002](#q002) | Dyna's course-level benefit is sample efficiency by combining real and simulated experience; supplied options omit it. |
| [Q005](#q005) | Regularization does not generally correct biased predictions; the bias source must be diagnosed. No option is generally valid. |
| [Q010](#q010) | Tile coding's key benefit is generalization with bounded sparse features; “memory efficiency” depends on the comparison/setup. |
| [Q014](#q014) | Coarse coding uses overlapping receptive fields; calling it clustering is misleading. |
| [Q015](#q015) | Classical policy iteration assumes a stationary MDP; changed dynamics/goals require new evaluation or an adaptive model. |
| [Q019](#q019) | Differential value functions need expectations and Bellman-style algebra; no single listed branch of mathematics is a sound answer. |
| [Q028](#q028) | Proposal complexity alone does not reduce variance; closeness/support relative to the target matters. |
| [Q030](#q030) | The policy gradient is \(\nabla_\theta J(\theta)\): change in expected performance with respect to policy parameters. |
| [Q032](#q032) | TD's defining advantage is online bootstrapping without a model or complete episode, not simply lower compute. |
| [Q035](#q035) | No listed RL algorithm is generically most prone to overfitting; capacity, data, features, and evaluation determine risk. |
| [Q041](#q041) | Control aims to find a policy maximizing expected return; exploration–exploitation is a means, not the objective. |
| [Q042](#q042) | Sample gradient estimation is used across many fields, so computer graphics is not a unique valid answer. |
| [Q047](#q047) | Average-reward methods include differential TD/control variants; “TD learning” alone is too broad. |
| [Q048](#q048) | Backpropagation is widely used inside deep RL; it is an optimization mechanism, not an RL control algorithm. |
| [Q051](#q051) | TD(0)'s defining advantage over MC is bootstrapping before episode termination; lower complexity is not universally primary. |
| [Q056](#q056) | Gradually reinforcing successive approximations is shaping; that intended term is absent. |
| [Q063](#q063) | Sparse reward makes finite-sample estimates difficult, but does not make the average-reward objective invalid. |
| [Q064](#q064) | Optimistic estimates decay through repeated updates; decaying exploration does not directly remove optimism. |
| [Q074](#q074) | Expected Sarsa can be more expensive in large action spaces because it sums over actions; the premise is questionable. |
| [Q078](#q078) | Epsilon-soft means each action has probability at least \(\varepsilon/|\mathcal A(s)|\); the options do not test it. |
| [Q080](#q080) | DP complexity depends on state/action counts, horizon, model structure, and algorithm; the unqualified key is unsupported. |
| [Q091](#q091) | Step size, noise, discounting, exploration, and regularization can all affect policy-gradient stability. |
| [Q094](#q094) | MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\). |
| [Q101](#q101) | MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\). |
| [Q104](#q104) | Linear approximation can underfit with inadequate features, but underfitting is not inherent. |
| [Q109](#q109) | Dyna integrates direct RL, a learned model, planning, and acting; none of the options states this. |
| [Q115](#q115) | Importance sampling can increase variance; it is variance reduction only with a well-chosen proposal/estimator. |
| [Q119](#q119) | Q is action-value notation; ask what \(Q(s,a)\) represents rather than what the letter 'stands for.' |
| [Q122](#q122) | Random planning updates sample previously observed state–action pairs; this is planning coverage, not environment exploration. |
| [Q145](#q145) | Dyna integrates learning, planning, and acting; it is not primarily a category of transition model. |
| [Q151](#q151) | Distribution models provide expectations/distributions; whether they are more sample-efficient depends on model accuracy and use. |
| [Q152](#q152) | No universal sample-efficiency ordering exists: sample models are easier to obtain; distribution models contain richer information. |
| [Q161](#q161) | Smaller finite-difference h lowers truncation error only until roundoff or sampling noise dominates. |
| [Q171](#q171) | Boltzmann exploration's standard weakness is sensitivity to temperature and action-value scale. |
| [Q174](#q174) | A reward value does not automatically decrease because it is behavior-independent; this confuses reward and reinforcer effectiveness. |
| [Q177](#q177) | Finite samples mainly add variance, and an action-independent baseline preserves the expected gradient; no unique NOT answer exists. |
| [Q188](#q188) | First-visit and every-visit MC both average returns; they differ in which within-episode visits are counted. |
| [Q202](#q202) | The optimal value is maximum expected return, \(v_*(s)=\max_\pi\mathbb E_\pi[G_t\mid S_t=s]\), not a single maximum reward. |
| [Q212](#q212) | A directly parameterized policy maps states to action probabilities/actions without greedy selection from a value function. |
| [Q224](#q224) | Both Monte Carlo and TD estimate model-free action values, so the item has two valid answers. |
| [Q226](#q226) | Actor–critic may lower variance and learn online, but it is not universally faster or more stable. |
| [Q229](#q229) | Multiple methods combine linear approximation and improvement, including semi-gradient Sarsa and actor–critic variants. |
| [Q230](#q230) | TD(0) estimates a policy value with one-step bootstrapped targets; it is not generally gradient descent on squared TD error. |
| [Q234](#q234) | A distribution model represents \(p(s',r\mid s,a)\); particle filtering is a different belief-approximation issue. |
| [Q246](#q246) | Importance sampling is not automatically variance reducing; ordinary off-policy importance sampling may have very high variance. |
| [Q248](#q248) | A Bellman equation expresses a recursive value relationship; an algorithm may use it to update estimates. |
| [Q252](#q252) | Off-policy means behavior and target policies differ; it does not mean learning from actions the agent did not take. |
| [Q255](#q255) | Linear approximation may underfit, but this is not an inherent single 'problem' without assumptions about features. |
| [Q256](#q256) | TD(0) observes a transition, forms \(\delta=R+\gamma V(S')-V(S)\), and updates \(V(S)\); the listed steps are ill-defined. |
| [Q257](#q257) | Dyna integrates learning, planning, and acting; none of the supplied options states that purpose. |
| [Q267](#q267) | Monte Carlo value estimation is sample-based learning; a 'sample model' is a separate model-based planning concept. |
| [Q279](#q279) | Exploration provides sufficient state–action coverage; 'avoid local optima' is imprecise here. |
| [Q303](#q303) | SGD is an optimizer used inside RL, so 'not a method for solving MDPs' depends on the intended level of abstraction. |
| [Q307](#q307) | Hyperbolic discounting is steeper near the present and shallower at long delays; neither curve is always larger. |
| [Q311](#q311) | The Bellman equation is a consistency equation, not an objective function. |
| [Q313](#q313) | Bellman equations cover policy values and optimal values; they do not only 'calculate the optimal value function.' |

## Duplicate pressure

Exact normalized duplicate groups: Q032/Q231, Q045/Q248/Q253, Q104/Q255, Q105/Q242, Q109/Q257, Q117/Q156, Q137/Q295, Q150/Q283, Q254/Q282.

High-similarity pairs (review once, not twice): Q070/Q103, Q094/Q101, Q189/Q268.

## Master scan index

| Q | Course/module | Topic | Quality | Stem |
|---:|---|---|---|---|
| [Q001](#q001) | `C2-M2` | Monte Carlo / off-policy | `usable` | What role does the target policy play in off-policy learning? |
| [Q002](#q002) | `C2-M5` | models and planning | `verify` | Which of the following is a key benefit of using Dyna Architecture? |
| [Q003](#q003) | `C3-M4` | average-reward control | `review` | How is the average reward calculated in reinforcement learning? |
| [Q004](#q004) | `OUT` | out-of-scope / corrupted | `discard` | Which aspect of Temporal Difference makes it suitable for individuals with busy schedules? |
| [Q005](#q005) | `OUT` | out-of-scope / corrupted | `discard` | Which of the following is a technique for improving the accuracy of models with biased predictions? |
| [Q006](#q006) | `C1-M2` | exploration / bandits | `usable` | Which of the following best describes the exploration strategy known as epsilon-greedy? |
| [Q007](#q007) | `OUT` | out-of-scope / corrupted | `discard` | How can Monte-Carlo Tree Search algorithms be modified to favor exploration in uncertain or less explored regions? |
| [Q008](#q008) | `C3-M2` | prediction with approximation | `usable` | What is the main purpose of using linear function approximation in reinforcement learning? |
| [Q009](#q009) | `OUT` | out-of-scope / corrupted | `discard` | What role does the unpredictability of interstellar environments play in star exploration? |
| [Q010](#q010) | `C3-M3` | feature construction | `verify` | What advantage does Tile Coding provide compared to a single large lookup table? |
| [Q011](#q011) | `C1-M4` | policies, values, Bellman equations | `review` | Which algorithm is commonly used to solve MDPs by iteratively estimating the value function? |
| [Q012](#q012) | `C2-M5` | models and planning | `usable` | What is the primary difference between Dyna-Q and Q-learning? |
| [Q013](#q013) | `C2-M5` | models and planning | `usable` | Which of the following describes 'model-free' reinforcement learning methods? |
| [Q014](#q014) | `C3-M3` | feature construction | `verify` | Coarse coding can be seen as a form of which of the following in the context of state aggregation? |
| [Q015](#q015) | `C1-M5` | dynamic programming / GPI | `verify` | How does the Policy Iteration Framework handle changing environments or goals? |
| [Q016](#q016) | `C3-M5` | policy gradient / actor–critic | `usable` | In Actor-Critic, what does the "Actor" component represent? |
| [Q017](#q017) | `C2-M2` | Monte Carlo / off-policy | `usable` | Off-policy learning is particularly useful in which scenario? |
| [Q018](#q018) | `C1-M2` | exploration / bandits | `usable` | In the context of Monte-Carlo algorithms, what is meant by "exploration-exploitation trade-off"? |
| [Q019](#q019) | `C3-M4` | average-reward control | `verify` | Which mathematical concept is essential for understanding differential value functions? |
| [Q020](#q020) | `C1-M2` | exploration / bandits | `usable` | In the context of the k-armed bandit problem, what is meant by "exploitation"? |
| [Q021](#q021) | `C3-M3` | feature construction | `usable` | How does coarse coding handle the trade-off between bias and variance? |
| [Q022](#q022) | `C2-M3` | TD prediction | `review` | Which characteristic distinguishes Temporal Difference(TD) methods from Dynamic Programming and Monte Carlo methods? |
| [Q023](#q023) | `C2-M4` | TD control | `usable` | What does it mean for Q-learning to be off-policy? |
| [Q024](#q024) | `C3-M2` | prediction with approximation | `usable` | Which of the following is a disadvantage of using state aggregation? |
| [Q025](#q025) | `C1-M3` | MDP formulation | `usable` | Which of the following best describes a reward signal in reinforcement learning? |
| [Q026](#q026) | `OUT` | out-of-scope / corrupted | `discard` | What is discrimination in the context of learning and behavior? |
| [Q027](#q027) | `C2-M3` | TD versus Monte Carlo | `usable` | What distinguishes Monte Carlo methods from Temporal-Difference (TD) methods? |
| [Q028](#q028) | `C2-M2` | Monte Carlo / off-policy | `verify` | What is the effect of using a more complex proposal distribution in importance sampling? |
| [Q029](#q029) | `C3-M5` | policy gradient / actor–critic | `usable` | Which of the following statements is true about the Actor-Critic algorithm? |
| [Q030](#q030) | `C3-M5` | policy gradient / actor–critic | `verify` | In the policy gradient theorem, what does the policy gradient represent? |
| [Q031](#q031) | `C1-M4` | policies, values, Bellman equations | `review` | In the Bellman equation, what does V(s) represent? |
| [Q032](#q032) | `C2-M3` | TD prediction | `verify` | What is the main advantage of temporal-difference learning over other reinforcement learning methods? |
| [Q033](#q033) | `OUT` | out-of-scope / corrupted | `discard` | What is a common method for ensuring adequate exploration in the initial stages of a Monte-Carlo Tree Search? |
| [Q034](#q034) | `C3-M2` | prediction with approximation | `review` | What does the MSVE objective aim to minimize in the context of policy evaluation? |
| [Q035](#q035) | `OUT` | out-of-scope / corrupted | `discard` | Which of the following algorithms is more prone to overfitting in reinforcement learning? |
| [Q036](#q036) | `C1-M3` | MDP formulation | `usable` | What is the primary goal of reinforcement learning? |
| [Q037](#q037) | `C4` | experience replay review | `review` | In the context of Deep Q-Networks (DQN), what does the term "experience replay" refer to? |
| [Q038](#q038) | `C4` | empirical validation | `review` | What is one strategy for detecting inaccuracies in predictive models? |
| [Q039](#q039) | `OUT` | out-of-scope / corrupted | `discard` | What does a Monte Carlo simulation typically produce? |
| [Q040](#q040) | `C1-M5` | dynamic programming / GPI | `usable` | What does the term "iterative" signify in Iterative Policy Evaluation? |
| [Q041](#q041) | `C1-M5` | control objective | `verify` | What is the primary objective of policy control in reinforcement learning? |
| [Q042](#q042) | `OUT` | out-of-scope / corrupted | `discard` | In which field of study is the estimation of gradients using samples commonly applied? |
| [Q043](#q043) | `OUT` | out-of-scope / corrupted | `discard` | Which factor makes Temporal Difference particularly suitable for self-directed learners? |
| [Q044](#q044) | `C2-M4` | TD control | `review` | What differentiates off-policy Q-learning from on-policy methods like SARSA? |
| [Q045](#q045) | `C1-M4` | policies, values, Bellman equations | `usable` | What is the Bellman equation used for in the context of MDPs? |
| [Q046](#q046) | `C1-M4` | policies, values, Bellman equations | `review` | What is the significance of the Bellman optimality equation in reinforcement learning? |
| [Q047](#q047) | `C3-M4` | average-reward control | `verify` | Which algorithm is commonly used to estimate the average reward in reinforcement learning? |
| [Q048](#q048) | `C3-M3` | neural-network tooling | `verify` | Which of the following algorithms is NOT typically used in reinforcement learning? |
| [Q049](#q049) | `C2-M4` | TD control | `review` | In Q-learning, which term is used to update the Q-value for state s and action a? |
| [Q050](#q050) | `C2-M4` | TD control | `usable` | In Q-learning, how is the action value updated for a given state-action pair? |
| [Q051](#q051) | `C2-M3` | TD versus Monte Carlo | `verify` | In the context of Temporal Difference (TD), What is the primary advantage of TD(0) over Monte Carlo methods? |
| [Q052](#q052) | `C1-M3` | MDP formulation | `usable` | Which of the following is an example of a continuing task? |
| [Q053](#q053) | `C1-M2` | exploration / bandits | `review` | Which of the following techniques uses a decreasing probability of random actions over time to balance exploration and exploitation? |
| [Q054](#q054) | `C2-M3` | TD prediction | `review` | In the context of Temporal Difference (TD), Which factor influences the trade-off between exploration and exploitation in TD(0)? |
| [Q055](#q055) | `C3-M5` | policy gradient / actor–critic | `usable` | Which of the following is true about the actor-critic method in reinforcement learning? |
| [Q056](#q056) | `OUT` | out-of-scope / corrupted | `discard` | Which term describes the process of gradually shaping behavior through the use of rewards? |
| [Q057](#q057) | `C3-M5` | policy gradient / actor–critic | `usable` | What is the primary objective of policy gradient algorithms in reinforcement learning? |
| [Q058](#q058) | `C2-M4` | TD control | `usable` | What is one common exploration strategy used in conjunction with Expected Sarsa? |
| [Q059](#q059) | `C2-M4` | TD control | `usable` | In Sarsa, the Q-value update rule uses which of the following to update the current state-action pair? |
| [Q060](#q060) | `OUT` | out-of-scope / corrupted | `discard` | Which of the following is NOT a benefit of learning with Temporal Difference? |
| [Q061](#q061) | `C1-M4` | policies, values, Bellman equations | `review` | What role does the discount factor y play in the state value function? |
| [Q062](#q062) | `C3-M3` | feature construction | `usable` | How does coarse coding help in handling large state spaces in reinforcement learning? |
| [Q063](#q063) | `C3-M4` | average-reward control | `verify` | When might the average reward fail as a performance metric in reinforcement learning? |
| [Q064](#q064) | `C1-M2` | exploration / bandits | `verify` | What is a common technique to reduce the impact of overly optimistic initial values over time? |
| [Q065](#q065) | `C1-M3` | MDP formulation | `usable` | What is the purpose of the discount factor (gamma, y) in reinforcement learning? |
| [Q066](#q066) | `C3-M5` | policy gradient / actor–critic | `review` | Which of the following is NOT a variation of policy gradient methods? |
| [Q067](#q067) | `C3-M5` | softmax policy parameterization | `usable` | What is Softmax policy parameterization primarily used for in reinforcement learning? |
| [Q068](#q068) | `C1-M4` | policy definition | `usable` | What does the term "policy" refer to in the context of reinforcement learning? |
| [Q069](#q069) | `C1-M3` | reward design | `review` | Why might shaping rewards be necessary in reinforcement learning? |
| [Q070](#q070) | `C1-M2` | exploration / bandits | `review` | In reinforcement learning, what does the temperature parameter represent? |
| [Q071](#q071) | `C2-M4` | TD control | `usable` | What does the Bellman equation for Q-learning update represent? |
| [Q072](#q072) | `C2-M5` | models and planning | `usable` | Which method involves using a model to simulate the environment for planning in reinforcement learning? |
| [Q073](#q073) | `C2-M2` | Monte Carlo / off-policy | `usable` | Which of the following best describes Monte Carlo methods in the context of reinforcement learning? |
| [Q074](#q074) | `C2-M4` | TD control | `verify` | Why might Expected Sarsa be preferred in environments with large action spaces? |
| [Q075](#q075) | `C3-M5` | policy gradient / actor–critic | `review` | In policy improvement, what does the policy gradient represent? |
| [Q076](#q076) | `C3-M2` | prediction with approximation | `usable` | Why is generalization important in reinforcement learning? |
| [Q077](#q077) | `C2-M4` | TD control | `usable` | What is the primary difference between Sarsa and Expected Sarsa in reinforcement learning? |
| [Q078](#q078) | `C1-M2` | exploration / bandits | `verify` | Which of the following is NOT a characteristic of Epsilon-soft policies? |
| [Q079](#q079) | `C3-M2` | prediction with approximation | `review` | What is a common issue when using the mean-squared value error for large state spaces? |
| [Q080](#q080) | `C1-M5` | dynamic programming / GPI | `verify` | Which of the following best describes the time complexity of dynamic programming algorithms? |
| [Q081](#q081) | `C2-M2` | Monte Carlo / off-policy | `review` | In importance sampling, what does the proposal distribution refer to? |
| [Q082](#q082) | `C1-M3` | MDP formulation | `review` | How does the discount rate affect intertemporal choices in continuing tasks? |
| [Q083](#q083) | `OUT` | out-of-scope / corrupted | `discard` | What advantage does Temporal Difference offer in terms of accessibility? |
| [Q084](#q084) | `C3-M3` | feature construction | `usable` | What is the impact of the granularity of coarse coding on learning? |
| [Q085](#q085) | `OUT` | out-of-scope / corrupted | `discard` | Which exploration method in Monte Carlo control assigns exploration bonuses based on the number of times an action has been selected? |
| [Q086](#q086) | `C2-M4` | TD control | `review` | In Expected Sarsa, what does the parameter y represent? |
| [Q087](#q087) | `C3-M5` | policy gradient / actor–critic | `usable` | In reinforcement learning, what does the policy gradient method aim to optimize? |
| [Q088](#q088) | `C1-M3` | RL framework | `usable` | Which of the following is NOT a typical component of a reinforcement learning model? |
| [Q089](#q089) | `OUT` | out-of-scope / corrupted | `discard` | Why is it difficult to design technology for star exploration? |
| [Q090](#q090) | `C1-M4` | policies, values, Bellman equations | `usable` | In reinforcement learning, the state value function V(s) represents: |
| [Q091](#q091) | `C3-M5` | policy gradient / actor–critic | `verify` | Which factor influences the stability of policy gradient algorithms during training? |
| [Q092](#q092) | `OUT` | out-of-scope / corrupted | `discard` | How does Temporal Difference enhance engagement compared to traditional learning methods? |
| [Q093](#q093) | `C3-M5` | direct policy approximation | `usable` | Which of the following methods uses parameterized functions to directly approximate the policy in reinforcement learning? |
| [Q094](#q094) | `OUT` | out-of-scope / corrupted | `discard` | In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula typically depend on? |
| [Q095](#q095) | `C1-M2` | exploration / bandits | `review` | What is the main purpose of using a decaying epsilon in the Epsilon-Greedy strategy? |
| [Q096](#q096) | `C1-M2` | exploration / bandits | `usable` | Which method can be used to encourage exploration in reinforcement learning? |
| [Q097](#q097) | `C1-M4` | policies, values, Bellman equations | `usable` | What is a deterministic policy in reinforcement learning? |
| [Q098](#q098) | `C3-M2` | parameterized value function | `usable` | In reinforcement learning, what is the purpose of using a parameterized function to approximate the value function? |
| [Q099](#q099) | `OUT` | out-of-scope / corrupted | `discard` | Which of the following techniques is commonly used to balance exploration and exploitation in Monte-Carlo Tree Search (MCTS)? |
| [Q100](#q100) | `C1-M3` | reward signal | `usable` | In the context of reinforcement learning, what does a negative reward signify? |
| [Q101](#q101) | `OUT` | out-of-scope / corrupted | `discard` | In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula ty depend on? |
| [Q102](#q102) | `OUT` | out-of-scope / corrupted | `discard` | Why is the balance between discrimination and generalization crucial in adaptive learning systems? |
| [Q103](#q103) | `C3-M5` | softmax policy parameterization | `review` | In reinforcement learning, what does the temperature parameter 1 represent? |
| [Q104](#q104) | `C3-M2` | prediction with approximation | `verify` | Which problem arises due to the use of linear function approximation in reinforcement learning? |
| [Q105](#q105) | `C2-M3` | TD prediction | `usable` | Which statement best describes Tabular Temporal Difference (TD) learning? |
| [Q106](#q106) | `C1-M5` | dynamic programming / GPI | `usable` | What is Policy Evaluation in reinforcement learning? |
| [Q107](#q107) | `OUT` | out-of-scope / corrupted | `discard` | How can generalization be reduced in a learning environment? |
| [Q108](#q108) | `C2-M4` | TD control | `usable` | In Expected Sarsa, the expectation is taken over which element? |
| [Q109](#q109) | `C2-M5` | models and planning | `verify` | What is the primary purpose of Dyna Architecture? |
| [Q110](#q110) | `C2-M2` | Monte Carlo / off-policy | `review` | Which factor determines the quality of the estimate in importance sampling? |
| [Q111](#q111) | `OUT` | out-of-scope / corrupted | `discard` | Which aspect of Temporal Difference makes it advantageous for learners? |
| [Q112](#q112) | `OUT` | out-of-scope / corrupted | `discard` | What is the primary objective of reinforcement learning in build mode? |
| [Q113](#q113) | `C2-M5` | model inaccuracies | `review` | Which of the following is NOT a common reason for inaccuracies in models? |
| [Q114](#q114) | `C3-M5` | softmax policy parameterization | `review` | What happens to the softmax temperature parameter as it approaches infinity? |
| [Q115](#q115) | `C2-M2` | Monte Carlo / off-policy | `verify` | Which technique is often used to reduce variance in Monte Carlo simulations? |
| [Q116](#q116) | `C2-M4` | TD control | `usable` | In which type of environment is Expected Sarsa generally more stable than Q-learning? |
| [Q117](#q117) | `OUT` | out-of-scope / corrupted | `discard` | What term describes the phenomenon where people discount future rewards more steeply when the re are closer in time? |
| [Q118](#q118) | `C2-M3` | TD prediction | `review` | Which advantage of Temporal Difference (TD) methods allows them to be applied in online settings wh environment changes over time? |
| [Q119](#q119) | `C2-M5` | models and planning | `verify` | In Random Tabular Q-planning, what does the Q in Q-planning stand for? |
| [Q120](#q120) | `C3-M5` | parameterized policies | `usable` | Which component of a parameterized policy is typically adjusted during training? |
| [Q121](#q121) | `C3-M5` | policy gradient / actor–critic | `review` | In Actor-Critic, what is the purpose of the advantage function? |
| [Q122](#q122) | `C2-M5` | models and planning | `verify` | Why is it beneficial to update Q-values randomly in Random Tabular Q-planning? |
| [Q123](#q123) | `C3-M3` | feature construction | `usable` | Which of the following best describes the primary goal of coarse coding? |
| [Q124](#q124) | `C1-M2` | exploration / bandits | `review` | In Monte-Carlo algorithms, what is the potential downside of too much exploration? |
| [Q125](#q125) | `OUT` | out-of-scope / corrupted | `discard` | Which factor is crucial for effectively managing episodic tasks? |
| [Q126](#q126) | `C2-M4` | TD control | `usable` | Which of the following statements is true about the SARSA algorithm? |
| [Q127](#q127) | `C1-M3` | MDP formulation | `usable` | What is a key characteristic of continuing tasks? |
| [Q128](#q128) | `C1-M4` | policies, values, Bellman equations | `review` | Which of the following best describes the Bellman equation? |
| [Q129](#q129) | `C1-M5` | dynamic programming / GPI | `usable` | What does policy improvement involve? |
| [Q130](#q130) | `C3-M2` | state aggregation | `usable` | What is one approach to aggregating states in continuous state spaces? |
| [Q131](#q131) | `C3-M2` | prediction with approximation | `review` | In the context of Temporal Difference (TD) learning, what is the main advantage of linear semi-gradient over Tabular TD learning? |
| [Q132](#q132) | `C1-M2` | exploration / bandits | `usable` | In the epsilon-greedy policy, what role does the parameter epsilon (€) play in balancing exploration and exploitation? |
| [Q133](#q133) | `C2-M3` | TD versus Monte Carlo | `review` | What distinguishes Monte Carlo methods from Temporal Difference (TD) methods in reinforcement lea |
| [Q134](#q134) | `OUT` | out-of-scope / corrupted | `discard` | Which strategy is NOT typically used to maintain exploration in Monte-Carlo Tree Search? |
| [Q135](#q135) | `C3-M5` | policy gradient / actor–critic | `usable` | In reinforcement learning, what does the policy gradient theorem provide a method for? |
| [Q136](#q136) | `OUT` | out-of-scope / corrupted | `discard` | In Monte Carlo control, which exploration method considers uncertainty by sampling from a posterior distribution of action values? |
| [Q137](#q137) | `C3-M4` | exploration with approximation | `review` | When using Epsilon-greedy with function approximation, what role does the function approximator play |
| [Q138](#q138) | `C1-M3` | MDP formulation | `usable` | What is the goal of an agent in an MDP? |
| [Q139](#q139) | `C1-M4` | policies, values, Bellman equations | `review` | Which technique is commonly used to approximate the optimal value function when the state space is t large to compute it exactly? |
| [Q140](#q140) | `C2-M3` | TD foundations | `review` | What does Temporal Difference (TD) learning combine? |
| [Q141](#q141) | `C1-M4` | policies, values, Bellman equations | `review` | What role does the policy n(a\|s) play in the Bellman equation for the state value function? |
| [Q142](#q142) | `C1-M3` | MDP formulation | `usable` | Which of the following is an example of an episodic task? |
| [Q143](#q143) | `C3-M2` | prediction with approximation | `review` | In the context of parameterized functions, what is gradient descent used for? |
| [Q144](#q144) | `C1-M3` | continuing tasks | `usable` | If you're preparing for an exam by studying a little bit each day, what type of task is this? |
| [Q145](#q145) | `C2-M5` | models and planning | `verify` | Dyna Architecture primarily deals with which type of models? |
| [Q146](#q146) | `C2-M2` | Monte Carlo / off-policy | `review` | Which of the following best describes the law of large numbers as it applies to Monte Carlo simulations |
| [Q147](#q147) | `C1-M5` | dynamic programming / GPI | `review` | In a policy improvement step, how is the state value function used? |
| [Q148](#q148) | `OUT` | out-of-scope / corrupted | `discard` | When a child learns to use a specific greeting for different individuals (e.g., 'Hi' for peers, 'Good morning teachers), this is an example of: |
| [Q149](#q149) | `C1-M2` | exploration / bandits | `usable` | What is the difference between "exploration" and "exploitation" in reinforcement learning? |
| [Q150](#q150) | `C2-M4` | Expected Sarsa | `review` | How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning? |
| [Q151](#q151) | `C2-M5` | models and planning | `verify` | In the context of reinforcement learning, what is a key advantage of distribution models over sample-ba models? |
| [Q152](#q152) | `C2-M5` | models and planning | `verify` | What is the relationship between sample efficiency and sample-based models? |
| [Q153](#q153) | `C3-M2` | prediction with approximation | `usable` | Which method is commonly used in conjunction with state aggregation to estimate the value function? |
| [Q154](#q154) | `OUT` | out-of-scope / corrupted | `discard` | What happens if the eligibility trace decay rate is set too low in Semi-Gradient TD learning? |
| [Q155](#q155) | `C3-M5` | policy gradient / actor–critic | `review` | How does the exploration-exploitation dilemma relate to parameterized policies? |
| [Q156](#q156) | `OUT` | out-of-scope / corrupted | `discard` | What term describes the phenomenon where people discount future rewards more steeply when the re\ are closer in time? |
| [Q157](#q157) | `C1-M2` | exploration / bandits | `usable` | What does the 'k' in k-armed bandit stand for? |
| [Q158](#q158) | `C2-M2` | Monte Carlo / off-policy | `usable` | What is the key characteristic of an episode in the context of Monte Carlo methods? |
| [Q159](#q159) | `C3-M2` | prediction with approximation | `review` | What is the typical objective when training a parameterized value function in reinforcement learning? |
| [Q160](#q160) | `C2-M2` | Monte Carlo / off-policy | `usable` | What is a potential drawback of Monte Carlo prediction methods? |
| [Q161](#q161) | `OUT` | out-of-scope / corrupted | `discard` | What effect does decreasing the step size (h) have on the accuracy of the gradient estimation? |
| [Q162](#q162) | `C1-M5` | dynamic programming / GPI | `usable` | In policy evaluation, what does the Bellman expectation equation represent? |
| [Q163](#q163) | `OUT` | out-of-scope / corrupted | `discard` | What is generalization in the context of learning and behavior? |
| [Q164](#q164) | `C3-M5` | policy gradient / actor–critic | `usable` | What is the goal of a policy gradient method in reinforcement learning? |
| [Q165](#q165) | `C2-M5` | models and planning | `review` | Which algorithm estimates the action value using a model of the environment? |
| [Q166](#q166) | `C2-M2` | Monte Carlo / off-policy | `usable` | In Monte Carlo methods, what does the term "policy evaluation" refer to? |
| [Q167](#q167) | `C1-M4` | policy definition | `usable` | What is a policy in reinforcement learning? |
| [Q168](#q168) | `C3-M5` | softmax policy parameterization | `usable` | In Softmax policy parameterization, what does the softmax function do? |
| [Q169](#q169) | `C2-M4` | TD control | `usable` | Which exploration strategy is commonly used in Q-learning to maintain off-policy learning? |
| [Q170](#q170) | `C3-M3` | feature construction | `review` | Which parameter is NOT typically a part of Tile Coding configuration? |
| [Q171](#q171) | `C2-M2` | Monte Carlo / off-policy | `verify` | In Monte Carlo control, what is the major drawback of using Boltzmann Exploration? |
| [Q172](#q172) | `C2-M2` | Monte Carlo / off-policy | `review` | Which of the following is a key component of Monte Carlo simulations? |
| [Q173](#q173) | `C3-M5` | policy parameters | `usable` | In the context of neural networks, what do the parameters of a policy represent? |
| [Q174](#q174) | `OUT` | out-of-scope / corrupted | `discard` | What happens to the value of a reward if it is consistently provided regardless of behavior? |
| [Q175](#q175) | `C3-M2` | prediction with approximation | `review` | What is the main purpose of gradient descent in machine learning? |
| [Q176](#q176) | `C2-M5` | model learning | `review` | What is a common method for building a model in reinforcement learning? |
| [Q177](#q177) | `C3-M5` | policy gradient / actor–critic | `verify` | Which of the following is NOT a source of bias in policy gradient methods? |
| [Q178](#q178) | `C1-M2` | exploration / bandits | `usable` | What is the primary goal of using exploration in Monte-Carlo algorithms? |
| [Q179](#q179) | `C3-M2` | state aggregation | `usable` | What is a potential challenge when determining the number of aggregated states? |
| [Q180](#q180) | `C2-M2` | Monte Carlo / off-policy | `review` | In Monte Carlo methods, what is the term for the total accumulated reward obtained from a state? |
| [Q181](#q181) | `C2-M4` | TD control | `usable` | Which of the following best describes an off-policy algorithm? |
| [Q182](#q182) | `C2-M2` | Monte Carlo / off-policy | `usable` | Which of the following is an advantage of Temporal Difference Learning over Monte Carlo methods for Evaluation? |
| [Q183](#q183) | `C2-M4` | TD control | `review` | What is the role of the learning rate 1 in the Q-learning algorithm? |
| [Q184](#q184) | `C2-M3` | TD prediction | `review` | What is temporal-difference learning primarily used for? |
| [Q185](#q185) | `C2-M5` | models and planning | `usable` | In the context of reinforcement learning, what does the term "planning" typically refer to? |
| [Q186](#q186) | `C1-M4` | policies, values, Bellman equations | `review` | What is the Bellman equation used for in reinforcement learning? |
| [Q187](#q187) | `C2-M3` | TD prediction | `usable` | In Temporal Difference(0), how is the state-value function updated? |
| [Q188](#q188) | `C2-M2` | Monte Carlo / off-policy | `verify` | Which Monte Carlo method updates value estimates based on the average returns observed from state |
| [Q189](#q189) | `C1-M5` | dynamic programming / GPI | `usable` | In Policy Iteration, which step involves evaluating the current policy's performance and updating the val function? |
| [Q190](#q190) | `OUT` | out-of-scope / corrupted | `discard` | Which of the following is an example of generalization? |
| [Q191](#q191) | `OUT` | out-of-scope / corrupted | `discard` | What makes sending human missions to explore stars particularly challenging? |
| [Q192](#q192) | `C3-M5` | policy gradient / actor–critic | `review` | What is the advantage of using a baseline in policy gradient methods? |
| [Q193](#q193) | `C3-M5` | policy gradient / actor–critic | `review` | In policy gradient algorithms, what is the role of the objective function? |
| [Q194](#q194) | `OUT` | out-of-scope / corrupted | `discard` | Which Monte Carlo method is particularly useful for high-dimensional integration? |
| [Q195](#q195) | `C2-M4` | TD control | `review` | In SARSA, the next action 1' is chosen based on which policy? |
| [Q196](#q196) | `C2-M4` | TD control | `usable` | Which of the following is true about the exploration-exploitation trade-off in Q-learning? |
| [Q197](#q197) | `C2-M4` | TD control | `review` | In Q-learning, the update rule uses which action's reward to update the Q-values? |
| [Q198](#q198) | `C2-M4` | TD control | `usable` | What is the main objective of the Q-learning algorithm? |
| [Q199](#q199) | `C2-M4` | TD control | `usable` | What does SARSA stand for in the context of reinforcement learning? |
| [Q200](#q200) | `C2-M4` | TD control | `usable` | What role does the policy's probability distribution play in Expected Sarsa? |
| [Q201](#q201) | `C3-M5` | policy gradient / actor–critic | `usable` | How are policy gradient algorithms typically applied to continuous action spaces? |
| [Q202](#q202) | `C1-M4` | policies, values, Bellman equations | `verify` | What does the optimal value function represent? |
| [Q203](#q203) | `C3-M5` | policy gradient / actor–critic | `review` | Which parameter determines the degree of exploration in Actor-Critic with Softmax Policies? |
| [Q204](#q204) | `C1-M3` | MDP formulation | `usable` | What role does the reward signal play in adjusting the parameters of a policy? |
| [Q205](#q205) | `C2-M4` | TD control | `usable` | Why is it important to update Q-values iteratively in Q-learning? |
| [Q206](#q206) | `C1-M4` | policies, values, Bellman equations | `usable` | What is the primary purpose of the state value function in reinforcement learning? |
| [Q207](#q207) | `C3-M2` | prediction with approximation | `usable` | In the context of gradient descent, what is a 'learning rate'? |
| [Q208](#q208) | `C1-M2` | exploration / bandits | `usable` | What does the epsilon (€) represent in the ¢-greedy algorithm? |
| [Q209](#q209) | `C3-M2` | prediction with approximation | `review` | Which variant of gradient descent is typically used in reinforcement learning to handle large and contin state spaces? |
| [Q210](#q210) | `C2-M4` | TD control | `usable` | In the Q-learning algorithm, what is the main goal when updating the Q-values? |
| [Q211](#q211) | `C1-M4` | policies, values, Bellman equations | `review` | Which function is typically used to represent the action value in reinforcement learning? |
| [Q212](#q212) | `C3-M5` | direct policy representation | `verify` | Which type of policy directly associates actions with states without using a value function? |
| [Q213](#q213) | `C2-M4` | TD control | `review` | In SARSA, what is typically done if the learning rate (alpha) is too high? |
| [Q214](#q214) | `C1-M5` | dynamic programming / GPI | `review` | What is the Bellman equation used for in dynamic programming? |
| [Q215](#q215) | `C2-M4` | Expected Sarsa | `review` | Which algorithm typically results in smoother learning updates, reducing variance in the updates? |
| [Q216](#q216) | `C1-M3` | RL framework | `usable` | Which of the following is NOT a component of the reinforcement learning framework? |
| [Q217](#q217) | `C1-M4` | policies, values, Bellman equations | `usable` | What is the objective of estimating action values in reinforcement learning? |
| [Q218](#q218) | `OUT` | out-of-scope / corrupted | `discard` | Which task type is more conducive to forming habits? |
| [Q219](#q219) | `C2-M4` | TD control | `usable` | Which of the following is the key difference between SARSA and Q-learning? |
| [Q220](#q220) | `C3-M2` | prediction with approximation | `usable` | In the context of Temporal Difference (TD) learning, which feature of Tabular TD learning makes it a sp case of linear semi-gradient TD learning? |
| [Q221](#q221) | `C2-M4` | TD control | `review` | What is the primary challenge addressed by the SARSA (State-Action-Reward-State-Action) algorithm compared to Q-learning? |
| [Q222](#q222) | `C1-M5` | dynamic programming / GPI | `review` | Which of the following is NOT a characteristic of a problem suitable for dynamic programming? |
| [Q223](#q223) | `C3-M2` | prediction with approximation | `usable` | What is the main advantage of using function approximation in reinforcement learning? |
| [Q224](#q224) | `C2-M2` | model-free value estimation | `verify` | Which of the following methods is primarily used to estimate action values in model-free reinforcement learning? |
| [Q225](#q225) | `C3-M5` | sample policy-gradient estimation | `review` | In numerical methods, what is one limitation of estimating the gradient using samples? |
| [Q226](#q226) | `C3-M5` | policy gradient / actor–critic | `verify` | What is the advantage of using the Actor-Critic algorithm over other reinforcement learning methods? |
| [Q227](#q227) | `C2-M5` | models and planning | `usable` | Which of the following is a primary purpose of using a model in reinforcement learning? |
| [Q228](#q228) | `C2-M4` | TD control | `review` | In the SARSA algorithm, what is the role of the discount factor 1? |
| [Q229](#q229) | `C3-M2` | prediction with approximation | `verify` | Which of the following methods combines linear function approximation with policy improvement? |
| [Q230](#q230) | `C2-M3` | TD prediction | `verify` | In the context of Temporal Difference (TD), what is the main objective of the TD(0) algorithm? |
| [Q231](#q231) | `C2-M3` | TD prediction | `review` | What is the main advantage of temporal-difference learning over other reinforcement learning methods |
| [Q232](#q232) | `C2-M5` | models and planning | `usable` | In reinforcement learning, what is a model-based approach? |
| [Q233](#q233) | `C2-M3` | TD prediction | `usable` | What is the key objective of using a Temporal Difference (TD) learning algorithm? (choose the best answer/core idea of TD learning) |
| [Q234](#q234) | `C2-M5` | models and planning | `verify` | Which of the following methods is associated with distribution models for handling uncertainty in state transitions? |
| [Q235](#q235) | `C3-M5` | policy gradient / actor–critic | `review` | What does the exploration in Gaussian policies rely on? |
| [Q236](#q236) | `C2-M4` | TD control | `usable` | Which of the following algorithms is commonly used in reinforcement learning? |
| [Q237](#q237) | `C2-M4` | TD control | `review` | What is a potential disadvantage of using Expected Sarsa over Sarsa? |
| [Q238](#q238) | `C1-M2` | sample-average action values | `usable` | In the sample average method, what does the step size parameter determine? |
| [Q239](#q239) | `C3-M5` | policy gradient / actor–critic | `usable` | Which technique is commonly used to reduce the variance of policy gradient estimates? |
| [Q240](#q240) | `C3-M5` | policy gradient / actor–critic | `review` | What is the main challenge associated with using parameterized policies in reinforcement learning? |
| [Q241](#q241) | `C3-M5` | sample policy-gradient estimation | `review` | What is the advantage of using a higher number of sample points in estimating the gradient? |
| [Q242](#q242) | `C2-M3` | TD prediction | `usable` | Which statement best describes Tabular Temporal Difference (TD) learning? |
| [Q243](#q243) | `C2-M5` | models and planning | `review` | What does the Q-Learning update do in the context of planning? |
| [Q244](#q244) | `C2-M4` | TD control | `usable` | In expected Sarsa, the weights used in the expectation calculation are based on: |
| [Q245](#q245) | `C1-M3` | MDP formulation | `usable` | Which algorithm is commonly used to solve an MDP? |
| [Q246](#q246) | `C2-M2` | Monte Carlo / off-policy | `verify` | What is a common approach to reduce the variance in Monte Carlo estimates? |
| [Q247](#q247) | `C2-M2` | Monte Carlo / off-policy | `usable` | In contrast to Dynamic Programming and Monte Carlo methods, what aspect makes Temporal Difference (TD) methods more suitable for online learning? |
| [Q248](#q248) | `C1-M4` | policies, values, Bellman equations | `verify` | What is the Bellman equation used for in the context of MDPs? |
| [Q249](#q249) | `C3-M2` | prediction with approximation | `review` | In the context of linear function approximation, what is the gradient of the value function approximation? |
| [Q250](#q250) | `C1-M5` | dynamic programming / GPI | `usable` | Which phase of Policy Iteration involves updating the policy based on the current value function? |
| [Q251](#q251) | `C3-M2` | prediction with approximation | `review` | In the context of function approximation, what does Mu of S represent? |
| [Q252](#q252) | `C2-M4` | off-policy Expected Sarsa | `verify` | What does the term "off-policy" refer to in the context of Expected Sarsa? |
| [Q253](#q253) | `C1-M4` | policies, values, Bellman equations | `usable` | What is the Bellman equation used for in the context of MDPs? |
| [Q254](#q254) | `C2-M3` | TD versus Monte Carlo | `usable` | What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes? |
| [Q255](#q255) | `C3-M2` | prediction with approximation | `verify` | Which problem arises due to the use of linear function approximation in reinforcement learning? |
| [Q256](#q256) | `C2-M3` | TD prediction | `verify` | In the context of Temporal Difference (TD), Which of the following is NOT a step in the TD(0) algorithm? |
| [Q257](#q257) | `C2-M5` | models and planning | `verify` | What is the primary purpose of Dyna Architecture? |
| [Q258](#q258) | `C3-M2` | prediction with approximation | `review` | What is the main purpose of using optimistic initial values in function approximation? |
| [Q259](#q259) | `C2-M2` | Monte Carlo / off-policy | `usable` | In the Monte Carlo prediction method, what is the purpose of using the policy π? |
| [Q260](#q260) | `C3-M2` | prediction with approximation | `review` | What does the term "semi-gradient" refer to in the context of linear semi-gradient Temporal Difference learning? |
| [Q261](#q261) | `C1-M4` | policies, values, Bellman equations | `usable` | In reinforcement learning, what does a stochastic policy do? |
| [Q262](#q262) | `C1-M5` | dynamic programming / GPI | `usable` | What does the term "greedification" refer to in the context of policy improvement? |
| [Q263](#q263) | `OUT` | out-of-scope / corrupted | `discard` | In an experiment, a pigeon is trained to peck a key when it sees a red light but not when it sees a green light. This is an example of: |
| [Q264](#q264) | `C3-M2` | prediction with approximation | `review` | How many components does the feature vector have when there are four features and three actions in a stacked representation? |
| [Q265](#q265) | `C1-M5` | dynamic programming / GPI | `usable` | In policy iteration, what is the role of the policy evaluation step? |
| [Q266](#q266) | `C2-M4` | TD control | `usable` | Which of the following exploration strategies is commonly used with SARSA? |
| [Q267](#q267) | `C2-M5` | sample models | `verify` | Which type of reinforcement learning model typically uses Monte Carlo simulations to estimate values? |
| [Q268](#q268) | `C1-M5` | dynamic programming / GPI | `usable` | In Policy Iteration, which step involves evaluating the current policy's performance and updating the value function? |
| [Q269](#q269) | `C2-M5` | models and planning | `review` | Which of the following is a primary characteristic of a distribution model in reinforcement learning? |
| [Q270](#q270) | `OUT` | out-of-scope / corrupted | `discard` | Which term describes a methodical approach to handling episodic tasks? |
| [Q271](#q271) | `C1-M3` | MDP formulation | `review` | Which term describes the probability distribution over next states given a current state and action in an MDP? |
| [Q272](#q272) | `C2-M2` | Monte Carlo / off-policy | `review` | What is the purpose of the accumulated product of important sampling ratios (W) in the off-policy Monte Carlo prediction algorithm? |
| [Q273](#q273) | `C3-M5` | policy gradient / actor–critic | `usable` | What is the advantage of using policy gradient methods over value-based methods like Q-learning? |
| [Q274](#q274) | `C2-M2` | Monte Carlo / off-policy | `usable` | Which algorithm is commonly used for off-policy learning in reinforcement learning? |
| [Q275](#q275) | `C2-M2` | Monte Carlo / off-policy | `usable` | What is one advantage of Temporal Difference (TD) methods over Dynamic Programming (DP) and Monte Carlo methods? |
| [Q276](#q276) | `C2-M2` | Monte Carlo / off-policy | `usable` | What type of learning method is Monte Carlo prediction classified as? |
| [Q277](#q277) | `C2-M3` | TD prediction | `usable` | Which of the following is a characteristic of temporal-difference learning algorithms? |
| [Q278](#q278) | `C2-M2` | Monte Carlo / off-policy | `usable` | Which of the following statements about Monte Carlo methods is true? |
| [Q279](#q279) | `C2-M2` | Monte Carlo / off-policy | `verify` | Why is maintaining exploration important in Monte Carlo methods? |
| [Q280](#q280) | `C2-M4` | TD control | `usable` | Which of the following statements is true regarding the update rule of Expected Sarsa? |
| [Q281](#q281) | `C2-M5` | models and planning | `review` | What is the primary objective of Random Tabular Q-planning in reinforcement learning? |
| [Q282](#q282) | `C2-M2` | Monte Carlo / off-policy | `usable` | What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes? |
| [Q283](#q283) | `C2-M4` | TD control | `usable` | How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning? |
| [Q284](#q284) | `OUT` | out-of-scope / corrupted | `discard` | How can overfitting be addressed in machine learning models? |
| [Q285](#q285) | `C2-M4` | TD control | `usable` | In the SARSA algorithm, what role does the learning rate (\alpha) play? |
| [Q286](#q286) | `C2-M4` | TD control | `usable` | In Q-learning, what role does the learning rate (\alpha) play in the update rule? |
| [Q287](#q287) | `C2-M5` | models and planning | `review` | What is one of the main challenges when using distribution models in reinforcement learning? |
| [Q288](#q288) | `C2-M2` | Monte Carlo / off-policy | `usable` | Which of the following is an advantage of off-policy learning? |
| [Q289](#q289) | `C2-M3` | TD prediction | `review` | What does the "difference" in temporal-difference learning refer to? |
| [Q290](#q290) | `C2-M2` | off-policy learning | `usable` | Which technique in reinforcement learning allows learning from historical data while following a different policy? |
| [Q291](#q291) | `C3-M2` | prediction with approximation | `usable` | What does state aggregation involve in reinforcement learning? |
| [Q292](#q292) | `C3-M3` | feature construction | `usable` | Which of the following is a characteristic of states represented by coarse coding? |
| [Q293](#q293) | `C3-M3` | feature construction | `usable` | What is a primary challenge when setting up Tile Coding? |
| [Q294](#q294) | `C3-M5` | policy gradient / actor–critic | `review` | Which of the following methods is NOT typically used to learn the parameters of a Gaussian policy? |
| [Q295](#q295) | `C3-M2` | prediction with approximation | `usable` | When using Epsilon-greedy with function approximation, what role does the function approximator play? |
| [Q296](#q296) | `C3-M2` | parameterized value functions | `usable` | What is a parameterized function in the context of reinforcement learning? |
| [Q297](#q297) | `C3-M2` | prediction with approximation | `review` | What role does the discount factor play in Semi-Gradient TD learning? |
| [Q298](#q298) | `C3-M4` | average-reward control | `usable` | What is the significance of the average reward in reinforcement learning? |
| [Q299](#q299) | `C3-M3` | feature construction | `usable` | In coarse coding, what is the effect of having overlapping regions? |
| [Q300](#q300) | `C3-M2` | prediction with approximation | `usable` | In which type of environments is state aggregation particularly useful? |
| [Q301](#q301) | `C3-M5` | policy gradient / actor–critic | `review` | How are the actor and critic networks updated in Actor-Critic with Softmax Policies? |
| [Q302](#q302) | `C3-M5` | policy gradient / actor–critic | `usable` | What role does the critic play in Actor-Critic with Softmax Policies? |
| [Q303](#q303) | `C1-M3` | MDP formulation | `verify` | Which of the following is NOT a method for solving MDPs? |
| [Q304](#q304) | `C1-M5` | dynamic programming / GPI | `review` | How does the flexibility of the Policy Iteration Framework contribute to robustness? |
| [Q305](#q305) | `C1-M2` | exploration / bandits | `usable` | In the context of the multi-armed bandit problem, what does the term "exploitation" refer to? |
| [Q306](#q306) | `C1-M5` | dynamic programming / GPI | `review` | What happens if the value function of a policy converges during Iterative Policy Evaluation? |
| [Q307](#q307) | `OUT` | out-of-scope / corrupted | `discard` | How does hyperbolic discounting differ from exponential discounting? |
| [Q308](#q308) | `C1-M3` | continuing tasks | `usable` | Which task type typically requires sustained effort over time? |
| [Q309](#q309) | `C1-M4` | policies, values, Bellman equations | `usable` | What does the action value Q(s,a) represent in reinforcement learning? |
| [Q310](#q310) | `C1-M4` | policies, values, Bellman equations | `usable` | Which notation is commonly used to represent the action-value function? |
| [Q311](#q311) | `C1-M5` | dynamic programming / GPI | `verify` | In Policy Evaluation, what is the objective function typically used? |
| [Q312](#q312) | `C1-M3` | reward signal | `review` | In what way do rewards contribute to the goal-oriented behavior of an agent? |
| [Q313](#q313) | `C1-M4` | policies, values, Bellman equations | `verify` | In reinforcement learning, what is the Bellman equation used for? |
| [Q314](#q314) | `C1-M2` | softmax action selection | `usable` | Which method involves selecting actions based on their probability distribution determined by their estimated value functions? |
| [Q315](#q315) | `C1-M2` | exploration / bandits | `review` | Which exploration strategy selects actions according to a probability distribution that balances the known rewards with the potential for discovering new rewards? |
| [Q316](#q316) | `C1-M2` | exploration / bandits | `usable` | What is the "exploration-exploitation trade-off" in reinforcement learning? |
| [Q317](#q317) | `C1-M3` | MDP formulation | `usable` | In reinforcement learning, what is an agent? |

## Full question bank

<a id="q001"></a>
### Q001 — `C2-M2` · `usable`

What role does the target policy play in off-policy learning?

- **A.** It defines the behavior policy
- **B.** It defines the policy being learned and improved
- **C.** It defines the reward function
- **D.** It defines the exploration strategy

**Supplied answer:** B. It defines the policy being learned and improved

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q002"></a>
### Q002 — `C2-M5` · `verify`

Which of the following is a key benefit of using Dyna Architecture?

- **A.** Reduced computational resources
- **B.** Increased data redundancy
- **C.** Improved model scalability and adaptability
- **D.** Simplified system design

**Supplied answer:** C. Improved model scalability and adaptability

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Dyna's course-level benefit is sample efficiency by combining real and simulated experience; supplied options omit it.

[Back to master index](#master-scan-index)

---

<a id="q003"></a>
### Q003 — `C3-M4` · `review`

How is the average reward calculated in reinforcement learning?

- **A.** By summing up all rewards and dividing by the number of time steps
- **B.** By dividing the total reward by the number of episodes
- **C.** By taking the median of all rewards obtained
- **D.** By calculating the mode of the reward distribution

**Supplied answer:** A. By summing up all rewards and dividing by the number of time steps

**Index inference:** Course 3 · Control with approximation / average reward · average-reward control.

[Back to master index](#master-scan-index)

---

<a id="q004"></a>
### Q004 — `OUT` · `discard`

Which aspect of Temporal Difference makes it suitable for individuals with busy schedules?

- **A.** Fixed learning pace
- **B.** Limited access to resources
- **C.** Flexibility in scheduling
- **D.** Static course materials

**Supplied answer:** C. Flexibility in scheduling

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q005"></a>
### Q005 — `OUT` · `discard`

Which of the following is a technique for improving the accuracy of models with biased predictions?

- **A.** Introducing more bias into the model
- **B.** Regularization to penalize overly complex models
- **C.** Ignoring the bias and relying solely on historical data
- **D.** Using only one type of data source for model training

**Supplied answer:** B. Regularization to penalize overly complex models

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** Regularization does not generally correct biased predictions; the bias source must be diagnosed. No option is generally valid.

[Back to master index](#master-scan-index)

---

<a id="q006"></a>
### Q006 — `C1-M2` · `usable`

Which of the following best describes the exploration strategy known as epsilon-greedy?

- **A.** Always choosing the action with the highest Q-value
- **B.** Randomly choosing any action with equal probability
- **C.** Choosing the best-known action most of the time while occasionally exploring random actions
- **D.** Using a decaying learning rate to choose actions

**Supplied answer:** C. Choosing the best-known action most of the time while occasionally exploring random actions

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q007"></a>
### Q007 — `OUT` · `discard`

How can Monte-Carlo Tree Search algorithms be modified to favor exploration in uncertain or less explored regions?

- **A.** By reducing the exploration constant
- **B.** By adjusting the reward function to penalize uncertainty
- **C.** By increasing the exploration constant
- **D.** By pruning less explored nodes

**Supplied answer:** C. By increasing the exploration constant

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q008"></a>
### Q008 — `C3-M2` · `usable`

What is the main purpose of using linear function approximation in reinforcement learning?

- **A.** To simplify the state space
- **B.** To reduce computational complexity
- **C.** To provide a way to generalize value functions
- **D.** To avoid using neural networks

**Supplied answer:** C. To provide a way to generalize value functions

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q009"></a>
### Q009 — `OUT` · `discard`

What role does the unpredictability of interstellar environments play in star exploration?

- **A.** It makes it easier to find habitable planets.
- **B.** It can lead to unexpected hazards and mission failures.
- **C.** It simplifies the navigation process.
- **D.** It ensures that all missions are successful.

**Supplied answer:** B. It can lead to unexpected hazards and mission failures.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q010"></a>
### Q010 — `C3-M3` · `verify`

What advantage does Tile Coding provide compared to a single large lookup table?

- **A.** Increased computational speed
- **B.** Reduced overfitting
- **C.** More memory efficiency
- **D.** Higher resolution of state representation

**Supplied answer:** C. More memory efficiency

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.
**Audit note:** Tile coding's key benefit is generalization with bounded sparse features; “memory efficiency” depends on the comparison/setup.

[Back to master index](#master-scan-index)

---

<a id="q011"></a>
### Q011 — `C1-M4` · `review`

Which algorithm is commonly used to solve MDPs by iteratively estimating the value function?

- **A.** Q-Learning
- **B.** SARSA
- **C.** Value Iteration
- **D.** Policy Iteration

**Supplied answer:** C. Value Iteration

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q012"></a>
### Q012 — `C2-M5` · `usable`

What is the primary difference between Dyna-Q and Q-learning?

- **A.** Dyna-Q uses a model of the environment
- **B.** Q-learning updates Q-values online
- **C.** Q-learning is model-free, while Dyna-Q is model-based
- **D.** Dyna-Q is less prone to overestimation bias

**Supplied answer:** A. Dyna-Q uses a model of the environment

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q013"></a>
### Q013 — `C2-M5` · `usable`

Which of the following describes 'model-free' reinforcement learning methods?

- **A.** They rely on an explicit model of the environment
- **B.** They update policies based on simulated experiences
- **C.** They do not use a model of the environment
- **D.** They are used exclusively for planning

**Supplied answer:** C. They do not use a model of the environment

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q014"></a>
### Q014 — `C3-M3` · `verify`

Coarse coding can be seen as a form of which of the following in the context of state aggregation?

- **A.** Clustering
- **B.** Overfitting
- **C.** Exact encoding
- **D.** Model-free learning

**Supplied answer:** A. Clustering

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.
**Audit note:** Coarse coding uses overlapping receptive fields; calling it clustering is misleading.

[Back to master index](#master-scan-index)

---

<a id="q015"></a>
### Q015 — `C1-M5` · `verify`

How does the Policy Iteration Framework handle changing environments or goals?

- **A.** By completely discarding the current policy and starting from scratch
- **B.** By adjusting the policy gradually
- **C.** By ignoring changes and sticking to the initial policy
- **D.** None of the above

**Supplied answer:** B. By adjusting the policy gradually

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.
**Audit note:** Classical policy iteration assumes a stationary MDP; changed dynamics/goals require new evaluation or an adaptive model.

[Back to master index](#master-scan-index)

---

<a id="q016"></a>
### Q016 — `C3-M5` · `usable`

In Actor-Critic, what does the "Actor" component represent?

- **A.** Estimates of the expected return
- **B.** The policy function
- **C.** The value function
- **D.** The exploration strategy

**Supplied answer:** B. The policy function

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q017"></a>
### Q017 — `C2-M2` · `usable`

Off-policy learning is particularly useful in which scenario?

- **A.** When the environment is static and unchanging
- **B.** When exploration is not necessary
- **C.** When learning from demonstrations or historical data
- **D.** When actions have immediate and deterministic outcomes

**Supplied answer:** C. When learning from demonstrations or historical data

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q018"></a>
### Q018 — `C1-M2` · `usable`

In the context of Monte-Carlo algorithms, what is meant by "exploration-exploitation trade-off"?

- **A.** Balancing the computational cost with the accuracy of results
- **B.** Balancing the depth of search with the breadth of search
- **C.** Balancing the search for new information with the use of known information
- **D.** Balancing the algorithm's speed with its stability

**Supplied answer:** C. Balancing the search for new information with the use of known information

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q019"></a>
### Q019 — `C3-M4` · `verify`

Which mathematical concept is essential for understanding differential value functions?

- **A.** Integration
- **B.** Differentiation
- **C.** Algebra
- **D.** Geometry

**Supplied answer:** C. Algebra

**Index inference:** Course 3 · Control with approximation / average reward · average-reward control.
**Audit note:** Differential value functions need expectations and Bellman-style algebra; no single listed branch of mathematics is a sound answer.

[Back to master index](#master-scan-index)

---

<a id="q020"></a>
### Q020 — `C1-M2` · `usable`

In the context of the k-armed bandit problem, what is meant by "exploitation"?

- **A.** Selecting arms at random to gather information.
- **B.** Selecting the arm with the highest estimated reward.
- **C.** Ignoring previously chosen arms.
- **D.** Maximizing the exploration rate.

**Supplied answer:** B. Selecting the arm with the highest estimated reward.

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q021"></a>
### Q021 — `C3-M3` · `usable`

How does coarse coding handle the trade-off between bias and variance?

- **A.** It increases bias by using fewer features
- **B.** It reduces bias by using a detailed state representation
- **C.** It balances bias and variance by using overlapping coarse features
- **D.** It primarily focuses on reducing variance

**Supplied answer:** C. It balances bias and variance by using overlapping coarse features

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q022"></a>
### Q022 — `C2-M3` · `review`

Which characteristic distinguishes Temporal Difference(TD) methods from Dynamic Programming and Monte Carlo methods?

- **A.** TD methods are model-free.
- **B.** TD methods require the entire sequence of states, actions, and rewards.
- **C.** TD methods have high computational complexity.
- **D.** TD methods are suitable only for deterministic environments.

**Supplied answer:** A. TD methods are model-free.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q023"></a>
### Q023 — `C2-M4` · `usable`

What does it mean for Q-learning to be off-policy?

- **A.** It learns the value of the policy it is currently following.
- **B.** It learns the value of the optimal policy while following a different policy.
- **C.** It learns the value of random actions.
- **D.** It does not follow any policy.

**Supplied answer:** B. It learns the value of the optimal policy while following a different policy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q024"></a>
### Q024 — `C3-M2` · `usable`

Which of the following is a disadvantage of using state aggregation?

- **A.** It simplifies the problem.
- **B.** It may lead to a loss of detail and precision.
- **C.** It increases the computational burden.
- **D.** It guarantees an exact value function.

**Supplied answer:** B. It may lead to a loss of detail and precision.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q025"></a>
### Q025 — `C1-M3` · `usable`

Which of the following best describes a reward signal in reinforcement learning?

- **A.** Itis a fixed value assigned to each action regardless of the outcome.
- **B.** It is a numerical value given to the agent to indicate the success of an action.
- **C.** It is a symbolic representation of the agent's decision-making process.
- **D.** It is a sequence of states the agent goes through.

**Supplied answer:** B. It is a numerical value given to the agent to indicate the success of an action.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q026"></a>
### Q026 — `OUT` · `discard`

What is discrimination in the context of learning and behavior?

- **A.** The process by which a response spreads from one specific stimulus to other stimuli that resemble the original.
- **B.** The ability to respond differently to similar but distinct stimuli.
- **C.** The reinforcement of a behavior in order to increase its frequency.
- **D.** The gradual weakening and disappearance of a conditioned response.

**Supplied answer:** B. The ability to respond differently to similar but distinct stimuli.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q027"></a>
### Q027 — `C2-M3` · `usable`

What distinguishes Monte Carlo methods from Temporal-Difference (TD) methods?

- **A.** Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.
- **B.** Monte Carlo methods require a model of the environment, while TD methods do not.
- **C.** Monte Carlo methods can be used online, while TD methods cannot.
- **D.** Monte Carlo methods always converge faster than TD methods.

**Supplied answer:** A. Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.

**Index inference:** Course 2 · TD prediction · TD versus Monte Carlo.

[Back to master index](#master-scan-index)

---

<a id="q028"></a>
### Q028 — `C2-M2` · `verify`

What is the effect of using a more complex proposal distribution in importance sampling?

- **A.** It decreases the variance of the estimator.
- **B.** It increases the variance of the estimator.
- **C.** It reduces the bias of the estimator.
- **D.** It improves the efficiency of the estimator.

**Supplied answer:** A. It decreases the variance of the estimator.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** Proposal complexity alone does not reduce variance; closeness/support relative to the target matters.

[Back to master index](#master-scan-index)

---

<a id="q029"></a>
### Q029 — `C3-M5` · `usable`

Which of the following statements is true about the Actor-Critic algorithm?

- **A.** It is a type of supervised learning algorithm
- **B.** It requires a separate neural network for each state-action pair
- **C.** It updates the policy based on the estimated advantage function
- **D.** Itis only applicable to discrete action spaces

**Supplied answer:** C. It updates the policy based on the estimated advantage function

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q030"></a>
### Q030 — `C3-M5` · `verify`

In the policy gradient theorem, what does the policy gradient represent?

- **A.** The slope of the value function
- **B.** The rate of change of the policy parameters
- **C.** The probability of taking each action
- **D.** The discounted future reward

**Supplied answer:** B. The rate of change of the policy parameters

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.
**Audit note:** The policy gradient is \(\nabla_\theta J(\theta)\): change in expected performance with respect to policy parameters.

[Back to master index](#master-scan-index)

---

<a id="q031"></a>
### Q031 — `C1-M4` · `review`

In the Bellman equation, what does V(s) represent?

- **A.** The expected reward starting from state s
- **B.** The value of taking action a in state s
- **C.** The transition probability from state s to state s'
- **D.** The discount factor

**Supplied answer:** A. The expected reward starting from state s

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q032"></a>
### Q032 — `C2-M3` · `verify`

What is the main advantage of temporal-difference learning over other reinforcement learning methods?

- **A.** It requires less computational resources.
- **B.** It can handle non-stationary environments.
- **C.** It doesn't rely on rewards.
- **D.** It guarantees optimal policy convergence.

**Supplied answer:** A. It requires less computational resources.

**Index inference:** Course 2 · TD prediction · TD prediction.
**Audit note:** TD's defining advantage is online bootstrapping without a model or complete episode, not simply lower compute.

[Back to master index](#master-scan-index)

---

<a id="q033"></a>
### Q033 — `OUT` · `discard`

What is a common method for ensuring adequate exploration in the initial stages of a Monte-Carlo Tree Search?

- **A.** Decreasing the exploration constant
- **B.** Increasing the exploration constant
- **C.** Reducing the number of simulations
- **D.** Pruning the tree aggressively

**Supplied answer:** B. Increasing the exploration constant

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q034"></a>
### Q034 — `C3-M2` · `review`

What does the MSVE objective aim to minimize in the context of policy evaluation?

- **A.** The variance of the rewards
- **B.** The difference between consecutive policy updates
- **C.** The sum of squared differences between the estimated and true values
- **D.** The number of policy iterations

**Supplied answer:** C. The sum of squared differences between the estimated and true values

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q035"></a>
### Q035 — `OUT` · `discard`

Which of the following algorithms is more prone to overfitting in reinforcement learning?

- **A.** Value Iteration
- **B.** Policy Gradient
- **C.** Q-Learning
- **D.** Monte Carlo Methods

**Supplied answer:** B. Policy Gradient

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** No listed RL algorithm is generically most prone to overfitting; capacity, data, features, and evaluation determine risk.

[Back to master index](#master-scan-index)

---

<a id="q036"></a>
### Q036 — `C1-M3` · `usable`

What is the primary goal of reinforcement learning?

- **A.** To classify data into different categories
- **B.** To minimize the error between predicted and actual values
- **C.** To maximize the cumulative reward over time
- **D.** To find patterns in unlabelled data

**Supplied answer:** C. To maximize the cumulative reward over time

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q037"></a>
### Q037 — `C4` · `review`

In the context of Deep Q-Networks (DQN), what does the term "experience replay" refer to?

- **A.** Replaying a sequence of actions to improve exploration.
- **B.** Storing and reusing past experiences to stabilize learning.
- **C.** Replaying an episode when the agent performs poorly.
- **D.** None of the above.

**Supplied answer:** B. Storing and reusing past experiences to stabilize learning.

**Index inference:** Course 4 · Capstone integration / empirical validation · experience replay review.

[Back to master index](#master-scan-index)

---

<a id="q038"></a>
### Q038 — `C4` · `review`

What is one strategy for detecting inaccuracies in predictive models?

- **A.** Trusting the model outputs blindly
- **B.** Validating the model against new data
- **C.** Ignoring feedback from stakeholders
- **D.** Relying solely on historical performance

**Supplied answer:** B. Validating the model against new data

**Index inference:** Course 4 · Capstone integration / empirical validation · empirical validation.

[Back to master index](#master-scan-index)

---

<a id="q039"></a>
### Q039 — `OUT` · `discard`

What does a Monte Carlo simulation typically produce?

- **A.** Asingle, exact result
- **B.** Arange of possible outcomes
- **C.** A linear equation
- **D.** A fixed constant

**Supplied answer:** B. Arange of possible outcomes

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q040"></a>
### Q040 — `C1-M5` · `usable`

What does the term "iterative" signify in Iterative Policy Evaluation?

- **A.** The process involves repeated computation until convergence
- **B.** It updates the policy in every iteration
- **C.** It requires iterating through all possible states
- **D.** It involves iterating through different reinforcement learning algorithms

**Supplied answer:** A. The process involves repeated computation until convergence

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q041"></a>
### Q041 — `C1-M5` · `verify`

What is the primary objective of policy control in reinforcement learning?

- **A.** Maximizing immediate rewards
- **B.** Minimizing state-action space
- **C.** Balancing exploration and exploitation
- **D.** Optimizing computational resources

**Supplied answer:** C. Balancing exploration and exploitation

**Index inference:** Course 1 · Dynamic programming and GPI · control objective.
**Audit note:** Control aims to find a policy maximizing expected return; exploration–exploitation is a means, not the objective.

[Back to master index](#master-scan-index)

---

<a id="q042"></a>
### Q042 — `OUT` · `discard`

In which field of study is the estimation of gradients using samples commonly applied?

- **A.** Quantum physics
- **B.** Computer graphics
- **C.** Sociology
- **D.** Linguistics

**Supplied answer:** B. Computer graphics

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** Sample gradient estimation is used across many fields, so computer graphics is not a unique valid answer.

[Back to master index](#master-scan-index)

---

<a id="q043"></a>
### Q043 — `OUT` · `discard`

Which factor makes Temporal Difference particularly suitable for self-directed learners?

- **A.** Fixed learning pace
- **B.** Limited access to resources
- **C.** Adaptive learning pathways
- **D.** Static course materials

**Supplied answer:** C. Adaptive learning pathways

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q044"></a>
### Q044 — `C2-M4` · `review`

What differentiates off-policy Q-learning from on-policy methods like SARSA?

- **A.** Q-learning uses past experiences while SARSA uses future predictions.
- **B.** Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.
- **C.** Q-learning requires a model of the environment, while SARSA does not.
- **D.** Q-learning is based on deterministic policies, while SARSA is based on stochastic policies.

**Supplied answer:** B. Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q045"></a>
### Q045 — `C1-M4` · `usable`

What is the Bellman equation used for in the context of MDPs?

- **A.** To calculate the shortest path between states.
- **B.** To update the policy in reinforcement learning.
- **C.** To express the relationship between the value of a state and the values of its successor States.
- **D.** To compute the transition probabilities between states to get maximum rewards

**Supplied answer:** C. To express the relationship between the value of a state and the values of its successor States.

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q046"></a>
### Q046 — `C1-M4` · `review`

What is the significance of the Bellman optimality equation in reinforcement learning?

- **A.** It defines the optimal exploration strategy
- **B.** It gives a recursive decomposition for the optimal policy
- **C.** It calculates the exact future rewards
- **D.** It simplifies the state transition probabilities

**Supplied answer:** B. It gives a recursive decomposition for the optimal policy

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q047"></a>
### Q047 — `C3-M4` · `verify`

Which algorithm is commonly used to estimate the average reward in reinforcement learning?

- **A.** Q-learning
- **B.** Monte Carlo methods
- **C.** Deep Q-Networks (DQN)
- **D.** Temporal Difference (TD) learning

**Supplied answer:** D. Temporal Difference (TD) learning

**Index inference:** Course 3 · Control with approximation / average reward · average-reward control.
**Audit note:** Average-reward methods include differential TD/control variants; “TD learning” alone is too broad.

[Back to master index](#master-scan-index)

---

<a id="q048"></a>
### Q048 — `C3-M3` · `verify`

Which of the following algorithms is NOT typically used in reinforcement learning?

- **A.** Q-learning
- **B.** Sarsa
- **C.** Backpropagation
- **D.** Deep Deterministic Policy Gradient (DDPG)

**Supplied answer:** C. Backpropagation

**Index inference:** Course 3 · Coarse/tile coding and neural features · neural-network tooling.
**Audit note:** Backpropagation is widely used inside deep RL; it is an optimization mechanism, not an RL control algorithm.

[Back to master index](#master-scan-index)

---

<a id="q049"></a>
### Q049 — `C2-M4` · `review`

In Q-learning, which term is used to update the Q-value for state s and action a?

- **A.** a (learning rate)
- **B.** B (exploration rate)
- **C.** 6 (error term)
- **D.** A (decay rate)

**Supplied answer:** A. a (learning rate)

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q050"></a>
### Q050 — `C2-M4` · `usable`

In Q-learning, how is the action value updated for a given state-action pair?

- **A.** Using the expected return
- **B.** Using the maximum action value of the next state
- **C.** Using the discounted reward of the next state
- **D.** Using the average of all action values

**Supplied answer:** B. Using the maximum action value of the next state

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q051"></a>
### Q051 — `C2-M3` · `verify`

In the context of Temporal Difference (TD), What is the primary advantage of TD(0) over Monte Carlo methods?

- **A.** Lower computational complexity
- **B.** Better convergence properties
- **C.** Ability to handle partial observability
- **D.** No dependence on policy selection

**Supplied answer:** A. Lower computational complexity

**Index inference:** Course 2 · TD prediction · TD versus Monte Carlo.
**Audit note:** TD(0)'s defining advantage over MC is bootstrapping before episode termination; lower complexity is not universally primary.

[Back to master index](#master-scan-index)

---

<a id="q052"></a>
### Q052 — `C1-M3` · `usable`

Which of the following is an example of a continuing task?

- **A.** Writing a research paper in one sitting.
- **B.** Practicing a musical instrument daily.
- **C.** Completing a crossword puzzle.
- **D.** Painting a landscape over multiple sessions.

**Supplied answer:** B. Practicing a musical instrument daily.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q053"></a>
### Q053 — `C1-M2` · `review`

Which of the following techniques uses a decreasing probability of random actions over time to balance exploration and exploitation?

- **A.** Q-Learning
- **B.** Epsilon-Greedy
- **C.** Softmax
- **D.** Thompson Sampling

**Supplied answer:** B. Epsilon-Greedy

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q054"></a>
### Q054 — `C2-M3` · `review`

In the context of Temporal Difference (TD), Which factor influences the trade-off between exploration and exploitation in TD(0)?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Reward function
- **D.** Exploration rate

**Supplied answer:** D. Exploration rate

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q055"></a>
### Q055 — `C3-M5` · `usable`

Which of the following is true about the actor-critic method in reinforcement learning?

- **A.** The actor updates the value function while the critic updates the policy
- **B.** The critic updates the value function while the actor updates the policy
- **C.** Both the actor and critic update the policy
- **D.** Both the actor and critic update the value function

**Supplied answer:** B. The critic updates the value function while the actor updates the policy

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q056"></a>
### Q056 — `OUT` · `discard`

Which term describes the process of gradually shaping behavior through the use of rewards?

- **A.** Punishment
- **B.** Extinction
- **C.** Reinforcement
- **D.** Conditioning

**Supplied answer:** C. Reinforcement

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** Gradually reinforcing successive approximations is shaping; that intended term is absent.

[Back to master index](#master-scan-index)

---

<a id="q057"></a>
### Q057 — `C3-M5` · `usable`

What is the primary objective of policy gradient algorithms in reinforcement learning?

- **A.** Maximize the state-value function
- **B.** Minimize the action-value function
- **C.** Maximize the expected cumulative reward
- **D.** Minimize the exploration-exploitation trade-off

**Supplied answer:** C. Maximize the expected cumulative reward

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q058"></a>
### Q058 — `C2-M4` · `usable`

What is one common exploration strategy used in conjunction with Expected Sarsa?

- **A.** Greedy policy
- **B.** Softmax selection
- **C.** e-greedy policy
- **D.** Random walk

**Supplied answer:** C. e-greedy policy

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q059"></a>
### Q059 — `C2-M4` · `usable`

In Sarsa, the Q-value update rule uses which of the following to update the current state-action pair?

- **A.** Q(s', a') - Q(s, a)
- **B.** The reward received plus the discounted Q-value of the next state-action pair
- **C.** The reward received plus the maximum Q-value of the next state
- **D.** The reward received plus the average Q-value of the next state-action pair

**Supplied answer:** B. The reward received plus the discounted Q-value of the next state-action pair

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q060"></a>
### Q060 — `OUT` · `discard`

Which of the following is NOT a benefit of learning with Temporal Difference?

- **A.** Personalized learning experiences
- **B.** Accessible anytime, anywhere
- **C.** Limited interaction with peers
- **D.** Self-paced learning

**Supplied answer:** C. Limited interaction with peers

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q061"></a>
### Q061 — `C1-M4` · `review`

What role does the discount factor y play in the state value function?

- **A.** It balances the trade-off between exploration and exploitation to get maximum rewards
- **B.** It determines the importance of future rewards in the value function
- **C.** It adjusts the learning rate of the state value function
- **D.** It controls the randomness in the policy

**Supplied answer:** B. It determines the importance of future rewards in the value function

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q062"></a>
### Q062 — `C3-M3` · `usable`

How does coarse coding help in handling large state spaces in reinforcement learning?

- **A.** By dividing the state space into non-overlapping regions
- **B.** By using a high-dimensional binary feature vector for each state
- **C.** By approximating value functions over a coarsely divided state space
- **D.** By applying a hierarchical approach to action selection

**Supplied answer:** C. By approximating value functions over a coarsely divided state space

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q063"></a>
### Q063 — `C3-M4` · `verify`

When might the average reward fail as a performance metric in reinforcement learning?

- **A.** In deterministic environments
- **B.** When the reward distribution is uniform
- **C.** In environments with sparse rewards
- **D.** When the agent only receives positive rewards

**Supplied answer:** C. In environments with sparse rewards

**Index inference:** Course 3 · Control with approximation / average reward · average-reward control.
**Audit note:** Sparse reward makes finite-sample estimates difficult, but does not make the average-reward objective invalid.

[Back to master index](#master-scan-index)

---

<a id="q064"></a>
### Q064 — `C1-M2` · `verify`

What is a common technique to reduce the impact of overly optimistic initial values over time?

- **A.** Decaying exploration rate
- **B.** Increasing learning rate
- **C.** Dynamic programming
- **D.** Reducing the discount factor

**Supplied answer:** A. Decaying exploration rate

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.
**Audit note:** Optimistic estimates decay through repeated updates; decaying exploration does not directly remove optimism.

[Back to master index](#master-scan-index)

---

<a id="q065"></a>
### Q065 — `C1-M3` · `usable`

What is the purpose of the discount factor (gamma, y) in reinforcement learning?

- **A.** To control the learning rate of the agent
- **B.** To prioritize recent rewards over distant future rewards
- **C.** To balance exploration and exploitation
- **D.** To determine the convergence rate of the algorithm

**Supplied answer:** B. To prioritize recent rewards over distant future rewards

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q066"></a>
### Q066 — `C3-M5` · `review`

Which of the following is NOT a variation of policy gradient methods?

- **A.** Deep Q-Network (DQN)
- **B.** Trust Region Policy Optimization (TRPO)
- **C.** Deterministic Policy Gradient (DPG)
- **D.** Natural Policy Gradient (NPG)

**Supplied answer:** A. Deep Q-Network (DQN)

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q067"></a>
### Q067 — `C3-M5` · `usable`

What is Softmax policy parameterization primarily used for in reinforcement learning?

- **A.** Feature selection
- **B.** Action selection
- **C.** State representation
- **D.** Reward calculation

**Supplied answer:** B. Action selection

**Index inference:** Course 3 · Policy gradient and actor–critic · softmax policy parameterization.

[Back to master index](#master-scan-index)

---

<a id="q068"></a>
### Q068 — `C1-M4` · `usable`

What does the term "policy" refer to in the context of reinforcement learning?

- **A.** Asequence of actions
- **B.** Amapping from states to actions
- **C.** Asequence of rewards
- **D.** Amapping from actions to states

**Supplied answer:** B. Amapping from states to actions

**Index inference:** Course 1 · Policies, values, Bellman equations · policy definition.

[Back to master index](#master-scan-index)

---

<a id="q069"></a>
### Q069 — `C1-M3` · `review`

Why might shaping rewards be necessary in reinforcement learning?

- **A.** To make the learning process more challenging
- **B.** To encourage exploration of less obvious actions
- **C.** To prevent the agent from achieving the goal
- **D.** To simplify the reward structure for the agent

**Supplied answer:** B. To encourage exploration of less obvious actions

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · reward design.

[Back to master index](#master-scan-index)

---

<a id="q070"></a>
### Q070 — `C1-M2` · `review`

In reinforcement learning, what does the temperature parameter represent?

- **A.** The learning rate
- **B.** The exploration-exploitation trade-off
- **C.** The discount factor
- **D.** The number of episodes

**Supplied answer:** B. The exploration-exploitation trade-off

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q071"></a>
### Q071 — `C2-M4` · `usable`

What does the Bellman equation for Q-learning update represent?

- **A.** The average reward per state
- **B.** The relationship between the Q-value of a state-action pair and the expected future rewards
- **C.** The difference between the expected and actual reward
- **D.** The probability of transitioning to a new state

**Supplied answer:** B. The relationship between the Q-value of a state-action pair and the expected future rewards

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q072"></a>
### Q072 — `C2-M5` · `usable`

Which method involves using a model to simulate the environment for planning in reinforcement learning?

- **A.** Model-free methods
- **B.** Model-based methods
- **C.** Policy gradient methods
- **D.** Genetic algorithms

**Supplied answer:** B. Model-based methods

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q073"></a>
### Q073 — `C2-M2` · `usable`

Which of the following best describes Monte Carlo methods in the context of reinforcement learning?

- **A.** Methods that require a model of the environment to update policies.
- **B.** Methods that use a deterministic approach to update state values.
- **C.** Methods that use random sampling to estimate value functions and update policies.
- **D.** Methods that always guarantee finding the optimal policy.

**Supplied answer:** C. Methods that use random sampling to estimate value functions and update policies.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q074"></a>
### Q074 — `C2-M4` · `verify`

Why might Expected Sarsa be preferred in environments with large action spaces?

- **A.** It requires fewer samples for each update
- **B.** It avoids the need for a policy altogether
- **C.** It can better handle the uncertainty of many possible actions
- **D.** It simplifies the computation of the Q-value updates

**Supplied answer:** C. It can better handle the uncertainty of many possible actions

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.
**Audit note:** Expected Sarsa can be more expensive in large action spaces because it sums over actions; the premise is questionable.

[Back to master index](#master-scan-index)

---

<a id="q075"></a>
### Q075 — `C3-M5` · `review`

In policy improvement, what does the policy gradient represent?

- **A.** Direction of steepest ascent in the parameter space
- **B.** Direction of steepest descent in the parameter space
- **C.** Magnitude of immediate reward
- **D.** Probability of selecting an action

**Supplied answer:** A. Direction of steepest ascent in the parameter space

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q076"></a>
### Q076 — `C3-M2` · `usable`

Why is generalization important in reinforcement learning?

- **A.** To avoid overfitting to specific states
- **B.** To increase the state space size
- **C.** To ensure each state is precisely defined
- **D.** To complicate the learning algorithm

**Supplied answer:** A. To avoid overfitting to specific states

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q077"></a>
### Q077 — `C2-M4` · `usable`

What is the primary difference between Sarsa and Expected Sarsa in reinforcement learning?

- **A.** Sarsa uses the maximum Q-value of the next state
- **B.** Expected Sarsa uses the maximum Q-value of the next state
- **C.** Sarsa uses a sample of the previous state's Q-value
- **D.** Expected Sarsa uses the expected value of the next state's Q-value

**Supplied answer:** D. Expected Sarsa uses the expected value of the next state's Q-value

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q078"></a>
### Q078 — `C1-M2` · `verify`

Which of the following is NOT a characteristic of Epsilon-soft policies?

- **A.** Flexibility
- **B.** Transparency
- **C.** Rigidity
- **D.** Accountability

**Supplied answer:** C. Rigidity

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.
**Audit note:** Epsilon-soft means each action has probability at least \(\varepsilon/|\mathcal A(s)|\); the options do not test it.

[Back to master index](#master-scan-index)

---

<a id="q079"></a>
### Q079 — `C3-M2` · `review`

What is a common issue when using the mean-squared value error for large state spaces?

- **A.** Overfitting
- **B.** Underfitting
- **C.** Computational complexity
- **D.** Lack of convergence

**Supplied answer:** C. Computational complexity

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q080"></a>
### Q080 — `C1-M5` · `verify`

Which of the following best describes the time complexity of dynamic programming algorithms?

- **A.** Exponential
- **B.** Polynomial
- **C.** Logarithmic
- **D.** Linear

**Supplied answer:** B. Polynomial

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.
**Audit note:** DP complexity depends on state/action counts, horizon, model structure, and algorithm; the unqualified key is unsupported.

[Back to master index](#master-scan-index)

---

<a id="q081"></a>
### Q081 — `C2-M2` · `review`

In importance sampling, what does the proposal distribution refer to?

- **A.** The distribution from which samples are drawn
- **B.** The distribution of the target variable
- **C.** The distribution of the importance weights
- **D.** The distribution of the estimator

**Supplied answer:** A. The distribution from which samples are drawn

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q082"></a>
### Q082 — `C1-M3` · `review`

How does the discount rate affect intertemporal choices in continuing tasks?

- **A.** It has no effect on intertemporal choices
- **B.** It influences the perception of the relative value of immediate versus delayed rewards
- **C.** It determines the time it takes to complete the task
- **D.** It dictates the level of risk associated with the task

**Supplied answer:** B. It influences the perception of the relative value of immediate versus delayed rewards

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q083"></a>
### Q083 — `OUT` · `discard`

What advantage does Temporal Difference offer in terms of accessibility?

- **A.** Restriction to specific devices
- **B.** Fixed location for learning
- **C.** Accessible anytime, anywhere
- **D.** Limited availability of course materials

**Supplied answer:** C. Accessible anytime, anywhere

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q084"></a>
### Q084 — `C3-M3` · `usable`

What is the impact of the granularity of coarse coding on learning?

- **A.** Finer granularity increases generalization but decreases learning speed
- **B.** Coarser granularity decreases generalization but increases learning speed
- **C.** Finer granularity decreases both generalization and learning speed
- **D.** Coarser granularity increases both generalization and learning speed

**Supplied answer:** D. Coarser granularity increases both generalization and learning speed

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q085"></a>
### Q085 — `OUT` · `discard`

Which exploration method in Monte Carlo control assigns exploration bonuses based on the number of times an action has been selected?

- **A.** UCB (Upper Confidence Bound)
- **B.** e-greedy
- **C.** Thompson Sampling
- **D.** Boltzmann Exploration

**Supplied answer:** A. UCB (Upper Confidence Bound)

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q086"></a>
### Q086 — `C2-M4` · `review`

In Expected Sarsa, what does the parameter y represent?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Exploration rate
- **D.** Update rate

**Supplied answer:** B. Discount factor

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q087"></a>
### Q087 — `C3-M5` · `usable`

In reinforcement learning, what does the policy gradient method aim to optimize?

- **A.** The value function
- **B.** The Q-function
- **C.** The policy directly
- **D.** The reward function

**Supplied answer:** C. The policy directly

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q088"></a>
### Q088 — `C1-M3` · `usable`

Which of the following is NOT a typical component of a reinforcement learning model?

- **A.** State transition probabilities
- **B.** Reward function
- **C.** Policy network
- **D.** Action space

**Supplied answer:** C. Policy network

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · RL framework.

[Back to master index](#master-scan-index)

---

<a id="q089"></a>
### Q089 — `OUT` · `discard`

Why is it difficult to design technology for star exploration?

- **A.** Limited understanding of the necessary physics.
- **B.** The high levels of electromagnetic interference.
- **C.** Rapid technological advancements.
- **D.** The need for materials that can withstand extreme conditions.

**Supplied answer:** D. The need for materials that can withstand extreme conditions.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q090"></a>
### Q090 — `C1-M4` · `usable`

In reinforcement learning, the state value function V(s) represents:

- **A.** The immediate reward received after taking an action in state s
- **B.** The total accumulated reward from state s
- **C.** The expected return starting from state s
- **D.** The likelihood of transitioning from state s to another state

**Supplied answer:** C. The expected return starting from state s

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q091"></a>
### Q091 — `C3-M5` · `verify`

Which factor influences the stability of policy gradient algorithms during training?

- **A.** Learning rate
- **B.** Discount factor
- **C.** Exploration rate
- **D.** Entropy regularization

**Supplied answer:** A. Learning rate

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.
**Audit note:** Step size, noise, discounting, exploration, and regularization can all affect policy-gradient stability.

[Back to master index](#master-scan-index)

---

<a id="q092"></a>
### Q092 — `OUT` · `discard`

How does Temporal Difference enhance engagement compared to traditional learning methods?

- **A.** By providing passive learning experiences
- **B.** By limiting interaction with instructors
- **C.** By offering real-time feedback and interactivity
- **D.** By restricting access to course materials

**Supplied answer:** C. By offering real-time feedback and interactivity

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q093"></a>
### Q093 — `C3-M5` · `usable`

Which of the following methods uses parameterized functions to directly approximate the policy in reinforcement learning?

- **A.** Q-learning
- **B.** SARSA
- **C.** Deep Q-Networks (DQN)
- **D.** Policy Gradient Methods

**Supplied answer:** D. Policy Gradient Methods

**Index inference:** Course 3 · Policy gradient and actor–critic · direct policy approximation.

[Back to master index](#master-scan-index)

---

<a id="q094"></a>
### Q094 — `OUT` · `discard`

In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula typically depend on?

- **A.** The depth of the tree
- **B.** The number of simulations
- **C.** The average reward
- **D.** The total number of times a node has been visited

**Supplied answer:** D. The total number of times a node has been visited

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\).

[Back to master index](#master-scan-index)

---

<a id="q095"></a>
### Q095 — `C1-M2` · `review`

What is the main purpose of using a decaying epsilon in the Epsilon-Greedy strategy?

- **A.** To increase the randomness of actions over time.
- **B.** To decrease the randomness of actions over time.
- **C.** To maintain a constant level of exploration.
- **D.** To switch to a different policy entirely.

**Supplied answer:** B. To decrease the randomness of actions over time.

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q096"></a>
### Q096 — `C1-M2` · `usable`

Which method can be used to encourage exploration in reinforcement learning?

- **A.** Setting a high discount factor
- **B.** Using a fixed learning rate
- **C.** Implementing an €-greedy policy
- **D.** Decreasing the reward values

**Supplied answer:** C. Implementing an €-greedy policy

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q097"></a>
### Q097 — `C1-M4` · `usable`

What is a deterministic policy in reinforcement learning?

- **A.** A policy that selects actions based on a random process
- **B.** A policy that selects actions with a fixed probability distribution
- **C.** A policy that selects the same action for a given state every time
- **D.** Apolicy that changes based on the environment

**Supplied answer:** C. A policy that selects the same action for a given state every time

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q098"></a>
### Q098 — `C3-M2` · `usable`

In reinforcement learning, what is the purpose of using a parameterized function to approximate the value function?

- **A.** To reduce the exploration space
- **B.** To simplify the problem by reducing the number of actions
- **C.** To generalize the value function across different states
- **D.** To guarantee an exact solution

**Supplied answer:** C. To generalize the value function across different states

**Index inference:** Course 3 · Prediction with function approximation · parameterized value function.

[Back to master index](#master-scan-index)

---

<a id="q099"></a>
### Q099 — `OUT` · `discard`

Which of the following techniques is commonly used to balance exploration and exploitation in Monte-Carlo Tree Search (MCTS)?

- **A.** Minimax algorithm
- **B.** Upper Confidence Bound (UCB)
- **C.** Simulated annealing
- **D.** Genetic algorithms

**Supplied answer:** B. Upper Confidence Bound (UCB)

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q100"></a>
### Q100 — `C1-M3` · `usable`

In the context of reinforcement learning, what does a negative reward signify?

- **A.** It indicates the agent has achieved the goal.
- **B.** It discourages the agent from repeating the action that led to it.
- **C.** It has no impact on the agent's future actions.
- **D.** It stops the learning process.

**Supplied answer:** B. It discourages the agent from repeating the action that led to it.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · reward signal.

[Back to master index](#master-scan-index)

---

<a id="q101"></a>
### Q101 — `OUT` · `discard`

In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula ty depend on?

- **A.** The depth of the tree
- **B.** The number of simulations
- **C.** The average reward
- **D.** The total number of times a node has been visited

**Supplied answer:** D. The total number of times a node has been visited

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\).

[Back to master index](#master-scan-index)

---

<a id="q102"></a>
### Q102 — `OUT` · `discard`

Why is the balance between discrimination and generalization crucial in adaptive learning systems?

- **A.** It ensures consistent repetition of known tasks.
- **B.** It avoids the need for discrimination.
- **C.** It allows the system to apply learned knowledge to new situations while recognizing differences.
- **D.** It reduces the system's processing power.

**Supplied answer:** C. It allows the system to apply learned knowledge to new situations while recognizing differences.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q103"></a>
### Q103 — `C3-M5` · `review`

In reinforcement learning, what does the temperature parameter 1 represent?

- **A.** The learning rate
- **B.** The exploration-exploitation trade-off
- **C.** The discount factor
- **D.** The number of episodes

**Supplied answer:** B. The exploration-exploitation trade-off

**Index inference:** Course 3 · Policy gradient and actor–critic · softmax policy parameterization.

[Back to master index](#master-scan-index)

---

<a id="q104"></a>
### Q104 — `C3-M2` · `verify`

Which problem arises due to the use of linear function approximation in reinforcement learning?

- **A.** Overfitting
- **B.** Curse of dimensionality
- **C.** Underfitting
- **D.** Vanishing gradients

**Supplied answer:** C. Underfitting

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.
**Audit note:** Linear approximation can underfit with inadequate features, but underfitting is not inherent.

[Back to master index](#master-scan-index)

---

<a id="q105"></a>
### Q105 — `C2-M3` · `usable`

Which statement best describes Tabular Temporal Difference (TD) learning?

- **A.** It uses a table to store values for each state-action pair.
- **B.** It uses function approximation to estimate value functions.
- **C.** It updates values based on rewards and State transitions without using tables.
- **D.** It requires the exact model of the environment.

**Supplied answer:** A. It uses a table to store values for each state-action pair.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q106"></a>
### Q106 — `C1-M5` · `usable`

What is Policy Evaluation in reinforcement learning?

- **A.** Determining the optimal policy
- **B.** Assessing the quality of a given policy
- **C.** Selecting the best action in a given state
- **D.** Updating the state-action values

**Supplied answer:** B. Assessing the quality of a given policy

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q107"></a>
### Q107 — `OUT` · `discard`

How can generalization be reduced in a learning environment?

- **A.** By reinforcing behaviors inconsistently.
- **B.** By using a variety of stimuli during training.
- **C.** By providing specific cues for different responses.
- **D.** By not reinforcing any behavior.

**Supplied answer:** C. By providing specific cues for different responses.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q108"></a>
### Q108 — `C2-M4` · `usable`

In Expected Sarsa, the expectation is taken over which element?

- **A.** Future states
- **B.** Rewards
- **C.** Possible next actions
- **D.** Current state values

**Supplied answer:** C. Possible next actions

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q109"></a>
### Q109 — `C2-M5` · `verify`

What is the primary purpose of Dyna Architecture?

- **A.** To develop operating systems
- **B.** To design scalable web servers
- **C.** To model complex dynamic systems
- **D.** To manage database transactions

**Supplied answer:** C. To model complex dynamic systems

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Dyna integrates direct RL, a learned model, planning, and acting; none of the options states this.

[Back to master index](#master-scan-index)

---

<a id="q110"></a>
### Q110 — `C2-M2` · `review`

Which factor determines the quality of the estimate in importance sampling?

- **A.** The size of the sample
- **B.** The closeness of the proposal distribution to the target distribution
- **C.** The number of iterations in the estimation process
- **D.** The order of convergence of the estimator

**Supplied answer:** B. The closeness of the proposal distribution to the target distribution

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q111"></a>
### Q111 — `OUT` · `discard`

Which aspect of Temporal Difference makes it advantageous for learners?

- **A.** Real-time feedback
- **B.** Delayed response mechanism
- **C.** Limited access to course materials
- **D.** Static content delivery

**Supplied answer:** A. Real-time feedback

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q112"></a>
### Q112 — `OUT` · `discard`

What is the primary objective of reinforcement learning in build mode?

- **A.** To minimize the time spent on training
- **B.** To find the optimal strategy for an agent to maximize cumulative reward
- **C.** To reduce the size of the neural network
- **D.** To ensure the agent performs well in a single task

**Supplied answer:** B. To find the optimal strategy for an agent to maximize cumulative reward

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q113"></a>
### Q113 — `C2-M5` · `review`

Which of the following is NOT a common reason for inaccuracies in models?

- **A.** Data quality issues
- **B.** Incorrect model assumptions
- **C.** Overfitting
- **D.** Perfect alignment with real-world scenarios

**Supplied answer:** D. Perfect alignment with real-world scenarios

**Index inference:** Course 2 · Models, planning, Dyna · model inaccuracies.

[Back to master index](#master-scan-index)

---

<a id="q114"></a>
### Q114 — `C3-M5` · `review`

What happens to the softmax temperature parameter as it approaches infinity?

- **A.** The policy becomes more deterministic
- **B.** The policy becomes more stochastic
- **C.** The policy becomes completely random
- **D.** The policy becomes independent of the state

**Supplied answer:** C. The policy becomes completely random

**Index inference:** Course 3 · Policy gradient and actor–critic · softmax policy parameterization.

[Back to master index](#master-scan-index)

---

<a id="q115"></a>
### Q115 — `C2-M2` · `verify`

Which technique is often used to reduce variance in Monte Carlo simulations?

- **A.** Gradient descent
- **B.** Variance reduction techniques like importance sampling
- **C.** Simple random sampling
- **D.** Fixed partitioning

**Supplied answer:** B. Variance reduction techniques like importance sampling

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** Importance sampling can increase variance; it is variance reduction only with a well-chosen proposal/estimator.

[Back to master index](#master-scan-index)

---

<a id="q116"></a>
### Q116 — `C2-M4` · `usable`

In which type of environment is Expected Sarsa generally more stable than Q-learning?

- **A.** Deterministic environments
- **B.** Stochastic environments
- **C.** Fully observable environments
- **D.** Static environments

**Supplied answer:** B. Stochastic environments

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q117"></a>
### Q117 — `OUT` · `discard`

What term describes the phenomenon where people discount future rewards more steeply when the re are closer in time?

- **A.** Hyperbolic discounting
- **B.** Exponential discounting
- **C.** Temporal myopia
- **D.** Time preference reversal

**Supplied answer:** A. Hyperbolic discounting

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q118"></a>
### Q118 — `C2-M3` · `review`

Which advantage of Temporal Difference (TD) methods allows them to be applied in online settings wh environment changes over time?

- **A.** TD methods require a fixed environment for learning.
- **B.** TD methods rely on a pre-defined transition model.
- **C.** TD methods adapt quickly to changing environments.
- **D.** TD methods are only suitable for offline learning.

**Supplied answer:** C. TD methods adapt quickly to changing environments.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q119"></a>
### Q119 — `C2-M5` · `verify`

In Random Tabular Q-planning, what does the Q in Q-planning stand for?

- **A.** Quantity
- **B.** Quality
- **C.** Queue
- **D.** Q-value

**Supplied answer:** D. Q-value

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Q is action-value notation; ask what \(Q(s,a)\) represents rather than what the letter 'stands for.'

[Back to master index](#master-scan-index)

---

<a id="q120"></a>
### Q120 — `C3-M5` · `usable`

Which component of a parameterized policy is typically adjusted during training?

- **A.** State space
- **B.** Action space
- **C.** Parameters
- **D.** Rewards

**Supplied answer:** C. Parameters

**Index inference:** Course 3 · Policy gradient and actor–critic · parameterized policies.

[Back to master index](#master-scan-index)

---

<a id="q121"></a>
### Q121 — `C3-M5` · `review`

In Actor-Critic, what is the purpose of the advantage function?

- **A.** To estimate the probability distribution of actions
- **B.** To measure the improvement of taking a particular action in a given state over the average action
- **C.** To calculate the discounted cumulative reward
- **D.** To optimize the policy directly

**Supplied answer:** B. To measure the improvement of taking a particular action in a given state over the average action

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q122"></a>
### Q122 — `C2-M5` · `verify`

Why is it beneficial to update Q-values randomly in Random Tabular Q-planning?

- **A.** It ensures that all state-action pairs are updated equally.
- **B.** It helps in better exploration of the state-action space.
- **C.** It makes the algorithm simpler to implement.
- **D.** It guarantees convergence to the optimal policy.

**Supplied answer:** B. It helps in better exploration of the state-action space.

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Random planning updates sample previously observed state–action pairs; this is planning coverage, not environment exploration.

[Back to master index](#master-scan-index)

---

<a id="q123"></a>
### Q123 — `C3-M3` · `usable`

Which of the following best describes the primary goal of coarse coding?

- **A.** To minimize the number of states in the state space
- **B.** To reduce computational complexity by using fewer resources
- **C.** To generalize the state representation by using overlapping features
- **D.** To ensure exact representation of the state space

**Supplied answer:** C. To generalize the state representation by using overlapping features

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q124"></a>
### Q124 — `C1-M2` · `review`

In Monte-Carlo algorithms, what is the potential downside of too much exploration?

- **A.** It can lead to overfitting
- **B.** It can cause the algorithm to ignore the best-known solutions
- **C.** It increases the risk of convergence to a suboptimal solution
- **D.** It may significantly increase computational time without improving results

**Supplied answer:** B. It can cause the algorithm to ignore the best-known solutions

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q125"></a>
### Q125 — `OUT` · `discard`

Which factor is crucial for effectively managing episodic tasks?

- **A.** Procrastination
- **B.** Flexibility
- **C.** Rigid schedules
- **D.** Micro-management

**Supplied answer:** B. Flexibility

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q126"></a>
### Q126 — `C2-M4` · `usable`

Which of the following statements is true about the SARSA algorithm?

- **A.** SARSA is an off-policy algorithm.
- **B.** SARSA always converges to the optimal policy.
- **C.** SARSA updates the Q-values using the action taken by the policy.
- **D.** SARSA requires a model of the environment.

**Supplied answer:** C. SARSA updates the Q-values using the action taken by the policy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q127"></a>
### Q127 — `C1-M3` · `usable`

What is a key characteristic of continuing tasks?

- **A.** They require infrequent attention.
- **B.** They involve discrete, one-time actions.
- **C.** They have indefinite or ongoing durations.
- **D.** They are always completed in a single session.

**Supplied answer:** C. They have indefinite or ongoing durations.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q128"></a>
### Q128 — `C1-M4` · `review`

Which of the following best describes the Bellman equation?

- **A.** Arecursive decomposition of optimization problems.
- **B.** A linear equation solving system.
- **C.** Amethod for linear regression analysis.
- **D.** A probabilistic forecasting model.

**Supplied answer:** A. Arecursive decomposition of optimization problems.

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q129"></a>
### Q129 — `C1-M5` · `usable`

What does policy improvement involve?

- **A.** Updating the policy to be more greedy with respect to the value function
- **B.** Randomly changing the policy
- **C.** Keeping the policy fixed while evaluating its value
- **D.** Evaluating all possible policies before choosing the best one

**Supplied answer:** A. Updating the policy to be more greedy with respect to the value function

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q130"></a>
### Q130 — `C3-M2` · `usable`

What is one approach to aggregating states in continuous state spaces?

- **A.** Using discrete state spaces only.
- **B.** Clustering states based on feature similarity.
- **C.** Ignoring state features altogether.
- **D.** Randomly grouping states.

**Supplied answer:** B. Clustering states based on feature similarity.

**Index inference:** Course 3 · Prediction with function approximation · state aggregation.

[Back to master index](#master-scan-index)

---

<a id="q131"></a>
### Q131 — `C3-M2` · `review`

In the context of Temporal Difference (TD) learning, what is the main advantage of linear semi-gradient over Tabular TD learning?

- **A.** It provides exact solutions.
- **B.** It can generalize to unseen states through feature representation.
- **C.** It does not require any parameter tuning.
- **D.** Itis simpler to implement.

**Supplied answer:** B. It can generalize to unseen states through feature representation.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q132"></a>
### Q132 — `C1-M2` · `usable`

In the epsilon-greedy policy, what role does the parameter epsilon (€) play in balancing exploration and exploitation?

- **A.** It determines the probability of selecting the best-known action
- **B.** It adjusts the learning rate of the algorithm
- **C.** It influences the discount factor for future rewards
- **D.** It determines the probability of exploring new actions

**Supplied answer:** D. It determines the probability of exploring new actions

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q133"></a>
### Q133 — `C2-M3` · `review`

What distinguishes Monte Carlo methods from Temporal Difference (TD) methods in reinforcement lea

- **A.** Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.
- **B.** Monte Carlo methods require knowledge of the model, while TD methods do not.
- **C.** Monte Carlo methods are more computationally expensive than TD methods.
- **D.** Monte Carlo methods cannot be used for online learning.

**Supplied answer:** A. Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.

**Index inference:** Course 2 · TD prediction · TD versus Monte Carlo.

[Back to master index](#master-scan-index)

---

<a id="q134"></a>
### Q134 — `OUT` · `discard`

Which strategy is NOT typically used to maintain exploration in Monte-Carlo Tree Search?

- **A.** Increasing the exploration constant in Upper Confidence Bound
- **B.** Using random playouts
- **C.** Reducing the number of rollouts
- **D.** Incorporating domain-specific heuristics

**Supplied answer:** C. Reducing the number of rollouts

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q135"></a>
### Q135 — `C3-M5` · `usable`

In reinforcement learning, what does the policy gradient theorem provide a method for?

- **A.** Calculating the optimal policy directly
- **B.** Evaluating the value function of a policy
- **C.** Approximating the gradient of a policy's performance
- **D.** Finding the optimal action in each state

**Supplied answer:** C. Approximating the gradient of a policy's performance

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q136"></a>
### Q136 — `OUT` · `discard`

In Monte Carlo control, which exploration method considers uncertainty by sampling from a posterior distribution of action values?

- **A.** UCB (Upper Confidence Bound)
- **B.** e-greedy
- **C.** Thompson Sampling
- **D.** Boltzmann Exploration

**Supplied answer:** C. Thompson Sampling

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q137"></a>
### Q137 — `C3-M4` · `review`

When using Epsilon-greedy with function approximation, what role does the function approximator play

- **A.** It generates the random exploration rate
- **B.** It approximates the Q-values for given states and actions
- **C.** It determines when to switch between exploration and exploitation
- **D.** It sets the value of epsilon

**Supplied answer:** B. It approximates the Q-values for given states and actions

**Index inference:** Course 3 · Control with approximation / average reward · exploration with approximation.

[Back to master index](#master-scan-index)

---

<a id="q138"></a>
### Q138 — `C1-M3` · `usable`

What is the goal of an agent in an MDP?

- **A.** To explore the state space.
- **B.** To maximize the cumulative reward.
- **C.** To minimize the number of actions taken.
- **D.** To transition between states as often as possible.

**Supplied answer:** B. To maximize the cumulative reward.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q139"></a>
### Q139 — `C1-M4` · `review`

Which technique is commonly used to approximate the optimal value function when the state space is t large to compute it exactly?

- **A.** Deep Q-Networks (DQN)
- **B.** Monte Carlo Methods
- **C.** Policy gradients
- **D.** Temporal Difference Learning

**Supplied answer:** A. Deep Q-Networks (DQN)

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q140"></a>
### Q140 — `C2-M3` · `review`

What does Temporal Difference (TD) learning combine?

- **A.** Monte Carlo methods and dynamic programming
- **B.** Supervised learning and unsupervised learning
- **C.** Gradient descent and stochastic gradient descent
- **D.** Neural networks and decision trees

**Supplied answer:** A. Monte Carlo methods and dynamic programming

**Index inference:** Course 2 · TD prediction · TD foundations.

[Back to master index](#master-scan-index)

---

<a id="q141"></a>
### Q141 — `C1-M4` · `review`

What role does the policy n(a|s) play in the Bellman equation for the state value function?

- **A.** It determines the immediate reward
- **B.** It specifies the probability of taking action a in state s
- **C.** It is used to compute the transition probabilities
- **D.** It discounts the future rewards

**Supplied answer:** B. It specifies the probability of taking action a in state s

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q142"></a>
### Q142 — `C1-M3` · `usable`

Which of the following is an example of an episodic task?

- **A.** Checking email daily
- **B.** Attending a weekly team meeting
- **C.** Planning a company retreat
- **D.** Monitoring website traffic hourly

**Supplied answer:** C. Planning a company retreat

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q143"></a>
### Q143 — `C3-M2` · `review`

In the context of parameterized functions, what is gradient descent used for?

- **A.** To determine the optimal actions
- **B.** To update the parameters to minimize the loss function
- **C.** To increase the randomness in actions
- **D.** To split the data into training and testing sets

**Supplied answer:** B. To update the parameters to minimize the loss function

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q144"></a>
### Q144 — `C1-M3` · `usable`

If you're preparing for an exam by studying a little bit each day, what type of task is this?

- **A.** Episodic task.
- **B.** Continuing task.
- **C.** Project-based task.
- **D.** Occasional task.

**Supplied answer:** A. Episodic task.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · continuing tasks.

[Back to master index](#master-scan-index)

---

<a id="q145"></a>
### Q145 — `C2-M5` · `verify`

Dyna Architecture primarily deals with which type of models?

- **A.** Static models
- **B.** Dynamic models
- **C.** Predictive models
- **D.** Relational models

**Supplied answer:** B. Dynamic models

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Dyna integrates learning, planning, and acting; it is not primarily a category of transition model.

[Back to master index](#master-scan-index)

---

<a id="q146"></a>
### Q146 — `C2-M2` · `review`

Which of the following best describes the law of large numbers as it applies to Monte Carlo simulations

- **A.** The larger the sample size, the less accurate the results
- **B.** The larger the sample size, the more accurate the results
- **C.** The sample size does not affect the results
- **D.** The sample size should always be small

**Supplied answer:** B. The larger the sample size, the more accurate the results

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q147"></a>
### Q147 — `C1-M5` · `review`

In a policy improvement step, how is the state value function used?

- **A.** To initialize the action value function
- **B.** To generate new policies based on the current state values
- **C.** To calculate the expected reward for each possible action
- **D.** To terminate the learning process when a threshold is met

**Supplied answer:** B. To generate new policies based on the current state values

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q148"></a>
### Q148 — `OUT` · `discard`

When a child learns to use a specific greeting for different individuals (e.g., 'Hi' for peers, 'Good morning teachers), this is an example of:

- **A.** Generalization
- **B.** Discrimination
- **C.** Extinction
- **D.** Classical conditioning

**Supplied answer:** B. Discrimination

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q149"></a>
### Q149 — `C1-M2` · `usable`

What is the difference between "exploration" and "exploitation" in reinforcement learning?

- **A.** Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward
- **B.** Exploration is related to searching through a dataset, while exploitation is related to using the mode predictions
- **C.** Exploration is used in supervised learning, while exploitation is used in unsupervised learning
- **D.** Exploration refers to reducing the complexity of the model, while exploitation refers to increasing the complexity of the model

**Supplied answer:** A. Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q150"></a>
### Q150 — `C2-M4` · `review`

How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?

- **A.** By using a fixed learning rate.
- **B.** By averaging over all possible actions.
- **C.** By always Selecting the action with the highest Q-value.
- **D.** By ignoring the reward signal.

**Supplied answer:** B. By averaging over all possible actions.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · Expected Sarsa.

[Back to master index](#master-scan-index)

---

<a id="q151"></a>
### Q151 — `C2-M5` · `verify`

In the context of reinforcement learning, what is a key advantage of distribution models over sample-ba models?

- **A.** Simplicity and ease of implementation
- **B.** Reduced computational complexity
- **C.** Ability to generalize from a broader set of scenarios
- **D.** Faster convergence to the optimal policy

**Supplied answer:** C. Ability to generalize from a broader set of scenarios

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Distribution models provide expectations/distributions; whether they are more sample-efficient depends on model accuracy and use.

[Back to master index](#master-scan-index)

---

<a id="q152"></a>
### Q152 — `C2-M5` · `verify`

What is the relationship between sample efficiency and sample-based models?

- **A.** Sample-based models are more sample-efficient than distribution models
- **B.** Sample-based models are generally less sample-efficient than distribution models
- **C.** Both types of models have the same sample efficiency
- **D.** Sample efficiency is not a concern in reinforcement learning

**Supplied answer:** B. Sample-based models are generally less sample-efficient than distribution models

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** No universal sample-efficiency ordering exists: sample models are easier to obtain; distribution models contain richer information.

[Back to master index](#master-scan-index)

---

<a id="q153"></a>
### Q153 — `C3-M2` · `usable`

Which method is commonly used in conjunction with state aggregation to estimate the value function?

- **A.** Random search.
- **B.** Dynamic programming.
- **C.** Monte Carlo methods.
- **D.** Direct enumeration.

**Supplied answer:** C. Monte Carlo methods.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q154"></a>
### Q154 — `OUT` · `discard`

What happens if the eligibility trace decay rate is set too low in Semi-Gradient TD learning?

- **A.** The algorithm becomes more sensitive to noise
- **B.** The updates become more biased
- **C.** The algorithm may fail to converge
- **D.** The learning rate becomes unstable

**Supplied answer:** B. The updates become more biased

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q155"></a>
### Q155 — `C3-M5` · `review`

How does the exploration-exploitation dilemma relate to parameterized policies?

- **A.** It determines the size of the neural network
- **B.** It guides the policy towards actions that lead to higher rewards
- **C.** It defines the trade-off between trying new actions and exploiting known actions
- **D.** It regulates the learning rate during training

**Supplied answer:** C. It defines the trade-off between trying new actions and exploiting known actions

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q156"></a>
### Q156 — `OUT` · `discard`

What term describes the phenomenon where people discount future rewards more steeply when the re\ are closer in time?

- **A.** Hyperbolic discounting
- **B.** Exponential discounting
- **C.** Temporal myopia
- **D.** Time preference reversal

**Supplied answer:** A. Hyperbolic discounting

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q157"></a>
### Q157 — `C1-M2` · `usable`

What does the 'k' in k-armed bandit stand for?

- **A.** The total number of steps taken.
- **B.** The number of actions (or arms) available.
- **C.** The discount factor.
- **D.** The learning rate.

**Supplied answer:** B. The number of actions (or arms) available.

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q158"></a>
### Q158 — `C2-M2` · `usable`

What is the key characteristic of an episode in the context of Monte Carlo methods?

- **A.** Itis a sequence of states, actions, and rewards that terminates.
- **B.** itis a fixed number of time steps in the environment.
- **C.** Itis a set of independent trials to estimate probabilities.
- **D.** Itis a single action taken by the agent.

**Supplied answer:** A. Itis a sequence of states, actions, and rewards that terminates.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q159"></a>
### Q159 — `C3-M2` · `review`

What is the typical objective when training a parameterized value function in reinforcement learning?

- **A.** Minimizing the time to convergence
- **B.** Maximizing the exploration rate
- **C.** Minimizing the loss between predicted and actual rewards
- **D.** Maximizing the number of parameters

**Supplied answer:** C. Minimizing the loss between predicted and actual rewards

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q160"></a>
### Q160 — `C2-M2` · `usable`

What is a potential drawback of Monte Carlo prediction methods?

- **A.** They require a model of the environment
- **B.** They can only be applied to deterministic environments
- **C.** They may require a large number of episodes to obtain accurate value estimates
- **D.** They are not suitable for on-policy learning

**Supplied answer:** C. They may require a large number of episodes to obtain accurate value estimates

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q161"></a>
### Q161 — `OUT` · `discard`

What effect does decreasing the step size (h) have on the accuracy of the gradient estimation?

- **A.** Increases accuracy
- **B.** Decreases accuracy
- **C.** No effect on accuracy
- **D.** Increases computation time

**Supplied answer:** A. Increases accuracy

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** Smaller finite-difference h lowers truncation error only until roundoff or sampling noise dominates.

[Back to master index](#master-scan-index)

---

<a id="q162"></a>
### Q162 — `C1-M5` · `usable`

In policy evaluation, what does the Bellman expectation equation represent?

- **A.** The expected cumulative reward when following a policy
- **B.** The expected value of a state under a given policy
- **C.** The expected value of a state-action pair under a given policy
- **D.** The expected future reward of taking an action in a state

**Supplied answer:** B. The expected value of a state under a given policy

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q163"></a>
### Q163 — `OUT` · `discard`

What is generalization in the context of learning and behavior?

- **A.** The ability to distinguish between different stimuli.
- **B.** The process by which a response spreads from one specific stimulus to other stimuli that resemble original.
- **C.** Areduction in the frequency of a learned behavior.
- **D.** The process of strengthening a specific behavior through reinforcement.

**Supplied answer:** B. The process by which a response spreads from one specific stimulus to other stimuli that resemble original.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q164"></a>
### Q164 — `C3-M5` · `usable`

What is the goal of a policy gradient method in reinforcement learning?

- **A.** To update the value function directly
- **B.** To learn the model of the environment
- **C.** To improve the policy by optimizing the expected return
- **D.** To compute the Q-value of each state-action pair to get maximum rewards

**Supplied answer:** C. To improve the policy by optimizing the expected return

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q165"></a>
### Q165 — `C2-M5` · `review`

Which algorithm estimates the action value using a model of the environment?

- **A.** Q-learning
- **B.** SARSA
- **C.** Monte Carlo Control
- **D.** Dynamic Programming

**Supplied answer:** D. Dynamic Programming

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q166"></a>
### Q166 — `C2-M2` · `usable`

In Monte Carlo methods, what does the term "policy evaluation" refer to?

- **A.** The process of determining the optimal policy.
- **B.** The process of improving the policy based on value estimates.
- **C.** The process of estimating the value function for a given policy.
- **D.** The process of selecting the best action based on current values.

**Supplied answer:** C. The process of estimating the value function for a given policy.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q167"></a>
### Q167 — `C1-M4` · `usable`

What is a policy in reinforcement learning?

- **A.** The set of all possible states in an environment
- **B.** The method by which an agent maps states to actions
- **C.** A function that assigns rewards to actions
- **D.** The discount factor for future rewards

**Supplied answer:** B. The method by which an agent maps states to actions

**Index inference:** Course 1 · Policies, values, Bellman equations · policy definition.

[Back to master index](#master-scan-index)

---

<a id="q168"></a>
### Q168 — `C3-M5` · `usable`

In Softmax policy parameterization, what does the softmax function do?

- **A.** Squashes values to a range between 0 and 1
- **B.** Normalizes values into probabilities
- **C.** Maps values to discrete actions
- **D.** Converts values into gradients

**Supplied answer:** B. Normalizes values into probabilities

**Index inference:** Course 3 · Policy gradient and actor–critic · softmax policy parameterization.

[Back to master index](#master-scan-index)

---

<a id="q169"></a>
### Q169 — `C2-M4` · `usable`

Which exploration strategy is commonly used in Q-learning to maintain off-policy learning?

- **A.** Greedy strategy.
- **B.** Epsilon-greedy strategy.
- **C.** Softmax strategy.
- **D.** Random strategy.

**Supplied answer:** B. Epsilon-greedy strategy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q170"></a>
### Q170 — `C3-M3` · `review`

Which parameter is NOT typically a part of Tile Coding configuration?

- **A.** Number of tilings
- **B.** Tile width
- **C.** Learning rate
- **D.** Offset of each tiling

**Supplied answer:** C. Learning rate

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q171"></a>
### Q171 — `C2-M2` · `verify`

In Monte Carlo control, what is the major drawback of using Boltzmann Exploration?

- **A.** High computational complexity
- **B.** Tendency to exploit rather than explore
- **C.** Fixed exploration rate
- **D.** Sensitivity to initial conditions

**Supplied answer:** D. Sensitivity to initial conditions

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** Boltzmann exploration's standard weakness is sensitivity to temperature and action-value scale.

[Back to master index](#master-scan-index)

---

<a id="q172"></a>
### Q172 — `C2-M2` · `review`

Which of the following is a key component of Monte Carlo simulations?

- **A.** Deterministic algorithms
- **B.** Random sampling
- **C.** Fixed input values
- **D.** Analytical solutions

**Supplied answer:** B. Random sampling

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q173"></a>
### Q173 — `C3-M5` · `usable`

In the context of neural networks, what do the parameters of a policy represent?

- **A.** The input features
- **B.** The output actions
- **C.** The activation functions
- **D.** The weights and biases

**Supplied answer:** D. The weights and biases

**Index inference:** Course 3 · Policy gradient and actor–critic · policy parameters.

[Back to master index](#master-scan-index)

---

<a id="q174"></a>
### Q174 — `OUT` · `discard`

What happens to the value of a reward if it is consistently provided regardless of behavior?

- **A.** Itincreases
- **B.** It decreases
- **C.** Itremains the same
- **D.** It becomes unpredictable

**Supplied answer:** B. It decreases

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** A reward value does not automatically decrease because it is behavior-independent; this confuses reward and reinforcer effectiveness.

[Back to master index](#master-scan-index)

---

<a id="q175"></a>
### Q175 — `C3-M2` · `review`

What is the main purpose of gradient descent in machine learning?

- **A.** To find the maximum of a function
- **B.** To find the minimum of a function
- **C.** To calculate the derivative of a function
- **D.** To optimize the model architecture

**Supplied answer:** B. To find the minimum of a function

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q176"></a>
### Q176 — `C2-M5` · `review`

What is a common method for building a model in reinforcement learning?

- **A.** Supervised learning with labeled data
- **B.** Unsupervised learning with unlabeled data
- **C.** Using historical data to approximate state transitions and rewards
- **D.** Clustering similar states and actions together

**Supplied answer:** C. Using historical data to approximate state transitions and rewards

**Index inference:** Course 2 · Models, planning, Dyna · model learning.

[Back to master index](#master-scan-index)

---

<a id="q177"></a>
### Q177 — `C3-M5` · `verify`

Which of the following is NOT a source of bias in policy gradient methods?

- **A.** Variance reduction techniques
- **B.** Finite sample size
- **C.** Choice of baseline
- **D.** Exploration-exploitation trade-off

**Supplied answer:** A. Variance reduction techniques

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.
**Audit note:** Finite samples mainly add variance, and an action-independent baseline preserves the expected gradient; no unique NOT answer exists.

[Back to master index](#master-scan-index)

---

<a id="q178"></a>
### Q178 — `C1-M2` · `usable`

What is the primary goal of using exploration in Monte-Carlo algorithms?

- **A.** To minimize computational cost
- **B.** To find the most optimal solution
- **C.** To avoid overfitting the model
- **D.** To ensure the algorithm samples a wide range of possibilities

**Supplied answer:** D. To ensure the algorithm samples a wide range of possibilities

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q179"></a>
### Q179 — `C3-M2` · `usable`

What is a potential challenge when determining the number of aggregated states?

- **A.** Ensuring they are all exactly the same.
- **B.** Balancing between the level of detail and computational efficiency.
- **C.** Making sure they are all unique.
- **D.** Finding a fixed number that works for all problems.

**Supplied answer:** B. Balancing between the level of detail and computational efficiency.

**Index inference:** Course 3 · Prediction with function approximation · state aggregation.

[Back to master index](#master-scan-index)

---

<a id="q180"></a>
### Q180 — `C2-M2` · `review`

In Monte Carlo methods, what is the term for the total accumulated reward obtained from a state?

- **A.** Immediate reward
- **B.** Discounted reward
- **C.** Return
- **D.** Cumulative penalty

**Supplied answer:** C. Return

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q181"></a>
### Q181 — `C2-M4` · `usable`

Which of the following best describes an off-policy algorithm?

- **A.** lt optimizes the policy based on past experiences only.
- **B.** It updates the policy based on the actions taken by the agent.
- **C.** It learns from actions that are not necessarily taken by the current policy.
- **D.** It only learns from the actions dictated by the current policy.

**Supplied answer:** C. It learns from actions that are not necessarily taken by the current policy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q182"></a>
### Q182 — `C2-M2` · `usable`

Which of the following is an advantage of Temporal Difference Learning over Monte Carlo methods for Evaluation?

- **A.** Temporal Difference Learning is computationally less expensive.
- **B.** Temporal Difference Learning provides unbiased estimates.
- **C.** Temporal Difference Learning does not require exploration.
- **D.** Temporal Difference Learning guarantees convergence.

**Supplied answer:** A. Temporal Difference Learning is computationally less expensive.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q183"></a>
### Q183 — `C2-M4` · `review`

What is the role of the learning rate 1 in the Q-learning algorithm?

- **A.** It determines the discount factor for future rewards
- **B.** It controls the exploration rate in the action selection process
- **C.** It adjusts the step size for updating the action values
- **D.** It defines the probability of choosing a random action

**Supplied answer:** C. It adjusts the step size for updating the action values

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q184"></a>
### Q184 — `C2-M3` · `review`

What is temporal-difference learning primarily used for?

- **A.** Supervised learning
- **B.** Unsupervised learning
- **C.** Reinforcement learning
- **D.** None of the above

**Supplied answer:** C. Reinforcement learning

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q185"></a>
### Q185 — `C2-M5` · `usable`

In the context of reinforcement learning, what does the term "planning" typically refer to?

- **A.** Executing actions based on a fixed strategy
- **B.** Learning from immediate rewards only
- **C.** Using a model to evaluate future actions and outcomes
- **D.** Randomly exploring the environment

**Supplied answer:** C. Using a model to evaluate future actions and outcomes

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q186"></a>
### Q186 — `C1-M4` · `review`

What is the Bellman equation used for in reinforcement learning?

- **A.** To calculate the optimal policy
- **B.** To calculate the expected reward
- **C.** To calculate the transition probabilities
- **D.** To calculate the value function

**Supplied answer:** D. To calculate the value function

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q187"></a>
### Q187 — `C2-M3` · `usable`

In Temporal Difference(0), how is the state-value function updated?

- **A.** By taking the derivative of the reward function.
- **B.** By using the Bellman equation.
- **C.** By averaging the rewards over time.
- **D.** By randomly selecting new state values.

**Supplied answer:** B. By using the Bellman equation.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q188"></a>
### Q188 — `C2-M2` · `verify`

Which Monte Carlo method updates value estimates based on the average returns observed from state

- **A.** First-visit Monte Carlo
- **B.** Every-visit Monte Carlo
- **C.** Temporal Difference Learning
- **D.** Q-learning

**Supplied answer:** A. First-visit Monte Carlo

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** First-visit and every-visit MC both average returns; they differ in which within-episode visits are counted.

[Back to master index](#master-scan-index)

---

<a id="q189"></a>
### Q189 — `C1-M5` · `usable`

In Policy Iteration, which step involves evaluating the current policy's performance and updating the val function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** A. Policy Evaluation

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q190"></a>
### Q190 — `OUT` · `discard`

Which of the following is an example of generalization?

- **A.** A dog Salivates only to the sound of a specific bell.
- **B.** Astudent raises their hand only in one particular classroom.
- **C.** Achild calls all four-legged animals "dog".
- **D.** A person can tell the difference between a real and a fake smile.

**Supplied answer:** C. Achild calls all four-legged animals "dog".

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q191"></a>
### Q191 — `OUT` · `discard`

What makes sending human missions to explore stars particularly challenging?

- **A.** Stars are constantly moving at high speeds.
- **B.** The distances are too great for current spacecraft speeds.
- **C.** Lack of interest from astronauts.
- **D.** Stars have unpredictable weather patterns.

**Supplied answer:** B. The distances are too great for current spacecraft speeds.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q192"></a>
### Q192 — `C3-M5` · `review`

What is the advantage of using a baseline in policy gradient methods?

- **A.** It reduces the variance of gradient estimates
- **B.** It increases the learning rate
- **C.** It guarantees convergence to the optimal policy
- **D.** It simplifies the action selection process

**Supplied answer:** A. It reduces the variance of gradient estimates

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q193"></a>
### Q193 — `C3-M5` · `review`

In policy gradient algorithms, what is the role of the objective function?

- **A.** To minimize the variance of the policy
- **B.** To maximize the expected cumulative reward
- **C.** To regularize the policy parameters
- **D.** To penalize exploration

**Supplied answer:** B. To maximize the expected cumulative reward

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q194"></a>
### Q194 — `OUT` · `discard`

Which Monte Carlo method is particularly useful for high-dimensional integration?

- **A.** Markov Chain Monte Carlo (MCMC)
- **B.** Simple Random Sampling
- **C.** Stratified Sampling
- **D.** Bootstrap Sampling

**Supplied answer:** A. Markov Chain Monte Carlo (MCMC)

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q195"></a>
### Q195 — `C2-M4` · `review`

In SARSA, the next action 1' is chosen based on which policy?

- **A.** The current Q-values without any exploration
- **B.** A fixed policy not related to Q-values
- **C.** The same policy used to generate the current action A
- **D.** Arandom selection independent of the policy

**Supplied answer:** C. The same policy used to generate the current action A

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q196"></a>
### Q196 — `C2-M4` · `usable`

Which of the following is true about the exploration-exploitation trade-off in Q-learning?

- **A.** It deals with the agent's tendency to choose the most rewarding action always
- **B.** It addresses the need to explore new actions and exploit known rewarding actions
- **C.** It ensures the agent always explores new states
- **D.** It focuses on minimizing the Q-values of all actions

**Supplied answer:** B. It addresses the need to explore new actions and exploit known rewarding actions

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q197"></a>
### Q197 — `C2-M4` · `review`

In Q-learning, the update rule uses which action's reward to update the Q-values?

- **A.** The action dictated by the current policy.
- **B.** The action chosen by an exploration strategy.
- **C.** The action chosen by a different policy.
- **D.** The action with the highest estimated Q-value.

**Supplied answer:** B. The action chosen by an exploration strategy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q198"></a>
### Q198 — `C2-M4` · `usable`

What is the main objective of the Q-learning algorithm?

- **A.** To minimize the state-action pair values
- **B.** To maximize the total reward over time
- **C.** To minimize the exploration rate
- **D.** To maximize the number of actions taken

**Supplied answer:** B. To maximize the total reward over time

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q199"></a>
### Q199 — `C2-M4` · `usable`

What does SARSA stand for in the context of reinforcement learning?

- **A.** State-Action-Reward-State-Action
- **B.** State-Action-Reward-Sequence-Action
- **C.** State-Action-Return-State-Action
- **D.** State-Action-Reward-State-Adaptation

**Supplied answer:** A. State-Action-Reward-State-Action

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q200"></a>
### Q200 — `C2-M4` · `usable`

What role does the policy's probability distribution play in Expected Sarsa?

- **A.** It determines which action to take next
- **B.** It weights the Q-values of possible actions to compute the expected value
- **C.** Itis used to calculate the maximum Q-value of the next state
- **D.** It helps in selecting the greedy action for the update rule

**Supplied answer:** B. It weights the Q-values of possible actions to compute the expected value

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q201"></a>
### Q201 — `C3-M5` · `usable`

How are policy gradient algorithms typically applied to continuous action spaces?

- **A.** By discretizing the action space
- **B.** By using actor-critic architectures
- **C.** By applying Gaussian policy distributions
- **D.** By incorporating additional reward functions

**Supplied answer:** C. By applying Gaussian policy distributions

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q202"></a>
### Q202 — `C1-M4` · `verify`

What does the optimal value function represent?

- **A.** The maximum reward achievable from a given state
- **B.** The minimum reward achievable from a given state
- **C.** The average reward achievable from a given state
- **D.** The discounted future reward achievable from a given state

**Supplied answer:** A. The maximum reward achievable from a given state

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.
**Audit note:** The optimal value is maximum expected return, \(v_*(s)=\max_\pi\mathbb E_\pi[G_t\mid S_t=s]\), not a single maximum reward.

[Back to master index](#master-scan-index)

---

<a id="q203"></a>
### Q203 — `C3-M5` · `review`

Which parameter determines the degree of exploration in Actor-Critic with Softmax Policies?

- **A.** Learning rate
- **B.** Temperature parameter
- **C.** Discount factor
- **D.** Advantage function

**Supplied answer:** B. Temperature parameter

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q204"></a>
### Q204 — `C1-M3` · `usable`

What role does the reward signal play in adjusting the parameters of a policy?

- **A.** It determines the size of the neural network
- **B.** It guides the policy towards actions that lead to higher rewards
- **C.** It defines the state space of the environment
- **D.** It regulates the exploration rate

**Supplied answer:** B. It guides the policy towards actions that lead to higher rewards

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q205"></a>
### Q205 — `C2-M4` · `usable`

Why is it important to update Q-values iteratively in Q-learning?

- **A.** To ensure the immediate reward is maximized
- **B.** To approximate the optimal action-value function over time
- **C.** To maintain a fixed policy
- **D.** To prevent overfitting to the training data and testing step

**Supplied answer:** B. To approximate the optimal action-value function over time

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q206"></a>
### Q206 — `C1-M4` · `usable`

What is the primary purpose of the state value function in reinforcement learning?

- **A.** To determine the probability of taking a certain action
- **B.** To estimate the future rewards from a given state
- **C.** To record the history of visited states
- **D.** To minimize the error rate of predictions

**Supplied answer:** B. To estimate the future rewards from a given state

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q207"></a>
### Q207 — `C3-M2` · `usable`

In the context of gradient descent, what is a 'learning rate'?

- **A.** The amount of data processed per iteration
- **B.** The step size used to update the parameters
- **C.** The total number of iterations
- **D.** The rate at which the model's performance improves

**Supplied answer:** B. The step size used to update the parameters

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q208"></a>
### Q208 — `C1-M2` · `usable`

What does the epsilon (€) represent in the ¢-greedy algorithm?

- **A.** The probability of selecting a random arm.
- **B.** The reward received from the best arm.
- **C.** The rate of learning over time.
- **D.** The number of arms in the problem.

**Supplied answer:** A. The probability of selecting a random arm.

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q209"></a>
### Q209 — `C3-M2` · `review`

Which variant of gradient descent is typically used in reinforcement learning to handle large and contin state spaces?

- **A.** Mini-batch gradient descent
- **B.** Stochastic gradient descent (SGD)
- **C.** Batch gradient descent
- **D.** None of the above

**Supplied answer:** B. Stochastic gradient descent (SGD)

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q210"></a>
### Q210 — `C2-M4` · `usable`

In the Q-learning algorithm, what is the main goal when updating the Q-values?

- **A.** To maximize the immediate reward
- **B.** To find the shortest path
- **C.** To minimize the temporal difference error
- **D.** To maximize the exploration rate

**Supplied answer:** C. To minimize the temporal difference error

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q211"></a>
### Q211 — `C1-M4` · `review`

Which function is typically used to represent the action value in reinforcement learning?

- **A.** Reward function (R)
- **B.** Value function (V)
- **C.** Policy function (n)
- **D.** Q-function (Q)

**Supplied answer:** D. Q-function (Q)

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q212"></a>
### Q212 — `C3-M5` · `verify`

Which type of policy directly associates actions with states without using a value function?

- **A.** Value-based policy
- **B.** Model-based policy
- **C.** Policy-based policy
- **D.** Q-learning policy

**Supplied answer:** C. Policy-based policy

**Index inference:** Course 3 · Policy gradient and actor–critic · direct policy representation.
**Audit note:** A directly parameterized policy maps states to action probabilities/actions without greedy selection from a value function.

[Back to master index](#master-scan-index)

---

<a id="q213"></a>
### Q213 — `C2-M4` · `review`

In SARSA, what is typically done if the learning rate (alpha) is too high?

- **A.** The algorithm converges too slowly.
- **B.** The algorithm might not converge and the Q-values will fluctuate.
- **C.** The algorithm will ignore the discount factor (gamma).
- **D.** The rewards will not be properly discounted.

**Supplied answer:** B. The algorithm might not converge and the Q-values will fluctuate.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q214"></a>
### Q214 — `C1-M5` · `review`

What is the Bellman equation used for in dynamic programming?

- **A.** To minimize a cost function over time.
- **B.** To find the shortest path in a graph.
- **C.** To determine the value of a decision problem.
- **D.** To maximize profit in a business model.

**Supplied answer:** C. To determine the value of a decision problem.

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q215"></a>
### Q215 — `C2-M4` · `review`

Which algorithm typically results in smoother learning updates, reducing variance in the updates?

- **A.** Sarsa
- **B.** Expected Sarsa
- **C.** Q-learning
- **D.** Monte Carlo methods

**Supplied answer:** B. Expected Sarsa

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · Expected Sarsa.

[Back to master index](#master-scan-index)

---

<a id="q216"></a>
### Q216 — `C1-M3` · `usable`

Which of the following is NOT a component of the reinforcement learning framework?

- **A.** Agent
- **B.** Environment
- **C.** Memory
- **D.** Reward Signal

**Supplied answer:** C. Memory

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · RL framework.

[Back to master index](#master-scan-index)

---

<a id="q217"></a>
### Q217 — `C1-M4` · `usable`

What is the objective of estimating action values in reinforcement learning?

- **A.** To determine the optimal policy
- **B.** To compute the state values
- **C.** To minimize the temporal difference error
- **D.** To calculate the reward function

**Supplied answer:** A. To determine the optimal policy

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q218"></a>
### Q218 — `OUT` · `discard`

Which task type is more conducive to forming habits?

- **A.** Episodic tasks.
- **B.** Continuing tasks.
- **C.** Both episodic and continuing tasks.
- **D.** Neither episodic nor continuing tasks.

**Supplied answer:** B. Continuing tasks.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q219"></a>
### Q219 — `C2-M4` · `usable`

Which of the following is the key difference between SARSA and Q-learning?

- **A.** SARSA is on-policy, while Q-learning is off-policy.
- **B.** SARSA is off-policy, while Q-learning is on-policy.
- **C.** SARSA does not use a learning rate, while Q-learning does.
- **D.** SARSA is deterministic, while Q-learning is stochastic.

**Supplied answer:** A. SARSA is on-policy, while Q-learning is off-policy.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q220"></a>
### Q220 — `C3-M2` · `usable`

In the context of Temporal Difference (TD) learning, which feature of Tabular TD learning makes it a sp case of linear semi-gradient TD learning?

- **A.** The use of function approximation.
- **B.** The use of linear functions.
- **C.** The discretization of state space into individual entries.
- **D.** The non-linear combination of features.

**Supplied answer:** C. The discretization of state space into individual entries.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q221"></a>
### Q221 — `C2-M4` · `review`

What is the primary challenge addressed by the SARSA (State-Action-Reward-State-Action) algorithm compared to Q-learning?

- **A.** SARSA does not require a model of the environment
- **B.** SARSA directly optimizes the policy without estimating action values
- **C.** SARSA uses the action taken in the next state for updates, leading to on-policy learning
- **D.** SARSA avoids the need for a discount factor

**Supplied answer:** C. SARSA uses the action taken in the next state for updates, leading to on-policy learning

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q222"></a>
### Q222 — `C1-M5` · `review`

Which of the following is NOT a characteristic of a problem suitable for dynamic programming?

- **A.** Optimal substructure
- **B.** Overlapping subproblems
- **C.** Greedy solution approach
- **D.** Recursion

**Supplied answer:** C. Greedy solution approach

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q223"></a>
### Q223 — `C3-M2` · `usable`

What is the main advantage of using function approximation in reinforcement learning?

- **A.** Faster convergence
- **B.** Reduced computational complexity
- **C.** Ability to generalize across states
- **D.** Increased exploration

**Supplied answer:** C. Ability to generalize across states

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q224"></a>
### Q224 — `C2-M2` · `verify`

Which of the following methods is primarily used to estimate action values in model-free reinforcement learning?

- **A.** Policy gradient methods
- **B.** Monte Carlo methods
- **C.** Temporal Difference learning
- **D.** Dynamic programming

**Supplied answer:** C. Temporal Difference learning

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · model-free value estimation.
**Audit note:** Both Monte Carlo and TD estimate model-free action values, so the item has two valid answers.

[Back to master index](#master-scan-index)

---

<a id="q225"></a>
### Q225 — `C3-M5` · `review`

In numerical methods, what is one limitation of estimating the gradient using samples?

- **A.** It always provides an exact solution
- **B.** It cannot handle non-linear functions
- **C.** Itis sensitive to the choice of step size
- **D.** It requires knowledge of calculus

**Supplied answer:** C. Itis sensitive to the choice of step size

**Index inference:** Course 3 · Policy gradient and actor–critic · sample policy-gradient estimation.

[Back to master index](#master-scan-index)

---

<a id="q226"></a>
### Q226 — `C3-M5` · `verify`

What is the advantage of using the Actor-Critic algorithm over other reinforcement learning methods?

- **A.** lt requires less computational resources
- **B.** Itis more stable and faster to converge
- **C.** It guarantees convergence to the optimal policy
- **D.** Itis less sensitive to hyperparameter tuning

**Supplied answer:** B. Itis more stable and faster to converge

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.
**Audit note:** Actor–critic may lower variance and learn online, but it is not universally faster or more stable.

[Back to master index](#master-scan-index)

---

<a id="q227"></a>
### Q227 — `C2-M5` · `usable`

Which of the following is a primary purpose of using a model in reinforcement learning?

- **A.** To visualize data
- **B.** To predict the next action of an agent
- **C.** To simulate the environment's response to different actions
- **D.** To increase the speed of the learning process

**Supplied answer:** C. To simulate the environment's response to different actions

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q228"></a>
### Q228 — `C2-M4` · `review`

In the SARSA algorithm, what is the role of the discount factor 1?

- **A.** It determines the rate at which the algorithm explores new actions.
- **B.** It balances the trade-off between immediate and future rewards.
- **C.** It adjusts the learning rate dynamically.
- **D.** It scales the rewards to be in the range of [0,1].

**Supplied answer:** B. It balances the trade-off between immediate and future rewards.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q229"></a>
### Q229 — `C3-M2` · `verify`

Which of the following methods combines linear function approximation with policy improvement?

- **A.** Policy Gradient Methods
- **B.** Value Iteration
- **C.** Actor-Critic Methods
- **D.** Tabular Q-Learning

**Supplied answer:** C. Actor-Critic Methods

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.
**Audit note:** Multiple methods combine linear approximation and improvement, including semi-gradient Sarsa and actor–critic variants.

[Back to master index](#master-scan-index)

---

<a id="q230"></a>
### Q230 — `C2-M3` · `verify`

In the context of Temporal Difference (TD), what is the main objective of the TD(0) algorithm?

- **A.** To maximize the immediate reward.
- **B.** To minimize the temporal difference error.
- **C.** To reduce the variance of the estimate.
- **D.** To explore the state-action space.

**Supplied answer:** B. To minimize the temporal difference error.

**Index inference:** Course 2 · TD prediction · TD prediction.
**Audit note:** TD(0) estimates a policy value with one-step bootstrapped targets; it is not generally gradient descent on squared TD error.

[Back to master index](#master-scan-index)

---

<a id="q231"></a>
### Q231 — `C2-M3` · `review`

What is the main advantage of temporal-difference learning over other reinforcement learning methods

- **A.** lt requires less computational resources.
- **B.** It can handle non-stationary environments.
- **C.** It doesn't rely on rewards.
- **D.** It guarantees optimal policy convergence.

**Supplied answer:** A. lt requires less computational resources.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q232"></a>
### Q232 — `C2-M5` · `usable`

In reinforcement learning, what is a model-based approach?

- **A.** An approach where the agent learns a policy without any knowledge of the environment
- **B.** An approach where the agent uses a model of the environment to plan actions
- **C.** An approach where the agent is supervised by a teacher
- **D.** An approach where the agent learns solely through trial and error

**Supplied answer:** B. An approach where the agent uses a model of the environment to plan actions

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q233"></a>
### Q233 — `C2-M3` · `usable`

What is the key objective of using a Temporal Difference (TD) learning algorithm? (choose the best answer/core idea of TD learning)

- **A.** To estimate the value of a state based on the complete return from a full episode.
- **B.** To update the value function by using the difference between successive state values.
- **C.** To learn the optimal value function without requiring a model of the environment's dynamics.
- **D.** To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.

**Supplied answer:** D. To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q234"></a>
### Q234 — `C2-M5` · `verify`

Which of the following methods is associated with distribution models for handling uncertainty in state transitions?

- **A.** Markov Decision Processes (MDPs)
- **B.** Policy Gradient Methods
- **C.** Particle Filters
- **D.** Q-Learning

**Supplied answer:** C. Particle Filters

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** A distribution model represents \(p(s',r\mid s,a)\); particle filtering is a different belief-approximation issue.

[Back to master index](#master-scan-index)

---

<a id="q235"></a>
### Q235 — `C3-M5` · `review`

What does the exploration in Gaussian policies rely on?

- **A.** Random noise added to the mean action
- **B.** Random sampling from a uniform distribution
- **C.** Fixed exploration rate
- **D.** Adaptive exploration based on reward feedback

**Supplied answer:** A. Random noise added to the mean action

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q236"></a>
### Q236 — `C2-M4` · `usable`

Which of the following algorithms is commonly used in reinforcement learning?

- **A.** k-Nearest Neighbors
- **B.** Q-Learning
- **C.** Principal Component Analysis
- **D.** Decision Trees

**Supplied answer:** B. Q-Learning

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q237"></a>
### Q237 — `C2-M4` · `review`

What is a potential disadvantage of using Expected Sarsa over Sarsa?

- **A.** It tends to have higher variance in updates
- **B.** It requires knowledge of the policy's action probabilities
- **C.** It converges more slowly than Sarsa
- **D.** It cannot be used in online learning settings

**Supplied answer:** B. It requires knowledge of the policy's action probabilities

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q238"></a>
### Q238 — `C1-M2` · `usable`

In the sample average method, what does the step size parameter determine?

- **A.** The total number of actions taken
- **B.** The influence of the most recent reward on the estimate
- **C.** The number of ads to display
- **D.** The initial value of Q

**Supplied answer:** B. The influence of the most recent reward on the estimate

**Index inference:** Course 1 · Sequential decision-making / bandits · sample-average action values.

[Back to master index](#master-scan-index)

---

<a id="q239"></a>
### Q239 — `C3-M5` · `usable`

Which technique is commonly used to reduce the variance of policy gradient estimates?

- **A.** Actor-Critic methods
- **B.** Temporal Difference learning
- **C.** Monte Carlo Tree Search
- **D.** Model-based reinforcement learning

**Supplied answer:** A. Actor-Critic methods

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q240"></a>
### Q240 — `C3-M5` · `review`

What is the main challenge associated with using parameterized policies in reinforcement learning?

- **A.** They are computationally expensive
- **B.** They often lead to overfitting
- **C.** They require a large amount of training data
- **D.** They can suffer from local optima

**Supplied answer:** D. They can suffer from local optima

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q241"></a>
### Q241 — `C3-M5` · `review`

What is the advantage of using a higher number of sample points in estimating the gradient?

- **A.** Increased accuracy
- **B.** Decreased computation time
- **C.** Reduced memory usage
- **D.** Smaller margin of error

**Supplied answer:** A. Increased accuracy

**Index inference:** Course 3 · Policy gradient and actor–critic · sample policy-gradient estimation.

[Back to master index](#master-scan-index)

---

<a id="q242"></a>
### Q242 — `C2-M3` · `usable`

Which statement best describes Tabular Temporal Difference (TD) learning?

- **A.** It uses a table to store values for each state-action pair.
- **B.** It uses function approximation to estimate value functions.
- **C.** It updates values based on rewards and state transitions without using tables.
- **D.** It requires the exact model of the environment.

**Supplied answer:** A. It uses a table to store values for each state-action pair.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q243"></a>
### Q243 — `C2-M5` · `review`

What does the Q-Learning update do in the context of planning?

- **A.** It generates new states.
- **B.** It improves the policy based on updated action values.
- **C.** It eliminates the need for a model.
- **D.** It only focuses on real-world experiences.

**Supplied answer:** B. It improves the policy based on updated action values.

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q244"></a>
### Q244 — `C2-M4` · `usable`

In expected Sarsa, the weights used in the expectation calculation are based on:

- **A.** The rewards received
- **B.** The probability of taking each action under the agent's policy
- **C.** The number of actions available
- **D.** The current state of the environment

**Supplied answer:** B. The probability of taking each action under the agent's policy

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q245"></a>
### Q245 — `C1-M3` · `usable`

Which algorithm is commonly used to solve an MDP?

- **A.** K-means clustering
- **B.** Breadth-first search
- **C.** Value iteration
- **D.** Gradient descent

**Supplied answer:** C. Value iteration

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q246"></a>
### Q246 — `C2-M2` · `verify`

What is a common approach to reduce the variance in Monte Carlo estimates?

- **A.** Using a discount factor.
- **B.** Using importance sampling.
- **C.** Using eligibility traces.
- **D.** Using linear function approximation.

**Supplied answer:** B. Using importance sampling.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** Importance sampling is not automatically variance reducing; ordinary off-policy importance sampling may have very high variance.

[Back to master index](#master-scan-index)

---

<a id="q247"></a>
### Q247 — `C2-M2` · `usable`

In contrast to Dynamic Programming and Monte Carlo methods, what aspect makes Temporal Difference (TD) methods more suitable for online learning?

- **A.** TD methods are slower to update values.
- **B.** TD methods require extensive computational resources.
- **C.** TD methods update values based on incomplete sequences.
- **D.** TD methods are less flexible in adapting to changing environments.

**Supplied answer:** C. TD methods update values based on incomplete sequences.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q248"></a>
### Q248 — `C1-M4` · `verify`

What is the Bellman equation used for in the context of MDPs?

- **A.** To determine the optimal policy.
- **B.** To update the value function.
- **C.** To calculate the transition probabilities.
- **D.** To find the immediate reward.

**Supplied answer:** B. To update the value function.

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.
**Audit note:** A Bellman equation expresses a recursive value relationship; an algorithm may use it to update estimates.

[Back to master index](#master-scan-index)

---

<a id="q249"></a>
### Q249 — `C3-M2` · `review`

In the context of linear function approximation, what is the gradient of the value function approximation?

- **A.** The true value of the state
- **B.** The feature vector in that state
- **C.** The mean squared error
- **D.** The policy value

**Supplied answer:** B. The feature vector in that state

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q250"></a>
### Q250 — `C1-M5` · `usable`

Which phase of Policy Iteration involves updating the policy based on the current value function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** B. Policy Improvement

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q251"></a>
### Q251 — `C3-M2` · `review`

In the context of function approximation, what does Mu of S represent?

- **A.** The total number of states
- **B.** The probability distribution of state visits
- **C.** The error in value function approximation
- **D.** The learning rate of the algorithm

**Supplied answer:** B. The probability distribution of state visits

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q252"></a>
### Q252 — `C2-M4` · `verify`

What does the term "off-policy" refer to in the context of Expected Sarsa?

- **A.** Learning from actions that are not taken by the agent.
- **B.** Learning from actions that are taken by the agent.
- **C.** Learning without any prior knowledge of the environment.
- **D.** Learning that does not depend on the current policy.

**Supplied answer:** A. Learning from actions that are not taken by the agent.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · off-policy Expected Sarsa.
**Audit note:** Off-policy means behavior and target policies differ; it does not mean learning from actions the agent did not take.

[Back to master index](#master-scan-index)

---

<a id="q253"></a>
### Q253 — `C1-M4` · `usable`

What is the Bellman equation used for in the context of MDPs?

- **A.** To calculate the shortest path between states.
- **B.** To update the policy in reinforcement learning.
- **C.** To express the relationship between the value of a state and the values of its successor states.
- **D.** To compute the transition probabilities between states to get maximum rewards.

**Supplied answer:** C. To express the relationship between the value of a state and the values of its successor states.

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q254"></a>
### Q254 — `C2-M3` · `usable`

What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?

- **A.** TD methods require complete episodes for updating values.
- **B.** TD methods update values based on incomplete episodes.
- **C.** TD methods cannot handle incomplete episodes efficiently.
- **D.** TD methods do not rely on experiences for learning.

**Supplied answer:** B. TD methods update values based on incomplete episodes.

**Index inference:** Course 2 · TD prediction · TD versus Monte Carlo.

[Back to master index](#master-scan-index)

---

<a id="q255"></a>
### Q255 — `C3-M2` · `verify`

Which problem arises due to the use of linear function approximation in reinforcement learning?

- **A.** Overfitting
- **B.** Curse of dimensionality
- **C.** Underfitting
- **D.** Vanishing gradients

**Supplied answer:** C. Underfitting

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.
**Audit note:** Linear approximation may underfit, but this is not an inherent single 'problem' without assumptions about features.

[Back to master index](#master-scan-index)

---

<a id="q256"></a>
### Q256 — `C2-M3` · `verify`

In the context of Temporal Difference (TD), Which of the following is NOT a step in the TD(0) algorithm?

- **A.** Prediction
- **B.** Evaluation
- **C.** Backpropagation
- **D.** Bootstrapping

**Supplied answer:** C. Backpropagation

**Index inference:** Course 2 · TD prediction · TD prediction.
**Audit note:** TD(0) observes a transition, forms \(\delta=R+\gamma V(S')-V(S)\), and updates \(V(S)\); the listed steps are ill-defined.

[Back to master index](#master-scan-index)

---

<a id="q257"></a>
### Q257 — `C2-M5` · `verify`

What is the primary purpose of Dyna Architecture?

- **A.** To develop operating systems
- **B.** To design scalable web servers
- **C.** To model complex dynamic systems
- **D.** To manage database transactions

**Supplied answer:** C. To model complex dynamic systems

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.
**Audit note:** Dyna integrates learning, planning, and acting; none of the supplied options states that purpose.

[Back to master index](#master-scan-index)

---

<a id="q258"></a>
### Q258 — `C3-M2` · `review`

What is the main purpose of using optimistic initial values in function approximation?

- **A.** To ensure faster convergence
- **B.** To encourage exploration
- **C.** To minimize errors
- **D.** To guarantee optimal solutions

**Supplied answer:** B. To encourage exploration

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q259"></a>
### Q259 — `C2-M2` · `usable`

In the Monte Carlo prediction method, what is the purpose of using the policy π?

- **A.** To determine the sequence of states
- **B.** To generate episodes
- **C.** To update the value function
- **D.** To ensure convergence of the algorithm

**Supplied answer:** B. To generate episodes

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q260"></a>
### Q260 — `C3-M2` · `review`

What does the term "semi-gradient" refer to in the context of linear semi-gradient Temporal Difference learning?

- **A.** Using gradients to update the table values.
- **B.** Approximating gradients using a non-linear function.
- **C.** Using part of the gradient information to update parameters.
- **D.** Calculating exact gradients for function updates.

**Supplied answer:** C. Using part of the gradient information to update parameters.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q261"></a>
### Q261 — `C1-M4` · `usable`

In reinforcement learning, what does a stochastic policy do?

- **A.** Selects actions randomly with equal probability
- **B.** Selects the same action for a given state every time
- **C.** Selects actions based on a probability distribution
- **D.** Does not select any action

**Supplied answer:** C. Selects actions based on a probability distribution

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q262"></a>
### Q262 — `C1-M5` · `usable`

What does the term "greedification" refer to in the context of policy improvement?

- **A.** Making a policy more random
- **B.** Selecting actions that maximize the value function
- **C.** Evaluating the performance of a policy
- **D.** Following the original policy without changes

**Supplied answer:** B. Selecting actions that maximize the value function

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q263"></a>
### Q263 — `OUT` · `discard`

In an experiment, a pigeon is trained to peck a key when it sees a red light but not when it sees a green light. This is an example of:

- **A.** Generalization
- **B.** Spontaneous recovery
- **C.** Discrimination
- **D.** Habituation

**Supplied answer:** C. Discrimination

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q264"></a>
### Q264 — `C3-M2` · `review`

How many components does the feature vector have when there are four features and three actions in a stacked representation?

- **A.** 4
- **B.** 7
- **C.** 12
- **D.** 16

**Supplied answer:** C. 12

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q265"></a>
### Q265 — `C1-M5` · `usable`

In policy iteration, what is the role of the policy evaluation step?

- **A.** To improve the policy based on current estimates of the value function
- **B.** To randomly update the policy
- **C.** To compute the value function of the current policy
- **D.** To explore different policies without updating them

**Supplied answer:** C. To compute the value function of the current policy

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q266"></a>
### Q266 — `C2-M4` · `usable`

Which of the following exploration strategies is commonly used with SARSA?

- **A.** Softmax action selection
- **B.** Upper Confidence Bound (UCB)
- **C.** Epsilon-greedy
- **D.** Boltzmann exploration

**Supplied answer:** C. Epsilon-greedy

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q267"></a>
### Q267 — `C2-M5` · `verify`

Which type of reinforcement learning model typically uses Monte Carlo simulations to estimate values?

- **A.** Sample-based models
- **B.** Distribution models
- **C.** Both sample-based and distribution models
- **D.** Neither sample-based nor distribution models

**Supplied answer:** A. Sample-based models

**Index inference:** Course 2 · Models, planning, Dyna · sample models.
**Audit note:** Monte Carlo value estimation is sample-based learning; a 'sample model' is a separate model-based planning concept.

[Back to master index](#master-scan-index)

---

<a id="q268"></a>
### Q268 — `C1-M5` · `usable`

In Policy Iteration, which step involves evaluating the current policy's performance and updating the value function?

- **A.** Policy Evaluation
- **B.** Policy Improvement
- **C.** Policy Initialization
- **D.** Policy Iteration

**Supplied answer:** A. Policy Evaluation

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q269"></a>
### Q269 — `C2-M5` · `review`

Which of the following is a primary characteristic of a distribution model in reinforcement learning?

- **A.** It directly samples actions based on a policy.
- **B.** It approximates the transition dynamics of the environment.
- **C.** It only updates after the entire episode ends.
- **D.** It requires a deterministic policy.

**Supplied answer:** B. It approximates the transition dynamics of the environment.

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q270"></a>
### Q270 — `OUT` · `discard`

Which term describes a methodical approach to handling episodic tasks?

- **A.** Ad hoc management
- **B.** Reactive management
- **C.** Proactive management
- **D.** Time-blocking

**Supplied answer:** D. Time-blocking

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q271"></a>
### Q271 — `C1-M3` · `review`

Which term describes the probability distribution over next states given a current state and action in an MDP?

- **A.** Policy
- **B.** Reward function
- **C.** Transition model
- **D.** Value function

**Supplied answer:** C. Transition model

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

<a id="q272"></a>
### Q272 — `C2-M2` · `review`

What is the purpose of the accumulated product of important sampling ratios (W) in the off-policy Monte Carlo prediction algorithm?

- **A.** To store all past values of Rho
- **B.** To correct the returns generated by the behavior policy
- **C.** To calculate the average reward
- **D.** To simplify the algorithm

**Supplied answer:** B. To correct the returns generated by the behavior policy

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q273"></a>
### Q273 — `C3-M5` · `usable`

What is the advantage of using policy gradient methods over value-based methods like Q-learning?

- **A.** Better convergence guarantees
- **B.** Simpler implementation
- **C.** More efficient memory usage
- **D.** Ability to handle continuous action spaces

**Supplied answer:** D. Ability to handle continuous action spaces

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q274"></a>
### Q274 — `C2-M2` · `usable`

Which algorithm is commonly used for off-policy learning in reinforcement learning?

- **A.** Q-learning
- **B.** SARSA
- **C.** Deep Q-Network (DQN)
- **D.** Policy Gradient

**Supplied answer:** A. Q-learning

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q275"></a>
### Q275 — `C2-M2` · `usable`

What is one advantage of Temporal Difference (TD) methods over Dynamic Programming (DP) and Monte Carlo methods?

- **A.** TD methods are guaranteed to converge to the optimal solution.
- **B.** TD methods do not require knowledge of the complete environment dynamics.
- **C.** TD methods are computationally less expensive.
- **D.** TD methods can handle only episodic tasks efficiently.

**Supplied answer:** B. TD methods do not require knowledge of the complete environment dynamics.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q276"></a>
### Q276 — `C2-M2` · `usable`

What type of learning method is Monte Carlo prediction classified as?

- **A.** Supervised learning
- **B.** Unsupervised learning
- **C.** Semi-supervised learning
- **D.** Reinforcement learning

**Supplied answer:** D. Reinforcement learning

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q277"></a>
### Q277 — `C2-M3` · `usable`

Which of the following is a characteristic of temporal-difference learning algorithms?

- **A.** They require labeled data for training.
- **B.** They learn from delayed rewards.
- **C.** They are only applicable in stationary environments.
- **D.** They rely solely on a pre-defined set of rules.

**Supplied answer:** B. They learn from delayed rewards.

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q278"></a>
### Q278 — `C2-M2` · `usable`

Which of the following statements about Monte Carlo methods is true?

- **A.** Monte Carlo methods require knowledge of the environment's model.
- **B.** Monte Carlo methods update action values incrementally during an episode.
- **C.** Monte Carlo methods update action values only at the end of an episode.
- **D.** Monte Carlo methods can only be applied to deterministic environments.

**Supplied answer:** C. Monte Carlo methods update action values only at the end of an episode.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q279"></a>
### Q279 — `C2-M2` · `verify`

Why is maintaining exploration important in Monte Carlo methods?

- **A.** To ensure rapid convergence
- **B.** To prevent the algorithm from getting stuck in local optima
- **C.** To reduce memory usage
- **D.** To increase the speed of computation

**Supplied answer:** B. To prevent the algorithm from getting stuck in local optima

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.
**Audit note:** Exploration provides sufficient state–action coverage; 'avoid local optima' is imprecise here.

[Back to master index](#master-scan-index)

---

<a id="q280"></a>
### Q280 — `C2-M4` · `usable`

Which of the following statements is true regarding the update rule of Expected Sarsa?

- **A.** It only updates based on the greedy action
- **B.** It updates based on a weighted sum of Q-values for all possible actions
- **C.** It requires the entire model of the environment
- **D.** It updates based on the worst possible action

**Supplied answer:** B. It updates based on a weighted sum of Q-values for all possible actions

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q281"></a>
### Q281 — `C2-M5` · `review`

What is the primary objective of Random Tabular Q-planning in reinforcement learning?

- **A.** To find the shortest path in a graph
- **B.** To estimate the value function for a policy
- **C.** To optimize the policy for better future rewards
- **D.** To model the environment dynamics

**Supplied answer:** C. To optimize the policy for better future rewards

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q282"></a>
### Q282 — `C2-M2` · `usable`

What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?

- **A.** TD methods require complete episodes for updating values.
- **B.** TD methods update values based on incomplete episodes.
- **C.** TD methods cannot handle incomplete episodes efficiently.
- **D.** TD methods do not rely on experiences for learning.

**Supplied answer:** B. TD methods update values based on incomplete episodes.

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q283"></a>
### Q283 — `C2-M4` · `usable`

How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?

- **A.** By using a fixed learning rate.
- **B.** By averaging over all possible actions.
- **C.** By always selecting the action with the highest Q-value.
- **D.** By ignoring the reward signal.

**Supplied answer:** B. By averaging over all possible actions.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q284"></a>
### Q284 — `OUT` · `discard`

How can overfitting be addressed in machine learning models?

- **A.** By reducing the complexity of the model
- **B.** By increasing the complexity of the model
- **C.** By ignoring the validation data
- **D.** By introducing more noise into the training data

**Supplied answer:** A. By reducing the complexity of the model

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.

[Back to master index](#master-scan-index)

---

<a id="q285"></a>
### Q285 — `C2-M4` · `usable`

In the SARSA algorithm, what role does the learning rate (\alpha) play?

- **A.** It determines how much new information overrides the old information.
- **B.** It sets the probability of taking a random action.
- **C.** It defines the discount factor for future rewards.
- **D.** It specifies the exploration-exploitation trade-off.

**Supplied answer:** A. It determines how much new information overrides the old information.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q286"></a>
### Q286 — `C2-M4` · `usable`

In Q-learning, what role does the learning rate (\alpha) play in the update rule?

- **A.** It determines how much the current Q-value is updated.
- **B.** It determines how often the policy is changed.
- **C.** It sets the exploration rate.
- **D.** It sets the discount factor for future rewards.

**Supplied answer:** A. It determines how much the current Q-value is updated.

**Index inference:** Course 2 · Sarsa, Q-learning, Expected Sarsa · TD control.

[Back to master index](#master-scan-index)

---

<a id="q287"></a>
### Q287 — `C2-M5` · `review`

What is one of the main challenges when using distribution models in reinforcement learning?

- **A.** High variance in action selection.
- **B.** The need for large amounts of interaction data.
- **C.** Difficulty in accurately modeling the environment's dynamics.
- **D.** Slow convergence to the optimal policy.

**Supplied answer:** C. Difficulty in accurately modeling the environment's dynamics.

**Index inference:** Course 2 · Models, planning, Dyna · models and planning.

[Back to master index](#master-scan-index)

---

<a id="q288"></a>
### Q288 — `C2-M2` · `usable`

Which of the following is an advantage of off-policy learning?

- **A.** It requires less computational resources
- **B.** It guarantees convergence to the optimal policy
- **C.** It allows learning from non-optimal behavior
- **D.** It eliminates the need for exploration entirely

**Supplied answer:** C. It allows learning from non-optimal behavior

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · Monte Carlo / off-policy.

[Back to master index](#master-scan-index)

---

<a id="q289"></a>
### Q289 — `C2-M3` · `review`

What does the "difference" in temporal-difference learning refer to?

- **A.** The difference between rewards and penalties
- **B.** The difference between observed and predicted values
- **C.** The difference between input and output data
- **D.** The difference between model parameters

**Supplied answer:** B. The difference between observed and predicted values

**Index inference:** Course 2 · TD prediction · TD prediction.

[Back to master index](#master-scan-index)

---

<a id="q290"></a>
### Q290 — `C2-M2` · `usable`

Which technique in reinforcement learning allows learning from historical data while following a different policy?

- **A.** On-policy learning
- **B.** Off-policy learning
- **C.** Model-based learning
- **D.** Temporal Difference learning

**Supplied answer:** B. Off-policy learning

**Index inference:** Course 2 · Monte Carlo, off-policy, importance sampling · off-policy learning.

[Back to master index](#master-scan-index)

---

<a id="q291"></a>
### Q291 — `C3-M2` · `usable`

What does state aggregation involve in reinforcement learning?

- **A.** Combining similar states into groups to reduce the dimensionality of the state space.
- **B.** Separating dissimilar states to increase the granularity of the state space.
- **C.** Ignoring certain states in the environment to simplify the learning process.
- **D.** Converting continuous state spaces into discrete state spaces.

**Supplied answer:** A. Combining similar states into groups to reduce the dimensionality of the state space.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q292"></a>
### Q292 — `C3-M3` · `usable`

Which of the following is a characteristic of states represented by coarse coding?

- **A.** Each state is represented by a unique, non-overlapping feature
- **B.** States are represented by overlapping features, allowing for generalization
- **C.** States are ignored and only actions are considered
- **D.** Each state is treated as a separate entity with no generalization

**Supplied answer:** B. States are represented by overlapping features, allowing for generalization

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q293"></a>
### Q293 — `C3-M3` · `usable`

What is a primary challenge when setting up Tile Coding?

- **A.** Ensuring non-overlapping tiles
- **B.** Selecting the number and size of tiles
- **C.** Finding the right discount factor
- **D.** Balancing exploration and exploitation

**Supplied answer:** B. Selecting the number and size of tiles

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q294"></a>
### Q294 — `C3-M5` · `review`

Which of the following methods is NOT typically used to learn the parameters of a Gaussian policy?

- **A.** Maximum likelihood estimation
- **B.** Policy gradient methods
- **C.** Q-Learning
- **D.** Actor-Critic methods

**Supplied answer:** C. Q-Learning

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q295"></a>
### Q295 — `C3-M2` · `usable`

When using Epsilon-greedy with function approximation, what role does the function approximator play?

- **A.** It generates the random exploration rate
- **B.** It approximates the Q-values for given states and actions
- **C.** It determines when to switch between exploration and exploitation
- **D.** It sets the value of epsilon

**Supplied answer:** B. It approximates the Q-values for given states and actions

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q296"></a>
### Q296 — `C3-M2` · `usable`

What is a parameterized function in the context of reinforcement learning?

- **A.** A function that takes no inputs and outputs a constant value.
- **B.** A function that uses parameters (weights) to approximate another function.
- **C.** A function that always returns the same value regardless of inputs.
- **D.** A function that randomly changes its parameters during training.

**Supplied answer:** B. A function that uses parameters (weights) to approximate another function.

**Index inference:** Course 3 · Prediction with function approximation · parameterized value functions.

[Back to master index](#master-scan-index)

---

<a id="q297"></a>
### Q297 — `C3-M2` · `review`

What role does the discount factor play in Semi-Gradient TD learning?

- **A.** It determines the rate of eligibility trace decay
- **B.** It controls the influence of future rewards on the updates
- **C.** It sets the exploration-exploitation trade-off
- **D.** It adjusts the learning rate dynamically during training

**Supplied answer:** B. It controls the influence of future rewards on the updates

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q298"></a>
### Q298 — `C3-M4` · `usable`

What is the significance of the average reward in reinforcement learning?

- **A.** It indicates the maximum achievable reward in an environment
- **B.** It helps in evaluating the performance of a learning agent over time
- **C.** It represents the instantaneous reward received at each time step
- **D.** It measures the variance in reward distribution

**Supplied answer:** B. It helps in evaluating the performance of a learning agent over time

**Index inference:** Course 3 · Control with approximation / average reward · average-reward control.

[Back to master index](#master-scan-index)

---

<a id="q299"></a>
### Q299 — `C3-M3` · `usable`

In coarse coding, what is the effect of having overlapping regions?

- **A.** It increases the complexity of the representation
- **B.** It reduces the chance of generalization across similar states
- **C.** It allows for better generalization and smoother function approximation
- **D.** It eliminates the need for exploration in reinforcement learning

**Supplied answer:** C. It allows for better generalization and smoother function approximation

**Index inference:** Course 3 · Coarse/tile coding and neural features · feature construction.

[Back to master index](#master-scan-index)

---

<a id="q300"></a>
### Q300 — `C3-M2` · `usable`

In which type of environments is state aggregation particularly useful?

- **A.** Environments with a very small state space.
- **B.** Environments with deterministic transitions.
- **C.** Environments with a very large or continuous state space.
- **D.** Environments with no reward structure.

**Supplied answer:** C. Environments with a very large or continuous state space.

**Index inference:** Course 3 · Prediction with function approximation · prediction with approximation.

[Back to master index](#master-scan-index)

---

<a id="q301"></a>
### Q301 — `C3-M5` · `review`

How are the actor and critic networks updated in Actor-Critic with Softmax Policies?

- **A.** Only the actor network is updated
- **B.** Only the critic network is updated
- **C.** Both the actor and critic networks are updated simultaneously
- **D.** The networks are updated independently

**Supplied answer:** C. Both the actor and critic networks are updated simultaneously

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q302"></a>
### Q302 — `C3-M5` · `usable`

What role does the critic play in Actor-Critic with Softmax Policies?

- **A.** It learns the policy function
- **B.** It calculates the probability distribution over actions
- **C.** It evaluates the quality of the policy chosen by the actor
- **D.** It determines the exploration rate

**Supplied answer:** C. It evaluates the quality of the policy chosen by the actor

**Index inference:** Course 3 · Policy gradient and actor–critic · policy gradient / actor–critic.

[Back to master index](#master-scan-index)

---

<a id="q303"></a>
### Q303 — `C1-M3` · `verify`

Which of the following is NOT a method for solving MDPs?

- **A.** Dynamic Programming
- **B.** Monte Carlo Methods
- **C.** Temporal Difference Learning
- **D.** Stochastic Gradient Descent

**Supplied answer:** D. Stochastic Gradient Descent

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.
**Audit note:** SGD is an optimizer used inside RL, so 'not a method for solving MDPs' depends on the intended level of abstraction.

[Back to master index](#master-scan-index)

---

<a id="q304"></a>
### Q304 — `C1-M5` · `review`

How does the flexibility of the Policy Iteration Framework contribute to robustness?

- **A.** By limiting the diversity of policies explored
- **B.** By allowing for rapid convergence to a single optimal policy
- **C.** By enabling adaptation to varying conditions or goals
- **D.** None of the above

**Supplied answer:** C. By enabling adaptation to varying conditions or goals

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q305"></a>
### Q305 — `C1-M2` · `usable`

In the context of the multi-armed bandit problem, what does the term "exploitation" refer to?

- **A.** Trying out different arms to gather information
- **B.** Using the known information to select the best arm
- **C.** Ignoring the past rewards and trying new strategies
- **D.** Allocating equal time to all arms

**Supplied answer:** B. Using the known information to select the best arm

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q306"></a>
### Q306 — `C1-M5` · `review`

What happens if the value function of a policy converges during Iterative Policy Evaluation?

- **A.** The optimal policy is achieved
- **B.** The value function becomes infinite
- **C.** The policy becomes deterministic
- **D.** The policy evaluation process stops

**Supplied answer:** D. The policy evaluation process stops

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.

[Back to master index](#master-scan-index)

---

<a id="q307"></a>
### Q307 — `OUT` · `discard`

How does hyperbolic discounting differ from exponential discounting?

- **A.** Hyperbolic discounting values future rewards more than exponential discounting.
- **B.** Exponential discounting values future rewards more than hyperbolic discounting.
- **C.** Both discount future rewards equally.
- **D.** Hyperbolic discounting is not related to time preference.

**Supplied answer:** A. Hyperbolic discounting values future rewards more than exponential discounting.

**Index inference:** Outside, corrupted, or only adjacent to named curricula · out-of-scope / corrupted.
**Audit note:** Hyperbolic discounting is steeper near the present and shallower at long delays; neither curve is always larger.

[Back to master index](#master-scan-index)

---

<a id="q308"></a>
### Q308 — `C1-M3` · `usable`

Which task type typically requires sustained effort over time?

- **A.** Episodic tasks.
- **B.** Continuing tasks.
- **C.** Both episodic and continuing tasks.
- **D.** Neither episodic nor continuing tasks.

**Supplied answer:** B. Continuing tasks.

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · continuing tasks.

[Back to master index](#master-scan-index)

---

<a id="q309"></a>
### Q309 — `C1-M4` · `usable`

What does the action value Q(s,a) represent in reinforcement learning?

- **A.** The probability of transitioning to state s from state a
- **B.** The expected return (total future reward) of taking action a in state s
- **C.** The immediate reward received after taking action a
- **D.** The average time it takes to transition from state s to state a

**Supplied answer:** B. The expected return (total future reward) of taking action a in state s

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q310"></a>
### Q310 — `C1-M4` · `usable`

Which notation is commonly used to represent the action-value function?

- **A.** V(s)
- **B.** R(s, a)
- **C.** Q(s, a)
- **D.** P(a|s)

**Supplied answer:** C. Q(s, a)

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.

[Back to master index](#master-scan-index)

---

<a id="q311"></a>
### Q311 — `C1-M5` · `verify`

In Policy Evaluation, what is the objective function typically used?

- **A.** Bellman Equation
- **B.** Logistic Regression
- **C.** Cost Function
- **D.** Gradient Descent

**Supplied answer:** A. Bellman Equation

**Index inference:** Course 1 · Dynamic programming and GPI · dynamic programming / GPI.
**Audit note:** The Bellman equation is a consistency equation, not an objective function.

[Back to master index](#master-scan-index)

---

<a id="q312"></a>
### Q312 — `C1-M3` · `review`

In what way do rewards contribute to the goal-oriented behavior of an agent?

- **A.** By encouraging trial and error
- **B.** By increasing randomness
- **C.** By decreasing motivation
- **D.** By providing feedback on progress

**Supplied answer:** D. By providing feedback on progress

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · reward signal.

[Back to master index](#master-scan-index)

---

<a id="q313"></a>
### Q313 — `C1-M4` · `verify`

In reinforcement learning, what is the Bellman equation used for?

- **A.** Calculating the optimal value function
- **B.** Estimating the value of actions
- **C.** Updating the policy
- **D.** Computing the expected reward

**Supplied answer:** A. Calculating the optimal value function

**Index inference:** Course 1 · Policies, values, Bellman equations · policies, values, Bellman equations.
**Audit note:** Bellman equations cover policy values and optimal values; they do not only 'calculate the optimal value function.'

[Back to master index](#master-scan-index)

---

<a id="q314"></a>
### Q314 — `C1-M2` · `usable`

Which method involves selecting actions based on their probability distribution determined by their estimated value functions?

- **A.** Epsilon-Greedy
- **B.** Upper Confidence Bound (UCB)
- **C.** Softmax
- **D.** Monte Carlo Tree Search

**Supplied answer:** C. Softmax

**Index inference:** Course 1 · Sequential decision-making / bandits · softmax action selection.

[Back to master index](#master-scan-index)

---

<a id="q315"></a>
### Q315 — `C1-M2` · `review`

Which exploration strategy selects actions according to a probability distribution that balances the known rewards with the potential for discovering new rewards?

- **A.** Softmax Action Selection
- **B.** Epsilon-Greedy
- **C.** Upper Confidence Bound (UCB)
- **D.** Temporal Difference Learning

**Supplied answer:** A. Softmax Action Selection

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q316"></a>
### Q316 — `C1-M2` · `usable`

What is the "exploration-exploitation trade-off" in reinforcement learning?

- **A.** The decision between using known information versus gathering new information
- **B.** The choice between high reward and low risk
- **C.** The balance between reward and punishment
- **D.** The selection between multiple reward mechanisms

**Supplied answer:** A. The decision between using known information versus gathering new information

**Index inference:** Course 1 · Sequential decision-making / bandits · exploration / bandits.

[Back to master index](#master-scan-index)

---

<a id="q317"></a>
### Q317 — `C1-M3` · `usable`

In reinforcement learning, what is an agent?

- **A.** A human supervisor
- **B.** A software program
- **C.** An entity that interacts with the environment
- **D.** A mathematical equation

**Supplied answer:** C. An entity that interacts with the environment

**Index inference:** Course 1 · MDPs, rewards, episodic vs continuing · MDP formulation.

[Back to master index](#master-scan-index)

---

## References

- Coursera course/module pages linked in the provenance table (accessed 2026-07-23).
- [Coursera Staff: Python projects for beginners](https://www.coursera.org/in/articles/python-projects-for-beginners) for the public Tic-Tac-Toe/Pygame description.
- Sutton and Barto, *Reinforcement Learning: An Introduction*, local copy: [course reference PDF](<1-Reinforcement Learning-An introduction.pdf>).
- Local lecture decks linked in the 90-minute refresh.

## Unresolved questions

- No official quiz export or course-internal source was supplied, so verbatim provenance cannot be established.
- The provided Tic-Tac-Toe URL may move or require sign-in; available public descriptions present it as a Python game-building project, not an RL theory module.
