import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  installedOptionalPackageVersion,
  loadInstalledOptionalPackage,
  loadOptionalPackage
} from "./chunk-3DKN5WKL.js";
import {
  runAdd
} from "./chunk-QYRCRW7K.js";
import "./chunk-DQNOPYAG.js";
import {
  DEFAULT_PROJECT_CONFIG,
  loadProjectConfig
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6BEFEWFB.js";
import {
  downloadFile
} from "./chunk-WCJGTLPF.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  Ee,
  me,
  q,
  ue
} from "./chunk-WMQNIQDJ.js";
import {
  fetchRegistryManifest,
  loadAllItems
} from "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  finishCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-USDEMXXL.js";
import {
  realpath
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-K4WIOZFP.js";
import {
  isAttendedTerminal,
  readConfig,
  updateLocalModelConsent
} from "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/catalog.ts
import { relative, resolve } from "path";

// src/registry/localSearch.ts
var STOP = new Set(
  "the a an and or of to in on at is are be it its for with that this as by from into one two must not no all over under across while when where which who whom whose they them their we our you your he she his her but if then than so such can may might will would should each other another same both few more most some any every".split(" ")
);
var STRONG_FIELD_WEIGHT = 3;
var PLURAL_RULES = [
  [/([^aeiou])ies$/, "$1y"],
  // stories -> story
  [/(ch|sh|ss|x)es$/, "$1"],
  // matches -> match, glasses -> glass
  [/(ss|us|is)$/, "$&"],
  // press, status, axis: the trailing s is not a plural
  [/s$/, ""]
  // counts -> count, pulses -> pulse
];
function singularize(word) {
  if (word.length <= 3) return word;
  for (const [pattern, replacement] of PLURAL_RULES) {
    if (pattern.test(word)) return word.replace(pattern, replacement);
  }
  return word;
}
function tokenize(text) {
  const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
  return words.filter((word) => word.length > 2 && !STOP.has(word)).map(singularize);
}
function hasNoSearchableTokens(query) {
  return tokenize(query).length === 0 && query.trim().length > 0;
}
var INFERRED_TOKEN_WEIGHT = 0.35;
function expandCompounds(want, order, vocabulary) {
  const infer = (token) => {
    if (!want.has(token)) want.set(token, INFERRED_TOKEN_WEIGHT);
  };
  for (const token of order) {
    if (token.length < 6) continue;
    for (let cut = 3; cut <= token.length - 3; cut++) {
      const head = token.slice(0, cut);
      const tail = token.slice(cut);
      if (vocabulary.has(head) && vocabulary.has(tail)) {
        infer(head);
        infer(tail);
        break;
      }
    }
  }
  for (let i = 0; i < order.length - 1; i++) {
    const joined = `${order[i]}${order[i + 1]}`;
    if (vocabulary.has(joined)) infer(joined);
  }
}
function rankByWords(query, items, textOf) {
  const asked = tokenize(query);
  const want = new Map(asked.map((token) => [token, 1]));
  if (want.size === 0) return items.map((item) => ({ item, score: 0 }));
  const parsed = items.map((item) => {
    const { strong, weak } = textOf(item);
    const strongTokens = new Set(tokenize(strong));
    return { item, strongTokens, allTokens: /* @__PURE__ */ new Set([...strongTokens, ...tokenize(weak)]) };
  });
  const vocabulary = /* @__PURE__ */ new Set();
  for (const entry of parsed) for (const token of entry.allTokens) vocabulary.add(token);
  expandCompounds(want, asked, vocabulary);
  const idf = /* @__PURE__ */ new Map();
  for (const token of want.keys()) {
    const df = parsed.reduce((count, p) => count + (p.allTokens.has(token) ? 1 : 0), 0);
    idf.set(token, Math.log((parsed.length + 1) / (df + 1)) + 1);
  }
  return parsed.map(({ item, strongTokens, allTokens }) => {
    let shared = 0;
    for (const [token, asking] of want) {
      const weight = (idf.get(token) ?? 1) * asking;
      if (strongTokens.has(token)) shared += STRONG_FIELD_WEIGHT * weight;
      else if (allTokens.has(token)) shared += weight;
    }
    return { item, score: shared / (Math.sqrt(allTokens.size) || 1) };
  }).sort((a, b) => b.score - a.score || nameOf(b.item).localeCompare(nameOf(a.item)));
}
function searchByWords(query, items, textOf) {
  return rankByWords(query, items, textOf).filter((scored) => scored.score > 0).map((scored) => scored.item);
}
function nameOf(item) {
  const named = item;
  return typeof named?.name === "string" ? named.name : "";
}

// src/registry/localModel.ts
import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, unlinkSync } from "fs";
import { homedir } from "os";
import { join } from "path";
var LOCAL_MODEL_ID = "bge-small-en-v1.5";
var LOCAL_MODEL_DIMENSIONS = 384;
var LOCAL_MODEL_SIZE_MB = 33;
var QUERY_INSTRUCTION = "Represent this sentence for searching relevant passages: ";
var MODELS_DIR = join(homedir(), ".hyperframes", "models");
var MODEL_REPO = "Xenova/bge-small-en-v1.5";
var LOCAL_MODEL_REVISION = "ea104dacec62c0de699686887e3f920caeb4f3e3";
var LOCAL_MODEL_ARTIFACTS = [
  {
    url: `https://huggingface.co/${MODEL_REPO}/resolve/${LOCAL_MODEL_REVISION}/onnx/model_quantized.onnx`,
    dest: () => localModelPath(),
    bytes: 34014426,
    sha256: "6c9c6101a956d62dfb5e7190c538226c0c5bb9cb27b651234b6df063ee7dbfe4"
  },
  {
    url: `https://huggingface.co/${MODEL_REPO}/resolve/${LOCAL_MODEL_REVISION}/tokenizer.json`,
    dest: () => localTokenizerPath(),
    bytes: 711396,
    sha256: "d241a60d5e8f04cc1b2b3e9ef7a4921b27bf526d9f6050ab90f9267a1f9e5c66"
  }
];
function localModelConsent() {
  return readConfig().localEmbeddingEnabled;
}
function recordLocalModelConsent(enabled) {
  return updateLocalModelConsent(() => enabled);
}
function savedLocalModelConsent() {
  return updateLocalModelConsent((onDisk) => onDisk);
}
function assumeLocalModelConsent() {
  return updateLocalModelConsent((onDisk) => onDisk ?? true);
}
function localModelPath() {
  return join(MODELS_DIR, `${LOCAL_MODEL_ID}.onnx`);
}
function localTokenizerPath() {
  return join(MODELS_DIR, `${LOCAL_MODEL_ID}.tokenizer.json`);
}
function modelFileIsValid(file) {
  const path = file.dest();
  if (!existsSync(path)) return false;
  try {
    return createHash("sha256").update(readFileSync(path)).digest("hex") === file.sha256;
  } catch {
    return false;
  }
}
function isLocalModelReady() {
  return LOCAL_MODEL_ARTIFACTS.every(modelFileIsValid);
}
function localModelStatus() {
  const consent = localModelConsent();
  if (consent === false) return { status: "declined" };
  if (isLocalModelReady()) return { status: "ready" };
  if (consent === void 0) return { status: "not-asked" };
  return { status: "unavailable", reason: "model not downloaded yet" };
}
async function ensureLocalModel() {
  if (isLocalModelReady()) return true;
  try {
    mkdirSync(MODELS_DIR, { recursive: true });
    for (const file of LOCAL_MODEL_ARTIFACTS) {
      if (modelFileIsValid(file)) continue;
      const dest = file.dest();
      await downloadFile(file.url, dest, { maxBytes: file.bytes });
      if (!modelFileIsValid(file)) {
        unlinkSync(dest);
        return false;
      }
    }
    return isLocalModelReady();
  } catch {
    return false;
  }
}
function nonInteractiveConsentMessage() {
  return `On-device search needs a one-time ${LOCAL_MODEL_SIZE_MB} MB download that stays on this machine. Nothing is sent anywhere. Ask the person you are working for, and pass --on-device --yes once they agree.`;
}
function downloadOfferMessage(matchCount) {
  const found = matchCount === void 0 ? "Use on-device meaning search." : matchCount === 0 ? "No matches from word search." : `Only ${matchCount} match${matchCount === 1 ? "" : "es"} from word search.`;
  return `${found} Download a ${LOCAL_MODEL_SIZE_MB} MB search model for better offline results? It stays on your machine and nothing is sent.`;
}

