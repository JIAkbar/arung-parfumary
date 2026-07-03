import { accordFamily } from "@/lib/accordFamily";
import type { Product } from "@/lib/products";

const SYNONYMS: Record<string, string> = {
  spicy: "Rempah",
  rempah: "Rempah",
  pedas: "Rempah",
  hangat: "Rempah",
  manis: "Sweet",
  sweet: "Sweet",
  gula: "Sweet",
  gourmand: "Sweet",
  kayu: "Woody",
  woody: "Woody",
  wood: "Woody",
  segar: "Citrus",
  fresh: "Citrus",
  citrus: "Citrus",
  jeruk: "Citrus",
  bunga: "Floral",
  floral: "Floral",
  flower: "Floral",
  buah: "Fruity",
  fruity: "Fruity",
  fruit: "Fruity",
  laut: "Aquatic",
  aquatic: "Aquatic",
  marine: "Aquatic",
  pantai: "Aquatic",
  musk: "Musky",
  musky: "Musky",
  amber: "Amber",
  tanah: "Earthy",
  earthy: "Earthy",
  hijau: "Green",
  green: "Green",
  bedak: "Powdery",
  powdery: "Powdery",
};

export interface MatchResult {
  product: Product;
  score: number;
}

export function matchProducts(query: string, products: Product[]): MatchResult[] {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return products
    .map((product) => {
      let score = 0;
      const allNotes = [
        ...product.notes.top,
        ...product.notes.middle,
        ...product.notes.base,
      ]
        .join(" ")
        .toLowerCase();

      for (const token of tokens) {
        if (allNotes.includes(token)) score += 20;

        const family = SYNONYMS[token];
        if (family) {
          const accord = product.mainAccords.find(
            (a) => accordFamily(a.nama) === family
          );
          if (accord) score += accord.persen;
        }
      }

      return { product, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
