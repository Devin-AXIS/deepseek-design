import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  CAPTURE_USER_AGENT,
  safeFetch
} from "./chunk-JIXJBOM5.js";
import {
  ensureCaptureDirSync
} from "./chunk-MRF4AMKD.js";
import "./chunk-AWDFDFI3.js";
import {
  setCommandExitCode
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
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/capture/video.ts
import { createWriteStream, existsSync, readFileSync, unlinkSync } from "fs";
import { resolve, join, basename } from "path";
var MAX_VIDEO_BYTES = 250 * 1024 * 1024;
var VIDEO_CONTENT_TYPE_RE = /^(video\/|application\/(mp4|octet-stream|x-mpegurl))/i;
async function streamToFile(url, destPath) {
  const r = await safeFetch(url, {
    signal: AbortSignal.timeout(12e4),
    headers: { "User-Agent": CAPTURE_USER_AGENT }
  });
  if (!r) {
    throw new Error(
      `fetch blocked or failed (private/metadata host, redirect chain, or network error): ${url}`
    );
  }
  if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText} for ${url}`);
  const ct = r.headers.get("content-type") || "";
  if (!VIDEO_CONTENT_TYPE_RE.test(ct)) {
    throw new Error(
      `unexpected content-type "${ct}" for ${url} \u2014 expected video/*. The URL probably doesn't point at a real video file.`
    );
  }
  const cl = r.headers.get("content-length");
  if (cl && Number(cl) > MAX_VIDEO_BYTES) {
    throw new Error(
      `video too large (${Math.round(Number(cl) / 1024 / 1024)}MB > ${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)}MB cap) for ${url}`
    );
  }
  if (!r.body) throw new Error(`empty response body for ${url}`);
  const file = createWriteStream(destPath, { flags: "wx" });
  let streamError = null;
  const streamErrored = new Promise((_, reject) => {
    file.once("error", (e) => {
      streamError = e;
      reject(e);
    });
  });
  let bytes = 0;
  try {
    await Promise.race([
      streamErrored,
      new Promise((resolveOpen) => file.once("open", () => resolveOpen()))
    ]);
    for await (const chunk of r.body) {
      if (streamError) throw streamError;
      bytes += chunk.byteLength;
      if (bytes > MAX_VIDEO_BYTES) {
        throw new Error(
          `video exceeded ${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)}MB cap mid-stream for ${url}`
        );
      }
      if (!file.write(chunk)) {
        await Promise.race([
          streamErrored,
          new Promise((resolveDrain) => file.once("drain", () => resolveDrain()))
        ]);
      }
    }
    await new Promise((resolveEnd, rejectEnd) => {
      file.end((err) => err ? rejectEnd(err) : resolveEnd());
    });
    return bytes;
  } catch (e) {
    file.destroy();
    if (e.code !== "EEXIST") {
      try {
        unlinkSync(destPath);
      } catch {
      }
    }
    throw e;
  }
}
function safeFilename(name) {
  let decoded = name;
  try {
    decoded = decodeURIComponent(name);
  } catch {
  }
  return decoded.replace(/[^A-Za-z0-9._-]+/g, "_");
}
function findFilenameCollision(manifest, selected) {
  const selectedName = safeFilename(selected.filename || basename(selected.url));
  return manifest.filter(
    (e) => e.index !== selected.index && safeFilename(e.filename || basename(e.url)) === selectedName
  );
}
function pickManifestEntry(manifest, args) {
  if (args.index != null) {
    const i = Number(args.index);
    if (!Number.isInteger(i) || i < 0) {
      return {
        ok: false,
        code: "bad-index",
        message: `--index ${args.index} must be a non-negative integer`
      };
    }
    const found = manifest.find((e) => e.index === i);
    if (!found) {
      const available = manifest.map((e) => e.index).join(", ");
      return {
        ok: false,
        code: "no-match-index",
        message: `no manifest entry with index=${i} (available: ${available || "none"})`
      };
    }
    return { ok: true, entry: found };
  }
  if (args.url != null) {
    const found = manifest.find((e) => e.url === args.url);
    if (!found) {
      return { ok: false, code: "no-match-url", message: `no manifest entry with url=${args.url}` };
    }
    return { ok: true, entry: found };
  }
  return {
    ok: false,
    code: "no-selector",
    message: "specify --index <N> or --url <URL> (or --list to see what's in the manifest)"
  };
}
async function runVideoMode(args) {
  const projectDir = resolve(args.project);
  const directPath = join(projectDir, "extracted", "video-manifest.json");
  const w2hPath = join(projectDir, "capture", "extracted", "video-manifest.json");
  const manifestPath = existsSync(directPath) ? directPath : w2hPath;
  const isW2hLayout = manifestPath === w2hPath;
  if (!existsSync(manifestPath)) {
    console.error(
      `${c.error("\u2717")} no video-manifest.json at ${directPath} or ${w2hPath}
  Was this directory produced by \`hyperframes capture\`?`
    );
    setCommandExitCode(1);
    return;
  }
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  } catch (e) {
    console.error(`${c.error("\u2717")} video-manifest.json is malformed: ${e.message}`);
    setCommandExitCode(1);
    return;
  }
  if (args.list) {
    if (manifest.length === 0) {
      console.log(c.dim("(manifest is empty \u2014 no <video> elements on the captured page)"));
      return;
    }
    console.log(
      `${manifest.length} video entr${manifest.length === 1 ? "y" : "ies"} in ${manifestPath}:`
    );
    for (const e of manifest) {
      console.log(
        `  ${c.bold(`[${e.index}]`)} ${e.filename} \u2014 ${e.sourceWidth || e.width}\xD7${e.sourceHeight || e.height}` + (e.heading ? `
      heading: "${e.heading}"` : "") + `
      url: ${e.url}`
      );
    }
    return;
  }
  const pick = pickManifestEntry(manifest, args);
  if (!pick.ok) {
    console.error(
      `${c.error("\u2717")} ${pick.message}` + (pick.code === "no-match-url" ? `
  Run with --list to see what's available.` : "")
    );
    setCommandExitCode(1);
    return;
  }
  const entry = pick.entry;
  const collisions = findFilenameCollision(manifest, entry);
  if (collisions.length > 0) {
    console.error(
      `${c.error("\u2717")} filename "${safeFilename(entry.filename || basename(entry.url))}" collides with manifest entr${collisions.length === 1 ? "y" : "ies"} ${collisions.map((co) => `[${co.index}]`).join(", ")}. Refusing to download \u2014 the on-disk file's bytes would not match the requested entry.`
    );
    setCommandExitCode(1);
    return;
  }
  const outDir = isW2hLayout ? join(projectDir, "capture", "assets", "videos") : join(projectDir, "assets", "videos");
  try {
    ensureCaptureDirSync(projectDir, outDir);
  } catch (e) {
    console.error(`${c.error("\u2717")} ${e.message}`);
    setCommandExitCode(1);
    return;
  }
  const fname = safeFilename(entry.filename || basename(entry.url));
  const outPath = join(outDir, fname);
  const relPath = isW2hLayout ? `capture/assets/videos/${fname}` : `assets/videos/${fname}`;
  console.log(
    `${c.accent("\u25B8")} downloading [${entry.index}] ${entry.filename} (${entry.sourceWidth || entry.width}\xD7${entry.sourceHeight || entry.height})`
  );
  console.log(`     from: ${entry.url}`);
  try {
    const bytes = await streamToFile(entry.url, outPath);
    const sizeKb = Math.round(bytes / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)}MB` : `${sizeKb}KB`;
    console.log(`${c.success("\u25C7")}  wrote ${relPath} (${sizeStr})`);
    const snippetId = `video-${entry.index}`;
    console.log(
      `     Reference it from a beat composition as:
       <video id="${snippetId}" src="${relPath}" data-start="0" data-duration="${(entry.sourceWidth || entry.width) === (entry.sourceHeight || entry.height) ? 5 : 4}" data-track-index="0" autoplay muted loop></video>`
    );
  } catch (e) {
    if (e.code === "EEXIST") {
      console.log(`${c.warn("\u26A0")}  already downloaded: ${relPath} (skipping)`);
      console.log(`     Delete the file and re-run to refetch.`);
      return;
    }
    console.error(`${c.error("\u2717")} download failed: ${e.message}`);
    setCommandExitCode(1);
  }
}
export {
  MAX_VIDEO_BYTES,
  VIDEO_CONTENT_TYPE_RE,
  findFilenameCollision,
  pickManifestEntry,
  runVideoMode,
  safeFilename
};
