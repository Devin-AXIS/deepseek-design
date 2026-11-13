import type {} from "@deepseek-ai/dsh-sandbox-policy";
import { realpath, lstat } from "node:fs/promises";
import { resolve as resolvePath } from "node:path";
import { isApiError, formatError } from "./original/apps/server/src/errors.ts";
import type { ServiceConfig } from "./config-types.ts";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, realpathSync, existsSync, lstatSync } from "node:fs";
import { inside } from "./http.ts";
import mediaManifest from "./original/examples/plugin-packages/media-studio/ipollowork.plugin.json" with { type: "json" };
import {
  registerNativeTemplateSnapshot,
  ensureNativeStudioProject,
  nativeTemplateSource,
  listTemplates,
  saveTemplateFromSession,
  exportTemplateFromSession,
  validateTemplateFromSession,
  readTemplateCover,
  disposeTemplateStore,
} from "./original/apps/server/src/templates.ts";
import {
  templateManifestV1Schema,
  type TemplateCategory,
} from "./original/types/src/templates.ts";
import { stat } from "node:fs/promises";
/** Original media, publishing and generation services, owned and disposed by the native plugin. */
import { mkdir, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Context } from "@deepseek-ai/cordis";
import Schema from "@deepseek-ai/schemastery";
import { z } from "zod";
import {
  readStudioCredential,
  validateStudioCredential,
} from "./credentials.ts";
import {
  runStudioService,
  serviceEnvironment,
  serviceSignal,
} from "./service-runtime.ts";
import { defineTool } from "@deepseek-ai/dsh-tools";
import type { ServerConfig } from "./original/apps/server/src/types.ts";
import type { AuthorizationAccess } from "./original/apps/server/src/authorization-center.ts";
import {
  callStorageExtensionAction,
  STORAGE_EXTENSION_ACTIONS,
} from "./original/apps/server/src/extensions/storage.ts";
import {
  callMediaExtensionAction,
  MEDIA_EXTENSION_ACTIONS,
} from "./original/apps/server/src/extensions/media-center.ts";
import {
  callVideoGenerationAction,
  startVideoJobWorker,
  VIDEO_GENERATION_EXTENSION_ACTIONS,
} from "./original/apps/server/src/extensions/video-generation.ts";
import {
  callVideoEnhancementAction,
  closeVideoEnhancement,
  VIDEO_ENHANCEMENT_ACTIONS,
} from "./original/apps/server/src/extensions/video-enhancement.ts";
import {
  callOpenAiImageGenerationExtensionAction,
  OPENAI_IMAGE_GENERATION_EXTENSION_ACTIONS,
} from "./original/apps/server/src/extensions/openai-image-generation.ts";
import { listSessionArtifacts } from "./original/apps/server/src/session-artifacts.ts";
import { parsePluginPackageManifest } from "./original/types/src/plugins.ts";
import { StudioError } from "./errors.ts";
import {
  workspaceRoot,
  verifiedExistingPath,
  verifiedWritePath,
} from "./http.ts";

