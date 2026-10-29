import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  ensureDOMParser
} from "./chunk-PFCFR3KZ.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import {
  require_lib,
  require_main
} from "./chunk-DUNOLIES.js";
import {
  readProjectFile
} from "./chunk-JFKL3WAE.js";
import "./chunk-GK4AIFIH.js";
import {
  ancestor,
  parse,
  simple
} from "./chunk-KRDUCZRT.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import {
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// src/commands/keyframes.ts
import { existsSync, readFileSync } from "fs";
import { resolve, dirname, basename, join, relative, sep } from "path";

// ../parsers/dist/gsapParserExports.js
var recast = __toESM(require_main(), 1);
var import_parser = __toESM(require_lib(), 1);
var GSAP_DEFAULT_DURATION = 0.5;
var BUILTIN_VAR_KEYS = /* @__PURE__ */ new Set(["duration", "ease", "delay"]);
var DROPPED_VAR_KEYS = /* @__PURE__ */ new Set([
  "onComplete",
  "onStart",
  "onUpdate",
  "onRepeat"
]);
var EXTRAS_KEYS = /* @__PURE__ */ new Set([
  "data",
  "stagger",
  "yoyo",
  "repeat",
  "repeatDelay",
  "snap",
  "overwrite",
  "immediateRender"
]);
var PROPERTY_GROUPS = {
  position: /* @__PURE__ */ new Set(["x", "y", "xPercent", "yPercent"]),
  scale: /* @__PURE__ */ new Set(["scale", "scaleX", "scaleY"]),
  size: /* @__PURE__ */ new Set(["width", "height"]),
  rotation: /* @__PURE__ */ new Set(["rotation", "skewX", "skewY"]),
  visual: /* @__PURE__ */ new Set(["opacity", "autoAlpha"]),
  other: /* @__PURE__ */ new Set()
};
var PROP_TO_GROUP = /* @__PURE__ */ new Map();
for (const [group, props] of Object.entries(PROPERTY_GROUPS)) {
  for (const p of props) PROP_TO_GROUP.set(p, group);
}
function classifyPropertyGroup(prop) {
  return PROP_TO_GROUP.get(prop) ?? "other";
}
function classifyTweenPropertyGroup(properties) {
  const groups = /* @__PURE__ */ new Set();
  for (const key of Object.keys(properties)) {
    if (key === "transformOrigin" || key === "_auto" || key === "data") continue;
    const g = classifyPropertyGroup(key);
    groups.add(g);
  }
  if (groups.size === 1) return groups.values().next().value;
  return void 0;
}
function buildArcPath(coords, curviness, autoRotate, isCubic) {
  const first = coords[0];
  if (coords.length < 2 || !first) return void 0;
  const segments = [];
  let waypoints;
  if (isCubic && coords.length >= 4) {
    waypoints = [first];
    for (let i = 1; i + 2 < coords.length; i += 3) {
      const cp1 = coords[i];
      const cp2 = coords[i + 1];
      const anchor = coords[i + 2];
      if (!cp1 || !cp2 || !anchor) continue;
      waypoints.push(anchor);
      segments.push({ curviness, cp1, cp2 });
    }
  } else {
    waypoints = coords;
    for (let i = 0; i < waypoints.length - 1; i++) segments.push({ curviness });
  }
  return { arcPath: { enabled: true, autoRotate, segments }, waypoints };
}
var roundPercentage = (percentage) => Math.round(percentage * 10) / 10;
function getObjectArrayKeyframeTiming(durations) {
  const steps = durations.map((duration) => duration ?? GSAP_DEFAULT_DURATION);
  if (!steps.every(
    (duration) => typeof duration === "number" && Number.isFinite(duration) && duration > 0
  )) {
    return null;
  }
  const totalDuration = steps.reduce((sum, duration) => sum + duration, 0);
  let cumulative = 0;
  return {
    percentages: steps.map((duration) => {
      cumulative += duration;
      return roundPercentage(cumulative / totalDuration * 100);
    }),
    totalDuration
  };
}
var SKIP_KEYS = /* @__PURE__ */ new Set([
  "type",
  "start",
  "end",
  "loc",
  "range",
  "__hfProvenance",
  "__hfOrder",
  "__hfSiteStart"
]);
var FUNCTION_TYPES = /* @__PURE__ */ new Set([
  "ArrowFunctionExpression",
  "FunctionExpression",
  "FunctionDeclaration"
]);
var GSAP_METHODS = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
var MAX_DEPTH = 8;
var MAX_ITERS = 512;
function isFunctionNode(node) {
  return !!node && FUNCTION_TYPES.has(node.type);
}
function isNode(x) {
  return !!x && typeof x === "object" && typeof x.type === "string";
}
function transformChildren(node, fn) {
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key) || isNonValueIdentifierSlot(node, key)) continue;
    const child = node[key];
    if (Array.isArray(child)) {
      for (let i = 0; i < child.length; i++) child[i] = fn(child[i]);
    } else {
      node[key] = fn(child);
    }
  }
}
function cloneNode(node) {
  return structuredClone(node);
}
function collectPatternNames(pattern, out) {
  if (pattern?.type === "Identifier") out.add(pattern.name);
  else if (pattern?.type === "AssignmentPattern") collectPatternNames(pattern.left, out);
  else if (pattern?.type === "RestElement") collectPatternNames(pattern.argument, out);
}
function boundPatterns(node) {
  if (isFunctionNode(node)) return node.params ?? [];
  if (node.type === "VariableDeclarator") return [node.id];
  if (node.type === "CatchClause") return [node.param];
  if (node.type === "AssignmentExpression" && node.left?.type === "Identifier") return [node.left];
  return [];
}
function collectBoundNames(root) {
  const names = /* @__PURE__ */ new Set();
  const visit = (node) => {
    if (!isNode(node)) return node;
    for (const pattern of boundPatterns(node)) collectPatternNames(pattern, names);
    transformChildren(node, visit);
    return node;
  };
  visit(root);
  return names;
}
function isNonValueIdentifierSlot(node, key) {
  if (node.computed) return false;
  return node.type === "MemberExpression" && key === "property" || node.type === "Property" && key === "key";
}
function substituteParams(node, bindings) {
  const shadowed = collectBoundNames(node);
  let effective = bindings;
  if (shadowed.size > 0) {
    effective = new Map(bindings);
    for (const name of shadowed) effective.delete(name);
  }
  if (effective.size === 0) return node;
  return replace(node, effective);
}
function replace(node, bindings) {
  if (!isNode(node)) return node;
  if (node.type === "Identifier" && bindings.has(node.name)) {
    return cloneNode(bindings.get(node.name));
  }
  transformChildren(node, (child) => replace(child, bindings));
  return node;
}
function tagProvenance(node, provenance) {
  if (node && typeof node === "object") node.__hfProvenance = provenance;
  return node;
}
function readProvenance(node) {
  return node?.__hfProvenance;
}
function numericLiteral(value) {
  return { type: "Literal", value, raw: String(value) };
}
function walkNodes(node, fn) {
  if (!isNode(node)) return;
  fn(node);
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) continue;
    const child = node[key];
    if (Array.isArray(child)) for (const c2 of child) walkNodes(c2, fn);
    else walkNodes(child, fn);
  }
}
function timelineRootName(call) {
  let obj = call.callee?.object;
  while (obj?.type === "CallExpression") obj = obj.callee?.object;
  return obj?.type === "Identifier" ? obj.name : null;
}
function isTimelineRooted(call, timelineVar) {
  if (timelineRootName(call) !== timelineVar) return false;
  return call.callee?.property?.type === "Identifier" && GSAP_METHODS.has(call.callee.property.name);
}
function isAddLabelCall(call, timelineVar) {
  return timelineRootName(call) === timelineVar && call.callee?.property?.name === "addLabel";
}
function containsTimelineCall(node, timelineVar) {
  let found = false;
  walkNodes(node, (n) => {
    if (n.type === "CallExpression" && isTimelineRooted(n, timelineVar)) found = true;
  });
  return found;
}
function rangeOf(node) {
  return typeof node.start === "number" && typeof node.end === "number" ? [node.start, node.end] : void 0;
}
var SAFE_DEFAULT_NODES = /* @__PURE__ */ new Set([
  "ArrayExpression",
  "BinaryExpression",
  "ChainExpression",
  "ConditionalExpression",
  "Identifier",
  "Literal",
  "LogicalExpression",
  "MemberExpression",
  "ObjectExpression",
  "Property",
  "SpreadElement",
  "TemplateElement",
  "TemplateLiteral",
  "UnaryExpression"
]);
function isSafeDefaultExpression(node, earlierParams) {
  let safe = true;
  const visit = (current, parent, key) => {
    if (!isNode(current) || !safe) return;
    if (!SAFE_DEFAULT_NODES.has(current.type)) {
      safe = false;
      return;
    }
    if (current.type === "UnaryExpression" && current.operator === "delete") {
      safe = false;
      return;
    }
    if (current.type === "Identifier") {
      const nonValue = parent && key ? isNonValueIdentifierSlot(parent, key) : false;
      if (!nonValue && current.name !== "undefined" && !earlierParams.has(current.name)) {
        safe = false;
      }
      return;
    }
    for (const childKey of Object.keys(current)) {
      if (SKIP_KEYS.has(childKey)) continue;
      const child = current[childKey];
      if (Array.isArray(child)) {
        for (const item of child) visit(item, current, childKey);
      } else {
        visit(child, current, childKey);
      }
    }
  };
  visit(node);
  return safe;
}
var SUPPORTED_PARAMS_CACHE = /* @__PURE__ */ new WeakMap();
function supportedParam(param, earlier) {
  if (param.type === "Identifier") return { name: param.name };
  if (param.type !== "AssignmentPattern" || param.left?.type !== "Identifier") return null;
  if (!isSafeDefaultExpression(param.right, earlier)) return null;
  return { name: param.left.name, defaultExpression: param.right };
}
function supportedParams(fn) {
  if (SUPPORTED_PARAMS_CACHE.has(fn)) return SUPPORTED_PARAMS_CACHE.get(fn) ?? null;
  const params = [];
  const earlier = /* @__PURE__ */ new Set();
  for (const param of fn.params ?? []) {
    const parsed = supportedParam(param, earlier);
    if (!parsed) {
      SUPPORTED_PARAMS_CACHE.set(fn, null);
      return null;
    }
    params.push(parsed);
    earlier.add(parsed.name);
  }
  SUPPORTED_PARAMS_CACHE.set(fn, params);
  return params;
}
function isShapeEligible(fn) {
  return isFunctionNode(fn) && fn.body?.type === "BlockStatement" && supportedParams(fn) !== null;
}
function callsAny(node, names) {
  let hit = false;
  walkNodes(node, (n) => {
    if (n.type === "CallExpression" && n.callee?.type === "Identifier" && names.has(n.callee.name)) {
      hit = true;
    }
  });
  return hit;
}
function varDeclHelper(stmt) {
  if (stmt.declarations?.length !== 1) return null;
  const d = stmt.declarations[0];
  return d.id?.type === "Identifier" && isShapeEligible(d.init) ? [d.id.name, d.init] : null;
}
function helperFromStatement(stmt) {
  if (stmt.type === "FunctionDeclaration") {
    return stmt.id && isShapeEligible(stmt) ? [stmt.id.name, stmt] : null;
  }
  if (stmt.type === "VariableDeclaration") return varDeclHelper(stmt);
  return null;
}
function gatherHelperCandidates(program) {
  const candidates = /* @__PURE__ */ new Map();
  for (const stmt of program.body ?? []) {
    const helper = helperFromStatement(stmt);
    if (helper) candidates.set(helper[0], helper[1]);
  }
  return candidates;
}
function timelineBuildingNames(candidates, timelineVar) {
  const building = /* @__PURE__ */ new Set();
  for (const [name, fn] of candidates) {
    if (containsTimelineCall(fn.body, timelineVar)) building.add(name);
  }
  for (let changed = true; changed; ) {
    changed = false;
    for (const [name, fn] of candidates) {
      if (!building.has(name) && callsAny(fn.body, building)) {
        building.add(name);
        changed = true;
      }
    }
  }
  return building;
}
function bump(counts, key) {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
function undefinedIdentifier() {
  return { type: "Identifier", name: "undefined" };
}
function isExplicitUndefined(node) {
  return node?.type === "Identifier" && node.name === "undefined" || node?.type === "UnaryExpression" && node.operator === "void" && node.argument?.type === "Literal" && node.argument.value === 0;
}
function resolveHelperBindings(call, params) {
  if (call.arguments?.some((arg) => arg?.type === "SpreadElement")) return null;
  const bindings = /* @__PURE__ */ new Map();
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const arg = call.arguments?.[i];
    if (arg && !isExplicitUndefined(arg)) {
      bindings.set(param.name, arg);
    } else if (param.defaultExpression) {
      bindings.set(param.name, substituteParams(cloneNode(param.defaultExpression), bindings));
    } else {
      bindings.set(param.name, undefinedIdentifier());
    }
  }
  return bindings;
}
function statementHelperCall(node, names) {
  if (node.type !== "ExpressionStatement") return void 0;
  const expression = node.expression;
  if (expression?.type !== "CallExpression" || expression.callee?.type !== "Identifier") {
    return void 0;
  }
  return names.has(expression.callee.name) ? expression : void 0;
}
function safelyDroppable(program, candidates) {
  const names = new Set(candidates.keys());
  const totalIds = /* @__PURE__ */ new Map();
  const stmtCalls = /* @__PURE__ */ new Map();
  const unbindable = /* @__PURE__ */ new Set();
  walkNodes(program, (n) => {
    if (n.type === "Identifier" && names.has(n.name)) bump(totalIds, n.name);
    const call = statementHelperCall(n, names);
    if (!call) return;
    bump(stmtCalls, call.callee.name);
    const fn = candidates.get(call.callee.name);
    const params = fn && supportedParams(fn);
    if (!params || !resolveHelperBindings(call, params)) unbindable.add(call.callee.name);
  });
  const safe = /* @__PURE__ */ new Map();
  for (const [name, fn] of candidates) {
    if (!unbindable.has(name) && (totalIds.get(name) ?? 0) === 1 + (stmtCalls.get(name) ?? 0)) {
      safe.set(name, fn);
    }
  }
  return safe;
}
function collectInlinableHelpers(program, timelineVar) {
  const candidates = gatherHelperCandidates(program);
  if (candidates.size === 0) return candidates;
  const building = timelineBuildingNames(candidates, timelineVar);
  for (const name of [...candidates.keys()]) if (!building.has(name)) candidates.delete(name);
  if (candidates.size === 0) return candidates;
  return safelyDroppable(program, candidates);
}
function isHelperDecl(stmt, helpers) {
  if (stmt.type === "FunctionDeclaration") return !!stmt.id && helpers.get(stmt.id.name) === stmt;
  if (stmt.type === "VariableDeclaration" && stmt.declarations?.length === 1) {
    const d = stmt.declarations[0];
    return d.id?.type === "Identifier" && helpers.get(d.id.name) === d.init;
  }
  return false;
}
function bodyStatements(node) {
  if (node?.type === "BlockStatement") return node.body ?? [];
  return node ? [{ type: "ExpressionStatement", expression: node }] : [];
}
function tagTimelineCalls(stmts, prov, ctx) {
  for (const stmt of stmts) {
    const calls = [];
    walkNodes(stmt, (n) => {
      if (n.type === "CallExpression" && (isTimelineRooted(n, ctx.timelineVar) || isAddLabelCall(n, ctx.timelineVar)))
        calls.push(n);
    });
    calls.sort((a, b) => a.callee.property.start - b.callee.property.start);
    for (const n of calls) {
      tagProvenance(n, { ...prov });
      n.__hfOrder = ctx.order.n++;
      n.__hfSiteStart = ctx.rootStart;
    }
  }
}
function expandBody(bodyStmts, bindings, prov, ctx) {
  const block = substituteParams(cloneNode({ type: "BlockStatement", body: bodyStmts }), bindings);
  tagProvenance(block, prov);
  tagTimelineCalls(block.body, prov, ctx);
  block.body = expandStatements(block.body, { ...ctx, depth: ctx.depth + 1 });
  return [block];
}
function inlineHelper(call, ctx) {
  const fn = ctx.helpers.get(call.callee.name);
  if (!fn) return null;
  const params = supportedParams(fn);
  if (!params) return null;
  const bindings = resolveHelperBindings(call, params);
  if (!bindings) return null;
  const prov = {
    kind: "helper",
    fn: call.callee.name,
    callSite: ++ctx.site.n,
    sourceRange: rangeOf(call)
  };
  return expandBody(fn.body.body, bindings, prov, ctx);
}
function assignStep(update, resolve2) {
  if (update.operator === "+=") return asNum(resolve2(update.right));
  if (update.operator === "-=") {
    const s = asNum(resolve2(update.right));
    return s === void 0 ? void 0 : -s;
  }
  if (update.operator === "=" && update.right?.type === "BinaryExpression") {
    return asNum(resolve2(update.right.right));
  }
  return void 0;
}
function updatedVarName(update) {
  if (update?.type === "UpdateExpression") return update.argument?.name ?? null;
  if (update?.type === "AssignmentExpression") return update.left?.name ?? null;
  return null;
}
function loopStep(update, varName, resolve2) {
  if (updatedVarName(update) !== varName) return void 0;
  if (update.type === "UpdateExpression") return update.operator === "++" ? 1 : -1;
  return assignStep(update, resolve2);
}
function asNum(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : void 0;
}
function loopSatisfied(op, x, end) {
  if (op === "<") return x < end;
  if (op === "<=") return x <= end;
  if (op === ">") return x > end;
  if (op === ">=") return x >= end;
  return false;
}
function forInitVar(init) {
  if (init?.type !== "VariableDeclaration" || init.declarations?.length !== 1) return null;
  const d = init.declarations[0];
  return d.id?.type === "Identifier" ? { name: d.id.name, initExpr: d.init } : null;
}
function parseForHeader(stmt, resolve2) {
  const iv = forInitVar(stmt.init);
  const test = stmt.test;
  if (!iv || test?.type !== "BinaryExpression" || test.left?.name !== iv.name) return null;
  const start = asNum(resolve2(iv.initExpr));
  const end = asNum(resolve2(test.right));
  const step = loopStep(stmt.update, iv.name, resolve2);
  if (start === void 0 || end === void 0 || !step) return null;
  return { v: iv.name, start, end, op: test.operator, step };
}
function unrollFor(stmt, ctx) {
  const h = parseForHeader(stmt, ctx.resolve);
  if (!h) return null;
  const body = bodyStatements(stmt.body);
  const out = [];
  const site = ++ctx.site.n;
  let iteration = 0;
  for (let x = h.start; loopSatisfied(h.op, x, h.end); x += h.step) {
    if (iteration >= MAX_ITERS) return null;
    const prov = {
      kind: "loop",
      callSite: site,
      iteration,
      sourceRange: rangeOf(stmt)
    };
    out.push(...expandBody(body, /* @__PURE__ */ new Map([[h.v, numericLiteral(x)]]), prov, ctx));
    iteration++;
  }
  return out;
}
function forOfVarName(left) {
  if (left?.type === "VariableDeclaration") {
    const id = left.declarations?.[0]?.id;
    return id?.type === "Identifier" ? id.name : null;
  }
  return left?.type === "Identifier" ? left.name : null;
}
function unrollOverArray(elements, body, elName, idxName, range, ctx) {
  const out = [];
  const site = ++ctx.site.n;
  elements.forEach((el, i) => {
    if (!el) return;
    const bindings = /* @__PURE__ */ new Map();
    if (elName) bindings.set(elName, el);
    if (idxName) bindings.set(idxName, numericLiteral(i));
    const prov = { kind: "loop", callSite: site, iteration: i, sourceRange: range };
    out.push(...expandBody(body, bindings, prov, ctx));
  });
  return out;
}
function unrollForOf(stmt, ctx) {
  if (stmt.right?.type !== "ArrayExpression") return null;
  const elName = forOfVarName(stmt.left);
  if (!elName) return null;
  return unrollOverArray(
    stmt.right.elements ?? [],
    bodyStatements(stmt.body),
    elName,
    null,
    rangeOf(stmt),
    ctx
  );
}
function callbackParamNames(cb) {
  const names = [];
  for (const p of [cb.params?.[0], cb.params?.[1]]) {
    if (!p) names.push(null);
    else if (p.type !== "Identifier") return null;
    else names.push(p.name);
  }
  return { el: names[0], idx: names[1] };
}
function isForEachCall(callee) {
  return callee?.type === "MemberExpression" && callee.property?.name === "forEach" && callee.object?.type === "ArrayExpression";
}
function forEachTarget(call) {
  if (!isForEachCall(call.callee)) return null;
  const cb = call.arguments?.[0];
  return isFunctionNode(cb) ? { elements: call.callee.object.elements ?? [], cb } : null;
}
function unrollForEach(call, ctx) {
  const target = forEachTarget(call);
  if (!target) return null;
  const params = callbackParamNames(target.cb);
  if (!params) return null;
  return unrollOverArray(
    target.elements,
    bodyStatements(target.cb.body),
    params.el,
    params.idx,
    rangeOf(call),
    ctx
  );
}
function expandCall(call, ctx) {
  if (call.callee?.type === "Identifier" && ctx.helpers.has(call.callee.name)) {
    return inlineHelper(call, ctx);
  }
  return unrollForEach(call, ctx);
}
function expandStatement(stmt, ctx) {
  if (ctx.depth >= MAX_DEPTH) return null;
  if (stmt.type === "ForStatement") return unrollFor(stmt, ctx);
  if (stmt.type === "ForOfStatement") return unrollForOf(stmt, ctx);
  if (stmt.type === "ExpressionStatement" && stmt.expression?.type === "CallExpression") {
    return expandCall(stmt.expression, ctx);
  }
  return null;
}
function expandStatements(stmts, ctx) {
  const out = [];
  for (const stmt of stmts) {
    const expanded = expandStatement(stmt, ctx);
    if (expanded) out.push(...expanded);
    else out.push(stmt);
  }
  return out;
}
function inlineComputedTimelines(ast, timelineVar, resolve2) {
  const helpers = collectInlinableHelpers(ast, timelineVar);
  const ctx = {
    helpers,
    timelineVar,
    resolve: resolve2,
    depth: 0,
    site: { n: 0 },
    order: { n: 0 },
    rootStart: 0
  };
  const body = (ast.body ?? []).filter((stmt) => !isHelperDecl(stmt, helpers));
  ast.body = body.flatMap((stmt) => {
    ctx.rootStart = stmt.start;
    return expandStatements([stmt], ctx);
  });
}
var GSAP_METHODS2 = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
var QUERY_METHODS = /* @__PURE__ */ new Set(["querySelector", "querySelectorAll"]);
var ITERATION_METHODS = /* @__PURE__ */ new Set(["forEach", "map"]);
var SCOPE_NODE_TYPES = /* @__PURE__ */ new Set([
  "Program",
  "BlockStatement",
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
function parseProgram(script) {
  try {
    return parse(script, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true
    });
  } catch {
    return parse(script, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true
    });
  }
}
var CONST_NODES = /* @__PURE__ */ Symbol("hf.constNodes");
function constNodesOf(scope) {
  return scope[CONST_NODES];
}
var MATH_FNS = /* @__PURE__ */ new Set(["min", "max", "round", "floor", "ceil", "abs", "sqrt", "sign", "trunc"]);
var MATH_CONSTS = { PI: Math.PI, E: Math.E, SQRT2: Math.SQRT2 };
function resolveMemberNode(node, scope) {
  if (node.object?.type === "Identifier" && node.object.name === "Math") {
    const key = node.property?.name;
    return typeof key === "string" ? MATH_CONSTS[key] : void 0;
  }
  const objNode = resolveConstNode(node.object, scope);
  if (!objNode) return void 0;
  let valueNode;
  if (node.computed) {
    const idx = resolveNode(node.property, scope);
    if (objNode.type === "ArrayExpression" && typeof idx === "number") {
      valueNode = objNode.elements?.[idx];
    } else if (objNode.type === "ObjectExpression" && (typeof idx === "string" || typeof idx === "number")) {
      valueNode = findPropertyNode(objNode, String(idx));
    }
  } else if (objNode.type === "ObjectExpression") {
    valueNode = findPropertyNode(objNode, node.property?.name ?? node.property?.value);
  }
  return valueNode ? resolveNode(valueNode, scope) : void 0;
}
function resolveConstMember(objNode, node, scope) {
  if (!node.computed) {
    return objNode.type === "ObjectExpression" ? findPropertyNode(objNode, node.property?.name ?? node.property?.value) : void 0;
  }
  const idx = resolveNode(node.property, scope);
  if (objNode.type === "ArrayExpression" && typeof idx === "number") return objNode.elements?.[idx];
  if (objNode.type === "ObjectExpression") return findPropertyNode(objNode, String(idx));
  return void 0;
}
function resolveConstNode(node, scope) {
  if (!node) return void 0;
  if (node.type === "ArrayExpression" || node.type === "ObjectExpression") return node;
  if (node.type === "Identifier") return constNodesOf(scope)?.get(node.name);
  if (node.type !== "MemberExpression") return void 0;
  const objNode = resolveConstNode(node.object, scope);
  return objNode ? resolveConstMember(objNode, node, scope) : void 0;
}
function resolveNode(node, scope) {
  if (!node) return void 0;
  if (node.type === "NumericLiteral" || node.type === "Literal" && typeof node.value === "number")
    return node.value;
  if (node.type === "StringLiteral" || node.type === "Literal" && typeof node.value === "string")
    return node.value;
  if (node.type === "BooleanLiteral" || node.type === "Literal" && typeof node.value === "boolean")
    return node.value;
  if (node.type === "UnaryExpression" && node.operator === "-" && node.argument) {
    const val = resolveNode(node.argument, scope);
    return typeof val === "number" ? -val : void 0;
  }
  if (node.type === "BinaryExpression") {
    const left = resolveNode(node.left, scope);
    const right = resolveNode(node.right, scope);
    if (typeof left === "number" && typeof right === "number") {
      switch (node.operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return right !== 0 ? left / right : void 0;
      }
    }
    if (typeof left === "string" && node.operator === "+") return left + String(right ?? "");
    if (typeof right === "string" && node.operator === "+") return String(left ?? "") + right;
  }
  if (node.type === "Identifier" && scope.has(node.name)) {
    return scope.get(node.name);
  }
  if (node.type === "TemplateLiteral" && node.expressions?.length === 0) {
    return node.quasis?.[0]?.value?.cooked ?? void 0;
  }
  if (node.type === "MemberExpression") {
    return resolveMemberNode(node, scope);
  }
  if (node.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.object?.type === "Identifier" && node.callee.object.name === "Math" && MATH_FNS.has(node.callee.property?.name)) {
    const args = (node.arguments ?? []).map((a) => resolveNode(a, scope));
    if (args.every((a) => typeof a === "number")) {
      return Math[node.callee.property.name](...args);
    }
  }
  return void 0;
}
function extractLiteralValue(node, scope) {
  return resolveNode(node, scope);
}
function selectorFromQueryCall(node, scope) {
  if (node?.type !== "CallExpression") return null;
  const callee = node.callee;
  if (callee?.type !== "MemberExpression" || callee.property?.type !== "Identifier") return null;
  const method = callee.property.name;
  const argValue = resolveNode(node.arguments?.[0], scope);
  if (typeof argValue !== "string" || argValue.length === 0) return null;
  if (QUERY_METHODS.has(method) || method === "toArray") return argValue;
  if (method === "getElementById") return `#${argValue}`;
  return null;
}
function enclosingScopeNodeFromAncestors(ancestors, includeBlocks = true) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    const node = ancestors[i];
    if (node && SCOPE_NODE_TYPES.has(node.type) && (includeBlocks || node.type !== "BlockStatement")) {
      return node;
    }
  }
  return null;
}
function scopeChainFromAncestors(ancestors) {
  const chain = [];
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const node = ancestors[i];
    if (node && SCOPE_NODE_TYPES.has(node.type)) chain.push(node);
  }
  return chain;
}
function nearestExpandedScopeFromAncestors(ancestors) {
  for (let index = ancestors.length - 2; index >= 0; index--) {
    const candidate = ancestors[index];
    if (candidate?.type === "BlockStatement" && readProvenance(candidate)) return candidate;
  }
  return void 0;
}
function findVisibleIdentifierDeclaration(name, ancestors, index, usageStart = Number.POSITIVE_INFINITY) {
  const declarations = index.declarationsByName.get(name) ?? [];
  const expandedScopeNode = nearestExpandedScopeFromAncestors(ancestors);
  for (const scopeNode of scopeChainFromAncestors(ancestors)) {
    const candidates = declarations.filter(
      (declaration) => declaration.scopeNode === scopeNode && (!declaration.expandedScopeNode || declaration.expandedScopeNode === expandedScopeNode) && (declaration.kind === "var" || declaration.kind === "param" || declaration.node.start < usageStart)
    ).sort((left, right) => right.node.start - left.node.start);
    if (candidates[0]) return candidates[0];
  }
  return void 0;
}
function collectIdentifierBindingIndex(ast) {
  const declarationsByName = /* @__PURE__ */ new Map();
  const reassignedDeclarations = /* @__PURE__ */ new Set();
  ancestor(ast, {
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      if (!name) return;
      const declaration = ancestors.at(-2);
      const kind = declaration?.kind;
      if (!kind) return;
      const includeBlocks = declaration?.type !== "VariableDeclaration" || kind !== "var";
      const scopeNode = enclosingScopeNodeFromAncestors(ancestors, includeBlocks);
      const expandedScopeNode = nearestExpandedScopeFromAncestors(ancestors);
      const entries = declarationsByName.get(name) ?? [];
      entries.push({ node, scopeNode, expandedScopeNode, name, kind });
      declarationsByName.set(name, entries);
    },
    FunctionDeclaration: indexFunctionParameters,
    FunctionExpression: indexFunctionParameters,
    ArrowFunctionExpression: indexFunctionParameters
  });
  const index = { declarationsByName, reassignedDeclarations };
  ancestor(ast, {
    AssignmentExpression(node, _, ancestors) {
      const name = node.left?.type === "Identifier" ? node.left.name : void 0;
      if (!name) return;
      const declaration = findVisibleIdentifierDeclaration(name, ancestors, index, node.start);
      if (declaration) reassignedDeclarations.add(declaration.node);
    }
  });
  return index;
  function indexFunctionParameters(node) {
    for (const parameter of node.params ?? []) {
      if (parameter?.type !== "Identifier") continue;
      const entries = declarationsByName.get(parameter.name) ?? [];
      entries.push({ node: parameter, scopeNode: node, name: parameter.name, kind: "param" });
      declarationsByName.set(parameter.name, entries);
    }
  }
}
function addBinding(bindings, scopeNode, name, selector) {
  let scoped = bindings.get(scopeNode);
  if (!scoped) {
    scoped = /* @__PURE__ */ new Map();
    bindings.set(scopeNode, scoped);
  }
  if (!scoped.has(name)) scoped.set(name, selector);
}
function lookupBindingFromAncestors(name, ancestors, bindings) {
  for (const scopeNode of scopeChainFromAncestors(ancestors)) {
    const selector = bindings.get(scopeNode)?.get(name);
    if (selector !== void 0) return selector;
  }
  return bindings.get(null)?.get(name) ?? null;
}
function isFunctionNode2(node) {
  return node?.type === "ArrowFunctionExpression" || node?.type === "FunctionExpression" || node?.type === "FunctionDeclaration";
}
function resolveCollectionSelector(node, ancestors, scope, bindings) {
  if (node?.type === "Identifier")
    return lookupBindingFromAncestors(node.name, ancestors, bindings);
  if (node?.type === "CallExpression") return selectorFromQueryCall(node, scope);
  return null;
}
function collectScopeBindings(ast) {
  const bindings = /* @__PURE__ */ new Map();
  const ambiguousBindings = /* @__PURE__ */ new Set();
  const constNodes = /* @__PURE__ */ new Map();
  Object.defineProperty(bindings, CONST_NODES, { value: constNodes, enumerable: false });
  simple(ast, {
    VariableDeclarator(node) {
      const name = node.id?.name;
      const init = node.init;
      if (!name || !init) return;
      if (init.type === "ArrayExpression" || init.type === "ObjectExpression") {
        constNodes.set(name, init);
        return;
      }
      const val = resolveNode(init, bindings);
      if (val === void 0 || ambiguousBindings.has(name)) return;
      const existing = bindings.get(name);
      if (existing !== void 0 && existing !== val) {
        bindings.delete(name);
        ambiguousBindings.add(name);
      } else if (existing === void 0) {
        bindings.set(name, val);
      }
    }
  });
  return bindings;
}
function collectTargetBindings(ast, scope, identifierBindings) {
  const bindings = /* @__PURE__ */ new Map();
  ancestor(ast, {
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      const selector = selectorFromQueryCall(node.init, scope);
      if (name && selector !== null) {
        const declaration = ancestors.at(-2);
        const includeBlocks = declaration?.type !== "VariableDeclaration" || declaration.kind !== "var";
        addBinding(
          bindings,
          enclosingScopeNodeFromAncestors(ancestors, includeBlocks),
          name,
          selector
        );
      }
    },
    AssignmentExpression(node, _, ancestors) {
      const left = node.left;
      const selector = selectorFromQueryCall(node.right, scope);
      if (left?.type === "Identifier" && selector !== null) {
        const declaration = findVisibleIdentifierDeclaration(
          left.name,
          ancestors,
          identifierBindings,
          node.start
        );
        addBinding(
          bindings,
          declaration?.scopeNode ?? nearestExpandedScopeFromAncestors(ancestors) ?? enclosingScopeNodeFromAncestors(ancestors),
          left.name,
          selector
        );
      }
    }
  });
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node, _, ancestors) {
      const callee = node.callee;
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && ITERATION_METHODS.has(callee.property.name)) {
        const collectionSelector = resolveCollectionSelector(
          callee.object,
          ancestors,
          scope,
          bindings
        );
        const fn = node.arguments?.[0];
        const param = fn?.params?.[0];
        if (collectionSelector && param?.type === "Identifier" && isFunctionNode2(fn)) {
          addBinding(bindings, fn, param.name, collectionSelector);
        }
      }
    }
  });
  const COLLECTION_ALIAS_METHODS = /* @__PURE__ */ new Set(["slice", "filter", "concat", "reverse"]);
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      const init = node.init;
      if (!name || !init) return;
      let sourceVar;
      if (init.type === "MemberExpression" && init.object?.type === "Identifier") {
        sourceVar = init.object.name;
      } else if (init.type === "CallExpression" && init.callee?.type === "MemberExpression" && init.callee.object?.type === "Identifier" && init.callee.property?.type === "Identifier" && COLLECTION_ALIAS_METHODS.has(init.callee.property.name)) {
        sourceVar = init.callee.object.name;
      }
      if (!sourceVar) return;
      const selector = lookupBindingFromAncestors(sourceVar, ancestors, bindings);
      if (selector)
        addBinding(bindings, enclosingScopeNodeFromAncestors(ancestors), name, selector);
    }
  });
  return bindings;
}
function resolveTargetSelector(node, ancestors, scope, bindings) {
  if (!node) return null;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    return typeof node.value === "string" ? node.value : null;
  }
  if (node.type === "Identifier") {
    return lookupBindingFromAncestors(node.name, ancestors, bindings);
  }
  if (node.type === "CallExpression") {
    return selectorFromQueryCall(node, scope);
  }
  if (node.type === "ArrayExpression") {
    const parts = node.elements.map((el) => resolveTargetSelector(el, ancestors, scope, bindings)).filter((s) => typeof s === "string" && s.length > 0);
    return parts.length > 0 ? parts.join(", ") : null;
  }
  if (node.type === "MemberExpression" && node.object?.type === "Identifier") {
    return lookupBindingFromAncestors(node.object.name, ancestors, bindings);
  }
  return null;
}
function hasUnresolvedArrayPart(node, ancestors, scope, bindings) {
  return node?.type === "ArrayExpression" && node.elements.some(
    (el) => !resolveTargetSelector(el, ancestors, scope, bindings) || hasUnresolvedArrayPart(el, ancestors, scope, bindings)
  );
}
function describeProxyTarget(targetNode, varsNode, scope) {
  const objNode = targetNode?.type === "ObjectExpression" ? targetNode : targetNode?.type === "Identifier" ? resolveConstNode(targetNode, scope) : void 0;
  if (objNode?.type !== "ObjectExpression") return null;
  const onUpdate = findPropertyNode(varsNode, "onUpdate");
  const driven = onUpdate ? drivenDomChannel(onUpdate) : void 0;
  if (driven) return `proxy \u2192 ${driven}`;
  return "dwell/hold";
}
function isStyleAssignmentTarget(left) {
  return left?.type === "MemberExpression" && left.object?.type === "MemberExpression" && left.object.property?.name === "style" && !!left.property?.name;
}
function drivenDomChannel(fnNode) {
  let found;
  simple(fnNode, {
    CallExpression(node) {
      if (node.callee?.type === "MemberExpression" && node.callee.property?.name === "setAttribute" && typeof node.arguments?.[0]?.value === "string") {
        found ??= node.arguments[0].value;
      }
    },
    AssignmentExpression(node) {
      const left = node.left;
      if (isStyleAssignmentTarget(left)) found ??= `style.${left.property.name}`;
    }
  });
  return found;
}
function isObjectProperty(prop) {
  return prop?.type === "ObjectProperty" || prop?.type === "Property";
}
function propKeyName(prop) {
  return prop?.key?.name ?? prop?.key?.value;
}
function findPropertyNode(varsArgNode, key) {
  if (varsArgNode?.type !== "ObjectExpression") return void 0;
  for (const prop of varsArgNode.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    if (propKeyName(prop) === key) return prop.value;
  }
  return void 0;
}
function extractRawPropertySource(varsArgNode, key, source) {
  const node = findPropertyNode(varsArgNode, key);
  return node ? source.slice(node.start, node.end) : void 0;
}
function objectExpressionToRecord(node, scope, source) {
  const result = {};
  if (node?.type !== "ObjectExpression") return result;
  for (const prop of node.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    const key = prop.key?.name ?? prop.key?.value;
    if (!key) continue;
    const resolved = resolveNode(prop.value, scope);
    if (resolved !== void 0) {
      result[key] = resolved;
    } else {
      result[key] = `__raw:${source.slice(prop.value.start, prop.value.end)}`;
    }
  }
  return result;
}
function isGsapTimelineCall(node) {
  return node?.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.object?.name === "gsap" && node.callee.property?.name === "timeline";
}
function hasUnknownDuration(varsNode, scope) {
  if (!varsNode) return false;
  if (varsNode.type !== "ObjectExpression") return true;
  const props = varsNode.properties ?? [];
  if (props.some((p) => p.type === "SpreadElement")) return true;
  const prop = props.find((p) => isObjectProperty(p) && propKeyName(p) === "duration");
  return prop !== void 0 && typeof resolveNode(prop.value, scope) !== "number";
}
function staticMemberKey(node) {
  if (!node || node.type !== "MemberExpression") return null;
  if (node.computed) {
    const p = node.property;
    if (p?.type === "Literal" && typeof p.value === "string") return p.value;
    return null;
  }
  return node.property?.type === "Identifier" ? node.property.name : null;
}
function isStaticMemberRef(node) {
  return node?.type === "MemberExpression" && staticMemberKey(node) !== null;
}
function sameMemberAccess(a, b) {
  if (a?.type !== "MemberExpression" || b?.type !== "MemberExpression") return false;
  if (staticMemberKey(a) !== staticMemberKey(b) || staticMemberKey(a) === null) return false;
  const ao = a.object;
  const bo = b.object;
  if (ao?.type === "Identifier" && bo?.type === "Identifier") return ao.name === bo.name;
  if (ao?.type === "MemberExpression" && bo?.type === "MemberExpression")
    return sameMemberAccess(ao, bo);
  return false;
}
function timelineRootSource(ref, script) {
  return ref.kind === "identifier" ? ref.name : script.slice(ref.node.start, ref.node.end);
}
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function extractTimelineDefaults(callNode, scope) {
  const arg = callNode.arguments?.[0];
  if (!arg || arg.type !== "ObjectExpression") return void 0;
  const defaultsProp = arg.properties?.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "defaults"
  );
  if (!defaultsProp?.value || defaultsProp.value.type !== "ObjectExpression") return void 0;
  const result = {};
  for (const prop of defaultsProp.value.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    const key = propKeyName(prop);
    const val = resolveNode(prop.value, scope);
    if (key === "ease" && typeof val === "string") result.ease = val;
    if (key === "duration") {
      if (typeof val === "number") result.duration = val;
      else result.durationUnresolved = true;
    }
  }
  return Object.keys(result).length > 0 ? result : void 0;
}
function findTimelineVar(ast, scope) {
  let timelineVar = null;
  let ref = null;
  let timelineCount = 0;
  let defaults;
  const emptyScope = scope ?? /* @__PURE__ */ new Map();
  simple(ast, {
    VariableDeclarator(node) {
      if (isGsapTimelineCall(node.init)) {
        timelineCount += 1;
        if (!ref && node.id?.type === "Identifier") {
          timelineVar = node.id.name;
          ref = { kind: "identifier", name: node.id.name };
          defaults = extractTimelineDefaults(node.init, emptyScope);
        }
      }
    },
    AssignmentExpression(node) {
      if (isGsapTimelineCall(node.right)) {
        timelineCount += 1;
        if (!ref) {
          const left = node.left;
          if (left?.type === "Identifier") {
            timelineVar = left.name;
            ref = { kind: "identifier", name: left.name };
            defaults = extractTimelineDefaults(node.right, emptyScope);
          } else if (isStaticMemberRef(left)) {
            ref = { kind: "member", node: left };
            defaults = extractTimelineDefaults(node.right, emptyScope);
          }
        }
      }
    }
  });
  return { timelineVar, ref, timelineCount, defaults };
}
function isTimelineRootedCall(callNode, ref) {
  let obj = callNode.callee?.object;
  while (obj?.type === "CallExpression") {
    obj = obj.callee?.object;
  }
  if (ref.kind === "identifier") return obj?.type === "Identifier" && obj.name === ref.name;
  return sameMemberAccess(obj, ref.node);
}
function findAllTweenCalls(ast, ref, scope, targetBindings) {
  const results = [];
  function visit(node, ancestors) {
    if (!node || typeof node !== "object") return;
    const nodeAncestors = [...ancestors, node];
    if (node.type === "CallExpression") {
      const callee = node.callee;
      const gsapSetArg = node.arguments?.[0];
      const isGlobalSet = callee?.type === "MemberExpression" && callee.object?.type === "Identifier" && callee.object.name === "gsap" && callee.property?.type === "Identifier" && callee.property.name === "set" && (gsapSetArg?.type === "StringLiteral" || gsapSetArg?.type === "Literal" && typeof gsapSetArg.value === "string");
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && (isTimelineRootedCall(node, ref) || isGlobalSet) && GSAP_METHODS2.has(callee.property.name)) {
        const method = callee.property.name;
        const args = node.arguments;
        const selectorValue = args.length >= 1 ? resolveTargetSelector(args[0], nodeAncestors, scope, targetBindings) ?? "__unresolved__" : "__unresolved__";
        const partial = hasUnresolvedArrayPart(args[0], nodeAncestors, scope, targetBindings) ? { selectorPartial: true } : {};
        if (method === "fromTo" && args.length >= 3) {
          results.push({
            node,
            ancestors: nodeAncestors,
            method: "fromTo",
            selector: selectorValue,
            ...partial,
            fromArg: args[1],
            varsArg: args[2],
            positionArg: args[3]
          });
        } else if (method !== "fromTo" && args.length >= 2) {
          results.push({
            node,
            ancestors: nodeAncestors,
            method,
            selector: selectorValue,
            ...partial,
            varsArg: args[1],
            positionArg: args[2],
            ...isGlobalSet ? { global: true } : {}
          });
        }
      }
    }
    for (const key of Object.keys(node)) {
      if (key === "type" || key === "start" || key === "end" || key === "loc") continue;
      const child = node[key];
      if (Array.isArray(child)) {
        for (const item of child) {
          if (item && typeof item === "object" && item.type) visit(item, nodeAncestors);
        }
      } else if (child && typeof child === "object" && child.type) {
        visit(child, nodeAncestors);
      }
    }
  }
  visit(ast, []);
  return results;
}
var PERCENTAGE_KEY_RE = /^(\d+(?:\.\d+)?)%$/;
function tryResolveStringProp(propValue, scope, source) {
  const val = resolveNode(propValue, scope);
  if (typeof val === "string") return val;
  return source === void 0 ? void 0 : `__raw:${source.slice(propValue.start, propValue.end)}`;
}
function parsePercentageKeyframes(node, scope, source) {
  const keyframes = [];
  let ease;
  let easeEach;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.value ?? prop.key?.name;
    if (typeof key !== "string") continue;
    const pctMatch = PERCENTAGE_KEY_RE.exec(key);
    if (pctMatch) {
      if (!isPlainStep(prop.value)) return void 0;
      const percentage = Number.parseFloat(pctMatch[1] ?? "0");
      const record = objectExpressionToRecord(prop.value, scope, source);
      const properties = {};
      let kfEase;
      for (const [k, v] of Object.entries(record)) {
        if (k === "ease" && typeof v === "string") {
          kfEase = v;
        } else if (k === "duration") {
          continue;
        } else if (typeof v === "number" || typeof v === "string") {
          properties[k] = v;
        }
      }
      keyframes.push({ percentage, properties, ...kfEase ? { ease: kfEase } : {} });
    } else if (key === "ease") {
      ease = tryResolveStringProp(prop.value, scope, source) ?? ease;
    } else if (key === "easeEach") {
      easeEach = tryResolveStringProp(prop.value, scope, source) ?? easeEach;
    } else {
      return void 0;
    }
  }
  keyframes.sort((a, b) => a.percentage - b.percentage);
  return {
    format: "percentage",
    keyframes,
    ...ease ? { ease } : {},
    ...easeEach ? { easeEach } : {}
  };
}
function computeKeyframesTotalDuration(varsNode, scope, source) {
  const kfNode = (varsNode.properties ?? []).find(
    (p) => (p.key?.name ?? p.key?.value) === "keyframes"
  )?.value;
  if (!kfNode || kfNode.type !== "ArrayExpression") return void 0;
  const durations = [];
  for (const el of kfNode.elements ?? []) {
    if (!el || el.type !== "ObjectExpression") continue;
    const r = objectExpressionToRecord(el, scope, source);
    durations.push(r.duration);
  }
  return getObjectArrayKeyframeTiming(durations)?.totalDuration;
}
function staticKeyName(prop) {
  if (prop.type !== "ObjectProperty" && prop.type !== "Property") return void 0;
  if (prop.method || prop.kind && prop.kind !== "init") return void 0;
  const key = prop.computed ? prop.key?.type === "Literal" && prop.key.value : prop.key?.name ?? prop.key?.value;
  return typeof key === "string" ? key : void 0;
}
var isPlainObject = (node) => node?.type === "ObjectExpression" && (node.properties ?? []).every((p) => staticKeyName(p) !== void 0);
var isPlainStep = (node) => node?.type === "Literal" || isPlainObject(node);
function parseObjectArrayKeyframes(node, scope, source) {
  const elements = node.elements ?? [];
  const raw = [];
  for (const el of elements) {
    if (!isPlainObject(el)) return void 0;
    const record = objectExpressionToRecord(el, scope, source);
    const properties = {};
    let duration;
    let ease;
    for (const [k, v] of Object.entries(record)) {
      if (k === "duration") {
        duration = v;
      } else if (k === "ease" && typeof v === "string") {
        ease = v;
      } else if (typeof v === "number" || typeof v === "string") {
        properties[k] = v;
      } else {
        return void 0;
      }
    }
    raw.push({ properties, duration, ease });
  }
  const timing = getObjectArrayKeyframeTiming(raw.map((entry) => entry.duration));
  if (!timing) return void 0;
  const keyframes = raw.map((entry, index) => ({
    percentage: timing.percentages[index],
    properties: entry.properties,
    ...entry.ease ? { ease: entry.ease } : {}
  }));
  return { format: "object-array", keyframes };
}
function parseSimpleArrayKeyframes(node, scope) {
  const arrayProps = /* @__PURE__ */ new Map();
  let ease;
  let easeEach;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.name ?? prop.key?.value;
    if (typeof key !== "string") continue;
    if (prop.value?.type === "ArrayExpression") {
      const values = [];
      for (const el of prop.value.elements ?? []) {
        const val = resolveNode(el, scope);
        if (typeof val !== "number" && typeof val !== "string") return void 0;
        values.push(val);
      }
      if (values.length > 0) arrayProps.set(key, values);
    } else if (key === "ease") {
      ease = tryResolveStringProp(prop.value, scope) ?? ease;
    } else if (key === "easeEach") {
      easeEach = tryResolveStringProp(prop.value, scope) ?? easeEach;
    }
  }
  const maxLen = Math.max(...[...arrayProps.values()].map((a) => a.length), 0);
  const keyframes = [];
  for (let i = 0; i < maxLen; i++) {
    const percentage = maxLen > 1 ? Math.round(i / (maxLen - 1) * 100) : 0;
    const properties = {};
    for (const [key, values] of arrayProps) {
      if (i < values.length) properties[key] = values[i];
    }
    keyframes.push({ percentage, properties });
  }
  return {
    format: "simple-array",
    keyframes,
    ...ease ? { ease } : {},
    ...easeEach ? { easeEach } : {}
  };
}
function parseKeyframesNode(node, scope, source) {
  if (!node) return void 0;
  if (node.type === "ArrayExpression") {
    return parseObjectArrayKeyframes(node, scope, source);
  }
  if (node.type !== "ObjectExpression") return void 0;
  const props = node.properties ?? [];
  if (!props.every((p) => staticKeyName(p) !== void 0)) return void 0;
  let hasPercentageKey = false;
  let hasArrayValue = false;
  for (const prop of props) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.value ?? prop.key?.name;
    if (typeof key === "string" && PERCENTAGE_KEY_RE.test(key)) {
      hasPercentageKey = true;
      break;
    }
    if (prop.value?.type === "ArrayExpression") {
      hasArrayValue = true;
    }
  }
  if (hasPercentageKey) return parsePercentageKeyframes(node, scope, source);
  if (hasArrayValue) return parseSimpleArrayKeyframes(node, scope);
  return void 0;
}
function parseMotionPathNode(node, scope, source) {
  if (!node) return void 0;
  let pathNode;
  let autoRotate = false;
  let curviness = 1;
  let isCubic = false;
  if (node.type === "ObjectExpression") {
    for (const prop of node.properties ?? []) {
      if (!isObjectProperty(prop)) continue;
      const key = propKeyName(prop);
      if (key === "path") pathNode = prop.value;
      else if (key === "autoRotate") {
        const val = resolveNode(prop.value, scope);
        autoRotate = typeof val === "number" ? val : val === true;
      } else if (key === "curviness") {
        const val = resolveNode(prop.value, scope);
        if (typeof val === "number") curviness = val;
      } else if (key === "type") {
        const val = resolveNode(prop.value, scope);
        if (val === "cubic") isCubic = true;
      }
    }
  } else if (node.type === "ArrayExpression") {
    pathNode = node;
  }
  if (!pathNode || pathNode.type !== "ArrayExpression") return void 0;
  const elements = pathNode.elements ?? [];
  const coords = [];
  for (const elem of elements) {
    if (!elem || elem.type !== "ObjectExpression") continue;
    const rec = objectExpressionToRecord(elem, scope, source);
    const x = typeof rec.x === "number" ? rec.x : void 0;
    const y = typeof rec.y === "number" ? rec.y : void 0;
    if (x !== void 0 && y !== void 0) coords.push({ x, y });
  }
  return buildArcPath(coords, curviness, autoRotate, isCubic);
}
function tweenCallToAnimation(call, scope, source, identifierBindings) {
  const provenance = readProvenance(call.node);
  const vars = objectExpressionToRecord(call.varsArg, scope, source);
  const properties = {};
  const extras = {};
  let keyframesData;
  let hasUnresolvedKeyframes = false;
  let motionPathResult;
  for (const [key, val] of Object.entries(vars)) {
    if (BUILTIN_VAR_KEYS.has(key)) continue;
    if (DROPPED_VAR_KEYS.has(key)) continue;
    if (key === "keyframes") {
      const kfNode = findPropertyNode(call.varsArg, "keyframes");
      keyframesData = parseKeyframesNode(kfNode, scope, source);
      if (!keyframesData && kfNode) hasUnresolvedKeyframes = true;
      continue;
    }
    if (key === "motionPath") {
      const mpNode = findPropertyNode(call.varsArg, "motionPath");
      motionPathResult = parseMotionPathNode(mpNode, scope, source);
      continue;
    }
    if (key === "easeEach") continue;
    if (EXTRAS_KEYS.has(key)) {
      const rawSource = extractRawPropertySource(call.varsArg, key, source);
      if (rawSource !== void 0) {
        extras[key] = `__raw:${rawSource}`;
      } else if (val !== void 0) {
        extras[key] = val;
      }
      continue;
    }
    if (typeof val === "number" || typeof val === "string") {
      properties[key] = val;
    }
  }
  if (motionPathResult) {
    const { waypoints } = motionPathResult;
    if (!keyframesData) {
      const kf = waypoints.map((wp, i) => ({
        percentage: waypoints.length > 1 ? Math.round(i / (waypoints.length - 1) * 100) : 0,
        properties: { x: wp.x, y: wp.y }
      }));
      keyframesData = { format: "percentage", keyframes: kf, fromMotionPath: true };
    } else {
      const kfs = keyframesData.keyframes;
      if (kfs.length === waypoints.length) {
        for (let i = 0; i < kfs.length; i++) {
          const kf = kfs[i];
          const wp = waypoints[i];
          if (kf && wp) {
            kf.properties.x = wp.x;
            kf.properties.y = wp.y;
          }
        }
      }
    }
  }
  let fromProperties;
  if (call.method === "fromTo" && call.fromArg) {
    fromProperties = {};
    const fromVars = objectExpressionToRecord(call.fromArg, scope, source);
    for (const [key, val] of Object.entries(fromVars)) {
      if (typeof val === "number" || typeof val === "string") {
        fromProperties[key] = val;
      }
    }
  }
  const hasPositionArg = !!call.positionArg;
  const posVal = hasPositionArg ? extractLiteralValue(call.positionArg, scope) : 0;
  const position = typeof posVal === "number" ? posVal : typeof posVal === "string" ? posVal : hasPositionArg ? `__raw:${source.slice(call.positionArg.start, call.positionArg.end)}` : 0;
  let duration = typeof vars.duration === "number" ? vars.duration : void 0;
  const ease = typeof vars.ease === "string" ? vars.ease : void 0;
  const durationUnresolved = call.method !== "set" && duration === void 0 && hasUnknownDuration(call.varsArg, scope);
  if (duration === void 0 && keyframesData && !durationUnresolved) {
    duration = computeKeyframesTotalDuration(call.varsArg, scope, source);
  }
  let selector = call.selector;
  let targetIdentity;
  if (selector === "__unresolved__") {
    const targetNode = call.node.arguments?.[0];
    const proxyLabel = describeProxyTarget(targetNode, call.varsArg, scope);
    if (proxyLabel) {
      selector = proxyLabel;
      if (targetNode?.type === "Identifier") {
        const declaration = findVisibleIdentifierDeclaration(
          targetNode.name,
          call.ancestors,
          identifierBindings,
          call.node.start
        );
        if (declaration?.node.init?.type === "ObjectExpression" && !identifierBindings.reassignedDeclarations.has(declaration.node)) {
          const declarationProvenance = readProvenance(declaration.scopeNode) ?? readProvenance(declaration.expandedScopeNode);
          const instanceIdentity = declarationProvenance && (declarationProvenance.kind === "helper" || declarationProvenance.kind === "loop") ? `:${declarationProvenance.kind}:${declarationProvenance.callSite ?? ""}:${declarationProvenance.iteration ?? ""}` : "";
          targetIdentity = `proxy:${targetNode.name}@${declaration.node.start}${instanceIdentity}`;
        }
      }
    }
  }
  const anim = {
    targetSelector: selector,
    method: call.method,
    position,
    properties,
    fromProperties,
    duration,
    ease
  };
  if (targetIdentity) anim.targetIdentity = targetIdentity;
  if (!hasPositionArg) anim.implicitPosition = true;
  let group = classifyTweenPropertyGroup(properties);
  if (!group && keyframesData) {
    const kfProps = {};
    for (const kf of keyframesData.keyframes) {
      for (const k of Object.keys(kf.properties)) kfProps[k] = true;
    }
    group = classifyTweenPropertyGroup(kfProps);
  }
  if (group) anim.propertyGroup = group;
  if (call.global) anim.global = true;
  if (Object.keys(extras).length > 0) anim.extras = extras;
  if (keyframesData) anim.keyframes = keyframesData;
  if (motionPathResult) anim.arcPath = motionPathResult.arcPath;
  if (hasUnresolvedKeyframes) anim.hasUnresolvedKeyframes = true;
  if (durationUnresolved) anim.durationUnresolved = true;
  if (selector === "__unresolved__") anim.hasUnresolvedSelector = true;
  if (call.selectorPartial) anim.hasPartialSelector = true;
  if (provenance) anim.provenance = provenance;
  return anim;
}
function staggerAmount(raw) {
  if (typeof raw === "number") return raw;
  if (typeof raw !== "string") return void 0;
  const src = raw.startsWith("__raw:") ? raw.slice(6) : raw;
  const m = /(?:each\s*:\s*)?(-?\d+(?:\.\d+)?)/.exec(src);
  if (!m) return void 0;
  const n = Number.parseFloat(m[1]);
  return Number.isFinite(n) ? n : void 0;
}
function restValue(prop) {
  return prop === "opacity" || prop.startsWith("scale") ? 1 : 0;
}
function staggeredKeyframes(anim, each) {
  const vars = { ...anim.properties };
  let from;
  let to;
  if (anim.method === "fromTo") {
    from = { ...anim.fromProperties ?? {} };
    to = vars;
  } else if (anim.method === "from") {
    from = vars;
    to = {};
    for (const k of Object.keys(vars)) to[k] = restValue(k);
  } else {
    from = { ...anim.fromProperties ?? {} };
    for (const k of Object.keys(vars)) if (from[k] === void 0) from[k] = restValue(k);
    to = vars;
  }
  return [
    { percentage: 0, properties: { ...from, stagger: each } },
    { percentage: 100, properties: { ...to, stagger: each } }
  ];
}
function annotateStaggeredCollections(anims) {
  for (const anim of anims) {
    if (anim.keyframes || anim.arcPath) continue;
    const each = staggerAmount(anim.extras?.stagger);
    if (each === void 0) continue;
    anim.keyframes = { format: "percentage", keyframes: staggeredKeyframes(anim, each) };
  }
}
function resolvePositionString(pos, cursor, prevStart) {
  const trimmed = pos.trim();
  if (trimmed === "") return cursor;
  if (trimmed.startsWith("+=")) {
    const n2 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n2) ? cursor + n2 : null;
  }
  if (trimmed.startsWith("-=")) {
    const n2 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n2) ? cursor - n2 : null;
  }
  if (trimmed === "<") return prevStart;
  if (trimmed === ">") return cursor;
  if (trimmed.startsWith("<")) {
    const n2 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n2) ? prevStart + n2 : null;
  }
  if (trimmed.startsWith(">")) {
    const n2 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n2) ? cursor + n2 : null;
  }
  const n = Number.parseFloat(trimmed);
  return Number.isFinite(n) ? n : null;
}
function collectGsapSetStates(ast, scope, bindings, source) {
  const states = /* @__PURE__ */ new Map();
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node, _, ancestors) {
      const callee = node.callee;
      if (callee?.type !== "MemberExpression" || callee.object?.name !== "gsap" || callee.property?.name !== "set")
        return;
      const selector = resolveTargetSelector(node.arguments?.[0], ancestors, scope, bindings);
      if (!selector) return;
      const rec = objectExpressionToRecord(node.arguments?.[1], scope, source);
      const props = states.get(selector) ?? {};
      for (const [k, v] of Object.entries(rec)) {
        if (typeof v === "number" || typeof v === "string") props[k] = v;
      }
      states.set(selector, props);
    }
  });
  return states;
}
function mergeProps(target, props) {
  for (const [k, v] of Object.entries(props)) target[k] = v;
  return target;
}
function seedFromPreState(anim, cur) {
  const from = { ...anim.fromProperties ?? {} };
  let seeded = false;
  for (const prop of Object.keys(anim.properties)) {
    if (from[prop] === void 0 && cur[prop] !== void 0) {
      from[prop] = cur[prop];
      seeded = true;
    }
  }
  if (seeded) anim.fromProperties = from;
}
function seedSetStates(anims, initial) {
  const state = /* @__PURE__ */ new Map();
  for (const [sel, props] of initial) state.set(sel, { ...props });
  for (const anim of anims) {
    const sel = anim.targetSelector;
    if (anim.method === "set") {
      state.set(sel, mergeProps(state.get(sel) ?? {}, anim.properties));
      continue;
    }
    const cur = state.get(sel);
    if (anim.method === "to" && cur) seedFromPreState(anim, cur);
    state.set(sel, mergeProps(state.get(sel) ?? {}, anim.properties));
  }
}
function applyTimelineDefaults(anims, defaults) {
  if (!defaults) return;
  for (const anim of anims) {
    if (anim.method === "set") continue;
    if (anim.duration === void 0 && !anim.durationUnresolved) {
      if (defaults.duration !== void 0) anim.duration = defaults.duration;
      else if (defaults.durationUnresolved) anim.durationUnresolved = true;
    }
    if (anim.ease === void 0 && defaults.ease !== void 0 && (!anim.keyframes || anim.keyframes.fromMotionPath)) {
      anim.ease = defaults.ease;
    }
  }
}
function resolveLabelPosition(pos, labels, cursor) {
  const m = /^([A-Za-z_$][\w$]*)\s*(?:([+-])=\s*([\d.]+))?$/.exec(pos.trim());
  if (!m) return null;
  const name = m[1];
  let base = labels.get(name);
  if (base === void 0) {
    base = cursor;
    labels.set(name, base);
  }
  if (m[2] && m[3]) {
    const n = Number.parseFloat(m[3]);
    if (Number.isFinite(n)) return m[2] === "+" ? base + n : base - n;
  }
  return base;
}
function resolveAnimStart(anim, cursor, prevStart, labels) {
  if (anim.implicitPosition) return cursor;
  if (typeof anim.position === "number") return anim.position;
  if (typeof anim.position === "string") {
    return resolveLabelPosition(anim.position, labels, cursor) ?? resolvePositionString(anim.position, cursor, prevStart);
  }
  return cursor;
}
function resolveTimelinePositions(anims, labelDefs = []) {
  let cursor = 0;
  let prevStart = 0;
  let cursorKnown = true;
  const labels = /* @__PURE__ */ new Map();
  let labelIdx = 0;
  const sortedLabels = [...labelDefs].sort((a, b) => a.order - b.order);
  const defineLabel = (def) => {
    let value;
    if (typeof def.position === "number") value = def.position;
    else if (!cursorKnown) return;
    else if (typeof def.position === "string") {
      value = resolveLabelPosition(def.position, labels, cursor) ?? cursor;
    } else value = cursor;
    labels.set(def.name, Math.max(0, value));
  };
  anims.forEach((anim, i) => {
    while (labelIdx < sortedLabels.length && sortedLabels[labelIdx].order <= i) {
      defineLabel(sortedLabels[labelIdx]);
      labelIdx++;
    }
    if (anim.method === "set" && anim.global) {
      anim.resolvedStart = 0;
      return;
    }
    const duration = anim.method === "set" ? 0 : anim.duration ?? GSAP_DEFAULT_DURATION;
    const readsCursor = anim.implicitPosition || typeof anim.position !== "number";
    const start = cursorKnown || !readsCursor ? resolveAnimStart(anim, cursor, prevStart, labels) : null;
    if (start == null || anim.durationUnresolved) cursorKnown = false;
    if (start != null) {
      anim.resolvedStart = Math.max(0, start);
      prevStart = anim.resolvedStart;
      cursor = Math.max(cursor, anim.resolvedStart + duration);
    }
  });
  while (labelIdx < sortedLabels.length) defineLabel(sortedLabels[labelIdx++]);
}
function collectAddLabelDefs(ast, ref, scope, sortedCalls) {
  const callKeys = sortedCalls.map((c2) => ({
    site: callSiteStart(c2),
    order: c2.node.__hfOrder
  }));
  const comesAfter = (site, order, labelSite, labelOrder) => {
    if (site === void 0) return false;
    if (site !== labelSite) return site > labelSite;
    return (order ?? -Infinity) > (labelOrder ?? -Infinity);
  };
  const defs = [];
  simple(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node) {
      const callee = node.callee;
      const objMatches = ref.kind === "identifier" ? callee.object?.type === "Identifier" && callee.object.name === ref.name : sameMemberAccess(callee.object, ref.node);
      if (callee?.type !== "MemberExpression" || !objMatches || callee.property?.name !== "addLabel")
        return;
      const nameNode = node.arguments?.[0];
      const name = typeof nameNode?.value === "string" ? nameNode.value : void 0;
      if (!name) return;
      const posVal = resolveNode(node.arguments?.[1], scope);
      const position = typeof posVal === "number" || typeof posVal === "string" ? posVal : void 0;
      const labelStart = node.__hfSiteStart ?? callee.property?.start;
      const labelOrder = node.__hfOrder;
      let order = sortedCalls.length;
      if (labelStart !== void 0) {
        order = callKeys.findIndex((k) => comesAfter(k.site, k.order, labelStart, labelOrder));
        if (order === -1) order = sortedCalls.length;
      }
      defs.push({ name, position, order });
    }
  });
  return defs;
}
function compareByLoc(a, b) {
  const aLoc = a.node.callee?.property?.loc?.start;
  const bLoc = b.node.callee?.property?.loc?.start;
  if (!aLoc || !bLoc) return 0;
  return aLoc.line - bLoc.line || aLoc.column - bLoc.column;
}
function callSiteStart(call) {
  return call.node.__hfSiteStart ?? call.node.callee?.property?.start;
}
function compareCallOrder(a, b) {
  const aSite = callSiteStart(a);
  const bSite = callSiteStart(b);
  if (aSite !== void 0 && bSite !== void 0 && aSite !== bSite) return aSite - bSite;
  const ao = a.node.__hfOrder;
  const bo = b.node.__hfOrder;
  if (ao !== void 0 && bo !== void 0) return ao - bo;
  return compareByLoc(a, b);
}
function sortBySourcePosition(calls) {
  calls.sort(compareCallOrder);
}
function assignStableIds(anims) {
  const counts = /* @__PURE__ */ new Map();
  return anims.map((anim) => {
    const posKey = typeof anim.position === "number" ? String(Math.round(anim.position * 1e3)) : String(anim.position);
    const groupSuffix = anim.propertyGroup ? `-${anim.propertyGroup}` : "";
    const base = `${anim.targetSelector}-${anim.method}-${posKey}${groupSuffix}`;
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;
    return { ...anim, id };
  });
}
var PARSE_MEMO_ENTRIES = 4;
var parseMemo = /* @__PURE__ */ new Map();
function parseGsapScriptAcorn(script) {
  const parsed = parseMemo.get(script) ?? parseGsapScriptAcornUncached(script);
  parseMemo.delete(script);
  parseMemo.set(script, parsed);
  if (parseMemo.size > PARSE_MEMO_ENTRIES) parseMemo.delete(parseMemo.keys().next().value);
  return structuredClone(parsed);
}
function parseGsapScriptAcornUncached(script) {
  try {
    const ast = parseProgram(script);
    const scope = collectScopeBindings(ast);
    const detection = findTimelineVar(ast, scope);
    const ref = detection.ref ?? { kind: "identifier", name: "tl" };
    const timelineVar = timelineRootSource(ref, script);
    if (ref.kind === "identifier") {
      try {
        inlineComputedTimelines(ast, timelineVar, (node) => resolveNode(node, scope));
      } catch {
      }
    }
    const identifierBindings = collectIdentifierBindingIndex(ast);
    const targetBindings = collectTargetBindings(ast, scope, identifierBindings);
    const calls = findAllTweenCalls(ast, ref, scope, targetBindings);
    sortBySourcePosition(calls);
    const rawAnims = calls.map(
      (call) => tweenCallToAnimation(call, scope, script, identifierBindings)
    );
    applyTimelineDefaults(rawAnims, detection.defaults);
    seedSetStates(rawAnims, collectGsapSetStates(ast, scope, targetBindings, script));
    const labelDefs = collectAddLabelDefs(ast, ref, scope, calls);
    resolveTimelinePositions(rawAnims, labelDefs);
    annotateStaggeredCollections(rawAnims);
    const animations = assignStableIds(rawAnims);
    const declPattern = ref.kind === "identifier" ? `(?:const|let|var)\\s+${timelineVar}\\s*=\\s*gsap\\.timeline\\s*\\([^)]*\\)\\s*;?` : `${escapeRegExp(timelineVar)}\\s*=\\s*gsap\\.timeline\\s*\\([^)]*\\)\\s*;?`;
    const timelineMatch = script.match(new RegExp(`^[\\s\\S]*?${declPattern}`));
    const fallbackPreamble = ref.kind === "identifier" ? `const ${timelineVar} = gsap.timeline({ paused: true });` : `${timelineVar} = gsap.timeline({ paused: true });`;
    const preamble = timelineMatch?.[0] ?? fallbackPreamble;
    const lastCallIdx = script.lastIndexOf(`${timelineVar}.`);
    let postamble = "";
    if (lastCallIdx !== -1) {
      const afterLast = script.slice(lastCallIdx);
      const endOfCall = afterLast.indexOf(";");
      if (endOfCall !== -1) {
        postamble = script.slice(lastCallIdx + endOfCall + 1).trim();
      }
    }
    const result = { animations, timelineVar, preamble, postamble };
    if (detection.timelineCount > 1) result.multipleTimelines = true;
    if (detection.timelineCount > 0 && detection.ref === null)
      result.unsupportedTimelinePattern = true;
    return result;
  } catch {
    return { animations: [], timelineVar: "tl", preamble: "", postamble: "" };
  }
}

