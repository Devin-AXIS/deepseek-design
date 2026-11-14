/** Bounded API adapters for Stage components and immutable image/video resources. */
import { createHash } from "node:crypto";
import { z } from "zod";
import type {
  CatalogItem,
  Resource,
  ResourceTheme,
  ResourceCategory,
} from "./resource-model.ts";
import { StudioError } from "./errors.ts";
import { writeResource } from "./files.ts";
const digest = (bytes: Uint8Array) =>
  createHash("sha256").update(bytes).digest("hex");
export interface ProviderConfig {
  componentApi: string;
  assetApi: string;
  timeoutMs: number;
  maxResourceBytes: number;
}
const record = z.record(z.string(), z.unknown());
const safeId = (id: string) => {
  if (!/^[\w.-]{1,160}$/.test(id))
    throw new StudioError("STUDIO_RESOURCE_ID", "Invalid resource identifier");
  return id;
};
export function apiOrigin(value: string): string {
  const url = new URL(value);
  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !["https:", "http:"].includes(url.protocol) ||
    (url.protocol === "http:" &&
      !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
  )
    throw new StudioError(
      "STUDIO_PROVIDER_URL",
      "Use HTTPS or a local development API",
    );
  return url.href.replace(/\/$/, "");
}
export class ResourceProviders {
  private controller = new AbortController();
  private tasks = new Set<Promise<unknown>>();
  constructor(
    private config: ProviderConfig,
    private credential: (
      provider: "component" | "asset",
    ) => Promise<string | undefined>,
  ) {}
  private request(
    provider: "component" | "asset",
    path: string,
    init: RequestInit = {},
  ): Promise<Buffer> {
    const task = (async () => {
      this.controller.signal.throwIfAborted();
      const base =
        provider === "component"
          ? this.config.componentApi
          : this.config.assetApi;
      if (!base)
        throw new StudioError(
          "STUDIO_PROVIDER_MISSING",
          "Configure this resource API in plugin settings",
          503,
        );
      const token = await this.credential(provider);
      const response = await fetch(apiOrigin(base) + path, {
        ...init,
        redirect: "error",
        headers: {
          ...(token ? { authorization: `Bearer ${token}` } : {}),
          ...(init.body ? { "content-type": "application/json" } : {}),
          ...init.headers,
        },
        signal: AbortSignal.any([
          this.controller.signal,
          AbortSignal.timeout(this.config.timeoutMs),
        ]),
      });
      if (!response.ok)
        throw new StudioError(
          "STUDIO_PROVIDER_FAILED",
          `Resource API returned ${response.status}`,
          502,
        );
      return this.bytes(response);
    })();
    this.tasks.add(task);
    void task.finally(() => this.tasks.delete(task)).catch(() => undefined);
    return task;
  }
  private async bytes(response: Response): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    let count = 0;
    const reader = response.body?.getReader();
    if (!reader)
      throw new StudioError(
        "STUDIO_PROVIDER_FAILED",
        "Resource API returned an empty body",
        502,
      );
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        count += value.byteLength;
        if (count > this.config.maxResourceBytes)
          throw new StudioError(
            "STUDIO_RESOURCE_SIZE",
            "Resource exceeds the configured size limit",
            413,
          );
        chunks.push(value);
      }
    } finally {
      await reader.cancel();
    }
    return Buffer.concat(chunks);
  }
  private async json(
    provider: "component" | "asset",
    path: string,
    init?: RequestInit,
  ): Promise<unknown> {
    return JSON.parse(
      (await this.request(provider, path, init)).toString("utf8"),
    );
  }
  async search(
    category: ResourceCategory,
    query: string,
  ): Promise<CatalogItem[]> {
    if (category !== "library") {
      const data = z
        .array(
          z.object({
            name: z.string(),
            title: z.string(),
            description: z.string().optional(),
            subcategory: z.string().optional(),
          }),
        )
        .max(5000)
        .parse(await this.json("component", "/api/catalog"));
      return data
        .filter((x) =>
          category === "data"
            ? x.subcategory === "charts"
            : x.subcategory !== "charts",
        )
        .filter((x) =>
          `${x.title} ${x.description ?? ""} ${x.name}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 80)
        .map((x) => ({
          id: x.name,
          title: x.title,
          description: x.description ?? "",
          kind: "component",
        }));
    }
    const data = record.parse(
      await this.json("asset", "/v1/entities?q=" + encodeURIComponent(query)),
    );
    const list = z.array(record).parse(data.items ?? data.entities ?? []);
    return list.slice(0, 80).map((x) => ({
      id: z.string().parse(x.id ?? x.entityId),
      title: z.string().parse(x.name ?? x.title ?? x.id),
      description: typeof x.description === "string" ? x.description : "",
      kind: "asset",
    }));
  }
  acquire(
    item: CatalogItem,
    dir: string,
    theme: ResourceTheme,
  ): Promise<Resource> {
    this.controller.signal.throwIfAborted();
    const task = this.acquireResource(item, dir, theme);
    this.tasks.add(task);
    void task.finally(() => this.tasks.delete(task)).catch(() => undefined);
    return task;
  }
  private async acquireResource(
    item: CatalogItem,
    dir: string,
    theme: ResourceTheme,
  ): Promise<Resource> {
    let dimensions: { width?: number; height?: number } = {};
    let body: Buffer,
      mime: string,
      version: string,
      sourceId = item.id,
      variables: Record<string, string | number | boolean> = {};
    if (item.kind === "component") {
      safeId(item.id);
      const info = record.parse(
        await this.json(
          "component",
          `/components/${item.id}/registry-item.json`,
        ),
      );
      version = z.string().parse(info.version);
      if (info.dimensions)
        dimensions = z
          .object({
            width: z.number().int().min(1).max(10000),
            height: z.number().int().min(1).max(10000),
          })
          .parse(info.dimensions);
      const definitions = z.array(record).parse(info.variables ?? []);
      for (const field of definitions) {
        if (
          typeof field.id === "string" &&
          ["string", "number", "boolean"].includes(typeof field.default)
        )
          variables[field.id] = field.default as string | number | boolean;
      }
      variables.skin = theme.style;
      body = await this.request(
        "component",
        `/components/${item.id}/${item.id}.html`,
      );
      mime = "text/html";
    } else {
      const resolved = record.parse(
        await this.json("asset", "/v1/resolve", {
          method: "POST",
          body: JSON.stringify({
            presentation: { style: theme.style },
            needs: [{ key: "selected", entityId: item.id }],
          }),
        }),
      );
      const first = z.array(record).min(1).parse(resolved.items)[0]!;
      if (first.status !== undefined && first.status !== "resolved")
        throw new StudioError(
          "STUDIO_RESOURCE_MISSING",
          "No compatible resource is available for this style",
          422,
        );
      const selected = record.parse(first.selected);
      sourceId = z.string().parse(selected.masterId);
      version = z
        .string()
        .parse(selected.objectId ?? selected.assetId ?? sourceId);
      const delivery = record.parse(selected.delivery);
      const url = new URL(z.string().parse(delivery.url), this.config.assetApi);
      if (url.origin !== new URL(this.config.assetApi).origin)
        throw new StudioError(
          "STUDIO_RESOURCE_ORIGIN",
          "Resource delivery must use the configured API origin",
          502,
        );
      body = await this.request("asset", url.pathname + url.search);
      mime = z.string().parse(selected.mime);
      if (!/^(image|video)\//.test(mime))
        throw new StudioError(
          "STUDIO_RESOURCE_TYPE",
          "The API returned an unsupported media type",
          422,
        );
    }
    const sha256 = digest(body),
      id =
        "r_" +
        createHash("sha256")
          .update(
            (item.kind === "component"
              ? this.config.componentApi
              : this.config.assetApi) +
              "\0" +
              sourceId +
              "\0" +
              version +
              "\0" +
              sha256,
          )
          .digest("hex")
          .slice(0, 20);
    const extension =
      mime === "text/html"
        ? "html"
        : mime.includes("svg")
          ? "svg"
          : mime.startsWith("video/")
            ? "mp4"
            : mime.includes("jpeg")
              ? "jpg"
              : "png";
    const file = `resources/${id}.${extension}`;
    await writeResource(dir, `${id}.${extension}`, body);
    return {
      id,
      kind:
        item.kind === "component"
          ? "component"
          : mime.startsWith("video/")
            ? "video"
            : "image",
      title: item.title,
      file,
      sourceId,
      version,
      mime,
      variables,
      sha256,
      ...dimensions,
    };
  }
  /** Reject new requests and cancel provider I/O without releasing its consumers. */
  stop(): void {
    this.controller.abort();
  }
  async dispose() {
    this.stop();
    await Promise.allSettled([...this.tasks]);
  }
}
