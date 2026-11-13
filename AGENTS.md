# DeepSeek Design and Video

This repository owns two native DSH bundles and a shared source library. Preserve the original iPolloWork Design and Video editors, shared UI primitives, theme system, document format and HyperFrames runtime. Extract their source into this repository; never depend on a running iPolloWork application or an external checkout. Adapt host services through the original host interfaces. Use native DSH right-sidebar and navigation slots. Isolate executable document previews from the host UI.

Keep all persisted content versioned, writes atomic and revision-checked, API credentials host-only, and plugin-owned work awaited during disposal. Component and media providers are explicit configured APIs; do not invent catalog items or silently replace missing resources. Preserve source and license notices when reusing code.

Run `npm run check`. Test independent and combined bundle installation in a disposable DSH profile, and inspect native views in light/dark themes and at 390px. Do not install into a working profile or publish packages without the user's instruction. CI is shared by both packages.
