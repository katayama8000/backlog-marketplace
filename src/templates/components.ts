import { categoryById, type Extension } from "../data/extensions.ts";
import { html } from "./html.ts";

export const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

export const extIcon = (e: Extension, size: "md" | "lg" = "md") =>
  html`<span class="ext-icon ext-icon--${size}" style="background:${e.color}">${e.icon}</span>`;

export const officialBadge = (e: Extension) => e.official && html`<span class="badge badge--official">公式</span>`;

export const extCard = (e: Extension) => html`
  <a
    class="card"
    href="/extensions/${e.slug}/"
    data-ext
    data-search="${[e.name, e.tagline, e.author, ...e.tags].join(" ").toLowerCase()}"
  >
    <div class="card__head">
      ${extIcon(e)}
      <div class="card__titles">
        <h3 class="card__name">${e.name} ${officialBadge(e)}</h3>
        <p class="card__author">${e.author}</p>
      </div>
    </div>
    <p class="card__tagline">${e.tagline}</p>
    <div class="card__foot">
      <span class="badge">${categoryById.get(e.category)?.name}</span>
      <span class="card__stats">
        <span title="インストール数">⬇ ${formatCount(e.installs)}</span>
        <span title="スター">★ ${formatCount(e.stars)}</span>
      </span>
    </div>
  </a>
`;

export const extGrid = (list: Extension[]) => html`
  <div class="grid" data-grid>${list.map(extCard)}</div>
  <p class="empty" data-empty hidden>該当する拡張機能が見つかりませんでした。</p>
`;

export const searchBox = (count: number) => html`
  <div class="toolbar" id="search">
    <input class="input" type="search" placeholder="拡張機能を検索（名前・タグ・作者）" data-search-input />
    <span class="toolbar__count"><span data-count>${count}</span> 件</span>
  </div>
`;
