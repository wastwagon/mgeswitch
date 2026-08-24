import { NextResponse } from "next/server";
import { getBrandConfig } from "@/lib/brand";

export async function GET() {
  const brand = await getBrandConfig();

  return NextResponse.json(
    {
      name: brand.name,
      tagline: brand.tagline,
      phone: brand.phone,
      whatsapp: brand.whatsapp,
      email: brand.email,
      address: brand.address,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
