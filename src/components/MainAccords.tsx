import type { Accord } from "@/lib/products";

export default function MainAccords({ accords }: { accords: Accord[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-6 text-center font-serif text-lg text-foreground">
        Main Accords
      </h3>
      <div className="flex flex-col gap-2.5">
        {accords.map((accord) => (
          <div key={accord.nama} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-right text-xs text-ink-muted">
              {accord.nama}
            </span>
            <div className="h-4 flex-1 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold transition-[width] duration-500"
                style={{ width: `${accord.persen}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
