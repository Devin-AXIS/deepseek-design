/** Check installable editor bundles contain their original editors and have no checkout links. */
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const npm = process.env.npm_execpath;
if (!npm) throw Error("Run through npm run");
for (const kind of ["design", "video"]) {
  const root = `packages/deepseek-${kind}`;
  const info = JSON.parse(await readFile(root + "/package.json", "utf8"));
  // DSH resolves a profile-installed copy before its own, so a private DSH package disables the host plugin of that name.
  for (const name of Object.keys(info.dependencies ?? {}))
    if (name.startsWith("@deepseek-ai/dsh-"))
      throw Error(`${name} must be a peer dependency supplied by DSH`);
  for (const [name, range] of Object.entries(info.peerDependencies ?? {}))
    if (name.startsWith("@deepseek-ai/dsh-") && range !== info.engines.dsh)
      throw Error(`${name} must use the engines.dsh range`);
  const dry = JSON.parse(
    execFileSync(
      process.execPath,
      [npm, "pack", "--dry-run", "--json", "--ignore-scripts"],
      { cwd: root, encoding: "utf8" },
    ),
  )[0];
  for (const file of dry.files)
    if (/node_modules|SOURCE_COMMIT|rejected-editor/.test(file.path))
      throw Error("Unexpected payload: " + file.path);
  for (const required of [
    "lib/index.js",
    "lib/client.js",
    "lib/component-runtime.js",
    "lib/video-enhancement-worker.js",
    "lib/video-enhancement-models.json",
    "lib/hyperframes/cli.js",
    "lib/media-studio/ipollowork.plugin.json",
    "lib/media-studio/ui/image-studio.html",
    "lib/media-studio/ui/video-console.html",
    "lib/hyperframes/registry/registry.json",
    ...(kind === "video"
      ? ["lib/hyperframes/cli.js", "lib/hyperframes/studio/index.html"]
      : []),
  ])
    if (!dry.files.some((x) => x.path === required))
      throw Error("Missing bundled file: " + required);
  const client = await readFile(root + "/lib/client.js", "utf8");
  const manifest = JSON.parse(
    await readFile(root + "/lib/studio/manifest.json", "utf8"),
  );
  for (const name of [manifest.renderer, manifest.stylesheet]) {
    if (
      typeof name !== "string" ||
      !dry.files.some((file) => file.path === "lib/studio/" + name)
    )
      throw Error("Missing lazy editor asset: " + name);
  }
  const renderer = await readFile(
    root + "/lib/studio/" + manifest.renderer,
    "utf8",
  );
  let hasEditorMount = false;
  for (const file of dry.files) {
    if (!file.path.startsWith("lib/studio/") || !file.path.endsWith(".js"))
      continue;
    if (
      (await readFile(root + "/" + file.path, "utf8")).includes(
        "data-studio-editor",
      )
    ) {
      hasEditorMount = true;
      break;
    }
  }
  if (
    !client.includes("data-studio-mount") ||
    !renderer.includes("mountEditor") ||
    !hasEditorMount ||
    client.includes("/studio/?")
  )
    throw Error(
      "Editor must mount in the host document without an enclosing iframe",
    );
  if (Buffer.byteLength(client) > 100_000)
    throw Error("The native entry must remain a small lazy loader");
  if (dry.files.some((file) => file.path === "studio/dist/index.html"))
    throw Error("Standalone editor pages are not part of a native bundle");
  if (
    !info.dsh.client.inject.includes("@deepseek-ai/dsh-client-ui-sidebar-right")
  )
    throw Error("Missing native right panel dependency");
  for (const path of ["lib/index.js", "lib/client.js"])
    if (
      (await readFile(root + "/" + path, "utf8")).includes(
        "/Users/devin/Documents/iPolloWork/",
      )
    )
      throw Error("Build depends on the old checkout");
}
console.log(
  "Both self-contained original editor packages passed payload checks",
);
