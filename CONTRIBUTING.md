# Contributing

This repository maintains the Design and Video native DSH plugins. Read the architecture and migration documents before changing package responsibilities. Source lives here; do not sync it from the former application repository. The former forward-sync and reverse-import workflows must remain disabled after the repository becomes independent.

Use Node 24.9 or newer, run `npm ci --ignore-scripts`, then `npm run check`. Changes to installation, native views or lifecycle handling also require the disposable-profile smoke in `scripts/native-smoke.mjs`. Never use a working DSH profile for acceptance tests.

Keep both plugins independently installable. Share code through `studio-core`, use documented DSH contributions, preserve atomic revision-checked saves, and treat API credentials as Host-only data. API resources must retain stable identities and local content hashes. Add focused behavior coverage for failures as well as successful requests. Update the relevant package README with user-visible changes.

Run `npm run pack:plugins` for local tarballs. Publishing a release is a separate maintainer action.
