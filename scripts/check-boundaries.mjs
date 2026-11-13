/** Enforce separately owned Host and browser dependency graphs. */
import ts from "typescript";
import { builtinModules } from "node:module";
import { resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

export const hostRoots = [
  "packages/deepseek-design/src/index.ts",
  "packages/deepseek-video/src/index.ts",
  "packages/deepseek-video/src/runtime.ts",
  "packages/deepseek-video/src/preview-owner-guard.ts",
  "packages/studio-core/src/original/apps/server/src/extensions/video-enhancement-worker.ts",
];
export const clientRoots = [
  "packages/deepseek-design/src/client.tsx",
  "packages/deepseek-video/src/client.tsx",
  "packages/deepseek-design/studio/src/native.tsx",
  "packages/deepseek-video/studio/src/native.tsx",
  "packages/studio-core/src/original/ui/src/plugin/runtime.ts",
];
const builtins = new Set(
  builtinModules.flatMap((name) => [name, `node:${name}`]),
);
const oldApplication =
  /(?:^|\/)(?:ipollowork-server|opencode|desktop|den|deep-link-bridge|engine-host-tools|runtime-opencode-config-store)\.[cm]?[jt]sx?$/;

/** Read import edges without mistaking type-only references for executable imports. */
export function sourceImports(source) {
  const imports = [];
  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const clause = ts.isImportDeclaration(node) ? node.importClause : node;
      const bindings = clause?.namedBindings ?? clause?.exportClause;
      const elements =
        bindings && (ts.isNamedImports(bindings) || ts.isNamedExports(bindings))
          ? bindings.elements
          : undefined;
      const typeOnly =
        !!clause?.isTypeOnly ||
        !!(
          elements?.length &&
          elements.every((entry) => entry.isTypeOnly) &&
          !clause?.name
        );
      imports.push({ specifier: node.moduleSpecifier.text, typeOnly });
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) &&
          node.expression.text === "require")) &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      imports.push({ specifier: node.arguments[0].text, typeOnly: false });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return imports;
}

/** Reject browser/Host mixing and dependencies on the former application entrypoints. */
export function assertAllowedImport(face, owner, specifier, target) {
  if (isAbsolute(specifier))
    throw Error(`${owner}: absolute source import ${specifier}`);
  if (target && oldApplication.test(target.replaceAll("\\", "/")))
    throw Error(`${owner}: former application dependency ${target}`);
  if (
    face === "client" &&
    (builtins.has(specifier) ||
      target?.replaceAll("\\", "/").includes("/original/apps/server/"))
  )
    throw Error(`${owner}: browser imports Host module ${specifier}`);
  if (
    face === "host" &&
    target &&
    (/\.tsx$/.test(target) ||
      /\/original\/(?:app|ui)\//.test(target.replaceAll("\\", "/")))
  )
    throw Error(`${owner}: Host imports browser module ${specifier}`);
}

/** Resolve a face's executable source closure using the same aliases as its compiler. */
export function inspectFace(face, root = process.cwd()) {
  const file = ts.readConfigFile(
    resolve(
      root,
      face === "host" ? "tsconfig.host.json" : "tsconfig.studio.json",
    ),
    ts.sys.readFile,
  );
  if (file.error)
    throw Error(ts.flattenDiagnosticMessageText(file.error.messageText, "\n"));
  const { options } = ts.parseJsonConfigFileContent(file.config, ts.sys, root);
  const pending = (face === "host" ? hostRoots : clientRoots).map((path) =>
    resolve(root, path),
  );
  const visited = new Set();
  const external = new Set();
  while (pending.length) {
    const filename = pending.pop();
    if (visited.has(filename) || filename.endsWith(".d.ts")) continue;
    visited.add(filename);
    const text = ts.sys.readFile(filename);
    if (text === undefined) throw Error(`Missing ${face} source: ${filename}`);
    const source = ts.createSourceFile(
      filename,
      text,
      ts.ScriptTarget.Latest,
      true,
    );
    for (const { specifier, typeOnly } of sourceImports(source)) {
      if (typeOnly) continue;
      const resolved = ts.resolveModuleName(
        specifier,
        filename,
        options,
        ts.sys,
      ).resolvedModule;
      const target = resolved?.resolvedFileName;
      if (
        !target &&
        (specifier.startsWith(".") || specifier.startsWith("@/")) &&
        !/\.(?:css|svg|png|woff2?)(?:\?.*)?$/.test(specifier)
      )
        throw Error(`${filename}: unresolved local import ${specifier}`);
      if (
        target &&
        relative(root, target).replaceAll("\\", "/").startsWith("../") &&
        specifier.startsWith(".")
      )
        throw Error(
          `${filename}: import escapes this repository: ${specifier}`,
        );
      const local =
        target &&
        !target.includes("node_modules") &&
        relative(root, target).replaceAll("\\", "/").startsWith("packages/");
      assertAllowedImport(
        face,
        relative(root, filename),
        specifier,
        local ? target : undefined,
      );
      if (local) pending.push(target);
      else if (!specifier.startsWith(".") && !specifier.startsWith("@/"))
        external.add(specifier);
    }
  }
  return {
    files: [...visited].map((path) => relative(root, path)).sort(),
    external: [...external].sort(),
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  for (const face of ["host", "client"]) {
    const result = inspectFace(face);
    console.log(
      `${face}: ${result.files.length} executable source files; dependency boundaries passed`,
    );
  }
}
