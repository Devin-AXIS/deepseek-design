const e="od-design-system-project/v1",s="neobrutalism",n="Neobrutalism",r="Bold & Expressive",a="Bundled Open Design package for Neobrutalism, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},c={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},t="USAGE.md",i="components.manifest.json",l="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},cs={schemaVersion:e,id:s,name:n,category:r,description:a,source:o,files:c,usage:t,componentsManifest:i,importMode:l,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="neon",f="Neon",h="Morphism & Effects",k="Bundled Open Design package for Neon, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},g={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},N={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ts={schemaVersion:m,id:p,name:f,category:h,description:k,source:y,files:g,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:N},B="od-design-system-project/v1",A="neumorphism",S="Neumorphism",I="Morphism & Effects",T="Bundled Open Design package for Neumorphism, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",_={type:"bundled",origin:"Open Design curated bundled fixture"},$={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},M="USAGE.md",D="components.manifest.json",E="normalized",F={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},G={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},is={schemaVersion:B,id:A,name:S,category:I,description:T,source:_,files:$,usage:M,componentsManifest:D,importMode:E,craft:F,sourceFiles:G},C="od-design-system-project/v1",H="nike",V="Nike",j="E-Commerce & Retail",O="Bundled Open Design package for Nike, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",z={type:"bundled",origin:"Open Design curated bundled fixture"},U={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},R="USAGE.md",L="components.manifest.json",P="normalized",J={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},W={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ls={schemaVersion:C,id:H,name:V,category:j,description:O,source:z,files:U,usage:R,componentsManifest:L,importMode:P,craft:J,sourceFiles:W},K="od-design-system-project/v1",Y="notion",Z="Notion",q="Productivity & SaaS",Q="Bundled Open Design package for Notion, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",X={type:"bundled",origin:"Open Design curated bundled fixture"},ee={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},se="USAGE.md",ne="components.manifest.json",re="normalized",ae={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},oe={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},ds={schemaVersion:K,id:Y,name:Z,category:q,description:Q,source:X,files:ee,usage:se,componentsManifest:ne,importMode:re,craft:ae,sourceFiles:oe},ce="od-design-system-project/v1",te="nvidia",ie="NVIDIA",le="Media & Consumer",de="Bundled Open Design package for NVIDIA, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",ue={type:"bundled",origin:"Open Design curated bundled fixture"},me={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},pe="USAGE.md",fe="components.manifest.json",he="normalized",ke={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},ye={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},us={schemaVersion:ce,id:te,name:ie,category:le,description:de,source:ue,files:me,usage:pe,componentsManifest:fe,importMode:he,craft:ke,sourceFiles:ye},ms=`/* design-systems/neobrutalism/tokens.css
 * Structured token bindings for Neobrutalism.
 * neo-brutalist design language with hard borders, offset shadows, and loud yellow emphasis.
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
  --font-display: Arial Black, Impact, sans-serif;
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
  --tracking-display: 0;
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
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 6px 6px 0 rgba(42, 24, 16, 0.26);
  --focus-ring: 0 0 0 4px rgba(210, 75, 31, 0.28);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,ps=`/* design-systems/neon/tokens.css
 * Structured token bindings for Neon.
 * neon visual language with dark backgrounds, glowing accents, and high-energy controls.
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
`,fs=`/* design-systems/neumorphism/tokens.css
 * Structured token bindings for Neumorphism.
 * neumorphic interface with tonal surfaces, soft raised controls, and quiet embossed depth.
 */

:root {
  --bg: #f7eee6;
  --surface: #fff8f1;
  --surface-warm: #ead6c7;
  --fg: #2b211c;
  --fg-2: #5a4b43;
  --muted: #8a7a70;
  --meta: #b46a46;
  --border: #dac8b9;
  --border-soft: #eaded4;
  --accent: #b46a46;
  --accent-on: #ffffff;
  --accent-hover: color-mix(in oklab, var(--accent), black 8%);
  --accent-active: color-mix(in oklab, var(--accent), black 14%);
  --success: #4d8f5a;
  --warn: #c88735;
  --danger: #b84c4c;
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
  --radius-sm: 14px;
  --radius-md: 22px;
  --radius-lg: 34px;
  --radius-pill: 9999px;
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 8px 10px 24px rgba(128, 92, 70, 0.18), -8px -8px 20px rgba(255, 255, 255, 0.70);
  --focus-ring: 0 0 0 4px rgba(180, 106, 70, 0.24);
  --motion-fast: 150ms;
  --motion-base: 240ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --container-max: 1180px;
  --container-gutter-desktop: 36px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,hs=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/nike/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Nike" —
 * the kinetic retail cathedral. A monochromatic UI (black/white/grey
 * only) so that athletic photography and product color carry the
 * emotional weight, with massive uppercase Nike Futura ND display
 * typography that punches through hero imagery like a typographic
 * shockwave. This file is the *machine-readable* form of the values
 * described in \`DESIGN.md\`. Agents paste the \`:root { … }\` block
 * verbatim into the first \`<style>\` of every artifact, then reference
 * everything via var(--name) from then on.
 *
 * Brand-specific schema decisions (non-obvious bindings worth flagging
 * for reviewers and downstream brand authors):
 *   1. --bg is pure white (#FFFFFF) and --fg is Nike Black (#111111),
 *      not pure black. The fractional warmth at #111111 is a
 *      brand-determining choice ("Don't use #000000 for text" — §7
 *      do's-and-don'ts) so we honor it strictly even though the gap
 *      from #000 is small.
 *   2. --surface and --surface-warm bind to two real tiers of Nike's
 *      grey ladder: --surface → #F5F5F5 (Light Gray, Podium grey-100,
 *      the search-fill / placeholder / skeleton tier) and
 *      --surface-warm → #FAFAFA (Snow, grey-50, the lightest near-
 *      white differentiation tier). Collapsing surface-warm to an
 *      alias would erase a real brand feature — Nike walks the full
 *      50/100/200 surface ramp.
 *   3. --accent is bound to Nike Black (#111111), the same value as
 *      --fg. Nike's UI accent IS black: §9 ("Quick Color Reference")
 *      lists "Primary CTA: Nike Black (#111111)" and §7 forbids
 *      brand colors beyond the grey scale for UI elements ("product
 *      photography is the color"). The schema's ≤2 visible accent
 *      uses per screen aligns naturally because Nike already self-
 *      polices its UI to a single chromatic move.
 *   4. --accent-hover is bound to #707072 (Grey-500 / Secondary Text),
 *      not a black-mix darkening. Nike's documented primary-button
 *      hover SHIFTS to grey rather than darkening (§4 — "Hover:
 *      background shifts to Grey-500"); the schema's default formula
 *      would fight that motion. --accent-active darkens to true
 *      black (#000000) — the only place pure black appears in the
 *      system, reserved for the press-feedback moment.
 *   5. --fg-2 aliases to --fg, while --muted (#707072) and --meta
 *      (#9E9EA0) bind to independent values. Nike's text hierarchy
 *      is essentially binary at the primary tier (no intermediate
 *      between Nike Black and Secondary Text), but it does keep a
 *      separate tertiary / disabled tier for metadata.
 *   6. --border-soft binds to #E5E5E5 (Hover Gray / grey-200) — Nike's
 *      §6 documents the only sanctioned divider as
 *      \`0px -1px 0px 0px #E5E5E5 inset\`. The hairline #CACACB
 *      (--border) reads as a card edge; #E5E5E5 reads as a row-
 *      separator whisper.
 *   7. --radius-pill is bound to 30px, NOT 9999px. Nike's signature
 *      pill button uses 30px literally (§4 — "fully rounded pill
 *      (30px)") and the number is itself a brand-recognisable
 *      detail. Apple makes the same kind of choice with 980px; we
 *      follow that precedent rather than collapsing to the schema
 *      default.
 *   8. --elev-raised is ring-only (\`0 0 0 1px var(--border)\`),
 *      identical to --elev-ring. §6 declares Nike's elevation model
 *      "radically flat — no card shadows, no hover lifts, no
 *      floating elements." Binding raised to a blur shadow would
 *      contradict the brand; we bind it to the ring so artifacts
 *      that reference --elev-raised still resolve, but produce the
 *      flat / hairline look Nike intends.
 *   9. --focus-ring is the documented 2px solid blue ring
 *      \`0 0 0 2px rgba(39, 93, 197, 1)\` from §4 / §6, NOT the
 *      schema's transparent-mixed accent halo. Nike's focus indicator
 *      is a deliberate chromatic break — the only blue moment in the
 *      whole UI — and we keep it verbatim.
 *  10. --tracking-display is -0.02em. The DESIGN.md hierarchy table
 *      leaves display letter-spacing as "—", but the user-facing
 *      brief calls for "tight tracking" on the BIG uppercase
 *      condensed Futura display; -0.02em (≈ -1.92px on 96px)
 *      compresses the Futura ND silhouette into the monolithic
 *      stadium-scoreboard block §3 describes without crushing
 *      smaller display tiers.
 *  11. --leading-tight is 0.90, the most aggressive tight-leading
 *      binding in any brand on the repo. §3 calls it "impossibly
 *      tight" and the typographic identity depends on it; ascenders
 *      and descenders nearly touch on the 96px display.
 *
 * Contract sources:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *       (TOKEN_SCHEMA — every name below appears there or as an
 *        explicit B-slot.)
 *   - A2 fallback values: design-systems/_schema/defaults.css
 *       (We override --accent-on, --accent-hover, --accent-active,
 *        --success, --warn, --danger, --radius-md, --radius-lg,
 *        --radius-pill, --elev-raised, --focus-ring; the rest match
 *        defaults.)
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the shared schema.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface (3 levels) ──────────────────────────────────────────
   * Nike's surface ladder runs 50 → 100 → 200 across grey-50/100/200.
   * --bg is the white retail canvas (the most common default page
   * background); --surface is the Light Gray feature/skeleton tier;
   * --surface-warm is the Snow near-white differentiation tier that
   * appears between hero bands and merchandise grids on nike.com.
   * All three bind to real values — collapsing surface-warm would
   * erase a real brand feature. */
  --bg: #ffffff;             /* Nike White — primary page canvas */
  --surface: #f5f5f5;        /* Light Gray (Podium grey-100) — fill / skeleton */
  --surface-warm: #fafafa;   /* Snow (Podium grey-50) — lightest tier */

  /* ─── Foreground ramp (4 levels) ─────────────────────────────────
   * Nike's text neutrals are explicitly named in DESIGN.md §2:
   * Nike Black (primary text — #111111, deliberately not #000000),
   * Secondary Text (#707072, descriptive copy / metadata / price
   * labels), and Disabled Text (#9E9EA0, inactive elements). The
   * brand's hierarchy is binary at the primary tier (no #2 stop
   * between #111111 and #707072), so --fg-2 collapses to var(--fg);
   * --muted and --meta bind to independent values. */
  --fg: #111111;             /* Nike Black — primary text, headings, nav links */
  --fg-2: var(--fg);         /* alias — no intermediate between primary and muted */
  --muted: #707072;          /* Secondary Text (grey-500) — descriptive copy */
  --meta: #9e9ea0;           /* Disabled Text (grey-400) — tertiary / metadata */

  /* ─── Border (2 levels) ──────────────────────────────────────────
   * Nike's border palette is restrained: --border (#CACACB, grey-300)
   * is the standard input / divider weight; --border-soft (#E5E5E5,
   * grey-200) is the documented inset-divider color that whispers
   * between rows in dense product grids without competing with the
   * #CACACB hairline. */
  --border: #cacacb;         /* Border Secondary (grey-300) — input borders, dividers */
  --border-soft: #e5e5e5;    /* Hover Gray (grey-200) — inset row separator */

  /* ─── Accent ──────────────────────────────────────────────────────
   * Nike's UI accent IS black. §9 ("Quick Color Reference") lists
   * Primary CTA as Nike Black (#111111); §7 ("Don't introduce brand
   * colors beyond the grey scale for UI elements") forbids using a
   * chromatic accent. Product photography carries all the color, so
   * the schema's "≤2 visible uses per screen" cap aligns naturally
   * with Nike's already-monochrome UI policy. */
  --accent: #111111;         /* Nike Black — primary action color */
  --accent-on: #ffffff;      /* white label on black fill */

  /* ─── Accent states ───────────────────────────────────────────────
   * Nike's documented primary-button hover shifts to Grey-500 (§4 —
   * "Hover: background shifts to Grey-500 (#707072)") rather than
   * darkening, so we override the schema's black-mix formula with
   * the literal grey-500 value. --accent-active darkens to pure
   * black — the ONLY place #000000 appears in the entire system,
   * reserved for the press-feedback moment when Nike Black
   * compresses one stop further. */
  --accent-hover: #707072;   /* Grey-500 — documented hover, not a darken */
  --accent-active: #000000;  /* True black — the only #000000 in the system */

  /* ─── Semantic ────────────────────────────────────────────────────
   * Nike reserves color exclusively for semantic meaning (red=error,
   * green=success, yellow=warning) — the only chromatic moves in the
   * whole UI besides product photography. Values come straight from
   * §2's "Semantic & Accent" block. */
  --success: #007d48;        /* Success Green — confirmation, availability */
  --warn: #fca600;           /* Yellow-500 — warning state */
  --danger: #d30005;         /* Nike Red — critical errors, sale badges */

  /* ─── Typography ──────────────────────────────────────────────────
   * Nike's documented split is THREE families that we collapse onto
   * the schema's two slots via fallback chains:
   *   - Nike Futura ND: custom condensed Futura, 96px hero display
   *     ONLY (§7 forbids it below 24px). Falls back to Helvetica Now
   *     Display Medium for headings.
   *   - Helvetica Now Display Medium: 24–32px section heads.
   *   - Helvetica Now Text: navigation, body, controls.
   *
   * --font-display chains Nike Futura ND → Helvetica Now Display
   * Medium → Helvetica Neue, so hero h1 lands on Futura when
   * available and gracefully degrades to Helvetica Now Display
   * (Nike's documented heading face) on every other surface.
   * --font-body holds the workhorse Helvetica Now Text stack. */
  --font-display:
    "Nike Futura ND", "Helvetica Now Display Medium", "Helvetica Now Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:
    "Helvetica Now Text Medium", "Helvetica Now Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:
    ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale (px) — derived from DESIGN.md §3 hierarchy table.
   * Nike's documented sizes are 12 / 14 / 16 / 24 / 32 / 96; the
   * --text-lg and --text-3xl slots interpolate cleanly into the
   * existing system (20px = emphasized body / promo links;
   * 48px = mid-display, between H1 and Hero). The 96px display is
   * the brand ceiling — the typographic shockwave §3 describes. */
  --text-xs: 12px;           /* Small / Tiny — timestamps, legal text */
  --text-sm: 14px;           /* Caption / Link Small / Button Small */
  --text-base: 16px;         /* Body / Link / Button / H3 — Nike's reading baseline */
  --text-lg: 20px;           /* Promoted body — interpolation tier */
  --text-xl: 24px;           /* Heading 2 — subsection titles */
  --text-2xl: 32px;          /* Heading 1 — section heads */
  --text-3xl: 48px;          /* Mid-display — interpolation tier */
  --text-4xl: 96px;          /* Display Hero — typographic shockwave */

  /* Nike's leading envelope is unusually airy in the body (1.75 —
   * generous for product browsing) and uniquely tight at the top
   * (0.90 — the "impossibly tight" display ceiling §3 calls a
   * stadium scoreboard). Both numbers come straight from §3. */
  --leading-body: 1.75;      /* Body — comfortable product-browsing rhythm */
  --leading-tight: 0.9;      /* Hero Display — ascenders nearly touch descenders */

  /* Display tracking compresses to -0.02em — condensed Futura ND
   * wants slight letter-spacing tightening to read as the monolithic
   * uppercase block §3 describes (≈ -1.92px on the 96px hero).
   * Body type stays at 0 / component-controlled. */
  --tracking-display: -0.02em;

  /* ─── Spacing ─────────────────────────────────────────────────────
   * Nike's grid is 4px base / 8px primary multiples (§5). The shared
   * schema's 4-8-12-16-20-24-32-48 scale is verbatim Nike — no
   * overrides needed. Component-internal values (the 4–12px product-
   * grid gaps that create Nike's "dense superstore" feel) stay
   * inline at the call site. */
  --space-1: 4px;            /* tight icon gaps, inline spacing */
  --space-2: 8px;            /* base unit, button icon gaps */
  --space-3: 12px;           /* card internal padding, tight margins */
  --space-4: 16px;           /* standard padding, nav spacing */
  --space-5: 20px;           /* product card gaps */
  --space-6: 24px;           /* section internal padding, grid gaps */
  --space-8: 32px;           /* section breaks */
  --space-12: 48px;          /* major section padding */

  /* ─── Section rhythm ──────────────────────────────────────────────
   * Nike's section padding scales 80 → 48 → 32 across desktop /
   * tablet / phone (§5 / §8 — "Section padding: 80px → 48px → 32px
   * → 24px as viewport narrows"). The 80px desktop top is the hero-
   * section padding from the §5 spacing scale (--space-10 in Nike's
   * native vocabulary). */
  --section-y-desktop: 80px;
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Nike uses purposeful radius tiers (§5): 0px on product imagery,
   * 8px on form inputs (non-search), 20px on UI containers, 24px on
   * search inputs, 30px on buttons (full pill), 50% on circular
   * icons. Mapped onto the schema:
   *   --radius-sm   →  8px   compact controls and form fields
   *   --radius-md   → 20px   interactive containers (Nike's card)
   *   --radius-lg   → 24px   search inputs / medium pills
   *   --radius-pill → 30px   Nike's signature button capsule —
   *                          we keep the literal value rather than
   *                          collapse to 9999px because the number
   *                          itself is a brand-recognisable detail
   *                          (same precedent as Apple's 980px). */
  --radius-sm: 8px;
  --radius-md: 20px;
  --radius-lg: 24px;
  --radius-pill: 30px;

  /* ─── Elevation (3 levels) ────────────────────────────────────────
   * Nike's elevation philosophy is radically flat (§6 — "no card
   * shadows, no hover lifts, no floating elements"). Three sanctioned
   * levels:
   *   - flat   → none (the default; tonal contrast does the work)
   *   - ring   → hairline 1px box-shadow border (the only sanctioned
   *              container outline)
   *   - raised → SAME as ring. We deliberately collapse raised onto
   *              the ring tier because Nike refuses blur shadows.
   *              Components that reference var(--elev-raised) still
   *              resolve, but produce the flat / hairline result Nike
   *              intends — never the Material-flavoured float that
   *              would betray the brand. */
  --elev-flat: none;
  --elev-ring: 0 0 0 1px var(--border);
  --elev-raised: 0 0 0 1px var(--border);

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Nike's keyboard-focus signal is the documented 2px solid blue
   * ring at rgba(39, 93, 197, 1) — §4 / §6. This is the ONLY blue
   * moment in the entire UI, a deliberate chromatic break from the
   * monochrome canvas to satisfy WCAG focus visibility. We bind the
   * literal value rather than the schema's transparent-mixed accent
   * formula because Nike's focus is intentionally NOT the accent
   * (which is black, indistinguishable from the surface it would
   * outline). */
  --focus-ring: 0 0 0 2px rgba(39, 93, 197, 1);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Nike's transitions are all 200ms ease (§4 — "Transition:
   * background 200ms ease", "border-color 200ms ease", "opacity
   * 200ms ease for image swap on hover"). The schema defaults match
   * already; we keep them verbatim. --motion-fast (150ms) covers
   * micro-states like hover-tints and focus; --motion-base (200ms)
   * is the documented hero-state duration. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * Nike's content scaffolding (§5) is 1920px max container with
   * 1440px standard content width. We bind --container-max to 1440px
   * because that is the documented STANDARD content width, the one
   * artifacts should target — the 1920px ceiling is reserved for
   * full-bleed hero photography that breaks out of the container.
   * Gutters step 48 → 24 → 16 across desktop / tablet / phone, the
   * exact horizontal-padding values from §5. */
  --container-max: 1440px;
  --container-gutter-desktop: 48px;
  --container-gutter-tablet: 24px;
  --container-gutter-phone: 16px;
}
`,ks=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/notion/tokens.css
 *
 * Structured token bindings for the "Notion" brand — the all-in-one
 * workspace's warm minimalism translated into the shared schema.
 *
 * Brand identity in three sentences:
 *   1. Warm neutrals throughout — grays carry yellow-brown undertones
 *      (#f6f5f4, #31302e, #615d59, #a39e98); pure white canvas with
 *      near-black text (rgba(0,0,0,0.95)) that softens imperceptibly.
 *   2. NotionInter (modified Inter) with aggressive negative
 *      letter-spacing at display sizes (-2.125px at 64px), four
 *      weights (400/500/600/700), OpenType "lnum"+"locl" at display.
 *   3. Whisper borders (1px rgba(0,0,0,0.1)) and multi-layer shadows
 *      with sub-0.05 opacity — depth felt rather than seen.
 *
 * Schema decisions:
 *   - --bg binds to pure white; --surface to warm white (#f6f5f4).
 *   - --surface-warm aliases --surface (same warm white tier).
 *   - --fg binds to rgba(0,0,0,0.95) — the signature near-black.
 *   - --fg-2 binds to #31302e (warm dark) for headings on surfaces.
 *   - --accent is Notion Blue (#0075de) — the only saturated color.
 *   - --tracking-display: -0.033em (-2.125px / 64px normalized).
 *   - --elev-raised is the 4-layer multi-layer card shadow with max
 *     opacity 0.04 — felt-not-seen Notion depth.
 *   - --radius-sm: 4px (buttons/inputs); --radius-md: 8px (cards).
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────── */
  --bg:           #ffffff;
  --surface:      #f6f5f4;               /* warm white — section alternation */
  --surface-warm: var(--surface);        /* aliases to warm white tier */

  /* ─── Foreground ───────────────────────────────────────────────── */
  --fg:   rgba(0, 0, 0, 0.95);           /* near-black — primary text */
  --fg-2: #31302e;                       /* warm dark — headings on surfaces */
  --muted: #615d59;                      /* warm gray 500 — secondary text */
  --meta:  #a39e98;                      /* warm gray 300 — placeholder/captions */

  /* ─── Border ───────────────────────────────────────────────────── */
  --border:      rgba(0, 0, 0, 0.1);    /* whisper border — standard */
  --border-soft: rgba(0, 0, 0, 0.06);  /* subtler row dividers */

  /* ─── Accent ───────────────────────────────────────────────────── */
  --accent:        #0075de;             /* Notion Blue — links, primary CTAs */
  --accent-on:     #ffffff;
  --accent-hover:  #005bab;             /* Active Blue — pressed state */
  --accent-active: color-mix(in oklab, var(--accent), black 14%);

  /* ─── Semantic ─────────────────────────────────────────────────── */
  --success: #1aae39;                   /* Notion green — confirmation */
  --warn:    #dd5b00;                   /* Notion orange — warning */
  --danger:  #dc2626;

  /* ─── Typography ───────────────────────────────────────────────── */
  --font-display: "NotionInter", "Inter", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-body:    "NotionInter", "Inter", -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono:    ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §Typography Hierarchy.
   * Notion's display range 64px→12px; the 8 schema slots map to the
   * spine. 54px secondary-hero sits between --text-4xl and --text-3xl
   * and appears inline in components.html where needed. */
  --text-xs:   12px;                    /* badge / micro label */
  --text-sm:   14px;                    /* caption / footer */
  --text-base: 16px;                    /* body */
  --text-lg:   20px;                    /* body large — introductions */
  --text-xl:   26px;                    /* sub-heading */
  --text-2xl:  40px;                    /* sub-heading large */
  --text-3xl:  48px;                    /* section heading */
  --text-4xl:  64px;                    /* display hero */

  /* Leading + tracking.
   * --leading-tight=1.00: max compression at 64px display.
   * h2 (48px) → 1.00; h3 (40px) → 1.50 per DESIGN.md §Typography.
   * --tracking-display: -0.033em = -2.125px / 64px normalized. */
  --leading-body:     1.5;
  --leading-tight:    1.00;
  --tracking-display: -0.033em;

  /* ─── Spacing ──────────────────────────────────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §Responsive Behavior. */
  --section-y-desktop: 80px;
  --section-y-tablet:  48px;
  --section-y-phone:   32px;

  /* ─── Radius ───────────────────────────────────────────────────── */
  /* Micro 4px for buttons/inputs; standard 12px for cards; pill for
     badges. --radius-md maps to 8px (small cards, containers). */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-pill: 9999px;

  /* ─── Elevation ────────────────────────────────────────────────── */
  /* Multi-layer stack: individual opacity never > 0.04.
     Depth felt rather than seen — the Notion shadow philosophy. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised:
    rgba(0, 0, 0, 0.04) 0px 4px 18px,
    rgba(0, 0, 0, 0.027) 0px 2px 7.85px,
    rgba(0, 0, 0, 0.02) 0px 0.8px 2.93px,
    rgba(0, 0, 0, 0.01) 0px 0.175px 1.04px;

  /* ─── Focus ────────────────────────────────────────────────────── */
  /* 2px solid outline + shadow reinforcement per DESIGN.md §8. */
  --focus-ring: 0 0 0 3px rgba(9, 127, 232, 0.3);

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
`,ys=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/nvidia/tokens.css
 *
 * Structured token bindings for "Design System Inspired by NVIDIA".
 * GPU computing power aesthetic: black canvas, NVIDIA Green (#76b900) as
 * pure signal accent, industrial NVIDIA-EMEA font, minimal 2px radius.
 *
 * Key brand decisions encoded here:
 *   - True black (#000000) primary canvas — maximum energy contrast
 *   - NVIDIA Green (#76b900) as SIGNAL ONLY: borders, underlines, outlines
 *     — never as large surface fills (that's the rule from the brand)
 *   - Bold (700) as the dominant voice for headings, buttons, nav, labels
 *   - Minimal radius (2px) — precision-engineered hardware aesthetic
 *   - Primary button is transparent with 2px green border (NOT filled green)
 *   - Hover shifts: green-border → teal fill (#1eaedb) — the NVIDIA surprise
 *   - Dark/light section alternation — green works identically on both
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * True black as the dominant page canvas. Cards and content areas
   * alternate with white sections. Near Black (#1a1a1a) for dark cards. */
  --bg: #000000;             /* True Black — dominant dark canvas */
  --surface: #1a1a1a;        /* Near Black — card backgrounds on black pages */
  --surface-warm: var(--surface); /* alias — no warm tier; system is monochromatic */

  /* ─── Foreground (on dark) ────────────────────────────────────────
   * White primary text. Gray scale for hierarchy on dark backgrounds. */
  --fg: #ffffff;             /* Pure White — primary text on dark backgrounds */
  --fg-2: #a7a7a7;           /* Gray 300 — muted heading variants */
  --muted: #757575;          /* Gray 500 — tertiary text, placeholders, footers */
  --meta: #898989;           /* Gray 400 — secondary text, metadata */

  /* ─── Border ──────────────────────────────────────────────────────
   * Gray borders for structure; NVIDIA Green for emphasis/accent borders.
   * The 2px green border IS the primary interactive signal. */
  --border: #5e5e5e;         /* Gray Border — subtle borders, divider lines */
  --border-soft: #2a2a2a;    /* Barely visible inner divider on dark */

  /* ─── Accent ──────────────────────────────────────────────────────
   * NVIDIA Green — the brand fingerprint. Use ONLY for borders, underlines,
   * outlines, and active indicators. Never as a filled surface.
   *
   * Note on hover/active: NVIDIA's CTA hover shifts to TEAL (#1eaedb),
   * not a darker green. This is the NVIDIA brand surprise — document it.
   * --accent-hover: teal fill for hover state
   * --accent-active: bright blue for active/pressed */
  --accent: #76b900;         /* NVIDIA Green — the signature */
  --accent-on: #000000;      /* Dark text on green (if ever used as fill) */
  --accent-hover: #1eaedb;   /* Teal — NVIDIA button hover color */
  --accent-active: #007fff;  /* Bright Blue — NVIDIA button active color */

  /* ─── Semantic ────────────────────────────────────────────────────
   * Success uses a darker green (#3f8500) — clearly distinct from the
   * brand NVIDIA Green (#76b900) while remaining in the green family. */
  --success: #3f8500;        /* Green 500 — success (darker than brand green) */
  --warn: #ef9100;           /* Yellow 300 — advisory states */
  --danger: #e52020;         /* Red 500 — error states */

  /* ─── Typography ──────────────────────────────────────────────────
   * NVIDIA-EMEA font (Arial/Helvetica fallbacks) — European, pragmatic,
   * engineering-focused. Bold (700) as the dominant voice.
   * 400 reserved for body text and descriptions only. */
  --font-display: "NVIDIA-EMEA", Arial, Helvetica, sans-serif;
  --font-body: "NVIDIA-EMEA", Arial, Helvetica, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;

  /* Type scale — DESIGN.md §3. Display at 36px (modest by GPU standards).
   * Dense technical content doesn't need massive display typography. */
  --text-xs: 10px;           /* Micro Label — uppercase tiny badges */
  --text-sm: 12px;           /* Caption Small — fine print, legal */
  --text-base: 16px;         /* Body — standard reading text */
  --text-lg: 18px;           /* Body Large — emphasized lead paragraphs */
  --text-xl: 22px;           /* Sub-heading — feature descriptions */
  --text-2xl: 24px;          /* Section Heading */
  --text-3xl: 32px;          /* Below display — intermediate heading */
  --text-4xl: 36px;          /* Display Hero — maximum impact headlines */

  --leading-body: 1.5;       /* Body text */
  --leading-tight: 1.25;     /* Tight headings — dense authoritative blocks */
  --tracking-display: 0em;   /* No decorative tracking — font carries industrial character */

  /* ─── Spacing ─────────────────────────────────────────────────────
   * Tighter than typical SaaS — technical content requires density.
   * Primary padding values: 8px, 11px, 13px, 16px, 24px, 32px. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  --section-y-desktop: 64px; /* Denser than typical — GPU catalog feel */
  --section-y-tablet: 48px;
  --section-y-phone: 32px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * 2px for virtually everything — precision-engineered appearance.
   * No rounding that would soften the hardware character. */
  --radius-sm: 2px;          /* Everything — buttons, cards, inputs */
  --radius-md: 2px;          /* Same — minimal variation */
  --radius-lg: 4px;          /* Rare larger containers */
  --radius-pill: 9999px;     /* Declared for schema compliance */

  /* ─── Elevation ───────────────────────────────────────────────────
   * One shadow value in the system: 5px ambient blur at 30% opacity.
   * The primary depth signal is color contrast (black vs white sections)
   * and green accent borders. */
  --elev-flat: none;
  --elev-ring: 0 0 0 2px var(--accent);   /* Green border ring — NVIDIA signal */
  --elev-raised: rgba(0, 0, 0, 0.3) 0px 0px 5px 0px; /* Ambient card shadow */

  /* ─── Focus ring ──────────────────────────────────────────────────
   * Black outline focus — crisp, hardware-like. The green accent
   * is already used for elev-ring; focus uses black for distinction. */
  --focus-ring: 0 0 0 2px #ffffff; /* White ring on dark surface for visibility */

  /* ─── Motion ──────────────────────────────────────────────────────
   * Standard durations — GPU software feels solid and instantaneous. */
  --motion-fast: 150ms;
  --motion-base: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * 1200px container with full-width hero sections.
   * Feature sections: 2–3 column product card grids. */
  --container-max: 1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet: 16px;
  --container-gutter-phone: 12px;
}
`,ge=1,be="od-design-tokens/v1",we="TOKEN_SCHEMA",xe="2026-06-06T00:00:00.000Z",ve={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Ne={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Be=JSON.parse('[{"name":"--bg","value":"#fff4cf","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#fffaf0","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#ffdca8","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#2a1810","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#593625","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8a6652","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#d24b1f","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#d9aa7a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#efd0ab","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#d24b1f","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#3d8f4f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#f2a93b","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#b83a2f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Arial Black, Impact, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"6px 6px 0 rgba(42, 24, 16, 0.26)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(210, 75, 31, 0.28)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),gs={schemaVersion:ge,format:be,contract:we,generatedAt:xe,source:ve,summary:Ne,tokens:Be},Ae=1,Se="od-design-tokens/v1",Ie="TOKEN_SCHEMA",Te="2026-06-06T00:00:00.000Z",_e={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},$e={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Me=JSON.parse('[{"name":"--bg","value":"#070711","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#111126","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#1e1540","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#f8f7ff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#d6ccff","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#9d8ad4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#c084fc","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#34265e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#241c42","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#c084fc","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#13051f","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#39ff88","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#fff34d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#ff4d8d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"10px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 24px 80px rgba(192, 132, 252, 0.22)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(192, 132, 252, 0.32)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),bs={schemaVersion:Ae,format:Se,contract:Ie,generatedAt:Te,source:_e,summary:$e,tokens:Me},De=1,Ee="od-design-tokens/v1",Fe="TOKEN_SCHEMA",Ge="2026-06-06T00:00:00.000Z",Ce={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},He={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Ve=JSON.parse('[{"name":"--bg","value":"#f7eee6","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:7"],"sourceName":"--bg"},{"name":"--surface","value":"#fff8f1","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:8"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#ead6c7","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:9"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#2b211c","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:10"],"sourceName":"--fg"},{"name":"--fg-2","value":"#5a4b43","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:11"],"sourceName":"--fg-2"},{"name":"--muted","value":"#8a7a70","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:12"],"sourceName":"--muted"},{"name":"--meta","value":"#b46a46","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:13"],"sourceName":"--meta"},{"name":"--border","value":"#dac8b9","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:14"],"sourceName":"--border"},{"name":"--border-soft","value":"#eaded4","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:15"],"sourceName":"--border-soft"},{"name":"--accent","value":"#b46a46","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:16"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:17"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"color-mix(in oklab, var(--accent), black 8%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:18"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:19"],"sourceName":"--accent-active"},{"name":"--success","value":"#4d8f5a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:20"],"sourceName":"--success"},{"name":"--warn","value":"#c88735","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:21"],"sourceName":"--warn"},{"name":"--danger","value":"#b84c4c","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:22"],"sourceName":"--danger"},{"name":"--font-display","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--font-display"},{"name":"--font-body","value":"Inter, system-ui, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"SF Mono\\", ui-monospace, Menlo, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:26"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:27"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:28"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"54px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"76px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.52","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:34"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.06","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:35"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.025em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:40"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:41"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:44"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:45"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"68px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"14px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"22px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"34px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"8px 10px 24px rgba(128, 92, 70, 0.18), -8px -8px 20px rgba(255, 255, 255, 0.70)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 4px rgba(180, 106, 70, 0.24)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:55"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"240ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1180px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:62"],"sourceName":"--container-gutter-phone"}]'),ws={schemaVersion:De,format:Ee,contract:Fe,generatedAt:Ge,source:Ce,summary:He,tokens:Ve},je=1,Oe="od-design-tokens/v1",ze="TOKEN_SCHEMA",Ue="2026-06-06T00:00:00.000Z",Re={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},Le={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Pe=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--bg"},{"name":"--surface","value":"#f5f5f5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:106"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fafafa","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#111111","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--fg"},{"name":"--fg-2","value":"var(--fg)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--fg-2"},{"name":"--muted","value":"#707072","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--muted"},{"name":"--meta","value":"#9e9ea0","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--meta"},{"name":"--border","value":"#cacacb","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--border"},{"name":"--border-soft","value":"#e5e5e5","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--border-soft"},{"name":"--accent","value":"#111111","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#707072","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#000000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--accent-active"},{"name":"--success","value":"#007d48","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:157"],"sourceName":"--success"},{"name":"--warn","value":"#fca600","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--warn"},{"name":"--danger","value":"#d30005","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"Nike Futura ND\\", \\"Helvetica Now Display Medium\\", \\"Helvetica Now Display\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"Helvetica Now Text Medium\\", \\"Helvetica Now Text\\", \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:177"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:179"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:188"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:189"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:190"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:191"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:192"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:193"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:194"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:195"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.75","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:201"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"0.9","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:202"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.02em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:216"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:217"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:218"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:219"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:220"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:221"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:222"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:223"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:231"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:232"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:233"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:248"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:249"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:250"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"30px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:251"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:266"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:267"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:268"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px rgba(39, 93, 197, 1)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:279"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:288"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:289"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:290"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1440px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:300"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:301"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:302"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:303"],"sourceName":"--container-gutter-phone"}]'),xs={schemaVersion:je,format:Oe,contract:ze,generatedAt:Ue,source:Re,summary:Le,tokens:Pe},Je=1,We="od-design-tokens/v1",Ke="TOKEN_SCHEMA",Ye="2026-06-06T00:00:00.000Z",Ze={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},qe={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},Qe=JSON.parse('[{"name":"--bg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--bg"},{"name":"--surface","value":"#f6f5f4","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:33"],"sourceName":"--surface-warm"},{"name":"--fg","value":"rgba(0, 0, 0, 0.95)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:36"],"sourceName":"--fg"},{"name":"--fg-2","value":"#31302e","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--fg-2"},{"name":"--muted","value":"#615d59","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--muted"},{"name":"--meta","value":"#a39e98","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:39"],"sourceName":"--meta"},{"name":"--border","value":"rgba(0, 0, 0, 0.1)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:42"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(0, 0, 0, 0.06)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:43"],"sourceName":"--border-soft"},{"name":"--accent","value":"#0075de","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:46"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:47"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#005bab","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"color-mix(in oklab, var(--accent), black 14%)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent-active"},{"name":"--success","value":"#1aae39","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:52"],"sourceName":"--success"},{"name":"--warn","value":"#dd5b00","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:53"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:54"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"NotionInter\\", \\"Inter\\", -apple-system, system-ui, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"NotionInter\\", \\"Inter\\", -apple-system, system-ui, \\"Segoe UI\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"26px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:78"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.00","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"-0.033em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:83"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:84"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"80px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:94"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:100"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:101"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(0, 0, 0, 0.04) 0px 4px 18px, rgba(0, 0, 0, 0.027) 0px 2px 7.85px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.93px, rgba(0, 0, 0, 0.01) 0px 0.175px 1.04px","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:110"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(9, 127, 232, 0.3)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:126"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:127"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:128"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--container-gutter-phone"}]'),vs={schemaVersion:Je,format:We,contract:Ke,generatedAt:Ye,source:Ze,summary:qe,tokens:Qe},Xe=1,es="od-design-tokens/v1",ss="TOKEN_SCHEMA",ns="2026-06-06T00:00:00.000Z",rs={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},as={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:1,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},os=JSON.parse('[{"name":"--bg","value":"#000000","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:23"],"sourceName":"--bg"},{"name":"--surface","value":"#1a1a1a","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:24"],"sourceName":"--surface"},{"name":"--surface-warm","value":"var(--surface)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:25"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:29"],"sourceName":"--fg"},{"name":"--fg-2","value":"#a7a7a7","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:30"],"sourceName":"--fg-2"},{"name":"--muted","value":"#757575","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:31"],"sourceName":"--muted"},{"name":"--meta","value":"#898989","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:32"],"sourceName":"--meta"},{"name":"--border","value":"#5e5e5e","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:37"],"sourceName":"--border"},{"name":"--border-soft","value":"#2a2a2a","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:38"],"sourceName":"--border-soft"},{"name":"--accent","value":"#76b900","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:48"],"sourceName":"--accent"},{"name":"--accent-on","value":"#000000","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:49"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#1eaedb","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:50"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#007fff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:51"],"sourceName":"--accent-active"},{"name":"--success","value":"#3f8500","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:56"],"sourceName":"--success"},{"name":"--warn","value":"#ef9100","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:57"],"sourceName":"--warn"},{"name":"--danger","value":"#e52020","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:58"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"NVIDIA-EMEA\\", Arial, Helvetica, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:64"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"NVIDIA-EMEA\\", Arial, Helvetica, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:65"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:66"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"10px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:71"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:72"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:73"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"22px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:74"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:75"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"36px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:79"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.25","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:80"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0em","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:81"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:89"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:90"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:91"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:92"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:93"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:95"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"2px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:102"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"2px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:103"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:104"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:105"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:111"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 2px var(--accent)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:112"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"rgba(0, 0, 0, 0.3) 0px 0px 5px 0px","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:113"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 2px #ffffff","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:123"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:124"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--container-gutter-phone"}]'),Ns={schemaVersion:Xe,format:es,contract:ss,generatedAt:ns,source:rs,summary:as,tokens:os};export{us as _,ds as a,ls as b,is as c,ts as d,cs as e,ys as f,ks as g,hs as h,fs as i,ps as j,ms as k,Ns as l,vs as m,xs as n,ws as o,bs as p,gs as q};
