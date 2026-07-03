import { getProductBySlug, products } from "@/lib/products";
import { hargaTermurah } from "@/lib/hargaKalkulator";
import BottleIllustration from "@/components/BottleIllustration";
import PyramidNotes from "@/components/PyramidNotes";
import MainAccords from "@/components/MainAccords";
import HargaKalkulator from "@/components/HargaKalkulator";
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
  if (!product) return { title: "Produk" };

  const title = `${product.nama} — Arung Wangi`;
  return {
    title,
    description: product.ringkasan,
    openGraph: { title, description: product.ringkasan },
    twitter: { card: "summary_large_image", title, description: product.ringkasan },
  };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { low: hargaMulai } = hargaTermurah(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nama,
    description: product.ringkasan,
    brand: { "@type": "Brand", name: "Arung Wangi" },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: hargaMulai,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#f1ede6] to-[#e7e2da] py-16">
          <BottleIllustration
            color={product.bottleColor}
            className="h-72 w-auto"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="w-fit rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
              {product.grade}
            </span>
            <span className="w-fit rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
              {product.gender}
            </span>
            <span className="mx-0.5 h-3 w-px bg-border" aria-hidden="true" />
            {product.waktuPakai.map((waktu) => (
              <span
                key={waktu}
                className="w-fit rounded-full bg-background px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted"
              >
                {waktu}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-serif text-4xl text-foreground">
            {product.nama}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {product.deskripsi}
          </p>

          <div className="mt-6">
            <HargaKalkulator product={product} />
          </div>

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

      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
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
