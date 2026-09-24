import type { Metadata } from "next";
import Link from "next/link";
import BotLink from "@/components/BotLink";
import Phone from "@/components/Phone";
import { Icon, ICON } from "@/components/icons";
import s from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Страница не найдена — TG Market",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className={s.section}>
      <div className={s.bg} aria-hidden="true" />
      <div className={s.bigNum} aria-hidden="true">404</div>
      <div className={`container ${s.wrap}`}>
        <div className={s.text}>
          <span className={s.badge}>Ошибка 404</span>
          <h1 className={s.h1}>Такой страницы <span className={s.hl}>нет</span></h1>
          <p className={s.lead}>Зато продажи в Telegram — есть. Вернитесь на главную или сразу откройте бота.</p>
          <div className={s.actions}>
            <Link href="/" className={s.btnHome}>На главную</Link>
            <BotLink param="site_404" block="404" className={s.btnBot}>
              <Icon d={ICON.send} size={20} sw={2.2} />Начать продавать
            </BotLink>
          </div>
          <span className={s.hint}>Попробуйте нажать «Оплатить» на телефоне</span>
        </div>
        <div className={s.phone}><Phone scene="404" /></div>
      </div>
    </section>
  );
}
