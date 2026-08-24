import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { getAllBlogSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/destinations",
    "/experience",
    "/how-it-works",
    "/faq",
    "/about",
    "/corporate",
    "/contact",
    "/blog",
  ];

  const blogRoutes = (await getAllBlogSlugs()).map((slug) => `/blog/${slug}`);

  return [...staticRoutes, ...blogRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : path.startsWith("/blog") ? "monthly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.7,
  }));
}
