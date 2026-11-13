import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import {
  authorizationVault,
  disposeAuthorizationRuntime,
} from "../packages/studio-core/src/original/apps/server/src/authorization-runtime.ts";
import { assertResourceWritable } from "../packages/studio-core/src/original/apps/server/src/resource-lifecycle.ts";

test("unloading an authorization store drains mutations and releases its cached instance", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-authorization-"));
  const config = {
    configPath: join(root, "config.json"),
    workspaces: [],
    readOnly: false,
  };
  const scope = {
    connectionId: "test",
    accountId: "default",
    methodId: "test",
    methodFingerprint: "test-v1",
  };
  try {
    const vault = await authorizationVault(config);
    const saved = vault.saveCredential({
      ...scope,
      values: { token: "private fixture" },
      secretFields: ["token"],
    });
    await disposeAuthorizationRuntime(config);
    await saved;
    await assert.rejects(vault.readCredentialForAccount(scope), /unloaded/);
    const reloaded = await authorizationVault(config);
    assert.notEqual(reloaded, vault);
    assert.deepEqual(await reloaded.readCredentialForAccount(scope), {
      token: "private fixture",
    });
  } finally {
    await disposeAuthorizationRuntime(config);
    await rm(root, { recursive: true, force: true });
  }
});

test("native media respects deletion markers written with the original schema", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-deletion-"));
  const config = {
    configPath: join(root, "config.json"),
    workspaces: [],
    readOnly: false,
  };
  try {
    const db = new DatabaseSync(join(root, "runtime.sqlite"));
    db.exec(
      "CREATE TABLE resource_lifecycle (workspace_id TEXT, session_id TEXT, deleting INTEGER); INSERT INTO resource_lifecycle VALUES ('workspace', 'deleted', 2), ('workspace', 'pending', 1)",
    );
    db.close();
    await assertResourceWritable(config, "workspace", "active");
    await assert.rejects(
      assertResourceWritable(config, "workspace", "deleted"),
      { code: "resource_deleted", status: 410 },
    );
    await assert.rejects(
      assertResourceWritable(config, "workspace", "pending"),
      { code: "resource_deleting", status: 409 },
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
