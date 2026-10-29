import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/utils/bundleWithLocalizedFonts.ts
async function bundleWithLocalizedFonts(projectDir, localizeFonts = localizeWithProducer) {
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  const html = await bundleToSingleHtml(projectDir);
  return localizeFonts(html);
}
async function loadFontInjector() {
  try {
    const { loadProducer } = await import("./producer-H4OKVRTU.js");
    const mod = await loadProducer();
    return mod.injectDeterministicFontFaces ?? null;
  } catch {
    return null;
  }
}
var warnedFontLocalizationFailures = /* @__PURE__ */ new Set();
function __resetFontLocalizationWarningsForTests() {
  warnedFontLocalizationFailures.clear();
}
async function localizeWithProducer(html, loadInjector = loadFontInjector, warn = (m) => console.warn(`   ${c.warn("\u26A0")} ${m}`)) {
  const inject = await loadInjector();
  if (!inject) return html;
  try {
    return await inject(html);
  } catch (err) {
    const message = `Font localization failed; capturing with remote/fallback fonts instead: ${normalizeErrorMessage(err)}`;
    if (!warnedFontLocalizationFailures.has(message)) {
      warnedFontLocalizationFailures.add(message);
      warn(message);
    }
    return html;
  }
}
export {
  __resetFontLocalizationWarningsForTests,
  bundleWithLocalizedFonts,
  localizeWithProducer
};
