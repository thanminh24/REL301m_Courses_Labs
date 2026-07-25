import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(appRoot, "..");
const baselinePath = resolve(
  repositoryRoot,
  "plans/260725-rel301m-quiz-study-app/reports/worktree-baseline-2026-07-25.json",
);
const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));

const isAllowed = (path) =>
  baseline.allowedTaskPaths.some((allowed) =>
    allowed.endsWith("/") ? path.startsWith(allowed) : path === allowed,
  );

const inspect = (path) => {
  const absolutePath = resolve(repositoryRoot, path);
  try {
    const details = lstatSync(absolutePath);
    if (!details.isFile()) {
      return { kind: details.isDirectory() ? "directory" : "other", sha256: null };
    }
    return {
      kind: "file",
      sha256: createHash("sha256")
        .update(readFileSync(absolutePath))
        .digest("hex"),
    };
  } catch {
    return { kind: "missing", sha256: null };
  }
};

const gitStatus = spawnSync(
  "git",
  ["status", "--porcelain=v1", "-z", "--untracked-files=all"],
  { cwd: repositoryRoot, encoding: "utf8" },
);
if (!gitStatus.stdout && gitStatus.error) throw gitStatus.error;
const currentStatus = new Map(
  gitStatus.stdout
    .split("\0")
    .filter(Boolean)
    .map((entry) => [entry.slice(3), entry.slice(0, 2)]),
);

const errors = [];
for (const entry of baseline.entries) {
  if (isAllowed(entry.path)) continue;
  const current = inspect(entry.path);
  if (current.kind !== entry.kind || current.sha256 !== entry.sha256) {
    errors.push(`${entry.path}: content changed outside task scope.`);
  }
  if (currentStatus.get(entry.path) !== entry.status) {
    errors.push(`${entry.path}: Git status changed outside task scope.`);
  }
}

for (const [path] of currentStatus) {
  if (!isAllowed(path) && !baseline.entries.some((entry) => entry.path === path)) {
    errors.push(`${path}: new dirty path outside task scope.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Boundary verified: ${baseline.entries.length} baseline paths preserved outside task scope.`,
);
