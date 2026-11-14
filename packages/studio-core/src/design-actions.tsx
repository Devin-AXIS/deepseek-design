/** Design actions belong to their HTML file and disappear with the plugin. */
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Context } from "@deepseek-ai/cordis";
import type { PropsRuntime } from "@deepseek-ai/dsh-client-ui-slots";
import type {} from "@deepseek-ai/dsh-client-ui-chat/client";
import type {} from "@deepseek-ai/dsh-client-ui-deliverables/client";
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import type { DesignConnection } from "./design-connection.ts";
import type { StudioPrompt } from "./surface.tsx";

interface FileResults {
  readonly produced: readonly { readonly path: string }[];
  readonly presented?: readonly { readonly path: string }[];
}

declare module "@deepseek-ai/dsh-client-ui-conversation/client" {
  interface ConversationTurnDataMap {
    deliverables: FileResults;
  }
}

const copy = {
  zh: {
    edit: "编辑",
    create: "新建",
    editTitle: "继续编辑",
    createTitle: "新建方案",
    working: "正在打开…",
    retry: "重试",
    failed: "无法打开，请重试",
  },
  en: {
    edit: "Edit",
    create: "New",
    editTitle: "Continue editing",
    createTitle: "New design",
    working: "Opening…",
    retry: "Retry",
    failed: "Could not open. Try again.",
  },
};

function isDesignFile(path: string): boolean {
  return (
    /\.html?$/i.test(path) &&
    !/(?:^|[\\/])video[\\/]/.test(path) &&
    !/(?:^|[\\/])\.versions[\\/]/.test(path)
  );
}

/** Files without a native delivery card receive the same compact controls. */
export function designResultFiles(data: FileResults | undefined): string[] {
  const presented = new Set(data?.presented?.map((file) => file.path));
  return [...new Set(data?.produced.map((file) => file.path))].filter(
    (path) => isDesignFile(path) && !presented.has(path),
  );
}

/** Resolve one native file card from the already loaded, immutable Session event. */
export function designPresentedPath(
  actionUrl: string,
  sessionId: string,
  entries: readonly {
    readonly type: string;
    readonly event: {
      readonly type: string;
      readonly seq: number;
      readonly data: unknown;
    };
  }[],
): string | undefined {
  const [route, query] = actionUrl.split("?");
  if (route.replace(/^\//, "") !== "api/present.open") return;
  const params = new URLSearchParams(query);
  if (params.get("sessionId") !== sessionId) return;
  const seq = params.get("seq"),
    index = params.get("index");
  if (!seq || !index || !/^\d+$/.test(seq) || !/^\d+$/.test(index)) return;
  const event = entries.find(
    (entry) =>
      entry.type === "event" &&
      entry.event.type === "deliverables/presented" &&
      entry.event.seq === Number(seq),
  )?.event;
  const data = event?.data;
  if (
    !data ||
    typeof data !== "object" ||
    !("files" in data) ||
    !Array.isArray(data.files)
  )
    return;
  const file: unknown = data.files[Number(index)];
  if (
    file &&
    typeof file === "object" &&
    "path" in file &&
    typeof file.path === "string" &&
    isDesignFile(file.path)
  )
    return file.path;
}

/** Register one shared two-action control for native HTML cards and unpresented files. */
export function registerDesignActions(
  ctx: Context,
  connection: DesignConnection,
  quote: (sessionId: SessionId, prompt: StudioPrompt) => void,
  css: Readonly<Record<string, string>>,
): void {
  function Controls({
    sessionId,
    path,
  }: {
    sessionId: SessionId;
    path: string;
  }) {
    const language = useSyncExternalStore(
      (listener) => ctx.locale.subscribe(listener),
      () => ctx.locale.getSnapshot().active,
    );
    const labels = language.startsWith("zh") ? copy.zh : copy.en;
    const [busy, setBusy] = useState<"resume" | "new">();
    const [error, setError] = useState<{
      mode: "resume" | "new";
      message: string;
    }>();
    const open = async (mode: "resume" | "new") => {
      setBusy(mode);
      setError(undefined);
      try {
        const document = await connection.activate(sessionId, path, { mode });
        quote(sessionId, {
          text: `${mode === "new" ? "Create a new design in" : "Edit this Design document:"} ${document.entry}`,
          summary: {
            label: `Design · ${document.entry.split("/").at(-1)}`,
            title: document.entry,
            body: "",
          },
        });
      } catch (reason) {
        setError({
          mode,
          message: reason instanceof Error ? reason.message : labels.failed,
        });
      } finally {
        setBusy(undefined);
      }
    };
    return (
      <span
        className={css.controls}
        data-design-file-actions
        data-design-path={path}
      >
        <button
          className={css.action}
          type="button"
          disabled={busy !== undefined}
          aria-label={labels.editTitle}
          title={error?.mode === "resume" ? error.message : labels.editTitle}
          data-error={error?.mode === "resume" || undefined}
          onClick={() => {
            void open("resume");
          }}
        >
          {busy === "resume"
            ? labels.working
            : error?.mode === "resume"
              ? labels.retry
              : labels.edit}
        </button>
        <button
          className={css.action}
          type="button"
          disabled={busy !== undefined}
          aria-label={labels.createTitle}
          title={error?.mode === "new" ? error.message : labels.createTitle}
          data-error={error?.mode === "new" || undefined}
          onClick={() => {
            void open("new");
          }}
        >
          {busy === "new"
            ? labels.working
            : error?.mode === "new"
              ? labels.retry
              : labels.create}
        </button>
      </span>
    );
  }

  function FileActions(props: PropsRuntime<"deliverables.file.actions">) {
    // The card is mounted after its immutable delivery event has been loaded.
    const path = useMemo(
      () =>
        designPresentedPath(
          props.actionUrl,
          props.sessionId,
          ctx.sessions.binding(props.sessionId)?.eventSource.getSnapshot()
            .entries ?? [],
        ),
      [props.actionUrl, props.sessionId],
    );
    return path ? <Controls sessionId={props.sessionId} path={path} /> : null;
  }

  function UnpresentedActions(
    props: PropsRuntime<"conversation.chat.turnTail">,
  ) {
    const files = designResultFiles(props.turn.data.get("deliverables"));
    return files.length ? (
      <div className={css.files}>
        {files.map((path) => (
          <div className={css.file} key={path}>
            <span className={css.fileType}>HTML</span>
            <span className={css.fileName} title={path}>
              {path.split(/[\\/]/).at(-1)}
            </span>
            <Controls sessionId={props.sessionId} path={path} />
          </div>
        ))}
      </div>
    ) : null;
  }

  ctx.slots.inject("deliverables.file.actions", () =>
    ctx.slots.register(
      { name: "deliverables.file.actions", id: "ipollo:design-file" },
      FileActions,
    ),
  );
  ctx.slots.inject("conversation.chat.turnTail", () =>
    ctx.slots.register(
      { name: "conversation.chat.turnTail", id: "ipollo:design-files" },
      UnpresentedActions,
    ),
  );
}
