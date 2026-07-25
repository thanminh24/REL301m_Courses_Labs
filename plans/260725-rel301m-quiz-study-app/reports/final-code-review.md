# Final code/content integration review

Date: 2026-07-25  
Scope: `study-app/` against the approved plan and the 317-question website
objective  
Review mode: read-only codebase/spec audit; only this report was written

## Verdict

**FAIL — not ready for deployment or a completion claim.**

The immutable bank structure is promising: an independent comparison found all
317 generated IDs ordered and unique, with zero stem/option/supplied-key
mismatches against `question-records.json`. Q002, Q004, Q188, Q224 and Q229 also
retain the intended answer distinctions. However, the learner content itself has
an existing full-bank FAIL, several core study contracts are absent, and the
release gate does not run the required end-to-end/offline/boundary checks.

## Blocking findings

### CRITICAL — the “verified deep explanations” acceptance claim is false

Evidence:

- The independent 317-row audit explicitly fails the artifact and identifies
  mechanical copy in 280 questions plus materially displaced teaching in 20
  questions: `reports/content-quality-audit.md:7-14`, `:29-43`, `:45-85`.
- Q271 asks for the transition model, but its explanation starts by defining an
  agent and its takeaway says “Agent acts…”:
  `study-app/src/data/generated/question-bank.json:13381-13414`.
- Q286 asks what learning rate alpha does, but its explanation, takeaway and all
  four rationales teach target-vs-behavior policy:
  `study-app/src/data/generated/question-bank.json:14138-14171`.
- Despite that evidence, the compiler stamps `sourceAligned`,
  `answerSeparationChecked`, and `independentlyReviewed` to `true` without
  performing those reviews: `study-app/scripts/build-question-bank.mjs:102-114`.
  The validator merely rejects known text patterns/lengths and then accepts those
  hardcoded flags: `study-app/scripts/validate-question-bank.mjs:15-33`,
  `:84-132`, `:154-158`.

Impact: the product can confidently show irrelevant or shallow teaching as
independently reviewed. This directly violates the primary learning goal and
invalidates the QA manifest as release evidence.

Required remediation: finish the independent audit’s acceptance conditions at
`reports/content-quality-audit.md:169-177`, regenerate the bank, derive every QA
field from actual checks/reviewer evidence, and obtain a fresh 317/317
independent PASS.

### CRITICAL — approved core behavior is mostly a non-resumable prototype

The plan requires persisted mode sessions, ratings/scheduling, adaptive typed
recall, configurable MCQ/true-false/written tests, flags/navigation, unanswered
confirmation, and separate session/progress resets. The only persisted shape is
six fields—favorites, mastered, difficult, attempts, daily goal, last studied
time—at `study-app/src/domain/progress/types.ts:9-26`. Flashcard order/index/flip
are local component state (`flashcard-deck.tsx:26-31`), Learn
round/index/answers/score are local (`learn-session.tsx:14-34`), Match round/time
are local (`match-game.tsx:34-42`), and Test phase/questions/responses/timer are
local (`practice-test.tsx:28-35`).

Consequences:

- Reload loses every in-progress mode session; there is no Resume/Discard flow.
- Flashcards have no Again/Hard/Good/Easy queue or scheduler.
- Learn has no typed recall, alias grading, two-failure reveal, “I don’t know,”
  or requeue.
- Test only supports MCQ, course, count (capped at 100), and a basic timer
  (`practice-test.tsx:14-26`, `:103-175`). It cannot run the required “all 317,”
  true/false, written/manual-review, feedback-mode, filter, flag, navigator, or
  unanswered-confirmation paths.
- There is no separate reset-current-session control anywhere; only whole
  progress reset exists (`progress-dashboard.tsx:155-169`).

Impact: the named Flashcards/Learn/Test modes exist visually, but do not meet the
accepted Quizlet-style functional scope.

Required remediation: implement the plan’s explicit state machines and
versioned persisted session contract, then add reducer/component/E2E coverage for
reload and every required transition.

### HIGH — mastery teaches bank recall as conceptual mastery

Learn calculates both grades but records only `gradeExamAnswer` and immediately
calls `markMastered(question.id, correct)`:
`study-app/src/components/learn-session.tsx:67-96`. Thus on Q188:

- choosing **A** is conceptually incomplete but marks the item mastered;
- choosing **A+B** is conceptually correct but records a failure and marks it
  difficult.

Flashcards are worse: clicking “Know it” immediately marks mastery without any
retrieval attempt (`flashcard-deck.tsx:177-195`). The provider stores mastery as a
manual boolean (`study-provider.tsx:79-89`), not the required successful recall
in two separate sessions.

