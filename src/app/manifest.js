import { siteConfig } from "@/config/site.config";

export default function manifest() {
  return {
    name: "Manoj Tours and Travels — Manoj Taxi Service Bangalore",
    short_name: "Manoj Taxi",
    description:
      "24x7 cab and taxi service in Bangalore offering one way cabs, round trip cabs, local hourly packages, airport pickup & drop, and outstation tours.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "en-IN",
    categories: ["travel", "transportation", "business"],
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
