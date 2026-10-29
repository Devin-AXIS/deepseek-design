import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  isDegradableEvaluateTimeoutError
} from "./chunk-AWNBM3MZ.js";
import {
  ensureCaptureDirSync,
  writeCaptureFileSync
} from "./chunk-MRF4AMKD.js";
import "./chunk-M2WBOQ2Q.js";

// src/capture/screenshotCapture.ts
import { join } from "path";
var MAX_PLATE_HEIGHT_PX = 16384;
function pngHeight(buf) {
  if (buf.length < 24) return null;
  if (buf[12] !== 73 || buf[13] !== 72 || buf[14] !== 68 || buf[15] !== 82) return null;
  return (buf[20] << 24 | buf[21] << 16 | buf[22] << 8 | buf[23]) >>> 0;
}
async function captureFullPagePlate(page, screenshotsDir, budget = {}) {
  await page.evaluate(
    `document.querySelectorAll('*').forEach((el) => {
      const p = getComputedStyle(el).position;
      if (p === 'fixed' || p === 'sticky') {
        el.setAttribute('data-hf-plate-position', el.style.position || '');
        el.style.position = 'static';
      }
    })`
  );
  try {
    const docHeight = await page.evaluate(
      `Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)`
    );
    if (docHeight > MAX_PLATE_HEIGHT_PX) return null;
    if ((budget.remainingMs?.() ?? 1) <= 0) return null;
    const buffer = await page.screenshot({ type: "png", fullPage: true });
    const produced = pngHeight(buffer);
    if (produced != null && produced > MAX_PLATE_HEIGHT_PX) return null;
    writeCaptureFileSync(join(screenshotsDir, "full-page.png"), buffer);
    return "screenshots/full-page.png";
  } finally {
    try {
      await page.evaluate(
        `document.querySelectorAll('[data-hf-plate-position]').forEach((el) => {
          el.style.position = el.getAttribute('data-hf-plate-position');
          el.removeAttribute('data-hf-plate-position');
        })`
      );
    } catch {
    }
  }
}
async function captureScrollScreenshots(page, outputDir, budget = {}) {
  const screenshotsDir = join(outputDir, "screenshots");
  ensureCaptureDirSync(outputDir, screenshotsDir);
  const MAX_SCREENSHOTS = 20;
  const filePaths = [];
  if ((budget.remainingMs?.() ?? 1) <= 0) return filePaths;
  try {
    await page.evaluate(() => {
      const selectors = [
        // Cookie consent
        '[id*="cookie"] button[class*="accept"]',
        '[id*="cookie"] button[class*="agree"]',
        '[id*="cookie"] button[class*="allow"]',
        '[class*="cookie"] button[class*="accept"]',
        '[class*="consent"] button',
        // Generic close buttons on overlays/modals
        '[class*="banner"] [class*="close"]',
        '[class*="banner"] [class*="dismiss"]',
        '[class*="popup"] [class*="close"]',
        '[class*="modal"] [class*="close"]',
        '[class*="overlay"] [class*="close"]',
        // Common GDPR patterns — scoped under a cookie/consent/gdpr ancestor
        // so we don't click "Accept invitation" / "Accept terms" / etc. on
        // unrelated buttons elsewhere on the page.
        '[id*="cookie" i] button[id*="accept" i]',
        '[id*="consent" i] button[id*="accept" i]',
        '[id*="gdpr" i] button[id*="accept" i]',
        '[class*="cookie" i] button[class*="accept-all" i]',
        '[class*="cookie" i] button[class*="acceptAll" i]',
        '[class*="consent" i] button[class*="accept-all" i]',
        // Notification prompts
        'button[class*="decline"]',
        'button[class*="not-now"]',
        'button[class*="no-thanks"]'
      ];
      for (const sel of selectors) {
        try {
          const el = document.querySelector(sel);
          if (el) el.click();
        } catch {
        }
      }
      const SCAN_CAP = 5e3;
      const minWidth = window.innerWidth * 0.3;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      let visited = 0;
      let node = walker.nextNode();
      while (node && visited < SCAN_CAP) {
        visited++;
        const el = node;
        const rect = el.getBoundingClientRect();
        if (rect.height > 80 && rect.width > minWidth) {
          const tag = el.tagName;
          if (tag !== "HEADER" && tag !== "NAV" && !el.closest("header") && !el.closest("nav")) {
            const style = window.getComputedStyle(el);
            if ((style.position === "fixed" || style.position === "sticky") && style.zIndex !== "auto" && parseInt(style.zIndex) > 100) {
              el.style.display = "none";
            }
          }
        }
        node = walker.nextNode();
      }
    }).catch((err) => {
      if (isDegradableEvaluateTimeoutError(err)) {
        throw err;
      }
    });
    await new Promise((r) => setTimeout(r, 400));
    const scrollHeight = await page.evaluate(
      `Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)`
    );
    const viewportHeight = await page.evaluate(`window.innerHeight`);
    const step = Math.floor(viewportHeight * 0.7);
    const positions = [0];
    for (let y = step; y < scrollHeight - viewportHeight; y += step) {
      positions.push(y);
    }
    const lastPos = Math.max(0, scrollHeight - viewportHeight);
    if (positions[positions.length - 1] !== lastPos) {
      positions.push(lastPos);
    }
    let finalPositions = positions;
    if (positions.length > MAX_SCREENSHOTS) {
      finalPositions = [positions[0]];
      const stride = (positions.length - 1) / (MAX_SCREENSHOTS - 1);
      for (let i = 1; i < MAX_SCREENSHOTS - 1; i++) {
        finalPositions.push(positions[Math.round(i * stride)]);
      }
      finalPositions.push(positions[positions.length - 1]);
    }
    for (let i = 0; i < finalPositions.length; i++) {
      if ((budget.remainingMs?.() ?? 1) <= 0) break;
      await page.evaluate(`window.scrollTo(0, ${finalPositions[i]})`);
      await new Promise((r) => setTimeout(r, 400));
      const pct = Math.round(
        finalPositions[i] / Math.max(1, scrollHeight - viewportHeight) * 100
      );
      const filename = `scroll-${String(Math.min(pct, 100)).padStart(3, "0")}.png`;
      const filePath = join(screenshotsDir, filename);
      if ((budget.remainingMs?.() ?? 1) <= 0) break;
      const buffer = await page.screenshot({ type: "png" });
      writeCaptureFileSync(filePath, buffer);
      filePaths.push(`screenshots/${filename}`);
    }
    await page.evaluate(`window.scrollTo(0, 0)`);
    await new Promise((r) => setTimeout(r, 200));
    if ((budget.remainingMs?.() ?? 1) > 0) {
      const plate = await captureFullPagePlate(page, screenshotsDir, budget);
      if (plate) filePaths.push(plate);
    }
  } catch (err) {
    if (isDegradableEvaluateTimeoutError(err)) {
      throw err;
    }
  }
  return filePaths;
}
export {
  MAX_PLATE_HEIGHT_PX,
  captureFullPagePlate,
  captureScrollScreenshots,
  pngHeight
};
