# Beta.3 native migration

Beta.3 replaces the enclosing iframe from beta.2 with the original Design and Video components mounted directly in DSH. The DSH mount owns and disposes the original React 19 renderer. Original HTML previews and the HyperFrames workbench retain their embedded document rendering. There is no standalone editor page or old Apollo Work service dependency.

The original storage, media, image/video generation, voice, avatar, enhancement, template validation, template save and .ipwp export implementations now belong to this repository. The shared native adapters supply DSH credentials, registered workspace identity, runtime resources and lifecycle cleanup. Configure provider references in native plugin settings. Provider availability and paid generation require the corresponding services and credentials.

Projects retain original HTML, manifests, token CSS and assets. Existing original HTML projects without manifests receive the original missing scaffold files without overwriting document bytes. Beta.1 project.json files are retained and are not silently converted. Back up or export beta.1 projects before removing that version.

The removed rewritten document tools do not return. DSH edits the original project files. Native service action tools bind to the active session, support bounded list/describe discovery and observe DSH read-only mode. The video validation tool accepts no caller-supplied workspace or session identity.

Right-sidebar and left-navigation switches remain independent native profile settings. No conversation-header tab is registered. Each bundle installs independently; the suite market distributes the same artifacts. Registry publication and production rollout have not been performed.
