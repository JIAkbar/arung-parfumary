# Arung Wangi — Redesign Navbar, Logo, Tema, Animasi Transisi

Status: Disetujui (fondasi Opsi B + transisi & logo dari Opsi C)
Tanggal: 2026-07-03

## Latar Belakang

Tema gold/krem yang ada sudah sesuai arah brand, tapi navbar, logo (masih teks polos
"Arung Wangi" tanpa mark), dan perpindahan antar halaman terasa datar/biasa. Tiga arah
visual dipresentasikan (lihat pitch artifact sesi ini: Gilded Noir / Warm Parchment
Refined / Cinematic Hybrid). User memilih kombinasi:

- **Fondasi tema & navbar: Opsi B (Warm Parchment, Refined)** — tetap krem, risiko
  paling rendah untuk kontinuitas brand yang sudah dikenal pelanggan.
- **Logo: mark dari Opsi C** — simbol swirl abstrak (jejak aroma), bukan monogram
  inisial "AW" dari Opsi B, dan bukan belah ketupat dari Opsi A.
- **Animasi transisi halaman: signature gold-wipe dari Opsi C** — bilah emas tipis
  menyapu layar saat pindah rute.

Item yang sudah selesai di luar spec ini (sudah live, tidak perlu direncanakan ulang):
nomor WhatsApp (`0899-0044-7098`), format pesan WA terstruktur, penghapusan Instagram
dari footer/kontak.

## Palet & Token Warna

Perbarui token di `src/app/globals.css`. Tetap keluarga krem/gold, tapi digeser ke
brass/ochre supaya tidak terbaca sebagai "cream + terracotta" generik:

| Token | Lama | Baru | Catatan |
|---|---|---|---|
| `--background` | `#faf9f7` | `#f7f1e4` | parchment lebih hangat |
| `--surface` | `#ffffff` | `#fffdf8` | kartu/panel |
| `--foreground` | `#0c0a09` | `#26201a` | ink hangat, bukan hitam pekat |
| `--ink-muted` | `#57534e` | `#6f6355` | |
| `--border` | `#e7e2da` | `#e6dcc8` | |
| `--gold` | `#a16207` | `#9c6a2b` | brass/antique, bukan oranye |
| `--gold-light` | `#c9a24b` | `#c79a49` | |

Tambahan token baru: `--gold-hairline` (`rgba(156,106,43,0.35)`) untuk garis tipis di
navbar/divider, dan `--texture-line` (`rgba(156,106,43,0.035)`) untuk tekstur linen
halus di background hero (`repeating-linear-gradient`, sangat subtle, tidak boleh
mengganggu keterbacaan teks).

Tipografi tidak berubah: Playfair Display (heading) + Inter (body) tetap dipakai.

## Navbar (`src/components/Header.tsx`)

- Tetap sticky, background krem (`--background`) dengan `backdrop-blur`.
- Tambah garis bawah tipis 1px pakai `--gold-hairline` (ganti `border-border` polos).
- Hover/active state link: titik emas kecil (3px) muncul & bergeser masuk di depan
  label (transisi ~0.2s), warna teks berubah ke `--gold`.
- Logo di kiri: swirl mark (lihat bawah) + wordmark "Arung Wangi", warna swirl pakai
  `--gold`.

## Logo (baru: `src/components/BrandMark.tsx`)

Komponen SVG kecil (ukuran ~20–24px), mark abstrak garis lengkung tunggal (bukan huruf,
bukan bentuk bunga generik) merepresentasikan jejak aroma — sesuai konsep swirl di
Opsi C, tapi di-render dengan warna brass (`--gold`) supaya cocok di atas navbar krem
(bukan versi terang di atas gelap seperti mockup C semula).

- Dipakai di `Header.tsx` (kiri, sebelum wordmark) dan `Footer.tsx` (opsional, kecil,
  di samping "Arung Wangi").
- Tidak membuat favicon/app-icon baru di spec ini — di luar cakupan, bisa jadi task
  terpisah nanti kalau dibutuhkan.
