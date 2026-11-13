# Beta.8 app history and active-profile update

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

## Scope

Paid image/video/voice/avatar generation and offline model execution require their own credentials or models and were not exercised. This maintenance pass retains the original PPTX export implementation; the earlier editable 38-slide export check was not repeated as a full PowerPoint compatibility review. Video retains its desktop multi-column workbench; full mobile usability is not accepted. Neither registry publication nor a production rollout is included.
