import {
  resolveStudioConfig,
  type StudioHostConfig,
} from "../../studio-core/src/config-types.ts";
import {
  StudioServices,
  serviceFields,
  type ServiceConfig,
} from "../../studio-core/src/services.ts";
import { StudioServiceRoutes } from "../../studio-core/src/service-routes.ts";
import z from "@deepseek-ai/schemastery";
import { placementFields } from "../../studio-core/src/placement.ts";
import {
  StudioResources,
  resourceFields,
  type ResourceConfig,
} from "../../studio-core/src/resource-host.ts";
export const Config = z.object({
  ...placementFields,
  ...resourceFields,
  ...serviceFields,
});
import { randomBytes } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { readdir, stat } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-host-webserver";
import type {} from "@deepseek-ai/dsh-workspace";
import {
  isCustomerVisibleBundledTemplate,
  templateManifestV1Schema,
  type TemplateManifestV1,
  type TemplateSessionSnapshot,
} from "../../studio-core/src/original/types/src/templates";
import {
  requireStudioOwner,
  registerStudioRoute,
  sendStudioError,
  handleStudioBootstrap,
  contentType,
  errorCode,
  field,
  readStudioText,
  requireStudioToken,
  requestObject as requestJson,
  safeAssetPath as safeTemplatePath,
  safeRelativePath as sharedSafeRelativePath,
  sendJson,
  stringField,
  StudioHttpError as HttpError,
  verifiedExistingPath as sharedVerifiedExistingPath,
  verifiedWritePath as sharedVerifiedWritePath,
  writeStudioText,
  workspaceRoot,
} from "../../studio-core/src/http";
import {
  applyBundledTemplate,
  loadBundledTemplates,
  streamTemplateCover,
  templateCatalog as sharedTemplateCatalog,
  type BundledTemplate,
} from "../../studio-core/src/templates";

export type DeepSeekDesignStudioMode = "design" | "slides";
export type DeepSeekDesignStudioPluginOptions = {
  mode: DeepSeekDesignStudioMode;
  routeRoot: `/${string}`;
  studioTitle: string;
  defaultTemplateId: string;
  projectSuffix?: string;
};

type Runtime = DeepSeekDesignStudioPluginOptions & {
  token: string;
  templatesRoot: string;
  templatePromise: Promise<BundledTemplate[]> | null;
  operations: Map<string, Promise<void>>;
  resources: StudioResources;
  services: StudioServices;
  serviceRoutes: StudioServiceRoutes;
};

const MAX_TEXT_BYTES = 20 * 1024 * 1024;
const MAX_CATALOG_ENTRIES = 1_000;
const SESSION_ID = /^[A-Za-z0-9_-]{1,128}$/;
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESIGN_STUDIO_FILES = {
  prefix: "design",
  studioTitle: "Design Studio",
  maxBytes: MAX_TEXT_BYTES,
  conflictMessage:
    "The design changed since it was loaded. Reload before saving.",
};

function requireToken(req: IncomingMessage, runtime: Runtime) {
  requireStudioToken(
    req,
    "x-ipollowork-design-token",
    runtime.token,
    runtime.studioTitle,
  );
}

function safeRelativePath(value: string, prefix = "design/") {
  return sharedSafeRelativePath(value, prefix, "Design Studio");
}

async function verifiedExistingPath(root: string, requested: string) {
  return sharedVerifiedExistingPath(root, requested, "design", "Design Studio");
}

async function verifiedWritePath(root: string, requested: string) {
  return sharedVerifiedWritePath(root, requested, "design", "Design Studio");
}

function projectSessionId(runtime: Runtime, sessionId: string) {
  if (!SESSION_ID.test(sessionId))
    throw new HttpError(400, "Invalid session id.");
  const projectId = `${sessionId}${runtime.projectSuffix ?? ""}`;
  if (!SESSION_ID.test(projectId))
    throw new HttpError(400, "Session id is too long for this Studio project.");
  return projectId;
}

function allowsTemplate(runtime: Runtime, manifest: TemplateManifestV1) {
  return (
    manifest.surface === "design" && isCustomerVisibleBundledTemplate(manifest)
  );
}

async function loadTemplates(runtime: Runtime) {
  return loadBundledTemplates(runtime.templatesRoot, (manifest) =>
    allowsTemplate(runtime, manifest),
  );
}

function bundledTemplates(runtime: Runtime) {
  runtime.templatePromise ??= loadTemplates(runtime).catch((error) => {
    runtime.templatePromise = null;
    throw error;
  });
  return runtime.templatePromise;
}

async function templateSession(
  root: string,
  sessionId: string,
  runtime: Runtime,
): Promise<TemplateSessionSnapshot> {
  return runtime.services.ensureProjectByRoot(
    root,
    projectSessionId(runtime, sessionId),
  );
}

