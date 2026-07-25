# Course 2 Question-to-Slide Evidence Map

## Contract

This map covers all 110 canonical questions tagged `C2-M2`–`C2-M5` in the
[audited question index](../../../docs/final-exam-revision-question-index.md). A row may group
duplicate or tightly related stems, but every original ID remains visible.

Confidence:

- **A:** the slide explicitly states or visually displays the answer-bearing concept;
- **B:** a coherent slide range supports the interpretation or contrast;
- **C:** the requested claim is not directly taught or the deck is internally contradictory;
  the item is addressed but must remain flagged.

Depth:

- **D2:** define, explain, and distinguish;
- **D3:** D2 plus one target/equation/scenario interpretation.

Evidence mode is `T` for extracted slide text, `V` for inspected visual content, or `T+V`.

## Deck key

- **2.1:** [Introduction to Monte Carlo](<../../../docs/slides/slides/2.1 Introduction to Monte-Carlo Methods .pptx>)
- **2.2:** [Monte Carlo for Control](<../../../docs/slides/slides/2.2 Monte-Carlo for Control.pptx>)
- **2.3:** [Exploration Methods for Monte Carlo](<../../../docs/slides/slides/2.3 Exploration Methods for Monte-Carlo.pptx>)
- **2.4:** [Off-policy Learning for Prediction](<../../../docs/slides/slides/2.4 Off-policy learning for prediction.pptx>)
- **2.5:** [Introduction to TD Learning](<../../../docs/slides/slides/2.5 Introduction to Temporal Difference Learning.pptx>)
- **2.6:** [Advantages of TD](<../../../docs/slides/slides/2.6 Advantages of Temporal Difference.pptx>)
- **2.7:** [TD for Control](<../../../docs/slides/slides/2.7 Temporal Difference for Control.pptx>)
- **2.8:** [Q-learning](<../../../docs/slides/slides/2.8 Off-policy Temporal Difference Control Q-learning .pptx>)
- **2.9:** [Expected Sarsa](<../../../docs/slides/slides/2.9 Expected Sarsa.pptx>)
- **2.10:** [Models in RL](<../../../docs/slides/slides/2.10 Define model in Reinforcement Learning.pptx>)
- **2.11:** [Planning in RL](<../../../docs/slides/slides/2.11 Define Planning in Reinforcement Learning.pptx>)
- **2.12:** [Dyna](<../../../docs/slides/slides/2.12 Dyna as a formalism for planning.pptx>)
- **2.13:** [Inaccurate Models](<../../../docs/slides/slides/2.13 Dealing with inaccurate models .pptx>)

## Evidence matrix

