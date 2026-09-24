/** start-параметр бота для страницы (ТЗ §2). */
const MAP: [RegExp, string][] = [
  [/^\/how-it-works/, "site_how"],
  [/^\/solutions\/psychologists/, "site_psy"],
  [/^\/solutions\/experts/, "site_exp"],
  [/^\/solutions\/infoproducts/, "site_info"],
  [/^\/solutions\/events/, "site_events"],
  [/^\/solutions\/donations/, "site_donate"],
  [/^\/pricing/, "site_pricing"],
  [/^\/partners/, "site_partner"],
  [/^\/faq/, "site_faq"],
];
export function pageParam(path: string): string {
  return MAP.find(([re]) => re.test(path))?.[1] ?? "site_home";
}
