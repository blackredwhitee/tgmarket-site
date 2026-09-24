"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadMetrika } from "@/lib/metrika";
import s from "./CookieBanner.module.css";

const KEY = "tgm_cookie_consent"; // "all" | "necessary"

/** Баннер cookie. До согласия Метрика не грузится. TODO: формулировка и механика — у юристов. */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (v === "all") loadMetrika();
    else if (!v) setShow(true);
  }, []);

  const save = (val: "all" | "necessary") => {
    try { localStorage.setItem(KEY, val); } catch {}
    if (val === "all") loadMetrika();
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className={s.banner} role="dialog" aria-label="Согласие на cookie">
      <p className={s.text}>
        Мы используем cookie и Яндекс Метрику, чтобы сайт работал лучше. Подробнее — в <Link href="/legal/cookies/">политике cookie</Link>.
      </p>
      {settings && (
        <div className={s.opts}>
          <label className={s.opt}><input type="checkbox" checked disabled /> Необходимые</label>
          <label className={s.opt}><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Аналитика (Яндекс Метрика)</label>
        </div>
      )}
      <div className={s.btns}>
        {settings ? (
          <button className={s.accept} onClick={() => save(analytics ? "all" : "necessary")}>Сохранить</button>
        ) : (
          <>
            <button className={s.accept} onClick={() => save("all")}>Принять</button>
            <button className={s.config} onClick={() => setSettings(true)}>Настроить</button>
          </>
        )}
      </div>
    </div>
  );
}
