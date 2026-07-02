import { WHATSAPP_NUMBER } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kontak — Arung Wangi" };

export default function KontakPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <span className="text-xs uppercase tracking-[0.3em] text-gold">
        Kontak
      </span>
      <h1 className="mt-2 font-serif text-4xl text-foreground">
        Ada Pertanyaan?
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
        Konsultasi aroma, tanya ketersediaan, atau mau pesan custom racikan —
        hubungi kami langsung lewat WhatsApp.
      </p>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block rounded-full bg-gold px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
      >
        Chat via WhatsApp
      </a>
    </section>
  );
}
