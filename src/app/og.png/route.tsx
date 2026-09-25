import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Брендированная OG-обложка 1200×630 (ТЗ §7.4). Генерируется при сборке.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

// TTF лежат в репозитории, чтобы сборка не зависела от Google Fonts (satori не читает woff2).
async function font(weight: 500 | 800) {
  return readFile(path.join(process.cwd(), "src/fonts", `manrope-${weight}.ttf`));
}

/** /og.png — общая OG/Twitter-обложка для всех страниц. */
export async function GET() {
  const [f800, f500] = await Promise.all([font(800), font(500)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F5F7FE", fontFamily: "Manrope", color: "#0B1233" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, fontWeight: 800 }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, background: "#FB7E5E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
          </div>
          TG Market
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
          <div style={{ display: "flex" }}>Продавайте прямо</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", background: "#FB7E5E", color: "#fff", padding: "0 16px 4px", borderRadius: 18, transform: "rotate(-2deg)" }}>в Telegram</div>
          </div>
          <div style={{ display: "flex" }}>без сайта и кассы</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28, fontWeight: 500, color: "#4A5372" }}>
          <div style={{ display: "flex", background: "#7BD0FF", color: "#0B1233", fontWeight: 800, borderRadius: 30, padding: "10px 22px" }}>Комиссия от 3%</div>
          Оплата по СБП прямо из поста в канале
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: f800, weight: 800 }, { name: "Manrope", data: f500, weight: 500 }] },
  );
}
