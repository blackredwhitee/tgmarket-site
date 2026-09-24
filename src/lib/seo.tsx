import type { Metadata } from "next";
import { SITE_URL } from "./config";

/** Метаданные страницы: title, description, canonical, OG/Twitter. */
export function meta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "TG Market", locale: "ru_RU", type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export const ORG_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", name: "TG Market", url: SITE_URL, sameAs: ["https://t.me/TGMarketSellerBot"] },
    { "@type": "WebSite", name: "TG Market", url: SITE_URL, inLanguage: "ru" },
  ],
};

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // Заглушки [УТОЧНИТЬ …] в поисковую разметку не отдаём; вопрос без готового ответа пропускаем.
    mainEntity: items
      .map((i) => ({ q: i.q, a: i.a.replace(/\[УТОЧНИТЬ[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim() }))
      .filter((i) => i.a.length > 0)
      .map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: SITE_URL + it.path })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
