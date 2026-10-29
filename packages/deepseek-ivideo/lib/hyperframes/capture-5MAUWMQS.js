import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  CAPTURE_USER_AGENT,
  downloadAndRewriteFonts,
  downloadAssets,
  isPrivateUrl,
  mergeDrops,
  noDrops,
  safeFetch,
  totalDrops
} from "./chunk-JIXJBOM5.js";
import {
  captureProtocolTimeoutMs,
  isDegradableEvaluateTimeoutError,
  isNavigationTimeoutError,
  withRemainingBudget
} from "./chunk-AWNBM3MZ.js";
import {
  createCaptureWatchdog,
  runWithWatchdog
} from "./chunk-UYEZTK4U.js";
import {
  CaptureDirRefusedError,
  NavigationDeadlineError,
  ensureCaptureDirSync,
  writeCaptureFileSync
} from "./chunk-MRF4AMKD.js";
import {
  launchManagedBrowser
} from "./chunk-KXH7PX6M.js";
import {
  loadOptionalPackage
} from "./chunk-3DKN5WKL.js";
import {
  writeNewFileSync
} from "./chunk-4YYJOFKS.js";
import "./chunk-6BEFEWFB.js";
import "./chunk-UITPTRCM.js";
import {
  diag
} from "./chunk-VWG7OQKU.js";
import {
  applyDotEnv
} from "./chunk-QB6EMQ7I.js";
import {
  createCaptureDownloadBudget,
  readBoundedResponse
} from "./chunk-AWDFDFI3.js";
import "./chunk-PBN6GBJE.js";
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
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-M2WBOQ2Q.js";

// src/capture/partialCapture.ts
import { join } from "path";
function serializeTokensForCapture(tokens) {
  const tokensForDisk = {
    ...tokens,
    svgs: tokens.svgs.map(({ outerHTML: _, ...rest }) => rest)
  };
  return JSON.stringify(tokensForDisk, null, 2);
}
function createPartialCaptureState(opts) {
  return {
    tokens: {
      title: "",
      description: "",
      cssVariables: {},
      fonts: [],
      colors: [],
      headings: [],
      ctas: [],
      svgs: [],
      sections: []
    },
    designStyles: {
      typography: [],
      spacing: { observed: [], baseUnit: 0 },
      radius: [],
      shadows: [],
      buttons: [],
      cards: [],
      nav: null
    },
    extracted: {
      headHtml: "",
      bodyHtml: "",
      cssomRules: "",
      htmlAttrs: "",
      viewportWidth: opts.viewportWidth ?? 1920,
      viewportHeight: opts.viewportHeight ?? 1080,
      fullPageHeight: 0
    },
    pageHtml: "<!doctype html>\n<html><head></head><body></body></html>\n",
    screenshots: [],
    assets: [],
    dropped: noDrops(),
    warnings: []
  };
}
function writePartialCaptureBundle(opts, state, lastPhase) {
  const hostname = new URL(opts.url).hostname.replace(/^www\./, "");
  const extractedDir = ensureCaptureDirSync(opts.outputDir, join(opts.outputDir, "extracted"));
  writeCaptureFileSync(join(extractedDir, "tokens.json"), serializeTokensForCapture(state.tokens));
  writeCaptureFileSync(
    join(extractedDir, "design-styles.json"),
    JSON.stringify(state.designStyles, null, 2)
  );
  writeCaptureFileSync(join(extractedDir, "page.html"), state.pageHtml);
  const metaPath = join(opts.outputDir, "meta.json");
  try {
    writeCaptureFileSync(
      metaPath,
      JSON.stringify({ id: hostname + "-video", name: hostname, partial: true }, null, 2),
      { flag: "wx" }
    );
  } catch (err) {
    const code = err && typeof err === "object" && "code" in err ? err.code : void 0;
    if (code !== "EEXIST") throw err;
  }
  return {
    ok: false,
    projectDir: opts.outputDir,
    url: opts.url,
    httpStatus: null,
    title: state.tokens.title,
    extracted: state.extracted,
    screenshots: state.screenshots,
    tokens: state.tokens,
    assets: state.assets,
    dropped: state.dropped,
    warnings: [
      ...state.warnings,
      "Capture deadline reached; returning the partial capture bundle."
    ],
    lastPhase
  };
}

// src/capture/lottieValidation.ts
import AdmZip from "adm-zip";

// src/capture/lottieArchivePreflight.ts
function preflightLottieArchive(bytes) {
  const end = findDirectoryEnd(bytes);
  if (end < 0) return false;
  if (!unambiguousFooter(bytes, end)) return false;
  const count = bytes.readUInt16LE(end + 10);
  if (count > 256 || bytes.readUInt16LE(end + 8) !== count) return false;
  if (bytes.readUInt32LE(end + 4) !== 0) return false;
  let offset = bytes.readUInt32LE(end + 16);
  const directoryEnd = offset + bytes.readUInt32LE(end + 12);
  if (directoryEnd > end) return false;
  for (let i = 0; i < count; i++) {
    const next = nextBoundedEntry(bytes, offset, directoryEnd);
    if (next === null) return false;
    offset = next;
  }
  return offset === directoryEnd;
}
function unambiguousFooter(bytes, end) {
  const signature = Buffer.from([80, 75, 5, 6]);
  if (bytes.lastIndexOf(signature) !== end) return false;
  const preceding = bytes.subarray(Math.max(0, end - 76), end);
  return ![
    signature,
    Buffer.from([80, 75, 6, 6]),
    Buffer.from([80, 75, 6, 7])
  ].some((marker) => preceding.includes(marker));
}
function findDirectoryEnd(bytes) {
  for (let at = bytes.length - 22; at >= Math.max(0, bytes.length - 65557); at--) {
    if (bytes.readUInt32LE(at) === 101010256 && at + 22 + bytes.readUInt16LE(at + 20) === bytes.length)
      return at;
  }
  return -1;
}
function nextBoundedEntry(bytes, offset, end) {
  if (offset + 46 > end || bytes.readUInt32LE(offset) !== 33639248) return null;
  const length = bytes.readUInt16LE(offset + 28);
  const next = offset + 46 + length + bytes.readUInt16LE(offset + 30) + bytes.readUInt16LE(offset + 32);
  if (length > 512 || next > end) return null;
  const name = bytes.toString("utf8", offset + 46, offset + 46 + length);
  return safeLottieArchivePath(name) ? next : null;
}
function safeLottieArchivePath(path) {
  if (path.length > 512 || path.split("/").length > 16) return false;
  if (path.startsWith("/") || /[\\:]/.test(path)) return false;
  if (Array.from(path).some((char) => char.charCodeAt(0) < 32)) return false;
  return path.split("/").every((segment) => segment !== ".." && segment !== ".");
}

// src/capture/lottieValidation.ts
var MAX_LOTTIE_BYTES = 10 * 1024 * 1024;
function readLottieArchive(bytes) {
  if (bytes.length > MAX_LOTTIE_BYTES) return null;
  if (!preflightLottieArchive(bytes)) return null;
  try {
    const zip = new AdmZip(bytes);
    if (zip.getEntryCount() > 256) return null;
    const entries = zip.getEntries();
    if (entries.length > 256) return null;
    if (!validArchiveEntries(entries)) return null;
    const animation = entries.find(
      (entry) => /^(?:a|animations)\/[^/]+\.json$/.test(entry.entryName)
    );
    if (!animation || animation.header.size <= 0) return null;
    const data = animation.getData();
    if (data.length !== animation.header.size || data.length > MAX_LOTTIE_BYTES) return null;
    return data.toString("utf8");
  } catch {
    return null;
  }
}
function validArchiveEntries(entries) {
  let total = 0;
  for (const entry of entries) {
    if (!safeLottieArchivePath(entry.entryName)) return false;
    const size = entry.header.size;
    if (!Number.isSafeInteger(size) || size < 0 || size > MAX_LOTTIE_BYTES) return false;
    total += size;
    if (total > 50 * 1024 * 1024) return false;
  }
  return true;
}
function record(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function dimension(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 16384;
}
function validLottieJson(source) {
  if (Buffer.byteLength(source) > MAX_LOTTIE_BYTES) return false;
  try {
    const value = JSON.parse(source);
    if (!record(value) || !dimension(value.w) || !dimension(value.h)) return false;
    if (value.w * value.h > 4e7 || !Array.isArray(value.layers)) return false;
    return validLottieTiming(value) && boundedLottieTree(value);
  } catch {
    return false;
  }
}
function validLottieTiming(value) {
  if (value.fr !== void 0 && (typeof value.fr !== "number" || value.fr <= 0 || value.fr > 240))
    return false;
  if (![value.ip, value.op].every(validOptionalFrame)) return false;
  const start = numberOr(value.ip, 0);
  const end = numberOr(value.op, 0);
  const rate = numberOr(value.fr, 30);
  const duration = (end - start) / rate;
  return Number.isFinite(duration) && duration >= 0 && duration <= 3600;
}
function numberOr(value, fallback) {
  return typeof value === "number" ? value : fallback;
}
function validOptionalFrame(frame) {
  return frame === void 0 || typeof frame === "number" && Number.isFinite(frame) && Math.abs(frame) <= 1e7;
}
function jsonChildren(value) {
  return value !== null && typeof value === "object" ? Object.entries(value) : [];
}
function boundedLottieTree(root) {
  const pending = [{ value: root, depth: 0 }];
  let count = 0;
  while (pending.length) {
    const item = pending.pop();
    if (++count > 1e5 || item.depth > 128) return false;
    if (typeof item.value === "number" && !Number.isFinite(item.value)) return false;
    for (const [key, value] of jsonChildren(item.value)) {
      if (!validLottieEntry(key, value)) return false;
      if (count + pending.length >= 1e5) return false;
      pending.push({ value, depth: item.depth + 1 });
    }
  }
  return true;
}
function validLottieEntry(key, value) {
  if (["__proto__", "constructor", "prototype"].includes(key)) return false;
  return key !== "layers" || Array.isArray(value) && value.every(record);
}

// src/capture/lottieDiscovery.ts
async function discoverLottieResponse(response, budget, timeoutMs = 1e4) {
  const url = response.url();
  const pathname = new URL(url).pathname;
  if (pathname.endsWith(".lottie")) return { url };
  const contentType = response.headers()["content-type"] ?? "";
  if (!pathname.endsWith(".json") && !/application\/json|text\/plain/i.test(contentType))
    return null;
  if (budget.remainingBytes <= 0) return null;
  const fetched = await safeFetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    headers: { "User-Agent": CAPTURE_USER_AGENT }
  });
  if (!fetched?.ok) return null;
  const bytes = await readBoundedResponse(fetched, 5e6, budget);
  if (!bytes) return null;
  const source = bytes.toString("utf8");
  if (!validLottieJson(source)) return null;
  const data = JSON.parse(source);
  if (!hasDiscoveryFields(data)) return null;
  return { url, data, dataBudget: budget };
}
function hasDiscoveryFields(data) {
  if (data === null || typeof data !== "object") return false;
  return ["v", "ip", "op", "layers", "w", "h", "fr"].every((key) => key in data);
}
var LottieDiscovery = class {
  candidates = /* @__PURE__ */ new Map();
  closed = false;
  collect(response) {
    if (this.closed) return;
    const url = response.url();
    if (this.candidates.has(url)) return;
    const contentType = response.headers()["content-type"] ?? "";
    const priority = candidatePriority(url, contentType);
    if (priority === null) return;
    if (this.candidates.size >= 32) {
      const worst = [...this.candidates.values()].sort((a, b) => b.priority - a.priority).find((candidate) => candidate.priority > priority);
      if (!worst) return;
      this.candidates.delete(worst.url);
    }
    this.candidates.set(url, { url, contentType, priority });
  }
  async run(sharedBudget, remainingMs) {
    if (this.closed) return [];
    this.closed = true;
    const candidates = [...this.candidates.values()].sort((a, b) => a.priority - b.priority);
    this.candidates.clear();
    const deadline = Date.now() + Math.min(1e4, remainingMs());
    const budget = { remainingBytes: Math.min(20 * 1024 * 1024, sharedBudget.remainingBytes) };
    const found = [];
    for (const candidate of candidates) {
      const timeout = Math.floor(Math.min(deadline - Date.now(), remainingMs()));
      if (timeout <= 0 || budget.remainingBytes <= 0 || found.length >= 10) break;
      const before = budget.remainingBytes;
      try {
        const result = await discoverLottieResponse(
          { url: () => candidate.url, headers: () => ({ "content-type": candidate.contentType }) },
          budget,
          timeout
        );
        if (result) found.push({ ...result, dataBudget: sharedBudget });
      } catch {
      } finally {
        sharedBudget.remainingBytes -= before - budget.remainingBytes;
      }
    }
    return found;
  }
};
function candidatePriority(url, contentType) {
  const path = new URL(url).pathname;
  if (path.endsWith(".lottie")) return 0;
  if (path.endsWith(".json")) return 1;
  return /application\/json|text\/plain/i.test(contentType) ? 2 : null;
}

// src/capture/captureAttempt.ts
import { existsSync as existsSync5 } from "fs";
import { join as join10 } from "path";

// src/capture/lazyScrollForCapture.ts
var LAZY_SCROLL_STEP_DELAY_MS = 400;
var LAZY_SCROLL_MAX_IMAGE_WAIT_MS = 5e3;
var LAZY_SCROLL_BOTTOM_SETTLE_MS = 800;
var LAZY_SCROLL_IMAGE_POLL_MS = 250;
async function evaluateWithinBudget(page, expression, deadline, label) {
  return withRemainingBudget(page.evaluate(expression), deadline - Date.now(), label);
}
async function settleAfterScroll(page, deadline, sleep) {
  const bottomSettleMs = Math.min(LAZY_SCROLL_BOTTOM_SETTLE_MS, Math.max(0, deadline - Date.now()));
  if (bottomSettleMs > 0) {
    await evaluateWithinBudget(
      page,
      `window.scrollTo(0, document.body.scrollHeight)`,
      deadline,
      "lazy-scroll-bottom"
    );
    await sleep(bottomSettleMs);
  }
  const imageDeadline = Math.min(deadline, Date.now() + LAZY_SCROLL_MAX_IMAGE_WAIT_MS);
  while (Date.now() < imageDeadline) {
    const pending = await evaluateWithinBudget(
      page,
      `Array.from(document.images).filter(function(img) { return !img.complete; }).length`,
      imageDeadline,
      "lazy-scroll-image-pending"
    );
    if (!(pending > 0)) {
      break;
    }
    const waitMs = Math.min(LAZY_SCROLL_IMAGE_POLL_MS, imageDeadline - Date.now());
    if (waitMs <= 0) {
      break;
    }
    await sleep(waitMs);
  }
  if (deadline - Date.now() > 0) {
    await evaluateWithinBudget(page, `window.scrollTo(0, 0)`, deadline, "lazy-scroll-reset");
  }
}
async function lazyScrollForCapture(page, budgetMs, opts = {}) {
  if (budgetMs <= 0) {
    return { steps: 0, timedOut: false, degraded: false };
  }
  const stepDelayMs = opts.stepDelayMs ?? LAZY_SCROLL_STEP_DELAY_MS;
  const sleep = opts.sleep ?? ((ms) => new Promise((resolve2) => setTimeout(resolve2, ms)));
  const deadline = Date.now() + budgetMs;
  let steps = 0;
  let timedOut = false;
  let degraded = false;
  try {
    while (Date.now() < deadline) {
      const state = await evaluateWithinBudget(
        page,
        `(() => {
        var y = window.scrollY || window.pageYOffset || 0;
        var view = window.innerHeight || 0;
        var height = document.body ? document.body.scrollHeight : 0;
        var next = Math.min(y + view * 0.7, Math.max(0, height - view));
        var atBottom = height <= view + 2 || next <= y + 1;
        window.scrollTo(0, atBottom ? height : next);
        return { atBottom: atBottom };
      })()`,
        deadline,
        "lazy-scroll-step"
      );
      steps += 1;
      if (state.atBottom) {
        break;
      }
      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        timedOut = true;
        break;
      }
      await sleep(Math.min(stepDelayMs, remaining));
    }
    if (Date.now() >= deadline) {
      timedOut = true;
    }
    if (deadline - Date.now() > 0) {
      await settleAfterScroll(page, deadline, sleep);
    }
  } catch (err) {
    if (!isDegradableEvaluateTimeoutError(err)) {
      throw err;
    }
    degraded = true;
    timedOut = true;
    opts.onWarning?.("lazy-scroll evaluate timed out; continuing with current page state");
    if (deadline - Date.now() > 0) {
      try {
        await evaluateWithinBudget(page, `window.scrollTo(0, 0)`, deadline, "lazy-scroll-recovery");
      } catch {
      }
    }
  }
  return { steps, timedOut, degraded };
}

// src/capture/animationCataloger.ts
async function setupAnimationCapture(page) {
  await page.evaluateOnNewDocument(`
    window.__hf_io_targets = [];
    var OrigIO = window.IntersectionObserver;
    window.IntersectionObserver = function(callback, options) {
      var observer = new OrigIO(callback, options);
      var origObserve = observer.observe.bind(observer);
      observer.observe = function(target) {
        var sel = target.id ? '#' + target.id : target.tagName.toLowerCase();
        if (target.className && typeof target.className === 'string') {
          var cls = Array.from(target.classList).slice(0, 2).join('.');
          if (cls) sel += '.' + cls;
        }
        try {
          var rect = target.getBoundingClientRect();
          window.__hf_io_targets.push({
            selector: sel,
            rect: { top: Math.round(rect.top + window.scrollY), height: Math.round(rect.height), width: Math.round(rect.width) }
          });
        } catch(e) {}
        return origObserve(target);
      };
      return observer;
    };
    window.IntersectionObserver.prototype = OrigIO.prototype;
  `);
}
async function startCdpAnimationCapture(page) {
  const cdp = await page.createCDPSession();
  await cdp.send("Animation.enable");
  const animations = [];
  cdp.on("Animation.animationStarted", (event) => {
    animations.push({
      id: event.animation.id,
      name: event.animation.name || "",
      type: event.animation.type,
      duration: event.animation.source?.duration,
      delay: event.animation.source?.delay
    });
  });
  return { cdp, animations };
}
var EMPTY_ANIMATION_SCAN = {
  webAnimations: [],
  cssDeclarations: [],
  scrollTargets: [],
  canvasCount: 0
};
async function collectAnimationCatalog(page, cdpAnimations, cdp, opts = {}) {
  const scrollBudgetMs = opts.scrollBudgetMs ?? 8e3;
  const evaluateBudgetMs = opts.evaluateBudgetMs ?? 15e3;
  const scroll = await lazyScrollForCapture(page, scrollBudgetMs);
  let timedOut = scroll.degraded || scroll.timedOut;
  let result = EMPTY_ANIMATION_SCAN;
  try {
    result = await withRemainingBudget(
      page.evaluate(`(() => {
    var webAnimations = [];
    var cssDeclarations = [];

    try {
      var anims = document.getAnimations();
      webAnimations = anims.map(function(anim) {
        var r = { type: anim.constructor.name, playState: anim.playState, animationName: anim.animationName || null };
        var effect = anim.effect;
        if (effect && effect.target) {
          var t = effect.target;
          r.targetSelector = t.id ? '#' + t.id : t.tagName.toLowerCase();
          if (t.className && typeof t.className === 'string') {
            var cls = Array.from(t.classList).slice(0, 3).join('.');
            if (cls) r.targetSelector += '.' + cls;
          }
          try { r.targetRect = t.getBoundingClientRect().toJSON(); } catch(e) {}
        }
        if (effect && typeof effect.getKeyframes === 'function') {
          try { r.keyframes = effect.getKeyframes(); } catch(e) {}
        }
        if (effect && typeof effect.getComputedTiming === 'function') {
          try {
            var timing = effect.getComputedTiming();
            r.timing = { duration: timing.duration, delay: timing.delay, iterations: timing.iterations, easing: timing.easing, direction: timing.direction };
          } catch(e) {}
        }
        return r;
      });
    } catch(e) {}

    var allEls = document.querySelectorAll('*');
    for (var i = 0; i < allEls.length && i < 5000; i++) {
      var el = allEls[i];
      try {
        var cs = getComputedStyle(el);
        var hasAnim = cs.animationName && cs.animationName !== 'none';
        var hasTrans = cs.transitionProperty && cs.transitionProperty !== 'all' && cs.transitionProperty !== 'none' && cs.transitionDuration !== '0s';
        if (hasAnim || hasTrans) {
          var sel = el.id ? '#' + el.id : el.tagName.toLowerCase();
          if (el.className && typeof el.className === 'string') {
            var cls = Array.from(el.classList).slice(0, 2).join('.');
            if (cls) sel += '.' + cls;
          }
          var entry = { selector: sel };
          if (hasAnim) entry.animation = { name: cs.animationName, duration: cs.animationDuration, easing: cs.animationTimingFunction };
          if (hasTrans) entry.transition = { property: cs.transitionProperty, duration: cs.transitionDuration };
          cssDeclarations.push(entry);
        }
      } catch(e) {}
    }

    var scrollTargets = (window.__hf_io_targets || []).map(function(t) {
      return { selector: t.selector, rect: t.rect };
    });

    var canvasCount = document.querySelectorAll('canvas').length;

    return { webAnimations: webAnimations, cssDeclarations: cssDeclarations, scrollTargets: scrollTargets, canvasCount: canvasCount };
  })()`),
      evaluateBudgetMs,
      "animation-catalog"
    );
  } catch (err) {
    if (!isDegradableEvaluateTimeoutError(err)) {
      throw err;
    }
    timedOut = true;
  }
  try {
    await cdp.send("Animation.disable");
  } catch {
  }
  return {
    catalog: {
      webAnimations: result.webAnimations,
      cssDeclarations: result.cssDeclarations,
      scrollTargets: result.scrollTargets,
      cdpAnimations,
      summary: {
        webAnimations: result.webAnimations.length,
        cssDeclarations: result.cssDeclarations.length,
        scrollTargets: result.scrollTargets.length,
        cdpAnimations: cdpAnimations.length,
        canvases: result.canvasCount
      }
    },
    timedOut
  };
}

