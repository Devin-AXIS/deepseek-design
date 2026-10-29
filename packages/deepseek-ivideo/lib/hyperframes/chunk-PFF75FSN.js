import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  getMimeType
} from "./chunk-BZIGYBUM.js";
import {
  injectTagsAtHeadStart
} from "./chunk-7QZSGMGW.js";

// src/utils/compositionServer.ts
import { createHash } from "crypto";
import { createReadStream, existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { Readable } from "stream";
import { fileURLToPath } from "url";
function helperDir() {
  return dirname(fileURLToPath(import.meta.url));
}
function resolveRuntimePath() {
  const d = helperDir();
  const candidates = [
    resolve(d, "hyperframe-runtime.js"),
    resolve(d, "..", "hyperframe-runtime.js"),
    // Monorepo dev: src/<dir>/ → src/ → cli/ → packages/ then into core/dist/
    resolve(d, "..", "..", "..", "core", "dist", "hyperframe.runtime.iife.js")
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}
function resolvePlayerPath() {
  const d = helperDir();
  const candidates = [
    resolve(d, "..", "..", "..", "player", "dist", "hyperframes-player.global.js"),
    resolve(d, "hyperframes-player.global.js"),
    resolve(d, "..", "hyperframes-player.global.js")
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}
function resolveSlideshowPath() {
  const d = helperDir();
  const candidates = [
    resolve(d, "..", "..", "..", "player", "dist", "slideshow", "hyperframes-slideshow.global.js"),
    resolve(d, "hyperframes-slideshow.global.js"),
    resolve(d, "..", "hyperframes-slideshow.global.js")
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}
function injectRuntime(html) {
  return injectTagsAtHeadStart(html, `<script src="/runtime.js"></script>`);
}
function assetContentType(filePath) {
  return getMimeType(filePath);
}
function revalidatedResponse(body, contentType, ifNoneMatch) {
  const etag = `"${createHash("sha256").update(body).digest("base64url").slice(0, 27)}"`;
  const headers = { "Content-Type": contentType, "Cache-Control": "no-cache", ETag: etag };
  if (ifNoneMatch === etag) return new Response(null, { status: 304, headers });
  return new Response(body, { status: 200, headers });
}
function buildRangeResponse(filePath, contentType, rangeHeader, ifNoneMatch) {
  const { size, mtimeMs } = statSync(filePath);
  const last = size - 1;
  const cache = {
    "Cache-Control": "no-cache",
    ETag: `"${mtimeMs.toString(36)}-${size.toString(36)}"`
  };
  if (ifNoneMatch === cache.ETag) return new Response(null, { status: 304, headers: cache });
  const match = rangeHeader ? /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim()) : null;
  const body = (start2, end2) => size === 0 ? null : Readable.toWeb(createReadStream(filePath, { start: start2, end: end2 }));
  if (!match) {
    return new Response(body(0, last), {
      status: 200,
      headers: {
        ...cache,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Content-Length": String(size)
      }
    });
  }
  const hasStart = match[1] !== "";
  const start = hasStart ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = !hasStart ? last : match[2] !== "" ? Math.min(Number(match[2]), last) : last;
  if (start > end || start > last) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" }
    });
  }
  return new Response(body(start, end), {
    status: 206,
    headers: {
      ...cache,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1)
    }
  });
}
async function listenOnFreePort(server, startPort) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const port = startPort + attempt;
    try {
      await new Promise((res, rej) => {
        const onErr = (err) => {
          server.removeListener("listening", onOk);
          rej(err ?? new Error("server error"));
        };
        const onOk = () => {
          server.removeListener("error", onErr);
          res();
        };
        server.once("error", onErr);
        server.once("listening", onOk);
        server.listen(port);
      });
      return port;
    } catch (err) {
      if (err.code === "EADDRINUSE") continue;
      throw err;
    }
  }
  throw new Error(`No free port found in [${startPort}, ${startPort + 9}]`);
}

export {
  resolveRuntimePath,
  resolvePlayerPath,
  resolveSlideshowPath,
  injectRuntime,
  assetContentType,
  revalidatedResponse,
  buildRangeResponse,
  listenOnFreePort
};
