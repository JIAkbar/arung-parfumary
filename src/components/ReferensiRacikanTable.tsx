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
