/** Reusable DSH right-panel and left-navigation registration for plugin content. */
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";
import type {} from "./template-library-types.ts";
import type { Context } from "@deepseek-ai/cordis";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import type {
  ConfigForm,
  ConfigFormSnapshot,
} from "@deepseek-ai/dsh-client-ui-settings/client";
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import type { WorkspaceId } from "@deepseek-ai/dsh-workspace/types";
import type { UseSidebarRightTabInfo } from "@deepseek-ai/dsh-client-ui-sidebar-right/client";
import type {} from "@deepseek-ai/dsh-client-ui-sidebar/client";
import type {} from "@deepseek-ai/dsh-client-ui-plugin-manager/client";
import type {} from "@deepseek-ai/dsh-client-ui-layout/client";
import type { MainPanelId } from "@deepseek-ai/dsh-client-ui-layout/client";
import type {} from "@deepseek-ai/dsh-client-ui-conversation/client";
import type { SessionInput } from "@deepseek-ai/dsh-client-ui-conversation/client";
import type {} from "@deepseek-ai/dsh-client-ui-workspace/client";
import type {} from "@deepseek-ai/dsh-client-ui-renderer/client";
import type { SurfacePlacement } from "./placement.ts";
import type { DesignConnection } from "./design-connection.ts";
import type { DesignDocument } from "./design-types.ts";
import { registerDesignActions } from "./design-actions.tsx";
import { designFile, watchDesignFile } from "./design-connection.ts";

const copy = {
  zh: {
    placement: "显示位置",
    untitled: "新会话",
    right: "在右侧白板显示",
    left: "在左侧导航显示",
    sessions: "选择一个工作区会话",
    empty: "先在工作区创建一个会话，即可打开编辑器。",
    back: "返回项目",
    failed: "设置未能保存，请重试。",
    open: "在对话中打开",
    loading: "正在读取设置…",
    selectionFailed: "当前暂时无法添加选中元素，请稍后重试",
  },
  en: {
    placement: "Display location",
    untitled: "New session",
    right: "Show in the right panel",
    left: "Show in left navigation",
    sessions: "Choose a workspace session",
    empty: "Create a workspace session to open the editor.",
    back: "Back to projects",
    failed: "Could not save this setting. Try again.",
    open: "Open in conversation",
    loading: "Loading settings…",
    selectionFailed:
      "The selected element could not be added. Try again shortly.",
  },
};
function labels(language: string) {
  return language.startsWith("zh") ? copy.zh : copy.en;
}

/** Plain drafts or structured context displayed as a compact native quote. */
export type StudioPrompt =
  | string
  | {
      text: string;
      summary: { label: string; title: string; detail?: string; body: string };
    };

/**
 * Add structured context without replacing the user's draft.
 * @param input Native session composer.
 * @param prompt Plain draft text or summarized context.
 * @returns Whether the composer accepted the context.
 */
export function applyStudioPrompt(
  input: Pick<SessionInput, "setDraft" | "insertQuote" | "focus">,
  prompt: StudioPrompt,
): boolean {
  if (typeof prompt !== "string")
    return input.insertQuote(prompt.text, prompt.summary);
  input.setDraft(prompt);
  input.focus();
  return true;
}

/**
 * Send through the retained session's service without reading undeclared dependencies on its owner.
 * @param scope Session-controller context; the calling plugin injects conversation.
 * @param prompt Text submitted to the native conversation queue.
 * @returns Resolves after native admission; rejects on an unavailable service or failed submission.
 */
export async function sendStudioPrompt(
  scope: Context,
  prompt: string,
): Promise<void> {
  const conversation = scope.get("conversation");
  if (!conversation)
    throw new Error("The conversation service is unavailable.");
  await conversation.send(prompt);
}

/** Content receives the same session and workspace identity from either placement. */
export interface PluginSurfaceProps {
  sessionId: SessionId;
  workspaceId: WorkspaceId;
  workspaceRoot: string;
  askAi: (prompt: StudioPrompt) => void;
  sendAi: (prompt: string) => Promise<boolean>;
  openSettings: () => void;
  language: string;
  filePath?: string;
  active?: boolean;
  activateDocument?: (
    path: string,
    options?: { mode?: "open" | "resume" | "fork"; reveal?: boolean },
  ) => Promise<DesignDocument>;
  watchFile?: (
    path: string,
    changed: (state: "ready" | "changed" | "unavailable") => void,
  ) => () => void;
}

