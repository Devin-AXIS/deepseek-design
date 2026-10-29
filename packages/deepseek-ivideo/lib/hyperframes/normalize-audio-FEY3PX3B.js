import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  DEFAULT_TARGET_LUFS,
  absoluteLoudnessPlan,
  audioNormalizationPlan,
  audioTags,
  loudnessMeasureArgs,
  measureAudio,
  parseEbur128Summary,
  requiredFfmpeg,
  resolveLocalAudioPath,
  updateAudioVolume
} from "./chunk-FWHMCXES.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-USDEMXXL.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/normalize-audio.ts
import { existsSync, readFileSync, renameSync, writeFileSync } from "fs";
import { relative } from "path";
var DEFAULT_TOLERANCE_LU = 0.5;
function fail(message, json, cause) {
  if (json) console.log(JSON.stringify({ ok: false, error: message }, null, 2));
  else console.error(c.error(message));
  failCommand(1, cause);
}
function byId(tags, rawId, role) {
  const id = rawId.trim().replace(/^#/, "");
  const tag = tags.find((candidate) => candidate.id === id);
  if (!tag) throw new Error(`${role} audio #${id} was not found`);
  return tag;
}
function selectedTags(html, referenceId, targetId) {
  const tags = audioTags(html);
  const referenceTag = byId(tags, referenceId, "Reference");
  const targetTag = byId(tags, targetId, "Target");
  if (referenceTag.id === targetTag.id) {
    throw new Error("Reference and target must be different audio elements");
  }
  return { referenceTag, targetTag };
}
function existingAudioFile(projectDir, tag) {
  const file = resolveLocalAudioPath(projectDir, tag.src);
  if (!existsSync(file)) {
    throw new Error(`Audio #${tag.id} file was not found: ${relative(projectDir, file)}`);
  }
  return file;
}
async function measuredPlan(projectDir, referenceTag, targetTag) {
  const ffmpegPath = requiredFfmpeg();
  const referenceFile = existingAudioFile(projectDir, referenceTag);
  const targetFile = existingAudioFile(projectDir, targetTag);
  const [referenceMeasurement, targetMeasurement] = await Promise.all([
    measureAudio(ffmpegPath, referenceFile, referenceTag),
    measureAudio(ffmpegPath, targetFile, targetTag)
  ]);
  return audioNormalizationPlan(
    { id: referenceTag.id, volume: referenceTag.volume, ...referenceMeasurement },
    { id: targetTag.id, volume: targetTag.volume, ...targetMeasurement }
  );
}
function writeAtomically(path, contents) {
  const temporary = `${path}.hf-normalize-${process.pid}.tmp`;
  writeFileSync(temporary, contents);
  renameSync(temporary, path);
}
function parsedTolerance(raw) {
  const tolerance = Number(raw);
  if (!Number.isFinite(tolerance) || tolerance < 0) {
    throw new Error("--tolerance must be a non-negative number");
  }
  return tolerance;
}
function parsedLufs(raw) {
  const lufs = Number(raw);
  if (!Number.isFinite(lufs) || lufs >= 0) throw new Error("--lufs must be a negative number");
  return lufs;
}
async function measuredAbsolutePlan(projectDir, targetTag, targetLufs) {
  const measurement = await measureAudio(
    requiredFfmpeg(),
    existingAudioFile(projectDir, targetTag),
    targetTag
  );
  return absoluteLoudnessPlan(
    { id: targetTag.id, volume: targetTag.volume, ...measurement },
    targetLufs
  );
}
async function plannedNormalization(projectDir, html, options, tolerance) {
  if (options.reference === void 0) {
    const targetTag2 = byId(audioTags(html), options.target, "Target");
    const plan2 = await measuredAbsolutePlan(projectDir, targetTag2, parsedLufs(options.lufs));
    const withinTolerance2 = Math.abs(plan2.changeDb) <= tolerance;
    return { targetTag: targetTag2, withinTolerance: withinTolerance2, plan: { mode: "absolute", ...plan2 } };
  }
  const { referenceTag, targetTag } = selectedTags(html, options.reference, options.target);
  const plan = await measuredPlan(projectDir, referenceTag, targetTag);
  const withinTolerance = Math.abs(plan.referenceLufs - plan.targetLufs) <= tolerance;
  return { targetTag, withinTolerance, plan: { mode: "reference", ...plan } };
}
async function normalizeAudio(options) {
  const project = resolveProject(options.dir);
  const html = readFileSync(project.indexPath, "utf8");
  const tolerance = parsedTolerance(options.tolerance);
  const { targetTag, withinTolerance, plan } = await plannedNormalization(
    project.dir,
    html,
    options,
    tolerance
  );
  const wrote = options.write && !withinTolerance;
  if (wrote) {
    writeAtomically(
      project.indexPath,
      updateAudioVolume(readFileSync(project.indexPath, "utf8"), targetTag.id, plan.volume)
    );
  }
  return { ok: true, wrote, withinTolerance, tolerance, indexPath: project.indexPath, ...plan };
}
var LIMIT_TEXT = {
  "gain-ceiling": "stopped at the +12 dB authoring ceiling",
  "true-peak": "stopped short of -1.5 dBTP"
};
function printMeasuredLine(result) {
  if (result.mode === "reference") {
    console.log(
      `${c.bold(`#${result.referenceId}`)} ${result.referenceLufs.toFixed(1)} LUFS \u2192 ${c.bold(`#${result.targetId}`)} ${result.targetLufs.toFixed(1)} LUFS`
    );
    return;
  }
  const limit = result.limitedBy ? ` (${LIMIT_TEXT[result.limitedBy]})` : "";
  console.log(
    `${c.bold(`#${result.targetId}`)} ${result.sourceLufs.toFixed(1)} LUFS \u2192 ${result.projectedLufs.toFixed(1)} LUFS, target ${result.targetLufs.toFixed(1)}${limit}`
  );
}
function printHumanResult(result) {
  printMeasuredLine(result);
  if (result.withinTolerance) {
    console.log(
      c.success(`Already matched within ${result.tolerance.toFixed(1)} LU; no change needed.`)
    );
    return;
  }
  console.log(
    `Set #${result.targetId} data-volume ${result.previousVolume.toFixed(3)} \u2192 ${result.volume.toFixed(6)} (${result.changeDb >= 0 ? "+" : ""}${result.changeDb.toFixed(1)} dB).`
  );
  console.log(
    result.wrote ? c.success(`Updated ${relative(process.cwd(), result.indexPath) || "index.html"}.`) : c.dim("Dry run only. Pass --write to persist this gain.")
  );
}
var examples = [
  [
    "Bring one clip (audio or a video with sound) to -16 LUFS",
    "hyperframes normalize-audio --target voiceover --write"
  ],
  [
    "Measure two authored clips and preview the matching gain",
    "hyperframes normalize-audio --reference target-audio --target user-audio"
  ],
  [
    "Persist the measured gain into index.html",
    "hyperframes normalize-audio --reference target-audio --target user-audio --write"
  ]
];
var normalize_audio_default = defineCommand({
  meta: {
    name: "normalize-audio",
    description: "Normalize a clip with sound to an absolute LUFS target, or match it to another clip"
  },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    reference: {
      type: "string",
      description: "Audio or video element id whose effective loudness should be preserved (omit to use --lufs)",
      required: false
    },
    target: {
      type: "string",
      description: "Audio or video element id whose data-volume should be set",
      required: true
    },
    lufs: {
      type: "string",
      description: `Absolute integrated loudness target without --reference (default ${DEFAULT_TARGET_LUFS})`,
      default: String(DEFAULT_TARGET_LUFS)
    },
    write: {
      type: "boolean",
      description: "Persist the measured target gain into index.html",
      default: false
    },
    tolerance: {
      type: "string",
      description: `Skip writes within this many LU (default ${DEFAULT_TOLERANCE_LU})`,
      default: String(DEFAULT_TOLERANCE_LU)
    },
    json: { type: "boolean", description: "Print machine-readable output", default: false }
  },
  async run({ args }) {
    try {
      const result = await normalizeAudio({
        dir: args.dir,
        reference: args.reference,
        target: args.target,
        lufs: args.lufs,
        tolerance: args.tolerance,
        write: args.write
      });
      if (args.json) {
        const { indexPath: _, ...jsonResult } = result;
        console.log(JSON.stringify(jsonResult, null, 2));
        return;
      }
      printHumanResult(result);
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error), Boolean(args.json), error);
    }
  }
});
export {
  audioNormalizationPlan,
  audioTags,
  normalize_audio_default as default,
  examples,
  loudnessMeasureArgs,
  parseEbur128Summary,
  resolveLocalAudioPath,
  updateAudioVolume
};
