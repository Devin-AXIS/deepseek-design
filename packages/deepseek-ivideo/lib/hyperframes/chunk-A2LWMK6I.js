import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  installPageFunctionGuard,
  resolveCliChromeGpuMode,
  resolveCompositionViewportFromHtml,
  seekCompositionTimeline,
  waitForRuntimeReady
} from "./chunk-RYA6RITK.js";
import {
  launchManagedBrowser,
  resolveManagedGpuMode
} from "./chunk-KXH7PX6M.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import {
  printDeprecationNotice,
  withMeta
} from "./chunk-5FABXOBL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/commands/validate.ts
import { existsSync, mkdtempSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var CONTRAST_SAMPLES = 5;
var SEEK_SETTLE_MS = 150;
var PREFERRED_SEEK_TARGET_WAIT_MS = 500;
var MEDIA_EXTENSIONS = /\.(aac|flac|m4a|mov|mp3|mp4|oga|ogg|wav|webm)$/i;
var NAV_TIMEOUT_FLOOR_MS = 1e4;
function resolveNavigationTimeoutMs(optTimeout) {
  return Math.max(NAV_TIMEOUT_FLOOR_MS, optTimeout ?? 0);
}
function navigationTimeoutHint(err, navTimeoutMs) {
  const msg = err instanceof Error ? err.message : String(err);
  if (!/navigation timeout/i.test(msg)) return null;
  return new Error(
    `Page navigation timed out after ${navTimeoutMs}ms. A blocking external <script> (e.g. GSAP loaded from a CDN) can delay page load past this budget even when the full render succeeds. Vendor the script locally (recommended for deterministic renders), or re-run with a longer --timeout.`
  );
}
function shouldIgnoreRequestFailure(url, errorText, resourceType) {
  if (errorText === "net::ERR_ABORTED" && isOptionalCaptionOverridesRequest(url)) return true;
  if (errorText !== "net::ERR_ABORTED") return false;
  if (resourceType === "media") return true;
  try {
    return MEDIA_EXTENSIONS.test(new URL(url).pathname);
  } catch {
    return false;
  }
}
function shouldIgnoreHttpError(url, status) {
  return status === 404 && isOptionalCaptionOverridesRequest(url);
}
function isOptionalCaptionOverridesRequest(url) {
  try {
    return new URL(url).pathname === "/caption-overrides.json";
  } catch {
    return false;
  }
}
async function getCompositionDuration(page) {
  return page.evaluate(() => {
    if (window.__hf?.duration && window.__hf.duration > 0) return window.__hf.duration;
    const root = document.querySelector("[data-composition-id][data-duration]");
    return root ? parseFloat(root.getAttribute("data-duration") ?? "0") : 0;
  });
}
function raceMediaReady(el, deadlineMs) {
  if (Number.isFinite(el.duration) && el.duration > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const onReady = () => {
      el.removeEventListener("loadedmetadata", onReady);
      el.removeEventListener("error", onReady);
      clearTimeout(timer);
      resolve();
    };
    el.addEventListener("loadedmetadata", onReady, { once: true });
    el.addEventListener("error", onReady, { once: true });
    const timer = setTimeout(onReady, Math.max(0, deadlineMs - Date.now()));
  });
}
async function auditClipDurations(page, analyzeClipMediaFit, extraWaitMs) {
  const clips = await page.evaluate(async (maxWaitMs) => {
    const nodes = Array.from(
      document.querySelectorAll("audio[data-duration]")
    );
    const deadline = Date.now() + maxWaitMs;
    await Promise.all(
      nodes.map((el) => {
        if (Number.isFinite(el.duration) && el.duration > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const cleanup = () => {
            el.removeEventListener("loadedmetadata", onReady);
            el.removeEventListener("error", onReady);
            clearTimeout(timer);
          };
          const onReady = () => {
            cleanup();
            resolve();
          };
          el.addEventListener("loadedmetadata", onReady, { once: true });
          el.addEventListener("error", onReady, { once: true });
          const timer = setTimeout(onReady, Math.max(0, deadline - Date.now()));
        });
      })
    );
    const rows = [];
    for (const el of nodes) {
      const slot = parseFloat(el.getAttribute("data-duration") ?? "");
      if (!(slot > 0)) continue;
      rows.push({
        id: el.id || el.getAttribute("src") || `(${el.tagName.toLowerCase()})`,
        kind: el.tagName === "AUDIO" ? "Audio" : "Video",
        slot,
        mediaStart: parseFloat(el.getAttribute("data-media-start") ?? "0") || 0,
        duration: el.duration,
        loop: el.loop || el.getAttribute("data-loop") === "true"
      });
    }
    return rows;
  }, extraWaitMs);
  const warnings = [];
  const unreadable = [];
  for (const clip of clips) {
    if (!Number.isFinite(clip.duration) || clip.duration <= 0) {
      unreadable.push(clip.id);
      continue;
    }
    const mediaSeconds = Math.max(0, clip.duration - clip.mediaStart);
    const fit = analyzeClipMediaFit({ slotSeconds: clip.slot, mediaSeconds, loop: clip.loop });
    if (!fit) continue;
    warnings.push({
      level: "warning",
      text: `${clip.kind} "${clip.id}" is ${mediaSeconds.toFixed(2)}s but its slot (data-duration) is ${clip.slot.toFixed(2)}s \u2014 the slot is shortened to the media length when rendered. Set data-duration to ~${mediaSeconds.toFixed(2)}s if that isn't intended.`
    });
  }
  if (unreadable.length > 0) {
    warnings.push({
      level: "warning",
      text: `Could not read the duration of ${unreadable.length} media element(s) within the validate timeout (${unreadable.join(", ")}); their slot vs. source fit was not checked. Re-run with a longer --timeout if the source is slow to load.`
    });
  }
  return warnings;
}
async function runContrastAudit(page) {
  const duration = await getCompositionDuration(page);
  if (duration <= 0) return [];
  await page.addScriptTag({ content: loadContrastAuditScript() });
  const results = [];
  for (let i = 0; i < CONTRAST_SAMPLES; i++) {
    const t = +((i + 0.5) / CONTRAST_SAMPLES * duration).toFixed(3);
    await seekCompositionTimeline(page, t, {
      fallbackToBridgeAndTimelines: true,
      waitForPreferredSeekTargetMs: PREFERRED_SEEK_TARGET_WAIT_MS,
      animationFrameSettle: "none",
      settleMs: SEEK_SETTLE_MS
    });
    try {
      const candidates = await page.evaluate(
        () => typeof window.__contrastAuditPrepare === "function" ? window.__contrastAuditPrepare() : []
      );
      const screenshot = await page.screenshot({
        encoding: "base64",
        type: "png",
        omitBackground: true
      });
      const entries = await page.evaluate(
        (b64, time, cands) => typeof window.__contrastAuditFinish === "function" ? window.__contrastAuditFinish(
          b64,
          time,
          cands
        ) : [],
        screenshot,
        t,
        candidates
      );
      results.push(...entries);
    } finally {
      await page.evaluate(() => {
        const restore = window.__contrastAuditRestoreIfPending;
        if (typeof restore === "function") restore();
      });
    }
  }
  return results;
}
function loadContrastAuditScript() {
  const candidates = [
    join(__dirname, "contrast-audit.browser.js"),
    join(__dirname, "commands", "contrast-audit.browser.js")
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return readFileSync(candidate, "utf-8");
  }
  throw new Error("Missing contrast audit browser script");
}
function extractCompositionErrorsFromLint(lintResult) {
  return lintResult.results.flatMap((r) => r.result.findings).filter((f) => f.code === "missing_or_empty_sub_composition" && f.severity === "error").map((f) => ({ level: "error", text: f.message }));
}
async function localizeRemoteAssets(html) {
  let dir;
  try {
    const { loadProducer } = await import("./producer-H4OKVRTU.js");
    const { localizeRemoteMediaSources, localizeRemoteImageSources, localizeRemoteFontFaces } = await loadProducer();
    dir = mkdtempSync(join(tmpdir(), "hf-validate-assets-"));
    const assetDir = dir;
    const media = await localizeRemoteMediaSources(html, assetDir);
    const images = await localizeRemoteImageSources(media.html, assetDir);
    const fonts = await localizeRemoteFontFaces(images.html, assetDir);
    const count = media.remoteMediaAssets.size + images.remoteMediaAssets.size + fonts.remoteMediaAssets.size;
    return {
      html: fonts.html,
      assetRoots: count > 0 ? [assetDir] : [],
      cleanup: () => rmSync(assetDir, { recursive: true, force: true })
    };
  } catch {
    if (dir) rmSync(dir, { recursive: true, force: true });
    return { html, assetRoots: [], cleanup: () => {
    } };
  }
}
async function validateInBrowser(project, opts) {
  const projectDir = project.dir;
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  const { serveStaticProjectHtml } = await import("./staticProjectServer-4EOUQSBD.js");
  const { lintProject } = await import("./lintProject-RJOCOQHA.js");
  const lintResult = await lintProject(projectDir);
  const compositionErrors = extractCompositionErrorsFromLint(lintResult);
  const html = await bundleToSingleHtml(projectDir);
  const localized = await localizeRemoteAssets(html);
  const server = await serveStaticProjectHtml(
    projectDir,
    localized.html,
    void 0,
    localized.assetRoots
  ).catch((err) => {
    localized.cleanup();
    throw err;
  });
  const errors = [...compositionErrors];
  const warnings = [];
  let contrast;
  const viewport = resolveCompositionViewportFromHtml(html);
  try {
    const browser = await ensureBrowser();
    const puppeteer = await import("puppeteer-core");
    const { buildChromeArgs, analyzeClipMediaFit } = await import("./src-2CXRYIST.js");
    const requestedGpuMode = resolveCliChromeGpuMode();
    const { assertWebGpuAdapterAvailable, compositionRequiresWebGpu } = await import("./gpuPolicy-ZEJUT7AR.js");
    const resolvedGpuMode = await resolveManagedGpuMode(requestedGpuMode, browser.executablePath);
    const requiresWebGpu = compositionRequiresWebGpu(html);
    const chromeBrowser = await launchManagedBrowser(puppeteer.default, {
      headless: true,
      executablePath: browser.executablePath,
      args: buildChromeArgs(
        { ...viewport, captureMode: "screenshot", requiresWebGpu },
        { browserGpuMode: resolvedGpuMode }
      )
    });
    const page = await chromeBrowser.newPage();
    await installPageFunctionGuard(page);
    await page.setViewport(viewport);
    page.on("console", (msg) => {
      const type = msg.type();
      const loc = msg.location();
      const text = msg.text();
      if (type === "error") {
        if (text.startsWith("Failed to load resource")) return;
        errors.push({ level: "error", text, url: loc.url, line: loc.lineNumber });
      } else if (type === "warn") {
        warnings.push({ level: "warning", text, url: loc.url, line: loc.lineNumber });
      }
    });
    page.on("pageerror", (err) => {
      const text = normalizeErrorMessage(err);
      if (text.includes("Unexpected token '<'") || text.includes("Unexpected token '&lt;'")) return;
      errors.push({ level: "error", text });
    });
    page.on("requestfailed", (req) => {
      const url = req.url();
      if (url.includes("favicon") || url.startsWith("data:")) return;
      const failureText = req.failure()?.errorText;
      if (shouldIgnoreRequestFailure(url, failureText, req.resourceType())) return;
      const path = decodeURIComponent(new URL(url).pathname).replace(/^\//, "");
      errors.push({
        level: "error",
        text: `Failed to load ${path}: ${failureText ?? "net::ERR_FAILED"}`,
        url
      });
    });
    page.on("response", (res) => {
      if (res.status() >= 400) {
        const url = res.url();
        if (url.includes("favicon")) return;
        if (shouldIgnoreHttpError(url, res.status())) return;
        const path = decodeURIComponent(new URL(url).pathname).replace(/^\//, "");
        errors.push({ level: "error", text: `${res.status()} loading ${path}`, url });
      }
    });
    const navTimeoutMs = resolveNavigationTimeoutMs(opts.timeout);
    try {
      await page.goto(server.url, { waitUntil: "domcontentloaded", timeout: navTimeoutMs });
    } catch (err) {
      const hinted = navigationTimeoutHint(err, navTimeoutMs);
      if (hinted) throw hinted;
      throw err;
    }
    await assertWebGpuAdapterAvailable(page, requiresWebGpu);
    await waitForRuntimeReady(page, opts.timeout ?? 3e3);
    await new Promise((r) => setTimeout(r, opts.timeout ?? 3e3));
    for (const w of await auditClipDurations(page, analyzeClipMediaFit, opts.timeout ?? 3e3)) {
      warnings.push(w);
    }
    if (opts.contrast) {
      contrast = await runContrastAudit(page);
    }
    await chromeBrowser.close();
  } finally {
    await server.close();
    localized.cleanup();
  }
  return { errors, warnings, contrast };
}
function printContrastFailures(failures) {
  console.log();
  console.log(`  ${c.warn("\u26A0")} WCAG AA contrast warnings (${failures.length}):`);
  for (const cf of failures) {
    const threshold = cf.large ? "3" : "4.5";
    console.log(
      `    ${c.warn("\xB7")} ${cf.selector} ${c.dim(`"${cf.text}"`)} \u2014 ${c.warn(cf.ratio + ":1")} ${c.dim(`(need ${threshold}:1, t=${cf.time}s)`)}`
    );
  }
}
function emitJsonReport(errors, warnings, contrast, contrastFailures) {
  console.log(
    JSON.stringify(
      withMeta(
        {
          ok: errors.length === 0,
          errors,
          warnings,
          contrast,
          contrastFailures: contrastFailures.length
        },
        { deprecated: true }
      ),
      null,
      2
    )
  );
}
function formatConsoleEntry(prefix, e) {
  return `  ${prefix} ${e.text}${e.line ? c.dim(` (line ${e.line})`) : ""}`;
}
function formatTotals(errors, warnings, contrastFailures) {
  const parts = [`${errors.length} error(s)`, `${warnings.length} warning(s)`];
  if (contrastFailures.length > 0) parts.push(`${contrastFailures.length} contrast warning(s)`);
  return parts.join(", ");
}
function emitTextReport(errors, warnings, contrastFailures, contrastPassed) {
  const hasIssues = errors.length > 0 || warnings.length > 0 || contrastFailures.length > 0;
  if (!hasIssues) {
    const suffix = contrastPassed.length > 0 ? ` \xB7 ${contrastPassed.length} text elements pass WCAG AA` : "";
    console.log(`${c.success("\u25C7")}  No console errors${suffix}`);
    return;
  }
  console.log();
  for (const e of errors) console.log(formatConsoleEntry(c.error("\u2717"), e));
  for (const w of warnings) console.log(formatConsoleEntry(c.warn("\u26A0"), w));
  if (contrastFailures.length > 0) printContrastFailures(contrastFailures);
  console.log();
  console.log(`${c.accent("\u25C7")}  ${formatTotals(errors, warnings, contrastFailures)}`);
}
function emitFailureReport(message, asJson) {
  if (asJson) {
    console.log(
      JSON.stringify(
        withMeta({ ok: false, error: message, errors: [], warnings: [] }, { deprecated: true }),
        null,
        2
      )
    );
    return;
  }
  console.error(`${c.error("\u2717")} ${message}`);
}
var validate_default = defineCommand({
  meta: {
    name: "validate",
    description: `Load a composition in headless Chrome and report console errors (deprecated, use check)

Examples:
  hyperframes validate
  hyperframes validate ./my-project
  hyperframes validate --json
  hyperframes validate --timeout 5000`
  },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    json: { type: "boolean", description: "Output as JSON", default: false },
    contrast: {
      type: "boolean",
      description: "WCAG contrast audit (enabled by default)",
      default: true
    },
    timeout: {
      type: "string",
      description: "Ms to wait for scripts to settle and media to load (default: 3000). Also raises the page-navigation budget above its 10s floor when a slow external <script> needs longer.",
      default: "3000"
    }
  },
  async run({ args }) {
    printDeprecationNotice("validate");
    const project = resolveProject(args.dir);
    const timeout = parseInt(args.timeout, 10) || 3e3;
    const useContrast = args.contrast ?? true;
    const asJson = Boolean(args.json);
    if (!asJson) {
      console.log(`${c.accent("\u25C6")}  Validating ${c.accent(project.name)} in headless Chrome`);
    }
    try {
      const result = await validateInBrowser(project, { timeout, contrast: useContrast });
      const exitCode = printValidationResult(result, asJson);
      setCommandExitCode(exitCode);
      return;
    } catch (err) {
      const message = normalizeErrorMessage(err);
      emitFailureReport(message, asJson);
      failCommand();
    }
  }
});
function printValidationResult(result, asJson) {
  const { errors, warnings, contrast } = result;
  const contrastFailures = (contrast ?? []).filter((e) => !e.wcagAA);
  const contrastPassed = (contrast ?? []).filter((e) => e.wcagAA);
  if (asJson) {
    emitJsonReport(errors, warnings, contrast, contrastFailures);
  } else {
    emitTextReport(errors, warnings, contrastFailures, contrastPassed);
  }
  return errors.length > 0 ? 1 : 0;
}

export {
  resolveNavigationTimeoutMs,
  navigationTimeoutHint,
  shouldIgnoreRequestFailure,
  shouldIgnoreHttpError,
  raceMediaReady,
  auditClipDurations,
  extractCompositionErrorsFromLint,
  validate_default
};
