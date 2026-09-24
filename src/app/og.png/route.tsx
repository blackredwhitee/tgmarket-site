import { ImageResponse } from "next/og";

// Брендированная OG-обложка 1200×630 (ТЗ §7.4). Генерируется при сборке.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

async function font(weight: number) {
  // Без User-Agent Google Fonts отдаёт TTF — его понимает satori.
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}&subset=cyrillic`)).text();
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  return (await fetch(url!)).arrayBuffer();
}

/** /og.png — общая OG/Twitter-обложка для всех страниц. */
export async function GET() {
  const [f800, f500] = await Promise.all([font(800), font(500)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F5F7FE", fontFamily: "Manrope", color: "#0B1233", backgroundImage: "radial-gradient(55% 60% at 12% 18%, rgba(185,202,255,.55), transparent 70%), radial-gradient(35% 45% at 88% 88%, rgba(255,225,74,.22), transparent 70%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 800 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: "#1D4FFA", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
          </div>
          TG Market
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
          <div style={{ display: "flex" }}>Продавайте прямо</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", background: "#1D4FFA", color: "#fff", padding: "0 16px 4px", borderRadius: 18, transform: "rotate(-2deg)" }}>в Telegram</div>
          </div>
          <div style={{ display: "flex" }}>без сайта и кассы</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, fontWeight: 500, color: "#4A5372" }}>
          <div style={{ display: "flex", background: "#FFE14A", color: "#0B1233", fontWeight: 800, borderRadius: 30, padding: "10px 22px" }}>3% в первый месяц</div>
          Оплата по СБП прямо из поста в канале
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: f800, weight: 800 }, { name: "Manrope", data: f500, weight: 500 }] },
  );
}
