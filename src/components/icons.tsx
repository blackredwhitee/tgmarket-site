/** Иконки в стиле Lucide (пути из макетов). */
export const ICON = {
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  check: "M20 6 9 17l-5-5",
  plus: "M12 5v14M5 12h14",
  chevronDown: "m6 9 6 6 6-6",
  chevronLeft: "m15 18-6-6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M18 6 6 18M6 6l12 12",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  heart: "M12 21s-7-4.35-9.5-8.5C.9 9.6 2.6 5.5 6.3 5.2c2-.2 3.9 1 5.7 3 1.8-2 3.7-3.2 5.7-3 3.7.3 5.4 4.4 3.8 7.3C19 16.65 12 21 12 21z",
  briefcase: "M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  bookOpen: "M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z",
  ticket: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM13 5v2M13 17v2M13 11v2",
  gift: "M3 8h18v4H3zM12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5",
} as const;

type IconProps = {
  d: string;
  size?: number;
  stroke?: string;
  sw?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Icon({ d, size = 24, stroke = "currentColor", sw = 2, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const SendIcon = ({ size = 20, sw = 2.2 }: { size?: number; sw?: number }) => <Icon d={ICON.send} size={size} sw={sw} />;
