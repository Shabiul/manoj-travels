"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation.config";
import { useBusinessInfo } from "@/components/common/SiteDataProvider";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { CallButton } from "@/components/common/CallButton";
import { cn } from "@/lib/utils";

export function MobileMenu({ open, onClose }) {
  const pathname = usePathname();
  const business = useBusinessInfo();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[var(--color-paper)] transition-transform duration-500 ease-out 2xl:hidden",
        open ? "translate-x-0" : "translate-x-full pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
        <Logo tone="dark" />
        <button
          type="button"
          onClick={onClose}
          title="Close menu"
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-accent)] text-[var(--color-ink)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-5 py-8">
        {mainNav.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
          <div key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              title={`Navigate to ${item.label}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block py-3 font-display text-2xl font-semibold transition-colors duration-200",
                isActive ? "text-[var(--color-accent-2)]" : "text-[var(--color-ink)] hover:text-[var(--color-accent-2)]"
              )}
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="mb-3 ml-1 flex flex-col gap-1 border-l border-[var(--color-line-accent)] pl-4">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onClose}
                    title={`Book ${child.label}`}
                    className="py-2 text-base text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-accent-2)]"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          );
        })}
      </nav>

      <div className="grid grid-cols-1 gap-3 px-5 pb-8 pt-4">
        {/* Scrolls to the homepage's booking form (src/components/home/Hero.jsx,
            id="book") rather than navigating to /fleet or opening a popup. */}
        <Button href="/#book" variant="accent" size="lg" title="Book a cab online with Manoj Tours and Travels" onClick={onClose} className="w-full">
          Book Now
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <CallButton label={`Call ${business.phone.activeDisplay}`} className="w-full" />
          <WhatsAppButton label="WhatsApp" className="w-full" />
        </div>
      </div>
    </div>
  );
}