// src/capture/scaffolding.ts
import { existsSync, readFileSync } from "fs";
import { join as join2, resolve } from "path";
function loadEnvFile(startDir) {
  try {
    let dir = resolve(startDir);
    for (let i = 0; i < 5; i++) {
      const envPath = resolve(dir, ".env");
      try {
        applyDotEnv(readFileSync(envPath, "utf-8"), process.env);
        break;
      } catch {
        dir = resolve(dir, "..");
      }
    }
  } catch {
  }
}
async function generateProjectScaffold(outputDir, url, tokens, animationCatalog, hasScreenshots, hasLotties, hasShaders, catalogedAssets, progress, warnings, detectedLibraries) {
  const metaPath = join2(outputDir, "meta.json");
  if (!existsSync(metaPath)) {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    writeNewFileSync(
      metaPath,
      JSON.stringify({ id: hostname + "-video", name: tokens.title || hostname }, null, 2)
    );
  }
  try {
    const { generateAgentPrompt } = await import("./agentPromptGenerator-VIIPZCJ3.js");
    generateAgentPrompt(
      outputDir,
      url,
      tokens,
      animationCatalog,
      hasScreenshots,
      hasLotties,
      hasShaders,
      catalogedAssets,
      detectedLibraries
    );
    progress("agent", "AGENTS.md + CLAUDE.md generated");
  } catch (err) {
    warnings.push(`AGENTS.md/CLAUDE.md generation failed: ${err}`);
  }
}

// src/capture/types.ts
var CAPTURE_PHASE_SCHEMA = "hyperframes.capture.phase.v1";

// src/capture/browserLaunchArgs.ts
function captureBrowserArgs(disableWebgl, viewportWidth, viewportHeight) {
  return [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    ...disableWebgl ? ["--disable-gpu"] : ["--enable-webgl", "--ignore-gpu-blocklist", "--use-gl=angle", "--use-angle=swiftshader"],
    "--disable-blink-features=AutomationControlled",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    `--window-size=${viewportWidth},${viewportHeight}`
  ];
}

// src/capture/pageBlockDetection.ts
function detectBlockedPage(evidence) {
  const isMinimalDom = evidence.bodyChildCount <= 5 && evidence.textLength < 500;
  const hasBlockedStatus = evidence.httpStatus === 401 || evidence.httpStatus === 403 || evidence.httpStatus === 429;
  const hasBlockedTitle = /^(?:(?:error\s*)?(?:401|403|429)(?:\s*(?:[-:—]\s*)?(?:forbidden|unauthorized|access denied|too many requests))?|forbidden|access denied|attention required!?|just a moment(?:\.{3})?)(?:\s*[|—-]\s*(?:cloudflare|sucuri website firewall))?$/i.test(
    evidence.title.trim()
  );
  if (!isMinimalDom || !evidence.hasChallengeElement && !hasBlockedStatus && !hasBlockedTitle) {
    return void 0;
  }
  const statusDetail = evidence.httpStatus === null ? "no HTTP status" : `HTTP ${evidence.httpStatus}`;
  return `Website capture blocked: the loaded page matched an access-protection response (${statusDetail}, title ${JSON.stringify(evidence.title)}, ${evidence.textLength} text chars). The site may reject automated or data-center traffic; retry from an allowed network or provide source assets directly.`;
}

// src/capture/navigateForCapture.ts
var NETWORK_IDLE_ATTEMPT_MS = 3e4;
function networkIdleAttemptTimeoutMs(totalTimeoutMs) {
  return Math.min(NETWORK_IDLE_ATTEMPT_MS, Math.max(0, totalTimeoutMs));
}
async function navigateForCapture(page, url, totalTimeoutMs) {
  const networkIdleTimeoutMs = networkIdleAttemptTimeoutMs(totalTimeoutMs);
  try {
    const response2 = await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: networkIdleTimeoutMs
    });
    return {
      response: response2,
      waitUntil: "networkidle2",
      networkIdleTimeoutMs,
      fellBackFromNetworkIdle: false
    };
  } catch (err) {
    if (!isNavigationTimeoutError(err) || networkIdleTimeoutMs >= totalTimeoutMs) {
      throw err;
    }
  }
  const fallbackTimeoutMs = totalTimeoutMs - networkIdleTimeoutMs;
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: fallbackTimeoutMs
  });
  return {
    response,
    waitUntil: "domcontentloaded",
    networkIdleTimeoutMs,
    fellBackFromNetworkIdle: true
  };
}

// src/capture/responseRecord.ts
import { join as join3 } from "path";
var RESPONSE_RECORD_FILENAME = "response.json";
function writeResponseRecord(extractedDir, record2) {
  writeCaptureFileSync(
    join3(extractedDir, RESPONSE_RECORD_FILENAME),
    JSON.stringify(record2, null, 2),
    "utf-8"
  );
}

// src/capture/navigationPhase.ts
import { join as join4 } from "path";
async function navigatePage(context) {
  let navigation;
  try {
    navigation = await navigateForCapture(context.page1, context.url, context.timeout);
  } catch (err) {
    if (isNavigationTimeoutError(err)) {
      let webglObserved = false;
      try {
        webglObserved = Boolean(await context.page1.evaluate("Boolean(window.__hfWebglSeen)"));
      } catch {
      }
      throw new NavigationDeadlineError(err, webglObserved);
    }
    throw err;
  }
  if (navigation.fellBackFromNetworkIdle) {
    context.warnings.push(
      `networkidle2 timed out after ${navigation.networkIdleTimeoutMs}ms; continued with domcontentloaded`
    );
    context.progress(
      "warn",
      `networkidle2 timed out after ${navigation.networkIdleTimeoutMs}ms; continuing with domcontentloaded`
    );
  }
  context.postNavigationDeadline = Date.now() + context.budgetMs;
  await new Promise((resolve2) => setTimeout(resolve2, context.settleTime));
  return navigation;
}
async function checkPageContent(context) {
  try {
    return await withRemainingBudget(
      context.page1.evaluate(`(() => {
  var text = (document.body && document.body.innerText || "").trim();
  var title = document.title || "";
  var hasCfTurnstile = !!document.querySelector('.cf-turnstile, [data-sitekey], iframe[src*="challenges.cloudflare.com"], #challenge-running, #challenge-form');
  var bodyChildCount = document.body ? document.body.children.length : 0;
  return { textLength: text.length, title: title, hasChallengeElement: hasCfTurnstile, bodyChildCount: bodyChildCount };
})()`),
      Math.min(5e3, context.remainingMs()),
      "content-check"
    );
  } catch (err) {
    if (!isDegradableEvaluateTimeoutError(err)) throw err;
    context.contentCheckTimedOut = true;
    const message = "post-navigation content check timed out; continuing with HTTP-status blocked-page detection only";
    context.warnings.push(message);
    context.progress("warn", message);
    return context.pageContentCheck;
  }
}
function persistNavigationResult(context, navigationResponse, pageContentCheck) {
  context.httpStatus = navigationResponse ? navigationResponse.status() : null;
  if (context.canWrite()) {
    writeResponseRecord(join4(context.outputDir, "extracted"), { status: context.httpStatus });
  }
  const blockedReason = detectBlockedPage({
    httpStatus: context.httpStatus,
    ...context.contentCheckTimedOut ? { title: "", textLength: 0, bodyChildCount: 0, hasChallengeElement: false } : pageContentCheck
  });
  if (blockedReason) {
    context.phase("navigation", "degraded", "blocked");
    throw new Error(blockedReason);
  }
}
async function runNavigationChecks(context) {
  const navigation = await navigatePage(context);
  const pageContentCheck = await checkPageContent(context);
  persistNavigationResult(context, navigation.response, pageContentCheck);
  context.phase("navigation", "completed");
  context.phase("core-extraction", "started");
  return {
    pageContentCheck,
    contentCheckTimedOut: context.contentCheckTimedOut,
    httpStatus: context.httpStatus,
    postNavigationDeadline: context.postNavigationDeadline
  };
}

