import test from "node:test";
import assert from "node:assert/strict";
import { Context } from "@deepseek-ai/cordis";
import {
  designFile,
  watchDesignFile,
} from "../packages/studio-core/src/design-connection.ts";

test("HTML association preserves native file addressing and leaves Video and other files alone", () => {
  assert.equal(
    designFile("dsh-resource://file/session/a/folder/my%20page.html")?.path,
    "folder/my page.html",
  );
  assert.equal(
    designFile("dsh-resource://file/session/a/video/session-a/index.html"),
    undefined,
  );
  assert.equal(
    designFile("dsh-resource://file/session/a/report.pdf"),
    undefined,
  );
  assert.equal(
    designFile("dsh-resource://file/absolute/tmp/a.html"),
    undefined,
  );
});

test("file revisions trigger one invalidation and releasing a view unsubscribes", () => {
  const events: string[] = [];
  let status = "live",
    version = "r1";
  let listener: (() => void) | undefined;
  const context = new Context().extend({
    resources: {
      source(address: string) {
        assert.equal(address, "dsh-resource://file/session/a/page.html");
        return {
          getSnapshot: () => ({
            status,
            value: { version, absolutePath: "/work/page.html" },
          }),
          subscribe(next: () => void) {
            listener = next;
            return () => {
              listener = undefined;
            };
          },
        };
      },
    },
  });
  const off = watchDesignFile(context, "a", "page.html", (event) =>
    events.push(event),
  );
  listener?.();
  assert.equal(events.filter((value) => value === "changed").length, 0);
  version = "r2";
  listener?.();
  assert.equal(events.filter((value) => value === "changed").length, 1);
  status = "failed";
  listener?.();
  assert.equal(events.at(-1), "unavailable");
  off();
  assert.equal(listener, undefined);
});
