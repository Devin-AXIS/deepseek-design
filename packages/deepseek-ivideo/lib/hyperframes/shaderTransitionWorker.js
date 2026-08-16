import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../producer/src/services/shaderTransitionWorker.ts
import { parentPort } from "worker_threads";

// ../engine/src/utils/shaderTransitions.ts
var HLG_OOTF_LW = 1e3;
var HLG_OOTF_GAMMA = 1.2 * Math.pow(1.111, Math.log2(HLG_OOTF_LW / 1e3));
function sampleRgb48le(buf, u, v, w, h) {
  const uc = Math.max(0, Math.min(1, u));
  const vc = Math.max(0, Math.min(1, v));
  const sx = uc * (w - 1);
  const sy = vc * (h - 1);
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = Math.min(x0 + 1, w - 1);
  const y1 = Math.min(y0 + 1, h - 1);
  const fx = sx - x0;
  const fy = sy - y0;
  const w00 = (1 - fx) * (1 - fy);
  const w10 = fx * (1 - fy);
  const w01 = (1 - fx) * fy;
  const w11 = fx * fy;
  const off00 = (y0 * w + x0) * 6;
  const off10 = (y0 * w + x1) * 6;
  const off01 = (y1 * w + x0) * 6;
  const off11 = (y1 * w + x1) * 6;
  const r = Math.round(
    buf.readUInt16LE(off00) * w00 + buf.readUInt16LE(off10) * w10 + buf.readUInt16LE(off01) * w01 + buf.readUInt16LE(off11) * w11
  );
  const g = Math.round(
    buf.readUInt16LE(off00 + 2) * w00 + buf.readUInt16LE(off10 + 2) * w10 + buf.readUInt16LE(off01 + 2) * w01 + buf.readUInt16LE(off11 + 2) * w11
  );
  const b = Math.round(
    buf.readUInt16LE(off00 + 4) * w00 + buf.readUInt16LE(off10 + 4) * w10 + buf.readUInt16LE(off01 + 4) * w01 + buf.readUInt16LE(off11 + 4) * w11
  );
  return [r, g, b];
}
function mix16(a, b, t) {
  return Math.round(a * (1 - t) + b * t);
}
function clamp16(v) {
  return Math.max(0, Math.min(65535, v));
}
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
function hash(x, y) {
  return (Math.sin(x * 127.1 + y * 311.7) * 43758.5453 % 1 + 1) % 1;
}
function vnoise(px, py) {
  const ix = Math.floor(px);
  const iy = Math.floor(py);
  let fx = px - ix;
  let fy = py - iy;
  fx = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
  fy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
  const h00 = hash(ix, iy);
  const h10 = hash(ix + 1, iy);
  const h01 = hash(ix, iy + 1);
  const h11 = hash(ix + 1, iy + 1);
  return h00 * (1 - fx) * (1 - fy) + h10 * fx * (1 - fy) + h01 * (1 - fx) * fy + h11 * fx * fy;
}
var ROT_A = 0.8;
var ROT_B = 0.6;
function fbm(px, py) {
  let value = 0;
  let amplitude = 0.5;
  let x = px;
  let y = py;
  for (let i = 0; i < 5; i++) {
    value += amplitude * vnoise(x, y);
    const nx = ROT_A * x - ROT_B * y;
    const ny = ROT_B * x + ROT_A * y;
    x = nx * 2.02;
    y = ny * 2.02;
    amplitude *= 0.5;
  }
  return value;
}
var TRANSITIONS = {};
var crossfade = (from, to, out, w, h, p) => {
  const inv = 1 - p;
  for (let i = 0; i < w * h; i++) {
    const o = i * 6;
    out.writeUInt16LE(Math.round(from.readUInt16LE(o) * inv + to.readUInt16LE(o) * p), o);
    out.writeUInt16LE(
      Math.round(from.readUInt16LE(o + 2) * inv + to.readUInt16LE(o + 2) * p),
      o + 2
    );
    out.writeUInt16LE(
      Math.round(from.readUInt16LE(o + 4) * inv + to.readUInt16LE(o + 4) * p),
      o + 4
    );
  }
};
TRANSITIONS["crossfade"] = crossfade;
var flashThroughWhite = (from, to, out, w, h, p) => {
  const toWhite = smoothstep(0, 0.45, p);
  const fromWhite = 1 - smoothstep(0.5, 1, p);
  const blend = smoothstep(0.35, 0.65, p);
  for (let i = 0; i < w * h; i++) {
    const o = i * 6;
    const fromR = mix16(from.readUInt16LE(o), 65535, toWhite);
    const fromG = mix16(from.readUInt16LE(o + 2), 65535, toWhite);
    const fromB = mix16(from.readUInt16LE(o + 4), 65535, toWhite);
    const toR = mix16(to.readUInt16LE(o), 65535, fromWhite);
    const toG = mix16(to.readUInt16LE(o + 2), 65535, fromWhite);
    const toB = mix16(to.readUInt16LE(o + 4), 65535, fromWhite);
    out.writeUInt16LE(mix16(fromR, toR, blend), o);
    out.writeUInt16LE(mix16(fromG, toG, blend), o + 2);
    out.writeUInt16LE(mix16(fromB, toB, blend), o + 4);
  }
};
TRANSITIONS["flash-through-white"] = flashThroughWhite;
var chromaticSplit = (from, to, out, w, h, p) => {
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const cx = ux - 0.5;
    const cy = uy - 0.5;
    const fromShift = p * 0.06;
    const fr = sampleRgb48le(from, ux + cx * fromShift, uy + cy * fromShift, w, h)[0];
    const fg = sampleRgb48le(from, ux, uy, w, h)[1];
    const fb = sampleRgb48le(from, ux - cx * fromShift, uy - cy * fromShift, w, h)[2];
    const toShift = (1 - p) * 0.06;
    const tr = sampleRgb48le(to, ux - cx * toShift, uy - cy * toShift, w, h)[0];
    const tg = sampleRgb48le(to, ux, uy, w, h)[1];
    const tb = sampleRgb48le(to, ux + cx * toShift, uy + cy * toShift, w, h)[2];
    out.writeUInt16LE(clamp16(mix16(fr, tr, p)), o);
    out.writeUInt16LE(clamp16(mix16(fg, tg, p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(fb, tb, p)), o + 4);
  }
};
TRANSITIONS["chromatic-split"] = chromaticSplit;
var sdfIris = (from, to, out, w, h, p) => {
  const accentBright = [65535, 55e3, 35e3];
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const ax = (ux - 0.5) * (w / h);
    const ay = uy - 0.5;
    const d = Math.sqrt(ax * ax + ay * ay);
    const radius = p * 1.2;
    const fw = 3e-3;
    const edge = smoothstep(radius + fw, radius - fw, d);
    const ring1 = Math.exp(-Math.abs(d - radius) * 25);
    const ring2 = Math.exp(-Math.abs(d - radius + 0.04) * 20) * 0.5;
    const ring3 = Math.exp(-Math.abs(d - radius + 0.08) * 15) * 0.25;
    const glow = (ring1 + ring2 + ring3) * p * (1 - p) * 4;
    const [fromR, fromG, fromB] = sampleRgb48le(from, ux, uy, w, h);
    const [toR, toG, toB] = sampleRgb48le(to, ux, uy, w, h);
    out.writeUInt16LE(clamp16(mix16(fromR, toR, edge) + accentBright[0] * glow * 0.6), o);
    out.writeUInt16LE(clamp16(mix16(fromG, toG, edge) + accentBright[1] * glow * 0.6), o + 2);
    out.writeUInt16LE(clamp16(mix16(fromB, toB, edge) + accentBright[2] * glow * 0.6), o + 4);
  }
};
TRANSITIONS["sdf-iris"] = sdfIris;
function glitchRand(x, y) {
  return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453 % 1 + 1) % 1;
}
var glitch = (from, to, out, w, h, p) => {
  const intensity = p * (1 - p) * 4;
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const lineY = Math.floor(uy * 60) / 60;
    const lineDisp = (glitchRand(lineY, Math.floor(p * 17)) - 0.5) * 0.18 * intensity;
    const blockX = Math.floor(ux * 12);
    const blockY = Math.floor(uy * 8);
    const progressStep = Math.floor(p * 11);
    const br = glitchRand(blockX + progressStep, blockY + progressStep);
    const ba = (br >= 0.83 ? 1 : 0) * intensity;
    const bdx = (glitchRand(blockX * 2.1, blockY * 2.1) - 0.5) * 0.35 * ba;
    const bdy = (glitchRand(blockX * 3.7, blockY * 3.7) - 0.5) * 0.35 * ba;
    const uvx = Math.max(0, Math.min(1, ux + lineDisp + bdx));
    const uvy = Math.max(0, Math.min(1, uy + bdy));
    const shift = intensity * 0.035;
    const r = sampleRgb48le(from, uvx + shift, uvy, w, h)[0];
    const g = sampleRgb48le(from, uvx, uvy, w, h)[1];
    const b = sampleRgb48le(from, uvx - shift, uvy, w, h)[2];
    let cr = r / 65535;
    let cg = g / 65535;
    let cb = b / 65535;
    const scanline = (uy * h * 0.5 % 1 + 1) % 1 >= 0.5 ? 0.05 * intensity : 0;
    cr -= scanline;
    cg -= scanline;
    cb -= scanline;
    const flicker = 1 + (glitchRand(Math.floor(p * 23), 0) - 0.5) * 0.3 * intensity;
    cr *= flicker;
    cg *= flicker;
    cb *= flicker;
    const levels = 256 - (256 - 8) * (intensity * 0.5);
    cr = Math.floor(cr * levels) / levels;
    cg = Math.floor(cg * levels) / levels;
    cb = Math.floor(cb * levels) / levels;
    const [toR, toG, toB] = sampleRgb48le(to, ux, uy, w, h);
    out.writeUInt16LE(clamp16(mix16(Math.round(cr * 65535), toR, p)), o);
    out.writeUInt16LE(clamp16(mix16(Math.round(cg * 65535), toG, p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(Math.round(cb * 65535), toB, p)), o + 4);
  }
};
TRANSITIONS["glitch"] = glitch;
function aces(x) {
  return Math.max(0, Math.min(1, x * (2.51 * x + 0.03) / (x * (2.43 * x + 0.59) + 0.14)));
}
var lightLeak = (from, to, out, w, h, p) => {
  const accent = [5e4 / 65535, 25e3 / 65535, 5e3 / 65535];
  const accentBright = [65535 / 65535, 55e3 / 65535, 35e3 / 65535];
  const lpx = 1.3;
  const lpy = -0.2;
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const dx = ux - lpx;
    const dy = uy - lpy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const leak = Math.max(0, Math.min(1, Math.exp(-dist * 1.8) * p * 4));
    const warmR = accent[0] + (accentBright[0] - accent[0]) * dist * 0.7;
    const warmG = accent[1] + (accentBright[1] - accent[1]) * dist * 0.7;
    const warmB = accent[2] + (accentBright[2] - accent[2]) * dist * 0.7;
    const flare = Math.exp(-Math.abs(uy - (-0.2 + ux * 0.3)) * 15) * leak * 0.3;
    const [fr, fg, fb] = sampleRgb48le(from, ux, uy, w, h);
    const fromR = fr / 65535;
    const fromG = fg / 65535;
    const fromB = fb / 65535;
    const overR = aces(fromR + warmR * leak * 3 + accentBright[0] * flare);
    const overG = aces(fromG + warmG * leak * 3 + accentBright[1] * flare);
    const overB = aces(fromB + warmB * leak * 3 + accentBright[2] * flare);
    const [toR, toG, toB] = sampleRgb48le(to, ux, uy, w, h);
    const blend = smoothstep(0.15, 0.85, p);
    out.writeUInt16LE(clamp16(mix16(Math.round(overR * 65535), toR, blend)), o);
    out.writeUInt16LE(clamp16(mix16(Math.round(overG * 65535), toG, blend)), o + 2);
    out.writeUInt16LE(clamp16(mix16(Math.round(overB * 65535), toB, blend)), o + 4);
  }
};
TRANSITIONS["light-leak"] = lightLeak;
var crossWarpMorph = (from, to, out, w, h, p) => {
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const dispX = fbm(ux * 3, uy * 3) - 0.5;
    const dispY = fbm(ux * 3 + 7.3, uy * 3 + 3.7) - 0.5;
    const fromUx = Math.max(0, Math.min(1, ux + dispX * p * 0.5));
    const fromUy = Math.max(0, Math.min(1, uy + dispY * p * 0.5));
    const toUx = Math.max(0, Math.min(1, ux - dispX * (1 - p) * 0.5));
    const toUy = Math.max(0, Math.min(1, uy - dispY * (1 - p) * 0.5));
    const [fromR, fromG, fromB] = sampleRgb48le(from, fromUx, fromUy, w, h);
    const [toR, toG, toB] = sampleRgb48le(to, toUx, toUy, w, h);
    const n = fbm(ux * 4 + 3.1, uy * 4 + 1.7);
    const blend = smoothstep(0.4, 0.6, n + p * 1.2 - 0.6);
    out.writeUInt16LE(clamp16(mix16(fromR, toR, blend)), o);
    out.writeUInt16LE(clamp16(mix16(fromG, toG, blend)), o + 2);
    out.writeUInt16LE(clamp16(mix16(fromB, toB, blend)), o + 4);
  }
};
TRANSITIONS["cross-warp-morph"] = crossWarpMorph;
var whipPan = (from, to, out, w, h, p) => {
  const fromOff = p * 1.5;
  const toOff = (1 - p) * 1.5;
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    let fromR = 0, fromG = 0, fromB = 0;
    for (let s = 0; s < 10; s++) {
      const f = s / 10;
      const fuv = Math.max(0, Math.min(1, ux + fromOff + p * 0.08 * f));
      const [r, g, b] = sampleRgb48le(from, fuv, uy, w, h);
      fromR += r;
      fromG += g;
      fromB += b;
    }
    fromR /= 10;
    fromG /= 10;
    fromB /= 10;
    let toR = 0, toG = 0, toB = 0;
    for (let s = 0; s < 10; s++) {
      const f = s / 10;
      const tuv = Math.max(0, Math.min(1, ux - toOff - (1 - p) * 0.08 * f));
      const [r, g, b] = sampleRgb48le(to, tuv, uy, w, h);
      toR += r;
      toG += g;
      toB += b;
    }
    toR /= 10;
    toG /= 10;
    toB /= 10;
    out.writeUInt16LE(clamp16(mix16(Math.round(fromR), Math.round(toR), p)), o);
    out.writeUInt16LE(clamp16(mix16(Math.round(fromG), Math.round(toG), p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(Math.round(fromB), Math.round(toB), p)), o + 4);
  }
};
TRANSITIONS["whip-pan"] = whipPan;
var cinematicZoom = (from, to, out, w, h, p) => {
  const fromS = p * 0.08;
  const toS = (1 - p) * 0.06;
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const dx = ux - 0.5;
    const dy = uy - 0.5;
    let fr = 0, fg = 0, fb = 0;
    for (let s = 0; s < 12; s++) {
      const f = s / 12;
      const rr = sampleRgb48le(
        from,
        ux - dx * fromS * 1.06 * f,
        uy - dy * fromS * 1.06 * f,
        w,
        h
      )[0];
      const gg = sampleRgb48le(from, ux - dx * fromS * f, uy - dy * fromS * f, w, h)[1];
      const bb = sampleRgb48le(
        from,
        ux - dx * fromS * 0.94 * f,
        uy - dy * fromS * 0.94 * f,
        w,
        h
      )[2];
      fr += rr;
      fg += gg;
      fb += bb;
    }
    fr /= 12;
    fg /= 12;
    fb /= 12;
    let tr = 0, tg = 0, tb = 0;
    for (let s = 0; s < 12; s++) {
      const f = s / 12;
      const rr = sampleRgb48le(to, ux + dx * toS * 1.06 * f, uy + dy * toS * 1.06 * f, w, h)[0];
      const gg = sampleRgb48le(to, ux + dx * toS * f, uy + dy * toS * f, w, h)[1];
      const bb = sampleRgb48le(to, ux + dx * toS * 0.94 * f, uy + dy * toS * 0.94 * f, w, h)[2];
      tr += rr;
      tg += gg;
      tb += bb;
    }
    tr /= 12;
    tg /= 12;
    tb /= 12;
    out.writeUInt16LE(clamp16(mix16(Math.round(fr), Math.round(tr), p)), o);
    out.writeUInt16LE(clamp16(mix16(Math.round(fg), Math.round(tg), p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(Math.round(fb), Math.round(tb), p)), o + 4);
  }
};
TRANSITIONS["cinematic-zoom"] = cinematicZoom;
var gravitationalLens = (from, to, out, w, h, p) => {
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const uvx = ux - 0.5;
    const uvy = uy - 0.5;
    const dist = Math.sqrt(uvx * uvx + uvy * uvy);
    const pull = p * 2;
    const warpStr = pull * 0.3 / (dist + 0.1);
    const warpedX = Math.max(0, Math.min(1, ux - uvx * warpStr));
    const warpedY = Math.max(0, Math.min(1, uy - uvy * warpStr));
    const [, ag] = sampleRgb48le(from, warpedX, warpedY, w, h);
    const horizon = smoothstep(0, 0.3, dist / (1 - p * 0.85 + 1e-3));
    const shift = pull * 0.02 / (dist + 0.2);
    const rSampX = Math.max(0, Math.min(1, ux - uvx * (warpStr + shift)));
    const rSampY = Math.max(0, Math.min(1, uy - uvy * (warpStr + shift)));
    const bSampX = Math.max(0, Math.min(1, ux - uvx * (warpStr - shift)));
    const bSampY = Math.max(0, Math.min(1, uy - uvy * (warpStr - shift)));
    const ar = sampleRgb48le(from, rSampX, rSampY, w, h)[0];
    const ab = sampleRgb48le(from, bSampX, bSampY, w, h)[2];
    const lensedR = Math.round(ar * horizon);
    const lensedG = Math.round(ag * horizon);
    const lensedB = Math.round(ab * horizon);
    const [toR, toG, toB] = sampleRgb48le(to, ux, uy, w, h);
    const blend = smoothstep(0.3, 0.9, p);
    out.writeUInt16LE(clamp16(mix16(lensedR, toR, blend)), o);
    out.writeUInt16LE(clamp16(mix16(lensedG, toG, blend)), o + 2);
    out.writeUInt16LE(clamp16(mix16(lensedB, toB, blend)), o + 4);
  }
};
TRANSITIONS["gravitational-lens"] = gravitationalLens;
var rippleWaves = (from, to, out, w, h, p) => {
  const accentBright = [65535, 55e3, 35e3];
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const uvx = ux - 0.5;
    const uvy = uy - 0.5;
    const dist = Math.sqrt(uvx * uvx + uvy * uvy);
    const nux = uvx + 1e-3;
    const nuy = uvy + 1e-3;
    const nlen = Math.sqrt(nux * nux + nuy * nuy);
    const dirx = nux / nlen;
    const diry = nuy / nlen;
    const fromAmp = p * 0.04;
    const fw1 = Math.exp(Math.sin(dist * 25 - p * 12) - 1);
    const fw2 = Math.exp(Math.sin(dist * 50 - p * 18) - 1) * 0.5;
    const fromUx = Math.max(0, Math.min(1, ux + dirx * (fw1 + fw2) * fromAmp));
    const fromUy = Math.max(0, Math.min(1, uy + diry * (fw1 + fw2) * fromAmp));
    const toAmp = (1 - p) * 0.04;
    const tw1 = Math.exp(Math.sin(dist * 25 + p * 12) - 1);
    const tw2 = Math.exp(Math.sin(dist * 50 + p * 18) - 1) * 0.5;
    const toUx = Math.max(0, Math.min(1, ux - dirx * (tw1 + tw2) * toAmp));
    const toUy = Math.max(0, Math.min(1, uy - diry * (tw1 + tw2) * toAmp));
    const [fromR, fromG, fromB] = sampleRgb48le(from, fromUx, fromUy, w, h);
    const [toR, toG, toB] = sampleRgb48le(to, toUx, toUy, w, h);
    const peak = fw1 * p;
    const tintR = accentBright[0] * peak * 0.1;
    const tintG = accentBright[1] * peak * 0.1;
    const tintB = accentBright[2] * peak * 0.1;
    out.writeUInt16LE(clamp16(mix16(Math.round(fromR + tintR), toR, p)), o);
    out.writeUInt16LE(clamp16(mix16(Math.round(fromG + tintG), toG, p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(Math.round(fromB + tintB), toB, p)), o + 4);
  }
};
TRANSITIONS["ripple-waves"] = rippleWaves;
var swirlVortex = (from, to, out, w, h, p) => {
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const uvx = ux - 0.5;
    const uvy = uy - 0.5;
    const dist = Math.sqrt(uvx * uvx + uvy * uvy);
    const warp = fbm(ux * 4, uy * 4) * 0.5;
    const fromAng = p * (1 - dist) * 10 + warp * p * 3;
    const fs = Math.sin(fromAng);
    const fc = Math.cos(fromAng);
    const fromUx = Math.max(0, Math.min(1, uvx * fc - uvy * fs + 0.5));
    const fromUy = Math.max(0, Math.min(1, uvx * fs + uvy * fc + 0.5));
    const toAng = -(1 - p) * (1 - dist) * 10 - warp * (1 - p) * 3;
    const ts = Math.sin(toAng);
    const tc = Math.cos(toAng);
    const toUx = Math.max(0, Math.min(1, uvx * tc - uvy * ts + 0.5));
    const toUy = Math.max(0, Math.min(1, uvx * ts + uvy * tc + 0.5));
    const [fromR, fromG, fromB] = sampleRgb48le(from, fromUx, fromUy, w, h);
    const [toR, toG, toB] = sampleRgb48le(to, toUx, toUy, w, h);
    out.writeUInt16LE(clamp16(mix16(fromR, toR, p)), o);
    out.writeUInt16LE(clamp16(mix16(fromG, toG, p)), o + 2);
    out.writeUInt16LE(clamp16(mix16(fromB, toB, p)), o + 4);
  }
};
TRANSITIONS["swirl-vortex"] = swirlVortex;
var thermalDistortion = (from, to, out, w, h, p) => {
  const accentBright = [65535, 55e3, 35e3];
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const heat = p * 1.5;
    const yFade = smoothstep(1, 0, uy);
    const shimmer = Math.sin(uy * 40 + fbm(ux * 6, uy * 6) * 8) * fbm(ux * 3 + 0, uy * 3 + p * 2);
    const dispX = shimmer * heat * 0.03 * yFade;
    const fromUx = Math.max(0, Math.min(1, ux + dispX));
    const [fromR, fromG, fromB] = sampleRgb48le(from, fromUx, uy, w, h);
    const invShimmer = Math.sin(uy * 40 + fbm(ux * 6 + 3, uy * 6 + 3) * 8) * fbm(ux * 3 + 3, uy * 3 + p * 2);
    const dispX2 = invShimmer * (1 - p) * 0.03 * yFade;
    const toUx = Math.max(0, Math.min(1, ux + dispX2));
    const [toR, toG, toB] = sampleRgb48le(to, toUx, uy, w, h);
    const haze = heat * yFade * 0.15 * (1 - p);
    out.writeUInt16LE(clamp16(mix16(fromR, toR, p) + Math.round(accentBright[0] * haze)), o);
    out.writeUInt16LE(clamp16(mix16(fromG, toG, p) + Math.round(accentBright[1] * haze)), o + 2);
    out.writeUInt16LE(clamp16(mix16(fromB, toB, p) + Math.round(accentBright[2] * haze)), o + 4);
  }
};
TRANSITIONS["thermal-distortion"] = thermalDistortion;
var domainWarp = (from, to, out, w, h, p) => {
  const accentDark = [25e3, 8e3, 2e3];
  const accentBright = [65535, 55e3, 35e3];
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const qx = fbm(ux * 3, uy * 3);
    const qy = fbm(ux * 3 + 5.2, uy * 3 + 1.3);
    const rx = fbm(ux * 3 + qx * 4 + 1.7, uy * 3 + qy * 4 + 9.2);
    const ry = fbm(ux * 3 + qx * 4 + 8.3, uy * 3 + qy * 4 + 2.8);
    const n = fbm(ux * 3 + rx * 2, uy * 3 + ry * 2);
    const warpDirX = (qx - 0.5) * 0.4;
    const warpDirY = (qy - 0.5) * 0.4;
    const aUx = Math.max(0, Math.min(1, ux + warpDirX * p));
    const aUy = Math.max(0, Math.min(1, uy + warpDirY * p));
    const bUx = Math.max(0, Math.min(1, ux - warpDirX * (1 - p)));
    const bUy = Math.max(0, Math.min(1, uy - warpDirY * (1 - p)));
    const [aR, aG, aB] = sampleRgb48le(from, aUx, aUy, w, h);
    const [bR, bG, bB] = sampleRgb48le(to, bUx, bUy, w, h);
    const e = smoothstep(p - 0.08, p + 0.08, n);
    const ed = Math.abs(n - p);
    const pStep = p >= 1 ? 1 : 0;
    const em = smoothstep(0.1, 0, ed) * (1 - pStep);
    const ecBlend = smoothstep(0, 0.1, ed);
    const ecR = accentDark[0] + (accentBright[0] - accentDark[0]) * (1 - ecBlend);
    const ecG = accentDark[1] + (accentBright[1] - accentDark[1]) * (1 - ecBlend);
    const ecB = accentDark[2] + (accentBright[2] - accentDark[2]) * (1 - ecBlend);
    out.writeUInt16LE(clamp16(mix16(bR, aR, e) + Math.round(ecR * em * 2)), o);
    out.writeUInt16LE(clamp16(mix16(bG, aG, e) + Math.round(ecG * em * 2)), o + 2);
    out.writeUInt16LE(clamp16(mix16(bB, aB, e) + Math.round(ecB * em * 2)), o + 4);
  }
};
TRANSITIONS["domain-warp"] = domainWarp;
function ridged(px, py) {
  let value = 0;
  let amplitude = 0.5;
  let x = px;
  let y = py;
  for (let i = 0; i < 5; i++) {
    value += amplitude * Math.abs(vnoise(x, y) * 2 - 1);
    const nx = ROT_A * x - ROT_B * y;
    const ny = ROT_B * x + ROT_A * y;
    x = nx * 2.02;
    y = ny * 2.02;
    amplitude *= 0.5;
  }
  return value;
}
var ridgedBurn = (from, to, out, w, h, p) => {
  const accent = [5e4, 25e3, 5e3];
  const accentDark = [25e3, 8e3, 2e3];
  const accentBright = [65535, 55e3, 35e3];
  for (let i = 0; i < w * h; i++) {
    const ux = i % w / w;
    const uy = Math.floor(i / w) / h;
    const o = i * 6;
    const [aR, aG, aB] = sampleRgb48le(from, ux, uy, w, h);
    const [bR, bG, bB] = sampleRgb48le(to, ux, uy, w, h);
    const n = ridged(ux * 4, uy * 4);
    const e = smoothstep(p - 0.04, p + 0.04, n);
    const heat = smoothstep(0.12, 0, Math.abs(n - p));
    const pStep = p >= 1 ? 1 : 0;
    const heatMasked = heat * (1 - pStep);
    let burnR = accentDark[0] + (accent[0] - accentDark[0]) * smoothstep(0, 0.25, heatMasked);
    let burnG = accentDark[1] + (accent[1] - accentDark[1]) * smoothstep(0, 0.25, heatMasked);
    let burnB = accentDark[2] + (accent[2] - accentDark[2]) * smoothstep(0, 0.25, heatMasked);
    const blend2 = smoothstep(0.25, 0.5, heatMasked);
    burnR = burnR + (accentBright[0] - burnR) * blend2;
    burnG = burnG + (accentBright[1] - burnG) * blend2;
    burnB = burnB + (accentBright[2] - burnB) * blend2;
    const blend3 = smoothstep(0.5, 1, heatMasked);
    burnR = burnR + (65535 - burnR) * blend3;
    burnG = burnG + (65535 - burnG) * blend3;
    burnB = burnB + (65535 - burnB) * blend3;
    const sparks = (vnoise(ux * 80, uy * 80) >= 0.92 ? 1 : 0) * heatMasked * 3;
    out.writeUInt16LE(
      clamp16(
        mix16(bR, aR, e) + Math.round(burnR * heatMasked * 3.5) + Math.round(accentBright[0] * sparks)
      ),
      o
    );
    out.writeUInt16LE(
      clamp16(
        mix16(bG, aG, e) + Math.round(burnG * heatMasked * 3.5) + Math.round(accentBright[1] * sparks)
      ),
      o + 2
    );
    out.writeUInt16LE(
      clamp16(
        mix16(bB, aB, e) + Math.round(burnB * heatMasked * 3.5) + Math.round(accentBright[2] * sparks)
      ),
      o + 4
    );
  }
};
TRANSITIONS["ridged-burn"] = ridgedBurn;

// ../producer/src/services/shaderTransitionWorker.ts
if (!parentPort) {
  console.warn("[shaderTransitionWorker] no parentPort; module loaded on main thread");
} else {
  parentPort.on("message", (msg) => {
    const { shader, bufferA, bufferB, output, width, height, progress } = msg;
    const bufA = Buffer.from(bufferA);
    const bufB = Buffer.from(bufferB);
    const out = Buffer.from(output);
    try {
      const fn = TRANSITIONS[shader] ?? crossfade;
      fn(bufA, bufB, out, width, height, progress);
      const reply = {
        ok: true,
        bufferA,
        bufferB,
        output
      };
      parentPort.postMessage(reply, [bufferA, bufferB, output]);
    } catch (err) {
      const reply = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        bufferA,
        bufferB,
        output
      };
      parentPort.postMessage(reply, [bufferA, bufferB, output]);
    }
  });
}
