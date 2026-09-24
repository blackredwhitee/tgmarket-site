import s from "./Solution.module.css";

/** Текст, в котором фрагменты `[УТОЧНИТЬ …]` оборачиваются в плашку `.todo`. */
export default function TodoText({ text }: { text: string }) {
  const parts = text.split(/(\[УТОЧНИТЬ[^\]]*\])/);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? <span key={i} className={`todo ${s.inlineTodo}`}>{p}</span> : p,
      )}
    </>
  );
}
