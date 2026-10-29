import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  gateRegistryItemsCompatibility
} from "./chunk-DQNOPYAG.js";
import {
  installItem
} from "./chunk-HSSSGRT3.js";
import {
  writeNewFileSync
} from "./chunk-4YYJOFKS.js";
import {
  initialModelForLanguage
} from "./chunk-NSB6GTMH.js";
import "./chunk-6IHWCZ3W.js";
import {
  DEFAULT_MODEL,
  hasFFmpeg
} from "./chunk-PXSM4HPB.js";
import "./chunk-WCJGTLPF.js";
import "./chunk-QPIYSFE4.js";
import {
  trackInitTemplate
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  Ee,
  R,
  Re,
  Se,
  ft,
  ge,
  me,
  q,
  ue
} from "./chunk-WMQNIQDJ.js";
import {
  listRegistryItems,
  loadAllItems,
  resolveItemWithDependencies
} from "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import {
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand,
  runCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand,
  finishCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import {
  CANVAS_DIMENSIONS,
  HTML_BODY_CSS_HEIGHT_FIRST_RE,
  HTML_BODY_CSS_WIDTH_FIRST_RE,
  VIEWPORT_META_SIZE_RE,
  normalizeResolutionFlag
} from "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LAOCA3MQ.js";
import "./chunk-LCSMOLGX.js";
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
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-UOFAE5RF.js";
import "./chunk-3GXQPCJC.js";
import {
  c,
  isColorSupported
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/initMedia.ts
var VIDEO_SRC = "__VIDEO_SRC__";
var AUDIO_SRC = "__AUDIO_SRC__";
var DURATION = "__VIDEO_DURATION__";
function toSrcValue(filename) {
  return encodeURI(filename).replace(/#/g, "%23").replace(/\?/g, "%3F");
}
function openTag(tag, placeholder) {
  return `<${tag}\\b[^>]*src="${placeholder}"[^>]*>`;
}
function stripPlaceholder(html, tag, placeholder) {
  const open = openTag(tag, placeholder);
  return html.replace(new RegExp(`${open}[\\s\\S]*?</${tag}>`, "g"), "").replace(new RegExp(open, "g"), "");
}
function setVideoAudio(html, hasAudio) {
  return html.replace(new RegExp(openTag("video", VIDEO_SRC), "g"), (tag) => {
    const cleaned = tag.replace(
      /\s+([^\s=>"']+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>"']+))?/g,
      (attr2, name) => name === "muted" || name === "data-has-audio" ? "" : attr2
    );
    const attr = hasAudio ? ' data-has-audio="true"' : " muted";
    return cleaned.replace(/\s*>$/, `${attr}>`);
  });
}
function patchMediaPlaceholders(html, opts) {
  const legacyAudioSlot = new RegExp(openTag("audio", VIDEO_SRC)).test(html);
  let out = html;
  if (opts.video) {
    out = stripPlaceholder(out, "audio", AUDIO_SRC);
    if (legacyAudioSlot) {
      if (!opts.video.hasAudio) out = stripPlaceholder(out, "audio", VIDEO_SRC);
    } else {
      out = setVideoAudio(out, opts.video.hasAudio);
    }
    const videoSrc = toSrcValue(opts.video.filename);
    out = out.replaceAll(VIDEO_SRC, () => videoSrc);
  } else if (opts.audio) {
    out = stripPlaceholder(out, "video", VIDEO_SRC);
    const audioSrc = toSrcValue(opts.audio.filename);
    out = out.replaceAll(AUDIO_SRC, () => audioSrc);
    out = out.replaceAll(VIDEO_SRC, () => audioSrc);
  } else {
    out = stripPlaceholder(out, "video", VIDEO_SRC);
    out = stripPlaceholder(out, "audio", VIDEO_SRC);
    out = stripPlaceholder(out, "audio", AUDIO_SRC);
  }
  const duration = opts.durationSeconds ? String(Math.round(opts.durationSeconds * 100) / 100) : "10";
  return out.replaceAll(DURATION, duration);
}

// src/commands/init.ts
import {
  existsSync as existsSync2,
  mkdirSync,
  copyFileSync,
  cpSync,
  writeFileSync,
  readFileSync,
  readdirSync
} from "fs";
import { resolve, basename, join as join2, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync, spawn } from "child_process";

// src/ui/banner.ts
var GRADIENT = [
  [255, 255, 255],
  // white
  [116, 225, 185],
  // #74E1B9 teal
  [106, 220, 255]
  // #6ADCFF cyan
];
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}
function gradientColor(t) {
  const segments = GRADIENT.length - 1;
  const scaled = t * segments;
  const i = Math.min(Math.floor(scaled), segments - 1);
  const frac = scaled - i;
  const a = GRADIENT[i];
  const b = GRADIENT[i + 1];
  return [lerp(a[0], b[0], frac), lerp(a[1], b[1], frac), lerp(a[2], b[2], frac)];
}
function rgb(r, g, b, text) {
  return `\x1B[38;2;${r};${g};${b}m${text}\x1B[0m`;
}
var BANNER = [
  "\u2588\u2588\u2557  \u2588\u2588\u2557\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2551  \u2588\u2588\u2551\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D",
  "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557",
  "\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551  \u255A\u2588\u2588\u2554\u255D  \u2588\u2588\u2554\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u255D  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551\u255A\u2588\u2588\u2554\u255D\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2588\u2588\u2551",
  "\u2588\u2588\u2551  \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551     \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551     \u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2551 \u255A\u2550\u255D \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551",
  "\u255A\u2550\u255D  \u255A\u2550\u255D   \u255A\u2550\u255D   \u255A\u2550\u255D     \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D     \u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D  \u255A\u2550\u255D\u255A\u2550\u255D     \u255A\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D"
];
function printBanner() {
  if (!isColorSupported || !process.stdout.isTTY) return;
  const maxWidth = Math.max(...BANNER.map((r) => r.length));
  console.log();
  for (const row of BANNER) {
    let line = "  ";
    for (let col = 0; col < row.length; col++) {
      const ch = row[col];
      if (!ch || ch === " ") {
        line += " ";
        continue;
      }
      const t = maxWidth > 1 ? col / (maxWidth - 1) : 0;
      const [r, g, b] = gradientColor(t);
      line += rgb(r, g, b, ch);
    }
    console.log(line);
  }
  console.log();
}

// src/templates/generators.ts
var BUNDLED_TEMPLATES = [
  {
    id: "blank",
    label: "Blank",
    hint: "Centered Inter stage, paused timeline",
    source: "bundled"
  }
];
async function resolveTemplateList() {
  const bundled = [...BUNDLED_TEMPLATES];
  const bundledIds = new Set(bundled.map((t) => t.id));
  const entries = await listRegistryItems({ type: "hyperframes:example" });
  const items = await loadAllItems(entries);
  const remoteOptions = items.filter((item) => !bundledIds.has(item.name)).map((item) => ({
    id: item.name,
    label: item.title,
    hint: item.description,
    source: "remote"
  }));
  return [...bundled, ...remoteOptions];
}

// src/templates/remote.ts
import { existsSync } from "fs";
import { join } from "path";
async function fetchRemoteTemplate(templateId, destDir) {
  const items = await resolveItemWithDependencies(templateId);
  const warnings = gateRegistryItemsCompatibility(items);
  for (const warning of warnings) {
    process.stderr.write(`hyperframes:registry ${warning}
`);
  }
  for (const item of items) {
    await installItem(item, { destDir });
  }
  if (!existsSync(join(destDir, "index.html"))) {
    throw new Error(
      `Example "${templateId}" installed but missing index.html. The registry item may be malformed.`
    );
  }
}

// src/commands/init.ts
var examples = [
  ["Create a project with the interactive wizard", "hyperframes init my-video"],
  ["Pick a starter example", "hyperframes init my-video --example warm-grain"],
  ["Scaffold a 4K project", "hyperframes init my-video --resolution 4k"],
  ["Scaffold a portrait video", "hyperframes init my-video --resolution portrait"],
  ["Start from an existing video file", "hyperframes init my-video --video clip.mp4"],
  ["Start from an audio file", "hyperframes init my-video --audio track.mp3"],
  ["Scaffold with Tailwind CSS", "hyperframes init my-video --tailwind"],
  ["Non-interactive mode (for CI or AI agents)", "hyperframes init my-video --non-interactive"],
  [
    "Opt out of the GitHub skills check (CI/tests only)",
    "HYPERFRAMES_SKIP_SKILLS=1 hyperframes init my-video --non-interactive"
  ]
];
function resolveScaffoldTemplateId(exampleFlag, hasMediaFile) {
  const example = exampleFlag === "agent" ? "blank" : exampleFlag;
  if (example && example !== "blank") return example;
  if (hasMediaFile) return "from-file";
  return "blank";
}
var WEB_CODECS = /* @__PURE__ */ new Set(["h264", "vp8", "vp9", "av1", "theora"]);
var DEFAULT_META = {
  durationSeconds: 5,
  width: 1920,
  height: 1080,
  fps: 30,
  // ffprobe unavailable: assume sound. A wrong guess fails loudly at RENDER (lint catches it only once #3638 lands); assuming silence would mute real audio.
  hasAudio: true,
  videoCodec: "h264"
};
var TAILWIND_BROWSER_VERSION = "4.2.4";
var TAILWIND_BROWSER_SRC = `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@${TAILWIND_BROWSER_VERSION}/dist/index.global.js`;
var TAILWIND_BROWSER_INTEGRITY = "sha384-v5YF9xS+gLRWdvrQ0u/WRbCkjSIH0NjHIPe8tBL1ZRrmI7PiSH6LLdzs0aAIMCuh";
function resolveVideoDurationSeconds({
  streamDuration,
  frameDuration,
  formatDuration
}) {
  return [streamDuration, frameDuration, formatDuration].find(
    (duration) => Number.isFinite(duration) && duration > 0
  ) ?? DEFAULT_META.durationSeconds;
}
function probeVideo(filePath) {
  try {
    const ffprobePath = findFFprobe();
    if (!ffprobePath) return void 0;
    const raw = execFileSync(
      ffprobePath,
      ["-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", "--", filePath],
      { encoding: "utf-8", timeout: 15e3 }
    );
    const parsed = JSON.parse(raw);
    const streams = parsed.streams ?? [];
    const videoStream = streams.find((s) => s.codec_type === "video");
    if (!videoStream) return void 0;
    const hasAudio = streams.some((s) => s.codec_type === "audio");
    let fps = 30;
    const fpsStr = videoStream.avg_frame_rate ?? videoStream.r_frame_rate;
    if (fpsStr) {
      const parts = fpsStr.split("/");
      const num = parseFloat(parts[0] ?? "");
      const den = parseFloat(parts[1] ?? "1");
      if (den !== 0 && !Number.isNaN(num) && !Number.isNaN(den)) {
        fps = Math.round(num / den * 100) / 100;
      }
    }
    const streamDuration = parseFloat(videoStream.duration ?? "");
    const frameCount = parseInt(videoStream.nb_frames ?? "", 10);
    const frameDuration = Number.isFinite(frameCount) && fps > 0 ? frameCount / fps : NaN;
    const formatDuration = parseFloat(parsed.format?.duration ?? "");
    const durationSeconds = resolveVideoDurationSeconds({
      streamDuration,
      frameDuration,
      formatDuration
    });
    return {
      durationSeconds,
      width: videoStream.width ?? 1920,
      height: videoStream.height ?? 1080,
      fps,
      hasAudio,
      videoCodec: videoStream.codec_name ?? "unknown"
    };
  } catch {
    return void 0;
  }
}
function isWebCompatible(codec) {
  return WEB_CODECS.has(codec.toLowerCase());
}
function transcodeToMp4(inputPath, outputPath) {
  return new Promise((resolvePromise) => {
    const ffmpegPath = findFFmpeg();
    if (!ffmpegPath) {
      resolvePromise(false);
      return;
    }
    const child = spawn(
      ffmpegPath,
      [
        "-i",
        inputPath,
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "18",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-y",
        outputPath
      ],
      { stdio: "pipe", windowsHide: true }
    );
    child.on("close", (code) => resolvePromise(code === 0));
    child.on("error", () => resolvePromise(false));
  });
}
function resolveAssetDir(devSegments, builtSegments) {
  const base = dirname(fileURLToPath(import.meta.url));
  const devPath = resolve(base, ...devSegments);
  const builtPath = resolve(base, ...builtSegments);
  return existsSync2(devPath) ? devPath : builtPath;
}
function getStaticTemplateDir(templateId) {
  const base = dirname(fileURLToPath(import.meta.url));
  const devPath = resolve(base, "..", "templates", templateId);
  if (existsSync2(devPath)) return devPath;
  const registryPath = resolve(base, "..", "..", "..", "..", "registry", "examples", templateId);
  if (existsSync2(registryPath)) return registryPath;
  return resolve(base, "templates", templateId);
}
function getSharedTemplateDir() {
  return resolveAssetDir(["..", "templates", "_shared"], ["templates", "_shared"]);
}
var MAX_FOLDER_NAME = 255;
function nameTooLongMessage(name, platform = process.platform) {
  const inBytes = platform === "linux";
  const unit = inBytes ? "bytes" : "characters";
  for (const folder of name.split(platform === "win32" ? /[\\/]/ : "/")) {
    const length = inBytes ? Buffer.byteLength(folder) : folder.length;
    if (length > MAX_FOLDER_NAME)
      return `That name is ${length} ${unit} long; a folder name can be at most ${MAX_FOLDER_NAME} ${unit}.`;
  }
  return null;
}
function toPackageName(projectName) {
  const normalized = basename(projectName).trim().toLowerCase().replace(/^[._]+/, "").replace(/[^a-z0-9._~-]+/g, "-").replace(/-+/g, "-").replace(/^[-.]+|[-.]+$/g, "");
  return normalized || "hyperframes-project";
}
function getHyperframesPackageSpecifier() {
  return VERSION === "0.0.0-dev" ? "hyperframes" : `hyperframes@${VERSION}`;
}
function hyperframesScript(command) {
  return `npx --yes ${getHyperframesPackageSpecifier()} ${command}`;
}
function buildPackageScripts() {
  return {
    dev: hyperframesScript("preview"),
    check: hyperframesScript("check"),
    render: hyperframesScript("render")
  };
}
function writeDefaultPackageJson(destDir, projectName) {
  const packageJsonPath = resolve(destDir, "package.json");
  if (existsSync2(packageJsonPath)) return;
  writeNewFileSync(
    packageJsonPath,
    `${JSON.stringify(
      {
        name: toPackageName(projectName),
        private: true,
        type: "module",
        scripts: buildPackageScripts()
      },
      null,
      2
    )}
`
  );
}
function listHtmlFiles(dir) {
  const files = [];
  const ignoredDirs = /* @__PURE__ */ new Set([".git", "dist", "node_modules"]);
  function walk(currentDir) {
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const entryPath = join2(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name)) walk(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".html")) {
        files.push(entryPath);
      }
    }
  }
  walk(dir);
  return files;
}
function injectTailwindBrowserScript(html) {
  if (html.includes(TAILWIND_BROWSER_SRC)) return html;
  const script = [
    `<script>`,
    `window.__tailwindReady=new Promise(function(resolve){`,
    `var loaded=document.readyState==="complete";`,
    `var resolved=false;`,
    `var observer;`,
    `function readTailwindCss(){var styles=document.querySelectorAll("style");for(var i=styles.length-1;i>=0;i--){var text=styles[i].textContent||"";if(text.indexOf("tailwindcss v")!==-1)return text;}return "";}`,
    `function finish(){if(resolved||!loaded||!readTailwindCss())return;resolved=true;if(observer)observer.disconnect();resolve(true);}`,
    `observer=new MutationObserver(finish);`,
    `observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});`,
    `if(loaded){finish();}else{window.addEventListener("load",function(){loaded=true;finish();},{once:true});}`,
    `});`,
    `</script>`,
    `<script src="${TAILWIND_BROWSER_SRC}" integrity="${TAILWIND_BROWSER_INTEGRITY}" crossorigin="anonymous"></script>`
  ].join("\n");
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, (closingHead) => `
${script}
${closingHead}`);
  }
  return `${script}
${html}`;
}
function writeTailwindSupport(destDir) {
  for (const file of listHtmlFiles(destDir)) {
    const html = readFileSync(file, "utf-8");
    writeFileSync(file, injectTailwindBrowserScript(html), "utf-8");
  }
}
function patchVideoSrc(dir, media) {
  const htmlFiles = readdirSync(dir, { withFileTypes: true, recursive: true }).filter((e) => e.isFile() && e.name.endsWith(".html")).map((e) => join2(e.parentPath, e.name));
  for (const file of htmlFiles) {
    writeFileSync(file, patchMediaPlaceholders(readFileSync(file, "utf-8"), media), "utf-8");
  }
}
async function patchTranscript(dir, transcriptPath) {
  const { loadTranscript, patchCaptionHtml } = await import("./normalize-IGLHCWTF.js");
  const { words } = loadTranscript(transcriptPath);
  if (words.length === 0) return;
  patchCaptionHtml(dir, words);
}
async function handleVideoFile(videoPath, destDir, interactive) {
  const probed = probeVideo(videoPath);
  let meta = { ...DEFAULT_META };
  let localVideoName = basename(videoPath);
  if (probed) {
    meta = probed;
    if (interactive) {
      R.info(
        `Video: ${meta.width}x${meta.height}, ${meta.durationSeconds.toFixed(1)}s, ${meta.fps}fps${meta.hasAudio ? ", has audio" : ""}`
      );
    }
  } else {
    const msg = `ffprobe not found \u2014 using defaults (1920x1080, 5s, 30fps) and assuming the video has sound (data-has-audio="true"); if it is silent, replace that with muted. Install: ${getFFmpegInstallHint()}`;
    if (interactive) {
      R.warn(msg);
    } else {
      console.log(c.warn(msg));
    }
  }
  if (probed && !isWebCompatible(probed.videoCodec)) {
    if (interactive) {
      R.warn(
        c.warn(`Video codec "${probed.videoCodec}" is not supported by web browsers.`)
      );
    } else {
      console.log(c.warn(`Video codec "${probed.videoCodec}" is not supported by browsers.`));
    }
    if (hasFFmpeg()) {
      let shouldTranscode = !interactive;
      if (interactive) {
        const transcode = await Ee({
          message: "Transcode to H.264 MP4 for browser playback?",
          options: [
            {
              value: "yes",
              label: "Yes, transcode",
              hint: "converts to H.264 MP4"
            },
            {
              value: "no",
              label: "No, keep original",
              hint: "video won't play in browser"
            }
          ]
        });
        if (q(transcode)) {
          me("Setup cancelled.");
          finishCommand(0);
        }
        shouldTranscode = transcode === "yes";
      }
      if (shouldTranscode) {
        const mp4Name = localVideoName.replace(/\.[^.]+$/, ".mp4");
        const mp4Path = resolve(destDir, mp4Name);
        const spin = ft();
        spin.start("Transcoding to H.264 MP4...");
        const ok = await transcodeToMp4(videoPath, mp4Path);
        if (ok) {
          spin.stop(c.success(`Transcoded to ${mp4Name}`));
          localVideoName = mp4Name;
        } else {
          spin.stop(c.warn("Transcode failed \u2014 copying original file"));
          copyFileSync(videoPath, resolve(destDir, localVideoName));
        }
      } else {
        copyFileSync(videoPath, resolve(destDir, localVideoName));
      }
    } else {
      if (interactive) {
        R.warn(c.dim("ffmpeg not installed \u2014 cannot transcode."));
        R.info(c.accent(`Install: ${getFFmpegInstallHint()}`));
      } else {
        console.log(c.warn("ffmpeg not installed \u2014 cannot transcode. Copying original."));
        console.log(c.dim("Install: ") + c.accent(getFFmpegInstallHint()));
      }
      copyFileSync(videoPath, resolve(destDir, localVideoName));
    }
  } else {
    copyFileSync(videoPath, resolve(destDir, localVideoName));
  }
  return { meta, localVideoName };
}
function applyResolutionPreset(destDir, resolution) {
  const { width, height } = CANVAS_DIMENSIONS[resolution];
  for (const file of listHtmlFiles(destDir)) {
    let html = readFileSync(file, "utf-8");
    let changed = false;
    const dataWidthRe = /(data-width=)["'](\d+)["']/g;
    if (dataWidthRe.test(html)) {
      html = html.replace(dataWidthRe, `$1"${width}"`);
      changed = true;
    }
    const dataHeightRe = /(data-height=)["'](\d+)["']/g;
    if (dataHeightRe.test(html)) {
      html = html.replace(dataHeightRe, `$1"${height}"`);
      changed = true;
    }
    const htmlOpenRe = /<html\b([^>]*)>/i;
    const htmlOpen = html.match(htmlOpenRe);
    if (htmlOpen) {
      const attrs = htmlOpen[1] ?? "";
      let next;
      if (/data-resolution=/.test(attrs)) {
        next = attrs.replace(/data-resolution=["'][^"']*["']/, `data-resolution="${resolution}"`);
      } else {
        next = `${attrs.replace(/\s+$/, "")} data-resolution="${resolution}"`;
      }
      if (next !== attrs) {
        html = html.replace(htmlOpenRe, `<html${next}>`);
        changed = true;
      }
    }
    if (HTML_BODY_CSS_WIDTH_FIRST_RE.test(html)) {
      html = html.replace(HTML_BODY_CSS_WIDTH_FIRST_RE, `$1${width}px$3${height}px`);
      changed = true;
    }
    if (HTML_BODY_CSS_HEIGHT_FIRST_RE.test(html)) {
      html = html.replace(HTML_BODY_CSS_HEIGHT_FIRST_RE, `$1${height}px$3${width}px`);
      changed = true;
    }
    if (VIEWPORT_META_SIZE_RE.test(html)) {
      html = html.replace(VIEWPORT_META_SIZE_RE, `$1${width}$3${height}`);
      changed = true;
    }
    if (changed) writeFileSync(file, html, "utf-8");
  }
}
async function scaffoldProject(destDir, name, templateId, media, tailwind = false, resolution, authoringSkill) {
  mkdirSync(destDir, { recursive: true });
  const templateDir = getStaticTemplateDir(templateId);
  if (existsSync2(join2(templateDir, "index.html"))) {
    cpSync(templateDir, destDir, { recursive: true });
  } else {
    await fetchRemoteTemplate(templateId, destDir);
  }
  patchVideoSrc(destDir, media);
  if (tailwind) writeTailwindSupport(destDir);
  if (resolution) applyResolutionPreset(destDir, resolution);
  writeFileSync(
    resolve(destDir, "meta.json"),
    JSON.stringify(
      {
        id: name,
        name,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      null,
      2
    ),
    "utf-8"
  );
  if (!existsSync2(resolve(destDir, "hyperframes.json"))) {
    const { createProjectConfig, DEFAULT_PROJECT_CONFIG } = await import("./projectConfig-BKFYDQMF.js");
    const { normalizeSkillSlug } = await import("./skill-ZHVLH7KX.js");
    const skill = normalizeSkillSlug(authoringSkill);
    createProjectConfig(
      destDir,
      skill ? { ...DEFAULT_PROJECT_CONFIG, authoringSkill: skill } : DEFAULT_PROJECT_CONFIG
    );
  }
  writeDefaultPackageJson(destDir, name);
  const sharedDir = getSharedTemplateDir();
  if (existsSync2(sharedDir)) {
    for (const entry of readdirSync(sharedDir, { withFileTypes: true })) {
      const src = join2(sharedDir, entry.name);
      const dest = resolve(destDir, entry.name);
      if (entry.isFile() || entry.isSymbolicLink()) {
        copyFileSync(src, dest);
      }
    }
  }
}
async function keepSkillsCurrent(destDir) {
  const { updateSkills } = await import("./skills-UCWEB3UG.js");
  console.log();
  console.log(c.bold("Checking AI coding skills against GitHub..."));
  try {
    const result = await updateSkills({ refreshInstalled: true, cwd: destDir });
    if (result.presenceOnly) {
      console.log(
        c.dim("Skills freshness unverified \u2014 run `npx hyperframes skills update` when online.")
      );
    } else if (result.installed.length === 0) {
      console.log(c.success("AI coding skills are already up to date."));
    } else {
      console.log(
        c.dim("Workflow skills not installed here are added on demand, when first used.")
      );
    }
  } catch (err) {
    console.log(
      c.dim(`AI coding skills install skipped: ${err instanceof Error ? err.message : err}`)
    );
  }
}
var init_default = defineCommand({
  meta: {
    name: "init",
    description: "Scaffold a new composition project"
  },
  args: {
    name: { type: "positional", description: "Project name", required: false },
    example: {
      type: "string",
      description: "Example name (e.g. warm-grain, swiss-grid, blank)",
      alias: "e"
    },
    // Accepted-but-errored so users who still type the old flag get a clear
    // message rather than citty silently ignoring it and producing a blank
    // project. The actual behavior is gone — this exists purely for the
    // diagnostic. `hidden` keeps it out of --help output so new users aren't
    // taught about a flag that's already gone.
    template: {
      type: "string",
      description: "[renamed] Use --example instead.",
      alias: "t",
      hidden: true
    },
    video: {
      type: "string",
      description: "Path to a video file (MP4, WebM, MOV)",
      alias: "v"
    },
    "video-legacy": {
      type: "string",
      description: "[renamed] Use --video (or -v) instead of -V.",
      alias: "V",
      hidden: true
    },
    audio: {
      type: "string",
      description: "Path to an audio file (MP3, WAV, M4A)",
      alias: "a"
    },
    "skip-transcribe": {
      type: "boolean",
      description: "Skip whisper transcription"
    },
    model: {
      type: "string",
      description: "Whisper model for transcription (e.g. tiny.en, base.en, small.en, medium.en, large)"
    },
    language: {
      type: "string",
      description: "Language code for transcription (e.g. en, es, ja). Filters out non-target speech."
    },
    "non-interactive": {
      type: "boolean",
      description: "Disable interactive prompts (for CI/agents)"
    },
    agent: {
      type: "boolean",
      hidden: true,
      description: "Deprecated alias; default init is the centered blank"
    },
    "skip-skills": {
      type: "boolean",
      description: "[temporarily ignored] init always checks AI skills against GitHub while the skills.sh registry catches up; set HYPERFRAMES_SKIP_SKILLS=1 to opt out (CI/tests)"
    },
    tailwind: {
      type: "boolean",
      description: "Add Tailwind CSS browser-runtime support"
    },
    resolution: {
      type: "string",
      description: "Canvas resolution preset: landscape (1920x1080), portrait (1080x1920), landscape-4k (3840x2160), portrait-4k (2160x3840), square (1080x1080), square-4k (2160x2160). Aliases: 1080p, 4k, uhd, 1080p-square, square-1080p, 4k-square. Default: keep template dimensions (typically 1920x1080)."
    },
    skill: {
      type: "string",
      description: "Owning authoring workflow slug (e.g. product-launch-video). Stamped into hyperframes.json so every render of this project is attributed to it on anonymous telemetry, without re-passing --skill on each render. Ignored unless it is a slug."
    }
  },
  async run({ args }) {
    if (args.template !== void 0) {
      console.error(
        c.error(
          `The --template flag was renamed to --example. Example:
  npx hyperframes init ${args.name ?? "my-video"} --example "${args.template}"`
        )
      );
      failCommand();
    }
    if (args["video-legacy"] !== void 0) {
      console.error(
        c.error(
          `The -V short flag no longer maps to --video. Use --video (or -v). Example:
  npx hyperframes init ${args.name ?? "my-video"} --video "${args["video-legacy"]}"`
        )
      );
      failCommand();
    }
    const exampleFlag = args.example;
    if (exampleFlag?.startsWith("-")) {
      console.error(c.error(`--example requires a value; received flag "${exampleFlag}" instead.`));
      failCommand();
    }
    const videoFlag = args.video;
    const audioFlag = args.audio;
    const skipTranscribe = args["skip-transcribe"] === true;
    const skipSkills = process.env.HYPERFRAMES_SKIP_SKILLS === "1";
    const skipSkillsFlagIgnored = args["skip-skills"] === true && !skipSkills;
    const tailwind = args.tailwind === true;
    const nonInteractive = args["non-interactive"] === true || args.agent === true;
    const modelFlag = args.model;
    const languageFlag = args.language;
    const initialTranscriptionModel = initialModelForLanguage(
      modelFlag ?? DEFAULT_MODEL,
      languageFlag
    );
    const interactive = !nonInteractive && process.stdout.isTTY === true;
    if (skipSkillsFlagIgnored) {
      console.log(
        c.dim(
          "Note: --skip-skills is temporarily ignored \u2014 init always checks AI skills against GitHub while the skills.sh registry catches up."
        )
      );
    }
    let resolutionPreset;
    if (args.resolution !== void 0) {
      resolutionPreset = normalizeResolutionFlag(args.resolution);
      if (!resolutionPreset) {
        console.error(
          c.error(
            `Invalid --resolution: "${args.resolution}". Use one of: landscape, portrait, landscape-4k, portrait-4k, square, square-4k (or aliases 1080p, 4k, uhd, 1080p-square, square-1080p, 4k-square).`
          )
        );
        failCommand();
      }
    }
    if (!interactive) {
      const templateId2 = resolveScaffoldTemplateId(exampleFlag, Boolean(videoFlag || audioFlag));
      const name2 = args.name ?? "my-video";
      const destDir2 = resolve(name2);
      const tooLong2 = nameTooLongMessage(destDir2);
      if (tooLong2) {
        console.error(c.error(tooLong2));
        failCommand();
      }
      if (existsSync2(destDir2) && readdirSync(destDir2).length > 0) {
        console.error(c.error(`Directory already exists and is not empty: ${name2}`));
        failCommand();
      }
      if (videoFlag && audioFlag) {
        console.error(c.error("Cannot use --video and --audio together"));
        failCommand();
      }
      const videoPath = videoFlag ? resolve(videoFlag) : void 0;
      if (videoPath && !existsSync2(videoPath)) {
        console.error(c.error(`Video file not found: ${videoFlag}`));
        failCommand();
      }
      const audioPath = audioFlag ? resolve(audioFlag) : void 0;
      if (audioPath && !existsSync2(audioPath)) {
        console.error(c.error(`Audio file not found: ${audioFlag}`));
        failCommand();
      }
      mkdirSync(destDir2, { recursive: true });
      let localVideoName2;
      let videoHasAudio2 = true;
      let videoDuration2;
      let sourceFilePath2;
      if (videoPath) {
        sourceFilePath2 = videoPath;
        const result = await handleVideoFile(videoPath, destDir2, false);
        localVideoName2 = result.localVideoName;
        videoHasAudio2 = result.meta.hasAudio;
        videoDuration2 = result.meta.durationSeconds;
        console.log(
          `Video: ${result.meta.width}x${result.meta.height}, ${result.meta.durationSeconds.toFixed(1)}s`
        );
      }
      if (audioPath) {
        sourceFilePath2 = audioPath;
        copyFileSync(audioPath, resolve(destDir2, basename(audioPath)));
        const { getMediaDurationSeconds } = await import("./transcribe-5NQZDEAX.js");
        videoDuration2 = getMediaDurationSeconds(audioPath) ?? void 0;
        console.log(`Audio: ${basename(audioPath)}`);
      }
      if (sourceFilePath2 && !skipTranscribe) {
        try {
          const { ensureWhisper, ensureModel } = await import("./manager-DXB7JDHU.js");
          await ensureWhisper();
          await ensureModel(initialTranscriptionModel);
          console.log("Transcribing...");
          const { transcribe: runTranscribe } = await import("./transcribe-5NQZDEAX.js");
          const result = await runTranscribe(sourceFilePath2, destDir2, {
            model: modelFlag,
            language: languageFlag
          });
          console.log(
            `Transcribed: ${result.wordCount} words (${result.durationSeconds.toFixed(1)}s)`
          );
          if (!videoDuration2) videoDuration2 = result.durationSeconds;
        } catch (err) {
          console.log(`Transcription skipped: ${err instanceof Error ? err.message : err}`);
        }
      }
      try {
        const media = {
          video: localVideoName2 ? { filename: localVideoName2, hasAudio: videoHasAudio2 } : void 0,
          audio: audioPath ? { filename: basename(audioPath) } : void 0,
          durationSeconds: videoDuration2
        };
        await scaffoldProject(
          destDir2,
          basename(destDir2),
          templateId2,
          media,
          tailwind,
          resolutionPreset,
          args.skill
        );
      } catch (err) {
        console.error(
          c.error(
            `Failed to scaffold example "${templateId2}": ${err instanceof Error ? err.message : err}`
          )
        );
        console.error(c.dim("Use --example blank for offline use."));
        failCommand();
      }
      trackInitTemplate(templateId2, { tailwind });
      const transcriptFile2 = resolve(destDir2, "transcript.json");
      if (existsSync2(transcriptFile2)) {
        await patchTranscript(destDir2, transcriptFile2);
      }
      console.log(c.success(`Created ${c.accent(name2 + "/")}`));
      for (const f of readdirSync(destDir2).filter((f2) => !f2.startsWith("."))) {
        console.log(`  ${c.accent(f)}`);
      }
      if (!skipSkills) {
        await keepSkillsCurrent(destDir2);
      }
      console.log();
      console.log("Get started:");
      console.log();
      if (skipSkills) {
        console.log(
          `  ${c.accent("1.")} Use your HyperFrames plugin, or install standalone skills:`
        );
        console.log(`     ${c.accent("npx hyperframes skills update")}`);
      } else {
        console.log(
          `  ${c.accent("1.")} Restart your AI agent (new session) so it loads the skills.`
        );
      }
      console.log();
      console.log(`  ${c.accent("2.")} Open this project with your AI coding agent:`);
      console.log(
        `     ${c.accent(`cd ${name2}`)} then start ${c.accent("Claude Code")}, ${c.accent("Cursor")}, or your preferred agent`
      );
      console.log();
      console.log(`  ${c.accent("3.")} Try a starter prompt:`);
      console.log(
        `     ${c.dim('"Using /hyperframes, create a 15-second intro about [your topic]"')}`
      );
      console.log(`     ${c.dim("More patterns: hyperframes.heygen.com/prompting/overview")}`);
      console.log();
      console.log(`  ${c.accent("4.")} Preview in the browser:`);
      console.log(`     ${c.accent(`cd ${name2}`)} && ${c.accent("npm run dev")}`);
      console.log();
      console.log(`  ${c.accent("5.")} Check the composition:`);
      console.log(`     ${c.accent(`cd ${name2}`)} && ${c.accent("npm run check")}`);
      console.log();
      console.log(`  ${c.accent("6.")} Render to MP4 when ready:`);
      console.log(`     ${c.accent(`cd ${name2}`)} && ${c.accent("npm run render")}`);
      console.log();
      console.log(`  ${c.dim("Full docs: hyperframes.heygen.com")}`);
      return;
    }
    printBanner();
    ge("Create a new HyperFrames project");
    let name;
    const hasPositionalName = args.name !== void 0 && args.name !== "";
    if (hasPositionalName) {
      name = args.name ?? "my-video";
    } else {
      const nameResult = await Re({
        message: "Project name",
        placeholder: "my-video",
        defaultValue: "my-video"
      });
      if (q(nameResult)) {
        me("Setup cancelled.");
        finishCommand(0);
      }
      name = nameResult;
    }
    const destDir = resolve(name);
    const tooLong = nameTooLongMessage(destDir);
    if (tooLong) {
      R.error(tooLong);
      me("Setup cancelled.");
      failCommand();
    }
    if (existsSync2(destDir) && readdirSync(destDir).length > 0) {
      const overwrite = await ue({
        message: `Directory ${c.accent(name)} already exists and is not empty. Overwrite?`,
        initialValue: false
      });
      if (q(overwrite) || !overwrite) {
        me("Setup cancelled.");
        finishCommand(0);
      }
    }
    let localVideoName;
    let videoHasAudio = true;
    let sourceFilePath;
    let videoDuration;
    if (videoFlag) {
      const videoPath = resolve(videoFlag);
      if (!existsSync2(videoPath)) {
        R.error(`File not found: ${videoFlag}`);
        me("Setup cancelled.");
        failCommand();
      }
      mkdirSync(destDir, { recursive: true });
      sourceFilePath = videoPath;
      const result = await handleVideoFile(videoPath, destDir, true);
      localVideoName = result.localVideoName;
      videoHasAudio = result.meta.hasAudio;
      videoDuration = result.meta.durationSeconds;
    } else if (audioFlag) {
      const audioPath = resolve(audioFlag);
      if (!existsSync2(audioPath)) {
        R.error(`File not found: ${audioFlag}`);
        me("Setup cancelled.");
        failCommand();
      }
      mkdirSync(destDir, { recursive: true });
      sourceFilePath = audioPath;
      copyFileSync(audioPath, resolve(destDir, basename(audioPath)));
      const { getMediaDurationSeconds } = await import("./transcribe-5NQZDEAX.js");
      videoDuration = getMediaDurationSeconds(audioPath) ?? void 0;
      R.info(`Audio copied to ${c.accent(basename(audioPath))}`);
    }
    if (sourceFilePath) {
      const transcribeChoice = await ue({
        message: "Generate captions from audio?",
        initialValue: true
      });
      if (!q(transcribeChoice) && transcribeChoice) {
        const { findWhisper } = await import("./manager-DXB7JDHU.js");
        const needsInstall = findWhisper() === void 0;
        if (needsInstall) {
          R.info(c.dim("whisper-cpp not found \u2014 installing automatically..."));
        }
        const spin2 = ft();
        spin2.start(
          needsInstall ? "Installing whisper-cpp (this may take a moment)..." : "Preparing transcription..."
        );
        try {
          const { ensureWhisper, ensureModel } = await import("./manager-DXB7JDHU.js");
          await ensureWhisper({
            onProgress: (msg) => spin2.message(msg)
          });
          await ensureModel(initialTranscriptionModel, {
            onProgress: (msg) => spin2.message(msg)
          });
          spin2.message("Transcribing audio...");
          const { transcribe: runTranscribe } = await import("./transcribe-5NQZDEAX.js");
          const transcribeResult = await runTranscribe(sourceFilePath, destDir, {
            model: modelFlag,
            language: languageFlag,
            onProgress: (msg) => spin2.message(msg)
          });
          spin2.stop(
            c.success(
              `Transcribed ${transcribeResult.wordCount} words (${transcribeResult.durationSeconds.toFixed(1)}s)`
            )
          );
        } catch (err) {
          spin2.stop(c.dim(`Transcription skipped: ${err instanceof Error ? err.message : err}`));
        }
      }
    }
    let templateId;
    if (exampleFlag || videoFlag || audioFlag) {
      templateId = resolveScaffoldTemplateId(exampleFlag, Boolean(videoFlag || audioFlag));
    } else {
      const allTemplates = await resolveTemplateList();
      const defaultTemplate = "blank";
      const templateResult = await Ee({
        message: "Pick an example",
        options: allTemplates.map((t) => ({
          value: t.id,
          label: t.label,
          hint: t.source === "remote" ? `${t.hint} (download)` : t.hint
        })),
        initialValue: defaultTemplate
      });
      if (q(templateResult)) {
        me("Setup cancelled.");
        finishCommand(0);
      }
      templateId = templateResult;
    }
    const spin = ft();
    const isBundled = BUNDLED_TEMPLATES.some((t) => t.id === templateId);
    if (!isBundled) {
      spin.start(`Downloading example ${c.accent(templateId)}...`);
    }
    try {
      const media = {
        video: localVideoName ? { filename: localVideoName, hasAudio: videoHasAudio } : void 0,
        audio: audioFlag ? { filename: basename(audioFlag) } : void 0,
        durationSeconds: videoDuration
      };
      await scaffoldProject(
        destDir,
        name,
        templateId,
        media,
        tailwind,
        resolutionPreset,
        args.skill
      );
      if (!isBundled) {
        spin.stop(c.success(`Downloaded ${templateId}`));
      }
    } catch (err) {
      if (!isBundled) {
        spin.stop(c.error("Download failed"));
      }
      R.error(
        `${err instanceof Error ? err.message : err}
${c.dim("Use --example blank for offline use.")}`
      );
      failCommand();
    }
    trackInitTemplate(templateId, { tailwind });
    const transcriptFile = resolve(destDir, "transcript.json");
    if (existsSync2(transcriptFile)) {
      await patchTranscript(destDir, transcriptFile);
    }
    const files = readdirSync(destDir);
    Se(files.map((f) => c.accent(f)).join("\n"), c.success(`Created ${name}/`));
    if (!skipSkills) {
      await keepSkillsCurrent(destDir);
    }
    R.info("Opening studio preview...");
    try {
      const previewCmd = await import("./preview-GJOXUSUI.js").then((m) => m.default);
      await runCommand(previewCmd, { rawArgs: [destDir] });
    } catch {
    }
  }
});
export {
  applyResolutionPreset,
  init_default as default,
  examples,
  injectTailwindBrowserScript,
  nameTooLongMessage,
  resolveVideoDurationSeconds,
  transcodeToMp4
};
