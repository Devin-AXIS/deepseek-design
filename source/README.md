# Source map

This directory mirrors the thin DeepSeek Harness adapters and shared Studio contract from [iPolloWork](https://github.com/Devin-AXIS/iPolloWork/tree/e015ae83a1b5694f67c25e9765a58957b4fc9454). The complete, directly installable runtime is in `packages/`.

Source pull requests are welcome in this repository. After a source change is merged here, iPolloWork imports it as a reviewable upstream pull request. When that upstream pull request is merged, the Studio and packages are rebuilt and synchronized back here. Do not edit generated files under `packages/` directly.

The Design and PPT interface remains single-sourced in [iPolloWork Design Studio](https://github.com/Devin-AXIS/iPolloWork/tree/e015ae83a1b5694f67c25e9765a58957b4fc9454/apps/app/src/react-app/domains/session/design), and the curated templates remain in [bundled-templates](https://github.com/Devin-AXIS/iPolloWork/tree/e015ae83a1b5694f67c25e9765a58957b4fc9454/apps/server/bundled-templates). Changes to those paths should be proposed directly in the main repository.
