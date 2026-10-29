const e="od-design-system-project/v1",s="dashboard",r="Dashboard",n="Professional & Corporate",a="Bundled Open Design package for Dashboard, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},c={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},t="USAGE.md",l="components.manifest.json",i="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},As={schemaVersion:e,id:s,name:r,category:n,description:a,source:o,files:c,usage:t,componentsManifest:l,importMode:i,craft:d,sourceFiles:u},m="od-design-system-project/v1",f="default",p="Neutral Modern",h="Starter",k="Bundled Open Design package for Neutral Modern, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},B={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ss={schemaVersion:m,id:f,name:p,category:h,description:k,source:y,files:g,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:B},N="od-design-system-project/v1",A="discord",S="Discord",$="Productivity & SaaS",_="Bundled Open Design package for Discord, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",D={type:"bundled",origin:"Open Design curated bundled fixture"},T={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},M="USAGE.md",E="components.manifest.json",C="normalized",F={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},I={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},$s={schemaVersion:N,id:A,name:S,category:$,description:_,source:D,files:T,usage:M,componentsManifest:E,importMode:C,craft:F,sourceFiles:I},G="od-design-system-project/v1",j="dithered",O="Dithered",z="Retro & Nostalgic",H="Bundled Open Design package for Dithered, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",V={type:"bundled",origin:"Open Design curated bundled fixture"},R={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},P="USAGE.md",J="components.manifest.json",K="normalized",L={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},U={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},_s={schemaVersion:G,id:j,name:O,category:z,description:H,source:V,files:R,usage:P,componentsManifest:J,importMode:K,craft:L,sourceFiles:U},Z="od-design-system-project/v1",W="doodle",q="Doodle",Y="Creative & Artistic",X="Bundled Open Design package for Doodle, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Q={type:"bundled",origin:"Open Design curated bundled fixture"},ee={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},se="USAGE.md",re="components.manifest.json",ne="normalized",ae={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},oe={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ds={schemaVersion:Z,id:W,name:q,category:Y,description:X,source:Q,files:ee,usage:se,componentsManifest:re,importMode:ne,craft:ae,sourceFiles:oe},ce="od-design-system-project/v1",te="dramatic",le="Dramatic",ie="Bold & Expressive",de="Bundled Open Design package for Dramatic, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",ue={type:"bundled",origin:"Open Design curated bundled fixture"},me={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},fe="USAGE.md",pe="components.manifest.json",he="normalized",ke={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},ye={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ts={schemaVersion:ce,id:te,name:le,category:ie,description:de,source:ue,files:me,usage:fe,componentsManifest:pe,importMode:he,craft:ke,sourceFiles:ye},ge="od-design-system-project/v1",be="duolingo",we="Duolingo",xe="Productivity & SaaS",ve="Bundled Open Design package for Duolingo, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",Be={type:"bundled",origin:"Open Design curated bundled fixture"},Ne={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},Ae="USAGE.md",Se="components.manifest.json",$e="normalized",_e={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},De={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},Ms={schemaVersion:ge,id:be,name:we,category:xe,description:ve,source:Be,files:Ne,usage:Ae,componentsManifest:Se,importMode:$e,craft:_e,sourceFiles:De},Es=`/* design-systems/dashboard/tokens.css
 * Structured token bindings for Dashboard.
 * analytics dashboard with compact cards, cool surfaces, and status-first information design.
 */

:root {
  --bg: #f4f7fb;
  --surface: #ffffff;
  --surface-warm: #eef6ff;
  --fg: #111827;
  --fg-2: #334155;
  --muted: #64748b;
  --meta: #0ea5e9;
  --border: #d8e2ee;
  --border-soft: #edf3f8;
  --accent: #0ea5e9;
  --accent-on: #04131d;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #10b981;
  --warn: #f59e0b;
  --danger: #ef4444;
  --font-display: Inter, system-ui, sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 17px;
  --text-xl: 22px;
  --text-2xl: 30px;
  --text-3xl: 42px;
  --text-4xl: 56px;
  --leading-body: 1.48;
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
  --section-y-desktop: 84px;
  --section-y-tablet: 60px;
  --section-y-phone: 42px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 18px 46px rgba(15, 23, 42, 0.10);
  --focus-ring: 0 0 0 4px rgba(14, 165, 233, 0.22);
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1280px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Cs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/default/tokens.css
 *
 * Structured token bindings for "Neutral Modern" — the canonical
 * starter design system. This file is the *machine-readable* form of
 * the values described in \`DESIGN.md\`. Agents are expected to paste
 * the \`:root { … }\` block verbatim into the first \`<style>\` of every
 * artifact they generate against this design system, then reference
 * tokens via \`var(--name)\` from then on.
 *
 * Why this file exists:
 *   DESIGN.md gives humans context ("Accent #2F6FEB — primary CTAs"),
 *   but agents have to translate prose names like "Accent" into the
 *   standard token names the lint enforces (\`--accent\`). That
 *   translation is where token misuse happens. This file pre-translates
 *   the brand once, so agents copy structure instead of inventing it.
 *
 * Contract sources:
 *   - Standard token names: craft/color.md
 *       (--bg / --surface / --fg / --muted / --border / --accent
 *        / --success / --warn / --danger)
 *   - Display-face contract: craft/anti-ai-slop.md
 *       (--font-display, must be referenced via var())
 *   - Lint enforcement: apps/daemon/src/lint-artifact.ts
 *       (raw-hex >12 outside :root → P1; indigo laundering → P0)
 *
 * Schema notes (the shared schema grew from kami's stress test —
 * see design-systems/kami/tokens.css for the rich form, and the
 * #Gap N tags below for what each addition resolves):
 *   #Gap 1  — 4-level foreground ramp (fg / fg-2 / muted / meta)
 *   #Gap 2  — 3-level surface (bg / surface / surface-warm)
 *   #Gap 3  — 2-level border (border / border-soft)
 *   #Gap 4  — accent-hover binds to value, not formula
 *   #Gap 5  — ring elevation as a first-class level (--elev-ring)
 *
 * Default doesn't differentiate every level kami needs, so the
 * shallow tokens (\`--fg-2\`, \`--meta\`, \`--surface-warm\`, \`--border-soft\`)
 * collapse to their richer siblings via \`var()\`. The names still
 * exist so components can reference them uniformly across brands.
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the craft contracts. New brands cloning this template
 * should overwrite values, not rename keys.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels — #Gap 2) ─────────────────────────────────
   * Per craft/color.md: never pure black, never pure white. Default
   * uses #FAFAFA for bg and #FFFFFF for surface — the cream-to-white
   * contrast gives cards lift without a shadow. \`--surface-warm\` is a
   * schema slot for brands that need a tertiary tier (kami's warm-sand
   * button bg); default has no third tier and aliases it to surface. */
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-warm: var(--surface);   /* alias — default has no warm tier */

  /* ─── Foreground ramp (4 levels — #Gap 1) ───────────────────────
   * Default differentiates only two text levels (primary + muted).
   * \`--fg-2\` and \`--meta\` are schema slots for brands with richer
   * ramps (kami uses near-black / dark-warm / olive / stone). They
   * alias here so components targeting the full ramp resolve. */
  --fg: #111111;
  --fg-2: var(--fg);                /* alias — default has no secondary tier */
  --muted: #6b6b6b;
  --meta: var(--muted);             /* alias — default has no metadata tier */

  /* ─── Border (2 levels — #Gap 3) ────────────────────────────────
   * Default has one border weight; \`--border-soft\` is a schema slot
   * for brands with row-separator vs card-edge differentiation. */
  --border: #e5e5e5;
  --border-soft: var(--border);     /* alias — default has no soft tier */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Cobalt — primary CTAs, links, ONE hero element per screen.
   * Hard cap of 2 visible uses per screen is enforced by lint
   * (\`accent-overuse\` P1 fires at >6 inline occurrences). */
  --accent: #2f6feb;
  --accent-on: #ffffff; /* fg when accent is the bg (e.g. button label) */

  /* ─── Accent states (#Gap 4) ────────────────────────────────────
   * Hover and active variants for any element using --accent as bg.
   * Default's mid-luminance cobalt admits a black-mix formula
   * cleanly; that's a brand-specific binding, NOT a schema rule.
   * kami binds --accent-hover to var(--accent) (no color shift,
   * hover via elevation) because ink-blue is too dark for further
   * darkening to read; other brands with light accents must
   * hand-pick.
   *
   * Schema rule: every brand provides --accent-hover and
   * --accent-active. The binding strategy (formula / identity /
   * hand-picked) is brand-decided.
   *
   * Why these two are tokens (and other tints stay inline):
   *   - cross-component (button, chip, tab, dropdown all need them)
   *   - cross-mode reversal (dark-mode hover should mix white, not
   *     black — token re-binding is one line per mode)
   *   - cross-brand customization (formula breaks on light accents)
   *   - lint-enforceable contract (every brand must provide these)
   * Other inline \`color-mix(...)\` calls in components don't yet hit
   * any of the above — promote them to tokens when a second use
   * appears. */
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ────────────────────────────────────────────────────
   * Reserved for state, not decoration. Keep total semantic-color
   * pixels under 5% of the surface. */
  --success: #17a34a;
  --warn: #eab308;
  --danger: #dc2626;

  /* ─── Typography ──────────────────────────────────────────────────
   * Inter for display is the documented "modern minimal" override
   * to anti-ai-slop's serif-display rule (see DESIGN.md
   * §Visual Theme & Atmosphere — "Calm, functional, quietly
   * confident"). Other brands should rebind --font-display to a
   * serif unless their direction is also tech/utility. */
  --font-display: "Inter", -apple-system, system-ui, sans-serif;
  --font-body: "Inter", -apple-system, system-ui, sans-serif;
  --font-mono: ui-monospace, "JetBrains Mono", monospace;

  /* Type scale (px) — direct copy of DESIGN.md §Typography Rules */
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 48px;
  --text-4xl: 64px;

  --leading-body: 1.5;
  --leading-tight: 1.2;
  --tracking-display: -0.01em; /* applied to display sizes ≥32px */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 4px base unit. Section rhythm (80/48/32) lives below as named
   * tokens because DESIGN.md §Layout Principles treats them as
   * breakpoint-specific decisions, not generic spacing. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-20: 80px;

  --section-y-desktop: 80px;
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Two intents: small (button/input) and medium (card/modal).
   * \`--radius-pill\` reserved for chips/avatars; do not use it on
   * cards or buttons. */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* ─── Elevation (3 levels — #Gap 5) ─────────────────────────────
   * Default uses two levels (flat + raised blur shadow) per its own
   * DESIGN.md §Depth & Elevation. The schema gains \`--elev-ring\` as
   * a first-class level so brands using ring shadows as primary
   * elevation (kami, paper, editorial) don't need to rebind
   * --elev-raised away from blur. Default declares all three; ring
   * is available for hairline edges where a 1px border would shift
   * layout. No fourth level — that's neumorphism territory. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 2px 8px color-mix(in oklab, var(--fg), transparent 92%);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Single source of truth for keyboard-focus indicators. Every
   * \`:focus-visible\` rule on buttons, inputs, links, and tabs must
   * use this token — uniform behavior is itself a brand signal, and
   * craft/accessibility-baseline.md treats focus visibility as a
   * non-negotiable. Implemented as a \`box-shadow\` so it layers
   * outside the element without affecting layout. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Two durations + one easing curve, per anti-ai-slop's "short,
   * purposeful transitions (150–250ms) with stable easing". Add a
   * third duration only when a real interaction needs it; do not
   * invent \`--motion-slow\` speculatively. */
  --motion-fast: 150ms;            /* hover, focus, micro-states */
  --motion-base: 200ms;            /* general state changes */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * Container width and per-breakpoint gutter. Skill-side responsive
   * code reads these to decide grid columns. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,Fs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/discord/tokens.css
 *
 * Structured token bindings for the "Discord" brand — deep blurple,
 * dark-first surfaces, voice-and-chat for gaming and community.
 *
 * Brand identity in three sentences:
 *   1. Dark-first: three-step depth ladder (#1e1f22 deepest → #2b2d31
 *      sidebar → #313338 chat surface), pixel-snapped 1px dividers at
 *      low alpha, rounded-square server avatars that morph to circles.
 *   2. gg sans (friendly geometric, Whitney-replacement) for all text at
 *      400/500/600/700/800 weights; 16px body never shrinks; hierarchy
 *      comes from weight contrast over color contrast.
 *   3. Blurple (#5865f2) as the single saturated accent — reserved for
 *      brand mark, primary CTAs, mentions, and "you" affordances; used
 *      sparingly so it pops against the muted dark surface.
 *
 * Schema decisions:
 *   - --bg: #313338 (chat surface / primary dark); --surface: #2b2d31.
 *   - --surface-warm: #191a1e (deepest — server list rail, level below).
 *   - --fg: #dbdee1 (text-normal — cooler than pure white).
 *   - --fg-2: #f2f3f5 (header-primary — modal titles, channel headers).
 *   - --muted: #949ba4 (text-muted — timestamps, metadata).
 *   - --border: rgba(255,255,255,0.06); --border-soft: same.
 *   - --accent: #5865f2 (Blurple); --accent-hover: #4752c4.
 *   - --tracking-display: -0.02em (display 56px hero per DESIGN.md).
 *   - --radius-sm: 4px (buttons/inputs); --radius-md: 8px (cards).
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────── */
  --bg:           #313338;              /* chat surface / primary dark */
  --surface:      #2b2d31;              /* channel sidebar, settings sidebar */
  --surface-warm: #1e1f22;             /* server list rail — deepest layer */

  /* ─── Foreground ───────────────────────────────────────────────── */
  --fg:   #dbdee1;                      /* text-normal — slightly cooler than white */
  --fg-2: #f2f3f5;                      /* header-primary — modal titles */
  --muted: #949ba4;                     /* text-muted — timestamps, server names */
  --meta:  #80848e;                     /* channels-default — inactive sidebar names */

  /* ─── Border ───────────────────────────────────────────────────── */
  --border:      rgba(255, 255, 255, 0.06);  /* standard divider */
  --border-soft: #3f4147;                    /* solid divider for cards */

  /* ─── Accent ───────────────────────────────────────────────────── */
  --accent:        #5865f2;            /* Blurple — brand primary CTA */
  --accent-on:     #ffffff;
  --accent-hover:  #4752c4;            /* darker hover */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ─────────────────────────────────────────────────── */
  --success: #23a55a;                  /* status-online green */
  --warn:    #f0b232;                  /* status-idle yellow */
  --danger:  #f23f43;                  /* status-dnd / destructive red */

  /* ─── Typography ───────────────────────────────────────────────── */
  --font-display: "gg sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    "gg sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    "gg mono", Consolas, "Andale Mono", "Courier New", Courier, monospace;

  /* Type scale — DESIGN.md §Typography Hierarchy.
   * Discord: 56px display, 24px page heading, 16px body (never shrinks).
   * Schema spine: xs=12 (timestamp/caption), base=16, 4xl=56. */
  --text-xs:   12px;                   /* timestamp / caption / meta */
  --text-sm:   14px;                   /* compact metadata */
  --text-base: 16px;                   /* message body — never below 16px */
  --text-lg:   18px;                   /* feature heading */
  --text-xl:   20px;                   /* sub-heading */
  --text-2xl:  24px;                   /* page heading — settings/profile */
  --text-3xl:  32px;                   /* section heading */
  --text-4xl:  56px;                   /* display hero — marketing */

  /* Leading + tracking.
   * --leading-tight=1.10: 56px hero compression.
   * h2 (32px) → 1.20; h3 (24px) → 1.25 per brand feel.
   * --tracking-display: -0.02em (display 56px per DESIGN.md). */
  --leading-body:     1.375;
  --leading-tight:    1.10;
  --tracking-display: -0.02em;

  /* ─── Spacing ──────────────────────────────────────────────────── */
  /* 4px base grid per DESIGN.md §Spacing & Layout. */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 40px;

  /* Section rhythm. */
  --section-y-desktop: 80px;
  --section-y-tablet:  48px;
  --section-y-phone:   32px;

  /* ─── Radius ───────────────────────────────────────────────────── */
  /* 4px for buttons/inputs; 8px for cards. Rounded but not balloon-soft. */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────── */
  /* Dark surfaces: luminance stepping; semi-transparent white borders
     as depth signal rather than drop shadows. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised: rgba(0, 0, 0, 0.4) 0px 2px 4px, 0 0 0 1px rgba(255, 255, 255, 0.06);

  /* ─── Focus ────────────────────────────────────────────────────── */
  --focus-ring: 0 0 0 3px rgba(88, 101, 242, 0.3);

  /* ─── Motion ───────────────────────────────────────────────────── */
  --motion-fast:   80ms;
  --motion-base:   200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ───────────────────────────────────────────────────── */
  --container-max:            1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet:  16px;
  --container-gutter-phone:   16px;
}
`,Is=`/* design-systems/dithered/tokens.css
 * Structured token bindings for Dithered.
 * dithered retro interface with hard edges, bitmap texture, and compact monochrome controls.
 */

:root {
  --bg: #fff4cf;
  --surface: #fffaf0;
  --surface-warm: #ffdca8;
  --fg: #2a1810;
  --fg-2: #593625;
  --muted: #8a6652;
  --meta: #d24b1f;
  --border: #d9aa7a;
  --border-soft: #efd0ab;
  --accent: #d24b1f;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #3d8f4f;
  --warn: #f2a93b;
  --danger: #b83a2f;
  --font-display: "Courier New", ui-monospace, monospace;
  --font-body: Inter, system-ui, sans-serif;
  --font-mono: "Courier New", ui-monospace, monospace;
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
  --section-y-phone: 42px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 6px 6px 0 rgba(42, 24, 16, 0.26);
  --focus-ring: 0 0 0 4px rgba(210, 75, 31, 0.28);
  --motion-fast: 100ms;
  --motion-base: 180ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1280px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Gs=`/* design-systems/doodle/tokens.css
 * Structured token bindings for Doodle.
 * doodle visual language with sketchbook warmth, soft cards, and informal orange accents.
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
  --font-display: "Comic Sans MS", "Trebuchet MS", sans-serif;
  --font-body: "Comic Sans MS", "Trebuchet MS", sans-serif;
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
`,js=`/* design-systems/dramatic/tokens.css
 * Structured token bindings for Dramatic.
 * dramatic cinematic interface with dark surfaces, strong contrast, and spotlight accent states.
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
  --elev-raised: 0 24px 72px rgba(0, 0, 0, 0.42);
  --focus-ring: 0 0 0 4px rgba(96, 165, 250, 0.28);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,Os=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/duolingo/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Duolingo".
 * Bright owl-green gamified universe: chunky 4px bottom-shadows, big
 * confident type, friendly pill geometry, mascot-driven warmth.
 *
 * Key brand decisions encoded here:
 *   - Owl Green (#58cc02) — dominant brand color, primary CTA + correct answer
 *   - Snow white canvas (#ffffff) — never tinted; optical clarity is the foundation
 *   - 4px chunky offset shadow (--elev-raised) — the "tactile press" signature
 *   - Feather Bold + Mona Sans — rounded display + Swiss workhorse body
 *   - Display starts at 56px — Duolingo never whispers; size is identity
 *   - Pill-and-rounded radii — 16px cards, 12px buttons/inputs, 9999px chips
 *   - Spring easing (back-out, slight overshoot) — gamified joy in motion
 *   - Eel-blue focus ring (#1cb0f6 tinted) — playful contrast to the green brand
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * Snow white canvas with Eel as the section-break tone. Pure optical
   * clarity — Duolingo never tints the page itself, only the chrome. */
  --bg: #ffffff;             /* Snow — primary background, the page canvas */
  --surface: #f7f7f7;        /* Eel — section break, secondary surface, lesson row */
  --surface-warm: var(--surface); /* alias — palette has no third (warm) surface tier */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Three real text tiers: Eel Black for primary, Wolf for secondary,
   * Hare for tertiary. Each tier carries clear, child-readable contrast. */
  --fg: #3c3c3c;             /* Eel Black — primary text, headings, button labels */
  --fg-2: var(--fg);         /* alias — single primary text weight throughout */
  --muted: #777777;          /* Wolf — secondary text, captions, dividers */
  --meta: #afafaf;           /* Hare — tertiary metadata, placeholder, disabled */

  /* ─── Border ──────────────────────────────────────────────────────
   * Swan grey at thick 2–3px on most surfaces. Borders are visual,
   * never hairlines — they read as part of the chunky aesthetic. */
  --border: #e5e5e5;         /* Swan — standard 2px border, card edge */
  --border-soft: var(--border); /* alias — single border tier (no inner-row separation) */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Owl Green — the brand IS this green. Used liberally in 30%+ of the
   * surface for buttons, progress bars, success states, brand chrome. */
  --accent: #58cc02;
  --accent-on: #ffffff;
  --accent-hover: #89e219;   /* Owl Green Light — hover state, soft fills */
  --accent-active: #58a700;  /* Owl Green Deep — pressed state, the chunky shadow color */

  /* ─── Semantic ────────────────────────────────────────────────────
   * Success IS owl green — DESIGN.md: "primary CTA, correct answer" are
   * the same affordance. Bee Yellow warns; Cardinal Red marks wrong. */
  --success: #58cc02;        /* Owl Green — "correct answer" is the brand */
  --warn: #ffc800;           /* Bee Yellow — pro badge, achievement glow */
  --danger: #ff4b4b;         /* Cardinal Red — wrong answer, life lost */

  /* ─── Typography ──────────────────────────────────────────────────
   * Feather Bold (rounded display) drives chrome and headings; Mona Sans
   * carries body. Default weight is 800 — Duolingo never whispers. */
  --font-display: "Feather Bold", "DIN Round Pro", "Helvetica Neue", sans-serif;
  --font-body: "Mona Sans", "Helvetica Neue", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §3. Display 56px is +25–40% above typical
   * product brands; the ladder favors round whole-pixel sizes. */
  --text-xs: 12px;           /* Tiny utility, progress numerals */
  --text-sm: 13px;           /* Caption — XP counter, metadata */
  --text-base: 15px;         /* Body — standard prose */
  --text-lg: 18px;           /* H3 / lesson row title / featured body */
  --text-xl: 24px;           /* H2 — section heading */
  --text-2xl: 32px;          /* H1 — page title */
  --text-3xl: 40px;          /* Sub-display — hero secondary, marketing eyebrow */
  --text-4xl: 56px;          /* Display — onboarding hero, never timid */

  --leading-body: 1.5;
  --leading-tight: 1.15;     /* Headings — slight breathing under big rounded faces */
  --tracking-display: -0.01em; /* ≈ -0.56px at 56px — confident, not condensed */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * 4px base unit (DESIGN.md §5): 4, 8, 12, 16, 20, 24, 32, 48. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Section rhythm — generous on desktop, tight on phone so the lesson
   * tree column reads as a continuous flow rather than chunked pages. */
  --section-y-desktop: 80px;
  --section-y-tablet: 56px;
  --section-y-phone: 40px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Pill-and-rounded everywhere. Cards 16px (DESIGN.md §4), buttons +
   * inputs 12px, chips and progress bars 9999px — friendly forever. */
  --radius-sm: 12px;         /* Inputs, buttons — friendly compact corners */
  --radius-md: 16px;         /* Cards, lesson tiles — primary signature */
  --radius-lg: 20px;         /* Featured containers, modals */
  --radius-pill: 9999px;     /* Chips, progress bars, avatars */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Chunky 4px bottom-shadow IS Duolingo. Buttons and cards cast a hard
   * offset shadow that reads as a 3D button waiting to be pressed. The
   * raised value pairs with translateY(4px) on :active to "press" it. */
  --elev-flat: none;
  --elev-ring: 0 0 0 2px var(--border); /* 2px ring matches the chunky border weight */
  --elev-raised: 0 4px 0 #d7d7d7; /* Hard tactile shadow — the press affordance */

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Eel Blue 20% tint (DESIGN.md §4 inputs) — playful contrast against
   * the ambient owl-green brand; signals "you can interact with this". */
  --focus-ring: 0 0 0 3px rgba(28, 176, 246, 0.2);

  /* ─── Motion ──────────────────────────────────────────────────────
   * 180ms button press, 320ms skill-node unlock; back-out spring with
   * slight overshoot (DESIGN.md §6). Every state change feels gamified. */
  --motion-fast: 180ms;
  --motion-base: 320ms;
  --ease-standard: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1080px container (DESIGN.md §5) — narrower than a SaaS deck because
   * Duolingo content reads vertically as a focused lesson tree column. */
  --container-max: 1080px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 20px;
  --container-gutter-phone: 16px;
}
`,Te=1,Me="od-design-tokens/v1",Ee="TOKEN_SCHEMA",Ce="2026-06-06T00:00:00.000Z",Fe={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ie={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ge=JSON.parse('[{"name":"--bg","value":"#f4f7fb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#eef6ff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#111827","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#334155","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#64748b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#0ea5e9","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#d8e2ee","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#edf3f8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#0ea5e9","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#04131d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#10b981","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#f59e0b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#ef4444","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"IBM Plex Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"17px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"30px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.48","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.1","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.015em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"84px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"18px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 46px rgba(15, 23, 42, 0.10)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(14, 165, 233, 0.22)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"120ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),zs={schemaVersion:Te,format:Me,contract:Ee,generatedAt:Ce,source:Fe,summary:Ie,tokens:Ge},je=1,Oe="od-design-tokens/v1",ze="TOKEN_SCHEMA",He="2026-06-06T00:00:00.000Z",Ve={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Re={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:4,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Pe=JSON.parse('[{"name":"--bg","value":"#fafafa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#111111","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:63"],"sourceName":"--fg-2"},{"name":"--muted","value":"#6b6b6b","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--muted"},{"name":"--meta","value":"var(--muted)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--meta"},{"name":"--border","value":"#e5e5e5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--border-soft"},{"name":"--accent","value":"#2f6feb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--accent-active"},{"name":"--success","value":"#17a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Inter\\", -apple-system, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Inter\\", -apple-system, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"JetBrains Mono\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:125"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.2","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:133"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:134"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:142"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:143"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:144"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:145"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:146"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:147"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:152"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:171"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 2px 8px color-mix(in oklab, var(--fg), transparent 92%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:182"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:189"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:190"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:191"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:196"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:197"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:198"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:199"],"sourceName":"--container-gutter-phone"}]'),Hs={schemaVersion:je,format:Oe,contract:ze,generatedAt:He,source:Ve,summary:Re,tokens:Pe},Je=1,Ke="od-design-tokens/v1",Le="TOKEN_SCHEMA",Ue="2026-06-06T00:00:00.000Z",Ze={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},We={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},qe=JSON.parse('[{"name":"--bg","value":"#313338","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--bg"},{"name":"--surface","value":"#2b2d31","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1e1f22","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#dbdee1","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--fg"},{"name":"--fg-2","value":"#f2f3f5","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--fg-2"},{"name":"--muted","value":"#949ba4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--muted"},{"name":"--meta","value":"#80848e","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--meta"},{"name":"--border","value":"rgba(255, 255, 255, 0.06)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--border"},{"name":"--border-soft","value":"#3f4147","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--border-soft"},{"name":"--accent","value":"#5865f2","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#4752c4","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--accent-active"},{"name":"--success","value":"#23a55a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--success"},{"name":"--warn","value":"#f0b232","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--warn"},{"name":"--danger","value":"#f23f43","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"gg sans\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"gg sans\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"gg mono\\", Consolas, \\"Andale Mono\\", \\"Courier New\\", Courier, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.375","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.10","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-8"},{"name":"--space-12","value":"40px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(0, 0, 0, 0.4) 0px 2px 4px, 0 0 0 1px rgba(255, 255, 255, 0.06)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(88, 101, 242, 0.3)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:113"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"80ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--container-gutter-phone"}]'),Vs={schemaVersion:Je,format:Ke,contract:Le,generatedAt:Ue,source:Ze,summary:We,tokens:qe},Ye=1,Xe="od-design-tokens/v1",Qe="TOKEN_SCHEMA",es="2026-06-06T00:00:00.000Z",ss={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},rs={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ns=JSON.parse('[{"name":"--bg","value":"#fff4cf","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#fffaf0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#ffdca8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#2a1810","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#593625","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8a6652","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#d24b1f","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#d9aa7a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#efd0ab","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#d24b1f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#3d8f4f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#f2a93b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#b83a2f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Courier New\\", ui-monospace, monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"Courier New\\", ui-monospace, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"11px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.45","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"60px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"42px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"6px 6px 0 rgba(42, 24, 16, 0.26)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(210, 75, 31, 0.28)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"100ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"180ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1280px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Rs={schemaVersion:Ye,format:Xe,contract:Qe,generatedAt:es,source:ss,summary:rs,tokens:ns},as=1,os="od-design-tokens/v1",cs="TOKEN_SCHEMA",ts="2026-06-06T00:00:00.000Z",ls={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},is={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ds=JSON.parse('[{"name":"--bg","value":"#fff8d7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#ffef9f","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#1d1836","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#4c426c","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#796f91","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#ff6b00","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#eadfba","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#f5eccd","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ff6b00","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#2e9d57","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#ffb020","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#e5484d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Comic Sans MS\\", \\"Trebuchet MS\\", sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Comic Sans MS\\", \\"Trebuchet MS\\", sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 18px 44px rgba(29, 24, 54, 0.14)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(255, 107, 0, 0.26)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Ps={schemaVersion:as,format:os,contract:cs,generatedAt:ts,source:ls,summary:is,tokens:ds},us=1,ms="od-design-tokens/v1",fs="TOKEN_SCHEMA",ps="2026-06-06T00:00:00.000Z",hs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},ks={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},ys=JSON.parse('[{"name":"--bg","value":"#090b12","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#121722","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1b2233","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8fafc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#cbd5e1","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#94a3b8","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#60a5fa","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#2a3447","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#1d2636","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#60a5fa","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#06101d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#22c55e","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#fbbf24","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#fb7185","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 72px rgba(0, 0, 0, 0.42)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(96, 165, 250, 0.28)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),Js={schemaVersion:us,format:ms,contract:fs,generatedAt:ps,source:hs,summary:ks,tokens:ys},gs=1,bs="od-design-tokens/v1",ws="TOKEN_SCHEMA",xs="2026-06-06T00:00:00.000Z",vs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Bs={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:3,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ns=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--bg"},{"name":"--surface","value":"#f7f7f7","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#3c3c3c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--fg-2"},{"name":"--muted","value":"#777777","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--muted"},{"name":"--meta","value":"#afafaf","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--meta"},{"name":"--border","value":"#e5e5e5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--border"},{"name":"--border-soft","value":"var(--border)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--border-soft"},{"name":"--accent","value":"#58cc02","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#89e219","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#58a700","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent-active"},{"name":"--success","value":"#58cc02","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--success"},{"name":"--warn","value":"#ffc800","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--warn"},{"name":"--danger","value":"#ff4b4b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Feather Bold\\", \\"DIN Round Pro\\", \\"Helvetica Neue\\", sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Mona Sans\\", \\"Helvetica Neue\\", system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"JetBrains Mono\\", ui-monospace, Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"13px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-sm"},{"name":"--text-base","value":"15px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.15","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.01em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:82"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"56px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:99"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 2px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 4px 0 #d7d7d7","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(28, 176, 246, 0.2)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:114"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"180ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"320ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.34, 1.56, 0.64, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1080px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--container-gutter-phone"}]'),Ks={schemaVersion:gs,format:bs,contract:ws,generatedAt:xs,source:vs,summary:Bs,tokens:Ns};export{Ms as _,Ts as a,Ds as b,_s as c,$s as d,Ss as e,As as f,Os as g,js as h,Gs as i,Is as j,Fs as k,Cs as l,Es as m,Ks as n,Js as o,Ps as p,Rs as q,Vs as r,Hs as s,zs as t};
