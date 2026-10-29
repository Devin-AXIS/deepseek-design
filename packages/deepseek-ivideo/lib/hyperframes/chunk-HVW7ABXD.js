import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/telemetry/skill.ts
var SKILL_SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/;
function normalizeSkillSlug(raw) {
  if (typeof raw !== "string") return void 0;
  const slug = raw.trim();
  return SKILL_SLUG.test(slug) ? slug : void 0;
}

export {
  SKILL_SLUG,
  normalizeSkillSlug
};
