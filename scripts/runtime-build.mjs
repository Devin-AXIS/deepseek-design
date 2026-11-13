/** Rebuild the pinned local HyperFrames source, then stage the original runtime in Video. */
import { existsSync, cpSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
const cwd = resolve("vendor/hyperframes");
function run(args) {
  const result = spawnSync("bun", args, { cwd, stdio: "inherit" });
  if (result.status !== 0)
    throw Error(`HyperFrames ${args.join(" ")} failed (${result.status})`);
}
if (!existsSync(resolve(cwd, "node_modules/.bun")))
  run(["install", "--frozen-lockfile", "--ignore-scripts"]);
run(["run", "build:local-studio"]);
const out = resolve("packages/deepseek-video/lib/hyperframes");
mkdirSync(out, { recursive: true });
cpSync(resolve(cwd, "packages/cli/dist"), out, { recursive: true });
cpSync(resolve(cwd, "LICENSE"), resolve(out, "LICENSE"));