// src/capture/contentExtractor.ts
import {
  existsSync as existsSync2,
  readdirSync,
  statSync,
  readFileSync as readFileSync2,
  openSync,
  fstatSync,
  closeSync
} from "fs";
import { basename, join as join5 } from "path";
var DEFAULT_VISION_REQUEST_TIMEOUT_MS = 3e4;
function resolveVisionPhaseCompletion(outcome, remainingMs) {
  if (outcome.budgetExhausted || remainingMs <= 0) {
    return { status: "degraded", reason: "budget-exhausted" };
  }
  if (outcome.internalError) {
    return { status: "degraded", reason: "internal-error" };
  }
  if (outcome.timedOutRequests > 0) {
    return { status: "degraded", reason: "request-timeout" };
  }
  if (outcome.failedRequests > 0) {
    return { status: "degraded", reason: "provider-error" };
  }
  return { status: "completed" };
}
var VisionRequestTimeoutError = class extends Error {
  constructor(timeoutMs) {
    super(`Vision request timed out after ${timeoutMs}ms`);
    this.name = "VisionRequestTimeoutError";
  }
};
function resolveVisionRequestTimeoutMs() {
  const configured = Number(process.env.HYPERFRAMES_VISION_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_VISION_REQUEST_TIMEOUT_MS;
}
async function runBoundedVisionRequest(request, timeoutMs) {
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((_resolve, reject) => {
    timer = setTimeout(() => {
      reject(new VisionRequestTimeoutError(timeoutMs));
      controller.abort();
    }, timeoutMs);
  });
  try {
    return await Promise.race([request(controller.signal), timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
async function detectLibraries(page, capturedShaders) {
  let detectedLibraries = [];
  try {
    detectedLibraries = await page.evaluate(`(() => {
      var libs = [];
      function add(name) { if (libs.indexOf(name) === -1) libs.push(name); }

      // 1. Window globals (works for CDN-loaded / non-bundled libraries)
      if (typeof window.gsap !== 'undefined' || typeof window.TweenMax !== 'undefined') add('GSAP');
      if (typeof window.ScrollTrigger !== 'undefined') add('GSAP ScrollTrigger');
      if (typeof window.THREE !== 'undefined') add('Three.js');
      if (typeof window.PIXI !== 'undefined') add('PixiJS');
      if (typeof window.BABYLON !== 'undefined') add('Babylon.js');
      if (typeof window.Lottie !== 'undefined' || typeof window.lottie !== 'undefined') add('Lottie');
      if (typeof window.__NEXT_DATA__ !== 'undefined') add('Next.js');
      if (typeof window.__NUXT__ !== 'undefined') add('Nuxt');
      if (typeof window.Webflow !== 'undefined') add('Webflow');

      // 2. DOM fingerprints (survive bundling \u2014 most reliable for modern sites)
      // Three.js sets data-engine on every canvas it creates
      var threeCanvas = document.querySelector('canvas[data-engine*="three"]');
      if (threeCanvas) add('Three.js (' + (threeCanvas.getAttribute('data-engine') || '') + ')');
      // Babylon.js also sets data-engine
      var babylonCanvas = document.querySelector('canvas[data-engine*="Babylon"]');
      if (babylonCanvas) add('Babylon.js');
      // Lottie web components
      if (document.querySelector('dotlottie-wc, lottie-player, dotlottie-player')) add('Lottie');
      // Rive
      if (document.querySelector('canvas[class*="rive"], rive-canvas')) add('Rive');
      // React/Next.js
      if (document.getElementById('__next')) add('Next.js');
      if (document.getElementById('__nuxt')) add('Nuxt');
      if (document.querySelector('[data-reactroot], [data-react-helmet]')) add('React');
      // Svelte
      if (document.querySelector('[class*="svelte-"]')) add('Svelte');
      // Tailwind (utility class detection)
      if (document.querySelector('[class*="flex "], [class*="grid "], [class*="px-"], [class*="py-"]')) add('Tailwind CSS');
      // Framer Motion
      if (document.querySelector('[style*="--framer-"], [data-framer-component-type]')) add('Framer Motion');

      // 3. Script URL patterns
      document.querySelectorAll('script[src]').forEach(function(s) {
        var src = s.src.toLowerCase();
        if (src.includes('gsap') || src.includes('tweenmax') || src.includes('greensock')) add('GSAP');
        if (src.includes('scrolltrigger')) add('GSAP ScrollTrigger');
        if (src.includes('three.module') || src.includes('three.min')) add('Three.js');
        if (src.includes('pixi')) add('PixiJS');
        if (src.includes('lottie') || src.includes('bodymovin')) add('Lottie');
        if (src.includes('framer-motion')) add('Framer Motion');
        if (src.includes('anime.min') || src.includes('animejs')) add('Anime.js');
        if (src.includes('matter.min') || src.includes('matter-js')) add('Matter.js');
        if (src.includes('lenis')) add('Lenis (smooth scroll)');
      });

      return libs;
    })()`);
  } catch {
  }
  try {
    const shaders = capturedShaders || [];
    if (shaders.length > 0) {
      const allSource = shaders.map((s) => s.source).join("\n");
      const add = (name) => {
        if (!detectedLibraries.includes(name)) detectedLibraries.push(name);
      };
      add("WebGL");
      if (allSource.includes("modelViewMatrix") && allSource.includes("projectionMatrix"))
        add("Three.js (confirmed via shaders)");
      else if (allSource.includes("vTextureCoord") && allSource.includes("uSampler") && !allSource.includes("modelViewMatrix"))
        add("PixiJS (confirmed via shaders)");
      else if (allSource.includes("viewProjection") && allSource.includes("world"))
        add("Babylon.js (confirmed via shaders)");
    }
  } catch {
  }
  return detectedLibraries;
}
async function extractVisibleText(page) {
  let visibleTextContent = "";
  try {
    visibleTextContent = await page.evaluate(`(() => {
      var cookieRe = /^(accept|cookie|privacy|that's fine|got it|i agree|reject all|accept all|manage cookies|consent)$/i;
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      var texts = [];
      var node;
      while (node = walker.nextNode()) {
        var text = (node.textContent || '').trim();
        if (text.length < 3) continue;
        var el = node.parentElement;
        if (!el) continue;
        var style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;
        var tag = el.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'noscript') continue;
        // Skip very short text inside nav/footer (catches single-word nav links)
        // Threshold is 8 chars to preserve footer copy like "\xA9 2026 Stripe" (16 chars)
        var inNavOrFooter = el.closest('nav, footer, [role="navigation"]');
        if (inNavOrFooter && text.length < 8) continue;
        // Skip common cookie/consent patterns
        if (cookieRe.test(text)) continue;
        texts.push('[' + tag + '] ' + text);
      }
      return texts.join('\\n');
    })()`);
    if (visibleTextContent.length > 3e4) {
      visibleTextContent = visibleTextContent.slice(0, 3e4) + "\n[...truncated]";
    }
  } catch {
  }
  return visibleTextContent;
}
async function captionImagesWithGemini(outputDir, progress, warnings, options = {}) {
  const geminiCaptions = {};
  let timedOutCount = 0;
  let failedRequestCount = 0;
  let budgetExhausted = false;
  let internalError = false;
  const reportOutcome = () => {
    const outcome = {
      timedOutRequests: timedOutCount,
      failedRequests: failedRequestCount,
      budgetExhausted
    };
    if (internalError) outcome.internalError = true;
    options.onOutcome?.(outcome);
  };
  if (options.skipVision) {
    reportOutcome();
    return geminiCaptions;
  }
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const vertexProject = process.env.HYPERFRAMES_VERTEX_PROJECT_ID;
  const vertexServiceAccount = process.env.HYPERFRAMES_VERTEX_SERVICE_ACCOUNT;
  const useVertex = Boolean(vertexProject && vertexServiceAccount);
  if (!openRouterKey && !useVertex && !geminiKey) {
    reportOutcome();
    return geminiCaptions;
  }
  const provider = openRouterKey ? "openrouter" : useVertex ? "vertex" : "gemini";
  const providerName = { openrouter: "OpenRouter", vertex: "Vertex AI", gemini: "Gemini" }[provider];
  const model = {
    openrouter: process.env.HYPERFRAMES_OPENROUTER_MODEL || "google/gemini-3.1-flash-lite",
    vertex: process.env.HYPERFRAMES_VERTEX_MODEL || "gemini-2.5-flash",
    gemini: process.env.HYPERFRAMES_GEMINI_MODEL || "gemini-3.1-flash-lite-preview"
  }[provider];
  const requestTimeoutMs = resolveVisionRequestTimeoutMs();
  progress("design", `Captioning images with ${providerName} vision...`);
  try {
    let captionOne;
    if (provider === "openrouter") {
      captionOne = async ({ mimeType, base64, prompt, maxTokens, timeoutMs }) => {
        return runBoundedVisionRequest(async (signal) => {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openRouterKey}`,
              "Content-Type": "application/json"
            },
            signal,
            body: JSON.stringify({
              model,
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: prompt },
                    {
                      type: "image_url",
                      image_url: { url: `data:${mimeType};base64,${base64}` }
                    }
                  ]
                }
              ],
              max_tokens: maxTokens
            })
          });
          if (!res.ok) {
            await res.text();
            throw new Error(`OpenRouter request failed with HTTP ${res.status}`);
          }
          const data = await res.json();
          return data.choices?.[0]?.message?.content?.trim() || "";
        }, timeoutMs);
      };
    } else {
      let GoogleGenAI;
      try {
        ({ GoogleGenAI } = await loadOptionalPackage("@google/genai", "vision captioning"));
      } catch (err) {
        warnings.push(`Skipped vision captioning: ${err.message}`);
        internalError = true;
        reportOutcome();
        return geminiCaptions;
      }
      let ai;
      if (provider === "vertex") {
        if (!vertexProject || !vertexServiceAccount) return geminiCaptions;
        let credentials;
        try {
          credentials = JSON.parse(vertexServiceAccount);
        } catch {
          warnings.push(
            "HYPERFRAMES_VERTEX_SERVICE_ACCOUNT is not valid JSON; skipped vision captioning."
          );
          internalError = true;
          reportOutcome();
          return geminiCaptions;
        }
        ai = new GoogleGenAI({
          vertexai: true,
          project: vertexProject,
          location: process.env.HYPERFRAMES_VERTEX_LOCATION || "us-central1",
          googleAuthOptions: { credentials }
        });
      } else {
        if (!geminiKey) return geminiCaptions;
        ai = new GoogleGenAI({ apiKey: geminiKey });
      }
      captionOne = async ({ mimeType, base64, prompt, maxTokens, timeoutMs }) => {
        const response = await runBoundedVisionRequest(
          (signal) => ai.models.generateContent({
            model,
            contents: [
              {
                role: "user",
                parts: [{ inlineData: { mimeType, data: base64 } }, { text: prompt }]
              }
            ],
            config: {
              maxOutputTokens: maxTokens,
              // A one-line factual caption needs no reasoning, and leaving thinking on is
              // not merely wasteful: thinking tokens are drawn from maxOutputTokens, so the
              // model can spend the whole budget and return empty text. That surfaces as a
              // successful request with no caption — the capture then logs "Captioned N/N
              // images" followed by "0 images captioned", which is what production shows.
              thinkingConfig: { thinkingBudget: 0 },
              abortSignal: signal,
              httpOptions: { timeout: timeoutMs }
            }
          }),
          timeoutMs
        );
        return response.text?.trim() || "";
      };
    }
    const imageFiles = readdirSync(join5(outputDir, "assets")).filter(
      (f) => /\.(png|jpg|jpeg|webp|gif)$/i.test(f)
    );
    const BATCH_SIZE = 20;
    const collectCaptionResults = (results) => {
      let timeouts = 0;
      let failures = 0;
      for (const result of results) {
        if (result.status === "fulfilled" && result.value.caption) {
          geminiCaptions[result.value.file] = result.value.caption;
        } else if (result.status === "rejected" && result.reason instanceof VisionRequestTimeoutError) {
          timeouts++;
        } else if (result.status === "rejected") {
          failures++;
        }
      }
      return { timeouts, failures };
    };
    for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
      const remainingMs = options.remainingMs?.() ?? Number.POSITIVE_INFINITY;
      if (remainingMs <= 0) {
        budgetExhausted = true;
        break;
      }
      const timeoutMs = Math.max(1, Math.min(requestTimeoutMs, remainingMs));
      const batch = imageFiles.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map(async (file) => {
          const filePath = join5(outputDir, "assets", file);
          const fd = openSync(filePath, "r", 384);
          let buffer;
          try {
            const stat = fstatSync(fd);
            if (stat.size > 4e6) return { file, caption: "" };
            buffer = readFileSync2(fd);
          } finally {
            closeSync(fd);
          }
          const base64 = buffer.toString("base64");
          const ext = file.split(".").pop()?.toLowerCase() || "png";
          const mimeType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;
          const caption = await captionOne({
            mimeType,
            base64,
            prompt: "Describe this website image in ONE short sentence for a video storyboard. Focus on: what it shows, dominant colors, whether background is light or dark. Be factual, not creative.",
            maxTokens: 500,
            timeoutMs
          });
          return { file, caption };
        })
      );
      const counts = collectCaptionResults(results);
      timedOutCount += counts.timeouts;
      failedRequestCount += counts.failures;
      if (i + BATCH_SIZE < imageFiles.length) {
        await new Promise((r) => setTimeout(r, 2e3));
      }
      progress(
        "design",
        `Captioned ${Math.min(i + BATCH_SIZE, imageFiles.length)}/${imageFiles.length} images...`
      );
    }
    progress(
      "design",
      `${Object.keys(geminiCaptions).length} images captioned with ${providerName}`
    );
    const svgFiles = [];
    const assetsDir = join5(outputDir, "assets");
    for (const f of readdirSync(assetsDir)) {
      if (/\.svg$/i.test(f)) svgFiles.push({ file: f, relPath: f });
    }
    const svgsSubdir = join5(assetsDir, "svgs");
    if (existsSync2(svgsSubdir)) {
      for (const f of readdirSync(svgsSubdir)) {
        if (/\.svg$/i.test(f)) svgFiles.push({ file: f, relPath: `svgs/${f}` });
      }
    }
    if (svgFiles.length > 0) {
      let sharp;
      try {
        sharp = (await import("sharp")).default;
      } catch (err) {
        warnings.push(
          `Skipped ${svgFiles.length} SVG caption(s): sharp could not load (${err.message}). Reinstall with optional dependencies enabled (e.g. \`npm i sharp\`) to caption SVG assets.`
        );
        reportOutcome();
        return geminiCaptions;
      }
      const hostConcurrency = sharp.concurrency();
      progress("design", `Rasterizing + captioning ${svgFiles.length} SVGs via vision API...`);
      const SVG_BATCH = 20;
      const SVG_RENDER_SIZE = 256;
      let svgsSkipped = 0;
      for (let i = 0; i < svgFiles.length; i += SVG_BATCH) {
        const remainingMs = options.remainingMs?.() ?? Number.POSITIVE_INFINITY;
        if (remainingMs <= 0) {
          budgetExhausted = true;
          break;
        }
        const timeoutMs = Math.max(1, Math.min(requestTimeoutMs, remainingMs));
        const batch = svgFiles.slice(i, i + SVG_BATCH);
        const rasterized = [];
        sharp.concurrency(1);
        try {
          for (const { relPath } of batch) {
            const filePath = join5(assetsDir, relPath);
            try {
              const svgSource = readFileSync2(filePath, "utf-8");
              const lightFillHits = (svgSource.match(/fill\s*=\s*["'](#fff(fff)?|white|#[ef][ef][ef]|#[ef]{6})["']/gi) || []).length;
              const darkFillHits = (svgSource.match(/fill\s*=\s*["'](#000(000)?|black|#[0-3]{6}|#[0-3]{3})["']/gi) || []).length;
              const bg = lightFillHits > darkFillHits ? { r: 32, g: 32, b: 32 } : { r: 255, g: 255, b: 255 };
              const pngBuffer = await sharp(filePath).resize({
                width: SVG_RENDER_SIZE,
                height: SVG_RENDER_SIZE,
                fit: "inside",
                withoutEnlargement: false
              }).flatten({ background: bg }).png().toBuffer();
              rasterized.push({ relPath, pngBase64: pngBuffer.toString("base64") });
            } catch {
              svgsSkipped++;
              rasterized.push({ relPath, pngBase64: null });
            }
          }
        } finally {
          sharp.concurrency(hostConcurrency);
        }
        const results = await Promise.allSettled(
          rasterized.map(async ({ relPath, pngBase64 }) => {
            if (pngBase64 === null) return { file: relPath, caption: "" };
            const caption = await captionOne({
              mimeType: "image/png",
              base64: pngBase64,
              prompt: "Describe this SVG asset rendered from a website in ONE short sentence for a video storyboard. Focus on: what shape/icon/illustration/wordmark it is, its colors, any text it contains. If you see a wordmark, READ THE LETTERS LITERALLY \u2014 do not guess a brand from context. Be factual.",
              maxTokens: 300,
              timeoutMs
            });
            return { file: relPath, caption };
          })
        );
        const counts = collectCaptionResults(results);
        timedOutCount += counts.timeouts;
        failedRequestCount += counts.failures;
        if (i + SVG_BATCH < svgFiles.length) {
          await new Promise((r) => setTimeout(r, 2e3));
        }
        progress(
          "design",
          `Captioned ${Math.min(i + SVG_BATCH, svgFiles.length)}/${svgFiles.length} SVGs...`
        );
      }
      progress("design", `${Object.keys(geminiCaptions).length} total assets captioned`);
      if (svgsSkipped > 0) {
        progress(
          "design",
          `skipped rasterizing ${svgsSkipped} SVG(s) \u2014 fell back to label-derived`
        );
      }
    }
    if (timedOutCount > 0) {
      warnings.push(
        `${providerName} vision timed out for ${timedOutCount} asset(s); captions omitted.`
      );
    }
    if (failedRequestCount > 0) {
      warnings.push(
        `${providerName} vision failed for ${failedRequestCount} asset(s); captions omitted.`
      );
    }
  } catch {
    internalError = true;
    warnings.push(`${providerName} captioning failed internally; captions omitted.`);
  }
  reportOutcome();
  return geminiCaptions;
}
function generateAssetDescriptions(outputDir, tokens, catalogedAssets, geminiCaptions) {
  const captionedLines = [];
  const uncaptionedLines = [];
  const svgLines = [];
  const fontLines = [];
  const assetsPath = join5(outputDir, "assets");
  try {
    for (const file of readdirSync(assetsPath)) {
      if (file === "svgs" || file === "fonts" || file === "lottie" || file === "videos") continue;
      const filePath = join5(assetsPath, file);
      const stat = statSync(filePath);
      if (!stat.isFile()) continue;
      const sizeKb = Math.round(stat.size / 1024);
      const catalogMatch = catalogedAssets.find(
        (a) => a.url && file.includes(a.url.split("/").pop()?.split("?")[0]?.slice(0, 20) || "___")
      );
      const desc = catalogMatch?.description || catalogMatch?.notes || "";
      const heading = catalogMatch?.nearestHeading || "";
      const section = catalogMatch?.sectionClasses || "";
      const aboveFold = catalogMatch?.aboveFold ? "above fold" : "";
      const geminiCaption = geminiCaptions[file];
      const cleanName = file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      const parts = [`${file} \u2014 ${sizeKb}KB`];
      if (geminiCaption) {
        parts.push(geminiCaption);
        captionedLines.push(parts.join(", "));
      } else {
        if (desc) parts.push(`"${desc.slice(0, 80)}"`);
        if (heading) parts.push(`section: "${heading.slice(0, 60)}"`);
        else if (section) parts.push(`in: ${section.split(" ").slice(0, 3).join(" ")}`);
        if (aboveFold) parts.push(aboveFold);
        if (!desc && !heading) parts.push(cleanName);
        uncaptionedLines.push(parts.join(", "));
      }
    }
  } catch {
  }
  try {
    const svgsPath = join5(assetsPath, "svgs");
    for (const file of readdirSync(svgsPath)) {
      if (!file.endsWith(".svg")) continue;
      const svgMatch = tokens.svgs.find(
        (s) => s.label && file.includes(
          s.label.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 15)
        )
      );
      const geminiCaption = geminiCaptions[`svgs/${file}`];
      if (geminiCaption) {
        svgLines.push(`svgs/${file} \u2014 ${geminiCaption}`);
        continue;
      }
      const label = svgMatch?.label || file.replace(".svg", "").replace(/-/g, " ");
      svgLines.push(`svgs/${file} \u2014 ${label}`);
    }
  } catch {
  }
  try {
    const fontsPath = join5(assetsPath, "fonts");
    for (const file of readdirSync(fontsPath)) {
      fontLines.push(`fonts/${file} \u2014 font file`);
    }
  } catch {
  }
  const videoLines = [];
  try {
    const manifest = JSON.parse(
      readFileSync2(join5(outputDir, "extracted", "video-manifest.json"), "utf-8")
    );
    for (const v of manifest) {
      if (!v.localPath) continue;
      const base = basename(v.localPath) || v.filename || "";
      if (!base) continue;
      const desc = (v.caption || v.heading || "").trim().replace(/\s+/g, " ").slice(0, 140) || "motion clip";
      const dimW = v.sourceWidth || v.width;
      const dimH = v.sourceHeight || v.height;
      const dims = dimW && dimH ? `, ~${dimW}\xD7${dimH}` : "";
      videoLines.push(`${base} \u2014 [video] ${desc}${dims}`);
    }
  } catch {
  }
  return [...videoLines, ...captionedLines, ...uncaptionedLines, ...svgLines, ...fontLines];
}

// src/capture/coreExtractionPhase.ts
import { join as join7 } from "path";

// src/capture/htmlExtractor.ts
var DEFAULT_SETTLE_TIME = 3e3;
async function extractHtml(page, opts = {}) {
  const settleTime = opts.settleTime ?? DEFAULT_SETTLE_TIME;
  await new Promise((r) => setTimeout(r, settleTime));
  const stylesheetUrls = await page.evaluate(`(() => {
    return Array.from(document.querySelectorAll('link[rel="stylesheet"][href]')).map(function(l) { return l.href; });
  })()`);
  for (const href of stylesheetUrls) {
    try {
      if (isPrivateUrl(href)) continue;
      const res = await fetch(href, {
        signal: AbortSignal.timeout(1e4),
        headers: { "User-Agent": CAPTURE_USER_AGENT }
      });
      if (!res.ok) continue;
      let css = await res.text();
      css = css.replace(/url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g, (match, url) => {
        if (url.startsWith("data:") || url.startsWith("http") || url.startsWith("//")) return match;
        try {
          return `url('${new URL(url, href).href}')`;
        } catch {
          return match;
        }
      });
      await page.addStyleTag({ content: css });
      await page.evaluate((targetHref) => {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (const link of links) {
          if (link.href === targetHref) {
            link.remove();
            break;
          }
        }
      }, href);
    } catch {
    }
  }
  await page.evaluate(`(() => {
    document.querySelectorAll("img[src]").forEach(function(el) {
      try {
        // getAttribute returns the raw HTML attribute (with &amp;)
        // .src returns the resolved URL (with &) \u2014 use .src for the correct value
        var resolved = el.src;
        if (resolved) el.setAttribute("src", resolved);
      } catch(e) {}
    });
    // Fix srcset attributes too (Next.js image optimization)
    document.querySelectorAll("img[srcset]").forEach(function(el) {
      try {
        var srcset = el.getAttribute("srcset") || "";
        // Decode &amp; entities in srcset
        srcset = srcset.replace(/&amp;/g, "&");
        el.setAttribute("srcset", srcset);
      } catch(e) {}
    });
    document.querySelectorAll('[style*="url("]').forEach(function(el) {
      el.style.cssText = el.style.cssText.replace(/url\\(['"]?([^'"\\)\\s]+)['"]?\\)/g, function(_, url) {
        try { return "url('" + new URL(url, location.href).href + "')"; } catch(e) { return "url('" + url + "')"; }
      });
    });
  })()`);
  await page.evaluate(`(async () => {
    var imgs = Array.from(document.querySelectorAll("img"));
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      try {
        if (!img.src || img.src.startsWith("data:")) continue;
        if (img.naturalWidth < 10 || img.naturalHeight < 10) continue;
        // Only convert cross-origin images (same-origin ones will load fine)
        var imgUrl = new URL(img.src);
        if (imgUrl.origin === location.origin) continue;
        // Try to draw to canvas \u2014 will fail if CORS blocks it
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataUrl = canvas.toDataURL("image/png");
        if (dataUrl.length > 100) {
          img.setAttribute("src", dataUrl);
          img.removeAttribute("srcset");
        }
      } catch(e) {
        // Canvas CORS failed \u2014 try fetch + blob as fallback
        try {
          var resp = await fetch(img.src, { mode: "cors" });
          if (resp.ok) {
            var blob = await resp.blob();
            var reader = new FileReader();
            var dataUrl2 = await new Promise(function(resolve) {
              reader.onloadend = function() { resolve(reader.result); };
              reader.readAsDataURL(blob);
            });
            if (dataUrl2 && typeof dataUrl2 === "string" && dataUrl2.length > 100) {
              img.setAttribute("src", dataUrl2);
              img.removeAttribute("srcset");
            }
          }
        } catch(e2) {
          // Both methods failed \u2014 image stays as original URL
        }
      }
    }
  })()`);
  const result = await page.evaluate(`(() => {
    // Capture styles AND scripts from head separately then combine
    // Scripts include Three.js, animation libraries that we want to preserve
    var styles = Array.from(document.head.querySelectorAll("style")).map(function(s) { return s.outerHTML; }).join("\\n");
    var scripts = Array.from(document.head.querySelectorAll("script")).map(function(s) { return s.outerHTML; }).join("\\n");
    var headHtml = styles + "\\n" + scripts;
    var bodyHtml = document.body.innerHTML;

    var cssomRules = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      try {
        var ownerNode = sheet.ownerNode;
        if (ownerNode && ownerNode.textContent && ownerNode.textContent.trim()) continue;
        if (sheet.href) continue;
        for (var j = 0; j < sheet.cssRules.length; j++) {
          cssomRules.push(sheet.cssRules[j].cssText);
        }
      } catch(e) {}
    }

    var htmlEl = document.documentElement;
    var attrParts = [];
    for (var i = 0; i < htmlEl.attributes.length; i++) {
      var attr = htmlEl.attributes[i];
      if (attr.name === "lang" || attr.name === "class" || attr.name === "style" || attr.name === "dir" || attr.name.startsWith("data-")) {
        attrParts.push(attr.name + '="' + attr.value.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"');
      }
    }

    return {
      headHtml: headHtml,
      bodyHtml: bodyHtml,
      cssomRules: cssomRules.join("\\n"),
      htmlAttrs: attrParts.join(" "),
      viewportWidth: Math.max(window.innerWidth, document.documentElement.scrollWidth),
      viewportHeight: window.innerHeight,
      fullPageHeight: document.body.scrollHeight
    };
  })()`);
  const pageOrigin = new URL(page.url()).origin;
  result.bodyHtml = result.bodyHtml.replace(
    /(<img\b[^>]*\bsrc=")([^"]*?)(")/g,
    (_match, pre, url, post) => {
      let fixed = url.replace(/&amp;/g, "&");
      if (fixed.startsWith("/") && !fixed.startsWith("//")) {
        fixed = pageOrigin + fixed;
      }
      return pre + fixed + post;
    }
  );
  result.bodyHtml = result.bodyHtml.replace(
    /(<img\b[^>]*\bsrcset=")([^"]*?)(")/g,
    (_match, pre, urls, post) => {
      const fixed = urls.replace(/&amp;/g, "&").replace(
        /(^|,\s*)(\/[^\s,]+)/g,
        (_m, sep, path) => sep + pageOrigin + path
      );
      return pre + fixed + post;
    }
  );
  result.bodyHtml = result.bodyHtml.replace(
    /(<video\b[^>]*\bsrc=")([^"]*?)(")/g,
    (_match, pre, url, post) => {
      let fixed = url.replace(/&amp;/g, "&");
      if (fixed.startsWith("/") && !fixed.startsWith("//")) fixed = pageOrigin + fixed;
      return pre + fixed + post;
    }
  );
  result.bodyHtml = result.bodyHtml.replace(
    /(<video\b[^>]*\bposter=")([^"]*?)(")/g,
    (_match, pre, url, post) => {
      let fixed = url.replace(/&amp;/g, "&");
      if (fixed.startsWith("/") && !fixed.startsWith("//")) fixed = pageOrigin + fixed;
      return pre + fixed + post;
    }
  );
  return result;
}

// src/capture/tokenExtractor.ts
var EXTRACT_SCRIPT = `(() => {
  var isVisible = (el) => {
    var s = getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0" && el.getBoundingClientRect().height > 0;
  };

  // 1. CSS custom properties from :root
  var cssVariables = {};
  for (var i = 0; i < document.styleSheets.length; i++) {
    try {
      var rules = document.styleSheets[i].cssRules;
      for (var j = 0; j < rules.length; j++) {
        if (rules[j].selectorText === ":root") {
          for (var k = 0; k < rules[j].style.length; k++) {
            var prop = rules[j].style[k];
            if (prop.startsWith("--")) {
              cssVariables[prop] = rules[j].style.getPropertyValue(prop).trim();
            }
          }
        }
      }
    } catch(e) {}
  }

  // 2. Meta
  var title = document.title || "";
  var descEl = document.querySelector('meta[name="description"]') || document.querySelector('meta[property="og:description"]');
  var description = descEl ? descEl.content : "";
  var ogImgEl = document.querySelector('meta[property="og:image"]');
  var ogImage = ogImgEl ? ogImgEl.content : undefined;

  // 3. Fonts \u2014 enumerate loaded FontFaces + supplement with DOM sampling
  var fontMap = {};
  function ensureFont(name) {
    if (!fontMap[name]) fontMap[name] = { family: name, weights: [], variable: false, weightRange: undefined };
    return fontMap[name];
  }
  function addWeight(entry, w) {
    var n = parseInt(w, 10);
    if (!isNaN(n) && entry.weights.indexOf(n) === -1) entry.weights.push(n);
  }
  var genericFonts = ["serif","sans-serif","monospace","cursive","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","emoji","math","fangsong"];
  try {
    document.fonts.forEach(function(face) {
      var name = face.family.replace(/['"]/g, "").trim();
      if (!name || genericFonts.indexOf(name.toLowerCase()) !== -1) return;
      // Skip placeholder/fallback fonts (Framer loads hundreds of these)
      if (name.indexOf("Placeholder") !== -1 || name.indexOf("Fallback") !== -1) return;
      var entry = ensureFont(name);
      var w = (face.weight || "").trim();
      if (w.indexOf(" ") !== -1) {
        var parts = w.split(" ");
        var lo = parseInt(parts[0], 10);
        var hi = parseInt(parts[1], 10);
        if (!isNaN(lo) && !isNaN(hi)) {
          entry.variable = true;
          entry.weightRange = [lo, hi];
        }
      } else {
        addWeight(entry, w);
      }
    });
  } catch(e) {}
  // Supplement with DOM sampling
  var domSamples = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,span,li,strong,b")).slice(0, 100);
  for (var fi = 0; fi < domSamples.length; fi++) {
    try {
      var cs = getComputedStyle(domSamples[fi]);
      var family = cs.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      if (family && genericFonts.indexOf(family.toLowerCase()) === -1) {
        var entry = ensureFont(family);
        addWeight(entry, cs.fontWeight);
      }
    } catch(e) {}
  }

  // 4. Colors \u2014 hybrid: DOM computed styles + visual pixel sampling
  var colorSet = {};
  function addColor(c, weight) {
    if (!c || c === "rgba(0, 0, 0, 0)" || c === "transparent" || c === "inherit" || c === "initial" || c === "currentcolor") return;
    var hex = rgbToHex(c);
    if (hex) colorSet[hex] = (colorSet[hex] || 0) + (weight || 1);
  }
  function rgbToHex(color) {
    if (!color) return null;
    if (color.startsWith('#')) return (color.length === 4
      ? '#' + color[1]+color[1] + color[2]+color[2] + color[3]+color[3]
      : color).toUpperCase();
    var m = color.match(/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
    if (!m) {
      // Handle color(srgb ...) format
      var cm = color.match(/color\\(srgb\\s+([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)/);
      if (cm) {
        m = [null, Math.round(parseFloat(cm[1])*255), Math.round(parseFloat(cm[2])*255), Math.round(parseFloat(cm[3])*255)];
      } else {
        // Handle modern color functions (oklch, oklab, lch, lab, hsl, color-mix)
        // Use a 1x1 canvas to resolve ANY CSS color to RGB \u2014 this works even when
        // getComputedStyle returns the color in its original color space (Chrome 131+)
        if (/oklch|oklab|lch|lab|hsla?|color-mix|color\\(/.test(color)) {
          try {
            var cvs = document.createElement('canvas');
            cvs.width = 1; cvs.height = 1;
            var ctx2d = cvs.getContext('2d');
            if (ctx2d) {
              ctx2d.fillStyle = color;
              ctx2d.fillRect(0, 0, 1, 1);
              var px = ctx2d.getImageData(0, 0, 1, 1).data;
              if (px[3] > 0) return '#' + ((1<<24) + (px[0]<<16) + (px[1]<<8) + px[2]).toString(16).slice(1).toUpperCase();
            }
          } catch(e2) {}
          // Fallback: temp element approach
          var tmp = document.createElement('div');
          tmp.style.color = color;
          document.body.appendChild(tmp);
          var resolved = getComputedStyle(tmp).color;
          document.body.removeChild(tmp);
          if (resolved !== color) return rgbToHex(resolved);
          return null;
        }
        return null;
      }
    }
    return '#' + ((1<<24) + (parseInt(m[1])<<16) + (parseInt(m[2])<<8) + parseInt(m[3])).toString(16).slice(1).toUpperCase();
  }

  // 4a. Sample DOM elements (text colors, borders, branded elements)
  var colorCandidates = Array.from(document.querySelectorAll(
    "body, header, nav, main, footer, section, " +
    "h1, h2, h3, h4, h5, h6, " +
    "a, button, [role='button'], " +
    "[class*='hero'], [class*='cta'], [class*='btn'], [class*='card'], " +
    "[class*='badge'], [class*='tag'], [class*='accent'], [class*='highlight']"
  )).slice(0, 200);
  for (var ci = 0; ci < colorCandidates.length; ci++) {
    try {
      var cs = getComputedStyle(colorCandidates[ci]);
      addColor(cs.backgroundColor);
      addColor(cs.color);
      addColor(cs.borderColor);
      addColor(cs.outlineColor);
      // Extract colors from gradients in background-image
      var bgImg = cs.backgroundImage;
      if (bgImg && bgImg !== 'none') {
        var gradColors = bgImg.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\)|oklch\\([^)]+\\)|oklab\\([^)]+\\)|hsla?\\([^)]+\\)|lab\\([^)]+\\))/g);
        if (gradColors) gradColors.forEach(function(gc) { addColor(gc); });
      }
      // Extract colors from box-shadow
      var shadow = cs.boxShadow;
      if (shadow && shadow !== 'none') {
        var shadowColors = shadow.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))/g);
        if (shadowColors) shadowColors.forEach(function(sc) { addColor(sc); });
      }
    } catch(e) {}
  }

  // 4b. Explicitly sample html/body backgrounds (the dominant canvas color)
  // These often define the site's light/dark character
  try {
    var htmlBg = getComputedStyle(document.documentElement).backgroundColor;
    var bodyBg = getComputedStyle(document.body).backgroundColor;
    addColor(htmlBg, 10);
    addColor(bodyBg, 10);
    // Also check the background shorthand which may contain gradients
    var bodyBgFull = getComputedStyle(document.body).background;
    var gradColors = bodyBgFull.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\)|oklch\\([^)]+\\)|hsla?\\([^)]+\\))/g);
    if (gradColors) gradColors.forEach(function(gc) { addColor(gc, 8); });
  } catch(e) {}

  // 4c. Visual pixel sampling \u2014 sample what the user actually SEES
  // Walk a grid of points across the viewport and read background + text color
  var vpW = window.innerWidth;
  var vpH = window.innerHeight;
  var gridCols = 6;
  var gridRows = 5;
  for (var gy = 0; gy < gridRows; gy++) {
    for (var gx = 0; gx < gridCols; gx++) {
      try {
        var px = Math.round((gx + 0.5) * vpW / gridCols);
        var py = Math.round((gy + 0.5) * vpH / gridRows);
        var elAt = document.elementFromPoint(px, py);
        if (elAt) {
          var elStyle = getComputedStyle(elAt);
          addColor(elStyle.color, 2);
          var bgc = elStyle.backgroundColor;
          // Walk up parents until we find a non-transparent background
          var bgWalker = elAt;
          while (bgWalker && (!bgc || bgc === "rgba(0, 0, 0, 0)" || bgc === "transparent")) {
            bgWalker = bgWalker.parentElement;
            if (bgWalker) bgc = getComputedStyle(bgWalker).backgroundColor;
          }
          addColor(bgc, 3);
        }
      } catch(e) {}
    }
  }

  // 4c2. Broad sweep \u2014 find ANY element with a non-white/non-transparent background
  // This catches colored blocks that the grid might miss (code blocks, banners, cards)
  var allEls = document.querySelectorAll('*');
  var colorSweepCount = 0;
  for (var si = 0; si < allEls.length && colorSweepCount < 500; si++) {
    try {
      var elCs = getComputedStyle(allEls[si]);
      var elBg = elCs.backgroundColor;
      if (elBg && elBg !== "rgba(0, 0, 0, 0)" && elBg !== "transparent") {
        var hex = rgbToHex(elBg);
        if (hex && hex !== "#FFFFFF" && hex !== "#000000") {
          addColor(elBg, 1);
        }
      }
      colorSweepCount++;
    } catch(e) {}
  }

  // 4d. Resolve CSS custom properties from :root to actual color values
  var rootStyle = getComputedStyle(document.documentElement);
  var rootProps = Object.keys(cssVariables);
  for (var ri = 0; ri < rootProps.length; ri++) {
    var val = rootStyle.getPropertyValue(rootProps[ri]).trim();
    if (val && /^(#|rgb|hsl|oklch|oklab|lch|lab|color)/.test(val)) {
      addColor(val);
    }
  }

  // 4e. Per-color signal stats \u2014 distinguish FILL vs TEXT vs INTERACTIVE vs
  // large-AREA usage. The flat colorSet above ranks by total weight (so the
  // canvas/text dominate); these per-color signals let downstream code find the
  // BRAND color (chromatic, used on interactive/repeated fills) apart from
  // section surfaces (one big block) and link/text colors. Single pass.
  var colorStats = {};
  function statFor(hex) {
    if (!colorStats[hex]) colorStats[hex] = { count: 0, bgCount: 0, interactiveBg: 0, areaBg: 0, textCount: 0, maxArea: 0 };
    return colorStats[hex];
  }
  var statEls = Array.from(allEls).slice(0, 9000);
  for (var ti = 0; ti < statEls.length; ti++) {
    try {
      var sEl = statEls[ti];
      var sCs = getComputedStyle(sEl);
      if (sCs.display === "none" || sCs.visibility === "hidden") continue;
      var sRect = sEl.getBoundingClientRect();
      var sArea = sRect.width * sRect.height;
      var sTag = sEl.tagName.toLowerCase();
      var sRole = sEl.getAttribute("role") || "";
      var sCls = sEl.getAttribute("class") || "";
      var sInteractive = sTag === "a" || sTag === "button" ||
        sRole === "button" || sRole === "link" || sRole === "menuitem" || sRole === "tab" ||
        /\\b(btn|button|cta|primary|action)\\b/i.test(sCls);
      var sBg = sCs.backgroundColor;
      if (sBg && sBg !== "rgba(0, 0, 0, 0)" && sBg !== "transparent") {
        var bgHex = rgbToHex(sBg);
        if (bgHex) {
          var st = statFor(bgHex);
          st.count++; st.bgCount++;
          if (sInteractive) st.interactiveBg++;
          if (sArea > 50000) st.areaBg++;
          if (sArea > st.maxArea) st.maxArea = Math.round(sArea);
        }
      }
      var sColor = sCs.color;
      if (sColor && sColor !== "rgba(0, 0, 0, 0)" && sColor !== "transparent") {
        var txHex = rgbToHex(sColor);
        if (txHex) { var st2 = statFor(txHex); st2.count++; st2.textCount++; }
      }
    } catch(e) {}
  }
  var colorStatsArr = Object.keys(colorStats).map(function(h) {
    var s = colorStats[h];
    return { hex: h, count: s.count, bgCount: s.bgCount, interactiveBg: s.interactiveBg, areaBg: s.areaBg, textCount: s.textCount, maxArea: s.maxArea };
  }).filter(function(s) { return s.bgCount > 0 || s.interactiveBg > 0 || s.count >= 3; })
    .sort(function(a, b) { return (b.bgCount + b.interactiveBg * 3 + b.textCount) - (a.bgCount + a.interactiveBg * 3 + a.textCount); })
    .slice(0, 48);

  // 5. Headings
  var headingEls = Array.from(document.querySelectorAll("h1, h2, h3, h4")).slice(0, 20);
  var headings = headingEls.filter(isVisible).map(function(h) {
    var s = getComputedStyle(h);
    return { level: parseInt(h.tagName[1]), text: (h.innerText || h.textContent || "").trim().replace(/\\s+/g, ' ').slice(0, 200), fontSize: s.fontSize, fontWeight: s.fontWeight, color: rgbToHex(s.color) || s.color };
  });

  // 6. CTAs \u2014 match by class AND by text content patterns
  // Conservative class selectors (avoid nav links with "action" or "start" in class)
  var ctaSelectors = 'a[class*="btn"], a[class*="button"], a[class*="cta"], button[class*="primary"], button[class*="cta"], [role="button"]';
  var ctaEls = Array.from(document.querySelectorAll(ctaSelectors));
  // Filter out nav links (common false positives)
  ctaEls = ctaEls.filter(function(el) {
    return !el.closest('nav, [role="navigation"], [class*="nav"], [class*="menu"], [class*="dropdown"]');
  });
  // Also find links/buttons by text content (catches CTAs without class hints)
  // Require short text (real CTAs are concise) and exclude nav context
  var ctaTextPatterns = /^(get started|sign up|start free|try (it )?free|start (a )?trial|book a demo|request (a )?demo|contact (us|sales)|start for free|create account|register now)$/i;
  var allButtons = Array.from(document.querySelectorAll('a, button'));
  for (var bi = 0; bi < allButtons.length && ctaEls.length < 20; bi++) {
    var btnText = (allButtons[bi].textContent || "").trim();
    if (btnText.length > 30) continue;
    if (allButtons[bi].closest('nav, [role="navigation"], [class*="nav"], [class*="menu"]')) continue;
    if (ctaTextPatterns.test(btnText) && ctaEls.indexOf(allButtons[bi]) === -1) {
      ctaEls.push(allButtons[bi]);
    }
  }
  ctaEls = ctaEls.slice(0, 10);
  var ctas = ctaEls.filter(isVisible).map(function(c) { return { text: (c.textContent || "").trim().slice(0, 60), href: c.href || undefined }; }).filter(function(c) { return c.text.length > 1; });

  // 8. SVGs
  var svgEls = Array.from(document.querySelectorAll("svg"));
  var svgs = svgEls.map(function(svg) {
    var label = svg.getAttribute("aria-label") || svg.getAttribute("title") || svg.getAttribute("alt");
    // Try harder to find a name: check class, id, parent context, inner text
    if (!label) {
      // Extract meaningful class name, skipping utility classes (tailwind, size, color)
      var svgClasses = (svg.getAttribute("class") || "").split(/\\s+/);
      var utilityPattern = /^(w-|h-|p-|m-|text-|bg-|border-|flex|grid|block|hidden|inline|absolute|relative|transition|duration|rotate|scale|opacity|group|sm:|md:|lg:|xl:)/;
      for (var ci = 0; ci < svgClasses.length; ci++) {
        var cls = svgClasses[ci];
        if (cls.length > 3 && cls.length < 40 && !utilityPattern.test(cls) && cls !== "lucide") {
          label = cls;
          break;
        }
      }
    }
    if (!label) {
      var svgId = svg.getAttribute("id") || "";
      if (svgId && svgId.length > 2 && svgId.length < 40) label = svgId;
    }
    if (!label) {
      // Check parent element for clues
      var parent = svg.closest("[class*='icon'], [class*='logo'], [class*='nav'], [class*='btn'], [class*='social']");
      if (parent) {
        var parentClass = (parent.getAttribute("class") || "").split(" ").find(function(c) { return c.length > 3 && c.length < 30; });
        if (parentClass) label = parentClass;
      }
    }
    if (!label) {
      // Check for text content inside the SVG (e.g. <text>NeetCode</text>)
      var textEl = svg.querySelector("text");
      if (textEl && textEl.textContent && textEl.textContent.trim().length > 1 && textEl.textContent.trim().length < 30) {
        label = textEl.textContent.trim();
      }
    }
    var w = svg.getAttribute("width");
    // Keep SVGs that have a label OR are at least 16px wide OR are inside a logo/brand context
    var inLogoContext = svg.closest('[class*="logo"], [class*="brand"], [class*="partner"], [class*="customer"], [class*="marquee"]') !== null;
    if (!label && !inLogoContext && (!w || parseInt(w) < 16)) return null;
    var isLogo = (label && label.toLowerCase().indexOf("logo") !== -1) ||
                 svg.closest('[class*="logo"], [class*="brand"], [class*="home"], [class*="marquee"], [class*="partner"], [class*="customer"]') !== null;
    if (!isLogo) {
      var bannerEl = svg.closest('header, nav, [role="banner"]');
      if (bannerEl) {
        var firstSvg = bannerEl.querySelector('svg');
        if (firstSvg === svg) isLogo = true;
      }
    }
    if (!isLogo) {
      var anchor = svg.closest('a[href]');
      if (anchor) {
        var href = anchor.getAttribute('href') || '';
        if (href === '/' || href === '#' || href === './' ||
            /^https?:\\/\\/[^/]+\\/?$/.test(href)) {
          isLogo = true;
        }
      }
    }
    if (!isLogo) {
      var ariaLabel = svg.getAttribute('aria-label') || svg.getAttribute('title') || '';
      var titleBrand = (document.title || '').split(/[-|\u2014]/)[0].trim();
      if (titleBrand.length > 1 && titleBrand.length < 30 &&
          ariaLabel.toLowerCase().indexOf(titleBrand.toLowerCase()) !== -1) {
        isLogo = true;
      }
    }
    var rect = svg.getBoundingClientRect();
    return {
      label: label || undefined,
      viewBox: svg.getAttribute("viewBox") || undefined,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      outerHTML: svg.outerHTML.slice(0, 10000),
      isLogo: isLogo
    };
  }).filter(Boolean).slice(0, 50);

  // 9. Sections \u2014 find large visual blocks regardless of HTML tag
  var sectionResults = [];
  // Start with semantic elements, then fall back to large direct children of body/main
  var candidates = Array.from(document.querySelectorAll(
    'section, main > div, main > section, article, ' +
    'body > div > div, body > main > div, body > div, ' +
    '[class*="hero"], [class*="Hero"], [class*="section"], [class*="Section"], ' +
    '[class*="container"], [class*="wrapper"], [class*="block"], ' +
    '[id*="section"], [id*="hero"], footer, [role="region"], [role="banner"]'
  ));
  // Deduplicate (a div can match multiple selectors)
  var seenEls = new Set();
  candidates = candidates.filter(function(el) {
    if (seenEls.has(el)) return false;
    seenEls.add(el);
    return true;
  });
  for (var si = 0; si < candidates.length; si++) {
    var el = candidates[si];
    var rect = el.getBoundingClientRect();
    if (rect.height < 200 || rect.width < 400 || !isVisible(el)) continue;
    // Skip page-level wrappers (a single div wrapping the entire page is not a section)
    var pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    if (rect.height > pageHeight * 0.8) continue;
    var y = rect.top + window.scrollY;
    var heading = el.querySelector("h1, h2, h3, h4");
    var headingText = heading ? (heading.innerText || heading.textContent || "").trim().replace(/\\s+/g, ' ').slice(0, 80) : "";
    var classes = (el.className || "").toString().toLowerCase();
    var type = "content";
    if (y < 200 || classes.indexOf("hero") !== -1) type = "hero";
    else if (el.tagName === "FOOTER" || classes.indexOf("footer") !== -1) type = "footer";
    else if (classes.indexOf("cta") !== -1) type = "cta";
    else if (classes.indexOf("logo") !== -1 || classes.indexOf("customer") !== -1) type = "logos";
    else if (classes.indexOf("testimonial") !== -1 || classes.indexOf("quote") !== -1) type = "testimonials";
    else if (classes.indexOf("feature") !== -1 || classes.indexOf("section") !== -1) type = "features";
    var selector = el.id ? "#" + el.id : el.tagName.toLowerCase();
    var sectionBg = getComputedStyle(el).backgroundColor;
    // Walk up DOM to find nearest non-transparent background (don't default to white)
    if (!sectionBg || sectionBg === "rgba(0, 0, 0, 0)" || sectionBg === "transparent") {
      var bgWalker = el.parentElement;
      while (bgWalker) {
        var parentBg = getComputedStyle(bgWalker).backgroundColor;
        if (parentBg && parentBg !== "rgba(0, 0, 0, 0)" && parentBg !== "transparent") {
          sectionBg = parentBg;
          break;
        }
        bgWalker = bgWalker.parentElement;
      }
      if (!sectionBg || sectionBg === "rgba(0, 0, 0, 0)" || sectionBg === "transparent") sectionBg = "#FFFFFF";
    }
    // Check for background-image when color is transparent/default white
    var sectionBgImage = undefined;
    var rawBgImg = getComputedStyle(el).backgroundImage;
    if (rawBgImg && rawBgImg !== "none" && rawBgImg.indexOf("url(") !== -1) {
      var start = rawBgImg.indexOf("url(") + 4;
      var end = rawBgImg.indexOf(")", start);
      if (end > start) {
        sectionBgImage = rawBgImg.slice(start, end).replace(/['"]/g, "");
      }
    }
    sectionBg = rgbToHex(sectionBg) || sectionBg;
    // Inner content for faithful page-card recreation downstream: CTAs, body
    // text, in-section media URLs (remote \u2014 joined to local paths in index.ts),
    // and a coarse layout hint. Mirrors the prior capture framework's richer
    // section model that the page-scroll-spotlight blueprint depends on.
    var absUrl = function (u) {
      try { return u ? new URL(u, location.href).href : ""; } catch (e) { return ""; }
    };
    var sectionText = (el.innerText || el.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 600);
    var sectionCtas = [];
    var ctaNodes = el.querySelectorAll("a, button");
    for (var qi = 0; qi < ctaNodes.length && sectionCtas.length < 8; qi++) {
      if (!isVisible(ctaNodes[qi])) continue;
      var ctaTxt = (ctaNodes[qi].textContent || "").trim().replace(/\\s+/g, " ").slice(0, 60);
      if (ctaTxt && ctaTxt.length > 1 && sectionCtas.indexOf(ctaTxt) === -1) sectionCtas.push(ctaTxt);
    }
    var sectionAssets = [];
    var mediaNodes = el.querySelectorAll("img, video, source");
    for (var ii = 0; ii < mediaNodes.length && sectionAssets.length < 10; ii++) {
      var mn = mediaNodes[ii];
      var msrc = mn.currentSrc || mn.src || mn.getAttribute("src") || mn.getAttribute("data-src") || mn.getAttribute("poster") || "";
      var mau = absUrl(msrc);
      if (mau && !mau.startsWith("data:") && sectionAssets.indexOf(mau) === -1) sectionAssets.push(mau);
    }
    if (sectionBgImage) {
      var bau = absUrl(sectionBgImage);
      if (bau && sectionAssets.indexOf(bau) === -1) sectionAssets.unshift(bau);
    }
    var imgCount = el.querySelectorAll("img").length;
    var layout = "stacked";
    if (imgCount >= 3) layout = "grid";
    else if (el.querySelector("img, video") && headingText) layout = "split";
    else if (headingText && imgCount === 0) layout = "centered";
    var sectionEntry = {
      selector: selector, type: type,
      x: Math.round(rect.left + window.scrollX), y: Math.round(y),
      width: Math.round(rect.width), height: Math.round(rect.height),
      heading: headingText, backgroundColor: sectionBg,
      callsToAction: sectionCtas, text: sectionText, layout: layout, assetUrls: sectionAssets
    };
    if (sectionBgImage) sectionEntry.backgroundImage = sectionBgImage;
    sectionResults.push(sectionEntry);
  }
  sectionResults.sort(function(a, b) { return a.y - b.y; });
  var filtered = sectionResults.filter(function(s, i) { return i === 0 || Math.abs(s.y - sectionResults[i-1].y) > 100; });

  // Filter cssVariables \u2014 keep only color-like values or design-relevant names
  var colorValueRe = /^(#|rgb|hsl|oklch|oklab|lch|lab|color)/i;
  var designNameRe = /(color|bg|background|border|text|font|radius|shadow)/i;
  var filteredVars = {};
  var varKeys = Object.keys(cssVariables);
  for (var vi = 0; vi < varKeys.length; vi++) {
    var varName = varKeys[vi];
    var varVal = cssVariables[varName];
    if (colorValueRe.test(varVal) || designNameRe.test(varName)) {
      filteredVars[varName] = varVal;
    }
  }

  // Filter sections \u2014 only keep those with a non-empty heading
  var filteredSections = filtered.filter(function(s) { return s.heading && s.heading.length > 0; });

  return {
    title: title, description: description, ogImage: ogImage,
    cssVariables: filteredVars, fonts: Object.keys(fontMap).map(function(k) { var f = fontMap[k]; f.weights.sort(function(a,b){return a-b;}); return f; }).filter(function(f) { return f.weights.length > 0 || f.variable; }).slice(0, 20), colors: Object.keys(colorSet).sort(function(a,b) { return colorSet[b] - colorSet[a]; }).slice(0, 20),
    headings: headings, ctas: ctas,
    svgs: svgs, sections: filteredSections,
    colorStats: colorStatsArr,
    page: { width: Math.round(document.documentElement.scrollWidth), height: Math.round(document.documentElement.scrollHeight), viewport: { width: window.innerWidth, height: window.innerHeight } }
  };
})()`;
async function extractTokens(page) {
  return page.evaluate(EXTRACT_SCRIPT);
}

// src/capture/designStyleExtractor.ts
var EXTRACT_DESIGN_STYLES_SCRIPT = `(() => {
  var isVisible = (el) => {
    var s = getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0" && el.getBoundingClientRect().height > 0;
  };

  function rgbToHex(color) {
    if (!color) return "";
    if (color.startsWith('#')) return color.toUpperCase();
    // capture optional alpha (group 4), allowing both comma and modern slash (rgb r g b / a) syntax.
    var m = color.match(/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)(?:\\s*[,/]\\s*([\\d.]+))?/);
    if (!m) return color;
    // fully-transparent fill (rgba(...,0)) \u2192 sentinel, NOT #000000 \u2014 otherwise a transparent
    // chip/tab/stat ground reads as solid black on a light-ground site.
    if (m[4] !== undefined && parseFloat(m[4]) === 0) return "transparent";
    return '#' + ((1<<24) + (parseInt(m[1])<<16) + (parseInt(m[2])<<8) + parseInt(m[3])).toString(16).slice(1).toUpperCase();
  }

  function cleanFont(f) {
    return f.split(",")[0].replace(/['"]/g, "").trim();
  }

  // keep only gradient background-images (drop url() sprites + "none"); gradients are a core
  // brand signal (Stripe/ElevenLabs/Snowflake mesh washes) that a flat background-color misses.
  function gradientOf(v) {
    return v && v.indexOf("gradient") >= 0 ? v.trim() : "";
  }

  function getStyles(el) {
    var s = getComputedStyle(el);
    var bf = s.backdropFilter || s.webkitBackdropFilter || "";
    return {
      fontFamily: cleanFont(s.fontFamily),
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
      letterSpacing: s.letterSpacing,
      color: rgbToHex(s.color),
      background: rgbToHex(s.backgroundColor),
      backgroundImage: gradientOf(s.backgroundImage),
      backdropFilter: bf === "none" ? "" : bf,
      padding: s.padding,
      borderRadius: s.borderRadius,
      border: s.border,
      boxShadow: s.boxShadow === "none" ? "none" : s.boxShadow,
      height: s.height
    };
  }

  // \u2500\u2500 1. Typography hierarchy \u2500\u2500
  // Sample each text role and deduplicate by fontSize
  var typographyMap = {};
  var roleSelectors = [
    { role: "display", sel: "h1", max: 3 },
    { role: "heading-2", sel: "h2", max: 5 },
    { role: "heading-3", sel: "h3", max: 5 },
    { role: "heading-4", sel: "h4", max: 3 },
    { role: "body", sel: "p", max: 10 },
    { role: "body-small", sel: "figcaption, .caption, [class*='caption'], [class*='subtitle'], small", max: 5 },
    { role: "label", sel: "label, [class*='label'], [class*='tag'], [class*='badge']", max: 5 },
    { role: "link", sel: "a:not([class*='btn']):not([class*='button']):not([role='button'])", max: 5 },
    { role: "code", sel: "code, pre, [class*='mono']", max: 3 }
  ];

  for (var ri = 0; ri < roleSelectors.length; ri++) {
    var spec = roleSelectors[ri];
    var els = Array.from(document.querySelectorAll(spec.sel)).slice(0, spec.max);
    for (var ei = 0; ei < els.length; ei++) {
      if (!isVisible(els[ei])) continue;
      var s = getStyles(els[ei]);
      var key = s.fontSize + "|" + s.fontWeight + "|" + s.fontFamily;
      if (!typographyMap[key]) {
        var text = (els[ei].textContent || "").trim().replace(/\\s+/g, " ").slice(0, 60);
        typographyMap[key] = {
          role: spec.role,
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          color: s.color,
          sampleText: text
        };
      }
    }
  }

  // Sort by font size descending
  var typography = Object.values(typographyMap);
  typography.sort(function(a, b) {
    return parseFloat(b.fontSize) - parseFloat(a.fontSize);
  });

  // Deduplicate roles \u2014 keep only the first (largest) for each role prefix
  var seenRoles = {};
  var uniqueTypo = [];
  for (var ti = 0; ti < typography.length; ti++) {
    var baseRole = typography[ti].role.replace(/-\\d+$/, "");
    if (!seenRoles[baseRole]) {
      seenRoles[baseRole] = true;
      typography[ti].role = baseRole;
      uniqueTypo.push(typography[ti]);
    } else if (baseRole === "heading") {
      // Keep multiple heading levels
      uniqueTypo.push(typography[ti]);
    }
  }

  // \u2500\u2500 2. Buttons \u2500\u2500
  // a page's primary CTA is very often a FILLED pill in the nav/header ("Sign up", "Start for free").
  // Old code dropped everything under <nav>, losing that CTA; keep nav elements that carry a solid
  // fill (a real button), still dropping plain nav text links.
  var isFilledEl = (el) => {
    var cs = getComputedStyle(el);
    var bg = cs.backgroundColor;
    var solid = !!bg && rgbToHex(bg) !== "transparent";
    // a gradient-filled CTA (e.g. Snowflake's blue pill = background: var(--ui-background-03)) has a
    // transparent background-COLOR but a gradient background-IMAGE \u2014 count it as filled too.
    return solid || (cs.backgroundImage || "").indexOf("gradient") >= 0;
  };
  var buttonEls = Array.from(document.querySelectorAll(
    'button, a[class*="btn"], a[class*="button"], a[role="button"], ' +
    '[class*="btn-"], [class*="button-"], [class*="cta"]'
  )).filter(function(el) {
    if (!isVisible(el)) return false;
    return el.closest('nav, [role="navigation"]') ? isFilledEl(el) : true;
  }).slice(0, 16);

  var buttonMap = {};
  for (var bi = 0; bi < buttonEls.length; bi++) {
    var bs = getStyles(buttonEls[bi]);
    // Deduplicate by visual appearance (gradient fill kept distinct so a gradient CTA survives)
    var bKey = bs.background + "|" + bs.backgroundImage + "|" + bs.backdropFilter + "|" + bs.borderRadius + "|" + bs.border;
    if (!buttonMap[bKey]) {
      var btnText = (buttonEls[bi].textContent || "").trim().slice(0, 40);
      buttonMap[bKey] = {
        label: btnText || "button",
        background: bs.background,
        backgroundImage: bs.backgroundImage,
        backdropFilter: bs.backdropFilter,
        color: bs.color,
        padding: bs.padding,
        borderRadius: bs.borderRadius,
        border: bs.border,
        boxShadow: bs.boxShadow,
        fontSize: bs.fontSize,
        fontWeight: bs.fontWeight,
        height: bs.height
      };
    }
  }
  var buttons = Object.values(buttonMap).slice(0, 6);

  // \u2500\u2500 3. Cards / containers \u2500\u2500
  var cardEls = Array.from(document.querySelectorAll(
    '[class*="card"], [class*="Card"], [class*="tile"], [class*="Tile"], ' +
    '[class*="panel"], [class*="Panel"], [class*="feature"], ' +
    'article, [class*="box"]:not(select):not(input)'
  )).filter(function(el) {
    var rect = el.getBoundingClientRect();
    return isVisible(el) && rect.width > 100 && rect.height > 80;
  }).slice(0, 10);

  var cardMap = {};
  for (var ci = 0; ci < cardEls.length; ci++) {
    var cs = getStyles(cardEls[ci]);
    // gradient fill + glass blur kept in the key so a gradient/frosted card is a distinct variant
    var cKey = cs.background + "|" + cs.backgroundImage + "|" + cs.backdropFilter + "|" + cs.borderRadius + "|" + cs.border;
    if (!cardMap[cKey]) {
      cardMap[cKey] = {
        label: "card",
        background: cs.background,
        backgroundImage: cs.backgroundImage,
        backdropFilter: cs.backdropFilter,
        color: cs.color,
        padding: cs.padding,
        borderRadius: cs.borderRadius,
        border: cs.border,
        boxShadow: cs.boxShadow,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        height: cs.height
      };
    }
  }
  var cards = Object.values(cardMap).slice(0, 4);

  // \u2500\u2500 4. Navigation \u2500\u2500
  var navEl = document.querySelector('nav, header, [role="navigation"], [class*="navbar"], [class*="header"]');
  var nav = null;
  if (navEl && isVisible(navEl)) {
    var ns = getStyles(navEl);
    nav = {
      label: "navigation",
      background: ns.background,
      backgroundImage: ns.backgroundImage,
      backdropFilter: ns.backdropFilter,
      color: ns.color,
      padding: ns.padding,
      borderRadius: ns.borderRadius,
      border: ns.border,
      boxShadow: ns.boxShadow,
      fontSize: ns.fontSize,
      fontWeight: ns.fontWeight,
      height: ns.height
    };
  }

  // \u2500\u2500 4b. Chips / pills / badges / tags \u2500\u2500
  // selector by class-substring, PLUS a shape fallback (small + fully-rounded + short text) so
  // hashed/utility class names (Tailwind, CSS-modules) still get caught.
  var chipEls = Array.from(document.querySelectorAll(
    '[class*="pill"], [class*="Pill"], [class*="badge"], [class*="Badge"], ' +
    '[class*="chip"], [class*="Chip"], [class*="tag"], [class*="Tag"]'
  )).filter(function(el) {
    if (!isVisible(el) || el.closest('nav, [role="navigation"]')) return false;
    var r = el.getBoundingClientRect();
    var txt = (el.textContent || "").trim();
    return r.height > 0 && r.height <= 60 && r.width <= 360 && txt.length > 0 && txt.length <= 40;
  });
  var shapeChips = Array.from(document.querySelectorAll('span, div, li, a')).slice(0, 500).filter(function(el) {
    if (!isVisible(el) || el.closest('nav, [role="navigation"]')) return false;
    var st = getComputedStyle(el);
    var r = el.getBoundingClientRect();
    var rad = parseFloat(st.borderRadius) || 0;
    var txt = (el.textContent || "").trim();
    var hasSkin = (st.backgroundColor && st.backgroundColor !== "rgba(0, 0, 0, 0)" && st.backgroundColor !== "transparent") || (parseFloat(st.borderTopWidth) || 0) > 0;
    return hasSkin && r.height > 0 && r.height <= 44 && r.width <= 260 && rad >= (r.height / 2) - 1 && txt.length > 0 && txt.length <= 24 && el.children.length <= 1;
  });
  var allChips = chipEls.concat(shapeChips);
  var chipMap = {};
  for (var chi = 0; chi < allChips.length; chi++) {
    var chs = getStyles(allChips[chi]);
    var chKey = chs.background + "|" + chs.borderRadius + "|" + chs.border;
    if (!chipMap[chKey]) {
      chipMap[chKey] = {
        label: (allChips[chi].textContent || "").trim().slice(0, 24) || "chip",
        background: chs.background, color: chs.color, padding: chs.padding, borderRadius: chs.borderRadius,
        border: chs.border, boxShadow: chs.boxShadow, fontSize: chs.fontSize, fontWeight: chs.fontWeight, height: chs.height
      };
    }
  }
  var chips = Object.values(chipMap).slice(0, 4);

  // \u2500\u2500 4c. Stat / metric cells (a big numeral + a small label) \u2500\u2500
  var statEls = Array.from(document.querySelectorAll(
    '[class*="stat"], [class*="Stat"], [class*="metric"], [class*="Metric"], ' +
    '[class*="kpi"], [class*="KPI"], [class*="figure"], [class*="Figure"]'
  )).filter(function(el) {
    if (!isVisible(el)) return false;
    var r = el.getBoundingClientRect();
    return r.height > 0 && r.height <= 400 && r.width <= 600;
  }).slice(0, 14);
  function biggestFontChild(el) {
    var best = 0, bestEl = null, kids = el.querySelectorAll("*");
    for (var i = 0; i < kids.length; i++) {
      if (!isVisible(kids[i])) continue;
      var fz = parseFloat(getComputedStyle(kids[i]).fontSize) || 0;
      if (fz > best) { best = fz; bestEl = kids[i]; }
    }
    return bestEl;
  }
  var statMap = {};
  for (var sti = 0; sti < statEls.length; sti++) {
    var numEl = biggestFontChild(statEls[sti]) || statEls[sti];
    var numFz = parseFloat(getComputedStyle(numEl).fontSize) || 0;
    if (numFz < 28) continue; // needs a genuinely large numeral to count as a stat cell
    var cst = getStyles(statEls[sti]);
    var nst = getStyles(numEl);
    var stKey = Math.round(numFz) + "|" + cst.background;
    if (!statMap[stKey]) {
      statMap[stKey] = {
        background: cst.background, borderRadius: cst.borderRadius, border: cst.border, boxShadow: cst.boxShadow,
        numberFontSize: nst.fontSize, numberFontWeight: nst.fontWeight, numberColor: nst.color
      };
    }
  }
  var statCells = Object.values(statMap).slice(0, 3);

  // \u2500\u2500 4d. Tabs \u2500\u2500
  var tabEls = Array.from(document.querySelectorAll(
    '[role="tab"], [class*="tab"]:not([class*="table"]):not([class*="Table"])'
  )).filter(function(el) {
    if (!isVisible(el)) return false;
    var r = el.getBoundingClientRect();
    var txt = (el.textContent || "").trim();
    return r.height > 0 && r.height <= 64 && txt.length > 0 && txt.length <= 30;
  }).slice(0, 12);
  var tabMap = {};
  for (var tbi = 0; tbi < tabEls.length; tbi++) {
    var tst = getStyles(tabEls[tbi]);
    var tKey = tst.background + "|" + tst.color + "|" + tst.border;
    if (!tabMap[tKey]) {
      tabMap[tKey] = {
        label: (tabEls[tbi].textContent || "").trim().slice(0, 24) || "tab",
        background: tst.background, color: tst.color, padding: tst.padding, borderRadius: tst.borderRadius,
        border: tst.border, boxShadow: tst.boxShadow, fontSize: tst.fontSize, fontWeight: tst.fontWeight, height: tst.height
      };
    }
  }
  var tabs = Object.values(tabMap).slice(0, 4);

  // \u2500\u2500 5. Spacing scale \u2500\u2500
  // Collect padding and margin values from visible elements
  var spacingCounts = {};
  var spacingSamples = Array.from(document.querySelectorAll(
    "section, div, article, main, aside, header, footer, nav, " +
    "button, a, p, h1, h2, h3, h4, li, ul, ol"
  )).slice(0, 200);

  for (var si = 0; si < spacingSamples.length; si++) {
    if (!isVisible(spacingSamples[si])) continue;
    var ss = getComputedStyle(spacingSamples[si]);
    var props = [ss.paddingTop, ss.paddingRight, ss.paddingBottom, ss.paddingLeft,
                 ss.marginTop, ss.marginRight, ss.marginBottom, ss.marginLeft,
                 ss.gap, ss.rowGap, ss.columnGap];
    for (var pi = 0; pi < props.length; pi++) {
      var val = parseFloat(props[pi]);
      if (val > 0 && val <= 200) {
        var rounded = Math.round(val);
        spacingCounts[rounded] = (spacingCounts[rounded] || 0) + 1;
      }
    }
  }

  // Find the most common spacing values (at least 3 occurrences)
  var spacingEntries = Object.entries(spacingCounts)
    .filter(function(e) { return e[1] >= 3; })
    .sort(function(a, b) { return b[1] - a[1]; });
  var observedSpacing = spacingEntries.map(function(e) { return parseInt(e[0]); }).sort(function(a,b) { return a - b; });

  // Detect base unit \u2014 GCD of the top spacing values, clamped to 4 or 8
  var baseUnit = 8;
  if (observedSpacing.length >= 3) {
    var divisible4 = observedSpacing.filter(function(v) { return v % 4 === 0; }).length;
    var divisible8 = observedSpacing.filter(function(v) { return v % 8 === 0; }).length;
    baseUnit = (divisible4 > divisible8 * 1.5) ? 4 : 8;
  }

  // \u2500\u2500 6. Border radius scale \u2500\u2500
  var radiusCounts = {};
  var radiusSamples = Array.from(document.querySelectorAll(
    "button, a, [class*='card'], [class*='btn'], input, select, textarea, " +
    "[class*='badge'], [class*='tag'], [class*='chip'], img, video"
  )).slice(0, 100);

  for (var rsi = 0; rsi < radiusSamples.length; rsi++) {
    if (!isVisible(radiusSamples[rsi])) continue;
    var br = getComputedStyle(radiusSamples[rsi]).borderRadius;
    if (br && br !== "0px") {
      radiusCounts[br] = (radiusCounts[br] || 0) + 1;
    }
  }

  var radius = Object.entries(radiusCounts)
    .filter(function(e) { return e[1] >= 2; })
    .sort(function(a, b) { return parseFloat(a[0]) - parseFloat(b[0]); })
    .map(function(e) { return e[0]; });

  // \u2500\u2500 7. Box shadows \u2500\u2500
  var shadowCounts = {};
  // Keep semantic samples even when they are small or appear late in a dense page.
  var semanticShadowSamples = new Set(Array.from(document.querySelectorAll(
    "[class*='card'], [class*='Card'], button, [class*='btn'], " +
    "[class*='dropdown'], [class*='modal'], [class*='popover'], " +
    "nav, header, [class*='panel'], article"
  )).slice(0, 100));
  // Plain/utility-class boxes also carry elevation. Bound the extra style reads
  // and deduplicate elements that already matched a semantic selector.
  var shadowSamples = new Set([
    ...semanticShadowSamples,
    ...Array.from(document.querySelectorAll("div, section, aside, li, a, figure, main")).slice(0, 800)
  ]);

  for (var shEl of shadowSamples) {
    if (!isVisible(shEl)) continue;
    if (!semanticShadowSamples.has(shEl)) {
      var shRect = shEl.getBoundingClientRect();
      if (shRect.width * shRect.height < 1600) continue;
      if (shRect.width > window.innerWidth * 0.95 && shRect.height > window.innerHeight * 0.9) continue;
    }
    var shVal = getComputedStyle(shEl).boxShadow;
    if (shVal && shVal !== "none") {
      shadowCounts[shVal] = (shadowCounts[shVal] || 0) + 1;
    }
  }

  var shadows = Object.entries(shadowCounts)
    .sort(function(a, b) { return b[1] - a[1]; })
    .slice(0, 5)
    .map(function(e) { return { value: e[0], count: e[1] }; });

  // \u2500\u2500 8. Dominant gradient / mesh backgrounds \u2500\u2500
  // A site's signature color wash (Stripe/ElevenLabs/Snowflake) lives in gradient background-images
  // on large blocks \u2014 often on a pseudo-element (::before glow orbs) rather than the block itself.
  // Weight each distinct gradient by the total on-screen area it covers; return the top few.
  var gradientArea = {};
  var gradSamples = Array.from(document.querySelectorAll(
    "body, main, section, header, div, [class*='hero'], [class*='gradient'], [class*='bg'], [class*='background']"
  )).slice(0, 400);

  // max stop chroma (max\u2212min RGB) of a gradient: a vivid brand wash scores high, a neutral
  // white/cream scrim ~0. Used to rank washes so a small vivid gradient beats a big grey scrim.
  function gradientChroma(g) {
    var max = 0, re = /rgba?\\(\\s*(\\d+)[,\\s]+(\\d+)[,\\s]+(\\d+)/g, m;
    while ((m = re.exec(g))) {
      var r = +m[1], gr = +m[2], b = +m[3];
      var c = Math.max(r, gr, b) - Math.min(r, gr, b);
      if (c > max) max = c;
    }
    return max;
  }

  function addGradient(val, area) {
    var g = gradientOf(val);
    if (!g || area < 20000) return; // ignore tiny decorative gradients
    var norm = g.replace(/\\s+/g, " ");
    gradientArea[norm] = (gradientArea[norm] || 0) + area;
  }

  for (var gi = 0; gi < gradSamples.length; gi++) {
    var gel = gradSamples[gi];
    if (!isVisible(gel)) continue;
    var grect = gel.getBoundingClientRect();
    var garea = grect.width * grect.height;
    if (garea < 20000) continue;
    addGradient(getComputedStyle(gel).backgroundImage, garea);
    addGradient(getComputedStyle(gel, "::before").backgroundImage, garea);
    addGradient(getComputedStyle(gel, "::after").backgroundImage, garea);
  }

  // rank by chroma-weighted area so the brand's signature color wash outranks a larger neutral scrim
  var backgrounds = Object.entries(gradientArea)
    .map(function(e) { return { value: e[0], area: Math.round(e[1]), score: e[1] * (1 + 2 * gradientChroma(e[0]) / 255) }; })
    .sort(function(a, b) { return b.score - a.score; })
    .slice(0, 6)
    .map(function(e) { return { value: e.value, area: e.area }; });

  // \u2500\u2500 9. Frosted-glass panels (backdrop-filter) \u2500\u2500
  // A defining material on modern hero UIs (HeyGen's prompt box, Stripe's floating chrome): a
  // translucent surface with a backdrop blur. Capture the RAW fill (rgba/gradient \u2014 alpha preserved,
  // unlike rgbToHex) + the blur, ranked by area. This is what lets a frame render a real frosted card.
  var glassSamples = Array.from(document.querySelectorAll(
    "div, section, header, nav, aside, [class*='card'], [class*='panel'], [class*='glass'], [class*='blur'], [class*='modal'], [class*='overlay'], [class*='input']"
  )).slice(0, 400);
  var glassByKey = {};
  for (var qi = 0; qi < glassSamples.length; qi++) {
    var qel = glassSamples[qi];
    if (!isVisible(qel)) continue;
    var qs = getComputedStyle(qel);
    var bf = qs.backdropFilter || qs.webkitBackdropFilter || "";
    if (!bf || bf === "none" || bf.indexOf("blur") < 0) continue;
    var qrect = qel.getBoundingClientRect();
    var qarea = qrect.width * qrect.height;
    if (qarea < 8000) continue; // ignore tiny blurred chips
    // raw fill with alpha intact: prefer a translucent gradient, else the rgba background-color
    var gi2 = qs.backgroundImage;
    var rawFill = gi2 && gi2.indexOf("gradient") >= 0 ? gi2.replace(/\\s+/g, " ").trim() : qs.backgroundColor;
    var key = bf + "|" + rawFill + "|" + qs.borderRadius;
    if (!glassByKey[key]) {
      glassByKey[key] = {
        backdropFilter: bf,
        background: rawFill,
        border: qs.border,
        borderRadius: qs.borderRadius,
        boxShadow: qs.boxShadow === "none" ? "" : qs.boxShadow,
        area: 0
      };
    }
    glassByKey[key].area += qarea;
  }
  var glass = Object.values(glassByKey)
    .sort(function(a, b) { return b.area - a.area; })
    .slice(0, 3)
    .map(function(g) { return { backdropFilter: g.backdropFilter, background: g.background, border: g.border, borderRadius: g.borderRadius, boxShadow: g.boxShadow, area: Math.round(g.area) }; });

  return {
    typography: uniqueTypo,
    spacing: { observed: observedSpacing.slice(0, 15), baseUnit: baseUnit },
    radius: radius,
    shadows: shadows,
    buttons: buttons,
    cards: cards,
    nav: nav,
    chips: chips,
    statCells: statCells,
    tabs: tabs,
    backgrounds: backgrounds,
    glass: glass
  };
})()`;
async function extractDesignStyles(page) {
  return page.evaluate(EXTRACT_DESIGN_STYLES_SCRIPT);
}

// src/capture/mediaCapture.ts
import { readdirSync as readdirSync2, readFileSync as readFileSync3, statSync as statSync2 } from "fs";
import { join as join6, extname } from "path";

// src/capture/lottiePreviewRequests.ts
var LOTTIE_RUNTIME_URL = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
function allowedLottieRequest(url, resourceType) {
  if (url === LOTTIE_RUNTIME_URL) return true;
  if (!["image", "font", "stylesheet"].includes(resourceType)) return false;
  if (url.startsWith("data:") || url.startsWith("blob:")) return true;
  return !isPrivateUrl(url);
}
async function guardLottiePreviewRequests(page) {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.isInterceptResolutionHandled()) return;
    const action = allowedLottieRequest(request.url(), request.resourceType()) ? request.continue() : request.abort("blockedbyclient");
    void action.catch(() => {
    });
  });
}

// src/capture/mediaCapture.ts
function liveRemainingMs(budget, fallbackMs) {
  return budget.remainingMs?.() ?? fallbackMs;
}
async function saveLottieAnimations(discoveredLotties, lottieDir, outputDir, budget = {}) {
  ensureCaptureDirSync(outputDir, lottieDir);
  const byteBudget = budget.byteBudget ?? createCaptureDownloadBudget();
  let savedCount = 0;
  const savedHashes = /* @__PURE__ */ new Set();
  for (let li = 0; li < discoveredLotties.length && li < 10; li++) {
    if (liveRemainingMs(budget, 1e4) <= 0) break;
    const lottieItem = discoveredLotties[li];
    try {
      let jsonData;
      if (lottieItem.data) {
        jsonData = JSON.stringify(lottieItem.data);
        const size = Buffer.byteLength(jsonData);
        if (size > MAX_LOTTIE_BYTES) continue;
        if (lottieItem.dataBudget !== byteBudget) {
          if (size > byteBudget.remainingBytes) continue;
          byteBudget.remainingBytes -= size;
        }
      } else if (lottieItem.url) {
        const requestTimeoutMs = Math.min(1e4, liveRemainingMs(budget, 1e4));
        if (requestTimeoutMs <= 0) break;
        const res = await safeFetch(lottieItem.url, {
          signal: AbortSignal.timeout(requestTimeoutMs),
          headers: { "User-Agent": CAPTURE_USER_AGENT }
        });
        if (!res || !res.ok) continue;
        const buf = await readBoundedResponse(res, MAX_LOTTIE_BYTES, byteBudget);
        if (!buf) continue;
        jsonData = new URL(lottieItem.url).pathname.endsWith(".lottie") ? readLottieArchive(buf) ?? void 0 : buf.toString("utf8");
      }
      if (jsonData) {
        const hash = jsonData.slice(0, 200);
        if (savedHashes.has(hash)) continue;
        savedHashes.add(hash);
        if (!validLottieJson(jsonData)) continue;
        writeCaptureFileSync(join6(lottieDir, `animation-${savedCount}.json`), jsonData, "utf-8");
        savedCount++;
      }
    } catch {
    }
  }
  return savedCount;
}
async function renderLottiePreviews(chromeBrowser, lottieDir, outputDir, budget = {}) {
  const manifest = [];
  const previewDir = join6(lottieDir, "previews");
  ensureCaptureDirSync(outputDir, previewDir);
  for (const file of readdirSync2(lottieDir)) {
    if (!file.endsWith(".json")) continue;
    if (liveRemainingMs(budget, 1) <= 0) break;
    try {
      const raw = JSON.parse(readFileSync3(join6(lottieDir, file), "utf-8"));
      const fr = raw.fr || 30;
      const dur = ((raw.op || 0) - (raw.ip || 0)) / fr;
      const previewName = file.replace(".json", "-preview.png");
      let preview;
      const fileSize = statSync2(join6(lottieDir, file)).size;
      if (fileSize > 2e6) continue;
      let previewPage;
      try {
        if (liveRemainingMs(budget, 1) <= 0) break;
        previewPage = await chromeBrowser.newPage();
        if (liveRemainingMs(budget, 1) <= 0) break;
        await guardLottiePreviewRequests(previewPage);
        await previewPage.setViewport({ width: 400, height: 400 });
        const animData = JSON.parse(readFileSync3(join6(lottieDir, file), "utf-8"));
        const midFrame = Math.floor(((raw.op || 0) - (raw.ip || 0)) * 0.3);
        await previewPage.setContent(
          `<!DOCTYPE html>
<html><head>
<script src="${LOTTIE_RUNTIME_URL}"></script>
<style>*{margin:0;padding:0;background:transparent}#c{width:400px;height:400px}</style>
</head><body><div id="c"></div></body></html>`,
          { waitUntil: "load", timeout: 1e4 }
        );
        await previewPage.evaluate(
          (data, frame) => {
            const a = window.lottie.loadAnimation({
              container: document.getElementById("c"),
              renderer: "svg",
              loop: false,
              autoplay: false,
              animationData: data
            });
            a.addEventListener("DOMLoaded", () => {
              a.goToAndStop(frame, true);
              window.__READY = true;
            });
          },
          animData,
          midFrame
        );
        await previewPage.waitForFunction(() => window.__READY === true, { timeout: 5e3 }).catch(() => {
        });
        if (liveRemainingMs(budget, 1) > 0) {
          const shot = await previewPage.screenshot({ type: "png", omitBackground: true });
          writeCaptureFileSync(join6(previewDir, previewName), shot);
          preview = `assets/lottie/previews/${previewName}`;
        }
      } catch {
      } finally {
        await previewPage?.close().catch(() => {
        });
      }
      manifest.push({
        file: `assets/lottie/${file}`,
        ...preview ? { preview } : {},
        name: raw.nm || file,
        width: raw.w || 0,
        height: raw.h || 0,
        duration: Math.round(dur * 10) / 10,
        frameRate: fr,
        layers: (raw.layers || []).length
      });
    } catch {
    }
  }
  if (manifest.length > 0) {
    writeCaptureFileSync(
      join6(outputDir, "extracted", "lottie-manifest.json"),
      JSON.stringify(manifest, null, 2),
      "utf-8"
    );
  }
}
var MAX_VIDEO_BYTES = 75 * 1024 * 1024;
var DOWNLOADABLE_VIDEO_EXTS = /* @__PURE__ */ new Set([".mp4", ".webm", ".mov", ".m4v"]);
var VIDEO_DOWNLOAD_TIMEOUT_MS = 12e4;
function remainingVideoDownloadTimeoutMs(budgetStartedAt, budgetMs, now = Date.now()) {
  return Math.max(0, Math.min(VIDEO_DOWNLOAD_TIMEOUT_MS, budgetMs - (now - budgetStartedAt)));
}
async function downloadVideoBody(srcUrl, filename, videosDir, timeoutMs) {
  if (isPrivateUrl(srcUrl)) return null;
  let ext = "";
  try {
    ext = extname(new URL(srcUrl).pathname).toLowerCase();
  } catch {
    return null;
  }
  if (!DOWNLOADABLE_VIDEO_EXTS.has(ext)) return null;
  try {
    const res = await safeFetch(srcUrl, {
      signal: AbortSignal.timeout(timeoutMs),
      // bounded by both per-request and aggregate capture budgets
      headers: { "User-Agent": CAPTURE_USER_AGENT }
    });
    if (!res || !res.ok || !res.body) return null;
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct && !ct.startsWith("video/") && !ct.includes("octet-stream")) return null;
    const declared = Number(res.headers.get("content-length") || 0);
    if (declared && declared > MAX_VIDEO_BYTES) return null;
    const chunks = [];
    let total = 0;
    for await (const chunk of res.body) {
      total += chunk.length;
      if (total > MAX_VIDEO_BYTES) return null;
      chunks.push(Buffer.from(chunk));
    }
    if (total < 1024) return null;
    const safe = /\.[a-z0-9]+$/i.test(filename) ? filename.replace(/[^\w.-]/g, "_") : `video${ext}`;
    writeCaptureFileSync(join6(videosDir, safe), Buffer.concat(chunks));
    return `assets/videos/${safe}`;
  } catch {
    return null;
  }
}
var VIDEO_SCAN_EXPR = `(() => {
  var videos = Array.from(document.querySelectorAll('video'));
  return videos.map(function(v) {
    var src = v.src || v.currentSrc || (v.querySelector('source') ? v.querySelector('source').src : '');
    if (!src || !src.startsWith('http')) return null;
    var rect = v.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return null;
    var heading = '';
    var el = v;
    for (var i = 0; i < 8; i++) {
      el = el.parentElement;
      if (!el) break;
      var h = el.querySelector('h1,h2,h3,h4');
      if (h) { heading = h.textContent.trim().slice(0, 100); break; }
    }
    var caption = '';
    el = v;
    for (var j = 0; j < 5; j++) {
      el = el.parentElement;
      if (!el) break;
      var p = el.querySelector('p,figcaption,[class*="caption"],[class*="desc"]');
      if (p) { caption = p.textContent.trim().slice(0, 200); break; }
    }
    var ariaLabel = v.getAttribute('aria-label') || v.getAttribute('title') || '';
    var wrapper = v.parentElement;
    if (!ariaLabel && wrapper) ariaLabel = wrapper.getAttribute('aria-label') || '';
    return {
      src: src,
      // width/height are the DOM display box (what the page laid the element out
      // at); sourceWidth/Height are the clip's intrinsic resolution. Size planners
      // off the source dims, not the display box (a 1920x1080 clip can display at
      // 904x613). 0 when metadata has not loaded yet.
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      sourceWidth: v.videoWidth || 0,
      sourceHeight: v.videoHeight || 0,
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      heading: heading,
      caption: caption,
      ariaLabel: ariaLabel,
      filename: src.split('/').pop().split('?')[0],
    };
  }).filter(Boolean);
})()`;
async function scanVideoDom(page) {
  return await page.evaluate(VIDEO_SCAN_EXPR);
}
async function sampleVideoDom(page, budgetMs, netSet, budget) {
  const seen = /* @__PURE__ */ new Map();
  const start = Date.now();
  let stale = 0;
  while (Date.now() - start < budgetMs && stale < 3 && liveRemainingMs(budget, 1) > 0) {
    let grew = false;
    const netBefore = netSet.size;
    for (const d of await scanVideoDom(page)) {
      if (!seen.has(d.src)) {
        seen.set(d.src, d);
        grew = true;
      }
    }
    if (netSet.size > netBefore) grew = true;
    stale = grew ? 0 : stale + 1;
    const waitMs = Math.min(
      2e3,
      Math.max(0, budgetMs - (Date.now() - start)),
      Math.max(0, liveRemainingMs(budget, 2e3))
    );
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
  }
  return [...seen.values()];
}
async function captureVideoManifest(page, outputDir, progress, opts) {
  const netSet = opts?.networkVideoUrls ?? /* @__PURE__ */ new Set();
  const sampleMs = opts?.sampleMs ?? 0;
  const downloadBudgetMs = opts?.downloadBudgetMs ?? 18e4;
  const initial = await scanVideoDom(page);
  const domVideos = initial.length > 0 && sampleMs > 0 ? await sampleVideoDom(page, sampleMs, netSet, opts ?? {}) : initial;
  const fileKey = (s) => (s.split("/").pop() || s).split("?")[0];
  const byKey = /* @__PURE__ */ new Map();
  for (const d of domVideos) {
    const k = d.filename || fileKey(d.src);
    if (!byKey.has(k)) byKey.set(k, { ...d, rich: true });
  }
  for (const url of netSet) {
    if (!url.startsWith("http")) continue;
    const k = fileKey(url);
    if (!byKey.has(k)) {
      byKey.set(k, {
        src: url,
        filename: k,
        width: 0,
        height: 0,
        sourceWidth: 0,
        sourceHeight: 0,
        top: 0,
        left: 0,
        heading: "",
        caption: "",
        ariaLabel: "",
        rich: false
      });
    }
  }
  const merged = [...byKey.values()];
  if (merged.length === 0) return;
  const videoManifestDir = join6(outputDir, "assets", "videos");
  ensureCaptureDirSync(outputDir, videoManifestDir);
  const previewDir = join6(videoManifestDir, "previews");
  ensureCaptureDirSync(outputDir, previewDir);
  const videoManifest = [];
  const dlStart = Date.now();
  for (let vi = 0; vi < merged.length && vi < 20; vi++) {
    const iterationRemainingMs = liveRemainingMs(
      opts ?? {},
      remainingVideoDownloadTimeoutMs(dlStart, downloadBudgetMs)
    );
    if (iterationRemainingMs <= 0) break;
    const v = merged[vi];
    let preview;
    if (v.rich) {
      const previewName = `video-${vi}-preview.png`;
      try {
        await page.evaluate(`window.scrollTo(0, ${Math.max(0, v.top - 100)})`);
        await new Promise((r) => setTimeout(r, 300));
        const rect = await page.evaluate((fn) => {
          const vid = [...document.querySelectorAll("video")].find(
            (x) => (x.src || x.currentSrc || "").includes(fn)
          );
          if (!vid) return null;
          vid.currentTime = 0.1;
          return vid.getBoundingClientRect().toJSON();
        }, v.filename);
        if (rect && rect.width >= 10) {
          await new Promise((r) => setTimeout(r, 200));
          if (liveRemainingMs(opts ?? {}, 1) > 0) {
            const shot = await page.screenshot({
              type: "png",
              clip: {
                x: Math.max(0, rect.x),
                y: Math.max(0, rect.y),
                width: Math.min(rect.width, 1920),
                height: Math.min(rect.height, 1080)
              }
            });
            writeCaptureFileSync(join6(previewDir, previewName), shot);
            preview = `assets/videos/previews/${previewName}`;
          }
        }
      } catch {
      }
    }
    const downloadTimeoutMs = Math.min(
      remainingVideoDownloadTimeoutMs(dlStart, downloadBudgetMs),
      liveRemainingMs(opts ?? {}, VIDEO_DOWNLOAD_TIMEOUT_MS)
    );
    const savedPath = downloadTimeoutMs > 0 ? await downloadVideoBody(v.src, v.filename, videoManifestDir, downloadTimeoutMs) : null;
    if (!preview && !savedPath) continue;
    videoManifest.push({
      index: vi,
      url: v.src,
      filename: v.filename,
      width: v.width,
      height: v.height,
      sourceWidth: v.sourceWidth,
      sourceHeight: v.sourceHeight,
      heading: v.heading,
      caption: v.caption,
      ariaLabel: v.ariaLabel,
      ...preview ? { preview } : {},
      ...savedPath ? { localPath: savedPath } : {}
    });
  }
  if (videoManifest.length > 0) {
    writeCaptureFileSync(
      join6(outputDir, "extracted", "video-manifest.json"),
      JSON.stringify(videoManifest, null, 2),
      "utf-8"
    );
    const downloaded = videoManifest.filter((v) => v.localPath).length;
    const previews = videoManifest.filter((v) => v.preview).length;
    progress(
      "design",
      `${videoManifest.length} video(s) discovered` + (previews ? `, ${previews} preview(s)` : "") + (downloaded ? `, ${downloaded} body downloaded` : "")
    );
  }
}

// src/capture/filterExtractedScripts.ts
var FRAMEWORK_SRC_PATTERNS = [
  /_next\/static\/chunks\/(main|framework|webpack|pages\/)/,
  /_next\/static\/chunks\/app\//,
  /_buildManifest\.js/,
  /_ssgManifest\.js/
];
var NEXT_BOOTSTRAP_MARKERS = [
  "__next_f",
  "self.__next_f",
  "__NEXT_LOADED_PAGES__",
  "_N_E",
  "__NEXT_P"
];
function removeMatchingScripts(source, shouldRemove) {
  const rootId = "__hf_root";
  const { document: document2 } = parseHTML(`<div id="${rootId}">${source}</div>`);
  for (const script of document2.querySelectorAll("script")) {
    if (script.id === "__NEXT_DATA__" || shouldRemove(script)) script.remove();
  }
  return document2.getElementById(rootId)?.innerHTML ?? "";
}
function filterExtractedScripts(bodyHtml, headHtml) {
  const body = removeMatchingScripts(
    bodyHtml,
    (script) => NEXT_BOOTSTRAP_MARKERS.some((marker) => script.textContent?.includes(marker))
  );
  const head = removeMatchingScripts(headHtml, (script) => {
    const src = script.getAttribute("src") ?? "";
    return FRAMEWORK_SRC_PATTERNS.some((pattern) => pattern.test(src));
  });
  return { bodyHtml: body, headHtml: head };
}

// src/capture/coreExtractionPhase.ts
async function runCoreExtraction(input) {
  let {
    page1,
    chromeBrowser,
    cdp,
    cdpAnims,
    state,
    outputDir,
    warnings,
    progress,
    remainingMs,
    pageContentCheck,
    contentCheckTimedOut,
    discoveredLotties,
    lottieDiscovery,
    discoveredVideoUrls,
    animationCatalog,
    capturedShaders,
    catalogedAssets,
    detectedLibraries,
    visibleTextContent,
    faviconLinks,
    tokens,
    extracted,
    screenshots,
    downloadByteBudget,
    canWrite
  } = input;
  const runLazyAndLottie = async () => {
    if (!contentCheckTimedOut && pageContentCheck.textLength < 100) {
      const reason = "Page has very little text content (" + pageContentCheck.textLength + " chars) \u2014 may be blocked or a client-rendered SPA that needs more time";
      warnings.push(reason);
      progress("warn", reason);
    }
    const lazyLoadBudgetMs = Math.min(15e3, remainingMs());
    const lazyScroll = await lazyScrollForCapture(page1, lazyLoadBudgetMs, {
      onWarning: (message) => {
        warnings.push(message);
        progress("warn", message);
      }
    });
    if (lazyScroll.timedOut && !lazyScroll.degraded) {
      const message = `lazy-scroll stopped after ${lazyScroll.steps} steps (budget ${lazyLoadBudgetMs}ms)`;
      warnings.push(message);
      progress("warn", message);
    }
    await new Promise((r) => setTimeout(r, 300));
  };
  await runLazyAndLottie();
  const runAnimationDiscovery = async () => {
    const scanDomLotties = async () => {
      try {
        const domLotties = await page1.evaluate(`(() => {
    var urls = [];
    document.querySelectorAll('dotlottie-wc, lottie-player, dotlottie-player').forEach(function(el) {
      var src = el.getAttribute('src');
      if (src) urls.push(src);
    });
    // Also check lottie-web registered animations
    if (window.lottie && window.lottie.getRegisteredAnimations) {
      window.lottie.getRegisteredAnimations().forEach(function(anim) {
        if (anim.path) urls.push(anim.path);
      });
    }
    return urls;
  })()`);
        if (Array.isArray(domLotties)) {
          for (const lottieUrl of domLotties) {
            if (typeof lottieUrl === "string" && !discoveredLotties.some((l) => l.url === lottieUrl)) {
              discoveredLotties.push({ url: lottieUrl });
            }
          }
        }
      } catch {
      }
    };
    await scanDomLotties();
    const collectNetworkLotties = async () => {
      for (const found of await lottieDiscovery.run(downloadByteBudget, remainingMs)) {
        const existing = discoveredLotties.findIndex(
          (item) => item.url === found.url
        );
        if (existing < 0) discoveredLotties.push(found);
        else discoveredLotties[existing] = found;
      }
    };
    await collectNetworkLotties();
    const saveDiscoveredLotties = async () => {
      if (discoveredLotties.length > 0 && remainingMs() > 0) {
        const lottieDir = join7(outputDir, "assets", "lottie");
        if (!canWrite()) return;
        const lottieBudget = { remainingMs, byteBudget: downloadByteBudget };
        const savedCount = await saveLottieAnimations(
          discoveredLotties,
          lottieDir,
          outputDir,
          lottieBudget
        );
        if (savedCount > 0 && remainingMs() > 0 && canWrite()) {
          await renderLottiePreviews(chromeBrowser, lottieDir, outputDir, lottieBudget);
          progress("lottie", `${savedCount} Lottie animation(s) saved`);
        }
      }
    };
    await saveDiscoveredLotties();
  };
  await runAnimationDiscovery();
  const runShaderCapture = async () => {
    try {
      const shaders = await page1.evaluate(`window.__capturedShaders || []`);
      if (Array.isArray(shaders) && shaders.length > 0) {
        const seen = /* @__PURE__ */ new Set();
        const unique = shaders.filter((s) => {
          if (seen.has(s.source)) return false;
          seen.add(s.source);
          return true;
        });
        capturedShaders = unique;
        if (canWrite()) {
          writeCaptureFileSync(
            join7(outputDir, "extracted", "shaders.json"),
            JSON.stringify(unique, null, 2),
            "utf-8"
          );
        }
        progress("shaders", `${unique.length} WebGL shader(s) captured`);
      }
    } catch {
    }
  };
  await runShaderCapture();
  const runTokenExtraction = async () => {
    progress("tokens", "Extracting design tokens...");
    tokens = await extractTokens(page1);
    state.tokens = tokens;
    if (canWrite()) {
      writeCaptureFileSync(
        join7(outputDir, "extracted", "tokens.json"),
        serializeTokensForCapture(tokens),
        "utf-8"
      );
    }
    progress("style", "Extracting design styles...");
    try {
      const designStyles = await extractDesignStyles(page1);
      state.designStyles = designStyles;
      if (canWrite()) {
        writeCaptureFileSync(
          join7(outputDir, "extracted", "design-styles.json"),
          JSON.stringify(designStyles, null, 2),
          "utf-8"
        );
      }
      progress(
        "tokens",
        `${designStyles.typography.length} typography roles, ${designStyles.buttons.length} button styles, ${designStyles.shadows.length} shadow values extracted`
      );
    } catch (err) {
      const errMsg = err instanceof Error ? `${err.message}
${err.stack}` : normalizeErrorMessage(err);
      console.error(`  \u26A0 Design style extraction failed: ${errMsg}`);
      warnings.push(`Design style extraction failed: ${errMsg}`);
    }
  };
  await runTokenExtraction();
  const runAnimationCapture = async () => {
    progress("animations", "Cataloging animations...");
    try {
      const animationOutcome = await collectAnimationCatalog(page1, cdpAnims, cdp, {
        scrollBudgetMs: Math.min(8e3, remainingMs()),
        evaluateBudgetMs: Math.min(15e3, remainingMs())
      });
      animationCatalog = animationOutcome.catalog;
      if (animationOutcome.timedOut) {
        const message = "animation catalog evaluate timed out; continuing without animation catalog";
        warnings.push(message);
        progress("warn", message);
      }
    } catch (err) {
      if (!isDegradableEvaluateTimeoutError(err)) {
        throw err;
      }
      const message = "animation catalog evaluate timed out; continuing without animation catalog";
      warnings.push(message);
      progress("warn", message);
      try {
        await cdp.send("Animation.disable");
      } catch {
      }
    }
    progress("screenshots", "Capturing scroll screenshots...");
    const { captureScrollScreenshots } = await import("./screenshotCapture-ECBTLCU6.js");
    try {
      if (!canWrite()) return;
      screenshots = await captureScrollScreenshots(page1, outputDir, { remainingMs });
      state.screenshots = screenshots;
      progress("screenshots", `${screenshots.length} scroll screenshots captured`);
    } catch (err) {
      if (!isDegradableEvaluateTimeoutError(err)) {
        throw err;
      }
      const message = "scroll screenshots timed out; continuing without screenshots";
      warnings.push(message);
      progress("warn", message);
    }
  };
  await runAnimationCapture();
  const runHtmlExtraction = async () => {
    progress("design", "Cataloging assets...");
    try {
      const { catalogAssets } = await import("./assetCataloger-BQX2DFS6.js");
      catalogedAssets = await catalogAssets(page1);
      progress("design", `${catalogedAssets.length} assets cataloged`);
      if (catalogedAssets.length === 0) {
        warnings.push(
          "Asset catalog is empty \u2014 no images will be downloaded. The page may use non-standard image loading."
        );
      }
    } catch (err) {
      warnings.push(`Asset cataloging failed (no images will be downloaded): ${err}`);
    }
    progress("extract", "Extracting HTML & CSS...");
    extracted = await extractHtml(page1, { settleTime: 1e3 });
    state.extracted = extracted;
    extracted.bodyHtml = extracted.bodyHtml.replace(/\s*data-reactroot="[^"]*"/g, "").replace(/\s*data-reactroot/g, "");
    const filteredScripts = filterExtractedScripts(extracted.bodyHtml, extracted.headHtml);
    extracted.bodyHtml = filteredScripts.bodyHtml;
    extracted.headHtml = filteredScripts.headHtml;
    try {
      const videoBudgetMs = remainingMs();
      if (videoBudgetMs > 0 && canWrite()) {
        await captureVideoManifest(page1, outputDir, progress, {
          networkVideoUrls: discoveredVideoUrls,
          // Layer 1 (live Set, read after sampling)
          sampleMs: Math.min(12e3, videoBudgetMs),
          // Layer 2: poll DOM within the shared budget
          downloadBudgetMs: videoBudgetMs,
          remainingMs
        });
      }
    } catch (err) {
      if (err instanceof CaptureDirRefusedError)
        warnings.push(`Video manifest skipped: ${err.message}`);
    }
    detectedLibraries = await detectLibraries(page1, capturedShaders);
    visibleTextContent = await extractVisibleText(page1);
    faviconLinks = await page1.evaluate(`(() => {
  var iconEls = Array.from(document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]'));
  return iconEls.map(function(l) {
    return {
      rel: l.rel,
      href: l.href,
      sizes: l.getAttribute('sizes'),
      type: l.getAttribute('type'),
    };
  });
})()`);
    await page1.close();
  };
  await runHtmlExtraction();
  return {
    animationCatalog,
    capturedShaders,
    catalogedAssets,
    detectedLibraries,
    visibleTextContent,
    faviconLinks,
    tokens,
    extracted,
    screenshots
  };
}

// src/capture/postExtractionPhase.ts
import { existsSync as existsSync4 } from "fs";
import { join as join9 } from "path";

// src/capture/fontMetadataExtractor.ts
import { readdirSync as readdirSync3, readFileSync as readFileSync4, existsSync as existsSync3 } from "fs";
import { join as join8 } from "path";
import * as fontkit from "fontkit";
function isFontCollection(value) {
  return value.type === "TTC" || value.type === "DFont";
}
function extractFontMetadata(fontsDir, outputPath) {
  const files = [];
  const unidentified = [];
  if (existsSync3(fontsDir)) {
    const fontFiles = readdirSync3(fontsDir).filter((f) => /\.(woff2?|ttf|otf)$/i.test(f));
    for (const filename of fontFiles) {
      const fullPath = join8(fontsDir, filename);
      const meta = readSingleFont(fullPath, filename);
      if (meta.identified) {
        files.push(meta);
      } else {
        files.push(meta);
        unidentified.push(filename);
      }
    }
  }
  const families = aggregateFamilies(files);
  const manifest = {
    files,
    families,
    unidentified,
    meta: {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      // Record just the tool name; the version moves with the dep and would
      // otherwise drift from a hardcoded string on every fontkit bump.
      tool: "fontkit"
    }
  };
  writeCaptureFileSync(outputPath, JSON.stringify(manifest, null, 2), "utf-8");
  return manifest;
}
function readSingleFont(fullPath, filename) {
  const empty = {
    file: filename,
    family: "",
    rawFamily: "",
    subfamily: "",
    postscript: "",
    weight: 0,
    style: "normal",
    variationAxes: [],
    identified: false,
    isIcon: false
  };
  try {
    const buf = readFileSync4(fullPath);
    const created = fontkit.create(buf);
    const font = isFontCollection(created) ? created.fonts[0] : created;
    if (!font) return empty;
    const rawFamily = (font.familyName || "").trim();
    const subfamily = (font.subfamilyName || "").trim();
    const postscript = (font.postscriptName || "").trim();
    const fsSelection = font["OS/2"]?.fsSelection;
    const italicBit = Boolean(fsSelection?.italic || fsSelection?.oblique);
    const style = italicBit || /italic|oblique/i.test(subfamily) ? "italic" : "normal";
    const variationAxes = font.variationAxes ? Object.keys(font.variationAxes) : [];
    if (!rawFamily && !postscript) return empty;
    const familyForCanonicalization = rawFamily || deriveFamilyFromPostscript(postscript);
    const { canonical, inferredWeight } = canonicalizeFamily(familyForCanonicalization);
    const weight = font["OS/2"]?.usWeightClass ?? inferredWeight ?? inferWeightFromSubfamily(subfamily);
    return {
      file: filename,
      family: canonical || familyForCanonicalization,
      rawFamily: familyForCanonicalization,
      subfamily,
      postscript,
      weight,
      style,
      variationAxes,
      identified: true,
      isIcon: detectIconFont(font)
    };
  } catch {
    return empty;
  }
}
function detectIconFont(font) {
  const f = font;
  try {
    return isIconCharacterSet(Array.isArray(f.characterSet) ? f.characterSet : []);
  } catch {
    return false;
  }
}
function isIconCharacterSet(characterSet) {
  if (!characterSet.length) return false;
  const isLatinLetter = (cp) => cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122;
  if (characterSet.filter(isLatinLetter).length >= 26) return false;
  const inPua = (cp) => cp >= 57344 && cp <= 63743 || cp >= 983040 && cp <= 1114109;
  return characterSet.filter(inPua).length / characterSet.length > 0.5;
}
function aggregateFamilies(files) {
  const byFamily = /* @__PURE__ */ new Map();
  for (const f of files) {
    if (!f.family) continue;
    let entry = byFamily.get(f.family);
    if (!entry) {
      entry = { family: f.family, weights: [], variable: false, fileCount: 0, files: [] };
      byFamily.set(f.family, entry);
    }
    entry.fileCount++;
    entry.files.push(f.file);
    if (f.variationAxes.length > 0) entry.variable = true;
    if (f.weight && !entry.weights.includes(f.weight)) entry.weights.push(f.weight);
  }
  for (const entry of byFamily.values()) {
    entry.weights.sort((a, b) => a - b);
    entry.files.sort();
  }
  return Array.from(byFamily.values()).sort((a, b) => a.family.localeCompare(b.family));
}
function deriveFamilyFromPostscript(postscript) {
  if (!postscript) return "";
  const dashIdx = postscript.indexOf("-");
  return (dashIdx > 0 ? postscript.slice(0, dashIdx) : postscript).trim();
}
function inferWeightFromSubfamily(subfamily) {
  const s = subfamily.toLowerCase().replace(/[\s-]+/g, "");
  if (s.includes("thin")) return 100;
  if (s.includes("extralight") || s.includes("ultralight")) return 200;
  if (s.includes("light")) return 300;
  if (s.includes("medium")) return 500;
  if (s.includes("semibold") || s.includes("demibold")) return 600;
  if (s.includes("extrabold") || s.includes("ultrabold")) return 800;
  if (s.includes("black") || s.includes("heavy")) return 900;
  if (s.includes("bold")) return 700;
  return 400;
}
var WEIGHT_TOKEN_TO_VALUE = {
  Thin: 100,
  Hairline: 100,
  ExtraLight: 200,
  UltraLight: 200,
  Light: 300,
  Book: 400,
  Regular: 400,
  Normal: 400,
  Medium: 500,
  SemiBold: 600,
  DemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  UltraBold: 800,
  Black: 900,
  Heavy: 900,
  ExtraBlack: 950,
  UltraBlack: 950
};
var WEIGHT_TOKEN_RE = new RegExp(`\\s+(${Object.keys(WEIGHT_TOKEN_TO_VALUE).join("|")})$`, "i");
function canonicalizeFamily(family) {
  if (!family) return { canonical: family, inferredWeight: null };
  let result = family.trim();
  result = result.replace(/\s+(Italic|Oblique)$/i, "").trim();
  result = result.replace(
    /\s+(Semi|Extra|Ultra|Demi)\s+(Bold|Black|Light)$/i,
    (_, prefix, suffix) => ` ${capitalize(prefix)}${capitalize(suffix)}`
  );
  const match = result.match(WEIGHT_TOKEN_RE);
  if (match && match[1]) {
    const matchedKey = Object.keys(WEIGHT_TOKEN_TO_VALUE).find(
      (k) => k.toLowerCase() === match[1].toLowerCase()
    );
    const inferredWeight = matchedKey ? WEIGHT_TOKEN_TO_VALUE[matchedKey] : null;
    result = result.slice(0, result.length - match[0].length).trim();
    return { canonical: result, inferredWeight };
  }
  return { canonical: result, inferredWeight: null };
}
function capitalize(s) {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1).toLowerCase();
}

// src/capture/postExtractionPhase.ts
function hasVisionCredentials(skipVision) {
  return Boolean(
    !skipVision && (process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.HYPERFRAMES_VERTEX_PROJECT_ID && process.env.HYPERFRAMES_VERTEX_SERVICE_ACCOUNT)
  );
}
function writeAssetDescriptionsFile(outputDir, lines, header) {
  writeCaptureFileSync(
    join9(outputDir, "extracted", "asset-descriptions.md"),
    header + lines.map((line) => `- ${line}`).join("\n") + "\n",
    "utf-8"
  );
}
async function runPostExtraction(input) {
  let {
    state,
    outputDir,
    warnings,
    progress,
    remainingMs,
    phase,
    animationCatalog,
    catalogedAssets,
    visibleTextContent,
    faviconLinks,
    tokens,
    extracted,
    skipAssets,
    skipVision,
    downloadByteBudget,
    assets,
    dropped,
    fontDrops,
    canWrite
  } = input;
  const runFontExtraction = async () => {
    if (!canWrite()) return;
    phase("fonts", "started");
    const fontPass = await downloadAndRewriteFonts(extracted.headHtml, outputDir, {
      remainingMs,
      byteBudget: downloadByteBudget
    });
    fontDrops = fontPass.drops;
    extracted.headHtml = fontPass.css;
    phase(
      "fonts",
      remainingMs() > 0 ? "completed" : "degraded",
      remainingMs() > 0 ? void 0 : "budget-exhausted"
    );
    try {
      const fontsManifest = extractFontMetadata(
        join9(outputDir, "assets", "fonts"),
        join9(outputDir, "extracted", "fonts-manifest.json")
      );
      if (fontsManifest.families.length > 0) {
        const summary = fontsManifest.families.map((f) => `${f.family}${f.variable ? " (variable)" : ""} \xD7 ${f.fileCount}`).join(", ");
        diag.notice(`Font metadata extracted: ${summary}`);
        if (fontsManifest.unidentified.length > 0) {
          diag.warn(
            `  ${fontsManifest.unidentified.length} font file(s) could not be identified \u2014 DESIGN.md should flag these explicitly.`
          );
        }
      }
    } catch (err) {
      diag.warn("Font metadata extraction failed (non-fatal):", normalizeErrorMessage(err));
    }
  };
  await runFontExtraction();
  const runAnimationCatalog = async () => {
    if (animationCatalog) {
      const uniqueAnimNames = /* @__PURE__ */ new Set();
      for (const d of animationCatalog.cssDeclarations || []) {
        if (d.animation?.name) uniqueAnimNames.add(d.animation.name);
      }
      const representativeAnims = (animationCatalog.webAnimations || []).filter((a) => a.keyframes && a.keyframes.length > 0).slice(0, 10);
      const leanCatalog = {
        summary: animationCatalog.summary,
        namedAnimations: Array.from(uniqueAnimNames),
        scrollTriggeredElements: (animationCatalog.scrollTargets || []).length,
        representativeAnimations: representativeAnims
      };
      if (canWrite()) {
        writeCaptureFileSync(
          join9(outputDir, "extracted", "animations.json"),
          JSON.stringify(leanCatalog, null, 2),
          "utf-8"
        );
      }
    }
  };
  await runAnimationCatalog();
  const runAssetDownload = async () => {
    let assetDrops = noDrops();
    const runAssetFetch = async () => {
      if (!skipAssets && canWrite()) {
        phase("assets", "started");
        progress("assets", "Downloading assets...");
        const assetPass = await downloadAssets(tokens, outputDir, catalogedAssets, faviconLinks, {
          remainingMs,
          byteBudget: downloadByteBudget
        });
        assets = assetPass.assets;
        assetDrops = assetPass.drops;
        state.assets = assets;
        if (canWrite()) {
          writeCaptureFileSync(
            join9(outputDir, "extracted", "icons-manifest.json"),
            JSON.stringify(assetPass.icons, null, 2),
            "utf-8"
          );
        }
        phase(
          "assets",
          remainingMs() > 0 ? "completed" : "degraded",
          remainingMs() > 0 ? void 0 : "budget-exhausted"
        );
      } else {
        phase("assets", "degraded", "disabled");
      }
    };
    await runAssetFetch();
    const recordAssetDrops = () => {
      dropped = mergeDrops(fontDrops, assetDrops);
      state.dropped = dropped;
      const droppedTotal = totalDrops(dropped);
      if (droppedTotal > 0) {
        const breakdown = Object.entries(dropped).filter(([, n]) => typeof n === "number" && n > 0).map(([reason, n]) => `${n} ${reason}`).join(", ");
        warnings.push(
          `${droppedTotal} referenced asset(s) are not in this capture (${breakdown}). A thin capture with no drops is a thin page; this one was truncated.`
        );
      }
    };
    recordAssetDrops();
    const rewriteTokenAssets = () => {
      const base = (u) => u.split(/[#?]/)[0] ?? u;
      const localByUrl = /* @__PURE__ */ new Map();
      const collectLocalAssetPaths = () => {
        for (const a of assets) {
          if (!a.url || !a.localPath) continue;
          localByUrl.set(a.url, a.localPath);
          localByUrl.set(base(a.url), a.localPath);
        }
      };
      collectLocalAssetPaths();
      const applyLocalAssetPaths = () => {
        for (const sec of tokens.sections || []) {
          const local = [];
          for (const u of sec.assetUrls || []) {
            const hit = localByUrl.get(u) || localByUrl.get(base(u));
            if (hit && !local.includes(hit)) local.push(hit);
          }
          if (local.length) sec.assets = local;
        }
      };
      applyLocalAssetPaths();
      if (assets.length && Array.isArray(tokens.sections)) {
        if (canWrite()) {
          writeCaptureFileSync(
            join9(outputDir, "extracted", "tokens.json"),
            serializeTokensForCapture(tokens),
            "utf-8"
          );
        }
      }
    };
    await rewriteTokenAssets();
  };
  await runAssetDownload();
  try {
    const pageHtml = `<!doctype html>
<html ${extracted.htmlAttrs || ""}>
<head>
${extracted.headHtml}
</head>
<body>
${extracted.bodyHtml}
</body>
</html>
`;
    state.pageHtml = pageHtml;
    if (canWrite())
      writeCaptureFileSync(join9(outputDir, "extracted", "page.html"), pageHtml, "utf-8");
  } catch (err) {
    warnings.push(`page.html write failed: ${err}`);
  }
  if (visibleTextContent) {
    if (canWrite()) {
      writeCaptureFileSync(
        join9(outputDir, "extracted", "visible-text.txt"),
        visibleTextContent,
        "utf-8"
      );
    }
  }
  let geminiCaptions = {};
  const runVision = async () => {
    if (skipVision) {
      phase("vision", "degraded", "disabled");
    } else if (remainingMs() <= 0 || !canWrite()) {
      warnings.push(
        "Capture budget exhausted before vision captioning; catalog descriptions were preserved."
      );
      phase("vision", "degraded", "budget-exhausted");
    } else {
      phase("vision", "started");
      let visionOutcome = {
        timedOutRequests: 0,
        failedRequests: 0,
        budgetExhausted: false
      };
      geminiCaptions = await captionImagesWithGemini(outputDir, progress, warnings, {
        remainingMs,
        onOutcome: (outcome) => {
          visionOutcome = outcome;
        }
      });
      const completion = resolveVisionPhaseCompletion(visionOutcome, remainingMs());
      phase(
        "vision",
        completion.status,
        completion.status === "degraded" ? completion.reason : void 0
      );
    }
  };
  await runVision();
  const runAssetDescriptions = () => {
    progress("design", "Generating asset descriptions...");
    try {
      const lines = generateAssetDescriptions(outputDir, tokens, catalogedAssets, geminiCaptions);
      if (lines.length === 0 || !canWrite()) return;
      const hasVisionKey = hasVisionCredentials(skipVision);
      const header = hasVisionKey ? "# Asset Descriptions\n\nOne line per file. Read this instead of opening every image individually.\n\nTo find a specific brand or icon, **grep this file for the brand name in the description text** (e.g. `grep -i 'autodesk' asset-descriptions.md`). The Gemini Vision captions identify what's actually in each file \u2014 that's the agent's selector.\n\nThe `logo-<hash>.svg` filename prefix is a cheap structural hint (DOM said this SVG was inside a `<header>`, home-link `<a>`, or had an aria-label matching the page brand). It is NOT a content claim \u2014 many `logo-*` files are nav icons or decorative shapes. Trust the captions, not the filename prefix.\n\n" : "# Asset Descriptions\n\n\u26A0\uFE0F  No vision credentials \u2014 descriptions below are catalog-derived (alt text, headings, section context, filename) instead of Vision-generated. To get richer Vision descriptions on the next capture, set GEMINI_API_KEY (or GOOGLE_API_KEY), or HYPERFRAMES_VERTEX_PROJECT_ID plus HYPERFRAMES_VERTEX_SERVICE_ACCOUNT for Vertex service-account auth, and re-run.\n\nThe `logo-<hash>.svg` filename prefix is a structural hint (DOM said this SVG was inside a `<header>`, home-link `<a>`, or had an aria-label matching the page brand). To pick the actual brand logo without Vision, open the `logo-*` candidates in a previewer or rasterize them with `sharp` before referencing \u2014 composing a fake logo ships off-brand in the final video.\n\n";
      writeAssetDescriptionsFile(outputDir, lines, header);
      progress(
        "design",
        `${lines.length} asset descriptions written${hasVisionKey ? "" : " (no vision provider \u2014 catalog-fallback mode)"}`
      );
    } catch {
    }
  };
  runAssetDescriptions();
  progress("design", "DESIGN.md will be created by your AI agent");
  const runContactSheets = async () => {
    if (remainingMs() > 0 && canWrite()) {
      phase("contact-sheets", "started");
      try {
        const { createScrollContactSheet, createAssetContactSheet, createSvgContactSheet } = await import("./contactSheet-27SRU7A4.js");
        const contactSheetBudget = { remainingMs };
        const runScrollContactSheet = async () => {
          const scrollSheets = await createScrollContactSheet(
            join9(outputDir, "screenshots"),
            join9(outputDir, "screenshots", "contact-sheet.jpg"),
            contactSheetBudget
          );
          if (scrollSheets.length > 0)
            progress(
              "design",
              `Screenshot contact sheet generated (${scrollSheets.length} page${scrollSheets.length > 1 ? "s" : ""})`
            );
        };
        await runScrollContactSheet();
        const runAssetContactSheet = async () => {
          const assetsImgDir = join9(outputDir, "assets");
          if (existsSync4(assetsImgDir)) {
            const assetSheets = await createAssetContactSheet(
              assetsImgDir,
              join9(outputDir, "assets", "contact-sheet.jpg"),
              contactSheetBudget
            );
            if (assetSheets.length > 0)
              progress(
                "design",
                `Asset contact sheet generated (${assetSheets.length} page${assetSheets.length > 1 ? "s" : ""})`
              );
          }
        };
        await runAssetContactSheet();
        const runSvgContactSheet = async () => {
          const svgsDir = join9(outputDir, "assets", "svgs");
          const assetsRootDir = join9(outputDir, "assets");
          const hasSvgsDir = existsSync4(svgsDir);
          if (hasSvgsDir) ensureCaptureDirSync(outputDir, svgsDir);
          const svgOutputPath = hasSvgsDir ? join9(outputDir, "assets", "svgs", "contact-sheet.jpg") : join9(outputDir, "assets", "contact-sheet-svgs.jpg");
          const svgSheets = await createSvgContactSheet(
            svgsDir,
            svgOutputPath,
            assetsRootDir,
            contactSheetBudget
          );
          if (svgSheets.length > 0)
            progress(
              "design",
              `SVG contact sheet generated (${svgSheets.length} page${svgSheets.length > 1 ? "s" : ""})`
            );
        };
        await runSvgContactSheet();
      } catch (err) {
        if (err instanceof CaptureDirRefusedError)
          warnings.push(`SVG contact sheet skipped: ${err.message}`);
      }
      phase(
        "contact-sheets",
        remainingMs() > 0 ? "completed" : "degraded",
        remainingMs() > 0 ? void 0 : "budget-exhausted"
      );
    } else {
      warnings.push(
        "Capture budget exhausted before contact sheets; source images were preserved."
      );
      phase("contact-sheets", "degraded", "budget-exhausted");
    }
  };
  await runContactSheets();
  return { assets, dropped, fontDrops, extracted, tokens, animationCatalog };
}

// src/capture/captureAttempt.ts
var DEFAULT_POST_NAVIGATION_BUDGET_MS = 12e4;
async function captureWebsiteAttempt(opts, onProgress, disableWebgl, watchdog, state) {
  const {
    url,
    outputDir,
    viewportWidth = 1920,
    viewportHeight = 1080,
    timeout = 12e4,
    settleTime = 3e3,
    maxScreenshots: _maxScreenshots = 24,
    skipAssets = false,
    skipVision = false,
    postNavigationBudgetMs = DEFAULT_POST_NAVIGATION_BUDGET_MS,
    onPhase
  } = opts;
  const downloadByteBudget = createCaptureDownloadBudget();
  const warnings = [...state.warnings];
  state.warnings = warnings;
  const progress = (stage, detail) => {
    onProgress?.(stage, detail);
  };
  const budgetMs = Number.isFinite(postNavigationBudgetMs) && postNavigationBudgetMs > 0 ? postNavigationBudgetMs : DEFAULT_POST_NAVIGATION_BUDGET_MS;
  let postNavigationDeadline;
  const remainingMs = () => postNavigationDeadline === void 0 ? budgetMs : Math.max(0, postNavigationDeadline - Date.now());
  const canWrite = () => !watchdog.expired();
  let lastPhase = {
    schema: CAPTURE_PHASE_SCHEMA,
    phase: "browser",
    status: "started",
    remainingMs: null
  };
  const phase = (name, status, reason) => {
    if (watchdog.expired()) return;
    const remaining = postNavigationDeadline === void 0 ? null : remainingMs();
    lastPhase = reason ? {
      schema: CAPTURE_PHASE_SCHEMA,
      phase: name,
      status,
      remainingMs: remaining,
      reason
    } : { schema: CAPTURE_PHASE_SCHEMA, phase: name, status, remainingMs: remaining };
    onPhase?.(lastPhase);
  };
  phase("browser", "started");
  loadEnvFile(outputDir);
  ensureCaptureDirSync(outputDir, join10(outputDir, "extracted"));
  ensureCaptureDirSync(outputDir, join10(outputDir, "screenshots"));
  ensureCaptureDirSync(outputDir, join10(outputDir, "assets"));
  progress("browser", "Launching headless Chrome...");
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  const browser = await ensureBrowser();
  const puppeteer = await import("puppeteer-core");
  const chromeBrowser = await launchManagedBrowser(puppeteer.default, {
    headless: true,
    executablePath: browser.executablePath,
    protocolTimeout: captureProtocolTimeoutMs(timeout, budgetMs),
    args: captureBrowserArgs(disableWebgl, viewportWidth, viewportHeight)
  });
  watchdog.registerBrowser(chromeBrowser);
  let animationCatalog;
  let tokens = state.tokens;
  let extracted = state.extracted;
  let screenshots = [];
  let catalogedAssets = [];
  let capturedShaders;
  let visibleTextContent = "";
  let faviconLinks = [];
  let detectedLibraries = [];
  let assets = [];
  let dropped = noDrops();
  let fontDrops = noDrops();
  let httpStatus = null;
  let pageContentCheck = {
    textLength: 0,
    title: "",
    hasChallengeElement: false,
    bodyChildCount: Number.POSITIVE_INFINITY
  };
  let contentCheckTimedOut = false;
  try {
    phase("browser", "completed");
    phase("navigation", "started");
    progress("animations", "Cataloging animations (full JS)...");
    const page1 = await chromeBrowser.newPage();
    await page1.setViewport({ width: viewportWidth, height: viewportHeight });
    await page1.setUserAgent(CAPTURE_USER_AGENT);
    await setupAnimationCapture(page1);
    const { cdp, animations: cdpAnims } = await startCdpAnimationCapture(page1);
    await page1.evaluateOnNewDocument(`
      var origGetContext = HTMLCanvasElement.prototype.getContext;
      window.__capturedShaders = [];
      HTMLCanvasElement.prototype.getContext = function(type, attrs) {
        var ctx = origGetContext.call(this, type, attrs);
        if (ctx && (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl')) {
          window.__hfWebglSeen = true;
          if (ctx.shaderSource && !ctx.__hfHooked) {
            var origShaderSource = ctx.shaderSource.bind(ctx);
            ctx.shaderSource = function(shader, source) {
              try {
                var shaderType = ctx.getShaderParameter(shader, ctx.SHADER_TYPE);
                window.__capturedShaders.push({
                  type: shaderType === ctx.VERTEX_SHADER ? 'vertex' : 'fragment',
                  source: source.slice(0, 5000)
                });
              } catch(e) {}
              return origShaderSource(shader, source);
            };
            ctx.__hfHooked = true;
          }
        }
        return ctx;
      };
    `);
    const discoveredLotties = [];
    const lottieDiscovery = new LottieDiscovery();
    const discoveredVideoUrls = /* @__PURE__ */ new Set();
    page1.on("response", (response) => {
      try {
        const responseUrl = response.url();
        if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(responseUrl)) {
          discoveredVideoUrls.add(responseUrl);
        }
        lottieDiscovery.collect(response);
      } catch {
      }
    });
    const navigationResult = await runNavigationChecks({
      page1,
      url,
      timeout,
      settleTime,
      budgetMs,
      warnings,
      progress,
      remainingMs,
      pageContentCheck,
      contentCheckTimedOut,
      postNavigationDeadline,
      outputDir,
      phase,
      httpStatus,
      canWrite
    });
    ({ pageContentCheck, contentCheckTimedOut, httpStatus, postNavigationDeadline } = navigationResult);
    const coreResult = await runCoreExtraction({
      page1,
      chromeBrowser,
      cdp,
      cdpAnims,
      state,
      outputDir,
      warnings,
      progress,
      remainingMs,
      pageContentCheck,
      contentCheckTimedOut,
      discoveredLotties,
      lottieDiscovery,
      discoveredVideoUrls,
      animationCatalog,
      capturedShaders,
      catalogedAssets,
      detectedLibraries,
      visibleTextContent,
      faviconLinks,
      tokens,
      extracted,
      screenshots,
      downloadByteBudget,
      canWrite
    });
    ({
      animationCatalog,
      capturedShaders,
      catalogedAssets,
      detectedLibraries,
      visibleTextContent,
      faviconLinks,
      tokens,
      extracted,
      screenshots
    } = coreResult);
    phase("core-extraction", "completed");
    const postResult = await runPostExtraction({
      state,
      outputDir,
      warnings,
      progress,
      remainingMs,
      phase,
      animationCatalog,
      catalogedAssets,
      visibleTextContent,
      faviconLinks,
      tokens,
      extracted,
      skipAssets,
      skipVision,
      downloadByteBudget,
      assets,
      dropped,
      fontDrops,
      canWrite
    });
    ({ assets, dropped, fontDrops, extracted, tokens, animationCatalog } = postResult);
    phase("scaffold", "started");
    if (!watchdog.expired()) {
      await generateProjectScaffold(
        outputDir,
        url,
        tokens,
        animationCatalog,
        screenshots.length > 0,
        discoveredLotties.length > 0,
        existsSync5(join10(outputDir, "extracted", "shaders.json")),
        catalogedAssets,
        progress,
        warnings,
        detectedLibraries
      );
    }
    phase("scaffold", "completed");
    progress("done", "Capture complete");
    phase("complete", "completed");
    return {
      ok: true,
      projectDir: outputDir,
      url,
      httpStatus,
      title: tokens.title,
      extracted,
      screenshots,
      tokens,
      assets,
      dropped,
      animationCatalog,
      warnings,
      lastPhase
    };
  } finally {
    watchdog.unregisterBrowser(chromeBrowser);
    await chromeBrowser.close();
  }
}

// src/capture/index.ts
async function captureWebsite(opts, onProgress) {
  const watchdog = createCaptureWatchdog(opts.captureDeadlineMs);
  const state = createPartialCaptureState(opts);
  const attempt = captureWebsiteAttempt(opts, onProgress, false, watchdog, state);
  try {
    const first = await runWithWatchdog(attempt, watchdog.promise);
    if (first.kind === "deadline") return deadlineResult(opts, state);
    if (first.kind === "error") throw first.error;
    return first.result;
  } catch (err) {
    if (!(err instanceof NavigationDeadlineError) || watchdog.expired() || !err.webglObserved) {
      throw err;
    }
    onProgress?.("warn", "Navigation timed out; retrying once with WebGL disabled");
    state.warnings.push("Navigation timed out; retrying once with WebGL disabled");
    opts.onPhase?.({
      schema: CAPTURE_PHASE_SCHEMA,
      phase: "navigation",
      status: "degraded",
      remainingMs: null,
      reason: "webgl-disabled-retry"
    });
    const retry = captureWebsiteAttempt(opts, onProgress, true, watchdog, state);
    const second = await runWithWatchdog(retry, watchdog.promise);
    if (second.kind === "deadline") return deadlineResult(opts, state);
    if (second.kind === "error") throw second.error;
    return {
      ...second.result,
      warnings: [.../* @__PURE__ */ new Set([...state.warnings, ...second.result.warnings])]
    };
  } finally {
    watchdog.dispose();
  }
}
function deadlineResult(opts, state) {
  const lastPhase = {
    schema: CAPTURE_PHASE_SCHEMA,
    phase: "complete",
    status: "degraded",
    remainingMs: null,
    reason: "deadline"
  };
  opts.onPhase?.(lastPhase);
  return writePartialCaptureBundle(opts, state, lastPhase);
}
export {
  captureWebsite
};
