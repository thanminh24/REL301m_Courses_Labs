# Question-First Execution Decision

## Decision

Replace the original slide-first, uniform-depth workflow with a
**question-first, slide-confirmed** workflow.

The 317-question bank determines what deserves learning time and how deep each concept should
go. The lecture decks remain the authority for correct explanations, notation, assumptions, and
corrections to defective supplied answers.

## Evidence

- 284/317 stems (89.6%) are “What,” “Which,” or “In” recognition-style questions.
- Only Q264 requires even trivial arithmetic; no coding, pseudocode tracing, multi-step backup,
  debugging, or experiment-design task appears.
- Course demand is uneven: C1 81, C2 110, C3 83, C4 2, OUT 41.
- Densest modules: TD control 39, policy gradient/actor–critic 36, prediction with approximation
  30, and Monte Carlo/off-policy 29.
- Quality is unreliable: 140 usable, 89 review, 47 verify, 41 discard; 56 audit notes and
  duplicate clusters require adjudication.
- The 37 `.pptx` decks contain 713 slides and 1,107 pictures, so uniform deep visual
  transcription is costly and poorly aligned with exam demand.

## Consensus from independent reviews

- [Depth opinion](question-first-depth-opinion.md): teach one level above the bank using D0–D3
  required tiers; D4 synthesis/code work is optional and excluded.
- [Mapping opinion](question-to-slide-mapping-opinion.md): normalize/cluster first, map each
  canonical question to one answer-bearing deck and slide/range, then compute demand-weighted
  depth and visual review.
- [Plan critique](question-first-plan-critique.md): current phase order is no-go; move question
  mapping before extraction-heavy authoring and measure throughput with a 20-question pilot.

## Required depth model

| Tier | Required learner capability | Required treatment |
|---|---|---|
| D0 | account for source/framing | objectives, big idea, terms, concise summary |
| D1 | recognize and define | D0 plus short definition and no-option recall |
| D2 | explain and distinguish | D1 plus mechanism, assumptions, nearest-confusion contrast |
| D3 | transfer once | D2 plus one small conceptual example or target/equation interpretation |
| D4 | derive, implement, debug, or synthesize | outside required exam route |

Concept score:

`S = unique audited demand + dependency centrality + error/confusion risk`

- `S=0`: D1 unless administrative/repeated content is D0.
- `S=1–2`: D2.
- `S=3–6`: D3.
- Duplicate copies count as one demand family.
- Discarded questions cannot increase demand.
- Sparse but prerequisite-critical concepts may rise to D2/D3 with recorded justification.

## Required mapping contract

For every question preserve:

- ID, original stem, A–D choices, supplied answer, module tag, and quality;
- normalized concept and duplicate cluster;
- scope: canonical, unsupported C4, OUT, or corrupt;
- one primary lecture and one-based slide/range for canonical items;
- evidence mode and mapping confidence;
- lecture-grounded verdict, correction, and explanation.

Targets:

- 274 C1–C3 questions: one primary deck/slide mapping with confidence A/B.
- 2 C4 + 41 OUT: explicit quarantine unless intro/review decks provide direct support.
- 317 originals: included exactly once and in original order in the final appendix.

## Visual review contract

- Mechanically index every slide and visually skim every slide once.
- Deep-review slides supporting mapped questions, review/verify conflicts, visual equations,
  low-text content, corrupted symbols, or missing answer-bearing content.
- Deep-review all substantive slides in D3 decks.
- For D0–D2 decks, deep-review triggered slides plus a stratified 10% sample.
- A sampled material miss expands review to the remaining untriggered slides in that deck.

## Learning-manual contract

1. Scope and evidence rules.
2. Exam-demand dashboard.
3. Minimal prerequisite and notation map.
4. Lecture-order chapters with visible D0–D3 depth rationale.
5. Cross-course confusion tables and formula interpretation sheet.
6. One loop: learn -> explain without options -> answer -> repair the miss -> repeat later.
7. Full Q001–Q317 appendix with originals, supplied keys, verdicts, corrections, and links.
8. Coverage matrix: question -> concept -> lecture/slide -> verdict.

## Go gate

Authoring may begin only after:

- all 317 records normalize and reconcile;
- duplicate clusters and 43 quarantine candidates are explicit;
- every C1–C3 item has a provisional concept/lecture mapping;
- a 20-question mixed pilot proves preservation, slide-grounded adjudication, navigation,
  depth calibration, and realistic throughput.

## Acceptance tests

- Every in-scope question points to a prior lesson passage that makes it answerable.
- Every correction and canonical equation has lecture/slide evidence.
- Every chapter records demand, risk, and D0–D3 depth.
- Every D2 concept has a contrast; every D3 concept has a one-step explanation/example.
- Supplied and corrected answers are visually distinct.
- Duplicate clusters have consistent mappings and verdicts.
- No required coding, multi-step trace, external source, or unsupported capstone expansion.
- Bidirectional coverage, anchor, count, and link checks pass.

## Unresolved questions

- Grading behavior for defective supplied keys is unknowable; final manual must show both the
  supplied key and lecture-grounded verdict.
- Intro/review support for the two C4 questions remains unknown until legacy `.ppt` conversion.

