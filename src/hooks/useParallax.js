"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Very subtle scroll parallax for large photographic sections only — a few
 * pixels of translateY as the section crosses the viewport. Gated by an
 * IntersectionObserver (only listens to scroll while the element is
 * actually on screen), throttled with requestAnimationFrame, and fully
 * inert on mobile and under prefers-reduced-motion (returns a no-op style).
 */
export function useParallax(strength = 22) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia?.("(max-width: 1023px)").matches;
    if (reduceMotion || isMobile || typeof IntersectionObserver === "undefined") return;

    let ticking = false;
    let inView = false;

    const update = () => {
      ticking = false;
      if (!inView || !el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2) / vh - 0.5;
      el.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) onScroll();
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [strength]);

  return [ref, undefined];
}
