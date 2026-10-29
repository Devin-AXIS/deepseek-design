import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  launchManagedBrowser
} from "./chunk-KXH7PX6M.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-UITPTRCM.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
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
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/beats.ts
import { existsSync as existsSync2, readFileSync as readFileSync2, mkdirSync, writeFileSync } from "fs";
import { resolve, join as join2, dirname as dirname2 } from "path";

// ../core/dist/beats/beatFile.js
function audioRelPathForSrc(src) {
  if (!src)
    return null;
  if (/^(blob:|data:)/i.test(src))
    return null;
  let rel = null;
  const PREVIEW = "/preview/";
  const previewIdx = src.indexOf(PREVIEW);
  if (previewIdx !== -1) {
    let after = src.slice(previewIdx + PREVIEW.length);
    const queryOrHash = after.search(/[?#]/);
    if (queryOrHash !== -1)
      after = after.slice(0, queryOrHash);
    if (after.startsWith("comp/"))
      after = after.slice("comp/".length);
    rel = after ? decodeURIComponent(after) : null;
  }
  if (!rel) {
    try {
      rel = decodeURIComponent(new URL(src, "http://_").pathname);
    } catch {
      rel = src;
    }
  }
  if (!rel)
    return null;
  rel = rel.replace(/^\/+/, "");
  return rel || null;
}
function serializeBeats(times, strengths, audio) {
  const beats = times.map((t, i) => ({
    time: Math.round(t * 1e3) / 1e3,
    strength: Math.round((strengths[i] ?? 0.5) * 1e3) / 1e3
  }));
  const data = { version: 1, audio, beats };
  return `${JSON.stringify(data, null, 2)}
`;
}
var MUSIC_ID_RE = /\b(music|bgm|soundtrack|background[-_]?music)\b/i;
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
}
function isSoundingVideoTag(tag) {
  const unquoted = tag.replace(/"[^"]*"|'[^']*'/g, '""');
  return attr(tag, "data-has-audio") === "true" && !/\smuted(?=[\s/>=])/i.test(unquoted);
}
function findMusicAudioSrc(html) {
  const tags = html.match(/<(?:audio|video)\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (/^<video/i.test(tag) && !isSoundingVideoTag(tag))
      continue;
    const src = attr(tag, "src");
    if (!src)
      continue;
    const role = attr(tag, "data-timeline-role");
    if (role) {
      if (role === "music")
        return src;
      continue;
    }
    const id = attr(tag, "id");
    if (id && MUSIC_ID_RE.test(id))
      return src;
  }
  return null;
}

// src/beats/headlessAnalyzer.ts
import { existsSync, readFileSync } from "fs";
import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
var require2 = createRequire(import.meta.url);
var bundlePromise = null;
function findPrebuiltBundle() {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, "beat-analyzer.global.js"),
    // dist root (tsup-bundled cli)
    join(here, "../beat-analyzer.global.js"),
    // dist/beats → dist
    join(here, "../dist/beat-analyzer.global.js")
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}
async function buildFromCoreSource() {
  const esbuild = await import("esbuild");
  const coreRoot = dirname(require2.resolve("@hyperframes/core/package.json"));
  const entry = join(coreRoot, "src/beats/beatDetection.ts");
  const result = await esbuild.build({
    stdin: {
      contents: `import { analyzeMusicFromBuffer } from ${JSON.stringify(entry)};
globalThis.__hfAnalyze = analyzeMusicFromBuffer;`,
      resolveDir: coreRoot,
      loader: "ts"
    },
    bundle: true,
    format: "iife",
    platform: "browser",
    target: "es2020",
    write: false
  });
  const out = result.outputFiles?.[0];
  if (!out) throw new Error("Failed to bundle beat analyzer");
  return out.text;
}
function buildAnalyzerBundle() {
  if (bundlePromise) return bundlePromise;
  bundlePromise = (async () => {
    const prebuilt = findPrebuiltBundle();
    if (prebuilt) return readFileSync(prebuilt, "utf8");
    return buildFromCoreSource();
  })().catch((err) => {
    bundlePromise = null;
    throw err;
  });
  return bundlePromise;
}
var MAX_AUDIO_BYTES = 80 * 1024 * 1024;
function inPageAnalyze(data) {
  const bin = atob(data);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const win = window;
  if (typeof win.__hfAnalyze !== "function") throw new Error("beat analyzer not loaded");
  const ctx = new (win.AudioContext || win.webkitAudioContext)();
  return ctx.decodeAudioData(bytes.buffer).then((buf) => win.__hfAnalyze(buf)).then((r) => ({
    beatTimes: r.beatTimes,
    beatStrengths: r.beatStrengths,
    bpm: r.bpm,
    bpmConfidence: r.bpmConfidence
  })).finally(() => ctx.close());
}
async function detectOnPage(page, bundle, b64) {
  const pageErrors = [];
  page.on("pageerror", (e) => {
    pageErrors.push(e.message);
  });
  page.on("console", (m) => {
    if (m.type() === "error") pageErrors.push(m.text());
  });
  await page.setContent("<!doctype html><html><body></body></html>");
  await page.addScriptTag({ content: bundle });
  try {
    return await page.evaluate(inPageAnalyze, b64);
  } catch (err) {
    const detail = pageErrors.length ? ` (${pageErrors.join("; ")})` : "";
    throw new Error(`${err instanceof Error ? err.message : String(err)}${detail}`);
  }
}
async function analyzeBeatsHeadless(audioBytes) {
  if (audioBytes.length > MAX_AUDIO_BYTES) {
    const mb = Math.round(audioBytes.length / 1e6);
    throw new Error(
      `Audio file too large for headless analysis (${mb}MB > ${MAX_AUDIO_BYTES / 1e6}MB).`
    );
  }
  const bundle = await buildAnalyzerBundle();
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  const puppeteer = await import("puppeteer-core");
  const browser = await ensureBrowser();
  const chrome = await launchManagedBrowser(puppeteer.default, {
    headless: true,
    executablePath: browser.executablePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--autoplay-policy=no-user-gesture-required"]
  });
  try {
    const page = await chrome.newPage();
    return await detectOnPage(page, bundle, audioBytes.toString("base64"));
  } finally {
    await chrome.close();
  }
}

