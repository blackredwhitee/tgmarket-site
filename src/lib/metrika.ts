import { METRIKA_ID } from "./config";

type Ym = (id: number, method: string, ...args: unknown[]) => void;
declare global {
  interface Window { ym?: Ym }
}

/** Цель Метрики. До согласия на cookie счётчика нет — вызов молча игнорируется. */
export function goal(name: string, params?: Record<string, unknown>) {
  if (!METRIKA_ID || typeof window === "undefined" || !window.ym) return;
  window.ym(Number(METRIKA_ID), "reachGoal", name, params);
}

/** Загружает Метрику с вебвизором (только после согласия). */
export function loadMetrika() {
  if (!METRIKA_ID || typeof window === "undefined" || window.ym) return;
  const w = window as unknown as { ym: Ym & { a?: unknown[]; l?: number } };
  w.ym = function (...args: unknown[]) { (w.ym.a = w.ym.a || []).push(args); } as Ym & { a?: unknown[]; l?: number };
  w.ym.l = Date.now();
  const sc = document.createElement("script");
  sc.async = true;
  sc.src = "https://mc.yandex.ru/metrika/tag.js";
  document.head.appendChild(sc);
  w.ym(Number(METRIKA_ID), "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
}
