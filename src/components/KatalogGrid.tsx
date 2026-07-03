"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { primaryFamily } from "@/lib/accordFamily";
import { matchProducts } from "@/lib/scentMatcher";
import type { Gender, Product, WaktuPakai } from "@/lib/products";

const GENDER_FILTERS = ["Semua", "Pria", "Wanita", "Unisex"];
const WAKTU_FILTERS = ["Semua", "Pagi", "Siang", "Sore", "Malam"];

function FilterRow({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="mr-1 text-[10px] uppercase tracking-wider text-ink-muted">
        {label}:
      </span>
      {options.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
            active === item
              ? "border-gold bg-gold text-white"
              : "border-border text-ink-muted hover:border-gold hover:text-gold"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function KatalogGrid({ products }: { products: Product[] }) {
  const [gender, setGender] = useState("Semua");
  const [waktu, setWaktu] = useState("Semua");
  const [family, setFamily] = useState("Semua");
  const [query, setQuery] = useState("");

  const familyOptions = [
    "Semua",
    ...Array.from(new Set(products.map((p) => primaryFamily(p.mainAccords)))),
  ];

  const base = products.filter((p) => {
    if (gender !== "Semua" && p.gender !== (gender as Gender)) return false;
    if (waktu !== "Semua" && !p.waktuPakai.includes(waktu as WaktuPakai)) return false;
    if (family !== "Semua" && primaryFamily(p.mainAccords) !== family) return false;
    return true;
  });

  const trimmedQuery = query.trim();
  const matched = trimmedQuery ? matchProducts(trimmedQuery, base) : null;
  const filtered = matched ? matched.map((m) => m.product) : base;
  const queryHasNoMatch = matched !== null && matched.length === 0;

  return (
    <div>
      <div className="mx-auto mb-10 max-w-lg text-center">
        <label
          htmlFor="scent-query"
          className="block text-xs uppercase tracking-[0.2em] text-gold"
        >
          Ceritakan racikan yang kamu mau
        </label>
        <input
          id="scent-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="mis. kuat, spicy rempah, sedikit leather"
          className="mt-3 w-full rounded-full border border-border bg-surface px-4 py-2 text-center text-sm text-foreground placeholder:text-ink-muted/60 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mb-10 flex flex-col gap-3">
        <FilterRow
          label="Gender"
          options={GENDER_FILTERS}
          active={gender}
          onChange={setGender}
        />
        <FilterRow
          label="Waktu"
          options={WAKTU_FILTERS}
          active={waktu}
          onChange={setWaktu}
        />
        <FilterRow
          label="Aroma"
          options={familyOptions}
          active={family}
          onChange={setFamily}
        />
      </div>

      {queryHasNoMatch ? (
        <p className="py-16 text-center text-sm text-ink-muted">
          Belum ada racikan yang benar-benar cocok dengan &quot;{trimmedQuery}
          &quot;. Coba kata kunci lain, atau hapus pencarian untuk lihat semua
          racikan.
        </p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-muted">
          Belum ada racikan untuk kombinasi filter ini.
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
