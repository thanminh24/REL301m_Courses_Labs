# REL301m Learning Guide Release Test

- Date: 2026-07-24
- Tester role: independent release validation
- Final verdict: **PASS**
- Final guide SHA-256: `de2a1907f23052209e919f565afd3b6f5f6033167dbf2a63ca860063cd7b39a0`
- Open release-blocking defects: **0**

## Scope

Validated the canonical manual, question source/index, all three generators, explicit
per-question adjudications, extended validator, cross-document navigation, local lecture
sources, and preservation of unrelated worktree changes.

Read/reviewed:

- `README.md`
- plan and all seven phase files
- `research/question-records.json`
- `research/primary-evidence-map.json`
- `research/question-adjudications.json`
- `docs/final-exam-revision-question-index.md`
- `docs/rel301m-complete-learning-guide.md`
- `scripts/build-rel301m-primary-evidence-map.py`
- `scripts/build-rel301m-adjudications.py`
- `scripts/build-rel301m-learning-guide.py`
- `scripts/rel301m_guide_common.py`
- `scripts/rel301m_guide_questions.py`
- `scripts/validate-rel301m-learning-guide.py`

No implementation/source file was manually edited by this tester. Required generator runs were
content-stable. This report is the tester's only authored workspace file.

## Commands and headline results

```text
python scripts/build-rel301m-primary-evidence-map.py
Wrote .../primary-evidence-map.json with 274 primary mappings.

python scripts/build-rel301m-adjudications.py
Wrote .../question-adjudications.json with 317 adjudications:
78 acceptable-with-caveat; 135 correct; 12 incorrect;
43 unusable/out-of-scope; 49 unusable/unsupported.

python scripts/build-rel301m-learning-guide.py
Wrote .../rel301m-complete-learning-guide.md with 317 questions.

sha256sum plans/260724-0949-rel301m-learning-materials/research/primary-evidence-map.json \
  plans/260724-0949-rel301m-learning-materials/research/question-adjudications.json \
  docs/rel301m-complete-learning-guide.md
ae4ce8be9525235dc97872662e584f3210193f91655d29fea2892ec616b6d2be  primary-evidence-map.json
6c4499e6bc039a8c10cba33a81a5791947ed28da436913ab04542a47a868c646  question-adjudications.json
de2a1907f23052209e919f565afd3b6f5f6033167dbf2a63ca860063cd7b39a0  guide

python scripts/validate-rel301m-learning-guide.py
PASS: 317 questions; 274 canonical; 43 quarantined; 39 lecture/framing anchors.
```

The full three-stage pipeline produced identical hashes in consecutive runs before the final
duplicate harmonization. The final regeneration matched the lead's independently confirmed
two-run stable hash above. Independent Python parsers read every source record, mapping,
adjudication, and both Markdown question banks without reusing validator assertions.

## Contract results

