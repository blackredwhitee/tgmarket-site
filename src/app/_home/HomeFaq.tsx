import Link from "next/link";
import { Icon } from "@/components/icons";
import HomeFaqList from "./HomeFaqList";
import { HOME_FAQ } from "./faq";
import { P } from "./paths";
import s from "./HomeFaq.module.css";

export default function HomeFaq() {
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <div className={s.side}>
          <h2 className={s.h2}>Частые <span className={s.hl}>вопросы</span></h2>
          <Link href="/faq/" className={s.all}>
            Все вопросы<Icon d={P.arrowR} size={18} sw={2.2} />
          </Link>
          <div className={s.support}>
            <span className={s.qMark} aria-hidden="true">?</span>
            <div className={s.bubIn}>А если у меня ИП, а не самозанятость?</div>
            <div className={s.bubOut}>Подходит — ИП и юрлица тоже продают</div>
            <b className={s.supTitle}>Не нашли ответ?</b>
            <span className={s.supText}>Напишите в поддержку — ответим в Telegram.</span>
            <a href="https://t.me/tgmarket_support" target="_blank" rel="noopener" className={s.supBtn}>Написать в поддержку</a>
          </div>
        </div>
        <HomeFaqList items={HOME_FAQ} />
      </div>
    </section>
  );
}
