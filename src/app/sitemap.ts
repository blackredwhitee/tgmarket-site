import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { NICHES } from "@/data/niches";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/how-it-works/", "/pricing/", "/partners/", "/faq/", "/contacts/",
    ...NICHES.map((n) => `/solutions/${n.slug}/`),
    "/legal/offer/", "/legal/offer-buyers/", "/legal/privacy/", "/legal/cookies/",
  ];
  return paths.map((p) => ({ url: SITE_URL + p, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
