# DeepSeek Design

The original iPolloWork Design editor as an independent DSH bundle, including PPT, inspectors, themes, undo and HTML documents. Editor code and assets are bundled locally.

`design_open` opens existing workspace HTML or creates/resumes a Design project. The model continues using native file tools and may redesign freely; templates are optional. File, revision and optional token-file references enter DSH's logged dynamic context. HTML file links use the native Design viewer while the plugin is enabled. Binding metadata lives under `.dsh-studio/design/bindings`, separately from original documents. Native file-resource changes refresh visible editors without routine polling; unavailable watchers retain the original polling fallback. Disabling the plugin removes its live contributions and preserves project files.

Open Design from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Design → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, service limitations and beta.1 migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).

Website and app history is isolated by file. Live file notifications capture changed HTML without intercepting Agent turns. Selecting a version previews it; an explicit `design_open` or Continue editing resumes it after preserving newer content. HTML delivery cards offer Edit and New: New creates an independent blank HTML while preserving the source. The optional theme remains in the editor and writes variables without overriding element selectors.

Editor assets load when the view opens. Theme edits are revision-checked and flushed on close; failed drafts remain available for retry. Browsing templates does not install their files into the workspace.

Beta.22 supports the official 0.2.2-rc.3 desktop authentication API as well as the newer source build. Editor scripts and styles remain owner-authenticated.

AI edit opens a compact prompt beside the design, including in full-screen view. Selected elements and marked screenshots appear as context labels in the prompt and sent conversation. Sending uses the current native DSH session without opening the conversation; failed submissions retain the instruction and context. Existing composer drafts stay untouched.

Plain HTML presentations are detected from slide structure, independently of template selection. They use the shared slide navigation; ordinary webpages retain their own interactions. The source HTML is preserved.

The top toolbar has one Edit icon toggle and a separate Markup toggle; the shared Templates navigation remains the template entrypoint. Markup offers rectangle selection, pen strokes, movable/resizable image overlays and undo/redo. It stays local to the current preview, survives closing the toolbar, and resets when the document or preview revision changes. Markup does not change or save into the source HTML. Its instruction field sends the marked screenshot and text together to the current native DSH session; failed submissions preserve the draft and marks.

Text documents use a Browse / Text switch. The Text view edits main headings, paragraphs, lists and table-cell text without formatting controls; headings retain their visual hierarchy, while navigation, footer, badges and decorative copy stay out of this view. Use `data-ipw-text="decoration"` for auxiliary copy or `data-ipw-text="content"` for an explicit content block; source tags, links, styles and scripts stay in the HTML. Add `<meta name="ipw-document-type" content="document">` to identify generated articles and reports; semantic `<article>` pages are detected automatically. Text blocks grow and shrink with their contents and recalculate their height when the editor width or loaded fonts change. The editor retains the reading size and complete text; webpage preview continues to follow the original HTML layout constraints. Saves use the existing revision checks.

Publishing a Design file again updates its existing public URL. A complete revision is staged before replacing the live file set, so a failed upload leaves the previous page available. The native iPolloWork publishing service requires its publication-update release.
