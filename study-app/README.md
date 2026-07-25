# REL301m Study Studio

Quizlet-style, offline-ready study website for all 317 canonical REL301m exam
questions.

## Study modes

- Question Bank: searchable/filterable library with all A–D choices.
- Flashcards: flip, shuffle, favorite, and mark mastery.
- Match: timed six-pair exam-recall rounds.
- Adaptive Learn: prioritizes weak questions and explains every choice.
- Practice Test: configurable course, length, and timer with separate bank and
  conceptual scores.
- Progress: local mastery, accuracy, weak-topic view, daily goal, and JSON
  backup/restore.

The app never silently replaces the school question bank. Every record stores
the supplied exam answer separately from the evidence-backed conceptual answer.
Items without answer-bearing reference support are visibly labeled bank-only.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run verify
npm run build:github-pages
npm run test:github-pages
```

`data:check` validates contiguous Q001–Q317 IDs, source/verdict totals, known
answer anomalies, 317 content-QA rows, substantive explanations, meaningful
takeaways, and distinct option rationales. Playwright runs the critical flows
on desktop Chromium, mobile Chromium, and Firefox, including axe, actual 200%
zoom, production-service-worker, and `/rel301m` base-path checks.
`verify` additionally checks the parent course worktree boundary. GitHub Actions
runs `verify:standalone` because the historical dirty-worktree baseline is a
local development safeguard rather than a clean-checkout release gate.

## Deploy to GitHub Pages

The source lives under `study-app/` in
`thanminh24/REL301m_Courses_Labs`. The repository workflow at
`../.github/workflows/deploy-rel301m.yml` verifies the complete application,
builds with `NEXT_PUBLIC_BASE_PATH=/rel301m`, smoke-tests navigation and offline
deep links, and replaces only the `rel301m/` directory in the existing
`thanminh24/thanminh24.github.io` portfolio repository. It then waits for the
exact source SHA and repeats the browser smoke test against:

`https://thanminh24.github.io/rel301m/`

The source repository must define an Actions secret named
`PAGES_REPOSITORY_TOKEN` with write access to
`thanminh24/thanminh24.github.io`. The workflow can also be started manually
with **Run workflow**. Do not publish the root-path `npm run build` output;
GitHub Pages requires the prefixed `npm run build:github-pages` artifact.

## Data provenance

Immutable authority snapshots live in `src/data/source/`. Run
`npm run data:sync` only from the parent course repository when those
authoritative research files intentionally change, then run
`npm run data:build`. The generated runtime bank strips local filesystem paths.

Progress stays in browser `localStorage`; there are no accounts, analytics,
server sync, or third-party trackers.
