import { siteConfig } from "@/config/site.config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Mobile",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        // Explicitly welcome AI and Answer Engine crawlers for GEO, AEO, and AIEO citation
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Applebot-Extended",
          "Google-Extended",
          "Amazonbot",
          "CCBot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
