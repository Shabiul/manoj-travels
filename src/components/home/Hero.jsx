import { HeroVideo } from "./HeroVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { business } from "@/config/business.config";

// Full-screen cinematic hero — two clips crossfading in sequence
// (Jog Falls → Munnar), Video 1 → 2 → 1 → ... Both source clips are
// portrait; rather than panel them, they're cover-cropped with a per-clip
// object-position (see HeroVideo) so the subject stays in frame at
// full-bleed 16:9, and a light grade — not a heavy scrim — keeps the
// footage looking sharp instead of murky.
//
// Two columns from lg up — headline/copy/CTAs on the left, the site's one
// booking form (reused as-is from src/components/booking/BookingForm.jsx —
// same submission logic, same /api/booking route, same Supabase save) on
// the right, so a visitor can book without scrolling at all. Below lg the
// same form stacks directly under the hero copy, in normal document flow —
// no popup/modal, no separate "Book Now" click required.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] lg:min-h-[92svh]">
      {/* High-speed LCP background poster (25 KiB) paints immediately on mobile and desktop */}
      <img
        src="/images/hero-poster.webp"
        alt="Manoj Tours and Travels — 24x7 local, outstation and airport taxi service in Bangalore"
        title="Manoj Tours and Travels — 24x7 local, outstation and airport taxi service in Bangalore"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 50%" }}
      />
      <HeroVideo />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/35 to-[var(--color-ink)]/10"
      />

      <Container className="relative z-10 flex flex-col gap-10 pb-14 pt-28 md:pb-16 lg:min-h-[92svh] lg:flex-row lg:items-center lg:gap-12 lg:py-28">
        <div className="lg:flex-1">
          <h1 className="text-balance text-display max-w-3xl font-display text-[var(--color-text-on-dark)]">
            Manoj Tours &amp; Travels
          </h1>
          <p className="text-lead mt-5 max-w-lg text-[var(--color-text-on-dark-muted)]">
            Manoj Taxi Service — local, outstation &amp; airport cabs across
            Bangalore, available 24 × 7.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#book" variant="accent" size="lg" title="Book a cab online with Manoj Tours and Travels">
              Book Now
            </Button>
            <CallButton variant="inline" />
            <WhatsAppButton variant="inline" />
          </div>
        </div>

        <div className="lg:w-[440px] lg:shrink-0 xl:w-[480px]">
          <div id="book" className="scroll-mt-24">
            <p className="text-eyebrow text-[var(--color-accent-soft)]">{business.availabilityLabel}</p>
            <h2 className="text-h3 mt-2 font-display text-[var(--color-text-on-dark)]">
              Complete Your Booking
            </h2>
            <BookingForm className="mt-4" />
          </div>
        </div>
      </Container>
    </section>
  );
}
