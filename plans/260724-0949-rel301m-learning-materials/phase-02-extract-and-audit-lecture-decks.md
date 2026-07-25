# Phase 02 — Exam-Demand Mapping and Targeted Slide Audit

## Context links

- [Parent plan](plan.md)
- [Phase 01](phase-01-source-contract-and-extraction-preflight.md)
- [Source inventory](research/source-inventory.md)
- [Execution decision](research/question-first-execution-decision.md)
- [Mapping opinion](research/question-to-slide-mapping-opinion.md)
- [Canonical slides](../../docs/slides/slides/)

## Overview

- Date: 2026-07-24
- Description: map exam demand to slides, compute D0–D3 depth, and audit evidence by risk.
- Priority: P1
- Implementation status: completed
- Review status: completed

## Key Insights

- Known scope is 713 `.pptx` slides plus two legacy decks.
- The decks contain 1,107 pictures and almost no speaker notes.
- The bank’s 274 C1–C3 items require canonical mappings; 43 C4/OUT items require quarantine.
- Mapping from current module tags or filenames alone is too coarse.
- Every slide needs cheap indexing/skimming, but only demand/risk-triggered visuals need deep review.
- Question demand allocates prose/review effort; slides remain authority.

## Requirements

- Mechanically index every slide in every deck and preserve order.
- Map each canonical question to exactly one answer-bearing deck and one-based slide/range.
- Compute demand from unique clusters, prerequisite centrality, and correction risk.
- Assign every deck/concept a justified D0–D3 depth.
- Visually skim every slide and deeply review mapped/risk-triggered content.
- Retain deck filename and one-based slide number for every note.
- Keep direct evidence distinct from editorial explanation and correction.
- Resolve confidence C mappings before authoring.

## Architecture

Question mapping row:

```text
Q ID -> concept -> duplicate cluster -> scope -> primary lecture/slides
     -> related lectures -> evidence mode -> confidence -> verdict
```

Reverse deck row:

```text
deck -> raw/unique demand -> quality mix -> correction burden
     -> mapped IDs -> D0–D3 depth -> visual-review status
```

## Related code files

- `docs/slides/slides/0. Course Introduction.ppt`
- `docs/slides/slides/1.*.pptx`
- `docs/slides/slides/2.*.pptx`
- `docs/slides/slides/3.*.pptx`
- `docs/slides/slides/6. Review course .ppt`
- `plans/260724-0949-rel301m-learning-materials/research/lecture-extracts/*.md`

## Implementation Steps

1. Extract title/body text, tables, picture counts, and visual/formula cues for all slides.
2. Retrieve slide candidates for each normalized concept within the module and adjacent decks.
3. Select one primary answer-bearing deck/range per canonical question; record related lectures.
4. Propagate one mapping decision across duplicate members while retaining all IDs.
5. Mark confidence A (explicit), B (coherent range), or C (needs review).
6. Compute unique demand and correction burden; assign provisional D0–D3 depths.
7. Render and visually skim every slide once; record coverage.
8. Deep-review mapped slides, review/verify conflicts, equation cues, symbol damage, low-text
   slides, and above-template image content.
9. Deep-review every substantive D3 slide; for D0–D2 review triggers plus a stratified 10%.
10. If a sampled miss is material, expand deep review to the remaining untriggered deck slides.
11. Transcribe only demanded equations/examples/diagrams and tie them to slide numbers.
12. Resolve all confidence C mappings and update the bidirectional coverage matrix.

## Todo list

- [x] All 39 decks and 713 known slides indexed.
- [x] All 274 C1–C3 questions mapped to one primary deck/range.
- [x] All 43 C4/OUT questions explicitly quarantined or canonically supported.
- [x] Duplicate clusters share consistent concepts/mappings.
- [x] Every deck/concept has justified D0–D3 depth.
- [x] Every slide mechanically indexed; demand/risk visual deep review complete.
- [x] Stratified visual audit passes or expansion review completes.
- [x] No confidence C or evidence conflict remains hidden.

## Success Criteria

- Manifest shows 39/39 decks and every slide indexed/accounted for.
- All 274 canonical questions have primary slide evidence and confidence A/B.
- Reverse deck matrix reconciles demand, depth, mapped IDs, and visual-review status.
- D2 concepts have contrast evidence; D3 concepts have one-step example/equation evidence.
- Corrections use lecture evidence; contradictions remain explicit.

## Risk Assessment

- **High:** targeted review misses context. Mitigation: inspect neighboring objectives/context
  and expand review whenever the stratified audit finds a material miss.
- **High:** raw question counts inflate duplicates. Mitigation: score unique clusters.
- **Medium:** duplicate concepts create conflicting summaries. Mitigation: distinguish first
  introduction from later refinement in concept index.
- **Medium:** OCR/formula transcription errors. Mitigation: compare rendered slide twice and
  verify symbols against nearby explanatory slides.

## Security Considerations

- Render and convert locally when possible.
- Do not execute embedded media or links.
- Delete temporary rendered artifacts after validation unless intentionally retained under the
  plan research directory.

## Next steps

Release a course only when its question mappings, evidence, and D0–D3 depths are stable.
