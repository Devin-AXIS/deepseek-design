import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  assetContentType,
  buildRangeResponse,
  injectRuntime,
  listenOnFreePort,
  resolvePlayerPath,
  resolveRuntimePath,
  revalidatedResponse
} from "./chunk-PFF75FSN.js";
import {
  openBrowser,
  parseRemoteDebuggingPort,
  validateRemoteDebuggingPortDeps
} from "./chunk-LFGJWOVA.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  injectMediaCodecMapIntoHtml,
  requestSubPath
} from "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import {
  PROXY_VARIANT_CONFIG,
  ProxyCapacityError,
  ProxyTranscodeError,
  decideMediaProxyEligibility,
  isProxyVariantRequest,
  probeAssetCodec,
  recordProxyRequest,
  resolveProxy,
  resolveProxyVariantRequest
} from "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import {
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  R,
  ft,
  ge
} from "./chunk-WMQNIQDJ.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/play.ts
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
var examples = [
  ["Play the current project", "hyperframes play"],
  ["Play a specific project directory", "hyperframes play ./my-video"],
  ["Use a custom port", "hyperframes play --port 8080"],
  ["Start without opening the browser", "hyperframes play --no-open"],
  ["Open with a specific browser", "hyperframes play --browser-path /usr/bin/chromium"],
  [
    "Open with CDP enabled (requires browser path + isolated profile)",
    "hyperframes play --browser-path /usr/bin/chromium --user-data-dir /tmp/hf-profile --remote-debugging-port 9222"
  ],
  [
    "Disable auto-proxying of browser-hostile video codecs (HEVC, ProRes, AV1)",
    "hyperframes play --no-proxy"
  ]
];
var play_default = defineCommand({
  meta: { name: "play", description: "Play a composition in a lightweight browser player" },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    port: { type: "string", description: "Port to run the player server on", default: "3003" },
    open: {
      type: "boolean",
      default: true,
      description: "Open browser automatically"
    },
    "browser-path": {
      type: "string",
      description: "Path to the browser executable to open"
    },
    "user-data-dir": {
      type: "string",
      description: "Chromium-compatible user data directory (requires --browser-path)"
    },
    "remote-debugging-port": {
      type: "string",
      description: "Chromium remote debugging port (requires --browser-path and --user-data-dir)"
    },
    proxy: {
      type: "boolean",
      description: "Auto-transcode browser-hostile video codecs (HEVC, ProRes, AV1) to a cached authoring proxy for preview (default: on; overrides hyperframes.json's media.autoProxy)",
      negativeDescription: "Disable auto-proxying of browser-hostile video codecs"
    }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const startPort = parseInt(args.port ?? "3003", 10);
    if (args["user-data-dir"] && !args["browser-path"]) {
      R.error("--user-data-dir requires --browser-path");
      setCommandExitCode(1);
      return;
    }
    const depsError = validateRemoteDebuggingPortDeps({
      browserPath: args["browser-path"],
      userDataDir: args["user-data-dir"],
      remoteDebuggingPort: args["remote-debugging-port"]
    });
    if (depsError) {
      R.error(depsError);
      setCommandExitCode(1);
      return;
    }
    let remoteDebuggingPort;
    try {
      remoteDebuggingPort = parseRemoteDebuggingPort(
        args["remote-debugging-port"]
      );
    } catch (err) {
      R.error(err.message);
      setCommandExitCode(1);
      return;
    }
    const runtimePath = resolveRuntimePath();
    if (!runtimePath) {
      R.error("HyperFrames runtime not found. Run `bun run build` first.");
      setCommandExitCode(1);
      return;
    }
    const playerPath = resolvePlayerPath();
    if (!playerPath) {
      R.error(
        "@hyperframes/player not found. Run `bun run --cwd packages/player build` first."
      );
      setCommandExitCode(1);
      return;
    }
    const { Hono } = await import("hono");
    const { createAdaptorServer } = await import("@hono/node-server");
    const app = new Hono();
    app.get(
      "/player.js",
      (ctx) => revalidatedResponse(
        readFileSync(playerPath, "utf-8"),
        "application/javascript",
        ctx.req.header("If-None-Match")
      )
    );
    app.get(
      "/runtime.js",
      (ctx) => revalidatedResponse(
        readFileSync(runtimePath, "utf-8"),
        "application/javascript",
        ctx.req.header("If-None-Match")
      )
    );
    const autoProxy = resolveAutoProxy(project.dir, args.proxy);
    await registerCompositionRoute(app, project, autoProxy);
    app.get("/", (ctx) => {
      return ctx.html(buildPlayerPage(project.name));
    });
    ge(c.bold("hyperframes play"));
    const s = ft();
    s.start("Starting player...");
    const server = createAdaptorServer({ fetch: app.fetch });
    const actualPort = await listenOnFreePort(server, startPort);
    const url = `http://localhost:${actualPort}`;
    s.stop(c.success("Player running"));
    console.log();
    if (actualPort !== startPort) {
      console.log(`  ${c.warn(`Port ${startPort} is in use, using ${actualPort} instead`)}`);
    }
    console.log(`  ${c.dim("Project")}   ${c.accent(project.name)}`);
    console.log(`  ${c.dim("Player")}    ${c.accent(url)}`);
    console.log();
    console.log(`  ${c.dim("Press Ctrl+C to stop")}`);
    console.log();
    if (args.open) {
      void openBrowser(url, {
        browserPath: args["browser-path"],
        userDataDir: args["user-data-dir"],
        remoteDebuggingPort
      });
    }
    return new Promise(() => {
    });
  }
});
async function registerCompositionRoute(app, project, autoProxy) {
  const { isSafePath } = await import("./studio-api-JQI7APNF.js");
  app.get("/composition/*", async (ctx) => {
    const reqPath = requestSubPath(ctx.req.url, "composition");
    const filePath = resolve(project.dir, reqPath);
    if (!isSafePath(project.dir, filePath)) return ctx.text("Forbidden", 403);
    if (!existsSync(filePath)) return ctx.text("Not found", 404);
    if (filePath.endsWith(".html")) {
      let html = injectRuntime(readFileSync(filePath, "utf-8"));
      if (autoProxy) {
        html = await injectMediaCodecMapIntoHtml(html, project.dir, [{ html, compSrcPath: reqPath }]);
      }
      return revalidatedResponse(html, "text/html; charset=UTF-8", ctx.req.header("If-None-Match"));
    }
    const contentType = assetContentType(filePath);
    const isText = contentType.startsWith("text/") || contentType === "application/json" || contentType === "image/svg+xml";
    if (isText && !ctx.req.header("Range")) {
      return revalidatedResponse(
        readFileSync(filePath, "utf-8"),
        contentType,
        ctx.req.header("If-None-Match")
      );
    }
    const proxyParam = ctx.req.query("hf-proxy");
    if (proxyParam !== void 0 && isProxyVariantRequest(proxyParam)) {
      if (!autoProxy || !contentType.startsWith("video/")) return ctx.text("Not found", 404);
      try {
        const facts = await probeAssetCodec(filePath);
        const eligibility = decideMediaProxyEligibility(facts);
        if (!eligibility.eligible) {
          return ctx.text(`Media proxy unavailable: ${eligibility.reason}`, 422);
        }
        if (!facts) return ctx.text("Media proxy unavailable: unknown_codec", 422);
        const proxyVariant = resolveProxyVariantRequest(proxyParam, facts);
        if (!proxyVariant) {
          return ctx.text("Media proxy variant does not match asset", 422);
        }
        recordProxyRequest();
        const proxyPath = await resolveProxy(project.dir, filePath, proxyVariant);
        return buildRangeResponse(
          proxyPath,
          PROXY_VARIANT_CONFIG[proxyVariant].contentType,
          ctx.req.header("Range"),
          ctx.req.header("If-None-Match")
        );
      } catch (err) {
        if (err instanceof ProxyCapacityError) {
          return ctx.text(`Proxy transcode deferred: ${err.message}`, 503, {
            "Retry-After": "1"
          });
        }
        if (err instanceof ProxyTranscodeError) {
          return ctx.text(`Proxy transcode failed: ${err.message}`, 502);
        }
        throw err;
      }
    }
    return buildRangeResponse(
      filePath,
      contentType,
      ctx.req.header("Range"),
      ctx.req.header("If-None-Match")
    );
  });
}
function buildPlayerPage(projectName) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} \u2014 HyperFrames Player</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        background: #0a0a0a; color: #fff;
        font-family: system-ui, -apple-system, sans-serif;
        height: 100vh; display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        padding: 24px;
      }
      .player-wrap {
        width: 100%; max-width: 1280px; aspect-ratio: 16/9;
        border-radius: 8px; overflow: hidden;
      }
      hyperframes-player { width: 100%; height: 100%; }
      .info {
        margin-top: 16px; font-size: 12px; color: #444;
        font-family: monospace;
      }
    </style>
  </head>
  <body>
    <div class="player-wrap">
      <hyperframes-player src="/composition/index.html" controls muted></hyperframes-player>
    </div>
    <div class="info">${projectName} \u2014 hyperframes play</div>
    <script src="/player.js"></script>
  </body>
</html>`;
}
export {
  play_default as default,
  examples,
  registerCompositionRoute
};
