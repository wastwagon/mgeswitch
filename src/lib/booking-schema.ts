import { z } from "zod";

export const bookingFieldsSchema = z.object({
  type: z.enum(["PICKUP", "DROPOFF"]),
  vehicleId: z.string().min(1),
  pickupLocation: z.string().min(3),
  dropoffLocation: z.string().min(3),
  pickupDate: z.string().datetime(),
  flightNumber: z.string().optional().nullable(),
  passengerCount: z.number().int().min(1).max(14),
  luggageCount: z.number().int().min(0).max(20).optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  specialRequests: z.string().optional().nullable(),
  paymentMethod: z
    .enum(["CASH", "MOBILE_MONEY", "CARD", "WHATSAPP"])
    .default("WHATSAPP"),
});

export const publicBookingSchema = bookingFieldsSchema;

export const adminBookingCreateSchema = bookingFieldsSchema.extend({
  quotedPrice: z.number().positive().optional(),
  distanceKm: z.number().min(0).optional(),
  status: z
    .enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("CONFIRMED"),
  paymentStatus: z
    .enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
    .default("PENDING"),
  adminNotes: z.string().optional().nullable(),
  sendNotification: z.boolean().default(true),
});

export const adminBookingUpdateSchema = bookingFieldsSchema
  .partial()
  .extend({
    quotedPrice: z.number().positive().optional(),
    distanceKm: z.number().min(0).optional().nullable(),
    status: z
      .enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
      .optional(),
    paymentStatus: z
      .enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
      .optional(),
    paymentMethod: z
      .enum(["CASH", "MOBILE_MONEY", "CARD", "WHATSAPP"])
      .optional(),
    adminNotes: z.string().optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type BookingFields = z.infer<typeof bookingFieldsSchema>;
export type AdminBookingCreate = z.infer<typeof adminBookingCreateSchema>;
export type AdminBookingUpdate = z.infer<typeof adminBookingUpdateSchema>;
