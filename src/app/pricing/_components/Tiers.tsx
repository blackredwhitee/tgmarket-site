"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import { TIERS, rateLabel } from "@/data/tariffs";
import t from "./todo.module.css";
import s from "./Tiers.module.css";

// Высоты и цвета столбцов по числу ступеней (4): от тёмного к светло-синему, как в макете
const HEIGHTS = ["100%", "82%", "66%", "50%"];
const BG = ["#0B1233", "#3B4AA0", "#6A7FE0", "#B9CAFF"];
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9z";

export default function Tiers({ active }: { active: number }) {
  const [hover, setHover] = useState(-1);
  const [shown, setShown] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  // Столбцы вырастают scaleY 0→1 со stagger 100 мс при появлении шкалы
  useEffect(() => {
    const root = barsRef.current;
    return onVisible(root, () => {
      if (root && !reducedMotion()) {
        root.querySelectorAll<HTMLElement>("[data-bar]").forEach((b, i) =>
          b.animate?.([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
            duration: 600, delay: i * 100, easing: EASE, fill: "backwards",
          }),
        );
      }
      setShown(true);
    });
  }, []);

  const view = TIERS.map((tier, i) => {
    const hl = hover === i || active === i;
    return {
      rate: rateLabel(tier.rate),
      range: tier.range,
      h: HEIGHTS[i] ?? "50%",
      bg: hl ? "#1D4FFA" : BG[i] ?? BG[BG.length - 1],
      fg: i === TIERS.length - 1 && !hl ? "#0B1233" : "#fff",
    };
  });

  return (
    <section className={s.section}>
      <div className={`container ${s.inner}`}>
        <div className={s.head}>
          <h2 className={s.h2}>Ступенчатая комиссия</h2>
          <span className={s.note}>Ставка меняется автоматически при переходе границы оборота</span>
        </div>
        <div className={s.promo}>
          <Icon d={ZAP} size={24} sw={2.2} style={{ flex: "none" }} />
          Первые 2 месяца для первых селлеров — 3% на весь оборот
        </div>

        {/* desktop: «лестница» из столбцов */}
        <div ref={barsRef} className={`${s.bars} ${shown ? s.shown : ""}`}>
          {view.map((v, i) => (
            <div key={i} className={s.col} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}>
              <div
                className={`${s.tip} ${hover === i ? s.tipOn : ""}`}
                style={{ bottom: `calc(${v.h} + 16px)` }}
                aria-hidden="true"
              >
                Оборот {v.range} в месяц — комиссия {v.rate}
              </div>
              <div data-bar="1" className={s.bar} style={{ height: v.h, background: v.bg, color: v.fg }}>
                <span className={s.rate}>{v.rate}</span>
                <span className={s.range}>{v.range}</span>
              </div>
            </div>
          ))}
        </div>

        {/* mobile: вертикальный список с уменьшающейся шириной */}
        <div className={s.list}>
          {view.map((v, i) => (
            <div key={i} className={s.row} style={{ background: v.bg, color: v.fg, marginRight: `${i * 8}%` }}>
              <span className={s.rowRange}>{v.range}</span>
              <b className={s.rowRate}>{v.rate}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
