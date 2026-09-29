import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("local-cabs");

export const metadata = buildMetadata({
  title: "Local Cab Booking Bangalore — 8hr/80km Hourly Packages",
  description: `${service.summary} Transparent hourly packages in Bangalore for local sightseeing and city errands. Call +91 78997 87478.`,
  path: "/services/local-cabs",
  keywords: [
    ...service.keywords,
    "bangalore local cab package",
    "8 hours 80 km cab bangalore",
    "hourly car rental bangalore with driver",
  ],
  image: service.heroImage,
});


export default function LocalCabsPage() {
  return <ServicePageContent service={service} />;
}
