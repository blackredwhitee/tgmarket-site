"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ICON } from "./icons";
import { rub } from "@/lib/format";
import { useInView } from "@/lib/motion";

/** Мокап Telegram — порт design/Phone.dc.html со всеми сценами. Декоративный (aria-hidden). */

export type PhoneScene = "pay" | "post" | "form" | "paid" | "chat" | "sbp" | "done" | "stack" | "404";
export type ChatMsg = { me?: boolean; text: string; buttons?: string[] };

export type PhoneProps = {
  scene?: PhoneScene;
  live?: boolean;
  toast?: "right" | "inside";
  channel?: string;
  initials?: string;
  subs?: string;
  prePost?: string;
  product?: string;
  desc?: string;
  amount?: number;
  cover?: string;
  icon?: string;
  product2?: string;
  amount2?: number;
  sales?: [string, number, string][];
  msgs?: ChatMsg[];
  delay?: number;
  onPaid?: (n: number) => void;
  className?: string;
  style?: CSSProperties;
};

const E = "cubic-bezier(.22,1,.36,1)";
const SEND = ICON.send;
const CHECK = ICON.check;

function prefersReduced() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export default function Phone(props: PhoneProps) {
  const s: PhoneScene = props.scene || "pay";
  const amount = props.amount ?? 3500;
  const product = props.product || "Консультация, 60 минут";
  const desc = props.desc || "Онлайн в Zoom или Telegram";
  const fields = [product, rub(amount), desc];
  const msgs: ChatMsg[] = props.msgs || [
    { me: true, text: "/start" },
    { text: "Здравствуйте! Я помогу принимать оплату в вашем Telegram-канале. Начнём?", buttons: ["Начать"] },
  ];

  const [st, setSt] = useState({ ph: 1, typed: 0, n: 0, amt: 0, dodge: 0 });
  const set = useCallback((p: Partial<typeof st>) => setSt((o) => ({ ...o, ...p })), []);
  const ringRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLSpanElement>(null);
  const [rootRef, inView] = useInView<HTMLDivElement>("80px");
  const onPaidRef = useRef(props.onPaid);
  onPaidRef.current = props.onPaid;

  const fieldsLen = fields.join("").length;
  const msgsLen = msgs.length;
  const live = props.live ?? true;
  const delay = props.delay ?? 1200;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const anims: Animation[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;
    let raf = 0;
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const anim = (el: Element | null, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
      if (!el || !(el as HTMLElement).animate) return;
      anims.push((el as HTMLElement).animate(kf, opt));
    };
    const pulse = (it: number) =>
      anim(ringRef.current, [{ transform: "scale(1)", opacity: 0.5 }, { transform: "scale(1.15)", opacity: 0 }], {
        duration: 1600, iterations: it, easing: E,
      });
    const countUp = () => {
      const t0 = performance.now();
      const f = (t: number) => {
        const p = Math.min(1, (t - t0) / 800);
        set({ amt: amount * (1 - Math.pow(1 - p, 3)) });
        if (p < 1) raf = requestAnimationFrame(f);
      };
      raf = requestAnimationFrame(f);
    };
    // Вне экрана циклы не крутим; при reduced-motion — сразу финальный кадр.
    const L = live && !prefersReduced() && inView;
    const still = !live || prefersReduced();

    if (s === "pay") {
      if (still) set({ ph: 5, amt: amount });
      else if (L) {
        set({ ph: 1, amt: 0 });
        const loop = () => {
          set({ ph: 0, amt: 0 });
          at(350, () => set({ ph: 1 }));
          at(1700, () => { set({ ph: 2 }); pulse(1); });
          at(2400, () => {
            set({ ph: 3 });
            anim(spinRef.current, [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: 800, iterations: Infinity });
          });
          at(3200, () => set({ ph: 4 }));
          at(4000, () => { set({ ph: 5 }); countUp(); onPaidRef.current?.(amount); });
          at(6400, () => set({ ph: 6 }));
          at(7000, loop);
        };
        at(delay, loop);
      }
    } else if (s === "post" || s === "404") {
      set({ ph: 1 });
      if (L && s === "post") at(60, () => pulse(Infinity));
    } else if (s === "form") {
      if (still) set({ ph: 4, typed: fieldsLen });
      else if (L) {
        const loop = () => {
          set({ ph: 0, typed: 0 });
          at(700, () => set({ ph: 1 }));
          at(1300, () => {
            set({ ph: 2 });
            let n = 0;
            clearInterval(iv);
            iv = setInterval(() => {
              n++;
              set({ typed: n });
              if (n >= fieldsLen) {
                clearInterval(iv);
                at(500, () => set({ ph: 3 }));
                at(1300, () => set({ ph: 4 }));
                at(4200, loop);
              }
            }, 30);
          });
        };
        loop();
      }
    } else if (s === "paid" || s === "stack") {
      const max = 3, step = s === "stack" ? 2000 : 1400;
      if (still) set({ n: max });
      else if (L) {
        const loop = () => {
          set({ n: 0 });
          for (let i = 1; i <= max; i++) at(400 + step * (i - 1), () => set({ n: i }));
          at(400 + step * max + 1400, loop);
        };
        loop();
      }
    } else if (s === "chat") {
      if (still) set({ n: msgsLen });
      else if (L) {
        set({ n: 0 });
        for (let i = 1; i <= msgsLen; i++) at(250 + i * 650, () => set({ n: i }));
      }
    } else set({ ph: 1 });

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(iv);
      cancelAnimationFrame(raf);
      anims.forEach((a) => a.cancel());
    };
  }, [s, live, inView, amount, fieldsLen, msgsLen, delay, set]);

  const { ph, typed, n, amt, dodge } = st;
  const isChannel = s === "pay" || s === "post" || s === "404";
  const isBot = s === "form" || s === "paid" || s === "chat";
  const is404 = s === "404";

  let r = typed;
  const labels = ["Название", "Цена", "Описание"];
  const formFields = fields.map((x, i) => {
    const t = x.slice(0, Math.max(0, r));
    const active = r > 0 && r <= x.length;
    r -= x.length;
    return { label: labels[i], value: t, caret: active && ph === 2 ? 1 : 0 };
  });
  const title = is404 ? "Страница не найдена" : product;
  const saleSrc: [string, number, string][] = props.sales || [
    [product, amount, "14:02"],
    [props.product2 || "Пакет из 4 встреч", props.amount2 ?? 12000, "14:18"],
    [product, amount, "14:41"],
  ];
  const cnt = Math.min(n, 3);
  const sum = saleSrc.slice(0, cnt).reduce((a, x) => a + x[1], 0);
  const dodges = [[0, 0], [14, -8], [-16, 5], [10, 8], [-10, -6]];
  const d = dodges[dodge % dodges.length];
  const toastVis = s === "pay" && ph === 5;
  const tpos = props.toast || "right";
  const sel = ph >= 1;
  const priceText = is404 ? "404 ₽" : rub(amount);
  const channel = props.channel || "Практика спокойствия";
  const sheetOpen = s === "pay" && (ph === 3 || ph === 4);

  return (
    <div ref={rootRef} className={props.className} aria-hidden="true"
      // isolation: слои сцены (затемнение, шторка, toast) не должны перекрывать соседние плавающие карточки
      style={{ position: "relative", isolation: "isolate", width: 300, height: 620, flex: "none", textAlign: "left", ...props.style }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 44, background: "#0B1233", padding: 9, boxShadow: "0 40px 80px -24px rgba(11,18,51,.35),0 12px 40px rgba(251,126,94,.10)" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", background: "linear-gradient(165deg,#D6E0F2 0%,#E4EAF6 55%,#DCE6F3 100%)" }}>
          <div style={{ position: "absolute", top: 10, left: "50%", width: 86, height: 25, marginLeft: -43, borderRadius: 20, background: "#000", zIndex: 12 }} />
          {s !== "stack" && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, zIndex: 6, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 22px 0 28px", fontSize: 14, fontWeight: 700, color: "#0B1233", background: "rgba(255,255,255,.96)" }}>
              <span>9:41</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 11 }}>
                  {[4, 6, 8, 11].map((h) => <span key={h} style={{ width: 3, height: h, background: "#0B1233", borderRadius: 1 }} />)}
                </span>
                <span style={{ width: 22, height: 11, border: "1.5px solid #0B1233", borderRadius: 3, padding: 1 }}>
                  <span style={{ display: "block", width: "70%", height: "100%", background: "#0B1233", borderRadius: 1 }} />
                </span>
              </span>
            </div>
          )}
          {(isChannel || isBot) && (
            <div style={{ position: "absolute", top: 44, left: 0, right: 0, height: 52, background: "rgba(255,255,255,.96)", display: "flex", alignItems: "center", gap: 10, padding: "0 12px", borderBottom: "1px solid #E3E7F2", zIndex: 5 }}>
              <Svg d={ICON.chevronLeft} size={20} stroke="#FB7E5E" sw={2} />
              {isBot ? (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FB7E5E", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <Svg d={SEND} size={16} stroke="#fff" sw={2.2} />
                </div>
              ) : (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#FFA98F,#FB7E5E)", color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  {props.initials || "ПС"}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0B1233", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{isBot ? "TG Market Seller" : channel}</div>
                <div style={{ fontSize: 11.5, color: "#8A92AD" }}>{isBot ? "бот" : props.subs || "12 480 подписчиков"}</div>
              </div>
            </div>
          )}

          {isChannel && (
            <>
              <div style={{ position: "absolute", top: 96, bottom: 48, left: 0, right: 0, padding: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, overflow: "hidden" }}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "10px 12px 8px", fontSize: 13, lineHeight: 1.45, color: "#0B1233", boxShadow: "0 1px 1px rgba(11,18,51,.06)" }}>
                  {props.prePost || "Открыла запись на октябрь. Оплатить консультацию можно прямо здесь, в канале."}
                  <div style={{ textAlign: "right", fontSize: 10.5, color: "#8A92AD", marginTop: 2 }}>2,4K · 11:20</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, opacity: s === "pay" && (ph === 0 || ph === 6) ? 0 : 1, transform: s === "pay" && ph === 0 ? "translateY(28px)" : "none", transition: `opacity .5s ${E},transform .5s ${E}` }}>
                  <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 1px rgba(11,18,51,.06)" }}>
                    <div style={{ height: 112, background: "linear-gradient(135deg,#E6F6FF 0%,#CDEEFF 100%)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#FB7E5E", fontWeight: 800, fontSize: is404 ? 44 : 15 }}>
                      {!is404 && <Svg d={props.icon || ICON.heart} size={30} stroke="#FB7E5E" sw={1.6} />}
                      <span>{is404 ? "404" : props.cover || "Сессия"}</span>
                    </div>
                    <div style={{ padding: "10px 12px 8px", display: "flex", flexDirection: "column", gap: 3 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0B1233", lineHeight: 1.3 }}>{title}</div>
                      <div style={{ fontSize: 12.5, color: "#4A5372", lineHeight: 1.4 }}>{is404 ? "Зато оплата в Telegram работает." : desc}</div>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#0B1233", fontVariantNumeric: "tabular-nums" }}>{priceText}</span>
                        <span style={{ fontSize: 10.5, color: "#8A92AD" }}>14:02</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <div ref={ringRef} style={{ position: "absolute", inset: 0, borderRadius: 11, border: "2px solid #FB7E5E", opacity: 0, pointerEvents: "none" }} />
                    <div onMouseEnter={() => is404 && set({ dodge: dodge + 1 })}
                      style={{ height: 40, borderRadius: 11, background: "#FB7E5E", color: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transform: is404 ? `translate(${d[0]}px,${d[1]}px)` : s === "pay" && ph === 2 ? "scale(.96)" : "none", transition: `transform .18s ${E}`, cursor: "pointer" }}>
                      {is404 ? "Оплатить" : "Оплатить · " + rub(amount)}
                    </div>
                    <div style={{ position: "absolute", left: "62%", top: 6, width: 30, height: 30, borderRadius: "50%", background: "rgba(11,18,51,.28)", border: "2px solid #fff", opacity: s === "pay" && ph === 2 ? 1 : 0, transform: s === "pay" && ph === 2 ? "scale(1)" : "scale(1.4)", transition: "opacity .2s,transform .25s", pointerEvents: "none" }} />
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 48, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#FB7E5E", borderTop: "1px solid #E3E7F2" }}>Без звука</div>
            </>
          )}

          {isBot && (
            <>
              <div style={{ position: "absolute", top: 96, bottom: 48, left: 0, right: 0, padding: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8, overflow: "hidden" }}>
                {s === "form" && (
                  <>
                    <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "9px 12px", fontSize: 13, color: "#0B1233", lineHeight: 1.4 }}>Какую карточку создаём?</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, maxWidth: "88%" }}>
                      {["Товар", "Услуга", "Билет", "Донат"].map((l) => {
                        const on = l === "Услуга" && sel;
                        return (
                          <div key={l} style={{ height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 600, background: on ? "#FB7E5E" : "rgba(255,255,255,.75)", color: on ? "#fff" : "#FB7E5E", transition: "background .25s,color .25s" }}>{l}</div>
                        );
                      })}
                    </div>
                    <div style={{ alignSelf: "flex-end", background: "#CDEEFF", borderRadius: "14px 14px 4px 14px", padding: "8px 12px", fontSize: 13, color: "#0B1233", opacity: ph >= 1 ? 1 : 0, transform: ph >= 1 ? "none" : "translateY(10px)", transition: "opacity .3s,transform .3s" }}>Услуга</div>
                    <div style={{ alignSelf: "flex-start", width: "88%", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8, opacity: ph >= 2 ? 1 : 0, transform: ph >= 2 ? "none" : "translateY(14px)", transition: `opacity .4s,transform .4s ${E}` }}>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: "#FB7E5E" }}>Новая карточка · Услуга</div>
                      {formFields.map((f) => (
                        <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 2, borderBottom: "1px solid #E3E7F2", paddingBottom: 6 }}>
                          <span style={{ fontSize: 10.5, color: "#8A92AD" }}>{f.label}</span>
                          <span style={{ fontSize: 13, color: "#0B1233", fontWeight: 600, minHeight: 18 }}>
                            {f.value}
                            <span style={{ display: "inline-block", width: 1.5, height: 13, background: "#FB7E5E", marginLeft: 1, verticalAlign: -2, opacity: f.caret }} />
                          </span>
                        </div>
                      ))}
                      <div style={{ height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: ph >= 3 ? "#FB7E5E" : "#E6F6FF", color: ph >= 3 ? "#fff" : "#FB7E5E", transition: "background .3s,color .3s" }}>Опубликовать в канал</div>
                    </div>
                    <div style={{ alignSelf: "flex-start", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "8px 12px", fontSize: 13, color: "#0B1233", display: "flex", alignItems: "center", gap: 6, opacity: ph >= 4 ? 1 : 0, transition: "opacity .3s" }}>
                      <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#18A957", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Svg d={CHECK} size={10} stroke="#fff" sw={3.5} /></span>
                      Карточка опубликована
                    </div>
                  </>
                )}
                {s === "paid" && (
                  <>
                    {saleSrc.map((x, i) => (
                      <div key={i} style={{ alignSelf: "flex-start", width: "86%", background: "#fff", borderRadius: "14px 14px 14px 4px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 3, opacity: i < n ? 1 : 0, transform: i < n ? "none" : "translateY(16px)", transition: `opacity .4s,transform .4s ${E}` }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "#18A957" }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#18A957" }} />Оплата получена</span>
                        <span style={{ fontSize: 13, color: "#0B1233", lineHeight: 1.35 }}>{x[0]}</span>
                        <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <b style={{ fontSize: 16, color: "#0B1233", fontVariantNumeric: "tabular-nums" }}>+{rub(x[1])}</b>
                          <span style={{ fontSize: 10.5, color: "#8A92AD" }}>СБП · {x[2]}</span>
                        </span>
                      </div>
                    ))}
                    <div style={{ alignSelf: "flex-start", background: "#E6F6FF", borderRadius: 12, padding: "8px 12px", fontSize: 12.5, color: "#0B1233", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                      Сегодня: {cnt + (cnt === 1 ? " продажа" : " продажи")} · {rub(sum)}
                    </div>
                  </>
                )}
                {s === "chat" &&
                  msgs.map((m, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: m.me ? "flex-end" : "flex-start", opacity: i < n ? 1 : 0, transform: i < n ? "none" : "translateY(12px)", transition: `opacity .35s,transform .35s ${E}` }}>
                      <div style={{ maxWidth: "86%", background: m.me ? "#CDEEFF" : "#fff", borderRadius: m.me ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "9px 12px", fontSize: 13, color: "#0B1233", lineHeight: 1.4, whiteSpace: "pre-line" }}>{m.text}</div>
                      {!!m.buttons?.length && (
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(2, m.buttons.length)},1fr)`, gap: 5, width: "86%" }}>
                          {m.buttons.map((b) => (
                            <div key={b} style={{ minHeight: 32, borderRadius: 9, background: "rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#FB7E5E", padding: "0 6px", textAlign: "center" }}>{b}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 48, background: "#fff", display: "flex", alignItems: "center", gap: 10, padding: "0 12px", borderTop: "1px solid #E3E7F2" }}>
                <span style={{ flex: 1, height: 32, borderRadius: 16, background: "#F2F4F9", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#8A92AD" }}>Сообщение</span>
                <Svg d={SEND} size={20} stroke="#8A92AD" sw={1.8} />
              </div>
            </>
          )}

          {s === "pay" && (
            <>
              <div style={{ position: "absolute", inset: 0, background: "rgba(11,18,51,.38)", zIndex: 7, opacity: sheetOpen ? 1 : 0, transition: "opacity .35s" }} />
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 8, background: "#fff", borderRadius: "22px 22px 0 0", padding: "10px 18px 24px", display: "flex", flexDirection: "column", gap: 10, transform: sheetOpen ? "translateY(0)" : "translateY(105%)", transition: `transform .45s ${E}` }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, background: "#E3E7F2", alignSelf: "center" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SbpTag /><span style={{ fontSize: 15, fontWeight: 700, color: "#0B1233" }}>Оплата по СБП</span></div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#0B1233", letterSpacing: "-.02em", fontVariantNumeric: "tabular-nums" }}>{priceText}</div>
                <div style={{ fontSize: 13, color: "#4A5372" }}>{title} · {channel}</div>
                <div style={{ position: "relative", height: 56, borderTop: "1px solid #E3E7F2", marginTop: 4 }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#4A5372", opacity: ph === 3 ? 1 : 0, transition: "opacity .25s" }}>
                    <span ref={spinRef} style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid #E6F6FF", borderTopColor: "#FB7E5E", flex: "none" }} />
                    Подтвердите оплату в приложении банка
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 700, color: "#18A957", opacity: ph === 4 ? 1 : 0, transform: ph === 4 ? "none" : "scale(.9)", transition: `opacity .25s,transform .35s ${E}` }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#18A957", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Svg d={CHECK} size={15} stroke="#fff" sw={3} /></span>
                    Оплачено
                  </div>
                </div>
              </div>
            </>
          )}

          {s === "pay" && tpos === "inside" && (
            <div style={{ position: "absolute", top: 50, left: 8, right: 8, zIndex: 9, background: "#fff", borderRadius: 16, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 40px rgba(251,126,94,.20)", opacity: toastVis ? 1 : 0, transform: toastVis ? "none" : "translateY(-16px)", transition: `opacity .4s,transform .45s ${E}` }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#18A957", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Svg d={CHECK} size={16} stroke="#fff" sw={3} /></span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 12, color: "#4A5372" }}>Оплата получена</span>
                <b style={{ fontSize: 17, color: "#0B1233", fontVariantNumeric: "tabular-nums" }}>+{rub(amt)}</b>
              </span>
            </div>
          )}

          {s === "sbp" && (
            <div style={{ position: "absolute", inset: "44px 0 0 0", background: "#fff", padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SbpTag /><span style={{ fontSize: 15, fontWeight: 700, color: "#0B1233" }}>Оплата по СБП</span></div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#0B1233", letterSpacing: "-.02em" }}>{priceText}</div>
              <div style={{ fontSize: 13, color: "#4A5372", marginTop: -6 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#8A92AD", marginTop: 8 }}>Выберите банк</div>
              {[{ c: "#DDE4F7", w: 96 }, { c: "#E4E9F4", w: 120 }, { c: "#D9E0F2", w: 80 }, { c: "#E1E6F3", w: 108 }].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, height: 48, borderRadius: 12, border: `1px solid ${i === 0 ? "#FB7E5E" : "#E3E7F2"}`, padding: "0 12px", background: i === 0 ? "#E6F6FF" : "#fff" }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: b.c, flex: "none" }} />
                  <span style={{ height: 9, width: b.w, borderRadius: 5, background: "#E3E7F2" }} />
                </div>
              ))}
              <div style={{ marginTop: "auto", height: 46, borderRadius: 12, background: "#FB7E5E", color: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>Перейти в приложение банка</div>
            </div>
          )}

          {s === "done" && (
            <div style={{ position: "absolute", inset: "44px 0 0 0", background: "#fff", padding: "60px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
              <span style={{ width: 72, height: 72, borderRadius: "50%", background: "#18A957", display: "flex", alignItems: "center", justifyContent: "center" }}><Svg d={CHECK} size={36} stroke="#fff" sw={2.6} /></span>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#0B1233", marginTop: 8 }}>Оплата прошла</div>
              <div style={{ fontSize: 13, color: "#4A5372" }}>{priceText} · {title}</div>
              <div style={{ marginTop: 14, width: "100%", border: "1px solid #E3E7F2", borderRadius: 12, padding: 12, fontSize: 12.5, color: "#4A5372", lineHeight: 1.4 }}>Ссылка на материалы — в сообщении от бота</div>
              <div style={{ marginTop: "auto", width: "100%", height: 46, borderRadius: 12, background: "#E6F6FF", color: "#FB7E5E", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>Вернуться в канал</div>
            </div>
          )}

          {s === "stack" && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg,#2A3F9E 0%,#141F57 45%,#0B1233 100%)", color: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 22px 0 28px", fontSize: 14, fontWeight: 700 }}>
                <span>9:41</span>
                <span style={{ width: 22, height: 11, border: "1.5px solid #fff", borderRadius: 3 }} />
              </div>
              <div style={{ textAlign: "center", marginTop: 34, fontSize: 13, opacity: 0.85 }}>Среда, 24 сентября</div>
              <div style={{ textAlign: "center", fontSize: 68, fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1 }}>14:02</div>
              <div style={{ position: "absolute", left: 10, right: 10, top: 200 }}>
                {saleSrc.map((x, i) => (
                  <div key={i} style={{ position: "absolute", left: 0, right: 0, top: 0, background: "rgba(255,255,255,.16)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: 18, padding: "11px 12px", display: "flex", flexDirection: "column", gap: 3, opacity: i < n ? 1 : 0, transform: i < n ? `translateY(${(n - 1 - i) * 84}px) scale(${1 - (n - 1 - i) * 0.03})` : "translateY(-18px) scale(.96)", transition: `opacity .45s,transform .5s ${E}` }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, opacity: 0.85 }}>
                      <span style={{ width: 18, height: 18, borderRadius: 5, background: "#FB7E5E", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Svg d={SEND} size={10} stroke="#fff" sw={2.6} /></span>
                      TG Market Seller<span style={{ marginLeft: "auto" }}>{i === n - 1 ? "сейчас" : x[2]}</span>
                    </span>
                    <b style={{ fontSize: 14 }}>Оплата получена · +{rub(x[1])}</b>
                    <span style={{ fontSize: 12.5, opacity: 0.85 }}>{x[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {s === "pay" && tpos === "right" && (
        <div style={{ position: "absolute", left: 236, top: 150, zIndex: 10, width: 216, background: "#fff", borderRadius: 16, padding: 14, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 12px 40px rgba(251,126,94,.18)", border: "1px solid #E3E7F2", opacity: toastVis ? 1 : 0, transform: toastVis ? "none" : "translateX(24px)", transition: `opacity .4s,transform .5s ${E}` }}>
          <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#18A957", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><Svg d={CHECK} size={18} stroke="#fff" sw={3} /></span>
          <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 13, color: "#4A5372", fontWeight: 500 }}>Оплата получена</span>
            <b style={{ fontSize: 21, color: "#0B1233", letterSpacing: "-.01em", fontVariantNumeric: "tabular-nums" }}>+{rub(amt)}</b>
          </span>
        </div>
      )}
    </div>
  );
}

function Svg({ d, size, stroke, sw }: { d: string; size: number; stroke: string; sw: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function SbpTag() {
  return <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: "#0B1233", borderRadius: 6, padding: "3px 6px", letterSpacing: ".04em" }}>СБП</span>;
}
