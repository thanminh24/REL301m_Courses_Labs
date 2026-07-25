# Course 3 question-to-evidence map

> Slide-grounded authoring map. Duplicate placement means a question tests a bridge between
> lectures. For final one-primary mapping, the first answer-bearing placement is used by
> `primary-evidence-map.json`; later appearances remain related practice.

| Lecture | Primary concept | Slide evidence | Depth | Question IDs | Confidence / caution |
|---|---|---|---|---|---|
| 3.1 | parameterized/linear values; generalization | 3–12, 18–22 | D3 | Q008, Q076, Q098, Q104, Q223, Q255, Q296 | High; Q104/Q255 are not universally true without feature assumptions |
| 3.2 | MSVE; gradient descent; state weighting/aggregation | 3–8, 15–20 | D3 | Q024, Q034, Q079, Q130, Q143, Q153, Q159, Q175, Q179, Q207, Q209, Q251, Q291, Q300 | High; interpret \(\mu\) as state weighting |
| 3.3 | TD target; semi-gradient; TD–MC contrast | 3–16 | D3 | Q131, Q260, Q297 | High |
| 3.4 | linear TD; tabular special case; fixed point | 3–13 | D2 | Q220, Q249 | High; matrix derivation intentionally excluded |
| 3.5 | coarse/tile coding and generalization | 3–21 | D3 | Q010, Q014, Q021, Q048, Q062, Q084, Q123, Q170, Q292, Q293, Q299 | High; Q048 is defective, Q014 uses misleading “clustering” |
| 3.6 | action-dependent features; approximate control targets | 3–18 | D2 | Q229, Q264 | High; Q229 has multiple plausible methods |
| 3.7 | optimism and epsilon-greedy with approximation | 3–10 | D2 | Q137, Q258, Q295 | High |
| 3.8 | average reward; differential values | 3–20 | D3 | Q003, Q019, Q047, Q063, Q298 | High; Q019/Q047 have no unique supplied option |
| 3.9 | direct parameterized policy; softmax preferences | 3–9 | D3 | Q067, Q093, Q103, Q114, Q120, Q155, Q168, Q173, Q212, Q240 | Medium-high; temperature is related softmax knowledge, not central slide notation |
| 3.10 | continuing objective; policy-gradient theorem | 3–11 | D3 | Q030, Q057, Q075, Q087, Q091, Q135, Q164, Q177, Q193, Q273 | High; Q091/Q177 lack unique universal answers |
| 3.11 | sampled gradient; baseline; actor–critic roles | 3–11 | D3 | Q016, Q029, Q055, Q066, Q121, Q177, Q192, Q225, Q226, Q239, Q241, Q301, Q302 | High; Q226’s claimed universal advantage is unsafe |
| 3.12 | softmax actor; Gaussian policy | 3–13 | D3 | Q067, Q103, Q114, Q168, Q201, Q203, Q235, Q294, Q301, Q302 | High; Q203 may conflate temperature with learned preference/variance |

## Coverage reconciliation

- C3-tagged records in source index: **83**.
- Unique IDs named above: **83**.
- Every C3 item has an answer-enabling passage in the Course 3 fragment.
- Review/verify items stay flagged; the supplied answer is not treated as authority.
- No code trace, full derivation, debugging, or external source is required.

## Unresolved questions

- Legacy introduction/review `.ppt` decks need only framing coverage; no C3 answer depends on
  text unique to them.
- Softmax temperature items Q103/Q114 and parameter item Q203 need final verdict wording because
  the local decks emphasize preferences and Gaussian spread more than a universal temperature
  parameter.
