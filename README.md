# DeepSeek Design and Video

独立维护的两个原生 DeepSeek Harness 插件：**Design（包含 PPT）** 与 **Video**。仓库保存可构建的插件源码、原版编辑器、设计系统、模板和运行资源。

编辑器直接挂载到 DSH 原生界面。运行和构建均不需要原 iPolloWork 仓库、桌面应用或后台服务。原版 HTML 预览与 HyperFrames 工作台保留自身的文档渲染容器。

## 插件与源码

| 插件 | 源码目录 | 能力 |
| --- | --- | --- |
| `deepseek-idesign` | [`packages/deepseek-design`](packages/deepseek-design) | Design、PPT、画布、属性编辑、主题、模板和导出 |
| `deepseek-ivideo` | [`packages/deepseek-video`](packages/deepseek-video) | 原版 Video 工作台、脚本、时间轴、预览和媒体服务 |
| 共享源码 | [`packages/studio-core`](packages/studio-core) | 原版组件、设计系统、宿主适配、资源 API 和模板 |
| 视频运行时 | [`vendor/hyperframes`](vendor/hyperframes) | 随插件构建和分发的 HyperFrames 源码 |

PPT 已包含在 Design 中。旧的 `deepseek-ippt` 和 `source/plugins` 镜像目录不再作为维护入口。修改直接提交到这个仓库，不再回传原应用后等待同步。

## 构建与安装

需要 Node.js 24.9+、npm、Bun 1.3.13，以及 DSH `0.2.2-rc.2`。

```sh
git clone https://github.com/Devin-AXIS/deepseek-design.git
cd deepseek-design
npm ci --ignore-scripts
npm run check
npm run pack:plugins

dsh plugin --profile web add ./artifacts/deepseek-idesign-1.0.0-beta.4.tgz
dsh plugin --profile web add ./artifacts/deepseek-ivideo-1.0.0-beta.4.tgz
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
| `componentCredential`, `assetCredential` | empty | DSH credential record keys; tokens stay on the host |
| `requestTimeoutMs` | `20000` | Request timeout |
| `maxResourceBytes` | `50000000` | Download limit |
| `maxLocalMediaBytes` | `524288000` | Local media upload/read limit, preserving the original 500 MB enhancement input |
| `serviceCredentials` | `{}` | Original service id → DSH credential record or environment credential reference |
| `enhancementModelsPath` | empty | Offline speech/vision model directory |
| `ffmpegPath`, `ffprobePath` | empty | Optional local media executable paths |

Native service settings are available in each plugin’s settings page. API secrets stay in DSH credentials. Provider ids include `openai-images`, `openai-browser`, `fal-images`, `aliyun-bailian`, `volcengine-video`, `runninghub-video`, `heygen-video` and the original storage providers. The original publishing, voice, avatar, generation, media workbench and enhancement controls call locally owned service implementations. Providers still require their own credentials. HeyGen subscription login is not connected to DSH; use its API-key mode.

Resources are acquired into the original project folder with stable source/version/content identifiers. Resource style is separate from the original design theme. Missing APIs report a configuration error. Existing design tokens are preserved.

## Development

Requires Node 24.9+, npm and Bun 1.3.13.

```sh
npm ci --ignore-scripts
npm run check
npm run pack:plugins
```

The first build compiles the pinned HyperFrames source. Run `npm run build:runtime` after runtime changes. Shared CI checks both packages and independent/combined native-host installs. `npm run check` covers builds, TypeScript, focused resource/lifecycle tests and package contents; it does not establish visual acceptance of every original workflow.

## License

The extracted source retains the iPolloWork Source Available License. HyperFrames and other dependencies retain their notices. See [LICENSE](LICENSE), [LICENSES](LICENSES) and [HyperFrames license](vendor/hyperframes/LICENSE).

Offline enhancement models are provisioned separately: run `npm run prepare:models`, then set `enhancementModelsPath` to this repository’s `.runtime/models` directory. The installer downloads the original pinned model revisions and notices; inference does not download models. A local Codex runtime and an OpenAI login credential are required only for the original Codex image provider.
