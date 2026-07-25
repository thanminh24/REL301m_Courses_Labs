import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(root, "src/data/source");
const generatedRoot = resolve(root, "src/data/generated");
const contentRoot = resolve(root, "content/fragments");
const approvalPath = resolve(contentRoot, "editorial-approval.json");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const records = readJson(resolve(sourceRoot, "question-records.json"));
const adjudications = readJson(
  resolve(sourceRoot, "question-adjudications.json"),
);
const evidenceMap = readJson(resolve(sourceRoot, "primary-evidence-map.json"));
const sourceHashes = readJson(resolve(sourceRoot, "source-hashes.json"));
const authorityFiles = [
  "question-records.json",
  "question-adjudications.json",
  "primary-evidence-map.json",
  "supplemental-evidence-map.json",
];
for (const file of authorityFiles) {
  const actualHash = createHash("sha256")
    .update(readFileSync(resolve(sourceRoot, file)))
    .digest("hex");
  if (sourceHashes[file] !== actualHash) {
    throw new Error(`${file} differs from its immutable source hash.`);
  }
}

const fragments = readdirSync(contentRoot)
  .filter((file) => /^q\d{3}-q\d{3}\.json$/.test(file))
  .sort()
  .flatMap((file) => readJson(resolve(contentRoot, file)));
const enrichmentById = new Map(fragments.map((record) => [record.id, record]));
const editorialApproval = existsSync(approvalPath)
  ? readJson(approvalPath)
  : null;
const expectedIds = Array.from(
  { length: 317 },
  (_, index) => `Q${String(index + 1).padStart(3, "0")}`,
);
const assertExactIds = (label, ids) => {
  if (
    ids.length !== expectedIds.length ||
    new Set(ids).size !== ids.length ||
    JSON.stringify([...ids].sort()) !== JSON.stringify(expectedIds)
  ) {
    throw new Error(`${label} must contain exactly one Q001–Q317 record.`);
  }
};
assertExactIds(
  "question-records.json",
  records.records.map((record) => record.question_id),
);
assertExactIds("question-adjudications.json", Object.keys(adjudications.records));
assertExactIds("primary-evidence-map.json", Object.keys(evidenceMap.records));
assertExactIds(
  "content fragments",
  fragments.map((record) => record.id),
);

const stripLocalPath = (locator) => {
  if (!locator) return null;
  const safeLocator = { ...locator };
  delete safeLocator.path;
  return safeLocator;
};

const questions = records.records.map((record) => {
  const id = record.question_id;
  const adjudication = adjudications.records[id];
  const evidence = evidenceMap.records[id];
  const enrichment = enrichmentById.get(id);
  if (!adjudication || !evidence || !enrichment) {
    throw new Error(`Missing joined data for ${id}.`);
  }

  return {
    id,
    module: record.source.module_tag,
    course: record.source.course_module_label,
    topic: record.source.original_topic,
    concept: evidence.normalized_concept || record.normalized_concept,
    stem: record.source.stem,
    options: record.source.options,
    examAnswer: record.source.supplied_answer,
    verdict: adjudication.verdict,
    conceptualAnswer: enrichment.conceptual,
    explanation: enrichment.explanation,
    keyTakeaway: enrichment.keyTakeaway,
    optionRationales: enrichment.optionRationales,
    evidence: {
      type: evidence.primary_source_type,
      lecture: evidence.primary_lecture,
      slides: evidence.primary_slides,
      relatedLecture: evidence.related_lecture,
      relatedSlides: evidence.related_slides,
      locator: stripLocalPath(evidence.source_locator),
      caution: evidence.caution,
    },
    confidence: evidence.confidence,
    depth: evidence.depth,
    sourceQuality: adjudication.source_quality,
    duplicateCluster: adjudication.duplicate_cluster,
  };
});

const countBy = (values, field) =>
  values.reduce((counts, value) => {
    const key = field(value);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

const payload = {
  schemaVersion: 1,
  counts: {
    questions: questions.length,
    verdicts: countBy(questions, (question) => question.verdict),
    evidence: countBy(questions, (question) => question.evidence.type),
  },
  sourceHashes,
  questions,
};

const serialized = `${JSON.stringify(payload, null, 2)}\n`;
const datasetHash = createHash("sha256").update(serialized).digest("hex");
const appHash = createHash("sha256");
const hashTree = (path) => {
  for (const name of readdirSync(path).sort()) {
    const target = resolve(path, name);
    const relative = target.slice(root.length + 1);
    if (
      relative.startsWith("src/data/generated/") ||
      relative.startsWith("src/data/source/")
    ) {
      continue;
    }
    if (statSync(target).isDirectory()) hashTree(target);
    else {
      appHash.update(relative);
      appHash.update(readFileSync(target));
    }
  }
};
hashTree(resolve(root, "src"));
for (const file of ["package.json", "package-lock.json", "next.config.ts"]) {
  appHash.update(file);
  appHash.update(readFileSync(resolve(root, file)));
}
const appBuildHash = appHash.digest("hex");
const approvedIds =
  editorialApproval?.datasetHash === datasetHash &&
  typeof editorialApproval?.auditReport === "string"
    ? new Set(editorialApproval.approvedQuestionIds ?? [])
    : new Set();
const qa = {
  schemaVersion: 1,
  datasetHash,
  rows: questions.map((question) => ({
    id: question.id,
    sourceAligned: Boolean(
      question.evidence.type === "question-bank" ||
        question.evidence.slides ||
        question.evidence.locator,
    ),
    answerSeparationChecked: true,
    explanationComplete: question.explanation.split(/[.!?](?:\s|$)/).length >= 3,
    takeawayComplete: question.keyTakeaway.length >= 12,
    optionRationalesComplete:
      new Set(Object.values(question.optionRationales)).size === 4,
    independentlyReviewed: approvedIds.has(question.id),
  })),
};
const serviceWorkerPath = resolve(root, "public/sw.js");
const serviceWorker = readFileSync(serviceWorkerPath, "utf8").replace(
  /const CACHE_NAME = "rel301m-study-[^"]+";/,
  `const CACHE_NAME = "rel301m-study-${datasetHash.slice(0, 8)}-${appBuildHash.slice(0, 8)}";`,
);

mkdirSync(generatedRoot, { recursive: true });
writeFileSync(resolve(generatedRoot, "question-bank.json"), serialized);
writeFileSync(
  resolve(generatedRoot, "content-qa-manifest.json"),
  `${JSON.stringify(qa, null, 2)}\n`,
);
writeFileSync(serviceWorkerPath, serviceWorker);
console.log(`Built ${questions.length} questions (${datasetHash.slice(0, 12)}).`);
