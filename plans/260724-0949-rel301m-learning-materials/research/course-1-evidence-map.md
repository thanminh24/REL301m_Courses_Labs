# Course 1 Question-to-Slide Evidence Map

## Contract

This map reconciles all 81 `C1-*` questions in the
[revision index](../../../docs/final-exam-revision-question-index.md). Each ID appears once.
Confidence means:

- **A:** the answer-bearing concept is explicit on the cited slide(s);
- **B:** a coherent cited range supports the concept, but the question wording needs a small
  interpretation or caveat;
- **C / flagged:** the closest Course 1 slide provides context but does not teach the exact
  claim. The item is addressed as an evidence gap.

The supplied answer remains a **bank claim** even at confidence A. It is not silently promoted
to lecture truth. Duplicate demand families are Q045/Q248/Q253 and Q189/Q268.

## Deck legend

- **1.1:** [The K-Armed Bandit Problem](<../../../docs/slides/slides/1.1. The K-Armed Bandit Problem.pptx>)
- **1.2:** [Estimating Action Values](<../../../docs/slides/slides/1.2. Estimating Action Values.pptx>)
- **1.3:** [Exploration vs. Exploitation Tradeoff](<../../../docs/slides/slides/1.3 Exploration vs. Exploitation Tradeoff.pptx>)
- **1.4:** [Introduction to Markov Decision Processes](<../../../docs/slides/slides/1.4 Introduction to Markov Decision Processes  .pptx>)
- **1.5:** [Goal of Reinforcement Learning](<../../../docs/slides/slides/1.5 Goal of Reinforcement Learning .pptx>)
- **1.6:** [Continuing Tasks](<../../../docs/slides/slides/1.6 Continuing Tasks.pptx>)
- **1.7:** [Policies and Value Functions](<../../../docs/slides/slides/1.7 Policies and Value Functions.pptx>)
- **1.8:** [Bellman Equations](<../../../docs/slides/slides/1.8 Bellman Equations.pptx>)
- **1.9:** [Optimality](<../../../docs/slides/slides/1.9 Optimality (Optimal Policies & Value Functions).pptx>)
- **1.10:** [Policy Evaluation](<../../../docs/slides/slides/1.10 Policy Evaluation (Prediction).pptx>)
- **1.11:** [Policy Iteration](<../../../docs/slides/slides/1.11 Policy Iteration (Control) .pptx>)
- **1.12:** [Generalized Policy Iteration](<../../../docs/slides/slides/1.12 Generalized Policy Iteration.pptx>)

## Evidence rows

