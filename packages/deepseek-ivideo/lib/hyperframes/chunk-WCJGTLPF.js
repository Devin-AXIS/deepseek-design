import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/download.ts
import { randomUUID } from "crypto";
import { createWriteStream, renameSync, unlinkSync } from "fs";
import { get as httpsGet } from "https";
import { Transform } from "stream";
import { pipeline } from "stream/promises";
var DEFAULT_DOWNLOAD_TIMEOUT_MS = 3e4;
var REDIRECT_CODES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function redirectTarget(location, from) {
  return new URL(location, from).toString();
}
var MAX_REDIRECTS = 10;
function removePartialFile(path) {
  try {
    unlinkSync(path);
  } catch {
  }
}
function measureDownload(options, contentLength) {
  const length = Number(contentLength);
  const totalBytes = Number.isSafeInteger(length) && length >= 0 ? length : null;
  let receivedBytes = 0;
  let reportedAt = Date.now();
  options.onProgress?.(0, totalBytes);
  const stream = new Transform({
    transform(chunk, _encoding, callback) {
      receivedBytes += chunk.byteLength;
      if (options.maxBytes !== void 0 && receivedBytes > options.maxBytes) {
        callback(new Error(`Download exceeded ${options.maxBytes} bytes`));
        return;
      }
      const now = Date.now();
      if (now - reportedAt >= 100) {
        options.onProgress?.(receivedBytes, totalBytes);
        reportedAt = now;
      }
      callback(null, chunk);
    }
  });
  return { stream, complete: () => options.onProgress?.(receivedBytes, totalBytes) };
}
function downloadFile(url, dest, options = {}) {
  const tmp = `${dest}.${process.pid}.${randomUUID()}.tmp`;
  const timeoutMs = options.timeoutMs ?? DEFAULT_DOWNLOAD_TIMEOUT_MS;
  return new Promise((resolve, reject) => {
    const follow = (u, hops = 0) => {
      let activeResponse;
      let responsePipelineStarted = false;
      let requestError;
      let request;
      try {
        request = httpsGet(u, (res) => {
          activeResponse = res;
          if (res.statusCode && REDIRECT_CODES.has(res.statusCode)) {
            const location = res.headers.location;
            if (location) {
              if (hops >= MAX_REDIRECTS) {
                res.resume();
                removePartialFile(tmp);
                reject(
                  new Error(`Download failed: more than ${MAX_REDIRECTS} redirects from ${url}`)
                );
                return;
              }
              res.resume();
              try {
                follow(redirectTarget(location, u), hops + 1);
              } catch (error) {
                removePartialFile(tmp);
                reject(error);
              }
              return;
            }
          }
          if (res.statusCode !== 200) {
            res.resume();
            removePartialFile(tmp);
            reject(new Error(`Download failed: HTTP ${res.statusCode}`));
            return;
          }
          const meter = measureDownload(options, res.headers["content-length"]);
          const file = createWriteStream(tmp);
          responsePipelineStarted = true;
          const transfer = pipeline(res, meter.stream, file);
          transfer.then(() => {
            renameSync(tmp, dest);
            meter.complete();
            resolve();
          }).catch((err) => {
            removePartialFile(tmp);
            reject(requestError ?? err);
          });
        });
      } catch (error) {
        removePartialFile(tmp);
        reject(error);
        return;
      }
      request.setTimeout(timeoutMs, () => {
        request.destroy(new Error(`Download timed out after ${timeoutMs}ms`));
      });
      request.on("error", (err) => {
        if (responsePipelineStarted) {
          requestError = err;
          activeResponse?.destroy(err);
          return;
        }
        removePartialFile(tmp);
        reject(err);
      });
    };
    follow(url);
  });
}

export {
  downloadFile
};
