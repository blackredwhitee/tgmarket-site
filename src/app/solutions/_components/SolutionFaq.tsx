"use client";
import { useId, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { goal } from "@/lib/metrika";
import type { SolutionFaq as FaqItem } from "@/data/solutions";
import TodoText from "./TodoText";
import s from "./Solution.module.css";

/** FAQ ниши: аккордеон (grid-rows 0fr→1fr), первый пункт открыт. */
export default function SolutionFaq({ items, niche }: { items: FaqItem[]; niche: string }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <section className={s.faqSection}>
      <div className={`container ${s.faqRow}`}>
        <h2 className={`${s.h2} ${s.ink} ${s.faqH2}`}>Вопросы</h2>
        <div className={s.faqList}>
          {items.map((f, i) => {
            const o = open === i;
            const bid = `${uid}-q${i}`;
            const pid = `${uid}-a${i}`;
            return (
              <div key={i} className={s.faqItem} data-open={o ? "" : undefined}>
                <h3 className={s.faqQ}>
                  <button
                    type="button"
                    id={bid}
                    className={s.faqBtn}
                    aria-expanded={o}
                    aria-controls={pid}
                    onClick={() => {
                      setOpen(o ? -1 : i);
                      if (!o) goal("faq_open", { page: `solutions/${niche}`, question: f.q });
                    }}
                  >
                    {f.q}
                    <span className={s.faqIcon} aria-hidden="true">
                      <Icon d={ICON.plus} size={18} sw={2.4} />
                    </span>
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className={s.faqPanel} inert={!o}>
                  <div className={s.faqPanelInner}>
                    <p className={s.faqA}><TodoText text={f.a} /></p>
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
