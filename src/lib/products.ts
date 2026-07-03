export interface Note {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Accord {
  nama: string;
  persen: number;
}

export type Gender = "Pria" | "Wanita" | "Unisex";
export type WaktuPakai = "Pagi" | "Siang" | "Sore" | "Malam";

export interface Product {
  slug: string;
  nama: string;
  grade: "Premium" | "Medium";
  gender: Gender;
  waktuPakai: WaktuPakai[];
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

// Ukuran botol seragam untuk semua racikan. 100ml tidak dijual reguler,
// tapi bisa direquest lewat WhatsApp (lihat VOLUME_REQUEST di halaman produk).
export const VOLUME_TERSEDIA_DEFAULT = [15, 20, 30, 50];
export const VOLUME_REQUEST = 100;

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
    slug: "verdant-fig",
    nama: "Verdant Fig",
    grade: "Premium",
    gender: "Unisex",
    waktuPakai: ["Sore", "Malam"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
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
    gender: "Unisex",
    waktuPakai: ["Siang", "Sore"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
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
    gender: "Unisex",
    waktuPakai: ["Pagi", "Siang"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Manis creamy seperti tiramisu, dengan kopi yang muncul samar di baliknya.",
    deskripsi:
      "Gourmand manis yang membuka dengan aroma kopi lembut berpadu anggrek dan melati, lalu mengalir ke vanilla-susu yang creamy dan karamel — mengingatkan pada tiramisu segar. Amber, patchouli, dan musk di dasar memberi sedikit kehangatan tanpa menutupi kesan manis-milky-nya. Ringan dan playful, cocok dipakai harian untuk yang suka wangi manis.",
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
  {
    slug: "iris-amber",
    nama: "Iris Amber",
    grade: "Premium",
    gender: "Unisex",
    waktuPakai: ["Siang", "Sore"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Floral-woody lembut dengan sentuhan bedak — elegan dan tenang.",
    deskripsi:
      "Racikan floral-woody-musk yang membuka dengan mandarin dan daun violet segar, mengalir ke jantung iris berbedak dan freesia yang lembut, dibalut cedarwood. Di dasar, tonka bean, amber, dan vetiver memberi kehangatan yang tenang tanpa berat. Elegan dan halus, cocok untuk yang suka wangi 'bersih' tapi tetap berkarakter.",
    notes: {
      top: ["Mandarin", "Daun Violet", "Bergamot"],
      middle: ["Iris", "Cedarwood", "Freesia"],
      base: ["Tonka Bean", "Amber", "Vetiver"],
    },
    mainAccords: [
      { nama: "Floral", persen: 82 },
      { nama: "Woody", persen: 75 },
      { nama: "Musky", persen: 60 },
      { nama: "Powdery", persen: 45 },
      { nama: "Amber", persen: 38 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/SAFF-Co/Solaris-98616.html",
    bottleColor: "#7c6a8a",
  },
  {
    slug: "bergamot-chai",
    nama: "Bergamot Chai",
    grade: "Premium",
    gender: "Unisex",
    waktuPakai: ["Pagi", "Siang"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Citrus cerah bertemu teh hitam dan jahe — segar dan membangunkan.",
    deskripsi:
      "Dibuka dengan lemon, jahe, bergamot, dan jeruk yang tajam-segar, racikan ini mengalir ke teh hitam dan kayu manis di tengah — seperti secangkir chai hangat. Neroli menjaga kesan segarnya sebelum mengendap di musk, cedarwood, dan guaiac wood yang woody-bersih. Cocok dipakai pagi hari, membangunkan mood sebelum beraktivitas.",
    notes: {
      top: ["Lemon", "Jahe", "Bergamot", "Jeruk"],
      middle: ["Teh Hitam", "Kayu Manis", "Neroli"],
      base: ["Musk", "Cedarwood", "Guaiac Wood"],
    },
    mainAccords: [
      { nama: "Citrus", persen: 85 },
      { nama: "Fresh", persen: 70 },
      { nama: "Rempah", persen: 50 },
      { nama: "Woody", persen: 45 },
      { nama: "Musky", persen: 30 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Inception-121107.html",
    bottleColor: "#a3572a",
  },
  {
    slug: "apricot-rose",
    nama: "Apricot Rose",
    grade: "Premium",
    gender: "Unisex",
    waktuPakai: ["Siang", "Sore"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Fruity-floral manis — grapefruit dan aprikot bertemu mawar dan melati.",
    deskripsi:
      "Racikan fruity-floral-gourmand yang membuka dengan grapefruit, bergamot, jeruk, dan lemon segar. Jantungnya penuh — patchouli, raspberry, melati, aprikot, mawar, dan lily — manis tanpa berlebihan. Di dasar, cendana, cedarwood, vanilla, amber, dan musk memberi kehangatan yang membekas. Charming dan playful, cocok untuk yang suka wangi manis tapi tetap kompleks.",
    notes: {
      top: ["Buah-buahan", "Grapefruit", "Bergamot", "Jeruk", "Lemon"],
      middle: ["Patchouli", "Raspberry", "Melati", "Aprikot", "Mawar", "Lily"],
      base: ["Cendana", "Cedarwood", "Vanilla", "Amber", "Musk"],
    },
    mainAccords: [
      { nama: "Fruity", persen: 88 },
      { nama: "Floral", persen: 72 },
      { nama: "Sweet", persen: 55 },
      { nama: "Woody", persen: 42 },
      { nama: "Musky", persen: 30 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Utopia-121138.html",
    bottleColor: "#d68a52",
  },
  {
    slug: "lavender-marine",
    nama: "Lavender Marine",
    grade: "Medium",
    gender: "Unisex",
    waktuPakai: ["Pagi", "Siang"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Aromatic-aquatic segar — lavender, garam laut, dan bunga air.",
    deskripsi:
      "Racikan aromatic-aquatic yang membuka dengan lavender, grapefruit, pir, dan sentuhan garam laut. Jantungnya aquatic — marine notes, water flowers, dan rhubarb — segar seperti angin pantai. Di dasar, karamel tipis, woody notes, dan moss memberi sedikit kehangatan tanpa menghilangkan kesan segarnya. Cocok untuk aktivitas outdoor dan cuaca panas.",
    notes: {
      top: ["Lavender", "Grapefruit", "Pir", "Garam Laut"],
      middle: ["Marine Notes", "Water Flowers", "Rhubarb"],
      base: ["Karamel", "Woody Notes", "Moss"],
    },
    mainAccords: [
      { nama: "Aquatic", persen: 85 },
      { nama: "Fresh", persen: 72 },
      { nama: "Green", persen: 45 },
      { nama: "Sweet", persen: 35 },
      { nama: "Woody", persen: 30 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/California-Blue-120464.html",
    bottleColor: "#2f6b7a",
  },
  {
    slug: "cardamom-amber",
    nama: "Cardamom Amber",
    grade: "Premium",
    gender: "Pria",
    waktuPakai: ["Sore", "Malam"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Oriental woody gelap — praline dan kayu manis bertemu amber hitam.",
    deskripsi:
      "Racikan oriental-woody yang membuka dengan lemon dan sage tajam, lalu turun ke jantung praline, kayu manis, tolu balsam, dan kapulaga hitam yang manis-hangat. Di dasar, patchouli, kayu rosewood, dan black amber memberi kesan gelap dan maskulin yang membekas lama. Bold dan tegas, cocok untuk malam hari atau acara formal.",
    notes: {
      top: ["Lemon", "Sage"],
      middle: ["Praline", "Kayu Manis", "Tolu Balsam", "Kapulaga Hitam"],
      base: ["Patchouli", "Kayu Rosewood", "Black Amber"],
    },
    mainAccords: [
      { nama: "Sweet", persen: 80 },
      { nama: "Rempah", persen: 68 },
      { nama: "Woody", persen: 55 },
      { nama: "Amber", persen: 50 },
      { nama: "Balsamic", persen: 35 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/Black-XS-514.html",
    bottleColor: "#4a2a1f",
  },
  {
    slug: "bergamot-ambroxan",
    nama: "Bergamot Ambroxan",
    grade: "Premium",
    gender: "Pria",
    waktuPakai: ["Pagi", "Siang", "Sore"],
    hargaMulai: HARGA_MULAI_DEFAULT,
    volumeTersedia: VOLUME_TERSEDIA_DEFAULT,
    ringkasan: "Segar, amber-woody, dan serbaguna — cocok dipakai kapan saja.",
    deskripsi:
      "Racikan amber-woody-aromatic yang membuka dengan bergamot Calabria dan sentuhan lada segar. Jantungnya aromatic-spicy — lada Sichuan, lavender, pink pepper, vetiver, patchouli, geranium, dan elemi — sebelum mengendap di ambroxan, cedar, dan labdanum yang bersih dan membekas ringan. Serbaguna, cocok dipakai dari pagi sampai sore untuk aktivitas apa saja.",
    notes: {
      top: ["Bergamot Calabria", "Lada"],
      middle: ["Lada Sichuan", "Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Geranium", "Elemi"],
      base: ["Ambroxan", "Cedar", "Labdanum"],
    },
    mainAccords: [
      { nama: "Citrus", persen: 80 },
      { nama: "Amber", persen: 70 },
      { nama: "Woody", persen: 60 },
      { nama: "Rempah", persen: 45 },
      { nama: "Fresh", persen: 40 },
    ],
    fragranticaUrl: "https://www.fragrantica.com/perfume/Dior/Sauvage-31861.html",
    bottleColor: "#5a6b6e",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
