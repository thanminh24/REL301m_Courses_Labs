import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const bankRaw = readFileSync(
  resolve(root, "src/data/generated/question-bank.json"),
  "utf8",
);
const bank = JSON.parse(bankRaw);
const qa = JSON.parse(
  readFileSync(
    resolve(root, "src/data/generated/content-qa-manifest.json"),
    "utf8",
  ),
);
const errors = [];
const allowUnreviewed = process.argv.includes("--allow-unreviewed");
const actualDatasetHash = createHash("sha256").update(bankRaw).digest("hex");
if (qa.datasetHash !== actualDatasetHash) {
  errors.push("QA manifest dataset hash does not match the generated bank.");
}
const bannedEditorialPatterns = [
  /^this item tests\b/im,
  /does not precisely express the reference-backed conclusion/i,
  /conflicts with the relevant distinction/i,
  /directly fits the source-backed mechanism summarized here/i,
  /in plain terms, the correct choice captures/i,
  /in plain language, the deciding idea is/i,
  /this wording matters because the learner must distinguish/i,
  /describes a different claim and does not answer/i,
  /for this stem, .+ is decided by/i,
  /would teach the wrong mechanism or level of description/i,
  /would treat the literal statement .+ as the causal criterion/i,
  /taken literally, .+ assigns the wrong role or criterion/i,
  / is governed by [“"]/i,
  /use the mechanism in that phrase, not the nearby distractor/i,
  /applied to this question/i,
  /this option selects/i,
  /it fails in this context because/i,
  /it fits because/i,
  /that mechanism does not yield/i,
  /it therefore answers a neighboring concept rather than/i,
  /the deciding relation here is/i,
  /in contrast, the supported relation is/i,
  /leaves unexplained the .+ relationship the question is testing/i,
  /matches the accepted relationship/i,
  /this names a different method, quantity, or condition/i,
  /under this definition, .+ is the operational consequence/i,
  /by comparison, [“"]/i,
  /a useful contrast is/i,
  /in this case, .+ however, /i,
];
const normalizeAnswer = (value) =>
  value
    .toLocaleLowerCase()
    .replace(/^remember\s*:\s*/i, "")
    .replace(/^[a-d]\s*[—:.-]\s*/i, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
const expectedIds = Array.from(
  { length: 317 },
  (_, index) => `Q${String(index + 1).padStart(3, "0")}`,
);
const actualIds = bank.questions.map((question) => question.id);

if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
  errors.push("Question IDs must be exactly Q001…Q317 in order.");
}
if (new Set(actualIds).size !== 317) errors.push("Question IDs are not unique.");
if (qa.rows.length !== 317) errors.push("QA manifest must contain 317 rows.");

const expectedVerdicts = {
  correct: 149,
  "acceptable-with-caveat": 99,
  incorrect: 31,
  "bank-key-only": 38,
};
const expectedEvidence = { lecture: 225, book: 54, "question-bank": 38 };

if (
  Object.entries(expectedVerdicts).some(
    ([key, count]) => bank.counts.verdicts[key] !== count,
  )
) {
  errors.push(`Verdict totals differ: ${JSON.stringify(bank.counts.verdicts)}`);
}
if (
  Object.entries(expectedEvidence).some(
    ([key, count]) => bank.counts.evidence[key] !== count,
  )
) {
  errors.push(`Evidence totals differ: ${JSON.stringify(bank.counts.evidence)}`);
}

for (const question of bank.questions) {
  const optionKeys = Object.keys(question.options);
  if (JSON.stringify(optionKeys) !== '["A","B","C","D"]') {
    errors.push(`${question.id}: options are not exactly A–D.`);
  }
  if (!optionKeys.includes(question.examAnswer.letter)) {
    errors.push(`${question.id}: supplied exam key is invalid.`);
  }
  const teachingSentences = question.explanation
    .split(/[.!?](?:\s|$)/)
    .filter((sentence) => sentence.trim().split(/\s+/).length >= 6);
  if (teachingSentences.length < 2) {
    errors.push(`${question.id}: needs two substantive teaching sentences.`);
  }
  if (
    bannedEditorialPatterns.some((pattern) =>
      pattern.test(
        [
          question.explanation,
          question.keyTakeaway,
          ...Object.values(question.optionRationales),
        ].join(" "),
      ),
    )
  ) {
    errors.push(`${question.id}: contains a banned generic editorial template.`);
  }
  const learnerText = [
    question.explanation,
    question.keyTakeaway,
    ...Object.values(question.optionRationales),
  ].join(" ");
  if (
    (learnerText.match(/“/g)?.length ?? 0) !==
    (learnerText.match(/”/g)?.length ?? 0)
  ) {
    errors.push(`${question.id}: learner text has unmatched smart quotes.`);
  }
  if (
    normalizeAnswer(question.keyTakeaway) ===
    normalizeAnswer(question.examAnswer.text)
  ) {
    errors.push(`${question.id}: takeaway merely repeats the supplied answer.`);
  }
  if (/^memory rule for /i.test(question.keyTakeaway)) {
    errors.push(`${question.id}: takeaway uses a generated memory-rule label.`);
  }
  if (question.keyTakeaway.trim().split(/\s+/).length < 6) {
    errors.push(`${question.id}: takeaway needs a memorable rule or contrast.`);
  }
  const rationales = Object.values(question.optionRationales);
  if (rationales.some((value) => value.trim().split(/\s+/).length < 10)) {
    errors.push(`${question.id}: an option rationale is too shallow.`);
  }
  if (new Set(rationales).size !== 4) {
    errors.push(`${question.id}: option rationales are not distinct.`);
  }
  const rationaleSentences = rationales.flatMap((value) =>
    value
      .split(/[.!?](?:\s|$)/)
      .map((sentence) =>
        sentence
          .toLocaleLowerCase()
          .replace(/[^\p{L}\p{N}]+/gu, " ")
          .trim(),
      )
      .filter((sentence) => sentence.split(/\s+/).length >= 6),
  );
  if (new Set(rationaleSentences).size !== rationaleSentences.length) {
    errors.push(
      `${question.id}: option rationales reuse a substantive sentence.`,
    );
  }
  for (const [label, value] of [
    ["explanation", question.explanation],
    ...Object.entries(question.optionRationales).map(([letter, rationale]) => [
      `option ${letter} rationale`,
      rationale,
    ]),
  ]) {
    const sentences = value
      .split(/[.!?](?:\s|$)/)
      .map((sentence) =>
        sentence
          .toLocaleLowerCase()
          .replace(/[^\p{L}\p{N}]+/gu, " ")
          .trim(),
      )
      .filter((sentence) => sentence.split(/\s+/).length >= 6);
    if (new Set(sentences).size !== sentences.length) {
      errors.push(`${question.id}: ${label} repeats a substantive sentence.`);
    }
  }
  if (
    question.verdict === "bank-key-only" &&
    !/bank|ngân hàng|reference|verified|verify|xác minh/i.test(
      question.explanation,
    )
  ) {
    errors.push(`${question.id}: bank-only uncertainty is not disclosed.`);
  }
}

const byId = Object.fromEntries(
  bank.questions.map((question) => [question.id, question]),
);
const semanticRegressionChecks = {
  Q220: /one[- ]hot|unit vector|individual table entr/i,
  Q235: /gaussian|sampling|noise|standard deviation|variance/i,
  Q239: /baseline|advantage|variance/i,
  Q240: /local opt/i,
  Q242: /table|separate.*entr|bootstrap.*target/i,
  Q249: /gradient.*feature|feature vector.*gradient/i,
  Q251: /state[- ]visitation|distribution.*state|weighting.*state/i,
  Q258: /optimistic|initial.*explor/i,
  Q259: /policy.*generat|episode.*policy|actions.*policy/i,
  Q260: /semi[- ]gradient|target.*constant|ignore.*target/i,
  Q262: /greed|argmax|highest.*value/i,
  Q266: /epsilon|ε|explor/i,
  Q269: /probability distribution|distribution.*outcome/i,
  Q271: /transition.*probab|p\s*\(\s*s|next[- ]state.*probab/i,
  Q273: /continuous action|parameterized distribution/i,
  Q279: /coverage|state.action|explor/i,
  Q286: /learning rate|step size|alpha|α/i,
  Q293: /tile|tiling|number.*size/i,
  Q294: /gaussian|q[- ]learning|policy parameter/i,
  Q303: /solution method|dynamic programming|monte carlo|temporal difference/i,
};
for (const [id, pattern] of Object.entries(semanticRegressionChecks)) {
  const teaching = `${byId[id].explanation} ${byId[id].keyTakeaway}`;
  if (!pattern.test(teaching)) {
    errors.push(`${id}: teaching text misses the question-specific concept.`);
  }
}

const explanationGroups = new Map();
for (const question of bank.questions) {
  const normalized = question.explanation
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const group = explanationGroups.get(normalized) ?? [];
  group.push(question);
  explanationGroups.set(normalized, group);
}
for (const group of explanationGroups.values()) {
  if (group.length < 2) continue;
  const cluster = group[0].duplicateCluster;
  const isCanonicalDuplicate =
    Boolean(cluster) &&
    group.every((question) => question.duplicateCluster === cluster);
  if (!isCanonicalDuplicate) {
    errors.push(
      `${group.map((question) => question.id).join(", ")}: exact explanation reused across non-duplicate questions.`,
    );
  }
}
if (byId.Q002.conceptualAnswer.acceptedLetters.length !== 0) {
  errors.push("Q002 must not accept a supplied option conceptually.");
}
if (
  JSON.stringify(byId.Q188.conceptualAnswer.acceptedLetters) !==
  JSON.stringify(["A", "B"])
) {
  errors.push("Q188 conceptual answer must accept both A and B.");
}
if (
  JSON.stringify(byId.Q224.conceptualAnswer.acceptedLetters) !==
  JSON.stringify(["B", "C"])
) {
  errors.push("Q224 conceptual answer must accept both B and C.");
}

for (const row of qa.rows) {
  const failedGates = Object.entries(row)
    .filter(
      ([key, value]) =>
        value === false && !(allowUnreviewed && key === "independentlyReviewed"),
    )
    .map(([key]) => key);
  if (failedGates.length) {
    errors.push(`${row.id}: content QA failed: ${failedGates.join(", ")}.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Validated 317 canonical questions and all content QA gates.");
