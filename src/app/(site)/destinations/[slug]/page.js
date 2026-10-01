import { notFound } from "next/navigation";
import { DestinationHero } from "@/components/destinations/DestinationHero";
import { DestinationDetails } from "@/components/destinations/DestinationDetails";
import { DestinationFAQ, buildDestinationFaqs } from "@/components/destinations/DestinationFAQ";
import { DestinationGrid } from "@/components/destinations/DestinationGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DestinationSchema } from "@/components/seo/DestinationSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { destinations, getDestinationBySlug } from "@/data/destinations";

import { getKeywordEntryByHref } from "@/data/destinationKeywords";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const destination = getDestinationBySlug(resolvedParams.slug);
  if (!destination) return {};
  return buildMetadata({
    title: `Bangalore to ${destination.name} Taxi & Cab Service`,
    description: `${destination.description} Book a one-way, round-trip or local taxi from Bangalore to ${destination.name}, or ${destination.name} to Bangalore, with Manoj Tours and Travels — sedan and SUV options, available 24×7.`,
    path: `/destinations/${destination.slug}`,
    keywords: destination.keywords,
    image: destination.image,
  });
}

export default async function DestinationPage({ params }) {
  const resolvedParams = await params;
  const destination = getDestinationBySlug(resolvedParams.slug);
  if (!destination) notFound();

  const related = destinations.filter((d) => d.slug !== destination.slug).slice(0, 3);
  const keywordEntry = getKeywordEntryByHref(`/destinations/${destination.slug}`);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: destination.name, href: `/destinations/${destination.slug}` },
  ];

  return (
    <>
      <DestinationSchema destination={destination} />
      <FAQSchema faqs={buildDestinationFaqs(destination)} />


      <DestinationHero
        title={destination.name}
        description={destination.region}
        image={destination.image}
        imageAlt={`Bangalore to ${destination.name} taxi service`}
      />
      <Section tone="paper">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-8">
          <DestinationDetails destination={destination} />
        </div>

        {keywordEntry?.phrases?.length > 0 && (
          <div className="mt-10 border-t border-[var(--color-line)] pt-8">
            <p className="mb-3 text-[13px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              Also searched as
            </p>
            <div className="flex flex-wrap gap-2">
              {keywordEntry.phrases.map((phrase) => (
                <span
                  key={phrase}
                  className="rounded-[var(--radius-sm)] bg-[var(--color-paper-2)] px-3 py-1.5 text-[13.5px] text-[var(--color-text-muted)]"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="FAQ" title={`Travelling to ${destination.name}`} />
        <div className="mt-8 max-w-3xl">
          <DestinationFAQ destination={destination} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Explore More" title="Other popular destinations" />
        <div className="mt-8">
          <DestinationGrid destinations={related} />
        </div>
        <div className="mt-8 text-center">
          <a
            href="/routes"
            title="See all outstation taxi routes from Bangalore"
            className="text-[15px] font-medium text-[var(--color-accent)] underline underline-offset-4"
          >
            See all outstation taxi routes from Bangalore →
          </a>
        </div>
      </Section>
    </>
  );
}
