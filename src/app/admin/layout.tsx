import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBrandConfig } from "@/lib/brand";
import { prisma } from "@/lib/prisma";
import { BrandProvider } from "@/components/BrandProvider";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  const [brand, newCorporateCount] = await Promise.all([
    getBrandConfig(),
    prisma.corporateEnquiry.count({ where: { status: "NEW" } }),
  ]);

  return (
    <BrandProvider brand={brand}>
      <AdminShell
        userEmail={session.user.email ?? ""}
        newCorporateCount={newCorporateCount}
      >
        {children}
      </AdminShell>
    </BrandProvider>
  );
}
