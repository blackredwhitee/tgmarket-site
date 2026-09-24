import BotLink from "@/components/BotLink";
import { Icon, ICON } from "@/components/icons";
import PartnerOrbit from "./PartnerOrbit";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero}>
      <div className={`bg-mesh-light ${s.bg}`} aria-hidden="true" />
      <div className={`container ${s.wrap}`}>
        <div className={s.text}>
          <span data-intro="0" className={s.badge}>Партнёрская программа</span>
          <h1 data-intro="100" className={s.h1}>
            Приводите селлеров — получайте <span className={s.hl}>1%</span> с их оборота
          </h1>
          <p data-intro="250" className={s.sub}>Каждый месяц, пока ваш селлер продаёт. Без ограничения суммы.</p>
          <BotLink data-intro="400" param="site_partner" block="hero" className={s.cta}>
            <Icon d={ICON.send} size={20} sw={2.2} />
            Стать партнёром
          </BotLink>
        </div>
        <div className={s.visual}>
          <PartnerOrbit />
        </div>
      </div>
    </section>
  );
}
