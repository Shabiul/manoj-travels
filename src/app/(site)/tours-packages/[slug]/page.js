import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { TourPackageSchema } from "@/components/seo/TourPackageSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { tourPackages } from "@/data/tourPackages";

import { destinations } from "@/data/destinations";
import { getAllTourPackages } from "@/lib/siteContent";
import { pricingNotes } from "@/data/pricing";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 60;

export function generateStaticParams() {
  return tourPackages.map((p) => ({ slug: p.id }));
}

async function getPackage(slug) {
  const all = await getAllTourPackages();
  return all.find((p) => p.id === slug && p.active !== false) || null;
}

export async function generateMetadata({ params }) {
  const pkg = await getPackage(params.slug);
  if (!pkg) return {};
  const relatedDest = destinations.find((d) => pkg.id.includes(d.slug));
  return buildMetadata({
    title: pkg.title,
    description: `${pkg.description} Book with Manoj Tours and Travels — sedan, SUV and Tempo Traveller options, available 24×7.`,
    path: `/tours-packages/${pkg.id}`,
    image: pkg.image || relatedDest?.image,
  });
}

const faqs = [
  {
    question: "How is the fare for this package calculated?",
    answer:
      "Round trip packages are billed per kilometre travelled, with a minimum daily running of 300 km and a daily driver allowance — see our Round Trip Cabs page for exact per-km rates by vehicle.",
  },
  {
    question: "What is included in the itinerary?",
    answer:
      "This is a round-trip cab package — you decide the stops and duration, and we provide the vehicle and driver for the trip. Share your planned dates and stops and we'll confirm the vehicle and fare.",
  },
  {
    question: "How do I book this package?",
    answer: "Call or WhatsApp us, or submit an enquiry on this page, and we'll confirm your booking and vehicle.",
  },
];

export default async function TourPackageDetailPage({ params }) {
  const pkg = await getPackage(params.slug);
  if (!pkg) notFound();

  const relatedDestination = destinations.find((d) => pkg.id.includes(d.slug));
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours & Packages", href: "/tours-packages" },
    { label: pkg.title, href: `/tours-packages/${pkg.id}` },
  ];

  return (
    <>
      <TourPackageSchema pkg={pkg} />
      <FAQSchema faqs={faqs} />


      {pkg.image ? (
        <PageHero
          eyebrow="Tour Package"
          title={pkg.title}
          description={pkg.description}
          image={pkg.image}
          imageAlt={pkg.title}
        />
      ) : (
        <Section tone="ink" className="pt-32">
          <p className="text-eyebrow text-[var(--color-accent-soft)]">Tour Package</p>
          <h1 className="text-balance text-h2 mt-4 max-w-2xl font-display text-[var(--color-text-on-dark)]">
            {pkg.title}
          </h1>
          <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">{pkg.description}</p>
        </Section>
      )}
      <Section tone="paper">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-body text-[var(--color-text-muted)]">{pkg.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {pkg.state && <Badge>{pkg.state}</Badge>}
              {pkg.category && <Badge>{pkg.category}</Badge>}
              {pkg.duration && <Badge>{pkg.duration}</Badge>}
            </div>

            {relatedDestination && (
              <p className="mt-6 text-[15px] text-[var(--color-text-muted)]">
                See the full{" "}
                <a
                  href={`/destinations/${relatedDestination.slug}`}
                  className="font-medium text-[var(--color-accent-2)] underline underline-offset-4"
                >
                  {relatedDestination.name} destination guide
                </a>{" "}
                for route details and fare guidance.
              </p>
            )}

            {pkg.vehicleTypes?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-card-title font-display text-[var(--color-ink)]">Vehicle Options</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.vehicleTypes.map((v) => (
                    <Badge key={v}>{v}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-card-title font-display text-[var(--color-ink)]">Pricing</h2>
              <p className="mt-3 text-[17px] text-[var(--color-text-muted)]">
                {pkg.price ? `${pkg.price} ${pkg.priceUnit || ""}` : "Price on request — fare depends on route, duration and vehicle."}
              </p>
              <ul className="mt-4 space-y-2 text-[15px] text-[var(--color-text-muted)]">
                {pricingNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-light h-fit rounded-[var(--radius-lg)] p-7">
            <h2 className="text-card-title font-display text-[var(--color-ink)]">Enquire About This Package</h2>
            <p className="mt-2.5 text-[17px] text-[var(--color-text-muted)]">
              Share your travel dates and group size — we&rsquo;ll suggest the right vehicle and share the fare.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/contact" variant="accent" className="w-full">
                Enquire Now
              </Button>
              <WhatsAppButton
                message={`Hello Manoj Tours and Travels, I would like to enquire about the "${pkg.title}" package.`}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
