"use client";

import { useEffect, useRef, useState } from "react";
import { useKenBurns } from "@/hooks/useKenBurns";
import { cn } from "@/lib/utils";

// Video 1 → Video 2 → Video 1 → ...
const SOURCES = [
  { src: "/videos/hero/jog-falls.mp4", position: "50% 50%" }, // native landscape
  { src: "/videos/hero/munnarr.mp4", position: "50% 38%" }, // portrait source, cover-cropped
];
const STALL_RECOVERY_MS = 4000;

/**
 * Full-screen cinematic hero loop across two clips, crossfading
 * Video 1 (Jog Falls) → Video 2 (Munnar) → Video 1 → ...
 *
 * Two real bugs were found (by instrumenting actual playback in a browser,
 * not guessed) and fixed here — both remain fixed:
 *
 *  1. A mount-timing race: a small `autoPlay` clip can finish loading and
 *     fire `canplay` while React is still committing — before this effect
 *     has run to attach the listener that records readiness. That dropped
 *     event permanently latched a clip as "not ready", breaking the loop
 *     back to it. Fixed by also checking `readyState >= 3`
 *     (HAVE_FUTURE_DATA) right when the listener attaches.
 *  2. `stalled`/`waiting` are buffering, not failure. Treating them as
 *     fatal permanently blacklists a clip after one brief network hiccup.
 *     Both now start a short recovery timer; `playing` cancels it, and
 *     only a stall still stuck after ~4s triggers a forced `load()` +
 *     `play()` before the clip is written off.
 *
 * Loading strategy: only the active clip preloads eagerly. The *next* clip
 * in the sequence starts preloading once the active one is a couple of
 * seconds from ending — so both clips never fight for bandwidth at once.
 */
