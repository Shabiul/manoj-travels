import { business, mapsLink, whatsappLink } from "@/config/business.config";
import { siteConfig } from "@/config/site.config";

const url = (path = "") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Enhanced LocalBusiness / TaxiService / TravelAgency Schema
 * Boosts Google Maps, Local Pack, Knowledge Panel, and GEO attribution.
 */
export function localBusinessSchema() {
  const serviceAreas = [
    "Bangalore",
    "Kanakapura Road",
    "Kaggalipura",
    "Banashankari",
    "JP Nagar",
    "Jayanagar",
    "Electronic City",
    "Whitefield",
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "BTM Layout",
    "Marathahalli",
    "Bellandur",
    "Sarjapur Road",
    "Hebbal",
    "Yelahanka",
    "Kempegowda International Airport (BLR)",
    "Karnataka",
    "South India",
    "Mysore",
    "Ooty",
    "Coorg",
    "Chikmagalur",
    "Tirupati",
    "Chennai",
    "Hyderabad",
    "Wayanad",
    "Munnar",
    "Alleppey",
    "Pondicherry",
    "Gokarna",
    "Mangalore",
    "Udupi",
    "Coimbatore",
    "Salem",
    "Kanyakumari",
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "TravelAgency", "LocalBusiness"],
    "@id": url("/#business"),
    name: business.legalName,
    alternateName: business.tradeName,
    legalName: business.legalName,
    description: business.description,
    url: siteConfig.url,
    telephone: business.phone.primaryIntl,
    email: business.email,
    founder: {
      "@type": "Person",
      "@id": url("/about#founder"),
      name: "Manoj Kumar",
      jobTitle: "Founder & Operations Head",
      url: url("/about"),
    },
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card, Net Banking",
    image: [url("/opengraph-image"), url("/icon")],
    logo: url("/icon"),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}, ${business.address.line3}`,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: business.address.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: serviceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cab & Taxi Services in Bangalore",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "One Way Cabs",
          description: "One-side outstation drops where you pay only for distance travelled.",
        },
        {
          "@type": "OfferCatalog",
          name: "Round Trip Outstation Cabs",
          description: "Per kilometre round trips across Karnataka, Tamil Nadu, Andhra Pradesh, Kerala and Goa.",
        },
        {
          "@type": "OfferCatalog",
          name: "Local Hourly Packages",
          description: "8 hours / 80 km local sightseeing and city errand cabs in Bangalore.",
        },
        {
          "@type": "OfferCatalog",
          name: "Bangalore Airport Pickup & Drop",
          description: "24x7 transfers to and from Kempegowda International Airport.",
        },
      ],
    },
    knowsAbout: [
      "Taxi service in Bangalore",
      "Bangalore airport taxi 24x7",
      "Bangalore airport pickup and drop",
      "Kempegowda International Airport cabs",
      "Outstation cabs Bangalore",
      "One way cab Bangalore",
      "Round trip cabs Bangalore",
      "Local hourly cab packages Bangalore 8 hours 80 km",
      "Bangalore to Mysore taxi",
      "Bangalore to Ooty cab",
      "Bangalore to Coorg taxi",
      "Bangalore to Tirupati cab",
      "Bangalore to Chikmagalur outstation taxi",
      "Bangalore to Wayanad cab service",
      "Bangalore to Munnar round trip taxi",
      "Bangalore to Chennai one way drop taxi",
      "Bangalore to Hyderabad outstation cab",
      "South India tour packages from Bangalore",
      "Innova Crysta rental Bangalore",
      "Tempo Traveller hire Bangalore",
      "Toyota Etios outstation cab",
      "Swift Dzire taxi Bangalore",
    ],
    sameAs: [mapsLink, whatsappLink()],
  };
}

/**
 * Organization Schema with 24x7 Multi-lingual Contact Points
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": url("/#organization"),
    name: business.legalName,
    alternateName: business.tradeName,
    url: siteConfig.url,
    logo: url("/icon"),
    image: url("/opengraph-image"),
    telephone: business.phone.primaryIntl,
    email: business.email,
    founder: {
      "@type": "Person",
      "@id": url("/about#founder"),
      name: "Manoj Kumar",
      jobTitle: "Founder & Managing Director",
      url: url("/about"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}, ${business.address.line3}`,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: business.address.state,
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phone.primaryIntl,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "kn", "hi", "te", "ta"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: business.phone.secondaryIntl,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["en", "kn", "hi"],
      },
    ],
  };
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": url("/#website"),
    url: siteConfig.url,
    name: business.legalName,
    alternateName: business.tradeName,
    inLanguage: "en-IN",
    publisher: { "@id": url("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/destinations?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * FAQPage Schema for Voice and Answer Engine Optimization (AEO)
 */
export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema for Rich Search Snippets
 */
export function breadcrumbSchema(items) {
  if (!items?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: url(item.href),
    })),
  };
}

