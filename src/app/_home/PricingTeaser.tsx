import Link from "next/link";
import { Icon } from "@/components/icons";
import PricingCard from "./PricingCard";
import { P } from "./paths";
import s from "./PricingTeaser.module.css";

/** Ступеньки шкалы (декоративные): высоты из макета, первая — жёлтая «3%». */
const LADDER = ["92%", "78%", "64%", "50%", "38%"];

/** spaced — отступ сверху, когда перед тизером нет блока «Сравнение» (в макете отступ даёт он). */
export default function PricingTeaser({ spaced = false }: { spaced?: boolean }) {
  return (
    <section className={`${s.section} ${spaced ? s.spaced : ""}`}>
      <div className="container">
        <PricingCard>
          <div className="bg-beams" aria-hidden="true" style={{ position: "absolute", inset: 0 }} />
          <div className={s.text}>
            <h2 className={s.h2}>Платите, только когда продаёте</h2>
            <div className={s.accent}>
              <span className={s.pct} data-pct>3%</span>
              <span className={s.pctNote}>комиссия в первый месяц для новых селлеров</span>
            </div>
            <p className={s.p}>
              Дальше — ступенчатая шкала: чем больше оборот, тем ниже процент.{" "}
              <span className={`todo ${s.inlineTodo}`}>[УТОЧНИТЬ]</span>
            </p>
            <Link href="/pricing/" className={s.btn}>
              Посмотреть тарифы<Icon d={P.arrowR} size={18} sw={2.2} />
            </Link>
          </div>
          <div className={s.bars} aria-hidden="true">
            {LADDER.map((h, i) => (
              <div key={h} data-bar className={s.bar}
                style={{ height: h, background: i === 0 ? "#FFE14A" : `rgba(255,255,255,${(0.32 - i * 0.05).toFixed(2)})` }}>
                {i === 0 ? "3%" : ""}
              </div>
            ))}
          </div>
        </PricingCard>
      </div>
    </section>
  );
}
