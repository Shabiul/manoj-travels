import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <Section tone="paper" id="services">
      <SectionHeading
        eyebrow="What We Offer"
        title="A cab for every kind of journey"
      />
      <div className="mt-10">
        <ServiceGrid services={services} />
      </div>

      {/* High-Volume Corridor Internal Link Banner */}
      <div className="mt-12 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-sand)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-2)]">
            Corridor Route Spotlight (2026)
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-[var(--color-ink)]">
            Travelling from Bangalore to Mysore?
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Read complete 2026 tariffs, expressway toll charges (NH275), vehicle options, and one-way drop rates from ₹2,499.
          </p>
        </div>
        <div className="mt-4 shrink-0 sm:mt-0">
          <Link
            href="/blog/bangalore-to-mysore-cab-guide"
            title="Read our complete Bangalore to Mysore Cab Fare & Route Guide"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)] transition-all hover:bg-[var(--color-ink-2)] hover:shadow-[var(--shadow-lift)]"
          >
            Read our complete Bangalore to Mysore Cab Fare &amp; Route Guide →
          </Link>
        </div>
      </div>
    </Section>
  );
}
