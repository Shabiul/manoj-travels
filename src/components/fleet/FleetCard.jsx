import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { Badge } from "@/components/ui/Badge";

/**
 * Large vehicle photography (object-contain — the whole vehicle stays in
 * frame, never cropped) with a separate glass information panel beneath,
 * rather than text stacked on top of the image.
 */
export function FleetCard({ vehicle, onBook }) {
  return (
    <div className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link
        href={`/fleet/${vehicle.slug}`}
        title={`View specifications and pricing for ${vehicle.name}`}
        className="block"
      >
        <div className="img-hover-sweep relative flex h-72 items-center justify-center bg-[var(--color-paper-2)] p-6">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} — ${vehicle.category} available with Manoj Tours and Travels`}
            title={`${vehicle.name} — ${vehicle.category}`}
            wrapperClassName="h-full w-full"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 30vw, 90vw"
          />
        </div>
      </Link>

      <div className="glass-light border-t border-[var(--color-line)] p-6">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/fleet/${vehicle.slug}`} title={`View ${vehicle.name} details`}>
            <h3 className="text-card-title font-display text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-2)]">
              {vehicle.name}
            </h3>
          </Link>
          <Badge className="shrink-0">{vehicle.capacity}</Badge>
        </div>
        <p className="mt-1 text-[16px] text-[var(--color-text-muted)]">{vehicle.category}</p>
        <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
          {vehicle.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {onBook ? (
            <button
              type="button"
              onClick={() => onBook(vehicle)}
              title={`Book ${vehicle.name}`}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-2.5 text-[16px] font-medium text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-2)]"
            >
              Book This Vehicle
            </button>
          ) : (
            <Link
              href="/fleet"
              title={`Book ${vehicle.name} with Manoj Tours and Travels`}
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-2.5 text-[16px] font-medium text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-2)]"
            >
              Book This Vehicle
            </Link>
          )}
          <Link
            href={`/fleet/${vehicle.slug}`}
            title={`View full details for ${vehicle.name}`}
            className="text-[16px] font-medium text-[var(--color-accent-2)] hover:underline"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}
