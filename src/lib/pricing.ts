export interface PricingInput {
  vehicleBasePrice: number;
  vehiclePricePerKm: number;
  pickupLocation: string;
  dropoffLocation: string;
  passengerCount: number;
  type: "PICKUP" | "DROPOFF";
}

export interface PricingResult {
  quotedPrice: number;
  distanceKm: number;
  breakdown: {
    baseFare: number;
    distanceCharge: number;
    passengerSurcharge: number;
    portAccessFee: number;
  };
}

const PORT_KEYWORDS = ["port", "tema", "takoradi", "lome", "cotonou", "apapa", "monrovia"];
const BASE_DISTANCE_KM = 15;

function estimateDistanceKm(pickup: string, dropoff: string): number {
  const pickupLower = pickup.toLowerCase();
  const dropoffLower = dropoff.toLowerCase();

  const involvesPort =
    PORT_KEYWORDS.some((k) => pickupLower.includes(k)) ||
    PORT_KEYWORDS.some((k) => dropoffLower.includes(k));

  if (!involvesPort) {
    return BASE_DISTANCE_KM;
  }

  const destinations: Record<string, number> = {
    tema: 12,
    takoradi: 18,
    lome: 22,
    cotonou: 24,
    apapa: 28,
    monrovia: 30,
  };

  const nonPort = [pickupLower, dropoffLower].find(
    (loc) => !PORT_KEYWORDS.some((k) => loc.includes(k))
  );

  if (nonPort) {
    for (const [area, km] of Object.entries(destinations)) {
      if (nonPort.includes(area)) return km;
    }
  }

  return BASE_DISTANCE_KM;
}

export function calculatePrice(input: PricingInput): PricingResult {
  const distanceKm = estimateDistanceKm(
    input.pickupLocation,
    input.dropoffLocation
  );

  const baseFare = input.vehicleBasePrice;
  const distanceCharge = distanceKm * input.vehiclePricePerKm;
  const passengerSurcharge =
    input.passengerCount > 4 ? (input.passengerCount - 4) * 25 : 0;
  const portAccessFee = 30;

  const quotedPrice =
    baseFare + distanceCharge + passengerSurcharge + portAccessFee;

  return {
    quotedPrice: Math.round(quotedPrice),
    distanceKm,
    breakdown: {
      baseFare,
      distanceCharge,
      passengerSurcharge,
      portAccessFee,
    },
  };
}
