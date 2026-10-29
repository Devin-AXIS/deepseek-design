import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import "./chunk-M2WBOQ2Q.js";

// src/utils/workspaceBuildCheck.ts
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
var STUDIO_WORKSPACE_BUILD_ORDER = [
  "parsers",
  "lint",
  "studio-server",
  "core",
  "player"
];
var CORE_REQUIRED_GENERATED_FILES = [
  "src/generated/runtime-inline.ts",
  "src/generated/audio-fx-runtime-inline.ts"
];
var SKIP_STALE_CHECK_ENV = "HYPERFRAMES_SKIP_BUILD_STALE_CHECK";
function buildCommand(pkg) {
  return `bun run --filter @hyperframes/${pkg} build`;
}
function isTestFile(name) {
  return /\.test\.[tj]sx?$/.test(name);
}
function newestMtimeMs(dir, { skipTests }) {
  if (!existsSync(dir)) return 0;
  const mtimes = readdirSync(dir, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile() && !entry.parentPath.includes("node_modules")).filter((entry) => !skipTests || !isTestFile(entry.name)).map((entry) => statSync(join(entry.parentPath, entry.name)).mtimeMs);
  return mtimes.length > 0 ? Math.max(...mtimes) : 0;
}
function distExportEntries(packageDir) {
  const pkgJsonPath = join(packageDir, "package.json");
  if (!existsSync(pkgJsonPath)) return [];
  const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));
  return Object.entries(pkg.exports ?? {}).flatMap(
    ([subpath, conditions]) => distTargetsOf(conditions).map((target) => ({ subpath, target }))
  );
}
function distTargetsOf(conditions) {
  if (typeof conditions !== "object" || conditions === null) return [];
  return Object.values(conditions).filter(
    (value) => typeof value === "string" && value.startsWith("./dist/")
  );
}
function missingDistExportTargets(packageDir) {
  return distExportEntries(packageDir).filter((entry) => !existsSync(join(packageDir, entry.target))).map((entry) => `${entry.subpath} (${entry.target})`);
}
function exportProblemsFor(packageDir, pkg, fix) {
  let missingExports;
  try {
    missingExports = missingDistExportTargets(packageDir);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return [{ package: pkg, kind: "missing", detail: `package.json is invalid: ${message}`, fix }];
  }
  if (missingExports.length === 0) return [];
  return [
    {
      package: pkg,
      kind: "missing",
      detail: `dist is missing exported file(s): ${missingExports.join(", ")}`,
      fix
    }
  ];
}
function checkStudioWorkspaceBuild(repoRoot) {
  const problems = [];
  for (const pkg of STUDIO_WORKSPACE_BUILD_ORDER) {
    const packageDir = join(repoRoot, "packages", pkg);
    const distDir = join(packageDir, "dist");
    const fix = buildCommand(pkg);
    if (!existsSync(distDir) || readdirSync(distDir).length === 0) {
      problems.push({ package: pkg, kind: "missing", detail: "dist/ is missing or empty", fix });
      continue;
    }
    if (pkg === "core") {
      const missingGenerated = CORE_REQUIRED_GENERATED_FILES.filter(
        (rel) => !existsSync(join(packageDir, rel))
      );
      if (missingGenerated.length > 0) {
        problems.push({
          package: pkg,
          kind: "missing",
          detail: `generated file(s) missing: ${missingGenerated.join(", ")}`,
          fix
        });
        continue;
      }
    }
    const exportProblems = exportProblemsFor(packageDir, pkg, fix);
    if (exportProblems.length > 0) {
      problems.push(...exportProblems);
      continue;
    }
    if (process.env[SKIP_STALE_CHECK_ENV]) continue;
    const newestSrc = newestMtimeMs(join(packageDir, "src"), { skipTests: true });
    const newestDist = newestMtimeMs(distDir, { skipTests: false });
    if (newestSrc > newestDist) {
      problems.push({
        package: pkg,
        kind: "stale",
        detail: `src changed after the last build (set ${SKIP_STALE_CHECK_ENV}=1 to skip this check)`,
        fix
      });
    }
  }
  return problems;
}
function formatWorkspaceBuildProblems(problems) {
  const lines = ["Studio workspace build check failed", ""];
  for (const problem of problems) {
    lines.push(`  - ${problem.package}: ${problem.detail}`);
    lines.push(`    fix: ${problem.fix}`);
  }
  lines.push("");
  lines.push(
    "  Or build every package in order (core depends on the first three, player on core):"
  );
  lines.push("    bun run --filter '@hyperframes/{parsers,lint,studio-server}' build \\");
  lines.push("      && bun run --filter @hyperframes/core build \\");
  lines.push("      && bun run --filter @hyperframes/player build");
  return lines.join("\n");
}
export {
  SKIP_STALE_CHECK_ENV,
  STUDIO_WORKSPACE_BUILD_ORDER,
  checkStudioWorkspaceBuild,
  formatWorkspaceBuildProblems
};
