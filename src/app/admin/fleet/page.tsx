import { prisma } from "@/lib/prisma";
import { FleetEditor, FleetVehicleCard } from "@/components/admin/FleetEditor";

export default async function AdminFleetPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const rows = vehicles.map((v) => ({
    id: v.id,
    name: v.name,
    description: v.description,
    imageUrl: v.imageUrl,
    capacity: v.capacity,
    basePrice: Number(v.basePrice),
    pricePerKm: Number(v.pricePerKm),
    isActive: v.isActive,
    sortOrder: v.sortOrder,
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Fleet & Pricing
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage vehicles, images, base fares, and per-km rates shown on /book and /fleet
          </p>
        </div>
        <FleetEditor mode="create" />
      </div>

      <div className="space-y-4">
        {rows.length === 0 ? (
          <p className="border border-border bg-white p-12 text-center text-sm text-muted">
            No vehicles configured. Add your first vehicle or run the database seed.
          </p>
        ) : (
          rows.map((vehicle) => (
            <FleetVehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        )}
      </div>
    </div>
  );
}
