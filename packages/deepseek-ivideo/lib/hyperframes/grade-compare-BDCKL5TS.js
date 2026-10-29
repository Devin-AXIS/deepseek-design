import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  displayPathFromBase,
  readOptionalString,
  resolveFromBase
} from "./chunk-ZKDMAOFU.js";
import {
  serveStaticProjectHtml
} from "./chunk-UQR6E2MI.js";
import {
  openSettledCompositionPage,
  runFfmpegOnce
} from "./chunk-RYA6RITK.js";
import "./chunk-KXH7PX6M.js";
import "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFF75FSN.js";
import "./chunk-PFCFR3KZ.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-XUHOIDKG.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-UITPTRCM.js";
import "./chunk-OLJM7Q7L.js";
import {
  trackCompareSheet
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import {
  findFFmpeg
} from "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  gsapCdnDist
} from "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  HF_COLOR_GRADING_ATTR,
  isHfColorGradingActive,
  normalizeHfColorGrading,
  parseCubeLut,
  serializeHfColorGrading
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
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
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/grade-compare.ts
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "fs";
import { tmpdir } from "os";
import { basename, dirname, extname, join, resolve } from "path";
import sharp from "sharp";
var COMPOSITION_ID = "grade-compare";
var COMPOSITION_DURATION = "1";
var DEFAULT_CELL_WIDTH = 560;
var MAX_CANDIDATE_CELLS = 16;
var MAX_COLUMNS = 4;
var GRID_PADDING = 16;
var LABEL_HEIGHT = 32;
var FFMPEG_EXTRACT_TIMEOUT_MS = 3e4;
var examples = [
  [
    "Compare grade presets on one reference frame",
    "hyperframes grade-compare --for frame.png --grades grades.json"
  ],
  [
    "Compare LUT files and print agent-friendly JSON",
    "hyperframes grade-compare --for frame.png --luts looks/a.cube,looks/b.cube --json"
  ]
];
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasOwn(record, key) {
  return Object.prototype.hasOwnProperty.call(record, key);
}
function cloneRecord(record) {
  const next = {};
  for (const [key, value] of Object.entries(record)) {
    next[key] = value;
  }
  return next;
}
function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function escapeSingleQuotedAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;");
}
function validateCell(label, grading) {
  if (!normalizeHfColorGrading(grading)) {
    throw new Error(`Invalid color grading for cell "${label}"`);
  }
  return { label, grading };
}
function warnInactiveGradingCells(cells) {
  for (const cell of cells) {
    const normalized = normalizeHfColorGrading(cell.grading);
    if (!isHfColorGradingActive(normalized)) {
      console.error(
        c.warn(`Warning: grading for "${cell.label}" is inactive/no-op \u2014 it will render ungraded`)
      );
    }
  }
}
function capCandidateCells(cells) {
  const total = cells.length;
  if (total <= MAX_CANDIDATE_CELLS) {
    return { cells: [...cells], truncated: false, total };
  }
  console.error(
    c.warn(
      `Warning: ${total} candidate grades exceed the ${MAX_CANDIDATE_CELLS}-cell cap \u2014 rendering the first ${MAX_CANDIDATE_CELLS} of ${total}; re-run with fewer grades or split into multiple runs.`
    )
  );
  return { cells: cells.slice(0, MAX_CANDIDATE_CELLS), truncated: true, total };
}
function buildGradeCompareSuccessPayload(sheet, cells, capResult) {
  if (!capResult.truncated) {
    return { ok: true, sheet, cells };
  }
  return { ok: true, sheet, cells, truncated: true, total: capResult.total };
}
function serializedGradingForCell(cell) {
  const normalized = normalizeHfColorGrading(cell.grading);
  if (!normalized) {
    throw new Error(`Invalid color grading for cell "${cell.label}"`);
  }
  return serializeHfColorGrading(normalized);
}
function lutSrcFromGrading(grading) {
  if (!isRecord(grading) || !hasOwn(grading, "lut")) return null;
  const lut = grading.lut;
  if (typeof lut === "string" && lut.trim()) return lut.trim();
  if (!isRecord(lut)) return null;
  const src = lut.src;
  return typeof src === "string" && src.trim() ? src.trim() : null;
}
function rewriteGradingLutSrc(grading, src) {
  if (!isRecord(grading) || !hasOwn(grading, "lut")) return grading;
  const lut = grading.lut;
  const next = cloneRecord(grading);
  if (typeof lut === "string") {
    next.lut = { src };
    return next;
  }
  if (isRecord(lut)) {
    const nextLut = cloneRecord(lut);
    nextLut.src = src;
    next.lut = nextLut;
  }
  return next;
}
function parseGradesFile(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`Grades file not found: ${filePath}`);
  }
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (err) {
    throw new Error(`Could not parse grades JSON: ${normalizeErrorMessage(err)}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error("Grades file must be a JSON array of { label, grading } objects");
  }
  return parsed.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Grade entry ${index + 1} must be an object with label and grading`);
    }
    const label = entry.label;
    if (typeof label !== "string" || !label.trim()) {
      throw new Error(`Grade entry ${index + 1} must have a non-empty string label`);
    }
    if (!hasOwn(entry, "grading")) {
      throw new Error(`Grade entry "${label}" must include a grading value`);
    }
    return validateCell(label, entry.grading);
  });
}
function resolveLutCells(luts) {
  const paths = luts.split(",").map((part) => part.trim()).filter(Boolean);
  if (paths.length === 0) {
    throw new Error("--luts must include at least one LUT path");
  }
  return paths.map(
    (lutPath) => validateCell(basename(lutPath, extname(lutPath)), { lut: { src: lutPath } })
  );
}
function prependBaselineCell(cells) {
  return [validateCell("original", {}), ...cells];
}
function parseGradeCompareArgs(args) {
  const frameArg = readOptionalString(args.for);
  if (!frameArg) throw new Error("--for <path> is required");
  const gradesArg = readOptionalString(args.grades);
  const lutsArg = readOptionalString(args.luts);
  if (Boolean(gradesArg) === Boolean(lutsArg)) {
    throw new Error("Exactly one of --grades or --luts is required");
  }
  const projectDir = resolve(readOptionalString(args.project) ?? process.cwd());
  const framePath = resolveFromBase(projectDir, frameArg);
  const outPath = resolveFromBase(projectDir, readOptionalString(args.out) ?? "grade-compare.png");
  return {
    framePath,
    projectDir,
    outPath,
    source: gradesArg ? { kind: "grades", path: resolveFromBase(projectDir, gradesArg) } : { kind: "luts", value: lutsArg ?? "" },
    json: args.json === true,
    timeoutMs: Number.parseInt(readOptionalString(args.timeout) ?? "", 10) || 5e3
  };
}
function gridMetrics(cellCount, frameWidth, frameHeight) {
  const columns = Math.max(1, Math.min(MAX_COLUMNS, Math.ceil(Math.sqrt(cellCount))));
  const rows = Math.ceil(cellCount / columns);
  const cellImageWidth = DEFAULT_CELL_WIDTH;
  const aspect = frameHeight > 0 && frameWidth > 0 ? frameHeight / frameWidth : 9 / 16;
  const cellImageHeight = Math.max(1, Math.round(cellImageWidth * aspect));
  return {
    columns,
    rows,
    cellImageWidth,
    cellImageHeight,
    width: columns * cellImageWidth + (columns + 1) * GRID_PADDING,
    height: rows * (cellImageHeight + LABEL_HEIGHT) + (rows + 1) * GRID_PADDING
  };
}
function buildGradeCompareHtml(options) {
  if (options.cells.length === 0) {
    throw new Error("At least one grade cell is required");
  }
  const metrics = gridMetrics(options.cells.length, options.frameWidth, options.frameHeight);
  const cellHtml = options.cells.map((cell, index) => {
    const serialized = escapeSingleQuotedAttr(serializedGradingForCell(cell));
    const label = escapeXml(cell.label);
    const row = Math.floor(index / metrics.columns);
    const col = index % metrics.columns;
    const left = GRID_PADDING + col * (metrics.cellImageWidth + GRID_PADDING);
    const top = GRID_PADDING + row * (metrics.cellImageHeight + LABEL_HEIGHT + GRID_PADDING);
    return `      <figure class="grade-cell" style="left:${left}px;top:${top}px;width:${metrics.cellImageWidth}px;height:${metrics.cellImageHeight + LABEL_HEIGHT}px">
        <figcaption>${label}</figcaption>
        <img src="${escapeXml(options.frameSrc)}" ${HF_COLOR_GRADING_ATTR}='${serialized}' alt="${label}" />
      </figure>`;
  }).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${metrics.width}, height=${metrics.height}" />
    <title>HyperFrames Grade Compare</title>
    <script src="${gsapCdnDist()}gsap.min.js"></script>
    <style>
      html,
      body {
        margin: 0;
        width: ${metrics.width}px;
        height: ${metrics.height}px;
        overflow: hidden;
        background: #191919;
        font-family: Arial, Helvetica, sans-serif;
      }

      #${COMPOSITION_ID} {
        position: relative;
        width: ${metrics.width}px;
        height: ${metrics.height}px;
        overflow: hidden;
        background: #191919;
      }

      .grade-cell {
        position: absolute;
        margin: 0;
        background: #0f0f0f;
      }

      .grade-cell figcaption {
        height: ${LABEL_HEIGHT}px;
        line-height: ${LABEL_HEIGHT}px;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #ffffff;
        background: #111111;
        font-size: 14px;
        font-weight: 700;
      }

      .grade-cell img {
        display: block;
        width: ${metrics.cellImageWidth}px;
        height: ${metrics.cellImageHeight}px;
        object-fit: contain;
        background: #000000;
      }
    </style>
  </head>
  <body>
    <div
      id="${COMPOSITION_ID}"
      data-composition-id="${COMPOSITION_ID}"
      data-start="0"
      data-duration="${COMPOSITION_DURATION}"
      data-width="${metrics.width}"
      data-height="${metrics.height}"
    >
