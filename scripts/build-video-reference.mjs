import { build } from "esbuild";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire, isBuiltin } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { referenceOperations } from "../packages/deepseek-video/src/reference-operations.ts";

/** Package only the pinned CLI's measurement commands. The Studio keeps its own runtime. */
export async function buildVideoReference(root) {
  const manifest = resolve(root, "package.json");
  const plugin = JSON.parse(await readFile(manifest, "utf8"));
  const require = createRequire(pathToFileURL(manifest));
  const engineManifest = require.resolve("hyperframes/package.json");
  const engine = JSON.parse(await readFile(engineManifest, "utf8"));
  if (engine.version !== plugin.devDependencies.hyperframes)
    throw Error("Reference measurement requires the pinned HyperFrames package");

  const dist = resolve(dirname(engineManifest), "dist");
  const cli = await readFile(resolve(dist, "cli.js"), "utf8");
  const measureFile = cli.match(/measure: \(\) => import\("\.\/(measure-[A-Z0-9]+\.js)"\)/)?.[1];
  if (!measureFile) throw Error("Cannot locate the pinned HyperFrames measure module");
  const measure = await readFile(resolve(dist, measureFile), "utf8");
  const entries = new Map(Array.from(
    measure.matchAll(/^\s+(\w+): \(\) => import\("(\.\/\w+-[A-Z0-9]+\.js)"\)/gm),
    ([, name, path]) => [name, path],
  ));
  const loaders = referenceOperations.map((operation) => {
    const path = entries.get(operation);
    if (!path) throw Error(`HyperFrames is missing measure ${operation}`);
    return `${operation}: () => import(${JSON.stringify(path)})`;
  });
  const destination = resolve(root, "lib/video-reference");
  await mkdir(destination, { recursive: true });
  const dependencies = Object.keys(plugin.dependencies);
  const built = await build({
    stdin: {
      sourcefile: "measure-entry.js",
      resolveDir: dist,
      contents: `import { runCommand } from "citty";
const operations = { ${loaders.join(", ")} };
const [operation, ...rawArgs] = process.argv.slice(2);
if (!Object.hasOwn(operations, operation)) throw Error("Unknown video measurement");
await runCommand((await operations[operation]()).default, { rawArgs });`,
    },
    outfile: resolve(destination, "cli.js"),
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node24",
    minify: true,
    legalComments: "eof",
    external: dependencies,
    metafile: true,
    write: false,
  });
  for (const { imports } of Object.values(built.metafile.outputs)) {
    for (const { path } of imports) {
      if (!isBuiltin(path) && !dependencies.some((name) => path === name || path.startsWith(name + "/")))
        throw Error(`Reference measurement needs an unbundled dependency: ${path}`);
    }
  }
  await writeFile(resolve(destination, "cli.js"), built.outputFiles[0].contents);
  await writeFile(resolve(destination, "package.json"), JSON.stringify({
    name: engine.name, version: engine.version, type: "module",
    license: engine.license, repository: engine.repository,
  }, null, 2) + "\n");
  await cp("vendor/hyperframes/LICENSE", resolve(destination, "LICENSE"));
}
