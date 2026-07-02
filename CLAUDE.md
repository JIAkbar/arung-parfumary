@AGENTS.md

# claude.md — Arung Perfumery (brand: Arung Wangi)

> Konteks proyek untuk dilanjutkan sesi berikutnya.
> Diperbarui: 2026-07-03 (sesi #1 — scaffold awal)

---

## Apa Project Ini

Website publik/toko untuk brand parfum artisan **"Arung Wangi"**. Terpisah
dari project `Parfumary` (app kalkulator racik parfum internal) — beda
folder, beda repo, beda stack, tidak saling terhubung.

Tujuan: pelanggan lihat katalog racikan → tertarik secara visual → klik
"Pesan via WhatsApp". Tidak ada checkout/payment gateway di tahap awal.

---

## ✅ Progress Sesi #1 (2026-07-03)

- Scaffold Next.js (App Router, TypeScript, Tailwind CSS v4)
- Design system: font **Playfair Display** (heading) + **Inter** (body),
  palet hitam premium (`#1C1917`-ish) + aksen emas (`#A16207`) + krem
- 5 halaman: Beranda, Katalog, Detail Produk (`/produk/[slug]`), Tentang,
  Kontak
- Komponen: `Header`, `Footer`, `Hero`, `ProductCard`, `PyramidNotes`
  (piramida top/middle/base notes), `MainAccords` (bar chart accord),
  `BottleIllustration` (SVG botol original, bukan foto brand/Fragrantica),
  `Reveal` (scroll-reveal animation wrapper)
- Animasi: `framer-motion` — hero entrance staggered, botol melayang halus,
  kartu produk scroll-reveal (Home & Katalog), piramida/accord reveal di
  halaman detail. Semua menghormati `prefers-reduced-motion`
- Data produk contoh (3 racikan placeholder) di `src/lib/products.ts`
- Harga semua racikan diseragamkan: `HARGA_MULAI_DEFAULT = 20000` (Rp20.000)
- Tombol "Pesan via WhatsApp" (`wa.me`, pesan ter-prefill nama produk) —
  **nomor masih placeholder** `6281234567890`, ganti di `WHATSAPP_NUMBER`
  (`src/lib/products.ts`)
- Nama folder project: awalnya `latelier-parfum`, diganti jadi
  `Arung Perfumery` (folder saja — brand di UI tetap "Arung Wangi")
- Git: repo lokal sudah ada beberapa commit. **Belum** ada remote GitHub,
  **belum** di-deploy ke Cloudflare Pages

---

## 📁 Struktur File

```
Arung Perfumery/
├── CLAUDE.md                    ← file ini
├── AGENTS.md                    ← catatan Next.js version-awareness (auto)
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← font, metadata, Header+Footer wrapper
│   │   ├── page.tsx               ← Beranda (Hero + Racikan Unggulan)
│   │   ├── globals.css            ← design tokens (Tailwind v4 @theme)
│   │   ├── katalog/page.tsx       ← grid semua produk
│   │   ├── produk/[slug]/page.tsx ← detail produk + piramida + accords
│   │   ├── tentang/page.tsx
│   │   └── kontak/page.tsx
│   ├── components/
│   │   ├── Header.tsx / Footer.tsx
│   │   ├── Hero.tsx                ← client component, animasi entrance
│   │   ├── ProductCard.tsx
│   │   ├── PyramidNotes.tsx / MainAccords.tsx
│   │   ├── BottleIllustration.tsx  ← SVG original, client component (useId)
│   │   └── Reveal.tsx              ← scroll-reveal wrapper (framer-motion)
│   └── lib/
│       └── products.ts             ← DATA PRODUK — tambah racikan baru di sini
```

---

## 🧪 Alur Konten Produk Baru

User sebutkan nama parfum yang mau direplikasi (mis. "Mykonoz Monaco
Royal") → Claude baca halaman Fragrantica publik (WebFetch) → rangkum
**main accords** + **piramida notes** sebagai referensi fakta (bukan
salin teks/gambar editorial Fragrantica) → tulis deskripsi sendiri →
tambah entry baru di `src/lib/products.ts` dengan `hargaMulai:
HARGA_MULAI_DEFAULT`.

**Foto produk**: belum ada foto asli — pakai `BottleIllustration` (SVG
generated, warna beda per produk via prop `bottleColor`). Kalau nanti ada
foto racikan asli, ganti jadi `<Image>` Next.js.

---

## 🔧 Keputusan Teknis

1. **Next.js + Tailwind v4 + TypeScript**, App Router
2. **`next dev --webpack` / `next build --webpack`** — BUKAN Turbopack
   default. Turbopack Next.js 16 punya bug: panic "leaves the filesystem
   root" kalau path folder project mengandung spasi (folder induk
   `10. Pengembangan` ada spasi). Jangan hapus flag `--webpack` ini kecuali
   sudah pindah ke path tanpa spasi.
3. **framer-motion** untuk animasi (dipilih karena rencana pakai referensi
   komponen dari 21st.dev yang formatnya React+Tailwind)
4. Data produk **statis** (TypeScript array, bukan database) — sesuai
   scope awal (belum perlu backend/CMS)
5. Deploy rencana: **Cloudflare Pages**, repo terpisah dari Parfumary

---

## ⚠️ Catatan Penting

- Kalau jalankan dev server lewat script/launcher otomatis (bukan
  terminal manual), pastikan **cd langsung** ke folder project — jangan
  pakai `npm run dev --prefix <path>` dari direktori lain, itu memicu bug
  Turbopack yang sama meski sudah pakai `--webpack` kadang masih perlu cd
  asli (sudah diverifikasi aman dengan `cd /d` ke short-path lalu
  `npm run dev`)
- Ganti `WHATSAPP_NUMBER` di `src/lib/products.ts` sebelum live beneran
- Nama brand di UI = **"Arung Wangi"** (bukan "Arung Perfumery" — itu cuma
  nama folder/repo)
- Belum ada remote GitHub — kalau user minta push, perlu `git remote add`
  dulu (belum pernah di-setup)
