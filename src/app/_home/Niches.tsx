import Link from "next/link";
import { NICHES } from "@/data/niches";
import { Icon, ICON } from "@/components/icons";
import s from "./Niches.module.css";

/** Оформление карточек бенто (Home.dc.html, nicheSrc) — по порядку NICHES. */
const LOOK: Record<string, { sub: string; bg: string; fg: string; iconBg: string; iconFg: string; arrowBg: string; arrowFg: string; basis: string }> = {
  psychologists: { sub: "Продажа сессий и пакетов консультаций", bg: "#FB7E5E", fg: "#fff", iconBg: "rgba(255,255,255,.16)", iconFg: "#fff", arrowBg: "#7BD0FF", arrowFg: "#0B1233", basis: "420px" },
  experts: { sub: "Разборы, менторство, консультации", bg: "#0B1233", fg: "#fff", iconBg: "rgba(255,255,255,.1)", iconFg: "#7BD0FF", arrowBg: "#fff", arrowFg: "#0B1233", basis: "340px" },
  infoproducts: { sub: "Гайды, чек-листы, курсы", bg: "#7BD0FF", fg: "#0B1233", iconBg: "#0B1233", iconFg: "#7BD0FF", arrowBg: "#0B1233", arrowFg: "#fff", basis: "300px" },
  events: { sub: "Билеты на онлайн- и офлайн-события", bg: "#E6F6FF", fg: "#0B1233", iconBg: "#FB7E5E", iconFg: "#fff", arrowBg: "#FB7E5E", arrowFg: "#fff", basis: "340px" },
  donations: { sub: "Донаты от подписчиков", bg: "#F2F3F7", fg: "#0B1233", iconBg: "#0B1233", iconFg: "#fff", arrowBg: "#0B1233", arrowFg: "#fff", basis: "420px" },
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
              <Link
                key={n.slug}
                href={`/solutions/${n.slug}/`}
                className={s.card}
                style={{ "--basis": l.basis, "--bg": l.bg, "--fg": l.fg } as React.CSSProperties}
              >
                <span className={s.icon} style={{ background: l.iconBg }}>
                  <Icon d={n.icon} size={26} sw={1.8} stroke={l.iconFg} />
                </span>
                <span className={s.title}>{n.title}</span>
                <span className={s.sub}>
                  {l.sub}
                  <span className={s.arrow} style={{ background: l.arrowBg }}>
                    <Icon d={ICON.arrowUpRight} size={20} sw={2.2} stroke={l.arrowFg} />
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
