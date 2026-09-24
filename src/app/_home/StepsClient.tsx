"use client";
import { useState, type ReactNode } from "react";
import Phone, { type PhoneScene } from "@/components/Phone";
import { reducedMotion, useInView, useReducedMotion } from "@/lib/motion";
import s from "./Steps.module.css";

const STEPS: { title: string; text: string; scene: PhoneScene }[] = [
  { title: "Создайте карточку", text: "Товар, услуга, билет или донат — в боте, без кода и дизайнера.", scene: "form" },
  { title: "Опубликуйте в канале", text: "Карточка с кнопкой оплаты появляется в вашем канале.", scene: "post" },
  { title: "Принимайте оплату", text: "Подписчики оплачивают по СБП прямо из поста, а вы видите каждую продажу в боте.", scene: "paid" },
];

/**
 * Шаги + телефон. Автосмена: жёлтая полоса активного шага заполняется за 4.5s (CSS-анимация),
 * по её окончании — следующий шаг. Клик переключает (полоса стартует заново). Вне экрана — пауза,
 * при reduced-motion автосмены нет.
 */
export default function StepsClient({ heading, more }: { heading: ReactNode; more: ReactNode }) {
  const [step, setStep] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();

  const next = () => { if (!reducedMotion()) setStep((x) => (x + 1) % 3); };

  return (
    <div ref={ref} className={`container ${s.wrap}`}>
      <div className={s.left}>
        {heading}
        <ol className={s.list}>
          {STEPS.map((st, i) => {
            const a = step === i;
            return (
              <li key={st.title} className={`${s.step} ${a ? s.on : ""}`}>
                <span className={s.num} aria-hidden="true">0{i + 1}</span>
                <div className={s.body}>
                  <h3 className={s.h3}>
                    <button type="button" className={s.pick} aria-pressed={a} onClick={() => setStep(i)}>{st.title}</button>
                  </h3>
                  <p className={s.p}>{st.text}</p>
                </div>
                <span
                  className={`${s.bar} ${a ? (rm ? s.barFull : s.barRun) : ""}`}
                  style={a && !rm ? { animationPlayState: inView ? "running" : "paused" } : undefined}
                  onAnimationEnd={a ? next : undefined}
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ol>
        {more}
      </div>
      <div className={s.visual} aria-hidden="true">
        <div className={s.circle} />
        <div className={s.sun} />
        <div className={s.phones}>
          {STEPS.map((st, i) => (
            <div key={st.scene} className={`${s.phone} ${step === i ? s.phoneOn : ""}`}>
              <Phone scene={st.scene} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
