"use client";
import { useEffect, useRef, useState } from "react";
import Phone from "@/components/Phone";
import { float, tween, useInView, useIsMobile } from "@/lib/motion";
import { rub } from "@/lib/format";
import s from "./HeroA.module.css";

const BARS = [30, 45, 38, 60, 52, 70];
const REV0 = 24500;

/** Телефон hero A + плавающие карточки; «Выручка сегодня» растёт по onPaid. */
export default function HeroAVisual() {
  const mobile = useIsMobile();
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const f1 = useRef<HTMLDivElement>(null);
  const f2 = useRef<HTMLDivElement>(null);
  const f3 = useRef<HTMLDivElement>(null);
  const anims = useRef<(Animation | undefined)[]>([]);
  const [rev, setRev] = useState({ sum: REV0, n: 0 });
  const [shown, setShown] = useState(REV0);
  const cur = useRef(REV0);

  // Покачивание карточек: ±6px, 5.2/6.2/7s, разные фазы.
  useEffect(() => {
    const list: [HTMLDivElement | null, number, number][] = [[f1.current, 5200, 0], [f2.current, 6200, 2000], [f3.current, 7000, 3500]];
    anims.current = list.map(([el, d, p]) => float(el, 6, d, p));
    return () => anims.current.forEach((a) => a?.cancel());
  }, []);
  useEffect(() => {
    anims.current.forEach((a) => (inView ? a?.play() : a?.pause()));
  }, [inView]);

  // Счётчик выручки: рост — твин 800ms, сброс цикла — сразу.
  useEffect(() => {
    if (rev.sum <= cur.current) { cur.current = rev.sum; setShown(rev.sum); return; }
    return tween(cur.current, rev.sum, 800, (v) => { cur.current = v; setShown(v); });
  }, [rev.sum]);

  const onPaid = (amt: number) =>
    setRev((r) => (r.n >= 4 ? { sum: REV0 + amt, n: 1 } : { sum: r.sum + amt, n: r.n + 1 }));
  const last = Math.min(100, 55 + rev.n * 12) / 100;

  return (
    <div ref={ref} className={s.visual} data-intro="300" data-y="40" data-dur="900">
      <div className={s.stage}>
        <div className={s.floats} aria-hidden="true">
          <div ref={f1} className={s.f1}>
            <div className={s.sticker}><b>3%</b><span>на 2 месяца</span></div>
          </div>
          <div ref={f2} className={s.f2}>
            <div className={s.order}>
              <span className={s.sbp}>СБП</span>
              <span className={s.orderText}><span className={s.orderT}>Новый заказ</span><span className={s.orderS}>Консультация · 3 500 ₽</span></span>
            </div>
          </div>
          <div ref={f3} className={s.f3}>
            <div className={s.rev}>
              <span className={s.revLabel}>Выручка сегодня</span>
              <b className={s.revNum}>{rub(shown)}</b>
              <div className={s.bars}>
                {BARS.map((h, i) => <span key={i} style={{ height: h + "%" }} />)}
                <span className={s.barLast} style={{ transform: `scaleY(${last})` }} />
              </div>
            </div>
          </div>
        </div>
        <Phone scene="pay" toast={mobile ? "inside" : "right"} onPaid={onPaid} />
      </div>
    </div>
  );
}
