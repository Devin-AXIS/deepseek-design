import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  formatLintStartupMessage
} from "./chunk-6CSYCFQV.js";
import {
  ProxyTranscodeError,
  TRANSCODE_TIMEOUT_MS,
  proxyVariantFor,
  resolveProxy,
  scanProjectMediaCodecMap,
  waitForProxy
} from "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import {
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import {
  ft,
  ge,
  q,
  ue
} from "./chunk-WMQNIQDJ.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import {
  definitiveEntryMismatchComposition,
  hasDefinitiveEntryMismatch
} from "./chunk-Q5X2B5WT.js";
import {
  lintProject
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import {
  cleanAssetUrl,
  isRemoteOrInlineUrl,
  resolveLocalAssetCandidates
} from "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import {
  CSS_URL_RE,
  isNonRelativeUrl,
  isPathInside,
  rewriteAssetPath
} from "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/publish.ts
import { join as join4, posix as posix2, relative as relative2, resolve as resolve4 } from "path";
import { existsSync as existsSync4 } from "fs";

// src/utils/publishProject.ts
import { basename, dirname as dirname2, join as join3, posix, relative, resolve as resolve2 } from "path";
import { existsSync as existsSync2, readdirSync, readFileSync as readFileSync2, statSync } from "fs";
import AdmZip from "adm-zip";
import ignore from "ignore";

// src/auth/errors.ts
var AuthError = class extends Error {
  code;
  hint;
  constructor(code, message, hint) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.hint = hint;
  }
};
var ErrNotConfigured = () => new AuthError(
  "NOT_CONFIGURED",
  "No HeyGen credentials found",
  "Run `hyperframes auth login` to sign in."
);
var ErrInvalidStore = (detail) => new AuthError(
  "INVALID_STORE",
  `Credential file is unreadable: ${detail}`,
  "Delete ~/.heygen/credentials and run `hyperframes auth login` to re-create it."
);
var ErrApi = (status, detail) => new AuthError("API_ERROR", `HeyGen API error (${status}): ${detail}`);
var ErrOAuthNotConfigured = () => new AuthError(
  "OAUTH_NOT_CONFIGURED",
  "OAuth client is not configured",
  "Set HYPERFRAMES_OAUTH_CLIENT_ID, or run `hyperframes auth login --api-key`."
);
var ErrRefreshFailed = (detail) => new AuthError(
  "REFRESH_FAILED",
  detail ? `Failed to refresh OAuth tokens: ${detail}` : "Failed to refresh OAuth tokens",
  "Run `hyperframes auth login` to re-authenticate."
);
var ErrLoginExpired = () => new AuthError(
  "LOGIN_EXPIRED",
  "Your HeyGen login expired",
  "Run `hyperframes auth login` to sign in again."
);
var ErrLoginChanged = () => new AuthError(
  "LOGIN_CHANGED",
  "Your HeyGen login changed while this command ran",
  "Run the command again."
);
function isAuthError(err) {
  return err instanceof AuthError;
}

// src/auth/scrub.ts
var HEYGEN_KEY = /\b(hg|sk)_[A-Za-z0-9_-]{4,}/g;
var HEADER_LINE = /(authorization|x-api-key)[ \t]*[:=][ \t]*[^\r\n]+/gi;
var JWT = /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
var SECRET_FIELDS = [
  "access_token",
  "refresh_token",
  "code_verifier",
  "client_secret",
  "id_token",
  "token",
  "code"
];
var FORM_FIELD = new RegExp(`\\b(${SECRET_FIELDS.join("|")})=[^&\\s"']+`, "gi");
var JSON_FIELD = new RegExp(`("(?:${SECRET_FIELDS.join("|")})"\\s*:\\s*)"[^"]*"`, "gi");
function scrubCredentials(s) {
  return s.replace(HEYGEN_KEY, "$1_<redacted>").replace(HEADER_LINE, "$1: <redacted>").replace(JWT, "<jwt-redacted>").replace(FORM_FIELD, "$1=<redacted>").replace(JSON_FIELD, '$1"<redacted>"');
}

// src/auth/client.ts
var HEYGEN_CLI_SOURCE_HEADER = "X-HeyGen-Source";
var HEYGEN_CLI_SOURCE = "cli";
var HEYGEN_CLIENT_SOURCE_HEADER = "X-HeyGen-Client-Source";
var HEYGEN_CLIENT_SOURCE = "hyperframes";
function buildAuthHeaders(credential) {
  if (credential.type === "oauth") {
    return {
      authorization: `Bearer ${credential.access_token}`,
      [HEYGEN_CLI_SOURCE_HEADER]: HEYGEN_CLI_SOURCE,
      [HEYGEN_CLIENT_SOURCE_HEADER]: HEYGEN_CLIENT_SOURCE
    };
  }
  return { "x-api-key": credential.key, [HEYGEN_CLIENT_SOURCE_HEADER]: HEYGEN_CLIENT_SOURCE };
}

// src/auth/store.ts
import { promises as fs } from "fs";
import { dirname } from "path";

// src/auth/paths.ts
import { homedir } from "os";
import { join } from "path";
var CREDENTIAL_FILENAME = "credentials";
function configDir() {
  const override = process.env["HEYGEN_CONFIG_DIR"];
  if (override && override.length > 0) return override;
  return join(homedir(), ".heygen");
}
function credentialPath() {
  return join(configDir(), CREDENTIAL_FILENAME);
}

