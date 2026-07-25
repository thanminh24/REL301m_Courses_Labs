# Final GitHub Pages release-test audit

**Date:** 2026-07-25  
**Scope:** exact standalone app commit
`570cf0adf5f72c2c5ca38ab07d801030b45320b5`; package scripts, Next/Playwright
configuration, Pages workflow, tests, supplied clean-build evidence, and the
documented production URL  
**Verdict:** **BLOCKED — artifact evidence is strong, but no successful
deployment or production-target verification exists**

## Release-blocking findings

### 1. BLOCKER — documented production URL returns HTTP 404

At `2026-07-25 06:19:52 UTC`, a fresh unauthenticated request to
`https://thanminh24.github.io/rel301m/` returned:

```text
HTTP/2 404
server: GitHub.com
content-type: text/html; charset=utf-8
```

The public GitHub API also returned `404 Not Found` for both
`thanminh24/rel301m` and commit `570cf0ad...`. This can mean the repository is
private or not yet pushed; it cannot establish a public deployed commit. The
local nested repository has no configured remote.

Impact: the exact production target is not serving the application. Local
builds and localhost Playwright runs cannot close this gate.

Required closure:

1. Push exact SHA `570cf0ad...` to `thanminh24/rel301m` `main`.
2. Enable GitHub Actions as the Pages source and complete the Pages deployment.
3. Prove the deployment/environment identifies that SHA.
4. Run fresh smoke tests against the returned production `page_url`, including
   `/rel301m/`, a feature route, manifest/scope, static assets, and a cold query
   deep link.

### 2. BLOCKER — workflow has no post-deployment production smoke

`.github/workflows/deploy-pages.yml:42-43` runs `test:github-pages` before upload
and deployment. `playwright.github-pages.config.ts:9-18` hard-codes a local
Python server at `127.0.0.1:3204`; its two tests never contact GitHub Pages.
The deploy job ends at `actions/deploy-pages@v4`
(`.github/workflows/deploy-pages.yml:56-65`) and has no dependent verification
job or step using `${{ steps.deployment.outputs.page_url }}`.

This directly contradicts `docs/release-verification-checklist.md:21-23`,
which requires production smoke after deployment rather than relying on local
results.

Impact: even a green workflow proves only that the artifact deployed action
reported success. It does not prove the public URL, `/rel301m` path handling,
published artifact contents, redirects, caching, or assets work on GitHub
Pages.

Required closure: add a post-deploy job that depends on `deploy`, targets the
deployment output URL, and fails the workflow on HTTP or browser smoke failure.
The test configuration must accept an external base URL and must not start the
localhost `webServer` for that job.

## Workflow coverage limitation

The automatic deploy gate is not equivalent to the supplied full local release
gate:

- `verify:ci` runs lint, typecheck, 11 unit tests, a root-path build, and the
  boundary check (`package.json:23`).
- It excludes the 30 E2E scenarios across three projects, the two production
  service-worker tests, and the actual-200%-zoom test.
- The workflow then runs only the two Chromium Pages-shaped localhost tests
  before deployment (`deploy-pages.yml:33-43`).

The controller's exact-SHA local evidence closes those application checks for
this immutable candidate: 11 unit, 90 E2E executions, 2 production
service-worker tests, 1 actual 200% zoom test, boundary 88, two passing Pages
tests, two byte-identical clean `/rel301m` exports with aggregate
`d38d6a18532e59808f560d304e8d682c60aed085d95bea46c92952ddac806490`,
and production dependency audit 0. It does **not** make the workflow a
self-contained release gate for later `main` pushes.

Required workflow hardening: run the full behavior suites before upload, or
make deployment depend on a separate required CI workflow that records those
results for the same SHA.

## Coverage sufficiency decision

| Target | Decision | Evidence |
|---|---|---|
| Exact source/data candidate | PASS | Exact SHA; broad functional, PWA, zoom, boundary, audit, and deterministic clean-build evidence |
| Local `/rel301m` artifact | PASS | `build:github-pages`; two localhost Pages tests cover navigation, manifest/scope, cold query deep link, assets through response-failure capture, and seven offline routes |
| Public target URL | **FAIL** | Fresh request returns GitHub HTTP 404 |
| Deployment identity | **NOT PROVEN** | Public repo/commit unavailable; no deployment/run evidence supplied |
| Workflow as release gate | **FAIL** | No post-deploy smoke; full browser/PWA/zoom suites not enforced before deployment |

No additional release blocker was found in the two Pages tests themselves.
They are proportionate pre-deployment smoke coverage, but they cannot substitute
for production-target checks.

## Unresolved questions

- Is `thanminh24/rel301m` private, not yet created, or not yet pushed?
- Which completed workflow run and Pages deployment should identify exact SHA
  `570cf0ad...`?

Status: DONE_WITH_CONCERNS  
Summary: Exact candidate and local `/rel301m` artifact coverage are sufficient;
GitHub Pages release evidence is not. The documented URL is 404, deployment
identity is unproven, and the workflow never smoke-tests production after
deployment.  
Concerns/Blockers: Successful exact-SHA deployment plus post-deploy production
smoke required before release approval.
