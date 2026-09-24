"use client";
import { useRef, useState } from "react";
import { useTweened } from "@/lib/motion";
import { fmt, rub } from "@/lib/format";
import { goal } from "@/lib/metrika";
import sh from "./shared.module.css";
import s from "./IncomeCalc.module.css";

const RATE = 0.01;

type Slider = {
  id: string; label: string; val: number; min: number; max: number; step: number;
  valText: string; minText: string; maxText: string; set: (v: number) => void;
};

export default function IncomeCalc() {
  const [sellers, setSellers] = useState(10);
  const [avg, setAvg] = useState(150000);
  const used = useRef(false);
  // X = селлеры × оборот × 1%, твин 300ms
  const month = useTweened(sellers * avg * RATE, 300);

  const change = (set: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(+e.target.value);
    if (!used.current) {
      used.current = true;
      goal("calc_use", { calc: "partner" });
    }
  };

  const sliders: Slider[] = [
    { id: "pc-sellers", label: "Сколько селлеров приведёте", val: sellers, min: 1, max: 100, step: 1, valText: String(sellers), minText: "1", maxText: "100", set: setSellers },
    { id: "pc-avg", label: "Средний оборот селлера в месяц", val: avg, min: 10000, max: 1000000, step: 10000, valText: rub(avg), minText: "10 000 ₽", maxText: "1 000 000 ₽", set: setAvg },
  ];

  return (
    <section className={`${sh.section} ${s.section}`}>
      <div className={s.bg} aria-hidden="true" />
      <div className={`container ${sh.inner}`}>
        <h2 className={`${sh.h2} ${s.h2}`}>Сколько можно заработать</h2>
        <div className={s.row}>
          <div className={s.inputs}>
            {sliders.map((sl) => (
              <div key={sl.id} className={s.field}>
                <div className={s.top}>
                  <label htmlFor={sl.id} className={s.label}>{sl.label}</label>
                  <b className={s.val}>{sl.valText}</b>
                </div>
                <div className={s.track}>
                  <div className={s.rail}>
                    <div className={s.fill} style={{ width: ((sl.val - sl.min) / (sl.max - sl.min)) * 100 + "%" }} />
                  </div>
                  <input
                    id={sl.id}
                    type="range"
                    className={s.range}
                    min={sl.min}
                    max={sl.max}
                    step={sl.step}
                    value={sl.val}
                    onChange={change(sl.set)}
                    aria-label={sl.label}
                    aria-valuetext={sl.valText}
                  />
                </div>
                <div className={s.limits}><span>{sl.minText}</span><span>{sl.maxText}</span></div>
              </div>
            ))}
          </div>
          <div className={s.result}>
            <div className={s.block}>
              <span className={s.cap}>Ваш доход в месяц</span>
              <b className={s.month}>{fmt(month)} ₽</b>
            </div>
            <div className={`${s.block} ${s.year}`}>
              <span className={s.cap}>За год</span>
              <b className={s.yearVal}>{fmt(month * 12)} ₽</b>
            </div>
            <span className={s.foot}>Пример расчёта. Фактический доход зависит от оборота селлеров.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