| Question IDs | Normalized concept | Primary lecture / one-based slides | Mode | Depth | Confidence | Ambiguity or supplied-claim treatment |
|---|---|---|---|---|---|---|
| Q073, Q172, Q276 | MC uses random sampled episodes to estimate values/policies | 2.1/3–8 | T | D3 | A | The broad “reinforcement learning” classification is true but less useful than the sampled-return mechanism. |
| Q146, Q160 | Sample averaging, accuracy, and data requirement | 2.1/4–6 | T | D3 | A | More samples improve the empirical average in the deck; no fixed sample count or universal rate is claimed. |
| Q158, Q278 | Episodic sequence and update after termination | 2.1/7–9 | T+V | D3 | A | Applies to the MC algorithms taught in this deck; avoid universal claims about every possible MC variant. |
| Q166, Q259 | Policy evaluation and policy-generated episodes | 2.1/8–9 | T+V | D3 | A | Policy \(\pi\) both defines the value being estimated and generates the on-policy episode here. |
| Q180 | Return is accumulated discounted reward from a time/state | 2.1/9–12 | T+V | D3 | A | The bank's “total accumulated reward” wording omits discounting; deck formula supplies it. |
| Q188 | First-visit versus every-visit MC | 2.1/9 | V | D3 | C | Displayed algorithm records every encountered visit; first-visit is not separately defined. Bank audit says both average returns, but exact distinction lacks slide evidence. |
| Q224 | Model-free action-value estimation | 2.2/3–4; related 2.7/5–10 | T | D3 | C | MC and TD both estimate model-free action values, so the stem has multiple valid methods and no unique answer. |
| Q279 | Maintaining MC exploration for state–action coverage | 2.2/6–9 | T | D3 | A | Supplied “avoid local optima” is imprecise; slides say untried actions cannot be estimated. |
| Q171 | Boltzmann exploration drawback | 2.3/3–11 | T | D2 | C | Deck teaches exploring-start limits and epsilon-soft policies, not Boltzmann exploration. No slide-grounded correction is available. |
| Q001, Q017, Q288, Q290 | Behavior versus target policy; learning from different/historical behavior | 2.4/3, 5–10 | T | D3 | A | Slide 4's random-target example wording is inconsistent; use the stable definitions on slides 3 and 5–10. |
| Q081, Q110 | Proposal/behavior distribution and target closeness | 2.4/11–17 | T+V | D3 | B | The deck calls the sampling distribution \(b\); “proposal” is bank wording. It supports mismatch correction, not a universal quality formula. |
| Q028, Q115, Q246 | Importance sampling and variance claims | 2.4/11–17 | T+V | D3 | C | Slides establish ratio weighting only. They do not support “complexity” or importance sampling automatically reducing variance. |
| Q272 | Accumulated importance weights correct behavior-generated return | 2.4/11–13 | T+V | D3 | B | Slides show a one-sample ratio, not the full sequential product \(W\); the mapping is conceptually coherent but the exact algorithm is not displayed. |
| Q140, Q233 | TD combines sampled experience with a bootstrap target | 2.5/3–9 | T+V | D3 | A | The supplied core-idea answer matches the displayed target. |
| Q187, Q289 | TD error and state-value update | 2.5/4–9 | T+V | D3 | A | “Observed return” on slides 4/6 is loose wording; the displayed TD(0) target is one-step reward plus next estimate. |
| Q105, Q242 | Tabular TD stores separate table entries | 2.5/11–12 | V | D3 | B | Exact duplicate family. The slide shows state-value table entries, while options mention state-action pairs; tabular storage is the stable concept. |
| Q184, Q277 | TD as reinforcement learning from rewards/transitions | 2.5/3–12 | T+V | D3 | B | Both stems are overly broad; use the one-step value-estimation mechanism rather than “used for RL” as a definition. |
| Q230 | TD(0) objective | 2.5/2, 8–12 | T+V | D3 | B | Slides teach policy-value estimation via one-step updates, not general gradient descent on squared TD error. Supplied answer needs caveat. |
| Q256 | TD(0) algorithm steps | 2.5/9–12 | T+V | D3 | B | Options “prediction/evaluation/bootstrapping/backpropagation” are not a clean procedural list; use observe → target/error → update. |
| Q054 | Exploration parameter in TD(0) | 2.5/11–12; related 2.7/8–10 | V+T | D3 | C | TD(0) prediction has no exploration parameter; exploration rate belongs to a control behavior policy. Stem conflates prediction and control. |
| Q027, Q133 | MC full-return update versus TD one-step update | 2.6/11–17 | T | D3 | A | The second stem is truncated but its intended contrast matches the slides. |
| Q254, Q282 | TD can update from incomplete episodes | 2.6/3, 6, 12, 16 | T | D3 | A | Exact duplicate family. |
| Q032, Q051, Q182, Q231 | Claimed TD advantage over MC | 2.6/3–6, 11–16 | T | D3 | B | Online/incomplete-sequence bootstrapping is explicit; “always lower computation” or “faster convergence” is not a universal claim. |
| Q022, Q275 | TD versus DP/MC model requirement | 2.6/8, 17; related 2.5/3 | T | D3 | B | TD is model-free versus DP, but MC is also model-free; the proposed distinction in the first stem is incomplete. |
| Q118, Q247 | Online/incremental TD learning | 2.6/3, 6, 12, 16 | T | D3 | A | Changing-environment adaptation is a consequence of online updates, not a guarantee of tracking speed. |
| Q059, Q126, Q195, Q199, Q221 | Sarsa sampled next action and on-policy relationship | 2.7/5–10 | T+V | D3 | A | The target action \(A'\) is chosen by the same current policy used for behavior. |
| Q228 | Discount factor in Sarsa | 2.7/9–10 | T+V | D3 | A | Source symbol is \(\gamma\); corrupted “1” in the bank should not be memorized. |
| Q213, Q285 | Learning rate in Sarsa | 2.7/9–10 | T+V | D3 | B | Slides say \(\alpha\) controls update size; the non-convergence/fluctuation statement is not quantified. |
| Q266 | Epsilon-greedy action selection with Sarsa | 2.7/8–10 | T | D3 | A | The deck presents epsilon-greedy as the example current policy. |
| Q023, Q044, Q181, Q219, Q274 | Q-learning off-policy; contrast with Sarsa | 2.8/3, 8–11 | T+V | D3 | A | “Actions not necessarily taken by current policy” should mean different target/behavior policies, not fictitious transitions. |
| Q049, Q183, Q286 | Q-learning learning rate \(\alpha\) | 2.8/10, 16 | T+V | D3 | A | The bank symbols are corrupted; the visual equation makes \(\alpha\)'s role explicit. |
| Q050, Q071, Q197, Q205, Q210 | Q-learning target and iterative action-value improvement | 2.8/3–7, 10, 16 | T+V | D3 | B | One stem confuses executed-action reward with the max next-value term; “minimize TD error” is secondary to estimating \(Q^*\). |
| Q169, Q196 | Epsilon-greedy exploratory behavior in Q-learning | 2.8/3, 11, 16 | T+V | D3 | A | Exploration affects behavior; the learning target remains greedy. |
| Q198, Q236 | Q-learning goal / generic RL algorithm recognition | 2.8/3, 5, 7 | T | D3 | B | “Maximize total reward” is broad; slides more precisely say learn \(Q^*\) and an optimal policy. |
| Q077, Q108, Q200, Q244, Q280 | Expected Sarsa's probability-weighted next-action value | 2.9/5, 8, 12–13 | T+V | D3 | A | “Weighted sum” matches the displayed equation. |
| Q058 | Epsilon-greedy policy with Expected Sarsa | 2.9/7, 10, 14 | T | D3 | B | Deck uses epsilon-greedy in comparisons; it is common, not the only possible policy. |
| Q086 | Discount factor in Expected Sarsa | 2.9/5 | T+V | D3 | A | Source symbol is \(\gamma\); corrupted “y” in the bank is discount factor. |
| Q116, Q150, Q215, Q283 | Smoother/stabler expected updates | 2.9/3, 8–9, 12–15 | T | D3 | B | Deck supports its presented stability/variance comparison; do not convert it into a universal guarantee for every environment. |
| Q074 | Expected Sarsa in large action spaces | 2.9/5, 12–13 | T+V | D3 | C | Equation requires a sum over actions; deck never claims a large-action-space advantage. Premise unsupported. |
| Q237 | Need for policy action probabilities | 2.9/5, 8, 12 | T+V | D3 | A | Required to compute the expectation; “disadvantage” depends on whether those probabilities are available. |
| Q252 | Meaning of off-policy Expected Sarsa | 2.9/11–13; related 2.4/3, 5–10 | T | D3 | C | Supplied “actions not taken” is wrong. Off-policy means behavior and target differ; 2.9 does not fully formalize this case. |
| Q013, Q227, Q232 | Model, model-free, and model-based approach | 2.10/3–7 | T | D3 | A | Model-based use enables simulated consequences/planning; model-free omits that explicit model. |
| Q151, Q152 | Sample-versus-distribution information/efficiency | 2.10/8–16 | T | D3 | C | Slides 12–13 support cheap single samples versus richer/large distributions; slide 17 contradicts this. No universal sample-efficiency ranking. |
| Q176 | Learning a model from transition/reward experience | 2.10/3–4, 9, 11 | T | D3 | B | Historical transition data is coherent with the model definition, though the deck does not prescribe a single fitting method. |
| Q234 | Distribution-model method named in the supplied options | 2.10/10–16 | T | D3 | C | The deck defines a transition/reward distribution but never names particle filters. The supplied method cannot be verified from Course 2 slides. |
| Q269 | Distribution model represents probabilities over outcomes | 2.10/10–16 | T | D3 | A | The primary characteristic is explicit probability over possible next-state/reward outcomes. |
| Q267 | Sample model versus MC simulation | 2.10/8–9, 12; related 2.1/3–9 | T+V | D3 | C | Bank conflates model-free MC sampling with a model queried to generate one outcome. Preserve distinction. |
| Q287 | Difficulty accurately representing environment dynamics | 2.10/11–13; related 2.13/3–7 | T | D3 | B | Distribution models may be large/difficult; inaccurate models can harm planning. |
| Q072, Q185 | Planning uses a model to simulate/evaluate future outcomes | 2.11/4–10 | T | D3 | A | Slide 3 says “unimproved policy,” a typo contradicted by slides 4–5 and the objectives. |
| Q119, Q122, Q243, Q281 | Random-sample one-step tabular Q-planning | 2.11/4–7 | T+V | D3 | B | Q means action value; random planning provides update coverage, not real-environment exploration; the planning update still requires a model. |
| Q165 | Model-based action-value algorithm | 2.11/4–7 | T+V | D3 | C | Course 2 supports model-based planning but does not name dynamic programming here as the unique answer. Requires Course 1 evidence. |
| Q012 | Dyna-Q versus Q-learning | 2.12/15–20 | T+V | D3 | A | Dyna-Q adds learned-model planning to direct Q-learning. Options A and C are near-equivalent; supplied A is acceptable. |
| Q002 | Dyna benefit | 2.12/9–10, 20 | T | D3 | B | Slides emphasize sample efficiency/faster learning in some cases; supplied “scalability and adaptability” omits the central benefit. |
| Q109, Q257 | Purpose of Dyna architecture | 2.12/3–7, 11–15 | T+V | D3 | C | Both duplicate stems offer no correct option. Dyna integrates acting, direct learning, model learning, search control, and planning. |
| Q145 | Type of model in Dyna | 2.12/3–7, 11–15; related 2.10/8–16 | T+V | D3 | C | “Dynamic models” is not a deck category. Dyna learns an environment model; sample/distribution are the taught model types. |
| Q113 | Causes and meaning of model inaccuracy | 2.13/3–10 | T | D2 | B | Deck teaches missing transitions and environment change. Bank's data-quality/assumption/overfitting taxonomy is generic, not slide-derived. |

## Coverage and ambiguity summary

- **Coverage:** 110/110 C2 IDs appear exactly once in the matrix.
- **Explicitly flagged confidence C:** Q028, Q054, Q074, Q109, Q115, Q145, Q151, Q152,
  Q165, Q171, Q188, Q224, Q234, Q246, Q252, Q257, Q267.
- **Deck inconsistencies affecting interpretation:**
  - 2.4 slide 4 confuses the example target/behavior wording; slides 3 and 5–10 are coherent.
  - 2.6 slides 7/15 attribute exploration balance to TD updates; the prediction algorithm has
    no action-selection parameter.
  - 2.9 slide 4 attributes a maximum target to Sarsa; slides 6–8 and 11–13 give the coherent
    Sarsa/Q-learning contrast.
  - 2.10 slide 17 conflicts with slides 12–13 on sample/distribution efficiency.
  - 2.11 slide 3 says planning produces an “unimproved” policy; slides 4–5 and the objective say
    improved.
  - 2.13 slides 15–18 conflict with the explicit Dyna-Q+ bonus definition on slides 12–14.
- **Image-backed evidence inspected:** 2.1/9–12, 2.4/12–13, 2.5/7, 9, 11–12, 2.7/9,
  2.8/4, 6, 10, 2.9/5, 2.10/14, 2.11/6, 2.12/3, 15, and 2.13/12, 14.

## Unresolved questions

- Q171 has no Boltzmann-exploration evidence in any Course 2 deck.
- Q165's supplied dynamic-programming answer needs Course 1 slide evidence, not Course 2.
- Q188's first-visit/every-visit distinction is not explicitly taught in the 2.1 deck.
- Importance-sampling variance claims in Q028/Q115/Q246 are not adjudicable from the Course 2
  slides beyond rejecting an automatic variance-reduction rule.
