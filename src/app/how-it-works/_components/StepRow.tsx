"use client";
import { useEffect, useRef } from "react";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import s from "./StepRow.module.css";

type Props = { n: number; reverse: boolean; text: React.ReactNode; media: React.ReactNode };

/**
 * Шаг в шахматной раскладке. Reveal: текст — fade-up 24px, мокап выезжает
 * со стороны своей колонки (translateX ±32px), 500ms ease-out, при 15% видимости.
 */
export default function StepRow({ n, reverse, text, media }: Props) {
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = textRef.current, m = mediaRef.current;
    if (!t || !m) return;
    if (reducedMotion() || !t.animate) {
      t.classList.add(s.in);
      m.classList.add(s.in);
      return;
    }
    const anims: Animation[] = [];
    const offT = onVisible(t, () => {
      anims.push(t.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: EASE, fill: "backwards" }));
      t.classList.add(s.in);
    });
    const offM = onVisible(m, () => {
      // Сторона мокапа относительно текста; в одну колонку (mobile) — чередуем по номеру шага.
      const tr = t.getBoundingClientRect(), mr = m.getBoundingClientRect();
      const dx = mr.left + mr.width / 2 - (tr.left + tr.width / 2);
      const side = Math.abs(dx) > 10 ? Math.sign(dx) : n % 2 ? 1 : -1;
      anims.push(m.animate([{ opacity: 0, transform: `translateX(${side * 32}px)` }, { opacity: 1, transform: "none" }], { duration: 500, easing: EASE, fill: "backwards" }));
      m.classList.add(s.in);
    });
    return () => { offT(); offM(); anims.forEach((a) => a.cancel()); };
  }, [n]);

  return (
    <div id={`step-${n}`} className={`${s.row} ${reverse ? s.reverse : ""}`}>
      <div ref={textRef} className={`${s.text} ${s.rv}`}>{text}</div>
      <div ref={mediaRef} className={`${s.media} ${s.rv}`}>{media}</div>
    </div>
  );
}
