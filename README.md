# Backlog Marketplace

Backlog の拡張機能・連携・ツールを掲載するサイト。Bun + TypeScript の自前 SSG。

```sh
bun install
bun run dev        # http://localhost:3000 (src/ を監視して再ビルド + ブラウザ自動リロード)
bun run build      # dist/ に静的出力
bun run typecheck
bun run deploy     # build → Cloudflare Workers (static assets) にデプロイ
```

## 構成

| パス | 役割 |
| --- | --- |
| `src/data/extensions.ts` | 掲載データ（今はダミー） |
| `src/templates/html.ts` | 自動エスケープ付き `html` タグ付きテンプレート |
| `src/templates/layout.ts` | 共通レイアウト（Backlog 風のグローバルナビ + サイドバー） |
| `src/templates/pages.ts` | 各ページと `routes()`（出力パス → HTML） |
| `src/client/main.ts` | クライアント JS（検索・メニュー）。`Bun.build` でバンドル |
| `src/styles/main.css` | スタイル |
| `scripts/build.ts` | SSG 本体 |
| `scripts/dev.ts` | 開発サーバー（fs.watch → 別プロセスで再ビルド → WebSocket でリロード） |
| `public/` | そのまま `dist/` にコピーされる静的ファイル |

ページを追加するときは `routes()` にエントリを足すだけ。
