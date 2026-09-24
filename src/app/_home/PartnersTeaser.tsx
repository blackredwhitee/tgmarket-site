import Link from "next/link";
import { Icon } from "@/components/icons";
import PartnersScheme from "./PartnersScheme";
import { P } from "./paths";
import s from "./PartnersTeaser.module.css";

export default function PartnersTeaser() {
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <div className={s.text}>
          <h2 className={s.h2}>Знаете тех, кто продаёт в Telegram?</h2>
          <p className={s.p}>Приводите селлеров в TG Market и получайте до 1% с их оборота весь первый год.</p>
          <Link href="/partners/" className={s.btn}>
            Стать партнёром<Icon d={P.arrowR} size={18} sw={2.2} />
          </Link>
        </div>
        <PartnersScheme />
      </div>
    </section>
  );
}
