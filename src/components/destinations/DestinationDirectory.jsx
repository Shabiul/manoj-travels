"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinationDirectoryCategories, destinationDirectoryRegions } from "@/data/destinationDirectory";

const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.2" strokeLinecap="round" />
  </svg>
);

/**
 * Text-only destination coverage directory: category pills, a category
 * heading + count, then a clean 3/2/1-column list of rows (name, distance,
 * one-line description, arrow) — no photo cards. Structured after the
 * reference layout, but in the site's own espresso/ivory/champagne palette
 * rather than the reference's own branding/colors.
 */
export function DestinationDirectory({ items }) {
  const [category, setCategory] = useState("All destinations");
  const [region, setRegion] = useState("All regions");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { "All destinations": items.length };
    for (const item of items) c[item.category] = (c[item.category] || 0) + 1;
    return c;
  }, [items]);

  const regionCounts = useMemo(() => {
    const c = { "All regions": items.length };
    for (const item of items) if (item.region) c[item.region] = (c[item.region] || 0) + 1;
    return c;
  }, [items]);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((item) => {
      const matchesCategory = category === "All destinations" || item.category === category;
      const matchesRegion = region === "All regions" || item.region === region;
      if (!matchesCategory || !matchesRegion) return false;
      if (!q) return true;
      return `${item.name} ${item.description}`.toLowerCase().includes(q);
    });

    const byCategory = new Map();
    for (const item of filtered) {
      if (!byCategory.has(item.category)) byCategory.set(item.category, []);
      byCategory.get(item.category).push(item);
    }
    return Array.from(byCategory.entries());
  }, [items, category, region, query]);

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-ink)] p-6 text-[var(--color-text-on-dark)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a destination — Mysore, Coorg, Ooty, Munnar..."
          aria-label="Search destinations"
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-on-dark)] bg-white/5 px-4 py-3 text-[16px] text-[var(--color-text-on-dark)] outline-none transition-colors placeholder:text-[var(--color-text-on-dark-muted)] focus:border-[var(--color-accent-soft)] sm:max-w-sm"
        />
        {/* Secondary filter dimension — state/region, independent of the
            category pills below so both can narrow the list together. */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Filter by region"
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line-on-dark)] bg-white/5 px-4 py-3 text-[15px] text-[var(--color-text-on-dark-muted)] outline-none transition-colors focus:border-[var(--color-accent-soft)] sm:w-auto"
        >
          {destinationDirectoryRegions
            .filter((r) => r === "All regions" || regionCounts[r] > 0)
            .map((r) => (
              <option key={r} value={r} className="bg-[var(--color-ink)]">
                {r} ({regionCounts[r] || 0})
              </option>
            ))}
        </select>
      </div>

      <div className="mt-5 -mx-6 flex gap-2.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
        {destinationDirectoryCategories
          .filter((c) => c === "All destinations" || counts[c] > 0)
          .map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors ${
                category === c
                  ? "border-[var(--color-accent-soft)] bg-[var(--color-accent-soft)] text-[var(--color-ink)]"
                  : "border-[var(--color-line-on-dark)] text-[var(--color-text-on-dark-muted)] hover:border-[var(--color-accent-soft)] hover:text-[var(--color-text-on-dark)]"
              }`}
            >
              {c}
              <span className="ml-1.5 opacity-70">({counts[c] || 0})</span>
            </button>
          ))}
      </div>

      {grouped.length === 0 ? (
        <p className="mt-10 text-[16px] text-[var(--color-text-on-dark-muted)]">
          No destinations match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        grouped.map(([cat, list]) => (
          <div key={cat} className="mt-10 first:mt-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-soft)]">
              {cat} <span className="ml-1 font-normal text-[var(--color-text-on-dark-muted)]">{list.length}</span>
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((item, i) => {
                const Row = (
                  <>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[16.5px] font-display font-medium text-[var(--color-text-on-dark)]">
                        {item.name}
                      </h3>
                      {item.distanceKm != null && (
                        <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-[var(--color-accent-soft)]">
                          <PinIcon className="h-3.5 w-3.5" />
                          {item.distanceKm} km
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 flex items-start justify-between gap-2 text-[14px] leading-relaxed text-[var(--color-text-on-dark-muted)]">
                      <span>{item.description}</span>
                      {item.href && <span className="shrink-0 pt-0.5">→</span>}
                    </p>
                  </>
                );
                return item.href ? (
                  <Link
                    key={`${item.name}-${i}`}
                    href={item.href}
                    title={`Explore Bangalore to ${item.name} taxi route details`}
                    className="group block transition-colors hover:text-[var(--color-accent-soft)]"
                  >
                    {Row}
                  </Link>
                ) : (
                  <div key={`${item.name}-${i}`}>{Row}</div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
