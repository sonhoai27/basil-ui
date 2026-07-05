#!/usr/bin/env node
// Build a shadcn-compatible registry from Basil sources.
//
// Reads every component/lib source under src/components/{ui,domain} + src/lib and
// emits, for each, a shadcn registry-item JSON at registry/r/<name>.json.
// Also emits the top-level registry index at registry.json.
//
// - `name`               = the file basename without extension (e.g. data-table)
// - `dependencies`       = external npm packages the file imports (bare specifiers)
// - `registryDependencies` = other Basil items the file imports (relative specifiers
//                            → their basename, which is the item name)
//
// Robust by design: skips *.stories.* and *.test.* files, tolerates missing dirs.

import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const REGISTRY_DIR = path.join(ROOT, 'registry');
const ITEMS_DIR = path.join(REGISTRY_DIR, 'r');

// Source folders to scan, relative to src/.
const SCAN_DIRS = ['components/ui', 'components/domain', 'lib'];

const ITEM_TYPE = 'registry:ui';

/** True for source files we want to emit as registry items. */
function isSource(file) {
  if (!/\.(tsx?|jsx?)$/.test(file)) return false;
  if (/\.stories\./.test(file)) return false;
  if (/\.test\./.test(file)) return false;
  if (/\.d\.ts$/.test(file)) return false;
  return true;
}

/** The registry item name for a source file = its basename without extension. */
function itemName(file) {
  return path.basename(file).replace(/\.(tsx?|jsx?)$/, '');
}

/**
 * Extract all import/export-from specifiers from source text.
 * Matches: import ... from 'x', export ... from 'x', and bare `import 'x'`.
 */
function extractSpecifiers(code) {
  const specs = new Set();
  const re = /(?:import|export)\b[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const spec = m[1] ?? m[2];
    if (spec) specs.add(spec);
  }
  return [...specs];
}

/** True for a relative/internal specifier (starts with . or /). */
function isInternal(spec) {
  return spec.startsWith('.') || spec.startsWith('/');
}

/**
 * Reduce a bare specifier to its installable npm package name.
 *   'lucide-react'            → 'lucide-react'
 *   '@radix-ui/react-dialog'  → '@radix-ui/react-dialog'
 *   'date-fns/format'         → 'date-fns'
 *   '@scope/pkg/sub'          → '@scope/pkg'
 */
function packageName(spec) {
  const parts = spec.split('/');
  if (spec.startsWith('@')) return parts.slice(0, 2).join('/');
  return parts[0];
}

// Peer deps that consumers already have — don't list them as item deps.
const PEER_DEPS = new Set(['react', 'react-dom', 'tailwindcss']);

async function main() {
  // Fresh items dir.
  await rm(ITEMS_DIR, { recursive: true, force: true });
  await mkdir(ITEMS_DIR, { recursive: true });

  const files = [];
  for (const dir of SCAN_DIRS) {
    const abs = path.join(SRC, dir);
    if (!existsSync(abs)) continue;
    for (const entry of await readdir(abs, { withFileTypes: true })) {
      if (entry.isFile() && isSource(entry.name)) {
        files.push({ dir, file: entry.name, abs: path.join(abs, entry.name) });
      }
    }
  }

  // Assign a unique item name per file. The name is the basename without
  // extension; when two files share a basename (e.g. ui/button + domain/button),
  // the non-ui one is folder-qualified (domain-button) so names stay unique and
  // registryDependencies resolve to the correct target.
  const baseCounts = new Map();
  for (const f of files) {
    const b = itemName(f.file);
    baseCounts.set(b, (baseCounts.get(b) ?? 0) + 1);
  }
  // Map absolute file path → assigned item name.
  const nameByPath = new Map();
  for (const f of files) {
    const base = itemName(f.file);
    const folder = path.basename(f.dir); // ui | domain | lib
    const name = baseCounts.get(base) > 1 && folder !== 'ui' ? `${folder}-${base}` : base;
    f.name = name;
    nameByPath.set(f.abs, name);
  }

  /**
   * Resolve an internal import specifier from `fromAbs` to the assigned item
   * name of the target file, or undefined if it doesn't map to an emitted item.
   */
  function resolveInternal(spec, fromAbs) {
    const base = path.resolve(path.dirname(fromAbs), spec);
    const candidates = [
      base,
      `${base}.tsx`,
      `${base}.ts`,
      `${base}.jsx`,
      `${base}.js`,
      path.join(base, 'index.tsx'),
      path.join(base, 'index.ts'),
    ];
    for (const c of candidates) {
      if (nameByPath.has(c)) return nameByPath.get(c);
    }
    return undefined;
  }

  const indexItems = [];

  for (const { dir, file, abs, name } of files) {
    const content = await readFile(abs, 'utf8');
    const relPath = path.posix.join('src', dir, file);

    const deps = new Set();
    const registryDeps = new Set();

    for (const spec of extractSpecifiers(content)) {
      if (isInternal(spec)) {
        const dep = resolveInternal(spec, abs);
        if (dep && dep !== name) registryDeps.add(dep);
      } else {
        const pkg = packageName(spec);
        if (!PEER_DEPS.has(pkg)) deps.add(pkg);
      }
    }

    const item = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name,
      type: ITEM_TYPE,
      dependencies: [...deps].sort(),
      registryDependencies: [...registryDeps].sort(),
      files: [
        {
          path: relPath,
          type: ITEM_TYPE,
          content,
        },
      ],
    };

    await writeFile(
      path.join(ITEMS_DIR, `${name}.json`),
      JSON.stringify(item, null, 2) + '\n',
      'utf8',
    );

    indexItems.push({
      name,
      type: ITEM_TYPE,
      files: [{ path: relPath, type: ITEM_TYPE }],
    });
  }

  indexItems.sort((a, b) => a.name.localeCompare(b.name));

  const index = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'basil-ui',
    homepage: 'https://github.com/sonhoai27/basil-ui',
    items: indexItems,
  };

  // Top-level registry index at repo root (conventional shadcn location).
  await writeFile(
    path.join(ROOT, 'registry.json'),
    JSON.stringify(index, null, 2) + '\n',
    'utf8',
  );

  console.log(
    `Wrote ${indexItems.length} registry items to registry/r/*.json + registry.json.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
