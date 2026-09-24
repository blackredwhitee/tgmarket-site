/**
 * Тарифная шкала TG Market. Шкала на /pricing и калькулятор берут данные только отсюда.
 * Ставка зависит от объёма продаж в месяц и устанавливается автоматически при достижении границы.
 */
export type Tier = {
  /** Верхняя граница оборота ступени, ₽ в месяц (включительно). */
  max: number;
  /** Ставка комиссии, %. */
  rate: number;
  /** Подпись диапазона. */
  range: string;
};

export const TIERS: Tier[] = [
  { max: 149_999, rate: 10, range: "до 150 тыс. ₽" },
  { max: 350_000, rate: 8, range: "150–350 тыс. ₽" },
  { max: 650_000, rate: 7, range: "350–650 тыс. ₽" },
  { max: Infinity, rate: 5, range: "свыше 650 тыс. ₽" },
];

/** Ставка для участников реферальной программы на первые 2 месяца, %. */
export const FIRST_MONTH_RATE = 3;

/** Диапазон слайдера калькулятора, ₽. */
export const TURNOVER = { min: 10_000, max: 2_000_000, step: 10_000, initial: 300_000 } as const;

export const clampTurnover = (v: number) => Math.max(TURNOVER.min, Math.min(TURNOVER.max, v || 0));

export const tierIndex = (v: number) => TIERS.findIndex((t) => v <= t.max);

/** Расчёт комиссии: первые 2 месяца — FIRST_MONTH_RATE на весь оборот, иначе ставка ступени. */
export function calcFee(turnover: number, firstMonth: boolean) {
  const rate = firstMonth ? FIRST_MONTH_RATE : TIERS[tierIndex(turnover)].rate;
  const fee = (turnover * rate) / 100;
  return { rate, fee, net: turnover - fee };
}

/** 4.5 → «4,5%» */
export const rateLabel = (rate: number) => String(rate).replace(".", ",") + "%";
