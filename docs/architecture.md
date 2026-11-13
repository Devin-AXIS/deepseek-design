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

Each plugin mounts the original editor components directly in the DSH document. The DSH slot owns a DOM mount and disposes its local renderer; that renderer retains the original React 19 dependencies while DSH uses React 18. There is no enclosing editor iframe or standalone editor page. Original HTML document previews and the original HyperFrames workbench retain their own embedded rendering. Original styles are scoped to the editor and its overlay container, and original shared controls receive that overlay container. DSH owns theme selection and conversation submission.

Projects retain original HTML, manifests, linked token CSS and assets under `design/<session>` or `video/<session>`. The rejected JSON editor and replacement canvas have been removed. The original panels gained an optional component-toolbar contribution. Build/import adapters remain outside those panels. Preview startup, active requests and resource work are drained during plugin disposal.

The source map records the captured original workspace files with SHA-256 hashes and a Git baseline. Hashes describe the source snapshot; the baseline alone does not assert that the original checkout was clean.

Original storage, media, image/video generation, enhancement and template services are extracted into the same repository. Native adapters supply DSH workspace/session identity, credential references, runtime paths, cancellation and disposal. They do not call an old Apollo Work server or import its conversation engine. Provider configuration and full behavior acceptance are required before a parity claim.

This repository is the maintenance home for both plugins. The former application repository’s forward-sync and reverse-import workflows are disabled; updates to the captured source are reviewed and committed here. Build output stays out of Git and is produced by the shared CI.
