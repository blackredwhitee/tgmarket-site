import { Icon } from "@/components/icons";
import WhyCounters from "./WhyCounters";
import { P } from "./paths";
import s from "./Why.module.css";

const ADVS: { icon: string; title: string; text: string; note?: string }[] = [
  { icon: P.users, title: "Там, где ваша аудитория", text: "Продажи идут в канале — подписчикам не нужно никуда переходить." },
  { icon: P.phone, title: "Оплата по СБП", text: "Привычный способ оплаты для покупателя." },
  { icon: P.user, title: "Для любого статуса", text: "Самозанятые, ИП и юридические лица." },
  { icon: P.percent, title: "Комиссия только с продаж", text: "Подключение бесплатное, абонентской платы нет — платите процент только с продаж." },
  { icon: P.layers, title: "Всё в одном боте", text: "Карточки, продажи, уведомления об оплатах и вывод денег — в @TGMarketSellerBot." },
];

export default function Why() {
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <h2 className={s.h2}>Почему TG Market</h2>
        <WhyCounters />
        <div className={s.advs} data-reveal="stagger">
          {ADVS.map((a) => (
            <div key={a.title} className={s.adv}>
              <span className={s.advIcon}><Icon d={a.icon} size={24} sw={1.8} stroke="#fff" /></span>
              <h3 className={s.h3}>{a.title}</h3>
              <p className={s.text}>{a.text}</p>
              {a.note && <span className={`todo ${s.note}`}>{a.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
