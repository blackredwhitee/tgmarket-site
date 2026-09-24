# TG Market — сайт

Многостраничный маркетинговый сайт TG Market (продажи и приём оплаты по СБП в Telegram).
Сделан по дизайн-хэндову TG Market (v2). Хэндов и ТЗ — внутренние материалы, в репозиторий не входят: локально лежат в `design/`.

**Стек:** Next.js 15 (App Router, статический экспорт), TypeScript, CSS Modules, Manrope (self-host через `next/font`).
Анимации — CSS transitions + Web Animations API, только `transform`/`opacity`, с учётом `prefers-reduced-motion`.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статика в out/
```

Деплой: GitHub Actions → GitHub Pages на каждый push в `main` (`.github/workflows/deploy.yml`, `GITHUB_PAGES=true` включает basePath `/tgmarket-site`).

## Страницы

| URL | start-параметр бота |
|---|---|
| `/` | `site_home` |
| `/how-it-works/` | `site_how` |
| `/solutions/{psychologists,experts,infoproducts,events,donations}/` | `site_psy`, `site_exp`, `site_info`, `site_events`, `site_donate` |
| `/pricing/` | `site_pricing` |
| `/partners/` | `site_partner` |
| `/faq/` | `site_faq` |
| `/contacts/`, `/legal/{offer,privacy,cookies}/` | — |
| 404 | `site_404` |

## Где что

- `src/components/` — общие: `Header`, `Footer`, `FinalCTA`, `Phone` (мокап Telegram со всеми сценами), `BotLink`, `CookieBanner`, `StickyMobileCTA`, `Motion` (reveal/intro по `data-*`).
- `src/data/` — контент (ниши, тарифы, FAQ, юр. документы) — кандидаты на перенос в headless CMS.
- `src/lib/config.ts` — домен, ID Яндекс Метрики, словарь UTM-кодов.
- Ссылки на бота формирует одна функция `botLink()`; UTM из URL сохраняются в sessionStorage и добавляются суффиксом к start-параметру.
- Метрика грузится только после согласия в cookie-баннере. Цели: `bot_click`, `partner_click`, `calc_use`, `faq_open`, `niche_open`, `scroll_75`.

## Открытые вопросы

Места с данными, которые подтверждает команда, помечены плашками `[УТОЧНИТЬ …]` (класс `.todo`) и `TODO` в коде; перед продакшном сборка с `NEXT_PUBLIC_HIDE_TODO=1` их скрывает. Также нужно: фирменный логотип, ID Метрики, финальный домен (`SITE_URL`), реквизиты, тексты юр. документов, ставки тарифа, кейсы.
