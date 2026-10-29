const e="od-design-system-project/v1",s="hashicorp",n="HashiCorp",a="Backend & Data",r="Bundled Open Design package for HashiCorp, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},t={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},c="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ae={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:t,usage:c,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},p="od-design-system-project/v1",m="hud",f="HUD Design System",h="Themed & Unique",k="Bundled Open Design package for HUD Design System, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",x="components.manifest.json",w="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},re={schemaVersion:p,id:m,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:x,importMode:w,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="huggingface",S="Hugging Face",D="AI & LLM",I="Bundled Open Design package for Hugging Face, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",M={type:"bundled",origin:"Open Design curated bundled fixture"},E={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},G="USAGE.md",C="components.manifest.json",T="normalized",H={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},_={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},oe={schemaVersion:N,id:A,name:S,category:D,description:I,source:M,files:E,usage:G,componentsManifest:C,importMode:T,craft:H,sourceFiles:_},te=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/hashicorp/tokens.css
 *
 * Structured token bindings for "Design System Inspired by HashiCorp" —
 * enterprise infrastructure-as-code made tangible: a dramatic near-black
 * canvas, engineering-grade typography, whisper-level shadows, and one
 * functional blue accent reserved for actionable signals.
 *
 * Brand identity in three sentences:
 *   1. Dark-mode-native canvas (#15181e Dark Charcoal → #0d0e12 Near Black).
 *      DESIGN.md §1 names these as the "dramatic dark-mode for hero areas
 *      and product showcases" — we bind --bg/--surface to the iconic
 *      pair because HashiCorp's brand-defining surfaces are dark.
 *   2. HashiCorp Sans for headings (600–700 weight, kern enabled, 1.17
 *      line-height at 82px display); system-ui for body, navigation, and
 *      functional text. The brand font carries the weight; system-ui
 *      carries the words.
 *   3. Action Blue (#1060ff) as the lone functional accent on dark; the
 *      multi-product palette (Terraform purple, Vault yellow, Waypoint
 *      teal, Vagrant blue) lives in DESIGN.md §2 as product-scoped
 *      colors and intentionally does NOT bind here — DESIGN.md §7 forbids
 *      "product brand colors outside their product context".
 *
 * Brand-specific schema decisions (each one bends a schema convention
 * to match HashiCorp's voice rather than the cross-brand default):
 *
 *   1. --bg is #15181e (Dark Charcoal), not white. DESIGN.md describes
 *      the brand's "dual mode" — clean white informational sections AND
 *      dramatic dark hero/product areas — but the dark surfaces are the
 *      identity-defining ones; that is where HashiCorp Sans at 82px,
 *      the multi-product accent colors, and the whisper shadows all
 *      do their work. Binding --bg to the dark canvas honors the
 *      iconic look and matches the "dark-friendly enterprise UI"
 *      identity called out in the brand interpretation.
 *
 *   2. --fg ramp is independently bound across all four tiers
 *      (Near White #efeff1 → Mid Gray #d5d7db → Cool Gray #b2b6bd →
 *      Dark Gray #656a76). DESIGN.md §2 lists each as a named role —
 *      "Primary text on dark / Button text on dark / Border accents /
 *      Helper text" — and the brand genuinely walks the full ramp.
 *      Collapsing --fg-2 or --muted to siblings would flatten the
 *      ladder that gives HashiCorp content its enterprise density.
 *
 *   3. --border is rgba(178, 182, 189, 0.4) — the literal alpha used
 *      on DESIGN.md §4's "Primary Dark" button border. Binding
 *      --border to the alpha (not a solid hex) lets \`--elev-ring\`
 *      reproduce the cool-gray hairline and lets components reach the
 *      same value via \`border: 1px solid var(--border)\`.
 *      --border-soft drops to 0.15 alpha for inner separators that
 *      should not visually compete with the button edge.
 *
 *   4. --accent is Action Blue (#1060ff), NOT a product brand color.
 *      DESIGN.md §2 explicitly classifies Terraform purple / Vault
 *      yellow / Waypoint teal as product-scoped tokens; the corporate
 *      brand's functional CTA color on dark is #1060ff. --accent-hover
 *      LIFTS to #2b89ff (DESIGN.md "Bright Blue — Active links, hover
 *      accent") instead of darkening — the schema's default black-mix
 *      formula would lose contrast on the dark canvas. --accent-active
 *      then darkens via the standard formula for the press state.
 *
 *   5. --warn is #bb5a00 (DESIGN.md Amber-200), not the schema default
 *      #eab308. The brighter yellow would clash with HashiCorp's
 *      muted enterprise palette and read as "Vault product color"
 *      rather than "warning state". The burnt-amber sits warm but
 *      restrained on the dark canvas.
 *
 *   6. --font-display loads HashiCorp Sans (the custom brand face
 *      called out throughout DESIGN.md) with a substantive fallback
 *      stack; --font-body uses system-ui per DESIGN.md §3's brand/
 *      system split ("HashiCorp Sans for headings only (17px+),
 *      system-ui for everything else"). Mixing the two is the
 *      structural rule — never set body copy in HashiCorp Sans.
 *
 *   7. Type scale tops at 82px (--text-4xl) with 1.17 line-height
 *      (--leading-tight). DESIGN.md §3 lists 82px / 52px / 42px / 34px
 *      / 26px as the documented HashiCorp Sans tiers; the 8 schema
 *      slots map onto five of those plus body sizes 20/16/14/13.
 *      --tracking-display is \`normal\` because DESIGN.md §3 explicitly
 *      sets the 82px hero to letter-spacing \`normal\` — the brand
 *      relies on kerning, not tracking, for its monolithic feel.
 *
 *   8. --leading-body is 1.63 (DESIGN.md's relaxed 1.63–1.69 body
 *      range) — generous reading rhythm BELOW the tight 1.17 headings
 *      is the brand's "weight at the top of each section" rule.
 *      --leading-tight is 1.17, the documented display line-height.
 *
 *   9. --radius scale is tight: 5px / 8px / 8px / 5px. DESIGN.md §5
 *      caps radius at 8px ("nothing pill-shaped or circular") and
 *      uses 5px for primary buttons, badges, and inputs. We bind
 *      --radius-lg to the same 8px ceiling (HashiCorp does not have
 *      a third tier above cards) and --radius-pill to 5px, matching
 *      DESIGN.md §4's "Badges / Pills — Radius: 5px". The brand's
 *      "no true pill" rule is structural, not stylistic.
 *
 *  10. --elev-raised is the whisper-shadow VERBATIM from DESIGN.md §6
 *      Level 1: dual-layer at 5% opacity on a cool-gray base. The
 *      doc says it explicitly: "If you can see the shadow, it's too
 *      strong." We must not strengthen this in component CSS —
 *      enterprise stability is communicated through restraint.
 *
 *  11. --focus-ring is 3px solid var(--accent) (sharp ring, no halo),
 *      per DESIGN.md §6 ("Focus (Level 2) — 3px solid"). Sharp focus
 *      is the engineered alternative to the schema's 3px alpha glow.
 *
 *  12. --section-y-desktop is 80px (DESIGN.md §5 "Enterprise breathing
 *      room: Generous vertical spacing between sections (48px–80px+)").
 *      --container-max is 1150px exactly — DESIGN.md §5 names ~1150px
 *      as the documented xl breakpoint and max content width.
 *
 * Source contracts:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *   - A2 fallback parity:   design-systems/_schema/defaults.css
 *   - Lint enforcement:     apps/daemon/src/lint-artifact.ts
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the schema. The HashiCorp Sans face is referenced by
 * name only — the stack lists OS fallbacks so artifacts render
 * acceptably even when the brand font is not loaded.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels — dark-mode canvas) ───────────────────────
   * DESIGN.md §1 names #15181e and #0d0e12 as the two dark-mode
   * surfaces. --surface-warm aliases --surface because the brand is
   * famously achromatic on dark — depth comes from luminance steps
   * and whisper shadows, not from warm-tinting one surface against
   * another. (DESIGN.md §7: "Don't use pure black (#000000) for dark
   * backgrounds — use #15181e or #0d0e12.") */
  --bg: #15181e;                       /* Dark Charcoal — hero canvas */
  --surface: #0d0e12;                  /* Near Black — cards, inputs */
  --surface-warm: var(--surface);      /* alias — no warm tier on dark */

  /* ─── Foreground ramp (4 levels) ──────────────────────────────────
   * Near White → Mid Gray → Cool Gray → Dark Gray. All four are named
   * in DESIGN.md §2 with distinct roles, so we bind each independently
   * (no aliasing). #efeff1 instead of #ffffff matters — pure white
   * against #15181e reads as harsh; the slight warmth keeps the
   * enterprise tone from feeling clinical. */
  --fg: #efeff1;                       /* Near White — primary text on dark */
  --fg-2: #d5d7db;                     /* Mid Gray — body description, button text */
  --muted: #b2b6bd;                    /* Cool Gray — captions, tertiary text */
  --meta: #656a76;                     /* Dark Gray — helper text, disabled */

  /* ─── Border (2 levels) ──────────────────────────────────────────
   * DESIGN.md §4 names rgba(178, 182, 189, 0.4) as the primary dark
   * button border — we lift that exact alpha into --border so
   * --elev-ring and \`border: 1px solid var(--border)\` both reproduce
   * the documented hairline. --border-soft drops to 0.15 for inner
   * row separators that must not compete with the card edge. */
  --border: rgba(178, 182, 189, 0.4);  /* Cool Gray @ 0.4 — primary button edge */
  --border-soft: rgba(178, 182, 189, 0.15); /* inner separator — barely-there */

  /* ─── Accent ─────────────────────────────────────────────────────
   * Action Blue — the corporate brand's single functional CTA color
   * on dark. Hard cap of ≤2 visible uses per screen aligns with
   * DESIGN.md §7's restraint: the multi-product palette (Terraform
   * purple, Vault yellow) is product-scoped and intentionally does
   * NOT bind here. Hover LIFTS to Bright Blue rather than darkening
   * (the schema default would lose contrast on dark). */
  --accent: #1060ff;                   /* Action Blue — primary CTA on dark */
  --accent-on: #ffffff;                /* white label on saturated blue */
  --accent-hover: #2b89ff;             /* Bright Blue — DESIGN.md §2 active links */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ───────────────────────────────────────────────────
   * --warn overrides to DESIGN.md §2 Amber #bb5a00 (the schema's
   * #eab308 would read as "Vault product color" on a HashiCorp
   * surface). --success and --danger inherit the schema defaults —
   * DESIGN.md does not define a brand-specific success color, and
   * #731e25 (DESIGN.md's documented red) is a deep error-background
   * tone, not the foreground signal a --danger token needs. */
  --success: #16a34a;
  --warn: #bb5a00;                     /* DESIGN.md Amber-200 — warning states */
  --danger: #dc2626;

  /* ─── Typography ─────────────────────────────────────────────────
   * Brand/system split per DESIGN.md §3. HashiCorp Sans is the
   * heading face; system-ui handles body, navigation, and functional
   * text. The fallback chains let artifacts render acceptably when
   * the custom face is not loaded. */
  --font-display: "HashiCorp Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §3 Hierarchy table. The 8 schema slots
   * map the HashiCorp Sans display tiers (82/52/42/26) plus the
   * documented body/caption sizes (20/16/14/13). Sub-heading 34px
   * and small-title 19px live inline in components when needed. */
  --text-xs: 13px;                     /* caption / uppercase label */
  --text-sm: 14px;                     /* small body */
  --text-base: 16px;                   /* body / nav / button text */
  --text-lg: 20px;                     /* body large / hero description */
  --text-xl: 26px;                     /* card title */
  --text-2xl: 42px;                    /* feature heading */
  --text-3xl: 52px;                    /* section heading */
  --text-4xl: 82px;                    /* display hero — "infrastructure-grade" */

  /* DESIGN.md §3: tight headings (1.17–1.21) over relaxed body
   * (1.50–1.69). We sit at the documented endpoints — 1.17 hero,
   * 1.63 body. --tracking-display is \`normal\` because DESIGN.md §3
   * lists the 82px hero at letter-spacing \`normal\` (kerning is on
   * via font-feature-settings, not tracking). */
  --leading-body: 1.63;
  --leading-tight: 1.17;
  --tracking-display: normal;

  /* ─── Spacing ────────────────────────────────────────────────────
   * 8px base unit (DESIGN.md §5). The 4/8/12/16/20/24/32/48 tier
   * covers structural rhythm; sub-tier increments (2/3/6/7/9/11)
   * live per-component because they are too fine for the shared
   * schema. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §5 "Enterprise breathing room
   * (48–80px+)". 80px desktop sits at the documented top end;
   * we collapse to 56px on tablet and 40px on phone. */
  --section-y-desktop: 80px;
  --section-y-tablet: 56px;
  --section-y-phone: 40px;

  /* ─── Radius ─────────────────────────────────────────────────────
   * DESIGN.md §5 caps radius at 8px and uses 5px for buttons/inputs/
   * badges. --radius-lg sits at the 8px ceiling (no third tier
   * exists in the brand). --radius-pill binds to 5px because
   * DESIGN.md §4 explicitly says "Badges / Pills — Radius: 5px" —
   * HashiCorp does not have a true 9999px pill shape; the no-pill
   * rule is structural. */
  --radius-sm: 5px;                    /* DESIGN.md "Comfortable" — buttons, inputs */
  --radius-md: 8px;                    /* DESIGN.md "Card" — cards, containers */
  --radius-lg: 8px;                    /* same 8px ceiling — no third tier */
  --radius-pill: 5px;                  /* DESIGN.md §4 — no true pills, 5px chips */

  /* ─── Elevation (3 levels) ───────────────────────────────────────
   * Whisper shadows VERBATIM from DESIGN.md §6 Level 1: dual-layer
   * at 5% opacity on a cool-gray (97, 104, 117) base. The doc is
   * emphatic: "If you can see the shadow, it's too strong." Never
   * strengthen these values in component overrides. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised:
    rgba(97, 104, 117, 0.05) 0px 1px 1px,
    rgba(97, 104, 117, 0.05) 0px 2px 2px;

  /* ─── Focus ring ─────────────────────────────────────────────────
   * DESIGN.md §6 Level 2: "3px solid var(--mds-color-focus-action-
   * external)". Sharp 3px ring at --accent, not the schema's alpha
   * glow — HashiCorp's focus is engineered, not atmospheric. */
  --focus-ring: 0 0 0 3px var(--accent);

  /* ─── Motion ─────────────────────────────────────────────────────
   * Standard durations — HashiCorp's enterprise tone leans on type
   * and shadow restraint, not motion choreography. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ─────────────────────────────────────────────────────
   * 1150px max content width per DESIGN.md §5 ("Max content width:
   * ~1150px (xl breakpoint)"). Gutters narrow on mobile to preserve
   * the line-length-as-craft feel. */
  --container-max: 1150px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,ce=`/* design-systems/hud/tokens.css
 * Structured token bindings for HUD.
 * HUD interface language with dark transparent panels, cyan telemetry, and compact status readouts.
 */

:root {
  --bg: #090b12;
  --surface: #121722;
  --surface-warm: #1b2233;
  --fg: #f8fafc;
  --fg-2: #cbd5e1;
  --muted: #94a3b8;
  --meta: #60a5fa;
  --border: #2a3447;
  --border-soft: #1d2636;
  --accent: #60a5fa;
  --accent-on: #06101d;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #22c55e;
  --warn: #fbbf24;
  --danger: #fb7185;
  --font-display: "IBM Plex Mono", ui-monospace, monospace;
  --font-body: "IBM Plex Mono", ui-monospace, monospace;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --text-xs: 11px;
  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 28px;
  --text-3xl: 40px;
  --text-4xl: 56px;
  --leading-body: 1.45;
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
  --section-y-desktop: 80px;
  --section-y-tablet: 60px;
  --section-y-phone: 42px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 24px 72px rgba(0, 0, 0, 0.42);
  --focus-ring: 0 0 0 4px rgba(96, 165, 250, 0.28);
  --motion-fast: 100ms;
  --motion-base: 180ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1280px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,le=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/huggingface/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Hugging Face".
 * ML community hub: sunshine yellow badge accent, monospace identity,
 * crisp 1px borders, brutalist-adjacent low radius, dense power-user layout.
 *
 * Key brand decisions encoded here:
 *   - HF Yellow (#ffd21e) as the lone saturated accent — badge/badge/header strip
 *   - Ink on off-white: deep slate (#0d1117) text on #fafafa canvas
 *   - IBM Plex Mono for headings and tags — "config file is the README" vibe
 *   - Source Sans Pro for body prose — contrasting readable counterpart
 *   - 4–6px radii — closer to brutalist than rounded
 *   - Crisp 1px borders (#e5e7eb) — borders that announce themselves
 *   - Dense tables and tight padding — built for power users
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Off-white canvas with white cards — the yellow accent on a
   * neutral foundation maximizes its signal impact. */
  --bg: #fafafa;             /* Canvas Subtle — the default off-white hub background */
  --surface: #ffffff;        /* Canvas — card surfaces, white panels */
  --surface-warm: #fff4cc;   /* HF Yellow Soft — callout backgrounds, warm tint */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Deep slate — dark, readable, technical. */
  --fg: #0d1117;             /* Ink Primary — primary text, headings */
  --fg-2: #374151;           /* Ink Secondary — body prose */
  --muted: #6b7280;          /* Ink Muted — captions, file paths, model authors */
  --meta: var(--muted);      /* alias — same muted for metadata */

  /* ─── Border ──────────────────────────────────────────────────────
   * Crisp, visible borders — they announce themselves rather than hiding. */
  --border: #e5e7eb;         /* Border Default — standard 1px hairline */
  --border-soft: #f3f4f6;    /* Border Subtle — inner divider, row separator */

  /* ─── Accent ──────────────────────────────────────────────────────
   * HF Yellow — the sunshine yellow that makes Hugging Face instantly
   * recognizable. Used for "new" pill, model-card header strip, badges.
   * Dark text on yellow (--accent-on: #0d1117) for contrast. */
  --accent: #ffd21e;
  --accent-on: #0d1117;      /* Dark text on yellow — sufficient contrast */
  --accent-hover: #f59e0b;   /* HF Yellow Deep — hover/active */
  --accent-active: color-mix(in oklab, var(--accent), black 20%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Task-category colors used for model badges. Success uses vision green.
   * Warning uses HF Yellow Deep (same as hover — reinforces the brand). */
  --success: #16a34a;        /* Vision Green — also "build succeeded" */
  --warn: #f59e0b;           /* HF Yellow Deep — warning / rate limit */
  --danger: #dc2626;         /* Error Red — failed build, broken model */

  /* ─── Typography ──────────────────────────────────────────────────
   * IBM Plex Mono for headings and tags — they look like code strings.
   * Source Sans Pro for body — readable, prose-optimized counterpart.
   * Weight cap at 600 — 700 is too loud against yellow. */
  --font-display: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-body: "Source Sans Pro", Inter, system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Type scale — DESIGN.md §3. Display 48px, H1 32px, H2 24px, H3 18px. */
  --text-xs: 12px;           /* Tag / Badge — IBM Plex Mono */
  --text-sm: 13px;           /* Caption — author byline, timestamp */
  --text-base: 15px;         /* Body — standard prose, model card */
  --text-lg: 18px;           /* Body Large / H3 — sub-section */
  --text-xl: 24px;           /* H2 — section heading */
  --text-2xl: 32px;          /* H1 — page heading, model name */
  --text-3xl: 40px;          /* Display — for marketing contexts */
  --text-4xl: 48px;          /* Display Hero — marketing hero */

  --leading-body: 1.55;      /* Source Sans Pro body reading */
  --leading-tight: 1.1;      /* IBM Plex Mono display */
  --tracking-display: -0.01em;

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 4px base unit. Dense table padding (8px 16px per cell).
   * Section rhythm 64–96px — community hub needs breathing room. */
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
   * 4–6px — brutalist-adjacent. Borders announce themselves.
   * Do not round cards to 12px+ — the crisp geometry is intentional. */
  --radius-sm: 4px;          /* Tags, small chips — nearest to sharp */
  --radius-md: 6px;          /* Cards, inputs, buttons — the primary radius */
  --radius-lg: 8px;          /* Slightly larger containers */
  --radius-pill: 9999px;     /* Model task badges, status pills */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Border-based containment — 1px borders are the primary depth cue.
   * Table row hover uses background shift (#f3f4f6). */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 2px 8px color-mix(in oklab, var(--fg), transparent 90%);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Dark ring matching the primary ink color. */
  --focus-ring: 0 0 0 3px rgba(13, 17, 23, 0.1);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Quick hover (120ms) — community hub interactions should feel snappy.
   * Tag pop at 1.05× scale is the only exception to flat-on-hover. */
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1280px container with 280px sidebar for model browser.
   * 24px gutter — content-dense layout. */
  --container-max: 1280px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,F=1,$="od-design-tokens/v1",P="TOKEN_SCHEMA",j="2026-06-06T00:00:00.000Z",V={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},O={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},R=JSON.parse('[{"name":"--bg","value":"#15181e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--bg"},{"name":"--surface","value":"#0d0e12","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#efeff1","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d5d7db","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--fg-2"},{"name":"--muted","value":"#b2b6bd","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--muted"},{"name":"--meta","value":"#656a76","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:142"],"sourceName":"--meta"},{"name":"--border","value":"rgba(178, 182, 189, 0.4)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(178, 182, 189, 0.15)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--border-soft"},{"name":"--accent","value":"#1060ff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#2b89ff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:162"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:163"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--success"},{"name":"--warn","value":"#bb5a00","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:174"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"HashiCorp Sans\\", \\"Inter\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--font-display"},{"name":"--font-body","value":"system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:182"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:183"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:189"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:190"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:191"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:192"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:193"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:194"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"52px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:195"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"82px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:196"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.63","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:203"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.17","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:204"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"normal","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:205"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:212"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:213"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:214"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:215"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:216"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:217"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:218"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:224"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:225"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:226"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"5px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:235"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:236"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:237"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"5px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:238"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:245"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:246"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(97, 104, 117, 0.05) 0px 1px 1px, rgba(97, 104, 117, 0.05) 0px 2px 2px","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:247"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px var(--accent)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:255"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:260"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:261"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:262"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1150px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:268"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:269"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:270"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:271"],"sourceName":"--container-gutter-phone"}]'),ie={schemaVersion:F,format:$,contract:P,generatedAt:j,source:V,summary:O,tokens:R},z=1,L="od-design-tokens/v1",U="TOKEN_SCHEMA",W="2026-06-06T00:00:00.000Z",Y={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},J={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},K=JSON.parse('[{"name":"--bg","value":"#090b12","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#121722","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1b2233","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8fafc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#cbd5e1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#94a3b8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#60a5fa","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#2a3447","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#1d2636","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#60a5fa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#06101d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#22c55e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#fbbf24","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#fb7185","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"IBM Plex Mono\\", ui-monospace, monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"IBM Plex Mono\\", ui-monospace, monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"IBM Plex Mono\\", ui-monospace, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.45","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 72px rgba(0, 0, 0, 0.42)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(96, 165, 250, 0.28)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"180ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),de={schemaVersion:z,format:L,contract:U,generatedAt:W,source:Y,summary:J,tokens:K},Z=1,q="od-design-tokens/v1",Q="TOKEN_SCHEMA",X="2026-06-06T00:00:00.000Z",ee={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},se={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ne=JSON.parse('[{"name":"--bg","value":"#fafafa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fff4cc","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#0d1117","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--fg"},{"name":"--fg-2","value":"#374151","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--fg-2"},{"name":"--muted","value":"#6b7280","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--muted"},{"name":"--meta","value":"var(--muted)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--meta"},{"name":"--border","value":"#e5e7eb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--border"},{"name":"--border-soft","value":"#f3f4f6","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ffd21e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--accent"},{"name":"--accent-on","value":"#0d1117","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#f59e0b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 20%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--success"},{"name":"--warn","value":"#f59e0b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"IBM Plex Mono\\", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Source Sans Pro\\", Inter, system-ui, -apple-system, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"IBM Plex Mono\\", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.55","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 2px 8px color-mix(in oklab, var(--fg), transparent 90%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(13, 17, 23, 0.1)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:114"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--container-gutter-phone"}]'),ue={schemaVersion:Z,format:q,contract:Q,generatedAt:X,source:ee,summary:se,tokens:ne};export{oe as _,re as a,ae as b,le as c,ce as d,te as e,ue as f,de as g,ie as h};
