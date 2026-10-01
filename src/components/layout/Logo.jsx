import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoSrc from "../../../public/images/logo/manoj-logo.png";

/**
 * Real brand mark (public/images/logo/manoj-logo.png) framed into a compact
 * circular chip — the source artwork is a full illustrated crest on a navy
 * field, so it's center-cropped into a small mark rather than stretched
 * flat across the nav. Paired with the wordmark, never replaced by it.
 */
export function Logo({ tone = "dark", size = "md", compactOnMobile = false, className }) {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-14 w-14" : "h-11 w-11";
  const nameSize = size === "sm" ? "text-[1rem]" : "text-[1.125rem] sm:text-[1.25rem]";
  const taglineSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <Link
      href="/"
      title="Manoj Tours and Travels — Home"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Manoj Tours and Travels — Home"
    >
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--color-line-accent)] shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-105",
          dims
        )}
      >
        <Image
          src={logoSrc}
          alt="Manoj Tours and Travels crest"
          title="Manoj Tours and Travels brand crest"
          fill
          sizes="56px"
          className="object-cover"
          priority
        />
      </span>
      <span className={cn("flex-col leading-none", compactOnMobile ? "hidden sm:flex" : "flex")}>
        <span
          className={cn(
            "whitespace-nowrap font-display font-semibold tracking-tight",
            nameSize,
            tone === "dark" ? "text-[var(--color-ink)]" : "text-[var(--color-text-on-dark)]"
          )}
        >
          Manoj{" "}
          <span className={tone === "dark" ? "text-[var(--color-accent-2)]" : "text-[var(--color-accent-soft)]"}>
            Tours
          </span>{" "}
          &amp; Travels
        </span>
        <span
          className={cn(
            "mt-0.5 whitespace-nowrap font-medium uppercase tracking-[0.2em]",
            taglineSize,
            tone === "dark" ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-on-dark-muted)]"
          )}
        >
          Manoj Taxi Service · Bangalore
        </span>
      </span>
    </Link>
  );
}
