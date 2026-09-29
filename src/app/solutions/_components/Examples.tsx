import type { Solution } from "@/data/solutions";
import { NICHE_PHOTOS } from "./photos";
import s from "./Solution.module.css";

/** «Что можно продавать» — примеры карточек товара с фото-обложкой. */
export default function Examples({ n }: { n: Solution }) {
  const photos = NICHE_PHOTOS[n.slug]?.examples ?? [];
  return (
    <section className={s.section}>
      <div className={`container ${s.stack}`}>
        <h2 className={`${s.h2} ${s.ink}`}>Что можно продавать</h2>
        <div data-reveal="stagger" className={s.grid3}>
          {n.examples.map((title, i) => (
            <div key={title}>
              <div className={s.exCard}>
                <div className={s.exCover}>
                  {photos[i] && <img src={photos[i].src} alt="" loading="lazy" />}
                </div>
                <div className={s.exMeta}>
                  <span className={s.exType}>{n.cardType}</span>
                  <b className={s.exTitle}>{title}</b>
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
