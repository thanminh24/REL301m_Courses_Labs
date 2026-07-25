# REL301m Exam Study — Consolidated 317-Question Guide

> Source: `final-exam-revision-question-index.md` (317-question bank, all canonical — nothing excluded).
> Each exam draws 50 questions; weighting below is `(tag count / 317) * 50`.

## How to use this file

- Section 1 = priority table (where to spend study time).
- Section 2 = lecture refresh (equations/definitions sourced from the course slides), organized to match the table order.
- Section 3 = full 317-question bank, grouped by tag, condensed to stem + correct answer (+ gotcha note where the supplied key needs a caveat).
- `OUT` decoys (28 items) are hardcoded — they reuse RL vocabulary in unrelated domains (behaviorism, interstellar exploration, MOOC filler) and won't be remixed; memorize the letter, no need to understand.

## 1. Study priority table

| Tag | Topic | Count | Depth |
|---|---|---:|---|
| `C1-M2` | Bandits / exploration | 20 | Medium |
| `C1-M3` | MDP formulation | 20 | Medium |
| `C1-M4` | Policies, values, Bellman equations | 23 | Medium |
| `C1-M5` | Dynamic programming / GPI | 18 | Medium |
| `C2-M2` | Monte Carlo / off-policy / importance sampling | 29 | Deep |
| `C2-M3` | TD prediction | 19 | Medium |
| `C2-M4` | Sarsa, Q-learning, Expected Sarsa (TD control) | 39 | Deep (largest topic) |
| `C2-M5` | Models, planning, Dyna | 23 | Medium |
| `C3-M2` | Function approximation (prediction) | 30 | Deep |
| `C3-M3` | Coarse/tile coding, feature construction | 11 | Light |
| `C3-M4` | Average-reward control | 6 | Light |
| `C3-M5` | Policy gradient / actor-critic | 36 | Deep |
| `C4` | Capstone (experience replay, validation) | 2 | Light |
| `OUT` | Outside named curriculum | 41 | Split: 13 medium / 28 zero (hardcode) |
| **Total** | | **317** | |

## 2. Lecture refresh — slide-sourced equations and definitions

### Bandits and exploration (`C1-M2`)
- Action value: q*(a) = E[R_t | A_t = a]. Incremental estimate: Q_{n+1} = Q_n + α(R_n − Q_n).
- ε-greedy explores uniformly with probability ε; UCB adds an uncertainty bonus; optimistic initialization encourages early exploration but the optimism decays through repeated updates, not through decaying ε.
- Slides: *1.1 The K-Armed Bandit Problem.pptx*; *1.3 Exploration vs. Exploitation Tradeoff.pptx*.

