"use client";

import { useMemo, useState } from "react";
import { useBooking } from "@/hooks/useBooking";
import { TripTypeSelector } from "./TripTypeSelector";
import { LocationFields } from "./LocationFields";
import { DateTimeFields } from "./DateTimeFields";
import { FormField } from "@/components/forms/FormField";
import { BookingConfirmation } from "./BookingConfirmation";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PASSENGER_OPTIONS, TRIP_TYPES } from "@/lib/constants";
import { fleet } from "@/data/fleet";
import { resolveLocationName } from "@/lib/locationSearch";
import { cn } from "@/lib/utils";

// Vehicle choices come straight from the real fleet — no invented vehicles.
const FLEET_VEHICLE_OPTIONS = fleet.map((v) => ({
  value: v.slug,
  label: `${v.name} (${v.capacity})`,
}));

/** Premium homepage/hero booking / enquiry selector — dynamic per trip type. */
export function BookingForm({ className }) {
  const { values, update, errors, status, submit } = useBooking();
  const [attempted, setAttempted] = useState(false);

  const tripLabel = useMemo(
    () => TRIP_TYPES.find((t) => t.value === values.tripType)?.label,
    [values.tripType]
  );

  const whatsappMessage = useMemo(() => {
    const parts = [`Hello Manoj Tours and Travels, I'd like to enquire about a ${tripLabel} booking.`];
    const resolvedPickup = resolveLocationName(values.pickup);
    const resolvedDrop = resolveLocationName(values.drop);
    const resolvedDest = resolveLocationName(values.destination);

    if (resolvedPickup) parts.push(`Pickup: ${resolvedPickup}`);
    if (resolvedDrop) parts.push(`Drop: ${resolvedDrop}`);
    if (resolvedDest) parts.push(`Destination: ${resolvedDest}`);
    if (values.date) parts.push(`Date: ${values.date}`);
    if (values.returnDate) parts.push(`Return: ${values.returnDate}`);
    if (values.time) parts.push(`Time: ${values.time}`);
    if (values.hours) parts.push(`Package: ${values.hours}`);
    if (values.passengers) parts.push(`Passengers: ${values.passengers}`);
    if (values.vehicle) {
      parts.push(`Vehicle: ${FLEET_VEHICLE_OPTIONS.find((v) => v.value === values.vehicle)?.label || values.vehicle}`);
    }
    if (values.message) parts.push(`Message: ${values.message}`);
    return parts.join("\n");
  }, [values, tripLabel]);

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
      className={cn("glass-light w-full rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lift)] sm:p-6", className)}
    >
      <TripTypeSelector value={values.tripType} onChange={(v) => update("tripType", v)} />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LocationFields tripType={values.tripType} values={values} onChange={update} />
        <DateTimeFields tripType={values.tripType} values={values} onChange={update} />

        <FormField
          label="Car / Vehicle"
          name="vehicle"
          as="select"
          value={values.vehicle}
          onChange={(e) => update("vehicle", e.target.value)}
          options={[{ value: "", label: "Select" }, ...FLEET_VEHICLE_OPTIONS]}
        />
        <FormField
          label="Passengers"
          name="passengers"
          as="select"
          value={values.passengers}
          onChange={(e) => update("passengers", e.target.value)}
          options={["", ...PASSENGER_OPTIONS].map((v) => ({ value: v, label: v || "Select" }))}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          error={attempted ? errors.name : undefined}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          error={attempted ? errors.phone : undefined}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <FormField
        label="Message / Special Requirement"
        name="message"
        as="textarea"
        className="mt-3"
        placeholder="Any other details about your trip (optional)"
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <div className="mt-5">
        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </Button>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <CallButton variant="inline" className="w-full" />
          <WhatsAppButton message={whatsappMessage} label="WhatsApp Enquiry" className="w-full" />
        </div>
      </div>
      {status === "error" && (
        <p className="animate-fade-in mt-3 text-sm text-[var(--color-danger)]">
          Something went wrong sending your enquiry — please call or WhatsApp us instead.
        </p>
      )}
    </form>
  );
}
