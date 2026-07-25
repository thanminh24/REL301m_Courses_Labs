# Phase 02 — Shell, design system and routing

## Goal

Create responsive application structure and shared trustworthy answer UI.

## Files

- `study-app/src/app/{layout,page,loading,error,not-found}.tsx`
- `study-app/src/app/{library,flashcards,match,learn,test,progress}/page.tsx`
- `study-app/src/app/library/[questionId]/page.tsx`
- `study-app/src/app/flashcards/[questionId]/page.tsx`
- `study-app/src/styles/{tokens,globals,utilities}.css`
- `study-app/src/components/layout/{app-shell,mode-navigation,study-header}.tsx`
- `study-app/src/components/question/{question-card,option-list,answer-comparison}.tsx`
- `study-app/src/components/question/{verdict-badge,evidence-badge,evidence-panel}.tsx`
- `study-app/src/components/common/{button,dialog,empty-state,error-state,progress-ring}.tsx`
- `study-app/src/components/common/{keyboard-help,toast,skip-link}.tsx`
- `study-app/src/components/pwa/{service-worker-register,offline-status,update-prompt}.tsx`
- `study-app/src/app/manifest.ts`, `study-app/public/sw.js`
- component tests beside components or under `tests/components/`

## Implementation

1. Implement RL Study Lab palette/type/spacing tokens from UX concept; use local
   or system fonts so offline operation does not depend on a CDN.
2. Desktop tabs and five-item mobile bottom navigation. Preserve route/query
   state; support deep links to question IDs.
3. Shared answer comparison renders:
   - one verified answer when bank and concept agree;
   - bank answer + Nuance for caveat;
   - simultaneous exam and conceptual rows for contradiction;
   - “Memorize for exam; not reference-verified” for bank-only.
4. Add semantic landmarks, one `h1`, visible focus, real radio/button controls,
   polite live regions and feedback focus management.
5. Make dialogs focus-trapped and escapable; shortcuts are discoverable and
   suppressed in editable controls.
6. Provide skeleton, data failure/retry, no-results and not-found recovery.
7. Register a versioned service worker keyed by compiled data hash. Precache the
   application shell, generated bank and all main routes; show online/offline
   and update-ready states. Activate a new cache atomically and remove old
   versions only after the new worker controls the page.

## Validation

- Snapshot/semantic tests for all four verdict presentations.
- Q002/Q004/Q188 component regressions.
- Keyboard navigation and dialog focus tests.
- 320/375/768/1280 px visual checks; 200% zoom no content loss or page overflow.
- `prefers-reduced-motion` removes flip/transition movement.
- Text/icon accompanies every evidence/verdict color; automated contrast check.
- After one successful online load, Dashboard, Library, Flashcards, Match,
  Learn, Test and Progress reload offline; a first-ever offline visit shows an
  actionable connection state rather than a broken shell.

## Risk / rollback

Risk: duplicated per-mode answer UI diverges. Require all modes to use
`AnswerComparison`. Roll back visual tokens/components without changing data.

## Exit

All routes render stable responsive shells and shared content contracts.

## Unresolved questions

None.
