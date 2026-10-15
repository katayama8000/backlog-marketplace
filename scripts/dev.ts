// Dev server: serves dist/, rebuilds on changes in src/ & public/, and live-reloads
// the browser over a WebSocket. Each rebuild runs in a fresh process so
// edited template modules are never served from Bun's module cache.
// Usage: bun scripts/dev.ts [--no-watch]

import type { ServerWebSocket } from "bun";
import { watch } from "node:fs";
import { stat } from "node:fs/promises";
import { join, normalize } from "node:path";

const root = join(import.meta.dir, "..");
const outDir = join(root, "dist");
const port = Number(process.env.PORT ?? 3000);
const shouldWatch = !process.argv.includes("--no-watch");

const clients = new Set<ServerWebSocket<unknown>>();

const build = async () => {
  const proc = Bun.spawn(["bun", join(root, "scripts/build.ts"), ...(shouldWatch ? ["--dev"] : [])], {
    stdout: "inherit",
    stderr: "inherit",
  });
  return (await proc.exited) === 0;
};

const broadcastReload = () => {
  for (const ws of clients) ws.send("reload");
};

await build();

if (shouldWatch) {
  let timer: Timer | undefined;
  let running = Promise.resolve();
  const onChange = (_: string, file: string | null) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      running = running.then(async () => {
        console.log(`↻ ${file ?? "change"}`);
        if (await build()) broadcastReload();
      });
    }, 50);
  };
  for (const dir of ["src", "public"]) watch(join(root, dir), { recursive: true }, onChange);
}

const resolveFile = async (pathname: string) => {
  const path = normalize(join(outDir, decodeURIComponent(pathname)));
  if (!path.startsWith(outDir)) return null;
  for (const p of [path, join(path, "index.html")]) {
    const s = await stat(p).catch(() => null);
    if (s?.isFile()) return Bun.file(p);
  }
  return null;
};

Bun.serve({
  port,
  async fetch(req, server) {
    const { pathname } = new URL(req.url);

    if (pathname === "/__reload") {
      if (server.upgrade(req)) return;
      return new Response("expected websocket", { status: 400 });
    }

    // Mirror Cloudflare's auto-trailing-slash for directory pages
    if (!pathname.endsWith("/") && !pathname.includes(".")) {
      const dirIndex = Bun.file(join(outDir, pathname, "index.html"));
      if (await dirIndex.exists()) return Response.redirect(`${pathname}/`, 307);
    }

    const file = await resolveFile(pathname);
    if (file) return new Response(file);
    return new Response(Bun.file(join(outDir, "404.html")), { status: 404, headers: { "Content-Type": "text/html" } });
  },
  websocket: {
    open: (ws) => void clients.add(ws),
    close: (ws) => void clients.delete(ws),
    message() {},
  },
});

console.log(`▶ http://localhost:${port}${shouldWatch ? "  (watching for changes)" : ""}`);
