# REL301m Learning Materials Source Inventory

## Summary

Canonical source boundary:

- all 39 lecture decks in [`docs/slides/slides/`](../../../docs/slides/slides/);
- the audited 317-question bank in
  [`docs/final-exam-revision-question-index.md`](../../../docs/final-exam-revision-question-index.md).

Excluded from content synthesis: labs, notebooks, assignments, textbook, Coursera/web pages,
and Group Assignment material. They may not silently fill lecture gaps.

## Lecture inventory

| Group | Decks | Known slides | Notes |
|---|---:|---:|---|
| Course introduction | 1 | unknown | legacy `.ppt`; conversion required |
| Course 1 | 12 | 238 | `.pptx` |
| Course 2 | 13 | 248 | `.pptx` |
| Course 3 | 12 | 227 | `.pptx` |
| Course review | 1 | unknown | legacy `.ppt`; conversion required |
| **Total** | **39** | **713+** | 713 across 37 `.pptx` decks |

### Course 1 decks

| Deck | Slides |
|---|---:|
| 1.1 K-Armed Bandit Problem | 18 |
| 1.2 Estimating Action Values | 13 |
| 1.3 Exploration vs. Exploitation | 20 |
| 1.4 Markov Decision Processes | 15 |
| 1.5 Goal of Reinforcement Learning | 19 |
| 1.6 Continuing Tasks | 18 |
| 1.7 Policies and Value Functions | 23 |
| 1.8 Bellman Equations | 20 |
| 1.9 Optimality | 28 |
| 1.10 Policy Evaluation | 30 |
| 1.11 Policy Iteration | 19 |
| 1.12 Generalized Policy Iteration | 15 |

### Course 2 decks

| Deck | Slides |
|---|---:|
| 2.1 Introduction to Monte Carlo | 23 |
| 2.2 Monte Carlo for Control | 24 |
| 2.3 Exploration Methods for Monte Carlo | 13 |
| 2.4 Off-policy Learning for Prediction | 19 |
| 2.5 Introduction to TD Learning | 17 |
| 2.6 Advantages of TD | 19 |
| 2.7 TD for Control | 18 |
| 2.8 Q-learning | 18 |
| 2.9 Expected Sarsa | 17 |
| 2.10 Models in RL | 23 |
| 2.11 Planning in RL | 13 |
| 2.12 Dyna | 24 |
| 2.13 Inaccurate Models | 20 |

### Course 3 decks

| Deck | Slides |
|---|---:|
| 3.1 Value Functions as Supervised Learning | 30 |
| 3.2 Objective for On-policy Prediction | 23 |
| 3.3 Objective for TD | 18 |
| 3.4 Linear TD | 15 |
| 3.5 Feature Construction for Linear Methods | 23 |
| 3.6 Episodic Sarsa with Function Approximation | 25 |
| 3.7 Exploration under Function Approximation | 13 |
| 3.8 Average Reward | 22 |
| 3.9 Learning Parameterized Policies | 13 |
| 3.10 Policy Gradient for Continuing Tasks | 13 |
| 3.11 Actor–Critic | 17 |
| 3.12 Policy Parameterizations | 15 |

## Extraction findings

- The 37 `.pptx` decks contain 713 slides, 174,614 extractable text characters, 1,107
  pictures, and 4 native tables.
- Every `.pptx` slide has some text, but equations and worked examples are frequently pictures.
- Speaker notes are effectively absent; slide bodies and visuals are the authoritative source.
- `python-pptx` 1.0.2 is available for structured text/table/image inventory.
- `markitdown`, LibreOffice/`soffice`, and Pandoc are unavailable in the current environment.
- The introduction and review are binary `.ppt`; a legacy conversion dependency is therefore a
  hard preflight gate.
- Text extraction alone is insufficient. Implementation needs rendered-slide review or an
  equivalent visual path for formulas, diagrams, and examples.

## Question-bank inventory

- Questions: 317 (`Q001`–`Q317`), each with a unique heading and anchor.
- Multiple-choice options and supplied answers: complete for all 317.
- Existing audit notes: 56.
- Quality labels: 140 usable, 89 review, 47 verify, 41 discard.
- Course mapping: C1 81, C2 110, C3 83, C4 2, OUT 41.
- Current file size: 6,300 lines.

The current bank is the exam-demand source, not yet a complete learning manual. Its 90-minute
refresher merges topics and does not map individual questions to answer-bearing slides.

## Planning implications

1. Parse, normalize, and cluster all questions before deciding lecture depth.
2. Preserve question wording, options, and supplied answers separately from corrections.
3. Map each of 274 C1–C3 items to one primary lecture/slide and optional prerequisites.
4. Quarantine the 2 C4 and 41 OUT items unless canonical decks directly support them.
5. Compute D0–D3 lecture depth from unique demand, prerequisite centrality, and error risk.
6. Keep all questions once in an appendix; lecture chapters link to IDs instead of duplicating.
7. Mechanically index/skim every slide; deep-review demand/risk-triggered visuals.
8. Record slide provenance for every correction, equation, and answer-bearing claim.

## Unresolved questions

- Exact slide counts for the two legacy `.ppt` decks remain unknown until conversion.
- Exact final-exam weighting is unknown; deduplicated question density is only a proxy.
