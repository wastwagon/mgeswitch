import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const sectionSchema = z.object({
  heading: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  bullets: z.array(z.string()).optional(),
});

const blogSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.string().min(1),
  publishedAt: z.string().datetime(),
  readTime: z.string().default("5 min read"),
  imageUrl: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  imageMediaId: z.string().optional().nullable(),
  sections: z.array(sectionSchema).min(1),
  contentHtml: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true" && isAdmin;

  const posts = await prisma.blogPost.findMany({
    where: all ? undefined : { isPublished: true },
    orderBy: { publishedAt: "desc" },
    include: { imageMedia: true },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = blogSchema.parse(body);

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt: new Date(data.publishedAt),
        sections: data.sections,
      },
      include: { imageMedia: true },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
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
      return NextResponse.json({ error: "Post id required" }, { status: 400 });
    }
    const data = blogSchema.parse(rest);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt: new Date(data.publishedAt),
        sections: data.sections,
      },
      include: { imageMedia: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
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
    return NextResponse.json({ error: "Post id required" }, { status: 400 });
  }

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
