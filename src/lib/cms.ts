import { prisma } from "@/lib/prisma";

export async function getPublishedCmsPage(slug: string) {
  return prisma.cmsPage.findFirst({
    where: { slug, isPublished: true },
  });
}

export async function getPublishedCmsSlugs() {
  const pages = await prisma.cmsPage.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return pages.map((p) => p.slug);
}
