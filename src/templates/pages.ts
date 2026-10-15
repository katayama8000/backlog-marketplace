import { categories, categoryById, extensions, type Category, type Extension } from "../data/extensions.ts";
import { extGrid, extIcon, formatCount, officialBadge, searchBox } from "./components.ts";
import { html } from "./html.ts";
import { layout, type PageContext } from "./layout.ts";

const byInstalls = (a: Extension, b: Extension) => b.installs - a.installs;

export const homePage = (ctx: PageContext) => {
  const featured = extensions.filter((e) => e.official).sort(byInstalls);
  return layout(ctx, {
    title: "ホーム",
    active: "all",
    body: html`
      <section class="hero">
        <h1>Backlog Marketplace</h1>
        <p>Backlog をもっと便利にする拡張機能・連携・ツールを探そう</p>
      </section>

      <section class="panel">
        <h2 class="panel__title">公式のおすすめ</h2>
        <div class="grid">${featured.slice(0, 3).map((e) => extGridItem(e))}</div>
      </section>

      <section class="panel">
        <h2 class="panel__title">すべての拡張機能</h2>
        ${searchBox(extensions.length)} ${extGrid([...extensions].sort(byInstalls))}
      </section>
    `,
  });
};

// Featured cards are not part of the searchable grid.
const extGridItem = (e: Extension) => html`
  <a class="card card--featured" href="/extensions/${e.slug}/">
    <div class="card__head">
      ${extIcon(e)}
      <div class="card__titles">
        <h3 class="card__name">${e.name} ${officialBadge(e)}</h3>
        <p class="card__author">${e.author}</p>
      </div>
    </div>
    <p class="card__tagline">${e.tagline}</p>
  </a>
`;

export const categoryPage = (ctx: PageContext, c: Category) => {
  const list = extensions.filter((e) => e.category === c.id).sort(byInstalls);
  return layout(ctx, {
    title: c.name,
    description: c.description,
    active: c.id,
    breadcrumbs: [{ label: "ホーム", href: "/" }, { label: c.name }],
    body: html`
      <section class="panel">
        <h1 class="panel__title">${c.name}</h1>
        <p class="muted">${c.description}</p>
        ${searchBox(list.length)} ${extGrid(list)}
      </section>
    `,
  });
};

export const extensionPage = (ctx: PageContext, e: Extension) => {
  const cat = categoryById.get(e.category)!;
  const related = extensions.filter((x) => x.category === e.category && x.slug !== e.slug).slice(0, 3);
  return layout(ctx, {
    title: e.name,
    description: e.tagline,
    active: e.category,
    breadcrumbs: [{ label: "ホーム", href: "/" }, { label: cat.name, href: `/categories/${cat.id}/` }, { label: e.name }],
    body: html`
      <section class="panel detail">
        <div class="detail__head">
          ${extIcon(e, "lg")}
          <div class="detail__titles">
            <h1>${e.name} ${officialBadge(e)}</h1>
            <p class="muted">${e.tagline}</p>
            <div class="detail__tags">${e.tags.map((t) => html`<span class="tag">${t}</span>`)}</div>
          </div>
          <div class="detail__actions">
            <button class="btn btn--primary" type="button" data-install="${e.name}">インストール</button>
            ${e.repository && html`<a class="btn btn--ghost" href="${e.repository}" rel="noopener">リポジトリ</a>`}
          </div>
        </div>
      </section>

      <div class="detail__body">
        <section class="panel">
          <h2 class="panel__title">説明</h2>
          ${e.description.split("\n\n").map((p) => html`<p>${p}</p>`)}
        </section>

        <aside class="panel">
          <h2 class="panel__title">詳細</h2>
          <table class="props">
            <tr><th>作者</th><td>${e.author}</td></tr>
            <tr><th>カテゴリ</th><td><a href="/categories/${cat.id}/">${cat.name}</a></td></tr>
            <tr><th>バージョン</th><td>${e.version}</td></tr>
            <tr><th>更新日</th><td>${e.updatedAt.replaceAll("-", "/")}</td></tr>
            <tr><th>インストール</th><td>${e.installs.toLocaleString("ja-JP")}</td></tr>
            <tr><th>スター</th><td>★ ${formatCount(e.stars)}</td></tr>
          </table>
        </aside>
      </div>

      ${related.length > 0 &&
      html`<section class="panel">
        <h2 class="panel__title">同じカテゴリの拡張機能</h2>
        <div class="grid">${related.map(extGridItem)}</div>
      </section>`}
    `,
  });
};

export const notFoundPage = (ctx: PageContext) =>
  layout(ctx, {
    title: "ページが見つかりません",
    body: html`<section class="panel">
      <h1 class="panel__title">404 — ページが見つかりません</h1>
      <p><a href="/">ホームに戻る</a></p>
    </section>`,
  });

export const routes = (ctx: PageContext): Record<string, string> => ({
  "index.html": homePage(ctx),
  "404.html": notFoundPage(ctx),
  ...Object.fromEntries(categories.map((c) => [`categories/${c.id}/index.html`, categoryPage(ctx, c)])),
  ...Object.fromEntries(extensions.map((e) => [`extensions/${e.slug}/index.html`, extensionPage(ctx, e)])),
});
