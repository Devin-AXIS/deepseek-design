import { serviceEnvironment } from "../../../../service-runtime.ts";
/** Original isolated image-provider transport; conversation engines are owned by DSH. */
import { existsSync } from "node:fs";
import { StdioJsonRpcProcess } from "./stdio-json-rpc-runtime.js";
const LOOPBACK_PROXY_BYPASS_HOSTS: readonly string[] = ["127.0.0.1", "localhost", "::1"];

function codexChildEnvironment(environment: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const entries = [environment.NO_PROXY, environment.no_proxy]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
  const seen = new Set(entries.map((value) => value.toLowerCase()));
  for (const host of LOOPBACK_PROXY_BYPASS_HOSTS) {
    if (seen.has(host)) continue;
    entries.push(host);
    seen.add(host);
  }
  const noProxy = entries.join(",");
  return {
    ...environment,
    // Codex uses the loopback iPolloWork MCP. A desktop VPN/proxy must never
    // route that request off-device; keep both spellings for child runtimes.
    NO_PROXY: noProxy,
    no_proxy: noProxy,
  };
}

/** Shared CLI resolution for conversation runtimes and isolated native image turns. */
export function createCodexAppServer(input: {
  cwd: string;
  environment: NodeJS.ProcessEnv;
  args?: readonly string[];
}): StdioJsonRpcProcess {
  const configuredCli = serviceEnvironment().IPOLLOWORK_CODEX_CLI?.trim() ?? "";
  if (configuredCli && !existsSync(configuredCli)) {
    throw new CodexHarnessUnavailableError(`Codex Harness runtime was not found at ${configuredCli}`);
  }
  const wrapper = configuredCli.endsWith(".js");
  const command = wrapper
    ? process.versions.electron
      ? process.execPath
      : serviceEnvironment().IPOLLOWORK_NODE_BIN?.trim() || (process.platform === "win32" ? "node.exe" : "node")
    : configuredCli || (process.platform === "win32" ? "codex.exe" : "codex");
  return new StdioJsonRpcProcess({
    name: "Codex Harness",
    command,
    args: [...(wrapper ? [configuredCli] : []), "app-server", "--stdio", ...(input.args ?? [])],
    cwd: input.cwd,
    env: codexChildEnvironment({
      ...input.environment,
      ...(wrapper && process.versions.electron ? { ELECTRON_RUN_AS_NODE: "1" } : {}),
    }),
  });
}

export class CodexHarnessUnavailableError extends Error {
  readonly code = "codex_harness_unavailable";

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "CodexHarnessUnavailableError";
  }
}
