import assert from 'node:assert/strict';
import test from 'node:test';
import { createTemplateSources } from '../packages/studio-core/src/template-sources.ts';
import { listSourceTemplates, applyLibraryTemplate } from '../packages/studio-core/src/template-library-client.ts';
import type { DesignTemplateSource } from '../packages/studio-core/src/template-library-types.ts';

const source: DesignTemplateSource = {
  id: 'organization', title: 'Organization templates',
  list: async () => [{ id: 'organization.team.template', title: 'Quarterly update', description: 'Team presentation', version: '1.0.0', sourceName: 'Team' }],
  read: async () => '<main>Team content</main>',
};
test('Design template sources release their entries and cannot impersonate built-in templates', async () => {
  const registry = createTemplateSources();
  const release = registry.register(source);
  assert.equal(registry.getSnapshot()[0], source);
  assert.equal((await listSourceTemplates(source))[0]?.manifest.id, 'organization.team.template');
  await assert.rejects(listSourceTemplates({ ...source, list: async () => [{ id: 'stock.slides', title: 'Wrong namespace', description: 'Not allowed', version: '1.0.0', sourceName: 'Team' }] }));
  release();
  assert.equal(registry.getSnapshot().length, 0);
});
test('revoked template access produces no workspace writes; allowed use creates and revision-checks a separate HTML document', async () => {
  const original = globalThis.fetch;
  const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { href: 'http://localhost/' } } });
  const writes: object[] = [];
  globalThis.fetch = async (input, options) => {
    const url = String(input);
    if (url.endsWith('/bootstrap')) return Response.json({ token: 'x'.repeat(43) });
    if (url.includes('/api/document')) return Response.json({ entry: 'design/session/new.html' });
    if (options?.method === 'POST') { writes.push(JSON.parse(String(options.body))); return Response.json({ ok: true }); }
    return Response.json({ content: '<main></main>', updatedAt: 123 });
  };
  try {
    await assert.rejects(applyLibraryTemplate('design', 'workspace', 'session', 'organization.team.template', { ...source, read: async () => { throw Error('RESOURCE_FORBIDDEN'); } }, '1.0.0'));
    assert.equal(writes.length, 0);
    await applyLibraryTemplate('design', 'workspace', 'session', 'organization.team.template', source, '1.0.0');
    assert.deepEqual(writes, [{ workspaceId: 'workspace', sessionId: 'session', path: 'design/session/new.html', content: '<main>Team content</main>', baseUpdatedAt: 123 }]);
  } finally {
    globalThis.fetch = original;
    if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
