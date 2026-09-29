import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("outstation-cabs");

export const metadata = buildMetadata({
  title: "One Way Outstation Cabs from Bangalore — Pay One Side Only",
  description: `${service.summary} Book a one way drop taxi from Bangalore to Mysore, Tirupati, Chennai, Hyderabad, and 100+ cities with Manoj Tours and Travels. Available 24×7.`,
  path: "/services/outstation-cabs",
  keywords: [
    ...service.keywords,
    "one way outstation cab bangalore",
    "bangalore one side drop taxi",
    "intercity one way taxi bangalore",
  ],
  image: service.heroImage,
});


export default function OutstationCabsPage() {
  return <ServicePageContent service={service} />;
}
