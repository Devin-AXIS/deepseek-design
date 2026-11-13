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
import { StudioError } from "../../studio-core/src/errors.ts";
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
import { readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-host-webserver";
import { defineTool } from "@deepseek-ai/dsh-tools";
import type {} from "@deepseek-ai/dsh-workspace";
import {
  templateManifestV1Schema,
  type TemplateManifestV1,
} from "../../studio-core/src/original/types/src/templates";
import {
  videoProjectDirectory,
  videoProjectId,
} from "../../studio-core/src/original/video-studio/src/project";
import {
  requireStudioOwner,
  registerStudioRoute,
  sendStudioError,
  handleStudioBootstrap,
  field,
  readStudioText,
  requireStudioToken,
  requestObject,
  sendJson,
  stringField,
  StudioHttpError,
  writeStudioText,
  workspaceRoot,
} from "../../studio-core/src/http";
import {
  applyBundledTemplate,
  loadBundledTemplates,
  streamTemplateCover,
  templateById,
  templateCatalog,
  type BundledTemplate,
  withOperationLock,
} from "../../studio-core/src/templates";
import { VideoRuntimeManager } from "./runtime";

const ROUTE_ROOT = "/ipollowork-video" as const;
const STUDIO_TITLE = "iVideo";
const TOKEN_HEADER = "x-ipollowork-video-token";
const SESSION_ID = /^[A-Za-z0-9_-]{1,128}$/;
const MAX_TEXT_BYTES = 4 * 1024 * 1024;
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

type Runtime = {
  token: string;
  templatesRoot: string;
  templatesPromise: Promise<BundledTemplate[]> | null;
  operations: Map<string, Promise<void>>;
  switches: Map<string, Promise<void>>;
  manager: VideoRuntimeManager;
  resources: StudioResources;
  services: StudioServices;
  serviceRoutes: StudioServiceRoutes;
};

function sessionId(value: string) {
  if (!SESSION_ID.test(value))
    throw new StudioHttpError(400, "Invalid iVideo session id.");
  return value;
}

function allowsVideoTemplate(manifest: TemplateManifestV1) {
  return manifest.surface === "video" && manifest.category === "video";
}

function bundledTemplates(runtime: Runtime) {
  runtime.templatesPromise ??= loadBundledTemplates(
    runtime.templatesRoot,
    allowsVideoTemplate,
  ).catch((error) => {
    runtime.templatesPromise = null;
    throw error;
  });
  return runtime.templatesPromise;
}

async function session(
  runtime: Runtime,
  root: string,
  rawSessionId: string,
  viewId?: string,
) {
  await runtime.services.ensureProjectByRoot(root, sessionId(rawSessionId));
  return runtime.manager.start({
    workspaceRoot: root,
    sessionId: sessionId(rawSessionId),
    viewId,
  });
}

async function applyTemplate(input: {
  runtime: Runtime;
  workspaceRoot: string;
  sessionId: string;
  templateId: string;
  viewId?: string;
}) {
  const id = sessionId(input.sessionId);
  const template =
    (await bundledTemplates(input.runtime)).find(
      (item) => item.manifest.id === input.templateId,
    ) ??
    (await input.runtime.services.templateSourceByRoot(
      input.workspaceRoot,
      input.templateId,
    ));
  const operationKey = `${input.workspaceRoot}:${videoProjectId(id)}`;
  return withOperationLock(input.runtime.switches, operationKey, async () => {
    const current = await input.runtime.manager.start({
      workspaceRoot: input.workspaceRoot,
      sessionId: id,
    });
    const projectsRoot = dirname(current.projectPath);
    await input.runtime.manager.stop({
      workspaceRoot: input.workspaceRoot,
      sessionId: id,
    });
    try {
      const active = await applyBundledTemplate({
        operations: input.runtime.operations,
        operationKey,
        template,
        projectsRoot,
        projectId: videoProjectId(id),
        prepareStaged: async (directory) => {
          await writeFile(
            resolve(directory, "brief.json"),
            `${JSON.stringify(
              {
                title: template.manifest.title,
                templateId: template.manifest.id,
                createdBy: "deepseek-harness",
              },
              null,
              2,
            )}\n`,
            "utf8",
          );
        },
        validateInstalled: async () => {
          const manifest = templateManifestV1Schema.parse(
            JSON.parse(
              await readFile(
                resolve(projectsRoot, videoProjectId(id), "manifest.json"),
                "utf8",
              ),
            ),
          );
          if (!allowsVideoTemplate(manifest))
            throw new StudioHttpError(
              409,
              "The installed template is not an iVideo template.",
            );
          return input.runtime.manager.start({
            workspaceRoot: input.workspaceRoot,
            sessionId: id,
            viewId: input.viewId,
          });
        },
      });
      return active;
    } catch (error) {
      await input.runtime.manager
        .start({
          workspaceRoot: input.workspaceRoot,
          sessionId: id,
          viewId: input.viewId,
        })
        .catch(() => undefined);
      throw error;
    }
  });
}

async function handleApi(
  runtime: Runtime,
  ctx: Context,
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
) {
  requireStudioToken(req, TOKEN_HEADER, runtime.token, STUDIO_TITLE);
  if (await runtime.resources.handle(ctx, req, res, url)) return;
  if (await runtime.serviceRoutes.handle(req, res, url)) return;
  const action = url.pathname.slice(`${ROUTE_ROOT}/api`.length);
  if (req.method === "GET" && action === "/session") {
    const workspaceId = url.searchParams.get("workspaceId")?.trim();
    const rawSessionId = url.searchParams.get("sessionId")?.trim();
    if (!workspaceId || !rawSessionId)
      throw new StudioHttpError(400, "Missing workspaceId or sessionId.");
    sendJson(
      res,
      200,
      await session(
        runtime,
        workspaceRoot(ctx, workspaceId),
        rawSessionId,
        url.searchParams.get("viewId")?.trim(),
      ),
    );
    return;
  }
  if (req.method === "GET" && action === "/file") {
    const workspaceId = url.searchParams.get("workspaceId")?.trim();
    const rawSessionId = url.searchParams.get("sessionId")?.trim();
    const path = url.searchParams.get("path")?.trim();
    if (!workspaceId || !rawSessionId || !path)
      throw new StudioHttpError(
        400,
        "Missing workspaceId, sessionId, or path.",
      );
    const id = sessionId(rawSessionId);
    sendJson(
      res,
      200,
      await readStudioText({
        root: workspaceRoot(ctx, workspaceId),
        requested: path,
        prefix: videoProjectDirectory(id),
        studioTitle: STUDIO_TITLE,
        maxBytes: MAX_TEXT_BYTES,
      }),
    );
    return;
  }
  if (req.method === "POST" && action === "/file") {
    const body = await requestObject(req);
    const bodyWorkspaceId = stringField(
      field(body, "workspaceId"),
      "workspaceId",
    );
    const id = sessionId(stringField(field(body, "sessionId"), "sessionId"));
    const content = field(body, "content");
    if (typeof content !== "string")
      throw new StudioHttpError(400, "Missing content.");
    sendJson(
      res,
      200,
      await writeStudioText({
        root: workspaceRoot(ctx, bodyWorkspaceId),
        requested: stringField(field(body, "path"), "path"),
        prefix: videoProjectDirectory(id),
        studioTitle: STUDIO_TITLE,
        content,
        maxBytes: MAX_TEXT_BYTES,
        baseUpdatedAt:
          typeof field(body, "baseUpdatedAt") === "number"
            ? Number(field(body, "baseUpdatedAt"))
            : undefined,
        force: field(body, "force") === true,
      }),
    );
    return;
  }
  if (req.method === "GET" && action === "/templates") {
    const workspaceId = url.searchParams.get("workspaceId")?.trim();
    if (!workspaceId) throw new StudioHttpError(400, "Missing workspaceId.");
    workspaceRoot(ctx, workspaceId);
    sendJson(res, 200, [
      ...(await runtime.services.templateCatalog(workspaceId)).filter(
        (item) =>
          item.sourceType === "local" && item.manifest.surface === "video",
      ),
      ...templateCatalog(await bundledTemplates(runtime)),
    ]);
    return;
  }
  if (req.method === "GET" && action === "/template-cover") {
    const workspaceId = url.searchParams.get("workspaceId")?.trim();
    const templateId = url.searchParams.get("templateId")?.trim();
    if (!workspaceId || !templateId)
      throw new StudioHttpError(400, "Missing workspaceId or templateId.");
    workspaceRoot(ctx, workspaceId);
    await streamTemplateCover(
      res,
      (await bundledTemplates(runtime)).find(
        (item) => item.manifest.id === templateId,
      ) ??
        (await runtime.services.templateSourceByRoot(
          workspaceRoot(ctx, workspaceId),
          templateId,
        )),
    );
    return;
  }
  if (req.method === "POST" && action === "/template") {
    const body = await requestObject(req);
    const bodyWorkspaceId = stringField(
      field(body, "workspaceId"),
      "workspaceId",
    );
    sendJson(
      res,
      200,
      await applyTemplate({
        runtime,
        workspaceRoot: workspaceRoot(ctx, bodyWorkspaceId),
        sessionId: stringField(field(body, "sessionId"), "sessionId"),
        templateId: stringField(field(body, "templateId"), "templateId"),
        viewId:
          typeof field(body, "viewId") === "string"
            ? String(field(body, "viewId")).trim()
            : undefined,
      }),
    );
    return;
  }
  if (req.method === "POST" && action === "/release") {
    const body = await requestObject(req);
    const bodyWorkspaceId = stringField(
      field(body, "workspaceId"),
      "workspaceId",
    );
    await runtime.manager.release({
      workspaceRoot: workspaceRoot(ctx, bodyWorkspaceId),
      sessionId: sessionId(stringField(field(body, "sessionId"), "sessionId")),
      viewId: stringField(field(body, "viewId"), "viewId"),
    });
    sendJson(res, 200, { ok: true });
    return;
  }
  throw new StudioHttpError(404, "Unknown iVideo API route.");
}

function validationTool(runtime: Runtime) {
  return defineTool({
    name: "ipollowork_video_validate",
    description:
      "Validate the current session’s editable video and return issues with its project path.",
    parameters: {},
    output: {
      schema: { type: "object", additionalProperties: true },
      render: (_args, value) => [
        { type: "text", text: JSON.stringify(value, null, 2) },
      ],
    },
    timeoutMs: 120_000,
    async execute(args, exec) {
      if (Object.keys(args).length)
        throw new StudioError(
          "INVALID_ARGS",
          "This tool checks the current session project and takes no arguments.",
        );
      const session = exec.agent?.session;
      if (!session?.header.cwd)
        throw new StudioError(
          "STUDIO_CONTEXT",
          "Open a workspace session before validating its video.",
        );
      exec.signal.throwIfAborted();
      const root = session.header.cwd;
      const result = await runtime.manager.validate({
        workspaceRoot: root,
        sessionId: sessionId(session.id),
        signal: exec.signal,
      });
      return {
        ok: result.ok,
        exitCode: result.exitCode,
        report: result.report,
        output: result.output,
        project: videoProjectDirectory(session.id),
      };
    },
  });
}

function createRuntime(
  ctx: Context,
  config: ResourceConfig & ServiceConfig,
): Runtime {
  const services = new StudioServices(ctx, "video", config, packageRoot);
  return {
    services,
    serviceRoutes: new StudioServiceRoutes(
      ctx,
      services,
      ROUTE_ROOT,
      config.maxLocalMediaBytes,
    ),
    token: randomBytes(32).toString("base64url"),
    templatesRoot: resolve(packageRoot, "lib/templates"),
    templatesPromise: null,
    operations: new Map(),
    switches: new Map(),
    manager: new VideoRuntimeManager(),
    resources: new StudioResources(ctx, "video", config, packageRoot),
  };
}

export const inject = [
  "webServer",
  "workspaceRegistry",
  "connection",
  "tools",
  "credentials",
  "sandboxPolicy",
];

export function apply(ctx: Context, config: StudioHostConfig): void {
  const runtime = createRuntime(ctx, resolveStudioConfig(config));
  registerStudioRoute(
    ctx,
    {
      kind: "prefix",
      path: ROUTE_ROOT,
      handler: async (req, res) => {
        try {
          requireStudioOwner(ctx, req);
          const url = new URL(req.url ?? ROUTE_ROOT, "http://localhost");
          if (handleStudioBootstrap(req, res, url, ROUTE_ROOT, runtime.token))
            return;
          if (url.pathname.startsWith(`${ROUTE_ROOT}/api`))
            await handleApi(runtime, ctx, req, res, url);
          else throw new StudioHttpError(404, "iVideo route was not found.");
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
        runtime.manager.dispose(),
        runtime.services.dispose(),
      ]),
    () => {
      runtime.resources.stop();
      runtime.services.stop();
      runtime.manager.cancel();
    },
  );
  ctx.effect(
    () => ctx.tools.register(validationTool(runtime)),
    "deepseek-ivideo: validation tool",
  );
}
