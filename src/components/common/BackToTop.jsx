"use client";

import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

export function BackToTop({ className }) {
  const visible = useScroll(600);

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
