"use client";

import { useState, useRef, useEffect, useId, useCallback } from "react";
import { searchLocations, resolveLocationName } from "@/lib/locationSearch";
import { cn } from "@/lib/utils";

// --- Location Type Icons ---
function LocationIcon({ type, className = "h-4 w-4" }) {
  if (type === "airport") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    );
  }
  if (type === "station") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="16" height="16" x="4" y="3" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m18 22-2-3" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </svg>
    );
  }
  if (type === "hill-station" || type === "wildlife") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    );
  }
  if (type === "locality") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
        <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    );
  }
  // Default pin
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/**
 * Intelligent location autocomplete with full Indian city coverage,
 * Bangalore locality hubs, airports, and automatic alias resolution
 * (e.g. typing "Bengaluru" resolves to "Bangalore (Bengaluru)").
 */
export function LocationAutocomplete({
  label,
  name,
  value = "",
  onChange,
  placeholder = "Search city or location",
  required = false,
  error,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();

  // Update suggestions when value changes or when opened
  const refreshSuggestions = useCallback((query) => {
    const results = searchLocations(query, 8);
    setSuggestions(results);
  }, []);

  useEffect(() => {
    refreshSuggestions(value);
  }, [value, refreshSuggestions]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        // On blur, auto-resolve canonical name if user typed an exact alias like "bengaluru"
        if (value && typeof value === "string") {
          const resolved = resolveLocationName(value);
          if (resolved !== value && onChange) {
            onChange({ target: { name, value: resolved } });
          }
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, name, onChange]);

  const selectItem = (item) => {
    const selectedName = item.name;
    if (onChange) {
      onChange({ target: { name, value: selectedName } });
    }
    setIsOpen(false);
    setActiveIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (onChange) onChange(e);
    setIsOpen(true);
    setActiveIndex(-1);
    refreshSuggestions(val);
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev < suggestions.length - 1 ? prev + 1 : 0;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const next = prev > 0 ? prev - 1 : suggestions.length - 1;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "Enter") {
      if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        selectItem(suggestions[activeIndex]);
      } else if (isOpen && value.trim()) {
        // If user typed a custom query and pressed enter, auto-resolve alias or keep custom
        e.preventDefault();
        const resolved = resolveLocationName(value);
        if (resolved !== value && onChange) {
          onChange({ target: { name, value: resolved } });
        }
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const scrollActiveIntoView = (index) => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("[role='option']");
    if (items[index]) {
      items[index].scrollIntoView({ block: "nearest" });
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ target: { name, value: "" } });
    }
    refreshSuggestions("");
    setIsOpen(true);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative block", className)}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
        {required && <span className="text-[var(--color-accent-2)]"> *</span>}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          required={required}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            refreshSuggestions(value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-[var(--radius-md)] border border-[rgba(200,183,156,0.4)] bg-white/60 px-4 py-3.5 pr-10 text-[17px] text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)] backdrop-blur-sm transition-all duration-200 ease-out focus:-translate-y-px focus:border-[var(--color-accent)] focus:bg-white/85 focus:shadow-[0_0_0_4px_rgba(215,122,97,0.12)] focus:outline-none"
        />

        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)] focus:outline-none"
            aria-label="Clear location input"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : (
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] opacity-60">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        )}
      </div>

      {error && <span className="animate-fade-in mt-1 block text-[14px] text-[var(--color-danger)]">{error}</span>}

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          id={`${id}-listbox`}
          ref={listRef}
          role="listbox"
          className="glass-light animate-fade-in absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-72 overflow-y-auto rounded-[var(--radius-md)] border border-[rgba(200,183,156,0.5)] bg-white/95 p-1.5 shadow-[var(--shadow-lift)] backdrop-blur-md"
        >
          {suggestions.length > 0 ? (
            <>
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {value.trim() ? "Matching Cities & Locations" : "Popular Hubs & Destinations"}
              </div>
              {suggestions.map((loc, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={`${loc.name}-${idx}`}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => selectItem(loc)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-left transition-colors",
                      isActive
                        ? "bg-[var(--color-paper-2)] text-[var(--color-ink)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-paper)]"
                    )}
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-accent)] shadow-xs">
                      <LocationIcon type={loc.type} className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[15px] font-medium text-[var(--color-ink)]">
                          {loc.name}
                        </span>
                        {loc.isAliasResolved && (
                          <span className="shrink-0 rounded-full bg-[rgba(74,38,48,0.08)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-accent)]">
                            Resolved
                          </span>
                        )}
                      </div>
                      <div className="truncate text-[12px] text-[var(--color-text-muted)]">
                        {loc.category} · {loc.state}
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          ) : (
            <div className="px-3 py-3 text-center text-[13px] text-[var(--color-text-muted)]">
              No matching city found in directory.
            </div>
          )}

          {/* Custom address option if user entered specific local text */}
          {value.trim() && !suggestions.some((s) => s.name.toLowerCase() === value.trim().toLowerCase()) && (
            <div className="mt-1 border-t border-[rgba(200,183,156,0.3)] pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-left text-[13px] text-[var(--color-accent)] hover:bg-[var(--color-paper)]"
              >
                <svg className="h-4 w-4 shrink-0 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                <span className="truncate">
                  Use custom location: <strong className="font-semibold text-[var(--color-ink)]">"{value.trim()}"</strong>
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
