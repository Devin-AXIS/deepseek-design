/** Native plugin settings hold references and paths; the DSH credential provider retains secrets. */
import { useState, useSyncExternalStore } from "react";
import type { Context } from "@deepseek-ai/cordis";
import type { ConfigForm } from "@deepseek-ai/dsh-client-ui-settings/client";
import type { ResourceConfig, ServiceConfig } from "./config-types.ts";
import type { SurfacePlacement } from "./placement.ts";
type Settings = ResourceConfig & ServiceConfig & SurfacePlacement;
type StringField =
  | "componentApi"
  | "assetApi"
  | "componentCredential"
  | "assetCredential"
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
    key: "componentCredential",
    zh: "组件服务凭证引用",
    en: "Component credential reference",
  },
  {
    key: "assetCredential",
    zh: "素材服务凭证引用",
    en: "Asset credential reference",
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
        <p>
          {zh
            ? "填写 DSH 凭证记录引用或环境变量名，密钥由宿主保管"
            : "Enter DSH credential record references or environment variable names. The host retains secret values."}
        </p>
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
        {credentials.map((item) => (
          <label key={item.id} style={{ display: "grid", gap: 6 }}>
            {item.title} {zh ? "凭证引用" : "credential reference"}
            <input
              key={state.value?.serviceCredentials?.[item.id] ?? ""}
              style={inputStyle}
              defaultValue={state.value?.serviceCredentials?.[item.id] ?? ""}
              onBlur={(event) => {
                const value = event.currentTarget.value.trim();
                if (
                  value === (state.value?.serviceCredentials?.[item.id] ?? "")
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
        {error && <p role="alert">{error}</p>}
      </fieldset>
    );
  };
}
