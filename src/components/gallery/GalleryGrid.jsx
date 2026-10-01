"use client";

import { useState } from "react";
import NextImage from "next/image";
import { GalleryLightbox } from "./GalleryLightbox";
import { Reveal } from "@/components/ui/Reveal";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }) {
  const [category, setCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = category === "All" ? items : items.filter((i) => i.category === category);

  return (
    <div>
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap justify-center gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            title={`Filter gallery by ${cat}`}
            className={cn(
              "rounded-[var(--radius-sm)] border px-4 py-2 text-[15px] font-medium transition-all duration-200",
              category === cat
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-text-on-dark)]"
                : "border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 90} className="mb-4 block [break-inside:avoid]">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              title={`View full image: ${item.alt}`}
              className="group relative block w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="img-hover-sweep">
                <NextImage
                  src={item.src}
                  alt={item.alt}
                  title={item.alt}
                  width={640}
                  height={480}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="p-4 text-[14px] font-medium text-[var(--color-text-on-dark)]">{item.category}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
