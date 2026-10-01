"use client";

import Link from "next/link";
import { trackPhoneConversion } from "@/lib/analytics";

/**
 * Temporary Holiday Special Announcement Banner
 * Placed at the top of the site for immediate holiday booking intent.
 */
export function HolidayBanner() {
  return (
    <aside
      aria-label="Holiday Special Announcement"
      className="relative z-50 bg-gradient-to-r from-[#1c1917] via-[#78350f] to-[#1c1917] border-b border-amber-500/30 px-3 py-1.5 text-center text-xs sm:text-[13px] text-amber-100 shadow-sm"
    >
      <div className="container-edge mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="font-semibold text-white">
          🌟 Gandhi Jayanti Long Weekend Special:
        </span>
        <span className="text-amber-200">
          Instant Cabs Available for Mysore, Mangalore &amp; Nandi Hills!
        </span>
        <a
          href="tel:+917899787478"
          onClick={() => trackPhoneConversion("+91 78997 87478")}
          title="Call Manoj Tours and Travels for instant cab booking"
          className="font-bold text-amber-300 underline underline-offset-2 hover:text-white transition-colors"
        >
          [Call Now]
        </a>
        <span className="hidden md:inline text-amber-400/60">•</span>
        <Link
          href="/blog/long-weekend-getaways-bangalore-gandhi-jayanti"
          title="Top 5 Long Weekend Getaways from Bangalore for Gandhi Jayanti"
          className="hidden sm:inline text-amber-300 underline underline-offset-2 hover:text-white transition-colors"
        >
          Weekend Guide →
        </Link>
      </div>
    </aside>
  );
}
