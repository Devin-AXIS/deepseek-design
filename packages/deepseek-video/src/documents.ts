/** Native video entry point and small, session-owned editing context. */
import { statSync, readFileSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { realpath } from "node:fs/promises";
import type { ServerResponse } from "node:http";
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-system-prompt";
import { z } from "zod";
import {
  readStudioText,
  writeStudioText,
  safeAssetPath,
  inside,
  StudioHttpError,
} from "../../studio-core/src/http.ts";
import { defineTool } from "@deepseek-ai/dsh-tools";
import { StudioError } from "../../studio-core/src/errors.ts";
import { videoProjectDirectory } from "../../studio-core/src/original/video-studio/src/project.ts";

/** Deliver open requests to authenticated native views; disposal closes every stream. */
export class VideoDocuments {
  private closed = false;
  private readonly listeners = new Set<ServerResponse>();
  private readonly opened = new Map<string, string>();
  private readonly writes = new Map<string, Promise<void>>();
  project(root: string, sessionId: string): string {
    const path = resolve(
      root,
      `.dsh-studio/video/bindings/${safeAssetPath(sessionId)}.json`,
    );
    try {
      const actual = realpathSync(path);
      if (!inside(realpathSync(root), actual) || statSync(actual).size > 4096)
        throw new StudioError(
          "INVALID_BINDING",
          "Invalid Video project binding.",
        );
      const binding = z
        .object({ schemaVersion: z.literal(1), project: z.string() })
        .parse(JSON.parse(readFileSync(actual, "utf8")));
      return safeAssetPath(binding.project);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      )
        return videoProjectDirectory(sessionId);
      throw error;
    }
  }
  bind(root: string, sessionId: string, path: string): Promise<void> {
    if (this.closed)
      return Promise.reject(
        new StudioError("STUDIO_CLOSED", "Video has been disabled.", 503),
      );
    const key = `${root}:${sessionId}`;
    const previous = this.writes.get(key);
    const task = (async () => {
      await previous?.catch(() => undefined);
      root = await realpath(root);
      const project = safeAssetPath(path.replace(/\/index\.html?$/i, ""));
      await readStudioText({
        root,
        requested: `${project}/index.html`,
        prefix: project,
        studioTitle: "Video",
        maxBytes: 4 * 1024 * 1024,
      });
      const requested = `.dsh-studio/video/bindings/${safeAssetPath(sessionId)}.json`;
      let baseUpdatedAt: number | undefined;
      try {
        baseUpdatedAt = (
          await readStudioText({
            root,
            requested,
            prefix: ".dsh-studio/video/bindings",
            studioTitle: "Video",
            maxBytes: 4096,
          })
        ).updatedAt;
      } catch (error) {
        if (!(error instanceof StudioHttpError && error.status === 404))
          throw error;
      }
      await writeStudioText({
        root,
        requested,
        prefix: ".dsh-studio/video/bindings",
        studioTitle: "Video",
        maxBytes: 4096,
        content: JSON.stringify({ schemaVersion: 1, project }) + "\n",
        baseUpdatedAt,
        createOnly: baseUpdatedAt === undefined,
      });
    })();
    this.writes.set(key, task);
    void task
      .finally(() => {
        if (this.writes.get(key) === task) this.writes.delete(key);
      })
      .catch(() => undefined);
    return task;
  }
  notify(sessionId: string, project = videoProjectDirectory(sessionId)): void {
    if (this.closed)
      throw new StudioError("STUDIO_CLOSED", "Video has been disabled.", 503);
    const message =
      JSON.stringify({ sessionId, entry: `${project}/index.html` }) + "\n";
    this.opened.set(sessionId, message);
    for (const response of this.listeners)
      if (!response.destroyed) response.write(message);
  }
  subscribe(response: ServerResponse): void {
    if (this.closed)
      throw new StudioError("STUDIO_CLOSED", "Video has been disabled.", 503);
    response.writeHead(200, {
      "content-type": "application/x-ndjson",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    response.flushHeaders();
    this.listeners.add(response);
    for (const message of this.opened.values()) response.write(message);
    response.once("close", () => this.listeners.delete(response));
  }
  stop(): void {
    this.closed = true;
    for (const response of this.listeners) response.end();
    this.listeners.clear();
    this.opened.clear();
  }
  async dispose(): Promise<void> {
    this.stop();
    await Promise.allSettled([...this.writes.values()]);
  }
}

/** Reuse normal DSH file tools and media actions after opening the session's existing video project. */
export function registerVideoDocuments(
  ctx: Context,
  documents: VideoDocuments,
  open: (root: string, sessionId: string) => Promise<unknown>,
): void {
  const workspaceOf = (session: { id: string; header: { cwd?: string } }) =>
    ctx.workspaceRegistry
      .list()
      .find(
        (workspace) =>
          workspace.path === session.header.cwd &&
          workspace.sessionIds.some((id) => id === session.id),
      );
  ctx.effect(() =>
    ctx.systemPrompt.section({
      name: "ipollo:video",
      order: 1460,
      interpolate: false,
      text: "For video work, prefer video_open to open the native editor. Edit the returned HTML and STORYBOARD.md with normal file tools; use ipollowork_video_action for media and rendering. Preserve the current project when revising it. For an existing project pass its path. Templates are optional.",
    }),
  );
  ctx.effect(() =>
    ctx.systemPrompt.context({
      name: "ipollo:video-document",
      order: 11010,
      interpolate: false,
      text: ({ agent }) => {
        const workspace = agent && workspaceOf(agent.session);
        if (!workspace || !agent) return "";
        const project = documents.project(workspace.path, agent.session.id);
        const entry = `${project}/index.html`;
        const path = resolve(workspace.path, entry);
        const file = statSync(path, { throwIfNoEntry: false });
        if (!file?.isFile()) return "";
        return `Active Video: ${entry} (modified ${file.mtimeMs}). Storyboard: ${project}/STORYBOARD.md. Continue editing this project.`;
      },
    }),
  );
  ctx.effect(() =>
    ctx.tools.register(
      defineTool({
        name: "video_open",
        description:
          "Create or resume this conversation's native video project and open its editor. Returns the HTML and storyboard paths to edit with normal file tools.",
        parameters: {
          path: {
            type: "string",
            description:
              "Existing workspace-relative video project folder or its index.html. Omit to resume the current project or create one.",
          },
        },
        output: {
          schema: { type: "object", additionalProperties: true },
          render: (_args, value) => [
            { type: "text", text: JSON.stringify(value) },
          ],
        },
        timeoutMs: 120000,
        execute: async (args, exec) => {
          if (
            Object.keys(args).some((key) => key !== "path") ||
            (args.path !== undefined && typeof args.path !== "string")
          )
            throw new StudioError(
              "INVALID_ARGS",
              "path must be an existing workspace-relative video folder.",
            );
          const session = exec.agent?.session,
            workspace = session && workspaceOf(session);
          if (!session || !workspace)
            throw new StudioError(
              "STUDIO_CONTEXT",
              "Open a workspace conversation first.",
            );
          if (ctx.sandboxPolicy.resolve({ session }).mode === "read-only")
            throw new StudioError(
              "STUDIO_READ_ONLY",
              "Opening an editable video requires workspace write access.",
              403,
            );
          exec.signal.throwIfAborted();
          if (typeof args.path === "string")
            await documents.bind(workspace.path, session.id, args.path);
          await open(workspace.path, session.id);
          exec.signal.throwIfAborted();
          const project = documents.project(workspace.path, session.id);
          documents.notify(session.id, project);
          return {
            project,
            entry: `${project}/index.html`,
            storyboard: `${project}/STORYBOARD.md`,
          };
        },
      }),
    ),
  );
}
