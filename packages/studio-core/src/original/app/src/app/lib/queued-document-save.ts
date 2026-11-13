/** Serialize debounced document writes without losing drafts when an editor unmounts. */
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

export type DocumentRevision = { content: string; updatedAt: number };
export type DocumentWriteResult = { updatedAt: number };
export type DocumentWriter = {
  read(): Promise<DocumentRevision | null>;
  write(input: {
    content: string;
    baseUpdatedAt?: number;
    createOnly?: true;
  }): Promise<DocumentWriteResult>;
};
export type DocumentSaveState = {
  content: string | undefined;
  pending: boolean;
  saving: boolean;
  error: Error | null;
  updatedAt?: number;
};

/** Missing files are explicit create-only writes; other read failures must stop the save. */
export async function readOptionalDocument(
  read: () => Promise<DocumentRevision>,
): Promise<DocumentRevision | null> {
  try {
    return await read();
  } catch (error) {
    if (error instanceof Error && "status" in error && error.status === 404)
      return null;
    throw error;
  }
}

/** One writer owns the latest draft and revision for one workspace file. */
export class QueuedDocumentSave {
  private state: DocumentSaveState = {
    content: undefined,
    pending: false,
    saving: false,
    error: null,
  };
  private base: DocumentRevision | null | undefined;
  private pending: string | undefined;
  private active: Promise<DocumentWriteResult | undefined> | undefined;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private editRevision = 0;
  private listeners = new Set<() => void>();
  constructor(
    private readonly writer: DocumentWriter,
    private readonly delayMs = 350,
  ) {}
  getSnapshot = () => this.state;
  getEditRevision = () => this.editRevision;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  private publish(patch: Partial<DocumentSaveState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((listener) => listener());
  }
  /** A fetch cannot replace an unsaved draft or roll back a newer acknowledged revision. */
  acceptRemote(value: DocumentRevision | null) {
    if (this.pending !== undefined || this.active) return;
    if (value && this.base && value.updatedAt < this.base.updatedAt) return;
    this.base = value;
    this.publish({
      content: value?.content ?? "",
      updatedAt: value?.updatedAt,
      error: null,
    });
  }
  schedule = (content: string) => {
    this.editRevision++;
    this.pending = content;
    this.publish({ content, pending: true, error: null });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      void this.flush().catch(() => undefined);
    }, this.delayMs);
  };
  /** Flush the newest draft; failures retain it and the original revision for recovery. */
  flush = (): Promise<DocumentWriteResult | undefined> => {
    clearTimeout(this.timer);
    this.timer = undefined;
    if (this.active) return this.active;
    if (this.pending === undefined)
      return Promise.resolve(this.base ?? undefined);
    this.publish({ saving: true, error: null });
    this.active = this.drain().finally(() => {
      this.active = undefined;
      this.publish({ saving: false });
    });
    return this.active;
  };
  private async drain(): Promise<DocumentWriteResult | undefined> {
    let result: DocumentWriteResult | undefined;
    try {
      if (this.base === undefined) this.base = await this.writer.read();
      while (this.pending !== undefined) {
        const content = this.pending;
        result = await this.writer.write({
          content,
          ...(this.base
            ? { baseUpdatedAt: this.base.updatedAt }
            : { createOnly: true }),
        });
        this.base = { content, updatedAt: result.updatedAt };
        if (this.pending === content) this.pending = undefined;
        this.publish({
          pending: this.pending !== undefined,
          updatedAt: result.updatedAt,
          error: null,
        });
      }
      return result;
    } catch (reason) {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));
      this.publish({ error, pending: true });
      throw error;
    }
  }
  /** Queue an immediate revision-checked write, including safe rollback writes. */
  save = async (content: string) => {
    this.schedule(content);
    return this.flush();
  };
  /** Discard a failed draft only after the caller obtains explicit user confirmation. */
  reload = async () => {
    const revision = this.editRevision;
    clearTimeout(this.timer);
    await this.active?.catch(() => undefined);
    const remote = await this.writer.read();
    if (revision !== this.editRevision)
      throw new Error(
        "The draft changed while reloading. Retry after editing finishes.",
      );
    this.pending = undefined;
    this.base = remote;
    this.publish({
      content: remote?.content ?? "",
      updatedAt: remote?.updatedAt,
      pending: false,
      error: null,
    });
  };
}

const documents = new Map<
  string,
  { value: QueuedDocumentSave; users: number }
>();
/** Share write order across simultaneous views; keep failed drafts available after navigation. */
export function useQueuedDocumentSave(
  key: string | null,
  writer: DocumentWriter,
  onError: (error: Error) => void,
) {
  const latestWriter = useRef(writer);
  latestWriter.current = writer;
  const latestError = useRef(onError);
  latestError.current = onError;
  const entry = useMemo(() => {
    if (!key) return { value: new QueuedDocumentSave(writer), users: 0 };
    let shared = documents.get(key);
    if (!shared) {
      shared = {
        value: new QueuedDocumentSave({
          read: () => latestWriter.current.read(),
          write: (input) => latestWriter.current.write(input),
        }),
        users: 0,
      };
      documents.set(key, shared);
    }
    return shared;
  }, [key]);
  const state = useSyncExternalStore(
    entry.value.subscribe,
    entry.value.getSnapshot,
    entry.value.getSnapshot,
  );
  useEffect(() => {
    if (state.error) latestError.current(state.error);
  }, [state.error]);
  useEffect(() => {
    entry.users++;
    const flush = () => {
      void entry.value.flush().catch(() => undefined);
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      entry.users--;
      void entry.value
        .flush()
        .catch(() => undefined)
        .finally(() => {
          if (
            key &&
            entry.users === 0 &&
            !entry.value.getSnapshot().pending &&
            documents.get(key) === entry
          )
            documents.delete(key);
        });
    };
  }, [entry, key]);
  return { value: entry.value, state };
}
