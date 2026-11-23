# DeepSeek Video

Beta.22 supports the official 0.2.2-rc.3 desktop authentication API as well as the newer source build. Editor scripts and styles remain owner-authenticated.

The original iPolloWork Video panel and HyperFrames workbench as an independent DSH bundle, including the original timeline, preview runtime and themes. No other iPolloWork installation is needed.

Open Video from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Video → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, rendering requirements, service limitations and migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).

HeyGen subscription login is not connected to DSH; use its API-key mode. The retained desktop workbench has not been adapted for narrow mobile screens.

Editor assets load when the view opens. Theme edits are revision-checked and flushed on close; failed drafts remain available for retry. Browsing templates does not start an idle generation worker; unfinished jobs still resume.

AI actions open their owning conversation and submit through its native DSH queue. The plugin retains that session until admission completes and forwards submission failures to the editor.

`video_open` opens or resumes the current conversation’s native video project. A short logged context identifies its HTML and storyboard; native HTML file links reopen Video, and disabling the plugin withdraws its tool, guidance and notifications.

Selected video elements enter the native composer as removable labels, preserving the user’s existing instructions, like Design selections.

`video_open` can bind an existing workspace video folder or `index.html` without moving its files. The binding is persisted per conversation; the same source opens in the right editor and validation. Bailian HTTP narration defaults to Qwen3-TTS-Flash and retains MP3 output in saved projects.

The bundled `ipollowork-video` Skill guides original production, template editing and reference-based work. In the current conversation, `ipollowork_video_reference` measures a local project asset with HyperFrames 0.9.84. It can compare an isolated move or sample the same timestamps in a rendered result. Frame evidence is saved under the project's renders folder and requires workspace write access. Existing Studio previews and exports continue to use the Work-customized runtime.

Use Duplicate in the timeline's edit actions or press Ctrl/Cmd+D. Copy and duplicate read the saved composition, assign fresh element identities, and retain authored timing and supported inline CSS and GSAP animations within the same composition. They use the project's existing undo history.

Beta.26 waits for the preview document root before observing selection geometry. Template navigation and preview reloads reattach selection overlays to the current document root.
