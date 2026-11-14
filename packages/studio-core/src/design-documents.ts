/** Active Design files, kept separately from user documents and exposed through native DSH context. */
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
} from "./http.ts";
import {
  templateManifestV1Schema,
  type TemplateSessionSnapshot,
} from "./original/types/src/templates.ts";

const bindingSchema = z
  .object({ schemaVersion: z.literal(1), entry: z.string().min(1) })
  .strict();
const sessionSchema = z.string().regex(/^[A-Za-z0-9_-]{1,128}$/);
type Binding = z.infer<typeof bindingSchema>;
type Current = Binding & { revision?: string; tokens?: string };

/** Resolve a workspace file without accepting traversal or a path outside the workspace. */
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

/** One plugin lifetime owns the binding cache, admitted work and live browser notifications. */
export class DesignDocuments {
  private readonly bindings = new Map<string, Current | undefined>();
  private readonly pending = new Set<Promise<unknown>>();
  private readonly listeners = new Set<ServerResponse>();
  private closed = false;

  private key(root: string, sessionId: string): string {
    sessionSchema.parse(sessionId);
    return `${root}\0${sessionId}`;
  }
  private record(sessionId: string): string {
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

  /** Read a saved binding, or infer the existing native project without changing its files. */
  async read(root: string, sessionId: string): Promise<Current | undefined> {
    const key = this.key(root, sessionId);
    if (this.bindings.get(key)) return this.bindings.get(key);
    let value: Current | undefined;
    try {
      const file = await verifiedExistingPath(
        root,
        this.record(sessionId),
        ".dsh-studio/design/bindings",
        "Design",
      );
      value = bindingSchema.parse(JSON.parse(await readFile(file, "utf8")));
      value.entry = designWorkspacePath(root, value.entry);
    } catch (error) {
      if (
        errorCode(error) !== "ENOENT" &&
        !(error instanceof Error && "status" in error && error.status === 404)
      )
        throw error;
      const path = `design/${sessionId}/manifest.json`;
      try {
        const file = await verifiedExistingPath(
          root,
          path,
          `design/${sessionId}`,
          "Design",
        );
        const manifest = templateManifestV1Schema.parse(
          JSON.parse(await readFile(file, "utf8")),
        );
        if (manifest.surface === "design")
          value = {
            schemaVersion: 1,
            entry: designWorkspacePath(
              root,
              `design/${sessionId}/${manifest.entry}`,
            ),
          };
      } catch (error) {
        if (
          errorCode(error) !== "ENOENT" &&
          !(error instanceof Error && "status" in error && error.status === 404)
        )
          throw error;
      }
    }
    this.bindings.set(key, value);
    return value;
  }

  /** Bind an existing HTML file; only plugin metadata is written. */
  bind(
    root: string,
    sessionId: string,
    path: string,
    reveal = false,
    persist = true,
  ): Promise<Current> {
    return this.owned(async () => {
      const entry = designWorkspacePath(root, path);
      if (!/\.html?$/i.test(entry))
        throw new StudioError("DESIGN_FILE", "Choose an HTML file.");
      const file = await verifiedExistingPath(root, entry, entry, "Design");
      if (!(await stat(file)).isFile())
        throw new StudioError("DESIGN_FILE", "Choose an HTML file.");
      const value: Binding = { schemaVersion: 1, entry };
      if (persist) {
        await writeStudioText({
          root,
          requested: this.record(sessionId),
          prefix: ".dsh-studio/design/bindings",
          studioTitle: "Design",
          maxBytes: 4096,
          content: JSON.stringify(value) + "\n",
        });
      }
      this.bindings.set(this.key(root, sessionId), value);
      const current = (await this.refreshCurrent(root, sessionId))!;
      if (reveal) this.publish({ sessionId, entry });
      return current;
    });
  }

