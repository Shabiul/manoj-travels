import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("airport-pickup-drop");

export const metadata = buildMetadata({
  title: "Bangalore Airport Taxi — 24x7 Kempegowda Airport Pickup & Drop",
  description: `${service.summary} Available 24×7 across Bangalore with sedan and SUV cabs. Call +91 78997 87478 for on-time airport transfers.`,
  path: "/services/airport-pickup-drop",
  keywords: [
    ...service.keywords,
    "bangalore airport taxi 24x7",
    "kempegowda airport cab pickup",
    "airport drop taxi bangalore",
  ],
  image: service.heroImage,
});


export default function AirportPickupDropPage() {
  return <ServicePageContent service={service} />;
}
