import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  writeCaptureFileSync
} from "./chunk-MRF4AMKD.js";

// src/capture/contactSheet.ts
import sharp from "sharp";
import { readdirSync, readFileSync, unlinkSync, existsSync } from "fs";
import { join, extname, basename, dirname } from "path";
async function createContactSheet(imagePaths, outputPath, opts = {}) {
  const {
    cols = 3,
    maxImages = 16,
    padding = 4,
    labelMode = "index",
    labels,
    quality = 88,
    cellWidth = 600
  } = opts;
  if ((opts.remainingMs?.() ?? 1) <= 0) return null;
  const files = imagePaths.slice(0, maxImages);
  if (files.length === 0) return null;
  const firstMeta = await sharp(files[0]).metadata();
  const srcW = firstMeta.width || 1920;
  const srcH = firstMeta.height || 1080;
  const scale = cellWidth / srcW;
  const cellW = cellWidth;
  const cellH = Math.round(srcH * scale);
  const rows = Math.ceil(files.length / cols);
  const labelH = 26;
  const totalW = cols * cellW + (cols + 1) * padding;
  const totalH = rows * (cellH + labelH) + (rows + 1) * padding;
  const overlays = [];
  for (let i = 0; i < files.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = padding + col * (cellW + padding);
    const y = padding + row * (cellH + labelH + padding);
    const resized = await sharp(files[i]).resize(cellW, cellH, { fit: "contain", background: { r: 26, g: 26, b: 26 } }).toBuffer();
    overlays.push({ input: resized, left: x, top: y + labelH });
    let labelText = `${i + 1}`;
    if (labelMode === "filename") {
      labelText = `${i + 1}. ${basename(files[i]).replace(extname(files[i]), "")}`;
    } else if (labelMode === "custom" && labels?.[i]) {
      labelText = `${i + 1}. ${labels[i]}`;
    }
    if (labelText.length > 60) labelText = labelText.slice(0, 57) + "...";
    const labelSvg = Buffer.from(
      `<svg width="${cellW}" height="${labelH}"><rect width="${cellW}" height="${labelH}" fill="#1a1a1a"/><text x="8" y="18" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="bold" fill="#ffffff">${escapeXml(labelText)}</text></svg>`
    );
    overlays.push({ input: labelSvg, left: x, top: y });
  }
  const sheet = sharp({
    create: {
      width: totalW,
      height: totalH,
      channels: 3,
      background: { r: 26, g: 26, b: 26 }
    }
  }).composite(overlays);
  const encoded = extname(outputPath).toLowerCase() === ".png" ? await sheet.png().toBuffer() : await sheet.jpeg({ quality }).toBuffer();
  writeCaptureFileSync(outputPath, encoded);
  return outputPath;
}
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
async function createContactSheetPages(imagePaths, outputBasePath, opts = {}, labelOffset = 0, customLabels) {
  if (imagePaths.length === 0) return [];
  const { pageSize = imagePaths.length, remainingMs, ...sheetOpts } = opts;
  const ext = outputBasePath.match(/\.[^.]+$/)?.[0] ?? ".jpg";
  const base = outputBasePath.slice(0, -ext.length);
  const pages = Math.ceil(imagePaths.length / pageSize);
  const results = [];
  for (let p = 0; p < pages; p++) {
    if ((remainingMs?.() ?? 1) <= 0) break;
    const chunk = imagePaths.slice(p * pageSize, (p + 1) * pageSize);
    const chunkLabels = customLabels?.slice(p * pageSize, (p + 1) * pageSize);
    const outPath = pages === 1 ? outputBasePath : `${base}-${p + 1}${ext}`;
    const labelsForChunk = chunkLabels ? { labelMode: "custom", labels: chunkLabels } : sheetOpts.labelMode === "filename" ? { labelMode: "filename" } : { labelMode: "index" };
    const written = await createContactSheet(chunk, outPath, {
      ...sheetOpts,
      ...labelsForChunk,
      maxImages: chunk.length
    });
    if (written) results.push(written);
    void labelOffset;
  }
  return results;
}
async function createScrollContactSheet(screenshotsDir, outputPath, budget = {}) {
  if (!existsSync(screenshotsDir)) return [];
  const scrollFiles = readdirSync(screenshotsDir).filter((f) => f.startsWith("scroll-") && f.endsWith(".png")).sort();
  if (scrollFiles.length === 0) return [];
  const paths = scrollFiles.map((f) => join(screenshotsDir, f));
  const labels = scrollFiles.map((f) => {
    const m = f.match(/scroll-(\d+)\.png/);
    return m ? `${m[1]}% scroll` : f;
  });
  return createContactSheetPages(
    paths,
    outputPath,
    { cols: 3, cellWidth: 600, pageSize: 9, ...budget },
    0,
    labels
  );
}
async function createSnapshotContactSheet(snapshotsDir, outputPath, budget = {}) {
  if (!existsSync(snapshotsDir)) return [];
  const snapshotFiles = readdirSync(snapshotsDir).filter((f) => f.startsWith("frame-") && f.endsWith(".png")).sort();
  if (snapshotFiles.length === 0) return [];
  const paths = snapshotFiles.map((f) => join(snapshotsDir, f));
  const labels = snapshotFiles.map((f) => {
    const m = f.match(/at-([\d.]+)s/);
    return m ? `${m[1]}s` : f;
  });
  return createContactSheetPages(
    paths,
    outputPath,
    { cols: 3, cellWidth: 600, pageSize: 9, ...budget },
    0,
    labels
  );
}
async function createAssetContactSheet(assetsDir, outputPath, budget = {}) {
  if (!existsSync(assetsDir)) return [];
  const imageExts = /* @__PURE__ */ new Set([".png", ".jpg", ".jpeg", ".webp"]);
  const assetFiles = readdirSync(assetsDir).filter((f) => imageExts.has(extname(f).toLowerCase()) && !f.includes("contact-sheet")).sort();
  if (assetFiles.length === 0) return [];
  const paths = assetFiles.map((f) => join(assetsDir, f));
  return createContactSheetPages(paths, outputPath, {
    cols: 4,
    cellWidth: 480,
    labelMode: "filename",
    pageSize: 12,
    ...budget
  });
}
async function createSvgContactSheet(svgsDir, outputPath, assetsRootDir, budget = {}) {
  const dirsToScan = [svgsDir, assetsRootDir].filter(
    (d) => d !== void 0 && existsSync(d)
  );
  if (dirsToScan.length === 0) return [];
  const seen = /* @__PURE__ */ new Set();
  const svgPaths = [];
  for (const dir of dirsToScan) {
    for (const f of readdirSync(dir).filter((f2) => f2.endsWith(".svg")).sort()) {
      if (!seen.has(f)) {
        seen.add(f);
        svgPaths.push(join(dir, f));
      }
    }
  }
  if (svgPaths.length === 0) return [];
  const svgFileNames = svgPaths.map((p) => p.split("/").pop());
  const thumbSize = 200;
  const tmpDir = dirname(outputPath);
  const tmpPaths = [];
  const labels = [];
  for (let i = 0; i < svgPaths.length; i++) {
    if ((budget.remainingMs?.() ?? 1) <= 0) break;
    const svgPath = svgPaths[i];
    const tmpPath = join(tmpDir, `.thumb-${i}.png`);
    try {
      const svgBuf = readFileSync(svgPath);
      const thumb = await sharp(svgBuf).resize(thumbSize, thumbSize, {
        fit: "contain",
        background: { r: 245, g: 245, b: 245, alpha: 1 }
      }).flatten({ background: { r: 245, g: 245, b: 245 } }).png().toBuffer();
      writeCaptureFileSync(tmpPath, thumb);
      tmpPaths.push(tmpPath);
      labels.push(svgFileNames[i].replace(".svg", ""));
    } catch {
    }
  }
  if (tmpPaths.length === 0) return [];
  let results = [];
  try {
    results = await createContactSheetPages(
      tmpPaths,
      outputPath,
      {
        cols: 5,
        cellWidth: thumbSize,
        pageSize: 15,
        ...budget
      },
      0,
      labels
    );
  } finally {
    for (const tmp of tmpPaths) {
      try {
        unlinkSync(tmp);
      } catch {
      }
    }
  }
  return results;
}

export {
  createContactSheet,
  createScrollContactSheet,
  createSnapshotContactSheet,
  createAssetContactSheet,
  createSvgContactSheet
};
