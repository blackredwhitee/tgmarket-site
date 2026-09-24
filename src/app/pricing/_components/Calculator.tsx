"use client";
import { useEffect, useRef, useState } from "react";
import { EASE, reducedMotion, useTweened } from "@/lib/motion";
import { goal } from "@/lib/metrika";
import { fmt, rub } from "@/lib/format";
import { FIRST_MONTH_RATE, TURNOVER, calcFee, clampTurnover, rateLabel } from "@/data/tariffs";
import s from "./Calculator.module.css";

type Props = { turnover: number; first: boolean; onChange: (turnover: number, first: boolean) => void };

export default function Calculator({ turnover, first, onChange }: Props) {
  const used = useRef(false);
  const [draft, setDraft] = useState<string | null>(null); // текст поля во время ввода

  const update = (v: number, f: boolean) => {
    if (!used.current) { used.current = true; goal("calc_use", { calc: "pricing" }); }
    onChange(clampTurnover(v), f);
  };

  const { rate, fee, net } = calcFee(turnover, first);
  const feeShown = useTweened(fee, 300);
  const netShown = useTweened(net, 300);

  // Пульс бейджа ставки при смене ступени
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevRate = useRef(rate);
  useEffect(() => {
    if (prevRate.current === rate) return;
    prevRate.current = rate;
    const el = badgeRef.current;
    if (!el?.animate || reducedMotion()) return;
    el.animate([{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }], { duration: 300, easing: EASE });
  }, [rate]);

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
    const v = Number(digits);
    if (!digits) { setDraft(""); return; }
    if (v >= TURNOVER.min) update(v, first);
    setDraft(fmt(Math.min(v, TURNOVER.max)));
  };
  const commit = () => {
    if (draft === null) return;
    const v = Number(draft.replace(/\D/g, ""));
    if (v < TURNOVER.min) update(v, first);
    setDraft(null);
  };

  const fill = (turnover - TURNOVER.min) / (TURNOVER.max - TURNOVER.min);

  return (
    <section className={s.section}>
      <div className={`container ${s.inner}`}>
        <h2 className={s.h2}>Посчитайте свою комиссию</h2>
        <div className={s.row}>
          <div className={s.controls}>
            <div className={s.field}>
              <label htmlFor="pricing-turnover" className={s.label}>Оборот в месяц, ₽</label>
              <input
                id="pricing-turnover"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                className={s.input}
                value={draft ?? fmt(turnover)}
                onChange={onType}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
              />
            </div>
            <div className={s.slider}>
              <div className={s.track} aria-hidden="true">
                <div className={s.fill} style={{ transform: `scaleX(${fill})` }} />
              </div>
              <input
                type="range"
                min={TURNOVER.min}
                max={TURNOVER.max}
                step={TURNOVER.step}
                value={turnover}
                onChange={(e) => update(+e.target.value, first)}
                aria-label="Оборот в месяц"
                aria-valuetext={rub(turnover)}
                className={s.range}
              />
            </div>
            <div className={s.limits}><span>{rub(TURNOVER.min)}</span><span>{rub(TURNOVER.max)}</span></div>
            <div role="radiogroup" aria-label="Тариф" className={s.seg}>
              <div className={s.segInd} style={{ transform: first ? "none" : "translateX(100%)" }} aria-hidden="true" />
              <button
                type="button" role="radio" aria-checked={first}
                className={s.segBtn} style={{ color: first ? "#0B1233" : "#fff" }}
                onClick={() => update(turnover, true)}
              >
                Первый месяц ({FIRST_MONTH_RATE}%)
              </button>
              <button
                type="button" role="radio" aria-checked={!first}
                className={s.segBtn} style={{ color: first ? "#fff" : "#0B1233" }}
                onClick={() => update(turnover, false)}
              >
                Обычный тариф
              </button>
            </div>
          </div>

          <div className={s.result}>
            <div className={s.rateRow}>
              <span className={s.rateLabel}>Ставка</span>
              <span ref={badgeRef} className={s.badge}>{rateLabel(rate)}</span>
            </div>
            <div className={`${s.stat} ${s.statFirst}`}>
              <span className={s.statLabel}>Комиссия</span>
              <b className={s.statValue}>{rub(feeShown)}</b>
            </div>
            <div className={s.stat}>
              <span className={s.statLabel}>Вы получите</span>
              <b className={s.statValue}>{rub(netShown)}</b>
            </div>
            <span className={s.foot}>Расчёт приблизительный. Точные условия — в оферте.</span>
            <span className="sr-only" aria-live="polite">
              Ставка {rateLabel(rate)}, комиссия {rub(fee)}, вы получите {rub(net)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
