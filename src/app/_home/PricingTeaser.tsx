import Link from "next/link";
import { Icon } from "@/components/icons";
import PricingCard from "./PricingCard";
import { P } from "./paths";
import s from "./PricingTeaser.module.css";

/** Шкала комиссии с подписями оборота: без столбцов, чтобы «3%» не выглядели больше «10%». */
const ROWS = [
  { range: "Первые 2 месяца", note: "для первых селлеров", rate: "3%", hl: true },
  { range: "до 150 тыс. ₽", note: "оборот в месяц", rate: "10%" },
  { range: "150–350 тыс. ₽", note: "оборот в месяц", rate: "8%" },
  { range: "350–650 тыс. ₽", note: "оборот в месяц", rate: "7%" },
  { range: "от 650 тыс. ₽", note: "оборот в месяц", rate: "5%" },
];

/** spaced — отступ сверху, когда перед тизером нет блока «Сравнение» (в макете отступ даёт он). */
export default function PricingTeaser({ spaced = false }: { spaced?: boolean }) {
  return (
    <section className={`${s.section} ${spaced ? s.spaced : ""}`}>
      <div className="container">
        <PricingCard>
          <div className={s.text}>
            <h2 className={s.h2}>Платите, только когда продаёте</h2>
            <div className={s.accent}>
              <span className={s.pct} data-pct>3%</span>
              <span className={s.pctNote}>минимальная комиссия — первым селлерам на 2 месяца</span>
            </div>
            <p className={s.p}>
              Дальше — ступенчатая шкала от 10% до 5%: чем больше оборот, тем ниже процент.
            </p>
            <Link href="/pricing/" className={s.btn}>
              Посмотреть тарифы<Icon d={P.arrowR} size={18} sw={2.2} />
            </Link>
          </div>
          <div className={s.ladder}>
            <div className={s.ladderHead}><span>Оборот</span><span>Комиссия</span></div>
            {ROWS.map((r) => (
              <div key={r.range} data-row className={`${s.row} ${r.hl ? s.rowHl : ""}`}>
                <span className={s.rowRange}>{r.range}<small>{r.note}</small></span>
                <b className={s.rowRate}>{r.rate}</b>
              </div>
            ))}
            <p className={s.ladderNote}>Чем больше оборот — тем ниже процент</p>
          </div>
        </PricingCard>
      </div>
    </section>
  );
}
