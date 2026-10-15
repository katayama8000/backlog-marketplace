// Client-side enhancements. Bundled by Bun.build into dist/assets.

const setupSearch = () => {
  const input = document.querySelector<HTMLInputElement>("[data-search-input]");
  if (!input) return;
  const cards = [...document.querySelectorAll<HTMLElement>("[data-ext]")];
  const count = document.querySelector<HTMLElement>("[data-count]");
  const empty = document.querySelector<HTMLElement>("[data-empty]");

  const apply = () => {
    const terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const hay = card.dataset.search ?? "";
      const match = terms.every((t) => hay.includes(t));
      card.hidden = !match;
      if (match) shown++;
    }
    if (count) count.textContent = String(shown);
    if (empty) empty.hidden = shown > 0;
  };

  input.addEventListener("input", apply);
  const q = new URLSearchParams(location.search).get("q");
  if (q) {
    input.value = q;
    apply();
  }
};

const setupSidebar = () => {
  const sidebar = document.querySelector<HTMLElement>("[data-sidebar]");
  document.querySelector("[data-toggle-sidebar]")?.addEventListener("click", () => {
    sidebar?.classList.toggle("is-open");
  });
};

const setupInstall = () => {
  for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-install]")) {
    btn.addEventListener("click", () => {
      btn.textContent = "インストール済み ✓";
      btn.disabled = true;
    });
  }
};

setupSearch();
setupSidebar();
setupInstall();
