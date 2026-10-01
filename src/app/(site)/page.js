import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { CinematicSection } from "@/components/home/CinematicSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { Section } from "@/components/ui/Section";
import { FareEstimator } from "@/components/common/FareEstimator";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { buildMetadata } from "@/lib/metadata";
import { generalFaqs } from "@/data/faqs";

export const metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={generalFaqs} />
      <Hero />
      <Intro />
      <Section id="fare-estimator" tone="sand" className="py-12 md:py-16 border-y border-[var(--color-line)]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-2)]">
              Instant Price Transparency
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
              Plan Your Journey with Our Bangalore Fare Estimator
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
              Select your pickup neighborhood, destination corridor, and vehicle for instant mileage, travel time, and transparent pricing.
            </p>
          </div>
          <FareEstimator />
        </div>
      </Section>
      <ServicesSection />
      <WhySection />
      <DestinationsSection />
      <CinematicSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

