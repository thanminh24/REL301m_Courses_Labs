# Final GitHub Pages release-test audit v2

**Date:** 2026-07-25  
**Scope:** exact standalone app commit
`d762ca123bca041c88a57c59b7e70283d0b43bd2`; Pages workflow, package gates,
Playwright configuration/tests, supplied exact-commit evidence, and current
production-target state  
**Verdict:** **PASS for code/test/workflow readiness; external deployment
remains pending and cannot yet receive production release approval**

## Decision

No code-side or test-side GitHub Pages release blocker remains at the reviewed
commit. The workflow now:

1. runs the full standalone release gate;
2. builds and smoke-tests the `/rel301m` artifact locally;
3. uploads and deploys that artifact;
4. reruns the same browser/offline Pages suite against GitHub's returned
   production URL.

The documented URL still returns GitHub HTTP 404 because repository
authentication/push/Pages deployment has not occurred. That is an external
release-state blocker, not evidence of a remaining implementation defect.

## Prior blocker closure

### Standalone workflow gate — closed

`.github/workflows/deploy-pages.yml:33-34` now invokes
`npm run verify:standalone`. `package.json:23` runs lint, typecheck, unit tests,
root production build, all cross-browser E2E, production service-worker tests,
and actual-zoom tests without the parent-course boundary dependency.

The parent-only boundary remains correctly attached to local `npm run verify`
at `package.json:24`, so the published standalone repository no longer fails
on a missing parent plan baseline.

### Full browser/PWA/zoom enforcement — closed

The workflow no longer substitutes the two focused Pages tests for the full
application gate. `verify:standalone` executes:

- 12 unit/component/domain/data tests;
- 30 E2E scenarios across desktop Chromium, Pixel 7 mobile Chromium, and
  Firefox: 90 executions;
- two production service-worker checks;
- one actual 200% page-scale check across all seven routes.

`playwright.config.ts:5-7` retains full parallel test scheduling but limits CI
to two workers. The supplied exact-commit run completed 90/90 with `CI=1`
without consuming retries. The prior clean standalone archive at `df5bc3b`
completed the full workflow path; `d762ca1` changes only the CI worker count,
and its exact-commit CI-mode E2E run and Pages suite pass.

### Post-deployment production smoke — closed in code

After `actions/deploy-pages@v4` completes,
`.github/workflows/deploy-pages.yml:67-85` installs locked test dependencies and
Chromium, passes `${{ steps.deployment.outputs.page_url }}` through
`PLAYWRIGHT_GITHUB_PAGES_BASE_URL`, and runs `test:github-pages`.

`playwright.github-pages.config.ts:3,11,17-25` uses that external URL and omits
the localhost `webServer` when the environment variable exists. Therefore the
post-deploy run cannot silently fall back to the pre-deployment Python server.

The shared two-test suite provides proportionate production smoke:

- `/rel301m/` renders, Learn navigation remains prefixed, manifest fetch works,
  start URL/scope remain `/rel301m/`, and observed browser responses contain no
  HTTP 4xx/5xx;
- after one online load and service-worker readiness, a cold
  `/rel301m/library/?q=Q004&id=Q004` page works offline and all seven main routes
  remain available.

This satisfies `docs/release-verification-checklist.md:17-24` in workflow
design. Its runtime production result necessarily waits for deployment.

### Existing waiting service worker — closed

The release series now detects a worker already waiting when registration
resolves and exposes the controlled reload path. The added component regression
is included in the fresh 12/12 unit result.

## Verification evidence

### Fresh independent checks on exact `d762ca1`

| Check | Result |
|---|---|
| Commit identity | PASS — HEAD equals full requested SHA; app worktree clean |
| `git show --check d762ca1` | PASS |
| Unit/component/domain/data | PASS — 4 files, 12/12 |
| E2E discovery | PASS — exactly 90 executions across 3 projects |
| `npm run build:github-pages` | PASS — 317 validated questions, 10 static routes |
| `CI=1 npm run test:github-pages` | PASS — 2/2, one worker |
| Public target request | PENDING/FAIL — GitHub HTTP 404 at `2026-07-25 06:34:57 UTC` |

### Supplied release evidence

- Exact `d762ca1`: 90/90 CI-mode E2E with two workers and no retry use; 2/2
  prefixed Pages checks.
- Release lineage: 12 unit, 2 production service-worker, and 1 actual-zoom
  checks pass.
- Clean standalone archive at `df5bc3b`: full workflow command path completed.
- Exact `d762ca1` `/rel301m` artifact: clean export reproducibility report records
  byte-identical outputs and aggregate
  `b951e2956f5ea9ced955ef0550039857283c7e123a1802b20216793df9e62092`.

This is sufficient to approve the commit for push and deployment. It is not a
substitute for the workflow's as-yet-unrun production smoke.

## External deployment boundary

`https://thanminh24.github.io/rel301m/` currently returns GitHub's 404 page, and
the local repository has no configured remote. Until credentials are available
and the exact SHA is pushed, no workflow run, Pages deployment, environment
identity, or remote smoke result can exist.

Final production approval requires:

1. push exact SHA `d762ca123bca041c88a57c59b7e70283d0b43bd2` to
   `thanminh24/rel301m` `main`;
2. enable GitHub Actions as the Pages source;
3. confirm the workflow build, deploy, and post-deploy smoke stages all pass;
4. confirm the `github-pages` deployment identifies the same SHA and the public
   URL serves the app.

No further repository change is required by this audit before attempting those
external steps.

## Unresolved questions

- Credentials/authorization and Pages repository setup remain with the
  controller/user.
- Production behavior remains unknown until the first exact-SHA workflow
  deployment completes.

Status: DONE_WITH_CONCERNS  
Summary: PASS for exact-commit code, local artifact, and workflow readiness.
Previous standalone-gate, full-suite-gating, waiting-worker, and post-deploy
smoke gaps are closed.  
Concerns/Blockers: External only — URL remains 404 pending authenticated push,
Pages activation, exact-SHA deployment, and successful production smoke.
