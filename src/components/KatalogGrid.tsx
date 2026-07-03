"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { matchProducts } from "@/lib/scentMatcher";
import type { Gender, Product, WaktuPakai } from "@/lib/products";

const GENDER_FILTERS = ["Semua", "Pria", "Wanita", "Unisex"];
const WAKTU_FILTERS = ["Semua", "Pagi", "Siang", "Sore", "Malam"];

function FilterDropdown({
  label,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function onDocClick(e: MouseEvent) {
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) {
        onToggle();
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onToggle();
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={fieldRef} className="relative flex flex-col items-center gap-1.5">
      <span className="text-[10px] uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full max-w-[9.5rem] items-center justify-between gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs uppercase tracking-wider text-foreground transition-colors hover:border-gold focus:border-gold focus:outline-none"
      >
        <span className="truncate">{value}</span>
        <span
          className={`text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        role="listbox"
        className={`absolute top-full z-10 mt-1.5 w-full max-w-[9.5rem] overflow-hidden rounded-xl border border-gold-hairline bg-surface shadow-lg transition-all duration-150 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {options.map((item) => (
          <div
            key={item}
            role="option"
            aria-selected={value === item}
            onClick={() => {
              onChange(item);
              onToggle();
            }}
            className={`flex items-center justify-between border-b border-border px-3 py-2 text-xs last:border-b-0 hover:bg-gold/10 hover:text-gold ${
              value === item ? "font-semibold text-gold" : "text-foreground"
            }`}
          >
            <span>{item}</span>
            {value === item && (
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KatalogGrid({ products }: { products: Product[] }) {
  const [gender, setGender] = useState("Semua");
  const [waktu, setWaktu] = useState("Semua");
  const [aroma, setAroma] = useState("Semua");
  const [query, setQuery] = useState("");
  const [openField, setOpenField] = useState<string | null>(null);

  // Aroma = accord dominan tiap racikan (mainAccords[0], sudah descending),
  // dipakai apa adanya — biar konsisten dengan label yang tampil di grafik
  // Main Accords tiap halaman produk (bukan dikelompokkan ulang jadi
  // kategori sendiri).
  const aromaOptions = [
    "Semua",
    ...Array.from(
      new Set(products.map((p) => p.mainAccords[0]?.nama).filter(Boolean))
    ).sort(),
  ];

  const base = products.filter((p) => {
    if (gender !== "Semua" && p.gender !== (gender as Gender)) return false;
    if (waktu !== "Semua" && !p.waktuPakai.includes(waktu as WaktuPakai)) return false;
    if (aroma !== "Semua" && p.mainAccords[0]?.nama !== aroma) return false;
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

      <div className="mx-auto mb-10 flex max-w-md justify-center gap-6">
        <FilterDropdown
          label="Gender"
          options={GENDER_FILTERS}
          value={gender}
          onChange={setGender}
          isOpen={openField === "gender"}
          onToggle={() => setOpenField((f) => (f === "gender" ? null : "gender"))}
        />
        <FilterDropdown
          label="Waktu"
          options={WAKTU_FILTERS}
          value={waktu}
          onChange={setWaktu}
          isOpen={openField === "waktu"}
          onToggle={() => setOpenField((f) => (f === "waktu" ? null : "waktu"))}
        />
        <FilterDropdown
          label="Aroma"
          options={aromaOptions}
          value={aroma}
          onChange={setAroma}
          isOpen={openField === "aroma"}
          onToggle={() => setOpenField((f) => (f === "aroma" ? null : "aroma"))}
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
