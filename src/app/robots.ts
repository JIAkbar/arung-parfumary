import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://arung-parfumary.pages.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/racikan" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
