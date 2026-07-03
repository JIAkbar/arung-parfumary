@AGENTS.md

# claude.md — Arung Perfumery (brand: Arung Wangi)

> Konteks proyek untuk dilanjutkan sesi berikutnya.
> Diperbarui: 2026-07-03 (sesi #8 — fitur "Racikan Serupa" di halaman detail)

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
- **Filter gender di Katalog** — komponen baru `KatalogGrid.tsx` (client
  component), tombol Semua/Pria/Wanita/Unisex di atas grid produk, filter
  murni client-side (tidak query ulang, cuma `.filter()` array yang sudah
  ada). `katalog/page.tsx` sekarang cuma passing `products` ke komponen ini
- **Koreksi `WHATSAPP_NUMBER`**: nomor yang tercatat sesi #2
  (`6289900447098` / 0899-0044-7098) ternyata salah ketik satu digit —
  nomor benar adalah **`628990447098`** (0899-044-7098), sudah dikonfirmasi
  user & diperbaiki di `src/lib/products.ts`

---

## ✅ Progress Sesi #4 (2026-07-03)

- **Filter Waktu Pakai & Family Aroma di Katalog** — `KatalogGrid.tsx`
  sekarang punya 3 baris filter (Gender/Waktu/Aroma), semua AND satu sama
  lain. "Family Aroma" dihitung otomatis dari accord dominan tiap racikan
  (`primaryFamily()` di `src/lib/accordFamily.ts` — ambil accord dengan
  `persen` tertinggi, mainAccords **wajib diurutkan descending** biar ini
  akurat), bukan field manual baru — daftar tombolnya juga auto-generate
  dari union family yang benar-benar ada di data (bukan hardcoded)
- **Scent matcher berbasis kata kunci** (`src/lib/scentMatcher.ts`) — kotak
  teks bebas "Ceritakan racikan yang kamu mau" di atas filter. **Bukan AI
  beneran** (tidak ada LLM call, situs tetap statis) — cuma cocokkan token
  dari input ke (a) kamus sinonim → family aroma (`SYNONYMS` dict, mis.
  "spicy"/"rempah"/"pedas" → "Rempah") dengan skor = persen accord, dan
  (b) substring literal ke `notes.top/middle/base`. Kalau skor 0 untuk
  semua racikan (mis. user sebut note yang belum ada, seperti "leather"),
  tampil pesan jujur "belum ada yang cocok" — **jangan dipaksa nampilin
  hasil asal ada**. Kalau nanti mau upgrade ke AI beneran, butuh Cloudflare
  Pages Functions + Workers AI binding (akun sudah punya akses), bukan
  sekadar edit komponen
- **SEO: OG image dinamis + JSON-LD per racikan** —
  `produk/[slug]/opengraph-image.tsx` generate PNG 1200×630 saat build
  (pakai `next/og` `ImageResponse`, prerender statis lewat
  `generateStaticParams` sendiri karena ini route terpisah dari
  `page.tsx`). `generateMetadata` di `page.tsx` diisi `openGraph`/`twitter`
  fields, plus `<script type="application/ld+json">` schema.org `Product`
  ditempel di body halaman. **Wajib ada `metadataBase`** di
  `layout.tsx` (`https://arung-parfumary.pages.dev`) — tanpa itu URL
  `og:image` resolve ke `localhost:3000` di production (sempat kejadian,
  sudah diperbaiki)
- **Filter Katalog diubah dari pill button jadi 3 dropdown compact**
  (Gender/Waktu/Aroma dalam satu baris) — 3 baris tombol kerasa terlalu
  ramai untuk katalog kecil, `FilterSelect` (native `<select>`)
  menggantikan `FilterRow` lama di `KatalogGrid.tsx`

---

## ✅ Progress Sesi #5 (2026-07-03)

- **34 racikan baru ditambahkan sekaligus (total jadi 43)** — riset lewat
  WebSearch (Fragrantica langsung 403, jadi WebSearch summary jadi sumber
  utama sejak sesi ini), semua sudah dicek tidak duplikat dengan racikan
  lama. Lihat tabel referensi lengkap di bawah untuk daftar & link
  Fragrantica masing-masing
- **Skala katalog berubah signifikan**: dari 9 racikan (semua niche/indie
  brand seperti Mykonos, SAFF & Co.) jadi mencakup banyak fragrance
  mainstream/ikonik (Aventus, Baccarat Rouge 540, Black Opium, Sauvage
  sudah ada sebelumnya, dll). Kalau ke depan mau menjaga positioning
  "artisan niche-inspired" murni, pertimbangkan pisah kategori/koleksi di
  katalog — belum dilakukan di sesi ini
- Racikan baru ini mengisi celah yang sempat ketahuan waktu tes scent
  matcher sesi #4: dulu kata kunci "leather" tidak match apapun, sekarang
  `Oud Mint` (ref: Mancera Aoud Lemon Mint) dan `Smoked Cherry` (ref: Tom
  Ford Cherry Smoke) punya note Leather asli — matcher jadi lebih kaya
  otomatis begitu data produk bertambah, tidak perlu ubah kode
  `scentMatcher.ts`

---

## ✅ Progress Sesi #6 (2026-07-03) — Kalkulator Harga Dinamis

- **`hargaMulai` (harga flat Rp20.000 di semua racikan) DIHAPUS TOTAL** dari
  `Product` interface, dari semua 43 entry, dan dari
  `HARGA_MULAI_DEFAULT`. Diganti sepenuhnya oleh perhitungan dinamis
  berbasis ukuran botol + konsentrasi + `grade` — lihat
  `src/lib/hargaKalkulator.ts`
- **Rumus harga ikut kalkulator racik internal** (project terpisah
  `Parfumary`, lihat `index.html`-nya di sana): persentase fragrance oil
  per konsentrasi persis sama dengan `PRESET_PCT` di kalkulator itu —
  `Premium: {Cologne 8%, EDT 13%, EDP 20%, Extrait 30%}`,
  `Medium: {Cologne 12%, EDT 19%, EDP 29%, Extrait 44%}` — supaya kalau
  formula racik di Parfumary berubah, gampang disamakan lagi di sini
- **Asumsi biaya bahan (WAJIB DIKETAHUI, bukan harga bahan riil per merk)**
  — dari nilai default kalkulator Parfumary (`harga.html`), bukan harga
  bahan aktual toko:
  - Bibit Premium: Rp1.500/ml (Rp150.000/100ml)
  - Bibit Medium: Rp1.125/ml (Rp112.500/100ml)
  - Booster: 1% dari volume bibit, Rp10.000/ml
  - Pelarut: Rp135/ml
  - Botol polos: Rp7.000/pcs (flat, tidak ikut ukuran)
  - **Kalau biaya bahan riil beda dari ini, cukup ubah 4 konstanta di
    `hargaKalkulator.ts`** (`BIBIT_PER_ML`, `BOOSTER_PER_ML`,
    `PELARUT_PER_ML`, `BOTOL_POLOS`) — tidak perlu ubah komponen manapun,
    semua turunan (ProductCard, halaman detail, OG image, JSON-LD) ikut
    otomatis
- **Rumus pembulatan jadi range harga** (dikonfirmasi cocok dengan contoh
  user: biaya produksi ±Rp20.874 → range Rp22.000–24.000):
  1. `step` = 10% dari biaya produksi, dibulatkan ke kelipatan Rp1.000
     terdekat (minimum Rp1.000)
  2. `low` = biaya produksi dibulatkan **ke atas** ke kelipatan `step`
  3. `high` = `low + step`
  - Fungsi: `hitungRangeHarga(volumeMl, grade, konsentrasi)` di
    `hargaKalkulator.ts`
- **`HargaKalkulator.tsx`** (client component baru) — di halaman detail
  produk: **sebelum** user pilih ukuran, cuma tampil "Mulai Rp20.000"
  (lihat `HARGA_TEASER` di bawah) + tombol WA polos, **tanpa** pilihan
  konsentrasi. Begitu user klik salah satu ukuran (15/20/30/50 ml), BARU
  pilihan konsentrasi (Cologne/EDT/EDP/Extrait, default EDP) dan range
  harga asli muncul, update real-time tiap ganti ukuran/konsentrasi. Ini
  keputusan sengaja dari user (sesi #6 lanjutan) — Rp20.000 dianggap
  "daya tarik" harga murah yang harus tetap kelihatan di awal, harga asli
  baru diungkap setelah user mulai berinteraksi
- **`HARGA_TEASER = 20000`** di `hargaKalkulator.ts` — angka **flat,
  sengaja TIDAK dihitung dari rumus**, dipakai konsisten di 4 tempat:
  `ProductCard.tsx` (badge "Mulai Rp..." di katalog), `opengraph-image.tsx`
  (gambar share), JSON-LD `Product.offers.price`, dan tampilan awal
  `HargaKalkulator.tsx` sebelum ukuran dipilih. Kalau mau ganti angka
  teaser-nya, cukup ubah konstanta ini di satu tempat
- **Filter Katalog: dropdown `<select>` native diganti custom** —
  `<select>` browser nggak bisa di-styling sama sekali saat panelnya
  dibuka (selalu tampil kotak putih polos OS, beda banget sama tema
  emas-krem). `FilterDropdown` baru di `KatalogGrid.tsx` gambar sendiri
  tombol + panelnya (radius, warna, hover gold, dot aktif), pakai
  `role="listbox"`/`"option"`, tutup otomatis saat klik di luar atau
  `Escape`. Tiga opsi sempat divisualisasikan dulu (dropdown custom vs
  chip-scroll vs bottom-sheet) — user pilih dropdown custom
- **Filter Aroma sekarang pakai nama accord mentah, bukan kategori
  bucket** — sebelumnya `primaryFamily()` di `accordFamily.ts`
  mengelompokkan accord (mis. Vanilla/Coffee/Caramel/Milky semua jadi
  "Sweet") supaya daftar filter pendek. User minta disamakan dengan
  Fragrantica yang "sudah cukup lengkap" — sekarang filter Aroma langsung
  pakai `product.mainAccords[0].nama` apa adanya (accord dominan tiap
  racikan, tanpa dikelompokkan ulang), supaya label filter = label yang
  tampil di grafik Main Accords halaman produk, tidak ada mismatch.
  **`primaryFamily()` sudah dihapus** dari `accordFamily.ts` (sudah tidak
  dipakai) — fungsi `accordFamily()` (buat warna grafik & scent matcher)
  tetap ada, tidak berubah
- **`whatsappOrderUrl` sekarang punya parameter opsional `OrderDetail`**
  (`volumeMl`, `konsentrasi`, `hargaText`) — kalau user sudah pilih ukuran
  di kalkulator, pesan WA ter-prefill lengkap dengan konsentrasi &
  estimasi harga asli; kalau belum pilih, tetap pakai format placeholder
  kosong seperti biasa
- **Infinite scroll di katalog** — `PAGE_SIZE = 20` di `KatalogGrid.tsx`.
  Render cuma 20 kartu pertama (`visibleProducts`), sentinel `<div>` kosong
  di bawah grid dipantau `IntersectionObserver` (`rootMargin: "600px"`) —
  begitu sentinel mendekati viewport, `visibleCount` nambah 20 lagi. Reset
  balik ke 20 pakai pola "derive during render" (bandingkan `filterKey`
  gabungan gender+waktu+aroma+query, bukan `useEffect` — sama kayak fix di
  `Header.tsx` sesi #2, ESLint `react-hooks/set-state-in-effect` melarang
  `setState` langsung di body effect). Semua data 43 produk tetap di
  client sejak awal (static export) — infinite scroll ini cuma reveal
  bertahap, **bukan** fetch data baru, jadi tidak perlu loading
  state/spinner. **Belum bisa diverifikasi interaktif** di preview tool
  sesi ini — tab preview kebaca `document.hidden = true` (background),
  yang bikin `IntersectionObserver` (dan animasi CSS lain, lihat catatan
  sesi #2/#3) tidak pernah fire sama sekali, dites langsung di elemen yang
  jelas kelihatan pun tidak trigger. Logic-nya standard & `tsc`/`eslint`/
  build semua lolos — tapi kalau nanti pertama kali dites di browser asli,
  cek beneran jalan pas scroll ke bawah katalog

---

## ✅ Progress Sesi #7 (2026-07-03) — 26 Racikan Baru (total 69)

- User kirim **48 link Fragrantica sekaligus**, minta dicek duplikat/mirip
  dulu sebelum ditambah (bukan langsung ditambah semua). Hasil kategorisasi:
  - **23 baris link → 21 racikan yang sudah ada** (duplikat, tidak
    ditambah) — daftar lengkap ada di bawah, "Log Link Duplikat Sesi #7"
  - **7 "flanker"** (varian dari parfum yang linenya sudah ada di katalog,
    tapi versi/edisi beda — mis. EDT vs Parfum, original vs Intense) — user
    approve ditambah sebagai racikan terpisah
  - **19 racikan genuinely baru** — user approve ditambah semua
  - Total ditambahkan: **26 racikan baru** (43 → **69**)
- Semua 26 entry baru pakai `volumeTersedia: VOLUME_TERSEDIA_DEFAULT`
  (tidak ada field harga, sesuai perubahan sesi #6), `gender`/`waktuPakai`
  terisi mengikuti aturan sesi #3, dan `fragranticaUrl` wajib ada — lihat
  tabel referensi di bawah untuk daftar lengkap + link masing-masing
- Verifikasi: `tsc --noEmit` bersih, `eslint` bersih, jumlah `slug` di
  `products.ts` = 69 (tidak ada duplikat slug, dicek via script Node),
  `next build --webpack` sukses generate 144 halaman statis
  (69×2 + 6 halaman lain), spot-check render 2 racikan baru (`Apple
  Lavender` — entry pertama batch ini, `Passion Vanilla` — entry
  terakhir) lewat preview browser, tidak ada error console

### Log Link Duplikat Sesi #7 (biar next time tidak perlu dicek ulang)

23 link dari 48 yang dikirim user ternyata sudah tercakup racikan yang
ada (beberapa parfum dikirim linknya 2× oleh user sendiri). Dicatat di
sini murni sebagai referensi internal — **bukan** untuk ditambahkan:

| Link yang dikirim (mengarah ke parfum ini) | Sudah tercakup racikan |
|---|---|
| Yves Saint Laurent — Y Eau de Parfum (×2 baris dikirim) | Sage Amberwood |
| Dior — J'adore | Golden Ylang |
| Dior — Miss Dior Blooming Bouquet | Sweet Pea Peony |
| Louis Vuitton — Les Sables Roses (×2 baris dikirim) | Raspberry Rose |
| Creed — Aventus | Pineapple Birch |
| Versace — Eros (EDT original) | Mint Tonka |
| Maison Francis Kurkdjian — Baccarat Rouge 540 | Saffron Ambergris |
| Ex Nihilo — Blue Talisman | Pear Musk |
| Nautica — Nautica Voyage | Green Apple Lotus |
| Kayali Fragrances — Yum Pistachio Gelato \| 33 | Pistachio Gelato |
| Rabanne — 1 Million Lucky | Hazelnut Amberwood |
| Montale — Intense Cafe | Rose Espresso |
| Gucci — Gucci Bloom (2017 original) | Jasmine Sambac |
| Parfums de Marly — Pegasus | Almond Heliotrope |
| Memo Paris — Marfa | Tuberose Agave |
| Mancera — Aoud Lemon Mint | Oud Mint |
| Tom Ford — Cherry Smoke | Smoked Cherry |
| Cacharel — Amor Amor | Grapefruit Jasmine |
| Parfums de Marly — Layton Exclusif | Gardenia Coffee |
| Giorgio Armani — Sì Passione | Blackcurrant Rose |
| Versace — Eros Parfum (2021) | Litsea Mint |

Kalau user kirim link-link ini lagi di masa depan (sengaja atau tidak
sengaja terkirim ulang), cukup rujuk tabel ini — tidak perlu riset ulang.
Ini juga bisa jadi starting point kalau nanti mau bikin "katalog
kebutuhan" (daftar parfum populer yang sudah/belum direplikasi) sesuai
permintaan user.

---

## ✅ Progress Sesi #8 (2026-07-03) — Racikan Serupa

- **`src/lib/relatedProducts.ts`** (baru) — `getRelatedProducts(product,
  allProducts, count=4)`. Scoring murni dari data yang sudah ada (tidak
  ada field baru di `Product`): `+10` per family aroma yang overlap
  (pakai `accordFamily()` yang sudah ada di `accordFamily.ts`, dibandingkan
  sebagai `Set` supaya tiap family cuma dihitung sekali meski muncul di
  beberapa `mainAccords`), `+5` kalau gender cocok atau salah satunya
  Unisex, `+3` per `waktuPakai` yang overlap. Sort descending, ambil N
  teratas (exclude produk itu sendiri)
- **Section "Racikan Serupa"** ditambahkan di bawah Piramida/Main Accords
  di `produk/[slug]/page.tsx` — render 4 `ProductCard` (komponen yang
  sama persis dipakai di Katalog, tidak ada komponen baru) dari hasil
  `getRelatedProducts(product, products, 4)`. Section disembunyikan kalau
  `related.length === 0` (harusnya tidak pernah terjadi selama katalog
  masih ≥5 racikan, tapi defensif untuk masa depan)
- Alasan fitur ini: di skala 69 racikan, browsing linear katalog (infinite
  scroll) makin capek — begitu user ketemu 1 racikan yang disukai, mereka
  butuh jalan pintas ke racikan lain yang mirip tanpa balik ke katalog
- Verifikasi: `tsc --noEmit` bersih, `eslint` bersih, `next build
  --webpack` sukses 144 halaman, spot-check `apple-lavender` di preview
  browser — section muncul dengan 4 racikan woody/gourmand yang masuk
  akal (Hazelnut Amberwood, Oud Mint, Smoked Cherry, Candy Apple Leather),
  tidak ada error console

---

## 📁 Struktur File

```
Arung Perfumery/
├── CLAUDE.md                    ← file ini
├── AGENTS.md                    ← catatan Next.js version-awareness (auto)
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← font, metadata (+metadataBase!), Header+Footer wrapper
│   │   ├── page.tsx               ← Beranda (Hero + Racikan Unggulan)
│   │   ├── globals.css            ← design tokens (Tailwind v4 @theme)
│   │   ├── katalog/page.tsx       ← render KatalogGrid (filter+matcher)
│   │   ├── produk/[slug]/page.tsx ← detail produk + piramida + accords + JSON-LD
│   │   ├── produk/[slug]/opengraph-image.tsx ← OG image dinamis (sesi #4)
│   │   └── tentang/page.tsx        ← Tentang + Kontak digabung (sesi #3)
│   ├── components/
│   │   ├── Header.tsx / Footer.tsx ← NAV cuma Katalog + Tentang (sesi #3)
│   │   ├── Hero.tsx                ← client component, animasi entrance
│   │   ├── ProductCard.tsx
│   │   ├── KatalogGrid.tsx         ← client component, filter+matcher (sesi #3/#4)
│   │   ├── HargaKalkulator.tsx     ← client component, pilih ukuran+konsentrasi (sesi #6)
│   │   ├── PyramidNotes.tsx / MainAccords.tsx ← accord bar berwarna per family (sesi #3)
│   │   ├── BottleIllustration.tsx  ← SVG original, client component (useId)
│   │   ├── BrandMark.tsx           ← logo swirl mark SVG (sesi #2)
│   │   ├── PageTransition.tsx      ← animasi gold-wipe antar halaman (sesi #2)
│   │   └── Reveal.tsx              ← scroll-reveal wrapper (framer-motion)
│   └── lib/
│       ├── products.ts             ← DATA PRODUK + WHATSAPP_NUMBER + whatsappOrderUrl/whatsappGeneralUrl
│       ├── hargaKalkulator.ts      ← rumus harga per ukuran+konsentrasi (sesi #6, KONSTANTA BIAYA DI SINI)
│       ├── accordFamily.ts         ← family aroma dari mainAccords (sesi #4)
│       ├── scentMatcher.ts         ← keyword matcher untuk scent finder (sesi #4)
│       └── relatedProducts.ts      ← scoring "Racikan Serupa" di halaman detail (sesi #8)
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
`src/lib/products.ts` dengan `volumeTersedia: VOLUME_TERSEDIA_DEFAULT`
(jangan bikin array ukuran custom lagi — semua racikan wajib ukuran yang
sama: 15/20/30/50 ml, 100 ml via request). **Tidak perlu isi field harga
apapun** — sejak sesi #6, harga dihitung otomatis dari `grade` +
ukuran + konsentrasi lewat `hargaKalkulator.ts` (lihat Progress Sesi #6).

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
| Cinnamon Oud | Lattafa Perfumes — Khamrah | fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-75805.html |
| Ginger Ambroxan | Louis Vuitton — Imagination | fragrantica.com/perfume/Louis-Vuitton/Imagination-67370.html |
| Pineapple Birch | Creed — Aventus | fragrantica.com/perfume/Creed/Aventus-9828.html |
| Mint Tonka | Versace — Eros (EDT original) | fragrantica.com/perfume/Versace/Eros-16657.html |
| Plum Driftwood | Rasasi — Hawas Ice | fragrantica.com/perfume/Rasasi/Hawas-Ice-89050.html |
| Saffron Ambergris | Maison Francis Kurkdjian — Baccarat Rouge 540 | fragrantica.com/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html |
| Midnight Coffee | Yves Saint Laurent — Black Opium | fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-25324.html |
| Pear Musk | Ex Nihilo — Blue Talisman | fragrantica.com/perfume/Ex-Nihilo/Blue-Talisman-84224.html |
| Cherry Almond | Tom Ford — Lost Cherry | fragrantica.com/perfume/Tom-Ford/Lost-Cherry-51411.html |
| Green Apple Lotus | Nautica — Nautica Voyage | fragrantica.com/perfume/Nautica/Nautica-Voyage-913.html |
| Pineapple Patchouli | Nishane — Hacivat | fragrantica.com/perfume/Nishane/Hacivat-44174.html |
| Lychee Rose | Parfums de Marly — Delina | fragrantica.com/perfume/Parfums-de-Marly/Delina-43871.html |
| Apple Caramel | Afnan — 9 PM Rebel | fragrantica.com/perfume/Afnan/9-PM-Rebel-99238.html |
| Golden Ylang | Dior — J'adore | fragrantica.com/perfume/Dior/J-adore-210.html |
| Velvet Rose | Parfums de Marly — Delina Exclusif | fragrantica.com/perfume/Parfums-de-Marly/Delina-Exclusif-50370.html |
| Pistachio Gelato | Kayali Fragrances — Yum Pistachio Gelato \| 33 | fragrantica.com/perfume/Kayali-Fragrances/Yum-Pistachio-Gelato-33-79846.html |
| Pear Freesia | Jo Malone London — English Pear & Freesia | fragrantica.com/perfume/Jo-Malone-London/English-Pear-Freesia-10314.html |
| Hazelnut Amberwood | Rabanne — 1 Million Lucky | fragrantica.com/perfume/Rabanne/1-Million-Lucky-48903.html |
| Rose Espresso | Montale — Intense Cafe | fragrantica.com/perfume/Montale/Intense-Cafe-18021.html |
| Jasmine Sambac | Gucci — Gucci Bloom (2017 original) | fragrantica.com/perfume/Gucci/Gucci-Bloom-44894.html |
| Green Pepper Musk | Carolina Herrera — 212 Men | fragrantica.com/perfume/Carolina-Herrera/212-Men-297.html |
| Almond Heliotrope | Parfums de Marly — Pegasus | fragrantica.com/perfume/Parfums-de-Marly/Pegasus-16938.html |
| Sweet Pea Peony | Dior — Miss Dior Blooming Bouquet | fragrantica.com/perfume/Dior/Miss-Dior-Blooming-Bouquet-23280.html |
| Tuberose Agave | Memo Paris — Marfa | fragrantica.com/perfume/Memo-Paris/Marfa-37185.html |
| Oud Mint | Mancera — Aoud Lemon Mint | fragrantica.com/perfume/Mancera/Aoud-Lemon-Mint-39181.html |
| Sage Amberwood | Yves Saint Laurent — Y Eau de Parfum | fragrantica.com/perfume/Yves-Saint-Laurent/Y-Eau-de-Parfum-50757.html |
| Raspberry Rose | Louis Vuitton — Les Sables Roses | fragrantica.com/perfume/Louis-Vuitton/Les-Sables-Roses-55040.html |
| Smoked Cherry | Tom Ford — Cherry Smoke | fragrantica.com/perfume/Tom-Ford/Cherry-Smoke-78578.html |
| Grapefruit Jasmine | Cacharel — Amor Amor | fragrantica.com/perfume/Cacharel/Amor-Amor-238.html |
| Gardenia Coffee | Parfums de Marly — Layton Exclusif | fragrantica.com/perfume/Parfums-de-Marly/Layton-Exclusif-46633.html |
| Passionfruit Peony | Victoria's Secret — Bombshell | fragrantica.com/perfume/Victoria-s-Secret/Bombshell-10190.html |
| Blackcurrant Rose | Giorgio Armani — Sì Passione | fragrantica.com/perfume/Giorgio-Armani/Si-Passione-48002.html |
| Litsea Mint | Versace — Eros Parfum (2021) | fragrantica.com/perfume/Versace/Eros-Parfum-70090.html |
| Melon Cappuccino | Antonio Banderas — Blue Seduction (men) | fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-1088.html |
| Apple Lavender | Parfums de Marly — Layton | fragrantica.com/perfume/Parfums-de-Marly/Layton-39314.html |
| Candy Apple Leather | Versace — Eros Eau de Parfum | fragrantica.com/perfume/Versace/Eros-Eau-de-Parfum-62762.html |
| Lavender Tonka | Yves Saint Laurent — Libre Intense | fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Intense-62318.html |
| Honey Lavender | Yves Saint Laurent — Libre Le Parfum | fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Le-Parfum-75676.html |
| Grapefruit Marine | Rabanne — Invictus | fragrantica.com/perfume/Rabanne/Invictus-18471.html |
| Soap Marine | Rabanne — Invictus Parfum | fragrantica.com/perfume/Rabanne/Invictus-Parfum-90433.html |
| Absinthe Vanilla | Carolina Herrera — 212 VIP Black | fragrantica.com/perfume/Carolina-Herrera/212-VIP-Black-46093.html |
| Sea Salt Sage | Jo Malone London — Wood Sage & Sea Salt | fragrantica.com/perfume/Jo-Malone-London/Wood-Sage-Sea-Salt-25529.html |
| Petitgrain Oakmoss | Parfums de Marly — Greenley | fragrantica.com/perfume/Parfums-de-Marly/Greenley-62101.html |
| Saffron Rose | Mancera — Instant Crush | fragrantica.com/perfume/Mancera/Instant-Crush-54885.html |
| Grapefruit Incense | Chanel — Bleu de Chanel (EDT 2010) | fragrantica.com/perfume/Chanel/Bleu-de-Chanel-9099.html |
| Magnolia Clove | Moschino — Toy Boy | fragrantica.com/perfume/Moschino/Toy-Boy-55858.html |
| Passionfruit Heliotrope | Tiziana Terenzi — Kirke | fragrantica.com/perfume/Tiziana-Terenzi/Kirke-32172.html |
| Violet Patchouli | Yves Saint Laurent — Tuxedo | fragrantica.com/perfume/Yves-Saint-Laurent/Tuxedo-32269.html |
| Sweet Oud | Lattafa Perfumes — Ameer Al Oudh Intense Oud | fragrantica.com/perfume/Lattafa-Perfumes/Ameer-Al-Oudh-Intense-Oud-64947.html |
| Almond Lotus | Parfums de Marly — Valaya Exclusif | fragrantica.com/perfume/Parfums-de-Marly/Valaya-Exclusif-102806.html |
| Strawberry Peony | Yves Saint Laurent — Mon Paris | fragrantica.com/perfume/Yves-Saint-Laurent/Mon-Paris-38914.html |
| Honey Gardenia | Jean Paul Gaultier — Scandal (women) | fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-45651.html |
| Mirabelle Freesia | Chloé — Nomade | fragrantica.com/perfume/Chloe/Nomade-48434.html |
| Salty Vanilla | Rabanne — Olympea (original 2015) | fragrantica.com/perfume/Rabanne/Olympea-31666.html |
| Raspberry Leather | Tom Ford — Tuscan Leather | fragrantica.com/perfume/Tom-Ford/Tuscan-Leather-1849.html |
| Sparkling Lychee | Kayali Fragrances — Eden Sparkling Lychee \| 39 | fragrantica.com/perfume/Kayali-Fragrances/Eden-Sparkling-Lychee-39-Eau-de-Parfum-88197.html |
| Violet Tobacco | Tom Ford — Ombré Leather Parfum | fragrantica.com/perfume/Tom-Ford/Ombre-Leather-Parfum-68716.html |
| Bluebell Persimmon | Jo Malone London — Wild Bluebell (original 2011) | fragrantica.com/perfume/Jo-Malone-London/Wild-Bluebell-12310.html |
| Saffron Vetiver | Byredo — Black Saffron | fragrantica.com/perfume/Byredo/Black-Saffron-16220.html |
| Passion Vanilla | Lancôme — Hypnose | fragrantica.com/perfume/Lancome/Hypnose-170.html |

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
- `WHATSAPP_NUMBER` sudah nomor asli (`628990447098`, lokal 0899-044-7098)
  — kalau ganti, edit di `src/lib/products.ts`, dua fungsi order URL ikut
  otomatis. **Selalu konfirmasi ulang ke user kalau dapat nomor baru**
  sebelum ganti — pernah kejadian salah ketik satu digit di sesi #2
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
- **BELUM DIINVESTIGASI**: user pernah screenshot console browser di situs
  live nunjukkin banyak error 404 buat file `_next/...` (chunk/prefetch)
  di beberapa halaman produk & `/katalog`, `/tentang`. Dugaan awal: Next.js
  App Router prefetch `<Link>` bawaan nyoba fetch RSC payload yang
  strukturnya beda di static export vs server biasa. Situsnya kelihatannya
  tetap jalan normal (prefetch gagal biasanya fallback ke full navigation
  saat diklik beneran), tapi belum dicek detail lewat Network tab —
  next session sebaiknya cek ini kalau user laporan lagi atau sebelum
  situs dianggap "selesai"
- **Git push di sesi ini beberapa kali macet** butuh re-auth GitHub
  interaktif (`git-credential-manager` minta popup sign-in browser,
  `GIT_TERMINAL_PROMPT=0` doang tidak selalu cukup) — kalau macet lagi,
  minta user cek popup di layar mereka, retry setelah itu biasanya
  langsung jalan. `GIT_TERMINAL_PROMPT=0` tetap dipakai supaya command
  gagal cepat/jelas daripada hang tanpa output kalau kredensial expired
