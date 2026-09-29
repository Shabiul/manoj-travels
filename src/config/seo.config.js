import { business } from "./business.config";
import { siteConfig } from "./site.config";

export const defaultSeo = {
  titleTemplate: `%s | ${business.legalName}`,
  defaultTitle: `${business.legalName} | ${business.tradeName} — 24x7 Cab & Taxi Service in Bangalore`,
  description: `${business.legalName} (${business.tradeName}) provides reliable 24x7 one way cabs, round trip cabs, local hourly packages, airport pickup & drop, and outstation tours across Bangalore, Karnataka, and South India. Call ${business.phone.primaryDisplay} for instant booking.`,
  keywords: [
    "Manoj Tours and Travels",
    "Manoj Taxi Service",
    "taxi service in Bangalore",
    "cab service in Bangalore",
    "airport taxi Bangalore",
    "Bangalore airport pickup and drop",
    "Kempegowda international airport cab",
    "one way cab Bangalore",
    "outstation cab Bangalore",
    "outstation taxi Bangalore",
    "round trip taxi Bangalore",
    "local cab Bangalore",
    "hourly cab booking Bangalore",
    "Bangalore to Mysore taxi",
    "Bangalore to Ooty cab",
    "Bangalore to Coorg taxi",
    "Bangalore to Tirupati cab",
    "Innova Crysta rental Bangalore",
    "Tempo Traveller for rent Bangalore",
    "South India tour packages from Bangalore",
  ],
  siteUrl: siteConfig.url,
};

