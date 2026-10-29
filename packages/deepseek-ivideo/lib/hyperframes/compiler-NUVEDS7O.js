import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  AFTER_FONTS_SCRIPT_TYPE,
  AUDIO_GROUP_RENDER_ID_ATTR,
  FLATTENED_INNER_ROOT_STRIP_ATTRS,
  MEDIA_RENDER_ID_ATTR,
  RUNTIME_BOOTSTRAP_ATTR,
  addScenePartsManifest,
  assignBundledRuntimeCompositionIds,
  assignMediaRenderIds,
  buildVariablesByCompScript,
  bundleToSingleHtml,
  clampDurations,
  compileHtml,
  compileTimingAttrs,
  compositionStyle,
  cssStyleMergeKey,
  deferScriptsUntilFonts,
  emitMountedModuleScripts,
  emitRootCompositionVariableStyles,
  ensureExternalLinkTag,
  ensureExternalScriptTag,
  extractCompiledHtmlParityContract,
  extractResolvedMedia,
  headStyleRuns,
  injectDurations,
  injectScriptsAtHeadStart,
  injectScriptsIntoHtml,
  injectTagsAtHeadStart,
  inlineScriptRuns,
  inlineSubCompositions,
  insertBeforeCloseTag,
  insertRuntimeTag,
  isJavaScriptType,
  isRuntimeFileUrl,
  parseHTMLContent,
  prepareFlattenedInnerRoot,
  resolveTimings,
  scopeCssToComposition,
  shouldClampMediaDuration,
  shouldClampResolvedMediaDuration,
  stripEmbeddedRuntimeScripts,
  styleElementsFor,
  validateHyperframeHtmlContract,
  wrapScopedCompositionScript
} from "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import {
  parseHostVariableValues,
  readDeclaredDefaults
} from "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import {
  CSS_URL_RE,
  PATH_ATTRS,
  checkSubCompositionUsability,
  isNonRelativeUrl,
  isPathInside
} from "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-M2WBOQ2Q.js";
export {
  AFTER_FONTS_SCRIPT_TYPE,
  AUDIO_GROUP_RENDER_ID_ATTR,
  CSS_URL_RE,
  FLATTENED_INNER_ROOT_STRIP_ATTRS,
  MEDIA_RENDER_ID_ATTR,
  PATH_ATTRS,
  RUNTIME_BOOTSTRAP_ATTR,
  addScenePartsManifest,
  assignBundledRuntimeCompositionIds,
  assignMediaRenderIds,
  buildVariablesByCompScript,
  bundleToSingleHtml,
  checkSubCompositionUsability,
  clampDurations,
  compileHtml,
  compileTimingAttrs,
  compositionStyle,
  cssStyleMergeKey,
  deferScriptsUntilFonts,
  emitMountedModuleScripts,
  emitRootCompositionVariableStyles,
  ensureExternalLinkTag,
  ensureExternalScriptTag,
  extractCompiledHtmlParityContract,
  extractResolvedMedia,
  headStyleRuns,
  injectDurations,
  injectScriptsAtHeadStart,
  injectScriptsIntoHtml,
  injectTagsAtHeadStart,
  inlineScriptRuns,
  inlineSubCompositions,
  insertBeforeCloseTag,
  insertRuntimeTag,
  isJavaScriptType,
  isNonRelativeUrl,
  isPathInside,
  isRuntimeFileUrl,
  parseHTMLContent,
  parseHostVariableValues,
  prepareFlattenedInnerRoot,
  readDeclaredDefaults,
  resolveTimings,
  scopeCssToComposition,
  shouldClampMediaDuration,
  shouldClampResolvedMediaDuration,
  stripEmbeddedRuntimeScripts,
  styleElementsFor,
  validateHyperframeHtmlContract,
  wrapScopedCompositionScript
};
