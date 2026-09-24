/**
 * Юридические документы (ТЗ §6.8). Тексты предоставляет юрист — пока структура разделов-заглушек.
 * В продакшне — из CMS. `paras` — абзацы раздела; пока пусто, выводится плашка [УТОЧНИТЬ].
 */
export type LegalSection = { id: string; title: string; paras?: string[] };

export type LegalDoc = {
  slug: "offer" | "privacy" | "cookies";
  title: string; // H1 и пункт навигации
  short: string; // короткое название для переключателя документов
  seoTitle: string;
  description: string;
  updated: string | null; // дата редакции, ISO (YYYY-MM-DD); null — [УТОЧНИТЬ]
  sections: LegalSection[];
};

const s = (id: string, title: string): LegalSection => ({ id, title });

export const LEGAL: LegalDoc[] = [
  {
    slug: "offer",
    title: "Публичная оферта",
    short: "Оферта",
    seoTitle: "Публичная оферта TG Market",
    description: "Публичная оферта сервиса TG Market: условия использования, стоимость услуг, порядок расчётов и выплат селлерам.",
    updated: null,
    sections: [
      s("general", "Общие положения"),
      s("terms", "Термины и определения"),
      s("subject", "Предмет договора"),
      s("acceptance", "Регистрация и акцепт оферты"),
      s("price", "Стоимость услуг и порядок расчётов"),
      s("payouts", "Выплаты селлеру"),
      s("rights", "Права и обязанности сторон"),
      s("liability", "Ответственность сторон"),
      s("disputes", "Порядок разрешения споров"),
      s("term", "Срок действия и изменение оферты"),
      s("requisites", "Реквизиты оператора"),
    ],
  },
  {
    slug: "privacy",
    title: "Политика обработки персональных данных",
    short: "Персональные данные",
    seoTitle: "Политика обработки персональных данных — TG Market",
    description: "Как TG Market обрабатывает и защищает персональные данные селлеров, покупателей и посетителей сайта.",
    updated: null,
    sections: [
      s("general", "Общие положения"),
      s("operator", "Оператор персональных данных"),
      s("data", "Какие данные мы обрабатываем"),
      s("purposes", "Цели обработки"),
      s("grounds", "Правовые основания обработки"),
      s("storage", "Порядок и сроки хранения"),
      s("transfer", "Передача данных третьим лицам"),
      s("rights", "Права субъекта персональных данных"),
      s("security", "Меры по защите данных"),
      s("contacts", "Контакты оператора"),
    ],
  },
  {
    slug: "cookies",
    title: "Политика cookie",
    short: "Cookie",
    seoTitle: "Политика использования cookie — TG Market",
    description: "Какие файлы cookie использует сайт TG Market, зачем они нужны и как управлять согласием.",
    updated: null,
    sections: [
      s("what", "Что такое cookie"),
      s("types", "Какие cookie мы используем"),
      s("analytics", "Аналитика: Яндекс Метрика"),
      s("consent", "Согласие и его отзыв"),
      s("browser", "Как отключить cookie в браузере"),
      s("contacts", "Контакты"),
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((d) => d.slug === slug);
