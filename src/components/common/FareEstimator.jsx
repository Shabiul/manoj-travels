"use client";

import { useState, useMemo } from "react";
import { trackWhatsAppConversion, trackPhoneConversion } from "@/lib/analytics";
import { business } from "@/config/business.config";
import { cn } from "@/lib/utils";

// Verified corridor distance matrix from Bangalore hubs
const ORIGINS = [
  { id: "whitefield", label: "Whitefield (East Bangalore)", extraKm: 20 },
  { id: "electronic-city", label: "Electronic City (South Bangalore)", extraKm: 5 },
  { id: "koramangala", label: "Koramangala / HSR Layout", extraKm: 10 },
  { id: "indiranagar", label: "Indiranagar / MG Road", extraKm: 12 },
  { id: "hebbal", label: "Hebbal / Manyata Tech Park", extraKm: 18 },
  { id: "airport-blr", label: "Kempegowda Airport (BLR T1/T2)", extraKm: 40 },
  { id: "majestic", label: "Majestic / Bangalore City Station", extraKm: 5 },
  { id: "banashankari", label: "Banashankari / Kengeri (Expressway Entry)", extraKm: 0 },
];

const DESTINATIONS = [
  {
    id: "mysore",
    label: "Mysore (Palace / Chamundi / City)",
    baseKm: 143,
    approxHours: "1h 45m",
    tollCharges: 330,
    oneWayFares: { sedan: 2499, ertiga: 3499, innova: 4899, tempo: 6999 },
    recommendedVehicle: "Swift Dzire or Innova Crysta",
    bestRoute: "Bengaluru-Mysuru Expressway (NH275)",
  },
  {
    id: "mangalore",
    label: "Mangalore (Panambur / Beaches / Temples)",
    baseKm: 350,
    approxHours: "6h 45m",
    tollCharges: 420,
    oneWayFares: { sedan: 5499, ertiga: 7499, innova: 9899, tempo: 13999 },
    recommendedVehicle: "Innova Crysta or Force Urbania",
    bestRoute: "NH75 via Hassan & Sakleshpur (Shiradi Ghat)",
  },
  {
    id: "nandi-hills",
    label: "Nandi Hills (Sunrise / Day Trip Return)",
    baseKm: 60,
    approxHours: "1h 15m",
    tollCharges: 115,
    oneWayFares: { sedan: 1599, ertiga: 2199, innova: 2899, tempo: 4299 },
    recommendedVehicle: "Swift Dzire or Ertiga",
    bestRoute: "NH44 via Devanahalli / Chikkaballapur bypass",
  },
  {
    id: "coorg",
    label: "Coorg (Madikeri Coffee Hills)",
    baseKm: 250,
    approxHours: "5h 15m",
    tollCharges: 330,
    oneWayFares: { sedan: 4199, ertiga: 5699, innova: 7499, tempo: 10999 },
    recommendedVehicle: "Toyota Innova Crysta",
    bestRoute: "NH275 via Mysore Bypass & Kushalnagar",
  },
  {
    id: "ooty",
    label: "Ooty (Nilgiris Queen of Hills)",
    baseKm: 275,
    approxHours: "6h 00m",
    tollCharges: 380,
    oneWayFares: { sedan: 4699, ertiga: 6299, innova: 8499, tempo: 12499 },
    recommendedVehicle: "Toyota Innova Crysta",
    bestRoute: "NH275 -> Mysore -> Bandipur -> Masinagudi 36 Hairpins",
  },
  {
    id: "tirupati",
    label: "Tirupati (Sri Venkateswara Balaji Temple)",
    baseKm: 250,
    approxHours: "4h 45m",
    tollCharges: 280,
    oneWayFares: { sedan: 3999, ertiga: 5499, innova: 7299, tempo: 10499 },
    recommendedVehicle: "Innova Crysta or Tempo Traveller",
    bestRoute: "NH75 via Kolar, Mulbagal & Chittoor",
  },
];

const VEHICLES = [
  { id: "sedan", label: "Swift Dzire / Toyota Etios (Sedan Prime, 4+1 Pax)", ratePerKm: 12, luggage: "2 Large Bags" },
  { id: "ertiga", label: "Maruti Ertiga (Family MPV, 6+1 Pax)", ratePerKm: 14, luggage: "3 Medium Bags" },
  { id: "innova", label: "Toyota Innova Crysta (Luxury Executive, 7+1 Pax)", ratePerKm: 18.5, luggage: "5 Large Bags" },
  { id: "tempo", label: "12-Seater Tempo Traveller / Urbania (Group, 12+1 Pax)", ratePerKm: 24, luggage: "8+ Large Bags" },
];

