import { createServiceSettings } from "./service-settings.tsx";
/** Register the original editor component directly in DSH's React slot tree. */
import type { ComponentType } from "react";
import type { Context } from "@deepseek-ai/cordis";
import { registerPluginSurface, type PluginSurfaceProps } from "./surface.tsx";
function StudioIcon({ video = false }: { video?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {video ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m10 9 5 3-5 3Z" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 9v12" />
        </>
      )}
    </svg>
  );
}
/** Use native DSH placement and lifecycle with the original editor, without an enclosing page. */
export function createClient(
  kind: "design" | "video",
  Editor: ComponentType<PluginSurfaceProps>,
) {
  return {
    inject: [
      "slots",
      "locale",
      "configForms",
      "sidebarRight",
      "sidebarRightTabs",
      "layout",
      "uiWorkspace",
      "sessions",
      "conversation",
      "pluginNavigation",
    ],
    apply(ctx: Context) {
      registerPluginSurface(ctx, {
        id: "deepseek-" + kind,
        packageName: kind === "design" ? "deepseek-idesign" : "deepseek-ivideo",
        title: kind === "design" ? "Design" : "Video",
        order: kind === "design" ? 20 : 21,
        content: Editor,
        settings: createServiceSettings(ctx, kind),
        icon: () => <StudioIcon video={kind === "video"} />,
      });
    },
  };
}
