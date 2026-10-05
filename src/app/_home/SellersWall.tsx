import psychologist from "@/assets/photos/psychologist.jpg";
import therapist from "@/assets/photos/therapist.jpg";
import fitness from "@/assets/photos/fitness.jpg";
import author from "@/assets/photos/author.jpg";
import florist from "@/assets/photos/florist.jpg";
import blogger from "@/assets/photos/blogger.jpg";
import photographer from "@/assets/photos/photographer.jpg";
import baker from "@/assets/photos/baker.jpg";
import organizer from "@/assets/photos/organizer.jpg";
import expert from "@/assets/photos/expert.jpg";
import consultant from "@/assets/photos/consultant.jpg";
import designer from "@/assets/photos/designer.jpg";
import handmade from "@/assets/photos/handmade.jpg";
import tutor from "@/assets/photos/tutor.jpg";
import { SELLERS } from "@/lib/config";
import s from "./SellersWall.module.css";

/** Фото — стоковые (Unsplash License), подписи — типовые ниши продавцов, суммы — пример оплат. */
type Card = { img: { src: string }; niche: string; sale: string };

const ROW1: Card[] = [
  { img: psychologist, niche: "Психолог", sale: "3 500 ₽" },
  { img: fitness, niche: "Фитнес-тренер", sale: "2 900 ₽" },
  { img: author, niche: "Автор курса", sale: "7 990 ₽" },
  { img: florist, niche: "Флорист", sale: "4 200 ₽" },
  { img: blogger, niche: "Блогер", sale: "500 ₽" },
  { img: photographer, niche: "Фотограф", sale: "12 000 ₽" },
  { img: tutor, niche: "Репетитор", sale: "1 800 ₽" },
];
const ROW2: Card[] = [
  { img: organizer, niche: "Организатор событий", sale: "2 500 ₽" },
  { img: baker, niche: "Домашняя пекарня", sale: "1 450 ₽" },
  { img: expert, niche: "Эксперт по маркетингу", sale: "9 000 ₽" },
  { img: consultant, niche: "Консультант", sale: "5 000 ₽" },
  { img: designer, niche: "Иллюстратор", sale: "3 300 ₽" },
  { img: handmade, niche: "Мастер handmade", sale: "2 700 ₽" },
  { img: therapist, niche: "Психотерапевт", sale: "6 000 ₽" },
];

const STATS = [
  { v: `${SELLERS.label}`, l: "продавцов в TG Market" },
  { v: "9", l: "инструментов продаж в одном боте" },
  { v: "от 3%", l: "комиссия — только с продаж" },
  { v: "1–3 дня", l: "до поступления выплаты" },
];

function Row({ cards, reverse }: { cards: Card[]; reverse?: boolean }) {
  // Лента дублируется, чтобы бесконечная прокрутка была бесшовной
  const all = [...cards, ...cards];
  return (
    <div className={s.row} aria-hidden="true">
      <div data-marquee className={`${s.track} ${reverse ? s.rev : ""}`}>
        {all.map((c, i) => (
          <figure key={i} className={s.card}>
            <img src={c.img.src} alt="" loading="lazy" width={220} height={280} />
            <span className={s.sale}><i />+{c.sale}</span>
            <figcaption className={s.niche}>{c.niche}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Главная · масштаб: тысячи продавцов из разных ниш — две бегущие навстречу ленты фото + цифры. */
export default function SellersWall() {
  return (
    <section className={s.section}>
      <div className={`container ${s.head}`} data-reveal>
        <h2 className={s.h2}>
          Уже <span className={s.hl}>{SELLERS.label}</span> продавцов принимают оплату в Telegram
        </h2>
        <p className={s.lead}>
          Психологи и коучи, эксперты, авторы курсов, мастера, флористы, фотографы, блогеры и организаторы событий —
          продают своей аудитории прямо в каналах и чатах.
        </p>
      </div>
      <div className={s.rows}>
        <Row cards={ROW1} />
        <Row cards={ROW2} reverse />
      </div>
      <div className="container">
        <ul className={s.stats} data-reveal="stagger">
          {STATS.map((x) => (
            <li key={x.l}><b>{x.v}</b><span>{x.l}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
