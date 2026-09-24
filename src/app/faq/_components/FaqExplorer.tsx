"use client";
import { Fragment, useMemo, useState } from "react";
import { FAQ, FAQ_CATS, type FaqItem } from "@/data/faq";
import { goal } from "@/lib/metrika";
import { Icon, ICON } from "@/components/icons";
import s from "./FaqExplorer.module.css";

const ALL = "Все";
const CATS = [ALL, ...FAQ_CATS];
const TODO_RE = /(\[УТОЧНИТЬ[^\]]*\])/;

/** Подсветка совпадений маркером (как seg() в макете). */
function mark(text: string, q: string, keyBase: string) {
  if (!q) return text;
  const low = text.toLowerCase(), ql = q.toLowerCase(), out: React.ReactNode[] = [];
  let i = 0;
  for (;;) {
    const j = low.indexOf(ql, i);
    if (j < 0) break;
    if (j > i) out.push(text.slice(i, j));
    out.push(<mark key={`${keyBase}-${j}`} className={s.mark}>{text.slice(j, j + q.length)}</mark>);
    i = j + q.length;
  }
  if (i < text.length) out.push(text.slice(i));
  return out;
}

/** Текст с подсветкой; фрагменты [УТОЧНИТЬ …] помечаются как плейсхолдеры. */
function Rich({ text, q }: { text: string; q: string }) {
  return (
    <>
      {text.split(TODO_RE).map((part, k) =>
        TODO_RE.test(part)
          ? <span key={k} className={s.todoInline}>{mark(part, q, String(k))}</span>
          : <Fragment key={k}>{mark(part, q, String(k))}</Fragment>,
      )}
    </>
  );
}

type Props = { title: React.ReactNode; after?: React.ReactNode; items?: FaqItem[] };

export default function FaqExplorer({ title, after, items = FAQ }: Props) {
  const [rawQ, setRawQ] = useState("");
  const [cat, setCat] = useState<string>(ALL);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  // Во время поиска совпавшие раскрыты; вручную закрытые при текущем запросе — здесь.
  const [closedInSearch, setClosedInSearch] = useState<Set<string>>(() => new Set());
  const q = rawQ.trim();

  const rows = useMemo(() => {
    const ql = q.toLowerCase();
    return items.map((it) => {
      const matchCat = cat === ALL || it.cat === cat;
      const matchQ = !q || `${it.q} ${it.a}`.toLowerCase().includes(ql);
      const vis = matchCat && matchQ;
      const open = vis && (q ? !closedInSearch.has(it.id) : openId === it.id);
      return { it, vis, open };
    });
  }, [items, q, cat, openId, closedInSearch]);
  const empty = rows.every((r) => !r.vis);

  const toggle = (id: string, wasOpen: boolean) => {
    if (q) {
      setClosedInSearch((prev) => {
        const next = new Set(prev);
        if (wasOpen) next.add(id); else next.delete(id);
        return next;
      });
    } else {
      setOpenId(wasOpen ? null : id);
    }
    if (!wasOpen) goal("faq_open", { question_id: id });
  };

  return (
    <>
      <section className={`${s.hero} bg-mesh-light`} aria-labelledby="faq-h1">
        <div className={s.sun} aria-hidden="true" />
        <div className={s.inner}>
          <h1 id="faq-h1" className={s.h1} data-intro="0">{title}</h1>
          <div className={s.searchWrap} data-intro="150">
            <Icon d={ICON.search} size={22} stroke="#8A92AD" sw={2} className={s.searchIcon} />
            <input
              type="search"
              className={s.search}
              value={rawQ}
              onChange={(e) => { setRawQ(e.target.value); setClosedInSearch(new Set()); }}
              placeholder="Например: комиссия, СБП, чеки"
              aria-label="Поиск по вопросам"
              aria-controls="faq-list"
            />
          </div>
          <div className={s.chips} data-intro="250" role="group" aria-label="Категории вопросов">
            {CATS.map((c) => (
              <button key={c} type="button" className={s.chip} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className={s.listSection} aria-label="Список вопросов">
        <div className={s.inner}>
          <p className="sr-only" role="status">{q || cat !== ALL ? `Найдено вопросов: ${rows.filter((r) => r.vis).length}` : ""}</p>
          <div id="faq-list" className={s.list}>
            {rows.map(({ it, vis, open }) => (
              <div key={it.id} className={s.row} data-vis={vis} aria-hidden={!vis} inert={!vis}>
                <div className={s.clip}>
                  <div className={s.item} data-open={open}>
                    <h2 className={s.qh}>
                      <button
                        type="button"
                        id={`faq-q-${it.id}`}
                        className={s.btn}
                        aria-expanded={open}
                        aria-controls={`faq-a-${it.id}`}
                        onClick={() => toggle(it.id, open)}
                      >
                        <span className={s.qCol}>
                          <span className={s.kicker}>{it.cat}</span>
                          <span className={s.q}><Rich text={it.q} q={q} /></span>
                        </span>
                        <span className={s.plus} aria-hidden="true">
                          <Icon d={ICON.plus} size={18} sw={2.4} />
                        </span>
                      </button>
                    </h2>
                    <div id={`faq-a-${it.id}`} role="region" aria-labelledby={`faq-q-${it.id}`} className={s.panel} inert={!open}>
                      <div className={s.clip}>
                        <p className={s.a}><Rich text={it.a} q={q} /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {empty && (
              <div className={s.empty}>
                Ничего не нашли по запросу «{rawQ}». Попробуйте другое слово или напишите в поддержку.
              </div>
            )}
          </div>
          {after}
        </div>
      </section>
    </>
  );
}
