/** Build two native bundles, their shared placement helper and the original editors. */
import { build } from "esbuild";
import { mkdir, writeFile, cp, readFile } from "node:fs/promises";
import { buildStudio } from "./studio-build.mjs";
for (const kind of ["design", "video"]) {
  const root = `packages/deepseek-${kind}`;
  await mkdir(root + "/lib", { recursive: true });
  await build({
    entryPoints: [root + "/src/index.ts"],
    outfile: root + "/lib/index.js",
    bundle: true,
    platform: "node",
    format: "esm",
    external: [
      "@deepseek-ai/*",
      "@huggingface/*",
      "puppeteer-core",
      "playwright-core",
      "zod",
      "sharp",
      "drizzle-orm",
      "drizzle-orm/*",
      "oauth4webapi",
      "jsonc-parser",
      "minimatch",
      "better-sqlite3",
      "onnxruntime-node",
      "bun:*",
    ],
    plugins:
      kind === "video"
        ? [
            {
              name: "video-runtime",
              setup(b) {
                b.onResolve({ filter: /^\.\/runtime$/ }, () => ({
                  path: "./runtime.js",
                  external: true,
                }));
              },
            },
          ]
        : [],
    banner: {
      js: 'import {createRequire as __createRequire} from "node:module";const require=__createRequire(import.meta.url);',
    },
    target: "node24",
    sourcemap: true,
  });
  await build({
    entryPoints: [
      "packages/studio-core/src/original/apps/server/src/extensions/video-enhancement-worker.ts",
    ],
    outfile: root + "/lib/video-enhancement-worker.js",
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node24",
    packages: "external",
  });
  await cp(
    "packages/studio-core/src/original/apps/server/src/extensions/video-enhancement-models.json",
    root + "/lib/video-enhancement-models.json",
  );
  if (kind === "video") {
    await build({
      entryPoints: [root + "/src/runtime.ts"],
      outfile: root + "/lib/runtime.js",
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node24",
    });
    await build({
      entryPoints: [root + "/src/preview-owner-guard.ts"],
      outfile: root + "/lib/preview-owner-guard.js",
      platform: "node",
      format: "esm",
      target: "node24",
    });
  }
  await build({
    entryPoints: ["packages/studio-core/vendor/component-runtime.mjs"],
    outfile: root + "/lib/component-runtime.js",
    bundle: true,
    platform: "browser",
    format: "iife",
    globalName: "DeepSeekComponentRuntime",
    minify: true,
    legalComments: "inline",
  });
  await cp(
    "packages/studio-core/src/original/examples/plugin-packages/media-studio",
    root + "/lib/media-studio",
    { recursive: true },
  );
  await buildStudio(kind);
  await cp("packages/studio-core/templates/shared", root + "/lib/templates", {
    recursive: true,
  });
  await cp("packages/studio-core/templates/" + kind, root + "/lib/templates", {
    recursive: true,
  });
}
const { existsSync } = await import("node:fs");
if (!existsSync("vendor/hyperframes/packages/cli/dist/cli.js"))
  await import("./runtime-build.mjs");
for (const kind of ["design", "video"]) {
  const target = `packages/deepseek-${kind}/lib/hyperframes`;
  await cp("vendor/hyperframes/packages/cli/dist", target, { recursive: true });
  await cp("vendor/hyperframes/registry", target + "/registry", {
    recursive: true,
  });
  await cp("vendor/hyperframes/LICENSE", target + "/LICENSE");
}
console.log(
  "Built original editors as native DSH components and independently owned services",
);
