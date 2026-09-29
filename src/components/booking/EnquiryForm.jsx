"use client";

import { useState } from "react";
import { useBooking } from "@/hooks/useBooking";
import { FormField } from "@/components/forms/FormField";
import { LocationAutocomplete } from "@/components/forms/LocationAutocomplete";
import { BookingConfirmation } from "./BookingConfirmation";
import { Button } from "@/components/ui/Button";
import { TRIP_TYPES, VEHICLE_OPTIONS, PASSENGER_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Enquiry / booking form used on the Fleet booking flow, service pages,
 * destination pages and the contact page. `vehicleOptions` + `defaultVehicle`
 * let the Fleet page hand this a real vehicle name pre-selected.
 */
export function EnquiryForm({
  defaultTripType = "one-way",
  defaultVehicle = "",
  vehicleOptions = VEHICLE_OPTIONS,
  className,
  title = "Send an Enquiry",
}) {
  const { values, update, errors, status, submit } = useBooking({
    tripType: defaultTripType,
    vehicle: defaultVehicle,
  });
  const [attempted, setAttempted] = useState(false);

  if (status === "success") {
    return <BookingConfirmation className={className} />;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setAttempted(true);
        await submit();
      }}
      className={cn("glass-light rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-soft)] sm:p-8", className)}
    >
      {title && <h3 className="mb-5 text-h3 font-display text-[var(--color-ink)]">{title}</h3>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          error={attempted ? errors.name : undefined}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          required
          error={attempted ? errors.phone : undefined}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <FormField
          label="Trip Type"
          name="tripType"
          as="select"
          value={values.tripType}
          onChange={(e) => update("tripType", e.target.value)}
          options={TRIP_TYPES}
        />
        <FormField
          label="Vehicle"
          name="vehicle"
          as="select"
          value={values.vehicle}
          onChange={(e) => update("vehicle", e.target.value)}
          options={[{ value: "", label: "Select" }, ...vehicleOptions]}
        />
        <LocationAutocomplete
          label="Pickup"
          name="pickup"
          placeholder="e.g. Bangalore, Indiranagar, Electronic City"
          required
          error={attempted ? errors.pickup : undefined}
          value={values.pickup}
          onChange={(e) => update("pickup", e.target.value)}
        />
        <LocationAutocomplete
          label="Destination / Drop"
          name="destination"
          placeholder="e.g. Mysore, Ooty, Coorg, Chennai"
          value={values.destination || values.drop}
          onChange={(e) => update("destination", e.target.value)}
        />
        <FormField label="Date" name="date" type="date" value={values.date} onChange={(e) => update("date", e.target.value)} />
        <FormField label="Time" name="time" type="time" value={values.time} onChange={(e) => update("time", e.target.value)} />
        <FormField
          label="Passengers"
          name="passengers"
          as="select"
          value={values.passengers}
          onChange={(e) => update("passengers", e.target.value)}
          options={["", ...PASSENGER_OPTIONS].map((v) => ({ value: v, label: v || "Select" }))}
        />
      </div>

      <FormField
        label="Message"
        name="message"
        as="textarea"
        className="mt-4"
        placeholder="Any other details about your trip"
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <Button type="submit" variant="accent" size="lg" className="mt-5 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Submit Enquiry"}
      </Button>
      {status === "error" && (
        <p className="animate-fade-in mt-3 text-sm text-[var(--color-danger)]">
          Something went wrong — please call or WhatsApp us instead.
        </p>
      )}
    </form>
  );
}
