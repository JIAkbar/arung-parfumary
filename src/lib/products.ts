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

export const WHATSAPP_NUMBER = "6289900447098";

// Harga mulai seragam untuk semua racikan
export const HARGA_MULAI_DEFAULT = 20000;

export function whatsappOrderUrl(namaProduk: string) {
  const pesan = [
    `Halo Arung Wangi, saya mau pesan racikan *${namaProduk}*.`,
    "",
    "Format pesanan saya:",
    "Nama:",
    "Ukuran (ml):",
    "Jumlah:",
    "Alamat:",
    "",
    "Mohon info total harga & cara pembayarannya. Terima kasih!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export function whatsappGeneralUrl() {
  const pesan = [
    "Halo Arung Wangi, saya mau tanya-tanya / pesan racikan.",
    "",
    "Format pesanan saya:",
    "Nama:",
    "Racikan yang diminati:",
    "Ukuran (ml):",
    "Jumlah:",
    "Alamat:",
    "",
    "Terima kasih!",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
}

export const products: Product[] = [
  {
    slug: "gilded-noir",
    nama: "Gilded Noir",
    grade: "Premium",
    hargaMulai: HARGA_MULAI_DEFAULT,
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
    hargaMulai: HARGA_MULAI_DEFAULT,
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
    hargaMulai: HARGA_MULAI_DEFAULT,
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
  {
    slug: "verdant-fig",
    nama: "Verdant Fig",
    grade: "Premium",
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: [15, 30, 50],
    ringkasan: "Hijau, earthy, dan sedikit smoky — seperti hutan basah selepas hujan.",
    deskripsi:
      "Racikan woody-aromatic yang membuka dengan buah ara hijau dan teh matcha, diselingi asap kemenyan dan kayu manis halus. Di tengah, cashmere wood dan jeruk memberi sentuhan creamy-citrus sebelum turun ke vetiver, cendana, dan cedar yang earthy — mengingatkan pada tanah basah dan dedaunan setelah hujan. Cocok untuk yang suka aroma tenang, natural, dan tidak terlalu manis.",
    notes: {
      top: ["Kemenyan", "Kayu Manis", "Teh Matcha", "Bergamot", "Buah Ara"],
      middle: ["Orcanox", "Cashmere Wood", "Jeruk"],
      base: ["Vetiver", "Cedar", "Cendana"],
    },
    mainAccords: [
      { nama: "Woody", persen: 88 },
      { nama: "Earthy", persen: 72 },
      { nama: "Green", persen: 60 },
      { nama: "Smoky", persen: 45 },
      { nama: "Milky", persen: 35 },
      { nama: "Citrus", persen: 28 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Down-to-Earth-120471.html",
    bottleColor: "#3d4a2f",
  },
  {
    slug: "rose-bergamot",
    nama: "Rosé Bergamot",
    grade: "Premium",
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: [15, 30, 50],
    ringkasan: "Citrus cerah bertemu mawar dan buah-buahan — mewah ala French Riviera.",
    deskripsi:
      "Dibuka dengan bergamot, jeruk, dan lemon yang segar, racikan ini mengalir ke jantung mawar yang dipadukan aprikot, raspberry, dan plum — manis tapi tidak berlebihan. Ambrette memberi kesan bersih sebelum mengendap di cedar, vetiver, amber, dan musk yang hangat. Cocok dipakai siang ke malam, untuk yang suka kesan glamor tanpa terlalu berat.",
    notes: {
      top: ["Bergamot", "Jeruk", "Melati", "Lemon"],
      middle: ["Mawar", "Aprikot", "Raspberry", "Ambrette", "Plum"],
      base: ["Cedar", "Vetiver", "Amber", "Musk"],
    },
    mainAccords: [
      { nama: "Floral", persen: 85 },
      { nama: "Fruity", persen: 70 },
      { nama: "Citrus", persen: 62 },
      { nama: "Musky", persen: 40 },
      { nama: "Woody", persen: 32 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Monaco-Royale-121113.html",
    bottleColor: "#a8586b",
  },
  {
    slug: "praline-tonka",
    nama: "Praline Tonka",
    grade: "Medium",
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: [15, 30],
    ringkasan: "Manis creamy seperti tiramisu, dengan kopi yang muncul samar di baliknya.",
    deskripsi:
      "Gourmand manis yang membuka dengan aroma kopi lembut berpadu anggrek dan melati, lalu mengalir ke vanilla-susu yang creamy dan karamel — mengingatkan pada tiramisu segar. Amber, patchouli, dan musk di dasar memberi sedikit kehangatan tanpa menutupi kesan manis-milky-nya. Lebih ringan dan playful dibanding Gilded Noir, cocok dipakai harian untuk yang suka wangi manis.",
    notes: {
      top: ["Kopi", "Anggrek", "Melati"],
      middle: ["Vanilla", "Susu", "Tonka Bean", "Karamel"],
      base: ["Amber", "Patchouli", "Musk"],
    },
    mainAccords: [
      { nama: "Sweet", persen: 90 },
      { nama: "Vanilla", persen: 82 },
      { nama: "Milky", persen: 68 },
      { nama: "Coffee", persen: 45 },
      { nama: "Caramel", persen: 40 },
      { nama: "Musky", persen: 30 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Cafe-Drops-120463.html",
    bottleColor: "#a67c4a",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
