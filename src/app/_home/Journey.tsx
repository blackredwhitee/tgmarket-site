import { LiveBg } from "@/components/Life";
import { Icon } from "@/components/icons";
import { P } from "./paths";
import s from "./Journey.module.css";

const STEPS = [
  { href: "#create", title: "Создайте предложение", sub: "товары, подписки, билеты, аукционы, донаты", icon: "M12 5v14M5 12h14" },
  { href: "#promote", title: "Продвигайте", sub: "каналы, чаты, площадки для рекламы", icon: "M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" },
  { href: "#pay", title: "Получайте оплату", sub: "по СБП прямо в Telegram", icon: "M2 5h20v14H2zM2 10h20" },
  { href: "#orders", title: "Управляйте заказами", sub: "все заказы в меню бота", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { href: "#analytics", title: "Анализируйте", sub: "сводки и автоотчёты", icon: "M3 3v18h18M7 16l4-4 4 4 5-6" },
  { href: "#customers", title: "Возвращайте покупателей", sub: "рассылки и промокоды", icon: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" },
];

/** Главная · обзор пути продаж: TG Market — инструмент продаж, а не только приём платежей. */
export default function Journey() {
  return (
    <section className={s.section}>
      <LiveBg />
      <div className={`container ${s.inner}`}>
        <div className={s.head} data-reveal>
          <h2 className={s.h2}>Не просто приём платежей — <span className={s.hl}>весь путь продажи</span></h2>
          <p className={s.lead}>От первой карточки до повторной покупки — в одном боте.</p>
        </div>
        <ol className={s.steps} data-reveal="stagger">
          {STEPS.map((st, i) => (
            <li key={st.href}>
              <a href={st.href} className={s.step}>
                <span className={s.top}>
                  <span className={s.icon}><Icon d={st.icon} size={20} stroke="#FB7E5E" sw={2} /></span>
                  <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                </span>
                <b className={s.title}>{st.title}</b>
                <span className={s.sub}>{st.sub}</span>
                <span className={s.go}>Подробнее<Icon d={P.arrowR} size={16} sw={2.2} /></span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
