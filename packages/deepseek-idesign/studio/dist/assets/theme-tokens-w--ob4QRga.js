const e="od-design-system-project/v1",s="warm-editorial",n="Warm Editorial",a="Starter",r="Bundled Open Design package for Warm Editorial, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},c={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},t="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},As={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:c,usage:t,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="warp",f="Warp",h="Developer Tools",k="Bundled Open Design package for Warp, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ss={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="webex",S="Webex",G="Productivity & SaaS",D="Bundled Open Design package for Webex, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",E={type:"bundled",origin:"Open Design curated bundled fixture"},I={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},M="USAGE.md",$="components.manifest.json",_="normalized",T={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},W={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Gs={schemaVersion:N,id:A,name:S,category:G,description:D,source:E,files:I,usage:M,componentsManifest:$,importMode:_,craft:T,sourceFiles:W},C="od-design-system-project/v1",F="webflow",H="Webflow",j="Design & Creative",R="Bundled Open Design package for Webflow, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",V={type:"bundled",origin:"Open Design curated bundled fixture"},O={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},z="USAGE.md",P="components.manifest.json",L="normalized",J={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},K={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ds={schemaVersion:C,id:F,name:H,category:j,description:R,source:V,files:O,usage:z,componentsManifest:P,importMode:L,craft:J,sourceFiles:K},U="od-design-system-project/v1",Y="wechat",Z="WeChat Design System",q="Social & Messaging",Q="Bundled Open Design package for WeChat Design System, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",X={type:"bundled",origin:"Open Design curated bundled fixture"},ee={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},se="USAGE.md",ne="components.manifest.json",ae="normalized",re={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},oe={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Es={schemaVersion:U,id:Y,name:Z,category:q,description:Q,source:X,files:ee,usage:se,componentsManifest:ne,importMode:ae,craft:re,sourceFiles:oe},ce="od-design-system-project/v1",te="wired",le="WIRED",ie="Media & Consumer",de="Bundled Open Design package for WIRED, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",ue={type:"bundled",origin:"Open Design curated bundled fixture"},me={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},pe="USAGE.md",fe="components.manifest.json",he="normalized",ke={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},ye={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Is={schemaVersion:ce,id:te,name:le,category:ie,description:de,source:ue,files:me,usage:pe,componentsManifest:fe,importMode:he,craft:ke,sourceFiles:ye},ge="od-design-system-project/v1",be="wise",we="Wise",xe="Fintech & Crypto",ve="Bundled Open Design package for Wise, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Be={type:"bundled",origin:"Open Design curated bundled fixture"},Ne={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},Ae="USAGE.md",Se="components.manifest.json",Ge="normalized",De={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},Ee={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ms={schemaVersion:ge,id:be,name:we,category:xe,description:ve,source:Be,files:Ne,usage:Ae,componentsManifest:Se,importMode:Ge,craft:De,sourceFiles:Ee},$s=`/* design-systems/warm-editorial/tokens.css
 * Structured token bindings for Warm Editorial.
 * warm editorial system with cream canvas, serif display, and calm publication rhythm.
 */

:root {
  --bg: #fbf6ee;
  --surface: #fffdf8;
  --surface-warm: #f1e3cf;
  --fg: #201914;
  --fg-2: #4c4037;
  --muted: #7a6d63;
  --meta: #9b5b32;
  --border: #ded2c3;
  --border-soft: #eee4d7;
  --accent: #9b5b32;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #4f8a4f;
  --warn: #c9822f;
  --danger: #b33a3a;
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
  --elev-raised: 0 20px 52px rgba(32, 25, 20, 0.12);
  --focus-ring: 0 0 0 4px rgba(155, 91, 50, 0.24);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,_s=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/warp/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Warp".
 * Warm dark canvas, near-black like charred wood. Almost monochromatic
 * warm grays. Matter Regular (weight 400) carries every tier — even
 * the 80px hero. Restraint through warmth.
 *
 * Key brand decisions encoded here:
 *   - Warm near-black canvas (#161412) — never cold/blue dark
 *   - Warm Parchment (#faf9f6) text — barely-cream, never pure white
 *   - Earth Gray (#353534) as the brand "accent" — the dark pill CTA
 *     IS the brand signal; no chromatic accent (DESIGN.md §2 forbids)
 *   - Four-tier text system: parchment → ash → stone → muted-purple
 *   - Mist Border (rgba(226, 226, 226, 0.35)) for ghostly containment
 *   - Pill radius reserved for primary CTA; cards stay at 12–14px
 *   - Almost-flat elevation — depth via borders + opacity, not shadow
 *   - Focus ring uses the FG (parchment), not a colored glow — DESIGN.md
 *     "Border brightness increase, no colored rings"
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Deep warm void. Pure black would feel cold; the reddish-earthen
   * undertone (R>G>B, all near 20) makes the canvas feel like charred
   * wood. Surface is bg + a perceptual ~4% lift, matching the
   * "Frosted Veil" rgba(255,255,255,0.04) overlay DESIGN.md describes. */
  --bg: #161412;             /* Deep Void — warm near-black, earth-toned */
  --surface: #1f1d1b;        /* Frosted Veil resolved over bg */
  --surface-warm: var(--surface); /* alias — already warm; no separate tier */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Four warm tiers, no cool grays. Parchment is the headline tone —
   * its barely-cream undertone is what makes the dark canvas feel
   * inviting rather than austere. Meta carries Purple-Tint Gray, the
   * underlined-link tone DESIGN.md §2 calls out. */
  --fg: #faf9f6;             /* Warm Parchment — primary headlines */
  --fg-2: #afaeac;           /* Ash Gray — body paragraphs, button text */
  --muted: #868584;          /* Stone Gray — secondary descriptions */
  --meta: #666469;           /* Purple-Tint Gray — links, tertiary content */

  /* ─── Border ──────────────────────────────────────────────────────
   * Semi-transparent borders create the "ghostly containment" Warp
   * uses instead of shadows. 35% opacity is the canonical value;
   * inner separators alias to the same line — the brand never uses
   * a stronger or weaker tier (monochromatic restraint). */
  --border: rgba(226, 226, 226, 0.35); /* Mist Border */
  --border-soft: var(--border);        /* alias — single border tier */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Warp's "accent" is restrained: Earth Gray, the dark pill CTA bg.
   * DESIGN.md §2 explicitly forbids bold accent colors — interactive
   * states are communicated through opacity and underline, never hue.
   * accent-on is Ash Gray (#afaeac), the muted button-text color
   * DESIGN.md §4 specifies for the dark pill. */
  --accent: #353534;
  --accent-on: #afaeac;
  --accent-hover: #454545;   /* Dark Charcoal — slightly lighter pill */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Warp's marketing site has no surfaced semantic colors — these
   * exist only for component-level state messaging. Schema defaults
   * are accepted as-is to keep the warm palette unburdened. */
  --success: #16a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ──────────────────────────────────────────────────
   * Matter is the entire system: geometric sans with soft character,
   * approachable in a way most developer-tool fonts are not. Inter
   * appears in DESIGN.md §3 as the "UI supplement" fallback before
   * generic system sans. Geist Mono is the code/terminal display
   * face; Matter Mono is the prose-aligned mono companion. */
  --font-display: "Matter Regular", "Matter", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Matter Regular", "Matter", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", "Matter Mono Regular", ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §3 hierarchy. Body baseline is 18px (not
   * the more conventional 16); Warp's editorial pacing wants more
   * breathing room per line. Display hero at 80px with -0.03em
   * tracking (≈ -2.4px) is the billboard moment. */
  --text-xs: 12px;           /* Small Label — uppercase 2.4px tracking */
  --text-sm: 14px;           /* Caption — uppercase 1.4px tracking */
  --text-base: 18px;         /* Body — DESIGN.md body baseline */
  --text-lg: 24px;           /* Body Heading */
  --text-xl: 32px;           /* Sub-heading */
  --text-2xl: 48px;          /* Section Heading */
  --text-3xl: 56px;          /* Section Display */
  --text-4xl: 80px;          /* Display Hero — billboard scale */

  --leading-body: 1.4;       /* Body Large lh — relaxed editorial */
  --leading-tight: 1.0;      /* Display Hero lh — maximum compression */
  --tracking-display: -0.03em; /* ≈ -2.4px at 80px — hero compression */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 8px base unit (DESIGN.md §5). Schema defaults match Warp's scale
   * exactly — no override needed. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* ─── Section rhythm ──────────────────────────────────────────────
   * Generous, contemplative pacing. DESIGN.md §5: "80px–120px vertical
   * between major sections." Desktop uses the upper bound — Warp's
   * marketing site reads like a magazine, each section a page-turn. */
  --section-y-desktop: 120px;
  --section-y-tablet: 80px;
  --section-y-phone: 56px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Warp's radius scale (DESIGN.md §5) ranges 4–14px for content,
   * 50px+ for pills. Standard components live in the soft 6–14px tier;
   * the primary CTA reaches for --radius-pill. */
  --radius-sm: 6px;          /* Inputs, tags, small containers */
  --radius-md: 12px;         /* Feature cards */
  --radius-lg: 14px;         /* Large prominent containers */
  --radius-pill: 9999px;     /* Dark pill button — primary CTA */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Almost-flat. DESIGN.md §6: "remarkably flat — almost zero shadow
   * usage." Depth comes from semi-transparent borders (the ring tier)
   * and the rare ambient shadow lifted directly from DESIGN.md's
   * inferred Level 3 treatment. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 5px 15px rgba(0, 0, 0, 0.2);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * NO colored ring. DESIGN.md §4: "Border brightness increase, no
   * colored rings (consistent with the monochromatic palette)." A
   * 50%-opacity warm parchment glow is the brightest legal indicator. */
  --focus-ring: 0 0 0 2px rgba(250, 249, 246, 0.5);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Standard cadence — DESIGN.md doesn't specify timing, and the
   * brand's calm character is carried by typography and color rather
   * than animation choreography. Schema defaults preserved. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1500px container — DESIGN.md §5 calls out the breakpoint exactly.
   * Wide cinematic compositions let nature photography breathe; phone
   * gutter steps down through the responsive scale (32 → 24 → 16). */
  --container-max: 1500px;
  --container-gutter-desktop: 32px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Ts=`/* design-systems/webex/tokens.css
 *
 * Structured token bindings for Webex.
 * cool collaboration surfaces with teal and violet meeting signals.
 */

:root {
  --bg: #f6f8fb;
  --surface: #ffffff;
  --surface-warm: #eef8f6;
  --fg: #0f172a;
  --fg-2: #334155;
  --muted: #64748b;
  --meta: #12a594;
  --border: #dbe4ee;
  --border-soft: #edf2f7;
  --accent: #00a3a6;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #22c55e;
  --warn: #f59e0b;
  --danger: #e11d48;
  --font-display: "CiscoSansTT", Inter, Arial, sans-serif;
  --font-body: "CiscoSansTT", Inter, Arial, sans-serif;
  --font-mono: "SF Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 22px;
  --text-2xl: 32px;
  --text-3xl: 44px;
  --text-4xl: 60px;
  --leading-body: 1.55;
  --leading-tight: 1.1;
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
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 20px 50px rgba(15, 23, 42, 0.10);
  --focus-ring: 0 0 0 4px rgba(0, 163, 166, 0.24);
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 28px;
  --container-gutter-phone: 18px;
}
`,Ws=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/webflow/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Webflow".
 * The visual web builder: a white marketing-grade canvas, near-black
 * ink, the signature Webflow Blue (#146ef5), conservative 4px corners,
 * and a five-layer cascading shadow that gives every card a built-not-
 * floating quality.
 *
 * Key brand decisions encoded here:
 *   - White canvas with near-black (#080808) text — DESIGN.md §1 / §9.
 *     The marketing site does NOT shift surfaces warm; section variation
 *     comes from borders + the 5-layer shadow stack, not from tinting.
 *   - Webflow Blue (#146ef5) as the single accent, with the documented
 *     darker Button Hover Blue (#0055d4) as \`--accent-hover\` (not a
 *     formulaic black-mix — Webflow's docs specify the hover value).
 *   - Four-tier foreground ramp: #080808 → #363636 → #5a5a5a → #ababab,
 *     matching the Near Black / Gray 700 / Mid Gray / Gray 300 scale
 *     from DESIGN.md §2 so cross-brand components targeting --fg-2 and
 *     --meta resolve to Webflow's actual gray ramp.
 *   - Conservative radius (4px–8px). DESIGN.md §7 forbids rounding
 *     beyond 8px for functional elements — sharp, precise, tool-like.
 *   - Five-layer cascading shadow on --elev-raised, reproduced verbatim
 *     from DESIGN.md §2 / §6: the stack is the depth signature and
 *     should never be flattened to a single blur.
 *   - WF Visual Sans Variable display + body, Inconsolata for code —
 *     the dual identity DESIGN.md §3 calls out (design + code).
 *   - Webflow Green / Yellow / Red bound to semantic tokens (DESIGN.md
 *     §2 Secondary Accents) so semantic state stays inside the brand
 *     palette rather than borrowing the schema's generic hues.
 *
 * Source contracts:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *   - A2 fallback parity:   design-systems/_schema/defaults.css
 *   - Lint enforcement:     apps/daemon/src/lint-artifact.ts
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (no warm tier) ───────────────────────────────────────
   * Webflow's marketing canvas is pure white. Sections do not shift
   * background color — depth comes from the 5-layer shadow stack and
   * 1px borders, not from tinted surfaces. \`--surface-warm\` aliases
   * to surface because the brand has no warmer tier. */
  --bg: #ffffff;                      /* White — the page canvas */
  --surface: #ffffff;                 /* White — cards stay flush with the canvas */
  --surface-warm: var(--surface);     /* alias — Webflow has no warm tier */

  /* ─── Foreground ramp (4 levels) ──────────────────────────────────
   * Near Black → Gray 700 → Mid Gray → Gray 300, the four documented
   * text tiers from DESIGN.md §2 (headings / body / captions / muted).
   * \`#080808\` instead of \`#000000\` matters — DESIGN.md §1 / §9 names
   * the near-black explicitly. The four tiers are independently bound
   * (not aliased) because Webflow's marketing site genuinely uses all
   * four: H1 black, body Gray 700, captions Mid Gray, placeholder /
   * disabled Gray 300. */
  --fg: #080808;                      /* Near Black — primary text */
  --fg-2: #363636;                    /* Gray 700 — body description */
  --muted: #5a5a5a;                   /* Mid Gray — captions, link text */
  --meta: #ababab;                    /* Gray 300 — placeholder, disabled */

  /* ─── Border (2 levels) ──────────────────────────────────────────
   * Borders are visible and structural in Webflow — \`1px solid #d8d8d8\`
   * is the documented card edge (DESIGN.md §4). \`--border-soft\` drops
   * to a paler tint for inner row separators that must not visually
   * compete with the card outline. */
  --border: #d8d8d8;                  /* Border Gray — card / divider edge */
  --border-soft: #ebebeb;             /* paler tint — inner row separator */

  /* ─── Accent ─────────────────────────────────────────────────────
   * Webflow Blue (#146ef5): primary CTA, link, focus ring, badge tint.
   * \`--accent-hover\` is the documented Button Hover Blue (#0055d4),
   * NOT a formulaic black-mix — Webflow's brand spec names the darker
   * value, so we honor it verbatim instead of computing one. Hard cap
   * of ≤2 visible uses per screen (schema lint). */
  --accent: #146ef5;                  /* Webflow Blue — primary brand signal */
  --accent-on: #ffffff;               /* white label on saturated blue */
  --accent-hover: #0055d4;            /* Button Hover Blue — documented value */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ───────────────────────────────────────────────────
   * Bound to Webflow's secondary palette (DESIGN.md §2) so state
   * colors live inside the brand instead of borrowing the schema's
   * generic semantic hues. Webflow Green / Yellow / Red are vivid
   * enough to read as state without falling out of the system. */
  --success: #00d722;                 /* Webflow Green */
  --warn: #ffae13;                    /* Webflow Yellow */
  --danger: #ee1d36;                  /* Webflow Red */

  /* ─── Typography — fonts ─────────────────────────────────────────
   * WF Visual Sans Variable is Webflow's custom variable face used at
   * weight 500–600 throughout. Inter/Arial fall back so artifacts
   * render legibly when the brand face is not loaded. Inconsolata is
   * the companion monospace from DESIGN.md §3 — the "design + code"
   * dual identity is part of the brand voice. */
  --font-display: "WF Visual Sans Variable", "Inter", Arial, system-ui, sans-serif;
  --font-body: "WF Visual Sans Variable", "Inter", Arial, system-ui, sans-serif;
  --font-mono: "Inconsolata", ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale (px) — DESIGN.md §3 hierarchy table. Display hero is
   * 80px (the big marketing-page number), section heading is 56px,
   * sub-heading 32px, feature 24px, body 20px, body-standard 16px,
   * caption 14px. The schema's 8 tiers map directly onto Webflow's
   * documented sizes. */
  --text-xs: 12px;                    /* badge uppercase / micro */
  --text-sm: 14px;                    /* caption */
  --text-base: 16px;                  /* body standard / button */
  --text-lg: 20px;                    /* body */
  --text-xl: 24px;                    /* feature title */
  --text-2xl: 32px;                   /* sub-heading */
  --text-3xl: 56px;                   /* section heading */
  --text-4xl: 80px;                   /* display hero */

  /* \`--leading-tight\` is 1.04 (DESIGN.md §3 display + section line-
   * height). \`--leading-body\` is 1.6 (the documented body-standard
   * ratio). \`--tracking-display\` is \`-0.01em\`, the em-relative form
   * of Webflow's \`-0.8px at 80px\` display tracking — scales correctly
   * with size. */
  --leading-body: 1.6;
  --leading-tight: 1.04;
  --tracking-display: -0.01em;

  /* ─── Spacing ────────────────────────────────────────────────────
   * 4px-grid base. DESIGN.md §5's fractional scale (2.4 / 3.2 / 5.6 /
   * 7.2 / 9.6) is component-internal micro-padding and is inlined
   * per-component; the 4/8/12/16/20/24/32/48 tier carries the
   * structural rhythm. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Section rhythm — Webflow's marketing sections breathe but stay
   * tighter than a gallery: 96px desktop, 64px tablet, 48px phone
   * (matching the documented 992 / 768 / 479 breakpoints in §8). */
  --section-y-desktop: 96px;
  --section-y-tablet: 64px;
  --section-y-phone: 48px;

  /* ─── Radius ─────────────────────────────────────────────────────
   * DESIGN.md §5: 2 / 4 / 8 / 50%. The "Do" list (§7) is explicit:
   * 4px is the default, do NOT round beyond 8px for functional
   * elements. We bind sm/md to 4px (buttons, inputs, cards), lg to
   * 8px (featured containers), pill to 9999px (badges, avatars). */
  --radius-sm: 4px;                   /* buttons, inputs, chips */
  --radius-md: 4px;                   /* cards, modals — same conservative 4px */
  --radius-lg: 8px;                   /* featured containers — the soft cap */
  --radius-pill: 9999px;              /* badges, avatars */

  /* ─── Elevation (3 levels, raised = 5-layer cascade) ─────────────
   * The 5-layer shadow stack from DESIGN.md §2 / §6 is the depth
   * signature. The outer layer at 84px is a "presence" cushion (alpha
   * 0), the inner 3px layer is the contact shadow, and three middle
   * layers create the smooth falloff. Never flatten this stack to a
   * single blur — the cascade is what makes Webflow cards feel
   * physically built rather than digitally floating. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised:
    0px 84px 24px rgba(0, 0, 0, 0),
    0px 54px 22px rgba(0, 0, 0, 0.01),
    0px 30px 18px rgba(0, 0, 0, 0.04),
    0px 13px 13px rgba(0, 0, 0, 0.08),
    0px 3px 7px rgba(0, 0, 0, 0.09);

  /* ─── Focus ring ─────────────────────────────────────────────────
   * Webflow Blue at 30% — the accent is already the brand's focus
   * color in product, so the schema default (alpha glow of accent)
   * matches without override. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ─────────────────────────────────────────────────────
   * 150 / 200ms with standard easing. Webflow's marketing site uses a
   * 6px translate hover on buttons (DESIGN.md §4) — that micro-move
   * runs at --motion-fast. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ─────────────────────────────────────────────────────
   * 1200px max content width — Webflow's marketing pages cap around
   * this width to keep line lengths readable. Breakpoints from
   * DESIGN.md §8 (992 / 768 / 479) gate the gutter scale. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,Cs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/wechat/tokens.css
 *
 * Structured token bindings for "WeChat" (微信) — Tencent's all-in-one
 * social, payment, and mini-program super-app. The visual language is
 * a quiet, light-friendly consumer canvas built around one decisive
 * signal: WeChat Green (#07C160). Everything else recedes so green
 * carries the brand — CTAs, success states, active tab, focus ring.
 * Bilingual CJK-aware typography (PingFang SC, Hiragino Sans GB,
 * Microsoft YaHei, Noto Sans SC) keeps English and 中文 on the same
 * vertical rhythm so chat rows, page titles, and mini-program cards
 * align in either script without per-language overrides.
 *
 * Brand identity in three sentences:
 *   1. The canvas is the muted #EDEDED chat-list gray, not pure white —
 *      this is the colour every WeChat user has stared at for a decade.
 *      Surfaces (#F7F7F7) lift one tone above it. Pure white belongs to
 *      incoming chat bubbles, not pages.
 *   2. Brand green #07C160 is the only accent. Hover (#10B160) and
 *      pressed (#059050) come straight from the platform spec; the same
 *      green doubles as the success state because in WeChat green *is*
 *      "good / done / sent / paid".
 *   3. Type is mobile-first and dense: 15px body at 1.6 line-height,
 *      18px page titles, 11px timestamps. The display ladder (24 → 32
 *      → 48px) is deliberately modest — WeChat's marketing voice
 *      ("微信，是一个生活方式") is understated, not billboard-loud.
 *
 * Schema decisions:
 *   - --bg: #ededed (chat-list gray, DESIGN.md §UI Neutrals).
 *   - --surface: #f7f7f7 (card / sheet lift on bg).
 *   - --surface-warm: var(--surface) — single surface tier.
 *   - --fg: #1a1a1a (ink); --fg-2 alias — DESIGN.md has one text tier.
 *   - --muted: #888888 (secondary + timestamps);
 *     --meta: var(--muted) — DESIGN.md does not separate the tier.
 *   - --border: #e0e0e0; --border-soft alias — single border weight.
 *   - --accent: #07c160 + hover #10b160 + active #059050 (DESIGN.md).
 *   - --success: #07c160 (brand-as-success — green is "done" in WeChat).
 *   - --warn: #fab702; --danger: #fa5151 (DESIGN.md functional palette).
 *   - --font-display / --font-body: identical apple-system + CJK stack.
 *     DESIGN.md uses a single family across the app; bilingual users get
 *     PingFang SC → Hiragino Sans GB → Microsoft YaHei → Noto Sans SC
 *     fallbacks so 中文 renders crisply on macOS, iOS, Windows and Linux.
 *   - Type scale: 11 / 13 / 15 / 16 / 18 / 24 / 32 / 48 — mobile-first
 *     chat ladder extended with a modest 48px hero for marketing pages.
 *   - --leading-body: 1.6 (DESIGN.md body, generous for CJK density).
 *   - Radius: 4 / 8 / 16 / pill (DESIGN.md §Border Radius).
 *   - Motion: 100ms hover, 200ms message-entry, cubic-bezier(0.25, 0.1,
 *     0.25, 1) — DESIGN.md §Motion (instant + fast + ease-default).
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────────
   * Light-friendly canvas: the muted #EDEDED chat-list gray is the
   * WeChat user's home colour. Surfaces lift one tone above it. */
  --bg:           #ededed;             /* chat-list gray — primary canvas */
  --surface:      #f7f7f7;             /* card / sheet lift on bg */
  --surface-warm: var(--surface);      /* alias — single surface tier */

  /* ─── Foreground ───────────────────────────────────────────────────
   * One ink, one secondary. DESIGN.md does not separate dark / warm
   * tiers, so --fg-2 and --meta alias their siblings. */
  --fg:    #1a1a1a;                    /* ink — primary text */
  --fg-2:  var(--fg);                  /* alias — single text weight */
  --muted: #888888;                    /* secondary + timestamps */
  --meta:  var(--muted);               /* alias — same gray for metadata */

  /* ─── Border ───────────────────────────────────────────────────────
   * Dividers are quiet — most cards are defined by background contrast,
   * not borders. When borders appear, they are the same hairline gray. */
  --border:      #e0e0e0;              /* card / row edge */
  --border-soft: var(--border);        /* alias — no inner separator tier */

  /* ─── Accent ───────────────────────────────────────────────────────
   * WeChat Green is the single load-bearing colour. Hover and active
   * are taken verbatim from DESIGN.md so primary buttons feel native. */
  --accent:        #07c160;            /* WeChat green — primary brand */
  --accent-on:     #ffffff;
  --accent-hover:  #10b160;            /* DESIGN.md primary hover */
  --accent-active: #059050;            /* DESIGN.md primary pressed */

  /* ─── Semantic ─────────────────────────────────────────────────────
   * Green doubles as success because in WeChat green *is* "done / paid /
   * sent". Warning + danger come straight from DESIGN.md §Functional. */
  --success: #07c160;                  /* brand-as-success — paid / done */
  --warn:    #fab702;                  /* DESIGN.md warning orange */
  --danger:  #fa5151;                  /* DESIGN.md error red */

  /* ─── Typography ───────────────────────────────────────────────────
   * Single bilingual stack across display + body. -apple-system first
   * for SF / SF Pro on Apple platforms; PingFang SC + Hiragino Sans GB
   * + Microsoft YaHei + Noto Sans SC keep 中文 crisp on macOS, iOS,
   * Windows and Linux respectively. Helvetica Neue / Helvetica / Arial
   * close the Latin tail. */
  --font-display: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §Typography is mobile-first (11–18px). The
   * top three tiers (24 / 32 / 48px) extend the ladder for marketing
   * pages while staying understated — WeChat does not shout. */
  --text-xs:   11px;                   /* caption / timestamp */
  --text-sm:   13px;                   /* secondary text */
  --text-base: 15px;                   /* body — WeChat default */
  --text-lg:   16px;                   /* section header / button label */
  --text-xl:   18px;                   /* page title */
  --text-2xl:  24px;                   /* feature heading */
  --text-3xl:  32px;                   /* H2 — section title */
  --text-4xl:  48px;                   /* display hero — modest by design */

  /* Leading + tracking.
   * 1.6 body line-height (DESIGN.md) gives Chinese characters generous
   * air; 1.3 tight line-height matches the page-title spec. Display
   * tracking compresses one notch — works for both Latin and CJK. */
  --leading-body:     1.6;
  --leading-tight:    1.3;
  --tracking-display: -0.01em;

  /* ─── Spacing ──────────────────────────────────────────────────────
   * 4px base unit, DESIGN.md §Spacing System. The schema's --space-5
   * (20px) and --space-12 (48px) fill in tiers DESIGN.md does not name
   * but the layout grid needs. */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* ─── Section rhythm ───────────────────────────────────────────────
   * Phone-first product — desktop rhythm stays modest (72px) and
   * collapses to 32px on phones to keep chat-row density on small
   * screens. */
  --section-y-desktop: 72px;
  --section-y-tablet:  48px;
  --section-y-phone:   32px;

  /* ─── Radius ───────────────────────────────────────────────────────
   * DESIGN.md §Border Radius: 4 / 8 / 16 / pill. (The brand-specific
   * --radius-bubble lives in DESIGN.md but is component-local — chat
   * bubbles re-derive it inline so it does not enter the shared schema.) */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────────
   * Whisper-quiet shadow lifted from DESIGN.md's incoming-bubble spec
   * (0 1px 2px rgba(0,0,0,0.06)). WeChat surfaces almost never float;
   * when they do, the shadow is barely perceptible. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised: 0 1px 2px rgba(0, 0, 0, 0.06);

  /* ─── Focus ────────────────────────────────────────────────────────
   * Green-tinted ring keeps the brand voice consistent on keyboard
   * focus across inputs, buttons, and links. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ───────────────────────────────────────────────────────
   * DESIGN.md §Motion: 100ms hover, 200ms chat-message entry. Easing
   * is the platform default (cubic-bezier(0.25, 0.1, 0.25, 1)) — the
   * classic browser "ease", chosen for muscle-memory familiarity. */
  --motion-fast:   100ms;
  --motion-base:   200ms;
  --ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* ─── Layout ───────────────────────────────────────────────────────
   * 1200px container fits WeChat's marketing-site pattern; phone
   * gutters stay at 16px to match the chat row inset. */
  --container-max:            1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet:  16px;
  --container-gutter-phone:   16px;
}
`,Fs=`/* design-systems/wired/tokens.css
 *
 * Structured token bindings for WIRED.
 * authoritative technology journalism with monochrome discipline and sharp red alerts.
 */

:root {
  --bg: #ffffff;
  --surface: #f2f2f2;
  --surface-warm: #fff0f0;
  --fg: #000000;
  --fg-2: #333333;
  --muted: #666666;
  --meta: #e10600;
  --border: #d0d0d0;
  --border-soft: #e8e8e8;
  --accent: #e10600;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #0f8a3b;
  --warn: #f5a400;
  --danger: #c40000;
  --font-display: "Druk Wide", "Arial Black", Impact, sans-serif;
  --font-body: "Exchange", Georgia, serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 17px;
  --text-lg: 20px;
  --text-xl: 28px;
  --text-2xl: 44px;
  --text-3xl: 68px;
  --text-4xl: 96px;
  --leading-body: 1.55;
  --leading-tight: 0.92;
  --tracking-display: -0.02em;
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
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 16px 40px rgba(0, 0, 0, 0.14);
  --focus-ring: 0 0 0 4px rgba(225, 6, 0, 0.24);
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 34px;
  --container-gutter-tablet: 26px;
  --container-gutter-phone: 18px;
}
`,Hs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/wise/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Wise".
 * Money without borders: bright spring-green CTAs on warm-neutral canvas,
 * billboard Wise Sans at weight 900 with 0.85 line-height, pill buttons,
 * ring-only shadows, and "calt" everywhere.
 *
 * Key brand decisions encoded here:
 *   - Wise Green (#9fe870) as the only accent; Dark Green (#163300) as
 *     --accent-on — green-on-green CTA is THE Wise signature, not white.
 *   - Pastel Green (#cdffad) for hover — lighter, contrast-up, not darker.
 *   - Near-Black with warm green undertone (#0e0f0c), never pure #000.
 *   - Inter weight 600 as body default — confident, not light. Wise Sans
 *     weight 900 for display, line-height 0.85, letter-spacing normal.
 *   - Ring-only elevation: rgba(14,15,12,0.12) 1px ring; no traditional
 *     drop shadows anywhere. Depth comes from green-on-neutral contrast.
 *   - Pill buttons (9999px); cards span 16px → 30px → 40px radius tiers.
 *   - 18px body baseline (not 16px) — Wise reads bigger than typical UI.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * White canvas with a barely-tinted green-gray surface tier. The
   * background is pure white because the green accent must read as
   * the only colored element on the page. */
  --bg: #ffffff;                  /* Pure white canvas — green pops as the sole accent */
  --surface: #e8ebe6;             /* Light Surface — subtle green-tinted neutral */
  --surface-warm: var(--surface); /* alias — no warm tier; Wise is cool-green, not warm */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Near-black with a warm green undertone (#0e0f0c) — never #000.
   * The faint green in the black ties text to the brand accent. */
  --fg: #0e0f0c;             /* Near Black — primary text, headlines */
  --fg-2: var(--fg);         /* alias — single confident text color */
  --muted: #868685;          /* Gray — captions, tertiary text */
  --meta: var(--muted);      /* alias — same gray for metadata */

  /* ─── Border ──────────────────────────────────────────────────────
   * Matches the ring-shadow color from DESIGN.md §6 — borders and
   * ring elevation share the same hairline so cards read as one
   * unified material. */
  --border: rgba(14, 15, 12, 0.12); /* Ring hairline — also used by --elev-ring */
  --border-soft: var(--border);     /* alias — no inner separator distinction */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Wise Green — the brand's most recognizable element. Reserved for
   * primary CTAs and brand moments; never used as a large surface.
   * Hover lightens to Pastel Green (Wise's contrast-up convention),
   * active darkens via color-mix. */
  --accent: #9fe870;         /* Wise Green — primary CTA, brand signal */
  --accent-on: #163300;      /* Dark Green text on Wise Green — THE signature */
  --accent-hover: #cdffad;   /* Pastel Green — lighter on hover, not darker */
  --accent-active: color-mix(in oklab, var(--accent), black 12%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Pulled from Wise's semantic palette in DESIGN.md §2. Positive
   * is deep green (#054d28) to stay in the brand family rather than
   * jumping to a generic emerald. */
  --success: #054d28;        /* Positive Green — success state, in-brand */
  --warn: #ffd11a;           /* Warning Yellow — Wise's hover-warn yellow */
  --danger: #d03238;         /* Danger Red — destructive / error */

  /* ─── Typography ──────────────────────────────────────────────────
   * Wise Sans for display (weight 900 in components), Inter for body
   * (weight 600 as default). Both stacks enable "calt" at the
   * component layer. Helvetica/Arial fall back to keep the system
   * usable when proprietary Wise Sans is unavailable. */
  --font-display: "Wise Sans", Inter, ui-sans-serif, system-ui, sans-serif;
  --font-body: Inter, Helvetica, Arial, ui-sans-serif, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §3. 18px body baseline, 96px hero display.
   * Wise reads bigger than typical UI; --text-base = 18px is intentional. */
  --text-xs: 12px;           /* Small */
  --text-sm: 14px;           /* Caption */
  --text-base: 18px;         /* Body — confident, larger than typical UI */
  --text-lg: 22px;           /* Feature Title */
  --text-xl: 26px;           /* Card Title */
  --text-2xl: 40px;          /* Sub-heading */
  --text-3xl: 64px;          /* Section Heading */
  --text-4xl: 96px;          /* Display Hero — billboard Wise Sans 900 */

  --leading-body: 1.44;      /* Inter body rhythm per DESIGN.md */
  --leading-tight: 0.85;     /* Wise Sans display — letters overlap vertically */
  --tracking-display: normal; /* DESIGN.md: normal tracking on all Wise Sans display sizes */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 8px base unit. Section vertical spacing 80px desktop. */
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
   * Wise's radius vocabulary spans pill buttons to deeply-rounded
   * cards. Per DESIGN.md §5: 16px (small cards), 30px (medium
   * features), 40px (large containers/tables), 9999px (all buttons). */
  --radius-sm: 16px;         /* Small cards, inputs — Wise's "card" tier */
  --radius-md: 30px;         /* Medium feature cards */
  --radius-lg: 40px;         /* Large containers, tables — Wise's signature deep round */
  --radius-pill: 9999px;     /* All buttons, badges */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Ring-only philosophy per DESIGN.md §6. No drop shadows; depth
   * lives in the green-on-neutral contrast. --elev-raised is kept
   * extremely subtle (1px ring + whisper of lift) for components
   * that genuinely need to read as elevated. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 0 0 1px var(--border), 0 2px 8px rgba(14, 15, 12, 0.04);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Green-tinted focus ring — keeps the accent visible without
   * introducing a competing color. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 60%);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Standard 150/200ms. Note: the scale(1.05) hover and scale(0.95)
   * active that DESIGN.md §4 calls out live in component CSS — they
   * are interaction grammar, not token grammar. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1280px container — generous for billboard typography while still
   * comfortable on standard laptop displays. */
  --container-max: 1280px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,Ie=1,Me="od-design-tokens/v1",$e="TOKEN_SCHEMA",_e="2026-06-06T00:00:00.000Z",Te={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},We={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ce=JSON.parse('[{"name":"--bg","value":"#fbf6ee","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#fffdf8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#f1e3cf","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#201914","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4c4037","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#7a6d63","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#9b5b32","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#ded2c3","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#eee4d7","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#9b5b32","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#4f8a4f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#c9822f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#b33a3a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Georgia, \\"Times New Roman\\", serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.62","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"112px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 20px 52px rgba(32, 25, 20, 0.12)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(155, 91, 50, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),js={schemaVersion:Ie,format:Me,contract:$e,generatedAt:_e,source:Te,summary:We,tokens:Ce},Fe=1,He="od-design-tokens/v1",je="TOKEN_SCHEMA",Re="2026-06-06T00:00:00.000Z",Ve={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Oe={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:2,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ze=JSON.parse('[{"name":"--bg","value":"#161412","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--bg"},{"name":"--surface","value":"#1f1d1b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#faf9f6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--fg"},{"name":"--fg-2","value":"#afaeac","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--fg-2"},{"name":"--muted","value":"#868584","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--muted"},{"name":"--meta","value":"#666469","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--meta"},{"name":"--border","value":"rgba(226, 226, 226, 0.35)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--border-soft"},{"name":"--accent","value":"#353534","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--accent"},{"name":"--accent-on","value":"#afaeac","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#454545","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Matter Regular\\", \\"Matter\\", \\"Inter\\", ui-sans-serif, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Matter Regular\\", \\"Matter\\", \\"Inter\\", ui-sans-serif, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Geist Mono\\", \\"Matter Mono Regular\\", ui-monospace, \\"SF Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--text-sm"},{"name":"--text-base","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--text-base"},{"name":"--text-lg","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.4","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.0","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.03em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"120px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:112"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:113"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:114"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"6px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"14px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 5px 15px rgba(0, 0, 0, 0.2)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px rgba(250, 249, 246, 0.5)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:144"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:145"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:146"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1500px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:152"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:153"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:154"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:155"],"sourceName":"--container-gutter-phone"}]'),Rs={schemaVersion:Fe,format:He,contract:je,generatedAt:Re,source:Ve,summary:Oe,tokens:ze},Pe=1,Le="od-design-tokens/v1",Je="TOKEN_SCHEMA",Ke="2026-06-06T00:00:00.000Z",Ue={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ye={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ze=JSON.parse('[{"name":"--bg","value":"#f6f8fb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#eef8f6","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#0f172a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#334155","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#64748b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#12a594","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#dbe4ee","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#edf2f7","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#00a3a6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#22c55e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#f59e0b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#e11d48","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"CiscoSansTT\\", Inter, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"CiscoSansTT\\", Inter, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.55","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.015em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"18px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"28px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 20px 50px rgba(15, 23, 42, 0.10)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(0, 163, 166, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"160ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.22, 1, 0.36, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),Vs={schemaVersion:Pe,format:Le,contract:Je,generatedAt:Ke,source:Ue,summary:Ye,tokens:Ze},qe=1,Qe="od-design-tokens/v1",Xe="TOKEN_SCHEMA",es="2026-06-06T00:00:00.000Z",ss={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ns={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},as=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#080808","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--fg"},{"name":"--fg-2","value":"#363636","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--fg-2"},{"name":"--muted","value":"#5a5a5a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--muted"},{"name":"--meta","value":"#ababab","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--meta"},{"name":"--border","value":"#d8d8d8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--border"},{"name":"--border-soft","value":"#ebebeb","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--border-soft"},{"name":"--accent","value":"#146ef5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#0055d4","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--accent-active"},{"name":"--success","value":"#00d722","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--success"},{"name":"--warn","value":"#ffae13","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--warn"},{"name":"--danger","value":"#ee1d36","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"WF Visual Sans Variable\\", \\"Inter\\", Arial, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"WF Visual Sans Variable\\", \\"Inter\\", Arial, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Inconsolata\\", ui-monospace, \\"SF Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.6","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.04","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:133"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:134"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:148"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0px 84px 24px rgba(0, 0, 0, 0), 0px 54px 22px rgba(0, 0, 0, 0.01), 0px 30px 18px rgba(0, 0, 0, 0.04), 0px 13px 13px rgba(0, 0, 0, 0.08), 0px 3px 7px rgba(0, 0, 0, 0.09)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:162"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:179"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:180"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:187"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:188"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:189"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:190"],"sourceName":"--container-gutter-phone"}]'),Os={schemaVersion:qe,format:Qe,contract:Xe,generatedAt:es,source:ss,summary:ns,tokens:as},rs=1,os="od-design-tokens/v1",cs="TOKEN_SCHEMA",ts="2026-06-06T00:00:00.000Z",ls={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},is={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:4,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ds=JSON.parse('[{"name":"--bg","value":"#ededed","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--bg"},{"name":"--surface","value":"#f7f7f7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1a1a1a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--fg-2"},{"name":"--muted","value":"#888888","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--muted"},{"name":"--meta","value":"var(--muted)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--meta"},{"name":"--border","value":"#e0e0e0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--border-soft"},{"name":"--accent","value":"#07c160","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#10b160","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#059050","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--accent-active"},{"name":"--success","value":"#07c160","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--success"},{"name":"--warn","value":"#fab702","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--warn"},{"name":"--danger","value":"#fa5151","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--danger"},{"name":"--font-display","value":"-apple-system, BlinkMacSystemFont, \\"PingFang SC\\", \\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Noto Sans SC\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--font-display"},{"name":"--font-body","value":"-apple-system, BlinkMacSystemFont, \\"PingFang SC\\", \\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Noto Sans SC\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.6","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:114"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.3","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:125"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"72px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:135"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:136"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:143"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:144"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:145"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:146"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:152"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:153"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 1px 2px rgba(0, 0, 0, 0.06)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:154"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:165"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:166"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.25, 0.1, 0.25, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:167"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:174"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--container-gutter-phone"}]'),zs={schemaVersion:rs,format:os,contract:cs,generatedAt:ts,source:ls,summary:is,tokens:ds},us=1,ms="od-design-tokens/v1",ps="TOKEN_SCHEMA",fs="2026-06-06T00:00:00.000Z",hs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ks={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ys=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--bg"},{"name":"--surface","value":"#f2f2f2","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fff0f0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#000000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg"},{"name":"--fg-2","value":"#333333","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--fg-2"},{"name":"--muted","value":"#666666","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--muted"},{"name":"--meta","value":"#e10600","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--meta"},{"name":"--border","value":"#d0d0d0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border"},{"name":"--border-soft","value":"#e8e8e8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--border-soft"},{"name":"--accent","value":"#e10600","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--accent-active"},{"name":"--success","value":"#0f8a3b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--success"},{"name":"--warn","value":"#f5a400","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--warn"},{"name":"--danger","value":"#c40000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Druk Wide\\", \\"Arial Black\\", Impact, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Exchange\\", Georgia, serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"IBM Plex Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-sm"},{"name":"--text-base","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.55","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.92","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"88px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"44px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 16px 40px rgba(0, 0, 0, 0.14)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(225, 6, 0, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"34px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--container-gutter-phone"}]'),Ps={schemaVersion:us,format:ms,contract:ps,generatedAt:fs,source:hs,summary:ks,tokens:ys},gs=1,bs="od-design-tokens/v1",ws="TOKEN_SCHEMA",xs="2026-06-06T00:00:00.000Z",vs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Bs={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:4,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ns=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--bg"},{"name":"--surface","value":"#e8ebe6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#0e0f0c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--fg-2"},{"name":"--muted","value":"#868685","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--muted"},{"name":"--meta","value":"var(--muted)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--meta"},{"name":"--border","value":"rgba(14, 15, 12, 0.12)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--border-soft"},{"name":"--accent","value":"#9fe870","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--accent"},{"name":"--accent-on","value":"#163300","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#cdffad","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 12%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--accent-active"},{"name":"--success","value":"#054d28","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--success"},{"name":"--warn","value":"#ffd11a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--warn"},{"name":"--danger","value":"#d03238","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Wise Sans\\", Inter, ui-sans-serif, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, Helvetica, Arial, ui-sans-serif, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--text-sm"},{"name":"--text-base","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--text-base"},{"name":"--text-lg","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.44","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.85","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"normal","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"30px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"40px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 0 0 1px var(--border), 0 2px 8px rgba(14, 15, 12, 0.04)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 60%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--container-gutter-phone"}]'),Ls={schemaVersion:gs,format:bs,contract:ws,generatedAt:xs,source:vs,summary:Bs,tokens:Ns};export{Ms as _,Is as a,Es as b,Ds as c,Gs as d,Ss as e,As as f,Hs as g,Fs as h,Cs as i,Ws as j,Ts as k,_s as l,$s as m,Ls as n,Ps as o,zs as p,Os as q,Vs as r,Rs as s,js as t};
