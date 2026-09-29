"use client";
import { useEffect, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { useInView, useReducedMotion } from "@/lib/motion";
import mark from "@/assets/logo-mark.svg";
import lot from "@/assets/photos/sol/psychologists-1.jpg";
import f1 from "@/assets/photos/sol/av-psychologists.jpg";
import f2 from "@/assets/photos/sol/av-experts.jpg";
import f3 from "@/assets/photos/sol/av-infoproducts.jpg";
import s from "./Visuals.module.css";

const CHANNELS = [
  { img: mark.src, name: "Каналы TG Market", subs: "10 000", tag: "бесплатно", logo: true },
  { img: f1.src, name: "Психология просто", subs: "48 тыс.", tag: "Психология" },
  { img: f2.src, name: "Карьера и рост", subs: "31 тыс.", tag: "Карьера" },
  { img: f3.src, name: "Осознанные деньги", subs: "22 тыс.", tag: "Финансы" },
];
const LINK = "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71";

/**
 * Мокап «Заказать рекламу» из бота: бесплатная публикация в каналах TG Market и каналы по нише, размещение по очереди (каждые 900 мс),
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
        <div className={s.lotCover}><img src={lot.src} alt="" loading="lazy" /></div>
        <div className={s.lotInfo}>
          <b>Консультация, 60 минут</b>
          <span>3 500 ₽ · оплата по СБП</span>
        </div>
      </div>
      <div className={s.places}>
        <div className={s.placesHead}>
          <b>Заказать рекламу</b>
          <span>каналы по вашей нише</span>
        </div>
        {CHANNELS.map((c, i) => {
          const done = n > i;
          return (
            <div key={c.name} className={s.place}>
              <span className={`${s.ava} ${c.logo ? s.avaLogo : ""}`}><img src={c.img} alt="" loading="lazy" /></span>
              <span className={s.placeName}>{c.name}<small>{c.subs} подписчиков · {c.tag}</small></span>
              <span className={`${s.placeBtn} ${done ? s.placeDone : ""}`}>
                {done ? <><Icon d={ICON.check} size={14} sw={3} />Размещено</> : i === 0 ? "Бесплатно" : "Заказать"}
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
