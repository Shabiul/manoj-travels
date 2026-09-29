"use client";

import { LocationAutocomplete } from "@/components/forms/LocationAutocomplete";

/** Renders the right pickup/drop/destination fields for the selected trip type with intelligent Indian location autocomplete and alias resolution. */
export function LocationFields({ tripType, values, onChange }) {
  const set = (field) => (e) => onChange(field, e.target.value);

  if (tripType === "local") {
    return (
      <LocationAutocomplete
        label="Pickup Location"
        name="pickup"
        placeholder="e.g. Bangalore, Electronic City, Kanakapura Road"
        required
        value={values.pickup}
        onChange={set("pickup")}
      />
    );
  }

  if (tripType === "round-trip" || tripType === "tour-package") {
    return (
      <>
        <LocationAutocomplete
          label="Pickup"
          name="pickup"
          placeholder="e.g. Bangalore"
          required
          value={values.pickup}
          onChange={set("pickup")}
        />
        <LocationAutocomplete
          label="Destination"
          name="destination"
          placeholder="e.g. Ooty, Coorg, Mysore, Wayanad"
          required
          value={values.destination}
          onChange={set("destination")}
        />
      </>
    );
  }

  // one-way, airport
  return (
    <>
      <LocationAutocomplete
        label={tripType === "airport" ? "City / Locality" : "Pickup"}
        name="pickup"
        placeholder={tripType === "airport" ? "e.g. Koramangala, Whitefield, Jayanagar" : "e.g. Bangalore"}
        required
        value={values.pickup}
        onChange={set("pickup")}
      />
      <LocationAutocomplete
        label={tripType === "airport" ? "Airport" : "Drop Location"}
        name="drop"
        placeholder={tripType === "airport" ? "Kempegowda International Airport (BLR)" : "e.g. Mysore, Chennai, Coimbatore"}
        required
        value={values.drop}
        onChange={set("drop")}
      />
    </>
  );
}

