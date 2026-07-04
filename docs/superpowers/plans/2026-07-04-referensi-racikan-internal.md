# Halaman Pencarian Referensi Racikan (Internal) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun halaman pencarian internal `/racikan` yang memetakan nama racikan ke brand & parfum asli yang jadi referensi, supaya pemilik toko bisa cari cepat dari HP saat ada pesanan WhatsApp masuk.

**Architecture:** Data mapping (69 entri, dipindah dari tabel markdown di `CLAUDE.md`) jadi satu file TypeScript baru. Route baru `/racikan` (server component tipis) merender client component pencarian yang filter data itu secara real-time di browser — tidak ada fetch/API. Halaman ini sengaja tidak ditaut dari navigasi/sitemap, dan ditambahkan ke `Disallow` di `robots.ts`.

**Tech Stack:** Next.js 16 App Router (static export, `output: "export"`), TypeScript, Tailwind CSS v4, React 19 `useState`. Tidak ada test runner (Jest/Vitest) di proyek ini — verifikasi memakai `tsc --noEmit`, `eslint`, `next build --webpack`, dan pengecekan manual lewat preview browser, mengikuti pola yang sudah dipakai konsisten di semua fitur sebelumnya (lihat `CLAUDE.md`).

## Global Constraints

- **`next dev --webpack` / `next build --webpack` wajib** — jangan hapus flag `--webpack` (Turbopack panic di path yang mengandung spasi).
- Situs pakai **static export** (`output: "export"`) — semua kode harus tetap kompatibel client-side statis, tidak boleh menambah API routes/server actions.
- Warna & gaya visual harus konsisten dengan token yang sudah ada di `globals.css` (`--gold`, `--gold-hairline`, `--background`, `--foreground`, `--ink-muted`, `--border`, `--surface`, dst) — jangan hardcode warna baru.
- Route `/racikan` **tidak boleh** ditaut dari `Header.tsx` (NAV), **tidak boleh** ditambahkan ke `src/app/sitemap.ts`, dan **harus** ditambahkan ke `Disallow` di `src/app/robots.ts`.
- Field `racikanNama` di `src/lib/referensiRacikan.ts` harus persis sama (case-sensitive, termasuk tanda baca) dengan `Product.nama` yang berkorespondensi di `src/lib/products.ts`.
- Setelah setiap task, jalankan `npx tsc --noEmit` dan `npm run lint` — keduanya harus bersih sebelum commit.

---

### Task 1: Data referensi racikan

**Files:**
- Create: `src/lib/referensiRacikan.ts`

**Interfaces:**
- Consumes: tidak ada
- Produces: `interface ReferensiRacikan { racikanNama: string; referensiBrand: string; referensiParfum: string; fragranticaUrl: string }` dan `export const referensiRacikan: ReferensiRacikan[]` (69 entri) — dipakai oleh Task 2 (`ReferensiRacikanTable.tsx` menerima `data: ReferensiRacikan[]`, `racikan/page.tsx` mengimpor `referensiRacikan` langsung)

- [ ] **Step 1: Buat file dengan seluruh 69 entri**

Data ini dipindah dari tabel markdown "Daftar Referensi Racikan" di `CLAUDE.md` (baris 536-606 saat ini) — setiap baris `| Racikan | Brand — Parfum | link |` dipecah jadi `racikanNama`, `referensiBrand`, `referensiParfum` (dipisah pada tanda "—"), dan `fragranticaUrl` (ditambah prefix `https://www.` karena tabel markdown menyimpannya tanpa protokol, tapi field `fragranticaUrl` di `products.ts` selalu pakai `https://www.fragrantica.com/...` — samakan formatnya).

Isi lengkap `src/lib/referensiRacikan.ts`:

