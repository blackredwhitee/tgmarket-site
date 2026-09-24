"use client";
import { useEffect, useRef } from "react";
import { EASE, reducedMotion } from "@/lib/motion";
import s from "./Timeline.module.css";

/** Таймлайн hero: линия прорисовывается 900ms, точки загораются со stagger 120ms. Точки — якоря #step-N. */
export default function Timeline({ labels }: { labels: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = ref.current;
    if (!tl) return;
    if (reducedMotion() || !tl.animate) {
      tl.classList.add(s.on);
      return;
    }
    const anims: Animation[] = [];
    const line = tl.querySelector<HTMLElement>("[data-tl-line]");
    if (line) anims.push(line.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: 500, easing: EASE, fill: "backwards" }));
    tl.querySelectorAll<HTMLElement>("[data-tl-dot]").forEach((d, i) =>
      anims.push(d.animate([{ transform: "scale(.4)", opacity: 0.2 }, { transform: "none", opacity: 1 }], { duration: 400, delay: 500 + i * 120, easing: EASE, fill: "backwards" })),
    );
    tl.classList.add(s.on);
    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <div ref={ref} className={s.tl}>
      <div className={s.track} aria-hidden="true"><div data-tl-line="1" className={s.line} /></div>
      {labels.map((l, i) => (
        <a key={l} href={`#step-${i + 1}`} className={s.item} aria-label={`Шаг ${i + 1}: ${l}`}>
          <span data-tl-dot="1" className={s.dot}>{i + 1}</span>
          <span className={s.label} aria-hidden="true">{l}</span>
        </a>
      ))}
    </div>
  );
}
