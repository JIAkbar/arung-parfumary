import { whatsappGeneralUrl } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang & Kontak — Arung Wangi" };

export default function TentangPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <span className="text-xs uppercase tracking-[0.3em] text-gold">
        Tentang Kami
      </span>
      <h1 className="mt-2 font-serif text-4xl text-foreground">
        Cerita di Balik Setiap Botol
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          Arung Wangi lahir dari kecintaan pada aroma — bukan dari
          pabrik besar, tapi dari meja kerja kecil tempat setiap racikan
          diuji, disesuaikan, dan disempurnakan satu per satu.
        </p>
        <p>
          Kami menggunakan bibit fragrance oil premium dari berbagai negara,
          diracik dengan takaran presisi untuk menghasilkan karakter aroma
          yang tahan lama tanpa mengorbankan kenyamanan di kulit.
        </p>
        <p>
          Setiap racikan punya cerita profil aromanya sendiri — mulai dari
          top notes yang menyambut, middle notes yang jadi jantung aroma,
          hingga base notes yang membekas di akhir hari.
        </p>
      </div>

      <div className="mt-16 border-t border-gold-hairline pt-16 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">
          Kontak
        </span>
        <h2 className="mt-2 font-serif text-3xl text-foreground">
          Ada Pertanyaan?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
          Konsultasi aroma, tanya ketersediaan, atau mau pesan custom racikan —
          hubungi kami langsung lewat WhatsApp.
        </p>
        <a
          href={whatsappGeneralUrl()}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-full bg-gold px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
        >
          Chat via WhatsApp
        </a>
      </div>
    </section>
  );
}
