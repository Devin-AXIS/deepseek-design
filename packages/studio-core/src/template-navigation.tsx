/** Both bundles contribute one native Templates entry using DSH slot shadowing. */
import type { Context } from "@deepseek-ai/cordis";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import type { ConfigFormSnapshot } from "@deepseek-ai/dsh-client-ui-settings/client";
import { NativeTemplateLibrary } from "./native-mount.tsx";
import type { SurfacePlacement } from "./placement.ts";
import type { StudioKind } from "./template-library-types.ts";

type Props = PropsRuntime<"main"> & {
  useLanguage: <T>(select: (language: string) => T) => T;
  useDesign: <T>(
    select: (value: ConfigFormSnapshot<SurfacePlacement>) => T,
  ) => T;
  useVideo: <T>(
    select: (value: ConfigFormSnapshot<SurfacePlacement>) => T,
  ) => T;
};

/** Register the same page at distinct priorities; removing either bundle leaves the other entry working. */
export function registerTemplateNavigation(
  ctx: Context,
  kind: StudioKind,
): void {
  const priority = kind === "design" ? 0 : 1;
  const language = {
    getSnapshot: () => ctx.locale.getSnapshot().active,
    subscribe: (listener: () => void) => ctx.locale.subscribe(listener),
  };
  const title = () =>
    language.getSnapshot().startsWith("zh") ? "模板" : "Templates";
  const design = ctx.configForms.get<SurfacePlacement>("deepseek-design");
  const video = ctx.configForms.get<SurfacePlacement>("deepseek-video");
  function Content(props: Props) {
    const language = props.useLanguage((value) => value);
    const hasDesign = props.useDesign((value) => value.status === "ready");
    const hasVideo = props.useVideo((value) => value.status === "ready");
    const kinds: StudioKind[] = [];
    if (hasDesign) kinds.push("design");
    if (hasVideo) kinds.push("video");
    const workspaces = props.useWorkspaces((value) => value.items);
    return (
      <NativeTemplateLibrary
        language={language}
        kinds={kinds}
        workspaces={workspaces}
        createSession={(workspaceId) => ctx.sessions.create({ workspaceId })}
        openSession={(target, sessionId) => {
          ctx.uiWorkspace.openSession(sessionId);
          ctx.emit("ipollo/studio-open", target, sessionId);
        }}
        openSettings={() =>
          ctx.pluginNavigation.openBundle(
            kind === "design" ? "deepseek-idesign" : "deepseek-ivideo",
          )
        }
      />
    );
  }
  ctx.slots.inject("main", () =>
    ctx.slots.register(
      {
        name: "main",
        key: "ipollo-templates",
        priority,
        inject: () => ({ hooks: { language, design, video } }),
      },
      Content,
    ),
  );
  ctx.slots.inject("sidebar.panellist", () =>
    ctx.slots.register(
      {
        name: "sidebar.panellist",
        id: "ipollo-templates",
        order: 22,
        priority,
        label: title,
      },
      () => (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 9v12" />
        </svg>
      ),
    ),
  );
}