| Question | Normalized concept | Lecture / one-based slide evidence | Depth | Confidence | Ambiguity or supplied-claim caution |
|---|---|---|---|---|---|
| Q006 | Epsilon-greedy behavior | 1.3/14–15 | D3 | A | Epsilon is the exploration-branch probability. |
| Q011 | Value iteration | 1.12/6–10 | D3 | A | Deck supports value iteration; broad “solve MDPs” wording omits assumptions. |
| Q015 | Policy iteration under changed dynamics/goals | 1.11/9–16 | D3 | C / flagged | Framework for a given MDP is taught; automatic gradual adaptation to changes is not. |
| Q018 | Exploration–exploitation trade-off | 1.3/5–13 | D3 | A | “Monte Carlo” framing is incidental; cited concept is general. |
| Q020 | Exploitation in a bandit | 1.1/6; 1.3/9–12 | D3 | A | Exploitation uses the best current estimate, not guaranteed true best arm. |
| Q025 | Reward signal | 1.5/8–9; 1.1/4 | D3 | A | Reward is scalar feedback, not accumulated return. |
| Q031 | State value meaning | 1.7/9–10 | D3 | B | Supplied “expected reward” is too narrow; slide says expected return. |
| Q036 | RL objective | 1.5/4, 12 | D3 | A | Objective is total future/cumulative reward. |
| Q040 | Meaning of iterative evaluation | 1.10/8–14, 21–28 | D3 | A | Repeated value refinement continues to a tolerance/convergence condition. |
| Q041 | Control objective | 1.10/3, 6; 1.11/2–3 | D3 | A | Bank’s exploration-balance claim confuses a means with the control objective. |
| Q045 | Bellman recursive relationship | 1.8/3–8 | D3 | A | Exact-duplicate family with Q248/Q253. |
| Q046 | Bellman optimality significance | 1.8/6–7; 1.9/15–19 | D3 | B | It decomposes optimal **values**; “optimal policy” wording skips the value/argmax distinction. |
| Q052 | Continuing-task example | 1.6/3–10 | D3 | B | Daily practice is continuing only if treated as ongoing without a defined endpoint. |
| Q053 | Decaying epsilon | 1.3/14–15 | D3 | C / flagged | Deck teaches fixed epsilon-greedy, not a decreasing epsilon schedule. |
| Q061 | Discount factor in state value | 1.7/10; 1.6/11–15 | D3 | A | OCR `y` should be read as gamma; it weights delayed rewards. |
| Q064 | Optimistic initial values | 1.2/3–9; 1.3/10–12 | D3 | C / flagged | Neither optimism nor a decay remedy is taught; decaying exploration does not follow from these slides. |
| Q065 | Purpose of gamma | 1.6/11–15 | D3 | A | Gamma controls delayed-reward weight and finite discounted return. |
| Q068 | Policy definition | 1.7/3–7 | D3 | A | Deterministic mapping and stochastic distribution are both supported. |
| Q069 | Reward shaping | 1.5/4, 8–12 | D3 | C / flagged | Reward feedback is taught; technical reward shaping and its purpose are absent. |
| Q070 | Softmax temperature | 1.3/1–20 | D3 | C / flagged | Entire deck teaches epsilon-greedy only; no temperature parameter appears. |
| Q078 | Epsilon-soft policy | 1.3/14–15 | D3 | C / flagged | Epsilon-greedy is present; the epsilon-soft minimum-probability definition is absent. |
| Q080 | DP time complexity | 1.12/8–13 | D3 | C / flagged | Slides give qualitative small/large-state suitability, not a universal polynomial class. |
| Q082 | Discounting and immediate/delayed choice | 1.6/11–15 | D3 | A | Larger gamma gives delayed rewards relatively more weight. |
| Q088 | Basic RL components | 1.4/9–11; 1.5/7–9 | D3 | B | Required components are listed; “policy network” is not a required basic component here. |
| Q090 | State value | 1.7/9–10 | D3 | A | Expected return from a state under a policy. |
| Q095 | Decaying epsilon purpose | 1.3/14–15 | D3 | C / flagged | The deck supports epsilon’s role but not schedule decay. |
| Q096 | Epsilon-greedy as exploration | 1.3/14–15 | D3 | A | OCR-corrupted epsilon does not change the concept. |
| Q097 | Deterministic policy | 1.7/4–5 | D3 | A | One certain action per state. |
| Q100 | Negative reward | 1.5/4, 6, 9 | D3 | B | Deck frames negative feedback/punishment broadly; it does not guarantee one action is never repeated. |
| Q106 | Policy evaluation | 1.10/3–5 | D3 | A | Determine the value function for a specified policy. |
| Q124 | Cost of too much exploration | 1.3/5, 9, 13 | D3 | B | Slides support sacrificing immediate reward; “ignore best-known solution” is informal wording. |
| Q127 | Continuing-task characteristic | 1.6/3–5, 10 | D3 | A | No defined endpoint / ongoing interaction. |
| Q128 | Bellman equation as recursive decomposition | 1.8/3–8 | D3 | B | The deck establishes value recursion; “optimization problems” is broader than its expectation equation. |
| Q129 | Policy improvement | 1.11/3–5, 9–13 | D3 | A | Greedify with respect to current value information. |
| Q132 | Role of epsilon | 1.3/14–15 | D3 | A | Probability of entering random exploration branch. |
| Q138 | Agent’s goal in an MDP | 1.5/4, 12 | D3 | A | Maximize cumulative/total future reward. |
| Q139 | DQN for large state spaces | 1.9/12; 1.12/11–13 | D3 | C / flagged | Course 1 notes scale limits but never introduces DQN; later-course evidence required. |
| Q141 | Policy probability in Bellman expectation | 1.7/6–7; 1.8/4 | D3 | A | \(\pi(a\mid s)\) weights actions by selection probability. |
| Q142 | Episodic-task example | 1.5/13–17 | D3 | B | A retreat is episodic only when modeled with a start and terminal completion. |
| Q144 | Daily exam study task type | 1.5/13–17; 1.6/3–5 | D3 | C / flagged | Endpoint is missing: fixed-exam study can be episodic; indefinite study can be continuing. |
| Q147 | State value in improvement | 1.11/3–5, 9–13 | D3 | A | Values support greedy action comparison and a new policy. |
| Q149 | Exploration versus exploitation | 1.3/5, 9, 13 | D3 | A | Learn about alternatives versus use current knowledge. |
| Q157 | Meaning of `k` | 1.1/8–10, 12 | D2 | A | Number of arms/actions. |
| Q162 | Bellman expectation in evaluation | 1.8/4; 1.10/5, 8–11 | D3 | A | Recursive expected state value under a fixed policy. |
| Q167 | Policy definition | 1.7/3–7 | D3 | A | Mapping/distribution from states to actions. |
| Q178 | Purpose of exploration | 1.3/5–8, 13 | D3 | B | Wide sampling improves knowledge; “Monte Carlo” wording is not needed by the evidence. |
| Q186 | Bellman equation use | 1.8/3, 8, 18 | D3 | A | Relates and can be used to compute value functions. |
| Q189 | Policy-evaluation phase | 1.11/9, 11–13 | D3 | A | High-similarity pair with Q268. |
| Q202 | Optimal value | 1.9/7–19, 26 | D3 | A | Supplied “maximum reward” must be corrected to maximum expected cumulative return. |
| Q204 | Reward guiding a policy | 1.5/4, 8–12 | D3 | B | Directional feedback is supported; explicit parameter adjustment is not shown. |
| Q206 | Purpose of state value | 1.7/9–12 | D3 | A | Estimate expected future return from a state under a policy. |
| Q208 | Epsilon in epsilon-greedy | 1.3/14–15 | D3 | A | Probability of random exploration branch. |
| Q211 | Action-value notation | 1.7/11 | D3 | A | \(Q(s,a)\) / \(q_\pi(s,a)\). |
| Q214 | Bellman equation in DP | 1.8/3, 8, 18; 1.10/5–11 | D3 | B | It supplies recursive value consistency; “determine a decision problem’s value” is vague. |
| Q216 | Basic RL framework components | 1.4/9–11; 1.5/7–9 | D3 | B | Memory is not listed as a required basic component. |
| Q217 | Purpose of action-value estimates | 1.2/3–4, 10–11 | D2 | B | Estimates support choosing better actions; “determine optimal policy” is stronger than the bandit deck states. |
| Q222 | Suitability for dynamic programming | 1.10/7; 1.12/8–13 | D3 | B | Known dynamics and manageable updates are supported; “greedy approach” is not a suitability criterion taught here. |
| Q238 | Sample-average step size | 1.2/3–9 | D2 | C / flagged | Total/count averaging is explicit; a named step-size parameter or constant-step-size rule is absent. |
| Q245 | Value iteration for an MDP | 1.12/6–10 | D3 | A | Supported as a classic DP algorithm; assumes the DP/model setting from 1.10/7. |
| Q248 | Bellman equation versus update | 1.8/3, 8, 18 | D3 | B | Supplied “update value function” describes algorithm use, not the equation’s definition; duplicate family. |
| Q250 | Policy-improvement phase | 1.11/9–13 | D3 | A | Phase updates policy using current value information. |
| Q253 | Bellman recursive relationship | 1.8/3–8 | D3 | A | Exact-duplicate family with Q045/Q248. |
| Q261 | Stochastic policy | 1.7/6–8 | D3 | A | Selects actions from a state-dependent probability distribution. |
| Q262 | Greedification | 1.11/3, 9, 13 | D3 | A | Select action maximizing the current value-based expression. |
| Q265 | Evaluation’s role in policy iteration | 1.11/9, 11–13 | D3 | A | Compute value function for the current policy. |
| Q268 | Policy-evaluation phase | 1.11/9, 11–13 | D3 | A | High-similarity pair with Q189. |
| Q271 | Transition dynamics/model | 1.4/12–13 | D3 | A | \(p(s',r\mid s,a)\) is the joint next-state/reward distribution. |
| Q303 | SGD as an MDP-solving method | 1.12/6–13 | D3 | C / flagged | Deck lists value iteration and DP update styles; SGD is absent, so exclusion is not slide-proven. |
| Q304 | Policy-iteration robustness | 1.11/9–16 | D3 | C / flagged | Alternating improvement is taught; adaptation to varying conditions/goals is not. |
| Q305 | Exploitation in a bandit | 1.1/6; 1.3/9–12 | D3 | A | Choose the best arm according to current knowledge. |
| Q306 | Evaluation convergence/stopping | 1.10/11, 21–28 | D3 | A | Stop when value changes fall below the tolerance; does not imply policy optimality. |
| Q308 | Sustained task type | 1.6/3–5 | D3 | A | Continuing task when effort persists with no defined endpoint. |
| Q309 | Meaning of \(Q(s,a)\) | 1.7/11 | D3 | A | Expected return after state \(s\), first action \(a\), then policy. |
| Q310 | Action-value notation | 1.7/11 | D3 | A | \(Q(s,a)\) is explicit. |
| Q311 | “Objective function” in evaluation | 1.10/5, 8–11, 21 | D3 | C / flagged | Bellman equation is a recursive consistency relation/update basis, not an objective function. |
| Q312 | Reward and goal-directed behavior | 1.5/4, 8–12 | D3 | A | Reward supplies feedback that guides behavior toward greater future reward. |
| Q313 | Scope of Bellman equations | 1.8/4–7 | D3 | A | Expectation and optimality forms are both taught; supplied “only optimal value” is too narrow. |
| Q314 | Softmax action selection | 1.3/1–20 | D3 | C / flagged | No softmax probability rule appears in the Course 1 exploration deck. |
| Q315 | Softmax exploration | 1.3/1–20 | D3 | C / flagged | Deck teaches epsilon-greedy only; supplied softmax answer needs other evidence. |
| Q316 | Exploration–exploitation trade-off | 1.3/5–15 | D3 | A | Use current knowledge versus gather new information. |
| Q317 | Agent definition | 1.4/9–11 | D3 | A | Learner/decision-maker interacting with environment. |

## Reverse lecture coverage

| Lecture | Raw IDs | Unique families | Quality mix | Depth | Evidence gaps |
|---|---:|---:|---|---|---|
| 1.1 | 1 | 1 | usable 1 | D2 | None |
| 1.2 | 2 | 2 | usable 2 | D2 | Q238 step-size wording |
| 1.3 | 18 | 18 | usable 11, review 5, verify 2 | D3 | Q053, Q064, Q070, Q078, Q095, Q314, Q315 |
| 1.4 | 4 | 4 | usable 3, review 1 | D3 | None material |
| 1.5 | 8 | 8 | usable 6, review 2 | D3 | Q069 reward shaping; Q204 parameter wording indirect |
| 1.6 | 6 | 6 | usable 5, review 1 | D3 | Q144 missing endpoint |
| 1.7 | 12 | 12 | usable 8, review 4 | D3 | Q031 “reward” versus return |
| 1.8 | 6 | 4 | usable 2, review 2, verify 2 | D3 | Q248 equation/update wording |
| 1.9 | 3 | 3 | review 2, verify 1 | D3 | Q139 DQN absent; Q202 bank claim too narrow |
| 1.10 | 6 | 6 | usable 3, review 2, verify 1 | D3 | Q311 objective-function wording |
| 1.11 | 10 | 9 | usable 6, review 2, verify 2 | D3 | Q015/Q304 changing-environment claims |
| 1.12 | 5 | 5 | usable 1, review 2, verify 2 | D3 | Q080 complexity; Q303 SGD absent |
| **Total** | **81** | **78** | **usable 48, review 23, verify 10** | — | All gaps explicit |

## Unresolved questions

- Should Q139 be remapped to the later function-approximation course rather than retained as a
  flagged C1 item?
- Should Q314/Q315 receive evidence from a later deck if softmax appears there, or remain
  Course 1 evidence gaps because the bank tags them `C1-M2`?
- Q144 needs a task endpoint before it has a unique episodic/continuing answer.

