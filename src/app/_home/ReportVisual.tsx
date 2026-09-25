"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { fmt } from "@/lib/format";
import { useInView, useReducedMotion, useTweened } from "@/lib/motion";
import s from "./Visuals.module.css";

const PERIODS = [
  { label: "День", orders: 6, revenue: 21_400, bars: [20, 35, 15, 60, 45, 80, 55], axis: ["9", "11", "13", "15", "17", "19", "21"] },
  { label: "Неделя", orders: 42, revenue: 148_600, bars: [45, 60, 40, 75, 65, 90, 70], axis: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"] },
  { label: "Месяц", orders: 171, revenue: 612_300, bars: [55, 70, 62, 85, 0, 0, 0].map((v, i) => (i < 4 ? v : 0)), axis: ["1 нед", "2 нед", "3 нед", "4 нед", "", "", ""] },
];
const CHART = "M3 3v18h18M7 16l4-4 4 4 5-6";
const FILE = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3";

/**
 * Мокап «Центра отчётности» в боте: период переключается каждые 3 с, числа твинятся,
 * столбцы перерастают. Внизу — включённый автоотчёт. Вне экрана — пауза; reduced-motion — статика.
 */
export default function ReportVisual() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const [k, setK] = useState(1);

  useEffect(() => {
    if (!inView || rm) return;
    const iv = setInterval(() => setK((x) => (x + 1) % PERIODS.length), 3000);
    return () => clearInterval(iv);
  }, [inView, rm]);

  const p = PERIODS[k];
  const orders = useTweened(p.orders, 400);
  const revenue = useTweened(p.revenue, 400);
  const avg = useTweened(Math.round(p.revenue / p.orders), 400);
  const bars = p.bars.filter((_, i) => p.axis[i]);

  return (
    <div ref={ref} className={s.report} aria-hidden="true">
      <div className={s.repHead}>
        <span className={s.repIcon}><Icon d={CHART} size={20} stroke="#fff" sw={2.2} /></span>
        <span className={s.repTitle}>Центр отчётности<small>TG Market Seller · бот</small></span>
      </div>
      <div className={s.periods}>
        {PERIODS.map((x, i) => (
          <span key={x.label} className={`${s.periodBtn} ${i === k ? s.periodOn : ""}`}>{x.label}</span>
        ))}
      </div>
      <div className={s.kpis}>
        <div><span>Заказов</span><b>{fmt(orders)}</b></div>
        <div><span>Выручка</span><b>{fmt(revenue)} ₽</b></div>
        <div><span>Средний чек</span><b>{fmt(avg)} ₽</b></div>
      </div>
      <div className={s.chart}>
        {bars.map((h, i) => (
          <div key={i} className={s.chartCol}>
            <i className={s.chartBar} style={{ transform: `scaleY(${h / 100})`, background: i === bars.length - 1 ? "#FB7E5E" : undefined }} />
            <small>{p.axis[i]}</small>
          </div>
        ))}
      </div>
      <div className={s.repFoot}>
        <span className={s.toggle}><i /></span>
        <span className={s.auto}>Автоотчёт<small>каждый понедельник в 10:00</small></span>
        <span className={s.repFile}><Icon d={FILE} size={16} sw={2} />Выгрузить</span>
      </div>
    </div>
  );
}