  /** Refresh only file metadata and the optional token-file reference, not the full HTML. */
  refresh(root: string, sessionId: string): Promise<Current | undefined> {
    return this.owned(() => this.refreshCurrent(root, sessionId));
  }
  private async refreshCurrent(
    root: string,
    sessionId: string,
  ): Promise<Current | undefined> {
    const current = await this.read(root, sessionId);
    if (!current) return;
    const file = await verifiedExistingPath(
      root,
      current.entry,
      current.entry,
      "Design",
    ).catch((error: unknown) => {
      if (error instanceof Error && "status" in error && error.status === 404)
        return undefined;
      throw error;
    });
    const info = file ? await stat(file) : undefined;
    current.revision = info ? `${info.mtimeMs}-${info.size}` : "missing";
    const tokenPath = designWorkspacePath(
      root,
      resolve(root, dirname(current.entry), "design-tokens.css"),
    );
    try {
      await verifiedExistingPath(root, tokenPath, tokenPath, "Design");
      current.tokens = tokenPath;
    } catch (error) {
      if (!(
        error instanceof Error &&
        "status" in error &&
        error.status === 404
      ))
        throw error;
      delete current.tokens;
    }
    return current;
  }

  /** A compact, cache-safe fact block for the currently bound file. */
  context(root: string, sessionId: string): string {
    const current = this.bindings.get(this.key(root, sessionId));
    return current
      ? `Current Design document: ${JSON.stringify({ file: current.entry, revision: current.revision, ...(current.tokens ? { tokens: current.tokens } : {}) })}`
      : "";
  }

  /** Adapt arbitrary workspace HTML to the existing editor without adding files beside it. */
  snapshot(
    root: string,
    sessionId: string,
  ): Promise<TemplateSessionSnapshot | undefined> {
    return this.owned(() => this.readSnapshot(root, sessionId));
  }
  private async readSnapshot(
    root: string,
    sessionId: string,
  ): Promise<TemplateSessionSnapshot | undefined> {
    const current = await this.refreshCurrent(root, sessionId);
    if (!current) return;
    const directory = dirname(current.entry);
    let manifest;
    if (current.entry.startsWith(`design/${sessionId}/`)) {
      const path = `design/${sessionId}/manifest.json`;
      try {
        const file = await verifiedExistingPath(
          root,
          path,
          `design/${sessionId}`,
          "Design",
        );
        manifest = templateManifestV1Schema.parse(
          JSON.parse(await readFile(file, "utf8")),
        );
      } catch (error) {
        if (!(
          error instanceof Error &&
          "status" in error &&
          error.status === 404
        ))
          throw error;
      }
    }
    manifest ??= templateManifestV1Schema.parse({
      schemaVersion: 1,
      id: "ipollo.local.document",
      version: "1.0.0",
      kind: "design",
      surface: "design",
      category: "site",
      subcategory: "document",
      title: basename(current.entry),
      description: "Workspace HTML document",
      cover: "cover.svg",
      entry: basename(current.entry),
      source: { name: "Workspace document", license: "Private" },
      designSystem: {
        tokenVersion: 1,
        editableGroups: ["theme"],
        ...(current.tokens ? { tokens: basename(current.tokens) } : {}),
      },
      applyChecklist: ["Preserve the requested content."],
      minimumAppVersion: "0.0.0",
    });
    return {
      sessionId,
      surface: "design",
      authoring: false,
      manifest,
      state: {
        schemaVersion: 1,
        entry: current.entry,
        briefPath: directory === "." ? "brief.json" : `${directory}/brief.json`,
        createdAt: 0,
        template: {
          id: manifest.id,
          version: manifest.version,
          sourceType: "local",
        },
      },
    };
  }

