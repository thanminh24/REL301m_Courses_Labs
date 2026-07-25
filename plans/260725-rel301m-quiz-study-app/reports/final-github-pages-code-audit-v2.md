# Final GitHub Pages code audit v2

Date: 2026-07-25  
Reviewed repository: `study-app/`  
Reviewed commit: `d762ca123bca041c88a57c59b7e70283d0b43bd2`  
Mode: exact-commit review from isolated `git archive`; app files not edited

## Verdict

**PASS — no release-blocking GitHub Pages finding remains.**

The prior standalone-workflow blocker and waiting-service-worker defect are
fixed. The exact commit passes its complete standalone gate, the prefixed Pages
build, local offline Pages smoke tests, and the configuration branch used for
post-deployment smoke tests.

## Fixed findings

### Standalone workflow boundary blocker — fixed

- `.github/workflows/deploy-pages.yml:33-34` now runs
  `npm run verify:standalone`.
- `package.json:23` defines that gate as lint, typecheck, unit tests, root static
  build, the full E2E matrix, production service-worker tests, and zoom test.
- `package.json:24` keeps the parent-only boundary check in local `verify`; it is
  no longer reachable from the standalone GitHub Actions workflow.
- `README.md:39-42` documents the distinction.

An exact standalone archive completed `CI=1 npm run verify:standalone` without
looking for the outer course repository or its baseline.

### Already-waiting service worker — fixed

- `src/components/service-worker-registration.tsx:20-29` inspects
  `registration.waiting` as soon as registration resolves and exposes it when
  an existing worker controls the page.
- `src/components/service-worker-registration.tsx:31-36` retains the
  `updatefound` path for newly installed workers.
- `tests/components/service-worker-registration.test.tsx:12-47` reproduces an
  update already waiting before mount, verifies the reload control, verifies
  `SKIP_WAITING`, and verifies the one-shot `controllerchange` listener.
- The regression is included in the 12-test unit suite and passed.

## Workflow and Pages review

- The build job uses locked dependencies, complete standalone verification,
  `/rel301m` export, focused offline smoke tests, `.nojekyll`, Pages
  configuration, and artifact upload.
- The deploy job uses the `github-pages` environment and deploy action output.
  `.github/workflows/deploy-pages.yml:82-85` passes that exact `page_url` through
  `PLAYWRIGHT_GITHUB_PAGES_BASE_URL`.
- `playwright.github-pages.config.ts:3-25` disables its local web server when
  the live URL is supplied. The same two route/manifest/offline tests therefore
  execute against the deployed origin.
- The live-URL branch was exercised with an independently started server and a
  URL ending in `/rel301m/`; both tests passed. This confirms the environment
  branch and hard-coded `/rel301m` test paths compose correctly.
- `playwright.config.ts:6` limits CI E2E execution to two workers. Fresh output
  confirmed `Running 90 tests using 2 workers`.
- Pushes are limited to `main`, plus manual dispatch. No pull-request or
  fork-controlled trigger receives Pages/OIDC permissions.

Non-blocking hardening, not a defect: workflow permissions remain declared at
workflow scope, so the build and post-deploy dependency-install steps inherit
Pages/OIDC permissions they do not all need. Job-scoped least privilege and
immutable action SHA pinning would reduce supply-chain exposure. This does not
invalidate the release under the current trusted `main`/manual trigger model.

## Fresh verification

| Check | Result |
|---|---|
| Review target | PASS — exact commit extracted with `git archive` |
| Lint | PASS |
| TypeScript | PASS |
| Unit tests | PASS — 12/12 |
| Canonical data validation | PASS — 317 questions |
| Root static build | PASS — 10 static pages |
| E2E matrix | PASS — 90/90, two CI workers |
| Production service-worker tests | PASS — 2/2 |
| Actual 200% zoom test | PASS — 1/1 |
| `/rel301m` static build | PASS — 10 static pages |
| Local Pages navigation/offline suite | PASS — 2/2 |
| Injected live-base-URL Pages suite | PASS — 2/2 |

## Deployment assumptions

- `study-app/` contents are the root of the standalone GitHub repository.
- Repository path remains `/rel301m`; changing the repository name requires
  updating the build base path and test prefix together.
- GitHub Pages source is GitHub Actions.
- The production smoke step detects a bad deployment after deployment has
  occurred; it reports failure but is not a rollback mechanism.

## Unresolved questions

None.

Status: DONE  
Summary: PASS; both prior defects are fixed, complete standalone verification
passes, and local plus injected-live-URL GitHub Pages smoke suites pass.  
Concerns/Blockers: None. Least-privilege permission scoping remains optional
workflow hardening.
