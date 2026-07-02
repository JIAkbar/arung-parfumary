import type { Note } from "@/lib/products";

const TIERS: { key: keyof Note; label: string }[] = [
  { key: "top", label: "Top Notes" },
  { key: "middle", label: "Middle Notes" },
  { key: "base", label: "Base Notes" },
];

export default function PyramidNotes({ notes }: { notes: Note }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="mb-6 text-center font-serif text-lg text-foreground">
        Piramida Aroma
      </h3>
      <div className="flex flex-col gap-6">
        {TIERS.map((tier) => (
          <div key={tier.key} className="text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
              {tier.label}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {notes[tier.key].map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
