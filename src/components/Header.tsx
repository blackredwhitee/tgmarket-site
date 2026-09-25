"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BotLink from "./BotLink";
import { Icon, ICON } from "./icons";
import { NICHES } from "@/data/niches";
import { pageParam } from "@/lib/params";
import logo from "@/assets/logo.svg";
import s from "./Header.module.css";

const NAV = [
  { href: "/how-it-works/", label: "Как это работает", key: "how" },
  { href: "/solutions/", label: "Решения", key: "solutions" },
  { href: "/pricing/", label: "Тарифы", key: "pricing" },
  { href: "/partners/", label: "Партнёрам", key: "partners" },
  { href: "/faq/", label: "FAQ", key: "faq" },
];

export default function Header() {
  const path = usePathname() || "/";
  const param = pageParam(path);
  const active = NAV.find((n) => path.startsWith("/" + n.href.split("/")[1]))?.key;
  const [dd, setDd] = useState(false);
  const [menu, setMenu] = useState(false);
  const [small, setSmall] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setSmall(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    if (menu && menuRef.current) {
      menuRef.current.querySelectorAll<HTMLElement>("[data-mi]").forEach((el, i) =>
        el.animate?.([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }], {
          duration: 400, delay: i * 50, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards",
        }),
      );
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  useEffect(() => setMenu(false), [path]);

  return (
    <header className={`${s.header} ${small ? s.small : ""}`}>
      <div className={s.inner}>
        <Link href="/" className={s.logo} aria-label="TG Market — на главную">
          <img src={logo.src} alt="TG Market" className={s.logoImg} width={204} height={30} />
        </Link>
        <nav className={s.nav} aria-label="Основное меню">
          {NAV.map((n) =>
            n.key === "solutions" ? (
              <div key={n.key} className={s.ddWrap} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}
                onFocus={() => setDd(true)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDd(false)}>
                <Link href={n.href} className={`${s.link} ${s.ddLink} ${active === n.key ? s.active : ""}`} aria-haspopup="true" aria-expanded={dd}>
                  {n.label}
                  <Icon d={ICON.chevronDown} size={16} className={s.chev} style={{ transform: dd ? "rotate(180deg)" : "none" }} />
                </Link>
                <div className={`${s.dd} ${dd ? s.ddOpen : ""}`}>
                  <div className={s.ddPanel}>
                    {NICHES.map((x) => (
                      <Link key={x.slug} href={`/solutions/${x.slug}/`} className={s.ddItem} onClick={() => setDd(false)}>
                        <span className={s.ddIcon}><Icon d={x.icon} size={20} stroke="#FB7E5E" sw={1.8} /></span>
                        <span className={s.ddText}><span className={s.ddTitle}>{x.title}</span><span className={s.ddSub}>{x.sub}</span></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.key} href={n.href} className={`${s.link} ${active === n.key ? s.active : ""}`}>{n.label}</Link>
            ),
          )}
        </nav>
        <BotLink param={param} block="header" className={s.cta}>
          <Icon d={ICON.send} size={18} />Начать продавать
        </BotLink>
        <button className={s.burger} onClick={() => setMenu((m) => !m)} aria-label={menu ? "Закрыть меню" : "Меню"} aria-expanded={menu}>
          <Icon d={menu ? ICON.x : ICON.menu} size={24} />
        </button>
      </div>
      {menu && (
        <div ref={menuRef} className={s.mobileMenu}>
          <Link data-mi href="/how-it-works/" className={s.mItem}>Как это работает</Link>
          <div data-mi className={s.mItem} style={{ borderBottom: 0, paddingBottom: 8 }}>Решения</div>
          {NICHES.map((x) => (
            <Link data-mi key={x.slug} href={`/solutions/${x.slug}/`} className={s.mNiche}>
              <Icon d={x.icon} size={20} stroke="#FB7E5E" sw={1.8} />{x.title}
            </Link>
          ))}
          <Link data-mi href="/pricing/" className={`${s.mItem} ${s.mTop}`} style={{ marginTop: 8 }}>Тарифы</Link>
          <Link data-mi href="/partners/" className={`${s.mItem} ${s.mTop}`}>Партнёрам</Link>
          <Link data-mi href="/faq/" className={`${s.mItem} ${s.mTop}`}>FAQ</Link>
          <BotLink data-mi param={param} block="mobile_menu" className={s.mCta}>
            <Icon d={ICON.send} size={18} />Начать продавать
          </BotLink>
        </div>
      )}
    </header>
  );
}
