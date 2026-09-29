import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { CinematicSection } from "@/components/home/CinematicSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
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
      <ServicesSection />
      <WhySection />
      <DestinationsSection />
      <CinematicSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

