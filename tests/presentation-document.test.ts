import test from "node:test";
import assert from "node:assert/strict";
import { isPresentationDocument } from "../packages/studio-core/src/presentation-document.ts";
import { buildDesignPreviewDocument } from "../packages/studio-core/src/original/app/src/react-app/domains/session/design/design-html-runtime.ts";

test("plain slide decks are recognized without a template while websites keep their own interactions", () => {
  assert.equal(isPresentationDocument('<main id="stage"><section class="slide active">One</section><section class="slide">Two</section></main>'), true);
  assert.equal(isPresentationDocument('<section class="slide">One</section><section class="slide">Two</section>'), true);
  assert.equal(isPresentationDocument('<main data-ipw-template-kind="slides"><section>One</section></main>'), true);
  for (const html of ['<h1>Website</h1><section>Intro</section>', '<main class="carousel"><div class="slide">Photo</div><div class="slide">Photo</div></main>', '<script>const html = \'<div data-ipw-slide>\'</script>', '<!-- <div data-ipw-slide> -->'])
    assert.equal(isPresentationDocument(html), false);
});

test("all presentation previews use the shared controller, without rewriting the saved document", () => {
  const source = '<body><div id="stage"><section class="slide">One</section><section class="slide">Two</section></div></body>';
  const output = buildDesignPreviewDocument(source, true, "", false, false, true, "frame");
  assert.match(output, /ipollowork-design-deck-runtime/);
  assert.match(output, /\)\("ipollowork-design-html-v1",true,"frame"\)/);
  assert.ok(output.includes(source.slice(0, -7)));
  assert.ok(!buildDesignPreviewDocument(source, true).includes('id="ipollowork-design-deck-runtime"'));
});
