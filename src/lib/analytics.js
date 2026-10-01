/**
 * Google Tag / Google Ads (AW-10846077480) & Analytics Event Tracker
 *
 * Handles:
 * 1. Safe queueing (works even before gtag.js finishes downloading)
 * 2. Google Ads Conversion Tracking (send_to with optional conversion labels)
 * 3. GA4 / standard event mapping (generate_lead, phone_call_click, whatsapp_click)
 * 4. Deduplication protection for fast clicks
 */

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || "AW-10846077480";

function getSendTo(label) {
  if (label && label.trim()) {
    // If the label is already full "AW-XXXXX/YYYY", use as is; otherwise format "AW-XXXXX/YYYY"
    return label.includes("/") ? label : `${GTAG_ID}/${label}`;
  }
  return GTAG_ID;
}

// Simple throttle to prevent rapid double-tracking of click conversions
const lastFired = {};
function isThrottled(key, cooldownMs = 600) {
  const now = Date.now();
  if (lastFired[key] && now - lastFired[key] < cooldownMs) {
    return true;
  }
  lastFired[key] = now;
  return false;
}

/**
 * Safe client-side Google Tag / Google Ads event dispatcher
 */
export function trackGoogleAdsEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    window.gtag("event", eventName, params);
  } catch (err) {
    // Graceful fallback if ad-blocker or tracking disabled
  }
}

/**
 * Track Click-to-Call conversions (Website phone call lead)
 */
export function trackPhoneConversion(phoneNumber = "+91 78997 87478") {
  if (isThrottled("phone", 600)) return;

  const sendTo = getSendTo(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL_CALL);

  trackGoogleAdsEvent("conversion", {
    send_to: sendTo,
    event_category: "Contact",
    event_label: `Phone Call: ${phoneNumber}`,
    value: 1.0,
    currency: "INR",
  });

  trackGoogleAdsEvent("phone_call_click", {
    phone_number: phoneNumber,
    event_category: "Contact",
  });

  trackGoogleAdsEvent("contact", {
    method: "phone",
  });
}

/**
 * Track WhatsApp Chat enquiry conversions
 */
export function trackWhatsAppConversion() {
  if (isThrottled("whatsapp", 600)) return;

  const sendTo = getSendTo(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL_WHATSAPP);

  trackGoogleAdsEvent("conversion", {
    send_to: sendTo,
    event_category: "Contact",
    event_label: "WhatsApp Chat",
    value: 1.0,
    currency: "INR",
  });

  trackGoogleAdsEvent("whatsapp_click", {
    channel: "WhatsApp",
    event_category: "Contact",
  });

  trackGoogleAdsEvent("contact", {
    method: "whatsapp",
  });
}

/**
 * Track Booking Form submission conversions
 */
export function trackBookingConversion(tripType, vehicle, customerData = {}) {
  const sendTo = getSendTo(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL_BOOKING);

  trackGoogleAdsEvent("conversion", {
    send_to: sendTo,
    event_category: "Lead",
    event_label: `Booking Submitted: ${tripType || "General"} - ${vehicle || "Vehicle"}`,
    value: 1.0,
    currency: "INR",
  });

  trackGoogleAdsEvent("generate_lead", {
    currency: "INR",
    value: 1.0,
    trip_type: tripType,
    vehicle: vehicle,
  });
}

/**
 * Track Contact Form message enquiry conversions
 */
export function trackContactConversion(details = {}) {
  const sendTo = getSendTo(process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL_CONTACT);

  trackGoogleAdsEvent("conversion", {
    send_to: sendTo,
    event_category: "Lead",
    event_label: `Contact Form: ${details.name || "Enquiry"}`,
    value: 1.0,
    currency: "INR",
  });

  trackGoogleAdsEvent("generate_lead", {
    currency: "INR",
    value: 1.0,
    lead_type: "contact_form",
  });
}
