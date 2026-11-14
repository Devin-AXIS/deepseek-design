import type { TemplateCatalogItem, TemplateSessionSnapshot } from "@ipollowork/types/templates";

export type DesignStudioCatalogEntry = {
  path: string;
  kind: "file" | "dir";
  size: number;
  mtimeMs: number;
  revision: string;
};

/** HTML snapshots and the selected preview; resuming a version is an explicit Design operation. */
export type DesignStudioHistory = {
  versions: DesignStudioCatalogEntry[];
  generation: string;
  selectedPath: string;
  selectionRevision: number;
  /** Zero until meaningful content exists; manual saves retain this number. */
  currentVersion?: number;
};

export type DesignStudioFileContent = {
  path: string;
  content: string;
  bytes: number;
  updatedAt: number;
};

export type DesignStudioFileWriteResult = {
  ok: boolean;
  path: string;
  bytes: number;
  updatedAt: number;
  revision?: string;
};

export type DesignStudioBinaryFile = {
  data: ArrayBuffer;
  contentType: string | null;
  filename: string | null;
};

export type DesignStudioStorageResult =
  | {
    ok: true;
    extensionId: string;
    action: string;
    result: unknown;
    context?: Record<string, unknown>;
  }
  | {
    ok: false;
    error: string;
    message: string;
  };

/**
 * The complete host surface consumed by Design Studio. It intentionally
 * mirrors the stable iPolloWork server methods so the built-in app needs no
 * wrapper object while external hosts can provide a small adapter.
 */
export interface DesignStudioClient {
  /** Observe file revisions through the host; unavailable observers retain polling as a fallback. */
  watchWorkspaceFile?(workspaceId: string, path: string, changed: (state: "ready" | "changed" | "unavailable") => void): () => void;
  getTemplateSession(workspaceId: string, sessionId: string): Promise<TemplateSessionSnapshot>;
  /** Read native website versions without scanning the entire workspace. */
  getDesignHistory?(workspaceId: string, sessionId: string): Promise<DesignStudioHistory>;
  /** Select a preview version; selection alone leaves the live file in place. */
  selectDesignVersion?(workspaceId: string, sessionId: string, path: string): Promise<DesignStudioHistory>;
  listWorkspaceFiles(workspaceId: string, prefix?: string): Promise<DesignStudioCatalogEntry[]>;
  readWorkspaceFile(workspaceId: string, path: string): Promise<DesignStudioFileContent>;
  writeWorkspaceFile(
    workspaceId: string,
    payload: { path: string; content: string; baseUpdatedAt?: number | null; createOnly?: boolean; force?: boolean },
  ): Promise<DesignStudioFileWriteResult>;
  downloadWorkspaceFile(workspaceId: string, path: string): Promise<DesignStudioBinaryFile>;
  callStorage(
    action: "status" | "upload_workspace_file" | "publish_workspace_files",
    args?: Record<string, unknown>,
    context?: Record<string, unknown>,
  ): Promise<DesignStudioStorageResult>;
  listDesignStudioTemplates?(
    workspaceId: string,
  ): Promise<TemplateCatalogItem[]>;
  getDesignStudioTemplateCover?(
    workspaceId: string,
    templateId: string,
  ): Promise<DesignStudioBinaryFile>;
  applyDesignStudioTemplate?(
    workspaceId: string,
    sessionId: string,
    templateId: string,
  ): Promise<TemplateSessionSnapshot>;
}

export type DesignStudioFeatures = {
  /** Object-storage publishing is host-owned and is available in iPolloWork. */
  publish: boolean;
  /** External hosts can expose their bounded first-party template catalog. */
  templates: false | { title: string; description: string };
};

export const IPOLLOWORK_DESIGN_STUDIO_FEATURES: DesignStudioFeatures = {
  publish: true,
  templates: false,
};