/** Declarative content definition; the helper owns only native placement and settings. */
export interface PluginSurface {
  id: string;
  packageName: string;
  title: string;
  order: number;
  content: ComponentType<PluginSurfaceProps>;
  icon: () => ReactNode;
  settings?: ComponentType<{ language: string }>;
  design?: DesignConnection;
}

type LanguageProps = { useLanguage: <T>(select: (language: string) => T) => T };
type RightProps = PropsRuntime<"sidebar.right.pane.tab"> &
  LanguageProps & {
    useTabInfo: UseSidebarRightTabInfo;
    usePlacement: <T>(
      selector: (state: ConfigFormSnapshot<SurfacePlacement>) => T,
    ) => T;
  };
type MainProps = PropsRuntime<"main"> & LanguageProps;
type SettingsProps = {
  AdditionalSettings?: ComponentType<{ language: string }>;
} & PropsRuntime<"plugins.bundle.config"> &
  LanguageProps & {
    usePlacement: <T>(
      selector: (state: ConfigFormSnapshot<SurfacePlacement>) => T,
    ) => T;
    save: (field: keyof SurfacePlacement, value: boolean) => Promise<boolean>;
  };
function PlacementSettings(props: SettingsProps) {
  const state = props.usePlacement((value) => value);
  const language = props.useLanguage((value) => value);
  const t = labels(language);
  const [saving, setSaving] = useState(false),
    [error, setError] = useState("");
  const change = async (field: keyof SurfacePlacement, value: boolean) => {
    setSaving(true);
    setError("");
    try {
      if (!(await props.save(field, value))) setError(t.failed);
    } catch {
      setError(t.failed);
    } finally {
      setSaving(false);
    }
  };
  const Extra = props.AdditionalSettings;
  return (
    <>
      <fieldset
        style={{
          border: 0,
          padding: 0,
          margin: "16px 0",
          display: "grid",
          gap: 12,
        }}
        disabled={saving || state.status !== "ready" || !state.writable}
      >
        <legend style={{ marginBottom: 12, fontWeight: 500 }}>
          {t.placement}
        </legend>
        {state.status !== "ready" && <p role="status">{t.loading}</p>}
        {(["rightSidebar", "leftNavigation"] as const).map((field) => (
          <label
            key={field}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={state.value?.[field] ?? false}
              onChange={(event) => {
                void change(field, event.target.checked);
              }}
            />
            {field === "rightSidebar" ? t.right : t.left}
          </label>
        ))}
        {error && <p role="alert">{error}</p>}
      </fieldset>
      {Extra && <Extra language={language} />}
    </>
  );
}

/**
 * Register one plugin's placements and its Plugins-page switches. Every registration is reversible.
 * @param ctx - the plugin's client lifetime with native DSH services.
 * @param definition - stable identifiers, editor content and navigation icon.
 * @returns nothing; DSH owns the registered effects.
 */
