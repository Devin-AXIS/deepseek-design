# DeepSeek Video

The original iPolloWork Video panel and HyperFrames workbench as an independent DSH bundle, including the original timeline, preview runtime and themes. No other iPolloWork installation is needed.

Open Video from the native right panel or left navigation. Configure both entrypoints independently in Plugins → Installed → Video → Display location. No conversation-header tab is added. Component and media APIs are additional resources. See the source repository for configuration, rendering requirements, service limitations and migration notes.

Beta.4 isolates the browser client from the former application and keeps credentials, files and media services in the native plugin host. See the [independence audit](https://github.com/Devin-AXIS/deepseek-design/blob/main/docs/independence-audit.md).

HeyGen subscription login is not connected to DSH; use its API-key mode. The retained desktop workbench has not been adapted for narrow mobile screens.

Editor assets load when the view opens. Theme edits are revision-checked and flushed on close; failed drafts remain available for retry. Browsing templates does not start an idle generation worker; unfinished jobs still resume.
