const FAMILY_KEYWORDS: { key: string; keywords: string[] }[] = [
  { key: "Woody", keywords: ["woody"] },
  { key: "Earthy", keywords: ["earthy"] },
  { key: "Green", keywords: ["green"] },
  { key: "Floral", keywords: ["floral"] },
  { key: "Fruity", keywords: ["fruity"] },
  { key: "Citrus", keywords: ["citrus"] },
  { key: "Aquatic", keywords: ["aquatic", "fresh", "marine"] },
  {
    key: "Sweet",
    keywords: [
      "sweet",
      "manis",
      "vanilla",
      "caramel",
      "karamel",
      "coffee",
      "kopi",
      "milky",
      "lactonic",
      "creamy",
    ],
  },
  { key: "Musky", keywords: ["musky", "musk"] },
  { key: "Amber", keywords: ["amber"] },
  { key: "Rempah", keywords: ["rempah", "spicy"] },
  { key: "Powdery", keywords: ["powdery"] },
  { key: "Smoky", keywords: ["smoky", "balsamic"] },
];

export function accordFamily(nama: string): string {
  const key = nama.toLowerCase();
  const match = FAMILY_KEYWORDS.find((f) => f.keywords.some((k) => key.includes(k)));
  return match ? match.key : nama;
}
