import SellTabs from "./SellTabs";
import { LiveBg } from "@/components/Life";
import s from "./Sell.module.css";


/** Главная · «Что продавать»: вкладки-чипы и крупная панель-галерея (аукционы и донаты — тоже вкладки). */
export default function Sell() {
  return (
    <section id="create" className={s.section}>
      <LiveBg tone="cool" />
      <div className={`container ${s.wrap}`}>
        <span className={s.kicker}><b>Шаг 1</b>Создайте предложение</span>
        <h2 className={s.h2}>Продавайте то, что нужно <span className={s.yellow}>вашей аудитории</span></h2>
        <SellTabs />
        <p className={s.more}>Ещё в боте: промокоды, импорт карточек из Excel и витрина продавца со всеми вашими товарами.</p>
      </div>
    </section>
  );
}
