# Halaman Pencarian Referensi Racikan (Internal) — Desain

> Status: disetujui user, siap masuk implementation plan.

## Latar Belakang

Toko "Arung Wangi" menjual racikan parfum yang masing-masing terinspirasi
dari parfum brand asli (mis. "Iris Amber" terinspirasi dari SAFF & Co. —
Solaris). Mapping ini **sengaja tidak pernah ditampilkan di UI publik**
(`products.ts`) — menyebut nama brand asli di halaman produk berisiko
dibaca sebagai klaim tiruan/afiliasi (masalah merek dagang), karena
racikan ini bukan produk resmi brand manapun.

Saat ini mapping itu cuma tersimpan sebagai tabel markdown 69 baris di
`CLAUDE.md` (bagian "Daftar Referensi Racikan"). Ketika pesanan WhatsApp
masuk (mis. "saya mau pesan racikan Iris Amber"), pemilik toko perlu tahu
cepat itu niru bibit/formula parfum apa supaya bisa siapkan racikannya —
tapi buka `CLAUDE.md` manual dari HP tidak praktis.

## Keputusan Desain

1. **Level privasi**: URL tersembunyi saja, tanpa password/login. Halaman
   ada di domain yang sama (`arung-parfumary.pages.dev/internal/...`),
   tidak ditaut dari navigasi/sitemap/robots — tidak muncul di Google,
   tapi siapapun yang tahu URL persis tetap bisa buka. Ini bukan
   keamanan sungguhan (situs murni static export, tanpa server/auth),
   cuma mengurangi risiko penemuan tidak sengaja. Dikonfirmasi user
   (bukan Cloudflare Access, bukan password client-side).
2. **Route**: `src/app/internal/referensi-racikan/page.tsx` →
   `/internal/referensi-racikan`.
3. **Bentuk UI**: tabel lengkap (semua 69 racikan) + satu kotak
   pencarian di atas yang menyaring baris secara real-time (client-side,
   tanpa fetch). Kolom: Nama Racikan | Brand & Parfum Asli | link
   Fragrantica. Pencarian mencocokkan substring (case-insensitive) ke
   `racikanNama`, `referensiBrand`, atau `referensiParfum` — cukup ketik
   sebagian nama racikan ATAU nama brand asli untuk menemukan barisnya.
4. **Sumber data**: file baru `src/lib/referensiRacikan.ts`, array
   TypeScript berisi 69 entri `{ racikanNama, referensiBrand,
   referensiParfum, fragranticaUrl }`. Ini jadi **satu-satunya sumber
   data** — tabel markdown besar di `CLAUDE.md` diringkas jadi rujukan
   singkat ke file ini (lihat bagian Dokumentasi di bawah). Field
   `racikanNama` harus persis sama dengan `Product.nama` di
   `products.ts` untuk racikan yang sama (referensi manual by-name,
   tidak ada foreign-key runtime — dataset kecil, 69 baris, cukup
   dicek visual saat nambah racikan baru).
5. **Layout**: pakai `Header`/`Footer`/`PageTransition` situs seperti
   halaman lain (lewat root `layout.tsx`, tidak perlu layout terpisah)
   — halaman ini tidak ditaut dari navigasi manapun, jadi kehadiran
   Header standar tidak membocorkan apapun, cuma menjaga konsistensi
   chrome situs.
6. **Exclusion dari permukaan publik**:
   - Tidak ditambahkan ke `NAV` di `Header.tsx`
   - Tidak ditambahkan ke `src/app/sitemap.ts` (otomatis ter-exclude,
     cukup tidak menambahkannya di sana)
   - Tambah baris `Disallow: /internal/` ke rules di `src/app/robots.ts`
     sebagai lapisan tambahan (defense-in-depth, bukan pengganti "tidak
     ditaut")
   - Tambah `export const metadata: Metadata = { robots: { index: false,
     follow: false } }` di halaman itu sendiri — sinyal eksplisit ke
     crawler yang somehow menemukan halamannya

## Komponen & File yang Berubah

- `src/lib/referensiRacikan.ts` (baru) — data + interface
  `ReferensiRacikan { racikanNama: string; referensiBrand: string;
  referensiParfum: string; fragranticaUrl: string }`, export
  `referensiRacikan: ReferensiRacikan[]` (69 entri, dipindah dari tabel
  CLAUDE.md yang sudah ada)
- `src/app/internal/referensi-racikan/page.tsx` (baru) — server component
  tipis yang cuma import data + render client component pencarian (pola
  sama seperti `katalog/page.tsx` yang cuma passing `products` ke
  `KatalogGrid`)
- `src/components/ReferensiRacikanTable.tsx` (baru, client component) —
  `useState` untuk query, filter array secara real-time, render tabel
  hasil filter. Tampilkan pesan kalau `query` tidak match apapun (pola
  sama seperti `queryHasNoMatch` di `KatalogGrid.tsx`)
- `src/app/robots.ts` — tambah `disallow: "/internal/"` ke rules yang
  sudah ada
- `CLAUDE.md` — bagian "Daftar Referensi Racikan" (69 baris tabel)
  diganti jadi paragraf singkat yang merujuk ke
  `src/lib/referensiRacikan.ts` sebagai satu-satunya sumber data.
  Instruksi "Alur Konten Produk Baru" diupdate: nambah racikan baru
  sekarang juga wajib menambah satu entri ke
  `src/lib/referensiRacikan.ts` (bukan lagi ke tabel markdown)

## Testing / Verifikasi

- `tsc --noEmit` dan `eslint` bersih
- Jumlah entri di `referensiRacikan.ts` = 69, cocok dengan jumlah
  produk di `products.ts` (cek manual/script Node, sama seperti
  verifikasi jumlah slug produk yang sudah biasa dilakukan)
- Browser check (preview tool): buka `/internal/referensi-racikan`,
  tabel tampil 69 baris; ketik nama racikan (mis. "Iris Amber") →
  hasil tersaring ke baris yang cocok; ketik nama brand asli (mis.
  "Rasasi") → tetap ketemu barisnya; ketik sesuatu yang tidak ada →
  pesan "tidak ditemukan"
- Cek halaman ini **tidak muncul** di `Header` (snapshot nav tidak
  berubah), **tidak muncul** di `out/sitemap.xml` setelah build, dan
  `out/robots.txt` memuat baris `Disallow: /internal/`
- `next build --webpack` tetap sukses (halaman baru ini menambah 1
  route statis ke hitungan total)
