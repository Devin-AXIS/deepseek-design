/** Native plugin settings hold references and paths; the DSH credential provider retains secrets. */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Context } from "@deepseek-ai/cordis";
import type { ConfigForm } from "@deepseek-ai/dsh-client-ui-settings/client";
import type { ResourceConfig, ServiceConfig } from "./config-types.ts";
import type { SurfacePlacement } from "./placement.ts";
import { studioApiRoot, studioFetch } from "./studio-fetch.ts";
type Settings = ResourceConfig & ServiceConfig & SurfacePlacement;
type StringField =
  | "componentApi"
  | "assetApi"
  | "enhancementModelsPath"
  | "ffmpegPath"
  | "ffprobePath";
const fields: Array<{ key: StringField; zh: string; en: string }> = [
  { key: "componentApi", zh: "组件 API", en: "Component API" },
  {
    key: "assetApi",
    zh: "图片与视频素材 API",
    en: "Image and video asset API",
  },
  {
    key: "enhancementModelsPath",
    zh: "离线增强模型目录",
    en: "Offline enhancement models directory",
  },
  { key: "ffmpegPath", zh: "FFmpeg 路径", en: "FFmpeg path" },
  { key: "ffprobePath", zh: "FFprobe 路径", en: "FFprobe path" },
];
const credentials = [
  { id: "openai-images", title: "OpenAI" },
  { id: "openai-browser", title: "ChatGPT / Codex" },
  { id: "fal-images", title: "fal" },
  { id: "aliyun-bailian", title: "百炼 / Model Studio" },
  { id: "volcengine-video", title: "火山 / Ark" },
  { id: "runninghub-video", title: "RunningHub" },
  { id: "heygen-video", title: "HeyGen" },
  { id: "aliyun-oss", title: "阿里云 OSS" },
  { id: "wasabi", title: "Wasabi" },
  { id: "storage-routing", title: "存储路由 / Storage routing" },
];
interface ResourceKeyState {
  configured: boolean;
  writable: boolean;
}
async function resourceKeyState(
  kind: "design" | "video",
  signal: AbortSignal,
  key?: string,
): Promise<ResourceKeyState> {
  const response = await studioFetch(
    kind,
    studioApiRoot(kind) + "/resource-key",
    {
      signal,
      ...(key === undefined
        ? {}
        : {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ key }),
          }),
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
    throw Error("Resource key settings are unavailable.");
  return { configured: value.configured, writable: value.writable };
}
/** Render the same settings section for both native bundles. */
export function createServiceSettings(ctx: Context, kind: "design" | "video") {
  const form: ConfigForm<Settings> = ctx.configForms.get("deepseek-" + kind);
  return function ServiceSettings({ language }: { language: string }) {
    const state = useSyncExternalStore(
      (listener) => form.subscribe(listener),
      () => form.getSnapshot(),
    );
    const [error, setError] = useState(""),
      [saving, setSaving] = useState(false);
    const zh = language.startsWith("zh");
    const [keyState, setKeyState] = useState<ResourceKeyState>();
    const [resourceKey, setResourceKey] = useState("");
    const lifetime = useRef<AbortController | undefined>(undefined);
    useEffect(() => {
      const controller = new AbortController();
      lifetime.current = controller;
      void resourceKeyState(kind, controller.signal).then(
        (value) => {
          if (!controller.signal.aborted) setKeyState(value);
        },
        () => {
          if (!controller.signal.aborted)
            setError(
              zh
                ? "无法读取资源 Key 配置，请重新打开设置"
                : "Could not load the resource key. Reopen settings to retry.",
            );
        },
      );
      return () => {
        controller.abort();
        if (lifetime.current === controller) lifetime.current = undefined;
      };
    }, []);
    const saveResourceKey = async () => {
      const controller = lifetime.current;
      if (!controller || !resourceKey.trim()) return;
      setSaving(true);
      setError("");
      try {
        const value = await resourceKeyState(
          kind,
          controller.signal,
          resourceKey.trim(),
        );
        if (!controller.signal.aborted) {
          setKeyState(value);
          setResourceKey("");
        }
      } catch {
        if (!controller.signal.aborted)
          setError(
            zh
              ? "资源 Key 未能保存，请重试"
              : "Could not save the resource key. Try again.",
          );
      } finally {
        if (!controller.signal.aborted) setSaving(false);
      }
    };
    const save = async (
      field: StringField | "serviceCredentials",
      value: string | Record<string, string>,
    ) => {
      setSaving(true);
      setError("");
      try {
        const ok =
          field === "serviceCredentials" && typeof value !== "string"
            ? await form.set(field, value)
            : field !== "serviceCredentials" && typeof value === "string"
              ? await form.set(field, value)
              : false;
        if (!ok)
          setError(
            zh
              ? "设置未能保存，请重试"
              : "Could not save this setting. Try again.",
          );
      } catch {
        setError(
          zh
            ? "设置未能保存，请重试"
            : "Could not save this setting. Try again.",
        );
      } finally {
        setSaving(false);
      }
    };
    const disabled = saving || state.status !== "ready" || !state.writable;
    const inputStyle = {
      width: "100%",
      minWidth: 0,
      border: 0,
      borderRadius: 8,
      padding: "8px 10px",
      font: "inherit",
      color: "inherit",
      background: "color-mix(in srgb,currentColor 5%,transparent)",
    };
    return (
      <fieldset
        disabled={disabled}
        style={{
          border: 0,
          margin: 0,
          padding: "16px 0",
          display: "grid",
          gap: 12,
        }}
      >
        <legend>{zh ? "服务与资源" : "Services and resources"}</legend>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void saveResourceKey();
          }}
          style={{ display: "grid", gap: 8 }}
        >
          <label style={{ display: "grid", gap: 6 }}>
            {zh ? "组件与素材 Key" : "Component and asset key"}
            <input
              type="password"
              autoComplete="off"
              maxLength={8192}
              style={inputStyle}
              value={resourceKey}
              onChange={(event) => setResourceKey(event.target.value)}
              placeholder={
                keyState?.configured
                  ? zh
                    ? "已配置，填写可替换"
                    : "Configured; enter a replacement"
                  : zh
                    ? "填写一个 API Key"
                    : "Enter one API key"
              }
            />
          </label>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
            {zh
              ? "Design 与 Video 共用，由 DSH 凭证管理保存"
              : "Shared by Design and Video, stored by DSH credentials."}
          </p>
          <button
            type="submit"
            disabled={saving || !keyState?.writable || !resourceKey.trim()}
            style={{
              justifySelf: "start",
              border: 0,
              borderRadius: 8,
              padding: "6px 12px",
              font: "inherit",
              color: "inherit",
              background: "color-mix(in srgb,currentColor 8%,transparent)",
            }}
          >
            {saving
              ? zh
                ? "保存中…"
                : "Saving…"
              : zh
                ? "保存 Key"
                : "Save key"}
          </button>
        </form>
        <details>
          <summary>{zh ? "接口与本地工具" : "API and local tools"}</summary>
          <div style={{ display: "grid", gap: 12, paddingTop: 12 }}>
            {fields.map((field) => (
              <label key={field.key} style={{ display: "grid", gap: 6 }}>
                {zh ? field.zh : field.en}
                <input
                  key={state.value?.[field.key] ?? ""}
                  style={inputStyle}
                  defaultValue={state.value?.[field.key] ?? ""}
                  onBlur={(event) => {
                    const value = event.currentTarget.value.trim();
                    if (value !== (state.value?.[field.key] ?? ""))
                      void save(field.key, value);
                  }}
                />
              </label>
            ))}
          </div>
        </details>
        <details>
          <summary>{zh ? "其他服务凭证" : "Other service credentials"}</summary>
          <p>
            {zh
              ? "填写 DSH 凭证引用，密钥由宿主管理"
              : "Enter DSH credential references; secret values stay with the host."}
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {credentials.map((item) => (
              <label key={item.id} style={{ display: "grid", gap: 6 }}>
                {item.title} {zh ? "凭证引用" : "credential reference"}
                <input
                  key={state.value?.serviceCredentials?.[item.id] ?? ""}
                  style={inputStyle}
                  defaultValue={
                    state.value?.serviceCredentials?.[item.id] ?? ""
                  }
                  onBlur={(event) => {
                    const value = event.currentTarget.value.trim();
                    if (
                      value ===
                      (state.value?.serviceCredentials?.[item.id] ?? "")
                    )
                      return;
                    const values = { ...state.value?.serviceCredentials };
                    if (value) values[item.id] = value;
                    else delete values[item.id];
                    void save("serviceCredentials", values);
                  }}
                />
              </label>
            ))}
          </div>
        </details>
        {error && <p role="alert">{error}</p>}
      </fieldset>
    );
  };
}
