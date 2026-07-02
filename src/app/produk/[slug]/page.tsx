import { getProductBySlug, products, whatsappOrderUrl } from "@/lib/products";
import BottleIllustration from "@/components/BottleIllustration";
import PyramidNotes from "@/components/PyramidNotes";
import MainAccords from "@/components/MainAccords";
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
  return { title: product ? `${product.nama} — L'Atelier Parfum` : "Produk" };
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
          <span className="w-fit rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
            {product.grade}
          </span>
          <h1 className="mt-3 font-serif text-4xl text-foreground">
            {product.nama}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {product.deskripsi}
          </p>

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
        <PyramidNotes notes={product.notes} />
        <MainAccords accords={product.mainAccords} />
      </div>
    </section>
  );
}
