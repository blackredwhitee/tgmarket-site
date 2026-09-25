"use client";
import { useState } from "react";
import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import { fmt } from "@/lib/format";
import { useTweened } from "@/lib/motion";
import { PLANS, PRO_MONTH, PRO_PERIODS } from "@/data/plans";
import s from "./Plans.module.css";

/** Тарифы подписки СТАРТ / ПРО. Переключатель периода ПРО с ездящим индикатором, цена твинится 300 мс. */
export default function Plans() {
  const [k, setK] = useState(0);
  const p = PRO_PERIODS[k];
  const perMonth = Math.round(p.total / p.months);
  const save = PRO_MONTH * p.months - p.total;
  const shown = useTweened(perMonth, 300);
  const [start, pro] = PLANS;

  return (
    <section className={s.section} id="plans">
      <div className="container">
        <div className={s.head} data-reveal>
          <h2 className={s.h2}>Тарифы бота</h2>
          <p className={s.lead}>Начните бесплатно на СТАРТ, подключите ПРО, когда товаров станет больше. Комиссия с продаж — по шкале выше на любом тарифе.</p>
        </div>
        <div className={s.grid} data-reveal="stagger">
          <article className={s.card}>
            <span className={s.name}>{start.name}</span>
            <p className={s.tagline}>{start.tagline}</p>
            <div className={s.price}><b>0 ₽</b><span>бесплатно навсегда</span></div>
            <ul className={s.list}>
              {start.features.map((f) => (
                <li key={f}><span className={s.chk}><Icon d={ICON.check} size={13} stroke="#fff" sw={3} /></span>{f}</li>
              ))}
            </ul>
            <BotLink param="site_pricing" block="plan_start" className={s.btnGhost}>Начать бесплатно</BotLink>
          </article>
          <article className={`${s.card} ${s.pro}`}>
            <span className={s.name}>{pro.name}</span>
            <p className={s.tagline}>{pro.tagline}</p>
            <div className={s.periods} role="radiogroup" aria-label="Период оплаты">
              <span className={s.ind} style={{ transform: `translateX(${k * 100}%)` }} aria-hidden="true" />
              {PRO_PERIODS.map((x, i) => (
                <button key={x.months} type="button" role="radio" aria-checked={i === k} className={`${s.period} ${i === k ? s.periodOn : ""}`} onClick={() => setK(i)}>
                  {x.label}
                </button>
              ))}
            </div>
            <div className={s.price}>
              <b>{fmt(shown)} ₽</b><span>в месяц</span>
            </div>
            <p className={s.total}>
              {p.months === 1 ? "Оплата помесячно" : <>{fmt(p.total)} ₽ за {p.label} · выгода <b>{fmt(save)} ₽</b></>}
            </p>
            <ul className={s.list}>
              {pro.features.map((f) => (
                <li key={f}><span className={s.chk}><Icon d={ICON.check} size={13} stroke="#FB7E5E" sw={3} /></span>{f}</li>
              ))}
            </ul>
            <BotLink param="site_pricing" block="plan_pro" className={s.btnPro}>Подключить ПРО</BotLink>
          </article>
        </div>
      </div>
    </section>
  );
}
