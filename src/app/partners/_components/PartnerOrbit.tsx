"use client";
import { useEffect, useRef, useState } from "react";
import { reducedMotion, useInView } from "@/lib/motion";
import { rub } from "@/lib/format";
import Face, { type FaceProps } from "@/components/Face";
import s from "./PartnerOrbit.module.css";

// Декоративные «продавцы» на орбите — иллюстрированные лица в фирменных цветах
const FACES: FaceProps[] = [
  { bg: "#FB7E5E", skin: "#F6D3B8", hair: "#3B2A20", shirt: "#0B1233", style: "long" },
  { bg: "#7BD0FF", skin: "#E8B998", hair: "#1F1A17", shirt: "#FB7E5E", style: "beard" },
  { bg: "#0B1233", skin: "#F2C4A4", hair: "#C9853F", shirt: "#7BD0FF", style: "bun" },
  { bg: "#E6F6FF", skin: "#8D5A3B", hair: "#1F1A17", shirt: "#FB7E5E", style: "curly" },
  { bg: "#FDB29E", skin: "#F6D3B8", hair: "#6B4A2E", shirt: "#0B1233", style: "short", glasses: true },
  { bg: "#FFF1EC", skin: "#C98F6B", hair: "#2A1F1A", shirt: "#7BD0FF", style: "bob" },
];
const SELLERS = FACES.map((f, k) => {
  const r = (k * 60 * Math.PI) / 180;
  // toFixed — чтобы строки совпадали на сервере и клиенте (гидратация)
  return { f, k, x: (50 + 50 * Math.cos(r)).toFixed(3) + "%", y: (50 + 50 * Math.sin(r)).toFixed(3) + "%" };
});

const TURN = 60000; // 60s на оборот
const COIN_EVERY = 1500;
const COIN_DUR = 800;
const STEP = 1500;
const MAX = 60000;

/**
 * Орбита партнёрки: аватары вращаются (с контр-вращением букв), монетки «₽» летят по дуге в центр,
 * счётчик «Ваш доход» растёт. Вне экрана — пауза; reduced-motion — статичный кадр.
 */
export default function PartnerOrbit() {
  const [boxRef, inView] = useInView<HTMLDivElement>();
  const orbitRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const [income, setIncome] = useState(0);

  // Вращение орбиты и контр-вращение аватаров (создаются один раз, стартуют на паузе)
  useEffect(() => {
    const o = orbitRef.current;
    if (!o || !o.animate || reducedMotion()) return;
    const list: Animation[] = [
      o.animate([{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: TURN, iterations: Infinity }),
    ];
    o.querySelectorAll<HTMLElement>("[data-av]").forEach((el) =>
      list.push(el.animate([{ transform: "rotate(0)" }, { transform: "rotate(-360deg)" }], { duration: TURN, iterations: Infinity })),
    );
    list.forEach((a) => a.pause());
    anims.current = list;
    const layer = layerRef.current;
    return () => {
      list.forEach((a) => a.cancel());
      anims.current = [];
      layer?.replaceChildren();
    };
  }, []);

  // Пауза вне экрана
  useEffect(() => {
    const list = anims.current;
    if (!list.length) return;
    if (!inView) {
      list.forEach((a) => a.pause());
      return;
    }
    list.forEach((a) => a.play());

    const coin = () => {
      const box = boxRef.current, layer = layerRef.current, o = orbitRef.current;
      if (!box || !layer || !o) return;
      const avs = o.querySelectorAll<HTMLElement>("[data-av]");
      if (!avs.length) return;
      const av = avs[Math.floor(Math.random() * avs.length)];
      const br = box.getBoundingClientRect(), ar = av.getBoundingClientRect();
      const sc = br.width / box.offsetWidth || 1;
      const x0 = (ar.left + ar.width / 2 - br.left) / sc, y0 = (ar.top + ar.height / 2 - br.top) / sc;
      const cx = box.offsetWidth / 2, cy = box.offsetHeight / 2;
      const c = document.createElement("div");
      c.className = s.coin;
      c.textContent = "₽";
      layer.appendChild(c);
      // Контрольная точка дуги — смещение перпендикулярно отрезку аватар → центр
      const mx = (x0 + cx) / 2 + (y0 - cy) * 0.3, my = (y0 + cy) / 2 - (x0 - cx) * 0.3;
      const a = c.animate(
        [
          { transform: `translate(${x0}px,${y0}px) scale(.6)`, opacity: 0 },
          { transform: `translate(${mx}px,${my}px) scale(1)`, opacity: 1, offset: 0.5 },
          { transform: `translate(${cx}px,${cy}px) scale(.5)`, opacity: 0 },
        ],
        { duration: COIN_DUR, easing: "cubic-bezier(.65,0,.35,1)" },
      );
      a.onfinish = () => {
        c.remove();
        setIncome((v) => (v >= MAX ? 0 : v + STEP));
      };
    };
    const iv = setInterval(coin, COIN_EVERY);
    return () => clearInterval(iv);
  }, [inView, boxRef]);

  return (
    <div ref={boxRef} className={s.box} aria-hidden="true">
      <div className={s.ring} />
      <div className={s.inner} />
      <div ref={orbitRef} className={s.orbit}>
        {SELLERS.map((v) => (
          <div key={v.k} className={s.slot} style={{ left: v.x, top: v.y }}>
            <div data-av="" className={s.avatar} style={{ overflow: "hidden" }}>
              <Face {...v.f} size={120} />
            </div>
          </div>
        ))}
      </div>
      <div ref={layerRef} className={s.layer} />
      <div className={s.center}>
        <span className={s.label}>Ваш доход</span>
        <b className={s.income}>{rub(income)}</b>
        <span className={s.note}>пример</span>
      </div>
    </div>
  );
}
