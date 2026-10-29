import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/capture/readBoundedResponse.ts
function createCaptureDownloadBudget() {
  return { remainingBytes: 100 * 1024 * 1024 };
}
async function readBoundedResponse(response, maxBytes, budget) {
  if (!response.body) return null;
  const reader = response.body.getReader();
  let complete = false;
  try {
    const declared = Number(response.headers.get("content-length"));
    if (declared > Math.min(maxBytes, budget?.remainingBytes ?? maxBytes)) return null;
    const chunks = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        complete = true;
        return Buffer.concat(chunks, total);
      }
      if (budget) {
        const available = budget.remainingBytes;
        budget.remainingBytes = Math.max(0, available - value.byteLength);
        if (value.byteLength > available) return null;
      }
      total += value.byteLength;
      if (total > maxBytes) return null;
      chunks.push(value);
    }
  } finally {
    if (!complete) await reader.cancel().catch(() => {
    });
    reader.releaseLock();
  }
}

export {
  createCaptureDownloadBudget,
  readBoundedResponse
};
