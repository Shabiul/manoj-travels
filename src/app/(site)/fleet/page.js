import { Suspense } from "react";
import { FleetHero } from "@/components/fleet/FleetHero";
import { FleetBookingExperience } from "@/components/fleet/FleetBookingExperience";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { fleet } from "@/data/fleet";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
];

export const metadata = buildMetadata({
  title: "Cab Fleet & Vehicle Rental in Bangalore",
  description:
    "Choose from our well-maintained Bangalore cab fleet — Swift Dzire, Toyota Etios, Toyota Innova, Innova Crysta, and Tempo Traveller. Book 24x7 local, airport, or outstation rides.",
  path: "/fleet",
  image: "/images/fleet/innova-crysta.png",
});

export default function FleetPage() {
  return (
    <>
      <FleetHero

        title="Choose a service, choose a vehicle, book"
        description="Every vehicle below is available to book directly — pick the service you need and the vehicle that fits your group."
      />
      <Section tone="paper">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-10">
          <Suspense fallback={null}>
            <FleetBookingExperience vehicles={fleet} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
