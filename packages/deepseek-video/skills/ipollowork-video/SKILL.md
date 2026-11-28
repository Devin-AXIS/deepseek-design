---
name: ipollowork-video
description: Produce, edit or review a complete video in the iPolloWork Video workbench. Use for original videos, repairs to an existing composition, editing a template, or adapting a reference into editable motion.
---

# Video production

Open the correct project with `video_open`. Work from the actual composition, assets, storyboard and selected template. Keep existing HTML, component and theme contracts. For a local revision, identify the affected scene and file, preserve unrelated layers and timing, and reread before writing if someone edited the source.

## Choose the starting material

- For a selected editable template, use the applied project and its existing animation, layout, theme tokens, assets and timing. Replace the content requested by the user. Check any crop or reading-time change against the affected motion and audio.
- For original work, plan the whole film around the intended audience and story. Use the storyboard for shots, text, narration, media requirements and approximate timing. Derive final timing from approved material and actual audio duration. Build picture and sound on the native timeline.
- For a video reference, work from a local file in the current project's `assets/` directory. Use the user's own content and supplied materials for the new film.

## Rebuild motion from evidence

1. Run `ipollowork_video_reference` with `probe`, then `cuts` and `events`. Read the entire reference in short windows. Cuts and events flag times to inspect. Inspect the frames immediately before and after each major cut and the key states between them. Use `frames` with actual timestamps and inspect the returned PNGs using `read_image` when the active model supports images. For audio, use the supplied source and any available playback or onset evidence.
2. Identify the difficult shot and the visible action that makes it work. Record the moving object, start and end geometry, when neighbouring elements react, settled state, and the corresponding sound event. Use `curve` with a region isolating the move, `look` for background and colour placement, and `ink` for text bounds. Keep estimates distinct from direct observations.
3. Build the hard shot first with editable text, compositions, media and animation parameters wherever those represent the visible action. Play it and inspect representative frames before extending the method to the rest of the film. Keep independent images, narration and music editable as separate assets and tracks.
4. Reuse verified components and project style in the full sequence. Verify real runtime playback with `video_preview_check` through `ipollowork_video_action`, including cuts, text layout, action and sound timing, and the effect of the user's actual replacements.

## Review and deliver

Leave an editable native project. If a user asks for an MP4, render the saved composition through `ipollowork_video_action`, and poll the same operation until it finishes. When comparing to a reference, rerun `frames` or `curve` with the actual render as `comparisonPath`. Check before, during and after the same visual events. Recheck affected timestamps after editing. Report the specific remaining differences and any sound or playback that could not be observed.

## Motion references

When a MOTION.md brief is provided, use the current project's reference only as evidence. Measure shot boundaries, movement, color, text and audio with `ipollowork_video_reference`; open the resulting evidence frames. Record timings, transitions and asset roles in the brief. Author editable layers with the user's brand assets, preserve unrelated files, validate the composition and compare matching frame times and audio in the exported MP4. Do not report a completed reconstruction for a video which was only imported as a reference.
