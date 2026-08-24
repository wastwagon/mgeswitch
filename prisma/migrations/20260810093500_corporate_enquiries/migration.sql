-- CreateEnum
CREATE TYPE "CorporateEnquiryStatus" AS ENUM ('NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED', 'SPAM');

-- CreateTable
CREATE TABLE "CorporateEnquiry" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "CorporateEnquiryStatus" NOT NULL DEFAULT 'NEW',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorporateEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CorporateEnquiry_reference_key" ON "CorporateEnquiry"("reference");

-- CreateIndex
CREATE INDEX "CorporateEnquiry_status_idx" ON "CorporateEnquiry"("status");

-- CreateIndex
CREATE INDEX "CorporateEnquiry_createdAt_idx" ON "CorporateEnquiry"("createdAt");
