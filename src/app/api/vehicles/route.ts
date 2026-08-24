import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cacheDel, cacheGet, cacheSet } from "@/lib/redis";

const vehicleSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens"),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  capacity: z.number().int().min(1).max(20),
  basePrice: z.number().positive(),
  pricePerKm: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

const vehicleUpdateSchema = vehicleSchema.partial();

export async function GET(request: NextRequest) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true" && isAdmin;

  if (all) {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(vehicles);
  }

  try {
    const cached = await cacheGet("vehicles:active");
    if (cached) {
      return NextResponse.json(cached);
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (vehicles.length > 0) {
      await cacheSet("vehicles:active", vehicles, 300);
    }

    return NextResponse.json(vehicles);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = vehicleSchema.parse(await request.json());
    const vehicle = await prisma.vehicle.create({ data });
    await cacheDel("vehicles:active");
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) {
      return NextResponse.json({ error: "Vehicle id required" }, { status: 400 });
    }
    const data = vehicleUpdateSchema.parse(rest);

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });
    await cacheDel("vehicles:active");
    return NextResponse.json(vehicle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Vehicle id required" }, { status: 400 });
  }

  const bookingCount = await prisma.booking.count({ where: { vehicleId: id } });
  if (bookingCount > 0) {
    await prisma.vehicle.update({
      where: { id },
      data: { isActive: false },
    });
    await cacheDel("vehicles:active");
    return NextResponse.json({ deactivated: true });
  }

  await prisma.vehicle.delete({ where: { id } });
  await cacheDel("vehicles:active");
  return NextResponse.json({ success: true });
}
