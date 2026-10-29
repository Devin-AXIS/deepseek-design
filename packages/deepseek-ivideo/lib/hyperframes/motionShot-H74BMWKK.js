import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  buildOnionSvg,
  buildRenderedStripSvg,
  ghostAlphas,
  parseAngle,
  resolveShotSelectors,
  sampleTimes,
  stripCaptureTimeCandidates
} from "./chunk-KZI44OPA.js";
import {
  resolveCompositionViewportFromHtml,
  waitForRuntimeReady
} from "./chunk-RYA6RITK.js";
import {
  launchManagedBrowser,
  resolveManagedGpuMode
} from "./chunk-KXH7PX6M.js";
import {
  resolveDiagnosticNavigationTimeoutMs
} from "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFCFR3KZ.js";
import "./chunk-IHFUKJOR.js";
import {
  resolveLocalBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import "./chunk-PBN6GBJE.js";
import {
  assertWebGpuAdapterAvailable,
  compositionRequiresWebGpu
} from "./chunk-3NHZZLH3.js";
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
import "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/motionShot.ts
import { mkdirSync, statSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
function pathsReferToSameFile(firstPath, secondPath) {
  const first = resolve(firstPath);
  const second = resolve(secondPath);
  if (first === second) return true;
  try {
    const firstStat = statSync(first);
    const secondStat = statSync(second);
    return firstStat.dev === secondStat.dev && firstStat.ino === secondStat.ino;
  } catch {
    return false;
  }
}
function ensureShotOutputDir(outPath, sourcePath) {
  if (sourcePath && pathsReferToSameFile(outPath, sourcePath)) {
    throw new Error(
      `--shot output must not overwrite the composition source: ${sourcePath}. Choose a separate .png path.`
    );
  }
  mkdirSync(dirname(outPath), { recursive: true });
}
async function sampleMarkerOnionElements(selectors, ts) {
  const seek = window.__hfSeekAllAdapters;
  const rigs = selectors.map((selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const svg = el;
    if (typeof svg.getBBox === "function" && typeof svg.getScreenCTM === "function") {
      return { el, svg, markers: null };
    }
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const local = [
      [0, 0],
      [w, 0],
      [w, h],
      [0, h],
      [w / 2, h / 2]
    ];
    const markers = local.map(([lx, ly]) => {
      const marker = document.createElement("div");
      marker.style.cssText = `position:absolute;left:${lx}px;top:${ly}px;width:0;height:0;pointer-events:none`;
      el.appendChild(marker);
      return marker;
    });
    return { el, svg: null, markers };
  });
  const out = selectors.map((selector) => ({ selector, samples: [] }));
  for (const t of ts) {
    await seek?.(t);
    rigs.forEach((rig, index) => {
      if (!rig) return;
      let points;
      if (rig.svg) {
        const box = rig.svg.getBBox?.();
        const matrix = rig.svg.getScreenCTM?.();
        if (!box || !matrix) return;
        const local = [
          { x: box.x, y: box.y },
          { x: box.x + box.width, y: box.y },
          { x: box.x + box.width, y: box.y + box.height },
          { x: box.x, y: box.y + box.height },
          { x: box.x + box.width / 2, y: box.y + box.height / 2 }
        ];
        points = local.map((point) => ({
          x: matrix.a * point.x + matrix.c * point.y + matrix.e,
          y: matrix.b * point.x + matrix.d * point.y + matrix.f
        }));
      } else {
        points = rig.markers.map((marker) => {
          const rect = marker.getBoundingClientRect();
          return { x: rect.left, y: rect.top };
        });
      }
      const style = getComputedStyle(rig.el);
      out[index].samples.push({
        t: Math.round(t * 1e3) / 1e3,
        q: points.slice(0, 4),
        c: points[4],
        color: style.backgroundColor,
        opacity: parseFloat(style.opacity) || 0
      });
    });
  }
  rigs.forEach((rig) => {
    if (rig) rig.el.style.visibility = "hidden";
  });
  return out.filter((element) => element.samples.length > 0);
}
function applyOrbitCamera(selectors, cam) {
  const first = document.querySelector(selectors[0] ?? "");
  const root = first?.closest("[data-composition-id]") ?? document.querySelector("#stage") ?? document.body.firstElementChild ?? document.body;
  for (const sel of selectors) {
    let n = document.querySelector(sel);
    while (n && n !== root) {
      n.style.transformStyle = "preserve-3d";
      n.style.perspective = "none";
      n = n.parentElement;
    }
  }
  root.style.transformStyle = "preserve-3d";
  root.style.perspective = "none";
  root.style.transformOrigin = "50% 50%";
  root.style.transform = `rotateX(${cam.pitch}deg) rotateY(${cam.yaw}deg)`;
  const lens = root.parentElement ?? document.body;
  lens.style.perspective = "1600px";
  lens.style.perspectiveOrigin = "50% 50%";
}
function compositeGhostFrames(frames, alphas, W, H, label) {
  return new Promise((resolve2) => {
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d");
    if (!ctx) {
      resolve2("");
      return;
    }
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    let i = 0;
    const step = () => {
      if (i >= frames.length) {
        ctx.globalAlpha = 1;
        ctx.font = "600 22px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = "#86c2ff";
        ctx.fillText(label, 24, 38);
        resolve2(cv.toDataURL("image/png"));
        return;
      }
      const img = new Image();
      img.onload = () => {
        ctx.globalAlpha = alphas[i] ?? 1;
        ctx.drawImage(img, 0, 0, W, H);
        i += 1;
        step();
      };
      img.onerror = () => {
        i += 1;
        step();
      };
      img.src = frames[i] ?? "";
    };
    step();
  });
}
async function seekAllAdaptersInBrowser(tt) {
  const tryCall = (fn) => {
    try {
      fn();
      return true;
    } catch {
      return false;
    }
  };
  const w = window;
  const timeMs = Math.max(0, tt * 1e3);
  let runtimeSeeked = false;
  const pendingGpuWork = [];
  if (typeof w.__player?.renderSeek === "function") {
    runtimeSeeked = tryCall(() => w.__player?.renderSeek?.(tt));
  } else if (typeof w.__player?.seek === "function") {
    runtimeSeeked = tryCall(() => w.__player?.seek?.(tt));
  } else if (typeof w.__hfReseekGpu === "function") {
    runtimeSeeked = tryCall(() => w.__hfReseekGpu?.(tt));
  }
  Object.values(w.__timelines ?? {}).forEach((tl) => {
    tryCall(() => {
      tl.pause?.();
      if (typeof tl.totalTime === "function") {
        tl.totalTime(tt + 1e-3, true);
        tl.totalTime(tt, false);
      } else {
        tl.seek?.(tt);
      }
    });
  });
  tryCall(() => {
    if (typeof document.getAnimations === "function") {
      for (const animation of document.getAnimations()) {
        tryCall(() => {
          animation.currentTime = timeMs;
        });
        tryCall(() => animation.pause());
      }
    }
  });
  for (const instance of w.__hfAnime ?? []) {
    tryCall(() => {
      instance.pause?.();
      instance.seek?.(timeMs);
    });
  }
  w.__hfThreeTime = tt;
  if (!runtimeSeeked) {
    let acceptingGpuWork = true;
    try {
      window.dispatchEvent(
        new CustomEvent("hf-seek", {
          detail: {
            time: tt,
            waitUntil(promise) {
              if (!acceptingGpuWork) {
                throw new Error("hf-seek waitUntil() must be called synchronously");
              }
              pendingGpuWork.push(promise);
            }
          }
        })
      );
    } finally {
      acceptingGpuWork = false;
    }
  }
  tryCall(() => w.__hfThreeRender?.());
  tryCall(() => w.gsap?.ticker?.tick?.());
  await Promise.all([Promise.all(pendingGpuWork), w.__hfWaitForSeekCompletion?.()]);
}
async function installSeekHelper(page) {
  await page.evaluate(`window.__hfSeekAllAdapters = ${seekAllAdaptersInBrowser.toString()};`);
}
async function openCompositionPage(html, url, executablePath) {
  const puppeteer = await import("puppeteer-core");
  const { buildChromeArgs } = await import("./src-2CXRYIST.js");
  const size = resolveCompositionViewportFromHtml(html);
  const requestedGpuMode = resolveLocalBrowserGpuMode();
  const resolvedGpuMode = await resolveManagedGpuMode(requestedGpuMode, executablePath);
  const requiresWebGpu = compositionRequiresWebGpu(html);
  const browser = await launchManagedBrowser(puppeteer.default, {
    headless: true,
    executablePath,
    args: buildChromeArgs(
      { ...size, captureMode: "screenshot", requiresWebGpu },
      { browserGpuMode: resolvedGpuMode }
    )
  });
  const page = await browser.newPage();
  const navigationTimeout = resolveDiagnosticNavigationTimeoutMs();
  await page.setViewport(size);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: navigationTimeout });
  await assertWebGpuAdapterAvailable(page, requiresWebGpu);
  await waitForRuntimeReady(page, 1e4);
  await page.evaluate(async () => {
    const d = document;
    if (d.fonts?.ready) await d.fonts.ready;
  }).catch(() => {
  });
  await installSeekHelper(page);
  return { browser, page, size };
}
function timelineDuration(page) {
  return page.evaluate(() => {
    const finiteSeconds = (value) => {
      const n = typeof value === "number" ? value : Number(value);
      return Number.isFinite(n) && n > 0 ? n : 0;
    };
    const finiteMsToSeconds = (value) => {
      const n = typeof value === "number" ? value : Number(value);
      return Number.isFinite(n) && n > 0 ? n / 1e3 : 0;
    };
    const w = window;
    const timelinesDuration = () => {
      let d2 = 0;
      for (const tl of Object.values(w.__timelines ?? {})) {
        try {
          d2 = Math.max(d2, tl.totalDuration?.() ?? tl.duration?.() ?? 0);
        } catch {
        }
      }
      return d2;
    };
    const animationDurationSeconds = (animation) => {
      const timing = animation.effect?.getTiming?.();
      if (!timing) return 0;
      const durationMs = Number(timing.duration);
      const iterations = Number(timing.iterations ?? 1);
      if (!Number.isFinite(durationMs) || !Number.isFinite(iterations)) return 0;
      const delayMs = Number(timing.delay ?? 0);
      const endDelayMs = Number(timing.endDelay ?? 0);
      return finiteMsToSeconds(Math.max(0, delayMs) + durationMs * iterations + endDelayMs);
    };
    const waapiDuration = () => {
      if (typeof document.getAnimations !== "function") return 0;
      let d2 = 0;
      try {
        for (const animation of document.getAnimations()) {
          d2 = Math.max(d2, animationDurationSeconds(animation));
        }
      } catch {
      }
      return d2;
    };
    const animeDuration = () => {
      let d2 = 0;
      for (const instance of w.__hfAnime ?? []) {
        d2 = Math.max(d2, finiteMsToSeconds(instance.totalDuration ?? instance.duration));
      }
      return d2;
    };
    let d = finiteSeconds(w.__player?.getDuration?.());
    const root = document.querySelector("[data-composition-id][data-duration]");
    if (root) d = Math.max(d, finiteSeconds(root.getAttribute("data-duration")));
    return Math.max(d, timelinesDuration(), waapiDuration(), animeDuration());
  });
}
async function resolveScopeInBrowser(page, scope, candidates) {
  const probe = await page.evaluate(
    (scopeSel, cands) => {
      let root = null;
      try {
        root = document.querySelector(scopeSel);
      } catch {
        root = null;
      }
      const descendant = cands.map((sel) => {
        if (!root) return false;
        let el = null;
        try {
          el = document.querySelector(sel);
        } catch {
          return false;
        }
        return !!el && (el === root || root.contains(el));
      });
      return { scopeExists: !!root, descendant };
    },
    scope,
    candidates
  );
  const selectors = resolveShotSelectors(
    scope,
    candidates,
    (_s, target) => probe.descendant[candidates.indexOf(target)] === true
  );
  return { selectors, scopeExists: probe.scopeExists };
}
async function resolveScopedRequests(page, requests, scopeSelector) {
  const resolved = await resolveScopeInBrowser(
    page,
    scopeSelector,
    requests.map((r) => r.selector)
  );
  if (!resolved.scopeExists) {
    throw new Error(`--shot: --selector '${scopeSelector}' matched no element.`);
  }
  if (resolved.selectors.length === 0) {
    const nearest = requests.slice(0, 5).map((r) => r.selector).join(", ");
    throw new Error(
      `--shot: nothing animates under '${scopeSelector}'. Nearest animated elements: ${nearest || "(none)"}.`
    );
  }
  return resolved.selectors.map((selector) => ({ selector }));
}
function captureGhostFrame(page, t) {
  return page.evaluate(async (tt) => {
    await window.__hfSeekAllAdapters?.(tt);
    const root = document.querySelector("[data-composition-id]") ?? document.body;
    const rb = root.getBoundingClientRect();
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.round(rb.width));
    off.height = Math.max(1, Math.round(rb.height));
    const octx = off.getContext("2d");
    for (const cv of Array.from(document.querySelectorAll("canvas"))) {
      const r = cv.getBoundingClientRect();
      try {
        octx?.drawImage(cv, r.left - rb.left, r.top - rb.top, r.width, r.height);
      } catch {
      }
    }
    return off.toDataURL("image/png");
  }, t);
}
async function applyOrbitCameraIfAngled(page, requests, camera) {
  if (camera.yaw === 0 && camera.pitch === 0) return;
  await page.evaluate(
    applyOrbitCamera,
    requests.map((r) => r.selector),
    camera
  );
}
function cameraLabel(camera) {
  return camera.yaw === 0 && camera.pitch === 0 ? "front" : `yaw ${camera.yaw}\xB0 pitch ${camera.pitch}\xB0`;
}
async function captureGhostOnionSkin(page, requests, times, size, camera, outPath) {
  await applyOrbitCameraIfAngled(page, requests, camera);
  const hasCanvas = await page.evaluate(() => document.querySelectorAll("canvas").length > 0);
  if (!hasCanvas) {
    throw new Error(
      "--ghost renders a canvas/WebGL motion trail, but this composition has no <canvas>. Use the default --shot onion for DOM/SVG transform motion."
    );
  }
  const frames = [];
  for (const t of times) {
    frames.push(await captureGhostFrame(page, t));
  }
  const label = `${cameraLabel(camera)}  \xB7  rendered onion  \xB7  ${times.length} frames  \xB7  t ${times[0]}\u2013${times[times.length - 1]}s`;
  const dataUrl = await page.evaluate(
    compositeGhostFrames,
    frames,
    ghostAlphas(frames.length),
    size.width,
    size.height,
    label
  );
  const b64 = String(dataUrl).replace(/^data:image\/png;base64,/, "");
  if (!b64) throw new Error("ghost composite returned no data");
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  return outPath;
}
async function captureRenderedSvgStrip(page, selector, times, size, camera, hasWindow, outPath) {
  await applyOrbitCameraIfAngled(page, [{ selector }], camera);
  const frames = [];
  for (const t of times) {
    let clip = null;
    for (const captureTime of stripCaptureTimeCandidates(t)) {
      await page.evaluate(
        async (time) => await window.__hfSeekAllAdapters?.(time),
        captureTime
      );
      clip = await page.evaluate((value) => {
        const element = document.querySelector(value);
        const rect = element?.getBoundingClientRect();
        if (!rect || rect.width <= 0 || rect.height <= 0) return null;
        const padding = 8;
        const x = Math.max(0, Math.floor(rect.left - padding));
        const y = Math.max(0, Math.floor(rect.top - padding));
        const right = Math.min(window.innerWidth, Math.ceil(rect.right + padding));
        const bottom = Math.min(window.innerHeight, Math.ceil(rect.bottom + padding));
        return { x, y, width: Math.max(1, right - x), height: Math.max(1, bottom - y) };
      }, selector);
      if (clip) break;
    }
    if (!clip) throw new Error(`--shot: '${selector}' has no visible SVG bounds at ${t}s.`);
    const shot = await page.screenshot({ type: "png", clip });
    const png = Buffer.isBuffer(shot) ? shot : Buffer.from(shot);
    frames.push({
      t,
      dataUrl: `data:image/png;base64,${png.toString("base64")}`,
      width: clip.width,
      height: clip.height
    });
  }
  const windowStr = hasWindow ? `  \xB7  t ${times[0]}\u2013${times[times.length - 1]}s` : "";
  const markup = buildRenderedStripSvg(frames, {
    width: size.width,
    height: size.height,
    label: `${cameraLabel(camera)}  \xB7  filmstrip  \xB7  ${times.length} frames${windowStr}`
  });
  await page.evaluate((svg) => document.body.insertAdjacentHTML("beforeend", svg), markup);
  await new Promise((resolveWait) => setTimeout(resolveWait, 60));
  const output = await page.screenshot({ type: "png" });
  if (!output) throw new Error("screenshot returned no data");
  writeFileSync(outPath, output);
  return outPath;
}
async function captureMarkerOnionSkin(page, requests, times, size, camera, frame, outPath) {
  await applyOrbitCameraIfAngled(page, requests, camera);
  const elements = await page.evaluate(
    sampleMarkerOnionElements,
    requests.map((r) => r.selector),
    times
  );
  const windowStr = frame.hasWindow ? `  \xB7  t ${times[0]}\u2013${times[times.length - 1]}s` : "";
  const label = `${cameraLabel(camera)}  \xB7  ${frame.layout === "strip" ? "filmstrip" : frame.fit ? "zoom-fit" : "1:1"}  \xB7  ${times.length} frames${windowStr}`;
  const svg = buildOnionSvg(elements, {
    layout: frame.layout,
    fit: frame.fit,
    width: size.width,
    height: size.height,
    label
  });
  await page.evaluate((markup) => {
    document.body.insertAdjacentHTML("beforeend", markup);
  }, svg);
  await new Promise((r) => setTimeout(r, 60));
  const buf = await page.screenshot({ type: "png" });
  if (!buf) throw new Error("screenshot returned no data");
  writeFileSync(outPath, buf);
  return outPath;
}
async function captureMotionPathShot(projectDir, requestsIn, outPath, opts = {}) {
  ensureShotOutputDir(outPath, resolve(projectDir, opts.entryFile ?? "index.html"));
  let requests = requestsIn;
  const samples = Math.max(1, Math.min(60, opts.samples ?? 9));
  const layout = opts.layout ?? "path";
  const fit = opts.fit ?? true;
  const camera = parseAngle(opts.angle);
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  const { serveStaticProjectHtml } = await import("./staticProjectServer-4EOUQSBD.js");
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  const html = await bundleToSingleHtml(projectDir, { entryFile: opts.entryFile });
  const server = await serveStaticProjectHtml(
    projectDir,
    html,
    "Failed to bind motion shot server"
  );
  let browserInstance;
  try {
    const browser = await ensureBrowser();
    const opened = await openCompositionPage(html, server.url, browser.executablePath);
    browserInstance = opened.browser;
    const { page, size } = opened;
    if (opts.scopeSelector && !opts.ghost) {
      requests = await resolveScopedRequests(page, requests, opts.scopeSelector);
    }
    const times = sampleTimes(
      await timelineDuration(page),
      samples,
      opts.from ?? null,
      opts.to ?? null
    );
    if (opts.ghost) {
      return await captureGhostOnionSkin(page, requests, times, size, camera, outPath);
    }
    const stripSelector = layout === "strip" ? requests[0]?.selector : void 0;
    const stripTargetsSvg = stripSelector ? await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return typeof element?.getBBox === "function" && typeof element.getScreenCTM === "function";
    }, stripSelector) : false;
    if (stripSelector && stripTargetsSvg) {
      return await captureRenderedSvgStrip(
        page,
        stripSelector,
        times,
        size,
        camera,
        opts.from != null || opts.to != null,
        outPath
      );
    }
    return await captureMarkerOnionSkin(
      page,
      requests,
      times,
      size,
      camera,
      { layout, fit, hasWindow: opts.from != null || opts.to != null },
      outPath
    );
  } finally {
    await browserInstance?.close().catch(() => {
    });
    await server.close().catch(() => {
    });
  }
}
export {
  captureMotionPathShot,
  ensureShotOutputDir,
  sampleMarkerOnionElements,
  seekAllAdaptersInBrowser
};
