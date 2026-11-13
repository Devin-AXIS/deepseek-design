let nodeSqlitePromise: Promise<typeof import("node:sqlite")> | null = null;

export function importNodeSqlite(): Promise<typeof import("node:sqlite")> {
  nodeSqlitePromise ??= import("node:sqlite");
  return nodeSqlitePromise;
}
