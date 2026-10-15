// Static site generator: bundles client TS + CSS, then renders every route to dist/.
// Usage: bun scripts/build.ts [--dev]

import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { routes } from "../src/templates/pages.ts";

const root = join(import.meta.dir, "..");
const outDir = join(root, "dist");
const dev = process.argv.includes("--dev");

const started = performance.now();
await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

// 1. Bundle client assets (hashed filenames in production for long-term caching)
const result = await Bun.build({
  entrypoints: [join(root, "src/client/main.ts"), join(root, "src/styles/main.css")],
  outdir: join(outDir, "assets"),
  naming: dev ? "[name].[ext]" : "[name]-[hash].[ext]",
  minify: !dev,
  sourcemap: dev ? "inline" : "none",
  target: "browser",
});
if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

const assetPath = (ext: string) => {
  const out = result.outputs.find((o) => o.path.endsWith(ext));
  if (!out) throw new Error(`missing ${ext} output`);
  return "/" + out.path.slice(outDir.length + 1);
};
const assets = { js: assetPath(".js"), css: assetPath(".css") };

// 2. Render pages
const pages = routes({ dev, assets });
await Promise.all(
  Object.entries(pages).map(async ([file, content]) => {
    const dest = join(outDir, file);
    await mkdir(dirname(dest), { recursive: true });
    await Bun.write(dest, content);
  }),
);

// 3. Copy static files
await cp(join(root, "public"), outDir, { recursive: true });

console.log(`✓ built ${Object.keys(pages).length} pages in ${(performance.now() - started).toFixed(0)}ms`);
