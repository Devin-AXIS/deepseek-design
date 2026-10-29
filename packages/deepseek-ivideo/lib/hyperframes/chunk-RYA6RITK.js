import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  launchManagedBrowser,
  resolveManagedGpuMode
} from "./chunk-KXH7PX6M.js";
import {
  resolveDiagnosticNavigationTimeoutMs,
  windowsChromeCrashRemediation
} from "./chunk-I2GLM53A.js";
import {
  ensureDOMParser
} from "./chunk-PFCFR3KZ.js";
import {
  resolveLocalBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import {
  assertWebGpuAdapterAvailable,
  compositionRequiresWebGpu
} from "./chunk-3NHZZLH3.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/utils/compositionViewport.ts
var DEFAULT_VIEWPORT = { width: 1920, height: 1080 };
var MAX_VIEWPORT_DIMENSION = 4096;
function parseViewportDimension(value) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return Math.min(parsed, MAX_VIEWPORT_DIMENSION);
}
function findCompositionDimensions(html) {
  ensureDOMParser();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const root = doc.querySelector("[data-composition-id][data-width][data-height]");
  if (!root) return null;
  const width = parseViewportDimension(root.getAttribute("data-width"));
  const height = parseViewportDimension(root.getAttribute("data-height"));
  if (width === null || height === null) return null;
  return { width, height };
}
function resolveCompositionViewportFromHtml(html) {
  return findCompositionDimensions(html) ?? DEFAULT_VIEWPORT;
}

