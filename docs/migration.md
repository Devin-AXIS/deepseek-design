# Beta.7 selected-element labels

Design's AI edit action inserts the selected element as a removable native composer label. Existing typed instructions remain intact. The file path, CSS locator and edit constraints stay attached as serialized context, rather than replacing the draft with an expanded prompt. No document migration is needed.

## Beta.6 save reliability and lazy loading

The plugin entry now loads packaged ESM editor assets on demand. No profile migration is needed. Both archives remain independently installable. Existing website history files remain readable; new snapshots distinguish user-message batches within one turn. Open native views share acknowledged version selection.

Video previews stay attached to their plugin owner and stop when it unloads. Existing independently started HyperFrames servers are not adopted as plugin-owned processes.

Queued theme edits flush when a view closes and use revision checks. A stale save after external deletion returns a conflict instead of recreating the file. Missing token files use create-only writes. On conflict, the editor retains the draft and offers retry or explicit reload. Browsing personal templates no longer installs the bundled catalog into the workspace.

## Beta.5 website history

Website projects now create native DSH pre-turn HTML snapshots and expose the original version selector in narrow sidebars. Existing timestamp-named snapshots remain readable. Selecting a previous version preserves the current HTML before restoring the selected starting point. This adds no dependency on the old application. See [Design history](design-history.md).

## Beta.4 native isolation cleanup

Beta.4 removes the unused original application client, desktop bridge, account/session engine modules and old resource-directory fallbacks. Existing document formats, native placement settings and provider credential references are retained. Browser media selection and microphone access replace desktop-only calls. The legacy template capability version remains 0.50.34 and is not inferred from the plugin package version.

HeyGen subscription login remains unavailable in native DSH; its API-key mode is retained. The original local-service fallback now reports an unavailable UI instead of trying an absent Electron bridge. See [the audit](independence-audit.md).

## Beta.3 native migration

Beta.3 replaces the enclosing iframe from beta.2 with the original Design and Video components mounted directly in DSH. The DSH mount owns and disposes the original React 19 renderer. Original HTML previews and the HyperFrames workbench retain their embedded document rendering. There is no standalone editor page or old Apollo Work service dependency.

The original storage, media, image/video generation, voice, avatar, enhancement, template validation, template save and .ipwp export implementations now belong to this repository. The shared native adapters supply DSH credentials, registered workspace identity, runtime resources and lifecycle cleanup. Configure provider references in native plugin settings. Provider availability and paid generation require the corresponding services and credentials.

Projects retain original HTML, manifests, token CSS and assets. Existing original HTML projects without manifests receive the original missing scaffold files without overwriting document bytes. Beta.1 project.json files are retained and are not silently converted. Back up or export beta.1 projects before removing that version.

The removed rewritten document tools do not return. DSH edits the original project files. Native service action tools bind to the active session, support bounded list/describe discovery and observe DSH read-only mode. The video validation tool accepts no caller-supplied workspace or session identity.

Right-sidebar and left-navigation switches remain independent native profile settings. No conversation-header tab is registered. Each bundle installs independently; the suite market distributes the same artifacts. Registry publication and production rollout have not been performed.
