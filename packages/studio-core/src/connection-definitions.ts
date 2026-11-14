/** Service fields shared by the native status rows and the owner-only credential API. */
import type { ConnectionField, ConnectionText } from "./connection-protocol.ts";
const label = (en: string, zh = en): ConnectionText => ({ en, zh });
const field = (
  id: string,
  en: string,
  zh = en,
  secret = true,
  required = true,
): ConnectionField => ({ id, label: label(en, zh), secret, required });
export interface StudioConnectionDefinition {
  id: string;
  title: ConnectionText;
  fields: readonly ConnectionField[];
}
export const studioConnections: readonly StudioConnectionDefinition[] = [
  {
    id: "resources",
    title: label("Components and assets", "组件与素材"),
    fields: [field("token", "API key", "API Key")],
  },
  {
    id: "openai-images",
    title: label("OpenAI images", "OpenAI 图片"),
    fields: [field("OPENAI_API_KEY", "API key", "API Key")],
  },
  {
    id: "fal-images",
    title: label("fal"),
    fields: [field("FAL_KEY", "API key", "API Key")],
  },
  {
    id: "aliyun-bailian",
    title: label("Model Studio", "百炼"),
    fields: [field("DASHSCOPE_API_KEY", "API key", "API Key")],
  },
  {
    id: "volcengine-video",
    title: label("Ark", "火山 Ark"),
    fields: [field("ARK_API_KEY", "API key", "API Key")],
  },
  {
    id: "runninghub-video",
    title: label("RunningHub"),
    fields: [field("RUNNINGHUB_API_KEY", "API key", "API Key")],
  },
  {
    id: "heygen-video",
    title: label("HeyGen"),
    fields: [field("HEYGEN_API_KEY", "API key", "API Key")],
  },
  {
    id: "aliyun-oss",
    title: label("Aliyun OSS", "阿里云 OSS"),
    fields: [
      field("ALIYUN_OSS_ACCESS_KEY_ID", "Access key ID"),
      field("ALIYUN_OSS_ACCESS_KEY_SECRET", "Access key secret"),
      field("ALIYUN_OSS_BUCKET", "Bucket", "Bucket", false),
      field("ALIYUN_OSS_REGION", "Region", "地域", false),
      field(
        "ALIYUN_OSS_PUBLIC_BASE_URL",
        "Public URL",
        "公开地址",
        false,
        false,
      ),
    ],
  },
  {
    id: "wasabi",
    title: label("Wasabi"),
    fields: [
      field("WASABI_ACCESS_KEY_ID", "Access key ID"),
      field("WASABI_SECRET_ACCESS_KEY", "Secret access key"),
      field("WASABI_BUCKET", "Bucket", "Bucket", false),
      field("WASABI_REGION", "Region", "地域", false),
    ],
  },
];
