import { Icon, ICON } from "@/components/icons";
import CompareGrid from "./CompareGrid";
import s from "./Compare.module.css";

/** Строки: [типичная платформа, TG Market, плашка УТОЧНИТЬ]. Конкурента не называть. */
const ROWS: [string, string, string?][] = [
  ["Оплата картой или криптовалютой", "Оплата по СБП — через приложение банка"],
  ["Комиссия около 10%", "От 3% в первый месяц", "[УТОЧНИТЬ] Итоговая формулировка по шкале"],
  ["Для авторов и креаторов", "Для экспертов и бизнеса: самозанятые, ИП, юрлица"],
  ["Подписки и донаты", "Услуги, товары, билеты и донаты"],
  ["Зарубежный оператор", "Российский оператор — TalkBank", "[УТОЧНИТЬ]"],
];

/** Блок «Сравнение». На странице выводить только при SHOW_COMPARE (./flags). */
export default function Compare() {
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <div className={s.head}>
          <h2 className={s.h2}>Чем TG Market отличается</h2>
          <span className={`todo ${s.flag}`}>Флаг CMS · публикуется после проверки юристом</span>
        </div>
        <CompareGrid>
          <div className={s.left}>
            <div className={s.leftHead}>Типичная платформа монетизации</div>
            {ROWS.map((r) => (
              <div key={r[0]} className={s.leftRow}>{r[0]}</div>
            ))}
          </div>
          <div className={s.right} data-cmp>
            <div className={s.rightHead}>
              <span className={s.logo}><Icon d={ICON.send} size={14} sw={2.4} stroke="#fff" /></span>
              <b className={s.brand}>TG Market</b>
            </div>
            {ROWS.map((r) => (
              <div key={r[1]} className={s.rightRow}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18A957" strokeWidth="2.6"
                  strokeLinecap="round" strokeLinejoin="round" className={s.chk} aria-hidden="true">
                  <path data-chk d={ICON.check} strokeDasharray="24" strokeDashoffset="0" />
                </svg>
                <span>
                  {r[1]}
                  {r[2] && <span className={`todo ${s.note}`}>{r[2]}</span>}
                </span>
              </div>
            ))}
          </div>
        </CompareGrid>
      </div>
    </section>
  );
}
