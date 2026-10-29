const e="od-design-system-project/v1",s="vercel",n="Vercel",r="Developer Tools",a="Bundled Open Design package for Vercel, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},c={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},t="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Re={schemaVersion:e,id:s,name:n,category:r,description:a,source:o,files:c,usage:t,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="vibrant",f="Vibrant",h="Bold & Expressive",k="Bundled Open Design package for Vibrant, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",x="components.manifest.json",w="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ue={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:x,importMode:w,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="vintage",_="Vintage",S="Retro & Nostalgic",$="Bundled Open Design package for Vintage, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",V={type:"bundled",origin:"Open Design curated bundled fixture"},T={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},G="USAGE.md",M="components.manifest.json",E="normalized",I={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},D={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Le={schemaVersion:N,id:A,name:_,category:S,description:$,source:V,files:T,usage:G,componentsManifest:M,importMode:E,craft:I,sourceFiles:D},j="od-design-system-project/v1",F="vodafone",C="Vodafone",O="Media & Consumer",z="Bundled Open Design package for Vodafone, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",R={type:"bundled",origin:"Open Design curated bundled fixture"},U={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},L="USAGE.md",H="components.manifest.json",J="normalized",K={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},W={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},He={schemaVersion:j,id:F,name:C,category:O,description:z,source:R,files:U,usage:L,componentsManifest:H,importMode:J,craft:K,sourceFiles:W},Z="od-design-system-project/v1",P="voltagent",q="VoltAgent",Q="AI & LLM",X="Bundled Open Design package for VoltAgent, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Y={type:"bundled",origin:"Open Design curated bundled fixture"},ee={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},se="USAGE.md",ne="components.manifest.json",re="normalized",ae={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},oe={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Je={schemaVersion:Z,id:P,name:q,category:Q,description:X,source:Y,files:ee,usage:se,componentsManifest:ne,importMode:re,craft:ae,sourceFiles:oe},Ke=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/vercel/tokens.css
 *
 * Structured token bindings for "Vercel" — the engineering-as-design
 * thesis of frontend deployment: a near-white canvas, near-black text,
 * one saturated blue accent, and a shadow-as-border philosophy that
 * replaces the box-model edge with a layered box-shadow stack.
 *
 * This file pre-compiles the values described in \`DESIGN.md\` into the
 * shared schema. Agents generating an artifact for Vercel should paste
 * the \`:root\` block verbatim into the first \`<style>\` of the artifact,
 * then reference everything via \`var(--*)\`.
 *
 * Brand-specific schema decisions (each one bends a schema convention
 * to match Vercel's voice rather than the cross-brand default):
 *
 *   1. \`--accent\` is the Vercel/Console blue (#0070f3), not Vercel Black.
 *      Black is already \`--fg\`; the brand expresses primary CTAs by
 *      using \`--fg\` as the button background, not \`--accent\`. The
 *      \`--accent\` slot is reserved for the chromatic moments — links,
 *      focus rings, badge tints — exactly where Vercel's blue appears
 *      in product. Treating black as both \`--fg\` and \`--accent\` would
 *      collapse two distinct intents into one name and break the
 *      lint's "≤2 accent uses per screen" semantic.
 *
 *   2. \`--fg\` is \`#171717\` (Vercel Black), not \`#000000\`. The micro-
 *      warmth at the top of the gray ramp is part of the brand — pure
 *      black against pure white reads as harsh, and the rest of the
 *      neutral scale (gray-600 / 500 / 400 / 100 / 50) is calibrated
 *      against \`#171717\` not \`#000000\`. Bind the full four-level
 *      foreground ramp (#171717 → #4d4d4d → #666666 → #808080) so
 *      cross-brand components targeting \`--fg-2\` and \`--meta\` resolve
 *      to Vercel's actual gray-600 / gray-400 instead of collapsing.
 *
 *   3. \`--border\` is \`rgba(0, 0, 0, 0.08)\` — the literal Vercel
 *      shadow-as-border alpha, NOT a solid hex. DESIGN.md §1 names
 *      this single value as "the signature" that "replaces traditional
 *      borders throughout". Binding \`--border\` to the alpha lets
 *      \`--elev-ring\` (\`0 0 0 1px var(--border)\`) reproduce the Vercel
 *      hairline by default, and lets components reach the same value
 *      via \`border: 1px solid var(--border)\` when a real border is
 *      structurally necessary (e.g. image cards). \`--border-soft\`
 *      drops to \`0.04\` for inner-row separators that must not compete.
 *
 *   4. \`--elev-raised\` is the full multi-layer Vercel card stack
 *      (\`0 0 0 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.04),
 *      0 8px 8px -8px rgba(0,0,0,0.04), 0 0 0 1px #fafafa\`), not the
 *      schema's single soft blur. The inner \`#fafafa\` ring at the
 *      bottom of the stack is the "subtle inner glow" DESIGN.md §6
 *      calls out — without it, Vercel cards lose the built-not-
 *      floating quality. The fourth layer's \`#fafafa\` is the only
 *      raw hex inside the \`:root\` block, justified because the value
 *      is structural to the shadow layer, not a recolorable surface.
 *
 *   5. \`--focus-ring\` is a solid 2px ring at \`var(--accent)\`, not the
 *      schema's 3px alpha glow. Vercel's \`--ds-focus-color\` focus
 *      outline is \`2px solid hsla(212, 100%, 48%, 1)\` everywhere;
 *      reproducing it as a sharp 2px box-shadow keeps keyboard focus
 *      legible against the white canvas without the soft halo that
 *      would dilute the engineered feel.
 *
 *   6. The type scale tops out at 48px (\`--text-4xl\`), not 64px+.
 *      DESIGN.md §3 caps display at 48px Geist W600 with
 *      \`letter-spacing: -2.4px\` (which expresses as \`-0.05em\` in
 *      \`--tracking-display\`). Vercel reads HUGE because the tracking
 *      compresses, not because the px count climbs. \`--leading-tight\`
 *      drops to \`1.1\` to match — display lines run shorter than the
 *      schema default's 1.2.
 *
 *   7. Section rhythm is generous: \`96px\` desktop, \`64px\` tablet,
 *      \`48px\` phone (\`--section-y-*\`). DESIGN.md §5 describes the
 *      "gallery emptiness" of 80–120px+ vertical padding between
 *      sections — the whitespace is the design. Container caps at
 *      \`1200px\` (Vercel's documented max content width).
 *
 * Source contracts:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *   - A2 fallback parity:   design-systems/_schema/defaults.css
 *   - Lint enforcement:     apps/daemon/src/lint-artifact.ts
 *
 * Keep this file additive: never invent token names not also
 * documented in DESIGN.md or the schema. The Geist family does not
 * need a CDN reference here — the font stack lists OS fallbacks so
 * that artifacts render acceptably even when Geist is not loaded,
 * and any host that wants the real Geist face links it externally.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels — schema slot) ─────────────────────────────
   * Vercel's canvas is famously achromatic: pure white page, pure
   * white cards, no warm tier. \`--surface-warm\` aliases to surface
   * because the brand explicitly forbids background-color variation
   * between sections — depth comes from shadow layering, not from
   * tinting one surface warmer than another. (DESIGN.md §5: "White
   * sections alternate with white sections — there's no color
   * variation between sections.") */
  --bg: #ffffff;
  --surface: #ffffff;
  --surface-warm: var(--surface);     /* alias — Vercel has no warm tier */

  /* ─── Foreground ramp (4 levels) ──────────────────────────────────
   * Gray 900 → 600 → 500 → 400, the documented neutral scale from
   * DESIGN.md §2. \`#171717\` instead of \`#000000\` matters — the
   * yellow-undertone warmth is what keeps the page from reading as
   * harsh. \`--fg-2\` and \`--meta\` are independently bound (not aliased)
   * because Vercel genuinely uses four distinct text tiers: heading
   * black, body description gray, tertiary caption gray, and
   * placeholder/disabled gray. */
  --fg: #171717;                       /* Gray 900 — headings, primary text */
  --fg-2: #4d4d4d;                     /* Gray 600 — body description */
  --muted: #666666;                    /* Gray 500 — captions, tertiary text */
  --meta: #808080;                     /* Gray 400 — placeholder, disabled */

  /* ─── Border (2 levels) ──────────────────────────────────────────
   * Shadow-as-border is THE signature: \`rgba(0, 0, 0, 0.08)\` at 1px
   * spread replaces traditional borders throughout. Binding \`--border\`
   * to the alpha (not a solid hex) lets \`--elev-ring\` reproduce the
   * Vercel hairline by default, and lets \`border: 1px solid var(--border)\`
   * paint the same value when a real border is structurally required
   * (e.g. image-card top edge per DESIGN.md §4). \`--border-soft\`
   * drops to 0.04 alpha for inner row separators that should not
   * visually compete with the card edge. */
  --border: rgba(0, 0, 0, 0.08);       /* signature shadow-as-border alpha */
  --border-soft: rgba(0, 0, 0, 0.04);  /* inner row separator */

  /* ─── Accent ─────────────────────────────────────────────────────
   * The single chromatic move: Vercel/Console Blue. Used in links,
   * focus rings, pill-badge tints, and console syntax highlighting.
   * Hard cap of ≤2 visible uses per screen — DESIGN.md §7 forbids
   * decorative use ("Color is functional, never decorative — workflow
   * colors (Red/Pink/Blue) mark pipeline stages only").
   *
   * Primary CTAs in Vercel are BLACK, not blue. components.html
   * encodes that pattern via \`background: var(--fg)\` on the primary
   * button, so \`--accent\` stays reserved for the chromatic moments
   * where blue actually appears. */
  --accent: #0070f3;                   /* Vercel Blue / Console Blue */
  --accent-on: #ffffff;                /* white label on saturated blue */
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ───────────────────────────────────────────────────
   * Vercel's marketing surface rarely renders state. We inherit the
   * schema defaults (no warm-shift) because the brand has no defined
   * success/warn/danger palette of its own; the workflow accents
   * (Ship Red, Preview Pink, Develop Blue from DESIGN.md §2) are
   * pipeline labels, not status colors, and intentionally do NOT
   * bind here. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ─────────────────────────────────────────────────
   * Geist Sans is Vercel's open-source typeface — \`--font-display\`
   * and \`--font-body\` share the stack; size, weight, and tracking
   * carry hierarchy, not face. The Arial/system fallbacks come from
   * DESIGN.md §3 and ensure artifacts render legibly even when Geist
   * is not loaded. Geist Mono for code and technical labels
   * preserves the "developer console voice" that connects the
   * marketing site to the product. */
  --font-display: "Geist", "Geist Sans", -apple-system, "Segoe UI", Arial, sans-serif;
  --font-body: "Geist", "Geist Sans", -apple-system, "Segoe UI", Arial, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SF Mono", "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace;

  /* Type scale (px) — derived from DESIGN.md §3 hierarchy table.
   * The scale tops out at 48px (display hero); Vercel reads BIG
   * because of -0.05em compression on display, not because of a
   * larger px ceiling. */
  --text-xs: 12px;                     /* caption, metadata, tags */
  --text-sm: 14px;                     /* button, link, small UI */
  --text-base: 16px;                   /* body small, navigation */
  --text-lg: 20px;                     /* body large, introductions */
  --text-xl: 24px;                     /* card title */
  --text-2xl: 32px;                    /* sub-heading, large card */
  --text-3xl: 40px;                    /* section heading */
  --text-4xl: 48px;                    /* display hero */

  /* \`--leading-tight\` is 1.1 (DESIGN.md says 1.00–1.17 at display),
   * \`--leading-body\` is 1.5 (the documented 16px / 24px ratio).
   * \`--tracking-display\` is \`-0.05em\`, the em-relative form of
   * Vercel's \`-2.4px at 48px\` — letter-spacing in em scales
   * proportionally with size, matching DESIGN.md §3's principle
   * that "tracking scales with font size". */
  --leading-body: 1.5;
  --leading-tight: 1.1;
  --tracking-display: -0.05em;

  /* ─── Spacing ────────────────────────────────────────────────────
   * 4px-grid base scale. Vercel's documented spacing (DESIGN.md §5)
   * uses 1–6px sub-tier increments for micro-padding (button
   * \`0px 6px\`, etc.); those are inlined per-component because they
   * are too fine to belong in the shared schema. The 4/8/12/16/20/
   * 24/32/48 tier covers the structural rhythm. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §5: 80–120px+ vertical padding between
   * sections desktop, collapsing to 48px on mobile. We sit in the
   * middle at 96px desktop, drop to 64px on tablet (still generous),
   * and 48px on phone (the documented mobile floor). */
  --section-y-desktop: 96px;
  --section-y-tablet: 64px;
  --section-y-phone: 48px;

  /* ─── Radius ─────────────────────────────────────────────────────
   * DESIGN.md §5 radius scale: 2/4/6/8/12/64/100/9999. We bind the
   * four schema tiers to: 6 (button/input/functional), 8 (card),
   * 12 (image/featured card), 9999 (badge/pill). The 64px and
   * 100px "navigation pill" radii from DESIGN.md are component-
   * specific and not part of the shared schema. */
  --radius-sm: 6px;                    /* buttons, inputs, functional */
  --radius-md: 8px;                    /* cards, modals */
  --radius-lg: 12px;                   /* image cards, featured */
  --radius-pill: 9999px;               /* badges, status pills */

  /* ─── Elevation (3 levels) ───────────────────────────────────────
   * Vercel's depth system is shadow-LED, not blur-led. Three levels:
   *
   *   --elev-flat    no shadow (page background, text blocks)
   *   --elev-ring    the signature 1px shadow-as-border (most surfaces)
   *   --elev-raised  the multi-layer Vercel card stack (featured cards)
   *
   * \`--elev-raised\` is reproduced VERBATIM from DESIGN.md §6 Level 3,
   * including the inner \`#fafafa\` 1px ring that DESIGN.md calls out
   * as "the glow that makes the system work" — never drop the last
   * layer when overriding this token. The four layers compose:
   *   ring  (1px shadow-as-border, sits on top)
   *   close (2px 2px soft elevation, just below the surface)
   *   far   (8px blur -8px spread, ambient depth at distance)
   *   inner (1px #fafafa ring, the subtle highlight) */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0 2px 2px rgba(0, 0, 0, 0.04),
    0 8px 8px -8px rgba(0, 0, 0, 0.04),
    0 0 0 1px #fafafa;

  /* ─── Focus ring ─────────────────────────────────────────────────
   * Vercel's \`--ds-focus-color\` is \`hsla(212, 100%, 48%, 1)\`; the
   * outline is \`2px solid\` on every interactive element. We
   * reproduce that as a sharp 2px box-shadow at \`var(--accent)\`,
   * NOT the schema's 3px alpha glow — Vercel's focus is engineered,
   * not atmospheric. */
  --focus-ring: 0 0 0 2px var(--accent);

  /* ─── Motion ─────────────────────────────────────────────────────
   * Two durations + one easing curve, per anti-ai-slop's "short,
   * purposeful transitions (150–250ms) with stable easing". Vercel
   * transitions are quick and unobtrusive — never a long-form
   * choreographed entrance. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ─────────────────────────────────────────────────────
   * 1200px max content width per DESIGN.md §5. Gutters narrow on
   * mobile to preserve the line-length-as-craft feel — Vercel does
   * NOT edge-bleed body copy on phones, only screenshots. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,We=`/* design-systems/vibrant/tokens.css
 * Structured token bindings for Vibrant.
 * vibrant visual system with saturated accents, warm surfaces, and optimistic product energy.
 */

:root {
  --bg: #fff8d7;
  --surface: #ffffff;
  --surface-warm: #ffef9f;
  --fg: #1d1836;
  --fg-2: #4c426c;
  --muted: #796f91;
  --meta: #ff6b00;
  --border: #eadfba;
  --border-soft: #f5eccd;
  --accent: #ff6b00;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #2e9d57;
  --warn: #ffb020;
  --danger: #e5484d;
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
  --elev-raised: 0 18px 44px rgba(29, 24, 54, 0.14);
  --focus-ring: 0 0 0 4px rgba(255, 107, 0, 0.26);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ze=`/* design-systems/vintage/tokens.css
 * Structured token bindings for Vintage.
 * vintage interface with aged paper, muted ink, and heritage-inspired controls.
 */

:root {
  --bg: #faf3df;
  --surface: #fffaf0;
  --surface-warm: #efe0bd;
  --fg: #211b12;
  --fg-2: #504737;
  --muted: #7c7160;
  --meta: #8f5d24;
  --border: #ddd0b4;
  --border-soft: #eee3cd;
  --accent: #8f5d24;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #5b8d42;
  --warn: #c27b22;
  --danger: #a64036;
  --font-display: Georgia, "Times New Roman", serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 17px;
  --text-lg: 20px;
  --text-xl: 28px;
  --text-2xl: 42px;
  --text-3xl: 64px;
  --text-4xl: 88px;
  --leading-body: 1.62;
  --leading-tight: 1;
  --tracking-display: -0.025em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 112px;
  --section-y-tablet: 80px;
  --section-y-phone: 56px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 18px 42px rgba(33, 27, 18, 0.12);
  --focus-ring: 0 0 0 4px rgba(143, 93, 36, 0.24);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Pe=`/* design-systems/vodafone/tokens.css
 *
 * Structured token bindings for Vodafone.
 * bright red telecom clarity balanced by white service surfaces and practical controls.
 */

:root {
  --bg: #ffffff;
  --surface: #f4f4f4;
  --surface-warm: #fff1f1;
  --fg: #1f1f1f;
  --fg-2: #4a4d4e;
  --muted: #6f7375;
  --meta: #a61218;
  --border: #d8d8d8;
  --border-soft: #eeeeee;
  --accent: #e60000;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #008a00;
  --warn: #f5b400;
  --danger: #bd0000;
  --font-display: "Vodafone", "Vodafone Rg", Arial, sans-serif;
  --font-body: "Vodafone", "Vodafone Rg", Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 19px;
  --text-xl: 24px;
  --text-2xl: 36px;
  --text-3xl: 48px;
  --text-4xl: 68px;
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
  --section-y-desktop: 96px;
  --section-y-tablet: 68px;
  --section-y-phone: 48px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 18px 44px rgba(0, 0, 0, 0.12);
  --focus-ring: 0 0 0 4px rgba(230, 0, 0, 0.22);
  --motion-fast: 150ms;
  --motion-base: 220ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1200px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,qe=`/* design-systems/voltagent/tokens.css
 * Structured token bindings for VoltAgent.
 * dark agent runtime surfaces, neon green command signals, and technical orchestration cards.
 */

:root {
  --bg: #07110c;
  --surface: #101c16;
  --surface-warm: #14281e;
  --fg: #f4fff8;
  --fg-2: #c8dfd0;
  --muted: #8ba493;
  --meta: #7cff6b;
  --border: #254132;
  --border-soft: #1a3024;
  --accent: #7cff6b;
  --accent-on: #07110c;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #52e875;
  --warn: #facc15;
  --danger: #fb7185;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  --text-xl: 22px;
  --text-2xl: 32px;
  --text-3xl: 46px;
  --text-4xl: 64px;
  --leading-body: 1.56;
  --leading-tight: 1.07;
  --tracking-display: -0.02em;
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
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 70px rgba(0, 0, 0, 0.42);
  --focus-ring: 0 0 0 4px rgba(124, 255, 107, 0.30);
  --motion-fast: 120ms;
  --motion-base: 210ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,ce=1,te="od-design-tokens/v1",le="TOKEN_SCHEMA",ie="2026-06-06T00:00:00.000Z",de={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ue={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},me=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#171717","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4d4d4d","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--fg-2"},{"name":"--muted","value":"#666666","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--muted"},{"name":"--meta","value":"#808080","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:112"],"sourceName":"--meta"},{"name":"--border","value":"rgba(0, 0, 0, 0.08)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(0, 0, 0, 0.04)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--border-soft"},{"name":"--accent","value":"#0070f3","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Geist\\", \\"Geist Sans\\", -apple-system, \\"Segoe UI\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Geist\\", \\"Geist Sans\\", -apple-system, \\"Segoe UI\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:162"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Geist Mono\\", ui-monospace, \\"SF Mono\\", \\"Roboto Mono\\", Menlo, Monaco, \\"Liberation Mono\\", \\"DejaVu Sans Mono\\", \\"Courier New\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:163"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:169"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:170"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:171"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:174"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:176"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:184"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:185"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.05em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:186"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:194"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:195"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:196"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:197"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:198"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:199"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:200"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:201"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:207"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:209"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:217"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:218"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:220"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:237"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:238"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.04), 0 8px 8px -8px rgba(0, 0, 0, 0.04), 0 0 0 1px #fafafa","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:239"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px var(--accent)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:251"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:258"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:259"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:260"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:266"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:267"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:268"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:269"],"sourceName":"--container-gutter-phone"}]'),Qe={schemaVersion:ce,format:te,contract:le,generatedAt:ie,source:de,summary:ue,tokens:me},pe=1,fe="od-design-tokens/v1",he="TOKEN_SCHEMA",ke="2026-06-06T00:00:00.000Z",ye={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ge={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},be=JSON.parse('[{"name":"--bg","value":"#fff8d7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#ffef9f","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1d1836","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4c426c","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#796f91","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#ff6b00","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#eadfba","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#f5eccd","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ff6b00","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#2e9d57","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#ffb020","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#e5484d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 44px rgba(29, 24, 54, 0.14)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(255, 107, 0, 0.26)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Xe={schemaVersion:pe,format:fe,contract:he,generatedAt:ke,source:ye,summary:ge,tokens:be},xe=1,we="od-design-tokens/v1",ve="TOKEN_SCHEMA",Be="2026-06-06T00:00:00.000Z",Ne={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ae={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},_e=JSON.parse('[{"name":"--bg","value":"#faf3df","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#fffaf0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#efe0bd","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#211b12","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#504737","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#7c7160","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#8f5d24","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#ddd0b4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#eee3cd","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#8f5d24","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#5b8d42","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#c27b22","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#a64036","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Georgia, \\"Times New Roman\\", serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.62","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"112px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 42px rgba(33, 27, 18, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(143, 93, 36, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Ye={schemaVersion:xe,format:we,contract:ve,generatedAt:Be,source:Ne,summary:Ae,tokens:_e},Se=1,$e="od-design-tokens/v1",Ve="TOKEN_SCHEMA",Te="2026-06-06T00:00:00.000Z",Ge={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Me={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ee=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#f4f4f4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fff1f1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1f1f1f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4a4d4e","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#6f7375","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#a61218","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#d8d8d8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#eeeeee","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#e60000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#008a00","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#f5b400","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#bd0000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Vodafone\\", \\"Vodafone Rg\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Vodafone\\", \\"Vodafone Rg\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"19px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.48","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.08","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.015em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 44px rgba(0, 0, 0, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(230, 0, 0, 0.22)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"220ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),es={schemaVersion:Se,format:$e,contract:Ve,generatedAt:Te,source:Ge,summary:Me,tokens:Ee},Ie=1,De="od-design-tokens/v1",je="TOKEN_SCHEMA",Fe="2026-06-06T00:00:00.000Z",Ce={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Oe={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ze=JSON.parse('[{"name":"--bg","value":"#07110c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#101c16","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#14281e","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f4fff8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#c8dfd0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8ba493","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#7cff6b","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#254132","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#1a3024","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#7cff6b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#07110c","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#52e875","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#facc15","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#fb7185","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"JetBrains Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"46px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.56","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.07","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"18px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 70px rgba(0, 0, 0, 0.42)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(124, 255, 107, 0.30)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"210ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),ss={schemaVersion:Ie,format:De,contract:je,generatedAt:Fe,source:Ce,summary:Oe,tokens:ze};export{Je as _,He as a,Le as b,Ue as c,Re as d,qe as e,Pe as f,Ze as g,We as h,Ke as i,ss as j,es as k,Ye as l,Xe as m,Qe as n};
