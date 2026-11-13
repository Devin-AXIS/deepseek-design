# Beta.6 maintenance verification

`npm run check` passes on Node 25.8.1: both native builds, separate Host/Client/test typechecks, 74 focused tests, package payload checks, dependency checks and source hashes. The source inventory retains 1,909 captured files and 82 explicit adaptations. The isolated real-component browser suite passes all three regressions: synchronized version selection with stale responses and unsaved drafts, initial HTML error/retry, and pending theme-save flush on unmount.

Host tests cover user-message batch snapshots, same-turn follow-ups, idempotent retries, revision-checked saves, create-only conflicts, deleted files, read-only template catalogs, lazy video workers, unfinished-job recovery, authenticated assets, workspace isolation and request draining. The runtime cache's integration check reports `rebuilt: false` immediately after the successful clean runtime rebuild. Its seven tests cover changed inputs/outputs, failed builds and generated source exclusions.

The beta.6 archives passed Design-only, Video-only and combined installation in disposable DSH profiles. The installed-browser test verified deferred renderer loading, text editing, file persistence, V1/V2 selection, refresh/reopen, the 390px version menu and the original Video workbench. All test workspaces are rooted below the disposable profile home. Manual inspection also verified Design in light/dark themes and Video playback in dark mode. The active user profile was not upgraded.

## Payload measurements

| Surface | Beta.5 | Beta.6 |
| --- | ---: | ---: |
| Design DSH registration script | 18,864,934 B | 25,291 B |
| Video DSH registration script | 17,470,651 B | 25,285 B |
| Design complete unpacked `lib` | 117,729,565 B | 115,778,051 B |
| Video complete unpacked `lib` | 118,369,722 B | 108,294,599 B |
| Design archive | 58,170,454 B | 57,692,907 B |
| Video archive | 51,882,735 B | 51,339,369 B |

The registration scripts now load separate ESM assets when the editor opens. Their reduction is not a claim that all renderer bytes disappeared or that interaction latency was benchmarked. Both packages retain their independent runtime payload. The 107 changed PNG covers have identical decoded pixels and save 9,154,928 uncompressed bytes; archive savings are smaller because the outer archive also compresses its contents.

## Scope

Paid image/video/voice/avatar generation and offline model execution require their own credentials or models and were not exercised. This maintenance pass retains the original PPTX export implementation; the earlier editable 38-slide export check was not repeated as a full PowerPoint compatibility review. Video retains its desktop multi-column workbench; full mobile usability is not accepted. Neither registry publication nor a production rollout is included.
