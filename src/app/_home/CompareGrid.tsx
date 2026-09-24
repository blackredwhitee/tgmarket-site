"use client";
import { useEffect, useRef } from "react";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import s from "./Compare.module.css";

/** При появлении карточка TG Market «наезжает» (translateX 16→0, scale .98→1), галочки прорисовываются со stagger 100ms. */
export default function CompareGrid({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    return onVisible(el, () => {
      if (!el || reducedMotion()) return;
      el.querySelector("[data-cmp]")?.animate(
        [{ transform: "translateX(16px) scale(.98)", opacity: 0.6 }, { transform: "none", opacity: 1 }],
        { duration: 600, easing: EASE, fill: "backwards" },
      );
      el.querySelectorAll("[data-chk]").forEach((p, i) =>
        p.animate([{ strokeDashoffset: 24 }, { strokeDashoffset: 0 }], { duration: 400, delay: 300 + i * 100, easing: EASE, fill: "backwards" }),
      );
    });
  }, []);
  return <div ref={ref} className={s.grid}>{children}</div>;
}
