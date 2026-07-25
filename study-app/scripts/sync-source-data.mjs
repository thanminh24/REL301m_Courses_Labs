import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(appRoot, "..");
const authorityRoot = resolve(
  repositoryRoot,
  "plans/260724-0949-rel301m-learning-materials/research",
);
const destinationRoot = resolve(appRoot, "src/data/source");
const files = [
  "question-records.json",
  "question-adjudications.json",
  "primary-evidence-map.json",
  "supplemental-evidence-map.json",
];

mkdirSync(destinationRoot, { recursive: true });
const hashes = {};

for (const file of files) {
  const source = resolve(authorityRoot, file);
  const destination = resolve(destinationRoot, file);
  copyFileSync(source, destination);
  hashes[file] = createHash("sha256")
    .update(readFileSync(destination))
    .digest("hex");
}

writeFileSync(
  resolve(destinationRoot, "source-hashes.json"),
  `${JSON.stringify(hashes, null, 2)}\n`,
);
console.log(`Synced ${files.length} authority snapshots.`);
