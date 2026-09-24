"use client";
import { useEffect, useRef } from "react";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import s from "./Pain.module.css";

/** Мини-переписка: пузыри появляются по очереди (шаг 700ms) при появлении на экране. */
export default function PainChat() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    return onVisible(el, () => {
      if (reducedMotion() || !el) return;
      el.querySelectorAll<HTMLElement>("[data-bub]").forEach((b, i) =>
        b.animate([{ opacity: 0, transform: "translateY(8px) scale(.96)" }, { opacity: 1, transform: "none" }], {
          duration: 350, delay: 200 + i * 700, easing: EASE, fill: "backwards",
        }),
      );
    });
  }, []);
  return (
    <div ref={ref} className={`${s.ill} ${s.ill1} ${s.chat}`} aria-hidden="true">
      <div data-bub="0" className={s.bIn}>Здравствуйте! Куда перевести?</div>
      <div data-bub="1" className={s.typing}><span /><span /><span /></div>
      <div data-bub="2" className={s.shot}>
        <span className={s.img} />
        <span className={s.shotText}>Вот скрин,<br />проверьте</span>
        <span className={s.q}>?</span>
      </div>
    </div>
  );
}
