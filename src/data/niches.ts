import { ICON } from "@/components/icons";

/** Список ниш для меню/футера/главной. Полные данные страниц — в data/solutions.ts. */
export const NICHES = [
  { slug: "psychologists", title: "Психологам и коучам", sub: "Сессии и пакеты консультаций", icon: ICON.heart },
  { slug: "experts", title: "Экспертам и наставникам", sub: "Разборы, менторство, консультации", icon: ICON.briefcase },
  { slug: "infoproducts", title: "Авторам инфопродуктов", sub: "Гайды, чек-листы, курсы", icon: ICON.bookOpen },
  { slug: "events", title: "Организаторам мероприятий", sub: "Билеты на онлайн- и офлайн-события", icon: ICON.ticket },
  { slug: "donations", title: "Авторам и блогерам", sub: "Донаты от подписчиков", icon: ICON.gift },
] as const;
