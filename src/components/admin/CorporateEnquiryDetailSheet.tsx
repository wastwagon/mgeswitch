"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Phone,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Building2,
  User,
  Briefcase,
} from "lucide-react";
import { CorporateEnquiryActions } from "@/components/admin/CorporateEnquiryActions";
import { formatDate, buildWhatsAppUrl } from "@/lib/utils";
import { serviceTypeLabel } from "@/lib/corporate-enquiry";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { useBrand } from "@/components/BrandProvider";

export interface AdminCorporateEnquiryRow {
  id: string;
  reference: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

interface CorporateEnquiryDetailSheetProps {
  enquiry: AdminCorporateEnquiryRow | null;
  onClose: () => void;
}

export function CorporateEnquiryDetailSheet({
  enquiry,
  onClose,
}: CorporateEnquiryDetailSheetProps) {
  const brand = useBrand();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  useScrollLock(Boolean(enquiry));

  useEffect(() => {
    if (enquiry) setNotes(enquiry.adminNotes ?? "");
  }, [enquiry?.id, enquiry?.adminNotes]);

  if (!enquiry) return null;

  const whatsappMsg = `Hi ${enquiry.contactName}, regarding your corporate enquiry ${enquiry.reference} with ${brand.name}.`;

  async function copyReference() {
    await navigator.clipboard.writeText(enquiry!.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function saveNotes() {
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/corporate/${enquiry!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes || null }),
      });
      if (!res.ok) throw new Error("Save failed");
      router.refresh();
    } catch {
      alert("Could not save notes. Please try again.");
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-3xl bg-white shadow-2xl safe-bottom lg:inset-auto lg:left-1/2 lg:top-1/2 lg:w-full lg:max-w-xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="font-mono text-sm font-bold text-navy">{enquiry.reference}</p>
            <p className="text-xs text-muted">{enquiry.company}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target flex items-center justify-center rounded-full bg-navy/5 text-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <StatusBadge status={enquiry.status} />

          <dl className="mt-6 space-y-4">
            <DetailRow icon={User} label="Contact">
              {enquiry.contactName}
            </DetailRow>
            <DetailRow icon={Building2} label="Company">
              {enquiry.company}
            </DetailRow>
            <DetailRow icon={Briefcase} label="Service">
              {serviceTypeLabel(enquiry.serviceType)}
            </DetailRow>
            <DetailRow icon={Mail} label="Email">
              {enquiry.email}
            </DetailRow>
            <DetailRow icon={Phone} label="Phone">
              {enquiry.phone}
            </DetailRow>
          </dl>

          <div className="mt-4 rounded-xl bg-light-blue-bg/50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
              Requirements
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-navy">
              {enquiry.message}
            </p>
          </div>

          <p className="mt-4 text-xs text-muted">
            Received {formatDate(enquiry.createdAt)}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={`tel:${enquiry.phone}`}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-navy text-xs font-bold uppercase tracking-wider text-white"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={buildWhatsAppUrl(whatsappMsg, brand.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] text-xs font-bold uppercase tracking-wider text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${enquiry.email}`}
              className="col-span-2 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-border text-xs font-bold uppercase tracking-wider text-navy"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <button
              type="button"
              onClick={copyReference}
              className="col-span-2 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/5 text-xs font-bold uppercase tracking-wider text-gold"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Reference"}
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
              Admin notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Follow-up notes, proposal sent, account opened…"
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
            />
            <button
              type="button"
              onClick={saveNotes}
              disabled={savingNotes}
              className="mt-2 text-xs font-semibold uppercase tracking-widest text-gold"
            >
              {savingNotes ? "Saving…" : "Save notes"}
            </button>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4">
          <CorporateEnquiryActions
            enquiryId={enquiry.id}
            status={enquiry.status}
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
