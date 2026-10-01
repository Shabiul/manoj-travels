import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";

import { Reveal } from "@/components/ui/Reveal";
import { Video } from "@/components/ui/Video";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { AboutKanyakumariImage } from "@/components/about/AboutKanyakumariImage";
import { business } from "@/config/business.config";
import { buildMetadata } from "@/lib/metadata";
import { authorPersonSchema } from "@/lib/structured-data";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export const metadata = buildMetadata({
  title: "About Manoj Tours & Travels Bangalore",
  description:
    "Manoj Tours and Travels (Manoj Taxi Service) is a 24x7 taxi and cab service based in Kaggalipura, Bangalore, offering one way, round trip, local and airport cabs across Karnataka and South India.",
  path: "/about",
  image: "/images/destinations/pondicherry.png",
});

const values = [
  {
    title: "One business, two names",
    detail: "Manoj Tours and Travels and Manoj Taxi Service are the same company — you'll see both names used interchangeably.",
  },
  {
    title: "Bangalore based",
    detail: "We operate out of Kaggalipura, Kanakapura Road, Bangalore, serving local, outstation and airport routes across Karnataka and beyond.",
  },
  {
    title: "Available 24 × 7",
    detail: "Whether it's an early flight or a late-night pickup, we're reachable around the clock.",
  },
  {
    title: "A fleet for every trip",
    detail: "From a compact sedan for a quick city run to a Tempo Traveller for a large family tour, we match the vehicle to your journey.",
  },
];

export default function AboutPage() {
  const personSchema = authorPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <PageHero


        eyebrow="About Us"
        title="A straightforward cab service, run from Bangalore"
        description={`${business.legalName}, also known as ${business.tradeName}, offers one way cabs, round trip cabs, local cabs and airport pickup & drop across Bangalore and Karnataka — available ${business.availability}.`}
        image="/images/destinations/pondicherry.png"
        imageAlt="Pondicherry"
      />

      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <Reveal
          variant="scale"
          className="relative mt-10 aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)]"
        >
          <Video src="/videos/sections/ooty-coonoor.mp4" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/35 via-transparent to-transparent"
          />
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 max-w-2xl text-center">
          <h2 className="text-h3 font-display text-[var(--color-ink)]">What we do</h2>
          <p className="text-body mt-5 text-[var(--color-text-muted)]">
            We provide taxi and cab hire across four core services — one-way outstation drops, per-km round
            trips, hourly local packages, and airport pickup &amp; drop — supported by a fleet ranging from
            sedans to a larger Tempo Traveller for group travel.
          </p>
          <p className="text-body mt-4 text-[var(--color-text-muted)]">
            Customers can book by phone, WhatsApp, or through the enquiry form on this website, and we
            confirm the vehicle and fare directly before the trip.
          </p>
        </Reveal>
      </Section>

      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-h3 font-display text-[var(--color-ink)]">Wherever the road leads</h2>
            <p className="text-body mt-5 text-[var(--color-text-muted)]">
              From Bangalore&rsquo;s city streets to South India&rsquo;s coastline at Kanyakumari, we plan the
              drive so you can enjoy the destination — one way, round trip, or a longer tour package.
            </p>
          </Reveal>
          <AboutKanyakumariImage />
        </div>
      </Section>

      <Section tone="paper" id="founder" className="scroll-mt-24 border-t border-[var(--color-line)]">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-sand)]/60 p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-ink)] font-display text-2xl font-bold text-[var(--color-accent-soft)] shadow-md">
                  MK
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
                      Manoj Kumar
                    </h2>
                    <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-strong,#b84000)]">
                      Founder &amp; Operations Head
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)]">
                    With over 12 years of hands-on experience in commercial passenger transport across Karnataka and South India, Manoj founded Manoj Tours and Travels (Manoj Taxi Service) with a single commitment: reliable, punctual, and transparent cab travel without surprise charges.
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-text-muted)]">
                    Based out of Kaggalipura, Kanakapura Road, Manoj actively oversees 24×7 fleet operations, route planning for Western Ghats and interstate corridors, Kempegowda Airport dispatching, and driver road-safety training.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-[var(--color-ink)]">
                    <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1.5 shadow-sm">
                      ✓ 12+ Years Highway &amp; City Logistics
                    </span>
                    <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1.5 shadow-sm">
                      ✓ Karnataka &amp; South India Route Specialist
                    </span>
                    <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-3.5 py-1.5 shadow-sm">
                      ✓ Commercial Safety &amp; FASTag Toll Compliance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading align="center" eyebrow="What to Expect" title="How we work" className="mx-auto" />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((v, index) => (
            <Reveal key={v.title} delay={(index % 2) * 100} className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7">
              <h3 className="text-card-title font-display text-[var(--color-ink)]">{v.title}</h3>
              <p className="mt-2.5 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{v.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="text-center">
        <Reveal>
          <h2 className="text-h3 font-display text-[var(--color-ink)]">Get in touch</h2>
          <p className="text-lead mx-auto mt-3 max-w-md text-[var(--color-text-muted)]">
            Have a trip in mind? Call, WhatsApp, or send an enquiry and we&rsquo;ll take it from there.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent" size="lg">
              Contact Us
            </Button>
            <CallButton variant="inline" />
            <WhatsAppButton variant="inline" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
