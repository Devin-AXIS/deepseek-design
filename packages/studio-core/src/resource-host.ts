import type { ResourceConfig } from "./config-types.ts";
import { credentialRef } from "@deepseek-ai/dsh-credentials";
import {
  readStudioCredential,
  validateStudioCredential,
} from "./credentials.ts";
/** Add API resource lookup and acquisition to the original Studio file model. */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Context } from "@deepseek-ai/cordis";
import z from "@deepseek-ai/schemastery";
import { z as json } from "zod";
import { ResourceProviders, apiOrigin } from "./providers.ts";
import { componentHtml } from "./component.ts";
import {
  resourceThemeSchema,
  defaultTheme,
  escapeHtml,
} from "./resource-model.ts";
import {
  requestObject,
  sendJson,
  workspaceRoot,
  verifiedWritePath,
  StudioHttpError,
} from "./http.ts";

export const resourceFields = {
  componentApi: z.string().default("").volatile(),
  assetApi: z.string().default("").volatile(),
  componentCredential: z.string().default("").volatile(),
  assetCredential: z.string().default("").volatile(),
  requestTimeoutMs: z.number().min(1000).max(120000).default(20000),
  maxResourceBytes: z.number().min(1000).max(200_000_000).default(50_000_000),
};
export type { ResourceConfig } from "./config-types.ts";
const categorySchema = json.enum(["data", "business", "library"]);
const kindSchema = json.enum(["component", "asset"]);
const resourceKey = credentialRef("IPOLLO_RESOURCES_API_KEY");
const importSchema = json.object({
  workspaceId: json.string(),
  sessionId: json.string().regex(/^[\w-]{1,128}$/),
  item: json.object({
    id: json.string(),
    title: json.string(),
    description: json.string(),
    kind: kindSchema,
  }),
  theme: resourceThemeSchema.optional(),
});

/** A plugin-owned provider lifetime. Document HTML, tokens and manifests remain unchanged. */
export class StudioResources {
  private readonly activeProviders = new Set<ResourceProviders>();
  private closed = false;
  constructor(
    private ctx: Context,
    private kind: "design" | "video",
    private config: ResourceConfig,
    private packageRoot: string,
  ) {
    if (config.componentApi) apiOrigin(config.componentApi);
    if (config.assetApi) apiOrigin(config.assetApi);
    for (const reference of [
      config.componentCredential,
      config.assetCredential,
    ])
      if (reference) validateStudioCredential(reference);
  }
  private createProviders() {
    const config = this.config;
    return new ResourceProviders(
      {
        componentApi: config.componentApi,
        assetApi: config.assetApi,
        timeoutMs: config.requestTimeoutMs,
        maxResourceBytes: config.maxResourceBytes,
      },
      async (provider) => {
        const shared = await this.ctx.credentials.resolve(resourceKey);
        if (shared) return shared.value;
        const key =
          provider === "component"
            ? config.componentCredential
            : config.assetCredential;
        if (!key) return;
        const record = await readStudioCredential(this.ctx, key);
        if (record?.kind === "api-key" && record.key) return record.key;
        const payload = record?.kind === "grant" ? record.payload : undefined;
        if (typeof payload === "string") return payload;
        if (
          payload &&
          typeof payload === "object" &&
          "token" in payload &&
          typeof payload.token === "string"
        )
          return payload.token;
        throw new StudioHttpError(
          503,
          "The configured resource credential is unavailable.",
        );
      },
    );
  }
  /** Resolve a resource request after the owning Studio API has authorized it. */
  async handle(
    ctx: Context,
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<boolean> {
    if (url.pathname.endsWith("/api/resource-key")) {
      if (this.closed)
        throw new StudioHttpError(503, "Resource service has been unloaded.");
      if (req.method === "POST") {
        const body = await requestObject(req, 16_384);
        const key =
          "key" in body && typeof body.key === "string" ? body.key.trim() : "";
        if (!key || key.length > 8192 || /[\r\n]/.test(key))
          throw new StudioHttpError(400, "Enter a valid resource API key.");
        if (!(await this.ctx.credentials.describe(resourceKey)).writable)
          throw new StudioHttpError(
            403,
            "The resource credential is read-only.",
          );
        await this.ctx.credentials.set(resourceKey, key);
      } else if (req.method !== "GET") {
        throw new StudioHttpError(
          405,
          "Resource key requests use GET or POST.",
        );
      }
      const info = await this.ctx.credentials.describe(resourceKey);
      sendJson(res, 200, {
        configured: info.configured,
        writable: info.writable,
      });
      return true;
    }
    if (!url.pathname.endsWith("/api/resources")) return false;
    if (this.closed)
      throw new StudioHttpError(503, "Resource service has been unloaded.");
    const providers = this.createProviders();
    this.activeProviders.add(providers);
    try {
      return await this.handleRequest(ctx, req, res, url, providers);
    } finally {
      await providers.dispose();
      this.activeProviders.delete(providers);
    }
  }
  private async handleRequest(
    ctx: Context,
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
    providers: ResourceProviders,
  ): Promise<boolean> {
    if (req.method === "GET") {
      const category = categorySchema.parse(
        url.searchParams.get("category") ?? "data",
      );
      sendJson(
        res,
        200,
        await providers.search(category, url.searchParams.get("q") ?? ""),
      );
      return true;
    }
    if (req.method !== "POST")
      throw new StudioHttpError(405, "Resource requests use GET or POST.");
    const input = importSchema.parse(await requestObject(req));
    const root = workspaceRoot(ctx, input.workspaceId);
    const directory = dirname(
      await verifiedWritePath(
        root,
        `${this.kind}/${input.sessionId}/index.html`,
        this.kind,
        "Studio",
      ),
    );
    const theme = input.theme ?? defaultTheme;
    const resource = await providers.acquire(input.item, directory, theme);
    let html: string;
    if (resource.kind === "component") {
      const source = await readFile(join(directory, resource.file), "utf8");
      const runtime = await readFile(
        join(this.packageRoot, "lib/component-runtime.js"),
        "utf8",
      );
      const rendered = componentHtml(source, resource, theme, runtime);
      const renderedPath = resource.file.replace(/\.html$/, ".render.html");
      await writeFile(join(directory, renderedPath), rendered, "utf8");
      html =
        this.kind === "video"
          ? `<div class="clip" data-composition-id="${resource.id}" data-composition-src="${escapeHtml(resource.file)}" data-variable-values="${escapeHtml(JSON.stringify(resource.variables))}" data-start="0" data-duration="5" data-track-index="1" style="position:absolute;inset:0"></div>`
          : `<iframe data-ipw-resource="${resource.id}" title="${escapeHtml(resource.title)}" srcdoc="${escapeHtml(rendered)}" sandbox="allow-scripts" style="width:100%;height:540px;border:0"></iframe>`;
    } else
      html =
        resource.kind === "video"
          ? `<video src="${escapeHtml(resource.file)}" controls style="max-width:100%"></video>`
          : `<img src="${escapeHtml(resource.file)}" alt="${escapeHtml(resource.title)}" style="max-width:100%">`;
    sendJson(res, 200, { resource, html });
    return true;
  }
  /** Reject new imports and cancel provider I/O while admitted handlers drain. */
  stop(): void {
    this.closed = true;
    for (const provider of this.activeProviders) provider.stop();
  }
  /** Await provider work after the owning route has drained its handlers. */
  async dispose(): Promise<void> {
    this.stop();
    await Promise.all(
      [...this.activeProviders].map((provider) => provider.dispose()),
    );
  }
}
