"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon, ICON } from "@/components/icons";
import { useInView, useReducedMotion } from "@/lib/motion";
import s from "./Sell.module.css";

const TABS = [
  {
    label: "Товары", icon: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8", cover: "linear-gradient(135deg,#7BD0FF,#4FBDF2)",
    lead: "Товары и услуги: гайды, шаблоны, консультации, разборы, физические товары", exTitle: "Карьерная консультация, 60 мин", exPrice: "4 000 ₽", btn: "Оплатить · 4 000 ₽",
    who: ["Экспертам, психологам и коучам", "Авторам гайдов и шаблонов", "Продавцам физических товаров"],
  },
  {
    label: "Подписки", icon: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM7 11V7a5 5 0 0 1 10 0v4", cover: "linear-gradient(135deg,#E6F6FF,#BDE7FF)",
    lead: "Платный доступ к вашему контенту и сообществу", exTitle: "Подписка на закрытый канал", exPrice: "990 ₽ в месяц", btn: "Оформить подписку",
    who: ["Авторам закрытых каналов", "Экспертам с клубами и сообществами", "Создателям обучающего контента"],
  },
  {
    label: "Билеты", icon: ICON.ticket, cover: "linear-gradient(135deg,#CDEEFF,#9ADBFF)",
    lead: "Вебинары, мастер-классы, офлайн-встречи — билет с QR-кодом", exTitle: "Билет на воркшоп 12 октября", exPrice: "2 500 ₽", btn: "Купить билет · 2 500 ₽",
    who: ["Организаторам вебинаров", "Ведущим мастер-классов", "Организаторам офлайн-встреч"],
  },
  {
    label: "Аукционы", icon: "m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8", cover: "linear-gradient(135deg,#FFD9CE,#FDB29E)",
    lead: "Лоты с торгами прямо в Telegram", exTitle: "Лот: авторская картина «Север»", exPrice: "Ставка 12 400 ₽ · ещё 2 ч", btn: "Сделать ставку",
    who: ["Эксклюзивным товарам и услугам", "Ограниченным лотам", "Благотворительным аукционам"],
  },
  {
    label: "Донаты", icon: ICON.gift, cover: "linear-gradient(135deg,#FFD6E0,#FFB3C6)",
    lead: "Поддержка от аудитории в любой сумме — при необходимости с электронным чеком", exTitle: "Поддержать канал", exPrice: "Любая сумма", btn: "Поддержать",
    who: ["Блогерам и авторам контента", "Сообществам", "Организаторам проектов"],
  },
] as { label: string; icon: string; cover: string; lead: string; exTitle: string; exPrice: string; btn: string; who: string[]; note?: string }[];

/**
 * Табы-сегменты с «ездящим» жёлтым индикатором. Автосмена 5s; пауза при hover и вне экрана;
 * после клика автосмена останавливается. При reduced-motion — без автосмены.
 */
export default function SellTabs() {
  const [tab, setTab] = useState(0);
  const [lock, setLock] = useState(false);
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const id = useId();
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (lock || hover || !inView || rm) return;
    const iv = setInterval(() => setTab((t) => (t + 1) % TABS.length), 5000);
    return () => clearInterval(iv);
  }, [lock, hover, inView, rm]);

  const pick = (i: number) => { setTab(i); setLock(true); };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const n = TABS.length;
    const to = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : d ? (tab + d + n) % n : -1;
    if (to < 0) return;
    e.preventDefault();
    pick(to);
    btns.current[to]?.focus();
  };

  return (
    <div ref={ref} className={s.tabsWrap} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div role="tablist" aria-label="Что можно продавать" className={s.tablist} onKeyDown={onKey}>
        <div className={s.indicator} style={{ transform: `translateX(${tab * 100}%)` }} aria-hidden="true" />
        {TABS.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => { btns.current[i] = el; }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={tab === i}
            aria-controls={`${id}-p${i}`}
            tabIndex={tab === i ? 0 : -1}
            className={`${s.tab} ${tab === i ? s.tabOn : ""}`}
            onClick={() => pick(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={s.panels}>
        {TABS.map((t, i) => {
          const a = tab === i;
          return (
            <div
              key={t.label}
              role="tabpanel"
              id={`${id}-p${i}`}
              aria-labelledby={`${id}-t${i}`}
              aria-hidden={!a}
              inert={!a}
              className={`${s.panel} ${a ? s.panelOn : ""}`}
            >
              <div className={s.preview}>
                <div className={s.pCard}>
                  <div className={s.pCover} style={{ background: t.cover }}>
                    <Icon d={t.icon} size={48} stroke="#0B1233" sw={1.4} />
                  </div>
                  <div className={s.pInfo}>
                    <span className={s.pType}>{t.label}</span>
                    <b className={s.pTitle}>{t.exTitle}</b>
                    <span className={s.pPrice}>{t.exPrice}</span>
                  </div>
                </div>
                <div className={s.pBtn} aria-hidden="true">{t.btn}</div>
              </div>
              <div className={s.info}>
                <h3 className={s.h3}>{t.lead}</h3>
                <div className={s.whoTitle}>Кому подходит</div>
                <ul className={s.who}>
                  {t.who.map((w) => (
                    <li key={w}>
                      <span className={s.chk} aria-hidden="true"><Icon d={ICON.check} size={15} stroke="#0B1233" sw={3} /></span>{w}
                    </li>
                  ))}
                </ul>
                {t.note && <span className={`todo ${s.note}`}>{t.note}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

