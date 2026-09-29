import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("round-trip-cabs");

export const metadata = buildMetadata({
  title: "Outstation Round Trip Cabs Bangalore — Per Km Billing",
  description: `${service.summary} Transparent per-km rates with 300 km/day minimum running for tours to Ooty, Coorg, Munnar, Chikmagalur and Kerala. Call +91 78997 87478.`,
  path: "/services/round-trip-cabs",
  keywords: [
    ...service.keywords,
    "outstation round trip cab bangalore",
    "round trip taxi bangalore per km",
    "outstation taxi rental bangalore",
  ],
  image: service.heroImage,
});


export default function RoundTripCabsPage() {
  return <ServicePageContent service={service} />;
}
