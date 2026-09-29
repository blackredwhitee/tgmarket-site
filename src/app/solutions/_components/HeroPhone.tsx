"use client";
import Phone from "@/components/Phone";
import type { Solution } from "@/data/solutions";
import { phonePhotos } from "./photos";

/** Телефон сцены `pay` в hero; toast — внутри экрана, чтобы не обрезался и не закрывал фото рядом. */
export default function HeroPhone({ n }: { n: Solution }) {
  const p = n.phone;
  return (
    <Phone
      scene="pay"
      toast="inside"
      channel={p.channel}
      initials={p.initials}
      subs={p.subs}
      prePost={p.prePost}
      product={p.product}
      desc={p.desc}
      amount={p.amount}
      cover={p.cover}
      {...phonePhotos(n.slug)}
    />
  );
}