```ts
export interface ReferensiRacikan {
  racikanNama: string;
  referensiBrand: string;
  referensiParfum: string;
  fragranticaUrl: string;
}

export const referensiRacikan: ReferensiRacikan[] = [
  { racikanNama: "Verdant Fig", referensiBrand: "Mykonos", referensiParfum: "Down to Earth", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Down-to-Earth-120471.html" },
  { racikanNama: "Rosé Bergamot", referensiBrand: "Mykonos", referensiParfum: "Monaco Royale", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Monaco-Royale-121113.html" },
  { racikanNama: "Praline Tonka", referensiBrand: "Mykonos", referensiParfum: "Cafe Drops", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Cafe-Drops-120463.html" },
  { racikanNama: "Iris Amber", referensiBrand: "SAFF & Co.", referensiParfum: "Solaris", fragranticaUrl: "https://www.fragrantica.com/perfume/SAFF-Co/Solaris-98616.html" },
  { racikanNama: "Bergamot Chai", referensiBrand: "Mykonos", referensiParfum: "Inception", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Inception-121107.html" },
  { racikanNama: "Apricot Rose", referensiBrand: "Mykonos", referensiParfum: "Utopia", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/Utopia-121138.html" },
  { racikanNama: "Lavender Marine", referensiBrand: "Mykonos", referensiParfum: "California Blue", fragranticaUrl: "https://www.fragrantica.com/perfume/Mykonos/California-Blue-120464.html" },
  { racikanNama: "Cardamom Amber", referensiBrand: "Rabanne", referensiParfum: "Black XS (2005, original)", fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/Black-XS-514.html" },
  { racikanNama: "Bergamot Ambroxan", referensiBrand: "Dior", referensiParfum: "Sauvage (2015 EDT, original)", fragranticaUrl: "https://www.fragrantica.com/perfume/Dior/Sauvage-31861.html" },
  { racikanNama: "Cinnamon Oud", referensiBrand: "Lattafa Perfumes", referensiParfum: "Khamrah", fragranticaUrl: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Khamrah-75805.html" },
  { racikanNama: "Ginger Ambroxan", referensiBrand: "Louis Vuitton", referensiParfum: "Imagination", fragranticaUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Imagination-67370.html" },
  { racikanNama: "Pineapple Birch", referensiBrand: "Creed", referensiParfum: "Aventus", fragranticaUrl: "https://www.fragrantica.com/perfume/Creed/Aventus-9828.html" },
  { racikanNama: "Mint Tonka", referensiBrand: "Versace", referensiParfum: "Eros (EDT original)", fragranticaUrl: "https://www.fragrantica.com/perfume/Versace/Eros-16657.html" },
  { racikanNama: "Plum Driftwood", referensiBrand: "Rasasi", referensiParfum: "Hawas Ice", fragranticaUrl: "https://www.fragrantica.com/perfume/Rasasi/Hawas-Ice-89050.html" },
  { racikanNama: "Saffron Ambergris", referensiBrand: "Maison Francis Kurkdjian", referensiParfum: "Baccarat Rouge 540", fragranticaUrl: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html" },
  { racikanNama: "Midnight Coffee", referensiBrand: "Yves Saint Laurent", referensiParfum: "Black Opium", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Black-Opium-25324.html" },
  { racikanNama: "Pear Musk", referensiBrand: "Ex Nihilo", referensiParfum: "Blue Talisman", fragranticaUrl: "https://www.fragrantica.com/perfume/Ex-Nihilo/Blue-Talisman-84224.html" },
  { racikanNama: "Cherry Almond", referensiBrand: "Tom Ford", referensiParfum: "Lost Cherry", fragranticaUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Lost-Cherry-51411.html" },
  { racikanNama: "Green Apple Lotus", referensiBrand: "Nautica", referensiParfum: "Nautica Voyage", fragranticaUrl: "https://www.fragrantica.com/perfume/Nautica/Nautica-Voyage-913.html" },
  { racikanNama: "Pineapple Patchouli", referensiBrand: "Nishane", referensiParfum: "Hacivat", fragranticaUrl: "https://www.fragrantica.com/perfume/Nishane/Hacivat-44174.html" },
  { racikanNama: "Lychee Rose", referensiBrand: "Parfums de Marly", referensiParfum: "Delina", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Delina-43871.html" },
  { racikanNama: "Apple Caramel", referensiBrand: "Afnan", referensiParfum: "9 PM Rebel", fragranticaUrl: "https://www.fragrantica.com/perfume/Afnan/9-PM-Rebel-99238.html" },
  { racikanNama: "Golden Ylang", referensiBrand: "Dior", referensiParfum: "J'adore", fragranticaUrl: "https://www.fragrantica.com/perfume/Dior/J-adore-210.html" },
  { racikanNama: "Velvet Rose", referensiBrand: "Parfums de Marly", referensiParfum: "Delina Exclusif", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Delina-Exclusif-50370.html" },
  { racikanNama: "Pistachio Gelato", referensiBrand: "Kayali Fragrances", referensiParfum: "Yum Pistachio Gelato | 33", fragranticaUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Yum-Pistachio-Gelato-33-79846.html" },
  { racikanNama: "Pear Freesia", referensiBrand: "Jo Malone London", referensiParfum: "English Pear & Freesia", fragranticaUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/English-Pear-Freesia-10314.html" },
  { racikanNama: "Hazelnut Amberwood", referensiBrand: "Rabanne", referensiParfum: "1 Million Lucky", fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/1-Million-Lucky-48903.html" },
  { racikanNama: "Rose Espresso", referensiBrand: "Montale", referensiParfum: "Intense Cafe", fragranticaUrl: "https://www.fragrantica.com/perfume/Montale/Intense-Cafe-18021.html" },
  { racikanNama: "Jasmine Sambac", referensiBrand: "Gucci", referensiParfum: "Gucci Bloom (2017 original)", fragranticaUrl: "https://www.fragrantica.com/perfume/Gucci/Gucci-Bloom-44894.html" },
  { racikanNama: "Green Pepper Musk", referensiBrand: "Carolina Herrera", referensiParfum: "212 Men", fragranticaUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/212-Men-297.html" },
  { racikanNama: "Almond Heliotrope", referensiBrand: "Parfums de Marly", referensiParfum: "Pegasus", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Pegasus-16938.html" },
  { racikanNama: "Sweet Pea Peony", referensiBrand: "Dior", referensiParfum: "Miss Dior Blooming Bouquet", fragranticaUrl: "https://www.fragrantica.com/perfume/Dior/Miss-Dior-Blooming-Bouquet-23280.html" },
  { racikanNama: "Tuberose Agave", referensiBrand: "Memo Paris", referensiParfum: "Marfa", fragranticaUrl: "https://www.fragrantica.com/perfume/Memo-Paris/Marfa-37185.html" },
  { racikanNama: "Oud Mint", referensiBrand: "Mancera", referensiParfum: "Aoud Lemon Mint", fragranticaUrl: "https://www.fragrantica.com/perfume/Mancera/Aoud-Lemon-Mint-39181.html" },
  { racikanNama: "Sage Amberwood", referensiBrand: "Yves Saint Laurent", referensiParfum: "Y Eau de Parfum", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Y-Eau-de-Parfum-50757.html" },
  { racikanNama: "Raspberry Rose", referensiBrand: "Louis Vuitton", referensiParfum: "Les Sables Roses", fragranticaUrl: "https://www.fragrantica.com/perfume/Louis-Vuitton/Les-Sables-Roses-55040.html" },
  { racikanNama: "Smoked Cherry", referensiBrand: "Tom Ford", referensiParfum: "Cherry Smoke", fragranticaUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Cherry-Smoke-78578.html" },
  { racikanNama: "Grapefruit Jasmine", referensiBrand: "Cacharel", referensiParfum: "Amor Amor", fragranticaUrl: "https://www.fragrantica.com/perfume/Cacharel/Amor-Amor-238.html" },
  { racikanNama: "Gardenia Coffee", referensiBrand: "Parfums de Marly", referensiParfum: "Layton Exclusif", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-Exclusif-46633.html" },
  { racikanNama: "Passionfruit Peony", referensiBrand: "Victoria's Secret", referensiParfum: "Bombshell", fragranticaUrl: "https://www.fragrantica.com/perfume/Victoria-s-Secret/Bombshell-10190.html" },
  { racikanNama: "Blackcurrant Rose", referensiBrand: "Giorgio Armani", referensiParfum: "Sì Passione", fragranticaUrl: "https://www.fragrantica.com/perfume/Giorgio-Armani/Si-Passione-48002.html" },
  { racikanNama: "Litsea Mint", referensiBrand: "Versace", referensiParfum: "Eros Parfum (2021)", fragranticaUrl: "https://www.fragrantica.com/perfume/Versace/Eros-Parfum-70090.html" },
  { racikanNama: "Melon Cappuccino", referensiBrand: "Antonio Banderas", referensiParfum: "Blue Seduction (men)", fragranticaUrl: "https://www.fragrantica.com/perfume/Antonio-Banderas/Blue-Seduction-1088.html" },
  { racikanNama: "Apple Lavender", referensiBrand: "Parfums de Marly", referensiParfum: "Layton", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Layton-39314.html" },
  { racikanNama: "Candy Apple Leather", referensiBrand: "Versace", referensiParfum: "Eros Eau de Parfum", fragranticaUrl: "https://www.fragrantica.com/perfume/Versace/Eros-Eau-de-Parfum-62762.html" },
  { racikanNama: "Lavender Tonka", referensiBrand: "Yves Saint Laurent", referensiParfum: "Libre Intense", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Intense-62318.html" },
  { racikanNama: "Honey Lavender", referensiBrand: "Yves Saint Laurent", referensiParfum: "Libre Le Parfum", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Libre-Le-Parfum-75676.html" },
  { racikanNama: "Grapefruit Marine", referensiBrand: "Rabanne", referensiParfum: "Invictus", fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/Invictus-18471.html" },
  { racikanNama: "Soap Marine", referensiBrand: "Rabanne", referensiParfum: "Invictus Parfum", fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/Invictus-Parfum-90433.html" },
  { racikanNama: "Absinthe Vanilla", referensiBrand: "Carolina Herrera", referensiParfum: "212 VIP Black", fragranticaUrl: "https://www.fragrantica.com/perfume/Carolina-Herrera/212-VIP-Black-46093.html" },
  { racikanNama: "Sea Salt Sage", referensiBrand: "Jo Malone London", referensiParfum: "Wood Sage & Sea Salt", fragranticaUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/Wood-Sage-Sea-Salt-25529.html" },
  { racikanNama: "Petitgrain Oakmoss", referensiBrand: "Parfums de Marly", referensiParfum: "Greenley", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Greenley-62101.html" },
  { racikanNama: "Saffron Rose", referensiBrand: "Mancera", referensiParfum: "Instant Crush", fragranticaUrl: "https://www.fragrantica.com/perfume/Mancera/Instant-Crush-54885.html" },
  { racikanNama: "Grapefruit Incense", referensiBrand: "Chanel", referensiParfum: "Bleu de Chanel (EDT 2010)", fragranticaUrl: "https://www.fragrantica.com/perfume/Chanel/Bleu-de-Chanel-9099.html" },
  { racikanNama: "Magnolia Clove", referensiBrand: "Moschino", referensiParfum: "Toy Boy", fragranticaUrl: "https://www.fragrantica.com/perfume/Moschino/Toy-Boy-55858.html" },
  { racikanNama: "Passionfruit Heliotrope", referensiBrand: "Tiziana Terenzi", referensiParfum: "Kirke", fragranticaUrl: "https://www.fragrantica.com/perfume/Tiziana-Terenzi/Kirke-32172.html" },
  { racikanNama: "Violet Patchouli", referensiBrand: "Yves Saint Laurent", referensiParfum: "Tuxedo", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Tuxedo-32269.html" },
  { racikanNama: "Sweet Oud", referensiBrand: "Lattafa Perfumes", referensiParfum: "Ameer Al Oudh Intense Oud", fragranticaUrl: "https://www.fragrantica.com/perfume/Lattafa-Perfumes/Ameer-Al-Oudh-Intense-Oud-64947.html" },
  { racikanNama: "Almond Lotus", referensiBrand: "Parfums de Marly", referensiParfum: "Valaya Exclusif", fragranticaUrl: "https://www.fragrantica.com/perfume/Parfums-de-Marly/Valaya-Exclusif-102806.html" },
  { racikanNama: "Strawberry Peony", referensiBrand: "Yves Saint Laurent", referensiParfum: "Mon Paris", fragranticaUrl: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/Mon-Paris-38914.html" },
  { racikanNama: "Honey Gardenia", referensiBrand: "Jean Paul Gaultier", referensiParfum: "Scandal (women)", fragranticaUrl: "https://www.fragrantica.com/perfume/Jean-Paul-Gaultier/Scandal-45651.html" },
  { racikanNama: "Mirabelle Freesia", referensiBrand: "Chloé", referensiParfum: "Nomade", fragranticaUrl: "https://www.fragrantica.com/perfume/Chloe/Nomade-48434.html" },
  { racikanNama: "Salty Vanilla", referensiBrand: "Rabanne", referensiParfum: "Olympea (original 2015)", fragranticaUrl: "https://www.fragrantica.com/perfume/Rabanne/Olympea-31666.html" },
  { racikanNama: "Raspberry Leather", referensiBrand: "Tom Ford", referensiParfum: "Tuscan Leather", fragranticaUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Tuscan-Leather-1849.html" },
  { racikanNama: "Sparkling Lychee", referensiBrand: "Kayali Fragrances", referensiParfum: "Eden Sparkling Lychee | 39", fragranticaUrl: "https://www.fragrantica.com/perfume/Kayali-Fragrances/Eden-Sparkling-Lychee-39-Eau-de-Parfum-88197.html" },
  { racikanNama: "Violet Tobacco", referensiBrand: "Tom Ford", referensiParfum: "Ombré Leather Parfum", fragranticaUrl: "https://www.fragrantica.com/perfume/Tom-Ford/Ombre-Leather-Parfum-68716.html" },
  { racikanNama: "Bluebell Persimmon", referensiBrand: "Jo Malone London", referensiParfum: "Wild Bluebell (original 2011)", fragranticaUrl: "https://www.fragrantica.com/perfume/Jo-Malone-London/Wild-Bluebell-12310.html" },
  { racikanNama: "Saffron Vetiver", referensiBrand: "Byredo", referensiParfum: "Black Saffron", fragranticaUrl: "https://www.fragrantica.com/perfume/Byredo/Black-Saffron-16220.html" },
  { racikanNama: "Passion Vanilla", referensiBrand: "Lancôme", referensiParfum: "Hypnose", fragranticaUrl: "https://www.fragrantica.com/perfume/Lancome/Hypnose-170.html" },
];
```

