# Source map

This directory mirrors the thin DeepSeek Harness adapters and shared Studio contract from [iPolloWork](https://github.com/Devin-AXIS/iPolloWork/tree/beb0ccbd827bdec2ee6864f9348590cb71c66f09). The complete, directly installable runtime is in `packages/`.

Source pull requests are welcome in this repository. After a source change is merged here, iPolloWork imports it as a reviewable upstream pull request. When that upstream pull request is merged, the Studio and packages are rebuilt and synchronized back here. Do not edit generated files under `packages/` directly.

The Design and PPT interface remains single-sourced in [iPolloWork Design Studio](https://github.com/Devin-AXIS/iPolloWork/tree/beb0ccbd827bdec2ee6864f9348590cb71c66f09/apps/app/src/react-app/domains/session/design), and the curated templates remain in [bundled-templates](https://github.com/Devin-AXIS/iPolloWork/tree/beb0ccbd827bdec2ee6864f9348590cb71c66f09/apps/server/bundled-templates). Changes to those paths should be proposed directly in the main repository.
