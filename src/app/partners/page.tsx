import FinalCTA from "@/components/FinalCTA";
import { JsonLd, breadcrumbLd, meta } from "@/lib/seo";
import Hero from "./_components/Hero";
import HowSteps from "./_components/HowSteps";
import IncomeCalc from "./_components/IncomeCalc";
import WhoFits from "./_components/WhoFits";

// Title и H1 — ТЗ §6.5. Description в ТЗ для страницы не задан — собран из текстов hero.
export const metadata = meta(
  "/partners/",
  "Партнёрская программа TG Market — 1% с оборота приведённых селлеров",
  "Приводите селлеров в TG Market и получайте 1% с их оборота каждый месяц, пока селлер продаёт. Без ограничения суммы.",
);

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: "Партнёрам", path: "/partners/" }])} />
      <Hero />
      <HowSteps />
      <IncomeCalc />
      <WhoFits />
      <FinalCTA
        title="Рекомендуйте TG Market и зарабатывайте"
        sub="1% с оборота каждого приведённого селлера — каждый месяц, без потолка."
        cta="Стать партнёром"
        param="site_partner"
      />
    </>
  );
}
