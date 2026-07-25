# REL301m Complete Learning Manual Architecture

## Goal

Produce one self-contained Markdown manual:
`docs/rel301m-complete-learning-guide.md`.

The manual must make all 317 exam questions answerable from lecture-grounded explanations. The
bank determines topic demand and depth; slides determine truth and prerequisite context. It must
not depend on coding exercises, implementation tracing, or outside sources.

## Source-of-truth hierarchy

1. Question bank defines tested demand, wording variants, and required learning depth.
2. Lecture decks define correct concepts, terminology, equations, prerequisites, and sequence.
3. Existing audit notes identify defective questions but do not override a slide without
   explaining the conflict.
4. No web or textbook content may silently expand the curriculum.

## Proposed document structure

1. Title, source boundary, and navigation.
2. Exam-demand/quality dashboard and evidence rules.
3. How to learn: explain without options -> answer -> repair -> repeat.
4. Minimal prerequisite map and notation glossary.
5. Course 1 chapters, cheat sheet, and checkpoint.
6. Course 2 chapters, cheat sheet, and checkpoint.
7. Course 3 chapters, cheat sheet, and checkpoint.
8. Cross-course comparisons, confusions, warnings, and adaptive navigation.
9. Full Q001–Q317 bank plus coverage/provenance matrices.

## Per-lecture chapter contract

Every deck receives a D0–D3 depth justified by unique question demand, prerequisite centrality,
and error/confusion risk. Each chapter contains:

- source deck and slide range;
- demand counts, mapped IDs, quality mix, and assigned depth;
- learning objectives and prerequisite concepts;
- plain-language big idea;
- depth-sized concept treatment rather than uniform slide transcription;
- demanded equations, variable definitions, and interpretation;
- demanded examples or diagrams reconstructed in words;
- comparisons with easily confused ideas;
- “say it in your own words” explanation;
- depth-sized key takeaways;
- linked question IDs;
- short recall check with answers;
- one-paragraph summary;
- slide coverage checklist.

The chapter is a teaching transformation, not a slide transcript. D0 accounts for framing; D1
supports recognition; D2 supports explanation/contrast; D3 adds one small transfer step. D4
derivation/code/debugging is outside the required route. Repeated title, agenda, transition, and
Q&A slides are accounted for but do not need repeated prose.

## Question-entry contract

Each `Qnnn` entry contains:

- stable anchor and original ID;
- original stem and A–D choices;
- supplied answer;
- corrected verdict/answer: correct, acceptable-with-caveat, incorrect, or unusable;
- concise explanation;
- primary lecture mapping and related concept;
- quality warning for ambiguity/corruption;
- link back to the relevant lecture chapter.

Original content and editorial correction must remain visually distinct.

## Learning system

### Default loop

1. Preview the chapter’s big idea and objectives.
2. Read the conceptual walkthrough.
3. Close the section and answer a no-option recall prompt aloud.
4. Reveal and answer the lecture-linked questions.
5. Review only missed concepts.
6. Recheck after one and three days.

### Routes

- **Full course:** lecture order, with time allocated D3 -> D2 -> D1 -> D0.
- **Exam refresh:** demand-ranked topics and confusion sheets before original questions.
- **Weak-topic repair:** missed question -> concept lesson -> slide evidence -> retry.

No coding or algorithm-implementation practice is part of the required route.

## Cheat-sheet contract

- reward vs return vs value vs policy;
- episodic vs continuing tasks;
- Bellman expectation vs optimality;
- prediction vs control;
- DP vs MC vs TD;
- Sarsa vs Q-learning vs Expected Sarsa;
- on-policy vs off-policy;
- distribution vs sample models;
- direct RL vs planning vs Dyna;
- tabular vs function approximation;
- state aggregation vs coarse/tile coding;
- discounted vs average-reward objectives;
- value-based vs policy-gradient vs actor–critic;
- formula sheet with every symbol defined.

## Navigation strategy

- Manual table of contents links to courses, lectures, cheat sheets, and question appendix.
- Stable kebab-case lecture anchors and `q001`–`q317` anchors.
- Lecture chapters link to questions; question entries link back to chapters.
- Questions appear only once to control document size and correction drift.
- Choices/answers may use `<details>` only after a free-recall prompt; essential explanations
  remain ordinary Markdown.

## Validation model

Automated checks:

- all 39 decks appear in source matrix;
- known `.pptx` slide count totals 713;
- all 317 IDs exist exactly once and remain sequential;
- all questions retain four options and supplied answers;
- all 274 C1–C3 items have one primary deck/slide, confidence A/B, verdict, and explanation;
- all 43 C4/OUT items have explicit quarantine status;
- every chapter records D0–D3 depth and its demand/risk rationale;
- all internal links resolve with no duplicate anchors or placeholder markers.

Manual checks:

- every slide mechanically indexed and visually skimmed; deep review follows demand/risk;
- image-based equations/examples transcribed accurately;
- lecture chapter reflects slide order and emphasis;
- corrected answer agrees with lecture evidence;
- summaries teach rather than merely list terms and cheat sheets agree with detailed chapters.

## Estimated final size

Expected range: existing 6,300-line bank plus the shortest complete set of question-driven
lessons, likely 8,000–12,000 lines.

Line count is not an acceptance criterion. Questions made answerable, evidence, navigation, and
non-duplication determine completeness.

## Unresolved questions

- Defective supplied keys may not match grading behavior; preserve both key and lecture verdict.
- Exact exam weighting remains unknown; deduplicated demand is the best local proxy.
