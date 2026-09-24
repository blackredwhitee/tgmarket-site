import Link from "next/link";
import FinalCTA from "@/components/FinalCTA";
import { Icon, ICON } from "@/components/icons";
import { SOLUTIONS } from "@/data/solutions";
import { JsonLd, breadcrumbLd, meta } from "@/lib/seo";
import s from "./_components/Solution.module.css";

export const metadata = meta(
  "/solutions/",
  "Решения TG Market для вашей ниши — продажи в Telegram-канале",
  "Психологи, эксперты, авторы инфопродуктов, организаторы мероприятий и блогеры: как продавать и принимать оплату по СБП прямо в Telegram-канале.",
);

/** Индекс раздела: карточки 5 ниш (вместо редиректа — в static export полезнее). */
export default function SolutionsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: "Решения", path: "/solutions/" }])} />
      <section className={s.indexHero}>
        <div className={s.circleBlue} aria-hidden="true" />
        <div className={s.circleYellow} aria-hidden="true" />
        <div className="container">
          <div className={s.indexHead}>
            <h1 data-intro="0" className={s.h1}>Решения для вашей ниши</h1>
            <p data-intro="150" className={s.heroSub}>
              Выберите, что вы продаёте, — покажем, как это выглядит в канале и как подписчик платит по СБП.
            </p>
          </div>
          <ul data-reveal="stagger" className={`${s.grid3} ${s.nicheGrid}`}>
            {SOLUTIONS.map((n) => (
              <li key={n.slug} className={s.nicheItem}>
                <Link href={`/solutions/${n.slug}/`} className={s.nicheCard}>
                  <span className={s.nicheIcon} aria-hidden="true">
                    <Icon d={n.icon} size={24} stroke="#FFE14A" />
                  </span>
                  <span className={s.nicheTitle}>{n.label}</span>
                  <span className={s.nicheSub}>{n.sub}</span>
                  <span className={s.nicheMore}>
                    Подробнее <Icon d={ICON.arrowRight} size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
