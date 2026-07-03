import {
  VOLUME_REQUEST,
  getProductBySlug,
  products,
  whatsappOrderUrl,
} from "@/lib/products";
import BottleIllustration from "@/components/BottleIllustration";
import PyramidNotes from "@/components/PyramidNotes";
import MainAccords from "@/components/MainAccords";
import Reveal from "@/components/Reveal";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.nama} — Arung Wangi` : "Produk" };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#f1ede6] to-[#e7e2da] py-16">
          <BottleIllustration
            color={product.bottleColor}
            className="h-72 w-auto"
          />
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5">
            <span className="w-fit rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              {product.grade}
            </span>
            <span className="w-fit rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
              {product.gender}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-4xl text-foreground">
            {product.nama}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {product.deskripsi}
          </p>

          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">
            Waktu Terbaik
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.waktuPakai.map((waktu) => (
              <span
                key={waktu}
                className="rounded-full bg-background px-3 py-1 text-xs text-foreground"
              >
                {waktu}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.volumeTersedia.map((vol) => (
              <span
                key={vol}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
              >
                {vol} ml
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            Butuh {VOLUME_REQUEST} ml? Bisa request, tinggal sebut di pesan WhatsApp.
          </p>

          <p className="mt-6 font-serif text-2xl text-foreground">
            Mulai Rp{product.hargaMulai.toLocaleString("id-ID")}
          </p>

          <a
            href={whatsappOrderUrl(product.nama)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            Pesan via WhatsApp
          </a>

          {product.fragranticaUrl && (
            <p className="mt-4 text-xs text-ink-muted">
              Referensi profil aroma dari{" "}
              <a
                href={product.fragranticaUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-border underline-offset-2 hover:text-gold"
              >
                Fragrantica →
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <PyramidNotes notes={product.notes} />
        </Reveal>
        <Reveal delay={0.1}>
          <MainAccords accords={product.mainAccords} />
        </Reveal>
      </div>
    </section>
  );
}
