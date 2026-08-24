import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/pricing";
import { generateBookingReference } from "@/lib/utils";
import { notifyBookingCreated } from "@/lib/emails/send-booking-emails";
import {
  adminBookingCreateSchema,
  publicBookingSchema,
} from "@/lib/booking-schema";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    const ip = getClientIp(request);
    const rl = await rateLimit(`booking:create:${ip}`, 10, 3600);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many booking attempts. Please try again later." },
        { status: 429, headers: rateLimitHeaders(rl, 10) }
      );
    }
  }

  try {
    const body = await request.json();
    const data = isAdmin
      ? adminBookingCreateSchema.parse(body)
      : publicBookingSchema.parse(body);

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

    const adminData = isAdmin ? adminBookingCreateSchema.parse(body) : null;

    const booking = await prisma.booking.create({
      data: {
        reference: generateBookingReference(),
        vehicleId: data.vehicleId,
        type: data.type,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        pickupDate: new Date(data.pickupDate),
        flightNumber: data.flightNumber ?? null,
        passengerCount: data.passengerCount,
        luggageCount: data.luggageCount ?? 0,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        specialRequests: data.specialRequests ?? null,
        quotedPrice: adminData?.quotedPrice ?? pricing.quotedPrice,
        distanceKm: adminData?.distanceKm ?? pricing.distanceKm,
        paymentMethod: data.paymentMethod,
        status: adminData?.status ?? "PENDING",
        paymentStatus: adminData?.paymentStatus ?? "PENDING",
        adminNotes: adminData?.adminNotes ?? null,
      },
      include: { vehicle: true },
    });

    if (!isAdmin || adminData?.sendNotification !== false) {
      notifyBookingCreated(booking.id);
    }

    return NextResponse.json(
      {
        booking,
        pricing,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const take = Math.min(Number(searchParams.get("limit") ?? 100), 500);
  const status = searchParams.get("status");
  const paymentStatus = searchParams.get("paymentStatus");

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(paymentStatus ? { paymentStatus: paymentStatus as never } : {}),
      },
      orderBy: { createdAt: "desc" },
      take,
      include: { vehicle: true },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
