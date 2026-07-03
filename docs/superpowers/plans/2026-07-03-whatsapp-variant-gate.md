# Gerbang Pilih Varian Sebelum WhatsApp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cegah tombol "Pesan via WhatsApp" di halaman detail produk terbuka sebelum user memilih ukuran botol, dengan modal peringatan sebagai pengganti; hapus total link WhatsApp di Footer.

**Architecture:** Perubahan murni client-side di dua komponen React yang sudah ada — tidak ada state global, routing, atau file baru selain satu subkomponen modal lokal di dalam `HargaKalkulator.tsx`. Tidak ada perubahan data model (`Product`, `products.ts` tidak disentuh).

**Tech Stack:** Next.js 16 App Router (static export, `output: "export"`), TypeScript, Tailwind CSS v4, React 19 `useState`/`useEffect`. Tidak ada test runner (Jest/Vitest) terpasang di proyek ini — verifikasi memakai `tsc --noEmit`, `eslint`, `next build --webpack`, dan pengecekan manual lewat preview browser, mengikuti pola yang sudah dipakai konsisten di semua fitur sebelumnya di proyek ini (lihat `CLAUDE.md`).

## Global Constraints

- **`next dev --webpack` / `next build --webpack` wajib** — jangan hapus flag `--webpack` (Turbopack panic di path yang mengandung spasi).
- Situs pakai **static export** (`output: "export"` di `next.config.ts`) — semua kode harus tetap kompatibel client-side statis, tidak boleh menambah API routes/server actions.
- Warna & gaya visual harus konsisten dengan token yang sudah ada di `globals.css` (`--gold`, `--gold-hairline`, `--background`, `--foreground`, `--ink-muted`, dst) — jangan hardcode warna baru.
- Brand di UI selalu **"Arung Wangi"**, bukan "Arung Perfumery".
- Setelah setiap task, jalankan `npx tsc --noEmit` dan `npm run lint` — keduanya harus bersih sebelum commit.

---

### Task 1: Hapus link WhatsApp di Footer

**Files:**
- Modify: `src/components/Footer.tsx` (seluruh file, 31 baris)

**Interfaces:**
- Consumes: tidak ada (komponen berdiri sendiri, tidak dipakai komponen lain di task ini)
- Produces: `Footer` tetap default export tanpa perubahan signature — dipakai di `src/app/layout.tsx`, tidak perlu diubah

- [ ] **Step 1: Baca isi file saat ini untuk konfirmasi baseline**

File `src/components/Footer.tsx` saat ini:

```tsx
import { whatsappGeneralUrl } from "@/lib/products";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BrandMark className="h-4 w-4 text-gold-light" />
            <p className="font-serif text-lg">Arung Wangi</p>
          </div>
          <div className="flex gap-6 text-background/70">
            <a
              href={whatsappGeneralUrl()}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-light"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-background/50">
          &copy; {new Date().getFullYear()} Arung Wangi. Racikan
          artisan, bukan produk resmi brand manapun.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Ganti seluruh isi file** — hapus import `whatsappGeneralUrl` (tidak dipakai lagi di file ini), hapus blok `<a>` WhatsApp beserta div pembungkusnya, dan sederhanakan layout baris brand (tidak perlu lagi `flex-row sm:justify-between` karena cuma ada satu elemen):

```tsx
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex items-center gap-2">
          <BrandMark className="h-4 w-4 text-gold-light" />
          <p className="font-serif text-lg">Arung Wangi</p>
        </div>
        <p className="mt-6 text-xs text-background/50">
          &copy; {new Date().getFullYear()} Arung Wangi. Racikan
          artisan, bukan produk resmi brand manapun.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verifikasi type-check & lint**

Run: `npx tsc --noEmit`
Expected: tidak ada output (bersih, tidak ada error `whatsappGeneralUrl` unused import atau lainnya)

