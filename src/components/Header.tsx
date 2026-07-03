"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const NAV = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gold-hairline bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-foreground"
        >
          <BrandMark className="h-5 w-5 text-gold" />
          Arung Wangi
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm text-ink-muted transition-colors hover:text-gold"
            >
              <span className="absolute -left-3 top-1/2 h-1 w-1 -translate-x-1 -translate-y-1/2 rounded-full bg-gold opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-5 bg-gold transition-transform duration-200 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-gold transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-5 bg-gold transition-transform duration-200 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-background transition-[max-height] duration-300 ease-in-out sm:hidden ${
          open ? "max-h-60 border-t border-gold-hairline" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-sm text-ink-muted hover:text-gold ${
                i > 0 ? "border-t border-gold-hairline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
