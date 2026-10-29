import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/hostAnswers.ts
import { promises as dns } from "dns";
var PROBE_TIMEOUT_MS = 1e3;
function fetchGoesThroughEnvProxy() {
  if (!(process.env["HTTPS_PROXY"] ?? process.env["https_proxy"])?.trim()) return false;
  const flags = [...process.execArgv, ...process.env["NODE_OPTIONS"]?.split(/\s+/u) ?? []];
  return process.env["NODE_USE_ENV_PROXY"] === "1" || flags.includes("--use-env-proxy");
}
async function hostAnswers(host) {
  if (fetchGoesThroughEnvProxy()) return true;
  try {
    const resolver = new dns.Resolver({ timeout: PROBE_TIMEOUT_MS, tries: 1 });
    const results = await Promise.allSettled([resolver.resolve4(host), resolver.resolve6(host)]);
    const anyFamilyTimedOut = results.some(
      (r) => r.status === "rejected" && r.reason.code === "ETIMEOUT"
    );
    return !anyFamilyTimedOut && results.some((r) => r.status === "fulfilled");
  } catch {
    return false;
  }
}

export {
  hostAnswers
};
