# Architecture

The two independent DSH bundles own the extracted original iPolloWork editor source. They do not import another checkout or substitute a second editor implementation.

| Owner | Responsibility |
| --- | --- |
| `packages/deepseek-design` | DSH host adapter and original Design entrypoint, including PPT |
| `packages/deepseek-video` | DSH host adapter, original Video entrypoint and preview processes |
| `packages/studio-core/src/original/app` | Original panels, locales and supporting application modules |
| `packages/studio-core/src/original/ui` | Original UI primitives and design tokens |
| `packages/studio-core/src/original/types` | Original document/service schemas |
| `packages/studio-core/src/original/design-studio`, `video-studio` | Original host/selection interfaces |
| `packages/studio-core/templates` | Original templates, including presentations |
| `vendor/hyperframes` | Pinned original video workbench/runtime source |
| `packages/studio-core/src/surface.tsx` | Shared native placements and management switches |
| `packages/studio-core/src/resource-*` | Additional configured component and image/video APIs |

Both clients use `registerPluginSurface(ctx, definition)`. Participating plugins supply content, stable identifiers and an icon; their host Config includes the shared placement fields. The helper registers into `sidebar.right.pane.tab`, `sidebar.panellist`, `main` and `plugins.bundle.config`. DSH owns geometry, configuration persistence, installation and activation. No conversation-header view is registered.

Both bundles register the same `ipollo-templates` main panel and sidebar entry at different native slot priorities. DSH renders one entry when both run and restores the remaining registration when either stops. `template-navigation.tsx` reads the Host’s exposed configuration namespaces to include only active Design/Video catalogs; `template-library.tsx` supplies one shared page with the original theme primitives, category/style/topic filters, personal templates, favorites and cover previews. Catalogs and template writes use the same authenticated endpoints as the editors. Using a template creates a new DSH session before applying it, then opens its owning editor through the typed `ipollo/studio-open` event after the native session surface mounts. With the right panel disabled, that event opens the full-page editor even if its sidebar shortcut is hidden. Existing editor template dialogs remain available. Cloud and enterprise catalogs are not connected by this page.

Design selections use DSH's native summarized quote in the composer. The element label is visible and removable; its file, locator and edit instructions are retained in the serialized quote. Both native placements use the same insertion path and preserve existing user text.

Each plugin mounts the original editor components directly in the DSH document. The DSH slot owns a DOM mount and disposes its local renderer; that renderer retains the original React 19 dependencies while DSH uses React 18. There is no enclosing editor iframe or standalone editor page. Original HTML document previews and the original HyperFrames workbench retain their own embedded rendering. Original styles are scoped to the editor and its overlay container, and original shared controls receive that overlay container. DSH owns theme selection and conversation submission.

The small DSH registration entry loads the editor's ESM renderer and scoped stylesheet when its view opens. Code highlighting and export libraries retain dynamic imports. Hashed assets are served by the authenticated plugin route. Both archives retain the HyperFrames runtime and assets needed for independent installation; the build compiles shared workers and runtime once before assembling the two packages. Runtime input and output fingerprints prevent stale compiled assets from surviving source changes.

Each archive declares the `@deepseek-ai/dsh-*` packages it imports as peer dependencies in its `engines.dsh` range, and the build leaves them external. The running DSH supplies them. A regular dependency would install a second copy into the profile; DSH would then check its base plugins against that copy and disable them when its version differs from the runtime. `scripts/check-package.mjs` rejects such dependencies.

Theme edits share a serialized, revision-checked writer across native views. Closing a view flushes its queued edit; failed drafts remain available for retry or explicit reload. Creating a missing token file uses an atomic create-only write. Reading the personal template library never installs bundled templates or starts an idle video worker; unfinished video jobs still resume on startup.

Projects retain original HTML, manifests, linked token CSS and assets under `design/<session>` or `video/<session>`. The rejected JSON editor and replacement canvas have been removed. The original panels gained an optional component-toolbar contribution. Build/import adapters remain outside those panels. Preview startup, active requests and resource work are drained during plugin disposal.

File reads obtain bytes and revision metadata through the same open file. Writes finish their contents and monotonic timestamp on the temporary file before atomically publishing it, so a reader cannot observe a new document with an intermediate revision.

The HTML editor retains accepted content, its path and its write revision together. Background reads cannot advance the revision of an unsaved draft. A save cancels older reads and publishes its acknowledged revision before admitting another read; edits made during a save remain unsaved drafts.

Video starts HyperFrames with its foreground option so the preview server remains in the plugin-owned process group. Noninteractive launch must not create a detached background server; ready-preview disposal is checked against the actual server process and installed archive.

The source map records the captured original workspace files with SHA-256 hashes and a Git baseline. Hashes describe the source snapshot; the baseline alone does not assert that the original checkout was clean.

Original storage, media, image/video generation, enhancement and template services are extracted into the same repository. Native adapters supply DSH workspace/session identity, credential references, runtime paths, cancellation and disposal. They do not call an old Apollo Work server or import its conversation engine. Provider configuration and full behavior acceptance are required before a parity claim.

This repository is the maintenance home for both plugins. The former application repository’s forward-sync and reverse-import workflows are disabled; updates to the captured source are reviewed and committed here. Build output stays out of Git and is produced by the shared CI.

Host, Client and tests have separate TypeScript programs. The executable dependency gate starts at the actual plugin, renderer and worker entrypoints and rejects imports of the former application, browser-to-Host dependencies and Host-to-UI dependencies. Native `StudioServiceClient` types expose only implemented routes; browser selection, font and microphone capabilities have no desktop bridge. See [the independence audit](independence-audit.md).