// src/registry/localEmbedder.ts
import { readFileSync as readFileSync2 } from "fs";

// src/registry/wordpiece.ts
function configFromTokenizerJson(raw) {
  const parsed = JSON.parse(raw);
  const model = parsed.model;
  if (!model?.vocab) throw new Error("tokenizer.json has no WordPiece vocab");
  return {
    vocab: model.vocab,
    unkToken: model.unk_token ?? "[UNK]",
    continuingSubwordPrefix: model.continuing_subword_prefix ?? "##",
    maxInputCharsPerWord: model.max_input_chars_per_word ?? 100,
    clsToken: "[CLS]",
    sepToken: "[SEP]"
  };
}
function normalize(text) {
  let out = "";
  for (const char of text) {
    const code = char.codePointAt(0);
    if (code === 0 || code === 65533) continue;
    if (isControl(char, code)) continue;
    if (isWhitespace(char, code)) {
      out += " ";
      continue;
    }
    out += isChinese(code) ? ` ${char} ` : char;
  }
  return out.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Mn}", "gu"), "");
}
function preTokenize(normalized) {
  const words = [];
  for (const chunk of normalized.split(/\s+/)) {
    if (!chunk) continue;
    let current = "";
    for (const char of chunk) {
      if (isPunctuation(char)) {
        if (current) words.push(current);
        words.push(char);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) words.push(current);
  }
  return words;
}
function wordPiece(word, config) {
  if ([...word].length > config.maxInputCharsPerWord) return [config.unkToken];
  const pieces = [];
  let start = 0;
  while (start < word.length) {
    let end = word.length;
    let match = null;
    while (start < end) {
      const candidate = start === 0 ? word.slice(start, end) : config.continuingSubwordPrefix + word.slice(start, end);
      if (candidate in config.vocab) {
        match = candidate;
        break;
      }
      end -= 1;
    }
    if (match === null) return [config.unkToken];
    pieces.push(match);
    start = end;
  }
  return pieces;
}
function encode(text, config) {
  const tokens = [config.clsToken];
  for (const word of preTokenize(normalize(text))) tokens.push(...wordPiece(word, config));
  tokens.push(config.sepToken);
  const unk = config.vocab[config.unkToken];
  const ids = tokens.map((token) => config.vocab[token] ?? unk);
  return {
    ids,
    attentionMask: ids.map(() => 1),
    tokenTypeIds: ids.map(() => 0)
  };
}
function isControl(char, code) {
  if (char === "	" || char === "\n" || char === "\r") return false;
  return code < 32 || code === 127 || new RegExp("\\p{Cc}|\\p{Cf}", "u").test(char);
}
function isWhitespace(char, code) {
  return char === " " || char === "	" || char === "\n" || char === "\r" || code === 11 || code === 12 || new RegExp("\\p{Zs}", "u").test(char);
}
function isPunctuation(char) {
  const code = char.codePointAt(0);
  const asciiSymbol = code >= 33 && code <= 47 || code >= 58 && code <= 64 || code >= 91 && code <= 96 || code >= 123 && code <= 126;
  return asciiSymbol || new RegExp("\\p{P}", "u").test(char);
}
function isChinese(code) {
  return code >= 19968 && code <= 40959 || code >= 13312 && code <= 19903 || code >= 131072 && code <= 173791 || code >= 173824 && code <= 177983 || code >= 177984 && code <= 178207 || code >= 178208 && code <= 183983 || code >= 63744 && code <= 64255 || code >= 194560 && code <= 195103;
}

// src/registry/localEmbedder.ts
var MAX_TOKENS = 512;
var FEATURE = "on-device search";
async function ensureLocalRuntime() {
  try {
    await loadOptionalPackage("onnxruntime-node", FEATURE);
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}
function hasLocalRuntime() {
  return installedOptionalPackageVersion("onnxruntime-node") !== null;
}
async function loadLocalEmbedder() {
  const ort = loadInstalledOptionalPackage("onnxruntime-node");
  if (ort === null) throw new Error("the on-device runtime is not installed yet");
  const config = configFromTokenizerJson(readFileSync2(localTokenizerPath(), "utf-8"));
  const session = await ort.InferenceSession.create(localModelPath());
  return {
    async embed(texts, options) {
      if (texts.length === 0) return [];
      const prefix = options?.isQuery ? QUERY_INSTRUCTION : "";
      const encodings = texts.map((text) => truncate(encode(prefix + text, config)));
      const width = Math.max(...encodings.map((e) => e.ids.length));
      const batch = encodings.length;
      const ids = new BigInt64Array(batch * width);
      const mask = new BigInt64Array(batch * width);
      const types = new BigInt64Array(batch * width);
      encodings.forEach((encoding, row) => {
        encoding.ids.forEach((id, column) => {
          const at = row * width + column;
          ids[at] = BigInt(id);
          mask[at] = 1n;
          types[at] = 0n;
        });
      });
      const dims = [batch, width];
      const output = await session.run({
        input_ids: new ort.Tensor("int64", ids, dims),
        attention_mask: new ort.Tensor("int64", mask, dims),
        token_type_ids: new ort.Tensor("int64", types, dims)
      });
      const hidden = output["last_hidden_state"];
      if (!hidden) throw new Error("model returned no last_hidden_state");
      const data = hidden.data;
      const hiddenSize = hidden.dims[2];
      if (hiddenSize !== LOCAL_MODEL_DIMENSIONS) {
        throw new Error(
          `model produced ${hiddenSize} dimensions, expected ${LOCAL_MODEL_DIMENSIONS}`
        );
      }
      return encodings.map((_, row) => {
        const start = row * width * hiddenSize;
        return normalize2(Array.from(data.subarray(start, start + hiddenSize)));
      });
    }
  };
}
function truncate(encoding) {
  if (encoding.ids.length <= MAX_TOKENS) return encoding;
  const ids = [
    ...encoding.ids.slice(0, MAX_TOKENS - 1),
    encoding.ids[encoding.ids.length - 1]
  ];
  return { ids, attentionMask: ids.map(() => 1), tokenTypeIds: ids.map(() => 0) };
}
function normalize2(vector) {
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  return norm === 0 ? vector : vector.map((value) => value / norm);
}
function cosine(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) sum += a[i] * b[i];
  return sum;
}

// src/registry/localSemantic.ts
import { existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync3, writeFileSync } from "fs";
import { homedir as homedir2 } from "os";
import { join as join2 } from "path";
function isMediaVectorRow(value) {
  if (!value || typeof value !== "object") return false;
  const row = value;
  return typeof row.id === "string" && typeof row.kind === "string" && typeof row.title === "string" && typeof row.description === "string" && Array.isArray(row.tags) && row.tags.every((tag) => typeof tag === "string") && typeof row.file === "string" && (row.duration === void 0 || typeof row.duration === "number" && Number.isFinite(row.duration) && row.duration >= 0) && (row.dimensions === void 0 || typeof row.dimensions === "object" && row.dimensions !== null && Number.isInteger(row.dimensions.width) && Number.isInteger(row.dimensions.height) && row.dimensions.width > 0 && row.dimensions.height > 0);
}
var CATALOG_ARTIFACT_TIMEOUT_MS = 3e4;
function localVectorDirectory() {
  return process.env["HYPERFRAMES_CATALOG_ARTIFACT_DIR"] ?? join2(homedir2(), ".hyperframes", "catalog");
}
function vectorPairAgrees(fetched, artifactBasename) {
  const meta = fetched.find(([file]) => file === `${artifactBasename}.json`)?.[1];
  const bin = fetched.find(([file]) => file === `${artifactBasename}.bin`)?.[1];
  if (!meta || !bin) return false;
  try {
    const parsed = JSON.parse(meta.toString("utf-8"));
    if (parsed.dimensions !== LOCAL_MODEL_DIMENSIONS) return false;
    if (artifactBasename === "media-vectors" && (!parsed.rows || parsed.rows.length !== (parsed.names?.length ?? -1) || parsed.rows.some(
      (row, index) => !isMediaVectorRow(row) || row.id !== parsed.names?.[index]
    ))) {
      return false;
    }
    return bin.byteLength === (parsed.names?.length ?? -1) * LOCAL_MODEL_DIMENSIONS * 4;
  } catch {
    return false;
  }
}
function vectorRevisionAgrees(fetched, expectedRevision, artifactBasename = "local-vectors") {
  if (expectedRevision === void 0) return true;
  const meta = fetched.find(([file]) => file === `${artifactBasename}.json`)?.[1];
  if (!meta) return false;
  try {
    const parsed = JSON.parse(meta.toString("utf-8"));
    return parsed.revision === expectedRevision;
  } catch {
    return false;
  }
}
async function fetchLocalVectors(registryBaseUrl, options = {}) {
  const directory = options.directory ?? localVectorDirectory();
  const artifactBasename = options.artifactBasename ?? "local-vectors";
  const base = registryBaseUrl.replace(/\/+$/, "");
  try {
    mkdirSync2(directory, { recursive: true, mode: 448 });
    const fetched = [];
    for (const file of [`${artifactBasename}.json`, `${artifactBasename}.bin`]) {
      const response = await fetch(`${base}/catalog-artifact/${file}`, {
        signal: AbortSignal.timeout(CATALOG_ARTIFACT_TIMEOUT_MS)
      });
      if (!response.ok) return false;
      fetched.push([file, Buffer.from(await response.arrayBuffer())]);
    }
    if (!vectorPairAgrees(fetched, artifactBasename) || !vectorRevisionAgrees(fetched, options.expectedRevision, artifactBasename)) {
      return false;
    }
    for (const [file, bytes] of fetched) {
      writeFileSync(join2(directory, file), bytes, { mode: 384 });
    }
    return artifactBasename === "media-vectors" ? hasMediaVectors(directory) : hasLocalVectors(directory);
  } catch {
    return false;
  }
}
function hasLocalVectors(directory = localVectorDirectory()) {
  return existsSync2(join2(directory, "local-vectors.bin")) && existsSync2(join2(directory, "local-vectors.json"));
}
function hasMediaVectors(directory = localVectorDirectory()) {
  return existsSync2(join2(directory, "media-vectors.bin")) && existsSync2(join2(directory, "media-vectors.json"));
}
function loadLocalVectors(directory = localVectorDirectory()) {
  const meta = JSON.parse(
    readFileSync3(join2(directory, "local-vectors.json"), "utf-8")
  );
  const buffer = readFileSync3(join2(directory, "local-vectors.bin"));
  const vectors = new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / 4);
  const expected = meta.names.length * meta.dimensions;
  if (vectors.length !== expected) {
    throw new Error(`local vectors hold ${vectors.length} floats, expected ${expected}`);
  }
  if (meta.dimensions !== LOCAL_MODEL_DIMENSIONS) {
    throw new Error(
      `local vectors are ${meta.dimensions}-dimension, model produces ${LOCAL_MODEL_DIMENSIONS}`
    );
  }
  return { names: meta.names, dimensions: meta.dimensions, vectors };
}
function localVectorNames(directory = localVectorDirectory()) {
  if (!hasLocalVectors(directory)) return [];
  try {
    const meta = JSON.parse(readFileSync3(join2(directory, "local-vectors.json"), "utf-8"));
    return meta.names ?? [];
  } catch {
    return [];
  }
}
function cachedLocalVectorRevision(directory = localVectorDirectory()) {
  if (!hasLocalVectors(directory)) return void 0;
  try {
    const meta = JSON.parse(readFileSync3(join2(directory, "local-vectors.json"), "utf-8"));
    return typeof meta.revision === "string" ? meta.revision : void 0;
  } catch {
    return void 0;
  }
}
async function localSemanticRanking(query, directory = localVectorDirectory()) {
  if (!isLocalModelReady() || !hasLocalVectors(directory)) return null;
  const set = loadLocalVectors(directory);
  const embedder = await loadLocalEmbedder();
  const [queryVector] = await embedder.embed([query], { isQuery: true });
  if (!queryVector) return null;
  const scored = set.names.map((name, row) => {
    const start = row * set.dimensions;
    return {
      name,
      score: cosine(queryVector, Array.from(set.vectors.subarray(start, start + set.dimensions)))
    };
  });
  scored.sort((a, b) => b.score - a.score || b.name.localeCompare(a.name));
  return scored;
}

