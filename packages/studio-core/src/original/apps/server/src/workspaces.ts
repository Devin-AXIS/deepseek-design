import { resolve, sep } from "node:path";
import type { WorkspaceInfo } from "./types.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function comparablePath(value: string): string {
  const normalized = resolve(value);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

/** The current engine directory identifies the workspace; process-level ids can be stale across sessions. */
export function findWorkspaceForContext(
  workspaces: readonly WorkspaceInfo[],
  context: unknown,
): WorkspaceInfo | undefined {
  const record = isRecord(context) ? context : {};
  const candidates = [record.directory, record.worktree]
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map((value) => comparablePath(value.trim()));

  for (const candidate of candidates) {
    const workspace = workspaces.find((entry) => {
      const roots = [entry.path]
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
        .map((value) => comparablePath(value.trim()));
      return roots.some((root) => candidate === root || candidate.startsWith(`${root}${sep}`));
    });
    if (workspace) return workspace;
  }

  const workspaceId = typeof record.workspaceId === "string" ? record.workspaceId.trim() : "";
  return workspaceId ? workspaces.find((workspace) => workspace.id === workspaceId) : undefined;
}
