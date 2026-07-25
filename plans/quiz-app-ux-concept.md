# REL301m Study App — UX Concept

## Product intent

A fast, trustworthy study app for the canonical Q001–Q317 bank. It borrows the
interaction model of modern flashcard tools, not Quizlet branding or visual
assets. The app must help a student do two different jobs without conflating
them:

1. recall the supplied answer likely expected by the test bank;
2. learn the evidence-backed RL concept and recognize defective questions.

## Information architecture

```text
Study set
├── Overview
│   ├── resume study
│   ├── mastery summary
│   ├── evidence/verdict summary
│   └── topic weaknesses
├── Flashcards
├── Learn
├── Test
├── Questions
│   ├── searchable/filterable list
│   └── question detail + evidence
└── Progress
    ├── mastery by topic
    ├── difficult/missed questions
    └── session history
```

Global header: product mark, set title, mode tabs, progress, theme/settings.
Mobile: title + progress in top bar; mode tabs become a five-item bottom nav
(`Home`, `Cards`, `Learn`, `Test`, `Questions`). Settings lives in overflow.

## Visual direction

- Identity: “RL Study Lab”; academically calm, technical, not a Quizlet clone.
- Palette: deep ink `#172033`, warm paper `#F7F8F4`, teal `#087F72` for action
  and verified evidence, amber `#B66A00` for caveats, crimson `#B42318` for a
  conceptual contradiction, violet `#6941C6` for book evidence.
- Type: a highly legible sans (Inter/Source Sans) plus a restrained mono face
  for formulas and algorithm names. Never use color alone for verdicts.
- Cards: 16 px radius, subtle borders, minimal shadows, generous line height.
- Motion: 160–220 ms; card flip may use a reduced-motion-safe crossfade.
- Question options use letters plus full text. Mathematical notation must remain
  selectable and readable at 200% zoom.

## Shared content model

Each question view needs these stable fields:

- ID, course/module, topic, stem, options;
- supplied answer and label;
- learning verdict: `correct`, `acceptable-with-caveat`, `incorrect`,
  `bank-key-only`;
- conceptual answer, when distinct;
- plain-language explanation;
- evidence tier and citation/link;
- related concept and mapping confidence;
- user state: unseen, learning, mastered; attempts, last result, starred.

### Evidence presentation contract

Use two named rows, never one ambiguous “Answer” row:

| Row | Meaning | Treatment |
|---|---|---|
| **Exam-bank answer** | supplied key to remember for the assessment | neutral navy key icon |
| **Conceptually correct** | answer supported by the guide/evidence | teal check or crimson correction icon |

For a normal item, collapse these into “Answer: B” with a verified badge because
they agree. For a caveat, show the common answer first and a visible “Nuance”
callout. For an incorrect item, show both rows simultaneously after submission:
“Exam-bank answer: C” and “Conceptually correct: none of these options.” For a
bank-only item, say “Memorize for exam; not reference-verified” and do not use a
green verified treatment.

Examples:

- Q002: after answering, show supplied C under “Exam-bank answer”; under
  “Conceptually correct,” show “None — the key benefit is sample efficiency
  through integrated learning and planning,” followed by Sutton–Barto citation.
- Q004: show C plus a persistent `Bank key only` badge and the wording “No
  answer-enabling reference found.” Never imply that this is valid RL theory.
- Q188: mark A as the exam-bank answer, then show “Both A and B” conceptually;
  explain first-visit counts the first visit per episode while every-visit counts
  every visit. Testing must accept A for bank-recall scoring but separately flag
  the conceptual ambiguity.

Verdict labels must be text-visible at all times. A glossary tooltip explains
“canonical” means tested/examinable, not automatically correct.

## Overview/dashboard

Desktop layout:

