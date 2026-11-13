# Shared original Studio sources

Both bundles compile this private source library. The `original` directory owns the captured Design/Video panels, shared UI primitives, original schemas, themes and host interfaces. It has no runtime dependency on another application or checkout.

`surface.tsx` and `placement.ts` provide shared native right-panel and left-navigation contributions plus profile-backed management switches. `client.tsx` hosts the locally bundled original editors. `http.ts` and `templates.ts` adapt their original file interfaces to authenticated DSH workspaces. API component/media additions belong to `resource-host.ts`, `resource-library.tsx`, `providers.ts` and `component.ts`.

Original HTML projects, linked design tokens and manifests remain authoritative. Resources add locally cached files with stable identifiers. The rejected replacement canvas, JSON project store and exporters have been removed. HyperFrames runtime ownership remains in the Video package and its pinned source under `vendor/hyperframes`.