export function registerPluginSurface(
  ctx: Context,
  definition: PluginSurface,
): void {
  const form: ConfigForm<SurfacePlacement> = ctx.configForms.get(definition.id);
  const language = {
    getSnapshot: () => ctx.locale.getSnapshot().active,
    subscribe: (listener: () => void) => ctx.locale.subscribe(listener),
  };
  const Content = definition.content;
  let opened: SessionId | undefined;
  const openListeners = new Set<() => void>();
  const subscribeOpened = (listener: () => void) => {
    openListeners.add(listener);
    return () => {
      openListeners.delete(listener);
    };
  };
  ctx.on("ipollo/studio-open", (kind, sessionId) => {
    if (definition.id !== `deepseek-${kind}`) return;
    opened = sessionId;
    for (const listener of openListeners) listener();
    if (!form.getSnapshot().value?.rightSidebar)
      ctx.layout.selectPanel(definition.id as MainPanelId);
  });
  function OpenRequestedEditor() {
    const requested = useSyncExternalStore(subscribeOpened, () => opened);
    const mounted = useSyncExternalStore(
      ctx.sidebarRight.mounted.subscribe,
      ctx.sidebarRight.mounted.getSnapshot,
    );
    const handled = useRef<SessionId | undefined>(undefined);
    useEffect(() => {
      if (
        !requested ||
        requested !== mounted ||
        handled.current === requested ||
        !form.getSnapshot().value?.rightSidebar
      )
        return;
      handled.current = requested;
      ctx.sidebarRight.openTab(definition.id);
    }, [requested, mounted]);
    return null;
  }
  ctx.slots.inject("shell.overlay", () =>
    ctx.slots.register(
      {
        name: "shell.overlay",
        id: definition.id + ":template-open",
      },
      OpenRequestedEditor,
    ),
  );
  const askAi = (sessionId: SessionId, prompt: StudioPrompt) => {
    ctx.uiWorkspace.openSession(sessionId);
    void ctx.sessions.using(
      sessionId,
      { source: "controllerOperation" },
      async (reference) => {
        const binding = await reference.ready;
        const input = ctx.conversation.input.for(binding.ctx);
        if (!applyStudioPrompt(input, prompt))
          input.notify("error", labels(language.getSnapshot()).selectionFailed);
      },
    );
  };
  const sendAi = async (sessionId: SessionId, prompt: string) => {
    ctx.uiWorkspace.openSession(sessionId);
    await ctx.sessions.using(
      sessionId,
      { source: "controllerOperation" },
      async (reference) => {
        const binding = await reference.ready;
        await sendStudioPrompt(binding.ctx, prompt);
      },
    );
    return true;
  };
  if (definition.design) registerDesignActions(ctx, definition.design, askAi);
  function RightContent(props: RightProps): ReactNode {
    const enabled = props.usePlacement(
      (state) => state.value?.rightSidebar ?? false,
    );
    const { tab } = props.useTabInfo();
    const file =
      definition.id === "deepseek-design"
        ? designFile(tab.contentId)
        : undefined;
    useEffect(() => {
      if (!enabled && tab.visible && !file) ctx.sidebarRight.hide(tab.id);
    }, [enabled, tab.visible, tab.id, file?.path]);
    const workspace = props.useWorkspaces((state) =>
      state.items.find((item) =>
        item.sessionIds.some(
          (id) => id === (file?.sessionId ?? props.sessionId),
        ),
      ),
    );
    const sessionId = workspace?.sessionIds.find(
      (id) => id === (file?.sessionId ?? props.sessionId),
    );
    const language = props.useLanguage((value) => value);
    const t = labels(language);
    if (!workspace || !sessionId)
      return <p style={{ padding: 24 }}>{t.empty}</p>;
    return (
      <Content
        sessionId={sessionId}
        workspaceId={workspace.workspaceId}
        workspaceRoot={workspace.path}
        language={language}
        filePath={file?.path}
        active={tab.visible}
        activateDocument={
          definition.design &&
          ((path, options) =>
            definition.design!.activate(sessionId, path, options))
        }
        watchFile={(path, changed) => {
          if (!tab.visible) {
            changed("ready");
            return () => {};
          }
          return watchDesignFile(ctx, sessionId, path, changed);
        }}
        askAi={(prompt) => askAi(sessionId, prompt)}
        sendAi={(prompt) => sendAi(sessionId, prompt)}
        openSettings={() =>
          ctx.pluginNavigation.openBundle(definition.packageName)
        }
      />
    );
  }
  function NavigationContent(props: MainProps): ReactNode {
    const language = props.useLanguage((value) => value);
    const t = labels(language);
    const workspaces = props.useWorkspaces((state) => state.items);
    const sessions = props.useSessions((state) => state);
    const [selected, setSelected] = useState<SessionId>();
    const requested = useSyncExternalStore(subscribeOpened, () => opened);
    useEffect(() => {
      if (requested) setSelected(requested);
    }, [requested]);
    const workspace = workspaces.find(
      (item) => selected !== undefined && item.sessionIds.includes(selected),
    );
    const entries = workspaces.flatMap((workspace) =>
      workspace.sessionIds.map((id) => ({
        id,
        workspace: workspace.workspaceId,
        title: sessions.byId[id]?.title?.trim() || t.untitled,
      })),
    );
    useEffect(() => {
      if (selected && !workspace) setSelected(undefined);
    }, [selected, workspace]);
    const buttonStyle = {
      border: 0,
      borderRadius: 8,
      padding: "6px 10px",
      font: "inherit",
      color: "inherit",
      background: "color-mix(in srgb, currentColor 5%, transparent)",
      cursor: "pointer",
    };
    return (
      <section
        style={{
          height: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {selected && workspace ? (
          <>
            <div style={{ padding: "8px 16px", display: "flex", gap: 16 }}>
              <button
                style={buttonStyle}
                onClick={() => setSelected(undefined)}
              >
                {t.back}
              </button>
              <button
                style={buttonStyle}
                onClick={() => {
                  ctx.uiWorkspace.openSession(selected);
                  if (form.getSnapshot().value?.rightSidebar)
                    ctx.sidebarRight.openTab(definition.id);
                }}
              >
                {t.open}
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <Content
                sessionId={selected}
                workspaceId={workspace.workspaceId}
                workspaceRoot={workspace.path}
                language={language}
                activateDocument={
                  definition.design &&
                  ((path, options) =>
                    definition.design!.activate(selected, path, options))
                }
                watchFile={(path, changed) =>
                  watchDesignFile(ctx, selected, path, changed)
                }
                askAi={(prompt) => askAi(selected, prompt)}
                sendAi={(prompt) => sendAi(selected, prompt)}
                openSettings={() =>
                  ctx.pluginNavigation.openBundle(definition.packageName)
                }
              />
            </div>
          </>
        ) : (
          <div
            style={{
              padding: 24,
              display: "grid",
              gap: 12,
              alignContent: "start",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 500 }}>
              {definition.title}
            </h2>
            <p>{entries.length ? t.sessions : t.empty}</p>
            {entries.map((entry) => (
              <button
                key={entry.id}
                style={{ ...buttonStyle, textAlign: "start", padding: 12 }}
                onClick={() => setSelected(entry.id)}
              >
                {entry.title}
              </button>
            ))}
          </div>
        )}
      </section>
    );
  }
  const body = ctx.slots.inject("sidebar.right.pane.tab", () =>
    ctx.slots.register(
      {
        name: "sidebar.right.pane.tab",
        key: definition.id,
        inject: () => ({ hooks: { language, placement: form } }),
      },
      RightContent,
    ),
  );
  ctx.slots.inject("main", () =>
    ctx.slots.register(
      {
        name: "main",
        key: definition.id,
        inject: () => ({ hooks: { language } }),
      },
      NavigationContent,
    ),
  );
  let rightDispose: (() => void) | undefined;
  let rightEnabled: boolean | undefined;
  let leftDispose: (() => void) | undefined;
  function sync() {
    const state = form.getSnapshot();
    if (state.status !== "ready" || !state.value) return;
    if (state.value.rightSidebar !== rightEnabled) {
      rightDispose?.();
      rightEnabled = state.value.rightSidebar;
      rightDispose = ctx.sidebarRightTabs.register({
        id: definition.id,
        kind: definition.id,
        keepMounted: true,
        ...(definition.id === "deepseek-design"
          ? {
              patterns: ["*.html", "*.htm"],
              canOpen: (address: string) => Boolean(designFile(address)),
            }
          : {}),
        title: () => definition.title,
        ...(rightEnabled
          ? {
              guide: [
                {
                  id: "open",
                  order: definition.order,
                  title: () => definition.title,
                  icon: definition.icon,
                },
              ],
            }
          : {}),
      });
    }
    if (state.value.leftNavigation && !leftDispose) {
      const item = ctx.slots.inject("sidebar.panellist", () =>
        ctx.slots.register(
          {
            name: "sidebar.panellist",
            id: definition.id,
            order: definition.order,
            label: () => definition.title,
          },
          () => <definition.icon />,
        ),
      );
      leftDispose = () => {
        item();
      };
    } else if (!state.value.leftNavigation && leftDispose) {
      leftDispose();
      leftDispose = undefined;
      if (ctx.layout.panelInfo.getSnapshot().activePanelId === definition.id)
        ctx.layout.selectPanel(null);
    }
  }
  ctx.effect(() => {
    const off = form.subscribe(sync);
    sync();
    return () => {
      off();
      body();
      rightDispose?.();
      leftDispose?.();
    };
  }, definition.id + ": placements");
  ctx.slots.inject("plugins.bundle.config", () =>
    ctx.slots.register(
      {
        name: "plugins.bundle.config",
        key: definition.packageName,
        inject: () => ({
          hooks: { placement: form, language },
          AdditionalSettings: definition.settings,
          save: (field: keyof SurfacePlacement, value: boolean) =>
            form.set(field, value),
        }),
      },
      PlacementSettings,
    ),
  );
}
