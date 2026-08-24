"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import {
  CorporateEnquiryDetailSheet,
  type AdminCorporateEnquiryRow,
} from "@/components/admin/CorporateEnquiryDetailSheet";
import { CorporateEnquiryActions } from "@/components/admin/CorporateEnquiryActions";
import { formatDate } from "@/lib/utils";
import { serviceTypeLabel } from "@/lib/corporate-enquiry";

const STATUS_FILTERS = [
  "ALL",
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "CLOSED",
  "SPAM",
] as const;

interface AdminCorporateEnquiriesPanelProps {
  enquiries: AdminCorporateEnquiryRow[];
}

export function AdminCorporateEnquiriesPanel({
  enquiries,
}: AdminCorporateEnquiriesPanelProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<AdminCorporateEnquiryRow | null>(null);

  useEffect(() => {
    if (!selected) return;
    const fresh = enquiries.find((e) => e.id === selected.id);
    if (fresh) setSelected(fresh);
  }, [enquiries, selected?.id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (statusFilter !== "ALL" && e.status !== statusFilter) return false;
      if (!q) return true;
      return (
        e.reference.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.contactName.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q)
      );
    });
  }, [enquiries, query, statusFilter]);

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference, company, contact, email…"
            className="w-full border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-navy"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition ${
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

      <div className="mt-6 hidden overflow-x-auto lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-[#f8fafc] text-left text-[10px] font-semibold uppercase tracking-widest text-muted">
              <th className="px-6 py-4">Reference</th>
              <th className="px-4 py-4">Company</th>
              <th className="px-4 py-4">Contact</th>
              <th className="px-4 py-4">Service</th>
              <th className="px-4 py-4">Received</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-muted"
                >
                  No enquiries match your search.
                </td>
              </tr>
            ) : (
              filtered.map((enquiry) => (
              <tr
                key={enquiry.id}
                className="cursor-pointer transition hover:bg-light-blue-bg/30"
                onClick={() => setSelected(enquiry)}
              >
                <td className="px-6 py-4 font-mono text-xs font-semibold text-navy">
                  {enquiry.reference}
                </td>
                <td className="px-4 py-4 font-medium text-navy">{enquiry.company}</td>
                <td className="px-4 py-4">
                  <p className="font-medium text-navy">{enquiry.contactName}</p>
                  <p className="text-xs text-muted">{enquiry.email}</p>
                </td>
                <td className="px-4 py-4 text-xs text-navy">
                  {serviceTypeLabel(enquiry.serviceType)}
                </td>
                <td className="px-4 py-4 text-xs text-muted">
                  {formatDate(enquiry.createdAt)}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={enquiry.status} />
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <CorporateEnquiryActions
                    enquiryId={enquiry.id}
                    status={enquiry.status}
                  />
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 divide-y divide-border border border-border bg-white lg:hidden">
        {filtered.map((enquiry) => (
          <button
            key={enquiry.id}
            type="button"
            onClick={() => setSelected(enquiry)}
            className="flex w-full items-start gap-3 p-5 text-left active:bg-light-blue-bg/30"
          >
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs font-semibold text-navy">
                {enquiry.reference}
              </p>
              <p className="mt-1 font-medium text-navy">{enquiry.company}</p>
              <p className="mt-1 text-xs text-muted">{enquiry.contactName}</p>
              <p className="mt-2 text-xs text-gold">
                {serviceTypeLabel(enquiry.serviceType)}
              </p>
              <div className="mt-2">
                <StatusBadge status={enquiry.status} />
              </div>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-muted">
            No enquiries match your search.
          </p>
        )}
      </div>

      <CorporateEnquiryDetailSheet
        enquiry={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: "bg-amber-50 text-amber-800 border-amber-200",
    CONTACTED: "bg-blue-50 text-blue-800 border-blue-200",
    IN_PROGRESS: "bg-purple-50 text-purple-800 border-purple-200",
    CLOSED: "bg-green-50 text-green-800 border-green-200",
    SPAM: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-block border px-2.5 py-1 text-[10px] font-semibold uppercase ${
        styles[status] ?? "bg-gray-50 text-gray-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
