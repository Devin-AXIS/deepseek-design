import { templateCategorySchema } from "./original/types/src/templates.ts";
/** Native HTTP adapters for the original editor's media services and workspace files. */
import { readFile, stat, unlink } from "node:fs/promises";
import { basename } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";
import { StudioServices, serviceCallSchema } from "./services.ts";
import {
  StudioHttpError,
  contentType,
  errorCode,
  readStudioText,
  requestObject,
  sendJson,
  verifiedExistingPath,
  workspaceRoot,
  writeStudioText,
} from "./http.ts";
import type { Context } from "@deepseek-ai/cordis";

const textWrite = z.object({
  path: z.string(),
  content: z.string(),
  baseUpdatedAt: z.number().nullable().optional(),
  force: z.boolean().optional(),
  createOnly: z.boolean().optional(),
});
const binaryWrite = z.object({
  path: z.string(),
  dataBase64: z.string(),
  baseUpdatedAt: z.number().nullable().optional(),
  force: z.boolean().optional(),
  createOnly: z.boolean().optional(),
});

/** Forward only original Studio operations; DSH remains the workspace and authentication owner. */
export class StudioServiceRoutes {
  constructor(
    private ctx: Context,
    private services: StudioServices,
    private routeRoot: string,
    private maxBytes: number,
  ) {}
  async handle(
    req: IncomingMessage,
    res: ServerResponse,
    url: URL,
  ): Promise<boolean> {
    const mount = this.routeRoot + "/api/services";
    if (!url.pathname.startsWith(mount + "/")) return false;
    const path = url.pathname.slice(mount.length);
    if (req.method === "POST" && path === "/experimental/extensions/call") {
      const input = serviceCallSchema.parse(await requestObject(req));
      sendJson(res, 200, await this.services.call(input));
      return true;
    }
    const match = /^\/workspace\/([^/]+)\/(.+)$/.exec(path);
    if (!match) throw new StudioHttpError(404, "Unknown Studio service route.");
    const workspaceId = decodeURIComponent(match[1]!);
    const root = workspaceRoot(this.ctx, workspaceId),
      action = match[2];
    const snapshot = /^template-sessions\/([A-Za-z0-9_-]+)$/.exec(action!);
    if (req.method === "GET" && snapshot) {
      sendJson(
        res,
        200,
        await this.services.templateSnapshot(workspaceId, snapshot[1]!),
      );
      return true;
    }
    if (req.method === "GET" && action === "templates") {
      sendJson(res, 200, {
        items: await this.services.templateCatalog(workspaceId),
      });
      return true;
    }
    if (req.method === "POST" && action === "templates/from-session/validate") {
      const body = z
        .object({ sessionId: z.string().regex(/^[\w-]{1,128}$/) })
        .parse(await requestObject(req));
      sendJson(
        res,
        200,
        await this.services.validateTemplate(workspaceId, body.sessionId),
      );
      return true;
    }
    if (
      req.method === "POST" &&
      (action === "templates/from-session" ||
        action === "templates/from-session/package")
    ) {
      const body = z
        .object({
          sessionId: z.string().regex(/^[\w-]{1,128}$/),
          category: templateCategorySchema,
          title: z.string().trim().min(1).max(96),
          description: z.string().max(240).optional(),
          subcategory: z.string().optional(),
          style: z.string().optional(),
          tags: z.array(z.string()).max(12).optional(),
        })
        .parse(await requestObject(req));
      if (action === "templates/from-session/package") {
        const output = await this.services.saveTemplate(
          workspaceId,
          body,
          true,
        );
        if (!("archive" in output))
          throw new StudioHttpError(
            500,
            "Template export did not return an archive.",
          );
        res.writeHead(200, {
          "content-type": "application/zip",
          "content-disposition": `attachment; filename="${output.manifest.id}.ipwp"`,
          "content-length": output.archive.byteLength,
          "cache-control": "no-store",
        });
        res.end(output.archive);
      } else
        sendJson(res, 200, {
          item: await this.services.saveTemplate(workspaceId, body, false),
        });
      return true;
    }
    if (req.method === "GET" && action === "plugin-packages") {
      sendJson(res, 200, await this.services.packages(workspaceId));
      return true;
    }
    const resource = /^plugin-packages\/([^/]+)\/ui\/([^/]+)$/.exec(action!);
    if (req.method === "GET" && resource) {
      sendJson(
        res,
        200,
        await this.services.uiResource(
          workspaceId,
          decodeURIComponent(resource[1]!),
          decodeURIComponent(resource[2]!),
        ),
      );
      return true;
    }
    if (req.method === "GET" && action === "artifacts") {
      const sessionId = z
        .string()
        .min(1)
        .parse(url.searchParams.get("sessionId"));
      const cursor = url.searchParams.get("cursor");
      sendJson(
        res,
        200,
        await this.services.artifacts(
          workspaceId,
          sessionId,
          cursor === null
            ? null
            : z.coerce.number().int().positive().parse(cursor),
        ),
      );
      return true;
    }
    if (action === "files/content" && req.method === "GET") {
      const requested = z.string().min(1).parse(url.searchParams.get("path"));
      sendJson(
        res,
        200,
        await readStudioText({
          root,
          requested,
          prefix: this.prefix(requested),
          studioTitle: "Studio",
          maxBytes: this.maxBytes,
        }),
      );
      return true;
    }
    if (action === "files/content" && req.method === "POST") {
      const body = textWrite.parse(await requestObject(req));
      sendJson(
        res,
        200,
        await writeStudioText({
          root,
          requested: body.path,
          prefix: this.prefix(body.path),
          studioTitle: "Studio",
          content: body.content,
          maxBytes: this.maxBytes,
          baseUpdatedAt: body.baseUpdatedAt,
          force: body.force,
          createOnly: body.createOnly,
        }),
      );
      return true;
    }
    if (action === "files/raw" && req.method === "GET") {
      const requested = z.string().min(1).parse(url.searchParams.get("path"));
      const file = await verifiedExistingPath(
          root,
          requested,
          this.prefix(requested),
          "Studio",
        ),
        info = await stat(file);
      if (!info.isFile() || info.size > this.maxBytes)
        throw new StudioHttpError(413, "Studio media is too large.");
      res.writeHead(200, {
        "content-type": contentType(file),
        "content-length": info.size,
        "content-disposition": `inline; filename="${basename(file).replace(/["\\]/g, "_")}"`,
        "cache-control": "no-store",
      });
      res.end(await readFile(file));
      return true;
    }
    if (action === "files/raw" && req.method === "POST") {
      const contentType = req.headers["content-type"] ?? "";
      let body: z.infer<typeof binaryWrite>;
      if (contentType.startsWith("multipart/form-data")) {
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const part of req) {
          const chunk = Buffer.isBuffer(part) ? part : Buffer.from(part);
          size += chunk.length;
          if (size > this.maxBytes + 65536)
            throw new StudioHttpError(413, "Studio media is too large.");
          chunks.push(chunk);
        }
        const form = await new Response(Buffer.concat(chunks), {
          headers: { "content-type": contentType },
        }).formData();
        const file = form.get("file");
        if (!(file instanceof File))
          throw new StudioHttpError(400, "A media file is required.");
        body = {
          path: z.string().min(1).parse(url.searchParams.get("path")),
          dataBase64: Buffer.from(await file.arrayBuffer()).toString("base64"),
        };
      } else
        body = binaryWrite.parse(
          await requestObject(req, Math.ceil(this.maxBytes * 1.4) + 65536),
        );
      const bytes = Buffer.from(body.dataBase64, "base64");
      sendJson(
        res,
        200,
        await writeStudioText({
          root,
          requested: body.path,
          prefix: this.prefix(body.path),
          studioTitle: "Studio",
          content: bytes,
          maxBytes: this.maxBytes,
          baseUpdatedAt: body.baseUpdatedAt,
          force: body.force,
          createOnly: body.createOnly,
        }),
      );
      return true;
    }
    if (action === "files/delete" && req.method === "POST") {
      const body = z
        .object({
          files: z
            .array(
              z.object({ path: z.string(), recursive: z.boolean().optional() }),
            )
            .max(50),
        })
        .parse(await requestObject(req));
      const items = [];
      for (const file of body.files) {
        if (file.recursive)
          throw new StudioHttpError(400, "Media cleanup accepts files only.");
        try {
          const path = await verifiedExistingPath(
            root,
            file.path,
            this.prefix(file.path),
            "Studio",
          );
          await unlink(path);
          items.push({ ok: true, path: file.path });
        } catch (error) {
          if (
            errorCode(error) === "ENOENT" ||
            (error instanceof StudioHttpError && error.status === 404)
          )
            items.push({ ok: true, path: file.path });
          else throw error;
        }
      }
      sendJson(res, 200, items);
      return true;
    }
    throw new StudioHttpError(404, "Unknown Studio service route.");
  }
  private prefix(path: string) {
    const prefix = path.replace(/\\/g, "/").split("/")[0];
    if (prefix !== "design" && prefix !== "video" && prefix !== "artifacts")
      throw new StudioHttpError(
        403,
        "Studio files must stay in project or media folders.",
      );
    return prefix;
  }
}
