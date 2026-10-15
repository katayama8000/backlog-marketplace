// Minimal auto-escaping tagged template. Nested `html` results and arrays are
// inserted as-is; everything else is escaped.

const RAW = Symbol("raw");

export type Html = { [RAW]: string; toString(): string };

export const raw = (s: string): Html => ({ [RAW]: s, toString: () => s });

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const render = (v: unknown): string => {
  if (v == null || v === false) return "";
  if (Array.isArray(v)) return v.map(render).join("");
  if (typeof v === "object" && RAW in v) return (v as Html)[RAW];
  return escape(String(v));
};

export const html = (strings: TemplateStringsArray, ...values: unknown[]): Html =>
  raw(strings.reduce((out, s, i) => out + s + (i < values.length ? render(values[i]) : ""), ""));
