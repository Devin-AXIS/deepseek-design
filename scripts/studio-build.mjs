/** Build the extracted original editors using only files owned by this repository. */
import { resolve } from "node:path";
import { readFile, writeFile, readdir } from "node:fs/promises";
import postcss from "postcss";
import { build as viteBuild } from "vite";
import { build as buildClient } from "esbuild";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  pluginUiRuntime,
  workspaceUiChunk,
} from "../packages/studio-core/src/original/ui/build-plugin-runtime.mjs";
const original = resolve("packages/studio-core/src/original");
export async function buildStudio(kind) {
  const root = resolve(`packages/deepseek-${kind}/studio`);
  await viteBuild({
    configFile: false,
    root,
    base: "./",
    publicDir: false,
    plugins: [pluginUiRuntime(), tailwindcss(), react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      __DEEPSEEK_STUDIO_MODE__: JSON.stringify("design"),
      __DEEPSEEK_STUDIO_TITLE__: JSON.stringify("Design"),
    },
    resolve: {
      alias: [
        {
          find: "@/app/theme",
          replacement: resolve("packages/studio-core/src/native-theme.ts"),
        },
        { find: "@", replacement: resolve(original, "app/src") },
        {
          find: "@ipollowork/types",
          replacement: resolve(original, "types/src"),
        },
        {
          find: /^@ipollowork\/design-studio$/,
          replacement: resolve(original, "design-studio/src/index.ts"),
        },
        {
          find: "@ipollowork/design-studio",
          replacement: resolve(original, "design-studio/src"),
        },
        {
          find: /^@ipollowork\/video-studio$/,
          replacement: resolve(original, "video-studio/src/index.ts"),
        },
        {
          find: "@ipollowork/video-studio",
          replacement: resolve(original, "video-studio/src"),
        },
        {
          find: "@ipollowork/ui/tokens.css",
          replacement: resolve(original, "ui/src/common/tokens.css"),
        },
        {
          find: "@ipollowork/ui/theme.css",
          replacement: resolve(original, "ui/src/common/theme.css"),
        },
        {
          find: "@ipollowork/ui/palette.css",
          replacement: resolve(original, "ui/src/common/palette.css"),
        },
        {
          find: "@ipollowork/ui/menu-styles",
          replacement: resolve(original, "ui/src/common/menu-styles.ts"),
        },
        {
          find: "@ipollowork/ui/plugin-runtime",
          replacement: resolve(original, "ui/src/plugin/runtime.ts"),
        },
        {
          find: "@ipollowork/ui/runtime-contract",
          replacement: resolve(original, "ui/src/plugin/runtime-contract.ts"),
        },
        {
          find: "@ipollowork/ui",
          replacement: resolve(original, "ui/src/react"),
        },
      ],
      dedupe: ["react", "react-dom"],
    },
    build: {
      outDir: resolve(root, "dist"),
      lib: {
        entry: resolve(root, "src/native.tsx"),
        formats: ["cjs"],
        fileName: () => "client.cjs",
        cssFileName: "native",
      },
      emptyOutDir: true,
      target: "es2022",
      chunkSizeWarningLimit: 4000,
      rollupOptions: { output: { inlineDynamicImports: true } },
    },
  });
  const css = postcss.parse(
    await readFile(resolve(root, "dist/native.css"), "utf8"),
  );
  css.walkAtRules("layer", (rule) =>
    rule.nodes ? rule.replaceWith(...rule.nodes) : rule.remove(),
  );
  css.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/.test(rule.parent.name))
      return;
    rule.selector = rule.selector
      .split(",")
      .map((selector) => {
        const value = selector.trim();
        return /^(?:\.(?:dark|light)(?:-theme)?|\[data-theme=(?:["']?)(?:dark|light)(?:["']?)\])$/.test(
          value,
        )
          ? ":scope" + value
          : selector;
      })
      .join(",");
    rule.selector = rule.selector.replace(
      /:root|(?<![\w-])html(?![\w-])|(?<![\w-])body(?![\w-])/g,
      ":scope",
    );
  });
  const global = postcss.root(),
    scoped = postcss.atRule({ name: "scope", params: "(.ipw-studio-native)" });
  for (const node of [...css.nodes]) {
    if (
      node.type === "atrule" &&
      /^(font-face|property|keyframes|-webkit-keyframes)$/.test(node.name)
    )
      global.append(node);
    else scoped.append(node);
  }
  global.append(scoped);
  const code = await readFile(resolve(root, "dist/client.cjs"), "utf8");
  const shell = await buildClient({
    entryPoints: [resolve(root, "../src/client.tsx")],
    bundle: true,
    platform: "browser",
    format: "cjs",
    target: "es2022",
    external: [
      "react",
      "react/jsx-runtime",
      "react-dom",
      "react-dom/client",
      "@ipollo/native-renderer",
    ],
    write: false,
  });
  const id = kind === "design" ? "deepseek-idesign" : "deepseek-ivideo";
  await writeFile(
    resolve(root, "../lib/client.js"),
    `window.__ModuleLoader__.load({id:${JSON.stringify(id)},factory(hostRequire){const renderer=(()=>{const module={exports:{}};const exports=module.exports;\n${code}\nreturn module.exports;})();function require(id){return id==="@ipollo/native-renderer"?renderer:hostRequire(id);}const module={exports:{}};const exports=module.exports;\n${shell.outputFiles[0].text}\nconst originalApply=module.exports.apply;return {...module.exports,apply(ctx){ctx.effect(()=>{const style=document.createElement("style");style.dataset.studioStyles=${JSON.stringify(id)};style.textContent=${JSON.stringify(global.toString())};document.head.append(style);return ()=>style.remove();});return originalApply(ctx);}};}});\n`,
  );
}