- [ ] **Step 2: Verifikasi jumlah entri = 69 dan cocok dengan jumlah produk**

Run:
```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('src/lib/referensiRacikan.ts', 'utf8');
const names = [...content.matchAll(/racikanNama: \"([^\"]+)\"/g)].map(m => m[1]);
console.log('referensiRacikan entries:', names.length);
const products = fs.readFileSync('src/lib/products.ts', 'utf8');
const productNames = [...products.matchAll(/nama: \"([^\"]+)\"/g)].map(m => m[1]);
console.log('products entries:', productNames.length);
const missing = productNames.filter(n => !names.includes(n));
console.log('produk tanpa entri referensi:', missing);
"
```
Expected: `referensiRacikan entries: 69`, `products entries: 69`, `produk tanpa entri referensi: []`

- [ ] **Step 3: Verifikasi type-check & lint**

Run: `npx tsc --noEmit`
Expected: tidak ada output (bersih)

Run: `npm run lint`
Expected: tidak ada error/warning

- [ ] **Step 4: Commit**

```bash
git add src/lib/referensiRacikan.ts
git commit -m "feat: tambah data referensi racikan (racikan -> brand asli)"
```

---

### Task 2: Komponen tabel pencarian + route + robots.txt

**Files:**
- Create: `src/components/ReferensiRacikanTable.tsx`
- Create: `src/app/racikan/page.tsx`
- Modify: `src/app/robots.ts` (tambah `disallow: "/racikan"` ke rules yang sudah ada)

