import Phone from "@/components/Phone";
import type { Solution } from "@/data/solutions";
import s from "./Solution.module.css";

/** «Как это выглядит в вашем канале» — телефон `post` на жёлтой капле + 3 пояснения. */
export default function Looks({ n }: { n: Solution }) {
  const p = n.phone;
  return (
    <section className={s.section}>
      <div className={`container ${s.looksRow}`}>
        <div className={s.looksPhone}>
          <div className={s.blob} aria-hidden="true" />
          <div className={s.looksPhoneInner}>
            <Phone
              scene="post"
              channel={p.channel}
              initials={p.initials}
              subs={p.subs}
              prePost={p.prePost}
              product={p.product2}
              desc={p.desc2}
              amount={p.amount2}
              cover={p.cover}
              icon={n.icon}
            />
          </div>
        </div>
        <div className={s.looksText}>
          <h2 className={`${s.h2} ${s.ink}`}>
            Как это выглядит <span className={s.blue}>в вашем канале</span>
          </h2>
          <ol data-reveal="stagger" className={s.lookList}>
            {n.looks.map((l, i) => (
              <li key={i} className={s.lookItem}>
                <span className={s.lookNum} aria-hidden="true">{i + 1}</span>
                <span className={s.lookBody}>
                  <b className={s.lookTitle}>{l.title}</b>
                  <span className={s.lookText}>{l.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
