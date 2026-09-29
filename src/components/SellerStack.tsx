import a from "@/assets/photos/psychologist.jpg";
import b from "@/assets/photos/blogger.jpg";
import c from "@/assets/photos/florist.jpg";
import d from "@/assets/photos/photographer.jpg";
import e from "@/assets/photos/fitness.jpg";
import { SELLERS } from "@/lib/config";
import s from "./SellerStack.module.css";

/** Стопка фото продавцов + «3 000+ продавцов уже с TG Market». tone: light — на светлом фоне, dark — на цветном. */
export default function SellerStack({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <div className={`${s.stack} ${s[tone]} ${className ?? ""}`}>
      <span className={s.faces} aria-hidden="true">
        {[a, b, c, d, e].map((p, i) => <img key={i} src={p.src} alt="" loading="lazy" />)}
      </span>
      <span className={s.text}><b>{SELLERS.label}</b> продавцов уже с TG Market</span>
    </div>
  );
}
