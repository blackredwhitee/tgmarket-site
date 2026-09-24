"use client";
import { useEffect, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { useInView, useReducedMotion } from "@/lib/motion";
import s from "./HeroB.module.css";

const FLOW = [
  { kicker: "Карточка", title: "Создайте в боте", text: "Товар, услуга, билет или донат — за пару минут.", cls: s.cBlue, kind: "bot" },
  { kicker: "Канал", title: "Опубликуйте", text: "Пост с кнопкой оплаты — в вашем канале.", cls: s.cLight, kind: "post" },
  { kicker: "Оплата", title: "Получите деньги", text: "Подписчик платит по СБП прямо из поста.", cls: s.cYellow, kind: "paid" },
] as const;

/** Три бенто-карточки hero B: активная по очереди (2.4s) поднимается на 8px с тенью. */
export default function FlowCards() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();

  useEffect(() => {
    if (!inView || rm) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % 3), 2400);
    return () => clearInterval(iv);
  }, [inView, rm, active]);

  return (
    <div ref={ref} className={s.grid} data-intro="600" data-y="40" data-dur="900">
      {FLOW.map((f, i) => (
        <div key={f.kicker} className={`${s.card} ${f.cls} ${active === i ? s.on : ""}`} onClick={() => setActive(i)}>
          <div className={s.cardHead}>
            <span className={s.kicker}>{f.kicker}</span>
            <span className={s.num} aria-hidden="true">0{i + 1}</span>
          </div>
          <div className={s.cardBody} aria-hidden="true">
            {f.kind === "bot" && (
              <div className={s.bot}>
                <span>Название</span><b>Консультация, 60 минут</b>
                <span>Цена</span><b>3 500 ₽</b>
              </div>
            )}
            {f.kind === "post" && (
              <>
                <div className={s.post}>
                  <span className={s.cover} />
                  <span className={s.postText}><b>Консультация, 60 минут</b><span>3 500 ₽</span></span>
                </div>
                <div className={s.payBtn}>Оплатить</div>
              </>
            )}
            {f.kind === "paid" && (
              <div className={s.paid}>
                <span className={s.ok}><Icon d={ICON.check} size={20} stroke="#fff" sw={3} /></span>
                <span className={s.paidText}><span>Оплата получена</span><b>+3 500 ₽</b></span>
              </div>
            )}
          </div>
          <div className={s.cardFoot}>
            <b className={s.title}>{f.title}</b>
            <span className={s.text}>{f.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
