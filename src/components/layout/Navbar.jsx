"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { callLink } from "@/config/business.config";
import { useBusinessInfo } from "@/components/common/SiteDataProvider";
import { useScroll } from "@/hooks/useScroll";
import { HolidayBanner } from "@/components/common/HolidayBanner";
import { trackPhoneConversion, trackWhatsAppConversion } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Navbar() {
  const business = useBusinessInfo();
  const scrolled = useScroll(32);
  const [mobileOpen, setMobileOpen] = useState(false);
  const phoneHref = callLink(business.phone.active);
  const whatsappHref = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(business.whatsapp.defaultMessage)}`;
  // Genuinely transparent over the hero — a light scrim + subtle blur keep
  // text legible without ever reading as a solid card — then a proper glass
  // surface takes over once scrolled, when the header needs real contrast
  // against ordinary page content instead of a photo/video.
  const tone = scrolled ? "dark" : "light";
  const iconTone = scrolled
    ? "text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]"
    : "text-[var(--color-text-on-dark)] hover:bg-white/10";

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out",
        scrolled
          ? "glass-nav shadow-[var(--shadow-soft)]"
          : "border-transparent bg-gradient-to-b from-[var(--color-ink)]/45 via-[var(--color-ink)]/12 to-transparent backdrop-blur-[2px]"
      )}
    >
      <HolidayBanner />
      <Container
        className={cn(
          "flex items-center justify-between gap-2 transition-[padding] duration-500 ease-out min-[1440px]:gap-3",
          scrolled ? "py-2.5" : "py-3"
        )}
      >
        {/* Logo sits flush against the left edge of the content column —    */}
        {/* an editorial masthead bar, not a small floating pill with        */}
        {/* margins around it. Starts on-dark/transparent over the hero,     */}
        {/* switches to on-light glass the moment there's real page content  */}
        {/* behind it.                                                      */}
        <Logo tone={tone} size="sm" compactOnMobile className="shrink-0" />

        <Navigation tone={tone} />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 2xl:gap-3">
          {/* Primary phone number — always visible on desktop, never
              tucked away behind a menu. */}
          <a
            href={phoneHref}
            title={`Call Manoj Tours and Travels at ${business.phone.activeDisplay}`}
            className={cn(
              "hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-full)] px-1.5 py-2 text-[14px] font-medium transition-colors min-[1440px]:flex",
              scrolled ? "text-[var(--color-ink)] hover:text-[var(--color-accent-2)]" : "text-[var(--color-text-on-dark)] hover:text-[var(--color-accent-soft)]"
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5c0-1.1.9-2 2-2h2.2c.5 0 1 .3 1.2.8l1.3 3a1.4 1.4 0 0 1-.4 1.6L7.8 10.2a12 12 0 0 0 6 6l1.3-1.5a1.4 1.4 0 0 1 1.6-.4l3 1.3c.5.2.8.7.8 1.2V19c0 1.1-.9 2-2 2h-1C10.6 21 3 13.4 3 5.5z" />
            </svg>
            {business.phone.activeDisplay}
          </a>

          {/* The premium pill CTA — built standalone rather than through the
              shared Button component, whose base classes bake in the
              brutal-minimal radius-sm corners; two conflicting border-radius
              utilities on one element is a real Tailwind cascade hazard
              (see Button.jsx / FormField.jsx for the established pattern of
              avoiding exactly this), so a fully self-contained element is
              the safe way to get a genuinely pill-shaped glass button. Its
              own glass-accent surface reads clearly whether the header
              behind it is transparent or solid, so it needs no tone switch. */}
          {/* Scrolls to the homepage's booking form (src/components/home/Hero.jsx,
              id="book") rather than navigating to /fleet or opening a popup. */}
          <Link
            href="/#book"
            title="Book a cab online with Manoj Tours and Travels"
            className="glass-accent hidden shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0 active:scale-[0.98] sm:inline-flex min-[1440px]:px-7 min-[1440px]:py-3.5 min-[1440px]:text-[17px]"
          >
            Book Now
          </Link>

          {/* Mobile-only quick actions — Call and WhatsApp are one tap away
              without opening the full menu; Book Now lives as the first,
              largest item inside the drawer. */}
          <a
            href={phoneHref}
            onClick={() => trackPhoneConversion(business.phone.activeDisplay)}
            title={`Call Manoj Tours and Travels at ${business.phone.activeDisplay}`}
            aria-label="Call Manoj Tours and Travels"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-all active:scale-90 sm:hidden",
              scrolled ? "border-[var(--color-line-accent)]" : "border-white/40",
              iconTone
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5c0-1.1.9-2 2-2h2.2c.5 0 1 .3 1.2.8l1.3 3a1.4 1.4 0 0 1-.4 1.6L7.8 10.2a12 12 0 0 0 6 6l1.3-1.5a1.4 1.4 0 0 1 1.6-.4l3 1.3c.5.2.8.7.8 1.2V19c0 1.1-.9 2-2 2h-1C10.6 21 3 13.4 3 5.5z" />
            </svg>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppConversion}
            title="Chat on WhatsApp with Manoj Tours and Travels"
            aria-label="WhatsApp Manoj Tours and Travels"
            className="glass-light flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-accent-2)] transition-transform hover:scale-105 active:scale-95 sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.57-.35z" />
              <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.95 9.95 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.09c-1.62 0-3.13-.47-4.4-1.28l-.32-.19-3.02.79.8-2.94-.2-.31A8.08 8.08 0 0 1 3.94 12c0-4.46 3.63-8.09 8.08-8.09 4.46 0 8.08 3.63 8.08 8.09 0 4.46-3.62 8.09-8.08 8.09z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            title="Open Navigation Menu"
            aria-label="Open menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-all active:scale-90 min-[1440px]:hidden",
              scrolled ? "border-[var(--color-line-accent)]" : "border-white/40",
              iconTone
            )}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </Container>
    </header>
    {/* Rendered as a sibling, not a child, of <header> — the header's own
        backdrop-blur (transparent state) or glass-nav background otherwise
        establishes a CSS containing block, which would size/position this
        fixed-inset-0 drawer against the ~72px-tall header box instead of
        the actual viewport. */}
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
