import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { ICON } from "@/components/icons";
import { JsonLd, faqLd, meta } from "@/lib/seo";
import HeroA from "./_home/HeroA";
import HeroB from "./_home/HeroB";
import Journey from "./_home/Journey";
import Sell from "./_home/Sell";
import Stage from "./_home/Stage";
import PromoteVisual from "./_home/PromoteVisual";
import ReportVisual from "./_home/ReportVisual";
import AuctionsDonations from "./_home/AuctionsDonations";
import bagWow from "@/assets/mascots/bag-wow.svg";
import bagReceipt from "@/assets/mascots/bag-receipt.svg";
import bagGlasses from "@/assets/mascots/bag-glasses.svg";
import bagLove from "@/assets/mascots/bag-love.svg";
import PhoneStage from "./_home/PhoneStage";
import Niches from "./_home/Niches";
import Why from "./_home/Why";
import Compare from "./_home/Compare";
import PricingTeaser from "./_home/PricingTeaser";
import Cases from "./_home/Cases";
import PartnersTeaser from "./_home/PartnersTeaser";
import HomeFaq from "./_home/HomeFaq";
import { SHOW_COMPARE } from "./_home/flags";
import { HOME_FAQ } from "./_home/faq";

export const metadata = meta(
  "/",
  "TG Market — продажи и приём оплаты по СБП прямо в Telegram",
  "Инструмент продаж в Telegram: создайте карточку в боте, продвигайте её в каналах, принимайте оплату по СБП, управляйте заказами и возвращайте покупателей рассылками. Комиссия от 3%.",
);

/** Вариант первого экрана: "a" — основной, "b" — альтернатива из макета. */
const HERO_VARIANT: "a" | "b" = "a";

const RECEIPT = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8";
const CLOCK = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2";
const FILE = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15l3 3 3-3";
const MAIL = "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6";

