import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { removeMediaFile } from "@/lib/media-storage";

const updateSchema = z.object({
  alt: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  folder: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = updateSchema.parse(await request.json());

  const media = await prisma.media.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(media);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await removeMediaFile(media.filename, media.url);
  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
