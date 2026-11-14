# DeepSeek Design

The original iPolloWork Design editor as an independent DSH bundle, including PPT, inspectors, themes, undo and HTML documents. Editor code and assets are bundled locally.

`design_open` opens existing workspace HTML or creates/resumes a Design project. The model continues using native file tools and may redesign freely; templates are optional. File, revision and optional token-file references enter DSH's logged dynamic context. HTML file links use the native Design viewer while the plugin is enabled. Binding metadata lives under `.dsh-studio/design/bindings`, separately from original documents. Native file-resource changes refresh visible editors without routine polling; unavailable watchers retain the original polling fallback. Disabling the plugin removes its live contributions and preserves project files.

Open Design from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Design → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, service limitations and beta.1 migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).

Website and app projects keep an HTML version before each admitted DSH user-message batch, including follow-ups during a running turn. Use the V1/V2 dropdown to view a saved version or use it as the starting point for the next AI update. Open native views share the selected version. PPT and the remaining categories retain their existing behavior.

Editor assets load when the view opens. Theme edits are revision-checked and flushed on close; failed drafts remain available for retry. Browsing templates does not install their files into the workspace.

AI edit adds the selected element as a removable native composer label. Existing typed instructions stay in place; the file and element locator remain attached as context for the model.