// src/commands/catalog.ts
var examples = [
  ["List all blocks and components", "hyperframes catalog"],
  ["List blocks only", "hyperframes catalog --type block"],
  ["Filter by tag", "hyperframes catalog --type block --tag social"],
  ["Machine-readable JSON", "hyperframes catalog --json"],
  ["Interactive picker (install on select)", "hyperframes catalog --human-friendly"],
  ["Search (positional, same as --query)", 'hyperframes catalog "crossfade"']
];
async function prepareOnDeviceTier(opts) {
  const warnings = [];
  const warn = (message) => {
    warnings.push(message);
    console.error(message);
  };
  const status = opts.status;
  const unwatchedYes = opts.assumedYes && !opts.canPrompt;
  const declined = "on-device search skipped: the model download was previously declined. To consent, re-run with --yes in an interactive terminal, without --json and outside CI.";
  if (status.status === "declined" && !opts.assumedYes) {
    warn(declined);
    return warnings;
  }
  if (!opts.assumedYes && status.status === "not-asked" && !opts.canPrompt) {
    warn(nonInteractiveConsentMessage());
    return warnings;
  }
  if (!opts.assumedYes && status.status === "not-asked") {
    const answer = await ue({
      message: downloadOfferMessage(),
      initialValue: true
    });
    if (q(answer) || answer !== true) {
      warn(
        recordLocalModelConsent(false) === false ? "on-device search skipped: the download was declined." : "on-device search skipped: the download was declined, but could not save the answer in settings; `hyperframes doctor` says why."
      );
      return warnings;
    }
  }
  const asked = status.status === "declined" || status.status === "not-asked";
  const agreed = !asked ? savedLocalModelConsent() : unwatchedYes ? assumeLocalModelConsent() : recordLocalModelConsent(true);
  if (agreed !== true) {
    warn(
      agreed === false && (unwatchedYes || !asked) ? declined : asked ? "on-device search skipped: could not save the answer in settings; `hyperframes doctor` says why." : nonInteractiveConsentMessage()
    );
    return warnings;
  }
  const runtime = await ensureLocalRuntime();
  if (!runtime.ok) {
    warn(`on-device search skipped: ${runtime.reason}`);
    return warnings;
  }
  if (savedLocalModelConsent() !== true) {
    warn(declined);
    return warnings;
  }
  const model = await ensureLocalModel();
  const revisionStale = opts.artifactRevision !== void 0 && cachedLocalVectorRevision() !== opts.artifactRevision;
  if (!hasLocalVectors() || revisionStale || countUnindexed(opts.registryNames, localVectorNames()) > 0) {
    await fetchLocalVectors(opts.registry, { expectedRevision: opts.artifactRevision });
  }
  const vectors = hasLocalVectors();
  if (!model || !vectors) {
    warn(
      `on-device search unavailable: ${!model ? "model" : "catalog vectors"} could not be fetched`
    );
  } else if (opts.artifactRevision !== void 0 && cachedLocalVectorRevision() !== opts.artifactRevision) {
    warn("on-device search is using the previous catalog vectors because the update failed");
  }
  return warnings;
}
var catalog_default = defineCommand({
  meta: {
    name: "catalog",
    description: "Browse and install blocks and components from the registry"
  },
  args: {
    words: {
      type: "positional",
      description: "Search words, same as --query (e.g. `catalog crossfade`)",
      required: false
    },
    type: {
      type: "string",
      description: 'Filter by type: "block" or "component"'
    },
    tag: {
      type: "string",
      description: "Filter by tag (e.g. social, transition, text)"
    },
    json: {
      type: "boolean",
      description: "Print matching items as JSON to stdout"
    },
    "human-friendly": {
      type: "boolean",
      description: "Interactive picker \u2014 select an item to install"
    },
    query: {
      type: "string",
      description: "Search by meaning when the on-device model is on, otherwise by name, title, description and tags. A bare positional word works the same way (e.g. `catalog crossfade`)."
    },
    yes: {
      type: "boolean",
      alias: "y",
      description: "Assume yes for prompts this run, including the on-device model download"
    },
    "on-device": {
      type: "boolean",
      // Consent for the model download is otherwise only reachable through a
      // prompt that fires on a TTY, which leaves every agent and CI run unable
      // to opt in at all.
      description: "Use on-device meaning search; pass --yes to approve a first non-interactive download"
    }
  },
  // one flag-parsing entry point feeding three output paths (json, interactive, table); splitting those is its own change
  // fallow-ignore-next-line complexity
  async run({ args }) {
    const json = args.json === true;
    const interactive = args["human-friendly"] === true;
    const dir = resolve(process.cwd());
    const config = loadProjectConfig(dir) ?? DEFAULT_PROJECT_CONFIG;
    let typeFilter;
    if (args.type === "block") typeFilter = "hyperframes:block";
    else if (args.type === "component") typeFilter = "hyperframes:component";
    else if (args.type) {
      console.error(`Invalid --type: "${args.type}". Use "block" or "component".`);
      finishCommand(1);
    }
    const manifest = await fetchRegistryManifest(config.registry);
    const entries = manifest?.items ?? [];
    const artifactRevision = manifest?.catalogArtifact?.revision;
    const catalog = entries.filter((e) => e.type !== "hyperframes:example");
    const registryNames = new Set(catalog.map((e) => e.name));
    const filtered = typeFilter ? catalog.filter((e) => e.type === typeFilter) : catalog;
    if (filtered.length === 0) {
      if (json) console.log("[]");
      else console.log("No items found in registry.");
      return;
    }
    const items = await loadAllItems(filtered, { baseUrl: config.registry });
    const tagFilter = args.tag?.toLowerCase();
    const tagged = tagFilter ? items.filter((item) => item.tags?.some((t) => t.toLowerCase() === tagFilter)) : items;
    const query = (typeof args.query === "string" ? args.query.trim() : "") || args.words?.trim() || "";
    const searchContext = query ? { status: localModelStatus() } : null;
    const routineUpdate = searchContext?.status.status === "unavailable" || searchContext?.status.status === "ready" && (!hasLocalRuntime() || artifactRevision !== void 0 && cachedLocalVectorRevision() !== artifactRevision);
    const shouldPrepare = args["on-device"] === true || routineUpdate;
    let warnings = [];
    let effectiveStatus = searchContext?.status;
    if (searchContext && shouldPrepare) {
      warnings = await prepareOnDeviceTier({
        assumedYes: args.yes === true,
        artifactRevision,
        canPrompt: isAttendedTerminal() && !json,
        registry: config.registry,
        registryNames,
        status: searchContext.status
      });
      effectiveStatus = localModelStatus();
    }
    const searched = effectiveStatus ? await applySearch(tagged, query, registryNames, effectiveStatus) : null;
    if (searched) warnings.push(...searched.warnings);
    const matching = searched ? searched.items : tagged;
    if (matching.length === 0) {
      const unsearchable = Boolean(query) && searched?.localMode === "words" && hasNoSearchableTokens(query);
      const tierHint = query && !unsearchable && warnings.length === 0 ? localModelHint(json, effectiveStatus) : null;
      if (tierHint) {
        warnings.push(tierHint);
        console.error(tierHint);
      }
      if (json && query) {
        console.log(
          JSON.stringify(
            {
              query,
              tier: tierToken(searched),
              tier_detail: tierDetail(searched),
              dropped: searched?.missing ?? 0,
              unindexed: searched?.unindexed ?? 0,
              ...searched?.topScore != null ? { top_score: searched.topScore } : {},
              shown: 0,
              total: tagged.length,
              ...warnings.length ? { warnings } : {},
              ...unsearchable ? { unsearchable_query: true } : {},
              // Withheld when the query never parsed: the catalog has not been
              // shown to be missing anything, so inviting a gap report here
              // would file noise against a search that never ran.
              ...unsearchable ? {} : { report_gap: searchMissCommand(query, tierToken(searched)) },
              results: []
            },
            null,
            2
          )
        );
      } else if (json) console.log("[]");
      else {
        const criteria = [
          query ? `query "${query}"` : null,
          args.tag ? `tag "${args.tag}"` : null
        ].filter(Boolean);
        if (unsearchable) {
          console.error(c.error(`No searchable words in query "${query}".`));
          console.error("");
          console.error(
            c.warn(
              "  Word matching indexes the catalog in English, so a query written in another\n  script produces no terms to match and returns nothing. This is not a gap in\n  the catalog. Search in English; the on-screen copy of your video can stay\n  in any language."
            )
          );
        } else {
          console.log(`No items match ${criteria.join(" and ")}.`);
          if (query) {
            console.log("");
            console.log(c.dim("  Nothing in the catalog does this? Report the gap:"));
            console.log(c.dim(`  ${searchMissCommand(query, tierToken(searched))}`));
          }
        }
      }
      if (query) await offerLocalModel(0, json, config.registry, artifactRevision);
      if (unsearchable) finishCommand(1);
      return;
    }
    if (json) {
      const output = matching.map(catalogRow);
      if (!query) {
        console.log(JSON.stringify(output, null, 2));
        return;
      }
      console.log(
        JSON.stringify(
          {
            query,
            tier: tierToken(searched),
            tier_detail: tierDetail(searched),
            dropped: searched?.missing ?? 0,
            unindexed: searched?.unindexed ?? 0,
            ...searched?.topScore != null ? { top_score: searched.topScore } : {},
            shown: output.length,
            total: tagged.length,
            ...warnings.length ? { warnings } : {},
            // Carried on hits too, not just on zero results. The gaps that
            // actually get reported are the ones where the search returned
            // plausible items and none of them did the thing — a judgement
            // only the reader can make, so the command has to already be in
            // the envelope by the time they make it.
            report_gap: searchMissCommand(query, tierToken(searched)),
            results: output
          },
          null,
          2
        )
      );
      return;
    }
    if (searched) {
      const how = tierDetail(searched);
      const unshowable = searched.missing > 0 ? ` \xB7 ${searched.missing} ranked ${searched.missing === 1 ? "move" : "moves"} not in this registry` : "";
      console.log(c.dim(`  ${matching.length} of ${tagged.length} moves \xB7 ${how}${unshowable}`));
      if (searched.unindexed > 0) {
        const remedy = args["on-device"] === true ? "The published index is behind this registry." : "Re-run with --on-device to refresh it.";
        console.log(
          c.warn(
            `  ${searched.unindexed} of ${registryNames.size} moves are missing from the on-device index, so meaning search cannot return them. ${remedy}`
          )
        );
      }
      if (searched.localMode === "words") {
        if (warnings.length === 0) {
          const hint = localModelHint(json, effectiveStatus);
          if (hint) console.error(hint);
          await offerLocalModel(matching.length, json, config.registry, artifactRevision);
        }
      }
      if (query) {
        console.log(
          c.dim(`  None of these do it? ${searchMissCommand(query, tierToken(searched))}`)
        );
      }
    }
    if (interactive) {
      const options = matching.map((item) => ({
        value: item.name,
        label: item.name,
        hint: item.description
      }));
      const selected = await Ee({
        message: `${matching.length} items available \u2014 pick one to install`,
        options
      });
      if (q(selected)) {
        me("Cancelled.");
        finishCommand(0);
      }
      const result = await runAdd({
        name: selected,
        projectDir: dir,
        skipClipboard: false
      });
      for (const warning of result.warnings) {
        console.warn(c.warn(`Warning: ${warning}`));
      }
      console.log("");
      console.log(`${c.success("\u2713")} Installed ${c.accent(result.name)} (${result.type})`);
      const root = realpath(dir);
      for (const file of result.written) {
        console.log(`  ${c.dim(relative(root, file))}`);
      }
      if (result.snippet) {
        console.log("");
        console.log(c.dim("Include snippet:"));
        console.log(`  ${result.snippet}`);
      }
      return;
    }
    const NAME_COL = 28;
    const TYPE_COL = 12;
    console.log(
      `${c.bold("Name".padEnd(NAME_COL))}${c.bold("Type".padEnd(TYPE_COL))}${c.bold("Description")}`
    );
    console.log("-".repeat(80));
    for (const item of matching) {
      const type = item.type.replace("hyperframes:", "");
      const tags = item.tags?.length ? c.dim(` [${item.tags.join(", ")}]`) : "";
      console.log(
        `${c.cyan(item.name.padEnd(NAME_COL))}${type.padEnd(TYPE_COL)}${item.description}${tags}`
      );
    }
    console.log("");
    console.log(c.dim(`${matching.length} items. Run "hyperframes add <name>" to install.`));
  }
});
function catalogRow(item) {
  return {
    name: item.name,
    type: item.type.replace("hyperframes:", ""),
    title: item.title,
    description: item.description,
    tags: item.tags ?? [],
    ..."dimensions" in item && item.dimensions ? { dimensions: item.dimensions } : {},
    ..."duration" in item && item.duration ? { duration: item.duration } : {},
    ...item.preview ? { preview: item.preview } : {}
  };
}
function pickByName(items, names, registryNames) {
  const byName = new Map(items.map((item) => [item.name, item]));
  const ranked = names.map((name) => byName.get(name)).filter((item) => item !== void 0);
  return { ranked, missing: names.filter((name) => !registryNames.has(name)).length };
}
function countUnindexed(registryNames, indexedNames) {
  const indexed = new Set(indexedNames);
  let count = 0;
  for (const name of registryNames) {
    if (!indexed.has(name)) count += 1;
  }
  return count;
}
async function applySearch(items, query, registryNames, status) {
  const warnings = [];
  if (status.status === "ready") {
    try {
      const ranking = await localSemanticRanking(query);
      if (ranking) {
        const { ranked, missing } = pickByName(
          items,
          ranking.map((entry) => entry.name),
          registryNames
        );
        const best = ranked[0];
        if (best) {
          const scoreByName = new Map(ranking.map((entry) => [entry.name, entry.score]));
          return {
            items: ranked.slice(0, 25),
            localMode: "local-model",
            warnings,
            missing,
            unindexed: countUnindexed(registryNames, localVectorNames()),
            topScore: scoreByName.get(best.name) ?? null
          };
        }
      }
    } catch (error) {
      const warning = `on-device search did not run: ${error instanceof Error ? error.message : "unknown error"}`;
      warnings.push(warning);
      console.error(warning);
    }
  }
  const words = searchByWords(query, items, (item) => ({
    // Name and title are what an author types when they already know the move.
    strong: `${item.name} ${item.title}`,
    weak: `${item.description} ${(item.tags ?? []).join(" ")}`
  }));
  return { items: words, localMode: "words", warnings, missing: 0, unindexed: 0, topScore: null };
}
function tierToken(searched) {
  return searched?.localMode === "local-model" ? "on-device" : "words";
}
function tierDetail(searched) {
  return searched?.localMode === "local-model" ? "on-device meaning search" : "local word match";
}
function searchMissCommand(query, tier) {
  const quoted = query.replace(/(["\\$`])/g, "\\$1");
  return `npx hyperframes feedback --search-miss "${quoted}" --wanted "<the move you needed>" --tier ${tier}`;
}
function localModelHint(json, status) {
  if (!json && isAttendedTerminal()) return null;
  if (status?.status !== "not-asked") return null;
  return nonInteractiveConsentMessage();
}
async function offerLocalModel(matchCount, json, registryBaseUrl, artifactRevision) {
  if (json || !isAttendedTerminal()) return;
  if (localModelStatus().status !== "not-asked") return;
  const answer = await ue({
    message: downloadOfferMessage(matchCount),
    initialValue: true
  });
  if (q(answer)) return;
  if (recordLocalModelConsent(answer === true) !== (answer === true)) {
    console.error("  Could not save the answer in settings; `hyperframes doctor` says why.");
    return;
  }
  if (answer !== true) return;
  const vectors = hasLocalVectors() || await fetchLocalVectors(registryBaseUrl, { expectedRevision: artifactRevision });
  console.log(
    c.dim(
      vectors ? "  Run the search again to download the model and rank by meaning." : "  Could not fetch the catalog vectors; offline ranking stays off until they are available."
    )
  );
}
export {
  catalogRow,
  countUnindexed,
  catalog_default as default,
  examples,
  pickByName,
  searchMissCommand
};
