import Link from "next/link";
import { NICHES } from "@/data/niches";
import { Icon, ICON } from "@/components/icons";
import psychologists from "@/assets/photos/n-psychologists.jpg";
import experts from "@/assets/photos/n-experts.jpg";
import infoproducts from "@/assets/photos/n-infoproducts.jpg";
import events from "@/assets/photos/n-events.jpg";
import donations from "@/assets/photos/n-donations.jpg";
import s from "./Niches.module.css";

/** Фото-карточки ниш (стоковые фото, Unsplash License). Порядок — как в NICHES; ширины — бенто 3+2. */
const LOOK: Record<string, { sub: string; img: { src: string }; basis: string }> = {
  psychologists: { sub: "Продажа сессий и пакетов консультаций", img: psychologists, basis: "420px" },
  experts: { sub: "Разборы, менторство, консультации", img: experts, basis: "340px" },
  infoproducts: { sub: "Гайды, чек-листы, курсы", img: infoproducts, basis: "300px" },
  events: { sub: "Билеты на онлайн- и офлайн-события", img: events, basis: "340px" },
  donations: { sub: "Донаты от подписчиков", img: donations, basis: "420px" },
};

export default function Niches() {
  return (
    <section className={s.section}>
      <div className="container">
        <h2 className={s.h2}>TG Market для вашей ниши</h2>
        <div className={s.grid} data-reveal="stagger">
          {NICHES.map((n) => {
            const l = LOOK[n.slug];
            return (
              <Link key={n.slug} href={`/solutions/${n.slug}/`} className={s.card} style={{ "--basis": l.basis } as React.CSSProperties}>
                <img className={s.photo} src={l.img.src} alt="" loading="lazy" />
                <span className={s.icon}>
                  <Icon d={n.icon} size={24} sw={1.9} stroke="#fff" />
                </span>
                <span className={s.title}>{n.title}</span>
                <span className={s.sub}>
                  {l.sub}
                  <span className={s.arrow}>
                    <Icon d={ICON.arrowUpRight} size={20} sw={2.2} stroke="#fff" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
