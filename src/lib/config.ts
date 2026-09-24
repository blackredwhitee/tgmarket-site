/** Глобальные настройки сайта. Значения с TODO подтверждает команда (ТЗ §9). */
export const SITE_URL = "https://tgmarket.ai"; // TODO: финальный домен
export const BOT = "TGMarketSellerBot";

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
