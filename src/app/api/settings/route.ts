import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getSiteSettings,
  upsertSiteSettings,
  SETTING_KEYS,
  type SiteSettings,
} from "@/lib/settings";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<SiteSettings>;
    const filtered = Object.fromEntries(
      Object.entries(body).filter(([key]) =>
        SETTING_KEYS.includes(key as (typeof SETTING_KEYS)[number])
      )
    ) as Partial<SiteSettings>;

    const settings = await upsertSiteSettings(filtered);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
