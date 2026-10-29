import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  flush,
  shouldTrack,
  trackEvent
} from "./chunk-UG7OZF2L.js";
import {
  getPowerState
} from "./chunk-GQJZORQP.js";
import {
  CliRuntimeError
} from "./chunk-PBN6GBJE.js";
import {
  readConfig
} from "./chunk-2SBJMKLH.js";

// ../core/dist/telemetryRedaction.js
var MAX_TELEMETRY_STRING_LENGTH = 240;
function truncateTelemetryString(value, maxLength) {
  if (value.length <= maxLength)
    return value;
  return `${value.slice(0, maxLength - 1)}\u2026`;
}
function redactUrlQueryStrings(value) {
  return value.replace(/\b(https?:\/\/[^\s?]+)\?[^\s]*/g, "$1?\u2026");
}
var SEGMENT = String.raw`[^\s/\\'"]+`;
var SEGMENT_NODOT = String.raw`[^\s/\\'".]+`;
var TOKEN_TAIL = String.raw`[^\s'")]*`;
var ABSOLUTE_PATH = new RegExp(String.raw`(?<![:\w/\\])(?:[A-Za-z]:)?(?:[\\/]${SEGMENT}){2,}${TOKEN_TAIL}`, "g");
var RELATIVE_PATH = new RegExp(String.raw`(?<![\w/\\.])\.{1,2}(?:[\\/]${SEGMENT})+${TOKEN_TAIL}`, "g");
var ASSET_BASENAME = /(?<![\w/\\])[^\s/\\'"]+\.(?:mp4|mov|mkv|webm|avi|m4v|mpe?g|ts|mp3|wav|aac|m4a|flac|ogg|opus|png|jpe?g|gif|webp|svg|html?|json|srt|vtt|ass)\b/gi;
var BARE_RELATIVE_PATH = new RegExp([
  // Two or more separators: `customer/acme/video.mp4`. No extension needed —
  // that much structure is already a path.
  String.raw`(?<![^\s'\"(=,\[])(?:${SEGMENT}[\\/]){2,}${SEGMENT}${TOKEN_TAIL}`,
  // One separator, but the last segment carries a file extension:
  // `assets/bgm.mp3`. That segment is dot-free on purpose — SEGMENT includes
  // `.`, so a greedy one swallows the extension this rule needs.
  String.raw`(?<![^\s'\"(=,\[])${SEGMENT}[\\/]${SEGMENT_NODOT}\.\w{1,8}\b${TOKEN_TAIL}`
].join("|"), "g");
function redactFilePaths(value) {
  return value.replace(/file:\/\/[^\s'")]+/g, "[file-url]").replace(RELATIVE_PATH, "[path]").replace(BARE_RELATIVE_PATH, "[path]").replace(ABSOLUTE_PATH, "[path]").replace(ASSET_BASENAME, "[file]");
}
function redactTelemetryString(value, maxLength = MAX_TELEMETRY_STRING_LENGTH) {
  return truncateTelemetryString(redactFilePaths(redactUrlQueryStrings(value)), maxLength);
}

// src/utils/feedbackRating.ts
var FEEDBACK_RATING_SCALE = 10;
function parseFeedbackRating(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const rating = Number(trimmed);
  if (!Number.isInteger(rating)) return null;
  if (rating < 0 || rating > FEEDBACK_RATING_SCALE) return null;
  return rating;
}

// src/telemetry/events.ts
function powerStateFields() {
  if (!shouldTrack()) return {};
  const power = getPowerState();
  return {
    on_battery: power.on_battery ?? void 0,
    low_power_mode: power.low_power_mode ?? void 0
  };
}
function runIdField(runId) {
  return runId !== void 0 ? { run_id: runId } : {};
}
function renderObservabilityEventProperties(props) {
  return {
    sub_timeline_wait: props.subTimelineWait,
    observability_render_job_id: props.observabilityRenderJobId,
    observability_composition_hash: props.observabilityCompositionHash,
    observability_event_count: props.observabilityEventCount,
    observability_last_phase: props.observabilityLastPhase,
    observability_last_status: props.observabilityLastStatus,
    observability_failed_phase: props.observabilityFailedPhase,
    browser_diagnostic_count: props.browserDiagnosticCount,
    browser_diagnostic_errors: props.browserDiagnosticErrors,
    browser_diagnostic_page_errors: props.browserDiagnosticPageErrors,
    browser_diagnostic_request_failed: props.browserDiagnosticRequestFailed,
    browser_diagnostic_http_errors: props.browserDiagnosticHttpErrors,
    browser_diagnostic_navigation_starts: props.browserDiagnosticNavigationStarts,
    browser_diagnostic_navigation_failures: props.browserDiagnosticNavigationFailures,
    browser_diagnostic_console_errors: props.browserDiagnosticConsoleErrors,
    browser_diagnostic_console_warnings: props.browserDiagnosticConsoleWarnings,
    capture_mode: props.captureMode,
    capture_force_screenshot: props.captureForceScreenshot,
    capture_worker_count: props.captureWorkerCount,
    capture_use_streaming_encode: props.captureUseStreamingEncode,
    capture_use_layered_composite: props.captureUseLayeredComposite,
    capture_use_page_side_compositing: props.captureUsePageSideCompositing,
    capture_has_hdr_content: props.captureHasHdrContent,
    capture_browser_gpu_mode: props.captureBrowserGpuMode,
    capture_protocol_timeout_ms: props.captureProtocolTimeoutMs,
    capture_page_navigation_timeout_ms: props.capturePageNavigationTimeoutMs,
    capture_player_ready_timeout_ms: props.capturePlayerReadyTimeoutMs,
    capture_transient_retries: props.captureTransientRetries,
    capture_memory_exhaustion_detected: props.captureMemoryExhaustionDetected,
    de_worker_inversion: props.captureDeWorkerInversion,
    de_pre_inversion_workers: props.captureDePreInversionWorkers,
    composition_element_count: props.captureCompositionElementCount,
    composition_element_count_source: props.captureCompositionElementCountSource,
    composition_element_tags: props.captureCompositionElementTags,
    aroll_video_count: props.captureArollVideoCount,
    heygen_video_count: props.captureHeygenVideoCount,
    adapters_used: props.captureAdaptersUsed,
    audio_count: props.captureAudioCount,
    image_count: props.captureImageCount,
    sub_composition_count: props.captureSubCompositionCount,
    audio_group_count: props.captureAudioGroupCount,
    color_grading_count: props.captureColorGradingCount,
    has_lut: props.captureHasLut,
    root_body_mismatch: props.captureRootBodyMismatch,
    root_body_delta_px_bucket: props.captureRootBodyDeltaPxBucket,
    de_short_band: props.captureDeShortBand,
    de_parallel_router: props.captureDeParallelRouter,
    gpu_renderer: props.captureDeGpuRenderer,
    de_pre_router_workers: props.captureDePreRouterWorkers,
    de_self_verify_fallback: props.captureDeSelfVerifyFallback,
    de_fallback_reason: props.captureDeFallbackReason,
    de_fallback_failed_db: props.captureDeFallbackFailedDb,
    de_fallback_frame_index: props.captureDeFallbackFrameIndex,
    de_fallback_threshold_db: props.captureDeFallbackThresholdDb,
    capture_parallel_stream: props.captureParallelStream,
    chrome_browser_rss_peak_mb: props.captureChromeBrowserRssPeakMb,
    chrome_renderer_rss_peak_mb: props.captureChromeRendererRssPeakMb,
    chrome_rss_last_mb: props.captureChromeRssLastMb,
    gpu_process_seen_last_sample: props.captureChromeGpuProcessSeenLastSample,
    chrome_memory_samples: props.captureChromeMemorySamples,
    capture_path: props.captureCapturePath,
    segment_index: props.captureSegmentIndex,
    segment_retries: props.captureSegmentRetries,
    observability_extract_video_count: props.observabilityExtractVideoCount,
    observability_extracted_video_count: props.observabilityExtractedVideoCount,
    observability_extract_total_frames: props.observabilityExtractTotalFrames,
    observability_extract_max_frames_per_video: props.observabilityExtractMaxFramesPerVideo,
    observability_extract_avg_frames_per_video: props.observabilityExtractAvgFramesPerVideo,
    observability_extract_vfr_probe_ms: props.observabilityExtractVfrProbeMs,
    observability_extract_vfr_preflight_ms: props.observabilityExtractVfrPreflightMs,
    observability_extract_vfr_preflight_count: props.observabilityExtractVfrPreflightCount,
    observability_extract_cache_hits: props.observabilityExtractCacheHits,
    observability_extract_cache_misses: props.observabilityExtractCacheMisses,
    observability_init_duration_ms: props.observabilityInitDurationMs,
    observability_init_tween_count: props.observabilityInitTweenCount,
    observability_init_element_count: props.observabilityInitElementCount
  };
}
function directOrCapture(direct, capture) {
  return direct ?? capture;
}
function renderOutputShapeEventProperties(props) {
  return {
    output_resolution_preset: props.outputResolutionPreset,
    output_format: props.outputFormat,
    hdr_mode: props.hdrMode,
    video_frame_format: props.videoFrameFormat,
    gif_fps_capped: props.gifFpsCapped
  };
}
function renderEnvironmentEventProperties(props) {
  return {
    ffmpeg_version_major: props.ffmpegVersionMajor,
    browser_version_major: props.browserVersionMajor,
    browser_build: props.browserInstall?.build,
    browser_path_ascii: props.browserInstall?.pathAscii,
    browser_path_length: props.browserInstall?.pathLength,
    browser_path_drive: props.browserInstall?.drive
  };
}
function redactTelemetryMessage(value) {
  return redactTelemetryString(value);
}
function trackCommand(command, runId) {
  trackEvent("cli_command", {
    command,
    ...runIdField(runId)
  });
}
var MAX_REPORTED_ITEM_NAMES = 40;
function catalogEventProperties(usage) {
  if (!usage) return {};
  if (usage.manifestUnreadable) return { registry_manifest_unreadable: true };
  const names = usage.installed.slice(0, MAX_REPORTED_ITEM_NAMES);
  const reportedNames = new Set(names);
  const used = usage.usedBlocks.filter((name) => reportedNames.has(name));
  const truncated = names.length < usage.installed.length;
  return {
    registry_item_count: usage.installed.length,
    registry_blocks_used_count: usage.usedBlocks.length,
    // Say when the name lists are a window rather than the whole set. Without
    // it a name-joining drop-off query silently reads a truncated project as
    // all-abandoned: the used blocks can all sit past the cap, leaving an empty
    // `registry_blocks_used` against a non-zero count.
    ...truncated ? { registry_items_truncated: true } : {},
    ...names.length > 0 ? { registry_items: names.join(",") } : {},
    ...used.length > 0 ? { registry_blocks_used: used.join(",") } : {}
  };
}
function trackRenderComplete(props) {
  trackEvent(
    "render_complete",
    {
      // Spread first: fields below wrapped in directOrCapture() prefer
      // perfSummary.drawElement, present only on the CLI's own render.ts path.
      // studioRenderTelemetry.ts never populates drawElement, so without the
      // fallback the explicit key still wins the spread with an undefined.
      ...renderObservabilityEventProperties(props),
      chrome_browser_rss_peak_mb: props.chromeBrowserRssPeakMb ?? props.captureChromeBrowserRssPeakMb,
      chrome_renderer_rss_peak_mb: props.chromeRendererRssPeakMb ?? props.captureChromeRendererRssPeakMb,
      chrome_rss_last_mb: props.chromeRssLastMb ?? props.captureChromeRssLastMb,
      gpu_process_seen_last_sample: props.chromeGpuProcessSeenLastSample ?? props.captureChromeGpuProcessSeenLastSample,
      chrome_memory_samples: props.chromeMemorySamples ?? props.captureChromeMemorySamples,
      duration_ms: props.durationMs,
      fps: props.fps,
      quality: props.quality,
      authoring_skill: props.authoringSkill,
      authoring_skill_source: props.authoringSkillSource,
      authoring_skill_invalid: props.authoringSkillInvalid,
      hf_env_overrides: props.hfEnvOverrides ?? [],
      ...catalogEventProperties(props.catalogUsage),
      workers: props.workers,
      workers_bound_by: props.workersBoundBy,
      workers_cpu_based: props.workersCpuBased,
      workers_memory_based: props.workersMemoryBased,
      workers_heap_based: props.workersHeapBased,
      workers_frame_based: props.workersFrameBased,
      workers_heap_limit_mb: props.workersHeapLimitMb,
      workers_exceed_heap_advisory: props.workersExceedHeapAdvisory,
      docker: props.docker,
      gpu: props.gpu,
      static_dedup_enabled: props.staticDedupEnabled,
      static_dedup_armed: props.staticDedupArmed,
      static_dedup_skip_reason: props.staticDedupSkipReason,
      static_dedup_predicted_frames: props.staticDedupPredictedFrames,
      static_dedup_reused_frames: props.staticDedupReusedFrames,
      begin_frame_no_damage_frames: props.beginFrameNoDamageFrames,
      begin_frame_has_damage_frames: props.beginFrameHasDamageFrames,
      de_capture_mode: props.deCaptureMode,
      vfx_host_count: props.vfxHostCount,
      vfx_capture: props.vfxCapture,
      vfx_types: props.vfxTypes,
      de_compile_gate: props.deCompileGate,
      de_clamp_reason: props.deClampReason,
      de_worker_inversion: directOrCapture(props.deWorkerInversion, props.captureDeWorkerInversion),
      de_pre_inversion_workers: directOrCapture(
        props.dePreInversionWorkers,
        props.captureDePreInversionWorkers
      ),
      composition_element_count: directOrCapture(
        props.compositionElementCount,
        props.captureCompositionElementCount
      ),
      composition_element_count_source: directOrCapture(
        props.compositionElementCountSource,
        props.captureCompositionElementCountSource
      ),
      composition_element_tags: directOrCapture(
        props.compositionElementTags,
        props.captureCompositionElementTags
      ),
      aroll_video_count: directOrCapture(props.arollVideoCount, props.captureArollVideoCount),
      heygen_video_count: directOrCapture(props.heygenVideoCount, props.captureHeygenVideoCount),
      adapters_used: directOrCapture(props.adaptersUsed, props.captureAdaptersUsed),
      audio_count: directOrCapture(props.audioCount, props.captureAudioCount),
      image_count: directOrCapture(props.imageCount, props.captureImageCount),
      sub_composition_count: directOrCapture(
        props.subCompositionCount,
        props.captureSubCompositionCount
      ),
      audio_group_count: directOrCapture(props.audioGroupCount, props.captureAudioGroupCount),
      color_grading_count: directOrCapture(props.colorGradingCount, props.captureColorGradingCount),
      has_lut: directOrCapture(props.hasLut, props.captureHasLut),
      root_body_mismatch: directOrCapture(props.rootBodyMismatch, props.captureRootBodyMismatch),
      root_body_delta_px_bucket: directOrCapture(
        props.rootBodyDeltaPxBucket,
        props.captureRootBodyDeltaPxBucket
      ),
      de_short_band: directOrCapture(props.deShortBand, props.captureDeShortBand),
      de_parallel_router: directOrCapture(props.deParallelRouter, props.captureDeParallelRouter),
      de_pre_router_workers: directOrCapture(
        props.dePreRouterWorkers,
        props.captureDePreRouterWorkers
      ),
      de_gate_reason: props.deGateReason,
      gpu_renderer: directOrCapture(props.gpuRenderer, props.captureDeGpuRenderer),
      de_worker_encode: props.deWorkerEncode,
      de_verify_armed: props.deVerifyArmed,
      de_verify_checked: props.deVerifyChecked,
      de_verify_min_db: props.deVerifyMinDb,
      de_verify_init_ms: props.deVerifyInitMs,
      de_self_verify_fallback: directOrCapture(
        props.deSelfVerifyFallback,
        props.captureDeSelfVerifyFallback
      ),
      de_fallback_reason: directOrCapture(props.deFallbackReason, props.captureDeFallbackReason),
      de_fallback_failed_db: directOrCapture(
        props.deFallbackFailedDb,
        props.captureDeFallbackFailedDb
      ),
      de_fallback_frame_index: directOrCapture(
        props.deFallbackFrameIndex,
        props.captureDeFallbackFrameIndex
      ),
      de_fallback_threshold_db: directOrCapture(
        props.deFallbackThresholdDb,
        props.captureDeFallbackThresholdDb
      ),
      de_blank_suspects: props.deBlankSuspects,
      de_blank_deterministic_accepts: props.deBlankDeterministicAccepts,
      de_blank_recaptures: props.deBlankRecaptures,
      de_boundary_frames: props.deBoundaryFrames,
      de_ncpr_fallbacks: props.deNcprFallbacks,
      de_frame_timeouts: props.deFrameTimeouts,
      ...powerStateFields(),
      source: props.source ?? "cli",
      ...renderOutputShapeEventProperties(props),
      ...renderEnvironmentEventProperties(props),
      composition_duration_ms: props.compositionDurationMs,
      composition_width: props.compositionWidth,
      composition_height: props.compositionHeight,
      total_frames: props.totalFrames,
      speed_ratio: props.speedRatio,
      capture_avg_ms: props.captureAvgMs,
      capture_p50_ms: props.captureP50Ms,
      video_count: props.videoCount,
      capture_peak_ms: props.capturePeakMs,
      peak_memory_mb: props.peakMemoryMb,
      memory_free_mb: props.memoryFreeMb,
      tmp_peak_bytes: props.tmpPeakBytes,
      stage_compile_ms: props.stageCompileMs,
      stage_video_extract_ms: props.stageVideoExtractMs,
      stage_audio_process_ms: props.stageAudioProcessMs,
      stage_capture_ms: props.stageCaptureMs,
      stage_capture_setup_ms: props.stageCaptureSetupMs,
      stage_capture_frame_ms: props.stageCaptureFrameMs,
      stage_encode_ms: props.stageEncodeMs,
      stage_assemble_ms: props.stageAssembleMs,
      extract_resolve_ms: props.extractResolveMs,
      extract_hdr_probe_ms: props.extractHdrProbeMs,
      extract_hdr_preflight_ms: props.extractHdrPreflightMs,
      extract_hdr_preflight_count: props.extractHdrPreflightCount,
      extract_vfr_probe_ms: props.extractVfrProbeMs,
      extract_vfr_preflight_ms: props.extractVfrPreflightMs,
      extract_vfr_preflight_count: props.extractVfrPreflightCount,
      extract_phase3_ms: props.extractPhase3Ms,
      extract_cache_hits: props.extractCacheHits,
      extract_cache_misses: props.extractCacheMisses
    },
    props.distinctId
  );
  void flush();
}
function trackRenderError(props) {
  trackEvent(
    "render_error",
    {
      fps: props.fps,
      quality: props.quality,
      authoring_skill: props.authoringSkill,
      authoring_skill_source: props.authoringSkillSource,
      authoring_skill_invalid: props.authoringSkillInvalid,
      hf_env_overrides: props.hfEnvOverrides ?? [],
      docker: props.docker,
      workers: props.workers,
      gpu: props.gpu,
      source: props.source ?? "cli",
      failed_stage: props.failedStage,
      error_name: props.errorName,
      failed_stage_code: props.failedStageCode,
      error_message: props.errorMessage ? redactTelemetryMessage(props.errorMessage) : void 0,
      elapsed_ms: props.elapsedMs,
      ...renderOutputShapeEventProperties(props),
      ...renderEnvironmentEventProperties(props),
      peak_memory_mb: props.peakMemoryMb,
      memory_free_mb: props.memoryFreeMb,
      ...powerStateFields(),
      // gpu_renderer arrives via renderObservabilityEventProperties below:
      // on the failure path perfSummary is never built, so live capture
      // observability is the only source. Backend attribution matters MOST
      // here — a win32 D3D11 crash is what the rollout is watching for.
      ...renderObservabilityEventProperties(props)
    },
    props.distinctId
  );
  void flush();
}
function trackRenderObservation(props) {
  trackEvent("render_observation", {
    source: props.source ?? "cli",
    render_job_id: props.renderJobId,
    phase: props.phase,
    status: props.status,
    composition_hash: props.compositionHash,
    elapsed_ms: props.elapsedMs,
    duration_ms: props.durationMs,
    message: props.message ? redactTelemetryMessage(props.message) : void 0,
    worker_count: props.workerCount,
    force_screenshot: props.forceScreenshot,
    use_streaming_encode: props.useStreamingEncode,
    use_layered_composite: props.useLayeredComposite,
    use_page_side_compositing: props.usePageSideCompositing,
    has_hdr_content: props.hasHdrContent,
    capture_mode: props.captureMode,
    capture_operation: props.captureOperation,
    frames_completed: props.framesCompleted,
    total_frames: props.totalFrames,
    heartbeat_index: props.heartbeatIndex,
    stage_elapsed_ms: props.stageElapsedMs,
    video_count: props.videoCount,
    extracted_video_count: props.extractedVideoCount,
    total_frames_extracted: props.totalFramesExtracted,
    max_frames_per_video: props.maxFramesPerVideo,
    avg_frames_per_extracted_video: props.avgFramesPerExtractedVideo,
    vfr_preflight_count: props.vfrPreflightCount,
    vfr_preflight_ms: props.vfrPreflightMs,
    extract_cache_hits: props.cacheHits,
    extract_cache_misses: props.cacheMisses
  });
}
function trackInitTemplate(templateId, props) {
  trackEvent("init_template", { template: templateId, tailwind: props?.tailwind });
}
function trackRegistryItemAdded(props) {
  trackEvent("registry_item_added", {
    item: props.item,
    item_type: props.itemType,
    requested: props.requested,
    source: props.source
  });
}
function trackBrowserInstall() {
  trackEvent("browser_install", {});
}
function trackAuthLoginStarted(method, distinctId) {
  trackEvent("auth_login_started", { method }, distinctId);
}
function trackAuthLoginCompleted(method, distinctId) {
  trackEvent("auth_login_completed", { method }, distinctId);
}
function trackAuthLoginFailed(method, reason, distinctId) {
  trackEvent("auth_login_failed", { method, reason }, distinctId);
}
function identifyUser(distinctId) {
  if (!distinctId) return;
  trackEvent("$identify", { $anon_distinct_id: readConfig().anonymousId }, distinctId);
}
function trackRenderPreflightRejected(props) {
  trackEvent("render_preflight_rejected", { kind: props.kind });
}
function trackCliError(props) {
  trackEvent("cli_error", {
    error_name: props.error_name,
    // Redact before truncating — CLI messages and stack traces carry absolute
    // install paths (/Users/...), cache dirs, and user-supplied args. Same
    // redaction the render_* events already apply.
    error_message: redactTelemetryMessage(props.error_message).slice(0, 1e3),
    stack_trace: props.stack_trace ? redactTelemetryMessage(props.stack_trace).slice(0, 2e3) : void 0,
    command: props.command,
    kind: props.kind,
    endpoint: props.endpoint
  });
}
function trackFigmaImport(props) {
  trackEvent("figma_import", {
    phase: props.phase,
    duration_ms: props.durationMs,
    ...props.reused !== void 0 ? { reused: props.reused } : {},
    ...props.tokensMode !== void 0 ? { tokens_mode: props.tokensMode } : {},
    ...props.entryCount !== void 0 ? { entry_count: props.entryCount } : {},
    ...props.unresolvedBindings !== void 0 ? { unresolved_bindings: props.unresolvedBindings } : {},
    ...props.rasterizedNodes !== void 0 ? { rasterized_nodes: props.rasterizedNodes } : {},
    ...props.rasterizeFailures !== void 0 ? { rasterize_failures: props.rasterizeFailures } : {}
  });
}
var reportedFailures = /* @__PURE__ */ new WeakSet();
function trackCommandFailure(command, err, overrides = {}) {
  let failure = err;
  while (failure instanceof CliRuntimeError && failure.cause !== void 0) failure = failure.cause;
  if (typeof failure === "object" && failure !== null) {
    if (reportedFailures.has(failure)) return;
    reportedFailures.add(failure);
  }
  const error = failure instanceof Error ? failure : new Error(String(failure));
  trackCliError({
    error_name: overrides.error_name ?? error.name,
    error_message: error.message,
    stack_trace: error.stack,
    command,
    kind: "command_error",
    endpoint: overrides.endpoint
  });
}
function trackTranscribeUnavailable(props) {
  trackEvent("transcribe_unavailable", { optional: props.optional });
}
function trackCompareSheet(props) {
  trackEvent("media_use_compare", {
    command: props.command,
    cells: props.cells,
    truncated: props.truncated,
    total: props.total,
    render_ready_timed_out: props.renderReadyTimedOut
  });
}
function trackHistoryAction(props) {
  trackEvent("cli_history", props);
}
function trackSkillsInstallSkipped(props) {
  trackEvent("cli skill install skipped", { reason: props.reason });
}
function trackFeedbackComment(props) {
  trackEvent("cli_feedback_comment", {
    comment: props.comment,
    ...props.doctorSummary ? { doctor_summary: props.doctorSummary } : {},
    ...props.feedbackId ? { feedback_id: props.feedbackId } : {},
    ...props.recentRenderIds?.length ? { recent_render_ids: props.recentRenderIds.join(",") } : {}
  });
}
function trackRenderFeedback(props) {
  trackEvent("cli_render_feedback", {
    rating: props.rating,
    rating_scale: FEEDBACK_RATING_SCALE,
    ...props.comment ? { comment: props.comment } : {},
    ...props.renderDurationMs !== void 0 ? { render_duration_ms: props.renderDurationMs } : {},
    ...props.doctorSummary ? { doctor_summary: props.doctorSummary } : {},
    ...props.feedbackId ? { feedback_id: props.feedbackId } : {},
    // Comma-joined: EventProperties values are scalars only.
    ...props.recentRenderIds?.length ? { recent_render_ids: props.recentRenderIds.join(",") } : {}
  });
}
function trackCatalogSearchMiss(props) {
  trackEvent("cli_catalog_search_miss", {
    query: props.query,
    ...props.wanted ? { wanted: props.wanted } : {},
    ...props.tier ? { tier: props.tier } : {}
  });
}
function trackCommandResult(props) {
  trackEvent("cli_command_result", {
    command: props.command,
    success: props.success,
    exit_code: props.exitCode,
    duration_ms: props.durationMs,
    ...runIdField(props.runId)
  });
}
function trackCheckReport(props) {
  trackEvent("check_report", {
    gate_contrast: props.contrastGate,
    gate_motion: props.motionGate,
    gate_caption_zone: props.captionZoneGate,
    gate_frame_check: props.frameCheckGate,
    gate_snapshots: props.snapshotsGate,
    lint_errors: props.lintErrors,
    lint_warnings: props.lintWarnings,
    runtime_errors: props.runtimeErrors,
    runtime_warnings: props.runtimeWarnings,
    layout_errors: props.layoutErrors,
    layout_warnings: props.layoutWarnings,
    motion_errors: props.motionErrors,
    motion_warnings: props.motionWarnings,
    contrast_errors: props.contrastErrors,
    contrast_warnings: props.contrastWarnings,
    launch_settle_ms: props.launchSettleMs,
    seek_loop_ms: props.seekLoopMs,
    contrast_ms: props.contrastMs,
    grid_points: props.gridPoints,
    contrast_points: props.contrastPoints,
    ok: props.ok,
    exit_code: props.exitCode,
    ...runIdField(props.runId)
  });
}
function trackLintReport(props) {
  trackEvent("lint_report", {
    command: props.command,
    duration_ms: Math.round(props.durationMs),
    files_scanned: props.filesScanned,
    error_count: props.errorCount,
    warning_count: props.warningCount,
    info_count: props.infoCount,
    codes: Object.keys(props.codeCounts).sort(),
    code_counts: props.codeCounts,
    rule_group_ms: props.ruleGroupMs,
    slowest_rule: props.slowestRule,
    slowest_rule_ms: Math.round(props.slowestRuleMs),
    rule_count: props.ruleCount,
    rule_group_counts: props.ruleGroupCounts,
    ...runIdField(props.runId)
  });
}
function trackLintRuleStreak(props) {
  trackEvent("lint_rule_streak", {
    code: props.code,
    severity: props.severity,
    edits: props.edits,
    cleared: props.cleared,
    command: props.command,
    ...runIdField(props.runId)
  });
}

export {
  parseFeedbackRating,
  trackCommand,
  trackRenderComplete,
  trackRenderError,
  trackRenderObservation,
  trackInitTemplate,
  trackRegistryItemAdded,
  trackBrowserInstall,
  trackAuthLoginStarted,
  trackAuthLoginCompleted,
  trackAuthLoginFailed,
  identifyUser,
  trackRenderPreflightRejected,
  trackCliError,
  trackFigmaImport,
  trackCommandFailure,
  trackTranscribeUnavailable,
  trackCompareSheet,
  trackHistoryAction,
  trackSkillsInstallSkipped,
  trackFeedbackComment,
  trackRenderFeedback,
  trackCatalogSearchMiss,
  trackCommandResult,
  trackCheckReport,
  trackLintReport,
  trackLintRuleStreak
};
