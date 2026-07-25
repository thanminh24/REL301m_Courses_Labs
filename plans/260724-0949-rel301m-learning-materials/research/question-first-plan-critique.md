# Question-First Plan Critique

## Verdict

**NO-GO on the current seven-phase sequence. GO only after conversion to a question-first, slide-grounded workflow.**

The current plan optimizes exhaustive lecture coverage; the clarified goal optimizes performance on Q001–Q317. Slides remain explanation authority, but question demand must determine depth. Equal treatment of 39 decks is the wrong unit of work.

## Local evidence

- Bank depth is mostly recognition: 284/317 stems start with “What,” “Which,” or “In”; only Q264 needs trivial arithmetic; no multi-step backup, update, or trace is demanded.
- Demand is uneven: C2 has 110 questions, C3 83, C1 81; modules range from 39 (`C2-M4`) and 36 (`C3-M5`) down to 11 (`C3-M3`) and 6 (`C3-M4`).
- 276 questions are C1–C4; 41 are `OUT`/discard. Quality counts: 140 usable, 89 review, 47 verify, 41 discard.
- Bank has 56 material warnings and exact/near duplicate groups. One concept explanation may serve a cluster, although every original question must still appear once.
- Current plan requires full treatment of 39 decks, 713 known slides, and 1,107 pictures before question integration, all inside a 24-hour estimate.
- Evidence: `docs/final-exam-revision-question-index.md` sections “Question-construction depth,” “Coverage dashboard,” “Material answer defects,” and “Duplicate pressure”; `plan.md`, Phases 02–07, and `research/source-inventory.md`.

## Waste

1. **Full slide transcription before demand discovery:** Phase 02 records every slide and visual; much cannot improve answers to this recall-heavy bank.
2. **Uniform chapter contract:** objectives, walkthrough, equations, examples, confusions, 5–10 takeaways, recall checks, summary, and checklist for all decks creates low-demand filler.
3. **Questions delayed to Phase 06:** late mapping guarantees omissions and over-written chapters.
4. **Repeated QA:** three course phases each create cheat sheets, checkpoints, recall checks, and continuity reviews before demand is stable.
5. **Redundant learning systems:** the bank already has a refresh and workbook. New manual needs one exam loop, not four generic routes plus status markers.
6. **Legacy `.ppt` conversion as global gate:** intro/review decks should block only claims that require them.
7. **10,000–14,000 lines as target:** size is a consistency/navigation risk, not completeness evidence.

## Sequencing mistakes

- Bank normalization and concept mapping must precede extraction and prose.
- Question ambiguities must define what slide evidence is collected before corrections are written.
- Cheat sheets must derive from validated question/concept coverage, not precede it.
- Structural checks must run per batch, not only at release.
- Production priority must use density and defect risk; presentation order may retain prerequisites.

## Revised phase order

### 1. Freeze bank contract and normalize

- Preserve Q001–Q317 ID, order, stem, A–D choices, and supplied answer exactly once.
- Record quality, duplicate cluster, and scope state.
- Exclude external-source, textbook, code-practice, and provenance claims from the new manual.

### 2. Build exam-demand matrix

- Map every question to concept, primary lecture, optional prerequisite, cognitive demand, supplied-key risk, and required depth.
- Cluster duplicates without dropping entries.
- Tier by density and defect risk; quarantine OUT/C4 unless canonical decks support them.

### 3. Extract targeted slide evidence

- For each in-scope concept cluster, capture exact deck/slide support needed to decide the answer and explain distractors.
- Render/review image equations or diagrams only when demanded; inspect neighboring slides/objectives for context.
- Mark each deck `required`, `prerequisite-only`, `framing-only`, or `no-bank-demand`; no exhaustive transcript by default.
- Escalate unresolved slide conflicts before prose.

### 4. Author demand-weighted concept lessons

- Write by concept cluster in prerequisite-aware order, not one uniform chapter per deck.
- Prioritize `C2-M4` (39), `C3-M5` (36), `C3-M2` (30), `C2-M2` (29), then 18–23-question modules; keep 6–11-question modules compact.
- Depth ceiling: select answer, reject plausible distractors, explain named relation/formula, cover wording variants—no implementation/code.

### 5. Integrate/adjudicate 317 questions in batches

