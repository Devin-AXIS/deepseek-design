/** Use the same authenticated template endpoints as the native editors. */
import type { TemplateCatalogItem } from "./original/types/src/templates.ts";
import { studioFetch } from "./studio-fetch.ts";
import { fetchWithTimeout } from "./original/app/src/app/lib/request-timeout.ts";
import type { StudioKind } from "./template-library-types.ts";

async function request(
  kind: StudioKind,
  action: string,
  values: Record<string, string>,
  init?: RequestInit,
) {
  const response = await fetchWithTimeout(
    (url, options) => studioFetch(kind, String(url), options),
    `/ipollowork-${kind}/api/${action}?${new URLSearchParams(values)}`,
    init,
    60_000,
  );
  if (!response.ok)
    throw new Error(
      `${kind === "design" ? "Design" : "Video"}: ${response.status}`,
    );
  return response;
}

/** Read only the selected plugin's catalog in the selected DSH workspace. */
export async function listLibraryTemplates(
  kind: StudioKind,
  workspaceId: string,
  signal?: AbortSignal,
): Promise<TemplateCatalogItem[]> {
  return (await request(kind, "templates", { workspaceId }, { signal })).json();
}

/** Read covers through the owner-only local plugin endpoint. */
export async function libraryTemplateCover(
  kind: StudioKind,
  workspaceId: string,
  templateId: string,
) {
  const response = await request(kind, "template-cover", {
    workspaceId,
    templateId,
  });
  return {
    data: await response.arrayBuffer(),
    contentType: response.headers.get("content-type"),
  };
}

/** Apply to a freshly created native session, preserving every existing project. */
export async function applyLibraryTemplate(
  kind: StudioKind,
  workspaceId: string,
  sessionId: string,
  templateId: string,
): Promise<void> {
  await request(
    kind,
    "template",
    {},
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ workspaceId, sessionId, templateId }),
    },
  );
}
