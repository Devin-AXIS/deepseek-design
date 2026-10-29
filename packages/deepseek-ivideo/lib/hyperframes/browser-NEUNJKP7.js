import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  formatBytes
} from "./chunk-IHFUKJOR.js";
import {
  trackBrowserInstall
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  R,
  ft,
  ge,
  ye
} from "./chunk-WMQNIQDJ.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import {
  CACHE_DIR,
  clearBrowser,
  ensureBrowser,
  findBrowser,
  isLinuxArm,
  managedChromeVersion
} from "./chunk-GOPKWMQZ.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/browser.ts
var examples = [
  ["Find or download Chrome for rendering", "hyperframes browser ensure"],
  ["Purge a stale/partial download and re-download", "hyperframes browser ensure --force"],
  ["Print the Chrome executable path", "hyperframes browser path"],
  ["Remove cached Chrome download", "hyperframes browser clear"]
];
async function runEnsure(options) {
  ge(c.bold("hyperframes browser ensure"));
  if (isLinuxArm()) {
    const s2 = ft();
    s2.start("Linux ARM64 detected \u2014 looking for system Chromium...");
    const existing = await findBrowser();
    if (existing) {
      s2.stop(c.success("System Chromium found"));
      console.log();
      console.log(`   ${c.dim("Source:")}  ${c.bold(existing.source)}`);
      console.log(`   ${c.dim("Path:")}    ${c.bold(existing.executablePath)}`);
      console.log();
      ye(c.success("Ready to render."));
      return;
    }
    s2.stop(c.warn("No Chromium found \u2014 attempting auto-install via apt-get..."));
    console.log();
    try {
      const result2 = await ensureBrowser();
      console.log();
      console.log(`   ${c.dim("Source:")}  ${c.bold(result2.source)}`);
      console.log(`   ${c.dim("Path:")}    ${c.bold(result2.executablePath)}`);
      console.log();
      ye(c.success("Chromium ready. You can now render on ARM64."));
    } catch (err) {
      R.error(err instanceof Error ? err.message : String(err));
      ye(c.warn("Manual setup required (see instructions above)."));
      failCommand(1, err);
    }
    return;
  }
  const s = ft();
  if (!options?.force) {
    s.start("Looking for an existing browser...");
    let lastPct2 = -1;
    const existing = await ensureBrowser({
      preferManagedChrome: true,
      onProgress: (downloaded, total) => {
        if (total <= 0) return;
        const pct = Math.floor(downloaded / total * 100);
        if (pct > lastPct2) {
          lastPct2 = pct;
          s.message(
            `Downloading Chrome Headless Shell ${c.dim("v" + managedChromeVersion())} \u2014 ${c.progress(pct + "%")} ${c.dim("(" + formatBytes(downloaded) + " / " + formatBytes(total) + ")")}`
          );
        }
      }
    });
    if (existing.source === "download") trackBrowserInstall();
    s.stop(c.success(existing.source === "download" ? "Download complete" : "Browser found"));
    console.log();
    console.log(`   ${c.dim("Source:")}  ${c.bold(existing.source)}`);
    console.log(`   ${c.dim("Path:")}    ${c.bold(existing.executablePath)}`);
    console.log();
    ye(c.success("Ready to render."));
    return;
  }
  s.start("Re-downloading the managed browser...");
  const downloadSpinner = ft();
  downloadSpinner.start(
    `Downloading Chrome Headless Shell ${c.dim("v" + managedChromeVersion())}...`
  );
  let lastPct = -1;
  const result = await ensureBrowser({
    force: options?.force,
    onProgress: (downloaded, total) => {
      if (total <= 0) return;
      const pct = Math.floor(downloaded / total * 100);
      if (pct > lastPct) {
        lastPct = pct;
        downloadSpinner.message(
          `Downloading Chrome Headless Shell ${c.dim("v" + managedChromeVersion())} \u2014 ${c.progress(pct + "%")} ${c.dim("(" + formatBytes(downloaded) + " / " + formatBytes(total) + ")")}`
        );
      }
    }
  });
  downloadSpinner.stop(c.success("Download complete"));
  trackBrowserInstall();
  console.log();
  console.log(`   ${c.dim("Source:")}  ${c.bold(result.source)}`);
  console.log(`   ${c.dim("Path:")}    ${c.bold(result.executablePath)}`);
  console.log();
  ye(c.success("Ready to render."));
}
async function runPath() {
  const result = await findBrowser();
  if (!result) {
    try {
      const ensured = await ensureBrowser();
      process.stdout.write(ensured.executablePath + "\n");
    } catch (err) {
      console.error(err instanceof Error ? err.message : "Failed to find browser");
      failCommand(1, err);
    }
    return;
  }
  process.stdout.write(result.executablePath + "\n");
}
function runClear() {
  ge(c.bold("hyperframes browser clear"));
  const removed = clearBrowser();
  if (removed) {
    ye(c.success("Removed cached browser from ") + c.dim(CACHE_DIR));
  } else {
    ye(c.dim("No cached browser to remove."));
  }
}
var browser_default = defineCommand({
  meta: { name: "browser", description: "Manage the Chrome browser used for rendering" },
  args: {
    subcommand: {
      type: "positional",
      description: "ensure = find or download Chrome, path = print executable path, clear = remove cached download",
      required: false
    },
    force: {
      type: "boolean",
      description: "ensure only: purge any cached download (including a stale/partial one) and re-download from scratch",
      default: false
    }
  },
  async run({ args }) {
    const subcommand = args.subcommand;
    if (!subcommand || subcommand === "") {
      console.log(`
${c.bold("hyperframes browser")} ${c.dim("<subcommand>")}

Manage the Chrome browser used for rendering.

${c.bold("SUBCOMMANDS:")}
  ${c.accent("ensure")}   ${c.dim("Find or download Chrome for rendering")}
  ${c.accent("path")}     ${c.dim("Print browser executable path (for scripting)")}
  ${c.accent("clear")}    ${c.dim("Remove cached Chrome download")}

${c.bold("EXAMPLES:")}
  ${c.accent("npx hyperframes browser ensure")}           ${c.dim("Download Chrome if needed")}
  ${c.accent("npx hyperframes browser ensure --force")}   ${c.dim("Purge a stale/partial download and re-download")}
  ${c.accent("npx hyperframes browser path")}             ${c.dim("Print path for scripts")}
  ${c.accent("npx hyperframes browser clear")}            ${c.dim("Remove cached browser")}
`);
      return;
    }
    switch (subcommand) {
      case "ensure":
        return runEnsure({ force: args.force });
      case "path":
        return runPath();
      case "clear":
        return runClear();
      default:
        console.error(
          `${c.error("Unknown subcommand:")} ${subcommand}

Run ${c.accent("hyperframes browser --help")} for usage.`
        );
        failCommand(1, `Unknown subcommand: ${subcommand}`);
    }
  }
});
export {
  browser_default as default,
  examples
};
