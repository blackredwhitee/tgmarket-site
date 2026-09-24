import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL, getLegal } from "@/data/legal";
import { JsonLd, breadcrumbLd, meta } from "@/lib/seo";
import PrintButton from "../_components/PrintButton";
import s from "./page.module.css";

type Params = { params: Promise<{ doc: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const doc = getLegal((await params).doc);
  if (!doc) return {};
  return meta(`/legal/${doc.slug}/`, doc.seoTitle, doc.description);
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Печать: без шапки, футера, cookie-баннера и навигации по документу.
const PRINT_CSS = "@media print{header,footer,[role=dialog]{display:none!important}}";

export default async function LegalPage({ params }: Params) {
  const doc = getLegal((await params).doc);
  if (!doc) notFound();
  const path = `/legal/${doc.slug}/`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <JsonLd data={breadcrumbLd([{ name: "Главная", path: "/" }, { name: doc.title, path }])} />

      <section className={`${s.hero} bg-mesh-light`}>
        <div className={`container ${s.heroInner}`}>
          <nav className={s.switch} aria-label="Документы" data-intro="0">
            {LEGAL.map((d) => (
              <Link key={d.slug} href={`/legal/${d.slug}/`} className={s.chip} aria-current={d.slug === doc.slug ? "page" : undefined}>
                {d.short}
              </Link>
            ))}
          </nav>
          <h1 className={s.h1} data-intro="100">{doc.title}</h1>
          <p className={s.subtitle} data-intro="150">{doc.subtitle}</p>
          <div className={s.metaRow} data-intro="200">
            {doc.updated && (
              <p className={s.date}>
                Редакция от <time dateTime={doc.updated}>{fmtDate(doc.updated)}</time>
              </p>
            )}
            <PrintButton />
          </div>
        </div>
      </section>

      <div className={`container ${s.body}`}>
        <aside className={s.aside}>
          <nav className={s.toc} aria-labelledby="toc-title">
            <p id="toc-title" className={s.tocTitle}>Содержание</p>
            <ol className={s.tocList}>
              {doc.sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className={s.tocLink}>
                    {sec.num && <span className={s.tocNum}>{sec.num}.</span>}{sec.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={s.article}>
          {doc.intro.length > 0 && (
            <div className={s.intro}>
              {doc.intro.map((p, k) => <p key={k} className={s.p}>{p}</p>)}
            </div>
          )}
          {doc.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className={s.sec} aria-labelledby={`${sec.id}-h`}>
              <h2 id={`${sec.id}-h`} className={s.h2}>{sec.num && `${sec.num}. `}{sec.title}</h2>
              {sec.paras.map((p, k) => <p key={k} className={s.p}>{p}</p>)}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
