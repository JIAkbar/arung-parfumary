import { referensiRacikan } from "@/lib/referensiRacikan";
import ReferensiRacikanTable from "@/components/ReferensiRacikanTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referensi Racikan",
  robots: { index: false, follow: false },
};

export default function RacikanPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl text-foreground">Referensi Racikan</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Daftar internal — pemetaan racikan ke brand & parfum asli yang jadi
        referensi. Halaman ini tidak ditaut dari navigasi manapun.
      </p>
      <div className="mt-8">
        <ReferensiRacikanTable data={referensiRacikan} />
      </div>
    </section>
  );
}
