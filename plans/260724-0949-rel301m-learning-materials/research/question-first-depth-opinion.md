---
type: researcher
date: 2026-07-24
---

# Researcher Opinion: Question-First Depth for REL301m

## Summary

Use a **one-level-above-the-bank** model. The bank should decide emphasis, not truth or the
maximum learning depth. Most items need recognition only, but reliable performance requires
learners to explain the concept without choices, distinguish its nearest confusions, and perform
one small reasoning step for equations and update targets. Full derivations, code, implementation
traces, debugging, and capstone synthesis are not justified by this exam.

## Local Evidence

- The index classifies the bank mainly as Bloom L1–L2, with only a small L2–L3 slice.
- 284/317 stems (89.6%) start with “What,” “Which,” or “In”; Q264 is the only even trivial
  arithmetic item. No multi-step Bellman, TD, importance-ratio, or policy-probability work appears.
- Answer positions are exploitable: B/C hold 232/317 answers (73.2%).
- Reliability is weak: 140 `usable`, 89 `review`, 47 `verify`, and 41 `discard`; duplicates and
  corrupted symbols further inflate apparent coverage.
- The densest modules are TD control (39), policy gradient/actor–critic (36), function
  approximation prediction (30), and MC/off-policy (29): 134/317 items.
- Source hierarchy already established: lectures define concepts; questions define practice
  demand; audit notes flag conflicts.

## Depth Tiers

| Tier | Learner can | Required treatment |
|---|---|---|
| D0 — Account | locate the source, recognize that a slide existed | source matrix only; use for title, agenda, transition, repetition, or genuinely out-of-scope content |
| D1 — Recognize | define a term/symbol and identify its role | 1–2 short paragraphs, vocabulary/symbol list, two no-option recall prompts |
| D2 — Explain | explain mechanism in own words and reject the nearest misconception | D1 plus mechanism, contrast table, boundary/assumption, 3–5 recall prompts |
| D3 — Transfer once | interpret an equation, form one update/target, predict one parameter effect, or choose between algorithms from a short scenario | D2 plus one worked conceptual example, one decision prompt, 5–8 retrieval prompts |
| D4 — Synthesize | derive, implement, debug, trace several steps, or design an experiment | outside required route; mention only as optional extension when a slide explicitly points there |

“Worked conceptual example” may use one transition or tiny scalar calculation; it must not become
code or an implementation trace.

## Per-Concept Decision Rule

Score concepts, not decks or raw question totals; a D3 deck may still contain D0 slides.

| Factor | 0 | 1 | 2 |
|---|---|---|---|
| Unique audited demand `Q` | no clean mapped family | 1–2 distinct families | 3+ distinct families |
| Dependency centrality `C` | local detail | supports one later idea | prerequisite across methods/courses |
| Error/confusion risk `R` | clean terminology | `review` item or close contrast | `verify`, symbol corruption, contradictory key, or repeated misconception |

Set `S = Q + C + R`: `S=0 → D1`, `S=1–2 → D2`, `S=3–6 → D3`.

Apply these overrides:

1. Administrative/repeated slides are D0 even inside a D3 deck.
2. Any in-scope equation or algorithm target is at least D2; raise to D3 when a learner must
   distinguish its terms or compare it with another target.
3. Exact and high-similarity duplicates count as one family for `Q`.
4. A `discard` item cannot raise `Q`; it raises `R` only when it corrupts a real lecture concept.
5. No direct bank item caps a non-prerequisite detail at D1–D2; central prerequisites can still
   reach D3. This prevents sparse bank sampling from breaking the mental model.
6. Lecture target is the maximum concept tier; prose allocation follows each concept score, not
   uniform slide-by-slide expansion.

## Recommended Deck Targets

