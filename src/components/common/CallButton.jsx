"use client";

import { callLink } from "@/config/business.config";
import { useBusinessInfo } from "@/components/common/SiteDataProvider";
import { trackPhoneConversion } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5.5c0-1.1.9-2 2-2h2.2c.5 0 1 .3 1.2.8l1.3 3a1.4 1.4 0 0 1-.4 1.6L7.8 10.2a12 12 0 0 0 6 6l1.3-1.5a1.4 1.4 0 0 1 1.6-.4l3 1.3c.5.2.8.7.8 1.2V19c0 1.1-.9 2-2 2h-1C10.6 21 3 13.4 3 5.5z"
    />
  </svg>
);

export function CallButton({
  number,
  label = "Call Now",
  title,
  variant = "inline",
  className,
}) {
  const business = useBusinessInfo();
  const activeNumber = number || business.phone.active;
  const href = callLink(activeNumber);
  const displayNum = business.phone.activeDisplay || business.phone.primaryDisplay;
  const buttonTitle = title || `Call Manoj Tours and Travels at ${displayNum}`;

  const handleClick = () => {
    trackPhoneConversion(displayNum);
  };

  if (variant === "floating") {
    return (
      <a
        href={href}
        title={buttonTitle}
        aria-label="Call Manoj Tours and Travels"
        onClick={handleClick}
        className={cn(
          "glass-accent flex h-16 w-16 items-center justify-center rounded-full text-[var(--color-text-on-dark)] shadow-[var(--shadow-lift)] transition-transform duration-200 hover:scale-105 active:scale-95",
          className
        )}
      >
        <PhoneIcon className="h-7 w-7" />
      </a>
    );
  }

  return (
    <a
      href={href}
      title={buttonTitle}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] px-6 py-3.5 text-[16px] font-medium text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0 active:scale-[0.98]",
        className
      )}
    >
      <PhoneIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
