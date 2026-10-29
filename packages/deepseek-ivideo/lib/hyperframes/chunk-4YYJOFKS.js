import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/writeNewFile.ts
import { linkSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
function writeNewFileSync(filePath, content) {
  const stagingDir = mkdtempSync(join(dirname(filePath), ".hf-create-"));
  try {
    const stagedPath = join(stagingDir, "content");
    writeFileSync(stagedPath, content, { encoding: "utf-8", flag: "wx" });
    try {
      linkSync(stagedPath, filePath);
    } catch (err) {
      if (!(err instanceof Error && "code" in err && err.code === "EEXIST")) throw err;
    }
  } finally {
    rmSync(stagingDir, { recursive: true, force: true });
  }
}

export {
  writeNewFileSync
};
