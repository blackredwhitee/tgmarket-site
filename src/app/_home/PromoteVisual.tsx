"use client";
import { useEffect, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { useInView, useReducedMotion } from "@/lib/motion";
import s from "./Visuals.module.css";

const CHANNELS = [
  { ini: "ПП", name: "Психология просто", subs: "48 тыс.", tag: "Психология", bg: "#FB7E5E" },
  { ini: "КР", name: "Карьера и рост", subs: "31 тыс.", tag: "Карьера", bg: "#7BD0FF" },
  { ini: "ОС", name: "Осознанные деньги", subs: "22 тыс.", tag: "Финансы", bg: "#0B1233" },
  { ini: "МВ", name: "Мамы в Telegram", subs: "67 тыс.", tag: "Семья", bg: "#FDB29E" },
];
const LINK = "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71";

/**
 * Мокап продвижения: карточка товара размещается на площадках по очереди (каждые 900 мс),
 * затем появляется плашка «Ссылка на оплату скопирована». Цикл ~7 с; вне экрана — пауза.
 */
export default function PromoteVisual() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (rm) { setN(CHANNELS.length + 1); return; }
    if (!inView) return;
    setN(0);
    let k = 0;
    const iv = setInterval(() => {
      k = (k + 1) % (CHANNELS.length + 4);
      setN(k);
    }, 900);
    return () => clearInterval(iv);
  }, [inView, rm]);

  return (
    <div ref={ref} className={s.promo} aria-hidden="true">
      <div className={s.lot}>
        <div className={s.lotCover}><Icon d={ICON.heart} size={28} stroke="#FB7E5E" sw={1.8} /></div>
        <div className={s.lotInfo}>
          <b>Консультация, 60 минут</b>
          <span>3 500 ₽ · оплата по СБП</span>
        </div>
      </div>
      <div className={s.places}>
        <div className={s.placesHead}>
          <b>Площадки для рекламы</b>
          <span>подобраны по нише</span>
        </div>
        {CHANNELS.map((c, i) => {
          const done = n > i;
          return (
            <div key={c.name} className={s.place}>
              <span className={s.ava} style={{ background: c.bg, color: c.bg === "#7BD0FF" || c.bg === "#FDB29E" ? "#0B1233" : "#fff" }}>{c.ini}</span>
              <span className={s.placeName}>{c.name}<small>{c.subs} подписчиков · {c.tag}</small></span>
              <span className={`${s.placeBtn} ${done ? s.placeDone : ""}`}>
                {done ? <><Icon d={ICON.check} size={14} sw={3} />Размещено</> : "Разместить"}
              </span>
            </div>
          );
        })}
      </div>
      <div className={`${s.linkToast} ${n > CHANNELS.length ? s.linkOn : ""}`}>
        <Icon d={LINK} size={18} stroke="#FB7E5E" sw={2} />
        Ссылка на оплату скопирована
      </div>
    </div>
  );
}
