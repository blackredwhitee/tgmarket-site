import BotLink from "./BotLink";
import Phone from "./Phone";
import Qr from "./Qr";
import Anim from "./FinalCTAAnim";
import { Icon, ICON } from "./icons";
import s from "./FinalCTA.module.css";

type Props = { title?: string; sub?: string; cta?: string; param?: string };

const CHECKS = ["Оплата по СБП", "Без сайта и кассы", "Самозанятые, ИП, юрлица"];
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9z";

/** Финальный CTA (v2): синяя карточка на белом фоне, телефон со сценой `paid`. */
export default function FinalCTA({
  title = "Откройте продажи в своём канале сегодня",
  sub = "Регистрация в боте, первая карточка — и можно публиковать.",
  cta = "Начать продавать",
  param = "site_home",
}: Props) {
  return (
    <section className={s.section} data-hide-sticky>
      <div className="container">
        <div className={s.card}>
          <div className={`bg-beams ${s.beams}`} aria-hidden="true" />
          <Anim kind="breathe" className={s.ring1} />
          <div className={s.ring2} aria-hidden="true" />
          <Anim kind="drift" className={s.glow} />
          <div className={s.wrap}>
            <div className={s.text}>
              <span className={s.badge}><Icon d={ZAP} size={16} sw={2.2} />Первым селлерам — 3% на 2 месяца</span>
              <h2 className={s.h2}>{title}</h2>
              <p className={s.sub}>{sub}</p>
              <ul className={s.checks}>
                {CHECKS.map((c) => (
                  <li key={c}><span className={s.chk}><Icon d={ICON.check} size={13} stroke="#fff" sw={3.2} /></span>{c}</li>
                ))}
              </ul>
              <div className={s.actions}>
                <BotLink param={param} block="final_cta" className={s.btn}><Icon d={ICON.send} size={20} sw={2.2} />{cta}</BotLink>
                <div className={s.qr}>
                  <Qr param={param} size={64} pad={6} radius={12} />
                  <span>Откройте бота с телефона</span>
                </div>
              </div>
            </div>
            <div className={s.visual}>
              <div className={s.sun} aria-hidden="true" />
              <div className={s.phone}><Phone scene="paid" /></div>
              <Anim kind="bob" dur={5600} phase={0} className={s.f1}>
                <div className={s.paidCard}>
                  <span className={s.paidIcon}><Icon d={ICON.check} size={18} stroke="#fff" sw={3} /></span>
                  <span className={s.paidText}><span>Оплата получена</span><b>+3 500 ₽</b></span>
                </div>
              </Anim>
              <Anim kind="bob" dur={6800} phase={2500} className={s.f2}>
                <div className={s.todayCard}><span>Сегодня</span><b>3 продажи</b></div>
              </Anim>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
