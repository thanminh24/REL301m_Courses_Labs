---
title: "Question-to-Slide Mapping Opinion"
date: 2026-07-24
scope: "317 questions, 39 canonical lecture decks"
status: recommended
---

# Question-to-Slide Mapping Opinion

## Executive opinion

Use a **question-first, slide-confirmed** mapping. Normalize and cluster all questions before
authoring, retrieve candidate slides from the full mechanical extraction, then accept a mapping
only when a slide or coherent slide range teaches the answer-bearing concept. Question demand
sets chapter depth; the decks still set truth and give every lecture a minimum coverage floor.

Do not finish uniform, prose-heavy audits of all decks before looking at demand. Also do not map
from filenames or current module tags alone. The reliable middle path is cheap extraction of
every slide, early question triage, then demand-ranked visual and conceptual review.

## Local evidence driving the design

- The bank has 317 items: C1 81, C2 110, C3 83, C4 2, OUT 41; quality is 140 usable,
  89 review, 47 verify, and 41 discard ([source inventory](source-inventory.md)).
- Canonical lecture demand is 274 questions, not 317; C4/OUT cannot be forced into Courses 1–3.
- Module demand is uneven: C2-M4 has 39 questions and C3-M5 36, while C3-M4 has 6 ([question
  index](../../../docs/final-exam-revision-question-index.md#coverage-dashboard)).
- The bank records nine exact duplicate groups (19 questions, 10 extra copies) and three
  high-similarity pairs. Raw counts overstate concepts ([duplicate
  pressure](../../../docs/final-exam-revision-question-index.md#duplicate-pressure)).
- The questions are shuffled. Phase 06's “Q001–Q081 (Course 1 mappings)” batch is invalid:
  Q001 is C2, Q003 is C3, and Q004 is OUT.
- The 37 `.pptx` decks have 713 slides, 1,107 pictures, and almost no notes. Local inspection
  found at least one picture on every slide, 125 slides below 80 extracted characters, and
  346 slides with more than one picture. “Review every picture-bearing slide” is not a useful
  discriminator.
- Formula loss is real: Bellman 1.8/4–6, Expected Sarsa 2.9/5, importance sampling 2.4/12, and
  policy gradient 3.10/10 cue equations while extracted prose omits the displayed formula.
- Topics span adjacent decks: Sarsa/Q-learning/Expected Sarsa comparisons occur across
  2.7–2.9; policy parameterization/gradient/actor–critic spans 3.9–3.12. A module-only map is
  too coarse.

## Mapping records

One row per question:

| Field | Rule |
|---|---|
| `question_id`, `module_tag`, `quality` | Preserve audited source values |
| `original_topic`, `normalized_concepts` | Keep raw label; add controlled concepts |
| `duplicate_cluster` | Exact/near duplicate ID; never delete an original question |
| `scope_status` | `canonical`, `unsupported-c4`, `out`, or `corrupt` |
| `primary_lecture` | Exactly one answer-bearing deck for canonical items |
| `primary_slides` | One-based slide/range evidence; never filename-only |
| `related_lectures` | Prerequisite, comparison, or later refinement only |
| `evidence_mode` | `text`, `visual`, or `text+visual` |
| `mapping_confidence` | A explicit; B coherent range; C inference needing review |
| `verdict`, `correction`, `review_status` | Separate supplied answer from editorial finding |

Each deck also needs a reverse row: raw/unique-cluster demand, quality mix, visual-dependent
count, mapped IDs, depth tier, and unmapped/conflict count.

## Efficient mapping procedure

1. Parse the master index and all question bodies; preserve stems, choices, answers, labels,
   and 56 audit notes independently.
2. Normalize corrupted symbols only in editorial fields (`y/1`→candidate gamma,
   `€/¢`→candidate epsilon, `n`→candidate pi); originals remain untouched.
3. Cluster exact duplicates first and near duplicates second. Assign one concept/map decision
   per cluster, then propagate it to every member with an explicit cluster link.
4. Quarantine OUT/discard before keyword matching. Keep C4 as `unsupported-c4` unless a
   canonical intro/review slide explicitly supports it.
5. Mechanically extract every deck/slide into a candidate index: lecture ID, slide number,
   title/body text, table count, picture count, and visual/formula cues.
6. Retrieve candidates within the audited course/module first, then across adjacent decks for
   comparisons. Search normalized concept aliases and answer-bearing phrases, not only stems.
7. A reviewer selects the deck where the answer is taught most directly. Related decks cannot
   substitute for a missing primary. Confidence C remains unresolved, never silently final.
8. Confirm every review/verify item against the rendered slide and neighboring context before
   correcting its supplied answer.

## Demand and chapter-depth algorithm

Score unique duplicate clusters, not raw questions:

`demand(deck) = Σ quality_weight × relation_weight + recurrence_bonus`

- Quality: usable `1.0`, review `0.75`, verify `0.5`, OUT/discard/C4-unsupported `0`.
- Relation: primary `1.0`, prerequisite/comparison `0.25`.
- Recurrence bonus: `0.10` per extra duplicate, capped at `0.30` per cluster.
- Track correction burden separately: number of verify items plus answer-bearing visual items.

After all canonical mappings are confirmed, tier decks by positive demand distribution:

| Tier | Trigger | Manual depth |
|---|---|---|
| D3 deep | Top quartile, or correction burden ≥3 | Full walkthrough, formulas, contrasts, misconceptions, mapped-question explanations |
| D2 standard | Middle 50% of positive scores | Complete concepts, key equation interpretation, targeted contrasts |
| D1 concise | Bottom quartile of positive scores | Conceptual essentials plus exact question links |
| D0 coverage | No mapped canonical cluster | Objectives, big idea, core terms, summary, slide checklist |

Every deck keeps the chapter floor, so zero bank demand does not erase canonical teaching.
Scores allocate prose/review effort, not authority. Publish raw and deduplicated counts together.

## Visual-review thresholds

- Render and visually skim every slide once; record coverage. Deep transcription is separate.
- Deep-review any slide that: supports a mapped question; has more images than the repeated
  template baseline; has fewer than 80 extracted characters; contains cues such as “given by,”
  “shown,” “figure,” “example,” or “equation” without the corresponding content in text; has
  symbol/OCR damage; or participates in a review/verify conflict.
- For D3 decks, deep-review every substantive slide. For D0–D2, deep-review triggered slides
  and a stratified 10% sample of untriggered substantive slides.
- Treat objectives, summaries, transitions, and Q&A as accounted-for, not automatic prose.
  Escalate a sampled miss by deep-reviewing the remaining untriggered slides in that deck.

## Completeness and accuracy gates

- Manifest reconciles 39/39 decks, all 713 known `.pptx` slides, and actual counts for both
  converted `.ppt` decks.
- Q001–Q317 occur once; all four choices and supplied answers match the source.
- All 274 C1–C3 questions have one primary lecture, slide evidence, verdict, and confidence
  A/B. The 43 C4/OUT items have explicit quarantine status rather than fabricated mappings.
- All duplicate-cluster members agree on concepts, mapping, and verdict unless a documented
  wording difference changes the answer.
- Review all 47 verify items and all 56 audit notes against evidence; no correction relies on
  generic RL knowledge alone.
- Reverse checks pass both directions: question→slide and slide/deck→question; no orphan IDs,
  unresolved confidence C, duplicate anchors, broken links, or unexplained count drift.
- Blind-audit at least 10% of mappings, stratified by course, depth tier, quality, and
  text/visual evidence. Any material miss triggers re-review of that stratum.

## Required phase reorder

1. Keep Phase 01 preflight, including the legacy `.ppt` conversion gate.
2. Move Phase 06 steps 1–3, 6, and 11 forward: parse, normalize, cluster, quarantine, and create provisional candidates before chapter authorship.
3. Split Phase 02: first extract metadata/text for all decks; then confirm mappings and compute
   demand; then perform demand-ranked deep visual audit. Release evidence deck-by-deck.
4. Author chapters only after that deck's mapping/evidence is stable. Allocate effort by D3→D0,
   while assembling the final manual in Course 1→2→3 lecture order.
5. Keep final appendix insertion late, but reuse the already confirmed records rather than
   remapping after chapters exist.
6. Finish with bidirectional coverage, duplicate-consistency, visual-audit, and link checks.

## Unresolved questions

- Exact intro/review slide counts and whether either supports the two C4 items remain unknown
  until legacy conversion.
- Exact exam weighting remains unavailable; deduplicated bank density is only the best local
  demand proxy, not a claim about official marks.
