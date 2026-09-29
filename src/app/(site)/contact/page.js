import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContactHero } from "@/components/common/ContactHero";

import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getBusinessInfo } from "@/lib/siteContent";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export const metadata = buildMetadata({
  title: "Contact 24x7 Cab Booking Bangalore",
  description:
    "Contact Manoj Tours and Travels (Manoj Taxi Service) in Bangalore — call +91 78997 87478, WhatsApp or send an online enquiry. Available 24x7 for local, airport, and outstation cabs.",
  path: "/contact",
});

export default async function ContactPage() {
  const business = await getBusinessInfo();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`;

  const details = [
    {
      label: "Primary Phone",
      value: business.phone.primaryDisplay,
      href: `tel:+91${business.phone.primary}`,
    },
    {
      label: "Alternate Phone",
      value: business.phone.secondaryDisplay,
      href: `tel:+91${business.phone.secondary}`,
    },
    {
      label: "Email",
      value: business.email,
      href: `mailto:${business.email}`,
    },
    {
      label: "Address",
      value: business.address.full,
      href: mapsLink,
    },
  ];

  return (
    <>
      <ContactHero />


      <Section tone="paper">
      <Breadcrumbs items={breadcrumbItems} />

      <SectionHeading
        className="mt-6"
        eyebrow="Reach Us"
        title="Call, WhatsApp, or send an enquiry"
        description="We're available 24 × 7 — reach us however is easiest for you."
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal>
        <div>
          <dl className="space-y-6">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-[14px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {d.label}
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={d.href}
                    target={d.label === "Address" ? "_blank" : undefined}
                    rel={d.label === "Address" ? "noopener noreferrer" : undefined}
                    className="text-[19px] text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-accent-2)]"
                  >
                    {d.value}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-[14px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                Availability
              </dt>
              <dd className="mt-1.5 text-[19px] font-medium text-[var(--color-accent-2)]">{business.availabilityLabel}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <WhatsAppButton />
          </div>

          <div className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)]">
            <iframe
              title="Manoj Tours and Travels location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(business.address.full)}&output=embed`}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
      </Section>
    </>
  );
}
