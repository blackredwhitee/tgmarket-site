/**
 * Тарифная шкала TG Market. Шкала на /pricing и калькулятор берут данные только отсюда.
 * [УТОЧНИТЬ] Ступени оборота и ставки — ПРИМЕР из макета (ТЗ §6.4, §9), заменить на утверждённые.
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
  { max: 100_000, rate: 7, range: "до 100 тыс. ₽" },
  { max: 300_000, rate: 6, range: "100–300 тыс. ₽" },
  { max: 700_000, rate: 5, range: "300–700 тыс. ₽" },
  { max: 1_500_000, rate: 4.5, range: "0,7–1,5 млн ₽" },
  { max: Infinity, rate: 4, range: "от 1,5 млн ₽" },
];

/** Ставка первого месяца для новых селлеров, %. [УТОЧНИТЬ условия акции] */
export const FIRST_MONTH_RATE = 3;

/** Диапазон слайдера калькулятора, ₽. */
export const TURNOVER = { min: 10_000, max: 2_000_000, step: 10_000, initial: 300_000 } as const;

export const clampTurnover = (v: number) => Math.max(TURNOVER.min, Math.min(TURNOVER.max, v || 0));

export const tierIndex = (v: number) => TIERS.findIndex((t) => v <= t.max);

/** Расчёт комиссии: в первый месяц — FIRST_MONTH_RATE на весь оборот, иначе ставка ступени. */
export function calcFee(turnover: number, firstMonth: boolean) {
  const rate = firstMonth ? FIRST_MONTH_RATE : TIERS[tierIndex(turnover)].rate;
  const fee = (turnover * rate) / 100;
  return { rate, fee, net: turnover - fee };
}

/** 4.5 → «4,5%» */
export const rateLabel = (rate: number) => String(rate).replace(".", ",") + "%";
