/** Native workspace fields consumed by the retained media and template services. */
export interface WorkspaceInfo {
  id: string;
  name: string;
  path: string;
  workspaceType: "local" | "remote";
}

/** State belongs to one native Studio plugin inside a DSH workspace. */
export interface ServerConfig {
  configPath: string;
  workspaces: WorkspaceInfo[];
  readOnly: boolean;
}

/** Structured failures returned by retained media service implementations. */
export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}