// src/auth/store.ts
var FILE_MODE = 384;
var DIR_MODE = 448;
var UNKNOWN = /* @__PURE__ */ Symbol("hf.credentials.unknownFields");
var KNOWN_ROOT_KEYS = /* @__PURE__ */ new Set(["api_key", "oauth", "user"]);
var KNOWN_OAUTH_KEYS = /* @__PURE__ */ new Set([
  "access_token",
  "refresh_token",
  "expires_at",
  "scope",
  "token_type"
]);
var KNOWN_USER_KEYS = /* @__PURE__ */ new Set(["email", "first_name", "last_name", "username"]);
async function readStore(path = credentialPath()) {
  let raw;
  try {
    raw = await fs.readFile(path, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      return { credentials: {}, source: "absent" };
    }
    throw ErrInvalidStore(`unable to read ${path}: ${err.message}`);
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0) return { credentials: {}, source: "absent" };
  if (trimmed.startsWith("{")) {
    return { credentials: parseJsonStore(trimmed), source: "file_json" };
  }
  if (looksLikeApiKey(trimmed)) {
    return { credentials: { api_key: trimmed }, source: "file_legacy" };
  }
  throw ErrInvalidStore("file is not JSON and does not look like a plain API key");
}
async function writeStore(credentials, path = credentialPath()) {
  await ensureDir(dirname(path));
  const body = JSON.stringify(serializeCredentials(credentials), null, 2);
  const tmp = `${path}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, `${body}
`, { mode: FILE_MODE, encoding: "utf8" });
  await fs.chmod(tmp, FILE_MODE);
  await fs.rename(tmp, path);
}
async function ensureDir(dir) {
  try {
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) {
      throw ErrInvalidStore(`${dir} exists and is not a directory`);
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    await fs.mkdir(dir, { recursive: true, mode: DIR_MODE });
  }
  try {
    await fs.chmod(dir, DIR_MODE);
  } catch {
  }
}
function parseJsonStore(text) {
  const obj = parseJsonObject(text, "credential file root");
  const out = {};
  const apiKey = pickRequiredStringOrAbsent(obj, "api_key", "api_key");
  if (apiKey !== void 0) {
    if (!isHeaderSafe(apiKey)) {
      throw ErrInvalidStore("api_key must not contain control characters");
    }
    out.api_key = apiKey;
  }
  if (obj["oauth"] !== void 0 && obj["oauth"] !== null) {
    out.oauth = parseOAuth(obj["oauth"]);
  }
  if (obj["user"] !== void 0 && obj["user"] !== null) {
    out.user = parseUser(obj["user"]);
  }
  const unknownRoot = collectUnknown(obj, KNOWN_ROOT_KEYS);
  if (unknownRoot) out[UNKNOWN] = unknownRoot;
  return out;
}
var PICKERS = {
  header_safe: pickHeaderSafeString,
  non_empty: pickNonEmptyString
};
function assignOptionalStrings(out, obj, spec) {
  const target = out;
  for (const [field, picker] of spec) {
    const v = PICKERS[picker](obj, field);
    if (v) target[field] = v;
  }
}
var OAUTH_OPTIONAL = [
  ["refresh_token", "header_safe"],
  ["expires_at", "non_empty"],
  ["scope", "non_empty"],
  ["token_type", "non_empty"]
];
function parseOAuth(raw) {
  const obj = asJsonObject(raw, "oauth");
  const accessToken = pickHeaderSafeString(obj, "access_token");
  if (!accessToken) {
    throw ErrInvalidStore("oauth.access_token must be a non-empty string with no control chars");
  }
  const out = { access_token: accessToken };
  assignOptionalStrings(out, obj, OAUTH_OPTIONAL);
  const unknownOAuth = collectUnknown(obj, KNOWN_OAUTH_KEYS);
  if (unknownOAuth) out[UNKNOWN] = unknownOAuth;
  return out;
}
var USER_OPTIONAL = [
  ["email", "non_empty"],
  ["first_name", "non_empty"],
  ["last_name", "non_empty"],
  ["username", "non_empty"]
];
function parseUser(raw) {
  const obj = asJsonObject(raw, "user");
  const out = {};
  assignOptionalStrings(out, obj, USER_OPTIONAL);
  const unknownUser = collectUnknown(obj, KNOWN_USER_KEYS);
  if (unknownUser) out[UNKNOWN] = unknownUser;
  return out;
}
function asJsonObject(raw, label) {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw ErrInvalidStore(`${label} must be a JSON object`);
  }
  return raw;
}
function collectUnknown(obj, known) {
  let bag;
  for (const key of Object.keys(obj)) {
    if (known.has(key)) continue;
    (bag ??= {})[key] = obj[key];
  }
  return bag;
}
function parseJsonObject(text, label) {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    throw ErrInvalidStore(`invalid JSON: ${err.message}`);
  }
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    throw ErrInvalidStore(`${label} must be a JSON object`);
  }
  return raw;
}
function pickNonEmptyString(obj, key) {
  const v = obj[key];
  return typeof v === "string" && v.length > 0 ? v : void 0;
}
function pickHeaderSafeString(obj, key) {
  const v = pickNonEmptyString(obj, key);
  return v !== void 0 && isHeaderSafe(v) ? v : void 0;
}
function isHeaderSafe(s) {
  for (let i = 0; i < s.length; i++) {
    const c2 = s.charCodeAt(i);
    if (c2 < 32 || c2 === 127) return false;
  }
  return true;
}
function pickRequiredStringOrAbsent(obj, key, errorLabel) {
  const v = obj[key];
  if (v === void 0 || v === null) return void 0;
  if (typeof v !== "string" || v.length === 0) {
    throw ErrInvalidStore(`${errorLabel} must be a non-empty string`);
  }
  return v;
}
function serializeCredentials(c2) {
  const out = { ...c2[UNKNOWN] ?? {} };
  if (c2.api_key) out["api_key"] = c2.api_key;
  if (c2.oauth) out["oauth"] = serializeOAuth(c2.oauth);
  if (c2.user) {
    const user = serializeUser(c2.user);
    if (Object.keys(user).length > 0) out["user"] = user;
  }
  return out;
}
function serializeOAuth(o) {
  const oauth = { ...o[UNKNOWN] ?? {} };
  oauth["access_token"] = o.access_token;
  if (o.refresh_token) oauth["refresh_token"] = o.refresh_token;
  if (o.expires_at) oauth["expires_at"] = o.expires_at;
  if (o.scope) oauth["scope"] = o.scope;
  if (o.token_type) oauth["token_type"] = o.token_type;
  return oauth;
}
function serializeUser(u) {
  const user = { ...u[UNKNOWN] ?? {} };
  if (u.email) user["email"] = u.email;
  if (u.first_name) user["first_name"] = u.first_name;
  if (u.last_name) user["last_name"] = u.last_name;
  if (u.username) user["username"] = u.username;
  return user;
}
function looksLikeApiKey(s) {
  if (s.length < 8) return false;
  if (!isHeaderSafe(s)) return false;
  return /^[!-~]+$/.test(s);
}

// src/auth/resolver.ts
var EXPIRY_SKEW_MS = 60 * 1e3;
async function resolveCredential(opts = {}) {
  const now = (opts.now ?? (() => /* @__PURE__ */ new Date()))();
  const heygenEnv = process.env["HEYGEN_API_KEY"];
  if (heygenEnv && heygenEnv.length > 0) {
    if (!isHeaderSafe(heygenEnv)) {
      throw ErrInvalidStore("HEYGEN_API_KEY contains control characters");
    }
    return { type: "api_key", key: heygenEnv, source: "env" };
  }
  const hfEnv = process.env["HYPERFRAMES_API_KEY"];
  if (hfEnv && hfEnv.length > 0) {
    if (!isHeaderSafe(hfEnv)) {
      throw ErrInvalidStore("HYPERFRAMES_API_KEY contains control characters");
    }
    return { type: "api_key", key: hfEnv, source: "env_alias" };
  }
  const { credentials, source } = await readStore();
  if (source === "absent") throw ErrNotConfigured();
  const fileSource = source === "file_legacy" ? "file_legacy" : "file_json";
  const oauth = credentials.oauth ? pickOAuth(credentials.oauth, now, fileSource) : null;
  if (oauth) return oauth;
  if (credentials.api_key) {
    return { type: "api_key", key: credentials.api_key, source: fileSource };
  }
  throw credentials.oauth ? ErrLoginExpired() : ErrNotConfigured();
}
async function tryResolveCredential(opts = {}) {
  try {
    return await resolveCredential(opts);
  } catch (err) {
    if (isAuthError(err) && err.code === "NOT_CONFIGURED") {
      return null;
    }
    throw err;
  }
}
function pickOAuth(tokens, now, source) {
  const expiresAt = parseDate(tokens.expires_at);
  const expired = isTokenExpired(expiresAt, now);
  if (expired && !tokens.refresh_token) return null;
  const out = {
    type: "oauth",
    access_token: tokens.access_token,
    source,
    refreshable: expired && tokens.refresh_token !== void 0
  };
  if (tokens.refresh_token) out.refresh_token = tokens.refresh_token;
  if (expiresAt) out.expires_at = expiresAt;
  if (tokens.scope) out.scope = tokens.scope;
  return out;
}
function isTokenExpired(expiresAt, now) {
  return expiresAt !== void 0 && expiresAt.getTime() - EXPIRY_SKEW_MS < now.getTime();
}
function parseDate(s) {
  if (!s) return void 0;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? void 0 : d;
}

// src/auth/pkce.ts
import { createHash, randomBytes } from "crypto";

// src/auth/loopback.ts
import { timingSafeEqual } from "crypto";
import { createServer } from "http";

// src/auth/oauth.ts
var MIN_EXPIRES_IN_SECONDS = 30;
var DEFAULT_CLIENT_ID = "q2A2QRSke2LrFTPJhoDbHtXh";
var DEFAULT_TOKEN_URL = "https://api2.heygen.com/v1/oauth/token";
var MAX_DEVICE_FLOW_SECONDS = 30 * 60;
var MAX_DEVICE_RESPONSE_BYTES = 64 * 1024;
function tokenEndpoint() {
  return process.env["HYPERFRAMES_OAUTH_TOKEN_URL"] || DEFAULT_TOKEN_URL;
}
function resolveClientId() {
  const override = process.env["HYPERFRAMES_OAUTH_CLIENT_ID"];
  const id = override && override.length > 0 ? override : DEFAULT_CLIENT_ID;
  if (!id || id.length === 0) throw ErrOAuthNotConfigured();
  return id;
}
async function refreshTokens(refresh_token, opts = {}) {
  const clientId = resolveClientId();
  const fetchImpl = opts.fetchImpl ?? fetch;
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id: clientId
  });
  const res = await fetchImpl(tokenEndpoint(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json"
    },
    body: body.toString()
  });
  if (res.status === 400 || res.status === 401) {
    throw ErrRefreshFailed(await safeText(res));
  }
  if (!res.ok) {
    throw ErrApi(res.status, await safeText(res) || res.statusText);
  }
  const payload = await readJsonOrThrow(res);
  const tokens = parseTokenResponse(payload);
  await persistOAuth(tokens, { refreshed: refresh_token });
  return tokens;
}
function parseTokenResponse(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw ErrRefreshFailed("token endpoint returned a non-object payload");
  }
  const obj = payload;
  const accessToken = stringField(obj, "access_token");
  if (!accessToken) {
    throw ErrRefreshFailed("token endpoint did not return an access_token");
  }
  if (!isHeaderSafe(accessToken)) {
    throw ErrRefreshFailed("access_token contains control characters");
  }
  const out = { access_token: accessToken };
  const refreshToken = stringField(obj, "refresh_token");
  if (refreshToken) {
    if (!isHeaderSafe(refreshToken)) {
      throw ErrRefreshFailed("refresh_token contains control characters");
    }
    out.refresh_token = refreshToken;
  }
  const tokenType = stringField(obj, "token_type");
  if (tokenType) out.token_type = tokenType;
  const scope = stringField(obj, "scope");
  if (scope) out.scope = scope;
  const expiresIn = numericField(obj, "expires_in");
  if (expiresIn !== void 0) {
    const clamped = Math.max(expiresIn, MIN_EXPIRES_IN_SECONDS);
    out.expires_at = new Date(Date.now() + clamped * 1e3).toISOString();
  }
  return out;
}
function stringField(obj, key) {
  const v = obj[key];
  return typeof v === "string" && v.length > 0 ? v : void 0;
}
function numericField(obj, key) {
  const v = obj[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : void 0;
  }
  return void 0;
}
async function persistOAuth(tokens, opts = {}) {
  let existing = {};
  try {
    const { credentials } = await readStore();
    existing = credentials;
  } catch (err) {
    if (opts.refreshed !== void 0) throw err;
  }
  if (opts.refreshed !== void 0 && existing.oauth?.refresh_token !== opts.refreshed) {
    throw ErrLoginChanged();
  }
  const oauth = opts.refreshed !== void 0 ? { ...existing.oauth, ...tokens } : { ...tokens };
  await writeStore({ ...existing, oauth });
}
async function readJsonOrThrow(res) {
  try {
    return await res.json();
  } catch (err) {
    throw ErrApi(res.status, `non-JSON body: ${err.message}`);
  }
}
async function safeText(res) {
  try {
    return scrubCredentials((await res.text()).slice(0, 500));
  } catch {
    return "";
  }
}

// src/cloud/auth.ts
async function refreshIfNeeded(credential) {
  if (credential.type !== "oauth") return credential;
  if (!credential.refreshable || !credential.refresh_token) return credential;
  const fresh = await refreshTokens(credential.refresh_token);
  return {
    ...credential,
    access_token: fresh.access_token,
    expires_at: parseDateOrUndef(fresh.expires_at),
    refreshable: false,
    ...fresh.refresh_token ? { refresh_token: fresh.refresh_token } : {}
  };
}
function parseDateOrUndef(value) {
  if (!value) return void 0;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? void 0 : d;
}

// src/utils/projectLink.ts
import { randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir as homedir2 } from "os";
import { join as join2, resolve } from "path";
var CONFIG_DIR = join2(homedir2(), ".hyperframes");
var PROJECTS_FILE = join2(CONFIG_DIR, "projects.json");
function readJsonRecord(path) {
  try {
    if (!existsSync(path)) return null;
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}
function isProjectLink(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const link = value;
  return typeof link.projectId === "string" && link.projectId.length > 0 && typeof link.url === "string";
}
function readProjectLinks() {
  const record = readJsonRecord(PROJECTS_FILE);
  if (!record) return {};
  const links = {};
  for (const [path, value] of Object.entries(record)) {
    if (isProjectLink(value)) {
      links[path] = { projectId: value.projectId, url: value.url };
    }
  }
  return links;
}
function writeProjectLinks(links) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
    writeFileSync(PROJECTS_FILE, `${JSON.stringify(links, null, 2)}
`, { mode: 384 });
  } catch {
  }
}
function readProjectLink(absDir) {
  return readProjectLinks()[resolve(absDir)] ?? null;
}
function writeProjectLink(absDir, link) {
  const links = readProjectLinks();
  links[resolve(absDir)] = { projectId: link.projectId, url: link.url };
  writeProjectLinks(links);
}
function ensureProjectId(absDir) {
  const links = readProjectLinks();
  const path = resolve(absDir);
  const existing = links[path];
  if (existing) return existing.projectId;
  const projectId = randomUUID();
  links[path] = { projectId, url: "" };
  writeProjectLinks(links);
  return projectId;
}
var TEAM_PROJECT_DIR = ".hyperframes";
var TEAM_PROJECT_FILE = "project.json";
function teamProjectPath(projectDir) {
  return join2(resolve(projectDir), TEAM_PROJECT_DIR, TEAM_PROJECT_FILE);
}
function readTeamProject(projectDir) {
  const record = readJsonRecord(teamProjectPath(projectDir));
  if (!record || typeof record.projectId !== "string" || record.projectId.length === 0) return null;
  const spaceId = typeof record.spaceId === "string" && record.spaceId.length > 0 ? record.spaceId : void 0;
  return { projectId: record.projectId, ...spaceId ? { spaceId } : {} };
}
function writeTeamProject(projectDir, team) {
  const file = teamProjectPath(projectDir);
  const body = {
    projectId: team.projectId,
    ...team.spaceId ? { spaceId: team.spaceId } : {}
  };
  mkdirSync(join2(resolve(projectDir), TEAM_PROJECT_DIR), { recursive: true });
  writeFileSync(file, `${JSON.stringify(body, null, 2)}
`);
  return file;
}

// src/utils/publishProject.ts
var IGNORED_DIRS = /* @__PURE__ */ new Set([".git", "node_modules", "dist", ".next", "coverage"]);
var IGNORED_FILES = /* @__PURE__ */ new Set([".DS_Store", "Thumbs.db"]);
var HYPERFRAMES_IGNORE_FILE = ".hyperframesignore";
var DEFAULT_PROJECT_IGNORE = ["/renders/", "/snapshots/", ".*"];
var PUBLISH_CONTENT_TYPE = "application/zip";
var PUBLISH_METADATA_TIMEOUT_MS = 3e4;
var PUBLISH_UPLOAD_MIN_TIMEOUT_MS = 12e4;
var PUBLISH_TRANSPORT_ATTEMPTS = 2;
var PUBLISH_RETRY_DELAY_MS = 200;
var PUBLISH_UPLOAD_BYTES_PER_SECOND = 5e5;
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function dataRecord(payload) {
  if (!isRecord(payload) || !isRecord(payload["data"])) return null;
  return payload["data"];
}
function stringField2(record, key) {
  const value = record[key];
  return typeof value === "string" ? value : null;
}
function parsePublishedProjectResponse(payload) {
  const data = dataRecord(payload);
  if (!data) return null;
  const projectId = stringField2(data, "project_id");
  const title = stringField2(data, "title");
  const url = stringField2(data, "url");
  const claimToken = stringField2(data, "claim_token") ?? "";
  const claimed = data["claimed"] === true;
  const fileCount = data["file_count"];
  if (!projectId || !title || !url || typeof fileCount !== "number") {
    return null;
  }
  if (!claimed && !claimToken) {
    return null;
  }
  return {
    projectId,
    title,
    fileCount,
    url,
    claimToken,
    claimed
  };
}
function parseStagedUploadResponse(payload, archiveByteLength) {
  const data = dataRecord(payload);
  if (!data) return null;
  const uploadUrl = stringField2(data, "upload_url");
  const uploadKey = stringField2(data, "upload_key");
  const contentType = stringField2(data, "content_type") || PUBLISH_CONTENT_TYPE;
  if (!uploadUrl || !uploadKey) return null;
  const rawExpires = data["expires_in_seconds"];
  const expiresInSeconds = typeof rawExpires === "number" && rawExpires > 0 ? rawExpires : 1800;
  return {
    uploadUrl,
    uploadKey,
    contentType,
    uploadHeaders: getUploadHeaders(data, uploadUrl, contentType, archiveByteLength),
    expiresInSeconds
  };
}
function getUploadHeaders(data, uploadUrl, contentType, archiveByteLength) {
  const headers = {};
  const uploadHeaders = data["upload_headers"];
  if (isRecord(uploadHeaders)) {
    for (const [key, value] of Object.entries(uploadHeaders)) {
      if (typeof value === "string" && key.trim()) {
        headers[key] = value;
      }
    }
  }
  if (!Object.keys(headers).some((key) => key.toLowerCase() === "content-type")) {
    headers["content-type"] = contentType;
  }
  const signedHeaders = new URL(uploadUrl).searchParams.get("X-Amz-SignedHeaders");
  if (signedHeaders?.split(";").includes("x-amz-server-side-encryption") && !Object.keys(headers).some((key) => key.toLowerCase() === "x-amz-server-side-encryption")) {
    headers["x-amz-server-side-encryption"] = "AES256";
  }
  if (signedHeaders?.split(";").includes("content-length") && !Object.keys(headers).some((key) => key.toLowerCase() === "content-length")) {
    headers["content-length"] = String(archiveByteLength);
  }
  return headers;
}
async function readJson(response) {
  return response.clone().json().catch(() => null);
}
var CredentialRejectedError = class extends Error {
};
async function metadataRequestError(response, fallback) {
  const message = await readErrorMessage(response, fallback);
  return response.status === 401 ? new CredentialRejectedError(message) : new Error(message);
}
var LOGIN_EXPIRED = "Your login expired. Run hyperframes auth login, then publish again.";
var LOGIN_CHANGED = "Your login changed during publish. Run publish again.";
var API_KEY_ENV_VAR = { env: "HEYGEN_API_KEY", env_alias: "HYPERFRAMES_API_KEY" };
function rejectedCredentialMessage(credential) {
  if (credential.type === "api_key" && (credential.source === "env" || credential.source === "env_alias")) {
    return `${API_KEY_ENV_VAR[credential.source]} was rejected. Fix or unset it, then publish again.`;
  }
  return LOGIN_EXPIRED;
}
async function resolvePublishCredential(checked) {
  try {
    const credential = checked === void 0 ? await tryResolveCredential() : checked;
    if (!credential) return null;
    const expired = credential.type === "oauth" && isTokenExpired(credential.expires_at, /* @__PURE__ */ new Date());
    if (expired && !credential.refresh_token) throw new Error(LOGIN_EXPIRED);
    return await refreshIfNeeded(expired ? { ...credential, refreshable: true } : credential);
  } catch (error) {
    if (isAuthError(error) && (error.code === "REFRESH_FAILED" || error.code === "LOGIN_EXPIRED")) {
      throw new Error(LOGIN_EXPIRED);
    }
    if (isAuthError(error) && error.code === "LOGIN_CHANGED") throw new Error(LOGIN_CHANGED);
    throw error;
  }
}
async function readErrorMessage(response, fallback) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const payload = await readJson(response);
    if (isRecord(payload) && typeof payload["message"] === "string") {
      return payload["message"];
    }
  }
  if (response.status === 403 && response.headers.get("cf-mitigated") === "challenge") {
    return "Publish upload was blocked before reaching HyperFrames. Please retry after staged uploads are available.";
  }
  const text = await response.text().catch(() => "");
  return text.trim() ? `${fallback}: ${text.trim().slice(0, 180)}` : fallback;
}
function systemErrorMetadata(value) {
  if (!isRecord(value)) return [];
  const metadata = [];
  if (typeof value["code"] === "string") metadata.push(value["code"]);
  if (typeof value["syscall"] === "string") metadata.push(`syscall=${value["syscall"]}`);
  if (typeof value["errno"] === "string" || typeof value["errno"] === "number") {
    metadata.push(`errno=${value["errno"]}`);
  }
  return metadata;
}
function redactUrlQuery(message) {
  return message.replace(/(https?:\/\/[^\s?]+)\?[^\s]+/gu, "$1?[redacted]");
}
function proxySupportHint() {
  const proxyConfigured = ["HTTPS_PROXY", "HTTP_PROXY", "https_proxy", "http_proxy"].some(
    (key) => Boolean(process.env[key]?.trim())
  );
  const proxyEnabled = process.env["NODE_USE_ENV_PROXY"] === "1" || process.execArgv.includes("--use-env-proxy") || process.env["NODE_OPTIONS"]?.split(/\s+/u).includes("--use-env-proxy") === true;
  if (!proxyConfigured || proxyEnabled) return "";
  return ". Proxy variables are set but ignored by Node fetch; if this network requires them, retry with NODE_USE_ENV_PROXY=1 (Node 22.21+)";
}
function describeFetchFailure(error) {
  const message = error instanceof Error ? error.message : String(error);
  const cause = error instanceof Error ? error.cause : void 0;
  const causeMessage = cause instanceof Error ? cause.message : "";
  const metadata = [...systemErrorMetadata(cause), ...systemErrorMetadata(error)].filter(
    (value, index, all) => all.indexOf(value) === index
  );
  const distinctCauseMessage = causeMessage && causeMessage !== message ? causeMessage : "";
  const detail = [metadata.join(", "), distinctCauseMessage].filter(Boolean).join(": ");
  return `${redactUrlQuery(message)}${detail ? ` (${redactUrlQuery(detail)})` : ""}${proxySupportHint()}`;
}
function isRequestTimeout(error) {
  return error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError");
}
function waitBeforePublishRetry() {
  return new Promise((resolve5) => setTimeout(resolve5, PUBLISH_RETRY_DELAY_MS));
}
async function fetchForPublish(input, createInit, failureStage, attempts = 1) {
  if (attempts < 1) throw new RangeError("Publish fetch attempts must be at least 1");
  let lastError;
  let attemptsMade = 0;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    attemptsMade = attempt;
    try {
      return await fetch(input, createInit());
    } catch (error) {
      lastError = error;
      if (isRequestTimeout(error) || attempt === attempts) break;
      await waitBeforePublishRetry();
    }
  }
  const attemptDetail = attemptsMade > 1 ? ` after ${attemptsMade} attempts` : "";
  throw new Error(`${failureStage}${attemptDetail}: ${describeFetchFailure(lastError)}`, {
    cause: lastError instanceof Error ? lastError : void 0
  });
}
function uploadTimeoutMs(byteLength) {
  return Math.max(
    PUBLISH_UPLOAD_MIN_TIMEOUT_MS,
    Math.ceil(byteLength / PUBLISH_UPLOAD_BYTES_PER_SECOND * 1e3)
  );
}
function shouldIgnoreSegment(segment) {
  return IGNORED_DIRS.has(segment) || IGNORED_FILES.has(segment);
}
function createProjectIgnore(rootDir) {
  const matcher = ignore().add(DEFAULT_PROJECT_IGNORE);
  const ignorePath = join3(rootDir, HYPERFRAMES_IGNORE_FILE);
  if (existsSync2(ignorePath)) {
    matcher.add(readFileSync2(ignorePath, "utf-8"));
  }
  return matcher;
}
function collectProjectFiles(rootDir, currentDir, paths, matcher) {
  for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
    if (shouldIgnoreSegment(entry.name)) continue;
    const absolutePath = join3(currentDir, entry.name);
    const relativePath = relative(rootDir, absolutePath).replaceAll("\\", "/");
    if (!relativePath) continue;
    if (entry.isDirectory()) {
      if (matcher.ignores(`${relativePath}/`)) continue;
      collectProjectFiles(rootDir, absolutePath, paths, matcher);
      continue;
    }
    if (!statSync(absolutePath).isFile()) continue;
    if (matcher.ignores(relativePath)) continue;
    paths.push(relativePath);
  }
}
var EXT_ASSETS_PREFIX = "_ext";
function addExternalAsset(ctx, absPath) {
  const existing = ctx.externalMap.get(absPath);
  if (existing) return existing;
  const rel = relative(ctx.absProjectDir, absPath).replaceAll("\\", "/");
  const stripped = rel.replace(/^(?:\.\.\/)+/, "");
  let archivePath = `${EXT_ASSETS_PREFIX}/${stripped}`;
  if (ctx.usedArchivePaths.has(archivePath)) {
    const ext = posix.extname(archivePath);
    const base = archivePath.slice(0, archivePath.length - ext.length);
    let i = 2;
    while (ctx.usedArchivePaths.has(`${base}_${i}${ext}`)) i++;
    archivePath = `${base}_${i}${ext}`;
  }
  ctx.fileContents.set(archivePath, readFileSync2(absPath));
  ctx.externalMap.set(absPath, archivePath);
  ctx.usedArchivePaths.add(archivePath);
  return archivePath;
}
function tryResolveExternal(ctx, rawPath, referrerAbsDir) {
  if (isNonRelativeUrl(rawPath)) return null;
  const absPath = resolve2(referrerAbsDir, rawPath);
  if (isPathInside(absPath, ctx.absProjectDir)) return null;
  try {
    if (!existsSync2(absPath) || !statSync(absPath).isFile()) return null;
  } catch {
    return null;
  }
  return addExternalAsset(ctx, absPath);
}
function rewriteCssUrls(ctx, css, referrerAbsDir, entryPath) {
  let modified = false;
  const rewritten = css.replace(CSS_URL_RE, (full, quote, rawUrl) => {
    const archivePath = tryResolveExternal(ctx, (rawUrl || "").trim(), referrerAbsDir);
    if (!archivePath) return full;
    modified = true;
    return `url(${quote || ""}${posix.relative(posix.dirname(entryPath), archivePath)}${quote || ""})`;
  });
  return { css: rewritten, modified };
}
function rewriteHtmlAttributes(document, referrerAbsDir, entryPath, resolveTarget, options = {}) {
  const attrs = options.attrs ?? ["src", "href"];
  const selector = options.selector ?? attrs.map((attr) => `[${attr}]`).join(", ");
  let modified = false;
  for (const el of document.querySelectorAll(selector)) {
    for (const attr of attrs) {
      const val = (el.getAttribute(attr) || "").trim();
      if (!val) continue;
      const archivePath = resolveTarget(val, referrerAbsDir);
      if (!archivePath) continue;
      el.setAttribute(attr, posix.relative(posix.dirname(entryPath), archivePath));
      modified = true;
    }
  }
  return modified;
}
function rewriteStyleBlocks(ctx, document, referrerAbsDir, entryPath) {
  let modified = false;
  for (const styleEl of document.querySelectorAll("style")) {
    const css = styleEl.textContent || "";
    if (!css.includes("url(")) continue;
    const result = rewriteCssUrls(ctx, css, referrerAbsDir, entryPath);
    if (result.modified) {
      styleEl.textContent = result.css;
      modified = true;
    }
  }
  for (const el of document.querySelectorAll("[style]")) {
    const style = el.getAttribute("style") || "";
    if (!style.includes("url(")) continue;
    const result = rewriteCssUrls(ctx, style, referrerAbsDir, entryPath);
    if (result.modified) {
      el.setAttribute("style", result.css);
      modified = true;
    }
  }
  return modified;
}
function localizeHtmlEntry(ctx, entryPath, content) {
  const referrerAbsDir = resolve2(ctx.absProjectDir, dirname2(entryPath));
  const { document } = parseHTML(content.toString("utf-8"));
  const attrsChanged = rewriteHtmlAttributes(
    document,
    referrerAbsDir,
    entryPath,
    (val, dir) => tryResolveExternal(ctx, val, dir)
  );
  const stylesChanged = rewriteStyleBlocks(ctx, document, referrerAbsDir, entryPath);
  if (attrsChanged || stylesChanged) {
    ctx.fileContents.set(entryPath, Buffer.from(document.toString(), "utf-8"));
  }
}
function localizeCssEntry(ctx, entryPath, content) {
  const referrerAbsDir = resolve2(ctx.absProjectDir, dirname2(entryPath));
  const css = content.toString("utf-8");
  if (!css.includes("url(")) return;
  const result = rewriteCssUrls(ctx, css, referrerAbsDir, entryPath);
  if (result.modified) {
    ctx.fileContents.set(entryPath, Buffer.from(result.css, "utf-8"));
  }
}
function localizeExternalAssets(absProjectDir, fileContents) {
  const ctx = {
    absProjectDir,
    fileContents,
    externalMap: /* @__PURE__ */ new Map(),
    usedArchivePaths: /* @__PURE__ */ new Set()
  };
  for (const [entryPath, content] of [...fileContents.entries()]) {
    if (entryPath.startsWith(EXT_ASSETS_PREFIX + "/")) continue;
    if (entryPath.endsWith(".html") || entryPath.endsWith(".htm")) {
      localizeHtmlEntry(ctx, entryPath, content);
    } else if (entryPath.endsWith(".css")) {
      localizeCssEntry(ctx, entryPath, content);
    }
  }
  return ctx.externalMap.size;
}
function buildPublishFileMap(projectDir) {
  const absProjectDir = resolve2(projectDir);
  const filePaths = [];
  collectProjectFiles(absProjectDir, absProjectDir, filePaths, createProjectIgnore(absProjectDir));
  if (!filePaths.includes("index.html")) {
    throw new Error(
      "Project archive must include index.html at the root. Check that .hyperframesignore does not exclude it."
    );
  }
  const fileContents = /* @__PURE__ */ new Map();
  for (const filePath of filePaths) {
    fileContents.set(filePath, readFileSync2(join3(absProjectDir, filePath)));
  }
  localizeExternalAssets(absProjectDir, fileContents);
  return fileContents;
}
var ARCHIVE_ENTRY_TIME = new Date(1980, 0, 1, 0, 0, 0, 0);
function zipPublishFileMap(fileContents) {
  const archive = new AdmZip();
  for (const [filePath, content] of fileContents) {
    archive.addFile(filePath, content);
  }
  for (const entry of archive.getEntries()) {
    entry.header.time = ARCHIVE_ENTRY_TIME;
  }
  return {
    buffer: archive.toBuffer(),
    fileCount: fileContents.size
  };
}
function createPublishArchive(projectDir) {
  return zipPublishFileMap(buildPublishFileMap(projectDir));
}
function getPublishApiBaseUrl() {
  return (process.env["HYPERFRAMES_PUBLISHED_PROJECTS_API_URL"] || process.env["HEYGEN_API_URL"] || "https://api2.heygen.com").replace(/\/$/, "");
}
function archiveArrayBuffer(archive) {
  const arrayBuffer = new ArrayBuffer(archive.buffer.byteLength);
  new Uint8Array(arrayBuffer).set(archive.buffer);
  return arrayBuffer;
}
async function publishProjectArchiveDirect(apiBaseUrl2, title, archive, isPublic, authHeaders, projectId) {
  const body = new FormData();
  body.set("title", title);
  if (isPublic) body.set("is_public", "true");
  if (projectId) body.set("project_id", projectId);
  body.set(
    "file",
    new File([archiveArrayBuffer(archive)], `${title}.zip`, { type: PUBLISH_CONTENT_TYPE })
  );
  const headers = { ...authHeaders };
  const response = await fetchForPublish(
    `${apiBaseUrl2}/v1/hyperframes/projects/publish`,
    () => ({
      method: "POST",
      body,
      headers,
      signal: AbortSignal.timeout(uploadTimeoutMs(archive.buffer.byteLength))
    }),
    "Failed to publish project"
  );
  const payload = await readJson(response);
  const publishedProject = parsePublishedProjectResponse(payload);
  if (!response.ok || !publishedProject) {
    throw await metadataRequestError(response, "Failed to publish project");
  }
  return publishedProject;
}
async function uploadArchiveToPresignedUrl(stagedUpload, archive) {
  const presignedUrlTtlMs = stagedUpload.expiresInSeconds * 1e3 - PUBLISH_METADATA_TIMEOUT_MS;
  const s3Response = await fetchForPublish(
    stagedUpload.uploadUrl,
    () => ({
      method: "PUT",
      body: new Blob([archiveArrayBuffer(archive)], { type: stagedUpload.contentType }),
      headers: stagedUpload.uploadHeaders,
      signal: AbortSignal.timeout(
        Math.min(uploadTimeoutMs(archive.buffer.byteLength), presignedUrlTtlMs)
      )
    }),
    "Failed to upload project archive",
    PUBLISH_TRANSPORT_ATTEMPTS
  );
  if (!s3Response.ok) {
    throw new Error(await readErrorMessage(s3Response, "Failed to upload project archive"));
  }
}
async function publishProjectArchiveStaged(apiBaseUrl2, title, archive, isPublic, authHeaders, projectId) {
  const fileName = `${title}.zip`;
  const uploadResponse = await fetchForPublish(
    `${apiBaseUrl2}/v1/hyperframes/projects/publish/upload`,
    () => ({
      method: "POST",
      body: JSON.stringify({
        file_name: fileName,
        content_type: PUBLISH_CONTENT_TYPE,
        content_length: archive.buffer.byteLength
      }),
      headers: {
        ...authHeaders,
        "content-type": "application/json"
      },
      signal: AbortSignal.timeout(PUBLISH_METADATA_TIMEOUT_MS)
    }),
    "Failed to prepare project upload",
    PUBLISH_TRANSPORT_ATTEMPTS
  );
  if (uploadResponse.status === 404 || uploadResponse.status === 405) {
    return null;
  }
  const uploadPayload = await readJson(uploadResponse);
  const stagedUpload = parseStagedUploadResponse(uploadPayload, archive.buffer.byteLength);
  if (!uploadResponse.ok || !stagedUpload) {
    throw await metadataRequestError(uploadResponse, "Failed to prepare project upload");
  }
  await uploadArchiveToPresignedUrl(stagedUpload, archive);
  const completeResponse = await fetchForPublish(
    `${apiBaseUrl2}/v1/hyperframes/projects/publish/complete`,
    () => ({
      method: "POST",
      body: JSON.stringify({
        upload_key: stagedUpload.uploadKey,
        file_name: fileName,
        title,
        ...isPublic ? { is_public: true } : {},
        ...projectId ? { project_id: projectId } : {}
      }),
      headers: {
        ...authHeaders,
        "content-type": "application/json"
      },
      signal: AbortSignal.timeout(uploadTimeoutMs(archive.buffer.byteLength))
    }),
    "Failed to finalize project publish"
  );
  const completePayload = await readJson(completeResponse);
  const publishedProject = parsePublishedProjectResponse(completePayload);
  if (!completeResponse.ok || !publishedProject) {
    throw await metadataRequestError(completeResponse, "Failed to publish project");
  }
  return publishedProject;
}
async function publishProjectArchive(projectDir, opts = {}) {
  const isPublic = opts.public === true;
  const title = basename(projectDir);
  const archive = opts.archive ?? createPublishArchive(projectDir);
  const apiBaseUrl2 = getPublishApiBaseUrl();
  const credential = await resolvePublishCredential(opts.credential);
  const authHeaders = credential ? buildAuthHeaders(credential) : {};
  const projectId = credential ? opts.projectId : void 0;
  const spaceId = credential ? opts.spaceId : void 0;
  const metadataHeaders = spaceId ? { ...authHeaders, "x-space-id": spaceId } : authHeaders;
  let result;
  try {
    result = await publishProjectArchiveStaged(
      apiBaseUrl2,
      title,
      archive,
      isPublic,
      metadataHeaders,
      projectId
    ) ?? await publishProjectArchiveDirect(
      apiBaseUrl2,
      title,
      archive,
      isPublic,
      metadataHeaders,
      projectId
    );
    if (credential?.type === "oauth" && !result.claimed) {
      throw new CredentialRejectedError("unclaimed publish");
    }
  } catch (error) {
    if (error instanceof CredentialRejectedError && credential) {
      throw new Error(rejectedCredentialMessage(credential));
    }
    throw error;
  }
  if (result.claimed) {
    writeProjectLink(projectDir, { projectId: result.projectId, url: result.url });
  }
  return result;
}

// src/utils/publishProxyBake.ts
import { existsSync as existsSync3 } from "fs";
import { readFile } from "fs/promises";
import { basename as basename2, dirname as dirname3, resolve as resolve3 } from "path";
var PROXY_ARCHIVE_PREFIX = "_proxy";
var ProxyBakeError = class extends Error {
  manifest;
  constructor(manifest) {
    const summary = manifest.failed.map((entry) => `${entry.path}: ${entry.error}`).join("; ");
    super(`Unable to bake required browser media proxies (${summary})`);
    this.name = "ProxyBakeError";
    this.manifest = manifest;
  }
};
function emptyManifest() {
  return { proxied: [], skippedAlpha: [], failed: [] };
}
function isHtmlEntry(path) {
  return path.endsWith(".html") || path.endsWith(".htm");
}
async function bakeMediaProxies(projectDir, fileContents) {
  const manifest = emptyManifest();
  const absProjectDir = resolve3(projectDir);
  const htmlEntries = [...fileContents.entries()].filter(([path]) => isHtmlEntry(path));
  if (htmlEntries.length === 0) return manifest;
  const htmlSources = htmlEntries.map(([entryPath, content]) => ({
    html: content.toString("utf-8"),
    compSrcPath: entryPath
  }));
  const codecMap = await scanProjectMediaCodecMap(absProjectDir, htmlSources);
  const hostileEntries = Object.entries(codecMap).filter(([, facts]) => facts.browserHostile);
  if (hostileEntries.length === 0) return manifest;
  const proxyByAbsolutePath = /* @__PURE__ */ new Map();
  await Promise.all(
    hostileEntries.map(async ([pathname, facts]) => {
      const absoluteSourcePath = resolve3(absProjectDir, pathname.replace(/^\/+/, ""));
      try {
        const proxyPath = await waitForProxy(
          resolveProxy(absProjectDir, absoluteSourcePath, proxyVariantFor(facts)),
          TRANSCODE_TIMEOUT_MS
        );
        const archivePath = `${PROXY_ARCHIVE_PREFIX}/${basename2(proxyPath)}`;
        fileContents.set(archivePath, await readFile(proxyPath));
        proxyByAbsolutePath.set(absoluteSourcePath, archivePath);
        manifest.proxied.push(pathname);
      } catch (err) {
        const reason = err instanceof ProxyTranscodeError ? err.message : String(err);
        manifest.failed.push({ path: pathname, error: reason });
      }
    })
  );
  manifest.proxied.sort();
  manifest.skippedAlpha.sort();
  manifest.failed.sort((a, b) => a.path.localeCompare(b.path));
  if (manifest.failed.length > 0) throw new ProxyBakeError(manifest);
  if (proxyByAbsolutePath.size === 0) return manifest;
  for (const [entryPath, content] of htmlEntries) {
    const { document } = parseHTML(content.toString("utf-8"));
    const referrerAbsDir = resolve3(absProjectDir, dirname3(entryPath));
    const modified = rewriteHtmlAttributes(
      document,
      referrerAbsDir,
      entryPath,
      (rawValue) => {
        const cleaned = cleanAssetUrl(rawValue);
        if (!cleaned || isRemoteOrInlineUrl(cleaned)) return null;
        const rootRelativeSrc = rewriteAssetPath(
          entryPath,
          cleaned,
          (path) => existsSync3(resolve3(absProjectDir, path))
        );
        for (const candidate of resolveLocalAssetCandidates(absProjectDir, rootRelativeSrc)) {
          const archivePath = proxyByAbsolutePath.get(candidate);
          if (archivePath) return archivePath;
        }
        return null;
      },
      { selector: "video[src]", attrs: ["src"] }
    );
    if (modified) fileContents.set(entryPath, Buffer.from(document.toString(), "utf-8"));
  }
  return manifest;
}

// src/commands/publish.ts
var examples = [
  ["Publish the current project privately to a stable URL", "hyperframes publish"],
  ["Publish a specific directory", "hyperframes publish ./my-video"],
  ["Make the claimed project public to anyone", "hyperframes publish --public"],
  ["Update an existing published project in place", "hyperframes publish --update <url|id>"],
  ["Publish to a shared team space", "hyperframes publish --space <space-id>"],
  ["Skip the consent prompt (scripts)", "hyperframes publish --yes"],
  ["Skip baking H.264 proxies for browser-hostile video codecs", "hyperframes publish --no-proxy"],
  ["Show full lint findings instead of the summary line", "hyperframes publish --lint-verbose"]
];
function parseUpdateTarget(value) {
  const trimmed = value.trim();
  const pathMatch = trimmed.match(/\/p\/([^/?#]+)/);
  if (pathMatch?.[1]) return pathMatch[1];
  try {
    const segment = new URL(trimmed).pathname.split("/").filter(Boolean).pop();
    if (segment) return segment;
  } catch {
  }
  return trimmed;
}
var publish_default = defineCommand({
  meta: {
    name: "publish",
    description: "Upload the project to a stable URL (private by default)"
  },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    yes: {
      type: "boolean",
      alias: "y",
      description: "Skip the publish confirmation prompt",
      default: false
    },
    public: {
      type: "boolean",
      description: "Make the claimed project public to anyone, not just the claimer",
      default: false
    },
    update: {
      type: "string",
      description: "Update an existing published project in place (its URL or id)"
    },
    space: {
      type: "string",
      description: "Publish into a shared team space (its id) so teammates update one link"
    },
    proxy: {
      type: "boolean",
      description: "Bake H.264 proxies for browser-hostile video codecs (e.g. HEVC) into the published archive. Default: on, unless disabled via hyperframes.json media.autoProxy. Pass --no-proxy to skip."
    },
    "lint-verbose": {
      type: "boolean",
      description: "Show full lint findings before publishing (default: a one-line summary)",
      default: false
    }
  },
  async run({ args }) {
    const rawArg = args.dir;
    const dir = resolve4(rawArg ?? ".");
    const indexPath = join4(dir, "index.html");
    if (existsSync4(indexPath)) {
      const lintResult = await lintProject(dir);
      const definitiveEntryMismatch = hasDefinitiveEntryMismatch(lintResult);
      if (lintResult.totalErrors > 0 || lintResult.totalWarnings > 0) {
        console.log();
        const verbose = Boolean(args["lint-verbose"]) || definitiveEntryMismatch;
        for (const line of formatLintStartupMessage(
          lintResult,
          verbose ? { kind: "verbose" } : { kind: "summary" }
        ))
          console.log(line);
        console.log();
      }
      if (definitiveEntryMismatch) {
        const candidate = definitiveEntryMismatchComposition(lintResult);
        console.log(c.error("  Aborting publish because the default index.html entry is blank."));
        if (candidate && posix2.basename(candidate) === "index.html") {
          const candidateDir = posix2.dirname(candidate);
          const target = `<project>/${candidateDir}`;
          console.log(
            c.dim(
              `  Move or mount the authored file, or publish its directory directly: hyperframes publish ${target}. Only use the directory form when its assets are self-contained under that directory; otherwise mount it from the project root.`
            )
          );
        } else if (candidate) {
          console.log(
            c.dim(
              `  Move or mount ${candidate} as a project index.html before publishing; publish accepts project directories, not individual HTML files.`
            )
          );
        }
        console.log();
        failCommand();
      }
    }
    if (args.yes !== true) {
      console.log();
      if (args.public === true) {
        console.log(
          `  ${c.bold("hyperframes publish uploads this project and requests public visibility at a stable URL.")}`
        );
        console.log(`  ${c.dim("Anyone with the URL can open a claimed public project.")}`);
      } else {
        console.log(
          `  ${c.bold("hyperframes publish uploads this project privately to a stable URL.")}`
        );
        console.log(
          `  ${c.dim("Viewing requires authentication and access. Pass --public to allow anyone with the URL.")}`
        );
      }
      console.log();
      const approved = await ue({ message: "Publish this project?" });
      if (q(approved) || approved !== true) {
        console.log();
        console.log(`  ${c.dim("Aborted.")}`);
        console.log();
        return;
      }
    }
    const updateTarget = typeof args.update === "string" && args.update.trim() ? parseUpdateTarget(args.update) : void 0;
    const spaceOverride = typeof args.space === "string" && args.space.trim() ? args.space.trim() : void 0;
    let credential;
    try {
      credential = await resolvePublishCredential();
    } catch (err) {
      console.error();
      console.error(`  ${err.message}`);
      console.error();
      setCommandExitCode(1);
      return;
    }
    if (updateTarget || spaceOverride) {
      if (credential?.type !== "oauth") {
        const flag = updateTarget ? "--update" : "--space";
        const envKey = credential?.source === "env" || credential?.source === "env_alias" ? API_KEY_ENV_VAR[credential.source] : void 0;
        console.log();
        console.log(
          `  ${c.error(
            !credential ? `${flag} requires authentication. Run 'hyperframes auth login' first.` : envKey ? `${flag} requires a login; ${envKey} cannot own a project. Unset it and run 'hyperframes auth login'.` : `${flag} requires a login; an API key cannot own a project. Run 'hyperframes auth login'.`
          )}`
        );
        console.log();
        setCommandExitCode(1);
        return;
      }
    }
    const committedTeam = readTeamProject(dir);
    const requestedProjectId = updateTarget ?? committedTeam?.projectId ?? ensureProjectId(dir);
    const spaceId = spaceOverride ?? committedTeam?.spaceId;
    const priorLink = readProjectLink(dir);
    if (priorLink?.url) {
      console.log();
      console.log(`  ${c.dim(`Previously published at ${priorLink.url}`)}`);
    }
    ge(c.bold("hyperframes publish"));
    const publishSpinner = ft();
    publishSpinner.start("Preparing project...");
    try {
      const proxyFlagValue = typeof args.proxy === "boolean" ? args.proxy : void 0;
      const autoProxy = resolveAutoProxy(dir, proxyFlagValue);
      const fileMap = buildPublishFileMap(dir);
      let proxyBakeManifest;
      if (autoProxy) {
        proxyBakeManifest = await bakeMediaProxies(dir, fileMap);
      }
      const archive = zipPublishFileMap(fileMap);
      publishSpinner.message("Uploading project...");
      const published = await publishProjectArchive(dir, {
        public: args.public === true,
        projectId: requestedProjectId,
        spaceId,
        archive,
        credential
      });
      publishSpinner.stop(c.success("Project published"));
      console.log();
      console.log(`  ${c.dim("Project")}              ${c.accent(published.title)}`);
      console.log(`  ${c.dim("Files")}                ${String(published.fileCount)}`);
      if (proxyBakeManifest) {
        console.log(
          `  ${c.dim("Proxies")}              ${String(proxyBakeManifest.proxied.length)} baked`
        );
        if (proxyBakeManifest.skippedAlpha.length > 0) {
          console.log(
            `  ${c.dim("Proxy note")}           ${String(proxyBakeManifest.skippedAlpha.length)} alpha source(s) kept original`
          );
        }
      }
      if (published.claimed) {
        const updatedInPlace = published.projectId === requestedProjectId;
        console.log(`  ${c.dim("URL")}                  ${c.accent(published.url)}`);
        const requestedVisibility = args.public === true ? "Public \u2014 anyone with the URL" : updatedInPlace ? "Unchanged \u2014 keeps this project's current setting" : "Private \u2014 authentication and access required";
        console.log(`  ${c.dim("Requested visibility")} ${c.accent(requestedVisibility)}`);
        console.log(
          `  ${c.dim("Status")}               ${c.accent(updatedInPlace ? "Updated existing project" : "Created new project")}`
        );
        if (args.public !== true) {
          console.log(
            `  ${c.dim("Tip")}                  ${c.dim("Re-publish with --public to allow anyone with the URL.")}`
          );
        }
        if ((updateTarget || committedTeam) && !updatedInPlace) {
          const targetDesc = updateTarget ? "The requested project" : "The committed team project";
          console.log();
          console.log(
            `  ${c.dim(`${targetDesc} was not updated (not found, or your space can't access it); a new project was created above instead.`)}`
          );
        }
        if (committedTeam === null || spaceId !== void 0 && committedTeam.spaceId !== spaceId) {
          try {
            const file = writeTeamProject(dir, { projectId: published.projectId, spaceId });
            console.log();
            console.log(
              `  ${c.dim(`Wrote ${relative2(dir, file) || file} \u2014 commit it so your team publishes to this link.`)}`
            );
          } catch {
          }
        }
        console.log();
      } else {
        const claimUrl = new URL(published.url);
        claimUrl.searchParams.set("claim_token", published.claimToken);
        console.log(`  ${c.dim("Claim URL")}  ${c.accent(claimUrl.toString())}`);
        console.log(`  ${c.dim("Access")}     ${c.accent("Sign in required to claim")}`);
        console.log();
        console.log(
          `  ${c.dim("Open the claim URL on hyperframes.dev, sign in, and claim the project to continue editing.")}`
        );
        console.log();
        const visibilityTip = args.public === true ? "--public applies to the claimed project; this claim URL still requires sign-in." : "Run 'hyperframes auth login' first for a stable link you can re-publish to; add --public to allow signed-out viewing.";
        console.log(`  ${c.dim(`Tip: ${visibilityTip}`)}`);
        console.log();
      }
      return;
    } catch (err) {
      publishSpinner.stop(c.error("Publish failed"));
      console.error();
      console.error(`  ${err.message}`);
      console.error();
      setCommandExitCode(1);
      return;
    }
  }
});
export {
  publish_default as default,
  examples,
  parseUpdateTarget
};
