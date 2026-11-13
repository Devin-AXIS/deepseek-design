/** Test both published packages independently and together through the supported DSH launcher. */
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const home = resolve(
    process.env.STUDIO_SMOKE_HOME || ".runtime/native-smoke-home",
  ),
  cli = process.env.DSH_CLI;
if (!cli) throw Error("Set DSH_CLI to the supported dsh launcher");
await mkdir(home, { recursive: true });
const env = { ...process.env, DSH_HOME: home };
const approveRuntimeBuilds = process.env.STUDIO_SMOKE_APPROVE_RUNTIME_BUILDS;
if (approveRuntimeBuilds !== undefined && approveRuntimeBuilds !== "1")
  throw Error("STUDIO_SMOKE_APPROVE_RUNTIME_BUILDS must be 1 or unset");
// Exact dependency versions approved only inside the disposable test profile.
const approvedBuilds = [
  "esbuild@0.25.12",
  "onnxruntime-node@1.21.0",
  "onnxruntime-node@1.27.0",
  "protobufjs@7.6.6",
  "sharp@0.34.5",
];
async function configureBuildApproval(profile) {
  if (approveRuntimeBuilds !== "1") return;
  const file = resolve(home, "profiles", profile, "pnpm-workspace.yaml");
  const current = await readFile(file, "utf8");
  const policy =
    "allowBuilds:\n" +
    approvedBuilds.map((name) => `  ${name}: true\n`).join("");
  if (/^allowBuilds:/m.test(current)) {
    if (!current.endsWith(policy))
      throw Error(
        "Use a clean smoke profile; an unrelated build policy already exists",
      );
    return;
  }
  await writeFile(file, current.trimEnd() + "\n" + policy);
}
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
  await configureBuildApproval(profile);
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
    throw new Error(
      "Native archive installation requires dependency-build approval. " +
        "For this disposable test only, set STUDIO_SMOKE_APPROVE_RUNTIME_BUILDS=1 " +
        "to approve the reviewed exact dependency versions. No source-link fallback was used.",
      { cause: error },
    );
  }
  const manifestPath = resolve(home, "profiles", profile, "package.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  for (const kind of kinds) {
    const bundle = kind === "design" ? "deepseek-idesign" : "deepseek-ivideo";
    const source = manifest.dependencies?.[bundle];
    if (typeof source !== "string" || !source.endsWith(".tgz"))
      throw Error(`Expected an installed tarball for ${bundle}`);
    const installed = JSON.parse(
      await readFile(
        resolve(
          home,
          "profiles",
          profile,
          "node_modules",
          bundle,
          "package.json",
        ),
        "utf8",
      ),
    );
    if (installed.name !== bundle || installed.version !== version)
      throw Error(`Unexpected installed package: ${bundle}`);
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
      const oldPage = await fetch(origin + "/ipollowork-" + kind + "/studio/", {
        headers: { cookie },
      });
      if (oldPage.status !== 404)
        throw Error("The old enclosing editor page must be removed");
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
    console.log(`Original ${name} archive authenticated editor smoke passed`);
    if (name === "combined" && process.env.KEEP_STUDIO === "1") {
      await writeFile(
        resolve(".runtime/original-preview.json"),
        JSON.stringify({ address, profile, home }),
      );
      await new Promise((resolve) => {
        const stop = () => {
          process.off("SIGINT", stop);
          process.off("SIGTERM", stop);
          resolve();
        };
        process.once("SIGINT", stop);
        process.once("SIGTERM", stop);
      });
    }
  } finally {
    if (child.exitCode === null) {
      const closed = new Promise((r) => child.once("exit", r));
      child.kill("SIGINT");
      await closed;
    }
  }
}
