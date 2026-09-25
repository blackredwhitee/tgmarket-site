"use client";
import { useEffect, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { rub } from "@/lib/format";
import { useInView, useReducedMotion } from "@/lib/motion";
import s from "./Visuals.module.css";

type Order = { n: number; item: string; buyer: string; sum: number; paid: boolean };

const POOL: Omit<Order, "n">[] = [
  { item: "Консультация, 60 минут", buyer: "Анна К.", sum: 3500, paid: true },
  { item: "Гайд по бюджету", buyer: "Илья Р.", sum: 990, paid: true },
  { item: "Билет на воркшоп", buyer: "Мария С.", sum: 2500, paid: false },
  { item: "Пакет из 4 встреч", buyer: "Олег Т.", sum: 12000, paid: true },
  { item: "Разбор резюме", buyer: "Дина В.", sum: 4000, paid: true },
  { item: "Шаблон таблиц", buyer: "Павел Н.", sum: 490, paid: false },
];
const FILTERS = ["Все", "Оплачены", "Ожидают"] as const;
const DOWNLOAD = "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3";

/**
 * Мокап кабинета заказов: каждые 3 с сверху приезжает новый заказ, фильтры переключаются по кругу.
 * Вне экрана — пауза, при reduced-motion — статичный кадр.
 */
export default function OrdersVisual() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || rm) return;
    const iv = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(iv);
  }, [inView, rm]);

  const filter = Math.floor(tick / 2) % FILTERS.length;
  const orders: Order[] = Array.from({ length: 5 }, (_, i) => {
    const k = tick + 4 - i;
    return { n: 1040 + k, ...POOL[k % POOL.length] };
  });
  const visible = (o: Order) => filter === 0 || (filter === 1 ? o.paid : !o.paid);

  return (
    <div ref={ref} className={s.dash} aria-hidden="true">
      <div className={s.dashHead}>
        <b className={s.dashTitle}>Заказы</b>
        <span className={s.search}><Icon d={ICON.search} size={16} stroke="#8A92AD" />Поиск по заказам</span>
        <span className={s.export}><Icon d={DOWNLOAD} size={16} sw={2.2} />Выгрузить</span>
      </div>
      <div className={s.filters}>
        {FILTERS.map((f, i) => (
          <span key={f} className={`${s.filter} ${i === filter ? s.filterOn : ""}`}>{f}</span>
        ))}
        <span className={s.period}>Сентябрь 2026</span>
      </div>
      <div className={s.rows}>
        {orders.map((o, i) => (
          <div key={o.n} className={`${s.row} ${i === 0 && tick > 0 ? s.rowNew : ""} ${visible(o) ? "" : s.rowDim}`}>
            <span className={s.num}>№ {o.n}</span>
            <span className={s.item}>{o.item}<small>{o.buyer}</small></span>
            <b className={s.sum}>{rub(o.sum)}</b>
            <span className={`${s.status} ${o.paid ? s.paid : s.wait}`}>{o.paid ? "Оплачен" : "Ожидает"}</span>
          </div>
        ))}
      </div>
      <div className={s.dashFoot}>
        <span>Выручка за месяц</span>
        <b>{rub(248_600 + tick * 3500)}</b>
        <span className={s.spark}>
          {[40, 55, 35, 70, 60, 85, 75].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
        </span>
      </div>
    </div>
  );
}
