# Phase 04 — Author Demand-Weighted Course 2 Lessons

## Context links

- [Parent plan](plan.md)
- [Phase 02](phase-02-extract-and-audit-lecture-decks.md)
- [Phase 03](phase-03-author-course-1-chapters.md)
- [Manual architecture](research/learning-manual-architecture.md)
- [Question bank](../../docs/final-exam-revision-question-index.md)

## Overview

- Date: 2026-07-24
- Description: teach sample-based prediction, control, models, planning, and Dyna.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- Course 2 is best learned through target construction: full return, sampled bootstrap,
  greedy bootstrap, expected bootstrap, and model-generated transition.
- On-policy/off-policy and prediction/control are independent axes and must not be conflated.
- Dyna is an architecture integrating acting, direct learning, model learning, and planning.
- Course 2 carries the highest raw demand (110 questions), especially TD control, but duplicate
  clusters and defective keys must determine depth by concept rather than raw count.

## Requirements

- Author one complete chapter for lectures 2.1–2.13.
- Display raw/unique demand, quality mix, mapped IDs, and assigned D0–D3 depth per chapter.
- Follow the tier-sized contract rather than uniform walkthrough depth.
- Ground explanations in verified slide evidence and Course 1 definitions.
- Emphasize conceptual comparisons and update-target meaning.
- Explain equations only to the depth needed to interpret each method.
- Link all relevant Q IDs without duplicating question bodies.
- End with Course 2 cheat sheet and mastery checkpoint.

## Architecture

Course 2 progression:

```text
Monte Carlo prediction
  -> Monte Carlo control and exploration
  -> off-policy prediction
  -> TD prediction and its advantages
  -> Sarsa-style control
  -> Q-learning
  -> Expected Sarsa
  -> models
  -> planning
  -> Dyna
  -> inaccurate/changing models
```

Central comparison table fields:
target, bootstrap, episode required, policy relationship, model required, main trade-off.

## Related code files

- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/lecture-2-*.md`
- `docs/rel301m-complete-learning-guide.md`
- `docs/final-exam-revision-question-index.md`

## Implementation Steps

1. Freeze the Course 2 demand matrix and depth outline; author D3 before D2/D1/D0.
2. Write 2.1: Monte Carlo prediction, returns, first/every visit, and episode completion.
3. Write 2.2: Monte Carlo control and generalized policy iteration with sampled experience.
4. Write 2.3: exploring starts and epsilon-soft exploration.
5. Write 2.4: behavior versus target policy, coverage, and importance sampling.
6. Write 2.5: TD error, bootstrapping, and one-step prediction.
7. Write 2.6: TD versus MC/DP, online learning, bias, variance, and continuing tasks.
8. Write 2.7: TD control and Sarsa’s on-policy target.
9. Write 2.8: Q-learning’s greedy target and off-policy interpretation.
10. Write 2.9: Expected Sarsa and expected next-action value.
11. Write 2.10: distribution models, sample models, and learned-model uncertainty.
12. Write 2.11: planning as value/policy improvement using a model.
13. Write 2.12: Dyna loop and relationship among experience, model, and planning.
14. Write 2.13: changing/inaccurate models, exploration bonus, and Dyna-Q+ intuition.
15. Build comparison sheets: MC/TD/DP; Sarsa/Q-learning/Expected Sarsa; model/direct/planning.
16. Add no-option recall before lecture-linked questions and Course 2 checkpoint.
17. Verify every mapped question points to an answer-enabling passage.
18. Review all use of “off-policy,” “model-free,” “sample,” and “planning.”

## Todo list

- [x] Lectures 2.1–2.4 complete.
- [x] Lectures 2.5–2.6 complete.
- [x] Lectures 2.7–2.9 complete.
- [x] Lectures 2.10–2.13 complete.
- [x] Course 2 comparison sheets complete.
- [x] Course 2 mastery checkpoint complete.
- [x] All mapped C2 questions linked.
- [x] Every chapter shows demand/risk/depth justification.
- [x] Terminology consistency review complete.

## Success Criteria

- 13/13 lecture chapters satisfy their assigned D0–D3 contract.
- Learner can explain how every method forms its learning target.
- Learner can distinguish behavior/target policies and direct/planning updates.
- Every C2 question is answerable from a prior passage without memorizing its option letter.
- D2 concepts include contrasts; D3 concepts include one small target/example step.
- All C2-tagged questions have a supported chapter mapping.
- No algorithm is reduced to an unsupported “always better” claim.

## Risk Assessment

- **High:** slide/question ambiguity around off-policy and Expected Sarsa. Mitigation: anchor to
  behavior-versus-target definitions and state caveats explicitly.
- **Medium:** Dyna confused with only model learning. Mitigation: dedicated architecture diagram
  in words and a four-part comparison.
- **Medium:** importance sampling oversimplified as variance reduction. Mitigation: explain
  support and variance risk.

## Security Considerations

- No external services needed after extraction.
- Preserve source wording separately from explanatory corrections.

## Next steps

Use Course 2 comparison anchors when mapping the high-density C2 question group in Phase 06.
