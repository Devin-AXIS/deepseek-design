import { isApiError, formatError } from "./original/apps/server/src/errors.ts";
import { StudioError } from "./errors.ts";
import { ZodError } from "zod";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import {
  lstat,
  link,
  mkdir,
  readFile,
  realpath,
  rename,
  stat,
  unlink,
  utimes,
  writeFile,
} from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { randomUUID } from "node:crypto";
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-workspace";
import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import type { WorkspaceId } from "@deepseek-ai/dsh-workspace";

const MAX_REQUEST_BYTES = 20 * 1024 * 1024;

export class StudioHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export function errorCode(error: unknown) {
  if (!error || typeof error !== "object") return "";
  const code = Reflect.get(error, "code");
  return typeof code === "string" ? code : "";
}

export function sendJson(res: ServerResponse, status: number, value: unknown) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(body);
}

export function requireStudioToken(
  req: IncomingMessage,
  header: string,
  expected: string,
  studioTitle: string,
) {
  if (req.headers[header] !== expected) {
    throw new StudioError(
      "STUDIO_AUTH_STALE",
      `${studioTitle} request is not authorized.`,
      403,
    );
  }
}

export function safeRelativePath(
  value: string,
  prefix: string,
  studioTitle: string,
) {
  const normalized = value
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/+$/, "");
  if (!normalized || isAbsolute(normalized) || normalized.includes("\0")) {
    throw new StudioHttpError(400, `Invalid ${studioTitle} file path.`);
  }
  const parts = normalized.split("/");
  if (parts.some((part) => !part || part === "." || part === "..")) {
    throw new StudioHttpError(400, `Invalid ${studioTitle} file path.`);
  }
  const prefixRoot = prefix.replace(/\/+$/, "");
  if (normalized !== prefixRoot && !normalized.startsWith(`${prefixRoot}/`)) {
    throw new StudioHttpError(
      403,
      `${studioTitle} can only access the workspace ${prefixRoot} folder.`,
    );
  }
  return normalized;
}

export function safeAssetPath(value: string) {
  const normalized = value
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/+$/, "");
  if (
    !normalized ||
    isAbsolute(normalized) ||
    normalized.includes("\0") ||
    normalized.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    throw new StudioHttpError(400, "Invalid bundled asset path.");
  }
  return normalized;
}

export function inside(root: string, target: string) {
  const path = relative(root, target);
  return (
    path === "" ||
    (!path.startsWith(`..${sep}`) && path !== ".." && !isAbsolute(path))
  );
}

export async function verifiedExistingPath(
  root: string,
  requested: string,
  prefix: string,
  studioTitle: string,
) {
  const target = resolve(
    root,
    safeRelativePath(requested, prefix, studioTitle),
  );
  if (!inside(root, target))
    throw new StudioHttpError(403, "File path escaped the workspace.");
  const canonical = await realpath(target).catch((error: unknown) => {
    if (errorCode(error) === "ENOENT")
      throw new StudioHttpError(404, `${studioTitle} file was not found.`);
    throw error;
  });
  if (!inside(root, canonical)) {
    throw new StudioHttpError(
      403,
      "Symbolic links outside the workspace are not allowed.",
    );
  }
  return canonical;
}

export async function verifiedWritePath(
  root: string,
  requested: string,
  prefix: string,
  studioTitle: string,
) {
  const relativePath = safeRelativePath(requested, prefix, studioTitle);
  const target = resolve(root, relativePath);
  if (!inside(root, target))
    throw new StudioHttpError(403, "File path escaped the workspace.");
  let canonicalParent = root;
  for (const segment of relativePath.split("/").slice(0, -1)) {
    const next = resolve(canonicalParent, segment);
    const existing = await lstat(next).catch((error: unknown) => {
      if (errorCode(error) === "ENOENT") return null;
      throw error;
    });
    if (!existing) {
      await mkdir(next).catch((error: unknown) => {
        if (errorCode(error) !== "EEXIST") throw error;
      });
    } else if (!existing.isDirectory() && !existing.isSymbolicLink()) {
      throw new StudioHttpError(
        400,
        `${studioTitle} folder path is not a directory.`,
      );
    }
    canonicalParent = await realpath(next);
    if (!inside(root, canonicalParent)) {
      throw new StudioHttpError(
        403,
        "Symbolic links outside the workspace are not allowed.",
      );
    }
  }
  return resolve(canonicalParent, basename(target));
}

