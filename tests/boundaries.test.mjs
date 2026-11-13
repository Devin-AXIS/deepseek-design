import test from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import {
  assertAllowedImport,
  sourceImports,
} from "../scripts/check-boundaries.mjs";

test("browser graph rejects Node and original application services", () => {
  assert.throws(
    () => assertAllowedImport("client", "panel.tsx", "node:fs"),
    /browser imports Host/,
  );
  assert.throws(
    () =>
      assertAllowedImport(
        "client",
        "panel.tsx",
        "./service",
        "/repo/original/apps/server/service.ts",
      ),
    /browser imports Host/,
  );
  assert.throws(
    () =>
      assertAllowedImport(
        "client",
        "panel.tsx",
        "./client",
        "/repo/ipollowork-server.ts",
      ),
    /former application/,
  );
  assertAllowedImport("client", "panel.tsx", "react");
});
test("Host graph rejects executable UI and checkout imports", () => {
  assert.throws(
    () => assertAllowedImport("host", "index.ts", "./view", "/repo/view.tsx"),
    /Host imports browser/,
  );
  assert.throws(
    () => assertAllowedImport("host", "index.ts", "/other-checkout/module.ts"),
    /absolute source import/,
  );
  assertAllowedImport("host", "index.ts", "node:fs");
});
test("dependency extraction distinguishes runtime imports from erased types", () => {
  const source = ts.createSourceFile(
    "fixture.ts",
    'import type { Host } from "./host"; import { type A } from "./a"; import { type B, run } from "./b"; export type { C } from "./c"; import("./lazy");',
    ts.ScriptTarget.Latest,
    true,
  );
  assert.deepEqual(sourceImports(source), [
    { specifier: "./host", typeOnly: true },
    { specifier: "./a", typeOnly: true },
    { specifier: "./b", typeOnly: false },
    { specifier: "./c", typeOnly: true },
    { specifier: "./lazy", typeOnly: false },
  ]);
});
