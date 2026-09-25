"use client";
import { useEffect, useRef } from "react";
import Phone, { type PhoneProps } from "@/components/Phone";
import { Icon } from "@/components/icons";
import { float } from "@/lib/motion";
import s from "./Visuals.module.css";

type Card = { icon: string; iconBg: string; label: string; value: string; pos: React.CSSProperties; rot: number };

/** Телефон со сценой + 2 плавающие карточки (покачиваются ±6px, как в hero). */
export default function PhoneStage({ phone, cards }: { phone: PhoneProps; cards: Card[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const a = refs.current.map((el, i) => float(el, 6, 5600 + i * 1200, i * 1800));
    return () => a.forEach((x) => x?.cancel());
  }, []);
  return (
    <div className={s.phoneStage} aria-hidden="true">
      <div className={s.phoneBlob} />
      <div style={{ position: "relative", height: 560, overflow: "hidden" }}>
        <Phone {...phone} />
      </div>
      {cards.map((c, i) => (
        <div key={c.label} ref={(el) => { refs.current[i] = el; }} className={s.floatCard} style={c.pos}>
          <span style={{ display: "flex", alignItems: "center", gap: 12, transform: `rotate(${c.rot}deg)` }}>
            <span className={s.floatIcon} style={{ background: c.iconBg }}><Icon d={c.icon} size={18} stroke="#fff" sw={2.6} /></span>
            <span>{c.label}<b>{c.value}</b></span>
          </span>
        </div>
      ))}
    </div>
  );
}
