"use client";

import { useEffect } from "react";
import { trackPhoneConversion, trackWhatsAppConversion } from "@/lib/analytics";

/**
 * Global delegated click listener for Google Ads conversions.
 * Automatically catches every call and WhatsApp click across all pages
 * (navbar, footer, contact page, blog, fleet, tour packages).
 * Analytics deduplication prevents duplicate events if a component also handles onClick.
 */
export function GoogleAdsClickListener() {
  useEffect(() => {
    function handleClick(e) {
      const target = e.target;
      if (!target || typeof target.closest !== "function") return;

      const link = target.closest("a");
      if (!link || !link.href) return;

      const href = link.href.trim();
      if (href.toLowerCase().startsWith("tel:")) {
        const phone = href.replace(/^tel:/i, "").trim();
        trackPhoneConversion(phone);
      } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        trackWhatsAppConversion();
      }
    }

    document.addEventListener("click", handleClick, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
