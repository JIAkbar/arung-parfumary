import KatalogGrid from "@/components/KatalogGrid";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog — Arung Wangi",
};

export default function KatalogPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">
          Katalog
        </span>
        <h1 className="mt-2 font-serif text-4xl text-foreground">
          Semua Racikan
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink-muted">
          {products.length} racikan tersedia — klik untuk lihat detail aroma
          dan pesan lewat WhatsApp.
        </p>
      </div>
      <KatalogGrid products={products} />
    </section>
  );
}
