import { WHATSAPP_NUMBER } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg">Arung Wangi</p>
          <div className="flex gap-6 text-background/70">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-light"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold-light"
            >
              Instagram
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
