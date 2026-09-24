"use client";
import { useState } from "react";
import { TURNOVER, tierIndex } from "@/data/tariffs";
import Tiers from "./Tiers";
import Calculator from "./Calculator";

/** Шкала + калькулятор: общий стейт — в режиме «Обычный тариф» текущая ступень подсвечивается на шкале. */
export default function PricingInteractive() {
  const [turnover, setTurnover] = useState<number>(TURNOVER.initial);
  const [first, setFirst] = useState(true);
  return (
    <>
      <Tiers active={first ? -1 : tierIndex(turnover)} />
      <Calculator
        turnover={turnover}
        first={first}
        onChange={(v, f) => { setTurnover(v); setFirst(f); }}
      />
    </>
  );
}
