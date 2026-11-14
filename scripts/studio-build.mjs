/** Build the extracted original editors using only files owned by this repository. */
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { readFile, writeFile, cp, unlink, rm } from "node:fs/promises";
import postcss from "postcss";
import { build as viteBuild } from "vite";
import { build as buildClient } from "esbuild";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { pluginUiRuntime } from "../packages/studio-core/src/original/ui/build-plugin-runtime.mjs";
const original = resolve("packages/studio-core/src/original");
export async function buildStudio(kind) {
  const root = resolve(`packages/deepseek-${kind}/studio`);
  const result = await viteBuild({
    configFile: false,
    root,
    base: "./",
    publicDir: false,
    plugins: [
      {
        name: "native-template-sources",
        enforce: "pre",
        transform(code, id) {
          if (id !== resolve(original, "app/src/app/index.css")) return;
          return (
            code +
            ["template-library.tsx", "template-preview.tsx"]
              .map(
                (file) =>
                  `\n@source ${JSON.stringify(resolve("packages/studio-core/src", file))};`,
              )
              .join("")
          );
        },
      },
      pluginUiRuntime(),
      tailwindcss(),
      react(),
    ],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    resolve: {
      alias: [
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
      emptyOutDir: true,
      target: "es2022",
      chunkSizeWarningLimit: 4000,
      modulePreload: false,
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        input: resolve(root, "src/native.tsx"),
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "renderer-[hash].js",
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: "[name]-[hash][extname]",
        },
      },
    },
  });
  if (Array.isArray(result) || !("output" in result))
    throw Error("Expected a single editor build");
  const entry = result.output.find(
    (item) => item.type === "chunk" && item.isEntry,
  );
  const style = result.output.find(
    (item) => item.type === "asset" && item.fileName.endsWith(".css"),
  );
  if (!entry || !style)
    throw Error("The editor build must emit its renderer and stylesheet");
  const css = postcss.parse(
    await readFile(resolve(root, "dist", style.fileName), "utf8"),
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
  const cssText = global.toString();
  const styleName = `style-${createHash("sha256").update(cssText).digest("hex").slice(0, 16)}.css`;
  await writeFile(resolve(root, "dist", styleName), cssText);
  if (
    result.output.some(
      (item) => item.type === "chunk" && item.code.includes(style.fileName),
    )
  )
    throw Error("An unscoped stylesheet is referenced by editor code");
  await unlink(resolve(root, "dist", style.fileName));
  await writeFile(
    resolve(root, "dist/manifest.json"),
    JSON.stringify(
      { renderer: entry.fileName, stylesheet: styleName },
      null,
      2,
    ) + "\n",
  );
  await rm(resolve(root, "../lib/studio"), { recursive: true, force: true });
  await cp(resolve(root, "dist"), resolve(root, "../lib/studio"), {
    recursive: true,
  });
  const shell = await buildDshShell(kind);
  const shellScript = shell.outputFiles.find((file) =>
    file.path.endsWith(".js"),
  );
  const shellStyle = shell.outputFiles.find((file) =>
    file.path.endsWith(".css"),
  );
  if (!shellScript) throw Error("The native plugin build must emit JavaScript");
  const id = kind === "design" ? "deepseek-idesign" : "deepseek-ivideo";
  const assets = {
    rendererUrl: `/ipollowork-${kind}/assets/${entry.fileName}`,
    stylesheetUrl: `/ipollowork-${kind}/assets/${styleName}`,
  };
  await writeFile(
    resolve(root, "../lib/client.js"),
    buildNativeClient(id, assets, shellScript.text, shellStyle?.text ?? ""),
  );
}

/** Wrap native code and its CSS in the DSH loader; styles share the plugin lifetime. */
export function buildNativeClient(id, assets, code, css) {
  return `window.__ModuleLoader__.load({id:${JSON.stringify(id)},factory(hostRequire){const renderer=${JSON.stringify(assets)};function require(id){return id==="@ipollo/native-renderer"?renderer:hostRequire(id);}const module={exports:{}};const exports=module.exports;\n${code}\nreturn {...module.exports,apply(ctx){ctx.effect(()=>{const style=document.createElement("style");style.textContent=${JSON.stringify(css)};document.head.append(style);return()=>style.remove();});return module.exports.apply(ctx);}};}});\n`;
}

/** Compile the native DSH slot entry with its explicit browser and JSX configuration. */
export async function buildDshShell(kind) {
  const root = resolve(`packages/deepseek-${kind}/studio`);
  return buildClient({
    entryPoints: [resolve(root, "../src/client.tsx")],
    outfile: resolve(root, "../lib/client.js"),
    tsconfig: resolve("tsconfig.studio.json"),
    jsx: "automatic",
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
      "@deepseek-ai/dsh-client-ui-primitives",
    ],
    write: false,
  });
}
