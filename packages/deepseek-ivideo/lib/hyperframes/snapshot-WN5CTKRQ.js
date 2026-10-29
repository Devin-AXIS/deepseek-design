import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parseAngle
} from "./chunk-KZI44OPA.js";
import {
  serveStaticProjectHtml
} from "./chunk-UQR6E2MI.js";
import {
  DEFAULT_ZOOM_SCALE,
  captureRegionCrop,
  openSettledCompositionPage,
  parseZoomTarget,
  resolveCropRegion,
  runFfmpegOnce,
  seekCompositionTimeline
} from "./chunk-RYA6RITK.js";
import "./chunk-KXH7PX6M.js";
import "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFF75FSN.js";
import "./chunk-PFCFR3KZ.js";
import {
  formatLintFindings
} from "./chunk-6CSYCFQV.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  loadOptionalPackage
} from "./chunk-3DKN5WKL.js";
import "./chunk-XUHOIDKG.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6BEFEWFB.js";
import "./chunk-6LTRBXKR.js";
import {
  resolveLocalBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import {
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
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
import {
  isClipVisibleAt,
  isInClipWindow,
  readElementRateSpec,
  sourceTimeAt,
  timeAtSourceTime
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import {
  definitiveEntryMismatchComposition,
  hasDefinitiveEntryMismatch
} from "./chunk-Q5X2B5WT.js";
import {
  runCancellableProcess
} from "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import {
  lintProject
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/snapshot.ts
import { existsSync, mkdtempSync, readFileSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { resolve, join, relative, isAbsolute, basename, posix } from "path";
function orbitStageSource() {
  return `function(cam) {
    var root = document.querySelector("[data-composition-id]")
      || document.querySelector("#stage")
      || document.body.firstElementChild
      || document.body;
    var n = root;
    while (n && n !== document.body) {
      n.style.transformStyle = "preserve-3d";
      n.style.perspective = "none";
      n = n.parentElement;
    }
    root.style.transformStyle = "preserve-3d";
    root.style.perspective = "none";
    root.style.transformOrigin = "50% 50%";
    root.style.transform = "rotateX(" + cam.pitch + "deg) rotateY(" + cam.yaw + "deg)";
    var lens = root.parentElement || document.body;
    lens.style.perspective = "1600px";
    lens.style.perspectiveOrigin = "50% 50%";
  }`;
}
var FFMPEG_EXTRACT_TIMEOUT_MS = 3e4;
function formatSnapshotTimestamp(time) {
  return `${Number(time.toFixed(3))}s`;
}
function resolveSnapshotVideoFrameTime(input) {
  const { globalTime, clipStart, clipDuration, sourceDuration, compositionDuration } = input;
  const clipEnd = clipStart + clipDuration;
  if (!isClipVisibleAt(globalTime, clipStart, clipEnd, compositionDuration)) return null;
  const relativeTime = globalTime < clipStart ? Math.max(0, input.relativeTime) : input.relativeTime;
  if (relativeTime < 0) return null;
  const pastSource = sourceDuration > 0 && relativeTime >= sourceDuration;
  if (isInClipWindow(globalTime, clipStart, clipEnd) && !pastSource) return relativeTime;
  const sourceEnd = sourceDuration > 0 ? sourceDuration : relativeTime;
  return Math.max(0, Math.min(relativeTime, sourceEnd - 1 / 30));
}
function resolveSnapshotVideoClipStart(input) {
  return input.runtimeResolvedStart ?? input.authoredStart;
}
function resolveSnapshotVideoRateSpec(input) {
  const authoredRate = Number.parseFloat(input.authoredRate ?? "");
  const attrs = {
    "data-playback-rate": Number.isFinite(authoredRate) && authoredRate > 0 ? input.authoredRate : String(input.defaultRate),
    "data-automation": input.authoredAutomation
  };
  return readElementRateSpec({ getAttribute: (name) => attrs[name] ?? null });
}
function requireSnapshotFfmpeg(ffmpegPath) {
  if (ffmpegPath) return ffmpegPath;
  throw new Error(
    `FFmpeg is required to extract video frames for snapshots. ${getFFmpegInstallHint()}`
  );
}
async function recaptureSnapshotComposite(page) {
  const hasPageComposite = await page.evaluate(async () => {
    const runtimeWindow = window;
    if (typeof runtimeWindow.__hf_page_composite_resolve !== "function") return false;
    await runtimeWindow.__hf_page_composite_prepare?.();
    return true;
  });
  if (hasPageComposite) {
    await page.screenshot({
      type: "jpeg",
      quality: 1,
      clip: { x: 0, y: 0, width: 1, height: 1 }
    });
    await page.evaluate(() => {
      const runtimeWindow = window;
      runtimeWindow.__hf_page_composite_resolve?.();
    });
  }
}
function containingSourceFrameIndex(timestamps, time) {
  if (!Number.isFinite(time)) return -1;
  const tolerance = 16 * Number.EPSILON * Math.max(1, Math.abs(time));
  let index = -1;
  for (const [i, timestamp] of timestamps.entries()) {
    if (timestamp > time + tolerance) break;
    index = i;
  }
  return index;
}
async function probeContainingSourceFrameSeek(videoPath, time, holdLastFrame) {
  const ffprobe = findFFprobe();
  if (!ffprobe) return { seek: time };
  const probe = async (readIntervals, entries) => {
    try {
      const { stdout } = await runCancellableProcess(
        ffprobe,
        [
          ...["-v", "error", "-select_streams", "v:0", "-read_intervals", readIntervals],
          ...["-show_entries", entries, "-of", "json", "--", videoPath]
        ],
        { timeoutMs: FFMPEG_EXTRACT_TIMEOUT_MS, maxBufferBytes: 32 * 1024 * 1024 }
      );
      const parsed = JSON.parse(stdout);
      return typeof parsed === "object" && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  };
  const data = await probe("%+#1", "stream=time_base,start_pts:format=start_time,duration");
  if (data === null || !Array.isArray(data.streams)) return null;
  const stream = data.streams[0];
  if (typeof stream !== "object" || stream === null || !("time_base" in stream) || typeof stream.time_base !== "string")
    return null;
  const [numerator, denominator] = stream.time_base.split("/");
  const timeBase = Number(numerator) / Number(denominator);
  if (!Number.isFinite(timeBase) || timeBase <= 0) return null;
  const format = "format" in data ? data.format : null;
  const start = typeof format === "object" && format !== null && "start_time" in format ? Number(format.start_time) : 0;
  const duration = typeof format === "object" && format !== null && "duration" in format ? Number(format.duration) : NaN;
  if (!holdLastFrame && Number.isFinite(duration) && time >= duration) return null;
  const formatStart = Number.isFinite(start) ? start : 0;
  const startPts = "start_pts" in stream && typeof stream.start_pts === "number" ? stream.start_pts : NaN;
  const startTicks = Math.abs(startPts * timeBase - formatStart) <= 1e-6 ? startPts : formatStart / timeBase;
  const packetData = await probe(`%${startTicks * timeBase + time + 1}`, "packet=pts,dts,flags");
  if (packetData === null || !Array.isArray(packetData.packets)) return null;
  const packets = [];
  for (const packet of packetData.packets) {
    if (typeof packet !== "object" || packet === null) return null;
    const pts = "pts" in packet ? packet.pts : "dts" in packet ? packet.dts : void 0;
    if (typeof pts !== "number") return null;
    const dts = "dts" in packet && typeof packet.dts === "number" ? packet.dts : pts;
    const key = "flags" in packet && typeof packet.flags === "string" && packet.flags.includes("K");
    packets.push({ pts: (pts - startTicks) * timeBase, dts: (dts - startTicks) * timeBase, key });
  }
  const timestamps = packets.map((packet) => packet.pts).sort((a, b) => a - b);
  const index = Math.max(0, containingSourceFrameIndex(timestamps, time));
  if (timestamps.length === 0 || !Number.isFinite(time)) return null;
  const frame = timestamps[index];
  const previous = timestamps[index - 1] ?? frame - 1e-3;
  const mid = (previous + frame) / 2;
  const ffmpeg = findFFmpeg();
  const landing = async (seek) => {
    const raw = ffmpeg ? await probeSeekLanding(ffmpeg, videoPath, seek) : null;
    return raw === null ? null : raw - startTicks * timeBase;
  };
  const candidates = packets.filter(
    (packet) => packet.key && packet.pts > 0 && packet.pts <= frame
  );
  for (const candidate of candidates.reverse().slice(0, 3)) {
    const landed = await landing(candidate.pts);
    if (landed === null) break;
    if (landed <= 0 || landed > frame) continue;
    const again = Math.abs(landed - candidate.pts) < 1e-6 ? landed : await landing(landed);
    if (again !== null && Math.abs(again - landed) < 1e-6)
      return { seek: landed, select: mid - landed };
  }
  return { select: mid - (timestamps.find((t) => t >= 0) ?? frame) };
}
async function probeSeekLanding(ffmpeg, videoPath, seek) {
  try {
    const { stdout } = await runCancellableProcess(
      ffmpeg,
      [
        ...["-v", "error", "-copyts", "-noaccurate_seek", "-ss", String(seek), "-i", videoPath],
        ...["-map", "0:v:0", "-c", "copy", "-frames:v", "1", "-f", "framecrc", "-"]
      ],
      { timeoutMs: FFMPEG_EXTRACT_TIMEOUT_MS, maxBufferBytes: 1024 * 1024 }
    );
    const base = /^#tb 0: (\d+)\/(\d+)/m.exec(stdout);
    const row = /^0,\s*-?\d+,\s*(-?\d+),/m.exec(stdout);
    if (!base || !row) return null;
    return Number(row[1]) * Number(base[1]) / Number(base[2]);
  } catch {
    return null;
  }
}
async function extractVideoFrameToBuffer(videoPath, timeSeconds, useVp9AlphaDecoder = false, holdLastFrame = false) {
  const tmp = mkdtempSync(join(tmpdir(), "hf-snapshot-frame-"));
  const outPath = join(tmp, "frame.png");
  try {
    const ffmpegPath = requireSnapshotFfmpeg(findFFmpeg());
    const seek = await probeContainingSourceFrameSeek(
      videoPath,
      Math.max(0, timeSeconds),
      holdLastFrame
    );
    if (seek === null) return null;
    const args = ["-hide_banner", "-loglevel", "error"];
    if (useVp9AlphaDecoder) args.push("-c:v", "libvpx-vp9");
    if (seek.seek !== void 0) args.push("-ss", String(seek.seek));
    args.push("-i", videoPath, "-map", "0:v:0");
    if (seek.select !== void 0) args.push("-vf", `select=gte(t-start_t\\,${seek.select})`);
    args.push("-frames:v", "1", "-q:v", "2", "-y", outPath);
    const result = await runFfmpegOnce(ffmpegPath, args, FFMPEG_EXTRACT_TIMEOUT_MS);
    if (result.code !== 0 || result.timedOut || !existsSync(outPath)) return null;
    return readFileSync(outPath);
  } finally {
    try {
      rmSync(tmp, { recursive: true, force: true });
    } catch {
    }
  }
}
var examples = [
  ["Capture 5 key frames from a composition", "snapshot capture"],
  ["Capture 10 evenly-spaced frames", "snapshot capture --frames 10"],
  ["View the 3D stage from an isometric angle", "snapshot capture --angle iso"],
  ["Zoom into an element for a high-density crop", "snapshot --zoom '#headline'"],
  [
    "Zoom into an exact pixel region at 2x density",
    "snapshot --zoom 100,50,400,300 --zoom-scale 2"
  ],
  [
    "Pair each frame with the reference footage at the same time",
    "snapshot --at 1.5,4.3,8.1 --against ref.mp4"
  ]
];
function parseZoomScale(value) {
  const parsed = parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_ZOOM_SCALE;
}
function tailFrameTime(duration) {
  return Math.max(0, duration - Math.max(0.05, duration * 0.03));
}
function computeSnapshotTimes(duration, opts) {
  const includeEnd = opts.includeEnd !== false;
  const tail = tailFrameTime(duration);
  const round = (t) => Math.round(t * 1e3) / 1e3;
  if (opts.at?.length) {
    const times2 = [...opts.at];
    const hasTail = times2.some((t) => Math.abs(t - tail) < 0.05 || t >= duration);
    if (includeEnd && duration > 0 && !hasTail) {
      return { times: [...times2, round(tail)], appendedTail: true };
    }
    return { times: times2, appendedTail: false };
  }
  const n = opts.frames;
  if (n <= 1) return { times: [round(duration / 2)], appendedTail: false };
  const times = Array.from({ length: n }, (_, i) => i / (n - 1) * duration);
  if (includeEnd) times[times.length - 1] = tail;
  return { times: times.map(round), appendedTail: false };
}
async function captureSnapshots(projectDir, opts) {
  const { bundleWithLocalizedFonts } = await import("./bundleWithLocalizedFonts-3FDGGP5N.js");
  const numFrames = opts.frames ?? 5;
  const html = await bundleWithLocalizedFonts(projectDir);
  const server = await serveStaticProjectHtml(projectDir, html, void 0, [], opts.autoProxy);
  const savedPaths = [];
  try {
    const { browser: chromeBrowser, page } = await openSettledCompositionPage(html, server.url, {
      renderReadyTimeoutMs: opts.timeout ?? 5e3,
      renderReadyWarningSuffix: "snapshots may be inaccurate",
      browserGpuMode: opts.browserGpuMode
    });
    try {
      const fontReport = await page.evaluate(() => {
        const loaded = [];
        const errored = [];
        const unused = [];
        document.fonts.forEach((f) => {
          const entry = `${f.family} (${f.weight} ${f.style})`;
          if (f.status === "loaded") loaded.push(entry);
          else if (f.status === "error") errored.push(entry);
          else unused.push(entry);
        });
        return { loaded, errored, unused };
      }).catch(() => ({ loaded: [], errored: [], unused: [] }));
      if (fontReport.loaded.length > 0 || fontReport.errored.length > 0 || fontReport.unused.length > 0) {
        const parts = [`${fontReport.loaded.length} loaded`];
        if (fontReport.errored.length > 0) parts.push(`${fontReport.errored.length} failed`);
        if (fontReport.unused.length > 0) parts.push(`${fontReport.unused.length} unused`);
        console.log(`
   ${c.dim("Fonts:")} ${parts.join(", ")}`);
        if (fontReport.errored.length > 0) {
          console.log(`   ${c.error("Fonts FAILED:")} ${fontReport.errored.join(", ")}`);
        }
      }
      const duration = await page.evaluate(() => {
        const win = window;
        if (typeof win.__player?.getDuration === "function") {
          const d = win.__player.getDuration();
          if (Number.isFinite(d) && d > 0) return d;
        }
        const root = document.querySelector("[data-composition-id][data-duration]");
        if (root) return parseFloat(root.getAttribute("data-duration") ?? "0");
        return 0;
      });
      if (duration <= 0 && !opts.at?.length) {
        return [];
      }
      const { times: positions, appendedTail } = computeSnapshotTimes(duration, {
        frames: numFrames,
        at: opts.at,
        includeEnd: opts.includeEnd
      });
      if (appendedTail) {
        console.log(
          `   ${c.dim(`Note: added an end-of-timeline frame at ${positions[positions.length - 1].toFixed(2)}s. Short beats between your --at times may still be skipped \u2014 pass them explicitly.`)}`
        );
      }
      const cameraExpr = opts.angle && (opts.angle.yaw !== 0 || opts.angle.pitch !== 0) ? `(${orbitStageSource()})(${JSON.stringify(opts.angle)})` : null;
      const snapshotDir = opts.outputDir ?? join(projectDir, "snapshots");
      mkdirSync(snapshotDir, { recursive: true });
      try {
        const { readdirSync } = await import("fs");
        for (const file of readdirSync(snapshotDir)) {
          if (/\.(png|jpg|jpeg)$/i.test(file)) {
            rmSync(join(snapshotDir, file), { force: true });
          }
        }
      } catch {
      }
      let injectVideoFramesBatch = null;
      let syncVideoFrameVisibility = null;
      let extractMediaMetadata = null;
      try {
        const engine = await import("./src-2CXRYIST.js");
        injectVideoFramesBatch = engine.injectVideoFramesBatch;
        syncVideoFrameVisibility = engine.syncVideoFrameVisibility;
        extractMediaMetadata = engine.extractMediaMetadata;
      } catch {
        console.warn(
          `   ${c.warn("\u26A0")} @hyperframes/engine unavailable \u2014 <video> elements will appear black in snapshots. Verify media via a draft render's extracted frames instead.`
        );
      }
      const alphaDecoderCache = /* @__PURE__ */ new Map();
      const shouldUseVp9AlphaDecoder = (filePath) => {
        if (!extractMediaMetadata) return Promise.resolve(false);
        const cached = alphaDecoderCache.get(filePath);
        if (cached) return cached;
        const pending = extractMediaMetadata(filePath).then((meta) => meta.hasAlpha && meta.videoCodec === "vp9").catch(() => false);
        alphaDecoderCache.set(filePath, pending);
        return pending;
      };
      const hasPlayer = await page.evaluate(() => !!window.__player);
      if (!hasPlayer) {
        console.warn(`   ${c.warn("\u26A0")} No player API \u2014 seeks will be skipped`);
      }
      for (let i = 0; i < positions.length; i++) {
        const time = positions[i];
        await seekCompositionTimeline(page, time, { exactTime: true });
        if (cameraExpr) await page.evaluate(cameraExpr);
        if (injectVideoFramesBatch && syncVideoFrameVisibility) {
          const candidates = await page.evaluate(() => {
            const runtimeWindow = window;
            return Array.from(document.querySelectorAll("video")).map((el) => {
              const v = el;
              const authoredStart = parseFloat(v.dataset.start ?? "0") || 0;
              const runtimeResolvedStart = runtimeWindow.__hfResolveMediaStartSeconds?.(v);
              const mediaStart = parseFloat(v.dataset.playbackStart ?? v.dataset.mediaStart ?? "0") || 0;
              const rawDuration = parseFloat(v.dataset.duration ?? "");
              const srcDur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 0;
              return {
                id: v.id,
                src: v.currentSrc || v.src,
                authoredStart,
                authoredRate: v.dataset.playbackRate,
                authoredAutomation: v.dataset.automation,
                defaultRate: v.defaultPlaybackRate,
                runtimeResolvedStart: runtimeResolvedStart !== void 0 && Number.isFinite(runtimeResolvedStart) ? runtimeResolvedStart : null,
                authoredDuration: Number.isFinite(rawDuration) && rawDuration > 0 ? rawDuration : null,
                srcDuration: srcDur,
                mediaStart,
                loop: v.loop
              };
            });
          });
          const compositionDuration = duration;
          const active = candidates.flatMap((candidate) => {
            const start = resolveSnapshotVideoClipStart(candidate);
            const playbackRate = resolveSnapshotVideoRateSpec(candidate);
            const duration2 = candidate.authoredDuration ?? (candidate.srcDuration > 0 ? Math.max(
              0,
              timeAtSourceTime(playbackRate, candidate.srcDuration - candidate.mediaStart)
            ) : Number.POSITIVE_INFINITY);
            let relTime = sourceTimeAt(playbackRate, time - start) + candidate.mediaStart;
            if (candidate.loop && candidate.srcDuration > candidate.mediaStart && relTime >= candidate.srcDuration) {
              relTime = candidate.mediaStart + (relTime - candidate.mediaStart) % (candidate.srcDuration - candidate.mediaStart);
            }
            if (!candidate.id || !candidate.src) return [];
            const frameTime = resolveSnapshotVideoFrameTime({
              globalTime: time,
              clipStart: start,
              clipDuration: duration2,
              relativeTime: relTime,
              sourceDuration: candidate.srcDuration,
              compositionDuration
            });
            return frameTime === null ? [] : [{ ...candidate, start, playbackRate, duration: duration2, relTime: frameTime }];
          });
          const updates = [];
          for (const v of active) {
            let ffmpegInput = null;
            let inputIsLocal = false;
            try {
              const url = new URL(v.src);
              const decodedPath = decodeURIComponent(url.pathname).replace(/^\//, "");
              const candidate = resolve(projectDir, decodedPath);
              const rel2 = relative(projectDir, candidate);
              if (!rel2.startsWith("..") && !isAbsolute(rel2) && existsSync(candidate)) {
                ffmpegInput = candidate;
                inputIsLocal = true;
              } else if (url.protocol === "http:" || url.protocol === "https:") {
                ffmpegInput = url.href;
              }
            } catch {
            }
            if (!ffmpegInput) continue;
            const useVp9AlphaDecoder = inputIsLocal ? await shouldUseVp9AlphaDecoder(ffmpegInput) : false;
            const png = await extractVideoFrameToBuffer(
              ffmpegInput,
              Math.max(0, v.relTime),
              useVp9AlphaDecoder,
              v.srcDuration > 0 && v.relTime >= v.srcDuration - 1
            );
            if (!png) continue;
            updates.push({
              videoId: v.id,
              dataUri: `data:image/png;base64,${png.toString("base64")}`
            });
          }
          if (active.length > 0 && updates.length < active.length) {
            const missed = active.length - updates.length;
            console.warn(
              `   ${c.warn("\u26A0")} ${missed}/${active.length} active <video> frame(s) could not be extracted at ${time.toFixed(1)}s \u2014 those videos will appear black/stale in this snapshot`
            );
          }
          try {
            if (updates.length > 0) {
              await injectVideoFramesBatch(page, updates);
            }
            await syncVideoFrameVisibility(
              page,
              active.map((a) => a.id)
            );
          } catch {
            console.warn(
              `   ${c.warn("\u26A0")} video frame injection failed at ${time.toFixed(1)}s \u2014 <video> elements will appear black/stale in this snapshot`
            );
          }
        }
        await recaptureSnapshotComposite(page);
        const timeLabel = formatSnapshotTimestamp(time);
        const index = String(i).padStart(2, "0");
        const filename = `frame-${index}-at-${timeLabel}.png`;
        const framePath = join(snapshotDir, filename);
        if (opts.zoom) {
          const canvas = await page.evaluate(() => ({
            width: window.innerWidth,
            height: window.innerHeight
          }));
          const region = await resolveCropRegion(page, opts.zoom, canvas);
          if (!region) {
            console.error(
              `   ${c.warn("\u26A0")} --zoom target has no visible box at ${time.toFixed(1)}s \u2014 frame skipped`
            );
            continue;
          }
          const buffer = await captureRegionCrop(
            page,
            region,
            opts.zoomScale ?? DEFAULT_ZOOM_SCALE
          );
          writeFileSync(framePath, buffer);
        } else {
          await page.screenshot({ path: framePath, type: "png", omitBackground: true });
        }
        if (opts.against) {
          const refPng = await extractVideoFrameToBuffer(opts.against, time);
          if (!refPng) {
            console.error(
              `   ${c.warn("\u26A0")} --against has no frame at ${timeLabel} \u2014 reference pair skipped`
            );
          } else {
            const refPath = join(snapshotDir, `ref-${index}-at-${timeLabel}.png`);
            writeFileSync(refPath, refPng);
            const pairPath = join(snapshotDir, `pair-${index}-at-${timeLabel}.jpg`);
            const { createContactSheet } = await import("./contactSheet-27SRU7A4.js");
            await createContactSheet([framePath, refPath], pairPath, {
              cols: 2,
              maxImages: 2,
              cellWidth: 960,
              labelMode: "custom",
              labels: ["render", "reference"]
            });
          }
        }
        const rel = relative(projectDir, framePath);
        savedPaths.push(rel.startsWith("..") || isAbsolute(rel) ? framePath : rel);
      }
    } finally {
      await chromeBrowser.close();
    }
  } finally {
    await server.close();
  }
  return savedPaths;
}
var snapshot_default = defineCommand({
  meta: {
    name: "snapshot",
    description: "Capture key frames from a composition as PNG screenshots for visual verification"
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory",
      required: false
    },
    output: {
      type: "string",
      alias: "o",
      description: "Directory to write snapshots into (default: <project>/snapshots)"
    },
    frames: {
      type: "string",
      description: "Number of evenly-spaced frames to capture (default: 5)",
      default: "5"
    },
    at: {
      type: "string",
      description: "Comma-separated timestamps in seconds (e.g., --at 3.0,10.5,18.0). Each is captured at that exact instant, not snapped to a frame."
    },
    timeout: {
      type: "string",
      description: "Ms to wait for runtime to initialize (default: 5000)",
      default: "5000"
    },
    angle: {
      type: "string",
      description: "Orthogonal 3D camera for depth/occlusion checks: a preset (front|iso|top|side) or 'yaw,pitch' degrees. Tilts the whole stage before screenshotting (real pixels, not bbox markers)."
    },
    end: {
      type: "boolean",
      description: "Always include a readable end-of-timeline frame (default: true). Pass --no-end to capture only your exact --at times.",
      default: true
    },
    zoom: {
      type: "string",
      description: "Zoom into a CSS selector or an exact pixel region 'x,y,w,h'. Crops a high-density screenshot instead of the full frame \u2014 a raised deviceScaleFactor, never CSS zoom or viewport resizing, so layout stays identical. A selector matching nothing is an error, not a silent full-frame shot."
    },
    "zoom-scale": {
      type: "string",
      description: "Device-scale-factor density for --zoom crops (default: 3)",
      default: "3"
    },
    against: {
      type: "string",
      description: "Reference video (e.g. footage being rebuilt): also save its frame at each captured time and a render|reference pair sheet"
    },
    describe: {
      type: "string",
      description: "Gemini vision frame analysis. Runs by default when GEMINI_API_KEY is set. Pass a custom question (e.g. --describe 'Is the logo visible in every beat?') to override the default prompt, or --describe false to opt out."
    },
    proxy: {
      type: "boolean",
      description: "Auto-transcode browser-hostile video codecs for snapshots (default: on; overrides hyperframes.json media.autoProxy)",
      default: void 0
    },
    "browser-gpu": {
      type: "boolean",
      description: "Use hardware browser GPU capture; pass --no-browser-gpu for deterministic SwiftShader (default: auto-detect, PRODUCER_BROWSER_GPU_MODE overrides)",
      default: void 0
    }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const lintResult = await lintProject(project.dir);
    if (hasDefinitiveEntryMismatch(lintResult)) {
      const candidate = definitiveEntryMismatchComposition(lintResult);
      console.log("");
      for (const line of formatLintFindings(lintResult, { errorsFirst: true })) {
        console.log(line);
      }
      console.log("");
      console.log(c.error("  Aborting snapshot because the default index.html entry is blank."));
      if (candidate && posix.basename(candidate) === "index.html") {
        const candidateDir = posix.dirname(candidate);
        const target = `<project>/${candidateDir}`;
        console.log(
          c.dim(
            `  Move or mount the authored file, or snapshot its directory directly: hyperframes snapshot ${target}. Only use the directory form when its assets are self-contained under that directory; otherwise mount it from the project root.`
          )
        );
      } else if (candidate) {
        console.log(
          c.dim(
            `  Move or mount ${candidate} as a project index.html before snapshotting; snapshot accepts project directories, not individual HTML files.`
          )
        );
      }
      console.log("");
      failCommand();
    }
    const frames = parseInt(args.frames, 10) || 5;
    const timeout = parseInt(args.timeout, 10) || 5e3;
    const atTimestamps = args.at ? String(args.at).split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n)) : void 0;
    const describeArg = args.describe === void 0 ? "true" : String(args.describe) === "false" ? null : String(args.describe);
    const camera = args.angle ? parseAngle(String(args.angle)) : void 0;
    const zoomTarget = args.zoom ? parseZoomTarget(String(args.zoom)) : void 0;
    const zoomScale = parseZoomScale(args["zoom-scale"]);
    const against = args.against ? resolve(String(args.against)) : void 0;
    if (against && !existsSync(against)) {
      console.log(`${c.error("\u2717")} --against video not found: ${against}`);
      failCommand();
    }
    const label = atTimestamps ? `${atTimestamps.length} frames at [${atTimestamps.map(formatSnapshotTimestamp).join(", ")}]` : `${frames} frames`;
    const angleLabel = camera && (camera.yaw !== 0 || camera.pitch !== 0) ? ` ${c.dim(`(angle yaw ${camera.yaw}\xB0 pitch ${camera.pitch}\xB0)`)}` : "";
    console.log(`${c.accent("\u25C6")}  Capturing ${label} from ${c.accent(project.name)}${angleLabel}`);
    try {
      const snapshotDir = args.output ? resolve(String(args.output)) : join(project.dir, "snapshots");
      const paths = await captureSnapshots(project.dir, {
        frames,
        timeout,
        at: atTimestamps,
        outputDir: snapshotDir,
        angle: camera,
        includeEnd: args.end !== false,
        zoom: zoomTarget,
        zoomScale,
        autoProxy: args.proxy,
        browserGpuMode: resolveLocalBrowserGpuMode(args["browser-gpu"]),
        against
      });
      if (paths.length === 0) {
        console.log(
          `
${c.error("\u2717")} Could not determine composition duration \u2014 no frames captured`
        );
        failCommand();
      }
      console.log(
        `
${c.success("\u25C7")}  ${paths.length} snapshots saved to ${args.output ? snapshotDir : "snapshots/"}`
      );
      for (const p of paths) {
        console.log(`   ${p}`);
      }
      if (against) {
        console.log(
          `   ${c.dim("ref-*.png + pair-*.jpg")} beside each frame (reference frame, render | reference sheet)`
        );
      }
      try {
        const { createSnapshotContactSheet } = await import("./contactSheet-27SRU7A4.js");
        const sheets = await createSnapshotContactSheet(
          snapshotDir,
          join(snapshotDir, "contact-sheet.jpg")
        );
        if (sheets.length > 0) {
          const label2 = sheets.length === 1 ? "contact-sheet.jpg" : `contact-sheet-1..${sheets.length}.jpg`;
          console.log(`   ${c.dim(label2)} (grid view for AI review)`);
        }
      } catch {
      }
      if (describeArg !== null) {
        try {
          const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
          if (!geminiKey) {
            console.log(`   ${c.dim("--describe: GEMINI_API_KEY not set, skipping")}`);
          } else if (paths.length > 0) {
            console.log(`   ${c.dim("Describing frames with Gemini vision...")}`);
            const { GoogleGenAI } = await loadOptionalPackage("@google/genai", "--describe");
            const ai = new GoogleGenAI({ apiKey: geminiKey });
            const model = process.env.HYPERFRAMES_GEMINI_MODEL || "gemini-3.1-flash-lite-preview";
            const customQuestion = describeArg === "true" ? "Describe this video composition frame in 1-2 sentences. Be specific and factual: what elements are visible, what text appears, is the frame blank/black/loading, what is the composition. Flag any obvious problems." : describeArg;
            const descriptions = [
              `# Snapshot Frame Descriptions`,
              ``,
              `**Question asked:** ${customQuestion}`,
              ``,
              `Compare each description against your storyboard spec. A "black frame" or "loading screen" for a content beat is a bug.`,
              ``
            ];
            let sharpFn = null;
            try {
              const s = await import("sharp");
              sharpFn = s.default ?? s;
            } catch {
            }
            const results = await Promise.allSettled(
              paths.map(async (p) => {
                const filename = basename(p);
                const filePath = join(snapshotDir, filename);
                if (!existsSync(filePath)) return { filename, desc: "file not found" };
                const raw = readFileSync(filePath);
                let imageData;
                let mimeType = "image/png";
                if (sharpFn) {
                  imageData = await sharpFn(raw).resize(960).jpeg().toBuffer();
                  mimeType = "image/jpeg";
                } else {
                  if (raw.length > 38e5)
                    return {
                      filename,
                      desc: "file too large for Gemini \u2014 install sharp to enable auto-resize"
                    };
                  imageData = raw;
                }
                const base64 = imageData.toString("base64");
                const response = await ai.models.generateContent({
                  model,
                  contents: [
                    {
                      role: "user",
                      parts: [{ inlineData: { mimeType, data: base64 } }, { text: customQuestion }]
                    }
                  ],
                  config: { maxOutputTokens: 250 }
                });
                return { filename, desc: response.text?.trim() || "no description" };
              })
            );
            for (const result of results) {
              if (result.status === "fulfilled") {
                descriptions.push(`## ${result.value.filename}`, `${result.value.desc}`, ``);
              } else {
                const errMsg = normalizeErrorMessage(result.reason);
                descriptions.push(`## (error)`, `Gemini call failed: ${errMsg.slice(0, 120)}`, ``);
              }
            }
            const descPath = join(snapshotDir, "descriptions.md");
            writeFileSync(descPath, descriptions.join("\n"));
            console.log(`   ${c.dim("descriptions.md")} (Gemini frame analysis)`);
          }
        } catch (descErr) {
          const msg = normalizeErrorMessage(descErr);
          console.log(`   ${c.dim(`--describe failed: ${msg}`)}`);
        }
      }
    } catch (err) {
      const msg = normalizeErrorMessage(err);
      console.error(`
${c.error("\u2717")} Snapshot failed: ${msg}`);
      failCommand();
    }
  }
});
export {
  computeSnapshotTimes,
  containingSourceFrameIndex,
  snapshot_default as default,
  examples,
  extractVideoFrameToBuffer,
  formatSnapshotTimestamp,
  parseZoomScale,
  recaptureSnapshotComposite,
  requireSnapshotFfmpeg,
  resolveSnapshotVideoClipStart,
  resolveSnapshotVideoFrameTime,
  resolveSnapshotVideoRateSpec,
  tailFrameTime
};
