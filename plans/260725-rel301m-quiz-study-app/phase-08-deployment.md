# Phase 08 — GitHub Pages and Sites deployment

## Goal

Deploy the exact verified source to `thanminh24.github.io/rel301m/`, preserve a
Sites release, and smoke-test both production targets.

## Files

- `study-app/open-next.config.ts` or Sites-required OpenNext configuration
- `study-app/.openai/hosting.json` only if created/managed by Sites
- `study-app/.github/workflows/deploy-pages.yml`
- `study-app/playwright.github-pages.config.ts`
- `study-app/tests/github-pages/github-pages.spec.ts`
- `study-app/README.md`
- `study-app/docs/quizlet-parity-matrix.md`
- `plans/260725-rel301m-quiz-study-app/reports/deployment-YYYY-MM-DD.md`

## Implementation

1. Before site creation, check repository and `study-app/` for
   `.openai/hosting.json`; reuse opaque `project_id` exactly if present.
2. Confirm static/client APIs and OpenNext output meet Sites runtime contract.
   No runtime dependency on source files outside `study-app/`.
3. Run complete `npm run verify` against exact source state.
4. Initialize `study-app/` as the standalone `thanminh24/rel301m` repository,
   push the exact verified commit, and let its GitHub Actions workflow build,
   smoke-test and deploy the `/rel301m` export.
5. Confirm the Pages job reaches terminal success, then smoke-test the public
   URL, direct query deep links, manifest assets, and post-install offline routes.
6. Use Sites skills for source preparation/validation. Create the site at most
   once, push exact source, capture its commit SHA, then save a version from that
   SHA. If an archive is required, build it only from the pushed state.
7. Deploy only the saved version. Production URL is real production; do not call
   deploy until checks pass. Inspect status until terminal.
8. Smoke-test production:
   load dashboard, search Q317, Q002/Q004/Q188 answer presentation, complete one
   flashcard rating, one Learn response and a short Test, reload persistence,
   export progress, keyboard navigation, mobile viewport, direct deep link,
   installability and post-first-load offline reload.
9. Record project/version/deployment opaque IDs, commit SHA, production URL,
   terminal status, smoke results and rollback version in report.

## Acceptance

- GitHub Pages workflow succeeds and
  `https://thanminh24.github.io/rel301m/` is publicly reachable.
- Sites deployment reaches terminal success and its configured access policy is
  verified.
- Production bundle contains exactly the validated 317 data hash.
- Critical production smoke tests pass with no console/runtime errors.
- Rollback target is a previously saved version or deployment removal procedure;
  no source data deletion is used as rollback.

## Risk / rollback

Risk: local works but runtime adapter differs. Verify OpenNext artifact locally
and deploy saved version only. On regression, redeploy last known-good saved
version; preserve failed version/report for diagnosis.

## Exit

Both production URLs and smoke evidence are delivered to user.

## Unresolved questions

None.
