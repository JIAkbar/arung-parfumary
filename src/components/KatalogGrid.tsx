"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import type { Gender, Product } from "@/lib/products";

const FILTERS: (Gender | "Semua")[] = ["Semua", "Pria", "Wanita", "Unisex"];

export default function KatalogGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Gender | "Semua">("Semua");
  const filtered =
    filter === "Semua" ? products : products.filter((p) => p.gender === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              filter === item
                ? "border-gold bg-gold text-white"
                : "border-border text-ink-muted hover:border-gold hover:text-gold"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-muted">
          Belum ada racikan untuk filter ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
