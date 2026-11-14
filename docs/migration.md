# Beta.9 native Video AI submission

Video generation, narration and contextual AI edits open their owning conversation and resolve its conversation service through the retained session context. This corrects the undeclared-injection error without changing project files or saved settings.

## Beta.8 app history

App designs now share the website HTML version selector and pre-update snapshots. Existing app HTML and assets stay in place. History from before snapshot support was installed cannot be reconstructed automatically.

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

## Beta.13: independent Design documents

Plain HTML can be created without selecting a template. Theme sheets are optional and new theme applications update CSS variables without overriding element selectors. Local element editing remains available without theme CSS.

Version selection previews content; continuing the edit explicitly resumes that version. Ordinary Agent requests no longer trigger Design snapshots or restore files. Existing canonical project histories remain in their original directory; sibling and external HTML files have independent histories. V1 bindings are accepted and upgraded only when activated. No existing HTML is rewritten by that upgrade.

The native file action row opens the exact recorded HTML and adds a short composer reference. New and fork actions keep the source file, and a fork copies a recognized local theme sheet. Non-template HTML retains file export and editing; packaging it as a reusable template remains a separate workflow.

## Beta.14: compact HTML file actions

HTML delivery cards contain Edit and New controls. New creates a blank, independent HTML rather than duplicating the source; explicit `design_open` forks remain available. Theme selection stays in the editor. Existing files, theme sheets and history require no migration.

## Beta.15: shared resource browser and key

Design’s Components browser moves into the original Element/Theme inspector. Data, Business and Asset library replace the component/image/video choices; Video uses the same three categories. The resource search API now accepts `category=data|business|library`, and asset entries use `kind=asset`. The resolve response’s MIME type selects image or video insertion. No project files or saved history require migration.

Both plugins use the shared DSH credential `IPOLLO_RESOURCES_API_KEY`, editable in either plugin’s settings. Separate component/asset credential references remain supported when that key is absent. Other provider credentials are unchanged.

## Beta.16: connection status and package artwork

Plugin pages show connection status and open a dedicated editor instead of displaying Key inputs inline. When the iPolloWork suite is loaded, both plugins register with its optional `ipolloConnections` client service. Unloading the suite restores the standalone native dialog. Generation and storage groups store validated field maps through `IPOLLO_STUDIO_*` DSH credential references; existing credential references remain available and take effect until a managed group is saved. The resource Key keeps its previous reference and value. Stored keys are never returned to the browser.

Both archives declare their own packaged icon. The suite projects the same artwork into its catalog, so the pre-install image and native installed image agree. Existing documents, histories and themes need no migration.
