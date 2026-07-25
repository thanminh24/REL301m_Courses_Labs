# Phase 03 — Library, Dashboard, progress and persistence

## Goal

Make all 317 questions discoverable and provide reliable local user state.

## Files

- `study-app/src/domain/progress/{types,reducer,scheduler,mastery}.ts`
- `study-app/src/domain/sessions/{types,stable-shuffle,session-reducer}.ts`
- `study-app/src/lib/storage/{adapter,schema,migrations,export-import}.ts`
- `study-app/src/lib/storage/use-persisted-store.ts`
- `study-app/src/features/library/{question-library,filters,question-detail}.tsx`
- `study-app/src/features/dashboard/{dashboard,continue-panel,needs-attention}.tsx`
- `study-app/src/features/progress/{progress-page,topic-summary,session-history}.tsx`
- `study-app/src/features/settings/{data-controls,reset-dialog}.tsx`
- `study-app/tests/{unit,components}/...`

## State contract

Persist schema version, favorites, per-question state/attempts/ratings/due time,
last result, stable mode sessions, filters, current index, test responses and
session summaries. Do not persist canonical question content in user state.

## Implementation

1. Build storage adapter with SSR-safe hydration, in-memory fallback, debounced
   atomic writes, failure banner/retry and migrations.
2. Export UTF-8 JSON with version, app data hash and checksum. Import validates
   schema, QIDs, enum/range limits and size before preview/confirmation; reject
   unknown or corrupt payload without partial mutation.
3. Separate confirmed `Reset progress` from `Reset this session`.
4. Implement progress transitions and simple scheduler from UX spec. Mastery
   requires successful recall in two separate sessions; flipping never counts.
5. Library searches ID/stem/options/topic/explanation and filters course/module,
   topic, mastery, verdict, evidence and favorite. Add numeric/weakest/recently
   missed sorts; preserve query on detail/back.
6. Dashboard: resume, total/mastery metrics, course mastery, weaknesses, evidence
   snapshot and recent sessions. Progress: topic/course summaries, difficult/
   missed items and history.

## Validation

- Reducer/scheduler tests include time injection and deterministic outcomes.
- Storage round-trip, migration, quota/save failure, malformed import, wrong data
  hash, duplicate QIDs and reset-scope tests.
- Search finds every question by exact QID and known content; combined filters
  never mutate source dataset.
- Reload restores dashboard/library state without flashing false `0/317`.
- Empty first-run, returning, no-results and completed-all states recover.

## Risk / rollback

Risk: schema change destroys progress. Never overwrite until migration succeeds;
keep prior serialized value and offer export. A storage version bump is the
rollback boundary.

## Exit

Every question is searchable/reachable and progress survives reload/export/import.

## Unresolved questions

None.
