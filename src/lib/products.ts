export interface Note {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Accord {
  nama: string;
  persen: number;
}

export interface Product {
  slug: string;
  nama: string;
  grade: "Premium" | "Medium";
  hargaMulai: number;
  volumeTersedia: number[];
  ringkasan: string;
  deskripsi: string;
  notes: Note;
  mainAccords: Accord[];
  fragranticaUrl?: string;
  bottleColor: string;
}

export const WHATSAPP_NUMBER = "6281234567890";

export function whatsappOrderUrl(namaProduk: string) {
  const pesan = `Halo, saya mau tanya/pesan racikan "${namaProduk}" dari Arung Wangi.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const products: Product[] = [
  {
    slug: "gilded-noir",
    nama: "Gilded Noir",
    grade: "Premium",
    hargaMulai: 85000,
    volumeTersedia: [15, 30, 50],
    ringkasan: "Hangat, manis, dengan sentuhan kopi dan amber yang membekas lama.",
    deskripsi:
      "Racikan gourmand hangat yang membuka dengan kopi dan jasmine, mengalir ke vanilla dan karamel di tengah, lalu mengendap jadi amber-musk yang tahan lama. Cocok dipakai malam hari atau cuaca dingin.",
    notes: {
      top: ["Kopi", "Anggrek", "Jasmine"],
      middle: ["Vanilla", "Susu", "Tonka Bean", "Karamel"],
      base: ["Amber", "Patchouli", "Musk"],
    },
    mainAccords: [
      { nama: "Vanilla", persen: 95 },
      { nama: "Manis", persen: 80 },
      { nama: "Amber", persen: 72 },
      { nama: "Lactonic", persen: 55 },
      { nama: "Karamel", persen: 50 },
      { nama: "Rempah Hangat", persen: 45 },
      { nama: "Kopi", persen: 40 },
      { nama: "Powdery", persen: 30 },
      { nama: "Balsamic", persen: 25 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/",
    bottleColor: "#3f2d1c",
  },
  {
    slug: "velvet-santal",
    nama: "Velvet Santal",
    grade: "Premium",
    hargaMulai: 90000,
    volumeTersedia: [15, 30, 50],
    ringkasan: "Kayu cendana lembut berpadu bunga putih dan sedikit rempah.",
    deskripsi:
      "Woody floral yang tenang — cendana lembut sebagai inti, dibalut bunga putih dan sentuhan rempah halus di pembukaan. Elegan untuk dipakai sehari-hari maupun acara formal.",
    notes: {
      top: ["Bergamot", "Kardamom"],
      middle: ["Cendana", "Melati", "Iris"],
      base: ["Musk Putih", "Cedar", "Vanilla"],
    },
    mainAccords: [
      { nama: "Woody", persen: 90 },
      { nama: "Floral Putih", persen: 65 },
      { nama: "Musky", persen: 55 },
      { nama: "Creamy", persen: 48 },
      { nama: "Rempah", persen: 30 },
    ],
    bottleColor: "#5c4a2e",
  },
  {
    slug: "azure-neroli",
    nama: "Azure Neroli",
    grade: "Medium",
    hargaMulai: 55000,
    volumeTersedia: [15, 30],
    ringkasan: "Segar, citrus-aquatic — cocok dipakai harian dan cuaca panas.",
    deskripsi:
      "Fresh citrus-aquatic dengan neroli sebagai jantung aroma. Ringan, mudah dipakai harian, cocok untuk aktivitas outdoor maupun kantor.",
    notes: {
      top: ["Bergamot", "Lemon", "Grapefruit"],
      middle: ["Neroli", "Melati Air", "Mint"],
      base: ["Musk", "Cedar Ringan"],
    },
    mainAccords: [
      { nama: "Citrus", persen: 88 },
      { nama: "Aquatic", persen: 70 },
      { nama: "Fresh", persen: 65 },
      { nama: "Floral", persen: 35 },
      { nama: "Musky", persen: 25 },
    ],
    bottleColor: "#1e5a63",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
