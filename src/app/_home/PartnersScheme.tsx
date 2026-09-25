"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { EASE, onVisible, reducedMotion } from "@/lib/motion";
import { P } from "./paths";
import s from "./PartnersTeaser.module.css";

const NODES = [
  { label: "Вы", icon: P.user, x: "13.5%", y: "30%", bg: "#FB7E5E", fg: "#fff" },
  { label: "Селлер", icon: P.users, x: "50%", y: "30%", bg: "#fff", fg: "#0B1233" },
  { label: "Продажи", icon: P.trend, x: "86.5%", y: "30%", bg: "#fff", fg: "#0B1233" },
];

/**
 * Схема «Вы → Селлер → Продажи». При появлении линии прорисовываются (stroke-dashoffset, 700ms, stagger 250ms),
 * через 1s по обратной дуге один раз пробегает монетка «₽» (SMIL animateMotion, 1.6s) к «Вы».
 */
export default function PartnersScheme() {
  const ref = useRef<HTMLDivElement>(null);
  const coin = useRef<SVGAnimateMotionElement>(null);
  const [coinOn, setCoinOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    let t: ReturnType<typeof setTimeout> | undefined;
    const off = onVisible(el, () => {
      if (!el || reducedMotion()) return;
      el.querySelectorAll<SVGPathElement>("[data-line]").forEach((p, i) => {
        const L = p.getTotalLength ? p.getTotalLength() : 200;
        p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 700, delay: i * 250, easing: EASE, fill: "backwards" });
      });
      t = setTimeout(() => {
        setCoinOn(true);
        try { coin.current?.beginElement(); } catch {}
      }, 1000);
    });
    return () => { off(); clearTimeout(t); };
  }, []);

  return (
    <div ref={ref} className={s.scheme} aria-hidden="true">
      <svg viewBox="0 0 520 300" width="100%" height="100%" className={s.svg}>
        <path data-line d="M70 90 H250" stroke="#0B1233" strokeWidth="3" fill="none" strokeDasharray="180" strokeDashoffset="0" />
        <path data-line d="M270 90 H450" stroke="#0B1233" strokeWidth="3" fill="none" strokeDasharray="180" strokeDashoffset="0" />
        <path id="tgm-coin-path" data-line d="M450 110 C450 280 70 280 70 110" stroke="#0B1233" strokeWidth="3" fill="none" strokeDasharray="8 8" />
        {/* До старта монетка скрыта (в прототипе она висела в точке 0,0 svg) */}
        <g style={{ visibility: coinOn ? "visible" : "hidden" }}>
          <circle r="14" fill="#FB7E5E" stroke="#0B1233" strokeWidth="3" />
          <text y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="inherit">₽</text>
          <animateMotion ref={coin} dur="1.6s" begin="indefinite" fill="freeze" keyPoints="0;1" keyTimes="0;1"
            calcMode="spline" keySplines="0.22 1 0.36 1">
            <mpath href="#tgm-coin-path" />
          </animateMotion>
        </g>
      </svg>
      {NODES.map((n) => (
        <div key={n.label} className={s.node} style={{ left: n.x, top: n.y }}>
          <span className={s.nodeBox} style={{ background: n.bg, color: n.fg }}>
            <Icon d={n.icon} size={30} sw={2} />
          </span>
          <b className={s.nodeLabel}>{n.label}</b>
        </div>
      ))}
      <div className={s.chip}>до 1% вам — весь первый год</div>
    </div>
  );
}
