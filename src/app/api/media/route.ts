import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  buildStoredFilename,
  sanitizeFilename,
} from "@/lib/media";
import { storeMediaFile } from "@/lib/media-storage";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");
  const q = searchParams.get("q")?.trim();

  const media = await prisma.media.findMany({
    where: {
      ...(folder ? { folder } : {}),
      ...(q
        ? {
            OR: [
              { originalName: { contains: q, mode: "insensitive" } },
              { alt: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(media);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WebP, GIF, or SVG." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10 MB." },
        { status: 400 }
      );
    }

    const originalName = sanitizeFilename(file.name);
    const filename = buildStoredFilename(originalName);
    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await storeMediaFile(filename, buffer, file.type);

    const alt = (formData.get("alt") as string | null)?.trim() || null;
    const caption = (formData.get("caption") as string | null)?.trim() || null;
    const folder = (formData.get("folder") as string | null)?.trim() || "general";

    const media = await prisma.media.create({
      data: {
        filename,
        originalName,
        mimeType: file.type,
        size: file.size,
        url,
        alt,
        caption,
        folder,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
