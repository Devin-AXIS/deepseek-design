/** Types shared by the extracted Studio UI without the former application client. */
export const IMAGE_STUDIO_EDIT_RESULT = "ipollowork:image-studio:edit-result";

export type ImageStudioAiReference = {
  workbenchRequestId?: string;
  sourcePath: string;
  sourceName: string;
  imageWidth: number;
  imageHeight: number;
  model?: string;
  kind: "selection" | "point";
  selection?: { left: number; top: number; right: number; bottom: number };
  point?: { x: number; y: number };
};

export const SETTINGS_TAB_VALUES = [
  "general",
  "ai",
  "engines",
  "preferences",
  "permissions",
  "shell",
  "cloud-account",
  "connect",
  "cloud-marketplaces",
  "cloud-providers",
  "skills",
  "memory",
  "extensions",
  "authorizations",
  "environment",
  "advanced",
  "appearance",
  "updates",
  "recovery",
  "debug",
] as const;

export type SettingsTab = (typeof SETTINGS_TAB_VALUES)[number];

export type BrowserController = "agent" | "human";
export type BrowserDecisionEngine = "agent" | "jev";
export type BrowserActivity = {
  status: "idle" | "acting" | "executed" | "verified" | "paused" | "failed";
  actionCount: number;
  message?: string;
};

/** Browser identity is profile-scoped; page control and progress are task-scoped. */
export type BrowserPanelTab = {
  id: string;
  type: "browser";
  label: string;
  url: string;
  sessionId?: string | null;
  profileId?: string | null;
  controller?: BrowserController;
  decisionEngine?: BrowserDecisionEngine;
  decisionStatus?: "pending" | "ready" | "unavailable";
  activity?: BrowserActivity;
  favicon: string | null;
  status: "loading" | "ready";
  canGoBack: boolean;
  canGoForward: boolean;
};
