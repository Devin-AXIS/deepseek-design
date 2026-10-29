import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  writeNewFileSync
} from "./chunk-4YYJOFKS.js";
import {
  normalizeSkillSlug
} from "./chunk-HVW7ABXD.js";
import {
  DEFAULT_REGISTRY_URL
} from "./chunk-JMNDOZF2.js";

// src/utils/projectConfig.ts
import { readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
var PROJECT_CONFIG_FILENAME = "hyperframes.json";
var PROJECT_CONFIG_SCHEMA_URL = "https://hyperframes.heygen.com/schema/hyperframes.json";
var DEFAULT_PROJECT_CONFIG = {
  $schema: PROJECT_CONFIG_SCHEMA_URL,
  registry: DEFAULT_REGISTRY_URL,
  paths: {
    blocks: "compositions",
    components: "compositions/components",
    assets: "assets"
  },
  media: {
    autoProxy: true
  }
};
function projectConfigPath(projectDir) {
  return join(resolve(projectDir), PROJECT_CONFIG_FILENAME);
}
function readProjectConfigWithStatus(projectDir) {
  const path = projectConfigPath(projectDir);
  let text;
  try {
    text = readFileSync(path, "utf-8");
  } catch (error) {
    return { status: isFileNotFound(error) ? "missing" : "unreadable" };
  }
  try {
    return { status: "ok", config: normalizeConfig(JSON.parse(text)) };
  } catch {
    return { status: "unreadable" };
  }
}
function readProjectConfig(projectDir) {
  return readProjectConfigWithStatus(projectDir).config;
}
function normalizeConfig(partial) {
  return {
    $schema: partial.$schema ?? DEFAULT_PROJECT_CONFIG.$schema,
    registry: partial.registry ?? DEFAULT_PROJECT_CONFIG.registry,
    paths: {
      blocks: partial.paths?.blocks ?? DEFAULT_PROJECT_CONFIG.paths.blocks,
      components: partial.paths?.components ?? DEFAULT_PROJECT_CONFIG.paths.components,
      assets: partial.paths?.assets ?? DEFAULT_PROJECT_CONFIG.paths.assets
    },
    media: {
      autoProxy: typeof partial.media?.autoProxy === "boolean" ? partial.media.autoProxy : DEFAULT_PROJECT_CONFIG.media?.autoProxy
    },
    // Slug-gate on read so a hand-edited or corrupt value never reaches the
    // telemetry stream; an invalid slug simply drops the attribution.
    authoringSkill: normalizeSkillSlug(partial.authoringSkill),
    // Whitelist rebuild - an omission here silently drops the manifest on
    // every config round-trip, which would read as "this project never
    // installed a catalog item".
    registryItems: normalizeRegistryItems(partial.registryItems)
  };
}
function normalizeRegistryItems(raw) {
  if (!Array.isArray(raw)) return void 0;
  const items = raw.filter(
    (entry) => isJsonObject(entry) && typeof entry.name === "string" && entry.name !== "" && typeof entry.type === "string" && typeof entry.target === "string"
  );
  return items.length > 0 ? items : void 0;
}
function writeProjectConfig(projectDir, config = DEFAULT_PROJECT_CONFIG) {
  const path = projectConfigPath(projectDir);
  writeFileSync(path, JSON.stringify(config, null, 2) + "\n", "utf-8");
}
function createProjectConfig(projectDir, config = DEFAULT_PROJECT_CONFIG) {
  writeNewFileSync(projectConfigPath(projectDir), JSON.stringify(config, null, 2) + "\n");
}
function loadProjectConfig(projectDir) {
  return readProjectConfig(projectDir) ?? DEFAULT_PROJECT_CONFIG;
}
function resolveAutoProxy(projectDir, flagValue) {
  if (typeof flagValue === "boolean") {
    return flagValue;
  }
  return loadProjectConfig(projectDir).media?.autoProxy ?? true;
}
function isJsonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFileNotFound(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
function seedProjectAuthoringSkill(projectDir, rawSkill) {
  const skill = normalizeSkillSlug(rawSkill);
  if (!skill) return;
  const path = projectConfigPath(projectDir);
  let text;
  try {
    text = readFileSync(path, "utf-8");
  } catch (error) {
    if (isFileNotFound(error)) {
      try {
        createProjectConfig(projectDir, { ...DEFAULT_PROJECT_CONFIG, authoringSkill: skill });
      } catch {
      }
    }
    return;
  }
  try {
    const parsed = JSON.parse(text);
    if (!isJsonObject(parsed)) return;
    if (normalizeSkillSlug(parsed.authoringSkill)) return;
    parsed.authoringSkill = skill;
    const indent = /\n([ \t]+)"/.exec(text)?.[1] ?? "  ";
    writeFileSync(path, JSON.stringify(parsed, null, indent) + "\n", "utf-8");
  } catch {
  }
}
function recordProjectRegistryItems(projectDir, items) {
  if (items.length === 0) return;
  const path = projectConfigPath(projectDir);
  let text;
  try {
    text = readFileSync(path, "utf-8");
  } catch {
    return;
  }
  try {
    const parsed = JSON.parse(text);
    if (!isJsonObject(parsed)) return;
    const existing = normalizeRegistryItems(parsed.registryItems) ?? [];
    const byName = new Map(existing.map((item) => [item.name, item]));
    for (const item of items) byName.set(item.name, item);
    const merged = [...byName.values()];
    const unchanged = merged.length === existing.length && merged.every((item, index) => {
      const prior = existing[index];
      return prior !== void 0 && prior.name === item.name && prior.type === item.type && prior.target === item.target;
    });
    if (unchanged) return;
    parsed.registryItems = merged;
    const indent = /\n([ \t]+)"/.exec(text)?.[1] ?? "  ";
    writeFileSync(path, JSON.stringify(parsed, null, indent) + "\n", "utf-8");
  } catch {
  }
}

export {
  PROJECT_CONFIG_FILENAME,
  DEFAULT_PROJECT_CONFIG,
  projectConfigPath,
  readProjectConfigWithStatus,
  readProjectConfig,
  normalizeConfig,
  writeProjectConfig,
  createProjectConfig,
  loadProjectConfig,
  resolveAutoProxy,
  seedProjectAuthoringSkill,
  recordProjectRegistryItems
};
