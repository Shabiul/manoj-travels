"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";

export function GalleryLightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];
  const [shown, setShown] = useState(false);
  const [closing, setClosing] = useState(false);

  // Fade the backdrop out before actually unmounting, so closing feels like
  // a dissolve rather than an instant cut.
  const requestClose = () => {
    setClosing(true);
    window.setTimeout(onClose, 220);
  };

  // A short opacity crossfade each time the index changes — the previous
  // frame stays fully painted right up until the next one is ready, so
  // navigating between images never shows a blank/black flash.
  useEffect(() => {
    setShown(false);
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length, onNavigate]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-ink)]/92 p-4 transition-opacity duration-200 sm:p-8 ${closing ? "opacity-0" : "animate-fade-in opacity-100"}`}
    >
      <button
        type="button"
        onClick={requestClose}
        aria-label="Close gallery"
        title="Close image lightbox"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line-on-dark)] text-[var(--color-text-on-dark)] transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onNavigate((index - 1 + items.length) % items.length)}
        aria-label="Previous image"
        title="View previous image"
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line-on-dark)] text-[var(--color-text-on-dark)] transition-colors hover:bg-white/10 sm:left-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onNavigate((index + 1) % items.length)}
        aria-label="Next image"
        title="View next image"
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line-on-dark)] text-[var(--color-text-on-dark)] transition-colors hover:bg-white/10 sm:right-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className={`lightbox-frame relative h-[80vh] w-full max-w-4xl ${shown ? "is-shown" : ""}`}>
        <NextImage src={item.src} alt={item.alt} title={item.alt} fill sizes="90vw" className="object-contain" />
      </div>
    </div>
  );
}