Run: `npm run lint`
Expected: tidak ada error/warning

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: hapus link WhatsApp di Footer"
```

---

### Task 2: Gerbang pilih ukuran + modal peringatan di HargaKalkulator

**Files:**
- Modify: `src/components/HargaKalkulator.tsx` (seluruh file, 117 baris)

**Interfaces:**
- Consumes: `whatsappOrderUrl`, `VOLUME_REQUEST`, `type Product` dari `@/lib/products` (sudah ada, tidak berubah); `KONSENTRASI_LIST`, `KONSENTRASI_DESKRIPSI`, `HARGA_TEASER`, `hitungRangeHarga`, `formatRupiah`, `type Konsentrasi` dari `@/lib/hargaKalkulator` (sudah ada, tidak berubah)
- Produces: subkomponen lokal `VarianWarningModal({ onClose: () => void })` — tidak diekspor, hanya dipakai di dalam file ini. `HargaKalkulator` tetap default export dengan signature sama (`{ product: Product }`), dipakai di `src/app/produk/[slug]/page.tsx` — tidak perlu diubah di sana.

- [ ] **Step 1: Baca isi file saat ini untuk konfirmasi baseline**

File `src/components/HargaKalkulator.tsx` saat ini (117 baris) sudah berisi `useState` untuk `volume` dan `konsentrasi`, cabang kondisional `!dipilih` (tampilan sebelum ukuran dipilih, dengan `<a href={whatsappOrderUrl(product.nama)}>`) dan cabang `dipilih` (tampilan setelah ukuran dipilih, dengan `<a href={whatsappOrderUrl(product.nama, {...})}>`).

- [ ] **Step 2: Ganti seluruh isi file** — tambah `useEffect` ke import React, tambah subkomponen `VarianWarningModal` di atas `HargaKalkulator`, tambah state `showVarianWarning`, ganti elemen `<a>` di cabang `!dipilih` jadi `<button>` yang membuka modal, render modal di akhir:

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  KONSENTRASI_LIST,
  KONSENTRASI_DESKRIPSI,
  HARGA_TEASER,
  hitungRangeHarga,
  formatRupiah,
  type Konsentrasi,
} from "@/lib/hargaKalkulator";
import { whatsappOrderUrl, VOLUME_REQUEST, type Product } from "@/lib/products";

function VarianWarningModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="varian-warning-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-gold-hairline bg-background p-6 text-center shadow-xl"
      >
        <h2
          id="varian-warning-title"
          className="font-serif text-xl text-foreground"
        >
          Pilih ukuran dulu ya
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Supaya kami bisa kasih estimasi harga yang pas, pilih ukuran
          botolnya dulu di atas.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 inline-block rounded-full bg-gold px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-light"
        >
          Oke, saya pilih dulu
        </button>
      </div>
    </div>
  );
}

export default function HargaKalkulator({ product }: { product: Product }) {
  const [volume, setVolume] = useState<number | null>(null);
  const [konsentrasi, setKonsentrasi] = useState<Konsentrasi>("EDP");
  const [showVarianWarning, setShowVarianWarning] = useState(false);

  const dipilih = volume !== null;
  const { low, high } = dipilih
    ? hitungRangeHarga(volume, product.grade, konsentrasi)
    : { low: 0, high: 0 };
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

      {!dipilih ? (
        <>
          <p className="mt-6 font-serif text-2xl text-foreground">
            Mulai {formatRupiah(HARGA_TEASER)}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Pilih ukuran di atas untuk lihat harga & pilihan konsentrasi
            (Cologne/EDT/EDP/Extrait).
          </p>

          <button
            type="button"
            onClick={() => setShowVarianWarning(true)}
            className="mt-4 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            Pesan via WhatsApp
          </button>
        </>
      ) : (
        <>
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

          <p className="mt-6 font-serif text-2xl text-foreground">
            {hargaText}
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Estimasi harga {volume} ml {konsentrasi} — harga final
            dikonfirmasi via WhatsApp.
          </p>

          <a
            href={whatsappOrderUrl(product.nama, {
              volumeMl: volume,
              konsentrasi,
              hargaText,
            })}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-gold px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            Pesan via WhatsApp
          </a>
        </>
      )}

      {showVarianWarning && (
        <VarianWarningModal onClose={() => setShowVarianWarning(false)} />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verifikasi type-check & lint**

Run: `npx tsc --noEmit`
Expected: tidak ada output (bersih)

Run: `npm run lint`
Expected: tidak ada error/warning

- [ ] **Step 4: Commit**

```bash
git add src/components/HargaKalkulator.tsx
git commit -m "feat: gerbang pilih ukuran sebelum WhatsApp di halaman produk"
```

---

### Task 3: Verifikasi browser, build, dan deploy

**Files:**
- Tidak ada file kode baru — task ini murni verifikasi end-to-end + update dokumentasi + deploy, mengikuti pipeline yang sudah dipakai konsisten untuk semua fitur sebelumnya di proyek ini.
- Modify: `CLAUDE.md` (tambah entri Progress Sesi baru)

**Interfaces:**
- Consumes: server dev yang sudah berjalan (`preview_start`/`preview_list` — cek serverId aktif), hasil Task 1 & Task 2
- Produces: tidak ada (task verifikasi, tidak menghasilkan interface baru)

- [ ] **Step 1: Reload dan cek halaman produk manapun sebelum pilih ukuran**

Pakai preview tool: navigasi ke `http://localhost:3000/produk/<slug apa saja>` (mis. `apple-lavender`), reload.

Ambil `preview_snapshot` — pastikan tombol "Pesan via WhatsApp" tampil (styling sama seperti sebelumnya, tidak terlihat disabled).

Klik tombol tersebut lewat `preview_click`. Ambil `preview_snapshot` lagi — harus muncul `role="dialog"` berisi teks "Pilih ukuran dulu ya" dan tombol "Oke, saya pilih dulu". Cek `preview_console_logs` level `error` — harus kosong.

Expected: modal muncul, TIDAK ada tab/window WhatsApp baru terbuka (karena elemen jadi `<button>`, bukan `<a>` yang navigasi).

- [ ] **Step 2: Cek modal bisa ditutup lewat tombol, backdrop, dan Escape**

