import { categories } from "../data/extensions.ts";
import { html, raw, type Html } from "./html.ts";

export type PageContext = {
  dev: boolean;
  assets: { css: string; js: string };
};

type LayoutProps = {
  title: string;
  description?: string;
  active?: string; // category id or "all"
  breadcrumbs?: { label: string; href?: string }[];
  body: Html;
};

// WebSocket (not EventSource): SSE connections count against the browser's
// 6-connections-per-host limit and pile up across navigations until pages hang.
const DEV_RELOAD = `<script>
  const ws = new WebSocket(\`ws://\${location.host}/__reload\`);
  ws.onmessage = (e) => e.data === "reload" && location.reload();
  addEventListener("pagehide", () => ws.close());
</script>`;

export const layout = (ctx: PageContext, p: LayoutProps): string =>
  "<!doctype html>" +
  html`<html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${p.title} | Backlog Marketplace</title>
      <meta name="description" content="${p.description ?? "Backlog の拡張機能・連携・ツールを探す"}" />
      <link rel="stylesheet" href="${ctx.assets.css}" />
      <script type="module" src="${ctx.assets.js}"></script>
    </head>
    <body>
      <header class="topbar">
        <button class="topbar__menu" type="button" data-toggle-sidebar aria-label="メニュー">☰</button>
        <a class="topbar__title" href="/">Backlog <span>Marketplace</span></a>
        <div class="topbar__spacer"></div>
        <a class="btn btn--ghost" href="https://backlog.com/ja/" rel="noopener">Backlog へ</a>
      </header>

      <div class="shell">
        <aside class="sidebar" data-sidebar>
          <p class="sidebar__heading">カテゴリ</p>
          <ul class="sidebar__list">
            <li><a class="${p.active === "all" ? "is-active" : ""}" href="/">すべて</a></li>
            ${categories.map(
              (c) => html`<li><a class="${p.active === c.id ? "is-active" : ""}" href="/categories/${c.id}/">${c.name}</a></li>`,
            )}
          </ul>
        </aside>

        <main class="main">
          ${p.breadcrumbs &&
          html`<ol class="breadcrumbs">
            ${p.breadcrumbs.map((b) => html`<li>${b.href ? html`<a href="${b.href}">${b.label}</a>` : b.label}</li>`)}
          </ol>`}
          ${p.body}
          <footer class="footer">© Backlog Marketplace (dummy data) — Backlog は株式会社ヌーラボの登録商標です。</footer>
        </main>
      </div>
      ${ctx.dev ? raw(DEV_RELOAD) : ""}
    </body>
  </html>`.toString();