### MDPs, returns, values, Bellman equations (`C1-M3`, `C1-M4`)
- MDP tuple: (S, A, p, r, γ). Return: G_t = Σ_{k=0}^∞ γ^k R_{t+k+1}.
- v_π(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a)[r + γ v_π(s')].
- Separate reward (immediate scalar feedback), return (accumulated future reward), value (expected return), and policy (action distribution).
- Slides: *1.4 Introduction to Markov Decision Processes.pptx*; *1.7 Policies and Value Functions.pptx*; *1.8 Bellman Equations.pptx*.

### Dynamic programming and GPI (`C1-M5`)
- Policy evaluation computes v_π; policy improvement acts greedily w.r.t. current values; policy iteration alternates them. Value iteration folds truncated evaluation and improvement into optimality backups.
- Slides: *1.10 Policy Evaluation (Prediction).pptx*; *1.11 Policy Iteration (Control).pptx*; *1.12 Generalized Policy Iteration.pptx*.

### Monte Carlo, on/off-policy, importance sampling (`C2-M2`)
- MC waits for sampled returns; first/every-visit variants average G_t. Off-policy separates behavior b from target π.
- Per-decision ratio: ρ_t = π(A_t|S_t) / b(A_t|S_t). Support is mandatory: b(a|s) > 0 wherever π(a|s) > 0.
- Slides: *2.1 Introduction to Monte-Carlo Methods.pptx*; *2.4 Off-policy learning for prediction.pptx*.

### TD prediction and control (`C2-M3`, `C2-M4`)
- TD(0): V(S_t) ← V(S_t) + α[R_{t+1} + γV(S_{t+1}) − V(S_t)].
- Sarsa target: R + γQ(S',A'). Q-learning target: R + γ max_a Q(S',a). Expected Sarsa target: R + γΣ_a π(a|S')Q(S',a).
- Sarsa is on-policy; Q-learning is off-policy; Expected Sarsa may be either depending on the expectation policy.
- Slides: *2.5 Introduction to Temporal Difference Learning.pptx*; *2.7 Temporal Difference for Control.pptx*; *2.8 Off-policy Temporal Difference Control Q-learning.pptx*; *2.9 Expected Sarsa.pptx*.

### Models, planning, and Dyna (`C2-M5`)
- Direct RL updates from real transitions. Model learning stores/predicts transitions. Planning applies the same update rule to simulated transitions. Dyna interleaves all three. Dyna-Q+ adds an exploration bonus such as κ√(τ(s,a)) for long-untried actions.
- Slides: *2.10 Define model in Reinforcement Learning.pptx*; *2.12 Dyna as a formalism for planning.pptx*; *2.13 Dealing with inaccurate models.pptx*.

### Function approximation (`C3-M2`, `C3-M3`)
- Linear value estimate: v̂(s,w) = wᵀx(s); gradient is x(s). Semi-gradient TD: w ← w + αδ_t x(S_t).
- State aggregation trades detail for sharing. Coarse coding uses overlapping receptive fields; tile coding uses multiple offset tilings for sparse local generalization.
- Slides: *3.1 Estimating Value Functions as Supervised Learning.pptx*; *3.4 Linear Temporal Difference.pptx*; *3.5 Feature Construction for Linear Methods.pptx*.

### Average reward, policy gradient, actor–critic (`C3-M4`, `C3-M5`)
- Continuing control can optimize average reward R̄ and differential returns instead of discounted episodic return.
- Policy-gradient theorem gives an ascent direction proportional to E[∇_θ log π_θ(A|S) q_π(S,A)]. A baseline reduces variance without changing the expected gradient.
- Actor updates policy parameters; critic estimates value/advantage and supplies the learning signal.
- Slides: *3.8 Understand Average Reward.pptx*; *3.9 Learning Parameterized Policies.pptx*; *3.10 Policy Gradient for Continuing Tasks.pptx*; *3.11 Actor-Critic for Continuing Tasks.pptx*; *3.12 Policy Parameterizations.pptx*.

### Capstone (`C4`)
- Review action-value neural networks, experience replay, softmax Expected Sarsa, optimizer behavior, and experiment design. Local practice: *Course4ProgrammingAssignment2-v4.ipynb* (Assignment 1 / Week 5).

## 3. Full question bank (317), condensed by topic

### C1-M2 · Bandits / exploration (20)

- **Q006** `usable` — Which of the following best describes the exploration strategy known as epsilon-greedy?  
  → C. Choosing the best-known action most of the time while occasionally exploring random actions
- **Q018** `usable` — In the context of Monte-Carlo algorithms, what is meant by "exploration-exploitation trade-off"?  
  → C. Balancing the search for new information with the use of known information
- **Q020** `usable` — In the context of the k-armed bandit problem, what is meant by "exploitation"?  
  → B. Selecting the arm with the highest estimated reward.
- **Q053** `review` — Which of the following techniques uses a decreasing probability of random actions over time to balance exploration and exploitation?  
  → B. Epsilon-Greedy
- **Q064** `verify` — What is a common technique to reduce the impact of overly optimistic initial values over time?  
  → A. Decaying exploration rate  
  *Gotcha:* Optimistic estimates decay through repeated updates; decaying exploration does not directly remove optimism.
- **Q070** `review` — In reinforcement learning, what does the temperature parameter represent?  
  → B. The exploration-exploitation trade-off
- **Q078** `verify` — Which of the following is NOT a characteristic of Epsilon-soft policies?  
  → C. Rigidity  
  *Gotcha:* Epsilon-soft means each action has probability at least \(\varepsilon/|\mathcal A(s)|\); the options do not test it.
- **Q095** `review` — What is the main purpose of using a decaying epsilon in the Epsilon-Greedy strategy?  
  → B. To decrease the randomness of actions over time.
- **Q096** `usable` — Which method can be used to encourage exploration in reinforcement learning?  
  → C. Implementing an €-greedy policy
- **Q124** `review` — In Monte-Carlo algorithms, what is the potential downside of too much exploration?  
  → B. It can cause the algorithm to ignore the best-known solutions
- **Q132** `usable` — In the epsilon-greedy policy, what role does the parameter epsilon (€) play in balancing exploration and exploitation?  
  → D. It determines the probability of exploring new actions
- **Q149** `usable` — What is the difference between "exploration" and "exploitation" in reinforcement learning?  
  → A. Exploration involves trying new actions to discover their effects, while exploitation involves using kn actions to maximize reward
- **Q157** `usable` — What does the 'k' in k-armed bandit stand for?  
  → B. The number of actions (or arms) available.
- **Q178** `usable` — What is the primary goal of using exploration in Monte-Carlo algorithms?  
  → D. To ensure the algorithm samples a wide range of possibilities
- **Q208** `usable` — What does the epsilon (€) represent in the ¢-greedy algorithm?  
  → A. The probability of selecting a random arm.
- **Q238** `usable` — In the sample average method, what does the step size parameter determine?  
  → B. The influence of the most recent reward on the estimate
- **Q305** `usable` — In the context of the multi-armed bandit problem, what does the term "exploitation" refer to?  
  → B. Using the known information to select the best arm
- **Q314** `usable` — Which method involves selecting actions based on their probability distribution determined by their estimated value functions?  
  → C. Softmax
- **Q315** `review` — Which exploration strategy selects actions according to a probability distribution that balances the known rewards with the potential for discovering new rewards?  
  → A. Softmax Action Selection
- **Q316** `usable` — What is the "exploration-exploitation trade-off" in reinforcement learning?  
  → A. The decision between using known information versus gathering new information

### C1-M3 · MDP formulation (20)

- **Q025** `usable` — Which of the following best describes a reward signal in reinforcement learning?  
  → B. It is a numerical value given to the agent to indicate the success of an action.
- **Q036** `usable` — What is the primary goal of reinforcement learning?  
  → C. To maximize the cumulative reward over time
- **Q052** `usable` — Which of the following is an example of a continuing task?  
  → B. Practicing a musical instrument daily.
- **Q065** `usable` — What is the purpose of the discount factor (gamma, y) in reinforcement learning?  
  → B. To prioritize recent rewards over distant future rewards
- **Q069** `review` — Why might shaping rewards be necessary in reinforcement learning?  
  → B. To encourage exploration of less obvious actions
- **Q082** `review` — How does the discount rate affect intertemporal choices in continuing tasks?  
  → B. It influences the perception of the relative value of immediate versus delayed rewards
- **Q088** `usable` — Which of the following is NOT a typical component of a reinforcement learning model?  
  → C. Policy network
- **Q100** `usable` — In the context of reinforcement learning, what does a negative reward signify?  
  → B. It discourages the agent from repeating the action that led to it.
- **Q127** `usable` — What is a key characteristic of continuing tasks?  
  → C. They have indefinite or ongoing durations.
- **Q138** `usable` — What is the goal of an agent in an MDP?  
  → B. To maximize the cumulative reward.
- **Q142** `usable` — Which of the following is an example of an episodic task?  
  → C. Planning a company retreat
- **Q144** `usable` — If you're preparing for an exam by studying a little bit each day, what type of task is this?  
  → A. Episodic task.
- **Q204** `usable` — What role does the reward signal play in adjusting the parameters of a policy?  
  → B. It guides the policy towards actions that lead to higher rewards
- **Q216** `usable` — Which of the following is NOT a component of the reinforcement learning framework?  
  → C. Memory
- **Q245** `usable` — Which algorithm is commonly used to solve an MDP?  
  → C. Value iteration
- **Q271** `review` — Which term describes the probability distribution over next states given a current state and action in an MDP?  
  → C. Transition model
- **Q303** `verify` — Which of the following is NOT a method for solving MDPs?  
  → D. Stochastic Gradient Descent  
  *Gotcha:* SGD is an optimizer used inside RL, so 'not a method for solving MDPs' depends on the intended level of abstraction.
- **Q308** `usable` — Which task type typically requires sustained effort over time?  
  → B. Continuing tasks.
- **Q312** `review` — In what way do rewards contribute to the goal-oriented behavior of an agent?  
  → D. By providing feedback on progress
- **Q317** `usable` — In reinforcement learning, what is an agent?  
  → C. An entity that interacts with the environment

### C1-M4 · Policies, values, Bellman equations (23)

- **Q011** `review` — Which algorithm is commonly used to solve MDPs by iteratively estimating the value function?  
  → C. Value Iteration
- **Q031** `review` — In the Bellman equation, what does V(s) represent?  
  → A. The expected reward starting from state s
- **Q045** `usable` — What is the Bellman equation used for in the context of MDPs?  
  → C. To express the relationship between the value of a state and the values of its successor States.
- **Q046** `review` — What is the significance of the Bellman optimality equation in reinforcement learning?  
  → B. It gives a recursive decomposition for the optimal policy
- **Q061** `review` — What role does the discount factor y play in the state value function?  
  → B. It determines the importance of future rewards in the value function
- **Q068** `usable` — What does the term "policy" refer to in the context of reinforcement learning?  
  → B. Amapping from states to actions
- **Q090** `usable` — In reinforcement learning, the state value function V(s) represents:  
  → C. The expected return starting from state s
- **Q097** `usable` — What is a deterministic policy in reinforcement learning?  
  → C. A policy that selects the same action for a given state every time
- **Q128** `review` — Which of the following best describes the Bellman equation?  
  → A. Arecursive decomposition of optimization problems.
- **Q139** `review` — Which technique is commonly used to approximate the optimal value function when the state space is t large to compute it exactly?  
  → A. Deep Q-Networks (DQN)
- **Q141** `review` — What role does the policy n(a|s) play in the Bellman equation for the state value function?  
  → B. It specifies the probability of taking action a in state s
- **Q167** `usable` — What is a policy in reinforcement learning?  
  → B. The method by which an agent maps states to actions
- **Q186** `review` — What is the Bellman equation used for in reinforcement learning?  
  → D. To calculate the value function
- **Q202** `verify` — What does the optimal value function represent?  
  → A. The maximum reward achievable from a given state  
  *Gotcha:* The optimal value is maximum expected return, \(v_*(s)=\max_\pi\mathbb E_\pi[G_t\mid S_t=s]\), not a single maximum reward.
- **Q206** `usable` — What is the primary purpose of the state value function in reinforcement learning?  
  → B. To estimate the future rewards from a given state
- **Q211** `review` — Which function is typically used to represent the action value in reinforcement learning?  
  → D. Q-function (Q)
- **Q217** `usable` — What is the objective of estimating action values in reinforcement learning?  
  → A. To determine the optimal policy
- **Q248** `verify` — What is the Bellman equation used for in the context of MDPs?  
  → B. To update the value function.  
  *Gotcha:* A Bellman equation expresses a recursive value relationship; an algorithm may use it to update estimates.
- **Q253** `usable` — What is the Bellman equation used for in the context of MDPs?  
  → C. To express the relationship between the value of a state and the values of its successor states.
- **Q261** `usable` — In reinforcement learning, what does a stochastic policy do?  
  → C. Selects actions based on a probability distribution
- **Q309** `usable` — What does the action value Q(s,a) represent in reinforcement learning?  
  → B. The expected return (total future reward) of taking action a in state s
- **Q310** `usable` — Which notation is commonly used to represent the action-value function?  
  → C. Q(s, a)
- **Q313** `verify` — In reinforcement learning, what is the Bellman equation used for?  
  → A. Calculating the optimal value function  
  *Gotcha:* Bellman equations cover policy values and optimal values; they do not only 'calculate the optimal value function.'

### C1-M5 · Dynamic programming / GPI (18)

- **Q015** `verify` — How does the Policy Iteration Framework handle changing environments or goals?  
  → B. By adjusting the policy gradually  
  *Gotcha:* Classical policy iteration assumes a stationary MDP; changed dynamics/goals require new evaluation or an adaptive model.
- **Q040** `usable` — What does the term "iterative" signify in Iterative Policy Evaluation?  
  → A. The process involves repeated computation until convergence
- **Q041** `verify` — What is the primary objective of policy control in reinforcement learning?  
  → C. Balancing exploration and exploitation  
  *Gotcha:* Control aims to find a policy maximizing expected return; exploration–exploitation is a means, not the objective.
- **Q080** `verify` — Which of the following best describes the time complexity of dynamic programming algorithms?  
  → B. Polynomial  
  *Gotcha:* DP complexity depends on state/action counts, horizon, model structure, and algorithm; the unqualified key is unsupported.
- **Q106** `usable` — What is Policy Evaluation in reinforcement learning?  
  → B. Assessing the quality of a given policy
- **Q129** `usable` — What does policy improvement involve?  
  → A. Updating the policy to be more greedy with respect to the value function
- **Q147** `review` — In a policy improvement step, how is the state value function used?  
  → B. To generate new policies based on the current state values
- **Q162** `usable` — In policy evaluation, what does the Bellman expectation equation represent?  
  → B. The expected value of a state under a given policy
- **Q189** `usable` — In Policy Iteration, which step involves evaluating the current policy's performance and updating the val function?  
  → A. Policy Evaluation
- **Q214** `review` — What is the Bellman equation used for in dynamic programming?  
  → C. To determine the value of a decision problem.
- **Q222** `review` — Which of the following is NOT a characteristic of a problem suitable for dynamic programming?  
  → C. Greedy solution approach
- **Q250** `usable` — Which phase of Policy Iteration involves updating the policy based on the current value function?  
  → B. Policy Improvement
- **Q262** `usable` — What does the term "greedification" refer to in the context of policy improvement?  
  → B. Selecting actions that maximize the value function
- **Q265** `usable` — In policy iteration, what is the role of the policy evaluation step?  
  → C. To compute the value function of the current policy
- **Q268** `usable` — In Policy Iteration, which step involves evaluating the current policy's performance and updating the value function?  
  → A. Policy Evaluation
- **Q304** `review` — How does the flexibility of the Policy Iteration Framework contribute to robustness?  
  → C. By enabling adaptation to varying conditions or goals
- **Q306** `review` — What happens if the value function of a policy converges during Iterative Policy Evaluation?  
  → D. The policy evaluation process stops
- **Q311** `verify` — In Policy Evaluation, what is the objective function typically used?  
  → A. Bellman Equation  
  *Gotcha:* The Bellman equation is a consistency equation, not an objective function.

### C2-M2 · Monte Carlo / off-policy / importance sampling (29)

- **Q001** `usable` — What role does the target policy play in off-policy learning?  
  → B. It defines the policy being learned and improved
- **Q017** `usable` — Off-policy learning is particularly useful in which scenario?  
  → C. When learning from demonstrations or historical data
- **Q028** `verify` — What is the effect of using a more complex proposal distribution in importance sampling?  
  → A. It decreases the variance of the estimator.  
  *Gotcha:* Proposal complexity alone does not reduce variance; closeness/support relative to the target matters.
- **Q073** `usable` — Which of the following best describes Monte Carlo methods in the context of reinforcement learning?  
  → C. Methods that use random sampling to estimate value functions and update policies.
- **Q081** `review` — In importance sampling, what does the proposal distribution refer to?  
  → A. The distribution from which samples are drawn
- **Q110** `review` — Which factor determines the quality of the estimate in importance sampling?  
  → B. The closeness of the proposal distribution to the target distribution
- **Q115** `verify` — Which technique is often used to reduce variance in Monte Carlo simulations?  
  → B. Variance reduction techniques like importance sampling  
  *Gotcha:* Importance sampling can increase variance; it is variance reduction only with a well-chosen proposal/estimator.
- **Q146** `review` — Which of the following best describes the law of large numbers as it applies to Monte Carlo simulations  
  → B. The larger the sample size, the more accurate the results
- **Q158** `usable` — What is the key characteristic of an episode in the context of Monte Carlo methods?  
  → A. Itis a sequence of states, actions, and rewards that terminates.
- **Q160** `usable` — What is a potential drawback of Monte Carlo prediction methods?  
  → C. They may require a large number of episodes to obtain accurate value estimates
- **Q166** `usable` — In Monte Carlo methods, what does the term "policy evaluation" refer to?  
  → C. The process of estimating the value function for a given policy.
- **Q171** `verify` — In Monte Carlo control, what is the major drawback of using Boltzmann Exploration?  
  → D. Sensitivity to initial conditions  
  *Gotcha:* Boltzmann exploration's standard weakness is sensitivity to temperature and action-value scale.
- **Q172** `review` — Which of the following is a key component of Monte Carlo simulations?  
  → B. Random sampling
- **Q180** `review` — In Monte Carlo methods, what is the term for the total accumulated reward obtained from a state?  
  → C. Return
- **Q182** `usable` — Which of the following is an advantage of Temporal Difference Learning over Monte Carlo methods for Evaluation?  
  → A. Temporal Difference Learning is computationally less expensive.
- **Q188** `verify` — Which Monte Carlo method updates value estimates based on the average returns observed from state  
  → A. First-visit Monte Carlo  
  *Gotcha:* First-visit and every-visit MC both average returns; they differ in which within-episode visits are counted.
- **Q224** `verify` — Which of the following methods is primarily used to estimate action values in model-free reinforcement learning?  
  → C. Temporal Difference learning  
  *Gotcha:* Both Monte Carlo and TD estimate model-free action values, so the item has two valid answers.
- **Q246** `verify` — What is a common approach to reduce the variance in Monte Carlo estimates?  
  → B. Using importance sampling.  
  *Gotcha:* Importance sampling is not automatically variance reducing; ordinary off-policy importance sampling may have very high variance.
- **Q247** `usable` — In contrast to Dynamic Programming and Monte Carlo methods, what aspect makes Temporal Difference (TD) methods more suitable for online learning?  
  → C. TD methods update values based on incomplete sequences.
- **Q259** `usable` — In the Monte Carlo prediction method, what is the purpose of using the policy π?  
  → B. To generate episodes
- **Q272** `review` — What is the purpose of the accumulated product of important sampling ratios (W) in the off-policy Monte Carlo prediction algorithm?  
  → B. To correct the returns generated by the behavior policy
- **Q274** `usable` — Which algorithm is commonly used for off-policy learning in reinforcement learning?  
  → A. Q-learning
- **Q275** `usable` — What is one advantage of Temporal Difference (TD) methods over Dynamic Programming (DP) and Monte Carlo methods?  
  → B. TD methods do not require knowledge of the complete environment dynamics.
- **Q276** `usable` — What type of learning method is Monte Carlo prediction classified as?  
  → D. Reinforcement learning
- **Q278** `usable` — Which of the following statements about Monte Carlo methods is true?  
  → C. Monte Carlo methods update action values only at the end of an episode.
- **Q279** `verify` — Why is maintaining exploration important in Monte Carlo methods?  
  → B. To prevent the algorithm from getting stuck in local optima  
  *Gotcha:* Exploration provides sufficient state–action coverage; 'avoid local optima' is imprecise here.
- **Q282** `usable` — What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?  
  → B. TD methods update values based on incomplete episodes.
- **Q288** `usable` — Which of the following is an advantage of off-policy learning?  
  → C. It allows learning from non-optimal behavior
- **Q290** `usable` — Which technique in reinforcement learning allows learning from historical data while following a different policy?  
  → B. Off-policy learning

### C2-M3 · TD prediction (19)

- **Q022** `review` — Which characteristic distinguishes Temporal Difference(TD) methods from Dynamic Programming and Monte Carlo methods?  
  → A. TD methods are model-free.
- **Q027** `usable` — What distinguishes Monte Carlo methods from Temporal-Difference (TD) methods?  
  → A. Monte Carlo methods update action values at the end of an episode, while TD methods update them at each time step.
- **Q032** `verify` — What is the main advantage of temporal-difference learning over other reinforcement learning methods?  
  → A. It requires less computational resources.  
  *Gotcha:* TD's defining advantage is online bootstrapping without a model or complete episode, not simply lower compute.
- **Q051** `verify` — In the context of Temporal Difference (TD), What is the primary advantage of TD(0) over Monte Carlo methods?  
  → A. Lower computational complexity  
  *Gotcha:* TD(0)'s defining advantage over MC is bootstrapping before episode termination; lower complexity is not universally primary.
- **Q054** `review` — In the context of Temporal Difference (TD), Which factor influences the trade-off between exploration and exploitation in TD(0)?  
  → D. Exploration rate
- **Q105** `usable` — Which statement best describes Tabular Temporal Difference (TD) learning?  
  → A. It uses a table to store values for each state-action pair.
- **Q118** `review` — Which advantage of Temporal Difference (TD) methods allows them to be applied in online settings wh environment changes over time?  
  → C. TD methods adapt quickly to changing environments.
- **Q133** `review` — What distinguishes Monte Carlo methods from Temporal Difference (TD) methods in reinforcement lea  
  → A. Monte Carlo methods update estimates based on the entire episode, while TD methods update bas current steps.
- **Q140** `review` — What does Temporal Difference (TD) learning combine?  
  → A. Monte Carlo methods and dynamic programming
- **Q184** `review` — What is temporal-difference learning primarily used for?  
  → C. Reinforcement learning
- **Q187** `usable` — In Temporal Difference(0), how is the state-value function updated?  
  → B. By using the Bellman equation.
- **Q230** `verify` — In the context of Temporal Difference (TD), what is the main objective of the TD(0) algorithm?  
  → B. To minimize the temporal difference error.  
  *Gotcha:* TD(0) estimates a policy value with one-step bootstrapped targets; it is not generally gradient descent on squared TD error.
- **Q231** `review` — What is the main advantage of temporal-difference learning over other reinforcement learning methods  
  → A. lt requires less computational resources.
- **Q233** `usable` — What is the key objective of using a Temporal Difference (TD) learning algorithm? (choose the best answer/core idea of TD learning)  
  → D. To approximate the total return by bootstrapping from the immediate reward and the estimated value of the next state.
- **Q242** `usable` — Which statement best describes Tabular Temporal Difference (TD) learning?  
  → A. It uses a table to store values for each state-action pair.
- **Q254** `usable` — What distinguishes Temporal Difference (TD) methods from Monte Carlo methods regarding the handling of incomplete episodes?  
  → B. TD methods update values based on incomplete episodes.
- **Q256** `verify` — In the context of Temporal Difference (TD), Which of the following is NOT a step in the TD(0) algorithm?  
  → C. Backpropagation  
  *Gotcha:* TD(0) observes a transition, forms \(\delta=R+\gamma V(S')-V(S)\), and updates \(V(S)\); the listed steps are ill-defined.
- **Q277** `usable` — Which of the following is a characteristic of temporal-difference learning algorithms?  
  → B. They learn from delayed rewards.
- **Q289** `review` — What does the "difference" in temporal-difference learning refer to?  
  → B. The difference between observed and predicted values

### C2-M4 · Sarsa, Q-learning, Expected Sarsa (TD control) (39)

- **Q023** `usable` — What does it mean for Q-learning to be off-policy?  
  → B. It learns the value of the optimal policy while following a different policy.
- **Q044** `review` — What differentiates off-policy Q-learning from on-policy methods like SARSA?  
  → B. Q-learning updates using the highest Q-value of the next state, while SARSA updates using the action actually taken.
- **Q049** `review` — In Q-learning, which term is used to update the Q-value for state s and action a?  
  → A. a (learning rate)
- **Q050** `usable` — In Q-learning, how is the action value updated for a given state-action pair?  
  → B. Using the maximum action value of the next state
- **Q058** `usable` — What is one common exploration strategy used in conjunction with Expected Sarsa?  
  → C. e-greedy policy
- **Q059** `usable` — In Sarsa, the Q-value update rule uses which of the following to update the current state-action pair?  
  → B. The reward received plus the discounted Q-value of the next state-action pair
- **Q071** `usable` — What does the Bellman equation for Q-learning update represent?  
  → B. The relationship between the Q-value of a state-action pair and the expected future rewards
- **Q074** `verify` — Why might Expected Sarsa be preferred in environments with large action spaces?  
  → C. It can better handle the uncertainty of many possible actions  
  *Gotcha:* Expected Sarsa can be more expensive in large action spaces because it sums over actions; the premise is questionable.
- **Q077** `usable` — What is the primary difference between Sarsa and Expected Sarsa in reinforcement learning?  
  → D. Expected Sarsa uses the expected value of the next state's Q-value
- **Q086** `review` — In Expected Sarsa, what does the parameter y represent?  
  → B. Discount factor
- **Q108** `usable` — In Expected Sarsa, the expectation is taken over which element?  
  → C. Possible next actions
- **Q116** `usable` — In which type of environment is Expected Sarsa generally more stable than Q-learning?  
  → B. Stochastic environments
- **Q126** `usable` — Which of the following statements is true about the SARSA algorithm?  
  → C. SARSA updates the Q-values using the action taken by the policy.
- **Q150** `review` — How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?  
  → B. By averaging over all possible actions.
- **Q169** `usable` — Which exploration strategy is commonly used in Q-learning to maintain off-policy learning?  
  → B. Epsilon-greedy strategy.
- **Q181** `usable` — Which of the following best describes an off-policy algorithm?  
  → C. It learns from actions that are not necessarily taken by the current policy.
- **Q183** `review` — What is the role of the learning rate 1 in the Q-learning algorithm?  
  → C. It adjusts the step size for updating the action values
- **Q195** `review` — In SARSA, the next action 1' is chosen based on which policy?  
  → C. The same policy used to generate the current action A
- **Q196** `usable` — Which of the following is true about the exploration-exploitation trade-off in Q-learning?  
  → B. It addresses the need to explore new actions and exploit known rewarding actions
- **Q197** `review` — In Q-learning, the update rule uses which action's reward to update the Q-values?  
  → B. The action chosen by an exploration strategy.
- **Q198** `usable` — What is the main objective of the Q-learning algorithm?  
  → B. To maximize the total reward over time
- **Q199** `usable` — What does SARSA stand for in the context of reinforcement learning?  
  → A. State-Action-Reward-State-Action
- **Q200** `usable` — What role does the policy's probability distribution play in Expected Sarsa?  
  → B. It weights the Q-values of possible actions to compute the expected value
- **Q205** `usable` — Why is it important to update Q-values iteratively in Q-learning?  
  → B. To approximate the optimal action-value function over time
- **Q210** `usable` — In the Q-learning algorithm, what is the main goal when updating the Q-values?  
  → C. To minimize the temporal difference error
- **Q213** `review` — In SARSA, what is typically done if the learning rate (alpha) is too high?  
  → B. The algorithm might not converge and the Q-values will fluctuate.
- **Q215** `review` — Which algorithm typically results in smoother learning updates, reducing variance in the updates?  
  → B. Expected Sarsa
- **Q219** `usable` — Which of the following is the key difference between SARSA and Q-learning?  
  → A. SARSA is on-policy, while Q-learning is off-policy.
- **Q221** `review` — What is the primary challenge addressed by the SARSA (State-Action-Reward-State-Action) algorithm compared to Q-learning?  
  → C. SARSA uses the action taken in the next state for updates, leading to on-policy learning
- **Q228** `review` — In the SARSA algorithm, what is the role of the discount factor 1?  
  → B. It balances the trade-off between immediate and future rewards.
- **Q236** `usable` — Which of the following algorithms is commonly used in reinforcement learning?  
  → B. Q-Learning
- **Q237** `review` — What is a potential disadvantage of using Expected Sarsa over Sarsa?  
  → B. It requires knowledge of the policy's action probabilities
- **Q244** `usable` — In expected Sarsa, the weights used in the expectation calculation are based on:  
  → B. The probability of taking each action under the agent's policy
- **Q252** `verify` — What does the term "off-policy" refer to in the context of Expected Sarsa?  
  → A. Learning from actions that are not taken by the agent.  
  *Gotcha:* Off-policy means behavior and target policies differ; it does not mean learning from actions the agent did not take.
- **Q266** `usable` — Which of the following exploration strategies is commonly used with SARSA?  
  → C. Epsilon-greedy
- **Q280** `usable` — Which of the following statements is true regarding the update rule of Expected Sarsa?  
  → B. It updates based on a weighted sum of Q-values for all possible actions
- **Q283** `usable` — How does Expected Sarsa reduce the variance in Q-value updates compared to Q-learning?  
  → B. By averaging over all possible actions.
- **Q285** `usable` — In the SARSA algorithm, what role does the learning rate (\alpha) play?  
  → A. It determines how much new information overrides the old information.
- **Q286** `usable` — In Q-learning, what role does the learning rate (\alpha) play in the update rule?  
  → A. It determines how much the current Q-value is updated.

### C2-M5 · Models, planning, Dyna (23)

- **Q002** `verify` — Which of the following is a key benefit of using Dyna Architecture?  
  → C. Improved model scalability and adaptability  
  *Gotcha:* Dyna's course-level benefit is sample efficiency by combining real and simulated experience; supplied options omit it.
- **Q012** `usable` — What is the primary difference between Dyna-Q and Q-learning?  
  → A. Dyna-Q uses a model of the environment
- **Q013** `usable` — Which of the following describes 'model-free' reinforcement learning methods?  
  → C. They do not use a model of the environment
- **Q072** `usable` — Which method involves using a model to simulate the environment for planning in reinforcement learning?  
  → B. Model-based methods
- **Q109** `verify` — What is the primary purpose of Dyna Architecture?  
  → C. To model complex dynamic systems  
  *Gotcha:* Dyna integrates direct RL, a learned model, planning, and acting; none of the options states this.
- **Q113** `review` — Which of the following is NOT a common reason for inaccuracies in models?  
  → D. Perfect alignment with real-world scenarios
- **Q119** `verify` — In Random Tabular Q-planning, what does the Q in Q-planning stand for?  
  → D. Q-value  
  *Gotcha:* Q is action-value notation; ask what \(Q(s,a)\) represents rather than what the letter 'stands for.'
- **Q122** `verify` — Why is it beneficial to update Q-values randomly in Random Tabular Q-planning?  
  → B. It helps in better exploration of the state-action space.  
  *Gotcha:* Random planning updates sample previously observed state–action pairs; this is planning coverage, not environment exploration.
- **Q145** `verify` — Dyna Architecture primarily deals with which type of models?  
  → B. Dynamic models  
  *Gotcha:* Dyna integrates learning, planning, and acting; it is not primarily a category of transition model.
- **Q151** `verify` — In the context of reinforcement learning, what is a key advantage of distribution models over sample-ba models?  
  → C. Ability to generalize from a broader set of scenarios  
  *Gotcha:* Distribution models provide expectations/distributions; whether they are more sample-efficient depends on model accuracy and use.
- **Q152** `verify` — What is the relationship between sample efficiency and sample-based models?  
  → B. Sample-based models are generally less sample-efficient than distribution models  
  *Gotcha:* No universal sample-efficiency ordering exists: sample models are easier to obtain; distribution models contain richer information.
- **Q165** `review` — Which algorithm estimates the action value using a model of the environment?  
  → D. Dynamic Programming
- **Q176** `review` — What is a common method for building a model in reinforcement learning?  
  → C. Using historical data to approximate state transitions and rewards
- **Q185** `usable` — In the context of reinforcement learning, what does the term "planning" typically refer to?  
  → C. Using a model to evaluate future actions and outcomes
- **Q227** `usable` — Which of the following is a primary purpose of using a model in reinforcement learning?  
  → C. To simulate the environment's response to different actions
- **Q232** `usable` — In reinforcement learning, what is a model-based approach?  
  → B. An approach where the agent uses a model of the environment to plan actions
- **Q234** `verify` — Which of the following methods is associated with distribution models for handling uncertainty in state transitions?  
  → C. Particle Filters  
  *Gotcha:* A distribution model represents \(p(s',r\mid s,a)\); particle filtering is a different belief-approximation issue.
- **Q243** `review` — What does the Q-Learning update do in the context of planning?  
  → B. It improves the policy based on updated action values.
- **Q257** `verify` — What is the primary purpose of Dyna Architecture?  
  → C. To model complex dynamic systems  
  *Gotcha:* Dyna integrates learning, planning, and acting; none of the supplied options states that purpose.
- **Q267** `verify` — Which type of reinforcement learning model typically uses Monte Carlo simulations to estimate values?  
  → A. Sample-based models  
  *Gotcha:* Monte Carlo value estimation is sample-based learning; a 'sample model' is a separate model-based planning concept.
- **Q269** `review` — Which of the following is a primary characteristic of a distribution model in reinforcement learning?  
  → B. It approximates the transition dynamics of the environment.
- **Q281** `review` — What is the primary objective of Random Tabular Q-planning in reinforcement learning?  
  → C. To optimize the policy for better future rewards
- **Q287** `review` — What is one of the main challenges when using distribution models in reinforcement learning?  
  → C. Difficulty in accurately modeling the environment's dynamics.

### C3-M2 · Function approximation (prediction) (30)

- **Q008** `usable` — What is the main purpose of using linear function approximation in reinforcement learning?  
  → C. To provide a way to generalize value functions
- **Q024** `usable` — Which of the following is a disadvantage of using state aggregation?  
  → B. It may lead to a loss of detail and precision.
- **Q034** `review` — What does the MSVE objective aim to minimize in the context of policy evaluation?  
  → C. The sum of squared differences between the estimated and true values
- **Q076** `usable` — Why is generalization important in reinforcement learning?  
  → A. To avoid overfitting to specific states
- **Q079** `review` — What is a common issue when using the mean-squared value error for large state spaces?  
  → C. Computational complexity
- **Q098** `usable` — In reinforcement learning, what is the purpose of using a parameterized function to approximate the value function?  
  → C. To generalize the value function across different states
- **Q104** `verify` — Which problem arises due to the use of linear function approximation in reinforcement learning?  
  → C. Underfitting  
  *Gotcha:* Linear approximation can underfit with inadequate features, but underfitting is not inherent.
- **Q130** `usable` — What is one approach to aggregating states in continuous state spaces?  
  → B. Clustering states based on feature similarity.
- **Q131** `review` — In the context of Temporal Difference (TD) learning, what is the main advantage of linear semi-gradient over Tabular TD learning?  
  → B. It can generalize to unseen states through feature representation.
- **Q143** `review` — In the context of parameterized functions, what is gradient descent used for?  
  → B. To update the parameters to minimize the loss function
- **Q153** `usable` — Which method is commonly used in conjunction with state aggregation to estimate the value function?  
  → C. Monte Carlo methods.
- **Q159** `review` — What is the typical objective when training a parameterized value function in reinforcement learning?  
  → C. Minimizing the loss between predicted and actual rewards
- **Q175** `review` — What is the main purpose of gradient descent in machine learning?  
  → B. To find the minimum of a function
- **Q179** `usable` — What is a potential challenge when determining the number of aggregated states?  
  → B. Balancing between the level of detail and computational efficiency.
- **Q207** `usable` — In the context of gradient descent, what is a 'learning rate'?  
  → B. The step size used to update the parameters
- **Q209** `review` — Which variant of gradient descent is typically used in reinforcement learning to handle large and contin state spaces?  
  → B. Stochastic gradient descent (SGD)
- **Q220** `usable` — In the context of Temporal Difference (TD) learning, which feature of Tabular TD learning makes it a sp case of linear semi-gradient TD learning?  
  → C. The discretization of state space into individual entries.
- **Q223** `usable` — What is the main advantage of using function approximation in reinforcement learning?  
  → C. Ability to generalize across states
- **Q229** `verify` — Which of the following methods combines linear function approximation with policy improvement?  
  → C. Actor-Critic Methods  
  *Gotcha:* Multiple methods combine linear approximation and improvement, including semi-gradient Sarsa and actor–critic variants.
- **Q249** `review` — In the context of linear function approximation, what is the gradient of the value function approximation?  
  → B. The feature vector in that state
- **Q251** `review` — In the context of function approximation, what does Mu of S represent?  
  → B. The probability distribution of state visits
- **Q255** `verify` — Which problem arises due to the use of linear function approximation in reinforcement learning?  
  → C. Underfitting  
  *Gotcha:* Linear approximation may underfit, but this is not an inherent single 'problem' without assumptions about features.
- **Q258** `review` — What is the main purpose of using optimistic initial values in function approximation?  
  → B. To encourage exploration
- **Q260** `review` — What does the term "semi-gradient" refer to in the context of linear semi-gradient Temporal Difference learning?  
  → C. Using part of the gradient information to update parameters.
- **Q264** `review` — How many components does the feature vector have when there are four features and three actions in a stacked representation?  
  → C. 12
- **Q291** `usable` — What does state aggregation involve in reinforcement learning?  
  → A. Combining similar states into groups to reduce the dimensionality of the state space.
- **Q295** `usable` — When using Epsilon-greedy with function approximation, what role does the function approximator play?  
  → B. It approximates the Q-values for given states and actions
- **Q296** `usable` — What is a parameterized function in the context of reinforcement learning?  
  → B. A function that uses parameters (weights) to approximate another function.
- **Q297** `review` — What role does the discount factor play in Semi-Gradient TD learning?  
  → B. It controls the influence of future rewards on the updates
- **Q300** `usable` — In which type of environments is state aggregation particularly useful?  
  → C. Environments with a very large or continuous state space.

### C3-M3 · Coarse/tile coding, feature construction (11)

- **Q010** `verify` — What advantage does Tile Coding provide compared to a single large lookup table?  
  → C. More memory efficiency  
  *Gotcha:* Tile coding's key benefit is generalization with bounded sparse features; “memory efficiency” depends on the comparison/setup.
- **Q014** `verify` — Coarse coding can be seen as a form of which of the following in the context of state aggregation?  
  → A. Clustering  
  *Gotcha:* Coarse coding uses overlapping receptive fields; calling it clustering is misleading.
- **Q021** `usable` — How does coarse coding handle the trade-off between bias and variance?  
  → C. It balances bias and variance by using overlapping coarse features
- **Q048** `verify` — Which of the following algorithms is NOT typically used in reinforcement learning?  
  → C. Backpropagation  
  *Gotcha:* Backpropagation is widely used inside deep RL; it is an optimization mechanism, not an RL control algorithm.
- **Q062** `usable` — How does coarse coding help in handling large state spaces in reinforcement learning?  
  → C. By approximating value functions over a coarsely divided state space
- **Q084** `usable` — What is the impact of the granularity of coarse coding on learning?  
  → D. Coarser granularity increases both generalization and learning speed
- **Q123** `usable` — Which of the following best describes the primary goal of coarse coding?  
  → C. To generalize the state representation by using overlapping features
- **Q170** `review` — Which parameter is NOT typically a part of Tile Coding configuration?  
  → C. Learning rate
- **Q292** `usable` — Which of the following is a characteristic of states represented by coarse coding?  
  → B. States are represented by overlapping features, allowing for generalization
- **Q293** `usable` — What is a primary challenge when setting up Tile Coding?  
  → B. Selecting the number and size of tiles
- **Q299** `usable` — In coarse coding, what is the effect of having overlapping regions?  
  → C. It allows for better generalization and smoother function approximation

### C3-M4 · Average-reward control (6)

- **Q003** `review` — How is the average reward calculated in reinforcement learning?  
  → A. By summing up all rewards and dividing by the number of time steps
- **Q019** `verify` — Which mathematical concept is essential for understanding differential value functions?  
  → C. Algebra  
  *Gotcha:* Differential value functions need expectations and Bellman-style algebra; no single listed branch of mathematics is a sound answer.
- **Q047** `verify` — Which algorithm is commonly used to estimate the average reward in reinforcement learning?  
  → D. Temporal Difference (TD) learning  
  *Gotcha:* Average-reward methods include differential TD/control variants; “TD learning” alone is too broad.
- **Q063** `verify` — When might the average reward fail as a performance metric in reinforcement learning?  
  → C. In environments with sparse rewards  
  *Gotcha:* Sparse reward makes finite-sample estimates difficult, but does not make the average-reward objective invalid.
- **Q137** `review` — When using Epsilon-greedy with function approximation, what role does the function approximator play  
  → B. It approximates the Q-values for given states and actions
- **Q298** `usable` — What is the significance of the average reward in reinforcement learning?  
  → B. It helps in evaluating the performance of a learning agent over time

### C3-M5 · Policy gradient / actor-critic (36)

- **Q016** `usable` — In Actor-Critic, what does the "Actor" component represent?  
  → B. The policy function
- **Q029** `usable` — Which of the following statements is true about the Actor-Critic algorithm?  
  → C. It updates the policy based on the estimated advantage function
- **Q030** `verify` — In the policy gradient theorem, what does the policy gradient represent?  
  → B. The rate of change of the policy parameters  
  *Gotcha:* The policy gradient is \(\nabla_\theta J(\theta)\): change in expected performance with respect to policy parameters.
- **Q055** `usable` — Which of the following is true about the actor-critic method in reinforcement learning?  
  → B. The critic updates the value function while the actor updates the policy
- **Q057** `usable` — What is the primary objective of policy gradient algorithms in reinforcement learning?  
  → C. Maximize the expected cumulative reward
- **Q066** `review` — Which of the following is NOT a variation of policy gradient methods?  
  → A. Deep Q-Network (DQN)
- **Q067** `usable` — What is Softmax policy parameterization primarily used for in reinforcement learning?  
  → B. Action selection
- **Q075** `review` — In policy improvement, what does the policy gradient represent?  
  → A. Direction of steepest ascent in the parameter space
- **Q087** `usable` — In reinforcement learning, what does the policy gradient method aim to optimize?  
  → C. The policy directly
- **Q091** `verify` — Which factor influences the stability of policy gradient algorithms during training?  
  → A. Learning rate  
  *Gotcha:* Step size, noise, discounting, exploration, and regularization can all affect policy-gradient stability.
- **Q093** `usable` — Which of the following methods uses parameterized functions to directly approximate the policy in reinforcement learning?  
  → D. Policy Gradient Methods
- **Q103** `review` — In reinforcement learning, what does the temperature parameter 1 represent?  
  → B. The exploration-exploitation trade-off
- **Q114** `review` — What happens to the softmax temperature parameter as it approaches infinity?  
  → C. The policy becomes completely random
- **Q120** `usable` — Which component of a parameterized policy is typically adjusted during training?  
  → C. Parameters
- **Q121** `review` — In Actor-Critic, what is the purpose of the advantage function?  
  → B. To measure the improvement of taking a particular action in a given state over the average action
- **Q135** `usable` — In reinforcement learning, what does the policy gradient theorem provide a method for?  
  → C. Approximating the gradient of a policy's performance
- **Q155** `review` — How does the exploration-exploitation dilemma relate to parameterized policies?  
  → C. It defines the trade-off between trying new actions and exploiting known actions
- **Q164** `usable` — What is the goal of a policy gradient method in reinforcement learning?  
  → C. To improve the policy by optimizing the expected return
- **Q168** `usable` — In Softmax policy parameterization, what does the softmax function do?  
  → B. Normalizes values into probabilities
- **Q173** `usable` — In the context of neural networks, what do the parameters of a policy represent?  
  → D. The weights and biases
- **Q177** `verify` — Which of the following is NOT a source of bias in policy gradient methods?  
  → A. Variance reduction techniques  
  *Gotcha:* Finite samples mainly add variance, and an action-independent baseline preserves the expected gradient; no unique NOT answer exists.
- **Q192** `review` — What is the advantage of using a baseline in policy gradient methods?  
  → A. It reduces the variance of gradient estimates
- **Q193** `review` — In policy gradient algorithms, what is the role of the objective function?  
  → B. To maximize the expected cumulative reward
- **Q201** `usable` — How are policy gradient algorithms typically applied to continuous action spaces?  
  → C. By applying Gaussian policy distributions
- **Q203** `review` — Which parameter determines the degree of exploration in Actor-Critic with Softmax Policies?  
  → B. Temperature parameter
- **Q212** `verify` — Which type of policy directly associates actions with states without using a value function?  
  → C. Policy-based policy  
  *Gotcha:* A directly parameterized policy maps states to action probabilities/actions without greedy selection from a value function.
- **Q225** `review` — In numerical methods, what is one limitation of estimating the gradient using samples?  
  → C. Itis sensitive to the choice of step size
- **Q226** `verify` — What is the advantage of using the Actor-Critic algorithm over other reinforcement learning methods?  
  → B. Itis more stable and faster to converge  
  *Gotcha:* Actor–critic may lower variance and learn online, but it is not universally faster or more stable.
- **Q235** `review` — What does the exploration in Gaussian policies rely on?  
  → A. Random noise added to the mean action
- **Q239** `usable` — Which technique is commonly used to reduce the variance of policy gradient estimates?  
  → A. Actor-Critic methods
- **Q240** `review` — What is the main challenge associated with using parameterized policies in reinforcement learning?  
  → D. They can suffer from local optima
- **Q241** `review` — What is the advantage of using a higher number of sample points in estimating the gradient?  
  → A. Increased accuracy
- **Q273** `usable` — What is the advantage of using policy gradient methods over value-based methods like Q-learning?  
  → D. Ability to handle continuous action spaces
- **Q294** `review` — Which of the following methods is NOT typically used to learn the parameters of a Gaussian policy?  
  → C. Q-Learning
- **Q301** `review` — How are the actor and critic networks updated in Actor-Critic with Softmax Policies?  
  → C. Both the actor and critic networks are updated simultaneously
- **Q302** `usable` — What role does the critic play in Actor-Critic with Softmax Policies?  
  → C. It evaluates the quality of the policy chosen by the actor

### C4 · Capstone (experience replay, validation) (2)

- **Q037** `review` — In the context of Deep Q-Networks (DQN), what does the term "experience replay" refer to?  
  → B. Storing and reusing past experiences to stabilize learning.
- **Q038** `review` — What is one strategy for detecting inaccuracies in predictive models?  
  → B. Validating the model against new data

### OUT · Outside named curriculum (41)

Split below: RL-adjacent items need real understanding; decoys are hardcoded only.

- **Q004** `discard` — Which aspect of Temporal Difference makes it suitable for individuals with busy schedules?  
  → C. Flexibility in scheduling  *(decoy — hardcode only)*
- **Q005** `discard` — Which of the following is a technique for improving the accuracy of models with biased predictions?  
  → B. Regularization to penalize overly complex models  
  *Gotcha:* Regularization does not generally correct biased predictions; the bias source must be diagnosed. No option is generally valid.
- **Q007** `discard` — How can Monte-Carlo Tree Search algorithms be modified to favor exploration in uncertain or less explored regions?  
  → C. By increasing the exploration constant
- **Q009** `discard` — What role does the unpredictability of interstellar environments play in star exploration?  
  → B. It can lead to unexpected hazards and mission failures.  *(decoy — hardcode only)*
- **Q026** `discard` — What is discrimination in the context of learning and behavior?  
  → B. The ability to respond differently to similar but distinct stimuli.  *(decoy — hardcode only)*
- **Q033** `discard` — What is a common method for ensuring adequate exploration in the initial stages of a Monte-Carlo Tree Search?  
  → B. Increasing the exploration constant
- **Q035** `discard` — Which of the following algorithms is more prone to overfitting in reinforcement learning?  
  → B. Policy Gradient  
  *Gotcha:* No listed RL algorithm is generically most prone to overfitting; capacity, data, features, and evaluation determine risk.
- **Q039** `discard` — What does a Monte Carlo simulation typically produce?  
  → B. Arange of possible outcomes  *(decoy — hardcode only)*
- **Q042** `discard` — In which field of study is the estimation of gradients using samples commonly applied?  
  → B. Computer graphics  *(decoy — hardcode only)*  
  *Gotcha:* Sample gradient estimation is used across many fields, so computer graphics is not a unique valid answer.
- **Q043** `discard` — Which factor makes Temporal Difference particularly suitable for self-directed learners?  
  → C. Adaptive learning pathways  *(decoy — hardcode only)*
- **Q056** `discard` — Which term describes the process of gradually shaping behavior through the use of rewards?  
  → C. Reinforcement  
  *Gotcha:* Gradually reinforcing successive approximations is shaping; that intended term is absent.
- **Q060** `discard` — Which of the following is NOT a benefit of learning with Temporal Difference?  
  → C. Limited interaction with peers  *(decoy — hardcode only)*
- **Q083** `discard` — What advantage does Temporal Difference offer in terms of accessibility?  
  → C. Accessible anytime, anywhere  *(decoy — hardcode only)*
- **Q085** `discard` — Which exploration method in Monte Carlo control assigns exploration bonuses based on the number of times an action has been selected?  
  → A. UCB (Upper Confidence Bound)
- **Q089** `discard` — Why is it difficult to design technology for star exploration?  
  → D. The need for materials that can withstand extreme conditions.  *(decoy — hardcode only)*
- **Q092** `discard` — How does Temporal Difference enhance engagement compared to traditional learning methods?  
  → C. By offering real-time feedback and interactivity  *(decoy — hardcode only)*
- **Q094** `discard` — In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula typically depend on?  
  → D. The total number of times a node has been visited  
  *Gotcha:* MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\).
- **Q099** `discard` — Which of the following techniques is commonly used to balance exploration and exploitation in Monte-Carlo Tree Search (MCTS)?  
  → B. Upper Confidence Bound (UCB)
- **Q101** `discard` — In Monte-Carlo Tree Search, what does the exploration term in the Upper Confidence Bound formula ty depend on?  
  → D. The total number of times a node has been visited  
  *Gotcha:* MCTS UCB depends on parent and action visit counts, commonly \(\sqrt{\ln N(s)/N(s,a)}\).
- **Q102** `discard` — Why is the balance between discrimination and generalization crucial in adaptive learning systems?  
  → C. It allows the system to apply learned knowledge to new situations while recognizing differences.  *(decoy — hardcode only)*
- **Q107** `discard` — How can generalization be reduced in a learning environment?  
  → C. By providing specific cues for different responses.  *(decoy — hardcode only)*
- **Q111** `discard` — Which aspect of Temporal Difference makes it advantageous for learners?  
  → A. Real-time feedback  *(decoy — hardcode only)*
- **Q112** `discard` — What is the primary objective of reinforcement learning in build mode?  
  → B. To find the optimal strategy for an agent to maximize cumulative reward  *(decoy — hardcode only)*
- **Q117** `discard` — What term describes the phenomenon where people discount future rewards more steeply when the re are closer in time?  
  → A. Hyperbolic discounting  *(decoy — hardcode only)*
- **Q125** `discard` — Which factor is crucial for effectively managing episodic tasks?  
  → B. Flexibility  *(decoy — hardcode only)*
- **Q134** `discard` — Which strategy is NOT typically used to maintain exploration in Monte-Carlo Tree Search?  
  → C. Reducing the number of rollouts
- **Q136** `discard` — In Monte Carlo control, which exploration method considers uncertainty by sampling from a posterior distribution of action values?  
  → C. Thompson Sampling
- **Q148** `discard` — When a child learns to use a specific greeting for different individuals (e.g., 'Hi' for peers, 'Good morning teachers), this is an example of:  
  → B. Discrimination  *(decoy — hardcode only)*
- **Q154** `discard` — What happens if the eligibility trace decay rate is set too low in Semi-Gradient TD learning?  
  → B. The updates become more biased
- **Q156** `discard` — What term describes the phenomenon where people discount future rewards more steeply when the re\ are closer in time?  
  → A. Hyperbolic discounting  *(decoy — hardcode only)*
- **Q161** `discard` — What effect does decreasing the step size (h) have on the accuracy of the gradient estimation?  
  → A. Increases accuracy  *(decoy — hardcode only)*  
  *Gotcha:* Smaller finite-difference h lowers truncation error only until roundoff or sampling noise dominates.
- **Q163** `discard` — What is generalization in the context of learning and behavior?  
  → B. The process by which a response spreads from one specific stimulus to other stimuli that resemble original.  *(decoy — hardcode only)*
- **Q174** `discard` — What happens to the value of a reward if it is consistently provided regardless of behavior?  
  → B. It decreases  *(decoy — hardcode only)*  
  *Gotcha:* A reward value does not automatically decrease because it is behavior-independent; this confuses reward and reinforcer effectiveness.
- **Q190** `discard` — Which of the following is an example of generalization?  
  → C. Achild calls all four-legged animals "dog".  *(decoy — hardcode only)*
- **Q191** `discard` — What makes sending human missions to explore stars particularly challenging?  
  → B. The distances are too great for current spacecraft speeds.  *(decoy — hardcode only)*
- **Q194** `discard` — Which Monte Carlo method is particularly useful for high-dimensional integration?  
  → A. Markov Chain Monte Carlo (MCMC)
- **Q218** `discard` — Which task type is more conducive to forming habits?  
  → B. Continuing tasks.  *(decoy — hardcode only)*
- **Q263** `discard` — In an experiment, a pigeon is trained to peck a key when it sees a red light but not when it sees a green light. This is an example of:  
  → C. Discrimination  *(decoy — hardcode only)*
- **Q270** `discard` — Which term describes a methodical approach to handling episodic tasks?  
  → D. Time-blocking  *(decoy — hardcode only)*
- **Q284** `discard` — How can overfitting be addressed in machine learning models?  
  → A. By reducing the complexity of the model  *(decoy — hardcode only)*
- **Q307** `discard` — How does hyperbolic discounting differ from exponential discounting?  
  → A. Hyperbolic discounting values future rewards more than exponential discounting.  *(decoy — hardcode only)*  
  *Gotcha:* Hyperbolic discounting is steeper near the present and shallower at long delays; neither curve is always larger.
