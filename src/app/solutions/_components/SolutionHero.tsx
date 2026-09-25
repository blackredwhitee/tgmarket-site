import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import type { Solution } from "@/data/solutions";
import HeroPhone from "./HeroPhone";
import s from "./Solution.module.css";

export default function SolutionHero({ n }: { n: Solution }) {
  return (
    <section className={s.hero}>
      <div className={s.circleBlue} aria-hidden="true" />
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
            <span data-intro="500" className={s.heroNote}>Первым селлерам — 3% на 2 месяца · Оплата по СБП</span>
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
