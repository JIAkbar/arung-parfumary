import Link from "next/link";
import BottleIllustration from "./BottleIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gold blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-96 w-96 rounded-full bg-gold-light blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 text-center md:py-32">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-light">
          Racikan Artisan
        </span>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
          Aroma yang Diracik, Bukan Sekadar Dijual
        </h1>
        <p className="max-w-xl text-base text-background/70 md:text-lg">
          Setiap botol L&rsquo;Atelier Parfum diracik tangan menggunakan bibit
          fragrance oil premium — dirancang untuk yang mencari karakter, bukan
          sekadar label.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/katalog"
            className="rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            Lihat Katalog
          </Link>
          <Link
            href="/tentang"
            className="rounded-full border border-background/30 px-8 py-3 text-sm font-medium transition-colors hover:border-gold-light hover:text-gold-light"
          >
            Cerita Kami
          </Link>
        </div>
        <BottleIllustration className="mt-8 h-56 w-auto opacity-90" />
      </div>
    </section>
  );
}
