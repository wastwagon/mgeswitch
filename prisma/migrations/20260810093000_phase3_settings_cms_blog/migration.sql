-- AlterTable
ALTER TABLE "CmsPage" ADD COLUMN "featuredImageUrl" TEXT,
ADD COLUMN "featuredImageAlt" TEXT;

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "contentHtml" TEXT;
