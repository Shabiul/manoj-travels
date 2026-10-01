import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { formatINR } from "@/lib/utils";

/**
 * Image-led package card — photo, badges, vehicle options and a price (or
 * "Price on request" when no fixed price is set), plus the two CTAs from the
 * reference layout: a quick Enquire and a link through to the package's own
 * itinerary page.
 */
export function TourPackageCard({ pkg }) {
  const href = `/tours-packages/${pkg.id}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={href}
        title={`View itinerary and pricing for ${pkg.title}`}
        className="img-hover-sweep relative block aspect-[4/3] w-full"
      >
        {pkg.image ? (
          <Image
            src={pkg.image}
            alt={`${pkg.title} — Manoj Tours and Travels`}
            title={`${pkg.title} — South India tour package`}
            wrapperClassName="h-full"
            className="transition-transform duration-700 ease-out hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--color-paper-2)] text-center">
            <span className="text-[13px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
              Photo coming soon
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          {pkg.duration ? (
            <span className="rounded-[var(--radius-sm)] bg-[var(--color-ink)]/80 px-3 py-1.5 text-[13px] font-medium text-[var(--color-text-on-dark)] backdrop-blur-sm">
              {pkg.duration}
            </span>
          ) : (
            <span />
          )}
          {pkg.featured && (
            <span className="rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 py-1.5 text-[13px] font-medium text-[var(--color-text-on-dark)]">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <Link href={href} title={`View ${pkg.title} details`}>
          <h3 className="text-card-title font-display text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-2)]">
            {pkg.title}
          </h3>
        </Link>
        <p className="mt-3 flex-1 text-[16px] leading-relaxed text-[var(--color-text-muted)]">{pkg.description}</p>

        {pkg.vehicleTypes?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pkg.vehicleTypes.map((v) => (
              <Badge key={v}>{v}</Badge>
            ))}
          </div>
        )}

        <p className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
          {pkg.price ? (
            <>
              {formatINR(pkg.price)}
              <span className="ml-1.5 text-[15px] font-normal text-[var(--color-text-muted)]">{pkg.priceUnit}</span>
            </>
          ) : (
            "Price on request"
          )}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/contact" variant="accent" title={`Enquire about ${pkg.title} tour package`}>
            Enquire
          </Button>
          <WhatsAppButton message={`Hello Manoj Tours and Travels, I would like to enquire about the "${pkg.title}" package.`} />
        </div>

        <Link
          href={href}
          title={`View full itinerary for ${pkg.title}`}
          className="mt-5 text-[15px] font-medium text-[var(--color-accent-2)] underline underline-offset-4"
        >
          View package &amp; itinerary →
        </Link>
      </div>
    </div>
  );
}
