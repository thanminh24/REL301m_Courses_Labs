# Phase 07 — Verification and hardening

## Goal

Prove full scope, data fidelity, behavior, accessibility and production readiness.

## Files

- `study-app/e2e/{dashboard-library,flashcards,learn,test-mode,persistence}.spec.ts`
- `study-app/e2e/{match,accessibility,responsive,recovery,offline}.spec.ts`
- `study-app/tests/data/full-bank-content-audit.test.ts`
- `study-app/scripts/audit-production-bundle.mjs`
- `study-app/docs/test-matrix.md`
- `study-app/docs/quizlet-parity-matrix.md`
- `study-app/docs/content-review-checklist.md`
- `plans/260725-rel301m-quiz-study-app/reports/tester-YYYY-MM-DD.md`
- `plans/260725-rel301m-quiz-study-app/reports/reviewer-YYYY-MM-DD.md`

## Test matrix

| Area | Proof |
|---|---|
| Data | exact 317 sequence, source preservation, verdict/evidence totals, hashes |
| Domain | reducers, shuffle, scheduler, grading, migration, search/filter |
| Components | answer variants, dialogs, forms, recovery, focus/live regions |
| E2E | first run and resume across Dashboard/Library/Cards/Learn/Test/Progress |
| Ambiguity | Q002/Q004/Q188 exam/concept behavior |
| Content quality | 317/317 explanation, takeaway, A–D rationale and citation review |
| Persistence | reload, export/import, migrations, save failure, both resets |
| Offline | cached main routes, reload/deep link, cache update/data-hash migration |
| Responsive | 320 px, phone landscape, tablet, desktop, 200% zoom |
| Accessibility | keyboard-only, focus, semantic names, axe critical/serious = 0 |
| Failure | bad dataset, localStorage error, corrupt import, interrupted sessions |
| Build | lint, typecheck, unit/component, E2E, deterministic data, production build |

## Implementation

1. Add one `npm run verify` orchestration command without hiding failures:
   data check → format/lint → typecheck → unit/component → build → E2E.
   Run from a clean `npm ci` twice and compare generated data/build manifests.
2. Test against production server, Chromium plus at least Firefox/WebKit for
   critical flows. Use mobile emulation and reduced-motion context.
3. Full-bank audit renders/serializes every question and validates no unsafe
   HTML, missing explanation, broken locator or local absolute path.
   Independently review all 317 QA rows against the source/evidence tier and
   sign off readability, option rationales and exam/concept separation.
4. Force storage/data failures to prove actionable recovery and no partial study
   bank. Verify offline navigation after initial load where supported.
5. Run independent tester and code/content reviewer. Fix findings and rerun full
   gates. Reports list commands, versions, counts, failures/fixes and unresolved
   questions.
6. Inspect `git diff --check` and status; verify no change under
   any pre-existing dirty path was caused by app work. Compare against the
   baseline captured before scaffold; never use clean/reset/checkout.
7. Publish a parity matrix: implemented Dashboard/Library, Flashcards, Match,
   Learn, Test and Progress; explicitly excluded social/commercial features.
8. Offline E2E loads every main route online, switches the browser context
   offline, reloads/deep-links, verifies progress persists, then exercises a
   new service-worker/data-hash update without mixed caches.

## Acceptance

- All gates exit zero twice from clean dependency install/build.
- No critical/serious axe findings; no horizontal scroll at 320 px/200% zoom.
- Every named route and recovery state has E2E coverage.
- Reviewer explicitly confirms no exam/concept conflation.
- Reviewer signs off the 317-row content QA manifest; 38 bank-only entries are
  canonical-but-unverified and never labeled reference-correct.
- Offline reload/deep-link and atomic cache-update tests pass.
- No flaky retry masking and no skipped required tests.

## Risk / rollback

Risk: broad “green” suite misses content. The 317-record audit and requirement
matrix are mandatory release gates. Roll back failing feature, never weaken gate.

## Exit

Tester and reviewer reports both say pass-for-deployment with no blockers.

## Unresolved questions

None.
