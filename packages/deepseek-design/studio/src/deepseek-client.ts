import { createStudioServiceClient } from "../../../studio-core/src/service-client.ts";
const services = createStudioServiceClient("design");
import { studioFetch } from "../../../studio-core/src/studio-fetch.ts";
import type {
  DesignStudioClient,
  DesignStudioStorageResult,
} from "../../../studio-core/src/original/design-studio/src/host";

const API_ROOT = "/ipollowork-design/api";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await studioFetch("design", `${API_ROOT}${path}`, {
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
    throw new Error(
      typeof message === "string"
        ? message
        : `Design Studio request failed (${response.status}).`,
    );
  }
  return response.json();
}

function query(values: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
  }
  return `?${params.toString()}`;
}

export const deepSeekDesignStudioClient: DesignStudioClient = {
  getDesignHistory: (workspaceId, sessionId) =>
    api(`/history${query({ workspaceId, sessionId })}`),
  selectDesignVersion: async (workspaceId, sessionId, path) => {
    await api("/history/selection", {
      method: "POST",
      body: JSON.stringify({ workspaceId, sessionId, path }),
    });
  },
  getTemplateSession: (workspaceId, sessionId) =>
    api(`/session${query({ workspaceId, sessionId })}`),
  listWorkspaceFiles: (workspaceId, prefix) =>
    api(`/files${query({ workspaceId, prefix })}`),
  readWorkspaceFile: (workspaceId, path) =>
    api(`/file${query({ workspaceId, path })}`),
  writeWorkspaceFile: (workspaceId, payload) =>
    api("/file", {
      method: "POST",
      body: JSON.stringify({ workspaceId, ...payload }),
    }),
  downloadWorkspaceFile: async (workspaceId, path) => {
    const response = await studioFetch(
      "design",
      `${API_ROOT}/raw${query({ workspaceId, path })}`,
      {},
    );
    if (!response.ok) {
      const detail: unknown = await response.json().catch(() => null);
      const message =
        detail && typeof detail === "object"
          ? Reflect.get(detail, "message")
          : null;
      throw new Error(
        typeof message === "string" ? message : `Could not read ${path}.`,
      );
    }
    const disposition = response.headers.get("content-disposition");
    return {
      data: await response.arrayBuffer(),
      contentType: response.headers.get("content-type"),
      filename: /filename="([^"]+)"/.exec(disposition ?? "")?.[1] ?? null,
    };
  },
  callStorage: services.callStorage,
  listDesignStudioTemplates: (workspaceId) =>
    api(`/templates${query({ workspaceId })}`),
  getDesignStudioTemplateCover: async (workspaceId, templateId) => {
    const response = await studioFetch(
      "design",
      `${API_ROOT}/template-cover${query({ workspaceId, templateId })}`,
      {},
    );
    if (!response.ok)
      throw new Error(`Could not load template cover (${response.status}).`);
    return {
      data: await response.arrayBuffer(),
      contentType: response.headers.get("content-type"),
      filename: null,
    };
  },
  applyDesignStudioTemplate: (workspaceId, sessionId, templateId) =>
    api("/template", {
      method: "POST",
      body: JSON.stringify({ workspaceId, sessionId, templateId }),
    }),
};
