"use client";
import { useEffect, useState } from "react";
import { tween } from "@/lib/motion";
import { FIRST_MONTH_RATE } from "@/data/tariffs";

/** Гигантское «3%»: счётчик 0 → 3 за 800 мс при загрузке (reduced-motion — сразу 3). */
export default function HeroCounter({ className }: { className?: string }) {
  const [v, setV] = useState(FIRST_MONTH_RATE);
  useEffect(() => tween(0, FIRST_MONTH_RATE, 800, (x) => setV(Math.round(x))), []);
  return (
    <>
      <span className={className} aria-hidden="true">{v}%</span>
      <span className="sr-only">{FIRST_MONTH_RATE}%</span>
    </>
  );
}
