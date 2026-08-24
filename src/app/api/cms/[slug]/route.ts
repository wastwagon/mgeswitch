import { NextResponse } from "next/server";
import { getPublishedCmsPage } from "@/lib/cms";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPublishedCmsPage(slug);

  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}
