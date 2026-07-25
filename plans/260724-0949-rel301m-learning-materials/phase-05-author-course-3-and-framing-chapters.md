# Phase 05 — Author Demand-Weighted Course 3 and Framing Lessons

## Context links

- [Parent plan](plan.md)
- [Phase 02](phase-02-extract-and-audit-lecture-decks.md)
- [Phase 03](phase-03-author-course-1-chapters.md)
- [Phase 04](phase-04-author-course-2-chapters.md)
- [Manual architecture](research/learning-manual-architecture.md)

## Overview

- Date: 2026-07-24
- Description: teach function approximation and policy methods; integrate intro and review.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- Course 3 changes representation, not the fundamental prediction/control goals.
- The learning bridge is table lookup -> parameterized estimate -> gradient/semi-gradient update.
- Policy-gradient and actor–critic concepts need role clarity more than implementation detail.
- Introduction and review decks frame scope and must be accounted for without duplicating chapters.
- Dense policy-gradient/function-approximation demand justifies D3 conceptual treatment, while
  sparse episodic-Sarsa/exploration details should remain D2 unless prerequisites require more.

## Requirements

- Author one complete chapter for lectures 3.1–3.12.
- Add concise introduction and final-review chapters from the two legacy decks.
- Display raw/unique demand, quality mix, mapped IDs, and assigned D0–D3 depth per chapter.
- Apply tier-sized treatment; do not expand low-demand lecture details uniformly.
- Keep focus on conceptual purpose, relationships, and interpretation.
- Explain notation and objective functions in plain language.
- Link relevant Q IDs and provide Course 3 cheat sheet/checkpoint.
- Reconcile review-deck terminology with detailed chapters.

## Architecture

Course 3 progression:

```text
supervised-learning view of value estimation
  -> on-policy prediction objective
  -> TD objective and semi-gradient issue
  -> linear TD
  -> state aggregation/coarse coding/tile coding
  -> episodic Sarsa with approximation
  -> exploration with approximation
  -> average reward
  -> parameterized policies
  -> policy-gradient objective/theorem
  -> actor–critic
  -> policy parameterizations
```

## Related code files

- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/lecture-3-*.md`
- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/course-*.md`
- `docs/rel301m-complete-learning-guide.md`

## Implementation Steps

1. Freeze Course 3/framing demand matrix and depth outline; author D3 before D2/D1/D0.
2. Write course introduction: scope, agent–environment loop, and course progression.
3. Write 3.1: why approximation, supervised-learning analogy, generalization, and parameters.
4. Write 3.2: MSVE/on-policy objective and state weighting.
5. Write 3.3: TD objective, bootstrapped target, and semi-gradient intuition.
6. Write 3.4: linear value function and feature-vector interpretation.
7. Write 3.5: state aggregation, coarse coding, tile coding, locality, and trade-offs.
8. Write 3.6: action-value approximation and episodic Sarsa concept.
9. Write 3.7: exploration complications under approximation.
10. Write 3.8: continuing tasks, average reward, and differential values.
11. Write 3.9: parameterized stochastic policies and preference functions.
12. Write 3.10: policy-gradient objective and gradient direction.
13. Write 3.11: actor and critic roles, TD error as learning signal, baseline intuition.
14. Write 3.12: softmax/discrete and Gaussian/continuous policy parameterization.
15. Write course review: dependency map and end-to-end conceptual recap.
16. Build Course 3 cheat sheet and cross-course representation/objective comparison.
17. Add no-option recall before mapped questions and Course 3 checkpoint.
18. Verify every mapped question points to an answer-enabling passage.
19. Review notation across Course 1 values, Course 2 targets, and Course 3 parameters.

## Todo list

- [x] Course introduction chapter complete.
- [x] Lectures 3.1–3.4 complete.
- [x] Lectures 3.5–3.8 complete.
- [x] Lectures 3.9–3.12 complete.
- [x] Course review chapter complete.
- [x] Course 3 cheat sheet/checkpoint complete.
- [x] All mapped C3 questions linked.
- [x] Every chapter shows demand/risk/depth justification.
- [x] Cross-course notation review complete.

## Success Criteria

- 12/12 Course 3 chapters plus intro/review satisfy assigned D0–D3 contracts.
- Learner can explain why and how approximation changes tabular learning.
- Learner can distinguish value-based, policy-gradient, and actor–critic approaches.
- Every C3 question is answerable from a prior passage without option-letter memorization.
- D2 concepts include contrasts; D3 concepts include one small interpretation/example step.
- Average-reward and discounted objectives are not conflated.
- All C3-tagged questions have a supported chapter mapping.

## Risk Assessment

- **High:** mathematical notation obscures intuition. Mitigation: idea -> terms -> equation ->
  interpretation order in every chapter.
- **Medium:** generic ML questions drift beyond slides. Mitigation: source boundary and OUT
  quarantine.
- **Medium:** legacy review deck conversion reveals conflicting shorthand. Mitigation: mark the
  review as summary; detailed lecture evidence wins with an explicit note.

## Security Considerations

- Legacy Office conversion remains local and macro-free.
- Do not import generic internet explanations to “improve” lecture content.

## Next steps

All lecture anchors are now available for full question mapping and correction in Phase 06.
