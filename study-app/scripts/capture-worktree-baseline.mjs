import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { lstatSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDirectory, "..");
const repositoryRoot = resolve(appRoot, "..");
const outputPath = resolve(
  repositoryRoot,
  "plans/260725-rel301m-quiz-study-app/reports/worktree-baseline-2026-07-25.json",
);

const gitStatus = spawnSync(
  "git",
  ["status", "--porcelain=v1", "-z", "--untracked-files=all"],
  { cwd: repositoryRoot, encoding: "utf8" },
);

// Some managed sandboxes attach an EPERM marker after Git has already
// completed successfully. A complete stdout payload is still authoritative.
if (!gitStatus.stdout && gitStatus.error) {
  throw gitStatus.error;
}
if (gitStatus.status !== 0 && !gitStatus.error) {
  throw new Error(gitStatus.stderr || "Unable to inspect the Git worktree.");
}

const rawStatus = gitStatus.stdout;

const entries = rawStatus
  .split("\0")
  .filter(Boolean)
  .map((entry) => {
    const status = entry.slice(0, 2);
    const path = entry.slice(3);
    const absolutePath = resolve(repositoryRoot, path);
    let kind = "missing";
    let sha256 = null;

    try {
      const details = lstatSync(absolutePath);
      if (details.isFile()) {
        kind = "file";
        sha256 = createHash("sha256")
          .update(readFileSync(absolutePath))
          .digest("hex");
      } else if (details.isDirectory()) {
        kind = "directory";
      } else {
        kind = "other";
      }
    } catch {
      // Deleted and otherwise missing paths are intentionally represented.
    }

    return { status, path, kind, sha256 };
  })
  .sort((left, right) => left.path.localeCompare(right.path));

const baseline = {
  schemaVersion: 1,
  capturedAt: "2026-07-25",
  repositoryRoot: ".",
  allowedTaskPaths: [
    "README.md",
    ".openai/",
    "study-app/",
    "plans/quiz-app-ux-concept.md",
    "plans/260725-rel301m-quiz-study-app/",
    "docs/journals/2026-07-25-rel301m-quiz-study-app.md",
  ],
  entries,
};

writeFileSync(outputPath, `${JSON.stringify(baseline, null, 2)}\n`, "utf8");
console.log(`Captured ${entries.length} dirty paths in ${outputPath}`);
