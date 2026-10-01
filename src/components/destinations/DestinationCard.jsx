import Link from "next/link";
import { Image } from "@/components/ui/Image";

/**
 * Premium, brutal-minimal destination tile — a consistent 1:1 square with
 * only the destination name and a "Plan Your Trip" call-to-action. The
 * whole tile is one link (unchanged routing/behaviour); the button is a
 * visual affordance, not a second nested link.
 */
export function DestinationCard({ destination, className }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      title={`Plan a road trip from Bangalore to ${destination.name} with Manoj Tours and Travels`}
      className={`group relative block aspect-square w-full overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] ${className || ""}`}
    >
      <div className="img-hover-sweep h-full w-full">
        <Image
          src={destination.image}
          alt={`Bangalore to ${destination.name} taxi service — Manoj Tours and Travels`}
          title={`Bangalore to ${destination.name} outstation taxi trip`}
          wrapperClassName="h-full"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-[var(--color-ink)]/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-5 text-center sm:gap-4 sm:p-6">
        <h3 className="text-card-title font-display text-[var(--color-text-on-dark)]">
          {destination.name}
        </h3>
        <span className="inline-flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-text-on-dark)]/40 bg-[var(--color-ink)]/40 px-5 py-2.5 text-[14px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-on-dark)] backdrop-blur-sm transition-colors duration-300 group-hover:border-[var(--color-accent-soft)] group-hover:bg-[var(--color-accent)]">
          Plan Your Trip
        </span>
      </div>
    </Link>
  );
}
