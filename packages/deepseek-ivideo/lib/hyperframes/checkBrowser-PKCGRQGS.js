import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  rectToBbox
} from "./chunk-WBLXWOYK.js";
import {
  ambiguousIssue,
  loadBrowserScript
} from "./chunk-QHB3PMQ6.js";
import {
  serveStaticProjectHtml
} from "./chunk-UQR6E2MI.js";
import {
  auditClipDurations,
  shouldIgnoreHttpError,
  shouldIgnoreRequestFailure
} from "./chunk-A2LWMK6I.js";
import {
  AUDIT_SEEK_OPTIONS,
  DEFAULT_ZOOM_PADDING_PX,
  DEFAULT_ZOOM_SCALE,
  DENSE_GEOMETRY_SEEK_OPTIONS,
  captureRegionCrop,
  openSettledCompositionPage,
  padCropRegion,
  resolveCliChromeGpuMode,
  seekCompositionTimeline,
  waitForPreferredSeekTarget
} from "./chunk-RYA6RITK.js";
import "./chunk-KXH7PX6M.js";
import "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFF75FSN.js";
import "./chunk-PFCFR3KZ.js";
import "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-XUHOIDKG.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import {
  decideMediaProxyEligibility,
  proxyVariantFor,
  resolveProxy,
  scanProjectMediaCodecMap
} from "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import {
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-UITPTRCM.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
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
import "./chunk-SIG2LUMK.js";
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
import "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/utils/checkBrowser.ts
import { mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
async function preResolveHostileMediaProxies(projectDir, html, autoProxyOverride) {
  if (!resolveAutoProxy(projectDir, autoProxyOverride)) return;
  let codecMap;
  try {
    codecMap = await scanProjectMediaCodecMap(projectDir, [{ html }]);
  } catch (err) {
    console.error(
      `[hyperframes] media proxy pre-resolve: scan failed (${normalizeErrorMessage(err)})`
    );
    return;
  }
  const hostileEntries = Object.entries(codecMap).filter(
    ([, facts]) => decideMediaProxyEligibility(facts).eligible
  );
  if (hostileEntries.length === 0) return;
  const startedAt = Date.now();
  const results = await Promise.allSettled(
    hostileEntries.map(
      ([pathname, facts]) => resolveProxy(
        projectDir,
        resolve(projectDir, pathname.replace(/^\/+/, "")),
        proxyVariantFor(facts)
      )
    )
  );
  const failed = results.filter((result) => result.status === "rejected").length;
  console.error(
    `[hyperframes] media proxy pre-resolve: ${results.length - failed}/${results.length} ready, ${failed} failed (${Date.now() - startedAt}ms)`
  );
}
async function runBrowserCheck(project, options, motion, runGrid) {
  const { bundleWithLocalizedFonts } = await import("./bundleWithLocalizedFonts-3FDGGP5N.js");
  const html = await bundleWithLocalizedFonts(project.dir);
  await preResolveHostileMediaProxies(project.dir, html, options.autoProxy);
  const server = await serveStaticProjectHtml(
    project.dir,
    html,
    "Failed to bind check server",
    [],
    options.autoProxy
  );
  const drafts = [];
  let currentTime = 0;
  let chromeBrowser;
  try {
    const launchSettleStart = Date.now();
    const session = await openSettledCompositionPage(html, server.url, {
      navigationTimeoutMs: options.timeout,
      renderReadyTimeoutMs: options.timeout,
      renderReadyWarningSuffix: "checking the current page state",
      browserGpuMode: options.browserGpuMode ?? resolveCliChromeGpuMode(),
      beforeNavigate: (page2) => wireRuntimeListeners(page2, drafts, () => currentTime)
    });
    chromeBrowser = session.browser;
    const page = session.page;
    await waitForPreferredSeekTarget(page);
    const rootAnchor = await resolveRootAnchor(page);
    const launchSettleMs = Date.now() - launchSettleStart;
    const { analyzeClipMediaFit } = await import("./src-2CXRYIST.js");
    for (const entry of await auditClipDurations(page, analyzeClipMediaFit, options.timeout)) {
      drafts.push({ code: "clip_media_fit", severity: entry.level, message: entry.text, time: 0 });
    }
    const driver = createPageDriver(page, (time) => {
      currentTime = time;
    });
    const result = await runGrid(driver, options, motion);
    const broken = await abortedImagesStillBroken(page, drafts);
    return {
      ...result,
      timings: { ...result.timings, launchSettleMs },
      runtimeFindings: keepBrokenImageAborts(drafts, broken).map(
        (draft) => runtimeFinding(draft, rootAnchor)
      )
    };
  } finally {
    await chromeBrowser?.close().catch(() => void 0);
    await server.close();
  }
}
async function captureFindingCrops(project, options, requests) {
  if (requests.length === 0) return [];
  const { bundleWithLocalizedFonts } = await import("./bundleWithLocalizedFonts-3FDGGP5N.js");
  const html = await bundleWithLocalizedFonts(project.dir);
  const server = await serveStaticProjectHtml(
    project.dir,
    html,
    "Failed to bind check server",
    [],
    options.autoProxy
  );
  let chromeBrowser;
  const written = [];
  try {
    const session = await openSettledCompositionPage(html, server.url, {
      navigationTimeoutMs: options.timeout,
      renderReadyTimeoutMs: options.timeout,
      renderReadyWarningSuffix: "capturing finding crops",
      browserGpuMode: options.browserGpuMode ?? resolveCliChromeGpuMode()
    });
    chromeBrowser = session.browser;
    const page = session.page;
    await waitForPreferredSeekTarget(page);
    const snapshotDir = join(project.dir, "snapshots");
    mkdirSync(snapshotDir, { recursive: true });
    for (const request of requests) {
      await seekCompositionTimeline(page, request.time, AUDIT_SEEK_OPTIONS);
      const canvas = await page.evaluate(() => ({
        width: window.innerWidth,
        height: window.innerHeight
      }));
      const region = padCropRegion(request.bbox, canvas, DEFAULT_ZOOM_PADDING_PX);
      const buffer = await captureRegionCrop(page, region, DEFAULT_ZOOM_SCALE);
      writeFileSync(join(snapshotDir, request.filename), buffer);
      written.push(join("snapshots", request.filename));
    }
    return written;
  } finally {
    await chromeBrowser?.close().catch(() => void 0);
    await server.close();
  }
}
var MEDIA_PROXY_MARKER_PREFIX = "[hyperframes] runtime_media_proxy_";
var MEDIA_PROXY_UNAVAILABLE_MARKER = "[hyperframes] runtime_media_proxy_unavailable";
var WEB_AUDIO_BYPASS_MARKER = "[hyperframes] runtime_web_audio_bypass";
var WEBGPU_RUNTIME_FAILURE = /\b(?:GPUValidationError|GPUOutOfMemoryError|GPUInternalError)\b|WebGPU uncaptured error|(?:destroyed\b.*\b(?:GPU )?(?:resource|buffer|texture)\b.*\bsubmit)|(?:(?:GPU )?(?:resource|buffer|texture)\b.*\bdestroyed\b.*\bsubmit)/i;
function isWebGpuRuntimeFailure(text) {
  return WEBGPU_RUNTIME_FAILURE.test(text);
}
function pushRuntimeDraft(drafts, draft) {
  if (draft.code !== "webgpu_runtime_error") {
    drafts.push(draft);
    return;
  }
  const duplicate = drafts.find(
    (entry) => entry.code === draft.code && entry.message === draft.message && entry.url === draft.url && entry.line === draft.line
  );
  if (duplicate) {
    duplicate.count = (duplicate.count ?? 1) + 1;
    return;
  }
  drafts.push({ ...draft, count: 1 });
}
function runtimeInfoFindingCode(text) {
  if (text.startsWith(WEB_AUDIO_BYPASS_MARKER)) return "web_audio_bypass";
  if (!text.startsWith(MEDIA_PROXY_MARKER_PREFIX)) return null;
  return text.includes(MEDIA_PROXY_UNAVAILABLE_MARKER) ? "media_proxy_unavailable" : "media_proxy_fallback";
}
function wireRuntimeListeners(page, drafts, currentTime) {
  page.on("console", (message) => {
    const type = message.type();
    const text = message.text();
    if (type === "error" && !text.startsWith("Failed to load resource")) {
      const location = message.location();
      pushRuntimeDraft(drafts, {
        code: "console_error",
        severity: "error",
        message: text,
        time: currentTime(),
        url: location.url,
        line: location.lineNumber
      });
    } else if (type === "warn") {
      const location = message.location();
      const webGpuFailure = isWebGpuRuntimeFailure(text);
      pushRuntimeDraft(drafts, {
        code: webGpuFailure ? "webgpu_runtime_error" : "console_warning",
        severity: webGpuFailure ? "error" : "warning",
        message: text,
        time: currentTime(),
        url: location.url,
        line: location.lineNumber
      });
    } else if (type === "info") {
      const code = runtimeInfoFindingCode(text);
      if (!code) return;
      const location = message.location();
      pushRuntimeDraft(drafts, {
        code,
        severity: "info",
        message: text,
        time: currentTime(),
        url: location.url,
        line: location.lineNumber
      });
    }
  });
  page.on("pageerror", (error) => {
    const message = normalizeErrorMessage(error);
    if (message.includes("Unexpected token '<'") || message.includes("Unexpected token '&lt;'")) {
      return;
    }
    pushRuntimeDraft(drafts, {
      code: "page_error",
      severity: "error",
      message,
      time: currentTime()
    });
  });
  wireNetworkListeners(page, drafts, currentTime);
}
function keepBrokenImageAborts(drafts, broken) {
  return drafts.filter((draft) => !draft.abortedImage || broken.has(draft.url ?? ""));
}
var IMAGE_DECODE_CAP_MS = 5e3;
async function abortedImagesStillBroken(page, drafts) {
  const urls = drafts.filter((draft) => draft.abortedImage).map((draft) => draft.url ?? "");
  if (urls.length === 0) return /* @__PURE__ */ new Set();
  const broken = await page.evaluate(
    async (candidates, capMs) => {
      const fails = (img) => new Promise((resolve2) => {
        const cap = setTimeout(() => resolve2(false), capMs);
        img.decode().then(
          () => resolve2(false),
          () => resolve2(true)
        ).finally(() => clearTimeout(cap));
      });
      const stillBroken = await Promise.all(
        candidates.map(async (url) => {
          const shown = Array.from(document.querySelectorAll("img")).filter(
            (img) => img.currentSrc === url || img.src === url
          );
          return (await Promise.all(shown.map(fails))).some(Boolean);
        })
      );
      return candidates.filter((_, i) => stillBroken[i]);
    },
    urls,
    IMAGE_DECODE_CAP_MS
  );
  return new Set(broken);
}
function wireNetworkListeners(page, drafts, currentTime) {
  page.on("requestfailed", (request) => {
    const url = request.url();
    if (url.includes("favicon") || url.startsWith("data:")) return;
    const failure = request.failure()?.errorText;
    if (shouldIgnoreRequestFailure(url, failure, request.resourceType())) return;
    drafts.push({
      code: "request_failed",
      severity: "error",
      message: `Failed to load ${urlPath(url)}: ${failure ?? "net::ERR_FAILED"}`,
      time: currentTime(),
      url,
      abortedImage: failure === "net::ERR_ABORTED" && request.resourceType() === "image"
    });
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    const url = response.url();
    if (url.includes("favicon")) return;
    if (shouldIgnoreHttpError(url, response.status())) return;
    drafts.push({
      code: "http_error",
      severity: "error",
      message: `${response.status()} loading ${urlPath(url)}`,
      time: currentTime(),
      url
    });
  });
}
function createPageDriver(page, setTime) {
  return {
    initialize: (contrast) => injectAuditScripts(page, contrast),
    getDuration: () => getCompositionDuration(page),
    hasNoTimelineDeclaration: () => hasNoTimelineDeclaration(page),
    getTransitionBoundaries: () => collectTweenBoundaries(page),
    getCanvas: () => page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight })),
    findAmbiguousSelectors: (selectors) => findAmbiguousSelectors(page, selectors),
    seek: async (time) => {
      setTime(time);
      await seekCompositionTimeline(page, time, AUDIT_SEEK_OPTIONS);
    },
    seekGeometry: async (time) => {
      setTime(time);
      await seekCompositionTimeline(page, time, DENSE_GEOMETRY_SEEK_OPTIONS);
    },
    collectLayout: (time, tolerance, layout) => collectLayout(page, time, tolerance, layout),
    collectOverlap: (time) => collectOverlap(page, time),
    collectLayoutGeometry: () => collectLayoutGeometry(page),
    collectRotationSample: (time) => collectRotationSample(page, time),
    collectOffPivotRotationSample: (time) => collectOffPivotRotationSample(page, time),
    collectGeometryCandidates: (time, request) => collectGeometryCandidates(page, time, request),
    collectMotionFrame: (time, selectors, scopes) => collectMotionFrame(page, time, selectors, scopes),
    anchorMotionIssues: (issues) => anchorLayoutIssues(page, issues),
    collectContrast: (time, annotations) => collectContrast(page, time, annotations)
  };
}
async function hasNoTimelineDeclaration(page) {
  return page.evaluate(
    () => document.querySelector("[data-composition-id]")?.hasAttribute("data-no-timeline") ?? false
  );
}
async function injectAuditScripts(page, contrast) {
  await page.addScriptTag({ content: loadBrowserScript("motion-signature.browser.js") });
  await page.addScriptTag({ content: loadBrowserScript("layout-audit.browser.js") });
  await page.addScriptTag({ content: loadBrowserScript("motion-sample.browser.js") });
  if (contrast) {
    await page.addScriptTag({ content: loadBrowserScript("contrast-audit.browser.js") });
  }
}
async function getCompositionDuration(page) {
  return page.evaluate(() => {
    const value = (target, key) => typeof target === "object" && target !== null ? Reflect.get(target, key) : void 0;
    const positive = (candidate) => typeof candidate === "number" && candidate > 0 ? candidate : null;
    const callDuration = (target) => {
      const duration = value(target, "duration");
      if (typeof duration === "function") {
        const result = Reflect.apply(duration, target, []);
        return positive(result);
      }
      return positive(duration);
    };
    const hfDuration = positive(value(Reflect.get(window, "__hf"), "duration"));
    if (hfDuration) return hfDuration;
    const playerDuration = callDuration(Reflect.get(window, "__player"));
    if (playerDuration) return playerDuration;
    const root = document.querySelector("[data-composition-id][data-duration]");
    const authored = root ? parseFloat(root.getAttribute("data-duration") ?? "0") : 0;
    if (authored > 0) return authored;
    const timelines = Reflect.get(window, "__timelines");
    if (typeof timelines !== "object" || timelines === null) return 0;
    for (const key of Object.keys(timelines)) {
      const duration = callDuration(Reflect.get(timelines, key));
      if (duration) return duration;
    }
    return 0;
  });
}
async function collectTweenBoundaries(page) {
  return page.evaluate(() => {
    const property = (target, key) => typeof target === "object" && target !== null || typeof target === "function" ? Reflect.get(target, key) : void 0;
    const numberCall = (target, key, fallback) => {
      const method = property(target, key);
      if (typeof method !== "function") return fallback;
      const result = Reflect.apply(method, target, []);
      return typeof result === "number" ? result : fallback;
    };
    const rootTime = (root, animation, local) => {
      let time = local;
      let node = animation;
      while (node && node !== root) {
        time = numberCall(node, "startTime", 0) + time / (numberCall(node, "timeScale", 1) || 1);
        node = property(node, "parent");
      }
      return time;
    };
    const timelines = Reflect.get(window, "__timelines");
    if (typeof timelines !== "object" || timelines === null) return [];
    const boundaries = [];
    for (const key of Object.keys(timelines)) {
      const timeline = Reflect.get(timelines, key);
      const getChildren = property(timeline, "getChildren");
      if (typeof getChildren !== "function") continue;
      try {
        const children = Reflect.apply(getChildren, timeline, [true, true, false]);
        if (!Array.isArray(children)) continue;
        for (const child of children) {
          const duration = numberCall(child, "duration", Number.NaN);
          if (!Number.isFinite(duration)) continue;
          boundaries.push(rootTime(timeline, child, 0), rootTime(timeline, child, duration));
        }
      } catch {
        continue;
      }
    }
    return boundaries.filter(Number.isFinite);
  });
}
async function collectLayout(page, time, tolerance, layout) {
  const raw = await page.evaluate(
    (options) => {
      const audit = Reflect.get(window, "__hyperframesLayoutAudit");
      if (typeof audit !== "function") return [];
      const result = Reflect.apply(audit, window, [options]);
      return Array.isArray(result) ? result : [];
    },
    {
      time,
      tolerance,
      ...typeof layout?.proseCoverageFloor === "number" ? { proseCoverageFloor: layout.proseCoverageFloor } : {}
    }
  );
  return anchorLayoutIssues(page, raw.flatMap(parseLayoutIssue));
}
async function collectOverlap(page, time) {
  const raw = await page.evaluate(
    (options) => {
      const audit = Reflect.get(window, "__hyperframesOverlapAudit");
      if (typeof audit !== "function") return [];
      const result = Reflect.apply(audit, window, [options]);
      return Array.isArray(result) ? result : [];
    },
    { time }
  );
  return anchorLayoutIssues(page, raw.flatMap(parseLayoutIssue));
}
async function collectLayoutGeometry(page) {
  return page.evaluate(() => {
    const geometry = Reflect.get(window, "__hyperframesLayoutGeometry");
    if (typeof geometry !== "function") return "";
    const result = Reflect.apply(geometry, window, []);
    return typeof result === "string" ? result : "";
  });
}
async function evaluateSampler(page, globalName) {
  return page.evaluate((name) => {
    const sample = Reflect.get(window, name);
    if (typeof sample !== "function") return [];
    const result = Reflect.apply(sample, window, []);
    return Array.isArray(result) ? result : [];
  }, globalName);
}
async function collectRotationSample(page, time) {
  const raw = await evaluateSampler(page, "__hyperframesRotationSample");
  return raw.flatMap((value) => parseRotationSample(value, time));
}
function parseRotationSample(value, time) {
  if (!isRecord(value)) return [];
  const selector = stringValue(value, "selector");
  const cx = numberValue(value, "cx");
  const cy = numberValue(value, "cy");
  const w = numberValue(value, "w");
  const h = numberValue(value, "h");
  const angle = numberValue(value, "angle");
  if (!selector || cx === null || cy === null || w === null || h === null || angle === null) {
    return [];
  }
  return [{ time, selector, cx, cy, w, h, angle }];
}
async function collectOffPivotRotationSample(page, time) {
  const raw = await evaluateSampler(page, "__hyperframesOffPivotRotationSample");
  return { time, samples: raw.flatMap(parseOffPivotRotationSample) };
}
function requiredNumbers(value, keys) {
  const out = {};
  for (const key of keys) {
    const num = numberValue(value, key);
    if (num === null) return null;
    out[key] = num;
  }
  return out;
}
var OFF_PIVOT_REQUIRED_NUMBERS = ["ax", "ay", "bx", "by", "len", "angle", "hubCount"];
function parseOffPivotRotationSample(value) {
  if (!isRecord(value)) return [];
  const selector = stringValue(value, "selector");
  const nums = requiredNumbers(value, OFF_PIVOT_REQUIRED_NUMBERS);
  if (!selector || !nums) return [];
  return [
    {
      selector,
      ax: nums.ax,
      ay: nums.ay,
      bx: nums.bx,
      by: nums.by,
      len: nums.len,
      angle: nums.angle,
      hx: numberValue(value, "hx"),
      hy: numberValue(value, "hy"),
      hr: numberValue(value, "hr"),
      hubCount: nums.hubCount
    }
  ];
}
async function collectGeometryCandidates(page, time, request) {
  try {
    const raw = await page.evaluate((options) => {
      const collect = Reflect.get(window, "__hyperframesGeometryCandidates");
      if (typeof collect !== "function") return [];
      const result = Reflect.apply(collect, window, [options]);
      return Array.isArray(result) ? result : [];
    }, request);
    return raw.flatMap((value) => parseGeometryCandidate(value, time));
  } catch {
    return [];
  }
}
async function findAmbiguousSelectors(page, selectors) {
  const ambiguous = await page.evaluate(
    (values) => values.filter((selector) => {
      try {
        return document.querySelectorAll(selector).length > 1;
      } catch {
        return false;
      }
    }),
    selectors
  );
  return anchorLayoutIssues(page, ambiguous.map(ambiguousIssue));
}
async function collectMotionFrame(page, time, selectors, livenessScopes) {
  const raw = await page.evaluate(
    (options) => {
      const sample = Reflect.get(window, "__hyperframesMotionSample");
      if (typeof sample !== "function") return null;
      return Reflect.apply(sample, window, [options]);
    },
    { selectors, livenessScopes }
  );
  return parseMotionFrame(raw, time, selectors, livenessScopes);
}
async function anchorLayoutIssues(page, issues) {
  const requests = issues.map((issue) => ({
    selector: issue.selector,
    time: issue.time,
    bbox: rectToBbox(issue.rect)
  }));
  const anchors = await resolveAnchors(page, requests);
  return issues.map((issue, index) => ({
    ...issue,
    ...anchors[index] ?? fallbackAnchor(requests[index])
  }));
}
async function resolveAnchors(page, requests) {
  if (requests.length === 0) return [];
  return page.evaluate((values) => {
    const root = document.querySelector("[data-composition-id]");
    return values.map((request) => {
      let element = null;
      try {
        element = document.querySelector(request.selector);
      } catch {
        element = null;
      }
      element ??= root;
      const dataAttributes = {};
      for (const attribute of Array.from(element?.attributes ?? [])) {
        if (attribute.name.startsWith("data-")) dataAttributes[attribute.name] = attribute.value;
      }
      const source = element?.closest("[data-composition-file]")?.getAttribute("data-composition-file");
      return {
        selector: element ? request.selector : "[data-composition-id]",
        dataAttributes,
        sourceFile: source || "index.html",
        bbox: request.bbox,
        time: request.time
      };
    });
  }, requests);
}
async function resolveRootAnchor(page) {
  const anchors = await resolveAnchors(page, [
    { selector: "[data-composition-id]", time: 0, bbox: await compositionBbox(page) }
  ]);
  return anchors[0] ?? fallbackAnchor(void 0);
}
async function compositionBbox(page) {
  return page.evaluate(() => {
    const element = document.querySelector("[data-composition-id]");
    const rect = element?.getBoundingClientRect();
    return rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : { x: 0, y: 0, width: 0, height: 0 };
  });
}
async function collectContrast(page, time, layoutAnnotations = []) {
  let prepared = [];
  try {
    prepared = parsePreparedContrast(await prepareContrast(page, time));
    const measurementShot = await page.screenshot({
      encoding: "base64",
      type: "png",
      omitBackground: true
    });
    if (typeof measurementShot !== "string") throw new Error("Contrast screenshot was not base64");
    const raw = await finishContrast(
      page,
      measurementShot,
      time,
      prepared.map((entry) => entry.raw)
    );
    const finished = raw.flatMap(parseFinishedContrast);
    const entries = joinContrastEntries(finished, prepared);
    const overviewShot = await page.screenshot({ encoding: "base64", type: "png" });
    if (typeof overviewShot !== "string") throw new Error("Overview screenshot was not base64");
    const annotations = [
      ...layoutAnnotations,
      ...contrastFailureAnnotations(entries, layoutAnnotations.length)
    ];
    const pngBase64 = await captureOverviewShot(page, annotations, overviewShot);
    return { entries, pngBase64 };
  } finally {
    await page.evaluate(() => {
      const restore = Reflect.get(window, "__contrastAuditRestoreIfPending");
      if (typeof restore === "function") Reflect.apply(restore, window, []);
    }).catch(() => void 0);
  }
}
function contrastFailureAnnotations(entries, labelOffset) {
  return entries.filter((entry) => !entry.wcagAA).map((entry, index) => ({
    label: `${labelOffset + index + 1} contrast_aa_failure`,
    bbox: entry.bbox
  }));
}
var ANNOTATION_OVERLAY_ID = "__hyperframesCheckAnnotations";
async function captureOverviewShot(page, annotations, fallbackScreenshot) {
  if (annotations.length === 0) return fallbackScreenshot;
  await injectAnnotationOverlay(page, annotations);
  try {
    const shot = await page.screenshot({ encoding: "base64", type: "png" });
    return typeof shot === "string" ? shot : fallbackScreenshot;
  } finally {
    await removeAnnotationOverlay(page);
  }
}
async function injectAnnotationOverlay(page, boxes) {
  await page.evaluate(
    (items, overlayId) => {
      const root = document.createElement("div");
      root.id = overlayId;
      root.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;";
      for (const item of items) {
        const box = document.createElement("div");
        box.style.cssText = `position:fixed;left:${item.bbox.x}px;top:${item.bbox.y}px;width:${item.bbox.width}px;height:${item.bbox.height}px;border:2px solid #ff2d55;box-sizing:border-box;`;
        const label = document.createElement("div");
        label.textContent = item.label;
        label.style.cssText = "position:absolute;top:-18px;left:0;background:#ff2d55;color:#fff;font:11px/16px monospace;padding:0 4px;white-space:nowrap;";
        box.appendChild(label);
        root.appendChild(box);
      }
      document.body.appendChild(root);
    },
    boxes,
    ANNOTATION_OVERLAY_ID
  );
}
async function removeAnnotationOverlay(page) {
  await page.evaluate((overlayId) => {
    document.getElementById(overlayId)?.remove();
  }, ANNOTATION_OVERLAY_ID);
}
async function prepareContrast(page, time) {
  return page.evaluate((sampleTime) => {
    const prepare = Reflect.get(window, "__contrastAuditPrepare");
    const candidates = typeof prepare === "function" ? Reflect.apply(prepare, window, []) : [];
    if (!Array.isArray(candidates)) return [];
    const restores = Reflect.get(window, "__contrastAuditRestores");
    const restoreList = Array.isArray(restores) ? restores : [];
    const escape = (value) => typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
    const selectorFor = (element, fallback) => {
      if (!element) return fallback;
      if (element.id) return `#${escape(element.id)}`;
      const parts = [];
      for (let current = element; current && current !== document.body; current = current.parentElement) {
        const tag = current.tagName.toLowerCase();
        const siblings = current.parentElement ? Array.from(current.parentElement.children).filter(
          (item) => item.tagName === current?.tagName
        ) : [];
        parts.push(
          siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(current) + 1})` : tag
        );
      }
      return parts.reverse().join(" > ") || fallback;
    };
    return candidates.map((candidate, index) => {
      const restore = restoreList[index];
      const candidateObject = typeof candidate === "object" && candidate !== null ? candidate : {};
      const elementValue = typeof restore === "object" && restore !== null ? Reflect.get(restore, "el") : null;
      const element = elementValue instanceof Element ? elementValue : null;
      const fallback = Reflect.get(candidateObject, "selector");
      const selector = selectorFor(
        element,
        typeof fallback === "string" ? fallback : "[data-composition-id]"
      );
      const dataAttributes = {};
      for (const attribute of Array.from(element?.attributes ?? [])) {
        if (attribute.name.startsWith("data-")) dataAttributes[attribute.name] = attribute.value;
      }
      const source = element?.closest("[data-composition-file]")?.getAttribute("data-composition-file");
      return {
        candidate: { ...candidateObject, selector },
        anchor: {
          selector,
          dataAttributes,
          sourceFile: source || "index.html",
          bbox: Reflect.get(candidateObject, "bbox"),
          time: sampleTime
        }
      };
    });
  }, time);
}
async function finishContrast(page, screenshot, time, candidates) {
  return page.evaluate(
    async (payload) => {
      const finish = Reflect.get(window, "__contrastAuditFinish");
      if (typeof finish !== "function") return [];
      const result = await Reflect.apply(finish, window, [
        payload.screenshot,
        payload.time,
        payload.candidates
      ]);
      return Array.isArray(result) ? result : [];
    },
    { screenshot, time, candidates }
  );
}
function parsePreparedContrast(raw) {
  return raw.flatMap((value) => {
    if (!isRecord(value)) return [];
    const raw2 = Reflect.get(value, "candidate");
    const candidate = parseContrastCandidate(raw2);
    const anchor = parseAnchor(Reflect.get(value, "anchor"));
    return candidate && anchor ? [{ raw: raw2, candidate, anchor }] : [];
  });
}
function parseContrastCandidate(value) {
  if (!isRecord(value)) return null;
  const selector = stringValue(value, "selector");
  const text = stringValue(value, "text");
  const fg = rgbaValue(Reflect.get(value, "fg"));
  const large = booleanValue(value, "large");
  const bbox = parseBbox(Reflect.get(value, "bbox"));
  return selector && text !== null && fg && large !== null && bbox ? { selector, text, fg, large, bbox } : null;
}
function parseFinishedContrast(value) {
  if (!isRecord(value)) return [];
  const selector = stringValue(value, "selector");
  const text = stringValue(value, "text");
  const ratio = numberValue(value, "ratio");
  const wcagAA = booleanValue(value, "wcagAA");
  const large = booleanValue(value, "large");
  const fg = stringValue(value, "fg");
  const bg = stringValue(value, "bg");
  return selector && text !== null && ratio !== null && wcagAA !== null && large !== null && fg && bg ? [{ selector, text, ratio, wcagAA, large, fg, bg }] : [];
}
function joinContrastEntries(finished, prepared) {
  const remaining = [...prepared];
  return finished.flatMap((entry) => {
    const index = remaining.findIndex(
      (candidate) => candidate.candidate.selector === entry.selector && candidate.candidate.text === entry.text
    );
    const match = index >= 0 ? remaining.splice(index, 1)[0] : void 0;
    return match ? [{ ...entry, ...match.anchor }] : [];
  });
}
function parseLayoutIssue(value) {
  if (!isRecord(value)) return [];
  const code = layoutCodeValue(Reflect.get(value, "code"));
  const severity = severityValue(Reflect.get(value, "severity"));
  const time = numberValue(value, "time");
  const selector = stringValue(value, "selector");
  const message = stringValue(value, "message");
  const rect = parseRect(Reflect.get(value, "rect"));
  if (!code || !severity || time === null || !selector || !message || !rect) return [];
  const issue = { code, severity, time, selector, message, rect };
  assignOptionalLayoutFields(issue, value);
  return [issue];
}
function parseGeometryCandidate(value, time) {
  if (!isRecord(value)) return [];
  const rect = parseRect(Reflect.get(value, "rect"));
  const elementRect = parseRect(Reflect.get(value, "elementRect"));
  if (!rect || !elementRect) return [];
  const identity = parseGeometryIdentity(value);
  if (!identity) return [];
  const anchor = parseGeometryAnchor(value, rect, time);
  if (!anchor) return [];
  const candidate = { ...identity, ...anchor, rect, elementRect };
  const overflow = parseOverflow(Reflect.get(value, "overflow"));
  if (overflow) candidate.overflow = overflow;
  return [candidate];
}
function parseGeometryIdentity(value) {
  const kindValue = Reflect.get(value, "kind");
  const kind = kindValue === "text" || kindValue === "media" ? kindValue : null;
  if (!kind) return null;
  const tag = stringValue(value, "tag");
  if (!tag) return null;
  const text = stringValue(value, "text");
  return text === null ? null : { kind, tag, text };
}
function parseGeometryAnchor(value, rect, time) {
  const selector = stringValue(value, "selector");
  if (!selector) return null;
  const sourceFile = stringValue(value, "sourceFile");
  if (!sourceFile) return null;
  const dataAttributes = stringRecord(Reflect.get(value, "dataAttributes"));
  return dataAttributes ? {
    selector,
    sourceFile,
    dataAttributes,
    bbox: rectToBbox(rect),
    time
  } : null;
}
function assignOptionalLayoutFields(issue, value) {
  assignOptionalString(issue, value, "containerSelector");
  assignOptionalString(issue, value, "text");
  assignOptionalString(issue, value, "fixHint");
  const containerRect = parseRect(Reflect.get(value, "containerRect"));
  if (containerRect) issue.containerRect = containerRect;
  const overflow = parseOverflow(Reflect.get(value, "overflow"));
  if (overflow) issue.overflow = overflow;
  const coveredFraction = numberValue(value, "coveredFraction");
  if (coveredFraction !== null) issue.coveredFraction = coveredFraction;
}
function recordField(value, key) {
  if (!isRecord(value)) return null;
  const field = Reflect.get(value, key);
  return isRecord(field) ? field : null;
}
function parseMotionFrame(value, time, selectors, scopes) {
  const rawData = recordField(value, "data");
  const rawLiveness = recordField(value, "liveness");
  const data = {};
  for (const selector of selectors) {
    data[selector] = rawData ? parseFrameSample(Reflect.get(rawData, selector)) : null;
  }
  const liveness = {};
  for (const scope of scopes) {
    const signature = rawLiveness ? Reflect.get(rawLiveness, scope) : "";
    liveness[scope] = typeof signature === "string" ? signature : "";
  }
  return { time, data, liveness };
}
function parseFrameSample(value) {
  if (!isRecord(value)) return null;
  const rect = parseRect(Reflect.get(value, "rect"));
  const opacity = numberValue(value, "opacity");
  const visible = booleanValue(value, "visible");
  return rect && opacity !== null && visible !== null ? { rect, opacity, visible } : null;
}
function parseAnchor(value) {
  if (!isRecord(value)) return null;
  const selector = stringValue(value, "selector");
  const sourceFile = stringValue(value, "sourceFile");
  const time = numberValue(value, "time");
  const bbox = parseBbox(Reflect.get(value, "bbox"));
  const dataAttributes = stringRecord(Reflect.get(value, "dataAttributes"));
  return selector && sourceFile && time !== null && bbox && dataAttributes ? { selector, sourceFile, time, bbox, dataAttributes } : null;
}
function runtimeFinding(draft, root) {
  return {
    code: draft.code,
    severity: draft.severity,
    message: (draft.count ?? 1) > 1 ? `${draft.message} (repeated ${draft.count} times)` : draft.message,
    selector: root.selector,
    dataAttributes: root.dataAttributes,
    sourceFile: root.sourceFile,
    bbox: root.bbox,
    time: draft.time,
    url: draft.url,
    line: draft.line
  };
}
function fallbackAnchor(request) {
  return {
    selector: request?.selector ?? "[data-composition-id]",
    dataAttributes: {},
    sourceFile: "index.html",
    bbox: request?.bbox ?? { x: 0, y: 0, width: 0, height: 0 },
    time: request?.time ?? 0
  };
}
function parseBbox(value) {
  if (!isRecord(value)) return null;
  const x = numberValue(value, "x");
  const y = numberValue(value, "y");
  const width = numberValue(value, "width") ?? numberValue(value, "w");
  const height = numberValue(value, "height") ?? numberValue(value, "h");
  return x !== null && y !== null && width !== null && height !== null ? { x, y, width, height } : null;
}
function parseRect(value) {
  if (!isRecord(value)) return null;
  const left = numberValue(value, "left");
  const top = numberValue(value, "top");
  const right = numberValue(value, "right");
  const bottom = numberValue(value, "bottom");
  const width = numberValue(value, "width");
  const height = numberValue(value, "height");
  return left !== null && top !== null && right !== null && bottom !== null && width !== null && height !== null ? { left, top, right, bottom, width, height } : null;
}
function parseOverflow(value) {
  if (!isRecord(value)) return null;
  const overflow = {};
  for (const side of ["left", "right", "top", "bottom"]) {
    const amount = numberValue(value, side);
    if (amount !== null) overflow[side] = amount;
  }
  return Object.keys(overflow).length > 0 ? overflow : null;
}
var LAYOUT_ISSUE_CODES = [
  "text_box_overflow",
  "clipped_text",
  "canvas_overflow",
  "container_overflow",
  "content_overlap",
  "text_occluded",
  "text_not_painted",
  "caption_zone_collision",
  "frame_out_of_frame",
  "escaped_container",
  "panel_out_of_canvas",
  "canvas_content_at_edge",
  "connector_detached",
  "connector_orphan",
  "rotation_pivot_drift",
  "off_pivot_rotation",
  "motion_appears_late",
  "motion_out_of_order",
  "motion_off_frame",
  "motion_frozen",
  "motion_selector_missing",
  "motion_selector_ambiguous"
];
function layoutCodeValue(value) {
  return LAYOUT_ISSUE_CODES.find((code) => code === value) ?? null;
}
function severityValue(value) {
  return value === "error" || value === "warning" || value === "info" ? value : null;
}
function rgbaValue(value) {
  if (!Array.isArray(value) || value.length < 4) return null;
  const [red, green, blue, alpha] = value;
  return [red, green, blue, alpha].every((channel) => typeof channel === "number") ? [red, green, blue, alpha] : null;
}
function stringRecord(value) {
  if (!isRecord(value)) return null;
  const record = {};
  for (const key of Object.keys(value)) {
    const entry = Reflect.get(value, key);
    if (typeof entry !== "string") return null;
    record[key] = entry;
  }
  return record;
}
function assignOptionalString(issue, source, key) {
  const value = stringValue(source, key);
  if (value !== null) issue[key] = value;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function stringValue(value, key) {
  const entry = Reflect.get(value, key);
  return typeof entry === "string" ? entry : null;
}
function numberValue(value, key) {
  const entry = Reflect.get(value, key);
  return typeof entry === "number" && Number.isFinite(entry) ? entry : null;
}
function booleanValue(value, key) {
  const entry = Reflect.get(value, key);
  return typeof entry === "boolean" ? entry : null;
}
function urlPath(url) {
  try {
    return decodeURIComponent(new URL(url).pathname).replace(/^\//, "");
  } catch {
    return url;
  }
}
export {
  captureFindingCrops,
  captureOverviewShot,
  keepBrokenImageAborts,
  preResolveHostileMediaProxies,
  runBrowserCheck
};