${cellHtml}
      <script>
        window.__timelines = window.__timelines || {};
        window.__timelines["${COMPOSITION_ID}"] = gsap.timeline({ paused: true });
      </script>
    </div>
  </body>
</html>
`;
}
function frameFileNameForPath(framePath) {
  const ext = extname(framePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return `frame${ext}`;
  return "frame.png";
}
async function prepareGradeCompareTempProject(opts) {
  const tempDir = mkdtempSync(join(tmpdir(), "hf-grade-compare-"));
  try {
    const frameFileName = opts.frameFileName ?? frameFileNameForPath(opts.framePath);
    writeFileSync(join(tempDir, frameFileName), opts.frameBuffer);
    let lutIndex = 0;
    const stagedCells = opts.cells.map((cell) => {
      const lutSrc = lutSrcFromGrading(cell.grading);
      if (!lutSrc) return cell;
      const sourcePath = resolveFromBase(opts.projectDir, lutSrc);
      if (!existsSync(sourcePath)) {
        throw new Error(`LUT file not found for "${cell.label}": ${sourcePath}`);
      }
      const lutText = readFileSync(sourcePath, "utf-8");
      try {
        parseCubeLut(lutText, { maxSize: 64 });
      } catch (err) {
        throw new Error(
          `LUT for "${cell.label}" is not a valid .cube: ${normalizeErrorMessage(err)}`
        );
      }
      const lutExt = extname(sourcePath) || ".cube";
      const stagedName = `lut-${lutIndex}${lutExt}`;
      lutIndex += 1;
      copyFileSync(sourcePath, join(tempDir, stagedName));
      return {
        label: cell.label,
        grading: rewriteGradingLutSrc(cell.grading, stagedName)
      };
    });
    const html = buildGradeCompareHtml({
      cells: stagedCells,
      frameSrc: frameFileName,
      frameWidth: opts.frameWidth,
      frameHeight: opts.frameHeight
    });
    writeFileSync(join(tempDir, "index.html"), html);
    return { tempDir, html, cells: stagedCells };
  } catch (err) {
    rmSync(tempDir, { recursive: true, force: true });
    throw err;
  }
}
function isVideoPath(filePath) {
  const ext = extname(filePath).toLowerCase();
  return [".mp4", ".mov", ".m4v", ".webm", ".mkv", ".avi", ".mpeg", ".mpg", ".ogv"].includes(ext);
}
async function extractVideoFrameToBuffer(videoPath) {
  const tmp = mkdtempSync(join(tmpdir(), "hf-grade-compare-frame-"));
  const outPath = join(tmp, "frame.png");
  try {
    const ffmpegPath = findFFmpeg();
    if (!ffmpegPath) return null;
    const args = [
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      "0",
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-q:v",
      "2",
      "-y",
      outPath
    ];
    const result = await runFfmpegOnce(ffmpegPath, args, FFMPEG_EXTRACT_TIMEOUT_MS);
    if (result.timedOut) {
      throw new Error(`ffmpeg timed out extracting first frame from ${videoPath}`);
    }
    if (result.code !== 0 || !existsSync(outPath)) {
      const detail = result.stderr.trim() ? `: ${result.stderr.trim()}` : "";
      throw new Error(`ffmpeg could not extract first frame from ${videoPath}${detail}`);
    }
    return readFileSync(outPath);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}
async function loadReferenceFrame(framePath) {
  if (!existsSync(framePath)) {
    throw new Error(`Reference frame not found: ${framePath}`);
  }
  const buffer = isVideoPath(framePath) ? await extractVideoFrameToBuffer(framePath) : readFileSync(framePath);
  if (!buffer) {
    throw new Error(`Could not extract a frame from video: ${framePath}`);
  }
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read reference frame dimensions: ${framePath}`);
  }
  return {
    buffer,
    width: metadata.width,
    height: metadata.height,
    stagedName: isVideoPath(framePath) ? "frame.png" : frameFileNameForPath(framePath)
  };
}
async function captureGradeCompareSheet(projectDir, timeoutMs) {
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  const html = await bundleToSingleHtml(projectDir);
  const server = await serveStaticProjectHtml(projectDir, html);
  const sheetPath = join(projectDir, "grade-compare.png");
  try {
    const {
      browser: chromeBrowser,
      page,
      renderReadyTimedOut
    } = await openSettledCompositionPage(html, server.url, {
      renderReadyTimeoutMs: timeoutMs,
      renderReadyWarningSuffix: "grade comparison may be inaccurate"
    });
    try {
      await page.screenshot({ path: sheetPath, type: "png" });
      return { sheetPath, renderReadyTimedOut };
    } finally {
      await chromeBrowser.close();
    }
  } finally {
    await server.close();
  }
}
function printJson(payload) {
  console.log(JSON.stringify(withMeta(payload), null, 2));
}
var grade_compare_default = defineCommand({
  meta: {
    name: "grade-compare",
    description: "Render candidate color grades onto a reference frame as one comparison PNG"
  },
  args: {
    for: {
      type: "string",
      description: "Reference image path, or a video path to sample at t=0",
      required: true
    },
    grades: {
      type: "string",
      description: "JSON array of { label, grading } candidate grades"
    },
    luts: {
      type: "string",
      description: "Comma-separated .cube LUT paths to compare"
    },
    project: {
      type: "string",
      description: "Base directory for relative --for, --grades, and LUT paths (default: cwd)"
    },
    out: {
      type: "string",
      description: "Output PNG path (default: <project>/grade-compare.png)"
    },
    json: {
      type: "boolean",
      description: "Output result as JSON",
      default: false
    },
    timeout: {
      type: "string",
      description: "Render-ready timeout in ms before capture (default: 5000)"
    },
    baseline: {
      type: "boolean",
      description: "Prepend the ungraded frame as an 'original' reference cell (--no-baseline to omit)",
      default: true
    }
  },
  async run({ args }) {
    const jsonRequested = args.json === true;
    let preparedDir = null;
    try {
      const parsed = parseGradeCompareArgs({
        for: args.for,
        grades: args.grades,
        luts: args.luts,
        project: args.project,
        out: args.out,
        json: args.json,
        timeout: args.timeout
      });
      let cells = parsed.source.kind === "grades" ? parseGradesFile(parsed.source.path) : resolveLutCells(parsed.source.value);
      if (cells.length === 0) {
        throw new Error("At least one grade candidate is required");
      }
      const capResult = capCandidateCells(cells);
      cells = capResult.cells;
      warnInactiveGradingCells(cells);
      if (args.baseline !== false) {
        cells = prependBaselineCell(cells);
      }
      if (!parsed.json) {
        console.log(
          `${c.accent("\u25C6")}  Rendering ${cells.length} grade candidates from ${c.accent(basename(parsed.framePath))}`
        );
      }
      const frame = await loadReferenceFrame(parsed.framePath);
      const prepared = await prepareGradeCompareTempProject({
        projectDir: parsed.projectDir,
        framePath: parsed.framePath,
        frameBuffer: frame.buffer,
        frameWidth: frame.width,
        frameHeight: frame.height,
        frameFileName: frame.stagedName,
        cells
      });
      preparedDir = prepared.tempDir;
      const { sheetPath: tempSheet, renderReadyTimedOut } = await captureGradeCompareSheet(
        prepared.tempDir,
        parsed.timeoutMs
      );
      mkdirSync(dirname(parsed.outPath), { recursive: true });
      copyFileSync(tempSheet, parsed.outPath);
      trackCompareSheet({
        command: "grade-compare",
        cells: prepared.cells.length,
        truncated: capResult.truncated,
        total: capResult.total,
        renderReadyTimedOut
      });
      const sheet = displayPathFromBase(parsed.projectDir, parsed.outPath);
      if (parsed.json) {
        printJson(buildGradeCompareSuccessPayload(sheet, prepared.cells.length, capResult));
      } else {
        console.log(`
${c.success("\u25C7")}  Grade comparison saved to ${sheet}`);
      }
    } catch (err) {
      const message = normalizeErrorMessage(err);
      if (jsonRequested) {
        printJson({ ok: false, error: message });
      } else {
        console.error(`
${c.error("\u2717")} Grade compare failed: ${message}`);
      }
      failCommand();
    } finally {
      if (preparedDir) {
        rmSync(preparedDir, { recursive: true, force: true });
      }
    }
  }
});
export {
  buildGradeCompareHtml,
  buildGradeCompareSuccessPayload,
  capCandidateCells,
  grade_compare_default as default,
  examples,
  parseGradeCompareArgs,
  parseGradesFile,
  prepareGradeCompareTempProject,
  prependBaselineCell,
  resolveLutCells,
  warnInactiveGradingCells
};
