import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business.config";
import { buildMetadata } from "@/lib/metadata";
import { legalPageSchema } from "@/lib/structured-data";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export const metadata = buildMetadata({
  title: "Privacy Policy | Manoj Tours and Travels",
  description:
    "Privacy Policy for Manoj Tours and Travels (Manoj Taxi Service). Learn how we handle customer booking details, phone communications, and data protection.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const publishedDate = "2024-01-01T00:00:00+05:30";
  const modifiedDate = "2026-10-01T00:00:00+05:30";

  const schema = legalPageSchema({
    title: "Privacy Policy | Manoj Tours and Travels",
    description:
      "Privacy Policy for Manoj Tours and Travels (Manoj Taxi Service) covering customer data handling, booking privacy, and communications.",
    path: "/privacy-policy",
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
            Privacy Policy
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
            <span>By Manoj Kumar (Operations Head)</span>
          </div>

          <div className="prose-content mt-8 space-y-6 text-[var(--color-text-muted)]">
            <p className="text-base leading-relaxed">
              At <strong>{business.legalName}</strong> (also operating as{" "}
              <strong>{business.tradeName}</strong>), we value the trust you place in us when
              booking your taxi and travel requirements. This Privacy Policy details the types of
              information we collect, how it is utilized to fulfill your trip, and how we safeguard
              your personal details across all our passenger transportation services in Bangalore and
              throughout South India.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">1. Business Identity &amp; Contact</h2>
            <p className="leading-relaxed">
              This service is operated by <strong>{business.legalName}</strong>, located at:
              <br />
              <span className="block mt-1 font-medium text-[var(--color-ink)]">
                {business.address.full}
              </span>
              Primary Phone:{" "}
              <a href={`tel:+91${business.phone.primary}`} className="text-[var(--color-accent)] underline">
                {business.phone.primaryDisplay}
              </a>
              <br />
              Email:{" "}
              <a href={`mailto:${business.email}`} className="text-[var(--color-accent)] underline">
                {business.email}
              </a>
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">2. Information We Collect</h2>
            <p className="leading-relaxed">
              When you enquire about or confirm a cab booking with us via phone, WhatsApp, or our
              online booking form, we collect only the necessary details required to deliver the
              requested transportation service:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Personal Identifiers:</strong> Name and primary phone number.
              </li>
              <li>
                <strong>Trip Details:</strong> Pickup address or landmark, destination city/address, date,
                time of departure, and preferred vehicle class (Sedan, SUV, Innova Crysta, or Tempo Traveller).
              </li>
              <li>
                <strong>Airport Transfer Details:</strong> Flight numbers and scheduled landing or departure
                times for Kempegowda International Airport (BLR) transfers to coordinate flight delays and terminal pickups.
              </li>
            </ul>

            <h2 className="font-display text-xl text-[var(--color-ink)]">3. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use your information exclusively for legitimate business and travel coordination purposes:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Confirming and dispatching your reserved vehicle and driver.</li>
              <li>Sharing driver contact details, vehicle registration numbers, and live trip status updates.</li>
              <li>Facilitating customer support inquiries and resolving route questions before or during travel.</li>
              <li>Generating transparent trip invoices and billing statements.</li>
            </ul>
            <p className="leading-relaxed font-medium text-[var(--color-ink)]">
              We never sell, trade, rent, or lease your personal contact details to third-party marketing companies or data brokers.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">4. Driver Assignment &amp; Data Sharing</h2>
            <p className="leading-relaxed">
              To fulfill your trip, your pickup location, scheduled time, and contact phone number are
              shared solely with the verified commercial driver assigned to your specific booking. Our
              drivers are bound by strict professional conduct standards and are instructed to contact
              passengers only regarding immediate travel logistics.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">5. Data Retention &amp; Security</h2>
            <p className="leading-relaxed">
              We maintain technical and operational precautions to protect customer records against
              unauthorized access, alteration, or disclosure. Booking records are retained solely for
              accounting compliance, dispute resolution, and regulatory audits under Karnataka state
              transport laws, after which they are systematically deleted.
            </p>

            <h2 className="font-display text-xl text-[var(--color-ink)]">6. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to request a review of the personal contact details we hold for you, or
              to request that your phone number and booking history be purged from our active records. To
              exercise these rights, please contact us directly at{" "}
              <a href={`mailto:${business.email}`} className="text-[var(--color-accent)] underline">
                {business.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:+91${business.phone.primary}`} className="text-[var(--color-accent)] underline">
                {business.phone.primaryDisplay}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
