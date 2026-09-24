"use client";
import { useEffect, useState } from "react";
import BotLink from "./BotLink";
import { Icon, ICON } from "./icons";
import s from "./StickyMobileCTA.module.css";

/** Липкая CTA на mobile: появляется после hero ([data-hero]), прячется при видимом Final CTA / футере ([data-hide-sticky]). */
export default function StickyMobileCTA({ param = "site_home" }: { param?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const hides = Array.from(document.querySelectorAll("[data-hide-sticky]"));
    const vis = new Set<Element>();
    const io1 = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (hero) io1.observe(hero);
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)));
      setBlocked(vis.size > 0);
    });
    hides.forEach((h) => io2.observe(h));
    return () => { io1.disconnect(); io2.disconnect(); };
  }, []);

  const on = pastHero && !blocked;
  return (
    <div className={`${s.bar} ${on ? s.on : ""}`} aria-hidden={!on}>
      <BotLink param={param} block="sticky_mobile" className={s.btn} tabIndex={on ? 0 : -1}>
        <Icon d={ICON.send} size={18} sw={2.2} />Начать продавать
      </BotLink>
      <span className={s.note}>Первым селлерам — 3% на 2 месяца</span>
    </div>
  );
}