export const serviceFields = {
  maxLocalMediaBytes: Schema.number()
    .min(1000)
    .max(2_000_000_000)
    .default(500 * 1024 * 1024),
  serviceCredentials: Schema.dict(Schema.string()).default({}).volatile(),
  enhancementModelsPath: Schema.string().default("").volatile(),
  ffmpegPath: Schema.string().default("").volatile(),
  ffprobePath: Schema.string().default("").volatile(),
};
export type { ServiceConfig } from "./config-types.ts";
const mediaActions = mediaManifest.resources.flatMap((resource) =>
  ("actions" in resource ? (resource.actions ?? []) : []).map((action) => ({
    extensionId: "media-studio",
    action: action.id,
    title: action.title,
    description: action.description,
    inputSchema: action.inputSchema,
  })),
);
const actions = [
  ...mediaActions,
  ...STORAGE_EXTENSION_ACTIONS,
  ...MEDIA_EXTENSION_ACTIONS,
  ...VIDEO_GENERATION_EXTENSION_ACTIONS,
  ...VIDEO_ENHANCEMENT_ACTIONS,
  ...OPENAI_IMAGE_GENERATION_EXTENSION_ACTIONS,
];
export const serviceCallSchema = z.object({
  extensionId: z.enum([
    "storage",
    "media",
    "video-generation",
    "video-enhancement",
    "openai-image-generation",
    "media-studio",
  ]),
  action: z.string().min(1).max(120),
  args: z.record(z.string(), z.unknown()).default({}),
  context: z
    .object({
      workspaceId: z.string().min(1),
      sessionId: z.string().min(1).optional(),
    })
    .passthrough(),
});
type Call = z.infer<typeof serviceCallSchema>;
interface MediaService {
  actions: Record<
    string,
    (
      args: Record<string, unknown>,
      context: Record<string, unknown>,
    ) => unknown | Promise<unknown>
  >;
  dispose?: () => unknown | Promise<unknown>;
}
interface Scope {
  config: ServerConfig;
  authorization: AuthorizationAccess;
  worker: ReturnType<typeof startVideoJobWorker>;
  media?: Promise<MediaService>;
}

