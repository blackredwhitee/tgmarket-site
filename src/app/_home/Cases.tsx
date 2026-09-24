import CasesSlider, { type Case } from "./CasesSlider";

import { SHOW_TODO } from "@/lib/config";

/**
 * Кейсы селлеров (в CMS). Тексты по мотивам отзывов селлеров — финальные формулировки
 * согласует команда. draft: true — скрыть кейс в продакшн-сборке. Если кейсов < 3, блок не рендерится.
 */
export const CASES: Case[] = [
  { niche: "Психология", name: "«Спокойная голова»", quote: "Раньше половина времени уходила на переписку «куда перевести». Теперь клиент сам оплачивает сессию из поста, а я вижу оплату в боте. За первый месяц — 38 консультаций.", bg: "#fff", fg: "#0B1233", quoteFill: "#1D4FFA", avatar: "linear-gradient(135deg,#7C95FF,#1D4FFA)", avatarFg: "#fff" },
  { niche: "Карьера", name: "«Карьера без паники»", quote: "Запустила разборы резюме за вечер: карточка в боте, пост в канале — и первые оплаты пришли через час. Сайт так и не понадобился.", bg: "#1D4FFA", fg: "#fff", quoteFill: "#FFE14A", avatar: "#FFE14A", avatarFg: "#0B1233" },
  { niche: "Инфопродукты", name: "«Таблицы и бюджет»", quote: "Продаю шаблоны таблиц по 490 ₽. Покупатель платит по СБП и сразу получает ссылку — я даже не отвлекаюсь. За месяц 212 продаж без единого вопроса «а где файл?».", bg: "#0B1233", fg: "#fff", quoteFill: "#FFE14A", avatar: "linear-gradient(135deg,#7C95FF,#1D4FFA)", avatarFg: "#fff" },
  { niche: "Мероприятия", name: "«Лекторий по выходным»", quote: "Билеты на лекции продаём прямо в канале. Гость оплачивает и получает QR-код, на входе просто сканируем. Зал на 120 мест собрали за неделю.", bg: "#FFE14A", fg: "#0B1233", quoteFill: "#0B1233", avatar: "#0B1233", avatarFg: "#FFE14A" },
];

export default function Cases() {
  const cases = CASES.filter((c) => SHOW_TODO || !c.draft);
  if (cases.length < 3) return null;
  return <CasesSlider cases={cases} />;
}
