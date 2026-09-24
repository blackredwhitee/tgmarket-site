import type { Solution } from "@/data/solutions";
import TodoText from "./TodoText";
import s from "./Solution.module.css";

/** «Знакомо?» — тёмная секция с болями ниши. */
export default function Pains({ n }: { n: Solution }) {
  return (
    <section className={`${s.section} ${s.dark}`}>
      <div className={`container ${s.stack}`}>
        <div className={s.headRow}>
          <h2 className={s.h2}>Знакомо?</h2>
          {n.painDraft && (
            <span className={`todo ${s.draft}`}>[УТОЧНИТЬ] Черновик — тексты боли утверждает копирайтер</span>
          )}
        </div>
        <div data-reveal="stagger" className={s.grid3}>
          {n.pains.map((t, i) => (
            <div key={i} className={s.painCard}>
              <span className={s.painNum} aria-hidden="true">{"0" + (i + 1)}</span>
              <p className={s.painText}><TodoText text={t} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