/** Reuse the original implementations; DSH supplies workspace identity and credential records. */
export class StudioServices {
  private scopes = new Map<string, Scope>();
  private closed = false;
  private lifetime = new AbortController();
  private pending = new Set<Promise<unknown>>();
  constructor(
    private ctx: Context,
    private kind: "design" | "video",
    private options: ServiceConfig,
    private packageRoot: string,
  ) {
    for (const reference of Object.values(options.serviceCredentials ?? {}))
      if (reference) validateStudioCredential(reference);
    ctx.effect(
      () => ctx.tools.register(this.actionTool()),
      `Studio ${kind} actions`,
    );
  }
  private actionTool() {
    const input = z
      .object({
        extensionId: serviceCallSchema.shape.extensionId,
        action: z.string().min(1).max(120),
        args: z.record(z.string(), z.unknown()).default({}),
      })
      .strict();
    return defineTool({
      name: `ipollowork_${this.kind}_action`,
      description:
        "Run media, narration, generation, enhancement or publishing actions for the current project. Read-only sessions permit read actions. Use list to discover actions, then describe with args.name to read one action's inputs before calling it.",
      parameters: {
        extensionId: {
          type: "string",
          required: true,
          enum: [
            "storage",
            "media",
            "video-generation",
            "video-enhancement",
            "openai-image-generation",
            "media-studio",
          ],
        },
        action: { type: "string", required: true },
        args: { type: "object", additionalProperties: true },
      },
      output: {
        schema: { type: "object", additionalProperties: true },
        render: (_args, value) => [
          { type: "text", text: JSON.stringify(value) },
        ],
      },
      timeoutMs: 420000,
      execute: async (raw, exec) => {
        const parsed = input.safeParse(raw);
        if (!parsed.success)
          throw new StudioError(
            "INVALID_ARGS",
            "Supply a service, an action and its declared inputs.",
          );
        const { extensionId, action, args } = parsed.data;
        if (action === "list")
          return {
            result: this.listActions(extensionId).map(({ action, title }) => ({
              action,
              title,
            })),
          };
        if (action === "describe") {
          const name = z.string().min(1).parse(args.name);
          const found = this.listActions(extensionId).find(
            (item) => item.action === name,
          );
          if (!found)
            throw new StudioError(
              "STUDIO_ACTION_MISSING",
              "The requested action is not registered.",
              404,
            );
          return { result: z.json().parse(found) };
        }
        const session = exec.agent?.session;
        const workspace =
          session &&
          this.ctx.workspaceRegistry
            .list()
            .find((item) => item.sessionIds.includes(session.id));
        if (
          !session?.header.cwd ||
          !workspace ||
          workspace.path !== session.header.cwd
        )
          throw new StudioError(
            "STUDIO_CONTEXT",
            "Open a workspace session before using Studio actions.",
          );
        if (
          "workspaceId" in args ||
          ("sessionId" in args && args.sessionId !== session.id)
        )
          throw new StudioError(
            "STUDIO_CONTEXT",
            "Studio actions use the active workspace session.",
          );
        const policy = this.ctx.sandboxPolicy.resolve({ session });
        if (
          policy.mode === "read-only" &&
          !readActions.has(extensionId + "/" + action)
        )
          throw new StudioError(
            "STUDIO_READ_ONLY",
            "Switch the DSH session to workspace-write access before generation or publishing.",
            403,
          );
        await checkProjectPaths(workspace.path, args);
        exec.signal.throwIfAborted();
        try {
          return {
            result: forModel(
              await this.call(
                {
                  extensionId,
                  action,
                  args,
                  context: { workspaceId: workspace.id, sessionId: session.id },
                },
                exec.signal,
              ),
            ),
          };
        } catch (error) {
          if (isApiError(error)) {
            const report = formatError(error);
            throw new StudioError(report.code, report.message, error.status);
          }
          throw error;
        }
      },
    });
  }
  private scope(workspaceId: string): Scope {
    if (this.closed)
      throw new StudioError(
        "STUDIO_CLOSED",
        "The plugin has been unloaded.",
        503,
      );
    const root = workspaceRoot(this.ctx, workspaceId);
    const key = workspaceId + "\0" + root;
    let scope = this.scopes.get(key);
    if (scope) return scope;
    const stateDirectory = join(root, ".dsh-studio", this.kind);
    mkdirSync(stateDirectory, { recursive: true });
    if (!inside(realpathSync(root), realpathSync(stateDirectory)))
      throw new StudioError(
        "STUDIO_STATE_PATH",
        "Studio state must stay in the active workspace.",
        403,
      );
    const databasePath = join(stateDirectory, "runtime.sqlite");
    if (existsSync(databasePath) && lstatSync(databasePath).isSymbolicLink())
      throw new StudioError(
        "STUDIO_STATE_PATH",
        "Studio state cannot be a symbolic link.",
        403,
      );
    const database = new DatabaseSync(databasePath);
    try {
      const version = z
        .object({ user_version: z.coerce.number() })
        .parse(database.prepare("PRAGMA user_version").get()).user_version;
      if (version > 1)
        throw new StudioError(
          "STUDIO_STATE_NEWER",
          "This Studio data requires a newer plugin version.",
          409,
        );
      if (version === 0) database.exec("PRAGMA user_version = 1");
    } finally {
      database.close();
    }
    const config: ServerConfig = {
      host: "127.0.0.1",
      port: 0,
      token: "",
      hostToken: "",
      configPath: join(root, ".dsh-studio", this.kind, "config.json"),
      approval: { mode: "manual", timeoutMs: 30000 },
      corsOrigins: [],
      workspaces: [
        {
          id: workspaceId,
          name: workspaceId,
          path: root,
          preset: "",
          workspaceType: "local",
          engineId: "deepseek-harness",
        },
      ],
      authorizedRoots: [root],
      readOnly: false,
      startedAt: Date.now(),
      tokenSource: "generated",
      hostTokenSource: "generated",
      logFormat: "json",
      logRequests: false,
    };
    const authorization: AuthorizationAccess = {
      read: async (id) => {
        const reference = this.options.serviceCredentials[id];
        if (!reference) return {};
        const record = await readStudioCredential(this.ctx, reference);
        if (!record)
          throw new StudioError(
            "STUDIO_CREDENTIAL_MISSING",
            `The configured ${id} credential is unavailable.`,
            503,
          );
        if (record.kind === "grant")
          return z.record(z.string(), z.string()).parse(record.payload);
        return {
          ...record.env,
          ...(record.key
            ? {
                [(
                  {
                    "openai-images": "OPENAI_API_KEY",
                    "fal-images": "FAL_KEY",
                    "aliyun-bailian": "DASHSCOPE_API_KEY",
                    "volcengine-video": "ARK_API_KEY",
                    "runninghub-video": "RUNNINGHUB_API_KEY",
                    "heygen-video": "HEYGEN_API_KEY",
                  } as Record<string, string>
                )[id] ?? "API_KEY"]: record.key,
              }
            : {}),
        };
      },
      openAiBrowserSession: async () => {
        const reference = this.options.serviceCredentials["openai-browser"];
        if (!reference) return null;
        const record = await readStudioCredential(this.ctx, reference);
        if (!record || record.kind !== "grant")
          throw new StudioError(
            "STUDIO_CREDENTIAL_MISSING",
            "The configured OpenAI login is unavailable.",
            503,
          );
        return z
          .object({
            accessToken: z.string().min(1),
            accountId: z.string().optional(),
          })
          .parse(record.payload);
      },
    };
    scope = {
      config,
      authorization,
      worker: runStudioService(this.environment(), undefined, () =>
        startVideoJobWorker(config, authorization),
      ),
    };
    this.scopes.set(key, scope);
    return scope;
  }
  /** List original action schemas without making a provider request. */
  listActions(extensionId?: string) {
    return actions.filter(
      (item) => !extensionId || item.extensionId === extensionId,
    );
  }
  /** Execute one original action against an authenticated DSH workspace. */
  async call(input: Call, signal?: AbortSignal): Promise<unknown> {
    if (this.closed)
      throw new StudioError(
        "STUDIO_CLOSED",
        "The plugin has been unloaded.",
        503,
      );
    const activeSignal = signal
      ? AbortSignal.any([this.lifetime.signal, signal])
      : this.lifetime.signal;
    activeSignal.throwIfAborted();
    const task = runStudioService(this.environment(), activeSignal, () =>
      this.dispatch(input),
    );
    this.pending.add(task);
    try {
      return await task;
    } finally {
      this.pending.delete(task);
    }
  }
  private environment() {
    return {
      ...process.env,
      HYPERFRAMES_CLI_PATH: join(this.packageRoot, "lib/hyperframes/cli.js"),
      IPOLLOWORK_BUNDLED_TEMPLATES_DIR: join(this.packageRoot, "lib/templates"),
      IPOLLOWORK_HYPERFRAMES_CATALOG_ROOT: join(
        this.packageRoot,
        "lib/hyperframes/registry",
      ),
      IPOLLOWORK_HYPERFRAMES_REGISTRY_ROOT: join(
        this.packageRoot,
        "lib/hyperframes/registry/blocks",
      ),
      IPOLLOWORK_VIDEO_MODELS_PATH:
        this.options.enhancementModelsPath ||
        join(this.packageRoot, "lib/models"),
      ...(this.options.ffmpegPath
        ? { HYPERFRAMES_FFMPEG_PATH: this.options.ffmpegPath }
        : {}),
      ...(this.options.ffprobePath
        ? { HYPERFRAMES_FFPROBE_PATH: this.options.ffprobePath }
        : {}),
    };
  }
  private async dispatch(input: Call): Promise<unknown> {
    const { extensionId, action, args, context } = input;
    const scope = this.scope(context.workspaceId);
    if (extensionId === "storage")
      return callStorageExtensionAction(
        scope.config,
        scope.authorization,
        action,
        args,
        context,
      );
    if (extensionId === "media")
      return callMediaExtensionAction(
        scope.config,
        scope.authorization,
        action,
        args,
        context,
      );
    if (extensionId === "video-generation")
      return callVideoGenerationAction(
        scope.config,
        scope.authorization,
        action,
        args,
        context,
      );
    if (extensionId === "video-enhancement")
      return callVideoEnhancementAction(scope.config, action, args, context);
    if (extensionId === "openai-image-generation")
      return callOpenAiImageGenerationExtensionAction(
        scope.config,
        scope.authorization,
        action,
        args,
        context,
      );
    const service = await this.media(scope, context);
    const invoke = service.actions[action];
    if (!invoke)
      throw new StudioError(
        "STUDIO_ACTION_MISSING",
        `Unknown media action: ${action}`,
        404,
      );
    return {
      ok: true,
      extensionId,
      action,
      result: await invoke(args, context),
      context,
    };
  }
  private async media(
    scope: Scope,
    context: Call["context"],
  ): Promise<MediaService> {
    // Context belongs to each invocation; a shared service must not capture a previous session.
    const path = join(
      this.packageRoot,
      "lib/media-studio/service/media-studio.mjs",
    );
    const module: { default?: unknown } = await import(
      pathToFileURL(path).href
    );
    if (typeof module.default !== "function")
      throw new StudioError(
        "STUDIO_SERVICE_INVALID",
        "The bundled media service is invalid.",
        500,
      );
    const dataDir = join(dirname(scope.config.configPath!), "media-studio");
    await mkdir(dataDir, { recursive: true });
    const instance: unknown = await module.default({
      plugin: { id: "media-studio", version: "1.0.5" },
      storage: { dataDir },
      workspace: { root: scope.config.workspaces[0]!.path },
      host: {
        callAction: async (
          reference: string,
          args: Record<string, unknown>,
        ) => {
          const separator = reference.indexOf("/");
          return this.call(
            serviceCallSchema.parse({
              extensionId: reference.slice(0, separator),
              action: reference.slice(separator + 1),
              args,
              context,
            }),
            serviceSignal(),
          );
        },
      },
    });
    return z
      .object({
        actions: z.record(
          z.string(),
          z.custom<MediaService["actions"][string]>(
            (value) => typeof value === "function",
          ),
        ),
        dispose: z
          .custom<NonNullable<MediaService["dispose"]>>(
            (value) => typeof value === "function",
          )
          .optional(),
      })
      .parse(instance);
  }
  /** Return the original bundled component manifest in the original UI's expected records. */
  async packages(workspaceId: string) {
    this.scope(workspaceId);
    const manifest = parsePluginPackageManifest(
      JSON.parse(
        await readFile(
          join(this.packageRoot, "lib/media-studio/ipollowork.plugin.json"),
          "utf8",
        ),
      ),
    );
    if (!manifest.package)
      throw new StudioError(
        "STUDIO_SERVICE_INVALID",
        "The bundled media manifest has no version.",
        500,
      );
    return {
      items: [
        {
          pluginId: manifest.id,
          name: manifest.name,
          version: manifest.package.version,
          enabled: true,
          disabledResourceIds: [],
          previousVersion: null,
          manifest,
          integrity: { sha256: "", status: "unsigned" },
          activeEngineId: "deepseek-harness",
        },
      ],
    };
  }
  /** Read only a declared original UI resource, with no dependency on an installed Apollo Work app. */
  async uiResource(workspaceId: string, pluginId: string, resourceId: string) {
    const {
      items: [item],
    } = await this.packages(workspaceId);
    if (pluginId !== item!.pluginId)
      throw new StudioError(
        "STUDIO_COMPONENT_MISSING",
        "Unknown bundled component.",
        404,
      );
    const resource = item!.manifest.resources.find(
      (entry) => entry.id === resourceId && entry.type === "ui",
    );
    if (!resource?.path || resource.type !== "ui")
      throw new StudioError(
        "STUDIO_COMPONENT_MISSING",
        "Unknown bundled UI resource.",
        404,
      );
    return {
      pluginId,
      version: item!.version,
      resource,
      html: await readFile(
        resolve(this.packageRoot, "lib/media-studio", resource.path),
        "utf8",
      ),
    };
  }
  artifacts(workspaceId: string, sessionId: string, cursor: number | null) {
    return listSessionArtifacts(
      this.scope(workspaceId).config,
      workspaceId,
      sessionId,
      cursor,
    );
  }
  async ensureProjectByRoot(root: string, sessionId: string) {
    const workspace = this.ctx.workspaceRegistry
      .list()
      .find((item) => item.path === root);
    if (!workspace)
      throw new StudioError(
        "STUDIO_CONTEXT",
        "The project does not belong to a DSH workspace.",
      );
    const scope = this.scope(workspace.id);
    await verifiedWritePath(
      root,
      `${this.kind}/.native-parent-check`,
      this.kind,
      "Studio",
    );
    const project = resolvePath(root, this.kind, sessionId);
    if (existsSync(project)) {
      if (existsSync(join(project, "manifest.json"))) {
        const metadata = await verifiedExistingPath(
          root,
          `${this.kind}/${sessionId}/manifest.json`,
          this.kind,
          "Studio",
        );
        const manifest = templateManifestV1Schema.parse(
          JSON.parse(await readFile(metadata, "utf8")),
        );
        await verifiedExistingPath(
          root,
          `${this.kind}/${sessionId}/${manifest.entry}`,
          this.kind,
          "Studio",
        );
      } else
        await verifiedExistingPath(
          root,
          `${this.kind}/${sessionId}/index.html`,
          this.kind,
          "Studio",
        );
    }
    return runStudioService(
      {
        ...serviceEnvironment(),
        IPOLLOWORK_BUNDLED_TEMPLATES_DIR: join(
          this.packageRoot,
          "lib/templates",
        ),
        IPOLLOWORK_RUNTIME_DB: undefined,
      },
      undefined,
      () =>
        ensureNativeStudioProject(
          scope.config,
          scope.config.workspaces[0]!,
          sessionId,
          this.kind === "video" ? "video" : "site",
        ),
    );
  }
  async templateSourceByRoot(root: string, templateId: string) {
    const workspace = this.ctx.workspaceRegistry
      .list()
      .find((item) => item.path === root);
    if (!workspace)
      throw new StudioError(
        "STUDIO_CONTEXT",
        "The project does not belong to a DSH workspace.",
      );
    return this.templateSource(workspace.id, templateId);
  }
  async templateSnapshot(workspaceId: string, sessionId: string) {
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(sessionId))
      throw new StudioError("STUDIO_INPUT", "Invalid project session.");
    const scope = this.scope(workspaceId),
      workspace = scope.config.workspaces[0]!;
    await this.ensureProjectByRoot(workspace.path, sessionId);
    const path = await verifiedExistingPath(
      workspace.path,
      `${this.kind}/${sessionId}/manifest.json`,
      this.kind,
      "Studio",
    );
    const manifest = templateManifestV1Schema.parse(
      JSON.parse(await readFile(path, "utf8")),
    );
    const updatedAt = (await stat(path)).mtimeMs;
    return runStudioService(this.environment(), undefined, () =>
      registerNativeTemplateSnapshot(
        scope.config,
        workspace,
        sessionId,
        manifest,
        updatedAt,
      ),
    );
  }
  async templateCatalog(workspaceId: string) {
    const scope = this.scope(workspaceId);
    return runStudioService(
      {
        ...serviceEnvironment(),
        IPOLLOWORK_BUNDLED_TEMPLATES_DIR: join(
          this.packageRoot,
          "lib/templates",
        ),
        IPOLLOWORK_RUNTIME_DB: undefined,
      },
      undefined,
      () => listTemplates(scope.config, workspaceId),
    );
  }
  async templateSource(workspaceId: string, templateId: string) {
    return runStudioService(this.environment(), undefined, () =>
      nativeTemplateSource(this.scope(workspaceId).config, templateId),
    );
  }
  async templateCover(workspaceId: string, templateId: string) {
    const scope = this.scope(workspaceId);
    return runStudioService(this.environment(), undefined, () =>
      readTemplateCover(scope.config, workspaceId, templateId),
    );
  }
  async validateTemplate(workspaceId: string, sessionId: string) {
    await this.templateSnapshot(workspaceId, sessionId);
    const scope = this.scope(workspaceId);
    return runStudioService(this.environment(), undefined, () =>
      validateTemplateFromSession(
        scope.config,
        scope.config.workspaces[0]!,
        sessionId,
      ),
    );
  }
  async saveTemplate(
    workspaceId: string,
    input: {
      sessionId: string;
      category: TemplateCategory;
      title: string;
      description?: string;
      subcategory?: string;
      style?: string;
      tags?: string[];
    },
    exportPackage: boolean,
  ) {
    await this.templateSnapshot(workspaceId, input.sessionId);
    const scope = this.scope(workspaceId);
    return runStudioService(this.environment(), undefined, () =>
      exportPackage
        ? exportTemplateFromSession(
            scope.config,
            scope.config.workspaces[0]!,
            input,
          )
        : saveTemplateFromSession(
            scope.config,
            scope.config.workspaces[0]!,
            input,
          ),
    );
  }
  /** Stop polling before DSH drains in-flight routes and removes the plugin. */
  async dispose() {
    this.closed = true;
    this.lifetime.abort();
    await Promise.allSettled([...this.pending]);
    await Promise.all(
      [...this.scopes.values()].map(async (scope) => {
        await scope.worker.close();
        await closeVideoEnhancement(scope.config.workspaces[0]!.path);
        await disposeTemplateStore(scope.config);
      }),
    );
    this.scopes.clear();
  }
}

