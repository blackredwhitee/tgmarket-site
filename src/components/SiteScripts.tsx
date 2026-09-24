"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { botLink, sourceCodeFromSearch, UTM_KEY } from "@/lib/bot";
import { goal } from "@/lib/metrika";

/**
 * Глобальное поведение: UTM → sessionStorage → суффикс start-параметра во всех ссылках на бота,
 * цели Метрики bot_click / partner_click / niche_open / scroll_75.
 */
export default function SiteScripts() {
  const path = usePathname() || "/";

  useEffect(() => {
    let code: string | undefined;
    try {
      const fromUrl = sourceCodeFromSearch(location.search);
      if (fromUrl) sessionStorage.setItem(UTM_KEY, fromUrl);
      code = sessionStorage.getItem(UTM_KEY) || undefined;
    } catch {}
    if (code) {
      document.querySelectorAll<HTMLAnchorElement>("a[data-bot]").forEach((a) => {
        a.href = botLink(a.dataset.bot!, code);
      });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      if (a.dataset.bot) {
        const start = new URL(a.href).searchParams.get("start");
        goal("bot_click", { page: path, block: a.dataset.block || "", start_param: start });
        if (a.dataset.bot === "site_partner") goal("partner_click", { page: path });
      }
      const m = a.getAttribute("href")?.match(/\/solutions\/([a-z]+)/);
      if (m) goal("niche_open", { niche: m[1] });
    };
    document.addEventListener("click", onClick);

    let sent = false;
    const onScroll = () => {
      if (sent) return;
      const h = document.documentElement;
      if ((h.scrollTop + innerHeight) / h.scrollHeight >= 0.75) {
        sent = true;
        goal("scroll_75", { page: path });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [path]);

  return null;
}
