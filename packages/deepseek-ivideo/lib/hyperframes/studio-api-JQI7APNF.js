import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import "./chunk-XUHOIDKG.js";
import {
  MAX_UPLOAD_BYTES,
  MIME_TYPES,
  PREVIEW_BUNDLE_OPTIONS,
  affectsPreview,
  applyFileMutations,
  buildSubCompositionHtml,
  clearElementScreenshotIsolation,
  compositionsAffectedBy,
  createBackgroundRemovalJob,
  createPreviewDocumentStore,
  createStudioApi,
  duplicateElementInHtml,
  getElementScreenshotClip,
  getMimeType,
  loadRegistryPreviewAssetFromRoot,
  loadRegistryPreviewFromRoot,
  requestSubPath,
  reviewVideoRuntime,
  stampProjectHfIds,
  thumbnailDeviceScaleFactor
} from "./chunk-BZIGYBUM.js";
import {
  dedupeClonedCompositionId,
  findTargetElement,
  parseSourceDocument,
  patchElementInHtml,
  removeElementFromHtml,
  splitElementInHtml
} from "./chunk-R2DYALSM.js";
import {
  DEFAULT_HISTORY_ROOT,
  DELETED_VERSION,
  HistoryBusyError,
  HistoryClosedError,
  HistoryIdError,
  MAX_WINDOW_IDLE_MS,
  START,
  STUDIO_SIGNATURE_MANIFEST_PATHS,
  UNDO_MODES,
  affectsProjectSignature,
  consumeFileWriteReceipt,
  createProjectSignature,
  fileContentVersion,
  historyCache,
  identifyFileWrite,
  listProjectHistories,
  openProjectHistory,
  pruneGoneProjectHistories,
  settledFileTag
} from "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import {
  CACHE_DIR_NAME,
  cleanupProxyCache
} from "./chunk-PVPXIJ5Z.js";
import {
  STUDIO_MOTION_PATH,
  createStudioMotionRenderBodyScript,
  walkDir
} from "./chunk-YGSQ65SQ.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-MX7ESQNX.js";
import {
  STUDIO_MANUAL_EDITS_PATH,
  createStudioManualEditsRenderBodyScript,
  createStudioPositionSeekReapplyScript
} from "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import {
  isSafePath
} from "./chunk-2Z55WR76.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-M2WBOQ2Q.js";
export {
  DEFAULT_HISTORY_ROOT,
  DELETED_VERSION,
  START as HISTORY_START,
  HistoryBusyError,
  HistoryClosedError,
  HistoryIdError,
  MAX_UPLOAD_BYTES,
  MAX_WINDOW_IDLE_MS,
  MIME_TYPES,
  PREVIEW_BUNDLE_OPTIONS,
  CACHE_DIR_NAME as PROXY_CACHE_DIR_NAME,
  STUDIO_MANUAL_EDITS_PATH,
  STUDIO_MOTION_PATH,
  STUDIO_SIGNATURE_MANIFEST_PATHS,
  UNDO_MODES,
  affectsPreview,
  affectsProjectSignature,
  applyFileMutations,
  buildSubCompositionHtml,
  cleanupProxyCache,
  clearElementScreenshotIsolation,
  compositionsAffectedBy,
  consumeFileWriteReceipt,
  createBackgroundRemovalJob,
  createPreviewDocumentStore,
  createProjectSignature,
  createStudioApi,
  createStudioManualEditsRenderBodyScript,
  createStudioMotionRenderBodyScript,
  createStudioPositionSeekReapplyScript,
  dedupeClonedCompositionId,
  duplicateElementInHtml,
  fileContentVersion,
  findTargetElement,
  getElementScreenshotClip,
  getMimeType,
  historyCache,
  identifyFileWrite,
  isSafePath,
  listProjectHistories,
  loadRegistryPreviewAssetFromRoot,
  loadRegistryPreviewFromRoot,
  openProjectHistory,
  parseSourceDocument,
  patchElementInHtml,
  pruneGoneProjectHistories,
  removeElementFromHtml,
  requestSubPath,
  reviewVideoRuntime,
  settledFileTag,
  splitElementInHtml,
  stampProjectHfIds,
  thumbnailDeviceScaleFactor,
  walkDir
};
