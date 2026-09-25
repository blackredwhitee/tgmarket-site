import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import type { Solution } from "@/data/solutions";
import s from "./Solution.module.css";

const COVERS = [
  "linear-gradient(135deg,#E6F6FF,#BDE7FF)",
  "linear-gradient(135deg,#7BD0FF,#4FBDF2)",
  "linear-gradient(135deg,#CDEEFF,#9ADBFF)",
];
const FRAMES = ["#FB7E5E", "#0B1233", "#7BD0FF"];

/** «Что можно продавать» — примеры карточек с наклоном ±1.5°. */
export default function Examples({ n }: { n: Solution }) {
  return (
    <section className={`${s.section} ${s.soft}`}>
      <div className={`container ${s.stack}`}>
        <h2 className={`${s.h2} ${s.ink}`}>Что можно продавать</h2>
        {/* Обёртка — цель reveal (translateY), наклон — на внутренней карточке, чтобы анимации не конфликтовали */}
        <div data-reveal="stagger" className={s.grid3}>
          {n.examples.map((title, i) => (
            <div key={title}>
              <div
                className={s.exCard}
                style={{ background: FRAMES[i % 3], "--rot": `${i % 2 ? 1.5 : -1.5}deg` } as CSSProperties}
              >
                <div className={s.exInner}>
                  <div className={s.exCover} style={{ background: COVERS[i % 3] }}>
                    <Icon d={n.icon} size={40} stroke="#0B1233" sw={1.4} />
                  </div>
                  <div className={s.exMeta}>
                    <span className={s.exType}>{n.cardType}</span>
                    <b className={s.exTitle}>{title}</b>
                  </div>
                </div>
                <div className={s.exBtn} aria-hidden="true">{n.cardBtn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
