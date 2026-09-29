import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";

import { Reveal } from "@/components/ui/Reveal";
import { Image } from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "FAQ", href: "/faq" },
];

export const metadata = buildMetadata({
  title: "Frequently Asked Questions — Cab & Taxi Hire Bangalore",
  description:
    "Clear answers to common questions about booking, outstation fares, 24x7 availability, Kempegowda airport cabs and vehicles with Manoj Tours and Travels.",
  path: "/faq",
  image: "/images/destinations/sakleshpura.png",
});

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={generalFaqs} />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything customers commonly ask before booking with Manoj Tours and Travels."
        image="/images/destinations/sakleshpura.png"
        imageAlt="Sakleshpur"
      />
      <Section tone="paper">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Accordion items={generalFaqs} />

        <Reveal delay={120} className="relative hidden self-start overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] lg:block">
          <div className="relative h-64">
            <Image src="/gallery/gallery-06.jpg" alt="Manoj Tours and Travels vehicle on the road" wrapperClassName="h-64" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/20 to-transparent" />
          </div>
          <div className="glass-dark p-6">
            <p className="font-display text-xl text-[var(--color-text-on-dark)]">Still have a question?</p>
            <p className="mt-2 text-[15px] text-[var(--color-text-on-dark-muted)]">
              Call or WhatsApp us directly and we&rsquo;ll help you plan the trip.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Button href="/contact" variant="accent" className="w-full">
                Contact Us
              </Button>
              <WhatsAppButton className="w-full" />
            </div>
          </div>
        </Reveal>
      </div>
      </Section>
    </>
  );
}
