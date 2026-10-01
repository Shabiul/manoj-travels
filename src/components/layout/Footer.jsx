"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { CallButton } from "@/components/common/CallButton";
import { Logo } from "./Logo";
import { footerNav, popularRoutes } from "@/config/navigation.config";
import { useBusinessInfo } from "@/components/common/SiteDataProvider";
import { cn } from "@/lib/utils";

// Small, consistent line-style icons for the contact column — same stroke
// weight/size throughout, aligned to the text baseline via items-start.
const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.3" strokeLinecap="round" />
  </svg>
);
const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5.5c0-1.1.9-2 2-2h2.2c.5 0 1 .3 1.2.8l1.3 3a1.4 1.4 0 0 1-.4 1.6L7.8 10.2a12 12 0 0 0 6 6l1.3-1.5a1.4 1.4 0 0 1 1.6-.4l3 1.3c.5.2.8.7.8 1.2V19c0 1.1-.9 2-2 2h-1C10.6 21 3 13.4 3 5.5z"
    />
  </svg>
);
const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
  </svg>
);

function ContactLine({ icon, children, className, ...props }) {
  return (
    <a {...props} className={cn("flex items-start gap-2.5 transition-colors duration-200 hover:text-[var(--color-accent-soft)]", className)}>
      <span className="mt-0.5 shrink-0 text-[var(--color-accent-soft)]">{icon}</span>
      <span>{children}</span>
    </a>
  );
}

export function Footer() {
  const business = useBusinessInfo();
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.full)}`;
  const year = new Date().getFullYear();
  const iconClass = "h-[1.05em] w-[1.05em]";

  return (
    <footer className="texture-grain bg-[var(--color-ink)] text-[var(--color-text-on-dark)]">
      <Container className="py-16 md:py-20">
        {/* Brand | Explore | Services | Contact */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <Logo tone="light" size="md" />
            <p className="text-body mt-6 max-w-xs text-[var(--color-text-on-dark-muted)]">
              24×7 one way, round trip, local and airport cab service based in
              Bangalore, Karnataka.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CallButton />
              <WhatsAppButton />
            </div>
          </div>

          <div>
            <p className="font-display text-[21px] font-semibold text-[var(--color-text-on-dark)]">Explore</p>
            <ul className="mt-5 space-y-3.5">
              {footerNav.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[17px] text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent-soft)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[21px] font-semibold text-[var(--color-text-on-dark)]">Services</p>
            <ul className="mt-5 space-y-3.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[17px] text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent-soft)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[21px] font-semibold text-[var(--color-text-on-dark)]">Contact</p>
            <ul className="mt-5 space-y-3.5 text-[17px] text-[var(--color-text-on-dark-muted)]">
              <li>
                <ContactLine icon={<PhoneIcon className={iconClass} />} href={`tel:+91${business.phone.primary}`} className="font-medium !text-[var(--color-text-on-dark)]">
                  {business.phone.primaryDisplay}
                </ContactLine>
              </li>
              <li>
                <ContactLine icon={<PhoneIcon className={iconClass} />} href={`tel:+91${business.phone.secondary}`}>
                  {business.phone.secondaryDisplay}
                </ContactLine>
              </li>
              <li>
                <ContactLine icon={<MailIcon className={iconClass} />} href={`mailto:${business.email}`}>
                  {business.email}
                </ContactLine>
              </li>
              <li>
                <ContactLine icon={<PinIcon className={iconClass} />} href={mapsLink} target="_blank" rel="noopener noreferrer">
                  {business.address.full}
                </ContactLine>
              </li>
              <li className="pt-1 font-medium text-[var(--color-accent-soft)]">
                {business.availabilityLabel}
              </li>
            </ul>
          </div>
        </div>

        {/* Compact, text-only route links — real keyword-matched routes to
            real pages, not a full sitemap dump (see /routes for the rest). */}
        <div className="mt-12 border-t border-[var(--color-line-on-dark)] pt-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-on-dark-muted)]/70">
            Popular Routes
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {popularRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-[16px] text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent-soft)]"
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/destinations"
              className="text-[16px] font-medium text-[var(--color-accent-soft)] transition-colors hover:text-[var(--color-text-on-dark)]"
            >
              All Destinations →
            </Link>
          </div>
        </div>

        {/* Bangalore Local SEO & GEO Service Coverage Strip */}
        <div className="mt-10 border-t border-[var(--color-line-on-dark)] pt-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-on-dark-muted)]/70">
            Bangalore Hubs &amp; Coverage Areas
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-text-on-dark-muted)]/80">
            <strong>Local Hubs:</strong> Kaggalipura, Kanakapura Road, Banashankari, JP Nagar, Jayanagar, Electronic City, Whitefield, Koramangala, Indiranagar, HSR Layout, Marathahalli, Bellandur, Sarjapur Road, BTM Layout, Hebbal, Yelahanka, Majestic &amp; Kempegowda International Airport (BLR).
            <br />
            <strong>Outstation Corridors:</strong> Bangalore to Mysore, Ooty, Coorg, Chikmagalur, Sakleshpur, Tirupati, Chennai, Coimbatore, Hyderabad, Wayanad, Munnar, Goa &amp; 150+ South India destinations.
          </p>
        </div>

        {/* Bottom row — copyright, legal links, credit */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line-on-dark)] pt-7 sm:flex-row sm:items-center">
          <div>
            <p className="text-[15px] text-[var(--color-text-on-dark-muted)]/70">
              © {year} Manoj Tours and Travels (Manoj Taxi Service). All rights reserved.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[14px] text-[var(--color-text-on-dark-muted)]/80">
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 decoration-[var(--color-line-on-dark)] transition-colors hover:text-[var(--color-accent-soft)]"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms-of-service"
                className="underline underline-offset-4 decoration-[var(--color-line-on-dark)] transition-colors hover:text-[var(--color-accent-soft)]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-[15px] text-[var(--color-text-on-dark-muted)]/70">
            Designed &amp; Developed by{" "}
            <a
              href="https://www.naazailabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[var(--color-text-on-dark-muted)]/40 underline-offset-2 transition-colors hover:text-[var(--color-accent-soft)]"
            >
              Naaz AI Labs
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
