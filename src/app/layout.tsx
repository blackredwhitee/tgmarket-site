import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import SiteScripts from "@/components/SiteScripts";
import CookieBanner from "@/components/CookieBanner";
import { SITE_URL, SHOW_TODO } from "@/lib/config";
import { JsonLd, ORG_LD } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TG Market — продажи и приём оплаты по СБП прямо в Telegram",
  description: "Создайте карточку товара в боте, опубликуйте в своём канале и принимайте оплату по СБП от подписчиков.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH}/favicon.svg` },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-hide-todo={SHOW_TODO ? undefined : ""} suppressHydrationWarning>
      <head>
        {/* Ставим класс до первой отрисовки, чтобы reveal-блоки не мигали */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={ORG_LD} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Motion />
        <SiteScripts />
      </body>
    </html>
  );
}
