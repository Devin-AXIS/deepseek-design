import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/feedbackSource.ts
var FEEDBACK_EMAIL_ENV = "HYPERFRAMES_FEEDBACK_EMAIL";

// src/utils/dotEnv.ts
function valueOf(raw) {
  const quote = raw.charAt(0);
  if (quote === '"' || quote === "'") {
    const end = raw.indexOf(quote, 1);
    return end > 0 ? raw.slice(1, end) : raw.slice(1);
  }
  const comment = raw.match(/\s+#/);
  return comment?.index === void 0 ? raw : raw.slice(0, comment.index).trim();
}
function entryOf(rawLine) {
  let line = rawLine.trim();
  if (!line || line.startsWith("#")) return null;
  if (line.startsWith("export ")) line = line.slice(7).trim();
  const eq = line.indexOf("=");
  if (eq < 1) return null;
  return [line.slice(0, eq).trim(), valueOf(line.slice(eq + 1).trim())];
}
function applyDotEnv(content, env) {
  for (const entry of content.split("\n").map(entryOf)) {
    if (!entry) continue;
    const [key, value] = entry;
    if (key && key.toUpperCase() !== FEEDBACK_EMAIL_ENV && !(key in env)) env[key] = value;
  }
}

export {
  applyDotEnv
};
