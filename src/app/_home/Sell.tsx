import SellTabs from "./SellTabs";
import s from "./Sell.module.css";

/** Главная · «Что продавать» (тёмная, табы). */
export default function Sell() {
  return (
    <section id="create" className={s.section}>
      <div className={s.glow} aria-hidden="true" />
      <div className={`bg-beams ${s.beams}`} aria-hidden="true" />
      <div className={`container ${s.wrap}`}>
        <span className={s.kicker}><b>Шаг 1</b>Создайте предложение</span>
        <h2 className={s.h2}>Продавайте то, что нужно <span className={s.yellow}>вашей аудитории</span></h2>
        <SellTabs />
      </div>
    </section>
  );
}
