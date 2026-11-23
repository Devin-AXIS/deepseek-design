import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const sharedUiRoot = fileURLToPath(new URL("../../../../packages/studio-core/src/original/ui", import.meta.url));
const sharedUiPackage = JSON.parse(readFileSync(join(sharedUiRoot, "package.json"), "utf8"));
const resolveUiDependency = createRequire(join(sharedUiRoot, "package.json")).resolve;

// Unit tests consume workspace sources; they must not boot the Studio server
// or require a complete rendered-media build through vite.config.ts.
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
    conditions: ["bun", "import"],
    alias: {
      react: dirname(resolveUiDependency("react/package.json")),
      "react-dom": dirname(resolveUiDependency("react-dom/package.json")),
      ...Object.fromEntries(Object.entries(sharedUiPackage.exports).flatMap(([subpath, target]) =>
        typeof target === "string" ? [[`@ipollowork/ui/${subpath.slice(2)}`, join(sharedUiRoot, target)]] : [],
      )),
      "@ipollowork/types/hyperframes": fileURLToPath(new URL("../../../../packages/studio-core/src/original/types/src/hyperframes.ts", import.meta.url)),
      "@ipollowork/types/video-image-workbench": fileURLToPath(
        new URL("../../../../packages/studio-core/src/original/types/src/video-image-workbench.ts", import.meta.url),
      ),
    },
  },
  test: {
    server: { deps: { inline: [/@base-ui\//, /zustand/] } },
    exclude: ["data/**", "node_modules/**", "dist/**"],
    setupFiles: ["src/test-setup.ts"],
    maxWorkers: 1,
  },
});
