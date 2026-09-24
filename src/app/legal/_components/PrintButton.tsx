"use client";
import s from "./PrintButton.module.css";

const PRINTER = "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z";

export default function PrintButton() {
  return (
    <button type="button" className={s.btn} onClick={() => window.print()}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PRINTER} /></svg>
      Версия для печати
    </button>
  );
}
