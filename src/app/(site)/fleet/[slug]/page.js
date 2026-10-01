import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { VehicleSchema } from "@/components/seo/VehicleSchema";

import { VehicleDetails } from "@/components/fleet/VehicleDetails";
import { fleet, getFleetBySlug } from "@/data/fleet";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return fleet.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const vehicle = getFleetBySlug(resolvedParams.slug);
  if (!vehicle) return {};
  return buildMetadata({
    title: `${vehicle.name} — ${vehicle.category} Cab Hire in Bangalore`,
    description: `${vehicle.description} Book ${vehicle.name} for local, outstation and airport taxi service with Manoj Tours and Travels Bangalore.`,
    path: `/fleet/${vehicle.slug}`,
    image: vehicle.image,
  });
}

export default async function FleetVehiclePage({ params }) {
  const resolvedParams = await params;
  const vehicle = getFleetBySlug(resolvedParams.slug);
  if (!vehicle) notFound();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Fleet", href: "/fleet" },
    { label: vehicle.name, href: `/fleet/${vehicle.slug}` },
  ];

  return (
    <>
      <VehicleSchema vehicle={vehicle} />
      <Section tone="paper" className="pt-36 md:pt-44">

        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-8">
          <VehicleDetails vehicle={vehicle} />
        </div>
      </Section>
    </>
  );
}

