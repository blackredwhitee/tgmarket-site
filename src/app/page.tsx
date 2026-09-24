import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { JsonLd, faqLd, meta } from "@/lib/seo";
import HeroA from "./_home/HeroA";
import HeroB from "./_home/HeroB";
import Pain from "./_home/Pain";
import Steps from "./_home/Steps";
import Sell from "./_home/Sell";
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
  "Создайте карточку товара в боте, опубликуйте в своём канале и принимайте оплату по СБП от подписчиков. Для самозанятых, ИП и юрлиц. Новым селлерам — 3% в первый месяц.",
);

/** Вариант первого экрана: "a" — основной, "b" — альтернатива из макета. */
const HERO_VARIANT: "a" | "b" = "a";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(HOME_FAQ)} />
      {HERO_VARIANT === "a" ? <HeroA /> : <HeroB />}
      <Pain />
      <Steps />
      <Sell />
      <Niches />
      <Why />
      {SHOW_COMPARE && <Compare />}
      <PricingTeaser />
      <Cases />
      <PartnersTeaser />
      <HomeFaq />
      <FinalCTA param="site_home" />
      <StickyMobileCTA param="site_home" />
    </>
  );
}
