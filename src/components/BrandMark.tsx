export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Simbol Arung Wangi"
    >
      <path
        d="M4 16C4 9 9 4 15 5C20 6 18 12 13 11C9 10 10 15 15 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
