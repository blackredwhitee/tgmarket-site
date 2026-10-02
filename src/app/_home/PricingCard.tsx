"use client";
import { useEffect, useRef } from "react";
import { EASE, onVisible, reducedMotion, tween } from "@/lib/motion";
import s from "./PricingTeaser.module.css";

/**
 * Синяя карточка тизера тарифов. При появлении: строки шкалы появляются по очереди (500ms, stagger 90ms),
 * «3%» считается от 0 за 800ms. Число пишется прямо в [data-pct], чтобы карточка оставалась серверной разметкой.
 */
export default function PricingCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    let stop = () => {};
    const off = onVisible(el, () => {
      if (!el || reducedMotion()) return;
      el.querySelectorAll("[data-row]").forEach((b, i) =>
        b.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 500, delay: i * 90, easing: EASE, fill: "backwards" }),
      );
      const pct = el.querySelector<HTMLElement>("[data-pct]");
      if (pct) stop = tween(0, 3, 800, (v) => { pct.textContent = Math.round(v) + "%"; });
    });
    return () => { off(); stop(); };
  }, []);
  return <div ref={ref} className={s.card}>{children}</div>;
}
