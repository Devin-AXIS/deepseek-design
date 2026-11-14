/** Native navigation and renderer inputs for the shared template library. */
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import type { WorkspaceId } from "@deepseek-ai/dsh-workspace/types";

export type StudioKind = "design" | "video";

export interface TemplateLibraryProps {
  language: string;
  kinds: readonly StudioKind[];
  workspaces: readonly { workspaceId: WorkspaceId; title: string }[];
  createSession: (workspaceId: WorkspaceId) => Promise<SessionId>;
  openSession: (kind: StudioKind, sessionId: SessionId) => void;
  openSettings: () => void;
}

declare module "@deepseek-ai/cordis" {
  interface Events {
    /** @mode broadcast @param kind Target editor. @param sessionId Created template session. */
    "ipollo/studio-open"(kind: StudioKind, sessionId: SessionId): void;
  }
}
