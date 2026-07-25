# Tester — Full 317 Canon

Status: PASS

## Result

- Q001–Q317: 317 records, 317 headings, 317 unique anchors, exact order, each once.
- Canon: 317 canonical, 0 excluded.
- Evidence tiers: 225 local-slide, 54 Sutton–Barto book, 0 direct Coursera-public, 38
  question-bank-only. Total reconciles to 317.
- Editorial outcomes: 149 correct, 98 acceptable-with-caveat, 32 incorrect, 38 bank-key-only.
- All 317 original stems, four options, module tags, supplied answers, verdicts, and rationales
  match the structured records.
- All 38 bank-only blocks carry the canonical question-bank label and evidence warning. No
  quarantine, exclusion, or unusable label remains.
- All primary and related lecture mappings resolve to existing decks and valid slide bounds.
- All 54 book-backed records have the correct local-PDF title/path, a nonempty chapter/section
  label, sorted unique printed pages, and exact guide labels. All 84 distinct cited printed pages
  resolve using the documented `printed page + 22` PDF-page rule.
- Guide contains only the three approved official public Coursera course URLs. No question claims
  direct Coursera-public answer evidence.
- Updated validator passes:
  `317 questions; 317 canonical; 0 excluded; 225 slide-backed; 54 book-backed; 0
  Coursera-public; 38 bank-only; 39 lecture/framing anchors`.
- Two isolated full builds produce identical guide, primary-map, and adjudication hashes.
- Standard `git diff --check` passes. Generated Markdown uses intentional CommonMark two-space
  hard breaks; no normalization requested.

## Deterministic hashes

- Guide: `a7dda59d0b7517c0e3de412949517bb846910d3493a0f91b4816fd17a0a38bdc`
- Primary map: `d521a7ab841a577b9ea7bf76260c497ecb23988182d4e7b9d097b1d891f8b276`
- Adjudications: `5c6446143cc64e6b7aa66ae9f64c13f470ab7421ad3a9bb1c101f59c8f88f2e7`

## Unresolved questions

- Exact exam grading behavior for defective supplied keys remains unknown; the guide preserves
  each supplied key and exposes the strongest reference-grounded correction separately.