// src/commands/beats.ts
var examples = [
  ["Generate the beat file for the current project", "hyperframes beats"],
  ["Generate for a specific directory", "hyperframes beats ./my-video"]
];
function fail(message) {
  console.error(c.error(message));
  failCommand();
}
function resolveMusicTarget(project) {
  const src = findMusicAudioSrc(readFileSync2(project.indexPath, "utf-8"));
  if (!src) {
    fail(
      'No music track found. Add data-timeline-role="music" to the <audio> element, or to a <video data-has-audio="true"> whose own sound is the music (or give it an id like music/bgm/soundtrack).'
    );
  }
  const rel = audioRelPathForSrc(src);
  if (!rel) fail(`Cannot derive a beat-file path for music src: ${src}`);
  const audioPath = resolve(project.dir, rel);
  if (!existsSync2(audioPath)) fail(`Audio file not found: ${rel}`);
  return { rel, audioPath };
}
async function detect(audioPath) {
  try {
    return await analyzeBeatsHeadless(readFileSync2(audioPath));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const hint = /chrome|executable|browser|ENOENT/i.test(msg) ? "\nRun: npx hyperframes browser ensure" : "";
    fail(`Beat detection failed: ${msg}${hint}`);
  }
}
function report(file, result, json) {
  if (json) {
    console.log(
      JSON.stringify({ ok: true, file, count: result.beatTimes.length, bpm: result.bpm }, null, 2)
    );
    return;
  }
  console.log(
    c.success(
      `\u2713 Wrote ${result.beatTimes.length} beats \u2192 ${file} (bpm ${result.bpm ?? "?"}, ${result.bpmConfidence})`
    )
  );
}
var beats_default = defineCommand({
  meta: {
    name: "beats",
    description: "Detect beats in the music track (headless) and write beats/<audio>.json"
  },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    json: { type: "boolean", description: "Output result as JSON", default: false }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const { rel, audioPath } = resolveMusicTarget(project);
    if (!args.json) console.log(c.dim(`Analyzing ${rel} in headless Chrome\u2026`));
    const result = await detect(audioPath);
    if (result.beatTimes.length === 0) {
      fail(`No beats detected in ${rel} \u2014 nothing written. (Track may be silent/ambient.)`);
    }
    const outPath = join2(project.dir, "beats", `${rel}.json`);
    mkdirSync(dirname2(outPath), { recursive: true });
    writeFileSync(outPath, serializeBeats(result.beatTimes, result.beatStrengths, rel));
    report(`beats/${rel}.json`, result, Boolean(args.json));
  }
});
export {
  beats_default as default,
  examples
};