Impact: dashboard/progress mastery can invert the learning truth on canonical
ambiguous questions.

Required remediation: store bank and concept outcomes separately; compute
mastery from qualifying retrievals across distinct session IDs; a flip or manual
button must never establish mastery.

### HIGH — import/storage is neither validated nor failure-safe

`parseStudyState` validates only version and four array shapes, then spreads the
entire untrusted object into live state (`study-provider.tsx:30-46`). It accepts
unknown QIDs, malformed attempts/dates/selections, arbitrary strings in sets,
invalid daily goals, and oversized files. For example, an imported attempt with
`at: null` later crashes `attempt.at.startsWith(...)` in
`dashboard.tsx:48-52`. Import has no data hash, checksum, size cap, preview,
migration, or atomic confirmation (`study-provider.tsx:112-119`;
`progress-dashboard.tsx:142-153`).

Additionally, localStorage reads and writes are unguarded
(`study-provider.tsx:56-68`), so privacy-mode/quota/security exceptions can crash
the application. There is no memory fallback, error banner, retry, or preservation
of the prior serialized state.

Required remediation: use a strict Zod import schema with QID/enums/ranges,
version + dataset hash + checksum + size limit, preview/confirm, migrations and
atomic commit. Catch storage failures and retain an in-memory state with an
actionable warning.

### HIGH — Match violates the verified-eligibility contract

`createRound` samples from all questions and pairs every stem with its supplied
exam key (`match-game.tsx:16-31`). It does not exclude bank-only, incorrect,
ambiguous, multi-answer, freeform, or manual-review records and shows no
eligibility count. This is the inverse of the approved Match requirement.

Impact: a speed/repetition game reinforces known defective or unverified keys
without presenting the conceptual correction during the interaction.

Required remediation: select only unambiguous concept-gradeable records whose
answer pair is unique, explain excluded counts, shuffle the two sides
independently, and add a full-bank eligibility invariant test.

### HIGH — offline cache updates are neither complete nor atomic

The service worker precaches route HTML and icons only
(`study-app/public/sw.js:1-20`); it does not precache the route-specific Next.js
chunks those HTML files reference. Therefore visiting one route online does not
prove a never-visited main route can execute offline. There is no offline test.

Update handling also:

- calls `skipWaiting()` immediately and deletes **every** other cache on the
  origin, not only `rel301m-study-*` caches (`public/sw.js:20-35`);
- keys the cache only by the dataset hash, so an app-code-only release reuses the
  same name (`build-question-bank.mjs:100-120`);
- removes the old cache before old controlled clients are guaranteed to finish,
  allowing mixed/missing asset generations.

Required remediation: version by app build plus dataset hash, precache the exact
export manifest/assets, delete only this app’s obsolete caches after safe
activation, retain compatibility for old controlled clients, and prove every
main route/deep link across an update in production-mode offline E2E.

### HIGH — the canonical build can silently deploy stale/generated provenance

`npm run build` runs `data:check` but not `data:build`
(`study-app/package.json:7,12-13`). Tests and validation read only the existing
generated bank. A changed authority snapshot or content fragment can therefore
leave the deployed bank stale while all gates remain green.

The compiler also trusts the stored `source-hashes.json` without recomputing it
(`build-question-bank.mjs:17-22,76-85`), silently overwrites duplicate enrichment
IDs in a `Map` (`:24-28`), and ignores extra adjudication/evidence/enrichment
records. No deliberate-input-corruption tests exist.

Required remediation: fail closed on exact QID set/uniqueness in every input,
recompute and compare source hashes, build deterministically before checking, and
test missing/duplicate/extra/corrupted authority records plus two-run byte
identity.

### HIGH — the release command omits the release gates

`npm run verify` runs lint, typecheck, 10 Vitest tests, data check via build, and
Next build only (`package.json:18`). It omits E2E, accessibility/responsive,
offline, boundary, deterministic rebuild and production smoke tests.

Coverage is far below the plan:

- only 10 unit tests across three files;
- one seven-test Playwright file;
- Playwright serves `next dev`, not the static production export
  (`playwright.config.ts:17-21`);
- only desktop/mobile Chromium are configured, not Firefox/WebKit
  (`playwright.config.ts:13-16`);
- axe explicitly disables color contrast and omits Match and Progress
  (`tests/e2e/study-app.spec.ts:100-114`);
- there are no offline, 320 px/200% zoom, reduced-motion, import corruption,
  storage failure, timer reload, migration, service-worker update, keyboard-only,
  or recovery tests.

