# Beta.10 DSH peer dependencies

The beta.9 archives declared six `@deepseek-ai/dsh-*` packages as regular dependencies pinned to 0.2.2-rc.2. Installation placed those copies in the profile. On DSH 0.2.2-rc.3, startup checked the base `workspace`, `tools` and `agent` rows against the rc.2 copies, disabled them, and failed. This happened in a disposable profile with only Design and Video installed. Beta.10 declares these packages as peers in the `engines.dsh` range, and the payload check rejects regular `@deepseek-ai/dsh-*` dependencies.

`npm run check` passes. A temporary regular `@deepseek-ai/dsh-tools` dependency makes the payload check fail. On DSH 0.2.2-rc.3, `dsh plugin add` installed the beta.10 archives into three disposable profiles: Design only, Video only, and both. Each install registered its bundles and left no `@deepseek-ai/dsh-*` package in the profile. All three profiles started without compatibility warnings, and every installed editor opened from its navigation panel. Model requests, history and save flows were not exercised, and the active user profile was not changed.

## Beta.9 Video AI submission

`npm run check` passes with 86 focused tests. Real Cordis contexts reproduce the rejected direct dependency access and verify that scoped lookup retains the target session, waits for native admission, and forwards failures. Design-only and Video-only archives install independently. The combined installed-browser flow passes the existing editor, history, selected-label and preview-lifetime checks.

A manual replay with the local adapter in `tests/browser/ai-fixture.overlay.yml` sent an instruction from the Video workbench into its native DSH conversation and received `VIDEO_AI_FIXTURE_ACCEPTED`. This verifies the AI handoff without invoking paid models or generating media. The fixture is excluded from both shipped packages and must only be loaded in a disposable profile.

The active `ipw-visual` profile and suite catalog were updated to the final beta.9 archives. All 133 backed-up Video project text files remained byte-identical during the update. The suite's existing skin is retained.

## Beta.8 app history and active-profile update

`npm run check` passes with 83 focused tests. Both archives install independently in disposable DSH profiles. The combined installed-browser flow verifies website history, app history after reload, V1/V2 switching, the 390px version menu, editable text persistence, native selected-element labels and the Video workbench.

The user-authorized `ipw-visual` profile was backed up and upgraded from beta.3 to beta.8 through its installed DSH launcher. Manual inspection of the existing App project confirms the right-sidebar V1 dropdown opens and AI edit inserts only a removable element label. The current project HTML remains byte-identical to its backup. This project has no pre-upgrade history files; future admitted user-message batches create snapshots. The suite catalog now carries the same checked archives.

## Beta.7 selected-element labels

The complete build, type, source, package and 81-test check passes. Design-only, Video-only and combined archive installation pass. The installed native browser flow verifies that AI edit shows a removable element label, retains existing typed instructions and removes only the label when dismissed. Manual inspection also verifies the compact display and 390px layout. The serialized context retains the file and CSS locator; no paid model request was submitted.

## Beta.6 maintenance verification

`npm run check` passes on Node 25.8.1: both native builds, separate Host/Client/test typechecks, 78 focused tests, package payload checks, dependency checks and source hashes. The source inventory retains 1,909 captured files and 82 explicit adaptations. The isolated real-component browser suite passes all five regressions: synchronized version selection with stale responses and unsaved drafts, initial HTML error/retry, pending theme-save flush on unmount, external-write conflict protection, and repeated saves after delayed reads.

Host tests cover user-message batch snapshots, same-turn follow-ups, idempotent retries, revision-checked saves, create-only conflicts, deleted files, read-only template catalogs, lazy video workers, unfinished-job recovery, authenticated assets, workspace isolation and request draining. The runtime cache's integration check reports `rebuilt: false` immediately after the successful clean runtime rebuild. Its seven tests cover changed inputs/outputs, failed builds and generated source exclusions.

The beta.6 archives passed Design-only, Video-only and combined installation in disposable DSH profiles. The installed-browser test verified deferred renderer loading, text editing, file persistence, V1/V2 selection, refresh/reopen, the 390px version menu and the original Video workbench. All test workspaces are rooted below the disposable profile home. Manual inspection also verified Design in light/dark themes and Video playback in dark mode. A ready-preview regression starts the packaged CLI and verifies that disposing its owner stops the actual server process; the installed-browser smoke also checks that the preview endpoint disappears after Host shutdown. The active user profile was not upgraded.

## Payload measurements

| Surface | Beta.5 | Beta.6 |
| --- | ---: | ---: |
| Design DSH registration script | 18,864,934 B | 25,291 B |
| Video DSH registration script | 17,470,651 B | 25,285 B |
| Design complete unpacked `lib` | 117,729,565 B | 115,779,945 B |
| Video complete unpacked `lib` | 118,369,722 B | 108,295,575 B |
| Design archive | 58,170,454 B | 57,693,455 B |
| Video archive | 51,882,735 B | 51,339,687 B |

The registration scripts now load separate ESM assets when the editor opens. Their reduction is not a claim that all renderer bytes disappeared or that interaction latency was benchmarked. Both packages retain their independent runtime payload. The 107 changed PNG covers have identical decoded pixels and save 9,154,928 uncompressed bytes; archive savings are smaller because the outer archive also compresses its contents.

## Beta.15 resource groups and shared key

`npm run check` passes with 98 focused tests, and `npm run test:browser` passes seven real-component regressions. Coverage includes catalog categories, MIME-selected image/video insertion, authenticated key writes without secret readback, and saving inserted content while retaining the original HTML.

Design-only and Video-only archive installation pass in disposable DSH profiles. The combined installed-browser flow verifies Element/Theme/Components, the three nested resource categories, a single key input, shared credential status in Video after saving from Design, light/dark rendering and the 390px inspector with native navigation closed. Existing editing, history, file actions, template navigation, Video and Design-uninstall checks remain part of the same smoke.

The local suite catalog and active `ipw-visual` preview use beta.15. All 446 pre-update HTML, CSS, JSON and Markdown files in the active workspace remain byte-identical after the update. Resource APIs in the active profile are not configured; catalog and acquisition behavior use local API fixtures rather than production services.

## Beta.16 service connections and artwork

`npm run check` passes with 99 focused tests, and `npm run test:browser` passes seven real-component regressions. Service tests cover a multi-field storage credential, required fields, unknown-field rejection, retained values during partial updates and presence-only responses. Both archives include their declared SVG artwork.

Design-only and Video-only archive installations pass. Combined installations pass both with the iPolloWork suite and without it: plugin pages contain no inline secret inputs, the suite opens its shared connection editor, and standalone plugins use native dialogs. Installed-browser checks save a resource Key and an Aliyun OSS field group in a disposable profile. Editing, file actions, version selection, templates, theme changes, 390px layout, Video and Design removal retain their existing regression checks.

The active `ipw-visual` preview and suite catalog use beta.16. Manual inspection confirms the global Service connections settings entry, grouped credential dialog and byte-identical artwork in the market and installed details. All 447 pre-update HTML, CSS, JSON and Markdown files in the active workspace remain byte-identical. No real provider credentials were entered during this verification.

## Scope

Paid image/video/voice/avatar generation and offline model execution require their own credentials or models and were not exercised. This maintenance pass retains the original PPTX export implementation; the earlier editable 38-slide export check was not repeated as a full PowerPoint compatibility review. Video retains its desktop multi-column workbench; full mobile usability is not accepted. Neither registry publication nor a production rollout is included.
