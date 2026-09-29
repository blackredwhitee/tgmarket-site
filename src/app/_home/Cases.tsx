import CasesSlider, { type Case } from "./CasesSlider";

import { SHOW_TODO } from "@/lib/config";
import cPsy from "@/assets/photos/case-psy.jpg";
import cCareer from "@/assets/photos/case-career.jpg";
import cInfo from "@/assets/photos/case-info.jpg";
import cEvents from "@/assets/photos/case-events.jpg";

/**
 * Кейсы селлеров (в CMS). Тексты по мотивам отзывов селлеров — финальные формулировки
 * согласует команда. draft: true — скрыть кейс в продакшн-сборке. Если кейсов < 3, блок не рендерится.
 */
export const CASES: Case[] = [
  { cover: cPsy, niche: "Психология", name: "«Спокойная голова»", quote: "Раньше половина времени уходила на переписку «куда перевести». Теперь клиент сам оплачивает сессию из поста, а я вижу оплату в боте. За первый месяц — 38 консультаций.", bg: "#fff", fg: "#0B1233", quoteFill: "#FB7E5E", avatar: "#FFE9E2", avatarFg: "#FB7E5E" },
  { cover: cCareer, niche: "Карьера", name: "«Карьера без паники»", quote: "Запустила разборы резюме за вечер: карточка в боте, пост в канале — и первые оплаты пришли через час. Сайт так и не понадобился.", bg: "#fff", fg: "#0B1233", quoteFill: "#FB7E5E", avatar: "#FFE9E2", avatarFg: "#FB7E5E" },
  { cover: cInfo, niche: "Инфопродукты", name: "«Таблицы и бюджет»", quote: "Продаю шаблоны таблиц по 490 ₽. Покупатель платит по СБП и сразу получает ссылку — я даже не отвлекаюсь. За месяц 212 продаж без единого вопроса «а где файл?».", bg: "#fff", fg: "#0B1233", quoteFill: "#FB7E5E", avatar: "#FFE9E2", avatarFg: "#FB7E5E" },
  { cover: cEvents, niche: "Мероприятия", name: "«Лекторий по выходным»", quote: "Билеты на лекции продаём прямо в канале. Гость оплачивает и получает QR-код, на входе просто сканируем. Зал на 120 мест собрали за неделю.", bg: "#fff", fg: "#0B1233", quoteFill: "#FB7E5E", avatar: "#FFE9E2", avatarFg: "#FB7E5E" },
];

export default function Cases() {
  const cases = CASES.filter((c) => SHOW_TODO || !c.draft);
  if (cases.length < 3) return null;
  return <CasesSlider cases={cases} />;
}
