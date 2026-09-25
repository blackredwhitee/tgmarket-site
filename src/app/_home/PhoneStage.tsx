"use client";
import { useEffect, useRef } from "react";
import Phone, { type PhoneProps } from "@/components/Phone";
import { Icon } from "@/components/icons";
import { float } from "@/lib/motion";
import s from "./Visuals.module.css";

type Card = { icon: string; iconBg: string; label: string; value: string; pos?: unknown; rot?: number };

/** Телефон со сценой + колонка из 2 карточек рядом (покачиваются ±6px). Карточки не перекрывают экран. */
export default function PhoneStage({ phone, cards }: { phone: PhoneProps; cards: Card[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const a = refs.current.map((el, i) => float(el, 6, 5600 + i * 1200, i * 1800));
    return () => a.forEach((x) => x?.cancel());
  }, []);
  return (
    <div className={s.phoneStage} aria-hidden="true">
      <div className={s.phoneCol}>
        <div className={s.phoneBlob} />
        <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
          <Phone {...phone} />
        </div>
      </div>
      {/* Карточки — колонкой рядом с телефоном, чтобы не закрывать экран */}
      <div className={s.cardsCol}>
        {cards.map((c, i) => (
          <div key={c.label} ref={(el) => { refs.current[i] = el; }} className={s.floatCard}>
            <span className={s.floatIcon} style={{ background: c.iconBg }}><Icon d={c.icon} size={18} stroke="#fff" sw={2.6} /></span>
            <span>{c.label}<b>{c.value}</b></span>
          </div>
        ))}
      </div>
    </div>
  );
}
