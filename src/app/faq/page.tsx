import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import { FAQ } from "@/data/faq";
import { JsonLd, breadcrumbLd, faqLd, meta } from "@/lib/seo";
import FaqExplorer from "./_components/FaqExplorer";
import s from "./page.module.css";

const PATH = "/faq/";

export const metadata = meta(
  PATH,
  "Вопросы о TG Market — продажи и оплата в Telegram",
  "Ответы на частые вопросы о TG Market: как начать продавать в Telegram-канале, оплата по СБП, комиссия, чеки и партнёрская программа.",
);

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: "Вопросы и ответы", path: PATH }])} />
      <FaqExplorer
        title={<>Вопросы <span className={s.hl}>и ответы</span></>}
        after={
          <div className={s.help}>
            <div className={s.helpText}>
              <b className={s.helpTitle}>Не нашли ответ?</b>
              <span className={s.helpSub}>
                Напишите в поддержку — ответим в Telegram: @tgmarket_support
              </span>
            </div>
            <a href="https://t.me/tgmarket_support" target="_blank" rel="noopener" className={s.helpBtn}>Написать в поддержку</a>
          </div>
        }
      />
      <FinalCTA param="site_faq" cta="Начать продавать" />
    </>
  );
}
