import { mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
await mkdir("artifacts", { recursive: true });
const npm = process.env.npm_execpath;
if (!npm) throw Error("Run this check through npm run");
for (const kind of ["design", "video"])
  execFileSync(
    process.execPath,
    [npm, "pack", "--pack-destination", "../../artifacts", "--ignore-scripts"],
    { cwd: `packages/deepseek-${kind}`, stdio: "inherit" },
  );
