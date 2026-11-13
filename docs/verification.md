# Beta.5 website history verification

The native build, separate Host/Client/test typechecks, all 53 focused tests, package checks and dependency/source checks pass. New tests cover one snapshot per user turn, concurrent/retried preparation, selecting an old starting point without losing the newer HTML, non-website projects, cancelled/unloaded operations, workspace escapes, read-only turns and the installed Host's pre-step/history API integration. No paid model request is needed for those tests.

The final beta.5 archives also passed Design-only, Video-only and combined DSH installation. In the actual native UI, a new website showed V1 immediately. Two test snapshots created by the production snapshot writer exposed V1/V2/V3; selecting V1 displayed its HTML and closed the menu. The final 390px layout kept the selector visible without overlap. Automatic pre-step behavior was exercised by the native Host integration tests, rather than a paid model call.

## Beta.4 verification

`npm run check` passed on Node 25.8.1 with DSH 0.2.2-rc.2: native Host/Client builds, separate Host/Client/test typechecks, 46 focused tests, dependency boundaries, package payloads and recorded source hashes. A separate clean source copy also passed `npm ci --ignore-scripts` and `npm run check`, including rebuilding the pinned HyperFrames runtime without existing artifacts. The retained source inventory contains 1,909 captured files and 75 explicit native adaptations. Tests cover request and file-stream draining, cancelled providers and uploads, credential/cache disposal, template isolation and compatibility, service routes, browser media adapters and compiled native navigation rendering.

Real `.tgz` archives passed independent Design, independent Video and combined installation in fresh disposable DSH profiles. The smoke checks require actual archive dependencies and matching installed names/versions; no source-link fallback is allowed. CI installs pnpm 11.28.5 and enables an explicit test-only allowlist for exact dependency-build versions. The active user profile was not modified by this audit.

Browser checks used the combined archive installation. The native Design canvas opened and applied the original 38-slide presentation template. The Video workbench opened its original script, preview, timeline, property and asset panels; a temporary shot opened the native visual/material settings dialog and was discarded. DSH dark mode propagated to the editor. No browser error was recorded during these final checks. HTML document previews and the original HyperFrames workbench retain their embedded rendering; the editors themselves mount in native DSH slots.

The 390px Video check exposed the retained desktop multi-column layout's horizontal-space limitation. Mobile usability is not accepted by this audit. Theme-resource pruning retained the 151 runtime themes and all guide-referenced component samples and reports.

Earlier beta.3 verification exported a 38-slide PPTX containing 600 editable text runs and rendered representative slides in LibreOffice; it also checked template save/export/reapply and revision-conflict behavior. Beta.4 does not change that export implementation, but a new full PowerPoint compatibility review was not performed.

Paid image/video/voice/avatar generation, offline enhancement model execution and full parity across every original workflow remain unverified. HeyGen API-key mode is retained; subscription login and its OAuth callback are not connected to DSH. This audit establishes the tested independence and isolation behavior, not those provider flows. Neither npm registry publication nor a production rollout was performed.
