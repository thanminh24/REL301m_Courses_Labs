# Plan review — 2026-07-25

## Result

PASS after revision. Plan feasible, scoped, testable.

## Coverage audit

- 317 canonical questions: explicit deterministic compiler and full-bank gate.
- Deep/easy solution: adjudication explanation + conceptual answer + evidence
  required per record; shared presentation enforced across modes.
- Product: Dashboard, Library, Cards, adaptive Learn, configurable Test,
  Progress all have owned phases and tests.
- Quiz interactions: search/filter/favorite/shuffle, keyboard/touch, resume,
  ratings, adaptive queue, test configuration/review covered.
- Truth contract: bank score and conceptual understanding separated; Q002,
  Q004, Q188 mandatory regressions.
- Persistence: versioned local state, migration, export/import, save recovery,
  scoped resets covered.
- Quality: data/unit/component/E2E/a11y/responsive/failure/build gates covered.
- Production: OpenNext/Sites source push, version save, deploy and smoke phase.
- Offline: manifest, versioned service worker, route/data precache, update and
  offline E2E.
- Content quality: 317-row QA manifest, plain explanations, takeaways, A–D
  rationales and independent sign-off.
- Parity boundary: core study experience includes Flashcards, Match, Learn,
  Test, Library and Progress; social/commercial features explicitly excluded.
- Worktree safety: baseline every dirty path before scaffold and compare at
  release, with no destructive Git operations.
- Safety: `study-app/` isolation, existing learning guide/data read-only,
  `Group Assignment/**` preserved.
- Exclusions: accounts/classrooms/sharing/payments/user sets/audio/multiplayer.

## Feasibility corrections made

- “All Quizlet functions” bounded to user-named study functions and listed app
  capabilities; social/commercial features explicitly excluded.
- True/false and written generation prohibited from inventing claims.
- Conceptual free-text cannot be reliably auto-graded for every item, so the
  plan requires explicit manual review when aliases cannot prove correctness.
- Final evidence uses `primary-evidence-map.json`, not provisional record maps.
- Deterministic output omits volatile generation data and captures source hashes.
- Deployment waits for full production verification and deploys saved versions.

## Sequencing review

Foundation/data precedes all UI. Shared answer component precedes study modes.
Persistence/progress precedes adaptive behavior. Mode implementation can run in
parallel only after shared contracts stabilize and with distinct ownership.
Hardening precedes deployment. No circular dependency found.

## Unresolved questions

None.
