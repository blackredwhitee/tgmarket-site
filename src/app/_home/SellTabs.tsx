"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon, ICON } from "@/components/icons";
import { AuctionMock, DonateMock } from "./AuctionsDonationsMocks";
import cGoods from "@/assets/photos/n-psychologists.jpg";
import cSubs from "@/assets/photos/author.jpg";
import cTickets from "@/assets/photos/case-events.jpg";
import cAuction from "@/assets/photos/auction.jpg";
import cDonate from "@/assets/photos/donate.jpg";
import cLink from "@/assets/photos/consultant.jpg";
import cCash from "@/assets/photos/s-pay.jpg";
import s from "./Sell.module.css";

type Tab = {
  label: string;
  icon: string;
  photo: { src: string };
  title: string;
  text: string;
  who: string[];
  /** Пример карточки поверх фото; для аукциона и доната — живой мокап */
  card?: { title: string; price: string; btn: string };
  mock?: "auction" | "donate";
};

const TABS: Tab[] = [
  {
    label: "Товары и услуги", icon: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8", photo: cGoods,
    title: "Консультации, гайды, разборы и физические товары",
    text: "Создайте карточку в боте за пару минут, опубликуйте в канале — подписчик оплатит по СБП прямо из поста.",
    who: ["Психологам, коучам и экспертам", "Авторам гайдов и шаблонов", "Продавцам физических товаров"],
    card: { title: "Карьерная консультация, 60 мин", price: "4 000 ₽", btn: "Оплатить · 4 000 ₽" },
  },
  {
    label: "Подписки", icon: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM7 11V7a5 5 0 0 1 10 0v4", photo: cSubs,
    title: "Платный доступ к закрытому каналу или чату",
    text: "Бот сам добавляет оплативших в закрытый канал или чат — на месяц или бессрочно.",
    who: ["Авторам закрытых каналов", "Клубам и сообществам", "Создателям обучающего контента"],
    card: { title: "Подписка на закрытый канал", price: "990 ₽ в месяц", btn: "Оформить подписку" },
  },
  {
    label: "Билеты", icon: ICON.ticket, photo: cTickets,
    title: "Билеты на вебинары, мастер-классы и встречи",
    text: "После оплаты гость получает билет с QR-кодом — на входе его достаточно отсканировать.",
    who: ["Организаторам вебинаров", "Ведущим мастер-классов", "Организаторам офлайн-встреч"],
    card: { title: "Билет на воркшоп 12 октября", price: "2 500 ₽", btn: "Купить билет · 2 500 ₽" },
  },
  {
    label: "Аукционы", icon: "m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8", photo: cAuction,
    title: "Аукционы прямо в Telegram",
    text: "Создайте лот, запустите торги и соберите участников — победитель оплачивает через TG Market.",
    who: ["Эксклюзивным товарам и услугам", "Ограниченным лотам", "Благотворительным аукционам"],
    mock: "auction",
  },
  {
    label: "Донаты", icon: ICON.gift, photo: cDonate,
    title: "Поддержка от аудитории в любой сумме",
    text: "Отдельная карточка для добровольных пожертвований. При необходимости покупатель получает электронный чек.",
    who: ["Блогерам и авторам контента", "Сообществам", "Организаторам проектов"],
    mock: "donate",
  },
  {
    label: "Платёжная ссылка", icon: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", photo: cLink,
    title: "Оплата без карточки — одной ссылкой",
    text: "Укажите название и цену — бот даст ссылку на оплату. Отправьте её в личку, чат или куда угодно.",
    who: ["Индивидуальным заказам", "Предоплате и доплатам", "Продажам в личных сообщениях"],
    card: { title: "Индивидуальная сессия", price: "5 000 ₽", btn: "Оплатить по ссылке" },
  },
  {
    label: "Режим кассы", icon: "M2 5h20v14H2zM2 10h20M6 15h4", photo: cCash,
    title: "Принимайте оплату вживую",
    text: "На встрече, мастер-классе или ярмарке: покупатель платит по СБП со своего телефона, вы сразу видите оплату в боте.",
    who: ["Офлайн-мероприятиям и ярмаркам", "Мастерам и частным специалистам", "Продажам на месте, без терминала"],
    card: { title: "Оплата на месте", price: "1 800 ₽", btn: "Оплатить по СБП" },
  },
];

/**
 * «Что продавать» — вкладки-чипы и крупная панель-галерея: большое фото, пример карточки поверх и описание.
 * Смена вкладки — по клику (без автопрокрутки), панель заметно перестраивается с анимацией.
 */
export default function SellTabs() {
  const [tab, setTab] = useState(0);
  const id = useId();
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number) => {
    setTab(i);
    btns.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const n = TABS.length;
    const to = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : d ? (tab + d + n) % n : -1;
    if (to < 0) return;
    e.preventDefault();
    pick(to);
    btns.current[to]?.focus();
  };
  const t = TABS[tab];

  return (
    <div className={s.tabsWrap}>
      <div role="tablist" aria-label="Что можно продавать" className={s.tablist} onKeyDown={onKey}>
        {TABS.map((x, i) => (
          <button
            key={x.label}
            ref={(el) => { btns.current[i] = el; }}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={tab === i}
            aria-controls={`${id}-p`}
            tabIndex={tab === i ? 0 : -1}
            className={`${s.tab} ${tab === i ? s.tabOn : ""}`}
            onClick={() => pick(i)}
          >
            <Icon d={x.icon} size={18} sw={2} />
            {x.label}
          </button>
        ))}
      </div>

      {/* key — чтобы при смене вкладки панель перерисовывалась с анимацией появления */}
      <div key={tab} role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${tab}`} className={s.gallery}>
        <div className={s.media}>
          <img src={t.photo.src} alt="" className={s.mediaImg} />
          <div className={s.overlay} aria-hidden="true">
            {t.mock === "auction" && <AuctionMock />}
            {t.mock === "donate" && <DonateMock />}
            {t.card && (
              <div className={s.exCard}>
                <span className={s.exType}><Icon d={t.icon} size={14} sw={2.2} />{t.label}</span>
                <b className={s.exTitle}>{t.card.title}</b>
                <span className={s.exPrice}>{t.card.price}</span>
                <span className={s.exBtn}>{t.card.btn}</span>
              </div>
            )}
          </div>
        </div>
        <div className={s.info}>
          <span className={s.count}>{String(tab + 1).padStart(2, "0")} / {String(TABS.length).padStart(2, "0")}</span>
          <h3 className={s.h3}>{t.title}</h3>
          <p className={s.text}>{t.text}</p>
          <div className={s.whoTitle}>Кому подходит</div>
          <ul className={s.who}>
            {t.who.map((w) => (
              <li key={w}>
                <span className={s.chk} aria-hidden="true"><Icon d={ICON.check} size={14} stroke="#fff" sw={3} /></span>{w}
              </li>
            ))}
          </ul>
          <div className={s.nav}>
            <button type="button" className={s.navBtn} aria-label="Предыдущая вкладка" onClick={() => pick((tab - 1 + TABS.length) % TABS.length)}>
              <Icon d="M15 18l-6-6 6-6" size={20} sw={2.2} />
            </button>
            <button type="button" className={s.navBtn} aria-label="Следующая вкладка" onClick={() => pick((tab + 1) % TABS.length)}>
              <Icon d="M9 18l6-6-6-6" size={20} sw={2.2} />
            </button>
            <span className={s.navHint}>Дальше: {TABS[(tab + 1) % TABS.length].label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
