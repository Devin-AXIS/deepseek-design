/** Native DSH supplies the workspace; the original service consumes its explicit identity. */
import { workspaceForContext } from "./extensions/storage.js";
import type { ServerConfig } from "./types.js";
export function workspaceIdForPluginContext(config: ServerConfig, context: unknown): string {
  return workspaceForContext(config,typeof context === "object" && context !== null && !Array.isArray(context) ? {...context} : {}).id;
}
