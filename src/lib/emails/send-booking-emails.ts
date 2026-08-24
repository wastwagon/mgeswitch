import { sendEmail, getAdminEmail } from "@/lib/email";
import {
  adminNewBookingHtml,
  customerBookingConfirmationHtml,
  customerBookingConfirmationText,
  type BookingEmailData,
} from "@/lib/emails/booking-templates";
import { prisma } from "@/lib/prisma";

type BookingWithVehicle = {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date;
  flightNumber: string | null;
  passengerCount: number;
  luggageCount: number;
  quotedPrice: { toString(): string } | number;
  paymentMethod: string;
  paymentStatus: string;
  specialRequests: string | null;
  vehicle: { name: string };
};

function toEmailData(booking: BookingWithVehicle): BookingEmailData {
  return {
    reference: booking.reference,
    customerName: booking.customerName,
    customerEmail: booking.customerEmail,
    customerPhone: booking.customerPhone,
    type: booking.type,
    pickupLocation: booking.pickupLocation,
    dropoffLocation: booking.dropoffLocation,
    pickupDate: booking.pickupDate,
    flightNumber: booking.flightNumber,
    passengerCount: booking.passengerCount,
    luggageCount: booking.luggageCount,
    quotedPrice: Number(booking.quotedPrice),
    paymentMethod: booking.paymentMethod,
    paymentStatus: booking.paymentStatus,
    vehicleName: booking.vehicle.name,
    specialRequests: booking.specialRequests,
  };
}

/** Fire-and-forget — never blocks the API response */
export function notifyBookingCreated(bookingId: string, options?: { adminOnly?: boolean; paid?: boolean }) {
  void sendBookingEmails(bookingId, options);
}

async function sendBookingEmails(
  bookingId: string,
  options?: { adminOnly?: boolean; paid?: boolean }
) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { vehicle: true },
  });

  if (!booking) return;

  const data = toEmailData(booking);
  const isPaid = options?.paid ?? booking.paymentStatus === "PAID";

  const emails = [
    sendEmail({
      to: getAdminEmail(),
      subject: `New Booking: ${data.reference} — ${data.customerName}`,
      html: adminNewBookingHtml(data),
    }),
  ];

  if (!options?.adminOnly) {
    emails.unshift(
      sendEmail({
        to: data.customerEmail,
        subject: isPaid
          ? `Confirmed — ${data.reference} | Ulfborg Rebooth`
          : `Booking Received — ${data.reference} | Ulfborg Rebooth`,
        html: customerBookingConfirmationHtml(data, isPaid),
        text: customerBookingConfirmationText(data, isPaid),
      })
    );
  }

  await Promise.all(emails);
}

export async function notifyPaymentConfirmed(bookingId: string) {
  await sendBookingEmails(bookingId, { paid: true });
}