- top “Continue” panel with last mode, next due question, and primary CTA;
- four compact metrics: `317 total`, mastered, learning, unseen;
- mastery-by-course segmented bar (Course 1/2/3);
- “Needs attention” list sorted by repeated misses and overdue questions;
- evidence snapshot (slides/book/bank-only) is secondary, not presented as user
  progress;
- recent sessions.

Mobile stacks these sections; Continue and Needs attention precede charts.
Tapping any metric opens Questions with the corresponding filter.

Empty first-run state: “317 questions ready” plus mode chooser and a 30-second
explanation of the evidence labels. Returning state resumes exact mode position.

## Flashcards

### Layout and interaction

Front: question ID/topic, verdict/evidence badge without revealing correctness,
stem, options. Back: exam-bank answer, conceptual answer/caveat, concise “why,”
evidence citation, then confidence controls.

Controls:

- `Space` flip; `←/→` previous/next; `1` Again; `2` Hard; `3` Good; `4` Easy;
  `S` star; `E` open evidence; `?` keyboard help.
- Touch: tap card to flip; swipe left/right only after a short threshold and
  always retain visible Previous/Next buttons.
- Toolbar: topic/course/verdict/evidence filters, shuffle, study starred/missed,
  progress position. Shuffle freezes a session order so Back is deterministic.
- Deep link `/flashcards/q188` opens a card without destroying session state.

### State machine

```text
setup -> front -> back -> confidence-rated -> next
                  |              |
                  +-- evidence --+
next -> front | complete
complete -> retry-missed | restart-filter | dashboard
```

A card is not marked mastered merely because it was flipped. `Good/Easy` advances
mastery; `Again/Hard` queues it later in the same session.

## Learn

Adaptive retrieval with short rounds of 7–12 items. Start with multiple choice,
then use typed recall for concepts already seen. A defective/bank-only question
never becomes a typed prompt whose only accepted output is a misleading claim.

Question flow:

```text
prompt -> submit -> feedback
feedback(correct) -> next
feedback(wrong) -> explanation -> retry-later
feedback(ambiguous) -> compare bank/concept -> acknowledge -> retry-later
round complete -> summary -> next round | finish
```

- Input stays disabled only during submission, not while reading feedback.
- Incorrect choices explain the failed distinction, not merely “wrong.”
- Typed answers normalize whitespace/case and accept defined synonyms; reveal
  after two failed tries.
- Adaptive priority: unseen → recent misses → hard ratings → spaced review.
- “I don’t know” is a first-class action and never penalizes streaks deceptively.
- Progress copy: “6 of 10 this round · 24 mastered overall.”

Completion: mastered count, remaining learning count, difficult topics, and CTAs
for `Practice mistakes`, `Start a test`, `Dashboard`.

## Test

Setup sheet:

- size: 10, 20, 40, all filtered;
- question types: multiple choice by default, optional typed concept prompts;
- filters: course, topic, verdict, evidence tier, starred/missed;
- shuffle questions and shuffle choices independently;
- feedback: instant practice or end-of-test exam simulation;
- toggle “Grade by exam-bank key” (default) with explicit note that conceptual
  corrections are reported separately.

During test: one-question-per-page on mobile; desktop may show navigator grid
alongside question. Autosave each response locally. Navigator states are
answered, unanswered, flagged, current; submit warns about unanswered items.

Results expose two non-competing metrics when contradictions exist:

- **Exam score** — scored against supplied bank keys;
- **Concept check** — count of questions with caveats/corrections understood.

Review groups answers into Incorrect, Correct with nuance, and Unanswered. Each
review row shows user choice, exam key, conceptual correction, and explanation.
Never silently count “Both A and B” as wrong when Q188 only permits one option:
grade bank recall against A, then surface ambiguity as a separate learning note.

## Questions library

