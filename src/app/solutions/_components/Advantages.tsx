import type { Solution } from "@/data/solutions";
import s from "./Solution.module.css";

/** 3 бенто-преимущества. */
export default function Advantages({ n }: { n: Solution }) {
  return (
    <section className={s.section}>
      <div className={`container ${s.grid3}`}>
        {n.advantages.map((a) => (
          <div key={a.big} className={s.adv} style={{ background: a.bg, color: a.fg }}>
            <b className={s.advBig}>{a.big}</b>
            <span className={s.advTitle}>{a.title}</span>
            <span className={s.advText}>{a.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
