import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import HeroCounter from "./HeroCounter";
import t from "./todo.module.css";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={`bg-beams ${s.pattern}`} aria-hidden="true" />
      <div className={`container ${s.wrap}`}>
        <div className={s.text}>
          <h1 data-intro="0" className={s.h1}>Платите, только когда продаёте</h1>
          <p data-intro="150" className={s.sub}>
            Комиссия с оборота без скрытых платежей. Новым селлерам — 3% в первый месяц.{" "}
            <span className={`todo ${t.inline} ${s.subTodo}`}>[УТОЧНИТЬ]</span>
          </p>
          <BotLink data-intro="300" param="site_pricing" block="hero" className={`btn btn-yellow ${s.cta}`}>
            <Icon d={ICON.send} size={20} sw={2.2} />
            Начать с 3%
          </BotLink>
        </div>
        <div data-intro="200" data-y="40" className={s.big}>
          <HeroCounter className={s.pct} />
          <span className={s.sticker}>первый месяц</span>
        </div>
      </div>
    </section>
  );
}
