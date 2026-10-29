const e="od-design-system-project/v1",s="lamborghini",n="Lamborghini",r="Automotive",a="Bundled Open Design package for Lamborghini, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},c={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},t="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},As={schemaVersion:e,id:s,name:n,category:r,description:a,source:o,files:c,usage:t,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="levels",f="Levels",h="Layout & Structure",k="Bundled Open Design package for Levels, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ss={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="linear-app",S="Linear",$="Productivity & SaaS",_="Bundled Open Design package for Linear, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",I={type:"bundled",origin:"Open Design curated bundled fixture"},T={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},D="USAGE.md",E="components.manifest.json",C="normalized",M={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},G={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},$s={schemaVersion:N,id:A,name:S,category:$,description:_,source:I,files:T,usage:D,componentsManifest:E,importMode:C,craft:M,sourceFiles:G},L="od-design-system-project/v1",F="lingo",j="Lingo",V="Creative & Artistic",z="Bundled Open Design package for Lingo, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",O={type:"bundled",origin:"Open Design curated bundled fixture"},P={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},R="USAGE.md",H="components.manifest.json",U="normalized",J={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},K={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},_s={schemaVersion:L,id:F,name:j,category:V,description:z,source:O,files:P,usage:R,componentsManifest:H,importMode:U,craft:J,sourceFiles:K},q="od-design-system-project/v1",Z="loom",W="Loom Design System",X="Themed & Unique",Q="Bundled Open Design package for Loom Design System, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Y={type:"bundled",origin:"Open Design curated bundled fixture"},ee={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},se="USAGE.md",ne="components.manifest.json",re="normalized",ae={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},oe={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Is={schemaVersion:q,id:Z,name:W,category:X,description:Q,source:Y,files:ee,usage:se,componentsManifest:ne,importMode:re,craft:ae,sourceFiles:oe},ce="od-design-system-project/v1",te="lovable",le="Lovable",ie="Developer Tools",de="Bundled Open Design package for Lovable, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",ue={type:"bundled",origin:"Open Design curated bundled fixture"},me={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},pe="USAGE.md",fe="components.manifest.json",he="normalized",ke={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},ye={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ts={schemaVersion:ce,id:te,name:le,category:ie,description:de,source:ue,files:me,usage:pe,componentsManifest:fe,importMode:he,craft:ke,sourceFiles:ye},ge="od-design-system-project/v1",be="luxury",we="Luxury",xe="Professional & Corporate",ve="Bundled Open Design package for Luxury, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Be={type:"bundled",origin:"Open Design curated bundled fixture"},Ne={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},Ae="USAGE.md",Se="components.manifest.json",$e="normalized",_e={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},Ie={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ds={schemaVersion:ge,id:be,name:we,category:xe,description:ve,source:Be,files:Ne,usage:Ae,componentsManifest:Se,importMode:$e,craft:_e,sourceFiles:Ie},Es=`/* design-systems/lamborghini/tokens.css
 *
 * Structured token bindings for Lamborghini.
 * sharp black-gold performance interface with angular premium energy.
 */

:root {
  --bg: #050505;
  --surface: #141414;
  --surface-warm: #211b0b;
  --fg: #f8f4e6;
  --fg-2: #d8ceb0;
  --muted: #9b927d;
  --meta: #d4af37;
  --border: #3a321d;
  --border-soft: #282315;
  --accent: #d4af37;
  --accent-on: #050505;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #39a852;
  --warn: #f7c948;
  --danger: #e63946;
  --font-display: "Lamborghini", "Eurostile", Arial, sans-serif;
  --font-body: "Inter", Arial, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 26px;
  --text-2xl: 42px;
  --text-3xl: 64px;
  --text-4xl: 90px;
  --leading-body: 1.48;
  --leading-tight: 0.96;
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
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 28px 84px rgba(0, 0, 0, 0.54);
  --focus-ring: 0 0 0 4px rgba(212, 175, 55, 0.32);
  --motion-fast: 120ms;
  --motion-base: 210ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --container-max: 1240px;
  --container-gutter-desktop: 40px;
  --container-gutter-tablet: 28px;
  --container-gutter-phone: 18px;
}
`,Cs=`/* design-systems/levels/tokens.css
 * Structured token bindings for Levels.
 * health data product with calm cream surfaces, green metabolic signal, and nutrition card rhythm.
 */

:root {
  --bg: #fbf7ef;
  --surface: #ffffff;
  --surface-warm: #eef7ed;
  --fg: #1f2a24;
  --fg-2: #435147;
  --muted: #788276;
  --meta: #2f8f46;
  --border: #dbe3d7;
  --border-soft: #edf1ea;
  --accent: #2f8f46;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #16a34a;
  --warn: #d97706;
  --danger: #dc2626;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 34px;
  --text-3xl: 48px;
  --text-4xl: 66px;
  --leading-body: 1.56;
  --leading-tight: 1.08;
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
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 20px 48px rgba(31, 42, 36, 0.11);
  --focus-ring: 0 0 0 4px rgba(47, 143, 70, 0.24);
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1160px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ms=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/linear-app/tokens.css
 *
 * Structured token bindings for the "Linear" brand — the dark-mode-native
 * project management tool's precision engineering voice.
 *
 * Brand identity in three sentences:
 *   1. Darkness as the native medium — near-black canvas (#08090a) where
 *      information density is managed through luminance steps rather than
 *      color variation; semi-transparent white borders throughout.
 *   2. Inter Variable with OpenType "cv01","ss03" at all sizes, signature
 *      weight 510 (between regular and medium), aggressive negative
 *      letter-spacing at display sizes (-1.584px at 72px).
 *   3. Almost entirely achromatic — the single chromatic color is Linear's
 *      indigo-violet (#5e6ad2 bg / #7170ff interactive), used only for
 *      CTAs and active states; everything else is grayscale.
 *
 * Schema decisions:
 *   - --bg: #08090a (marketing black); --surface: #191a1b (elevated).
 *   - --surface-warm aliases --surface (dark system, no warm tier).
 *   - --fg: #f7f8f8 (near-white — not pure white, prevents eye strain).
 *   - --fg-2: #d0d6e0 (silver-gray body text).
 *   - --border: rgba(255,255,255,0.08); --border-soft: rgba(255,255,255,0.05).
 *   - --accent: #5e6ad2 (brand indigo bg); --accent-hover: #828fff.
 *   - --tracking-display: -0.022em (-1.584px / 72px normalized).
 *   - --radius-sm: 6px (buttons/inputs); --radius-md: 8px (cards).
 *   - --elev-raised: luminance stepping — no opaque shadow on dark.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────── */
  --bg:           #08090a;              /* marketing black — hero canvas */
  --surface:      #191a1b;              /* elevated surface — cards, dropdowns */
  --surface-warm: var(--surface);       /* no warm tier in dark achromatic system */

  /* ─── Foreground ───────────────────────────────────────────────── */
  --fg:   #f7f8f8;                      /* near-white primary text */
  --fg-2: #d0d6e0;                      /* silver-gray body / secondary text */
  --muted: #8a8f98;                     /* tertiary — placeholders, metadata */
  --meta:  #62666d;                     /* quaternary — timestamps, disabled */

  /* ─── Border ───────────────────────────────────────────────────── */
  --border:      rgba(255, 255, 255, 0.08);   /* standard semi-transparent white */
  --border-soft: rgba(255, 255, 255, 0.05);   /* ultra-subtle divider */

  /* ─── Accent ───────────────────────────────────────────────────── */
  --accent:        #5e6ad2;             /* brand indigo — CTA backgrounds */
  --accent-on:     #ffffff;
  --accent-hover:  #828fff;             /* lighter saturated hover */
  --accent-active: #4752c4;             /* darker pressed state */

  /* ─── Semantic ─────────────────────────────────────────────────── */
  --success: #27a644;                   /* Linear green */
  --warn:    #eab308;
  --danger:  #dc2626;

  /* ─── Typography ───────────────────────────────────────────────── */
  --font-display: "Inter Variable", "Inter", "SF Pro Display", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif;
  --font-body:    "Inter Variable", "Inter", "SF Pro Display", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif;
  --font-mono:    "Berkeley Mono", ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §Typography Hierarchy.
   * Linear's display range 72px→10px; the 8 schema slots map the
   * key stops. 64px secondary-hero lives inline in components.html. */
  --text-xs:   12px;                    /* label / micro */
  --text-sm:   14px;                    /* caption large / link small */
  --text-base: 16px;                    /* body — standard reading */
  --text-lg:   18px;                    /* body large — feature descriptions */
  --text-xl:   24px;                    /* heading 2 */
  --text-2xl:  32px;                    /* heading 1 */
  --text-3xl:  48px;                    /* display — section headlines */
  --text-4xl:  72px;                    /* display XL — hero */

  /* Leading + tracking.
   * --leading-tight=1.00: Linear's signature "engineered" compression.
   * h2 (32px) → 1.13; h3 (24px) → 1.33 per DESIGN.md spec.
   * --tracking-display: -0.022em = -1.584px / 72px normalized. */
  --leading-body:     1.5;
  --leading-tight:    1.00;
  --tracking-display: -0.022em;

  /* ─── Spacing ──────────────────────────────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §Whitespace Philosophy. */
  --section-y-desktop: 80px;
  --section-y-tablet:  48px;
  --section-y-phone:   32px;

  /* ─── Radius ───────────────────────────────────────────────────── */
  /* 6px for buttons/inputs (comfortable), 8px cards, 12px panels. */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────── */
  /* On dark surfaces: luminance stepping, not opaque drop shadows.
     --elev-raised uses semi-transparent border-as-shadow technique. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    0 0 0 1px rgba(255, 255, 255, 0.05);

  /* ─── Focus ────────────────────────────────────────────────────── */
  /* Multi-layer stack per DESIGN.md §6 + §7: accent ring makes the
     indicator visible on the near-black #08090a canvas. */
  --focus-ring:
    0 0 0 2px color-mix(in oklab, var(--accent), transparent 30%),
    0 4px 12px rgba(0, 0, 0, 0.1);

  /* ─── Motion ───────────────────────────────────────────────────── */
  --motion-fast:   150ms;
  --motion-base:   200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ───────────────────────────────────────────────────── */
  --container-max:            1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet:  16px;
  --container-gutter-phone:   12px;
}
`,Gs=`/* design-systems/lingo/tokens.css
 * Structured token bindings for Lingo.
 * global localization product language, soft violet action, warm white surfaces, and readable content rows.
 */

:root {
  --bg: #fbf9ff;
  --surface: #ffffff;
  --surface-warm: #f1ecff;
  --fg: #1d1b2a;
  --fg-2: #4f4863;
  --muted: #786f8f;
  --meta: #6d4aff;
  --border: #ded7f0;
  --border-soft: #eee9f8;
  --accent: #6d4aff;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #22a06b;
  --warn: #e6a700;
  --danger: #e5484d;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "Roboto Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 34px;
  --text-3xl: 50px;
  --text-4xl: 70px;
  --leading-body: 1.55;
  --leading-tight: 1.05;
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
  --elev-raised: 0 20px 48px rgba(45, 36, 85, 0.12);
  --focus-ring: 0 0 0 4px rgba(109, 74, 255, 0.24);
  --motion-fast: 150ms;
  --motion-base: 230ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --container-max: 1160px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ls=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/loom/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Loom".
 * Async video for work: bright neutral canvas, signature purple (#625df5),
 * soft-rounded geometry, Inter typography, video-thumbnail-centric layouts.
 *
 * Key brand decisions encoded here:
 *   - Pure white (#ffffff) canvas with cool-neutral Snow (#f7f7f8) surfaces
 *   - Loom Purple (#625df5) — signals creativity and "record" without shouting
 *   - Three-tier text stack: ink #1f1f23 → slate #6b6d76 → mist #9b9ca3
 *   - Soft-rounded geometry: 4 / 6 / 8 px ladder — friendly, not corporate
 *   - Inter throughout with broad system fallback — system-native if Inter absent
 *   - Shadow-only depth (DESIGN.md §6 forbids borders on cards)
 *   - 200ms ease-out card hover, 100ms button press (DESIGN.md §9)
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Bright white canvas — Loom is used in office light. Snow surfaces
   * are cool-neutral, never warm — keeps focus on the video frame. */
  --bg: #ffffff;
  --surface: #f7f7f8;        /* Snow — sidebars, cards, lifted panels */
  --surface-warm: var(--surface); /* alias — no warm tier in the cool-neutral palette */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Three text tiers: ink for primary, slate for metadata, mist
   * reserved for placeholders / disabled (DESIGN.md §7 forbids it
   * for body copy). --fg-2 collapses to --fg — Loom uses a single
   * emphatic text weight on headings, not a softer secondary. */
  --fg: #1f1f23;             /* Ink — primary text, all headings */
  --fg-2: var(--fg);         /* alias — single emphatic text tier */
  --muted: #6b6d76;          /* Slate — timestamps, secondary copy (4.5:1 on white) */
  --meta: #9b9ca3;           /* Mist — placeholders, disabled, micro-metadata only */

  /* ─── Border ──────────────────────────────────────────────────────
   * Cool light gray — present enough to delineate inputs without
   * stealing focus from the video thumbnail. Cards rely on shadow
   * instead of border (DESIGN.md §6). */
  --border: #e4e4e7;
  --border-soft: var(--border); /* alias — single border tier */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Loom Purple — the brand's emotional center. Used for CTAs,
   * the record button, active states, and video-progress fills. */
  --accent: #625df5;
  --accent-on: #ffffff;
  --accent-hover: #5048e5;   /* DESIGN.md §2 — explicit hover binding */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Loom's danger is a pink-leaning red (#d64770) chosen to live
   * peacefully with the purple accent. DESIGN.md §7 warns it must
   * pair with a light surface — never use as body text on white. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #d64770;         /* Loom Error — use only with tinted surface */

  /* ─── Typography ──────────────────────────────────────────────────
   * Inter throughout, with broad system fallbacks so the friendly
   * geometric sans appears even before web-font load. Mono stack
   * matches DESIGN.md §3 byte-for-byte (SFMono-Regular, no JetBrains). */
  --font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

  /* Type scale — derived from DESIGN.md §3 (11/12/14/18/22/28).
   * --text-lg interpolated at 16px (featured body / intro paragraphs).
   * --text-4xl extended to 40px for marketing hero surfaces — product
   * UI tops out at the 28px Display tier called out in DESIGN.md. */
  --text-xs: 11px;           /* Micro — keyboard hints, status chips */
  --text-sm: 12px;           /* Caption — timestamps, helper text */
  --text-base: 14px;         /* Body / Button (DESIGN.md baseline) */
  --text-lg: 16px;           /* Featured body — intro paragraphs */
  --text-xl: 18px;           /* H2 — feature titles */
  --text-2xl: 22px;          /* H1 — section heading */
  --text-3xl: 28px;          /* Display — DESIGN.md ceiling for product UI */
  --text-4xl: 40px;          /* Hero — marketing-surface extension */

  --leading-body: 1.5;       /* DESIGN.md body */
  --leading-tight: 1.2;      /* DESIGN.md display / button (§7 forbids 1.0) */
  --tracking-display: -0.01em; /* Subtle — Inter is friendly, not aggressive */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 4 / 8 base unit. Loom's signature rhythm is the 16px gap
   * (--space-4) called out explicitly in DESIGN.md §5. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* ─── Section rhythm ──────────────────────────────────────────────
   * Generous whitespace — Loom is content-first, never crowded.
   * Sits between Cohere's 60px and Mistral's 80px. */
  --section-y-desktop: 72px;
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * The 4 / 6 / 8 ladder IS the Loom geometry signature: friendly
   * without being childish. DESIGN.md §4 binds each tier explicitly:
   *   sm 4px → inputs · md 6px → buttons · lg 8px → cards / thumbnails */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-pill: 9999px;     /* Avatars, status dots, badges */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Two-layer shadow gives lifted feel without harsh edges. Values
   * match DESIGN.md §2 --shadow-card byte-for-byte. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 1px 3px rgba(31, 31, 35, 0.08), 0 4px 12px rgba(31, 31, 35, 0.04);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * 3px purple halo at ~15% — DESIGN.md §4 input-field spec.
   * color-mix(transparent 85%) ≈ rgba(98, 93, 245, 0.15). */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 85%);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Ease-out throughout (DESIGN.md §9): 100ms button press,
   * 200ms card hover. Snappy but not sudden — async tool feel. */
  --motion-fast: 100ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1200px container — comfortable for two-up video grids without
   * pushing thumbnails to the edge. Gutters scale gently. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 20px;
  --container-gutter-phone: 16px;
}
`,Fs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/lovable/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Lovable".
 * Warm parchment canvas, opacity-driven gray ramp, humanist Camera Plain
 * Variable display type, borders-not-shadows for cards, inset-shadow
 * tactility on dark CTAs.
 *
 * This file pre-compiles the values described in \`DESIGN.md\` into the
 * shared schema. Agents generating an artifact for Lovable should paste
 * the \`:root\` block verbatim into the first \`<style>\` of the artifact,
 * then reference everything via \`var(--*)\`.
 *
 * Brand-specific schema decisions (each one bends a schema convention
 * to match Lovable's voice rather than the cross-brand default):
 *
 *   1. \`--bg\` and \`--surface\` BOTH bind to \`#f7f4ed\` (Cream). DESIGN.md
 *      §4 is explicit: "Cards… background: #f7f4ed (matches page) — for
 *      seamless integration." Lovable's depth model is borders, not
 *      surface tinting, so a card and the page are the same color and
 *      \`#eceae4\` border carries the containment. \`--surface-warm\`
 *      collapses to \`var(--surface)\` because there is no second warm
 *      tier in the system.
 *
 *   2. \`--fg\` is \`#1c1c1c\` (Charcoal), not \`#000000\`. DESIGN.md §1 names
 *      the warmth as deliberate: "Not pure black — organic warmth." The
 *      gray ramp is opacity-driven — every "gray" in the system is the
 *      same charcoal hue at a different alpha — so \`--fg-2\` binds to
 *      \`rgba(28, 28, 28, 0.83)\` (the documented "strong secondary text"
 *      tier from §2) and \`--meta\` binds to \`rgba(28, 28, 28, 0.4)\`
 *      (the documented "interactive borders / placeholders" tier).
 *      \`--muted\` keeps the named gray \`#5f5f5d\` for body descriptions
 *      because that one tier is bound to a hex in DESIGN.md, not to an
 *      opacity stop.
 *
 *   3. \`--border\` is the warm \`#eceae4\` (Light Cream) divider line.
 *      \`--border-soft\` aliases to \`var(--border)\` because Lovable does
 *      not differentiate inner / outer border tiers — DESIGN.md §1 names
 *      a SECOND interactive border at \`rgba(28, 28, 28, 0.4)\`, but that
 *      is the foreground-meta token (already bound above) used as a
 *      button outline, not a separator-tier border.
 *
 *   4. \`--accent\` is Lovable Pink (\`#ff4d8d\`), even though primary CTAs
 *      in Lovable are Charcoal (\`var(--fg)\`). DESIGN.md §6 calls out a
 *      "soft, warm multi-color gradient wash (pinks, oranges, blues)
 *      behind hero" and §4 Links references \`hsl(var(--primary))\` for
 *      hover — the brand mark itself is a pink → coral gradient. The
 *      accent slot is therefore reserved for the chromatic moments
 *      where the brand pink actually appears (link hover, badge tints,
 *      focus moments on warm controls). components.html encodes the
 *      "primary CTA = Charcoal" pattern via \`background: var(--fg)\`,
 *      so \`--accent\` does not get burned on every button.
 *
 *   5. \`--focus-ring\` is the Tailwind ring blue at 50% alpha
 *      (\`rgba(59, 130, 246, 0.5)\`), NOT a pink/charcoal-derived ring.
 *      DESIGN.md §6 names this verbatim as "Ring (Accessibility):
 *      \`rgba(59,130,246,0.5)\` 2px ring" — it is the one cool moment in
 *      an otherwise warm palette, justified by accessibility (the warm
 *      pink at low alpha would not pass contrast on the cream canvas).
 *      A 2px sharp ring, not the schema's 3px alpha glow.
 *
 *   6. \`--elev-raised\` is the soft warm focus shadow
 *      (\`0 4px 12px rgba(0, 0, 0, 0.1)\`) — the same value DESIGN.md §6
 *      lists as "Focus (Level 3)". The signature multi-layer inset
 *      shadow on dark buttons (\`rgba(255,255,255,0.2) 0 0.5px 0 inset,
 *      rgba(0,0,0,0.2) 0 0 0 0.5px inset, rgba(0,0,0,0.05) 0 1px 2px\`)
 *      is component-specific and lives in components.html — it only
 *      reads on a dark surface, so generalizing it to a token would
 *      mis-paint cards on the cream canvas.
 *
 *   7. The type scale tops out at 60px (\`--text-4xl\`) per DESIGN.md §3
 *      "Display Hero, 60px Camera Plain weight 600". \`--leading-tight\`
 *      is \`1.10\` (the documented hero range 1.00–1.10) and
 *      \`--tracking-display\` is \`-0.025em\`, the em-relative form of
 *      "-1.5px at 60px" so compression scales proportionally with size.
 *      Body text stays at \`normal\` tracking — Camera Plain Variable's
 *      humanist warmth wants comfortable reading at 16px.
 *
 *   8. Section rhythm is generous: \`128px\` desktop, \`80px\` tablet,
 *      \`64px\` phone (\`--section-y-*\`). DESIGN.md §5 describes
 *      "lavish at section boundaries (80px–208px)"; we sit in the
 *      mid-range so the cream canvas feels cozy rather than empty.
 *      Container caps at \`1200px\` (DESIGN.md §5 documented max width).
 *
 * Source contracts:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *   - A2 fallback parity:   design-systems/_schema/defaults.css
 *   - Lint enforcement:     apps/daemon/src/lint-artifact.ts
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the schema. Camera Plain Variable does not need a CDN
 * reference here — the font stack lists ui-sans-serif / system-ui
 * fallbacks so artifacts render acceptably even when Camera Plain is
 * not loaded, and any host that wants the real face links it externally.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Cream is BOTH page and card background — DESIGN.md §4: "Cards…
   * background: #f7f4ed (matches page) — for seamless integration".
   * The warm divider line (#eceae4 border) is what separates a card
   * from the page, not a different surface color. */
  --bg: #f7f4ed;                       /* Cream — warm parchment foundation */
  --surface: #f7f4ed;                  /* Cards reuse the canvas — borders contain */
  --surface-warm: var(--surface);      /* alias — Lovable has no second warm tier */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Charcoal #1c1c1c, never pure black. The gray ramp is opacity-driven:
   * every "gray" in the system is the same charcoal hue at a different
   * alpha. --fg-2 binds independently to charcoal-83% (the documented
   * strong-secondary tier). --muted is the named gray #5f5f5d for
   * body descriptions / captions. --meta drops to charcoal-40% — the
   * documented "interactive borders / placeholders" alpha. */
  --fg: #1c1c1c;                       /* Charcoal — primary text, dark CTA bg */
  --fg-2: rgba(28, 28, 28, 0.83);      /* Charcoal 83% — strong secondary text */
  --muted: #5f5f5d;                    /* Muted Gray — descriptions, captions */
  --meta: rgba(28, 28, 28, 0.4);       /* Charcoal 40% — placeholders, faded UI */

  /* ─── Border ──────────────────────────────────────────────────────
   * Light Cream #eceae4 is the canonical "warm divider line" — DESIGN.md
   * §1 names it as the passive border used everywhere cards / images /
   * sections need containment. --border-soft aliases because Lovable
   * does not differentiate inner / outer separator tiers; depth comes
   * from the inset-shadow signature on dark buttons (component-level),
   * not from border weight. */
  --border: #eceae4;                   /* Light Cream — card / image edge */
  --border-soft: var(--border);        /* alias — single border tier */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Lovable Pink — the brand mark color. DESIGN.md §6 calls out a
   * "soft, warm multi-color gradient wash (pinks, oranges, blues)"
   * behind hero, and §4 Links references hsl(var(--primary)) for hover.
   * Primary CTAs are CHARCOAL (var(--fg)), not pink — components.html
   * encodes that pattern. --accent is reserved for the chromatic
   * moments where the brand pink actually appears (link hover, badge
   * tints, brand mark, soft gradient washes). */
  --accent: #ff4d8d;                   /* Lovable Pink — brand mark / chromatic */
  --accent-on: #ffffff;                /* white label on saturated pink */
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Schema defaults — Lovable's marketing surface rarely renders state
   * and DESIGN.md does not specify warm-shift overrides. Success / warn
   * / danger remain tonally distinct from the warm-neutral palette so
   * they read as semantic (not decorative) when they appear. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ──────────────────────────────────────────────────
   * Camera Plain Variable carries the humanist personality — slightly
   * rounded terminals and organic curves, distinct from the geometric
   * sans-serifs typical of dev tools. The variable axis enables weight
   * 480 for special display moments; standard weights are 400 (body /
   * UI / links / buttons) and 600 (headings / emphasis). The
   * ui-sans-serif / system-ui fallbacks ensure artifacts render
   * acceptably even when Camera Plain is not loaded. */
  --font-display: "Camera Plain Variable", "Camera Plain", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Camera Plain Variable", "Camera Plain", ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale (px) — DESIGN.md §3 hierarchy table. Lovable reads BIG
   * because of -0.025em (≈ -1.5px @ 60px) tracking compression on
   * display, not because of an extreme px ceiling. The 18 / 20 / 36 /
   * 48 / 60 ladder mirrors the documented Body Large → Card Title →
   * Sub-heading → Section Heading → Display Hero progression. */
  --text-xs: 12px;                     /* tiny metadata */
  --text-sm: 14px;                     /* caption, link small, button small */
  --text-base: 16px;                   /* body, button, link */
  --text-lg: 18px;                     /* body large, introductions */
  --text-xl: 20px;                     /* card title */
  --text-2xl: 36px;                    /* sub-heading */
  --text-3xl: 48px;                    /* section heading */
  --text-4xl: 60px;                    /* display hero */

  /* \`--leading-tight\` is 1.10 (the documented hero 1.00–1.10 range);
   * \`--leading-body\` is 1.5 (the documented 16px body rhythm).
   * \`--tracking-display\` is -0.025em — the em-relative form of
   * Lovable's "-1.5px at 60px" so the compression scales proportionally
   * with size. Body stays at normal tracking — Camera Plain's humanist
   * warmth wants comfortable reading. */
  --leading-body: 1.5;
  --leading-tight: 1.10;
  --tracking-display: -0.025em;

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 8px base. DESIGN.md §5 names the full scale extending to 208px at
   * the top end for editorial breathing room — those large tiers are
   * inlined per-section in components.html (section-y-* below carries
   * the structural rhythm). The shared schema covers the 4 → 48px
   * structural ladder. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §5: "lavish at section boundaries
   * (80px–208px)". Sit at 128px desktop (the documented mid-range),
   * collapse to 80 on tablet and 64 on phone. The cream background
   * makes these expanses feel cozy rather than empty. */
  --section-y-desktop: 128px;
  --section-y-tablet: 80px;
  --section-y-phone: 64px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * DESIGN.md §5 radius scale: 4 / 6 / 8 / 12 / 16 / 9999. We bind the
   * four schema tiers to: 6 (button / input / functional), 12 (card /
   * image container), 16 (large container / footer), 9999 (action pill,
   * icon toggle). The 4px and 8px tiers are component-specific and not
   * part of the shared schema. */
  --radius-sm: 6px;                    /* buttons, inputs, functional */
  --radius-md: 12px;                   /* cards, image containers */
  --radius-lg: 16px;                   /* large containers, footer sections */
  --radius-pill: 9999px;               /* action pills, icon toggles */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Lovable's depth is intentionally shallow — DESIGN.md §6: "borders
   * are the containment mechanism, not shadows". Three levels:
   *
   *   --elev-flat    no shadow (page surface, most cards)
   *   --elev-ring    the warm 1px border-as-ring (cards, images)
   *   --elev-raised  the soft warm focus shadow (active / focused moments)
   *
   * The signature multi-layer inset shadow on dark buttons (white-line
   * highlight at 0.5px inset + dark ring + soft drop) is component-
   * specific and lives in components.html — it only reads on a dark
   * surface, so generalizing it would mis-paint cards on cream. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 4px 12px rgba(0, 0, 0, 0.1); /* soft warm focus float */

  /* ─── Focus ring ──────────────────────────────────────────────────
   * The Tailwind ring blue at 50% — DESIGN.md §6 lists this verbatim
   * as the keyboard accessibility ring. The one cool moment in an
   * otherwise warm palette, justified by accessibility (the warm pink
   * accent at low alpha would not pass contrast on cream). 2px sharp
   * ring, not the schema's 3px alpha glow. */
  --focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Standard durations — Lovable's tactility is in opacity-on-active
   * (0.8) and the inset-shadow press, not in timed choreography. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1200px max content width per DESIGN.md §5. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,js=`/* design-systems/luxury/tokens.css
 * Structured token bindings for Luxury.
 * luxury commerce with black lacquer, champagne gold, and spacious premium rhythm.
 */

:root {
  --bg: #080706;
  --surface: #151310;
  --surface-warm: #241e14;
  --fg: #fff8ea;
  --fg-2: #d8cdb7;
  --muted: #9f927c;
  --meta: #c6a15b;
  --border: #3a3020;
  --border-soft: #282217;
  --accent: #c6a15b;
  --accent-on: #080706;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #5fa36a;
  --warn: #d8a94f;
  --danger: #d85a52;
  --font-display: "Didot", "Bodoni 72", Georgia, serif;
  --font-body: "Avenir Next", Inter, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 19px;
  --text-xl: 28px;
  --text-2xl: 44px;
  --text-3xl: 68px;
  --text-4xl: 96px;
  --leading-body: 1.6;
  --leading-tight: 0.98;
  --tracking-display: -0.015em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --section-y-desktop: 120px;
  --section-y-tablet: 84px;
  --section-y-phone: 60px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 30px 90px rgba(0, 0, 0, 0.52);
  --focus-ring: 0 0 0 4px rgba(198, 161, 91, 0.30);
  --motion-fast: 180ms;
  --motion-base: 300ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --container-max: 1160px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Te=1,De="od-design-tokens/v1",Ee="TOKEN_SCHEMA",Ce="2026-06-06T00:00:00.000Z",Me={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ge={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Le=JSON.parse('[{"name":"--bg","value":"#050505","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#141414","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#211b0b","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8f4e6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d8ceb0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9b927d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#d4af37","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#3a321d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#282315","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#d4af37","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#050505","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#39a852","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#f7c948","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#e63946","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Lamborghini\\", \\"Eurostile\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"90px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.48","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.96","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"112px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"2px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 28px 84px rgba(0, 0, 0, 0.54)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(212, 175, 55, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"210ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.16, 1, 0.3, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1240px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),Vs={schemaVersion:Te,format:De,contract:Ee,generatedAt:Ce,source:Me,summary:Ge,tokens:Le},Fe=1,je="od-design-tokens/v1",Ve="TOKEN_SCHEMA",ze="2026-06-06T00:00:00.000Z",Oe={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Pe={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Re=JSON.parse('[{"name":"--bg","value":"#fbf7ef","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#eef7ed","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1f2a24","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#435147","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#788276","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#2f8f46","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#dbe3d7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#edf1ea","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#2f8f46","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#d97706","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"34px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"66px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.56","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.08","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"18px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"28px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 20px 48px rgba(31, 42, 36, 0.11)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(47, 143, 70, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"160ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1160px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),zs={schemaVersion:Fe,format:je,contract:Ve,generatedAt:ze,source:Oe,summary:Pe,tokens:Re},He=1,Ue="od-design-tokens/v1",Je="TOKEN_SCHEMA",Ke="2026-06-06T00:00:00.000Z",qe={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ze={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},We=JSON.parse('[{"name":"--bg","value":"#08090a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--bg"},{"name":"--surface","value":"#191a1b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f7f8f8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d0d6e0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8a8f98","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--muted"},{"name":"--meta","value":"#62666d","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--meta"},{"name":"--border","value":"rgba(255, 255, 255, 0.08)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(255, 255, 255, 0.05)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--border-soft"},{"name":"--accent","value":"#5e6ad2","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#828fff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#4752c4","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--accent-active"},{"name":"--success","value":"#27a644","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Inter Variable\\", \\"Inter\\", \\"SF Pro Display\\", -apple-system, system-ui, \\"Segoe UI\\", Roboto, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter Variable\\", \\"Inter\\", \\"SF Pro Display\\", -apple-system, system-ui, \\"Segoe UI\\", Roboto, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Berkeley Mono\\", ui-monospace, \\"SF Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"72px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.00","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.022em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(0, 0, 0, 0.4) 0px 2px 4px, 0 0 0 1px rgba(255, 255, 255, 0.05)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px color-mix(in oklab, var(--accent), transparent 30%), 0 4px 12px rgba(0, 0, 0, 0.1)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--container-gutter-phone"}]'),Os={schemaVersion:He,format:Ue,contract:Je,generatedAt:Ke,source:qe,summary:Ze,tokens:We},Xe=1,Qe="od-design-tokens/v1",Ye="TOKEN_SCHEMA",es="2026-06-06T00:00:00.000Z",ss={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ns={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},rs=JSON.parse('[{"name":"--bg","value":"#fbf9ff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#f1ecff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1d1b2a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4f4863","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#786f8f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#6d4aff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#ded7f0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#eee9f8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#6d4aff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#22a06b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#e6a700","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#e5484d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Roboto Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"34px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"50px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"70px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.55","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.05","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 20px 48px rgba(45, 36, 85, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(109, 74, 255, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"230ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.22, 1, 0.36, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1160px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Ps={schemaVersion:Xe,format:Qe,contract:Ye,generatedAt:es,source:ss,summary:ns,tokens:rs},as=1,os="od-design-tokens/v1",cs="TOKEN_SCHEMA",ts="2026-06-06T00:00:00.000Z",ls={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},is={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:3,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ds=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--bg"},{"name":"--surface","value":"#f7f7f8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1f1f23","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--fg-2"},{"name":"--muted","value":"#6b6d76","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--muted"},{"name":"--meta","value":"#9b9ca3","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--meta"},{"name":"--border","value":"#e4e4e7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--border-soft"},{"name":"--accent","value":"#625df5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#5048e5","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--warn"},{"name":"--danger","value":"#d64770","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Inter\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, SFMono-Regular, \\"SF Mono\\", Menlo, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.2","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"72px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 1px 3px rgba(31, 31, 35, 0.08), 0 4px 12px rgba(31, 31, 35, 0.04)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 85%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.22, 1, 0.36, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:134"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:135"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:136"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--container-gutter-phone"}]'),Rs={schemaVersion:as,format:os,contract:cs,generatedAt:ts,source:ls,summary:is,tokens:ds},us=1,ms="od-design-tokens/v1",ps="TOKEN_SCHEMA",fs="2026-06-06T00:00:00.000Z",hs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ks={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:2,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ys=JSON.parse('[{"name":"--bg","value":"#f7f4ed","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--bg"},{"name":"--surface","value":"#f7f4ed","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1c1c1c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:114"],"sourceName":"--fg"},{"name":"--fg-2","value":"rgba(28, 28, 28, 0.83)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--fg-2"},{"name":"--muted","value":"#5f5f5d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--muted"},{"name":"--meta","value":"rgba(28, 28, 28, 0.4)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--meta"},{"name":"--border","value":"#eceae4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ff4d8d","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:147"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:148"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Camera Plain Variable\\", \\"Camera Plain\\", ui-sans-serif, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Camera Plain Variable\\", \\"Camera Plain\\", ui-sans-serif, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:168"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:169"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:170"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:171"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:174"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:183"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.10","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:184"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:185"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:193"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:194"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:195"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:196"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:197"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:198"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:199"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:200"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"128px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:206"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:207"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:216"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:217"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:218"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:233"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:234"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 4px 12px rgba(0, 0, 0, 0.1)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:235"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px rgba(59, 130, 246, 0.5)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:243"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:248"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:249"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:250"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:254"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:255"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:256"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:257"],"sourceName":"--container-gutter-phone"}]'),Hs={schemaVersion:us,format:ms,contract:ps,generatedAt:fs,source:hs,summary:ks,tokens:ys},gs=1,bs="od-design-tokens/v1",ws="TOKEN_SCHEMA",xs="2026-06-06T00:00:00.000Z",vs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Bs={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ns=JSON.parse('[{"name":"--bg","value":"#080706","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#151310","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#241e14","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#fff8ea","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d8cdb7","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9f927c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#c6a15b","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#3a3020","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#282217","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#c6a15b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#080706","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#5fa36a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#d8a94f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#d85a52","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Didot\\", \\"Bodoni 72\\", Georgia, serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Avenir Next\\", Inter, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"19px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.6","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.98","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.015em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"120px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"84px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"14px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 30px 90px rgba(0, 0, 0, 0.52)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(198, 161, 91, 0.30)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"180ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"300ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.16, 1, 0.3, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1160px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Us={schemaVersion:gs,format:bs,contract:ws,generatedAt:xs,source:vs,summary:Bs,tokens:Ns};export{Ds as _,Ts as a,Is as b,_s as c,$s as d,Ss as e,As as f,js as g,Fs as h,Ls as i,Gs as j,Ms as k,Cs as l,Es as m,Us as n,Hs as o,Rs as p,Ps as q,Os as r,zs as s,Vs as t};
