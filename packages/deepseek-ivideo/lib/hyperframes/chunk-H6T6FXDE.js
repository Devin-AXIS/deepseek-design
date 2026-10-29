import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../studio-server/src/helpers/manualEditsRenderScript.ts
var STUDIO_MANUAL_EDITS_PATH = ".hyperframes/studio-manual-edits.json";
function createStudioManualEditsRenderBodyScript(manifestContent, options = {}) {
  if (!manifestContent.trim()) return null;
  return `(${studioManualEditsRenderRuntime.toString()})(${JSON.stringify(manifestContent)}, ${JSON.stringify(options.activeCompositionPath ?? null)});`;
}
function createStudioPositionSeekReapplyScript() {
  return `(${studioPositionSeekReapplyRuntime.toString()})();`;
}
function studioPositionSeekReapplyRuntime() {
  const OFFSET_X_PROP = "--hf-studio-offset-x";
  const OFFSET_Y_PROP = "--hf-studio-offset-y";
  const WIDTH_PROP = "--hf-studio-width";
  const HEIGHT_PROP = "--hf-studio-height";
  const ROTATION_PROP = "--hf-studio-rotation";
  const PATH_OFFSET_ATTR = "data-hf-studio-path-offset";
  const BOX_SIZE_ATTR = "data-hf-studio-box-size";
  const ROTATION_ATTR = "data-hf-studio-rotation";
  const ORIGINAL_TRANSLATE_ATTR = "data-hf-studio-original-translate";
  const ORIGINAL_ROTATE_ATTR = "data-hf-studio-original-rotate";
  const MOTION_ATTR = "data-hf-studio-motion";
  const MOTION_TL_KEY = "studio-motion";
  const WRAPPED_PROP = "__hfStudioPositionSeekReapplyWrapped";
  if (!document.querySelector("[" + PATH_OFFSET_ATTR + '="true"]') && !document.querySelector("[" + BOX_SIZE_ATTR + '="true"]') && !document.querySelector("[" + ROTATION_ATTR + '="true"]') && !document.querySelector("[" + MOTION_ATTR + "]"))
    return;
  const splitTopLevelWhitespace = (value) => {
    const parts = [];
    let depth = 0;
    let current = "";
    for (const char of value.trim()) {
      if (char === "(") depth += 1;
      if (char === ")") depth = Math.max(0, depth - 1);
      if (/\s/.test(char) && depth === 0) {
        if (current) parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) parts.push(current);
    return parts;
  };
  const composeTranslate = (element, x, y) => {
    const original = element.getAttribute(ORIGINAL_TRANSLATE_ATTR)?.trim();
    if (!original || original === "none") return x + " " + y;
    const parts = splitTopLevelWhitespace(original);
    if (parts.length === 1) return "calc(" + parts[0] + " + " + x + ") " + y;
    if (parts.length >= 2) {
      const z = parts.length >= 3 ? " " + parts[2] : "";
      return "calc(" + parts[0] + " + " + x + ") calc(" + parts[1] + " + " + y + ")" + z;
    }
    return x + " " + y;
  };
  const isSimpleRotateAngle = (value) => /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|rad|turn|grad)$/.test(value.trim());
  const composeRotation = (element, rotationValue) => {
    const original = element.getAttribute(ORIGINAL_ROTATE_ATTR)?.trim();
    if (!original || original === "none" || !isSimpleRotateAngle(original)) return rotationValue;
    return "calc(" + original + " + " + rotationValue + ")";
  };
  let lastSeekTime = 0;
  let cachedMotionKey = "";
  const finiteNum = (v) => typeof v === "number" && Number.isFinite(v) ? v : null;
  const computeMotionKey = (motionEls) => {
    let key = "";
    for (let i = 0; i < motionEls.length; i++) {
      const json = motionEls[i].getAttribute?.(MOTION_ATTR);
      if (json) key += (key ? "\n" : "") + json;
    }
    return key;
  };
  const reapplyMotionTimeline = () => {
    const motionEls = document.querySelectorAll("[" + MOTION_ATTR + "]");
    if (motionEls.length === 0) {
      cachedMotionKey = "";
      return;
    }
    const win = window;
    const gsap = win.gsap;
    if (!gsap || typeof gsap.timeline !== "function") return;
    win.__timelines = win.__timelines || {};
    const motionKey = computeMotionKey(motionEls);
    const existing = win.__timelines[MOTION_TL_KEY];
    if (motionKey && motionKey === cachedMotionKey && existing && typeof existing.totalTime === "function") {
      existing.totalTime(lastSeekTime, false);
      return;
    }
    if (existing && typeof existing.kill === "function") existing.kill();
    const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
    const fromTo = tl.fromTo;
    if (typeof fromTo !== "function") return;
    let applied = 0;
    for (let i = 0; i < motionEls.length; i++) {
      const el = motionEls[i];
      if (!(el instanceof HTMLElement)) continue;
      const json = el.getAttribute(MOTION_ATTR);
      if (!json) continue;
      try {
        const m = JSON.parse(json);
        const start = finiteNum(m.start);
        const duration = finiteNum(m.duration);
        if (start == null || duration == null || duration <= 0) continue;
        const ease = typeof m.ease === "string" ? m.ease : "none";
        const from = m.from && typeof m.from === "object" ? m.from : {};
        const to = m.to && typeof m.to === "object" ? m.to : {};
        const customEase = m.customEase;
        let resolvedEase = ease;
        if (customEase?.id && customEase?.data && win.CustomEase?.create) {
          try {
            gsap.registerPlugin?.(win.CustomEase);
            win.CustomEase.create(customEase.id, customEase.data);
            resolvedEase = customEase.id;
          } catch {
          }
        }
        fromTo.call(
          tl,
          el,
          { ...from },
          { ...to, duration, ease: resolvedEase, overwrite: "auto", immediateRender: false },
          start
        );
        applied += 1;
      } catch {
      }
    }
    if (applied === 0) {
      cachedMotionKey = "";
      if (typeof tl.kill === "function")
        tl.kill();
      return;
    }
    cachedMotionKey = motionKey;
    win.__timelines[MOTION_TL_KEY] = tl;
    if (typeof tl.pause === "function") tl.pause();
    if (typeof tl.totalTime === "function")
      tl.totalTime(lastSeekTime, false);
  };
  const stripGsapTranslateFromTransform = (el) => {
    const transform = el.style.getPropertyValue("transform");
    if (!transform || transform === "none") return;
    const win = el.ownerDocument.defaultView;
    const MatrixCtor = win?.DOMMatrix;
    if (!MatrixCtor) return;
    try {
      const m = new MatrixCtor(transform);
      if (m.m41 === 0 && m.m42 === 0) return;
      m.m41 = 0;
      m.m42 = 0;
      if (m.is2D && m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1) {
        el.style.removeProperty("transform");
      } else {
        el.style.setProperty("transform", m.toString());
      }
    } catch {
    }
  };
  const reapplyAll = () => {
    const offsetEls = document.querySelectorAll("[" + PATH_OFFSET_ATTR + '="true"]');
    for (let i = 0; i < offsetEls.length; i++) {
      const el = offsetEls[i];
      if (!(el instanceof HTMLElement)) continue;
      const x = el.style.getPropertyValue(OFFSET_X_PROP);
      const y = el.style.getPropertyValue(OFFSET_Y_PROP);
      if (x || y) {
        el.style.setProperty(
          "translate",
          composeTranslate(
            el,
            "var(" + OFFSET_X_PROP + ", 0px)",
            "var(" + OFFSET_Y_PROP + ", 0px)"
          )
        );
        stripGsapTranslateFromTransform(el);
      }
    }
    const boxSizeEls = document.querySelectorAll("[" + BOX_SIZE_ATTR + '="true"]');
    for (let i = 0; i < boxSizeEls.length; i++) {
      const el = boxSizeEls[i];
      if (!(el instanceof HTMLElement)) continue;
      const w = el.style.getPropertyValue(WIDTH_PROP);
      const h = el.style.getPropertyValue(HEIGHT_PROP);
      if (w) el.style.setProperty("width", w);
      if (h) el.style.setProperty("height", h);
    }
    const rotEls = document.querySelectorAll("[" + ROTATION_ATTR + '="true"]');
    for (let i = 0; i < rotEls.length; i++) {
      const el = rotEls[i];
      if (!(el instanceof HTMLElement)) continue;
      const rot = el.style.getPropertyValue(ROTATION_PROP);
      if (rot) {
        el.style.setProperty("rotate", composeRotation(el, "var(" + ROTATION_PROP + ", 0deg)"));
        stripGsapTranslateFromTransform(el);
      }
    }
    reapplyMotionTimeline();
  };
  const runtimeWindow = window;
  const isWrapped = (fn) => Boolean(fn[WRAPPED_PROP]);
  const markWrapped = (fn) => {
    try {
      Object.defineProperty(fn, WRAPPED_PROP, {
        configurable: false,
        enumerable: false,
        value: true
      });
    } catch {
      try {
        fn[WRAPPED_PROP] = true;
      } catch {
      }
    }
  };
  const wrapFn = (get, set) => {
    const fn = get();
    if (typeof fn !== "function") return false;
    const seek = fn;
    if (isWrapped(seek)) {
      reapplyAll();
      return true;
    }
    const wrapped = function(time) {
      lastSeekTime = typeof time === "number" && Number.isFinite(time) ? Math.max(0, time) : 0;
      const result = seek.call(this, time);
      reapplyAll();
      return result;
    };
    markWrapped(wrapped);
    set(wrapped);
    reapplyAll();
    return true;
  };
  const wrapSeekFunctions = () => {
    const a = wrapFn(
      () => runtimeWindow.__hf?.["seek"],
      (fn) => {
        if (runtimeWindow.__hf) runtimeWindow.__hf["seek"] = fn;
      }
    );
    const b = wrapFn(
      () => runtimeWindow.__player?.["renderSeek"],
      (fn) => {
        if (runtimeWindow.__player) runtimeWindow.__player["renderSeek"] = fn;
      }
    );
    return a || b;
  };
  const installSeekTrap = (obj, key, getter, setter) => {
    if (!obj) return;
    try {
      let current = obj[key];
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
          return current;
        },
        set(value) {
          current = value;
          if (typeof value === "function" && !isWrapped(value)) {
            wrapFn(getter, setter);
          }
        }
      });
    } catch {
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => reapplyAll(), { once: true });
  } else {
    reapplyAll();
  }
  wrapSeekFunctions();
  installSeekTrap(
    runtimeWindow.__hf,
    "seek",
    () => runtimeWindow.__hf?.["seek"],
    (fn) => {
      if (runtimeWindow.__hf) runtimeWindow.__hf["seek"] = fn;
    }
  );
  installSeekTrap(
    runtimeWindow.__player,
    "renderSeek",
    () => runtimeWindow.__player?.["renderSeek"],
    (fn) => {
      if (runtimeWindow.__player) runtimeWindow.__player["renderSeek"] = fn;
    }
  );
  let remaining = 120;
  const interval = setInterval(() => {
    wrapSeekFunctions();
    remaining -= 1;
    if (remaining <= 0) clearInterval(interval);
  }, 50);
}
function studioManualEditsRenderRuntime(manifestContent, activeCompositionPath) {
  const OFFSET_X_PROP = "--hf-studio-offset-x";
  const OFFSET_Y_PROP = "--hf-studio-offset-y";
  const WIDTH_PROP = "--hf-studio-width";
  const HEIGHT_PROP = "--hf-studio-height";
  const ROTATION_PROP = "--hf-studio-rotation";
  const PATH_OFFSET_ATTR = "data-hf-studio-path-offset";
  const BOX_SIZE_ATTR = "data-hf-studio-box-size";
  const ROTATION_ATTR = "data-hf-studio-rotation";
  const ORIGINAL_TRANSLATE_ATTR = "data-hf-studio-original-translate";
  const ORIGINAL_ROTATE_ATTR = "data-hf-studio-original-rotate";
  const WRAPPED_SEEK_PROP = "__hfStudioManualEditsWrapped";
  const ROTATION_TRANSFORM_ORIGIN = "center center";
  const finiteNumber = (value) => typeof value === "number" && Number.isFinite(value) ? value : null;
  const objectRecord = (value) => value && typeof value === "object" ? value : null;
  const runtimeWindow = window;
  const parsedManifest = (() => {
    try {
      return objectRecord(JSON.parse(manifestContent));
    } catch {
      return null;
    }
  })();
  const manifestEdits = Array.isArray(parsedManifest?.edits) ? parsedManifest.edits : [];
  if (manifestEdits.length === 0) return;
  const sourceFileForElement = (element) => {
    let current = element;
    while (current) {
      const sourceFile = current.getAttribute("data-composition-file") ?? current.getAttribute("data-composition-src");
      if (sourceFile) return sourceFile;
      current = current.parentElement;
    }
    return activeCompositionPath ?? "index.html";
  };
  const elementMatchesSourceFile = (element, sourceFile) => sourceFileForElement(element) === sourceFile;
  const styleUsesStudioOffset = (value) => value.includes(OFFSET_X_PROP) || value.includes(OFFSET_Y_PROP);
  const styleUsesStudioRotation = (value) => value.includes(ROTATION_PROP);
  const splitTopLevelWhitespace = (value) => {
    const parts = [];
    let depth = 0;
    let current = "";
    for (const char of value.trim()) {
      if (char === "(") depth += 1;
      if (char === ")") depth = Math.max(0, depth - 1);
      if (/\s/.test(char) && depth === 0) {
        if (current) parts.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) parts.push(current);
    return parts;
  };
  const composeTranslate = (element, x, y) => {
    const original = element.getAttribute(ORIGINAL_TRANSLATE_ATTR)?.trim();
    if (!original || original === "none") return `${x} ${y}`;
    const parts = splitTopLevelWhitespace(original);
    if (parts.length === 1) return `calc(${parts[0]} + ${x}) ${y}`;
    if (parts.length === 2) return `calc(${parts[0]} + ${x}) calc(${parts[1]} + ${y})`;
    if (parts.length === 3) {
      return `calc(${parts[0]} + ${x}) calc(${parts[1]} + ${y}) ${parts[2]}`;
    }
    return `${x} ${y}`;
  };
  const readStyleOrComputed = (element, property) => {
    try {
      return element.style.getPropertyValue(property) || getComputedStyle(element).getPropertyValue(property);
    } catch {
      return element.style.getPropertyValue(property);
    }
  };
  const readTransformLonghandBase = (element, property) => {
    const value = readStyleOrComputed(element, property).trim();
    return value === "none" ? "" : value;
  };
  const preparePathOffsetBase = (element) => {
    const currentTranslate = readTransformLonghandBase(element, "translate");
    const hasMarker = element.hasAttribute(PATH_OFFSET_ATTR);
    const wasResetByAnimation = !styleUsesStudioOffset(currentTranslate);
    if (!hasMarker) {
      element.setAttribute(ORIGINAL_TRANSLATE_ATTR, wasResetByAnimation ? currentTranslate : "");
    } else if (wasResetByAnimation) {
      element.setAttribute(ORIGINAL_TRANSLATE_ATTR, currentTranslate);
    }
  };
  const prepareRotationBase = (element) => {
    const currentRotate = readTransformLonghandBase(element, "rotate");
    const hasMarker = element.hasAttribute(ROTATION_ATTR);
    const wasResetByAnimation = !styleUsesStudioRotation(currentRotate);
    if (!hasMarker) {
      element.setAttribute(ORIGINAL_ROTATE_ATTR, wasResetByAnimation ? currentRotate : "");
    } else if (wasResetByAnimation) {
      element.setAttribute(ORIGINAL_ROTATE_ATTR, currentRotate);
    }
  };
  const querySelectorCandidates = (selector) => {
    const isCandidate = (element) => element instanceof HTMLElement;
    const className = selector.match(/^\.([A-Za-z0-9_-]+)$/)?.[1];
    if (className) {
      return Array.from(document.getElementsByTagName("*")).filter(
        (element) => isCandidate(element) && element.classList.contains(className)
      );
    }
    if (/^[A-Za-z][A-Za-z0-9-]*$/.test(selector)) {
      return Array.from(document.getElementsByTagName(selector)).filter(isCandidate);
    }
    return Array.from(document.querySelectorAll(selector)).filter(isCandidate);
  };
  const resolveTarget = (edit) => {
    const targetRecord = objectRecord(edit.target);
    if (!targetRecord) return null;
    const sourceFile = typeof targetRecord.sourceFile === "string" ? targetRecord.sourceFile : "";
    if (!sourceFile) return null;
    const id = typeof targetRecord.id === "string" ? targetRecord.id : "";
    if (id) {
      const byId = document.getElementById(id);
      if (byId instanceof HTMLElement && elementMatchesSourceFile(byId, sourceFile)) return byId;
      const matchesById = [
        document.documentElement,
        ...Array.from(document.getElementsByTagName("*"))
      ].filter(
        (element) => element instanceof HTMLElement && element.id === id && elementMatchesSourceFile(element, sourceFile)
      );
      if (matchesById[0]) return matchesById[0];
    }
    const selector = typeof targetRecord.selector === "string" ? targetRecord.selector : "";
    if (!selector) return null;
    try {
      const matches = querySelectorCandidates(selector).filter(
        (element) => elementMatchesSourceFile(element, sourceFile)
      );
      const selectorIndex = finiteNumber(targetRecord.selectorIndex) ?? 0;
      return matches[Math.max(0, Math.floor(selectorIndex))] ?? null;
    } catch {
      return null;
    }
  };
  const roundRotationAngle = (angle) => Math.round(angle * 10) / 10;
  const isSimpleRotateAngle = (value) => /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:deg|rad|turn|grad)$/.test(value.trim());
  const composeRotation = (element, rotationValue) => {
    const original = element.getAttribute(ORIGINAL_ROTATE_ATTR)?.trim();
    if (!original || original === "none" || !isSimpleRotateAngle(original)) {
      return rotationValue;
    }
    return `calc(${original} + ${rotationValue})`;
  };
  const applyPathOffset = (element, edit) => {
    const x = finiteNumber(edit.x);
    const y = finiteNumber(edit.y);
    if (x == null || y == null) return;
    preparePathOffsetBase(element);
    element.setAttribute(PATH_OFFSET_ATTR, "true");
    element.style.setProperty(OFFSET_X_PROP, `${Math.round(x)}px`);
    element.style.setProperty(OFFSET_Y_PROP, `${Math.round(y)}px`);
    element.style.setProperty(
      "translate",
      composeTranslate(element, `var(${OFFSET_X_PROP}, 0px)`, `var(${OFFSET_Y_PROP}, 0px)`)
    );
  };
  const readParentFlexBasisPixels = (element, size) => {
    const parent = element.parentElement;
    if (!parent) return null;
    const styles = getComputedStyle(parent);
    if (styles.display !== "flex" && styles.display !== "inline-flex") return null;
    return Math.round(
      Math.max(1, styles.flexDirection.startsWith("column") ? size.height : size.width)
    );
  };
  const applyBoxSize = (element, edit) => {
    const width = finiteNumber(edit.width);
    const height = finiteNumber(edit.height);
    if (width == null || height == null || width <= 0 || height <= 0) return;
    const rounded = {
      width: Math.round(Math.max(1, width)),
      height: Math.round(Math.max(1, height))
    };
    element.setAttribute(BOX_SIZE_ATTR, "true");
    element.style.setProperty(WIDTH_PROP, `${rounded.width}px`);
    element.style.setProperty(HEIGHT_PROP, `${rounded.height}px`);
    element.style.setProperty("box-sizing", "border-box");
    element.style.setProperty("width", `${rounded.width}px`);
    element.style.setProperty("height", `${rounded.height}px`);
    element.style.setProperty("min-width", "0px");
    element.style.setProperty("min-height", "0px");
    element.style.setProperty("max-width", "none");
    element.style.setProperty("max-height", "none");
    const flexBasis = readParentFlexBasisPixels(element, rounded);
    if (flexBasis != null) {
      element.style.setProperty("flex-basis", `${flexBasis}px`);
      element.style.setProperty("flex-grow", "0");
      element.style.setProperty("flex-shrink", "0");
    }
    if (getComputedStyle(element).display === "inline") {
      element.style.setProperty("display", "inline-block");
    }
  };
  const applyRotation = (element, edit) => {
    const angle = finiteNumber(edit.angle);
    if (angle == null) return;
    prepareRotationBase(element);
    element.setAttribute(ROTATION_ATTR, "true");
    element.style.setProperty(ROTATION_PROP, `${roundRotationAngle(angle)}deg`);
    element.style.setProperty("transform-origin", ROTATION_TRANSFORM_ORIGIN);
    element.style.setProperty("rotate", composeRotation(element, `var(${ROTATION_PROP}, 0deg)`));
  };
  const applyManifest = () => {
    let applied = 0;
    for (const edit of manifestEdits) {
      const editRecord = objectRecord(edit);
      if (!editRecord) continue;
      const element = resolveTarget(editRecord);
      if (!element) continue;
      if (editRecord.kind === "path-offset") applyPathOffset(element, editRecord);
      if (editRecord.kind === "box-size") applyBoxSize(element, editRecord);
      if (editRecord.kind === "rotation") applyRotation(element, editRecord);
      applied += 1;
    }
    return applied;
  };
  runtimeWindow.__hfStudioManualEditsApply = applyManifest;
  const markWrapped = (fn) => {
    try {
      Object.defineProperty(fn, WRAPPED_SEEK_PROP, {
        configurable: false,
        enumerable: false,
        value: true
      });
    } catch {
      try {
        fn[WRAPPED_SEEK_PROP] = true;
      } catch {
      }
    }
  };
  const isWrapped = (fn) => Boolean(fn[WRAPPED_SEEK_PROP]);
  const wrapFunction = (get, set) => {
    const fn = get();
    if (!fn) return false;
    const seek = fn;
    if (isWrapped(seek)) {
      applyManifest();
      return true;
    }
    const wrappedSeek = function(time) {
      const result = seek.call(this, time);
      applyManifest();
      return result;
    };
    markWrapped(wrappedSeek);
    set(wrappedSeek);
    applyManifest();
    return true;
  };
  const wrapSeekFunctions = () => {
    const wrappedHfSeek = wrapFunction(
      () => runtimeWindow.__hf?.seek,
      (fn) => {
        if (runtimeWindow.__hf) runtimeWindow.__hf.seek = fn;
      }
    );
    const wrappedPlayerRenderSeek = wrapFunction(
      () => runtimeWindow.__player?.renderSeek,
      (fn) => {
        if (runtimeWindow.__player) runtimeWindow.__player.renderSeek = fn;
      }
    );
    return wrappedHfSeek || wrappedPlayerRenderSeek;
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyManifest(), { once: true });
  } else {
    applyManifest();
  }
  wrapSeekFunctions();
  let remainingSeekWrapAttempts = 120;
  const seekWrapInterval = setInterval(() => {
    wrapSeekFunctions();
    remainingSeekWrapAttempts -= 1;
    if (remainingSeekWrapAttempts <= 0) clearInterval(seekWrapInterval);
  }, 50);
}

export {
  STUDIO_MANUAL_EDITS_PATH,
  createStudioManualEditsRenderBodyScript,
  createStudioPositionSeekReapplyScript
};
