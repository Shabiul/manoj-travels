import { INDIAN_LOCATIONS } from "../data/indianLocations.js";

/**
 * Normalizes text for lenient searching (lowercased, trimmed, accents/punctuation cleaned)
 */
function clean(str = "") {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Searches the Indian locations dataset with intelligent alias resolution,
 * prioritizing exact matches, alias equivalents (e.g. Bengaluru <-> Bangalore),
 * word-boundary prefix matches, and popular regional destinations.
 */
export function searchLocations(query = "", limit = 8) {
  const q = clean(query);

  if (!q) {
    // Return curated popular hubs for an empty search
    return INDIAN_LOCATIONS.filter((loc) => loc.popular).slice(0, limit);
  }

  const scored = [];

  for (const loc of INDIAN_LOCATIONS) {
    const locClean = clean(loc.name);
    const canClean = clean(loc.canonical);
    const aliases = (loc.aliases || []).map(clean);

    let score = 0;
    let matchedAlias = null;

    // 1. Exact alias match (e.g. user typed "bengaluru" or "bangalore" or "mysuru")
    const exactAlias = aliases.find((a) => a === q);
    if (exactAlias) {
      score = 1000;
      matchedAlias = exactAlias;
    } else if (locClean === q || canClean === q) {
      score = 950;
    }
    // 2. Starts-with alias or canonical
    else if (aliases.some((a) => a.startsWith(q))) {
      score = 800;
      matchedAlias = aliases.find((a) => a.startsWith(q));
    } else if (locClean.startsWith(q) || canClean.startsWith(q)) {
      score = 750;
    }
    // 3. Word boundary match (e.g. "Airport" in "Kempegowda International Airport")
    else if (
      locClean.split(" ").some((w) => w.startsWith(q)) ||
      canClean.split(" ").some((w) => w.startsWith(q))
    ) {
      score = 600;
    }
    // 4. Substring in aliases
    else if (aliases.some((a) => a.includes(q))) {
      score = 450;
      matchedAlias = aliases.find((a) => a.includes(q));
    }
    // 5. Substring in name or state
    else if (locClean.includes(q) || canClean.includes(q)) {
      score = 400;
    } else if (clean(loc.state).includes(q)) {
      score = 200;
    }

    if (score > 0) {
      if (loc.popular) score += 25; // boost popular hubs slightly
      scored.push({
        ...loc,
        score,
        matchedAlias: matchedAlias && matchedAlias !== q ? matchedAlias : null,
        isAliasResolved: Boolean(matchedAlias && matchedAlias.toLowerCase() !== loc.canonical.toLowerCase()),
      });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/**
 * Resolves a location string to its canonical representation if a strong alias is detected.
 * For example:
 * "bengaluru" -> "Bangalore (Bengaluru)"
 * "mysuru" -> "Mysore (Mysuru)"
 * "puducherry" -> "Pondicherry (Puducherry)"
 */
export function resolveLocationName(input = "") {
  if (!input) return "";
  const trimmed = input.trim();
  const q = clean(trimmed);

  for (const loc of INDIAN_LOCATIONS) {
    const aliases = (loc.aliases || []).map(clean);
    if (aliases.includes(q) || clean(loc.canonical) === q || clean(loc.name) === q) {
      return loc.name;
    }
  }

  return trimmed;
}
