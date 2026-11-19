import type { DesignTemplateSource, DesignTemplateSources } from './template-library-types.ts';

/** A client-only registry owned by the Design plugin lifetime. */
export function createTemplateSources(): DesignTemplateSources {
  let sources: readonly DesignTemplateSource[] = [];
  const listeners = new Set<() => void>();
  const changed = () => { for (const listener of listeners) listener(); };
  return {
    getSnapshot: () => sources,
    subscribe(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    register(source) {
      if (!/^[a-z][a-z0-9-]*$/.test(source.id) || sources.some(item => item.id === source.id))
        throw Error('Duplicate or invalid Design template source.');
      sources = [...sources, source]; changed();
      return () => { sources = sources.filter(item => item !== source); changed(); };
    },
  };
}
