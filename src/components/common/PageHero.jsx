"use client";

import { Container } from "@/components/ui/Container";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

/**
 * Large cinematic image hero used at the top of internal pages — a full-bleed
 * destination photograph with an eyebrow, title and optional short
 * description over a warm gradient overlay for readability. The image
 * scales in gently on load and drifts with a very subtle parallax as the
 * page scrolls; the text stack reveals with a light stagger.
 */
export function PageHero({ eyebrow, title, description, image, imageAlt = "", objectPosition }) {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0 animate-reveal">
        <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
          <Image
            src={image}
            alt={imageAlt}
            title={imageAlt || title || "Manoj Tours and Travels"}
            wrapperClassName="h-full w-full"
            className={objectPosition}
            priority
            sizes="100vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/15" />
      <Container className="relative z-10 pb-12 pt-32">
        {eyebrow && (
          <Reveal>
            <p className="text-eyebrow text-[var(--color-accent-soft)]">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={100}>
          <h1 className="text-balance text-h2 mt-4 max-w-2xl font-display text-[var(--color-text-on-dark)]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={200}>
            <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">{description}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