- Insert each original item once with supplied answer, lecture verdict, correction when needed, concise rationale, concept link, and warning.
- Per batch, verify preservation, uniqueness, anchors, mappings, and explanation coverage.
- Retain OUT items but do not manufacture teaching content for them.

### 6. Synthesize navigation and release

- Generate demand-ranked topic map, prerequisite path, compact confusion tables, formula interpretation sheet, and one loop: learn → answer → repair miss.
- Run structural, evidence, contradiction, duplicate-cluster, and usability checks.
- Cross-link legacy docs only after the canonical manual passes.

## Realistic canonical-manual architecture

1. Scope/source boundary; supplied answer versus lecture-grounded verdict.
2. Exam-demand dashboard by module, quality, duplicate cluster, and risk.
3. Minimal prerequisite map.
4. Demand-weighted concept lessons: tested distinction, plain explanation, demanded notation only, distractor traps, slide provenance, mapped Q IDs.
5. Compact comparisons and formula glossary.
6. Full Q001–Q317 bank in original order, each exactly once.
7. Quarantine index for 41 OUT and unsupported C4 items.
8. Coverage matrix: question → concept lesson → deck/slide → verdict.

Do not target line count. Target complete question coverage with the shortest explanation that closes every tested distinction. Plausible size is the existing 6,300-line bank plus compact lessons/matrices, not 39 maximal chapters layered onto it.

## Missing acceptance criteria

- Every in-scope question points to a prior passage that makes it answerable.
- Every explanatory claim has canonical deck/slide support; unsupported claims are omitted or unresolved.
- Depth has recorded justification: demand count, cognitive demand, ambiguity, or prerequisite.
- Every plausible distractor is ruled out, or item is flagged as lacking a unique answer.
- Duplicate clusters have consistent verdicts; original fields match source under fixed normalization rules.
- Supplied and corrected answers are visually unmistakable.
- All 41 OUT items remain present but cannot look like lecture truth; unsupported C4 gets no invented lesson.
- No code-learning route, external citation, textbook claim, or web provenance enters the manual.
- Sampled learner can navigate miss → lesson → evidence → question and back.
- Re-estimate after demand matrix and pilot; do not accept 24 hours without measured throughput.

## Key risks and controls

- **Bad supplied keys:** preserve, adjudicate from slides, expose key risk.
- **Coarse bank mappings:** remap to lecture/slide before prose.
- **Sparse prerequisite-critical topic:** allow extra depth only with recorded prerequisite rationale.
- **Answer-letter memorization:** teach distinctions/distractors; bank’s B/C imbalance makes letter heuristics unsafe.
- **Single-file sprawl:** questions once, anchors/matrices, no repeated lecture boilerplate.
- **Targeted extraction misses context:** inspect neighboring slides/objectives; widen only when ambiguous.
- **Unrealistic throughput:** pilot 20 mixed-quality questions and forecast from measured adjudication/writing rates.

## Go / no-go execution contract

**GO only when all are true:**

- 317 normalized records reconcile; 276 in-scope and 41 OUT accounted for.
- Every in-scope record has provisional concept/lecture mapping and demand tier.
- A 20-question pilot spans usable/review/verify/OUT, duplicate, formula, and visual-slide cases.
- Pilot proves exact preservation, slide-grounded decisions, links, depth ceiling, and measured estimate.
- Legacy-deck dependency is isolated to identified questions/claims.

**NO-GO if any are true:**

- Authoring begins before demand matrix completion.
- Any correction lacks slide evidence or imports generic RL knowledge.
- Equal-depth lecture treatment remains mandatory.
- OUT/C4 becomes course truth without canonical support.
- Supplied key, lecture verdict, and corrected answer are not distinct.
- Completeness is measured by slides transcribed or lines written instead of questions made answerable.

## Unresolved questions

- Whether grading follows defective supplied keys or lecture-correct answers is not locally knowable; show both and flag risk.
- Whether two C4 questions are examinable despite the 39-deck boundary needs user confirmation; retain without curriculum expansion meanwhile.

Status: DONE_WITH_CONCERNS  
Summary: Current slide-first plan should not execute; question-first contract keeps all 317 items while making slide evidence and depth proportional to exam demand.  
Concerns/Blockers: defective supplied keys and unsupported C4 scope remain decision risks.
