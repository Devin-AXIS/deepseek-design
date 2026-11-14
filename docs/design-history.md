# Design HTML history

Design counts AI-produced content versions. Empty HTML scaffolds have no version. The first meaningful design is V1; manual editing updates that version. A later AI turn that changes the HTML produces the next version, while unchanged turns do not. Multiple writes within one AI turn produce one version. File watches continue to refresh previews and metadata.

The version dropdown excludes the duplicate live snapshot and hides empty legacy snapshots without deleting files. Selecting a historical version only changes the preview. Explicitly resuming it preserves the newer content before restoring the selected HTML. New and fork actions keep their source files.

The canonical entry retains `design/.versions/<session>`. Other files use `design/.versions/documents/<path-hash>`. Versions and selection stay scoped to the document. Manual saves update only the latest snapshot; earlier AI versions remain available.

Version-2 bindings retain the active file and optional theme link. History endpoints require native owner access and the plugin capability. Writes remain atomic and revision-checked. Uninstalling retains documents, themes and history.
