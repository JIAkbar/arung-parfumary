# Gerbang Pilih Varian Sebelum WhatsApp — Desain

> Status: disetujui user, siap masuk implementation plan.

## Latar Belakang

Di halaman detail produk (`src/app/produk/[slug]/page.tsx`, komponen
`HargaKalkulator.tsx`), tombol "Pesan via WhatsApp" saat ini bisa diklik
kapan saja — termasuk sebelum user memilih ukuran botol (15/20/30/50 ml).
Kalau diklik dalam kondisi itu, pesan WA yang terkirim pakai format
placeholder kosong (`whatsappOrderUrl(product.nama)` tanpa `OrderDetail`),
bukan detail pesanan yang jelas.

User minta: WA di halaman produk hanya boleh terbuka **setelah** user
memilih ukuran (konsentrasi otomatis valid begitu ukuran dipilih, karena
sudah ada default "EDP" — lihat Keputusan di bawah). Kalau user coba klik
WA sebelum itu, tampilkan modal peringatan alih-alih langsung membuka
WhatsApp.

Sekalian, user minta tombol WhatsApp di Footer **dihapus total** (bukan
disembunyikan) — WA di halaman Tentang **tetap dibiarkan** seperti
sekarang (langsung buka WA, tanpa gerbang), karena itu kontak umum, bukan
pesan produk.

## Keputusan Desain

1. **Kondisi gerbang**: hanya `volume === null` (state `dipilih` yang
   sudah ada di `HargaKalkulator.tsx`). Begitu ukuran dipilih, konsentrasi
   otomatis ke-default "EDP" tanpa perlu user tap eksplisit — ini dianggap
   cukup valid (dikonfirmasi user, prioritaskan sedikit friksi).
2. **Perilaku tombol saat belum dipilih**: elemen "Pesan via WhatsApp"
   tetap tampil identik (pill emas, tidak terlihat disabled/abu-abu) —
   supaya user tetap mau coba klik dan baru ketemu peringatannya di situ.
   Bedanya, elemen ini jadi `<button type="button">` yang membuka modal,
   bukan `<a href>` yang langsung navigasi.
3. **Perilaku tombol setelah dipilih**: tidak berubah — tetap `<a
   href={whatsappOrderUrl(product.nama, { volumeMl, konsentrasi,
   hargaText })}>` seperti sekarang.
4. **Isi modal**: judul singkat + satu kalimat penjelasan ("Pilih ukuran
   dulu ya, supaya kami bisa kasih estimasi harga yang pas") + satu tombol
   "Oke, saya pilih dulu" yang menutup modal. Tidak ada pilihan ukuran di
   dalam modal — user kembali sendiri ke pilihan ukuran yang sudah
   terlihat di halaman.
5. **Cara tutup modal**: klik tombol "Oke, saya pilih dulu", klik area
   backdrop di luar kartu, atau tekan `Escape` — pola sama seperti
   `FilterDropdown` di `KatalogGrid.tsx` (listener `mousedown` +
   `keydown` di `useEffect`, cleanup saat unmount/close).
6. **Gaya visual modal**: konsisten dengan tema situs — backdrop
   `bg-black/40`, kartu `rounded-2xl border border-gold-hairline
   bg-background` (atau `bg-surface`), tipografi sama seperti card/section
   lain (`font-serif` untuk judul, `text-ink-muted` untuk body).
7. **Footer**: blok `<a href={whatsappGeneralUrl()}>WhatsApp</a>` di
   `Footer.tsx` dihapus total. Layout footer disederhanakan — baris
   `flex ... justify-between` yang tadinya berisi brand mark + link WA
   disederhanakan jadi cuma brand mark (tidak ada lagi elemen kedua untuk
   di-`justify-between`-kan).
8. **Halaman Tentang**: tidak disentuh sama sekali — WA di sana tetap
   `<a href={whatsappGeneralUrl()}>` langsung seperti sekarang.

## Komponen & File yang Berubah

- `src/components/HargaKalkulator.tsx` — tambah `useState` untuk
  `showVarianWarning`, ganti elemen WA (cabang `!dipilih`) dari `<a>` jadi
  `<button onClick={() => setShowVarianWarning(true)}>`, tambah render
  modal peringatan (subkomponen lokal di file yang sama, mengikuti pola
  `FilterDropdown` yang hidup di dalam `KatalogGrid.tsx` — tidak perlu
  file/komponen modal generik terpisah karena baru ada satu use case ini)
- `src/components/Footer.tsx` — hapus import `whatsappGeneralUrl` (kalau
  jadi tidak dipakai) dan blok `<a>` WhatsApp, sederhanakan layout flex
- `src/app/tentang/page.tsx` — **tidak ada perubahan**

## Testing / Verifikasi

- `tsc --noEmit` dan `eslint` bersih
- Browser check (preview tool): di halaman produk manapun, klik WA
  sebelum pilih ukuran → modal muncul, tidak ada tab WhatsApp baru
  terbuka; pilih ukuran → tombol WA jadi link asli dengan detail lengkap
  (cek `href` mengandung `volumeMl`/`konsentrasi`); modal bisa ditutup
  lewat tombol, klik backdrop, dan `Escape`
- Cek halaman Footer (misal render di halaman Beranda) tidak lagi ada
  teks/link "WhatsApp"
- Cek halaman Tentang — WA tetap langsung `<a href>` seperti sebelumnya,
  tidak ada modal
- `next build --webpack` tetap sukses generate semua halaman statis