/**
 * Главная построена по пути продаж: создал предложение → продвинул → получил заказ и оплату →
 * управляешь заказами → смотришь аналитику → возвращаешь покупателей. Каждый этап — отдельный блок со своим фоном.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(HOME_FAQ)} />
      {HERO_VARIANT === "a" ? <HeroA /> : <HeroB />}
      <Journey />
      <Sell />
      <AuctionsDonations />
      <Stage
        id="promote"
        mascot={{ img: bagWow, pos: { right: -30, bottom: -110 }, size: 130 }}
        step={2}
        kicker="Продвигайте"
        title="Продвигайте товары и находите новых клиентов"
        lead="TG Market помогает не только создать товар, но и привлечь к нему покупателей — все способы продвижения в одном меню бота."
        points={[
          "Публикуйте карточки в своём канале, группах и личных сообщениях",
          "Заказывайте рекламу в других каналах — прямо в боте",
          "Бесплатная публикация в каналах TG Market на аудиторию 10 000 человек",
          "Партнёрская реклама и история рекламных кампаний",
        ]}
        tone="soft"
        visual={<PromoteVisual />}
      />
      <Stage
        id="pay"
        mascot={{ img: bagReceipt, pos: { right: 0, bottom: -10 }, size: 150 }}
        step={3}
        kicker="Получайте заказы и оплату"
        title="Оплата по СБП — прямо из поста"
        lead="Покупатель нажимает «Оплатить» и платит в официальном боте TG Market Pay — по СБП через приложение банка или частями через «Плайт». Без сайта и ввода карты."
        points={[
          "Уведомление о каждой продаже приходит в бот",
          "Покупатель сразу получает товар, доступ или билет с QR-кодом — и чек",
          "Для ИП и юрлиц чеки формируются автоматически и уходят в ОФД",
          "Вывод раз в день от 1 000 ₽ — деньги приходят в течение 3 рабочих дней",
        ]}
        reverse
        visual={
          <PhoneStage
            phone={{ scene: "paid" }}
            cards={[
              { icon: RECEIPT, iconBg: "#FB7E5E", label: "Чек отправлен", value: "в ОФД", pos: { left: -8, top: 150 }, rot: 0 },
              { icon: CLOCK, iconBg: "#0B1233", label: "Выплата", value: "раз в день", pos: { right: -8, top: 360 }, rot: 0 },
            ]}
          />
        }
      />
      <Stage
        id="orders"
        step={4}
        kicker="Управляйте заказами"
        title="Все заказы — под контролем, прямо в боте"
        lead="Не нужно собирать информацию вручную из Telegram, таблиц и банковских операций — все заказы в меню бота."
        points={[
          "Оплаченные, готовые к оплате и незавершённые заказы — отдельными списками",
          "Выберите период или смотрите все заказы сразу",
          "Выгружайте заказы в файл",
          "Настройте уведомления о новых заказах",
        ]}
        tone="soft"
        visual={
          <PhoneStage
            phone={{
              scene: "chat",
              msgs: [
                { me: true, text: "Заказы" },
                {
                  title: "🛒 Меню заказов",
                  text: "Для управления заказами используйте кнопки",
                  cols: 1,
                  buttons: ["✅ Оплаченные (17)", "💳 Готовые к оплате (25)", "📋 Незавершённые заказы (161)", "🧾 Выгрузка всех заказов", "🔔 Настроить уведомления", "📈 Статистика продаж"],
                },
              ],
            }}
            cards={[
              { icon: ICON.check, iconBg: "#18A957", label: "Новый заказ оплачен", value: "+3\u00a0500 ₽", pos: { right: -16, top: 150 }, rot: 0 },
              { icon: FILE, iconBg: "#FB7E5E", label: "Выгрузка готова", value: "orders.xlsx", pos: { left: -40, top: 500 }, rot: 0 },
            ]}
          />
        }
      />
      <Stage
        id="analytics"
        mascot={{ img: bagGlasses, pos: { left: -110, bottom: -70 }, size: 110 }}
        step={5}
        kicker="Анализируйте продажи"
        title="Вся аналитика продаж — в боте"
        lead="Центр отчётности TG Market собирает данные о продажах за вас."
        points={[
          "Мгновенная сводка по продажам за любой период",
          "Автоматическая рассылка отчётов — ежедневно или еженедельно",
          "Статистика продаж: заказы, выручка, средний чек",
          "Отчёты приходят прямо в Telegram — не нужно заходить в отдельный кабинет",
        ]}
        reverse
        visual={<ReportVisual />}
      />
      <Stage
        id="customers"
        mascot={{ img: bagLove, pos: { right: 0, bottom: -10 }, size: 150 }}
        step={6}
        kicker="Возвращайте покупателей"
        title="Возвращайте покупателей и увеличивайте повторные продажи"
        lead="Работайте с клиентами не только в момент покупки — используйте клиентскую базу для коммуникации."
        points={[
          "Отправляйте рассылки по покупателям",
          "Сообщайте о новых товарах, услугах, акциях и спецпредложениях",
          "Дарите скидки по промокодам",
          "Напоминайте об оплате и встречах",
          "Возвращайте клиентов к повторным покупкам",
        ]}
        tone="soft"
        reverse
        visual={
          <PhoneStage
            phone={{
              scene: "chat",
              msgs: [
                { text: "Кому отправить рассылку?", buttons: ["Все покупатели · 1 248", "Купили консультацию · 312"] },
                { me: true, text: "Все покупатели" },
                { text: "Текст рассылки:\n«Открыла запись на ноябрь. Постоянным клиентам — скидка 10% до пятницы»", buttons: ["Записаться"] },
                { me: true, text: "Отправить" },
                { text: "Готово! Рассылка доставлена 1 248 покупателям" },
              ],
            }}
            cards={[
              { icon: MAIL, iconBg: "#0B1233", label: "Рассылка", value: "1 248 получателей", pos: { left: -24, top: 150 }, rot: 0 },
              { icon: ICON.check, iconBg: "#18A957", label: "Повторная покупка", value: "+3 500 ₽", pos: { right: -16, top: 380 }, rot: 0 },
            ]}
          />
        }
      />
      <Why compact />
      <Niches />
      {SHOW_COMPARE && <Compare />}
      <PricingTeaser spaced={!SHOW_COMPARE} />
      <Cases />
      <PartnersTeaser />
      <HomeFaq />
      <FinalCTA param="site_home" />
      <StickyMobileCTA param="site_home" />
    </>
  );
}
