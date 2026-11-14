# DeepSeek Design and Video

独立维护的两个原生 DeepSeek Harness 插件：**Design（包含 PPT）** 与 **Video**。仓库保存可构建的插件源码、原版编辑器、设计系统、模板和运行资源。

未选模板时创建中性 HTML；`design_open` 的 `new` 和 `fork` 可分别新建或复制方案，保留原文件。文件结果下方提供继续编辑、另存新方案和主题变量入口。主题可选，局部编辑不依赖主题。

Design 提供轻量的 `design_open` 工具：可从零建立作品，也可打开已有工作区 HTML，继续用 DSH 原来的文件工具自由创作。当前文件与修订信息通过原生动态上下文交给 AI，不注入完整页面或强制套用模板。点击会话里的 HTML 文件会进入 Design；作品绑定单独保存在 `.dsh-studio/design/bindings`，打开已有文件不会改写 HTML、CSS 或添加旁置元数据。停用插件撤销工具、规则、文件关联和订阅，作品文件保持可用。

编辑器直接挂载到 DSH 原生界面。运行和构建均不需要原 iPolloWork 仓库、桌面应用或后台服务。原版 HTML 预览与 HyperFrames 工作台保留自身的文档渲染容器。

左侧独立「模板」入口展示已启用的 Design、Video 模板，支持搜索、分类、风格、收藏和大图预览；使用模板时新建 DSH 会话，不覆盖已有项目。两个插件同时安装时仍只有一个模板入口，编辑器内的模板入口也保留。

## 插件与源码

| 插件 | 源码目录 | 能力 |
| --- | --- | --- |
| `deepseek-idesign` | [`packages/deepseek-design`](packages/deepseek-design) | Design、PPT、画布、属性编辑、主题、模板和导出 |
| `deepseek-ivideo` | [`packages/deepseek-video`](packages/deepseek-video) | 原版 Video 工作台、脚本、时间轴、预览和媒体服务 |
| 共享源码 | [`packages/studio-core`](packages/studio-core) | 原版组件、设计系统、宿主适配、资源 API 和模板 |
| 视频运行时 | [`vendor/hyperframes`](vendor/hyperframes) | 随插件构建和分发的 HyperFrames 源码 |

网站和 App 类 Design 支持 [V1/V2 历史版本](docs/design-history.md)：按文件变化保存 HTML，预览历史不会改写当前文件；明确继续编辑时才恢复选中的版本。PPT 已包含在 Design 中。旧的 `deepseek-ippt` 和 `source/plugins` 镜像目录不再作为维护入口。修改直接提交到这个仓库，不再回传原应用后等待同步。

## 构建与安装

需要 Node.js 24.9+、npm、Bun 1.3.13，以及 DSH `0.2.2-rc.2`。

```sh
git clone https://github.com/Devin-AXIS/deepseek-design.git
cd deepseek-design
npm ci --ignore-scripts
npm run check
npm run pack:plugins

dsh plugin --profile web add ./artifacts/deepseek-idesign-1.0.0-beta.13.tgz
dsh plugin --profile web add ./artifacts/deepseek-ivideo-1.0.0-beta.13.tgz
dsh --profile web
```

在 DSH 的“插件 → 已安装”中启用需要的插件。每个插件可独立安装；它们都不要求安装 iPolloWork 套件。安装器如请求依赖构建授权，请检查它列出的包后再授权。这里的命令使用本仓库生成的安装包，不表示 npm 上的旧版本已经更新。

在“插件 → 已安装 → Design / Video → 显示位置”中，可以分别开关右侧白板和左侧导航。设置由 DSH 保存，不添加对话顶部的功能标签。

## 维护与验证

两个插件共用 CI，但分别打包。原版编辑器、UI 组件和设计系统的迁入文件及必要修改记录在[源码清单](docs/source-map.json)；宿主适配位于共享库和各插件入口。参见[架构](docs/architecture.md)、[版本迁移](docs/migration.md)、[独立性审查](docs/independence-audit.md)和[实际验证范围](docs/verification.md)。

本地已验证原生界面、模板保存/导出/再应用、Video 编辑落盘和可编辑 PPTX 导出。付费提供方、离线模型及所有原版工作流并未全部验收；使用前仍需配置对应服务。

## Configuration

The plugin rows are `deepseek-design` and `deepseek-video`.

| Field | Default | Purpose |
| --- | --- | --- |
| `rightSidebar`, `leftNavigation` | `true` | Native entrypoints |
| `componentApi`, `assetApi` | empty | Component and image/video API origins |
| `componentCredential`, `assetCredential` | empty | Legacy credential references, used only when the shared resource key is absent |
| `requestTimeoutMs` | `20000` | Request timeout |
| `maxResourceBytes` | `50000000` | Download limit |
| `maxLocalMediaBytes` | `524288000` | Local media upload/read limit, preserving the original 500 MB enhancement input |
| `serviceCredentials` | `{}` | Original service id → DSH credential record or environment credential reference |
| `enhancementModelsPath` | empty | Offline speech/vision model directory |
| `ffmpegPath`, `ffprobePath` | empty | Optional local media executable paths |

Native service settings are available in each plugin’s settings page. API secrets stay in DSH credentials. Provider ids include `openai-images`, `openai-browser`, `fal-images`, `aliyun-bailian`, `volcengine-video`, `runninghub-video`, `heygen-video` and the original storage providers. The original publishing, voice, avatar, generation, media workbench and enhancement controls call locally owned service implementations. Providers still require their own credentials. HeyGen subscription login is not connected to DSH; use its API-key mode.

Plugin settings show a Service connections status entry. With the iPolloWork suite enabled, it opens the suite’s common editor; without the suite, it opens a native plugin dialog. Keys are entered only in that dialog. Both bundles resolve the same resource credential, `IPOLLO_RESOURCES_API_KEY`, and share the generation/storage connection groups. A group stores all of its fields together in DSH credentials and returns only field-presence and writability. Existing separate credential references remain a fallback for older profiles; native account sign-in and OAuth grants keep their existing flows.

Design’s original inspector contains Element, Theme and Components. Components contains Data, Business and Asset library; Video uses the same resource browser. Data lists the component API’s `charts` subcategory; Business lists its other components. The asset library searches by request without an image/video selector, and inserts the media type returned by the resolve API. Resources are acquired into the original project folder with stable source/version/content identifiers. Resource style is separate from the original design theme. Missing APIs report a configuration error. Existing design tokens are preserved.

## Development

Requires Node 24.9+, npm and Bun 1.3.13.

```sh
npm ci --ignore-scripts
npm run check
npm run pack:plugins
```

The build fingerprints HyperFrames source, dependencies, tools and outputs, rebuilding the pinned runtime when any change. `npm run build:runtime` forces a rebuild. Shared CI checks both packages, independent/combined native-host installs, actual editor rendering, save/reopen and version switching. `npm run test:browser` runs isolated real-component regressions; it requires Chrome or a Playwright Chromium installation. `npm run check` covers builds, TypeScript, focused resource/lifecycle tests and package contents; it does not establish visual acceptance of every original workflow.

## License

The extracted source retains the iPolloWork Source Available License. HyperFrames and other dependencies retain their notices. See [LICENSE](LICENSE), [LICENSES](LICENSES) and [HyperFrames license](vendor/hyperframes/LICENSE).

Offline enhancement models are provisioned separately: run `npm run prepare:models`, then set `enhancementModelsPath` to this repository’s `.runtime/models` directory. The installer downloads the original pinned model revisions and notices; inference does not download models. A local Codex runtime and an OpenAI login credential are required only for the original Codex image provider.
