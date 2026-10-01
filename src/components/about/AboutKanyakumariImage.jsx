"use client";

import { MaskReveal } from "@/components/ui/MaskReveal";
import { Image } from "@/components/ui/Image";
import { useParallax } from "@/hooks/useParallax";

/**
 * The About page's standalone Kanyakumari photograph — pulled into its own
 * small client component only because it needs the scroll-parallax hook;
 * the rest of the About page stays a server component (it exports
 * `metadata`, which requires that).
 */
export function AboutKanyakumariImage() {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <MaskReveal delay={120} className="aspect-[4/5] w-full rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)]">
      <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
        <Image
          src="/images/destinations/kanyakumari.png"
          alt="Kanyakumari — one of the destinations Manoj Tours and Travels covers"
          title="Kanyakumari — one of the destinations Manoj Tours and Travels covers"
          wrapperClassName="h-full w-full"
          className="object-cover"
          sizes="(min-width: 1024px) 45vw, 90vw"
        />
      </div>
    </MaskReveal>
  );
}
