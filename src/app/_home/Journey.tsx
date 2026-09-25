import s from "./Journey.module.css";

const STEPS = [
  { href: "#create", title: "Создайте предложение", sub: "товар, услуга, билет, донат, аукцион" },
  { href: "#promote", title: "Продвигайте", sub: "каналы, чаты, площадки для рекламы" },
  { href: "#pay", title: "Получайте заказы и оплату", sub: "по СБП прямо в Telegram" },
  { href: "#orders", title: "Управляйте заказами", sub: "все заказы в меню бота" },
  { href: "#analytics", title: "Анализируйте продажи", sub: "сводки и автоотчёты" },
  { href: "#customers", title: "Возвращайте покупателей", sub: "рассылки и повторные продажи" },
];

/** Главная · обзор пути продаж: TG Market — инструмент продаж, а не только приём платежей. */
export default function Journey() {
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.head} data-reveal>
          <h2 className={s.h2}>Не просто приём платежей — <span className={s.hl}>весь путь продажи</span></h2>
          <p className={s.lead}>От первой карточки до повторной покупки — в одном боте.</p>
        </div>
        <ol className={s.steps} data-reveal="stagger">
          {STEPS.map((st, i) => (
            <li key={st.href}>
              <a href={st.href} className={s.step}>
                <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                <b className={s.title}>{st.title}</b>
                <span className={s.sub}>{st.sub}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
