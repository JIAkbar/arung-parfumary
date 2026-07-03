import Link from "next/link";
import BottleIllustration from "./BottleIllustration";
import { hargaTermurah, formatRupiah } from "@/lib/hargaKalkulator";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { low } = hargaTermurah(product);
  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-center bg-gradient-to-b from-[#f1ede6] to-[#e7e2da] py-10">
        <BottleIllustration
          color={product.bottleColor}
          className="h-40 w-auto transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="w-fit rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
            {product.grade}
          </span>
          <span className="w-fit rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-muted">
            {product.gender}
          </span>
        </div>
        <h3 className="font-serif text-lg text-foreground">{product.nama}</h3>
        <p className="line-clamp-2 text-sm text-ink-muted">
          {product.ringkasan}
        </p>
        <p className="mt-auto pt-3 text-sm font-medium text-foreground">
          Mulai {formatRupiah(low)}
        </p>
      </div>
    </Link>
  );
}
