# Phase 03 — Author Demand-Weighted Course 1 Lessons

## Context links

- [Parent plan](plan.md)
- [Phase 02](phase-02-extract-and-audit-lecture-decks.md)
- [Manual architecture](research/learning-manual-architecture.md)
- [Question bank](../../docs/final-exam-revision-question-index.md)

## Overview

- Date: 2026-07-24
- Description: teach all Course 1 lectures in sequence and build its conceptual cheat sheet.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- Course 1 supplies vocabulary and Bellman reasoning required everywhere else.
- Common failures are category confusion: reward/return/value, evaluation/control,
  expectation/optimality, and episodic/continuing.
- Chapters must explain why a concept exists before presenting notation.
- Question demand and prerequisite centrality require deep treatment of most foundations, but
  administrative/repeated and untested slide details remain D0/D1.

## Requirements

- Author one complete chapter for each lecture 1.1–1.12.
- Display raw/unique demand, quality mix, mapped IDs, and assigned D0–D3 depth per chapter.
- Follow the tier-sized chapter contract; do not expand every lecture uniformly.
- Use only verified Phase 02 evidence.
- Keep explanations conceptual; no programming or code tracing.
- Define demanded equation symbols and interpret the relation one step above the bank.
- Link relevant Q IDs without duplicating full questions.
- End Course 1 with a cheat sheet and mastery checkpoint.

## Architecture

Course 1 progression:

```text
bandit problem
  -> action-value estimation
  -> exploration/exploitation
  -> MDPs and RL objective
  -> episodic/continuing returns
  -> policies and values
  -> Bellman equations
  -> optimality
  -> policy evaluation
  -> policy iteration
  -> generalized policy iteration
```

## Related code files

- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/lecture-1-*.md`
- `docs/rel301m-complete-learning-guide.md`
- `docs/final-exam-revision-question-index.md`

## Implementation Steps

1. Freeze the Course 1 demand matrix and depth outline; author D3 before D2/D1/D0.
2. Write 1.1: k-armed bandit setup, action values, regret intuition, and stationary assumptions.
3. Write 1.2: sample-average and constant-step-size estimates; clarify estimate versus truth.
4. Write 1.3: exploration/exploitation, epsilon-greedy, optimism, UCB, and softmax distinctions.
5. Write 1.4: MDP components, Markov property, transition/reward dynamics.
6. Write 1.5: reward hypothesis, return, discounting, and agent objective.
7. Write 1.6: episodic versus continuing tasks and terminal-state treatment.
8. Write 1.7: policies, state values, action values, and expectation under a policy.
9. Write 1.8: Bellman decomposition and expectation equations in words and symbols.
10. Write 1.9: optimal policies, optimal values, and Bellman optimality.
11. Write 1.10: iterative policy evaluation and convergence intuition.
12. Write 1.11: policy improvement and policy iteration.
13. Write 1.12: generalized policy iteration and interacting evaluation/improvement.
14. Add comparison tables and a Course 1 formula/terminology cheat sheet.
15. Add free-recall checks before mapped multiple-choice questions.
16. Verify every mapped question points to an answer-enabling passage.
17. Review continuity: later chapters must reuse terms consistently with earlier definitions.

## Todo list

- [x] Lectures 1.1–1.3 complete.
- [x] Lectures 1.4–1.6 complete.
- [x] Lectures 1.7–1.9 complete.
- [x] Lectures 1.10–1.12 complete.
- [x] Course 1 cheat sheet complete.
- [x] Course 1 mastery checkpoint complete.
- [x] All mapped C1 questions linked.
- [x] Every chapter shows demand/risk/depth justification.
- [x] Course-level consistency review complete.

## Success Criteria

- 12/12 lecture chapters satisfy their assigned D0–D3 contract.
- A learner can distinguish all listed common-confusion pairs in their own words.
- Every C1 question is answerable from a prior passage without memorizing its option letter.
- D2 concepts include contrasts; D3 concepts include one small reasoning/example step.
- All C1-tagged questions have a natural chapter destination.
- No lecture content depends on outside sources or coding knowledge.

## Risk Assessment

- **Medium:** over-compressing Bellman/DP material. Mitigation: preserve the lecture sequence and
  include intuitive decomposition before formulas.
- **Medium:** repeated definitions drift. Mitigation: canonical glossary and consistency pass.
- **Low:** too much arithmetic for target level. Mitigation: examples illustrate meaning, not
  lengthy calculation drills.

## Security Considerations

- No secrets or external services involved.
- Respect source integrity; paraphrase teaching content and cite deck/slide provenance.

## Next steps

Course 1 anchors and definitions become prerequisites for Courses 2–3 and question mapping.
