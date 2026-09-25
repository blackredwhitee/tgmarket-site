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
import OrdersVisual from "./_home/OrdersVisual";
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
const MAIL = "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6";

/**
 * Главная построена по пути продаж: создал предложение → продвинул → получил заказ и оплату →
 * управляешь заказами → возвращаешь покупателей. Каждый этап — отдельный блок со своим фоном.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(HOME_FAQ)} />
      {HERO_VARIANT === "a" ? <HeroA /> : <HeroB />}
      <Journey />
      <Sell />
      <Stage
        id="promote"
        step={2}
        kicker="Продвигайте"
        title="Продвигайте товары и находите новых клиентов"
        lead="TG Market помогает не только создать товар, но и привлечь к нему покупателей."
        points={[
          "Размещайте карточки в Telegram-каналах, группах и личных сообщениях",
          "Используйте базу релевантных площадок для рекламы",
          "Делитесь готовыми карточками и платёжными ссылками",
          "Привлекайте новую аудиторию прямо из Telegram",
        ]}
        visual={<PromoteVisual />}
      />
      <Stage
        id="pay"
        step={3}
        kicker="Получайте заказы и оплату"
        title="Оплата по СБП — прямо из поста"
        lead="Покупатель нажимает «Оплатить» и подтверждает платёж в приложении своего банка. Без переходов на сайт и ввода карты."
        points={[
          "Уведомление о каждой продаже приходит в бот",
          "Цифровой товар — ссылкой сразу после оплаты, билет — QR-кодом",
          "Для ИП и юрлиц чеки формируются автоматически и уходят в ОФД",
          "Выплаты — до 3 рабочих дней по СБП или на расчётный счёт",
        ]}
        tone="soft"
        reverse
        visual={
          <PhoneStage
            phone={{ scene: "paid" }}
            cards={[
              { icon: RECEIPT, iconBg: "#FB7E5E", label: "Чек отправлен", value: "в ОФД", pos: { left: -8, top: 120 }, rot: -4 },
              { icon: CLOCK, iconBg: "#0B1233", label: "Выплата", value: "до 3 дней", pos: { right: -8, top: 360 }, rot: 3 },
            ]}
          />
        }
      />
      <Stage
        id="orders"
        step={4}
        kicker="Управляйте заказами"
        title="Все заказы — под контролем"
        lead="Не нужно собирать информацию вручную из Telegram, таблиц и банковских операций — данные о продажах в одном месте."
        points={[
          "Просматривайте все заказы, фильтруйте и ищите нужные покупки",
          "Отслеживайте оплаты и получайте уведомления о новых заказах",
          "Анализируйте продажи",
          "Выгружайте данные о заказах за любой период",
        ]}
        visual={<OrdersVisual />}
      />
      <Stage
        id="customers"
        step={5}
        kicker="Возвращайте покупателей"
        title="Возвращайте покупателей и увеличивайте повторные продажи"
        lead="Работайте с клиентами не только в момент покупки — используйте клиентскую базу для коммуникации."
        points={[
          "Отправляйте рассылки покупателям",
          "Сообщайте о новых товарах, услугах, акциях и спецпредложениях",
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
                { text: "Кому отправить рассылку?", buttons: ["Все покупатели · 1 248", "Купили консультацию · 312"] },
                { me: true, text: "Все покупатели" },
                { text: "Текст рассылки:\n«Открыла запись на ноябрь. Постоянным клиентам — скидка 10% до пятницы»", buttons: ["Записаться"] },
                { me: true, text: "Отправить" },
                { text: "Готово! Рассылка доставлена 1 248 покупателям" },
              ],
            }}
            cards={[
              { icon: MAIL, iconBg: "#0B1233", label: "Рассылка", value: "1 248 получателей", pos: { left: -24, top: 90 }, rot: -4 },
              { icon: ICON.check, iconBg: "#18A957", label: "Повторная покупка", value: "+3 500 ₽", pos: { right: -16, top: 380 }, rot: 4 },
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