| Decks | Target | Reason |
|---|---|---|
| `0. Course Introduction`, `6. Review course` | D1 | framing/retrieval index; do not reteach duplicate content |
| `1.1`–`1.4` | D3 | bandit values, exploration, and MDP foundations drive many distinctions |
| `1.5` | D2 | goal/reward framing; explanation and misconceptions matter more than calculation |
| `1.6`–`1.12` | D3 | returns, values, Bellman relationships, optimality, DP, and GPI are dependencies |
| `2.1`–`2.5` | D3 | MC/TD boundary, control, exploration, off-policy, and importance sampling |
| `2.6` | D2 | comparative advantages chapter; use a clean MC/DP/TD contrast |
| `2.7`–`2.13` | D3 | Sarsa/Q-learning/Expected Sarsa targets and model/planning/Dyna distinctions |
| `3.1`–`3.5` | D3 | objectives, gradients, linear TD, and feature construction; many symbol defects |
| `3.6`–`3.7` | D2 | bank coverage is sparse/duplicated; teach mechanism and boundary, not traces |
| `3.8` | D3 | average reward/differential values are sparse but unusually error-prone |
| `3.9`–`3.12` | D3 | dense policy-gradient, softmax, baseline, actor/critic demand |

## Manual Structure

Keep the lecture sequence, but make demand visible before exposition:

1. **Exam profile and evidence rules:** depth statistics, quality labels, answer-position warning.
2. **Whole-course model and notation:** agent–environment loop and canonical symbols.
3. **Each lecture chapter:** source/slide span → exam signal (unique families, quality split,
   target tier) → big idea → mechanism → equation interpretation → nearest-confusion table →
   tier-sized example/prompts → linked original questions → correction notes → mastery gate.
4. **Course checkpoint:** mixed no-option recall first, then MCQ; cheat sheet after retrieval.
5. **Cross-course confusion matrix:** reward/return/value, prediction/control, DP/MC/TD,
   on/off-policy, sampled/expected/max targets, direct RL/planning/Dyna, value/policy methods.
6. **Full Q001–Q317 appendix:** originals once, supplied key preserved, corrected verdict and
   lecture link; duplicates cross-referenced rather than given repeated study weight.

Mastery gate: D1 = accurate definition; D2 = explain and contrast without options; D3 = solve the
one-step prompt and justify the choice. Wrong option letters never count as a diagnosis.

## Protection Against Flawed-Question Memorization

- Never use the supplied key as authority; adjudicate against the mapped lecture slide.
- Show **original**, **supplied answer**, and **editorial verdict/corrected answer** as separate fields.
- `usable`: practise normally. `review`: state the hidden assumption/caveat. `verify`: explain the
  defect and provide a slide-grounded replacement stem. `discard`: do not force an answer.
- Ask free recall before revealing A–D; rotate option order in checkpoints while preserving the
  original appendix. This neutralizes the B/C bias.
- Collapse duplicates during scheduling. Require “why the other choices fail” for ambiguous items.
- Repair corrupted `γ`, `ε`, `π`, truncation, and overloaded terms in teaching prose; preserve the
  corruption only inside the visibly labeled original.

## Validation Checks

- **Coverage:** all 39 decks and known 713 `.pptx` slides accounted for; Q001–Q317 each exactly once.
- **Depth:** every chapter records its scored concepts; every D2 concept has a contrast and every D3
  concept has a one-step example plus no-option justification prompt.
- **Question integrity:** all 89 `review`, 47 `verify`, and 41 `discard` labels retained and handled;
  exact/high-similarity duplicates do not inflate depth.
- **Evidence:** every corrected answer and canonical equation has a lecture/slide anchor; conflicts
  are explicit, never silently overwritten.
- **Assessment validity:** checkpoints hide choices initially, balance option positions, and test
  explanations rather than letter recall.
- **Scope:** no coding, pseudocode execution, multi-step traces, outside curriculum, or unsupported
  capstone expansion enters the required route.
- **Consistency:** notation, cheat sheets, comparison tables, chapter explanations, and corrected
  answers agree.

## Unresolved Questions

- Exact exam weighting remains unknown; use distinct audited family counts as the provisional
  weighting and report final per-lecture counts after slide-level mapping.

Status: DONE

Summary: Defined a bank-calibrated D0–D4 model, scoring rule, targets for all 39 decks, manual
structure, anti-memorization controls, and release checks.

Concerns/Blockers: Final per-lecture scoring depends on the planned slide-level question mapping.
