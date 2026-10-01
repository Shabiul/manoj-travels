"use client";

import { useEffect, useState } from "react";

/** Returns true once the page has scrolled past `threshold` px. */
export function useScroll(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const isPast = window.scrollY > threshold;
        setScrolled((prev) => (prev !== isPast ? isPast : prev));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