**Interfaces:**
- Consumes: `ReferensiRacikan` type dan `referensiRacikan` array dari `@/lib/referensiRacikan` (Task 1)
- Produces: `ReferensiRacikanTable({ data: ReferensiRacikan[] })` default export — dipakai oleh `racikan/page.tsx`. Route `/racikan` tersedia untuk Task 3's browser verification.

- [ ] **Step 1: Buat `src/components/ReferensiRacikanTable.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { ReferensiRacikan } from "@/lib/referensiRacikan";

export default function ReferensiRacikanTable({
  data,
}: {
  data: ReferensiRacikan[];
}) {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();
  const filtered = trimmedQuery
    ? data.filter(
        (item) =>
          item.racikanNama.toLowerCase().includes(trimmedQuery) ||
          item.referensiBrand.toLowerCase().includes(trimmedQuery) ||
          item.referensiParfum.toLowerCase().includes(trimmedQuery)
      )
    : data;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama racikan, brand, atau nama parfum asli..."
        className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-ink-muted/60 focus:border-gold focus:outline-none"
      />
      <p className="mt-3 text-xs text-ink-muted">
        {filtered.length} dari {data.length} racikan
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-ink-muted">
          Tidak ditemukan racikan yang cocok dengan &quot;{query}&quot;.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gold-hairline text-xs uppercase tracking-wider text-gold">
                <th className="py-2 pr-4">Nama Racikan</th>
                <th className="py-2 pr-4">Brand & Parfum Asli</th>
                <th className="py-2">Fragrantica</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.racikanNama} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {item.racikanNama}
                  </td>
                  <td className="py-2 pr-4 text-ink-muted">
                    {item.referensiBrand} — {item.referensiParfum}
                  </td>
                  <td className="py-2">
                    <a
                      href={item.fragranticaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light"
                    >
                      Buka →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Buat `src/app/racikan/page.tsx`**

```tsx
import { referensiRacikan } from "@/lib/referensiRacikan";
import ReferensiRacikanTable from "@/components/ReferensiRacikanTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referensi Racikan",
  robots: { index: false, follow: false },
};