Fresh evidence from this review: `npm run verify` exited 0 (3 files, 10 tests,
production build succeeded). `npm run test:e2e` could not start its web server
because this review sandbox denies binding `127.0.0.1:3100` with `EPERM`; the
checked-in `.last-run.json` says “passed” but contains no run metadata and is not
fresh proof. `npm run verify:boundary` exited 0 and preserved 88 baseline paths.

Required remediation: make one release command execute all mandatory gates
against the production export, with fresh reports and no skipped coverage.

## Important findings

### MEDIUM — Test autogrades a manual-review concept and mishandles unanswered

`gradeConceptAnswer` ignores `conceptualAnswer.kind` and auto-grades whenever
accepted letters exist (`session.ts:60-69`). Q229 is explicitly
`manual-review` but has accepted letter C, so the Test concept score silently
auto-grades it. On submission, every unanswered item is recorded as an incorrect
attempt and added to the difficult set (`practice-test.tsx:36-45`;
`study-provider.tsx:91-102`) rather than remaining “Unanswered.” The results do
not show the learner’s selected response (`practice-test.tsx:217-233`).

Required remediation: grade by kind, keep manual-review outside automatic
concept percentages, model unanswered distinctly, confirm before submit, and
display the response/bank/concept comparison per item.

### MEDIUM — accessibility interactions do not satisfy the plan

The flashcard is one `<button>` containing `<div>`, headings, lists, and the
entire explanation (`flashcard-deck.tsx:133-165`), which is invalid interactive
content and collapses rich document semantics into a giant button name. It also
lacks the required `aria-expanded`. The global shortcut handler excludes only
`HTMLInputElement`; pressing Enter/Space/S while using a select, button,
textarea, contenteditable control, or dialog can flip/star/navigate the card
unexpectedly (`flashcard-deck.tsx:55-70`). Mobile navigation has no focus trap,
Escape handling, or focus restoration (`app-shell.tsx:28-86`).

Required remediation: make the card content a semantic region with a dedicated
flip button, implement `aria-expanded`, suppress shortcuts for all editable and
interactive contexts, and test focus/keyboard behavior.

### MEDIUM — Library discoverability is materially incomplete

Search checks only ID, stem, topic, and concept (`search.ts:14-20`), not options
or explanations as required. UI filters only course, verdict, and favorites
(`question-library.tsx:11-27,39-81`), omitting module/topic/mastery/evidence and
required sorts. There are no question-detail/deep-link routes.

### MEDIUM — declared Node support is inconsistent with the compiler

README claims Node 20.9+ (`study-app/README.md:21-27`), while the compiler uses
`Object.groupBy` (`build-question-bank.mjs:76-98`), which is not available in
the earliest claimed Node 20 runtime. Either replace it with a compatible
reducer or raise/enforce the engine requirement.

### MEDIUM — Sites deployment readiness is unproven

`study-app/.openai/hosting.json` contains a project ID, but there is no saved
version/deployment report, exact pushed commit proof, production URL, terminal
deployment status, production data-hash check, or critical production smoke
evidence. The required parity/test/content-review documents under
`study-app/docs/` are absent. Deployment must wait for the blockers above.

## Spec compliance summary

| Area | Result |
|---|---|
| Exact Q001–Q317 source stems/options/keys | PASS |
| Verdict/evidence totals and key anomalies | PASS |
| Deep, easy, independently reviewed 317 explanations | FAIL |
| Dashboard and basic Library | PARTIAL |
| Flashcards | PARTIAL |
| Match | FAIL contract |
| Adaptive Learn | PARTIAL |
| Configurable Test / all 317 | FAIL |
| Progress and safe persistence | PARTIAL / unsafe import |
| Session resume and dual reset | FAIL |
| Offline PWA/update correctness | FAIL / unproven |
| Keyboard/touch/a11y/responsive | PARTIAL / unproven |
| Required release test matrix | FAIL |
| Sites saved-version deployment and smoke | MISSING |
| Dirty-worktree preservation | PASS (fresh boundary check) |

## Unresolved questions

- None requiring a user decision. The blockers are implementation and
  verification gaps against the already approved plan.

Status: DONE  
Summary: Final review FAIL. Canonical source preservation passes, but learner
content remains independently failed, core modes do not meet the persisted
Quizlet-style contracts, and offline/release/deployment proof is missing.  
Concerns/Blockers: Critical content-QA false acceptance; missing session/state
machines; bank-vs-concept mastery inversion; unsafe persistence; Match/offline
contract violations; incomplete release gate.
