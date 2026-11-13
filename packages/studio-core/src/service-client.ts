/** Authenticated client for the services implemented by the native Studio plugin. */
import { z } from "zod";
import { studioFetch } from "./studio-fetch.ts";
import { fetchWithTimeout } from "./original/app/src/app/lib/request-timeout.ts";
import {
  IMAGE_GENERATION_REQUEST_TIMEOUT_MS,
  VIDEO_SUBMISSION_REQUEST_TIMEOUT_MS,
  type StudioServiceClient,
  type StudioActionCall,
  type StudioFileDownload,
} from "./original/app/src/app/lib/studio-client.ts";

const errorBody = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});
const fileContent = z.object({
  path: z.string(),
  content: z.string(),
  bytes: z.number(),
  updatedAt: z.number(),
});
const fileWrite = z.object({
  ok: z.boolean(),
  path: z.string(),
  bytes: z.number(),
  updatedAt: z.number(),
  revision: z.string().optional(),
});
const fileDeletes = z.array(
  z.object({ ok: z.boolean(), path: z.string(), code: z.string().optional() }),
);
const actionResult = z.discriminatedUnion("ok", [
  z.object({
    ok: z.literal(true),
    extensionId: z.string(),
    action: z.string(),
    result: z.unknown(),
    context: z.record(z.string(), z.unknown()).optional(),
  }),
  z.object({ ok: z.literal(false), error: z.string(), message: z.string() }),
]);

/** Preserve HTTP status and service codes for the original editors' recovery handling. */
export class StudioServiceError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "StudioServiceError";
  }
}

/** Bind every service request to the active plugin's local API and session scope. */
export function createStudioServiceClient(
  kind: "design" | "video",
  scope?: { workspaceId: string; sessionId: string },
): StudioServiceClient {
  const baseUrl = new URL(
    `/ipollowork-${kind}/api/services`,
    window.location.href,
  ).href;
  const workspace = (workspaceId: string) =>
    `/workspace/${encodeURIComponent(workspaceId)}`;
  const context = (value?: Record<string, unknown>) => ({ ...value, ...scope });
  async function request(
    path: string,
    init: RequestInit = {},
    timeoutMs = 60_000,
  ) {
    const response = await fetchWithTimeout(
      (input, options) => studioFetch(kind, String(input), options),
      baseUrl + path,
      init,
      timeoutMs,
    );
    if (!response.ok) {
      const detail = errorBody.safeParse(
        await response.json().catch((_error: unknown) => null),
      );
      throw new StudioServiceError(
        response.status,
        detail.success
          ? (detail.data.code ?? "request_failed")
          : "invalid_response",
        detail.success
          ? (detail.data.message ??
              `Studio request failed (${response.status}).`)
          : `Studio returned an invalid response (${response.status}).`,
      );
    }
    return response;
  }
  async function json<T>(
    path: string,
    init?: RequestInit,
    timeoutMs?: number,
  ): Promise<T> {
    const response = await request(path, init, timeoutMs);
    // Template and plugin metadata retain their original shared wire types.
    return response.json();
  }
  const post = (body: unknown): RequestInit => ({
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  async function binary(
    path: string,
    init?: RequestInit,
  ): Promise<StudioFileDownload> {
    const response = await request(path, init);
    const disposition = response.headers.get("content-disposition") ?? "";
    const match = disposition.match(
      /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i,
    );
    const name = match?.[1] ?? match?.[2] ?? null;
    return {
      data: await response.arrayBuffer(),
      contentType: response.headers.get("content-type"),
      filename: name ? decodeURIComponent(name) : null,
    };
  }
  async function callExtensionAction(
    payload: StudioActionCall,
    options?: { signal?: AbortSignal },
  ) {
    const timeout =
      payload.extensionId === "openai-image-generation" &&
      payload.action !== "status"
        ? IMAGE_GENERATION_REQUEST_TIMEOUT_MS
        : payload.extensionId === "video-generation" &&
            payload.action === "submit"
          ? VIDEO_SUBMISSION_REQUEST_TIMEOUT_MS
          : 60_000;
    return actionResult.parse(
      await json(
        "/experimental/extensions/call",
        {
          ...post({ ...payload, context: context(payload.context) }),
          signal: options?.signal,
        },
        timeout,
      ),
    );
  }
  return {
    baseUrl,
    callExtensionAction,
    callMedia: (action, args, input) =>
      callExtensionAction({
        extensionId: "media",
        action,
        args,
        context: input,
      }),
    callStorage: (action, args = {}, input) =>
      callExtensionAction({
        extensionId: "storage",
        action,
        args,
        context: input,
      }),
    listPluginPackages: (id) => json(workspace(id) + "/plugin-packages"),
    getPluginPackageUiResource: (id, pluginId, resourceId) =>
      json(
        workspace(id) +
          `/plugin-packages/${encodeURIComponent(pluginId)}/ui/${encodeURIComponent(resourceId)}`,
      ),
    listSessionArtifacts: (id, sessionId, cursor = null) =>
      json(
        workspace(id) +
          `/artifacts?sessionId=${encodeURIComponent(sessionId)}${cursor === null ? "" : `&cursor=${cursor}`}`,
      ),
    readWorkspaceFile: async (id, path) =>
      fileContent.parse(
        await json(
          workspace(id) + `/files/content?path=${encodeURIComponent(path)}`,
        ),
      ),
    writeWorkspaceFile: async (id, input) =>
      fileWrite.parse(
        await json(workspace(id) + "/files/content", post(input)),
      ),
    writeWorkspaceBinaryFile: async (id, { data, ...input }) => {
      const bytes = new Uint8Array(data);
      let encoded = "";
      for (let offset = 0; offset < bytes.length; offset += 0x8000)
        encoded += String.fromCharCode(
          ...bytes.subarray(offset, offset + 0x8000),
        );
      return fileWrite.parse(
        await json(
          workspace(id) + "/files/raw",
          post({ ...input, dataBase64: btoa(encoded) }),
        ),
      );
    },
    uploadWorkspaceMedia: async (id, path, file) => {
      const body = new FormData();
      body.set("file", file);
      return fileWrite.parse(
        await json(
          workspace(id) + `/files/raw?path=${encodeURIComponent(path)}`,
          { method: "POST", body },
        ),
      );
    },
    downloadWorkspaceFile: (id, path) =>
      binary(workspace(id) + `/files/raw?path=${encodeURIComponent(path)}`),
    deleteWorkspaceFiles: async (id, files) =>
      fileDeletes.parse(
        await json(workspace(id) + "/files/delete", post({ files })),
      ),
    getTemplateSession: (id, sessionId) =>
      json(
        workspace(id) + `/template-sessions/${encodeURIComponent(sessionId)}`,
      ),
    validateTemplateFromSession: (id, sessionId) =>
      json(
        workspace(id) + "/templates/from-session/validate",
        post({ sessionId }),
      ),
    saveTemplateFromSession: (id, input) =>
      json(workspace(id) + "/templates/from-session", post(input)),
    exportTemplateFromSession: (id, input) =>
      binary(workspace(id) + "/templates/from-session/package", post(input)),
  };
}
