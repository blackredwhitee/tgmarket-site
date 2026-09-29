import Link from "next/link";
import { Icon } from "@/components/icons";
import PartnersScheme from "./PartnersScheme";
import { P } from "./paths";
import photo from "@/assets/photos/partners.jpg";
import s from "./PartnersTeaser.module.css";

export default function PartnersTeaser() {
  return (
    <section className={s.section}>
      <div className={`container ${s.wrap}`}>
        <div className={s.photo} aria-hidden="true">
          <img src={photo.src} alt="" loading="lazy" />
          <span className={s.badge}><b>до 1%</b> с оборота каждого селлера</span>
        </div>
        <div className={s.text}>
          <h2 className={s.h2}>Знаете тех, кто продаёт в Telegram?</h2>
          <p className={s.p}>Приводите селлеров в TG Market и получайте до 1% с их оборота весь первый год.</p>
          <Link href="/partners/" className={s.btn}>
            Стать партнёром<Icon d={P.arrowR} size={18} sw={2.2} />
          </Link>
          <PartnersScheme />
        </div>
      </div>
    </section>
  );
}
