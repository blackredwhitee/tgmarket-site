"use client";
import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/motion";

type Kind = "breathe" | "drift" | "bob";

/** Декоративная обёртка Final CTA: «дыхание» кольца (12s), дрейф свечения (20s), покачивание карточек ±8px. */
export default function FinalCTAAnim({ kind, dur = 0, phase = 0, className, children }: { kind: Kind; dur?: number; phase?: number; className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !el.animate) return;
    const a =
      kind === "breathe"
        ? el.animate([{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 12000, iterations: Infinity, easing: "ease-in-out" })
        : kind === "drift"
          ? el.animate([{ transform: "translate(0,0)" }, { transform: "translate(140px,-60px)" }, { transform: "translate(0,0)" }], { duration: 20000, iterations: Infinity, easing: "ease-in-out" })
          : el.animate(
              [{ transform: "translateY(0)" }, { transform: "translateY(-8px)" }, { transform: "translateY(0)" }, { transform: "translateY(6px)" }, { transform: "translateY(0)" }],
              { duration: dur, delay: -phase, iterations: Infinity, easing: "ease-in-out" },
            );
    return () => a.cancel();
  }, [kind, dur, phase]);
  return <div ref={ref} className={className} aria-hidden="true">{children}</div>;
}
