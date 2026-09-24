"use client";
import { useEffect, useRef, useState } from "react";

export const EASE = "cubic-bezier(0.22,1,0.36,1)";

export function reducedMotion(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** Колбэк один раз при появлении элемента в зоне видимости. */
export function onVisible(el: Element | null, fn: () => void, threshold = 0.15): () => void {
  if (!el) return () => {};
  if (!("IntersectionObserver" in window)) {
    fn();
    return () => {};
  }
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(); } }),
    { threshold },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** Твин числа с ease-out cubic. Возвращает функцию отмены. */
export function tween(from: number, to: number, dur: number, cb: (v: number) => void): () => void {
  if (reducedMotion() || dur <= 0) { cb(to); return () => {}; }
  let raf = 0;
  const t0 = performance.now();
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    cb(from + (to - from) * e);
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** Покачивание по Y (float из прототипа). */
export function float(el: HTMLElement | null, amp: number, dur: number, phase = 0): Animation | undefined {
  if (!el || reducedMotion() || !el.animate) return;
  return el.animate(
    [
      { transform: "translateY(0)" }, { transform: `translateY(${-amp}px)` },
      { transform: "translateY(0)" }, { transform: `translateY(${amp}px)` }, { transform: "translateY(0)" },
    ],
    { duration: dur, delay: -phase, iterations: Infinity, easing: "ease-in-out" },
  );
}

/** true, пока элемент в зоне видимости (для паузы циклов вне экрана). */
export function useInView<T extends Element>(rootMargin = "100px"): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}

/** Один раз стал видимым. */
export function useSeen<T extends Element>(threshold = 0.15): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => onVisible(ref.current, () => setSeen(true), threshold), [threshold]);
  return [ref, seen];
}

/** Счётчик от 0 до value за dur мс при первом появлении. */
export function useCountUp<T extends Element>(value: number, dur = 800): [React.RefObject<T | null>, number, boolean] {
  const [ref, seen] = useSeen<T>();
  const [v, setV] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!seen) return;
    if (reducedMotion()) { setV(value); setDone(true); return; }
    return tween(0, value, dur, (x) => { setV(x); if (x >= value) setDone(true); });
  }, [seen, value, dur]);
  return [ref, v, done];
}

/** Анимируемое значение: при смене target твинится за dur мс. */
export function useTweened(target: number, dur = 300): number {
  const [v, setV] = useState(target);
  const cur = useRef(target);
  useEffect(() => {
    const stop = tween(cur.current, target, dur, (x) => { cur.current = x; setV(x); });
    return stop;
  }, [target, dur]);
  return v;
}

export function useMediaQuery(q: string, initial = false): boolean {
  const [m, setM] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
