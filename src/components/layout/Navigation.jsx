"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation.config";
import { cn } from "@/lib/utils";

export function Navigation({ tone = "dark" }) {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  const linkTone =
    tone === "dark"
      ? "text-[var(--color-ink)]/80 hover:text-[var(--color-ink)]"
      : "text-[var(--color-text-on-dark)]/80 hover:text-[var(--color-text-on-dark)]";

  return (
    <ul className="hidden shrink-0 items-center gap-0.5 min-[1440px]:flex">
      {mainNav.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
        <li
          key={item.href}
          className="relative"
          onMouseEnter={() => item.children && setOpenMenu(item.href)}
          onMouseLeave={() => item.children && setOpenMenu(null)}
        >
          <Link
            href={item.href}
            title={`Navigate to ${item.label} — Manoj Tours and Travels`}
            className={cn(
              "relative flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-sm)] px-2 py-2.5 text-[15px] font-medium transition-colors duration-200",
              linkTone
            )}
            aria-haspopup={item.children ? "true" : undefined}
            aria-expanded={item.children ? openMenu === item.href : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            {item.children && (
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 opacity-60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M3 4.5 6 8l3-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-2 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-current transition-transform duration-300 ease-out",
                isActive && "scale-x-100"
              )}
            />
          </Link>

          {item.children && (
            <div
              className={cn(
                "absolute left-1/2 top-full z-40 w-[22rem] -translate-x-1/2 pt-3 transition-all duration-200",
                openMenu === item.href
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              )}
            >
              <div className="glass-light overflow-hidden rounded-[var(--radius-lg)] p-2 shadow-[var(--shadow-lift)]">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    title={`Explore ${child.label}: ${child.description}`}
                    className="block rounded-[var(--radius-md)] px-4 py-3 transition-colors hover:bg-[var(--color-paper-2)]"
                  >
                    <span className="block text-[16px] font-medium text-[var(--color-ink)]">
                      {child.label}
                    </span>
                    <span className="mt-0.5 block text-[14px] text-[var(--color-text-muted)]">
                      {child.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
        );
      })}
    </ul>
  );
}
