"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Muted, looping, lazy-loaded background video. Only starts loading once it
 * scrolls near the viewport, and falls back to a static poster if playback
 * fails (or the visitor has data-saver / reduced motion preferences).
 */
export function Video({ src, poster, posterAlt, alt, className, wrapperClassName, priority = false }) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (priority || shouldLoad) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", wrapperClassName)}>
      {poster && (
        <img
          src={poster}
          alt={posterAlt || alt || "Manoj Tours and Travels — Scenic South India outstation destination"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            !failed && shouldLoad ? "opacity-0" : "opacity-100",
            className
          )}
        />
      )}
      {shouldLoad && !failed && (
        <video
          className={cn("absolute inset-0 h-full w-full object-cover", className)}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
