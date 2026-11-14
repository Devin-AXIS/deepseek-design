/** Original React renderer hosted directly in a native DSH slot, without a page or iframe. */
import { createRoot } from "react-dom/client";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";
import { Studio } from "./main.tsx";
import { TemplateLibrary } from "../../../studio-core/src/template-library.tsx";
import type { TemplateLibraryProps } from "../../../studio-core/src/template-library-types.ts";
/** Mount the shared native template page with the editor's isolated theme providers. */
export function mountTemplateLibrary(
  container: HTMLElement,
  props: TemplateLibraryProps,
) {
  const root = createRoot(container);
  const update = (value: TemplateLibraryProps) =>
    root.render(<TemplateLibrary {...value} />);
  update(props);
  return { update, dispose: () => root.unmount() };
}
export function mountEditor(container: HTMLElement, props: PluginSurfaceProps) {
  const root = createRoot(container);
  const update = (value: PluginSurfaceProps) =>
    root.render(
      <Studio
        key={`${value.workspaceId}:${value.sessionId}:${value.filePath ?? ""}`}
        {...value}
      />,
    );
  update(props);
  return { update, dispose: () => root.unmount() };
}
