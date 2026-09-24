import Link from "next/link";
import BotLink from "@/components/BotLink";
import FinalCTA from "@/components/FinalCTA";
import Phone, { type ChatMsg, type PhoneScene } from "@/components/Phone";
import { Icon, ICON } from "@/components/icons";
import { JsonLd, breadcrumbLd, meta } from "@/lib/seo";
import Timeline from "./_components/Timeline";
import StepRow from "./_components/StepRow";
import s from "./page.module.css";

export const metadata = meta(
  "/how-it-works/",
  "Как начать продавать в Telegram с TG Market — пошаговая инструкция",
  "Как подключиться к TG Market, создать карточку товара, опубликовать её в канале и принимать оплату по СБП.",
);

const LABELS = ["Запустите бота", "Выберите статус", "Куда получать деньги", "Создайте карточку", "Опубликуйте в канале", "Принимайте оплату"];

type Step = { title: string; text: string; note?: string; scene: PhoneScene; msgs?: ChatMsg[] };

const STEPS: Step[] = [
  { title: "Запустите бота", text: "Откройте @TGMarketSellerBot и нажмите «Старт».", scene: "chat", msgs: [{ me: true, text: "/start" }, { text: "Здравствуйте! Я помогу принимать оплату в вашем Telegram-канале. Начнём?", buttons: ["Начать"] }] },
  { title: "Выберите статус", text: "Физлицу или самозанятому достаточно номера телефона. Для ИП и юрлиц подключение занимает до недели.", scene: "chat", msgs: [{ text: "Выберите ваш статус:", buttons: ["Самозанятый", "ИП", "Юрлицо"] }, { me: true, text: "Самозанятый" }, { text: "Отлично! Укажите номер телефона — на него будут приходить выплаты." }] },
  { title: "Укажите, куда получать деньги", text: "Физлица и самозанятые получают выплаты по номеру телефона через СБП, ИП и юрлица — на расчётный счёт компании.", scene: "chat", msgs: [{ text: "Куда перечислять выручку?", buttons: ["Добавить реквизиты"] }, { me: true, text: "Реквизиты отправлены" }, { text: "Готово! Выплаты будут приходить по СБП — до 3 рабочих дней." }] },
  { title: "Создайте карточку", text: "Выберите тип — товар, услуга, билет или донат, — добавьте название, описание, цену и обложку.", scene: "form" },
  { title: "Опубликуйте в канале", text: "Карточку с кнопкой оплаты можно опубликовать в канале, в группе или отправить покупателю в личные сообщения.", scene: "post" },
  { title: "Принимайте оплату", text: "Подписчики оплачивают по СБП, а бот сообщает о каждой продаже.", scene: "paid" },
];
const BLOBS = ["#EEF2FF", "#FFE14A", "#EEF2FF", "#1D4FFA", "#FFE14A", "#0B1233"];

const BUYER: { n: number; scene: PhoneScene; text: string }[] = [
  { n: 1, scene: "post", text: "Видит пост с карточкой в канале и нажимает «Оплатить»." },
  { n: 2, scene: "sbp", text: "Выбирает банк и подтверждает оплату по СБП." },
  { n: 3, scene: "done", text: "Получает подтверждение и покупку: цифровой товар — ссылкой, билет — QR-кодом." },
];

