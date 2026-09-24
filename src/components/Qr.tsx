import { qrPath } from "@/lib/qr";
import { botLink } from "@/lib/bot";

/** Настоящий QR на бота (генерируется при сборке). */
export default function Qr({ param = "site_home", size, pad, radius, border }: { param?: string; size: number; pad: number; radius: number; border?: string }) {
  const { d, size: n } = qrPath(botLink(param));
  return (
    <div style={{ width: size, height: size, background: "#fff", borderRadius: radius, padding: pad, border, flex: "none" }}>
      <svg viewBox={`0 0 ${n} ${n}`} width="100%" height="100%" shapeRendering="crispEdges" role="img" aria-label="QR-код для открытия бота @TGMarketSellerBot">
        <path d={d} fill="#0B1233" />
      </svg>
    </div>
  );
}
