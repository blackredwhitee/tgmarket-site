"use client";
import { useEffect, useState } from "react";
import { Icon, ICON } from "@/components/icons";
import { fmt } from "@/lib/format";
import { useInView, useReducedMotion, useTweened } from "@/lib/motion";
import s from "./AuctionsDonations.module.css";

const BIDDERS = ["@anna_k", "@oleg.t", "@maria_s", "@ilya_r", "@dina_v"];
const HAMMER = "m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8";

/** Лот аукциона: ставка растёт каждые 1,8 с, таймер тикает. Вне экрана — пауза. */
export function AuctionMock() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const [n, setN] = useState(0);
  const [sec, setSec] = useState(2 * 3600 + 14 * 60 + 37);

  useEffect(() => {
    if (!inView || rm) return;
    const bid = setInterval(() => setN((x) => (x + 1) % 12), 1800);
    const clock = setInterval(() => setSec((x) => (x > 60 ? x - 1 : 2 * 3600 + 14 * 60 + 37)), 1000);
    return () => { clearInterval(bid); clearInterval(clock); };
  }, [inView, rm]);

  const price = useTweened(12_400 + n * 600, 400);
  const t = [Math.floor(sec / 3600), Math.floor((sec % 3600) / 60), sec % 60].map((v) => String(v).padStart(2, "0")).join(":");

  return (
    <div ref={ref} className={s.lot} aria-hidden="true">
      <div className={s.lotTop}>
        <span className={s.lotIcon}><Icon d={HAMMER} size={22} stroke="#fff" sw={2} /></span>
        <span className={s.lotName}>Лот: авторская картина «Север»<small>до конца торгов {t}</small></span>
      </div>
      <div className={s.bidRow}>
        <span className={s.bidLabel}>Текущая ставка</span>
        <b className={s.bid}>{fmt(price)} ₽</b>
      </div>
      <span key={n} className={s.bidder}>Новая ставка от {BIDDERS[n % BIDDERS.length]}</span>
      <span className={s.lotBtn}>Сделать ставку</span>
    </div>
  );
}

const AMOUNTS = [100, 300, 500, 1000];

/** Карточка доната: выбранная сумма меняется каждые 1,6 с; после «оплаты» — плашка про чек. */
export function DonateMock() {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const rm = useReducedMotion();
  const [k, setK] = useState(1);

  useEffect(() => {
    if (!inView || rm) return;
    const iv = setInterval(() => setK((x) => (x + 1) % (AMOUNTS.length + 2)), 1600);
    return () => clearInterval(iv);
  }, [inView, rm]);

  const sel = Math.min(k, AMOUNTS.length - 1);
  const done = k >= AMOUNTS.length;

  return (
    <div ref={ref} className={s.donate} aria-hidden="true">
      <div className={s.donHead}>
        <span className={s.donIcon}><Icon d={ICON.gift} size={22} stroke="#fff" sw={2} /></span>
        <span className={s.lotName}>Поддержать канал «Заметки путешественника»<small>любая сумма от 10 ₽</small></span>
      </div>
      <div className={s.amounts}>
        {AMOUNTS.map((a, i) => (
          <span key={a} className={`${s.amount} ${i === sel ? s.amountOn : ""}`}>{fmt(a)} ₽</span>
        ))}
      </div>
      <span className={s.donBtn}>Поддержать · {fmt(AMOUNTS[sel])} ₽</span>
      <span className={`${s.receipt} ${done ? s.receiptOn : ""}`}>
        <span className={s.ok}><Icon d={ICON.check} size={12} stroke="#fff" sw={3.2} /></span>
        Спасибо за поддержку! Электронный чек отправлен
      </span>
    </div>
  );
}
