import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminPaymentsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { vehicle: true },
  });

  const paid = bookings.filter((b) => b.paymentStatus === "PAID");
  const pending = bookings.filter((b) => b.paymentStatus === "PENDING");
  const refunded = bookings.filter((b) => b.paymentStatus === "REFUNDED");
  const totalCollected = paid.reduce((s, b) => s + Number(b.quotedPrice), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Payments
        </h1>
        <p className="mt-1 text-sm text-muted">
          Track transactions, payment status, and Paystack references
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Collected" value={formatCurrency(totalCollected)} accent />
        <Stat label="Paid" value={String(paid.length)} />
        <Stat label="Pending" value={String(pending.length)} />
        <Stat label="Refunded" value={String(refunded.length)} />
      </div>

      <div className="overflow-x-auto border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f8fafc] text-left text-[10px] font-semibold uppercase tracking-widest text-muted">
              <th className="px-6 py-4">Reference</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Amount</th>
              <th className="px-4 py-4">Method</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Paystack Ref</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-light-blue-bg/20">
                <td className="px-6 py-4 font-mono text-xs font-semibold text-navy">
                  {b.reference}
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-navy">{b.customerName}</p>
                  <p className="text-xs text-muted">{b.customerEmail}</p>
                </td>
                <td className="px-4 py-4 font-display font-bold text-gold">
                  {formatCurrency(Number(b.quotedPrice))}
                </td>
                <td className="px-4 py-4 text-xs uppercase text-muted">
                  {b.paymentMethod.replace("_", " ")}
                </td>
                <td className="px-4 py-4">
                  <PaymentBadge status={b.paymentStatus} />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-muted">
                  {b.paystackReference ?? "—"}
                </td>
                <td className="px-4 py-4 text-xs text-muted">
                  {formatDate(b.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/bookings/${b.id}/edit`}
                    className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="p-12 text-center text-sm text-muted">No payment records yet.</p>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border p-4 sm:p-6 ${
        accent ? "gradient-navy border-navy text-white" : "border-border bg-white"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-widest ${
          accent ? "text-white/60" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="font-display mt-2 text-xl font-bold sm:text-2xl">{value}</p>
    </div>
  );
}

function PaymentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PAID: "bg-green-50 text-green-700 border-green-200",
    PENDING: "bg-amber-50 text-amber-800 border-amber-200",
    FAILED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-orange-50 text-orange-700 border-orange-200",
  };
  return (
    <span
      className={`inline-block border px-2 py-1 text-[10px] font-semibold uppercase ${
        styles[status] ?? "bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
