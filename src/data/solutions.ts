import { ICON } from "@/components/icons";

/**
 * Контент нишевых страниц /solutions/[niche] (порт data() из design/design/Solution.dc.html + ТЗ §6.3).
 * Структура рассчитана на перенос в CMS: всё, что меняется между нишами, — здесь.
 */

export type SolutionSlug = "psychologists" | "experts" | "infoproducts" | "events" | "donations";

export type SolutionStep = { title: string; text: string };
export type SolutionAdvantage = { big: string; title: string; text: string; bg: string; fg: string };
export type SolutionFaq = { q: string; a: string };

export type Solution = {
  slug: SolutionSlug;
  /** start-параметр бота */
  param: string;
  /** Бейдж в hero и хлебные крошки */
  label: string;
  /** Короткое имя (чипы/меню) */
  short: string;
  /** SVG path иконки ниши (Lucide) */
  icon: string;
  seo: { title: string; description: string };
  h1: string;
  sub: string;
  /** Тексты блока «Знакомо?» (3 шт.) */
  pains: string[];
  /** true — тексты боли черновые, показываем плашку [УТОЧНИТЬ] */
  painDraft: boolean;
  /** «Что можно продавать» */
  examples: string[];
  /** Тип карточки (kicker в примерах) */
  cardType: string;
  /** Надпись на кнопке в примерах */
  cardBtn: string;
  /** Данные мокапа телефона */
  phone: {
    channel: string;
    initials: string;
    subs: string;
    prePost: string;
    cover: string;
    /** Сцена pay (hero) */
    product: string;
    desc: string;
    amount: number;
    /** Сцена post («Как это выглядит») */
    product2: string;
    desc2: string;
    amount2: number;
  };
  looks: SolutionStep[];
  advantages: SolutionAdvantage[];
  faq: SolutionFaq[];
  ctaTitle: string;
};

const LOOKS: SolutionStep[] = [
  { title: "Пост с карточкой", text: "Обложка, описание и цена — в привычном формате поста." },
  { title: "Кнопка оплаты", text: "Подписчик нажимает «Оплатить» и платит по СБП." },
  { title: "Уведомление в боте", text: "Вы сразу видите оплату — без сверки скриншотов." },
];

const ADVANTAGES: SolutionAdvantage[] = [
  { big: "СБП", title: "Привычная оплата", text: "Через приложение банка, без ввода карты.", bg: "#FB7E5E", fg: "#fff" },
  { big: "0", title: "переходов из канала", text: "Покупка — прямо в посте.", bg: "#7BD0FF", fg: "#0B1233" },
  { big: "3%", title: "на 2 месяца", text: "Для первых селлеров. Дальше — ступенчатая шкала.", bg: "#0B1233", fg: "#fff" },
];

const FAQ: SolutionFaq[] = [
  { q: "Кто может продавать?", a: "Самозанятые, ИП и юридические лица." },
  { q: "Как покупатель оплачивает?", a: "По СБП — через приложение своего банка." },
  { q: "Как покупатель получает услугу или доступ?", a: "Сразу после оплаты: цифровой товар или доступ — ссылкой, билет — QR-кодом. Вы видите каждую продажу в боте." },
];

const seoTitle = (h1: string) => `${h1} | TG Market`;

