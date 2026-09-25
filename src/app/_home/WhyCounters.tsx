"use client";
import { useEffect, useState } from "react";
import { reducedMotion, tween, useSeen } from "@/lib/motion";
import { fmt } from "@/lib/format";
import { SELLERS, SHOW_SELLERS } from "@/lib/config";
import s from "./Why.module.css";

// Первая карточка: число селлеров (пока черновик) либо факт «0 ₽ за подключение»
const TO = [SHOW_SELLERS ? SELLERS.value : 0, 3, 9];

/** Карточки-счётчики: числа считаются от 0 за 800ms при появлении, «+» проявляется после счёта. */
export default function WhyCounters() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!seen) return;
    if (reducedMotion()) { setP(1); setDone(true); return; }
    const stop = tween(0, 1, 800, setP);
    const t = setTimeout(() => setDone(true), 820);
    return () => { stop(); clearTimeout(t); };
  }, [seen]);

  const c = TO.map((v) => v * p);
  const items = [
    SHOW_SELLERS
      ? { val: fmt(c[0]), suffix: "+", plusOp: done ? 1 : 0, label: "селлеров используют TG Market", bg: "#FB7E5E", fg: "#fff" }
      : { val: "0", suffix: " ₽", plusOp: 1, label: "за подключение и тариф СТАРТ", bg: "#FB7E5E", fg: "#fff" },
    { val: String(Math.round(c[1])), suffix: "%", plusOp: 1, label: "минимальная комиссия — дальше шкала от 10% до 5%", bg: "#7BD0FF", fg: "#0B1233" },
    { val: String(Math.round(c[2])), suffix: "", plusOp: 1, label: "инструментов продаж в боте: товары и услуги, подписки, билеты, аукционы, донаты, промокоды, платёжная ссылка, режим кассы, витрина", bg: "#0B1233", fg: "#fff" },
  ];
  const finals = [SHOW_SELLERS ? SELLERS.label : "0 ₽", "3%", "9"];

  return (
    <div ref={ref} className={s.counters}>
      {items.map((it, i) => (
        <div key={it.label} className={s.counter} style={{ background: it.bg, color: it.fg }}>
          <span className={s.cLabel}>{it.label}</span>
          <span className={s.cVal}>
            <span className="sr-only">{finals[i]}</span>
            <span aria-hidden="true">
              {it.val}
              <span className={s.plus} style={{ opacity: it.plusOp }}>{it.suffix}</span>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
