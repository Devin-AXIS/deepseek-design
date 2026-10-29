import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  require_lib,
  require_main
} from "./chunk-DUNOLIES.js";
import {
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../parsers/dist/gsapParser.js
var recast = __toESM(require_main(), 1);
var import_parser = __toESM(require_lib(), 1);
var GSAP_DEFAULT_DURATION = 0.5;
var SUPPORTED_PROPS = [
  // 2D Transforms
  "x",
  "y",
  "scale",
  "scaleX",
  "scaleY",
  "rotation",
  "skewX",
  "skewY",
  // 3D Transforms
  "z",
  "rotationX",
  "rotationY",
  "rotationZ",
  "perspective",
  "transformPerspective",
  "transformOrigin",
  // Visibility
  "opacity",
  "visibility",
  "autoAlpha",
  // Dimensions
  "width",
  "height",
  // Colors
  "color",
  "backgroundColor",
  "borderColor",
  // Box model
  "borderRadius",
  // Typography
  "fontSize",
  "letterSpacing",
  // Filter & Clipping
  "filter",
  "clipPath",
  // DOM content (number counters, text roll-ups)
  "innerText"
];
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
function isTweenConfigKey(key) {
  return BUILTIN_VAR_KEYS.has(key) || DROPPED_VAR_KEYS.has(key) || EXTRAS_KEYS.has(key);
}
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
function writesProperty(animation, property) {
  return property in animation.properties || !!animation.fromProperties && property in animation.fromProperties || !!animation.keyframes?.keyframes.some((k) => property in k.properties);
}
function isXYPositionWrite(a) {
  return a.propertyGroup === "position" && (writesProperty(a, "x") || writesProperty(a, "y"));
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
function knownStart(animation) {
  if (animation.resolvedStart !== void 0) return animation.resolvedStart;
  return typeof animation.position === "number" ? animation.position : void 0;
}
var tweenSignature = (a) => JSON.stringify([a.targetSelector, a.method, a.position, a.duration, a.properties, a.keyframes]);
function holdScope(before, previous) {
  const kept = new Set(previous?.map(tweenSignature));
  const held = /* @__PURE__ */ new Map();
  for (const a of before.filter((b) => b.method === "set" && (b.properties?.data === "hf-hold" || b.extras?.data === '__raw:"hf-hold"'))) {
    const props = held.get(a.targetSelector) ?? /* @__PURE__ */ new Map();
    for (const [property, value] of Object.entries(a.properties)) props.set(property, value);
    held.set(a.targetSelector, props);
  }
  return {
    touched: (a) => previous === null || !kept.has(tweenSignature(a)),
    held: (selector) => held.get(selector) ?? /* @__PURE__ */ new Map()
  };
}
function keyframeHoldForAnimation(animation, animations, scope) {
  if (!animation.keyframes) return null;
  const start = knownStart(animation);
  const lone = animation.keyframes.keyframes.length === 1;
  if (start === void 0 || !(start > 1e-3) && !lone) return null;
  const atStart = animation.keyframes.keyframes.find((keyframe) => keyframe.percentage === 0);
  if (!atStart) return null;
  const earlier = animations.filter((other) => {
    const otherStart = knownStart(other);
    return other !== animation && !other.global && other.targetSelector === animation.targetSelector && otherStart !== void 0 && otherStart < start - 1e-3;
  });
  const touched = scope.touched(animation);
  const pinned = scope.held(animation.targetSelector);
  const kept = (property, value) => touched ? pinned.has(property) : pinned.get(property) === value;
  const startsLate = start > 1e-3;
  const pins = (group, property, value) => (group === "position" || group === "size") && ((lone || group === "position" && startsLate) && touched || kept(property, value));
  const hold = {};
  for (const [property, value] of Object.entries(atStart.properties)) {
    if (!pins(classifyPropertyGroup(property), property, value) || typeof value !== "number")
      continue;
    if (earlier.some((other) => writesProperty(other, property))) continue;
    hold[property] = value;
  }
  return Object.keys(hold).length > 0 ? hold : null;
}
var SUPPORTED_EASES = [
  "none",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "power4.in",
  "power4.out",
  "power4.inOut",
  "back.in",
  "back.out",
  "back.inOut",
  "elastic.in",
  "elastic.out",
  "elastic.inOut",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "circ.inOut",
  "expo.in",
  "expo.out",
  "expo.inOut",
  "elastic.out(1,0.3)",
  "elastic.inOut(1,0.3)",
  "spring-gentle",
  "spring-bouncy",
  "spring-stiff",
  "spring-wobbly",
  "spring-heavy",
  "hold",
  "steps(1)"
];
function authorsKeyframes(anim) {
  return anim.keyframes !== void 0 || anim.hasUnresolvedKeyframes === true;
}
function mergePercentageKeyframes(keyframes) {
  const byPercentage = /* @__PURE__ */ new Map();
  for (const keyframe of keyframes) {
    const existing = byPercentage.get(keyframe.percentage);
    if (!existing) {
      byPercentage.set(keyframe.percentage, {
        ...keyframe,
        properties: { ...keyframe.properties }
      });
      continue;
    }
    existing.properties = { ...existing.properties, ...keyframe.properties };
    if (keyframe.ease !== void 0) existing.ease = keyframe.ease;
    if (keyframe.auto !== void 0) existing.auto = keyframe.auto;
  }
  return [...byPercentage.values()].sort((a, b) => a.percentage - b.percentage);
}
function serializeGsapAnimations(animations, timelineVar = "tl", options) {
  const sorted = [...animations].sort((a, b) => {
    const aNum = a.resolvedStart ?? (typeof a.position === "number" ? a.position : Number.MAX_SAFE_INTEGER);
    const bNum = b.resolvedStart ?? (typeof b.position === "number" ? b.position : Number.MAX_SAFE_INTEGER);
    return aNum - bNum;
  });
  const lines = sorted.map((anim) => {
    const selector = JSON.stringify(anim.targetSelector);
    const props = { ...anim.properties };
    if (anim.duration !== void 0) props.duration = anim.duration;
    if (anim.ease) props.ease = anim.ease;
    let propsStr = serializeObject(props);
    if (anim.extras && Object.keys(anim.extras).length > 0) {
      const extrasStr = serializeExtras(anim.extras);
      if (Object.keys(props).length === 0) {
        propsStr = `{ ${extrasStr} }`;
      } else {
        propsStr = propsStr.slice(0, -2) + `, ${extrasStr} }`;
      }
    }
    const posStr = JSON.stringify(anim.position);
    switch (anim.method) {
      case "set":
        return anim.global ? `    gsap.set(${selector}, ${propsStr});` : `    ${timelineVar}.set(${selector}, ${propsStr}, ${posStr});`;
      case "to":
        return `    ${timelineVar}.to(${selector}, ${propsStr}, ${posStr});`;
      case "from":
        return `    ${timelineVar}.from(${selector}, ${propsStr}, ${posStr});`;
      case "fromTo": {
        const fromStr = serializeObject(anim.fromProperties || {});
        return `    ${timelineVar}.fromTo(${selector}, ${fromStr}, ${propsStr}, ${posStr});`;
      }
    }
  });
  let mediaSync = "";
  if (options?.includeMediaSync) {
    mediaSync = `
    ${timelineVar}.eventCallback("onUpdate", function() {
      const time = ${timelineVar}.time();
      document.querySelectorAll("video[data-start], audio[data-start]").forEach(function(media) {
        const start = parseFloat(media.dataset.start);
        const end = parseFloat(media.dataset.end) || Infinity;
        const mediaTime = time - start;
        if (time >= start && time < end) {
          if (Math.abs(media.currentTime - mediaTime) > 0.1) {
            media.currentTime = mediaTime;
          }
          if (media.paused && !${timelineVar}.paused()) {
            media.play().catch(function() {});
          }
        } else if (!media.paused) {
          media.pause();
        }
      });
    });`;
  }
  const preamble = options?.preamble || `const ${timelineVar} = gsap.timeline({ paused: true });`;
  const postamble = options?.postamble ? `
    ${options.postamble}` : "";
  return `
    ${preamble}
${lines.join("\n")}${mediaSync}${postamble}
  `;
}
function serializeValue(value) {
  if (typeof value === "string" && value.startsWith("__raw:")) {
    return value.slice(6);
  }
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}
function plainPercentKey(percentage) {
  const text = Math.abs(percentage) < 1e-6 ? percentage.toFixed(20).replace(/\.?0+$/, "") : String(percentage);
  return `${text}%`;
}
function safeJsKey(key) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}
function serializeObject(obj) {
  const entries = Object.entries(obj).map(([key, value]) => {
    return `${safeJsKey(key)}: ${serializeValue(value)}`;
  });
  return `{ ${entries.join(", ")} }`;
}
function serializeExtras(extras) {
  return Object.entries(extras).map(([key, value]) => {
    return `${safeJsKey(key)}: ${serializeValue(value)}`;
  }).join(", ");
}
function getAnimationsForElementId(animations, elementId) {
  const selector = `#${elementId}`;
  return animations.filter((a) => a.targetSelector === selector);
}
var FORBIDDEN_GSAP_PATTERNS = [
  { pattern: /\.call\s*\(/, message: "call() method not allowed" },
  { pattern: /\.add\s*\(/, message: "add() method not allowed" },
  { pattern: /\.addPause\s*\(/, message: "addPause() method not allowed" },
  { pattern: /gsap\.registerEffect\s*\(/, message: "registerEffect() not allowed" },
  { pattern: /ScrollTrigger/, message: "ScrollTrigger not allowed" },
  { pattern: /onComplete\s*:/, message: "onComplete callback not allowed" },
  { pattern: /onUpdate\s*:/, message: "onUpdate callback not allowed" },
  { pattern: /onStart\s*:/, message: "onStart callback not allowed" },
  { pattern: /onRepeat\s*:/, message: "onRepeat callback not allowed" },
  { pattern: /onReverseComplete\s*:/, message: "onReverseComplete callback not allowed" },
  { pattern: /repeat\s*:\s*-1/, message: "Infinite repeat (repeat: -1) not allowed" },
  { pattern: /Math\.random\s*\(/, message: "Random values (Math.random) not allowed" },
  { pattern: /Date\.now\s*\(/, message: "Date-dependent values (Date.now) not allowed" },
  { pattern: /new\s+Date\s*\(/, message: "Date constructor not allowed" },
  { pattern: /setTimeout\s*\(/, message: "setTimeout not allowed" },
  { pattern: /setInterval\s*\(/, message: "setInterval not allowed" },
  { pattern: /requestAnimationFrame\s*\(/, message: "requestAnimationFrame not allowed" }
];
function validateCompositionGsap(script) {
  const errors = [];
  const warnings = [];
  for (const { pattern, message } of FORBIDDEN_GSAP_PATTERNS) {
    if (pattern.test(script)) errors.push(message);
  }
  if (/yoyo\s*:\s*true/.test(script)) {
    warnings.push("yoyo animations may behave unexpectedly when scrubbing");
  }
  if (/stagger\s*:/.test(script)) {
    warnings.push("stagger animations may not serialize correctly");
  }
  return { valid: errors.length === 0, errors, warnings };
}
function keyframesToGsapAnimations(elementId, keyframes, elementStartTime, base) {
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  const animations = [];
  const baseX = base?.x ?? 0;
  const baseY = base?.y ?? 0;
  const baseScale = base?.scale ?? 1;
  sorted.forEach((kf, i) => {
    const absoluteTime = elementStartTime + kf.time;
    const isFirst = i === 0;
    const prevKf = i > 0 ? sorted[i - 1] : null;
    const duration = prevKf ? kf.time - prevKf.time : void 0;
    const position = prevKf ? elementStartTime + prevKf.time : absoluteTime;
    const properties = {};
    for (const [key, value] of Object.entries(kf.properties)) {
      if (typeof value !== "number") continue;
      if (key === "x") properties.x = baseX + value;
      else if (key === "y") properties.y = baseY + value;
      else if (key === "scale") properties.scale = baseScale * value;
      else properties[key] = value;
    }
    animations.push({
      id: `${elementId}-kf-${kf.id}`,
      targetSelector: `#${elementId}`,
      method: isFirst ? "set" : "to",
      position,
      properties,
      duration: isFirst ? void 0 : duration,
      ease: kf.ease
    });
  });
  return animations;
}
function gsapAnimationsToKeyframes(animations, elementStartTime, options) {
  const validMethods = ["set", "to", "from", "fromTo"];
  const baseX = options?.baseX ?? 0;
  const baseY = options?.baseY ?? 0;
  const baseScale = options?.baseScale ?? 1;
  const clampTimeToZero = options?.clampTimeToZero ?? true;
  const skipBaseSet = options?.skipBaseSet ?? false;
  const baseTimeEpsilon = 1e-3;
  const baseValueEpsilon = 1e-5;
  return animations.filter(
    (a) => validMethods.includes(a.method) && typeof a.position === "number"
  ).map((a) => {
    const relativeTimeRaw = a.position - elementStartTime;
    const time = clampTimeToZero ? Math.max(0, relativeTimeRaw) : relativeTimeRaw;
    const properties = {};
    for (const [key, value] of Object.entries(a.properties)) {
      if (typeof value !== "number") continue;
      if (key === "x") properties.x = value - baseX;
      else if (key === "y") properties.y = value - baseY;
      else if (key === "scale") {
        properties.scale = baseScale !== 0 ? value / baseScale : value;
      } else {
        properties[key] = value;
      }
    }
    if (skipBaseSet && a.method === "set" && time < baseTimeEpsilon && Object.values(properties).every(
      (v) => typeof v === "number" && Math.abs(v) < baseValueEpsilon
    )) {
      return null;
    }
    return {
      id: a.id.replace(/^.*-kf-/, ""),
      time,
      properties,
      ease: a.ease
    };
  }).filter((kf) => kf !== null);
}
var CSS_IDENTITY = {
  opacity: 1,
  autoAlpha: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};
function cssIdentityValue(prop) {
  return CSS_IDENTITY[prop] ?? 0;
}
function buildIdentityMap(props) {
  const identity = {};
  for (const [key, val] of Object.entries(props)) {
    if (val != null) identity[key] = typeof val === "number" ? cssIdentityValue(key) : val;
  }
  return identity;
}
function resolveConversionProps(anim, resolvedFromValues) {
  if (anim.method === "set") {
    return { fromProps: { ...anim.properties }, toProps: { ...anim.properties } };
  }
  if (anim.method === "to") {
    const identity = buildIdentityMap(anim.properties);
    const fromProps = resolvedFromValues ? { ...identity, ...resolvedFromValues } : identity;
    return { fromProps, toProps: { ...anim.properties } };
  }
  if (anim.method === "from") {
    const identity = buildIdentityMap(anim.properties);
    const toProps2 = resolvedFromValues ? { ...identity, ...resolvedFromValues } : identity;
    return { fromProps: { ...anim.properties }, toProps: toProps2 };
  }
  const toProps = resolvedFromValues ? { ...anim.properties, ...resolvedFromValues } : { ...anim.properties };
  return { fromProps: { ...anim.fromProperties ?? {} }, toProps };
}
function clipTweenMatcher(clipSelectors, root, queries = /* @__PURE__ */ new Map()) {
  const own = typeof clipSelectors === "string" ? [clipSelectors] : clipSelectors;
  if (!root)
    return ({ targetSelector, hasPartialSelector }) => !hasPartialSelector && own.includes(targetSelector);
  const queryAll = (selector) => {
    if (ID_SELECTOR.test(selector)) {
      if (!queries.has(ALL_IDS)) indexIds(root, queries);
      return queries.get(selector) ?? [];
    }
    let found = queries.get(selector);
    if (!found) queries.set(selector, found = queryRoot(root, selector));
    return found;
  };
  const clips = own.flatMap((selector) => queryAll(selector));
  return ({ targetSelector, hasPartialSelector }) => {
    if (hasPartialSelector) return false;
    if (own.includes(targetSelector)) return true;
    if (clips.length === 0) return false;
    const targets = queryAll(targetSelector);
    return targets.length > 0 && targets.every((target) => {
      const owner = target.closest("[data-start]");
      return clips.includes(target) || owner !== null && clips.includes(owner);
    });
  };
}
function hasExplicitTime(animation) {
  return typeof animation.position === "number" && !animation.implicitPosition;
}
var ID_SELECTOR = /^#-?[A-Za-z_][\w-]*$/;
var ALL_IDS = "[id]";
function indexIds(root, queries) {
  const all = queryRoot(root, ALL_IDS);
  queries.set(ALL_IDS, all);
  for (const el of all) {
    const key = `#${el.id}`;
    if (!ID_SELECTOR.test(key)) continue;
    const list = queries.get(key);
    if (list) list.push(el);
    else queries.set(key, [el]);
  }
}
function queryRoot(root, selector) {
  try {
    return Array.from(root.querySelectorAll(selector));
  } catch {
    return [];
  }
}
var roundPercentage = (percentage) => Math.round(percentage * 10) / 10;
var OBJECT_ARRAY_PERCENTAGE_TOLERANCE = 2;
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
function getCompatibleObjectArrayKeyframeTiming(durations, outerDuration) {
  const timing = getObjectArrayKeyframeTiming(durations);
  if (!timing) return null;
  const stepsAuthorDuration = durations.some((duration) => duration !== void 0);
  if (!stepsAuthorDuration || outerDuration === void 0) return timing;
  if (typeof outerDuration === "number" && Math.abs(outerDuration - timing.totalDuration) <= Number.EPSILON) {
    return timing;
  }
  return null;
}
function findObjectArrayKeyframeIndex(durations, percentage, options) {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return null;
  const timing = getObjectArrayKeyframeTiming(durations);
  if (!timing) return null;
  const { percentages } = timing;
  let match = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < percentages.length; index++) {
    const distance = Math.abs(percentages[index] - percentage);
    if (distance < bestDistance) {
      match = index;
      bestDistance = distance;
    }
  }
  const tolerance = options?.tolerance ?? OBJECT_ARRAY_PERCENTAGE_TOLERANCE;
  return bestDistance <= tolerance || options?.fallbackToNearest ? match : null;
}
var SPRING_PRESETS = [
  { name: "spring-gentle", label: "Gentle", mass: 1, stiffness: 100, damping: 15 },
  { name: "spring-bouncy", label: "Bouncy", mass: 1, stiffness: 180, damping: 12 },
  { name: "spring-stiff", label: "Stiff", mass: 1, stiffness: 300, damping: 20 },
  { name: "spring-wobbly", label: "Wobbly", mass: 1, stiffness: 120, damping: 8 },
  { name: "spring-heavy", label: "Heavy", mass: 3, stiffness: 200, damping: 20 }
];
function sampleSpringEase(mass, stiffness, damping, progress) {
  if (![mass, stiffness, damping].every((value) => Number.isFinite(value) && value > 0) || !Number.isFinite(progress)) {
    throw new RangeError("Spring values must be finite, with positive mass, stiffness and damping");
  }
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const decayRate = zeta < 1 ? zeta * w0 : zeta * w0 - w0 * Math.sqrt(zeta * zeta - 1);
  const settleDuration = Math.min((zeta < 1 ? 5 : 4) / Math.max(decayRate, 0.01), 10);
  const simT = progress * Math.max(settleDuration, 1);
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * simT) * (Math.cos(wd * simT) + zeta * w0 / wd * Math.sin(wd * simT));
  }
  if (zeta === 1) return 1 - (1 + w0 * simT) * Math.exp(-w0 * simT);
  const s1 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
  const s2 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
  return 1 + (s1 * Math.exp(s2 * simT) - s2 * Math.exp(s1 * simT)) / (s2 - s1);
}
function generateSpringEaseData(mass, stiffness, damping, steps = 120) {
  if (!Number.isInteger(steps) || steps < 2 || steps > 1024) throw new RangeError("Spring samples must be an integer from 2 to 1024");
  const segments = ["M0,0"];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    segments.push(`${t.toFixed(4)},${sampleSpringEase(mass, stiffness, damping, t).toFixed(4)}`);
  }
  segments[segments.length - 1] = "1,1";
  return `${segments[0]} L${segments.slice(1).join(" ")}`;
}
var GSAP_METHODS = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
function parseScript(script) {
  return recast.parse(script, {
    parser: {
      parse(source) {
        return (0, import_parser.parse)(source, { sourceType: "script", plugins: [], tokens: true });
      }
    }
  });
}
function collectScopeBindings(ast) {
  const bindings = /* @__PURE__ */ new Map();
  recast.types.visit(ast, {
    visitVariableDeclarator(path) {
      const name = path.node.id?.name;
      const init = path.node.init;
      if (name && init) {
        const val = resolveNode(init, bindings);
        if (val !== void 0) bindings.set(name, val);
      }
      this.traverse(path);
    }
  });
  return bindings;
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
  return void 0;
}
function extractLiteralValue(node, scope) {
  return resolveNode(node, scope);
}
var QUERY_METHODS = /* @__PURE__ */ new Set(["querySelector", "querySelectorAll"]);
var ITERATION_METHODS = /* @__PURE__ */ new Set(["forEach", "map"]);
var SCOPE_NODE_TYPES = /* @__PURE__ */ new Set([
  "Program",
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
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
function enclosingScopeNode(path) {
  let p = path?.parentPath;
  while (p) {
    if (SCOPE_NODE_TYPES.has(p.node?.type)) return p.node;
    p = p.parentPath;
  }
  return null;
}
function scopeChainOf(path) {
  const chain = [];
  let p = path;
  while (p) {
    if (SCOPE_NODE_TYPES.has(p.node?.type)) chain.push(p.node);
    p = p.parentPath;
  }
  return chain;
}
function addBinding(bindings, scopeNode, name, selector) {
  let scoped = bindings.get(scopeNode);
  if (!scoped) {
    scoped = /* @__PURE__ */ new Map();
    bindings.set(scopeNode, scoped);
  }
  if (!scoped.has(name)) scoped.set(name, selector);
}
function directHelperReturn(node) {
  if (node.type === "ArrowFunctionExpression" && node.body?.type !== "BlockStatement") {
    return node.body;
  }
  if (!isFunctionNode(node) || node.body?.type !== "BlockStatement") return null;
  const returns = (node.body.body ?? []).filter(
    (statement) => statement.type === "ReturnStatement" && statement.argument
  );
  return returns.length === 1 ? returns[0].argument : null;
}
function collectTargetHelpers(ast) {
  const helpers = /* @__PURE__ */ new Map();
  const add = (scopeNode, name, fn) => {
    const returnNode = directHelperReturn(fn);
    const params = (fn.params ?? []).filter((param) => param.type === "Identifier").map((param) => param.name);
    if (!returnNode || params.length !== (fn.params?.length ?? 0)) return;
    let scoped = helpers.get(scopeNode);
    if (!scoped) {
      scoped = /* @__PURE__ */ new Map();
      helpers.set(scopeNode, scoped);
    }
    if (!scoped.has(name)) scoped.set(name, { params, returnNode });
  };
  recast.types.visit(ast, {
    visitFunctionDeclaration(path) {
      const name = path.node.id?.name;
      const scopeNode = enclosingScopeNode(path);
      if (name && scopeNode) add(scopeNode, name, path.node);
      this.traverse(path);
    },
    visitVariableDeclarator(path) {
      const name = path.node.id?.name;
      const fn = path.node.init;
      const scopeNode = enclosingScopeNode(path);
      if (name && fn && isFunctionNode(fn) && scopeNode) add(scopeNode, name, fn);
      this.traverse(path);
    }
  });
  return helpers;
}
function lookupTargetHelper(name, path, helpers) {
  for (const scopeNode of scopeChainOf(path)) {
    const helper = helpers.get(scopeNode)?.get(name);
    if (helper) return helper;
  }
  return null;
}
function selectorFromTargetCall(node, path, scope, helpers) {
  const direct = selectorFromQueryCall(node, scope);
  if (direct) return direct;
  if (node?.type !== "CallExpression" || node.callee?.type !== "Identifier") return null;
  const helper = lookupTargetHelper(node.callee.name, path, helpers);
  if (!helper || helper.params.length !== (node.arguments?.length ?? 0)) return null;
  const helperScope = new Map(scope);
  for (let i = 0; i < helper.params.length; i += 1) {
    const param = helper.params[i];
    if (!param) return null;
    const value = resolveNode(node.arguments[i], scope);
    if (value === void 0) return null;
    helperScope.set(param, value);
  }
  return selectorFromQueryCall(helper.returnNode, helperScope);
}
function collectTargetBindings(ast, scope, helpers) {
  const bindings = /* @__PURE__ */ new Map();
  recast.types.visit(ast, {
    visitVariableDeclarator(path) {
      const name = path.node.id?.name;
      const selector = selectorFromTargetCall(path.node.init, path, scope, helpers);
      const scopeNode = enclosingScopeNode(path);
      if (name && selector !== null && scopeNode) addBinding(bindings, scopeNode, name, selector);
      this.traverse(path);
    },
    visitAssignmentExpression(path) {
      const left = path.node.left;
      const selector = selectorFromTargetCall(path.node.right, path, scope, helpers);
      const scopeNode = enclosingScopeNode(path);
      if (left?.type === "Identifier" && selector !== null && scopeNode) {
        addBinding(bindings, scopeNode, left.name, selector);
      }
      this.traverse(path);
    }
  });
  recast.types.visit(ast, {
    visitCallExpression(path) {
      const node = path.node;
      const callee = node.callee;
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && ITERATION_METHODS.has(callee.property.name)) {
        const collectionSelector = resolveCollectionSelector(callee.object, path, scope, bindings);
        const fn = node.arguments?.[0];
        const param = fn?.params?.[0];
        if (collectionSelector && param?.type === "Identifier" && isFunctionNode(fn)) {
          addBinding(bindings, fn, param.name, collectionSelector);
        }
      }
      this.traverse(path);
    }
  });
  return bindings;
}
function isFunctionNode(node) {
  return node?.type === "ArrowFunctionExpression" || node?.type === "FunctionExpression" || node?.type === "FunctionDeclaration";
}
function resolveCollectionSelector(node, callPath, scope, bindings) {
  if (node?.type === "Identifier") return lookupBinding(node.name, callPath, bindings);
  if (node?.type === "CallExpression") return selectorFromQueryCall(node, scope);
  return null;
}
function lookupBinding(name, path, bindings) {
  for (const scopeNode of scopeChainOf(path)) {
    const selector = bindings.get(scopeNode)?.get(name);
    if (selector !== void 0) return selector;
  }
  return null;
}
function hasUnresolvedArrayPart(node, path, scope, bindings, helpers) {
  return node?.type === "ArrayExpression" && node.elements.some(
    (el) => !resolveTargetSelector(el, path, scope, bindings, helpers) || hasUnresolvedArrayPart(el, path, scope, bindings, helpers)
  );
}
function resolveTargetSelector(node, path, scope, bindings, helpers) {
  if (!node) return null;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    return typeof node.value === "string" ? node.value : null;
  }
  if (node.type === "Identifier") {
    return lookupBinding(node.name, path, bindings);
  }
  if (node.type === "CallExpression") {
    return selectorFromTargetCall(node, path, scope, helpers);
  }
  if (node.type === "ArrayExpression") {
    const parts = node.elements.map((el) => resolveTargetSelector(el, path, scope, bindings, helpers)).filter((s) => typeof s === "string" && s.length > 0);
    return parts.length > 0 ? parts.join(", ") : null;
  }
  if (node.type === "MemberExpression" && node.object?.type === "Identifier") {
    return lookupBinding(node.object.name, path, bindings);
  }
  return null;
}
function objectExpressionToRecord(node, scope) {
  const result = {};
  if (node?.type !== "ObjectExpression") return result;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.name ?? prop.key?.value;
    if (!key) continue;
    const resolved = resolveNode(prop.value, scope);
    if (resolved !== void 0) {
      result[key] = resolved;
    } else {
      result[key] = `__raw:${recast.print(prop.value).code}`;
    }
  }
  return result;
}
function isGsapTimelineCall(node) {
  return node?.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.object?.name === "gsap" && node.callee.property?.name === "timeline";
}
function staticMemberKey(node) {
  if (!node || node.type !== "MemberExpression") return null;
  if (node.computed) {
    const p = node.property;
    if (p?.type === "StringLiteral") return p.value;
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
function timelineRootSource(ref) {
  return ref.kind === "identifier" ? ref.name : recast.print(ref.node).code;
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
  const record = objectExpressionToRecord(defaultsProp.value, scope);
  const result = {};
  if (typeof record.ease === "string") result.ease = record.ease;
  if (typeof record.duration === "number") result.duration = record.duration;
  return Object.keys(result).length > 0 ? result : void 0;
}
function findTimelineVar(ast, scope) {
  let timelineVar = null;
  let ref = null;
  let timelineCount = 0;
  let defaults;
  const emptyScope = scope ?? /* @__PURE__ */ new Map();
  recast.types.visit(ast, {
    visitVariableDeclarator(path) {
      if (isGsapTimelineCall(path.node.init)) {
        timelineCount += 1;
        if (!ref && path.node.id?.type === "Identifier") {
          timelineVar = path.node.id.name;
          ref = { kind: "identifier", name: path.node.id.name };
          defaults = extractTimelineDefaults(path.node.init, emptyScope);
        }
      }
      this.traverse(path);
    },
    visitAssignmentExpression(path) {
      if (isGsapTimelineCall(path.node.right)) {
        timelineCount += 1;
        if (!ref) {
          const left = path.node.left;
          if (left?.type === "Identifier") {
            timelineVar = left.name;
            ref = { kind: "identifier", name: left.name };
            defaults = extractTimelineDefaults(path.node.right, emptyScope);
          } else if (isStaticMemberRef(left)) {
            ref = { kind: "member", node: left };
            defaults = extractTimelineDefaults(path.node.right, emptyScope);
          }
        }
      }
      this.traverse(path);
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
function findAllTweenCalls(ast, ref, scope, targetBindings, targetHelpers) {
  const results = [];
  recast.types.visit(ast, {
    visitCallExpression(path) {
      const node = path.node;
      const callee = node.callee;
      const gsapSetArg = node.arguments?.[0];
      const isGlobalSet = callee?.type === "MemberExpression" && callee.object?.type === "Identifier" && callee.object.name === "gsap" && callee.property?.type === "Identifier" && callee.property.name === "set" && (gsapSetArg?.type === "StringLiteral" || gsapSetArg?.type === "Literal" && typeof gsapSetArg.value === "string");
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && (isTimelineRootedCall(node, ref) || isGlobalSet)) {
        const method = callee.property.name;
        if (!GSAP_METHODS.has(method)) {
          this.traverse(path);
          return;
        }
        const args = node.arguments;
        if (args.length < 2) {
          this.traverse(path);
          return;
        }
        const selectorValue = resolveTargetSelector(args[0], path, scope, targetBindings, targetHelpers) ?? "__unresolved__";
        const partial = hasUnresolvedArrayPart(args[0], path, scope, targetBindings, targetHelpers) ? { selectorPartial: true } : {};
        if (method === "fromTo") {
          results.push({
            path,
            node,
            method: "fromTo",
            selector: selectorValue,
            ...partial,
            fromArg: args[1],
            varsArg: args[2],
            positionArg: args[3]
          });
        } else {
          results.push({
            path,
            node,
            method,
            selector: selectorValue,
            ...partial,
            varsArg: args[1],
            positionArg: args[2],
            ...isGlobalSet ? { global: true } : {}
          });
        }
      }
      this.traverse(path);
    }
  });
  return results;
}
function extractRawPropertySource(varsArgNode, key) {
  const node = findPropertyNode(varsArgNode, key);
  return node ? recast.print(node).code : void 0;
}
function findPropertyNode(varsArgNode, key) {
  if (varsArgNode?.type !== "ObjectExpression") return void 0;
  for (const prop of varsArgNode.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    if (propKeyName(prop) === key) return prop.value;
  }
  return void 0;
}
var PERCENTAGE_KEY_RE = /^(\d+(?:\.\d+)?)%$/;
function tryResolveStringProp(propValue, scope) {
  const val = resolveNode(propValue, scope);
  return typeof val === "string" ? val : void 0;
}
function parseKeyframesNode(node, scope) {
  if (!node) return void 0;
  if (node.type === "ArrayExpression") {
    return parseObjectArrayKeyframes(node, scope);
  }
  if (node.type !== "ObjectExpression") return void 0;
  const props = node.properties ?? [];
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
  if (hasPercentageKey) return parsePercentageKeyframes(node, scope);
  if (hasArrayValue) return parseSimpleArrayKeyframes(node, scope);
  return void 0;
}
function parsePercentageKeyframes(node, scope) {
  const keyframes = [];
  let ease;
  let easeEach;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.value ?? prop.key?.name;
    if (typeof key !== "string") continue;
    const pctMatch = PERCENTAGE_KEY_RE.exec(key);
    if (pctMatch) {
      const percentage = Number.parseFloat(pctMatch[1]);
      const record = objectExpressionToRecord(prop.value, scope);
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
      ease = tryResolveStringProp(prop.value, scope) ?? ease;
    } else if (key === "easeEach") {
      easeEach = tryResolveStringProp(prop.value, scope) ?? easeEach;
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
function computeKeyframesTotalDuration(varsNode, scope) {
  const kfNode = (varsNode.properties ?? []).find(
    (p) => (p.key?.name ?? p.key?.value) === "keyframes"
  )?.value;
  if (!kfNode || kfNode.type !== "ArrayExpression") return void 0;
  const durations = [];
  for (const el of kfNode.elements ?? []) {
    if (!el || el.type !== "ObjectExpression") continue;
    const r = objectExpressionToRecord(el, scope);
    durations.push(r.duration);
  }
  return getObjectArrayKeyframeTiming(durations)?.totalDuration;
}
function parseObjectArrayKeyframes(node, scope) {
  const elements = node.elements ?? [];
  const raw = [];
  for (const el of elements) {
    if (!el || el.type !== "ObjectExpression" && el.type !== "ObjectProperty") {
      if (el?.type !== "ObjectExpression") continue;
    }
    const record = objectExpressionToRecord(el, scope);
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
      }
    }
    raw.push({ properties, duration, ease });
  }
  const timing = getObjectArrayKeyframeTiming(raw.map((entry) => entry.duration));
  if (!timing) return void 0;
  const { percentages } = timing;
  const keyframes = raw.map(
    (entry, index) => ({
      percentage: percentages[index],
      properties: entry.properties,
      ...entry.ease ? { ease: entry.ease } : {}
    })
  );
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
        if (typeof val === "number" || typeof val === "string") {
          values.push(val);
        }
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
function parseMotionPathNode(node, scope) {
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
    const rec = objectExpressionToRecord(elem, scope);
    const x = typeof rec.x === "number" ? rec.x : void 0;
    const y = typeof rec.y === "number" ? rec.y : void 0;
    if (x !== void 0 && y !== void 0) coords.push({ x, y });
  }
  if (coords.length < 2) return void 0;
  let waypoints;
  const segments = [];
  if (isCubic && coords.length >= 4) {
    waypoints = [];
    waypoints.push(coords[0]);
    for (let i = 1; i + 2 < coords.length; i += 3) {
      const cp1 = coords[i];
      const cp2 = coords[i + 1];
      const anchor = coords[i + 2];
      waypoints.push(anchor);
      segments.push({ curviness, cp1, cp2 });
    }
  } else {
    waypoints = coords;
    for (let i = 0; i < waypoints.length - 1; i++) {
      segments.push({ curviness });
    }
  }
  return {
    arcPath: { enabled: true, autoRotate, segments },
    waypoints
  };
}
function tweenCallToAnimation(call, scope) {
  const vars = objectExpressionToRecord(call.varsArg, scope);
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
      keyframesData = parseKeyframesNode(kfNode, scope);
      if (!keyframesData && kfNode) hasUnresolvedKeyframes = true;
      continue;
    }
    if (key === "motionPath") {
      const mpNode = findPropertyNode(call.varsArg, "motionPath");
      motionPathResult = parseMotionPathNode(mpNode, scope);
      continue;
    }
    if (key === "easeEach") {
      continue;
    }
    if (EXTRAS_KEYS.has(key)) {
      const rawSource = extractRawPropertySource(call.varsArg, key);
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
          kfs[i].properties.x = waypoints[i].x;
          kfs[i].properties.y = waypoints[i].y;
        }
      }
    }
  }
  let fromProperties;
  if (call.method === "fromTo" && call.fromArg) {
    fromProperties = {};
    const fromVars = objectExpressionToRecord(call.fromArg, scope);
    for (const [key, val] of Object.entries(fromVars)) {
      if (typeof val === "number" || typeof val === "string") {
        fromProperties[key] = val;
      }
    }
  }
  const hasPositionArg = !!call.positionArg;
  const posVal = call.positionArg ? extractLiteralValue(call.positionArg, scope) : 0;
  const position = typeof posVal === "number" ? posVal : typeof posVal === "string" ? posVal : 0;
  let duration = typeof vars.duration === "number" ? vars.duration : void 0;
  const ease = typeof vars.ease === "string" ? vars.ease : void 0;
  if (duration === void 0 && keyframesData) {
    duration = computeKeyframesTotalDuration(call.varsArg, scope);
  }
  const anim = {
    targetSelector: call.selector,
    method: call.method,
    position,
    properties,
    fromProperties,
    duration,
    ease
  };
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
  if (call.selector === "__unresolved__") anim.hasUnresolvedSelector = true;
  if (call.selectorPartial) anim.hasPartialSelector = true;
  return anim;
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
function applyTimelineDefaults(anims, defaults) {
  if (!defaults) return;
  for (const anim of anims) {
    if (anim.method === "set") continue;
    if (anim.duration === void 0 && defaults.duration !== void 0) {
      anim.duration = defaults.duration;
    }
    if (anim.ease === void 0 && defaults.ease !== void 0 && (!anim.keyframes || anim.keyframes.fromMotionPath)) {
      anim.ease = defaults.ease;
    }
  }
}
function resolveTimelinePositions(anims) {
  let cursor = 0;
  let prevStart = 0;
  for (const anim of anims) {
    if (anim.method === "set" && anim.global) {
      anim.resolvedStart = 0;
      continue;
    }
    const duration = anim.method === "set" ? 0 : anim.duration ?? GSAP_DEFAULT_DURATION;
    let start;
    if (anim.implicitPosition) {
      start = cursor;
    } else if (typeof anim.position === "number") {
      start = anim.position;
    } else if (typeof anim.position === "string") {
      start = resolvePositionString(anim.position, cursor, prevStart);
    } else {
      start = cursor;
    }
    if (start != null) {
      anim.resolvedStart = Math.max(0, start);
      prevStart = anim.resolvedStart;
      cursor = Math.max(cursor, anim.resolvedStart + duration);
    }
  }
}
function sortBySourcePosition(calls) {
  calls.sort((a, b) => {
    const aLoc = a.node.callee?.property?.loc?.start;
    const bLoc = b.node.callee?.property?.loc?.start;
    if (!aLoc || !bLoc) return 0;
    return aLoc.line - bLoc.line || aLoc.column - bLoc.column;
  });
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
function parseGsapAst(script) {
  const ast = parseScript(script);
  const scope = collectScopeBindings(ast);
  const targetHelpers = collectTargetHelpers(ast);
  const targetBindings = collectTargetBindings(ast, scope, targetHelpers);
  const detection = findTimelineVar(ast, scope);
  const ref = detection.ref ?? { kind: "identifier", name: "tl" };
  const timelineVar = timelineRootSource(ref);
  const calls = findAllTweenCalls(ast, ref, scope, targetBindings, targetHelpers);
  sortBySourcePosition(calls);
  const rawAnims = calls.map((call) => tweenCallToAnimation(call, scope));
  applyTimelineDefaults(rawAnims, detection.defaults);
  resolveTimelinePositions(rawAnims);
  const animations = assignStableIds(rawAnims);
  const located = animations.map((animation, i) => ({
    id: animation.id,
    call: calls[i],
    animation
  }));
  return { ast, scope, timelineVar, detection, located };
}
function parseGsapScript(script) {
  try {
    const { detection, timelineVar, located } = parseGsapAst(script);
    const ref = detection.ref ?? { kind: "identifier", name: "tl" };
    const animations = located.map((l) => l.animation);
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
function parseExpr(code) {
  return parseScript(`__hf__ = ${code};`).program.body[0].expression.right;
}
function propKeyName(prop) {
  return prop?.key?.name ?? prop?.key?.value;
}
function isObjectProperty(prop) {
  return prop?.type === "ObjectProperty" || prop?.type === "Property";
}
function isEditablePropertyKey(key) {
  return !isTweenConfigKey(key);
}
function makeObjectProperty(key, value) {
  const obj = parseExpr(`{ ${safeJsKey(key)}: ${serializeValue(value)} }`);
  return obj.properties[0];
}
function setVarsKey(varsArg, key, value) {
  if (varsArg?.type !== "ObjectExpression") return;
  const existing = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === key
  );
  if (existing) {
    existing.value = parseExpr(serializeValue(value));
  } else {
    varsArg.properties.push(makeObjectProperty(key, value));
  }
}
function filterEditableKeys(varsArg, shouldKeep) {
  if (varsArg?.type !== "ObjectExpression") return;
  varsArg.properties = varsArg.properties.filter((p) => {
    if (!isObjectProperty(p)) return true;
    const key = propKeyName(p);
    if (typeof key !== "string") return true;
    if (!isEditablePropertyKey(key)) return true;
    return shouldKeep(key);
  });
}
function reconcileEditableProperties(varsArg, newProps) {
  filterEditableKeys(varsArg, (key) => key in newProps);
  for (const [key, value] of Object.entries(newProps)) {
    setVarsKey(varsArg, key, value);
  }
}
function applyEaseUpdate(varsArg, ease) {
  const kfNode = findKeyframesObjectNode(varsArg);
  if (kfNode) {
    setVarsKey(kfNode, "easeEach", ease);
    removeVarsKey(varsArg, "ease");
  } else {
    setVarsKey(varsArg, "ease", ease);
  }
}
function stripKeyframeEases(varsArg) {
  const kfNode = findKeyframesObjectNode(varsArg);
  const props = kfNode?.properties;
  if (!Array.isArray(props)) return;
  for (const entry of props) {
    if (isObjectProperty(entry)) removeVarsKey(entry.value, "ease");
  }
}
function applyUpdatesToCall(call, updates) {
  if (updates.properties) reconcileEditableProperties(call.varsArg, updates.properties);
  if (updates.fromProperties && call.method === "fromTo" && call.fromArg) {
    reconcileEditableProperties(call.fromArg, updates.fromProperties);
  }
  if (updates.duration !== void 0) setVarsKey(call.varsArg, "duration", updates.duration);
  if (updates.easeEach !== void 0) applyEaseUpdate(call.varsArg, updates.easeEach);
  else if (updates.ease !== void 0) applyEaseUpdate(call.varsArg, updates.ease);
  if (updates.resetKeyframeEases) stripKeyframeEases(call.varsArg);
  if (updates.position !== void 0) {
    const posIdx = call.method === "fromTo" ? 3 : 2;
    call.node.arguments[posIdx] = parseExpr(serializeValue(updates.position));
  }
}
function findStatementPath(path) {
  let p = path;
  while (p) {
    if (p.node?.type === "ExpressionStatement") return p;
    p = p.parentPath;
  }
  return null;
}
function insertAfterAnchor(parsed, newStatement) {
  const lastCall = parsed.located[parsed.located.length - 1]?.call;
  const declaration = findTimelineDeclarationPath(parsed.ast, parsed.timelineVar);
  const statementList = declaration?.parentPath?.value ?? parsed.ast.program.body;
  let anchorPath = lastCall?.path ?? declaration;
  while (anchorPath && anchorPath.parentPath?.value !== statementList) {
    anchorPath = anchorPath.parentPath;
  }
  if (!anchorPath || declaration && anchorPath.node.start < declaration.node.start) {
    anchorPath = declaration;
  }
  if (anchorPath) {
    anchorPath.insertAfter(newStatement);
  } else {
    parsed.ast.program.body.push(newStatement);
  }
}
function buildTweenStatementCode(timelineVar, anim) {
  const selector = JSON.stringify(anim.targetSelector);
  const props = { ...anim.properties };
  if (anim.method !== "set" && anim.duration !== void 0) props.duration = anim.duration;
  if (anim.ease) props.ease = anim.ease;
  const entries = Object.entries(props).map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
  const emitted = new Set(Object.keys(props));
  if (anim.method === "set" && !anim.global && !emitted.has("immediateRender") && !(anim.extras && "immediateRender" in anim.extras)) {
    entries.push("immediateRender: true");
    emitted.add("immediateRender");
  }
  if (anim.extras) {
    for (const [k, v] of Object.entries(anim.extras)) {
      if (emitted.has(k)) continue;
      emitted.add(k);
      entries.push(`${safeJsKey(k)}: ${serializeValue(v)}`);
    }
  }
  const objCode = `{ ${entries.join(", ")} }`;
  const posCode = serializeValue(
    typeof anim.position === "number" ? anim.position : anim.position ?? 0
  );
  if (anim.method === "fromTo") {
    const fromEntries = Object.entries(anim.fromProperties ?? {}).map(
      ([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`
    );
    const fromCode = `{ ${fromEntries.join(", ")} }`;
    return `${timelineVar}.fromTo(${selector}, ${fromCode}, ${objCode}, ${posCode});`;
  }
  if (anim.method === "set" && anim.global) {
    return `gsap.set(${selector}, ${objCode});`;
  }
  return `${timelineVar}.${anim.method}(${selector}, ${objCode}, ${posCode});`;
}
function updateAnimationInScript(script, animationId, updates) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] updateAnimationInScript parse failed:", e);
    return script;
  }
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target || updates.properties && target.animation.hasUnresolvedKeyframes) return script;
  applyUpdatesToCall(target.call, updates);
  return recast.print(parsed.ast).code;
}
function shiftPositionsInScript(script, targetSelector, delta, root) {
  const carries = clipTweenMatcher(targetSelector, root);
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] shiftPositionsInScript parse failed:", e);
    return script;
  }
  let changed = false;
  for (const entry of parsed.located) {
    if (!carries(entry.animation) || !hasExplicitTime(entry.animation)) continue;
    const newPos = Math.max(0, Math.round((entry.animation.position + delta) * 1e3) / 1e3);
    applyUpdatesToCall(entry.call, { position: newPos });
    changed = true;
  }
  return changed ? recast.print(parsed.ast).code : script;
}
function scalePositionsInScript(script, targetSelector, oldStart, oldDuration, newStart, newDuration, root) {
  if (oldDuration <= 0 || newDuration <= 0) return script;
  const ratio = newDuration / oldDuration;
  const carries = clipTweenMatcher(targetSelector, root);
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] scalePositionsInScript parse failed:", e);
    return script;
  }
  let changed = false;
  for (const entry of parsed.located) {
    if (!carries(entry.animation) || typeof entry.animation.position !== "number") continue;
    const updates = {};
    if (hasExplicitTime(entry.animation)) {
      updates.position = Math.max(
        0,
        Math.round((newStart + (entry.animation.position - oldStart) * ratio) * 1e3) / 1e3
      );
    }
    if (typeof entry.animation.duration === "number" && entry.animation.duration > 0) {
      updates.duration = Math.max(
        1e-3,
        Math.round(entry.animation.duration * ratio * 1e3) / 1e3
      );
    }
    applyUpdatesToCall(entry.call, updates);
    changed = true;
  }
  return changed ? recast.print(parsed.ast).code : script;
}
function offsetNumericPositionProperties(properties, deltaX, deltaY, addMissingAxes = false) {
  const next = { ...properties };
  let changed = false;
  const offsetAxis = (primary, legacy, delta) => {
    const key = typeof next[primary] === "number" ? primary : typeof next[legacy] === "number" ? legacy : null;
    if (key) {
      next[key] = Math.round((next[key] + delta) * 1e3) / 1e3;
      changed = changed || delta !== 0;
    } else if (addMissingAxes && delta !== 0) {
      next[primary] = Math.round(delta * 1e3) / 1e3;
      changed = true;
    }
  };
  offsetAxis("x", "translateX", deltaX);
  offsetAxis("y", "translateY", deltaY);
  return { properties: next, changed };
}
function offsetMotionPathCoordinates(varsArg, scope, deltaX, deltaY) {
  const motionPath = findPropertyNode(varsArg, "motionPath");
  if (!motionPath) return false;
  const path = motionPath.type === "ArrayExpression" ? motionPath : motionPath.type === "ObjectExpression" ? findPropertyNode(motionPath, "path") : null;
  if (path?.type !== "ArrayExpression") return false;
  let changed = false;
  for (const point of path.elements ?? []) {
    if (point?.type !== "ObjectExpression") continue;
    for (const property of point.properties ?? []) {
      if (!isObjectProperty(property)) continue;
      const key = propKeyName(property);
      const delta = key === "x" ? deltaX : key === "y" ? deltaY : 0;
      const value = resolveNode(property.value, scope);
      if (delta === 0 || typeof value !== "number") continue;
      property.value = parseExpr(String(Math.round((value + delta) * 1e3) / 1e3));
      changed = true;
    }
  }
  return changed;
}
function offsetPositionPathsInScript(script, targetSelector, deltaX, deltaY, ownedSelectors = [targetSelector]) {
  if ((!Number.isFinite(deltaX) || deltaX === 0) && (!Number.isFinite(deltaY) || deltaY === 0)) {
    return script;
  }
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (error) {
    console.warn("[gsap-parser] offsetPositionPathsInScript parse failed:", error);
    return script;
  }
  const selectors = /* @__PURE__ */ new Set([targetSelector, ...ownedSelectors]);
  let changed = false;
  let hasGlobalPositionBase = false;
  for (const entry of parsed.located) {
    const animation = entry.animation;
    if (!selectors.has(animation.targetSelector) || isStudioHoldSet(animation)) continue;
    const isGlobalBase = animation.method === "set" && animation.global;
    if (isGlobalBase) {
      const shifted = offsetNumericPositionProperties(animation.properties, deltaX, deltaY, true);
      applyUpdatesToCall(entry.call, { properties: shifted.properties });
      hasGlobalPositionBase = true;
      changed = changed || shifted.changed;
      continue;
    }
    if (animation.arcPath) {
      changed = offsetMotionPathCoordinates(entry.call.varsArg, parsed.scope, deltaX, deltaY) || changed;
      continue;
    }
    if (animation.keyframes) {
      const shiftedKeyframes = animation.keyframes.keyframes.map((keyframe) => ({
        ...keyframe,
        ...offsetNumericPositionProperties(keyframe.properties, deltaX, deltaY)
      })).map(({ changed: _changed, ...keyframe }) => keyframe);
      const writesPosition = animation.keyframes.keyframes.some(
        (keyframe) => ["x", "y", "translateX", "translateY"].some(
          (property) => typeof keyframe.properties[property] === "number"
        )
      );
      if (!writesPosition) continue;
      const keyframesProperty = entry.call.varsArg.properties.find(
        (property) => isObjectProperty(property) && propKeyName(property) === "keyframes"
      );
      if (!keyframesProperty) continue;
      keyframesProperty.value = parseExpr(
        buildKeyframeObjectCode(
          shiftedKeyframes,
          animation.keyframes.easeEach ? { easeEach: animation.keyframes.easeEach } : void 0
        )
      );
      changed = true;
      continue;
    }
    const shiftedTo = offsetNumericPositionProperties(animation.properties, deltaX, deltaY);
    const shiftedFrom = animation.fromProperties ? offsetNumericPositionProperties(animation.fromProperties, deltaX, deltaY) : null;
    if (!shiftedTo.changed && !shiftedFrom?.changed) continue;
    applyUpdatesToCall(entry.call, {
      properties: shiftedTo.properties,
      ...shiftedFrom ? { fromProperties: shiftedFrom.properties } : {}
    });
    changed = true;
  }
  let result = changed ? recast.print(parsed.ast).code : script;
  if (!hasGlobalPositionBase) {
    result = addAnimationToScript(result, {
      targetSelector,
      method: "set",
      position: 0,
      properties: {
        x: Math.round(deltaX * 1e3) / 1e3,
        y: Math.round(deltaY * 1e3) / 1e3
      },
      global: true
    }).script;
  }
  return result;
}
function updateAnimationSelector(script, animationId, newSelector) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch {
    return script;
  }
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const selectorArg = target.call.path.node.arguments?.[0];
  if (selectorArg?.type === "StringLiteral") {
    selectorArg.value = newSelector;
  } else if (selectorArg?.type === "Identifier") {
    target.call.path.node.arguments[0] = { type: "StringLiteral", value: newSelector };
  }
  return recast.print(parsed.ast).code;
}
function addAnimationToScript(script, animation) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] addAnimationToScript parse failed:", e);
    return { script, id: "" };
  }
  if (parsed.located.length === 0 && parsed.detection.ref === null) {
    return { script, id: "" };
  }
  const id = `anim-${Date.now()}`;
  const statementCode = buildTweenStatementCode(parsed.timelineVar, animation);
  const newStatement = parseScript(statementCode).program.body[0];
  if (animation.method === "set" && animation.global) {
    const timeline = findTimelineDeclarationPath(parsed.ast, parsed.timelineVar);
    if (timeline) timeline.insertBefore(newStatement);
    else insertAfterAnchor(parsed, newStatement);
  } else {
    insertAfterAnchor(parsed, newStatement);
  }
  return { script: recast.print(parsed.ast).code, id };
}
function addAnimationWithKeyframesToScript(script, targetSelector, position, duration, keyframes, ease, easeEach, extras) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] addAnimationWithKeyframesToScript parse failed:", e);
    return { script, id: "" };
  }
  if (parsed.located.length === 0 && parsed.detection.ref === null) {
    return { script, id: "" };
  }
  const selector = JSON.stringify(targetSelector);
  const kfCode = buildKeyframeObjectCode(keyframes, easeEach ? { easeEach } : void 0);
  const varEntries = [`keyframes: ${kfCode}`, `duration: ${serializeValue(duration)}`];
  if (ease) varEntries.push(`ease: ${JSON.stringify(ease)}`);
  for (const [key, value] of Object.entries(extras ?? {})) {
    varEntries.push(`${safeJsKey(key)}: ${serializeValue(value)}`);
  }
  const posCode = serializeValue(position);
  const stmtCode = `${parsed.timelineVar}.to(${selector}, { ${varEntries.join(", ")} }, ${posCode});`;
  const newStatement = parseScript(stmtCode).program.body[0];
  insertAfterAnchor(parsed, newStatement);
  const result = recast.print(parsed.ast).code;
  const reParsed = parseGsapAst(result);
  const newId = reParsed.located[reParsed.located.length - 1]?.id ?? "";
  return { script: result, id: newId };
}
function findTimelineDeclarationPath(ast, timelineVar) {
  let found = null;
  recast.types.visit(ast, {
    visitVariableDeclaration(path) {
      if (found) return false;
      for (const decl of path.node.declarations ?? []) {
        if (decl.id?.name === timelineVar && isGsapTimelineCall(decl.init)) {
          found = path;
          return false;
        }
      }
      this.traverse(path);
    }
  });
  return found;
}
function findChainParentCall(stmtNode, targetNode) {
  let found = null;
  recast.types.visit(stmtNode, {
    visitCallExpression(p) {
      if (found) return false;
      if (p.node.callee?.type === "MemberExpression" && p.node.callee.object === targetNode) {
        found = p.node;
        return false;
      }
      this.traverse(p);
    }
  });
  return found;
}
function removeAnimationFromScript(script, animationId) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] removeAnimationFromScript parse failed:", e);
    return script;
  }
  let target = parsed.located.find((l) => l.id === animationId);
  if (!target) {
    const convertedId = animationId.replace(/-from-|-fromTo-/, "-to-");
    target = parsed.located.find((l) => l.id === convertedId);
  }
  if (!target) return script;
  removeCallFromAst(target.call);
  return recast.print(parsed.ast).code;
}
function removeCallFromAst(call) {
  const node = call.node;
  const stmtPath = findStatementPath(call.path);
  if (!stmtPath) return;
  const parentCall = findChainParentCall(stmtPath.node, node);
  if (parentCall) {
    parentCall.callee.object = node.callee.object;
  } else if (node.callee?.object?.type === "CallExpression") {
    stmtPath.node.expression = node.callee.object;
  } else {
    stmtPath.prune();
  }
}
function dedupePositionWritesInScript(script, selector, keepId) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch {
    return script;
  }
  const posWrites = parsed.located.filter(
    (l) => l.animation.targetSelector === selector && isXYPositionWrite(l.animation)
  );
  if (posWrites.length <= 1) return script;
  const keeper = posWrites.find((l) => l.id === keepId) ?? posWrites[posWrites.length - 1];
  for (const l of posWrites) {
    if (l === keeper) continue;
    removeCallFromAst(l.call);
  }
  return recast.print(parsed.ast).code;
}
function insertInheritedStateSet(script, selector, position, properties) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch {
    return script;
  }
  const tlVar = parsed.timelineVar;
  const props = Object.entries(properties).map(([k, v]) => `${k}: ${typeof v === "string" ? JSON.stringify(v) : v}`).join(", ");
  const code = `${tlVar}.set(${JSON.stringify(selector)}, { ${props} }, ${position});`;
  const newStatement = parseScript(code).program.body[0];
  const anchor = findTimelineDeclarationPath(parsed.ast, tlVar);
  if (anchor) {
    anchor.insertAfter(newStatement);
  } else if (parsed.located.length > 0) {
    const firstTween = parsed.located[0].call;
    const stmtPath = findStatementPath(firstTween.path);
    if (stmtPath) stmtPath.insertBefore(newStatement);
    else parsed.ast.program.body.unshift(newStatement);
  } else {
    parsed.ast.program.body.push(newStatement);
  }
  return recast.print(parsed.ast).code;
}
var STUDIO_HOLD_MARKER = "hf-hold";
function isStudioHoldSet(anim) {
  const extra = anim.extras?.data;
  let data = extra;
  if (typeof extra === "string" && extra.startsWith("__raw:")) {
    try {
      data = JSON.parse(extra.slice(6));
    } catch {
      data = extra.slice(6).replace(/^['"]|['"]$/g, "");
    }
  }
  return anim.method === "set" && data === STUDIO_HOLD_MARKER;
}
function animationsOf(script) {
  try {
    return parseGsapScript(script).animations;
  } catch {
    return null;
  }
}
function syncPositionHoldsBeforeKeyframes(script, previous) {
  let parsed;
  try {
    parsed = parseGsapScript(script);
  } catch {
    return script;
  }
  let result = script;
  const staleHoldIds = parsed.animations.filter(isStudioHoldSet).map((a) => a.id);
  for (const id of staleHoldIds) result = removeAnimationFromScript(result, id);
  let reparsed;
  try {
    reparsed = parseGsapScript(result);
  } catch {
    return result;
  }
  const scope = holdScope(
    parsed.animations,
    previous === void 0 ? null : animationsOf(previous)
  );
  for (const anim of reparsed.animations) {
    const posProps = keyframeHoldForAnimation(anim, reparsed.animations, scope);
    if (!posProps) continue;
    result = insertInheritedStateSet(result, anim.targetSelector, 0, {
      ...posProps,
      data: STUDIO_HOLD_MARKER
    });
  }
  return result;
}
function splitAnimationsInScript(script, opts) {
  const parsed = parseGsapScript(script);
  const originalSelector = `#${opts.originalId}`;
  const newSelector = `#${opts.newId}`;
  const skippedSelectors = [];
  for (const a of parsed.animations) {
    if (a.targetSelector !== originalSelector && a.targetSelector.includes(opts.originalId)) {
      skippedSelectors.push(a.targetSelector);
    }
  }
  const matching = parsed.animations.filter((a) => a.targetSelector === originalSelector);
  if (matching.length === 0) return { script, skippedSelectors };
  let result = script;
  const newElementStart = opts.splitTime;
  const inheritedProps = {};
  for (let i = matching.length - 1; i >= 0; i--) {
    const anim = matching[i];
    const pos = typeof anim.position === "number" ? anim.position : 0;
    const dur = anim.duration ?? 0;
    const animEnd = pos + dur;
    if (authorsKeyframes(anim)) {
      if (pos >= opts.splitTime) {
        result = updateAnimationSelector(result, anim.id, newSelector);
      } else if (animEnd > opts.splitTime) {
        skippedSelectors.push(`${originalSelector} (keyframes spanning split)`);
        const kfs = anim.keyframes?.keyframes ?? [];
        for (const kf of kfs) {
          const kfTime = pos + kf.percentage / 100 * dur;
          if (kfTime <= opts.splitTime) {
            for (const [k, v] of Object.entries(kf.properties)) {
              inheritedProps[k] = v;
            }
          }
        }
      } else {
        if (anim.hasUnresolvedKeyframes) {
          skippedSelectors.push(`${originalSelector} (unreadable keyframes before split)`);
        }
        const kfs = anim.keyframes?.keyframes ?? [];
        if (kfs.length > 0) {
          for (const [k, v] of Object.entries(kfs[kfs.length - 1].properties)) {
            inheritedProps[k] = v;
          }
        }
      }
      continue;
    }
    if (animEnd <= opts.splitTime) {
      if (anim.method === "from") {
        for (const k of Object.keys(anim.properties)) delete inheritedProps[k];
      } else {
        for (const [k, v] of Object.entries(anim.properties)) {
          inheritedProps[k] = v;
        }
      }
      continue;
    }
    if (pos >= opts.splitTime) {
      result = updateAnimationSelector(result, anim.id, newSelector);
      continue;
    }
    const progress = dur > 0 ? (opts.splitTime - pos) / dur : 0;
    const fromSource = anim.fromProperties ?? inheritedProps;
    const midProps = {};
    for (const [k, v] of Object.entries(anim.properties)) {
      if (typeof v !== "number") {
        midProps[k] = v;
        continue;
      }
      const fromVal = typeof fromSource[k] === "number" ? fromSource[k] : 0;
      midProps[k] = fromVal + (v - fromVal) * progress;
    }
    const firstHalfDuration = opts.splitTime - pos;
    result = updateAnimationInScript(result, anim.id, {
      duration: firstHalfDuration,
      properties: midProps
    });
    const secondHalfDuration = animEnd - opts.splitTime;
    const addResult = addAnimationToScript(result, {
      targetSelector: newSelector,
      method: "fromTo",
      position: newElementStart,
      duration: secondHalfDuration,
      properties: { ...anim.properties },
      fromProperties: { ...midProps },
      ease: anim.ease,
      extras: anim.extras
    });
    result = addResult.script;
    for (const [k, v] of Object.entries(midProps)) {
      inheritedProps[k] = v;
    }
  }
  if (Object.keys(inheritedProps).length > 0) {
    result = insertInheritedStateSet(result, newSelector, newElementStart, inheritedProps);
  }
  return { script: result, skippedSelectors };
}
function sortedKeyframes(kfs) {
  return kfs.slice().sort((a, b) => a.percentage - b.percentage);
}
function keyframePropsToCode(kf) {
  return Object.entries(kf.properties).map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
}
function buildKeyframeObjectCode(keyframes, options) {
  const entries = mergePercentageKeyframes(keyframes).map((kf) => {
    const props = keyframePropsToCode(kf);
    if (kf.ease) props.push(`ease: ${JSON.stringify(kf.ease)}`);
    if (kf.auto) props.push(`_auto: 1`);
    return `${JSON.stringify(plainPercentKey(kf.percentage))}: { ${props.join(", ")} }`;
  });
  if (options?.easeEach) entries.push(`easeEach: ${JSON.stringify(options.easeEach)}`);
  return `{ ${entries.join(", ")} }`;
}
function removeVarsKey(varsArg, key) {
  if (varsArg?.type !== "ObjectExpression") return;
  varsArg.properties = varsArg.properties.filter(
    (p) => !(isObjectProperty(p) && propKeyName(p) === key)
  );
}
function percentageFromKey(key) {
  const m = PERCENTAGE_KEY_RE.exec(key);
  return m ? Number.parseFloat(m[1]) : Number.NaN;
}
var PCT_TOLERANCE = 2;
var MOVE_NOOP_EPSILON_PCT = 0.05;
function findKeyframePropByPct(kfNode, percentage) {
  const props = kfNode.properties;
  for (let i = 0; i < props.length; i++) {
    if (!isObjectProperty(props[i])) continue;
    const key = propKeyName(props[i]);
    if (typeof key !== "string") continue;
    const parsed = percentageFromKey(key);
    if (Number.isNaN(parsed)) continue;
    if (Math.abs(parsed - percentage) <= PCT_TOLERANCE) return { idx: i, prop: props[i] };
  }
  return null;
}
function buildKeyframeValueNode(properties, ease) {
  const effectiveEase = ease ?? (typeof properties.ease === "string" ? properties.ease : void 0);
  const entries = Object.entries(properties).filter(([k]) => k !== "ease").map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
  if (effectiveEase) entries.push(`ease: ${JSON.stringify(effectiveEase)}`);
  return parseExpr(`{ ${entries.join(", ")} }`);
}
function setObjectExpressionEase(node, ease) {
  if (node?.type !== "ObjectExpression") return false;
  const props = node.properties ?? [];
  const easeIdx = props.findIndex(
    (property) => isObjectProperty(property) && propKeyName(property) === "ease"
  );
  const easeNode = parseExpr(`({ ease: ${JSON.stringify(ease)} })`).properties[0];
  if (easeIdx >= 0) props[easeIdx] = easeNode;
  else props.push(easeNode);
  return true;
}
function locateAnimation(script, animationId) {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch {
    return null;
  }
  const target = parsed.located.find((l) => l.id === animationId);
  return target ? { parsed, target } : null;
}
var ANIM_ID_RE = /^(.*)-(fromTo|from|to|set)-(\d+)-([a-z]+)$/;
function locateAnimationWithFallback(script, animationId) {
  const loc = locateAnimation(script, animationId);
  if (loc) return loc;
  const convertedId = animationId.replace(/-from-|-fromTo-/, "-to-");
  if (convertedId !== animationId) {
    const converted = locateAnimation(script, convertedId);
    if (converted) return converted;
  }
  const want = ANIM_ID_RE.exec(animationId);
  if (!want) return null;
  const [, sel, method, wantPosStr, group] = want;
  const wantPos = Number(wantPosStr);
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch {
    return null;
  }
  let best = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (const l of parsed.located) {
    const m = ANIM_ID_RE.exec(l.id);
    if (!m || m[1] !== sel || m[2] !== method || m[4] !== group) continue;
    const dist = Math.abs(Number(m[3]) - wantPos);
    if (dist < bestDist) {
      best = l;
      bestDist = dist;
    }
  }
  return best ? { parsed, target: best } : null;
}
function findKeyframesObjectNode(varsArg) {
  const node = findPropertyNode(varsArg, "keyframes");
  return node?.type === "ObjectExpression" ? node : null;
}
function convertArrayKeyframesToObjectNode(varsArg, scope) {
  if (varsArg?.type !== "ObjectExpression") return null;
  const prop = (varsArg.properties ?? []).find(
    (p) => isObjectProperty(p) && propKeyName(p) === "keyframes"
  );
  if (!prop || prop.value?.type !== "ArrayExpression") return null;
  const els = (prop.value.elements ?? []).filter(
    (e) => !!e && e.type === "ObjectExpression"
  );
  if (els.length === 0) return null;
  const records = els.map((element) => objectExpressionToRecord(element, scope));
  const outerDuration = objectExpressionToRecord(varsArg, scope).duration;
  const timing = getCompatibleObjectArrayKeyframeTiming(
    records.map((record) => record.duration),
    outerDuration
  );
  if (!timing) return null;
  if (findPropertyNode(varsArg, "duration") === void 0) {
    setVarsKey(varsArg, "duration", timing.totalDuration);
  }
  const entries = els.map((el, i) => {
    el.properties = (el.properties ?? []).filter(
      (property) => !isObjectProperty(property) || propKeyName(property) !== "duration"
    );
    return `${JSON.stringify(plainPercentKey(timing.percentages[i]))}: ${recast.print(el).code}`;
  });
  prop.value = parseExpr(`{ ${entries.join(", ")}, easeEach: "none" }`);
  return prop.value;
}
function filterPercentageProps(kfNode) {
  return kfNode.properties.filter((p) => {
    if (!isObjectProperty(p)) return false;
    const key = propKeyName(p);
    return typeof key === "string" && PERCENTAGE_KEY_RE.test(key);
  });
}
function collapseKeyframesToFlat(varsArg, record) {
  for (const [k, v] of Object.entries(record)) {
    if (k === "ease") continue;
    if (typeof v === "number" || typeof v === "string") setVarsKey(varsArg, k, v);
  }
  removeVarsKey(varsArg, "keyframes");
  removeVarsKey(varsArg, "easeEach");
}
function locateKeyframeCtx(script, animationId, percentage) {
  const loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return null;
  const kfNode = findKeyframesObjectNode(loc.target.call.varsArg);
  if (!kfNode) return null;
  return { loc, kfNode, pctKey: plainPercentKey(percentage) };
}
function addKeyframeToScript(script, animationId, percentage, properties, ease, backfillDefaults) {
  let loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  let kfNode = findKeyframesObjectNode(loc.target.call.varsArg);
  if (!kfNode) {
    kfNode = convertArrayKeyframesToObjectNode(loc.target.call.varsArg, loc.parsed.scope);
  }
  if (!kfNode) {
    script = convertToKeyframesInScript(script, animationId);
    loc = locateAnimationWithFallback(script, animationId);
    if (!loc) return script;
    kfNode = findKeyframesObjectNode(loc.target.call.varsArg);
    if (!kfNode) return script;
  }
  const pctKey = plainPercentKey(percentage);
  const newValueNode = buildKeyframeValueNode(properties, ease);
  const existing = findKeyframePropByPct(kfNode, percentage);
  if (existing) {
    if (existing.prop.value?.type === "ObjectExpression") {
      const existingRecord = objectExpressionToRecord(existing.prop.value, loc.parsed.scope);
      const merged = { ...existingRecord };
      for (const [k, v] of Object.entries(properties)) merged[k] = v;
      existing.prop.value = buildKeyframeValueNode(
        merged,
        ease ?? (typeof existingRecord.ease === "string" ? existingRecord.ease : void 0)
      );
    } else {
      existing.prop.value = newValueNode;
    }
  } else {
    const newProp = parseExpr(`{ ${JSON.stringify(pctKey)}: {} }`).properties[0];
    newProp.value = newValueNode;
    let insertIdx = kfNode.properties.length;
    for (let i = 0; i < kfNode.properties.length; i++) {
      const key = isObjectProperty(kfNode.properties[i]) ? propKeyName(kfNode.properties[i]) : void 0;
      if (typeof key === "string" && percentageFromKey(key) > percentage) {
        insertIdx = i;
        break;
      }
    }
    kfNode.properties.splice(insertIdx, 0, newProp);
  }
  if (percentage > 0 && percentage < 100) {
    const pctProps = filterPercentageProps(kfNode);
    const allPcts = pctProps.map((p) => percentageFromKey(propKeyName(p) ?? "")).filter((n) => !Number.isNaN(n) && n !== percentage).sort((a, b) => a - b);
    const leftNeighbor = allPcts.filter((p) => p < percentage).pop();
    const rightNeighbor = allPcts.find((p) => p > percentage);
    for (const endPct of [0, 100]) {
      const isNeighbor = endPct === 0 ? leftNeighbor === 0 : rightNeighbor === 100;
      if (!isNeighbor) continue;
      const endProp = pctProps.find(
        (p) => percentageFromKey(propKeyName(p) ?? "") === endPct
      );
      if (!endProp?.value || endProp.value.type !== "ObjectExpression") continue;
      const hasAuto = endProp.value.properties.some(
        (p) => isObjectProperty(p) && propKeyName(p) === "_auto"
      );
      if (!hasAuto) continue;
      const updatedProps = { ...properties, _auto: 1 };
      endProp.value = buildKeyframeValueNode(updatedProps, void 0);
    }
  }
  if (backfillDefaults) {
    const newPropKeys = Object.keys(properties);
    const pctProps = filterPercentageProps(kfNode);
    for (const prop of pctProps) {
      const key = propKeyName(prop);
      if (key === pctKey) continue;
      const valObj = prop.value;
      if (!valObj || valObj.type !== "ObjectExpression") continue;
      const existingKeys = new Set(
        valObj.properties.filter((p) => isObjectProperty(p)).map((p) => propKeyName(p))
      );
      for (const pk of newPropKeys) {
        if (existingKeys.has(pk)) continue;
        const defaultVal = backfillDefaults[pk];
        if (defaultVal == null) continue;
        const fillProp = parseExpr(`{ ${safeJsKey(pk)}: ${serializeValue(defaultVal)} }`).properties[0];
        valObj.properties.push(fillProp);
      }
    }
  }
  return recast.print(loc.parsed.ast).code;
}
function removeKeyframeFromScript(script, animationId, percentage) {
  const arrLoc = locateAnimationWithFallback(script, animationId);
  const arrVal = arrLoc && findPropertyNode(arrLoc.target.call.varsArg, "keyframes");
  if (arrLoc && arrVal?.type === "ArrayExpression") {
    const elements = (arrVal.elements ?? []).filter(
      (e) => !!e && e.type === "ObjectExpression"
    );
    if (elements.length === 0) return script;
    const durations = elements.map(
      (element) => objectExpressionToRecord(element, arrLoc.parsed.scope).duration
    );
    const matchIdx = findObjectArrayKeyframeIndex(durations, percentage);
    if (matchIdx === null) return script;
    const remaining = elements.filter((_, i) => i !== matchIdx);
    if (remaining.length < 2) {
      const sole = remaining[0];
      const record = sole ? objectExpressionToRecord(sole, arrLoc.parsed.scope) : {};
      collapseKeyframesToFlat(arrLoc.target.call.varsArg, record);
    } else {
      const realIdx = arrVal.elements.indexOf(elements[matchIdx]);
      arrVal.elements.splice(realIdx, 1);
    }
    return recast.print(arrLoc.parsed.ast).code;
  }
  const ctx = locateKeyframeCtx(script, animationId, percentage);
  if (!ctx) return script;
  const { loc, kfNode } = ctx;
  const match = findKeyframePropByPct(kfNode, percentage);
  if (!match) return script;
  const removeIdx = match.idx;
  kfNode.properties.splice(removeIdx, 1);
  const remainingKfs = filterPercentageProps(kfNode);
  if (remainingKfs.length < 2) {
    const record = remainingKfs.length === 1 ? objectExpressionToRecord(remainingKfs[0].value, loc.parsed.scope) : {};
    collapseKeyframesToFlat(loc.target.call.varsArg, record);
  }
  return recast.print(loc.parsed.ast).code;
}
function moveKeyframeInScript(script, animationId, fromPercentage, toPercentage) {
  const loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  const kfNode = findKeyframesObjectNode(loc.target.call.varsArg) ?? convertArrayKeyframesToObjectNode(loc.target.call.varsArg, loc.parsed.scope);
  if (!kfNode) return script;
  const match = findKeyframePropByPct(kfNode, fromPercentage);
  if (!match) return script;
  if (Math.abs(fromPercentage - toPercentage) < MOVE_NOOP_EPSILON_PCT) return script;
  const dest = findKeyframePropByPct(kfNode, toPercentage);
  if (dest && dest.prop !== match.prop) return script;
  const movedValue = match.prop.value;
  const entries = [];
  for (const prop of filterPercentageProps(kfNode)) {
    if (prop === match.prop) continue;
    const pct = percentageFromKey(propKeyName(prop) ?? "");
    if (Number.isNaN(pct)) continue;
    entries.push({ pct, value: prop.value });
  }
  entries.push({ pct: toPercentage, value: movedValue });
  entries.sort((a, b) => a.pct - b.pct);
  const pctProps = new Set(filterPercentageProps(kfNode));
  const kept = (kfNode.properties ?? []).filter((p) => !pctProps.has(p));
  kfNode.properties = [
    ...entries.map((e) => {
      const p = parseExpr(`{ ${JSON.stringify(plainPercentKey(e.pct))}: {} }`).properties[0];
      p.value = e.value;
      return p;
    }),
    ...kept
  ];
  return recast.print(loc.parsed.ast).code;
}
function resizeKeyframedTweenInScript(script, animationId, newPosition, newDuration, pctRemap) {
  const loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  const kfNode = findKeyframesObjectNode(loc.target.call.varsArg) ?? convertArrayKeyframesToObjectNode(loc.target.call.varsArg, loc.parsed.scope);
  if (!kfNode) return script;
  const seen = /* @__PURE__ */ new Set();
  for (const { from, to } of pctRemap) {
    const match = findKeyframePropByPct(kfNode, from);
    if (!match || seen.has(match.prop)) continue;
    seen.add(match.prop);
    match.prop.key = parseExpr(`{ ${JSON.stringify(plainPercentKey(to))}: 0 }`).properties[0].key;
  }
  applyUpdatesToCall(loc.target.call, {
    position: newPosition,
    // Resizing is an explicit duration-authoring gesture. Promote GSAP's
    // implicit default so the dragged window is the window that plays.
    duration: newDuration
  });
  return recast.print(loc.parsed.ast).code;
}
function updateKeyframeInScript(script, animationId, percentage, properties, ease) {
  const arrLoc = locateAnimationWithFallback(script, animationId);
  const arrVal = arrLoc && findPropertyNode(arrLoc.target.call.varsArg, "keyframes");
  if (arrLoc && arrVal?.type === "ArrayExpression") {
    const elements = (arrVal.elements ?? []).filter(
      (e) => !!e && e.type === "ObjectExpression"
    );
    if (elements.length === 0) return script;
    const records = elements.map(
      (element) => objectExpressionToRecord(element, arrLoc.parsed.scope)
    );
    const matchIdx = findObjectArrayKeyframeIndex(
      records.map((record) => record.duration),
      percentage,
      { fallbackToNearest: true }
    );
    if (matchIdx === null) return script;
    const matchEl = elements[matchIdx];
    if (!matchEl) return script;
    const realIdx = arrVal.elements.indexOf(matchEl);
    if (Object.keys(properties).length === 0 && ease && setObjectExpressionEase(matchEl, ease)) {
      return recast.print(arrLoc.parsed.ast).code;
    }
    const merged = {};
    for (const [key, value] of Object.entries(records[matchIdx] ?? {})) {
      if (typeof value === "number" || typeof value === "string") merged[key] = value;
    }
    Object.assign(merged, properties);
    arrVal.elements[realIdx] = buildKeyframeValueNode(merged, ease);
    return recast.print(arrLoc.parsed.ast).code;
  }
  if (arrLoc && !arrVal && arrLoc.target.animation.arcPath?.enabled) {
    const propertyKeys = Object.keys(properties);
    if (propertyKeys.some((key) => key !== "x" && key !== "y")) return script;
    let next = script;
    if (propertyKeys.length > 0) {
      const waypoints = extractArcWaypoints(arrLoc.target.animation);
      if (waypoints.length < 2) return script;
      const pointIndex = Math.max(
        0,
        Math.min(waypoints.length - 1, Math.round(percentage / 100 * (waypoints.length - 1)))
      );
      const current = waypoints[pointIndex];
      if (!current) return script;
      const x = properties.x ?? current.x;
      const y = properties.y ?? current.y;
      if (typeof x !== "number" || typeof y !== "number") return script;
      next = updateMotionPathPointInScript(next, animationId, pointIndex, { x, y });
    }
    if (ease !== void 0) {
      const updated = locateAnimationWithFallback(next, animationId);
      if (!updated) return script;
      applyUpdatesToCall(updated.target.call, { ease });
      next = recast.print(updated.parsed.ast).code;
    }
    return next;
  }
  const ctx = locateKeyframeCtx(script, animationId, percentage);
  if (!ctx) return script;
  const { loc, kfNode } = ctx;
  const match = findKeyframePropByPct(kfNode, percentage);
  if (!match) return script;
  if (Object.keys(properties).length === 0 && ease) {
    if (setObjectExpressionEase(match.prop.value, ease)) {
      return recast.print(loc.parsed.ast).code;
    }
    return script;
  }
  const existing = match.prop.value;
  if (existing?.type === "ObjectExpression") {
    const props = existing.properties ?? [];
    const upsert = (key, valueCode) => {
      const idx = props.findIndex((p) => isObjectProperty(p) && propKeyName(p) === key);
      const node = parseExpr(`({ ${safeJsKey(key)}: ${valueCode} })`).properties[0];
      if (idx >= 0) props[idx] = node;
      else props.push(node);
    };
    for (const [k, v] of Object.entries(properties)) upsert(k, serializeValue(v));
    if (ease !== void 0) upsert("ease", JSON.stringify(ease));
    return recast.print(loc.parsed.ast).code;
  }
  match.prop.value = buildKeyframeValueNode(properties, ease);
  return recast.print(loc.parsed.ast).code;
}
function stripEditableAndEase(varsArg) {
  if (varsArg?.type !== "ObjectExpression") return;
  varsArg.properties = varsArg.properties.filter((p) => {
    if (!isObjectProperty(p)) return true;
    const key = propKeyName(p);
    return key !== "ease" && key !== "keyframes";
  });
  filterEditableKeys(varsArg, () => false);
}
function insertKeyframesProp(varsArg, fromProps, toProps, easeEach) {
  const fromEntries = Object.entries(fromProps).map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
  const toEntries = Object.entries(toProps).map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
  const easeEntry = easeEach ? `, easeEach: ${JSON.stringify(easeEach)}` : "";
  const kfCode = `{ "0%": { ${fromEntries.join(", ")} }, "100%": { ${toEntries.join(", ")} }${easeEntry} }`;
  const kfProp = parseExpr(`{ keyframes: {} }`).properties[0];
  kfProp.value = parseExpr(kfCode);
  if (varsArg?.type === "ObjectExpression") varsArg.properties.unshift(kfProp);
}
function convertToKeyframesInScript(script, animationId, resolvedFromValues, setDuration = 1) {
  let loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  const anim = loc.target.animation;
  if (authorsKeyframes(anim)) return script;
  const { fromProps, toProps } = resolveConversionProps(anim, resolvedFromValues);
  const varsArg = loc.target.call.varsArg;
  const originalEase = anim.ease;
  stripEditableAndEase(varsArg);
  insertKeyframesProp(varsArg, fromProps, toProps, originalEase || void 0);
  if (originalEase) {
    setVarsKey(varsArg, "ease", "none");
  }
  if (anim.method === "from" || anim.method === "fromTo") {
    loc.target.call.node.callee.property.name = "to";
    if (anim.method === "fromTo") loc.target.call.node.arguments.splice(1, 1);
  }
  if (anim.method === "set") {
    const calleeObj = loc.target.call.node.callee.object;
    if (anim.global && calleeObj?.type === "Identifier") {
      calleeObj.name = loc.parsed.timelineVar;
      if (loc.target.call.node.arguments.length < 3) {
        loc.target.call.node.arguments.push(parseExpr("0"));
      }
    }
    loc.target.call.node.callee.property.name = "to";
    removeVarsKey(varsArg, "immediateRender");
    setVarsKey(varsArg, "duration", Math.max(1e-3, setDuration));
  }
  return recast.print(loc.parsed.ast).code;
}
function removeAllKeyframesFromScript(script, animationId) {
  let loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  const kfNode = findKeyframesObjectNode(loc.target.call.varsArg) ?? convertArrayKeyframesToObjectNode(loc.target.call.varsArg, loc.parsed.scope);
  const method = loc.target.call.method;
  let record;
  if (kfNode) {
    const kfEntries = filterPercentageProps(kfNode).map((p) => ({ pct: percentageFromKey(propKeyName(p)), prop: p })).filter((e) => !Number.isNaN(e.pct)).sort((a, b) => a.pct - b.pct);
    if (kfEntries.length === 0) return script;
    const collapseEntry = method === "from" ? kfEntries[0] : kfEntries[kfEntries.length - 1];
    record = objectExpressionToRecord(collapseEntry.prop.value, loc.parsed.scope);
  } else {
    const synthetic = loc.target.animation.arcPath?.enabled ? loc.target.animation.keyframes?.keyframes : void 0;
    if (!synthetic?.length) return script;
    const sorted = [...synthetic].sort((a, b) => a.percentage - b.percentage);
    record = (method === "from" ? sorted[0] : sorted[sorted.length - 1]).properties;
    removeVarsKey(loc.target.call.varsArg, "motionPath");
  }
  collapseKeyframesToFlat(loc.target.call.varsArg, record);
  removeVarsKey(loc.target.call.varsArg, "ease");
  setVarsKey(loc.target.call.varsArg, "duration", 0);
  setVarsKey(loc.target.call.varsArg, "immediateRender", true);
  if (loc.target.animation.propertyGroup === "position") {
    for (const l of loc.parsed.located) {
      if (l === loc.target) continue;
      if (l.animation.targetSelector === loc.target.animation.targetSelector && l.animation.propertyGroup === "position") {
        removeCallFromAst(l.call);
      }
    }
  }
  return recast.print(loc.parsed.ast).code;
}
function materializeKeyframesInScript(script, animationId, keyframes, easeEach, resolvedSelector) {
  let loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return script;
  const varsArg = loc.target.call.varsArg;
  if (resolvedSelector && loc.target.call.node.arguments[0]) {
    loc.target.call.node.arguments[0] = parseExpr(JSON.stringify(resolvedSelector));
  }
  const kfObjCode = buildKeyframeObjectCode(sortedKeyframes(keyframes), { easeEach });
  const kfParent = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "keyframes"
  );
  if (kfParent) {
    kfParent.value = parseExpr(kfObjCode);
  } else {
    const kfProp = parseExpr(`{ keyframes: ${kfObjCode} }`).properties[0];
    varsArg.properties.unshift(kfProp);
  }
  removeVarsKey(varsArg, "easeEach");
  return recast.print(loc.parsed.ast).code;
}
function numericXY(props) {
  const x = props.x;
  const y = props.y;
  return typeof x === "number" && typeof y === "number" ? { x, y } : null;
}
function extractArcWaypoints(anim) {
  const kfs = anim.keyframes?.keyframes ?? [];
  const waypoints = kfs.map((kf) => numericXY(kf.properties)).filter((p) => p !== null);
  if (waypoints.length >= 2) return waypoints;
  const px = anim.properties.x;
  const py = anim.properties.y;
  if (typeof px !== "number" && typeof py !== "number") return waypoints;
  return [
    { x: 0, y: 0 },
    { x: typeof px === "number" ? px : 0, y: typeof py === "number" ? py : 0 }
  ];
}
function buildMotionPathObjectCode(config) {
  const { waypoints, segments, autoRotate } = config;
  const hasExplicitControlPoints = segments.some((s) => s.cp1 && s.cp2);
  const curvinessVaries = segments.some(
    (s) => (s.curviness ?? 1) !== (segments[0]?.curviness ?? 1)
  );
  let pathEntries;
  if ((hasExplicitControlPoints || curvinessVaries) && waypoints.length >= 2) {
    pathEntries = [`{x: ${waypoints[0].x}, y: ${waypoints[0].y}}`];
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const nextWp = waypoints[i + 1];
      if (seg.cp1 && seg.cp2) {
        pathEntries.push(`{x: ${seg.cp1.x}, y: ${seg.cp1.y}}`);
        pathEntries.push(`{x: ${seg.cp2.x}, y: ${seg.cp2.y}}`);
      } else {
        const wp = waypoints[i];
        const dx = nextWp.x - wp.x;
        const dy = nextWp.y - wp.y;
        const c = seg.curviness ?? 1;
        pathEntries.push(
          `{x: ${wp.x + dx * 0.33}, y: ${wp.y + dy * 0.33 - c * Math.abs(dx) * 0.25}}`
        );
        pathEntries.push(
          `{x: ${wp.x + dx * 0.66}, y: ${wp.y + dy * 0.66 - c * Math.abs(dx) * 0.25}}`
        );
      }
      pathEntries.push(`{x: ${nextWp.x}, y: ${nextWp.y}}`);
    }
    const pathStr = pathEntries.join(", ");
    const parts2 = [`path: [${pathStr}]`, `type: "cubic"`];
    if (autoRotate === true) parts2.push("autoRotate: true");
    else if (typeof autoRotate === "number") parts2.push(`autoRotate: ${autoRotate}`);
    return `{ ${parts2.join(", ")} }`;
  }
  pathEntries = waypoints.map((wp) => `{x: ${wp.x}, y: ${wp.y}}`);
  const curviness = segments[0]?.curviness ?? 1;
  const parts = [`path: [${pathEntries.join(", ")}]`];
  if (curviness !== 1) parts.push(`curviness: ${curviness}`);
  if (autoRotate === true) parts.push("autoRotate: true");
  else if (typeof autoRotate === "number") parts.push(`autoRotate: ${autoRotate}`);
  return `{ ${parts.join(", ")} }`;
}
function setArcPathInScript(script, animationId, config) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const varsArg = loc.target.call.varsArg;
  const anim = loc.target.animation;
  if (!config.enabled) {
    const motionPathProp = varsArg.properties.find(
      (p) => isObjectProperty(p) && propKeyName(p) === "motionPath"
    );
    if (motionPathProp) {
      const mpVal = motionPathProp.value;
      let pathArr;
      if (mpVal?.type === "ObjectExpression") {
        const pathProp = mpVal.properties.find(
          (p) => isObjectProperty(p) && propKeyName(p) === "path"
        );
        if (pathProp?.value?.type === "ArrayExpression") pathArr = pathProp.value.elements;
      }
      if (pathArr && pathArr.length > 0) {
        const last = pathArr[pathArr.length - 1];
        if (last?.type === "ObjectExpression") {
          for (const p of last.properties) {
            const k = propKeyName(p);
            if (k === "x" || k === "y") {
              const v = p.value?.value;
              if (typeof v === "number") setVarsKey(varsArg, k, v);
            }
          }
        }
      }
    }
    removeVarsKey(varsArg, "motionPath");
    return recast.print(loc.parsed.ast).code;
  }
  const waypoints = extractArcWaypoints(anim);
  if (waypoints.length < 2) return script;
  const segments = config.segments.length === waypoints.length - 1 ? config.segments : Array.from({ length: waypoints.length - 1 }, () => ({ curviness: 1 }));
  const motionPathCode = buildMotionPathObjectCode({
    waypoints,
    segments,
    autoRotate: config.autoRotate
  });
  const motionPathNode = parseExpr(motionPathCode);
  const existingProp = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "motionPath"
  );
  if (existingProp) {
    existingProp.value = motionPathNode;
  } else {
    const prop = parseExpr(`{ motionPath: ${motionPathCode} }`).properties[0];
    varsArg.properties.push(prop);
  }
  const kfNode = findKeyframesObjectNode(varsArg);
  if (kfNode) {
    for (const pctProp of filterPercentageProps(kfNode)) {
      if (pctProp.value?.type === "ObjectExpression") {
        pctProp.value.properties = pctProp.value.properties.filter((p) => {
          const k = propKeyName(p);
          return k !== "x" && k !== "y";
        });
      }
    }
  }
  removeVarsKey(varsArg, "x");
  removeVarsKey(varsArg, "y");
  return recast.print(loc.parsed.ast).code;
}
function updateArcSegmentInScript(script, animationId, segmentIndex, update) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const anim = loc.target.animation;
  if (!anim.arcPath?.enabled) return script;
  const segments = [...anim.arcPath.segments];
  if (segmentIndex < 0 || segmentIndex >= segments.length) return script;
  segments[segmentIndex] = { ...segments[segmentIndex], ...update };
  const waypoints = extractArcWaypoints(anim);
  if (waypoints.length < 2) return script;
  const motionPathCode = buildMotionPathObjectCode({
    waypoints,
    segments,
    autoRotate: anim.arcPath.autoRotate
  });
  const varsArg = loc.target.call.varsArg;
  const existingProp = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "motionPath"
  );
  if (existingProp) {
    existingProp.value = parseExpr(motionPathCode);
  }
  return recast.print(loc.parsed.ast).code;
}
function updateMotionPathPointInScript(script, animationId, pointIndex, point) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const anim = loc.target.animation;
  if (!anim.arcPath?.enabled) return script;
  const waypoints = extractArcWaypoints(anim);
  if (pointIndex < 0 || pointIndex >= waypoints.length || waypoints.length < 2) return script;
  const nextWaypoints = waypoints.map(
    (wp, i) => i === pointIndex ? { x: point.x, y: point.y } : wp
  );
  const motionPathCode = buildMotionPathObjectCode({
    waypoints: nextWaypoints,
    segments: anim.arcPath.segments,
    autoRotate: anim.arcPath.autoRotate
  });
  const varsArg = loc.target.call.varsArg;
  const existingProp = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "motionPath"
  );
  if (existingProp) {
    existingProp.value = parseExpr(motionPathCode);
  }
  return recast.print(loc.parsed.ast).code;
}
function hasCubicSegments(segments) {
  return segments.some((s) => s.cp1 != null || s.cp2 != null);
}
function writeMotionPathValue(loc, waypoints, segments, autoRotate) {
  const motionPathCode = buildMotionPathObjectCode({ waypoints, segments, autoRotate });
  const varsArg = loc.target.call.varsArg;
  const existingProp = varsArg.properties.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "motionPath"
  );
  if (existingProp) existingProp.value = parseExpr(motionPathCode);
  return recast.print(loc.parsed.ast).code;
}
function addMotionPathPointInScript(script, animationId, index, point) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const anim = loc.target.animation;
  if (!anim.arcPath?.enabled || hasCubicSegments(anim.arcPath.segments)) return script;
  const waypoints = extractArcWaypoints(anim);
  if (index < 1 || index > waypoints.length - 1) return script;
  const segments = [...anim.arcPath.segments];
  waypoints.splice(index, 0, { x: point.x, y: point.y });
  const splitCurviness = segments[index - 1]?.curviness ?? 1;
  segments.splice(index - 1, 0, { curviness: splitCurviness });
  return writeMotionPathValue(loc, waypoints, segments, anim.arcPath.autoRotate);
}
function removeMotionPathPointInScript(script, animationId, index) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const anim = loc.target.animation;
  if (!anim.arcPath?.enabled || hasCubicSegments(anim.arcPath.segments)) return script;
  const waypoints = extractArcWaypoints(anim);
  if (waypoints.length <= 2 || index < 0 || index >= waypoints.length) return script;
  const segments = [...anim.arcPath.segments];
  waypoints.splice(index, 1);
  segments.splice(Math.min(index, segments.length - 1), 1);
  return writeMotionPathValue(loc, waypoints, segments, anim.arcPath.autoRotate);
}
function addMotionPathToScript(script, targetSelector, position, duration, point, ease = "power1.inOut") {
  let parsed;
  try {
    parsed = parseGsapAst(script);
  } catch (e) {
    console.warn("[gsap-parser] addMotionPathToScript parse failed:", e);
    return { script, id: null };
  }
  if (parsed.located.length === 0 && parsed.detection.ref === null) {
    return { script, id: null };
  }
  const motionPathCode = buildMotionPathObjectCode({
    waypoints: [
      { x: 0, y: 0 },
      { x: point.x, y: point.y }
    ],
    segments: [{ curviness: 1 }],
    autoRotate: false
  });
  const selector = JSON.stringify(targetSelector);
  const varEntries = [
    `motionPath: ${motionPathCode}`,
    `duration: ${serializeValue(duration)}`,
    `ease: ${JSON.stringify(ease)}`
  ];
  const stmtCode = `${parsed.timelineVar}.to(${selector}, { ${varEntries.join(", ")} }, ${serializeValue(position)});`;
  const newStatement = parseScript(stmtCode).program.body[0];
  insertAfterAnchor(parsed, newStatement);
  const result = recast.print(parsed.ast).code;
  const reParsed = parseGsapAst(result);
  const newId = reParsed.located[reParsed.located.length - 1]?.id ?? null;
  return { script: result, id: newId };
}
function removeArcPathFromScript(script, animationId) {
  return setArcPathInScript(script, animationId, {
    enabled: false,
    autoRotate: false,
    segments: []
  });
}
function splitIntoPropertyGroups(script, animationId) {
  let loc = locateAnimationWithFallback(script, animationId);
  if (!loc) return { script, ids: [animationId] };
  const anim = loc.target.animation;
  if (anim.hasUnresolvedKeyframes) return { script, ids: [animationId] };
  const allPropKeys = /* @__PURE__ */ new Set();
  if (anim.keyframes) {
    for (const kf of anim.keyframes.keyframes) {
      for (const k of Object.keys(kf.properties)) allPropKeys.add(k);
    }
  } else {
    for (const k of Object.keys(anim.properties)) allPropKeys.add(k);
  }
  const groupProps = /* @__PURE__ */ new Map();
  for (const key of allPropKeys) {
    if (key === "transformOrigin") continue;
    const group = classifyPropertyGroup(key);
    let arr = groupProps.get(group);
    if (!arr) {
      arr = [];
      groupProps.set(group, arr);
    }
    arr.push(key);
  }
  if (groupProps.size <= 1) return { script, ids: [anim.id] };
  if (allPropKeys.has("transformOrigin")) {
    let largestGroup;
    let largestCount = 0;
    for (const [group, props] of groupProps) {
      if (props.length > largestCount) {
        largestCount = props.length;
        largestGroup = group;
      }
    }
    if (largestGroup) {
      groupProps.get(largestGroup).push("transformOrigin");
    }
  }
  let result = script;
  result = removeAnimationFromScript(result, anim.id);
  for (const [, props] of groupProps) {
    const propSet = new Set(props);
    if (anim.keyframes) {
      const groupKeyframes = [];
      for (const kf of anim.keyframes.keyframes) {
        const filtered = {};
        for (const [k, v] of Object.entries(kf.properties)) {
          if (propSet.has(k)) filtered[k] = v;
        }
        if (Object.keys(filtered).length === 0) continue;
        groupKeyframes.push({
          percentage: kf.percentage,
          properties: filtered,
          ...kf.ease ? { ease: kf.ease } : {}
        });
      }
      if (groupKeyframes.length === 0) continue;
      const addResult = addAnimationWithKeyframesToScript(
        result,
        anim.targetSelector,
        typeof anim.position === "number" ? anim.position : 0,
        anim.duration ?? 0.5,
        groupKeyframes,
        anim.keyframes.ease ?? anim.ease,
        anim.keyframes.easeEach
      );
      result = addResult.script;
    } else {
      const groupProperties = {};
      for (const [k, v] of Object.entries(anim.properties)) {
        if (propSet.has(k)) groupProperties[k] = v;
      }
      if (Object.keys(groupProperties).length === 0) continue;
      let fromProperties;
      if (anim.method === "fromTo" && anim.fromProperties) {
        fromProperties = {};
        for (const [k, v] of Object.entries(anim.fromProperties)) {
          if (propSet.has(k)) fromProperties[k] = v;
        }
      }
      const addResult = addAnimationToScript(result, {
        targetSelector: anim.targetSelector,
        method: anim.method,
        position: anim.position,
        duration: anim.duration,
        ease: anim.ease,
        properties: groupProperties,
        fromProperties,
        extras: anim.extras
      });
      result = addResult.script;
    }
  }
  const reParsed = parseGsapAst(result);
  const newIds = reParsed.located.filter((l) => l.animation.targetSelector === anim.targetSelector).map((l) => l.id);
  return { script: result, ids: newIds };
}
function unrollDynamicAnimations(script, animationId, elements) {
  const loc = locateAnimation(script, animationId);
  if (!loc) return script;
  const varsArg = loc.target.call.varsArg;
  const durationVal = extractLiteralValue(findPropertyNode(varsArg, "duration"), loc.parsed.scope);
  const easeVal = extractLiteralValue(findPropertyNode(varsArg, "ease"), loc.parsed.scope);
  const duration = typeof durationVal === "number" ? durationVal : 8;
  const ease = typeof easeVal === "string" ? easeVal : "none";
  const posArg = loc.target.call.positionArg;
  const position = posArg ? extractLiteralValue(posArg, loc.parsed.scope) : 0;
  const posCode = typeof position === "number" ? String(position) : typeof position === "string" ? JSON.stringify(position) : "0";
  let loopNode = null;
  let current = loc.target.call.path;
  while (current) {
    const node = current.node ?? current.value;
    if (node?.type === "ForStatement" || node?.type === "ForInStatement" || node?.type === "ForOfStatement" || node?.type === "WhileStatement") {
      loopNode = node;
      break;
    }
    if (node?.type === "ExpressionStatement" && node.expression?.type === "CallExpression" && node.expression.callee?.property?.name === "forEach") {
      loopNode = node;
      break;
    }
    current = current.parent ?? current.parentPath;
  }
  const calls = [];
  for (const el of elements) {
    const kfCode = buildKeyframeObjectCode(sortedKeyframes(el.keyframes), {
      easeEach: el.easeEach
    });
    calls.push(
      `${loc.parsed.timelineVar}.to(${JSON.stringify(el.selector)}, { keyframes: ${kfCode}, duration: ${duration}, ease: ${JSON.stringify(ease)} }, ${posCode});`
    );
  }
  const replacement = calls.join("\n  ");
  if (loopNode) {
    const start = loopNode.start ?? loopNode.range?.[0];
    const end = loopNode.end ?? loopNode.range?.[1];
    if (typeof start === "number" && typeof end === "number") {
      return script.slice(0, start) + replacement + script.slice(end);
    }
  }
  const stmtNode = loc.target.call.path?.parent?.node ?? loc.target.call.path?.parentPath?.node;
  if (stmtNode?.type === "ExpressionStatement") {
    const start = stmtNode.start ?? stmtNode.range?.[0];
    const end = stmtNode.end ?? stmtNode.range?.[1];
    if (typeof start === "number" && typeof end === "number") {
      return script.slice(0, start) + replacement + script.slice(end);
    }
  }
  return script;
}
export {
  PROPERTY_GROUPS,
  SPRING_PRESETS,
  SUPPORTED_EASES,
  SUPPORTED_PROPS,
  addAnimationToScript,
  addAnimationWithKeyframesToScript,
  addKeyframeToScript,
  addMotionPathPointInScript,
  addMotionPathToScript,
  classifyPropertyGroup,
  classifyTweenPropertyGroup,
  convertToKeyframesInScript,
  dedupePositionWritesInScript,
  generateSpringEaseData,
  getAnimationsForElementId,
  gsapAnimationsToKeyframes,
  isStudioHoldSet,
  keyframesToGsapAnimations,
  materializeKeyframesInScript,
  moveKeyframeInScript,
  offsetPositionPathsInScript,
  parseGsapScript,
  removeAllKeyframesFromScript,
  removeAnimationFromScript,
  removeArcPathFromScript,
  removeKeyframeFromScript,
  removeMotionPathPointInScript,
  resizeKeyframedTweenInScript,
  scalePositionsInScript,
  serializeGsapAnimations,
  setArcPathInScript,
  shiftPositionsInScript,
  splitAnimationsInScript,
  splitIntoPropertyGroups,
  syncPositionHoldsBeforeKeyframes,
  unrollDynamicAnimations,
  updateAnimationInScript,
  updateArcSegmentInScript,
  updateKeyframeInScript,
  updateMotionPathPointInScript,
  validateCompositionGsap
};
