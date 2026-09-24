"use client";
import Phone from "@/components/Phone";
import { useIsMobile } from "@/lib/motion";
import type { Solution } from "@/data/solutions";

/** Телефон сцены `pay` в hero: toast справа на desktop, внутри экрана на mobile. */
export default function HeroPhone({ n }: { n: Solution }) {
  const mobile = useIsMobile();
  const p = n.phone;
  return (
    <Phone
      scene="pay"
      toast={mobile ? "inside" : "right"}
      channel={p.channel}
      initials={p.initials}
      subs={p.subs}
      prePost={p.prePost}
      product={p.product}
      desc={p.desc}
      amount={p.amount}
      cover={p.cover}
      icon={n.icon}
    />
  );
}
