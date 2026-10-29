import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../engine/src/services/systemMemory.ts
import { readFileSync } from "fs";
import { totalmem } from "os";
var BYTES_PER_MIB = 1024 * 1024;
var BYTES_PER_MIB_BIGINT = BigInt(BYTES_PER_MIB);
var CGROUP_V2_MEMORY_MAX_PATH = "/sys/fs/cgroup/memory.max";
var CGROUP_V1_MEMORY_LIMIT_PATH = "/sys/fs/cgroup/memory/memory.limit_in_bytes";
var CGROUP_V1_NO_LIMIT_CUTOFF_BYTES = 2n ** 60n;
var _cachedCgroupLimitMb;
var _warnedCgroupReadFailure = false;
function parseCgroupLimitMb(v2Content, v1Content) {
  if (v2Content !== null) {
    return parseCgroupV2LimitMb(v2Content);
  }
  return parseCgroupV1LimitMb(v1Content);
}
function parseCgroupV2LimitMb(content) {
  const trimmed = content.trim();
  if (trimmed === "max") {
    return null;
  }
  return parsePositiveByteLimitMb(trimmed);
}
function parseCgroupV1LimitMb(content) {
  if (content === null) {
    return null;
  }
  return parsePositiveByteLimitMb(content.trim(), CGROUP_V1_NO_LIMIT_CUTOFF_BYTES);
}
function parsePositiveByteLimitMb(content, noLimitCutoffBytes) {
  if (!/^\d+$/.test(content)) {
    return null;
  }
  const bytes = BigInt(content);
  if (bytes <= 0n) {
    return null;
  }
  if (noLimitCutoffBytes !== void 0 && bytes >= noLimitCutoffBytes) {
    return null;
  }
  return Number(bytes / BYTES_PER_MIB_BIGINT);
}
function getCgroupMemoryLimitMb() {
  if (_cachedCgroupLimitMb !== void 0) return _cachedCgroupLimitMb;
  if (process.platform !== "linux") {
    _cachedCgroupLimitMb = null;
    return null;
  }
  const v2Content = readCgroupFile(CGROUP_V2_MEMORY_MAX_PATH);
  const v1Content = v2Content === null ? readCgroupFile(CGROUP_V1_MEMORY_LIMIT_PATH) : null;
  _cachedCgroupLimitMb = parseCgroupLimitMb(v2Content, v1Content);
  if (_cachedCgroupLimitMb !== null) {
    console.warn(
      `[SystemMemory] cgroup memory limit detected: ${_cachedCgroupLimitMb} MiB \u2014 it governs memory-adaptive render behaviour instead of host RAM.`
    );
  }
  return _cachedCgroupLimitMb;
}
function readCgroupFile(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    const code = getErrorCode(error);
    if (code !== "ENOENT" && code !== "ENOTDIR") {
      warnCgroupReadFailure(path, error);
    }
    return null;
  }
}
function getErrorCode(error) {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return void 0;
  }
  return typeof error.code === "string" ? error.code : void 0;
}
function formatCgroupReadError(error) {
  const message = error instanceof Error ? error.message : String(error);
  const code = getErrorCode(error);
  return code ? `${code}: ${message}` : message;
}
function warnCgroupReadFailure(path, error) {
  if (_warnedCgroupReadFailure) return;
  _warnedCgroupReadFailure = true;
  console.warn(
    `[SystemMemory] Unable to read cgroup memory limit at ${path} (${formatCgroupReadError(error)}); falling back to host RAM.`
  );
}
function getSystemTotalMb() {
  const hostTotalMb = Math.floor(totalmem() / BYTES_PER_MIB);
  const cgroupLimitMb = getCgroupMemoryLimitMb();
  return cgroupLimitMb === null ? hostTotalMb : Math.min(hostTotalMb, cgroupLimitMb);
}
var LOW_MEMORY_TOTAL_MB_THRESHOLD = 8192;
function isLowMemorySystem(totalMb = getSystemTotalMb()) {
  return totalMb <= LOW_MEMORY_TOTAL_MB_THRESHOLD;
}

export {
  getCgroupMemoryLimitMb,
  getSystemTotalMb,
  LOW_MEMORY_TOTAL_MB_THRESHOLD,
  isLowMemorySystem
};
