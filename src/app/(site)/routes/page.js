import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { Accordion } from "@/components/ui/Accordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { routeGroups } from "@/data/routeGroups";

import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/metadata";
import { slugify } from "@/lib/utils";

const faqs = [generalFaqs[0], generalFaqs[4], generalFaqs[8], generalFaqs[6]];

// Short, factual per-region context — no invented claims, just naming the
// real destinations already covered in the region below.
const REGION_INTRO = {
  Karnataka:
    "Local, coastal and hill-station routes across Karnataka — from short hops near Bangalore to coastal getaways like Gokarna and Udupi.",
  "Tamil Nadu":
    "Hill stations, temple towns and coastal routes across Tamil Nadu, from Ooty and Kodaikanal to Kanyakumari.",
  "Andhra Pradesh & Telangana":
    "Pilgrimage and city routes to Andhra Pradesh and Telangana, including Tirupati, Mantralayam and Hyderabad.",
  Kerala: "Backwaters, hill stations and coastal towns across Kerala, including Munnar and Alleppey.",
  Goa: "Beach routes to North and South Goa.",
};

export const metadata = buildMetadata({
  title: "Outstation Taxi Routes from Bangalore",
  description:
    "One-way and round-trip outstation taxi routes from Bangalore across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala and Goa. Call or WhatsApp to check your route and fare.",
  path: "/routes",
  image: "/images/destinations/mysuru.png",
  keywords: [
    "bangalore outstation taxi routes",
    "bangalore to tamil nadu taxi",
    "bangalore to andhra pradesh taxi",
    "bangalore to kerala taxi",
    "bangalore one way drop taxi",
  ],
});

export default function RoutesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Routes", href: "/routes" },
  ];

  const regionsWithCounts = routeGroups.map((group) => ({
    ...group,
    slug: slugify(group.region),
    count: (group.featured?.length || 0) + (group.towns?.length || 0),
  }));

  return (
    <>
      <FAQSchema faqs={faqs} />

      <Section tone="ink" className="pt-32">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-8 max-w-2xl">
          <p className="text-eyebrow mb-4 text-[var(--color-accent-soft)]">Outstation Routes</p>
          <h1 className="text-balance text-h2 font-display text-[var(--color-text-on-dark)]">
            Outstation Taxi Routes from Bangalore
          </h1>
          <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">
            One-way and round-trip cabs from Bangalore to cities and towns across South India.
            Don&rsquo;t see your route listed? Call or WhatsApp us and we&rsquo;ll confirm availability
            and fare.
          </p>
        </div>

        {/* Quick region navigation — real in-page anchors, works without JS,
            horizontally scrollable on narrow screens. */}
        <nav aria-label="Jump to region" className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {regionsWithCounts.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              title={`Jump to ${group.region} taxi routes`}
              className="shrink-0 rounded-full border border-[var(--color-line-on-dark)] px-4 py-2 text-[14px] font-medium text-[var(--color-text-on-dark-muted)] transition-colors hover:border-[var(--color-accent-soft)] hover:text-[var(--color-text-on-dark)]"
            >
              {group.region} <span className="opacity-70">({group.count})</span>
            </a>
          ))}
        </nav>
      </Section>

      {regionsWithCounts.map((group, index) => (
        <Section key={group.region} id={group.slug} tone={index % 2 === 0 ? "paper" : "sand"}>
          <SectionHeading
            eyebrow={`${group.count} route${group.count === 1 ? "" : "s"}`}
            title={`Bangalore to ${group.region}`}
            description={REGION_INTRO[group.region]}
          />

          {group.featured?.length > 0 && (
            <div className="mt-10">
              <h3 className="text-[15px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                Popular Routes
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.featured.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={`Bangalore to ${item.name} taxi and cab service`}
                    className="group rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-lift)]"
                  >
                    <p className="text-[17px] font-display font-medium text-[var(--color-ink)]">
                      Bangalore → {item.name}
                    </p>
                    <p className="mt-1 text-[14px] text-[var(--color-text-muted)]">Taxi &amp; Cab Service</p>
                    <p className="mt-3 text-[14px] font-medium text-[var(--color-accent-2)] transition-transform duration-300 group-hover:translate-x-1">
                      Explore route →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {group.towns?.length > 0 && (
            <details className="mt-10 group/details">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-[15px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-ink)]">
                <span className="inline-block transition-transform duration-200 group-open/details:rotate-90">
                  ▶
                </span>
                More {group.region} Routes
                <span className="font-normal normal-case tracking-normal opacity-70">
                  ({group.towns.length})
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[14px] text-[var(--color-text-muted)]">
                These towns don&rsquo;t have a dedicated page yet — call or WhatsApp us to confirm
                availability and fare for any of them.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.towns.map((town) => (
                  <div
                    key={town}
                    className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3.5"
                  >
                    <p className="text-[15px] font-medium text-[var(--color-ink)]">Bangalore → {town}</p>
                    <p className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
                      Taxi route — call to confirm availability
                    </p>
                  </div>
                ))}
              </div>
            </details>
          )}
        </Section>
      ))}

      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Book Your Route"
            title="Don't see your exact route?"
            description="Every route is quoted based on distance, trip type (one-way, round trip or local) and vehicle. Share your pickup and drop points with us and we'll confirm the fare directly."
            className="mx-auto"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="accent" title="Enquire about custom outstation taxi route">
              Enquire About a Route
            </Button>
            <WhatsAppButton message="Hello Manoj Tours and Travels, I would like to check a taxi route and fare from Bangalore." />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="FAQ" title="Outstation Routes — Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
