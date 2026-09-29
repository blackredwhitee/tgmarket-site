import { Icon, ICON } from "@/components/icons";
import { Depth, LiveBg } from "@/components/Life";
import s from "./Stage.module.css";

type Props = {
  id: string;
  step: number;
  kicker: string;
  title: React.ReactNode;
  lead: string;
  points: string[];
  note?: string;
  visual: React.ReactNode;
  tone?: "white" | "soft" | "sky";
  reverse?: boolean;
  /** Фото человека, выглядывающее из-за мокапа (стоковое) */
  photo?: { src: string };
  /** side — фото выглядывает справа из-за телефона; collage — большое фото, карточка-мокап поверх слева снизу */
  photoLayout?: "side" | "collage";
};

/** Этап пути продаж на главной: номер шага, заголовок, текст, список и иллюстрация (чередуются стороны и фон). */
export default function Stage({ id, step, kicker, title, lead, points, note, visual, tone = "white", reverse, photo, photoLayout = "side" }: Props) {
  return (
    <section id={id} className={`${s.section} ${s[tone]}`}>
      <LiveBg tone={reverse ? "warm" : "default"} />
      <div className={`container ${s.wrap} ${reverse ? s.reverse : ""}`}>
        <div className={s.text} data-reveal>
          <span className={s.kicker}><b>Шаг {step}</b>{kicker}</span>
          <h2 className={s.h2}>{title}</h2>
          <p className={s.lead}>{lead}</p>
          <ul className={s.points}>
            {points.map((p) => (
              <li key={p}>
                <span className={s.chk} aria-hidden="true"><Icon d={ICON.check} size={14} stroke="#fff" sw={3} /></span>
                {p}
              </li>
            ))}
          </ul>
          {note && <p className={s.note}>{note}</p>}
        </div>
        <div className={`${s.visual} ${photo && photoLayout === "collage" ? s.collage : ""}`}>
          {photo && (
            <div className={`${s.photo} ${photoLayout === "collage" ? s.photoBig : s.photoRight}`} aria-hidden="true">
              <img src={photo.src} alt="" loading="lazy" />
            </div>
          )}
          <Depth>{visual}</Depth>
        </div>
      </div>
    </section>
  );
}
