import {
  StudioServiceError,
  createStudioServiceClient,
} from "../../../studio-core/src/service-client.ts";
import { studioFetch } from "../../../studio-core/src/studio-fetch.ts";
import type {
  VideoStudioClient,
  VideoStudioRuntime,
  VideoStudioTemplateApplyResult,
} from "@ipollowork/video-studio";

export async function resolveVideoProject(
  scope: { workspaceId: string; sessionId: string },
  path?: string,
): Promise<{ project: string }> {
  return path
    ? api("/document", {
        method: "POST",
        body: JSON.stringify({ ...scope, path }),
      })
    : api(`/document${query(scope)}`);
}

const API_ROOT = "/ipollowork-video/api";

function query(values: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values))
    if (value) params.set(key, value);
  return `?${params.toString()}`;
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await studioFetch("video", `${API_ROOT}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "content-type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const detail: unknown = await response.json().catch(() => null);
    const message =
      detail && typeof detail === "object"
        ? Reflect.get(detail, "message")
        : null;
    throw new StudioServiceError(
      response.status,
      "request_failed",
      typeof message === "string"
        ? message
        : `iVideo request failed (${response.status}).`,
    );
  }
  return response.json();
}

export function createDeepSeekVideoStudioHost(scope: {
  workspaceId: string;
  sessionId: string;
  viewId: string;
  projectDirectory?: string;
}): { client: VideoStudioClient; runtime: VideoStudioRuntime } {
  const session = () =>
    api<VideoStudioTemplateApplyResult & { reused: boolean }>(
      `/session${query(scope)}`,
    );
  const client: VideoStudioClient = {
    ...createStudioServiceClient("video", scope),
    readWorkspaceFile: (_workspaceId, path) =>
      api(
        `/file${query({ workspaceId: scope.workspaceId, sessionId: scope.sessionId, projectDirectory: scope.projectDirectory, path })}`,
      ),
    writeWorkspaceFile: (_workspaceId, payload) =>
      api("/file", {
        method: "POST",
        body: JSON.stringify({
          workspaceId: scope.workspaceId,
          sessionId: scope.sessionId,
          projectDirectory: scope.projectDirectory,
          ...payload,
        }),
      }),
    listVideoStudioTemplates: () =>
      api(`/templates${query({ workspaceId: scope.workspaceId })}`),
    getVideoStudioTemplateCover: async (_workspaceId, templateId) => {
      const response = await studioFetch(
        "video",
        `${API_ROOT}/template-cover${query({ workspaceId: scope.workspaceId, templateId })}`,
        {},
      );
      if (!response.ok)
        throw new Error(
          `Could not load the iVideo template cover (${response.status}).`,
        );
      return {
        data: await response.arrayBuffer(),
        contentType: response.headers.get("content-type"),
      };
    },
    applyVideoStudioTemplate: (_workspaceId, _sessionId, templateId) =>
      api("/template", {
        method: "POST",
        body: JSON.stringify({ ...scope, templateId }),
      }),
  };
  const runtime: VideoStudioRuntime = {
    start: async () => {
      const active = await session();
      return { ok: true, port: active.port, reused: active.reused };
    },
    stop: async () => {
      await api("/release", {
        method: "POST",
        keepalive: true,
        body: JSON.stringify(scope),
      });
      return { ok: true };
    },
  };
  return { client, runtime };
}
