const e="od-design-system-project/v1",s="x-ai",n="xAI",a="AI & LLM",r="Bundled Open Design package for xAI, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",o={type:"bundled",origin:"Open Design curated bundled fixture"},t={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},c="USAGE.md",i="components.manifest.json",l="normalized",d={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},u={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},z={schemaVersion:e,id:s,name:n,category:a,description:r,source:o,files:t,usage:c,componentsManifest:i,importMode:l,craft:d,sourceFiles:u},m="od-design-system-project/v1",p="xiaohongshu",f="Xiaohongshu",h="Media & Consumer",g="Bundled Open Design package for Xiaohongshu, derived from curated DESIGN.md, tokens.css, and components.html fixtures.",y={type:"bundled",origin:"Open Design curated bundled fixture"},k={design:"DESIGN.md",tokens:"tokens.css",designTokens:"design-tokens.json",tailwind:"tailwind-v4.css",components:"components.html"},b="USAGE.md",w="components.manifest.json",x="normalized",v={applies:[],suggested:["color","accessibility-baseline"],exemptions:[]},N={evidence:"source/evidence.md",tokens:"source/tokens.source.json",report:"source/token-contract.report.json"},O={schemaVersion:m,id:p,name:f,category:h,description:g,source:y,files:k,usage:b,componentsManifest:w,importMode:x,craft:v,sourceFiles:N},$=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/x-ai/tokens.css
 *
 * Structured token bindings for "x-ai" — the dark-first, monospace-driven
 * brutalist minimalism of Elon Musk's AI lab. A design system that
 * communicates through absence: pure white on warm near-black, GeistMono
 * as the display voice, zero shadows, zero gradients, zero accent color.
 * Restraint as sophistication.
 *
 * Brand identity in three sentences:
 *   1. Dark-first canvas at #1f2228 (warm near-black with a subtle blue
 *      undertone, NEVER pure #000000) carries pure-white text as "the
 *      voice", with hierarchy expressed through opacity (100 / 70 / 50 / 30)
 *      rather than hue. There is no gray middle ground.
 *   2. GeistMono runs at display sizes (up to a hero-only 320px at weight
 *      300) and as the uppercase, letter-spaced button face. universalSans
 *      handles body and section headings. The monospace-as-display choice
 *      is the brand: terminal aesthetic as luxury.
 *   3. Zero box-shadows, zero gradients, near-zero radii (0px default,
 *      4px occasional softening). Depth comes from opacity-based borders
 *      and surface tints, not from simulated light. The single chromatic
 *      exception is the keyboard focus ring (Tailwind's default blue).
 *
 * Brand-specific schema decisions (each bends a schema convention to
 * match xAI's voice rather than the cross-brand default):
 *
 *   1. \`--bg\` is \`#1f2228\`, NOT \`#000000\`. DESIGN.md §2 names this hue
 *      explicitly: "This specific hue prevents the harsh eye strain of
 *      \`#000000\` while maintaining deep darkness." Pure black is
 *      forbidden by the brand.
 *
 *   2. \`--accent\` is \`#ffffff\`, not a chromatic color. xAI has no
 *      accent palette — white IS the chromatic move. Primary CTAs render
 *      with \`var(--accent)\` as background and \`var(--accent-on)\` as
 *      foreground, producing the signature white-on-dark button. The
 *      "≤2 accent uses per screen" lint still holds; the primary CTA and
 *      the focus indicator are the only places white reverses against
 *      the canvas.
 *
 *   3. \`--font-display\` is a GeistMono stack. Monospace AS the display
 *      face is the defining aesthetic decision (DESIGN.md §3) — it
 *      positions xAI not as a consumer product but as infrastructure,
 *      as something built by people who live in terminals. \`--font-mono\`
 *      aliases the same stack because GeistMono IS the monospace face
 *      used for code, kbd, and tabular metrics.
 *
 *   4. The four-level foreground ramp is opacity-based (rgba 1.0 / 0.7
 *      / 0.5 / 0.3), NOT a grayscale hex ramp. DESIGN.md §2 documents
 *      the system literally as "white at α". Binding \`--fg-2\`, \`--muted\`,
 *      and \`--meta\` as \`rgba(255,255,255,α)\` preserves the "white over
 *      canvas" voice and keeps the tiers chromatically locked to the
 *      single foreground color.
 *
 *   5. \`--border\` is \`rgba(255, 255, 255, 0.1)\` — DESIGN.md §2's default
 *      "Border Default" alpha, NOT a solid hex. \`--border-soft\` drops to
 *      0.05 for inner-row separators. The 0.2 "Border Strong" tier from
 *      DESIGN.md lives inline per-component (hover/active state edges).
 *
 *   6. Radii are aggressively small: 0 / 0 / 4 / 9999. DESIGN.md §5:
 *      "The near-zero radius philosophy is core to the brand's brutalist
 *      identity." Buttons, inputs, and cards all default to 0px;
 *      \`--radius-lg\` softens to 4px for the rare secondary container
 *      (DESIGN.md's "Subtle (4px) occasional"). \`--radius-pill\` stays at
 *      9999px because the schema slot requires a pill value, even though
 *      xAI rarely renders one.
 *
 *   7. \`--elev-raised\` is literally \`none\`. DESIGN.md §6: "xAI rejects
 *      the conventional shadow-based elevation system entirely. There
 *      are no box-shadows anywhere on the site." Depth is communicated
 *      through three other mechanisms documented in the same section:
 *      opacity-based borders that brighten on interaction, subtle
 *      background-opacity shifts (0.03 → 0.08), and the massive
 *      typographic scale contrast. \`--elev-ring\` is kept as a hairline
 *      border-as-shadow so components that target the elevation token
 *      still get a visible edge.
 *
 *   8. \`--focus-ring\` is the ONLY chromatic exception to the otherwise
 *      strictly monochromatic palette. DESIGN.md §2 names Tailwind's
 *      default \`--tw-ring-color\` (\`rgb(59, 130, 246) / 0.5\`) as the
 *      keyboard focus indicator. We reproduce it as a 3px halo
 *      (Tailwind's \`ring-2\` shape) — the blue is intentional and
 *      non-negotiable for a11y, even though the rest of the system is
 *      achromatic.
 *
 *   9. The type scale tops out at 64px (\`--text-4xl\`), NOT the 320px
 *      hero display DESIGN.md §3 names. 320px is a hero-only treatment,
 *      not a token tier — components.html overrides \`font-size\` inline
 *      for that one cinematic moment. Reserving \`--text-4xl\` at 64px
 *      keeps the slot useful as the H1-equivalent ceiling for cards,
 *      sections, and modals across the system. (See vercel/tokens.css
 *      §6 for the same reasoning: tokens encode reusable tiers, not
 *      one-off hero crops.)
 *
 *  10. \`--tracking-display\` stays \`normal\`. GeistMono at display scale
 *      does NOT compress letter-spacing — the monospace grid is part of
 *      the aesthetic and tightening would collapse it. The uppercase
 *      button tracking (\`1.4px\`, DESIGN.md §4) is an interaction-specific
 *      value that lives inline on \`.btn\` since it applies only to
 *      command-line-styled labels, not display headlines.
 *
 * Source contracts:
 *   - Standard token names: design-systems/_schema/tokens.schema.ts
 *   - A2 fallback parity:   design-systems/_schema/defaults.css
 *   - Lint enforcement:     apps/daemon/src/lint-artifact.ts
 *
 * Keep this file additive: never invent token names not also documented
 * in DESIGN.md or the shared schema. The GeistMono and universalSans
 * faces are referenced by name only — artifacts that render acceptably
 * fall back to the OS monospace and sans-serif stacks listed inside the
 * font-family declarations.
 * ─────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ─────────────────────────────────────────────────────
   * #1f2228 is the singular canvas — warm near-black with a subtle
   * blue undertone. \`--surface\` is the barely-visible 0.03 white tint
   * that cards sit on; \`--surface-warm\` rises to 0.05 for hover and
   * elevated rows. DESIGN.md §6's elevation ramp uses both values
   * verbatim as "Surface (Level 1)" and "Surface Hover". */
  --bg:           #1f2228;                       /* warm near-black canvas — NEVER #000 */
  --surface:      rgba(255, 255, 255, 0.03);     /* subtle card surface */
  --surface-warm: rgba(255, 255, 255, 0.05);     /* hover / elevated tier */

  /* ─── Foreground ──────────────────────────────────────────────────
   * Four-level opacity ramp per DESIGN.md §2. Pure white is "the
   * voice"; subsequent tiers express hierarchy by dimming rather
   * than by hue. Binding as rgba (not hex) keeps the ramp locked
   * chromatically to the single foreground color. */
  --fg:    #ffffff;                              /* primary — headings, links, body */
  --fg-2:  rgba(255, 255, 255, 0.7);             /* secondary — descriptions */
  --muted: rgba(255, 255, 255, 0.5);             /* tertiary — captions, timestamps */
  --meta:  rgba(255, 255, 255, 0.3);             /* quaternary — disabled, annotations */

  /* ─── Border ──────────────────────────────────────────────────────
   * Opacity-based borders — barely visible, never absent. 0.1 is the
   * default card / divider edge; 0.05 is the inner-row separator
   * that should not visually compete. The 0.2 "strong" tier from
   * DESIGN.md §2 lives inline per-component (hover/active states). */
  --border:      rgba(255, 255, 255, 0.1);       /* default card / divider */
  --border-soft: rgba(255, 255, 255, 0.05);      /* inner row separator */

  /* ─── Accent ──────────────────────────────────────────────────────
   * White IS the accent. There is no chromatic color in xAI's
   * monochromatic palette — primary CTAs are white-on-dark.
   * \`--accent-hover\` dims to 0.9 alpha per DESIGN.md §4 (primary
   * button hover); \`--accent-active\` drops a further step. The
   * convention is REVERSED from most systems: hover dims, it does
   * not brighten. */
  --accent:        #ffffff;                      /* the voice as bg */
  --accent-on:     #1f2228;                      /* canvas as fg on accent */
  --accent-hover:  rgba(255, 255, 255, 0.9);     /* slight dimming on hover (DESIGN.md §4) */
  --accent-active: rgba(255, 255, 255, 0.8);     /* deeper dim on press */

  /* ─── Semantic ────────────────────────────────────────────────────
   * DESIGN.md §7 actively discourages colored status indicators
   * ("Don't use colored status indicators unless absolutely
   * necessary — keep everything in the white/dark spectrum"). We
   * inherit schema defaults so the slots remain useful for the rare
   * cases where status truly must render chromatically — but
   * components should prefer monochrome cues (opacity, weight). */
  --success: #16a34a;
  --warn:    #eab308;
  --danger:  #dc2626;

  /* ─── Typography — fonts ──────────────────────────────────────────
   * GeistMono is the brand's defining typographic decision: a
   * monospace face used at display sizes. universalSans handles
   * body and section headings. \`--font-mono\` aliases the display
   * stack because GeistMono IS the monospace face — there is no
   * separate code typeface. */
  --font-display: "GeistMono", ui-monospace, "SF Mono", "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace;
  --font-body:    "universalSans", "universalSans Fallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono:    "GeistMono", ui-monospace, "SF Mono", "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace;

  /* Type scale — DESIGN.md §3 hierarchy table.
   * The 320px display hero is intentionally NOT a token tier;
   * components.html overrides \`font-size\` inline for that one
   * cinematic treatment. \`--text-4xl\` instead caps at 64px, the
   * realistic ceiling for marketing H1s across cards/sections.
   * \`--text-2xl\` (30px) matches DESIGN.md's "Section Heading" tier. */
  --text-xs:   12px;                             /* small / meta — timestamps, footnotes */
  --text-sm:   14px;                             /* button label / caption */
  --text-base: 16px;                             /* body — universalSans 1.5 */
  --text-lg:   20px;                             /* body large / introductions */
  --text-xl:   24px;                             /* card title */
  --text-2xl:  30px;                             /* section heading — DESIGN.md §3 */
  --text-3xl:  40px;                             /* H1 */
  --text-4xl:  64px;                             /* display ceiling (320px hero is inline-only) */

  /* Leading + tracking.
   * \`--leading-body: 1.5\` is universalSans body (DESIGN.md §3).
   * \`--leading-tight: 1.2\` matches the 30px section heading.
   * \`--tracking-display: normal\` because GeistMono at scale does
   * NOT compress letter-spacing — the monospace grid is the
   * aesthetic and tightening would collapse it. */
  --leading-body:     1.5;
  --leading-tight:    1.2;
  --tracking-display: normal;

  /* ─── Spacing ─────────────────────────────────────────────────────
   * DESIGN.md §5 documents a deliberately sparse scale concentrated
   * at the small end: 4 / 8 / 24 / 48. We bind the full schema slot
   * range — components reach for 1/2/6/12 most often; the
   * intermediate tiers are preserved for edge cases where a
   * narrower step is structurally required. */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* Section rhythm — DESIGN.md §5: "generous section padding 48px–
   * 96px". 96 desktop / 64 tablet / 48 phone preserves the
   * cinematic emptiness that is itself a design statement; the
   * absence of decoration means whitespace is the primary structural
   * tool. */
  --section-y-desktop: 96px;
  --section-y-tablet:  64px;
  --section-y-phone:   48px;

  /* ─── Radius ──────────────────────────────────────────────────────
   * Brutalist precision. DESIGN.md §5: "Sharp (0px) primary
   * treatment for buttons, cards, inputs — the default. Subtle (4px)
   * occasional softening on secondary containers." \`--radius-pill\`
   * stays at 9999px because the schema slot requires a pill value,
   * even though xAI rarely renders one. */
  --radius-sm:   0px;                            /* buttons, inputs — sharp */
  --radius-md:   0px;                            /* cards — sharp */
  --radius-lg:   4px;                            /* occasional secondary softening */
  --radius-pill: 9999px;                         /* schema-required slot */

  /* ─── Elevation ───────────────────────────────────────────────────
   * Shadow-free system per DESIGN.md §6: "xAI rejects the
   * conventional shadow-based elevation system entirely. There are
   * no box-shadows anywhere on the site." \`--elev-raised\` is
   * literally \`none\`; depth comes from opacity-based borders and
   * background tints. \`--elev-ring\` preserves the hairline edge for
   * components that read the elevation token. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised: none;

  /* ─── Focus ───────────────────────────────────────────────────────
   * The single chromatic exception. Tailwind's default
   * \`--tw-ring-color\` (DESIGN.md §2 "Ring Blue") at 50% opacity, as
   * a 3px halo matching the \`ring-2\` shape xAI uses for keyboard
   * accessibility focus states. Non-negotiable for a11y. */
  --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);

  /* ─── Motion ──────────────────────────────────────────────────────
   * Schema defaults. xAI does not choreograph — transitions are
   * short, purposeful, utilitarian. No long-form entrances. */
  --motion-fast:   150ms;
  --motion-base:   200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ──────────────────────────────────────────────────────
   * DESIGN.md §5: "Max content width: approximately 1200px." Gutters
   * narrow on mobile so the dense-but-deliberate vertical rhythm
   * keeps reading even when the dark canvas reaches the edge. */
  --container-max:            1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet:  16px;
  --container-gutter-phone:   12px;
}
`,P=`/* ─────────────────────────────────────────────────────────────────────────
 * design-systems/xiaohongshu/tokens.css
 *
 * Structured token bindings for "Design System Inspired by Xiaohongshu"
 * (小红书 / RED) — the Chinese lifestyle UGC discovery platform.
 *
 * The visual baseline is *daily-ness*: a near-white masonry canvas that
 * functions as a transparent picture frame for user-uploaded breakfasts,
 * lipstick swatches, and hotel sofas. Brand red (\`#FF2442\`) is the
 * single saturated voice the system permits — one accent per screen,
 * never two. Neutrals are translucent overlays (\`rgba(0,0,0, .05/.08/
 * .27/.45/.62/.80)\`) rather than discrete grey steps so the same fill
 * lands believably on white card, photo, or sheet.
 *
 * Brand identity in three sentences:
 *   1. Canvas is \`#F5F5F5\`; the white card (\`#FFFFFF\`) lifts above it
 *      by color contrast, not by elevation. Shadows are essentially
 *      absent — depth comes from rounding and spacing.
 *   2. Type is PingFang SC throughout (no separate display face) with
 *      the documented Hiragino Sans GB / Microsoft YaHei / Noto Sans SC
 *      fallback chain so 标记我的生活 reads the same on macOS, Windows,
 *      and Linux. Tracking is zero everywhere; the heading scale caps
 *      at 32px per DESIGN.md §3 ("no 48/64 hero").
 *   3. Brand red is the singular accent — used on CTAs, hearts, active
 *      tabs, and tag-on-trending. Danger has no independent token in
 *      RED's production system, so \`--danger\` aliases to the same red
 *      (DESIGN.md §2: "danger reuses --primary"). Skill authors should
 *      differentiate destructive intent via outline + leading icon when
 *      the difference matters.
 *
 * Schema decisions:
 *   - --bg: #f5f5f5 (canvas behind cards);  --surface: #ffffff (card).
 *   - --surface-warm: #fafafa (info background, DESIGN.md --bg0-lighter).
 *   - --fg: rgba(0, 0, 0, 0.8) (title — soft black, never #000);
 *     --fg-2: rgba(0, 0, 0, 0.62) (paragraph); --muted: 0.45 (caption);
 *     --meta:  rgba(0, 0, 0, 0.27) (disabled / placeholder).
 *   - --border: rgba(0, 0, 0, 0.08) (hairline separator);
 *     --border-soft: rgba(0, 0, 0, 0.05) (fill1 — group line).
 *   - --accent: #ff2442 (token red, default); --accent-hover: #ff2e4d
 *     (component-layer red — slightly pinker / lighter, doubles as the
 *     natural hover state for solid-fill primary CTAs).
 *   - --danger: #ff2442 (reuses brand red — DESIGN.md §2 explicit).
 *   - Font stacks lead with PingFang SC then the CJK fallback chain —
 *     RED is CJK-primary, so Latin fallbacks (\`-apple-system\`, etc.)
 *     come after.
 *   - Type scale ceiling at 32px (--text-4xl). DESIGN.md §3 forbids
 *     48/64 hero type; --text-3xl bumps to 28px so the marketing
 *     hero has a usable intermediate above section headings.
 *   - --radius-md: 12px (feed card), --radius-lg: 16px (feature card),
 *     --radius-pill: 9999px (buttons are pill, always).
 *   - --elev-raised: 0 4px 12px rgba(0, 0, 0, 0.08) — DESIGN.md §6
 *     "Subtle (1)", used only on PC card hover in the live system.
 * ─────────────────────────────────────────────────────────────────── */

:root {
  /* ─── Surface ──────────────────────────────────────────────────────
   * Canvas → Card → Subtle. The grey canvas IS the separation device
   * for white cards; cards do not need shadows to feel lifted. */
  --bg:           #f5f5f5;             /* Canvas — page background behind cards (DESIGN.md --bg0) */
  --surface:      #ffffff;             /* Surface — the white card / modal (DESIGN.md --bg) */
  --surface-warm: #fafafa;             /* Subtle — information background (DESIGN.md --bg0-lighter) */

  /* ─── Foreground ───────────────────────────────────────────────────
   * Four translucent black tiers. Pure #000 is never used for text;
   * even the title sits at 0.8 alpha so it reads as "soft black"
   * against the white card. */
  --fg:    rgba(0, 0, 0, 0.8);         /* Title — DESIGN.md --title */
  --fg-2:  rgba(0, 0, 0, 0.62);        /* Paragraph — DESIGN.md --paragraph */
  --muted: rgba(0, 0, 0, 0.45);        /* Description — DESIGN.md --description */
  --meta:  rgba(0, 0, 0, 0.27);        /* Disabled / placeholder — DESIGN.md --disabled */

  /* ─── Border ───────────────────────────────────────────────────────
   * Hairlines via alpha — the same line drops onto white card, onto
   * photo, or onto a sheet without recoloring. No opaque grey borders
   * by default. */
  --border:      rgba(0, 0, 0, 0.08);  /* Separator hairline — DESIGN.md --separator */
  --border-soft: rgba(0, 0, 0, 0.05);  /* Fill1 — group / row line that should not visually compete */

  /* ─── Accent ───────────────────────────────────────────────────────
   * One saturated voice for the whole system. The hover slot maps to
   * the documented component-layer red (#FF2E4D, slightly pinker /
   * lighter) — the same divergence that appears on .reds-button-new
   * .primary in production, repurposed as the natural hover state for
   * a token-driven primary CTA. */
  --accent:        #ff2442;            /* RED brand red (DESIGN.md --primary / --color-red) */
  --accent-on:     #ffffff;            /* White text on red CTA */
  --accent-hover:  #ff2e4d;            /* Component-layer red — slightly pinker; reads as a lift on hover */
  --accent-active: #e6203a;            /* Pressed — darker, more saturated red */

  /* ─── Semantic ─────────────────────────────────────────────────────
   * Success / warn lifted from DESIGN.md §2 (the platform's
   * --success / --warning tokens; nearly invisible in the consumer
   * flow but tokenized for B2B console contexts). Danger has no
   * independent token in RED — it reuses --primary; aliasing here
   * preserves that explicit DESIGN.md decision. */
  --success: #02b940;                  /* DESIGN.md --success (#EAF8EF bg variant lives in components) */
  --warn:    #ff7d03;                  /* DESIGN.md --warning */
  --danger:  #ff2442;                  /* Reuses brand red — DESIGN.md §2 "danger reuses --primary" */

  /* ─── Typography ───────────────────────────────────────────────────
   * CJK-primary brand: PingFang SC leads, then the documented
   * Hiragino Sans GB / Microsoft YaHei / Noto Sans SC chain, then
   * the Apple/Helvetica Latin fallback. No separate display face —
   * every Typography-FontFamily-* in production resolves to PingFang SC.
   * --font-mono inherits the schema default (RED Number is intentionally
   * NOT referenced here per DESIGN.md §3 — end users don't have it). */
  --font-display: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;

  /* Type scale — DESIGN.md §3 PC web tokens (h1=32 → c2=12).
   * The ceiling is deliberately compact: DESIGN.md forbids 48/64 hero
   * type, so --text-4xl tops out at 32px. --text-3xl interpolates at
   * 28px so a marketing hero has visual lift above section headings. */
  --text-xs:   12px;                   /* c2 — small caption */
  --text-sm:   14px;                   /* b2 / t3 — body standard, secondary label */
  --text-base: 16px;                   /* b1 / t2 — body large, the marketing reading size */
  --text-lg:   18px;                   /* t1 — strong label */
  --text-xl:   20px;                   /* h3 — card heading */
  --text-2xl:  24px;                   /* h2 — section heading */
  --text-3xl:  28px;                   /* intermediate display — between h1 and h2 */
  --text-4xl:  32px;                   /* h1 — display ceiling (DESIGN.md "no 48/64 hero") */

  /* Leading + tracking — DESIGN.md §3.
   * Body rides on 1.5 (24px on 16px b1). Headings tighten to 1.25
   * (40px on 32px h1). Tracking is 0 everywhere; only component-level
   * Chinese overrides hand-tune -0.3 to -0.64px and that stays out
   * of the token system. */
  --leading-body:     1.5;
  --leading-tight:    1.25;
  --tracking-display: 0;               /* DESIGN.md: "Every --Typography-Spacing-* token is 0" */

  /* ─── Spacing ──────────────────────────────────────────────────────
   * 8pt grid, stops 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 per DESIGN.md
   * §5. Section-level gaps (48 / 64) live in the rhythm tier below. */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* ─── Section rhythm ───────────────────────────────────────────────
   * The masonry feed itself is dense (cards 7–10px apart) but section
   * gaps on marketing surfaces breathe at 48–64px desktop, stepping
   * down to 32px on phone where vertical real estate is scarce. */
  --section-y-desktop: 64px;
  --section-y-tablet:  48px;
  --section-y-phone:   32px;

  /* ─── Radius ───────────────────────────────────────────────────────
   * Generous everywhere: 8px on inputs and tags, 12px on feed cards,
   * 16px on feature / hero cards, full pill on every button. The
   * pill radius is functionally mandatory — a square-cornered CTA
   * reads as wrong in this brand. */
  --radius-sm:   8px;                  /* Inputs, tags, small chips */
  --radius-md:   12px;                 /* Feed card (DESIGN.md §4 "Cards") */
  --radius-lg:   16px;                 /* Larger feature card, bottom-sheet top corners */
  --radius-pill: 9999px;               /* Buttons — always */

  /* ─── Elevation ────────────────────────────────────────────────────
   * Three sanctioned levels, used sparingly. Default is flat — depth
   * comes from canvas color contrast and rounding. The raised tier
   * lands on PC card hover only; modal shadow is one-off on .modal
   * and stays in components. */
  --elev-flat:   none;
  --elev-ring:   0 0 0 1px var(--border);
  --elev-raised: 0 4px 12px rgba(0, 0, 0, 0.08);   /* DESIGN.md §6 "Subtle (1)" — PC card hover */

  /* ─── Focus ────────────────────────────────────────────────────────
   * Brand red at 30% opacity. The schema default formula works for
   * the RED accent without override. */
  --focus-ring: 0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%);

  /* ─── Motion ───────────────────────────────────────────────────────
   * Standard durations. RED's interaction language is soft and quiet;
   * no aggressive bouncing curves. Defaults are appropriate. */
  --motion-fast:   150ms;
  --motion-base:   200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);

  /* ─── Layout ───────────────────────────────────────────────────────
   * 1200px container width — comfortably wider than the note-detail
   * two-pane (~1100px) for marketing surfaces. Phone gutter is tighter
   * (12px) so the masonry feed runs nearly edge-to-edge per DESIGN.md
   * §5 "Mobile Two-Column". */
  --container-max:            1200px;
  --container-gutter-desktop: 24px;
  --container-gutter-tablet:  16px;
  --container-gutter-phone:   12px;
}
`,S=1,B="od-design-tokens/v1",A="TOKEN_SCHEMA",D="2026-06-06T00:00:00.000Z",E={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},G={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},I=JSON.parse('[{"name":"--bg","value":"#1f2228","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--bg"},{"name":"--surface","value":"rgba(255, 255, 255, 0.03)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--surface"},{"name":"--surface-warm","value":"rgba(255, 255, 255, 0.05)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--surface-warm"},{"name":"--fg","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--fg"},{"name":"--fg-2","value":"rgba(255, 255, 255, 0.7)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--fg-2"},{"name":"--muted","value":"rgba(255, 255, 255, 0.5)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--muted"},{"name":"--meta","value":"rgba(255, 255, 255, 0.3)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:132"],"sourceName":"--meta"},{"name":"--border","value":"rgba(255, 255, 255, 0.1)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(255, 255, 255, 0.05)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--accent"},{"name":"--accent-on","value":"#1f2228","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"rgba(255, 255, 255, 0.9)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"rgba(255, 255, 255, 0.8)","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:152"],"sourceName":"--accent-active"},{"name":"--success","value":"#16a34a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--success"},{"name":"--warn","value":"#eab308","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:162"],"sourceName":"--warn"},{"name":"--danger","value":"#dc2626","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:163"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"GeistMono\\", ui-monospace, \\"SF Mono\\", \\"Roboto Mono\\", Menlo, Monaco, \\"Liberation Mono\\", \\"DejaVu Sans Mono\\", \\"Courier New\\", monospace","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:171"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"universalSans\\", \\"universalSans Fallback\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:172"],"sourceName":"--font-body"},{"name":"--font-mono","value":"\\"GeistMono\\", ui-monospace, \\"SF Mono\\", \\"Roboto Mono\\", Menlo, Monaco, \\"Liberation Mono\\", \\"DejaVu Sans Mono\\", \\"Courier New\\", monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:173"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:182"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:183"],"sourceName":"--text-base"},{"name":"--text-lg","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:184"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:185"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"30px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:186"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"40px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:187"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:188"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:196"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.2","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:197"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"normal","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:198"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:206"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:207"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:208"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:209"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:210"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:211"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:212"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:213"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"96px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:220"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:221"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:222"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:230"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"0px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:231"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:232"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:233"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:242"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:243"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:244"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px rgba(59, 130, 246, 0.5)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:251"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:256"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:257"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:258"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:264"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:265"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:266"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:267"],"sourceName":"--container-gutter-phone"}]'),j={schemaVersion:S,format:B,contract:A,generatedAt:D,source:E,summary:G,tokens:I},T=1,M="od-design-tokens/v1",C="TOKEN_SCHEMA",F="2026-06-06T00:00:00.000Z",_={tokensCss:"tokens.css",tokenContractReport:"source/token-contract.report.json"},H={totalTokens:56,declaredTokens:56,sourceBackedTokens:56,sourceBackedA1:26,fallbackTokens:26,aliasTokens:0,layerCounts:{"A1-identity":8,"B-slot":4,A2:26,"A1-structure":18},score:100,grade:"excellent",recommendRebuild:!1},R=JSON.parse('[{"name":"--bg","value":"#f5f5f5","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --bg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:59"],"sourceName":"--bg"},{"name":"--surface","value":"#ffffff","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --surface; no upstream recrawl was performed for this backfill.","sources":["tokens.css:60"],"sourceName":"--surface"},{"name":"--surface-warm","value":"#fafafa","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --surface-warm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:61"],"sourceName":"--surface-warm"},{"name":"--fg","value":"rgba(0, 0, 0, 0.8)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --fg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:67"],"sourceName":"--fg"},{"name":"--fg-2","value":"rgba(0, 0, 0, 0.62)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --fg-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:68"],"sourceName":"--fg-2"},{"name":"--muted","value":"rgba(0, 0, 0, 0.45)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --muted; no upstream recrawl was performed for this backfill.","sources":["tokens.css:69"],"sourceName":"--muted"},{"name":"--meta","value":"rgba(0, 0, 0, 0.27)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --meta; no upstream recrawl was performed for this backfill.","sources":["tokens.css:70"],"sourceName":"--meta"},{"name":"--border","value":"rgba(0, 0, 0, 0.08)","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --border; no upstream recrawl was performed for this backfill.","sources":["tokens.css:76"],"sourceName":"--border"},{"name":"--border-soft","value":"rgba(0, 0, 0, 0.05)","type":"color","layer":"B-slot","confidence":"high","reason":"Bundled tokens.css declares --border-soft; no upstream recrawl was performed for this backfill.","sources":["tokens.css:77"],"sourceName":"--border-soft"},{"name":"--accent","value":"#ff2442","type":"color","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --accent; no upstream recrawl was performed for this backfill.","sources":["tokens.css:85"],"sourceName":"--accent"},{"name":"--accent-on","value":"#ffffff","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-on; no upstream recrawl was performed for this backfill.","sources":["tokens.css:86"],"sourceName":"--accent-on"},{"name":"--accent-hover","value":"#ff2e4d","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-hover; no upstream recrawl was performed for this backfill.","sources":["tokens.css:87"],"sourceName":"--accent-hover"},{"name":"--accent-active","value":"#e6203a","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --accent-active; no upstream recrawl was performed for this backfill.","sources":["tokens.css:88"],"sourceName":"--accent-active"},{"name":"--success","value":"#02b940","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --success; no upstream recrawl was performed for this backfill.","sources":["tokens.css:96"],"sourceName":"--success"},{"name":"--warn","value":"#ff7d03","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --warn; no upstream recrawl was performed for this backfill.","sources":["tokens.css:97"],"sourceName":"--warn"},{"name":"--danger","value":"#ff2442","type":"color","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --danger; no upstream recrawl was performed for this backfill.","sources":["tokens.css:98"],"sourceName":"--danger"},{"name":"--font-display","value":"\\"PingFang SC\\", \\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Noto Sans SC\\", -apple-system, \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:107"],"sourceName":"--font-display"},{"name":"--font-body","value":"\\"PingFang SC\\", \\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Noto Sans SC\\", -apple-system, \\"Helvetica Neue\\", Helvetica, Arial, sans-serif","type":"fontFamily","layer":"A1-identity","confidence":"high","reason":"Bundled tokens.css declares --font-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:108"],"sourceName":"--font-body"},{"name":"--font-mono","value":"ui-monospace, \\"SF Mono\\", \\"JetBrains Mono\\", Menlo, Monaco, Consolas, monospace","type":"fontFamily","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --font-mono; no upstream recrawl was performed for this backfill.","sources":["tokens.css:109"],"sourceName":"--font-mono"},{"name":"--text-xs","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xs; no upstream recrawl was performed for this backfill.","sources":["tokens.css:115"],"sourceName":"--text-xs"},{"name":"--text-sm","value":"14px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:116"],"sourceName":"--text-sm"},{"name":"--text-base","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:117"],"sourceName":"--text-base"},{"name":"--text-lg","value":"18px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:118"],"sourceName":"--text-lg"},{"name":"--text-xl","value":"20px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:119"],"sourceName":"--text-xl"},{"name":"--text-2xl","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-2xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:120"],"sourceName":"--text-2xl"},{"name":"--text-3xl","value":"28px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-3xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:121"],"sourceName":"--text-3xl"},{"name":"--text-4xl","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --text-4xl; no upstream recrawl was performed for this backfill.","sources":["tokens.css:122"],"sourceName":"--text-4xl"},{"name":"--leading-body","value":"1.5","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-body; no upstream recrawl was performed for this backfill.","sources":["tokens.css:129"],"sourceName":"--leading-body"},{"name":"--leading-tight","value":"1.25","type":"number","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --leading-tight; no upstream recrawl was performed for this backfill.","sources":["tokens.css:130"],"sourceName":"--leading-tight"},{"name":"--tracking-display","value":"0","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --tracking-display; no upstream recrawl was performed for this backfill.","sources":["tokens.css:131"],"sourceName":"--tracking-display"},{"name":"--space-1","value":"4px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-1; no upstream recrawl was performed for this backfill.","sources":["tokens.css:136"],"sourceName":"--space-1"},{"name":"--space-2","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-2; no upstream recrawl was performed for this backfill.","sources":["tokens.css:137"],"sourceName":"--space-2"},{"name":"--space-3","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-3; no upstream recrawl was performed for this backfill.","sources":["tokens.css:138"],"sourceName":"--space-3"},{"name":"--space-4","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-4; no upstream recrawl was performed for this backfill.","sources":["tokens.css:139"],"sourceName":"--space-4"},{"name":"--space-5","value":"20px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-5; no upstream recrawl was performed for this backfill.","sources":["tokens.css:140"],"sourceName":"--space-5"},{"name":"--space-6","value":"24px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-6; no upstream recrawl was performed for this backfill.","sources":["tokens.css:141"],"sourceName":"--space-6"},{"name":"--space-8","value":"32px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-8; no upstream recrawl was performed for this backfill.","sources":["tokens.css:142"],"sourceName":"--space-8"},{"name":"--space-12","value":"48px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --space-12; no upstream recrawl was performed for this backfill.","sources":["tokens.css:143"],"sourceName":"--space-12"},{"name":"--section-y-desktop","value":"64px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:149"],"sourceName":"--section-y-desktop"},{"name":"--section-y-tablet","value":"48px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:150"],"sourceName":"--section-y-tablet"},{"name":"--section-y-phone","value":"32px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --section-y-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:151"],"sourceName":"--section-y-phone"},{"name":"--radius-sm","value":"8px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-sm; no upstream recrawl was performed for this backfill.","sources":["tokens.css:158"],"sourceName":"--radius-sm"},{"name":"--radius-md","value":"12px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-md; no upstream recrawl was performed for this backfill.","sources":["tokens.css:159"],"sourceName":"--radius-md"},{"name":"--radius-lg","value":"16px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-lg; no upstream recrawl was performed for this backfill.","sources":["tokens.css:160"],"sourceName":"--radius-lg"},{"name":"--radius-pill","value":"9999px","type":"dimension","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --radius-pill; no upstream recrawl was performed for this backfill.","sources":["tokens.css:161"],"sourceName":"--radius-pill"},{"name":"--elev-flat","value":"none","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-flat; no upstream recrawl was performed for this backfill.","sources":["tokens.css:168"],"sourceName":"--elev-flat"},{"name":"--elev-ring","value":"0 0 0 1px var(--border)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:169"],"sourceName":"--elev-ring"},{"name":"--elev-raised","value":"0 4px 12px rgba(0, 0, 0, 0.08)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --elev-raised; no upstream recrawl was performed for this backfill.","sources":["tokens.css:170"],"sourceName":"--elev-raised"},{"name":"--focus-ring","value":"0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)","type":"shadow","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --focus-ring; no upstream recrawl was performed for this backfill.","sources":["tokens.css:175"],"sourceName":"--focus-ring"},{"name":"--motion-fast","value":"150ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-fast; no upstream recrawl was performed for this backfill.","sources":["tokens.css:180"],"sourceName":"--motion-fast"},{"name":"--motion-base","value":"200ms","type":"duration","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --motion-base; no upstream recrawl was performed for this backfill.","sources":["tokens.css:181"],"sourceName":"--motion-base"},{"name":"--ease-standard","value":"cubic-bezier(0.2, 0, 0, 1)","type":"cubicBezier","layer":"A2","confidence":"high","reason":"Bundled tokens.css declares --ease-standard; no upstream recrawl was performed for this backfill.","sources":["tokens.css:182"],"sourceName":"--ease-standard"},{"name":"--container-max","value":"1200px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-max; no upstream recrawl was performed for this backfill.","sources":["tokens.css:189"],"sourceName":"--container-max"},{"name":"--container-gutter-desktop","value":"24px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-desktop; no upstream recrawl was performed for this backfill.","sources":["tokens.css:190"],"sourceName":"--container-gutter-desktop"},{"name":"--container-gutter-tablet","value":"16px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-tablet; no upstream recrawl was performed for this backfill.","sources":["tokens.css:191"],"sourceName":"--container-gutter-tablet"},{"name":"--container-gutter-phone","value":"12px","type":"dimension","layer":"A1-structure","confidence":"high","reason":"Bundled tokens.css declares --container-gutter-phone; no upstream recrawl was performed for this backfill.","sources":["tokens.css:192"],"sourceName":"--container-gutter-phone"}]'),L={schemaVersion:T,format:M,contract:C,generatedAt:F,source:_,summary:H,tokens:R};export{O as _,z as a,P as b,$ as c,L as d,j as e};
