/** Optional Design file identity, live metadata and bounded model guidance. */
import { watch, type FSWatcher } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";
import type { ServerResponse } from "node:http";
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-system-prompt";
import type {} from "@deepseek-ai/dsh-agent";
import type {} from "@deepseek-ai/dsh-workspace";
import type {} from "@deepseek-ai/dsh-sandbox-policy";
import { defineTool } from "@deepseek-ai/dsh-tools";
import { z } from "zod";
import { StudioError } from "./errors.ts";
import {
  errorCode,
  inside,
  safeRelativePath,
  verifiedExistingPath,
  writeStudioText,
  readStudioText,
} from "./http.ts";
import { isPresentationDocument } from "./presentation-document.ts";
import { linkedDesignTokenPath } from "./design-token-link.ts";
import {
  templateManifestV1Schema,
  type TemplateSessionSnapshot,
} from "./original/types/src/templates.ts";
import type { DesignActivation, DesignDocument } from "./design-types.ts";

const sessionSchema = z.string().regex(/^[A-Za-z0-9_-]{1,128}$/);
const oldBinding = z
  .object({ schemaVersion: z.literal(1), entry: z.string() })
  .strict();
const binding = z
  .object({
    schemaVersion: z.literal(2),
    documentId: z.string(),
    entry: z.string(),
    tokenFile: z.string(),
    source: z.string().optional(),
    viewingVersion: z.string().optional(),
  })
  .strict();
const maxBytes = 20 * 1024 * 1024;
function missing(error: unknown) {
  return (
    errorCode(error) === "ENOENT" ||
    (error instanceof Error && "status" in error && error.status === 404)
  );
}
/** Resolve workspace paths without accepting traversal or plugin metadata as a user document. */
export function designWorkspacePath(root: string, path: string): string {
  const absolute = resolve(root, path);
  if (!inside(root, absolute))
    throw new StudioError(
      "DESIGN_PATH",
      "The Design file must belong to this workspace.",
      403,
    );
  const normalized = relative(root, absolute).split(sep).join("/");
  if (!normalized || normalized.startsWith(".dsh-studio/"))
    throw new StudioError("DESIGN_PATH", "Choose a workspace document.");
  return safeRelativePath(normalized, normalized.split("/")[0]!, "Design");
}
function identity(entry: string) {
  return createHash("sha256").update(entry).digest("hex");
}

