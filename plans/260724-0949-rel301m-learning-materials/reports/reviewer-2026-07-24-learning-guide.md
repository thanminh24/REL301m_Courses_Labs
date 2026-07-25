# REL301m Learning Guide Release Re-review

Date: 2026-07-24  
Verdict: **PASS FOR RELEASE**

## Findings

No release-blocking findings remain in the three previously blocked contracts.

### Resolved — per-question adjudication replaces quality-label verdict inference

The guide now consumes explicit decisions from
`research/question-adjudications.json` instead of deriving every verdict from `usable`,
`review`, or `verify`. The adjudication builder exhaustively partitions all 47 verify items and
adds explicit unsupported overrides for locally unanswerable non-verify items
(`scripts/build-rel301m-adjudications.py:17-38`, `scripts/build-rel301m-adjudications.py:53-118`).
The guide renderer reads the resulting verdict, correction, and rationale directly
(`scripts/rel301m_guide_questions.py:8-14`).

Focused regressions now match the local-evidence contract:

- Q066 and Q225 remain confidence A closest-context mappings but are explicitly
  `unusable/unsupported`; their cited slides do not establish the unique NOT/limitation answer
  (`docs/rel301m-complete-learning-guide.md:3874`,
  `docs/rel301m-complete-learning-guide.md:7214`).
- Q103 remains confidence B but is unsupported because the mapped softmax slides do not introduce
  temperature (`docs/rel301m-complete-learning-guide.md:4651`).
- Q139, Q144, Q171, Q188, and Q314 retain confidence C and are all
  `unusable/unsupported`, with evidence-gap explanations rather than invented corrections
  (`docs/rel301m-complete-learning-guide.md:5406`,
  `docs/rel301m-complete-learning-guide.md:5512`,
  `docs/rel301m-complete-learning-guide.md:6079`,
  `docs/rel301m-complete-learning-guide.md:6437`,
  `docs/rel301m-complete-learning-guide.md:9095`).

All eight entries use **Closest lecture context**, not **Primary lecture**, when unsupported.
The old temporary text “No reliable unique keyed answer; use the correction below” occurs zero
times.

### Resolved — confidence C is preserved and cannot masquerade as A/B evidence

The primary-map generator now maps explicit/high confidence to A, explicit/medium to B, and all
other authoring confidence to C (`scripts/build-rel301m-primary-evidence-map.py:51-57`).
The adjudication builder forces every confidence-C item to `unusable/unsupported`
(`scripts/build-rel301m-adjudications.py:75-86`).

Fresh data check:

- confidence-C mappings: **33**;
- confidence-C verdict violations: **0**;
- canonical mappings retained: **274**.

This closes the earlier confidence-laundering and answerability failure. Unsupported rows retain
closest context for study repair without claiming answer-bearing slide support.

### Resolved — validation now exercises the revised release contracts

The validator now checks:

- adjudication count and question sequence;
- confidence-C → unsupported semantics;
- mapped deck existence and one-based slide upper bounds;
- exact source stem, four choices, supplied answer, output verdict, and adjudication rationale;
- final primary slide text;
- lecture demand/practice and depth fields;
- anchors, internal/local links, placeholders, and external URLs.

Evidence: `scripts/validate-rel301m-learning-guide.py:21-118`.

Fresh result:

```text
PASS: 317 questions; 274 canonical; 43 quarantined; 39 lecture/framing anchors.
```

### Resolved — exact-duplicate verdict consistency

The adjudication builder now explicitly reconciles the three previously inconsistent members:
Q231 with Q032, Q295 with Q137, and Q283 with Q150
(`scripts/build-rel301m-adjudications.py:39-58`,
`scripts/build-rel301m-adjudications.py:129-138`).

The validator enforces one verdict across every exact cluster except `EXACT-02`
(`scripts/validate-rel301m-learning-guide.py:89-97`). Focused source inspection confirms that
exception is justified: Q045/Q253 offer the answer-bearing recursive-relationship option, while
Q248 has a materially different option set and only the caveated “update value function” choice.

Fresh cluster check:

- `EXACT-01`, `EXACT-03`–`EXACT-09`: internally consistent;
- `EXACT-02`: deliberately exempt, option-set difference confirmed;
- Q231: `incorrect`;
- Q295 and Q283: `acceptable-with-caveat`.

## Release verification

- Per-question adjudications: **317**, byte-idempotent.
- Editorial outcomes: **135 correct**, **78 acceptable-with-caveat**, **12 incorrect**,
  **49 unusable/unsupported**, **43 unusable/out-of-scope**.
- Primary evidence map: **274**, byte-idempotent.
- Canonical guide: **317 questions**, byte-idempotent.
- Canonical guide SHA-256:
  `de2a1907f23052209e919f565afd3b6f5f6033167dbf2a63ca860063cd7b39a0`.
- All six guide scripts compile.
- The eight requested regression cases pass their expected unsupported/confidence contracts.
- Exact original stems, options, and supplied keys remain generated from structured source data
  and are checked by the validator.
- Learning routes, mental model, lecture lessons, cheat sheets, and conceptual/no-code depth
  remain unchanged in intent.
- Unrelated dirty-worktree changes remain untouched.

## Known source limitations — accepted and disclosed

- Two legacy `.ppt` decks still have unknown slide counts and remain framing-only sources.
- Forty-nine in-scope bank items cannot be uniquely answered from local lecture evidence. They
  are now explicitly unsupported rather than taught as course truth.
- Forty-three C4/outside/corrupted records remain preserved and quarantined.

These are source constraints, not release defects under the current explicit labeling.

## Unresolved questions

- None.

Status: DONE  
Summary: All prior blockers and the duplicate-verdict regression are resolved. Fresh validation,
exact-cluster checks, eight targeted regressions, stable hash, and byte-idempotence pass.  
Concerns/Blockers: None.
