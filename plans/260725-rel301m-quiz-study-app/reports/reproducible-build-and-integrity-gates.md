# Reproducible Build and Integrity Gates

Date: 2026-07-25

## Clean-room builds

The final standalone release commit
`d762ca123bca041c88a57c59b7e70283d0b43bd2` was built in the release
worktree and independently exported with `git archive` into a source-clean
copy without `.next`, `out`, test results, reports, or Git metadata:

- `/home/than-minh/project/REL301m_Courses_Labs/study-app`
- `/tmp/rel301m-repro-final.XNozqv` (removed after comparison)

Each copy completed:

1. `npm ci`
2. `npm run build:github-pages`
3. canonical compilation of exactly 317 questions
4. strict content validation
5. Next.js static export of all application routes under `/rel301m`

`diff -qr` reported no difference between the two `out/` directories.
Both relative-path export manifests produced:

```text
b951e2956f5ea9ced955ef0550039857283c7e123a1802b20216793df9e62092
```

Next's build ID is derived from the service-worker cache identity. That identity
already includes the full dataset hash and application-source hash. Identical
source is deterministic; changed content or application code receives a new ID.

## Fail-closed canonical source test

A third isolated copy changed only the immutable source field
`question-records.json.generated` from `2026-07-24` to `2099-01-01`.

Running `node scripts/build-question-bank.mjs` exited `1` before generating data:

```text
Error: question-records.json differs from its immutable source hash.
```

The canonical compiler therefore fails closed when an authoritative input differs
from its recorded hash.

## Result

PASS. The exact `/rel301m` deployment artifact is byte-for-byte reproducible
from clean installs, and altered canonical authority cannot silently enter the
generated 317-question dataset.

Unresolved questions: none.
