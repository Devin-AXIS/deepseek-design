import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../core/dist/tokenSlug.js
function slugify(name) {
  const collapsed = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  let start = 0;
  let end = collapsed.length;
  while (start < end && collapsed[start] === "-")
    start++;
  while (end > start && collapsed[end - 1] === "-")
    end--;
  const slug = collapsed.slice(start, end);
  return slug.length > 0 ? slug : "node";
}
function cssVariableName(id) {
  return `--${slugify(id)}`;
}

export {
  slugify,
  cssVariableName
};
