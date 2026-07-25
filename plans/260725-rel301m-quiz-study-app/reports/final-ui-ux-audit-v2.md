# Final UI/UX audit v2

**Verdict: FAIL**

The first audit’s named defects are substantially remediated, and the app now
looks polished and consistent across desktop and mobile. Release is still
blocked by 2 newly exposed mobile progression failures: Test and Flashcards
replace the current prompt without restoring the viewport/focus to the next
prompt. In both modes, the learner lands below the question stem and can answer
without seeing the new question. Active Test also has no `h1`.

## Evidence gathered

- Re-read the original audit and current implementation.
- Rendered every main route at 320, 360, 768, and 1440 px with reduced motion.
- Exercised Library Q188 deep link/expanded explanation, Flashcards front/back
  and rating, Learn choice feedback/next, Match selected state, Test setup,
  instant feedback, all-317 navigation, and Test results.
- Checked entry and active-state horizontal overflow. All measured
  `scrollWidth === clientWidth`.
- Ran axe-core 4.12 on all 7 route-entry states and on Library expanded,
  Flashcards back, Match selected, Learn feedback, Test instant feedback, Test
  results, and the 404 state.
- Measured all-317 Test after remediation: 317 IDs remain in saved state, while
  only 1 fieldset and 22 navigator controls mount; active page height was
  1,253–1,631 px on 320/360 px instead of the former 207,492 px.
- No browser console errors occurred during the audited flows.

## Release blockers

### Critical — Test changes state without revealing the new prompt on mobile

- `study-app/src/components/practice-test.tsx:329` — starting a Test preserves
  the setup page’s scroll position.
- `study-app/src/components/practice-test.tsx:897`,
  `study-app/src/components/practice-test.tsx:919`,
  `study-app/src/components/practice-test.tsx:1035`, and
  `study-app/src/components/practice-test.tsx:1045` — navigator, Previous, and
  Next actions only change `currentIndex`; they do not focus or scroll the new
  prompt into view.
- Reproduction at 320×740:
  - click **Start test** from setup;
  - resulting `scrollY=870`;
  - first `.test-question` top was `-261.6px`;
  - sticky Test header occupied `y=80–290px`;
  - the question stem and early answer choices were hidden above/behind the
    fixed headers.
- Reproduction after manually returning to the top:
  - scroll to the Next control and activate **Next question**;
  - resulting `scrollY=551`;
  - replacement question top was `6.2px`, behind the 74 px top bar and
    210 px sticky Test header.
- Impact: the one-question-at-a-time remediation is visually bounded but not
  navigable as a study flow on touch/mobile. The learner sees only the lower
  choices and controls for the next question.
- Required change: keep a ref on the active question/prompt heading. After
  `start()` and every index change, focus it and scroll it below the fixed
  headers (`scroll-margin-top` around 19rem on narrow screens), honoring reduced
  motion. Add E2E assertions that the legend/stem bounding box is visible after
  Start, navigator jump, Previous, and Next at 320 px.

### Major — Flashcards rating advances below the next card’s question

- `study-app/src/components/flashcard-deck.tsx:175` and
  `study-app/src/components/flashcard-deck.tsx:206` — `move()` changes index and
  flip state but does not restore card position or focus.
- The deep answer explanation makes the Q001 back about 2,995 px tall at
  320 px. A touch user must scroll to the rating controls.
- Reproduction at 320×740:
  - flip Q001, scroll to **Good · next session**, and activate it;
  - before rating: `scrollY=2255`;
  - after the next card renders: browser clamps to `scrollY=736`;
  - next card top was `-137.3px`, and its question heading was `-61.5px`,
    completely behind the fixed top bar.
- Impact: the learner is shown the bottom half of the next card and its answer
  choices, not its question. Previous/Next can produce the same loss of
  orientation.
- Required change: ref/focus the card heading or card container after `move()`
  and after rating, with fixed-header-aware `scroll-margin-top`. Add a 320 px
  touch-path regression: flip → scroll to rating → rate → assert next QID and
  stem are both visible.

### Major accessibility — active Test has no level-one heading

- `study-app/src/components/practice-test.tsx:861` — active Test uses an
  eyebrow, `<strong>`, navigator, and fieldset legend but no `h1`.
- axe reports `page-has-heading-one` (moderate) in the active instant-feedback
  state. Setup and Results both have an `h1`.
- Required change: promote “Practice Test”/current-test title to `h1` in the
  active state, visually sizing it for the compact sticky header if necessary.

## Non-blocking UX improvements

- `study-app/src/components/flashcard-deck.tsx:282` — at 320 px, 5 always-open
  selects plus shuffle/reset consume roughly 500 px before the card. Collapse
  them into a “Deck options” disclosure after a session starts so the prompt is
  visible in the first viewport.
- `study-app/src/styles/responsive.css:621` — the mobile sticky Test header is
  about 210 px tall because count, reset, and submit wrap vertically. Use a
  compact 2-row header or keep only count/timer and one primary action sticky.
- `study-app/src/components/question-library.tsx:309` — `content-visibility`
  solves most rendering cost, but the Library still mounts 638 buttons and
  creates a roughly 31,000 px page at 320/360 px. This meets the prior audit’s
  accepted optimization path, but pagination/windowing would substantially
  improve keyboard traversal and DOM cost.
- Form controls across Library, Flashcards, Learn, Test setup, and Progress
  still generally lack stable `name` and `autocomplete="off"` attributes.
- The mobile drawer correctly traps keyboard focus, but the main document is
  not inert/hidden while the drawer is open. Consider treating the drawer as a
  modal navigation region for screen-reader virtual navigation too.

## Prior findings now verified closed

- Closed mobile navigation is `inert`/`aria-hidden`; Escape closes it and
  restores trigger focus.
- All audited entry and active states fit 320, 360, 768, and 1440 px without
  horizontal overflow.
- Test setup no longer overflows at 320 px.
- Flashcards Topic and other filter selects no longer overflow at 320 px.
- All-317 Test retains all 317 questions while mounting only 1 prompt and a
  bounded 20-question navigator page.
- Navigator exposes current, answered, unanswered, and flagged states; targets
  are at least 44×44 px.
- Q188 uses single-choice exam-bank radios while conceptual nuance remains
  separate.
- Instant Test feedback requires explicit **Check this question** and does not
  appear after the first response alone.
- Test results have filters and bounded review pagination.
- Match progress contrast is fixed; progress semantics, selected tile state,
  and polite status are exposed. axe found no violation after selection.
- Learn answer-mode state is announced, feedback receives focus, and advancing
  focuses the next prompt.
- Library has mobile filter disclosure, active count, Clear filters, URL-backed
  filter/open state, and `content-visibility`.
- Flashcard ratings explain their consequence.
- Progress weak-topic and course rows now link to filtered Library views.
- Route error and 404 recovery views exist; the real 404 returned status 404,
  fit 320/1440 px, and passed axe.
- Dashboard hierarchy, typography, visual contrast, mode cards, first-run
  metrics, and responsive composition are release-quality.
- Reduced-motion rules remain present and no audited flow depended on motion.

## Required release recheck

1. Add prompt focus/scroll management to Test Start and every question change.
2. Add card focus/scroll management after Flashcards move/rate.
3. Add an active-Test `h1`.
4. Re-run the exact 320 px touch sequences above, not only route-entry overflow.
5. Re-run axe on active Test and confirm zero serious/critical issues plus no
   missing-heading violation.
6. Repeat 360, 768, 1440, reduced-motion, keyboard-only, and all-317 checks.

## Unresolved questions

None.
