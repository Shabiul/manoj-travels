import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationEditorialGrid } from "@/components/destinations/DestinationEditorialGrid";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";

// Display top 6 premier destinations on homepage for an optimized mobile DOM size
// and fast rendering, with direct links to browse all 28 on /destinations.
export function DestinationsSection() {
  const featuredDestinations = destinations.slice(0, 6);

  return (
    <Section tone="ink" id="destinations">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          tone="dark"
          eyebrow="Tours & Packages"
          title="Featured destinations"
        />
        <Button href="/destinations" variant="outline-dark" size="sm" className="shrink-0">
          View All Destinations
        </Button>
      </div>
      <div className="mt-10">
        <DestinationEditorialGrid destinations={featuredDestinations} />
      </div>
      <div className="mt-10 text-center">
        <Button href="/destinations" variant="outline-dark" size="lg">
          Explore All {destinations.length} Destinations &rarr;
        </Button>
      </div>
    </Section>
  );
}
