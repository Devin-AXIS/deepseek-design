import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parseAnimatedGifMetadata
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-M2WBOQ2Q.js";

// src/capture/assetCataloger.ts
async function catalogAssets(page) {
  const assets = await page.evaluate(`(() => {
    var assetMap = {};

    // Extract rich DOM context from any element (heading, section, position)
    function getElementContext(el) {
      var ctx = {};
      // Alt text, aria-label, figcaption
      var desc = el.alt || el.getAttribute('aria-label') || el.getAttribute('title') || '';
      var fig = el.closest('figure');
      if (fig) {
        var cap = fig.querySelector('figcaption');
        if (cap) desc = desc || cap.textContent.trim().slice(0, 100);
      }
      var ariaBy = el.getAttribute('aria-describedby');
      if (ariaBy) {
        var descEl = document.getElementById(ariaBy);
        if (descEl) desc = desc || descEl.textContent.trim().slice(0, 100);
      }
      if (desc) ctx.description = desc.slice(0, 150);
      // Nearest heading
      var section = el.closest('section, article, header, footer, main, [class*="hero"], [class*="banner"], [class*="feature"]');
      if (section) {
        var heading = section.querySelector('h1, h2, h3, h4');
        if (heading) ctx.nearestHeading = heading.textContent.trim().slice(0, 80);
        ctx.sectionClasses = (section.className || '').toString().slice(0, 120);
      }
      // Above fold?
      try {
        var rect = el.getBoundingClientRect();
        ctx.aboveFold = rect.top < window.innerHeight;
      } catch(e) {}
      // Structural logo-candidate signals: class-substring alone caught 0/32 SVGs on heygen.com.
      ctx.inBanner = el.closest('header, nav, [role="banner"]') !== null;
      var homeAnchor = el.closest('a[href]');
      if (homeAnchor) {
        var aHref = homeAnchor.getAttribute('href') || '';
        ctx.inHomeLink = aHref === '/' || aHref === '#' || aHref === './' ||
                         /^https?:\\/\\/[^/]+\\/?$/.test(aHref);
      }
      // Brand can be first ("HeyGen - Ideas"), last ("Ideas - HeyGen"), or colon-separated ("Vercel: Build").
      var titleParts = (document.title || '').split(/[-|\u2014:]/);
      if (desc) {
        for (var ti = 0; ti < titleParts.length; ti++) {
          var part = titleParts[ti].trim();
          if (part.length > 1 && part.length < 30 &&
              desc.toLowerCase().indexOf(part.toLowerCase()) !== -1) {
            ctx.matchesTitleBrand = true;
            break;
          }
        }
      }
      return ctx;
    }

    function add(url, type, context, notes, richCtx) {
      if (!url || url === '' || url.startsWith('data:') || url.startsWith('blob:') || url === 'about:blank') return;
      // Normalize URL
      try { url = new URL(url, document.baseURI).href; } catch(e) { return; }
      // Skip tiny inline data URIs but keep base64 SVGs
      if (url.length > 50000) return;
      // Filter tracking pixels and analytics
      var lurl = url.toLowerCase();
      if (lurl.indexOf('analytics.') > -1 || lurl.indexOf('adsct') > -1 || lurl.indexOf('pixel.') > -1 || lurl.indexOf('tracking.') > -1 || lurl.indexOf('pdscrb.') > -1 || lurl.indexOf('doubleclick') > -1 || lurl.indexOf('googlesyndication') > -1 || lurl.indexOf('facebook.com/tr') > -1 || lurl.indexOf('bat.bing') > -1 || lurl.indexOf('clarity.ms') > -1) return;
      if (lurl.indexOf('bci=') > -1 && lurl.indexOf('twpid=') > -1) return;
      if (lurl.indexOf('cachebust=') > -1 || lurl.indexOf('event_id=') > -1) return;
      // Filter CSS fragment references to SVG filter IDs (not real downloadable assets)
      if (url.indexOf('.css#') > -1) return;
      if (url.indexOf('.css%23') > -1) return;
      // Filter same-page fragment references like "https://site.com/#clip-1"
      try { var parsed = new URL(url); if (parsed.hash && parsed.pathname.length <= 1) return; } catch(e2) {}

      if (!assetMap[url]) {
        assetMap[url] = { url: url, type: type, contexts: [], notes: null };
      }
      var entry = assetMap[url];
      if (entry.contexts.indexOf(context) === -1) {
        entry.contexts.push(context);
      }
      if (notes && !entry.notes) {
        entry.notes = notes;
      }
      // Text fields: first-occurrence wins. Boolean signals: any positive sample wins.
      if (richCtx) {
        if (richCtx.description && !entry.description) entry.description = richCtx.description;
        if (richCtx.nearestHeading && !entry.nearestHeading) entry.nearestHeading = richCtx.nearestHeading;
        if (richCtx.sectionClasses && !entry.sectionClasses) entry.sectionClasses = richCtx.sectionClasses;
        if (richCtx.aboveFold !== undefined && entry.aboveFold === undefined) entry.aboveFold = richCtx.aboveFold;
        if (richCtx.inBanner) entry.inBanner = true;
        if (richCtx.inHomeLink) entry.inHomeLink = true;
        if (richCtx.matchesTitleBrand) entry.matchesTitleBrand = true;
      }
    }

    // \u2500\u2500 Images: <img src="..."> and <img srcset="..."> \u2500\u2500
    document.querySelectorAll('img[src]').forEach(function(img) {
      var notes = img.alt || img.getAttribute('aria-label') || null;
      var ctx = getElementContext(img);
      add(img.src, 'Image', 'img[src]', notes, ctx);
      if (img.srcset) {
        img.srcset.split(',').forEach(function(entry) {
          var u = entry.trim().split(/\\s+/)[0];
          if (u) add(u, 'Image', 'img[srcset]', notes, ctx);
        });
      }
    });

    // \u2500\u2500 Lazy-loaded images: data-src, data-lazy-src, data-original \u2500\u2500
    document.querySelectorAll('img[data-src], img[data-lazy-src], img[data-original], [data-background-image]').forEach(function(el) {
      var dataSrc = el.getAttribute('data-src') || el.getAttribute('data-lazy-src') || el.getAttribute('data-original') || el.getAttribute('data-background-image');
      if (dataSrc) add(dataSrc, 'Image', 'data-src', el.alt || el.getAttribute('aria-label') || null, getElementContext(el));
    });

    // \u2500\u2500 CSS background-image on divs (Framer, Webflow, etc.) \u2500\u2500
    document.querySelectorAll('div, section, [class*="hero"], [class*="card"], [class*="image"], [data-framer-background]').forEach(function(el) {
      var bg = getComputedStyle(el).backgroundImage;
      if (bg && bg !== 'none') {
        var match = bg.match(/url\\(["']?(https?:\\/\\/[^"')]+)["']?\\)/);
        if (match && match[1]) {
          add(match[1], 'Background', 'css url()', el.getAttribute('aria-label') || null, getElementContext(el));
        }
      }
    });

    // \u2500\u2500 Picture sources: <source srcset="..."> \u2500\u2500
    document.querySelectorAll('source[srcset]').forEach(function(src) {
      src.srcset.split(',').forEach(function(entry) {
        var u = entry.trim().split(/\\s+/)[0];
        if (u) add(u, 'Image', 'source[srcset]', null);
      });
    });

    // \u2500\u2500 Videos: <video src="..."> and <video poster="..."> \u2500\u2500
    document.querySelectorAll('video[src]').forEach(function(v) {
      add(v.src, 'Video', 'video[src]', null);
    });
    document.querySelectorAll('video source[src]').forEach(function(s) {
      add(s.src, 'Video', 'video source[src]', null);
    });
    document.querySelectorAll('video[poster]').forEach(function(v) {
      add(v.poster, 'Image', 'video[poster]', null);
    });

    // \u2500\u2500 Links: preload, icon, apple-touch-icon, stylesheet \u2500\u2500
    document.querySelectorAll('link[rel]').forEach(function(link) {
      var rel = link.rel.toLowerCase();
      var href = link.href;
      if (!href) return;

      if (rel.includes('preload')) {
        var asType = link.getAttribute('as') || '';
        if (asType === 'font') add(href, 'Font', 'link[rel="preload"]', null);
        else if (asType === 'image') add(href, 'Image', 'link[rel="preload"]', null);
        else if (asType === 'video') add(href, 'Video', 'link[rel="preload"]', null);
        else if (asType === 'style') add(href, 'Other', 'link[rel="preload"]', null);
        else add(href, 'Other', 'link[rel="preload"]', null);
      }
      if (rel.includes('icon')) add(href, 'Icon', 'link[rel="' + rel + '"]', null);
      if (rel === 'apple-touch-icon') add(href, 'Icon', 'link[rel="apple-touch-icon"]', null);
    });

    // \u2500\u2500 Meta: og:image, twitter:image \u2500\u2500
    document.querySelectorAll('meta[property="og:image"], meta[content][name="twitter:image"]').forEach(function(m) {
      var content = m.getAttribute('content');
      if (content) {
        var prop = m.getAttribute('property') || m.getAttribute('name') || '';
        add(content, 'Image', 'meta[' + prop + ']', null);
      }
    });

    // \u2500\u2500 CSS url() references from all stylesheets \u2500\u2500
    try {
      for (var i = 0; i < document.styleSheets.length; i++) {
        try {
          var sheet = document.styleSheets[i];
          var rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;
          for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            var cssText = rule.cssText || '';
            var urlMatches = cssText.match(/url\\(["']?([^"')]+)["']?\\)/g);
            if (urlMatches) {
              urlMatches.forEach(function(m) {
                var u = m.replace(/url\\(["']?/, '').replace(/["']?\\)/, '');
                if (u.startsWith('data:')) return;
                // Classify by file extension
                if (/\\.(woff2?|ttf|otf|eot)$/i.test(u)) {
                  add(u, 'Font', 'css url()', null);
                } else if (/\\.(png|jpg|jpeg|gif|webp|avif|svg)$/i.test(u)) {
                  add(u, 'Background', 'css url()', null);
                } else {
                  add(u, 'Other', 'css url()', null);
                }
              });
            }
          }
        } catch(e) { /* cross-origin stylesheet */ }
      }
    } catch(e) {}

    // \u2500\u2500 Inline style url() references \u2500\u2500
    document.querySelectorAll('[style]').forEach(function(el) {
      var style = el.getAttribute('style') || '';
      var urlMatches = style.match(/url\\(["']?([^"')]+)["']?\\)/g);
      if (urlMatches) {
        urlMatches.forEach(function(m) {
          var u = m.replace(/url\\(["']?/, '').replace(/["']?\\)/, '');
          if (u.startsWith('data:')) return;
          if (/\\.(woff2?|ttf|otf|eot)$/i.test(u)) {
            add(u, 'Font', 'html inline style url()', null);
          } else {
            add(u, 'Other', 'html inline style url()', null);
          }
        });
      }
    });

    return Object.values(assetMap);
  })()`);
  const raw = assets || [];
  return annotateGifAssetMetadata(deduplicateSrcsetVariants(raw));
}
function isGifUrl(url) {
  try {
    return new URL(url).pathname.toLowerCase().endsWith(".gif");
  } catch {
    return url.toLowerCase().split(/[?#]/, 1)[0]?.endsWith(".gif") ?? false;
  }
}
function appendNote(existing, note) {
  return existing ? `${existing}; ${note}` : note;
}
async function readAssetBytes(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15e3) });
    if (!response.ok) return null;
    const contentLength = response.headers.get("content-length");
    if (contentLength && Number.parseInt(contentLength, 10) > 25 * 1024 * 1024) return null;
    return new Uint8Array(await response.arrayBuffer());
  } catch {
    return null;
  }
}
async function annotateGifAssetMetadata(assets, readBytes = readAssetBytes) {
  return Promise.all(
    assets.map(async (asset) => {
      if (!isGifUrl(asset.url)) return asset;
      const bytes = await readBytes(asset.url);
      if (!bytes) return asset;
      const metadata = parseAnimatedGifMetadata(bytes);
      if (!metadata) return asset;
      if (!metadata.animated) {
        return {
          ...asset,
          notes: appendNote(asset.notes, "single-frame GIF")
        };
      }
      const loop = metadata.loopCount === 0 ? "loops forever" : metadata.loopCount == null ? "no loop metadata" : `loop count ${metadata.loopCount}`;
      return {
        ...asset,
        notes: appendNote(
          asset.notes,
          `animated GIF: ${metadata.frameCount} frames, ${metadata.durationSeconds.toFixed(3)}s, ${loop}`
        )
      };
    })
  );
}
function deduplicateSrcsetVariants(assets) {
  const byBase = /* @__PURE__ */ new Map();
  for (const a of assets) {
    let baseKey = a.url;
    try {
      const u = new URL(a.url);
      if (u.pathname.includes("_next/image") || u.searchParams.has("w")) {
        u.searchParams.delete("w");
        u.searchParams.delete("q");
        baseKey = u.toString();
      }
    } catch {
    }
    const existing = byBase.get(baseKey);
    if (existing) {
      for (const ctx of a.contexts) {
        if (!existing.contexts.includes(ctx)) {
          existing.contexts.push(ctx);
        }
      }
      if (a.notes && !existing.notes) {
        existing.notes = a.notes;
      }
      if (a.inBanner) existing.inBanner = true;
      if (a.inHomeLink) existing.inHomeLink = true;
      if (a.matchesTitleBrand) existing.matchesTitleBrand = true;
      const existingW = getWidthParam(existing.url);
      const newW = getWidthParam(a.url);
      if (newW > existingW) {
        existing.url = a.url;
      }
    } else {
      byBase.set(baseKey, { ...a, contexts: [...a.contexts] });
    }
  }
  return [...byBase.values()];
}
function getWidthParam(url) {
  try {
    const u = new URL(url);
    const w = u.searchParams.get("w");
    return w ? parseInt(w) : 0;
  } catch {
    return 0;
  }
}
export {
  annotateGifAssetMetadata,
  catalogAssets
};
