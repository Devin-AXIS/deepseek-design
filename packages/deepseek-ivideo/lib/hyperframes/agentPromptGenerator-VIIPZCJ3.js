import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  writeCaptureFileSync
} from "./chunk-MRF4AMKD.js";
import "./chunk-M2WBOQ2Q.js";

// src/capture/agentPromptGenerator.ts
import { readdirSync, existsSync } from "fs";
import { join } from "path";
function inferColorRole(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  if (isNaN(r) || isNaN(g) || isNaN(b)) return "color";
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const saturation = max === 0 ? 0 : (max - min) / max;
  if (luminance < 0.04) return "bg-dark";
  if (luminance > 0.9) return "bg-light";
  if (saturation > 0.4 && luminance > 0.05 && luminance < 0.7) return "accent";
  if (luminance < 0.2) return "surface-dark";
  if (luminance > 0.7) return "surface-light";
  return "neutral";
}
function generateAgentPrompt(outputDir, url, tokens, _animations, hasScreenshot, hasLottie, hasShaders, _catalogedAssets, _detectedLibraries) {
  const prompt = buildPrompt(outputDir, url, tokens, hasScreenshot, hasLottie, hasShaders);
  writeCaptureFileSync(join(outputDir, "AGENTS.md"), prompt, "utf-8");
  writeCaptureFileSync(join(outputDir, "CLAUDE.md"), prompt, "utf-8");
  writeCaptureFileSync(join(outputDir, ".cursorrules"), prompt, "utf-8");
}
function buildPrompt(outputDir, url, tokens, hasScreenshot, hasLottie, hasShaders) {
  const title = tokens.title || new URL(url).hostname.replace(/^www\./, "");
  const colorSummary = tokens.colors.slice(0, 10).map((hex) => `${hex} (${inferColorRole(hex)})`).join(", ");
  const fontSummary = tokens.fonts.map(
    (f) => f.family + (f.variable && f.weightRange ? ` (${f.weightRange[0]}-${f.weightRange[1]} variable)` : f.weights.length > 0 ? ` (${f.weights.join(",")})` : "")
  ).join(", ") || "none detected";
  function contactSheetRows(dir, baseFile, label) {
    const fullDir = join(outputDir, dir);
    if (!existsSync(fullDir)) return [];
    const baseName = baseFile.replace(/\.jpg$/, "");
    const escapedBase = baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const paginatedRe = new RegExp(`^${escapedBase}(?:-(\\d+))?\\.jpg$`);
    const all = readdirSync(fullDir).filter((f) => paginatedRe.test(f)).map((f) => ({ name: f, page: parseInt(f.match(paginatedRe)?.[1] ?? "0", 10) })).sort((a, b) => a.page - b.page).map((entry) => entry.name);
    if (all.length === 0) return [];
    if (all.length === 1) {
      return [`| \`${dir}/${all[0]}\` | ${label} |`];
    }
    return all.map((f, i) => `| \`${dir}/${f}\` | ${label} \u2014 page ${i + 1} of ${all.length} |`);
  }
  const tableRows = [];
  if (hasScreenshot) {
    const screenshotRows = contactSheetRows(
      "screenshots",
      "contact-sheet.jpg",
      "**View this first.** All scroll screenshots in labeled grid \u2014 see the entire page at a glance"
    );
    if (screenshotRows.length > 0) {
      tableRows.push(...screenshotRows);
    } else {
      tableRows.push(
        "| `screenshots/contact-sheet.jpg` | **View this first.** All scroll screenshots in one labeled grid. |"
      );
    }
    tableRows.push(
      "| `screenshots/scroll-*.png` | Individual viewport screenshots if you need detail on a specific section. |"
    );
  }
  tableRows.push(
    `| \`extracted/tokens.json\` | Design tokens: ${tokens.colors.length} colors, ${tokens.fonts.length} fonts, ${tokens.headings?.length ?? 0} headings, ${tokens.ctas?.length ?? 0} CTAs |`
  );
  if (existsSync(join(outputDir, "extracted", "design-styles.json"))) {
    tableRows.push(
      "| `extracted/design-styles.json` | Computed styles from live DOM: typography hierarchy, button/card/nav styles, spacing scale, border-radius, box shadows. Primary data source for DESIGN.md. |"
    );
  }
  tableRows.push(
    "| `extracted/asset-descriptions.md` | One-line description of every downloaded asset. Read this for asset selection \u2014 only open individual files for safe-zone checking. |"
  );
  tableRows.push(
    "| `extracted/visible-text.txt` | Page text in DOM order, prefixed with HTML tag (`[h1]`, `[p]`, `[a]`). Use as context \u2014 rephrase freely. |"
  );
  if (hasLottie) {
    tableRows.push(
      "| `extracted/lottie-manifest.json` | Lottie animations with previews at `assets/lottie/previews/`. |"
    );
  }
  if (hasShaders) {
    tableRows.push("| `extracted/shaders.json` | WebGL shader source (GLSL). |");
  }
  const assetSheetRows = contactSheetRows(
    "assets",
    "contact-sheet.jpg",
    "Downloaded images in labeled grid \u2014 view before opening individual files"
  );
  if (assetSheetRows.length > 0) {
    tableRows.push(...assetSheetRows);
  } else {
    tableRows.push("| `assets/contact-sheet.jpg` | All downloaded images in one labeled grid. |");
  }
  const svgSubdirRows = contactSheetRows(
    "assets/svgs",
    "contact-sheet.jpg",
    "SVGs rendered as thumbnails in labeled grid"
  );
  const svgRootRows = contactSheetRows(
    "assets",
    "contact-sheet-svgs.jpg",
    "SVGs rendered as thumbnails in labeled grid"
  );
  const svgRows = svgSubdirRows.length > 0 ? svgSubdirRows : svgRootRows;
  if (svgRows.length > 0) {
    tableRows.push(...svgRows);
  }
  tableRows.push("| `assets/` | Individual downloaded images, SVGs, and font files. |");
  const brandLines = [];
  brandLines.push(`- **Colors**: ${colorSummary || "see tokens.json"}`);
  brandLines.push(`- **Fonts**: ${fontSummary}`);
  return `# ${title}

Source: ${url}

To create a video from this capture, use the \`product-launch-video\` skill.

## What's in This Capture

| File | Contents |
|------|----------|
${tableRows.join("\n")}

## Brand Summary

${brandLines.join("\n")}
`;
}
export {
  generateAgentPrompt
};
