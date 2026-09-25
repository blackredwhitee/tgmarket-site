import { Icon, ICON } from "@/components/icons";
import s from "./Stage.module.css";

type Props = {
  id: string;
  step: number;
  kicker: string;
  title: React.ReactNode;
  lead: string;
  points: string[];
  note?: string;
  visual: React.ReactNode;
  tone?: "white" | "soft" | "sky";
  reverse?: boolean;
};

/** Этап пути продаж на главной: номер шага, заголовок, текст, список и иллюстрация (чередуются стороны и фон). */
export default function Stage({ id, step, kicker, title, lead, points, note, visual, tone = "white", reverse }: Props) {
  return (
    <section id={id} className={`${s.section} ${s[tone]}`}>
      <div className={`container ${s.wrap} ${reverse ? s.reverse : ""}`}>
        <div className={s.text} data-reveal>
          <span className={s.kicker}><b>Шаг {step}</b>{kicker}</span>
          <h2 className={s.h2}>{title}</h2>
          <p className={s.lead}>{lead}</p>
          <ul className={s.points}>
            {points.map((p) => (
              <li key={p}>
                <span className={s.chk} aria-hidden="true"><Icon d={ICON.check} size={14} stroke="#fff" sw={3} /></span>
                {p}
              </li>
            ))}
          </ul>
          {note && <p className={s.note}>{note}</p>}
        </div>
        <div className={s.visual}>{visual}</div>
      </div>
    </section>
  );
}
