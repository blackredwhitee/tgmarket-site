import CasesSlider, { type Case } from "./CasesSlider";

import { SHOW_TODO } from "@/lib/config";

/**
 * Кейсы селлеров (в CMS). Тексты по мотивам отзывов селлеров — финальные формулировки
 * согласует команда. draft: true — скрыть кейс в продакшн-сборке. Если кейсов < 3, блок не рендерится.
 */
export const CASES: Case[] = [
  { niche: "Психология", name: "«Спокойная голова»", quote: "Раньше половина времени уходила на переписку «куда перевести». Теперь клиент сам оплачивает сессию из поста, а я вижу оплату в боте. За первый месяц — 38 консультаций.", bg: "#fff", fg: "#0B1233", quoteFill: "#FB7E5E", avatar: "linear-gradient(135deg,#FFA98F,#FB7E5E)", avatarFg: "#fff" },
  { niche: "Карьера", name: "«Карьера без паники»", quote: "Запустила разборы резюме за вечер: карточка в боте, пост в канале — и первые оплаты пришли через час. Сайт так и не понадобился.", bg: "#FB7E5E", fg: "#fff", quoteFill: "#7BD0FF", avatar: "#7BD0FF", avatarFg: "#0B1233" },
  { niche: "Инфопродукты", name: "«Таблицы и бюджет»", quote: "Продаю шаблоны таблиц по 490 ₽. Покупатель платит по СБП и сразу получает ссылку — я даже не отвлекаюсь. За месяц 212 продаж без единого вопроса «а где файл?».", bg: "#0B1233", fg: "#fff", quoteFill: "#7BD0FF", avatar: "linear-gradient(135deg,#FFA98F,#FB7E5E)", avatarFg: "#fff" },
  { niche: "Мероприятия", name: "«Лекторий по выходным»", quote: "Билеты на лекции продаём прямо в канале. Гость оплачивает и получает QR-код, на входе просто сканируем. Зал на 120 мест собрали за неделю.", bg: "#7BD0FF", fg: "#0B1233", quoteFill: "#0B1233", avatar: "#0B1233", avatarFg: "#7BD0FF" },
];

export default function Cases() {
  const cases = CASES.filter((c) => SHOW_TODO || !c.draft);
  if (cases.length < 3) return null;
  return <CasesSlider cases={cases} />;
}
