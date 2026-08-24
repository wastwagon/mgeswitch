"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Pencil } from "lucide-react";
import {
  BookingDetailSheet,
  type AdminBookingRow,
} from "@/components/admin/BookingDetailSheet";
import { BookingActions } from "@/components/admin/BookingActions";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUS_FILTERS = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

interface AdminBookingsPanelProps {
  bookings: AdminBookingRow[];
}

export function AdminBookingsPanel({ bookings }: AdminBookingsPanelProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<AdminBookingRow | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
      if (!q) return true;
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerEmail.toLowerCase().includes(q) ||
        b.customerPhone.includes(q)
      );
    });
  }, [bookings, query, statusFilter]);

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference, name, email, phone…"
            className="w-full border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-navy"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition active:scale-95 ${
                statusFilter === status
                  ? "bg-navy text-white"
                  : "border border-border bg-white text-muted"
              }`}
            >
              {status === "ALL" ? "All" : status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-x-auto lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f8fafc] text-left text-[10px] font-semibold uppercase tracking-widest text-muted">
              <th className="px-6 py-4">Reference</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Request</th>
              <th className="px-4 py-4">Pickup</th>
              <th className="px-4 py-4">Fare</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Payment</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((booking) => (
              <tr
                key={booking.id}
                className="transition hover:bg-light-blue-bg/30"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-xs font-semibold text-navy">
                    {booking.reference}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-navy">{booking.customerName}</p>
                  <p className="text-xs text-muted">{booking.customerPhone}</p>
                </td>
                <td className="px-4 py-4 text-xs text-navy">
                  {booking.type === "PICKUP" ? "Inbound" : "Outbound"}
                  <p className="mt-1 max-w-[180px] truncate text-muted">
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </p>
                </td>
                <td className="px-4 py-4 text-xs text-navy">
                  {formatDate(booking.pickupDate)}
                </td>
                <td className="px-4 py-4">
                  <span className="font-display text-base font-bold text-gold">
                    {formatCurrency(booking.quotedPrice)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-4">
                  <PaymentBadge
                    status={booking.paymentStatus}
                    method={booking.paymentMethod}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <BookingActions
                      bookingId={booking.id}
                      status={booking.status}
                      paymentStatus={booking.paymentStatus}
                    />
                    <Link
                      href={`/admin/bookings/${booking.id}/edit`}
                      className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy transition hover:border-gold hover:text-gold"
                      aria-label="Edit booking"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-6 divide-y divide-border border border-border bg-white lg:hidden">
        {filtered.map((booking) => (
          <button
            key={booking.id}
            type="button"
            onClick={() => setSelected(booking)}
            className="flex w-full items-start gap-3 p-5 text-left active:bg-light-blue-bg/30"
          >
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs font-semibold text-navy">
                {booking.reference}
              </p>
              <p className="mt-1 font-medium text-navy">{booking.customerName}</p>
              <p className="mt-2 text-xs text-muted">
                {booking.type === "PICKUP" ? "Inbound" : "Outbound"} ·{" "}
                {formatDate(booking.pickupDate)}
              </p>
              <p className="font-display mt-2 text-lg font-bold text-gold">
                {formatCurrency(booking.quotedPrice)}
              </p>
              <div className="mt-2 flex gap-2">
                <StatusBadge status={booking.status} />
                <PaymentBadge
                  status={booking.paymentStatus}
                  method={booking.paymentMethod}
                />
              </div>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-muted">No bookings match your search.</p>
        )}
      </div>

      <BookingDetailSheet booking={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-800 border-amber-200",
    CONFIRMED: "bg-blue-50 text-blue-800 border-blue-200",
    IN_PROGRESS: "bg-purple-50 text-purple-800 border-purple-200",
    COMPLETED: "bg-green-50 text-green-800 border-green-200",
    CANCELLED: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-block border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
        styles[status] ?? "bg-gray-50 text-gray-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function PaymentBadge({
  status,
  method,
}: {
  status: string;
  method: string;
}) {
  return (
    <span className="inline-block text-[10px] font-semibold uppercase text-muted">
      {status} · {method.replace("_", " ").toLowerCase()}
    </span>
  );
}