export async function readStudioText(input: {
  root: string;
  requested: string;
  prefix: string;
  studioTitle: string;
  maxBytes: number;
}) {
  const path = await verifiedExistingPath(
    input.root,
    input.requested,
    input.prefix,
    input.studioTitle,
  );
  const info = await stat(path);
  if (!info.isFile())
    throw new StudioHttpError(400, `${input.studioTitle} path is not a file.`);
  if (info.size > input.maxBytes)
    throw new StudioHttpError(413, `${input.studioTitle} file is too large.`);
  return {
    path: input.requested,
    content: await readFile(path, "utf8"),
    bytes: info.size,
    updatedAt: info.mtimeMs,
  };
}

const pendingWrites = new Map<string, Promise<void>>();

export async function writeStudioText(input: {
  root: string;
  requested: string;
  prefix: string;
  studioTitle: string;
  content: string | Buffer;
  maxBytes: number;
  baseUpdatedAt?: number | null;
  force?: boolean;
  createOnly?: boolean;
  conflictMessage?: string;
}) {
  if (Buffer.byteLength(input.content) > input.maxBytes)
    throw new StudioHttpError(413, `${input.studioTitle} file is too large.`);
  const path = await verifiedWritePath(
    input.root,
    input.requested,
    input.prefix,
    input.studioTitle,
  );
  const previous = pendingWrites.get(path) ?? Promise.resolve();
  let release!: () => void;
  const done = new Promise<void>((resolve) => {
    release = resolve;
  });
  const queued = previous.then(() => done);
  pendingWrites.set(path, queued);
  await previous;
  try {
    const current = await stat(path).catch((error: unknown) => {
      if (errorCode(error) === "ENOENT") return null;
      throw error;
    });
    if (input.createOnly && current) {
      throw new StudioHttpError(
        409,
        "The Studio file already exists. Reload before saving.",
      );
    }
    if (
      !input.force &&
      input.baseUpdatedAt != null &&
      (!current || Math.abs(current.mtimeMs - input.baseUpdatedAt) > 0.5)
    ) {
      throw new StudioHttpError(
        409,
        input.conflictMessage ??
          `${input.studioTitle} changed since it was loaded. Reload before saving.`,
      );
    }
    const temporary = resolve(
      dirname(path),
      `.${basename(path)}.${randomUUID()}.tmp`,
    );
    try {
      await writeFile(temporary, input.content, {
        encoding: "utf8",
        flag: "wx",
      });
      if (input.createOnly) {
        try {
          await link(temporary, path);
        } catch (error) {
          if (errorCode(error) !== "EEXIST") throw error;
          throw new StudioHttpError(
            409,
            "The Studio file already exists. Reload before saving.",
          );
        }
      } else await rename(temporary, path);
    } finally {
      await unlink(temporary).catch(() => undefined);
    }
    let info = await stat(path);
    if (current && info.mtimeMs <= current.mtimeMs + 0.5) {
      await utimes(path, info.atime, new Date(Math.ceil(current.mtimeMs) + 1));
      info = await stat(path);
    }
    return {
      ok: true,
      path: input.requested,
      bytes: info.size,
      updatedAt: info.mtimeMs,
      revision: `${info.mtimeMs}-${info.size}`,
    };
  } finally {
    release();
    if (pendingWrites.get(path) === queued) pendingWrites.delete(path);
  }
}

export function workspaceRoot(ctx: Context, workspaceId: string) {
  const workspace = ctx.workspaceRegistry.get(workspaceId as WorkspaceId);
  if (!workspace)
    throw new StudioHttpError(404, "DeepSeek Harness workspace was not found.");
  return workspace.path;
}

export async function requestObject(
  req: IncomingMessage,
  maxBytes = MAX_REQUEST_BYTES,
) {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > maxBytes)
      throw new StudioHttpError(413, "Studio request is too large.");
    chunks.push(buffer);
  }
  try {
    const value: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error("not an object");
    return value;
  } catch {
    throw new StudioHttpError(400, "Invalid JSON request.");
  }
}

export function field(value: object, name: string) {
  return Reflect.get(value, name);
}

export function stringField(value: unknown, name: string) {
  if (typeof value !== "string" || !value.trim())
    throw new StudioHttpError(400, `Missing ${name}.`);
  return value.trim();
}

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

export function contentType(path: string) {
  return (
    CONTENT_TYPES[extname(path).toLowerCase()] ?? "application/octet-stream"
  );
}

export async function streamFile(
  res: ServerResponse,
  path: string,
  info: { size: number },
  cacheControl: string,
) {
  res.writeHead(200, {
    "content-type": contentType(path),
    "content-length": info.size,
    "cache-control": cacheControl,
    "x-content-type-options": "nosniff",
  });
  await pipeline(createReadStream(path), res);
}

