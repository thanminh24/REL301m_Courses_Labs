# Final release code review v2

Date: 2026-07-25  
Scope: current `study-app/` source, canonical compiler/validator, persistence,
grading, PWA, tests, release docs, and plan contracts  
Review mode: read-only; this reviewer changed no application or test source

## Verdict

**PASS — no unresolved high- or medium-severity correctness, security, privacy,
accessibility, persistence, grading, performance, offline, or deployment-readiness
finding remains in the reviewed source.**

The release must still be built, pushed, saved, deployed, and smoke-tested from
one exact commit as required by Phase 08. That is an execution gate, not a
remaining source defect.

## Fresh verification

| Gate | Result |
|---|---:|
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0 |
| `npm run test` | PASS, 3 files / 11 tests |
| `npm run data:check` | PASS, all 317 canonical/content-QA gates |
| `npm run verify:boundary` | PASS, 88 baseline paths preserved |
| Task-scope diff whitespace check | PASS |
| Final content audit v7 | PASS for dataset hash `d881c16397145b98a1963e05da1a10e3db8dfd7000ee146e87d9493f58611efb` |
| Final UI/UX audit v3 | PASS |

The full browser, production-export, offline, and cross-browser release run is
owned by the final independent test gate. This review does not substitute its
results with the older, pre-remediation `final-test-report.md`.

## Requirement audit

### Canonical content and provenance — PASS

- The compiler recomputes SHA-256 for every immutable authority snapshot and
  fails on mismatch (`study-app/scripts/build-question-bank.mjs:26-39`).
- Records, adjudications, evidence, and content fragments must each contain
  exactly one Q001–Q317 entry (`build-question-bank.mjs:49-71`).
- Generated data preserves source stems, options, and supplied exam answers
  directly from authority records (`build-question-bank.mjs:80-117`).
- Editorial approval is hash-bound; all 317 current QA rows are independently
  reviewed only for the audited dataset hash (`build-question-bank.mjs:163-184`).
- The final validator checks IDs/order, verdict/evidence totals, explanation and
  rationale quality, bank-only disclosure, semantic regressions, duplicate
  explanation reuse, QA signatures, and the high-risk answer distinctions.
- The validator no longer depends on `Map.groupBy`, so its implementation is
  compatible with the documented Node 20.9+ runtime
  (`validate-question-bank.mjs:231-252`).

### Exam versus conceptual grading — PASS

- Q002 keeps exam C while conceptual grading remains free-form/manual; neither
  MCQ nor written Test falsely autogrades it
  (`study-app/src/domain/study/session.ts:60-110`).
- Q004 remains visibly bank-key-only and receives no invented conceptual truth.
- Q188 keeps exam A and conceptual A+B; Q224 keeps exam C and conceptual B+C.
- Learn supports conceptual multiple selection and reports bank versus concept
  independently (`study-app/src/components/learn-session.tsx:221-318`).
- Test remains a faithful single-choice bank exam. Multiple-concept items use
  `gradeSingleChoiceConceptAnswer`, return `null`, stay out of the automated
  concept denominator, appear as correct-with-nuance when the bank response is
  right, and offer explicit one-shot self-review
  (`practice-test.tsx:272-299`, `400-432`, `735-814`).
- Written Test returns manual review for free-form/manual-review records rather
  than treating an exact bank string as conceptual proof.
- Unanswered Test items are confirmed and remain unrecorded rather than being
  silently added as difficult attempts (`practice-test.tsx:272-303`, `366-384`).

### Persistence and mastery — PASS

- Global study state is size-limited and validates schema version, dataset hash,
  QIDs, enums, ranges, attempts, dates, and selected letters before hydration or
  import (`study-provider.tsx:32-106`).
- Import uses a versioned, hash-bound checksum envelope and mutates state only
  after full validation (`study-provider.tsx:194-238`).
- Mastery requires conceptual success in two distinct session IDs; merely
  revealing a card does not record success (`study-provider.tsx:153-185`).
- Flashcards, Learn, Match, and Test each persist dataset-hash-bound session
  snapshots and expose separate confirmed session reset controls.
