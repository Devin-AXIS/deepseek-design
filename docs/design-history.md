# Design HTML history

Design records changed HTML using plugin-owned file watches and explicit editor writes. Ordinary Agent turns do not read, snapshot or restore Design files. Missing files and history failures stay in the Design surface and cannot block unrelated conversations.

The version dropdown previews a snapshot without changing the live file. Continue editing and `design_open` explicitly resume the selected version after preserving the newer content. A new subject can be written to a separate HTML using `new`; `fork` copies an existing design and its linked theme CSS, preserving the source.

HTML file cards expose two compact actions: Edit resumes that file, and New starts an independent blank HTML with its own history. The actions use the card's recorded Session event; they do not inspect the page DOM or read the file over the network to identify it. Files without a delivery card receive the same controls in a compact filename row. Theme selection remains inside the editor.

The canonical entry of an existing project retains `design/.versions/<session>`. Every other file uses `design/.versions/documents/<path-hash>`, including sibling HTML files in that project. Legacy snapshots remain readable. Linked media is not archived; a fork copies theme CSS but preserves other relative asset references in the same directory.

Version-2 binding metadata keeps the file identity, optional source and viewed revision under `.dsh-studio/design/bindings`. Version-1 records are read without rewriting them and upgraded on explicit activation. Uninstalling leaves HTML, CSS, metadata and history on disk, while withdrawing the live plugin contributions.

History endpoints require the native owner and plugin capability. Files remain inside their workspace, writes use revisions and atomic publication, and teardown drains admitted work before releasing the history owner.