- Tetap SVG inline sederhana (2–3 path/stroke), konsisten dengan pendekatan
  `BottleIllustration.tsx` yang sudah ada (bukan foto/asset eksternal).

## Animasi Transisi Halaman (gold-wipe)

Komponen baru `src/components/PageTransition.tsx` (client component), dipasang di
`layout.tsx` membungkus `{children}`:

- Pakai `framer-motion` `AnimatePresence` + `usePathname()` sebagai key, supaya trigger
  di setiap pindah rute (App Router).
- Overlay full-bleed (menutup seluruh viewport, bukan cuma bar tipis) menyapu dari kiri
  ke kanan lalu keluar layar — sesuai demo di pitch artifact — durasi total ±500–650ms,
  easing signature yang sudah dipakai di `Reveal.tsx` (`[0.22, 1, 0.36, 1]`) untuk
  konsistensi rasa gerak.
- Konten halaman baru fade-in ringan setelah overlay lewat tengah, bukan muncul
  mendadak.
- **Wajib** cek `useReducedMotion()` — kalau aktif, skip overlay sepenuhnya, langsung
  ganti halaman tanpa animasi (tidak sekadar mempercepat).
- `Reveal.tsx` (scroll-reveal per elemen) tidak berubah — dua animasi ini independen
  (transisi rute vs reveal saat scroll).

## Navbar Mobile (belum ada sama sekali saat ini)

`Header.tsx` saat ini tidak punya breakpoint mobile — nav links akan padat/pecah di
layar sempit. Tambahkan:

- Hamburger button muncul di bawah breakpoint `sm` (640px, skala default Tailwind v4
  yang sudah dipakai proyek), nav links desktop disembunyikan di lebar sempit.
- Interaksi: panel turun dari navbar (bukan drawer full-screen) — konsisten dengan
  gaya "Opsi B" yang tenang, bukan gaya dramatis Opsi A/C. Item nav dipisah garis emas
  tipis, tap area cukup besar untuk mobile (≥44px tinggi per item).
- Implementasi mengikuti panduan skill `ui-ux-pro-max` untuk pola navbar
  mobile-responsive & aksesibilitas (aria-expanded, focus trap ringan, keyboard close
  dengan Escape).

## File yang Terdampak

- `src/app/globals.css` — token warna baru
- `src/components/Header.tsx` — navbar redesign + mobile menu + logo
- `src/components/Footer.tsx` — logo kecil opsional, warna ikut token baru
- `src/components/BrandMark.tsx` — baru, swirl logo SVG
- `src/components/PageTransition.tsx` — baru, gold-wipe transition
- `src/app/layout.tsx` — pasang `PageTransition` membungkus `children`

## Di Luar Cakupan

- Opsi A (Gilded Noir) dan versi penuh Opsi C (hero gelap di tiap halaman) — tidak
  dipakai, hanya elemen logo & transisi dari C yang diambil.
- Foto produk asli — tetap pakai `BottleIllustration.tsx` SVG.
- Favicon/app-icon baru dari swirl mark.
- Checkout/payment gateway (sudah dinyatakan di luar scope proyek sejak awal).

## Kriteria Sukses

- Navbar tampil rapi di lebar 375px (mobile kecil) sampai desktop, tidak ada elemen
  terpotong/overflow horizontal.
- Menu mobile bisa dibuka/tutup, dapat dinavigasi keyboard, tertutup otomatis saat
  link diklik atau `Escape` ditekan.
- Logo swirl + wordmark tampil konsisten di semua halaman (Header) dan tidak pecah di
  layar kecil.
- Transisi gold-wipe terlihat saat pindah antar halaman (Beranda → Katalog → Detail
  Produk → Tentang → Kontak), halus, dan otomatis nonaktif saat
  `prefers-reduced-motion: reduce`.
- Tidak ada regresi: link WhatsApp, format pesan, dan penghapusan Instagram (dari sesi
  sebelumnya) tetap berfungsi seperti semula.
