"use client";

import { Video } from "@/components/ui/Video";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";
import { useKenBurns } from "@/hooks/useKenBurns";
import { cn } from "@/lib/utils";

/**
 * The homepage's large cinematic closing chapter — full-width Kerala
 * footage with a subtle dark overlay and one short line of text. Sits
 * after the testimonials, right before the final Book Now CTA. This is
 * the only footage on the homepage aside from the hero.
 */
export function CinematicSection() {
  const [parallaxRef, parallaxStyle] = useParallax(24);
  const kenBurnsEnabled = useKenBurns();

  return (
    // A cinematic entrance for the whole chapter — a slow fade+scale as it
    // nears the viewport (variant="scale"), not just its caption. The scale
    // lives on this inner layer (clipped by the section's own
    // overflow-hidden below), never on the full-viewport-width <section>
    // itself — a scaled 100vw box would otherwise push past both edges and
    // cause real horizontal page overflow while still off-screen. The
    // section's own gradient overlay (below) already carries the "exit" —
    // it darkens toward the top edge into whatever ink-toned section
    // follows, so there's no hard cut in or out.
    <section className="relative h-[80vh] min-h-[480px] overflow-hidden bg-[var(--color-ink)]">
      <Reveal variant="scale" className="absolute inset-0">
        <div ref={parallaxRef} style={parallaxStyle} className="absolute inset-0 scale-110">
          <Video
            src="/videos/sections/kerala.mp4"
            poster="/images/kerala-poster.webp"
            posterAlt="Scenic South India road trip and Kerala outstation tour with Manoj Tours and Travels"
            className={cn(kenBurnsEnabled && "kenburns")}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/20 to-[var(--color-ink)]/35"
        />
      </Reveal>
      <Container className="absolute inset-x-0 bottom-0 z-10 pb-16">
        <Reveal>
          <p className="text-balance max-w-2xl font-display text-3xl italic leading-[1.15] text-[var(--color-text-on-dark)] md:text-4xl lg:text-[2.75rem]">
            Every trip is someone&rsquo;s story worth arriving for.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