export function HeroVideo({ className }) {
  const count = SOURCES.length;
  const refs = [useRef(null), useRef(null)];
  const ready = useRef(SOURCES.map(() => false));
  const failed = useRef(SOURCES.map(() => false));
  const stallTimers = useRef(SOURCES.map(() => null));
  const activeRef = useRef(0);
  const switchPendingRef = useRef(false);

  const [active, setActive] = useState(0);
  const [armedForPreload, setArmedForPreload] = useState(0); // preload up through this index
  const [firstFramePainted, setFirstFramePainted] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const kenBurnsEnabled = useKenBurns();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const hasDataSaver = navigator.connection?.saveData === true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isLg && !hasDataSaver && !prefersReducedMotion) {
      setIsDesktop(true);
    }
  }, []);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const clearStallTimer = (index) => {
    if (stallTimers.current[index]) {
      clearTimeout(stallTimers.current[index]);
      stallTimers.current[index] = null;
    }
  };

  const nextReadyIndex = (from) => {
    // Find the next clip in sequence that is ready and hasn't failed;
    // falls back to null if none are available yet.
    const candidate = (from + 1) % count;
    return ready.current[candidate] && !failed.current[candidate] ? candidate : null;
  };

  const switchTo = (index) => {
    const current = refs[activeRef.current].current;
    const next = refs[index].current;
    if (current) current.pause();
    if (next) {
      next.currentTime = 0;
      next.play().catch(() => {});
    }
    switchPendingRef.current = false;
    setActive(index);
    setArmedForPreload((v) => Math.max(v, index + 1)); // keep the pipeline moving
  };

  const markFailed = (index) => {
    failed.current[index] = true;
    if (index === activeRef.current) {
      const next = nextReadyIndex(index);
      if (next !== null) switchTo(next);
    }
    if (failed.current.every(Boolean)) setAllFailed(true);
  };

  useEffect(() => {
    if (!isDesktop) return;
    const cleanups = [];

    refs.forEach((ref, index) => {
      const el = ref.current;
      if (!el) return;

      const onCanPlay = () => {
        ready.current[index] = true;
        if (switchPendingRef.current && index !== activeRef.current) {
          switchTo(index);
        }
      };

      const onPlaying = () => {
        clearStallTimer(index);
        if (index === activeRef.current) setFirstFramePainted(true);
      };

      const onTimeUpdate = () => {
        if (index !== activeRef.current || !el.duration) return;
        const remaining = el.duration - el.currentTime;
        if (remaining < 2.5) setArmedForPreload((v) => Math.max(v, index + 1)); // arm just the next clip
      };

      const onEnded = () => {
        if (index !== activeRef.current) return;
        const next = nextReadyIndex(index);
        if (next !== null) {
          switchTo(next);
        } else {
          // Next clip isn't ready yet — replay this one rather than
          // showing a black frame, and hand off as soon as it can.
          switchPendingRef.current = true;
          el.currentTime = 0;
          el.play().catch(() => {});
        }
      };

      // Buffering is normal, not a failure — start a short recovery
      // window rather than reacting immediately.
      const onStallLike = () => {
        if (stallTimers.current[index]) return; // already watching
        stallTimers.current[index] = setTimeout(() => {
          stallTimers.current[index] = null;
          try {
            el.load();
            el.play().catch(() => markFailed(index));
          } catch {
            markFailed(index);
          }
        }, STALL_RECOVERY_MS);
      };

      const onError = () => {
        clearStallTimer(index);
        markFailed(index);
      };

      el.addEventListener("canplay", onCanPlay);
      el.addEventListener("loadeddata", onCanPlay);
      el.addEventListener("playing", onPlaying);
      el.addEventListener("timeupdate", onTimeUpdate);
      el.addEventListener("ended", onEnded);
      el.addEventListener("waiting", onStallLike);
      el.addEventListener("stalled", onStallLike);
      el.addEventListener("error", onError);

      // Race-condition fix: catch the case where canplay/loadeddata already
      // fired before this listener was attached (see file doc comment).
      if (el.readyState >= 3) onCanPlay();

      cleanups.push(() => {
        el.removeEventListener("canplay", onCanPlay);
        el.removeEventListener("loadeddata", onCanPlay);
        el.removeEventListener("playing", onPlaying);
        el.removeEventListener("timeupdate", onTimeUpdate);
        el.removeEventListener("ended", onEnded);
        el.removeEventListener("waiting", onStallLike);
        el.removeEventListener("stalled", onStallLike);
        el.removeEventListener("error", onError);
        clearStallTimer(index);
      });
    });

    // Kick off the first clip explicitly — autoPlay alone can silently no-op
    // in some mobile browsers if it races the element's readiness.
    refs[0].current?.play().catch(() => {});

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className={cn("absolute inset-0 h-full w-full overflow-hidden bg-[var(--color-ink)]", className)}>
      {/* CSS-only fallback — instant paint, no network request. Also the
          permanent fallback if every clip genuinely fails to play. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#362f29_0%,#241f1c_55%,#181410_100%)] transition-opacity duration-1000",
          firstFramePainted && !allFailed ? "opacity-0" : "opacity-100"
        )}
      />

      {SOURCES.map((source, index) => (
        // The Ken Burns drift lives on this wrapper's own transform, entirely
        // separate from the <video>'s own inline transform below (which
        // drives the crossfade scale/opacity) — two independent transforms
        // on two different elements, so neither ever overwrites the other.
        <div
          key={source.src}
          className={cn("absolute inset-0 h-full w-full overflow-hidden", kenBurnsEnabled && active === index && "kenburns")}
        >
          <video
            ref={refs[index]}
            src={source.src}
            className="h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out"
            style={{
              objectPosition: source.position,
              opacity: active === index ? 1 : 0,
              transform: active === index ? "scale(1)" : "scale(1.03)",
            }}
            muted
            playsInline
            autoPlay={index === 0}
            preload={index <= armedForPreload ? "auto" : "none"}
          />
        </div>
      ))}
    </div>
  );
}
