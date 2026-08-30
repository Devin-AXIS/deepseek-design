# Source map

This directory mirrors the thin DeepSeek Harness adapters and shared Studio contracts from [iPolloWork](https://github.com/Devin-AXIS/iPolloWork/tree/4a9985bf0de3a54e3b668b436d1899d43877b5a7). The complete, directly installable runtime is in `packages/`.

Source pull requests are welcome in this repository. After a source change is merged here, iPolloWork imports it as a reviewable upstream pull request. When that upstream pull request is merged, all Studio packages are rebuilt and synchronized back here. Do not edit generated files under `packages/` directly.

Design, PPT, and Video remain single-sourced in iPolloWork. The curated templates remain in [bundled-templates](https://github.com/Devin-AXIS/iPolloWork/tree/4a9985bf0de3a54e3b668b436d1899d43877b5a7/apps/server/bundled-templates). Changes to core Studio surfaces or templates should be proposed directly in the main repository.
