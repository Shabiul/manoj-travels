import { DestinationHero } from "@/components/destinations/DestinationHero";
import { DestinationEditorialGrid } from "@/components/destinations/DestinationEditorialGrid";
import { DestinationDirectory } from "@/components/destinations/DestinationDirectory";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { destinations } from "@/data/destinations";

import { destinationDirectory } from "@/data/destinationDirectory";
import { buildMetadata } from "@/lib/metadata";


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
];

export const metadata = buildMetadata({
  title: "Destinations & Routes from Bangalore",
  description:
    "Browse destinations and outstation cab routes from Bangalore — hill stations, coastal towns, heritage cities and pilgrimage destinations across South India. Search by name or category.",
  path: "/destinations",
  image: "/images/destinations/conoor.png",
});

export default function DestinationsPage() {
  return (
    <>
      <DestinationHero


        title="Destinations from Bangalore"
        description="Round trips, one-way drops and tour packages to Karnataka's hill stations, coastal towns and beyond, plus popular pilgrimage and heritage routes across South India."
        image="/images/destinations/conoor.png"
      />
      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }]} />

        <div className="mt-10">
          <SectionHeading eyebrow="Featured" title="Featured Destinations" />
          <div className="mt-8">
            <DestinationEditorialGrid destinations={destinations} />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading
          eyebrow="Full Coverage"
          title="Every destination we're asked about"
          description="Search or filter by category to find your route. Destinations with a dedicated page link straight through; the rest are shown for reference — call or WhatsApp to confirm."
        />
        <div className="mt-10">
          <DestinationDirectory items={destinationDirectory} />
        </div>

        <div className="mt-8 rounded-[var(--radius-lg)] bg-[var(--color-paper-2)] px-6 py-5 text-center">
          <p className="text-[15px] text-[var(--color-text-muted)]">
            Don&rsquo;t see your town? We cover every district and taluk across Karnataka —{" "}
            <a href="/routes" className="font-medium text-[var(--color-accent-2)] underline underline-offset-4">
              see our full coverage list
            </a>
            , or just share your pickup and drop points.
          </p>
        </div>
      </Section>
    </>
  );
}
