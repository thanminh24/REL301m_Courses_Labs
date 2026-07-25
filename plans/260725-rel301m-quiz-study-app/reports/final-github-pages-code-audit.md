# Final GitHub Pages code audit

Date: 2026-07-25  
Reviewed repository: `study-app/`  
Reviewed commit: `570cf0adf5f72c2c5ca38ab07d801030b45320b5`  
Mode: exact-commit review from an isolated `git archive`; app files not edited  
Boundary: later concurrent uncommitted worktree edits are excluded

## Verdict

**FAIL — the committed GitHub Pages workflow cannot complete from the documented
standalone repository layout.**

The `/rel301m` export, manifest, scoped service worker, route precache, offline
query deep link, all seven offline routes, and repeatable lint checks pass.
Deployment is nevertheless blocked before the Pages build starts because
`verify:ci` invokes a parent-repository-only boundary script. A separate
medium-severity update lifecycle defect can strand an already-waiting service
worker without the advertised reload control.

## Findings

### HIGH — standalone Pages workflow always reaches a missing parent baseline

Evidence:

- `README.md:46-55` defines `study-app/` as the standalone repository pushed to
  `thanminh24/rel301m`.
- `.github/workflows/deploy-pages.yml:30-37` runs `npm ci`, then
  `npm run verify:ci`, before the `/rel301m` build.
- `package.json:22-24` makes `verify:ci` end with `verify:boundary`.
- `scripts/verify-worktree-boundary.mjs:7-13` treats the directory above the app
  as the repository root and unconditionally reads
  `plans/260725-rel301m-quiz-study-app/reports/worktree-baseline-2026-07-25.json`
  from that parent.

This works only while `study-app/` is nested inside the local course worktree.
GitHub Actions checks out the standalone repository as its workspace root, so
the parent course plan is absent.

The failure was reproduced from an exact `git archive` of the reviewed commit,
with the app placed at a standalone temporary root:

```text
Error: ENOENT: no such file or directory, open
'/tmp/plans/260725-rel301m-quiz-study-app/reports/worktree-baseline-2026-07-25.json'
```

The deploy job therefore exits at `Verify source and application`; it never
builds, uploads, or deploys `out/`.

Required fix: separate application CI from the controller's local worktree
boundary gate. For example, remove `verify:boundary` from the command used by
the standalone workflow while retaining it as a parent-repository release
check. Alternatively, redesign the boundary check around files committed
inside the standalone repository. Re-run the workflow from a clean standalone
checkout after the change.

### MEDIUM — an existing waiting worker is never offered for activation

`src/components/service-worker-registration.tsx:19-31` listens only for a future
`updatefound` event. It does not inspect `registration.waiting` when
`register()` resolves.

If an updated worker was already installed and waiting—for example, another
controlled tab kept the old worker alive, or the user reloaded after declining
the first prompt—the component mounts with `updateReady === false`.
`updatefound` is not replayed for that existing worker, so the reload button is
not shown and no `SKIP_WAITING` message is sent. The cache-first old worker can
continue serving the prior app/question generation until all controlled tabs
close.

Required fix: immediately surface `registration.waiting` after registration,
then retain the current `updatefound` handling for new installs. Add an A→B
browser regression where B is already waiting before the page component
mounts/reloads.

## Verified Pages behavior

### Base path and export

- `next.config.ts:5-26` validates the path, exports statically, applies
  `basePath`, preserves trailing directory URLs, and ties the Next build ID to
  the service-worker cache generation.
- `package.json:15` builds Pages with
  `NEXT_PUBLIC_BASE_PATH=/rel301m`.
- The generated HTML references `/rel301m/_next/...`; route links, manifest
  link, and icons remain under `/rel301m`.
- Generated manifest values are:

```json
{
  "start_url": "/rel301m/",
  "scope": "/rel301m/",
  "icons": [
    "/rel301m/icons/icon-192.svg",
    "/rel301m/icons/icon-512.svg"
  ]
}
```

### Service-worker scope, navigation, and offline behavior

- Registration uses `/rel301m/sw.js` with scope `/rel301m/`.
- `public/sw.js:2-14` derives the base path from the actual registration scope
  and precaches all seven route shells, the manifest, and both icons.
- `public/sw.js:20-39` discovers and precaches same-origin
  `/rel301m/_next/` assets from route HTML.
- `public/sw.js:71-86` ignores query parameters for navigation cache lookup,
  allowing a cold offline
  `/rel301m/library/?q=Q004&id=Q004` navigation to reuse the cached Library
  shell while client state consumes the query.
- Activation removes only obsolete `rel301m-study-*` generations and leaves
  unrelated origin caches untouched.

The focused Playwright suite passed:

```text
2 passed
✓ navigation, assets, and manifest stay under /rel301m
✓ cold Q004 query deep link and every study route work offline
```

### Lint repeatability

`eslint.config.mjs:8-16` ignores both generated export output and the Pages
smoke staging directory. `npm run lint` passed before the Pages build and
passed again after `.pages-smoke/rel301m` had been generated by Playwright.

### Workflow and security review

Apart from the boundary-gate blocker, the workflow has the expected Pages
shape: locked install, verification before build, prefixed build, focused
browser smoke test, `.nojekyll`, artifact upload, environment-bound deploy,
concurrency cancellation, and only `main`/manual triggers. No pull-request or
fork-controlled trigger reaches the `pages:write` and OIDC permissions.

Non-blocking hardening: grant each job only the action-documented permissions
it needs and pin action revisions to immutable commit SHAs if the repository's
supply-chain policy requires it. The current official major-version action
references are not the cause of this audit failure.

## Fresh verification

| Check | Result |
|---|---|
| Review target | PASS — exact requested commit extracted with `git archive` |
| `npm run lint` before build | PASS |
| `npm run build:github-pages` | PASS — 10 static pages, 317 questions |
| Pages Playwright smoke suite | PASS — 2/2 |
| `npm run lint` after smoke staging | PASS |
| Generated manifest `/rel301m` paths | PASS |
| `.next/BUILD_ID` equals service-worker cache name | PASS |
| `node --check public/sw.js` | PASS |
| Standalone `verify:boundary` reproduction | FAIL — deterministic `ENOENT` |

## Deployment assumptions

- The GitHub repository must contain the contents of `study-app/` at its root,
  not the outer course repository with `study-app/` as a subdirectory.
- The repository name must remain `rel301m` unless the base-path build command
  and the hard-coded Pages smoke prefix are updated together.
- GitHub Pages must use **GitHub Actions** as documented.
- A real production-URL smoke test remains necessary after the workflow
  blocker is fixed and the first deployment completes.

## Unresolved questions

None. The deployment failure follows directly from the documented standalone
layout and was reproduced from the exact reviewed commit.

Status: DONE_WITH_CONCERNS  
Summary: FAIL; `/rel301m` build, manifest, offline routes, cold query deep link,
and repeatable lint pass, but standalone GitHub Actions deployment is
deterministically blocked by the parent-only boundary gate.  
Concerns/Blockers: HIGH workflow blocker; MEDIUM pre-existing waiting-worker
activation gap.
