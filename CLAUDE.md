@AGENTS.md

# claude.md — Arung Perfumery (brand: Arung Wangi)

> Konteks proyek untuk dilanjutkan sesi berikutnya.
> Diperbarui: 2026-07-03 (sesi #3 — katalog racikan riil, ukuran seragam, merge Tentang+Kontak)

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

## ✅ Progress Sesi #2 (2026-07-03)

- **Nomor WhatsApp beneran**: `6289900447098` (bukan placeholder lagi) di
  `WHATSAPP_NUMBER` (`src/lib/products.ts`)
- **Format pesan WA terstruktur** — dua fungsi di `src/lib/products.ts`:
  `whatsappOrderUrl(namaProduk)` (dipakai di halaman detail produk, prefill
  nama racikan + format Nama/Ukuran/Jumlah/Alamat) dan
  `whatsappGeneralUrl()` (dipakai di Footer & Kontak, format sama tanpa
  nama produk)
- **Instagram dihapus** dari `Footer.tsx` dan `kontak/page.tsx` — dianggap
  kurang mewah, sengaja tidak dipasang dulu
- **Redesign visual** (spec: `docs/superpowers/specs/2026-07-03-arung-wangi-redesign-design.md`,
  plan: `docs/superpowers/plans/2026-07-03-arung-wangi-redesign.md`) —
  kombinasi dari 3 opsi yang dipresentasikan (fondasi "Warm Parchment
  Refined" + logo & transisi dari "Cinematic Hybrid"):
  - Token warna digeser ke brass/parchment (`--gold: #9c6a2b`,
    `--background: #f7f1e4`, dst) + token baru `--gold-hairline` di
    `globals.css`
  - `BrandMark.tsx` (baru) — logo swirl mark SVG, dipakai di Header & Footer
  - `Header.tsx` — navbar diracik ulang (garis emas tipis, hover dot emas)
    + **menu mobile** (hamburger, panel turun, tutup otomatis saat ganti
    halaman/`Escape`) — sebelumnya navbar tidak responsive sama sekali
  - `PageTransition.tsx` (baru) — animasi **gold-wipe** saat pindah
    halaman (bilah emas full-bleed menyapu layar), dipasang di
    `layout.tsx` membungkus `{children}`. Hormat `prefers-reduced-motion`
    (skip animasi total, bukan cuma dipercepat)
- **Dev server launcher**: `start-dev.bat` (di root project & di worktree)
  — auto-buka browser ke `http://localhost:3001` (port 3001 dipilih
  supaya tidak bentrok dengan GitLab lokal yang biasanya pakai port 3000)
- **Git remote & push**: repo GitHub dibuat user di
  `https://github.com/JIAkbar/arung-parfumary` → di-push ke branch `main`
- **Deploy ke Cloudflare Pages**: LIVE di
  **https://arung-parfumary.pages.dev**
  - `next.config.ts` diset `output: "export"` (situs ini murni statis,
    tanpa API routes/SSR, jadi static export paling simpel & robust —
    bukan pakai adapter Workers/`next-on-pages`)
  - Project Cloudflare Pages dibuat via `wrangler pages project create
    arung-parfumary --production-branch=main` (nama project harus persis
    `arung-parfumary` supaya subdomain-nya cocok)
  - Deploy manual: `npx wrangler pages deploy out --project-name=arung-parfumary --branch=main`
  - **Belum auto-deploy** dari GitHub push — ini masih upload manual
    sekali jalan. Kalau mau auto-deploy tiap push, perlu salah satu:
    (a) sambungkan repo lewat dashboard Cloudflare (Settings → Builds →
    Connect to Git, butuh klik OAuth GitHub manual oleh user), atau
    (b) GitHub Actions workflow yang jalankan `wrangler pages deploy`
    (belum dibuat)

---

## ✅ Progress Sesi #3 (2026-07-03)

- **Katalog dirombak jadi 3 racikan riil** (`Gilded Noir`, `Velvet Santal`,
  `Azure Neroli` dari sesi #1 **dihapus** — tidak ada referensi parfum
  aslinya yang tercatat, jadi dianggap dummy). Sisa 3 racikan yang semuanya
  punya `fragranticaUrl` jelas: `Verdant Fig`, `Rosé Bergamot`,
  `Praline Tonka` (lihat tabel referensi di bawah)
- **Main Accords sekarang berwarna per family aroma** (`MainAccords.tsx`)
  — sebelumnya semua bar pakai gradient emas polos, sekarang tiap accord
  (Woody/Citrus/Floral/dst) dapat warna sendiri via helper `accordGradient()`
  yang cocokkan nama accord (case-insensitive, keyword match) ke palet
  warna. Accord yang tidak dikenali fallback ke gradient emas default
  (`var(--gold-light)` → `var(--gold)`)
- **Ukuran botol diseragamkan**: semua racikan sekarang pakai
  `VOLUME_TERSEDIA_DEFAULT = [15, 20, 30, 50]` (`src/lib/products.ts`),
  bukan array custom per produk lagi. Ukuran **100 ml tidak dijual
  reguler** — ditawarkan sebagai request via WhatsApp (`VOLUME_REQUEST =
  100`), muncul sebagai teks kecil di bawah pilihan ukuran di halaman
  produk (`produk/[slug]/page.tsx`)
- **Halaman Tentang + Kontak digabung jadi satu** (`/tentang`) — konten
  Kontak (heading "Ada Pertanyaan?" + tombol WhatsApp) ditempel sebagai
  section kedua di `tentang/page.tsx`, dipisah garis `border-gold-hairline`.
  Route `/kontak` **dihapus total** (folder `src/app/kontak/` dihapus),
  `NAV` di `Header.tsx` sekarang cuma 2 item: Katalog, Tentang. Tidak ada
  redirect dari `/kontak` lama (situs baru live, belum ada backlink yang
  perlu dijaga) — kalau nanti ternyata perlu, static export tidak
  mendukung `redirects()` di `next.config.ts`, jadi redirect harus pakai
  halaman client-side atau meta-refresh
- **6 racikan baru ditambahkan** (total jadi 9): `Iris Amber`,
  `Bergamot Chai`, `Apricot Rose`, `Lavender Marine`, `Cardamom Amber`,
  `Bergamot Ambroxan` — lihat tabel referensi di bawah untuk terinspirasi
  dari apa
- **Field baru di `Product`**: `gender: "Pria" | "Wanita" | "Unisex"` dan
  `waktuPakai: ("Pagi" | "Siang" | "Sore" | "Malam")[]` — **wajib diisi**
  untuk setiap racikan baru mulai sekarang. `gender` ikut klasifikasi resmi
  Fragrantica ("for men" → Pria, "for women and men" → Unisex, dst — jangan
  asal tebak dari nama/vibe). `waktuPakai` pilih 1–2 slot yang paling pas
  (bukan asal semua slot) berdasarkan karakter aroma: citrus/aquatic segar
  → Pagi/Siang, floral/fruity elegan → Siang/Sore, sweet/spicy/dark →
  Sore/Malam. Boleh 3 slot kalau racikan memang genuinely serbaguna
  (jarang — cuma `Bergamot Ambroxan` yang dapat 3 slot sejauh ini). Kedua
  field ini tampil sebagai badge/tag di `ProductCard.tsx` dan
  `produk/[slug]/page.tsx`

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
│   │   └── tentang/page.tsx        ← Tentang + Kontak digabung (sesi #3)
│   ├── components/
│   │   ├── Header.tsx / Footer.tsx ← NAV cuma Katalog + Tentang (sesi #3)
│   │   ├── Hero.tsx                ← client component, animasi entrance
│   │   ├── ProductCard.tsx
│   │   ├── PyramidNotes.tsx / MainAccords.tsx ← accord bar berwarna per family (sesi #3)
│   │   ├── BottleIllustration.tsx  ← SVG original, client component (useId)
│   │   ├── BrandMark.tsx           ← logo swirl mark SVG (sesi #2)
│   │   ├── PageTransition.tsx      ← animasi gold-wipe antar halaman (sesi #2)
│   │   └── Reveal.tsx              ← scroll-reveal wrapper (framer-motion)
│   └── lib/
│       └── products.ts             ← DATA PRODUK + WHATSAPP_NUMBER + whatsappOrderUrl/whatsappGeneralUrl
├── docs/superpowers/specs/         ← spec desain (mis. redesign navbar/logo/tema)
├── docs/superpowers/plans/         ← plan implementasi per spec
└── start-dev.bat                   ← launcher dev server (auto-buka browser, port 3001)
```

---

## 🧪 Alur Konten Produk Baru

User sebutkan nama parfum yang mau direplikasi (mis. "Mykonoz Monaco
Royal") → Claude baca halaman Fragrantica publik (WebFetch, kalau 403
coba WebSearch dulu buat cari ringkasan notes-nya) → rangkum **main
accords** + **piramida notes** sebagai referensi fakta (bukan salin
teks/gambar editorial Fragrantica) → tulis nama & deskripsi racikan
sendiri (jangan pakai nama brand aslinya) → tambah entry baru di
`src/lib/products.ts` dengan `hargaMulai: HARGA_MULAI_DEFAULT` dan
`volumeTersedia: VOLUME_TERSEDIA_DEFAULT` (jangan bikin array ukuran
custom lagi — semua racikan wajib ukuran yang sama: 15/20/30/50 ml,
100 ml via request).

**Wajib selalu isi `fragranticaUrl`** dengan link Fragrantica asli — kalau
tidak ada referensi spesifik yang bisa dicatat, jangan tambahkan racikan
itu (lihat catatan penghapusan 3 racikan dummy di Progress Sesi #3).

**Foto produk**: belum ada foto asli — pakai `BottleIllustration` (SVG
generated, warna beda per produk via prop `bottleColor`). Kalau nanti ada
foto racikan asli, ganti jadi `<Image>` Next.js.

### Daftar Referensi Racikan (internal, jangan tampil di website)

Supaya kita (bukan pengunjung situs) tahu racikan mana terinspirasi dari
parfum apa. **Sengaja tidak ditampilkan di UI publik** — menyebut nama
brand asli di halaman produk berisiko dibaca sebagai klaim tiruan/afiliasi
dengan brand tsb (potensi masalah merek dagang), apalagi racikan ini bukan
produk resmi brand manapun (lihat disclaimer di footer).

| Racikan (di web) | Terinspirasi dari | Link Fragrantica |
|---|---|---|
| Verdant Fig | Mykonos — Down to Earth | fragrantica.com/perfume/Mykonos/Down-to-Earth-120471.html |
| Rosé Bergamot | Mykonos — Monaco Royale | fragrantica.com/perfume/Mykonos/Monaco-Royale-121113.html |
| Praline Tonka | Mykonos — Cafe Drops | fragrantica.com/perfume/Mykonos/Cafe-Drops-120463.html |
| Iris Amber | SAFF & Co. — Solaris | fragrantica.com/perfume/SAFF-Co/Solaris-98616.html |
| Bergamot Chai | Mykonos — Inception | fragrantica.com/perfume/Mykonos/Inception-121107.html |
| Apricot Rose | Mykonos — Utopia | fragrantica.com/perfume/Mykonos/Utopia-121138.html |
| Lavender Marine | Mykonos — California Blue | fragrantica.com/perfume/Mykonos/California-Blue-120464.html |
| Cardamom Amber | Rabanne — Black XS (2005, original) | fragrantica.com/perfume/Rabanne/Black-XS-514.html |
| Bergamot Ambroxan | Dior — Sauvage (2015 EDT, original) | fragrantica.com/perfume/Dior/Sauvage-31861.html |

Kalau tambah racikan baru lewat alur di atas, **selalu update tabel ini**
juga — jangan cuma isi `fragranticaUrl` di `products.ts`.

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
5. Deploy: **Cloudflare Pages** (`output: "export"` di `next.config.ts`,
   static export murni — bukan Workers/`next-on-pages` karena situs ini
   tidak punya API routes/SSR), repo terpisah dari Parfumary
6. Warna: keluarga brass/parchment (`--gold: #9c6a2b`, dst di
   `globals.css`) — sengaja digeser dari oranye/terracotta generik ke
   brass supaya nggak terasa "AI generic cream+terracotta"

---

## ⚠️ Catatan Penting

- Kalau jalankan dev server lewat script/launcher otomatis (bukan
  terminal manual), pastikan **cd langsung** ke folder project — jangan
  pakai `npm run dev --prefix <path>` dari direktori lain, itu memicu bug
  Turbopack yang sama meski sudah pakai `--webpack` kadang masih perlu cd
  asli (sudah diverifikasi aman dengan `cd /d` ke short-path lalu
  `npm run dev`)
- Nama brand di UI = **"Arung Wangi"** (bukan "Arung Perfumery" — itu cuma
  nama folder/repo)
- `WHATSAPP_NUMBER` sudah nomor asli (`6289900447098`) — kalau ganti,
  edit di `src/lib/products.ts`, dua fungsi order URL ikut otomatis
- Remote GitHub: `https://github.com/JIAkbar/arung-parfumary`, branch
  `main`. Push langsung ke `main` (bukan lewat PR) — itu keputusan user
  di sesi #2, bukan default
- Deploy Cloudflare Pages **manual** (`wrangler pages deploy out
  --project-name=arung-parfumary --branch=main`), belum auto-deploy dari
  git push — lihat catatan di Progress Sesi #2 kalau mau setup itu
- Kalau tambah halaman/komponen baru yang butuh API routes atau server
  action, static export (`output: "export"`) harus dicabut dulu dari
  `next.config.ts` sebelum build — dan alur deploy Cloudflare-nya perlu
  diganti ke adapter Workers (`@opennextjs/cloudflare`), bukan lagi
  `wrangler pages deploy out` langsung
