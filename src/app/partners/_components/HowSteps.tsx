"use client";
import { useEffect, useRef } from "react";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import sh from "./shared.module.css";
import s from "./HowSteps.module.css";

type Step = {
  n: number; title: string; text: string; note?: string;
  bg: string; fg: string; numBg: string; numFg: string; line: string;
};

const STEPS: Step[] = [
  { n: 1, title: "Получите ссылку", text: "Персональная ссылка — в боте: «Вывод средств» → «О реферальной программе».", bg: "#F5F7FE", fg: "#0B1233", numBg: "#1D4FFA", numFg: "#fff", line: "#C9D4FF" },
  { n: 2, title: "Рекомендуйте TG Market", text: "Клиентам, подписчикам, коллегам, которые продают в Telegram.", bg: "#EEF2FF", fg: "#0B1233", numBg: "#0B1233", numFg: "#fff", line: "#B9CAFF" },
  { n: 3, title: "Получайте до 1%", text: "От 0,5% до 1% с оборота каждого приведённого селлера в течение первого года.", bg: "#1D4FFA", fg: "#fff", numBg: "#FFE14A", numFg: "#0B1233", line: "rgba(255,255,255,.4)" },
];

export default function HowSteps() {
  const ref = useRef<HTMLDivElement>(null);

  // Линии прорисовываются scaleX 0→1 со stagger 200ms при появлении
  useEffect(
    () =>
      onVisible(ref.current, () => {
        if (reducedMotion()) return;
        ref.current?.querySelectorAll<HTMLElement>("[data-line]").forEach((l, i) =>
          l.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 700, delay: i * 200, easing: EASE, fill: "backwards" }),
        );
      }),
    [],
  );

  return (
    <section className={sh.section}>
      <div className={`container ${sh.inner}`}>
        <h2 className={sh.h2}>Как это работает</h2>
        <div ref={ref} className={s.grid}>
          {STEPS.map((st) => (
            <div key={st.n} className={s.card} style={{ background: st.bg, color: st.fg }}>
              <div className={s.head}>
                <span className={s.num} style={{ background: st.numBg, color: st.numFg }}>{st.n}</span>
                <span data-line="" className={s.line} style={{ background: st.line }} aria-hidden="true" />
              </div>
              <h3 className={s.h3}>{st.title}</h3>
              <p className={s.p}>{st.text}</p>
              {st.note && <span className={`todo ${s.note}`}>{st.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
