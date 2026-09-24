"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";

/**
 * Порт intro/reveal из design/tgm-motion.js. Обрабатывает весь документ:
 *  - [data-intro="delayMs"] (+ data-y, data-dur) — интро первого экрана;
 *  - [data-reveal] — fade-up 24px/500ms при 15% видимости; [data-reveal="stagger"] — дети со stagger 80ms.
 */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reducedMotion()) {
      els.forEach((g) => g.classList.add("is-in"));
      return;
    }
    document.querySelectorAll<HTMLElement>("[data-intro]").forEach((el) => {
      el.animate(
        [{ opacity: 0, transform: `translateY(${el.dataset.y || 24}px)` }, { opacity: 1, transform: "none" }],
        { duration: +(el.dataset.dur || 600), delay: +(el.dataset.intro || 0), easing: EASE, fill: "backwards" },
      );
    });
    const offs = els.map((g) =>
      onVisible(g, () => {
        const kids = g.dataset.reveal === "stagger" ? (Array.from(g.children) as HTMLElement[]) : [g];
        kids.forEach((k, i) =>
          k.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }], {
            duration: 500, delay: i * 80, easing: EASE, fill: "backwards",
          }),
        );
        g.classList.add("is-in");
      }),
    );
    return () => offs.forEach((f) => f());
  }, [path]);
  return null;
}
