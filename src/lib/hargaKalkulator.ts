import type { Product } from "@/lib/products";

export type Konsentrasi = "Cologne" | "EDT" | "EDP" | "Extrait";

export const KONSENTRASI_LIST: Konsentrasi[] = ["Cologne", "EDT", "EDP", "Extrait"];

export const KONSENTRASI_DESKRIPSI: Record<Konsentrasi, string> = {
  Cologne: "Ringan & segar",
  EDT: "Casual harian",
  EDP: "Tahan 6–8 jam",
  Extrait: "Intens & tahan lama",
};

// Persentase fragrance oil per konsentrasi, mengikuti formula kalkulator racik
// internal (project Parfumary) — bukan angka asal, ini rumus yang sudah dipakai
// buat racik beneran.
const PERSEN_BIBIT: Record<Product["grade"], Record<Konsentrasi, number>> = {
  Premium: { Cologne: 8, EDT: 13, EDP: 20, Extrait: 30 },
  Medium: { Cologne: 12, EDT: 19, EDP: 29, Extrait: 44 },
};

// Asumsi biaya bahan — dari default kalkulator Parfumary (titik tengah rentang
// harga bahan riil), BUKAN harga bahan aktual per merk. Kalau biaya riil beda,
// cukup ubah konstanta di sini — tidak perlu ubah komponen manapun.
const BIBIT_PER_ML: Record<Product["grade"], number> = {
  Premium: 1500, // Rp150.000 / 100ml
  Medium: 1125, // Rp112.500 / 100ml
};
const BOOSTER_PERSEN_DARI_BIBIT = 0.01; // 1% dari volume bibit
const BOOSTER_PER_ML = 10000; // Rp100.000 / 10ml
const PELARUT_PER_ML = 135;
const BOTOL_POLOS = 7000;

export function hitungBiayaProduksi(
  volumeMl: number,
  grade: Product["grade"],
  konsentrasi: Konsentrasi
) {
  const persen = PERSEN_BIBIT[grade][konsentrasi];
  const bibitMl = (volumeMl * persen) / 100;
  const boosterMl = bibitMl * BOOSTER_PERSEN_DARI_BIBIT;
  const pelarutMl = volumeMl - bibitMl - boosterMl;

  const bibitCost = bibitMl * BIBIT_PER_ML[grade];
  const boosterCost = boosterMl * BOOSTER_PER_ML;
  const pelarutCost = pelarutMl * PELARUT_PER_ML;

  return bibitCost + boosterCost + pelarutCost + BOTOL_POLOS;
}

export interface RangeHarga {
  biayaProduksi: number;
  low: number;
  high: number;
}

// Bulatkan biaya produksi ke atas, ke kelipatan ~10%-nya, lalu tampilkan sebagai
// range [dibulatkan, +1 kelipatan] — bukan satu angka pasti, supaya ada buffer
// margin tanpa perlu hitung ulang tiap kali biaya bahan naik-turun sedikit.
export function hitungRangeHarga(
  volumeMl: number,
  grade: Product["grade"],
  konsentrasi: Konsentrasi
): RangeHarga {
  const biayaProduksi = hitungBiayaProduksi(volumeMl, grade, konsentrasi);
  const step = Math.max(1000, Math.round((biayaProduksi * 0.1) / 1000) * 1000);
  const low = Math.ceil(biayaProduksi / step) * step;
  const high = low + step;
  return { biayaProduksi, low, high };
}

export function formatRupiah(n: number) {
  return `Rp${Math.round(n).toLocaleString("id-ID")}`;
}

// Harga "mulai dari" buat ProductCard/katalog — ukuran terkecil + konsentrasi
// termurah yang tersedia untuk produk ini.
export function hargaTermurah(product: Pick<Product, "volumeTersedia" | "grade">): RangeHarga {
  const volMin = Math.min(...product.volumeTersedia);
  return hitungRangeHarga(volMin, product.grade, "Cologne");
}