Klik tombol "Oke, saya pilih dulu" — modal harus hilang (`preview_snapshot` tidak lagi menunjukkan `role="dialog"`).

Buka modal lagi (ulangi Step 1 bagian klik), lalu tes tutup dengan `preview_eval`:
```js
document.querySelector('[role="dialog"]').closest('.fixed').click()
```
Expected: modal tertutup (klik di backdrop, bukan di kartu — `stopPropagation` di kartu mencegah klik di dalam kartu ikut menutup).

Buka modal lagi, lalu tes Escape dengan `preview_eval`:
```js
document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
```
Expected: modal tertutup.

- [ ] **Step 3: Cek jalur normal setelah ukuran dipilih tidak berubah**

Di halaman produk yang sama, klik salah satu tombol ukuran (mis. "30 ml") lewat `preview_click`.

Ambil `preview_snapshot` — harus muncul pilihan Konsentrasi + harga range asli (bukan lagi "Mulai Rp20.000"), dan tombol "Pesan via WhatsApp" harus jadi link asli.

Cek dengan `preview_eval`:
```js
document.querySelector('a[href*="wa.me"]')?.href
```
Expected: string URL yang mengandung parameter volume/konsentrasi/harga (format sesuai `whatsappOrderUrl` yang sudah ada) — BUKAN `null`/`undefined`.

- [ ] **Step 4: Cek Footer tidak lagi ada WhatsApp**

Navigasi ke `http://localhost:3000/` (Beranda, footer selalu render di semua halaman lewat `layout.tsx`).

Ambil `preview_snapshot`, pastikan tidak ada lagi teks "WhatsApp" di area footer (`role="contentinfo"`).

- [ ] **Step 5: Cek halaman Tentang tidak berubah**

Navigasi ke `http://localhost:3000/tentang`.

Ambil `preview_snapshot`, pastikan link "WhatsApp" masih ada dan masih `<a href="https://wa.me/...">` langsung (cek dengan `preview_eval`: `document.querySelector('a[href*="wa.me"]')?.tagName` harus `"A"`, bukan `"BUTTON"`).

- [ ] **Step 6: Build static export penuh**

Run: `npm run build -- --webpack`
Expected: sukses, tetap generate 146 halaman statis (tidak berubah dari sebelumnya — task ini tidak menambah/mengurangi route)

- [ ] **Step 7: Update `CLAUDE.md`**

Tambah section baru "Progress Sesi #9" (ikuti format section sesi sebelumnya) yang mendokumentasikan: gerbang modal di `HargaKalkulator.tsx` (kondisi trigger, cara tutup, alasan), penghapusan WhatsApp di Footer, dan konfirmasi Tentang tidak berubah. Update juga baris "Diperbarui" di header file.

- [ ] **Step 8: Commit dokumentasi**

```bash
git add CLAUDE.md
git commit -m "docs: catat sesi #9 - gerbang varian WhatsApp + hapus WA footer"
```

- [ ] **Step 9: Push ke remote**

```bash
GIT_TERMINAL_PROMPT=0 git push origin claude/nostalgic-jepsen-736c22:main
```
Expected: sukses. Kalau macet/timeout, tanyakan ke user apakah ada popup sign-in GitHub yang muncul (pola yang sudah terjadi beberapa kali di proyek ini) — kalau tidak ada popup, retry biasanya cukup.

- [ ] **Step 10: Deploy ke Cloudflare Pages**

```bash
npx wrangler pages deploy out --project-name=arung-parfumary --branch=main --commit-dirty=true --commit-message="Gerbang varian WhatsApp + hapus WA footer"
```
Expected: sukses, dapat URL deploy unik (`https://<hash>.arung-parfumary.pages.dev`).

- [ ] **Step 11: Verifikasi live deployment**

Pakai WebFetch ke URL deploy unik dari Step 10:
- `/produk/<slug>` — konfirmasi tidak ada link WhatsApp langsung yang bisa diakses tanpa pilih ukuran (deskripsi halaman menyebut tombol WA, tapi ini SSR/static HTML jadi behavior klik tidak bisa dicek WebFetch — cukup pastikan halaman render tanpa error)
- `/` (Beranda) — konfirmasi footer tidak menyebut "WhatsApp"
- `/tentang` — konfirmasi masih ada link WhatsApp

## Ringkasan Cakupan Spec

- Kondisi gerbang (`volume === null` saja, default EDP dianggap cukup) → Task 2 Step 2
- Tombol tetap terlihat sama, jadi `<button>` bukan `<a>` → Task 2 Step 2
- Perilaku setelah ukuran dipilih tidak berubah → Task 2 Step 2 (cabang `dipilih` tidak diubah) + Task 3 Step 3
- Isi & gaya modal (judul, kalimat, satu tombol, styling token situs) → Task 2 Step 2
- Cara tutup (tombol/backdrop/Escape) → Task 2 Step 2 + Task 3 Step 2
- Footer WhatsApp dihapus total → Task 1
- Tentang tidak disentuh → Task 3 Step 5 (verifikasi eksplisit)
