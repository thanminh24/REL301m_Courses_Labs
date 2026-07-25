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

