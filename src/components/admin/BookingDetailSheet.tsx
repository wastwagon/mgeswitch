"use client";

import { useState } from "react";
import Link from "next/link";
import {
  X,
  Phone,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Plane,
  MapPin,
  Calendar,
  Users,
  Luggage,
  Pencil,
  StickyNote,
} from "lucide-react";
import { BookingActions } from "@/components/admin/BookingActions";
import { formatCurrency, formatDate, buildWhatsAppUrl } from "@/lib/utils";

export interface AdminBookingRow {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  flightNumber: string | null;
  passengerCount: number;
  luggageCount: number;
  quotedPrice: number;
  specialRequests: string | null;
  adminNotes: string | null;
  vehicleId: string;
  vehicleName: string;
}

interface BookingDetailSheetProps {
  booking: AdminBookingRow | null;
  onClose: () => void;
}

import { useScrollLock } from "@/lib/use-scroll-lock";

export function BookingDetailSheet({ booking, onClose }: BookingDetailSheetProps) {
  const [copied, setCopied] = useState(false);
  useScrollLock(Boolean(booking));

  if (!booking) return null;

  async function copyReference() {
    await navigator.clipboard.writeText(booking!.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappMsg = `Hi ${booking.customerName}, regarding your MGE-SWITCH request ${booking.reference}.`;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-3xl bg-white shadow-2xl safe-bottom">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="font-mono text-sm font-bold text-navy">{booking.reference}</p>
            <p className="text-xs text-muted">{booking.customerName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target flex items-center justify-center rounded-full bg-navy/5 text-navy"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <div className="flex flex-wrap gap-2">
            <StatusPill label={booking.status.replace("_", " ")} tone="status" />
            <StatusPill label={booking.paymentStatus} tone="payment" />
          </div>

          <p className="font-display mt-4 text-3xl font-bold text-gold">
            {formatCurrency(booking.quotedPrice)}
          </p>
          <p className="text-sm text-muted">{booking.vehicleName}</p>

          <dl className="mt-6 space-y-4">
            <DetailRow icon={Plane} label="Request Type">
              {booking.type === "PICKUP" ? "Port Supply Inbound" : "Port Supply Outbound"}
              {booking.flightNumber && ` · ${booking.flightNumber}`}
            </DetailRow>
            <DetailRow icon={Calendar} label="Pickup">
              {formatDate(booking.pickupDate)}
            </DetailRow>
            <DetailRow icon={MapPin} label="From">
              {booking.pickupLocation}
            </DetailRow>
            <DetailRow icon={MapPin} label="To">
              {booking.dropoffLocation}
            </DetailRow>
            <DetailRow icon={Users} label="Passengers">
              {booking.passengerCount} guest{booking.passengerCount !== 1 ? "s" : ""}
            </DetailRow>
            <DetailRow icon={Luggage} label="Luggage">
              {booking.luggageCount} piece{booking.luggageCount !== 1 ? "s" : ""}
            </DetailRow>
          </dl>

          {booking.specialRequests && (
            <div className="mt-4 rounded-xl bg-light-blue-bg/50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                Special requests
              </p>
              <p className="mt-2 text-sm text-navy">{booking.specialRequests}</p>
            </div>
          )}

          {booking.adminNotes && (
            <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gold">
                <StickyNote className="h-3 w-3" />
                Admin notes
              </p>
              <p className="mt-2 text-sm text-navy">{booking.adminNotes}</p>
            </div>
          )}

          <Link
            href={`/admin/bookings/${booking.id}/edit`}
            className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-navy bg-navy text-xs font-bold uppercase tracking-wider text-white active:scale-[0.98]"
          >
            <Pencil className="h-4 w-4" />
            Edit Request
          </Link>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={`tel:${booking.customerPhone}`}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy text-xs font-bold uppercase tracking-wider text-white active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={buildWhatsAppUrl(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${booking.customerEmail}`}
              className="col-span-2 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border text-xs font-bold uppercase tracking-wider text-navy active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" />
              Email Customer
            </a>
            <button
              type="button"
              onClick={copyReference}
              className="col-span-2 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/5 text-xs font-bold uppercase tracking-wider text-gold active:scale-[0.98]"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Reference"}
            </button>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Update status
          </p>
          <BookingActions
            bookingId={booking.id}
            status={booking.status}
            paymentStatus={booking.paymentStatus}
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-navy">{children}</dd>
      </div>
    </div>
  );
}

function StatusPill({ label, tone }: { label: string; tone: "status" | "payment" }) {
  return (
    <span
      className={
        tone === "payment"
          ? "rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold uppercase text-green-700"
          : "rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold uppercase text-blue-700"
      }
    >
      {label}
    </span>
  );
}
