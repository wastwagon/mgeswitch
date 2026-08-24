import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { adminBookingUpdateSchema } from "@/lib/booking-schema";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isAdmin = session?.user?.role === "ADMIN";
  const isOwner = session?.user?.id && booking.userId === session.user.id;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(booking);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const data = adminBookingUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = { ...data };

    if (data.pickupDate) {
      updateData.pickupDate = new Date(data.pickupDate);
    }

    if (data.flightNumber === null) updateData.flightNumber = null;
    if (data.specialRequests === null) updateData.specialRequests = null;
    if (data.adminNotes === null) updateData.adminNotes = null;

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: { vehicle: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Booking update error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
