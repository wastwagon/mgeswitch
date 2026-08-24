import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminBookingForm } from "@/components/admin/AdminBookingForm";

export default async function NewBookingPage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  if (vehicles.length === 0) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="font-medium text-navy">No active vehicles</p>
        <p className="mt-2 text-sm text-muted">
          Run the database seed before creating bookings.
        </p>
        <Link href="/admin" className="mt-6 inline-block text-sm text-gold hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBookingForm
        mode="create"
        vehicles={vehicles.map((v) => ({
          id: v.id,
          name: v.name,
          basePrice: Number(v.basePrice),
        }))}
      />
    </div>
  );
}
