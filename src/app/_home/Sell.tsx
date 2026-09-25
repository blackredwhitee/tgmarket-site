import { Icon } from "@/components/icons";
import SellTabs from "./SellTabs";
import box from "@/assets/mascots/bag-box.svg";
import { LiveBg, Mascot } from "@/components/Life";
import s from "./Sell.module.css";

const TOOLS = [
  { label: "Промокоды", icon: "M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" },
  { label: "Платёжная ссылка", icon: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" },
  { label: "Режим кассы", icon: "M2 5h20v14H2zM2 10h20M6 15h4" },
  { label: "Импорт из Excel", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13l4 5M12 13l-4 5" },
  { label: "Витрина продавца", icon: "M3 9l1.5-5h15L21 9M3 9v11h18V9M3 9h18M9 20v-6h6v6" },
];

/** Главная · «Что продавать» (светлая, табы) + инструменты бота. */
export default function Sell() {
  return (
    <section id="create" className={s.section}>
      <LiveBg tone="cool" />
      <div className={`container ${s.wrap}`}>
        <Mascot img={box} size={170} className={s.mascot} />
        <span className={s.kicker}><b>Шаг 1</b>Создайте предложение</span>
        <h2 className={s.h2}>Продавайте то, что нужно <span className={s.yellow}>вашей аудитории</span></h2>
        <SellTabs />
        <div className={s.tools}>
          <span className={s.toolsTitle}>А ещё в боте:</span>
          {TOOLS.map((t) => (
            <span key={t.label} className={s.tool}><Icon d={t.icon} size={18} sw={2} stroke="#FB7E5E" />{t.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