// src/commands/keyframes.ts
var examples = [
  ["Surface every keyframe + motion path in the project", "hyperframes keyframes"],
  ["Inspect one composition file", "hyperframes keyframes compositions/scene.html"],
  ["Machine-readable output for an agent", "hyperframes keyframes --json"],
  ["Only one element's keyframes", "hyperframes keyframes --selector '#puck-a'"],
  ["Runtime-aware hint for CSS/Anime compositions", "hyperframes keyframes --runtime all"]
];
function queryIncludingTemplates(html, selector) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const roots = [doc];
  const queue = Array.from(doc.querySelectorAll("template"));
  while (queue.length > 0) {
    const content = queue.shift().content;
    if (!content) continue;
    roots.push(content);
    queue.push(...Array.from(content.querySelectorAll("template")));
  }
  return roots.flatMap((root) => Array.from(root.querySelectorAll(selector)));
}
function inlineScriptText(html) {
  return queryIncludingTemplates(html, "script").filter((s) => !s.getAttribute("src")).map((s) => s.textContent ?? "").join("\n");
}
function inlineStyleText(html) {
  return queryIncludingTemplates(html, "style").map((s) => s.textContent ?? "").join("\n");
}
function num(v) {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}
function isPositionTween(anim) {
  if (anim.propertyGroup === "position") return true;
  const has = (p) => !!p && ("x" in p || "y" in p);
  if (has(anim.properties) || has(anim.fromProperties)) return true;
  return (anim.keyframes?.keyframes ?? []).some(
    (kf) => "x" in kf.properties || "y" in kf.properties
  );
}
function baseProps(props) {
  const base = {};
  for (const k of Object.keys(props)) {
    if (k === "ease") continue;
    base[k] = k === "opacity" || k.startsWith("scale") ? 1 : 0;
  }
  return base;
}
function flatKeyframes(anim) {
  if (anim.method === "fromTo") {
    return [
      { pct: 0, time: 0, properties: anim.fromProperties ?? {} },
      { pct: 100, time: 0, properties: anim.properties ?? {} }
    ];
  }
  const vars = anim.properties ?? {};
  const base = baseProps(vars);
  return anim.method === "from" ? [
    { pct: 0, time: 0, properties: vars },
    { pct: 100, time: 0, properties: base }
  ] : [
    { pct: 0, time: 0, properties: base },
    { pct: 100, time: 0, properties: vars }
  ];
}
function isHoldMarker(anim) {
  return anim.properties?.data === "hf-hold" || anim.fromProperties?.data === "hf-hold";
}
function cleanProps(props) {
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (k === "data" || k === "ease") continue;
    out[k] = v;
  }
  return out;
}
function surfaceTween(anim) {
  const start = typeof anim.resolvedStart === "number" ? anim.resolvedStart : num(anim.position) ?? 0;
  const duration = anim.duration ?? 0;
  let shape;
  let rawKfs;
  if (anim.keyframes?.keyframes?.length) {
    shape = "keyframes";
    rawKfs = anim.keyframes.keyframes;
  } else if (anim.arcPath?.enabled) {
    shape = "motionPath";
    rawKfs = [];
  } else {
    shape = "flat";
    rawKfs = flatKeyframes(anim).map((k) => ({ percentage: k.pct, properties: k.properties }));
  }
  const keyframes = rawKfs.map((kf) => ({
    pct: kf.percentage,
    time: Math.round((start + kf.percentage / 100 * duration) * 1e3) / 1e3,
    properties: cleanProps(kf.properties)
  }));
  return {
    id: anim.id,
    target: anim.targetSelector,
    method: anim.method,
    group: anim.propertyGroup,
    start: Math.round(start * 1e3) / 1e3,
    duration,
    end: Math.round((start + duration) * 1e3) / 1e3,
    shape,
    keyframes,
    path: isPositionTween(anim) ? positionPath(keyframes) : null
  };
}
function positionPath(keyframes) {
  if (keyframes.length === 0) return null;
  let lastX = 0;
  let lastY = 0;
  return keyframes.map((kf) => {
    const x = num(kf.properties.x);
    const y = num(kf.properties.y);
    if (x !== null) lastX = x;
    if (y !== null) lastY = y;
    return { x: lastX, y: lastY };
  });
}
function surfaceComposition(html, label, source) {
  const script = inlineScriptText(html);
  let animations = [];
  try {
    animations = parseGsapScriptAcorn(script).animations;
  } catch {
    animations = [];
  }
  const tweens = animations.filter((a) => !isHoldMarker(a)).map(surfaceTween);
  attachComposedAncestors(tweens, html);
  return {
    composition: label,
    source,
    tweens,
    traces: groupTraces(tweens),
    cssKeyframes: surfaceCssKeyframes(inlineStyleText(html)),
    anime: surfaceAnime(inlineScriptText(html))
  };
}
function readBalancedBlock(text, openBrace) {
  if (text[openBrace] !== "{") return null;
  let depth = 0;
  for (let i = openBrace; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        return { body: text.slice(openBrace + 1, i), end: i + 1 };
      }
    }
  }
  return null;
}
function parseDeclarations(body) {
  return body.split(";").map((part) => part.trim()).filter(Boolean);
}
function stripRanges(text, ranges) {
  let out = "";
  let cursor = 0;
  for (const range of [...ranges].sort((a, b) => a.start - b.start)) {
    out += text.slice(cursor, range.start);
    cursor = range.end;
  }
  return out + text.slice(cursor);
}
function collectKeyframeBlocks(css) {
  const keyframes = [];
  const ranges = [];
  const re = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
  let match;
  while (match = re.exec(css)) {
    const open = css.indexOf("{", re.lastIndex);
    const block = open >= 0 ? readBalancedBlock(css, open) : null;
    if (!block) continue;
    ranges.push({ start: match.index, end: block.end });
    const stops = [];
    const stopRe = /([^{}]+)\{([^{}]*)\}/g;
    let stop;
    while (stop = stopRe.exec(block.body)) {
      stops.push({
        selector: stop[1].trim().replace(/\s+/g, " "),
        declarations: parseDeclarations(stop[2])
      });
    }
    keyframes.push({ name: match[1], stops });
  }
  return { keyframes, ranges };
}
function stripQuotes(raw) {
  return raw.trim().replace(/^["']|["']$/g, "");
}
function addAnimationNameDeclNames(body, knownNames, out) {
  const nameRe = /animation-name\s*:\s*([^;]+)/g;
  let nameMatch;
  while (nameMatch = nameRe.exec(body)) {
    for (const raw of nameMatch[1].split(",")) {
      const name = stripQuotes(raw);
      if (knownNames.has(name)) out.add(name);
    }
  }
}
function addAnimationShorthandNames(body, knownNames, out) {
  const animationRe = /animation\s*:\s*([^;]+)/g;
  let animationMatch;
  while (animationMatch = animationRe.exec(body)) {
    for (const raw of animationMatch[1].split(",")) {
      for (const token of raw.trim().split(/\s+/)) {
        const normalized = stripQuotes(token);
        if (knownNames.has(normalized)) out.add(normalized);
      }
    }
  }
}
function animationNamesFromDeclarations(body, knownNames) {
  const out = /* @__PURE__ */ new Set();
  addAnimationNameDeclNames(body, knownNames, out);
  addAnimationShorthandNames(body, knownNames, out);
  return [...out];
}
function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function surfaceCssKeyframes(rawCss) {
  const css = stripCssComments(rawCss);
  if (!css.trim()) return [];
  const { keyframes, ranges } = collectKeyframeBlocks(css);
  if (keyframes.length === 0) return [];
  const selectorsByName = /* @__PURE__ */ new Map();
  for (const kf of keyframes) selectorsByName.set(kf.name, /* @__PURE__ */ new Set());
  const knownNames = new Set(keyframes.map((kf) => kf.name));
  const cssWithoutKeyframes = stripRanges(css, ranges);
  const ruleRe = /([^{}@]+)\{([^{}]*animation[^{}]*)\}/g;
  let rule;
  while (rule = ruleRe.exec(cssWithoutKeyframes)) {
    const selector = rule[1].trim().replace(/\s+/g, " ");
    if (!selector) continue;
    for (const name of animationNamesFromDeclarations(rule[2], knownNames)) {
      selectorsByName.get(name)?.add(selector);
    }
  }
  return keyframes.map((kf) => ({
    name: kf.name,
    selectors: [...selectorsByName.get(kf.name) ?? /* @__PURE__ */ new Set()],
    keyframes: kf.stops
  }));
}
function valuesFromProperty(script, property) {
  const values = [];
  const quoted = property + "\\s*:\\s*([\"'`])([^\"'`]+)\\1";
  const numeric = property + "\\s*:\\s*([0-9]+(?:\\.[0-9]+)?)";
  const re = new RegExp(`${quoted}|${numeric}`, "g");
  let match;
  while (match = re.exec(script)) {
    if (match[2] !== void 0) values.push(match[2]);
    else if (match[3] !== void 0) values.push(Number(match[3]));
  }
  return values;
}
function animeAddTargets(script) {
  const values = [];
  const re = /\.add\s*\(\s*(["'`])([^"'`]+)\1/g;
  let match;
  while (match = re.exec(script)) values.push(match[2]);
  return values;
}
function surfaceAnime(script) {
  if (!/\banime\s*(?:\.(?:timeline|createTimeline))?\s*\(/.test(script)) return [];
  const registered = /__hfAnime[\s\S]*?\.push\s*\(/.test(script) || /__hfAnime\s*=/.test(script);
  const timelineCount = (script.match(/\banime\.(?:timeline|createTimeline)\s*\(/g) ?? []).length;
  const animationCount = (script.match(/\banime\s*\(/g) ?? []).length;
  const targets = [
    ...valuesFromProperty(script, "targets").filter(
      (value) => typeof value === "string"
    ),
    ...animeAddTargets(script)
  ];
  const durations = valuesFromProperty(script, "duration");
  const out = [];
  for (let i = 0; i < timelineCount; i++) {
    out.push({ kind: "timeline", targets, durations, registered });
  }
  for (let i = 0; i < animationCount; i++) {
    out.push({ kind: "animation", targets, durations, registered });
  }
  return out;
}
function attachComposedAncestors(tweens, html) {
  const animated = [...new Set(tweens.filter((t) => t.method !== "set").map((t) => t.target))];
  if (animated.length < 2) return;
  const doc = new DOMParser().parseFromString(html, "text/html");
  for (const t of tweens) {
    const ancestors = animatedAncestors(doc, t.target, animated);
    if (ancestors.length) {
      t.composedWith = ancestors.map((sel) => ({
        selector: sel,
        summary: summarizeMotion(tweens, sel)
      }));
    }
  }
}
var safeMatches = (el, sel) => {
  try {
    return el.matches(sel);
  } catch {
    return false;
  }
};
function animatedAncestors(doc, target, animated) {
  let el = null;
  try {
    el = doc.querySelector(target);
  } catch {
    return [];
  }
  const out = [];
  for (let n = el?.parentElement ?? null; n; n = n.parentElement) {
    for (const sel of animated) {
      if (sel !== target && !out.includes(sel) && safeMatches(n, sel)) out.push(sel);
    }
  }
  return out;
}
function summarizeMotion(tweens, sel) {
  const ranges = /* @__PURE__ */ new Map();
  const kfs = tweens.filter((t) => t.target === sel && t.method !== "set").flatMap((t) => t.keyframes);
  for (const kf of kfs) {
    for (const [k, v] of Object.entries(kf.properties)) {
      const n = num(v);
      if (n !== null) bumpRange(ranges, k, n);
    }
  }
  const varying = [...ranges.entries()].filter(([, r]) => r.max - r.min > 0.5).map(([k, r]) => `${k} ${Math.round(r.min)}..${Math.round(r.max)}`);
  return varying.length ? varying.join(", ") : "(static)";
}
function bumpRange(ranges, k, n) {
  const r = ranges.get(k);
  if (r) {
    r.min = Math.min(r.min, n);
    r.max = Math.max(r.max, n);
  } else ranges.set(k, { min: n, max: n });
}
function pathTravels(points) {
  const first = points[0];
  if (!first) return false;
  return points.some((p) => Math.abs(p.x - first.x) > 0.5 || Math.abs(p.y - first.y) > 0.5);
}
function groupTraces(tweens) {
  const byTarget = /* @__PURE__ */ new Map();
  for (const t of tweens) {
    if (t.method === "set") continue;
    if (!t.path || t.path.length < 2) continue;
    if (!pathTravels(t.path)) continue;
    const list = byTarget.get(t.target);
    if (list) list.push(t);
    else byTarget.set(t.target, [t]);
  }
  const traces = [];
  for (const [target, list] of byTarget) {
    if (list.length < 2) continue;
    const strokes = [...list].sort((a, b) => a.start - b.start).map((t) => ({
      id: t.id,
      start: t.start,
      end: t.end,
      keyframes: t.keyframes,
      points: t.path
    }));
    traces.push({ target, strokes });
  }
  return traces;
}
function collectCompositions(indexPath) {
  const html = readFileSync(indexPath, "utf-8");
  const baseDir = dirname(indexPath);
  const out = [
    surfaceComposition(html, basename(indexPath), basename(indexPath))
  ];
  const doc = new DOMParser().parseFromString(html, "text/html");
  for (const div of Array.from(doc.querySelectorAll("[data-composition-src]"))) {
    const src = div.getAttribute("data-composition-src");
    if (!src) continue;
    const subPath = resolve(baseDir, src);
    const sub = readProjectFile(subPath);
    if (sub.kind !== "file") continue;
    const id = div.getAttribute("data-composition-id") ?? src;
    out.push(surfaceComposition(sub.text, id, src));
  }
  return out;
}
function fmtProps(props) {
  return Object.entries(props).filter(([k]) => k !== "ease").map(([k, v]) => `${k}:${v}`).join(" ");
}
function printTween(t) {
  const timing = c.dim(`@${t.start}s\u2192${t.end}s (${t.duration}s)`);
  const group = t.group ? c.dim(` ${t.group}`) : "";
  console.log(`  ${c.accent(t.target)}${group}  ${c.dim(t.method)}/${t.shape}  ${timing}`);
  if (t.shape === "motionPath") {
    console.log(c.dim(`    motionPath arc (${t.keyframes.length} stops)`));
  } else {
    const kfLine = t.keyframes.map((k) => `${k.pct}% {${fmtProps(k.properties)}}`).join("  ");
    console.log(`    ${c.dim(kfLine)}`);
  }
  if (t.composedWith?.length) {
    for (const a of t.composedWith) {
      console.log(c.dim(`    \u2191 composed with ${c.accent(a.selector)}${c.dim(": " + a.summary)}`));
    }
  }
  console.log();
}
function printTrace(tr) {
  const start = Math.min(...tr.strokes.map((s) => s.start));
  const end = Math.max(...tr.strokes.map((s) => s.end));
  const n = tr.strokes.length;
  console.log(
    `  ${c.accent(tr.target)}${c.dim(" position")}  ${c.dim("trace")}  ${c.dim(`${n} strokes`)} ${c.dim(`@${start}s\u2192${end}s`)}`
  );
  tr.strokes.forEach((s, i) => {
    const kfLine = s.keyframes.map((k) => `${k.pct}% {${fmtProps(k.properties)}}`).join("  ");
    console.log(`    ${c.dim(`stroke ${i + 1}:`)} ${c.dim(kfLine)}`);
  });
  console.log();
}
function addTraceSelectors(selectors, cmp) {
  for (const tr of cmp.traces) selectors.add(tr.target);
}
function addTweenSelectors(selectors, cmp) {
  for (const t of cmp.tweens) {
    if (t.method !== "set" && t.target !== "__unresolved__") selectors.add(t.target);
  }
}
function addCssKeyframeSelectors(selectors, cmp) {
  for (const css of cmp.cssKeyframes) {
    for (const selector of css.selectors) {
      if (selector) selectors.add(selector);
    }
  }
}
function addAnimeSelectors(selectors, cmp) {
  for (const anime of cmp.anime) {
    for (const selector of anime.targets) {
      if (selector) selectors.add(selector);
    }
  }
}
function collectShotSelectors(comps) {
  const selectors = /* @__PURE__ */ new Set();
  for (const cmp of comps) {
    addTraceSelectors(selectors, cmp);
    addTweenSelectors(selectors, cmp);
    addCssKeyframeSelectors(selectors, cmp);
    addAnimeSelectors(selectors, cmp);
  }
  return [...selectors].map((selector) => ({ selector }));
}
function onionShotGuardError(projectDir, requests, ghost) {
  if (!projectDir) return "--shot needs a project directory (not a single .html file).";
  if (requests.length === 0 && !ghost)
    return "--shot: no statically resolved animated element to sample for the selection. Use a direct DOM selector or --ghost for runtime-only targets.";
  return null;
}
function onionShotOptions(args) {
  return {
    samples: num(args.samples) ?? 9,
    layout: args.layout === "strip" ? "strip" : "path",
    fit: args.fit ?? true,
    from: num(args.from),
    to: num(args.to),
    angle: args.angle,
    scopeSelector: args.selector ?? null,
    ghost: args.ghost ?? false
  };
}
function printOnionShotSaved(saved, elementCount) {
  console.log(`${c.success("\u25C7")}  onion-skin screenshot saved ${c.accent(saved)}`);
  console.log(
    c.dim(
      `   ${elementCount} element${elementCount === 1 ? "" : "s"} \xB7 open it to verify the motion matches your target, then read the keyframes below.`
    )
  );
  console.log();
}
async function runOnionShot(comps, allComps, projectDir, entryFile, args) {
  const { captureMotionPathShot } = await import("./motionShot-H74BMWKK.js");
  const requests = collectShotSelectors(args.selector ? allComps : comps);
  const guardError = onionShotGuardError(projectDir, requests, args.ghost ?? false);
  if (guardError) {
    console.log(c.dim(guardError));
    return true;
  }
  const saved = await captureMotionPathShot(projectDir, requests, resolve(args.shot), {
    ...onionShotOptions(args),
    entryFile
  });
  printOnionShotSaved(saved, requests.length);
  return false;
}
function resolveScope(args) {
  const raw = args.target?.trim();
  let comps;
  let projectName;
  let projectDir;
  let entryFile;
  const entry = raw?.endsWith(".html") ? readProjectFile(raw) : void 0;
  if (raw && entry?.kind === "file") {
    const entryPath = resolve(raw);
    comps = [surfaceComposition(entry.text, basename(entryPath), entryPath)];
    projectName = basename(entryPath);
    projectDir = findProjectRoot(entryPath);
    entryFile = relative(projectDir, entryPath).split(sep).join("/");
  } else {
    const project = resolveProject(raw);
    comps = collectCompositions(project.indexPath);
    projectName = project.name;
    projectDir = project.dir;
  }
  const allComps = comps;
  if (args.selector) {
    const sel = args.selector;
    const matches = (target) => target.split(",").some((s) => s.trim() === sel);
    comps = comps.map((cmp) => ({
      ...cmp,
      tweens: cmp.tweens.filter((t) => matches(t.target)),
      traces: cmp.traces.filter((tr) => matches(tr.target)),
      cssKeyframes: cmp.cssKeyframes.filter((kf) => kf.selectors.some(matches)),
      anime: cmp.anime.filter((a) => a.targets.some(matches))
    })).filter(
      (cmp) => cmp.tweens.length > 0 || cmp.traces.length > 0 || cmp.cssKeyframes.length > 0 || cmp.anime.length > 0
    );
  }
  return { comps, allComps, projectName, projectDir, entryFile };
}
function findProjectRoot(entryPath) {
  const entryDir = dirname(entryPath);
  let candidate = entryDir;
  for (; ; ) {
    if (existsSync(join(candidate, "index.html"))) return candidate;
    if (existsSync(join(candidate, ".git"))) return entryDir;
    const parent = dirname(candidate);
    if (parent === candidate) return entryDir;
    candidate = parent;
  }
}
function isEmptyComposition(cmp) {
  return cmp.tweens.length === 0 && cmp.traces.length === 0 && cmp.cssKeyframes.length === 0 && cmp.anime.length === 0;
}
function printCompositionTweens(cmp) {
  const tracedIds = new Set(cmp.traces.flatMap((tr) => tr.strokes.map((s) => s.id)));
  const tracedTargets = new Set(cmp.traces.map((tr) => tr.target));
  for (const t of cmp.tweens) {
    if (tracedIds.has(t.id)) continue;
    if (t.method === "set" && tracedTargets.has(t.target)) continue;
    printTween(t);
  }
}
function printComposition(cmp) {
  if (isEmptyComposition(cmp)) return;
  console.log(c.bold(`${cmp.composition}`) + c.dim(`  (${cmp.source})`));
  for (const tr of cmp.traces) printTrace(tr);
  printCompositionTweens(cmp);
  for (const cssKeyframes of cmp.cssKeyframes) printCssKeyframes(cssKeyframes);
  for (const anime of cmp.anime) printAnime(anime);
}
function printCssKeyframes(cssKeyframes) {
  const selectors = cssKeyframes.selectors.length ? cssKeyframes.selectors.join(", ") : "(no selector found)";
  console.log(
    `  ${c.accent(`@keyframes ${cssKeyframes.name}`)}${c.dim(" css")}  ${c.dim(selectors)}`
  );
  for (const stop of cssKeyframes.keyframes) {
    console.log(`    ${c.dim(`${stop.selector} {${stop.declarations.join("; ")}}`)}`);
  }
  console.log();
}
function printAnime(anime) {
  const targets = anime.targets.length ? anime.targets.join(", ") : "(targets not parsed)";
  const durations = anime.durations.length ? ` duration ${anime.durations.join(",")}` : "";
  const registered = anime.registered ? "registered" : "not registered";
  console.log(
    `  ${c.accent(`anime.${anime.kind}`)}${c.dim(` ${registered}`)}  ${c.dim(`${targets}${durations}`)}`
  );
  console.log();
}
var defaultKeyframesCommand = {
  name: "keyframes",
  description: "See, debug, and refine keyframes \u2014 surface GSAP, CSS @keyframes, Anime.js, paths, and onion-shot diagnostics",
  invocation: "hyperframes keyframes",
  defaultRuntime: "all"
};
function createKeyframesCommand(options = {}) {
  const commandOptions = { ...defaultKeyframesCommand, ...options };
  return defineCommand({
    meta: {
      name: commandOptions.name,
      description: commandOptions.description
    },
    args: {
      target: {
        type: "positional",
        description: "Project dir or composition .html",
        required: false
      },
      selector: { type: "string", description: "Only keyframes matching this CSS selector" },
      runtime: {
        type: "string",
        description: "Runtime filter hint: gsap|css|anime|all. Surfaces GSAP tweens, CSS @keyframes, and Anime.js timelines when detectable."
      },
      json: { type: "boolean", description: "Machine-readable JSON (for agents)", default: false },
      shot: {
        type: "string",
        description: "Onion-skin screenshot to PNG: the real element sampled over the timeline (true 3D, every channel) for visual self-verify. Pair with --selector to focus one element."
      },
      samples: {
        type: "string",
        description: "Onion samples (equal-time steps) for --shot. Default 9."
      },
      layout: {
        type: "string",
        description: "--shot layout: 'path' (ghosts at real positions + path, default) or 'strip' (for in-place/overlapping motion). 'strip' captures a real per-time pixel filmstrip only when --selector targets an SVG element; any other selector (e.g. a DOM/sub-composition host) instead gets one live frame plus vector position markers."
      },
      from: { type: "string", description: "--shot: sample only from this time (seconds)." },
      to: { type: "string", description: "--shot: sample only up to this time (seconds)." },
      angle: {
        type: "string",
        description: "--shot orbit camera: a preset (front|iso|top|side|rear-iso) or 'yaw,pitch' degrees \u2014 view 3D motion from the angle that reveals it."
      },
      fit: {
        type: "boolean",
        description: "--shot: zoom the motion to fill the frame (default true; --no-fit to disable).",
        default: true
      },
      ghost: {
        type: "boolean",
        description: "--shot: rendered onion-skin \u2014 composite the real canvas/WebGL frames as translucent ghosts (older fainter), instead of bbox markers. For the canvas-internal 3D motion the marker onion can't see (requires a <canvas>).",
        default: false
      }
    },
    async run({ args }) {
      ensureDOMParser();
      const runtime = normalizeRuntime(args.runtime, commandOptions.defaultRuntime);
      if (runtime === "css" || runtime === "anime") {
        console.log(
          c.dim(
            `${commandOptions.name}: ${runtime} output is a static authoring surface; use validate/render/snapshot to verify runtime adapter seekability.`
          )
        );
        console.log();
      }
      const { comps: rawComps, allComps, projectName, projectDir, entryFile } = resolveScope(args);
      const comps = filterCompositionsByRuntime(rawComps, runtime);
      if (args.shot && await runOnionShot(comps, allComps, projectDir, entryFile, args)) return;
      if (args.json) {
        console.log(
          JSON.stringify(withMeta({ project: projectName, runtime, compositions: comps }), null, 2)
        );
        return;
      }
      const total = comps.reduce(
        (n, cmp) => n + cmp.tweens.length + cmp.cssKeyframes.length + cmp.anime.length,
        0
      );
      if (total === 0) {
        console.log(`${c.success("\u25C7")}  ${c.accent(projectName)} ${c.dim("\u2014 no keyframes found")}`);
        return;
      }
      console.log(
        `${c.success("\u25C7")}  ${c.accent(projectName)} ${c.dim("\u2014")} ${c.dim(`${total} item${total === 1 ? "" : "s"}`)}`
      );
      console.log();
      for (const cmp of comps) printComposition(cmp);
      console.log(
        c.dim(
          `Tip: edit the keyframes in source, then \`${commandOptions.invocation} --shot out.png\` to see the rendered motion.`
        )
      );
    }
  });
}
function normalizeRuntime(runtime, fallback) {
  if (typeof runtime !== "string") return fallback;
  const normalized = runtime.toLowerCase();
  return normalized === "gsap" || normalized === "css" || normalized === "anime" || normalized === "all" ? normalized : fallback;
}
function filterCompositionsByRuntime(comps, runtime) {
  return comps.map((cmp) => ({
    ...cmp,
    tweens: runtime === "gsap" || runtime === "all" ? cmp.tweens : [],
    traces: runtime === "gsap" || runtime === "all" ? cmp.traces : [],
    cssKeyframes: runtime === "css" || runtime === "all" ? cmp.cssKeyframes : [],
    anime: runtime === "anime" || runtime === "all" ? cmp.anime : []
  }));
}
var keyframes_default = createKeyframesCommand();
export {
  collectCompositions,
  collectShotSelectors,
  keyframes_default as default,
  examples,
  resolveScope,
  surfaceComposition
};
