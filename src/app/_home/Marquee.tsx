"use client";
import { useInView } from "@/lib/motion";
import s from "./HeroA.module.css";

const ITEMS = ["Психологам", "Коучам", "Экспертам", "Наставникам", "Авторам гайдов", "Организаторам событий", "Блогерам"];
const STAR = "M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z";

/** Тёмная бегущая строка hero A: 30s цикл, на паузе вне экрана. */
export default function Marquee() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  return (
    <div ref={ref} className={s.marquee}>
      <p className="sr-only">Для психологов, коучей, экспертов, наставников, авторов гайдов, организаторов событий и блогеров.</p>
      <div className={s.track} style={{ animationPlayState: inView ? "running" : "paused" }} aria-hidden="true">
        {[...ITEMS, ...ITEMS].map((m, i) => (
          <span key={i} className={s.mItem}>
            {m}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFE14A"><path d={STAR} /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}
