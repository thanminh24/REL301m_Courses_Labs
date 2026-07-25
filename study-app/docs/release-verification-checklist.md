# Release verification checklist

The production release is eligible only when each gate below passes against the
same generated dataset and source commit.

- Canonical compiler: ordered, lossless Q001–Q317 with expected verdict and
  evidence totals.
- Editorial audit: all explanations, takeaways, conceptual answers, and 1,268
  option rationales independently accepted.
- Static checks: ESLint and TypeScript.
- Unit checks: compiler invariants, grading, scheduling, search, storage
  contracts, and question-specific regressions.
- Browser checks: desktop and mobile flows for Library, Flashcards, Learn, Test,
  Match, Progress, persistence recovery, import rejection, and accessibility.
- Production checks: static export, first-load service-worker installation, and
  offline reload of Dashboard plus all six feature routes.
- GitHub Pages checks: `/rel301m` navigation, manifest/scope, cold query deep
  link, assets, and all seven offline routes, both before deployment and against
  the production URL returned by GitHub Pages.
- Isolation check: every pre-existing dirty path outside the app/plan boundary
  remains byte-for-byte unchanged.
- Deployment check: GitHub Pages workflow and Sites version point to the exact
  pushed commit; production smoke tests run after deployment rather than relying
  on local results.
