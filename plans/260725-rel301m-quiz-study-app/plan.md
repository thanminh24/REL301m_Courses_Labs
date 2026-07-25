# REL301m Quiz Study App

**Status:** implemented and locally verified; production publication pending  
**Worktree boundary:** `study-app/`, this plan, root README integration and
Sites hosting metadata only. Preserve every pre-existing dirty path, all
guide/data contracts and `Group Assignment/**`.

## Outcome

Build and deploy an installable, offline-capable, Quizlet-style REL301m study app containing
exactly Q001–Q317. The app separates exam-bank recall from conceptual truth and
provides Dashboard, Library, Flashcards, Match, adaptive Learn, configurable
Test, and Progress. It stores progress locally and supports export/import/reset.

## Source authority

1. `question-records.json`: ordered source stem/options/supplied answer.
2. `question-adjudications.json`: final verdict, conceptual answer, explanation.
3. `primary-evidence-map.json`: final evidence tier and citation.
4. `plans/quiz-app-ux-concept.md`: interaction and answer-presentation contract.

Never derive final support from provisional `question-records.mapping`. Compiler
must join by QID and fail closed on mismatch.

## Phases

1. [Foundation and canonical data compiler](phase-01-foundation-and-data.md)
2. [App shell, design system, routing, accessibility](phase-02-shell-and-design-system.md)
3. [Persistence, progress engine, library and dashboard](phase-03-library-progress-and-persistence.md)
4. [Flashcards and Match](phase-04-flashcards.md)
5. [Adaptive Learn](phase-05-adaptive-learn.md)
6. [Configurable Test](phase-06-test-mode.md)
7. [Verification, hardening and content audit](phase-07-verification-and-hardening.md)
8. [GitHub Pages and Sites production deployment](phase-08-deployment.md)

## Dependencies

`01 → 02 → 03`; modes `04`, `05`, `06` depend on `01–03` and can proceed with
distinct file ownership. `07` requires all modes. `08` requires a saved,
passing production build.

## Acceptance criteria

- Generated dataset has exactly one ordered record for every Q001–Q317; original
  stems, A–D options, and supplied keys are lossless.
- Every item contains verdict, conceptual answer when applicable, plain-language
  explanation, key takeaway, A–D option rationales, evidence tier/citation, and
  explicit exam-vs-concept grading.
- A 317-row content-QA manifest proves source alignment, conceptual/exam
  separation, explanation readability and review status. Bank-only records are
  canonical but explicitly unverified.
- Q002, Q004, Q188 pass dedicated content and UI regression tests.
- All named screens and controls work on keyboard, touch, 320 px viewport and
  200% zoom; reduced motion and WCAG AA semantics are honored.
- Sessions resume after reload. Favorites, filters, ratings, attempts, mastery,
  test responses and history persist locally.
- Export/import is versioned and validated; reset-progress and reset-session are
  separate confirmed actions.
- PWA manifest, versioned service worker and precache support offline reload of
  every main route after first successful load; updates never mix data hashes.
- Product parity matrix documents implemented Quizlet-style core functions and
  explicit exclusions.
- Unit/component tests, data integrity audit, Playwright flows, automated
  accessibility checks and production build all pass.
- Exact built source is deployed to `https://thanminh24.github.io/rel301m/`
  through GitHub Actions and saved as a Sites version; both production URLs load
  and critical smoke flows pass.
- A pre-scaffold Git status/hash baseline and final comparison prove no
  pre-existing dirty path was modified, restored or deleted by this app work.

## Explicitly out of scope

Accounts, classes/classrooms, cross-user folders, public sharing, payments,
user-created sets, image scanning/import, audio/pronunciation, multiplayer, AI
tutor/chat, server sync, branded Quizlet assets, gated Coursera content. The
implemented parity boundary is Dashboard/Library, Flashcards, Match, Learn,
Test and Progress.

## Review decision

Feasible as a client-first Next.js/TypeScript app with immutable bundled data
and versioned local persistence. The highest risks are content drift, shallow
explanations, ambiguous grading, offline cache drift, state corruption and an
oversized first-load bundle; phases include fail-closed compilation, 317-row
content QA, dual grading, cache/state migration, route-level loading and
full-bank audits to control them.

## Unresolved questions

None. Theme defaults and exact package versions may follow scaffold/toolchain
defaults as long as the locked production build satisfies this plan.
