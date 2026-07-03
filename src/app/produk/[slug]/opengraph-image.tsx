import { ImageResponse } from "next/og";
import { getProductBySlug, products } from "@/lib/products";
import { hargaTermurah, formatRupiah } from "@/lib/hargaKalkulator";

export const alt = "Arung Wangi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const nama = product?.nama ?? "Arung Wangi";
  const ringkasan = product?.ringkasan ?? "Racikan Parfum Artisan";
  const harga = product ? `Mulai ${formatRupiah(hargaTermurah(product).low)}` : "";
  const color = product?.bottleColor ?? "#9c6a2b";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f7f1e4",
          backgroundImage: `radial-gradient(circle at 85% 50%, ${color}33, transparent 60%)`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#9c6a2b",
            textTransform: "uppercase",
          }}
        >
          Arung Wangi
        </div>
        <div style={{ fontSize: 72, color: "#26201a", marginTop: 24 }}>
          {nama}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6f6355",
            marginTop: 20,
            maxWidth: 800,
          }}
        >
          {ringkasan}
        </div>
        <div style={{ fontSize: 36, color: "#26201a", marginTop: 44 }}>
          {harga}
        </div>
      </div>
    ),
    { ...size }
  );
}
