import { business } from "@/config/business.config";

export const generalFaqs = [
  {
    question: "Do you provide one-way taxi services from Bangalore?",
    answer:
      "Yes, Manoj Tours and Travels provides dedicated one-way outstation taxi drops across South India with zero return-kilometer charges. Passengers pay strictly for the single-direction journey in Swift Dzire, Toyota Etios, Toyota Innova Crysta, or Tempo Traveller vehicles.",
  },
  {
    question: "Do you provide airport pickup and drop?",
    answer:
      `Yes, we provide 24×7 dedicated airport transfers between Kempegowda International Airport (BLR) and all Bangalore zones, complete with flight delay tracking. Fares depend on pickup locality and vehicle category — call or WhatsApp us at ${business.phone.primaryDisplay} for immediate fare confirmation.`,
  },
  {
    question: "Are your cab services available 24×7?",
    answer:
      "Yes, Manoj Tours and Travels (Manoj Taxi Service) operates round the clock, 24 hours a day, 7 days a week, 365 days a year. Our operations desk and drivers handle midnight arrivals, early morning airport runs, and emergency outstation dispatches.",
  },
  {
    question: "What vehicles are available in your fleet?",
    answer:
      "Our commercial fleet includes 4-seater sedans (Swift Dzire, Toyota Etios), 6-to-7-seater premium SUVs (Toyota Innova, Innova Crysta), and 12-to-16-seater Force Urbania / Tempo Travellers for larger family and corporate groups. All vehicles are yellow-board commercial taxis maintained to strict Karnataka safety compliance.",
  },
  {
    question: "How is round-trip pricing calculated?",
    answer:
      "Round-trip outstation fares are calculated on actual per-kilometre running distance with a standard 300 km daily minimum charge plus a daily driver allowance (Bata). Under Karnataka and South India tourist taxi norms, this covers the vehicle remaining exclusively at your disposal for local sightseeing and return travel.",
  },
  {
    question: "What is included in the local cab package?",
    answer:
      "The local Bangalore cab package includes 8 hours of dedicated chauffeur service and 80 kilometres of city travel for sightseeing, shopping, or corporate visits. Any additional usage beyond 8 hrs / 80 km is billed at clear, fixed per-extra-hour and per-extra-kilometre rates specified on our Local Cabs page.",
  },
  {
    question: "Are tolls and parking included in the fare?",
    answer:
      "No, highway tolls, parking fees, and interstate permit taxes are billed at actuals and are not included in base rates unless booked as an all-inclusive custom package. Electronic toll payments are logged via FASTag as per National Highways Authority of India (NHAI) regulations.",
  },
  {
    question: "How can I book a cab with Manoj Tours and Travels?",
    answer:
      `You can book instantly by calling or WhatsApping our operations desk at ${business.phone.primaryDisplay}, or by submitting your trip details through the online booking form on this website. Our team confirms driver details, vehicle model, and exact fare directly before your departure.`,
  },
  {
    question: "How can I contact Manoj Taxi Service?",
    answer:
      `Call or WhatsApp ${business.phone.primaryDisplay} (alternate: ${business.phone.secondaryDisplay}), or email ${business.email}. Our central operations garage is located at No 34 Nesara Sandalwood, Uttari Village, Kaggalipura, Kanakapura Road, Bangalore - 560116, Karnataka.`,
  },
  {
    question: "Is Manoj Tours and Travels the same as Manoj Taxi Service?",
    answer:
      "Yes, Manoj Tours and Travels and Manoj Taxi Service are registered trade names of the same Bangalore-based cab operations company founded and managed by Manoj Kumar.",
  },
];

const faqsByPricingType = {
  "one-way": [generalFaqs[0], generalFaqs[6], generalFaqs[7]],
  "round-trip": [generalFaqs[4], generalFaqs[6], generalFaqs[7]],
  local: [generalFaqs[5], generalFaqs[2], generalFaqs[7]],
  airport: [generalFaqs[1], generalFaqs[2], generalFaqs[7]],
};

export function getServiceFaqs(service) {
  return faqsByPricingType[service.pricingType] || generalFaqs.slice(0, 3);
}
