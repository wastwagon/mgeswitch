import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { serviceTypeLabel } from "@/lib/corporate-enquiry";
import {
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  Plus,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { AdminBookingsPanel } from "@/components/admin/AdminBookingsPanel";
import type { AdminBookingRow } from "@/components/admin/BookingDetailSheet";

export default async function AdminPage() {
  const [bookings, stats, newCorporateCount, recentCorporate] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { vehicle: true },
    }),
    prisma.booking.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.corporateEnquiry.count({ where: { status: "NEW" } }),
    prisma.corporateEnquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const rows: AdminBookingRow[] = bookings.map((b) => ({
    id: b.id,
    reference: b.reference,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    type: b.type,
    status: b.status,
    paymentStatus: b.paymentStatus,
    paymentMethod: b.paymentMethod,
    pickupLocation: b.pickupLocation,
    dropoffLocation: b.dropoffLocation,
    pickupDate: b.pickupDate.toISOString(),
    flightNumber: b.flightNumber,
    passengerCount: b.passengerCount,
    luggageCount: b.luggageCount,
    quotedPrice: Number(b.quotedPrice),
    specialRequests: b.specialRequests,
    adminNotes: b.adminNotes,
    vehicleId: b.vehicleId,
    vehicleName: b.vehicle.name,
  }));

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((sum, b) => sum + Number(b.quotedPrice), 0);

  const pendingCount = stats.find((s) => s.status === "PENDING")?._count ?? 0;
  const confirmedCount = stats.find((s) => s.status === "CONFIRMED")?._count ?? 0;

  const thisMonth = bookings.filter((b) => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Requests Overview
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage ship agency enquiries, payments, and fulfilment status
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 bg-navy px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark"
        >
          <Plus className="h-4 w-4" />
          New Request
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Total Requests"
          value={bookings.length.toString()}
        />
        <StatCard
          icon={Clock}
          label="Awaiting Action"
          value={pendingCount.toString()}
          accent="gold"
        />
        <StatCard
          icon={TrendingUp}
          label="This Month"
          value={thisMonth.toString()}
        />
        <StatCard
          icon={DollarSign}
          label="Revenue Collected"
          value={formatCurrency(totalRevenue)}
          accent="navy"
        />
      </div>

      <div className="flex flex-wrap gap-4 border border-border bg-white px-4 py-4 sm:px-5">
        <SummaryPill label="Pending" count={pendingCount} color="yellow" />
        <SummaryPill label="Confirmed" count={confirmedCount} color="blue" />
        <SummaryPill
          label="Paid"
          count={bookings.filter((b) => b.paymentStatus === "PAID").length}
          color="green"
        />
      </div>

      <div className="overflow-hidden border border-border bg-white shadow-sm">
        <div className="border-b border-border px-4 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-navy">
            Recent Reservations
          </h2>
          <p className="text-xs text-muted">{rows.length} records</p>
        </div>
        <div className="p-4 sm:p-6">
          {rows.length > 0 ? (
            <AdminBookingsPanel bookings={rows} />
          ) : (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-light-blue" />
              <p className="mt-4 font-medium text-navy">No requests yet</p>
              <p className="mt-1 text-sm text-muted">
                Share your website to start receiving marine enquiries
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden border border-border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-display text-lg font-bold text-navy">
              Corporate Enquiries
            </h2>
            <p className="text-xs text-muted">
              {newCorporateCount > 0
                ? `${newCorporateCount} new ${newCorporateCount === 1 ? "enquiry" : "enquiries"} awaiting review`
                : "Account requests from /corporate"}
            </p>
          </div>
          <Link
            href="/admin/corporate"
            className="inline-flex min-h-[44px] items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gold transition hover:text-gold-light"
          >
            Open inbox
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentCorporate.length > 0 ? (
            recentCorporate.map((enquiry) => (
              <Link
                key={enquiry.id}
                href="/admin/corporate"
                className="flex items-start gap-4 px-4 py-4 transition hover:bg-light-blue-bg/30 sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy/5">
                  <Briefcase className="h-5 w-5 text-gold" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs font-semibold text-navy">
                      {enquiry.reference}
                    </p>
                    <CorporateStatusBadge status={enquiry.status} />
                  </div>
                  <p className="mt-1 font-medium text-navy">{enquiry.company}</p>
                  <p className="mt-1 text-xs text-muted">
                    {enquiry.contactName} · {serviceTypeLabel(enquiry.serviceType)}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted">
                  {formatDate(enquiry.createdAt.toISOString())}
                </p>
              </Link>
            ))
          ) : (
            <div className="py-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-light-blue" />
              <p className="mt-4 font-medium text-navy">No corporate enquiries yet</p>
              <p className="mt-1 text-sm text-muted">
                Submissions from the corporate page will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CorporateStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: "bg-amber-50 text-amber-800 border-amber-200",
    CONTACTED: "bg-blue-50 text-blue-800 border-blue-200",
    IN_PROGRESS: "bg-purple-50 text-purple-800 border-purple-200",
    CLOSED: "bg-green-50 text-green-800 border-green-200",
    SPAM: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-semibold uppercase ${
        styles[status] ?? "bg-gray-50 text-gray-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "gold" | "navy";
}) {
  const styles = {
    default: "bg-white border border-border",
    gold: "bg-gold text-white border border-gold",
    navy: "gradient-navy text-white border border-navy",
  };
  const key = accent ?? "default";

  return (
    <div className={`p-4 sm:p-6 ${styles[key]}`}>
      <Icon
        className={`mb-2 h-5 w-5 sm:mb-3 ${
          accent === "navy" ? "text-gold" : accent === "gold" ? "text-white/70" : "text-gold"
        }`}
      />
      <p
        className={`text-[9px] font-semibold uppercase tracking-widest sm:text-[10px] ${
          accent === "navy" || accent === "gold" ? "text-white/60" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="font-display mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">{value}</p>
    </div>
  );
}

function SummaryPill({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: "yellow" | "blue" | "green";
}) {
  const dot = { yellow: "bg-yellow-400", blue: "bg-blue-400", green: "bg-green-500" };
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`h-2 w-2 rounded-full ${dot[color]}`} />
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-navy">{count}</span>
    </div>
  );
}