- Search across ID, stem, option text, topic, and explanation.
- Filter chips: course/module, topic, mastery, verdict, evidence tier, starred.
- Sort: numeric ID, weakest first, recently missed.
- Row: Q ID, one-line stem, topic, mastery marker, verdict label, evidence label.
- Desktop uses table/list; mobile uses cards with filters in a bottom sheet.
- Detail uses anchored sections: Question, Answers, Explanation, Evidence.
- Preserve filter/query state when returning from detail.

No-results state echoes active filters with `Clear filters`. Search error retains
the query and offers Retry. Missing/corrupt question data reports its ID and
skips safely without collapsing the session.

## Progress model

Per-question scheduling states:

```text
unseen -> learning -> reviewing -> mastered
wrong/Again: any learned state -> learning
overdue: mastered -> reviewing
```

Recommended simple scoring:

- correct first try / Easy: +2;
- correct after retry / Good: +1;
- Hard: 0 and shorter interval;
- wrong / Again / I don’t know: -1 and requeue;
- mastered after two successful recalls on separate sessions.

Store filter settings, current session order/index, answers, ratings, stars, and
mastery locally. “Reset progress” is destructive, requires confirmation, and is
scoped separately from “Reset this session.”

## Responsive behavior

- Breakpoints are content-driven: single column below ~720 px; two-column
  question + context from ~960 px; cap reading width near 76 characters.
- At 320 px no horizontal page scrolling; option controls remain at least
  44×44 px; bottom action bar respects safe-area insets.
- Desktop side panels become drawers/bottom sheets on mobile.
- Mobile software keyboard must not cover Learn typed input or Submit.
- Landscape phones use the same single-question flow, not a shrunken desktop.

## Accessibility

- Semantic landmarks and real buttons/radio groups; one `h1` per screen.
- Visible 3:1 focus ring; logical focus order. After submission, move focus to a
  live feedback heading, not the top of the page.
- `aria-live="polite"` for answer feedback and progress; no announcement for
  decorative animation.
- Card has `aria-expanded`; flip never relies on hover. Keyboard shortcuts are
  disabled while typing and are discoverable in a help dialog.
- All verdict/evidence colors pair with icon and text. Contrast meets WCAG AA.
- Support zoom/reflow at 200%, reduced motion, high contrast, and screen-reader
  friendly formula text.

## Loading, failure, and recovery

- Initial load: skeletons shaped like real cards; do not flash “0/317.”
- Parse/data failure: blocking recovery page with retry and diagnostic summary;
  do not study a partially loaded bank as though complete.
- Local-save failure: nonblocking banner “Progress could not be saved,” keep
  answers in memory, offer Retry/export.
- Offline: app remains usable if assets and canonical data are bundled; indicate
  unsynced local progress only if future sync exists.
- Session resume dialog after an interrupted test: Resume or discard session.
- Completed-all state celebrates quietly and offers spaced review, difficult
  questions, or a full test—not a dead end.

## Component inventory

`AppShell`, `ModeNavigation`, `StudySetHeader`, `ProgressRing`,
`MasterySummary`, `FilterBar`, `QuestionCard`, `OptionList`,
`AnswerComparison`, `VerdictBadge`, `EvidenceBadge`, `EvidenceDrawer`,
`ConfidenceControls`, `SessionProgress`, `QuestionNavigator`,
`LearnFeedback`, `TestSetup`, `TestResults`, `QuestionLibrary`,
`EmptyState`, `ErrorState`, `KeyboardHelpDialog`, `ConfirmResetDialog`.

## UX acceptance checks

- All modes can reach any Q001–Q317 and resume after reload.
- Q002, Q004, and Q188 render the correct dual-layer answer patterns above.
- Exam score and conceptual corrections remain distinct in Learn/Test results.
- Keyboard-only users can complete every mode and access explanations/evidence.
- At 320 px and 200% zoom, primary actions and all answer content remain usable.
- Filtering + shuffle produce a stable session and never lose back-navigation.
- First-run, no-results, interrupted, save-failure, data-failure, and completion
  states all have an actionable recovery/next step.

