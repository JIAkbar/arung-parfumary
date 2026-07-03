"use client";

import { useState } from "react";
import {
  KONSENTRASI_LIST,
  KONSENTRASI_DESKRIPSI,
  hitungRangeHarga,
  formatRupiah,
  type Konsentrasi,
} from "@/lib/hargaKalkulator";
import { whatsappOrderUrl, VOLUME_REQUEST, type Product } from "@/lib/products";

export default function HargaKalkulator({ product }: { product: Product }) {
  const [volume, setVolume] = useState(product.volumeTersedia[0]);
  const [konsentrasi, setKonsentrasi] = useState<Konsentrasi>("EDP");

  const { low, high } = hitungRangeHarga(volume, product.grade, konsentrasi);
  const hargaText = `${formatRupiah(low)} – ${formatRupiah(high)}`;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gold">Ukuran</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.volumeTersedia.map((vol) => (
          <button
            key={vol}
            type="button"
            onClick={() => setVolume(vol)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              volume === vol
                ? "border-gold bg-gold text-white"
                : "border-border text-foreground hover:border-gold"
            }`}
          >
            {vol} ml
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Butuh {VOLUME_REQUEST} ml? Bisa request, tinggal sebut di pesan WhatsApp.
      </p>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
        Konsentrasi
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KONSENTRASI_LIST.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKonsentrasi(k)}
            className={`rounded-xl border px-3 py-2 text-left transition-colors ${
              konsentrasi === k
                ? "border-gold bg-gold/10"
                : "border-border hover:border-gold"
            }`}
          >
            <span className="block text-sm font-medium text-foreground">
              {k}
            </span>
            <span className="block text-[11px] text-ink-muted">
              {KONSENTRASI_DESKRIPSI[k]}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 font-serif text-2xl text-foreground">{hargaText}</p>
      <p className="mt-1 text-xs text-ink-muted">
        Estimasi harga {volume} ml {konsentrasi} — harga final dikonfirmasi via
        WhatsApp.
      </p>

      <a
        href={whatsappOrderUrl(product.nama, { volumeMl: volume, konsentrasi, hargaText })}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
