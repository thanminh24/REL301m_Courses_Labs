# REL301m Study Studio parity boundary

This app intentionally implements the single-learner study workflow requested
for the canonical REL301m bank. “Quizlet-style” describes familiar study modes;
the app does not use Quizlet branding, code, data, or services.

| Capability | Status | REL301m behavior |
|---|---|---|
| Searchable set/library | Implemented | Searches all Q001–Q317 across stems, options, topics, concepts, explanations, and rationales; supports course, topic, verdict, evidence, mastery, favorite, and sort controls. |
| Flashcards | Implemented | Stable saved order, exact resume, filters, flip, favorite, deterministic shuffle, swipe, keyboard controls, Again/Hard/Good/Easy requeue, and separate session reset. |
| Learn | Implemented | Deterministic adaptive rounds, immediate dual bank/concept feedback, safe curated typed recall after prior exposure, retry/requeue, “I don’t know,” resume, and reset. |
| Test | Implemented | Up to all 317, filters, MCQ or curated written/self-review, timed mode, instant/end feedback, autosave, navigator, flags, unanswered confirmation, dual scores, review, resume, and reset. |
| Match | Implemented | Timed/untimed six-pair rounds with resume and reset; only unambiguous reference-supported pairs are eligible. |
| Progress | Implemented | Local favorites, attempts, two-session mastery, difficult queue, topic/course summaries, recent sessions, daily goal, export/import, retry, and confirmed reset. |
| Offline/installable app | Implemented | Web manifest and data-hash-versioned service worker cache every main route after one successful online load. |
| Accounts and cloud sync | Excluded | Progress remains on this device; versioned export/import supports transfer. |
| Classes, public sharing, user-created sets | Excluded | The product is scoped to the fixed canonical REL301m exam set. |
| Audio, image scanning, multiplayer, AI chat | Excluded | These do not improve the requested 317-question exam-learning workflow. |
| Payments or commercial features | Excluded | This is a private course study tool. |

## Truth and grading contract

- The supplied school-bank key always remains visible for exam recall.
- Conceptual grading is shown separately when references reveal ambiguity or an
  incorrect key.
- Bank-key-only items are canonical because they appeared in tests, but the UI
  labels them unverified.
- The app never fabricates true/false propositions or accepts approximate typed
  matches. Typed grading uses only curated exact aliases; unsafe items remain
  multiple-choice or manual review.

