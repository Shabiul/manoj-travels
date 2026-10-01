import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business.config";
import { buildMetadata } from "@/lib/metadata";
import { legalPageSchema } from "@/lib/structured-data";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const metadata = buildMetadata({
  title: "Terms of Service | Manoj Tours and Travels",
  description:
    "Terms of Service and passenger travel conditions for Manoj Tours and Travels (Manoj Taxi Service) Bangalore. Details on one-way drops, round trips, tolls, and cancellations.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  const publishedDate = "2024-01-01T00:00:00+05:30";
  const modifiedDate = "2026-10-01T00:00:00+05:30";

  const schema = legalPageSchema({
    title: "Terms of Service | Manoj Tours and Travels",
    description:
      "Terms of Service for Manoj Tours and Travels covering booking confirmations, fare structures, driver bata, toll guidelines, and cancellations.",
    path: "/terms-of-service",
    datePublished: publishedDate,
    dateModified: modifiedDate,
  });

  return (
    <Section tone="paper" className="pt-36 md:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mx-auto mt-8 max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent-soft)]">
            Legal &amp; Trust
          </p>
          <h1 className="mt-2 font-display text-3xl text-[var(--color-ink)] md:text-4xl">
            Terms of Service
          </h1>

          {/* Machine-readable and human-readable dates for E-E-A-T trust */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <span>
              Effective Date:{" "}
              <time dateTime={publishedDate} className="font-medium text-[var(--color-ink)]">
                January 1, 2024
              </time>
            </span>
            <span>•</span>
            <span>
              Last Updated:{" "}
              <time dateTime={modifiedDate} className="font-medium text-[var(--color-ink)]">
                October 1, 2026
              </time>
            </span>
            <span>•</span>
            <span>By Manoj Kumar (Founder &amp; Fleet Operations)</span>
          </div>

          <div className="prose-content mt-8 space-y-6 text-[var(--color-text-muted)]">
            <p className="text-base leading-relaxed">
              These Terms of Service govern your use of cab booking and passenger transport services
              offered by <strong>{business.legalName}</strong> (trading as{" "}
              <strong>{business.tradeName}</strong>). By reserving a vehicle through our website,
              phone calls, or WhatsApp messaging, you acknowledge and agree to these terms.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">1. Booking &amp; Confirmation Process</h2>
            <p className="leading-relaxed">
              A cab booking is considered confirmed once trip parameters (pickup point, destination, date,
              time, vehicle type, and estimated fare) have been acknowledged and verified directly with
              our operations desk. We assign a verified vehicle and driver details prior to your pickup
              time.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">2. Fare Structures &amp; Billing Rules</h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong>One-Way Outstation Cabs:</strong> Billed as a fixed one-side drop fare for the
                specified route. Customers pay strictly for the single-direction drop without any
                charge for the vehicle&rsquo;s return journey to Bangalore.
              </li>
              <li>
                <strong>Round-Trip Outstation Cabs:</strong> Billed on actual per-kilometre running distance
                starting and ending at the pickup garage/point in Bangalore. A standard minimum running
                charge of <strong>300 kilometres per calendar day</strong> applies, plus a designated
                daily driver allowance (Bata) covering driver meals and night accommodation.
              </li>
              <li>
                <strong>Local Hourly Packages:</strong> Structured around an 8-hour / 80-kilometre base
                allowance. Usage extending beyond the agreed package is billed on a per-extra-hour and
                per-extra-kilometre basis according to the vehicle class tariff.
              </li>
              <li>
                <strong>Airport Transfers:</strong> Dedicated flat or metered transfers to and from
                Kempegowda International Airport (BLR) based on Bangalore zone and vehicle model.
              </li>
            </ul>

            <h2 className="font-display text-xl text-[var(--color-ink)]">3. Tolls, Parking &amp; Interstate Permits</h2>
            <p className="leading-relaxed">
              Unless explicitly agreed upon as an all-inclusive package in writing:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>FASTag Highway Tolls:</strong> Electronic toll charges incurred during the journey
                are payable on actuals by the passenger in accordance with National Highways Authority of India (NHAI) rates.
              </li>
              <li>
                <strong>Parking Charges:</strong> Airport parking fees, monument/sightseeing parking fees, and hotel valet charges are borne by the passenger.
              </li>
              <li>
                <strong>Interstate State Entry Taxes:</strong> Commercial transport taxes required by neighbouring state transport departments (Tamil Nadu, Kerala, Andhra Pradesh, Goa) are payable by the customer at the respective border check-post.
              </li>
            </ul>

            <h2 className="font-display text-xl text-[var(--color-ink)]">4. Cancellations &amp; Modifications</h2>
            <p className="leading-relaxed">
              We understand plans can change unexpectedly. We request that cancellations or rescheduling
              requests be communicated at the earliest possible convenience:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Local &amp; Airport Transfers:</strong> Please notify us at least 2 hours prior to scheduled pickup.
              </li>
              <li>
                <strong>Outstation Trips:</strong> Please notify us at least 6 hours prior to the scheduled departure time.
              </li>
            </ul>
            <p className="leading-relaxed">
              No cancellation fee is charged when trips are cancelled with adequate advance notice before vehicle dispatch.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">5. Passenger Safety &amp; Vehicle Conduct</h2>
            <p className="leading-relaxed">
              Passenger safety is our highest operational priority. Passengers are required to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Adhere to the legal seating capacity of the reserved vehicle (4 passengers for Sedans, 6-7 for Innova Crysta, 12-16 for Urbania/Traveller).</li>
              <li>Refrain from smoking, consuming alcohol, or carrying hazardous/flammable substances inside commercial vehicles.</li>
              <li>Wear seat belts as mandated under Karnataka and Indian Motor Vehicles safety laws.</li>
            </ul>

            <h2 className="font-display text-xl text-[var(--color-ink)]">6. Jurisdiction &amp; Governing Law</h2>
            <p className="leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the State of
              Karnataka and the Republic of India. Any disputes arising in connection with these services
              shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">7. Contact Information</h2>
            <p className="leading-relaxed">
              For any questions regarding these terms, contact our management team directly:
              <br />
              <span className="block mt-2 font-medium text-[var(--color-ink)]">
                {business.legalName} ({business.tradeName})
              </span>
              Address: {business.address.full}
              <br />
              Phone:{" "}
              <a href={`tel:+91${business.phone.primary}`} className="text-[var(--color-accent)] underline">
                {business.phone.primaryDisplay}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${business.email}`} className="text-[var(--color-accent)] underline">
                {business.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
