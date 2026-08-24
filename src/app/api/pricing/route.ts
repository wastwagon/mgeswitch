import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/pricing";
import { cacheGet, cacheSet } from "@/lib/redis";

const pricingSchema = z.object({
  vehicleId: z.string().min(1),
  pickupLocation: z.string().min(3),
  dropoffLocation: z.string().min(3),
  passengerCount: z.number().int().min(1).max(14),
  type: z.enum(["PICKUP", "DROPOFF"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = pricingSchema.parse(body);

    const cacheKey = `pricing:${JSON.stringify(data)}`;
    const cached = await cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    const vehicle = await prisma.vehicle.findUnique({
      where: { id: data.vehicleId, isActive: true },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    const pricing = calculatePrice({
      vehicleBasePrice: Number(vehicle.basePrice),
      vehiclePricePerKm: Number(vehicle.pricePerKm),
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
      passengerCount: data.passengerCount,
      type: data.type,
    });

    await cacheSet(cacheKey, pricing, 60);
    return NextResponse.json(pricing);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to calculate price" },
      { status: 500 }
    );
  }
}
