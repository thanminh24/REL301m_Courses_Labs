# Final UI/UX audit

**Verdict: FAIL**

Release-quality UI is not yet proven. Core modes are present and generally
coherent, but the current build has 2 horizontal-overflow failures at 320 px, a
keyboard-inaccessible closed mobile drawer, one serious WCAG contrast failure,
and an impractical 317-question Test presentation. These contradict explicit
Phase 02/04/06 exit criteria.

## Audit evidence

- Reviewed Phase 02–06 requirements, current components/styles, and E2E tests.
- Rendered Dashboard, Library, Flashcards, Match, Learn, Test, and Progress in
  Chromium at 1280 px, 640 px effective reflow, and 320 px.
- Repeated route checks with `prefers-reduced-motion: reduce`.
- Ran axe-core 4.12 against all 7 routes at 320 px.
- Exercised closed mobile-nav tab order, Flashcards front/back controls, Learn
  choice feedback, Test setup/active/all-317, Library no-result/Q188 expansion,
  Match, and first-run Progress.
- Measured all-317 Test: 317 fieldsets, 639 buttons, 207,492 px document height,
  and a 2,203 px-tall navigator at 320 px.

## Release blockers

### Critical — hidden mobile navigation remains keyboard-focusable

- `study-app/src/components/app-shell.tsx:56` — `/` and every route at
  `max-width:780px`: `.sidebar` is visually translated off-screen while its 7
  links remain in the tab order.
- Reproduction at 320 px with drawer closed: Tab 1 skip link, Tab 2 menu, Tab 3
  brand, Tabs 4–10 focus invisible links at approximately `x=-276px`, then focus
  finally reaches page content.
- Action: when closed, make the drawer non-interactive (`inert` plus
  `aria-hidden`, or conditional render), return focus to the trigger on close,
  support Escape, add `aria-controls`, and trap focus while open.

### Critical — all-317 Test is not usable as an exam workflow

- `study-app/src/components/practice-test.tsx:768` — `/test/`: all 317 navigator
  buttons and all 317 question fieldsets render simultaneously.
- At 320 px this creates 639 buttons, a 2,203 px navigator, and a 207,492 px
  page. It violates the >50-item performance rule and makes current-question
  orientation, keyboard navigation, review, and submission impractical.
- `.test-navigator button` has only answered/flagged state; there is no current
  question state despite Phase 06 requiring current/answered/unanswered/flagged.
- Action: use one-question-at-a-time or bounded pagination with a sticky,
  scrollable/virtualized navigator; maintain an explicit current index; expose
  `aria-current="step"`; retain all 317 responses in state without mounting all
  317 fieldsets.

### Major — 320 px horizontal content loss

- `study-app/src/components/practice-test.tsx:380` /
  `study-app/src/styles/responsive.css:89` — `/test/` setup reports
  `scrollWidth=365`, `clientWidth=320`. Every setup control grows to about
  327.6 px and ends at `x=364.6`; the three quick-size buttons establish the
  oversized grid min-content width.
- `study-app/src/components/flashcard-deck.tsx:315` /
  `study-app/src/styles/responsive.css:561` — `/flashcards/` reports
  `scrollWidth=326`, `clientWidth=320`; the Topic select ends around
  `x=325.6`.
- Action: set `min-width:0; max-width:100%; width:100%` on the relevant grid/
  flex children and controls; make quick sizes a 2-column or full-width grid
  below 520 px. Add an assertion for
  `document.documentElement.scrollWidth === clientWidth` on every route and
  active state at 320 px.

### Major — Test semantics conflict with its exam-bank scoring

- `study-app/src/components/practice-test.tsx:798` — MCQ inputs become
  checkboxes whenever `conceptualAnswer.kind === "multiple"`, while the page
  says the default result is the school-bank score and `gradeExamAnswer`
  expects the single supplied bank letter.
- For Q188, a learner following “Select all that apply” and selecting conceptual
  A+B necessarily loses the bank score even though A is the canonical exam
  answer. The UI does not provide separate bank-response and concept-response
  controls.
- Action: exam simulation should always collect the bank-format response.
  If a separate concept check is desired, ask it as a distinct second control
  or review step and label both scores before selection.

### Major — instant feedback leaks multi-select answers before completion

- `study-app/src/components/practice-test.tsx:876` — `/test/`, Feedback =
  “After each response”: the full `QuestionExplanation` appears after the first
  checkbox change on a multi-answer item. The learner has not finished the
  response yet.
- Action: require an explicit “Check this question” action for checkbox/
  multi-answer and written items, lock or deliberately permit revision, then
  reveal feedback. Do not infer completion from the first selected checkbox.

