/** Original React renderer hosted directly in a native DSH slot, without a page or iframe. */
import { createRoot } from "react-dom/client";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";
import { Studio } from "./main.tsx";
export function mountEditor(container: HTMLElement, props: PluginSurfaceProps) {
  const root = createRoot(container);
  const update = (value: PluginSurfaceProps) =>
    root.render(
      <Studio key={`${value.workspaceId}:${value.sessionId}`} {...value} />,
    );
  update(props);
  return { update, dispose: () => root.unmount() };
}