/**
 * Service Schema for Core Cab Offerings
 */
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url(`/services/${service.slug}#service`),
    name: service.name,
    serviceType: service.name,
    provider: { "@id": url("/#business") },
    areaServed: business.areaServed.map((name) => ({ "@type": "Place", name })),
    description: service.summary,
    url: url(`/services/${service.slug}`),
    termsOfService: url("/faq"),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Features`,
      itemListElement: service.features?.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f,
        },
      })),
    },
  };
}

/**
 * Destination Schema (TouristDestination + Service)
 */
export function destinationSchema(destination) {
  return {
    "@context": "https://schema.org",
    "@type": ["TouristDestination", "Service"],
    "@id": url(`/destinations/${destination.slug}#destination`),
    name: `Bangalore to ${destination.name} Taxi Service`,
    description: destination.description,
    provider: { "@id": url("/#business") },
    serviceType: `Bangalore to ${destination.name} Cab & Taxi`,
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      { "@type": "Place", name: destination.name },
    ],
    image: destination.image ? url(destination.image) : url("/opengraph-image"),
    url: url(`/destinations/${destination.slug}`),
    touristType: ["Solo Travellers", "Families", "Corporate", "Pilgrims"],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: url(`/destinations/${destination.slug}`),
      seller: { "@id": url("/#business") },
    },
  };
}

/**
 * Tour Package Schema (TouristTrip)
 */
export function tourPackageSchema(pkg) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": url(`/tours-packages/${pkg.id}#trip`),
    name: pkg.title,
    description: pkg.description,
    url: url(`/tours-packages/${pkg.id}`),
    image: pkg.image ? url(pkg.image) : url("/opengraph-image"),
    provider: { "@id": url("/#business") },
    touristType: ["Families", "Couples", "Solo Travellers", "Pilgrims", "Corporate Groups"],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: url(`/tours-packages/${pkg.id}`),
      seller: { "@id": url("/#business") },
    },
  };
}

/**
 * Vehicle / Car Schema for Fleet Pages
 */
export function vehicleSchema(vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": ["Car", "Product"],
    "@id": url(`/fleet/${vehicle.slug}#vehicle`),
    name: `${vehicle.name} — Cab Hire in Bangalore`,
    model: vehicle.name,
    category: vehicle.category,
    seatingCapacity: vehicle.capacity,
    description: vehicle.description,
    image: vehicle.image ? url(vehicle.image) : url("/opengraph-image"),
    url: url(`/fleet/${vehicle.slug}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: url(`/fleet/${vehicle.slug}`),
      seller: { "@id": url("/#business") },
    },
  };
}

/**
 * Article / BlogPosting Schema for Travel Guides with Author & Date Markup
 * Optimizes E-E-A-T trust signals and AI engine citation provenance.
 */
export function articleSchema({
  title,
  description,
  image,
  slug,
  datePublished = "2025-01-15T09:00:00+05:30",
  dateModified = "2026-03-29T10:00:00+05:30",
  authorName = "Manoj Kumar",
  authorRole = "Founder & Route Operations Specialist",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url(`/blog/${slug}#article`),
    headline: title,
    description,
    image: image ? url(image) : url("/opengraph-image"),
    url: url(`/blog/${slug}`),
    datePublished,
    dateModified,
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url(`/blog/${slug}`),
    },
    author: {
      "@type": "Person",
      "@id": url("/about#founder"),
      name: authorName,
      jobTitle: authorRole,
      url: url("/about"),
      description: "Founder and route specialist at Manoj Tours and Travels with 12+ years of verified Bangalore cab logistics and South India highway experience.",
      worksFor: {
        "@type": "Organization",
        "@id": url("/#organization"),
        name: business.legalName,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": url("/#organization"),
      name: business.legalName,
      logo: {
        "@type": "ImageObject",
        url: url("/icon"),
      },
    },
  };
}

/**
 * Author / Founder Person Schema for E-E-A-T and Knowledge Graph
 */
export function authorPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url("/about#founder"),
    name: "Manoj Kumar",
    jobTitle: "Founder & Operations Head",
    worksFor: { "@id": url("/#organization") },
    url: url("/about"),
    description: "Founder and route specialist at Manoj Tours and Travels with over 12 years of hands-on experience in Bangalore local cabs, airport transfers, and South India outstation highway travel.",
    knowsAbout: [
      "Bangalore Taxi Logistics",
      "Kempegowda International Airport Transfers",
      "Karnataka Outstation Corridors",
      "Interstate Permits & FASTag Tolls",
      "Fleet Safety and Regulatory Compliance",
    ],
  };
}

/**
 * Legal / Policy WebPage Schema with Published & Modified Dates
 */
export function legalPageSchema({ title, description, path, datePublished, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url(`${path}#webpage`),
    name: title,
    description,
    url: url(path),
    datePublished: datePublished || "2024-01-01T00:00:00+05:30",
    dateModified: dateModified || "2026-03-29T10:00:00+05:30",
    inLanguage: "en-IN",
    publisher: { "@id": url("/#organization") },
  };
}

/**
 * Review / UserReview Schema for Testimonials
 */
export function reviewListSchema(testimonials) {
  if (!testimonials?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Customer Reviews for Manoj Tours and Travels",
    itemListElement: testimonials.map((t, index) => ({
      "@type": "Review",
      position: index + 1,
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewBody: t.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: { "@id": url("/#business") },
    })),
  };
}
