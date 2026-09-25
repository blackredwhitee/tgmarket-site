"use client";
import { useEffect, useRef } from "react";
import { onVisible, reducedMotion } from "@/lib/motion";
import s from "./Life.module.css";

/**
 * «Жизнь» для блоков сайта: маскоты, дрейфующие фоновые пятна, наклон за курсором и параллакс.
 * Всё декоративное (aria-hidden), только transform/opacity, при reduced-motion — статично.
 */

type Src = { src: string; width: number; height: number };

/** Маскот-пакетик: «выпрыгивает» при появлении, затем мягко покачивается; на hover подпрыгивает. */
export function Mascot({ img, size = 150, className, style, delay = 0 }: { img: Src; size?: number; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !el.animate) return;
    const anims: Animation[] = [];
    const off = onVisible(el, () => {
      anims.push(el.animate(
        [{ opacity: 0, transform: "translateY(30px) scale(.7)" }, { opacity: 1, transform: "translateY(-6px) scale(1.04)", offset: 0.7 }, { opacity: 1, transform: "none" }],
        { duration: 700, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" },
      ));
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner) anims.push(inner.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-10px)" }, { transform: "translateY(0)" }],
        { duration: 3600, delay: delay + 700, iterations: Infinity, easing: "ease-in-out" },
      ));
    }, 0.3);
    return () => { off(); anims.forEach((a) => a.cancel()); };
  }, [delay]);
  const h = Math.round((size * img.height) / img.width);
  return (
    <div ref={ref} className={`${s.mascot} ${className ?? ""}`} style={style} aria-hidden="true">
      <div className={s.mascotInner}>
        <img src={img.src} alt="" width={size} height={h} draggable={false} />
      </div>
    </div>
  );
}

/** Два мягких пятна (голубое и коралловое), медленно дрейфующих за содержимым секции. */
export function LiveBg({ tone = "default" }: { tone?: "default" | "warm" | "cool" }) {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const list = [
      a.current?.animate([{ transform: "translate(0,0) scale(1)" }, { transform: "translate(120px,60px) scale(1.15)" }, { transform: "translate(0,0) scale(1)" }], { duration: 22000, iterations: Infinity, easing: "ease-in-out" }),
      b.current?.animate([{ transform: "translate(0,0) scale(1)" }, { transform: "translate(-140px,-50px) scale(1.1)" }, { transform: "translate(0,0) scale(1)" }], { duration: 26000, delay: -9000, iterations: Infinity, easing: "ease-in-out" }),
    ];
    return () => list.forEach((x) => x?.cancel());
  }, []);
  return (
    <div className={`${s.bg} ${s[tone]}`} aria-hidden="true">
      <div ref={a} className={s.blobA} />
      <div ref={b} className={s.blobB} />
    </div>
  );
}

/**
 * Глубина: лёгкий наклон за курсором (до 5°, только мышь) + параллакс при прокрутке.
 * В покое элемент ровный.
 */
export function Depth({ children, parallax = 40, tilt = true, className }: { children: React.ReactNode; parallax?: number; tilt?: boolean; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i || reducedMotion()) return;
    let raf = 0, visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) tick(); }, { rootMargin: "100px" });
    io.observe(o);
    // Параллакс: смещение от −parallax/2 до +parallax/2 по мере прохождения блока через экран
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = o.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
        o.style.transform = `translateY(${(-p * parallax) / 2}px)`;
      });
    };
    const onScroll = () => visible && tick();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      const r = i.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      i.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`;
    };
    const leave = () => { i.style.transform = ""; };
    if (tilt && fine) { i.addEventListener("pointermove", move); i.addEventListener("pointerleave", leave); }
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      i.removeEventListener("pointermove", move);
      i.removeEventListener("pointerleave", leave);
    };
  }, [parallax, tilt]);

  return (
    <div ref={outer} className={`${s.depth} ${className ?? ""}`}>
      <div ref={inner} className={s.tilt}>{children}</div>
    </div>
  );
}
