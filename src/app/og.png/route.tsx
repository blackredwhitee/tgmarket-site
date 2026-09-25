import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Брендированная OG-обложка 1200×630 (ТЗ §7.4). Генерируется при сборке.
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };
// Знак логотипа TG Market (src/assets/logo-mark.svg)
const MARK = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MCA5Mi4xOCI+PGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICM3YmQwZmY7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPjxnPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0ibTg5LjUsMTMuMThjMC0xLjk3LS4yLTMuNTktLjYzLTQuODYtMS41Ni00LjctNi4zNi04LjMyLTExLjQyLTguMzJDNTUuNS4wMiwzMy44Ni4wMiwxMi41Mi4wMiw4LjgxLjAyLDUuNjgsMS4zMywzLjI1LDQuMDgsMS4xNSw2LjQ2LjA5LDkuMTIuMDgsMTIuMDcuMDMsMzAuNTUuMDIsNDkuODUuMDUsNzBjMCw1LjA4LDIuNDEsOC45NSw3LjE5LDExLjU4aDBjLjIxLjExLjI4LjM3LjE4LjU4LTEuMywyLjUxLTMuMzIsNC41Ny02LjA2LDYuMTctMS4xNy42OS0xLjg3LDEuOTYtLjg3LDMuMTguMzEuMzkuNzIuNTksMS4yMi42MSw0LjQuMTcsOC41OC0uMDUsMTIuNTUtLjY1LDYuNDktLjk5LDEyLjkzLTMuMDgsMTYuNzUtOC4zMy4xMS0uMTUuMjUtLjIzLjQzLS4yNi42Ni0uMSwxLjM0LS4xNSwyLjAzLS4xNSwxNS44OS0uMDcsMzAuMTUtLjA2LDQyLjc2LjA1LDYuOTkuMDYsMTMuMy00LjkxLDEzLjI3LTEyLjItLjA1LTE4LjYxLS4wNC0zNy43NC4wMi01Ny40WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0ibTM1LjIzLDI1LjhjLS4xMS0xLjI4LjAyLTIuNTMuMzctMy43NywzLjM5LTExLjgzLDIwLjU2LTguODUsMTkuODMsMy44LS4wMS4xOS4xNC4zNi4zMy4zN2guMDJjNC40OS0uMDMsNi40NywyLjM3LDYuNjQsNi42My4zMiw4LjA4LjcxLDE2LjM3LDEuMTgsMjQuODkuMjcsNC43Ny0xLjg5LDcuMDktNi42OCw3LjA5LTcuOSwwLTE1Ljk5LS4wMi0yNC4yNy0uMDMtMy42NCwwLTUuODEtMi44My01LjYzLTYuNDguMzUtNy40NS43Ny0xNi4wNywxLjI3LTI1Ljg0LjItNC4wMiwyLjE1LTYuMyw2LjUzLTYuMjEuMywwLC40NC0uMTQuNDItLjQ0aDBabTMuODIuNDdsMTIuNTUtLjA3Yy4yLDAsLjM2LS4xNy4zNi0uMzd2LS45MmMtLjAzLTMuNzctMi45Ny02LjgxLTYuNTgtNi43OWgtLjIxYy0zLjYxLjAyLTYuNTIsMy4wOS02LjUsNi44NnYuOTJjMCwuMi4xNy4zNy4zNy4zN2gwWm0tOC40LDMyLjk4Yy0uMDQsMS4wNC43NiwxLjkyLDEuODEsMS45Ni4wMywwLC4wNiwwLC4wOCwwbDI1LjY5LS4wNmMxLjA0LDAsMS44OS0uODUsMS44OC0xLjg5LDAtLjAzLDAtLjA2LDAtLjA5bC0xLjMzLTI3LjU5Yy0uMDUtMS0uODgtMS43OS0xLjg5LTEuNzlsLTIzLjEzLS4wMmMtMS4wMSwwLTEuODQuNzktMS44OSwxLjhsLTEuMjMsMjcuNjdoMFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im01My4xLDM1LjExYy45OSwwLDEuOC0uOCwxLjgtMS44cy0uODEtMS44LTEuOC0xLjgtMS44LjgtMS44LDEuOC44MSwxLjgsMS44LDEuOFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im0zNy41OSwzNS4wOWMuOTgsMCwxLjc3LS43OSwxLjc3LTEuNzdzLS43OS0xLjc3LTEuNzctMS43Ny0xLjc3Ljc5LTEuNzcsMS43Ny43OSwxLjc3LDEuNzcsMS43N1oiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im00NS4yNiw0MC4xNmMxLjUtLjI0LDIuMDQtMS4yOCwyLjU4LTIuNTcuMjYtLjYxLjk2LS45LDEuNTgtLjY1LjEzLjA1LjI1LjEzLjM1LjIyLjM3LjM0LjUuNzYuMzksMS4yNS0xLjM2LDYuMDYtOS41Niw1LjcyLTEwLjM2LS4zNi0uMDgtLjU4LjMzLTEuMTIuOTEtMS4yMS43MS0uMTIsMS40LjIsMS41Ny45My4zMSwxLjI5LDEuNTYsMi42MSwyLjk4LDIuMzloMFoiLz4KICAgICAgPC9nPjwvc3ZnPg==";

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
          <img src={MARK} width={60} height={61} alt="" />
          TG Market
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
          <div style={{ display: "flex" }}>Продавайте прямо</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", background: "#FB7E5E", color: "#fff", padding: "0 16px 4px", borderRadius: 18 }}>в Telegram</div>
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
