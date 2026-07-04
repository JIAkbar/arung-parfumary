"use client";

import { useState } from "react";
import type { ReferensiRacikan } from "@/lib/referensiRacikan";

type SortField = "racikanNama" | "referensiBrand";
type SortDirection = "asc" | "desc";

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  if (!active) return null;
  return (
    <span className="ml-1 text-gold" aria-hidden="true">
      {direction === "asc" ? "▲" : "▼"}
    </span>
  );
}

export default function ReferensiRacikanTable({
  data,
}: {
  data: ReferensiRacikan[];
}) {
  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function toggleSort(field: SortField) {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortField(null);
    }
  }

  const trimmedQuery = query.trim().toLowerCase();
  const filtered = trimmedQuery
    ? data.filter(
        (item) =>
          item.racikanNama.toLowerCase().includes(trimmedQuery) ||
          item.referensiBrand.toLowerCase().includes(trimmedQuery) ||
          item.referensiParfum.toLowerCase().includes(trimmedQuery)
      )
    : data;

  const sorted = sortField
    ? [...filtered].sort((a, b) => {
        const cmp = a[sortField].localeCompare(b[sortField]);
        return sortDirection === "asc" ? cmp : -cmp;
      })
    : filtered;

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

      {sorted.length === 0 ? (
        <p className="mt-8 text-center text-sm text-ink-muted">
          Tidak ditemukan racikan yang cocok dengan &quot;{trimmedQuery}&quot;.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gold-hairline text-xs uppercase tracking-wider text-gold">
                <th className="py-2 pr-4">
                  <button
                    type="button"
                    onClick={() => toggleSort("racikanNama")}
                    className="flex items-center hover:text-gold-light"
                  >
                    Nama Racikan
                    <SortIndicator
                      active={sortField === "racikanNama"}
                      direction={sortDirection}
                    />
                  </button>
                </th>
                <th className="py-2 pr-4">
                  <button
                    type="button"
                    onClick={() => toggleSort("referensiBrand")}
                    className="flex items-center hover:text-gold-light"
                  >
                    Brand & Parfum Asli
                    <SortIndicator
                      active={sortField === "referensiBrand"}
                      direction={sortDirection}
                    />
                  </button>
                </th>
                <th className="py-2">Fragrantica</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => (
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
