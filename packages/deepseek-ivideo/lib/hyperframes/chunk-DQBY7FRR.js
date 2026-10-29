import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/studioSelectionClient.ts
import { existsSync, realpathSync } from "fs";
import { resolve as resolve2 } from "path";

// src/server/portUtils.ts
import net from "net";
import http from "http";
import { execFile } from "child_process";
import { promisify } from "util";
import { resolve } from "path";
var execFileAsync = promisify(execFile);
var MAX_PORT_SCAN = 100;
var PROBE_TIMEOUT_MS = 300;
var PROBE_MAX_BYTES = 4096;
async function isPortAvailableOnHost(port, host) {
  const probe = net.createServer();
  probe.unref();
  const bindError = await new Promise((settle) => {
    const handleError = (err) => settle(err);
    probe.once("error", handleError);
    probe.listen({ port, host }, () => {
      probe.removeListener("error", handleError);
      settle(null);
    });
  });
  if (bindError !== null) {
    return bindError.code !== "EADDRINUSE";
  }
  await new Promise((done) => probe.close(() => done()));
  return true;
}
var PORT_PROBE_HOSTS = ["127.0.0.1", "0.0.0.0", "::1", "::"];
async function testPortOnAllHosts(port, probe = isPortAvailableOnHost) {
  for (const host of PORT_PROBE_HOSTS) {
    const available = await probe(port, host);
    if (!available) return false;
  }
  return true;
}
function detectHyperframesServer(port, normalizedProjectDir, expectedServerBuildSignature = null, expectedBrowserGpuMode) {
  return new Promise((resolveResult) => {
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port,
        path: "/__hyperframes_config",
        timeout: PROBE_TIMEOUT_MS
      },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return resolveResult({ type: "not-hyperframes" });
        }
        let data = "";
        let bytes = 0;
        res.on("data", (chunk) => {
          bytes += typeof chunk === "string" ? chunk.length : chunk.byteLength;
          if (bytes > PROBE_MAX_BYTES) {
            req.destroy();
            return resolveResult({ type: "not-hyperframes" });
          }
          data += chunk;
        });
        res.on("error", () => {
          resolveResult({ type: "not-hyperframes" });
        });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.isHyperframes !== true) {
              return resolveResult({ type: "not-hyperframes" });
            }
            const normalize = (p) => resolve(p).replace(/\\/g, "/").toLowerCase();
            if (normalize(json.projectDir) === normalizedProjectDir) {
              if (expectedServerBuildSignature !== null && json.serverBuildSignature !== expectedServerBuildSignature) {
                return resolveResult({ type: "mismatch", projectName: json.projectName });
              }
              if (expectedBrowserGpuMode !== void 0 && json.browserGpuMode !== expectedBrowserGpuMode) {
                return resolveResult({ type: "mismatch", projectName: json.projectName });
              }
              return resolveResult({ type: "match" });
            }
            return resolveResult({ type: "mismatch", projectName: json.projectName });
          } catch {
            resolveResult({ type: "not-hyperframes" });
          }
        });
      }
    );
    req.on("error", () => {
      resolveResult({ type: "not-hyperframes" });
    });
    req.on("timeout", () => {
      req.destroy();
      resolveResult({ type: "not-hyperframes" });
    });
  });
}
async function getProcessOnPort(port) {
  if (process.platform === "win32") return windowsListenerPid(port);
  try {
    const { stdout } = await execFileAsync("lsof", [`-ti:${port}`, "-sTCP:LISTEN"], {
      timeout: 2e3
    });
    const pid = stdout.trim().split("\n")[0]?.trim();
    return pid || null;
  } catch {
    return null;
  }
}
async function windowsListenerPid(port) {
  try {
    const { stdout } = await execFileAsync("netstat", ["-ano", "-p", "tcp"], { timeout: 4e3 });
    for (const line of stdout.split(/\r?\n/)) {
      const columns = line.trim().split(/\s+/);
      if (columns.length < 5 || columns[3] !== "LISTENING") continue;
      const local = columns[1] ?? "";
      if (local.slice(local.lastIndexOf(":") + 1) !== String(port)) continue;
      const pid = columns[4] ?? "";
      return /^\d+$/.test(pid) && pid !== "0" ? pid : null;
    }
    return null;
  } catch {
    return null;
  }
}
function probePort(port) {
  return new Promise((resolveResult) => {
    const req = http.get(
      { hostname: "127.0.0.1", port, path: "/__hyperframes_config", timeout: PROBE_TIMEOUT_MS },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return resolveResult(null);
        }
        let data = "";
        let bytes = 0;
        res.on("data", (chunk) => {
          bytes += typeof chunk === "string" ? chunk.length : chunk.byteLength;
          if (bytes > PROBE_MAX_BYTES) {
            req.destroy();
            return resolveResult(null);
          }
          data += chunk;
        });
        res.on("error", () => resolveResult(null));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolveResult(json.isHyperframes === true ? json : null);
          } catch {
            resolveResult(null);
          }
        });
      }
    );
    req.on("error", () => resolveResult(null));
    req.on("timeout", () => {
      req.destroy();
      resolveResult(null);
    });
  });
}
async function scanActiveServers(startPort = 3002) {
  const endPort = startPort + MAX_PORT_SCAN - 1;
  const servers = [];
  const batchSize = 20;
  for (let batchStart = startPort; batchStart <= endPort; batchStart += batchSize) {
    const batchEnd = Math.min(batchStart + batchSize - 1, endPort);
    const ports = Array.from({ length: batchEnd - batchStart + 1 }, (_, i) => batchStart + i);
    const results = await Promise.all(ports.map((port) => activeServerOnPort(port)));
    for (const r of results) {
      if (r) servers.push(r);
    }
  }
  return servers;
}
async function activeServerOnPort(port, listenerLookup = getProcessOnPort) {
  const config = await probePort(port);
  if (!config) return null;
  const listenerPid = await listenerLookup(port);
  if (listenerPid) return { ...identityFrom(config, port), pid: listenerPid, pidSource: "os" };
  const selfReported = Number.isInteger(config.pid) && Number(config.pid) > 0 ? String(config.pid) : null;
  return {
    ...identityFrom(config, port),
    pid: selfReported,
    ...selfReported ? { pidSource: "self-reported" } : {}
  };
}
function identityFrom(config, port) {
  return {
    port,
    projectName: config.projectName,
    projectDir: config.projectDir,
    version: config.version,
    browserGpuMode: config.browserGpuMode
  };
}
async function killActiveServers(startPort = 3002) {
  const servers = await scanActiveServers(startPort);
  let killed = 0;
  const unverified = [];
  for (const server of servers) {
    if (!server.pid) continue;
    if (server.pidSource !== "os") {
      unverified.push(server.port);
      continue;
    }
    try {
      process.kill(parseInt(server.pid, 10), "SIGTERM");
      killed++;
    } catch {
    }
  }
  return { killed, unverified };
}
async function findPortAndServe(fetch2, startPort, projectDir, forceNew, expectedServerBuildSignature = null, bindHost, expectedBrowserGpuMode) {
  const { createAdaptorServer } = await import("@hono/node-server");
  const host = bindHost ?? (process.env.HYPERFRAMES_PREVIEW_HOST?.trim() || "127.0.0.1");
  const normalizedDir = resolve(projectDir).replace(/\\/g, "/").toLowerCase();
  const endPort = startPort + MAX_PORT_SCAN - 1;
  let server = null;
  for (let port = startPort; port <= endPort; port++) {
    const available = await testPortOnAllHosts(port);
    if (available) {
      if (!server) server = createAdaptorServer({ fetch: fetch2 });
      try {
        await new Promise((resolveListener, rejectListener) => {
          const onError = (err) => {
            server.removeListener("listening", onListening);
            rejectListener(err);
          };
          const onListening = () => {
            server.removeListener("error", onError);
            resolveListener();
          };
          server.once("error", onError);
          server.once("listening", onListening);
          server.listen(port, host);
        });
        return { type: "started", server, port };
      } catch (err) {
        if (err.code === "EADDRINUSE") {
          continue;
        }
        throw err;
      }
    }
    if (!forceNew) {
      const detection = await detectHyperframesServer(
        port,
        normalizedDir,
        expectedServerBuildSignature,
        expectedBrowserGpuMode
      );
      if (detection.type === "match") {
        return { type: "already-running", port };
      }
      if (detection.type === "mismatch") {
        continue;
      }
    }
  }
  throw new Error(
    `Ports ${startPort}\u2013${endPort} are all in use. Use --port to specify a different starting port.`
  );
}

