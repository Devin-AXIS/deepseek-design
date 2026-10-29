import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/commands/motionShotLayout.ts
var ANGLE_PRESETS = {
  front: [0, 0],
  iso: [30, -22],
  top: [0, -68],
  side: [78, 0],
  "rear-iso": [205, -22]
};
function parseAngle(a) {
  if (!a) return { yaw: 0, pitch: 0 };
  const preset = ANGLE_PRESETS[a];
  if (preset) return { yaw: preset[0], pitch: preset[1] };
  const [y, p] = a.split(",").map((n) => Number.parseFloat(n));
  return { yaw: Number.isFinite(y) ? y : 0, pitch: Number.isFinite(p) ? p : 0 };
}
function resolveShotSelectors(scope, animated, isDescendant) {
  if (animated.includes(scope)) return [scope];
  return animated.filter((target) => isDescendant(scope, target));
}
function sampleTimes(dur, n, from, to) {
  const t0 = from != null ? Math.max(0, Math.min(from, dur)) : 0;
  const t1 = to != null ? Math.max(0, Math.min(to, dur)) : dur;
  const count = Math.max(1, Math.floor(n));
  if (count === 1) return [t0];
  return Array.from({ length: count }, (_, i) => {
    const t = t0 + i / (count - 1) * (t1 - t0);
    return Math.round(t * 1e3) / 1e3;
  });
}
function stripCaptureTimeCandidates(time) {
  return time > 0 ? [time, Math.max(0, time - 1 / 30)] : [time];
}
function ghostAlphas(n) {
  if (n <= 0) return [];
  if (n === 1) return [1];
  const lo = 0.14;
  return Array.from(
    { length: n },
    (_, i) => Math.round((lo + (1 - lo) * (i / (n - 1))) * 1e3) / 1e3
  );
}
function fitTransform(pts, width, height) {
  if (pts.length === 0) return { k: 1, cx: width / 2, cy: height / 2 };
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const k = Math.max(0.3, Math.min(7, Math.min(width, height) * 0.8 / span));
  return { k, cx, cy };
}
function stripCells(n, width, height) {
  const cols = n <= 5 ? Math.max(1, n) : Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  return { cols, rows, cellW: width / cols, cellH: height / rows };
}
var timeColor = (f) => `hsl(${190 + f * 150} 90% 65%)`;
var attrs = (o) => Object.entries(o).map(([k, v]) => `${k}="${v}"`).join(" ");
var polygon = (corners, fill, fillOpacity, stroke) => `<polygon ${attrs({
  points: corners.map((p) => `${round(p.x)},${round(p.y)}`).join(" "),
  fill,
  "fill-opacity": fillOpacity.toFixed(2),
  stroke,
  "stroke-width": 2.5,
  "stroke-linejoin": "round"
})}/>`;
var line = (a, b, stroke, w, o) => `<line ${attrs({ x1: round(a.x), y1: round(a.y), x2: round(b.x), y2: round(b.y), stroke, "stroke-width": w, opacity: o, "stroke-linecap": "round" })}/>`;
var circle = (p, r, fill) => `<circle ${attrs({ cx: round(p.x), cy: round(p.y), r, fill })}/>`;
var text = (p, s, fill, size = 15) => `<text ${attrs({ x: round(p.x), y: round(p.y), fill, "font-family": "ui-monospace,monospace", "font-size": size, "font-weight": 600 })}>${escapeXml(s)}</text>`;
var round = (n) => Math.round(n * 100) / 100;
var escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var ghost = (corners, center, color, opacity, f) => {
  const tickEnd = {
    x: (corners[0].x + corners[1].x) / 2,
    y: (corners[0].y + corners[1].y) / 2
  };
  return polygon(corners, color, Math.max(0.08, opacity * 0.42), timeColor(f)) + line(center, tickEnd, timeColor(f), 3, 0.9);
};
function buildOnionSvg(elements, opt) {
  const { width: W, height: H } = opt;
  let body = "";
  if (opt.layout === "strip") {
    body = stripBody(elements[0]?.samples ?? [], W, H);
  } else {
    body = pathBody(elements, opt.fit, W, H);
  }
  if (opt.label) body += text({ x: 28, y: 40 }, opt.label, timeColor(0), 18);
  return `<svg ${attrs({
    xmlns: "http://www.w3.org/2000/svg",
    style: "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647",
    viewBox: `0 0 ${W} ${H}`
  })}>${body}</svg>`;
}
function buildRenderedStripSvg(frames, opt) {
  const { width: W, height: H } = opt;
  const { cols, cellW, cellH } = stripCells(frames.length, W, H);
  let body = `<rect ${attrs({ x: 0, y: 0, width: W, height: H, fill: "#0b1320" })}/>`;
  frames.forEach((frame, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const cellX = col * cellW;
    const cellY = row * cellH;
    const availableW = Math.max(1, cellW - 20);
    const availableH = Math.max(1, cellH - 38);
    const scale = Math.min(availableW / frame.width, availableH / frame.height);
    const imageW = frame.width * scale;
    const imageH = frame.height * scale;
    const imageX = cellX + (cellW - imageW) / 2;
    const imageY = cellY + 30 + (availableH - imageH) / 2;
    const f = frames.length <= 1 ? 0 : index / (frames.length - 1);
    body += `<rect ${attrs({ x: round(cellX + 3), y: round(cellY + 3), width: round(cellW - 6), height: round(cellH - 6), fill: "none", stroke: "#1c2531", "stroke-width": 1, rx: 8 })}/>`;
    body += `<image ${attrs({ x: round(imageX), y: round(imageY), width: round(imageW), height: round(imageH), href: frame.dataUrl, preserveAspectRatio: "xMidYMid meet" })}/>`;
    body += text({ x: cellX + 12, y: cellY + 24 }, `${frame.t}s`, timeColor(f), 16);
  });
  if (opt.label) body += text({ x: 28, y: 40 }, opt.label, timeColor(0), 18);
  return `<svg ${attrs({
    xmlns: "http://www.w3.org/2000/svg",
    style: "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647",
    viewBox: `0 0 ${W} ${H}`
  })}>${body}</svg>`;
}
function pathBody(elements, fit, W, H) {
  const all = elements.flatMap((e) => e.samples.flatMap((s) => [...s.q, s.c]));
  const { k, cx, cy } = fit ? fitTransform(all, W, H) : { k: 1, cx: W / 2, cy: H / 2 };
  const M = (p) => ({ x: (p.x - cx) * k + W / 2, y: (p.y - cy) * k + H / 2 });
  let out = "";
  for (const el of elements) {
    const last = el.samples.length - 1;
    const fOf = (i) => last <= 0 ? 0 : i / last;
    el.samples.forEach((s, i) => out += ghost(s.q.map(M), M(s.c), s.color, s.opacity, fOf(i)));
    for (let i = 0; i < last; i++)
      out += line(M(el.samples[i].c), M(el.samples[i + 1].c), timeColor(fOf(i)), 3.5, 0.85);
    el.samples.forEach((s, i) => {
      const c = M(s.c);
      out += circle(c, 4, timeColor(fOf(i)));
      out += text({ x: c.x + 10, y: c.y + (i % 2 === 0 ? -10 : 18) }, `${s.t}s`, timeColor(fOf(i)));
    });
  }
  return out;
}
function stripBody(samples, W, H) {
  if (samples.length === 0) return "";
  const { cols, cellW, cellH } = stripCells(samples.length, W, H);
  let maxExt = 1;
  for (const s of samples)
    for (const p of s.q) maxExt = Math.max(maxExt, Math.hypot(p.x - s.c.x, p.y - s.c.y));
  const cellScale = Math.min(cellW, cellH) * 0.62 / maxExt;
  const last = samples.length - 1;
  let out = "";
  samples.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cc = { x: cellW * (col + 0.5), y: cellH * (row + 0.5) };
    const f = last <= 0 ? 0 : i / last;
    out += `<rect ${attrs({ x: round(col * cellW + 3), y: round(row * cellH + 3), width: round(cellW - 6), height: round(cellH - 6), fill: "none", stroke: "#1c2531", "stroke-width": 1, rx: 8 })}/>`;
    const corners = s.q.map((p) => ({
      x: cc.x + (p.x - s.c.x) * cellScale,
      y: cc.y + (p.y - s.c.y) * cellScale
    }));
    out += ghost(corners, cc, s.color, s.opacity, f);
    out += text({ x: col * cellW + 12, y: row * cellH + 24 }, `${s.t}s`, timeColor(f), 16);
  });
  return out;
}

export {
  parseAngle,
  resolveShotSelectors,
  sampleTimes,
  stripCaptureTimeCandidates,
  ghostAlphas,
  buildOnionSvg,
  buildRenderedStripSvg
};
