import { Icon } from "@/components/icons";
import PainChat from "./PainChat";
import s from "./Pain.module.css";

const LEAK = ["Пост", "Сайт", "Форма", "Оплата"];
const DOCS = [
  ["Касса", "12%", "26px", "-8deg"],
  ["Эквайринг", "36%", "18px", "4deg"],
  ["Договор", "60%", "30px", "-3deg"],
];

/** Главная · «Знакомо?» — боли продаж вручную. Иллюстрации на цветных подложках (v2). */
export default function Pain() {
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.head}>
          <h2 className={s.h2}><span className={s.tag}>Знакомо?</span>Продавать в Telegram неудобно, если всё вручную</h2>
          <div className={s.sticker}>
            <span className={s.stickerIcon}><Icon d="M12 5v14M19 12l-7 7-7-7" size={22} stroke="#fff" sw={2.2} /></span>
            <span className={s.stickerText}><b>Ниже — как проще</b><span>3 шага вместо переписки</span></span>
          </div>
        </div>
        <div className={s.grid} data-reveal="stagger">
          <div className={s.card}>
            <PainChat />
            <h3 className={s.h3}>«Куда перевести?»</h3>
            <p className={s.p}>Подписчики пишут в личку, вы отправляете реквизиты и сверяете переводы по скриншотам.</p>
          </div>
          <div className={s.card}>
            <div className={`${s.ill} ${s.ill2} ${s.center}`} aria-hidden="true">
              <div className={s.browser}>
                <div className={s.bar}><span /><span /><span /></div>
                <div className={s.page}>
                  <span className={s.l1} />
                  <span className={s.l2} />
                  <div className={s.progress}><span /></div>
                  <span className={s.week}>Разработка · неделя 3 из 8</span>
                </div>
              </div>
            </div>
            <h3 className={s.h3}>Сайт — это долго</h3>
            <p className={s.p}>Лендинг с оплатой — недели разработки и отдельный бюджет.</p>
          </div>
          <div className={s.card}>
            <div className={`${s.ill} ${s.ill3} ${s.leak}`} aria-hidden="true">
              {LEAK.map((l, i) => (
                <span key={l} className={s.step} style={{ opacity: 1 - i * 0.22 }}>
                  <span className={s.pill} style={{ borderStyle: i === 0 ? "solid" : "dashed" }}>{l}</span>
                  {i < 3 && <Icon d="M5 12h14M12 5l7 7-7 7" size={14} stroke="#E0708F" sw={2.2} />}
                </span>
              ))}
            </div>
            <h3 className={s.h3}>Покупатели теряются</h3>
            <p className={s.p}>Каждый переход из канала на внешний сайт — ещё один шаг, на котором человек может передумать.</p>
          </div>
          <div className={s.card}>
            <div className={`${s.ill} ${s.ill4} ${s.docs}`} aria-hidden="true">
              {DOCS.map(([label, x, y, r]) => (
                <div key={label} className={s.doc} style={{ left: x, top: y, transform: `rotate(${r})` }}>
                  <b>{label}</b><span /><span style={{ width: "80%" }} /><span style={{ width: "60%" }} />
                </div>
              ))}
            </div>
            <h3 className={s.h3}>Много формальностей</h3>
            <p className={s.p}>Касса, эквайринг, договоры — много шагов до первой продажи.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