| Contract | Evidence | Result |
|---|---|---|
| Q001–Q317 order and uniqueness | 317 JSON records, 317 index blocks, 317 manual blocks; exact expected sequence; 317 unique IDs | PASS |
| Four choices | Every record has exactly keys A–D; every manual block has four rendered choices | PASS |
| Exact source preservation | Compared stem, all option texts, supplied-answer letter, and supplied-answer text from index → JSON → manual for all 317; 0 mismatches | PASS |
| Scope reconciliation | 274 canonical; 43 quarantine = 38 out + 3 corrupt + 2 unsupported C4 | PASS |
| Source quality/adjudication schema | Source: 140 usable, 89 review, 47 verify, 41 discard. Final adjudications: 135 correct, 78 caveat, 12 incorrect, 49 unsupported, 43 out-of-scope | PASS |
| Exact adjudication rendering | Compared heading verdict, verdict field, correction presence/text, and full rationale JSON → manual for all 317; 0 mismatches | PASS |
| Unsupported handling | All 49 have `unusable/unsupported`, explicit “no unique answer” correction, closest lecture context, and rationale | PASS |
| Quarantine handling | All 43 have unusable verdict, no canonical lecture, reason/quality note; retained in bank | PASS |
| Canonical mapping | Authoritative map contains exactly the 274 canonical IDs; final manual matches lecture, slide range, concept, depth, and confidence for 274/274 | PASS |
| Mapping validity | 179 confidence A + 62 confidence B + 33 confidence C; every deck exists; every cited PPTX slide is in range | PASS |
| Confidence-C safety | All 33 confidence-C mappings remain `unusable/unsupported`; none is promoted to course truth | PASS |
| Adjudication invariants | Canonical/out-of-scope separation, correction presence, rationale/basis presence, source-quality and duplicate provenance: 0 errors | PASS |
| Duplicate consistency | Exact clusters 01, 07, and 08 now have uniform verdicts; exact-stem cluster 02 is explicitly exempt because Q248 has materially different options | PASS |
| Demand terminology | All 37 numbered chapters use `Demand and related practice`; one-primary navigation remains distinct; framing labels intentionally differ | PASS |
| Lecture/deck coverage | 39 decks = 37 PPTX + 2 legacy PPT; source table has the exact 39 filenames | PASS |
| Slide reconciliation | Actual `python-pptx` count is 713; every source-table PPTX count matches | PASS |
| Lecture/framing anchors | 37 numbered lecture anchors + introduction + review = 39 | PASS |
| Anchor uniqueness | 370 anchors found; 370 unique | PASS |
| Link resolution | 1,023 manual links checked with angle-bracket-aware parsing; 0 broken | PASS |
| External URLs | 0 in canonical manual | PASS |
| Placeholders | 0 case-insensitive TODO/TBD/PLACEHOLDER matches | PASS |
| Cross-document links | README → guide/index/workbook; index → guide/workbook; workbook → guide/index; all local targets exist | PASS |
| Generator determinism | Three-stage output was stable across consecutive runs; final regenerated hashes match the independently confirmed stable release hashes | PASS |

The original `question-records.json` remains the documented provisional demand-audit layer.
The generated `primary-evidence-map.json` is the final semantic overlay derived from reviewed
course evidence maps. `question-adjudications.json` separately decides whether each preserved
supplied answer is correct, caveated, contradicted, unsupported, or out of scope. The guide
applies both generated layers exactly.

## Manual semantic spot checks

At least five items per course were checked against the final question entry, answer-enabling
chapter, authoritative slide range, and extracted local PPTX text.

| Course | Question | Quality | Final evidence route | Check |
|---|---|---|---|---|
| C1 | Q006 | usable | 1.3 slides 14–15 | Epsilon-greedy definition and branch probabilities directly support C | PASS |
| C1 | Q015 | verify | 1.11 slides 9–16 | Deck teaches fixed-MDP evaluation/improvement; does not support automatic gradual adaptation | PASS |
| C1 | Q031 | review | 1.7 slides 9–10 | Chapter corrects “expected reward” to expected long-term return | PASS |
| C1 | Q041 | verify | 1.10 slides 3, 6 | Control objective is reward/value-maximizing policy; exploration is a means | PASS |
| C1 | Q317 | usable | 1.4 slides 9–11 | Agent is explicitly defined as interacting decision-making entity | PASS |
| C2 | Q001 | usable | 2.4 slides 3, 5–10 | Target policy is learned/evaluated; behavior policy generates actions | PASS |
| C2 | Q002 | verify | 2.12 slides 9–10, 20 | Slides emphasize sample efficiency/faster learning; supplied options omit central benefit | PASS |
| C2 | Q044 | review | 2.8 slides 3, 8–11 | Q-learning greedy target versus Sarsa sampled next action is explicit | PASS |
| C2 | Q233 | usable | 2.5 slides 3–9 | Immediate reward plus bootstrapped next-state estimate directly supports D | PASS |
| C2 | Q257 | verify | 2.12 slides 3–7, 11–15 | Dyna integrates acting, direct learning, model learning, and planning; no option states it | PASS |
| C3 | Q003 | review | 3.8 slides 3–20 | Long-run reward rate supports answer with needed continuing-task caveat | PASS |
| C3 | Q010 | verify | 3.5 slides 3–21 | Main benefit is sparse local generalization; universal memory-efficiency claim rejected | PASS |
| C3 | Q016 | usable | 3.11 slides 3–11 | Actor represents/updates policy; critic estimates value | PASS |
| C3 | Q137 | review | 3.7 slides 3–10 | Approximator supplies action values used by epsilon-greedy | PASS |
| C3 | Q302 | usable | 3.11 slides 3–11 | Critic evaluates actor choices and supplies value/TD signal | PASS |