const MONEY = [
  { title: "Когда приходят деньги", text: "До 3 рабочих дней: по СБП на номер телефона или на расчётный счёт. Минимальная сумма вывода — 1 000 ₽.", icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2", bg: "#F2F3F7", fg: "#0B1233", iconBg: "#0B1233", iconFg: "#FFE14A" },
  { title: "Комиссия", text: "Удерживается с оборота по тарифу.", icon: "M19 5 5 19M6.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", bg: "#1D4FFA", fg: "#fff", iconBg: "#FFE14A", iconFg: "#0B1233", link: true },
  { title: "Чеки и налоги", text: "Касса наша: для ИП и юрлиц чеки формируются автоматически и уходят в ОФД. Самозанятые выдают чеки в «Мой налог» сами.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8", bg: "#FFE14A", fg: "#0B1233", iconBg: "#0B1233", iconFg: "#fff" },
];

const BLOB_R = ["50%", "38% 62% 55% 45%", "120px"];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: "Как это работает", path: "/how-it-works/" }])} />

      <section className={s.hero}>
        <div className={s.heroDots} aria-hidden="true" />
        <div className={s.heroGlow} aria-hidden="true" />
        <div className={`container ${s.heroIn}`}>
          <span data-intro="0" data-y="12" className={s.badge}>6 шагов · один бот</span>
          <h1 data-intro="100" className={s.h1}>Как начать продавать <span className={s.yellow}>в Telegram</span></h1>
          <p data-intro="250" className={s.lead}>От регистрации до первой оплаты — всё в одном боте.</p>
          <BotLink data-intro="380" param="site_how" block="hero" className={s.heroBtn}>
            <Icon d={ICON.send} size={20} sw={2.2} />Открыть бота
          </BotLink>
          <Timeline labels={LABELS} />
        </div>
      </section>

      <section className={s.steps}>
        <div className={`container ${s.stepsIn}`}>
          {STEPS.map((st, i) => {
            const odd = i % 2 === 1;
            return (
              <StepRow
                key={st.title}
                n={i + 1}
                reverse={odd}
                text={
                  <>
                    <span className={s.num} style={odd ? { color: "transparent", WebkitTextStroke: "2px #1D4FFA" } : { color: "#1D4FFA" }} aria-hidden="true">0{i + 1}</span>
                    <h2 className={s.stepH2}><span className="sr-only">Шаг {i + 1}. </span>{st.title}</h2>
                    <p className={s.stepP}>{st.text}</p>
                    {st.note && <span className={`todo ${s.note}`}>{st.note}</span>}
                  </>
                }
                media={
                  <>
                    <div className={s.blob} aria-hidden="true" style={{ borderRadius: BLOB_R[i % 3], background: BLOBS[i], transform: `rotate(${odd ? -8 : 6}deg)` }} />
                    <div className={s.phoneWrap}><Phone scene={st.scene} msgs={st.msgs} /></div>
                  </>
                }
              />
            );
          })}
        </div>
      </section>

      <section className={s.buyer}>
        <div className={s.buyerDots} aria-hidden="true" />
        <div className={`container ${s.buyerIn}`}>
          <h2 className={s.h2Light}>Что видит ваш покупатель</h2>
          <ol data-reveal="stagger" className={s.buyerRow}>
            {BUYER.map((b) => (
              <li key={b.n} className={s.buyerItem}>
                <div className={s.buyerPhone}><Phone scene={b.scene} /></div>
                <div className={s.buyerCap}>
                  <span className={s.buyerNum} aria-hidden="true">{b.n}</span>
                  <span className={s.buyerText}>{b.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.money}>
        <div className={`container ${s.moneyIn}`}>
          <h2 className={s.h2}>Деньги и документы</h2>
          <div data-reveal="stagger" className={s.cards}>
            {MONEY.map((c) => (
              <div key={c.title} className={s.card} style={{ background: c.bg, color: c.fg }}>
                <span className={s.cardIcon} style={{ background: c.iconBg }}><Icon d={c.icon} size={26} stroke={c.iconFg} sw={1.8} /></span>
                <h3 className={s.cardH3}>{c.title}</h3>
                <p className={s.cardP}>{c.text}</p>
                {c.link && <Link href="/pricing/" className={s.cardLink} style={{ color: c.fg }}>Подробнее о тарифах →</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA title="Готовы попробовать?" sub="Откройте бота, создайте первую карточку и опубликуйте её в канале." cta="Создать первую карточку" param="site_how" />
    </>
  );
}