export default function RacikanPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl text-foreground">Referensi Racikan</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Daftar internal — pemetaan racikan ke brand & parfum asli yang jadi
        referensi. Halaman ini tidak ditaut dari navigasi manapun.
      </p>
      <div className="mt-8">
        <ReferensiRacikanTable data={referensiRacikan} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Baca `src/app/robots.ts` saat ini untuk konfirmasi baseline**

Isi file saat ini:

```ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://arung-parfumary.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Tambah `disallow: "/racikan"` ke rules**

Ganti isi file jadi:

```ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://arung-parfumary.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/racikan" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Verifikasi type-check & lint**

Run: `npx tsc --noEmit`
Expected: tidak ada output (bersih)

Run: `npm run lint`
Expected: tidak ada error/warning

- [ ] **Step 6: Commit**

```bash
git add src/components/ReferensiRacikanTable.tsx src/app/racikan/page.tsx src/app/robots.ts
git commit -m "feat: tambah halaman pencarian internal /racikan"
```

---

### Task 3: Verifikasi browser, build, dokumentasi, dan deploy

**Files:**
- Modify: `CLAUDE.md` (ringkas tabel referensi jadi rujukan ke kode, update alur produk baru, tambah Progress Sesi #10, update struktur file, update header "Diperbarui")

**Interfaces:**
- Consumes: server dev yang sudah berjalan (`preview_list`/`preview_start` — cek serverId aktif), hasil Task 1 & Task 2
- Produces: tidak ada (task verifikasi + dokumentasi + deploy)

- [ ] **Step 1: Cek halaman `/racikan` di browser**

Pakai preview tool: navigasi ke `http://localhost:3000/racikan`, reload.

Ambil `preview_snapshot` — pastikan judul "Referensi Racikan" tampil, kotak pencarian ada, tabel menampilkan baris (cek jumlahnya lewat teks "69 dari 69 racikan"). Cek `preview_console_logs` level `error` — harus kosong.

- [ ] **Step 2: Cek filter pencarian jalan**

Isi kotak pencarian dengan `preview_fill` (selector input teks di halaman) dengan nilai `"Iris Amber"`. Ambil `preview_snapshot` — tabel harus tersaring jadi cuma baris "Iris Amber" (teks "1 dari 69 racikan").

Ganti isi jadi `"Rasasi"` (nama brand, bukan nama racikan) — tabel harus tersaring ke baris "Plum Driftwood" (yang referensinya Rasasi — Hawas Ice), membuktikan pencarian juga mencocokkan `referensiBrand`.

Ganti isi jadi `"xyz-tidak-ada"` — harus muncul pesan "Tidak ditemukan racikan yang cocok dengan...".

- [ ] **Step 3: Cek halaman ini tidak ditaut dari Header**

Navigasi ke `http://localhost:3000/` (Beranda). Ambil `preview_snapshot` bagian `navigation` — pastikan cuma ada "Katalog" dan "Tentang", tidak ada link ke "/racikan" atau "Referensi Racikan".

- [ ] **Step 4: Build static export penuh**

Run: `npm run build -- --webpack`
Expected: sukses, sekarang generate 147 halaman statis (146 sebelumnya + 1 route baru `/racikan`)

- [ ] **Step 5: Cek `/racikan` tidak ada di sitemap, dan robots.txt punya Disallow**

Run:
```bash
grep -c "racikan</loc>" out/sitemap.xml || echo "0 (tidak ditemukan, sesuai harapan)"
cat out/robots.txt
```
Expected: grep tidak menemukan `/racikan` di sitemap (exit code 1 dari grep, fallback echo tampil), dan `out/robots.txt` memuat baris `Disallow: /racikan`

- [ ] **Step 6: Update `CLAUDE.md`**

Ganti section "### Daftar Referensi Racikan (internal, jangan tampil di website)" (termasuk tabel 69 barisnya) jadi ringkasan yang merujuk ke `src/lib/referensiRacikan.ts`, dan sebutkan halaman pencarian `/racikan` yang sekarang memakai data itu. Update juga:
- Kalimat di "Alur Konten Produk Baru" yang bilang "selalu update tabel ini juga" — ganti jadi instruksi menambah entri ke `src/lib/referensiRacikan.ts`
- "📁 Struktur File" — tambah `src/lib/referensiRacikan.ts`, `src/components/ReferensiRacikanTable.tsx`, `src/app/racikan/page.tsx` ke pohon file
- Tambah section baru "Progress Sesi #10" (ikuti format section sesi sebelumnya) yang mendokumentasikan fitur ini: alasan (pemilik toko butuh cari cepat dari HP), keputusan privasi (URL tersembunyi, robots disallow, tidak ditaut), pemindahan data dari tabel markdown ke kode
- Update baris "Diperbarui" di header

- [ ] **Step 7: Commit dokumentasi**

```bash
git add CLAUDE.md
git commit -m "docs: catat sesi #10 - halaman pencarian referensi racikan internal"
```

- [ ] **Step 8: Push ke remote**

```bash
GIT_TERMINAL_PROMPT=0 git push origin claude/nostalgic-jepsen-736c22:main
```
Expected: sukses. Kalau macet/timeout, tanyakan ke user apakah ada popup sign-in GitHub yang muncul — kalau tidak ada popup, retry biasanya cukup.

- [ ] **Step 9: Deploy ke Cloudflare Pages**

```bash
npx wrangler pages deploy out --project-name=arung-parfumary --branch=main --commit-dirty=true --commit-message="Halaman pencarian referensi racikan internal"
```
Expected: sukses, dapat URL deploy unik.

- [ ] **Step 10: Verifikasi live deployment**

Pakai WebFetch ke URL deploy unik dari Step 9, path `/racikan` — konfirmasi halaman render dengan tabel dan kotak pencarian, tidak ada error. Juga cek `/` (Beranda) — footer & nav tidak menyebut "racikan" (selain di produk katalog seperti biasa).

## Ringkasan Cakupan Spec

- Data 69 entri di file kode, satu-satunya sumber → Task 1
- Route `/racikan`, tabel + pencarian real-time → Task 2 Step 1-2
- Tidak ditaut dari Header, tidak di sitemap, ada di robots disallow → Task 2 Step 3-4 + Task 3 Step 3, 5
- `metadata.robots.index/follow = false` di halaman itu sendiri → Task 2 Step 2
- CLAUDE.md diringkas + alur produk baru diupdate → Task 3 Step 6
