import BotLink from "@/components/BotLink";
import { ICON } from "@/components/icons";
import sh from "./shared.module.css";
import s from "./WhoFits.module.css";

const WHO = [
  { text: "Агентствам и продюсерам экспертов", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", bg: "#F5F7FE", iconBg: "#FB7E5E", iconFg: "#fff" },
  { text: "SMM-специалистам и администраторам каналов", icon: "M7.9 20A9 9 0 1 0 4 16.1L2 22z", bg: "#FFF6CC", iconBg: "#0B1233", iconFg: "#7BD0FF" },
  { text: "Блогерам с аудиторией предпринимателей", icon: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6", bg: "#E6F6FF", iconBg: "#fff", iconFg: "#FB7E5E" },
  { text: "Селлерам TG Market, которые рекомендуют сервис коллегам", icon: ICON.heart, bg: "#F5F7FE", iconBg: "#7BD0FF", iconFg: "#0B1233" },
];

export default function WhoFits() {
  return (
    <section className={sh.section}>
      <div className={`container ${sh.inner}`}>
        <h2 className={sh.h2}>Кому подходит программа</h2>
        <div data-reveal="stagger" className={s.grid}>
          {WHO.map((w) => (
            <div key={w.text} className={s.card} style={{ background: w.bg }}>
              <span className={s.icon} style={{ background: w.iconBg }} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={w.iconFg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={w.icon} />
                </svg>
              </span>
              <span className={s.text}>{w.text}</span>
            </div>
          ))}
        </div>
        <div className={s.actions}>
          <BotLink param="site_partner" block="who" className={s.cta}>Стать партнёром</BotLink>
          <span className={s.ask}>
            Есть вопросы?{" "}
            <a href="https://t.me/tgmarket_support" target="_blank" rel="noopener" className={s.link}>Напишите нам</a>
          </span>
        </div>
      </div>
    </section>
  );
}
