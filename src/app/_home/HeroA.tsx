import Link from "next/link";
import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import HeroAVisual from "./HeroAVisual";
import Marquee from "./Marquee";
import s from "./HeroA.module.css";

const BOLT = "M13 2 3 14h9l-1 8 10-12h-9z";

/** Главная · Hero A (основной вариант). */
export default function HeroA() {
  return (
    <section className={s.hero} data-hero>
      <div className={`bg-mesh-light ${s.bg}`} aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />
      <div className={`container ${s.wrap}`}>
        <div className={s.text}>
          <span className={s.badge} data-intro="0" data-y="12" data-dur="400">
            <Icon d={BOLT} size={16} sw={2.2} />Новым селлерам — 3% в первый месяц
          </span>
          <h1 className={s.h1}>
            <span className={s.line} data-intro="100">Продавайте прямо</span>
            <span className={s.line} data-intro="180"><span className={s.hl}>в Telegram</span> —</span>
            <span className={s.line} data-intro="260">без сайта и кассы</span>
          </h1>
          <p className={s.sub} data-intro="400" data-dur="500">
            Создайте карточку товара в боте, опубликуйте её в своём канале и принимайте оплату по СБП от подписчиков.
          </p>
          <div className={s.actions}>
            <BotLink param="site_home" block="hero" className={`btn btn-primary ${s.cta}`} data-intro="550">
              <Icon d={ICON.send} size={20} sw={2.2} />Начать продавать
            </BotLink>
            <Link href="#how" className={`btn btn-secondary ${s.ctaSec}`} data-intro="630">Как это работает</Link>
          </div>
          <div className={s.trust} data-intro="700">
            <span>1 000+ селлеров</span><span className={s.dot} aria-hidden="true" />
            <span>Оплата по СБП</span><span className={s.dot} aria-hidden="true" />
            <span>Для самозанятых, ИП и юрлиц</span>
          </div>
        </div>
        <HeroAVisual />
      </div>
      <Marquee />
    </section>
  );
}
