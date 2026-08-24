import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getClientIp,
  rateLimit,
  rateLimitHeaders,
} from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await rateLimit(`booking:lookup:${ip}`, 20, 3600);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many lookup attempts. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl, 20) }
    );
  }

  const reference = request.nextUrl.searchParams.get("reference");
  const email = request.nextUrl.searchParams.get("email");

  if (!reference || !email) {
    return NextResponse.json(
      { error: "Reference and email are required" },
      { status: 400 }
    );
  }

  const booking = await prisma.booking.findFirst({
    where: {
      reference: { equals: reference, mode: "insensitive" },
      customerEmail: { equals: email, mode: "insensitive" },
    },
    include: { vehicle: true },
  });

  if (!booking) {
    return NextResponse.json(
      { error: "No booking found with that reference and email" },
      { status: 404 }
    );
  }

  return NextResponse.json(booking);
}
