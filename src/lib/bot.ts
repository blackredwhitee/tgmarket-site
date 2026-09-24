import { BOT, REF_START, UTM_SOURCE_CODES } from "./config";

/** Единая функция ссылки на бота (ТЗ §7.5). Без UTM — на сервере; суффикс источника добавляет клиент. */
export function botLink(param: string, sourceCode?: string): string {
  if (REF_START) return `https://t.me/${BOT}?start=${REF_START}`;
  let p = param;
  if (sourceCode) p += "_" + sourceCode;
  p = p.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
  return `https://t.me/${BOT}?start=${p}`;
}

export const UTM_KEY = "tgm_utm_src";

export function sourceCodeFromSearch(search: string): string | undefined {
  const q = new URLSearchParams(search);
  const src = (q.get("utm_source") || "").toLowerCase();
  if (!src) return undefined;
  return UTM_SOURCE_CODES[src] ?? src.replace(/[^a-z0-9]/g, "").slice(0, 16);
}
