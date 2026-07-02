export default function BottleIllustration({
  color = "#3f2d1c",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 260"
      className={className}
      role="img"
      aria-label="Ilustrasi botol parfum"
    >
      <rect x="68" y="8" width="24" height="20" rx="3" fill="#c9a24b" />
      <rect x="72" y="0" width="16" height="12" rx="2" fill="#a16207" />
      <path
        d="M60 34 L100 34 L108 60 L108 230 Q108 244 94 244 L66 244 Q52 244 52 230 L52 60 Z"
        fill={color}
        stroke="#a16207"
        strokeWidth="1.5"
      />
      <rect
        x="60"
        y="120"
        width="40"
        height="60"
        rx="2"
        fill="rgba(255,255,255,0.08)"
      />
      <rect x="66" y="130" width="28" height="1" fill="#c9a24b" opacity="0.6" />
      <rect x="66" y="140" width="20" height="1" fill="#c9a24b" opacity="0.4" />
    </svg>
  );
}
