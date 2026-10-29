import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/processTree.ts
import { execFileSync, spawn } from "child_process";
import { readdirSync, readFileSync } from "fs";
function processIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code !== "ESRCH";
  }
}
function processGroupIsAlive(pid) {
  if (process.platform === "linux") {
    try {
      return readdirSync("/proc").some((entry) => {
        if (!/^\d+$/.test(entry)) return false;
        try {
          const stat = readFileSync(`/proc/${entry}/stat`, "utf8");
          const fields = stat.slice(stat.lastIndexOf(") ") + 2).split(/\s+/);
          return fields[2] === String(pid) && fields[0] !== "Z" && fields[0] !== "X";
        } catch {
          return false;
        }
      });
    } catch {
    }
  }
  return processIsAlive(-pid);
}
function waitForDelay(delayMs) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}
async function waitForProcessGroupExit(pid) {
  while (processGroupIsAlive(pid)) await waitForDelay(20);
}
function windowsProcessTreeKillArgs(pid) {
  return ["/PID", String(pid), "/T", "/F"];
}
function terminateWindowsProcessTree(pid, spawnProcess = (command, args, options) => spawn(command, [...args], options)) {
  return new Promise((resolve, reject) => {
    const killer = spawnProcess("taskkill", windowsProcessTreeKillArgs(pid), {
      stdio: "ignore",
      windowsHide: true
    });
    killer.once("error", reject);
    killer.once("close", (status) => {
      if (status === 0) resolve();
      else reject(new Error(`taskkill exited with status ${status ?? "unknown"}`));
    });
  });
}
function signalProcessGroup(pid, signal) {
  try {
    process.kill(-pid, signal);
  } catch {
  }
}
function getDescendants(pid) {
  let children;
  try {
    const raw = execFileSync("pgrep", ["-P", String(pid)], {
      encoding: "utf8",
      timeout: 2e3
    }).trim();
    children = raw.split(/\r?\n/).map(Number).filter((childPid) => Number.isInteger(childPid) && childPid > 0);
  } catch {
    return [];
  }
  return children.flatMap((childPid) => [childPid, ...getDescendants(childPid)]);
}
function signalProcesses(pids, signal) {
  for (const pid of pids) {
    try {
      process.kill(pid, signal);
    } catch {
    }
  }
}
async function terminatePidTree(pid, signal) {
  const pids = [...getDescendants(pid).reverse(), pid];
  signalProcesses(pids, signal);
  if (signal === "SIGKILL") return "SIGKILL";
  await waitForDelay(500);
  const survivors = pids.filter(processIsAlive);
  signalProcesses(survivors, "SIGKILL");
  return survivors.length > 0 ? "SIGKILL" : "SIGTERM";
}
async function terminateProcessGroup(pid, signal) {
  signalProcessGroup(pid, signal);
  if (signal === "SIGKILL") {
    await waitForProcessGroupExit(pid);
    return "SIGKILL";
  }
  await Promise.race([waitForProcessGroupExit(pid), waitForDelay(250)]);
  if (!processGroupIsAlive(pid)) return "SIGTERM";
  signalProcessGroup(pid, "SIGKILL");
  await waitForProcessGroupExit(pid);
  return "SIGKILL";
}
async function terminateProcessTree(pid, options = {}) {
  if (process.platform === "win32") {
    try {
      await terminateWindowsProcessTree(pid, options.spawnProcess);
    } catch (error) {
      try {
        options.child?.kill("SIGKILL");
      } catch {
      }
      if (options.child) throw error;
    }
    return "SIGKILL";
  }
  const signal = options.signal ?? "SIGTERM";
  return options.processGroup ? terminateProcessGroup(pid, signal) : terminatePidTree(pid, signal);
}

