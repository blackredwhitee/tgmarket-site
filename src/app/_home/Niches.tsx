import Link from "next/link";
import { NICHES } from "@/data/niches";
import { Icon, ICON } from "@/components/icons";
import s from "./Niches.module.css";

/** Оформление карточек бенто (Home.dc.html, nicheSrc) — по порядку NICHES. */
const LOOK: Record<string, { sub: string; bg: string; fg: string; iconBg: string; iconFg: string; arrowBg: string; arrowFg: string; basis: string }> = {
  psychologists: { sub: "Продажа сессий и пакетов консультаций", bg: "#1D4FFA", fg: "#fff", iconBg: "rgba(255,255,255,.16)", iconFg: "#fff", arrowBg: "#FFE14A", arrowFg: "#0B1233", basis: "420px" },
  experts: { sub: "Разборы, менторство, консультации", bg: "#0B1233", fg: "#fff", iconBg: "rgba(255,255,255,.1)", iconFg: "#FFE14A", arrowBg: "#fff", arrowFg: "#0B1233", basis: "340px" },
  infoproducts: { sub: "Гайды, чек-листы, курсы", bg: "#FFE14A", fg: "#0B1233", iconBg: "#0B1233", iconFg: "#FFE14A", arrowBg: "#0B1233", arrowFg: "#fff", basis: "300px" },
  events: { sub: "Билеты на онлайн- и офлайн-события", bg: "#EEF2FF", fg: "#0B1233", iconBg: "#1D4FFA", iconFg: "#fff", arrowBg: "#1D4FFA", arrowFg: "#fff", basis: "340px" },
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
