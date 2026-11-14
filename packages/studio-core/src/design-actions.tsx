/** Native file actions are contributed only while Design is enabled. */
import { useState, useSyncExternalStore } from "react";
import type { Context } from "@deepseek-ai/cordis";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import type {} from "@deepseek-ai/dsh-client-ui-chat/client";
import type {} from "@deepseek-ai/dsh-client-ui-deliverables/client";
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import type { DesignConnection } from "./design-connection.ts";
import type { StudioPrompt } from "./surface.tsx";

declare module "@deepseek-ai/dsh-client-ui-conversation/client" {
  interface ConversationTurnDataMap {
    deliverables: {
      readonly produced: readonly { readonly path: string }[];
      readonly presented?: readonly { readonly path: string }[];
    };
  }
}
const copy = {
  zh: {
    edit: "继续编辑",
    fork: "另存新方案",
    theme: "启用主题变量",
    working: "正在打开…",
    failed: "无法打开，请重试",
  },
  en: {
    edit: "Continue editing",
    fork: "Save as a new design",
    theme: "Enable theme variables",
    working: "Opening…",
    failed: "Could not open. Try again.",
  },
};
/** Use recorded file results, never infer editable files from the assistant's prose. */
export function designResultFiles(
  data:
    | {
        produced: readonly { path: string }[];
        presented?: readonly { path: string }[];
      }
    | undefined,
): string[] {
  return [
    ...new Set(
      [...(data?.produced ?? []), ...(data?.presented ?? [])].map(
        (item) => item.path,
      ),
    ),
  ].filter(
    (path) =>
      /\.html?$/i.test(path) &&
      !/(?:^|\/)video\//.test(path) &&
      !path.includes("/.versions/"),
  );
}
/** One shared action row follows each turn's HTML file outputs. */
export function registerDesignActions(
  ctx: Context,
  connection: DesignConnection,
  quote: (sessionId: SessionId, prompt: StudioPrompt) => void,
): void {
  function Actions(props: PropsRuntime<"conversation.chat.turnTail">) {
    const language = useSyncExternalStore(
      (listener) => ctx.locale.subscribe(listener),
      () => ctx.locale.getSnapshot().active,
    );
    const labels = language.startsWith("zh") ? copy.zh : copy.en;
    const files = designResultFiles(props.turn.data.get("deliverables"));
    const [busy, setBusy] = useState<string>();
    const [error, setError] = useState("");
    if (!files.length) return null;
    const open = async (path: string, mode: "resume" | "fork" | "theme") => {
      setBusy(path);
      setError("");
      try {
        const document = await connection.activate(props.sessionId, path, {
          mode: mode === "theme" ? "resume" : mode,
        });
        quote(props.sessionId, {
          text:
            mode === "theme"
              ? `In ${document.entry}, expose main colors and fonts as a few --ipw-* CSS variables. Preserve the current appearance and layout.`
              : `Edit this Design document: ${document.entry}`,
          summary: {
            label: `Design · ${document.entry.split("/").at(-1)}`,
            title: document.entry,
            body: "",
          },
        });
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : labels.failed);
      } finally {
        setBusy(undefined);
      }
    };
    const actionStyle = {
      font: "inherit",
      color: "inherit",
      border: 0,
      background: "transparent",
      padding: "3px 5px",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 3,
    };
    return (
      <div
        data-design-file-actions
        style={{ display: "grid", gap: 6, marginTop: 8 }}
      >
        {files.map((path) => (
          <div
            role="group"
            aria-label={`Design ${path.split(/[\\/]/).at(-1)}`}
            key={path}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 13,
            }}
          >
            <span
              style={{
                opacity: 0.65,
                overflowWrap: "anywhere",
                maxWidth: "100%",
              }}
            >
              Design · {path.split(/[\\/]/).at(-1)}
            </span>
            <button
              style={actionStyle}
              type="button"
              disabled={busy !== undefined}
              onClick={() => {
                void open(path, "resume");
              }}
            >
              {busy === path ? labels.working : labels.edit}
            </button>
            <button
              style={actionStyle}
              type="button"
              disabled={busy !== undefined}
              onClick={() => {
                void open(path, "fork");
              }}
            >
              {labels.fork}
            </button>
            <button
              style={actionStyle}
              type="button"
              disabled={busy !== undefined}
              onClick={() => {
                void open(path, "theme");
              }}
            >
              {labels.theme}
            </button>
          </div>
        ))}
        {error && <span role="alert">{error}</span>}
      </div>
    );
  }
  ctx.slots.inject("conversation.chat.turnTail", () =>
    ctx.slots.register(
      { name: "conversation.chat.turnTail", id: "ipollo:design-files" },
      Actions,
    ),
  );
}
