import QRCode from "qrcode";

/** SVG-путь настоящего QR-кода (вызывается на сервере при сборке). Возвращает path и размер стороны в модулях. */
export function qrPath(text: string): { d: string; size: number } {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  let d = "";
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (qr.modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  return { d, size: n };
}