export function FareEstimator({ initialDestination = "mysore", className }) {
  const [originId, setOriginId] = useState("banashankari");
  const [destId, setDestId] = useState(initialDestination);
  const [vehicleId, setVehicleId] = useState("sedan");
  const [tripType, setTripType] = useState("one-way"); // "one-way" | "round-trip"

  const origin = useMemo(() => ORIGINS.find((o) => o.id === originId) || ORIGINS[0], [originId]);
  const destination = useMemo(() => DESTINATIONS.find((d) => d.id === destId) || DESTINATIONS[0], [destId]);
  const vehicle = useMemo(() => VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0], [vehicleId]);

  const calculation = useMemo(() => {
    const totalOneWayKm = destination.baseKm + origin.extraKm;
    const toll = destination.tollCharges;

    if (tripType === "one-way") {
      // One-way fixed tariff calculation with origin buffer
      const baseFare = destination.oneWayFares[vehicle.id] || 2499;
      const originBuffer = origin.extraKm > 10 ? origin.extraKm * vehicle.ratePerKm : 0;
      const estimatedTotal = Math.round(baseFare + originBuffer);

      return {
        distanceKm: totalOneWayKm,
        travelTime: destination.approxHours,
        baseFare: estimatedTotal,
        tollEstimate: toll,
        driverBata: 0,
        grandTotal: estimatedTotal + toll,
        bestRoute: destination.bestRoute,
      };
    } else {
      // Round trip calculation (min 300 km/day)
      const roundTripKm = Math.max(300, totalOneWayKm * 2);
      const runningFare = Math.round(roundTripKm * vehicle.ratePerKm);
      const driverBata = vehicle.id === "tempo" ? 600 : 450;
      const totalTolls = toll * 2;

      return {
        distanceKm: roundTripKm,
        travelTime: `${destination.approxHours} (each way)`,
        baseFare: runningFare,
        tollEstimate: totalTolls,
        driverBata,
        grandTotal: runningFare + totalTolls + driverBata,
        bestRoute: destination.bestRoute,
      };
    }
  }, [origin, destination, vehicle, tripType]);

  const whatsappMessage = useMemo(() => {
    return `Hi Manoj Tours, I'd like to book an outstation cab:
• From: ${origin.label}
• To: ${destination.label}
• Vehicle: ${vehicle.label.split(" (")[0]}
• Trip Type: ${tripType === "one-way" ? "One Way Drop" : "Round Trip Package"}
• Estimated Fare: ₹${calculation.grandTotal.toLocaleString("en-IN")} (incl. tolls)
Please confirm availability and chauffeur assignment.`;
  }, [origin, destination, vehicle, tripType, calculation]);

  const handleWhatsAppClick = () => {
    trackWhatsAppConversion();
    const url = `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCallClick = () => {
    trackPhoneConversion(business.phone.activeDisplay);
    window.location.href = `tel:+91${business.phone.active}`;
  };

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/95 p-5 shadow-[var(--shadow-lift)] sm:p-7 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-2)]">
            Instant Route &amp; Fare Estimator
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
            Calculate Cab Fare from Bangalore
          </h3>
        </div>
        {/* Trip Type Selector */}
        <div className="inline-flex rounded-full bg-[var(--color-sand)] p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTripType("one-way")}
            className={cn(
              "rounded-full px-3.5 py-1.5 transition-all",
              tripType === "one-way"
                ? "bg-[var(--color-ink)] text-white shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            One-Way Drop
          </button>
          <button
            type="button"
            onClick={() => setTripType("round-trip")}
            className={cn(
              "rounded-full px-3.5 py-1.5 transition-all",
              tripType === "round-trip"
                ? "bg-[var(--color-ink)] text-white shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            Round Trip
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Origin Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
            1. Pickup Location (Bangalore)
          </label>
          <select
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white p-2.5 text-sm font-medium text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            {ORIGINS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
            2. Destination
          </label>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white p-2.5 text-sm font-medium text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Dropdown */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">
            3. Vehicle Category
          </label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white p-2.5 text-sm font-medium text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none"
          >
            {VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Instant Estimation Card */}
      <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-sand)]/50 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-b border-[var(--color-line)]/70 pb-4">
          <div>
            <span className="text-xs text-[var(--color-text-muted)] block">Est. Highway Distance</span>
            <span className="font-display text-lg font-bold text-[var(--color-ink)]">
              ~{calculation.distanceKm} km
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--color-text-muted)] block">Est. Drive Time</span>
            <span className="font-display text-lg font-bold text-[var(--color-ink)]">
              {calculation.travelTime}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--color-text-muted)] block">FASTag Toll (Actuals)</span>
            <span className="font-display text-lg font-bold text-[var(--color-ink)]">
              ₹{calculation.tollEstimate}
            </span>
          </div>
          <div>
            <span className="text-xs text-[var(--color-text-muted)] block">Luggage Allowance</span>
            <span className="font-display text-sm font-semibold text-[var(--color-accent-strong,#b84000)]">
              {vehicle.luggage}
            </span>
          </div>
        </div>

        {/* Total Price and Action Strip */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-1">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-[var(--color-text-muted)] block">
              Estimated Total Fare ({tripType === "one-way" ? "One-Way Drop" : "Round-Trip Package"})
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-extrabold text-[var(--color-accent-2)]">
                ₹{calculation.grandTotal.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                (Fare: ₹{calculation.baseFare} + Toll: ₹{calculation.tollEstimate}
                {calculation.driverBata > 0 ? ` + Bata: ₹${calculation.driverBata}` : ""})
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              Route: <span className="font-medium text-[var(--color-ink)]">{calculation.bestRoute}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              title="Book this exact route on WhatsApp"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.08-.13-.27-.2-.57-.35z" />
                <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.95 9.95 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2zm0 18.09c-1.62 0-3.13-.47-4.4-1.28l-.32-.19-3.02.79.8-2.94-.2-.31A8.08 8.08 0 0 1 3.94 12c0-4.46 3.63-8.09 8.08-8.09 4.46 0 8.08 3.63 8.08 8.09 0 4.46-3.62 8.09-8.08 8.09z" />
              </svg>
              WhatsApp to Book This Exact Route
            </button>
            <button
              type="button"
              onClick={handleCallClick}
              title={`Call driver dispatch at ${business.phone.activeDisplay}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent-2)] transition-colors"
            >
              Call Dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
