"use client";

import { useBusinessInfo } from "@/components/common/SiteDataProvider";
import { trackWhatsAppConversion } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.57-.35z" />
    <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.95 9.95 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.09c-1.62 0-3.13-.47-4.4-1.28l-.32-.19-3.02.79.8-2.94-.2-.31A8.08 8.08 0 0 1 3.94 12c0-4.46 3.63-8.09 8.08-8.09 4.46 0 8.08 3.63 8.08 8.09 0 4.46-3.62 8.09-8.08 8.09z" />
  </svg>
);

export function WhatsAppButton({
  message,
  label = "WhatsApp Enquiry",
  title,
  variant = "inline",
  className,
}) {
  const business = useBusinessInfo();
  const href = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(
    message || business.whatsapp.defaultMessage
  )}`;
  const buttonTitle = title || "Chat on WhatsApp with Manoj Tours and Travels";

  const handleClick = () => {
    trackWhatsAppConversion();
  };

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={buttonTitle}
        aria-label="Enquire on WhatsApp"
        onClick={handleClick}
        className={cn(
          "glass-light flex h-16 w-16 items-center justify-center rounded-full text-[var(--color-accent-2)] transition-transform duration-200 hover:scale-105 active:scale-95",
          className
        )}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={buttonTitle}
      onClick={handleClick}
      className={cn(
        "glass-light inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 py-3.5 text-[16px] font-medium text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0 active:scale-[0.98]",
        className
      )}
    >
      <WhatsAppIcon className="h-4 w-4 text-[var(--color-accent-2)]" />
      {label}
    </a>
  );
}
