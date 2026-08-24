import { prisma } from "@/lib/prisma";
import { Briefcase } from "lucide-react";
import { AdminCorporateEnquiriesPanel } from "@/components/admin/AdminCorporateEnquiriesPanel";
import type { AdminCorporateEnquiryRow } from "@/components/admin/CorporateEnquiryDetailSheet";

export default async function AdminCorporatePage() {
  const enquiries = await prisma.corporateEnquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const rows: AdminCorporateEnquiryRow[] = enquiries.map((e) => ({
    id: e.id,
    reference: e.reference,
    company: e.company,
    contactName: e.contactName,
    email: e.email,
    phone: e.phone,
    serviceType: e.serviceType,
    message: e.message,
    status: e.status,
    adminNotes: e.adminNotes,
    createdAt: e.createdAt.toISOString(),
  }));

  const newCount = rows.filter((e) => e.status === "NEW").length;
  const activeCount = rows.filter(
    (e) => e.status === "CONTACTED" || e.status === "IN_PROGRESS"
  ).length;
  const closedCount = rows.filter((e) => e.status === "CLOSED").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Corporate Inbox
        </h1>
        <p className="mt-1 text-sm text-muted">
          Enquiries from /corporate — account requests, hotel partnerships, and
          events
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <StatCard label="New" value={String(newCount)} accent="gold" />
        <StatCard label="Active" value={String(activeCount)} />
        <StatCard label="Closed" value={String(closedCount)} accent="navy" />
      </div>

      <div className="overflow-hidden border border-border bg-white shadow-sm">
        <div className="border-b border-border px-4 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-navy">Enquiries</h2>
          <p className="text-xs text-muted">{rows.length} records</p>
        </div>
        <div className="p-4 sm:p-6">
          {rows.length > 0 ? (
            <AdminCorporateEnquiriesPanel enquiries={rows} />
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

function StatCard({
  label,
  value,
  accent,
}: {
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
      <p
        className={`text-[10px] font-semibold uppercase tracking-widest ${
          accent ? "text-white/60" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="font-display mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
