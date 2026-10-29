const e="od-design-system-project/v1",s="ollama",n="Ollama",a="AI & LLM",r="Bundled Open Design package for Ollama, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},t={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},c="USAGE.md",i="components.manifest.json",l="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ae={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:t,usage:c,componentsManifest:i,importMode:l,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="openai",f="OpenAI",h="AI & LLM",k="Bundled Open Design package for OpenAI, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},re={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="opencode-ai",S="OpenCode",M="AI & LLM",I="Bundled Open Design package for OpenCode, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",T={type:"bundled",origin:"Open Design curated bundled fixture"},D={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},E="USAGE.md",_="components.manifest.json",G="normalized",C={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},$={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},oe={schemaVersion:N,id:A,name:S,category:M,description:I,source:T,files:D,usage:E,componentsManifest:_,importMode:G,craft:C,sourceFiles:$},te=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/ollama/tokens.css
 *
 * Structured token bindings for "Ollama" — radical minimalism for the
 * local-LLM runtime. The brand strips every form of decoration away
 * until only the essential tool remains: pure-white canvas, zero
 * chromatic color anywhere on screen, no shadows ever, and a binary
 * radius system that separates "container" (12px) from "interactive"
 * (pill / 9999px). DESIGN.md is emphatic on every front — the absence
 * of design IS the design.
 *
 * Agents are expected to paste the \`:root { ... }\` block verbatim
 * into the first \`<style>\` of every artifact they generate against
 * this design system, then reference tokens via \`var(--name)\` from
 * then on. The corresponding \`components.html\` mirrors this block
 * with comments stripped; keep the two in sync byte-for-byte after
 * normalization, or the \`tokens-fixture-sync\` guard will fail.
 *
 * Brand notes (the values below intentionally invert several
 * assumptions baked into the default brand):
 *
 *   #Decision 1 — \`--bg\` is pure white, \`--surface\` is the lift.
 *     Default does the opposite (cream bg, white surface) because
 *     it wants card-lift warmth; ollama wants paper-flat purity, so
 *     #ffffff is the canvas and #fafafa (Snow) is the subtle lift.
 *
 *   #Decision 2 — \`--accent\` is pure black, not a chromatic CTA hue.
 *     Per DESIGN.md §2 the entire interface is grayscale; the only
 *     chromatic exception is the keyboard focus ring (#3b82f6 at
 *     50% alpha). The "Download" / "Create account" pills that
 *     occupy the accent role are black-on-white, so the accent
 *     token binds to #000 and accent-on binds to #fff.
 *
 *   #Decision 3 — every interactive radius collapses to pill.
 *     DESIGN.md §5 prescribes a strictly binary radius system with
 *     no intermediate steps. \`--radius-sm\`, \`--radius-pill\` (and
 *     \`--radius-lg\` for consistency) all resolve to 9999px so any
 *     component reaching for \`--radius-sm\` (button, input, tag,
 *     chip) inherits the brand stance instead of a stray 8px.
 *
 *   #Decision 4 — every elevation tier is the hairline border ring,
 *     never a blur shadow. DESIGN.md §6 is explicit: "Ollama uses
 *     zero shadows. This is not an oversight — it's a deliberate
 *     design decision." \`--elev-raised\` therefore mirrors
 *     \`--elev-ring\` instead of binding to a blur drop-shadow.
 *
 *   #Decision 5 — display font is SF Pro Rounded. The rounded
 *     terminals ARE the brand expression — they soften a developer
 *     CLI tool into something approachable without compromising the
 *     monochrome / minimal philosophy. Falls back to system-ui on
 *     non-Apple platforms (the duplicate \`system-ui\` in the stack is
 *     copied verbatim from DESIGN.md §3 to keep the prose ↔ token
 *     mapping audit-trivial).
 *
 * Schema slot collapse (see _schema/AGENTS.md for the layer model):
 *
 *   --surface-warm aliases --surface — the canvas is grayscale by
 *     definition, so there is no warm tertiary surface tier.
 *   --border-soft aliases --border — DESIGN.md §6 prescribes a single
 *     1px hairline weight; row separators and card edges share it.
 *   --fg-2 / --meta bind to real values — ollama is monochrome but
 *     differentiates 4 text levels (black / near-black / Stone /
 *     Silver) so the ramp earns independent slots.
 *
 * Keep this file additive: never invent token names not also
 * documented in DESIGN.md or the craft contracts. Ollama is not in
 * BRAND_EXTENSIONS, so any unknown token will fail the
 * \`unknown-token-allowlist\` guard.
 * ─────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels) ────────────────────────────────────────
   * Pure white IS the brand canvas — DESIGN.md §2 is emphatic:
   * "not off-white, not cream, pure white." \`--surface\` lifts to
   * Snow (#fafafa), the subtlest possible distinction from #fff,
   * for sections and barely-elevated containers. No third tier:
   * \`--surface-warm\` aliases to surface because the brand is
   * grayscale by definition. */
  --bg: #ffffff;
  --surface: #fafafa;
  --surface-warm: var(--surface);   /* alias — ollama is monochrome */

  /* ─── Foreground ramp (4 levels) ────────────────────────────────
   * The full grayscale text ramp from DESIGN.md §2:
   *   Pure Black  (#000000) — primary headlines, demanding attention
   *   Near Black  (#262626) — button text, secondary headline weight
   *   Stone       (#737373) — body, footer links, de-emphasized copy
   *   Silver      (#a3a3a3) — placeholders, tertiary metadata
   * The contrast between black and Stone is wide enough that the
   * brand can avoid font-weight ≥600 entirely. */
  --fg: #000000;
  --fg-2: #262626;                  /* Near Black */
  --muted: #737373;                 /* Stone */
  --meta: #a3a3a3;                  /* Silver */

  /* ─── Border (2 levels) ─────────────────────────────────────────
   * Light Gray (#e5e5e5) is the workhorse containment color and
   * the only border weight ollama permits. DESIGN.md §7 forbids
   * borders heavier than 1px; \`--border-soft\` aliases to keep that
   * stance intact for components that reach for a softer divider. */
  --border: #e5e5e5;
  --border-soft: var(--border);     /* alias — single border weight */

  /* ─── Accent ────────────────────────────────────────────────────
   * Pure Black IS the accent here — the black-pill CTA ("Download",
   * "Create account") is ollama's maximum-emphasis element. DESIGN.md
   * §2 forbids chromatic color in normal flow, so the accent role
   * is fulfilled by the darkest tone rather than a brand hue.
   *
   * Hover and active states LIGHTEN rather than darken (pure black
   * cannot darken further). The values come from DESIGN.md §2's
   * documented Near-Black (#262626) and Button-Text-Dark (#404040)
   * stops on the gray ramp, so the hover stack stays on-brand
   * instead of formula-derived. */
  --accent: #000000;
  --accent-on: #ffffff;
  --accent-hover: #262626;          /* Near Black — subtle lift */
  --accent-active: #404040;         /* Button Text Dark — pressed */

  /* ─── Semantic ──────────────────────────────────────────────────
   * DESIGN.md §2 explicitly says "no semantic red, no accent green"
   * in normal flow — but the schema requires these tokens for error
   * toasts and status indicators that the runtime will eventually
   * surface (model download failures, daemon health checks). Bound
   * to the schema fallbacks so the names resolve; components must
   * use them sparingly and never as decoration. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography — fonts ────────────────────────────────────────
   * SF Pro Rounded is Apple's rounded system font — its softened
   * letterforms ARE the brand expression. Renders rounded terminals
   * on macOS/iOS, falls back to the platform system sans elsewhere
   * (the duplicate \`system-ui\` in the stack mirrors DESIGN.md §3
   * verbatim — redundant but documented).
   *
   * Body text uses ui-sans-serif so reading copy stays platform-
   * native; the emoji fonts in the stack come straight from DESIGN.md
   * §3's body fallback list. Monospace gets a deliberately broad
   * stack so \`ollama run …\` snippets render consistently across
   * macOS / Linux / Windows. */
  --font-display: "SF Pro Rounded", system-ui, -apple-system, system-ui;
  --font-body: ui-sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  /* Type scale (px) — direct copy of DESIGN.md §3 hierarchy table.
   * Ollama's display tier tops out at 48px (versus default's 64px)
   * because the homepage is intentionally short and uncluttered;
   * even the hero stays restrained. */
  --text-xs: 12px;                  /* Small */
  --text-sm: 14px;                  /* Caption */
  --text-base: 16px;                /* Body / Link */
  --text-lg: 18px;                  /* Body Large */
  --text-xl: 24px;                  /* Card Title */
  --text-2xl: 30px;                 /* Sub-heading */
  --text-3xl: 36px;                 /* Section Heading */
  --text-4xl: 48px;                 /* Display / Hero */

  /* Leading & tracking — DESIGN.md §3 prescribes tight (1.0) for
   * display and comfortable (1.5) for body. Tracking is \`normal\`
   * across every tier (no negative letter-spacing on display, no
   * uppercase tightening). */
  --leading-body: 1.5;
  --leading-tight: 1;
  --tracking-display: 0;

  /* ─── Spacing ────────────────────────────────────────────────────
   * 4px base unit. DESIGN.md §5 defines an extended scale up to
   * 112px for section rhythm; the shared schema caps at --space-12
   * so the wider tiers express themselves through the section-y
   * tokens below. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* DESIGN.md §5 is direct — section vertical spacing is "very
   * generous (88–112px)" because "the white space IS the brand."
   * Desktop sits at the top of that range deliberately; tablet and
   * phone collapse but stay roomy. */
  --section-y-desktop: 112px;
  --section-y-tablet: 88px;
  --section-y-phone: 48px;

  /* ─── Radius (binary system) ───────────────────────────────────
   * DESIGN.md §5 prescribes a strictly binary radius system: 12px
   * for containers, 9999px (pill) for everything interactive. No
   * intermediate values exist on this brand. Every interactive
   * radius — \`--radius-sm\`, \`--radius-lg\`, \`--radius-pill\` —
   * resolves to the pill value so a component reaching for the
   * small button radius inherits the brand stance. \`--radius-md\`
   * holds the 12px container radius. */
  --radius-sm: 9999px;
  --radius-md: 12px;
  --radius-lg: 9999px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────
   * "Ollama uses zero shadows. This is not an oversight — it's a
   * deliberate design decision." (DESIGN.md §6) Every level of
   * depth comes from a 1px hairline border ring instead of a blur
   * shadow. \`--elev-raised\` mirrors \`--elev-ring\` so components
   * targeting a raised tier still receive the only legitimate
   * depth treatment ollama permits. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 0 0 1px var(--border);

  /* ─── Focus ring ───────────────────────────────────────────────
   * The single chromatic exception in the entire system — Tailwind's
   * default ring (#3b82f6 at 50% transparency). DESIGN.md §2 explicitly
   * carves this out for keyboard accessibility; never visible during
   * normal interaction flow. The raw hex is documented inside the
   * token expression so brand-aware components can stay grayscale
   * elsewhere. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, #3b82f6, transparent 50%);

  /* ─── Motion ───────────────────────────────────────────────────
   * DESIGN.md §7 is direct: "interactions should feel instant and
   * direct." Durations stay short enough that transitions register
   * as responsiveness rather than animation. The easing curve stays
   * on the standard ease-out so the snap still feels mechanical
   * rather than abrupt. */
  --motion-fast: 100ms;
  --motion-base: 140ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ───────────────────────────────────────────────────
   * Max container width sits at the upper end of DESIGN.md §5's
   * "~1024–1280px" range; gutters scale down through the breakpoints
   * but stay generous to preserve the "white space IS the brand"
   * stance. */
  --container-max: 1280px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,ce=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/openai/tokens.css
 *
 * Structured token bindings for the "OpenAI" brand — calm, near-monochrome
 * system anchored in deep teal-black with editorial serif display.
 *
 * Brand identity in three sentences:
 *   1. True white canvas (#ffffff) against deep teal-black ink (#0d0d0d)
 *      with a subtle cool undertone; chromatic neutrality that puts model
 *      output front and center rather than the chrome around it.
 *   2. Söhne / Inter at restrained weights (400/500/600 — never 700+)
 *      paired with Signifier serif for editorial display moments only;
 *      generous line-height (1.55–1.65) and near-zero tracking.
 *   3. Single brand color: OpenAI Teal (#10a37f) — the lone accent in an
 *      otherwise neutral system; hairline borders (#e5e5e5) used sparingly;
 *      whitespace as the primary section divider.
 *
 * Schema decisions:
 *   - --bg: #ffffff; --surface: #f5f5f5 (pearl — card surface).
 *   - --surface-warm: #fafafa (mist — section break bg, footer).
 *   - --fg: #0d0d0d (ink black); --fg-2: #1a1a1a (soft black).
 *   - --muted: #6e6e6e (slate — secondary text, captions).
 *   - --accent: #10a37f (OpenAI Teal); --accent-hover: #0a7a5e.
 *   - --font-display: Signifier (serif — editorial hero moments only).
 *   - --font-body: Söhne / Inter (sans — all UI and body text).
 *   - --tracking-display: -0.02em (display 56px per DESIGN.md).
 *   - --leading-tight: 1.08 (Signifier display hero rhythm).
 *   - h2 (28px sans) → 1.20; h3 (20px) → 1.30 per DESIGN.md.
 *   - --radius-md: 16px (cards); --radius-sm: 12px (buttons, inputs).
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────── */
  --bg:           #ffffff;
  --surface:      #f5f5f5;             /* pearl — card surface, elevated panel */
  --surface-warm: #fafafa;             /* mist — section break, footer */

  /* ─── Foreground ───────────────────────────────────────────────── */
  --fg:   #0d0d0d;                     /* ink black — primary text, brand mark */
  --fg-2: #1a1a1a;                     /* soft black — alternative headings */
  --muted: #6e6e6e;                    /* slate — secondary text, captions */
  --meta:  #9b9b9b;                    /* ash — tertiary, placeholder */

  /* ─── Border ───────────────────────────────────────────────────── */
  --border:      #e5e5e5;             /* hairline — standard separator */
  --border-soft: #ededed;             /* card outline on white surface */

  /* ─── Accent ───────────────────────────────────────────────────── */
  --accent:        #10a37f;           /* OpenAI Teal — links, highlight, CTA */
  --accent-on:     #ffffff;
  --accent-hover:  #0a7a5e;           /* teal deep — hover/pressed */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ─────────────────────────────────────────────────── */
  --success: #10a37f;                 /* teal — success path */
  --warn:    #f5a623;                 /* amber — advisory */
  --danger:  #ef4146;                 /* error — validation, destructive */

  /* ─── Typography ───────────────────────────────────────────────── */
  /* --font-display binds to Signifier — editorial serif for display only.
     --font-body binds to Söhne/Inter — all UI and reading text. */
  --font-display: "Signifier", "Source Serif Pro", Georgia, ui-serif, serif;
  --font-body:    "Söhne", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono:    "Söhne Mono", ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;

  /* Type scale — DESIGN.md §Typography Hierarchy.
   * Signifier at 56px display; Söhne from 40px H1 down to 12px label.
   * Schema spine maps the key stops. */
  --text-xs:   12px;                  /* label — eyebrow, uppercase nav */
  --text-sm:   13px;                  /* caption — metadata, badges */
  --text-base: 16px;                  /* body — standard reading */
  --text-lg:   18px;                  /* body large — lede paragraphs */
  --text-xl:   20px;                  /* h3 — sub-section */
  --text-2xl:  28px;                  /* h2 — section heading */
  --text-3xl:  40px;                  /* h1 — page heading */
  --text-4xl:  56px;                  /* display — Signifier editorial hero */

  /* Leading + tracking.
   * --leading-tight=1.08: Signifier display compression.
   * h2 (Söhne 28px) → 1.20; h3 (20px) → 1.30 per DESIGN.md.
   * --tracking-display: -0.02em (display size negative tracking). */
  --leading-body:     1.65;
  --leading-tight:    1.08;
  --tracking-display: -0.02em;

  /* ─── Spacing ──────────────────────────────────────────────────── */
  /* 4px base grid; schema spine: --space-N = N×4 px.
     OpenAI's DESIGN.md §5 scale (4 8 12 16 24 32 48 64 96 128) maps
     naturally onto the spine — 64px lives in --space-16 (brand ext). */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* Brand extension — 64px gap used between major page sections. */
  --space-16: 64px;

  /* Section rhythm — generous whitespace is the primary divider. */
  --section-y-desktop: 96px;
  --section-y-tablet:  64px;
  --section-y-phone:   48px;

  /* ─── Radius ───────────────────────────────────────────────────── */
  /* Uniformly soft: 12px buttons/inputs; 16px cards; 9999px chips/pills. */
  --radius-sm:   12px;
  --radius-md:   16px;
  --radius-lg:   16px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────── */
  /* No shadow by default; hover reveals a whisper lift. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised: 0 4px 16px rgba(13, 13, 13, 0.06);

  /* ─── Focus ────────────────────────────────────────────────────── */
  --focus-ring: 0 0 0 3px rgba(16, 163, 127, 0.12);

  /* ─── Motion ───────────────────────────────────────────────────── */
  --motion-fast:   150ms;
  --motion-base:   220ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);

  /* ─── Layout ───────────────────────────────────────────────────── */
  --container-max:            1200px;
  --container-gutter-desktop: 48px;
  --container-gutter-tablet:  24px;
  --container-gutter-phone:   24px;
}
`,ie=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/opencode-ai/tokens.css
 *
 * Structured token bindings for "Design System Inspired by OpenCode".
 * Terminal-native dark theme: warm near-black canvas, Berkeley Mono as
 * the sole typeface, flat depth (no shadows), Apple HIG semantic colors.
 *
 * Key brand decisions encoded here:
 *   - Dark-on-dark: #201d1d (warm near-black) as page bg, #302c2c for surface
 *   - #fdfcfc (barely-warm off-white) as primary text — never pure white
 *   - Berkeley Mono ONLY — no second typeface, no typographic variation
 *   - FLAT depth system — zero shadows; depth via borders and bg shifts
 *   - Warm borders: rgba(15,0,0,0.12) — subtle red tint ties to warm palette
 *   - Apple HIG semantic colors (#007aff, #ff3b30, #30d158, #ff9f0a)
 *   - Narrow reading column (~880px) — single-column, text-centric
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (dark theme) ────────────────────────────────────────
   * Warm near-black → slightly lighter dark surface.
   * The reddish warmth (rgb(32,29,29)) is subtle but essential. */
  --bg: #201d1d;             /* OpenCode Dark — warm near-black with reddish undertone */
  --surface: #302c2c;        /* Dark Surface — elevated containers, slight differentiation */
  --surface-warm: var(--surface); /* alias — no separate warm tier needed */

  /* ─── Foreground (on dark) ────────────────────────────────────────
   * Warm off-white text — never clinical pure white. */
  --fg: #fdfcfc;             /* OpenCode Light — barely-warm off-white primary text */
  --fg-2: #c8c6c4;           /* Warm light gray — secondary on dark */
  --muted: #9a9898;          /* Mid Gray — secondary text, muted links */
  --meta: #6e6e73;           /* Text Muted — disabled text, placeholders */

  /* ─── Border (warm transparent) ──────────────────────────────────
   * The warm red tint (rgba(15,0,0,...)) in borders ties them to the
   * overall warm dark palette. Use #646262 for visible outlines. */
  --border: #464343;         /* Warm dark border — visible against bg */
  --border-soft: #302c2c;    /* Same as surface — barely-visible inner separator */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Apple system blue — #007aff. Familiar, trustworthy, high-contrast
   * on the warm dark canvas. The full three-stage hover sequence:
   * #007aff → #0056b3 (hover) → #004085 (active). */
  --accent: #007aff;
  --accent-on: #ffffff;
  --accent-hover: #0056b3;   /* Accent Blue Hover — explicitly defined */
  --accent-active: #004085;  /* Accent Blue Active — deeply pressed */

  /* ─── Semantic (Apple HIG palette) ────────────────────────────────
   * Familiar trustworthy signals on a dark terminal canvas. */
  --success: #30d158;        /* Apple system green */
  --warn: #ff9f0a;           /* Apple system orange */
  --danger: #ff3b30;         /* Apple system red */

  /* ─── Typography ──────────────────────────────────────────────────
   * Berkeley Mono is the ONLY font. No typographic variation — no
   * display face, no body face — "everything is code" philosophy.
   * Hierarchy via size and weight alone (400 / 500 / 700). */
  --font-display: "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  --font-body: "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  --font-mono: "Berkeley Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  /* Type scale — DESIGN.md §3. Heading 1 at 38px, rest at 16px variants.
   * The system is intentionally compressed — terminal scale. */
  --text-xs: 12px;
  --text-sm: 14px;           /* Caption — footnotes, metadata (lh 2.0) */
  --text-base: 16px;         /* Body — standard text (weight 400 or 500) */
  --text-lg: 18px;
  --text-xl: 22px;
  --text-2xl: 28px;
  --text-3xl: 38px;          /* Heading 1 — hero headlines (weight 700, lh 1.5) */
  --text-4xl: 48px;          /* Extended display if needed */

  --leading-body: 1.5;       /* Monospace grid breathes at 1.5 */
  --leading-tight: 1.0;      /* Compact labels, tab items */
  --tracking-display: 0em;   /* Monospace doesn't need letter-spacing manipulation */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 8px base unit. Generous extended scale (up to 96px) for sections.
   * Sections separated by spacing alone — no decorative dividers. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --section-y-desktop: 80px; /* Terminal-like generous spacing between sections */
  --section-y-tablet: 64px;
  --section-y-phone: 48px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Minimal: 4px everywhere, 6px for form inputs (the roundest element).
   * "Terminals don't have rounded corners" — utilitarian aesthetic. */
  --radius-sm: 4px;          /* Default for all elements */
  --radius-md: 6px;          /* Form inputs — slightly more approachable */
  --radius-lg: 8px;          /* Rare — largest container radius */
  --radius-pill: 9999px;     /* Declared but not part of the OpenCode aesthetic */

  /* ─── Elevation (FLAT) ────────────────────────────────────────────
   * Zero shadows — consistent with the terminal aesthetic.
   * Depth via border treatments and background color shifts ONLY.
   * All three levels use rings/outlines, never blur shadows. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 0 0 2px var(--border); /* Slightly more prominent ring — no blur */

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Accent blue focus ring — no shadow-based ring (flat system). */
  --focus-ring: 0 0 0 2px var(--accent);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Terminal-inspired: instant state changes. 100ms for snappy feedback. */
  --motion-fast: 100ms;
  --motion-base: 150ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * Narrow reading column (880px) — single-column, text-centric.
   * Generous side margins focus attention on the content. */
  --container-max: 880px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 20px;
  --container-gutter-phone: 16px;
}
`,O=1,F="od-design-tokens/v1",L="TOKEN_SCHEMA",j="2026-06-06T00:00:00.000Z",R={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},z={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:2,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},H=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--bg"},{"name":"--surface","value":"#fafafa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#000000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--fg"},{"name":"--fg-2","value":"#262626","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--fg-2"},{"name":"--muted","value":"#737373","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--muted"},{"name":"--meta","value":"#a3a3a3","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--meta"},{"name":"--border","value":"#e5e5e5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--border-soft"},{"name":"--accent","value":"#000000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#262626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#404040","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"SF Pro Rounded\\", system-ui, -apple-system, system-ui","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:143"],"sourceName":"--font-display"},{"name":"--font-body","value":"ui-sans-serif, system-ui, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji\\"","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:144"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", \\"Courier New\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:145"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:152"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:153"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:154"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:155"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"30px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:156"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:157"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:164"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:165"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:166"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:174"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:176"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:177"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:178"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:179"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:180"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"112px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:186"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:187"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:188"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:198"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:199"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:200"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:201"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:210"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:211"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:212"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, #3b82f6, transparent 50%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:221"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:229"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"140ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:230"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:231"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:238"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:239"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:240"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:241"],"sourceName":"--container-gutter-phone"}]'),le={schemaVersion:O,format:F,contract:L,generatedAt:j,source:R,summary:z,tokens:H},P=1,U="od-design-tokens/v1",V="TOKEN_SCHEMA",W="2026-06-06T00:00:00.000Z",J={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},K={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Z=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--bg"},{"name":"--surface","value":"#f5f5f5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fafafa","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#0d0d0d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--fg"},{"name":"--fg-2","value":"#1a1a1a","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--fg-2"},{"name":"--muted","value":"#6e6e6e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--muted"},{"name":"--meta","value":"#9b9b9b","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--meta"},{"name":"--border","value":"#e5e5e5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--border"},{"name":"--border-soft","value":"#ededed","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--border-soft"},{"name":"--accent","value":"#10a37f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#0a7a5e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--accent-active"},{"name":"--success","value":"#10a37f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--success"},{"name":"--warn","value":"#f5a623","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--warn"},{"name":"--danger","value":"#ef4146","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Signifier\\", \\"Source Serif Pro\\", Georgia, ui-serif, serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Söhne\\", \\"Inter\\", system-ui, -apple-system, \\"Segoe UI\\", sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Söhne Mono\\", ui-monospace, \\"JetBrains Mono\\", Menlo, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.65","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.08","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:112"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 4px 16px rgba(13, 13, 13, 0.06)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(16, 163, 127, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"220ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:125"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.16, 1, 0.3, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--container-gutter-phone"}]'),de={schemaVersion:P,format:U,contract:V,generatedAt:W,source:J,summary:K,tokens:Z},Y=1,q="od-design-tokens/v1",X="TOKEN_SCHEMA",Q="2026-06-06T00:00:00.000Z",ee={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},se={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ne=JSON.parse('[{"name":"--bg","value":"#201d1d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--bg"},{"name":"--surface","value":"#302c2c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#fdfcfc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--fg"},{"name":"--fg-2","value":"#c8c6c4","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9a9898","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--muted"},{"name":"--meta","value":"#6e6e73","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--meta"},{"name":"--border","value":"#464343","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--border"},{"name":"--border-soft","value":"#302c2c","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--border-soft"},{"name":"--accent","value":"#007aff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#0056b3","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#004085","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--accent-active"},{"name":"--success","value":"#30d158","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--success"},{"name":"--warn","value":"#ff9f0a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--warn"},{"name":"--danger","value":"#ff3b30","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Berkeley Mono\\", \\"IBM Plex Mono\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Berkeley Mono\\", \\"IBM Plex Mono\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Berkeley Mono\\", \\"IBM Plex Mono\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"38px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.0","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 0 0 2px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px var(--accent)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"880px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:125"],"sourceName":"--container-gutter-phone"}]'),ue={schemaVersion:Y,format:q,contract:X,generatedAt:Q,source:ee,summary:se,tokens:ne};export{oe as _,re as a,ae as b,ie as c,ce as d,te as e,ue as f,de as g,le as h};
