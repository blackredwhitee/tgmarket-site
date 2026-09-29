import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import type { Solution } from "@/data/solutions";
import HeroPhone from "./HeroPhone";
import psychologists from "@/assets/photos/n-psychologists.jpg";
import experts from "@/assets/photos/n-experts.jpg";
import infoproducts from "@/assets/photos/n-infoproducts.jpg";
import events from "@/assets/photos/n-events.jpg";
import donations from "@/assets/photos/n-donations.jpg";
import s from "./Solution.module.css";

/** Фото ниши за телефоном (стоковые, Unsplash License) */
const PHOTO: Record<string, { src: string }> = { psychologists, experts, infoproducts, events, donations };

export default function SolutionHero({ n }: { n: Solution }) {
  return (
    <section className={s.hero}>
      <div className={s.heroPhoto} aria-hidden="true">{PHOTO[n.slug] && <img src={PHOTO[n.slug].src} alt="" />}</div>
      <div className={s.circleYellow} aria-hidden="true" />
      <div className="container">
        <div className={s.heroRow}>
          <div className={s.heroText}>
            <span data-intro="0" className={s.badge}>
              <Icon d={n.icon} size={16} stroke="#7BD0FF" />
              {n.label}
            </span>
            <h1 data-intro="100" className={s.h1}>{n.h1}</h1>
            <p data-intro="250" className={s.heroSub}>{n.sub}</p>
            <BotLink data-intro="400" param={n.param} block="hero" className={`btn btn-primary ${s.heroBtn}`}>
              <Icon d={ICON.send} size={20} sw={2.2} />
              Начать продавать
            </BotLink>
            <span data-intro="500" className={s.heroNote}>Комиссия от 3% · Оплата по СБП</span>
          </div>
          <div data-intro="300" data-y="40" data-dur="900" className={s.heroPhone}>
            <div className={s.heroPhoneInner}>
              <HeroPhone n={n} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
