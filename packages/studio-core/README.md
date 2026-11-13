# Shared original Studio sources

Both bundles compile this private source library. The `original` directory owns the captured Design/Video panels, shared UI primitives, original schemas, themes and host interfaces. It has no runtime dependency on another application or checkout.

`surface.tsx` and `placement.ts` provide shared native right-panel and left-navigation contributions plus profile-backed management switches. `native-mount.tsx` loads and hosts the locally bundled original editors. `http.ts` and `templates.ts` adapt their original file interfaces to authenticated DSH workspaces. API component/media additions belong to `resource-host.ts`, `resource-library.tsx`, `providers.ts` and `component.ts`.

Original HTML projects, linked design tokens and manifests remain authoritative. Resources add locally cached files with stable identifiers. The rejected replacement canvas, JSON project store and exporters have been removed. HyperFrames runtime ownership remains in the Video package and its pinned source under `vendor/hyperframes`.

Host teardown stops accepting requests and signals cancellation before awaiting admitted handlers, file streams and workers. Template stores and in-memory credentials are released after those consumers finish. Templates and HyperFrames registries resolve only from the native bundle's explicit directories; imported components and runtime state stay under the current workspace's `.dsh-studio/<kind>` directory.

Service credentials resolve through DSH. The retained HeyGen subscription implementation has no DSH login or callback integration; native generation currently supports its API-key path. Keeping the subscription source does not make its login flow available.