// src/utils/cancellableProcess.ts
import { spawn as spawn2 } from "child_process";
import { fileURLToPath } from "url";
var CancellableProcessError = class extends Error {
  code;
  status;
  signal;
  stdout;
  stderr;
  killed;
  constructor(message, options = {}) {
    super(message, { cause: options.cause });
    this.name = "CancellableProcessError";
    this.code = options.code;
    this.status = options.status;
    this.signal = options.signal;
    this.stdout = options.stdout ?? "";
    this.stderr = options.stderr ?? "";
    this.killed = options.killed ?? false;
  }
};
function runCancellableProcess(command, args, options = {}) {
  const signal = options.signal;
  signal?.throwIfAborted();
  return new Promise((resolve, reject) => {
    let child;
    try {
      const spawnOptions = {
        cwd: options.cwd,
        env: options.env,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
        detached: process.platform !== "win32"
      };
      child = spawn2(command, [...args], spawnOptions);
    } catch (error) {
      reject(error);
      return;
    }
    if (child.pid) options.onSpawn?.(child.pid);
    let stdout = "";
    let stderr = "";
    let settled = false;
    let terminationReason;
    let terminationSignal;
    let terminationCode;
    const maxBufferBytes = options.maxBufferBytes ?? 1024 * 1024;
    const processTreePid = child.pid;
    let operationTimeout;
    let terminationTask;
    const cleanup = () => {
      signal?.removeEventListener("abort", onAbort);
      if (operationTimeout) clearTimeout(operationTimeout);
    };
    const finishReject = async (error) => {
      if (settled) return;
      if (terminationTask) {
        try {
          terminationSignal = await terminationTask;
        } catch (terminationError) {
          error = terminationError;
        }
      }
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };
    const terminate = (reason, code) => {
      if (terminationReason !== void 0) return;
      terminationReason = reason;
      terminationCode = code;
      terminationSignal = "SIGTERM";
      if (processTreePid) {
        terminationTask = terminateProcessTree(processTreePid, { child, processGroup: true });
        void terminationTask.catch(() => void 0);
      }
    };
    const onAbort = () => terminate(signal?.reason ?? new Error("Operation aborted"));
    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
      if (Buffer.byteLength(stdout) + Buffer.byteLength(stderr) > maxBufferBytes) {
        terminate(new Error(`Process output exceeded ${maxBufferBytes} bytes`), "ENOBUFS");
      }
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
      if (Buffer.byteLength(stdout) + Buffer.byteLength(stderr) > maxBufferBytes) {
        terminate(new Error(`Process output exceeded ${maxBufferBytes} bytes`), "ENOBUFS");
      }
    });
    child.once("error", (error) => void finishReject(error));
    child.once("close", async (status, closeSignal) => {
      if (settled) return;
      if (terminationTask) {
        try {
          terminationSignal = await terminationTask;
        } catch (error) {
          await finishReject(error);
          return;
        }
      }
      if (settled) return;
      settled = true;
      cleanup();
      if (terminationReason !== void 0) {
        if (signal?.aborted && terminationReason === signal.reason) {
          reject(terminationReason);
          return;
        }
        reject(
          new CancellableProcessError(
            terminationReason instanceof Error ? terminationReason.message : String(terminationReason),
            {
              code: terminationCode,
              signal: closeSignal ?? terminationSignal,
              stdout,
              stderr,
              killed: true,
              cause: terminationReason
            }
          )
        );
        return;
      }
      if (status === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(
        new CancellableProcessError(`Command failed: ${command} ${args.join(" ")}`, {
          status: status ?? void 0,
          signal: closeSignal ?? void 0,
          stdout,
          stderr
        })
      );
    });
    signal?.addEventListener("abort", onAbort, { once: true });
    if (signal?.aborted) onAbort();
    if (options.timeoutMs !== void 0) {
      operationTimeout = setTimeout(() => {
        terminate(new Error(`Process timed out after ${options.timeoutMs} ms`), "ETIMEDOUT");
      }, options.timeoutMs);
      operationTimeout.unref();
    }
  });
}
var SETUP_RESULT_PREFIX = "HYPERFRAMES_RENDER_SETUP_RESULT:";
async function runRenderSetupWorker(mode, input, options) {
  const sourceMode = import.meta.url.endsWith(".ts");
  const workerUrl = new URL(
    sourceMode ? "../renderSetupWorker.ts" : "./renderSetupWorker.js",
    import.meta.url
  );
  const execArgv = sourceMode ? ["--import", "tsx"] : [];
  let result;
  try {
    result = await runCancellableProcess(
      process.execPath,
      [...execArgv, fileURLToPath(workerUrl), mode],
      {
        ...options,
        env: {
          ...process.env,
          ...options.env,
          HYPERFRAMES_RENDER_SETUP_INPUT: JSON.stringify(input)
        }
      }
    );
  } catch (error) {
    if (options.signal?.aborted) options.signal.throwIfAborted();
    if (error instanceof CancellableProcessError && error.stderr.trim()) {
      throw new Error(error.stderr.trim(), { cause: error });
    }
    throw error;
  }
  if (result.stderr) process.stderr.write(result.stderr);
  const encoded = result.stdout.split(/\r?\n/).find((line) => line.startsWith(SETUP_RESULT_PREFIX))?.slice(SETUP_RESULT_PREFIX.length);
  if (!encoded) throw new Error(`${mode} setup process exited without a result`);
  return JSON.parse(encoded);
}

export {
  processIsAlive,
  terminateProcessTree,
  runCancellableProcess,
  runRenderSetupWorker
};
