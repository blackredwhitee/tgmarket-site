import { AuctionMock, DonateMock } from "./AuctionsDonationsMocks";
import { LiveBg } from "@/components/Life";
import s from "./AuctionsDonations.module.css";

const FLOW = ["Создайте предложение", "Запустите аукцион", "Соберите участников", "Получите оплату"];

/** Главная · аукционы и донаты — отдельным крупным блоком (шаг 1, продолжение «Что продавать»). */
export default function AuctionsDonations() {
  return (
    <section id="auctions" className={s.section}>
      <LiveBg tone="warm" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h2 className={s.h2} data-reveal>Аукционы и донаты — тоже в TG Market</h2>
        <div className={s.grid} data-reveal="stagger">
          <article className={`${s.card} ${s.dark}`}>
            <span className={s.kicker}>Аукционы</span>
            <h3 className={s.h3}>Проводите аукционы прямо в Telegram</h3>
            <p className={s.p}>
              Создавайте аукционы и принимайте оплату через TG Market. Подходит для товаров, услуг, эксклюзивных
              предложений и ограниченных лотов.
            </p>
            <ol className={s.flow}>
              {FLOW.map((f, i) => (
                <li key={f}><b>{i + 1}</b>{f}</li>
              ))}
            </ol>
            <AuctionMock />
          </article>
          <article className={`${s.card} ${s.light}`}>
            <span className={s.kicker}>Донаты</span>
            <h3 className={s.h3}>Принимайте поддержку от аудитории</h3>
            <p className={s.p}>
              Создавайте отдельные карточки для добровольных пожертвований. Подходит блогерам, авторам контента,
              сообществам и организаторам проектов, которые хотят монетизировать аудиторию в Telegram. При необходимости
              покупатель получает электронный чек.
            </p>
            <DonateMock />
          </article>
        </div>
      </div>
    </section>
  );
}
