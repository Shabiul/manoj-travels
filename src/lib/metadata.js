import { defaultSeo } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { business } from "@/config/business.config";

/**
 * Build a robust, indexable Next.js Metadata object for any route.
 * Optimized for Google Search Console, OpenGraph, Twitter, GEO & AEO search engines.
 * 
 * @param {{
 *   title?: string,
 *   description?: string,
 *   path?: string,
 *   keywords?: string[],
 *   image?: string,
 *   type?: "website" | "article",
 *   noIndex?: boolean
 * }} opts
 */
export function buildMetadata({
  title,
  description = defaultSeo.description,
  path = "/",
  keywords,
  image,
  type = "website",
  noIndex = false,
} = {}) {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteConfig.url}${cleanPath}`;
  const pageTitle = title
    ? `${title} | ${business.legalName}`
    : defaultSeo.defaultTitle;

  const ogImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${siteConfig.url}${image.startsWith("/") ? image : `/${image}`}`
    : `${siteConfig.url}/opengraph-image`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: title || defaultSeo.defaultTitle,
    description,
    keywords: keywords || defaultSeo.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN": canonicalUrl,
        en: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article"
        ? {
            publishedTime: "2025-01-15T09:00:00+05:30",
            modifiedTime: "2026-03-29T10:00:00+05:30",
            authors: ["Manoj Kumar"],
            section: "Bangalore Taxi & Outstation Travel",
          }
        : {}),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImageUrl],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "googlee8b15d2a93b4f62e",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
    other: {
      "geo.region": "IN-KA",
      "geo.placename": "Bangalore",
      "geo.position": `${business.geo.latitude};${business.geo.longitude}`,
      ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
      "format-detection": "telephone=yes",
    },
  };
}
