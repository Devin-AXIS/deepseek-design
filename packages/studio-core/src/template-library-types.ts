/** Native navigation and renderer inputs for the shared template library. */
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import type { WorkspaceId } from "@deepseek-ai/dsh-workspace/types";

export type StudioKind = "design" | "video";

/** Optional native plugin sources. Reads must recheck the member's current permission. */
export interface DesignTemplateSource {
  id: string;
  title: string;
  list(signal?: AbortSignal): Promise<readonly { id: string; title: string; description: string; version: string; sourceName: string }[]>;
  read(id: string, version: string): Promise<string>;
}
export interface DesignTemplateSources {
  getSnapshot(): readonly DesignTemplateSource[];
  subscribe(listener: () => void): () => void;
  register(source: DesignTemplateSource): () => void;
}

export interface TemplateLibraryProps {
  sources?: readonly DesignTemplateSource[];
  sourceRevision?: number;
  language: string;
  kinds: readonly StudioKind[];
  workspaces: readonly { workspaceId: WorkspaceId; title: string }[];
  createSession: (workspaceId: WorkspaceId) => Promise<SessionId>;
  openSession: (kind: StudioKind, sessionId: SessionId) => void;
  openSettings: () => void;
}

declare module "@deepseek-ai/cordis" {
  interface Context { ipolloDesignTemplates: DesignTemplateSources }
  interface Events {
    /** @mode broadcast @param kind Target editor. @param sessionId Created template session. */
    "ipollo/studio-open"(kind: StudioKind, sessionId: SessionId): void;
  }
}
