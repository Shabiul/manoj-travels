import { Section } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";

import { services } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

export const metadata = buildMetadata({
  title: "Cab & Taxi Services in Bangalore — 24x7 Booking",
  description:
    "One way cabs, round trip cabs, local hourly cab packages and Kempegowda airport transfers with Manoj Tours and Travels — 24x7 across Bangalore, Karnataka.",
  path: "/services",
  image: "/images/destinations/ooty.png",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero

        eyebrow="Services"
        title="Cab services built around how you travel"
        description="One way drops, outstation round trips, local packages and airport transfers — all with transparent pricing."
        image="/images/destinations/ooty.png"
        imageAlt="Ooty"
      />
      <Section tone="paper">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-10">
          <ServiceGrid services={services} />
        </div>
      </Section>
    </>
  );
}
