import { siteConfig } from "@/config/site.config";
import { services } from "@/data/services";
import { destinations } from "@/data/destinations";
import { fleet } from "@/data/fleet";
import { blogPosts } from "@/data/blog";
import { tourPackages } from "@/data/tourPackages";

export default function sitemap() {
  const url = (path) => `${siteConfig.url}${path}`;
  const now = new Date();

  // Core Landing and High-Value Discovery Pages
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily", images: [url("/images/hero-poster.webp"), url("/opengraph-image")] },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/routes", priority: 0.9, changeFrequency: "weekly" },
    { path: "/destinations", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tours-packages", priority: 0.85, changeFrequency: "weekly" },
    { path: "/fleet", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/testimonials", priority: 0.75, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  ].map((route) => ({
    url: url(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    ...(route.images ? { images: route.images } : {}),
  }));

  // 4 Core Cab Services (One-way, Round trip, Local, Airport)
  const serviceRoutes = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dedicated Destination Pages with Google Image sitemap tags
  const destinationRoutes = destinations.map((d) => ({
    url: url(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    ...(d.image ? { images: [url(d.image)] } : {}),
  }));

  // Vehicle Fleet Pages with Google Image sitemap tags
  const fleetRoutes = fleet.map((v) => ({
    url: url(`/fleet/${v.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
    ...(v.image ? { images: [url(v.image)] } : {}),
  }));

  // Tour Package Detail Pages with Google Image sitemap tags
  const tourPackageRoutes = tourPackages
    .filter((p) => p.active !== false)
    .map((p) => ({
      url: url(`/tours-packages/${p.id}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      ...(p.image ? { images: [url(p.image)] } : {}),
    }));

  // Travel Guides and Blog Posts with Google Image sitemap tags
  const blogRoutes = blogPosts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
    ...(p.image ? { images: [url(p.image)] } : {}),
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...destinationRoutes,
    ...tourPackageRoutes,
    ...fleetRoutes,
    ...blogRoutes,
  ];
}
