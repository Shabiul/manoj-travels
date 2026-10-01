import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { Card } from "@/components/ui/Card";

export function ServiceCard({ service }) {
  return (
    <Card className="group overflow-hidden">
      <Link
        href={`/services/${service.slug}`}
        title={`View pricing and details for ${service.name} — Manoj Tours and Travels`}
        className="block"
      >
        <div className="img-hover-sweep relative h-64 w-full overflow-hidden bg-[var(--color-paper-2)]">
          <Image
            src={service.heroImage}
            alt={`${service.name} — Manoj Tours and Travels`}
            title={`${service.name} — Taxi service in Bangalore`}
            wrapperClassName="h-64 w-full"
            className="object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </div>
        <div className="p-6">
          <h3 className="text-card-title font-display text-[var(--color-ink)]">{service.name}</h3>
          <p className="mt-2 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{service.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-accent-2)]">
            View pricing &amp; details
            <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </Card>
  );
}
