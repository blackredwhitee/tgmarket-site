/** Глобальные настройки сайта. Значения с TODO подтверждает команда (ТЗ §9). */
export const SITE_URL = "https://tgmarket.ai"; // TODO: финальный домен
export const BOT = "TGMarketSellerBot";

/**
 * Реферальный start-параметр: если задан, все ссылки на бота ведут с ним (оффер 3% на 2 месяца
 * для участников реферальной программы). Telegram передаёт в бот только один start-параметр,
 * поэтому метка страницы и UTM в бот не уходят — источник клика виден в Метрике (цель bot_click).
 * Пустая строка — вернуть метки страниц site_home, site_pricing… (ТЗ §7.5).
 */
export const REF_START = "ref_efdc6ada3070b5c3c449961a665b3eff";

/** Яндекс Метрика. Пустой ID — счётчик не подключается. TODO: ID счётчика. */
export const METRIKA_ID = "";

/** Словарь кодов источников: utm_source → короткий код в start-параметре (ТЗ §7.5). */
export const UTM_SOURCE_CODES: Record<string, string> = {
  telegram_ads: "tgads",
  tgads: "tgads",
  outreach: "outreach",
  yandex: "ya",
  google: "g",
  vk: "vk",
};

/** Показывать плашки [УТОЧНИТЬ]. В продакшне выключить (NEXT_PUBLIC_HIDE_TODO=1). */
export const SHOW_TODO = process.env.NEXT_PUBLIC_HIDE_TODO !== "1";

/**
 * Число селлеров для блоков доверия (подтверждено 24.09.2026). draft: true — цифра не подтверждена:
 * тогда в продакшн-сборке вместо неё показывается «Подключение — 0 ₽».
 */
export const SELLERS = { value: 3000, label: "3 000+", draft: false };
export const SHOW_SELLERS = !SELLERS.draft || SHOW_TODO;
