/** Test both published packages independently and together through the supported DSH launcher. */
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const home = resolve(process.env.STUDIO_SMOKE_HOME || ".runtime/native-smoke-home"),
  cli = process.env.DSH_CLI;
if (!cli) throw Error("Set DSH_CLI to the supported dsh launcher");
await mkdir(home, { recursive: true });
const env = { ...process.env, DSH_HOME: home };
async function run(args) {
  return new Promise((done, reject) => {
    const child = spawn(resolve(cli), args, {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (x) => (output += x));
    child.stderr.on("data", (x) => (output += x));
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0 ? done(output) : reject(Error(output)),
    );
  });
}
const version = JSON.parse(await readFile("package.json")).version;
for (const [name, kinds] of [
  ["design", ["design"]],
  ["video", ["video"]],
  ["combined", ["design", "video"]],
]) {
  if (
    process.env.STUDIO_SMOKE_CASES &&
    !process.env.STUDIO_SMOKE_CASES.split(",").includes(name)
  )
    continue;
  const profile = "original-" + name;
  await run([
    "--profile",
    profile,
    "--from-default-profile",
    "web",
    "--dump-config",
  ]);
  let sourceLink = false;
  try {
    await run([
      "plugin",
      "--profile",
      profile,
      "add",
      ...kinds.map((k) =>
        resolve("artifacts", `deepseek-i${k}-${version}.tgz`),
      ),
    ]);
  } catch (error) {
    if (!String(error).includes("ERR_PNPM_IGNORED_BUILDS")) throw error;
    sourceLink = true;
    console.log(
      `Original ${name} archive: native installer requires build-script consent; no scripts approved`,
    );
    await run([
      "plugin",
      "--profile",
      profile,
      "add",
      ...kinds.map((k) => "link:" + resolve(`packages/deepseek-${k}`)),
    ]);
  }
  const manifestPath = resolve(home, "profiles", profile, "package.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  for (const kind of kinds) {
    const bundle = kind === "design" ? "deepseek-idesign" : "deepseek-ivideo";
    if (!manifest.dsh.profile.bundles.includes(bundle))
      manifest.dsh.profile.bundles.push(bundle);
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  const child = spawn(
    resolve(cli),
    [
      "--profile",
      profile,
      ...(process.env.DSH_PICKER_PATCH
        ? ["--patch", resolve(process.env.DSH_PICKER_PATCH)]
        : []),
      "--port",
      "0",
      "--no-open",
    ],
    { env, stdio: ["ignore", "pipe", "pipe"] },
  );
  let log = "";
  child.stdout.on("data", (x) => (log += x));
  child.stderr.on("data", (x) => (log += x));
  try {
    let address;
    for (let i = 0; i < 600; i++) {
      address = log.match(/https?:\/\/127\.0\.0\.1:\d+\/\?token=[\w-]+/)?.[0];
      if (address) break;
      if (child.exitCode !== null) throw Error(log);
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!address) throw Error("Host did not start: " + log);
    await writeFile(resolve(".runtime", "original-" + name + ".log"), log);
    const login = await fetch(address, { redirect: "manual" }),
      cookie = login.headers
        .getSetCookie()
        .map((x) => x.split(";")[0])
        .join("; "),
      origin = new URL(address).origin;
    for (const kind of kinds) {
      const oldPage=await fetch(origin+"/ipollowork-"+kind+"/studio/",{headers:{cookie}});
      if(oldPage.status!==404)throw Error("The old enclosing editor page must be removed");
      const bootstrap = await fetch(
        origin + "/ipollowork-" + kind + "/bootstrap",
        { headers: { cookie } },
      );
      if (!bootstrap.ok || typeof (await bootstrap.json()).token !== "string")
        throw Error("Owner capability refresh failed");
      const deniedBootstrap = await fetch(
        origin + "/ipollowork-" + kind + "/bootstrap",
      );
      if (deniedBootstrap.status !== 401)
        throw Error("Capability refresh must require owner authentication");
      const deniedApi = await fetch(
        origin + "/ipollowork-" + kind + "/api/templates",
        { headers: { cookie } },
      );
      if (deniedApi.status !== 403)
        throw Error("Studio API must require its owner token");
    }
    console.log(
      `Original ${name} ${sourceLink ? "linked-source" : "archive"} authenticated editor smoke passed`,
    );
    if (name === "combined" && process.env.KEEP_STUDIO === "1") {
      await writeFile(
        resolve(".runtime/original-preview.json"),
        JSON.stringify({ address, profile, home }),
      );
      await new Promise(() => {});
    }
  } finally {
    if (child.exitCode === null) {
      const closed = new Promise((r) => child.once("exit", r));
      child.kill("SIGINT");
      await closed;
    }
  }
}
