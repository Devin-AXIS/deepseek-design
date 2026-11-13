# DeepSeek Design

The original iPolloWork Design editor as an independent DSH bundle, including PPT, inspectors, themes, undo and HTML documents. Editor code and assets are bundled locally.

Open Design from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Design → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, service limitations and beta.1 migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).

Website projects keep an HTML version before each admitted DSH user-message batch, including follow-ups during a running turn. Use the V1/V2 dropdown to view a saved version or use it as the starting point for the next AI update. Open native views share the selected version. PPT and other categories retain their existing behavior.

Editor assets load when the view opens. Theme edits are revision-checked and flushed on close; failed drafts remain available for retry. Browsing templates does not install their files into the workspace.
