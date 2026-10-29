import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  CACHE_DIR,
  PINNED_PACKAGES,
  install,
  installedPackagePath,
  isInstalled,
  pinnedPackageBesideCli,
  runNpm,
  sweepStaleStaging
} from "./chunk-3DKN5WKL.js";
import "./chunk-6BEFEWFB.js";
import {
  resolveWritePath
} from "./chunk-6LTRBXKR.js";
import {
  getPreparedWavDurationSeconds,
  prepareWav
} from "./chunk-NSB6GTMH.js";
import {
  emitWords
} from "./chunk-6IHWCZ3W.js";
import "./chunk-PXSM4HPB.js";
import "./chunk-WCJGTLPF.js";
import {
  stoppedByCancelSignal
} from "./chunk-QPIYSFE4.js";
import "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
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
import {
  PARAKEET_MODEL_LABEL,
  SHERPA_ERROR_PREFIX,
  SHERPA_RESULT_PREFIX,
  SHERPA_WINDOW_PREFIX,
  mergeWindowsToWords,
  writeParakeetTranscript
} from "./chunk-KDPYVTEU.js";
import "./chunk-UOFAE5RF.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-M2WBOQ2Q.js";

// src/whisper/sherpa.ts
import { execFile, spawn } from "child_process";
import { createHash, randomUUID } from "crypto";
import { createReadStream, mkdirSync as mkdirSync2, renameSync as renameSync2, rmSync as rmSync2, statSync as statSync2 } from "fs";
import { homedir } from "os";
import { join as join2 } from "path";
import { createInterface } from "readline";
import { fileURLToPath } from "url";

// src/cloud/download.ts
import {
  chmodSync,
  createWriteStream,
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync,
  statSync
} from "fs";
import { dirname, join } from "path";
import { pipeline } from "stream/promises";
async function downloadToFile(url, destPath, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const res = await fetchImpl(url, { signal: options.signal });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${res.status} ${res.statusText}`);
  }
  if (!res.body) {
    throw new Error(`Failed to download ${url}: empty response body`);
  }
  mkdirSync(dirname(destPath), { recursive: true });
  const totalHeader = res.headers.get("content-length");
  const total = totalHeader ? Number.parseInt(totalHeader, 10) : void 0;
  const totalOpt = total !== void 0 && Number.isFinite(total) ? total : void 0;
  const destination = resolveWritePath(destPath);
  const previous = statSync(destination, { throwIfNoEntry: false });
  const stage = mkdtempSync(join(dirname(destination), ".hf-download-"));
  const stagedFile = join(stage, "download");
  let bytes = 0;
  try {
    await pipeline(
      async function* () {
        for await (const chunk of res.body) {
          bytes += chunk.byteLength;
          options.onProgress?.(bytes, totalOpt);
          yield chunk;
        }
        if (totalOpt !== void 0 && bytes !== totalOpt) {
          throw new Error(
            `Truncated download: got ${bytes} bytes, expected ${totalOpt} (content-length). The presigned URL may have expired mid-transfer \u2014 refetch via \`hyperframes cloud get\`.`
          );
        }
      },
      createWriteStream(stagedFile, { flags: "wx" }),
      { signal: options.signal }
    );
    options.signal?.throwIfAborted();
    if (previous?.isFile()) chmodSync(stagedFile, previous.mode & 511);
    renameSync(stagedFile, destination);
  } catch (error) {
    const reason = options.signal?.reason;
    if (options.signal?.aborted && reason instanceof Error) throw reason;
    throw error;
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
  return { path: destPath, bytes };
}

