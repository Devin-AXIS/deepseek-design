import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import "./chunk-ECSNC34W.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import {
  injectDeterministicFontFaces
} from "./chunk-RLSKTKCG.js";
import "./chunk-TJSTGSAW.js";
import "./chunk-FI4I7CME.js";
import "./chunk-U3TI3AWM.js";
import "./chunk-BZ56MTDX.js";
import "./chunk-3NHZZLH3.js";
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
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  PRODUCER_VERSION,
  VERSION
} from "./chunk-MUINFURL.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-M2WBOQ2Q.js";

// src/fontLocalize.ts
function safeVersion(version) {
  return version.replace(/[^A-Za-z0-9.+-]/g, "") || "unknown";
}
function stampFontVersions(html, versions) {
  const tags = `<meta name="hyperframes-font-compiler-version" content="${safeVersion(versions.producer)}"><meta name="hyperframes-font-localizer-version" content="${safeVersion(versions.localizer)}">`;
  const headClose = html.search(/<\/head\s*>/i);
  if (headClose >= 0) return `${html.slice(0, headClose)}${tags}${html.slice(headClose)}`;
  const doctype = /^\s*<!doctype[^>]*>/i.exec(html);
  if (!doctype) return `${tags}${html}`;
  const insertAt = doctype.index + doctype[0].length;
  return `${html.slice(0, insertAt)}${tags}${html.slice(insertAt)}`;
}
function safeErrorName(error) {
  const name = error instanceof Error ? error.name : "UnknownError";
  return /^[A-Za-z][A-Za-z0-9]*$/.test(name) ? name : "Error";
}
var MAX_REPORTED_FAMILIES = 8;
var MAX_FAMILY_NAME_LENGTH = 64;
function unresolvedFamilyList(error) {
  if (!(error instanceof Error) || !("unresolvedFamilies" in error)) return [];
  const families = error.unresolvedFamilies;
  return Array.isArray(families) ? families : [];
}
function safeFamilyName(family) {
  if (typeof family !== "string" || /[:/?#&=%@\\]/.test(family)) return null;
  const safe = family.replace(/[^A-Za-z0-9 _-]+/g, " ").replace(/\s+/g, " ").trim().slice(0, MAX_FAMILY_NAME_LENGTH).trim();
  return safe || null;
}
function unresolvedFamiliesSuffix(error) {
  const families = unresolvedFamilyList(error);
  if (families.length === 0) return "";
  const printable = families.map(safeFamilyName).filter((name) => name !== null);
  const distinct = [...new Set(printable)];
  const shown = distinct.slice(0, MAX_REPORTED_FAMILIES);
  const hidden = families.length - printable.length + (distinct.length - shown.length);
  const listed = shown.map((name) => `"${name}"`).join(", ");
  const more = hidden > 0 ? `${listed ? " " : ""}(+${hidden} more)` : "";
  return `: unresolved font families: ${listed}${more}`;
}
async function runFontLocalize(io, localize) {
  const html = await io.readInput();
  if (!html.trim()) {
    io.writeError("font localization input is empty\n");
    return 2;
  }
  try {
    const localized = await localize(html);
    if (!localized.trim()) {
      io.writeError("font localization failed (Error): empty output\n");
      return 1;
    }
    io.writeOutput(localized);
    return 0;
  } catch (error) {
    io.writeError(
      `font localization failed (${safeErrorName(error)})${unresolvedFamiliesSuffix(error)}
`
    );
    return 1;
  }
}

// src/fontLocalizeCli.ts
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}
async function main() {
  return runFontLocalize(
    {
      readInput: readStdin,
      writeOutput: (value) => process.stdout.write(value),
      writeError: (value) => process.stderr.write(value)
    },
    async (html) => {
      const localized = await injectDeterministicFontFaces(html, {
        failClosedFontFetch: true,
        allowSystemFontCapture: false
      });
      return stampFontVersions(localized, {
        producer: PRODUCER_VERSION,
        localizer: VERSION
      });
    }
  );
}
export {
  main
};