export const SOLUTIONS: Solution[] = [
  {
    slug: "psychologists",
    param: "site_psy",
    label: "Психологам и коучам",
    short: "Психологи",
    icon: ICON.heart,
    seo: {
      title: seoTitle("Консультации психолога с оплатой прямо в Telegram"),
      description: "Продавайте сессии и пакеты подписчикам канала. Клиент оплачивает по СБП, а вы не сверяете переводы вручную.",
    },
    h1: "Консультации психолога с оплатой прямо в Telegram",
    sub: "Продавайте сессии и пакеты подписчикам канала. Клиент оплачивает по СБП, а вы не сверяете переводы вручную.",
    pains: [
      "Клиенты пишут в личку, чтобы узнать, как оплатить",
      "Приходится вручную сверять переводы перед каждой сессией",
      "Неловко напоминать об оплате",
    ],
    painDraft: false,
    examples: ["Сессия 50 мин", "Пакет из 4 встреч", "Групповая терапия"],
    cardType: "Услуга",
    cardBtn: "Оплатить",
    phone: {
      channel: "Практика спокойствия",
      initials: "ПС",
      subs: "12 480 подписчиков",
      prePost: "Открыла запись на октябрь. Оплатить сессию можно прямо здесь, в канале.",
      cover: "Сессия",
      product: "Сессия 50 мин",
      desc: "Онлайн в Zoom или Telegram",
      amount: 3500,
      product2: "Пакет из 4 встреч",
      desc2: "Раз в неделю, онлайн",
      amount2: 12000,
    },
    looks: LOOKS,
    advantages: ADVANTAGES,
    faq: FAQ,
    ctaTitle: "Откройте запись на сессии в своём канале",
  },
  {
    slug: "experts",
    param: "site_exp",
    label: "Экспертам и наставникам",
    short: "Эксперты",
    icon: ICON.briefcase,
    seo: {
      title: seoTitle("Консультации и менторство — продавайте там, где вас читают"),
      description: "Разборы резюме, карьерные консультации, менторство — оформите услугу за несколько минут и опубликуйте в канале.",
    },
    h1: "Консультации и менторство — продавайте там, где вас читают",
    sub: "Разборы резюме, карьерные консультации, менторство — оформите услугу за несколько минут и опубликуйте в канале.",
    pains: [
      "Заявки на разбор приходят в личку, и их легко потерять",
      "Нет времени собирать сайт с оплатой под каждую услугу",
      "Оплату приходится подтверждать вручную",
    ],
    painDraft: false,
    examples: ["Разбор резюме", "Карьерная консультация", "Месяц менторства"],
    cardType: "Услуга",
    cardBtn: "Оплатить",
    phone: {
      channel: "Карьера без хаоса",
      initials: "КХ",
      subs: "8 930 подписчиков",
      prePost: "Открыл 5 мест на разбор резюме в этом месяце.",
      cover: "Разбор",
      product: "Разбор резюме",
      desc: "Письменный разбор за 3 дня",
      amount: 2500,
      product2: "Карьерная консультация",
      desc2: "60 минут, онлайн",
      amount2: 4000,
    },
    looks: LOOKS,
    advantages: ADVANTAGES,
    faq: FAQ,
    ctaTitle: "Продавайте консультации в своём канале",
  },
  {
    slug: "infoproducts",
    param: "site_info",
    label: "Авторам инфопродуктов",
    short: "Инфопродукты",
    icon: ICON.bookOpen,
    seo: {
      title: seoTitle("Гайды и курсы — продажи прямо из поста"),
      description: "Публикуйте карточку гайда или курса в канале — подписчик оплачивает по СБП, не уходя на внешний сайт.",
    },
    h1: "Гайды и курсы — продажи прямо из поста",
    sub: "Публикуйте карточку гайда или курса в канале — подписчик оплачивает по СБП, не уходя на внешний сайт.",
    pains: [
      "Подписчики теряются по дороге на внешний лендинг",
      "Файлы приходится рассылать вручную",
      "Платёжная страница стоит отдельных денег",
    ],
    painDraft: false,
    examples: ["Гайд", "Чек-лист", "Мини-курс"],
    cardType: "Товар",
    cardBtn: "Оплатить",
    phone: {
      channel: "Деньги по полочкам",
      initials: "ДП",
      subs: "21 300 подписчиков",
      prePost: "Собрала всё про семейный бюджет в один гайд.",
      cover: "Гайд",
      product: "Гайд по планированию бюджета",
      desc: "PDF, 42 страницы",
      amount: 990,
      product2: "Мини-курс «Бюджет за 7 дней»",
      desc2: "7 уроков в Telegram",
      amount2: 2900,
    },
    looks: LOOKS,
    advantages: ADVANTAGES,
    faq: FAQ,
    ctaTitle: "Продавайте гайды прямо из поста",
  },
  {
    slug: "events",
    param: "site_events",
    label: "Организаторам мероприятий",
    short: "Мероприятия",
    icon: ICON.ticket,
    seo: {
      title: seoTitle("Продавайте билеты на мероприятия в своём канале"),
      description: "Вебинары, мастер-классы и офлайн-встречи: билеты с оплатой по СБП прямо в посте.",
    },
    h1: "Продавайте билеты на мероприятия в своём канале",
    sub: "Вебинары, мастер-классы и офлайн-встречи: билеты с оплатой по СБП прямо в посте.",
    pains: [
      "Список оплативших ведётся в таблице вручную",
      "Сложно понять, сколько мест осталось",
      "Переводы приходят без имени и назначения",
    ],
    painDraft: false,
    examples: ["Билет на вебинар", "Мастер-класс", "Встреча-нетворкинг"],
    cardType: "Билет",
    cardBtn: "Оплатить",
    phone: {
      channel: "Встречи основателей",
      initials: "ВО",
      subs: "5 740 подписчиков",
      prePost: "Следующая встреча — 12 октября, 19:00.",
      cover: "Билет",
      product: "Билет на воркшоп 12 октября",
      desc: "Москва, 30 мест",
      amount: 2500,
      product2: "Билет на вебинар",
      desc2: "Онлайн, запись включена",
      amount2: 900,
    },
    looks: LOOKS,
    advantages: ADVANTAGES,
    faq: FAQ,
    ctaTitle: "Продавайте билеты в своём канале",
  },
  {
    slug: "donations",
    param: "site_donate",
    label: "Авторам и блогерам",
    short: "Донаты",
    icon: ICON.gift,
    seo: {
      title: seoTitle("Поддержка от подписчиков — донаты в вашем канале"),
      description: "Добавьте карточку доната в канал: читатели поддерживают вас в пару нажатий.",
    },
    h1: "Поддержка от подписчиков — донаты в вашем канале",
    sub: "Добавьте карточку доната в канал: читатели поддерживают вас в пару нажатий.",
    pains: [
      "Номер карты в описании канала выглядит несерьёзно",
      "Читатели хотят поддержать, но не знают как",
      "Внешние сервисы уводят аудиторию из Telegram",
    ],
    painDraft: false,
    examples: ["Поддержать автора", "Донат на проект"],
    cardType: "Донат",
    cardBtn: "Поддержать",
    phone: {
      channel: "Заметки натуралиста",
      initials: "ЗН",
      subs: "14 200 подписчиков",
      prePost: "Спасибо, что читаете. Если хотите поддержать канал — кнопка ниже.",
      cover: "Донат",
      product: "Поддержать канал",
      desc: "Любая сумма",
      amount: 300,
      product2: "Донат на экспедицию",
      desc2: "Сбор на поездку в октябре",
      amount2: 500,
    },
    looks: LOOKS,
    advantages: ADVANTAGES,
    faq: FAQ,
    ctaTitle: "Принимайте поддержку в своём канале",
  },
];

export const getSolution = (slug: string): Solution | undefined => SOLUTIONS.find((s) => s.slug === slug);

/** Маркер незаполненных данных — такие ответы не попадают в JSON-LD. */
export const TODO_RE = /\[УТОЧНИТЬ[^\]]*\]/;