  /** Authorize legacy Design paths or the bound document and its companion token file. */
  async authorize(
    root: string,
    sessionId: string | undefined,
    path: string,
    write = false,
  ): Promise<string> {
    const normalized = designWorkspacePath(root, path);
    if (normalized.startsWith("design/")) return "design";
    const current = sessionId ? await this.read(root, sessionId) : undefined;
    const tokenPath =
      current &&
      designWorkspacePath(
        root,
        resolve(root, dirname(current.entry), "design-tokens.css"),
      );
    if (
      !current ||
      (write && normalized !== current.entry && normalized !== tokenPath)
    )
      throw new StudioError(
        "DESIGN_PATH",
        "This file is not bound to the Design session.",
        403,
      );
    return normalized;
  }

  /** Attach an authenticated browser stream, released on disconnect or plugin unload. */
  stream(response: ServerResponse): void {
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
  private publish(value: { sessionId: string; entry: string }): void {
    for (const response of this.listeners) {
      if (response.writableLength > 65536) {
        response.end();
        this.listeners.delete(response);
      } else response.write(JSON.stringify(value) + "\n");
    }
  }
  /** Reject new work and close notifications without interrupting admitted writes. */
  stop(): void {
    this.closed = true;
    for (const response of this.listeners) response.end();
    this.listeners.clear();
  }
  /** Await admitted metadata operations before releasing the cache. */
  async dispose(): Promise<void> {
    this.stop();
    await Promise.allSettled([...this.pending]);
    this.bindings.clear();
  }
}

/** Register small native capabilities; the AI retains all layout and design decisions. */
export function registerDesignDocuments(
  ctx: Context,
  documents: DesignDocuments,
  create: (root: string, sessionId: string) => Promise<TemplateSessionSnapshot>,
  preserve?: (
    root: string,
    sessionId: string,
    callId: string,
    signal: AbortSignal,
  ) => Promise<void>,
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
      text: "For webpage and visual design tasks, prefer design_open and write the returned HTML using your normal file tools. Design freely; templates are optional. For revisions, use the current Design document unless the user asks for another version.",
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
    if (workspace) await documents.refresh(workspace.path, agent.session.id);
  });
  ctx.on("agent/pre-step", async ({ agent }, next) => {
    const decision = await next();
    const workspace = workspaceOf(agent.session);
    if (decision.kind === "enter" && workspace)
      await documents.refresh(workspace.path, agent.session.id);
    return decision;
  });
  ctx.effect(() =>
    ctx.tools.register(
      defineTool({
        name: "design_open",
        description:
          "Open an existing workspace HTML file in Design, or create/resume a Design project when path is omitted. Returns the actual file to edit; use normal file tools to create or redesign its contents.",
        parameters: {
          path: {
            type: "string",
            description:
              "Existing workspace HTML path. Omit to create or resume the current Design project.",
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
            .object({ path: z.string().min(1).optional() })
            .strict()
            .safeParse(raw);
          if (!parsed.success)
            throw new StudioError(
              "DESIGN_ARGUMENTS",
              "Provide a non-empty HTML path or omit path.",
            );
          const { path } = parsed.data;
          const session = exec.agent?.session;
          const workspace = session && workspaceOf(session);
          if (!workspace || !session)
            throw new StudioError(
              "DESIGN_CONTEXT",
              "Open a workspace conversation first.",
            );
          const readOnly =
            ctx.sandboxPolicy.resolve({ session }).mode === "read-only";
          const previous = await documents.read(workspace.path, session.id);
          let entry = path ?? previous?.entry;
          if (!entry) {
            if (readOnly)
              throw new StudioError(
                "DESIGN_READ_ONLY",
                "Creating a Design project requires workspace write access.",
                403,
              );
            entry = (await create(workspace.path, session.id)).state.entry;
          }
          const current = await documents.bind(
            workspace.path,
            session.id,
            entry,
            true,
            !readOnly,
          );
          if (!readOnly && previous?.entry !== current.entry)
            await preserve?.(
              workspace.path,
              session.id,
              exec.callId,
              exec.signal,
            );
          return current;
        },
      }),
    ),
  );
}
