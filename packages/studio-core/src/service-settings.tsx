/** Status-only plugin settings; the suite owns the common connection editor when present. */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, Modal } from "@deepseek-ai/dsh-client-ui-primitives";
import type { Context } from "@deepseek-ai/cordis";
import type { ConfigForm } from "@deepseek-ai/dsh-client-ui-settings/client";
import type { ResourceConfig, ServiceConfig } from "./config-types.ts";
import type { SurfacePlacement } from "./placement.ts";
import type {
  ConnectionManager,
  ConnectionProvider,
  ConnectionStatus,
} from "./connection-protocol.ts";
import { studioConnections } from "./connection-definitions.ts";
import { studioApiRoot, studioFetch } from "./studio-fetch.ts";
type Settings = ResourceConfig & ServiceConfig & SurfacePlacement;
const fields = [
  { key: "componentApi", zh: "组件 API", en: "Component API" },
  { key: "assetApi", zh: "图库素材 API", en: "Asset API" },
  {
    key: "enhancementModelsPath",
    zh: "离线增强模型目录",
    en: "Offline enhancement models directory",
  },
  { key: "ffmpegPath", zh: "FFmpeg 路径", en: "FFmpeg path" },
  { key: "ffprobePath", zh: "FFprobe 路径", en: "FFprobe path" },
] as const;
async function connectionRequest(
  kind: "design" | "video",
  id: string,
  signal: AbortSignal,
  values?: Record<string, string>,
): Promise<ConnectionStatus> {
  const response = await studioFetch(
    kind,
    studioApiRoot(kind) + "/connections/" + id,
    {
      signal,
      ...(values
        ? {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(values),
          }
        : {}),
    },
  );
  const value: unknown = await response.json();
  if (
    !response.ok ||
    !value ||
    typeof value !== "object" ||
    !("configured" in value) ||
    typeof value.configured !== "boolean" ||
    !("writable" in value) ||
    typeof value.writable !== "boolean"
  )
    throw Error("Service connection unavailable.");
  const flags =
    "fields" in value && value.fields && typeof value.fields === "object"
      ? Object.fromEntries(
          Object.entries(value.fields).filter(
            (entry): entry is [string, boolean] =>
              typeof entry[1] === "boolean",
          ),
        )
      : {};
  return {
    configured: value.configured,
    writable: value.writable,
    fields: flags,
  };
}
const inputStyle = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  border: 0,
  borderRadius: 8,
  padding: "9px 11px",
  color: "inherit",
  background: "color-mix(in srgb,currentColor 5%,transparent)",
  font: "inherit",
} as const;
/** Register plugin-owned services in the suite's optional, reversible client registry. */
export function createServiceSettings(ctx: Context, kind: "design" | "video") {
  const form: ConfigForm<Settings> = ctx.configForms.get("deepseek-" + kind);
  const listeners = new Set<() => void>();
  let manager: ConnectionManager | undefined,
    revision = 0;
  const changed = () => {
    revision++;
    for (const listener of listeners) listener();
  };
  const providers: ConnectionProvider[] = studioConnections.map(
    (definition) => ({
      ...definition,
      id: "studio:" + definition.id,
      plugins: ["Design", "Video"],
      load: (signal) => connectionRequest(kind, definition.id, signal),
      save: async (values, signal) => {
        const result = await connectionRequest(
          kind,
          definition.id,
          signal,
          values,
        );
        changed();
        return result;
      },
    }),
  );
  ctx.inject(["ipolloConnections"], (scope) => {
    const current: ConnectionManager = scope.get("ipolloConnections");
    manager = current;
    const releases = providers.map((provider) => current.register(provider));
    changed();
    scope.effect(() => () => {
      releases.forEach((release) => release());
      if (manager === current) manager = undefined;
      changed();
    });
  });
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return function ServiceSettings({ language }: { language: string }) {
    const state = useSyncExternalStore(
      (listener) => form.subscribe(listener),
      () => form.getSnapshot(),
    );
    const currentRevision = useSyncExternalStore(subscribe, () => revision);
    const zh = language.startsWith("zh");
    const [statuses, setStatuses] = useState<Record<string, ConnectionStatus>>(
      {},
    );
    const [localList, setLocalList] = useState(false);
    const [selected, setSelected] = useState<ConnectionProvider>();
    const [error, setError] = useState("");
    useEffect(() => {
      const controller = new AbortController();
      void Promise.all(
        providers.map(
          async (provider) =>
            [provider.id, await provider.load(controller.signal)] as const,
        ),
      ).then(
        (entries) => {
          if (!controller.signal.aborted) {
            setStatuses(Object.fromEntries(entries));
            setError("");
          }
        },
        () => {
          if (!controller.signal.aborted)
            setError(
              zh
                ? "无法读取连接状态，请重新打开设置"
                : "Could not load connection status. Reopen settings.",
            );
        },
      );
      return () => controller.abort();
    }, [currentRevision, zh]);
    const open = (provider: ConnectionProvider) => {
      if (manager) manager.open(provider.id);
      else {
        setLocalList(false);
        setSelected(provider);
      }
    };
    const saveSetting = async (key: string, value: unknown) => {
      try {
        if (!(await form.set(key, value))) throw Error("refused");
      } catch {
        setError(
          zh
            ? "设置未能保存，请重试"
            : "Could not save this setting. Try again.",
        );
      }
    };
    return (
      <section style={{ display: "grid", gap: 12, padding: "16px 0" }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>
          {zh ? "服务连接" : "Service connections"}
        </h3>
        <button
          type="button"
          aria-label={zh ? "管理服务连接" : "Manage service connections"}
          onClick={() => (manager ? manager.open() : setLocalList(true))}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            border: 0,
            borderRadius: 8,
            padding: "12px",
            textAlign: "left",
            font: "inherit",
            color: "inherit",
            background: "color-mix(in srgb,currentColor 4%,transparent)",
            cursor: "pointer",
          }}
        >
          <span>
            {zh ? "API Key 与服务凭证" : "API keys and service credentials"}
          </span>
          <span style={{ opacity: 0.65, fontSize: 12 }}>
            {Object.values(statuses).filter((value) => value.configured).length}
            /{providers.length} {zh ? "已配置" : "configured"}{" "}
            <span aria-hidden>›</span>
          </span>
        </button>
        {error && <p role="alert">{error}</p>}
        <details>
          <summary>{zh ? "接口与本地工具" : "API and local tools"}</summary>
          <fieldset
            disabled={state.status !== "ready" || !state.writable}
            style={{ display: "grid", gap: 12, padding: "12px 0", border: 0 }}
          >
            {fields.map((field) => (
              <label key={field.key} style={{ display: "grid", gap: 6 }}>
                {zh ? field.zh : field.en}
                <input
                  style={inputStyle}
                  key={state.value?.[field.key] ?? ""}
                  defaultValue={state.value?.[field.key] ?? ""}
                  onBlur={(event) => {
                    const value = event.target.value.trim();
                    if (value !== (state.value?.[field.key] ?? ""))
                      void saveSetting(field.key, value);
                  }}
                />
              </label>
            ))}
          </fieldset>
        </details>
        <details>
          <summary>
            {zh ? "已有凭证引用" : "Existing credential references"}
          </summary>
          <p>
            {zh
              ? "保留已有的 DSH 凭证连接"
              : "Retain existing DSH credential connections."}
          </p>
          <fieldset
            disabled={state.status !== "ready" || !state.writable}
            style={{ display: "grid", gap: 12, padding: "12px 0", border: 0 }}
          >
            {[
              ...providers
                .map((provider) => ({
                  id: provider.id.slice(7),
                  title: zh ? provider.title.zh : provider.title.en,
                }))
                .filter((item) => item.id !== "resources"),
              { id: "openai-browser", title: "ChatGPT / Codex" },
              {
                id: "storage-routing",
                title: zh ? "存储路由" : "Storage routing",
              },
            ].map((item) => (
              <label key={item.id} style={{ display: "grid", gap: 6 }}>
                {item.title}
                <input
                  style={inputStyle}
                  key={state.value?.serviceCredentials?.[item.id] ?? ""}
                  defaultValue={
                    state.value?.serviceCredentials?.[item.id] ?? ""
                  }
                  onBlur={(event) => {
                    const next = event.target.value.trim(),
                      previous =
                        state.value?.serviceCredentials?.[item.id] ?? "";
                    if (next !== previous)
                      void saveSetting("serviceCredentials", {
                        ...form.getSnapshot().value?.serviceCredentials,
                        [item.id]: next,
                      });
                  }}
                />
              </label>
            ))}
          </fieldset>
        </details>
        {localList && (
          <Modal
            open
            title={zh ? "服务连接" : "Service connections"}
            closeLabel={zh ? "关闭" : "Close"}
            onClose={() => setLocalList(false)}
          >
            <div style={{ display: "grid", gap: 4 }}>
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => open(provider)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    border: 0,
                    borderRadius: 8,
                    padding: "10px 12px",
                    textAlign: "left",
                    font: "inherit",
                    color: "inherit",
                    background:
                      "color-mix(in srgb,currentColor 4%,transparent)",
                    cursor: "pointer",
                  }}
                >
                  <span>{zh ? provider.title.zh : provider.title.en}</span>
                  <span style={{ opacity: 0.65, fontSize: 12 }}>
                    {statuses[provider.id]
                      ? statuses[provider.id]!.configured
                        ? zh
                          ? "已配置"
                          : "Configured"
                        : zh
                          ? "未配置"
                          : "Not configured"
                      : "…"}{" "}
                    <span aria-hidden>›</span>
                  </span>
                </button>
              ))}
            </div>
          </Modal>
        )}
        {selected && (
          <LocalConnectionEditor
            provider={selected}
            zh={zh}
            close={() => {
              setSelected(undefined);
              setLocalList(true);
            }}
          />
        )}
      </section>
    );
  };
}
function LocalConnectionEditor({
  provider,
  zh,
  close,
}: {
  provider: ConnectionProvider;
  zh: boolean;
  close(): void;
}) {
  const [status, setStatus] = useState<ConnectionStatus>(),
    [values, setValues] = useState<Record<string, string>>({}),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const lifetime = useRef<AbortController | undefined>(undefined);
  useEffect(() => {
    const controller = new AbortController();
    lifetime.current = controller;
    void provider.load(controller.signal).then(
      (value) => {
        if (!controller.signal.aborted) setStatus(value);
      },
      () => {
        if (!controller.signal.aborted)
          setError(
            zh ? "无法读取连接状态" : "Could not load connection status.",
          );
      },
    );
    return () => {
      controller.abort();
      lifetime.current = undefined;
    };
  }, [provider, zh]);
  const save = async () => {
    if (!lifetime.current || busy) return;
    const controller = lifetime.current;
    setBusy(true);
    setError("");
    try {
      await provider.save(values, controller.signal);
      if (!controller.signal.aborted) close();
    } catch {
      if (!controller.signal.aborted)
        setError(
          zh ? "保存失败，请检查填写内容" : "Could not save. Check the fields.",
        );
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  };
  return (
    <Modal
      open
      title={zh ? provider.title.zh : provider.title.en}
      closeLabel={zh ? "关闭" : "Close"}
      onClose={close}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void save();
        }}
        style={{ display: "grid", gap: 16 }}
      >
        {provider.fields.map((field) => (
          <label key={field.id} style={{ display: "grid", gap: 6 }}>
            {zh ? field.label.zh : field.label.en}
            <input
              style={inputStyle}
              type={field.secret ? "password" : "text"}
              value={values[field.id] ?? ""}
              autoComplete="off"
              maxLength={8192}
              disabled={busy || !status?.writable}
              placeholder={
                status?.fields?.[field.id]
                  ? zh
                    ? "已保存，留空保持不变"
                    : "Saved; leave blank to keep"
                  : undefined
              }
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.id]: event.target.value,
                }))
              }
            />
          </label>
        ))}
        {error && <p role="alert">{error}</p>}
        <Button
          type="submit"
          disabled={
            busy ||
            !status?.writable ||
            !Object.values(values).some((value) => value.trim())
          }
        >
          {zh ? "保存" : "Save"}
        </Button>
      </form>
    </Modal>
  );
}
