import Link from "next/link";
import { Icon, ICON } from "@/components/icons";
import { JsonLd, breadcrumbLd, meta } from "@/lib/seo";
import s from "./page.module.css";

const PATH = "/contacts/";

export const metadata = meta(
  PATH,
  "Контакты TG Market — поддержка селлеров, партнёрство, пресса",
  "Как связаться с TG Market: поддержка селлеров, партнёрство и сотрудничество, запросы прессы. Реквизиты оператора сервиса.",
);

// Пути иконок в стиле Lucide (нет в общем наборе)
const I = {
  message: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
};

type Card = {
  id: string;
  tone: "blue" | "soft" | "dark";
  icon: string;
  title: string;
  text: string;
  todo: string;
  link?: { href: string; label: string };
};

const CARDS: Card[] = [
  { id: "support", tone: "blue", icon: I.message, title: "Поддержка селлеров", text: "Помощь с регистрацией в боте, карточками, оплатами и выплатами. Ответим в Telegram.", todo: "[УТОЧНИТЬ: бот/аккаунт поддержки]", link: { href: "/faq/", label: "Сначала загляните в FAQ" } },
  { id: "partners", tone: "soft", icon: I.users, title: "Партнёрство и сотрудничество", text: "Партнёрская программа, интеграции и совместные проекты.", todo: "[УТОЧНИТЬ: e-mail]", link: { href: "/partners/", label: "Партнёрская программа" } },
  { id: "press", tone: "dark", icon: I.file, title: "Пресса", text: "Запросы СМИ, комментарии и материалы о сервисе.", todo: "[УТОЧНИТЬ]" },
];

const REQUISITES = ["Оператор сервиса", "ИНН", "ОГРН", "Юридический адрес"];

const DOCS = [
  { href: "/legal/offer/", label: "Публичная оферта" },
  { href: "/legal/privacy/", label: "Политика обработки персональных данных" },
  { href: "/legal/cookies/", label: "Политика cookie" },
];

export default function ContactsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: "Контакты", path: PATH }])} />

      <section className={`${s.hero} bg-mesh-light`}>
        <div className={s.sun} aria-hidden="true" />
        <div className={`container ${s.heroInner}`}>
          <h1 className={s.h1} data-reveal>Связаться с <span className={s.hl}>TG Market</span></h1>
          <p className={s.sub} data-reveal>Поддержка селлеров, партнёрство и вопросы прессы — выберите, куда написать.</p>
        </div>
      </section>

      <section className={s.section} aria-label="Каналы связи">
        <div className="container">
          <div className={s.cards} data-reveal="stagger">
            {CARDS.map((c) => (
              <article key={c.id} id={c.id} className={`${s.card} ${s[c.tone]}`}>
                <span className={s.icon} aria-hidden="true"><Icon d={c.icon} size={26} sw={2} /></span>
                <h2 className={s.cardTitle}>{c.title}</h2>
                <p className={s.cardText}>{c.text}</p>
                <div className={`todo ${s.cardTodo}`}>{c.todo}</div>
                {c.link && (
                  <Link href={c.link.href} className={s.cardLink}>
                    {c.link.label}<Icon d={ICON.arrowRight} size={18} sw={2.2} />
                  </Link>
                )}
              </article>
            ))}
          </div>

          <div className={s.req} data-reveal>
            <div className={s.reqHead}>
              <h2 className={s.h2}>Реквизиты</h2>
              <p className={s.reqSub}>TG Market — сервис компании-оператора. Данные для договоров и документов.</p>
            </div>
            <dl className={s.dl}>
              {REQUISITES.map((r) => (
                <div key={r} className={s.dlRow}>
                  <dt>{r}</dt>
                  <dd><span className="todo">[УТОЧНИТЬ]</span></dd>
                </div>
              ))}
            </dl>
            <ul className={s.docs}>
              {DOCS.map((d) => (
                <li key={d.href}><Link href={d.href}>{d.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
