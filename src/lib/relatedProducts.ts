import { accordFamily } from "@/lib/accordFamily";
import type { Product } from "@/lib/products";

function familyOverlap(a: Product, b: Product): number {
  const familiesA = new Set(a.mainAccords.map((acc) => accordFamily(acc.nama)));
  const familiesB = new Set(b.mainAccords.map((acc) => accordFamily(acc.nama)));
  let shared = 0;
  for (const f of familiesA) {
    if (familiesB.has(f)) shared += 1;
  }
  return shared;
}

export function getRelatedProducts(
  product: Product,
  allProducts: Product[],
  count = 4
): Product[] {
  return allProducts
    .filter((p) => p.slug !== product.slug)
    .map((p) => {
      let score = familyOverlap(product, p) * 10;
      if (p.gender === product.gender || p.gender === "Unisex" || product.gender === "Unisex") {
        score += 5;
      }
      score += p.waktuPakai.filter((w) => product.waktuPakai.includes(w)).length * 3;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.product);
}
