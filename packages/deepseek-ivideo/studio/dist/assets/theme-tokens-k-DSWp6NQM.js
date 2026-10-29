const e="od-design-system-project/v1",s="kami",n="kami (紙 / 纸)",a="Editorial & Print",r="Bundled Open Design package for kami (紙 / 纸), derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},t={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},c="USAGE.md",i="components.manifest.json",l="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},O={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:t,usage:c,componentsManifest:i,importMode:l,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="kraken",f="Kraken",h="Fintech & Crypto",k="Bundled Open Design package for Kraken, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",g={type:"bundled",origin:"Open Design curated bundled fixture"},y={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},N={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},H={schemaVersion:m,id:p,name:f,category:h,description:k,source:g,files:y,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:N},K=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/kami/tokens.css
 *
 * Structured token bindings for "kami / 紙 / 纸" — a print-first
 * editorial system: warm parchment canvas, single ink-blue accent,
 * serif at one weight (500), no italic, no cool grays.
 *
 * This file pre-compiles the values described in \`DESIGN.md\` into
 * the schema shared with all OD design systems. Two paste paths:
 *
 *   1. Agents generating an artifact for kami should paste the
 *      :root block verbatim into the first <style> of the artifact,
 *      then reference everything via var(--*).
 *   2. The optional \`:root[lang="zh-CN"]\` and \`:root[lang="ja"]\`
 *      blocks below override --font-display / --font-body for
 *      Chinese and Japanese typesetting. Include them only when
 *      the artifact's <html lang="..."> matches; otherwise drop
 *      to keep the paste minimal.
 *
 * Schema notes (kami pushed the schema in five places — see comments
 * inline tagged "#Gap N" for the matching item in the design log):
 *   #Gap 1  — 4-level foreground ramp (--fg / --fg-2 / --muted / --meta)
 *   #Gap 2  — 3-level surface (--bg / --surface / --surface-warm)
 *   #Gap 3  — 2-level border (--border / --border-soft)
 *   #Gap 4  — accent-hover binds to value, not formula
 *   #Gap 5  — ring elevation as a first-class level (--elev-ring)
 *
 * Brand-specific extensions (NOT part of the shared schema, only in
 * kami because of print-fidelity needs — see DESIGN.md §2 "Tag tints"):
 *   --tag-bg-soft / --tag-bg-base / --tag-bg-strong  — solid-hex
 *   pre-blends of ink-blue over parchment, replacing rgba/color-mix
 *   tints because print renderers double-paint alpha fills.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels — #Gap 2) ────────────────────────────────
   * Warm parchment canvas; cards lift one half-shade brighter to
   * ivory; secondary interactive surfaces drop to warm-sand. Never
   * #ffffff anywhere — the cream tone *is* kami's identity.
   * \`--surface-warm\` is new in the shared schema; brands without a
   * tertiary surface tier should alias it to var(--surface). */
  --bg: #f5f4ed;            /* parchment — page background */
  --surface: #faf9f5;       /* ivory — cards, lifted containers */
  --surface-warm: #e8e6dc;  /* warm sand — default button bg, secondary surfaces */

  /* ─── Foreground ramp (4 levels — #Gap 1) ───────────────────────
   * kami's text uses four named levels — primary / secondary /
   * subtext / metadata. Cool blue-grays are forbidden everywhere;
   * each token below has the warm yellow-brown undertone (R ≈ G > B)
   * the brand requires.
   *
   * \`--fg-2\` and \`--meta\` are new in the shared schema; brands that
   * only differentiate two levels should alias these to var(--fg)
   * and var(--muted). */
  --fg: #141413;            /* near-black — primary text, slight olive warmth */
  --fg-2: #3d3d3a;          /* dark warm — secondary text, table headers */
  --muted: #504e49;         /* olive — subtext, captions */
  --meta: #6b6a64;          /* stone — tertiary, dates, metadata */

  /* ─── Border (2 levels — #Gap 3) ────────────────────────────────
   * Primary border for card edges and section dividers; soft border
   * for inner row separators that should not visually compete.
   * \`--border-soft\` is new in the shared schema; brands with one
   * border tier should alias it to var(--border). */
  --border: #e8e6dc;
  --border-soft: #e5e3d8;

  /* ─── Accent ─────────────────────────────────────────────────────
   * The single chromatic move. CTAs, section numbers, link text,
   * the left rule of a quote, the W500 weight in a metric. Hard
   * cap of ≤5% of any surface area (DESIGN.md §2). */
  --accent: #1b365d;        /* ink blue */
  --accent-on: #faf9f5;     /* ivory — fg when accent is the bg (NOT pure white) */
  --accent-light: #2d5a8a;  /* brighter variant — links on dark surfaces only */

  /* ─── Accent states (#Gap 4) ────────────────────────────────────
   * kami treats --accent-hover and --accent-active as VALUE
   * bindings, not formula derivations. Ink blue is already deep;
   * mixing further black makes hover invisible. The brand instead
   * expresses hover through elevation (whisper shadow) and keeps
   * the color identical. Active darkens slightly via a hand-picked
   * value, not a formula.
   *
   * Schema rule: every brand provides --accent-hover and
   * --accent-active. Default's brand uses a black-mix formula;
   * kami uses identity / hand-picked. Both satisfy the contract. */
  --accent-hover: var(--accent);                /* color-stable; hover via elevation */
  --accent-active: #142a48;                     /* hand-picked, ~12% darker ink */

  /* ─── Semantic ───────────────────────────────────────────────────
   * kami's DESIGN.md doesn't specify success/warn/danger because the
   * system is print-first and rarely renders status. We bind them to
   * desaturated warm hues that survive parchment without breaking
   * the "single chromatic move" rule. Use sparingly; kami artifacts
   * almost never need these. */
  --success: #4a6b3a;       /* warm forest — toned down for parchment */
  --warn: #8a6b1f;          /* burnt sienna */
  --danger: #8a3a30;        /* warm terracotta — never tailwind red */

  /* ─── Typography ─────────────────────────────────────────────────
   * Default to English Charter stack on :root. The \`:root[lang]\`
   * blocks below override for CN and JA. \`--font-body\` and
   * \`--font-display\` are equal — kami uses a single serif weight
   * (500) and lets size carry hierarchy.
   *
   * Sans is reserved for eyebrows, switchers, small labels — it
   * literally equals the serif stack, so there is no separate
   * sans token. */
  --font-display:
    Charter, Georgia, Palatino, "Times New Roman", serif;
  --font-body:
    Charter, Georgia, Palatino, "Times New Roman", serif;
  --font-mono:
    "JetBrains Mono", "SF Mono", "Fira Code", Consolas, Monaco,
    "TsangerJinKai02", "Source Han Serif SC", monospace;

  /* Type scale (px) — derived from DESIGN.md §3 hierarchy table.
   * kami runs lighter on the small end and heavier on the display
   * end than default's 12–64 — print rhythm needs both 11px captions
   * and 96px hero display.
   *
   * \`--text-md\` (15px) is a brand-specific extension — kami needs an
   * in-between size for ledes that the schema's --text-base (body)
   * and --text-lg (H3) ramp doesn't supply. Generic cross-brand
   * components must NOT reference --text-md; only kami's own
   * components.html consumes it. Promote to schema if a second
   * brand reports the same need. */
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base: 14px;        /* body — print-dense */
  --text-md: 15px;          /* brand-specific — lede / large body */
  --text-lg: 17px;          /* H3 */
  --text-xl: 22px;          /* H2 */
  --text-2xl: 32px;         /* section title */
  --text-3xl: 48px;         /* CJK display ceiling */
  --text-4xl: 96px;         /* EN hero / cover slide title */

  /* kami's line-height envelope is 1.10–1.55, narrower than default's */
  --leading-display: 1.1;   /* hero, H1, H2 */
  --leading-tight: 1.25;    /* section title */
  --leading-body: 1.55;     /* reading body */
  --leading-dense: 1.4;     /* resume / one-pager */

  /* Letter-spacing rules from DESIGN.md §3. EN body is 0; CN/JA
   * override below. Display tracking is negative (compresses
   * 96px hero); eyebrow tracking is positive (uppercase labels). */
  --tracking-display: -1.2px;   /* applied to 96px hero only */
  --tracking-eyebrow: 1.2px;    /* uppercase eyebrow / overline */
  --tracking-label: 0.4px;      /* small uppercase labels */

  /* ─── Spacing ────────────────────────────────────────────────────
   * kami is print-rooted; section gaps and card paddings come from
   * the layout grid in DESIGN.md §5, not the 4px web-grid that
   * default uses. We keep the same token names but rebind values
   * to kami's actual rhythm. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;          /* card interior */
  --space-8: 32px;
  --space-12: 48px;
  --space-18: 72px;         /* section gap (web) */
  --space-22: 88px;         /* page top padding (web) */

  /* Web page geometry (DESIGN.md §5) */
  --section-y-desktop: 72px;
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ─────────────────────────────────────────────────────
   * \`2px → 4px → 6px → 8px → 12px → 16px\` per DESIGN.md §6. Tags
   * sit at 2–4px; buttons and cards at 8px; featured at 12–16px. */
  --radius-xs: 2px;         /* tags */
  --radius-sm: 4px;         /* small chips */
  --radius-md: 8px;         /* default — buttons, cards */
  --radius-lg: 12px;        /* featured cards */
  --radius-xl: 16px;        /* hero containers */
  --radius-pill: 9999px;    /* avatars (rare) */

  /* ─── Elevation (3 levels — #Gap 5) ─────────────────────────────
   * kami forbids hard drop shadows. Three sanctioned levels:
   * flat / ring (1px hairline OR 1px brand ring) / whisper. The
   * shared schema gains \`--elev-ring\` so brands using ring shadows
   * as primary elevation (kami, paper, editorial) don't have to
   * rebind --elev-raised away from blur shadow.
   *
   * \`--elev-ring-accent\` is brand-specific — kami uses it as the
   * edge for primary buttons (\`box-shadow: var(--elev-ring-accent)\`
   * instead of border, to keep the rectangle perfectly aligned
   * with the fill). */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-ring-accent: 0 0 0 1px var(--accent); /* brand-specific */
  --elev-raised: 0 4px 24px rgba(0, 0, 0, 0.05);  /* whisper */

  /* ─── Focus ring ─────────────────────────────────────────────────
   * kami's focus is more restrained than default's — the brand
   * forbids cool-blue glows. We use a smaller ring with the active
   * variant of accent. */
  --focus-ring: 0 0 0 2px var(--accent-active);

  /* ─── Motion ─────────────────────────────────────────────────────
   * kami's hover is a 200ms whisper-shadow lift only — no transform,
   * no brightness shift. Two durations, one easing. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ─────────────────────────────────────────────────────
   * Web container: 1120px max, 64px gutter desktop. Print pages
   * have margin tokens specific to document type (resume / one-pager
   * / long-doc / letter / portfolio) — those live in the print
   * skill, not in this shared token block. */
  --container-max: 1120px;
  --container-gutter-desktop: 64px;
  --container-gutter-tablet: 32px;
  --container-gutter-phone: 16px;

  /* ─── Brand-specific: tag tint scale (#Gap 6) ────────────────────
   * Print renderers double-paint alpha fills. kami pre-blends ink
   * blue over parchment as solid hex at 5 effective alphas. These
   * tokens are NOT part of the shared schema; they live here only
   * because kami's rendering target needs them. Other brands tint
   * with \`color-mix(... transparent N%)\` inline. */
  --tag-bg-faint: #eef2f7;     /* ≈ ink at 0.08 */
  --tag-bg-soft: #e4ecf5;      /* ≈ ink at 0.18 — DEFAULT tag */
  --tag-bg-base: #d6e1ee;      /* ≈ ink at 0.30 */
  --tag-bg-strong: #d0dce9;    /* ≈ ink at 0.22, denser */
}

/* ─── i18n font overrides (#Gap 7) ──────────────────────────────────
 * Switch the dominant font stack based on the artifact's lang.
 * Apply ONLY ONE of these blocks — the one matching <html lang="...">
 * — and keep --font-mono on the EN stack since code labels stay Latin
 * regardless of the document language.
 *
 * For multi-language artifacts (e.g. a deck with one Japanese chapter),
 * keep the dominant stack on :root and scope the override on a
 * wrapper element instead:
 *
 *   section[lang="ja"] { --font-display: <JA stack>; ... }
 *
 * Do NOT chain all three font families inside a single font-family
 * declaration — that dilutes the visual character of every page.
 * ─────────────────────────────────────────────────────────────────── */

:root[lang="zh-CN"],
:root[lang="zh"] {
  --font-display:
    "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC",
    "Songti SC", "STSong", Georgia, serif;
  --font-body:
    "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC",
    "Songti SC", "STSong", Georgia, serif;
}

:root[lang="ja"] {
  --font-display:
    "YuMincho", "Yu Mincho", "Hiragino Mincho ProN",
    "Noto Serif CJK JP", "Source Han Serif JP",
    "TsangerJinKai02", Georgia, serif;
  --font-body:
    "YuMincho", "Yu Mincho", "Hiragino Mincho ProN",
    "Noto Serif CJK JP", "Source Han Serif JP",
    "TsangerJinKai02", Georgia, serif;
  /* JA needs the lighter olive override — YuMincho strokes are thinner
   * and the standard olive looks anemic against parchment. */
  --muted: #4d4c48;
}
`,j=`/* design-systems/kraken/tokens.css
 *
 * Structured token bindings for Kraken.
 * dark crypto exchange interface with violet signal, chart density, and confident controls.
 */

:root {
  --bg: #0b1020;
  --surface: #121a33;
  --surface-warm: #1b2450;
  --fg: #f8fafc;
  --fg-2: #cbd5e1;
  --muted: #8b95aa;
  --meta: #7d5cff;
  --border: #26314f;
  --border-soft: #1b2740;
  --accent: #7132f5;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #00c853;
  --warn: #ffb020;
  --danger: #ff4d6d;
  --font-display: "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "Roboto Mono", "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  --text-xl: 22px;
  --text-2xl: 30px;
  --text-3xl: 44px;
  --text-4xl: 60px;
  --leading-body: 1.48;
  --leading-tight: 1.08;
  --tracking-display: -0.015em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 88px;
  --section-y-tablet: 64px;
  --section-y-phone: 44px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 70px rgba(0, 0, 0, 0.42);
  --focus-ring: 0 0 0 4px rgba(113, 50, 245, 0.32);
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1280px;
  --container-gutter-desktop: 32px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,B=1,A="od-design-tokens/v1",S="TOKEN_SCHEMA",T="2026-06-06T00:00:00.000Z",C={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},G={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},_=JSON.parse('[{"name":"--bg","value":"#f5f4ed","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--bg"},{"name":"--surface","value":"#faf9f5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#e8e6dc","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#141413","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--fg"},{"name":"--fg-2","value":"#3d3d3a","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--fg-2"},{"name":"--muted","value":"#504e49","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--muted"},{"name":"--meta","value":"#6b6a64","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--meta"},{"name":"--border","value":"#e8e6dc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--border"},{"name":"--border-soft","value":"#e5e3d8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--border-soft"},{"name":"--accent","value":"#1b365d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--accent"},{"name":"--accent-on","value":"#faf9f5","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"var(--accent)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#142a48","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--accent-active"},{"name":"--success","value":"#4a6b3a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--success"},{"name":"--warn","value":"#8a6b1f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--warn"},{"name":"--danger","value":"#8a3a30","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--danger"},{"name":"--font-display","value":"Charter, Georgia, Palatino, \\"Times New Roman\\", serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--font-display"},{"name":"--font-body","value":"Charter, Georgia, Palatino, \\"Times New Roman\\", serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"JetBrains Mono\\", \\"SF Mono\\", \\"Fira Code\\", Consolas, Monaco, \\"TsangerJinKai02\\", \\"Source Han Serif SC\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:113"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--text-base"},{"name":"--text-lg","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:133"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:134"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:135"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:136"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.55","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.25","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-1.2px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:147"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:156"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:157"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:163"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:164"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"72px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:169"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:170"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:171"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:177"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:178"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:179"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:194"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:195"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 4px 24px rgba(0, 0, 0, 0.05)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:197"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px var(--accent-active)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:203"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:209"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:210"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1120px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:217"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:218"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:220"],"sourceName":"--container-gutter-phone"}]'),P={schemaVersion:B,format:A,contract:S,generatedAt:T,source:C,summary:G,tokens:_},E=1,M="od-design-tokens/v1",J="TOKEN_SCHEMA",D="2026-06-06T00:00:00.000Z",$={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},F={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},I=JSON.parse('[{"name":"--bg","value":"#0b1020","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#121a33","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1b2450","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8fafc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#cbd5e1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8b95aa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#7d5cff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#26314f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#1b2740","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#7132f5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#00c853","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#ffb020","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#ff4d6d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Inter\\", system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Roboto Mono\\", \\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"30px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.48","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.08","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.015em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"18px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 70px rgba(0, 0, 0, 0.42)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(113, 50, 245, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),z={schemaVersion:E,format:M,contract:J,generatedAt:D,source:$,summary:F,tokens:I};export{H as _,O as a,j as b,K as c,z as d,P as e};
