/** Иллюстрированный аватар человека (плоский стиль) — для декоративных «продавцов» в мокапах. */

export type FaceProps = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  style: "short" | "long" | "bun" | "curly" | "beard" | "bob";
  glasses?: boolean;
  size?: number;
};

export default function Face({ bg, skin, hair, shirt, style, glasses, size = 64 }: FaceProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ display: "block", borderRadius: "50%", overflow: "hidden" }}>
      <circle cx="32" cy="32" r="32" fill={bg} />
      <g>
        {/* волосы сзади (длинные) */}
        {(style === "long" || style === "bob") && (
          <path d={style === "long" ? "M18 30c0-12 6-19 14-19s14 7 14 19v22H18z" : "M19 30c0-11 6-18 13-18s13 7 13 18v8H19z"} fill={hair} />
        )}
        {/* плечи и шея */}
        <path d="M6 66c2-13 12-20 26-20s24 7 26 20z" fill={shirt} />
        <path d="M27 38h10v9c0 3-10 3-10 0z" fill={skin} opacity=".85" />
        {/* голова */}
        <ellipse cx="32" cy="28" rx="11" ry="12.5" fill={skin} />
        {/* волосы сверху */}
        {style === "short" && <path d="M20.5 27c-1-10 5-15.5 11.5-15.5S44.5 17 43.5 27c-1.5-5-5.5-8-11.5-8s-10 3-11.5 8z" fill={hair} />}
        {style === "long" && <path d="M20.5 27c0-9 5-14.5 11.5-14.5S43.5 18 43.5 27c-3-4-7-6.5-11.5-6.5S23.5 23 20.5 27z" fill={hair} />}
        {style === "bob" && <path d="M20 29c0-10 5.5-16 12-16s12 6 12 16c-2-6-6-9-12-9s-10 3-12 9z" fill={hair} />}
        {style === "bun" && (
          <>
            <circle cx="32" cy="12" r="5.5" fill={hair} />
            <path d="M20.5 26c0-8.5 5-13.5 11.5-13.5S43.5 17.5 43.5 26c-3-4.5-7-6-11.5-6s-8.5 1.5-11.5 6z" fill={hair} />
          </>
        )}
        {style === "curly" && (
          <g fill={hair}>
            <circle cx="23" cy="20" r="5" /><circle cx="29" cy="15.5" r="5" /><circle cx="35.5" cy="15.5" r="5" />
            <circle cx="41" cy="20" r="5" /><circle cx="21" cy="26" r="3.6" /><circle cx="43" cy="26" r="3.6" />
          </g>
        )}
        {style === "beard" && (
          <>
            <path d="M21 25c0-8 5-12.5 11-12.5S43 17 43 25c-2-3-6-4.5-11-4.5S23 22 21 25z" fill={hair} />
            <path d="M21.5 29c1 8.5 5.5 12 10.5 12s9.5-3.5 10.5-12c-2 3.5-5.5 4.5-10.5 4.5S23.5 32.5 21.5 29z" fill={hair} />
          </>
        )}
        {/* лицо */}
        <circle cx="27.8" cy="28.5" r="1.4" fill="#0B1233" />
        <circle cx="36.2" cy="28.5" r="1.4" fill="#0B1233" />
        {style !== "beard" && <path d="M28.8 33.6q3.2 2.6 6.4 0" stroke="#0B1233" strokeWidth="1.4" fill="none" strokeLinecap="round" />}
        {glasses && (
          <g stroke="#0B1233" strokeWidth="1.3" fill="none">
            <circle cx="27.8" cy="28.5" r="3.6" /><circle cx="36.2" cy="28.5" r="3.6" /><path d="M31.4 28.5h1.2" />
          </g>
        )}
      </g>
    </svg>
  );
}