Additional quarantine samples:

- Q004: unrelated scheduling interpretation of TD; correctly quarantined.
- Q037: DQN experience replay; correctly quarantined because no Course 4 deck is canonical.
- Q307: hyperbolic discounting; correctly quarantined outside the supplied lecture boundary.

## Focused semantic regressions

All eight requested regressions are canonical but non-answerable from the local evidence in the
form asked. Each renders `unusable/unsupported`, includes the exact adjudication rationale,
uses `Closest lecture context`, and does not invent a unique answer.

| Question | Confidence | Regression evidence | Result |
|---|---:|---|---|
| Q066 | A | 3.11 mentions Natural PG but not DQN/TRPO/DPG comparison; NOT choice cannot be established | PASS |
| Q103 | B | 3.9 softmax slides contain no temperature parameter; nearby lesson explicitly preserves this gap | PASS |
| Q139 | C | 1.9 slide 12 states scale limits but contains no DQN/function-approximation remedy | PASS |
| Q144 | C | 1.5 defines terminal episodic tasks; study stem omits whether the activity ends at the exam | PASS |
| Q171 | C | 2.3 slides contain neither Boltzmann exploration nor temperature | PASS |
| Q188 | C | 2.1 slide 9 does not define first-visit versus every-visit MC | PASS |
| Q225 | A | 3.11 motivates sampled gradients but does not establish step size as the unique limitation | PASS |
| Q314 | C | 1.3 slides contain no softmax rule | PASS |

## Defect history

Two release-blocking findings appeared during the first required generator/validator run:

1. **High, resolved:** malformed local-link parsing plus absent `quarantined-questions` anchor
   caused validator failure. Link parsing, fragment-path rebasing, and anchor generation were
   corrected; final link check has 0 failures.
2. **High, resolved:** provisional automated mappings could route questions to weaker related
   lectures. A deterministic 274-item primary evidence map was generated from reviewed course
   evidence maps and applied by the guide builder. Final manual-to-map comparison is 274/274.

One low-severity label inconsistency was then found in Lectures 2.3 and 2.13. It was corrected
before the final run.

The semantic-adjudication retest then found mixed verdicts in three materially duplicate
families. **High, resolved:** Q231 now matches Q032 as incorrect; Q295 matches Q137 with caveat;
Q283 matches Q150 with caveat. The validator now enforces uniform verdicts for exact clusters,
with only EXACT-02 exempted because its same-stem Q248 variant has materially different options.
No known defect remains open.

## Unrelated Group Assignment state

Pre-test and final path-scoped status are unchanged:

- 27 pre-existing deleted paths
- 1 pre-existing untracked path:
  `Group Assignment/docs/d3-study-notes-and-open-items.md`
- Final path-scoped status digest:
  `0aa02cbd1072edce76642c0e1a50eae3d2b80b3facda0890445091d324ae7ab5`

No Group Assignment path was restored, removed, staged, or edited by this test.

## Residual limitations

- The two legacy `.ppt` sources cannot be reliably slide-counted with installed local tooling.
  They are framing-only, explicitly marked `legacy`, and no canonical question depends on them.
- No unresolved release question remains.

Status: DONE

Summary: All three generators are deterministic; extended validator and independent
source/mapping/adjudication checks pass. The guide preserves all 317 questions, maps 274
canonical items, leaves all 33 confidence-C mappings unsupported, distinguishes 49 unsupported
from 43 out-of-scope items, reconciles 39 decks/713 PPTX slides, and has no open defects.

Concerns/Blockers: None.
