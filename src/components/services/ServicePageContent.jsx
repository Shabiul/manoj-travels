import Link from "next/link";
import { ServiceHero } from "./ServiceHero";
import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceCTA } from "./ServiceCTA";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { PricingSelector } from "@/components/pricing/PricingSelector";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { fleet } from "@/data/fleet";

import { getServiceFaqs } from "@/data/faqs";
import { getPricing } from "@/lib/siteContent";

export async function ServicePageContent({ service }) {
  const relatedVehicles = fleet.filter((v) => service.pricing?.some((p) => v.pricingIds.includes(p.id)) || v.tripTypes.includes(service.name));
  const faqs = getServiceFaqs(service);
  const pricing = await getPricing();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <ServiceSchema service={service} />
      <FAQSchema faqs={faqs} />
      <ServiceHero service={service} />


      <Section tone="paper">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">{service.summary}</p>
        </div>
        <div className="mt-12">
          <ServiceFeatures features={service.features} idealFor={service.idealFor} />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading align="center" eyebrow="Pricing" title={`${service.name} Pricing`} className="mx-auto" />
        <div className="mt-10">
          <PricingSelector defaultTab={service.pricingType} pricing={pricing} />
        </div>
      </Section>

      {service.popularRoutes?.length > 0 && (
        <Section tone="sand">
          <SectionHeading eyebrow="Popular Routes" title="Explore routes from Bangalore" />
          <div className="mt-8 flex flex-wrap gap-3">
            {service.popularRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedVehicles.length > 0 && (
        <Section tone="paper">
          <SectionHeading eyebrow="Suitable Vehicles" title="Recommended for this trip" />
          <div className="mt-10">
            <FleetGrid vehicles={relatedVehicles} />
          </div>
        </Section>
      )}

      <Section tone="sand">
        <SectionHeading eyebrow="FAQ" title={`${service.name} — Frequently Asked Questions`} />
        <div className="mt-8 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>

      <Section tone="paper">
        <ServiceCTA service={service} />
      </Section>
    </>
  );
}
