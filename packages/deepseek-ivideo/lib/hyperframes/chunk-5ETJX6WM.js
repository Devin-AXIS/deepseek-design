import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/tts/python.ts
import { execFileSync } from "child_process";
function validatePythonOverride(override) {
  try {
    const version = execFileSync(override, ["--version"], {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 5e3
    });
    if (/Python 3/.test(version)) return { ok: true };
    return {
      ok: false,
      reason: `did not report a Python 3 version (got ${JSON.stringify(version.trim())})`
    };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : String(error) };
  }
}
function findPython() {
  const override = process.env.HYPERFRAMES_PYTHON;
  if (override && validatePythonOverride(override).ok) return override;
  for (const name of ["python3", "python"]) {
    try {
      const cmd = process.platform === "win32" ? "where" : "which";
      const output = execFileSync(cmd, [name], {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 5e3
      });
      const first = output.split(/\r?\n/).map((s) => s.trim()).find(Boolean);
      if (!first) continue;
      const version = execFileSync(first, ["--version"], {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 5e3
      }).trim();
      if (version.includes("Python 3")) return first;
    } catch {
    }
  }
  return void 0;
}
function describeRejectedPythonOverride() {
  const override = process.env.HYPERFRAMES_PYTHON;
  if (!override) return null;
  const validation = validatePythonOverride(override);
  if (validation.ok) return null;
  return `HYPERFRAMES_PYTHON="${override}" was rejected: ${validation.reason}`;
}
function hasPythonPackage(python, pkg) {
  try {
    execFileSync(python, ["-c", `import ${pkg}`], {
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 1e4
    });
    return true;
  } catch {
    return false;
  }
}
function hasPythonModules(modules) {
  const python = findPython();
  if (!python) return false;
  const list = JSON.stringify(modules);
  const probe = `import importlib.util,sys; sys.exit(0 if all(importlib.util.find_spec(m) for m in ${list}) else 1)`;
  try {
    execFileSync(python, ["-c", probe], {
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 1e4
    });
    return true;
  } catch {
    return false;
  }
}

export {
  findPython,
  describeRejectedPythonOverride,
  hasPythonPackage,
  hasPythonModules
};
