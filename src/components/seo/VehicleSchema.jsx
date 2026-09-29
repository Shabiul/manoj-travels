import { vehicleSchema } from "@/lib/structured-data";

export function VehicleSchema({ vehicle }) {
  if (!vehicle) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema(vehicle)) }}
    />
  );
}
