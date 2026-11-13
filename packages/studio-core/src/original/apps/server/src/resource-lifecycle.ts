/** Native media writers honor deletion markers retained in their own state database. */
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { z } from "zod";
import { ApiError } from "./errors.js";
import { importNodeSqlite } from "./node-sqlite.js";
import { runtimeDbPath } from "./runtime-storage.js";
import type { ServerConfig } from "./types.js";

export type ResourceCleanup = { paths: string[]; retainedPaths: string[] };

/** Reject writes to projects or sessions whose persisted deletion has begun. */
export async function assertResourceWritable(config: ServerConfig, workspaceId: string, sessionId?: string) {
  const path = runtimeDbPath(config);
  await mkdir(dirname(path), { recursive: true });
  const db = new (await importNodeSqlite()).DatabaseSync(path);
  try {
    db.exec(`PRAGMA busy_timeout = 5000;
      CREATE TABLE IF NOT EXISTS resource_lifecycle (
        workspace_id TEXT NOT NULL, session_id TEXT NOT NULL, engine_id TEXT NOT NULL,
        archived_at INTEGER, deleting INTEGER NOT NULL DEFAULT 0, engine_deleted INTEGER NOT NULL DEFAULT 0,
        summary TEXT, cleanup TEXT, delete_files INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY (workspace_id, session_id)
      );`);
    const query = db.prepare("SELECT deleting FROM resource_lifecycle WHERE workspace_id = ? AND session_id IN ('', ?)");
    const records = query.all(workspaceId, sessionId ?? "").map(value => z.object({ deleting: z.number() }).parse(value));
    if (records.some(row => row.deleting === 2)) throw new ApiError(410, "resource_deleted", "此项目或会话已删除。");
    if (records.some(row => row.deleting)) throw new ApiError(409, "resource_deleting", "正在删除，请等待清理完成。");
  } finally { db.close(); }
}
