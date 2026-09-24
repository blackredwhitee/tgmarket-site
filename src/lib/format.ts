/** Формат ru-RU с обычными пробелами: 1 000 000 */
export function fmt(n: number): string {
  return Math.round(n).toLocaleString("ru-RU").replace(/[  ]/g, " ");
}
export const rub = (n: number) => fmt(n) + " ₽";
