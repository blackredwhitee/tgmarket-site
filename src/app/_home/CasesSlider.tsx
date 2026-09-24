"use client";
import { useRef } from "react";
import { Icon } from "@/components/icons";
import { reducedMotion } from "@/lib/motion";
import { P } from "./paths";
import s from "./Cases.module.css";

export type Case = {
  niche: string;
  name: string;
  quote: string;
  /** Ссылка на канал (по ТЗ), когда появятся реальные кейсы */
  href?: string;
  bg: string;
  fg: string;
  quoteFill: string;
  avatar: string;
  dash: string;
};

/** Горизонтальный scroll-snap слайдер; стрелки 56px — только desktop. Без автопрокрутки. */
export default function CasesSlider({ cases }: { cases: Case[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const slide = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({ left: (dir * el.clientWidth) / 3, behavior: reducedMotion() ? "auto" : "smooth" });
  };
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <div className={s.head}>
          <h2 className={s.h2}>Кто уже продаёт через TG Market</h2>
          <div className={s.arrows}>
            <button type="button" className={s.prev} aria-label="Назад" onClick={() => slide(-1)}>
              <Icon d={P.arrowLeft} size={20} sw={2.2} />
            </button>
            <button type="button" className={s.next} aria-label="Вперёд" onClick={() => slide(1)}>
              <Icon d={P.arrowR} size={20} sw={2.2} />
            </button>
          </div>
        </div>
        <div ref={ref} className={s.slider} role="region" aria-label="Кейсы селлеров" tabIndex={0}>
          {cases.map((c, i) => (
            <div key={i} className={s.card} style={{ background: c.bg, color: c.fg }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill={c.quoteFill} aria-hidden="true"><path d={P.quote} /></svg>
              <p className={s.quote}>{c.quote}</p>
              <div className={s.author}>
                <span className={s.avatar} style={{ background: c.avatar, borderColor: c.dash }} />
                <span className={s.who}>
                  <b className={s.name}>{c.href ? <a href={c.href} target="_blank" rel="noopener" style={{ color: "inherit" }}>{c.name}</a> : c.name}</b>
                  <span className={s.niche}>{c.niche}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <span className={`todo ${s.hint}`}>Если на запуске меньше трёх согласованных кейсов, блок скрывается из CMS.</span>
      </div>
    </section>
  );
}
