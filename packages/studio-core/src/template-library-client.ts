/** Use the same authenticated template endpoints as the native editors. */
import { templateManifestV1Schema, type TemplateCatalogItem } from "./original/types/src/templates.ts";
import { studioFetch } from "./studio-fetch.ts";
import { fetchWithTimeout } from "./original/app/src/app/lib/request-timeout.ts";
import type { StudioKind, DesignTemplateSource } from "./template-library-types.ts";

export async function listSourceTemplates(source: DesignTemplateSource, signal?: AbortSignal): Promise<TemplateCatalogItem[]> {
  const entries = await source.list(signal);
  if (entries.length > 1000) throw Error('Template source is too large.');
  return entries.map(item => {
    if (!item.id.startsWith(source.id + '.')) throw Error('Invalid template source identity.');
    return { manifest: templateManifestV1Schema.parse({
      schemaVersion: 1, id: item.id, title: item.title.slice(0, 96), description: (item.description || item.sourceName).slice(0, 240),
      version: item.version, kind: 'design', category: 'other', subcategory: source.id, surface: 'design',
      cover: 'cover.svg', entry: 'entry.html', source: { name: item.sourceName.slice(0, 96), license: 'Organization access' },
      designSystem: { tokenVersion: 1, editableGroups: ['theme', 'typography'] },
      applyChecklist: ['Edit the supplied HTML for the requested content.'], minimumAppVersion: '1.0.0',
    }), sourceType: 'bundled', installed: true, installedVersion: item.version, updateAvailable: false, verified: false };
  });
}

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
  source?: DesignTemplateSource,
  version?: string,
): Promise<void> {
  if (source) {
    if (kind !== 'design' || !version) throw Error('Invalid Design template source.');
    const content = await source.read(templateId, version);
    const created = await request(kind, 'document', {}, { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId, mode: 'new', path: 'design' }) });
    const document: unknown = await created.json();
    if (!document || typeof document !== 'object' || !('entry' in document) || typeof document.entry !== 'string') throw Error('Invalid Design document.');
    const loaded: unknown = await (await request(kind, 'file', { workspaceId, sessionId, path: document.entry })).json();
    if (!loaded || typeof loaded !== 'object' || !('updatedAt' in loaded) || typeof loaded.updatedAt !== 'number')
      throw Error('Reload the Design document before applying a template.');
    await request(kind, 'file', {}, { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ workspaceId, sessionId, path: document.entry, content, baseUpdatedAt: loaded.updatedAt }) });
    return;
  }
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