/** One plugin lifetime owns all watches, file selections and admitted metadata writes. */
export class DesignDocuments {
  private readonly bindings = new Map<string, DesignDocument>();
  private readonly queues = new Map<string, Promise<unknown>>();
  private readonly pending = new Set<Promise<unknown>>();
  private readonly orders = new Map<string, number>();
  private readonly watches = new Map<
    string,
    { watcher: FSWatcher; entry: string }
  >();
  private readonly listeners = new Set<ServerResponse>();
  private closed = false;
  constructor(
    private readonly changed: (
      root: string,
      sessionId: string,
      entry: string,
    ) => Promise<void> = async () => {},
    private readonly report: (error: unknown) => void = () => {},
  ) {}
  private key(root: string, sessionId: string) {
    sessionSchema.parse(sessionId);
    return `${root}\0${sessionId}`;
  }
  private record(sessionId: string) {
    return `.dsh-studio/design/bindings/${sessionSchema.parse(sessionId)}.json`;
  }
  private async owned<T>(operation: () => Promise<T>): Promise<T> {
    if (this.closed)
      throw new StudioError("DESIGN_CLOSED", "Design has been disabled.", 503);
    const task = operation();
    this.pending.add(task);
    try {
      return await task;
    } finally {
      this.pending.delete(task);
    }
  }
  private queue<T>(key: string, operation: () => Promise<T>): Promise<T> {
    return this.owned(async () => {
      const task = (this.queues.get(key) ?? Promise.resolve())
        .catch(() => undefined)
        .then(operation);
      this.queues.set(key, task);
      try {
        return await task;
      } finally {
        if (this.queues.get(key) === task) this.queues.delete(key);
      }
    });
  }
  private value(root: string, entry: string): DesignDocument {
    entry = designWorkspacePath(root, entry);
    return {
      schemaVersion: 2,
      documentId: identity(entry),
      entry,
      tokenFile: `${dirname(entry) === "." ? "" : dirname(entry) + "/"}${basename(entry).replace(/\.html?$/i, "")}.tokens.css`,
    };
  }
  /** Read old bindings without rewriting them; a later explicit activation saves v2 metadata. */
  async read(
    root: string,
    sessionId: string,
  ): Promise<DesignDocument | undefined> {
    const key = this.key(root, sessionId);
    const cached = this.bindings.get(key);
    if (cached) return cached;
    let result: DesignDocument | undefined;
    try {
      const file = await verifiedExistingPath(
        root,
        this.record(sessionId),
        ".dsh-studio/design/bindings",
        "Design",
      );
      const json: unknown = JSON.parse(await readFile(file, "utf8"));
      const legacy = oldBinding.safeParse(json);
      result = legacy.success
        ? this.value(root, legacy.data.entry)
        : binding.parse(json);
      result.entry = designWorkspacePath(root, result.entry);
      result.tokenFile = designWorkspacePath(root, result.tokenFile);
      if (result.documentId !== identity(result.entry))
        throw new StudioError(
          "DESIGN_RECORD",
          "The Design document record is invalid.",
        );
    } catch (error) {
      if (!missing(error)) throw error;
      try {
        const path = await verifiedExistingPath(
          root,
          `design/${sessionId}/manifest.json`,
          `design/${sessionId}`,
          "Design",
        );
        const manifest = templateManifestV1Schema.parse(
          JSON.parse(await readFile(path, "utf8")),
        );
        if (manifest.surface === "design")
          result = this.value(root, `design/${sessionId}/${manifest.entry}`);
      } catch (error) {
        if (!missing(error)) throw error;
        for (const name of ["entry.html", "index.html"]) {
          const entry = `design/${sessionId}/${name}`;
          try {
            await verifiedExistingPath(root, entry, entry, "Design");
            result = this.value(root, entry);
            break;
          } catch (missingFile) {
            if (!missing(missingFile)) throw missingFile;
          }
        }
      }
    }
    if (result) this.bindings.set(key, result);
    return result;
  }
  private async save(root: string, sessionId: string, current: DesignDocument) {
    const {
      schemaVersion,
      documentId,
      entry,
      tokenFile,
      source,
      viewingVersion,
    } = current;
    await writeStudioText({
      root,
      requested: this.record(sessionId),
      prefix: ".dsh-studio/design/bindings",
      studioTitle: "Design",
      maxBytes: 8192,
      content:
        JSON.stringify({
          schemaVersion,
          documentId,
          entry,
          tokenFile,
          source,
          viewingVersion,
        }) + "\n",
    });
  }
  /** Activate one file only after validation; older browser activations cannot replace a newer one. */
  bind(
    root: string,
    sessionId: string,
    path: string,
    reveal = false,
    persist = true,
    activation?: DesignActivation,
  ): Promise<DesignDocument> {
    if (this.closed)
      return Promise.reject(
        new StudioError("DESIGN_CLOSED", "Design has been disabled.", 503),
      );
    const key = this.key(root, sessionId);
    const orderKey = activation && `${key}\0${activation.client}`;
    if (orderKey)
      this.orders.set(
        orderKey,
        Math.max(activation!.sequence, this.orders.get(orderKey) ?? 0),
      );
    return this.queue(key, async () => {
      if (orderKey && activation!.sequence < this.orders.get(orderKey)!)
        throw new StudioError(
          "DESIGN_STALE_ACTIVATION",
          "A newer Design document is already selected.",
          409,
        );
      const entry = designWorkspacePath(root, path);
      if (!/\.html?$/i.test(entry))
        throw new StudioError("DESIGN_FILE", "Choose an HTML file.");
      const file = await verifiedExistingPath(root, entry, entry, "Design");
      if (!(await stat(file)).isFile())
        throw new StudioError("DESIGN_FILE", "Choose an HTML file.");
      const previous = await this.read(root, sessionId);
      const value =
        previous?.entry === entry ? previous : this.value(root, entry);
      await this.refreshValue(root, value);
      if (orderKey && activation!.sequence < this.orders.get(orderKey)!)
        throw new StudioError(
          "DESIGN_STALE_ACTIVATION",
          "A newer Design document is already selected.",
          409,
        );
      if (persist) await this.save(root, sessionId, value);
      this.bindings.set(key, value);
      if (persist) {
        this.watchEntry(root, sessionId, value);
        await this.capture(root, sessionId, value);
      }
      if (reveal) this.publish({ sessionId, entry });
      return { ...value };
    });
  }
  private async capture(
    root: string,
    sessionId: string,
    value: DesignDocument,
  ) {
    try {
      await this.changed(root, sessionId, value.entry);
      delete value.problem;
    } catch (error) {
      value.problem =
        "Design history is unavailable. Check workspace access and retry.";
      this.report(error);
    }
  }
  private watchEntry(root: string, sessionId: string, value: DesignDocument) {
    const key = this.key(root, sessionId);
    if (this.watches.get(key)?.entry === value.entry) return;
    this.watches.get(key)?.watcher.close();
    const watcher = watch(
      resolve(root, dirname(value.entry)),
      (_event, name) => {
        if (
          name &&
          String(name) !== basename(value.entry) &&
          String(name) !== basename(value.tokenFile)
        )
          return;
        if (this.closed) return;
        void this.queue(key, async () => {
          if (this.bindings.get(key)?.entry !== value.entry) return;
          await this.refreshValue(root, value);
          if (value.revision !== "missing")
            await this.capture(root, sessionId, value);
        }).catch((error) => this.report(error));
      },
    );
    watcher.on("error", (error) => this.report(error));
    this.watches.set(key, { watcher, entry: value.entry });
  }
  private async refreshValue(root: string, current: DesignDocument) {
    try {
      const file = await verifiedExistingPath(
        root,
        current.entry,
        current.entry,
        "Design",
      );
      const info = await stat(file);
      const revision = `${info.mtimeMs}-${info.size}`;
      if (current.revision !== revision) {
        const html = await readStudioText({
          root,
          requested: current.entry,
          prefix: current.entry,
          studioTitle: "Design",
          maxBytes,
        });
        const token = linkedDesignTokenPath(html.content);
        if (token)
          current.tokenFile = designWorkspacePath(
            root,
            resolve(root, dirname(current.entry), token),
          );
      }
      current.revision = revision;
    } catch (error) {
      if (!missing(error)) throw error;
      current.revision = "missing";
    }
    try {
      await verifiedExistingPath(
        root,
        current.tokenFile,
        current.tokenFile,
        "Design",
      );
      current.tokens = current.tokenFile;
    } catch (error) {
      if (!missing(error)) throw error;
      delete current.tokens;
    }
  }
  /** Refresh a selected file without changing its content. */
  refresh(root: string, sessionId: string) {
    return this.owned(async () => {
      const value = await this.read(root, sessionId);
      if (value) await this.refreshValue(root, value);
      return value;
    });
  }
  /** Cache-only context; file watchers perform all I/O outside Agent requests. */
  context(root: string, sessionId: string): string {
    const current = this.bindings.get(this.key(root, sessionId));
    return current
      ? `Design: ${JSON.stringify({ file: current.entry, revision: current.revision, ...(current.viewingVersion ? { view: current.viewingVersion } : {}), ...(current.tokens ? { tokens: current.tokens } : {}) })}`
      : "";
  }
  /** Persist the selected preview so later conversation turns refer to that exact version. */
  async selectVersion(
    root: string,
    sessionId: string,
    version: string,
    expectedEntry?: string,
  ) {
    return this.queue(this.key(root, sessionId), async () => {
      const value = await this.read(root, sessionId);
      if (!value)
        throw new StudioError(
          "DESIGN_CONTEXT",
          "Open a Design document first.",
        );
      if (expectedEntry && value.entry !== expectedEntry)
        throw new StudioError(
          "DESIGN_STALE_ACTIVATION",
          "The active Design file changed. Open the file again.",
          409,
        );
      if (version === "current") delete value.viewingVersion;
      else value.viewingVersion = version;
      await this.save(root, sessionId, value);
      return { ...value };
    });
  }
  /** Create neutral HTML or fork an existing file without touching its source. */
  async create(
    root: string,
    sessionId: string,
    source?: string,
    requested?: string,
    activation?: DesignActivation,
    reveal = true,
  ): Promise<DesignDocument> {
    return this.owned(async () => {
      source = source ? designWorkspacePath(root, source) : undefined;
      const current = await this.read(root, sessionId);
      const directory = source
        ? dirname(
            source.startsWith("design/.versions/") && current
              ? current.entry
              : source,
          )
        : `design/${sessionId}`;
      const entry = requested
        ? designWorkspacePath(root, requested)
        : `${directory}/design-${randomUUID().slice(0, 8)}.html`;
      if (!/\.html?$/i.test(entry))
        throw new StudioError("DESIGN_FILE", "Choose an HTML file.");
      let content =
        '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Design</title><style>:root{--ipw-color-bg:#ffffff;--ipw-color-text:#171717;--ipw-color-primary:#635bff;--ipw-font-body:system-ui,sans-serif}body{margin:0;background:var(--ipw-color-bg);color:var(--ipw-color-text);font-family:var(--ipw-font-body)}</style></head><body><main></main></body></html>\n';
      if (source) {
        const path = designWorkspacePath(root, source);
        content = (
          await readStudioText({
            root,
            requested: path,
            prefix: path,
            studioTitle: "Design",
            maxBytes,
          })
        ).content;
        const tokens = linkedDesignTokenPath(content);
        if (tokens) {
          const tokenSource = designWorkspacePath(
            root,
            resolve(
              root,
              dirname(
                path.startsWith("design/.versions/") && current
                  ? current.entry
                  : path,
              ),
              tokens,
            ),
          );
          const tokenFile = entry.replace(/\.html?$/i, ".tokens.css");
          const css = await readStudioText({
            root,
            requested: tokenSource,
            prefix: tokenSource,
            studioTitle: "Design",
            maxBytes,
          });
          await writeStudioText({
            root,
            requested: tokenFile,
            prefix: tokenFile,
            studioTitle: "Design",
            maxBytes,
            content: css.content,
            createOnly: true,
          });
          content = content.replace(/<link\b[^>]*>/gi, (tag) =>
            tag.replace(
              /(\bhref\s*=\s*)(["'])(.*?)\2/gi,
              (match, prefix, quote, href) =>
                href === tokens
                  ? prefix + quote + basename(tokenFile) + quote
                  : match,
            ),
          );
        }
      }
      await writeStudioText({
        root,
        requested: entry,
        prefix: entry,
        studioTitle: "Design",
        maxBytes,
        content,
        createOnly: true,
      });
      const value = await this.bind(
        root,
        sessionId,
        entry,
        reveal,
        true,
        activation,
      );
      if (source) {
        value.source = source;
        const bound = this.bindings.get(this.key(root, sessionId))!;
        bound.source = source;
        await this.save(root, sessionId, bound);
      }
      return value;
    });
  }
  /** Adapt plain HTML to the original editor; only actual template entries inherit template metadata. */
  async snapshot(
    root: string,
    sessionId: string,
    requested?: string,
  ): Promise<TemplateSessionSnapshot | undefined> {
    const value = requested
      ? this.value(root, requested)
      : await this.refresh(root, sessionId);
    if (requested && value) await this.refreshValue(root, value);
    if (!value) return;
    let manifest;
    const match = value.entry.match(/^design\/([^/]+)\//);
    if (match) {
      try {
        const path = await verifiedExistingPath(
          root,
          `design/${match[1]}/manifest.json`,
          `design/${match[1]}`,
          "Design",
        );
        const candidate = templateManifestV1Schema.parse(
          JSON.parse(await readFile(path, "utf8")),
        );
        if (value.entry === `design/${match[1]}/${candidate.entry}`)
          manifest = candidate;
      } catch (error) {
        if (!missing(error)) throw error;
      }
    }
    const html = await readStudioText({ root, requested: value.entry, prefix: value.entry, studioTitle: "Design", maxBytes });
    manifest ??= templateManifestV1Schema.parse({
      schemaVersion: 1,
      id: "ipollo.local.document",
      version: "1.0.0",
      kind: "design",
      surface: "design",
      category: isPresentationDocument(html.content) ? "slides" : "site",
      subcategory: "document",
      title: basename(value.entry),
      description: "Workspace HTML document",
      cover: "cover.svg",
      entry: basename(value.entry),
      source: { name: "Workspace document", license: "Private" },
      designSystem: {
        tokenVersion: 1,
        editableGroups: ["theme"],
        tokens: basename(value.tokenFile),
      },
      applyChecklist: ["Edit the HTML freely."],
      minimumAppVersion: "0.0.0",
    });
    return {
      sessionId,
      surface: "design",
      authoring: false,
      manifest,
      state: {
        schemaVersion: 1,
        entry: value.entry,
        briefPath: `${dirname(value.entry)}/brief.json`,
        createdAt: 0,
        template: {
          id: manifest.id,
          version: manifest.version,
          sourceType: "local",
        },
      },
    };
  }
  /** Allow the active file, its theme file and legacy managed Design files. */
  async authorize(
    root: string,
    sessionId: string | undefined,
    path: string,
    write = false,
  ): Promise<string> {
    const normalized = designWorkspacePath(root, path);
    if (normalized.startsWith("design/")) return "design";
    const current = sessionId ? await this.read(root, sessionId) : undefined;
    if (
      !current ||
      (write &&
        normalized !== current.entry &&
        normalized !== current.tokenFile)
    )
      throw new StudioError(
        "DESIGN_PATH",
        "This file is not bound to the Design session.",
        403,
      );
    return normalized;
  }
  stream(response: ServerResponse) {
    if (this.closed)
      throw new StudioError("DESIGN_CLOSED", "Design has been disabled.", 503);
    response.writeHead(200, {
      "content-type": "application/x-ndjson",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    response.write('{"ready":true}\n');
    this.listeners.add(response);
    response.once("close", () => this.listeners.delete(response));
  }
  private publish(value: { sessionId: string; entry: string }) {
    for (const response of this.listeners) {
      if (response.writableLength > 65536) {
        response.end();
        this.listeners.delete(response);
      } else response.write(JSON.stringify(value) + "\n");
    }
  }
  stop() {
    this.closed = true;
    for (const item of this.watches.values()) item.watcher.close();
    this.watches.clear();
    for (const response of this.listeners) response.end();
    this.listeners.clear();
  }
  async dispose() {
    this.stop();
    await Promise.allSettled(this.pending);
    this.bindings.clear();
    this.orders.clear();
  }
}

/** Optional plugin contributions; no pre-step interceptor or compulsory template rules. */
export function registerDesignDocuments(
  ctx: Context,
  documents: DesignDocuments,
  resume: (root: string, sessionId: string) => Promise<void>,
): void {
  const workspaceOf = (session: { id: string; header: { cwd?: string } }) =>
    ctx.workspaceRegistry
      .list()
      .find(
        (item) =>
          item.path === session.header.cwd &&
          item.sessionIds.some((id) => id === session.id),
      );
  ctx.effect(() =>
    ctx.systemPrompt.section({
      name: "ipollo:design",
      order: 1450,
      interpolate: false,
      text: "For webpages and slides prefer design_open; edit HTML freely with normal file tools. Themes are optional: use a few CSS variables when suitable. Local edits always work. For an unrelated new design, ask whether to keep a separate file; then use mode new or fork.",
    }),
  );
  ctx.effect(() =>
    ctx.systemPrompt.context({
      name: "ipollo:design-document",
      order: 11000,
      interpolate: false,
      text: ({ agent }) => {
        const workspace = agent && workspaceOf(agent.session);
        return workspace && agent
          ? documents.context(workspace.path, agent.session.id)
          : "";
      },
    }),
  );
  ctx.on("agent/created", async ({ agent }) => {
    const workspace = workspaceOf(agent.session);
    if (!workspace) return;
    try {
      const current = await documents.refresh(workspace.path, agent.session.id);
      if (current && current.revision !== "missing")
        await documents.bind(
          workspace.path,
          agent.session.id,
          current.entry,
          false,
          ctx.sandboxPolicy.resolve({ session: agent.session }).mode !==
            "read-only",
        );
    } catch (error) {
      ctx.logger.warn(
        "Design context could not be restored: %s",
        error instanceof Error ? error.message : String(error),
      );
    }
  });
  ctx.effect(() =>
    ctx.tools.register(
      defineTool({
        name: "design_open",
        description:
          "Open an HTML file for Design editing. Without a path, resume the current document or create neutral HTML. New and fork keep the original file.",
        parameters: {
          path: {
            type: "string",
            description:
              "Workspace HTML path; a source for open/fork, an unused destination for new.",
          },
          mode: {
            type: "string",
            enum: ["open", "new", "fork"],
            description:
              "Default open. After confirming a separate design, new starts blank and fork copies the current design.",
          },
        },
        output: {
          schema: { type: "object", additionalProperties: true },
          render: (_args, value) => [
            { type: "text", text: JSON.stringify(value) },
          ],
        },
        execute: async (raw, exec) => {
          const parsed = z
            .object({
              path: z.string().min(1).optional(),
              mode: z.enum(["open", "new", "fork"]).default("open"),
            })
            .strict()
            .safeParse(raw);
          if (!parsed.success)
            throw new StudioError(
              "DESIGN_ARGUMENTS",
              "Provide an HTML path and an optional open, new or fork mode.",
            );
          const session = exec.agent?.session,
            workspace = session && workspaceOf(session);
          if (!workspace || !session)
            throw new StudioError(
              "DESIGN_CONTEXT",
              "Open a workspace conversation first.",
            );
          const { path, mode } = parsed.data;
          const readOnly =
            ctx.sandboxPolicy.resolve({ session }).mode === "read-only";
          const current = await documents.read(workspace.path, session.id);
          if (mode !== "open" || (!path && !current)) {
            if (readOnly)
              throw new StudioError(
                "DESIGN_READ_ONLY",
                "Creating a Design file requires workspace write access.",
                403,
              );
            if (mode === "fork" && !path && !current)
              throw new StudioError(
                "DESIGN_CONTEXT",
                "Choose a Design file to copy.",
              );
            return {
              ...(await documents.create(
                workspace.path,
                session.id,
                mode === "fork"
                  ? (path ?? current!.viewingVersion ?? current!.entry)
                  : undefined,
                mode === "new" ? path : undefined,
              )),
            };
          }
          const value = await documents.bind(
            workspace.path,
            session.id,
            path ?? current!.entry,
            true,
            !readOnly,
          );
          if (!readOnly && value.viewingVersion) {
            await resume(workspace.path, session.id);
            await documents.selectVersion(
              workspace.path,
              session.id,
              "current",
              value.entry,
            );
            return {
              ...(await documents.refresh(workspace.path, session.id))!,
            };
          }
          return { ...value };
        },
      }),
    ),
  );
}
