import test from "node:test";
import assert from "node:assert/strict";
import {
  listStudioFontFamilies,
  pickStudioImage,
} from "../packages/studio-core/src/original/app/src/app/lib/studio-platform.ts";

test("local font access uses the browser API without an application bridge", async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  try {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {},
    });
    assert.deepEqual(await listStudioFontFamilies(), []);
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        queryLocalFonts: async () => [
          { family: "Zeta" },
          { family: "Alpha" },
          { family: "Alpha" },
        ],
      },
    });
    assert.deepEqual(await listStudioFontFamilies(), ["Alpha", "Zeta"]);
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        queryLocalFonts: async () => {
          throw new DOMException("Denied", "NotAllowedError");
        },
      },
    });
    await assert.rejects(listStudioFontFamilies(), { name: "NotAllowedError" });
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

test("browser image selection reads the selected file and removes its temporary input", async () => {
  const descriptors = ["document", "FileReader"].map(
    (key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const,
  );
  let mode: "selected" | "cancel" | "error" = "selected";
  let removed = 0;
  let selected: File | undefined;
  class Input extends EventTarget {
    type = "";
    accept = "";
    hidden = false;
    files = [new File(["image"], "sample.png", { type: "image/png" })];
    click() {
      this.dispatchEvent(new Event(mode === "cancel" ? "cancel" : "change"));
    }
    remove() {
      removed++;
    }
  }
  class Reader {
    result = "data:image/png;base64,aW1hZ2U=";
    error = new DOMException("File could not be read", "NotReadableError");
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    readAsDataURL(file: File) {
      selected = file;
      if (mode === "error") this.onerror?.();
      else this.onload?.();
    }
  }
  try {
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: {
        createElement: (tag: string) => {
          assert.equal(tag, "input");
          return new Input();
        },
        body: {
          append: (input: Input) => {
            assert.equal(input.type, "file");
            assert.match(input.accept, /image\/png/);
          },
        },
      },
    });
    Object.defineProperty(globalThis, "FileReader", {
      configurable: true,
      value: Reader,
    });
    assert.equal(await pickStudioImage(), "data:image/png;base64,aW1hZ2U=");
    assert.equal(selected?.name, "sample.png");
    assert.equal(removed, 1);
    mode = "cancel";
    assert.equal(await pickStudioImage(), null);
    assert.equal(removed, 2);
    mode = "error";
    await assert.rejects(pickStudioImage(), { name: "NotReadableError" });
    assert.equal(removed, 3);
  } finally {
    for (const [key, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});