// src/capture/captureCompositionFrame.ts
import { spawn } from "child_process";
var SHADER_TRANSITIONS_TIMEOUT_MS = 9e4;
var CAPTURE_SETTLE_MS = 1500;
var PREFERRED_SEEK_TARGET_WAIT_MS = 500;
var DEFAULT_POST_SEEK_FONT_WAIT_MS = 500;
var AUDIT_SEEK_OPTIONS = {
  fallbackToBridgeAndTimelines: true,
  animationFrameSettle: "double",
  waitForFontsMs: 500,
  settleMs: 120
};
var DENSE_GEOMETRY_SEEK_OPTIONS = {
  ...AUDIT_SEEK_OPTIONS,
  animationFrameSettle: "none",
  waitForFontsMs: 0,
  settleMs: 0
};
function resolveCliChromeGpuMode(envMode = process.env.PRODUCER_BROWSER_GPU_MODE) {
  return resolveLocalBrowserGpuMode(void 0, envMode);
}
function compositionRuntimeReadyInBrowser() {
  return Boolean(Reflect.get(window, "__renderReady"));
}
function shaderTransitionsReadyInBrowser() {
  function shaderTransitionRegistryReady() {
    const hf = Reflect.get(window, "__hf");
    if (typeof hf !== "object" || hf === null) return void 0;
    const shaderTransitions = Reflect.get(hf, "shaderTransitions");
    if (typeof shaderTransitions !== "object" || shaderTransitions === null) return void 0;
    for (const key of Object.keys(shaderTransitions)) {
      const entry = Reflect.get(shaderTransitions, key);
      if (typeof entry !== "object" || entry === null) return false;
      if (Reflect.get(entry, "ready") !== true) return false;
    }
    return true;
  }
  function shaderLoadingOverlayReady() {
    const overlay = document.querySelector("[data-hyper-shader-loading]");
    if (!overlay) return true;
    if (!(overlay instanceof HTMLElement)) return true;
    return window.getComputedStyle(overlay).display === "none";
  }
  return shaderTransitionRegistryReady() ?? shaderLoadingOverlayReady();
}
function waitForRuntimeReady(page, timeoutMs) {
  return page.waitForFunction(compositionRuntimeReadyInBrowser, { timeout: timeoutMs }).then(() => true).catch(() => false);
}
async function waitForCompositionSettle(page, options) {
  const runtimeReady = await waitForRuntimeReady(page, options.renderReadyTimeoutMs);
  if (!runtimeReady) {
    console.warn(
      `
   ${c.warn("\u26A0")} Runtime did not become render-ready within ${options.renderReadyTimeoutMs}ms \u2014 ${options.renderReadyWarningSuffix}`
    );
  }
  await page.waitForFunction(shaderTransitionsReadyInBrowser, {
    timeout: SHADER_TRANSITIONS_TIMEOUT_MS
  }).catch(() => {
    console.warn(`   ${c.warn("\u26A0")} Shader transitions did not finish pre-rendering`);
  });
  await page.evaluate(() => document.fonts.ready).catch(() => {
  });
  await new Promise((resolveSettle) => setTimeout(resolveSettle, CAPTURE_SETTLE_MS));
  return runtimeReady;
}
async function installPageFunctionGuard(page) {
  await page.evaluateOnNewDocument("self.__name = self.__name || ((fn) => fn);");
}
async function openSettledCompositionPage(html, url, options) {
  const viewport = resolveCompositionViewportFromHtml(html);
  const { ensureBrowser, findSystemBrowser } = await import("./manager-VQUQB7DK.js");
  const browser = await ensureBrowser();
  const puppeteer = await import("puppeteer-core");
  const { buildChromeArgs } = await import("./src-2CXRYIST.js");
  const requestedGpuMode = options.browserGpuMode ?? resolveCliChromeGpuMode();
  const requiresWebGpu = compositionRequiresWebGpu(html);
  const launch = async (executablePath) => {
    const resolvedGpuMode = await resolveManagedGpuMode(requestedGpuMode, executablePath);
    return launchManagedBrowser(puppeteer.default, {
      headless: true,
      executablePath,
      args: buildChromeArgs(
        { ...viewport, captureMode: "screenshot", requiresWebGpu },
        { browserGpuMode: resolvedGpuMode }
      )
    });
  };
  let chromeBrowser;
  try {
    try {
      chromeBrowser = await launch(browser.executablePath);
    } catch (launchError) {
      const message = normalizeErrorMessage(launchError);
      const remediation = windowsChromeCrashRemediation(message);
      if (!remediation) throw launchError;
      const systemBrowser = browser.source === "cache" || browser.source === "download" ? findSystemBrowser() : void 0;
      if (!systemBrowser || systemBrowser.executablePath === browser.executablePath) {
        throw new Error(`${message}

${remediation}`, { cause: launchError });
      }
      console.warn(
        `[hyperframes] Managed chrome-headless-shell crashed at launch; retrying once with system Chrome at ${systemBrowser.executablePath}.`
      );
      try {
        chromeBrowser = await launch(systemBrowser.executablePath);
      } catch (fallbackError) {
        throw new Error(
          `System Chrome fallback also failed: ${normalizeErrorMessage(fallbackError)}

${remediation}`,
          { cause: fallbackError }
        );
      }
    }
    const page = await chromeBrowser.newPage();
    await installPageFunctionGuard(page);
    await page.setViewport(viewport);
    await options.beforeNavigate?.(page);
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: resolveDiagnosticNavigationTimeoutMs(process.env, options.navigationTimeoutMs)
    });
    await assertWebGpuAdapterAvailable(page, requiresWebGpu);
    const renderReadyTimedOut = !await waitForCompositionSettle(page, options);
    return { browser: chromeBrowser, page, renderReadyTimedOut };
  } catch (err) {
    await chromeBrowser?.close().catch(() => {
    });
    throw err;
  }
}
async function seekCompositionTimeline(page, timeSeconds, options = {}) {
  if (options.waitForPreferredSeekTargetMs !== void 0) {
    await waitForPreferredSeekTarget(page, options.waitForPreferredSeekTargetMs);
  }
  await page.evaluate(
    // Serialized into the page; the seek-target cascade must stay one function.
    // fallow-ignore-next-line complexity
    (t, fallbackToBridgeAndTimelines, exactTime) => {
      const getProperty = (target, key) => {
        if ((typeof target !== "object" || target === null) && typeof target !== "function") {
          return void 0;
        }
        return Reflect.get(target, key);
      };
      const call = (fn, receiver, args) => {
        if (typeof fn !== "function") return false;
        Reflect.apply(fn, receiver, args);
        return true;
      };
      const player = Reflect.get(window, "__player");
      if (!player && !fallbackToBridgeAndTimelines) return;
      const safe = Math.max(0, Number(t) || 0);
      const renderSeek = getProperty(player, "renderSeek");
      const playerSeek = getProperty(player, "seek");
      const hf = Reflect.get(window, "__hf");
      const bridgeSeek = getProperty(hf, "seek");
      if (call(renderSeek, player, exactTime ? [safe, { exact: true }] : [safe])) {
      } else if (fallbackToBridgeAndTimelines && call(bridgeSeek, hf, [safe])) {
      } else if (call(playerSeek, player, [safe])) {
      } else if (fallbackToBridgeAndTimelines) {
        const timelines = Reflect.get(window, "__timelines");
        if (typeof timelines === "object" && timelines !== null) {
          for (const key of Object.keys(timelines)) {
            const timeline = Reflect.get(timelines, key);
            call(getProperty(timeline, "pause"), timeline, []);
            call(getProperty(timeline, "seek"), timeline, [safe]);
          }
        }
      }
      const gsap = Reflect.get(window, "gsap");
      const ticker = getProperty(gsap, "ticker");
      call(getProperty(ticker, "tick"), ticker, []);
    },
    timeSeconds,
    options.fallbackToBridgeAndTimelines === true,
    options.exactTime === true
  );
  await page.evaluate(async () => {
    const waitForCompletion = Reflect.get(window, "__hfWaitForSeekCompletion");
    if (typeof waitForCompletion === "function") {
      await Reflect.apply(waitForCompletion, window, []);
    }
  });
  const animationFrameSettle = options.animationFrameSettle ?? "race";
  if (animationFrameSettle === "race") {
    await page.evaluate(`new Promise(function(r) {
      var settled = false;
      function finish() { if (settled) return; settled = true; r(); }
      window.setTimeout(finish, 100);
      requestAnimationFrame(function() { requestAnimationFrame(finish); });
    })`);
  } else if (animationFrameSettle === "double") {
    await page.evaluate(
      () => new Promise(
        (resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(() => resolveFrame()))
      )
    );
  }
  const waitForFontsMs = options.waitForFontsMs ?? DEFAULT_POST_SEEK_FONT_WAIT_MS;
  if (waitForFontsMs > 0) {
    await waitForCompositionFonts(page, waitForFontsMs);
  }
  if (options.settleMs !== void 0) {
    const settleMs = Math.max(0, options.settleMs);
    await new Promise((resolveSettle) => setTimeout(resolveSettle, settleMs));
  }
}
async function waitForPreferredSeekTarget(page, timeoutMs = PREFERRED_SEEK_TARGET_WAIT_MS) {
  if (!page.waitForFunction) return;
  try {
    await page.waitForFunction(
      () => {
        const player = Reflect.get(window, "__player");
        const hf = Reflect.get(window, "__hf");
        const renderSeek = typeof player === "object" && player !== null ? Reflect.get(player, "renderSeek") : void 0;
        const bridgeSeek = typeof hf === "object" && hf !== null ? Reflect.get(hf, "seek") : void 0;
        return typeof renderSeek === "function" || typeof bridgeSeek === "function";
      },
      { timeout: timeoutMs }
    );
  } catch {
  }
}
async function waitForCompositionFonts(page, timeoutMs) {
  await page.evaluate((ms) => {
    const fonts = Reflect.get(document, "fonts");
    if (typeof fonts !== "object" || fonts === null) return Promise.resolve();
    void document.body?.offsetHeight;
    return new Promise((resolveWait) => {
      const deadline = setTimeout(resolveWait, ms);
      requestAnimationFrame(() => {
        const status = Reflect.get(fonts, "status");
        const ready = Reflect.get(fonts, "ready");
        if (status !== "loading" || !ready) {
          clearTimeout(deadline);
          resolveWait();
          return;
        }
        Promise.resolve(ready).then(() => {
          clearTimeout(deadline);
          resolveWait();
        });
      });
    });
  }, timeoutMs).catch(() => {
  });
}
var ZOOM_REGION_PATTERN = /^-?\d+(?:\.\d+)?(?:,-?\d+(?:\.\d+)?){3}$/;
var DEFAULT_ZOOM_PADDING_PX = 24;
var DEFAULT_ZOOM_SCALE = 3;
function parseZoomTarget(value) {
  const trimmed = value.trim();
  if (ZOOM_REGION_PATTERN.test(trimmed)) {
    const [x, y, width, height] = trimmed.split(",").map(Number);
    return { kind: "region", region: { x, y, width, height } };
  }
  return { kind: "selector", selector: trimmed };
}
function clampCropRegion(region, canvas) {
  const x = Math.max(0, Math.min(region.x, canvas.width));
  const y = Math.max(0, Math.min(region.y, canvas.height));
  const x2 = Math.max(x + 1, Math.min(region.x + region.width, canvas.width));
  const y2 = Math.max(y + 1, Math.min(region.y + region.height, canvas.height));
  return { x, y, width: x2 - x, height: y2 - y };
}
function padCropRegion(region, canvas, paddingPx) {
  return clampCropRegion(
    {
      x: region.x - paddingPx,
      y: region.y - paddingPx,
      width: region.width + paddingPx * 2,
      height: region.height + paddingPx * 2
    },
    canvas
  );
}
var MIN_CROP_REGION_PX = 8;
async function resolveCropRegion(page, target, canvas, paddingPx = DEFAULT_ZOOM_PADDING_PX) {
  if (target.kind === "region") return clampCropRegion(target.region, canvas);
  const bbox = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  }, target.selector);
  if (!bbox) throw new Error(`--zoom selector matched no element: ${target.selector}`);
  const region = padCropRegion(bbox, canvas, paddingPx);
  if (region.width < MIN_CROP_REGION_PX || region.height < MIN_CROP_REGION_PX) return null;
  return region;
}
async function captureRegionCrop(page, region, scale) {
  const original = page.viewport();
  if (original) await page.setViewport({ ...original, deviceScaleFactor: scale });
  try {
    const shot = await page.screenshot({ clip: region, type: "png", omitBackground: true });
    return Buffer.isBuffer(shot) ? shot : Buffer.from(shot);
  } finally {
    if (original) await page.setViewport(original);
  }
}
async function runFfmpegOnce(ffmpegPath, args, timeoutMs) {
  return await new Promise((resolvePromise) => {
    const ff = spawn(ffmpegPath, args, { windowsHide: true });
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      ff.kill("SIGTERM");
    }, timeoutMs);
    ff.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    ff.on("close", (code) => {
      clearTimeout(timer);
      resolvePromise({ code, stderr, timedOut });
    });
    ff.on("error", () => {
      clearTimeout(timer);
      resolvePromise({ code: null, stderr: "ffmpeg spawn failed", timedOut });
    });
  });
}

export {
  resolveCompositionViewportFromHtml,
  AUDIT_SEEK_OPTIONS,
  DENSE_GEOMETRY_SEEK_OPTIONS,
  resolveCliChromeGpuMode,
  waitForRuntimeReady,
  installPageFunctionGuard,
  openSettledCompositionPage,
  seekCompositionTimeline,
  waitForPreferredSeekTarget,
  waitForCompositionFonts,
  DEFAULT_ZOOM_PADDING_PX,
  DEFAULT_ZOOM_SCALE,
  parseZoomTarget,
  padCropRegion,
  resolveCropRegion,
  captureRegionCrop,
  runFfmpegOnce
};
