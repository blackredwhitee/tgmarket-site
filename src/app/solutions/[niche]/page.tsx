import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FinalCTA from "@/components/FinalCTA";
import { SOLUTIONS, TODO_RE, getSolution } from "@/data/solutions";
import { JsonLd, breadcrumbLd, faqLd, meta } from "@/lib/seo";
import SolutionHero from "../_components/SolutionHero";
import Pains from "../_components/Pains";
import Looks from "../_components/Looks";
import Examples from "../_components/Examples";
import Advantages from "../_components/Advantages";
import SolutionFaq from "../_components/SolutionFaq";

type Props = { params: Promise<{ niche: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const n = getSolution(niche);
  if (!n) return {};
  return meta(`/solutions/${n.slug}/`, n.seo.title, n.seo.description);
}

export default async function SolutionPage({ params }: Props) {
  const { niche } = await params;
  const n = getSolution(niche);
  if (!n) notFound();
  const path = `/solutions/${n.slug}/`;
  // Ответы-плейсхолдеры [УТОЧНИТЬ] в разметку FAQPage не отдаём
  const faqForLd = n.faq.filter((f) => !TODO_RE.test(f.a));

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Главная", path: "/" },
          { name: "Решения", path: "/solutions/" },
          { name: n.label, path },
        ])}
      />
      {faqForLd.length > 0 && <JsonLd data={faqLd(faqForLd)} />}
      <SolutionHero n={n} />
      <Pains n={n} />
      <Looks n={n} />
      <Examples n={n} />
      <Advantages n={n} />
      <SolutionFaq items={n.faq} niche={n.slug} />
      <FinalCTA title={n.ctaTitle} param={n.param} />
    </>
  );
}
