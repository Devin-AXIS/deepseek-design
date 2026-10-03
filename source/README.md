# Source map

This directory mirrors the thin DeepSeek Harness adapters and shared Studio contracts from [iPolloWork](https://github.com/Devin-AXIS/iPolloWork/tree/8f35f8dc4c9f2ee8c04b261b2ad8bffd07cb66dd). The complete, directly installable runtime is in `packages/`.

Source pull requests are welcome in this repository. After a source change is merged here, iPolloWork imports it as a reviewable upstream pull request. When that upstream pull request is merged, all Studio packages are rebuilt and synchronized back here. Do not edit generated files under `packages/` directly.

Design, PPT, and Video remain single-sourced in iPolloWork. The curated templates remain in [bundled-templates](https://github.com/Devin-AXIS/iPolloWork/tree/8f35f8dc4c9f2ee8c04b261b2ad8bffd07cb66dd/apps/server/bundled-templates). Changes to core Studio surfaces or templates should be proposed directly in the main repository.
