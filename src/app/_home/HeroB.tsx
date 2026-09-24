import Link from "next/link";
import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import FlowCards from "./FlowCards";
import s from "./HeroB.module.css";

/** Главная · Hero B (альтернативный вариант). */
export default function HeroB() {
  return (
    <section className={s.hero} data-hero>
      <div className={`container ${s.wrap}`}>
        <div className={s.top}>
          <h1 className={s.h1}>
            <span className={s.line} data-intro="100">Продавайте</span>
            <span className={s.line} data-intro="180">прямо в <span className={s.blue}>Telegram</span></span>
            <span className={s.last} data-intro="260">без сайта<span className={s.chip}>и кассы</span></span>
          </h1>
          <div className={s.side} data-intro="400">
            <span className={s.badge}>Новым селлерам — 3% в первый месяц</span>
            <p className={s.sub}>Создайте карточку товара в боте, опубликуйте её в своём канале и принимайте оплату по СБП от подписчиков.</p>
            <div className={s.actions}>
              <BotLink param="site_home" block="hero_b" className={s.cta}>
                <Icon d={ICON.send} size={18} sw={2.2} />Начать продавать
              </BotLink>
              <Link href="#how" className={s.ctaSec}>Как это работает</Link>
            </div>
            <span className={s.trust}>1 000+ селлеров · Оплата по СБП · Самозанятые, ИП, юрлица</span>
          </div>
        </div>
        <FlowCards />
      </div>
    </section>
  );
}
