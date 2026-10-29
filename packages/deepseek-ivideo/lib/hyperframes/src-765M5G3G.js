import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  CURRENT_PLAN_PROTOCOL,
  DISTRIBUTED_RENDER_CAPABILITIES,
  PLAN_ARTIFACT_LAYOUT,
  PLAN_HASH_SCHEMA,
  PLAN_PROTOCOL_UNSUPPORTED,
  PLAN_PROTOCOL_V1,
  PLAN_PROTOCOL_V2,
  PLAN_SCHEMA_VERSION,
  PLAN_V2_ARTIFACT_LAYOUT,
  PLAN_V2_HASH_SCHEMA,
  PLAN_V2_INTEGRITY_UNRECOVERABLE,
  PLAN_V2_MATERIALIZATION_MARKER,
  PLAN_V2_SCHEMA_VERSION,
  PlanProtocolUnsupportedError,
  PlanV2IntegrityError,
  RENDER_JOB_DIR,
  RENDER_REQUEST_VERSION,
  RenderCancelledError,
  RenderQualityError,
  applyRenderWarningPolicy,
  assemble,
  assembleV2,
  collectRenderMedia,
  createConsoleLogger,
  createFileServer,
  createOwnedRenderDir,
  createPlanV2FromExecutionPlan,
  createPlanV2FromV1,
  createProducerApp,
  createRenderHandlers,
  createRenderJob,
  createRenderRequest,
  defaultLogger,
  distributedConfigFromRequest,
  executeRenderJob,
  getDistributedRenderCapabilities,
  getPlanV2ExecutionPlanHash,
  listAbandonedRenderDirs,
  listPlanV2ArtifactsForTarget,
  localizeRemoteFontFaces,
  localizeRemoteImageSources,
  localizeRemoteMediaSources,
  materializePlanV2Target,
  normalizeErrorMessage,
  parseRenderRequest,
  plan,
  planV2,
  planV2WithPublisher,
  prepareHyperframeLintBody,
  publishPlanV2FromExecutionPlan,
  publishPlanV2FromV1,
  readPlanProtocol,
  readPlanProtocolV1,
  readPlanV2Manifest,
  renderChunk,
  renderChunkV2,
  renderConfigFromRequest,
  renderRequestFromDistributedConfig,
  resolveRenderDebugDir,
  resolveRenderPaths,
  runHyperframeLint,
  serializeRenderRequest,
  startServer,
  validatePlanV2MaterializedTarget
} from "./chunk-ECSNC34W.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import {
  FONT_FETCH_FAILED,
  FONT_FETCH_UNAVAILABLE,
  FontFetchError,
  FontFetchUnavailableError,
  injectDeterministicFontFaces
} from "./chunk-RLSKTKCG.js";
import "./chunk-TJSTGSAW.js";
import "./chunk-FI4I7CME.js";
import "./chunk-U3TI3AWM.js";
import "./chunk-BZ56MTDX.js";
import {
  DEFAULT_CONFIG,
  captureFrame,
  captureFrameToBuffer,
  closeCaptureSession,
  createCaptureSession,
  createVideoFrameInjector,
  getCapturePerfSummary,
  getCompositionDuration,
  initializeSession,
  isTransientBrowserError,
  prepareCaptureSessionForReuse,
  resolveConfig
} from "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  quantizeTimeToFrame
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
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
import "./chunk-3GXQPCJC.js";
import "./chunk-M2WBOQ2Q.js";
export {
  CURRENT_PLAN_PROTOCOL,
  DEFAULT_CONFIG,
  DISTRIBUTED_RENDER_CAPABILITIES,
  FONT_FETCH_FAILED,
  FONT_FETCH_UNAVAILABLE,
  FontFetchError,
  FontFetchUnavailableError,
  PLAN_ARTIFACT_LAYOUT,
  PLAN_HASH_SCHEMA,
  PLAN_PROTOCOL_UNSUPPORTED,
  PLAN_PROTOCOL_V1,
  PLAN_PROTOCOL_V2,
  PLAN_SCHEMA_VERSION,
  PLAN_V2_ARTIFACT_LAYOUT,
  PLAN_V2_HASH_SCHEMA,
  PLAN_V2_INTEGRITY_UNRECOVERABLE,
  PLAN_V2_MATERIALIZATION_MARKER,
  PLAN_V2_SCHEMA_VERSION,
  PlanProtocolUnsupportedError,
  PlanV2IntegrityError,
  RENDER_JOB_DIR,
  RENDER_REQUEST_VERSION,
  RenderCancelledError,
  RenderQualityError,
  applyRenderWarningPolicy,
  assemble,
  assembleV2,
  captureFrame,
  captureFrameToBuffer,
  closeCaptureSession,
  collectRenderMedia,
  createCaptureSession,
  createConsoleLogger,
  createFileServer,
  createOwnedRenderDir,
  createPlanV2FromExecutionPlan,
  createPlanV2FromV1,
  createProducerApp,
  createRenderHandlers,
  createRenderJob,
  createRenderRequest,
  createVideoFrameInjector,
  defaultLogger,
  distributedConfigFromRequest,
  executeRenderJob,
  getCapturePerfSummary,
  getCompositionDuration,
  getDistributedRenderCapabilities,
  getPlanV2ExecutionPlanHash,
  initializeSession,
  injectDeterministicFontFaces,
  isTransientBrowserError,
  listAbandonedRenderDirs,
  listPlanV2ArtifactsForTarget,
  localizeRemoteFontFaces,
  localizeRemoteImageSources,
  localizeRemoteMediaSources,
  materializePlanV2Target,
  normalizeErrorMessage,
  parseRenderRequest,
  plan,
  planV2,
  planV2WithPublisher,
  prepareCaptureSessionForReuse,
  prepareHyperframeLintBody,
  publishPlanV2FromExecutionPlan,
  publishPlanV2FromV1,
  quantizeTimeToFrame,
  readPlanProtocol,
  readPlanProtocolV1,
  readPlanV2Manifest,
  renderChunk,
  renderChunkV2,
  renderConfigFromRequest,
  renderRequestFromDistributedConfig,
  resolveConfig,
  resolveRenderDebugDir,
  resolveRenderPaths,
  runHyperframeLint,
  serializeRenderRequest,
  startServer,
  validatePlanV2MaterializedTarget
};
