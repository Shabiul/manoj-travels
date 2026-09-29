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
    { path: "", priority: 1.0, changeFrequency: "daily" },
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
  }));

  // 4 Core Cab Services (One-way, Round trip, Local, Airport)
  const serviceRoutes = services.map((s) => ({
    url: url(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dedicated Destination Pages
  const destinationRoutes = destinations.map((d) => ({
    url: url(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Vehicle Fleet Pages
  const fleetRoutes = fleet.map((v) => ({
    url: url(`/fleet/${v.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Tour Package Detail Pages
  const tourPackageRoutes = tourPackages
    .filter((p) => p.active !== false)
    .map((p) => ({
      url: url(`/tours-packages/${p.id}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

  // Travel Guides and Blog Posts
  const blogRoutes = blogPosts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
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
