import Link from "next/link";
import { Icon } from "@/components/icons";
import StepsClient from "./StepsClient";
import s from "./Steps.module.css";

/** Главная · «Три шага до первой продажи» (#how). */
export default function Steps() {
  return (
    <section id="how" className={s.section}>
      <StepsClient
        heading={<h2 className={s.h2}>Три шага <span className={s.blue}>до первой продажи</span></h2>}
        more={
          <Link href="/how-it-works/" className={s.more}>
            Подробнее о запуске<Icon d="M5 12h14M12 5l7 7-7 7" size={18} sw={2.2} />
          </Link>
        }
      />
    </section>
  );
}