async function readText(root: string, requested: string) {
  return readStudioText({ root, requested, ...DESIGN_STUDIO_FILES });
}

async function writeText(
  root: string,
  requested: string,
  content: string,
  baseUpdatedAt?: number | null,
  force = false,
) {
  return writeStudioText({
    root,
    requested,
    content,
    baseUpdatedAt,
    force,
    ...DESIGN_STUDIO_FILES,
  });
}

async function listFiles(root: string, requestedPrefix: string) {
  const prefix = requestedPrefix ? safeRelativePath(requestedPrefix) : "design";
  const start = await verifiedExistingPath(root, prefix).catch((error) => {
    if (error instanceof HttpError && error.status === 404) return null;
    throw error;
  });
  if (!start) return [];
  const items: Array<{
    path: string;
    kind: "file" | "dir";
    size: number;
    mtimeMs: number;
    revision: string;
  }> = [];
  const walk = async (directory: string) => {
    for (const entry of await readdir(directory, { withFileTypes: true }).catch(
      (error: unknown) => {
        if (errorCode(error) === "ENOENT") return [];
        throw error;
      },
    )) {
      if (items.length >= MAX_CATALOG_ENTRIES) return;
      const path = resolve(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      const info = await stat(path);
      const workspacePath = relative(root, path).split(sep).join("/");
      items.push({
        path: workspacePath,
        kind: entry.isDirectory() ? "dir" : "file",
        size: info.size,
        mtimeMs: info.mtimeMs,
        revision: `${info.mtimeMs}-${info.size}`,
      });
      if (entry.isDirectory()) await walk(path);
    }
  };
  await walk(start);
  return items;
}

async function templateCatalog(runtime: Runtime, workspaceId: string) {
  const bundled = sharedTemplateCatalog(await bundledTemplates(runtime));
  const personal = (await runtime.services.templateCatalog(workspaceId)).filter(
    (item) => item.sourceType === "local" && item.manifest.surface === "design",
  );
  return [...personal, ...bundled];
}

async function templateById(
  runtime: Runtime,
  templateId: string,
  root: string,
) {
  const template = (await bundledTemplates(runtime)).find(
    (item) => item.manifest.id === templateId,
  );
  return template ?? runtime.services.templateSourceByRoot(root, templateId);
}

async function applyTemplate(
  root: string,
  sessionId: string,
  templateId: string,
  runtime: Runtime,
) {
  const projectId = projectSessionId(runtime, sessionId);
  const template = await templateById(runtime, templateId, root);
  const designRoot = resolve(root, "design");
  return applyBundledTemplate({
    operations: runtime.operations,
    operationKey: `${root}:${projectId}`,
    template,
    projectsRoot: designRoot,
    projectId,
    validateInstalled: () => templateSession(root, sessionId, runtime),
  });
}

async function handleApi(
  runtime: Runtime,
  ctx: Context,
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
) {
  requireToken(req, runtime);
  if (await runtime.resources.handle(ctx, req, res, url)) return;
  if (await runtime.serviceRoutes.handle(req, res, url)) return;
  const action = url.pathname.slice(`${runtime.routeRoot}/api`.length);
  const workspaceId = url.searchParams.get("workspaceId")?.trim();
  if (req.method === "GET" && action === "/session") {
    const sessionId = url.searchParams.get("sessionId")?.trim();
    if (!workspaceId || !sessionId)
      throw new HttpError(400, "Missing workspaceId or sessionId.");
    sendJson(
      res,
      200,
      await templateSession(
        workspaceRoot(ctx, workspaceId),
        sessionId,
        runtime,
      ),
    );
    return;
  }
  if (req.method === "GET" && action === "/templates") {
    if (!workspaceId) throw new HttpError(400, "Missing workspaceId.");
    workspaceRoot(ctx, workspaceId);
    sendJson(res, 200, await templateCatalog(runtime, workspaceId));
    return;
  }
  if (req.method === "GET" && action === "/template-cover") {
    const templateId = url.searchParams.get("templateId")?.trim();
    if (!workspaceId || !templateId)
      throw new HttpError(400, "Missing workspaceId or templateId.");
    workspaceRoot(ctx, workspaceId);
    await streamTemplateCover(
      res,
      await templateById(runtime, templateId, workspaceRoot(ctx, workspaceId)),
    );
    return;
  }
  if (req.method === "POST" && action === "/template") {
    const body = await requestJson(req);
    const bodyWorkspaceId = stringField(
      field(body, "workspaceId"),
      "workspaceId",
    );
    sendJson(
      res,
      200,
      await applyTemplate(
        workspaceRoot(ctx, bodyWorkspaceId),
        stringField(field(body, "sessionId"), "sessionId"),
        stringField(field(body, "templateId"), "templateId"),
        runtime,
      ),
    );
    return;
  }
  if (req.method === "GET" && action === "/files") {
    if (!workspaceId) throw new HttpError(400, "Missing workspaceId.");
    sendJson(
      res,
      200,
      await listFiles(
        workspaceRoot(ctx, workspaceId),
        url.searchParams.get("prefix")?.trim() || "design",
      ),
    );
    return;
  }
  if (req.method === "GET" && action === "/file") {
    const path = url.searchParams.get("path")?.trim();
    if (!workspaceId || !path)
      throw new HttpError(400, "Missing workspaceId or path.");
    sendJson(res, 200, await readText(workspaceRoot(ctx, workspaceId), path));
    return;
  }
  if (req.method === "POST" && action === "/file") {
    const body = await requestJson(req);
    const bodyWorkspaceId = stringField(
      field(body, "workspaceId"),
      "workspaceId",
    );
    const path = stringField(field(body, "path"), "path");
    const content = field(body, "content");
    if (typeof content !== "string")
      throw new HttpError(400, "Missing content.");
    const rawBaseUpdatedAt = field(body, "baseUpdatedAt");
    sendJson(
      res,
      200,
      await writeText(
        workspaceRoot(ctx, bodyWorkspaceId),
        path,
        content,
        typeof rawBaseUpdatedAt === "number" ? rawBaseUpdatedAt : null,
        field(body, "force") === true,
      ),
    );
    return;
  }
  if (req.method === "GET" && action === "/raw") {
    const path = url.searchParams.get("path")?.trim();
    if (!workspaceId || !path)
      throw new HttpError(400, "Missing workspaceId or path.");
    const file = await verifiedExistingPath(
      workspaceRoot(ctx, workspaceId),
      path,
    );
    const info = await stat(file);
    if (!info.isFile())
      throw new HttpError(400, "Design Studio path is not a file.");
    res.writeHead(200, {
      "content-type": contentType(file),
      "content-length": info.size,
      "content-disposition": `inline; filename="${basename(file).replace(/["\\]/g, "_")}"`,
      "cache-control": "no-store",
    });
    await pipeline(createReadStream(file), res);
    return;
  }
  throw new HttpError(404, `Unknown ${runtime.studioTitle} API route.`);
}

export function createDeepSeekDesignStudioPlugin(
  options: DeepSeekDesignStudioPluginOptions,
) {
  return {
    inject: [
      "webServer",
      "workspaceRegistry",
      "connection",
      "credentials",
      "tools",
      "sandboxPolicy",
    ],
    apply(ctx: Context, hostConfig: StudioHostConfig): void {
      const config = resolveStudioConfig(hostConfig);
      const services = new StudioServices(ctx, "design", config, packageRoot);
      const runtime: Runtime = {
        services,
        serviceRoutes: new StudioServiceRoutes(
          ctx,
          services,
          options.routeRoot,
          config.maxLocalMediaBytes,
        ),
        ...options,
        token: randomBytes(32).toString("base64url"),
        templatesRoot: resolve(packageRoot, "lib/templates"),
        templatePromise: null,
        operations: new Map(),
        resources: new StudioResources(ctx, "design", config, packageRoot),
      };
      registerStudioRoute(
        ctx,
        {
          kind: "prefix",
          path: runtime.routeRoot,
          handler: async (req, res) => {
            try {
              requireStudioOwner(ctx, req);
              const url = new URL(
                req.url ?? runtime.routeRoot,
                "http://localhost",
              );
              if (
                handleStudioBootstrap(
                  req,
                  res,
                  url,
                  runtime.routeRoot,
                  runtime.token,
                )
              )
                return;
              if (url.pathname.startsWith(`${runtime.routeRoot}/api`))
                await handleApi(runtime, ctx, req, res, url);
              else
                throw new HttpError(
                  404,
                  `${runtime.studioTitle} route was not found.`,
                );
            } catch (error) {
              if (res.headersSent) {
                res.destroy(error instanceof Error ? error : undefined);
                return;
              }
              sendStudioError(res, error);
            }
          },
        },
        () =>
          Promise.all([
            runtime.resources.dispose(),
            runtime.services.dispose(),
          ]),
        () => {
          runtime.resources.stop();
          runtime.services.stop();
        },
      );
    },
  };
}

const plugin = createDeepSeekDesignStudioPlugin({
  mode: "design",
  routeRoot: "/ipollowork-design",
  studioTitle: "DeepSeek iDesign",
  defaultTemplateId: "ipollowork.deepseek-harness.design",
});
export const inject = plugin.inject;
export const apply = plugin.apply;