const readActions = new Set([
  "storage/status",
  "media/status",
  "media/voice_list",
  "media/video_recipe_catalog",
  "media/video_component_read",
  "video-generation/status",
  "video-generation/jobs",
  "video-generation/read",
  "video-generation/inspect",
  "video-generation/avatar-context",
  "video-generation/avatar-profiles",
  "video-enhancement/status",
  "video-enhancement/read",
  "openai-image-generation/status",
  "media-studio/image-status",
  "media-studio/load-image",
  "media-studio/video-status",
  "media-studio/video-jobs",
  "media-studio/video-read",
  "media-studio/video-inspect",
]);
/** File arguments remain inside the model's active workspace, including through symbolic links. */
async function checkProjectPaths(
  root: string,
  value: unknown,
  key = "",
): Promise<void> {
  if (Array.isArray(value)) {
    for (const item of value) await checkProjectPaths(root, item, key);
    return;
  }
  if (value && typeof value === "object") {
    for (const [name, item] of Object.entries(value))
      await checkProjectPaths(root, item, name);
    return;
  }
  if (typeof value !== "string" || !/(?:^path$|Path$)/.test(key)) return;
  let path = resolvePath(root, value);
  if (!inside(root, path))
    throw new StudioError(
      "STUDIO_PATH_DENIED",
      "Studio actions must use files in the active workspace.",
      403,
    );
  for (;;) {
    try {
      const canonical = await realpath(path);
      if (!inside(root, canonical))
        throw new StudioError(
          "STUDIO_PATH_DENIED",
          "Studio files cannot link outside the active workspace.",
          403,
        );
      break;
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        const parent = dirname(path);
        if (parent === path) throw error;
        path = parent;
      } else throw error;
    }
  }
}
type ModelValue =
  | string
  | number
  | boolean
  | null
  | ModelValue[]
  | { [key: string]: ModelValue };
/** Preview bytes stay in the UI response; model results retain metadata and saved file paths. */
function forModel(value: unknown): ModelValue {
  const data = z.json().parse(value);
  const visit = (item: ModelValue): ModelValue => {
    if (Array.isArray(item)) return item.map(visit);
    if (item && typeof item === "object")
      return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key,
          /^(?:dataUrl|audioDataUrl|dataBase64|audioBase64)$/.test(key)
            ? { omitted: "binary preview" }
            : visit(value),
        ]),
      );
    return item;
  };
  return visit(data);
}
