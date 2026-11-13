import test from "node:test";
import assert from "node:assert/strict";
import {
  QueuedDocumentSave,
  readOptionalDocument,
} from "../packages/studio-core/src/original/app/src/app/lib/queued-document-save.ts";

test("flush serializes overlapping edits against each acknowledged revision", async () => {
  let finish!: () => void;
  const first = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const calls: Array<{
    content: string;
    baseUpdatedAt?: number;
    createOnly?: true;
  }> = [];
  const writer = new QueuedDocumentSave(
    {
      read: async () => ({ content: "original", updatedAt: 10 }),
      write: async (input) => {
        calls.push(input);
        if (calls.length === 1) await first;
        return { updatedAt: 10 + calls.length };
      },
    },
    60_000,
  );
  writer.schedule("first edit");
  const flushing = writer.flush();
  await Promise.resolve();
  writer.schedule("latest edit");
  finish();
  await flushing;
  assert.deepEqual(calls, [
    { content: "first edit", baseUpdatedAt: 10 },
    { content: "latest edit", baseUpdatedAt: 11 },
  ]);
  assert.equal(writer.getSnapshot().pending, false);
  writer.acceptRemote({ content: "stale fetch", updatedAt: 10 });
  assert.equal(writer.getSnapshot().content, "latest edit");
  await writer.flush();
});

test("conflicting writes retain the latest draft and never overwrite with force", async () => {
  const inputs: unknown[] = [];
  const conflict = new Error("File changed since it was loaded.");
  const writer = new QueuedDocumentSave(
    {
      read: async () => ({ content: "original", updatedAt: 1 }),
      write: async (input) => {
        inputs.push(input);
        throw conflict;
      },
    },
    60_000,
  );
  writer.schedule("unsaved draft");
  await assert.rejects(writer.flush(), (error) => error === conflict);
  writer.acceptRemote({ content: "someone else's edit", updatedAt: 2 });
  assert.equal(writer.getSnapshot().content, "unsaved draft");
  assert.equal(writer.getSnapshot().pending, true);
  assert.deepEqual(inputs, [{ content: "unsaved draft", baseUpdatedAt: 1 }]);
});

test("a missing token file uses create-only while other read failures stop saving", async () => {
  const missing = Object.assign(new Error("Not found"), { status: 404 });
  assert.equal(
    await readOptionalDocument(async () => {
      throw missing;
    }),
    null,
  );
  const inputs: unknown[] = [];
  const writer = new QueuedDocumentSave(
    {
      read: async () => null,
      write: async (input) => {
        inputs.push(input);
        return { updatedAt: 1 };
      },
    },
    60_000,
  );
  writer.schedule("new tokens");
  await writer.flush();
  assert.deepEqual(inputs, [{ content: "new tokens", createOnly: true }]);
  const unavailable = new Error("Host unavailable");
  await assert.rejects(
    readOptionalDocument(async () => {
      throw unavailable;
    }),
    (error) => error === unavailable,
  );
});