// src/whisper/sherpa.ts
var RUNTIME = "sherpa-onnx-node";
var RUNTIME_VERSION = PINNED_PACKAGES[RUNTIME];
var SHERPA_RUNTIME_DIR = join2(
  CACHE_DIR,
  `${RUNTIME}@${RUNTIME_VERSION}-${process.platform}-${process.arch}`
);
var MODEL_REPO = "csukuangfj/sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8";
var MODEL_REVISION = "2bda32ec70b097a55adaa07d9a7173915b43cc78";
var PARAKEET_MODEL_DIR = join2(
  homedir(),
  ".cache",
  "hyperframes",
  "parakeet",
  "parakeet-tdt-0.6b-v3-int8"
);
var PARAKEET_MODEL_FILES = [
  {
    name: "encoder.int8.onnx",
    bytes: 652184281,
    sha256: "acfc2b4456377e15d04f0243af540b7fe7c992f8d898d751cf134c3a55fd2247"
  },
  {
    name: "decoder.int8.onnx",
    bytes: 11845275,
    sha256: "179e50c43d1a9de79c8a24149a2f9bac6eb5981823f2a2ed88d655b24248db4e"
  },
  {
    name: "joiner.int8.onnx",
    bytes: 6355277,
    sha256: "3164c13fc2821009440d20fcb5fdc78bff28b4db2f8d0f0b329101719c0948b3"
  },
  {
    name: "tokens.txt",
    bytes: 93939,
    sha256: "d58544679ea4bc6ac563d1f545eb7d474bd6cfa467f0a6e2c1dc1c7d37e3c35d"
  }
];
var decodeTimeoutMs = (audioSeconds) => Math.max(18e5, audioSeconds * 2e3);
var SUPPORTED_TARGETS = [
  "darwin-arm64",
  "darwin-x64",
  "linux-x64",
  "linux-arm64",
  "win32-x64",
  "win32-ia32"
];
function currentHost() {
  const report = process.report.getReport();
  return {
    platform: process.platform,
    arch: process.arch,
    glibc: report.header?.glibcVersionRuntime
  };
}
function sherpaUnsupportedReason(host = currentHost()) {
  const target = `${host.platform}-${host.arch}`;
  if (!SUPPORTED_TARGETS.includes(target)) {
    return `Parakeet runs on ${SUPPORTED_TARGETS.join(", ")}; this system is ${target}.`;
  }
  if (host.platform !== "linux") return null;
  if (!host.glibc) return "Parakeet needs glibc 2.32 or newer; this Linux has no glibc (musl?).";
  const [major = 0, minor = 0] = host.glibc.split(".").map(Number);
  if (major > 2 || major === 2 && minor >= 32) return null;
  return `Parakeet needs glibc 2.32 or newer; this system has glibc ${host.glibc}.`;
}
var nativePackageName = (platform, arch) => `sherpa-onnx-${platform === "win32" ? "win" : platform}-${arch}`;
var LOAD_RUNTIME = `try {
  require(process.env.HF_SHERPA_RUNTIME_PATH);
} catch (e) {
  process.stderr.write(String(e && e.message).replace(/\\s+/g, " "));
  process.exitCode = 1;
}`;
function runtimeLoadError(runtimePath, timeoutMs, signal) {
  if (signal?.aborted)
    return Promise.reject(new DecodeCancelled("Parakeet runtime check cancelled"));
  return new Promise((resolve, reject) => {
    const probe = spawn(process.execPath, ["-e", LOAD_RUNTIME], {
      env: { ...process.env, HF_SHERPA_RUNTIME_PATH: runtimePath },
      stdio: ["ignore", "ignore", "pipe"],
      timeout: timeoutMs,
      signal
    });
    let stderr = "";
    probe.stderr.setEncoding("utf8");
    probe.stderr.on("data", (chunk) => {
      stderr = bounded(stderr + chunk);
    });
    probe.on("error", (error) => {
      if (signal?.aborted) reject(new DecodeCancelled("Parakeet runtime check cancelled"));
      else resolve(bounded(error.message));
    });
    probe.on("close", (code, childSignal) => {
      if (signal?.aborted || stoppedByCancelSignal({ code, signal: childSignal, killed: probe.killed })) {
        reject(new DecodeCancelled("Parakeet runtime check cancelled"));
        return;
      }
      if (code === 0 && !probe.killed) {
        resolve(null);
        return;
      }
      let reason;
      if (probe.killed) reason = `loading it timed out after ${timeoutMs / 1e3} s`;
      else if (childSignal) reason = `loading it crashed (${childSignal})`;
      else reason = `it exited ${code} with no output`;
      resolve(bounded(stderr.trim() || reason));
    });
  });
}
async function cachedRuntime(dir, timeoutMs, signal) {
  let path;
  try {
    path = installedPackagePath(dir, RUNTIME);
  } catch (err) {
    return {
      status: "unavailable",
      error: bounded(err instanceof Error ? err.message : String(err))
    };
  }
  if (path === null)
    return { status: "unavailable", error: `${RUNTIME} is not installed in ${dir}` };
  const error = await runtimeLoadError(path, timeoutMs, signal);
  return error === null ? { status: "ready", path } : { status: "unavailable", error };
}
async function selectRuntime(dir, cliUrl, timeoutMs = 6e4, signal) {
  if (signal?.aborted) throw new DecodeCancelled("Parakeet runtime check cancelled");
  const copy = pinnedPackageBesideCli(RUNTIME, cliUrl);
  if (copy !== null) {
    const path = copy.path;
    const error = await runtimeLoadError(path, timeoutMs, signal);
    if (error === null) return { status: "ready", path };
    console.error(
      `Parakeet runtime at ${path.replace(/\s+/g, " ")} did not load: ${error.replace(/\s+/g, " ")}`
    );
  }
  return cachedRuntime(dir, timeoutMs, signal);
}
async function sherpaRuntimeLoadError(dir = SHERPA_RUNTIME_DIR, timeoutMs = 6e4, cliUrl = import.meta.url, signal) {
  const selected = await selectRuntime(dir, cliUrl, timeoutMs, signal);
  return selected.status === "ready" ? null : selected.error;
}
function sherpaPlatformPackage(platform = process.platform, arch = process.arch) {
  return `${nativePackageName(platform, arch)}@${RUNTIME_VERSION}`;
}
async function installSherpaRuntime({
  run = runNpm,
  signal,
  dir = SHERPA_RUNTIME_DIR,
  cliUrl = import.meta.url
} = {}) {
  const present = await selectRuntime(dir, cliUrl, 6e4, signal);
  if (present.status === "ready") return { installed: false, runtimePath: present.path };
  rmSync2(dir, { recursive: true, force: true });
  const native = sherpaPlatformPackage();
  await install(dir, RUNTIME, RUNTIME_VERSION, (args) => run([...args, native], signal));
  const selected = await cachedRuntime(dir, 6e4, signal);
  if (selected.status === "unavailable") {
    throw new Error(
      `The sherpa-onnx runtime was reinstalled but still does not load (${selected.error}). Use --engine whisper for now.`
    );
  }
  return { installed: true, runtimePath: selected.path };
}
function sherpaParakeetInstalled(cliUrl = import.meta.url) {
  return (pinnedPackageBesideCli(RUNTIME, cliUrl) !== null || isInstalled(SHERPA_RUNTIME_DIR, RUNTIME)) && PARAKEET_MODEL_FILES.every(
    (f) => statSync2(join2(PARAKEET_MODEL_DIR, f.name), { throwIfNoEntry: false })?.size === f.bytes
  );
}
async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}
async function verifies(path, file) {
  if (statSync2(path, { throwIfNoEntry: false })?.size !== file.bytes) return false;
  return await sha256File(path) === file.sha256;
}
async function ensureParakeetModel({
  dir = PARAKEET_MODEL_DIR,
  files = PARAKEET_MODEL_FILES,
  download = downloadToFile,
  onBytes,
  signal
} = {}) {
  sweepStaleStaging(dir);
  const missing = [];
  for (const file of files) if (!await verifies(join2(dir, file.name), file)) missing.push(file);
  const total = missing.reduce((sum, f) => sum + f.bytes, 0);
  const staging = `${dir}.tmp-${process.pid}-${randomUUID().slice(0, 8)}`;
  let done = 0;
  try {
    for (const file of missing) {
      signal?.throwIfAborted();
      const dest = join2(dir, file.name);
      const temp = join2(staging, file.name);
      rmSync2(dest, { force: true });
      const url = `https://huggingface.co/${MODEL_REPO}/resolve/${MODEL_REVISION}/${file.name}`;
      await download(url, temp, {
        signal,
        onProgress: (bytes) => onBytes?.(done + bytes, total)
      }).catch((err) => {
        if (signal?.aborted) throw err;
        const why = err instanceof Error ? err.message : String(err);
        throw new Error(
          `Could not download ${file.name} from huggingface.co (${why}). Check your network and re-run.`,
          { cause: err }
        );
      });
      if (!await verifies(temp, file)) {
        throw new Error(
          `${file.name} did not match its pinned size and sha256, so it was discarded. Re-run to retry.`
        );
      }
      mkdirSync2(dir, { recursive: true });
      renameSync2(temp, dest);
      done += file.bytes;
    }
  } finally {
    rmSync2(staging, { recursive: true, force: true });
  }
  return missing.length > 0;
}
function recognizerConfig() {
  const [encoder, decoder, joiner, tokens] = PARAKEET_MODEL_FILES.map(
    (f) => join2(PARAKEET_MODEL_DIR, f.name)
  );
  return {
    featConfig: { sampleRate: 16e3, featureDim: 80 },
    modelConfig: {
      transducer: { encoder, decoder, joiner },
      tokens,
      numThreads: 4,
      provider: "cpu",
      debug: 0,
      modelType: "nemo_transducer"
    },
    decodingMethod: "greedy_search"
  };
}
var DecodeCancelled = class extends Error {
};
var MAX_REASON_CHARS = 600;
var bounded = (why) => why.length > MAX_REASON_CHARS ? `${why.slice(0, MAX_REASON_CHARS)}\u2026` : why;
function failureReason(err, stderr) {
  const how = !err ? "exited without a result" : err.killed ? "was stopped (timeout or output limit)" : err.signal ? `crashed (${err.signal})` : `exited with code ${err.code}`;
  const lines = stderr.split("\n").map((line) => line.trim()).filter(Boolean);
  const why = lines.find((line) => line.startsWith(SHERPA_ERROR_PREFIX))?.slice(SHERPA_ERROR_PREFIX.length) ?? lines.at(-1);
  if (!why) return how;
  return `${how}: ${bounded(why)}`;
}
function decode(wavPath, runtimePath, signal, onWindow) {
  const sourceMode = import.meta.url.endsWith(".ts");
  const worker = new URL(sourceMode ? "./sherpaWorker.ts" : "./sherpaWorker.js", import.meta.url);
  const args = [...sourceMode ? ["--import", "tsx"] : [], fileURLToPath(worker)];
  const input = { wavPath, runtimePath, config: recognizerConfig() };
  return new Promise((resolve, reject) => {
    const child = execFile(
      process.execPath,
      args,
      {
        env: { ...process.env, HYPERFRAMES_PARAKEET_INPUT: JSON.stringify(input) },
        maxBuffer: 256 * 1024 * 1024,
        timeout: decodeTimeoutMs(getPreparedWavDurationSeconds(wavPath) ?? 0),
        signal
      },
      (err, stdout, stderr) => {
        if (signal.aborted || err && stoppedByCancelSignal(err)) {
          reject(new DecodeCancelled("Transcription cancelled"));
          return;
        }
        const line = stdout.split("\n").find((l) => l.startsWith(SHERPA_RESULT_PREFIX));
        if (!err && line) resolve(JSON.parse(line.slice(SHERPA_RESULT_PREFIX.length)));
        else reject(new Error(`Parakeet decoder ${failureReason(err, stderr)}`));
      }
    );
    if (onWindow && child.stdout) {
      createInterface({ input: child.stdout }).on("line", (l) => {
        if (!l.startsWith(SHERPA_WINDOW_PREFIX)) return;
        let streamed;
        try {
          streamed = JSON.parse(l.slice(SHERPA_WINDOW_PREFIX.length));
        } catch {
          return;
        }
        onWindow(streamed.window, streamed.through);
      });
    }
  });
}
function prepareSherpaWav(inputPath, onProgress) {
  try {
    return prepareWav(inputPath, onProgress);
  } catch (err) {
    if (err.cancelled) {
      throw new DecodeCancelled("Transcription cancelled");
    }
    throw err;
  }
}
async function transcribeWithSherpa(wavPath, dir, options) {
  options.onProgress?.("Transcribing with Parakeet...");
  options.onEvent?.({
    type: "progress",
    phase: "transcription",
    model: PARAKEET_MODEL_LABEL,
    status: "started",
    durationSeconds: getPreparedWavDurationSeconds(wavPath)
  });
  if (options.signal.aborted) throw new DecodeCancelled("Transcription cancelled");
  const selected = await selectRuntime(
    options.runtimeDir ?? SHERPA_RUNTIME_DIR,
    options.cliUrl ?? import.meta.url,
    6e4,
    options.signal
  );
  if (selected.status === "unavailable") {
    throw new Error(
      `Parakeet runtime does not load (${selected.error}). Run hyperframes models install parakeet to repair it, or use --engine whisper.`
    );
  }
  const onEvent = options.onEvent;
  const windows = await decode(
    wavPath,
    selected.path,
    options.signal,
    onEvent && ((window, through) => emitWords(onEvent, PARAKEET_MODEL_LABEL, mergeWindowsToWords([window]), through))
  );
  const result = writeParakeetTranscript(dir, mergeWindowsToWords(windows));
  options.onEvent?.({
    type: "progress",
    phase: "transcription",
    model: result.model,
    status: "completed"
  });
  return result;
}
export {
  DecodeCancelled,
  PARAKEET_MODEL_DIR,
  SHERPA_RUNTIME_DIR,
  ensureParakeetModel,
  installSherpaRuntime,
  prepareSherpaWav,
  sherpaParakeetInstalled,
  sherpaPlatformPackage,
  sherpaRuntimeLoadError,
  sherpaUnsupportedReason,
  transcribeWithSherpa
};