// src/utils/studioSelectionClient.ts
var VITE_STUDIO_DISCOVERY_PORTS = [5190];
var AmbiguousPreviewServerError = class extends Error {
  ports;
  constructor(servers) {
    const ports = servers.map((server) => server.port).sort((a, b) => a - b);
    super(
      `Multiple Studio preview servers match this project (${ports.join(", ")}). Pass --port <port> to choose one.`
    );
    this.name = "AmbiguousPreviewServerError";
    this.ports = ports;
  }
};
var PreviewServerPortMismatchError = class extends Error {
  requestedPort;
  ports;
  constructor(requestedPort, servers, hint = "") {
    const ports = servers.map((server) => server.port).sort((a, b) => a - b);
    super(
      `No Studio preview server for this project is running on port ${requestedPort}. Matching server port${ports.length === 1 ? "" : "s"}: ${ports.join(", ")}. Rerun with --port ${ports[0]}${ports.length > 1 ? " or omit --port to see all candidates" : ""}.${hint}`
    );
    this.name = "PreviewServerPortMismatchError";
    this.requestedPort = requestedPort;
    this.ports = ports;
  }
};
function normalizePath(path) {
  const resolved = resolve2(path);
  try {
    if (existsSync(resolved)) {
      return realpathSync(resolved).replace(/\\/g, "/").toLowerCase();
    }
  } catch {
  }
  return resolved.replace(/\\/g, "/").toLowerCase();
}
async function findPreviewServerForProject(projectDir, startPort = 3002, scan = scanActiveServers, fetchImpl = fetch, options = {}) {
  const normalizedProjectDir = normalizePath(projectDir);
  const servers = await scan(startPort);
  const embeddedServers = servers.filter(
    (server) => normalizePath(server.projectDir) === normalizedProjectDir
  );
  if (options.preferredPort !== void 0) {
    const preferred = embeddedServers.find((server) => server.port === options.preferredPort);
    if (preferred) return preferred;
    const viteServer = await findViteStudioServerForProject(normalizedProjectDir, fetchImpl, [
      options.preferredPort
    ]);
    if (viteServer) return viteServer;
    if (embeddedServers.length > 0) {
      throw new PreviewServerPortMismatchError(options.preferredPort, embeddedServers);
    }
    return null;
  }
  if (embeddedServers.length === 1) return embeddedServers[0];
  if (embeddedServers.length > 1) throw new AmbiguousPreviewServerError(embeddedServers);
  return findViteStudioServerForProject(normalizedProjectDir, fetchImpl);
}
function studioSelectionUrl(server) {
  return studioApiUrl(server, "selection");
}
function studioApiUrl(server, route) {
  const host = server.host ?? "127.0.0.1";
  return `http://${host}:${server.port}/api/projects/${encodeURIComponent(server.projectName)}/${route}`;
}
var LOOPBACK_HOSTS = ["127.0.0.1", "[::1]"];
async function findViteStudioServerForProject(normalizedProjectDir, fetchImpl, ports = VITE_STUDIO_DISCOVERY_PORTS) {
  for (const port of ports) {
    for (const host of LOOPBACK_HOSTS) {
      try {
        const response = await fetchImpl(`http://${host}:${port}/api/projects`);
        if (!response.ok) continue;
        const payload = await response.json();
        const project = payload.projects?.find(
          (candidate) => normalizePath(candidate.dir) === normalizedProjectDir
        );
        if (!project) continue;
        return {
          port,
          host,
          projectName: project.id,
          projectDir: project.dir,
          version: "studio-dev",
          pid: null
        };
      } catch {
      }
    }
  }
  return null;
}
async function fetchStudioSelection(server, fetchImpl = fetch) {
  const url = studioSelectionUrl(server);
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`selection endpoint returned ${response.status}`);
  }
  return await response.json();
}
async function fetchStudioLint(server, fetchImpl = fetch) {
  const url = studioApiUrl(server, "lint");
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`lint endpoint returned ${response.status}`);
  }
  return await response.json();
}

export {
  MAX_PORT_SCAN,
  scanActiveServers,
  activeServerOnPort,
  killActiveServers,
  findPortAndServe,
  AmbiguousPreviewServerError,
  PreviewServerPortMismatchError,
  findPreviewServerForProject,
  studioSelectionUrl,
  studioApiUrl,
  fetchStudioSelection,
  fetchStudioLint
};
