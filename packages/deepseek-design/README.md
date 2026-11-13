# DeepSeek Design

The original iPolloWork Design editor as an independent DSH bundle, including PPT, inspectors, themes, undo and HTML documents. Editor code and assets are bundled locally.

Open Design from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Design → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, service limitations and beta.1 migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).
