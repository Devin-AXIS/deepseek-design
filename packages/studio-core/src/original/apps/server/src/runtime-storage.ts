import { dirname, join } from "node:path";

import type { ServerConfig } from "./types.js";

export function runtimeDbPath(config: ServerConfig): string {
  if (!config.configPath) throw new Error("A native Studio state directory is required.");
  return join(dirname(config.configPath), "runtime.sqlite");
}

/** Directory for engine-neutral server runtime state and derived files. */
export function runtimeStorageDir(config: ServerConfig): string {
  return dirname(runtimeDbPath(config));
}
