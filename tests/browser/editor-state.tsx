/** Real editor components with a deterministic API supplied by the browser test. */
import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { NativeEditor } from "../../packages/studio-core/src/native-editor.tsx";
import { DesignPanel } from "../../packages/studio-core/src/original/app/src/react-app/domains/session/design/design-panel.tsx";
import { useQueuedDocumentSave } from "../../packages/studio-core/src/original/app/src/app/lib/queued-document-save.ts";
import type { DesignStudioClient } from "../../packages/studio-core/src/original/design-studio/src/host.ts";
import { hydrateDesignMedia, designMediaTools } from "../../packages/studio-core/src/original/app/src/react-app/domains/session/design/design-media.ts";
import { buildDesignPreviewDocument } from "../../packages/studio-core/src/original/app/src/react-app/domains/session/design/design-html-runtime.ts";
import {
  ResourceLibrary,
  insertResourceHtml,
} from "../../packages/studio-core/src/resource-library.tsx";

async function api(path: string, body?: unknown) {
  const response = await fetch(
    `/fixture/${path}`,
    body === undefined
      ? undefined
      : {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        },
  );
  const data = await response.json();
  if (!response.ok)
    throw Object.assign(new Error(data.message), { status: response.status });
  return data;
}
const client: DesignStudioClient = {
  getTemplateSession: () => api("session"),
  getDesignHistory: () => api("history"),
  selectDesignVersion: (_workspaceId, _sessionId, path) =>
    api("selection", { path }),
  readWorkspaceFile: (_workspaceId, path) =>
    api(`file?path=${encodeURIComponent(path)}`),
  writeWorkspaceFile: (_workspaceId, input) => api("file", input),
  listWorkspaceFiles: async () => [],
  downloadWorkspaceFile: async (_workspaceId, path) => {
    const file = await api(`file?path=${encodeURIComponent(path)}`);
    return { data: new TextEncoder().encode(file.content).buffer, filename: path, contentType: null };
  },
  callStorage: async () => ({
    ok: false,
    error: "unused",
    message: "Unused in this fixture",
  }),
};
const roots = new Map<string, Root>();
const fixture = {
  preview(html: string, fixedSlide: boolean) {
    return buildDesignPreviewDocument(html, true, "", true, fixedSlide, fixedSlide, "drag-regression");
  },
  async hydrate(source: string, files: Record<string, string>) {
    const result = await hydrateDesignMedia(source, "site/index.html", async path => {
      if (!(path in files)) throw new Error("Missing fixture: " + path);
      return { data: new TextEncoder().encode(files[path]).buffer, contentType: null };
    });
    const doc = new DOMParser().parseFromString(result.source, "text/html");
    doc.querySelectorAll<HTMLElement>("[data-ipw-preview-stylesheet],[data-ipw-preview-script]").forEach(designMediaTools().restore);
    return { source: result.source, saved: doc.documentElement.outerHTML };
  },
  mount(id: string) {
    const root = createRoot(document.getElementById(id)!);
    roots.set(id, root);
    root.render(
      <NativeEditor language="en" onOpenSettings={() => {}}>
        <DesignPanel
          sessionId="session"
          workspaceId="workspace"
          client={client}
          onAskAi={() => {}}
          onSendSelection={async (context, instruction) => { await api("selection-prompt", {context, instruction}); }}
          onSendMarkup={async (path, instruction, image) => {
            const bytes = new Uint8Array(await image.arrayBuffer());
            let binary = "";
            for (const byte of bytes) binary += String.fromCharCode(byte);
            await api("markup", {path, instruction, image: btoa(binary), type: image.type});
          }}
          features={{ publish: false, templates: false }}
          resourceLibrary={({ filePath, source, slideIndex, insert }) => (
            <ResourceLibrary
              embedded
              kind="design"
              workspaceId="workspace"
              sessionId="session"
              scopeKey={filePath}
              onInsert={(html) =>
                insert(insertResourceHtml(source, html, slideIndex))
              }
            />
          )}
        />
      </NativeEditor>,
    );
  },
  unmount(id: string) {
    roots.get(id)?.unmount();
    roots.delete(id);
  },
  mountSaver(id: string) {
    const root = createRoot(document.getElementById(id)!);
    roots.set(id, root);
    root.render(<SaveProbe />);
  },
  changeTokens: (_content: string) => {},
};
function SaveProbe() {
  const save = useQueuedDocumentSave(
    "fixture:tokens",
    { read: () => api("tokens"), write: (input) => api("tokens", input) },
    () => {},
  );
  fixture.changeTokens = save.value.schedule;
  return <output>{save.state.content}</output>;
}
Object.assign(window, { editorFixture: fixture });
