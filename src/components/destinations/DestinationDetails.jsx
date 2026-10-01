import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

// Maps a destination's idealTripType to the service page(s) that actually
// cover it — real internal links, not invented ones, derived from data
// that's already on the destination.
function relevantServices(idealTripType) {
  const t = idealTripType.toLowerCase();
  const services = [];
  if (t.includes("local")) services.push({ label: "Local Cabs", href: "/services/local-cabs" });
  if (t.includes("one way")) services.push({ label: "One Way Cabs", href: "/services/outstation-cabs" });
  if (t.includes("round trip") || t.includes("tour package")) {
    services.push({ label: "Round Trip Cabs", href: "/services/round-trip-cabs" });
  }
  return services;
}

export function DestinationDetails({ destination }) {
  const services = relevantServices(destination.idealTripType);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
      <Reveal>
        <p className="text-body text-[var(--color-text-muted)]">
          {destination.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>{destination.region}</Badge>
          <Badge>{destination.idealTripType}</Badge>
          {destination.approxDistanceKm ? (
            <Badge>~{destination.approxDistanceKm} km from Bangalore</Badge>
          ) : null}
        </div>
        {services.length > 0 && (
          <p className="mt-6 text-[15px] text-[var(--color-text-muted)]">
            Book this trip via{" "}
            {services.map((s, i) => (
              <span key={s.href}>
                <Link
                  href={s.href}
                  title={`Book ${destination.name} trip via ${s.label}`}
                  className="font-medium text-[var(--color-accent-2)] underline underline-offset-4"
                >
                  {s.label}
                </Link>
                {i < services.length - 1 ? " or " : ""}
              </span>
            ))}
            .
          </p>
        )}
      </Reveal>

      <Reveal delay={120} variant="scale" className="glass-light rounded-[var(--radius-lg)] p-7">
        <h2 className="text-card-title font-display text-[var(--color-ink)]">Plan This Trip</h2>
        <p className="mt-2.5 text-[17px] text-[var(--color-text-muted)]">
          Tell us your travel dates and group size — we&rsquo;ll suggest the right vehicle and share the fare.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <Button href="/contact" variant="accent" title={`Enquire about booking trip to ${destination.name}`} className="w-full">
            Enquire About This Trip
          </Button>
          <WhatsAppButton
            message={`Hello Manoj Tours and Travels, I would like to enquire about a trip to ${destination.name}.`}
            className="w-full"
          />
        </div>
      </Reveal>
    </div>
  );
}
