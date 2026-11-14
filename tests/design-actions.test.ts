import test from "node:test";
import assert from "node:assert/strict";
import {
  designPresentedPath,
  designResultFiles,
} from "../packages/studio-core/src/design-actions.tsx";

test("native HTML cards own their actions without duplicate file rows", () => {
  assert.deepEqual(
    designResultFiles({
      produced: [
        { path: "pages/a.html" },
        { path: "pages/b.htm" },
        { path: "video/clip/index.html" },
        { path: "design/.versions/a.html" },
      ],
      presented: [{ path: "pages/a.html" }, { path: "photo.png" }],
    }),
    ["pages/b.htm"],
  );
  assert.deepEqual(designResultFiles(undefined), []);
});

test("file card actions resolve only their recorded HTML and Session", () => {
  const entries = [
    {
      type: "event",
      event: {
        type: "deliverables/presented",
        seq: 42,
        data: {
          files: [
            { path: "pages/a.html" },
            { path: "image.png" },
            { path: "video/a.html" },
          ],
        },
      },
    },
  ];
  const address = "api/present.open?sessionId=session&seq=42&index=0";
  assert.equal(
    designPresentedPath(address, "session", entries),
    "pages/a.html",
  );
  assert.equal(
    designPresentedPath(address, "other-session", entries),
    undefined,
  );
  assert.equal(
    designPresentedPath(
      address.replace("index=0", "index=1"),
      "session",
      entries,
    ),
    undefined,
  );
  assert.equal(
    designPresentedPath(
      address.replace("index=0", "index=2"),
      "session",
      entries,
    ),
    undefined,
  );
  assert.equal(
    designPresentedPath(
      address.replace("seq=42", "seq=41"),
      "session",
      entries,
    ),
    undefined,
  );
  assert.equal(
    designPresentedPath(
      address.replace("present.open", "changes.open"),
      "session",
      entries,
    ),
    undefined,
  );
});
