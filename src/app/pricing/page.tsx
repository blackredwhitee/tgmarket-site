import FinalCTA from "@/components/FinalCTA";
import { JsonLd, faqLd, meta } from "@/lib/seo";
import Hero from "./_components/Hero";
import PricingInteractive from "./_components/PricingInteractive";
import PaymentFaq from "./_components/PaymentFaq";
import { PRICING_FAQ } from "./_components/faq";

// ТЗ §6.4: Title задан; description в ТЗ нет — составлен из текстов страницы. [УТОЧНИТЬ]
export const metadata = meta(
  "/pricing/",
  "Тарифы TG Market — комиссия только с продаж",
  "Платите, только когда продаёте: комиссия с оборота без скрытых платежей, ступенчатая шкала и 3% на 2 месяца для первых селлеров. Посчитайте комиссию в калькуляторе.",
);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqLd(PRICING_FAQ)} />
      <Hero />
      <PricingInteractive />
      <PaymentFaq items={PRICING_FAQ} />
      <FinalCTA
        title="Начните продавать с 3%"
        sub="Первые 2 месяца — сниженная комиссия на весь оборот."
        cta="Начать с 3%"
        param="site_pricing"
      />
    </>
  );
}
