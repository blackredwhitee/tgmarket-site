"use client";
import { useId, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { goal } from "@/lib/metrika";
import s from "./HomeFaq.module.css";

/** Аккордеоны: первый открыт, одновременно открыт один; раскрытие grid-template-rows 0fr→1fr 250ms. */
export default function HomeFaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const toggle = (i: number) => {
    if (open === i) { setOpen(-1); return; }
    setOpen(i);
    goal("faq_open", { question_id: `home_${i + 1}`, question: items[i].q });
  };
  return (
    <div className={s.list}>
      {items.map((f, i) => {
        const o = open === i;
        const id = `${uid}-a${i}`;
        return (
          <div key={f.q} className={`${s.item} ${o ? s.open : ""}`}>
            <h3 className={s.qWrap}>
              <button type="button" className={s.q} aria-expanded={o} aria-controls={id} id={`${id}-q`} onClick={() => toggle(i)}>
                {f.q}
                <span className={s.plus}><Icon d={ICON.plus} size={18} sw={2.4} /></span>
              </button>
            </h3>
            <div className={s.panel} id={id} role="region" aria-labelledby={`${id}-q`}>
              <div className={s.panelInner}>
                <p className={s.a}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
