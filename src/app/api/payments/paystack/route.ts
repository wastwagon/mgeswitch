import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import {
  initializeTransaction,
  isPaystackConfigured,
  verifyTransaction,
} from "@/lib/paystack";
import { generateBookingReference } from "@/lib/utils";
import { calculatePrice } from "@/lib/pricing";
import { notifyBookingCreated, notifyPaymentConfirmed } from "@/lib/emails/send-booking-emails";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

const initSchema = z.object({
  type: z.enum(["PICKUP", "DROPOFF"]),
  vehicleId: z.string().min(1),
  pickupLocation: z.string().min(3),
  dropoffLocation: z.string().min(3),
  pickupDate: z.string().datetime(),
  flightNumber: z.string().optional(),
  passengerCount: z.number().int().min(1).max(14),
  luggageCount: z.number().int().min(0).max(20).default(0),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  specialRequests: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`paystack:init:${ip}`, 15, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many payment attempts. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl, 15) }
    );
  }

  if (!isPaystackConfigured()) {
    return NextResponse.json(
      {
        error:
          "Paystack is not configured. Add PAYSTACK_SECRET_KEY and NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to .env",
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const data = initSchema.parse(body);

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

    const bookingRef = generateBookingReference();
    const paystackRef = `ALG-PAY-${Date.now()}`;

    const booking = await prisma.booking.create({
      data: {
        reference: bookingRef,
        vehicleId: data.vehicleId,
        type: data.type,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        pickupDate: new Date(data.pickupDate),
        flightNumber: data.flightNumber,
        passengerCount: data.passengerCount,
        luggageCount: data.luggageCount,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        specialRequests: data.specialRequests,
        quotedPrice: pricing.quotedPrice,
        distanceKm: pricing.distanceKm,
        paymentMethod: "CARD",
        paymentStatus: "PENDING",
        paystackReference: paystackRef,
      },
      include: { vehicle: true },
    });

    notifyBookingCreated(booking.id, { adminOnly: true });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3080";
    const paystack = await initializeTransaction({
      email: data.customerEmail,
      amountGhs: pricing.quotedPrice,
      reference: paystackRef,
      callbackUrl: `${appUrl}/payment/callback?booking=${booking.id}`,
      metadata: {
        booking_id: booking.id,
        booking_reference: bookingRef,
        customer_name: data.customerName,
      },
    });

    return NextResponse.json({
      bookingId: booking.id,
      bookingReference: bookingRef,
      paystackReference: paystackRef,
      accessCode: paystack.access_code,
      authorizationUrl: paystack.authorization_url,
      amount: pricing.quotedPrice,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Paystack init error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Payment initialization failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  if (!isPaystackConfigured()) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 503 });
  }

  try {
    const result = await verifyTransaction(reference);
    const paid = result.status === "success";

    if (paid) {
      await prisma.booking.updateMany({
        where: { paystackReference: reference },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED",
        },
      });

      const updated = await prisma.booking.findFirst({
        where: { paystackReference: reference },
      });
      if (updated) notifyPaymentConfirmed(updated.id);
    }

    const booking = await prisma.booking.findFirst({
      where: { paystackReference: reference },
      include: { vehicle: true },
    });

    return NextResponse.json({
      paid,
      booking,
      paystack: { status: result.status, reference: result.reference },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const signature = request.headers.get("x-paystack-signature");
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.event === "charge.success") {
    const reference = event.data.reference as string;
    await prisma.booking.updateMany({
      where: { paystackReference: reference },
      data: { paymentStatus: "PAID", status: "CONFIRMED" },
    });

    const booking = await prisma.booking.findFirst({
      where: { paystackReference: reference },
    });
    if (booking) notifyPaymentConfirmed(booking.id);
  }

  return NextResponse.json({ received: true });
}
