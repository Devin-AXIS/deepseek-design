import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  trackLintRun
} from "./chunk-GF4F5JSM.js";
import {
  formatLintFindings
} from "./chunk-6CSYCFQV.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  getRunId
} from "./chunk-54HJ63Q2.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import "./chunk-Q5X2B5WT.js";
import {
  lintProject
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/lint.ts
var examples = [
  ["Lint the current project", "hyperframes lint"],
  ["Lint a specific directory", "hyperframes lint ./my-video"],
  ["Output findings as JSON", "hyperframes lint --json"],
  ["Include info-level findings", "hyperframes lint --verbose"]
];
var lint_default = defineCommand({
  meta: {
    name: "lint",
    description: "Validate a composition for common mistakes"
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory",
      required: false
    },
    json: {
      type: "boolean",
      description: "Output findings as JSON",
      default: false
    },
    verbose: {
      type: "boolean",
      description: "Show info-level findings (hidden by default)",
      default: false
    }
  },
  async run({ args }) {
    try {
      const project = resolveProject(args.dir);
      const startedAt = Date.now();
      const lintResult = await lintProject(project.dir);
      trackLintRun(project.dir, lintResult, {
        command: "lint",
        durationMs: Date.now() - startedAt,
        ...getRunId() !== void 0 ? { runId: getRunId() } : {}
      });
      if (args.json) {
        const allFindings = lintResult.results.flatMap((r) => r.result.findings);
        const combined = {
          ok: lintResult.totalErrors === 0,
          errorCount: lintResult.totalErrors,
          warningCount: lintResult.totalWarnings,
          infoCount: lintResult.totalInfos,
          findings: args.verbose ? allFindings : allFindings.filter((f) => f.severity !== "info"),
          filesScanned: lintResult.results.length
        };
        console.log(JSON.stringify(withMeta(combined), null, 2));
        setCommandExitCode(combined.ok ? 0 : 1);
        return;
      }
      const fileCount = lintResult.results.length;
      const fileLabel = fileCount === 1 ? lintResult.results[0]?.file ?? "index.html" : `${fileCount} files`;
      console.log(`${c.accent("\u25C6")}  Linting ${c.accent(`${project.name}/${fileLabel}`)}`);
      console.log();
      if (lintResult.totalErrors === 0 && lintResult.totalWarnings === 0) {
        console.log(`${c.success("\u25C7")}  ${c.success("0 errors, 0 warnings")}`);
        return;
      }
      const lines = formatLintFindings(lintResult, {
        showElementId: true,
        showSummary: true,
        verbose: args.verbose
      });
      for (const line of lines) console.log(line);
      setCommandExitCode(lintResult.totalErrors > 0 ? 1 : 0);
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (args.json) {
        console.log(
          JSON.stringify(
            withMeta({
              ok: false,
              error: message,
              findings: [],
              errorCount: 0,
              warningCount: 0,
              infoCount: 0,
              filesScanned: 0
            }),
            null,
            2
          )
        );
        setCommandExitCode(1);
        return;
      }
      console.error(message);
      setCommandExitCode(1);
    }
  }
});
export {
  lint_default as default,
  examples
};
