import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  getMimeType,
  injectMediaCodecMapIntoHtml
} from "./chunk-BZIGYBUM.js";
import {
  PROXY_VARIANT_CONFIG,
  ProxyCapacityError,
  ProxyTranscodeError,
  decideMediaProxyEligibility,
  isProxyVariantRequest,
  probeAssetCodec,
  recordProxyRequest,
  resolveProxy,
  resolveProxyVariantRequest
} from "./chunk-PVPXIJ5Z.js";
import {
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";

// src/utils/staticProjectServer.ts
import { createServer } from "http";
import { createReadStream, existsSync, statSync } from "fs";
import { isAbsolute, relative, resolve } from "path";
function serveFileWithRange(filePath, rangeHeader, res, contentType = getMimeType(filePath)) {
  const size = statSync(filePath).size;
  const headers = {
    "Content-Type": contentType,
    "Accept-Ranges": "bytes"
  };
  const last = size - 1;
  let start = 0;
  let end = last;
  let status = 200;
  const match = rangeHeader ? /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim()) : null;
  if (match) {
    const hasStart = match[1] !== "";
    start = hasStart ? Number(match[1]) : Math.max(0, size - Number(match[2]));
    end = !hasStart ? last : match[2] !== "" ? Math.min(Number(match[2]), last) : last;
    if (start > end || start > last) {
      res.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` });
      res.end();
      return;
    }
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
  }
  headers["Content-Length"] = String(end - start + 1);
  const stream = createReadStream(filePath, { start, end });
  stream.on("open", () => {
    res.writeHead(status, headers);
    stream.pipe(res);
  });
  stream.on("error", () => {
    if (!res.headersSent) res.writeHead(500);
    res.end();
    stream.destroy();
  });
}
function writeProxyError(err, res) {
  if (err instanceof ProxyCapacityError) {
    res.writeHead(503, { "Content-Type": "text/plain", "Retry-After": "1" });
    res.end(`Proxy transcode deferred: ${err.message}`);
    return;
  }
  if (err instanceof ProxyTranscodeError) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end(`Proxy transcode failed: ${err.message}`);
    return;
  }
  res.writeHead(500);
  res.end();
}
async function serveProxyRequest(projectDir, filePath, request, autoProxy, rangeHeader, res) {
  const contentType = getMimeType(filePath);
  if (!autoProxy || !contentType.startsWith("video/")) {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    const facts = await probeAssetCodec(filePath);
    const eligibility = decideMediaProxyEligibility(facts);
    if (!eligibility.eligible) {
      res.writeHead(422, { "Content-Type": "text/plain" });
      res.end(`media proxy unavailable: ${eligibility.reason}`);
      return;
    }
    if (!facts) {
      res.writeHead(422, { "Content-Type": "text/plain" });
      res.end("media proxy unavailable: unknown_codec");
      return;
    }
    const variant = resolveProxyVariantRequest(request, facts);
    if (!variant) {
      res.writeHead(422, { "Content-Type": "text/plain" });
      res.end("media proxy variant does not match asset");
      return;
    }
    recordProxyRequest();
    const proxyPath = await resolveProxy(projectDir, filePath, variant);
    if (res.writableEnded || res.destroyed) return;
    serveFileWithRange(proxyPath, rangeHeader, res, PROXY_VARIANT_CONFIG[variant].contentType);
  } catch (err) {
    writeProxyError(err, res);
  }
}
async function serveStaticProjectHtml(projectDir, html, bindErrorMessage = "Failed to bind local HTTP server", assetRoots = [], autoProxyOverride) {
  const roots = [projectDir, ...assetRoots];
  const autoProxy = resolveAutoProxy(projectDir, autoProxyOverride);
  const servedHtml = autoProxy ? await injectMediaCodecMapIntoHtml(html, projectDir, [{ html }]) : html;
  const server = createServer((req, res) => {
    const url = req.url ?? "/";
    if (url === "/" || url === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(servedHtml);
      return;
    }
    const queryIndex = url.indexOf("?");
    const pathOnly = queryIndex === -1 ? url : url.slice(0, queryIndex);
    const proxyParam = queryIndex === -1 ? null : new URLSearchParams(url.slice(queryIndex + 1)).get("hf-proxy");
    const proxyRequest = proxyParam !== null && isProxyVariantRequest(proxyParam) ? proxyParam : null;
    const requestPath = decodeURIComponent(pathOnly).replace(/^\//, "");
    for (const root of roots) {
      const filePath = resolve(root, requestPath);
      const rel = relative(root, filePath);
      if (rel.startsWith("..") || isAbsolute(rel)) continue;
      if (existsSync(filePath)) {
        if (proxyRequest) {
          void serveProxyRequest(
            projectDir,
            filePath,
            proxyRequest,
            autoProxy,
            req.headers.range,
            res
          );
        } else {
          serveFileWithRange(filePath, req.headers.range, res);
        }
        return;
      }
    }
    res.writeHead(404);
    res.end();
  });
  const port = await new Promise((resolvePort, rejectPort) => {
    server.on("error", rejectPort);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const resolvedPort = typeof addr === "object" && addr ? addr.port : 0;
      if (!resolvedPort) rejectPort(new Error(bindErrorMessage));
      else resolvePort(resolvedPort);
    });
  });
  return {
    url: `http://127.0.0.1:${port}/`,
    port,
    close: () => new Promise((resolveClose) => {
      server.close(() => resolveClose());
    })
  };
}

export {
  serveStaticProjectHtml
};