## Serious accessibility and usability findings

- `study-app/src/styles/responsive.css:398` — `/match/`
  `.match-progress > span` is white (`#fff`) on `#dddcd1`, measured 1.37:1.
  axe classifies this as serious WCAG 1.4.3 failure. Use dark text before fill,
  or place the label outside the bar.
- `study-app/src/components/match-game.tsx:236` — Match tiles expose neither
  `aria-pressed` nor another selected-state announcement. A screen-reader user
  cannot tell which half of the pair is armed; mistakes/completion are also not
  announced. Add pressed state and a polite live status.
- `study-app/src/components/learn-session.tsx:452` — Learn feedback has
  `aria-live`, but focus is not moved to or associated with the newly inserted
  feedback/Next action. This misses Phase 05’s feedback-focus requirement.
  Give the feedback a focusable heading/container and focus it after checking,
  then focus the next prompt after advancing.
- `study-app/src/components/learn-session.tsx:350` — answer-mode controls use
  primary/secondary styling but expose no selected state. Add `aria-pressed` or
  use a radio group.
- `study-app/src/components/practice-test.tsx:768` — navigator numbers are
  34×34 px, below the app’s otherwise consistent 44 px touch target.

## Major product/interaction gaps

- `study-app/src/components/question-library.tsx:141` — 8 filters are always
  expanded. At 320 px they consume most of the first screen and offer no
  “Clear filters” action. Collapse secondary filters behind a “Filters (n)”
  control on mobile and add one-click reset.
- `study-app/src/components/question-library.tsx:15` — filter and expanded-row
  state live only in React/localStorage, not the URL. Back/forward, sharing,
  and deep-linking an expanded QID do not preserve visible state as Phase 02/03
  require. Store `q`, filters, sort, and open QID in query parameters.
- `study-app/src/components/question-library.tsx:238` — all 317 rows mount at
  once. Use `content-visibility:auto`, pagination, or virtualization; retain
  exact-QID reachability.
- `study-app/src/components/practice-test.tsx:649` — result items remain one
  long original-order list. Phase 06 asks for Incorrect, Correct with nuance,
  and Unanswered review groups. Add grouped counts/filters and default-open
  incorrect/unanswered groups.
- `study-app/src/components/flashcard-deck.tsx:442` — Again/Hard/Good/Easy are
  shown without a concise scheduling consequence. Add short labels/tooltips
  such as “Again · soon” and “Easy · later”; keep 1–4 shortcuts.
- `study-app/src/components/progress-dashboard.tsx:145` — weak topics and course
  coverage are descriptive only. Link weak-topic rows to filtered Library/Learn
  so “clear next step” becomes actionable.

## Lower-severity guideline findings

- `study-app/src/components/question-library.tsx:145` and other form controls —
  missing stable `name` and `autocomplete="off"` attributes.
- `study-app/src/components/dashboard.tsx:50` — “today” uses a UTC ISO date,
  which can disagree with the learner’s local day around midnight. Derive the
  day in local time.
- `study-app/src/components/dashboard.tsx:84` and other large headings — no
  `text-wrap:balance`/`text-wrap:pretty`; several narrow-screen headings form
  avoidable widows.
- No route-level `error.tsx` or `not-found.tsx` recovery was found. Existing
  in-mode loading and empty states are useful, but Phase 02’s data-failure/retry
  and not-found recovery are not independently demonstrated.

## What passed

- All 7 routes rendered without horizontal overflow at 1280 px and 640 px
  effective reflow.
- Dashboard, Library, Match, Learn, and Progress had no page-level horizontal
  overflow at 320 px.
- Reduced-motion CSS globally suppresses transition/animation duration.
- Visible focus outlines, semantic buttons/labels, skip link, 44 px primary
  controls, destructive confirmations, first-run Progress empty states, Library
  no-results recovery, dual answer panels, and Flashcards four ratings are
  present.
- axe found no violations on Dashboard, Library, Flashcards, Learn, Test setup,
  or Progress in the audited first-run states. Match has the one serious
  contrast violation above.

## Required release recheck

1. Fix every blocker and serious issue above.
2. Re-run 320/375/768/1280 widths for setup, active, feedback, completion,
   empty, error, and results states—not only route entry.
3. Re-run 200% browser zoom with no two-dimensional scrolling.
4. Re-run keyboard-only navigation with drawer closed/open and all modes.
5. Re-run axe after selecting Match tiles, opening Learn feedback, taking an
   instant-feedback test, and viewing Test results.
6. Re-test all-317 Test with bounded DOM and confirm every response/result still
   reconciles to 317.

## Unresolved questions

None.
