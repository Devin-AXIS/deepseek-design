import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../parsers/dist/slideshow.js
var SLIDESHOW_MANIFEST_VERSION = 1;
var SLIDESHOW_ISLAND_TYPE = "application/hyperframes-slideshow+json";
function slideshowIslandRegex(flags = "i") {
  const escaped = SLIDESHOW_ISLAND_TYPE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`<script[^>]*type=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/script>`, flags);
}
function parseSlideshowManifest(html) {
  const re = slideshowIslandRegex("i");
  const match = re.exec(html);
  if (!match || match[1] === void 0) return null;
  const raw = match[1].trim();
  if (raw.length === 0) return null;
  const parsed = JSON.parse(raw);
  if (!isManifest(parsed)) {
    throw new Error("slideshow island is not a valid SlideshowManifest");
  }
  return parsed;
}
function isOptionalNumberArray(v) {
  return v === void 0 || Array.isArray(v) && v.every((n) => typeof n === "number");
}
function isOptionalBoolean(v) {
  return v === void 0 || typeof v === "boolean";
}
function isSlideRef(v) {
  if (typeof v !== "object" || v === null) return false;
  const r = v;
  if (typeof r["sceneId"] !== "string") return false;
  if (!isOptionalNumberArray(r["fragments"])) return false;
  if (r["hotspots"] !== void 0 && !Array.isArray(r["hotspots"])) return false;
  if (!isOptionalBoolean(r["autoplay"])) return false;
  return true;
}
function isSlideSequence(v) {
  if (typeof v !== "object" || v === null) return false;
  const s = v;
  return typeof s["id"] === "string" && typeof s["label"] === "string" && Array.isArray(s["slides"]) && s["slides"].every(isSlideRef);
}
function isManifest(v) {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
  const o = v;
  if (!Array.isArray(o["slides"]) || !o["slides"].every(isSlideRef)) return false;
  if (o["slideSequences"] !== void 0) {
    if (!Array.isArray(o["slideSequences"]) || !o["slideSequences"].every(isSlideSequence))
      return false;
  }
  return true;
}
function missingBoundError(sceneId, missing) {
  const present = missing === "startTime" ? "endTime" : "startTime";
  return `slide "${sceneId}" sets ${present} but ${missing} cannot be resolved (no scene "${sceneId}")`;
}
function resolveTimeRange(ref, scene, errors) {
  const { startTime, endTime, sceneId } = ref;
  if (startTime !== void 0 && endTime !== void 0) {
    return { start: startTime, end: endTime };
  }
  if (startTime === void 0 && endTime === void 0) {
    if (!scene) {
      errors.push(`slide references unresolved sceneId "${sceneId}"`);
      return { start: 0, end: 0 };
    }
    return { start: scene.start, end: scene.start + scene.duration };
  }
  if (!scene) {
    const missing = startTime === void 0 ? "startTime" : "endTime";
    errors.push(missingBoundError(sceneId, missing));
    const bound = startTime ?? endTime ?? 0;
    return { start: bound, end: bound };
  }
  return {
    start: startTime ?? scene.start,
    end: endTime ?? scene.start + scene.duration
  };
}
function validateFragments(sceneId, fragments, start, end, errors) {
  for (const f of fragments) {
    if (f < start || f > end) {
      errors.push(`slide "${sceneId}" fragment ${f} is outside range [${start}, ${end}]`);
    }
  }
}
function resolveSlide(ref, sceneById, errors) {
  const scene = sceneById.get(ref.sceneId);
  const { start, end } = resolveTimeRange(ref, scene, errors);
  if (ref.startTime !== void 0 && ref.endTime !== void 0 && end <= start) {
    errors.push(`slide "${ref.sceneId}" has endTime (${end}) <= startTime (${start})`);
  }
  const fragments = [...new Set(ref.fragments ?? [])].sort((a, b) => a - b);
  validateFragments(ref.sceneId, fragments, start, end, errors);
  return { ...ref, start, end, fragments, hotspots: ref.hotspots ?? [] };
}
function resolveSlideshow(manifest, scenes) {
  const errors = [];
  const sceneById = new Map(scenes.map((s) => [s.id, s]));
  const sequences = {};
  for (const seq of manifest.slideSequences ?? []) {
    if (Object.prototype.hasOwnProperty.call(sequences, seq.id)) {
      errors.push(`duplicate slideSequence id "${seq.id}" \u2014 only the last definition is kept`);
    }
    sequences[seq.id] = {
      id: seq.id,
      label: seq.label,
      slides: seq.slides.map((s) => resolveSlide(s, sceneById, errors))
    };
  }
  const slides = manifest.slides.map((s) => resolveSlide(s, sceneById, errors));
  const allSlides = [...slides, ...Object.values(sequences).flatMap((s) => s.slides)];
  for (const slide of allSlides) {
    for (const h of slide.hotspots) {
      const seq = sequences[h.target];
      if (!seq) {
        errors.push(`hotspot "${h.id}" targets unknown sequence "${h.target}"`);
      } else if (seq.slides.length === 0) {
        errors.push(`hotspot "${h.id}" targets empty sequence "${h.target}"`);
      }
    }
  }
  const ordered = [...slides].sort((a, b) => a.start - b.start);
  for (let i = 1; i < ordered.length; i++) {
    const prev = ordered[i - 1];
    const curr = ordered[i];
    if (prev !== void 0 && curr !== void 0 && curr.start < prev.end) {
      errors.push(`main-line slides "${prev.sceneId}" and "${curr.sceneId}" overlap`);
    }
  }
  return { resolved: { slides, sequences }, errors };
}
function isSceneLikeCompositionId(compositionId) {
  const normalized = compositionId.trim().toLowerCase();
  if (!normalized || normalized === "main") return false;
  if (normalized.includes("caption")) return false;
  if (normalized.includes("ambient")) return false;
  return true;
}

export {
  SLIDESHOW_MANIFEST_VERSION,
  SLIDESHOW_ISLAND_TYPE,
  slideshowIslandRegex,
  parseSlideshowManifest,
  resolveSlideshow,
  isSceneLikeCompositionId
};
