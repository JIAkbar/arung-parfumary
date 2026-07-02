import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  const unggulan = products.slice(0, 3);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              Pilihan
            </span>
            <h2 className="mt-2 font-serif text-3xl text-foreground">
              Racikan Unggulan
            </h2>
          </div>
          <Link
            href="/katalog"
            className="text-sm text-ink-muted underline decoration-border underline-offset-4 hover:text-gold"
          >
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {unggulan.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
