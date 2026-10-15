export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Extension = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: Category["id"];
  author: string;
  official: boolean;
  version: string;
  updatedAt: string; // YYYY-MM-DD
  installs: number;
  stars: number;
  tags: string[];
  repository?: string;
  homepage?: string;
  icon: string; // short label shown in the icon tile
  color: string; // icon tile background
};

export const categories: Category[] = [
  { id: "browser", name: "ブラウザ拡張", description: "Chrome / Firefox から Backlog をもっと便利に" },
  { id: "integration", name: "連携", description: "チャットや CI など外部サービスとの連携" },
  { id: "mcp", name: "MCP サーバー", description: "AI エージェントから Backlog を操作" },
  { id: "cli", name: "CLI / SDK", description: "ターミナルやコードから Backlog API を叩く" },
  { id: "bot", name: "Bot / 自動化", description: "Webhook を使った自動化レシピ" },
  { id: "theme", name: "テーマ / UI", description: "見た目や操作感のカスタマイズ" },
];

// Dummy data — replace with a real source later.
export const extensions: Extension[] = [
  {
    slug: "backlog-mcp-server",
    name: "Backlog MCP Server",
    tagline: "Claude などの AI エージェントから課題・Wiki・PR を操作",
    description:
      "Model Context Protocol に対応したサーバーです。課題の検索・作成・更新、Wiki の閲覧、プルリクエストのレビューなどを AI エージェントから実行できます。\n\nnpx で起動でき、API キーまたは OAuth で認証します。",
    category: "mcp",
    author: "Nulab",
    official: true,
    version: "0.9.2",
    updatedAt: "2026-10-02",
    installs: 12840,
    stars: 412,
    tags: ["AI", "MCP", "Claude"],
    repository: "https://github.com/nulab/backlog-mcp-server",
    icon: "MCP",
    color: "#4caf93",
  },
  {
    slug: "backlog-slack",
    name: "Backlog for Slack",
    tagline: "課題の更新を Slack チャンネルに通知",
    description:
      "プロジェクトごとに通知先チャンネルを設定し、課題の追加・更新・コメントをリアルタイムに Slack へ流します。\n\nスラッシュコマンドから課題を作成することもできます。",
    category: "integration",
    author: "Nulab",
    official: true,
    version: "2.4.0",
    updatedAt: "2026-09-18",
    installs: 48210,
    stars: 230,
    tags: ["Slack", "通知"],
    icon: "Sl",
    color: "#611f69",
  },
  {
    slug: "backlog-teams",
    name: "Backlog for Microsoft Teams",
    tagline: "Teams のチャネルに Backlog の更新を届ける",
    description: "Teams のコネクタとして動作し、課題や Git のアクティビティをカードで表示します。",
    category: "integration",
    author: "Nulab",
    official: true,
    version: "1.3.1",
    updatedAt: "2026-08-30",
    installs: 15320,
    stars: 88,
    tags: ["Teams", "通知"],
    icon: "Te",
    color: "#5059c9",
  },
  {
    slug: "bee",
    name: "bee",
    tagline: "Backlog をターミナルから操作する CLI",
    description:
      "課題一覧、プルリクエスト、通知などをターミナルから確認・操作できる CLI です。\n\nJSON 出力に対応しているので、シェルスクリプトや AI エージェントとの組み合わせにも便利です。",
    category: "cli",
    author: "community",
    official: false,
    version: "0.6.0",
    updatedAt: "2026-10-10",
    installs: 3120,
    stars: 156,
    tags: ["CLI", "Go"],
    icon: "bee",
    color: "#f2b632",
  },
  {
    slug: "backlog-js",
    name: "backlog-js",
    tagline: "TypeScript / JavaScript 用 Backlog API クライアント",
    description: "Backlog API v2 の型付きクライアントです。Node.js・Bun・ブラウザで動作します。",
    category: "cli",
    author: "Nulab",
    official: true,
    version: "0.14.0",
    updatedAt: "2026-07-21",
    installs: 22040,
    stars: 198,
    tags: ["SDK", "TypeScript"],
    repository: "https://github.com/nulab/backlog-js",
    icon: "JS",
    color: "#2f74c0",
  },
  {
    slug: "backlog-enhancer",
    name: "Backlog Enhancer",
    tagline: "課題画面にショートカットキーと Markdown プレビューを追加",
    description:
      "課題詳細画面でのキーボード操作を強化する Chrome 拡張です。j/k で課題移動、e で編集、c でコメント入力に移れます。",
    category: "browser",
    author: "kt-dev",
    official: false,
    version: "1.8.3",
    updatedAt: "2026-09-05",
    installs: 8740,
    stars: 301,
    tags: ["Chrome", "ショートカット"],
    icon: "⌨",
    color: "#3b4252",
  },
  {
    slug: "backlog-gantt-plus",
    name: "Gantt Plus",
    tagline: "ガントチャートに依存関係の矢印を表示",
    description: "ガントチャート上に先行・後続課題の依存関係を描画し、クリティカルパスをハイライトします。",
    category: "browser",
    author: "pm-tools",
    official: false,
    version: "0.4.1",
    updatedAt: "2026-06-14",
    installs: 2310,
    stars: 64,
    tags: ["Chrome", "ガント"],
    icon: "▤",
    color: "#e07b39",
  },
  {
    slug: "backlog-github-actions",
    name: "Backlog Notify Action",
    tagline: "GitHub Actions から Backlog の課題を更新",
    description:
      "コミットメッセージや PR タイトルに含まれる課題キーを検出し、ステータス変更やコメント追加を行う GitHub Action です。",
    category: "integration",
    author: "community",
    official: false,
    version: "3.1.0",
    updatedAt: "2026-09-27",
    installs: 6890,
    stars: 143,
    tags: ["GitHub", "CI"],
    icon: "GH",
    color: "#24292f",
  },
  {
    slug: "daily-digest-bot",
    name: "Daily Digest Bot",
    tagline: "期限切れ・今日期限の課題を毎朝まとめて通知",
    description: "Webhook と Cloudflare Workers の Cron で動く小さな Bot です。担当者ごとに期限の近い課題をまとめてメール/Slack に送ります。",
    category: "bot",
    author: "nulab-labs",
    official: false,
    version: "0.2.0",
    updatedAt: "2026-10-12",
    installs: 940,
    stars: 37,
    tags: ["Webhook", "Cron"],
    icon: "☀",
    color: "#ef6c5a",
  },
  {
    slug: "auto-assign",
    name: "Auto Assign",
    tagline: "カテゴリに応じて担当者を自動設定",
    description: "課題追加の Webhook を受け取り、カテゴリやキーワードのルールに従って担当者・マイルストーンを自動で設定します。",
    category: "bot",
    author: "community",
    official: false,
    version: "1.0.4",
    updatedAt: "2026-05-02",
    installs: 1520,
    stars: 49,
    tags: ["Webhook", "自動化"],
    icon: "⚙",
    color: "#607d8b",
  },
  {
    slug: "backlog-dark",
    name: "Backlog Dark",
    tagline: "目に優しいダークテーマ",
    description: "Backlog 全体をダークテーマで表示するユーザースタイルです。コードブロックのシンタックスハイライトにも対応しています。",
    category: "theme",
    author: "night-owl",
    official: false,
    version: "2.0.0",
    updatedAt: "2026-08-08",
    installs: 5410,
    stars: 220,
    tags: ["Stylus", "ダークモード"],
    icon: "☾",
    color: "#1f2937",
  },
  {
    slug: "compact-board",
    name: "Compact Board",
    tagline: "カンバンボードのカードを高密度表示",
    description: "ボードのカードの余白を詰め、1 画面により多くの課題を表示できるようにします。",
    category: "theme",
    author: "kt-dev",
    official: false,
    version: "0.3.2",
    updatedAt: "2026-04-19",
    installs: 1210,
    stars: 31,
    tags: ["Chrome", "ボード"],
    icon: "▦",
    color: "#26a69a",
  },
];

export const categoryById = new Map(categories.map((c) => [c.id, c]));