/** Require DSH owner authentication before serving editor code or file APIs. */
export function requireStudioOwner(ctx: Context, req: IncomingMessage): void {
  const connection = ctx.get("connection") as {
    admit(input: {
      headers: IncomingMessage["headers"];
    }): { rejection: number } | { peer: { principal: { kind: string } } };
  };
  const admission = connection.admit({ headers: req.headers });
  if ("rejection" in admission)
    throw new StudioHttpError(
      admission.rejection,
      "Studio authentication is required.",
    );
  if (admission.peer.principal.kind !== "owner")
    throw new StudioHttpError(403, "Studio requires owner access.");
}

/** Register one owned route and await every admitted request when the plugin unloads. */
export function registerStudioRoute(
  ctx: Context,
  route: WebRoute,
  dispose: () => Promise<unknown>,
  stop: () => void,
): void {
  ctx.effect(() => {
    const pending = new Set<Promise<unknown>>();
    const requests = new Map<IncomingMessage, ServerResponse>();
    let accepting = true;
    const handler = route.handler;
    const off = ctx.webServer.register({
      ...route,
      handler: (req, res) => {
        if (!accepting) {
          sendJson(res, 503, {
            ok: false,
            code: "STUDIO_CLOSED",
            message: "Studio has been unloaded.",
          });
          return;
        }
        requests.set(req, res);
        const task = Promise.resolve().then(() => handler(req, res));
        pending.add(task);
        void task
          .finally(() => {
            pending.delete(task);
            requests.delete(req);
          })
          .catch(() => undefined);
        return task;
      },
    });
    return async () => {
      accepting = false;
      off();
      stop();
      for (const [req, res] of requests) {
        if (!req.complete) req.destroy();
        if (res.headersSent && !res.writableEnded) res.destroy();
      }
      await Promise.allSettled([...pending]);
      await dispose();
    };
  }, "Studio route lifetime");
}

/** Send a structured Studio failure without treating malformed requests as server faults. */
export function sendStudioError(res: ServerResponse, error: unknown): void {
  if (isApiError(error) && !(error instanceof StudioError)) {
    sendJson(res, error.status, { ok: false, ...formatError(error) });
    return;
  }
  if (error instanceof StudioError) {
    sendJson(res, error.status, {
      ok: false,
      code: error.code,
      message: error.message,
    });
    return;
  }
  if (error instanceof StudioHttpError) {
    sendJson(res, error.status, {
      ok: false,
      code: "STUDIO_HTTP_" + error.status,
      message: error.message,
    });
    return;
  }
  if (error instanceof ZodError) {
    sendJson(res, 400, {
      ok: false,
      code: "STUDIO_INPUT",
      message: "Invalid Studio request.",
    });
    return;
  }
  sendJson(res, 500, {
    ok: false,
    code: "STUDIO_FAILED",
    message: error instanceof Error ? error.message : "Studio request failed.",
  });
}

/** Answer capability refresh only after the owning route has admitted the DSH owner. */
export function handleStudioBootstrap(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  routeRoot: string,
  token: string,
): boolean {
  if (req.method !== "GET" || url.pathname !== routeRoot + "/bootstrap")
    return false;
  sendJson(res, 200, { token });
  return true;
}

/** Serve immutable, packaged editor assets after the enclosing route authenticates its owner. */
export async function serveStudioAsset(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  routeRoot: string,
  directory: string,
): Promise<boolean> {
  const prefix = `${routeRoot}/assets/`;
  if (!url.pathname.startsWith(prefix)) return false;
  if (req.method !== "GET")
    throw new StudioHttpError(405, "Editor assets accept GET only.");
  let requested: string;
  try {
    requested = decodeURIComponent(url.pathname.slice(prefix.length));
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    throw new StudioHttpError(400, "Invalid editor asset path.");
  }
  requested = safeAssetPath(requested);
  const root = await realpath(directory);
  let file: string;
  try {
    file = await realpath(resolve(root, requested));
  } catch (error) {
    if (errorCode(error) !== "ENOENT") throw error;
    throw new StudioHttpError(404, "Editor asset was not found.");
  }
  if (!inside(root, file))
    throw new StudioHttpError(403, "Editor asset escaped its package.");
  const info = await stat(file);
  if (!info.isFile())
    throw new StudioHttpError(404, "Editor asset was not found.");
  await streamFile(res, file, info, "private, max-age=31536000, immutable");
  return true;
}
