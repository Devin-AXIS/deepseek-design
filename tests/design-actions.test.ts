import test from "node:test";
import assert from "node:assert/strict";
import { designResultFiles } from "../packages/studio-core/src/design-actions.tsx";
test("file actions use recorded HTML outputs once and leave videos and history files alone", () => {
  assert.deepEqual(designResultFiles({ produced: [{path:"pages/a.html"},{path:"video/clip/index.html"},{path:"design/.versions/a.html"}], presented:[{path:"pages/a.html"},{path:"pages/b.htm"},{path:"photo.png"}] }), ["pages/a.html","pages/b.htm"]);
  assert.deepEqual(designResultFiles(undefined), []);
});
