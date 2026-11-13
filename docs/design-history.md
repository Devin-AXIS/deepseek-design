# Design website history

Design creates an HTML snapshot before DSH admits a new user turn for an existing website project. The native `agent/pre-step` listener delegates to the other listeners first. Rejected steps, read-only sessions, sessions without a Design project and non-website templates create no version.

The history dropdown shows V1, V2 and the current version, including in narrow native sidebars. The existing editor opens saved HTML in the same canvas. Selecting an older version sets the starting point of the next AI turn. Before restoring it, the plugin snapshots the newer current HTML, so it remains available in history. A failed snapshot stops that AI update; ordinary save and undo continue to have their existing meanings.

Snapshots retain the original `design/.versions/<session>/` directory. Native files use `turn-<padded turn number>-before-ai.html`; each turn has one snapshot even when preparation is retried. Legacy timestamp-named HTML snapshots remain visible. Names determine version ordering, so editing an old snapshot does not renumber the other versions. Selection is owned by the running plugin and resets when a different template replaces the project.

This restores the original website HTML history workflow. Linked images, stylesheets and other project assets stay in the working project; the feature does not archive a full copy of those assets. PPT and other Design categories retain their existing single-document workflow.

The native history API is scoped by registered workspace and session. Both reading and selecting a version require the same owner and plugin-capability authentication as the editor's other APIs. The host validates HTML paths within that session's history directory, rejects filesystem escapes and drains admitted file operations during unload. The browser reads history directly rather than scanning every project in the workspace.
