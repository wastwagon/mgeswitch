import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminBookingForm } from "@/components/admin/AdminBookingForm";

export default async function EditBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [booking, vehicles] = await Promise.all([
    prisma.booking.findUnique({
      where: { id },
      include: { vehicle: true },
    }),
    prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!booking) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBookingForm
        mode="edit"
        vehicles={vehicles.map((v) => ({
          id: v.id,
          name: v.name,
          basePrice: Number(v.basePrice),
        }))}
        initial={{
          id: booking.id,
          reference: booking.reference,
          type: booking.type,
          vehicleId: booking.vehicleId,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation,
          pickupDate: booking.pickupDate.toISOString(),
          flightNumber: booking.flightNumber ?? "",
          passengerCount: booking.passengerCount,
          luggageCount: booking.luggageCount,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          customerPhone: booking.customerPhone,
          specialRequests: booking.specialRequests ?? "",
          paymentMethod: booking.paymentMethod,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          quotedPrice: Number(booking.quotedPrice),
          adminNotes: booking.adminNotes ?? "",
        }}
      />
    </div>
  );
}