- Test manual self-review is one-shot, exposes pressed state, and prevents
  conflicting success/failure attempts within one session.

### Interaction and accessibility — PASS

- The mobile drawer is inert and hidden when closed, traps focus when open,
  supports Escape, and restores trigger focus (`app-shell.tsx:34-147`).
- Flashcard document content is no longer nested inside a giant semantic
  button. A dedicated overlay flip control carries the action/name/expanded
  state, while rich content remains semantic
  (`flashcard-deck.tsx:420-479`).
- Flashcard shortcuts work from the intended flip surface while focused
  buttons, links, inputs, textareas, selects, summaries, and editable content
  are not hijacked (`flashcard-deck.tsx:241-273`).
- Learn and Test move focus to replacement prompts/feedback. Test mounts one
  active question and a bounded 20-item navigator instead of 317 fieldsets.
- Match exposes selection state, live progress, and progressbar semantics while
  limiting play to 241 current unambiguous, reference-supported single-answer
  pairs (`match-game.tsx:46-59`, `177-264`).
- The v3 independent UI audit found no horizontal overflow at 320, 360, 768, or
  1440 px and no axe violations in its final targeted checks.

### Privacy, security, performance, and offline safety — PASS

- The app is static/client-only: no account, analytics, tracking, remote API,
  secret, or server-side user-data path exists. Progress remains in local
  browser storage and exported only on explicit user action.
- React renders learner content as text; generated runtime evidence strips
  local filesystem paths (`build-question-bank.mjs:73-77`).
- Library search/filtering does not mutate the canonical bank, and Test renders
  only one active question plus paginated review groups. The static route
  payload is sizeable because it intentionally contains all 317 explanations,
  but current route HTML remains below one megabyte and does not create an
  unbounded active DOM.
- Service-worker cache identity includes both dataset and application source
  hashes (`build-question-bank.mjs:137-162`, `186-190`).
- Installation fails closed unless every main route and discovered same-origin
  Next asset is cached; activation deletes only obsolete
  `rel301m-study-*` caches; updates wait for explicit user activation
  (`study-app/public/sw.js:1-63`).
- Cache-first routing provides offline main-route reload, while successful
  same-origin fetches refresh only the current app cache
  (`public/sw.js:65-81`).

### Release wiring — PASS

- `npm run build` always recompiles and validates canonical data before the
  static export.
- `npm run verify` includes lint, TypeScript, unit, build, cross-browser E2E,
  production offline checks, and worktree-boundary verification
  (`study-app/package.json`).
- The app has static export configuration, manifest/icons, production offline
  configuration, parity matrix, release checklist, and an existing Sites
  project ID. No runtime source outside `study-app/` is required.

## Findings resolved during this review

1. Written conceptual grading had autograded free-form/manual-review answers.
   Fixed centrally and covered for Q002/Q229.
2. Single-choice Test had made Q188/Q224 conceptually impossible while counting
   them as gradeable. Fixed with single-choice-safe grading and explicit
   self-review.
3. Validator used a Node-incompatible `Map.groupBy`. Replaced with a compatible
   Map loop.
4. Flashcard rich content was nested inside a button and global shortcuts
   hijacked focused controls. Fixed with a semantic card, dedicated flip
   control, and target-aware shortcuts.
5. The first shortcut remediation suppressed arrows on the focused flip
   control. Fixed and regression-covered.
6. Manual Test self-rating could append contradictory attempts and exposed no
   pressed state. Fixed as a one-shot accessible decision.

## Release conditions after this report

- Run the complete release gate against the final post-review source state.
- Push that exact state to the existing Sites repository.
- Save and deploy only the matching commit.
- Confirm terminal deployment success and execute the Phase 08 production smoke
  matrix, including Q002/Q004/Q188, persistence, mobile, direct routes, and
  offline reload.

## Unresolved questions

None.

Status: DONE  
Summary: PASS; current reviewed source has no unresolved high/medium release
finding.  
Docs impact: none; review report only.  
Concerns/Blockers: none in source. Deployment and production smoke remain the
controller's required release execution gates.
