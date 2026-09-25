import Link from "next/link";
import BotLink from "./BotLink";
import Qr from "./Qr";
import { Icon, ICON } from "./icons";
import { NICHES } from "@/data/niches";
import logo from "@/assets/logo.svg";
import s from "./Footer.module.css";

const COLS = [
  { title: "Продукт", links: [{ label: "Как это работает", href: "/how-it-works/" }, { label: "Тарифы", href: "/pricing/" }, { label: "FAQ", href: "/faq/" }] },
  { title: "Решения", links: NICHES.map((n) => ({ label: n.title, href: `/solutions/${n.slug}/` })) },
  { title: "Партнёрам", links: [{ label: "Партнёрская программа", href: "/partners/" }] },
  { title: "Компания", links: [{ label: "Контакты", href: "/contacts/" }, { label: "Документы", href: "/legal/offer/" }, { label: "Новости в Telegram", href: "https://t.me/tg_market_seller" }] },
];

export default function Footer() {
  return (
    <footer className={s.footer} data-hide-sticky>
      <div className={`container ${s.wrap}`}>
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/" className={s.logo}>
              <img src={logo.src} alt="TG Market" className={s.logoImg} width={204} height={30} />
            </Link>
            <p className={s.tagline}>Продажи и приём оплаты по СБП прямо в Telegram.</p>
            <div className={s.botRow}>
              <BotLink param="site_home" block="footer" className={s.botBtn}><Icon d={ICON.send} size={16} />Открыть бота</BotLink>
              <div className={s.qr}><Qr size={72} pad={7} radius={12} border="1px solid #E3E7F2" /></div>
            </div>
          </div>
          <div className={s.cols}>
            {COLS.map((c) => (
              <div key={c.title} className={s.col}>
                <div className={s.colTitle}>{c.title}</div>
                {c.links.map((l) => <Link key={l.href + l.label} href={l.href} className={s.link}>{l.label}</Link>)}
              </div>
            ))}
          </div>
        </div>
        <div className={s.bottom}>
          <span className={s.legal}>TG Market — сервис ООО «Открытые интеграционные сервисы» (ООО «ОИС»), ИНН 9709074908, ОГРН 1217700471086. 109028, г. Москва, Серебряническая наб., д. 29. © 2026 TG Market.</span>
          <span className={s.docs}>
            <Link href="/legal/offer/">Оферта для продавцов</Link>
            <Link href="/legal/offer-buyers/">Оферта для покупателей</Link>
            <Link href="/legal/privacy/">Политика обработки персональных данных</Link>
            <Link href="/legal/cookies/">Политика cookie</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
