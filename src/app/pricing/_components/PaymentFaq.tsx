"use client";
import { useId, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { goal } from "@/lib/metrika";
import t from "./todo.module.css";
import s from "./PaymentFaq.module.css";

const isTodo = (a: string) => a.startsWith("[УТОЧНИТЬ");

export default function PaymentFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <h2 className={s.h2}>Вопросы об оплате</h2>
        <div className={s.list}>
          {items.map((f, i) => {
            const o = open === i;
            const bid = `${uid}-q${i}`, pid = `${uid}-a${i}`;
            return (
              <div key={i} className={`${s.item} ${o ? s.open : ""}`}>
                <button
                  type="button"
                  id={bid}
                  aria-expanded={o}
                  aria-controls={pid}
                  className={s.q}
                  onClick={() => {
                    setOpen(o ? -1 : i);
                    if (!o) goal("faq_open", { question_id: `pricing_${i + 1}` });
                  }}
                >
                  {f.q}
                  <span className={s.icon} aria-hidden="true"><Icon d={ICON.plus} size={18} sw={2.4} /></span>
                </button>
                <div id={pid} role="region" aria-labelledby={bid} className={s.body}>
                  <div className={s.clip}>
                    <p className={s.a}>{isTodo(f.a) ? <span className={`todo ${t.inline}`}>{f.a}</span> : f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
