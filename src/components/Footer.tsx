import { whatsappGeneralUrl } from "@/lib/products";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BrandMark className="h-4 w-4 text-gold-light" />
            <p className="font-serif text-lg">Arung Wangi</p>
          </div>
          <div className="flex gap-6 text-background/70">
            <a
              href={whatsappGeneralUrl()}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-light"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <p className="mt-6 text-xs text-background/50">
          &copy; {new Date().getFullYear()} Arung Wangi. Racikan
          artisan, bukan produk resmi brand manapun.
        </p>
      </div>
    </footer>
  );
}
