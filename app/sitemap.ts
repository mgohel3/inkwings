import type { MetadataRoute } from "next";
import { allProducts, categories } from "@/lib/data";

const BASE_URL = "https://inkwings.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/services",
    "/process",
    "/work",
    "/about",
    "/contact",
    "/quote",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE_URL}/products/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = allProducts.map((p) => ({
    url: `${BASE_URL}/products/${p.cat.slug}/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
