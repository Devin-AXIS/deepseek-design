const e="od-design-system-project/v1",s="tesla",n="Tesla",a="Automotive",r="Bundled Open Design package for Tesla, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},t={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},c="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ps={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:t,usage:c,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="tetris",f="Tetris",h="Themed & Unique",k="Bundled Open Design package for Tetris, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",x="components.manifest.json",w="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},fs={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:x,importMode:w,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="theverge",T="The Verge",S="Media & Consumer",_="Bundled Open Design package for The Verge, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",$={type:"bundled",origin:"Open Design curated bundled fixture"},D={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},E="USAGE.md",M="components.manifest.json",I="normalized",G={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},F={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},hs={schemaVersion:N,id:A,name:T,category:S,description:_,source:$,files:D,usage:E,componentsManifest:M,importMode:I,craft:G,sourceFiles:F},C="od-design-system-project/v1",P="together-ai",j="Together AI",O="AI & LLM",z="Bundled Open Design package for Together AI, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",V={type:"bundled",origin:"Open Design curated bundled fixture"},U={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},R="USAGE.md",L="components.manifest.json",H="normalized",W={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},K={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ks={schemaVersion:C,id:P,name:j,category:O,description:z,source:V,files:U,usage:R,componentsManifest:L,importMode:H,craft:W,sourceFiles:K},J="od-design-system-project/v1",Z="tom-modern",q="Tom Modern Design",Y="Starter",Q="Editorial-technical design system. Neutral canvas, single vermillion accent, sharp corners, Geist typography, hard shadows, structured composition.",X={type:"bundled",origin:"https://github.com/Tom-Opencart/tom-modern-html-style-rule"},ee={design:"DESIGN.md",tokens:"tokens.css",components:"components.html"},ys={schemaVersion:J,id:Z,name:q,category:Y,description:Q,source:X,files:ee},se="od-design-system-project/v1",ne="totality-festival",ae="Totality Festival",re="Themed & Unique",oe="Bundled Open Design package for Totality Festival, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",te={type:"bundled",origin:"Open Design curated bundled fixture"},ce={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},le="USAGE.md",ie="components.manifest.json",de="normalized",ue={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},me={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},gs={schemaVersion:se,id:ne,name:ae,category:re,description:oe,source:te,files:ce,usage:le,componentsManifest:ie,importMode:de,craft:ue,sourceFiles:me},pe="od-design-system-project/v1",fe="trading-terminal",he="Trading Terminal Design System",ke="Themed & Unique",ye="Bundled Open Design package for Trading Terminal Design System, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",ge={type:"bundled",origin:"Open Design curated bundled fixture"},be={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},xe="USAGE.md",we="components.manifest.json",ve="normalized",Be={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},Ne={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},bs={schemaVersion:pe,id:fe,name:he,category:ke,description:ye,source:ge,files:be,usage:xe,componentsManifest:we,importMode:ve,craft:Be,sourceFiles:Ne},xs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/tesla/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Tesla" —
 * radical subtraction, full-viewport photography, near-zero UI. This
 * file is the *machine-readable* form of the values described in
 * \`DESIGN.md\`. Agents are expected to paste the \`:root { … }\` block
 * verbatim into the first \`<style>\` of every artifact they generate
 * against this design system, then reference everything via
 * var(--name) from then on.
 *
 * Why this file exists:
 *   DESIGN.md tells humans that Tesla uses "Pure White (#FFFFFF) as the
 *   canvas that lets photography breathe" and "Electric Blue (#3E6AE1)
 *   as the only chromatic color in the entire interface", but agents
 *   have to translate those prose names into the standard token names
 *   the lint enforces (\`--bg\`, \`--accent\`). That translation step is
 *   where token misuse happens. This file pre-translates the brand
 *   once, so agents copy structure instead of inventing it.
 *
 * Brand-specific schema decisions (non-obvious bindings worth flagging
 * for reviewers and downstream brand authors):
 *   1. --bg is pure #ffffff and --surface is Light Ash #f4f4f4 — the
 *      "barely perceptible shift from pure white" Tesla uses to
 *      differentiate alternate feature bands. --surface-warm aliases
 *      to var(--surface): Tesla deliberately has only two light tiers
 *      because photography (not surface) carries the visual richness.
 *   2. The four-stop foreground ramp is real and worth keeping
 *      independent — Carbon Dark → Graphite → Pewter → Silver Fog map
 *      cleanly onto --fg / --fg-2 / --muted / --meta. DESIGN.md §2
 *      names every stop; collapsing any of them would flatten the
 *      hierarchy of headings → body → tertiary links → placeholders.
 *   3. --border is bound to Pale Silver (#d0d1d2) for the rare strong
 *      border, --border-soft to Cloud Gray (#eeeeee) for the more
 *      common hairline divider. Tesla uses borders sparingly but the
 *      two-stop split exists in DESIGN.md §2.
 *   4. --accent-hover / --accent-active use the schema black-mix
 *      formulas. DESIGN.md §4 says "subtle darkening of blue
 *      background" without pinning a hex; the schema defaults satisfy
 *      "subtle" without inventing a brand-specific value.
 *   5. Semantic --success / --warn / --danger inherit schema defaults
 *      verbatim. DESIGN.md §2: "Tesla's marketing site avoids semantic
 *      color coding... Error, success, and warning states follow
 *      standard browser defaults in form contexts."
 *   6. --font-display and --font-body are split across the Universal
 *      Sans Display / Universal Sans Text families with -apple-system
 *      and Arial as the published Tesla fallback chain (DESIGN.md §3).
 *   7. --text-base is 14px (NOT the 16px web norm). Tesla's UI
 *      explicitly clusters at 14 for nav, body, button, and link —
 *      DESIGN.md §3 lists six rows at 14px and only two breakaway
 *      tiers (22px promo, 40px hero). Rebinding --text-base to 16
 *      would lose the brand's engineered uniformity.
 *   8. --text-4xl is 40px — Tesla's hard display ceiling. DESIGN.md §7
 *      ("Don't use text larger than 40px on the web") makes this not
 *      a soft cap but an identity rule.
 *   9. --tracking-display is \`normal\`. DESIGN.md §3 Principles:
 *      "'Normal' letter-spacing everywhere... Unlike most modern tech
 *      brands that use negative tracking for headlines, Tesla uses
 *      default letter-spacing at every level." Most brands in the
 *      schema bind a negative em value here; Tesla deliberately does
 *      not.
 *  10. --section-y-desktop is 120px (vs schema default 80, Apple 100).
 *      DESIGN.md §1 + §5 — "viewport-height sections" and "whitespace
 *      as a luxury signal" mean Tesla's chapter breathing room is the
 *      most generous in the schema after the dedicated print brands.
 *  11. --radius-sm / --radius-md / --radius-lg are 4 / 12 / 12 (vs
 *      schema 8 / 12 / 16). DESIGN.md §5 defines a deliberate Tesla
 *      radius scale: 0 default, 4 buttons, 12 category cards, and
 *      "no larger tier" — we bind --radius-lg to the same 12 because
 *      Tesla has no softer card silhouette to address.
 *  12. --elev-raised is the lightest in the schema (rgba 0.05).
 *      DESIGN.md §6: "Tesla's approach to elevation is essentially
 *      'none.'... Subtle shadow hints on rare hover states use
 *      rgba(0,0,0,0.05)." The schema default (oklab fg-mix) reads as
 *      Material weight by comparison; we hand-pick a flatter value.
 *  13. --motion-fast / --motion-base / --ease-standard override the
 *      schema. DESIGN.md §1 + §4 — "0.33s cubic-bezier transitions as
 *      the universal timing for all interactive state changes" and a
 *      documented \`box-shadow 0.33s cubic-bezier(0.5, 0, 0, 0.75)\`
 *      curve. We bind base to 330ms (Tesla's universal duration),
 *      fast to 250ms (the box-shadow micro-state), and easing to the
 *      published Tesla text-link curve.
 *  14. --container-max is 1383px. DESIGN.md §5: "Max width:
 *      approximately 1383px". The number itself is a brand-specific
 *      detail (most marketing sites round to 1280 / 1440); we keep
 *      the literal value rather than collapse to the nearest round
 *      number.
 *
 * Contract sources:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *       (TOKEN_SCHEMA — every name below appears there or as an
 *        explicit B-slot alias.)
 *   - A2 fallback values: design-systems/_schema/defaults.css
 *       (We override --motion-fast, --motion-base, --ease-standard,
 *        --elev-raised, --radius-sm, --radius-lg; the rest match
 *        defaults.)
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the shared schema.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (2 levels) ──────────────────────────────────────────
   * Pure white retail canvas with a single "barely perceptible" Light
   * Ash tier for alternate bands. --surface-warm aliases to surface
   * because Tesla has no third light tier — photography, not surface,
   * carries the visual richness. */
  --bg: #ffffff;                  /* Pure White — the canvas that lets photography breathe */
  --surface: #f4f4f4;             /* Light Ash — alternate feature band, barely a shift */
  --surface-warm: var(--surface); /* alias — Tesla has only two light tiers */

  /* ─── Foreground ramp (4 levels) ─────────────────────────────────
   * Tesla's neutrals are explicitly named in DESIGN.md §2: Carbon Dark
   * → Graphite → Pewter → Silver Fog. We bind all four — the ramp is
   * genuinely walked across model names (Carbon Dark), body copy
   * (Graphite), tertiary "Learn / Order" links (Pewter), and form
   * placeholders / disabled (Silver Fog). Collapsing any stop would
   * flatten the hierarchy. */
  --fg: #171a20;                  /* Carbon Dark — headings, nav, model names */
  --fg-2: #393c41;                /* Graphite — default body / paragraph color */
  --muted: #5c5e62;               /* Pewter — tertiary links (Learn, Order, Experience) */
  --meta: #8e8e8e;                /* Silver Fog — placeholders, disabled states */

  /* ─── Border (2 levels) ──────────────────────────────────────────
   * Tesla uses borders sparingly — containers are usually defined by
   * spacing, not lines (DESIGN.md §7: "Don't add borders to cards or
   * containers"). When borders appear, --border is the stronger
   * delineation (Pale Silver, used on rare hairlines and field
   * outlines) and --border-soft is the lighter divider (Cloud Gray,
   * used between dense rows). */
  --border: #d0d1d2;              /* Pale Silver — strong border, field outline */
  --border-soft: #eeeeee;         /* Cloud Gray — light divider between rows */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Electric Blue — Tesla's only chromatic move. DESIGN.md §2: "stands
   * alone as the only chromatic color in the entire interface" and §7
   * "Don't use more than one chromatic color besides the blue CTA"
   * make this a strict one-color brand. The schema's ≤2-visible-uses
   * cap aligns naturally with Tesla's "Use Electric Blue exclusively
   * for primary CTAs". */
  --accent: #3e6ae1;              /* Electric Blue — sole CTA color, sole accent */
  --accent-on: #ffffff;           /* white label on the blue fill */

  /* ─── Accent states ───────────────────────────────────────────────
   * DESIGN.md §4 documents "subtle darkening of blue background" on
   * hover without pinning specific hex values. We inherit the schema
   * black-mix formulas — subtle darkening is exactly what these
   * formulas produce. */
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * DESIGN.md §2: "Tesla's marketing site avoids semantic color coding
   * (no green/red/yellow status indicators). Error, success, and
   * warning states follow standard browser defaults in form contexts."
   * Inherit the schema defaults; reserve under 5% of any surface area
   * regardless. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ──────────────────────────────────────────────────
   * Universal Sans Display / Universal Sans Text — the custom family
   * that replaced Gotham to unify Tesla's website, mobile app, and
   * vehicle interface. We mirror the published Tesla fallback chain
   * (-apple-system, Arial) so artifacts rendered on non-Tesla clients
   * land on the closest practical substitute. */
  --font-display: "Universal Sans Display", -apple-system, Arial, sans-serif;
  --font-body: "Universal Sans Text", -apple-system, Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale (px) — derived from DESIGN.md §3 hierarchy table.
   * Tesla's reading baseline is 14px (NOT the 16px web norm); nav,
   * body, button, sub-link all sit at 14. Only two tiers break away
   * upward — 22px promo and 40px hero — and DESIGN.md §7 hard-caps
   * web text at 40px ("Don't use text larger than 40px on the web").
   * The 28px mid-display tier honors the §8 mobile hero scale
   * ("hero text scales to ~28px"). */
  --text-xs: 11px;                /* micro — fine print below the 14px baseline */
  --text-sm: 12px;                /* small UI labels */
  --text-base: 14px;              /* Tesla's reading baseline (nav, body, button, link) */
  --text-lg: 16px;                /* Category Label — white text on category cards */
  --text-xl: 17px;                /* Product Name — model names in nav panel and cards */
  --text-2xl: 22px;               /* Promo Text — "0% APR Available" on hero */
  --text-3xl: 28px;               /* mid display — mobile hero scale */
  --text-4xl: 40px;               /* Hero Title — Tesla's hard display ceiling */

  /* DESIGN.md §3 hierarchy table: hero 40/48 (1.20), body 14/20
   * (1.43). Two values for the whole system — Tesla's leading
   * envelope is as restrained as its weight set. */
  --leading-body: 1.43;           /* SF Pro Text body, 17px */
  --leading-tight: 1.20;          /* Hero Title 40/48 */

  /* DESIGN.md §3 Principles: "'Normal' letter-spacing everywhere.
   * Unlike most modern tech brands that use negative tracking for
   * headlines, Tesla uses default letter-spacing at every level."
   * Most schema brands bind a negative em value here; Tesla
   * deliberately does not. */
  --tracking-display: normal;

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 8px base grid (DESIGN.md §5). Schema defaults match Tesla's scale
   * exactly — no overrides needed. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* ─── Section rhythm ──────────────────────────────────────────────
   * Tesla uses viewport-height sections (DESIGN.md §1 §5) and
   * whitespace as a luxury signal. Token-level padding is the most
   * generous in the schema — 120 desktop is 50% wider than the schema
   * default (80) and 20% wider than Apple's 100. The full-viewport
   * 100vh rhythm itself lives in components. */
  --section-y-desktop: 120px;
  --section-y-tablet: 72px;
  --section-y-phone: 48px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * DESIGN.md §5 documents Tesla's deliberate three-stop scale:
   *   0px most elements (sharp default)
   *   4px buttons (primary, secondary, nav items)
   *   ~12px category cards (the largest sanctioned rounding)
   *   50% carousel dots
   *
   * We bind --radius-sm to 4 (buttons), --radius-md to 12 (category
   * cards), and --radius-lg to 12 as well — Tesla has no softer card
   * tier beyond category. The schema's 16px lg default would invent a
   * silhouette Tesla never uses. Pill stays at 9999 for dots / chips. */
  --radius-sm: 4px;               /* buttons — "barely perceptible rounding" */
  --radius-md: 12px;              /* category cards — the largest sanctioned */
  --radius-lg: 12px;              /* same — Tesla has no third radius tier */
  --radius-pill: 9999px;          /* carousel dots, badges */

  /* ─── Elevation ───────────────────────────────────────────────────
   * DESIGN.md §6: "Tesla's approach to elevation is essentially
   * 'none.'" Three sanctioned levels but flatter than any other
   * schema brand:
   *   - flat   → none (the default; photography carries depth)
   *   - ring   → 0 0 0 1px var(--border) (rare border-led containment)
   *   - raised → 0 2px 8px rgba(0,0,0,0.05) (DESIGN.md §6 Level 3
   *              "Subtle" — minimal shadow hints on rare hover states)
   *
   * The schema default oklab-mix raised reads as Material weight by
   * comparison; Tesla flattens it to the lightest credible value. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 2px 8px rgba(0, 0, 0, 0.05);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Electric Blue ring at the accent — Tesla's single chromatic
   * signal doubles as the focus halo. Schema default formula is
   * already the correct color through var(--accent). */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ──────────────────────────────────────────────────────
   * DESIGN.md §1 §4 — "0.33s cubic-bezier transitions as the
   * universal timing for all interactive state changes." The
   * documented Tesla Text Link curve is cubic-bezier(0.5, 0, 0,
   * 0.75); we bind that as --ease-standard.
   *   - fast → 250ms (the box-shadow micro-state from §4)
   *   - base → 330ms (Tesla's universal 0.33s)
   *
   * No brand in the schema runs base this slow; Tesla's "consistency
   * in motion is as important as consistency in color" (DESIGN.md §7)
   * earns the override. */
  --motion-fast: 250ms;
  --motion-base: 330ms;
  --ease-standard: cubic-bezier(0.5, 0, 0, 0.75);

  /* ─── Layout ──────────────────────────────────────────────────────
   * DESIGN.md §5: "Max width: approximately 1383px (full viewport
   * width used for most content)." We keep the literal value rather
   * than collapse to a rounder number — the figure itself is a Tesla
   * artifact. Gutters step 24 → 16 → 12 on a clean 8px scale; mobile
   * keeps horizontal padding tight so photography stays full-bleed. */
  --container-max: 1383px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,ws=`/* design-systems/tetris/tokens.css
 *
 * Structured token bindings for Tetris.
 * arcade grid system with black board surfaces and bright geometric block colors.
 */

:root {
  --bg: #050816;
  --surface: #10162a;
  --surface-warm: #17203a;
  --fg: #f8fafc;
  --fg-2: #cbd5e1;
  --muted: #94a3b8;
  --meta: #00f0f0;
  --border: #26324f;
  --border-soft: #1c2740;
  --accent: #00f0f0;
  --accent-on: #061018;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #00f000;
  --warn: #f0f000;
  --danger: #f00000;
  --font-display: "Press Start 2P", "Arial Black", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "Press Start 2P", ui-monospace, monospace;
  --text-xs: 10px;
  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 28px;
  --text-3xl: 40px;
  --text-4xl: 56px;
  --leading-body: 1.6;
  --leading-tight: 1.1;
  --tracking-display: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 80px;
  --section-y-tablet: 60px;
  --section-y-phone: 44px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 4px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 18px 0 rgba(0, 0, 0, 0.32);
  --focus-ring: 0 0 0 4px rgba(0, 240, 240, 0.32);
  --motion-fast: 80ms;
  --motion-base: 140ms;
  --ease-standard: steps(2, end);
  --container-max: 1100px;
  --container-gutter-desktop: 32px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,vs=`/* design-systems/theverge/tokens.css
 *
 * Structured token bindings for The Verge.
 * high-energy technology magazine with black surfaces, magenta signal, and dense editorial cards.
 */

:root {
  --bg: #050505;
  --surface: #111111;
  --surface-warm: #211022;
  --fg: #ffffff;
  --fg-2: #e5e7eb;
  --muted: #9ca3af;
  --meta: #ff00a8;
  --border: #2b2b2b;
  --border-soft: #1d1d1d;
  --accent: #ff00a8;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #22c55e;
  --warn: #facc15;
  --danger: #ef4444;
  --font-display: "PolySans", "Helvetica Neue", Arial, sans-serif;
  --font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 19px;
  --text-xl: 26px;
  --text-2xl: 42px;
  --text-3xl: 66px;
  --text-4xl: 96px;
  --leading-body: 1.48;
  --leading-tight: 0.95;
  --tracking-display: -0.035em;
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
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 70px rgba(255, 0, 168, 0.12);
  --focus-ring: 0 0 0 4px rgba(255, 0, 168, 0.30);
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1240px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 28px;
  --container-gutter-phone: 18px;
}
`,Bs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/together-ai/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Together AI".
 * Pastel-gradient dreamscape for enterprise AI infrastructure: airy
 * optimism meets technical precision, dual light/dark world approach.
 *
 * Key brand decisions encoded here:
 *   - Pure white light sections; Deep midnight blue (#010120) for dark sections
 *   - "The Future" font with aggressive negative tracking throughout
 *   - PP Neue Montreal Mono for uppercase section labels — technical taste
 *   - Sharp geometry (4px, 8px) — never pill, never generous rounding
 *   - Dark-blue-tinted shadows (rgba(1,1,32,0.1)) — ties to brand midnight
 *   - Brand Magenta (#ef2cc1) + Orange (#fc4c02) for illustrations ONLY
 *   - Lavender (#bdbbff) as a soft secondary UI accent
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Pure white for the light "business" world. Dark blue sections
   * (the research/technical world) are applied as section overrides
   * in components, not as the base --bg token. */
  --bg: #ffffff;
  --surface: #ffffff;        /* Cards on white — subtle glass tint in components */
  --surface-warm: var(--surface); /* no warm tier — system uses cool/neutral palette */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Pure black on light; aliased to white on dark sections via component
   * overrides. The soft lavender muted provides a gentle secondary tint. */
  --fg: #000000;             /* Pure Black on light surfaces */
  --fg-2: rgba(0, 0, 0, 0.6); /* Black 40 — de-emphasized secondary text */
  --muted: #666666;          /* Approximated from Black 40 on white for readability */
  --meta: var(--muted);      /* alias */

  /* ─── Border ──────────────────────────────────────────────────────
   * Semi-transparent borders using rgba — together with the dark blue
   * shadow they give a "glass on white" quality to containment. */
  --border: #ebebeb;         /* ≈ rgba(0,0,0,0.08) on white — subtle containment */
  --border-soft: var(--border); /* alias — single border tier for light sections */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Dark Blue (#010120) as the primary CTA — it IS the dark world's
   * surface color, making CTAs feel grounded in the brand universe.
   * Brand Magenta and Orange are illustration-only; never use as --accent. */
  --accent: #010120;         /* Dark Blue — primary CTA on light surfaces */
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), white 8%);  /* lighten the dark */
  --accent-active: color-mix(in oklab, var(--accent), white 16%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Standard semantic palette against the clean white light world. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ──────────────────────────────────────────────────
   * "The Future" for all display and body — negative tracking throughout.
   * PP Neue Montreal Mono for uppercase technical labels and markers.
   * Weight range: 400 (regular) and 500 (medium) — NO bold.
   * Tight line-heights (1.25–1.30) create a dense, information-rich feel. */
  --font-display: "The Future", Arial, ui-sans-serif, sans-serif;
  --font-body: "The Future", Arial, ui-sans-serif, sans-serif;
  --font-mono: "PP Neue Montreal Mono", Georgia, ui-monospace, monospace;

  /* Type scale — DESIGN.md §3. 64px display, 40px section, 28px sub. */
  --text-xs: 10px;           /* Mono Micro — smallest uppercase labels */
  --text-sm: 14px;           /* Caption — metadata, descriptions */
  --text-base: 16px;         /* Body / Button / Nav */
  --text-lg: 18px;           /* Body Large — descriptions, sections */
  --text-xl: 22px;           /* Feature Title */
  --text-2xl: 28px;          /* Sub-heading */
  --text-3xl: 40px;          /* Section Heading */
  --text-4xl: 64px;          /* Display / Hero — maximum impact */

  --leading-body: 1.3;       /* Dense, information-rich feel — tighter than typical */
  --leading-tight: 1.0;      /* Ultra-tight at display scale */
  --tracking-display: -0.03em; /* ≈ -1.92px at 64px — always negative on The Future */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * Generous section spacing (80–120px) for optimistic breathing room. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --section-y-desktop: 80px;
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Sharp geometry — never pill, never generous rounding.
   * This deliberately contrasts with the soft pastel gradients,
   * creating "technical infrastructure company with taste." */
  --radius-sm: 4px;          /* Badges, buttons, tags, small interactive */
  --radius-md: 8px;          /* Larger containers, feature cards */
  --radius-lg: 8px;          /* Same — no large roundness */
  --radius-pill: 9999px;     /* Declared but should not be used in Together AI */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Dark-blue-tinted shadow — the subtle blue cast ties elevated
   * elements to the brand's midnight-blue dark mode. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: rgba(1, 1, 32, 0.1) 0px 4px 10px; /* Brand midnight blue shadow */

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Dark blue focus ring consistent with the CTA color. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Standard — Together AI's energy is in the gradient illustrations,
   * not animation velocity. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1200px container, centered. Hero has centered pastel gradient bg. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,Ns=`/* Tom Modern Design System — tokens.css */
/* Source: https://github.com/Tom-Opencart/tom-modern-html-style-rule */

:root {
  /* ─── Surface ──────────────────────────────────────────────────── */
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-warm: var(--surface);

  /* ─── Foreground ───────────────────────────────────────────────── */
  --fg: #27272a;
  --fg-2: #52525b;
  --muted: #71717a;
  --meta: var(--muted);

  /* ─── Border ───────────────────────────────────────────────────── */
  --border: #969696;
  --border-soft: #d4d4d8;

  /* ─── Accent ───────────────────────────────────────────────────── */
  --accent: #ff5a00;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ─────────────────────────────────────────────────── */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ───────────────────────────────────────────────── */
  --font-display: 'Geist Sans', 'Geist', system-ui, -apple-system, sans-serif;
  --font-body: 'Geist Sans', 'Geist', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Type scale */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 18px;
  --text-xl: 22px;
  --text-2xl: 28px;
  --text-3xl: 38px;
  --text-4xl: 48px;

  --leading-body: 1.65;
  --leading-tight: 0.96;
  --tracking-display: -0.04em;

  /* ─── Spacing ──────────────────────────────────────────────────── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* ─── Section rhythm ───────────────────────────────────────────── */
  --section-y-desktop: 96px;
  --section-y-tablet: 64px;
  --section-y-phone: 48px;

  /* ─── Radius ───────────────────────────────────────────────────── */
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-pill: 0px;

  /* ─── Elevation ────────────────────────────────────────────────── */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 4px 4px 0 rgba(150, 150, 150, 0.1);

  /* ─── Focus ────────────────────────────────────────────────────── */
  --focus-ring: 0 0 0 2px var(--accent);

  /* ─── Motion ───────────────────────────────────────────────────── */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ───────────────────────────────────────────────────── */
  --container-max: 1240px;
  --container-gutter-desktop: 20px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;

  /* ─── Brand-specific extensions ────────────────────────────────── */
  --tm-accent-soft: rgba(255, 90, 0, 0.08);
  --tm-shadow-hard: 8px 8px 0 rgba(150, 150, 150, 0.12);
  --tm-shadow-soft: 4px 4px 0 rgba(150, 150, 150, 0.1);
  --tm-shadow-code: 0 28px 90px rgba(22, 22, 22, 0.14);
  --tm-header-height: 82px;
  --tm-code-bg: #111517;
  --tm-code-panel: #151a1d;
  --tm-code-text: #d8dee9;
}
`,As=`/* design-systems/totality-festival/tokens.css
 * Structured token bindings for Totality Festival.
 * festival identity with cosmic dark surfaces, warm highlights, and event-program cards.
 */

:root {
  --bg: #070711;
  --surface: #111126;
  --surface-warm: #1e1540;
  --fg: #f8f7ff;
  --fg-2: #d6ccff;
  --muted: #9d8ad4;
  --meta: #c084fc;
  --border: #34265e;
  --border-soft: #241c42;
  --accent: #c084fc;
  --accent-on: #13051f;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #39ff88;
  --warn: #fff34d;
  --danger: #ff4d8d;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 36px;
  --text-3xl: 54px;
  --text-4xl: 76px;
  --leading-body: 1.52;
  --leading-tight: 1.06;
  --tracking-display: -0.025em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 96px;
  --section-y-tablet: 68px;
  --section-y-phone: 48px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 80px rgba(192, 132, 252, 0.22);
  --focus-ring: 0 0 0 4px rgba(192, 132, 252, 0.32);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ts=`/* design-systems/trading-terminal/tokens.css
 * Structured token bindings for Trading Terminal.
 * professional trading terminal with dark market panels, green-red status, and compact data density.
 */

:root {
  --bg: #070b12;
  --surface: #101826;
  --surface-warm: #162238;
  --fg: #f8fafc;
  --fg-2: #cbd5e1;
  --muted: #8492a6;
  --meta: #38bdf8;
  --border: #263246;
  --border-soft: #1c2638;
  --accent: #38bdf8;
  --accent-on: #03111a;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #22c55e;
  --warn: #f59e0b;
  --danger: #ef4444;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "Roboto Mono", "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 28px;
  --text-3xl: 40px;
  --text-4xl: 56px;
  --leading-body: 1.45;
  --leading-tight: 1.08;
  --tracking-display: -0.01em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 80px;
  --section-y-tablet: 60px;
  --section-y-phone: 42px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 80px rgba(0, 0, 0, 0.42);
  --focus-ring: 0 0 0 4px rgba(56, 189, 248, 0.28);
  --motion-fast: 90ms;
  --motion-base: 160ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1320px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ae=1,Te="od-design-tokens/v1",Se="TOKEN_SCHEMA",_e="2026-06-06T00:00:00.000Z",$e={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},De={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ee=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--bg"},{"name":"--surface","value":"#f4f4f4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#171a20","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--fg"},{"name":"--fg-2","value":"#393c41","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--fg-2"},{"name":"--muted","value":"#5c5e62","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--muted"},{"name":"--meta","value":"#8e8e8e","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--meta"},{"name":"--border","value":"#d0d1d2","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--border"},{"name":"--border-soft","value":"#eeeeee","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--border-soft"},{"name":"--accent","value":"#3e6ae1","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:142"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Universal Sans Display\\", -apple-system, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:168"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Universal Sans Text\\", -apple-system, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:169"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:170"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:179"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:180"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:182"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:183"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:184"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:185"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:186"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.43","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:191"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.20","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:192"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"normal","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:199"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:204"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:205"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:206"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:207"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:209"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:210"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:211"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"120px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"72px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:220"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:221"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:234"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:235"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:236"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:237"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:250"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:251"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 2px 8px rgba(0, 0, 0, 0.05)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:252"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:258"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"250ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:271"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"330ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:272"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.5, 0, 0, 0.75)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:273"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1383px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:281"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:282"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:283"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:284"],"sourceName":"--container-gutter-phone"}]'),Ss={schemaVersion:Ae,format:Te,contract:Se,generatedAt:_e,source:$e,summary:De,tokens:Ee},Me=1,Ie="od-design-tokens/v1",Ge="TOKEN_SCHEMA",Fe="2026-06-06T00:00:00.000Z",Ce={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Pe={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},je=JSON.parse('[{"name":"--bg","value":"#050816","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#10162a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#17203a","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8fafc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#cbd5e1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#94a3b8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#00f0f0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#26324f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#1c2740","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#00f0f0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#061018","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#00f000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#f0f000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#f00000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Press Start 2P\\", \\"Arial Black\\", system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Press Start 2P\\", ui-monospace, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"10px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.6","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 0 rgba(0, 0, 0, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(0, 240, 240, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"80ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"140ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"steps(2, end)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1100px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),_s={schemaVersion:Me,format:Ie,contract:Ge,generatedAt:Fe,source:Ce,summary:Pe,tokens:je},Oe=1,ze="od-design-tokens/v1",Ve="TOKEN_SCHEMA",Ue="2026-06-06T00:00:00.000Z",Re={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Le={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},He=JSON.parse('[{"name":"--bg","value":"#050505","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#111111","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#211022","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#e5e7eb","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9ca3af","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#ff00a8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#2b2b2b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#1d1d1d","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ff00a8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#22c55e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#facc15","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#ef4444","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"PolySans\\", \\"Helvetica Neue\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", \\"Helvetica Neue\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"IBM Plex Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"19px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"66px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.48","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.95","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.035em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 70px rgba(255, 0, 168, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(255, 0, 168, 0.30)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1240px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),$s={schemaVersion:Oe,format:ze,contract:Ve,generatedAt:Ue,source:Re,summary:Le,tokens:He},We=1,Ke="od-design-tokens/v1",Je="TOKEN_SCHEMA",Ze="2026-06-06T00:00:00.000Z",qe={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ye={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:3,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Qe=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#000000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--fg"},{"name":"--fg-2","value":"rgba(0, 0, 0, 0.6)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--fg-2"},{"name":"--muted","value":"#666666","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--muted"},{"name":"--meta","value":"var(--muted)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--meta"},{"name":"--border","value":"#ebebeb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--border-soft"},{"name":"--accent","value":"#010120","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), white 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), white 16%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"The Future\\", Arial, ui-sans-serif, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"The Future\\", Arial, ui-sans-serif, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"PP Neue Montreal Mono\\", Georgia, ui-monospace, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"10px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.3","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.0","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.03em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(1, 1, 32, 0.1) 0px 4px 10px","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:112"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:125"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--container-gutter-phone"}]'),Ds={schemaVersion:We,format:Ke,contract:Je,generatedAt:Ze,source:qe,summary:Ye,tokens:Qe},Xe=1,es="od-design-tokens/v1",ss="TOKEN_SCHEMA",ns="2026-06-06T00:00:00.000Z",as={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},rs={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},os=JSON.parse('[{"name":"--bg","value":"#070711","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#111126","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1e1540","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8f7ff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d6ccff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9d8ad4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#c084fc","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#34265e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#241c42","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#c084fc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#13051f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#39ff88","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#fff34d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#ff4d8d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 80px rgba(192, 132, 252, 0.22)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(192, 132, 252, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Es={schemaVersion:Xe,format:es,contract:ss,generatedAt:ns,source:as,summary:rs,tokens:os},ts=1,cs="od-design-tokens/v1",ls="TOKEN_SCHEMA",is="2026-06-06T00:00:00.000Z",ds={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},us={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ms=JSON.parse('[{"name":"--bg","value":"#070b12","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#101826","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#162238","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8fafc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#cbd5e1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8492a6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#38bdf8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#263246","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#1c2638","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#38bdf8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#03111a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#22c55e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#f59e0b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#ef4444","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Roboto Mono\\", \\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.45","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.08","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 80px rgba(0, 0, 0, 0.42)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(56, 189, 248, 0.28)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"90ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"160ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1320px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Ms={schemaVersion:ts,format:cs,contract:ls,generatedAt:is,source:ds,summary:us,tokens:ms};export{bs as _,gs as a,ys as b,ks as c,hs as d,fs as e,ps as f,Ts as g,As as h,Ns as i,Bs as j,vs as k,ws as l,xs as m,Ms as n,Es as o,Ds as p,$s as q,_s as r,Ss as s};
