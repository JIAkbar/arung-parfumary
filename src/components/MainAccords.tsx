import type { Accord } from "@/lib/products";

const ACCORD_COLORS: { keywords: string[]; from: string; to: string }[] = [
  { keywords: ["woody"], from: "#b08a5f", to: "#7c5a37" },
  { keywords: ["earthy"], from: "#9c8060", to: "#6b4a2f" },
  { keywords: ["green"], from: "#9bb082", to: "#6b8a5a" },
  { keywords: ["smoky", "balsamic"], from: "#a39a8c", to: "#7a7268" },
  { keywords: ["milky", "lactonic", "creamy"], from: "#efe3c8", to: "#d8c9a8" },
  { keywords: ["citrus", "fresh", "aquatic"], from: "#e6bd6a", to: "#c98f2e" },
  { keywords: ["floral"], from: "#dba7bc", to: "#c07a92" },
  { keywords: ["fruity"], from: "#dd8b78", to: "#c15a4a" },
  { keywords: ["musky", "musk"], from: "#ad97ab", to: "#8a7189" },
  { keywords: ["sweet", "manis"], from: "#e0a488", to: "#c98a6b" },
  { keywords: ["vanilla"], from: "#e6c98f", to: "#cba063" },
  { keywords: ["coffee", "kopi"], from: "#8a6547", to: "#5c3d2a" },
  { keywords: ["caramel", "karamel"], from: "#d0a04f", to: "#b3792f" },
  { keywords: ["amber"], from: "#cf9a4a", to: "#a3691f" },
  { keywords: ["powdery"], from: "#d9cfc4", to: "#b8ab9c" },
  { keywords: ["rempah", "spicy", "warm"], from: "#c98a5a", to: "#9c5f34" },
];

function accordGradient(nama: string) {
  const key = nama.toLowerCase();
  const match = ACCORD_COLORS.find((entry) =>
    entry.keywords.some((keyword) => key.includes(keyword))
  );
  return match ?? { from: "var(--gold-light)", to: "var(--gold)" };
}

export default function MainAccords({ accords }: { accords: Accord[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-6 text-center font-serif text-lg text-foreground">
        Main Accords
      </h3>
      <div className="flex flex-col gap-2.5">
        {accords.map((accord) => {
          const { from, to } = accordGradient(accord.nama);
          return (
            <div key={accord.nama} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right text-xs text-ink-muted">
                {accord.nama}
              </span>
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
                  style={{
                    width: `${accord.persen}%`,
                    backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
