/** The service methods available to the independently installed Studio editors. */
import type {
  PluginManifest,
  PluginEngineCompatibility,
} from "@ipollowork/types/plugins";
import type { SessionArtifactPage } from "@ipollowork/types/workspace";
import type {
  TemplateCatalogItem,
  TemplateCategory,
  TemplateManifestV1,
  TemplateSessionSnapshot,
  TemplateValidationReport,
} from "@ipollowork/types/templates";

export const IMAGE_GENERATION_REQUEST_TIMEOUT_MS = 420_000;
export const VIDEO_SUBMISSION_REQUEST_TIMEOUT_MS = 180_000;

export type StudioPluginPackageItem = {
  pluginId: string;
  name: string;
  version: string;
  enabled: boolean;
  disabledResourceIds: string[];
  previousVersion: string | null;
  manifest: PluginManifest;
  integrity: { sha256: string; status: "verified" | "unsigned" };
  activeEngineId?: string;
  engineCompatibility?: PluginEngineCompatibility[];
};
export type StudioPluginUiResource = {
  pluginId: string;
  version: string;
  resource: PluginManifest["resources"][number] & {
    type: "ui";
    path: string;
    ui: NonNullable<PluginManifest["resources"][number]["ui"]>;
  };
  html: string;
};
export type StudioActionCall = {
  extensionId: string;
  action: string;
  args?: Record<string, unknown>;
  context?: Record<string, unknown>;
};
export type StudioActionResult =
  | {
      ok: true;
      extensionId: string;
      action: string;
      result: unknown;
      context?: Record<string, unknown>;
    }
  | { ok: false; error: string; message: string };
export type StudioMediaAction =
  | "status"
  | "speech_synthesize"
  | "speech_synthesize_workspace_file"
  | "voice_clone"
  | "voice_list"
  | "voice_clone_workspace_file"
  | "speech_transcribe"
  | "speech_recognize_realtime"
  | "speech_translate"
  | "video_generate"
  | "video_edit"
  | "digital_human_generate"
  | "task_get";
export type StudioStorageAction = "status" | "upload_workspace_file";
export type StudioFileContent = {
  path: string;
  content: string;
  bytes: number;
  updatedAt: number;
};
export type StudioFileWrite = {
  ok: boolean;
  path: string;
  bytes: number;
  updatedAt: number;
  revision?: string;
};
export type StudioFileDownload = {
  data: ArrayBuffer;
  contentType: string | null;
  filename: string | null;
};
export type StudioTemplateInput = {
  sessionId: string;
  category: TemplateCategory;
  title: string;
  description?: string;
  subcategory?: string;
  style?: TemplateManifestV1["style"];
  tags?: string[];
};

/** Only implemented native-plugin routes are exposed; no old application services are implied. */
export interface StudioServiceClient {
  readonly baseUrl: string;
  callExtensionAction(
    payload: StudioActionCall,
    options?: { signal?: AbortSignal },
  ): Promise<StudioActionResult>;
  callMedia(
    action: StudioMediaAction,
    args: Record<string, unknown>,
    context?: Record<string, unknown>,
  ): Promise<StudioActionResult>;
  callStorage(
    action: StudioStorageAction,
    args?: Record<string, unknown>,
    context?: Record<string, unknown>,
  ): Promise<StudioActionResult>;
  listPluginPackages(
    workspaceId: string,
  ): Promise<{ items: StudioPluginPackageItem[] }>;
  getPluginPackageUiResource(
    workspaceId: string,
    pluginId: string,
    resourceId: string,
  ): Promise<StudioPluginUiResource>;
  listSessionArtifacts(
    workspaceId: string,
    sessionId: string,
    cursor?: number | null,
  ): Promise<SessionArtifactPage>;
  readWorkspaceFile(
    workspaceId: string,
    path: string,
  ): Promise<StudioFileContent>;
  writeWorkspaceFile(
    workspaceId: string,
    input: {
      path: string;
      content: string;
      baseUpdatedAt?: number | null;
      force?: boolean;
    },
  ): Promise<StudioFileWrite>;
  writeWorkspaceBinaryFile(
    workspaceId: string,
    input: {
      path: string;
      data: ArrayBuffer;
      baseUpdatedAt?: number | null;
      force?: boolean;
    },
  ): Promise<StudioFileWrite>;
  uploadWorkspaceMedia(
    workspaceId: string,
    path: string,
    file: File,
  ): Promise<StudioFileWrite>;
  downloadWorkspaceFile(
    workspaceId: string,
    path: string,
  ): Promise<StudioFileDownload>;
  deleteWorkspaceFiles(
    workspaceId: string,
    files: Array<{ path: string; recursive?: boolean }>,
  ): Promise<Array<{ ok: boolean; path: string; code?: string }>>;
  getTemplateSession(
    workspaceId: string,
    sessionId: string,
  ): Promise<TemplateSessionSnapshot>;
  validateTemplateFromSession(
    workspaceId: string,
    sessionId: string,
  ): Promise<TemplateValidationReport>;
  saveTemplateFromSession(
    workspaceId: string,
    input: StudioTemplateInput,
    scope?: "personal",
  ): Promise<{ item: TemplateCatalogItem }>;
  exportTemplateFromSession(
    workspaceId: string,
    input: StudioTemplateInput,
  ): Promise<StudioFileDownload>;
}
